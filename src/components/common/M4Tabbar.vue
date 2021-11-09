<template>
  <div class="wrap-tabbar st-m4">
    <div class="wrap-btn-tabbar">
      <transition name="widthTransition">
        <div v-if="channelPosition === 'left'" class="wrap-channel" :class="{open: channelOpen, left: channelPosition === 'left'}"><!-- 6월 수정 위치값 클래스 추가 -->
          <button ref="channelBtn" class="btn-tabbar channel" aria-label="통합채널활성화" aria-haspopup="dialog" @click="channelOnOff" @touchstart="!channelOpen && channelPositionInit()" @touchmove="!channelOpen && channelPositionMove()" @touchend="channelPositionChange">
            <span class="logo">
              <img v-if="!channelOpen" src="@/assets/images/img/logo_marketfor_tabbar.png" alt="Market For Logo" />
            </span>
            <div v-if="channelOpen" class="ui-bg"></div>
          </button>
          <button v-if="popup.intergratedUI" class="btn-tabbar channel" @click="channelOnOff">
            <img src="@/assets/images/icon/ico_tabbar_channel_on.png" alt="Market For Logo" />
          </button>
        </div>
      </transition>
      <ul>
        <li>
          <button
            class="btn-tabbar category"
            aria-label="카테고리 전체메뉴 팝업활성화"
            aria-haspopup="dialog"
            data-sc-action="link.click"
            data-dimension-name="link.footer"
            data-dimension-value="quick nav^카테고리"
            @click="categoryAction"
          >카테고리</button>
        </li>
        <li>
          <button
            class="btn-tabbar recent"
            @click="goRecentItem"
            data-sc-action="link.click"
            data-dimension-name="link.tabBar"
            data-dimension-value="quick nav^최근본상품"
          >최근 본 상품</button>
        </li>
        <li>
          <button
            class="btn-tabbar home"
            @click="goHome"
            data-sc-action="link.click"
            data-dimension-name="link.tabBar"
            data-dimension-value="quick nav^HOME"
          >HOME</button>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="toMypage"
            class="btn-tabbar mypage"
            data-sc-action="link.click"
            data-dimension-name="link.tabBar"
            data-dimension-value="quick nav^마이페이지"
          >마이페이지</a>
        </li>
      </ul>
      <transition name="widthTransition">
        <div v-if="channelPosition === 'right'" class="wrap-channel" :class="{open: channelOpen, right: channelPosition === 'right'}"><!-- 6월 수정 위치값 클래스 추가 -->
          <button ref="channelBtn" class="btn-tabbar channel" aria-label="통합채널활성화" aria-haspopup="dialog" @click="channelOnOff" @touchstart="!channelOpen && channelPositionInit()" @touchmove="!channelOpen && channelPositionMove()" @touchend="channelPositionChange">
            <span class="logo">
              <img v-if="!channelOpen" src="@/assets/images/img/logo_marketfor_tabbar.png" alt="Market For Logo" />
            </span>
            <div v-if="channelOpen" class="ui-bg"></div>
          </button>
          <button v-if="popup.intergratedUI" class="btn-tabbar channel right" @click="channelOnOff">
            <img src="@/assets/images/icon/ico_tabbar_channel_on.png" alt="Market For Logo" />
          </button>
        </div>
      </transition>
      <IntergratedUI :popup="popup.intergratedUI" :channelPosition="channelPosition" @popupEvent="popupAction"  @channelOff="channelOnOff"/>
    </div>
  </div>
</template>

