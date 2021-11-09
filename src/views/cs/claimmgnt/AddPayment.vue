<!--
Design: views\ss\SC-FO-SS-GF-MS-820.vue
Pg Id: TODO.
Uri: /cs/claimmgnt/add_payment/:ordId/:claimSeqno
-->

<template>
  <div class="wrap-add-payment" v-bind:class="[siteClass]"><!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <SubDefaultHeader headerText="결제" />
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="add-payment">
        <div class="add-payment-top">
          <p>결제를 완료하면,<br/>취소/반품/교환 신청이 접수됩니다.</p>
          <dl>
            <dt>결제금액</dt>
            <dd><span>{{this.comma( Number(addPayAmt) )}}</span>원</dd>
          </dl>
        </div>
        <!-- START : 결재통합 -->
        <PaySheet :ordId="ordId"
                  :totAmt="Number(addPayAmt)"
                  :payCallType="payCallType"
                  :productNm="productNm"
                  :gsNPoint="Number(gsNPointDcAmt)"
                  :payBtnNone="true"
                  @orderProcess="orderProcess"
                  @CashReceiptIssueEvent="CashReceiptIssueEvent"
                  v-if="this.activeFlag"/>
        <!-- END : 결재통합 -->
      </div>
    </main>
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import ClaimMsg from '@/components/mypage/cs/ClaimMsg.vue';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import NumberUtils from '@/common/NumberUtils';
import SiteUtils from '@/common/SiteUtils';
import DateUtils from '@/common/DateUtils';
import PaySheet from '@/views/od/PaySheet.vue';
import dayjs from 'dayjs';

