<template>
    <div id="telcoDcAuth" v-bind:class="[siteClass]">
      <PaSmTopMenu :activeIndex="activeIndex" :type="sticky ? 'sub': ''" />
      <!-- START : 본문 -->
      <div class="container">
        <form class="form-horizontal" id="telcoDcForm" name="telcoDcForm" method="post" action="">
          <fieldset>
            <legend>통신사포인트 조회</legend>
            <!-- PC or Mob -->
            <div class="form-group">
              <label for="deviceType" class="col-lg-2">PC or Mob</label>
              <div class="col-lg-10">
                <select id="deviceType" name="deviceType" v-model="reqPntForm.deviceType" class="form-control" @change="changeDeviceType">
                  <option v-for="option in deviceType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <!-- 주문번호 -->
            <div class="form-group">
              <label for="ordId" class="col-lg-2">주문번호</label>
              <div class="col-lg-10">
                <input id="ordId" name="ordId" v-model="reqPntForm.ordId" class="form-control" placeholder="주문번호" >
              </div>
            </div>
            <!-- 회원번호 -->
            <div class="form-group">
              <label for="userId" class="col-lg-2">회원번호</label>
              <div class="col-lg-10">
                <input id="userId" name="userId" v-model="reqPntForm.custNo" class="form-control" placeholder="회원번호" >
              </div>
            </div>
            <!-- 통신사선택 -->
            <div class="form-group">
              <label for="telcoType" class="col-lg-2">통신사선택</label>
              <div class="col-lg-10">
                <select id="telcoType" name="telcoType" v-model="reqPntForm.telcoType" class="form-control" @change="changeTelcoType">
                  <option v-for="option in telcoType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <!-- group id -->
            <div class="form-group">
              <label for="gid" class="col-lg-2">gid</label>
              <div class="col-lg-10">
                <input id="gid" name="gid" v-model="reqPntForm.gid" class="form-control" placeholder="gid" >
              </div>
            </div>
            <!-- mid -->
            <div class="form-group">
              <label for="mid" class="col-lg-2">mid</label>
              <div class="col-lg-10">
                <input id="mid" name="mid" v-model="reqPntForm.mid" class="form-control" placeholder="mid" >
              </div>
            </div>
            <!-- KT 할인 프로모션 코드 -->
            <div class="form-group">
              <label for="goodsName" class="col-lg-2">KT 할인 프로모션 코드</label>
              <div class="col-lg-10">
                <input id="goodsName" name="goodsName" v-model="reqPntForm.goodsName" class="form-control" placeholder="KT 할인 프로모션 코드" >
              </div>
            </div>
            <!-- 생년월일 -->
            <div class="form-group">
              <label for="birthDay" class="col-lg-2">생년월일</label>
              <div class="col-lg-10">
                <input id="birthDay" name="birthDay" v-model="reqPntForm.birthDay" class="form-control" placeholder="YYYYMMDD" >
              </div>
            </div>
            <!-- 카드번호 -->
            <div class="form-group">
              <label for="cardNo" class="col-lg-2">카드번호</label>
              <div class="col-lg-2" style="width:100px;">
                <input id="cardNo1" name="cardNo1" v-model="reqPntForm.cardNo1" class="form-control" placeholder="" >
              </div>
              <div class="col-lg-2" style="width:100px;">
                <input id="cardNo2" name="cardNo2" v-model="reqPntForm.cardNo2" class="form-control" placeholder="" >
              </div>
              <div class="col-lg-2" style="width:100px;">
                <input id="cardNo3" name="cardNo3" v-model="reqPntForm.cardNo3" class="form-control" placeholder="" >
              </div>
              <div class="col-lg-2" style="width:100px;">
                <input id="cardNo4" name="cardNo4" v-model="reqPntForm.cardNo4" class="form-control" placeholder="" >
              </div>
            </div>
            <!-- 총구매금액 -->
            <div class="form-group">
              <label for="amt" class="col-lg-2">총구매금액</label>
              <div class="col-lg-10">
                <input id="amt" name="amt" v-model="reqPntForm.amt" class="form-control" placeholder="총구매금액" >
              </div>
            </div>
            <!-- 할인대상금액 -->
            <div class="form-group">
              <label for="discountAmt" class="col-lg-2">할인대상금액</label>
              <div class="col-lg-10">
                <input id="discountAmt" name="discountAmt" v-model="reqPntForm.discountAmt" class="form-control" placeholder="할인대상금액" >
              </div>
            </div>
            <input type="hidden" id="encodingType" name="encodingType" v-model="reqPntForm.encodingType"/>
            <div class="form-group">
              <div class="col-lg-10 col-lg-offset-2">
                <button type="button" class="btn btn-primary" @click="reqRetrievePnt">포인트조회</button>
                <button type="button" class="btn btn-primary" @click="reqApprPnt">승인요청</button>
                <button type="button" class="btn btn-primary" @click="reqCancelPnt">취소요청</button>
              </div>
            </div>
          </fieldset>
        </form>
        <form class="form-horizontal" name="resTelcoDcPntForm" action="" method="POST">
          <fieldset>
            <legend>결과값</legend>
            <!-- resultCode -->
            <div class="form-group">
              <label for="resultCode" class="col-lg-2">resultCode</label>
              <div class="col-lg-10">
                <input type="text" id ="resultCode" name="resultCode" v-model="resPntForm.resultCode" class="form-control" placeholder="resultCode" >
              </div>
            </div>
            <!-- resultMsg -->
            <div class="form-group">
              <label for="resultMsg" class="col-lg-2">resultMsg</label>
              <div class="col-lg-10">
                <input type="text" id ="resultMsg" name="resultMsg" v-model="resPntForm.resultMsg" class="form-control" placeholder="resultMsg" >
              </div>
            </div>
            <!-- ordId -->
            <div class="form-group">
              <label for="tid" class="col-lg-2">ordId</label>
              <div class="col-lg-10">
                <input type="text" id="ordId" name="ordId" v-model="resPntForm.ordId" class="form-control" placeholder="ordId" >
              </div>
            </div>
            <!-- tid -->
            <div class="form-group">
              <label for="tid" class="col-lg-2">tid</label>
              <div class="col-lg-10">
                <input type="text" id="tid" name="tid" v-model="resPntForm.tid" class="form-control" placeholder="tid" >
              </div>
            </div>
            <!-- 인증일자 -->
            <div class="form-group">
              <label for="authDate" class="col-lg-2">인증일자</label>
              <div class="col-lg-10">
                <input type="text" id="authDate" name="authDate" v-model="resPntForm.authDate" class="form-control" placeholder="인증일자" >
              </div>
            </div>
            <!-- 인증번호 -->
            <div class="form-group">
              <label for="authCode" class="col-lg-2">인증번호</label>
              <div class="col-lg-10">
                <input type="text" id="authCode" name="authCode" v-model="resPntForm.authCode" class="form-control" placeholder="인증번호" >
              </div>
            </div>
            <!-- 전문추적번호 -->
            <div class="form-group">
              <label for="transMessageNo" class="col-lg-2">전문추적번호</label>
              <div class="col-lg-10">
                <input type="text" id="transMessageNo" name="transMessageNo" v-model="resPntForm.transMessageNo" class="form-control" placeholder="전문추적번호" >
              </div>
            </div>
            <!-- 전문번호 -->
            <div class="form-group">
              <label for="messageCode" class="col-lg-2">전문번호</label>
              <div class="col-lg-10">
                <input type="text" id ="messageCode" name="messageCode" v-model="resPntForm.messageCode" class="form-control" placeholder="전문번호" >
              </div>
            </div>
            <!-- 전문전송일시 -->
            <div class="form-group">
              <label for="transDate" class="col-lg-2">전문전송일시</label>
              <div class="col-lg-10">
                <input type="text" id ="transDate" name="transDate" v-model="resPntForm.transDate" class="form-control" placeholder="전문전송일시" >
              </div>
            </div>
            <!-- 카드번호 -->
            <div class="form-group">
              <label for="cardNo" class="col-lg-2">카드번호</label>
              <div class="col-lg-10">
                <input type="text" id ="cardNo" name="cardNo" v-model="resPntForm.cardNo" class="form-control" placeholder="카드번호" >
              </div>
            </div>
            <!-- 할인대상금액 -->
            <div class="form-group">
              <label for="discountAmt" class="col-lg-2">할인대상금액</label>
              <div class="col-lg-10">
                <input type="text" id ="discountAmt" name="discountAmt" v-model="resPntForm.discountAmt" class="form-control" placeholder="할인대상금액" >
              </div>
            </div>
            <!-- 할인 한도 잔액 -->
            <div class="form-group">
              <label for="remainLimit" class="col-lg-2">할인 한도 잔액</label>
              <div class="col-lg-10">
                <input type="text" id ="remainLimit" name="remainLimit" v-model="resPntForm.remainLimit" class="form-control" placeholder="할인 한도 잔액" >
              </div>
            </div>
            <!-- 한도초과시 잔여한도 -->
            <div class="form-group">
              <label for="remainLimitOverflow" class="col-lg-2">한도초과시 잔여한도</label>
              <div class="col-lg-10">
                <input type="text" id ="remainLimitOverflow" name="remainLimitOverflow" v-model="resPntForm.remainLimitOverflow" class="form-control" placeholder="한도초과시 잔여한도" >
              </div>
            </div>
            <!-- 고객등급 -->
            <div class="form-group">
              <label for="userGrade" class="col-lg-2">고객등급</label>
              <div class="col-lg-10">
                <input type="text" id ="userGrade" name="userGrade" v-model="resPntForm.userGrade" class="form-control" placeholder="고객등급" >
              </div>
            </div>
            <!-- 일 잔여횟수 -->
            <div class="form-group">
              <label for="remainCountOfDay" class="col-lg-2">일 잔여횟수</label>
              <div class="col-lg-10">
                <input type="text" id ="remainCountOfDay" name="remainCountOfDay" v-model="resPntForm.remainCountOfDay" class="form-control" placeholder="일 잔여횟수" >
              </div>
            </div>
            <!-- 월 잔여횟수 -->
            <div class="form-group">
              <label for="remainCountOfMonth" class="col-lg-2">월 잔여횟수</label>
              <div class="col-lg-10">
                <input type="text" id ="remainCountOfMonth" name="remainCountOfMonth" v-model="resPntForm.remainCountOfMonth" class="form-control" placeholder="월 잔여횟수" >
              </div>
            </div>
            <!-- 연도 잔여횟수 -->
            <div class="form-group">
              <label for="remainCountOfAnnual" class="col-lg-2">연도 잔여횟수</label>
              <div class="col-lg-10">
                <input type="text" id ="remainCountOfAnnual" name="remainCountOfAnnual" v-model="resPntForm.remainCountOfAnnual" class="form-control" placeholder="연도 잔여횟수" >
              </div>
            </div>
            <!-- VIP 일 잔여횟수 -->
            <div class="form-group">
              <label for="remainCountVipOfDay" class="col-lg-2">VIP 일 잔여횟수</label>
              <div class="col-lg-10">
                <input type="text" id ="remainCountVipOfDay" name="remainCountVipOfDay" v-model="resPntForm.remainCountVipOfDay" class="form-control" placeholder="VIP 일 잔여횟수" >
              </div>
            </div>
            <!-- VIP 월 잔여횟수 -->
            <div class="form-group">
              <label for="remainCountVipOfMonth" class="col-lg-2">VIP 월 잔여횟수</label>
              <div class="col-lg-10">
                <input type="text" id ="remainCountVipOfMonth" name="remainCountVipOfMonth" v-model="resPntForm.remainCountVipOfMonth" class="form-control" placeholder="VIP 월 잔여횟수" >
              </div>
            </div>
            <!-- VIP 연도 잔여횟수 -->
            <div class="form-group">
              <label for="remainCountVipOfAnnual" class="col-lg-2">VIP 연도 잔여횟수</label>
              <div class="col-lg-10">
                <input type="text" id ="remainCountVipOfAnnual" name="remainCountVipOfAnnual" v-model="resPntForm.remainCountVipOfAnnual" class="form-control" placeholder="VIP 연도 잔여횟수" >
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
  name: "TelcoDcAuth",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      sticky: true,
      activeIndex: 10, // GNB 활성화
      reqPntForm: {
        deviceType: "PC",
        ordId: "",
        custNo: "12860524",
        telcoType: "KT",
        gid: "",
        mid: "",
        ktGid: "",
        ktMid: "",
        goodsName: "",
        ktNormalDcCode: "",
        ktDoubleDcCode: "",
        lgupGid: "",
        lgupMid: "",
        birthDay: "",
        cardNo1: "",
        cardNo2: "",
        cardNo3: "",
        cardNo4: "",
        reqUrl: "",
        pcReqUrl: "",
        mobReqUrl: "",
        amt: "50000",
        discountAmt: "3000",
        payMethod: "TELMBRINFO"
      },
      resPntForm: {
        resultCode: "",
        resultMsg: "",
        ordId: "",
        tid: "",
        authDate: "",
        authCode: "",
        transMessageNo: "",
        messageCode: "",
        transDate: "",
        cardNo: "",
        discountAmt: "",
        remainLimit: "",
        remainLimitOverflow: "",
        userGrade: "",
        remainCountOfDay: "",
        remainCountOfMonth: "",
        remainCountOfAnnual: "",
        remainCountVipOfDay: "",
        remainCountVipOfMonth: "",
        remainCountVipOfAnnual: "",
        payMethod: "TELMBRPAY"
      }
    };
  },
  mixins: [
    CommAuth
  ],
  metaInfo: {
    title: '이커머스 인증/결제 Template',
    titleTemplate: '통신사할인'
  },
  components: {
    PaSmTopMenu,
    PaSmFooter
  },
  mounted: async function() {
    const formData = this.reqPntForm;
    await ApiUtils
      .post('/fo/pa/telcoDcInitAuth', {})
      .then(res => {
        formData.ktGid = res.data.telcoDcKtGid;
        formData.ktMid = res.data.telcoDcKtMid;
        formData.ordId = res.data.ordId;
        formData.ktNormalDcCode = res.data.telcoDcKtNormalDcCode;
        formData.ktDoubleDcCode = res.data.telcoDcKtDoubleDcCode;
        formData.lgupGid = res.data.telcoDcLgupGid;
        formData.lgupMid = res.data.telcoDcLgupMid;
        formData.pcReqUrl = res.data.telcoDcPcPayUrl;
        formData.mobReqUrl = res.data.telcoDcMobPayUrl;
        if (formData.deviceType === "PC") {
          formData.reqUrl = res.data.telcoDcPcPayUrl;
        } else {
          formData.reqUrl = res.data.telcoDcMobPayUrl;
        }

        if (formData.telcoType === "KT") {
          formData.gid = res.data.telcoDcKtGid;
          formData.mid = res.data.telcoDcKtMid;
          formData.goodsName = res.data.telcoDcKtNormalDcCode; // KT 더블할인 프로모션은 계약기간 만료로 인해 일반할인으로 고정
        } else {
          formData.gid = res.data.telcoDcLgupGid;
          formData.mid = res.data.telcoDcLgupMid;
          formData.goodsName = "";
        }
      });
  },
  methods: {
    changeDeviceType() {
      const formData = this.reqPntForm;
      if (formData.deviceType === "PC") {
        formData.reqUrl = formData.pcReqUrl;
      } else {
        formData.reqUrl = formData.mobReqUrl;
      }
    },
    changeTelcoType() {
      const formData = this.reqPntForm;
      if (formData.telcoType === "KT") {
        formData.gid = formData.ktGid;
        formData.mid = formData.ktMid;
        formData.goodsName = formData.ktNormalDcCode; // KT 더블할인 프로모션은 계약기간 만료로 인해 일반할인으로 고정
      } else {
        formData.gid = formData.lgupGid;
        formData.mid = formData.lgupMid;
        formData.goodsName = "";
      }
    },
    async reqRetrievePnt() {
      const formData = this.reqPntForm;
      const custNo = formData.custNo;
      const telcoType = formData.telcoType;
      const gid = formData.gid;
      const mid = formData.mid;
      const goodsName = formData.goodsName;
      const birthDay = formData.birthDay;
      const cardNo1 = formData.cardNo1;
      const cardNo2 = formData.cardNo2;
      const cardNo3 = formData.cardNo3;
      const cardNo4 = formData.cardNo4;
      const amt = formData.amt;
      const reqUrl = formData.reqUrl;
      if (StringUtils.isEmpty(custNo)) {
        // alert("회원번호을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(telcoType)) {
        alert("통신사를 선택해주세요.");
        return;
      }

      if (StringUtils.isEmpty(gid)) {
        // alert("gid를 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(mid)) {
        // alert("mid를 입력해주세요.");
        return;
      }

      if (formData.telcoType === "KT" && StringUtils.isEmpty(goodsName)) {
        // alert("KT 할인 프로모션 코드를 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(birthDay)) {
        alert("생년월일을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(cardNo1) || StringUtils.isEmpty(cardNo2) || StringUtils.isEmpty(cardNo3) || StringUtils.isEmpty(cardNo4)) {
        alert("카드번호를 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(reqUrl)) {
        // alert("reqUrl을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(amt)) {
        // alert("총구매금액을 입력해주세요.");
        return;
      }

      if (StringUtils.isEmpty(discountAmt)) {
        // alert("할인대상금액을 입력해주세요.");
        return;
      }

      let deviceType = "";
      if (formData.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }

      let url = "";
      if (formData.telcoType === "KT") {
        url = "/fo/pa/retrieveKtDcPnt" + ((this.reqPntForm.deviceType === "PC") ? "Pc" : "Mob");
      } else {
        url = "/fo/pa/retrieveLguplusDcPnt" + ((this.reqPntForm.deviceType === "PC") ? "Pc" : "Mob");
      }

      const data = {
        deviceType: deviceType,
        cmmMbrNo: formData.userId,
        telcoType: telcoType,
        birthDay: formData.birthDay,
        cardNo: formData.cardNo1 + formData.cardNo2 + formData.cardNo3 + formData.cardNo4,
        amt: formData.amt,
        discountAmt: formData.discountAmt,
        payMethod: formData.payMethod,
        goodsName: formData.goodsName
      };
      await ApiUtils
        .post(url, data)
        .then(res => {
          if (res.data !== null) {
            this.resPntForm = res.data;
          }
          console.log(res.data);
        });
    },
    async reqApprPnt() {
      let deviceType = "";
      const formData = this.reqPntForm;
      const telcoType = formData.telcoType;
      if (formData.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }

      let url = "";
      if (formData.telcoType === "KT") {
        url = "/fo/pa/reqApprKtDcPnt" + ((this.reqPntForm.deviceType === "PC") ? "Pc" : "Mob");
      } else {
        url = "/fo/pa/reqApprLguplusDcPnt" + ((this.reqPntForm.deviceType === "PC") ? "Pc" : "Mob");
      }

      const reqApprTelcoDcPntData = {
        deviceType: deviceType,
        cmmMbrNo: formData.userId,
        ordId: formData.ordId,
        telcoType: telcoType,
        birthDay: formData.birthDay,
        cardNo: formData.cardNo1 + formData.cardNo2 + formData.cardNo3 + formData.cardNo4,
        amt: formData.amt,
        discountAmt: formData.discountAmt,
        resultCode: this.resPntForm.resultCode,
        resultMsg: this.resPntForm.resultMsg,
        tid: this.resPntForm.tid,
        authDate: this.resPntForm.authDate,
        authCode: this.resPntForm.authCode,
        transMessageNo: this.resPntForm.transMessageNo,
        messageCode: this.resPntForm.messageCode,
        transDate: this.resPntForm.transDate,
        cardNo: this.resPntForm.cardNo,
        discountAmt: this.resPntForm.discountAmt,
        remainLimit: this.resPntForm.remainLimit,
        remainLimitOverflow: this.resPntForm.remainLimitOverflow,
        userGrade: this.resPntForm.userGrade,
        remainCountOfDay: this.resPntForm.remainCountOfDay,
        remainCountOfMonth: this.resPntForm.remainCountOfMonth,
        remainCountOfAnnual: this.resPntForm.remainCountOfAnnual,
        remainCountVipOfDay: this.resPntForm.remainCountVipOfDay,
        remainCountVipOfMonth: this.resPntForm.remainCountVipOfMonth,
        remainCountVipOfAnnual: this.resPntForm.remainCountVipOfAnnual,
        goodsName: formData.goodsName,
        payMethod: "TELMBRPAY"
      };
      await ApiUtils
        .post(url, reqApprTelcoDcPntData)
        .then(res => {
          if (res.data !== null) {
            this.resPntForm = res.data;
          }
          console.log(res.data);
        });
    },
    async reqCancelPnt() {
      let deviceType = "";
      const formData = this.resPntForm;
      if (formData.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      let url = "";
      if (this.reqPntForm.telcoType === "KT") {
        url = "/fo/pa/reqCancelKtPnt" + ((this.reqPntForm.deviceType === "PC") ? "Pc" : "Mob");
      } else {
        url = "/fo/pa/reqCancelLguplusPnt" + ((this.reqPntForm.deviceType === "PC") ? "Pc" : "Mob");
      }

      const reqCancelTelcoDcPntData = {
        tid: formData.tid,
        deviceType: deviceType,
        cmmMbrNo: formData.userId,
        ordId: this.reqPntForm.ordId,
        cancelAmt: formData.discountAmt,
        cardNo: formData.cardNo,
        authCode: formData.authCode,
        payCorp: formData.telcoType
      };
      await ApiUtils
        .post(url, reqCancelTelcoDcPntData)
        .then(res => {
          console.log(res.data);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
