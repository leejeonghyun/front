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
          <li v-for="(delivType, index) in bsktInqRsltDto.delivTypeDtoList" v-bind:key="index">{{delivType.delivTypeNm}}배송 <span class="price"><strong>{{comma(delivType.itemSprc)}}</strong>원</span></li>
        </ul>
      </li>
      <li>
        <div class="tit-accordion">
          <button type="button" id="paymentAccordion02" class="tit" aria-controls="payment-accordion-content02" aria-expanded="false" @click="accordionEvent">
            총 할인금액 <span class="price"><strong class="red">-{{comma(bsktInqRsltDto.totItemSprc - bsktInqRsltDto.totItemDcSprc + (bsktInqRsltDto.totItemCpnDcAmt + bsktInqRsltDto.totDblDcCpnDcAmt) + bsktInqRsltDto.totCmplDcAmt)}}</strong>원</span>
          </button>
        </div>
        <ul id="payment-accordion-content02" class="accordion-content type-discount" aria-labelledby="paymentAccordion02" hidden="hidden">
          <li v-for="(delivType, index) in bsktInqRsltDto.delivTypeDtoList" v-bind:key="index">
              {{delivType.delivTypeNm}}배송 <span class="price"><strong>-{{comma(delivType.itemSprc - delivType.itemDcSprc + (delivType.itemCpnDcAmt + delivType.dblDcCpnDcAmt) + delivType.cmplDcAmt)}}</strong>원</span>
            <ul class="inner-list">
              <li>행사할인 <span class="price"><strong>-{{comma(delivType.itemSprc - delivType.itemDcSprc - delivType.pmbsDcAmt + delivType.cmplDcAmt)}}</strong>원</span></li>
              <li>쿠폰 할인 <span class="price"><strong>-{{comma(delivType.itemCpnDcAmt + delivType.dblDcCpnDcAmt)}}</strong>원</span></li>
              <li v-if="pmbsJoinPrcnCd === '0001'">달리드림 할인 <span class="price"><strong>-{{comma(delivType.pmbsDcAmt)}}</strong>원</span></li>
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
            <li v-for="(delivType, index) in bsktInqRsltDto.delivTypeDtoList" v-bind:key="index">{{delivType.delivTypeNm}}배송 <span class="price"><strong>{{comma(delivType.dlfee)}}</strong>원</span>
              <ul class="shipping-inner-list">
                <li>
                  상품배송비<span class="price"><strong>{{comma(delivType.itemDlfee)}}</strong>원</span>
                  <button type="button" class="btn icon-question" aria-label="상품배송비 팝업 활성화" aria-haspopup="dialog" @click="popupshippingFeeInfo">
                    <span class="hidden">상품배송비 안내 팝업</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <!--
          <ul class="accordion-content">
            <li v-for="(delivType, index) in bsktInqRsltDto.delivTypeDtoList" v-bind:key="index">{{delivType.delivTypeNm}}배송 <span class="price"><strong>{{comma(delivType.dlfee)}}</strong>원</span></li>
          </ul>
          -->
        </div>
      </li>
      <li class="show-benefit-price show" v-if="sampleInfo">
        <div class="tit-accordion">
          맛보기 상품금액 <span class="price"><strong>{{comma(sampleInfo.dcAmt)}}</strong>원</span>
        </div>
      </li>
      <li class="show-first-price show" v-if="firstBuy">
        <div class="tit-accordion">
          첫 구매  혜택상품 <span class="price"><strong>{{comma(firstBuy.dcAmt)}}</strong>원</span>
        </div>
      </li>
      <li>
        <div class="tit-accordion total-price">
          총 주문예정금액 <span class="price"><strong class="red">{{comma(bsktInqRsltDto.totItemDcSprc + bsktInqRsltDto.totDlfee - (bsktInqRsltDto.totItemCpnDcAmt + bsktInqRsltDto.totDblDcCpnDcAmt) - bsktInqRsltDto.totCmplDcAmt + ((firstBuy || {dcAmt: 0}).dcAmt || 0) + ((sampleInfo || {dcAmt: 0}).dcAmt || 0))}}</strong>원</span>
        </div>
      </li>
    </ul>
    <!-- 9월 수정 추가 START : 달리드림 -->
    <div class="dali-save" v-if="bsktInqRsltDto.totPmbsDcSchedAmt > 0 && pmbsJoinPrcnCd === '0000'">
      <p>달리드림 가입 후 구매하면 <strong><em>{{comma(bsktInqRsltDto.totPmbsDcSchedAmt)}}</em>원 Save!</strong></p>
      <a href="javascript://" class="dali-save-btn-arrow" @click="goDaliDream"><span>달리드림 60일 무료체험</span></a>
    </div>
    <!-- 9월 수정 추가 END : 달리드림 -->
  </div>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
import SiteUtils from '@/common/SiteUtils';

export default {
  name: "CartTotalPrice",
  props: {
    bsktInqRsltDto: Object,
    firstBuy: Object,
    sampleInfo: Object,
    pmbsJoinPrcnCd: String
  },
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
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    popupshippingFeeInfo() {
      // 주석 추가
      this.$emit('popupEvent', 'popupshippingFeeInfo');
    },
    goDaliDream() {
      location.href = SiteUtils.dalimo('/cp/gnb_dream_pass_benefit');
    }
  },
  mounted() {
  },
};
</script>
