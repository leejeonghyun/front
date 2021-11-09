<!--
Design: views/ss/SC-FO-SS-GF-MS-713.vue
Pg id: PG-FO-CS-O032
Uri: /cs/mbrinqr/item_qna_list
-->
<template>
  <div class="wrap-mypage qna" v-bind:class="[siteClass]">
    <!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <!-- START : Header -->
    <SubDefaultHeader headerText="상품 Q&amp;A" />
    <!-- END : Header -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <!-- START : 상품목록 탭 -->
      <nav>
        <div class="wrap-searchresult tab-default">
          <ul class="scroll-area-x">
            <li>
              <button
                id="tab-all"
                aria-controls="tab-all-contents"
                @click="tabAction('all')"
                :class="{active : this.naviTab.all}"
              >
                <strong>전체</strong>
              </button>
            </li>
            <li>
              <button
                id="tab-gsfresh"
                aria-controls="tab-gsfresh-contents"
                @click="tabAction('gsfresh')"
                :class="{active : this.naviTab.gsfresh}"
              >
                <strong>GS 프레시몰</strong>
              </button>
            </li>
            <li>
              <button
                id="tab-dalisalda"
                aria-controls="tab-dalisalda-contents"
                @click="tabAction('dalisalda')"
                :class="{active : this.naviTab.dalisalda}"
              >
                <strong>달리살다</strong>
              </button>
            </li>
            <li>
              <button
                id="tab-simplycook"
                aria-controls="tab-simplycook-contents"
                @click="tabAction('simplycook')"
                :class="{active : this.naviTab.simplycook}"
              >
                <strong>심플리쿡</strong>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <!-- END : 상품목록 탭 -->
      <!-- START : 상품 Q&A 콘텐츠 -->
      <div class="wrap-tab-content" ref="tabContents">
        <!-- START : 전체 상품 Q&A 콘텐츠 -->
        <div id="tab-all" class="tabcontents" aria-labelledby="tab-all">
          <!-- START : 상품평 작성 여부 탭 -->
          <div class="wrap-tab-review" v-if="true">
            <ul class="tab-review">
              <li>
                <button
                  id="tab-allList"
                  aria-controls="tab-allList-contents"
                  @click="tabActionInquiry('allList')"
                  :class="{active : this.inquiryTab.allList}"
                >
                  <strong>전체</strong>
                </button>
              </li>
              <li>
                <button
                  id="tab-preparing"
                  aria-controls="tab-preparing-contents"
                  @click="tabActionInquiry('preparing')"
                  :class="{active : this.inquiryTab.preparing}"
                >
                  <strong>답변준비중</strong>
                </button>
              </li>
              <li>
                <button
                  id="tab-complete"
                  aria-controls="tab-complete-contents"
                  @click="tabActionInquiry('complete')"
                  :class="{active : this.inquiryTab.complete}"
                >
                  <strong>답변완료</strong>
                </button>
              </li>
              <li>
                <button
                  id="tab-cancel"
                  aria-controls="tab-cancel-contents"
                  @click="tabActionInquiry('cancel')"
                  :class="{active : this.inquiryTab.cancel}"
                >
                  <strong>문의취소</strong>
                </button>
              </li>
            </ul>
          </div>
          <!-- END : 상품평 작성 여부 탭 -->
          <div
            id="tab-allList-contents"
            class="tabcontents"
            aria-labelledby="tab-allList"
            v-if="true"
          >
            <!-- 4월 수정 START : 기간조회 컨텐츠 추가 -->
            <div class="period-details">
              <fieldset>
                <legend>Q&amp;A 기간조회</legend>
                <div class="term">
                  <button
                    type="button"
                    v-for="(month, index) in months"
                    :key="month"
                    class="btn-border"
                    :class="{showing: active == index}"
                    @click="activeMonth(index)"
                    aria-live="assertive"
                    aria-atomic="true"
                  >{{month}}</button>
                </div>
                <div class="term-calendar">
                  <button
                    class="btn-calendar"
                    aria-haspopup="dialog"
                    title="조회기간 시작날짜 선택 팝업활성화"
                    @click="calendarOpen('start')"
                  >
                    <span aria-label="조회기간 시작날짜">{{this.period.start.date}}</span>
                  </button>
                  <code class="ico-period">~</code>
                  <button
                    class="btn-calendar"
                    aria-haspopup="dialog"
                    title="조회기간 끝나는 날짜 선택 팝업활성화"
                    @click="calendarOpen('end')"
                  >
                    <span aria-label="조회기간 끝나는 날짜">{{this.period.end.date}}</span>
                  </button>
                </div>
                <button class="btn-md btn-bg darkgray" @click="retrievelistMbrInqr">조회</button>
              </fieldset>
            </div>
            <!-- 4월 수정 END : 기간조회 컨텐츠 추가 -->
            <!-- START : 상품 Q&A 목록 -->
            <div class="wrap-mylist" v-if="true">
              <ul
                class="wrap-list-review list-accordion list-type01"
                v-if="this.qnaList.length > 0"
              >
                <!--======================================================================-->
                <!--반복시작-->
                <!--======================================================================-->
                <li :class="{ open: dtlQna.showReply }" v-for="(dtlQna, inx) in qnaList" :key="inx">
                  <div class="review-inner">
                    <!-- START : 문의 -->
                    <div class="list-type01-inner">
                      <div class="wrap-btn-accordion">
                        <button
                          class="btn-accordion"
                          aria-label="상품 Q&amp;A 상세내용"
                          aria-expanded="false"
                          aria-live="polite"
                          aria-atomic="true"
                          @click="reviewViewAction(dtlQna)"
                        >
                          <span class="hidden">상품 Q&amp;A 아코디언 버튼</span>
                        </button>
                      </div>
                      <!-- START : 2020.03.19 누락 케이스 추가 -->
                      <div class="list-type01-header">
                        <p
                          :class="{'txt-state': true, 'cancel': dtlQna.replyProgStatCd == 3}"
                        >{{ dtlQna.replyProgStatNm }}</p>
                      </div>
                      <!-- END : 2020.03.19 누락 케이스 추가 -->
                      <div class="wrap-title">
                        <p class="brand">{{ dtlQna.mallNm }}</p>
                        <p class="title">{{ dtlQna.mbrInqrTypeNm }}</p>
                      </div>
                      <!-- START : 선택한 주문번호+상품명이 있는 경우 -->
                      <div class="product-name" v-if="dtlQna.itemNm">
                        <gs-link
                          to="/cs/orddeliv/ord_deliv_list"
                          class="wrap-link order-number point"
                          v-if="dtlQna.ordId"
                        >
                          <span class="hidden">주문번호</span>
                          <span class="link-text">[{{dtlQna.ordId}}]</span>
                        </gs-link>
                        <a
                          href="javascript:void(0);"
                          class="wrap-link"
                          title="해당 상품 상세 페이지로 이동"
                          @click="goToItemDtl(dtlQna.cmmSteId, dtlQna.itemId, dtlQna.storId, dtlQna.supplFirmCd)"
                        >
                          <span class="hidden">상품명</span>
                          <span class="link-text">{{ dtlQna.itemNm }}</span>
                        </a>
                      </div>
                      <!-- END : 선택한 주문번호+상품명이 있는 경우 -->
                      <div class="wrap-text">
                        <p class="text">{{ dtlQna.mbrInqrCnts }}</p>
                      </div>
                      <!-- 4월 수정 START : 이미지 컨텐츠 삭제 -->
                      <!-- 4월 수정 END : 이미지 컨텐츠 삭제 -->
                      <div class="list-type01-footer">
                        <div class="left">
                          <p class="date">{{ dtlQna.fstRegDttm }}</p>
                        </div>
                        <div class="right">
                          <button
                            class="btn-border"
                            aria-label="문의취소 버튼"
                            v-if="dtlQna.replyProgStatCd == '1'"
                            @click="cancelMbrInqr(dtlQna.mbrInqrNo)"
                          >
                            <span>문의취소</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- END : 문의 -->
                    <!-- START : 답변 있을 경우 -->
                    <div class="area-answer" v-if="dtlQna.replyRegYn == 'Y' && dtlQna.showReply">
                      <p class="date">
                        <span aria-label="작성자">관리자</span> /
                        <span aria-label="작성날짜">
                          {{
                          dtlQna.mbrInqrReplyDttm
                          }}
                        </span>
                      </p>
                      <p class="txt-answer">{{ dtlQna.mbrInqrReplyCnts }}</p>
                    </div>
                    <!-- END : 답변 있을 경우 -->
                  </div>
                </li>
              </ul>
              <!-- START : 등록한 문의 내역 없을 경우 -->
              <!-- END : 등록한 문의 내역 없을 경우-->
            </div>
            <div class="wrap-nolist" v-if="this.qnaList.length === 0">
              <NoList :ListType="'reviewList'" SearchText NoListText="문의하신 내역이 없습니다." />
            </div>
            <!-- END : 상품 Q&A 목록 -->
          </div>
        </div>
        <!-- END : 전체 상품 Q&A 콘텐츠 -->
      </div>
      <!-- END : 상품 Q&A 콘텐츠 -->
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <!-- 4월수정 START : 팝업 추가 -->
    <transition
      name="popupPeriodCalendar"
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
    <!-- 팝업 - 기간조회 -->
    <!-- 4월수정 END : 팝업 추가 -->
    <div>
      <Loading v-show="loading" />
    </div>
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer';
import NoList from '@/components/common/NoList';
import AccordionMixin from '@/mixins/AccordionMixin';
import PopupPeriodCalendar from '@/views/ss/PopupPeriodCalendar'; // 팝업 - 기간조회
import DateUtils from '@/common/DateUtils';
import SiteUtils from '@/common/SiteUtils';
import Loading from '@/components/common/Loading';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'MyPageInquiry',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '상품 Q&A < 나의활동 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '상품Q&A',
      },
    ],
  },
  mixins: [AccordionMixin],
  components: {
    SubDefaultHeader,
    Footer,
    NoList,
    PopupPeriodCalendar,
    Loading,
  },
  data() {
    return {
      naviTab: {
        // 탭 선택
        all: true, // 전체
        gsfresh: false, // GSFRESH
        dalisalda: false, // 달리살다
        simplycook: false, // 심플리쿡
      },
      inquiryTab: {
        allList: true,
        preparing: false,
        complete: false,
        cancel: false,
      },
      cmmSteId: {
        // 사이트 코드
        all: null, // 전체
        gsfresh: 1, // GSFRESH
        dalisalda: 2, // 달리살다
        simplycook: 1, // 심플리쿡
      },
      period: {
        // 기간 조회
        selected: {
          type: 'start',
          changingDate: {},
        },
        start: {
          date: DateUtils.subtract(DateUtils.getToday(), 1, 'month'), // default = 1개월
          day: DateUtils.format(
            DateUtils.subtract(DateUtils.getToday(), 1, 'month'),
            'dd'
          ),
        },
        end: {
          date: DateUtils.getToday(),
          day: DateUtils.format(DateUtils.getToday(), 'dd'),
        },
      },
      popup: {
        open: false,
        popupPeriodCalendar: false, // 팝업 - 기간조회
      },
      active: 0, // 활성
      type: 'all', // 기본 default 조회 타입
      months: ['1개월', '3개월', '6개월'], // 기간 조회 버튼
      monthCds: ['1M', '3M', '6M'], // 기간 조회 코드
      selectedMonths: '1개월', // default = 15일
      mbrInqrSpCd: '02', // 회원문의구분코드(02:Q&A)
      replyProgStatCd: 'allList', // 답변처리상태코드(allList:전체, preparing:답변준비중, complete:답변완료, cancel:문의취소)
      replyRegList: {}, // 답변여부목록
      qnaList: [],
      reset: true, // 리셋 여부
      moreData: true,
      loading: false,
      totalCount: 0, // 총 게시물 개수
      currentOffset: 0, // 현재위치
      pageLimit: 10, // 게시물 개수
      spckItemYn: '',
      siteClass: '',
    };
  },
  methods: {
    // 상품Q&A 목록 정보 조회
    async retrievelistMbrInqr() {
      // 스크롤 시 reset = true / 탭이동 및 조건변경 시 rest = false
      if (this.reset) {
        this.qnaList = [];
        this.currentOffset = 0;
      }
      try {
        const params = {
          mbrInqrSpCd: this.mbrInqrSpCd, // 답변 카테고리(1:1 / 상품 Q&A(02))
          replyProgStatCd: this.replyProgStatCd, // 문의 상태
          limit: this.pageLimit, // 게시물 검색 개수
          offset: this.currentOffset, // 게시물 검색 시작 기준
          startDate: DateUtils.format(this.period.start.date, 'YYYYMMDD'),
          endDate: DateUtils.format(this.period.end.date, 'YYYYMMDD'),
          cmmSteId: this.cmmSteId[this.type], // 문의 사이트 코드
          spckItemYn: this.spckItemYn,
        };
        const res = await ApiUtils.get(
          '/fo/cs/mbrinqrmgnt/member-inquire-list',
          params
        );
        if (res.data.success == true) {
          if (
            res.data == null ||
            res.data.data.mbrInqrRsltDtoList.length == 0
          ) {
            this.qnaList = [];
            return;
          }
          const scrollQnaList = res.data.data.mbrInqrRsltDtoList;
          scrollQnaList.forEach(el => {
            el.showReply = false;
            this.qnaList.push(el);
          });
          this.totalCount = res.data.data.totalCount; // 총게시물 개수
          this.currentOffset =
            Number(this.currentOffset) + Number(this.pageLimit);
          this.loading = false; // 로딩상태
          this.reset = true;
        }
      } catch (error) {
        this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(error);
        });
      }
    },
    // 상품 Q&A 사이트 별 탭 조회
    // ( all: "전체조회", gsfresh: "GS FRESH" , dalisalda : "달리살다", simplycook : "심플리쿡")
    tabAction(type) {
      this.type = type;
      for (let i = 0; i < Object.keys(this.naviTab).length; i++) {
        this.naviTab[Object.keys(this.naviTab)[i]] = false;
      }
      this.naviTab[type] = true;
      // 심플리쿡 상품 여부
      if (type == 'simplycook') {
        this.spckItemYn = 'Y';
      } else if (type == 'gsfresh') {
        this.spckItemYn = 'N';
      } else {
        this.spckItemYn = '';
      }
      this.$refs.tabContents.focus();
      // 상품Q&A 목록 정보 조회
      this.retrievelistMbrInqr();
    },
    // 상품 Q&A 답변상태 조회 탭
    // (allList: 전체조회, preparing: 답변준비중, complete: 답변완료, cancel: 문의취소)
    tabActionInquiry(type) {
      for (let i = 0; i < Object.keys(this.inquiryTab).length; i++) {
        this.inquiryTab[Object.keys(this.inquiryTab)[i]] = false;
      }
      this.inquiryTabActive = [type];
      this.inquiryTab[type] = true;
      this.replyProgStatCd = type;
      // 상품Q&A 목록 정보 조회
      this.retrievelistMbrInqr();
    },
    goToItemDtl(cmmSteId, itemId, storId, supplFirmCd) {
      console.log('cmmSteId', cmmSteId);
      if (cmmSteId === '1') {
        // gsFresh cmmSteId 1일 경우
        location.href = SiteUtils.freshmo(
          '/product_detail?itemId=' +
            itemId +
            '&storId=' +
            storId +
            '&supplFirmCd=' +
            supplFirmCd
        );
      } else if (cmmSteId === '2') {
        // dalisalda cmmSteId 2일 경우
        location.href = SiteUtils.dalimo(
          '/product_detail?itemId=' +
            itemId +
            '&storId=' +
            storId +
            '&supplFirmCd=' +
            supplFirmCd
        );
      }
    },
    reviewLikeAction() {
      // 리뷰 도움 버튼
      const $target = event.target;
      const activeClass = $target.classList.contains('active');
      if (activeClass) {
        $target.classList.remove('active');
      } else {
        $target.classList.add('active');
      }
    },
    reviewDetailAction() {
      // 상품만족도 상세 내용 활성화
      this.reviewAverage = !this.reviewAverage;
    },
    reviewViewAction(el) {
      // 상품 Q&A 내용 및 관리자 답변 활성화
      el.showReply = !el.showReply;
    },
    /* 4월수정 START : 이벤트 추가 */
    activeMonth(idx) {
      // 기간 조회 버튼 활성화 변경
      this.selectedMonths = this.months[idx];
      if (this.active !== idx) {
        this.active = idx;
        // 검색 날짜 셋팅
        this.durEndDt = DateUtils.getToday();
        if (this.monthCds[this.active] == '1M') {
          this.period.start.date = DateUtils.subtract(
            DateUtils.getToday(),
            1,
            'month'
          );
        } else if (this.monthCds[this.active] == '3M') {
          this.period.start.date = DateUtils.subtract(
            DateUtils.getToday(),
            3,
            'month'
          );
        } else if (this.monthCds[this.active] == '6M') {
          this.period.start.date = DateUtils.subtract(
            DateUtils.getToday(),
            6,
            'month'
          );
        }
        this.period.end.date = DateUtils.getToday();
      }
    },
    calendarChange(type, newDate) {
      let startDate;
      let endDate;
      if (type == 'start') {
        startDate = DateUtils.format(newDate.date, 'YYYYMMDD');
        endDate = DateUtils.format(this.period.end.date, 'YYYYMMDD');
      } else if (type == 'end') {
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
    calendarOpen(type) {
      // 달력 팝업 활성화 type: 'start' / 'end'
      this.period.selected.type = type;
      this.period.selected.changingDate = this.period[type];
      this.popupAction('popupPeriodCalendar');
    },
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup.open = !this.popup.open;
      this.popup[type] = !this.popup[type];
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
    handleScroll: function() {
      const el = document.querySelector('body');
      const y = window.scrollY + window.innerHeight;
      const height = el.offsetHeight;
      const ratio = Math.floor((y / height) * 100);
      if (ratio > 90 && this.moreData && !this.loading) {
        this.loadMore();
      }
    },
    loadMore: async function() {
      this.loading = true;
      if (this.totalCount > this.currentOffset) {
        this.reset = false;
        await this.retrievelistMbrInqr();
      } else {
        this.loading = false;
      }
    },
    async cancelMbrInqr(iMbrInqrNo) {
      const $vm = this;
      await $vm.$gsdialog
        .confirm('문의를 취소하시겠습니까?')
        .then(async function() {
          try {
            const params = {
              mbrInqrNo: iMbrInqrNo,
            };
            const res = await ApiUtils.put(
              '/fo/cs/mbrinqrmgnt/member-inquire-cancellation',
              params
            );
            if (res.data.success === true) {
              $vm.$gsdialog.alert('문의가 취소 되었습니다.');
              $vm.retrievelistMbrInqr();
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
  },
  mounted() {
    this.siteClass = CookieUtils.getSiteClass();
    // 상품Q&A 목록 정보 조회
    this.retrievelistMbrInqr();
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
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
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
