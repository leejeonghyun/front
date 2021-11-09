<template>
  <div v-show="sidebarSsevntView" v-bind:class="[siteClass]">
    <gs-link
      :to="`/dp/ssevnt_detail?ssevntId=${value.ssevntId}`"
      class="btn-special"
      v-for="(value, index) in this.$store.state.dp.sidebarSsevntList"
      :key="index"
    >{{value.ssevntNm}}</gs-link>
  </div>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'SidebarSsevnt',
  props: {
    dspCtgId: String,
  },
  computed: {
    countData() {
      if (this.$store.state.dp.sidebarSsevntList == undefined) {
        return 0;
      } else {
        return this.$store.state.dp.sidebarSsevntList.length;
      }
    },
  },
  watch: {
    countData(newCount, oldCount) {
      if (newCount > 0) {
        this.getData();
      }
    },
  },
  data() {
    return {
      sidebarSsevntView: false,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    getData() {
      const data = this.$store.state.dp.sidebarSsevntList;
      if (data.length !== 0) {
        this.sidebarSsevntView = true;
      }
    },
  },
  mounted() {
    if (this.countData > 0) {
      this.getData();
    }
  },
  async created() {
    try {
      const param = {
        dspCtgId: this.$props.dspCtgId,
      };
      this.$store.dispatch('getSidebarSsevntInfo', param);
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
};
</script>

<style>
</style>
