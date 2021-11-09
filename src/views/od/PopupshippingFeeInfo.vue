<template>
  <!-- START : 상품배송비 안내 -->
  <div id="popupshippingFeeInfo" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupshippingFeeInfo" aria-modal="true" :class="[{active : this.modalActive.popupshippingFeeInfo}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3>상품배송비</h3>
        </div>
        <div class="layer-content">
          <p class="mb10">상품배송비는 무료배송비와 무관하게 상품별 배송비 정책에 따라 부과됩니다.</p>
          <p class="mb10">ex) 수량, 박스, 크기, 무게</p>
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 상품배송비 안내 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupshippingFeeInfo",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupshippingFeeInfo');
      this.modalActiveEvent('popupshippingFeeInfo');
    },
  },
  mounted() {
    this.modalActiveEvent('popupshippingFeeInfo');
  }
};
</script>
