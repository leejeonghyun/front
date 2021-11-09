<!--
views/ss/SC-FO-SS-GF-MP-906.vue
-->
<template>
  <!-- START : 보낸 메시지 보기 레이어 -->
  <div id="popupDaliSentMessages" class="wrap-layer dali-member-layer" role="dialog" aria-labelledby="popupDaliSentMessages" aria-modal="true" :class="[{active : this.modalActive.popupDaliSentMessages}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title no-border">
          <h3>보낸 메시지 보기</h3>
        </div>
        <div class="layer-content">
          <div class="sent-messages">
            <!--p>동백아, 건강챙겨! <br> 이거 써봐 좋아~!</p-->
            <p>{{ this.popup.promId }}</p>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
  </div>
  <!-- END : 보낸 메시지 보기 레이어 -->
</template>
<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import ApiUtils from '@/common/ApiUtils';
  import CookieUtils from '@/common/CookieUtils';
  export default {
    name: "PopupDaliSentMessages",
    props: ['popup'],
    data() {
      return {
        siteClass: CookieUtils.getSiteClass(),
      };
    },
    mixins: [LayerPopupMixin],
    methods: {
      popupAction() {
        this.$emit('popupEvent', 'popupDaliSentMessages');
        this.modalActiveEvent('popupDaliSentMessages');
      }
    },
    mounted() {
      this.modalActiveEvent('popupDaliSentMessages');
    }
  };
</script>
