<template>
  <div id="payMobilePopFlag" class="wrap-full-popup" role="dialog" aria-modal="true">
    <div>
      <div class="header-popup">
        <strong>결제하기</strong>
      </div>
      <!-- START : 본문 -->
      <div class="full-popup-body scroll-area">
      <form class="form-horizontal" id="mobilePopForm" name="mobilePopForm" method="post" action>
        <input type="hidden" name="deviceType.vue" id="deviceType" v-model="reqAuthForm.deviceType" /> <!-- PC or Mob -->
        <input type="hidden" id="userId" name="userId" v-model="reqAuthForm.userId" /> <!-- 회원번호 -->
        <input type="hidden" id="totAmt" name="totAmt" v-model="reqAuthForm.totAmt" /> <!-- 가격(totAmt) -->
        <input type="hidden" id="dcAmt" ame="dcAmt" v-model="reqAuthForm.dcAmt" /> <!-- 할인적용결제금액(dcAmt) -->
        <input type="hidden" id="cpId" name="cpId" v-model="reqAuthForm.cpId" /> <!-- cp id -->
        <input type="hidden" id="dcType" name="dcType" v-model="reqAuthForm.dcType" /> <!-- dcType -->
        <input type="hidden" id="prdNm" name="prdNm" v-model="reqAuthForm.prdNm" /> <!-- 상품명(prdNm) -->
        <input type="hidden" id="prdCnt" name="prdCnt" v-model="reqAuthForm.prdCnt" /> <!-- 상품건수(prdCnt) -->
        <input type="hidden" id="reqUrl" name="reqUrl" v-model="reqAuthForm.reqUrl" /> <!-- request url -->
        <input type="hidden" id="rtnUrl" name="rtnUrl" v-model="reqAuthForm.callbackUrl" /> <!-- callback url -->
        <input type="hidden" id="encodingType" name="encodingType" v-model="reqAuthForm.encodingType" />
        <div class="form-group">
          <div class="col-lg-10 col-lg-offset-2">
            <button type="button" class="btn btn-primary" @click="reqAuth">인증요청</button>
            <button type="button" class="btn btn-primary" @click="reqAppr">승인요청</button>
          </div>
        </div>
      </form>
      <div class="frame-div" style="display:none" id="frame_div">
        <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="800px" align="center" frameborder="0" framespacing="0" marginheight="0" marginwidth="0" scrolling="yes" vspace="0" />
      </div>
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
        deviceType: 'MOB',
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
        mobCallbackUrl: ''
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
    console.log("this.reqAuthForm : ", this.reqAuthForm);
  },
  watch: {
    rsform: function() {
      // TO-DO 데이터 테스트 후 주석 풀것
      // this.reqAppr();
    }
  },
  mounted: async function() {
    const reqAuthForm = this.reqAuthForm;
    const resForm = this.resForm;
    window.callbackMobilePopAuth = function(hashKey) {
      resForm.hashKey = hashKey;
      let rtnUrl = "";
      if (reqAuthForm.deviceType === 'PC') {
        rtnUrl = reqAuthForm.pcCallbackUrl + "?hashKey=" + resForm.hashKey;
      } else {
        rtnUrl = reqAuthForm.mobCallbackUrl + "?hashKey=" + resForm.hashKey;
      }
      ApiUtils.post('/fo/pa/mobilePopAuthCallback', {rtnUrl: rtnUrl}).then(res => {
        // resForm = res.data;
        resForm.resultCode = res.data.resultCode;
        resForm.resultMsg = res.data.resultMsg;
        resForm.authDate = res.data.authDate;
        resForm.hmId = res.data.hmId;
        resForm.authKey = res.data.authKey;
        resForm.remCash = res.data.remCash;
        resForm.amt = res.data.totAmt;
        resForm.popCardNo = res.data.popCardNo;
      });
    };

    await ApiUtils.post('/fo/pa/mobilePopInitAuth', {}).then(res => {
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
      this.reqAuth(); // 인증요청
    });
  },
  methods: {
    popupAction() { // 닫기
      this.$emit('popupEvent', 'payMobilePopFlag');
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
        payType: 'MOBPOP',
      };
      await ApiUtils.post('/fo/pa/initAuth', data).then(res => {
        if (res.data !== null) {
          if (reqAuthForm.deviceType === 'PC') {
            reqAuthForm.callbackUrl = reqAuthForm.pcCallbackUrl + '?hashKey=' + res.data.hashKey;
          } else {
            reqAuthForm.callbackUrl = reqAuthForm.mobCallbackUrl + '?hashKey=' + res.data.hashKey;
          }
        }
      });
      mobilePopForm.action = reqUrl;
      document.getElementById('frame_div').style.display = 'block';
      mobilePopForm.target = "MPI_FRAME";
      mobilePopForm.submit();
      // mobilePopForm.method = 'post';
      // window.open(
      //   '',
      //   'popup',
      //   'width=520, height=541, menubar=no, status=no, resizable=no, scrollbars=no, fullscreen=no'
      // );
      // mobilePopForm.target = 'popup';
    },
    async reqAppr() {
      const resForm = this.resForm;
      let deviceType = "";
      const reqAuthForm = this.reqAuthForm;
      if (reqAuthForm.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }

      const url = "/fo/pa/reqMobilePopAppr" + ((this.reqAuthForm.deviceType === "PC") ? "Pc" : "Mob");
      const reqMobilePopApprData = {
        deviceType: deviceType,
        mid: "gsstore01m",
        tid: resForm.authKey,
        amt: resForm.amt,
        buyerName: reqAuthForm.buyerName,
        buyerEmail: reqAuthForm.buyerEmail,
        resultMsg: resForm.resultMsg,
        buyerTel: reqAuthForm.buyerTel,
        goodsName: reqAuthForm.prdNm,
        goodsCnt: reqAuthForm.prdCnt,
        cmmMbrNo: reqAuthForm.userId,
        ordId: reqAuthForm.ordId,
        happyID: resForm.hmId,
        payKey: resForm.authKey
      };

      ApiUtils
        .post(url, reqMobilePopApprData)
        .then(res => {
          if (res.data !== null) {
            this.resForm = res.data;
          }
          console.log(res.data);
        });
      this.$emit('orderPaymentCallBack', 'payMobilePopFlag', this.resForm.tid, isFail);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
