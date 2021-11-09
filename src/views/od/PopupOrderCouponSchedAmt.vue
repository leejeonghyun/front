<template>
    <!-- START : 주문예정금액 변동 안내 레이어 -->
    <div id="popupOrderCouponSchedAmt" class="wrap-layer confirm-layer" role="dialog" aria-labelledby="PopupOrderCouponSchedAmt" aria-modal="true" :class="[{active : this.modalActive.popupOrderCouponSchedAmt}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>주문예정금액 변동 안내</h3>
          </div>
          <div class="layer-content">
            <p class="txt txt2">쿠폰을 적용해서 할인받으면 당일배송 3만원 미만으로 배송비 2,500원이 부과됩니다.</p>
            <p class="txt txt2">쿠폰 할인을 적용하시겠습니까?</p>
          </div>
        </div>
        <div class="btn-alert-bottom">
          <button class="btn-cancel" @click="popupAction">취소</button>
          <button class="btn-confirm" @click="changeCoupon">확인</button>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 주문예정금액 변동 안내 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupOrderCouponSchedAmt",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupOrderCouponSchedAmt');
      this.modalActiveEvent('popupOrderCouponSchedAmt');
    },
    changeCoupon() {
      this.$emit('processOrdsItemCpnAppl');
    }
  },
  mounted() {
    this.modalActiveEvent('popupOrderCouponSchedAmt');
  },
};
</script>
