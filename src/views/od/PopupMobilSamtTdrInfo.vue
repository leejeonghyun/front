<!--
views/od/SC-FO-PA-GS-MP-018
-->
<template>
    <!-- START : 휴대폰 소액결제 레이어 -->
    <div id="popupMicropayments" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupMicropayments" aria-modal="true" :class="[{active : this.modalActive.popupMicropayments}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>휴대폰 소액결제</h3>
          </div>
          <div class="layer-content">
            <ul class="list-dot">
              <li>휴대폰 소액결제는 이동통신사에서 고객님에게 제공된 결제 한도 내에서 결제하실 수 있습니다.</li>
              <li>휴대폰 소액결제의 취소 가능일자는 결제일 당월 내에서만 가능하며, 이후에는 취소가 불가합니다.</li>
              <li>결품 및 고객님의 사유로 취소 가능일자 이후 환불 요청은 GS&amp;POINT로 적립해 드리며, 전국 GS 가맹점 어디서나 현금처럼 사용이 가능합니다.</li>
              <li>부분 결제 취소가 불가능한 결제수단으로 이용하신 경우 포인트로 환불처리 됩니다.</li>
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 휴대폰 소액결제 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupMicropayments",
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
      this.$emit('popupEvent', 'popupMicropayments');
      this.modalActiveEvent('popupMicropayments');
    },
  },
  mounted() {
    this.modalActiveEvent('popupMicropayments');
  }
};
</script>
