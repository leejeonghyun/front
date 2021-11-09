<template>
  <!-- 4월 수정 START : 문구 수정 -->
  <!-- START : 고객부담금액 -->
  <div
    id="popupDeliveryPersonal"
    class="wrap-layer description-layer"
    role="dialog"
    aria-labelledby="popupDeliveryPersonal"
    aria-modal="true"
    :class="{active : this.modalActive.popupDeliveryPersonal}"
  >
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3>고객부담금액</h3>
        </div>
        <div class="layer-content">
          <p class="mb10">취소/반품/교환으로 인하여 최종 결제 금액이 무료배송 및 쿠폰적용기준 미충족 시 고객부담금이 발생합니다.</p>
          <p class="mb10">
            <strong class="point">취소/반품/교환</strong> 사유에 따라 반품배송비가 부과될 수 있습니다.
          </p>
        </div>
      </div>
      <button
        class="btn-layer-close"
        @click="popupAction"
        @keydown.9="tabFocusRemove('popupAction')"
        aria-label="포커스 아웃 시 팝업 닫기"
      >
        <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 고객부담금액 -->
  <!-- 4월 수정 END : 문구 수정 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: 'PopupDeliveryPersonal',
  data() {
    return {};
  },
  mixins: [LayerPopupMixin],
  components: {},
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupDeliveryPersonal');
      this.modalActiveEvent('popupDeliveryPersonal');
    },
  },
  mounted() {
    this.modalActiveEvent('popupDeliveryPersonal');
  },
};
</script>
