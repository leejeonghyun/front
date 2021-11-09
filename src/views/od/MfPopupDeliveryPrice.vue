<!--
views/od/SC-FO-OD-MF-MP-006
-->
<template>
    <!-- START : 배송비 정보 레이어 -->
    <div id="popupDeliveryPrice" class="wrap-layer description-layer delivery-price-layer" role="dialog" aria-labelledby="popupDeliveryPrice" aria-modal="true" :class="{active : this.modalActive.popupDeliveryPrice}">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>배송비 안내</h3>
          </div>
          <div class="layer-content">
            <ul class="list-dot">
              <li>택배 상품은 업체에서 정하는 기준에 따라 배송비 부과 금액이 별도로 책정됩니다. </li>
              <li>상품배송비는 무료배송비와 무관하게 상품별 배송비 정책에 따라 부과됩니다. <br> ex) 수량, 박스, 크기, 무게</li>
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 배송비 정보 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "MfPopupDeliveryPrice",
  data() {
    return {
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
