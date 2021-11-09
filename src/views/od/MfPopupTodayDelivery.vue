<!--
views/od/SC-FO-OD-MF-MP-005
-->
<template>
  <!-- START : 추천상품 레이어 -->
  <div id="popupTodayDelivery" class="wrap-layer similarity-list-layer" role="dialog" aria-labelledby="popupTodayDelivery" aria-modal="true" :class="{active : this.modalActive.popupTodayDelivery}">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title"><h3>[ {{supplFirmInfo.mallNm}} ] 상품 더보기</h3></div>
      <div class="layer-content">
        <div class="scroll-area">
          <MfProductImageCart @popupEvent="popupAction" @recommendSubmitAction="recommendSubmitAction" @goItemDetail="goItemDetail" :rcmmdProdList="rcmmdProdList" />
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 추천상품 레이어 -->
</template>

<script>
import MfProductImageCart from '@/components/productTemplete/MfProductImageCart'; // 이미지 장바구니형
import LayerPopupMixin from '@/mixins/LayerPopupMixin';

import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
export default {
  name: "PopupRecommendLayer1",
  props: {
    supplFirmInfo: Object,
    dlfeeInfo: Object
  },
  data() {
    return {
      rcmmdProdList: [] // 추천상품목록
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
    MfProductImageCart,
  },
  methods: {
    popupInnerAction(type) {
      this.$emit('popupEvent', type);
    },
    popupAction() {
      this.$emit('popupEvent', 'popupTodayDelivery');
      this.modalActiveEvent('popupTodayDelivery');
    },
    // 장바구니 담기 처리 함수 호출
    recommendSubmitAction(item) {
      this.$emit('addSimilarity', [{
        ...item, // 추천상품정보
        ordTypeCd: '10', // 주문유형은 일반주문(10)으로 통일
        delivTypeCd: '03', // 배송유형은 업체택배(03)으로 통일
        bsktQty: 1, // 상품수량
        dlfeeId: this.dlfeeInfo.dlfeeId, // 배송비ID
      }], '10', '03');
    },
    // 추천상품 목록 조회
    async getRecommendProductList() {
      const sellAmt = this.dlfeeInfo.freeDelivStandAmt - (this.dlfeeInfo.totItemSprc - this.dlfeeInfo.totItemCpnDcAmt);
      const params = {
        supplFirmCd: this.supplFirmInfo.supplFirmCd, // 공급업체코드
        storId: this.supplFirmInfo.storId, // 매장ID
        mallId: this.supplFirmInfo.mallId, // 몰ID
        dlfeeId: this.dlfeeInfo.dlfeeId, // 배송비ID
        sellAmt: sellAmt > 0 ? sellAmt : 0 // 필요금액
      };
      const result = await ApiUtils.post('/fo/od/mf/bsktmgnt/recommend-product-list', params);
      if (result.data.success) {
        this.rcmmdProdList = result.data.data;
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    // 상품상세 화면 이동 처리 함수
    goItemDetail(bsktItem) {
      this.$emit('goItemDetail', bsktItem);
    },
  },
  destroyed() { },
  mounted() {
    this.modalActiveEvent('popupTodayDelivery');
    // 추천상품 목록 조회
    this.getRecommendProductList();
  },
};
</script>
