<!--
views/ss/SC-FO-PA-GS-MP-013
-->
<template>
    <!-- START : 실시간 계좌이체 안내 레이어 -->
    <div id="popupAccountTransfer" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupAccountTransfer" aria-modal="true" :class="[{active : this.modalActive.popupAccountTransfer}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>실시간 계좌이체 안내</h3>
          </div>
          <div class="layer-content">
            <ul class="list-dot">
              <li>결제와 동시에 즉시 이체되며, 전체 주문 취소 시에는 당일 입금됩니다. 부분 취소의 경우 익일 입금됩니다.</li>
              <li>결제 가능한 은행</li>
              <li>세금계산서 용도로 사용하고자 하실 때는 지출증빙용으로 발행해주시기 바랍니다.</li>
              <li>현금영수증 발행은 1원 이상 결제 시에만 가능합니다.</li>
              <li>전액 포인트 결제 시 현금영수증이 발급되지않습니다.<br>(포인트+쿠폰으로 전액 결제일 경우 포함)</li>
              <li>개인 현금영수증은 등록하실 분은 휴대폰번호를 입력하세요 .</li>
              <li>사업자 현금영수증은 사업자를 선택하시고 사업자 번호를 입력 해주시기 바랍니다. </li>
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 실시간 계좌이체 안내 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupAccountTransfer",
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
      this.$emit('popupEvent', 'popupAccountTransfer');
      this.modalActiveEvent('popupAccountTransfer');
    },
  },
  mounted() {
    this.modalActiveEvent('popupAccountTransfer');
  }
};
</script>
