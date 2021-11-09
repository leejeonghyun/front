<template>
  <!-- header, Tabbar, Sidebar components -->
  <div class="section-header" :class="flowroute">
    <!-- START : Header 정보 <slot name="headerContent"></slot> -->
    <header class="wrap-main-header" :class="{active: showHeaderScroll && !headerShow}">
      <template v-if="headertype === 0">
        <header class="wrap-main-header">
          <ul class="wrap-gnb-menu black" ref="gnb-ul" title="메인 전체 상품">
            <li class="menu-item" v-for="(menu, index) in headerData" :key="index">
              <button :aria-label="menu.title +' 상품 목록 보기'" :aria-expanded="activeIdx === index" :aria-controls="contentsIdName + index" :data-index="index"
              :class="{active: activeIdx === index}" @click="$parent.activeHeaderMenu(index)">
                <strong class="eng">{{menu.title}}</strong>
              </button>
            </li>
          </ul>
        </header>
        <slot name="headerContent"></slot>
      </template>
      <template v-else-if="headertype === 1">
        <div class="logo-area">
          <h1 class="logo" @click="goUrl(headerImg)"><img :src="require('@/assets/images/mall_logo/'+headerImg+'.png')" :alt="headerTitle" /></h1>
        </div>
      </template>
      <template v-else-if="headertype === 2">
        <div class="logo-area">
          <h1 class="logo">
            <button type="button" class="mall-category" :class="{'active' : this.mallListOpen}" aria-haspopup="dialog" @click="popupAction('categoryPop')"><span>{{ headerTitle }}</span></button>
          </h1>
        </div>
      </template>
      <template v-else>
        <div class="logo-area">
          <h1 class="logo">{{ headerTitle }}</h1>
        </div>
      </template>
      <a href="javascript:void(0);" role="button" @click="goBack" class="btn-prev" v-if="historyView"><span class="hidden">뒤로가기</span></a> <!-- historyView prop 추가 -->
      <a href="javascript:void(0);" role="button" @click="goHome" class="btn-home" v-if="homeView"><span class="hidden">마켓포 홈 바로가기</span></a>
      <div class="wrap-header-util" v-if="!searchBtnBottom">
        <button class="btn-search search" title="검색팝업 열기" @click="searchbarAction" v-show="searchView">
          <span class="hidden">검색</span>
        </button>
        <a href="javascript:void(0);" @click="toBskt" class="btn-cart" title="장바구니 바로가기" v-show="cartView">
          <span class="num"><span class="hidden">장바구니 개수</span>
            <span v-if="$store.state.dp.bsktQty >= 99">99+</span>
            <span v-else>{{$store.state.dp.bsktQty}}</span>
          </span>
        </a>
      </div>
    </header>
    <!-- END : Header 정보 -->

    <!-- START : 하단 바로가기 탭바 정보 -->
    <div class="section-bottom" :class="{active: showTabbar, 'tabbarhide': !tabbar}">
      <!-- 하단 플로팅 이전, 상단으로 이동 버튼 -->
      <div class="floating-btn-area" :class="{hidden : channelOpen}">
          <button class="btn-search search" title="검색팝업 열기" @click="searchbarAction" v-if="searchBtnBottom">
          <span class="hidden">검색</span>
        </button>
        <div v-else>
          <a href="javascript:void(0);" @click="goBack" class="btn-bottom-prev"><span class="hidden">뒤로가기</span></a>
          <a href="javascript:void(0);" class="btn-bottom-top" @click="gotoTop"><span class="hidden">상단으로 이동</span></a>
        </div>
      </div>
      <!-- 탭바, 마켓포 UI -->
      <Tabbar v-if="visibleShowbar" :showTabbar="showTabbar" :sidebar="sidebar"
      @categoryEvent="sidebarAction" @tabbardataEvent="tabbardataAction" />
    </div>
    <!-- END : 카테고리 사이드바 -->
    <!-- 4월수정 START : 팝업 추가 -->
    <Sidebar :sidebarActive="sidebar.active" @sidebarEvent="sidebarAction" />
    <!-- 팝업 - 검색 -->
    <PopupSearch :searchbarActive="searchbar.active" @searchbarEvent="searchbarAction"/>
    <CategoryPop v-if="this.popup.categoryPop" @popupEvent="popupAction" :pageIndex="pageIndex" />
  </div>
