<template>
  <section>
    <div class="promotion-banner" v-if="$store.getters.getM4EventList(1,'') && $store.getters.getM4EventList(1,'').length > 0">
      <a nohref v-for="(item, index) in $store.getters.getM4EventList(1,'')" :key="index"
      class="btn-text-plan-recommend" data-sc-action="link.click" data-dimension-name="link.searchAd" :data-dimension-value="item.ssevntNm"
      @click="goPlanUrl(item)">[기획전] {{item.ssevntNm}}</a>
    </div>
    <div class="search-result-priority">
      <ul class="search-result-list">
        <li v-for="item in $store.getters.filteredRecommendSearchList.slice(0,3)" :key="item.keyword" >
          <a nohref v-on:click.prevent="keywordClick(item, 'gsfresh')" class="search-result-item" data-sc-action="search.onsite" data-dimension-name="search.history" :data-dimension-value="item.keword">
            <span class="item-keyword" v-html="searchingTxt(item.keyword)"></span>
            <time class="item-date">{{dateFormat(item.date)}}</time>
          </a>
        </li>
        <li v-for="item in $store.getters.m4filteredAutoCompleteList" :key="item.keyword">
          <a nohref v-on:click.prevent="keywordClick(item)" class="search-result-item" data-sc-action="search.onsite" data-dimension-name="search.auto" :data-dimension-value="item.keword">
            <span class="item-keyword" v-html="searchingTxt(item.keyword)"></span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import DateUtils from '@/common/DateUtils';
import SiteUtils from '@/common/SiteUtils';
export default {
  components: {
  },
  name: 'RecommendArea',
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    goPlanUrl(item) {
      const ssventDetailUrl = SiteUtils.marketformo('/dp/ssevnt_detail?ssevntId=') + item.ssevntId + '&ssevntTimes=' + item.ssevntTimes;
      location.href = ssventDetailUrl;
    },
    dateFormat (date) {
      return DateUtils.format(date, 'MM.DD');
    },
    searchingTxt (txt) {
      const searchKeyword = this.$store.state.search.searchKeyword;
      return txt.replace(searchKeyword, '<em class="accent">' + searchKeyword + '</em>');
    },
    keywordClick(item, tabId) {
      if (tabId === 'simplycook') {
        this.$router.push({ path: ItemTemplete.itemDetail(item) });
      } else {
        this.$emit('keywordClick', item.keyword, tabId);
      }
    }
  },
};
</script>
