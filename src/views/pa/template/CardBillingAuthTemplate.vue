<template>
    <div id="authCardBilling" v-bind:class="[siteClass]">
      <PaSmTopMenu :activeIndex="activeIndex" :type="sticky ? 'sub': ''" />
      <!-- START : 본문 -->
      <div class="container">
        <form class="form-horizontal" id="billingForm" name="billingForm" method="post">
          <fieldset>
            <legend>신용카드[Billing]]</legend>
            <!-- smartro or lgu+ 페이나우 -->
            <input type="hidden" id="payCorpCd" name="payCorpCd" v-model="form.payCompany"/>
            <div class="form-group">
              <label for="payCompany" class="col-lg-2">스마트로 or lgu+ 페이나우</label>
              <div class="col-lg-10">
                <select v-model="form.payCompany" class="form-control" @change="payCompanyChangeOption">
                  <option v-for="option in payCorp" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
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
            <!-- (MID) -->
            <div class="form-group">
              <label for="mid" class="col-lg-2">결제사 MID</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="결제사 mid" name="mid" v-model="form.mid" value="GSFPNWTT2">
              </div>
            </div>
            <!-- 연동채널코드(channelCd) -->
            <div class="form-group">
              <label for="channelCd" class="col-lg-2">연동채널코드</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="연동채널코드" name="channelCd" v-model="form.channelCd">
              </div>
            </div>
            <!-- 주문번호 -->
            <div class="form-group">
              <label for="ordId" class="col-lg-2">주문번호</label>
              <div class="col-lg-10">
                <input id="ordId" name="ordId" v-model="form.ordId" class="form-control" placeholder="주문번호" >
              </div>
            </div>
            <!-- custNo  -->
            <input type="hidden" id="userId" name="userId" value="E000045142870"/>
            <div class="form-group">
              <label for="custNo" class="col-lg-2">custNo</label>
              <div class="col-lg-10">
                <input name="custNo" class="form-control" placeholder="CRM고객번호" value="E000045142870">
              </div>
            </div>
            <!-- cmmMbrNo -->
            <div class="form-group">
              <label for="cmmMbrNo" class="col-lg-2">cmmMbrNo</label>
              <div class="col-lg-10">
                <input name="cmmMbrNo" class="form-control" placeholder="cmmMbrNo" value="12861410">
              </div>
            </div>
            <!-- 가격(price) -->
            <div class="form-group">
              <label for="price" class="col-lg-2">가격</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="가격" id="price" name="price" value="1000">
              </div>
            </div>
            <!-- decryptHashKey(템플릿테스트용) -->
            <div class="form-group">
              <label for="decryptHashKey" class="col-lg-2">decryptHashKey</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="decryptHashKey" name="decryptHashKey" v-model="form.decryptHashKey">
              </div>
            </div>
            <!-- 발급요청URL(actionUrl) -->
            <div class="form-group">
              <label for="actionUrl" class="col-lg-2">actionUrl</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="actionUrl" name="actionUrl" v-model="form.actionUrl">
              </div>
            </div>
            <!-- 리턴URL(returnUrl) -->
            <div class="form-group">
              <label for="returnUrl" class="col-lg-2">returnUrl</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="returnUrl" name="returnUrl" v-model="form.returnUrl">
              </div>
            </div>
            <!-- 조회URL(retrieveUrl) 참고용 URL입니다. 직접 호출하지 마세요. was 레벨에서만 가능합니다. -->
            <div class="form-group">
              <label for="retrieveUrl" class="col-lg-2">retrieveUrl</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="retrieveUrl" name="retrieveUrl" v-model="form.retrieveUrl">
              </div>
            </div>
            <!-- 삭제URL(deleteUrl) 참고용 URL입니다. 직접 호출하지 마세요. was 레벨에서만 가능합니다. -->
            <div class="form-group">
              <label for="deleteUrl" class="col-lg-2">deleteUrl</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="deleteUrl" name="deleteUrl" v-model="form.deleteUrl">
              </div>
            </div>
            <!-- 사업자 또는 주민번호 앞 6(registNo) -->
            <div class="form-group">
              <label for="registNo" class="col-lg-2">사업자 또는 주민번호 앞 6</label>
              <div class="col-lg-10">
                <input v-model="form.registNo" class="form-control" placeholder="사업자 또는 주민번호 앞 6" name="registNo" >
              </div>
            </div>
            <!-- (checkRegistNoYn) -->
            <div class="form-group">
              <label for="checkRegistNoYn" class="col-lg-2">checkRegistNoYn</label>
              <div class="col-lg-10">
                <input v-model="form.checkRegistNoYn" class="form-control" placeholder="checkRegistNoYn" name="checkRegistNoYn">
              </div>
            </div>
            <!-- gid(SSPMallId) -->
            <div class="form-group">
              <label for="gid" class="col-lg-2">gid(SSPMallId)</label>
              <div class="col-lg-10">
                <input v-model="form.gid" class="form-control" placeholder="gid" name="gid">
              </div>
            </div>
            <!-- 요쳥일시 -->
            <div class="form-group">
              <label for="requestDate" class="col-lg-2">요쳥일시</label>
              <div class="col-lg-10">
                <input v-model="form.requestDate" class="form-control" placeholder="요쳥일시" name="requestDate">
              </div>
            </div>
            <!-- encodingType -->
            <div class="form-group">
              <label for="encodingType" class="col-lg-2">encodingType</label>
              <div class="col-lg-10">
                <input v-model="form.encodingType" class="form-control" placeholder="encodingType" name="encodingType">
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
              <div class="col-lg-10 col-lg-offset-2">
                <button type="reset" class="btn btn-default">Cancel</button>
                <button type="button" class="btn btn-primary" @click="reqBillingKey">빌링키발급요청</button>
                <button type="button" class="btn btn-primary" @click="getBillingKey">빌링키조회</button>
                <button type="button" class="btn btn-primary" @click="delBillingKey">빌링키삭제</button>
                <button type="button" class="btn btn-primary" @click="doPay">승인</button>
                <button type="button" class="btn btn-primary" @click="doCancel">승인취소</button>
              </div>
            </div>
          </fieldset>
        </form>
        <div class="frame-div" style="display:none" id="frame_div">
          <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="600px;" align="center"/>
        </div>
        <form class="form-horizontal" name="rsltForm" id="rsltForm">
          <fieldset>
            <legend>결과값</legend>
            <!-- resultCode -->
            <div class="form-group">
              <label for="resultCode" class="col-lg-2">resultCode</label>
              <div class="col-lg-10">
                <input type="text" id ="resultCode" name="resultCode" value="" class="form-control" placeholder="resultCode" v-model="rsform.resultCode">
              </div>
            </div>
            <!-- resultMsg -->
            <div class="form-group">
              <label for="resultMsg" class="col-lg-2">resultMsg</label>
              <div class="col-lg-10">
                <input type="text" id ="resultMsg" name="resultMsg" value="" class="form-control" placeholder="resultMsg" v-model="rsform.resultMsg">
              </div>
            </div>
            <!-- authDate -->
            <div class="form-group">
              <label for="authDate" class="col-lg-2">authDate</label>
              <div class="col-lg-10">
                <input type="text" id ="authDate" name="authDate" value="" class="form-control" placeholder="authDate" v-model="rsform.authDate">
              </div>
            </div>
            <!-- authCode -->
            <div class="form-group">
              <label for="authCode" class="col-lg-2">authCode</label>
              <div class="col-lg-10">
                <input type="text" id ="authCode" name="authCode" value="" class="form-control" placeholder="authCode" v-model="rsform.authCode">
              </div>
            </div>
            <!-- billingKey -->
            <div class="form-group">
              <label for="billingKey" class="col-lg-2">billingKey</label>
              <div class="col-lg-10">
                <input type="text" id ="billingKey" name="billingKey" value="" class="form-control" placeholder="billingKey" v-model="rsform.billingKey">
              </div>
            </div>
            <!-- channelCd -->
            <div class="form-group">
              <label for="channelCd" class="col-lg-2">channelCd</label>
              <div class="col-lg-10">
                <input type="text" id ="channelCd" name="channelCd" value="" class="form-control" placeholder="channelCd" v-model="rsform.channelCd">
              </div>
            </div>
            <!-- custNo -->
            <div class="form-group">
              <label for="custNo" class="col-lg-2">custNo</label>
              <div class="col-lg-10">
                <input type="text" id ="custNo" name="custNo" value="" class="form-control" placeholder="custNo" v-model="rsform.custNo">
              </div>
            </div>
            <!-- cardIssuer -->
            <div class="form-group">
              <label for="cardIssuer" class="col-lg-2">cardIssuer</label>
              <div class="col-lg-10">
                <input type="text" id ="cardIssuer" name="cardIssuer" value="" class="form-control" placeholder="cardIssuer" v-model="rsform.cardIssuer">
              </div>
            </div>
            <!-- cardIssuerName -->
            <div class="form-group">
              <label for="cardIssuerName" class="col-lg-2">cardIssuerName</label>
              <div class="col-lg-10">
                <input type="text" id ="cardIssuerName" name="cardIssuerName" value="" class="form-control" placeholder="cardIssuerName" v-model="rsform.cardIssuerName">
              </div>
            </div>
            <!-- tid -->
            <div class="form-group">
              <label for="tid" class="col-lg-2">tid</label>
              <div class="col-lg-10">
                <input type="text" id ="tid" name="tid" value="" class="form-control" placeholder="tid" v-model="rsform.tid">
              </div>
            </div>
            <!-- appCardCode -->
            <div class="form-group">
              <label for="appCardCode" class="col-lg-2">appCardCode</label>
              <div class="col-lg-10">
                <input type="text" id ="appCardCode" name="appCardCode" value="" class="form-control" placeholder="appCardCode" v-model="rsform.appCardCode">
              </div>
            </div>
            <!-- appCardName -->
            <div class="form-group">
              <label for="appCardName" class="col-lg-2">appCardName</label>
              <div class="col-lg-10">
                <input type="text" id ="appCardName" name="appCardName" value="" class="form-control" placeholder="appCardName" v-model="rsform.appCardName">
              </div>
            </div>
            <!-- acquCardCode -->
            <div class="form-group">
              <label for="acquCardCode" class="col-lg-2">acquCardCode</label>
              <div class="col-lg-10">
                <input type="text" id ="acquCardCode" name="acquCardCode" value="" class="form-control" placeholder="acquCardCode" v-model="rsform.acquCardCode">
              </div>
            </div>
            <!-- acquCardName -->
            <div class="form-group">
              <label for="acquCardName" class="col-lg-2">acquCardName</label>
              <div class="col-lg-10">
                <input type="text" id ="acquCardName" name="acquCardName" value="" class="form-control" placeholder="acquCardName" v-model="rsform.acquCardName">
              </div>
            </div>
            <!-- cardMerchantNo -->
            <div class="form-group">
              <label for="cardMerchantNo" class="col-lg-2">cardMerchantNo</label>
              <div class="col-lg-10">
                <input type="text" id ="cardMerchantNo" name="cardMerchantNo" value="" class="form-control" placeholder="cardMerchantNo" v-model="rsform.cardMerchantNo">
              </div>
            </div>
            <!-- cardNum -->
            <div class="form-group">
              <label for="cardNum" class="col-lg-2">cardNum</label>
              <div class="col-lg-10">
                <input type="text" id ="cardNum" name="cardNum" value="" class="form-control" placeholder="cardNum" v-model="rsform.cardNum">
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
  name: "AuthCardBilling",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      sticky: false,
      activeIndex: 5, // GNB 활성화
      form: {
          payCompany: "SMARTROPG",
          deviceType: "PC",
          mid: "",
          ordId: "",
          channelCd: '',
          custNo: '',
          cmmMbrNo: '',
          decryptHashKey: '',
          actionUrl: '',
          returnUrl: '',
          retrieveUrl: '',
          deleteUrl: '',
          registNo: '',
          checkRegistNoYn: 'N',
          gid: '',
          requestDate: '',
          encodingType: 'UTF-8',
          hashKey: ''
      },
      rsform: {
        resultCode: "",
        resultMsg: "",
        authDate: "",
        authCode: "",
        billingKey: "",
        channelCd: "",
        custNo: "",
        cardIssuer: "",
        cardIssuerName: "",
        tid: "",
        appCardCode: "",
        appCardName: "",
        acquCardCode: "",
        acquCardName: "",
        cardMerchantNo: "",
        cardNum: ""
      }
    };
  },
  mixins: [
    CommAuth
  ],
  metaInfo: {
    title: '통합인증/결제 Test Suite - Responsive',
    titleTemplate: '신용카드 > [Billing]]'
  },
  components: {
    PaSmTopMenu,
    PaSmFooter
  },
  mounted: async function() {
    this.init();
    const that = this;
    window.callbackFnc = function(hashKey) {
      console.log(hashKey);
      ApiUtils
        .post('/fo/pa/billingAuthCallback', {hashKey: hashKey})
        .then(res => {
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data.resultMsg);
            alert('빌링키 발급 시 오류가 발생하였습니다.');
            return;
          }
          console.log(res.data);
          that.rsform = res.data;
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
        this.form.mid = "gsstore10m";
      } else {
        this.form.mid = "GSFPNWTT2";
      }
    },
    async init() {
      const formData = this.form;
      const mid = formData.mid;
      const data = {
        authType: "BILLING",
        cmmMbrNo: billingForm.cmmMbrNo.value,
        pytcTrmnCallTypeCd: "FO" // 유료맴버쉽 정기결제는 BO
      };
      const that = this;
      await ApiUtils.post('/fo/pa/cardInitAuth' + ((formData.deviceType === "PC") ? "Pc" : "Mob"), data).then(res => {
        if (res.data === null || res.data.resultCode !== '0000') {
          console.error(res.data);
          alert('인증정보를 불러올 수 없습니다.');
          return;
        }
        console.log(res.data);
        that.form = res.data;
        that.form.deviceType = formData.deviceType;
        if (formData.deviceType === "PC") {
          that.form.actionUrl = that.form.billingPcReqUrl;
          that.form.returnUrl = that.form.billingPcReqCallbackUrl+".hashKey_"+res.data.hashKey;
          that.form.retrieveUrl = that.form.billingPcRetrieveUrl;
          that.form.deleteUrl = that.form.billingPcDeleteUrl;
        } else {
          that.form.actionUrl = that.form.billingMobReqUrl;
          that.form.returnUrl = that.form.billingMobReqCallbackUrl+".hashKey_"+res.data.hashKey;
          that.form.retrieveUrl = that.form.billingMobRetrieveUrl;
          that.form.deleteUrl = that.form.billingMobDeleteUrl;
        }
        that.form.mid = res.data.trmnId;
        that.form.gid = res.data.billingGid;
        that.form.payCompany = "SMARTROPG";
        this.form.mid = res.data.trmnId;
        this.form.ordId = res.data.ordId;
        this.form.decryptHashKey = res.data.decryptHashKey;
        this.form.channelCd = that.form.billingChannelCd;
        this.form.checkRegistNoYn = "N";
        this.form.gid = that.form.pgId;
        this.form.encodingType = "UTF-8";
      });
    },
    async reqBillingKey() {
      let title = "";
      let option = "";
      if (this.form.payCompany === "PAYNOW") {
        title = "MPI_FRAME";
        option = "width=370, height=430, menubar=no, status=no, resizable=no, scrollbars=no, fullscreen=no";
      } else {
        title = "payWindow";
        option = "width=500, height=500";
      }
      billingForm.userId.value = billingForm.custNo.value;
      billingForm.action = billingForm.actionUrl.value;
      billingForm.method = "post";
      window.open("", title, option);
      billingForm.target = title;
      billingForm.submit();
    },
    async getBillingKey() {
      const data = {
        userId: billingForm.userId.value,
        payCorpCd: this.form.payCompany
      };
      const that = this;
      await ApiUtils
        .post("/fo/pa/retrieveCardBillingKeyList" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data)
        .then(res => {
          that.rsform = res.data;
          let isFail = false;
          if (res.data === null || res.data.resultCode !== '0000') {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
            if (res.data.billingKeyList !== null && res.data.billingKeyList.length >= 1) {
              that.rsform.userId = res.data.billingKeyList[0].userId;
              that.rsform.billingKey = res.data.billingKeyList[0].billingKey;
              that.rsform.cardIssuer = res.data.billingKeyList[0].cardIssuer;
              that.rsform.cardIssuerName = res.data.billingKeyList[0].cardIssuerName;
            }
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('billing key 조회 중 오류가 발생하였습니다. ');
          }
        }
      );
    },
    async delBillingKey() {
      const data = {
        userId: billingForm.custNo.value,
        payCorpCd: this.form.payCompany,
        billingKey: this.rsform.billingKey
      };
      const that = this;
      await ApiUtils
        .post("/fo/pa/deleteCardBillingKeyList" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data)
        .then(res => {
          that.rsform = res.data;
          let isFail = false;
          if (res.data === null || res.data.resultCode !== '0000') {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('billing key 조회 중 오류가 발생하였습니다. ');
          }
        }
      );
    },
    async doCancel() {
      let deviceType = "";
      const billingForm = document.getElementById('billingForm');
      const rsltForm = document.getElementById('rsltForm');

      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      let cancelType = "0";
      if (billingForm.cancelType.value === "PART") {
        cancelType = "1";
      }
      const data = {
        deviceType: deviceType,
        tid: rsltForm.tid.value,
        cancelAmt: billingForm.price.value,
        cancelMsg: '취소메세지',
        mid: billingForm.mid.value,
        ordId: this.form.ordId,
        cmmMbrNo: this.form.cmmMbrNo,
        payCorp: billingForm.payCorpCd.value
      };
      await ApiUtils
        .post("/fo/pa/reqCancelCardBilling" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data)
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
            rsltForm.tid.value = "";
          }
        }
      );
    },
    async doPay() {
      let deviceType = "";
      const that = this;
      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      const data = {
        deviceType: deviceType,
        amt: billingForm.price.value,
        goodsName: '이커머스상품',
        goodsCnt: "1",
        buyerName: "홍길동",
        buyerTel: "010000000000",
        mallUserID: billingForm.custNo.value,
        cmmMbrNo: this.form.cmmMbrNo,
        ordId: this.form.ordId,
        mid: this.form.mid,
        payCorp: this.form.payCompany,
        billingKey: this.rsform.billingKey,
        cardQuota: "00",
        cardCode: this.rsform.cardIssuer
      };
      await ApiUtils
        .post("/fo/pa/reqApprCardBilling" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data)
        .then(res => {
          let isFail = false;
          if (res.data === null || (res.data.resultCode !== '3001' && res.data.resultCode !== '7001' && res.data.resultCode !== "0000")) {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('결제 승인 중 에러가 발생하였습니다.');
          } else {
            that.rsform = res.data;
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
