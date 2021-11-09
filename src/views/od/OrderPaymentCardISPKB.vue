<template>
    <div id="payCardIspFlag" class="wrap-full-popup" role="dialog" aria-modal="true">
      <div>
        <div class="header-popup">
          <strong>결제하기</strong>
        </div>
        <!-- START : 본문 -->
        <div class="full-popup-body scroll-area">
        <form id="ispForm" @submit.prevent class="form-horizontal" method="post">
          <!-- smartro or kcp -->
          <input type="hidden" name="payCompany" v-model="form.payCompany" /> <!-- smartro or kcp -->
          <input type="hidden" name="deviceType" v-model="form.deviceType" /> <!-- PC or Mob -->
          <input type="hidden" name="cardCode" v-model="form.cardCode" /> <!-- 카드종류 -->
          <input type="hidden" name="mid" v-model="form.mid" /> <!-- 결제사 MID(스마트로/kcp) -->
          <input type="hidden" name="buyer_name" v-model="form.buyer_name" /> <!-- 구매자(buyer_name) -->
          <input type="hidden" name="buyer_tel" v-model="form.buyer_tel" /> <!-- 구매자연락처(buyer_tel) -->
          <input type="hidden" name="memNo" v-model="form.memNo" /> <!-- 고객번호(mem_no) -->
          <input type="hidden" name="KVP_GOODNAME" v-model="form.KVP_GOODNAME" /> <!-- 상품명(KVP_GOODNAME) -->
          <input type="hidden" name="goods_cnt" v-model="form.goods_cnt" /> <!-- 상품수량(goods_cnt) -->
          <input type="hidden" name="KVP_PRICE" v-model="form.KVP_PRICE" /> <!-- 가격(KVP_PRICE) -->
          <input type="hidden" name="taxableAmt" v-model="form.taxableAmt"> <!-- 과세대상금액(taxableAmt) -->
          <input type="hidden" name="tax" v-model="form.tax"> <!-- 부가세(tax) -->
          <input type="hidden" name="taxFreeAmt" v-model="form.taxfreeAmt"> <!-- 면세대상금액(taxFreeAmt) -->
          <input type="hidden" name="KVP_CARDCOMPANY" v-model="form.KVP_CARDCOMPANY" /> <!-- 카드코드(KVP_CARDCOMPANY) -->
          <input type="hidden" name="KVP_CURRENCY" v-model="form.KVP_CURRENCY" /> <!-- 지불 화폐 단위 /한화 - WON, 미화 - USD(KVP_CURRENCY) -->
          <input type="hidden" name="VP_BC_ISSUERCODE" v-model="form.VP_BC_ISSUERCODE" /> <!-- BC 발행사 코드(VP_BC_ISSUERCODE) -->
          <input type="hidden" name="KVP_QUOTA_INF" v-model="form.KVP_QUOTA_INF" /> <!-- KVP_QUOTA_INF(일반할부개월수 정보) -->
          <input type="hidden" name="KVP_NOINT_INF" v-model="form.KVP_NOINT_INF" /> <!-- KVP_NOINT_INF(무이자 할부 정보) -->
          <input type="hidden" name="KVP_NOINT_FLAG" v-model="form.KVP_NOINT_FLAG" /> <!-- KVP_NOINT_FLAG(무이자 or 공백 세팅) -->
          <input type="hidden" name="KVP_FIXPAYFLAG" v-model="form.KVP_FIXPAYFLAG" /> <!-- 복합결제 유무(KVP_FIXPAYFLAG) -->
          <input type="hidden" name="KVP_MERCHANT_KB" v-model="form.KVP_MERCHANT_KB" /> <!-- 국민카드 포인트 가맹점(KVP_MERCHANT_KB) -->
          <input type="hidden" name="KVP_KB_SAVEPOINTREE" v-model="form.KVP_KB_SAVEPOINTREE" /> <!-- 국민카드 세이브 포인트(KVP_KB_SAVEPOINTREE) -->
          <input type="hidden" name="VP_BC_SAVEPOINT" v-model="form.VP_BC_SAVEPOINT" /> <!-- 비씨카드 세이브 포인트(VP_BC_SAVEPOINT) -->
          <input type="hidden" name="KVP_PGID" v-model="form.KVP_PGID" /> <!-- pgid -->
          <input type="hidden" name="KVP_IMGURL" v-model="form.KVP_IMGURL" /> <!-- KVP_IMGURL -->
          <input type="hidden" name="KVP_NOINT" v-model="form.KVP_NOINT" /> <!-- KVP_NOINT -->
          <input type="hidden" name="KVP_QUOTA" v-model="form.KVP_QUOTA" /> <!-- KVP_QUOTA -->
          <input type="hidden" name="KVP_CONAME" v-model="form.KVP_CONAME" /> <!-- KVP_CONAME -->
          <input type="hidden" name="KVP_CARDCODE" v-model="form.KVP_CARDCODE" /> <!-- KVP_CARDCODE -->
          <input type="hidden" name="KVP_SESSIONKEY" v-model="form.KVP_SESSIONKEY" /> <!-- KVP_SESSIONKEY -->
          <input type="hidden" name="KVP_ENCDATA" v-model="form.KVP_ENCDATA" /> <!-- KVP_ENCDATA -->
          <input type="hidden" name="INIpluginData" v-model="form.INIpluginData" /> <!-- 'INIpluginData'는 플러그인에서 데이타를 받기 위한 필드 -->
          <input type="hidden" name="TID">
          <input type="hidden" name="hashKey" v-model="form.hashKey" /> <!-- hashKey -->
          <div class="form-group"> <!-- TO-DO 실결제 가능해지면 결제버튼 삭제 -->
            <div class="col-lg-10 col-lg-offset-2">
              <!-- <button type="reset" class="btn btn-default">Cancel</button> -->
              <!-- <button type="button" class="btn btn-primary" @click="getAuthentication">인증진행하기</button> -->
              <button type="button" class="btn btn-primary" @click="doPay">승인</button>
            </div>
          </div>
        </form>
        <div id="kmotionDiv" style="display:none">
          <form class="form-horizontal" id="kmotionForm" name="kmotionForm" method="post" @submit.prevent="submit()">
            <input type="hidden" name="payCompany" v-model="form.payCompany" /> <!-- smartro or kcp -->
            <input type="hidden" name="deviceType" v-model="kform.deviceType" /> <!-- PC or Mob -->
            <input type="hidden" name="cardCode" v-model="kform.cardCode" /> <!-- 카드코드(국민카드) -->
            <input type="hidden" name="mid" v-model="form.mid"> <!-- 결제사MID -->
            <input type="hidden" name="memNo" v-model="form.memNo" /> <!-- 고객번호 -->
            <input type="hidden" name="aff_name" v-model="form.aff_name" value="GS fresh" /> <!--가맹점명(aff_name)  -->
            <input type="hidden" name="amount" v-model="form.KVP_PRICE" /> <!-- 가격(amount) -->
            <input type="hidden" name="product_name" v-model="form.KVP_GOODNAME" />
            <input type="hidden" name="save_pay_option" id="save_pay_option" v-model="kform.savePayOption" /> <!-- 세이브결제 옵션(save_pay_option) -->
            <input type="hidden" name="easy_pay_option" v-model="kform.easyPayOption" /> <!-- 간편결제 옵션(easy_pay_option) -->
            <input type="hidden" name="noint_inf" v-model="form.KVP_NOINT_INF" /> <!--무이자 할부 정보(noint_inf)  -->
            <input type="hidden" name="quota_inf" v-model="form.KVP_QUOTA_INF" /> <!--일반 할부 개월 정보(order_userid)  -->
            <input type="hidden" name="noint_flag1" v-model="kform.nointFlag1" /> <!-- 무이자 또는 공백 표시 (mobile)-->
            <input type="hidden" name="noint_flag2" v-model="kform.nointFlag2" /> <!-- 유무이자 할부 Display 정보(regno)-->
            <input type="hidden" name="kb_savepointree" id="kb_savepointree" v-model="kform.kbSavepointree" /> <!-- KB 세이브 포인트리 연동(mid)-->
            <input type="hidden" name="fixpayFlag" v-model="kform.fixpayFlag" /> <!-- 복합결제 연동(fixpayflag)-->
            <input type="hidden" name="server_mode" v-model="kform.serverMode" /> <!-- 서버 모드(server_mode)-->
            <input type="hidden" name="is_only_appcard" v-model="kform.isOnlyAppcard" /> <!-- KB앱카드 바로결제 여부(apvl_chain_no_lt)-->
            <input type="hidden" name="is_liquidity" v-model="kform.isLiquidity" /> <!-- 환금성 상품 여부(apvl_seller_id_lt)-->
            <input type="hidden" name="issue_code" v-model="kform.issueCode" /> <!-- ISP 코드(issue_code)-->
            <input type="hidden" name="accpreq_url" v-model="kform.accpreqUrl" /> <!-- (return url)-->
            <input type="hidden" name="result_url" v-model="kform.returnUrl" /> <!-- (return url)-->
            <input type="hidden" name="accpres_url" v-model="kform.accpresUrl" /> <!-- (return url)-->
            <input type="hidden" name="actionUrl" v-model="kform.actionUrl" /> <!-- (actionUrl)-->
            <div class="form-group"> <!-- TO-DO 실결제 가능해지면 결제버튼 삭제 -->
              <div class="col-lg-10 col-lg-offset-2">
                <!-- <button type="reset" class="btn btn-default">Cancel</button>-->
                <!-- <button type="button" class="btn btn-primary" @click="getAuthentication">인증진행하기</button> -->
                <button type="button" class="btn btn-primary" @click="doPay">승인</button>
              </div>
            </div>
          </form>
          <div class="frame-div" style="display:none" id="frame_div">
            <iframe src="/pa/comm_auth_kmotion_frame" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="500px;" align="center" scrolling="no" style="transform: translate(0px, 0px) scale(1) translateZ(0px);" />
          </div>
          <form id="hidform" method="post">
          <input type="hidden" id="key" name="key" v-model="rform.key"/>
          <input type="hidden" id="data" name="data" v-model="rform.encData"/>
          <input type="hidden" id="pgID" name="pgID" v-model="rform.pgId"/>
          <input type="hidden" id="isOnlyAppcard" name="isOnlyAppcard" v-model="rform.isOnlyAppcard"/>
          <input type="hidden" id="accpresURL" name="accpresURL" v-model="rform.accpresURL"/>
          <input type="hidden" id="resultURL" name="resultURL" v-model="rform.resultURL"/>
          <input type="hidden" id="issueCode" name="issueCode" v-model="rform.issueCode"/>
          </form>
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
import CommAuthOd from '@/views/pa/common/CommAuthOd';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';

