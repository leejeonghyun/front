<!--
SC-FO-CU-GF-MP-018
-->
<template>
  <!-- 8월 수정 START : 디자인 디벨롭 수정 사항 (전체 마크업 수정) -->
  <transition name="signUpPopup"
    v-on:leave="signUpPopupLeave">
  <!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 팝업을 호출하는 페이지 안 최상위 요소에 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
  <div id="popupSignUpGSfinish" class="signup-layer active" v-bind:class="[siteClass]" role="dialog" aria-labelledby="popupSignUpGSfinish" aria-modal="true">
    <!-- 실사용 소스
    <div id="popupSignUpGSfinish" class="signup-layer " role="dialog" aria-labelledby="popupSignUpGSfinish" aria-modal="true" :class="{active : this.modalActive.popupSignUpGSfinish}">
      -->
    <div class="layer-bg" @click="popupAction"></div>
    <div class="signup-layer-inner v2">
      <h5 class="hidden">회원 가입 완료</h5>
      <div class="inner-box-a">
        <p class="text-welcome"><span class="text-welcome-name">반가워요 {{ korName }}님</span><br>첫구매 혜택 놓치지 마세요!</p>
        <ul class="benefit-list-a">
          <li class="list-item">
            <p class="title-benefit">놀라운 가격 <span class="text-point">첫구매딜 100원</span></p>
            <i class="ico-benefit-a"></i>
          </li>
          <li class="list-item">
            <p class="title-benefit">쇼핑 혜택이 넘치는 <span class="text-point">릴레이 쿠폰</span></p>
            <i class="ico-benefit-b"></i>
          </li>
          <li class="list-item">
            <p class="title-benefit">한달 내내 <span class="text-point">무료 배송 즐기기</span></p>
            <i class="ico-benefit-c"></i>
          </li>
        </ul>
        <div class="btn-area-a" v-if="siteClass !== 'marketfor'">
          <button class="btn-lg btn-bg lightgreen" @click="getDelivery"><span>배송지 등록하기</span></button>
        </div>
       <!-- <div class="title">
          <h6 class="welcome-user">반가워요<span>{{ korName }}님</span></h6>
          <p class="desc">배송지 등록하고<br/>딱 맞는 혜택을 누려보세요</p>
        </div>
        <div class="layer-content">
          <p class="signup-benefit"><span>첫</span>구매 <span>100</span>원</p>
          <a href="javascript:void(0);" class="btn-link" title="배송지 등록 페이지 이동" @click="getDelivery"><span>배송지 등록하기</span></a>
        </div>-->
        <div class="btn-area v2">
          <button class="btn-layer-close sign-up" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
            <span class="hidden">닫기</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  </transition>
  <!-- 8월 수정 END : 디자인 디벨롭 수정 사항 (전체 마크업 수정) -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import Tracker from '@/common/Tracker';
import StringUtils from '@/common/StringUtils';
import CuUtils from '@/common/cu/CuUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'PopupSignUpGSfinish',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '간편회원 < 회원가입 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '회원가입^완료',
      },
    ],
  },
  props: {
    mbrJoinMethod: {
      type: String,
    }
  },
  data() {
    return {
      form: {
        gbn: '',
      },
      korName: CookieUtils.getCookie('CUST_NM'),
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {},
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupSignUpGSfinish');
      const returnUrl = this.$route.query.returnUrl;
      if (!StringUtils.isEmpty(returnUrl)) {
        location.href = returnUrl;
      } else {
        const string = CuUtils.getLink();
        location.href = string;
      }
      this.modalActiveEvent('popupSignUpGSfinish');
    },
    getDelivery() {
      this.$router.push('/cu/delivery_place_add');
    },
    // 8월 수정 : 디자인 디벨롭 수정 사항
    signUpPopupLeave(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
  },
  mounted() {
    const vm = this;
    this.form.gbn = vm.$store.state.cu.recCert;
    Tracker.signupComplete(this.mbrJoinMethod);
    try {
      this.$gtag.event('sign_up', { 'method': 'Online Register' });
    } catch (e) {
    }
    // this.modalActiveEvent('popupSignUpGSfinish');
  },
};
</script>
