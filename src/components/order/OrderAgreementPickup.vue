<template>
  <section class="section-area accordion-wrap agree-info-wrap">
    <!-- START : 주류 구매에 따른 개인정보 제공 동의 -->
    <div class="sub-title tit-accordion">
      <span class="inp-chk">
        <input type="checkbox" name="" id="agree-info1" value="">
        <label for="agree-info1">픽업 서비스 동의 <span class="required" aria-label="필수 항목">*</span></label>
      </span>
      <h2>
        <button type="button" id="agreeInfoAccordion01" class="tit" aria-controls="agree-accordion-content01" aria-expanded="false" @click="accordionEvent">
          <span class="hidden">픽업 서비스 동의 <span class="required" aria-label="필수 항목">*</span></span>
        </button>
      </h2>
    </div>
    <div id="agree-accordion-content01" class="sub-inner-box accordion-content pickup-agree-cont" aria-labelledby="agreeInfoAccordion01" hidden="hidden">
      <ol class="txt-info-list number-list">
        <li><span class="number">①</span> 주문하신 상품 중 냉동/냉장/신선식품은 스티로폼 박스로 배송됩니다. </li>
        <li><span class="number">②</span> 택배배송 상품은 해당 서비스 이용이 불가합니다.(점포 판매상품+택배 배송상품 → 배송 불가)</li>
        <li><span class="number">③</span> 주문 완료 시 고객/주문 정보 문자(SMS또는 LMS)가 GS 프레시몰 ID에 등록된 연락처로 발송되며, 지정한 배송지로 배송이 완료되면 배송완료 사진이 문자(SMS 또는 LMS)로 발송됩니다. </li>
        <li><span class="number">④</span> GS THE FRESH는 해당 상품에 대해 보관을 대행합니다.(당일 영업 종료 22시까지 상품 보관 가능)</li>
        <li><span class="number">⑤</span> 상품 불량으로 인한 환불 요청 시 유선 환불은 불가하며, 직접 고객센터에 접수하시기 바랍니다.(1661-2562)</li>
        <li><span class="number">⑥</span> 배송비(쇼핑대행료)는 온라인 센터 배송 정책과 동일기준으로 적용됩니다.</li>
      </ol>
    </div>
    <!-- END : 주류 구매에 따른 개인정보 제공 동의 -->
  </section>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "OrderAgreementPickup",
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
