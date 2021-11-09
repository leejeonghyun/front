<template>
    <div id="easyTotalPayAuth" v-bind:class="[siteClass]">
      <PaSmTopMenu :activeIndex="activeIndex" :type="sticky ? 'sub': ''" />
      <!-- START : 본문 -->
      <div class="container">
        <form class="form-horizontal" id="reqEasyPayAuthForm" name="reqEasyPayAuthForm" method="post" action="">
          <fieldset>
            <legend>통합간편결제</legend>
            <!-- PC or Mob -->
            <div class="form-group">
              <label for="deviceType" class="col-lg-2">PC or Mob</label>
              <div class="col-lg-10">
                <select id="deviceType" name="deviceType" v-model="reqAuthForm.deviceType" class="form-control" @change="changeDeviceType">
                  <option v-for="option in deviceType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <!-- 회원번호 -->
            <div class="form-group">
              <label for="userId" class="col-lg-2">회원번호</label>
              <div class="col-lg-10">
                <input id="userId" name="userId" v-model="reqAuthForm.userId" class="form-control" placeholder="회원번호" >
              </div>
            </div>
            <!-- 결제자명 -->
            <div class="form-group">
              <label for="buyerName" class="col-lg-2">결제자명</label>
              <div class="col-lg-10">
                <input id="buyerName" name="buyerName" v-model="reqAuthForm.buyerName" class="form-control" placeholder="결제자명" >
              </div>
            </div>
            <!-- 결제자연락처 -->
            <div class="form-group">
              <label for="buyerTel" class="col-lg-2">결제자연락처</label>
              <div class="col-lg-10">
                <input id="buyerTel" name="buyerTel" v-model="reqAuthForm.buyerTel" class="form-control" placeholder="결제자연락처" >
              </div>
            </div>
            <!-- 결제자이메일 -->
            <div class="form-group">
              <label for="buyerEmail" class="col-lg-2">결제자이메일</label>
              <div class="col-lg-10">
                <input id="buyerEmail" name="buyerEmail" v-model="reqAuthForm.buyerEmail" class="form-control" placeholder="결제자이메일" >
              </div>
            </div>
            <!-- 간편결제사선택 -->
            <div class="form-group">
              <label for="easyPayType" class="col-lg-2">간편결제사선택</label>
              <div class="col-lg-10">
                <select id="easyPayType" name="easyPayType" v-model="reqAuthForm.easyPayType" class="form-control" @change="changeEasyPayType">
                  <option v-for="option in easyPayType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <!-- mid (SellerKey, cId) GSFPCOTT1 TC0ONETIME -->
            <div class="form-group">
              <label for="mid" class="col-lg-2">mid</label>
              <div class="col-lg-10">
                <input id="mid" name="mid" v-model="reqAuthForm.mid" class="form-control" placeholder="mid" >
              </div>
            </div>
            <!-- 사용결제수단 리스트 -->
            <div class="form-group">
              <label for="includePaymentMethodCodes" class="col-lg-2">사용결제수단 리스트</label>
              <div class="col-lg-10">
                <input id="includePaymentMethodCodes" name="includePaymentMethodCodes" v-model="reqAuthForm.includePaymentMethodCodes" class="form-control" placeholder="사용결제수단 리스트" >
              </div>
            </div>
            <!-- 사용가능 카드사 -->
            <div class="form-group">
              <label for="useCardList" class="col-lg-2">사용가능 카드사<br/>(신용카드Only)</label>
              <div class="col-lg-10">
                <input id="useCardList" name="useCardList" v-model="reqAuthForm.useCardList" class="form-control" placeholder="사용가능 카드사" >
              </div>
            </div>
            <!-- 연동채널 사이트 코드별 발급받은 clientId -->
            <div class="form-group">
              <label for="clientId" class="col-lg-2">연동채널 사이트 코드별 발급받은 clientId<br/>(NPAY Only)</label>
              <div class="col-lg-10">
                <input id="clientId" name="clientId" v-model="reqAuthForm.clientId" class="form-control" placeholder="연동채널 사이트 코드별 발급받은 clientId" >
              </div>
            </div>
            <!-- 연동채널 사이트 코드별 발급받은 clientSecret -->
            <div class="form-group">
              <label for="clientSecret" class="col-lg-2">연동채널 사이트 코드별 발급받은 clientSecret<br/>(NPAY Only)</label>
              <div class="col-lg-10">
                <input id="clientSecret" name="clientSecret" v-model="reqAuthForm.clientSecret" class="form-control" placeholder="연동채널 사이트 코드별 발급받은 clientSecret" >
              </div>
            </div>
            <!-- 연동채널코드[이커머스] -->
            <div class="form-group">
              <label for="channelCd" class="col-lg-2">연동채널코드</label>
              <div class="col-lg-10">
                <input id="channelCd" name="channelCd" v-model="reqAuthForm.channelCd" class="form-control" placeholder="연동채널코드" >
              </div>
            </div>
            <!-- 주문번호 -->
            <div class="form-group">
              <label for="ordId" class="col-lg-2">주문번호</label>
              <div class="col-lg-10">
                <input id="ordId" name="ordId" v-model="reqAuthForm.ordId" class="form-control" placeholder="주문번호" >
              </div>
            </div>
            <!-- 주문타이틀 -->
            <div class="form-group">
              <label for="orderTitle" class="col-lg-2">주문타이틀</label>
              <div class="col-lg-10">
                <input id="orderTitle" name="orderTitle" v-model="reqAuthForm.orderTitle" class="form-control" placeholder="주문타이틀" >
              </div>
            </div>
            <!-- 상품명 -->
            <div class="form-group">
              <label for="productName" class="col-lg-2">상품명</label>
              <div class="col-lg-10">
                <input id="productName" name="productName" v-model="reqAuthForm.productName" class="form-control" placeholder="상품명" >
              </div>
            </div>
            <!-- 결제요청금액 -->
            <div class="form-group">
              <label for="totalPaymentAmt" class="col-lg-2">결제요청금액</label>
              <div class="col-lg-10">
                <input id="totalPaymentAmt" name="totalPaymentAmt" v-model="reqAuthForm.totalPaymentAmt" class="form-control" placeholder="결제요청금액" >
              </div>
            </div>
            <!-- 면세대상금액 -->
            <div class="form-group">
              <label for="totalTaxfreeAmt" class="col-lg-2">면세대상금액</label>
              <div class="col-lg-10">
                <input id="totalTaxfreeAmt" name="totalTaxfreeAmt" v-model="reqAuthForm.totalTaxfreeAmt" class="form-control" placeholder="면세대상금액" >
              </div>
            </div>
            <!-- 과세대상금액 -->
            <div class="form-group">
              <label for="totalTaxableAmt" class="col-lg-2">과세대상금액</label>
              <div class="col-lg-10">
                <input id="totalTaxableAmt" name="totalTaxableAmt" v-model="reqAuthForm.totalTaxableAmt" class="form-control" placeholder="과세대상금액" >
              </div>
            </div>
            <!-- 부가가치세 총합 -->
            <div class="form-group">
              <label for="totalVatAmt" class="col-lg-2">부가가치세 총합</label>
              <div class="col-lg-10">
                <input id="totalVatAmt" name="totalVatAmt" v-model="reqAuthForm.totalVatAmt" class="form-control" placeholder="부가가치세 총합" >
              </div>
            </div>
            <!-- 봉사료 총합 -->
            <div class="form-group">
              <label for="totalServiceAmt" class="col-lg-2">봉사료 총합</label>
              <div class="col-lg-10">
                <input id="totalServiceAmt" name="totalServiceAmt" v-model="reqAuthForm.totalServiceAmt" class="form-control" placeholder="봉사료 총합" >
              </div>
            </div>
            <!-- 결제유형 -->
            <div class="form-group">
              <label for="orderMethod" class="col-lg-2">결제유형</label>
              <div class="col-lg-10">
                <input id="orderMethod" name="orderMethod" v-model="reqAuthForm.orderMethod" class="form-control" placeholder="결제유형" >
              </div>
            </div>
            <!-- 모바일 상단 GNB 노출여부 -->
            <div class="form-group">
              <label for="showMobileTopGnbYn" class="col-lg-2">모바일 상단 GNB 노출여부</label>
              <div class="col-lg-10">
                <input id="showMobileTopGnbYn" name="showMobileTopGnbYn" v-model="reqAuthForm.showMobileTopGnbYn" class="form-control" placeholder="모바일 상단 GNB 노출여부" >
              </div>
            </div>
            <!-- decryptHashKey(템플릿테스트용) -->
            <div class="form-group">
              <label for="decryptHashKey" class="col-lg-2">decryptHashKey</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="decryptHashKey" name="decryptHashKey" v-model="reqAuthForm.decryptHashKey">
              </div>
            </div>
            <!-- request url -->
            <div class="form-group">
              <label for="reqUrl" class="col-lg-2">reqUrl</label>
              <div class="col-lg-10">
                <input id="reqUrl" name="reqUrl" v-model="reqAuthForm.reqUrl" class="form-control" placeholder="reqUrl" >
              </div>
            </div>
            <!-- callback url -->
            <div class="form-group">
              <label for="rtnUrl" class="col-lg-2">callbackUrl</label>
              <div class="col-lg-10">
                <input id="rtnUrl" name="rtnUrl" v-model="reqAuthForm.callbackUrl" class="form-control" placeholder="callbackUrl" >
              </div>
            </div>
            <input type="hidden" id="payCorpCd" name="payCorpCd" v-model="reqAuthForm.payCorpCd"/>
            <input type="hidden" id="checkRegistNoYn" name="checkRegistNoYn" v-model="reqAuthForm.checkRegistNoYn"/>
            <input type="hidden" id="encodingType" name="encodingType" v-model="reqAuthForm.encodingType"/>
            <input type="hidden" id="returnUrl" name="returnUrl" v-model="reqAuthForm.callbackUrl"/>
            <input type="hidden" id="returnUrlParam" name="returnUrlParam" v-model="reqAuthForm.returnUrlParam"/>
            <input type="hidden" id="runtimeMode" name="runtimeMode" v-model="reqAuthForm.naverpayRuntimeMode"/>
            <input type="hidden" id="openType" name="openType" value="page"/>
            <input type="hidden" id="moid" name="moid" v-model="reqAuthForm.ordId"/>
            <input type="hidden" id="inAppYn" name="inAppYn" v-model="reqAuthForm.inAppYn" > <!-- 인앱 결제 여부 -->
            <input type="hidden" id="appOsType" name="appOsType" v-model="reqAuthForm.appOsType" > <!-- 사용자 앱 Client OS -->
            <input type="hidden" id="appUrlWithScheme" name="appUrlWithScheme" v-model="reqAuthForm.appUrlWithScheme" > <!-- 인앱 결제 시 리턴될 애플리케이션의 URL Scheme -->
            <div class="form-group">
              <div class="col-lg-10 col-lg-offset-2">
                <button type="button" class="btn btn-primary" @click="reqAuthEasyPay">인증요청</button>
                <button type="button" class="btn btn-primary" @click="reqApprEasyPay">승인요청</button>
                <button type="button" class="btn btn-primary" @click="reqCancelEasyPay">취소요청</button>
              </div>
            </div>
          </fieldset>
        </form>
        <div class="frame-div" style="display:none" id="frame_div">
          <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="500px;" align="center" scrolling="yes" style="transform: translate(0px, 0px) scale(1) translateZ(0px);"/>
        </div>
        <form class="form-horizontal" id="resEasyPayAuthForm" name="resEasyPayAuthForm" action="" method="POST">
          <fieldset>
            <legend>결과값</legend>
            <!-- resultCode -->
            <div class="form-group">
              <label for="resultCode" class="col-lg-2">resultCode</label>
              <div class="col-lg-10">
                <input type="text" id ="resultCode" name="resultCode" v-model="resAuthForm.resultCode" class="form-control" placeholder="resultCode" >
              </div>
            </div>
            <!-- resultMsg -->
            <div class="form-group">
              <label for="resultMsg" class="col-lg-2">resultMsg</label>
              <div class="col-lg-10">
                <input type="text" id ="resultMsg" name="resultMsg" v-model="resAuthForm.resultMsg" class="form-control" placeholder="resultMsg" >
              </div>
            </div>
            <!-- tid -->
            <div class="form-group">
              <label for="tid" class="col-lg-2">tid</label>
              <div class="col-lg-10">
                <input type="text" id="tid" name="tid" v-model="resAuthForm.tid" class="form-control" placeholder="tid" >
              </div>
            </div>
            <!-- 결제이력번호 -->
            <div class="form-group">
              <label for="tHistId" class="col-lg-2">결제이력번호</label>
              <div class="col-lg-10">
                <input type="text" id="tHistId" name="tHistId" v-model="resAuthForm.tHistId" class="form-control" placeholder="결제이력번호" >
              </div>
            </div>
            <!-- 인증토큰 -->
            <div class="form-group">
              <label for="paymentCertifyToken" class="col-lg-2">인증토큰</label>
              <div class="col-lg-10">
                <input type="text" id="paymentCertifyToken" name="paymentCertifyToken" v-model="resAuthForm.paymentCertifyToken" class="form-control" placeholder="인증토큰" >
              </div>
            </div>
            <!-- 결제완료키(취소비밀번호) -->
            <div class="form-group">
              <label for="orderCertifyKey" class="col-lg-2">결제완료키(취소비밀번호)</label>
              <div class="col-lg-10">
                <input type="text" id="orderCertifyKey" name="orderCertifyKey" v-model="resAuthForm.orderCertifyKey" class="form-control" placeholder="결제완료키(취소비밀번호)" >
              </div>
            </div>
            <!-- 주문ID -->
            <div class="form-group">
              <label for="ordId" class="col-lg-2">주문ID</label>
              <div class="col-lg-10">
                <input type="text" id="ordId" name="ordId" v-model="resAuthForm.ordId" class="form-control" placeholder="주문ID" >
              </div>
            </div>
            <!-- 총구매금액 -->
            <div class="form-group">
              <label for="amt" class="col-lg-2">총구매금액</label>
              <div class="col-lg-10">
                <input type="text" id="amt" name="amt" v-model="resAuthForm.amt" class="form-control" placeholder="총구매금액" >
              </div>
            </div>
            <!-- 주결제수단 결제금액 -->
            <div class="form-group">
              <label for="primaryPayAmount" class="col-lg-2">주결제수단 결제금액</label>
              <div class="col-lg-10">
                <input type="text" id="primaryPayAmount" name="primaryPayAmount" v-model="resAuthForm.primaryPayAmount" class="form-control" placeholder="주결제수단 결제금액" >
              </div>
            </div>
            <!-- 포인트 결제금액 -->
            <div class="form-group">
              <label for="npointPayAmount" class="col-lg-2">포인트 결제금액</label>
              <div class="col-lg-10">
                <input type="text" id="npointPayAmount" name="npointPayAmount" v-model="resAuthForm.npointPayAmount" class="form-control" placeholder="포인트 결제금액" >
              </div>
            </div>
            <!-- 상품명 -->
            <div class="form-group">
              <label for="goodsName" class="col-lg-2">상품명</label>
              <div class="col-lg-10">
                <input type="text" id="goodsName" name="goodsName" v-model="resAuthForm.goodsName" class="form-control" placeholder="상품명" >
              </div>
            </div>
            <!-- 커머스회원번호 -->
            <div class="form-group">
              <label for="cmmMbrNo" class="col-lg-2">커머스회원번호</label>
              <div class="col-lg-10">
                <input type="text" id="cmmMbrNo" name="cmmMbrNo" v-model="resAuthForm.cmmMbrNo" class="form-control" placeholder="커머스회원번호" >
              </div>
            </div>
            <!-- 인증일자 -->
            <div class="form-group">
              <label for="authDate" class="col-lg-2">인증일자</label>
              <div class="col-lg-10">
                <input type="text" id="authDate" name="authDate" v-model="resAuthForm.authDate" class="form-control" placeholder="인증일자" >
              </div>
            </div>
            <!-- 가맹점아이디 -->
            <div class="form-group">
              <label for="merchantId" class="col-lg-2">가맹점아이디</label>
              <div class="col-lg-10">
                <input type="text" id="merchantId" name="merchantId" v-model="resAuthForm.merchantId" class="form-control" placeholder="가맹점아이디" >
              </div>
            </div>
            <!-- 가맹점명 -->
            <div class="form-group">
              <label for="merchantName" class="col-lg-2">가맹점명</label>
              <div class="col-lg-10">
                <input type="text" id="merchantName" name="merchantName" v-model="resAuthForm.merchantName" class="form-control" placeholder="가맹점명" >
              </div>
            </div>
            <!-- 결제승인유형 -->
            <div class="form-group">
              <label for="admissionTypeCode" class="col-lg-2">결제승인유형</label>
              <div class="col-lg-10">
                <input type="text" id="admissionTypeCode" name="admissionTypeCode" v-model="resAuthForm.admissionTypeCode" class="form-control" placeholder="결제승인유형" >
              </div>
            </div>
            <!-- 주결제수단 -->
            <div class="form-group">
              <label for="primaryPayMeans" class="col-lg-2">주결제수단</label>
              <div class="col-lg-10">
                <input type="text" id="primaryPayMeans" name="primaryPayMeans" v-model="resAuthForm.primaryPayMeans" class="form-control" placeholder="주결제수단" >
              </div>
            </div>
            <!-- 주결제수단카드사 -->
            <div class="form-group">
              <label for="cardCorpCode" class="col-lg-2">주결제수단카드사</label>
              <div class="col-lg-10">
                <input type="text" id="cardCorpCode" name="cardCorpCode" v-model="resAuthForm.cardCorpCode" class="form-control" placeholder="주결제수단카드사" >
              </div>
            </div>
            <!-- 신용카드번호 -->
            <div class="form-group">
              <label for="cardNo" class="col-lg-2">신용카드번호</label>
              <div class="col-lg-10">
                <input type="text" id="cardNo" name="cardNo" v-model="resAuthForm.cardNo" class="form-control" placeholder="신용카드번호" >
              </div>
            </div>
            <!-- 카드승인번호 -->
            <div class="form-group">
              <label for="cardAuthNo" class="col-lg-2">카드승인번호</label>
              <div class="col-lg-10">
                <input type="text" id="cardAuthNo" name="cardAuthNo" v-model="resAuthForm.cardAuthNo" class="form-control" placeholder="카드승인번호" >
              </div>
            </div>
            <!-- 할부개월수 -->
            <div class="form-group">
              <label for="cardInstCount" class="col-lg-2">할부개월수</label>
              <div class="col-lg-10">
                <input type="text" id="cardInstCount" name="cardInstCount" v-model="resAuthForm.cardInstCount" class="form-control" placeholder="할부개월수" >
              </div>
            </div>
            <!-- 주결제수단은행 -->
            <div class="form-group">
              <label for="bankCorpCode" class="col-lg-2">주결제수단은행</label>
              <div class="col-lg-10">
                <input type="text" id="bankCorpCode" name="bankCorpCode" v-model="resAuthForm.bankCorpCode" class="form-control" placeholder="주결제수단은행" >
              </div>
            </div>
            <!-- 계좌번호 -->
            <div class="form-group">
              <label for="bankAccountNo" class="col-lg-2">계좌번호</label>
              <div class="col-lg-10">
                <input type="text" id="bankAccountNo" name="bankAccountNo" v-model="resAuthForm.bankAccountNo" class="form-control" placeholder="계좌번호" >
              </div>
            </div>
            <!-- 전체취소 or 부분취소 -->
            <div class="form-group"><!--부분 취소 후 잔여금액을 모두 취소 하고 싶을 경우 전체 취소로 변경해서 취소 해야함/부분취소로 할 경우 금액이 잔여금액보다 작아야 한다는 에러 발생 -->
              <label for="cancelType" class="col-lg-2">전체취소 or 부분취소</label>
              <div class="col-lg-10">
                <select class="form-control" name="cancelType">
                  <option v-for="option in cancelType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <!-- 부분취소시 취소요청금액 -->
            <div class="form-group">
              <label for="partCancelAmt" class="col-lg-2">부분취소시 취소요청금액</label>
              <div class="col-lg-10">
                <input id="partCancelAmt" name="partCancelAmt"  class="form-control" placeholder="부분취소시 취소요청금액" >
              </div>
            </div>
          </fieldset>
        </form>
        <!-- FOOTER -->
        <PaSmFooter />
      </div>
      <!-- END : 본문 -->
    </div>
