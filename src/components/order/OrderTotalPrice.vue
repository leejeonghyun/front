<template>
  <div class="multi-payment">
    <div class="discount-total">
      <p class="price-info"><strong class="total">총 -<em>{{toComma(totalDcAmt + totPrdDcAmt)}}</em>원</strong>
        <span class="total-info-txt">(행사할인-{{toComma(totalDcAmt + totPrdDcAmt - (gsNPointDcAmt + popRwdDcAmt))}}원 + 리워즈/포인트-{{toComma(gsNPointDcAmt + popRwdDcAmt)}}원)</span>
      </p>
    </div>
    <div class="total-payment order-payment">
      <ul class="accordion-payment">
        <li>
          <div class="tit-accordion">
            총 상품금액 <span class="price"><strong>{{toComma(totPrdSellAmt)}}</strong>원</span>
          </div>
        </li>
        <li>
          <div class="tit-accordion">
            행사할인금액 <span class="price red"><strong>-{{toComma(totalDcAmt + totPrdDcAmt - (gsNPointDcAmt + popRwdDcAmt))}}</strong>원</span>
          </div>
        </li>
        <li v-if="gsNPointDcAmt > 0 || popRwdDcAmt > 0">
          <div class="tit-accordion">
            리워즈/포인트 <span class="price red"><strong>-{{toComma(gsNPointDcAmt + popRwdDcAmt)}}</strong>원</span>
          </div>
        </li>
        <li>
          <div class="tit-accordion">
            총 배송비 <span class="price"><strong>{{toComma(totDelivDlFee())}}</strong>원</span>
          </div>
          <ul class="accordion-content">
            <li v-if="deliveryReserveFalg">예약배송 <span class="price"><strong>{{toComma(delivDlfeeReserve)}}</strong>원</span></li>
            <li v-if="deliveryTodayFlag">당일배송({{toComma(delivDlfeeStandAmtToday)}}원 이상 무료) <span class="price"><strong>{{toComma(delivDlfeeToday)}}</strong>원</span></li>
            <li v-if="deliveryDawnFlag">새벽배송({{toComma(delivDlfeeStandAmtDawn)}}원 이상 무료) <span class="price"><strong>{{toComma(delivDlfeeDawn)}}</strong>원</span></li>
            <li v-if="deliveryParcelFlag">택배배송 <span class="price"><strong>{{toComma(delivDlfeeParcel)}}</strong>원</span></li>
            <li v-if="deliveryOverseasFlag">해외직구배송<span class="price"><strong>{{toComma(delivDlfeeOverseas)}}</strong>원</span></li>
          </ul>
        </li>
      </ul>
      <div class="sub-inner-box">
        <div class="total-price">
          최종 결제금액 <span class="price"><strong>{{toComma(totPayAmt)}}</strong>원</span>
        </div>
        <ul class="txt-info-list">
          <li v-if="saleTextFlag">카드{{crcoChargDcrt}}% 청구할인 시 <span class="point">{{toComma(crcoChargAmt)}}원</span></li>
          <li v-if="mbrGrd">배송 완료 후, GS&amp;POINT적립 <span class="point">{{toComma(gsPntSavg)}}P</span></li>
          <!-- <li v-if="mbrGrd">팝카드 결제 시 GS&amp;POINT 추가적립 <span class="point">0P</span></li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NumberUtils from '@/common/NumberUtils';
