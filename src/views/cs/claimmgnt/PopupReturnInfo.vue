<!--
Design: views/cs/claimmgnt/SC-FO-SS-GF-MP-868
Pg id: PG-FO-CS-O015
Uri: /cs/claimmgnt/popup_return_info
-->
<template>
    <!-- START : 환불 처리안내 레이어 -->
    <div id="popupReturnInfo" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupReturnInfo" aria-modal="true" :class="[{active : this.modalActive.popupReturnInfo}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>환불 수단 안내</h3>
          </div>
          <div class="layer-content scroll-area">
            <ul class="list-dot return">
              <li>고객 귀책사유로 인한  반품 신청 시, 환불 신청금액에서 배송비가 차감되어 환불해 드립니다.</li>
              <li>추가 결제가 필요한 경우 신용카드, 계좌이체, 포인트로 <br> 결제 후 반품 신청 가능합니다.</li>
            </ul>
            <dl class="txt-desc">
              <dt>신용카드&amp; 모바일팝(선불충전카드)</dt>
              <dd>결제 당일 취소/반품 시 즉시 취소처리 되며, 결제일 이후 취소/반품 시 결제사에 따라 영업일 기준 3~5일 소요됩니다. (카드사마다 취소 승일 소요 시일이 다를 수 있으므로, 취소 승인이 되지 않은 경우 해당 카드사에 문의하여 주시기 바랍니다.)</dd>
            </dl>
            <dl class="txt-desc">
              <dt>계좌이체</dt>
              <dd>전체 취소/반품 시, 주문하신 계좌로 즉시 환불 되며, 부분 취소/반품의 경우에는 익일 입금됩니다.</dd>
            </dl>
            <dl class="txt-desc">
              <dt>네이버페이 &amp; 카카오페이 &amp; 페이코</dt>
              <dd>신용카드 결제 시 신용카드와 동일하게 적용 됩니다. <br>연결된 계좌, 카카오페이로 결제 시에는 해당 결제 수단으로 환불 처리됩니다.</dd>
            </dl>
            <dl class="txt-desc">
              <dt>휴대폰결제</dt>
              <dd>당월금액에 한해 전체 취소만 가능합니다.</dd>
            </dl>
            <dl class="txt-desc">
              <dt>GS&amp;POINT / THE POP 리워즈</dt>
              <dd>포인트는 취소/반품 승인 후 환불 처리 됩니다.</dd>
            </dl>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 환불 처리안내 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupReturnInfo",
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
      this.$emit('popupEvent', 'popupReturnInfo');
      this.modalActiveEvent('popupReturnInfo');
    },
  },
  mounted() {
    this.modalActiveEvent('popupReturnInfo');
  }
};
</script>
