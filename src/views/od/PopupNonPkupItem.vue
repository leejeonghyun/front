<!-- SC-FO-PA-GS-MP-033 -->
<template>
    <!-- START : 픽업주문불가상품 안내 레이어 -->
    <div id="popupNonPickupitem" class="wrap-layer description-layer wrap-non-box25 active" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
    <!-- 실사용 소스 -->
    <!-- <div id="popupNonPickupitem" class="wrap-layer description-layer wrap-non-box25" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupNonPickupitem}"> -->
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>픽업 주문 불가 상품 안내</h3>
          </div>
          <div class="layer-content">
            <p class="non-pick-inform">
              픽업 서비스가 불가한 상품이 있습니다<br />해당 상품을 제외하고 주문하시겠습니까?
            </p>
            <ul class="non-pick-list" v-for="product in pkupInvalidProduct" v-bind:key="product.ordsItemSeqno">
              <li><p class="product-name">{{product.ssevntClasfCd==='05'?'[마감세일]':product.ssevntClasfCd==='07'?'[하루판매]':''}} {{product.itemNm}}</p></li>
            </ul>
          </div>
        </div>
        <div class="btn-alert-bottom">
          <button class="btn-cancel" @click="popupAction">취소</button>
          <button class="btn-confirm" @click="procExcldItem()">확인</button>
        </div>
        <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 픽업주문불가상품 안내 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import OrderMsg from '@/components/order/OrderMsg';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    pkupInvalidProduct: Array,
    productItems: Array,
  },
  name: "PopupNonPkupItem",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupNonPkupItem');
      // this.modalActiveEvent('popupNonPkupItem');
    },
    procExcldItem() {
      this.$emit('popupEvent', 'popupBoxShop');
      this.$emit('processPkupItemExcld', 'pickup');
      this.$emit('popupEvent', 'popupNonPkupItem');
    },
  },
  mounted() {
    // this.modalActiveEvent('popupNonPkupItem');
    if (this.productItems.length === this.pkupInvalidProduct.length) {
      this.$gsdialog.alert(OrderMsg.pickupItemValid);
      this.popupAction();
    }
  }
};
</script>
