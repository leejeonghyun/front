<!--
views/od/SC-FO-OD-GS-MP-008
-->
<template>
    <!-- START : alert 레이어 -->
    <div id="popupAlert" class="wrap-layer alert-layer active" role="dialog" aria-labelledby="popupAlert" aria-modal="true" v-bind:class="[siteClass]">
      <div class="layer-bg"></div>
      <div class="alert-layer-inner">
        <div class="inner-box">
          <div class="title" v-if="title"><h3>{{title}}</h3></div>
          <div class="layer-content">
            <div class="message" v-html="msg"></div>
          </div>
        </div>
        <div class="btn-alert-bottom">
          <button class="btn-cancel" @click="onCancelAction">취소</button>
          <button class="btn-confirm" @click="onLinkAction">{{linkNm}}</button>
        </div>
      </div>
    </div>
    <!-- END : alert 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupAlert",
  props: {
    popupAlertInfo: Object,
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    onLinkAction(event) {
      event.preventDefault();
      this.$router.push(this.linkUrl);
    },
    onCancelAction(event) {
      event.preventDefault();
      this.$router.push(this.cancelUrl);
    }
  },
  created() {
  },
  watch: {
  },
  computed: {
    title() {
      return this.popupAlertInfo.title;
    },
    msg() {
      return this.popupAlertInfo.msg;
    },
    linkNm() {
      return this.popupAlertInfo.linkNm;
    },
    linkUrl() {
      return this.popupAlertInfo.linkUrl;
    },
    cancelUrl() {
      return this.popupAlertInfo.cancelUrl;
    },
  },
  mounted() {

  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