export default {
  props: {
    orderSheetForm: Object,
  },
  name: "AuthCardIsp",
  data() {
    return {
      form: {
        payCompany: "",
        deviceType: "",
        cardCode: "",
        mid: "gsstore01m",
        KVP_GOODNAME: "",
        KVP_PRICE: "",
        KVP_CARDCOMPANY: "",
        KVP_CURRENCY: "",
        VP_BC_ISSUERCODE: "",
        KVP_QUOTA_INF: "",
        KVP_NOINT_INF: "",
        KVP_NOINT_FLAG: "",
        KVP_FIXPAYFLAG: "",
        KVP_MERCHANT_KB: "",
        KVP_KB_SAVEPOINTREE: "",
        VP_BC_SAVEPOINT: "",
        KVP_PGID: "",
        KVP_IMGURL: "",
        KVP_NOINT: "",
        KVP_QUOTA: "",
        KVP_CONAME: "",
        KVP_CARDCODE: "",
        KVP_SESSIONKEY: "",
        KVP_ENCDATA: "",
        KVP_RESERVED1: "",
        KVP_RESERVED2: "",
        KVP_RESERVED3: "",
        KVP_CARD_PREFIX: "",
        KVP_USING_POINT: "",
        VP_RET_SAVEPOINT: "",
        INIpluginData: "",
        hashKey: "",
        buyer_name: "",
        buyer_tel: "",
        memNo: "",
        goods_cnt: ""
      },
      kform: {
        deviceType: "MOB",
        cardCode: "04",
        name: "GS fresh",
        savePayOption: "",
        easyPayOption: "",
        nointInf: "",
        quotaInf: "00",
        nointFlag1: "",
        nointFlag2: "",
        kbSavepointree: "",
        fixpayFlag: "",
        accpreqUrl: "",
        accpresUrl: "",
        returnUrl: "",
        actionUrl: "",
        serverMode: "",
        isOnlyAppcard: "",
        isLiquidity: "",
        goodName: "",
        issueCode: "",
        amount: "1004",
        hashKey: ""
      },
      rform: {
        key: "",
        encData: "",
        xid: "", // 인증 후 정보 비교를 위함.
        pgId: "",
        resultCode: "",
        isOnlyAppcard: "",
        accpresURL: "",
        resultURL: "",
        issueCode: "",
        targetFrame: ""
      }
    };
  },
  mixins: [
    CommAuthOd
  ],
  created() {
    // orderSheet페이지에서 전송된 데이터를 세팅한다.
    this.form.payCompany = this.orderSheetForm.payCompany;
    this.form.deviceType = this.orderSheetForm.deviceType;
    this.form.buyer_name = this.orderSheetForm.buyer_name;
    this.form.buyer_tel = this.orderSheetForm.buyer_tel;
    this.form.memNo = this.orderSheetForm.memNo;
    this.form.KVP_GOODNAME = this.orderSheetForm.goods_name;
    this.form.goods_cnt = this.orderSheetForm.goods_cnt;
    this.form.KVP_PRICE = this.orderSheetForm.goods_price;
    this.form.KVP_QUOTA_INF = this.orderSheetForm.quota_inf;
    this.form.KVP_NOINT_INF = this.orderSheetForm.noint_inf;
    this.form.cardCode = this.orderSheetForm.cardCode;
    this.form.aff_name = this.orderSheetForm.aff_name;
    this.form.orderNo = this.orderSheetForm.orderNo;
    this.form.taxfreeAmt = this.orderSheetForm.totalTaxfreeAmt;
    this.form.tax = this.orderSheetForm.totalVatAmt;
    this.form.taxableAmt = this.orderSheetForm.totalTaxableAmt;
    // console.log("this.form. : ", this.form);
    // console.log("this.kform. : ", this.kform);
  },
  watch: {
    rsform: function() {
      this.doPay();
    }
  },
  mounted: async function() {
    const that = this;
    window.callbackFnc = function(hashKey) {
      ApiUtils
        .post('/fo/pa/kmotionAuthCallback', {hashKey: hashKey})
        .then(res => {
          // document.getElementById('frame_div').style.display = 'none';
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data);
            alert('인증결과를 불러올 수 없습니다. 로그를 확인해주세요.');
            return;
          }
          // that.rsform = res.data;
          // that.rsform.authType = authType;
        }
      );
    };
    const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    const eventer = window[eventMethod];
    const messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    eventer(messageEvent, function(e) {
      // thymeleaf 도메인으로부터 들어온 경우에만 적용
      if (e !== null &&
          e.data !== null &&
          e.data.resultCode !== null &&
          location.href.indexOf(e.origin) < 0 &&
          document.getElementById("kmotionDiv").style.display !== "none") {
        if (e.data.resultCode === "0000") {
            that.rform = e.data;
            console.log(that.rform);
            hidform.action = that.rform.actionUrl;
            const target = that.rform.targetFrame;
            hidform.target = target;
            hidform.submit();
        } else {
          alert('인증 중 에러가 발생했습니다.');
          return;
        }
      }
    }, false);
    this.init();
    // this.callKmotionScript();
  },
  methods: {
    popupAction() { // 닫기
      this.$emit('popupEvent', 'payCardIspFlag');
    },
    async init() {
      const formData = this.form;
      /**
       *카드사가 선택되지 않았을 경우.
       */
      if ( StringUtils.isEmpty(formData.cardCode) ) {
        formData.cardCode = "41";
      }
      const cardCode = formData.cardCode;
      const deviceType = formData.deviceType;
      /**
       *유입 채널이 모바일이고 국민카드를 선택한 경우 isp 결제가 아닌 kmotion 결제
       */
      if (deviceType !== "PC" && cardCode === "04") {
        const data = {
          authType: "KMOTION",
          cardCode: cardCode,
          cmmMbrNo: ispForm.memNo.value
        };
        const that = this;
        await ApiUtils.post('/fo/pa/cardInitAuth', data).then(res => {
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data);
            alert('인증정보를 불러올 수 없습니다.');
            return;
          }
          console.log(res.data);
          that.kform = res.data;
          that.form.payCompany = res.data.payCompany;
          that.kform.cardCode = cardCode;
          that.kform.deviceType = formData.deviceType;
          that.kform.name = "GS fresh";
          that.kform.amount = "1004";
          that.kform.quotaInf = "00";
          that.kform.returnUrl = that.kform.returnUrl+".hashKey_"+res.data.hashKey;
          that.kform.accpresUrl = that.kform.accpresUrl+".hashKey_"+res.data.hashKey;
          that.kform.accpreqUrl = that.kform.accpreqUrl+".hashKey_"+res.data.hashKey;
          if (res.data.payCompany === "KCP") {
            that.form.mid = "T0000";
          }
        });
        document.getElementById("ispForm").style.display = "none";
        document.getElementById("kmotionDiv").style.display = "block";
      } else {
        this.callIspActiveX();
        if (formData.deviceType === 'PC' && cardCode === "71") {
            alert('PC 환경에서 제주은행카드는 xmpi 결제로 진행되어야 합니다.');
            return;
        }
        if ( StringUtils.isEmpty(ispForm.buyer_name.value) ) {
          alert("고객명을 입력해주세요.");
          return;
        }
        if ( StringUtils.isEmpty(ispForm.buyer_tel.value) ) {
          alert("고객의 연락처를 입력해주세요.");
          return;
        }
        if ( StringUtils.isEmpty(ispForm.memNo.value) ) {
          alert("고객번호를 입력해주세요.");
          return;
        }
        if ( StringUtils.isEmpty(ispForm.goods_cnt.value) ) {
          alert("상품수량을 입력해주세요.");
          return;
        }
        if ( StringUtils.isEmpty(formData.KVP_PRICE) ) {
          alert("가격을 입력해주세요.");
          return;
        }
        const data = {
          authType: "ISP",
          cardCode: cardCode,
          cmmMbrNo: ispForm.memNo.value
        };
        const that = this;
        await ApiUtils.post('/fo/pa/cardInitAuth' + ((formData.deviceType === "PC") ? "Pc" : "Mob"), data).then(function(res) {
          if (res.data.result === 'FAIL') {
            alert('인증정보를 불러올 수 없습니다.');
            return;
          }
          that.form.cardCode = cardCode;
          that.form.KVP_PGID = res.data.mid;
          that.form.KVP_CURRENCY = res.data.currency;
          // that.form.KVP_GOODNAME = res.data.goodName;
          that.form.KVP_CARDCOMPANY = res.data.cardCd;
          that.form.hashKey = res.data.hashKey;
          that.form.payCompany = res.data.payCompany;
          console.log('res.data.payCompany'+res.data.payCompany);
          if (that.form.KVP_QUOTA_INF != "") {
            if (that.form.KVP_QUOTA_INF.substr(0, 1) == "0") {
              that.form.KVP_QUOTA_INF = that.form.KVP_QUOTA_INF.substr(1, 1);
            }
          }
          if (that.form.KVP_NOINT_INF != "") { // as-is setKvpNointInf(무이자할부 함수에서 setting)
            that.form.KVP_NOINT_INF = cardCode+"-"+that.form.KVP_QUOTA_INF;
          }
          if (res.data.payCompany === "KCP") {
            that.form.mid = "T0000";
          }
        });
      }
      this.getAuthentication();
    },
    async doPay() {
      let deviceType = "";
      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      let smartroCardCode = "";
      if (this.form.cardCode === "41" || this.form.cardCode === "20") {
        smartroCardCode = "01";
      } else if (this.form.cardCode === "04") {
        smartroCardCode = "02";
        this.doPayKmotion(deviceType, smartroCardCode);
      } else if (this.form.cardCode === "07") {
        smartroCardCode = "13";
      } else if (this.form.cardCode === "37") {
        smartroCardCode = "22";
      } else if (this.form.cardCode === "34") {
        smartroCardCode = "21";
      }
      const amt = ispForm.KVP_PRICE.value;
      if ( StringUtils.isEmpty(ispForm.taxFreeAmt.value) ) {
          alert("면세대상금액을 입력해주세요.");
          return;
      } else {
        ispForm.taxableAmt.value = Math.round((amt - ispForm.taxFreeAmt.value) / 1.1);
        ispForm.tax.value = amt - ispForm.taxableAmt.value;
      }
      const data = {
        deviceType: deviceType,
        amt: ispForm.KVP_PRICE.value,
        goodsName: ispForm.KVP_GOODNAME.value,
        goodsCnt: ispForm.goods_cnt.value,
        buyerName: ispForm.buyer_name.value,
        buyerTel: ispForm.buyer_tel.value,
        mallUserID: ispForm.memNo.value,
        formBankCd: smartroCardCode,
        authType: "02",
        cardInterest: ispForm.KVP_NOINT_INF.value,
        cardQuota: ispForm.KVP_QUOTA_INF.value,
        cardNo: '',
        kvpCardCode: ispForm.KVP_CARDCODE.value,
        kvpSessionKey: ispForm.KVP_SESSIONKEY.value,
        kvpEncData: ispForm.KVP_ENCDATA.value,
        mid: this.form.mid,
        payCorp: this.form.payCompany,
        taxableAmt: ispForm.taxableAmt.value,
        tax: ispForm.tax.value,
        taxFreeAmt: ispForm.taxFreeAmt.value,
      };
      console.log("doPay data : ", data);
      await ApiUtils
        .post("/fo/od/reqApprOrdCard" + ((ispForm.deviceType.value === "PC") ? "Pc" : "Mob"), data)
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
            alert('ISP 결제 승인 중 에러가 발생하였습니다.');
          } else {
            tidForm.TID.value = res.data.tid;
            alert('결제가 완료되었습니다.');
          }
          this.$emit('orderPaymentCallBack', ispForm.TID.value, isFail);
        }
      );
    },
    async doPayKmotion(deviceType, smartroCardCode) {
      const amt = kmotionForm.amount.value;
      if ( StringUtils.isEmpty(kmotionForm.taxFreeAmt.value) ) {
          alert("면세대상금액을 입력해주세요.");
          return;
      } else {
        kmotionForm.taxableAmt.value = Math.round((amt - kmotionForm.taxFreeAmt.value) / 1.1);
        kmotionForm.tax.value = amt - kmotionForm.taxableAmt.value;
      }
      const data = {
        deviceType: deviceType,
        amt: kmotionForm.amount.value,
        goodsName: kmotionForm.KVP_GOODNAME.value,
        goodsCnt: kmotionForm.goods_cnt.value,
        buyerName: kmotionForm.buyer_name.value,
        buyerTel: kmotionForm.buyer_tel.value,
        mallUserID: kmotionForm.memNo.value,
        formBankCd: smartroCardCode,
        authType: "02",
        cardInterest: ispForm.KVP_NOINT_INF.value,
        cardQuota: ispForm.KVP_QUOTA_INF.value,
        cardNo: this.rsltform.cardNo,
        cavv: this.rsltform.cavv,
        cardExpire: this.rsltform.cardExpire,
        keyInCl: this.rsltform.keyInCl,
        cardType: this.rsltform.cardType,
        tkeyKmotion: this.rsltform.tkeyKmotion,
        mid: this.form.mid,
        payCorp: this.form.payCompany,
        taxableAmt: kmotionForm.taxableAmt.value,
        tax: kmotionForm.tax.value,
        taxFreeAmt: kmotionForm.taxFreeAmt.value,
        useKmotionYn: "Y",
        // kvpCardCode: "CCKM"
      };
      await ApiUtils
        .post("/fo/od/reqApprOrdCard" + ((deviceType === "WEB") ? "Pc" : "Mob"), data)
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
            alert('kmotion 결제 승인 중 에러가 발생하였습니다.');
          } else {
            tidForm.TID.value = res.data.tid;
            alert('결제가 완료되었습니다.');
          }
          this.$emit('orderPaymentCallBack', 'payCardIspFlag', ispForm.TID.value, isFail);
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
