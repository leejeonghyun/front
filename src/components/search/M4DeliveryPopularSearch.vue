<template>
  <section class="content-keyword-delivery" v-if="$store.state.m4Search.gsfreshDawndeliYn">
    <h2 class="hidden">배송 유형에 따른 키워드 목록</h2>
    <div class="wrap-delivery-tab">
      <ul class="delivery-tab">
        <li><button aria-controls="tab_contents_0" class="delivery-tab-item dawn" :class="{'active':deliveryTab === 0 }">새벽배송</button></li>
      </ul>
    </div>
    <div class="delivery-keword" v-if="deliveryTab === 0" id="tab_contents_0">
      <ul class="delivery-keword-list">
        <li v-for="(pop, index) in $store.state.m4Search.daybreakPopularList.slice(0,10)" :key="index" >
          <button class="delivery-keyword-item dawn" @click="keywordClick(pop.content, 'daybreak')">{{searchWordEllipsis(pop.content)}}</button>
        </li>
        </ul>
    </div>
  </section>
</template>
<script>
import SiteUtils from '@/common/SiteUtils';
import DateUtils from '@/common/DateUtils';
export default {
  components: {
  },
  name: 'M4DeliveryPopularSearch',
  data() {
    return {
      deliveryTab: 0
    };
  },
  mounted() {
    this.getPopularList();
  },
  methods: {
    keywordClick(keyword) {
      // 최근 검색어 저장
      const params = {
          keyword: keyword,
          date: DateUtils.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      };
      if (this.$store.state.m4Search.recentAutoSave) {
        this.$store.commit('addM4RecentSearchCookie', params);
      }
      location.href = SiteUtils.freshmo('') + '/ss/search_result?keyword=' + encodeURIComponent(keyword) + '&mall=all&tabId=daybreak' + '&t=' + Date.now();
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
    getPopularList () {
      const params = {
        mall: 'daybreak' // this.searchTab
      };
      this.$store.dispatch("getM4PopularList", params);
    }
  },
};
</script>
