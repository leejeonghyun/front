<template>
  <section class="mypage block">
    <div class="total-payment order-payment padding mt0"> <!-- 20201209 padding class 제거 // 20201224 padding class 재추가 -->
      <div class="sub-title border">
        <h3><span class="bg-line-brush">합계금액정보</span></h3>
      </div>
      <ul class="accordion-payment">
        <li>
          <div class="tit-accordion">
            총 상품금액 <span class="price"><strong>{{ totPrdSellAmt | currency }}</strong>원</span>
          </div>
        </li>
        <li>
          <div class="tit-accordion">
            총 할인금액
            <span :class="{price: true, red: sumTotEvntDcAmt() >= 0}">
              <strong>{{ sumTotEvntDcAmt() >= 0 ? '-' : '+' }}{{ Math.abs(sumTotEvntDcAmt()) | currency }}</strong>원
            </span>
          </div>
        </li>
        <li>
          <div class="tit-accordion" v-if="(gsNPointDcAmt + popRwdDcAmt) > 0">
            리워즈/포인트 <span class="price red"><strong>-{{ gsNPointDcAmt + popRwdDcAmt | currency }}</strong>원</span>
          </div>
        </li>
        <li>
          <div class="tit-accordion">
            총 배송비 <span class="price"><strong>{{ totDlfeeAmt | currency }}</strong>원</span>
            <button type="button" class="btn-infomation" aria-label="배송비 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupAction('popupDeliveryPrice')" />
          </div>
        </li>
      </ul>
    </div>
    <div class="sub-title send-total-price">
      <p class="txt-price">최종 결제 금액 <span class="price"><strong>{{ totPayAmt | currency }}</strong>원</span></p>
    </div>
    <div class="gspointbox gray_guide__box" v-if="!!crcoChargFlag">
      <p>카드 {{crcoChargDcrt}}% 청구할인 시</p>
      <span class="point"> {{ crcoChargAmt | currency }}원</span>
    </div>
    <div class="gspointbox gray_guide__box" v-if="!!mbrGrd">
      <p>배송완료 후 GS&amp;POINT</p>
      <span class="point">{{ gsPntSavg | currency }}P</span>
    </div>
    <div class="gspointbox gray_guide__box" v-if="false">
      <p>팝카드 결제 시 GS&amp;POINT 추가적립</p>
      <span class="point">28P</span>
    </div>
    <MfPopupDeliveryPrice @popupEvent="popupAction" v-if="this.popup.popupDeliveryPrice" /> <!-- 팝업 - 배송비 안내 -->
  </section>
