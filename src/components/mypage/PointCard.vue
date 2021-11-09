<template>
  <!-- START : GS POINT 레이어 -->
  <div id="popupPointCard" class="wrap-layer pointcard-layer" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupPointCard}">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <h3 class="hidden">GS &amp; POINT</h3>
        <div class="layer-content">
          <div class="barcode-area">
            <strong>GS &amp; POINT</strong>
            <div class="barcode">
              <!-- 1. 바코드 이미지와 숫자 별도로 필요한 경우 -->
              <barcode v-bind:value="barcodeValue" display-value = false></barcode>
              <span class="num-barcode" id = "mainCardNo"></span>
              <!-- 2. 바코드 이미지만 필요한 경우 -->
              <!-- <img src="@/assets/images/img/img_barcode_num.png" class="img-barcode" alt="바코드 이미지"> -->
            </div>
          </div>
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : GS POINT 레이어 -->
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import VueBarcode from 'vue-barcode';
export default {
  name: "PopupPointCard",
  data() {
    return {
       barcodeValue: '',
    };
  },
    components: {
         'barcode': VueBarcode
    },
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupPointCard');
      this.modalActiveEvent('popupPointCard');
    },
    cardNoSubstr(cardNo) {
      return cardNo.substr(0, 4) + " " + cardNo.substr(4, 4) + " " + cardNo.substr(8, 4) + " " + cardNo.substr(12, 4);
    }
  },
  mounted: async function() {
    this.modalActiveEvent('popupPointCard');
    const resultCardInfo = await ApiUtils.get('/fo/cu/mbrmgnt/point-card-information', null); // 회원정보 가져오기
     console.log("포인트카드 조회 " + JSON.stringify(resultCardInfo.data.data));
     if (resultCardInfo.data.data.resultCode == "00000") {
        document.getElementById("mainCardNo").innerText = this.cardNoSubstr(resultCardInfo.data.data.mainCardNo);
        this.barcodeValue = resultCardInfo.data.data.mainCardNo;
     } else {
        this.$gsdialog.alert(resultCardInfo.data.data.resultMessage);
     }
  }
};
</script>
