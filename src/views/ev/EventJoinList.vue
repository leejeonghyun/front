<!--
Design: views/ss/SC-FO-SS-GF-MS-716.vue
Pg id: PG-FO-EV-O028 (로그인필수)
Uri: /ev/event_join_list
-->
<template>
  <div class="wrap-mypage event" :class="siteClass">
    <!-- START : Header -->
    <SubDefaultHeader headerText="이벤트 참여 현황"/>
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
    <!-- START : 상품목록 탭 -->
    <!--  <nav>
        <div class="wrap-searchresult tab-default">
          <ul class="scroll-area-x">
            <li>
              <button type="button" id="tab-all" aria-controls="tab-all-contents" @click="tabAction('all')" :class="{active : this.naviTab.all}">
                <strong>전체</strong>
              </button>
            </li>
            <li v-for="item in mallData" :key="item.mallId">
              <button :id="`tab-`+item.mallId" aria-controls="tab-contents-gsfresh" @click="tabAction(item.mallId)" :class="{active : item.isActive}">
                <strong role="heading" aria-level="2">{{item.mallNm}}</strong>
              </button>
            </li>
          </ul>
        </div>
      </nav> -->
      <!-- END : 상품목록 탭 -->
      <!-- START : 이벤트 참여 현황 콘텐츠 -->
      <div class="wrap-tab-content" ref="tabContents">
        <div id="tab-all-contents" class="tabcontents" aria-labelledby="tab-all">
          <!-- START :이벤트 참여 여부 탭 -->
          <div class="tab-list">
            <ul class="tablist">
              <li>
                <button type="button" id="tab-possible" aria-controls="tab-possible-contents" @click="tabActionEvent('possible')" :class="{active : this.eventTab.possible}">
                  <strong>참여가능</strong>
                </button>
              </li>
              <li>
                <button type="button" id="tab-end" aria-controls="tab-end-contents" @click="tabActionEvent('end')" :class="{active : this.eventTab.end}">
                  <strong>참여완료</strong>
                </button>
              </li>
            </ul>
          </div>
          <!-- END : 이벤트 참여 여부 탭 -->
          <!-- START : 이벤트 참여가능 콘텐츠 -->
          <div id="tab-possible" class="tabcontents" aria-labelledby="tab-possible" v-show="eventTab.possible">
            <div class="wrap-mylist" v-if="eventJoinList.length>0">
              <ul class="list-type01 event">
                <li v-for="(eventData,index) in eventJoinList" v-bind="eventData" v-bind:key="index" v-show="pageCtn.eventCount > index">
                  <div class="list-type01-inner">
                  <div class="list-type01-header" v-if="false">
                    <p class="txt-state">참여완료</p>
                    <p class="wrap-label" v-if="true">
                      <i class="ico-label" v-if="true">미당첨</i>
                      <i class="ico-label red" v-if="false">당첨</i>
                    </p>
                    <p class="txt-data" v-if="false"><span>당첨자 발표 전</span></p>
                  </div>
                  <div class="wrap-title">
                    <p class="title">{{eventData.eventNm}}</p>
                    <p class="date">
                      <span>이벤트 기간 :</span> <span>{{getDate(eventData.eventBeginDttm,'YYYY.MM.DD')}} ~ {{getDate(eventData.eventEndDttm, 'YYYY.MM.DD')}}</span>
                    </p>
                  </div>
                  <p class="usedtype">
                    <span>{{eventData.mallNm}}</span>
                  </p>
                  <a href="javascript:void(0);" @click="getUrl(eventData.mallId, eventData.eventId)" class="btn-border"><span>참여하기</span></a>
                </div>
                </li>
              </ul>
            </div>
            <div v-else>
              <NoList :ListType="'reviewList'" SearchText="" NoListText="이벤트 내역이 없습니다." v-if="isLoaded.possible && eventJoinList.length <= 0"/>
            </div>
            <div class="btn-more-detail-view" v-if="eventJoinList.length > pageChk('eventCount')">
              <button class = "btn-border" aria-label="이벤트">
                <span aria-live="assertive" aria-atomic="true" @click="pagePlus('eventCount')">더보기</span>
              </button>
            </div>
          </div>
          <!-- END : 이벤트 참여가능 콘텐츠 -->
          <!-- START : 이벤트 종료 콘텐츠 -->
          <div id="tab-end" class="tabcontents" aria-labelledby="tab-end" v-show="this.eventTab.end">
            <div class="period-details">
              <fieldset>
                <legend>이벤트 참여완료 기간조회</legend>
                <div class="term">
                  <button type="button" v-for="(month, index) in months" :key="month" class="btn-border" :class="{showing: active == index}" @click="activeMonth(index,month)" aria-live="assertive" aria-atomic="true">{{month}}</button>
                </div>
                <div class="term-calendar">
                  <button class="btn-calendar" aria-haspopup="dialog" title="조회기간 시작날짜 선택 팝업활성화" @click="calendarOpen('start')">
                    <span aria-label="조회기간 시작날짜">{{this.period.start.date}}</span>
                  </button>
                  <code class="ico-period">~</code>
                  <button class="btn-calendar" aria-haspopup="dialog" title="조회기간 끝나는 날짜 선택 팝업활성화" @click="calendarOpen('end')">
                    <span aria-label="조회기간 끝나는 날짜">{{this.period.end.date}}</span>
                  </button>
                </div>
                <button class="btn-md btn-bg darkgray" @click="retrieveEndEventList">조회</button>
              </fieldset>
            </div>
            <div class="wrap-mylist">
              <!-- START : 이벤트 참여완료 목록 -->
              <ul class="list-type01 event">
                <div v-if="endEventJoinList.length > 0">
                  <li v-for="(endEventData,index) in endEventJoinList" v-bind="endEventData" v-bind:key="index" v-show="pageCtn.endCount > index">
                    <div class="list-type01-inner">
                      <div class="list-type01-header" v-if="true">
                        <p class="txt-state">참여완료</p>
                        <p class="wrap-label" v-if="endEventData.winResult == '3' || endEventData.winResult == '4'">
                          <i class="ico-label" v-if="endEventData.winResult=='4'">미당첨</i>
                          <i class="ico-label red" v-if="endEventData.winResult=='3'">당첨</i>
                      </p>
                      <p class="txt-data" v-if="endEventData.winResult=='2'"><span>당첨자 발표 전</span></p>
                      </div>
                      <div class="wrap-title">
                        <p class="title" @click="expsrYn(endEventData.eventExpsrYn, endEventData.eventId)">{{endEventData.eventNm}}</p>
                        <p class="date">
                          <span>이벤트 기간 :</span> <span>{{getDate(endEventData.eventBeginDttm,'YYYY.MM.DD')}} ~ {{getDate(endEventData.eventEndDttm, 'YYYY.MM.DD')}}</span>
                        </p>
                      </div>
                      <p class="usedtype">
                        <span>{{endEventData.mallNm}}</span>
                      </p>
                      <gs-link :to="`/ev/event_winner/`+endEventData.eventId" class="btn-border" v-if="endEventData.winBtn=='Y'"><span>당첨자 발표</span></gs-link>
                    </div>
                  </li>
                </div>
                <div v-else>
                  <NoList :ListType="'reviewList'" SearchText="" NoListText="이벤트 내역이 없습니다." v-if="isLoaded.end && endEventJoinList.length <= 0">
                    <gs-link to="/ev/event_list" slot="button" class="btn-border" title="상품평 등록하기">이벤트 참여하기</gs-link>
                  </NoList>
                </div>
                <div class="btn-more-detail-view" v-if="endEventJoinList.length > pageChk('endCount')"><!-- 4월 수정 : 더보기 버튼 추가 class명 변경 -->
                  <button class = "btn-border" aria-label="쿠폰더보기">
                    <span aria-live="assertive" aria-atomic="true" @click="pagePlus('endCount')">더보기</span>
                  </button>
                </div>
              </ul>
              <!-- END : 이벤트 참여완료 목록 -->
            </div>
          </div>
          <!-- END : 이벤트 종료 콘텐츠 -->
        </div>
      </div>
      <!-- END : 이벤트 참여 현황 콘텐츠 -->
    </main>
    <Footer/>
    <PopupPeriodCalendar :type="period.selected.type" :initDate="period.selected.changingDate" @calendarChange="calendarChange" @popupEvent="popupAction" v-if="popup.popupPeriodCalendar"/> <!-- 팝업 - 기간조회 -->
    <Loading v-show="loading > 0" />
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer';
import AccordionMixin from '@/mixins/AccordionMixin';
import NoList from '@/components/common/NoList';
import ApiUtils from '@/common/ApiUtils';
import PopupPeriodCalendar from '@/views/ev/PopupPeriodCalendar'; // 팝업 - 기간조회
import DateUtils from '@/common/DateUtils';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import CookieUtils from '@/common/CookieUtils';
import Loading from '@/components/common/Loading';

