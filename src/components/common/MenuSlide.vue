<template>
  <div class="wrap-gnb" :class="{[type]: this.type}" :style="{top: gnbOffsetTop + 'px'}" ref="gnb">
    <ul class="wrap-gnb-slide" ref="gnbSlide">
      <li class="swiper-slide" v-for="(item,index) in menuSlide" :key="index" @click="updateActiveIndex(index)">
        <a href="#" :class="{active: actIndex === index}">
          {{ item.ctnsTitle }}
        </a>
      </li>
      <li class="invisible"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuSlide2',
  props: ['gnbOffsetTop', 'activeIndex', 'type', 'menuSlide'],
  data() {
    this.device = window.innerWidth / 2;
    return {
      active: this.activeIndex ? this.activeIndex : 0,
      gnbPos: [],
      actIndex: this.activeIndex
    };
  },
  methods: {
    gnbInit() {
      const gnb = this.$refs.gnb.querySelectorAll('li');
      const index = (this.active < gnb.length) ? this.active : (gnb.length - 1);
      for (let i = 0; i < gnb.length; i++) {
        this.gnbPos[i] = gnb[i].offsetLeft;
      }
      const center = this.gnbPos[index] + Math.floor(gnb[index].clientWidth / 2);
      this.gnbMoveAction(center);
    },
    gnbMoveAction(center) {
      if (center >= this.device) {
        this.$refs.gnbSlide.scrollLeft = center - this.device;
      } else {
        this.$refs.gnbSlide.scrollLeft = 0;
      }
    },
    updateActiveIndex(index) {
      this.actIndex = index;
    }
  },
  mounted() {
    this.gnbInit();
  }
};

</script>
<style scope>
.invisible {
  display : none;
}
</style>
