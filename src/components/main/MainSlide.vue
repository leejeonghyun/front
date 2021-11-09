<template>
  <div class="wrap-main-slide">
    <div class="wrap-controls">
      <div class="swiper-number-pagination">
        <span class="current" aria-live="assertive" aria-atomic="true">{{activeIndex}}</span>/
        <span class="total">{{ mainSlideLength }}</span>
        <!-- {{totalIndex}} -->
      </div>
      <button class="btn-total" aria-label="배너전체보기" aria-haspopup="dialog"></button>
      <button class="btn-slide-controls" :class="{stop : slideStop}" @click="slidePlayAction">
        <span
          class="hidden"
          aria-live="assertive"
          aria-atomic="true"
        >{{slideStop ? "자동슬라이드멈추기" : "자동슬라이드시작"}}</span>
      </button>
    </div>
    <div class="wrap-swiper">
      <button class="swiper-button-prev" aria-label="이전슬라이드" @click="slideStopAction"></button>
      <button class="swiper-button-next" aria-label="다음슬라이드" @click="slideStopAction"></button>
      <swiper :options="swiperOption" ref="mainSwiper">
        <swiper-slide v-for="(item, index) in mainSlide" :key="index">
          <a href="#" title="상품페이지이동">
            <img
              src="@/assets/images/_temp/_img_banner01_02.jpg"
              @load="setImage"
              alt="굴소스볶음우동(아빠가 만들어도 맛있는 표고버섯 볶음우동), 정가6,500원, 할인가 3,500원"
            />
          </a>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import SlideControlMixin from '@/mixins/SlideControlMixin';
export default {
  name: 'MainSlide',
  props: {
    mainSlide: Array,
  },
  components: {
    swiper,
    swiperSlide,
  },
  mixins: [SlideControlMixin],
  computed: {
    mainSlideLength() {
      return this.mainSlide ? this.mainSlide.length : 0;
    },
    swiperObject() {
      return this.$refs.mainSwiper.swiper;
    },
  },
  data() {
    const $this = this;
    return {
      totalIndex: 0,
      activeIndex: 0,
      slideStop: false,
      swiperOption: {
        autoplay: {
          delay: 3000,
        },
        autoHeight: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          init() {
            $this.activeIndex = this.activeIndex + 1;
            $this.totalIndex = this.slides.length;
          },
          slideChange() {
            $this.activeIndex = this.activeIndex + 1;
          },
        },
      },
    };
  },
  methods: {
    slidePlayAction() {
      this.slideStop = this.slidePlayEvent(this.swiperObject, this.slideStop);
    },
    slideStopAction() {
      this.slideStop = this.slidePlayEvent(this.swiperObject);
    },
    setImage(e) {
      this.$emit('gnbInitEvent');
    },
  },
};
</script>

<style>
</style>
