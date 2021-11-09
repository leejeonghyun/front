<template>
  <!-- header, Tabbar, Sidebar components -->
  <div class="section-header">
    <!-- START : Header 정보 -->
    <header class="wrap-dali-main-header" :class="{[type]: this.type}">
      <nav>
        <h1>
          <a href="javascript:void(0);" class="logo" @click="goHome">
            <span class="hidden">DALISALDA</span>
          </a>
        </h1>
        <span class="wrap-dali-header-link">
          <button class="btn-header-search" title="검색팝업 열기" @click="searchbarAction">
            <span class="hidden">검색</span>
          </button>
          <a
            href="javascript:void(0);"
            @click="toBskt"
            class="btn-header-cart"
            aria-label="장바구니화면이동"
          >
            <span class="num">
              <span class="hidden">장바구니개수</span>
              <span v-if="$store.state.dp.bsktQty >= 99">99+</span>
              <span v-else>{{this.$store.state.dp.bsktQty}}</span>
            </span>
          </a>
        </span>
      </nav>
    </header>
    <!-- END : Header 정보 -->
    <!-- START : 하단 바로가기 탭바 정보 -->
    <div class="section-bottom" :class="{active: showTabbar}">
      <!-- 조보아 티커 (마케팅 배너) -->
      <AlarmTicker
        v-if="adText"
        :adText="adTextData"
        :linkurl="linkurl"
        :typingStatus="isTyping"
        :showTabbar="showTabbar"
        @typingDestroyEvent="typingDestroyAction"
      />
      <!-- 하단 플로팅 이전, 상단으로 이동 버튼 -->
      <div class="floating-btn-area" :class="{hidden : channelOpen}">
        <a href="javascript:void(0);" role="button" class="btn-bottom-prev" @click="goBack">
          <span class="hidden">뒤로가기</span>
        </a>
        <a href="javascript:void(0);" class="btn-bottom-top" @click="gotoTop">
          <span class="hidden">상단으로 이동</span>
        </a>
      </div>
      <!-- 탭바, 마켓포 UI -->
      <Tabbar
        :showTabbar="showTabbar"
        :sidebar="sidebar"
        @categoryEvent="sidebarAction"
        @searchbarEvent="searchbarAction"
        :mallActive="mallActive"
        @tabbardataEvent="tabbardataAction"
        :isLogin="isLogin"
      />
    </div>
    <!-- END : 하단 바로가기 탭바 정보 -->
    <!-- START : 카테고리 사이드바 -->
    <SidebarDali
      :sidebarActive="sidebar.active"
      @sidebarEvent="sidebarAction"
      @deliveryListEvent="deliveryListAction"
      :isLogin="isLogin"
      ref="sidebarDali"
    />
    <!-- END : 카테고리 사이드바 -->
    <PopupSearch v-if="searchbar.active" :searchbarActive="searchbar.active" @searchbarEvent="searchbarAction" />
    <!-- 팝업 - 검색 -->
    <PopupDeliveryList
      :deliveryListActive="deliveryList.active"
      v-if="deliveryList.active"
      @popupEvent="deliveryListAction"
    />
    <!-- 팝업 - 배송지 목록 -->
  </div>
</template>
<script>
import SidebarDali from '@/views/dp/SidebarDali'; // 팝업 - 햄버거 메뉴 (달리살다)
import Tabbar from '@/components/common/Tabbar'; // 하단 탭 바
import scrollDir from 'scrolldir';
// import PopupSearch from '@/views/ss/PopupSearch'; // 팝업 - 검색
import PopupSearch from '@/views/ss/M4PopupSearch'; // 팝업 - 검색
import PopupDeliveryList from '@/views/pa/PopupDeliveryList'; // 팝업 - 배송지 목록
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import AlarmTicker from '@/components/common/AlarmTicker'; // 마켓팅 알림

import SiteUtils from '@/common/SiteUtils';
import LoginUtils from '@/common/LoginUtils';
import ContextUtils from '@/common/ContextUtils';
import CookieUtils from '@/common/CookieUtils';

