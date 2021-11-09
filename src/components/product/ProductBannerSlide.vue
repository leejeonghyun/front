<template>
  <swiper :options="swiperOption" ref="productBannerSwiper" class="product-banner-swiper">
    <swiper-slide v-for="(item , index) in itemList" :key="index">
      <div class="slide">
        <a :href="item.linkUrl" class="dali-item-link">
          <figure>
            <img :src="item.ctnsPathNm" class="bg-image" :alt="item.imgAltTextCnts" />
          </figure>
          <div class="wrap-txt">
            <div class="inner-txt">
              <div class="banner-txt" aria-label="배너 내용">
                <!-- <p class="title">{{item.ctnsTitle}}</p> -->
              </div>
            </div>
          </div>
        </a>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import SlideControlMixin from '@/mixins/SlideControlMixin'; // 4월수정 : 슬라이드 수정
export default {
  name: 'productBannerSwiper',
  mixins: [SlideControlMixin],
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    itemList: Array,
  },
  // 4월수정 START : 슬라이드 수정
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.1,
        spaceBetween: 10,
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.productBannerSwiper.swiper;
    },
  },
  mounted() {
    this.slideNextPrevButton('productBannerSwiper');
  },
  // 4월수정 END : 슬라이드 수정
};
</script>

<style>
</style>
