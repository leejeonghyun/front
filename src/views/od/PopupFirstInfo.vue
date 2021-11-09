<!--
views/od/SC-FO-OD-GS-MP-022
-->
<template>
    <!-- START : 첫구매 안내 레이어 -->
    <div id="popupFirst" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupFirst" aria-modal="true" :class="[{active : this.modalActive.popupFirst}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>첫 구매 혜택 안내</h3>
          </div>
          <div class="layer-content">
            <div class="list-dot">
            <p>첫 구매 혜택 상품은 첫 구매 고객을 대상으로 장바구니에 노출되는 상품입니다.</p>
            <p>행사상품 중 1개 상품 선택 / 구매가 가능합니다.</p>
            <p>배송지역에 따라 제공되는 상품이 상이할 수 있습니다.</p>
          </div>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 첫구매 안내 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupFirstInfo",
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
      this.$emit('popupEvent', 'popupFirst');
      this.modalActiveEvent('popupFirst');
    },
  },
  mounted() {
    this.modalActiveEvent('popupFirst');
  }
};
</script>
