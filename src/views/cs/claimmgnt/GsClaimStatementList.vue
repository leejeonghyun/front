<!--
Design: views/ss/SC-FO-SS-GF-MS-808.vue
Pg id: PG-FO-CS-O022
Uri: /cs/claimmgnt/claim_statement_list
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]">
    <!-- START : 상세조회 -->
    <div class="wrap-tracking-details">
      <div class="period-details-top">
        <div class="txt-period">
          <strong>기간</strong>
          {{period.start.date}}~{{period.end.date}} {{months[active] != null ? '('+months[active]+')' : ''}}
        </div>
        <span class="btn-period-list">
          <button
            type="button"
            aria-label="상세조회 보기"
            :class="{active : this.isActive}"
            @click="toggleShow"
          >
            <span aria-live="assertive" aria-atomic="true">{{this.isActive ? '조회닫기': '조회설정'}}</span>
          </button>
        </span>
      </div>
      <div class="period-details" v-if="showDetailPeriod === 'show'">
        <fieldset>
          <legend>주문/배송현황 상세조회</legend>
          <!-- 4월수정 START : 기간조회 컨텐츠 추가 -->
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
          <!-- 4월수정 END : 기간조회 컨텐츠 추가 -->
          <p class="hidden">{{ this.selectedMonths }} 선택된 조회 내용 입니다.</p>
          <div class="shipping-type">
            <div class="box">
              <h3>배송유형</h3>
              <span class="wrap-select w100">
                <select v-model="delivTypeCd" required title="취소/반품/교환 배송유형 선택">
                  <option value selected>전체</option>
                  <option
                    :value="opt.commCd"
                    v-for="opt in delivTypeCdList"
                    :key="opt.commCd"
                  >{{opt.commCdNm}}</option>
                </select>
              </span>
            </div>
            <div class="box">
              <h3>처리상태</h3>
              <span class="wrap-select w100">
                <select v-model="ordClaimSpCd" required title="취소/반품/교환 처리상태 선택">
                  <option value selected>전체</option>
                  <option
                    :value="opt.commCd"
                    v-for="opt in ordClaimStatCdList"
                    :key="opt.commCd"
                  >{{opt.commCdNm}}</option>
                </select>
              </span>
            </div>
          </div>
          <button type="button" class="btn-bg darkgray btn-search" @click="searchHide">조회</button>
          <!-- 수정 : 2020.03.02 수정 -->
          <p class="txt-dot">최대 1년(12개월) 동안 주문조회가 가능합니다.</p>
        </fieldset>
      </div>
    </div>
    <!-- END : 상세조회 -->
    <!-- START : 주문 배송이 없는 경우 -->
    <NoList
      NoListText="해당 기간 동안 주문 내역이 없습니다."
      :ListType="'orderList'"
      v-if="claimList == null || claimList.length == 0"
    />
    <!-- END : 주문 배송이 없는 경우 -->
    <!-- START : 취소/반품/교환 목록 -->
    <div class="order-shipping-list" v-for="(dttmDtl, dtInx) in claimDttmList" :key="dtInx">
      <div class="order-date">{{dttmDtl.claimOccrDttm}}{{toFormat(dttmDtl.claimOccrDttm, '(dd)')}}</div>
      <div
        class="order-shipping-item"
        v-for="(ordDtl, ordInx) in filterClaimOrd(dttmDtl.claimOccrDttm)"
        :key="ordInx"
      >
        <a
          class="order-number"
          @click="getOrdDtlPageLink(ordDtl.claimOccrDttm, ordDtl.ordId, ordDtl.ordDtlCnt)"
        >
          <span>
            <strong>주문번호</strong>
            {{ordDtl.ordId}}
          </span>
        </a>
        <div class="order-item">
          <!-- START : 클레임 내역 상세 -->
          <div
            class="shipping-step"
            v-for="(claimDtl, claimInx) in filterClaim(dttmDtl.claimOccrDttm, ordDtl.ordId)"
            :key="claimInx"
          >
            <div class="box-details">
              <div class="wrap-tit-order">
                <p
                  class="tit-order"
                  @click="getClaimPageLink(claimDtl.ordClaimSpCd, claimDtl.ordId, claimDtl.claimSeqno)"
                >
                  <span class="badge">{{claimDtl.delivTypeNm}}</span>
                  {{claimDtl.itemNm}}
                </p>
              </div>
              <div class="schedule">
                <span
                  class="part"
                  @click="popupTrackingActive(claimDtl)"
                >{{getClaimStatMsg(claimDtl)}}</span>
              </div>
            </div>
            <div class="btns-step">
              <button
                type="button"
                @click="cancelRtnWtdw(claimDtl.ordId, claimDtl.claimSeqno, claimDtl.claimCnt, claimDtl.addTdrAmt)"
                v-if="toggleClaimStat('RtnWtdw', claimDtl.ordClaimStatCd, claimDtl.ordClaimSpCd, claimDtl.claimWtdwPosbYn)"
              >반품신청철회</button>
              <button
                type="button"
                @click="cancelExchWtdw(claimDtl.ordId, claimDtl.claimSeqno, claimDtl.claimCnt, claimDtl.addTdrAmt)"
                v-else-if="toggleClaimStat('ExchWtdw', claimDtl.ordClaimStatCd, claimDtl.ordClaimSpCd, claimDtl.claimWtdwPosbYn)"
              >교환신청철회</button>
              <button
                type="button"
                @click="applyMbrInqr(claimDtl.ordId, claimDtl.claimSeqno)"
                v-else-if="toggleClaimStat('MbrInqr', claimDtl.ordClaimStatCd, claimDtl.ordClaimSpCd, claimDtl.claimWtdwPosbYn)"
              >1:1 문의하기</button>
            </div>
          </div>
          <!-- END : 클레임 내역 상세 -->
        </div>
      </div>
    </div>
    <!-- END : 취소/반품/교환 목록  -->
    <InfiniteLoading @infinite="loadMore" ref="infiniteLoading" v-if="loadMoreFlag">
      <div class="btn-more-area" slot="no-more">마지막 주문입니다.</div>
    </InfiniteLoading>
    <!-- END : 취소/반품/교환 목록 -->
    <PopupPeriodCalendar
      :type="period.selected.type"
      :initDate="period.selected.changingDate"
      @calendarChange="calendarChange"
      @popupEvent="popupAction"
      v-if="popup.popupPeriodCalendar"
    />
    <!-- 팝업 - 기간조회 -->
    <PopupTrackingShipping
      @popupEvent="popupAction"
      :mbrDelivParamInfo="mbrDelivParamInfo"
      v-if="this.popup.popupTrackingShipping"
    />
    <!-- 팝업 - 배송조회 -->
  </div>
