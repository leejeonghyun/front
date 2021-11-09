<template>
    <div id="authCardXmpi" v-bind:class="[siteClass]">
      <PaSmTopMenu :activeIndex="activeIndex" :type="sticky ? 'sub': ''" />
      <!-- START : 본문 -->
      <div class="container">
        <form class="form-horizontal" id="xmpiForm" name="xmpiForm" method="post">
          <fieldset>
            <legend>신용카드[XMPI]</legend>
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
                <select v-model="form.cardCode" id="cardCode" class="form-control" @change="changeOption">
                  <option value="">카드선택</option>
                  <option v-for="option in cardCodeList" v-bind:key="option.code" :value="option.code" v-show="option.typeCd === 'XMPI'">{{option.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="payemnt MID" class="col-lg-2">결제사 MID(스마트로/kcp)</label>
              <div class="col-lg-10">
                <input name="paymentMid" class="form-control" v-model="form.mid" placeholder="결제사MID" value="gsstore01m">
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
            <!-- 카드명(cardName)-->
            <div class="form-group">
              <label for="cardName" class="col-lg-2">카드명</label>
              <div class="col-lg-10">
                <input name="cardName" v-model="form.orderCardname" class="form-control" placeholder="카드명" >
              </div>
            </div>
            <!--상품명(KVP_GOODNAME)  -->
            <div class="form-group">
              <label for="KVP_GOODNAME" class="col-lg-2">상품명</label>
              <div class="col-lg-10">
                <input v-model="form.orderGoods" class="form-control" placeholder="상품명" >
              </div>
            </div>
            <!-- 가격(KVP_PRICE) -->
            <div class="form-group">
              <label for="X_AMOUNT" class="col-lg-2">가격</label>
              <div class="col-lg-10">
                <input v-model="form.orderAmount" class="form-control" placeholder="상품가" >
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
            <!-- 결제종류(X_SP_CHAIN_CODE)-->
            <div class="form-group">
              <label for="X_SP_CHAIN_CODE" class="col-lg-2">결제종류</label>
              <div class="col-lg-10">
                <input type="text" v-model="form.spChainCode" id="sp_chain_code" name="sp_chain_code" value="0" class="form-control" placeholder="0:안심(일반)  1:간편결제(신한,삼성,현대)"  />
              </div>
            </div>
            <!-- 지불 화폐 단위 /한화 - WON, 미화 - USD(KVP_CURRENCY) -->
            <div class="form-group">
              <label for="X_CARDTYPE" class="col-lg-2">카드종류</label>
              <div class="col-lg-10">
                <input type="text" id="order_currency" name="order_currency" value="410" class="form-control" placeholder=""  />
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
              <label for="returnUrl" class="col-lg-2">인증결과return url</label>
              <div class="col-lg-10">
                <input name="returnUrl" v-model="form.returnUrl" class="form-control" placeholder="인증결과return url" >
              </div>
            </div>
            <!-- (actionUrl)-->
            <div class="form-group">
              <label for="actionUrl" class="col-lg-2">action url</label>
              <div class="col-lg-10">
                <input name="actionUrl" v-model="form.actionUrl" class="form-control" placeholder="action url" >
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
          <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="400px;" align="center"/>
        </div>
        <form id="hidform">
          <input type="hidden" id="pareq1" name="pareq1" v-model="rform.pareq1"/>
          <input type="hidden" id="pareq2" name="pareq2" v-model="rform.pareq2"/>
          <input type="hidden" id="pareq3" name="pareq3" v-model="rform.pareq3"/>
          <input type="hidden" id="pareq4" name="pareq4" v-model="rform.pareq4"/>
        </form>
        <form class="form-horizontal" name="rsltForm" id="rsltForm" >
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
  name: "AuthCardXmpi",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      sticky: false,
      activeIndex: 2, // GNB 활성화
      form: {
        payCompany: "SMARTRO",
        deviceType: "PC",
        cardCode: "43",
        mid: "gsstore01m",
        ordId: "",
        decryptHashKey: "",
        orderGoods: "",
        orderAmount: "",
        actionUrl: "",
        returnUrl: "",
        orderCardname: "",
        spChainCode: "",
        mpiCardCode: "",
        hashKey: "",
        authType: "XMPI"
      },
      rform: {
        pareq1: "",
        pareq2: "",
        pareq3: "",
        pareq4: ""
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
    titleTemplate: '신용카드 > [XMPI]'
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
        .post('/fo/pa/xmpiAuthCallback', {hashKey: hashKey})
        .then(res => {
          document.getElementById('frame_div').style.display = 'none';
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data.resultMsg);
            alert('인증결과를 불러올 수 없습니다. 로그를 확인해주세요.');
            return;
          }
          that.rsform.xid = res.data.xid;
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
        this.form.mid = "gsstore01m";
      } else {
        this.form.mid = "AO03V"; // "T0000";
      }
    },
    async init() {
      const formData = this.form;
      const cardCode = formData.cardCode;
      const mid = formData.mid;
      const authType = formData.authType;
      /**
       *카드사가 선택되지 않았을 경우.
       */
      if ( StringUtils.isEmpty(cardCode) ) {
        formData.cardCode = "43";
      }
      let mpiCardCode = "";
      if (cardCode == '43') {
        mpiCardCode = '51';
      } else if (cardCode == '11') {
        mpiCardCode = '91';
      } else if (cardCode == '35') {
        mpiCardCode = '42';
      } else if (cardCode == '21') {
        mpiCardCode = '81';
      } else if (cardCode == '45') {
        mpiCardCode = '61';
      }

      const data = {
        authType: authType,
        cardCode: mpiCardCode,
        cmmMbrNo: xmpiForm.memNo.value
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
        }
        that.form.cardCode = cardCode;
        that.form.mpiCardCode = mpiCardCode;
        that.form.deviceType = formData.deviceType;
        that.form.authType = authType;
        that.form.returnUrl = that.form.returnUrl+".hashKey_"+res.data.hashKey;
        that.form.orderGoods = "GSFresh상품";
        that.form.orderAmount = "1004";
        that.form.mid = mid;
        that.form.ordId = res.data.ordId;
        that.form.decryptHashKey = res.data.decryptHashKey;
        if (res.data.payCompany === "KCP") {
          that.form.mid = "AO03V"; // "T0000";
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
        mid: this.form.mid,
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
      if (this.form.cardCode === "43") {
        smartroCardCode = "04";
      } else if (this.form.cardCode === "21" || this.form.cardCode === "35") {
        smartroCardCode = "06";
      } else if (this.form.cardCode === "45") {
        smartroCardCode = "07";
      } else if (this.form.cardCode === "11") {
        smartroCardCode = "12";
      }
      const amt = this.form.orderAmount;
      if ( StringUtils.isEmpty(xmpiForm.taxFreeAmt.value) ) {
          alert("면세대상금액을 입력해주세요.");
          return;
      } else {
        xmpiForm.taxableAmt.value = Math.round((amt - xmpiForm.taxFreeAmt.value) / 1.1);
        xmpiForm.tax.value = amt - xmpiForm.taxableAmt.value;
      }
      const data = {
        deviceType: deviceType,
        amt: this.form.orderAmount,
        goodsName: this.form.orderGoods,
        goodsCnt: "1",
        buyerName: "홍길동",
        buyerTel: "010000000000",
        mallUserID: xmpiForm.memNo.value,
        authType: this.rsform.authType,
        cardInterest: "0",
        cardQuota: "00",
        cardNo: this.rsform.cardNo,
        xid: this.rsform.encXid,
        eci: this.rsform.eci,
        cavv: this.rsform.cavv,
        joinCode: this.rsform.joinCode,
        formBankCd: smartroCardCode,
        mid: this.form.mid,
        ordId: this.form.ordId,
        payCorp: this.form.payCompany,
        taxableAmt: xmpiForm.taxableAmt.value,
        tax: xmpiForm.tax.value,
        taxFreeAmt: xmpiForm.taxFreeAmt.value
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
