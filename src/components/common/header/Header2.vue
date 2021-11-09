<!-- 헤더 2 : 이전/타이틀 -->
<!-- <Header headerText="타이틀"/> -->
<template>
   <!-- header, Tabbar, Sidebar components -->
  <div class="section-header">
    <!-- Header 정보 -->
    <header class="subheader" :class="{'header-none-fixed' : headerText.length === 0}">
      <div class="wrap-headerbar">
        <a href="javascript:history.back();" role="button" class="btn-prev" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^뒤로가기">
          <span class="hidden">뒤로가기</span>
        </a>
        <h1 class="header-title">{{ headerText }}</h1>
      </div>
    </header>
    <template>
      <div class="section-bottom" :class="{active: showTabbar}" v-show="tabbar">
        <div class="floating-btn-area dafault">
          <a href="javascript:history.back();" role="button" class="btn-bottom-prev"><span class="hidden">뒤로가기</span></a>
          <a href="javascript:void(0);" class="btn-bottom-top" @click="gotoTop"><span class="hidden">상단으로 이동</span></a>
        </div>
      <Tabbar :showTabbar="tabbar" :sidebar="sidebar" @categoryEvent="sidebarAction" @searchbarEvent="searchbarAction" :mallActive="mallActive" @tabbardataEvent="tabbardataAction" />
      </div>
    </template>
     <!-- END : 하단 바로가기 탭바 정보 -->
    <!-- START : 카테고리 사이드바 -->
    <template v-if="mallActive === 1"><!-- 햄버거 메뉴 달리살다 케이스 -->
      <SidebarDali :sidebarActive="sidebar.active" @sidebarEvent="sidebarAction" @deliveryListEvent="deliveryListAction" :isLogin="true" />
    </template>
    <template v-else-if="mallActive === 3"><!-- 햄버거 메뉴 새벽배송 케이스 -->
      <SidebarDaybreak :sidebarActive="sidebar.active" @sidebarEvent="sidebarAction" @deliveryListEvent="deliveryListAction" :isLogin="true" />
    </template>
    <template v-else><!-- 햄버거 메뉴 GS fresh 케이스 -->
      <Sidebar :sidebarActive="sidebar.active" @sidebarEvent="sidebarAction" @deliveryListEvent="deliveryListAction" />
    </template>
    <!-- END : 카테고리 사이드바 -->
    <!-- 4월수정 START : 팝업 추가 -->
   <PopupDeliveryList :deliveryListActive="deliveryList.active" v-if="deliveryList.active" @popupEvent="deliveryListAction" /> <!-- 팝업 - 배송지 목록 -->
    <!-- 4월수정 END : 팝업 추가 -->
  </div>
</template>
<script>
import Tabbar from '@/components/common/Tabbar'; // 하단 탭 바
import Sidebar from '@/views/dp/Sidebar'; // 팝업 - 햄버거 메뉴 (GS fresh)
import SidebarDali from '@/views/dp/SidebarDali'; // 팝업 - 햄버거 메뉴 (달리살다)
import SidebarDaybreak from '@/views/ss/SidebarDaybreak'; // 팝업 - 햄버거 메뉴 (새벽배송)
import PopupDeliveryList from '@/views/pa/PopupDeliveryList'; // 팝업 - 배송지 목록
import scrollDir from 'scrolldir';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
export default {
  name: "Header2",
 props: {
    headerText: { // 페이지 타이틀
      type: String,
      default: '',
    },
    tabbar: {
      type: Boolean,
      default: false
    },
    mallActive: { // mall active index 값
      type: Number,
      default: 5,
    },
  },
  components: {
    Tabbar,
    Sidebar,
    SidebarDali,
    SidebarDaybreak,
    PopupDeliveryList,
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
      showTabbar: this.tabbar, // 하단 탭바 활성화
      lastScroll: 0,
      isTyping: true,
      channelOpen: null,
    };
  },
  methods: {
    searchOpenAction() {
      this.$emit('searchbarEvent');
    },
    bottomFixedBtnAction(scroll) {
      const $floatingMenu = document.querySelector('.floating-btn-area');
      if (scroll > 0) {
        $floatingMenu.classList.add('show');
      } else {
        $floatingMenu.classList.remove('show');
      }
    },
    typingDestroyAction() { // 하단 티커 비활성화 함수
      this.isTyping = null;
    },
    // 4월수정 : methods 추가
    scrollAction() {
      const $this = this;
      const $header = document.querySelector('.subheader');
      window.addEventListener('scroll', function() {
        window.pageYOffset > 0 ? $header.classList.add('fixed') : $header.classList.remove('fixed');
      });
      // tabbar가 있는 경우
      window.addEventListener('scroll', function() {
        $this.bottomFixedBtnAction(window.pageYOffset);
        $this.tabbarAction();
        $this.lastScroll = window.pageYOffset;
      });
    },
    sidebarAction () { // 전체 카테고리 활성화 함수
      this.sidebar.active = !this.sidebar.active;
      this.showTabbar = true;
      if (event.target.tagName === 'BUTTON') this.sidebar.sidebarBtn = event.target;
      else {
        this.sidebar.sidebarBtn.focus();
        window.scrollTop = this.lastScroll + 'px';
      };
    },
    searchbarAction() { // 검색 팝업 함수
      this.searchbar.active = !this.searchbar.active;
      if (event.target.tagName === 'BUTTON' && event.target.classList.value === 'btn-tabbar search') {
        console.log('*** Button active');
        this.searchbar.searchBtn = event.target;
      }
      if (!this.searchbar.active) {
        console.log('*** focus active');
        // this.searchbar.searchBtn.focus();
      }
    },
    deliveryListAction() { // 배송지 목록 팝업 함수
      this.deliveryList.active = !this.deliveryList.active;
    },
    tabbarAction() { // 네이게이션 탭바 활성화 함수
      const direction = document.querySelector('html').getAttribute('data-scrolldir');
      if (direction === 'up') this.showTabbar = true;
      else if (direction === 'down') this.showTabbar = false;
      // 스크롤이 페이지 최하단시 탭바 메뉴 노출
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) this.showTabbar = true;
    },
    tabbardataAction(channelOpen) {
      this.channelOpen = channelOpen;
    },
    gotoTop(scroll) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    goBack() {
      history.back();
    },
  },
  mounted() {
    this.scrollAction();
    scrollDir();
  },
  destroyed() {
    window.removeEventListener('scroll', this);
  },
  updated() {
    // 팝업 활성화 시 딤드 처리
    if (this.sidebar.active || this.searchbar.active) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      for (let i = 0; i < scrollYContents.length; i++ ) disableBodyScroll(scrollYContents[i]);
    } else clearAllBodyScrollLocks(this);
  }
};
</script>
