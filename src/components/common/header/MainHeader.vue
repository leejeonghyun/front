<template>
  <div>
    <header class="wrap-main-header" :class="{active : popup.modalTrendy, [type]: this.type}">
      <nav>
        <h1>
          <a href="javascript:void(0);" role="button" class="logo" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^GS Fresh" @click="goHome">
            <span class="hidden">GS 프레시몰</span>
          </a>
        </h1>
        <span class="wrap-header-link">
          <button class="btn-search" title="검색팝업 열기" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^검색" @click="searchbarAction">
            <span class="hidden">검색</span>
          </button>
          <button
            class="btn-trendy"
            title="트렌드팝업 열기"
            aria-haspopup="dialog"
            data-sc-action="link.click"
            data-dimension-name="link.header"
            data-dimension-value="header^트렌드팝업"
            @click="popupAction('modalTrendy')"
            v-if="trendyView"
          >
            <span class="hidden">트렌드팝업활성화</span>
          </button>
          <a href="javascript:void(0);" class="btn-change-shipping" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^배송타입변경" @click="mallChange">
            <!-- 새벽배송 : 2020.03.26 당일, 새벽 간 이동 버튼 추가 -->
            <span class="hidden">당일배송 홈(GS 프레시몰) 이동</span>
          </a>
          <a href="javascript:void(0);" @click="toBskt" class="btn-cart" title="장바구니 바로가기" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^장바구니">
            <span class="num">
              <span class="hidden">장바구니 개수</span>
              <span v-if="$store.state.dp.bsktQty >= 99">99+</span>
              <span v-else>{{$store.state.dp.bsktQty}}</span>
            </span>
          </a>
        </span>
      </nav>
      <!-- START : 팝업 -->
      <PopupTrendy
        @popupEvent="popupAction"
        :slideMargin="22"
        :slideShow="4.5"
        v-if="popup.modalTrendy"
      />
      <!-- END : 팝업 -->
    </header>
    <!-- END : Header 정보 -->
    <!-- START : 하단 바로가기 탭바 정보 -->
    <div class="section-bottom" :class="{active: showTabbar}" id="section-bottom">
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
    <!-- END : 하단 바로가기 탭바 정보 -->
    <!-- START : 카테고리 사이드바 -->
    <template v-if="mallActive === 3">
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
    <!--Sidebar :sidebarActive="sidebar.active" @sidebarEvent="sidebarAction" :sidebarDiv="true" /-->
    <PopupSearch v-if="searchbar.active" :searchbarActive="searchbar.active" @searchbarEvent="searchbarAction" />
    <!-- 팝업 - 검색 -->
    <PopupDeliveryList
      :deliveryListActive="deliveryList.active"
      v-if="deliveryList.active"
      @popupEvent="deliveryListAction"
    />
    <!-- 팝업 - 배송지 목록 -->
    <!-- 팝업 - 배송지 목록 -->
  </div>
</template>

<script>
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import PopupTrendy from '@/components/common/PopupTrendy'; // 팝업 - 트렌트
import Tabbar from '@/components/common/Tabbar'; // 네비게이션 탭 바
import Sidebar from '@/views/dp/Sidebar'; // 팝업 - 햄버거 메뉴 (GS fresh)
import SidebarDaybreak from '@/views/ss/SidebarDaybreak'; // 팝업 - 햄버거 메뉴 (새벽배송)
import AlarmTicker from '@/components/common/AlarmTicker'; // 마켓팅 알림
// import PopupSearch from '@/views/ss/PopupSearch'; // 팝업 - 검색
import PopupSearch from '@/views/ss/M4PopupSearch'; // 팝업 - 검색
import PopupDeliveryList from '@/views/pa/PopupDeliveryList'; // 팝업 - 배송지 목록
import scrollDir from 'scrolldir';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import SiteUtils from '@/common/SiteUtils';
import LoginUtils from '@/common/LoginUtils';
import ContextUtils from '@/common/ContextUtils';
import CookieUtils from '@/common/CookieUtils';
import StringUtils from '@/common/StringUtils';

