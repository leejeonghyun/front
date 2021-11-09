<!-- 헤더 4 : 이전/홈/검색/장바구니 -->
<template>
  <!-- header, Tabbar, Sidebar components -->
  <div class="section-header">
    <!-- Header 정보 -->
    <header class="subheader" :class="{'header-none-fixed' : headerText.length === 0}">
      <div class="wrap-headerbar">
        <a href="javascript:history.back();" role="button" class="btn-prev" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^뒤로가기">
          <span class="hidden">뒤로가기</span>
        </a>
        <a href="javascript:void(0);" role="button" @click="goHome" class="btn-home" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^홈">
          <span class="hidden">GS 프레시몰 홈 바로가기</span>
        </a>
        <h1 class="header-title">{{ headerText }}</h1>
        <button class="btn-search" @click="searchbarAction" title="검색팝업 열기" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^검색">
          <span class="hidden">검색</span>
        </button>
        <a href="javascript:void(0);" @click="toBskt" class="btn-cart" title="장바구니 바로가기" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^장바구니">
          <span class="num"><span class="hidden">장바구니 개수</span>
            <span v-if="$store.state.dp.bsktQty >= 99">99+</span>
            <span v-else>{{$store.state.dp.bsktQty}}</span>
          </span>
        </a>
      </div>
    </header>
    <template>
      <div class="floating-btn-area default">
          <a href="javascript:history.back();" class="btn-bottom-prev"><span class="hidden">뒤로가기</span></a>
          <a href="javascript:void(0);" class="btn-bottom-top" @click="gotoTop"><span class="hidden">상단으로 이동</span></a>
        </div>
    </template>
    <PopupSearch v-if="searchbar.active" :searchbarActive="searchbar.active" @searchbarEvent="searchbarAction"/>
  </div>
</template>
<script>
// import PopupSearch from '@/views/ss/PopupSearch'; // 팝업 - 검색
import PopupSearch from '@/views/ss/M4PopupSearch'; // 팝업 - 검색
import scrollDir from 'scrolldir';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import SiteUtils from '@/common/SiteUtils';
import LoginUtils from '@/common/LoginUtils';
import ContextUtils from '@/common/ContextUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "Header4",
  props: {
    headerText: { // 페이지 타이틀
      type: String,
      default: ''
    },
    isLogin: Boolean, // 로그인여부 (달리살다 퍼블용)
  },
  components: {
    PopupSearch
  },
  data() {
    return {
      sidebar: {
        active: false, // 사이드바 활성화
        sidebarBtn: {}, // 사이드바 포커스 이벤트
      },
      searchbar: {
        active: false, // 검색 팝업 활성화
        searchBtn: {} // 검색 포커스 이벤트
      },
      deliveryList: {
        active: false, // 배송지 목록 팝업 활성화
      },
      lastScroll: 0,
      showTabbar: true, // 하단 탭바 활성화
      isTyping: true,
      channelOpen: null,
      mallActive: 2,
    };
  },
  async created() {
    try {
      const odBsktUuid = CookieUtils.getOdBsktUuid();
      const params = {
        odBsktUuid: odBsktUuid,
      };
      this.$store.dispatch('getBsktQtyInfo', params);
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
    if (CookieUtils.getMallId() === '11') {
      // 달리살다
      this.mallActive = 1;
    } else {
      // gsfresh
      this.mallActive = 2;
    }
  },
  methods: {
    typingDestroyAction() { // 하단 티커 비활성화 함수
      this.isTyping = null;
    },
    searchbarAction() { // 검색 팝업 함수
      console.log('eventTarget : ');
      console.log(event.target);
      console.log(event.target.tagName);
      console.log('active:'+this.searchbar.active);
      this.searchbar.active = !this.searchbar.active;
      console.log('active:'+this.searchbar.active);
      if (event.target.tagName === 'BUTTON' && event.target.classList.value === 'btn-tabbar search') {
        console.log('*** Button active');
        this.searchbar.searchBtn = event.target;
      }
      console.log('searchBtn: ');
      console.log(this.searchbar.searchBtn);
      if (!this.searchbar.active) {
        console.log('*** focus active');
        // this.searchbar.searchBtn.focus();
      }
    },
    bottomFixedBtnAction(scroll) {
      const $floatingMenu = document.querySelector('.floating-btn-area');
      if (scroll > 0) {
        $floatingMenu.classList.add('show');
      } else {
        $floatingMenu.classList.remove('show');
      }
    },
    // 4월수정 : methods 추가
    scrollAction() {
      const $this = this;
      const $header = document.querySelector('.subheader');
      window.addEventListener('scroll', function() {
        window.pageYOffset > 0 ? $header.classList.add('fixed') : $header.classList.remove('fixed');
      });
      if (this.tabbar) {
        window.addEventListener('scroll', function() {
          $this.bottomFixedBtnAction(window.pageYOffset);
          $this.tabbarAction();
          $this.lastScroll = window.pageYOffset;
        });
      } else {
        if (!this.onlyTitleType) {
          window.addEventListener('scroll', function() {
            $this.bottomFixedBtnAction(window.pageYOffset);
          });
        }
      };
    },
    gotoTop(scroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    goHome() {
      SiteUtils.go(location.host, '/');
    },
    toBskt() {
      SiteUtils.go(location.host, '/od/bskt');
    },
  },
  mounted() {
    // 4월수정 : methods 추가
    this.scrollAction();
    scrollDir();
  },
 /* 4월수정 START : 이벤트 리스너 제거 */
  destroyed() {
    window.removeEventListener('scroll', this);
  },
  /* 4월수정 END : 이벤트 리스너 제거 */
  updated() {
    // 팝업 활성화 시 딤드 처리
    if (this.sidebar.active || this.searchbar.active) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      for (let i = 0; i < scrollYContents.length; i++ ) disableBodyScroll(scrollYContents[i]);
    } else clearAllBodyScrollLocks(this);
  }
};
</script>
