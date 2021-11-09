<template>
  <div id="popupImage" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupImage}">
    <div class="header-popup">
      <strong>이미지 확대보기</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <v-zoom :img="require('@/assets/images/_temp/_img_product12_01.jpg')" :width="'100%'" />
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import vZoom from 'vue-zoom';
export default {
  name: "PopupImageZoom",
  mixins: [LayerPopupMixin],
  components: {
    vZoom
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupImage');
      this.modalActiveEvent('popupImage');
    },
  },
  mounted() {
    this.modalActiveEvent('popupImage');
  }
};
</script>
