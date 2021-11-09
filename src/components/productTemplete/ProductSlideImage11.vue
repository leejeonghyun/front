<template>
  <div class="wrap-product-slide product-image-11">
    <swiper :options="swiperOption" ref="productSwiper">
      <swiper-slide>
        <div class="inner-planshop-slide">
          <p class="plan-ad-txt">
            <span class="hidden">광고</span>
          </p>
          <div class="planshop-slide-top">
            <h2>
              <span class="label-plan">기획전</span>우유 살 때 이 상품 어떠세요?
            </h2>
          </div>
          <ProductImage11 @popupEvent="popupAction" />
          <ProductImage11 @popupEvent="popupAction" />
          <ProductImage11 :daliProduct="true" @popupEvent="popupAction" />
          <button class="btn-text more">
            <span>더보기</span>
          </button>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="inner-planshop-slide">
          <p class="plan-ad-txt">
            <span class="hidden">광고</span>
          </p>
          <div class="planshop-slide-top">
            <h2>
              <span class="label-plan">기획전</span>우유 살 때 이 상품 어떠세요?
            </h2>
          </div>
          <ProductImage11 @popupEvent="popupAction" />
          <ProductImage11 @popupEvent="popupAction" />
          <ProductImage11 :daliProduct="true" @popupEvent="popupAction" />
          <button class="btn-text more">
            <span>더보기</span>
          </button>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ProductImage11 from '@/components/productTemplete/ProductImage11'; // 이미지 일반형10 (달리살다 케이스 없음)
export default {
  name: 'ProductSlideImage11',
  props: ['slideMargin', 'slideShow', 'moreNone'],
  components: {
    swiper,
    swiperSlide,
    ProductImage11,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 5,
      },
    };
  },
  methods: {
    popupAction(type) {
      this.$emit('popupEvent', type);
    },
  },
};
</script>
