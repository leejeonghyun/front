<!--
views\ss\SC-FO-SS-GF-MP-200.vue
-->
<!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 팝업을 호출하는 페이지 안 최상위 요소에 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
<template>
  <transition
    name="searchbar"
    v-on:before-enter="searchBeforeEnter"
    v-on:enter="searchbarEnter"
    v-on:after-enter="searchbarAfterEnter"
    v-on:leave="searchbarLeave"
  >
    <div
      id="popupSearch"
      v-if="searchbarActive"
      class="wrap-search-layer"
      role="dialog"
      aria-modal="true"
      :class="{active : searchbarActive}"
      tabindex="0"
    >
      <div class="layer-bg" @click="searchbarCloseAction"></div>
      <h2 class="hidden">검색어 입력 팝업</h2>
      <div class="inner-search-layer">
        <div class="wrap-searchbar">
          <button class="btn-searchbar-prev" @keydown.shift.9="searchbarCloseAction" @click="searchbarCloseAction"><!-- 6월 수정 : 뒤로가기 팝업 닫기 이벤트 추가 -->
            <span class="hidden">뒤로가기</span>
          </button>
          <div class="wrap-input search">
            <label for="search-input-popup" class="hidden">검색어 입력</label>
            <!-- 8월수정 START : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가 -->
            <input
              id="search-input-popup"
              type="text"
              @focus="inputFocusIn"
              @blur="inputFocusOut"
              v-model="$store.state.search.searchKeyword"
              v-on:input="$store.state.search.searchKeyword = $event.target.value"
              :placeholder="marketingInfo?marketingInfo.ctnsTitle:''"
              @keyup="keywordChange"
              autocomplete="off"
              ref="searchInput"
            />
            <!-- 8월수정 END : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가 -->
            <button v-if="$store.state.search.searchKeyword" class="btn-reset" @click="resetKeyword">
              <span class="hidden">검색어 초기화</span>
            </button>
          </div>
          <button class="btn-searchbar-search" @click="searchKeyword($store.state.search.searchKeyword)"
            data-sc-action="search.onsite" data-dimension-name="search.input" :data-dimension-value="keyword"
          >
            <span class="hidden">검색</span>
          </button>
        </div>
        <!-- START : 검색어 입력하지 않았을 때 -->
        <div v-show="$store.state.search.searchKeyword === ''" class="search-content">
          <!-- START : 추천 검색어 -->
          <RecommendSearch v-if="$store.state.search.recommendSearchList && $store.state.search.recommendSearchList.length > 0" />
          <!-- END : 추천 검색어 -->
          <!-- 8월수정 START : scroll-area 클래스 삭제 및 div.inner-area 태그 삭제(2020.08.27) -->
          <div class="wrap-search-slide scroll-area">
            <!-- 4월수정 START : 슬라이드 수정 options 값, pagination 변경 -->
            <div class="swiper-pagination" slot="pagination"></div>
            <swiper :options="swiperOption" ref="swiperSearch">
              <swiper-slide>
                <!-- START : 최근 검색어 -->
                <RecentSearch @searchKeyword="searchKeyword"/>
                <!-- END : 최근 검색어 -->
              </swiper-slide>
              <!-- 수정 START : 2020.03.11 최근본상품, 인기검색어 순서 변경 -->
              <swiper-slide>
                <!-- START : 인기 검색어 -->
                <span>
                  <h4>인기 검색어</h4>
                  <PopularSearch @searchKeyword="searchKeyword"/>
                </span>
                <!-- END : 인기 검색어 -->
              </swiper-slide>
              <swiper-slide>
                <!-- START : 최근 본 상품 또는 신상품 상품 -->
                <RecentItemSearch />
                <!-- END : 최근 본 상품 또는 신상품 상품 -->
              </swiper-slide>
              <!-- 수정 END : 2020.03.11 최근본상품, 인기검색어 순서 변경 -->
            </swiper>
            <div class="swiper-pagination" slot="pagination" ref="swiperSearchPagination"></div>
            <!-- 4월수정 END : 슬라이드 수정 options 값, pagination 변경 -->
          </div>
        </div>
        <!-- END : 검색어 입력하지 않았을 때 -->

        <div v-show="$store.state.search.searchKeyword !== ''" class="search-content">
          <!-- START : 추천 기획전 (실시간 검색 입력중일 경우 노출) -->
          <RecommendPlan v-if="$store.getters.getEventList(1,'').length > 0"/>
          <!-- END : 추천 기획전 (실시간 검색 입력중일 경우 노출) -->
          <!-- START : 실시간 검색어 입력 중 추천단어-->
          <RecommendSearching @searchKeyword="searchKeyword"/>
          <!-- END : 실시간 검색어 입력 중 추천단어-->
        </div>

        <button
          class="btn-close-search-layer"
          aria-label="포커스 아웃 시 팝업 닫기"
          @click="searchbarCloseAction"
          @keydown.9="tabFocusRemove('searchbarActive')"
        >
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import SlideControlMixin from '@/mixins/SlideControlMixin';
import DateUtils from '@/common/DateUtils';
import RecommendSearch from '@/components/search/RecommendSearch';
import RecentSearch from '@/components/search/RecentSearch';
import PopularSearch from '@/components/search/PopularSearch';
import RecommendPlan from '@/components/search/RecommendPlan';
import RecommendSearching from '@/components/search/RecommendSearching';
import RecentItemSearch from '@/components/search/RecentItemSearch';
import SiteUtils from '@/common/SiteUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'PopupSearch',
  mixins: [SlideControlMixin],
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.15,
        // 9월 오픈 후 수정 START : 스와이퍼 스크롤이 뻑뻑하게 안넘어가거나 영역 넘치게 스크롤 될 경우 추가해주세요
        observer: true,
        observeParents: true,
        // 9월 오픈 후 수정 END : 스와이퍼 스크롤이 뻑뻑하게 안넘어가거나 영역 넘치게 스크롤 될 경우 추가해주세요
      },
      keyword: '',
      marketingInfo: [],
      /* 8월수정 START : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 데이터 추가 */
      inputFoucs: false,
      /* 8월수정 END : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 데이터 추가 */
      searchbarActive: false,
    };
  },
  components: {
    swiper,
    swiperSlide,
    RecommendSearch,
    RecentSearch,
    PopularSearch,
    RecommendPlan,
    RecommendSearching,
    RecentItemSearch,
  },
  methods: {
    searchbarCloseAction() {
      if (this.searchbarActive) {
        this.$emit('searchbarEvent');
      }
    },
    searchBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    searchbarEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
      // 검색창 마케팅문구 조회
      this.$store.dispatch('getMarketingInfo');
      this.marketingInfo = this.$store.getters.getRandomMarketing;
    },
    searchbarAfterEnter(el) {
      el.style.opacity = 1;
      el.style.bottom = 0;
      el.focus();
      this.slideNextPrevButton('swiperSearch', true);
      this.$store.state.search.searchKeyword = this.$store.state.search.resultKeyword;
      this.$refs.searchInput.focus();
    },
    searchbarLeave(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    tabFocusRemove(popupClose) {
      if (!event.shiftKey) {
        event.preventDefault();
        this[popupClose]();
      }
    },
    searchKeyword(keyword, tabId) {
      // 최근검색어 쿠키저장
      const params = {
        keyword: keyword,
        date: DateUtils.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      };
      if ( !params.keyword ) {
        this.goMarketingUrl();
      } else {
        // console.log(params);
        this.$store.commit('addRecentSearchCookie', params);
        const baseMall = this.$store.state.search.baseMall;
        // 검색결과 이동
        const mall = tabId?tabId:(baseMall==='gsfresh'?'all':baseMall);
        const url = "/ss/search_result?keyword="+ keyword + "&mall=" + mall;
        SiteUtils.go(location.host, url);
        // this.$router.push({ name: 'SearchResult', query: params2 }).catch(err => {});
        // 팝업닫기
        this.$emit('searchbarEvent');
      }
    },
    resetKeyword() {
      $('#search-input-popup').val('');
      $('#search-input-popup').focus();
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
    /* 8월수정 START : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 수정(2020.08.27) */
    inputFocusOut() {
      if (this.inputFoucs) {
        this.inputFoucs = false;
        this.$refs.searchInput.blur();
      }
    },
    /* 8월수정 END : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 수정(2020.08.27) */
  },
  mounted() {
    this.searchbarActive = true;
    this.$store.state.search.baseMall = CookieUtils.getCookie('STOR_ID')==="2287"? 'daybreak' : 'gsfresh';
    // 검색창 마케팅문구 조회
    this.$store.dispatch('getMarketingInfo');
    this.$nextTick(() => {
      this.$refs.searchInput.blur();
      this.$refs.searchInput.focus();
    });
  },
  /* 8월수정 START : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가 */
  destroyed() {
    /* 8월수정 STATR : removeEventListener 에러 관련 예외 처리(2020.08.27) */
    if (this.inputFoucs) {
      window.removeListener('touchmove', this.inputFocusOut);
    }
    /* 8월수정 END : removeEventListener 에러 관련 예외 처리(2020.08.27) */
  },
  /* 8월수정 END : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가 */
  updated() {
    // 포커스 (접근성)
    // 4월수정 : 기획 검수용 코드 추가
    /* 8월수정 START : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가 */
    // if (this.tempActive) { // 기획 확인용
    if (this.searchbarActive) { // 실 개발 코드
      /* 8월수정 START : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가(2020.08.27) */
      window.addEventListener('touchmove', this.inputFocusOut);
      /* 8월수정 END : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가(2020.08.27) */
    }
    /* 8월수정 END : 키패드 올라온 상태에서 컨텐츠 슬라이드 시 인풋 포커스 아웃 이벤트 추가 */
  }
};
</script>
