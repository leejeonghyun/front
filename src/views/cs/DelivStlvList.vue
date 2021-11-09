<!--
Design: views\ss\SC-FO-SS-GF-MS-712.vue
Pg id:
Uri: /cs/deliv_stlv_list
-->
<!--
마이페이지  나의 활동 배송만족도  SC-FO-SS-GF-MS-713  PG-FO-CS-O031 DelivStlvList 배송만족도 목록
프로그램ID 가 안맞음
SC-FO-SS-GF-MS-713(X) ==> SC-FO-SS-GF-MS-712

e-커머스 Front(API) 마이페이지 나의 활동 배송만족도 PG-FO-CS-I050 IF-FO-CS-I150 배송만족도 설문대상 주문 삭제
e-커머스 Front(API) 마이페이지 나의 활동 배송만족도 PG-FO-CS-I050 IF-FO-CS-I165 배송만족도 설문대상 목록 조회
-->
<template>
  <div class="wrap-mypage qna" :class="siteClass"><!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <!-- START : Header -->
    <SubDefaultHeader headerText="배송만족도조사" />
    <!-- END : Header -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <!-- START : 배송만족도조사 콘텐츠 -->
      <div class="wrap-tab-content" ref="tabContents">
        <!-- START : 전체 배송만족도조사 콘텐츠 -->
        <div class="tabcontents"><!-- 5월 수정 : 탭기능 관련 마크업 삭제 -->
          <!-- 5월 수정 : 탭기능 관련 마크업 삭제 <h2 class="hidden">전체</h2> -->
          <!-- START : 배송만족도조사 조건 필터 -->
          <div class="wrap-promotion-filter delivery">
            <div aria-label="배송만족도조사 리스트 건수" class="delivery-count">
              총<strong>{{ this.rsltList.length }}</strong>건
            </div>
          </div>
          <!-- END : 배송만족도조사 조건 필터 -->
          <!-- 4월수정 START : 기간조회 컨텐츠 추가 -->
          <div class="period-details">
            <fieldset>
              <legend>배송만족도조사 기간조회</legend>
              <div class="term">
                <button type="button"
                  v-for="(month, index) in months"
                  :key="month" class="btn-border"
                  :class="{showing: active == index}"
                  @click="activeMonth(index)"
                  aria-live="assertive"
                  aria-atomic="true">
                  {{month}}</button>
              </div>
              <div class="term-calendar">
                <button
                  class="btn-calendar"
                  aria-haspopup="dialog"
                  title="조회기간 시작날짜 선택 팝업활성화"
                  @click="calendarOpen('start')"
                >
                  <span aria-label="조회기간 시작날짜">
                    {{this.period.start.date}}</span>
                </button>
                <code class="ico-period">~</code>
                <button
                  class="btn-calendar"
                  aria-haspopup="dialog"
                  title="조회기간 끝나는 날짜 선택 팝업활성화"
                  @click="calendarOpen('end')">
                  <span aria-label="조회기간 끝나는 날짜">{{this.period.end.date}}</span>
                </button>
              </div>
              <button class="btn-md btn-bg darkgray" @click="getRsltList()">조회</button>
            </fieldset>
          </div>
          <!-- 4월수정 END : 기간조회 컨텐츠 추가 -->
          <!-- START : 배송만족도조사 목록 -->
          <div class="wrap-mylist" v-if="this.totalCount > 0">
            <ul class="wrap-list-review list-accordion list-type01" v-if="this.rsltList.length != 0">
              <!--FOR START==========================================================-->
              <li
                :class="{open: rowInfo.detailViewYn}"
                v-for="(rowInfo, rowIdx) in rsltList"
                :key="rowInfo.ordId">
                  <div class="review-inner">
                    <div class="list-type01-inner">
                      <div class="wrap-btn-accordion">
                        <button class="btn-accordion"
                          aria-label="배송만족도조사 상세내용"
                          aria-expanded="false"
                          aria-live="polite"
                          aria-atomic="true"
                          @click="DetailViewAction(rowIdx)"
                        >
                          <span class="hidden">배송만족도조사 아코디언 버튼</span>
                        </button>
                      </div>
                      <dl class="delivery-detail-list">
                        <dt>주문번호</dt>
                        <dd>{{rowInfo.ordId}}</dd>
                        <dt>주문상품</dt>
                        <dd>{{rowInfo.itemNm}}</dd>
                        <dt>배송요청시간</dt>
                        <dd>{{rowInfo.delivTime}}</dd>
                      </dl>
                      <div class="list-type01-footer">
                        <div class="left">
                          <p class="date">작성일 {{rowInfo.replyRegDttmTxt}}</p>
                        </div>
                        <div class="right">
                          <button class="btn btn-text btn-delete" aria-label="문의취소 버튼" @click="deleteDelivStlvSrvySbjOrd(rowIdx)"><span>삭제</span></button>
                        </div>
                      </div>
                    </div>
                    <div class="area-answer wrap-satisfation-survey" v-if="rowInfo.detailViewYn">
                      <div class="question-list">
                        <dl>
                          <dt class="question">배송 매니저 친절도를 평가해주세요.</dt>
                          <dd class="satisfation-area wrap-flex">
                            <ul>
                              <!-- 선택되지 않은 값은 aria-hidden="true"를 넣어줘서 스크린리더기에서 읽지 않도록 해줘야 함 -->
                              <li :class="{active:rowInfo.qstSelVal01 == 1}" :aria-hidden="!(rowInfo.qstSelVal01 == 1)">1점</li>
                              <li :class="{active:rowInfo.qstSelVal01 == 2}" :aria-hidden="!(rowInfo.qstSelVal01 == 2)">2점</li>
                              <li :class="{active:rowInfo.qstSelVal01 == 3}" :aria-hidden="!(rowInfo.qstSelVal01 == 3)">3점</li>
                              <li :class="{active:rowInfo.qstSelVal01 == 4}" :aria-hidden="!(rowInfo.qstSelVal01 == 4)">4점</li>
                              <li :class="{active:rowInfo.qstSelVal01 == 5}" :aria-hidden="!(rowInfo.qstSelVal01 == 5)">5점</li>
                            </ul>
                          </dd>
                          <dd>
                            <span class="inp-chk small type2">
                              <input type="checkbox" :name="'question01_'+rowIdx+'_06'" :id="'question01_'+rowIdx+'_06'" :checked="rowInfo.qstSelVal01 == 6 ? 'checked' : ''" disabled="disabled">
                              <label for="checkbox01">만나지 못했습니다.</label>
                            </span>
                          </dd>
                          <dt class="question">설문조사 질문 문항을 입력해주세요.</dt>
                          <dd class="wrap-flex">
                            <span class="inp-radio small">
                              <input type="radio" :name="'question02_'+rowIdx+'_01'" :id="'question02_'+rowIdx+'_01'" value="1" v-model="rowInfo.qstSelVal02"  disabled>
                              <label for="question01">지켜졌습니다.</label>
                            </span>
                            <span class="inp-radio small">
                              <input type="radio" :name="'question02_'+rowIdx+'_02'" :id="'question02_'+rowIdx+'_02'" value="2" v-model="rowInfo.qstSelVal02" disabled>
                              <label for="question02">지켜지지 않았습니다.</label>
                            </span>
                          </dd>
                          <dt class="question">의견을 직접 입력해주세요</dt>
                          <dd>
                            <textarea name="" id="" cols="30" rows="10" class="opinion" disabled v-model="rowInfo.qstSelVal03"></textarea>
                          </dd>
                        </dl>
                      </div>
                    </div>
                </div>
              </li>
              <!--FOR END==========================================================-->
            </ul>
          </div>
          <NoList
            :ListType="'deliveryReserchList'"
            NoListText="참여한 배송만족도 조사가 없습니다"
            v-if="this.rsltList.length == 0" />
        </div>
      </div>
      <!-- END : 배송만족도조사 콘텐츠 -->
    </main>
    <!-- START : footer -->
    <Footer />
    <transition name="popupPeriodCalendar"
      v-on:beforeEnter="slideupBeforeEnter"
      v-on:enter="slideupEnter"
      v-on:after-enter="slideupEnterAfterEnter"
      v-on:leave="slideupEnterLeave"
    >
    <PopupPeriodCalendar
      :type="period.selected.type"
      :initDate="period.selected.changingDate"
      @calendarChange="calendarChange"
      @popupEvent="popupAction"
      v-if="popup.popupPeriodCalendar"
    />
    </transition>
    <!-- END : footer -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import PopupPeriodCalendar from '@/views/ss/PopupPeriodCalendar'; // 팝업 - 기간조회
