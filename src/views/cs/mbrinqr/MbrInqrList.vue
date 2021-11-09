<!--
1:1문의 리스트
Design: views\ss\SC-FO-SS-GF-MS-718.vue`
Pg id: PG-FO-CS-O033
Uri: /cs/mbrinqr/mbr_inqr_list
-->
<template>
  <div class="wrap-mypage public_domain qna type-new" v-bind:class="[siteClass]">
    <!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <!-- START : Header -->
    <SubDefaultHeader headerText="1:1문의" />
    <!-- END : Header -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="area-link">
        <gs-link to="/cs/mbrinqr/mbr_inqr_reg" class="btn-inquiry type-ico" title="1:1 문의하기로 이동">
          <span>1:1 문의하기</span>
        </gs-link>
      </div>
      <!-- START : 1:1문의 콘텐츠 -->
      <div class="wrap-tab-content" ref="tabContents">
        <!-- START : 전체 1:1문의 콘텐츠 -->
        <div id="tab-all" class="tabcontents" aria-labelledby="tab-all">
          <!-- START : 1:1문의 탭 -->
          <div class="tab-list">
            <ul class="tablist t-base">
              <!-- D : 2021-01-26 [t-base] class add -->
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
          <!-- END : 1:1문의 탭 -->
          <div
            id="tab-allList-contents"
            class="tabcontents"
            aria-labelledby="tab-allList"
            v-if="true"
          >
            <!-- 4월 수정 START : 기간조회 컨텐츠 추가 -->
            <div class="period-details">
              <fieldset>
                <legend>1:1문의 기간조회</legend>
                <div class="term">
                  <button
                    type="button"
                    v-for="(month, index) in months"
                    :key="month"
                    class="btn-border"
                    :class="{showing: active == index}"
                    @click="activeMonth(month, index)"
                    aria-live="assertive"
                    aria-atomic="true"
                  >{{month}}</button>
                </div>
                <div class="term-calendar">
                  <button
                    class="btn-calendar"
                    id="btn-calendar-start"
                    aria-haspopup="dialog"
                    title="조회기간 시작날짜 선택 팝업활성화"
                    @click="calendarOpen('start')"
                  >
                    <span aria-label="조회기간 시작날짜">{{this.period.start.date}}</span>
                  </button>
                  <code class="ico-period">~</code>
                  <button
                    class="btn-calendar"
                    id="btn-calendar-end"
                    aria-haspopup="dialog"
                    title="조회기간 끝나는 날짜 선택 팝업활성화"
                    @click="calendarOpen('end')"
                  >
                    <span aria-label="조회기간 끝나는 날짜">{{this.period.end.date}}</span>
                  </button>
                </div>
                <button class="btn-md btn-bg darkgray" @click="retrievelistMbrInqr()">조회</button>
              </fieldset>
            </div>
            <!-- 4월 수정 END : 기간조회 컨텐츠 추가 -->
            <div class="wrap-mylist" v-if="true">
              <!-- START : 1:1문의 목록 -->
              <ul
                class="wrap-list-review list-accordion list-type01"
                v-if="this.qnaList.length > 0"
              >
                <!--======================================================================-->
                <!--반복시작-->
                <!--======================================================================-->
                <li :class="{open: dtlQna.isOpenReply}" v-for="(dtlQna, inx) in qnaList" :key="inx">
                  <div class="review-inner">
                    <!-- START : 문의 -->
                    <!-- START : 문의 -->
                    <div class="list-type01-inner">
                      <div class="wrap-btn-accordion">
                        <button
                          class="btn-accordion"
                          aria-label="1:1문의 상세내용"
                          aria-expanded="false"
                          aria-live="polite"
                          aria-atomic="true"
                          @click="reviewViewAction(inx, dtlQna)"
                        >
                          <span class="hidden">1:1문의 아코디언 버튼</span>
                        </button>
                      </div>
                      <div class="list-type01-header">
                        <!-- 문의취소시 cancel 클래스 추가. -->
                        <!-- TODO 문의취소시  cancel 클래스 추가 확인했는데, class css 안먹음. -->
                        <p
                          :class="{'txt-state': true, 'cancel': dtlQna.replyProgStatCd == 3}"
                        >{{dtlQna.replyProgStatNm}}</p>
                      </div>
                      <div class="wrap-title">
                        <p class="title">{{dtlQna.mbrInqrTypeNm}}</p>
                      </div>
                      <!-- START : 선택한 주문번호+상품명이 있는 경우 -->
                      <div class="product-name" v-if="dtlQna.ordId && dtlQna.itemNm">
                        <gs-link
                          :to="goToOrdDtl(dtlQna)"
                          class="wrap-link point"
                          title="주문내역 페이지로 이동"
                        >
                          <span class="link-text">{{dtlQna.prdNm}}</span>
                        </gs-link>
                      </div>
                      <!-- END : 선택한 주문번호+상품명이 있는 경우 -->
                      <div class="wrap-text">
                        <p class="text">{{dtlQna.mbrInqrCnts}}</p>
                        <!--고객질문내용-->
                      </div>
                      <!-- 4월 수정 START : UI 변경으로 수정 -->
                      <!-- START : 이미지 슬라이드 있을 경우 -->
                      <div
                        class="wrap-photoreview-slide"
                        v-if="dtlQna.attFileId && dtlQna.isOpenReply"
                      >
                        <ul class="wrap-view-image active">
                          <li v-for="(img, imgInx) in dtlQna.fileSaveDtoList" :key="imgInx">
                            <button
                              aria-haspopup="dialog"
                              aria-label="이미지 상세보기 버튼"
                              @click="imgViewPopupAction(dtlQna.fileSaveDtoList, imgInx)"
                            >
                              <img :src="img.filePathNm" :alt="img.saveFileNm" />
                            </button>
                          </li>
                        </ul>
                      </div>
                      <!-- END : 이미지 슬라이드 있을 경우 -->
                      <!-- 4월 수정 END : UI 변경으로 수정 -->
                      <div class="list-type01-footer">
                        <div class="left">
                          <p class="date">{{dtlQna.fstRegDttm}}</p>
                        </div>
                        <div class="right">
                          <button
                            class="btn-border"
                            aria-label="문의취소 버튼"
                            v-if="dtlQna.replyProgStatCd == '1'"
                            @click="cancelMbrInqr(dtlQna.mbrInqrNo, inx)"
                          >
                            <span>문의취소</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- END : 문의 -->
                    <!-- END : 문의 -->
                    <!-- START : 답변 있을 경우 -->
                    <div class="area-answer" v-if="dtlQna.isOpenReply && dtlQna.replyRegYn == 'Y'">
                      <p class="date">
                        <span aria-label="작성자" v-if="dtlQna.userNm">관리자 /</span>
                        <span
                          aria-label="작성날짜"
                          v-if="dtlQna.mbrInqrReplyDttm"
                        >{{dtlQna.mbrInqrReplyDttm}}</span>
                      </p>
                      <p class="txt-answer">{{dtlQna.mbrInqrReplyCnts}}</p>
                    </div>
                    <!-- END : 답변 있을 경우 -->
                  </div>
                </li>
                <!--======================================================================-->
                <!--반복종료-->
                <!--======================================================================-->
              </ul>
              <!-- END : 1:1문의 목록 -->
            </div>
          </div>
          <div
            id="tab-preparing-contents"
            class="tabcontents"
            aria-labelledby="tab-preparing"
            v-if="this.qnaList.length == 0"
          >
            <!-- START : 등록한 문의 내역 없을 경우 -->
            <div class="nolist-area" v-if="true">
              <NoList :ListType="'reviewList'" SearchText NoListText="등록한 문의 내역이 없습니다." />
              <div class="servicecenter">
                <p>
                  <!-- <strong>{{getMallName()}} 고객센터</strong> -->
                  <!-- 문구 통합 처리 2021.04.07 -->
                  <strong>Market For 통합 고객센터</strong>
                  <span>(평일, 주말 09:00~18:00 명절당일 휴무)</span>
                </p>
                <p class="call">
                  <a href="tel:16612562" class="link-tel" title="GS 프레시몰 통합 고객센터 번호">
                    <span>1661-2562</span>
                  </a>
                </p>
              </div>
            </div>
            <!-- END : 등록한 문의 내역 없을 경우-->
          </div>
        </div>
        <!-- END : 전체 상품평 콘텐츠 -->
      </div>
      <!-- END : 1:1문의 콘텐츠 -->
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <!-- 4월수정 START : 팝업 모션 추가 -->
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
      <!-- 팝업 - 기간조회 -->
    </transition>
    <!-- 4월수정 END : 팝업 모션 추가 -->
    <!-- 4월수정 END : 팝업 추가 -->
    <PopupPhotoReview
      :imageList="detailImgList"
      :imgInx="detailImgInx"
      @popupEvent="popupAction"
      v-if="popup.popupPhotoReview"
    />
    <div>
      <Loading v-show="loading" />
    </div>
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer';
import AccordionMixin from '@/mixins/AccordionMixin';
import NoList from '@/components/common/NoList';
/* 4월 수정 START : 컴포넌트 삭제 및 페이지 추가 */
import PopupPeriodCalendar from '@/views/ss/PopupPeriodCalendar'; // 팝업 - 기간조회
import PopupPhotoReview from '@/views/cs/mbrinqr/PopupPhotoReview'; // 팝업 - 상품평 이미지 상세보기
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import Loading from '@/components/common/Loading';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import _ from 'lodash';

/* 4월 수정 END : 컴포넌트 삭제 및 페이지 추가 */
export default {
  name: 'MyPageInquiry',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '1:1문의 < 나의활동 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '1:1문의',
      },
    ],
  },
  mixins: [AccordionMixin],
  components: {
    SubDefaultHeader,
    Footer,
    PopupPeriodCalendar,
    PopupPhotoReview,
    Loading,
    NoList,
  },
  data() {
    return {
      reset: true,
      // 전체, 답변준비중, 답변완료, 문의취소 탭 selected
      inquiryTab: {
        allList: true,
        preparing: false,
        complete: false,
        cancel: false,
      },
      mbrInqrSpCd: '01', // 회원문의구분코드(01 - 1:1대일문의/ 02 - Q&A)
      replyProgStatCd: 'allList', // 답변처리상태코드(allList:전체, preparing:답변준비중, complete:답변완료, cancel:문의취소)
      qnaList: [], // 1:1문의목록
      mallId: '', // 몰ID(전체, GS fresh, 달리살다, 새벽배송, 심플리쿡)
      months: ['1개월', '3개월', '6개월'],
      selectedMonths: '1개월', // default = 1개월
      today: DateUtils.getToday(),
      period: {
        selected: {
          type: 'start',
          changingDate: {},
        },
        start: {
          date: DateUtils.format(
            DateUtils.subtract(this.today, 1, 'month'),
            'YYYY-MM-DD'
          ),
          day: DateUtils.format(this.today, 'dd'),
        },
        end: {
          date: DateUtils.format(this.today, 'YYYY-MM-DD'),
          day: DateUtils.format(this.today, 'dd'),
        },
      },
      active: 0,
      popup: {
        open: false,
        popupPhotoReview: false, // 팝업 - 1:1문의 이미지 상세보기
        popupPeriodCalendar: false, // 팝업 - 기간조회
      },
      detailImgList: [], // 이미지 상세보기 팝업에 넘겨줄 imgList
      detailImgInx: 0, // 이미지 상세보기 팝업에 넘겨줄 선택된 imgInx
      moreData: true,
      loading: false,
      totalCount: 0, // 총 게시물 개수
      currentOffset: 0, // 현재위치
      pageLimit: 10, // 게시물 개수
      siteClass: '',
      mallName: '',
    };
  },
  methods: {
    getMallName() {
      const mallId = CookieUtils.getMallId();
      let mallNm = '';
      switch (mallId) {
        case '11':
          mallNm = '달리살다';
          break;
        case '1':
          mallNm =
            CookieUtils.getCmmSteId() == '3' ? 'Market For' : 'GS Fresh Mall';
          break;
      }
      return mallNm;
    },
    back: function() {
      history.back();
    },
    // 상품Q&A 목록 정보 조회
    async retrievelistMbrInqr() {
      if (this.reset) {
        this.qnaList = [];
        this.currentOffset = 0;
      }
      try {
        const params = {
          mbrInqrSpCd: this.mbrInqrSpCd, // 문의구분코드 01 : 1대1 02 : QnA
          replyProgStatCd: this.replyProgStatCd, // 답변처리상태코드
          limit: this.pageLimit, // 게시물 검색 개수
          offset: this.currentOffset, // 게시물 검색 시작 기준
          OrderBy: '0',
          startDate: DateUtils.format(this.period.start.date, 'YYYYMMDD'),
          endDate: DateUtils.format(this.period.end.date, 'YYYYMMDD'),
        };
        this.loading = true;
        const res = await ApiUtils.get(
          '/fo/cs/mbrinqrmgnt/member-inquire-list',
          params
        );
        if (res.data.success === true) {
          if (
            res.data === null ||
            res.data.data.mbrInqrRsltDtoList.length === 0
          ) {
            this.qnaList = [];
            return;
          }
          const list = res.data.data.mbrInqrRsltDtoList;
          list.forEach(el => {
            el.isOpenReply = false; // 기본 open여부 false
            // 노출 상품명
            const itemCnt = el.itemCnt > 1 ? ' 외 ' + (el.itemCnt - 1) : '';
            el.prdNm =
              el.ordDt + ' [ ' + el.ordId + ' ] ' + el.itemNm + itemCnt;
            this.qnaList.push(el);
          });
          this.totalCount = res.data.data.totalCount; // 총게시물 개수
          this.currentOffset =
            Number(this.currentOffset) + Number(this.pageLimit);
          this.reset = true;
        }
      } catch (error) {
        this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(error);
        });
      } finally {
        this.loading = false;
      }
    },
    // 문의취소
    async cancelMbrInqr(iMbrInqrNo, inx) {
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
              $vm.qnaList[inx].replyProgStatCd = '3'; // 1: 답변준비중, 2: 답변완료, 3: 문의취소
              $vm.qnaList[inx].replyProgStatNm = '문의취소';
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
    tabActionInquiry(type) {
      // 전체, 답변준비중, 답변완료, 문의취소 탭을 모두 숨김
      for (let i = 0; i < Object.keys(this.inquiryTab).length; i++) {
        this.inquiryTab[Object.keys(this.inquiryTab)[i]] = false;
      }
      // 선택한 탭만 SHOW
      this.replyProgStatCd = type;
      // this.inquiryTabActive = [type];
      this.inquiryTab[type] = true;

      // 1:1문의 목록 정보 조회
      this.retrievelistMbrInqr();
    },
    goToOrdDtl(ordDtlData) {
      // 2021-01-26 M4 구분처리
      const uri =
        ordDtlData.mfYn == 'Y'
          ? '/cs/mf/orddeliv/ord_deliv_dtl/' + ordDtlData.ordId
          : '/cs/orddeliv/ord_deliv_dtl/' + ordDtlData.ordId;
      return uri;
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
    reviewViewAction(inx, dtlQna) {
      // 상품평 목록 활성화
      dtlQna.isOpenReply = !dtlQna.isOpenReply;
    },
    /* 4월 수정 START : 이벤트 추가 */
    activeMonth(month, idx) {
      // 기간 조회 버튼 활성화 변경
      this.selectedMonths = this.months[idx];
      if (this.active !== idx) {
        this.active = idx;
      }
      // 기간 추출
      const nMonth = month.replace(/[^0-9]/g, '');
      // end.date에서 nMonth만큼 빼주고 start.date에 삽입
      this.period.start.date = DateUtils.format(
        DateUtils.subtract(this.today, nMonth, 'month'),
        'YYYY-MM-DD'
      );
      this.period.end.date = DateUtils.format(this.today, 'YYYY-MM-DD');
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
        this.$gsdialog
          .alert(
            '조회시작일자가 조회종료일자 보다 이후 일자 입니다. 확인 후 재입력 바랍니다.'
          )
          .then(() => {
            // 달력레이어 재호출 처리
            if (type == 'start') {
              document.getElementById('btn-calendar-start').click();
            } else if (type == 'end') {
              document.getElementById('btn-calendar-end').click();
            }
          });
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
    imgViewPopupAction(imgList, imgInx) {
      // 팝업 활성/비활성
      this.popup.open = !this.popup.open;
      this.popup['popupPhotoReview'] = !this.popup['popupPhotoReview'];
      this.detailImgList = imgList;
      this.detailImgInx = imgInx;
      // console.log(this.detailImgList);
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
    /* 4월수정 END : 팝업 모션 추가 */
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
  },
  /*  computed: {
    prdNm: function() {
      let itemCnt;
      if (this.qnaDtl.itemCnt > 1) {
        itemCnt = ' 외 ' + (this.qnaDtl.itemCnt - 1);
      } else {
        itemCnt = '';
      }
      const prdNm = this.qnaDtl.ordDt + " [ "+ this.qnaDtl.ordId + " ] " + this.qnaDtl.itemNm + itemCnt;
      return prdNm;
    }
  }, */
  mounted() {
    this.siteClass = CookieUtils.getSiteClass();
    // this.commCdSearch('CS0026'); // 응답상태코드 조회
    this.retrievelistMbrInqr(); // 조회
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
