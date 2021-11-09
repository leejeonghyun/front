<template>
  <!-- <div id="payMobilePopFlag" class="wrap-full-popup" role="dialog" aria-modal="true">-->
  <div id="payMobilePopFlag" :class="deviceTypeChk() === true ? 'wrap-full-popup' : ''" :role="deviceTypeChk() === true ? 'dialog' : ''" :aria-modal="deviceTypeChk()">
      <div>
        <div v-if="deviceTypeChk() === true" class="header-popup">
          <strong>결제하기</strong>
        </div>
      <!-- START : 본문 -->
      <div class="full-popup-body scroll-area">
      <form class="form-horizontal" id="mobilePopForm" name="mobilePopForm" method="post" action>
          <input type="hidden" id="deviceType" name="deviceType" v-model="reqAuthForm.deviceType" /> <!-- PC or Mob -->
          <input type="hidden" id="ordId" name="ordId" v-model="reqAuthForm.ordId" /> <!-- 주문번호 -->
          <input type="hidden" id="userId" name="userId" v-model="reqAuthForm.userId" /> <!-- 회원번호 -->
          <input type="hidden" id="totAmt" name="totAmt" v-model="reqAuthForm.totAmt" /> <!-- 가격(totAmt) -->
          <input type="hidden" id="dcAmt" name="dcAmt" v-model="reqAuthForm.dcAmt" /> <!-- 할인적용결제금액(dcAmt) -->
          <input type="hidden" id="cpId" name="cpId" v-model="reqAuthForm.cpId" /> <!-- cp id -->
          <input type="hidden" id="dcType" name="dcType" v-model="reqAuthForm.dcType" /> <!-- dcType -->
          <input type="hidden" id="prdNm" name="prdNm" v-model="reqAuthForm.prdNm"/> <!-- 상품명(prdNm) -->
          <input type="hidden" id="prdCnt" name="prdCnt" v-model="reqAuthForm.prdCnt" /> <!-- 상품건수(prdCnt) -->
          <input type="hidden" id="reqUrl" name="reqUrl" v-model="reqAuthForm.reqUrl" /> <!-- request url -->
          <input type="hidden" id="rtnUrl" name="rtnUrl" v-model="reqAuthForm.callbackUrl"/> <!-- callback url -->
          <input type="hidden" id="encodingType" name="encodingType" v-model="reqAuthForm.encodingType" />
      </form>
      <div class="frame-div" style="display:none" id="frame_div">
        <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="500px" align="center" frameborder="0" framespacing="0" marginheight="0" marginwidth="0" scrolling="yes" vspace="0" />
      </div>
      <form id="mobilePopForMobWebForm" name="mobilePopForMobWebForm" method="POST" accept-charset="euc-kr">
        <input type="hidden" name="cId" id="cId" v-model="reqAuthForm.svcId">
        <input type="hidden" name="svcId" id="svcId" v-model="reqAuthForm.svcId">
        <input type="hidden" name="msgver" id="msgver" value="2">
        <input type="hidden" name="payReq" id="payReq" v-model="reqAuthForm.payReq">
        <input type="hidden" name="payResultUrl" id="payResultUrl" v-model="reqAuthForm.callbackUrl">
        <input type="hidden" name="resultType" value="POST" />
      </form>
      <form id="mobilePopForMobAppForm" name="mobilePopForMobAppForm" accept-charset="euc-kr">
        <input type="hidden" name="cId" id="cId" v-model="reqAuthForm.svcId"><!-- 세션키 고객사 생성 세션키 , 암호화 : Y -->
        <input type="hidden" name="sessionKey" id="sessionKey" value="12345678901234567890"><!-- 세션키 고객사 생성 세션키 , 암호화 : Y -->
        <input type="hidden" name="storeName" id="storeName" value="GSfresh"><!-- 점포명  -->
        <input type="hidden" name="product" id="product" v-model="reqAuthForm.prdNm"><!-- 상품정보 Display 용도의 상품명 , 암호화 :   Y -->
        <input type="hidden" name="quantity" id="quantity" class="prodQty" v-model="reqAuthForm.prdCnt"><!-- 상품갯수 -->
        <input type="hidden" name="price" id="price"  v-model="reqAuthForm.totAmt"><!-- 상품(총)금액 , 암호화 : Y -->
        <input type="hidden" name="payType" id="payType" value="0"><!-- 결제구분 주결제 / 보조결제 구분 : 주결제/ 보조결제 구분(0,1) -->
        <input type="hidden" name="amount" id="amount" v-model="reqAuthForm.totAmt"><!-- 실결제 대상금액 , 암호화 :   Y -->
        <input type="hidden" name="current" id="current" size="50" value=""><!-- 현재시간 , 암호화 : Y -->
        <input type="hidden" name="expire" id="expire" value="180"><!-- 결제 유효시간 고객사 앱에서 유효시간을 설정할 수 있음.    , 암호화 :Y -->
        <input type="hidden" name="subId" id="subId" value="GSISUPER"><!-- 하위(점포) 아이디 , 암호화 :Y -->
        <input type="hidden" name="userId" id="userId" v-model="reqAuthForm.userId"><!-- 고객사 회원아이디   , 암호화 :Y -->
        <input type="hidden" name="reserved" id="reserved" value="11"><!-- 예비필드 화면 상태를 유지하기 위한 파라미터    , 암호화 : N -->
        <input type="hidden" name="encodingType" id="encodingType" v-model="reqAuthForm.encodingType" />
      </form>
      <form class="form-horizontal" id="resForm" name="resForm" action="" method="POST">
        <input type="hidden" id="hashKey" name="hashKey" v-model="resForm.hashKey" /> <!-- hashKey -->
        <input type="hidden" id="resultCode" name="resultCode" v-model="resForm.resultCode" /> <!-- resultCode -->
        <input type="hidden" id="resultMsg" name="resultMsg" v-model="resForm.resultMsg" /> <!-- resultMsg -->
        <input type="hidden" id="authDate" name="authDate" v-model="resForm.authDate" /> <!-- authDate -->
        <input type="hidden" id="authCode" name="authCode" v-model="resForm.authCode" /> <!-- authCode -->
        <input type="hidden" id="hmId" name="hmId" v-model="resForm.hmId" /> <!-- 해피머니ID -->
        <input type="hidden" id="authKey" name="authKey" v-model="resForm.authKey" /> <!-- 인증키 -->
        <input type="hidden" id="remCash" name="remCash" v-model="resForm.remCash" /> <!-- 캐시잔액 -->
        <input type="hidden" id="amt" name="amt" v-model="resForm.amt" /> <!-- 사용할 캐시 -->
        <input type="hidden" id="popCardNo" name="popCardNo" v-model="resForm.popCardNo" /> <!-- POP카드번호 -->
        <input type="hidden" id="mid" name="mid" v-model="resForm.mid" /> <!-- mid -->
        <input type="hidden" id="tid" name="tid" v-model="resForm.tid" /> <!-- tid -->
        <input type="hidden" id="afterBalance" name="afterBalance" v-model="resForm.afterBalance" /> <!-- afterBalance -->
      </form>
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
  name: 'MobilePopAuth',
  data() {
    return {
      sticky: true,
      activeIndex: 9, // GNB 활성화
      reqAuthForm: {
        deviceType: '',
        userId: '',
        totAmt: '',
        dcAmt: '',
        cpId: '',
        dcType: '',
        prdNm: '',
        prdCnt: '',
        reqUrl: '',
        callbackUrl: '',
        encodingType: 'UTF-8',
        pcReqUrl: '',
        mobReqUrl: '',
        pcCallbackUrl: '',
        mobCallbackUrl: '',
        mid: '',
        ordId: '',
        buyerEmail: '',
        cId: '',
        svcId: '',
        payReq: ''
      },
      resForm: {
        hashKey: "",
        resultCode: "",
        resultMsg: "",
        authDate: "",
        authCode: "",
        hmId: "",
        authKey: "",
        remCash: "",
        amt: "",
        popCardNo: "",
        mid: "",
        tid: "",
        afterBalance: ""
      }
    };
  },
  mixins: [CommAuth],
  created() {
    // orderSheet페이지에서 전송된 데이터를 세팅한다.
    this.reqAuthForm.deviceType = this.orderSheetForm.deviceType;
    this.reqAuthForm.userId = this.orderSheetForm.memNo;
    this.reqAuthForm.totAmt = this.orderSheetForm.goods_price;
    this.reqAuthForm.dcAmt = this.orderSheetForm.goods_price;
    this.reqAuthForm.prdNm = this.orderSheetForm.goods_name;
    this.reqAuthForm.prdCnt = this.orderSheetForm.goods_cnt;
    this.reqAuthForm.buyerName = this.orderSheetForm.buyer_name;
    this.reqAuthForm.buyerTel = this.orderSheetForm.buyer_tel;
    this.reqAuthForm.buyerEmail = this.orderSheetForm.email;
    this.reqAuthForm.ordId = this.orderSheetForm.ordId;
  },
  watch: {
  },
  mounted: async function() {
    const reqAuthForm = this.reqAuthForm;
    const resForm = this.resForm;
    const that = this;
    window.callbackFnc = function(hashKey) {
      resForm.hashKey = hashKey;
      let rtnUrl = "";
      if (reqAuthForm.deviceType === 'PC') {
        rtnUrl = reqAuthForm.pcCallbackUrl + "?hashKey=" + resForm.hashKey;
      } else {
        rtnUrl = reqAuthForm.mobCallbackUrl + "?hashKey=" + resForm.hashKey;
      }
      ApiUtils.post('/fo/pa/mobilePopAuthCallback', {rtnUrl: rtnUrl}).then(res => {
        that.resForm = res.data;
        that.resForm.resultCode = res.data.resultCode;
        that.resForm.resultMsg = res.data.resultMsg;
        that.resForm.authDate = res.data.authDate;
        that.resForm.hmId = res.data.hmId;
        that.resForm.authKey = res.data.authKey;
        that.resForm.remCash = res.data.remCash;
        that.resForm.amt = res.data.totAmt;
        that.resForm.popCardNo = res.data.popCardNo;
        that.resForm.hashKey = hashKey;

        that.rsformCallback(res.data.resultCode);
      });
    };
    await ApiUtils.post('/fo/pa/mobilePopInitAuth', {}).then(res => {
      reqAuthForm.mid = res.data.mid;
      reqAuthForm.cpId = res.data.mobilepopCpId;
      reqAuthForm.dcType = res.data.mobilepopDcType;
      reqAuthForm.pcReqUrl = res.data.mobilepopPcAuthUrl;
      reqAuthForm.mobReqUrl = res.data.mobilepopMobAuthUrl;
      reqAuthForm.pcCallbackUrl = res.data.mobilepopPcCallbackUrl;
      reqAuthForm.mobCallbackUrl = res.data.mobilepopMobCallbackUrl;
      if (reqAuthForm.deviceType === 'PC') {
        reqAuthForm.reqUrl = res.data.mobilepopPcAuthUrl;
        reqAuthForm.callbackUrl = res.data.mobilepopPcCallbackUrl;
      } else {
        reqAuthForm.reqUrl = res.data.mobilepopMobAuthUrl;
        reqAuthForm.callbackUrl = res.data.mobilepopMobCallbackUrl;
      }
      const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
      const deleteEventMethod = window.addEventListener ? "removeEventListener" : "detachEvent";
      const eventer = window[eventMethod];
      const messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
      const fnc = function(e) {
          console.log(e);
        console.log('fnc test!!!');
        console.log(e.origin.indexOf("pop.prepaidcard.co.kr"));
        console.log('location.href.indexOf(e.origin)', location.href.indexOf(e.origin));
        console.log('e.origin.indexOf("pop.prepaidcard.co.kr")', e.origin.indexOf("pop.prepaidcard.co.kr"));
        if (e !== null &&
            e.data !== null &&
            (location.href.indexOf(e.origin) < 0 && e.origin.indexOf("pop.prepaidcard.co.kr") > -1)) {
          console.log(e.origin);
          console.log("MobilePopAuthTemplate : " + e.data.type + ", e.origin : " + e.origin);
          console.log(e.data);
          if (e.data.type == "MP_HYBRID") {
            window.location.href = e.data.url;
          }
        }
        window[deleteEventMethod](messageEvent, fnc, false);
      };
      eventer(messageEvent, fnc, false);
      this.reqAuth(); // 인증요청
    });
  },
  methods: {
    popupAction() { // 닫기
      this.$emit('popupAction', 'payMobilePopFlag');
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
    rsformCallback: function(resultCode) {
      let isFail = false;
      if (resultCode != "0000") {
        isFail = true;
      }
      this.resForm.mid = this.reqAuthForm.mid;
      console.log("MCash this.rsform : ", this.resForm);
      document.getElementById('frame_div').style.display = 'none';
      this.$emit('orderPaymentCallBack', 'payMobilePopFlag', isFail, this.resForm);
    },
    async reqAuth() {
      const reqAuthForm = this.reqAuthForm;
      const userId = reqAuthForm.userId;
      const totAmt = reqAuthForm.totAmt;
      const dcAmt = reqAuthForm.dcAmt;
      const cpId = reqAuthForm.cpId;
      const dcType = reqAuthForm.dcType;
      const prdNm = reqAuthForm.prdNm;
      const prdCnt = reqAuthForm.prdCnt;
      const reqUrl = reqAuthForm.reqUrl;
      const callbackUrl = reqAuthForm.callbackUrl;
      if (StringUtils.isEmpty(userId)) {
        alert('회원번호을 입력해주세요.');
        return;
      }

      if (StringUtils.isEmpty(totAmt)) {
        alert('가격을 입력해주세요.');
        return;
      }

      if (StringUtils.isEmpty(dcAmt)) {
        alert('할인적용결제금액을 입력해주세요.');
        return;
      }

      if (StringUtils.isEmpty(cpId)) {
        alert('CP사 ID를 입력해주세요.');
        return;
      }

      if (StringUtils.isEmpty(dcType)) {
        alert('dcType을 입력해주세요.');
        return;
      }

      if (StringUtils.isEmpty(prdNm)) {
        alert('상품명을 입력해주세요.');
        return;
      }

      if (StringUtils.isEmpty(prdCnt)) {
        alert('상품건수를 입력해주세요.');
        return;
      }

      if (StringUtils.isEmpty(reqUrl)) {
        alert('reqUrl을 입력해주세요.');
        return;
      }

      if (StringUtils.isEmpty(callbackUrl)) {
        alert('callbackUrl을 입력해주세요.');
        return;
      }

      const data = {
        cmmMbrNo: reqAuthForm.userId,
        payCompany: 'SMARTRO',
        authType: 'MOBPOP',
        totalPayAmt: this.reqAuthForm.totAmt,
      };
      await ApiUtils.post('/fo/pa/initAuthByLogin', data).then(res => {
        if (res.data !== null) {
          if (reqAuthForm.deviceType === 'PC') {
            reqAuthForm.callbackUrl = reqAuthForm.pcCallbackUrl + '?hashKey=' + res.data.hashKey;
          } else {
            reqAuthForm.callbackUrl = reqAuthForm.mobCallbackUrl + '.hashKey_' + res.data.hashKey;
            reqAuthForm.payReq = res.data.mobilePopReqEncData;
            if (res.data.appYn !== null && res.data.appYn === 'Y') {
              reqAuthForm.cId = res.data.cId;
            } else {
              reqAuthForm.cId = '';
            }
            reqAuthForm.svcId = res.data.svcId;
          }
        }
      });
      if (reqAuthForm.deviceType === 'PC') {
        window.open(
          '',
          'popup',
          'width=520, height=541, menubar=no, status=no, resizable=no, scrollbars=no, fullscreen=no'
        );
        mobilePopForm.action = reqUrl;
        mobilePopForm.method = 'post';
        mobilePopForm.target = 'popup';
        mobilePopForm.submit();
      } else {
        document.getElementById('frame_div').style.display = 'block';
        const windowWidth = $(window).width();
        const windowHeight = $(window).height() - 57;
        $('#MPI_FRAME').css({
          'width': windowWidth,
          'height': windowHeight
        });
        mobilePopForMobWebForm.action = reqUrl;
        mobilePopForMobWebForm.target = "MPI_FRAME";
        mobilePopForMobWebForm.submit();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