</template>

<script>
import PaSmTopMenu from '@/views/pa/components/PaSmTopMenu';
import PaSmFooter from '@/views/pa/components/PaSmFooter';
import CommAuth from '@/views/pa/common/CommAuth';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "EasyTotalPayAuth",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      sticky: true,
      activeIndex: 11, // GNB 활성화
      reqAuthForm: {
        deviceType: "PC",
        userId: "12861410",
        buyerName: "한버들",
        buyerTel: "01090212180",
        buyerEmail: "hjy@gsretail.com",
        easyPayType: "NAVERPAY",
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
        decryptHashKey: "",
        orderTitle: "이커머스주문",
        productName: "이커머스상품",
        totalPaymentAmt: "1100",
        totalTaxfreeAmt: "0",
        totalTaxableAmt: "1000",
        totalVatAmt: "100",
        totalServiceAmt: "0",
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
        remainCancelPossibleAmt: ""
      }
    };
  },
  mixins: [
    CommAuth
  ],
  metaInfo: {
    title: '이커머스 인증/결제 Template',
    titleTemplate: '통합간편결제'
  },
  components: {
    PaSmTopMenu,
    PaSmFooter
  },
  mounted: async function() {
    this.doIncludeNaverpaySDK();
    const reqAuthForm = this.reqAuthForm;
    const resAuthForm = this.resAuthForm;
    const that = this;

    window.callbackFnc = function(hashKey) {
      resAuthForm.hashKey = hashKey;
      let returnUrl = "";
      if (reqAuthForm.deviceType === 'PC') {
        returnUrl = reqAuthForm.pcCallbackUrl + "?hashKey=" + resAuthForm.hashKey;
      } else {
        returnUrl = reqAuthForm.mobCallbackUrl + "?hashKey=" + resAuthForm.hashKey;
      }

      let payCorpCd = "";
      if (reqAuthForm.easyPayType === "NAVERPAY") {
        payCorpCd = "NPAY";
      } else if (reqAuthForm.easyPayType === "KAKAOPAY") {
        payCorpCd = "KAKAOPAY";
      } else if (reqAuthForm.easyPayType === "PAYCO") {
        payCorpCd = "PAYCO";
      }

      const data = {
        returnUrl: returnUrl,
        payCorpCd: payCorpCd
      };

      ApiUtils.post("/fo/pa/retrieveEasyPayAuthCallback", data).then(res => {
        that.resAuthForm = res.data;
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

        console.log(res.data);
      });
      document.getElementById('frame_div').style.display = 'none';
    };

    await ApiUtils
      .post('/fo/pa/easyPayInitAuth', {})
      .then(res => {
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
        reqAuthForm.ordId = res.data.ordId;
        reqAuthForm.inAppYn = res.data.inAppYn;
        reqAuthForm.appOsType = res.data.appOsType;
        reqAuthForm.appUrlWithScheme = res.data.appUrlWithScheme;

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
        } else if (reqAuthForm.easyPayType === "KAKAOPAY") {
          reqAuthForm.payCorpCd = reqAuthForm.easyPayType;
          // 신용카드 CARD, 계좌이체 MONEY
          reqAuthForm.includePaymentMethodCodes = "CARD";
          reqAuthForm.useCardList = "SHINHAN, LOTTE";
          reqAuthForm.channelCd = "GSFRESH";
          reqAuthForm.mid = "TC0ONETIME";
        } else if (reqAuthForm.easyPayType === "PAYCO") {
          reqAuthForm.payCorpCd = reqAuthForm.easyPayType;
          // 신용카드 31, 포인트 98, 쿠폰 75, 카드사쿠폰 76, 계좌이체 35
          reqAuthForm.includePaymentMethodCodes = "31,98,75,76";
          // CCLG 신한, CCSS 삼성
          reqAuthForm.useCardList = "CCBC, CCDI, CCLG, CCSS";
          reqAuthForm.channelCd = "GSFRESH";
          reqAuthForm.mid = "GSFPCOTT1";
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
  },
  methods: {
    changeDeviceType() {
      const reqAuthForm = this.reqAuthForm;
      if (reqAuthForm.deviceType === "PC") {
        reqAuthForm.reqUrl = reqAuthForm.pcReqUrl;
        reqAuthForm.callbackUrl = reqAuthForm.pcCallbackUrl;
      } else {
        reqAuthForm.reqUrl = reqAuthForm.mobReqUrl;
        reqAuthForm.callbackUrl = reqAuthForm.mobCallbackUrl;
      }
      document.getElementById('frame_div').style.display = 'none';
    },
    changeEasyPayType() {
      const reqAuthForm = this.reqAuthForm;
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
      } else if (reqAuthForm.easyPayType === "KAKAOPAY") {
        reqAuthForm.payCorpCd = reqAuthForm.easyPayType;
        // 신용카드 CARD, 계좌이체 MONEY
        reqAuthForm.includePaymentMethodCodes = "CARD";
        reqAuthForm.useCardList = "SHINHAN, LOTTE";
        reqAuthForm.channelCd = "GSFRESH";
        reqAuthForm.mid = "TC0ONETIME";
      } else if (reqAuthForm.easyPayType === "PAYCO") {
        reqAuthForm.payCorpCd = reqAuthForm.easyPayType;
        // 신용카드 31, 포인트 98, 쿠폰 75, 카드사쿠폰 76, 계좌이체 35
        reqAuthForm.includePaymentMethodCodes = "31,98,75,76";
        // CCLG 신한, CCSS 삼성
        reqAuthForm.useCardList = "CCBC, CCDI, CCLG, CCSS";
        reqAuthForm.channelCd = "GSFRESH";
        reqAuthForm.mid = "GSFPCOTT1";
      } else {
        console.log(reqAuthForm.easyPayType);
      }
      document.getElementById('frame_div').style.display = 'none';
    },
    async reqAuthEasyPay() {
      const reqAuthForm = this.reqAuthForm;
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
      if (StringUtils.isEmpty(userId)) {
        // alert("회원번호을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(easyPayType)) {
        alert("간편결제사를 선택해주세요.");
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

      if (StringUtils.isEmpty(totalPaymentAmt)) {
        // alert("결제요청금액을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(totalTaxfreeAmt)) {
        // alert("면세대상금액을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(totalTaxableAmt)) {
        // alert("과세대상금액을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(totalVatAmt)) {
        // alert("부가가치세를 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(totalServiceAmt)) {
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
      await ApiUtils.post('/fo/pa/initAuth', data).then(res => {
        if (res.data !== null) {
          reqAuthForm.decryptHashKey = res.data.decryptHashKey;
          if (reqAuthForm.easyPayType === "NAVERPAY" && reqAuthForm.deviceType === "PC") {
            reqAuthForm.callbackUrl = reqAuthForm.pcCallbackUrl + '?hashKey=' + res.data.hashKey;
          } else if (reqAuthForm.easyPayType === "KAKAOPAY") {
            if (reqAuthForm.deviceType === 'PC') {
              reqAuthForm.callbackUrl = reqAuthForm.pcCallbackUrl;
            } else {
              reqAuthForm.callbackUrl = reqAuthForm.mobCallbackUrl;
            }
            reqAuthForm.returnUrlParam = res.data.orgHashKey;
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
        const resAuthForm = this.resAuthForm;
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
              // 실제 주문서에서는 이 타이밍에 주문프로세스 수행
              resAuthForm.resultCode = resData.resultCode;
              resAuthForm.resultMsg = resData.resultMessage;
              resAuthForm.tid = resData.paymentId;
              console.log(resData);

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
                resAuthForm.tid = res.data.reserveOrderNo;
                console.log(res.data);
              });
          }
        }).open({
          merchantPayKey: ordId,
          merchantUserKey: userId,
          productName: '이커머스상품',
          productCount: '1',
          totalPayAmount: parseInt(totalPaymentAmt),
          taxScopeAmount: parseInt(totalTaxableAmt) + parseInt(totalVatAmt),
          taxExScopeAmount: parseInt(totalTaxfreeAmt),
          returnUrl: reqAuthForm.callbackUrl,
          productItems: [{
            "categoryType": 'PRODUCT',
            "categoryId": 'GENERAL',
            "uid": '0001',
            "name": '이커머스상품',
            "count": '1'
          }]
        });
      } else {
        let option = "";
        reqEasyPayAuthForm.action = reqAuthForm.reqUrl;
        reqEasyPayAuthForm.method = "post";
        if (reqAuthForm.easyPayType === "NAVERPAY") {
          option = "width=900, height=900";
          window.open("", "popup", option);
          reqEasyPayAuthForm.target = "popup";
        } else {
          option = "width=370, height=430";
          if (reqAuthForm.deviceType === "PC") {
            window.open("", "popup", option);
            reqEasyPayAuthForm.target = "popup";
          } else {
            document.getElementById('frame_div').style.display = 'block';
            reqEasyPayAuthForm.target = "MPI_FRAME";
          }
        }

        if (reqAuthForm.easyPayType === "KAKAOPAY" || reqAuthForm.easyPayType === "PAYCO") {
          // KAKAOPAY 운영은 반드시 선채번 주문번호를 넘겨줘야함, PAYCO는 무조건 999999999고정
          const changedOrdId = reqAuthForm.ordId;
          reqAuthForm.ordId = "999999999";
          setTimeout(()=> {
            reqEasyPayAuthForm.submit();
            setTimeout(()=> {
              reqAuthForm.ordId = changedOrdId;
            }, 3000);
          }, 3000);
        } else {
          reqEasyPayAuthForm.submit();
        }
      }
    },
    async reqApprEasyPay() {
      let deviceType = "";
      const reqAuthForm = this.reqAuthForm;
      const resAuthForm = this.resAuthForm;
      if (reqAuthForm.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }

      let url = "";
      let data = {};
      if (reqAuthForm.easyPayType === "NAVERPAY") {
        url = "/fo/pa/reqNaverpayAppr" + ((reqAuthForm.deviceType === "PC") ? "Pc" : "Mob");
        data = {
          channelType: deviceType,
          reserveOrderNo: resAuthForm.tid,
          ordId: reqAuthForm.ordId,
          amt: reqAuthForm.totalPaymentAmt
        };
      } else if (reqAuthForm.easyPayType === "KAKAOPAY") {
        url = "/fo/pa/reqKakaopayAppr" + ((reqAuthForm.deviceType === "PC") ? "Pc" : "Mob");
        data = {
          channelType: deviceType,
          reserveOrderNo: resAuthForm.tid,
          paymentToken: resAuthForm.paymentCertifyToken,
          mid: reqAuthForm.mid,
          ordId: reqAuthForm.ordId,
          cmmMbrNo: reqAuthForm.userId,
          amt: resAuthForm.amt,
          taxableAmt: reqAuthForm.totalTaxableAmt,
          taxFreeAmt: reqAuthForm.totalTaxfreeAmt,
          tax: reqAuthForm.totalVatAmt,
          moid: reqAuthForm.ordId,
          buyerName: reqAuthForm.buyerName,
          buyerTel: reqAuthForm.buyerTel,
          buyerEmail: reqAuthForm.buyerEmail
        };
      } else if (reqAuthForm.easyPayType === "PAYCO") {
        url = "/fo/pa/reqPaycoAppr" + ((reqAuthForm.deviceType === "PC") ? "Pc" : "Mob");
        data = {
          channelType: deviceType,
          reserveOrderNo: resAuthForm.tid,
          paymentToken: resAuthForm.paymentCertifyToken,
          mid: reqAuthForm.mid,
          ordId: reqAuthForm.ordId,
          cmmMbrNo: reqAuthForm.userId,
          amt: resAuthForm.amt,
          moid: reqAuthForm.ordId,
          buyerName: reqAuthForm.buyerName,
          buyerTel: reqAuthForm.buyerTel,
          buyerEmail: reqAuthForm.buyerEmail
        };
      }

      ApiUtils
        .post(url, data)
        .then(res => {
          let isFail = false;
          if (res.data === null || res.data.resultCode !== '0000') {
            isFail = true;
          }

          if (res.data !== null) {
            this.resAuthForm = res.data;
          }

          if (isFail) {
            console.error(res.data.resultMsg);
            alert('승인요청 중 에러가 발생했습니다. 로그를 확인해주세요.');
          }
        });
    },
    async reqCancelEasyPay() {
      let deviceType = "";
      const reqAuthForm = this.reqAuthForm;
      const resAuthForm = this.resAuthForm;
      const cancelPwd = resAuthForm.orderCertifyKey;
      if (reqAuthForm.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      let url = "";
      let data = {};
      data = resAuthForm;
      data.mid = reqAuthForm.mid;
      data.ordId = reqAuthForm.ordId;
      data.channelType = deviceType;
      // data.cancelAmt = reqAuthForm.totalPaymentAmt;
      data.cancelPwd = cancelPwd;
      // data.taxableCancelAmt = parseInt(reqAuthForm.totalTaxableAmt) + parseInt(reqAuthForm.totalVatAmt);
      // data.taxFreeCancelAmt = reqAuthForm.totalTaxfreeAmt;
      let cancelType = "0";
      let cancelAmt = reqAuthForm.totalPaymentAmt;
      let taxableCancelAmt = parseInt(reqAuthForm.totalTaxableAmt) + parseInt(reqAuthForm.totalVatAmt);
      let taxFreeCancelAmt = reqAuthForm.totalTaxfreeAmt;
      let tax = parseInt(reqAuthForm.totalVatAmt);
      // 부분 취소
      if (resEasyPayAuthForm.cancelType.value === "PART") {
        cancelType = "1";
        if (resEasyPayAuthForm.partCancelAmt.value === "") {
          alert("부분취소 요청 금액을 입력하세요.");
          return;
        } else {
          cancelAmt = resEasyPayAuthForm.partCancelAmt.value;
          // 과면세 필요 시 해당 값 셋팅 필요- 현재 페이지에서는 취소금액을 모두 과세로 취급하여 테스트
          taxFreeCancelAmt = "0";
          if (reqAuthForm.easyPayType === "NAVERPAY") {
            taxableCancelAmt = cancelAmt;
            tax = 0;
          } else {
            taxableCancelAmt = Math.round((cancelAmt - taxFreeCancelAmt) / 1.1);
            tax = cancelAmt - parseInt(taxableCancelAmt);
          }
        }
      } else {
        if (reqAuthForm.easyPayType !== "NAVERPAY") {
          taxableCancelAmt = parseInt(reqAuthForm.totalTaxableAmt);
        }
      }
      // alert(cancelAmt + " ||| " + taxableCancelAmt + " ||| " + tax);
      data.cancelAmt = cancelAmt;
      // data.taxableCancelAmt = taxableCancelAmt;
      // data.tax = tax;
      data.taxFreeCancelAmt = taxFreeCancelAmt;
      if (reqAuthForm.easyPayType === "NAVERPAY") {
        data.cancelAmt = cancelAmt;
        // data.taxableCancelAmt = taxableCancelAmt;
        // data.tax = parseInt(reqAuthForm.totalVatAmt);
        data.taxFreeCancelAmt = taxFreeCancelAmt;

        data.partialCancelCode = cancelType;
        if (resAuthForm.remainCancelPossibleAmt === "" || typeof(resAuthForm.remainCancelPossibleAmt) === "undefined") {
          data.remainCancelPossibleAmt = reqAuthForm.totalPaymentAmt - cancelAmt;
        } else {
          data.remainCancelPossibleAmt = resAuthForm.remainCancelPossibleAmt - cancelAmt;
        }
        url = "/fo/pa/reqNaverpayCancel" + ((reqAuthForm.deviceType === "PC") ? "Pc" : "Mob");
      } else if (reqAuthForm.easyPayType === "KAKAOPAY") {
        data.cancelAmt = cancelAmt;
        // data.taxableCancelAmt = parseInt(reqAuthForm.totalTaxableAmt);
        // data.tax = parseInt(reqAuthForm.totalVatAmt);
        data.taxFreeCancelAmt = taxFreeCancelAmt;
        url = "/fo/pa/reqKakaopayCancel" + ((reqAuthForm.deviceType === "PC") ? "Pc" : "Mob");
        data.partialCancelCode = cancelType;
      } else if (reqAuthForm.easyPayType === "PAYCO") {
        data.cancelAmt = cancelAmt;
        // data.taxableCancelAmt = parseInt(reqAuthForm.totalTaxableAmt);
        // data.tax = parseInt(reqAuthForm.totalVatAmt);
        data.taxFreeCancelAmt = taxFreeCancelAmt;
        url = "/fo/pa/reqPaycoCancel" + ((reqAuthForm.deviceType === "PC") ? "Pc" : "Mob");
      }
      const ordId = data.ordId;
      ApiUtils
        .post(url, data)
        .then(res => {
          let isFail = false;
          if (res.data === null || res.data.resultCode !== '0000') {
            isFail = true;
          }
          console.log(res.data);
          if (res.data !== null) {
            this.resAuthForm = res.data;
            this.resAuthForm.ordId = ordId;
            this.resAuthForm.orderCertifyKey = cancelPwd;
          }

          if (isFail) {
            console.error(res.data.resultMsg);
            alert('취소요청 중 에러가 발생했습니다. 로그를 확인해주세요.');
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
