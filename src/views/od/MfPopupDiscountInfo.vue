<!--
views/od/SC-FO-OD-MF-MP-002
-->
<template>
    <!-- START : 할인 정보 레이어 -->
    <div id="popupDiscountInfo" class="wrap-layer description-layer discount-layer" role="dialog" aria-labelledby="popupDiscountInfo" aria-modal="true" :class="{active : this.modalActive.popupDiscountInfo}">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>할인내역</h3>
          </div>
          <div class="layer-content">
            <ul class="discount-price-list">
              <li class="dashed">
                총 상품금액 <span class="price"><strong>{{( bsktItemInfo.normSprc * bsktItemInfo.bsktQty ) + ( bsktItemInfo.skuAddAmt * bsktItemInfo.bsktQty ) | currency}}</strong>원</span>
              </li>
              <li class="dashed">
                총 할인금액 <span class="price"><strong>{{Number(getSellerDcAmt(bsktItemInfo)) + bsktItemInfo.itemCpnDcAmt | currency}}</strong>원</span>
                <ul>
                  <li>판매자할인({{getSellerDcPercent(bsktItemInfo)}}%) <span class="price"><strong>{{getSellerDcAmt(bsktItemInfo) >= 0 ? '-' : '+'}}{{Math.abs(getSellerDcAmt(bsktItemInfo)) | currency}}</strong>원</span></li>
                  <li>쿠폰할인({{getCpnDcPercent(bsktItemInfo)}}%) <span class="price"><strong>-{{bsktItemInfo.itemCpnDcAmt | currency}}</strong>원</span></li>
                </ul>
              </li>
              <li>
                할인적용가
                <span class="price">
                  <strong>{{((bsktItemInfo.sellAmt + bsktItemInfo.skuAddAmt) * bsktItemInfo.bsktQty ) - bsktItemInfo.itemCpnDcAmt | currency}}</strong>원
                </span>
              </li>
              <li class="total">
                최종혜택가
                <span class="price">
                  <strong>{{((bsktItemInfo.sellAmt + bsktItemInfo.skuAddAmt) * bsktItemInfo.bsktQty ) - bsktItemInfo.itemCpnDcAmt | currency}}</strong>원
                </span>
              </li>
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 할인 정보 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
export default {
  name: "PopupDiscountInfo",
  props: {
    bsktItemInfo: Object,
  },
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  filters: {
    currency: function(val) {
      return NumberUtils.toComma(val);
    },
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupDiscountInfo');
      this.modalActiveEvent('popupDiscountInfo');
    },
    getSellerDcAmt(bsktItem) {
      // 판매자할인금액 : (정상가X수량)+(옵션가X수량) - (판매가X수량)+(옵션가X수량)
      return ((bsktItem.normSprc * bsktItem.bsktQty) + (bsktItem.skuAddAmt * bsktItem.bsktQty))
        - ((bsktItem.sellAmt * bsktItem.bsktQty) + (bsktItem.skuAddAmt * bsktItem.bsktQty));
    },
    getSellerDcPercent(bsktItem) {
      // 판매자할인금액 : (정상가X수량)+(옵션가X수량) - (판매가X수량)+(옵션가X수량)
      const sellerDcAmt = ((bsktItem.normSprc * bsktItem.bsktQty) + (bsktItem.skuAddAmt * bsktItem.bsktQty)) - ((bsktItem.sellAmt * bsktItem.bsktQty) + (bsktItem.skuAddAmt * bsktItem.bsktQty));
      if (sellerDcAmt <= 0) return 0;
      // 총상품금액 : (정상가X수량)+(옵션가X수량)
      const totItemAmt = (bsktItem.normSprc * bsktItem.bsktQty) + (bsktItem.skuAddAmt * bsktItem.bsktQty);
      return Math.floor(sellerDcAmt / totItemAmt * 100);
    },
    getCpnDcPercent(bsktItem) {
      if (bsktItem.itemCpnDcAmt <= 0) {
        return 0;
      }
      return Math.floor(bsktItem.itemCpnDcAmt / (bsktItem.sellAmt * bsktItem.bsktQty) * 100);
    },
  },
  mounted() {
    this.modalActiveEvent('popupDiscountInfo');
  }
};
</script>
