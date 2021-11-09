<!--
views/od/SC-FO-OD-GS-MS-018
-->
<template>
  <!-- START : 하단 고정 버튼 (퀵메뉴) -->
  <div class="btn-fixed multi-total-price wrap-cart-footer" :class="[{active : this.showMore}, siteClass]">
    <div class="wrap-btn-option-popup" :class="{open : this.showMore}">
      <button class="btn btn-option-popup" @click="popupShowMore">
        <span class="hidden">총 상품금액 더보기</span>
      </button>
    </div>
    <p class="price-area">
      <span class="total-num">총 <strong>{{comma(totItemCnt)}}</strong>개 선택</span>
      <span class="total-price"><strong>{{comma(totAmtDto.totItemDcSprc + totAmtDto.totDlfee - (totAmtDto.totItemCpnDcAmt + totAmtDto.totDblDcCpnDcAmt) - totAmtDto.totCmplDcAmt)}}</strong>원(배송비 {{comma(totAmtDto.totDlfee)}}원포함)</span>
    </p>
    <div class="" v-if="this.showMore">
      <div class="total-payment scroll-area">
        <ul class="accordion-payment">
          <li>
            <div class="tit-accordion">
              <button type="button" id="paymentAccordion01" class="tit" aria-controls="payment-accordion-content01" aria-expanded="false" @click="accordionEvent">
                총 상품금액 <span class="price"><strong>{{comma(totAmtDto.totItemSprc)}}</strong>원</span>
              </button>
            </div>
            <ul id="payment-accordion-content01" class="accordion-content" aria-labelledby="paymentAccordion01" hidden="hidden">
              <!-- 수정 START : 2020.02.24 마크업 변경 (배송지로 변경) -->
              <li v-for="(bsktInqRsltDto, index) in bsktInqRsltDtoList" v-bind:key="index">배송지{{index + 1}} <span class="price"><strong>{{comma(bsktInqRsltDto.totItemSprc)}}</strong>원</span></li>
            </ul>
          </li>
          <li>
            <div class="tit-accordion">
              <button type="button" id="paymentAccordion02" class="tit" aria-controls="payment-accordion-content02" aria-expanded="false" @click="accordionEvent">
                총 할인금액 <span class="price"><strong class="red">-{{comma(totAmtDto.totItemSprc - totAmtDto.totItemDcSprc + (totAmtDto.totItemCpnDcAmt + totAmtDto.totDblDcCpnDcAmt) + totAmtDto.totCmplDcAmt)}}</strong>원</span>
              </button>
            </div>
            <ul id="payment-accordion-content02" class="accordion-content" aria-labelledby="paymentAccordion02" hidden="hidden">
              <li>
                <!-- 삭제 START : 2020.02.24 예약배송 레이블 삭제 -->
                <ul class="inner-list">
                  <li>행사할인 <span class="price"><strong>-{{comma(totAmtDto.totItemSprc - totAmtDto.totItemDcSprc - totAmtDto.totPmbsDcAmt + totAmtDto.totCmplDcAmt)}}</strong>원</span></li>
                  <li>쿠폰 할인 <span class="price"><strong>-{{comma(totAmtDto.totItemCpnDcAmt + totAmtDto.totDblDcCpnDcAmt)}}</strong>원</span></li>
                  <li v-if="bsktInqRsltDtoList[0].pmbsJoinPrcnCd === '0001'">달리드림 할인 <span class="price"><strong>-{{comma(totAmtDto.totPmbsDcAmt)}}</strong>원</span></li> <!-- 수정 START : 2020.02.24 텍스트 변경 (달리드림 할인으로 변경) -->
                </ul>
              </li>
            </ul>
          </li>
          <li class="total-detail">
            <div class="tit-accordion">
              총 배송비<button type="button" class="btn-infomation" aria-label="배송비 안내 팝업 활성화" aria-haspopup="dialog" @click="popupAction"><span class="hidden">배송비 안내</span></button> <span class="price"><strong>{{comma(totAmtDto.totDlfee)}}</strong>원</span>
            </div>
            <div>
              <ul class="accordion-content multi-area">
                <li v-for="(bsktInqRsltDto, index) in bsktInqRsltDtoList" v-bind:key="index">배송지{{index + 1}} <span class="price"><strong>{{comma(bsktInqRsltDto.totDlfee)}}</strong>원</span></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <p><button type="button" class="btn-lg btn-bg lightgreen" @click="goOrder">주문하기</button></p>
  </div>
  <!-- END : 하단 고정 버튼 (퀵메뉴) -->
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    multiDelivBskt: Object,
    bsktInqRsltDtoList: Array,
  },
  name: "MultiTotalPrice",
  data() {
    return {
      showMore: false, // 하단 최종금액 버튼
      totItemCnt: 0,
      totAmtDto: {},
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin, AccordionMixin],
  components: {
  },
  computed: {
  },
  methods: {
    // 팝업 활성/비활성
    popupAction(type) {
      this.$emit('popupEvent', 'popupDeliveryPrice');
    },
    // 하단 버튼 총금액 보기
    popupShowMore() {
      this.showMore = !this.showMore;
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    goOrder() {
      this.$emit('goOrder');
    }
  },
  destroyed() {
  },
  mounted() {
    let totItemSprc = 0;
    let totItemDcSprc = 0;
    let totDlfee = 0;
    let totItemCpnDcAmt = 0;
    let totDblDcCpnDcAmt = 0;
    let totPmbsDcAmt = 0;
    let totCmplDcAmt = 0;
    for (let idx=0; idx<this.multiDelivBskt.mbrDlvpList.length; idx++) {
      this.totItemCnt += this.multiDelivBskt.mbrDlvpList[idx].selBsktIds.length;
      totItemSprc += this.bsktInqRsltDtoList[idx].totItemSprc;
      totItemDcSprc += this.bsktInqRsltDtoList[idx].totItemDcSprc;
      totDlfee += this.bsktInqRsltDtoList[idx].totDlfee;
      totItemCpnDcAmt += this.bsktInqRsltDtoList[idx].totItemCpnDcAmt;
      totDblDcCpnDcAmt += this.bsktInqRsltDtoList[idx].totDblDcCpnDcAmt;
      totPmbsDcAmt += this.bsktInqRsltDtoList[idx].totPmbsDcAmt;
      totCmplDcAmt += this.bsktInqRsltDtoList[idx].totCmplDcAmt;
    }

    this.totAmtDto.totItemSprc = totItemSprc;
    this.totAmtDto.totItemDcSprc = totItemDcSprc;
    this.totAmtDto.totDlfee = totDlfee;
    this.totAmtDto.totItemCpnDcAmt = totItemCpnDcAmt;
    this.totAmtDto.totDblDcCpnDcAmt = totDblDcCpnDcAmt;
    this.totAmtDto.totPmbsDcAmt = totPmbsDcAmt;
    this.totAmtDto.totCmplDcAmt = totCmplDcAmt;
  },
  updated() {
  },
  watch: {
    bsktInqRsltDtoList: {
      deep: true,
      handler() {
        let totItemSprc = 0;
        let totItemDcSprc = 0;
        let totDlfee = 0;
        let totItemCpnDcAmt = 0;
        let totDblDcCpnDcAmt = 0;
        let totPmbsDcAmt = 0;
        let totCmplDcAmt = 0;
        this.totItemCnt = 0;
        for (let idx=0; idx<this.multiDelivBskt.mbrDlvpList.length; idx++) {
          this.totItemCnt += this.multiDelivBskt.mbrDlvpList[idx].selBsktIds.length;
          totItemSprc += this.bsktInqRsltDtoList[idx].totItemSprc;
          totItemDcSprc += this.bsktInqRsltDtoList[idx].totItemDcSprc;
          totDlfee += this.bsktInqRsltDtoList[idx].totDlfee;
          totItemCpnDcAmt += this.bsktInqRsltDtoList[idx].totItemCpnDcAmt;
          totDblDcCpnDcAmt += this.bsktInqRsltDtoList[idx].totDblDcCpnDcAmt;
          totPmbsDcAmt += this.bsktInqRsltDtoList[idx].totPmbsDcAmt;
          totCmplDcAmt += this.bsktInqRsltDtoList[idx].totCmplDcAmt;
        }

        this.totAmtDto.totItemSprc = totItemSprc;
        this.totAmtDto.totItemDcSprc = totItemDcSprc;
        this.totAmtDto.totDlfee = totDlfee;
        this.totAmtDto.totItemCpnDcAmt = totItemCpnDcAmt;
        this.totAmtDto.totDblDcCpnDcAmt = totDblDcCpnDcAmt;
        this.totAmtDto.totPmbsDcAmt = totPmbsDcAmt;
        this.totAmtDto.totCmplDcAmt = totCmplDcAmt;
      }
    }
  }
};
</script>
<style lang="scss">
</style>
