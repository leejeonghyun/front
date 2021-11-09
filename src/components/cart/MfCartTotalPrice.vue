<template>
  <div class="total-payment">
    <ul class="accordion-payment">
      <li>
        <div class="tit-accordion">
          <button type="button" id="paymentAccordion01_m4" class="tit" aria-controls="payment-accordion-content01_m4" aria-expanded="false" @click="accordionEvent">
            총 상품금액 <span class="price"><strong>{{bsktInqRsltDto.totNormItemSprc | currency}}</strong>원</span>
          </button>
        </div>
        <ul id="payment-accordion-content01_m4" class="accordion-content pricr-ul-list" aria-labelledby="paymentAccordion01" hidden="hidden">
          <li v-for="(supplInfo, idx) in bsktInqRsltDto.supplFirmDtoList" :key="`SUPPL_ITEM_INFO_${idx}`">
            {{supplInfo.mallNm}} <button aria-haspopup="dialog" type="button"><span class="price"><strong>{{supplInfo.normItemSprc | currency}}</strong>원</span></button>
          </li>
        </ul>
      </li>
      <li>
        <div class="tit-accordion">
          <button type="button" id="paymentAccordion02_m4" class="tit" aria-controls="payment-accordion-content02_m4" aria-expanded="false" @click="accordionEvent">
            총 할인금액 <span class="price red"><strong>-{{bsktInqRsltDto.totItemCpnDcAmt + ( bsktInqRsltDto.totNormItemSprc - bsktInqRsltDto.totItemSprc ) | currency}}</strong>원</span>
          </button>
        </div>
        <ul id="payment-accordion-content02_m4" class="accordion-content" aria-labelledby="paymentAccordion02" hidden="hidden">
          <li>
            판매자할인 <span class="price red"><strong>{{bsktInqRsltDto.totNormItemSprc - bsktInqRsltDto.totItemSprc | currency}}</strong>원</span>
          </li>
          <li>
            상품쿠폰할인 <span class="price red"><strong>{{bsktInqRsltDto.totItemCpnDcAmt | currency}}</strong>원</span>
          </li>
        </ul>
      </li>
      <li>
        <div class="tit-accordion">
          <button type="button" id="paymentAccordion03_m4" class="tit" aria-controls="payment-accordion-content03_m4" aria-expanded="false" @click="accordionEvent">
          총 배송비 <span class="price"><strong>{{bsktInqRsltDto.totDlfee | currency}}</strong>원</span>
          <button type="button" class="btn-infomation" aria-label="배송비 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupAction('popupDeliveryPrice')" />
          </button>
        </div>
        <div>
          <!-- 4월수정 START : 내용 수정 -->
          <ul class="accordion-content pricr-ul-list" id="payment-accordion-content03_m4" aria-labelledby="paymentAccordion03" hidden="hidden">
            <li v-for="(supplInfo, idx) in bsktInqRsltDto.supplFirmDtoList" :key="`SUPPL_DLFEE_INFO_${idx}`">
              {{supplInfo.mallNm}} <button aria-haspopup="dialog" type="button" ><span class="price"><strong>{{supplInfo.dlfee | currency}}</strong>원</span></button>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <div class="tit-accordion total-price">
          총 주문예정금액 <span class="price"><strong>{{(bsktInqRsltDto.totItemSprc + bsktInqRsltDto.totDlfee) - bsktInqRsltDto.totItemCpnDcAmt | currency}}</strong>원</span>
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
  name: "MfCartTotalPrice",
  props: {
    bsktInqRsltDto: Object,
  },
  data() {
    return {
    };
  },
  directives: {},
  mixins: [AccordionMixin, LayerPopupMixin],
  filters: {
    currency: function(val) {
      return NumberUtils.toComma(val);
    },
  },
  methods: {
    popupAction(type) {
      this.$emit('popupEvent', type);
      event.stopPropagation();
      // this.popup[type] = !this.popup[type];
    },
  },
  mounted() {
  },
};
</script>