</template>
<script>
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import Tabbar from '@/components/common/M4Tabbar'; // 네비게이션 탭 바
import PopupSearch from '@/views/ss/M4PopupSearch'; // 팝업 - 검색
import Sidebar from '@/views/dp/Sidebar'; // 팝업 - 햄버거 메뉴
import CategoryPop from '@/views/ss/CategoryPop';
import scrollDir from 'scrolldir';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import SiteUtils from '@/common/SiteUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'M4MainHeader',
  mixins: [LayPopupMixin],
  props: {
    activeIdx: {
      type: Number,
      default: 0,
    },
    headerData: Array,
    headertype: {
      type: Number,
      default: 1,
    },
    headerTitle: {
      type: String,
      default: ''
    },
    headerImg: {
      type: String,
      default: ''
    },
    activeAllChannel: {
      type: Boolean,
      default: true
    },
    type: String,
    active: {
      type: Number,
      default: 0
    },
    searchBtnBottom: {
      type: Boolean,
      default: false
    },
    mallActive: { // mall active index 값
       type: Number,
       default: 5,
    },
    contentsIdName: {
      type: String,
      default: ""
    },
    cartView: {
      type: Boolean,
      default: true
    },
    searchView: {
      type: Boolean,
      default: true
    },
    tabbar: {
      type: Boolean,
      default: true
    },
    flowroute: {
      type: String,
      default: 'marketfor'
    },
    pageIndex: {
      hIndex: {
        type: Number,
        default: 0,
      },
      vIndex: {
        type: Number,
        default: 0,
      }
    },
    historyView: { // 추가
      type: Boolean,
      default: true
    },
    homeView: { // 20201112 추가
      type: Boolean,
      default: true
    },
    headerShow: {
      type: Boolean,
      dafault: false
    },
  },
  data() {
    return {
      showHeaderScroll: false,
      showTabbar: true,
      mallListOpen: false,
      activeIndex: 0,
      sidebar: {
        active: false, // 사이드바 활성화
        sidebarBtn: {}, // 사이드바 포커스 이벤트
      },
      popup: {
        categoryPop: false,
      },
      searchbar: {
        active: false, // 검색 팝업 활성화
        searchBtn: {} // 검색 포커스 이벤트
      },
      deliveryList: {
        active: false, // 배송지 목록 팝업 활성화
      },
      lastScroll: 0,
      visibleShowbar: false,
      isTyping: true,
      channelOpen: null,
      componentToDisplay: null
    };
  },
  components: {
    Tabbar,
    PopupSearch,
    Sidebar,
    CategoryPop,
  },
  computed: {
    selectedComponent: function() {
      if (this.componentToDisplay) {
        return () => import('@/views/ss/M4PopupSearch');
      }
      return null;
    },
  },
  methods: {
    onPopSearchHandler() {
      const header = this.$refs.header;
      header.searchbarAction();
    },
    popupAction(type) {
      this.popup[type] = !this.popup[type];
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
      if ($floatingMenu != null) {
        if (scroll > 0) $floatingMenu.classList.add('show');
        else $floatingMenu.classList.remove('show');
      }
    },
    sidebarAction () { // 전체 카테고리 활성화 함수
      if (!this.sidebar.active) {
        this.$store.dispatch('getMenuDspCategroyInfo', '');
      }
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
      /* 4월수정 START : 조건문 수정 */
      if (event.target.tagName === 'BUTTON' && event.target.classList.contains('search')) this.searchbar.searchBtn = event.target;
      /* 4월수정 END : 조건문 수정 */
      if (this.$parent.$options.name !== 'PopupSearch') {
        const params = {
          keyword: '',
        };
        this.$store.commit('setSearchKeyword', params);
      }
      if (!this.searchbar.active) this.searchbar.searchBtn.focus();
    },
    tabbarAction(param) { // 네이게이션 탭바 활성화 함수
      const direction = document.querySelector('html').getAttribute('data-scrolldir');
      if ( param && param.endCheck) this.showTabbar = param.endCheck; // 20201117 조건 추가
      else if (direction === 'up') {
        this.showTabbar = true;
        this.showHeaderScroll = false;
      } else if (direction === 'down') {
        this.showTabbar = false;
        this.showHeaderScroll = true;
      }
      // 스크롤이 페이지 최상단시 헤더 메뉴 노출
      if ( param == undefined && window.scrollY == 0) this.showHeaderScroll = false;
      // 스크롤이 페이지 최하단시 탭바 메뉴 노출
      if ( param == undefined && (window.innerHeight + window.scrollY) >= document.body.scrollHeight) this.showTabbar = true;
    },
    tabbardataAction(channelOpen) {
      this.channelOpen = channelOpen;
    },
    gotoTop(scroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    toggleHeader() {
      this.mallListOpen = !this.mallListOpen;
    },
    setHeader(z) { // 20201124 radial 열릴 경우 최상위 위치하도록 추가
      if (z=='up') {
        document.querySelector('.section-header').classList.add('up');
      } else {
        document.querySelector('.section-header').classList.remove('up');
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    toBskt() {
      SiteUtils.go(location.host, '/od/mf/bskt');
    },
    goUrl(url) {
      if (url == '1' || url == '20') {
        location.href = SiteUtils.freshmo('');
      } else if (url == '11') {
        location.href = SiteUtils.dalimo('');
      } else if (url == '301') {
        location.href = SiteUtils.marketformo('/gsshop');
      } else {
        location.href = SiteUtils.marketformo('/mall_main?mallId='+ url);
      }
    },
    goHome() {
      location.href = SiteUtils.marketformo(`/?to=${ Date.now() }`);
    },
  },
  created() {
    const odBsktUuid = CookieUtils.getOdBsktUuid();
    const params = {
      odBsktUuid: odBsktUuid,
    };
    this.$store.dispatch('getBsktQtyInfo', params);
    this.activeIndex = this.active;
    this.scrollAction();
  },
  mounted() {
    scrollDir();
    this.activeIndex = this.active;
    this.visibleShowbar = true;
    this.showHeaderScroll = false;
  },
  destroyed() {
    window.removeEventListener('scroll', this);
  },
  updated() {
    // 팝업 활성화 시 딤드처리
    if (this.sidebar.active || this.searchbar.active) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      for (let i = 0; i < scrollYContents.length; i++ ) {
        disableBodyScroll(scrollYContents[i]);
      };
    } else clearAllBodyScrollLocks(this);
    this.activeIndex = this.active;
  }
};
</script>
<style>
</style>
