<template>
  <!-- <div id="popupDalidreamAgree" class="wrap-full-popup active" role="dialog" aria-modal="true"> -->
  <!-- : 실사용 소스 -->
  <div id="popupDalidreamAgree" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupDalidreamAgree}, siteClass]">
    <div class="header-popup">
      <!-- 5월수정 START : 문구 수정 -->
      <strong>이용약관 동의</strong>
      <!-- 5월수정 END : 문구 수정 -->
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="wrap-dali-agree">
          <p class="txt">
            <!-- 5월수정 START : 문구 수정 -->
            달리드림 멤버십에 가입하시려면<br/>아래 이용약관에 동의해주세요.
            <!-- 5월수정 END : 문구 수정 -->
          </p>
          <!-- 5월수정 START : 약관 내용 변경 -->
          <div class="wrap-agreement">
            <div class="agree-content">
              <button type="button" class="btn-arrow" aria-haspopup="dialog" @click="ppopupAction('popupThePopAgreement')">
                [필수] THE POP+ 이용약관 동의
              </button>
              <button type="button" class="btn-arrow" aria-haspopup="dialog" @click="ppopupAction('popupOverseasAgreement')">
                [필수] 해외구매대행 이용약관 동의
              </button>
            </div>
          </div>
          <!-- 5월수정 END : 약관 내용 변경 -->
        </div>
        <div class="btn-area horizon">
          <button type="button" class="btn-dali daligreen" @click="pmbsReg" data-sc-action="card.register.click">동의 후 정기결제카드 등록하기</button>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" aria-haspopup="dialog" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>

import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import ApiUtils from '@/common/ApiUtils';
import Tracker from '@/common/Tracker';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupDalidreamAgree",
  props: ['popup'],
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
  },
  mixins: [LayerPopupMixin, AccordionMixin],
  methods: {
    popupAction() {// closed
      this.$emit('popupEvent', 'popupDalidreamAgree');
      this.modalActiveEvent('popupDalidreamAgree');
    },
    pmbsReg() {
      this.$parent.pmbsReg();
      this.$emit('popupEvent', 'popupDalidreamAgree');
    },
    ppopupAction(typ) {
      this.$parent.popupAction(typ);
      this.popupAction();
    },
  },
  mounted() {
    this.modalActiveEvent('popupDalidreamAgree');
    const page = {
      pageName: '달리드림 멤버십^이용약관 동의'
    };
    Tracker.pageView(page);
  }
};
</script>
