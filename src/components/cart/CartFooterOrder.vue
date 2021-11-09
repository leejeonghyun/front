<template>
  <div>
    <div class="wrap-cart-footer" :class="{active : showFooter }">
      <p class="total-check">
        <span class="inp-chk bg">
          <input type="checkbox" name="" id="chkList02_02x" v-model="maxBnftYnTemp" checked="checked" true-value="Y" false-value="N" @change="setMaxBnft">
          <label for="chkList02_02x">맞춤 혜택가 적용</label>
        </span>
        <button type="button" aria-label="맞춤 혜택가 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupDiscountActive">
          <span class="hidden">맞춤 혜택가</span>
        </button>
      </p>
      <!-- 8월 수정 START : 디자인 디벨롭 수정 사항 -->
      <ul class="btn-area">
        <li class="order">
          <a href="javascript:" class="btn-order" aria-haspopup="dialog" @click="popupAction">
            <strong class="total-price">{{comma(bsktInqRsltDto.totItemDcSprc + bsktInqRsltDto.totDlfee - (bsktInqRsltDto.totItemCpnDcAmt + bsktInqRsltDto.totDblDcCpnDcAmt) - bsktInqRsltDto.totCmplDcAmt + ((firstBuy || {dcAmt: 0}).dcAmt || 0) + ((sample || {dcAmt: 0}).dcAmt || 0))}}원 주문하기</strong>
            <p class="price-info-txt">
              <span>총 {{bsktInqRsltDto.totItemCnt}}개</span> <span>배송비 {{comma(bsktInqRsltDto.totDlfee)}}원 포함</span>
            </p>
          </a>
        </li>
        <!-- <li class="order guest"><a href="#" class="btn-order">주문하기</a></li> // 비회원일 경우 -->
        <li class="gift"><a href="javascript:" class="btn-gift" @click="popupGiftAction"><span class="hidden">선물하기</span></a></li>
      </ul>
    </div>
    <!-- START : 맞춤혜택가 레이어 SC-FO-OD-GS-MP-042 -->
    <div id="popupCouponBenefit" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupCouponBenefit" aria-modal="true" :class="{active : this.popup.popupCouponBenefit}">
      <div class="layer-bg" @click="popupCloseAction2"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>맞춤혜택가</h3>
          </div>
          <div class="layer-content">
            <ul class="list-dot">
              <li>할인율이 높은 쿠폰이 우선 적용됩니다. </li>
              <li>할인율이 동일한 경우, 쿠폰 유효기간 임박 순으로 적용됩니다.</li>
              <li>쿠폰 자동 적용은 고객님이 받을 수 있는 혜택을 맞춤혜택가로 추천해드리는 것이며, 맞춤 혜택가는 최대할인율로 적용되지 않을 수 있습니다.</li>
              <li>쿠폰이 여러 개인 경우, 직접 선택하여 쿠폰을 변경 할 수 있습니다.</li>
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupCloseAction2">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 맞춤혜택가 레이어 SC-FO-OD-GS-MP-042 -->
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';

export default {
  name: "CartFooterOrder",
  props: {
    showFooter: Boolean,
    bsktInqRsltDto: Object,
    maxBnftYn: String,
    firstBuy: Object,
    sample: Object,
  },
  data() {
    return {
      popup: { // 팝업
        open: false,
        popupCouponBenefit: false,
      },
      maxBnftYnTemp: null
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupOpenGift(type) { // 팝업 활성/비활성
      this.$emit('popupEvent', 'popupSelectGift');
      // this.popup.open = !this.popup.open;
    },
    popupGiftAction(type) {
      this.$emit('goGift');
    },
    popupAction(type) { // 팝업 활성/비활성
      this.$emit('goOrder');
      // this.$emit('popupEvent', 'popupAlert2plus1'); // 2+1 미충족 안내 팝업 활성화
    },
    popupDiscountAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    // 맞춤혜택가
    popupDiscountActive() {
      this.popupDiscountAction('popupCouponBenefit');
      this.modalActiveEvent('popupCouponBenefit');
    },
    popupCloseAction2() {
      this.popupDiscountAction('popupCouponBenefit');
      this.modalActiveEvent('popupCouponBenefit');
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    setMaxBnft() {
      this.$emit('setMaxBnft', this.maxBnftYnTemp);
    }
  },
  mounted() {
    this.maxBnftYnTemp = (this.maxBnftYn === 'X' ? 'N' : this.maxBnftYn);
  },
  watch: {
    maxBnftYn() {
      this.maxBnftYnTemp = (this.maxBnftYn === 'X' ? 'N' : this.maxBnftYn);
    }
  },
};
</script>
