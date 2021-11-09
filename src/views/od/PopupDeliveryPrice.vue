<!--
views/od/SC-FO-OD-GS-MP-035
-->
<template>
    <!-- START : 배송비 정보 레이어 -->
    <div id="popupDeliveryPrice" class="wrap-layer description-layer delivery-price-layer" role="dialog" aria-labelledby="popupDeliveryPrice" aria-modal="true" :class="[{active : this.modalActive.popupDeliveryPrice}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>배송비 안내</h3>
          </div>
          <div class="layer-content">
            <p>배송비는 배송 유형과 배송 매장에 따라 상이하게 부과됩니다.</p>
            <dl class="txt-desc">
              <dt>예약 배송비</dt>
              <dd>예약 상품의 배송 유형에 따라 배송비가 별도로 책정됩니다. </dd>
            </dl>
            <dl class="txt-desc">
              <dt>당일/새벽 배송비(쇼핑대행료)</dt>
              <dd>기준 금액 미만 시 쇼핑대행료가 배송비로 부과됩니다.<br>
              픽업 신청 시 장바구니의 배송지 기준 매장에서 픽업 장소로<br>
              배송하기 때문에 동일하게 쇼핑대행료가 부과됩니다. </dd>
            </dl>
            <dl class="txt-desc">
              <dt>택배 배송비</dt>
              <dd>택배의 경우 업체에서 정하는 기준에 따라 배송비 부과 금액이 별도로 책정됩니다.</dd>
            </dl>
            <!-- <dl class="txt-desc">
              <dt>해외직구 배송비</dt>
              <dd>해외직구 배송비는 구매금액 상관없이 모두 무료배송 입니다.</dd>
            </dl> -->
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 배송비 정보 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupDeliveryPrice",
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
      this.$emit('popupEvent', 'popupDeliveryPrice');
      this.modalActiveEvent('popupDeliveryPrice');
    },
  },
  mounted() {
    this.modalActiveEvent('popupDeliveryPrice');
  }
};
</script>
