<!--
views/od/SC-FO-OD-GS-MP-026
-->
<template>
  <div id="popupGiftCertification" class="wrap-full-popup active" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
    <!-- : 실사용 소스 -->
    <!-- <div id="popupGiftCertification" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupGiftCertification}"> -->
    <div class="header-popup">
      <strong>선물 받기 인증</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section class="gift-wrap gift-certification">
          <fieldset>
            <legend>선물받기 인증번호 입력</legend>
            <h2 class="hidden">선물 받기 인증</h2>
            <div class="msg-certification">
              <p>홍길동 고객님께서<br> 김영희님께 선물을 보내셨어요.</p>
              <p class="msg-txt-info">선물 정보 확인을 위한 인증 절차가 필요합니다.</p>
            </div>
            <div class="insert-number">
              <input type="number" class="inp-txt" value="" placeholder="인증번호 숫자 입력" title="인증번호 입력">
              <button type="button" class="btn-border btn-bg">인증번호 요청</button>
            </div>
            <div class="bottom-btn-area">
              <button type="button" class="btn-lg btn-bg darkgray">인증하기</button>
            </div>
          </fieldset>
        </section>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupGiftCertification",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물 받기 인증 < 선물하기 < %s'
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupGiftCertification');
      this.modalActiveEvent('popupGiftCertification');
    },
  },
  mounted() {
    this.modalActiveEvent('popupGiftCertification');
  }
};
</script>
