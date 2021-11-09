<template>
  <div id="popupLicence" class="wrap-full-popup" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
    <div class="header-popup">
      <strong>오픈 라이선스</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="wrap-open-licence">
          <h3>앱 오픈소스 라이브러리<span>(Android, iOS 공통)</span></h3>
          <p>zxing: 바코드, QR코드 인식</p>
          <h3>서버 오픈소스 라이브러리</h3>
          <p>.log4j : apache License</p>
          <p>.junit</p>
          <h3>서버 오픈소스 라이브러리</h3>
          <p>.log4j : apache License</p>
          <p>.junit</p>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "OpenLicence",
  mixins: [LayerPopupMixin],
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupLicence');
      this.modalActiveEvent('popupLicence');
    },
  },
  mounted() {
    this.modalActiveEvent('popupLicence');
  }
};
</script>

<style>

</style>
