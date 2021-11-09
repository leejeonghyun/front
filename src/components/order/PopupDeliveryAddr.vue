<template>
  <!-- START : 배송지 변경 안내 레이어 -->
  <div id="popupAddrChange2" class="wrap-layer description-layer addr-change-layer active" role="dialog" aria-labelledby="PopupDeliveryAddr" aria-modal="true">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <h3 class="hidden">배송지 변경 안내</h3>
        <div class="layer-content">
          <div class="txt-caution1">
            <p class="color-gray">입력하신 주소는 배송 권역이 변경되어 상품의 재고 및 행사 정보가 달라질 수 있습니다.</p>
          </div>
          <div class="txt-caution2">
            <p class="ico-alert2">장바구니에서 주문 상품을 다시 확인한 후 주문해 주세요.</p>
          </div>
        </div>
      </div>
      <div class="btn-alert-bottom">
        <button class="btn-cancel" @click="popupAction">취소</button>
        <button class="btn-confirm" @click="goPage">확인</button>
      </div>
    </div>
  </div>
  <!-- END : 배송지 변경 안내 동일권역 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  props: {
      mbrDlvpSeqno: Number,
    },
  name: "PopupDeliveryAddr",
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'PopupDeliveryAddr');
    },
    goPage() {
      this.$emit('bsktMbrDlvp');
    }
  },
  mounted() {
    // this.modalActiveEvent('PopupDeliveryAddr');
  }
};
</script>
