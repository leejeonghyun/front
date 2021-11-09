<!--
views/od/SC-FO-OD-GS-MP-008
-->
<template>
    <!-- START : alert 레이어 -->
    <div id="popupAlert" class="wrap-layer alert-layer" role="dialog" aria-labelledby="popupAlert" aria-modal="true" :class="[{active : this.modalActive.popupAlert}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="alert-layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>입고 알림 받기</h3>
          </div>
          <div class="layer-content">
            <div class="message">7일 이내 재입고 되면 알림으로 알려드립니다.<br>알림을 받으시겠습니까?</div>
          </div>
        </div>
        <div class="btn-alert-bottom">
          <button class="btn-cancel" @click="popupAction">취소</button>
          <button class="btn-confirm" @click="showToastAction">알림신청하기</button>
        </div>
      </div>
    </div>
    <!-- END : alert 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ToastPopupMixin from '@/mixins/ToastPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupAlert",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin, ToastPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupAlert');
      this.modalActiveEvent('popupAlert');
    },
    showToastAction() {
      this.$emit('reqRstkinInfm');
      this.$emit('popupEvent', 'popupAlert');
    }
  },
  mounted() {
    this.modalActiveEvent('popupAlert');
  },
};
</script>
