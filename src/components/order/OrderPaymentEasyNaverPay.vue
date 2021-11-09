<template>
    <div id="easyTotalPayAuthNaver">
      <div>
        <!-- START : 본문 -->
        <div class="full-popup-body scroll-area">
        <form class="form-horizontal" id="reqEasyPayAuthNaverForm" name="reqEasyPayAuthNaverForm" method="post" action="">
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
        </form>
      </div>
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
  name: "EasyTotalPayAuthNaver",
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
        mid: "",
      }
    };
  },
  mixins: [
    CommAuth
  ],
  created() {
  },
  watch: {
  },
  mounted: async function() {
    this.doIncludeNaverpaySDK();
    const reqAuthForm = this.reqAuthForm;
    const resAuthForm = this.resAuthForm;
    const that = this;
  },
  methods: {
    async initPay() {
      // orderSheet페이지에서 전송된 데이터를 세팅한다.
      this.reqAuthForm.deviceType = this.orderSheetForm.deviceType;
      this.reqAuthForm.userId = this.orderSheetForm.memNo;
      this.reqAuthForm.buyerName = this.orderSheetForm.buyer_name;
      this.reqAuthForm.buyerTel = this.orderSheetForm.buyer_tel;
      this.reqAuthForm.buyerEmail = this.orderSheetForm.email;
      this.reqAuthForm.easyPayType = this.orderSheetForm.easyPayType;
      this.reqAuthForm.ordId = this.orderSheetForm.orderNo;
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
      const reqAuthForm = this.reqAuthForm;
      const resAuthForm = this.resAuthForm;

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
        if (reqAuthForm.easyPayType === "NAVERPAY") {
          payCorpCd = "NPAY";
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
          console.log("that.resAuthForm : ", that.resAuthForm);
          that.rsformCallback(res.data.resultCode);
        });
      };

      const that = this;
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

        if (reqAuthForm.easyPayType === "NAVERPAY") {
          reqAuthForm.payCorpCd = "NPAY";
          reqAuthForm.includePaymentMethodCodes = "";
          reqAuthForm.useCardList = "";
          reqAuthForm.channelCd = reqAuthForm.naverpayIsseChannelCd;
          // 네이버페이는 mid를 따로 연동하지 않고 채널코드와 동일하게 셋팅
          reqAuthForm.mid = reqAuthForm.naverpayIsseChannelCd;
          reqAuthForm.clientId = reqAuthForm.naverpayClientId;
          // 테스트 template에서만 노출
          // 실제 주문서에서는 노출하면 보안위배
          // 결제 및 취소 테스트를 위해 사용
          reqAuthForm.clientSecret = "pqSS1ZBWDW";
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

      if (reqAuthForm.easyPayType === "NAVERPAY" && StringUtils.isEmpty(clientId)) {
        // alert("네이버페이 clientId를 입력해주세요.");
        return;
      }

      if (reqAuthForm.easyPayType === "NAVERPAY" && StringUtils.isEmpty(clientSecret)) {
        // alert("네이버페이 clientSecret를 입력해주세요.");
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
      // console.log('easyPayType', reqAuthForm.easyPayType);
      if (reqAuthForm.easyPayType === "NAVERPAY") {
        // 네이버페이 인증UI SDK는 IE9.0미만은 미지원이므로 조건절 추가
        let isVersionOk = true;
        try {
          if (navigator.userAgent.indexOf("MSIE") >= 0 &&
              (navigator.userAgent.indexOf("Trident") < 0 || navigator.userAgent.indexOf("Trident/4.0") >= 0)) {
            isVersionOk = false;
          }
        } catch (e) {
          // skip
        }

        if (!isVersionOk) {
          alert("Internet Explorer 9.0미만버전 브라우저에서\n'네이버페이'로 결제를 진행할 수 없습니다.\n다른 결제수단 혹은 브라우저 업데이트를\n통해 결제를 진행해주세요.");
          return;
        }

        // 결제요청금액이 (과세대상금액+부가세+면세대상금액) 상이하면
        // 네이버페이 SDK 스크립트에서 오류가 발생하여 여기서 체크
        // (alert : 일시적 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.)
        if (parseInt(totalPaymentAmt) != parseInt(totalTaxableAmt) + parseInt(totalVatAmt) + parseInt(totalTaxfreeAmt)) {
          alert("인증 호출 오류입니다. 관리자에게 문의 바랍니다.\n(유효하지 않은 값 : totalPaymentAmt != totalTaxableAmt + totalVatAmt + totalTaxfreeAmt)");
          return;
        }

        if (parseInt(totalPaymentAmt) < 100) {
          alert("최소 결제금액은 100원 이상이여야 합니다.");
          return;
        }
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
          if (reqAuthForm.easyPayType === "NAVERPAY" && reqAuthForm.deviceType === "PC") {
            reqAuthForm.callbackUrl = reqAuthForm.pcCallbackUrl + '?hashKey=' + res.data.hashKey;
            resAuthForm.hashKey = res.data.hashKey;
          } else {
            if (reqAuthForm.deviceType === 'PC') {
              reqAuthForm.callbackUrl = reqAuthForm.pcCallbackUrl + '.hashKey_' + res.data.hashKey;
            } else {
              reqAuthForm.callbackUrl = reqAuthForm.mobCallbackUrl + '.hashKey_' + res.data.hashKey;
            }
          }
        }
      });

      if (reqAuthForm.easyPayType === "NAVERPAY" && reqAuthForm.deviceType === "PC") {
        /*
        네이버페이가 통합인증서버를 거친 새창에서 js 로드가 익스플로워만 제대로 이루어지지 않아 통합인증서버를 거치지 않고 네이버페이 인증UI호출
        NPay 인증UI js 호출
        SDK Naver Pay create parameter info
          mode                연동채널 사이트 코드별 실행모드, 개발(development)/운영(production)
          clientId            연동채널 사이트 코드별 발급받은 clientId
          openType            연동채널 사이트 코드별 UI OPEN TYPE(page or layer or popup)
                              2020/02/04 chrome samesite 쿠키정책에 따라 chrome browser에서 layer 미지원으로 popup으로 변경
                              윈도우에서 X 버튼으로 popup 을 종료하였을 때도 Layer 의 X 버튼 클릭시와 동일하게
                              onAuthorize callback 에 이벤트가 기존과 동일한 format( userCancel ) 으로 전달
          onAuthorize         결제 인증 결과 전달 이벤트핸들러
        SDK Naver Pay open parameter info
          merchantPayKey      가맹점 주문내역 확인 가능한 가맹점 결제번호 또는 주문번호
          merchantUserKey     가맹점의 사용자 키(개인 아이디와 같은 개인정보 데이터는 제외)
          productName         대표 상품명
          productCount        상품 수량(A 상품 2개 + B 상품 1개의 경우 3으로 전달)
          totalPayAmount      총 결제 금액. 최소 결제금액은 100원
          taxScopeAmount      과세 대상 금액. 과세 대상 금액 + 면세 대상 금액 = 총 결제 금액
          taxExScopeAmount    면세 대상 금액. 과세 대상 금액 + 면세 대상 금액 = 총 결제 금액
          returnUrl           결제 인증 결과 전달 URL
          productItems        상품정보 array
            categoryType
            categoryId
            uid
            name
            count
        */
        Naver.Pay.create({
          mode: reqAuthForm.naverpayRuntimeMode,
          clientId: clientId,
          openType: 'popup',
          onAuthorize: function(resData) {
              /*
              layer 타입을 사용했을 때 페이지 전환 없이 구현이 가능하도록 지원되며, 그 외의 경우는 returnUrl 로 참조 정보와 함께 redirect 됩니다.
              리턴 객체에는 결제 인증 결과와 전달한 returnUrl 정보가 함께 전달되며,
              이 정보는 이후 승인 요청 처리를 위한 정보 (resultCode, resultMessage, returnUrl, paymentId, reserveId 등) 입니다.
              전달되는 값은 https://developer.pay.naver.com/docs/v2/api#payments-payments_window 의 성공 & 실패 응답 값을 참조해주세요.
              */
              resAuthForm.resultCode = resData.resultCode;
              resAuthForm.resultMsg = resData.resultMessage;
              resAuthForm.tid = resData.paymentId;

              const url = "/fo/pa/easyPayAuthSdkCallbackPc";
              const data = {
                returnUrl: resData.returnUrl,
                payCorpCd: "NPAY",
                resultCode: resData.resultCode,
                resultMsg: resData.resultMessage,
                reserveOrderNo: resData.paymentId
              };

              ApiUtils.post(url, data).then(res => {
                resAuthForm.resultCode = res.data.resultCode;
                resAuthForm.resultMsg = res.data.resultMsg;
                resAuthForm.tid = resData.paymentId;
                resAuthForm.mid = that.reqAuthForm.mid; // mid 필수
                console.log(that);
                that.rsformCallback(res.data.resultCode);
              });
          }
        }).open({
          merchantPayKey: ordId,
          merchantUserKey: userId,
          productName: productName,
          productCount: productCount,
          totalPayAmount: parseInt(totalPaymentAmt),
          taxScopeAmount: parseInt(totalTaxableAmt) + parseInt(totalVatAmt),
          taxExScopeAmount: parseInt(totalTaxfreeAmt),
          returnUrl: reqAuthForm.callbackUrl,
          productItems: productItems,
        });
      } else {
        let option = "";
        reqEasyPayAuthNaverForm.action = reqAuthForm.reqUrl;
        reqEasyPayAuthNaverForm.method = "post";
        if (reqAuthForm.easyPayType === "NAVERPAY") { // 네이버페이 모바일일경우 팝업
          option = "width=900, height=900";
        }
        window.open("", "popup", option);
        reqEasyPayAuthNaverForm.target = "popup";
        reqEasyPayAuthNaverForm.submit();
      }
    },
    async rsformCallback(resultCode) {
      let isFail = false;
      if (resultCode != "0000") {
        isFail = true;
      }
      const reqAuthForm = this.reqAuthForm;
      const resAuthForm = this.resAuthForm;
      this.$emit('orderPaymentCallBack', 'payEasyTotalPayFlag', isFail, this.resAuthForm);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
