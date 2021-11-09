<template>
  <div id="popupWineInfo" class="wrap-wine25-info" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupWineInfo}">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="wine25-info-title">
          <h3>와인 예약 안내</h3>
          <p class="desc"><strong class="essential">오전 11시</strong>까지 예약하면<br/>당일 <strong class="essential">오후 6시</strong>부터 수령 가능합니다</p>
        </div>
        <ul class="wine25-info-list icon-list">
          <li class="icon time">
            <strong>와인예약 점포선택</strong>
            <span>11:00</span>
          </li>
          <li class="icon reciept">
            <strong>바코드 문자수신</strong>
            <span>18:00</span>
          </li>
          <li class="icon store">
            <strong>점포 결제 후 수령</strong>
            <span>18:00</span>
          </li>
        </ul>
        <ul class="wine25-info-list txt-list">
          <li>
            오전 11시 이전 예약 시 당일 오후 6시부터 수령 가능합니다.<br />
            (오전 11시 이후 예약 건은 다음날 오후 6시부터 수령 가능)<br />
            <strong class="essential">일요일</strong> 또는 <strong class="essential">공휴일</strong> 예약 건은 당일 수령 불가<br />
            수령은 입고 후 3일 내 가능하며, 기간 내 미수령 시 자동 취소
          </li>
          <li>
            와인당일배송 예약은 시범 운영기간 동안 <strong class="essential">강남구, 서초구, 송파구 지역 GS25 한정</strong>하여 운영합니다.
            <!-- <ul class="wine25-info-list txt-list-inner">
              <li>일요일 공휴일 주문은 평일~토요일 수령 가능</li>
              <li>기간 내 미수령 시 자동 취소</li>
            </ul> -->
          </li>
          <li>
            와인 가격은 오늘자 기준입니다
          </li>
        </ul>
        <p class="wine25-copyright"><span>GS리테일</span></p>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기">
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "PopupWineInfo",
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupWineInfo');
      this.modalActiveEvent('popupWineInfo');
    },
  },
  mounted() {
    this.modalActiveEvent('popupWineInfo');
  }
};
</script>
