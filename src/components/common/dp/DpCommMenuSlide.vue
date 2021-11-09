<template>
  <div class="wrap-gnb" :class="{[type]: this.type}" :style="{top: gnbOffsetTop + 'px'}" ref="gnb">
    <ul class="wrap-gnb-slide" ref="gnbSlide" :style="{'--gnbWidth': this.gnbWidthSum + 'px'}">
      <li class="swiper-slide" v-for="(item,index) in dpCommMenuList" :key="index">
        <gs-link
          :to="item.linkUrl +'?load='+ cookieStorId"
          :class="{active: actPath === item.linkUrl}"
          :title="item.ctnsTitle"
          data-sc-action="gnb.click"
          data-dimension-name="link.linkName"
          :data-dimension-value="'gnb^'+item.ctnsTitle"
          @click="adobePageView(item.ctnsTitle)"
        >{{item.ctnsTitle}}</gs-link>
      </li>
    </ul>
  </div>
</template>
<script>
import ApiUtils from '@/common/ApiUtils';
import Tracker from '@/common/Tracker';
import LoginUtils from '@/common/LoginUtils';
import CookieUtils from '@/common/CookieUtils';
import ContextUtils from '@/common/ContextUtils';

export default {
  name: 'DpCommMenuSlide',
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
      gnbPos: [],
      gnbWidth: [], // 8월 수정 : gnb 갯수에 따라 간격 가변으로 수정을 위한 data 추가
      gnbWidthSum: null, // 8월 수정 : gnb 갯수에 따라 간격 가변으로 수정을 위한 data 추가
      actIndex: this.activeIndex,
      actPath: this.activePath,
      cookieStorId: CookieUtils.getCookie('STOR_ID'),
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
          this.gnbWidth[i] = gnb[i].clientWidth;
          this.gnbWidthSum += this.gnbWidth[i];
        }
        const center =
          this.gnbPos[index] + Math.floor(gnb[index].clientWidth / 2);
        if (this.gnbWidthSum <= window.innerWidth) {
          this.gnbWidthSum = window.innerWidth;
          this.$refs.gnbSlide.style.justifyContent = 'space-around';
        }
        this.gnbMoveAction(center);
      });
    },
    gnbMoveAction(center) {
      if (center >= this.device) {
        this.$refs.gnb.scrollLeft = center - this.device;
      } else {
        this.$refs.gnb.scrollLeft = 0;
      }
    },
    adobePageView(pageName) {
      Tracker.pageView({ pageName: pageName });
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
<style scoped>
</style>

