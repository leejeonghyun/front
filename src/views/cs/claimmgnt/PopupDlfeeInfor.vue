<template>
  <!-- 4월 수정 START : 문구 수정 -->
  <!-- START : 고객부담금액 -->
  <div id="popupDeliveryPersonal" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupDeliveryPersonal" aria-modal="true" :class="[{active : this.modalActive.popupDeliveryPersonal}, siteclass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3>고객부담금액</h3>
        </div>
        <div class="layer-content">
          <p class="mb10">취소/반품/교환으로 인하여 최종 결제 금액이 무료배송 및 <br> 쿠폰적용기준 미충족 시 고객부담금이 발생합니다. </p>
          <ul class="list-dot">
            <li>당일배송 : 3만원 미만 2,500원</li>
            <li>새벽배송 : 4만원 미만 3,000원</li>
            <li>해외직구배송 : 5만원 미만 10,000원 </li>
            <li>택배배송 : 업체별 배송비 기준 적용</li>
          </ul>
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 고객부담금액 -->
  <!-- 4월 수정 END : 문구 수정 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupDeliveryPersonal",
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
      this.$emit('popupEvent', 'popupDeliveryPersonal');
      this.modalActiveEvent('popupDeliveryPersonal');
    },
  },
  mounted() {
    this.modalActiveEvent('popupDeliveryPersonal');
  }
};
</script>