export default {
  name: "MyPageEvent",
  mixins: [AccordionMixin],
  metaInfo() {
    return {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '이벤트 참여 현황 < 마이페이지 < %s',
      meta: [
        {
          property: 'aa:page',
          content: '이벤트 참여 현황',
        },
      ],
    };
  },
  components: {
    SubDefaultHeader,
    Footer,
    NoList,
    PopupPeriodCalendar,
    Loading,
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      isLoaded: {
        possible: false,
        end: false,
      },
      naviTab: {
       all: true,
       gsfresh: false,
       dalisalda: false,
       daybreak: false,
       simplycook: false,
      },
      eventTab: {
       possible: true,
       end: false,
      },
      mallData: [],
      eventJoinList: [],
      endEventJoinList: [],
      evtInqInDto: {
        mallId: CookieUtils.getMallId(),
        // [202017P] 2020.11.30 사용가능쿠폰목록조회 Market For 커머스사이트Id 추가-시작
        cmmSteId: CookieUtils.getCmmSteId(),
        // [202017P] 2020.11.30 사용가능쿠폰목록조회 Market For 커머스사이트Id 추가-종료
      },
      months: ['1개월', '3개월', '6개월'],
      selectedMonths: '1개월', // default = 15일
      period: {
        selected: {
          type: 'start',
          changingDate: {},
        },
        start: {
          date: DateUtils.subtract(DateUtils.getToday(), 1, 'months'),
          day: DateUtils.format(DateUtils.subtract(DateUtils.getToday(), 1, 'months'), 'dd'),
        },
        end: {
          date: DateUtils.getToday(),
          day: DateUtils.format(new Date(), 'dd'),
        },
      },
      active: 0,
      popup: {
        open: false,
        popupPeriodCalendar: false, // 팝업 - 기간조회
      },
      pageCtn: {
        endCount: 10,
        eventCount: 10,
      },
      loading: 0,
    };
  },
  methods: {
    getUrl(mallId, eventId) {
      if (CookieUtils.getCmmSteId() == "3") {// 마켓포일때
        if (mallId.split(",").filter(i => parseInt(i) > 300 && parseInt(i) < 400).length > 0) {
          this.$router.push('/ev/event/'+eventId);
        } else {
          this.$gsdialog.alert("해당 사이트에서는 미진행되는 이벤트입니다.");
          return;
        }
      } else if (CookieUtils.getCmmSteId() == "1") {// gsfresh 일때, 심플리쿡 일때
        if (mallId.split(",").filter(i => parseInt(i) == "1").length > 0) {// mallId 1 이면 gsfresh몰
          this.$router.push('/ev/event/'+eventId);
        } else if (mallId.split(",").filter(i => parseInt(i) == "20").length > 0) { // 20이면 심플리쿡
          this.$router.push('/ev/event/'+eventId);
        } else {
          this.$gsdialog.alert("해당 사이트에서는 미진행되는 이벤트입니다.");
          return;
        }
      } else if (CookieUtils.getCmmSteId() == "2") {// 달리살다 일때
        if (mallId.split(",").filter(i => parseInt(i) == "11").length > 0) {
          this.$router.push('/ev/event/'+eventId);
        } else {
          this.$gsdialog.alert("해당 사이트에서는 미진행되는 이벤트입니다.");
          return;
        }
      }
    },
    // 상품목록 탭
    tabAction(type) {
      for (let i = 0; i < Object.keys(this.naviTab).length; i++) {
        this.naviTab[Object.keys(this.naviTab)[i]] = false;
      }
      this.naviTab[type] = true;
      for (let i = 0; i < this.mallData.length; i++) {
        if (type === this.mallData[i].mallId) {
          this.mallData[i].isActive = true;
        } else {
          this.mallData[i].isActive = false;
        }
      }
      if (type === 'all') {
        this.activeTab = true;
        this.evtInqInDto.mallId = '';
      } else {
        this.activeTab = false;
        this.evtInqInDto.mallId = type;
      }
      this.isLoaded.possible = false;
      this.isLoaded.end = false;
      this.tabActionEvent('possible');
    },
    tabActionEvent(type) {
      for (let i = 0; i < Object.keys(this.eventTab).length; i++) {
        this.eventTab[Object.keys(this.eventTab)[i]] = false;
      }
      this.eventTab[type] = true;
      if (!this.isLoaded.possible && this.eventTab['possible']) {
        this.retrieveEventList();
      } else if (!this.isLoaded.end && this.eventTab['end']) {
        this.retrieveEndEventList();
      }
    },
    retrieveEventList() {
      this.loading++;
      ApiUtils.get('/fo/ev/eventmgnt/participation-possible-event-list', this.evtInqInDto)
      .then(res => {
        this.isLoaded.possible = true;
        if (res.data && res.data.success && res.data.data) {
          this.eventJoinList = res.data.data.eventList;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      }).finally(() => {
        this.loading--;
      });
    },
    retrieveEndEventList() {
      const param = {
        eventBeginDttm: this.period.start.date,
        eventEndDttm: this.period.end.date,
        mallId: this.evtInqInDto.mallId,
        cmmSteId: CookieUtils.getCmmSteId(),
      };
      this.loading++;
      ApiUtils.get('/fo/ev/eventmgnt/end-event-list', param)
      .then(res => {
        this.isLoaded.end = true;
        if (res.data && res.data.success && res.data.data) {
          this.endEventJoinList = res.data.data.eventList;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      }).finally(() => {
        this.loading--;
      });
    },
    mallList() {
      this.loading++;
      ApiUtils.get('/fo/ev/common/mall-list')
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          this.mallData = res.data.data;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      }).finally(() => {
        this.loading--;
      });
    },
    activeMonth(idx, month) { // 기간 조회 버튼 활성화 변경
      this.selectedMonths = this.months[idx];
      if (this.active !== idx) {
        this.active = idx;
      }
      const monthly = month.match(/[0-9]/g, '').join().replace(',', '');
      this.period.start.date = DateUtils.subtract(this.period.end.date, monthly, 'months');
    },
    calendarChange(type, newDate) { // 달력 팝업으로 변경된 날짜 저장
      this.period[type].date = newDate.date;
    },
    calendarOpen(type) { // 달력 팝업 활성화 type: 'start' / 'end'
      this.period.selected.type = type;
      this.period.selected.changingDate = this.period[type];
      this.popupAction('popupPeriodCalendar');
    },
    popupAction(type) { // 팝업 활성/비활성
      this.popup.open = !this.popup.open;
      this.popup[type] = !this.popup[type];
    },
    getDate (date, format) {
      return DateUtils.format(date, format);
    },
    expsrYn: function(eventExpsrYn, eventId) {
      if (eventExpsrYn == "Y") {
        this.$router.push('/ev/event/' + eventId);
      } else {
        this.$gsdialog.alert("이벤트가 종료되었습니다.");
      }
    },
    pagePlus(page) {
      this.pageCtn[`${page}`] = this.pageCtn[`${page}`] + 10;
    },
    pageChk(page) {
      return this.pageCtn[`${page}`];
    },
  },
  mounted() {
    this.mallList();
    this.retrieveEventList();
  },
  updated() {
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
