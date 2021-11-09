<template>
  <!-- START : 쿠폰 변경 안내 레이어 -->
  <div id="PopupDelvCartCpnChange" class="wrap-layer description-layer addr-change-layer active" role="dialog" aria-labelledby="PopupDelvCartCpnChange" aria-modal="true">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner" v-if="popName === 'duplCpn'">
      <div class="inner-box">
        <h3 class="hidden">쿠폰 변경 안내</h3>
        <div class="layer-content">
          <div class="txt-caution1">
            <p class="color-gray">해당 쿠폰은 다른 상품에 이미 적용 중입니다. 해제 후 상품에 적용하시겠습니까?</p>
            <p class="color-gray">[기존 적용 배송건]</p>
          </div>
          <div class="txt-caution2">
            <p class="ico-alert2">{{bOptDlfeeCpnList.ordsItemInfoList[0].itemNm}} 외 {{bOptDlfeeCpnList.ordsItemInfoList.length-1}} 개 <span>{{bOptDlfeeCpnList.delivDlfee}}원</span></p>
          </div>
        </div>
      </div>
      <div class="btn-alert-bottom">
        <button class="btn-cancel" @click="cancleCpn">취소</button>
        <button class="btn-confirm" @click="changeCpn">확인</button>
      </div>
    </div>
    <div class="layer-inner" v-if="popName === 'freeGift'">
      <div class="inner-box">
        <h3 class="hidden">쿠폰 변경 안내</h3>
        <div class="layer-content">
          <div class="txt-caution1">
            <p class="color-gray">장바구니 쿠폰을 적용해서 할인 받으면  구매금액대별 사은품이 변경되거나 받을 수 없습니다. 쿠폰 할인을 적용하시겠습니까?</p>
          </div>
        </div>
      </div>
      <div class="btn-alert-bottom">
        <button class="btn-cancel" @click="cancleFreeGift">취소</button>
        <button class="btn-confirm" @click="changeFreeGift">확인</button>
      </div>
    </div>
  </div>
  <!-- END : 배송지 변경 안내 동일권역 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
export default {
  props: {
      bOptDlfeeCpnList: Object,
      popName: String,
    },
  name: "PopupDelvCartCpnChange",
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupDelvCartCpnChange');
    },
    async changeCpn() {
      const iOrdsBsktCpnApplProc = {
        ordId: this.bOptDlfeeCpnList.ordId,
        promId: this.bOptDlfeeCpnList.dlfeeCpnPromId,
        isseSeqno: this.bOptDlfeeCpnList.dlfeeCpnIsseSeqno,
        ordsDelivSeqno: this.bOptDlfeeCpnList.ordsDelivSeqno,
      };
      const response = await ApiUtils.put('/fo/od/ordsmgnt/expns-coupon-delete', iOrdsBsktCpnApplProc);
      this.popupAction();
    },
    cancleCpn() {
      this.$emit('cpnSelectCancle', this.bOptDlfeeCpnList.ordsDelivSeqno);
      this.popupAction();
    },
    cancleFreeGift() {
      this.popupAction();
    },
    changeFreeGift() {
      this.$emit('procChangeCpn');
      this.popupAction();
    },
  },
  mounted() {
  }
};
</script>
