<template>
  <!-- START : 날짜 선택 레이어 -->
  <div id="popupPeriodCalendar" class="wrap-layer datepicker-layer" role="dialog" aria-labelledby="popupPeriodCalendar" aria-modal="true" :class="[{active : this.modalActive.popupPeriodCalendar}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title">
        <h3>날짜 선택</h3>
      </div>
      <div class="layer-content">
        <div class="inner-box">
          <div class="datepicker-area">
            <p class="select-date">
              <span class="date-tit">선택일자 :</span>
            </p>
            <Calendar :initDate="this.initDate.date" :initDay="this.initDate.day" @changeDeliveryEvent="changeDeliveryAction"/>
          </div>
        </div>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg lightgreen" @click="selectAction">선택</button>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 날짜 선택 레이어 -->
</template>

<script>
import Calendar from '@/components/common/Calendar';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupPeriodCalendar",
  props: ['type', 'initDate'],
  data() {
    return {
      selectDate: this.initDate.date, // 캘린더의 디폴트 날짜
      selectDay: this.initDate.day, // 캘린더의 디폴트 요일
      selectedOptionActive: -1,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
    Calendar,
  },
  methods: {
    changeDeliveryAction(date, day) { // 캘린더의 새롭게 선택된 값 저장
      this.selectDate = date;
      this.selectDay = day;
    },
    selectAction() { // 선택버튼 완료 시 값 저장
      const date = {
        date: this.selectDate,
        day: this.selectDay,
      };
      this.$emit('calendarChange', this.type, date);
      this.popupAction();
    },
    popupAction() {
      this.$emit('popupEvent', 'popupPeriodCalendar');
      this.modalActiveEvent('popupPeriodCalendar');
    },
  },
  mounted() {
    this.modalActiveEvent('popupPeriodCalendar');
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
