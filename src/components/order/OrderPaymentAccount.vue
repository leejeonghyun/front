<template>
    <div id="payAccountFlag" :class="deviceTypeChk() === true ? 'wrap-full-popup' : ''" :role="deviceTypeChk() === true ? 'dialog' : ''" :aria-modal="deviceTypeChk()">
      <div>
        <div v-if="deviceTypeChk() === true" class="header-popup">
          <strong>결제하기</strong>
        </div>
        <!-- START : 본문 -->
        <div class="full-popup-body scroll-area">
        <form class="form-horizontal" id="bankForm" name="bankForm" method="post" @submit.prevent="submit()">
          <input type="hidden" name="deviceType" v-model="form.deviceType" > <!-- PC or Mob -->
          <input type="hidden" name="mid" v-model="form.mid" > <!-- 가맹점MID -->
          <input type="hidden" name="memNo" v-model="form.memNo" >
          <input type="hidden" name="hd_pre_msg_type" v-model="form.hdPreMsgType"> <!-- 계좌이체는 EFT로 고정(hd_pre_msg_type) -->
          <input type="hidden" name="hd_msg_code" v-model="form.hdMsgCode" > <!-- 결제 요청 페이지에서는 0200으로 고정(hd_msg_code) -->
          <input type="hidden" name="hd_msg_type" v-model="form.hdMsgType" > <!-- 계좌이체는 EFT로 고정(hd_msg_type) -->
          <input type="hidden" name="hd_ep_type" v-model="form.hdEpType" > <!--real(bankpay.or.kr):SECUCERT, test(pgtest.kftc.or.kr):SECUCERT(hd_ep_type)  -->
          <input type="hidden" name="hd_pi" v-model="form.hdPi"> <!--결제원 내부 사용값으로 아래의 값 그대로 유지 (임의변경 불가)(hd_pi)  -->
          <input type="hidden" name="hd_input_option" v-model="form.hdInputOption"> <!-- 결제원 내부 사용값으로 아래의 값 그대로 유지 (임의변경 불가)(hd_input_option)-->
          <input type="hidden" name="hd_ep_option" v-model="form.hdEpOption" > <!-- 결제원 내부 사용값으로 아래의 값 그대로 유지 (임의변경 불가)(hd_ep_option)-->
          <input type="hidden" name="hd_approve_no" v-model="form.hdApproveNo" > <!--업체의 승인 번호 : 금융결제원으로부터 부여받은 승인번호 8 자리를 기입한다.(스마트로 용 : 1등급:17000390)(hd_approve_no)  -->
          <input type="hidden" name="hd_serial_no" v-model="form.hdSerialNo" > <!-- 결제 요청에 대한 거래번호 7자리 : 0000001~9999999 사이의 값을 입력.거래건별로 별도 채번되어야 하며, 거래일 기준으로 중복되지 않고 유일한 값이어야 함(hd_serial_no)-->
          <input type="hidden" name="hd_firm_name" v-model="form.hdFirmName" > <!-- 전자지갑에 표시될 기관명(hd_firm_name)-->
          <input type="hidden" name="hd_item_name" v-model="form.hdItemName" > <!-- 전자지갑에 표시될 물품명-최대10(hd_item_name)-->
          <input type="hidden" name="tx_amount" v-model="form.txAmount"> <!-- 가격(tx_amount)-->
          <input type="hidden" name="tx_user_define" v-model="form.txUserDefine" > <!-- 쇼핑몰정보(tx_user_define)-->
          <input type="hidden" name="tx_user_key" v-model="form.txUserKey" > <!-- user_key(tx_user_key)-->
          <input type="hidden" name="hd_timeout" v-model="form.hdTimeout" ><!-- 전자지갑 타임아웃 시간 설정: 단위는 ms(hd_timeout)-->
          <input type="hidden" name="hd_timeout_yn" v-model="form.hdTimeoutYn" > <!-- 전자지갑 타임아웃 여부(hd_timeout_yn)-->
          <input type="hidden" name="tx_email_addr" v-model="form.txEmailAddr" ><!-- 결제내역이 전송될 이메일주소(tx_email_addr)-->
          <input type="hidden" name="hd_email_yn" v-model="form.hdEmailYn" > <!-- 결제내역이 전송될 이메일주소 입력받는  기능 사용여부  (Y/N)(hd_email_yn)-->
          <input type="hidden" name="tx_bill_yn" v-model="form.txBillYn" > <!-- 현금영수증발행대상업체/현금영수증 발급 대상인 거래에 대해 Y로 세팅(tx_bill_yn)-->
          <input type="hidden" name="tx_vat_yn" v-model="form.txVatYn" > <!-- 부가가치세 대상(tx_vat_yn)-->
          <input type="hidden" name="tx_bill_vat" v-model="form.txBillVat" > <!-- 부가가치세 금액 : 미입력 또는 "0" 입력시 (결제금액-tx_svc_charge-tx_bill_deduction) / 11 로 자동계산(tx_bill_vat)-->
          <input type="hidden" name="tx_svc_charge" v-model="form.txSvcCharge" > <!-- 봉사료(tx_svc_charge)-->
          <input type="hidden" name="tx_bill_tax" v-model="form.txBillTax" > <!-- 세금(TAX)(tx_bill_tax)-->
          <input type="hidden" name="tx_bill_deduction" v-model="form.txBillDeduction" ><!-- 현금영수증 제외대상금액(tx_bill_deduction)-->
          <input type="hidden" name="tx_age_check" v-model="form.txAgeCheck" > <!-- 연령 제한 체크 필드 연령에 무관하게 결제할 경우는 생략 가능하다. ex) 19세 미만에게 결제 불가할 경우는 'N19'(tx_age_check)-->
          <input type="hidden" name="sbp_service_use" v-model="form.sbpServiceUse" > <!-- 간편결제기능 사용여부 (Y/N)(sbp_service_use)-->
          <input type="hidden" name="sbp_tab_first" v-model="form.sbpTabFirst" > <!-- 간편결제기능 우선표시 여부(sbp_tab_first)-->
          <input type="hidden" name="tx_guarantee" v-model="form.txGuarantee" > <!-- (tx_guarantee)-->
          <input type="hidden" name="hd_default_institution" v-model="form.hdDefaultInstitution" > <!-- (hd_default_institution)-->
          <input type="hidden" name="actionURL" v-model="form.actionUrl" > <!-- (actionUrl)-->
          <input type="hidden" name="termURL" v-model="form.returnUrl" > <!-- (returnUrl)-->
        </form>
        <form class="form-horizontal" id="mBankForm" name="mBankForm" method="post" @submit.prevent="submit()">
          <input type="hidden" name="hd_ep_type" v-model="form.hdEpType" />
          <input type="hidden" name="hd_approve_no" v-model="form.hdApproveNo"/>
          <input type="hidden" name="hd_serial_no" v-model="form.hdSerialNo"/>
          <input type="hidden" name="tx_user_key" v-model="form.txUserKey" />
          <input type="hidden" name="tx_amount" v-model="form.txAmount" />
          <input type="hidden" name="hd_firm_name" v-model="form.hdFirmName" />
          <input type="hidden" name="hd_item_name" v-model="form.hdItemName" />
          <input type="hidden" id="method" name="method" value="POST"/>
          <input type="hidden" id="receipt_yn" name="receipt_yn" value="N"/>
          <input type="hidden" name="tx_bill_yn" v-model="form.txBillYn" />
          <input type="hidden" name="title" value="GSfresh.com" />
          <input type="hidden" id="callbackfunc" name="callbackfunc" v-model="form.returnUrl"/>
          <input type="hidden" id="callbackparam1" name="callbackparam1" value=""/>
          <input type="hidden" id="callbackparam2" name="callbackparam2" value=""/>
          <input type="hidden" id="callbackparam3" name="callbackparam3" v-model="form.txUserKey"/>
          <input type="hidden" name="bankpayCode" id="bankpayCode" value="" />
          <input type="hidden" name="bankpayValue" id="bankpayValue" value="" />
          <input type="hidden" name="tx_receipt_acnt" v-model="form.txReceiptAcnt" />
          <input type="hidden" name="app_scheme" v-model="form.appScheme" />
        </form>
        <div class="frame-div" style="display:none" id="frame_div">
          <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="480px" align="center" frameborder="0" framespacing="0" marginheight="0" marginwidth="0" scrolling="yes" vspace="0" />
        </div>
        <form class="form-horizontal" name="rsltForm" id="rsltForm">
          <input type="hidden" id ="hd_ep_type" name="hd_ep_type" value="" v-model="rsform.hdEpType"> <!-- hd_ep_type -->
          <input type="hidden" id ="hd_pi" name="hd_pi" value="" v-model="rsform.hdpi"> <!-- hd_pi -->
          <input type="hidden" id ="bankpayCode" name="bankpayCode" value="" v-model="rsform.bankpayCode"> <!-- bankpayCode -->
          <input type="hidden" id ="cashssn" name="cashssn" value="" v-model="rsform.cashssn"> <!-- cashssn -->
          <input type="hidden" id ="user_key" name="user_key" value="" v-model="rsform.userKey"> <!-- user_key -->
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
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
export default {
  props: {
    orderSheetForm: Object,
  },
  name: "BankAuth",
  data() {
    return {
      form: {
        deviceType: "",
        mid: "",
        mbrNo: "",
        hdPreMsgType: "",
        hdMsgCode: "",
        hdMsgType: "",
        hdEpType: "",
        hdPi: "",
        hdApproveNo: "",
        hdSerialNo: "",
        hdFirmName: "",
        hdItemName: "",
        txAmount: "",
        txUserDefine: "",
        txUserKey: "",
        hdInputOption: "",
        hdEpOption: "",
        hdTimeoutYn: "",
        hdTimeout: "",
        txEmailAddr: "",
        hdEmailYn: "",
        txBillYn: "",
        txVatYn: "",
        txBillVat: "",
        txSvcCharge: "",
        txBillTax: "",
        txBillDeduction: "",
        txAgeCheck: "",
        sbpServiceUse: "",
        sbpTabFirst: "",
        txGuarantee: "",
        hdDefaultInstitution: "",
        actionUrl: "",
        returnUrl: "",
        txReceiptAcnt: "", // 모바일에서만 쓰임
        appScheme: "" // 모바일에서만 쓰임
      },
      rsform: {
        bankpayCode: "",
        cashssn: "",
        hashKey: "",
        hdEpType: "",
        hdpi: "",
        resultCode: "",
        resultMsg: "",
        userKey: "",
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
    this.form.deviceType = this.orderSheetForm.deviceType;
    this.form.mbrNo = this.orderSheetForm.memNo;
    this.form.hdFirmName = this.orderSheetForm.aff_name;
    this.form.hdItemName = this.orderSheetForm.goods_name;
    this.form.txAmount = this.orderSheetForm.goods_price;
    this.form.buyer_name = this.orderSheetForm.buyer_name;
    this.form.buyer_tel = this.orderSheetForm.buyer_tel;
    this.form.goods_cnt = this.orderSheetForm.goods_cnt;
    this.form.orderNo = this.orderSheetForm.orderNo;
    this.form.txEmailAddr = this.orderSheetForm.email;
    // console.log("this.form. : ", this.form);
  },
  mounted: async function() {
    this.init();
    const that = this;
    window.callbackFnc = function(hashKey) {
      ApiUtils
        .post('/fo/pa/bankAuthCallback', {hashKey: hashKey})
        .then(res => {
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data.resultMsg);
            if (res.data !== null && res.data.resultCode !== '0000') {
              alert(res.data.resultMsg);
            } else {
              alert(OrderMsg.emptyAuth);
            }
            return;
          }
          that.rsform = res.data;
          that.rsform.hashKey = hashKey;
          that.rsform.mid = that.form.mid;
          // 결재처리
          that.payComplete();
        }
      );
    };
  },
  methods: {
    payComplete() {
      let isFail = false;
      if (this.rsform.resultCode != "0000") {
        isFail = true;
      }
      this.$emit('orderPaymentCallBack', 'payAccountFlag', isFail, this.rsform);
    },
    popupAction() { // 닫기
      this.$emit('popupAction', 'payAccountFlag');
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
      const mid = 'mid'; // 초기값 없음
      const that = this;
      await ApiUtils.post("/fo/pa/bankAuthConfig" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), mid).then(function(res) {
        if (res.data.resultCode !== '0000') {
          alert(OrderMsg.emptyAuth);
          return;
        }
        console.log(res.data);
        that.form = res.data;
        if (formData.deviceType !== 'PC') {
          that.form.actionUrl = res.data.actionUrlMob;
          that.form.returnUrl = res.data.returnUrlMob;
          that.form.appScheme = res.data.appScheme;
        }
        that.form.deviceType = formData.deviceType;
        that.form.txAmount = formData.txAmount;
        that.form.memNo = formData.mbrNo;
        that.form.hdFirmName = formData.hdFirmName;
        that.form.hdItemName = formData.hdItemName;
        that.form.txEmailAddr = formData.txEmailAddr;
      });
      this.getAuthentication();
    },
    async getAuthentication() {
      if ( StringUtils.isEmpty(this.form.txAmount) ) {
        alert(OrderMsg.editProPrice);
        return;
      }
      const data = {
        cmmMbrNo: this.form.mbrNo,
        payCompany: 'SMARTRO',
        authType: 'BANK',
        mid: this.form.mid,
      };
      const that = this;
      await ApiUtils.post('/fo/pa/bankInitAuthByLogin' + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data).then(res => {
        if (res.data !== null) {
          that.form.returnUrl = this.form.returnUrl+".hashKey_"+res.data.hashKey;
          that.form.txUserKey = res.data.userKey;
        }
      });
      if (this.form.deviceType === "PC") {
        bankForm.action = this.form.actionUrl;
        bankForm.method = "post";
        window.open("", "popup", "height=600,width=720,status=no,dependent=no,scrollbars=no,resizable=no");
        bankForm.target = "popup";
        bankForm.submit();
      } else {
        mBankForm.action = this.form.actionUrl;
        mBankForm.method = "post";
        document.getElementById('frame_div').style.display = 'block';
        const windowWidth = $(window).width();
        const windowHeight = $(window).height() - 57;
        $('#MPI_FRAME').css({
          'width': windowWidth,
          'height': windowHeight
        });
        mBankForm.target = "MPI_FRAME";
        mBankForm.submit();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
