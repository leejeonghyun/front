<template>
  <!-- START : 할인 정보 레이어 -->
  <div id="popupCoupon" class="wrap-layer description-layer coupon-layer" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupCoupon}">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3>쿠폰내역</h3>
        </div>
        <div class="layer-content">
          <div class="wrap-coupon">
            <div class="coupon-all">더블쿠폰 받기<button class="btn-border">전체받기</button></div>
            <ul class="wrap-list-coupon">
              <li>
                <div class="inner">
                  <span class="coupon-name"><strong class="grade">WELCOM</strong>등급 쿠폰</span>
                  <span class="coupon-amount"><strong class="num">2</strong>천원</span>
                  <div class="coupon-apply">1만원이상 구매 시</div>
                  <div class="period">사용기간: 11/21~11/30 15:00</div>
                </div>
                <button class="btn-coupon">
                  <span>쿠폰받기</span>
                </button>
              </li>
              <li>
                <div class="inner">
                  <span class="coupon-target"><strong class="grade">WELCOM</strong>등급 쿠폰</span>
                  <span class="coupon-amount"><strong class="num">2</strong>천원</span>
                  <div class="coupon-apply">1만원이상 구매 시</div>
                  <div class="period">사용기간: 11/21~11/30 15:00</div>
                </div>
                <button class="btn-coupon">
                  <span>쿠폰받기</span>
                </button>
              </li>
                <li>
                <div class="inner">
                  <span class="coupon-target"><strong class="grade">WELCOM</strong>등급 쿠폰</span>
                  <span class="coupon-amount"><strong class="num">2</strong>천원</span>
                  <div class="coupon-apply">1만원이상 구매 시</div>
                  <div class="period">사용기간: 11/21~11/30 15:00</div>
                </div>
                <button class="btn-coupon">
                  <span>쿠폰받기</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction">
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 할인 정보 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "PopupCouponInfo",
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupCoupon');
      this.modalActiveEvent('popupCoupon');
    },
  },
  mounted() {
    this.modalActiveEvent('popupCoupon');
  }
};
</script>
