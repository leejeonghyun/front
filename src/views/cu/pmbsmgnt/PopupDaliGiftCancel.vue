<!--
views/ss/SC-FO-SS-GF-MP-907.vue
-->
<template>
  <!-- START : 선물하기 결제 취소 알림 레이어 -->
  <div id="popupDaliGiftCancel" class="wrap-layer dali-member-layer" :class="[{active : this.modalActive.popupDaliGiftCancel}, siteClass]" role="dialog" aria-modal="true">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner notice">
      <div class="inner-box full">
        <div class="title">
          <h3>알림</h3>
        </div>
        <div class="layer-content">
          <div class="txt">
            결제 취소하시겠습니까? <br>
            취소 즉시 선물 사용이 불가합니다.
          </div>
          <ul class="list-type-dot">
            <li>결제는 자동으로 취소됩니다.</li>
            <li>환불은 동일 결제수단으로 영업일 기준 3~7일 <br> 소요됩니다.</li>
            <li>자세한 사항은 카드사로 확인바랍니다.</li>
          </ul>
        </div>
      </div>
      <!-- START : 하단 버튼 -->
      <div class="btn-bottom-area">
        <button type="button" @click="popupAction" class="daligray"><span>닫기</span></button>
        <button type="button" @click="popupAction1" class="daligreen"><span>취소하기</span></button>
      </div>
      <!-- END : 하단 버튼 -->
      <!-- <button class="btn-layer-close" @click="popupAction">
        <span class="hidden">닫기</span>
      </button> -->
    </div>
  </div>
  <!-- END : 선물하기 결제 취소 알림 레이어 -->
</template>
<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import CookieUtils from '@/common/CookieUtils';
  export default {
    name: "PopupDaliGiftCancel",
    data() {
      return {
        siteClass: CookieUtils.getSiteClass(),
      };
    },
    // metaInfo: {
    //   title: CookieUtils.getMetaInfoTitle(),
    //   titleTemplate: '보낸선물 < %s'
    // },
    mixins: [LayerPopupMixin],
    components: {},
    methods: {
      popupAction() {
        this.$emit('popupEvent', 'popupDaliGiftCancel');
        this.modalActiveEvent('popupDaliGiftCancel');
      },
      popupAction1() {
        this.$parent.giftCancle();
        this.$emit('popupEvent', 'popupDaliGiftCancel');
        this.modalActiveEvent('popupDaliGiftCancel');
      }
    },
    mounted() {
      this.modalActiveEvent('popupDaliGiftCancel');
    }
  };
</script>
<style lang="scss">
</style>
