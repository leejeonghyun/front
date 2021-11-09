<template>
    <!-- START : GS fresh -->
    <ul class="cart-product-list shadow">
      <li v-for="(bskt, index) in bsktInqRsltDtoList" v-bind:key="bskt.bsktId">
        <div class="inner">
          <dl>
            <dt>
              <p class="tit">
                <span class="inp-chk bg">
                  <input type="checkbox" name="bsktId" :id="`${'chkList' + bskt.bsktId}`" :value="bskt.bsktId" :checked="bskt.chk" @click="setChk(index, bskt.chk)" ref="bsktId" >
                  <label :for="`${'chkList' + bskt.bsktId}`">{{ bskt.itemNm }}</label>
                </span>
              </p>
            </dt>
            <dd class="thumb">
              <a href="#">
                <figure>
                  <img :src="getItemImg(bskt.itemImg)" :alt="bskt.itemNm" v-if="bskt.itemImg !== ''">
                  <img src="@/assets/images/img/img_product_nothumb.jpg" v-if="bskt.itemImg === ''">
                </figure>
              </a>
            </dd>
            <!-- <dd class="option">
              <p class="option-info"><button type="button" aria-label="도착 예정일 선택 팝업 활성화" aria-haspopup="dialog" @click="popupDateActive">11/09(토) 도착예정</button></p>
            </dd> -->
            <dd class="option">
              <!--<p class="option-info" v-if="bskt.delivDt !== ''"><button type="button" aria-label="도착 예정일 선택 팝업 활성화" aria-haspopup="dialog" @click="popupDateActive(bskt)">{{ format(bskt.delivDt) }} 도착예정</button></p>-->
              <p class="option-info" v-if="bskt.delivDt !== ''" style="width:101px;">{{ format(bskt.delivDt) }} 도착예정</p>
              <p class="option-info" v-if="bskt.optnItemYn === 'Y'">옵션 : {{ bskt.skuNm }}</p>
            </dd>
            <dd class="option-number">
              <button type="button" class="btn-minus" @click="decreaseCount($event, bskt)"><span class="hidden">선택수량 빼기</span></button>
              <input type="number" name="" v-model="bskt.bsktQty" class="txt-number" title="선택 수량" @blur="updateBskt(bskt, 'direct')" @focus="setkstQtyTemp(bskt.bsktQty);">
              <button type="button" class="btn-plus" @click="increaseCount($event, bskt)"><span class="hidden">선택수량 더하기</span></button>
            </dd>
            <dd class="shop">{{bskt.mallNm}}</dd>
            <dd class="list-price" aria-label="정상가격" v-if="bskt.itemSprc > bskt.itemDcSprc || (bskt.itemCpnDcAmt + bskt.dblDcCpnDcAmt) > 0">
              <del>{{comma(bskt.itemSprc * bskt.bsktQty)}}</del>원
            </dd>
            <dd class="sale-price" :class="{'dalisalda' : orgMallId === '11'}" aria-label="판매가격">
              <span class="number-sale-price">{{comma(bskt.itemDcSprc * bskt.bsktQty - bskt.cmplDcAmt - bskt.itemCpnDcAmt - bskt.dblDcCpnDcAmt)}}</span>
              <span class="unit-won">원</span>
              <button type="button" class="btn-infomation" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupDiscountActive(bskt)"><span class="hidden">할인 안내</span></button>
            </dd>
          </dl>
          <div class="btn-bottom">
            <ul class="product-info">
              <li v-if="bskt.dlfeeAddStandQty > 0">{{bskt.dlfeeAddStandQty}}개 묶음당 배송비추가</li>
              <li v-if="bskt.itemDlfeeAmt === 0 && bskt.dlfeeAmt === 0">무료배송</li>
              <li v-if="bskt.itemPurchMaxRestrQty < 100">1인 {{bskt.itemPurchMaxRestrQty}}개 한정</li>
              <li v-if="bskt.cardDcYn === 'Y'">카드할인</li>
              <li v-if="bskt.ordsDblDcCpnPromExpnsInqRsltDtoList !== null && bskt.ordsDblDcCpnPromExpnsInqRsltDtoList.length > 0">더블쿠폰</li>
            </ul>
            <p class="btn-area">
              <button type="button" class="btn-border btn-coupon" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog"
                @click="popupCouponActive(bskt.ordsItemCpnPromExpnsInqRsltList, bskt.ordsDblDcCpnPromExpnsInqRsltDtoList, bskt.itemNm, bskt.bsktId, bskt.itemDcSprc, bskt.bsktQty, bskt.cmplDcAmt)"
                v-if="(bskt.ordsItemCpnPromExpnsInqRsltList !== null && Object.entries(bskt.ordsItemCpnPromExpnsInqRsltList).length > 0) || (bskt.ordsDblDcCpnPromExpnsInqRsltDtoList !== null && Object.entries(bskt.ordsDblDcCpnPromExpnsInqRsltDtoList).length > 0)">쿠폰변경</button>
            </p>
          </div>
          <p class="reservation-count" v-if="bskt.ordTypeCd === '50' && bskt.resvItemYn === 'Y'">사전예약 <strong>D-{{bskt.dday === 0 ? 'day' : bskt.dday}}</strong> 현재 <strong>{{comma(bskt.ordCnt)}}명</strong> 예약 완료</p>
        </div>
      </li>
    </ul>
    <!-- END : GS fresh -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
