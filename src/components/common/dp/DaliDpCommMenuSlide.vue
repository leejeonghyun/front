<template>
  <div
    class="wrap-dali-gnb"
    :class="{[type]: this.type}"
    :style="{top: gnbOffsetTop + 'px'}"
    ref="gnb"
  >
    <!-- 4월 수정 START : GNB 영역 전체 수정 -->
    <ul class="wrap-dali-gnb-slide" ref="gnbSlide">
      <li class="swiper-slide" v-for="(item, index) in dpCommMenuList" :key="index">
        <gs-link
          :to="item.linkUrl"
          :data-index="index"
          :class="{active: actPath === item.linkUrl}"
          data-sc-action="gnb.click"
          data-dimension-name="gnb.name"
          v-bind:data-dimension-value="item.ctnsTitle"
          @click="adobePageView('pageView',item.ctnsTitle)"
        >{{item.ctnsTitle}}</gs-link>
      </li>
    </ul>
    <!-- 4월 수정 END : GNB 영역 전체 수정 -->
  </div>
</template>

<script>
export default {
  name: 'DaliMenuSlide2',
  props: {
    gnbOffsetTop: Number,
    activeIndex: Number,
    activePath: String,
    type: String,
  },
  data() {
    this.device = window.innerWidth / 2;
    return {
      dpCommMenuList: [],
      active: this.activeIndex ? this.activeIndex : 0,
      actPath: this.activePath,
      gnbPos: [],
    };
  },
  computed: {
    countGnbData() {
      if (this.$store.state.dp.dpCommMenuList == undefined) {
        return 0;
      } else {
        return this.$store.state.dp.dpCommMenuList.length;
      }
    },
  },
  watch: {
    countGnbData(newCount, oldCount) {
      if (newCount > 0) {
        this.getData();
      }
    },
  },
  async created() {
    try {
      this.$store.dispatch('getDisplayGnbInfo', '');
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  methods: {
    getData() {
      const vm = this;
      this.dpCommMenuList = this.$store.state.dp.dpCommMenuList;
      vm.gnbInit();
    },
    gnbInit() {
      if (!this.$refs.gnb || !this.dpCommMenuList.length) return;

      this.$nextTick(() => {
        const gnb = this.$refs.gnb.querySelectorAll('li');
        // const index = this.active;
        const index = this.dpCommMenuList.findIndex(
          x => x.linkUrl == this.actPath
        );
        for (let i = 0; i < gnb.length; i++) {
          this.gnbPos[i] = gnb[i].offsetLeft;
        }
        const center =
          this.gnbPos[index] + Math.floor(gnb[index].clientWidth / 2);
        this.gnbMoveAction(center);
      });
    },
    gnbMoveAction(center) {
      if (center >= this.device) {
        this.$refs.gnbSlide.scrollLeft = center - this.device;
      } else {
        this.$refs.gnbSlide.scrollLeft = 0;
      }
    },
    adobePageView(action, pageName) {
      Tracker.pageView(action, { pageName: pageName });
    },
  },
  mounted() {
    if (this.countGnbData > 0) {
      this.gnbInit();
      this.getData();
    }
  },
  activated() {
    this.gnbInit();
  },
};
</script>
<style>
</style>
