<template>
    <div id="authBank" v-bind:class="[siteClass]">
      <PaSmTopMenu :activeIndex="activeIndex" :type="sticky ? 'sub': ''" />
      <!-- START : 본문 -->
      <div class="container">
        <form class="form-horizontal" id="bankForm" name="bankForm" method="post" @submit.prevent="submit()">
          <fieldset>
            <legend>계좌이체</legend>
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
              <label for="MID" class="col-lg-2">MID</label>
              <div class="col-lg-10">
                <input name="mid" class="form-control" v-model="form.mid" placeholder="가맹점MID" value="gsstore01m">
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
            <!-- 계좌이체는 EFT로 고정(hd_pre_msg_type) -->
            <div class="form-group">
              <label for="hd_pre_msg_type" class="col-lg-2">* 계좌이체는 EFT로 고정</label>
              <div class="col-lg-10">
                <input name="hd_pre_msg_type" class="form-control" placeholder="계좌이체는 EFT로 고정" v-model="form.hdPreMsgType">
              </div>
            </div>
            <!-- 결제 요청 페이지에서는 0200으로 고정(hd_msg_code) -->
            <div class="form-group">
              <label for="hd_msg_code" class="col-lg-2">* 결제 요청 페이지에서는 0200으로 고정</label>
              <div class="col-lg-10">
                <input name="hd_msg_code" v-model="form.hdMsgCode" class="form-control" placeholder="결제 요청 페이지에서는 0200으로 고정" >
              </div>
            </div>
            <!-- 계좌이체는 EFT로 고정(hd_msg_type) -->
            <div class="form-group">
              <label for="hd_msg_type" class="col-lg-2">* 계좌이체는 EFT로 고정</label>
              <div class="col-lg-10">
                <input name="hd_msg_type" v-model="form.hdMsgType" class="form-control" placeholder="계좌이체는 EFT로 고정" >
              </div>
            </div>
            <!--real(bankpay.or.kr):SECUCERT, test(pgtest.kftc.or.kr):SECUCERT(hd_ep_type)  -->
            <div class="form-group">
              <label for="hd_ep_type" class="col-lg-2">* SECUCERT</label>
              <div class="col-lg-10">
                <input name="hd_ep_type" v-model="form.hdEpType" class="form-control" placeholder="real(bankpay.or.kr):SECUCERT, test(pgtest.kftc.or.kr):SECUCERT" >
              </div>
            </div>
            <!--아래 필드는 결제원 내부 사용값으로 아래의 값 그대로 유지 (임의변경 불가)(hd_pi)  -->
            <div class="form-group">
              <label for="hd_pi" class="col-lg-2">결제원 내부 사용값</label>
              <div class="col-lg-10">
                <input name="hd_pi" v-model="form.hdPi" class="form-control" placeholder="아래 필드는 결제원 내부 사용값으로 아래의 값 그대로 유지 (임의변경 불가)" readonly>
              </div>
            </div>
            <!-- 아래 필드는 결제원 내부 사용값으로 아래의 값 그대로 유지 (임의변경 불가)(hd_input_option)-->
            <div class="form-group">
              <label for="hd_input_option" class="col-lg-2">결제원 내부 사용값</label>
              <div class="col-lg-10">
                <input name="hd_input_option" v-model="form.hdInputOption" class="form-control" placeholder="아래 필드는 결제원 내부 사용값으로 아래의 값 그대로 유지 (임의변경 불가)" readonly>
              </div>
            </div>
            <!-- 아래 필드는 결제원 내부 사용값으로 아래의 값 그대로 유지 (임의변경 불가)(hd_ep_option)-->
            <div class="form-group">
              <label for="hd_ep_option" class="col-lg-2">결제원 내부 사용값</label>
              <div class="col-lg-10">
                <input name="hd_ep_option" v-model="form.hdEpOption" class="form-control" placeholder="아래 필드는 결제원 내부 사용값으로 아래의 값 그대로 유지 (임의변경 불가)" readonly>
              </div>
            </div>
            <!--업체의 승인 번호 : 금융결제원으로부터 부여받은 승인번호 8 자리를 기입한다.(스마트로 용 : 1등급:17000390)(hd_approve_no)  -->
            <div class="form-group">
              <label for="hd_approve_no" class="col-lg-2">* 업체의 승인 번호</label>
              <div class="col-lg-10">
                <input name="hd_approve_no" v-model="form.hdApproveNo" class="form-control" placeholder="업체의 승인 번호" >
              </div>
            </div>
            <!-- 결제 요청에 대한 거래번호 7자리 : 0000001~9999999 사이의 값을 입력.거래건별로 별도 채번되어야 하며, 거래일 기준으로 중복되지 않고 유일한 값이어야 함(hd_serial_no)-->
            <div class="form-group">
              <label for="hd_serial_no" class="col-lg-2">* 거래번호</label>
              <div class="col-lg-10">
                <input name="hd_serial_no" v-model="form.hdSerialNo" class="form-control" placeholder="모바일서비스여부" >
              </div>
            </div>
            <!-- 전자지갑에 표시될 기관명(hd_firm_name)-->
            <div class="form-group">
              <label for="hd_firm_name" class="col-lg-2">* 전자지갑에 표시될 기관명</label>
              <div class="col-lg-10">
                <input name="hd_firm_name" v-model="form.hdFirmName" class="form-control" placeholder="전자지갑에 표시될 기관명" >
              </div>
            </div>
            <!-- 전자지갑에 표시될 물품명-최대10(hd_item_name)-->
            <div class="form-group">
              <label for="hd_item_name" class="col-lg-2">* 전자지갑에 표시될 물품명</label>
              <div class="col-lg-10">
                <input name="hd_item_name" v-model="form.hdItemName" class="form-control" placeholder="전자지갑에 표시될 물품명" >
              </div>
            </div>
            <!-- 가격(tx_amount)-->
            <div class="form-group">
              <label for="tx_amount" class="col-lg-2">* 가격</label>
              <div class="col-lg-10">
                <input name="tx_amount" class="form-control" placeholder="가격" v-model="form.txAmount">
              </div>
            </div>
            <!-- 쇼핑몰정보(tx_user_define)-->
            <div class="form-group">
              <label for="tx_user_define" class="col-lg-2">* 쇼핑몰정보</label>
              <div class="col-lg-10">
                <input name="tx_user_define" v-model="form.txUserDefine" class="form-control" placeholder="쇼핑몰정보" >
              </div>
            </div>
            <!-- user_key(tx_user_key)-->
            <div class="form-group">
              <label for="tx_user_key" class="col-lg-2">* user_key</label>
              <div class="col-lg-10">
                <input name="tx_user_key" v-model="form.txUserKey" class="form-control" placeholder="가맹점번호" >
              </div>
            </div>
            <!-- 전자지갑 타임아웃 시간 설정: 단위는 ms(hd_timeout)-->
            <div class="form-group">
              <label for="hd_timeout" class="col-lg-2">타임아웃 시간</label>
              <div class="col-lg-10">
                <input name="hd_timeout" v-model="form.hdTimeout" class="form-control" placeholder="타임아웃 시간" >
              </div>
            </div>
            <!-- 전자지갑 타임아웃 여부(hd_timeout_yn)-->
            <div class="form-group">
              <label for="hd_timeout_yn" class="col-lg-2">전자지갑 타임아웃 여부</label>
              <div class="col-lg-10">
                <input name="hd_timeout_yn" v-model="form.hdTimeoutYn" class="form-control" placeholder="전자지갑 타임아웃 여부" >
              </div>
            </div>
            <!-- 결제내역이 전송될 이메일주소(tx_email_addr)-->
            <div class="form-group">
              <label for="tx_email_addr" class="col-lg-2">결제내역이 전송될 이메일주소</label>
              <div class="col-lg-10">
                <input name="tx_email_addr" v-model="form.txEmailAddr" class="form-control" placeholder="결제내역이 전송될 이메일주소" >
              </div>
            </div>
            <!-- 결제내역이 전송될 이메일주소 입력받는  기능 사용여부  (Y/N)(hd_email_yn)-->
            <div class="form-group">
              <label for="hd_email_yn" class="col-lg-2">이메일주소 사용여부</label>
              <div class="col-lg-10">
                <input name="hd_email_yn" v-model="form.hdEmailYn" class="form-control" placeholder="이메일주소 사용여부" >
              </div>
            </div>
            <!-- 현금영수증발행대상업체/현금영수증 발급 대상인 거래에 대해 Y로 세팅(tx_bill_yn)-->
            <div class="form-group">
              <label for="tx_bill_yn" class="col-lg-2">현금영수증발행대상업체</label>
              <div class="col-lg-10">
                <input name="tx_bill_yn" v-model="form.txBillYn" class="form-control" placeholder="현금영수증발행대상업체" >
              </div>
            </div>
            <!-- 부가가치세 대상(tx_vat_yn)-->
            <div class="form-group">
              <label for="tx_vat_yn" class="col-lg-2">부가가치세 대상</label>
              <div class="col-lg-10">
                <input name="tx_vat_yn" v-model="form.txVatYn" class="form-control" placeholder="부가가치세 대상" >
              </div>
            </div>
            <!-- 부가가치세 금액 : 미입력 또는 "0" 입력시 (결제금액-tx_svc_charge-tx_bill_deduction) / 11 로 자동계산(tx_bill_vat)-->
            <div class="form-group">
              <label for="tx_bill_vat" class="col-lg-2">부가가치세 금액</label>
              <div class="col-lg-10">
                <input name="tx_bill_vat" v-model="form.txBillVat" class="form-control" placeholder="부가가치세 금액" >
              </div>
            </div>
            <!-- 봉사료(tx_svc_charge)-->
            <div class="form-group">
              <label for="tx_svc_charge" class="col-lg-2">봉사료</label>
              <div class="col-lg-10">
                <input name="tx_svc_charge" v-model="form.txSvcCharge" class="form-control" placeholder="봉사료" >
              </div>
            </div>
            <!-- 세금(TAX)(tx_bill_tax)-->
            <div class="form-group">
              <label for="tx_bill_tax" class="col-lg-2">세금(TAX)</label>
              <div class="col-lg-10">
                <input name="tx_bill_tax" v-model="form.txBillTax" class="form-control" placeholder="세금(TAX)" >
              </div>
            </div>
            <!-- 현금영수증 제외대상금액(tx_bill_deduction)-->
            <div class="form-group">
              <label for="tx_bill_deduction" class="col-lg-2">현금영수증 제외대상금액</label>
              <div class="col-lg-10">
                <input name="tx_bill_deduction" v-model="form.txBillDeduction" class="form-control" placeholder="현금영수증 제외대상금액" >
              </div>
            </div>
            <!-- 연령 제한 체크 필드 연령에 무관하게 결제할 경우는 생략 가능하다. ex) 19세 미만에게 결제 불가할 경우는 'N19'(tx_age_check)-->
            <div class="form-group">
              <label for="tx_age_check" class="col-lg-2">연령 제한 체크</label>
              <div class="col-lg-10">
                <input name="tx_age_check" v-model="form.txAgeCheck" class="form-control" placeholder="연령 제한 체크" >
              </div>
            </div>
            <!-- 간편결제기능 사용여부 (Y/N)(sbp_service_use)-->
            <div class="form-group">
              <label for="sbp_service_use" class="col-lg-2">간편결제기능 사용여부</label>
              <div class="col-lg-10">
                <input name="sbp_service_use" v-model="form.sbpServiceUse" class="form-control" placeholder="간편결제기능 사용여부" >
              </div>
            </div>
            <!-- 간편결제기능 우선표시 여부(sbp_tab_first)-->
            <div class="form-group">
              <label for="sbp_tab_first" class="col-lg-2">간편결제기능 우선표시 여부</label>
              <div class="col-lg-10">
                <input name="sbp_tab_first" v-model="form.sbpTabFirst" class="form-control" placeholder="간편결제기능 우선표시 여부" >
              </div>
            </div>
            <!-- (tx_guarantee)-->
            <div class="form-group">
              <label for="tx_guarantee" class="col-lg-2">tx_guarantee</label>
              <div class="col-lg-10">
                <input name="tx_guarantee" v-model="form.txGuarantee" class="form-control" placeholder="tx_guarantee" >
              </div>
            </div>
            <!-- (hd_default_institution)-->
            <div class="form-group">
              <label for="hd_default_institution" class="col-lg-2">hd_default_institution</label>
              <div class="col-lg-10">
                <input name="hd_default_institution" v-model="form.hdDefaultInstitution" class="form-control" placeholder="hd_default_institution" >
              </div>
            </div>
            <!-- decryptHashKey(템플릿테스트용) -->
            <div class="form-group">
              <label for="decryptHashKey" class="col-lg-2">decryptHashKey</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="decryptHashKey" name="decryptHashKey" v-model="form.decryptHashKey">
              </div>
            </div>
            <!-- (actionUrl)-->
            <div class="form-group">
              <label for="actionURL" class="col-lg-2">action url</label>
              <div class="col-lg-10">
                <input name="actionURL" v-model="form.actionUrl" class="form-control" placeholder="action url" >
              </div>
            </div>
            <!-- (returnUrl)-->
            <div class="form-group">
              <label for="returnUrl" class="col-lg-2">return(callback) url</label>
              <div class="col-lg-10">
                <input name="termURL" v-model="form.returnUrl" class="form-control" placeholder="return url" >
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
          <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="500px;" align="center" scrolling="yes" style="transform: translate(0px, 0px) scale(1) translateZ(0px);"/>
        </div>
        <form class="form-horizontal" name="rsltForm" id="rsltForm">
          <fieldset>
            <legend>결과값</legend>
            <!-- hd_ep_type -->
            <div class="form-group">
              <label for="hd_ep_type" class="col-lg-2">hd_ep_type</label>
              <div class="col-lg-10">
                <input type="text" id ="hd_ep_type" name="hd_ep_type" value="" class="form-control" placeholder="hd_ep_type" v-model="rsform.hdEpType">
              </div>
            </div>
            <!-- hd_pi -->
            <div class="form-group">
              <label for="hd_pi" class="col-lg-2">hd_pi</label>
              <div class="col-lg-10">
                <input type="text" id ="hd_pi" name="hd_pi" value="" class="form-control" placeholder="hd_pi" v-model="rsform.hdpi">
              </div>
            </div>
            <!-- bankpayCode -->
            <div class="form-group">
              <label for="bankpayCode" class="col-lg-2">bankpayCode</label>
              <div class="col-lg-10">
                <input type="text" id ="bankpayCode" name="bankpayCode" value="" class="form-control" placeholder="bankpayCode" v-model="rsform.bankpayCode">
              </div>
            </div>
            <!-- cashssn -->
            <div class="form-group">
              <label for="cashssn" class="col-lg-2">cashssn</label>
              <div class="col-lg-10">
                <input type="text" id ="cashssn" name="cashssn" value="" class="form-control" placeholder="cashssn" v-model="rsform.cashssn">
              </div>
            </div>
            <!-- user_key -->
            <div class="form-group">
              <label for="user_key" class="col-lg-2">user_key</label>
              <div class="col-lg-10">
                <input type="text" id ="user_key" name="user_key" value="" class="form-control" placeholder="user_key" v-model="rsform.userKey">
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
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "BankAuth",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      sticky: false,
      activeIndex: 6, // GNB 활성화
      form: {
        deviceType: "PC",
        mid: "gsstore01m",
        ordId: "",
        decryptHashKey: "",
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
        txAmount: "1000",
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
        /* amt: "",
        goodsName: "",
        goodsCnt: "1",
        buyerName: "",
        buyerTel: "010000000000", */
        hdEpType: "",
        bankpayCode: "",
        hdpi: "",
        cashssn: "",
        userKey: "",
      }
    };
  },
  mixins: [
    CommAuth
  ],
  metaInfo: {
    title: '통합인증/결제 Test Suite - Responsive',
    titleTemplate: '계좌이체'
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
        .post('/fo/pa/bankAuthCallback', {hashKey: hashKey})
        .then(res => {
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data.resultMsg);
            if (res.data !== null && res.data.resultCode !== '0000') {
              alert(res.data.resultMsg);
            } else {
              alert('인증결과를 불러올 수 없습니다. 로그를 확인해주세요.');
            }
            return;
          }
          console.log(res.data);
          that.rsform = res.data;
          that.rsform.userKey = that.form.txUserKey;
        }
      );
      document.getElementById('frame_div').style.display = 'none';
    };
  },
  methods: {
    changeOption() {
      document.getElementById('frame_div').style.display = 'none';
      this.init();
    },
    async init() {
      const formData = this.form;
      const mid = formData.mid;
      const that = this;
      await ApiUtils.post("/fo/pa/bankAuthConfig" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), mid).then(function(res) {
        if (res.data.resultCode !== '0000') {
          console.error(res.data.resultMsg);
          alert('인증정보를 불러올 수 없습니다.');
          return;
        }
        that.form = res.data;
        if (formData.deviceType !== 'PC') {
          that.form.actionUrl = res.data.actionUrlMob;
          that.form.returnUrl = res.data.returnUrlMob;
          that.form.appScheme = res.data.appScheme;
        }
        that.form.deviceType = formData.deviceType;
        that.form.txAmount = "1000";

        that.form.mid = mid;
        that.form.ordId = res.data.ordId;
      });
    },
    async getAuthentication() {
      alert("bankAuth Call");
      if ( StringUtils.isEmpty(this.form.txAmount) ) {
        alert("가격을 입력해주세요.");
        return;
      }
      const data = {
        cmmMbrNo: bankForm.memNo.value,
        payCompany: 'SMARTRO',
        authType: 'BANK',
        mid: this.form.mid,
        actionUrl: this.form.actionUrl
      };
      const that = this;
      await ApiUtils.post('/fo/pa/bankInitAuth' + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data).then(res => {
        console.log(res.data);
        if (res.data !== null) {
          that.form.returnUrl = this.form.returnUrl+".hashKey_"+res.data.hashKey;
          that.form.txUserKey = res.data.userKey;
          that.form.decryptHashKey = res.data.decryptHashKey;
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
        mBankForm.target = "MPI_FRAME";
        mBankForm.submit();
      }
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
        tid: this.rsform.userKey,
        cancelAmt: this.form.txAmount,
        cancelMsg: '취소메세지',
        partialCancelCode: cancelType,
        mid: this.form.mid,
        ordId: this.form.ordId
      };
      await ApiUtils
        .post("/fo/pa/reqCancelBank" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data)
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
            // rsltForm.TID.value = "";
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
      const data = {
        deviceType: deviceType,
        amt: this.form.txAmount,
        goodsName: this.form.hdItemName,
        goodsCnt: "1",
        buyerName: "홍길동",
        buyerTel: "010000000000",
        mallUserID: bankForm.memNo.value,
        transType: this.rsform.hdEpType,
        hdpi: this.rsform.hdpi,
        buyerAuthNum: this.rsform.cashssn,
        tid: this.rsform.userKey,
        mid: this.form.mid,
        ordId: this.form.ordId
      };
      await ApiUtils
        .post("/fo/pa/reqApprBank" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data)
        .then(res => {
          let isFail = false;
          if (res.data === null || (res.data.resultCode !== '4000' && res.data.resultCode !== '0000')) {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('결제 승인 중 에러가 발생하였습니다.');
          } else {
            // rsltForm.reset();
            // rsltForm.TID.value = res.data.tid;
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
