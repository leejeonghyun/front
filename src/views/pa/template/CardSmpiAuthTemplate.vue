<template>
    <div id="authCardSmpi" v-bind:class="[siteClass]">
      <PaSmTopMenu :activeIndex="activeIndex" :type="sticky ? 'sub': ''" />
      <!-- START : 본문 -->
      <div class="container">
        <form class="form-horizontal" id="smpiForm" name="smpiForm" method="post" @submit.prevent="submit()">
          <fieldset>
            <legend>신용카드[SMPI]</legend>
            <!-- smartro or kcp -->
            <div class="form-group">
              <label for="payCompany" class="col-lg-2">스마트로 or KCP</label>
              <div class="col-lg-10">
                <select v-model="form.payCompany" class="form-control" @change="payCompanyChangeOption">
                  <option v-for="option in payCompany" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <!-- PC or Mob -->
            <div class="form-group">
              <label for="deviceType" class="col-lg-2">PC or Mob</label>
              <div class="col-lg-10">
                <select v-model="form.deviceType" class="form-control" @change="changeOption">
                  <option v-for="option in deviceType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="card_code" class="col-lg-2">Card</label>
              <div class="col-lg-10">
                <select v-model="form.cardCode" class="form-control">
                  <option value="">카드선택</option>
                  <option v-for="option in cardCodeList" v-bind:key="option.code" :value="option.code" v-show="option.typeCd === 'SMPI'">{{option.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="payment MID" class="col-lg-2">결제사 MID(스마트로/kcp)</label>
              <div class="col-lg-10">
                <input name="paymentMid" class="form-control" v-model="form.paymentMid" placeholder="결제사MID" value="gsstore01m">
              </div>
            </div>
            <!-- 주문번호 -->
            <div class="form-group">
              <label for="ordId" class="col-lg-2">주문번호</label>
              <div class="col-lg-10">
                <input id="ordId" name="ordId" v-model="form.ordId" class="form-control" placeholder="주문번호" >
              </div>
            </div>
            <!--고객번호(memNo)  -->
            <div class="form-group">
              <label for="memNo" class="col-lg-2">고객번호</label>
              <div class="col-lg-10">
                <input name="memNo" class="form-control" placeholder="고객번호" value="12861410">
              </div>
            </div>
            <!-- 가격(order_amount) -->
            <div class="form-group">
              <label for="order_amount" class="col-lg-2">* 가격</label>
              <div class="col-lg-10">
                <input name="order_amount" class="form-control" placeholder="상품가격" v-model="form.orderAmount">
              </div>
            </div>
            <!-- 과세대상금액(taxableAmt) -->
            <div class="form-group">
              <label for="taxableAmt" class="col-lg-2">과세대상금액</label>
              <div class="col-lg-10">
                <input name="taxableAmt" class="form-control" placeholder="과세대상금액" readonly>
              </div>
            </div>
            <!-- 부가세(tax) -->
            <div class="form-group">
              <label for="tax" class="col-lg-2">부가세</label>
              <div class="col-lg-10">
                <input name="tax" class="form-control" placeholder="부가세" readonly>
              </div>
            </div>
            <!-- 면세대상금액(taxFreeAmt) -->
            <div class="form-group">
              <label for="taxFreeAmt" class="col-lg-2">* 면세대상금액</label>
              <div class="col-lg-10">
                <input name="taxFreeAmt" class="form-control" placeholder="면세대상금액">
              </div>
            </div>
            <!-- 상품명order_goods) -->
            <div class="form-group">
              <label for="order_goods" class="col-lg-2">* 상품명</label>
              <div class="col-lg-10">
                <input name="order_goods" class="form-control" placeholder="상품명" v-model="form.orderGoods">
              </div>
            </div>
            <!-- 통화(order_currency) -->
            <div class="form-group">
              <label for="order_currency" class="col-lg-2">* 통화</label>
              <div class="col-lg-10">
                <input name="order_currency" id="order_currency" v-model="form.currency" class="form-control" placeholder="통화" >
              </div>
            </div>
            <!-- 카드사명(order_cardname) -->
            <div class="form-group">
              <label for="order_cardname" class="col-lg-2">* 카드사명</label>
              <div class="col-lg-10">
                <input name="order_cardname" v-model="form.orderCardname" class="form-control" placeholder="카드사명" >
              </div>
            </div>
            <!-- 모바일서비스여부(mobile)-->
            <div class="form-group">
              <label for="mobile" class="col-lg-2">모바일서비스여부</label>
              <div class="col-lg-10">
                <input name="MOBILE" v-model="form.mobile" class="form-control" placeholder="모바일서비스여부" >
              </div>
            </div>
            <!-- 가맹점id(regno)-->
            <div class="form-group">
              <label for="regno" class="col-lg-2">* 가맹점id</label>
              <div class="col-lg-10">
                <input name="REGNO" v-model="form.regno" class="form-control" placeholder="가맹점id" >
              </div>
            </div>
            <!-- 안심클릭가맹점id(mid)-->
            <div class="form-group">
              <label for="mid" class="col-lg-2">* 안심클릭가맹점id</label>
              <div class="col-lg-10">
                <input name="mId" id="mId" v-model="form.mid" class="form-control" placeholder="안심클릭가맹점id" >
              </div>
            </div>
            <!-- 쇼핑몰사업자번호(order_business)-->
            <div class="form-group">
              <label for="order_business" class="col-lg-2">* 쇼핑몰사업자번호</label>
              <div class="col-lg-10">
                <input name="order_business" v-model="form.bizNo" class="form-control" placeholder="쇼핑몰사업자번호" >
              </div>
            </div>
            <!-- 쇼핑몰명(order_mname)-->
            <div class="form-group">
              <label for="order_mname" class="col-lg-2">* 쇼핑몰명</label>
              <div class="col-lg-10">
                <input name="order_mname" v-model="form.name" class="form-control" placeholder="쇼핑몰명" >
              </div>
            </div>
            <!-- 가맹점번호(apvl_chain_no_lt)-->
            <div class="form-group">
              <label for="apvl_chain_no_lt" class="col-lg-2">* 가맹점번호</label>
              <div class="col-lg-10">
                <input name="apvl_chain_no_lt" v-model="form.apvlChainNo" class="form-control" placeholder="가맹점번호" >
              </div>
            </div>
            <!-- 가맹점사업자번호(apvl_seller_id_lt)-->
            <div class="form-group">
              <label for="apvl_seller_id_lt" class="col-lg-2">* 가맹점사업자번호</label>
              <div class="col-lg-10">
                <input name="apvl_seller_id_lt" v-model="form.apvlSellerIdLt" class="form-control" placeholder="가맹점사업자번호" >
              </div>
            </div>
            <!-- (pay)-->
            <div class="form-group">
              <label for="pay" class="col-lg-2">pay</label>
              <div class="col-lg-10">
                <input name="PAY" v-model="form.pay" class="form-control" placeholder="pay" >
              </div>
            </div>
            <!-- (IOS_RETURN_APP)-->
            <div class="form-group">
              <label for="KVP_GOODNAME" class="col-lg-2">IOS_RETURN_APP</label>
              <div class="col-lg-10">
                <input name="IOS_RETURN_APP" v-model="form.iosReturnApp" class="form-control" placeholder="IOS_RETURN_APP" >
              </div>
            </div>
            <!-- decryptHashKey(템플릿테스트용) -->
            <div class="form-group">
              <label for="decryptHashKey" class="col-lg-2">decryptHashKey</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="decryptHashKey" name="decryptHashKey" v-model="form.decryptHashKey">
              </div>
            </div>
            <!-- (receiveUrl)-->
            <div class="form-group">
              <label for="receiveUrl" class="col-lg-2">인증결과return url</label>
              <div class="col-lg-10">
                <input name="receiveUrl" v-model="form.returnUrl" class="form-control" placeholder="인증결과return url" >
              </div>
            </div>
            <!-- (actionUrl)-->
            <div class="form-group">
              <label for="actionUrl" class="col-lg-2">action url</label>
              <div class="col-lg-10">
                <input name="actionUrlToSmartro" v-model="form.actionUrl" class="form-control" placeholder="action url" >
              </div>
            </div>
            <div class="form-group">
              <div class="col-lg-10 col-lg-offset-2">
                <button type="reset" class="btn btn-default">Cancel</button>
                <button type="button" class="btn btn-primary" @click="getAuthentication">인증진행하기</button>
                <button type="button" class="btn btn-primary" @click="doPay">승인</button>
                <button type="button" class="btn btn-primary" @click="doCancel">승인취소</button>
              </div>
            </div>
          </fieldset>
        </form>
        <div class="frame-div" style="display:none" id="frame_div">
          <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="500px;" align="center" scrolling="yes" style="transform: translate(0px, 0px) scale(1) translateZ(0px);"/>
        </div>
        <form id="hidform">
          <input type="hidden" id="pareq1" name="pareq1" v-model="rform.pareq1"/>
          <input type="hidden" id="pareq2" name="pareq2" v-model="rform.pareq2"/>
          <input type="hidden" id="pareq3" name="pareq3" v-model="rform.pareq3"/>
          <input type="hidden" id="pareq4" name="pareq4" v-model="rform.pareq4"/>
        </form>
        <form class="form-horizontal" name="rsltForm" id="rsltForm">
          <fieldset>
            <legend>결과값</legend>
            <!-- cavv -->
            <div class="form-group">
              <label for="cavv" class="col-lg-2">cavv</label>
              <div class="col-lg-10">
                <input type="text" id ="cavv" name="cavv" value="" class="form-control" placeholder="cavv" v-model="rsform.cavv">
              </div>
            </div>
            <!-- xid -->
            <div class="form-group">
              <label for="xid" class="col-lg-2">xid</label>
              <div class="col-lg-10">
                <input type="text" id ="xid" name="xid" value="" class="form-control" placeholder="xid" v-model="rsform.xid">
              </div>
            </div>
            <!-- encXid -->
            <div class="form-group">
              <label for="encXid" class="col-lg-2">encXid</label>
              <div class="col-lg-10">
                <input type="text" id ="encXid" name="encXid" value="" class="form-control" placeholder="xid" v-model="rsform.encXid">
              </div>
            </div>
            <!-- eci -->
            <div class="form-group">
              <label for="eci" class="col-lg-2">eci</label>
              <div class="col-lg-10">
                <input type="text" id ="eci" name="eci" value="" class="form-control" placeholder="eci" v-model="rsform.eci">
              </div>
            </div>
            <!-- eci -->
            <div class="form-group">
              <label for="cardno" class="col-lg-2">cardno</label>
              <div class="col-lg-10">
                <input type="text" id ="cardno" name="cardno" value="" class="form-control" placeholder="cardno" v-model="rsform.cardNo">
              </div>
            </div>
            <!-- joincode -->
            <div class="form-group">
              <label for="joincode" class="col-lg-2">joincode</label>
              <div class="col-lg-10">
                <input type="text" id ="joincode" name="joincode" value="" class="form-control" placeholder="joincode" v-model="rsform.joinCode">
              </div>
            </div>
            <!-- tid -->
            <div class="form-group">
              <label for="TID" class="col-lg-2">TID</label>
              <div class="col-lg-10">
                <input name="TID" class="form-control" placeholder="TID">
              </div>
            </div>
            <!-- 전체취소 or 부분취소 -->
            <div class="form-group"><!--부분취소시 원거래 tid에 부분취소 선택 후 나머지 금액 취소해야 함 -->
              <label for="cancelType" class="col-lg-2">전체취소 or 부분취소</label>
              <div class="col-lg-10">
                <select class="form-control" name="cancelType">
                  <option v-for="option in cancelType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="KVP_ENCDATA" class="col-lg-2">카드사코드</label>
              <div class="col-lg-10">
                <table>
                  <tr v-for="option in cardCodeList" v-bind:key="option.code" :value="option.code">
                    <td>{{option.name}}</td>
                    <td>{{option.code}}</td>
                  </tr>
                </table>
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
  name: "AuthCardSmpi",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      sticky: false,
      activeIndex: 3, // GNB 활성화
      form: {
        payCompany: "SMARTRO",
        deviceType: "PC",
        cardCode: "44",
        paymentMid: "gsstore01m",
        mid: "",
        ordId: "",
        decryptHashKey: "",
        currency: "",
        orderAmount: "",
        ordergoods: "",
        orderCardname: "",
        mbrNo: "",
        mobile: "",
        regno: "",
        bizNo: "",
        name: "",
        apvlChainNoLt: "",
        apvlSellerIdLt: "",
        pay: "",
        iosReturnApp: "",
        returnUrl: "",
        actionUrl: "",
        mpiCardCode: "",
        hashKey: "",
        authType: "SMPI"
      },
      rform: {
        pareq1: "",
        pareq2: "",
        pareq3: "",
        pareq4: "",
        xid: "" // 인증 후 정보 비교를 위함.
      },
      rsform: {
        authType: "03",
        cardNo: "",
        /* amt: "",
        goodsName: "",
        goodsCnt: "1",
        buyerName: "",
        buyerTel: "010000000000", */
        cavv: "",
        xid: "",
        eci: "",
        joinCode: "",
        encXid: ""
      }
    };
  },
  mixins: [
    CommAuth
  ],
  metaInfo: {
    title: '통합인증/결제 Test Suite - Responsive',
    titleTemplate: '신용카드 > [SMPI]'
  },
  components: {
    PaSmTopMenu,
    PaSmFooter
  },
  mounted: async function() {
    this.init();
    const that = this;
    window.callbackFnc = function(hashKey) {
      console.log(that.form);
      ApiUtils
        .post('/fo/pa/smpiAuthCallback', {hashKey: hashKey})
        .then(res => {
          if (that.form.deviceType === 'MOB') {
              document.getElementById('frame_div').style.display = 'none';
          }
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data.resultMsg);
            alert('인증결과를 불러올 수 없습니다. 로그를 확인해주세요.');
            return;
          }
          that.rsform.encXid = res.data.encXid;
          that.rsform.eci = res.data.eci;
          that.rsform.cavv = res.data.cavv;
          that.rsform.cardNo = res.data.cardNo;
          that.rsform.joinCode = res.data.joinCode;
        }
      );
    };
  },
  methods: {
    changeOption() {
      this.init();
    },
    payCompanyChangeOption() {
      const paycompany = this.form.payCompany;
      if (paycompany === "SMARTRO") {
        this.form.paymentMid = "gsstore01m";
      } else {
        this.form.paymentMid = "AO03V"; // "T0000";
      }
    },
    async init() {
      const formData = this.form;
      const cardCode = formData.cardCode;
      const mid = formData.paymentMid;
      const authType = formData.authType;
      /**
       *카드사가 선택되지 않았을 경우.
       */
      if ( StringUtils.isEmpty(cardCode) ) {
        formData.cardCode = "44";
      }
      let mpiCardCode = "";
      if (cardCode == '44') {
        mpiCardCode = '4670080000000000';
      }
      const data = {
        authType: authType,
        cardCode: cardCode,
        cmmMbrNo: smpiForm.memNo.value
      };
      const that = this;
      await ApiUtils.post('/fo/pa/cardInitAuth' + ((formData.deviceType === "PC") ? "Pc" : "Mob"), data).then(res => {
        if (res.data === null || res.data.resultCode !== '0000') {
          console.error(res.data);
          alert('인증정보를 불러올 수 없습니다.');
          return;
        }
        that.form = res.data;
        if (formData.deviceType !== 'PC') {
          that.form.actionUrl = res.data.actionUrlMob;
          that.form.returnUrl = res.data.returnUrlMob;
          that.form.mobile = 'Y';
        }
        that.form.cardCode = cardCode;
        that.form.mpiCardCode = mpiCardCode;
        that.form.deviceType = formData.deviceType;
        that.form.authType = authType;
        that.form.returnUrl = that.form.returnUrl+".hashKey_"+res.data.hashKey;
        that.form.orderGoods = "GSFresh상품";
        that.form.orderAmount = "1004";
        that.form.paymentMid = mid;
        that.form.ordId = res.data.ordId;
        that.form.decryptHashKey = res.data.decryptHashKey;
        if (res.data.payCompany === "KCP") {
          that.form.paymentMid = "AO03V"; // "T0000";
        }
      });
    },
    async doCancel() {
      let deviceType = "";
      const rsltForm = document.getElementById('rsltForm');
      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      let cancelType = "0";
      if (rsltForm.cancelType.value === "PART") {
        cancelType = "1";
      }
      const data = {
        deviceType: deviceType,
        tid: rsltForm.TID.value,
        cancelAmt: this.form.orderAmount,
        cancelMsg: '취소메세지',
        partialCancelCode: cancelType,
        mid: this.form.paymentMid,
        ordId: this.form.ordId,
        payCorp: this.form.payCompany
      };
      await ApiUtils
        .post("/fo/pa/reqCancelCard" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data)
        .then(res => {
          let isFail = false;
          console.log(res.data.resultCode);
          if (res.data === null || (res.data.resultCode !== '2001' && res.data.resultCode !== '0000')) {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('결제 취소 중 에러가 발생하였습니다.['+res.data.resultMsg+']');
          } else {
            alert('결제가 정상 취소되었습니다.['+res.data.resultMsg+']');
            if (cancelType !== "1") {
              rsltForm.TID.value = "";
            } else {
              if (this.form.payCompany === "KCP") {
                rsltForm.remainCancelPossibleAmt.value = rsltForm.remainCancelPossibleAmt.value - rsltForm.modMny.value;
              }
            }
          }
        }
      );
    },
    async doPay() {
      const rsltForm = document.getElementById('rsltForm');
      let deviceType = "";
      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      let smartroCardCode = "";
      if (this.form.cardCode === "44") {
        smartroCardCode = "08";
      }
      const amt = this.form.orderAmount;
      if ( StringUtils.isEmpty(smpiForm.taxFreeAmt.value) ) {
          alert("면세대상금액을 입력해주세요.");
          return;
      } else {
        smpiForm.taxableAmt.value = Math.round((amt - smpiForm.taxFreeAmt.value) / 1.1);
        smpiForm.tax.value = amt - smpiForm.taxableAmt.value;
      }
      const data = {
        deviceType: deviceType,
        amt: this.form.orderAmount,
        goodsName: this.form.orderGoods,
        goodsCnt: "1",
        buyerName: "홍길동",
        buyerTel: "010000000000",
        mallUserID: smpiForm.memNo.value,
        authType: this.rsform.authType,
        cardInterest: "0",
        cardQuota: "00",
        cardNo: this.rsform.cardNo,
        xid: this.rsform.encXid,
        eci: this.rsform.eci,
        cavv: this.rsform.cavv,
        joinCode: this.rsform.joinCode,
        formBankCd: smartroCardCode,
        mid: this.form.paymentMid,
        ordId: this.form.ordId,
        payCorp: this.form.payCompany,
        taxableAmt: smpiForm.taxableAmt.value,
        tax: smpiForm.tax.value,
        taxFreeAmt: smpiForm.taxFreeAmt.value
      };
      await ApiUtils
        .post("/fo/pa/reqApprCard" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data)
        .then(res => {
          let isFail = false;
          if (res.data === null || (res.data.resultCode !== '3001' && res.data.resultCode !== '7001' && res.data.resultCode !== '0000')) {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('결제 승인 중 에러가 발생하였습니다.');
          } else {
            rsltForm.reset();
            rsltForm.TID.value = res.data.tid;
            alert('결제가 완료되었습니다.');
          }
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
