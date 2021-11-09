<template>
  <div id="popupWineReservehistory" class="wrap-full-popup" role="dialog" aria-modal="true">
    <div class="header-popup">
      <strong>예약완료 내역</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
       <div class="wrap-reserve-panel wrap-wine25-section">
        <h2 class="h-title"><strong>예약완료</strong></h2>
        <div class="area-statement">
          <em class="heading">예약번호</em><strong>20190112584</strong>
          <em class="heading">전화번호</em><strong>2019.09.01</strong>
          <em class="heading">전화번호</em><strong>역삼 GS 타워점</strong>
        </div>
        <p class="area-desc">
          오전 11시 이전 예약 시 당일 오후 6시부터 수령 가능합니다.<br />
          (오전 11시 이후 예약 건은 다음날 오후 6시부터 수령 가능)<br />
          <em class="essential">일요일</em> 또는 <em class="essential">공휴일</em> 건은 당일 수령 불가<br />
          수령은 입고 후 3일 내 가능하며, 기간 내 미수령 시 자동 취소
        </p>
        <p class="area-desc">와인당일배송 예약은 시범 운영기간 동안, <em class="essential">강남구, 서초구, 송파구 지역 GS25 한정</em>하여 운영합니다.</p>
        <h2 class="h-title">
          <strong>예약상품</strong>
          <em class="h-sub-title">총 <span class="essential">4</span>건 (<span class="essential">10</span>병)</em>
        </h2>
        <div class="wrap-wine-reserved-list" :class="`type-${type}`">
          <WineProductReserved />
          <WineProductReserved />
        </div>
        <div class="area-total-price">
          <strong class="title">최종 예약 금액</strong>
          <span class="price"><em>59,230,000</em>원</span>
        </div>
       </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import WineProductReserved from '@/wine25/components/WineProductReserved'; // 예약목록
export default {
  name: "PopupWineReservationDoneList",
  mixins: [LayerPopupMixin],
  components: {
    WineProductReserved,
  },
  data() {
    return {
      type: 'desc', // 예약목록 타입 desc(상품설명), option(상품설명 + 수량 수정),
    };
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupWineReservehistory');
      this.modalActiveEvent('popupWineReservehistory');
    },
  },
  mounted() {
    this.modalActiveEvent('popupWineReservehistory');
  }
};
</script>

<style>

</style>
