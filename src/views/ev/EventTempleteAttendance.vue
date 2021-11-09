<!--
views/ev/SC-FO-EV-GF-MS-004.vue
-->
<!-- 출석체크 이벤트 -->
<template>
  <section class="event-cont event-checkin">
    <div class="wrap-daily-cal">
      <div class="daily-cal">
        <div class="msg" v-show="!todayCheckIn && eventInfo.entryPeriod">
          <img src="@/assets/images/img/img_event_checkin_msg.png" alt="달력을 터치해주세요!" />
        </div>
        <img src="@/assets/images/img/img_event_checkin_daily_cal.png" alt="달력 배경" />
        <div class="inner">
          <p class="month">
            <span class="num">{{ eventMonth }}</span>
            <span class="txt">월</span>
          </p>
          <button type="button" class="page tear" @click="onEntry" ref="calenderBtn" v-if="!todayCheckIn">
            <span class="inner">
              <span class="date">
                <em class="num">{{ eventDay }}</em>
                <span class="txt">일</span>
              </span>
            </span>
          </button>
          <div class="page complete">
            <span class="inner">
              <span class="date">
                <em class="num">{{ eventDay }}</em>
                <span class="txt">일</span>
                <span class="state">출석완료!</span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="event-checkin-complete" v-if="todayCheckIn && winGvwyCnt > 0">
        <div class="checkin-complete-txt">
          <em class="italic">축 당첨!</em>
          <div class="event-complete-info" v-if="this.eventWinGvwyList.eventWinGvwyList1.length > 0">
            <p v-for="(gvwy, key) in this.eventWinGvwyList.eventWinGvwyList1" :key="`winGvwy1`+key"><span class="bold">{{gvwy.promNm}} 당첨</span></p>
            <div class="info">쿠폰은 MY페이지> 내쿠폰함에서 확인 가능하십니다.</div>
          </div>
          <div class="event-complete-info" v-if="this.eventWinGvwyList.eventWinGvwyList2.length > 0">
            <p v-for="(gvwy, key) in this.eventWinGvwyList.eventWinGvwyList2" :key="`winGvwy2`+key">{{gvwy.commCdNm}} <span class="bold">{{toComma(gvwy.gvwyApplVal)}}P 적립</span></p>
          </div>
          <div class="event-complete-info" v-if="this.eventWinGvwyList.eventWinGvwyList3.length > 0">
            <p v-for="(gvwy, key) in this.eventWinGvwyList.eventWinGvwyList3" :key="`winGvwy3`+key">{{gvwy.commCdNm}} <span class="bold">{{toComma(gvwy.gvwyApplVal)}}원 적립</span></p>
          </div>
          <div class="event-complete-info" v-if="this.eventWinGvwyList.eventWinGvwyList4.length > 0">
            <p v-for="(gvwy, key) in this.eventWinGvwyList.eventWinGvwyList4" :key="`winGvwy4`+key"><span class="bold">{{gvwy.gvwyApplVal}} 당첨</span></p>
            <div class="info" v-if="winAdrsYn=='N'">배송지를 입력해 주셔야<br />발송이 가능합니다.</div>
            <button class="btn btn-text" @click="onWinGvwyAddr()" v-if="winAdrsYn=='N'"><span>배송지 입력하러 가기</span></button>
          </div>
          <div class="event-complete-info" v-if="this.eventWinGvwyList.eventWinGvwyList5.length > 0">
            <p v-for="(gvwy, key) in this.eventWinGvwyList.eventWinGvwyList5" :key="`winGvwy5`+key"><span class="bold">{{gvwy.gvwyApplVal}} 당첨</span></p>
            <div class="info">해당 상품은 카카오 알림톡으로<br />교환권이 발송됩니다.<br />개인정보에 있는 연락처를 확인해주세요.</div>
          </div>
          <div class="event-complete-info" v-if="this.eventWinGvwyList.eventWinGvwyErrMsg">
            <div class="info">{{this.eventWinGvwyList.eventWinGvwyErrMsg}}</div>
          </div>
        </div>
      </div>
      <div class="wrap-state" v-html="attdMsg"></div>
    </div>
    <div class="wrap-calendar">
      <datepicker
        v-model="initDate"
        inline
        :format="format"
        :disabledDates="disabledDates"
        :language="language"
        maximum-view="day"
        :highlighted="checkedDay"
        @changedYear="changedYear"
        @changedMonth="changedMonth"
      ></datepicker>
    </div>
  </section>
