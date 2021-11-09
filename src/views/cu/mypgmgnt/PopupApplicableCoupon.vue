<!--
views/ss/SC-FO-SS-GF-MP-702
-->
<template>
    <!-- START : alert 레이어 -->
    <!-- <div id="popupApplicableCoupon" class="wrap-layer alert-layer plus-alert-layer active" role="dialog" aria-labelledby="PopupApplicableCoupon" aria-modal="true" :class="{active : this.modalActive.popupApplicableCoupon}"> -->
      <!-- 실사용 소스
       -->
    <div id="popupApplicableCoupon" class="wrap-layer alert-layer plus-alert-layer" role="dialog" aria-labelledby="popupApplicableCoupon" aria-modal="true" :class="[{active : this.modalActive.popupApplicableCoupon}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="alert-layer-inner coupon product">
        <div class="inner-box">
          <div class="title">
            <h3>쿠폰 적용 가능 상품</h3>
          </div>
          <div class="layer-content scroll-area coupon">
            <!-- START : 상품 목록 -->
            <div class="wrap-product-list">
              <MypageCouponProduct @popupEvent="innerPopupAction"/>
            </div>
            <!-- END : 상품 목록 -->
          </div>
        </div>
        <!-- 수정 START : 2020.02.06 마크업 변경(버튼위치 수정 및 클래스명 삭제) -->
        <div class="btn-alert-bottom">
          <button class="btn-confirm" @click="popupAction">확인</button>
        </div>
        <button class="btn-layer-close" @click="popupAction"><span class="hidden">닫기</span></button>
        <!-- 수정 END : 2020.02.06 마크업 변경(버튼위치 수정 및 클래스명 삭제) -->
      </div>
    </div>
    <!-- END : alert 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import MypageCouponProduct from '@/components/mypage/MypageCouponProduct';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupApplicableCoupon",
  props: ['popup'],
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
    MypageCouponProduct
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupApplicableCoupon');
      this.modalActiveEvent('popupApplicableCoupon');
    },
    innerPopupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
  },
  mounted() {
    this.modalActiveEvent('popupApplicableCoupon');
  },
};
</script>
