<template>
  <div class="wrap-search-ing scroll-area">
    <ul>
      <div v-if="$store.state.search.recentAutoSave">
        <li v-for="item in $store.getters.filteredRecommendSearchList" :key="item.keyword">
          <button @click="keywordClick(item.keyword)" data-sc-action="search.onsite" data-dimension-name="search.history" :data-dimension-value="item.keword">
            <span aria-label="이전 검색 기록" v-html="searchingTxt(item.keyword)"></span>
            <span class="date" aria-label="이전 검색 날짜">{{dateFormat(item.date)}}</span>
          </button>
        </li>
      </div>
      <li v-for="item in $store.getters.filteredAutoCompleteList" :key="item.keyword">
        <button @click="keywordClick(item.keyword)" data-sc-action="search.onsite" data-dimension-name="search.auto" :data-dimension-value="item.keword">
          <span aria-label="자동완성 추천 단어" v-html="searchingTxt(item.keyword)"></span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import DateUtils from '@/common/DateUtils';
export default {
  components: {
  },
  name: 'RecommendSearching',
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    dateFormat (date) {
      return DateUtils.format(date, 'MM.DD');
    },
    searchingTxt (txt) {
      const searchKeyword = this.$store.state.search.searchKeyword;
      return txt.replace(searchKeyword, '<em class="search-ing-txt">' + searchKeyword + '</em>');
    },
    keywordClick(keyword) {
      // console.log("keyword :" + keyword);
      this.$emit('searchKeyword', keyword);
    }
  },
};
</script>

