<!--
views/od/SC-FO-OD-GS-MP-007
-->
<template>
  <!-- START : 날짜 선택 레이어 -->
  <div id="popupDateSelect" class="wrap-layer datepicker-layer" role="dialog" aria-labelledby="popupDateSelect" aria-modal="true" :class="[{active : this.modalActive.popupDateSelect}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title"><h3>도착 예정일 선택</h3></div>
      <div class="layer-content">
        <div class="inner-box">
          <div class="datepicker-area">
            <p class="select-date">
              <span class="date-tit">선택일자 :</span>
            </p>
            <Calendar :initDate="selectDate" :initDay="selectDay" @changeDeliveryEvent="changeDeliveryAction" :disabledDates="disabledDates" v-if="isComplete"/>
          </div>
        </div>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg lightgreen" @click="selectDelivDt">선택</button>
      </div>
      <button class="btn-layer-close" @click="popupAction">
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 날짜 선택 레이어 -->
</template>

<script>
import Calendar from '@/components/common/Calendar';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import DateUtils from '@/common/DateUtils';
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  props: {
    delivDt: String,
    bskt: Object
  },
  name: "PopupDateSelect",
  data() {
    return {
      selectDate: '2020-02-10 (월)', // 캘린더의 디폴트 날짜
      selectDay: '', // 캘린더의 디폴트 요일
      selectedOptionActive: -1,
      disabledDates: {
        to: new Date(),
        days: []
      },
      dt: [],
      isComplete: false,
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
    popupAction() {
      this.$emit('popupEvent', 'popupDateSelect');
      this.modalActiveEvent('popupDateSelect');
    },
    format(date, format) {
      return this.selectDate = DateUtils.format(date, format);
    },
    selectDelivDt() {
      this.$emit('selectDelivDt', DateUtils.format(this.selectDate, 'YYYYMMDD'));
    }
  },
  mounted() {
    this.modalActiveEvent('popupDateSelect');
  },
  async created() {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    startDate.setDate(startDate.getDate() + 4);
    endDate.setDate(endDate.getDate() + 4);
    this.disabledDates.to = startDate;
    this.disabledDates.from = endDate;
    if (!StringUtils.isEmpty(this.bskt.itemStkotInstBeginDt)) {
      this.disabledDates.to = new Date(Number(this.bskt.itemStkotInstBeginDt.substring(0, 4)), Number(this.bskt.itemStkotInstBeginDt.substring(4, 6)) - 1, Number(this.bskt.itemStkotInstBeginDt.substring(6, 8)));
    }

    if (!StringUtils.isEmpty(this.bskt.itemStkotInstEndDt)) {
      this.disabledDates.from = new Date(Number(this.bskt.itemStkotInstEndDt.substring(0, 4)), Number(this.bskt.itemStkotInstEndDt.substring(4, 6)) - 1, Number(this.bskt.itemStkotInstEndDt.substring(6, 8)) + 1);
    }

    if (this.bskt.resvItemYn === 'N' && this.bskt.delivTypeCd === '03') {
      this.disabledDates.days = [0, 1];
    }
    if (!StringUtils.isEmpty(this.bskt.excldApplDowMask)) {
      for (let idx=0; idx<this.bskt.excldApplDowMask.length; idx++) {
        const week = (idx + 1) % 7;
        if ('Y' === this.bskt.excldApplDowMask.charAt(idx)) {
          if (this.disabledDates.days.indexOf(week) === -1) {
            this.disabledDates.days.push(week);
          }
        }
      }
    }
    const iPut = {
     supplFirmCd: this.bskt.supplFirmCd,
      delivTypeCd: this.bskt.delivTypeCd,
      strtDt: this.format(this.disabledDates.to, 'YYYYMMDD'),
      endDt: this.format(this.disabledDates.from, 'YYYYMMDD'),
    };
    const result3 = await ApiUtils.get('/fo/od/bsktmgnt/holiday', iPut);
    this.dt = result3.data.data;
    if (this.dt !== null && this.dt.length > 0) {
      const dates = [];
      for (let idx=0; idx<this.dt.length; idx++) {
        dates.push(new Date(Number(this.dt[idx].dt.substring(0, 4)), Number(this.dt[idx].dt.substring(4, 6)) - 1, Number(this.dt[idx].dt.substring(6, 8))));
      }
      this.disabledDates.dates = dates;
    }
    this.isComplete = true;
    this.selectDate = this.format(this.delivDt, 'YYYY-MM-DD (dd)');
  }
};
</script>
