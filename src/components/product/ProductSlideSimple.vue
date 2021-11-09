<template>
  <swiper :options="swiperOption">
    <swiper-slide>
      <ProductSlideSimpleItem :index="0" @popupEvent="popupAction" />
    </swiper-slide>
    <swiper-slide>
      <ProductSlideSimpleItem :index="1" @popupEvent="popupAction" />
    </swiper-slide>
    <swiper-slide>
      <ProductSlideSimpleItem :index="2" @popupEvent="popupAction" />
    </swiper-slide>
    <swiper-slide>
      <ProductSlideSimpleItem :index="3" @popupEvent="popupAction" />
    </swiper-slide>
    <div class="swiper-scrollbar" slot="scrollbar"></div>
   </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ProductSlideSimpleItem from '@/components/product/ProductSlideSimpleItem';
export default {
  name: 'ProductSlideSimple',
  props: ['slideMargin', 'slideShow'],
  components: {
    swiper,
    swiperSlide,
    ProductSlideSimpleItem
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: this.slideShow ? this.slideShow : 3.5,
        spaceBetween: this.slideMargin ? this.slideMargin : 15,
        freeMode: true,
        containerModifierClass: 'wrap-product-simple ',
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
