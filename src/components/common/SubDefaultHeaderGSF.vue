<template>
  <!-- header, Tabbar, Sidebar components -->
  <div class="section-header" :class="getCmmSiteClass()">
    <!-- Header 정보 -->
    <header class="subheader" :class="{'header-none-fixed' : headerText.length === 0}">
      <div class="wrap-headerbar">
        <!-- 4월수정 START: 헤더 타입 케이스 추가 -->
        <a
          href="javascript:history.back();"
          role="button"
          class="btn-prev"
          data-sc-action="link.click"
          data-dimension-name="link.header"
          data-dimension-value="header^뒤로가기"
          v-if="!onlyTitleType"
        >
          <span class="hidden">뒤로가기</span>
        </a>
        <!-- 4월수정 END : 헤더 타입 케이스 추가 -->
        <gs-link
          :to="homeUrl"
          role="button"
          class="btn-home"
          data-sc-action="link.click"
          data-dimension-name="link.header"
          data-dimension-value="header^홈"
          v-if="!prevType && !onlyTitleType"
        >
          <span class="hidden">GS 프레시몰 홈 바로가기</span>
        </gs-link>
        <h1 class="header-title">{{ headerText }}</h1>
        <button
          class="btn-search"
          data-sc-action="link.click"
          data-dimension-name="link.header"
          data-dimension-value="header^검색"
          v-if="!prevType && !prevHomeType && !onlyTitleType"
          @click="searchbarAction"
          title="검색팝업 열기"
        >
          <span class="hidden">검색</span>
        </button>
        <a
          href="javascript:void(0);"
          @click="toBskt"
          class="btn-cart"
          data-sc-action="link.click"
          data-dimension-name="link.header"
          data-dimension-value="header^장바구니"
          v-if="!prevType && !onlyTitleType && !prevHomeType"
          title="장바구니 바로가기"
        >
          <span class="num">
            <span class="hidden">장바구니 개수</span>
            <span v-if="$store.state.dp.bsktQty >= 99">99+</span>
            <span v-else>{{$store.state.dp.bsktQty}}</span>
          </span>
        </a>
      </div>
    </header>
    <!-- START : 하단 바로가기 탭바 정보 -->
    <template v-if="tabbar">
      <div class="section-bottom" :class="{active: showTabbar}">
        <!-- 조보아 티커 (마케팅 배너) -->
        <AlarmTicker
          v-if="!chatbot && adText"
          :adText="adTextData"
          :linkurl="linkurl"
          :typingStatus="isTyping"
          :showTabbar="showTabbar"
          @typingDestroyEvent="typingDestroyAction"
        />
        <!-- 고객센터 쳇봇 -->
        <!--
        <div class="floating-btn-chatbot" v-if="chatbot">
          <a href="#" title="1:1 상담톡 바로가기">
            <span>1:1 상담톡</span>
          </a>
        </div>
        -->
        <!-- 하단 플로팅 이전, 상단으로 이동 버튼 -->
        <div class="floating-btn-area" :class="{hidden : channelOpen}">
          <a href="javascript:history.back();" role="button" class="btn-bottom-prev" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^뒤로가기">
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
        />
      </div>
    </template>
    <!-- :탭바 없이 플로팅 버튼만 있는 케이스 -->
    <template v-else>
      <div class="floating-btn-area dafault" v-if="!onlyTitleType">
        <a href="javascript:history.back();" role="button" class="btn-bottom-prev" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^뒤로가기">
          <span class="hidden">뒤로가기</span>
        </a>
        <a href="javascript:void(0);" class="btn-bottom-top" @click="gotoTop">
          <span class="hidden">상단으로 이동</span>
        </a>
      </div>
    </template>
    <!-- END : 하단 바로가기 탭바 정보 -->
    <!-- START : 카테고리 사이드바 -->
    <template v-if="mallActive === 1">
      <!-- 햄버거 메뉴 달리살다 케이스 -->
      <SidebarDali
        :sidebarActive="sidebar.active"
        @sidebarEvent="sidebarAction"
        @deliveryListEvent="deliveryListAction"
        :isLogin="true"
      />
    </template>
    <template v-else-if="mallActive === 3">
      <!-- 햄버거 메뉴 새벽배송 케이스 -->
      <SidebarDaybreak
        :sidebarActive="sidebar.active"
        @sidebarEvent="sidebarAction"
        @deliveryListEvent="deliveryListAction"
        :isLogin="true"
      />
    </template>
    <template v-else>
      <!-- 햄버거 메뉴 GS fresh 케이스 -->
      <Sidebar
        :sidebarActive="sidebar.active"
        @sidebarEvent="sidebarAction"
        @deliveryListEvent="deliveryListAction"
      />
    </template>
    <!-- END : 카테고리 사이드바 -->
    <!-- 4월수정 START : 팝업 추가 -->
    <PopupSearch v-if="searchbar.active" :searchbarActive="searchbar.active" @searchbarEvent="searchbarAction" />
    <PopupDeliveryList
      :deliveryListActive="deliveryList.active"
      v-if="deliveryList.active"
      @popupEvent="deliveryListAction"
    />
    <!-- 팝업 - 배송지 목록 -->
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
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';