</template>
<script>
import CancelReturnExchange from '@/components/mypage/CancelReturnExchange'; // 목록
import NoList from '@/components/common/NoList'; // 리스트 없음
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import PopupPeriodCalendar from '@/views/ss/PopupPeriodCalendar'; // 팝업 - 기간조회
import PopupTrackingShipping from '@/views/cs/orddeliv/DelivDlvInq'; // 팝업 - 배송조회 @/views/ss/SC-FO-SS-GF-MP-855
import InfiniteLoading from 'vue-infinite-loading';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'CancelReturnExchangeList',
  data() {
    return {
      popup: {
        // 팝업
        open: false,
        popupTrackingShipping: false, // 팝업 - 배송조회
        popupPeriodCalendar: false, // 팝업 - 기간조회
      },
      mbrDelivParamInfo: {}, // 배송유형기준 정보 파라미터(팝업전송)
      showDetailPeriod: 'hide',
      isActive: false,
      months: ['1개월', '3개월', '6개월', '12개월'],
      monthCds: ['1M', '3M', '6M', '12M'],
      selectedMonths: '3개월', // default = 3개월
      active: 1,
      period: {
        selected: {
          type: 'start',
          changingDate: {},
        },
        start: {
          date: DateUtils.add(
            DateUtils.subtract(DateUtils.getToday(), 3, 'month'),
            1,
            'day'
          ), // default = -3개월
          day: DateUtils.format(
            DateUtils.add(
              DateUtils.subtract(DateUtils.getToday(), 3, 'month'),
              1,
              'day'
            ),
            'dd'
          ),
        },
        end: {
          date: DateUtils.getToday(),
          day: DateUtils.format(DateUtils.getToday(), 'dd'),
        },
      },
      delivTypeCd: '', // 배송유형코드
      delivTypeCdList: [
        { commCd: '01', commCdNm: '당일' },
        { commCd: 'AA', commCdNm: '예약' },
        { commCd: '02', commCdNm: '택배' },
        { commCd: '05', commCdNm: '해외직구' },
        { commCd: '04', commCdNm: '새벽' },
      ],
      ordClaimSpCd: '', // 주문클레임구분코드
      ordClaimStatCdList: null,
      claimDttmList: [], // 클레임 일자별 목록
      claimOrdList: [], // 클레임 주문번호별 목록
      claimList: [], // 클렉임 내역 목록
      cmmMbrNo: null, // 커머스회원번호
      // 더보기
      loadMoreFlag: false,
      loadCount: 0,
      pageNo: 0,
      pageSize: 0,
      LIMIT_PAGE_SIZE: 5, // 5일 단위로 조회 한다.
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '취소/반품/교환 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '취소/반품/교환',
      },
    ],
  },
  props: [],
  mixins: [LayerPopupMixin],
  components: {
    PopupPeriodCalendar, // 캘린더 팝업
    PopupTrackingShipping, // 팝업 - 배송조회
    NoList, // 리스트 없음
    InfiniteLoading,
  },
  methods: {
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false);
    },
    toggleClaimStat(iType, iOrdClaimStatCd, iOrdClaimSpCd, iClaimWtdwPosbYn) {
      if (iType === 'RtnWtdw') {
        // 반품신청 철회 버튼 활성화
        if (iOrdClaimSpCd == 'R' && iClaimWtdwPosbYn == 'Y') {
          return true;
        } else {
          return false;
        }
      } else if (iType === 'ExchWtdw') {
        // 교환신청 철회 버튼 활성화
        if (iOrdClaimSpCd == 'E' && iClaimWtdwPosbYn == 'Y') {
          return true;
        } else {
          return false;
        }
      } else if (iType === 'MbrInqr') {
        // 1:1문의하기 버튼 활성화
        if (iOrdClaimStatCd == '17' || iOrdClaimStatCd == '30') {
          return true;
        } else {
          return false;
        }
      }
    },
    // 월별 조회 셀렉트 보기
    toggleShow() {
      if (this.showDetailPeriod === 'hide') {
        this.showDetailPeriod = 'show';
      } else {
        this.showDetailPeriod = 'hide';
        this.activeMonth(1);
      }
      this.isActive = !this.isActive;
    },
    searchHide() {
      this.showDetailPeriod = 'hide';
      this.isActive = !this.isActive;
      // 상품Q&A 목록 정보 조회
      this.retrievelistClaimStat(0);
    },
    activeMonth(idx) {
      this.selectedMonths = this.months[idx];
      if (this.active !== idx) {
        this.active = idx;
        this.period.end.date = DateUtils.getToday();
        this.period.end.day = DateUtils.format(DateUtils.getToday(), 'dd');
        if (this.monthCds[this.active] == '1M') {
          this.period.start.date = DateUtils.add(
            DateUtils.subtract(DateUtils.getToday(), 1, 'month'),
            1,
            'day'
          );
          this.period.start.day = DateUtils.format(
            DateUtils.add(
              DateUtils.subtract(DateUtils.getToday(), 1, 'month'),
              1,
              'day'
            ),
            'dd'
          );
        } else if (this.monthCds[this.active] == '3M') {
          this.period.start.date = DateUtils.add(
            DateUtils.subtract(DateUtils.getToday(), 3, 'month'),
            1,
            'day'
          );
          this.period.start.day = DateUtils.format(
            DateUtils.add(
              DateUtils.subtract(DateUtils.getToday(), 3, 'month'),
              1,
              'day'
            ),
            'dd'
          );
        } else if (this.monthCds[this.active] == '6M') {
          this.period.start.date = DateUtils.add(
            DateUtils.subtract(DateUtils.getToday(), 6, 'month'),
            1,
            'day'
          );
          this.period.start.day = DateUtils.format(
            DateUtils.add(
              DateUtils.subtract(DateUtils.getToday(), 6, 'month'),
              1,
              'day'
            ),
            'dd'
          );
        } else if (this.monthCds[this.active] == '12M') {
          this.period.start.date = DateUtils.add(
            DateUtils.subtract(DateUtils.getToday(), 12, 'month'),
            1,
            'day'
          );
          this.period.start.day = DateUtils.format(
            DateUtils.add(
              DateUtils.subtract(DateUtils.getToday(), 12, 'month'),
              1,
              'day'
            ),
            'dd'
          );
        }
      }
    },
    calendarChange(type, newDate) {
      // 달력 팝업으로 변경된 날짜 저장
      let startDate = '';
      let endDate = '';
      // 시작일 유효성 체크
      if (type === 'start') {
        if (
          !DateUtils.isAfter(
            DateUtils.add(this.period.end.date, 1, 'day'),
            newDate.date
          )
        ) {
          this.$gsdialog.alert(
            '조회시작일자가 조회종료일자 보다 이후 일자 입니다. 확인 후 재입력 바랍니다.'
          );
          return;
        }
        startDate = newDate.date;
        endDate = this.period.end.date;
        // 종료일 유효성 체크
      } else {
        if (
          !DateUtils.isBefore(
            DateUtils.subtract(this.period.start.date, 1, 'day'),
            newDate.date
          )
        ) {
          this.$gsdialog.alert(
            '조회시작일자가 조회종료일자 보다 이후 일자 입니다. 확인 후 재입력 바랍니다.'
          );
          return;
        }
        startDate = this.period.start.date;
        endDate = newDate.date;
      }
      // 조회 기간 12개월 유효성 체크
      startDate = DateUtils.format(startDate, 'YYYYMMDD');
      const durDate = DateUtils.format(
        DateUtils.add(DateUtils.subtract(endDate, 12, 'month'), 1, 'day'),
        'YYYYMMDD'
      );
      if (startDate < durDate) {
        this.$gsdialog.alert('최대 1년(12개월) 동안 주문조회가 가능합니다.');
        return;
      }
      this.period[type].date = newDate.date;
      this.activeMonth(99);
    },
    calendarOpen(type) {
      // 달력 팝업 활성화 type: 'start' / 'end'
      this.period.selected.type = type;
      this.period.selected.changingDate = this.period[type];
      this.popupAction('popupPeriodCalendar');
    },
    filterClaimOrd(selDttm) {
      return this.claimOrdList.filter(ordDtl => {
        return ordDtl.claimOccrDttm == selDttm;
      });
    },
    filterClaim(selDttm, selOrd) {
      return this.claimList.filter(claimDtl => {
        return claimDtl.claimOccrDttm == selDttm && claimDtl.ordId == selOrd;
      });
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    toFormat(x, y) {
      return DateUtils.format(x, y);
    },
    // 배송조회(운송장조회) 팝업
    popupTrackingActive(claimDtl) {
      // 배송조회(운송장조회) 팝업 조건 (클레임유형:교환/배송유형:업체,전국,해외 배송/운송장번호가 존재) 할 경우 배송조회 가능
      if (
        claimDtl.ordClaimSpCd == 'E' &&
        (claimDtl.delivTypeCd == '02' ||
          claimDtl.delivTypeCd == '03' ||
          claimDtl.delivTypeCd == '05') &&
        this.isNotEmpty(claimDtl.dlvcoCd) &&
        this.isNotEmpty(claimDtl.dlvInvNo)
      ) {
        this.mbrDelivParamInfo = {
          dvdescDlvcoCd: claimDtl.dlvcoCd, // 택배사코드
          dvdescDlvInvNo: claimDtl.dlvInvNo, // 택배송장번호
        };
        this.popupAction('popupTrackingShipping');
      }
    },
    getOrdDtlPageLink(claimOccrDttm, ordId, ordDtlCnt) {
      // 주문상세 페이지 이동 처리 함수
      this.$router.push('/cs/orddeliv/ord_deliv_dtl/' + ordId); // 주문 상세 화면으로 이동
    },
    getClaimPageLink(ordClaimSpCd, ordId, claimSeqno) {
      // 클레임 상세 페이지 이동 처리 함수
      let strHref = '';
      switch (ordClaimSpCd) {
        // 주문클레임상태코드 : C (주문취소)
        case 'C':
          strHref = '/cs/claimmgnt/ord_cncl_dtl/' + ordId + '/' + claimSeqno;
          break;
        // 주문클레임상태코드 : R (주문반품)
        case 'R':
          strHref = '/cs/claimmgnt/ord_rtn_dtl/' + ordId + '/' + claimSeqno;
          break;
        // 주문클레임상태코드 : E (주문교환)
        case 'E':
          strHref = '/cs/claimmgnt/ord_exch_dtl/' + ordId + '/' + claimSeqno;
          break;
      }
      this.$router.push(strHref);
    },
    getClaimStatMsg(claimDtl) {
      // 클레임 진행 상태 별 메세지 처리 함수
      let claimStatNm = '';
      let delivDt = '';
      let delivBeginTm = '';
      let delivEndTm = '';
      /**
       * 주문클레임구분코드(ordClaimSpCd) : 'C'(주문취소), 'R'(주문반품), 'E'(주문교환)
       * 배송유형코드(delivTypeCd) : '01'(당일배송), '02'(자사택배), '03'(업체택배), '04'(새벽배송), '05'(해외배송)
       * 주문클레임상태코드(ordClaimStatCd)
       *  - 반품 : '11'(반품접수), '12'(반품접수결제진행중), '13'(반품철회), '14'(반품수거지시), '15'(반품접수취소전환), '16'(반품확정), '17'(반품완료), '19'(반품수거완료)
       *  - 교환 : '21'(교환요청), '22'(교환접수), '23'(교환접수결제진행중), '24'(교환철회), '25'(교환수거지시), '26'(교환수거완료), '27'(교환배송지시), '28'(교환배송완료), '29'(교환확정), '30'(교환완료)
       *  - 취소 : '41'(취소접수), '42'(취소접수결제진행중), '43'(취소철회), '44'(취소확정), '45'(취소완료), '50'(결제기한초과)
       */
      switch (claimDtl.ordClaimSpCd) {
        /**
         * 주문클레임상태코드 : C (주문취소)
         * 주문클레임상태코드(ordClaimStatCd)
         *  - 취소 : '41'(취소접수), '42'(취소접수결제진행중), '43'(취소철회), '44'(취소확정), '45'(취소완료), '50'(결제기한초과)
         */
        case 'C':
          if (claimDtl.ordClaimStatCd == '43') {
            // 취소신청 취소
            claimStatNm =
              (this.isEmpty(claimDtl.cnclDttm) ? '' : claimDtl.cnclDttm) +
              ' 취소신청 취소';
          } else {
            // 주문취소
            claimStatNm = claimDtl.claimSpNm + '취소';
          }
          break;
        /**
         * 주문클레임상태코드 : R (주문반품)
         * 주문클레임상태코드(ordClaimStatCd)
         *  - 반품 : '11'(반품접수), '12'(반품접수결제진행중), '13'(반품철회), '14'(반품수거지시), '15'(반품접수취소전환), '16'(반품확정), '17'(반품완료), '19'(반품수거완료)
         */
        case 'R':
          if (
            claimDtl.ordClaimStatCd == '11' ||
            claimDtl.ordClaimStatCd == '12' ||
            claimDtl.ordClaimStatCd == '50'
          ) {
            // 반품접수
            if (claimDtl.delivTypeCd == '03' || claimDtl.delivTypeCd == '05') {
              // 배송유형 : 업체택배 / 해외직구
              claimStatNm = '1~3일내로 고객님께 직접 방문합니다.';
            } else {
              delivDt = this.isEmpty(claimDtl.delivDt)
                ? ''
                : this.toFormat(claimDtl.delivDt, 'MM.DD(dd)');
              delivBeginTm = this.isEmpty(claimDtl.delivBeginTm)
                ? ''
                : this.toFormat(
                    claimDtl.delivDt + claimDtl.delivBeginTm,
                    'HH:mm'
                  );
              delivEndTm = this.isEmpty(claimDtl.delivEndTm)
                ? ''
                : this.toFormat(
                    claimDtl.delivDt + claimDtl.delivEndTm,
                    '~HH:mm'
                  );
              claimStatNm =
                delivDt + delivBeginTm + delivEndTm + ' 상품수거예정';
            }
          } else if (claimDtl.ordClaimStatCd == '17') {
            // 반품완료
            claimStatNm = claimDtl.claimSpNm + '반품완료';
          } else if (claimDtl.ordClaimStatCd == '13') {
            // 반품취소
            claimStatNm =
              (this.isEmpty(claimDtl.cnclDttm) ? '' : claimDtl.cnclDttm) +
              ' 반품신청 취소';
          } else {
            // 반품처리중
            if (claimDtl.delivTypeCd == '03' || claimDtl.delivTypeCd == '05') {
              // 배송유형 : 업체택배 / 해외직구
              claimStatNm = '1~3일내로 고객님께 직접 방문합니다.';
            } else {
              if (claimDtl.ordClaimStatCd == '14') {
                // 회수중 처리
                claimStatNm = '회수중';
              } else {
                // 상품확인
                claimStatNm = '상품 확인 중 환불대기';
              }
            }
          }
          break;
        /**
         * 주문클레임상태코드 : E (주문교환)
         * 주문클레임상태코드(ordClaimStatCd)
         *  - 교환 : '21'(교환요청), '22'(교환접수), '23'(교환접수결제진행중), '24'(교환철회), '25'(교환수거지시), '26'(교환수거완료), '27'(교환배송지시), '28'(교환배송완료), '29'(교환확정), '30'(교환완료)
         */
        case 'E':
          const dlvcoNm = this.isEmpty(claimDtl.dlvcoNm)
            ? '운송장번호 : '
            : claimDtl.dlvcoNm;
          if (
            claimDtl.ordClaimStatCd == '21' ||
            claimDtl.ordClaimStatCd == '22' ||
            claimDtl.ordClaimStatCd == '23' ||
            claimDtl.ordClaimStatCd == '25' ||
            claimDtl.ordClaimStatCd == '50'
          ) {
            // 교환접수
            if (claimDtl.delivTypeCd == '03' || claimDtl.delivTypeCd == '05') {
              // 배송유형 : 업체택배 / 해외직구
              claimStatNm = '1~3일내로 고객님께 직접 방문합니다.';
            } else {
              delivDt = this.isEmpty(claimDtl.delivDt)
                ? ''
                : this.toFormat(claimDtl.delivDt, 'MM-DD(dd)');
              delivBeginTm = this.isEmpty(claimDtl.delivBeginTm)
                ? ''
                : this.toFormat(
                    claimDtl.delivDt + claimDtl.delivBeginTm,
                    'HH:mm'
                  );
              delivEndTm = this.isEmpty(claimDtl.delivEndTm)
                ? ''
                : this.toFormat(
                    claimDtl.delivDt + claimDtl.delivEndTm,
                    '~HH:mm'
                  );
              claimStatNm =
                delivDt + delivBeginTm + delivEndTm + ' 상품수거예정';
            }
          } else if (claimDtl.ordClaimStatCd == '30') {
            // 교환완료
            if (!this.isEmpty(claimDtl.dlvInvNo)) {
              // 택배송장번호 여부 체크
              claimStatNm = dlvcoNm + ' ' + claimDtl.dlvInvNo;
            } else {
              claimStatNm = claimDtl.claimSpNm + '교환완료';
            }
          } else if (claimDtl.ordClaimStatCd == '24') {
            // 교환취소
            claimStatNm =
              (this.isEmpty(claimDtl.cnclDttm) ? '' : claimDtl.cnclDttm) +
              ' 교환신청 취소';
          } else {
            // 교환처리중
            if (claimDtl.delivTypeCd == '01' || claimDtl.delivTypeCd == '04') {
              // 배송유형 : 당일배송 / 새벽배송
              delivDt = this.isEmpty(claimDtl.delivDt)
                ? ''
                : this.toFormat(claimDtl.delivDt, 'MM-DD(dd)');
              delivBeginTm = this.isEmpty(claimDtl.delivBeginTm)
                ? ''
                : this.toFormat(
                    claimDtl.delivDt + claimDtl.delivBeginTm,
                    'HH:mm'
                  );
              delivEndTm = this.isEmpty(claimDtl.delivEndTm)
                ? ''
                : this.toFormat(
                    claimDtl.delivDt + claimDtl.delivEndTm,
                    '~HH:mm'
                  );
              if (claimDtl.ordClaimStatCd == '25') {
                claimStatNm =
                  delivDt + delivBeginTm + delivEndTm + ' 상품수거예정';
              } else if (claimDtl.ordClaimStatCd == '26') {
                claimStatNm =
                  (this.isEmpty(claimDtl.retFinDttm)
                    ? ''
                    : this.toFormat(claimDtl.retFinDttm, 'MM.DD(dd) HH:mm')) +
                  ' 상품수거완료';
              } else if (claimDtl.ordClaimStatCd == '27') {
                claimStatNm =
                  delivDt + delivBeginTm + delivEndTm + ' 교환배송예정';
              } else if (claimDtl.ordClaimStatCd == '28') {
                claimStatNm =
                  (this.isEmpty(claimDtl.retFinDttm)
                    ? ''
                    : this.toFormat(claimDtl.retFinDttm, 'MM.DD(dd) HH:mm')) +
                  ' 교환배송완료';
              }
            } else if (
              (claimDtl.delivTypeCd == '03' || claimDtl.delivTypeCd == '05') &&
              this.isEmpty(claimDtl.dlvInvNo)
            ) {
              // 배송유형 : 업체배송 / 해외직구 && 택배송장번호가 없는 경우
              claimStatNm = '1~3일내로 고객님께 직접 방문합니다.';
            } else if (
              (claimDtl.delivTypeCd == '03' || claimDtl.delivTypeCd == '05') &&
              !this.isEmpty(claimDtl.dlvInvNo)
            ) {
              // 배송유형 : 업체배송 / 해외직구 && 택배송장번호가 존재하는 경우
              claimStatNm = dlvcoNm + ' ' + claimDtl.dlvInvNo;
            } else if (
              claimDtl.delivTypeCd == '02' &&
              this.isEmpty(claimDtl.dlvInvNo)
            ) {
              // 배송유형 : 자사택배 && 택배송장번호가 없는 경우
              delivDt = this.isEmpty(claimDtl.delivDt)
                ? ''
                : this.toFormat(claimDtl.delivDt, 'MM-DD(dd)');
              delivBeginTm = this.isEmpty(claimDtl.delivBeginTm)
                ? ''
                : this.toFormat(
                    claimDtl.delivDt + claimDtl.delivBeginTm,
                    'HH:mm'
                  );
              delivEndTm = this.isEmpty(claimDtl.delivEndTm)
                ? ''
                : this.toFormat(
                    claimDtl.delivDt + claimDtl.delivEndTm,
                    '~HH:mm'
                  );
              claimStatNm = delivDt + delivBeginTm + delivEndTm + ' 수거 예정';
            } else if (
              claimDtl.delivTypeCd == '02' &&
              !this.isEmpty(claimDtl.dlvInvNo)
            ) {
              // 배송유형 : 자사택배 && 택배송장번호가 존재하는 경우
              claimStatNm = dlvcoNm + ' ' + claimDtl.dlvInvNo;
            }
          }
          break;
      }
      return claimStatNm;
    },
    async applyMbrInqr(iOrdId, iClaimSeqno) {
      // 1:1문의하기
      this.$router.push('/cs/mbrinqr/mbr_inqr_reg/'); // 추후 필요한 파라미터 전송 해야됨.
    },
    async cancelRtnWtdw(iOrdId, iClaimSeqno, claimCnt, addTdrAmt) {
      // 반품신청 철회
      let strMsg = '';
      if (claimCnt > 1) {
        strMsg = '반품신청이 전체 취소됩니다.<br/>진행하시겠습니까?';
      } else {
        strMsg =
          "반품신청을 취소하시겠습니까?<br/>'확인'을 선택하시면 반품신청이 취소됩니다.";
      }
      const confirmFlag = await this.$gsdialog.confirm(strMsg, { html: true });
      if (confirmFlag) {
        const params = {
          ordId: iOrdId,
          claimSeqno: iClaimSeqno,
          userId: this.cmmMbrNo,
        };

        const res = await ApiUtils.post('/fo/cs/processRtnWtdw', params);
        if (
          res.data === null ||
          !res.data.success ||
          res.data.statusCode !== '0000'
        ) {
          this.$gsdialog.alert(res.data.statusMessage);
        } else {
          let resMsg = '반품 신청이 취소되었습니다.';
          if (Number(addTdrAmt) > 0) {
            resMsg += '<br/>환불 금액 입금까지 1~2일 소요됩니다.';
          }
          this.$gsdialog.alert(resMsg, { html: true });
        }
        this.retrievelistClaimStat(0);
      }
    },
    async cancelExchWtdw(iOrdId, iClaimSeqno, claimCnt, addTdrAmt) {
      // 교환신청 철회
      let strMsg = '';
      if (claimCnt > 1) {
        strMsg = '전체 교환신청 취소만 가능합니다.<br/>진행하시겠습니까?';
      } else {
        strMsg =
          "교환신청을 취소하시겠습니까?<br/>'확인'을 선택하시면 교환신청이 취소됩니다.";
      }
      const confirmFlag = await this.$gsdialog.confirm(strMsg, { html: true });
      if (confirmFlag) {
        const params = {
          ordId: iOrdId,
          claimSeqno: iClaimSeqno,
          ordClaimStatCd: '24', // 교환철회:24
          userId: this.cmmMbrNo,
        };

        const res = await ApiUtils.post(
          '/fo/cs/claimmgnt/order-exchange-wtdw',
          params
        );
        if (
          res.data === null ||
          !res.data.success ||
          res.data.statusCode !== '0000'
        ) {
          this.$gsdialog.alert(
            res.data.statusMessage.replace('{0}', '교환신청 철회가')
          );
        } else {
          let resMsg = '교환 신청이 취소되었습니다.';
          if (Number(addTdrAmt) > 0) {
            resMsg += '<br/>환불 금액 입금까지 1~2일 소요됩니다.';
          }
          this.$gsdialog.alert(resMsg, { html: true });
        }
        this.retrievelistClaimStat(0);
      }
    },
    async retrievelistClaimStat(pgSize) {
      // 취소/반품/교환(클레임) 목록 정보 조회
      const params = {
        claimOccrBeginDttm: this.period.start.date, // 조회시작기간
        claimOccrEndDttm: this.period.end.date, // 조회종료기간
        delivTypeCd: this.delivTypeCd, // 배송유형코드
        ordClaimSpCd: this.ordClaimSpCd, // 주문클레임구분코드
        limit: this.LIMIT_PAGE_SIZE,
        offset: pgSize,
      };
      const res = await ApiUtils.get(
        '/fo/cs/claimmgnt/claim-statement-list',
        params
      );
      if (res.data === null || !res.data.success) {
        return;
      }
      const resClaimList = res.data.data; // 클레임 내역 목록 List
      this.cmmMbrNo = resClaimList.cmmMbrNo; // 커머스회원번호
      // 목록 데이터 초기화
      if (pgSize == 0) {
        this.claimDttmList = [];
        this.claimOrdList = [];
        this.claimList = [];
      }
      if (
        resClaimList.claimDtList != null &&
        this.LIMIT_PAGE_SIZE <= resClaimList.claimDtList.length
      ) {
        this.loadMoreFlag = true;
      }
      this.loadCount = resClaimList.claimDtList.length;
      this.claimDttmList = resClaimList.claimDtList;
      this.claimOrdList = resClaimList.claimOrdList;
      this.claimList = resClaimList.claimDelivTypeList;
    },
    async loadMore($state) {
      if (this.loadCount == this.LIMIT_PAGE_SIZE) {
        this.pageNo = this.pageNo + 1;
        this.pageSize = this.pageNo * this.LIMIT_PAGE_SIZE;
        const params = {
          claimOccrBeginDttm: this.period.start.date, // 조회시작기간
          claimOccrEndDttm: this.period.end.date, // 조회종료기간
          delivTypeCd: this.delivTypeCd, // 배송유형코드
          ordClaimSpCd: this.ordClaimSpCd, // 주문클레임구분코드
          limit: this.LIMIT_PAGE_SIZE,
          offset: this.pageSize,
        };
        const res = await ApiUtils.get(
          '/fo/cs/claimmgnt/claim-statement-list',
          params
        );
        if (res.data === null || !res.data.success) {
          return;
        }
        const resClaimList = res.data.data; // 클레임 내역 목록 List
        if (
          resClaimList.claimDtList == null ||
          this.LIMIT_PAGE_SIZE > resClaimList.claimDtList.length
        ) {
          // 마지막 주문 입니다 <== 메세지 블라인드 처리
          this.loadMoreFlag = false;
          $state.complete();
        } else {
          setTimeout(() => {
            if (
              resClaimList.claimDtList != null &&
              resClaimList.claimDtList.length > 0
            ) {
              for (let inx = 0; inx < resClaimList.claimDtList.length; inx++) {
                this.claimDttmList.push(resClaimList.claimDtList[inx]);
              }
              this.loadCount = resClaimList.claimDtList.length;
            }
            if (
              resClaimList.claimOrdList != null &&
              resClaimList.claimOrdList.length > 0
            ) {
              for (let inx = 0; inx < resClaimList.claimOrdList.length; inx++) {
                this.claimOrdList.push(resClaimList.claimOrdList[inx]);
              }
            }
            if (
              resClaimList.claimDelivTypeList != null &&
              resClaimList.claimDelivTypeList.length > 0
            ) {
              for (
                let inx = 0;
                inx < resClaimList.claimDelivTypeList.length;
                inx++
              ) {
                this.claimList.push(resClaimList.claimDelivTypeList[inx]);
              }
            }
            $state.loaded();
          }, 1000);
        }
      }
    },
    // 공통코드 조회
    searchCommCd(commGrpCd) {
      const params = {
        commGrpCd: commGrpCd,
      };
      ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params).then(res => {
        // 처리상태 공통코드인 경우 'O' 코드 삭제 처리
        if (commGrpCd == 'OD0007') {
          this.ordClaimStatCdList = res.data.data;
          for (let idx = 0; idx < this.ordClaimStatCdList.length; idx++) {
            if (this.ordClaimStatCdList[idx].commCd == 'O') {
              this.ordClaimStatCdList.splice(idx, 1); // 첫번째 레코드 삭제 ( 'O' : 주문 )
            }
          }
        }
      });
    },
    init() {
      // 처리상태 공통코드 조회
      this.searchCommCd('OD0007');
    },
  },
  computed: {},
  mounted() {
    // 화면 초기화 함수 호출
    this.init();
    // 상품Q&A 목록 정보 조회
    this.retrievelistClaimStat(0);
  },
  updated() {},
};
</script>
<style>
</style>
