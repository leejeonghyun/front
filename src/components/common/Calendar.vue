<template>
  <div class="wrap-calendar">
    <div class="wrap-input-border">
      <input
        type="text"
        id="datepicker"
        title="배송날짜 선택"
        ref="datepicker"
        placeholder="원하시는 배송날짜를 선택해 주세요"
        v-model="setDate"
        @focus="datePickerInputEnter"
        @blur="datePickerInputLeave"
        v-show="false"
      />
      <span v-if="this.selectDay.length">{{selectDate}} {{selectDay}}</span>
    </div>
    <datepicker
      aria-hidden="hidden"
      v-model="selectDate"
      :format="formatter"
      :language="language"
      inline
      :calendarClass="calendarClass"
      :disabledDates="disabledDates"
    />
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import DateUtils from '@/common/DateUtils';
export default {
  name: 'Calendar',
  props: ['initDate', 'initDay', 'disabledDates'],
  data() {
    return {
      selectDate: this.initDate,
      selectDay: this.initDay,
      // format: 'yyyy-MM-dd',
      calendarClass: 'calendar-custom',
      format: 'yyyy-MM-dd (dd)',
      language: {
        language: 'Korean',
        months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthsAbbr: [
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12',
        ],
        days: ['일', '월', '화', '수', '목', '금', '토'],
        ymd: !0,
        yearSuffix: '.',
      },
      /*
      disabledDates: {
        to: new Date(),
        days: [6, 0],
      },
      */
    };
  },
  components: {
    Datepicker,
  },
  computed: {
    setDate: {
      get: function() {
        if (typeof this.selectDate === 'object') {
          return DateUtils.format(this.selectDate, 'YYYY-MM-DD');
        } else {
          return this.selectDate;
        }
      },
      set: function(selectDate) {
        this.selectDate = new Date(selectDate);
      },
    },
  },
  methods: {
    /* UX/UI 파트 에서 모바일에서 인풋 접근 시에 input date 로 사용자가 날짜 선택해서 입력할 수 있게 해달라는 요청 사항이 있었고,
    두번째 요구사항으로 요일이 추가 되었는 데, input date 에는 요일 값을 넣을 수가 없어서 값을 두번 나눠서 담음. */
    formatter(date) {
      this.$emit('changeDeliveryEvent', this.selectDate, this.selectDay);
      this.selectDate = DateUtils.format(date, 'YYYY-MM-DD');
      this.selectDay = DateUtils.format(date, '(dd)');
    },
    datePickerInputEnter() {
      this.$refs.datepicker.setAttribute('type', 'date');
    },
    datePickerInputLeave() {
      if (!this.selectDate.length) {
        this.$refs.datepicker.setAttribute('type', 'text');
      }
    },
  },
};
</script>

<style>
</style>
