<!--
views/ss/SC-FO-SS-GF-MS-917.vue
-->
<template>
  <div class="wrap-dalidream" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="달리드림 멤버십 선물함" :tabbar="false" />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap">
        <!-- START : 메시지 영역 -->
        <section class="payment-gift section-area">
          <!-- <strong class="to-name">TO. {{ 동백이 }} (010-***-1234)</strong> -->
          <strong
            class="to-name"
            v-if="this.sendTyp == 'tabMobilePhone'"
          >TO. {{ kname(this.selecNm) }} ({{ phoneMask(this.selecTel) }})</strong>
          <strong
            class="to-name"
            v-if="this.sendTyp != 'tabMobilePhone'"
          >TO. {{ kname(this.selecNm) }}</strong>
          <div class="gift-msg-area">
            <!-- <p class="txt">동백아 건강 챙겨~! <br> 이거 써봐 좋아~!! <br> 우리 다음에 만나서 놀자~!!</p> -->
            <p class="txt">{{ this.selecMsg }}</p>
          </div>
          <p class="expiry-date">
            달리드림 멤버십 {{ this.selecTyp * 30 }}일 회원권
            <span class="num-price">
              <strong>{{ comma(this.totSum) }}원</strong>
            </span>
          </p>
        </section>
        <!-- START : 결재통합 -->
        <section class="section-area">
          <div class="sub-title border">
            <h2>결제 수단</h2>
          </div>
          <!-- START : 결재통합 -->
          <PaySheet
            ref="paySheet"
            :ordId="ordId"
            :totAmt="totPayAmt"
            :payCallType="payCallType"
            :strInfo="strInfo"
            :productMbr="productMbr"
            :productNm="productNm"
            :payBtnPass="payBtnPass"
            @__validation="__validation"
            @orderProcess="orderProcess"
          />
        </section>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import NumberUtils from '@/common/NumberUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import DateUtils from '@/common/DateUtils';
