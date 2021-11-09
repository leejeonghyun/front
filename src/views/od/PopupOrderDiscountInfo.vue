<!--
views/od/SC-FO-OD-GS-MP-034
-->
<template>
    <!-- START : 할인 정보 레이어 -->
    <div id="popupOrderDiscountInfo" class="wrap-layer description-layer discount-layer" role="dialog" aria-labelledby="popupOrderDiscountInfo" aria-modal="true" :class="[{active : this.modalActive.popupOrderDiscountInfo}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>할인내역</h3>
          </div>
          <div class="layer-content">
            <ul class="discount-price-list">
              <li>
                판매가 <span class="price"><strong>{{comma(ordsItemDcSate.sellAmt)}}</strong>원</span>
                <ul>
                  <li v-if="ordsItemDcSate.pmbsDcAmt > 0">달리드림 멤버십 할인({{getPercent(ordsItemDcSate.pmbsDcAmt / ordsItemDcSate.sellAmt * 100)}}%) <span class="price"><strong>-{{comma(ordsItemDcSate.pmbsDcAmt)}}</strong>원</span></li>
                  <li v-if="ordsItemDcSate.evntDcAmt > 0">행사할인({{getPercent(ordsItemDcSate.evntDcAmt / (ordsItemDcSate.sellAmt - ordsItemDcSate.pmbsDcAmt) * 100)}}%) <span class="price"><strong>-{{comma(ordsItemDcSate.evntDcAmt)}}</strong>원</span></li>
                  <li v-if="ordsItemDcSate.presDcAmt > 0">증정할인 <span class="price"><strong>-{{comma(ordsItemDcSate.presDcAmt)}}</strong>원</span></li>
                  <li v-if="ordsItemDcSate.itemCpnDcAmt > 0">쿠폰할인({{getPercent(ordsItemDcSate.itemCpnDcAmt / (ordsItemDcSate.sellAmt - ordsItemDcSate.pmbsDcAmt - ordsItemDcSate.evntDcAmt - ordsItemDcSate.presDcAmt) * 100)}}%) <span class="price"><strong>-{{comma(ordsItemDcSate.itemCpnDcAmt)}}</strong>원</span></li>
                </ul>
              </li>
              <li>즉시할인가 <span class="price"><strong>{{comma(ordsItemDcSate.drctDcSellAmt)}}</strong>원</span></li>
              <li v-if="ordsItemDcSate.dblDcCpnDcAmt > 0">더블쿠폰할인({{getPercent(ordsItemDcSate.dblDcCpnDcAmt / (ordsItemDcSate.sellAmt - ordsItemDcSate.pmbsDcAmt - ordsItemDcSate.evntDcAmt - ordsItemDcSate.presDcAmt - ordsItemDcSate.itemCpnDcAmt) * 100)}}%) <span class="price"><strong>-{{comma(ordsItemDcSate.dblDcCpnDcAmt)}}</strong>원</span></li>
              <li class="total">맞춤 혜택가 <span class="price"><strong>{{comma(ordsItemDcSate.lastBeneSellAmt)}}</strong>원</span></li>
            </ul>
            <div class="discount-price-info" v-if="ordsItemDcSate.cardBeneDcAmt > 0 || ordsItemDcSate.cardBeneSavgAmt > 0">
              <p v-if="ordsItemDcSate.cardBeneDcAmt > 0">{{ordsItemDcSate.cardBeneDcCnts}} <strong class="point">{{comma(ordsItemDcSate.cardBeneDcAmt)}}원</strong></p>
              <p v-if="ordsItemDcSate.cardBeneSavgAmt > 0">{{ordsItemDcSate.cardBeneSavgCnts}} <strong class="point">{{comma(ordsItemDcSate.cardBeneSavgAmt)}}P</strong></p>
            </div>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 할인 정보 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupOrderDiscountInfo",
  props: {
    ordsItemDcSate: Object
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupOrderDiscountInfo');
      this.modalActiveEvent('popupOrderDiscountInfo');
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    getPercent(dcAmt) {
      if (dcAmt === 0) {
        return 0;
      }
      return Math.floor(dcAmt);
    }
  },
  mounted() {
    this.modalActiveEvent('popupOrderDiscountInfo');
  }
};
</script>
