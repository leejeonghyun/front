<!-- 헤더 3: 이전/타이틀/장바구니 -->
<!-- <Header :mallActive="몰 index" headerText="타이틀" adText="있을 시 조보아티커 활성화" /> -->
<template>
  <!-- header, Tabbar, Sidebar components -->
  <div class="section-header">
    <!-- Header 정보 -->
    <header class="subheader" :class="{'header-none-fixed' : headerText.length === 0}">
      <div class="wrap-headerbar">
        <!-- 4월수정 START : 헤더 타입 케이스 추가 -->
        <a href="javascript:history.back()" class="btn-prev" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^뒤로가기">
          <span class="hidden">뒤로가기</span>
        </a>
        <!-- 4월수정 END : 헤더 타입 케이스 추가 -->
        <gs-link :to="`/?t=${ Date.now() }`" role="button" class="btn-home" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^홈" v-if="!prevType && !onlyTitleType">
          <span class="hidden">GS 프레시몰 홈 바로가기</span>
        </gs-link>
        <h1 class="header-title">{{ headerText }}</h1>
        <button class="btn-search" v-if="!prevType && !prevHomeType && !onlyTitleType" @click="searchbarAction" title="검색팝업 열기" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^검색">
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
    <!-- START : 하단 바로가기 탭바 정보 -->
    <template>
      <div class="section-bottom" :class="{active: showTabbar}">
        <!-- 조보아 티커 (마케팅 배너) -->
        <AlarmTicker v-if="adText.length > 0" :adText="adText" :typingStatus="isTyping" :showTabbar="showTabbar" @typingDestroyEvent="typingDestroyAction" />
        <!-- 하단 플로팅 이전, 상단으로 이동 버튼 -->
        <div class="floating-btn-area" :class="{hidden : channelOpen}">
          <a href="javascript:history.back();" class="btn-bottom-prev"><span class="hidden">뒤로가기</span></a>
          <a href="javascript:void(0);" class="btn-bottom-top" @click="gotoTop"><span class="hidden">상단으로 이동</span></a>
        </div>
        <!-- 탭바, 마켓포 UI -->
        <Tabbar :showTabbar="showTabbar" :sidebar="sidebar" @categoryEvent="sidebarAction" @searchbarEvent="searchbarAction" :mallActive="mallActive" @tabbardataEvent="tabbardataAction" />
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
    <PopupSearch v-if="searchbar.active" :searchbarActive="searchbar.active" @searchbarEvent="searchbarAction"/>
    <PopupDeliveryList :deliveryListActive="deliveryList.active" v-if="deliveryList.active" @popupEvent="deliveryListAction" /> <!-- 팝업 - 배송지 목록 -->
    <!-- 4월수정 END : 팝업 추가 -->
  </div>
</template>
<script>
import Tabbar from '@/components/common/Tabbar'; // 하단 탭 바
import Sidebar from '@/views/dp/Sidebar'; // 팝업 - 햄버거 메뉴 (GS fresh)
import SidebarDali from '@/views/dp/SidebarDali'; // 팝업 - 햄버거 메뉴 (달리살다)
import SidebarDaybreak from '@/views/ss/SidebarDaybreak'; // 팝업 - 햄버거 메뉴 (새벽배송)
import AlarmTicker from '@/components/common/AlarmTicker'; // 마켓팅 (조보아) 티커
// import PopupSearch from '@/views/ss/PopupSearch'; // 팝업 - 검색
import PopupSearch from '@/views/ss/M4PopupSearch'; // 팝업 - 검색
import PopupDeliveryList from '@/views/pa/PopupDeliveryList'; // 팝업 - 배송지 목록
import scrollDir from 'scrolldir';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import SiteUtils from '@/common/SiteUtils';
import LoginUtils from '@/common/LoginUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "Header3",
  props: {
    headerText: { // 페이지 타이틀
      type: String,
      default: '',
    },
    prevType: { // 이전버튼만 있는 타입
      type: Boolean,
      default: false
    },
    prevHomeType: { // 8월 수정 : 이전버튼, 홈 버튼만 있는 타입 추가
      type: Boolean,
      default: false
    },
    onlyTitleType: { // 타이틀만 있는 타입 (탭바, 하단 플로팅 버튼 없음)
      type: Boolean,
      default: false
    },
    adText: { // 하단 티커 마케팅 문구
      type: String,
      default: '',
    },
    mallActive: { // mall active index 값
      type: Number,
      default: 5,
    },
    isLogin: Boolean, // 로그인여부 (달리살다 퍼블용)
  },
  components: {
    Tabbar,
    Sidebar,
    SidebarDali,
    SidebarDaybreak,
    AlarmTicker,
    PopupSearch,
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
      lastScroll: 0,
      showTabbar: true, // 하단 탭바 활성화
      isTyping: true,
      channelOpen: null,
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
    if (this.$props.adCheck) {
      await this.$store.dispatch('getCouponImteInfo');
    }
  },
  methods: {
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
    bottomFixedBtnAction(scroll) {
      const $floatingMenu = document.querySelector('.floating-btn-area');
      if (scroll > 0) {
        $floatingMenu.classList.add('show');
      } else {
        $floatingMenu.classList.remove('show');
      }
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    } else {
      clearAllBodyScrollLocks(this);
    }
  }
};
</script>