import PaySheet from '@/views/od/PaySheet.vue';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import LoginUtils from '@/common/LoginUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'DaliPaymentGift',
  mixins: [],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '멤버십 선물함 < 달리살다 멤버십 < 마이페이지 < %s',
  },
  data() {
    return {
      popup: {
        // 팝업
        open: false,
      },
      ordId: '',
      selecTyp: '',
      sendTyp: '',
      sendNm: '',
      sendTel: '',
      sendNo: '',
      selecNm: '',
      selecTel: '',
      selecTelPre: '',
      selecTelStr: '',
      selecMsg: '',
      skuId: '23450017464950001',
      goodsCode: '2345001746495',
      goodsName: '유료멤버십',
      mallId: CookieUtils.getMallId(),
      totSum: 0,
      sendUrl: '',
      rcvMemInfo: [],
      // 결재
      productMbr: {},
      productNm: '유료멤버십',
      payBtnPass: true,
      //
      ordsInfo: {
        ordId: null, // 주문ID
        ordsStandDttm: null, // 주문서기준일시
        multDlvpYn: 'N', // 다중배송지여부
        ofsItemProcSpCd: 'D', // 결품처리구분코드
        ordRecptIssuYn: 'N', // 주문영수증발행여부
        upasVal: 'M', // 개인통관고유부호값
      }, // 주문서정보
      ordsDlvpInfo: {}, // 배송지정보
      ordsDlvpSeqno: 0, // 주문서배송지일련번호
      pickupFlag: true,
      adrsTelRlfYn: 'N', // 안심번호 신청여부
      defaultFreeGiftList: [], // 기본사은품 목록
      freeGift: [], // 사은품 목록
      pickupCenterFlag: false,
      strInfo: null, // 픽업매장정보
      ordsItemList: {}, // 주문서상품목록
      productItems: [], // 상품 아이템 목록
      ordsItemDcSate: {}, // 할인내역
      ordsItemInfo: {}, // 상품쿠폰대상상품
      resvDelivInfor: null, // 예약배송안내
      todayDelivInfor: null, // 당일배송안내
      abrdDelivInfor: null, // 해외배송안내
      payNoticeList: [],
      delivRequest: null, // 배송요청사항(상품수령위치, 결품발생시처리방법,영수증수령방법)
      totalDcAmt: 0, // 총 할인금액
      crcoEvntInfo: null, // 선택된 카드할인정보
      resPntForm: null, // 선택된 통신사할인정보
      gsNPointDcAmt: 0, // 사용하는 gsNpoint 정보
      popRwdDcAmt: 0,
      totPrdAmt: 0, // 주문금액
      totDelivFee: 0,
      totPayAmt: 0, // 최종 결제금액
      pntUseAmt: 50000, // 포인트사용가능상품금액 TO-DO 포인트사용가능금액 확인
      paymentDate: null,
      orderSheetForm: null, // 결제정보 처리
      cashRcpctInfo: {
        cashRecptIssuYn: 'N', // 현금영수증발행여부
        cashRecptIssuTypeCd: '1', // 현금영수증발행유형코드 소득공제1/지출증빙2
        cashRecptInputNo: '', // 현금영수증입력번호
      }, // 현금영수증 발행여부
      mbrGrd: false, // 회원등급
      ordsDelivGrpInfo: null, // 배송지, 배송정보
      payCardIspKBFlag: false,
      validationChk: true, // 결재전 상위컴포넌트 validation값
      payCallType: ['02'], // 결제방식 세팅시 필요 안넘기면 전체 나옴
      loginYn: LoginUtils.isLogin(),
      ordTypeCd: '20', // 일반10 선물하기20
      // giftTrcPinNo: '',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    SubDefaultHeader, // 헤더
    // PaymentNormal, // 간편, 일반결제
    Footer, // 푸터
    PaySheet,
  },
  methods: {
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    todayDt() {
      return DateUtils.format(DateUtils.getToday(), 'YYYYMMDD');
    },
    // 현금영수증발행 이벤트
    CashReceiptIssueEvent: function (cashRcpctInfo) {
      // this.cashRcpctInfo = cashRcpctInfo;
      this.cashRcpctInfo = null;
    },
    phoneMask(phone) {
      const hplen = phone.length - 4;
      return phone.substring(0, 3) + '-****-' + phone.substring(hplen);
    },
    kname(knm) {
      let rtn = '';
      if (knm.length > 4) {
        rtn = knm.substring(0, 4) + '..';
      } else {
        rtn = knm;
      }
      return rtn;
    },
    isValidation: function () {
      let success = true;
      if (StringUtils.isEmpty(StringUtils.trim(this.selecTyp))) {
        success = false;
      } else if (
        this.sendTyp == 'tabMobilePhone' &&
        StringUtils.isEmpty(StringUtils.trim(this.selecNm))
      ) {
        success = false;
      } else if (
        this.sendTyp == 'tabMobilePhone' &&
        StringUtils.isEmpty(StringUtils.trim(this.selecTel))
      ) {
        success = false;
      } else if (StringUtils.isEmpty(StringUtils.trim(this.selecMsg))) {
        success = false;
      }
      if (success) {
        return success;
      } else {
        this.$gsdialog.alert('오류가 발생했습니다.1');
      }
    },
    async __validation() {
      this.validationChk = true;
    },
    // 주문서정보조회
    async retrieveOrdsInfo() {
      const iOrdsInfoInq = {
        ordId: this.ordId,
      };
      const response = await ApiUtils.get(
        '/fo/od/ordsmgnt/ordersheet',
        iOrdsInfoInq
      );
      const ordsInfo = response.data.data;

      if (ordsInfo !== null && ordsInfo.ordId !== null) {
        this.ordsInfo = ordsInfo;
      }
    },
    async orderProcess(rqForm, rsForm) {
      const payType = rqForm.payType;
      const iOrderRequestInputDto = {};
      iOrderRequestInputDto.ordId = rqForm.orderNo; // 주문번호
      iOrderRequestInputDto.ordTypeCd = this.ordTypeCd; // 주문방식코드
      iOrderRequestInputDto.ordDt = this.todayDt(); // 주문일자
      iOrderRequestInputDto.goodsName = this.goodsName; // 상품명
      iOrderRequestInputDto.productNm = this.goodsName; // 상품명
      iOrderRequestInputDto.goodsCnt = this.selecTyp; // 상품수 수량 추가 원복
      // iOrderRequestInputDto.goodsCnt = 1; // 상품수 -> 무조건 1로
      iOrderRequestInputDto.amt = this.totPayAmt; // 금액
      iOrderRequestInputDto.totItemAmt = this.totPayAmt; // 총금액
      iOrderRequestInputDto.totItemTaxAmt = Math.round(this.totPayAmt / 1.1);
      iOrderRequestInputDto.totItemFTaxAmt = 0;
      iOrderRequestInputDto.totItemVatAmt =
        this.totPayAmt - Math.round(this.totPayAmt / 1.1);
      iOrderRequestInputDto.taxFreeAmt = 0; // 면세대상금액
      // iOrderRequestInputDto.taxableAmt = Math.round(3900 / 1.1); // 과세대상금액 수량 추가 원복 -> 무조건 1로
      iOrderRequestInputDto.taxableAmt = Math.round(this.totPayAmt / 1.1); // 과세대상금액
      iOrderRequestInputDto.taxfreeRate = 0; // 면세율 0원결제시사용
      iOrderRequestInputDto.taxableRate = 100; // 과세율 0원결제시사용
      // iOrderRequestInputDto.tax = 3900 - Math.round(3900 / 1.1); // 부가세 수량 추가 원복 -> 무조건 1로
      iOrderRequestInputDto.tax =
        this.totPayAmt - Math.round(this.totPayAmt / 1.1);
      iOrderRequestInputDto.buyerName = rqForm.buyer_name; // 구매자명
      iOrderRequestInputDto.buyerTel = rqForm.buyer_tel; // 구매자연락처
      iOrderRequestInputDto.mallUserID = sessionStorage.getItem('sendNo'); // 구매자회원번호
      iOrderRequestInputDto.deviceType = rqForm.deviceType; // 디바이스
      iOrderRequestInputDto.goodsCode = this.goodsCode;
      iOrderRequestInputDto.skuId = this.skuId;
      iOrderRequestInputDto.mallId = this.mallId;
      iOrderRequestInputDto.chanlId = '7';
      iOrderRequestInputDto.storId = '3010';
      iOrderRequestInputDto.payBtnPass = 'true';
      if (this.totPayAmt > 0) {
        if (payType == '02') {
          // 신용카드
          iOrderRequestInputDto.mid = rsForm.mid; // mid
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.affName = rqForm.aff_name; // 상점명
          iOrderRequestInputDto.payCompany = rqForm.payCompanyCd; // 결제사코드
          iOrderRequestInputDto.payCompanyNm = rqForm.payCompany; // 결제사명
          iOrderRequestInputDto.authType = rqForm.mobilCertReqTypeCd; // 신용카드결제타입
          iOrderRequestInputDto.cardAuthType = rsForm.authType; // 카드인증유형코드
          iOrderRequestInputDto.formBankCd = rqForm.pytcApprCardCd; // 승인카드사코드
          iOrderRequestInputDto.cardCode = rqForm.cardCode;
          iOrderRequestInputDto.orderCardname = rqForm.orderCardname; // 카드사명
          iOrderRequestInputDto.cardInterest = rqForm.noint_inf; // 무이자할부정보
          iOrderRequestInputDto.cardQuota = rqForm.quota_inf; // 할부개월수
        }
      }
      // 주문 등록
      const response = await ApiUtils.put(
        '/fo/od/mbrShip/order-pay-proc',
        iOrderRequestInputDto
      );
      if (response.data.statusCode === '0000') {
        this.sendSms();
      } else {
        return this.$gsdialog.alert(OrderMsg.payFail);
      }
    },
    async sendSms() {
      const InputDto = {
        pmbsTdrNo: this.ordId,
      };
      const result = await ApiUtils.post(
        '/fo/cu/pmbsmgnt/paidmembership-coupon-dispatch-callback',
        InputDto
      );
      this.$router.push('/cu/pbms_send_gift_complete');
    },
    async getMemInfo() {
      const resultMemInfo = await ApiUtils.get(
        '/fo/cu/mbrmgnt/member-information',
        null
      );
      this.rcvMemInfo = resultMemInfo.data.data;
      this.mbrGrd = resultMemInfo.data.data.mbrTypeCd === '01' ? true : false;
    },
  },
  mounted() {
    if (sessionStorage.getItem('pmbsTdrNo') != '') {
      this.ordId = sessionStorage.getItem('pmbsTdrNo');
      this.selecTyp = sessionStorage.getItem('selecTyp');
      this.selecNm = sessionStorage.getItem('selecNm');
      this.selecTel = sessionStorage.getItem('selecTel');
      this.selecMsg = sessionStorage.getItem('selecMsg');
      this.selecTelPre = sessionStorage.getItem('selecTelPre');
      this.sendTyp = sessionStorage.getItem('sendTyp');
      this.productMbr.adrsNm = sessionStorage.getItem('sendNm');
      this.productMbr.adrsMoblTelNo = sessionStorage.getItem('sendTel');
      this.productMbr.cmmMbrNo = sessionStorage.getItem('sendNo');
      //
      if (this.sendTyp == 'tabMobilePhone') {
        this.dsptChanlTypeCd = '00';
      } else {
        this.dsptChanlTypeCd = '01';
      }
      // this.selecTel = '**** - ' + (this.selecTel).substring(4, 7);
      const len = this.selecTel.length;
      const n = this.selecTel;
      if (len > 6 && len < 11) {
        // this.selecTel = n.substring(3, 6)+" - "+n.substring(6);
        this.selecTelStr = '**** - ' + n.substring(6);
      } else if (len == 11) {
        // this.selecTel = n.substring(3, 7)+" - "+n.substring(7);
        this.selecTelStr = '**** - ' + n.substring(7);
      }
      this.totSum = this.selecTyp * 3900;
      this.totPayAmt = this.totSum;
    } else {
      this.$gsdialog.alert('오류가 발생했습니다');
    }
    if (this.loginYn === true) {
      this.getMemInfo(); // 회원등급조회
    } else {
      this.$gsdialog.alert(OrderMsg.loginFail);
    }
  },
};
</script>