export default {
  name: 'MainHeader',
  mixins: [LayPopupMixin],
  props: {
    type: String,
    mallActive: {
      // mall active index 값
      type: Number,
      default: 5,
    },
    promotionType: String,
  },
  components: {
    PopupTrendy,
    Tabbar,
    Sidebar,
    SidebarDaybreak,
    AlarmTicker,
    PopupSearch,
    PopupDeliveryList,
  },
  data() {
    return {
      dspConrId: this.$store.state.dp.mainConrInfo.dspConrId_1028,
      trendyView: false,
      sidebar: {
        active: false, // 사이드바 활성화
        sidebarBtn: {}, // 사이드바 포커스 이벤트
      },
      popup: {
        modalTrendy: false,
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
      isTyping: true,
      channelOpen: null,
      isLogin: false,
      index: 0,
      adText: false,
      adTextData: '',
      linkurl: '',
    };
  },
  computed: {
    countTrendyData() {
      if (this.$store.state.dp.trendyList == undefined) {
        return 0;
      } else {
        return this.$store.state.dp.trendyList.length;
      }
    },
  },
  watch: {
    countTrendyData(newCount, oldCount) {
      if (newCount > 0) {
        this.getData();
      }
    },
  },
  async created() {
    try {
      this.getBsktQtyInfo(); // 장바구니 수량 조회
      this.getConrInfo(); // 트렌드 영역 헤더에서 조회
      const getAlarmTicker = CookieUtils.getCookie('ALARM_TICKER');
      if (getAlarmTicker != 'AlarmTicker') {
        await this.getMemberPromotionInfo(); // 조보아 티커 조회
      }
      // 새벽배송 상품배송시간 안내
      if (this.$store.state.dp.daybreak) {
        if (Object.keys(this.$store.state.dp.dayBreakData).length == 0) {
          this.getDayBreakItemInfo();
        }
      }
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  methods: {
    async getMemberPromotionInfo() {
      try {
        const promotionType = this.$props.promotionType;
        if (promotionType != null && promotionType != '') {
          if (promotionType == 'mainView') {
            if (this.$store.state.dp.isLogin) {
              await this.$store.dispatch('getMemberPromotionInfo');
              if (
                this.$store.state.dp.informationData.informationMessage !=
                  null &&
                this.$store.state.dp.informationData.informationMessage != ''
              ) {
                this.adText = true;
                if (this.$store.state.dp.informationData.purchaseYn == 'Y') {
                  this.linkurl = '/ev/coupon_list';
                }
                this.adTextData = this.$store.state.dp.informationData.informationMessage;
              }
            }
          } else if (promotionType == 'ssevntBigSale') {
            await this.$store.dispatch('getBsktPresPromInfo');
            if (
              this.$store.state.dp.bsktPresPromInfo != null &&
              this.$store.state.dp.bsktPresPromInfo != ''
            ) {
              this.adText = true;
              this.adTextData = this.$store.state.dp.bsktPresPromInfo;
            }
          }
        }
      } catch (e) {
        this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
    },
    async getConrInfo() {
      try {
        const param = {
          dspConrId: this.dspConrId,
        };
        await this.$store.dispatch('getConrInfo', param);
      } catch (e) {
        this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
    },
    async getBsktQtyInfo() {
      try {
        const odBsktUuid = CookieUtils.getOdBsktUuid();
        const params = {
          odBsktUuid: odBsktUuid,
        };
        await this.$store.dispatch('getBsktQtyInfo', params);
      } catch (e) {
        this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
    },
    // 새벽배송 상품데이터 호출
    async getDayBreakItemInfo() {
      const dayBreak = CookieUtils.getCookie('DAYBREAK_SUPPL_FIRM_CD');
      const dayBreakItemParam = {
        delivTypeCd: '04',
        supplFirmCd: dayBreak,
      };
      this.$store.dispatch('getItemDeliveTimeInfo', dayBreakItemParam);
    },
    async mallChange() {
      let beack = CookieUtils.getCookie('showDaybreak');
      beack = (beack === 'N' ? 'Y' : 'N');

      CookieUtils.setCookie('showDaybreak', beack);
      await this.$store.commit('getDayBreak');

      const param = {
        storId: '',
        supplFirmCd: '',
        mdaType: CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD'),
      };
      if (this.$store.state.dp.daybreak) {
        // 새벽배송
        if (this.$store.state.dp.isLogin) {
          param.storId = CookieUtils.getCookie('DAYBREAK_STOR_ID');
          param.supplFirmCd = CookieUtils.getCookie('DAYBREAK_SUPPL_FIRM_CD');
        } else {
          // 디폴트(2287)
          param.storId = this.$store.state.dp.dayBreakInfo.storId_dayBreak;
          param.supplFirmCd = this.$store.state.dp.dayBreakInfo.supplFirmCd_dayBreak;
        }
      } else {
        // 당일배송
        if (this.$store.state.dp.isLogin) {
          const storId = CookieUtils.getCookie('ORG_STOR_ID');
          const supplFirmCd = CookieUtils.getCookie('ORG_SUPPL_FIRM_CD');
          param.storId = storId;
          param.supplFirmCd = supplFirmCd;
        } else {
          // 디폴트 2267
          param.storId = this.$store.state.dp.dayBreakInfo.storId_day;
          param.supplFirmCd = this.$store.state.dp.dayBreakInfo.supplFirmCd_day;
        }
      }
      this.$store.state.dp.mainData.splice(0);
      await LoginUtils.updateEncVal(param);
      const now = new Date().getTime();
      SiteUtils.go(location.host, '/' + '?to=' + now + '&showDaybreak=' + beack);
    },
    typingDestroyAction(type) {
      // 하단 티커 비활성화 함수
      this.isTyping = false;
      CookieUtils.setCookie('ALARM_TICKER', type, 1);
    },
    popupAction(type) {
      this.popup[type] = !this.popup[type];
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
      if (!this.searchbar.active) {
        this.searchbar.searchBtn.focus();
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
    goHome() {
      const now = location.href;
      const main = SiteUtils.freshmo('/');
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
    mainHeaderScroll() {
      // for destroy
      const $this = this;
      $this.bottomFixedBtnAction(window.pageYOffset);
      $this.tabbarAction();
      $this.lastScroll = window.pageYOffset;
    },
    scrollAction() {
      window.addEventListener('scroll', this.mainHeaderScroll);
    },
    getData() {
      const data = this.$store.state.dp.trendyList;
      if (data !== 0) {
        data.map(value => {
          if (value.rdspCommConrSetInfo != null) {
            this.trendyView = true;
          }
        });
      }
    },
  },
  mounted() {
    this.scrollAction();
    scrollDir();
    if (this.countTrendyData > 0) {
      this.getData();
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.mainHeaderScroll);
  },
  updated() {
    // 팝업 활성화 시 딤드 처리
    if (this.sidebar.active || this.searchbar.active) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      for (let i = 0; i < scrollYContents.length; i++) {
        disableBodyScroll(scrollYContents[i]);
      }
    } else clearAllBodyScrollLocks(this);
  },
};
</script>
