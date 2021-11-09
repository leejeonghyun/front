<template>
    <div id="payCardIspKBFlag" :class="deviceTypeChk() === true ? 'wrap-full-popup' : ''" :role="deviceTypeChk() === true ? 'dialog' : ''" :aria-modal="deviceTypeChk()">
      <div>
        <div v-if="deviceTypeChk() === true" class="header-popup">
          <strong>결제하기</strong>
        </div>
        <!-- START : 본문 -->
        <div class="full-popup-body scroll-area">
            <form class="form-horizontal" id="kmotionForm" name="kmotionForm" method="post" @submit.prevent="submit()">
            <input type="hidden" name="payCompany" v-model="form.payCompany" /> <!-- smartro or kcp -->
            <input type="hidden" name="deviceType" v-model="form.deviceType" /> <!-- PC or Mob -->
            <input type="hidden" name="cardCode" v-model="form.cardCode" /> <!-- 카드코드(국민카드) -->
            <input type="hidden" name="mid" v-model="form.mid"> <!-- 결제사MID -->
            <input type="hidden" name="memNo" v-model="form.memNo" /> <!-- 고객번호 -->
            <input type="hidden" name="aff_name" v-model="form.aff_name" value="GS fresh" /> <!--가맹점명(aff_name)  -->
            <input type="hidden" name="amount" v-model="form.amount" /> <!-- 가격(amount) -->
            <input type="hidden" name="product_name" v-model="form.goodName" />
            <input type="hidden" name="save_pay_option" id="save_pay_option" v-model="form.savePayOption" /> <!-- 세이브결제 옵션(save_pay_option) -->
            <input type="hidden" name="easy_pay_option" v-model="form.easyPayOption" /> <!-- 간편결제 옵션(easy_pay_option) -->
            <input type="hidden" name="noint_inf" v-model="form.nointInf" /> <!--무이자 할부 정보(noint_inf)  -->
            <input type="hidden" name="quota_inf" v-model="form.quotaInf" /> <!--일반 할부 개월 정보(order_userid)  -->
            <input type="hidden" name="noint_flag1" v-model="form.nointFlag1" /> <!-- 무이자 또는 공백 표시 (mobile)-->
            <input type="hidden" name="noint_flag2" v-model="form.nointFlag2" /> <!-- 유무이자 할부 Display 정보(regno)-->
            <input type="hidden" name="kb_savepointree" id="kb_savepointree" v-model="form.kbSavepointree" /> <!-- KB 세이브 포인트리 연동(mid)-->
            <input type="hidden" name="fixpayFlag" v-model="form.fixpayFlag" /> <!-- 복합결제 연동(fixpayflag)-->
            <input type="hidden" name="server_mode" v-model="form.serverMode" /> <!-- 서버 모드(server_mode)-->
            <input type="hidden" name="is_only_appcard" v-model="form.isOnlyAppcard" /> <!-- KB앱카드 바로결제 여부(apvl_chain_no_lt)-->
            <input type="hidden" name="is_liquidity" v-model="form.isLiquidity" /> <!-- 환금성 상품 여부(apvl_seller_id_lt)-->
            <input type="hidden" name="issue_code" v-model="form.issueCode" /> <!-- ISP 코드(issue_code)-->
            <input type="hidden" name="accpreq_url" v-model="form.accpreqUrl" /> <!-- (return url)-->
            <input type="hidden" name="result_url" v-model="form.returnUrl" /> <!-- (return url)-->
            <input type="hidden" name="accpres_url" v-model="form.accpresUrl" /> <!-- (return url)-->
            <input type="hidden" name="actionUrl" v-model="form.actionUrl" /> <!-- (actionUrl)-->
            <!-- <div class="form-group"> TO-DO 실결제 가능해지면 결제버튼 삭제
              <div class="col-lg-10 col-lg-offset-2">
                <button type="reset" class="btn btn-default">Cancel</button>
                <button type="button" class="btn btn-primary" @click="getAuthentication">인증진행하기</button>
                <button type="button" class="btn btn-primary" @click="doPay">승인</button>
              </div>
            </div> -->
          </form>
          <div class="frame-div" id="frame_div">
            <iframe src="/pa/comm_auth_kmotion_frame" @load="frameLoad" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="500px;" align="center" scrolling="no" style="transform: translate(0px, 0px) scale(1) translateZ(0px);" />
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
          <form id="tidForm" method="post">
          <input type="hidden" name="TID">
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
    import CommAuthOd from '@/views/pa/common/CommAuthOd';
    import ApiUtils from '@/common/ApiUtils';
    import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
    export default {
  props: {
    orderSheetForm: Object,
  },
  name: "AuthCardKmotion",
  data() {
    return {
      form: {
        payCompany: "",
        deviceType: "",
        cardCode: "",
        aff_name: "GS fresh",
        savePayOption: "",
        easyPayOption: "",
        nointInf: "NONE",
        quotaInf: "00",
        nointFlag1: "TRUE",
        nointFlag2: "FALSE",
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
        amount: "",
        hashKey: "",
        memNo: "",
        amount: 0,
        taxableAmt: 0,
        tax: 0,
        taxFreeAmt: 0,
        authType: "KMOTION",
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
      },
      rsltform: {
        cardNo: "",
        cavv: "",
        cardExpire: "",
        keyInCl: "",
        cardType: "",
        tkeyKmotion: "",
        kvpCardCode: "",
        kvpSessionKey: "",
        kvpEncData: "",
        cardQuota: "",
        cardInterest: "",
        mid: ""
      },
    };
  },
  mixins: [
    CommAuthOd
  ],
  created() {
    // orderSheet페이지에서 전송된 데이터를 세팅한다.
    this.form.payCompany = this.orderSheetForm.payCompany;
    this.form.deviceType = this.orderSheetForm.deviceType;
    this.form.memNo = this.orderSheetForm.memNo;
    this.form.goodName = this.orderSheetForm.goods_name;
    this.form.amount = this.orderSheetForm.goods_price;
    this.form.quotaInf = this.orderSheetForm.quota_inf;
    this.form.nointInf = this.orderSheetForm.noint_inf;
    this.form.cardCode = this.orderSheetForm.cardCode;
    this.form.aff_name = this.orderSheetForm.aff_name;
    this.form.orderNo = this.orderSheetForm.orderNo;
    this.form.taxfreeAmt = this.orderSheetForm.totalTaxfreeAmt;
    this.form.tax = this.orderSheetForm.totalVatAmt;
    this.form.taxableAmt = this.orderSheetForm.totalTaxableAmt;
    console.log("this.form. : ", this.form);
    // console.log("this.kform. : ", this.kform);
  },
  watch: {
    rsform: function() {
      // this.doPay();
    }
  },
  mounted: async function() {
    if (this.form.deviceType === "PC") {
      this.callKmotionPcScript();
      document.getElementById('frame_div').style.display = 'none';
      this.init();
    } else if (this.form.deviceType === "MO") {
      document.getElementById('frame_div').style.display = 'block';
    }
    const that = this;
    const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    const deleteEventMethod = window.addEventListener ? "removeEventListener" : "detachEvent";
    const eventer = window[eventMethod];
    const messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    const fnc = function(e) {
      // thymeleaf 도메인으로부터 들어온 경우에만 적용
      console.log('fnc test!!!');
      if (e !== null &&
          e.data !== null &&
          e.data.resultCode !== null &&
          (location.href.indexOf(e.origin) < 0 && e.origin != ("https://gum.criteo.com"))) {
        console.log(e.origin);
        console.log("CardKmotionAuthTemplate : " + e.data.resultCode + ", e.origin : " + e.origin);
        console.log(e.data);
        if (e.data.resultCode !== undefined && e.data.resultCode !== null) {
          if (e.data.resultCode === "0000") {
            that.rform = e.data;
            console.log(that.rform);
            let target = that.rform.targetFrame;
            // 모바일 kmotionAuthReqCallback
            if (target === "FRAME") {
              target = document.getElementById("MPI_FRAME").contentWindow.iframe.name;
              hidform.action = that.rform.actionUrl;
              hidform.target = target;
              hidform.submit();
            } else { // 모바일(kmotionAuthAuthCallback.html), Pc(kmotionAuthResCallback.html/kmotionAuthAuthCallback.html)
              ApiUtils
                .post('/fo/pa/kmotionAuthCallback', {hashKey: e.data.hashKey})
                .then(res => {
                  let isFail = false;
                  console.log(res.data);
                  if (res.data === null || res.data.resultCode !== '0000') {
                    console.error(res.data);
                    if (res.data.resultCode === '9997' && res.data.resultMsg !== null && res.data.resultMsg !== '') {
                      alert(res.data.resultMsg);
                    } else {
                      alert(OrderMsg.emptyAuth);
                    }
                    // window.close();
                  } else {
                    if (that.form.deviceType === "MO") {
                      document.getElementById('frame_div').style.display = 'none';
                    }
                  }
                  that.rsltform = res.data;
                  if (res.data.resultCode != "0000") {
                    isFail = true;
                  }
                  that.rsltform.cardNo = that.rsltform.tkeyKmotion.substr(0, 16);
                  that.rsltform.cavv = that.rsltform.tkeyKmotion.substr(16);
                  that.rsltform.mid = that.form.mid;
                  that.$emit('orderPaymentCallBack', 'payCardIspKBFlag', isFail, that.rsltform);
                }
              );
            }
          } else {
              if (e.data.resultCode === '9997' && e.data.resultMsg !== null && e.data.resultMsg !== '') {
                that.$emit('orderPaymentCallBack', 'payCardIspKBFlag', true, e.data);
              } else {
                that.$emit('orderPaymentCallBack', 'payCardIspKBFlag', true, e.data.rsltform);
              }
          }
        }
          window[deleteEventMethod](messageEvent, fnc, false);
      }
    };
    eventer(messageEvent, fnc, false);
  },
  methods: {
    frameLoad() {
      if (this.form.deviceType === "MO") {
        this.init();
      }
    },
    popupAction() { // 닫기
      this.$emit('popupAction', 'payCardIspKBFlag');
    },
    deviceTypeChk() {
      let type = false;
      if (this.form.deviceType === 'MO') {
        type = true;
      } else if (this.form.deviceType === 'PC') {
        type = false;
      } else {
        type = false;
      }
      return type;
    },
    async init() {
      const formData = this.form;
      const cardCode = formData.cardCode;
      const deviceType = formData.deviceType;
      const authType = formData.authType;
      const data = {
          authType: authType,
          cardCode: cardCode,
          cmmMbrNo: formData.memNo,
      };
      const that = this;
      await ApiUtils.post('/fo/pa/cardInitAuthByLogin' + ((formData.deviceType === "PC") ? "Pc" : "Mob"), data).then(res => {
        if (res.data === null || res.data.resultCode !== '0000') {
          alert(OrderMsg.errorAuth);
          return;
        }
        that.form = res.data;
        that.form.cardCode = cardCode;
        that.form.deviceType = deviceType;
        that.form.authType = authType;
        that.form.name = this.orderSheetForm.aff_name;
        that.form.amount = this.orderSheetForm.goods_price;
        that.form.quotaInf = "00";
        if (deviceType === "PC") {
          that.form.returnUrl = that.form.returnUrl+".hashKey_"+res.data.hashKey;
          that.form.accpresUrl = that.form.accpresUrl+".hashKey_"+res.data.hashKey;
          that.form.accpreqUrl = that.form.accpreqUrl+".hashKey_"+res.data.hashKey;
        } else {
          that.form.returnUrl = res.data.returnUrlMob+".hashKey_"+res.data.hashKey;
          that.form.accpresUrl = res.data.accpresUrlMob+".hashKey_"+res.data.hashKey;
          that.form.accpreqUrl = res.data.accpreqUrlMob+".hashKey_"+res.data.hashKey;
        }
      });
      this.getAuthentication();
    },
  }
};
</script>
