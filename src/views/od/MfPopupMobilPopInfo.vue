<!--
views/od/SC-FO-PA-GS-MP-014
-->
<template>
    <!-- START : 모바일 팝 레이어 -->
    <div id="popupMobilePop" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupMobilePop" aria-modal="true" :class="[{active : this.modalActive.popupMobilePop}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>모바일 팝</h3>
          </div>
          <div class="layer-content">
            <p class="mb10">모바일팝 카드는 선불형 충전식 카드입니다. <br>모바일팝 앱 설치 및 잔액 충전 후 사용하시기 바랍니다. </p>
            <ul class="list-dot">
              <li>잔액은 모바일팝 앱에서 신용카드/계좌이체 등 다양한 결제 수단으로 충전하실 수 있습니다. </li>
              <li>모바일팝 카드 한장으로 GS&amp;POINT, 해피포인트 등 다양한 멤버십 적립/사용이 가능합니다.</li>
              <li>POP카드로 결제하면 멤버십 포인트가 자동으로 적립되고, 포인트 추가적립, 1+1 상품증정, 할인 등 다양한 혜택이 제공됩니다.</li>
              <li>POP카드 홈페이지(<a href="https://www.popcard.co.kr" target="_blank" title="새 창 열림" class="point underline">https://www.popcard.co.kr</a>)에서 회원가입 후 적립 포인트 사용 가능</li>
              <li>부분 결제 취소가 불가능한 결제수단으로 이용하신 경우 포인트로 환불처리 됩니다.</li>
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 모바일 팝 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupMobilePop",
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
      this.$emit('popupEvent', 'popupMobilePop');
      this.modalActiveEvent('popupMobilePop');
    },
  },
  mounted() {
    this.modalActiveEvent('popupMobilePop');
  }
};
</script>
