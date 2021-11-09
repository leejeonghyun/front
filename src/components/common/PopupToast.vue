<template>
  <!-- START : toast 레이어 -->
  <div id="popupToast" class="wrap-toast-layer" role="status" :class="{active : this.modalActive.popupToast}">
    <div class="toast-layer-inner">
      <div class="layer-content">
        <!--<div class="message">{{ ToastMessage }}</div>-->
        <div v-html="ToastMessage"></div>
      </div>
    </div>
  </div>
  <!-- END : toast 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ToastPopupMixin from '@/mixins/ToastPopupMixin';
export default {
  name: 'PopupToast',
  props: ['ToastMessage', 'popupToast', 'popupToastType'], // 9월 수정 토스트 팝업 props 값 변경
  data() {
    return {
    };
  },
  directives: {},
  mixins: [LayerPopupMixin, ToastPopupMixin],
  components: {
  },
  methods: {
  },
  mounted() {
    this.toastCloseEvent(this.popupToastType); // 9월 수정 토스트 (팝업 ID 넘겨주기)
  },
};
</script>
