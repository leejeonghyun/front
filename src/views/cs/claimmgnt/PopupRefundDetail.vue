<template>
  <!-- START : 환불예정금액 -->
  <div id="popupRefundDetail" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupRefundDetail" aria-modal="true" :class="[{active : this.modalActive.popupRefundDetail}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3>환불예정금액</h3>
        </div>
        <div class="layer-content">
          <ul class="refund-list">
            <li>전체결제금액 <span class="amount">7,560원</span></li>
            <li>취소상품금액<span class="amount cancel">-7000원</span></li>
            <li>쿠폰/할인혜택<span class="amount">3,000원</span></li>
          </ul>
          <ul class="refund-list">
            <li>재계산금액 <span class="amount">7,560원</span></li>
            <li>배송비<span class="amount">7000원</span></li>
          </ul>
          <ul class="refund-list">
            <li>재계산금액 <span class="amount">7,560원</span></li>
            <li class="refund-total">환불예정금액<span class="amount">7000원</span></li>
          </ul>
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 환불예정금액 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupRefundDetail",
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
      this.$emit('popupEvent', 'popupRefundDetail');
      this.modalActiveEvent('popupRefundDetail');
    },
  },
  mounted() {
    this.modalActiveEvent('popupRefundDetail');
  }
};
</script>
