<!--
Design: views/cu/SC-FO-CU-GF-MP-023
Pg id:
Uri: /cu/pop_dormant_account
-->
<template>
  <div id="optionDefault" class="wrap-full-popup active" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
    <!-- : 실사용 소스 -->
    <!-- <div id="optionDefault" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.optionDefault}"> -->
    <div class="header-popup">
      <strong>휴면회원 해제 안내</strong>
    </div>
    <div class="full-popup-body scroll-area login">
      <div class="inner-full-popup">
        <div class="wrap-user-form dormant">
          <div class="inner">
            <p class="txt-title">
              고객님의 계정은 오랫동안
              <br />로그인하지 않아 현재
              <span class="txt-point">휴면상태</span>입니다
              <br />휴면 해제해주세요
            </p>
            <!-- START : 하단 버튼 -->
            <div class="sub-btn-area">
              <button
                type="button"
                class="btn-lg btn-bg lightgreen"
                @click="popupCloseAction"
              >휴면 해제하기</button>
            </div>
            <!-- START : 하단 버튼 -->
          </div>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import Tracker from '@/common/Tracker';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'PopupDormantAccount',
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '휴면회원 해제 안내 팝업 < 로그인 < %s',
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {},
  methods: {
    popupCloseAction() {
      // closed
      this.$emit('popupEvent', 'popupDormantAccount');
      // Adobe Analytics 휴면해제
      Tracker.userActive();
      this.modalActiveEvent('popupDormantAccount');
    },
  },
  mounted() {
    this.modalActiveEvent('popupDormantAccount');
  },
};
</script>
