<template>
  <div id="mobilePopAuth" v-bind:class="[siteClass]">
    <PaSmTopMenu :activeIndex="activeIndex" :type="sticky ? 'sub': ''" />
    <!-- START : 본문 -->
    <div class="container">
      <form class="form-horizontal" id="mobilePopForm" name="mobilePopForm" method="post" action>
        <fieldset>
          <legend>모바일팝</legend>
          <!-- PC or Mob -->
          <div class="form-group">
            <label for="deviceType" class="col-lg-2">PC or Mob</label>
            <div class="col-lg-10">
              <select
                id="deviceType"
                name="deviceType"
                v-model="reqAuthForm.deviceType"
                class="form-control"
                @change="changeDeviceType"
              >
                <option
                  v-for="option in deviceType"
                  v-bind:key="option.code"
                  :value="option.code"
                >{{option.name}}</option>
              </select>
            </div>
          </div>
          <!-- 주문번호 -->
          <div class="form-group">
            <label for="ordId" class="col-lg-2">주문번호</label>
            <div class="col-lg-10">
              <input id="ordId" name="ordId" v-model="reqAuthForm.ordId" class="form-control" placeholder="주문번호" >
            </div>
          </div>
          <!-- 회원번호 -->
          <div class="form-group">
            <label for="userId" class="col-lg-2">회원번호</label>
            <div class="col-lg-10">
              <input
                id="userId"
                name="userId"
                v-model="reqAuthForm.userId"
                class="form-control"
                placeholder="회원번호"
              />
            </div>
          </div>
          <!-- 가격(totAmt) -->
          <div class="form-group">
            <label for="totAmt" class="col-lg-2">가격</label>
            <div class="col-lg-10">
              <input
                id="totAmt"
                name="totAmt"
                v-model="reqAuthForm.totAmt"
                class="form-control"
                placeholder="가격"
              />
            </div>
          </div>
          <!-- 할인적용결제금액(dcAmt) -->
          <div class="form-group">
            <label for="dcAmt" class="col-lg-2">할인적용결제금액</label>
            <div class="col-lg-10">
              <input
                id="dcAmt"
                name="dcAmt"
                v-model="reqAuthForm.dcAmt"
                class="form-control"
                placeholder="할인적용결제금액"
              />
            </div>
          </div>
          <!-- cp id -->
          <div class="form-group">
            <label for="cpId" class="col-lg-2">CP사 ID</label>
            <div class="col-lg-10">
              <input
                id="cpId"
                name="cpId"
                v-model="reqAuthForm.cpId"
                class="form-control"
                placeholder="CP사 ID"
              />
            </div>
          </div>
          <!-- dcType -->
          <div class="form-group">
            <label for="dcType" class="col-lg-2">dcType</label>
            <div class="col-lg-10">
              <input
                id="dcType"
                name="dcType"
                v-model="reqAuthForm.dcType"
                class="form-control"
                placeholder="dcType"
              />
            </div>
          </div>
          <!-- 상품명(prdNm) -->
          <div class="form-group">
            <label for="prdNm" class="col-lg-2">상품명</label>
            <div class="col-lg-10">
              <input
                id="prdNm"
                name="prdNm"
                v-model="reqAuthForm.prdNm"
                class="form-control"
                placeholder="상품명"
              />
            </div>
          </div>
          <!-- 상품건수(prdCnt) -->
          <div class="form-group">
            <label for="prdCnt" class="col-lg-2">상품건수</label>
            <div class="col-lg-10">
              <input
                id="prdCnt"
                name="prdCnt"
                v-model="reqAuthForm.prdCnt"
                class="form-control"
                placeholder="상품건수"
              />
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
              <input
                id="reqUrl"
                name="reqUrl"
                v-model="reqAuthForm.reqUrl"
                class="form-control"
                placeholder="reqUrl"
              />
            </div>
          </div>
          <!-- callback url -->
          <div class="form-group">
            <label for="rtnUrl" class="col-lg-2">callbackUrl</label>
            <div class="col-lg-10">
              <input
                id="rtnUrl"
                name="rtnUrl"
                v-model="reqAuthForm.callbackUrl"
                class="form-control"
                placeholder="callbackUrl"
              />
            </div>
          </div>
          <input type="hidden" id="encodingType" name="encodingType" v-model="reqAuthForm.encodingType" />
          <div class="form-group">
            <div class="col-lg-10 col-lg-offset-2">
              <button type="reset" class="btn btn-default">Cancel</button>
              <button type="button" class="btn btn-primary" @click="reqAuth">인증요청</button>
              <button type="button" class="btn btn-primary" @click="reqAppr">승인요청</button>
              <button type="button" class="btn btn-primary" @click="reqCancel">취소요청</button>
            </div>
          </div>
        </fieldset>
      </form>
      <div class="frame-div" style="display:none" id="frame_div">
        <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="500px;" align="center" scrolling="yes" style="transform: translate(0px, 0px) scale(1) translateZ(0px);"/>
      </div>
      <form id="mobilePopForMobWebForm" name="mobilePopForMobWebForm" method="POST" accept-charset="euc-kr">
        <input type="hidden" name="cId" id="cId" v-model="reqAuthForm.cId">
        <input type="hidden" name="svcId" id="svcId" v-model="reqAuthForm.svcId">
        <input type="hidden" name="msgver" id="msgver" value="2">
        <input type="hidden" name="payReq" id="payReq" v-model="reqAuthForm.payReq">
        <input type="hidden" name="payResultUrl" id="payResultUrl" v-model="reqAuthForm.callbackUrl">
        <input type="hidden" name="resultType" value="POST" />
      </form>
      <form id="mobilePopForMobAppForm" name="mobilePopForMobAppForm" accept-charset="euc-kr">
        <input type="hidden" name="cId" id="cId" v-model="reqAuthForm.svcId"><!-- 세션키 고객사 생성 세션키 , 암호화 : Y -->
        <input type="hidden" name="sessionKey" id="sessionKey" value="12345678901234567890"><!-- 세션키 고객사 생성 세션키 , 암호화 : Y -->
        <input type="hidden" name="storeName" id="storeName" value="GS리테일"><!-- 점포명  -->
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
        <fieldset>
          <legend>결과값</legend>
          <!-- hashKey -->
          <div class="form-group">
            <label for="hashKey" class="col-lg-2">hashKey</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="hashKey"
                name="hashKey"
                v-model="resForm.hashKey"
                class="form-control"
                placeholder="hashKey"
              />
            </div>
          </div>
          <!-- resultCode -->
          <div class="form-group">
            <label for="resultCode" class="col-lg-2">resultCode</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="resultCode"
                name="resultCode"
                v-model="resForm.resultCode"
                class="form-control"
                placeholder="resultCode"
              />
            </div>
          </div>
          <!-- resultMsg -->
          <div class="form-group">
            <label for="resultMsg" class="col-lg-2">resultMsg</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="resultMsg"
                name="resultMsg"
                v-model="resForm.resultMsg"
                class="form-control"
                placeholder="resultMsg"
              />
            </div>
          </div>
          <!-- authDate -->
          <div class="form-group">
            <label for="authDate" class="col-lg-2">authDate</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="authDate"
                name="authDate"
                v-model="resForm.authDate"
                class="form-control"
                placeholder="authDate"
              />
            </div>
          </div>
          <!-- authCode -->
          <div class="form-group">
            <label for="authCode" class="col-lg-2">authCode</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="authCode"
                name="authCode"
                v-model="resForm.authCode"
                class="form-control"
                placeholder="authCode"
              />
            </div>
          </div>
          <!-- 해피머니ID -->
          <div class="form-group">
            <label for="hmId" class="col-lg-2">해피머니ID</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="hmId"
                name="hmId"
                v-model="resForm.hmId"
                class="form-control"
                placeholder="해피머니ID"
              />
            </div>
          </div>
          <!-- 인증키 -->
          <div class="form-group">
            <label for="authKey" class="col-lg-2">인증키</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="authKey"
                name="authKey"
                v-model="resForm.authKey"
                class="form-control"
                placeholder="인증키"
              />
            </div>
          </div>
          <!-- 캐시잔액 -->
          <div class="form-group">
            <label for="remCash" class="col-lg-2">캐시잔액</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="remCash"
                name="remCash"
                v-model="resForm.remCash"
                class="form-control"
                placeholder="캐시잔액"
              />
            </div>
          </div>
          <!-- 사용할 캐시 -->
          <div class="form-group">
            <label for="amt" class="col-lg-2">사용할 캐시</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="amt"
                name="amt"
                v-model="resForm.amt"
                class="form-control"
                placeholder="사용할 캐시"
              />
            </div>
          </div>
          <!-- POP카드번호 -->
          <div class="form-group">
            <label for="popCardNo" class="col-lg-2">POP카드번호</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="popCardNo"
                name="popCardNo"
                v-model="resForm.popCardNo"
                class="form-control"
                placeholder="POP카드번호"
              />
            </div>
          </div>
          <!-- mid -->
          <div class="form-group">
            <label for="mid" class="col-lg-2">mid</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="mid"
                name="mid"
                v-model="resForm.mid"
                class="form-control"
                placeholder="mid"
              />
            </div>
          </div>
          <!-- tid -->
          <div class="form-group">
            <label for="tid" class="col-lg-2">tid</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="tid"
                name="tid"
                v-model="resForm.tid"
                class="form-control"
                placeholder="tid"
              />
            </div>
          </div>
          <!-- afterBalance -->
          <div class="form-group">
            <label for="afterBalance" class="col-lg-2">afterBalance</label>
            <div class="col-lg-10">
              <input
                type="text"
                id="afterBalance"
                name="afterBalance"
                v-model="resForm.afterBalance"
                class="form-control"
                placeholder="afterBalance"
              />
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
  name: 'MobilePopAuth',
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      sticky: true,
      activeIndex: 9, // GNB 활성화
      reqAuthForm: {
        deviceType: 'PC',
        ordId: "",
        decryptHashKey: "",
        userId: '12860524',
        totAmt: '1004',
        dcAmt: '1004',
        cpId: '',
        dcType: '',
        prdNm: 'GSfresh.com',
        prdCnt: '1',
        reqUrl: '',
        callbackUrl: '',
        encodingType: 'UTF-8',
        pcReqUrl: '',
        mobReqUrl: '',
        mobAppReqUrl: '',
        pcCallbackUrl: '',
        mobCallbackUrl: '',
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
  metaInfo: {
    title: '이커머스 인증/결제 Template',
    titleTemplate: '모바일팝',
  },
  components: {
    PaSmTopMenu,
    PaSmFooter,
  },
  mounted: async function() {
    const reqAuthForm = this.reqAuthForm;
    const resForm = this.resForm;
    window.callbackFnc = function(hashKey) {
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
      document.getElementById('frame_div').style.display = 'none';
    };

    await ApiUtils.post('/fo/pa/mobilePopInitAuth', {}).then(res => {
      reqAuthForm.ordId = res.data.ordId;
      reqAuthForm.cpId = res.data.mobilepopCpId;
      reqAuthForm.dcType = res.data.mobilepopDcType;
      reqAuthForm.pcReqUrl = res.data.mobilepopPcAuthUrl;
      reqAuthForm.mobReqUrl = res.data.mobilepopMobAuthUrl;
      reqAuthForm.mobAppReqUrl = res.data.mobilepopMobAppAuthUrl;
      reqAuthForm.pcCallbackUrl = res.data.mobilepopPcCallbackUrl;
      reqAuthForm.mobCallbackUrl = res.data.mobilepopMobCallbackUrl;
      if (reqAuthForm.deviceType === 'PC') {
        reqAuthForm.reqUrl = res.data.mobilepopPcAuthUrl;
        reqAuthForm.callbackUrl = res.data.mobilepopPcCallbackUrl;
      } else {
        reqAuthForm.reqUrl = res.data.mobilepopMobAuthUrl;
        reqAuthForm.callbackUrl = res.data.mobilepopMobCallbackUrl;
      }
    });
    const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    const eventer = window[eventMethod];
    const messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    eventer(messageEvent, function(e) {
      console.log(e.origin.indexOf("pop.prepaidcard.co.kr"));
      if (e !== null &&
          e.data !== null &&
          e.data.resultCode !== null &&
          (location.href.indexOf(e.origin) < 0 && e.origin.indexOf("pop.prepaidcard.co.kr") > -1)) {
        console.log(e.origin);
        console.log("MobilePopAuthTemplate : " + e.data.type + ", e.origin : " + e.origin);
        console.log(e.data);
        if (e.data.type == "MP_HYBRID") {
          window.location.href = e.data.url;
        }
      }
    }, false);
  },
  methods: {
    changeDeviceType() {
      const reqAuthForm = this.reqAuthForm;
      document.getElementById('frame_div').style.display = 'none';
      if (reqAuthForm.deviceType === 'PC') {
        reqAuthForm.reqUrl = reqAuthForm.pcReqUrl;
        reqAuthForm.callbackUrl = reqAuthForm.pcCallbackUrl;
      } else {
        reqAuthForm.reqUrl = reqAuthForm.mobReqUrl;
        reqAuthForm.callbackUrl = reqAuthForm.mobCallbackUrl;
      }
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
        totalPayAmt: totAmt
      };
      await ApiUtils.post('/fo/pa/initAuth', data).then(res => {
        console.log(res.data);
        if (res.data !== null) {
          reqAuthForm.decryptHashKey = res.data.decryptHashKey;
          if (reqAuthForm.deviceType === 'PC') {
            reqAuthForm.callbackUrl = reqAuthForm.pcCallbackUrl + '?hashKey=' + res.data.hashKey;
          } else {
            reqAuthForm.callbackUrl = reqAuthForm.mobCallbackUrl + '.hashKey_' + res.data.hashKey;
            reqAuthForm.payReq = res.data.mobilePopReqEncData;
            if (res.data.appYn !== null && res.data.appYn === 'Y') {
              reqAuthForm.cId = res.data.cId;
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
        mobilePopForMobWebForm.action = reqUrl;
        mobilePopForMobWebForm.target = "MPI_FRAME";
        mobilePopForMobWebForm.submit();
      }
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
        buyerName: "tester",
        buyerEmail: "tester@gsretail.com",
        resultMsg: resForm.resultMsg,
        buyerTel: "01037117531",
        goodsName: reqAuthForm.prdNm,
        goodsCnt: reqAuthForm.prdCnt,
        cmmMbrNo: reqAuthForm.userId,
        ordId: reqAuthForm.ordId,
        popCardNo: resForm.popCardNo,
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
    },
    async reqCancel() {
      const reqAuthForm = this.reqAuthForm;
      const resForm = this.resForm;
      let deviceType = "";
      if (reqAuthForm.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }

      const url = "/fo/pa/reqMobilePopCancel" + ((this.reqAuthForm.deviceType === "PC") ? "Pc" : "Mob");
      const reqMobilePopCancelData = {
        deviceType: deviceType,
        mid: "gsstore01m",
        ordId: reqAuthForm.ordId,
        tid: resForm.tid,
        cancelAmt: resForm.amt
      };

      ApiUtils
        .post(url, reqMobilePopCancelData)
        .then(res => {
          if (res.data !== null) {
            this.resForm = res.data;
          }
          console.log(res.data);
        });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
