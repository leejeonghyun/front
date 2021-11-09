<template>
  <span>
    <h4>최근 검색어</h4>
    <!-- START : 최근 검색어 자동 저장 OFF -->
    <!-- 8월수정 START : scroll-area 클래스명 원복(2020.08.27) -->
    <div v-if="!$store.state.search.recentAutoSave" class="inner-search-slide scroll-area">
      <div class="auto-save-off">
        <strong>최근 검색어 자동 저장 기능이 꺼져 있습니다.</strong>
        <p>
          '자동저장 켜기'를 하면
          <br />검색한 이력을 확인하여, 편하게 검색 하실 수 있습니다.
        </p>
      </div>
    </div>
    <!-- END : 최근 검색어 자동 저장 OFF -->
    <!-- START : 최근 검색 내역 없을 때 -->
    <!-- 8월수정 START : scroll-area 클래스명 원복(2020.08.27) -->
    <div
      v-else-if="$store.state.search.recentSearchList.length < 1"
      class="inner-search-slide scroll-area"
    >
      <NoList NoListText="최근 검색 내역이 없습니다." :ListType="'search-history'" />
    </div>
    <!-- END : 최근 검색 내역 없을 때 -->

    <!-- START : 최근 검색어 -->
    <!-- 8월수정 START : scroll-area 클래스명 원복(2020.08.27) -->
    <div v-else class="inner-search-slide scroll-area">
      <ul>
        <li v-for="recent in $store.state.search.recentSearchList" :key="recent.keyword">
          <button @click="keywordClick(recent.keyword)">{{recent.keyword}}</button>
          <button class="btn-icon-del" @click="removeKeword(recent.keyword)"
                  data-sc-action="search.onsite" data-dimension-name="search.recent" :data-dimension-value="recent.keyword"
          >
            <span class="hidden">삭제</span>
          </button>
        </li>
      </ul>
    </div>
    <!-- END : 최근 검색어 -->

    <!-- START : 최근 검색어 on/off 버튼 (최근 검색 내역이 없을때는 hidden) -->
    <div class="inner-search-btn-wrap">
      <p class="wrap-toggle-button">
        <input
          type="checkbox"
          id="toggle-button"
          v-model="$store.state.search.recentAutoSave"
          @click="toggleAutoSave"
        />
        <label class="input-toggle" for="toggle-button" aria-label="최근 검색어">자동저장</label>
      </p>
      <p>
        <button v-if="$store.state.search.recentAutoSave" @click="removeKewordAll">전체 삭제</button>
      </p>
    </div>
    <!-- START : 최근 검색어 on/off 버튼 (최근 검색 내역이 없을때는 hidden) -->
  </span>
</template>
<script>
import NoList from '@/components/common/NoList'; // 최근검색어 없음
export default {
  components: {
    NoList,
  },
  name: 'RecentSearch',
  data() {
    return {};
  },
  mounted() {
    this.$store.commit('getRecentAutoSave');
    this.$store.commit('getRecentSearchCookie');
  },
  methods: {
    // 최근검색어 삭제
    removeKeword(keyword) {
      const params = {
        keyword: keyword,
      };
      this.$store.commit('removeRecentSearchCookie', params);
    },
    // 최근검색어 전체삭제
    removeKewordAll() {
      const length = this.$store.state.search.recentSearchList.length;
      const $this = this;
      const msg = length > 0? '최근 검색어를 모두 삭제하시겠습니까?':'삭제할 최근 검색어가 없습니다.';
      if (length > 0) {
        this.$gsdialog.confirm(msg).then(function(dialog) {
          // 확인
          $this.$store.commit('removeRecentSearchCookieAll');
        }).catch(function() {
          // 취소
          return;
        });
      } else {
        this.$gsdialog.alert(msg).then(dialog => {
          console.log(e);
        });
      }
    },
    // 최근검색어 자동저장 Toggle
    toggleAutoSave(e) {
      const $this = this;
      const recentAutoSave = this.$store.state.search.recentAutoSave;
      const msg = recentAutoSave? '검색어 자동저장 기능을 사용 중지하시겠습니까?':'검색어 자동저장 기능을 사용하시겠습니까?';
      this.$gsdialog.confirm(msg).then(function(dialog) {
        // 확인
        const params = {
          value: !recentAutoSave,
        };
        $this.$store.commit('setRecentAutoSave', params);
        // 08/17 자동저장 끈 후 다시 켜면 최근검색어 다시 보이도록 수정
        // if (!params.value) {
        //   $this.$store.commit('removeRecentSearchCookieAll');
        // }
        return;
      }).catch(function() {
        // 취소
      });
      e.preventDefault();
    },
    keywordClick(keyword) {
      // console.log("keyword :" + keyword);
      this.$emit('searchKeyword', keyword);
    }
  },
};
</script>

