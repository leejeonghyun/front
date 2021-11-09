<template>
  <div class="product-top-visual" v-bind:class="[siteClass]">
    <button class="swiper-button-prev" aria-label="이전슬라이드"></button>
    <button class="swiper-button-next" aria-label="다음슬라이드"></button>
    <div class="swiper-pagination number">
      <span class="current" aria-live="assertive" aria-atomic="true">{{activeIndex}}</span>/
      <span class="total">{{totalIndex}}</span>
    </div>
    <swiper :options="swiperOption" ref="subDetailSwiper">
      <swiper-slide v-for="imgs in item.imageList" :key="imgs.bditmCtnsSeqno" >
       <img :src="imgs.bditmImgPathNm" alt="고객등록이미지">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "EventPhotoReviewSlide",
  props: {
    item: Object,
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    const $this = this;
     return {
      totalIndex: 0,
      activeIndex: 0,
      swiperOption: {
        slidesPerView: 1,
        autoHeight: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          init() {
            $this.activeIndex = this.activeIndex + 1;
            $this.totalIndex = this.slides.length;
          },
          slideChange() {
            $this.activeIndex = this.activeIndex + 1;
          }
        }
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mounted: function() {

  }
};
</script>

<style>

</style>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
