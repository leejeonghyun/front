<template>
  <section class="content-keyword-current">
    <div class="current-header">
      <h2 class="content-title">최근 검색어</h2>
      <div class="toggle-active">
        <input type="checkbox" id="seachSaveKeyword" name="" value="" class="toggle-active-input" v-model="$store.state.m4Search.recentAutoSave" @click="toggleAutoSave">
        <label class="save-keyword-label" for="seachSaveKeyword">검색어 저장</label>
      </div>
      <div class="total-remove">
        <button class="search-all-remove-btn" v-if="$store.state.m4Search.recentAutoSave && $store.state.m4Search.recentSearchList && $store.state.m4Search.recentSearchList.length > 0" @click="removeKewordAll">전체 삭제</button>
      </div>
    </div>
    <div class="keyword-content">
      <p class="none-msg" v-if="!$store.state.m4Search.recentAutoSave"><span class="accent-text-1">검색어 자동 저장</span>을 이용 하시면 <span class="accent-text-2">쇼핑 검색이 편리</span>해집니다.</p>
      <template v-else>
        <p class="none-msg" v-if="!$store.state.m4Search.recentSearchList || $store.state.m4Search.recentSearchList.length < 1"><span class="accent-text-1">검색을 이용</span>하시면 <span class="accent-text-2">자동으로 검색어</span>를 저장합니다.</p>
        <ul class="keyword-lists" v-else>
          <li v-for="recent in $store.state.m4Search.recentSearchList" :key="recent.keyword">
            <span class="keyword-current-item">
              <a nohref @click="keywordClick(recent.keyword)">{{searchWordEllipsis(recent.keyword)}}</a>
              <button @click="removeKeword(recent.keyword)" data-sc-action="search.onsite" data-dimension-name="search.recent" :data-dimension-value="recent.keyword"><em class="hidden">키워드삭제</em></button>
            </span>
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>
<script>
export default {
  components: {
  },
  name: 'M4RecentSearch',
  data() {
    return {};
  },
  mounted() {
    this.$store.commit('getM4RecentAutoSave');
    this.$store.commit('getM4RecentSearchCookie');
  },
  methods: {
    // 최근검색어 삭제
    removeKeword(keyword) {
      const params = {
        keyword: keyword,
      };
      this.$store.commit('removeM4RecentSearchCookie', params);
    },
    // 최근검색어 전체삭제
    removeKewordAll() {
      const length = this.$store.state.m4Search.recentSearchList.length;
      const $this = this;
      const msg = length > 0? '최근 검색어를 모두 삭제하시겠습니까?':'삭제할 최근 검색어가 없습니다.';
      if (length > 0) {
        this.$gsdialog.confirm(msg).then(function(dialog) {
          // 확인
          $this.$store.commit('removeM4RecentSearchCookieAll');
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
      const recentAutoSave = this.$store.state.m4Search.recentAutoSave;
      const msg = recentAutoSave ? '검색어 자동저장 기능을 사용 중지하시겠습니까?':'검색어 자동저장 기능을 사용하시겠습니까?';
      this.$gsdialog.confirm(msg).then(function(dialog) {
        // 확인
        const params = {
          value: !recentAutoSave,
        };
        $this.$store.commit('setM4RecentAutoSave', params);
        if (!params.value) {
          $this.$store.commit('removeM4RecentSearchCookieAll');
        }
        return;
      }).catch(function() {
        // 취소
      });
      e.preventDefault();
    },
    keywordClick(keyword) {
      this.$emit('searchKeyword', keyword), 'all';
    },
    // 말줄임표 처리
    searchWordEllipsis (word) {
      const length = 20;
      if (!word) {
        return '';
      }
      if (word.length > length) {
        return word.substr(0, length) + '...';
      }
      return word;
    },
  },
};
</script>