import ImgUtils from '@/common/ImgUtils';
import OrderMsg from '@/components/order/OrderMsg';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    delivTypeDtoList: Array,
    pmbsJoinPrcnCd: String,
    index: Number,
  },
  name: "CartMultiProductList",
  data() {
    return {
      bsktQtyTemp: 0,
      bsktInqRsltDtoList: [],
      orgMallId: CookieUtils.getMallId()
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    // chage value
    decreaseCount(event, bskt) {
      if (bskt.bsktQty > bskt.itemSellUnitQty) {
        this.bsktQtyTemp = bskt.bsktQty;
        bskt.bsktQty = Number(bskt.bsktQty) - bskt.itemSellUnitQty;
        this.updateBskt(bskt, 'down');
      }
    },
    increaseCount(event, bskt) {
      if (bskt.bsktQty <= (999 - bskt.itemSellUnitQty)) {
        this.bsktQtyTemp = bskt.bsktQty;
        bskt.bsktQty = Number(bskt.bsktQty) + bskt.itemSellUnitQty;
        this.updateBskt(bskt, 'up');
      }
    },
    updateBskt(bskt, type) {
      if (bskt.bsktQty <= 0) {
        this.$gsdialog.alert(OrderMsg.posbBsktQty('최소', 1));
        bskt.bsktQty = this.bsktQtyTemp;
        return;
      } else if (bskt.bsktQty > 999) {
        this.$gsdialog.alert(OrderMsg.posbBsktQty('최대', 999));
        bskt.bsktQty = this.bsktQtyTemp;
        return;
      }
      if (bskt.itemPurchMinRestrQty !== 0 && type !== 'up') {
        if (bskt.itemPurchMinRestrQty > bskt.bsktQty) {
          this.$gsdialog.alert(OrderMsg.posbBsktQty('최소', bskt.itemPurchMinRestrQty));
          bskt.bsktQty = this.bsktQtyTemp;
          return;
        }
      }
      if (bskt.itemPurchMaxRestrQty !== 0 && type !== 'down') {
        if (bskt.itemPurchMaxRestrQty < bskt.bsktQty) {
          this.$gsdialog.alert(OrderMsg.posbBsktQty('최대', bskt.itemPurchMaxRestrQty));
          bskt.bsktQty = this.bsktQtyTemp;
          return;
        }
      }

      if (bskt.stkQty < bskt.bsktQty) {
        this.$gsdialog.alert(OrderMsg.posbBsktStkQty(bskt.stkQty, bskt.itemNm), {html: true});
        bskt.bsktQty = this.bsktQtyTemp;
        return;
      }

      if (bskt.bsktQty % bskt.itemSellUnitQty !== 0) {
        this.$gsdialog.alert('구매수량은 ' + bskt.itemSellUnitQty + '의 배수로 입력하세요.');
        bskt.bsktQty = this.bsktQtyTemp;
        return;
      }

      if (this.bsktQtyTemp !== bskt.bsktQty) {
        this.$emit('updateBskt', bskt);
      }
    },
    popupEventActive() {
      this.$emit('popupEvent', 'popupEventProduct');
    },
    // 할인안내 팝업
    popupDiscountActive(bskt) {
      this.$emit('popupEvent', 'popupDiscountInfo', bskt);
    },
    // 쿠폰변경 팝업
    popupCouponActive(itemCpnList, dblDcCpnList, itemNm, bsktId, itemDcSprc, bsktQty, cmplDcAmt) {
      this.$emit('openCouponPopup', itemCpnList, dblDcCpnList, itemNm, bsktId, itemDcSprc, bsktQty, cmplDcAmt);
    },
    // 도착예정일 날짜 선택 팝업
    popupDateActive(bskt) {
      this.$emit('popupDateActive', bskt);
    },
    // 옵션 + 도착예정일 날짜 팝업
    popupSimplycookOptionActive() {
      this.$emit('popupEvent', 'popupOptionDate');
    },
    setChk(kdx, chk) {
      this.delivTypeDtoList[0].supplFirmDtoList[0].bsktInqRsltDtoList[kdx].chk = !chk;
      let chkYn = true;
      for (let idx=0; idx<this.$refs.bsktId.length; idx++) {
        if (!this.$refs.bsktId[idx].checked) {
          chkYn = false;
          break;
        }
      }
      this.$emit('setChk', chkYn, this.index);
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    getItemImg(url) {
      let path = '';
      try {
        url = url.replace("{SIZE}", 300); // 임시로 사이즈 변경함
        path = ImgUtils.path(url);
      } catch (e) {
        path = '@/assets/images/img/img_product_nothumb.jpg';
      }
      return path;
    },
    setkstQtyTemp(bsktQty) {
      this.bsktQtyTemp = bsktQty;
    },
    format(date) {
      return this.selectDate = DateUtils.format(date, 'MM/DD(dd)');
    },
  },
  mounted() {
    console.log(this.delivTypeDtoList);
    for (let idx=0; idx<this.delivTypeDtoList[0].supplFirmDtoList.length; idx++) {
      for (let jdx=0; jdx<this.delivTypeDtoList[0].supplFirmDtoList[idx].bsktInqRsltDtoList.length; jdx++) {
        this.bsktInqRsltDtoList.push(this.delivTypeDtoList[0].supplFirmDtoList[idx].bsktInqRsltDtoList[jdx]);
      }
    }
  },
  watch: {
    delivTypeDtoList() {
      this.bsktInqRsltDtoList = [];
      for (let idx=0; idx<this.delivTypeDtoList[0].supplFirmDtoList.length; idx++) {
        for (let jdx=0; jdx<this.delivTypeDtoList[0].supplFirmDtoList[idx].bsktInqRsltDtoList.length; jdx++) {
          this.bsktInqRsltDtoList.push(this.delivTypeDtoList[0].supplFirmDtoList[idx].bsktInqRsltDtoList[jdx]);
        }
      }
    }
  },
};
</script>
