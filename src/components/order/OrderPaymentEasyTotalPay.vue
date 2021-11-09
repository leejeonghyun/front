<template>
    <div id="payEasyTotalPayFlag" :class="deviceTypeChk() === true ? 'wrap-full-popup' : ''" :role="deviceTypeChk() === true ? 'dialog' : ''" :aria-modal="deviceTypeChk()">
      <div>
        <div v-if="deviceTypeChk() === true" class="header-popup">
          <strong>결제하기</strong>
        </div>
        <!-- START : 본문 -->
        <div class="full-popup-body scroll-area">
        <form class="form-horizontal" id="reqEasyPayAuthForm" name="reqEasyPayAuthForm" method="post" action="">
          <input type="hidden" name="deviceType" id="deviceType" v-model="reqAuthForm.deviceType" /> <!-- PC or Mob -->
          <input type="hidden" id="userId" name="userId" v-model="reqAuthForm.userId" > <!-- 회원번호 -->
          <input type="hidden" id="buyerName" name="buyerName" v-model="reqAuthForm.buyerName" > <!-- 결제자명 -->
          <input type="hidden" id="buyerTel" name="buyerTel" v-model="reqAuthForm.buyerTel" > <!-- 결제자연락처 -->
          <input type="hidden" id="buyerEmail" name="buyerEmail" v-model="reqAuthForm.buyerEmail" > <!-- 결제자이메일 -->
          <input type="hidden" id="easyPayType" name="easyPayType" v-model="reqAuthForm.easyPayType" > <!-- 간편결제사선택 -->
          <input type="hidden" id="mid" name="mid" v-model="reqAuthForm.mid" > <!-- mid (SellerKey, cId) GSFPCOTT1 TC0ONETIME -->
          <input type="hidden" id="includePaymentMethodCodes" name="includePaymentMethodCodes" v-model="reqAuthForm.includePaymentMethodCodes" > <!-- 사용결제수단 리스트 -->
          <input type="hidden" id="useCardList" name="useCardList" v-model="reqAuthForm.useCardList" > <!-- 사용가능 카드사 -->
          <input type="hidden" id="clientId" name="clientId" v-model="reqAuthForm.clientId" > <!-- 연동채널 사이트 코드별 발급받은 clientId -->
          <input type="hidden" id="clientSecret" name="clientSecret" v-model="reqAuthForm.clientSecret" > <!-- 연동채널 사이트 코드별 발급받은 clientSecret -->
          <input type="hidden" id="channelCd" name="channelCd" v-model="reqAuthForm.channelCd" > <!-- 연동채널코드[이커머스] -->
          <input type="hidden" id="ordId" name="ordId" v-model="reqAuthForm.ordId" > <!-- 주문번호 -->
          <input type="hidden" id="orderTitle" name="orderTitle" v-model="reqAuthForm.orderTitle" > <!-- 주문타이틀 -->
          <input type="hidden" id="productName" name="productName" v-model="reqAuthForm.productName" > <!-- 상품명 -->
          <input type="hidden" id="totalPaymentAmt" name="totalPaymentAmt" v-model="reqAuthForm.totalPaymentAmt" > <!-- 결제요청금액 -->
          <input type="hidden" id="totalTaxfreeAmt" name="totalTaxfreeAmt" v-model="reqAuthForm.totalTaxfreeAmt" > <!-- 면세대상금액 -->
          <input type="hidden" id="totalTaxableAmt" name="totalTaxableAmt" v-model="reqAuthForm.totalTaxableAmt" > <!-- 과세대상금액 -->
          <input type="hidden" id="totalVatAmt" name="totalVatAmt" v-model="reqAuthForm.totalVatAmt" > <!-- 부가가치세 총합 -->
          <input type="hidden" id="totalServiceAmt" name="totalServiceAmt" v-model="reqAuthForm.totalServiceAmt" > <!-- 봉사료 총합 -->
          <input type="hidden" id="orderMethod" name="orderMethod" v-model="reqAuthForm.orderMethod" > <!-- 결제유형 -->
          <input type="hidden" id="showMobileTopGnbYn" name="showMobileTopGnbYn" v-model="reqAuthForm.showMobileTopGnbYn" > <!-- 모바일 상단 GNB 노출여부 -->
          <input type="hidden" id="reqUrl" name="reqUrl" v-model="reqAuthForm.reqUrl" > <!-- request url -->
          <input type="hidden" id="rtnUrl" name="rtnUrl" v-model="reqAuthForm.callbackUrl" > <!-- callback url -->
          <input type="hidden" id="payCorpCd" name="payCorpCd" v-model="reqAuthForm.payCorpCd"/>
          <input type="hidden" id="checkRegistNoYn" name="checkRegistNoYn" v-model="reqAuthForm.checkRegistNoYn"/>
          <input type="hidden" id="encodingType" name="encodingType" v-model="reqAuthForm.encodingType"/>
          <input type="hidden" id="returnUrl" name="returnUrl" v-model="reqAuthForm.callbackUrl"/>
          <input type="hidden" id="returnUrlParam" name="returnUrlParam" v-model="reqAuthForm.returnUrlParam"/>
          <input type="hidden" id="runtimeMode" name="runtimeMode" v-model="reqAuthForm.naverpayRuntimeMode"/>
          <input type="hidden" id="openType" name="openType" value="page"/>
          <input type="hidden" id="moid" name="moid" v-model="reqAuthForm.ordId"/>
          <input type="hidden" id="orderChannel" name="orderChannel" v-model="reqAuthForm.orderChannel"/>
          <input type="hidden" id="inAppYn" name="inAppYn" v-model="reqAuthForm.inAppYn" > <!-- 인앱 결제 여부 -->
          <input type="hidden" id="appOsType" name="appOsType" v-model="reqAuthForm.appOsType" > <!-- 사용자 앱 Client OS -->
          <input type="hidden" id="appUrlWithScheme" name="appUrlWithScheme" v-model="reqAuthForm.appUrlWithScheme" > <!-- 인앱 결제 시 리턴될 애플리케이션의 URL Scheme -->
        </form>
        <form class="form-horizontal" id="resEasyPayAuthForm" name="resEasyPayAuthForm" action="" method="POST">
          <input type="hidden" id="resultCode" name="resultCode" v-model="resAuthForm.resultCode" > <!-- resultCode -->
          <input type="hidden" id="resultMsg" name="resultMsg" v-model="resAuthForm.resultMsg" > <!-- resultMsg -->
          <input type="hidden" id="tid" name="tid" v-model="resAuthForm.tid" > <!-- tid -->
          <input type="hidden" id="tHistId" name="tHistId" v-model="resAuthForm.tHistId" > <!-- 결제이력번호 -->
          <input type="hidden" id="paymentCertifyToken" name="paymentCertifyToken" v-model="resAuthForm.paymentCertifyToken" > <!-- 인증토큰 -->
          <input type="hidden" id="orderCertifyKey" name="orderCertifyKey" v-model="resAuthForm.orderCertifyKey" > <!-- 결제완료키(취소비밀번호) -->
          <input type="hidden" id="ordId" name="ordId" v-model="resAuthForm.ordId" > <!-- 주문ID -->
          <input type="hidden" id="amt" name="amt" v-model="resAuthForm.amt" > <!-- 총구매금액 -->
          <input type="hidden" id="primaryPayAmount" name="primaryPayAmount" v-model="resAuthForm.primaryPayAmount" > <!-- 주결제수단 결제금액 -->
          <input type="hidden" id="npointPayAmount" name="npointPayAmount" v-model="resAuthForm.npointPayAmount" > <!-- 포인트 결제금액 -->
          <input type="hidden" id="goodsName" name="goodsName" v-model="resAuthForm.goodsName" > <!-- 상품명 -->
          <input type="hidden" id="cmmMbrNo" name="cmmMbrNo" v-model="resAuthForm.cmmMbrNo" > <!-- 커머스회원번호 -->
          <input type="hidden" id="authDate" name="authDate" v-model="resAuthForm.authDate" > <!-- 인증일자 -->
          <input type="hidden" id="merchantId" name="merchantId" v-model="resAuthForm.merchantId" > <!-- 가맹점아이디 -->
          <input type="hidden" id="merchantName" name="merchantName" v-model="resAuthForm.merchantName" > <!-- 가맹점명 -->
          <input type="hidden" id="admissionTypeCode" name="admissionTypeCode" v-model="resAuthForm.admissionTypeCode" > <!-- 결제승인유형 -->
          <input type="hidden" id="primaryPayMeans" name="primaryPayMeans" v-model="resAuthForm.primaryPayMeans" > <!-- 주결제수단 -->
          <input type="hidden" id="cardCorpCode" name="cardCorpCode" v-model="resAuthForm.cardCorpCode" > <!-- 주결제수단카드사 -->
          <input type="hidden" id="cardNo" name="cardNo" v-model="resAuthForm.cardNo" > <!-- 신용카드번호 -->
          <input type="hidden" id="cardAuthNo" name="cardAuthNo" v-model="resAuthForm.cardAuthNo" > <!-- 카드승인번호 -->
          <input type="hidden" id="cardInstCount" name="cardInstCount" v-model="resAuthForm.cardInstCount" > <!-- 할부개월수 -->
          <input type="hidden" id="bankCorpCode" name="bankCorpCode" v-model="resAuthForm.bankCorpCode" > <!-- 주결제수단은행 -->
          <input type="hidden" id="bankAccountNo" name="bankAccountNo" v-model="resAuthForm.bankAccountNo" > <!-- 계좌번호 -->
        </form>
        <div class="frame-div" style="display:none" id="frame_div">
          <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="500px;" align="center" scrolling="yes" style="transform: translate(0px, 0px) scale(1) translateZ(0px);"/>
        </div>
      </div>
      <!-- END : 본문 -->
      <button class="btn-layer-close" @click="popupAction">
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
</template>

