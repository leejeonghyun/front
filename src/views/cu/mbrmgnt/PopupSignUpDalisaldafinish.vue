<template>
  <div id="popupSignUpDalisaldafinish" class="wrap-full-popup active" role="dialog" aria-modal="true">
  <!-- : 실사용 소스 -->
  <!-- <div id="popupSignUpDalisaldafinish" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupSignUpDalisaldafinish}"> -->
    <div class="header-popup">
      <h5><strong>회원가입</strong></h5>
    </div>
    <div class="full-popup-body signup">
      <div class="inner-full-popup dalisalda">
        <div class="inner">
          <div class="area-text">
            <h6 class="title">
              환영합니다!
            </h6>
            <p class="desc">
              가입 쿠폰이 발급되었습니다. 쇼핑을 시작해보세요.
            </p>
          </div>
          <div class="wrap-dalidream">
            <div class="area-text">
              <h6 class="title">달리드림패스</h6>
              <div class="desc">
                달리드림패스란?  달리살다에서 구매 횟수에 제한 없이<br/>
                365일 할인받고 다양한 혜택을 누릴 수 있는 멤버십입니다
              </div>
            </div>
            <div class="area-cont">
              <p class="desc">
                매월 3,900원 달리드림패스로 누리는 다양한 혜택!
              </p>
            </div>
            <ul class="list-icon">
              <li class="ico-off">
                <p class="desc">20%~40%<br/>상시 할인</p>
              </li>
              <li class="ico-gift">
                <p class="desc">웰컴 기프트<br/>증정</p>
              </li>
              <li class="ico-crossbordershopping">
                <p class="desc">달리;<br/>해외직구</p>
              </li>
              <li class="ico-advancereservation">
                <p class="desc">달리;<br/>사전예약</p>
              </li>
            </ul>
            <a href="#" class="btn-link" title="혜택 자세히 보기 링크이동"><span>혜택 자세히 보기</span></a>
            <div class="notice">
              무료 체험을 하시려면 정기결제 카드 등록이 필요합니다.
            </div>
            <div class="btn-area">
              <a href="javascript:;" class="btn-signup btn-bg dalisalda">90일 무료 체험하기</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>

import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "PopupSignUpDalisaldafinish",
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: 'GS fresh',
    titleTemplate: '회원가입 < %s'
  },
  data() {
    return {
    };
  },
  components: {
  },
  methods: {
    popupCloseAction() {// closed
      this.$emit('popupEvent', 'popupDormantAccount');
      this.modalActiveEvent('popupDormantAccount');
    }
  },
   mounted() {
    this.modalActiveEvent('popupDormantAccount');
  }
};
</script>
