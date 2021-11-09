<template>
  <div class="wrap-product">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in itemList" :key="index">
        <ProductSlideItem :index="index" :items="item" @popupEvent="popupAction" />
      </swiper-slide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ProductSlideItem from '@/components/product/ProductSlideItem';
import ApiUtils from '@/common/ApiUtils';

export default {
  name: 'ProductSlideMain',
  props: {
    slideMargin: Number,
    slideShow: Number,
    dspConrId: Number,
  },
  components: {
    swiper,
    swiperSlide,
    ProductSlideItem,
  },
  data() {
    const $this = this;
    return {
      itemList: [],
      swiperOption: {
        observer: true,
        observeParents: true,
        slidesPerView: this.slideShow ? this.slideShow : 2.2,
        spaceBetween: this.slideMargin ? this.slideMargin : 10,
        freeMode: true,
        containerModifierClass: 'wrap-product-slide ',
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
        },
      },
    };
  },
  methods: {
    popupAction(type, index) {
      this.$emit('popupEvent', type, index);
    },
  },
  mounted: async function() {
    try {
      const params = {
        dspConrId: this.dspConrId,
      };

      const response = await ApiUtils.get(
        '/dp/fr/dspctgmgnt/nftp-categroy-item-list',
        params
      );

      this.itemList = response.data.data;
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
};
</script>