export default {
  name: 'SubDefaultHeader',
  props: {
    headerText: {
      // 페이지 타이틀
      type: String,
      default: '',
    },
    prevType: {
      // 이전버튼만 있는 타입
      type: Boolean,
      default: false,
    },
    prevHomeType: {
      // 8월 수정 : 이전버튼, 홈 버튼만 있는 타입 추가
      type: Boolean,
      default: false,
    },
    onlyTitleType: {
      // 타이틀만 있는 타입 (탭바, 하단 플로팅 버튼 없음)
      type: Boolean,
      default: false,
    },
    tabbar: {
      // 하단 탭바 여부
      type: Boolean,
      default: true,
    },
    isLogin: Boolean, // 로그인여부 (달리살다 퍼블용)
    chatbot: {
      // 고객센터 쳇봇 유무
      type: Boolean,
      default: false,
    },
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
        searchBtn: {}, // 검색 포커스 이벤트
      },
      deliveryList: {
        active: false, // 배송지 목록 팝업 활성화
      },
      lastScroll: 0,
      showTabbar: true, // 하단 탭바 활성화
      isTyping: true,
      channelOpen: null,
      mallActive: 2,
      adTextData: null,
      adText: false,
      adTextItem: null,
      linkurl: '',
    };
  },
  computed: {
    homeUrl: function() {
      let url = SiteUtils.to(CookieUtils.getMallId(), `/?to=${ Date.now() }`);
      if (CookieUtils.isDaybreak()) {
        if (url.includes('?')) {
          url = url + '&showDaybreak=Y';
        } else {
          url = url + '?showDaybreak=Y';
        }
      }
      return url;
    }
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
      // 달리살다확인
      this.mallActive = 1;
    } else {
      // gsfresh
      this.mallActive = 2;
    }

    // 조보아 티커 (마케팅 배너) 활성화 관련 tabbar가 true인 경우 호출
    if (this.tabbar) {
      const getAlarmTicker = CookieUtils.getCookie('ALARM_TICKER_CPN');
      if (this.$props.adCheck && getAlarmTicker != 'AlarmTickerCpn') {
        await this.$store.dispatch('getCouponImteInfo');
      }
    }
  },
  methods: {
    getCmmSiteClass() {
      const mallId = CookieUtils.getCookie('MALL_ID');
      const siteId = CookieUtils.getCmmSteId();
      let className = '';
      if (mallId === '11') { // 달리살다 판단 mallId : 11
        className = 'dalisalda';
      } else if (CookieUtils.isDaybreak()) { // 새벽배송여부 판단
        className = 'daybreak';
      }
      return className;
    },
    typingDestroyAction() {
      // 하단 티커 비활성화 함수
      this.isTyping = false;
      CookieUtils.setCookie('ALARM_TICKER_CPN', type, 1);
    },
    // 4월수정 : methods 추가
    scrollAction() {
      const $this = this;
      const $header = document.querySelector('.subheader');
      window.addEventListener('scroll', function() {
        window.pageYOffset > 0
          ? $header.classList.add('fixed')
          : $header.classList.remove('fixed');
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
      }
    },
    bottomFixedBtnAction(scroll) {
      const $floatingMenu = document.querySelector('.floating-btn-area');
      if (scroll > 0) {
        if (this.chatbot) {
          $floatingMenu.classList.add('show');
          // document.querySelector('.floating-btn-chatbot').classList.add('show');
        } else $floatingMenu.classList.add('show');
      } else {
        if (this.chatbot) {
          $floatingMenu.classList.remove('show');
/*
          document
            .querySelector('.floating-btn-chatbot')
            .classList.remove('show');
*/
        } else $floatingMenu.classList.remove('show');
      }
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
      console.log('eventTarget : ');
      console.log(event.target);
      console.log(event.target.tagName);
      console.log('active:' + this.searchbar.active);
      this.searchbar.active = !this.searchbar.active;
      console.log('active:' + this.searchbar.active);
      if (
        event.target.tagName === 'BUTTON' &&
        event.target.classList.value === 'btn-tabbar search'
      ) {
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
    toBskt() {
      const bsktUrl = SiteUtils.commo('/od/bskt');
      location.href = bsktUrl;
    },
    async getMemberPromotionInfo() {
      // 조보아 티커 노출
      if (Object.keys(this.$store.state.dp.informationData).length > 0) {
        this.adTextData = this.$store.state.dp.informationData.informationMessage
          .replace(/&/g, '&amp;')
          .replace(/>/g, '&gt;')
          .replace(/</g, '&lt;')
          .replace(/"/g, '&quot;');
        if (this.adTextData) {
          this.adText = true;
        }
        if (
          this.$store.state.dp.informationData.itemId != null &&
          this.$store.state.dp.informationData.itemId != ''
        ) {
          const url =
            '/md/product_detail?itemId=' +
            this.$store.state.dp.informationData.itemId +
            '&storId=' +
            CookieUtils.getCookie('STOR_ID') +
            '&supplFirmCd=' +
            CookieUtils.getCookie('SUPPL_FIRM_CD') +
            '&mallId=' +
            CookieUtils.getCookie('MALL_ID');
          this.linkurl = url;
        }
      }
    },
  },
  mounted() {
    // 조보아 티커 (마케팅 배너) 활성화 관련 tabbar가 true인 경우 호출
    if (this.tabbar) {
      setTimeout(() => {
        this.getMemberPromotionInfo();
      }, 1500);
    }

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
      for (let i = 0; i < scrollYContents.length; i++) {
        disableBodyScroll(scrollYContents[i]);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
};
</script>
