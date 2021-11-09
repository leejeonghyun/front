<!--
views/od/SC-FO-OD-GS-MP-038
-->
<template>
    <!-- START : alert 레이어 -->
    <div id="popupAlert2plus1" class="wrap-layer alert-layer plus-alert-layer" role="dialog" aria-labelledby="popupAlert2plus1" aria-modal="true" :class="[{active : this.modalActive.popupAlert2plus1}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="alert-layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>{{nplusOneNoStsfTitle}}</h3>
          </div>
          <div class="layer-content">
            <div class="message" v-html="nplusOneNoStsfMsg"></div>
          </div>
        </div>
        <div class="btn-alert-bottom">
          <!-- 수정 START : 2020.02.06 'col1'클래스 삭제 -->
          <button class="btn-confirm" @click="popupAction">증정 선택하기</button>
          <!-- 수정 END : 2020.02.06 'col1'클래스 삭제 -->
        </div>
      </div>
    </div>
    <!-- END : alert 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    nplusOneNoStsfTitle: String,
    nplusOneNoStsfMsg: String
  },
  name: "PopupAlert",
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
    popupAction() {
      this.$emit('popupEvent', 'popupAlert2plus1');
      this.modalActiveEvent('popupAlert2plus1');
    },
  },
  mounted() {
    this.modalActiveEvent('popupAlert2plus1');
  },
};
</script>
