<template>
  <span v-if="list != null && list != ''">
    <div class="product-banner-normal" v-for="(item, index) in list" :key="index">
      <gs-link :to="item.linkUrl" class="dali-item-link">
        <figure>
          <img :src="item.ctnsPathNm" class="bg-image" :alt="item.imgAltTextCnts" />
        </figure>
      </gs-link>
    </div>
  </span>
</template>
<script>
export default {
  name: 'SidebarNormalBanner',
  data() {
    return {
      dspConrId: this.$store.state.dp.mainConrInfo.dspConrId_118,
      list: [],
    };
  },
  components: {},
  methods: {
    getData() {
      const data = this.$store.getters.getNftpStorTplConrInfo(this.dspConrId);
      if (data != null && data != '') {
        this.list = data;
      }
    },
  },
  async created() {
    try {
      const params = {
        dspCtgId: 'N11002002',
        dspConrId: this.dspConrId
      };
      this.$store.dispatch('getNftpStorTplConrInfo', params);
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
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
