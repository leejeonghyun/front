<template>
    <!-- START : alert 레이어 -->
    <div id="rstkinInfm" class="wrap-layer alert-layer" role="dialog" aria-labelledby="rstkinInfm" aria-modal="true" v-bind:class="[{active : this.modalActive.rstkinInfm}, siteClass]">
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
          <button class="btn-confirm" v-on:click="setRstkinInfmRqt">알림신청하기</button>
        </div>
      </div>
    </div>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
 name: "PopupRstkinInfm",
  mixins: [LayerPopupMixin],
  props: {
    dispType: {
      type: String,
      default: 'MD'
    },
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    popupAction() {
      this.$emit('popupAction', 'rstkinInfm');
      this.modalActiveEvent('rstkinInfm');
    },
    setRstkinInfmRqt() {
      this.$emit('rstkinInfmRqt');
    }
  },
  mounted() {
    // if (this.$props.dispType == 'MD') {
      this.modalActiveEvent('rstkinInfm');
    // }
  },
};
</script>
