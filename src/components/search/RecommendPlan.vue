<template>
  <div class="wrap-recommend-search plan">
    <h3 class="hidden">추천 기획전</h3>
    <button v-for="(item, index) in $store.getters.getEventList(1,'')" :key="index"
      class="btn-text-plan-recommend" data-sc-action="link.click" data-dimension-name="link.searchAd" :data-dimension-value="item.ssevntNm"
      @click="goPlanUrl(item)"
      >
        <p><span>[기획전]</span>{{item.ssevntNm}}</p>
    </button>
  </div>
</template>
<script>
export default {
  components: {
  },
  name: 'RecommendPlan',
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    goPlanUrl(item) {
      const params = {
        ssevntId: item.ssevntId,
        ssevntTimes: item.ssevntTimes,
      };
      this.$router.push({ name: 'SsevntDetail', query: params });
    }
  },
};
</script>
