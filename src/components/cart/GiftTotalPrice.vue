<template>
  <div class="total-payment">
    <ul class="accordion-payment">
      <li>
        <div class="tit-accordion">
          <button type="button" id="paymentAccordion01" class="tit" aria-controls="payment-accordion-content01" aria-expanded="false" @click="accordionEvent">
            총 상품금액 <span class="price"><strong>{{comma(bsktInqRsltDto.totItemSprc)}}</strong>원</span>
          </button>
        </div>
        <ul id="payment-accordion-content01" class="accordion-content" aria-labelledby="paymentAccordion01" hidden="hidden">
          <li v-for="delivType in bsktInqRsltDto.delivTypeDtoList" v-bind:key="delivType.delivTypeCd">{{delivType.delivTypeNm}}배송 <span class="price"><strong>{{comma(delivType.itemSprc)}}</strong>원</span></li>
        </ul>
      </li>
      <li>
        <div class="tit-accordion">
          <button type="button" id="paymentAccordion02" class="tit" aria-controls="payment-accordion-content02" aria-expanded="false" @click="accordionEvent">
            총 할인금액 <span class="price"><strong class="red">-{{comma(bsktInqRsltDto.totItemSprc - bsktInqRsltDto.totItemDcSprc + (bsktInqRsltDto.totItemCpnDcAmt + bsktInqRsltDto.totDblDcCpnDcAmt + bsktInqRsltDto.totCmplDcAmt))}}</strong>원</span>
          </button>
        </div>
        <ul id="payment-accordion-content02" class="accordion-content" aria-labelledby="paymentAccordion02" hidden="hidden">
          <li v-for="delivType in bsktInqRsltDto.delivTypeDtoList" v-bind:key="delivType.delivTypeCd">
              {{delivType.delivTypeNm}}배송 <span class="price"><strong>-{{comma(delivType.itemSprc - delivType.itemDcSprc + (delivType.itemCpnDcAmt + delivType.dblDcCpnDcAmt))}}</strong>원</span>
            <ul class="inner-list">
              <li>행사할인 <span class="price"><strong>-{{comma(delivType.cmplDcAmt)}}</strong>원</span></li>
              <li>즉시할인 <span class="price"><strong>-{{comma(delivType.itemSprc - delivType.itemDcSprc + delivType.itemCpnDcAmt - delivType.pmbsDcAmt)}}</strong>원</span></li>
              <li>더블쿠폰 할인 <span class="price"><strong>-{{comma(delivType.dblDcCpnDcAmt)}}</strong>원</span></li>
              <li v-if="pmbsJoinPrcnCd === '0001'">D멤버십 할인 <span class="price"><strong>-{{comma(delivType.pmbsDcAmt)}}</strong>원</span></li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="total-detail">
        <div class="tit-accordion">
          총 배송비<button type="button" class="btn-infomation" aria-label="배송비 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupAction"><span class="hidden">배송비 안내</span></button> <span class="price"><strong>{{comma(bsktInqRsltDto.totDlfee)}}</strong>원</span>
        </div>
        <div>
          <ul class="shipping-content">
            <li v-for="delivType in bsktInqRsltDto.delivTypeDtoList" v-bind:key="delivType.delivTypeCd">{{delivType.delivTypeNm}}배송 <span class="price"><strong>{{comma(delivType.dlfee)}}</strong>원</span></li>
          </ul>
        </div>
      </li>
      <li>
        <div class="tit-accordion total-price">
          총 주문예정금액 <span class="price red"><strong>{{comma(bsktInqRsltDto.totItemDcSprc + bsktInqRsltDto.totDlfee - (bsktInqRsltDto.totItemCpnDcAmt + bsktInqRsltDto.totDblDcCpnDcAmt + bsktInqRsltDto.totCmplDcAmt))}}</strong>원</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
export default {
  props: {
    bsktInqRsltDto: Object,
    firstBuy: Number,
    pmbsJoinPrcnCd: String
  },
  name: "GiftotalPrice",
  data() {
    return {
    };
  },
  watch: {
    bsktInqRsltDto: function() {
      console.log(this.bsktInqRsltDto);
    },
  },
  directives: {},
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction(type) {
      this.$emit('popupEvent', 'popupDeliveryPrice');
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
  },
  mounted() {
  },
};
</script>
