<template>
    <div id="authCardXmpi" :class="deviceTypeChk() === true ? 'wrap-full-popup' : ''" :role="deviceTypeChk() === true ? 'dialog' : ''" :aria-modal="deviceTypeChk()">
      <div>
        <div v-if="deviceTypeChk() === true" class="header-popup">
          <strong>결제하기</strong>
        </div>
        <!-- START : 본문 -->
        <div class="full-popup-body scroll-area">
        <form class="form-horizontal" id="xmpiForm" name="xmpiForm" method="post">
          <input type="hidden" name="payCompany" v-model="form.payCompany" /> <!-- smartro or kcp -->
          <input type="hidden" name="deviceType" v-model="form.deviceType" /> <!-- PC or Mob -->
          <input type="hidden" name="cardCode" v-model="form.cardCode" /> <!-- Card -->
          <input type="hidden" name="paymentMid" v-model="form.mid" /> <!-- 결제사 MID(스마트로/kcp) -->
          <input type="hidden" name="memNo" v-model="form.memNo" /> <!--고객번호(memNo)  -->
          <input type="hidden" name="cardName" v-model="form.orderCardname" /> <!-- 카드명(cardName)-->
          <input type="hidden" name="orderGoods" v-model="form.orderGoods" /> <!--상품명(KVP_GOODNAME)  -->
          <input type="hidden" name="orderAmount" v-model="form.orderAmount" /> <!-- 가격(KVP_PRICE) -->
          <input type="hidden" name="taxableAmt"> <!-- 과세대상금액(taxableAmt) -->
          <input type="hidden" name="tax" v-model="form.tax"> <!-- 부가세(tax) -->
          <input type="hidden" name="taxFreeAmt" v-model="form.taxFreeAmt"> <!-- 면세대상금액(taxFreeAmt) -->
          <input type="hidden" id="sp_chain_code" name="sp_chain_code" v-model="form.spChainCode" /> <!-- 결제종류(X_SP_CHAIN_CODE) 0:안심(일반)  1:간편결제(신한,삼성,현대)-->
          <input type="hidden" id="order_currency" name="order_currency" v-model="form.order_currency" /> <!-- 지불 화폐 단위 /한화 - WON, 미화 - USD(KVP_CURRENCY) -->
          <input type="hidden" name="returnUrl" v-model="form.returnUrl" /> <!-- 인증결과return url -->
          <input type="hidden" name="actionUrl" v-model="form.actionUrl" /> <!-- action url -->
        </form>
        <div class="frame-div" style="display:none" id="frame_div">
          <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="500px;" align="center"/>
        </div>
        <form id="hidform">
          <input type="hidden" id="pareq1" name="pareq1" v-model="rform.pareq1"/>
          <input type="hidden" id="pareq2" name="pareq2" v-model="rform.pareq2"/>
          <input type="hidden" id="pareq3" name="pareq3" v-model="rform.pareq3"/>
          <input type="hidden" id="pareq4" name="pareq4" v-model="rform.pareq4"/>
        </form>
        <form class="form-horizontal" name="rsltForm" id="rsltForm" >
          <input type="hidden" id="cavv" name="cavv" value="" v-model="rsform.cavv" /> <!-- cavv -->
          <input type="hidden" id="xid" name="xid" value="" v-model="rsform.xid" /> <!-- xid -->
          <input type="hidden" id="encXid" name="encXid" value="" v-model="rsform.encXid" /> <!-- xid -->
          <input type="hidden" id="eci" name="eci" value="" v-model="rsform.eci"> <!-- eci -->
          <input type="hidden" id="cardno" name="cardno" value="" v-model="rsform.cardNo"> <!-- cardno -->
          <input type="hidden" id ="joincode" name="joincode" value="" v-model="rsform.joinCode"> <!-- joincode -->
          <input type="hidden" id ="hashKey" name="hashKey" value="" v-model="rsform.hashKey"> <!-- hashKey -->
          <input type="hidden" name="TID" > <!-- tid -->
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
import StringUtils from '@/common/StringUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
export default {
  props: {
    orderSheetForm: Object,
  },
  name: "AuthCardXmpi",
  data() {
    return {
      form: {
        payCompany: "",
        deviceType: "",
        buyer_tel: '',
        memNo: '',
        cardCode: "",
        orderCardname: "",
        orderGoods: "",
        mid: "",
        orderAmount: "",
        actionUrl: "",
        returnUrl: "",
        spChainCode: "",
        mpiCardCode: "",
        hashKey: "",
        authType: "XMPI",
      },
      rform: {
        pareq1: "",
        pareq2: "",
        pareq3: "",
        pareq4: ""
      },
      rsform: {
        authType: "",
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
        encXid: "",
        hashKey: "",
        mid: "",
      }
    };
  },
  mixins: [
    CommAuthOd
  ],
  components: {
  },
  watch: {
  },
  created() {
    // orderSheet페이지에서 전송된 데이터를 세팅한다.
    console.log(this.orderSheetForm);
    this.form.payCompany = this.orderSheetForm.payCompany;
    this.form.deviceType = this.orderSheetForm.deviceType;
    this.form.buyer_tel = this.orderSheetForm.buyer_tel;
    this.form.memNo = this.orderSheetForm.memNo;
    this.form.cardCode = this.orderSheetForm.cardCode;
    this.form.orderCardname = this.orderSheetForm.orderCardname;
    this.form.orderGoods = this.orderSheetForm.goods_name;
    this.form.orderAmount = this.orderSheetForm.goods_price;
    this.form.orderNo = this.orderSheetForm.orderNo;
    this.form.goodsCnt = this.orderSheetForm.goods_cnt;
    this.form.buyerName = this.orderSheetForm.buyer_name;
    this.form.buyerTel = this.orderSheetForm.buyer_tel;
    this.form.quotaInf = this.orderSheetForm.quota_inf;
    this.form.nointInf = this.orderSheetForm.noint_inf;
    this.form.taxFreeAmt = this.orderSheetForm.totalTaxfreeAmt;
    if (this.form.cardCode === '43' || this.form.cardCode === '45' || this.form.cardCode === '21') { // 신한,삼성,현대
      this.form.spChainCode = '1';
    } else { // NH은행, 제주은행
      this.form.spChainCode = '0';
    }
    this.form.order_currency = '410';
    // console.log("this.form. : ", this.form);
  },
  mounted: async function() {
    const that = this;
    window.callbackFnc = function(hashKey) {
      ApiUtils
        .post('/fo/pa/xmpiAuthCallback', {hashKey: hashKey})
        .then(res => {
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data.resultMsg);
            return that.rsformCallback(res.data.resultCode);
          }
          /* that.rsform.xid = res.data.xid;
          that.rsform.encXid = res.data.encXid;
          that.rsform.eci = res.data.eci;
          that.rsform.cavv = res.data.cavv;
          that.rsform.cardNo = res.data.cardNo;
          that.rsform.joinCode = res.data.joinCode;
          that.rsform.authType = authType; */
          that.rsform.authType = that.deviceType === 'PC' ? null : res.data.authType;
          that.rsform.hashKey = hashKey;
          that.rsformCallback(res.data.resultCode);
        }
      );
    };
    this.init();
  },
  methods: {
    popupAction() { // 닫기
      this.$emit('popupAction', 'payCardXmpiFlag');
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
    rsformCallback: function(resultCode) {
      let isFail = false;
      if (resultCode != "0000") {
        isFail = true;
      }
      this.rsform.mid = this.form.mid;
      if (this.form.payCompany === "09") {
        this.rsform.mid = "AO03V";
      }
      console.log("XMPI this.rsform : ", this.rsform);
      document.getElementById('frame_div').style.display = 'none';
      this.$emit('orderPaymentCallBack', 'payCardXmpiFlag', isFail, this.rsform);
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
      await ApiUtils.post('/fo/pa/cardInitAuthByLogin' + ((formData.deviceType === "PC") ? "Pc" : "Mob"), data).then(res => {
        if (res.data === null || res.data.resultCode !== '0000') {
          alert(OrderMsg.emptyAuth);
          return;
        }
        console.log("res.data : ", res.data);
        that.form = res.data;
        if (formData.deviceType !== 'PC') {
          that.form.actionUrl = res.data.actionUrlMob;
          that.form.returnUrl = res.data.returnUrlMob;
        }
        that.form.cardCode = cardCode;
        that.form.mpiCardCode = mpiCardCode;
        that.form.deviceType = formData.deviceType;
        that.form.returnUrl = that.form.returnUrl+".hashKey_"+res.data.hashKey;
        // if (res.data.payCompany === "09") {
        //   that.form.mid = "AO03V";
        // }
        // 전달된 파라메터로 다시 세팅
        // that.form.orderCardname = formData.orderCardname;
        that.form.memNo = this.orderSheetForm.memNo;
        that.form.orderAmount = this.orderSheetForm.goods_price;
        that.form.orderGoods = this.orderSheetForm.goods_name;
        that.form.taxFreeAmt = this.orderSheetForm.totalTaxfreeAmt;
        that.form.nointInf = this.orderSheetForm.noint_inf;
        that.form.quotaInf = this.orderSheetForm.quota_inf;
        that.form.buyerName = this.orderSheetForm.buyer_name;
        that.form.goodsCnt = this.orderSheetForm.goods_cnt;
        that.form.buyerTel = this.orderSheetForm.buyer_tel;
        if (this.form.cardCode === '43' || this.form.cardCode === '45' || this.form.cardCode === '21') { // 신한,삼성,현대
          this.form.spChainCode = '1';
        } else { // NH은행, 제주은행
          this.form.spChainCode = '0';
        }
        this.form.order_currency = '410';
      });
      this.getAuthentication();
    }
  }
};
</script>