// 검색, 배송지 목록 팝업은 추후 수정
export default {
  name: 'DaliMainHeader',
  props: {
    type: String,
    mallActive: {
      // mall active index 값
      type: Number,
      default: 2,
    },
    isLogin: Boolean,
    promotionType: String,
  },
  components: {
    Tabbar,
    SidebarDali,
    PopupSearch,
    PopupDeliveryList,
    AlarmTicker,
  },
  data() {
    return {
      sidebar: {
        active: false, // 사이드바 활성화
        sidebarBtn: {}, // 사이드바 포커스 이벤트
      },
      searchbar: {
        active: false, // 검색 팝업 활성화
        searchBtn: {}, // 검색 포커스 이벤트
      },
      deliveryList: {
        active: false, // 배송지 목록 팝업 활성화
      },
      lastScroll: 0,
      showTabbar: true, // 하단 탭바 활성화,
      channelOpen: null,
      isTyping: true,
      adText: false,
      adTextData: '',
      linkurl: '',
    };
  },
  async created() {
    try {
      const odBsktUuid = CookieUtils.getOdBsktUuid();
      const params = {
        odBsktUuid: odBsktUuid,
      };
      this.$store.dispatch('getBsktQtyInfo', params);
      const getAlarmTicker = CookieUtils.getCookie('ALARM_TICKER');
      if (getAlarmTicker != 'AlarmTicker') {
        await this.getMemberPromotionInfo(); // 조보아 티커 조회
      }
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  methods: {
    async getMemberPromotionInfo() {
      const promotionType = this.$props.promotionType;
      if (promotionType == 'mainView') {
        if (this.$store.state.dp.isLogin) {
          await this.$store.dispatch('getMemberPromotionInfo');
          if (
            this.$store.state.dp.informationData.informationMessage != null &&
            this.$store.state.dp.informationData.informationMessage != ''
          ) {
            this.adText = true;
            if (this.$store.state.dp.informationData.purchaseYn == 'Y') {
              this.linkurl = '/ev/coupon_list';
            }
            this.adTextData = this.$store.state.dp.informationData.informationMessage;
          }
        }
      }
    },
    typingDestroyAction(type) {
      // 하단 티커 비활성화 함수
      this.isTyping = false;
      CookieUtils.setCookie('ALARM_TICKER', type, 1);
    },
    scrollAction() {
      const $this = this;
      window.addEventListener('scroll', function() {
        $this.bottomFixedBtnAction(window.pageYOffset);
        $this.tabbarAction();
        $this.lastScroll = window.pageYOffset;
      });
    },
    bottomFixedBtnAction(scroll) {
      const $floatingMenu = document.querySelector('.floating-btn-area');
      if (scroll > 0) $floatingMenu.classList.add('show');
      else $floatingMenu.classList.remove('show');
    },
    sidebarAction() {
      // 전체 카테고리 활성화 함수
      this.sidebar.active = !this.sidebar.active;
      this.showTabbar = true;
      if (event.target.tagName === 'BUTTON') {
        this.sidebar.sidebarBtn = event.target;
      } else {
        this.sidebar.sidebarBtn.focus();
        window.scrollTop = this.lastScroll + 'px';
      }
    },
    searchbarAction() {
      // 검색 팝업 함수
      this.searchbar.active = !this.searchbar.active;
      if (
        event.target.tagName === 'BUTTON' &&
        event.target.classList.value === 'btn-tabbar search'
      ) {
        this.searchbar.searchBtn = event.target;
      }

      // if (!this.searchbar.active) this.searchbar.searchBtn.focus();
    },
    deliveryListAction() {
      // 배송지 목록 팝업 함수
      this.deliveryList.active = !this.deliveryList.active;
    },
    tabbarAction() {
      // 네이게이션 탭바 활성화 함수
      const direction = document
        .querySelector('html')
        .getAttribute('data-scrolldir');
      if (direction === 'up') {
        this.showTabbar = true;
      } else if (direction === 'down') {
        this.showTabbar = false;
      }
      // 스크롤이 페이지 최하단시 탭바 메뉴 노출
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        this.showTabbar = true;
      }
    },
    tabbardataAction(channelOpen) {
      this.channelOpen = channelOpen;
    },
    gotoTop(scroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    goBack() {
      history.back();
    },
    goHome() {
      const now = location.href;
      const main = SiteUtils.dalimo('/');
      if (now == main) {
        location.href = location.href;
      } else {
        // this.$router.push({ path: '/' });
        location.href = main;
      }
    },
    toBskt() {
      const bsktUrl = SiteUtils.commo('/od/bskt');
      location.href = bsktUrl;
    },
  },
  updated() {
    // 팝업 활성화 시 딤드 처리
    if (this.sidebar.active || this.searchbar.active) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      for (let i = 0; i < scrollYContents.length; i++) {
        disableBodyScroll(scrollYContents[i]);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
  mounted() {
    this.scrollAction();
    scrollDir();
  },
  destroyed() {
    window.removeEventListener('scroll', this);
  },
};
</script>
<style>
</style>
