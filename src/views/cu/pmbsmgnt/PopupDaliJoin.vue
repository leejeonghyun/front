<!--
views/ss/SC-FO-SS-GF-MP-909.vue
-->
<template>
  <!-- 4월수정 START : alert 팝업 -> full 팝업으로 변경-->
  <!-- START : 유료 멤버십 Trial 가입하기 레이어 -->
  <div id="popupDaliJoin" class="wrap-full-popup dali-member-layer" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupDaliJoin}, siteClass]">
    <div class="header-popup no-line">
      <strong></strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="layer-inner charge">
          <strong class="intro">환영합니다
            <span><em class="name">{{ this.popup.infoArr.korName }}</em>님 달리드림 멤버십의 혜택을 누려보세요</span>
          </strong>
          <div class="ly-charge">
            <div class="title logo">
              <strong class="h-level"><span>달리드림 멤버십</span></strong>
            </div>
            <div class="layer-content">
              <div class="dali-benefit">
                <p class="txt">월 가입비 <span class="price">3,900원</span>, 가입 즉시 멤버십 혜택 시작!</p>
                <!-- 4월수정 START : 문구 수정 -->
                <p class="pop-txt">달리드림 회원만 누릴 수 있는 혜택을 <br> <span class="price">60일 동안 무료체험</span> 해보세요</p>
                <!-- 4월수정 END : 문구 수정 -->
                <div class="benefit-details">
                  <ul class="benefit-list">
                    <!-- 4월수정 START : 혜택 수정 -->
                    <li class="ico-membership">
                      누구나!<br/>첫 가입 시<br/>60일 무료 제공
                    </li>
                    <li class="ico-discount">
                      상품 구매 시!<br/>최대 50%<br/>상시 할인
                    </li>
                    <li class="ico-overseas">
                      달리드림 멤버십 전용<br/>해외직구 서비스<br/>&amp;해외 무료 배송
                    </li>
                    <!-- 4월수정 END : 혜택 수정 -->
                  </ul>
                  <a href="#" class="link-benefit" @click="goUrl"><span>혜택 자세히 보기</span></a>
                  <p class="note">달리드림 멤버십 혜택을 받으시려면 신용/체크카드 <br> 등록이 필요합니다.</p>
                </div>
              </div>
            </div>
            <div class="btn-area">
              <button type="button" class="btn-lg btn-bg daligreen" aria-haspopup="dialog" @click="pmbsReg">60일 무료 체험하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
  <!-- END : 유료 멤버십 Trial 가입하기 레이어 -->
  <!-- 4월수정 END : alert 팝업 -> full 팝업으로 변경-->
</template>
<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import SiteUtils from '@/common/SiteUtils';
  import ApiUtils from '@/common/ApiUtils';
  import Tracker from '@/common/Tracker';
  import CookieUtils from '@/common/CookieUtils';
  import StringUtils from '@/common/StringUtils';
  export default {
    name: "PopupDaliJoin",
    props: ['popup', 'mbrJoinMethod'],
    data() {
      return {
        siteClass: CookieUtils.getSiteClass(),
      };
    },
    mixins: [LayerPopupMixin],
    methods: {
      popupAction() {
        this.$emit('popupEvent', 'popupDaliJoin');
        this.modalActiveEvent('popupDaliJoin');
      },
      goUrl() {
        location.href = SiteUtils.dalimo('/cp/gnb_dream_pass_benefit');
      },
      pmbsReg() {
        this.$parent.stepTwo();
        this.$emit('popupEvent', 'popupDaliJoin');
      }
    },
    mounted() {
      this.modalActiveEvent('popupDaliJoin');

      if (!StringUtils.isEmpty(this.mbrJoinMethod)) {
        Tracker.signupComplete(this.mbrJoinMethod);

        try {
          this.$gtag.event('sign_up', { 'method': 'Online Register' });
        } catch (e) {
          console.log(e);
        }
      } else {
        const mbrJoinMethodQry = this.$route.query.mbrJoinMethod;
        if (mbrJoinMethodQry) {
          Tracker.signupComplete(mbrJoinMethodQry);
        }
      }

      const page = {
        pageName: '달리드림 멤버십^환영합니다'
      };
      Tracker.pageView(page);
    }
  };
</script>