import Footer from '@/components/common/Footer';
import AccordionMixin from '@/mixins/AccordionMixin';
import Loading from "@/components/common/Loading";
import NoList from '@/components/common/NoList';
import DateUtils from '@/common/DateUtils';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "MyPageDelivery",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '배송만족도조사 < 나의활동 < 마이페이지 < %s',
    meta: [ // 앱 트래커 메타정보 // 입고알림트캐러, 개발 진행 후 작업필요
      {
        property: 'aa:page',
        content: '배송만족도조사'
      }
    ],
  },
  mixins: [AccordionMixin],
  components: {
    SubDefaultHeader,
    Footer,
    PopupPeriodCalendar,
    NoList,
  },
  data() {
    return {
      naviTab: {
        all: true,
        gsfresh: false,
        dalisalda: false,
        daybreak: false,
        simplycook: false
      },
      popup: {
        open: false,
        popupPeriodCalendar: false, // 팝업 - 기간조회
      },
      period: {
        selected: {
          type: 'start',
          changingDate: {},
        },
        start: {
          date: DateUtils.subtract(DateUtils.getToday(), 1, 'month'), // default = 1개월
          day: DateUtils.format(DateUtils.subtract(DateUtils.getToday(), 1, 'month'), 'dd'),
        },
        end: {
          date: DateUtils.getToday(),
          day: DateUtils.format(DateUtils.getToday(), 'dd'),
        },
      },
      selectedMonths: '1개월',
      months: ['1개월', '3개월', '6개월'],
      monthCds: ['1M', '3M', '6M'],
      active: 0,
      reset: true,
      moreData: true,
      loading: false,
      totalCount: 0, // 총 게시물 개수
      currentOffset: 0, // 현재위치
      pageLimit: 10, // 게시물 개수
      /* 검색결과목록 */
      rsltList: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    // 조회처리
    async getRsltList() {
      if (this.reset) {
        this.rsltList = [];
        this.currentOffset = 0;
      }
      try {
        const params = {
        startDate: DateUtils.format(this.period.start.date, 'YYYYMMDD'),
        endDate: DateUtils.format(this.period.end.date, 'YYYYMMDD'),
        limit: this.pageLimit, // 게시물 검색 개수
        offset: this.currentOffset, // 게시물 검색 시작 기준
        };
      const res = await ApiUtils.get('/fo/cs/delivstlvmgnt/delivery-satisfaction-level-survey-list', params);
        if (res.data.success == true) {
          if (res.data == null || res.data.data.mbrDelivStlvRsltList.length == 0) {
            this.rsltList = [];
            return;
          }
          const scrollrsltList = res.data.data.mbrDelivStlvRsltList;
          scrollrsltList.forEach(el => {
            this.rsltList.push(el);
          });
          this.totalCount = scrollrsltList[0].totalCount;
          this.currentOffset = Number(this.currentOffset) + Number(this.pageLimit);
          this.loading = false;
          this.reset = true;
        }
      } catch (error) {
        this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(error);
        });
      }
    },
    // 배송만족도 삭제처리
    async deleteDelivStlvSrvySbjOrd(idx) {
      const $vm = this;
      await $vm.$gsdialog.confirm("참여하신 배송만족도조사를 삭제하시겠습니까?")
      .then(async function() {
        try {
          const rowInfo = $vm.rsltList[idx];
          const params = {
          srvyGrpNo: rowInfo.srvyGrpNo,
          mbrSrvyReplySeqno: rowInfo.mbrSrvyReplySeqno,
          };
          const res = await ApiUtils.post('/fo/cs/delivstlvmgnt/delivery-satisfaction-level-survey-delete', params);
          if (res.data.success === true) {
            $vm.$gsdialog.alert('배송만족도조사가 삭제되었습니다.');
            $vm.getRsltList();
          }
        } catch (error) {
          $vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
            console.log(error);
          });
        }
      })
      .catch(() => {
        console.log('Clicked on cancel');
      });
    },
    activeMonth(idx) {
      // 기간 조회 버튼 활성화 변경
      this.selectedMonths = this.months[idx];
      if (this.active !== idx) {
        this.active = idx;
        // 검색 날짜 셋팅
        this.durEndDt = DateUtils.getToday();
        if (this.monthCds[this.active] == '1M') {
          this.period.start.date = DateUtils.subtract(DateUtils.getToday(), 1, 'month');
        } else if (this.monthCds[this.active] == '3M') {
          this.period.start.date = DateUtils.subtract(DateUtils.getToday(), 3, 'month');
        } else if (this.monthCds[this.active] == '6M') {
          this.period.start.date = DateUtils.subtract(DateUtils.getToday(), 6, 'month');
        }
        this.period.end.date = DateUtils.getToday();
      }
    },
    handleScroll: function() {
      const el = document.querySelector("body");
      const y = window.scrollY + window.innerHeight;
      const height = el.offsetHeight;
      const ratio = Math.floor((y / height) * 100);
      if (ratio > 90 && this.moreData && !this.loading) {
        this.loadMore();
      }
    },
    loadMore: async function() {
      this.loading = true;
      if ( this.totalCount > this.currentOffset) {
        this.reset = false;
        await this.getRsltList();
      } else {
        this.loading = false;
      }
    },
    calendarChange(type, newDate) {
      let startDate;
      let endDate;
      if (type == "start") {
        startDate = DateUtils.format(newDate.date, 'YYYYMMDD');
        endDate = DateUtils.format(this.period.end.date, 'YYYYMMDD');
      } else if (type == "end") {
        startDate = DateUtils.format(this.period.start.date, 'YYYYMMDD');
        endDate = DateUtils.format(newDate.date, 'YYYYMMDD');
      }
      if (startDate <= endDate) {
        // 달력 팝업으로 변경된 날짜 저장
        this.period[type].date = newDate.date;
      } else {
        this.$gsdialog.alert('날짜를 바르게 선택해 주세요.');
      }
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
    /* 4월수정 END : 이벤트 추가 */
    /* 4월수정 START : 팝업 모션 추가 */
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
    // 조회조건변경
    chgDelivTypeCd() {
      this.getRsltList();
    },
    // 몰 구분 탭 변경(삭제)
    // 배송만족도조사 상세보기 줄이기/펼치기
    DetailViewAction(el) {
      this.rsltList[el].detailViewYn = !this.rsltList[el].detailViewYn;
    }
  },
  mounted() {
    this.getRsltList();
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
  },
  updated() {
     // 팝업 딤드 시 스크롤 막기
    if (this.popup.popupTotalMenu) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
  },
};
</script>
<style scoped>
.wrap-list-review.list-accordion li .wrap-text .text {
  white-space: pre-wrap;
}
.wrap-list-review li.open .review-inner .wrap-text .text {
  white-space: pre-wrap;
}
.wrap-list-review.list-type01 .area-answer .txt-answer {
  white-space: pre-wrap;
}
</style>