<script>
import CommAuth from '@/views/pa/common/CommAuth';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';

export default {
  props: {
    orderSheetForm: Object,
  },
  name: "EasyTotalPayAuth",
  data() {
    return {
      sticky: true,
      activeIndex: 11, // GNB 활성화
      reqAuthForm: {
        deviceType: "",
        userId: "",
        buyerName: "",
        buyerTel: "",
        buyerEmail: "",
        easyPayType: "",
        payCorpCd: "",
        mid: "",
        includePaymentMethodCodes: "",
        useCardList: "",
        clientId: "",
        clientSecret: "",
        channelCd: "",
        paycoIsseChannelCd: "",
        kakaopayIsseChannelCd: "",
        naverpayIsseChannelCd: "",
        ordId: "",
        orderTitle: "",
        productName: "",
        totalPaymentAmt: "",
        totalTaxfreeAmt: 0,
        totalTaxableAmt: 0,
        totalVatAmt: 0,
        totalServiceAmt: 0,
        orderMethod: "EASYPAY_F",
        showMobileTopGnbYn: "Y",
        checkRegistNoYn: "N",
        encodingType: "UTF-8",
        naverpayRuntimeMode: "development",
        returnUrlParam: "",
        reqUrl: "",
        pcReqUrl: "",
        mobReqUrl: "",
        callbackUrl: "",
        pcCallbackUrl: "",
        mobCallbackUrl: "",
        easyPayInfoType: "",
        cardInfoCode: "",
        orderChannel: "PC",
        inAppYn: "N",
        appOsType: "",
        appUrlWithScheme: ""
      },
      resAuthForm: {
        resultCode: "",
        resultMsg: "",
        ordId: "",
        tid: "",
        tHistId: "",
        paymentCertifyToken: "",
        orderCertifyKey: "",
        amt: "",
        primaryPayAmount: "",
        npointPayAmount: "",
        goodsName: "",
        cmmMbrNo: "",
        authDate: "",
        merchantId: "",
        merchantName: "",
        admissionTypeCode: "",
        primaryPayMeans: "",
        cardCorpCode: "",
        cardNo: "",
        cardAuthNo: "",
        cardInstCount: "",
        bankCorpCode: "",
        bankAccountNo: "",
        hashKey: "",
        mid: ""
      }
    };
  },
  mixins: [
    CommAuth
  ],
  created() {
    // orderSheet페이지에서 전송된 데이터를 세팅한다.
    this.reqAuthForm.deviceType = this.orderSheetForm.deviceType;
    this.reqAuthForm.userId = this.orderSheetForm.memNo;
    this.reqAuthForm.buyerName = this.orderSheetForm.buyer_name;
    this.reqAuthForm.buyerTel = this.orderSheetForm.buyer_tel;
    this.reqAuthForm.buyerEmail = this.orderSheetForm.email;
    this.reqAuthForm.easyPayType = this.orderSheetForm.easyPayType;
    this.reqAuthForm.ordId = this.orderSheetForm.orderNo;

    // FIXME : AS-IS와 동일하게 페이코 주문ID 설정
    if (this.reqAuthForm.easyPayType === "PAYCO") {
      this.reqAuthForm.ordId = '999999999';
    }
    // FIXME : AS-IS와 동일하게 카카오페이 주문ID 설정
    if (this.reqAuthForm.easyPayType === "KAKAOPAY") {
      if (process.env.VUE_APP_MODE === 'production') {
        this.reqAuthForm.ordId = 'TEMP_PARTNER_ORDER_ID';
      } else {
        this.reqAuthForm.ordId = '999999999';
      }
    }
    this.reqAuthForm.orderTitle = this.orderSheetForm.goods_name;
    this.reqAuthForm.productName = this.orderSheetForm.goods_name;
    this.reqAuthForm.totalPaymentAmt = this.orderSheetForm.goods_price;
    this.reqAuthForm.totalTaxfreeAmt = this.orderSheetForm.totalTaxfreeAmt;
    this.reqAuthForm.totalTaxableAmt = this.orderSheetForm.totalTaxableAmt;
    this.reqAuthForm.totalVatAmt = this.orderSheetForm.totalVatAmt;
    this.reqAuthForm.productCount = this.orderSheetForm.goods_cnt;
    this.reqAuthForm.productItems = this.orderSheetForm.productItems;
    this.reqAuthForm.easyPayInfoType = this.orderSheetForm.easyPayInfoType;
    this.reqAuthForm.cardInfoCode = this.orderSheetForm.cardInfoCode;
    console.log("this.reqAuthForm : ", this.reqAuthForm);
  },
  watch: {
    resAuthForm: function() {
    }
  },
  mounted: async function() {
    const reqAuthForm = this.reqAuthForm;
    const resAuthForm = this.resAuthForm;
    const that = this;

    window.callbackFnc = function(hashKey) {
      that.resAuthForm.hashKey = hashKey;
      that.resAuthForm.mid = that.reqAuthForm.mid; // mid 필수
      let returnUrl = "";
      if (reqAuthForm.deviceType === 'PC') {
        returnUrl = reqAuthForm.pcCallbackUrl + "?hashKey=" + resAuthForm.hashKey;
      } else {
        returnUrl = reqAuthForm.mobCallbackUrl + "?hashKey=" + resAuthForm.hashKey;
      }

      let payCorpCd = "";
      if (reqAuthForm.easyPayType === "KAKAOPAY") {
        payCorpCd = "KAKAOPAY";
      } else if (reqAuthForm.easyPayType === "PAYCO") {
        payCorpCd = "PAYCO";
      }

      const data = {
        returnUrl: returnUrl,
        payCorpCd: payCorpCd
      };

      ApiUtils.post("/fo/pa/retrieveEasyPayAuthCallback", data).then(res => {
        // that.resAuthForm = res.data;
        // console.log(that.resAuthForm);
        that.resAuthForm.resultCode = res.data.resultCode;
        that.resAuthForm.resultMsg = res.data.resultMsg;
        that.resAuthForm.tid = res.data.reserveOrderNo;
        if (reqAuthForm.easyPayType === "PAYCO" || reqAuthForm.easyPayType === "KAKAOPAY") {
          that.resAuthForm.amt = res.data.totalPaymentAmt;
          that.resAuthForm.primaryPayAmount = res.data.normalPaymentAmt;
          // that.resAuthForm.ordId = reqAuthForm.ordId;
          that.resAuthForm.npointPayAmount = reqAuthForm.pointAmt;
          that.resAuthForm.goodsName = reqAuthForm.productName;

          // that.resAuthForm.merchantId = reqAuthForm.productName;
          // that.resAuthForm.merchantName = reqAuthForm.productName;
          // that.resAuthForm.admissionTypeCode = reqAuthForm.productName;
          that.resAuthForm.primaryPayMeans = reqAuthForm.mainPgCode;
          if (reqAuthForm.mainPgCode === "31") {
            that.resAuthForm.cardCorpCode = reqAuthForm.issueCorporationCode;
            // that.resAuthForm.cardNo = reqAuthForm.productName;
            // that.resAuthForm.cardAuthNo = reqAuthForm.productName;
            that.resAuthForm.cardInstCount = reqAuthForm.cardInstallmentMonthNumber;
          } else {
            that.resAuthForm.bankCorpCode = reqAuthForm.issueCorporationCode;
            // that.resAuthForm.bankAccountNo = reqAuthForm.productName;
          }
        }
        console.log("that.resAuthForm : ", that.resAuthForm);
        that.rsformCallback(res.data.resultCode);
      });
    };

    await ApiUtils
      .post('/fo/pa/easyPayInitAuth', {})
      .then(res => {
        console.log('res ::', res.data);
        reqAuthForm.clientId = res.data.naverpayClientId;
        reqAuthForm.naverpayClientId = res.data.naverpayClientId;
        reqAuthForm.paycoIsseChannelCd = res.data.paycoIsseChannelCd;
        reqAuthForm.kakaopayIsseChannelCd = res.data.kakaopayIsseChannelCd;
        reqAuthForm.naverpayIsseChannelCd = res.data.naverpayIsseChannelCd;
        reqAuthForm.naverpayRuntimeMode = res.data.naverpayRuntimeMode;
        reqAuthForm.pcReqUrl = res.data.easypayPcAuthUrl;
        reqAuthForm.mobReqUrl = res.data.easypayMobAuthUrl;
        reqAuthForm.pcCallbackUrl = res.data.easypayPcCallbackUrl;
        reqAuthForm.mobCallbackUrl = res.data.easypayMobCallbackUrl;
        reqAuthForm.inAppYn = res.data.inAppYn;
        reqAuthForm.appOsType = res.data.appOsType;
        reqAuthForm.appUrlWithScheme = res.data.appUrlWithScheme;

        if (reqAuthForm.easyPayType === "KAKAOPAY") {
          reqAuthForm.payCorpCd = reqAuthForm.easyPayType;
          // 신용카드=CARD, 계좌이체=MONEY
          reqAuthForm.includePaymentMethodCodes = reqAuthForm.easyPayInfoType;
          reqAuthForm.useCardList = this.reqAuthForm.cardInfoCode;
          reqAuthForm.channelCd = res.data.kakaopayIsseChannelCd;

          if (reqAuthForm.easyPayInfoType == 'CARD') {
            reqAuthForm.mid = res.data.kakaopayCardMid;
          } else {
            reqAuthForm.mid = res.data.kakaopayBankMid;
          }
        } else if (reqAuthForm.easyPayType === "PAYCO") {
          reqAuthForm.payCorpCd = reqAuthForm.easyPayType;
          if (reqAuthForm.easyPayInfoType == 'CARD') {
            // 신용카드 31, 포인트 98, 쿠폰 75, 카드사쿠폰 76, 계좌이체 35
            reqAuthForm.includePaymentMethodCodes = "31,98,75,76";
            // CCLG 신한, CCSS 삼성
            // console.log(this.reqAuthForm.cardInfoCode);
            reqAuthForm.useCardList = this.reqAuthForm.cardInfoCode;
            reqAuthForm.mid = res.data.paycoCardMid;
          } else {
            reqAuthForm.includePaymentMethodCodes = "35";
            reqAuthForm.mid = res.data.paycoBankMid;
          }
          reqAuthForm.channelCd = res.data.paycoIsseChannelCd;
        } else {
          console.log(reqAuthForm.easyPayType);
        }
        if (reqAuthForm.deviceType === "PC") {
          reqAuthForm.reqUrl = reqAuthForm.pcReqUrl;
          reqAuthForm.callbackUrl = reqAuthForm.pcCallbackUrl;
        } else {
          reqAuthForm.reqUrl = reqAuthForm.mobReqUrl;
          reqAuthForm.callbackUrl = reqAuthForm.mobCallbackUrl;
        }
      });
      this.reqAuthEasyPay(); // 간편결제 인증처리
  },
  methods: {
    popupAction() { // 닫기
      this.$emit('popupAction', 'payEasyTotalPayFlag');
    },
    deviceTypeChk() {
      let type = false;
      if (this.reqAuthForm.deviceType === 'MO') {
        type = true;
      } else if (this.reqAuthForm.deviceType === 'PC') {
        type = false;
      } else {
        type = false;
      }
      return type;
    },
    async reqAuthEasyPay() {
      const reqAuthForm = this.reqAuthForm;
      const resAuthForm = this.resAuthForm;
      const userId = reqAuthForm.userId;
      const easyPayType = reqAuthForm.easyPayType;
      const mid = reqAuthForm.mid;
      const clientId = reqAuthForm.clientId;
      const clientSecret = reqAuthForm.clientSecret;
      const ordId = reqAuthForm.ordId;
      const orderTitle = reqAuthForm.orderTitle;
      const productName = reqAuthForm.productName;
      const totalPaymentAmt = reqAuthForm.totalPaymentAmt;
      const totalTaxfreeAmt = reqAuthForm.totalTaxfreeAmt;
      const totalTaxableAmt = reqAuthForm.totalTaxableAmt;
      const totalVatAmt = reqAuthForm.totalVatAmt;
      const totalServiceAmt = reqAuthForm.totalServiceAmt;
      const reqUrl = reqAuthForm.reqUrl;
      const callbackUrl = reqAuthForm.callbackUrl;
      const productCount = reqAuthForm.productCount;
      const productItems = reqAuthForm.productItems;
      const that = this;

      if (StringUtils.isEmpty(userId)) {
        // alert("회원번호을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(easyPayType)) {
        // alert("간편결제사를 선택해주세요.");
        return;
      }

      if (StringUtils.isEmpty(mid)) {
        // alert("mid를 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(ordId)) {
        // alert("주문ID을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(orderTitle)) {
        // alert("주문타이틀을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(productName)) {
        // alert("상품명을 입력해주세요.");
        return;
      }

      if (totalPaymentAmt === '') {
        // alert("결제요청금액을 입력해주세요.");
        return;
      }

      if (totalTaxfreeAmt === '') {
        // alert("면세대상금액을 입력해주세요.");
        return;
      }

      if (totalTaxableAmt === '') {
        // alert("과세대상금액을 입력해주세요.");
        return;
      }

      if (totalVatAmt === '') {
        // alert("부가가치세를 입력해주세요.");
        return;
      }

      if (totalServiceAmt === '') {
        // alert("봉사료를 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(reqUrl)) {
        // alert("reqUrl을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(reqUrl)) {
        // alert("reqUrl을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(callbackUrl)) {
        // alert("callbackUrl을 입력해주세요.");
        return;
      }

      const data = {
        cmmMbrNo: userId,
        payCompany: reqAuthForm.easyPayType,
        authType: reqAuthForm.easyPayType,
        paySimpleType: "CARD"
      };
      // console.log(reqAuthForm.deviceType);
      await ApiUtils.post('/fo/pa/initAuthByLogin', data).then(res => {
        console.log(res.data);
        if (res.data !== null) {
          resAuthForm.hashKey = res.data.hashKey;
          if (reqAuthForm.easyPayType === "KAKAOPAY") {
            if (reqAuthForm.deviceType === 'PC') {
              reqAuthForm.callbackUrl = reqAuthForm.pcCallbackUrl;
            } else {
              reqAuthForm.callbackUrl = reqAuthForm.mobCallbackUrl;
              reqAuthForm.orderChannel = 'MOBILE'; // 모바일추가
            }
            reqAuthForm.returnUrlParam = res.data.orgHashKey;
          } else {
            if (reqAuthForm.deviceType === 'PC') {
              reqAuthForm.callbackUrl = reqAuthForm.pcCallbackUrl + '.hashKey_' + res.data.hashKey;
            } else {
              reqAuthForm.callbackUrl = reqAuthForm.mobCallbackUrl + '.hashKey_' + res.data.hashKey;
              reqAuthForm.orderChannel = 'MOBILE'; // 모바일추가
            }
          }
        }
      });
      let option = "";
      reqEasyPayAuthForm.action = reqAuthForm.reqUrl;
      reqEasyPayAuthForm.method = "post";
      if (reqAuthForm.easyPayType === "NAVERPAY") { // 네이버페이 모바일일경우 팝업
        option = "width=900, height=900";
      } else { // 카카오페이 페이코는 아이프레임
        option = "width=370, height=430";
        if (reqAuthForm.deviceType === "PC") {
          window.open("", "popup", option);
          reqEasyPayAuthForm.target = "popup";
        } else {
          document.getElementById('frame_div').style.display = 'block';
          reqEasyPayAuthForm.target = "MPI_FRAME";
          const windowWidth = $(window).width();
          const windowHeight = $(window).height() - 57;
          $('#MPI_FRAME').css({
            'width': windowWidth,
            'height': windowHeight
          });
        }
      }
      reqEasyPayAuthForm.submit();
    },
    async rsformCallback(resultCode) {
      let isFail = false;
      if (resultCode != "0000") {
        isFail = true;
      }
      const reqAuthForm = this.reqAuthForm;
      const resAuthForm = this.resAuthForm;
      if (reqAuthForm.easyPayType === "KAKAOPAY") {
        /* data = {
          channelType: deviceType,
          reserveOrderNo: resAuthForm.tid,
          paymentToken: resAuthForm.paymentCertifyToken,
          mid: reqAuthForm.mid,
          cmmMbrNo: reqAuthForm.userId,
          amt: resAuthForm.amt,
          taxableAmt: reqAuthForm.totalTaxableAmt,
          taxFreeAmt: reqAuthForm.totalTaxfreeAmt,
          tax: reqAuthForm.totalVatAmt,
          moid: reqAuthForm.ordId,
          buyerName: reqAuthForm.buyerName,
          buyerTel: reqAuthForm.buyerTel,
          buyerEmail: reqAuthForm.buyerEmail
        }; */
      } else if (reqAuthForm.easyPayType === "PAYCO") {
        /* data = {
          channelType: deviceType,
          reserveOrderNo: resAuthForm.tid,
          paymentToken: resAuthForm.paymentCertifyToken,
          mid: reqAuthForm.mid,
          cmmMbrNo: reqAuthForm.userId,
          moid: reqAuthForm.ordId,
          buyerName: reqAuthForm.buyerName,
          buyerTel: reqAuthForm.buyerTel,
          buyerEmail: reqAuthForm.buyerEmail
        }; */
      }
      this.$emit('orderPaymentCallBack', 'payEasyTotalPayFlag', isFail, this.resAuthForm);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
