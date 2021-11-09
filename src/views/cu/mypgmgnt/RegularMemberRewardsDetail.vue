<!--
views/ss/SC-FO-SS-GF-MS-933
-->
<template>
  <div class="wrap-mypage member" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <!-- 수정 START : 2020.02.13 headerText 수정 -->
    <SubDefaultHeader headerText="THE POP 리워즈"/>
    <!-- 수정 END : 2020.02.13 headerText 수정 -->
    <!-- END : 헤더 -->
    <!-- 수정 START : 2020.02.13 bg-gray 클래스 삭제 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
    <!-- 수정 END : 2020.02.13 bg-gray 클래스 삭제 -->
      <!-- 수정 START : 2020.02.13 마크업 변경 -->
      <section class="section-area">
        <h2 class="hidden">정회원 보유, 익월 소멸 포인트</h2>
        <div class="box-point">
          <h3 class="title rewards">THE POP 리워즈</h3>
          <div class="wrap-txt-point">
            <p class="txt-point">
              <!-- 수정 START : 2020.02.17 텍스트 수정 -->
              <span class="num point">{{rwdsTotalPoint}} 점</span>
              <!-- 수정 END : 2020.02.17 텍스트 수정 -->
            <p class="txt-point">
              <!-- 수정 START : 2020.02.17 텍스트 수정 -->
              <span class="label">익월 소멸예정</span>
              <span class="num">{{rwdsExtinctionPoint}} 점</span>
              <!-- 수정 END : 2020.02.17 텍스트 수정 -->
            </p>
          </div>
        </div>
      </section>
      <section class="section-area">
        <h2 class="hidden">정회원 리워즈 포인트 내역</h2>
        <div class="wrap-point">
          <!-- START : tab -->
          <!-- 4월수정 START : UI 변경 -->
          <div class="period-details">
            <fieldset>
              <legend>리워즈 기간조회</legend>
              <div class="term">
                <button type="button" v-for="(month, index) in months" :key="month" class="btn-border" :class="{showing: active == index}" @click="activeMonth(index)" aria-live="assertive" aria-atomic="true">{{month}}</button>
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
              <button class="btn-md btn-bg darkgray" @click="search()">조회</button>
            </fieldset>
          </div>
          <!-- 4월수정 END : UI 변경 -->
          <!-- END : tab -->
          <!-- 수정 : 2020.02.13 selectbox 삭제 -->
        </div>
        <div class="wrap-tab">
          <!-- START : tab -->
          <ul ref="tabList" class="tablist type02">
            <li>
              <button id="tab1" aria-controls="tab1-contents" @click="getTabAction('tab1')" :class="{active: this.tab.tab1}">전체</button>
            </li>
            <li>
              <button id="tab2" aria-controls="tab2-contents" @click="getTabAction('tab2')" :class="{active: this.tab.tab2}">적립 내역</button>
            </li>
            <li>
              <button id="tab3" aria-controls="tab3-contents" @click="getTabAction('tab3')" :class="{active: this.tab.tab3}">사용 내역</button>
            </li>
          </ul>
          <!-- END : tab -->
         <!-- START : tab contents -->
          <div ref="tabContents">
            <div id="tab1-contents" class="tabcontents" aria-labelledby="tab1" v-if="this.tab.tab1">
              <!-- START : 내역이 없을 경우 -->
              <NoList :ListType="'reviewList'" SearchText="" NoListText="리워즈 내역이 없습니다." v-if="rwdsPointListCnt == 0"/>
              <!-- END : 내역이 없을 경우-->
              <ul class="list-point">
                <li
                v-for="rwdsPoint in rwdsPointList"
                v-bind:key="rwdsPoint.num"
                v-bind:rwdsPoint="rwdsPoint">
                  <div class="row">
                    <p class="date">{{ convertFormat(rwdsPoint.rwdDealDt) }}</p>
                    <p class="name"> {{ rwdsPoint.strNm }}</p>
                  </div>
                  <div class="num" v-if="rwdsPoint.savgReward != '0'">+ {{ toCommaCvert(rwdsPoint.savgReward) }} 점</div>
                  <div class="num minus" v-else>{{ toCommaCvert(rwdsPoint.useReward) }} 점</div>
                </li>
              </ul>
            <div id="panel"></div>
            </div>
            <div id="tab2-contents" class="tabcontents" aria-labelledby="tab2" v-if="this.tab.tab2">
               <!-- START : 내역이 없을 경우 -->
              <NoList :ListType="'reviewList'" SearchText="" NoListText="리워즈 내역이 없습니다." v-if="rwdsPointSaveListCnt == 0"/>
              <!-- END : 내역이 없을 경우-->
              <ul class="list-point">
                <li
                v-for="rwdsSavePoint in rwdsPointSaveList"
                v-bind:key="rwdsSavePoint.num"
                v-bind:rwdsSavePoint="rwdsSavePoint">
                  <div class="row">
                    <p class="date">{{ convertFormat(rwdsSavePoint.rwdDealDt) }}</p>
                    <p class="name"> {{ rwdsSavePoint.strNm }}</p>
                  </div>
                  <div class="num">+ {{ toCommaCvert(rwdsSavePoint.savgReward) }} 점</div>
                </li>
              </ul>
            </div>
            <div id="tab3-contents" class="tabcontents" aria-labelledby="tab3" v-if="this.tab.tab3">
              <!-- START : 내역이 없을 경우 -->
              <NoList :ListType="'reviewList'" SearchText="" NoListText="리워즈 내역이 없습니다." v-if="rwdsPointUseListCnt  == 0"/>
              <!-- END : 내역이 없을 경우-->
              <ul class="list-point">
                <li
                v-for="rwdsUsePoint in rwdsPointUseList"
                v-bind:key="rwdsUsePoint.num"
                v-bind:rwdsUsePoint="rwdsUsePoint">
                  <div class="row">
                    <p class="date">{{ convertFormat(rwdsUsePoint.rwdDealDt) }}</p>
                    <p class="name"> {{ rwdsUsePoint.strNm }}</p>
                  </div>
                  <div class="num minus" >{{ toCommaCvert(rwdsUsePoint.useReward) }} 점</div>
                </li>
              </ul>
            </div>
          </div>
          <!-- END : tab contents -->
        </div>
      </section>
      <!-- 수정 START : 2020.02.13 텍스트 수정 -->
      <section class="section-area">
        <h2 class="hidden">THE POP 리워즈 안내</h2>
        <ul class="list-accordion type02">
          <li>
            <button id="info1" class="btn-accordion" aria-controls="info1-contents" aria-expanded="false" @click="accordionEvent">
              THE POP 리워즈 안내
            </button>
            <div id="info1-contents" class="cont-accordion" aria-labelledby="info1" hidden="hidden">
              <ul class="list-info">
                <li>THE POP 리워즈는 THE POP 등급제 혜택이나 이벤트 참여 시 지급해 드리는 보상형 리워즈로 GS리테일 모든 브랜드에서 현금처럼 사용할 수 있습니다.</li>
                <li>리워즈 1점은 현금 1원이며, 상품 구매시 현금처럼 이용하실 수 있습니다.
                상품 반품 시 리워즈는 회수되며, 회수 전 이미 사용하신 리워즈는
                현금으로 보상해주셔야 합니다. </li>
                <li>THE POP 리워즈는 1개월이 경과되면 자동 소멸됩니다.<br/>
                단, 일부 이벤트에 한해서는 사용 기간이 명시된 기준으로 제한될 수
                있습니다.</li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
      <!-- 수정 END : 2020.02.13 텍스트 수정 -->
            <Loading v-show="false" />
    </main>
    <!-- 4월수정 START : 팝업 추가 -->
    <transition name="periodCalendar"
      v-on:beforeEnter="slideupBeforeEnter"
      v-on:enter="slideupEnter"
      v-on:after-enter="slideupEnterAfterEnter"
      v-on:leave="slideupEnterLeave"
    >
      <PopupPeriodCalendar :type="period.selected.type" :initDate="period.selected.changingDate" @calendarChange="calendarChange" @popupEvent="popupAction" v-if="popup.popupPeriodCalendar"/> <!-- 팝업 - 기간조회 -->
    </transition>
    <!-- 4월수정 END : 팝업 추가 -->
    <!-- 4월 수정 START : 푸터 추가 -->
    <Footer />
    <!-- 4월 수정 END : 푸터 추가 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import AccordionMixin from '@/mixins/AccordionMixin';
