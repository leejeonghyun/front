<!--
views/od/SC-FO-SS-GF-MP-873
-->
<template>
  <div id="popupGiftInfo" class="wrap-full-popup active" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupGiftInfo}, siteClass]">
    <div class="header-popup">
      <strong>선물하기 이용안내</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section class="gift-receive-complete return-complete gift-guide">
          <div class="msg-complete">
            <h3 class="msg-complete-txt">연락처만 입력하고 선물하세요.</h3>
          </div>
          <ol class="wrap-list-guide">
            <li>
              <strong class="step-num">Step 1.</strong>
              <p class="step-title">선물 선택하기</p>
              <ul class="wrap-list-desc">
                <li>
                  <span class="ic-way">방법1</span>상품상세페이지에서 바로 선물하기
                </li>
                <li>
                  <span class="ic-way">방법2</span>장바구니페이지에서 여러 상품 선물하기
                </li>
              </ul>
            </li>
            <li>
              <strong class="step-num">Step 2.</strong>
              <p class="step-title">연락처 및 메시지 입력</p>
            </li>
            <li>
              <strong class="step-num">Step 3.</strong>
              <p class="step-title">연락처 및 메시지 입력</p>
            </li>
            <li>
              <strong class="step-num">Step 4.</strong>
              <p class="step-title">선물 받기/배송</p>
            </li>
          </ol>
          <!-- START : 하단 버튼 -->
          <div class="bottom-btn-area">
            <a href="#" type="button" class="btn-md btn-bg darkgray" @click="popupCloseAction">장바구니로 가기</a>
            <a href="#" type="button" class="btn-md btn-bg lightgreen">쇼핑하러 가기</a>
          </div>
          <!-- START : 하단 버튼 -->
        </section>
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
  name: "PopupGiftInfo",
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '이용안내 < 선물하기 < %s'
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupGiftInfo');
      this.modalActiveEvent('popupGiftInfo');
    }
  },
  mounted() {
    this.modalActiveEvent('popupGiftInfo');
  }
};
</script>
