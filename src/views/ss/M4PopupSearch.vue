<!--
views\ss\SC-FO-SS-GF-MP-200.vue
-->
<!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 팝업을 호출하는 페이지 안 최상위 요소에 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
<template>
  <transition
    name="searchbar"
    v-on:beforeEnter="searchBeforeEnter"
    v-on:enter="searchbarEnter"
    v-on:after-enter="searchbarAfterEnter"
    v-on:leave="searchbarLeave"
  >
    <div
      id="popupSearch"
      v-if="searchbarActive"
      class="m4search pop"
      role="dialog"
      aria-modal="true"
      :class="{active : searchbarActive}"
      tabindex="0"
      @keydown.9="closeSearch()"
    >
      <!-- 검색 폼 -->
      <searchTopComp :pop="true" :marketingInfo="$store.getters.getM4RandomMarketing" @searchKeyword="searchKeyword" @changeSelectList="changeSelectMall"/>
      <!-- // 검색 폼 -->
      <article class="content-article">
        <section class="keyword-scroll__box" v-if="$store.state.m4Search.m4RecommendSearchList && $store.state.m4Search.m4RecommendSearchList.length > 0">
          <div class="keyword-scroll__boxin">
            <gs-link v-for="(item, index) in $store.state.m4Search.m4RecommendSearchList" :key="index" :to="(!item.linkUrl || item.linkUrl==='/') ? '/ss/search_result?keyword='+ item.ctnsTitle : item.linkUrl" :target="getTarget(item.scrConTypeCd)" :searchMall="selectedMall">{{item.ctnsTitle}}</gs-link>
          </div>
        </section>
        <!-- START : 최근 검색어 -->
        <RecentSearch @searchKeyword="searchKeyword"/>
        <!-- START : 배송 인기 검색어 -->
        <DeliveryPopularSearch v-if="$store.state.m4Search.gsfreshDawndeliYn || !isLogin" @searchKeyword="searchKeyword"/>
        <!-- START : 인기 검색어 -->
        <PopularSearch :limit=13 mall="gsfresh" @searchKeyword="searchKeyword"/>
      </article>
    </div>
  </transition>
</template>

<script>
import SlideControlMixin from '@/mixins/SlideControlMixin';
import DateUtils from '@/common/DateUtils';
import SearchTopComp from '@/components/common/SearchTopComp';
import RecentSearch from '@/components/search/M4RecentSearch';
import DeliveryPopularSearch from '@/components/search/M4DeliveryPopularSearch'; // 배송인기 검색어
import PopularSearch from '@/components/search/M4PopularSearch';
import Tracker from '@/common/Tracker';
import SiteUtils from '@/common/SiteUtils';
import LoginUtils from '@/common/LoginUtils';
import CookieUtils from '@/common/CookieUtils';
import ContextUtils from '@/common/ContextUtils';

