<template>
  <span v-if="list != null && list != ''">
    <div class="dali-section-area">
      <h2>
        테마관
        <a href="javascript:void(0);" @click="goBrand">전체보기</a>
      </h2>
      <ProductBannerSlide :itemList="list" />
    </div>
  </span>
</template>
<script>
import ProductBannerSlide from '@/components/product/ProductBannerSlide';
export default {
  name: 'SidebarOtherBanner',
  data() {
    return {
      dspConrId: this.$store.state.dp.mainConrInfo.dspConrId_120,
      list: [],
    };
  },
  components: {
    ProductBannerSlide,
  },
  methods: {
    getData() {
      const data = this.$store.getters.getNftpStorTplConrInfo(this.dspConrId);
      if (data != null && data != '') {
        this.list = data;
      }
    },
    goBrand() {
      this.$router.push({ path: '/dp/brand' });
    },
  },
  mounted() {
    setTimeout(() => {
      this.getData();
    }, this.$store.state.dp.gnbSetTimes);
  },
};
</script>
<style scoped>
</style>
