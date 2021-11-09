<!-- -->
<template>
  <div
    class="wrap-dali-gnb"
    :class="{[type]: this.type}"
    :style="{top: gnbOffsetTop + 'px'}"
    ref="gnb"
  >
    <ul class="wrap-dali-gnb-slide" ref="gnbSlide">
      <li class="swiper-slide" v-for="(item, index) in daliMenuSlide" :key="index">
        <a href="javascript:void(0);" :data-index="index" :class="{active: activeIndex === index}"
          data-sc-action="gnb.click"
          data-dimension-name="gnb.name"
          v-bind:data-dimension-value="item.ctnsTitle">{{item.ctnsTitle}}</a>
      </li>
      <!-- 이 부분 확인 필요(쓰래기 li 태그 넣어야됨.)-->
      <li class="invisible"></li>
      <li class="invisible"></li>
      <li class="invisible"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DaliMenuSlide2',
  props: {
    gnbOffsetTop: String,
    activeIndex: Number,
    type: String,
    daliMenuSlide: Array,
  },
  data() {
    this.device = window.innerWidth / 2;
    return {
      active: this.activeIndex ? this.activeIndex : 0,
      gnbPos: [],
    };
  },
  methods: {
    gnbInit() {
      const gnb = this.$refs.gnb.querySelectorAll('li');
      const index = this.active;
      for (let i = 0; i < gnb.length; i++) {
        this.gnbPos[i] = gnb[i].offsetLeft;
      }
      const center =
        this.gnbPos[index] + Math.floor(gnb[index].clientWidth / 2);
      this.gnbMoveAction(center);
    },
    gnbMoveAction(center) {
      if (center >= this.device) {
        this.$refs.gnbSlide.scrollLeft = center - this.device;
      } else {
        this.$refs.gnbSlide.scrollLeft = 0;
      }
    },
  },
  mounted() {
    this.gnbInit();
  },
};
</script>
<style>
.invisible {
  display: none;
}
</style>
