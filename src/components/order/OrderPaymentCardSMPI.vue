<template>
    <div id="authCardSmpi" :class="deviceTypeChk() === true ? 'wrap-full-popup' : ''" :role="deviceTypeChk() === true ? 'dialog' : ''" :aria-modal="deviceTypeChk()">
      <div>
        <div v-if="deviceTypeChk() === true" class="header-popup">
          <strong>결제하기</strong>
        </div>
        <!-- START : 본문 -->
        <div class="full-popup-body scroll-area">
        <form class="form-horizontal" id="smpiForm" name="smpiForm" method="post" @submit.prevent="submit()">
          <input type="hidden" name="payCompany" v-model="form.payCompany" /> <!-- smartro or kcp -->
          <input type="hidden" name="deviceType" v-model="form.deviceType" /> <!-- PC or Mob -->
          <input type="hidden" name="cardCode" v-model="form.cardCode" /> <!-- 카드 -->
          <input type="hidden" name="paymentMid" v-model="form.paymentMid" > <!-- 결제사 MID(스마트로/kcp) -->
          <input type="hidden" name="memNo" v-model="form.memNo" > <!-- 고객번호(memNo) -->
          <input type="hidden" name="order_amount" v-model="form.orderAmount"> <!-- 가격(order_amount) -->
          <input type="hidden" name="taxableAmt"> <!-- 과세대상금액(taxableAmt) -->
          <input type="hidden" name="tax"> <!-- 부가세(tax) -->
          <input type="hidden" name="taxFreeAmt" v-model="form.taxFreeAmt"> <!-- 면세대상금액(taxFreeAmt) -->
          <input type="hidden" name="order_goods" v-model="form.orderGoods"> <!-- 상품명(order_goods) -->
          <input type="hidden" name="order_currency" id="order_currency" v-model="form.currency" ><!-- 통화(order_currency) -->
          <input type="hidden" name="order_cardname" v-model="form.orderCardname" ><!--카드사명(order_cardname)  -->
          <input type="hidden" name="order_no" v-model="form.orderNo" ><!--주문번호(order_no)  -->
          <input type="hidden" name="order_userid" v-model="form.orderUserid" ><!--주문고객 id(order_userid)  -->
          <input type="hidden" name="MOBILE" v-model="form.mobile" ><!-- 모바일서비스여부(mobile)-->
          <input type="hidden" name="REGNO" v-model="form.regno" ><!-- 가맹점id(regno)-->
          <input type="hidden" name="mId" id="mId" v-model="form.mid" ><!-- 안심클릭가맹점id(mid)-->
          <input type="hidden" name="order_business" v-model="form.bizNo" ><!-- 쇼핑몰사업자번호(order_business)-->
          <input type="hidden" name="order_mname" v-model="form.name" ><!-- 쇼핑몰명(order_mname)-->
          <input type="hidden" name="apvl_chain_no_lt" v-model="form.apvlChainNo" ><!-- 가맹점번호(apvl_chain_no_lt)-->
          <input type="hidden" name="apvl_seller_id_lt" v-model="form.apvlSellerIdLt" ><!-- 가맹점사업자번호(apvl_seller_id_lt)-->
          <input type="hidden" name="PAY" v-model="form.pay" ><!-- (pay)-->
          <input type="hidden" name="IOS_RETURN_APP" v-model="form.iosReturnApp" ><!-- (IOS_RETURN_APP)-->
          <input type="hidden" name="receiveUrl" v-model="form.returnUrl" ><!-- (receiveUrl)-->
          <input type="hidden" name="actionUrlToSmartro" v-model="form.actionUrl" ><!-- (actionUrl)-->
          <!-- <div class="form-group">
            <div class="col-lg-10 col-lg-offset-2">
              <button type="button" class="btn btn-primary" @click="getAuthentication">인증진행하기</button>
              <button type="button" class="btn btn-primary" @click="doPay">승인</button>
            </div>
          </div> -->
        </form>
        <div class="frame-div" style="display:none" id="frame_div">
          <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="450px" align="center" frameborder="0" framespacing="0" marginheight="0" marginwidth="0" scrolling="no" vspace="0" style="transform: translate(0px, 0px) scale(1) translateZ(0px);"/>
        </div>
        <form id="hidform">
          <input type="hidden" id="pareq1" name="pareq1" v-model="rform.pareq1"/>
          <input type="hidden" id="pareq2" name="pareq2" v-model="rform.pareq2"/>
          <input type="hidden" id="pareq3" name="pareq3" v-model="rform.pareq3"/>
          <input type="hidden" id="pareq4" name="pareq4" v-model="rform.pareq4"/>
        </form>
        <form class="form-horizontal" name="rsltForm" id="rsltForm">
          <input type="hidden" id ="cavv" name="cavv" value="" v-model="rsform.cavv"><!-- cavv -->
          <input type="hidden" id ="xid" name="xid" value="" v-model="rsform.xid"><!-- xid -->
          <input type="hidden" id ="encXid" name="encXid" value="" v-model="rsform.encXid"><!-- encXid -->
          <input type="hidden" id ="eci" name="eci" value="" v-model="rsform.eci"><!-- eci -->
          <input type="hidden" id ="cardno" name="cardno" value="" v-model="rsform.cardNo"><!-- eci -->
          <input type="hidden" id ="joincode" name="joincode" value="" v-model="rsform.joinCode"><!-- joincode -->
          <input type="hidden" id ="hashKey" name="hashKey" value="" v-model="rsform.hashKey"> <!-- hashKey -->
          <input type="hidden" name="TID" ><!-- tid -->
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
  name: "AuthCardSmpi",
  data() {
    return {
      form: {
        payCompany: "",
        deviceType: "",
        cardCode: "",
        paymentMid: "",
        mid: "",
        currency: "",
        orderAmount: "",
        ordergoods: "",
        orderCardname: "",
        orderNo: "",
        mbrNo: "",
        orderUserid: "",
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
        taxFreeAmt: '0',
        tax: '0',
        taxableAmt: '0',
        authType: "SMPI",
      },
      rform: {
        pareq1: "",
        pareq2: "",
        pareq3: "",
        pareq4: "",
        xid: "" // 인증 후 정보 비교를 위함.
      },
      rsform: {
        authType: "",
        cardNo: "",
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
    this.form.payCompany = this.orderSheetForm.payCompany;
    this.form.deviceType = this.orderSheetForm.deviceType;
    this.form.cardCode = this.orderSheetForm.cardCode;
    this.form.memNo = this.orderSheetForm.memNo;
    this.form.orderAmount = this.orderSheetForm.goods_price;
    this.form.orderGoods = this.orderSheetForm.goods_name;
    this.form.orderCardname = this.orderSheetForm.orderCardname;
    this.form.orderNo = this.orderSheetForm.orderNo;
    this.form.orderUserid = this.orderSheetForm.memNo;
    this.form.order_currency = '410';
    this.form.name = this.orderSheetForm.aff_name;
    this.form.goodsCnt = this.orderSheetForm.goods_cnt;
    this.form.buyerName = this.orderSheetForm.buyer_name;
    this.form.buyerTel = this.orderSheetForm.buyer_tel;
    this.form.quotaInf = this.orderSheetForm.quota_inf;
    this.form.nointInf = this.orderSheetForm.noint_inf;
    this.form.taxFreeAmt = this.orderSheetForm.totalTaxfreeAmt;
    // console.log("this.form. : ", this.form);
  },
  mounted: async function() {
    this.init();
    const that = this;
    window.callbackFnc = function(hashKey) {
      ApiUtils
        .post('/fo/pa/smpiAuthCallback', {hashKey: hashKey})
        .then(res => {
          if (that.form.deviceType === 'MO') {
              document.getElementById('frame_div').style.display = 'none';
          }
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data.resultMsg);
            alert(OrderMsg.emptyAuth);
            return;
          }
          that.rsform.encXid = res.data.encXid;
          that.rsform.eci = res.data.eci;
          that.rsform.cavv = res.data.cavv;
          that.rsform.cardNo = res.data.cardNo;
          that.rsform.joinCode = res.data.joinCode;
          that.rsform.authType = that.deviceType === 'PC' ? null : res.data.authType;
          that.rsform.hashKey = hashKey;
          that.rsformCallback(res.data.resultCode);
        }
      );
    };
  },
  methods: {
    popupAction() { // 닫기
      this.$emit('popupAction', 'payCardSmpiFlag');
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
      console.log("SMPI this.rsform : ", this.rsform);
      this.$emit('orderPaymentCallBack', 'payCardSmpiFlag', isFail, this.rsform);
      // this.doPay();
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
        cmmMbrNo: formData.memNo
      };
      const that = this;
      await ApiUtils.post('/fo/pa/cardInitAuthByLogin' + ((formData.deviceType === "PC") ? "Pc" : "Mob"), data).then(res => {
        if (res.data === null || res.data.resultCode !== '0000') {
          alert(OrderMsg.emptyAuth);
          return;
        }
        // console.log(res.data);
        that.form = res.data;
        if (formData.deviceType !== 'PC') {
          that.form.actionUrl = res.data.actionUrlMob;
          that.form.returnUrl = res.data.returnUrlMob;
          that.form.mobile = 'Y';
        }
        that.form.cardCode = cardCode;
        that.form.mpiCardCode = mpiCardCode;
        that.form.deviceType = formData.deviceType;
        that.form.memNo = formData.memNo;
        that.form.orderNo = formData.orderNo;
        that.form.orderUserid = formData.orderUserid;
        that.form.returnUrl = that.form.returnUrl+".hashKey_"+res.data.hashKey;
        that.form.orderGoods = formData.orderGoods;
        that.form.orderAmount = formData.orderAmount;
        that.form.taxFreeAmt = this.orderSheetForm.totalTaxfreeAmt;
        that.form.nointInf = this.orderSheetForm.noint_inf;
        that.form.quotaInf = this.orderSheetForm.quota_inf;
        that.form.buyerName = this.orderSheetForm.buyer_name;
        that.form.goodsCnt = this.orderSheetForm.goods_cnt;
        that.form.buyerTel = this.orderSheetForm.buyer_tel;
        that.form.paymentMid = formData.mid;
        // if (res.data.payCompany === "09") {
        // that.form.paymentMid = "AO03V";
        // }
      });
      this.getAuthentication();
    }
  }
};
</script>
