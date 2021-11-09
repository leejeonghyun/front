<template>
  <div class="wrap-gnb test" :class="{[type]: this.type}" :style="{top: gnbOffsetTop + 'px'}" ref="gnb">
      <ul>
        <li>
          <gs-link to="/SC-FO-SS-GF-MM-002" data-index="0" :class="activeIndex === 0 ? 'active' : ''">
            Home
          </gs-link>
        </li>
        <li>
          <a href="#" data-index="1" :class="activeIndex === 1 ? 'active' : ''">
            위대한빅세일
          </a>
        </li>
        <li>
          <a href="#" data-index="2" :class="activeIndex === 2 ? 'active' : ''">
            택배특가
          </a>
        </li>
         <li>
          <a href="#" data-index="3" :class="activeIndex === 3 ? 'active' : ''">
            오늘愛신선
          </a>
        </li>
        <li>
          <gs-link to="/SC-FO-PR-GF-MS-005" data-index="4" :class="activeIndex === 4 ? 'active' : ''">
            심플리쿡
          </gs-link>
        </li>
        <li>
          <a href="#" data-index="5" :class="activeIndex === 5 ? 'active' : ''">
            스피드 마켓
          </a>
        </li>
        <li>
          <a href="#" data-index="6" :class="activeIndex === 6 ? 'active' : ''">
            프리미엄관(브랜드)
          </a>
        </li>
        <li>
          <a href="#" data-index="7" :class="activeIndex === 7 ? 'active' : ''">
            사전예약
          </a>
        </li>
        <li>
          <a href="#" data-index="8" :class="activeIndex === 8 ? 'active' : ''">
            마케팅 고정 이벤트
          </a>
        </li>
        <li>
          <a href="#" data-index="9" :class="activeIndex === 9 ? 'active' : ''">
            BEST 기획전
          </a>
        </li>
        <li>
          <a href="#" data-index="10" :class="activeIndex === 10 ? 'active' : ''">
            쿠폰/이벤트
          </a>
        </li>
        <li>
          <a href="#" data-index="11" :class="activeIndex === 11 ? 'active' : ''">
            기획전
          </a>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'MenuSlide2',
  props: ['gnbOffsetTop', 'activeIndex', 'type'],
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
        console.log('i', gnb[i].offsetLeft);
        this.gnbPos[i] = gnb[i].offsetLeft;
      }
      const center = this.gnbPos[index] + Math.floor(gnb[index].clientWidth / 2);
      console.log('gnbInit', this.gnbPos[index]);
      this.gnbMoveAction(center);
    },
    gnbMoveAction(center) {
      console.log('center', center);
      if (center >= this.device) {
        this.$refs.gnb.scrollTo(center - this.device, 0);
      } else {
        this.$refs.gnb.scrollTo(0, 0);
      }
    }
  },
  mounted() {
    this.gnbInit();
  }
};
</script>
<style>
</style>
