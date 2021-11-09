<template>
   <swiper :options="swiperOption" ref="productSwiper">
    <swiper-slide>
      <ProductSlideItem :index="0" @popupEvent="popupAction" />
    </swiper-slide>
    <swiper-slide>
      <ProductSlideItem :index="1" @popupEvent="popupAction" />
    </swiper-slide>
    <swiper-slide>
      <ProductSlideItem :index="2" @popupEvent="popupAction" />
    </swiper-slide>
    <swiper-slide>
      <ProductSlideItem :index="3" @popupEvent="popupAction" />
    </swiper-slide>
    <div class="swiper-scrollbar" slot="scrollbar"></div>
   </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ProductSlideItem from '@/components/_temp/ProductSlideSimplyCookItem';
export default {
  name: 'ProductSlide',
  props: ['slideMargin', 'slideShow'],
  components: {
    swiper,
    swiperSlide,
    ProductSlideItem
  },
   computed: {
    swiper() {
      return this.$refs.productSwiper.swiper;
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: this.slideShow ? this.slideShow : 2.2,
        spaceBetween: this.slideMargin ? this.slideMargin : 10,
        freeMode: true,
        containerModifierClass: 'wrap-product-slide ',
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
        },
      }
    };
  },
  methods: {
    popupAction(type, index) {
      this.$emit('popupEvent', type, index);
    },
  }
};
</script>

<style>

</style>
