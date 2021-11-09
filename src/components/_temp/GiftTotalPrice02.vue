<template>
  <div class="total-payment">
    <ul class="accordion-payment">
      <li>
        <div class="tit-accordion">
          <button type="button" id="paymentAccordion01" class="tit" aria-controls="payment-accordion-content01" aria-expanded="false" @click="accordionEvent">
            총 상품금액 <span class="price"><strong>277,180</strong>원</span>
          </button>
        </div>
        <ul id="payment-accordion-content01" class="accordion-content" aria-labelledby="paymentAccordion01" hidden="hidden">
          <li>예약배송 <span class="price"><strong>2,500</strong>원</span></li>
          <li>당일배송 <span class="price"><strong>2,500</strong>원</span></li>
          <li>새벽배송 <span class="price"><strong>0</strong>원</span></li>
          <li>택배배송 <span class="price"><strong>0</strong>원</span></li>
        </ul>
      </li>
      <li>
        <div class="tit-accordion">
          <button type="button" id="paymentAccordion02" class="tit" aria-controls="payment-accordion-content02" aria-expanded="false" @click="accordionEvent">
            총 할인금액 <span class="price red"><strong>-75,220</strong>원</span>
          </button>
        </div>
        <ul id="payment-accordion-content02" class="accordion-content" aria-labelledby="paymentAccordion02" hidden="hidden">
          <li>
            예약배송 <span class="price red"><strong>2,500</strong>원</span>
            <ul class="inner-list">
              <li>즉시할인 <span class="price"><strong>-2,500</strong>원</span></li>
              <li>더블쿠폰 할인 <span class="price"><strong>-0</strong>원</span></li>
              <li>D멤버십 할인 <span class="price"><strong>-0</strong>원</span></li>
            </ul>
          </li>
          <li>
            당일배송 <span class="price red"><strong>2,500</strong>원</span>
            <ul class="inner-list">
              <li>즉시할인 <span class="price"><strong>-2,500</strong>원</span></li>
              <li>더블쿠폰 할인 <span class="price"><strong>-0</strong>원</span></li>
              <li>D멤버십 할인 <span class="price"><strong>-0</strong>원</span></li>
            </ul>
          </li>
          <li>
            새벽배송 <span class="price"><strong>-0</strong>원</span>
            <ul class="inner-list">
              <li>즉시할인 <span class="price"><strong>-2,500</strong>원</span></li>
              <li>더블쿠폰 할인 <span class="price"><strong>-0</strong>원</span></li>
              <li>D멤버십 할인 <span class="price"><strong>-0</strong>원</span></li>
            </ul>
          </li>
          <li>
            택배배송 <span class="price"><strong>-0</strong>원</span>
            <ul class="inner-list">
              <li>즉시할인 <span class="price"><strong>-2,500</strong>원</span></li>
              <li>더블쿠폰 할인 <span class="price"><strong>-0</strong>원</span></li>
              <li>D멤버십 할인 <span class="price"><strong>-0</strong>원</span></li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <div class="tit-accordion">
          총 배송비<button type="button" class="btn-infomation" aria-label="배송비 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupAction"><span class="hidden">배송비 안내</span></button> <span class="price"><strong>2,500</strong>원</span>
        </div>
        <div>
          <ul class="accordion-content">
            <li>예약배송 <span class="price"><strong>2,500</strong>원</span></li>
            <li>당일배송(3만원 이상 무료) <span class="price"><strong>2,500</strong>원</span></li>
            <li>새벽배송(4만원 이상 무료) <span class="price"><strong>0</strong>원</span></li>
            <li>택배배송 <span class="price"><strong>0</strong>원</span></li>
          </ul>
        </div>
      </li>
      <li class="show-benefit-price">
        <div class="tit-accordion">
          맛보기 상품금액 <span class="price"><strong>1,000</strong>원</span>
        </div>
      </li>
      <li class="show-first-price">
        <div class="tit-accordion">
          첫 구매  혜택상품 <span class="price"><strong>1,000</strong>원</span>
        </div>
      </li>
      <li>
        <div class="tit-accordion total-price">
          총 주문예정금액 <span class="price red"><strong>199,460</strong>원</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "GiftotalPrice02",
  data() {
    return {
    };
  },
  directives: {},
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction(type) {
      this.$emit('popupEvent', 'popupDeliveryPrice');
    },
  },
  mounted() {
  },
};
</script>
