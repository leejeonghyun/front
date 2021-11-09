<!--
views/od/SC-FO-PA-GS-MP-017
-->
<template>
  <div id="popupDeliveryCoupon" class="wrap-full-popup" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
    <!-- : 실사용 소스 -->
    <!-- <div id="popupDeliveryCoupon" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupDeliveryCoupon}"> -->
    <div class="header-popup">
      <strong>배송비/장바구니 쿠폰</strong>
    </div>
    <div class="full-popup-body has-fixed-bottom scroll-area">
      <div class="inner-full-popup">
        <section class="section-area coupon-list">
          <!-- START : 배송비 쿠폰 -->
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>배송비 쿠폰</h2>
            </div>
            <!-- START : 쿠폰 없을 경우 -->
            <p class="no-list">사용할 수 있는 쿠폰이 없습니다.</p>
            <!-- END : 쿠폰 없을 경우 -->
          </div>
          <!-- END : 배송비 쿠폰 -->
        </section>
        <section class="section-area coupon-list">
          <!-- START : 장바구니 쿠폰 -->
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>장바구니 쿠폰</h2>
            </div>
            <!-- START : 쿠폰 없을 경우 -->
            <p class="no-list">사용할 수 있는 쿠폰이 없습니다.</p>
            <!-- END : 쿠폰 없을 경우 -->
          </div>
          <!-- END : 장바구니 쿠폰 -->
        </section>
        <!-- START : 하단 버튼 -->
        <div class="popup-btns-fixed-bottom">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="popupCloseAction">선택 적용</button>
        </div>
        <!-- END : 하단 버튼 -->
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupDeliveryCoupon",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '배송비/장바구니 쿠폰 < %s'
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupDeliveryCoupon');
      this.modalActiveEvent('popupDeliveryCoupon');
    },
  },
  mounted() {
    // 실사용 소스
    // this.modalActiveEvent('popupDeliveryCoupon');
  }
};
</script>
