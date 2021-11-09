<!--
views/od/SC-FO-OD-GS-MP-034
-->
<template>
    <!-- START : 할인 정보 레이어 -->
    <div id="popupDiscountInfo" class="wrap-layer description-layer discount-layer" role="dialog" aria-labelledby="popupDiscountInfo" aria-modal="true" :class="[{active : this.modalActive.popupDiscountInfo}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>할인내역</h3>
          </div>
          <div class="layer-content">
            <ul class="discount-price-list">
              <li>
                판매가 <span class="price"><strong>{{comma(bsktDiscountInfo.itemSprc * bsktDiscountInfo.bsktQty)}}</strong>원</span>
                <ul>
                  <li v-if="pmbsJoinPrcnCd === '0001'">달리드림 멤버십 할인({{getPercent(bsktDiscountInfo.itemSprc * bsktDiscountInfo.bsktQty, bsktDiscountInfo.pmbsDcAmt)}}%) <span class="price"><strong>-{{comma(bsktDiscountInfo.pmbsDcAmt)}}</strong>원</span></li>
                  <li>행사할인({{getPercent((bsktDiscountInfo.itemSprc * bsktDiscountInfo.bsktQty) - bsktDiscountInfo.pmbsDcAmt, (bsktDiscountInfo.prcDcAmt + bsktDiscountInfo.cmplDcAmt))}}%) <span class="price"><strong>-{{comma(bsktDiscountInfo.prcDcAmt + bsktDiscountInfo.cmplDcAmt)}}</strong>원</span></li>
                  <li>쿠폰할인({{getPercent(bsktDiscountInfo.itemDcSprc * bsktDiscountInfo.bsktQty - bsktDiscountInfo.cmplDcAmt, bsktDiscountInfo.itemCpnDcAmt)}}%) <span class="price"><strong>-{{comma(bsktDiscountInfo.itemCpnDcAmt)}}</strong>원</span></li>
                </ul>
              </li>
              <li>즉시할인가 <span class="price"><strong>{{comma(bsktDiscountInfo.itemDcSprc * bsktDiscountInfo.bsktQty - bsktDiscountInfo.cmplDcAmt - bsktDiscountInfo.itemCpnDcAmt)}}</strong>원</span></li>
              <li>더블쿠폰할인({{getPercent(bsktDiscountInfo.itemDcSprc * bsktDiscountInfo.bsktQty - bsktDiscountInfo.cmplDcAmt - bsktDiscountInfo.itemCpnDcAmt, bsktDiscountInfo.dblDcCpnDcAmt)}}%) <span class="price"><strong>-{{comma(bsktDiscountInfo.dblDcCpnDcAmt)}}</strong>원</span></li>
              <li class="total">맞춤 혜택가 <span class="price"><strong>{{comma(bsktDiscountInfo.itemDcSprc * bsktDiscountInfo.bsktQty - bsktDiscountInfo.cmplDcAmt - bsktDiscountInfo.itemCpnDcAmt - bsktDiscountInfo.dblDcCpnDcAmt)}}</strong>원</span></li>
            </ul>
            <div class="discount-price-info" v-if="bsktDiscountInfo.cardPromDesc !== ''">
              <p>{{bsktDiscountInfo.cardPromDesc}}</p>
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
  name: "PopupDiscountInfo",
  props: {
    bsktDiscountInfo: Object,
    pmbsJoinPrcnCd: String
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
      this.$emit('popupEvent', 'popupDiscountInfo');
      this.modalActiveEvent('popupDiscountInfo');
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    getPercent(orgAmt, dcAmt) {
      if (orgAmt === 0) {
        return 0;
      }
      return Math.floor(dcAmt / orgAmt * 100);
    }
  },
  mounted() {
    this.modalActiveEvent('popupDiscountInfo');
  }
};
</script>
