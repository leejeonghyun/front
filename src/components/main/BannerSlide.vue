<template>
  <div class="banner-slide wrap-swiper-slide">
    <button class="btn-slide-controls" :class="{stop : slideStop}" @click="slidePlayAction">
      <span
        class="hidden"
        aria-live="assertive"
        aria-atomic="true"
      >{{slideStop ? "자동슬라이드멈추기" : "자동슬라이드시작"}}</span>
    </button>
    <button class="swiper-button-prev" aria-label="이전슬라이드" @click="slideStopAction"></button>
    <button class="swiper-button-next" aria-label="다음슬라이드" @click="slideStopAction"></button>
    <div class="swiper-pagination">
      <span class="current" aria-live="assertive" aria-atomic="true">{{activeIndex}}</span>/
      <span class="total">{{totalIndex}}</span>
    </div>
    <swiper :options="swiperOption" ref="bannerSwiper">
      <swiper-slide v-for="(items, index) in bannerSlide" :key="index">
        <a href="#" title="이벤트페이지로이동">
          <img src="@/assets/images/_temp/_img_banner02_01.png" alt="좌측 나뚜루이미지,순수한자연과가까운먹거리" />
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import SlideControlMixin from '@/mixins/SlideControlMixin';
export default {
  name: 'BannerSlide',
  props: {
    bannerSlide: Array,
  },
  components: {
    swiper,
    swiperSlide,
  },
  mixins: [SlideControlMixin],
  computed: {
    swiperObject() {
      return this.$refs.bannerSwiper.swiper;
    },
  },
  data() {
    const $this = this;
    return {
      totalIndex: 0,
      activeIndex: 0,
      slideStop: false,
      swiperOption: {
        slidesPerView: 1,
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
  },
};
</script>

<style>
</style>