import ApiUtils from '@/common/ApiUtils';
export default {
  props: {
    totalDcAmt: Number,
    gsNPointDcAmt: Number,
    popRwdDcAmt: Number,
    ordsItemList: Object,
    mbrGrd: Boolean,
    crcoChargDcInfoList: Array,
  },
  name: "OrderTotalPrice",
  data() {
    return {
      deliveryReserveFalg: false, // 예약배송
      deliveryTodayFlag: false, // 당일배송
      deliveryDawnFlag: false, // 새벽배송
      deliveryParcelFlag: false, // 택배배송
      deliveryOverseasFlag: false, // 해외직구배송
      delivDlfeeReserve: 0, // 예약배송비
      delivDlfeeToday: 0, // 당일배송비
      delivDlfeeDawn: 0, // 새벽배송비
      delivDlfeeParcel: 0, // 택배배송비
      delivDlfeeOverseas: 0, // 해외직구배송비
      totDelivFee: 0, // 총배송비
      totPrdAmt: 0, // 총 상품금액
      totPrdDcAmt: 0, // 총 상품할인금액 (선반영된 금액임으로 보여주기만 함)
      totPrdSellAmt: 0, // 총 상품금액 할인전 (선반영된 금액임으로 보여주기만 함))
      totPayAmt: 0, // 총 결제금액
      gsPntSavg: 0, // 멤버심적립금액
      saleTextFlag: false, // 카드청구할인율 존재여부
      crcoChargDcrt: 0, // 카드청구할인율
      crcoChargAmt: 0, // 카드청구할인금액
      crcoChargDcPosbAmt: 0, // 카드청구할인최대금액
      dlfeeStandAmtList: [],
      delivDlfeeStandAmtToday: 0,
      delivDlfeeStandAmtDawn: 0,
    };
  },
  watch: {
    totPayAmt: function() {
      this.retrievePntSavgRtInfo();
    },
    totalDcAmt: function() {
      this.sumTotalAmt();
    },
    ordsItemList: function() {
      this.sumTotalAmt();
      this.retrievePntSavgRtInfo();
      this.retrieveDlfeeStandAmt();
    },
  },
  directives: {},
  mixins: [],
  components: {
  },
  methods: {
    sumTotalAmt() {
      if (this.ordsItemList != null) {
        this.totPrdAmt = 0;
        this.totPrdDcAmt = 0;
        this.totPrdSellAmt = 0;

        this.delivDlfeeReserve = 0; // 예약배송비
        this.delivDlfeeToday = 0; // 당일배송비
        this.delivDlfeeDawn = 0; // 새벽배송비
        this.delivDlfeeParcel = 0; // 택배배송비
        this.delivDlfeeOverseas = 0; // 해외직구배송비

        const ordsDelivGrpInfoList = this.ordsItemList.ordsDelivGrpInfoList;
        // console.log(ordsDelivGrpInfoList);
        // mounted시 인식못함수정
        if (ordsDelivGrpInfoList !== undefined && ordsDelivGrpInfoList !== null) {
          for (let j = 0; j < ordsDelivGrpInfoList.length; j++) {
            const ordsDelivSupplGrpInfoList = ordsDelivGrpInfoList[j].ordsDelivSupplGrpInfoList;
            for (let k = 0; k < ordsDelivSupplGrpInfoList.length; k++) {
              const ordsItemInfoList = ordsDelivSupplGrpInfoList[k].ordsItemInfoList;
              for (let l = 0; l < ordsItemInfoList.length; l++) {
                if (ordsItemInfoList[l] !== null) {
                  this.totPrdDcAmt += (ordsItemInfoList[l].sellAmt - ordsItemInfoList[l].dcSellAmt) + ordsItemInfoList[l].cmplDcAmt + ordsItemInfoList[l].itemCpnDcAmt + ordsItemInfoList[l].dblDcCpnDcAmt;
                  this.totPrdSellAmt += ordsItemInfoList[l].sellAmt;
                }
                // 구성상품 추가
                if (ordsItemInfoList[l].ordsItemCompoInfoList && ordsItemInfoList[l].ordsItemCompoInfoList.length > 0) {
                  const ordsItemCompoInfoList = ordsItemInfoList[l].ordsItemCompoInfoList;
                  for (let m = 0; m < ordsItemCompoInfoList.length; m++) {
                    this.totPrdSellAmt += ordsItemCompoInfoList[m].lastBeneSellAmt;
                  }
                }
              }
              if (ordsDelivSupplGrpInfoList[k].delivTypeCd == "01" && ordsDelivSupplGrpInfoList[k].ordTypeCd == "10") {
                this.deliveryTodayFlag = true;
                this.delivDlfeeToday += ordsDelivSupplGrpInfoList[k].delivDlfee;
              } else if (ordsDelivSupplGrpInfoList[k].delivTypeCd == "01" && ordsDelivSupplGrpInfoList[k].ordTypeCd == "50") {
                this.deliveryReserveFalg = true;
                this.delivDlfeeReserve += ordsDelivSupplGrpInfoList[k].delivDlfee;
              } else if (ordsDelivSupplGrpInfoList[k].delivTypeCd == "02" || ordsDelivSupplGrpInfoList[k].delivTypeCd == "03") {
                this.deliveryParcelFlag = true;
                this.delivDlfeeParcel += ordsDelivSupplGrpInfoList[k].delivDlfee;
              } else if (ordsDelivSupplGrpInfoList[k].delivTypeCd == "04") {
                this.deliveryDawnFlag = true;
                this.delivDlfeeDawn += ordsDelivSupplGrpInfoList[k].delivDlfee;
              } else if (ordsDelivSupplGrpInfoList[k].delivTypeCd == "05") {
                this.deliveryOverseasFlag = true;
                this.delivDlfeeOverseas += ordsDelivSupplGrpInfoList[k].delivDlfee;
              }
              this.totPrdAmt += ordsDelivSupplGrpInfoList[k].delivOrdSchedAmt;
            }
          }
        }
      }
      this.totPayAmt = this.totPrdAmt - this.totalDcAmt + this.totDelivDlFee(); // 결제금액은 상품금액 - 할인금액 + 배송비총합
      this.$emit('totPayAmtEvent', this.totPayAmt, this.totPrdAmt, this.totDelivFee);
    },
    totDelivDlFee() {
      this.totDelivFee = this.delivDlfeeReserve + this.delivDlfeeToday + this.delivDlfeeDawn + this.delivDlfeeParcel + this.delivDlfeeOverseas;
      return this.totDelivFee;
    },
    toComma (x) {
      return NumberUtils.toComma(x);
    },
    toCeil(x) {
      return Math.ceil(x);
    },
    async retrievePntSavgRtInfo() {
      if (this.mbrGrd) {
        const iOrderRequestInputDto = {
          ordId: this.ordsItemList.ordId
        };
        const response = await ApiUtils.get('/fo/od/ordsmgnt/ord-pntSavg-rate', iOrderRequestInputDto);
        this.gsPntSavg = response.data.data.gsPntSavg;
      }
    },
    async retrieveDlfeeStandAmt() {
      const iOrderRequestInputDto = {
        ordId: this.ordsItemList.ordId
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/ords-dlfee-stand-amt', iOrderRequestInputDto);
      this.dlfeeStandAmtList = response.data.data;
      if (this.dlfeeStandAmtList && this.dlfeeStandAmtList.length > 0) {
        for (let i = 0; i < this.dlfeeStandAmtList.length; i++) {
          if (this.dlfeeStandAmtList[i].delivTypeCd === '01') {
            this.delivDlfeeStandAmtToday = this.dlfeeStandAmtList[i].freeDelivStandAmt;
          } else if (this.dlfeeStandAmtList[i].delivTypeCd === '04') {
            this.delivDlfeeStandAmtDawn = this.dlfeeStandAmtList[i].freeDelivStandAmt;
          }
        }
      }
    },
    crcoChargDc(crcoInfoInfo) {
      // 카드사청구할인정보목록
      if (crcoInfoInfo != null) {
        if (crcoInfoInfo.crcoCd) {
          if (this.crcoChargDcInfoList != null && this.crcoChargDcInfoList.length != 0) {
            for (let i = 0; i < this.crcoChargDcInfoList.length; i++) {
              if (crcoInfoInfo.crcoCd === this.crcoChargDcInfoList[i].crcoCd) {
                if (this.crcoChargDcInfoList[i].dcTypeCd === 'R') {
                  this.saleTextFlag = true;
                  this.crcoChargDcrt = this.crcoChargDcInfoList[i].crcoChargDcrt;
                  this.crcoChargDcPosbAmt = this.crcoChargDcInfoList[i].crcoChargDcPosbAmt;
                }
              }
            }
          }
          if (parseInt(this.crcoChargDcrt) > 0) {
            this.crcoChargAmt = this.totPayAmt * parseInt(this.crcoChargDcrt) / 100;
            if (parseInt(this.crcoChargAmt) > parseInt(this.crcoChargDcPosbAmt)) {
              this.crcoChargAmt = this.crcoChargDcPosbAmt;
            }
          }
        }
      }
    },
  },
  mounted() {
    // this.sumTotalAmt();
  },
};
</script>