</template>

<script>
/*
1. 이벤트기간 내로만 캘린더가 움직일 수 있다...
2. 오늘날짜(년,월) 이 이벤트기간(년,월) 을 넘으면 캘린터의 날짜는 이벤트기간 마지막날로 셋팅한다.
*/
import Datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import JwtUtils from '@/common/JwtUtils';
import CookieUtils from '@/common/CookieUtils';
import dayjs from 'dayjs';

export default {
  name: 'EventTempleteAttendance',
  components: {
    Datepicker,
  },
  props: {
    fnRedirect: Function,
    eventInfo: Object,
    fnEntry: Function,
    setDesabledEntry: Function,
    popupEvent: Function,
    winGvwyCnt: Number,
    setWinGvwyCnt: Function,
    eventWinGvwyList: Object,
    setEventWinGvwyList: Function,
    setWinGvwyAdrsSeqnoList: Function,
  },
  data() {
    return {
      // START : 출석 체크 전용
      initDate: (DateUtils.format(dayjs(this.eventInfo.eventEndDttm), 'YYYYMMDD') < DateUtils.format(dayjs(), 'YYYYMMDD')) ? dayjs(this.eventInfo.eventEndDttm).$d : dayjs().$d,
      eventYear: DateUtils.format(dayjs(), 'YYYY'),
      eventMonth: DateUtils.format(dayjs(), 'MM'),
      eventDay: DateUtils.format(dayjs(), 'DD'),
      eventLastDay: DateUtils.format(this.eventInfo.eventPeriodDay, 'DD'),
      format: 'yyyy-MM-dd',
      language: {
        language: 'Korean',
        months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthsAbbr: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
        ],
        days: ['일', '월', '화', '수', '목', '금', '토'],
        ymd: !0,
        yearSuffix: '.',
      },
      disabledDates: {
        // 캘린더 기간
        from: dayjs(this.eventInfo.eventEndDttm).$d,
        to: dayjs(this.eventInfo.eventBeginDttm).$d,
      },
      checkedDay: {
        // 출석체크한 날짜 표시
        dates: [],
        includeDisabled: true,
        totalEntryDays: new Set(),
      },
      // END : 출석 체크 전용
      winAdrsYn: 'Y',
      todayCheckIn: false,
      attdMsg: '',
    };
  },
  async created() {
  },
  methods: {
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    changedYear() { // Datepicker 에서 년도가 변경된 경우 시작
    },
    changedMonth(date) { // Datepicker 에서 월이 변경
      if ((this.eventYear+"-"+this.eventMonth) != DateUtils.format(date, 'YYYY-MM')) {}
      return false;
    },
    // START : 출석 체크
    async onEntry(e) {
      if (this.isLogin()) {
        if (!this.todayCheckIn) {
          this.$emit('fnEntry'); // 이벤트응모 호출
        }
      } else {
        this.$gsdialog.alert('로그인이 필요합니다.')
        .then(e => {
          this.$emit('fnRedirect', "login");
        });
      }
    },
    // END : 출석 체크
    // START : 응모 성공 (필수)
    async fnEntrySuccess(res) {
      if (res.data && res.data.success && res.data.data && res.data.data.length > 0 && !res.data.data[0].errorCode) {
        const el = this.$refs.calenderBtn;
        el.classList.add('checkin');
        const elMsg = el.parentElement.parentElement.querySelector('.msg');
        elMsg.classList.add('hide');
        this.checkedDay.dates.push(dayjs().$d);
        this.checkedDay.totalEntryDays.add(dayjs().$d);
        this.attendanceMsg();
        setTimeout(() => { // 달력 떨어지는 모션 후 당첨 내역 오픈
          this.winAdrsYn = "N";
          this.todayCheckIn = true;
        }, 800);
      }
    },
    // END : 응모 성공 (필수)
    onWinGvwyAddr() {
      this.$emit('popupEvent', 'popupEventGvwyAddr');
    },
    attendanceMsg() {
      if (!this.eventInfo.entryPeriod) {
        this.attdMsg = "<strong>응모기간이 아닙니다.</strong>";
      } else {
        if (this.isLogin()) {
          this.attdMsg = "출석 현황 <span>" + this.eventInfo.eventPeriodDay + "회 중</span> <strong>" + this.checkedDay.totalEntryDays.size + "회 출석 완료</strong>";
        } else {
          this.attdMsg = "로그인 후 참여해주세요.";
        }
      }
    },
  },
  async mounted() {
    // 응모내역조회 호출 (사용자가 체크인한 날짜 조회)
    if (this.isLogin()) {
      this.checkedDay.dates = [];
      this.winAdrsYn = "Y";
      await ApiUtils.get('/fo/ev/eventmgnt/event-entry/' + this.$route.params.eventId)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          const winGvwyAdrsSeqnoList = [];
          const eventWinGvwyList1 = [];
          const eventWinGvwyList2 = [];
          const eventWinGvwyList3 = [];
          const eventWinGvwyList4 = [];
          const eventWinGvwyList5 = [];
          let tempWinGvwyCnt = 0;
          for (let i=0; i < res.data.data.length; i++) {
            const entry = res.data.data[i];
            this.checkedDay.dates.push(dayjs(entry.entryDttm).$d);
            this.checkedDay.totalEntryDays.add(entry.entryDttm.substring(0, 10));
            // 오늘 출석 체크 했는지 여부
            if (DateUtils.format(dayjs(), 'YYYY-MM-DD') == DateUtils.format(entry.entryDttm, 'YYYY-MM-DD')) {
              this.todayCheckIn = true;
              const winGvwy = this.eventInfo.eventGvwyList.find(info => {
                return info.gvwySeqno == entry.gvwySeqno;
              });
              if (winGvwy && entry.eventWinStatCd != '02') {
                tempWinGvwyCnt++;
                if (winGvwy.gvwyTypeCd == "1") {
                  eventWinGvwyList1.push(winGvwy);
                } else if (winGvwy.gvwyTypeCd == "2") {
                  eventWinGvwyList2.push(winGvwy);
                } else if (winGvwy.gvwyTypeCd == "3") {
                  eventWinGvwyList3.push(winGvwy);
                } else if (winGvwy.gvwyTypeCd == "4") {
                  eventWinGvwyList4.push(winGvwy);
                  if (entry.winAdrsYn == "N") {
                    this.winAdrsYn = "N";
                    winGvwyAdrsSeqnoList.push(entry.eventWinSeqno);
                  }
                } else if (winGvwy.gvwyTypeCd == "5") {
                  eventWinGvwyList5.push(winGvwy);
                }
              }
            }
          }
          this.attendanceMsg();
          this.$emit('setWinGvwyCnt', tempWinGvwyCnt);
          this.$emit('setWinGvwyAdrsSeqnoList', winGvwyAdrsSeqnoList);
          this.$emit('setEventWinGvwyList', {
            "eventWinGvwyList1": eventWinGvwyList1,
            "eventWinGvwyList2": eventWinGvwyList2,
            "eventWinGvwyList3": eventWinGvwyList3,
            "eventWinGvwyList4": eventWinGvwyList4,
            "eventWinGvwyList5": eventWinGvwyList5,
          });
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    }
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
