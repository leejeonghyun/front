<template>
  <!-- START : 3자 제공 동의 -->
  <section class="section-area accordion-wrap agree-info-accordion">
    <div class="sub-title tit-accordion">
      <span class="inp-chk small">
        <input type="checkbox" name="" id="agree-info" value="">
        <label for="agree-info">주문 정보 확인 동의 <span class="required" aria-label="필수 항목">*</span></label>
      </span>
      <h2>
        <button type="button" id="agreeInfoAccordion01" class="tit" aria-controls="agree-accordion-content01" aria-expanded="false" @click="accordionEvent">
          <span class="hidden">주문 정보 확인 동의</span>
        </button>
      </h2>
    </div>
    <div id="agree-accordion-content01" class="sub-inner-box accordion-content" aria-labelledby="agreeInfoAccordion01" hidden="hidden">
      <p>주문할 상품의 상품명, 상품가격, 배송정보를 확인하였으며, 구매에 동의하시겠습니까? <em>(전자상거래법 제8조 제2항)</em></p>
    </div>
  </section>
  <!-- END : 3자 제공 동의 -->
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "GiftAgreement",
  data() {
    return {
    };
  },
  mixins: [AccordionMixin],
  components: {
  },
  methods: {
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
