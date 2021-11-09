<template>
  <span v-if="list != null && list != ''">
    <div class="wrap-gnb-banner" v-for="(item, index) in list" :key="index">
      <a :href="item.linkUrl">
        <figure>
          <img :src="item.ctnsPathNm" :alt="item.imgAltTextCnts" />
        </figure>
      </a>
    </div>
  </span>
</template>
<script>
export default {
  name: 'SidebarDaliBannerView',
  data() {
    return {
      dspConrId: this.$store.state.dp.mainConrInfo.dspConrId_117,
      list: [],
    };
  },
  async created() {
    try {
      const params = {
        dspCtgId: 'N11002002',
        dspConrId: this.dspConrId
      };
      this.$store.dispatch('getNftpStorTplConrInfo2', params);
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  methods: {
    getData() {
      const data = this.$store.getters.getNftpStorTplConrInfo2(this.dspConrId);
      if (data != null && data != '') {
        this.list = data;
      }
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
