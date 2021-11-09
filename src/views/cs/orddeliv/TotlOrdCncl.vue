
<!--
e-커머스 Front(App-공통)  마이페이지  주문배송조회  주문배송목록  SC-FO-SS-GF-MP-860  PG-FO-CS-O006 IF-FO-CS-I108 전체주문취소
TotlOrdCncl
-->
<template>
  <!-- START : 합배송 상품 추가 안내 레이어 -->
  <div id="popupAllCancel" class="wrap-layer description-layer active" role="dialog" aria-labelledby="popupAllCancel" aria-modal="true" :class="{active : this.modalActive.popupAllCancel}">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3>전체주문취소</h3>
        </div>
        <div class="layer-content">
          <p class="pop-txt center"><strong class="txt-em">해당 주문을 전체 취소하시겠습니까?</strong></p>
          <ul class="list-type-dot letter-narrow">
            <li>모든 상품이 결제완료 단계일 경우에만 전체 주문 취소가 가능합니다.</li>
            <li>주문 시 사용하신 장바구니 쿠폰은 재사용 가능합니다. <br>(단 쿠폰 기간에 한함)</li>
            <li>상품 쿠폰은 사라지므로 재 사용시 다시 다운로드 해주시기 바랍니다.</li>
            <li>일부 상품 취소는 배송유형별 주문취소를 이용하여 주세요.</li>
          </ul>
        </div>
      </div>
      <div class="btn-bottom-area">
        <button type="button" class="btn-cancel btn-bg darkgray" @click="popupAction">주문 취소하기</button>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 합배송 상품 추가 안내 레이어 -->
</template>
<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  export default {
    name: "PopupAllCancel",
    data() {
      return {};
    },
    mixins: [LayerPopupMixin],
    methods: {
      popupAction() {
        this.$emit('popupEvent', 'popupAllCancel');
        this.modalActiveEvent('popupAllCancel');
      },
    },
    mounted() {
      this.modalActiveEvent('popupAllCancel');
    }
  };
</script>