export default {
  props: {},
  name: "AdditionalPayment",
  data() {
    return {
      ordId: this.$route.params.ordId, // 주문ID
      claimSeqno: this.$route.params.claimSeqno, // 클레임일련번호
      addPayAmt: 0, // 추가결제 금액
      gsNPointDcAmt: 0, // 잔여 GS&POINT(사용하는 gsNpoint 정보)
      payCallType: ['01', '02', '99'], // PaySheet의 결제 tab 호출방식 (01: 신용카드, 02: 계좌이체)
      productNm: ClaimMsg.productNmPayByUrl,
      cashRcpctInfo: {
        cashRecptIssuYn: 'N', // 현금영수증발행여부
        cashRecptIssuTypeCd: '1', // 현금영수증발행유형코드 소득공제1/지출증빙2
        cashRecptInputNo: '', // 현금영수증입력번호
      }, // 현금영수증 발행여부
      validationChk: true, // 결재전 상위컴포넌트 validation값
      iGsPointInputDto: {}, // GS&POINT 사용포인트
      claimStatCd: 17, // 반품완료
      // addPayTimeLimit: 20*60*1000, // 10 결제제한시간
      pytcTrmnId: '', // 결제사터미널ID
      pytcCd: '', // 결제사코드
      pytcNm: '', // 결제사명
      progressFlag: 'N',
      activeFlag: false, // 초기 에러상황 등에 PaySheet 컴퍼넌트 비활성화시키는 Flag
      // tlTimer: null,
      siteClass: '',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '추가결제수단 < %s'
  },
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
    SubDefaultHeader,
    PaySheet,
  },
  watch: {
  },
  methods: {
    todayDt() {
      return DateUtils.format(DateUtils.getToday(), 'YYYYMMDD');
    },
    goHome() {
      if (Number(CookieUtils.getMallId()) == 1) { // gsfresh
        if (CookieUtils.getMdaType() == '01') { // PC
          return SiteUtils.freshmo('');
        } else {
          return SiteUtils.freshpc('');
        }
      } else if (Number(CookieUtils.getMallId()) == 11) { // dalisalda
        if (CookieUtils.getMdaType() == '02') { // Mobile
          return SiteUtils.dalimo('');
        }
      }
      return SiteUtils.to(CookieUtils.getMallId(), '');
    },
    // 추가결제금액 조회
    async retrieveAddPaymentAmt() {
      // console.log('ssotoken : '+ CookieUtils.getCookie('ssotoken') );
      console.log("ordId : "+ this.ordId +", claimSeqno : "+ this.claimSeqno);
      const params = {
        ordId: this.ordId,
        claimSeqno: this.claimSeqno
      };
      await ApiUtils
      .get('/fo/cs/claimmgnt/claim-add-payment-amt', params)
      .then( res => {
        if (res.data.data === null) {
          // TODO Home 으로 이동 필요
          console.log(res.data.statusMessage);
          this.$gsdialog.alert(ClaimMsg.invalidAddPayment);
          // this.$router.push( this.goHome() );
          // location.replace( this.goHome() ); // alert창이 모달로 동작하지 않아서 화면이동은 없앰
          return;
        }
        console.log(res);
        console.log('add pay amt : '+ res.data.data.addPaymentAmt +', claim state cd : '+ res.data.data.ordClaimStatCd);

        this.addPayAmt = res.data.data.addPaymentAmt;
        this.claimStatCd = res.data.data.ordClaimStatCd;
        // this.addPayTimeLimit = (res.data.data.addPayTimeLimit > 0 ? res.data.data.addPayTimeLimit : this.addPayTimeLimit);
        this.pytcTrmnId = res.data.data.pytcTrmnId;
        this.pytcCd = res.data.data.pytcCd;
        this.pytcNm = res.data.data.pytcNm;
        this.progressFlag = res.data.data.progressFlag;

        // Validation chk. 23(교환접수결제진행중)/12(반품접수결제진행중)/42(취소접수결제진행중)
        if ((this.claimStatCd == '12' || this.claimStatCd == '23' || this.claimStatCd == '42') && this.progressFlag == 'Y') {
          this.activeFlag = true;
          // console.log("Start : "+ DateUtils.format(dayjs(), 'YYYY-MM-DD hh:mm:ss'));
          // this.paymentTimeLimitChk(); // 결제 완료 시간 체크
        } else if (this.claimStatCd == '50') {
          // 결제시간 초과 안내 화면으로 이동
          $vm.$router.push('/cs/claimmgnt/payment_timeout');
        } else {
          console.error("[추가결제 불가] Invalid ord_claim_stat_cd.");
          this.$gsdialog.alert(ClaimMsg.invalidAddPayment);
          this.addPayAmt = 0;
          return;
        }
      })
      .catch( err => {
        console.error("Error retrieveAddPaymentAmt method.");
        this.$gsdialog.alert(ClaimMsg.invalidAddPayment);
      });
    },
    // GS&POINT 조회
    async getGsNPoint() {
      await ApiUtils
      .get('/fo/cu/mbrmgnt/gs-point')
      .then( res => {
        if (res.data.data === null || res.data.statusCode === 'NOK') {
          this.gsNPointDcAmt = 0;
        }
        console.log("GS&POINT Res value : ");
        console.log(res);
        this.gsNPointDcAmt = res.data.data.totRestPt;
      })
      .catch( error => {
        this.gsNPointDcAmt = 0;
        console.error("Error getGsNPoint method.");
        return;
      });
    },
    /** 추가결제기한 상태관리는 배치에서 하기로 함 -- 삭제
    paymentTimeLimitChk() {
      this.tlTimer = setTimeout( ()=>{
        this.$gsdialog.alert(ClaimMsg.payTimeout);
        // this.$gsdialog.alert(DateUtils.format(dayjs(), 'YYYY-MM-DD hh:mm:ss'));
        console.log("End ["+ this.addPayTimeLimit +"] : "+ DateUtils.format(dayjs(), 'YYYY-MM-DD hh:mm:ss'));
        this.setPaymentTimeout();
      }, this.addPayTimeLimit );
    },
    async setPaymentTimeout() {
      const $vm = this;
      const params = {
        ordId: this.ordId,
        claimSeqno: this.claimSeqno
      };
      await ApiUtils
      .put('/fo/cs/claimmgnt/claim-stat-change', params)
      .then( res => {
        if (res.data.data === null || res.data.statusCode === 'NOK') {
          console.error('[setPaymentTimeout] res.data.data is null');
        }
        console.log("update rows : "+ res.data.data.resCnt);

        // 결제시간 초과 안내 화면으로 이동
        $vm.$router.push('/cs/claimmgnt/payment_timeout');
      })
      .catch( error => {
        console.error('[setPaymentTimeout] error!');
      });
    },
    ***/
    async __validation() {
      // 추가결제금액이 없는 경우
      if (this.addPayAmt > 0) {
        this.validationChk = true;
      } else {
        this.validationChk = false;
        return this.$gsdialog.alert(ClaimMsg.addPayEmpty);
      }
      // GS&Point가 없는 경우
      if (this.gsNPointDcAmt > 0) {
        this.validationChk = true;
      } else {
        this.validationChk = false;
        return this.$gsdialog.alert(ClaimMsg.gsPointEmpty);
      }
      // 추가결제금액이 GS&Point 보다 큰 경우 (복합결제 X)
      if (this.addPayAmt > this.gsNPointDcAmt) {
        this.validationChk = false;
        return this.$gsdialog.alert(ClaimMsg.gsPointLess);
      } else {
        this.validationChk = true;
      }
      // 현금영수증체크
      if (this.cashRcpctInfo != null && this.cashRcpctInfo.cashRecptIssuYn === 'Y') {
        const cashRecptInputNo = this.cashRcpctInfo.cashRecptInputNo;
        const cnt = this.cashRcpctInfo.cashRecptIssuTypeCd === '1' ? 11 : 10;
        if (cnt == 11 && cashRecptInputNo.substring(0, 3) != '010') {
          cnt = 10;
        }
        if (cashRecptInputNo.length < cnt) {
          this.validationChk = false;
          this.moveElement('paymentNormalAccordionContent');
          return this.$gsdialog.alert(OrderMsg.cashRecptChk(this.cashRcpctInfo.cashRecptIssuTypeCd));
        } else {
          this.validationChk = true;
        }
      }
    },
    async orderProcess(rqForm, rsForm) {
      const $vm = this;
      console.log("---------------------------------------------------------");
      console.log(rqForm);
      const payType = rqForm.payType;
      const iOrderRequestInputDto = {};
      iOrderRequestInputDto.ordId = rqForm.orderNo; // 주문번호
      iOrderRequestInputDto.ordDt = this.todayDt(); // 주문일자
      iOrderRequestInputDto.goodsName = rqForm.goods_name; // 상품명
      iOrderRequestInputDto.goodsCnt = rqForm.goods_cnt; // 상품수
      iOrderRequestInputDto.amt = rqForm.goods_price; // 금액
      iOrderRequestInputDto.taxFreeAmt = rqForm.totalTaxfreeAmt; // 면세대상금액
      iOrderRequestInputDto.taxableAmt = rqForm.totalTaxableAmt; // 과세대상금액
          iOrderRequestInputDto.taxfreeRate = rqForm.totTaxfreeRate; // 면세율 0원결제시사용
          iOrderRequestInputDto.taxableRate = rqForm.totTaxableRate; // 과세율 0원결제시사용
      iOrderRequestInputDto.tax = rqForm.totalVatAmt; // 부가세
      iOrderRequestInputDto.totItemAmt = rqForm.goods_price; // 상품총금액
      iOrderRequestInputDto.totItemTaxAmt = rqForm.goods_price; // 총상품과세금액
      iOrderRequestInputDto.totItemFTaxAmt = rqForm.totalTaxfreeAmt; // 총상품비과세금액
      iOrderRequestInputDto.totItemVatAmt = rqForm.totalVatAmt; // 총상품부가세금액
      iOrderRequestInputDto.buyerName = rqForm.buyer_name; // 구매자명
      iOrderRequestInputDto.buyerTel = rqForm.buyer_tel; // 구매자연락처
      iOrderRequestInputDto.mallUserID = rqForm.memNo; // 구매자회원번호
      iOrderRequestInputDto.deviceType = rqForm.deviceType; // 디바이스

      if (this.addPayAmt > 0) {
        if (payType == "02") { // 신용카드
          iOrderRequestInputDto.mid = (this.pytcTrmnId == null ? rsForm.mid : this.pytcTrmnId); // mid (치환)
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.affName = rqForm.aff_name; // 상점명
          iOrderRequestInputDto.payCompany = (this.pytcCd == null ? rqForm.payCompanyCd : this.pytcCd); // 결제사코드 (치환)
          iOrderRequestInputDto.payCompanyNm = (this.pytcNm == null ? rqForm.payCompany : this.pytcNm); // 결제사명 (치환)
          iOrderRequestInputDto.authType = rqForm.mobilCertReqTypeCd; // 신용카드결제타입
          iOrderRequestInputDto.cardAuthType = rsForm.authType; // 카드인증유형코드
          iOrderRequestInputDto.formBankCd = rqForm.pytcApprCardCd; // 승인카드사코드
          iOrderRequestInputDto.cardCode = rqForm.cardCode;
          iOrderRequestInputDto.orderCardname = rqForm.orderCardname; // 카드사명
          iOrderRequestInputDto.cardInterest = rqForm.noint_inf; // 무이자할부정보
          iOrderRequestInputDto.cardQuota = rqForm.quota_inf; // 할부개월수
          // 클레임결제TB용
          iOrderRequestInputDto.tdrMeansCd = "02";
          iOrderRequestInputDto.tdrMeansDtlCd = "00";
        } else if (payType == "01") { // 계좌이체
          iOrderRequestInputDto.mid = rsForm.mid; // mid
          iOrderRequestInputDto.tid = rsForm.userKey; // tid
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.authType = rqForm.authType; // 결제타입
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.affName = rqForm.aff_name; // 상점명
          iOrderRequestInputDto.payCompany = rqForm.payCompanyCd; // 결제사코드
          iOrderRequestInputDto.payCompanyNm = rqForm.payCompany; // 결제사명
          iOrderRequestInputDto.buyerEmail = rqForm.email; // 구매자이메일
              iOrderRequestInputDto.orderCashRcpctDto = this.cashRcpctInfo; // 현금영수증
          // 클레임결제TB용
          iOrderRequestInputDto.tdrMeansCd = "01";
          iOrderRequestInputDto.tdrMeansDtlCd = "00";
        } else if (payType == "99") { // GS&POINT
          console.log("point : "+ this.gsNPointDcAmt);
          if (this.gsNPointDcAmt > 0) { // GS&POINT
            iOrderRequestInputDto.orderDcGsPntDto = {
              gsNPointDcAmt: this.addPayAmt, // 실결제금액(=포인트) 넘겨야함
            };
            iOrderRequestInputDto.amt = 0; // 금액 재세팅
            // 클레임결제TB용
            iOrderRequestInputDto.tdrMeansCd = "06";
            iOrderRequestInputDto.tdrMeansDtlCd = "06";
          }
        }
      }

      // 데이터 전처리
      iOrderRequestInputDto.claimSeqno = this.claimSeqno;
      iOrderRequestInputDto.addPayYn = 'Y';

      console.log("==================================");
      console.log(iOrderRequestInputDto);

      // API 호출 (추가결제승인 -> [주문클레임결제 TB] Insert -> 클레임상태코드변경)
      await ApiUtils
      .put('/fo/cs/claimmgnt/claim-add-payment-add', iOrderRequestInputDto)
      .then( res => {
        if (res.data.data === null || res.data.statusCode === 'NOK') {
          if (res.data.statusMessage.trim() == "주문클레임상태코드 결제기한초과 상태") {
            // 결제시간 초과 안내 화면으로 이동
            $vm.$router.push('/cs/claimmgnt/payment_timeout');
          } else {
            // TODO alert 창? -> 안내메시지 필요
            this.$gsdialog.alert(res.data.statusMessage);
            // this.$router.push( this.goHome() );
            // location.replace( this.goHome() ); // alert창이 모달로 동작하지 않아서 화면이동은 없앰
          }
          return;
        }
        // TODO alert 창? -> 성공 안내메시지 필요
        this.$gsdialog.alert(res.data.statusMessage);
        // console.log("Timer : "+ this.tlTimer);
        // clearTimeout( this.tlTimer ); // 결제시간시한 타이머 해제
        $vm.$router.push('/cs/claimmgnt/payment_complete'); // 추가결제 완료 페이지
        this.$destroy();
      })
      .catch( error => {
        // TODO alert 창? -> 안내메시지 필요
        console.error("/fo/cs/claimmgnt/claim-add-payment-add 호출시 에러");
        // this.$router.push( this.goHome() );
        // location.replace( this.goHome() ); // alert창이 모달로 동작하지 않아서 화면이동은 없앰
        return;
      });
    },
    // 현금영수증발행 이벤트
    CashReceiptIssueEvent: function(cashRcpctInfo) {
      this.cashRcpctInfo = cashRcpctInfo;
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
  },
  mounted() {
    this.siteClass = CookieUtils.getSiteClass();
    this.retrieveAddPaymentAmt(); // 추가결제 금액 조회
    this.getGsNPoint(); // GS&Point 조회
    // this.paymentTimeLimitChk(); // 결제 완료 시간 체크
  },
  destroyed() {
    // 추가결제기한 상태관리는 배치에서 하기로 함 -- 삭제
    // console.log("destroyed!");
    // clearTimeout( this.tlTimer ); // 결제시간시한 타이머 해제
  },
};
</script>
<style lang="scss">
</style>
