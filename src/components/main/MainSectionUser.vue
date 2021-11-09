<template>
  <section class="wrap-recommend-tab" :class="{open: isRecommendActive}">
    <h2 class="hidden">추천 상품</h2>
    <button id="accordionRecommend" class="btn-recommend" aria-controls="accordionRecommendContent" :aria-expanded="isRecommendActive" @click="accordionEventAction">김경희님 이 상품 담으셨나요?</button>
    <div id="accordionRecommendContent" class="accordion-content" aria-labelledby="accordionRecommend" v-show="isRecommendActive">
      <!-- <ProductSlide :slideMargin="5" /> --> <!-- 실 사용 컴포넌트 -->
      <ProductList01 :slideMargin="5" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
    </div>
  </section>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
import ProductList01 from '@/components/_temp/ProductList01';
// import ProductSlide from '@/components/product/ProductSlide';
export default {
  name: "MainSectionUser",
  data() {
    return {
      isRecommendActive: true, // 개인화 영역 활성화 상태
    };
  },
  components: {
    ProductList01,
    // ProductSlide
  },
  mixins: [AccordionMixin],
  methods: {
    accordionEventAction() {
      this.accordionEvent();
      this.isRecommendActive = !this.isRecommendActive;
    },
  }
};
</script>

<style>

</style>