export default {
  name: 'PopupSearch',
  props: ['searchbarActive'],
  mixins: [SlideControlMixin],
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.15,
      },
      keyword: '',
      /* 8월수정 START : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 데이터 추가 */
      inputFoucs: false,
      /* 8월수정 END : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 데이터 추가 */
      opened: false,
      deliveryTab: 0,
      selectMall: 'all_m4',
      selectedMall: 'all_m4',
      isLogin: LoginUtils.isLogin(),
    };
  },
  components: {
    SearchTopComp,
    RecentSearch,
    DeliveryPopularSearch,
    PopularSearch
  },
  methods: {
    searchbarCloseAction() {
      if (this.searchbarActive) {
        this.$emit('searchbarEvent');
      }
    },
    searchBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.left = '100%';
    },
    searchbarEnter(el) {
      el.style.opacity = 0;
      el.style.left = '100%';
      // 검색창 마케팅문구 조회
      this.$store.dispatch('getM4MarketingInfo');
      this.$store.dispatch('getM4PopularList', {mall: 'all_m4'});
      // 포커스
      if (ContextUtils.isAndroid()) {
        setTimeout(() => {
          document.getElementById("search_keyword").focus();
        }, 500);
      } else {
        document.getElementById("search_keyword").focus();
      }
    },
    searchbarAfterEnter(el) {
      el.style.opacity = 1;
      el.style.left = 0;
      this.$store.state.search.searchKeyword = this.$store.state.search.resultKeyword;
    },
    searchbarLeave(el) {
      el.style.opacity = 0;
      el.style.left = '100%';
    },
    tabFocusRemove(popupClose) {
      if (!event.shiftKey) {
        event.preventDefault();
        this[popupClose]();
      }
    },
    searchKeyword(keyword, mall) {
      if (!mall) {
        mall = this.selectedMall;
      }
      // 최근검색어 쿠키저장
      const params = {
        keyword: keyword,
        date: DateUtils.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      };
      if ( params.keyword === '' || params.keyword === null) {
        this.goMarketingUrl();
      } else {
        if (this.$store.state.m4Search.recentAutoSave) {
          this.$store.commit('addM4RecentSearchCookie', params);
        }
        const encKeyword = encodeURIComponent(keyword);
        let searchUrl = SiteUtils.marketformo('/ss/search_result?keyword=') + encKeyword + '&mall=' + (mall ? mall : this.selectMall) + '&t=' + Date.now();
        // gsfresh, dalisalda 의 경우 gsfresh몰 검색결과 페이지로 보낸다.
        if (mall ==='gsfresh_m4' || mall ==='gsfresh' || mall ==='all') {
          searchUrl = SiteUtils.freshmo('/ss/search_result?keyword=' + encKeyword + '&mall=' + 'all' + '&t' + Date.now());
        }
        if (mall ==='dalisalda') {
          searchUrl = SiteUtils.dalimo('/ss/search_result?keyword=' + encKeyword + '&mall=' + 'dalisalda' + '&t' + Date.now());
        }
        location.href = searchUrl;
      }
    },
    resetKeyword() {
      $('#search_keyword').val('');
      $('#search_keyword').focus();
      const params = {
        keyword: '',
      };
      this.$store.commit('setSearchKeyword', params);
    },
    keywordChange(e) {
      if (e.keyCode === 13) {
        // console.log("keywordChange", e.keyCode);
        this.searchKeyword(this.$store.state.search.searchKeyword);
      } else {
        const params = {
          keyword: this.$store.state.search.searchKeyword,
          mall: this.$store.state.search.baseMall
        };
        // 자동완성 추천단어
        this.$store.dispatch('getAutocompleteList', params);
        // 기획전 조회
        this.$store.dispatch('getEventList', params);
      }
    },
    goMarketingUrl() {
      const url = this.marketingInfo.linkUrl;
      // 디폴트 문구는 링크 없음 링크 없을 때 처리
      if (!url || url ==="") {
        this.$gsdialog.alert('검색어를 입력해주세요');
        return;
      }
      SiteUtils.go(location.host, url);
    },
    /* 8월수정 START : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가 */
    inputFocusIn() {
      this.inputFoucs = true;
    },
    inputFocusOut() {
      this.inputFoucs = false;
      this.$refs.searchInput.blur();
    },
    /* 8월수정 END : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가 */
    changeSelectMall(selected) {
      this.selectedMall = selected.mall;
      // 추천검색어
      this.$store.dispatch('getM4MarketingInfo', this.selectedMall);
      // 인기검색어
      this.$store.dispatch('getM4PopularList', selected);
      document.getElementById("search_keyword").focus();
    },
    showOption() {
        this.opened = !this.opened;
    },
    tabClick(index) {
      this.deliveryTab = index;
    },
    keywordClick(item, tabId) {
      const myRecentItemUrl = SiteUtils.marketformo('/ss/search_result?keyword=') + item.content + '&mall=all&t=' + Date.now();
      location.href = myRecentItemUrl;
    },
    closeSearch() {
      this.inputKeywordBoxActive = false;
      this.scrollBanModal(false);
    },
    scrollBanModal(boolan) {
      if (boolan) {
        this.dataY = window.pageYOffset;
        document.body.style["overflow"] = "hidden";
        document.body.style["position"] = "fixed";
        document.body.style["height"] = "100%";
        document.body.style["width"] = "100%";
        document.body.style["z-index"] = "1";
        document.body.style["top"] = -this.dataY + "px";
      } else {
        document.body.removeAttribute("style");
        window.scrollTo(0, this.dataY);
      }
    },
    getTarget(scrConTypeCd) {
      const conTypeCd = scrConTypeCd;
      if (conTypeCd == '01') {
        return '_blank';
      } else if (conTypeCd == '02') {
        return '_parent';
      } else if (conTypeCd == '03') {
        return '_self';
      } else if (conTypeCd == '04') {
        return '_top';
      }
    },
  },
  mounted() {
    this.$store.state.search.baseMall = this.$store.state.dp.daybreak? 'daybreak' : 'gsfresh';
    // 검색창 마케팅문구 조회
    this.$store.dispatch('getM4MarketingInfo');
    this.$store.dispatch('getM4PopularList', {mall: 'all_m4'});
    this.$store.dispatch('retrieveDawnDeliYn');
  },
  /* 8월수정 START : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가 */
  destroyed() {
    /* 8월수정 STATR : removeEventListener 에러 관련 예외 처리 */
    if (this.inputFoucs) {
      document.querySelector('.wrap-search-slide.scroll-area').removeEventListener('scroll', this.inputFocusOut);
    }
    /* 8월수정 END : removeEventListener 에러 관련 예외 처리 */
  },
  /* 8월수정 END : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가 */
  updated() {
    // 포커스 (접근성)
    // 4월수정 : 기획 검수용 코드 추가
    /* 8월수정 START : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가 */
    // if (this.tempActive) { // 기획 확인용
    if (this.searchbarActive) { // 실 개발 코드
      const el = document.querySelector('.wrap-search-slide.scroll-area');
      if (el) {
        el.addEventListener('scroll', () => {
          if (this.inputFoucs) {
            this.inputFocusOut();
          }
        });
      }
    }
    /* 8월수정 END : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가 */
  }
};
</script>
