<template>
  <div class="total-price-info">
    <p class="price-info">총 상품금액 27,480원 + 배송비 2,500원 = 29,980원</p>
    <button type="button" class="btn-go-today" aria-label="추천상품 팝업 활성화" aria-haspopup="dialog" @click="popupRecommendActive"><span>당일배송 <strong>1,540원 더 담고</strong> 무료배송 받기</span></button>
  </div>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "CartItemPrice",
  data() {
    return {
    };
  },
  directives: {},
  mixins: [AccordionMixin],
  components: {
  },
  methods: {
    popupRecommendActive() {
      this.$emit('popupEvent', 'popupTodayDelivery');
    }
  },
  mounted() {
  },
};
</script>