import NoList from '@/components/common/NoList';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import Loading from '@/components/common/Loading';
import Footer from '@/components/common/Footer'; // 푸터
/* 4월수정 START : 페이지 추가 */
// import PopupPeriodCalendar from '@/views/ss/SC-FO-SS-GF-MP-871'; 팝업 - 기간조회
import PopupPeriodCalendar from '@/views/ss/PopupPeriodCalendar'; // 팝업 - 기간조회
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
/* 4월수정 END : 페이지 추가 */
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "RegularMemberRewardsDetail",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '리워즈 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: 'THE POP 리워즈',
      },
    ],
  },
  components: {
    SubDefaultHeader,
    NoList,
    Loading,
    Footer, // 푸터
    PopupPeriodCalendar,
  },
  data() {
    return {
      toggle: {
       toggle1: true,
       toggle2: false,
       toggle3: false,
       toggle4: false
      },
      tab: {
       tab1: true,
       tab2: false,
       tab3: false
      },
     /* 4월수정 START : 데이터 추가 */
      popup: { // 팝업
        open: false,
        popupPeriodCalendar: false // 팝업 - 기간조회
      },
      months: ['15일', '1개월', '2개월', '3개월'],
      selectedMonths: '15일', // default = 15일
      period: {
        selected: {
          type: 'start',
          changingDate: {}
        },
        start: {
          date: '2020-03-01',
          day: DateUtils.format('2020-03-01', 'dd')
        },
        end: {
          date: DateUtils.format('2020-03-31', 'YYYY-MM-DD'),
          day: DateUtils.format('2020-03-31', 'dd')
        },
      },
      active: 0,
      /* 4월수정 END : 데이터 추가 */
      rwdsPointList: [],
      rwdsPointUseList: [], // 사용포인트
      rwdsPointSaveList: [], // 적립포인트
      rwdsPointDate: -15,
      rwdsTotalPoint: 0,
      rwdsExtinctionPoint: 0,
      rwdsBetweenDiv: 'day',
      rwdsPointListCnt: 0, // 전체내역 리스트 수
      rwdsPointUseListCnt: 0, // 사용포인트 리스트 수
      rwdsPointSaveListCnt: 0, // 적립포인트 리스트 수
      // 더보기
      moreData: true,
      loading: false,
      count: 0,
      pageNo: 1,
      pageSize: 5,
      pageSizeGap: 0,
      totCount: 0,
      PAGE_SIZE: 5,
      siteClass: ''
    };
  },
  computed: {
    // 사용안함
      totalRwdsPoint() {
        let total = 0;
        for (let idx = 0; idx < this.rwdsPointList.length; idx++) {
          total += Number(this.rwdsPointList[idx].usePt) + Number(this.rwdsPointList[idx].rsvPt);
        }
        return total;
      }
    },
  mixins: [AccordionMixin],
  methods: {
    toggleAction(type) { // toggle
      for (let i = 0; i < Object.keys(this.toggle).length; i++) {
        this.toggle[Object.keys(this.toggle)[i]] = false;
      }
      this.toggle[type] = true;
    },
    tabAction(type) { // tab
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.$refs.tabContents.focus();
    },
    /* 4월수정 START : 이벤트 추가 */
    activeMonth(idx) { // 기간 조회 버튼 활성화 변경
      this.selectedMonths = this.months[idx];
      if (this.active !== idx) {
        this.active = idx;
      }
      if (idx == 0) {
        this.period.start.date = DateUtils.format(DateUtils.add(DateUtils.getToday(), -15, 'day'), 'YYYY-MM-DD');
        this.period.end.date = DateUtils.format(DateUtils.getToday(), 'YYYY-MM-DD');
      } else if (idx == 1) {
        this.period.start.date = DateUtils.format(DateUtils.add(DateUtils.getToday(), -1, 'month'), 'YYYY-MM-DD');
        this.period.end.date = DateUtils.format(DateUtils.getToday(), 'YYYY-MM-DD');
      } else if (idx == 2) {
        this.period.start.date = DateUtils.format(DateUtils.add(DateUtils.getToday(), -2, 'month'), 'YYYY-MM-DD');
        this.period.end.date = DateUtils.format(DateUtils.getToday(), 'YYYY-MM-DD');
      } else if (idx == 3) {
        this.period.start.date = DateUtils.format(DateUtils.add(DateUtils.getToday(), -3, 'month'), 'YYYY-MM-DD');
        this.period.end.date = DateUtils.format(DateUtils.getToday(), 'YYYY-MM-DD');
      }
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
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    slideupBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    slideupEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    slideupEnterAfterEnter(el) {
      el.style.opacity = 1;
      el.style.bottom = 0;
      el.focus();
    },
    slideupEnterLeave(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    /* 4월수정 END : 이벤트 추가 */
    getTabAction(type) {
      // this.getGsPointList(DateUtils.format(DateUtils.add(DateUtils.getToday(), between, div), 'YYYYMMDD'));
      // alert(this.pageNo +":::"+this.pageSize);
      this.pageNo = 1;
      this.pageSize = this.PAGE_SIZE * 2;
      // this.handleScroll();
      this.getRwdsPointList(DateUtils.format(this.period.start.date, 'YYYYMMDD'),
                            DateUtils.format(this.period.end.date, 'YYYYMMDD'),
                            this.pageNo,
                            this.pageSize);
      this.tabAction(type);
    },
    toCommaCvert(val) {
     return NumberUtils.toComma(val);
    },
    convertFormat(dt) {
      return DateUtils.format(dt, "YYYY.MM.DD");
    },
    search() {
      //  alert(this.period.end.date +"::::"+this.period.start.date);
    if (DateUtils.format(this.period.start.date, 'YYYYMMDD') > DateUtils.format(this.period.end.date, 'YYYYMMDD')) {
        this.$gsdialog.alert("시작날짜가 종료날짜보다 뒤입니다.<br>날짜를 다시 설정해주세요", {html: true});
        return;
      }
       /*
      if (DateUtils.format(this.period.start.date, 'YYYYMMDD') < DateUtils.format(DateUtils.add(this.period.end.date, -3, 'month'), 'YYYYMMDD')) {
        alert("3개월 단위로 조회 가능합니다.");
        return;
      }
      */
     // this.tabAction('tab1');
      this.pageNo = 1;
      this.pageSize = this.PAGE_SIZE * 2;
      this.getRwdsPointList(DateUtils.format(this.period.start.date, 'YYYYMMDD'),
                            DateUtils.format(this.period.end.date, 'YYYYMMDD'),
                            this.pageNo,
                            this.pageSize
                            );
    },
    getRwdsPointList: async function(startDt, endDt, pgNo, pgSize) {
     const RwdsPntUseSateInqInputDto = {
          srchBeginDt: startDt, // '20180101', //
          srchEndDt: endDt, // DateUtils.format(DateUtils.getToday(), 'YYYYMMDD'),
          pageNo: 1,
          pageSize: pgSize,
    };
    // alert(pgSize);
    console.log(JSON.stringify(RwdsPntUseSateInqInputDto));
    const resultDetail = await ApiUtils.get('/fo/cu/mbrmgnt/rewards-use-statement', RwdsPntUseSateInqInputDto);
    this.rwdsPointList = resultDetail.data.data.rwdsUseSateDtoList;
    this.rwdsPointUseList = [];
    this.rwdsPointSaveList = [];
    if (!StringUtils.isEmpty(this.rwdsPointList)) {
    this.rwdsPointListCnt = this.rwdsPointList.length;
    this.rwdsPointUseListCnt = 0;
    this.rwdsPointSaveListCnt = 0;

    let j = 0;
      for (let i = 0; i < this.rwdsPointList.length; i++) {
        if (this.rwdsPointList[i].savgReward == '0') {
          this.rwdsPointUseList[j] = this.rwdsPointList[i];
          this.rwdsPointUseList[j].num = i;
          j = j + 1;
        }
      }
      this.rwdsPointUseListCnt = j;
      j = 0;
      for (let i = 0; i < this.rwdsPointList.length; i++) {
        if (this.rwdsPointList[i].useReward == '0') {
          this.rwdsPointSaveList[j] = this.rwdsPointList[i];
          this.rwdsPointSaveList[j].num = i;
          j = j + 1;
        }
      }
      this.rwdsPointSaveListCnt = j;
    } else {
      this.rwdsPointListCnt = 0;
      this.rwdsPointUseListCnt = 0;
      this.rwdsPointSaveListCnt = 0;
    }
      this.totCount = Number(resultDetail.data.data.totCount);
    },
     getTotalRwdsPointList: async function() {
     const RwdsPntInqInputDto = {
    };
    const result= await ApiUtils.get('/fo/cu/mbrmgnt/rewards', RwdsPntInqInputDto);
    this.rwdsTotalPoint = this.toCommaCvert(Number(result.data.data.restReward)); // 잔여 포인트 restReward  totSavgReward
    this.rwdsExtinctionPoint = this.toCommaCvert(Number(result.data.data.nextmmVanishIntendPt)); // 소멸 포인트
    },
    getToggleAction(type, div, between) {
      this.rwdsPointDate = between;
      this.rwdsBetweenDiv = div;
      this.pageNo = 1;
      this.pageSize = this.PAGE_SIZE * 2;
      this.moreData = true;
      this.loading = false;
      // alert(this.gsPointDate +":getToggleAction:" + this.gsBetweenDiv);
      // this.handleScroll();
      this.getRwdsPointList(DateUtils.format(this.period.start.date, 'YYYYMMDD'),
                            DateUtils.format(this.period.end.date, 'YYYYMMDD'),
                            this.pageNo,
                            this.pageSize);
      this.toggleAction(type);
    },
   handleScroll: function() {
      const el = document.querySelector('body');
      const y = window.scrollY + window.innerHeight;
      const height = el.offsetHeight;
      const ratio = Math.floor((y / height) * 100);
      console.log(ratio+"::" + this.moreData + this.loading);
     // if (this.pageSize != (this.totCount + (this.PAGE_SIZE - (this.totCount % this.PAGE_SIZE)))) {
        if (ratio > 60 && this.moreData && !this.loading) {
          this.loadMore();
        }
     // }
    },
    loadMoreTmp: async function() {
        this.loading = true;
      if (this.pageSize != (this.totCount + (this.PAGE_SIZE - (this.totCount % this.PAGE_SIZE)))) {
        // console.log(" totCount " + this.totCount );
          this.pageSize = this.pageNo * this.PAGE_SIZE;
          this.pageNo = this.pageNo + 1;
          await this.getRwdsPointList(DateUtils.format(this.period.start.date, 'YYYYMMDD'),
                                      DateUtils.format(this.period.end.date, 'YYYYMMDD'),
                                      1,
                                      this.pageSize);
          this.loading = false;
        } else {
          this.loading = false;
          this.moreData = false;
          return;
        }
    },
    loadMore: async function() {
      this.loading = true;
     //  if (this.pageSize !== this.PAGE_SIZE && Number(this.totCount) <= this.pageSize) {
    //    console.log(" this.pageSize !== this.PAGE_SIZE && Number(this.totCount) <= this.pageSize " );
    //    this.moreData = false;
    //    return;
    //  }
      this.pageNo = this.pageNo + 1;
      this.pageSize = this.pageNo * this.PAGE_SIZE;
      console.log("this.pageSiz::" + this.pageSize);
      await this.getRwdsPointList(DateUtils.format(this.period.start.date, 'YYYYMMDD'),
                                  DateUtils.format(this.period.end.date, 'YYYYMMDD'),
                                  1,
                                  this.pageSize);
      this.loading = false;
    },
  },
  destroyed() {
          window.removeEventListener('scroll', this.handleScroll);
  },
  mounted: function() {
    this.siteClass = CookieUtils.getSiteClass();
    this.period.start.date = DateUtils.format(DateUtils.add(DateUtils.getToday(), -15, 'day'), 'YYYY-MM-DD');
    this.period.end.date = DateUtils.format(DateUtils.getToday(), 'YYYY-MM-DD');
    this.handleScroll();
   // this.getRwdsPointList(DateUtils.format(DateUtils.add(DateUtils.getToday(), this.rwdsPointDate, 'day'), 'YYYYMMDD'), 1, this.pageSize);
    this.getTotalRwdsPointList();
    // 날짜, 전체 초기화
    this.toggleAction('toggle1');
    this.tabAction('tab1');
    window.addEventListener('scroll', this.handleScroll);
  },
    /* 4월수정 START : 이벤트 추가 */
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.opne) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++ ) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  }
  /* 4월수정 END : 이벤트 추가 */
};
</script>
