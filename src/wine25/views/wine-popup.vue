<template>
  <div id="popupWineDefault" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupWineDefault}">
    <div class="header-popup">
      <strong>상세보기</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <img src="http://img.gsisuper.com/images/special_pickup/product/m_2800100052620-min.jpg">
      </div>
    </div>
    <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "PopupWineDefault",
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupWineDefault');
      this.modalActiveEvent('popupWineDefault');
    },
  },
  mounted() {
    this.modalActiveEvent('popupWineDefault');
  }
};
</script>
