<template>
  <swiper :options="swiperOption" ref="hotdeal">
    <swiperSlide>
      <ProductDealItem />
      <ProductDealItem />
    </swiperSlide>
    <swiperSlide>
      <ProductDealItem />
      <ProductDealItem />
    </swiperSlide>
    <div class="swiper-scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import ProductDealItem from '@/components/main/ProductDealItem';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'MainHotDeal',

  components: {
    ProductDealItem,
    swiper,
    swiperSlide,
  },
  computed: {
    swiperObject() {
      return this.$refs.hotdeal.swiper;
    },
  },
  props: {
    mainHotDeal: {
      type: Array,
      default: () => ({}),
    },
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
  data() {
    return {
      swiperOption: {
        freeMode: true,
        slidesPerView: this.slideShow ? this.slideShow : 1.15,
        spaceBetween: this.slideMargin ? this.slideMargin : 20,
        containerModifierClass: 'wrap-deal-slide ',
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
        },
      },
    };
  },
};
</script>

<style>
</style>
