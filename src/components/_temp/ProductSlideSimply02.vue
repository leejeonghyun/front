<template>
  <swiper :options="swiperOption">
    <swiper-slide>
      <ProductSlideSimplyItem :index="0" @popupEvent="popupAction" />
    </swiper-slide>
    <swiper-slide>
      <ProductSlideSimplyItem :index="1" @popupEvent="popupAction" />
    </swiper-slide>
    <swiper-slide>
      <ProductSlideSimplyItem :index="2" @popupEvent="popupAction" />
    </swiper-slide>
    <swiper-slide>
      <ProductSlideSimplyItem :index="3" @popupEvent="popupAction" />
    </swiper-slide>
    <div class="swiper-scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ProductSlideSimplyItem from '@/components/_temp/ProductSlideSimplyItem02';
export default {
  name: 'ProductSlideSimple',
  props: ['slideMargin', 'slideShow'],
  components: {
    swiper,
    swiperSlide,
    ProductSlideSimplyItem
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
