<!--
views/od/SC-FO-OD-MF-MP-007
-->
<template>
  <!-- START : toast 레이어 -->
  <div id="popupAppToast" class="wrap-layer app-toast-layer active" :class="{active : this.modalActive.popupAppToast}"> <!-- 디자인 확인용으로 active 클래스 추가함 -->
    <div class="layer-bg"></div>
    <div class="app-toast-layer-inner">
      <div class="layer-content">
        <div class="message">최소 구매 수량은 1개 입니다.</div>
        <div class="message">최대 구매 수량은 999개 입니다.</div>
      </div>
    </div>
  </div>
  <!-- END : toast 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "PopupToast2",
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupAppToast');
      this.modalActiveEvent('popupAppToast');
    },
  },
  mounted() {
    this.modalActiveEvent('popupAppToast');
  }
};
</script>