</template>
<script>
import MfPopupDeliveryPrice from '@/views/od/MfPopupDeliveryPrice'; // 팝업 - 배송비 안내
import AccordionMixin from '@/mixins/AccordionMixin';
import NumberUtils from '@/common/NumberUtils';
import ApiUtils from '@/common/ApiUtils';
export default {
  name: "MfOrderTotalPrice",
  props: {
    totalDcAmt: Number,
    gsNPointDcAmt: Number,
    popRwdDcAmt: Number,
    ordsItemList: Object,
    mbrGrd: Boolean,
    crcoChargDcInfoList: Array,
  },
  data() {
    return {
      totPrdAmt: 0, // 총 상품금액
      totPrdSellAmt: 0, // 총 상품금액 할인전 (선반영된 금액임으로 보여주기만 함))
      totPrdDcAmt: 0, // 총 상품할인금액 (선반영된 금액임으로 보여주기만 함)
      totBsktDcAmt: 0, // 총 배송비/장바구니 쿠폰 할인 금액 (선반영된 금액임으로 보여주기만 함)
      totTelcoDcAmt: 0, // 총 통신사할인 금액 (선반영된 금액임으로 보여주기만 함)
      totCardDcAmt: 0, // 총 카드즉시할인 금액 (선반영된 금액임으로 보여주기만 함)
      totDlfeeAmt: 0, // 총 배송비 금액 (선반영된 금액임으로 보여주기만 함)
      totPayAmt: 0, // 총 결제금액
      gsPntSavg: 0, // 멤버심적립금액
      crcoChargFlag: false,
      crcoChargDcrt: 0, // 카드청구할인율
      crcoChargAmt: 0, // 카드청구할인금액
      crcoChargDcPosbAmt: 0, // 최대청구할인금액
      popup: { // 팝업
        open: false,
        popupDeliveryPrice: false,
      },
    };
  },
  mixins: [AccordionMixin],
  components: {
    MfPopupDeliveryPrice,
  },
  filters: {
    currency: function(val) {
      return NumberUtils.toComma(val);
    },
  },
  watch: {
    totalDcAmt: function() {
      this.sumTotalAmt();
    },
    ordsItemList: async function() {
      await this.sumTotalAmt();
      await this.retrievePntSavgRtInfo();
    },
  },
  methods: {
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    sumTotEvntDcAmt() {
      return this.totalDcAmt + this.totPrdDcAmt - (this.gsNPointDcAmt + this.popRwdDcAmt);
    },
    sumTotalAmt() {
      if (this.ordsItemList != null) {
        this.totPrdAmt = 0; // 총 상품 금액
        this.totPrdDcAmt = 0; // 총 상품 할인 금액
        this.totPrdSellAmt = 0; // 총 상품 판매 금액
        this.totDlfeeAmt = 0; // 총 배송비 금액

        if (!!this.ordsItemList.ordsDelivSupplGrpInfoList) {
          this.ordsItemList.ordsDelivSupplGrpInfoList.forEach(supplInfo => {
            supplInfo.ordsDlfeeGrpInfoList.forEach(dlfeeInfo => {
              dlfeeInfo.ordsItemInfoList.forEach(itemInfo => {
                // 총 상품 할인 금액 SUM
                this.totPrdDcAmt += (itemInfo.sellAmt - itemInfo.dcSellAmt) + itemInfo.itemCpnDcAmt;
                // 총 상품금액 SUM
                this.totPrdSellAmt += itemInfo.sellAmt;
              });
              // 총 배송비 금액 SUM
              this.totDlfeeAmt += dlfeeInfo.dlfeeSumAmt;
              // 총 상품 금액 SUM (배송비유형별 결제금액)
              this.totPrdAmt += dlfeeInfo.dlfeeSumOrdAmt;
            });
          });
        }
      }
      this.totPayAmt = this.totPrdAmt - this.totalDcAmt + this.totDlfeeAmt; // 결제금액은 상품금액 - 할인금액 + 배송비총합
      this.$emit('totPayAmtEvent', this.totPayAmt, this.totPrdAmt, this.totDlfeeAmt, this.totPrdDcAmt);
    },
    // GS&POINT 적립율 조회 함수
    async retrievePntSavgRtInfo() {
      if (this.mbrGrd) {
        const iOrderRequestInputDto = { ordId: this.ordsItemList.ordId };
        const response = await ApiUtils.get('/fo/od/mf/ordsmgnt/ord-pntSavg-rate', iOrderRequestInputDto).then((response) => {
          this.gsPntSavg = response.data.data.gsPntSavg;
        });
      }
    },
    crcoChargDc(crcoInfoInfo) {
      // 카드사청구할인정보목록
      if (!!crcoInfoInfo && !!crcoInfoInfo.crcoCd) {
        if (!!this.crcoChargDcInfoList && this.crcoChargDcInfoList.length > 0) {
          this.crcoChargFlag = false;
          this.crcoChargDcInfoList.forEach(crcoChargDcInfo => {
            // 카드 청구 할인이 존재하면 관련 정보 Set
            if (crcoInfoInfo.crcoCd === crcoChargDcInfo.crcoCd && crcoChargDcInfo.dcTypeCd === 'R' && this.totPayAmt >= crcoChargDcInfo.evntApplStandAmt) {
              this.crcoChargFlag = true;
              this.crcoChargDcrt = parseInt(crcoChargDcInfo.crcoChargDcrt);
              this.crcoChargDcPosbAmt = parseInt(crcoChargDcInfo.crcoChargDcPosbAmt);
            }
          });
        }
        if (this.crcoChargDcrt > 0) {
          this.crcoChargAmt = this.totPayAmt * this.crcoChargDcrt / 100;
          // 청구할인금액이 최대청구할인금액보다 크면 최대청구할인금액을 Set
          if (this.crcoChargDcPosbAmt != 0 && this.crcoChargAmt > this.crcoChargDcPosbAmt) {
            this.crcoChargAmt = this.crcoChargDcPosbAmt;
          }
        }
      }
    },
  },
  mounted() {
  },
};
</script>
