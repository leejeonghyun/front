<template>
  <div class="wrap-product-slide product-image-11-01">
    <swiper :options="swiperOption" ref="productSwiper">
      <swiper-slide v-for="(item, i) in itemList" :key="i">
        <ProductImage11 :itemValue="item" @popupEvent="popupAction" @goCart="goCart"  />
      </swiper-slide>

      <!--<swiper-slide>
        <ProductImage11 :daliProduct="daliProduct" @popupEvent="popupAction" />
      </swiper-slide>-->
      <swiper-slide v-if="moreNone" :class="{'wrap-slide-more' : moreNone}">
        <a
          href="#"
          @click.prevent="clickMore"
          class="btn-product-more"
          aria-label="상품 더보기"
          :style="{height: imgHeight + 'px'}"
        >
          <i class="ico-more"></i>
        </a>
      </swiper-slide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ProductImage11 from '@/components/productTemplete/ProductImage11'; // 이미지 일반형10 (달리살다 케이스 없음)
export default {
  name: 'ProductSlideImage1101',
  props: {
    slideMargin: Number,
    slideShow: Number,
    moreNone: Boolean,
    daliProduct: {
      // 달리살다 나오는 항목 체크
      type: Boolean,
      default: false, // 기본은 hidden 상태
    },
    itemList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    swiper,
    swiperSlide,
    ProductImage11,
  },
  data() {
    const $this = this;
    return {
      imgHeight: 'auto',
      swiperOption: {
        observer: true,
        observeParents: true,
        slidesPerView: $this.moreNone
          ? 'auto'
          : $this.slideShow
          ? $this.slideShow
          : 3.5,
        spaceBetween: 20,
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
        },
        on: {
          init() {
            const imgWidth = parseInt(100 / $this.slideShow);
            const slidesCount = this.slides.length;
            $this.imgHeight = slidesCount > 0 && this.slides[0].clientWidth;
            for (let i = 0; i < slidesCount; i++) {
              if ($this.moreNone === undefined && i !== slidesCount - 1) {
                this.slides[i].style.width = imgWidth + '%';
              }
            }
          },
          observerUpdate() {
            $this.imgHeight =
              this.slides.length > 0 && this.slides[0].clientWidth;
          },
        },
      },
    };
  },
  methods: {
    popupAction(type) {
      this.$emit('popupEvent', type);
    },
    clickMore() {
      this.$emit('clickMore');
    },
    goCart(itemValue) {
      // 장바구니 외부호출 샘플
      this.$emit('goCart', itemValue);
    },
  },
};
</script>
