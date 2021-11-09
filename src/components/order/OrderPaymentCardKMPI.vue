<template>
    <div id="payCardKmpiFlag" :class="deviceTypeChk() === true ? 'wrap-full-popup' : ''" :role="deviceTypeChk() === true ? 'dialog' : ''" :aria-modal="deviceTypeChk()">
      <div>
        <div v-if="deviceTypeChk() === true" class="header-popup">
          <strong>결제하기</strong>
        </div>
        <!-- START : 본문 -->
        <div class="full-popup-body scroll-area">
          <form class="form-horizontal" id="kmpiForm" name="kmpiForm" method="post">
            <input type="hidden" name="payCompany" v-model="form.payCompany" /> <!-- smartro or kcp -->
            <input type="hidden" name="deviceType" v-model="form.deviceType" /> <!-- PC or Mob -->
            <input type="hidden" name="cardCode" v-model="form.cardCode" /> <!-- cardCode -->
            <input type="hidden" name="paymentMid" v-model="form.paymentMid" /> <!-- 결제사 MID(스마트로/kcp) -->
            <input type="hidden" name="memNo" v-model="form.memNo" /> <!--고객번호(memNo)  -->
            <input type="hidden" name="pay_ansim_price" v-model="form.pay_ansim_price" /> <!--가격(pay_ansim_price)  -->
            <input type="hidden" name="taxableAmt"> <!-- 과세대상금액(taxableAmt) -->
            <input type="hidden" name="tax"> <!-- 부가세(tax) -->
            <input type="hidden" name="taxFreeAmt" v-model="form.taxFreeAmt"> <!-- 면세대상금액(taxFreeAmt) -->
            <input type="hidden" name="orderGoods" v-model="form.orderGoods" /> <!--상품명(orderGoods)  -->
            <input type="hidden" name="pay_apvl_seller_id" v-model="form.payApvlSellerId" /> <!--(pay_apvl_seller_id)  -->
            <input type="hidden" name="pay_apvl_chain_no" v-model="form.payApvlChainNo" /> <!--(pay_apvl_chain_no)  -->
            <input type="hidden" name="pay_apvl_halbu" id="pay_apvl_halbu" v-model="form.pay_apvl_halbu" /> <!--할부개월수(pay_apvl_halbu)  -->
            <input type="hidden" name="pay_POPSIZE" v-model="form.payPopsize" /> <!--(pay_POPSIZE)  -->
            <input type="hidden" name="MID" v-model="form.mid" /> <!--(MID)  -->
            <input type="hidden" name="mid" v-model="form.ansimMid" /> <!--(ANSIM-MID) mobile  -->
            <input type="hidden" name="BUSINESSTYPE" v-model="form.businesstype" /> <!-- (BUSINESSTYPE) -->
            <input type="hidden" name="BUSINESSNO" v-model="form.businessno" /> <!-- (BUSINESSNO) mobile -->
            <input type="hidden" name="MOBILE" v-model="form.mobile" /> <!-- (MOBILE) -->
            <input type="hidden" name="APVL_SELLER_ID_LT" v-model="form.apvlSellerIdLt" /> <!-- (APVL_SELLER_ID_LT) -->
            <input type="hidden" name="SUB_APVL_SELLER_ID_LT" v-model="form.subApvlSellerIdLt" /> <!-- (SUB_APVL_SELLER_ID_LT) -->
            <input type="hidden" name="APVL_SS_USEYN" v-model="form.apvlSsUseyn" /> <!-- (APVL_SS_USEYN) -->
            <input type="hidden" name="PAY" v-model="form.pay" /> <!-- (PAY) -->
            <input type="hidden" name="ORDER_USERID" v-model="form.orderUserId" /> <!-- 주문자(ORDER_USERID) -->
            <input type="hidden" name="order_business" v-model="form.order_business" /> <!-- 쇼핑몰사업자번호 -->
            <input type="hidden" name="pan" v-model="form.pan" /> <!-- pan -->
            <input type="hidden" name="pay_pan" v-model="form.payPan" /> <!-- (pay_pan) -->
            <input type="hidden" name="expiry" v-model="form.expiry" /> <!-- (expiry) -->
            <input type="hidden" name="purchase_amount" v-model="form.purchase_amount" /> <!-- (purchase_amount) -->
            <input type="hidden" name="amount" v-model="form.amount" /> <!-- (amount) -->
            <input type="hidden" name="description" v-model="form.description" /> <!-- (description) -->
            <input type="hidden" name="currency" v-model="form.currency" /> <!-- (currency) -->
            <input type="hidden" name="device_category" v-model="form.deviceCategory" /> <!-- (device_category) -->
            <input type="hidden" name="hostid" v-model="form.hostid" /> <!-- (hostid) mobile -->
            <input type="hidden" name="hostpwd" v-model="form.hostpwd" /> <!-- (hostpwd) mobile -->
            <input type="hidden" name="name" v-model="form.name" /> <!-- (name) -->
            <input type="hidden" name="url" v-model="form.url" /> <!-- (url) -->
            <input type="hidden" name="country" v-model="form.country" /> <!-- (country) -->
            <input type="hidden" name="useActiveX" v-model="form.useactivex" /> <!-- (useActiveX) -->
            <input type="hidden" name="returnUrl" v-model="form.returnUrl" /> <!-- (returnUrl) -->
            <input type="hidden" name="failReturn" v-model="form.failReturn" /> <!-- (failReturn) -->
            <input type="hidden" name="apvl_chain_no" v-model="form.apvlChainNo" /> <!-- (apvl_chain_no) -->
            <input type="hidden" name="apvl_seller_id" v-model="form.apvlSellerId" /> <!-- (apvl_seller_id) -->
            <input type="hidden" name="apvl_halbu" v-model="form.apvlHalbu" /> <!-- (apvl_halbu) -->
            <input type="hidden" name="POPSIZE" v-model="form.popsize" /> <!-- (POPSIZE) -->
            <input type="hidden" name="usimYn" v-model="form.usimYn" /> <!-- (usimYn) -->
              <!--  <div class="form-group">
                <div class="col-lg-10 col-lg-offset-2">
                  <button type="button" class="btn btn-primary" @click="getAuthentication">인증진행하기</button>
                  <button type="button" class="btn btn-primary" @click="doPay">승인</button>
                </div>
              </div> -->
          </form>
          <div class="frame-div" style="display:none" id="frame_div">
            <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="500px;" align="center"/>
          </div>
          <form class="form-horizontal" name="rsltForm" id="rsltForm"> <!-- 결과값 -->
            <input type="hidden" id ="cavv" name="cavv" value="" v-model="rsform.cavv"> <!-- cavv -->
            <input type="hidden" id ="xid" name="xid" value="" v-model="rsform.xid"> <!-- xid -->
            <input type="hidden" id ="encXid" name="encXid" value="" v-model="rsform.encXid"> <!-- encXid -->
            <input type="hidden" id ="eci" name="eci" value="" v-model="rsform.eci"> <!-- eci -->
            <input type="hidden" id ="cardno" name="cardno" value="" v-model="rsform.realPan"> <!-- eci -->
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
  name: "AuthCardKmpi",
  data() {
    return {
      form: {
          payCompany: "",
          deviceType: "",
          cardCode: "",
          payApvlSellerId: '',
          payApvlChainNo: '',
          payPopsize: 'Y',
          mid: '',
          ansimMid: '',
          businesstype: 'M',
          businessno: '',
          mobile: 'N',
          apvlSellerIdLt: '',
          subApvlSellerIdLt: '',
          apvlSsUseyn: 'N',
          pay: '',
          pan: '',
          payPan: '',
          expiry: '',
          amount: '',
          description: 'none',
          currency: '410',
          deviceCategory: '0',
          name: 'GSfresh',
          url: 'http://www.gsfresh.com',
          country: '410',
          useactivex: 'N',
          returnUrl: '',
          failreturn: 'Y',
          hostid: '',
          hostpwd: '',
          apvlChainNo: '',
          apvlSellerId: '',
          apvlHalbu: '',
          popsize: 'Y',
          usimYn: '',
          actionUrl: '',
          hashKey: '',
          paymentMid: '',
          taxFreeAmt: '0',
          tax: '0',
          taxableAmt: '0',
          authType: 'KMPI',
      },
      rsform: {
        authType: "",
        cardNo: "",
        cavv: "",
        xid: "",
        eci: "",
        joinCode: "",
        encXid: "",
        cardCompany: "",
        ssUseyn: "",
        savekind: "",
        ssUseynKe: "",
        rsltAuthType: "", // result auth type
        realPan: "",
        errCode: "",
        hashKey: "",
        mid: "",
      },
    };
  },
  mixins: [
    CommAuthOd
  ],
  components: {
  },
  watch: {
    rsform: function() {
      let isFail = false;
      if (this.rsform.resultCode != "0000") {
        isFail = true;
      }
      this.rsform.mid = this.form.paymentMid;
      if (this.form.payCompany === "09") {
        this.rsform.mid = "AO03V";
      }
      // console.log("KMPI this.rsform : ", this.rsform);
      this.$emit('orderPaymentCallBack', 'payCardKmpiFlag', isFail, this.rsform);
    }
  },
  created() {
    // orderSheet페이지에서 전송된 데이터를 세팅한다.
    this.form.payCompany = this.orderSheetForm.payCompany;
    this.form.deviceType = this.orderSheetForm.deviceType;
    this.form.cardCode = this.orderSheetForm.cardCode;
    this.form.memNo = this.orderSheetForm.memNo;
    this.form.pay_ansim_price = this.orderSheetForm.goods_price;
    this.form.orderGoods = this.orderSheetForm.goods_name;
    this.form.pay_apvl_halbu = this.orderSheetForm.quota_inf;
    this.form.name = this.orderSheetForm.aff_name;
    this.form.buyer_tel = this.orderSheetForm.buyer_tel;
    this.form.goods_cnt = this.orderSheetForm.goods_cnt;
    this.form.KVP_NOINT_INF = this.orderSheetForm.noint_inf;
    this.form.name = this.orderSheetForm.aff_name;
    this.form.purchase_amount = this.orderSheetForm.goods_price;
    this.form.orderNo = this.orderSheetForm.orderNo;
    this.form.goodsCnt = this.orderSheetForm.goods_cnt;
    this.form.buyerName = this.orderSheetForm.buyer_name;
    this.form.buyerTel = this.orderSheetForm.buyer_tel;
    this.form.quotaInf = this.orderSheetForm.quota_inf;
    this.form.nointInf = this.orderSheetForm.noint_inf;
    this.form.taxFreeAmt = this.orderSheetForm.totalTaxfreeAmt;
  },
  mounted: async function() {
    this.init();
    const that = this;
    const authType = this.rsform.authType;
    window.callbackFnc = function(hashKey) {
      ApiUtils
        .post('/fo/pa/kmpiAuthCallback', {hashKey: hashKey})
        .then(res => {
          document.getElementById('frame_div').style.display = 'none';
          if (res.data === null || res.data.resultCode !== '0000') {
            alert(OrderMsg.emptyAuth);
            return;
          }
          that.rsform = res.data;
          that.rsform.authType = that.deviceType === 'PC' ? null : res.data.authType;
          that.rsform.hashKey = hashKey;
        }
      );
    };
  },
  methods: {
    popupAction() { // 닫기
      this.$emit('popupAction', 'payCardKmpiFlag');
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
      const authType = formData.authType;
      /**
       *카드사가 선택되지 않았을 경우.
       */
      if ( StringUtils.isEmpty(cardCode) ) {
        formData.cardCode = "25";
      }
      const data = {
        authType: authType,
        cardCode: cardCode,
        cmmMbrNo: formData.memNo,
      };
      const that = this;
      await ApiUtils.post('/fo/pa/cardInitAuthByLogin' + ((formData.deviceType === "PC") ? "Pc" : "Mob"), data).then(res => {
        if (res.data === null || res.data.resultCode !== '0000') {
          // console.error(res.data);
          alert(OrderMsg.emptyAuth);
          return;
        }
        that.form = res.data;
        console.log(res.data);
        if (formData.deviceType !== 'PC') {
          that.form.actionUrl = res.data.actionUrlMob;
          that.form.returnUrl = res.data.returnUrlMob;
          kmpiForm.order_business.value = that.form.subApvlSellerIdLt;
          that.form.ansimMid = res.data.ansimMid;
          that.form.businessno = res.data.bizNo;
        }
        that.form.cardCode = cardCode;
        that.form.deviceType = formData.deviceType;
        that.form.name = formData.name;
        that.form.memNo = formData.memNo;
        that.form.pay_ansim_price = formData.pay_ansim_price;
        that.form.orderGoods = formData.orderGoods;
        that.form.pay_apvl_halbu = formData.pay_apvl_halbu;
        that.form.returnUrl = that.form.returnUrl+".hashKey_"+res.data.hashKey;
        that.form.paymentMid = formData.mid;
        that.form.purchase_amount = formData.purchase_amount;
        that.form.taxFreeAmt = this.orderSheetForm.totalTaxfreeAmt;
        that.form.nointInf = this.orderSheetForm.noint_inf;
        that.form.quotaInf = this.orderSheetForm.quota_inf;
        that.form.buyerName = this.orderSheetForm.buyer_name;
        that.form.goodsCnt = this.orderSheetForm.goods_cnt;
        that.form.buyerTel = this.orderSheetForm.buyer_tel;
        if (cardCode === '05') { // keb
          that.form.apvlChainNo = that.form.payApvlChainNo;
          that.form.apvlSellerId = that.form.payApvlSellerId;
          that.form.apvlHalbu = kmpiForm.pay_apvl_halbu.value;
          that.form.popsize = that.form.payPopsize;
        }
        // if (res.data.payCompany === "09") {
        //  that.form.paymentMid = "AO03V";
        // }
      });
      this.getAuthentication();
    },
  }
};
</script>