<script>
import IntergratedUI from '@/views/ss/M4StorMallMoveBanner';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: 'Tabbar',
  props: ['showTabbar', 'sidebar'],
  data() {
    return {
      // 통합UI 버튼 위치
      channelPosition: 'right',
      // 통합UI 팝업 오픈 여부
      channelOpen: false,
      popup: {
        open: false,
        intergratedUI: false,
      },
      // 통합UI 좌우 여백 수치
      btnPositionLeft: 13,
      // 통합UI 버튼의 기본 크기
      btnWidth: 63,
      // 통합UI transition
      btnTransition: [
        'box-shadow ease-in-out 200ms',
        'left ease-in-out 200ms',
        'transform ease-in-out 200ms',
        'background-color ease-in-out 200ms 400ms',
        'background-image ease-in-out 200ms 400ms',
        'width ease-in-out 200ms',
        'height ease-in-out 200ms',
      ],
      // 통합UI 팝업 오픈시 transition (가로모드시 버튼의 위치값 모션 삭제)
      btnTransitionLeftNone: [
        'box-shadow ease-in-out 200ms',
        'transform ease-in-out 200ms',
        'background-color ease-in-out 200ms 400ms',
        'background-image ease-in-out 200ms 400ms',
        'width ease-in-out 200ms',
        'height ease-in-out 200ms',
      ],
    };
  },
  components: {
    IntergratedUI,
  },
  computed: {
    popupClose() {
      return this.popup.intergratedUI;
    }
  },
  watch: {
    popupClose(value, oldValue) {
      if (!value) this.channelOpen = false;
    },
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      disableBodyScroll(this);
    } else {
      clearAllBodyScrollLocks(this);
    };
    this.$emit('tabbardataEvent', this.channelOpen);
  },
  created: async function() {
    // 저장된 Radial 위치 호출
    this.channelPosition = (CookieUtils.getCookie('MARKETFOR_RADIAL_POSITION') == "") ? "right" : CookieUtils.getCookie('MARKETFOR_RADIAL_POSITION');
  },
  mounted() {
    // const $this = this;
    // 하단 버튼
    // const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    // if (ios) {
      window.addEventListener('scroll', function() {
        // $this.bottomFixedBtnAction(window.pageYOffset);
      });
    // }
    window.addEventListener('resize', this.channelPOsitionReset);
    this.$emit('tabbardataEvent', this.channelOpen);
  },
  destroyed() {
    window.removeEventListener('scroll', this);
    window.removeEventListener('resize', this.channelPOsitionReset);
  },
  methods: {
    popupAction(type) {
      this.popup.open = !this.popup.open;
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    toMypage() {
      const myPageUrl = SiteUtils.commo('/cu/my_page');
      location.href = myPageUrl;
    },
    goRecentItem() {
      // [1. 로그인상태]
      if (LoginUtils.isLogin()) {
        const myRecentItemUrl = SiteUtils.commo('/cu/my_page_m4_recent_item');
        location.href = myRecentItemUrl;
      // [2. 비로그인상태]
      } else {
        const vm = this;
        this.$gsdialog.confirm('로그인이 필요합니다.<br>로그인 페이지로 이동하시겠습니까?', { html: true }).then( () => {
          vm.toLogin();
        }).catch( e => console.log(e) );
      }
    },
    // [로그인 페이지]
    toLogin() {
      const returnUrl = encodeURIComponent(location.href);
      const loginUrl = SiteUtils.commo('/cu/login?returnUrl=' + returnUrl);
      location.href = loginUrl;
    },
    goHome() {
      if ( CookieUtils.getCmmSteId() == '1' ) {
        location.href = SiteUtils.freshmo('/?t=')+Date.now();
      } else if ( CookieUtils.getCmmSteId() == '2' ) {
        location.href = SiteUtils.dalimo('/?t=')+Date.now();
      } else {
        location.href = SiteUtils.marketformo('/?t=')+Date.now();
      }
    },
    toBskt() {
      SiteUtils.go(location.host, '/od/mf/bskt');
    },
    categoryAction() {
      this.$emit('categoryEvent');
    },
    searchAction() {
      this.$emit('searchbarEvent');
    },
    // 화면 리사이즈시 통합UI 버튼 위치 재 정렬
    channelPOsitionReset() {
      if (this.channelPosition === 'right') {
        const positionLeft = window.innerWidth - (this.btnWidth + this.btnPositionLeft);
        this.$refs.channelBtn.style.left = `${positionLeft}px`;
      }
    },
    // 통합UI 버튼 이동 함수
    channelPositionInit() {
      event.target.style.left = `${event.target.offsetLeft}px`;
    },
    // 통합UI 버튼 터치 시작 후 이동
    channelPositionMove() {
      disableBodyScroll(this);

      event.target.style.transition = '';
      event.target.style.right = 'auto';
      event.target.style.left = `${event.touches[0].clientX}px`;
      event.target.style.transform = 'translateX(-50%)';
    },
    // 통합UI 버튼 터치 끝
    channelPositionChange() {
      clearAllBodyScrollLocks(this);

      // 화면의 왼쪽 기준 30% 수치
      const screenWidth30 = window.innerWidth / 3;
      // 버튼의 위치(left) 수치
      const targetLeft = parseInt(event.target.style.left);
      // 버튼 오른쪽 이동 boolean 값
      const moveRight = this.channelPosition === 'left' && screenWidth30 < targetLeft;
      // 버튼 왼쪽 이동 boolean 값
      const moveLeft = this.channelPosition === 'right' && (screenWidth30 * 2) <= targetLeft;
      let position = this.channelPosition;

      event.target.style.transition = this.btnTransition;

      if ( !this.channelOpen && moveRight || !this.channelOpen && moveLeft ) {
        position = 'right';
        const positionLeft = window.innerWidth - (event.target.offsetWidth + this.btnPositionLeft);
        event.target.style.right = '';
        event.target.style.left = `${positionLeft}px`;
      } else if (!this.channelOpen) {
        position = 'left';
        event.target.style.left = `${this.btnPositionLeft}px`;
      }
      // Radial 위치 저장
      CookieUtils.setCookie('MARKETFOR_RADIAL_POSITION', position);

      event.target.style.transform = '';

      setTimeout(() => {
        this.channelPosition = position;
      }, 200);
    },
    // 통합UI 열기 닫기
    channelOnOff() {
      this.channelOpen = !this.channelOpen;
      this.popup.open = !this.popup.open;
      this.popup.intergratedUI = !this.popup.intergratedUI;
      if (this.channelOpen) {
        event.target.style.transition = this.btnTransitionLeftNone;
        this.$refs.channelBtn.classList.remove('offchannel');
        this.$parent.setHeader("up");
      } else {
        this.$refs.channelBtn.classList.add('offchannel');
        this.$parent.setHeader("del");
      }
    }
  },
};
</script>

<style>

</style>
