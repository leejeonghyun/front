<template>
  <section class="section wrap-breakdown">
    <h3>결제수단</h3>
    <!-- START : 결재통합 -->
    <PaySheet ref="addPayTdrSheet"
              :ordId="ordId"
              :totAmt="Number(addTdrInfo.addTdrTotAmt)"
              :payCallType="payCallType"
              :productNm="productNm"
              :gsNPoint="Number(gsNPointDcAmt)"
              :payBtnNone="true"
              @orderProcess="orderProcess"
              @CashReceiptIssueEvent="CashReceiptIssueEvent"/>
    <!-- END : 결재통합 -->
  </section>
</template>
<script>
import PaySheet from '@/views/od/PaySheet.vue';
import ClaimMsg from '@/components/mypage/cs/ClaimMsg.vue';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';
import OrderMsg from "@/components/order/OrderMsg";
export default {
  name: "ClaimAddPayment",
  data() {
    return {
      gsNPointDcAmt: 0, // 잔여 GS&POINT(사용하는 gsNpoint 정보)
      payCallType: ['01', '02', '99'], // PaySheet의 결제 tab 호출방식 (01: 신용카드, 02: 계좌이체)
      productNm: ClaimMsg.productNmPay,
      cashRcpctInfo: {
        cashRecptIssuYn: 'N', // 현금영수증발행여부
        cashRecptIssuTypeCd: '1', // 현금영수증발행유형코드 소득공제1/지출증빙2
        cashRecptInputNo: '', // 현금영수증입력번호
      }, // 현금영수증 발행여부
      validationChk: true, // 결재전 상위컴포넌트 validation값
      pytcTrmnId: '', // 결제사터미널ID
      pytcCd: '', // 결제사코드
      pytcNm: '', // 결제사명
    };
  },
  props: {
    ordId: String,
    addTdrInfo: Object,
  },
  mixins: [],
  components: {
    PaySheet, // 통합결제
  },
  methods: {
    todayDt() {
      return DateUtils.format(DateUtils.getToday(), 'YYYYMMDD');
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    async sendPayAuth() {
      this.$refs.addPayTdrSheet.resetPayStatus(true); // 결제모듈 상태 초기화
      this.$refs.addPayTdrSheet.orderPaymentProc();
    },
    async orderProcess(rqForm, rsForm) {
      const payType = rqForm.payType;
      const iOrderRequest = {};
      // 공통파라미터 Set
      iOrderRequest.ordId = rqForm.orderNo; // 주문번호
      iOrderRequest.ordDt = this.todayDt(); // 주문일자
      iOrderRequest.goodsName = rqForm.goods_name; // 상품명
      iOrderRequest.goodsCnt = rqForm.goods_cnt; // 상품수
      iOrderRequest.amt = rqForm.goods_price; // 금액
      iOrderRequest.taxFreeAmt = rqForm.totalTaxfreeAmt; // 면세대상금액
      iOrderRequest.taxableAmt = rqForm.totalTaxableAmt; // 과세대상금액
      iOrderRequest.taxfreeRate = rqForm.totTaxfreeRate; // 면세율 0원결제시사용
      iOrderRequest.taxableRate = rqForm.totTaxableRate; // 과세율 0원결제시사용
      iOrderRequest.tax = rqForm.totalVatAmt; // 부가세
      iOrderRequest.totItemAmt = rqForm.goods_price; // 상품총금액
      iOrderRequest.totItemTaxAmt = rqForm.goods_price; // 총상품과세금액
      iOrderRequest.totItemFTaxAmt = rqForm.totalTaxfreeAmt; // 총상품비과세금액
      iOrderRequest.totItemVatAmt = rqForm.totalVatAmt; // 총상품부가세금액
      iOrderRequest.buyerName = rqForm.buyer_name; // 구매자명
      iOrderRequest.buyerTel = rqForm.buyer_tel; // 구매자연락처
      iOrderRequest.mallUserID = rqForm.memNo; // 구매자회원번호
      iOrderRequest.deviceType = rqForm.deviceType; // 디바이스

      // 데이터 전처리
      iOrderRequest.addPayYn = 'Y'; // 추가결제 여부

      if (payType == "02") { // 신용카드
        iOrderRequest.mid = this.isNotEmpty(this.pytcTrmnId) ? this.pytcTrmnId : rsForm.mid; // mid (치환)
        iOrderRequest.urlHashKey = rsForm.hashKey; // hashKey
        iOrderRequest.payType = payType; // 결제수단
        iOrderRequest.affName = rqForm.aff_name; // 상점명
        iOrderRequest.payCompany = this.isNotEmpty(this.pytcCd) ? this.pytcCd : rqForm.payCompanyCd; // 결제사코드 (치환)
        iOrderRequest.payCompanyNm = this.isNotEmpty(this.pytcNm) ? this.pytcNm : rqForm.payCompany; // 결제사명 (치환)
        iOrderRequest.authType = rqForm.mobilCertReqTypeCd; // 신용카드결제타입
        iOrderRequest.cardAuthType = rsForm.authType; // 카드인증유형코드
        iOrderRequest.formBankCd = rqForm.pytcApprCardCd; // 승인카드사코드
        iOrderRequest.cardCode = rqForm.cardCode;
        iOrderRequest.orderCardname = rqForm.orderCardname; // 카드사명
        iOrderRequest.cardInterest = rqForm.noint_inf; // 무이자할부정보
        iOrderRequest.cardQuota = rqForm.quota_inf; // 할부개월수
      } else if (payType == "01") { // 계좌이체
        iOrderRequest.mid = rsForm.mid; // mid
        iOrderRequest.tid = rsForm.userKey; // tid
        iOrderRequest.urlHashKey = rsForm.hashKey; // hashKey
        iOrderRequest.authType = rqForm.authType; // 결제타입
        iOrderRequest.payType = payType; // 결제수단
        iOrderRequest.affName = rqForm.aff_name; // 상점명
        iOrderRequest.payCompany = rqForm.payCompanyCd; // 결제사코드
        iOrderRequest.payCompanyNm = rqForm.payCompany; // 결제사명
        iOrderRequest.buyerEmail = rqForm.email; // 구매자이메일
        iOrderRequest.orderCashRcpctDto = this.cashRcpctInfo; // 현금영수증
      } else if (payType == "99") { // GS&POINT
        if (this.gsNPointDcAmt > 0) { // GS&POINT
          iOrderRequest.orderDcGsPntDto = {
            gsNPointDcAmt: rqForm.goods_price,
            useGsNPoint: rqForm.useGsNPoint,
          };
          iOrderRequest.amt = 0; // 금액 재세팅
        }
      }
      this.$emit('saveOrdClaimAcept', iOrderRequest, this.cashRcpctInfo);
    },
    // 현금영수증발행 이벤트
    CashReceiptIssueEvent: function(cashRcpctInfo) {
      this.cashRcpctInfo = cashRcpctInfo;
    },
    async __validation() {
      // 추가결제금액이 없는 경우
      if (this.addTdrInfo.addTdrTotAmt > 0) {
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
      if (this.addTdrInfo.addTdrTotAmt > this.gsNPointDcAmt) {
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
    // 주문에 대한 원결제내역 조회
    async retrieveOrgPaymentInfo() {
      const params = {
        ordId: this.ordId
      };
      await ApiUtils
      .get('/fo/cs/claimmgnt/claim-org-payment-info', params)
      .then( res => {
        if (res.data.data !== null) {
          this.pytcTrmnId = res.data.data.pytcTrmnId;
          this.pytcCd = res.data.data.pytcCd;
          this.pytcNm = res.data.data.pytcNm;
        }
      })
      .catch( err => {
        console.error("Error retrieveAddPaymentAmt method.");
        this.$gsdialog.alert(ClaimMsg.invalidAddPayment);
      });
    },
    // GS&POINT 조회
    getGsNPoint() {
      ApiUtils
      .get('/fo/cu/mbrmgnt/gs-point')
      .then( res => {
        if (res.data.data === null || res.data.statusCode === 'NOK') {
          // TODO 확인 필요
          this.gsNPointDcAmt = 0;
        }
        this.gsNPointDcAmt = res.data.data.totRestPt;
      })
      .catch( error => {
        this.gsNPointDcAmt = 0;
        console.error("Error getGsNPoint method.");
      });
    },
  },
  mounted() {
    // 원결제내역 조회
    this.retrieveOrgPaymentInfo();
    // GS&POINT 조회
    this.getGsNPoint();
  },
};
</script>
