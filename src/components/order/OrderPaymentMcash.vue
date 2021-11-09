<template>
    <div id="payMcashFlag" :class="deviceTypeChk() === true ? 'wrap-full-popup' : ''" :role="deviceTypeChk() === true ? 'dialog' : ''" :aria-modal="deviceTypeChk()">
      <div>
        <div v-if="deviceTypeChk() === true" class="header-popup">
          <strong>결제하기</strong>
        </div>
        <!-- START : 본문 -->
        <div class="full-popup-body scroll-area">
        <form class="form-horizontal" id="mcashForm" name="mcashForm" method="post" @submit.prevent="submit()">
            <input type="hidden" name="deviceType" v-model="form.deviceType" /> <!-- PC or Mob -->
            <input type="hidden" name="mid" v-model="form.mid"> <!-- 가맹점MID -->
            <input type="hidden" name="CASH_GB" v-model="form.cashGb"> <!-- 결제수단구분 "MC" 고정 -->
            <input type="hidden" name="MC_SVCID" v-model="form.mcSvcid" > <!-- 모빌리언스 부여 서비스ID -->
            <input type="hidden" name="Prdtprice" v-model="form.prdtprice" > <!-- 결제요청금액 -->
            <input type="hidden" name="PAY_MODE" v-model="form.payMode" > <!--연동 테스트/실결제 구분  테스트:00, 실:10 -->
            <input type="hidden" name="Okurl" v-model="form.returnUrl"> <!--인증return url  -->
            <input type="hidden" name="Prdtnm" v-model="form.prdtnm"> <!-- 상품명-->
            <input type="hidden" name="Siteurl" v-model="form.siteurl"> <!-- 가맹점도메인-->
            <input type="hidden" name="LOGO_YN" v-model="form.logoYn" > <!--가맹점로고사용여부  -->
            <input type="hidden" name="CALL_TYPE" v-model="form.callType" > <!-- 결제창호출방식(P: 팝업-default, SELF: 페이지전환, I: 아이프레임)-->
            <input type="hidden" name="MC_AUTHPAY" v-model="form.mcAuthpay" > <!-- 하이브리드사용여부(휴대폰 SMS인증 후 일반 소켓모듈 결제 연동시 사용) (N: 미사용-default, Y: 사용)-->
            <input type="hidden" name="MC_AUTOPAY" v-model="form.mcAutopay" > <!-- 자동결제를 위한 최초 일반결제 시 "Y" 세팅. 결제 완료 후 휴대폰정보 대체용 USERKEY 발급 및 자동결제용 AutoBillKey 발급 (N: 미사용-default, Y: 사용)-->
            <input type="hidden" name="MC_PARTPAY"  v-model="form.mcPartpay"> <!-- 부분취소를 위한 일반결제 시 "Y" 세팅. 결제 완료 후 자동결제 USERKEY 발급 (N: 미사용-default, Y: 사용)-->
            <input type="hidden" name="buyerName" v-model="form.buyerName" > <!-- 결제자이름-->
            <input type="hidden" name="MC_No" v-model="form.mcNo" > <!-- 사용자 전화번호-->
            <input type="hidden" name="MC_FIXNO" v-model="form.mcFixno" > <!-- 사용자 전화번호 수정불가여부(N: 수정가능-default, Y: 수정불가)-->
            <input type="hidden" name="Payeremail" v-model="form.payeremail" > <!-- 결제자이메일-->
            <input type="hidden" name="MC_DEFAULTCOMMID" v-model="form.mcDefaultcommid" > <!-- 통신사 기본 선택 값-->
            <input type="hidden" name="MC_FIXCOMMID" v-model="form.mcFixcommid" > <!-- 통신사 고정 선택 값-->
            <input type="hidden" name="Userid" v-model="form.mbrNo"> <!-- 결제자id-->
            <input type="hidden" name="Item" v-model="form.item" > <!-- 아이템코드-->
            <input type="hidden" name="Prdtcd" v-model="form.prdtcd" > <!-- 상품코드-->
            <input type="hidden" name="MC_Cpcode" v-model="form.mcCpcode" > <!-- 리셀러하위상점key-->
            <input type="hidden" name="notiemail" v-model="form.notiemail" > <!-- 알림 이메일-->
            <input type="hidden" name="Notiurl" v-model="form.notiurl" > <!-- 완료 후 결제처리 페이지-->
            <input type="hidden" name="Closeurl" v-model="form.closeurl" > <!-- 결제창 취소 버튼 클릭시 return url-->
            <input type="hidden" name="Failurl" v-model="form.failurl" > <!-- 결제실패시 return url-->
            <input type="hidden" name="MSTR" v-model="form.mastr" > <!-- 가맹점콜백변수-->
            <input type="hidden" name="Sellernm" v-model="form.sellernm" > <!-- 실판매자이름-->
            <input type="hidden" name="Sellertel" v-model="form.sellertel" > <!-- 실판매자전화번호-->
            <input type="hidden" name="IFRAME_NAME" v-model="form.iframeName" > <!-- iframe이용시 iframe 이름-->
            <input type="hidden" name="INFOAREA_YN" v-model="form.infoareaYn" > <!-- 결제창 안내문 표시여부 (Y: 표시-default,  N: 미표시)-->
            <input type="hidden" name="FOOTER_YN" v-model="form.footerYn" > <!-- 결제창 하단 안내 표시여부 (Y: 표시-default,  N: 미표시)-->
            <input type="hidden" name="HEIGHT" v-model="form.height" > <!-- 결제창 높이 (px단위: iframe 등 사용시 결제창 높이 조절, 팝업창 등 호출시 "" 로 세팅)-->
            <input type="hidden" name="PRDT_HIDDEN" v-model="form.prdtHidden" > <!-- iframe 사용시 상품명 숨김 여부 (가맹점 디자인 결제창으로 결제 입력 사항만 iframe에서 사용시)-->
            <input type="hidden" name="EMAIL_HIDDEN" v-model="form.emailHidden" > <!-- 결제자 e-mail 입력창 숨김 여부 (N: 표시-default, Y: 미표시)-->
            <input type="hidden" name="CONTRACT_HIDDEN" v-model="form.contractHidden" > <!-- 이용약관 숨김 여부 (Y: 표시-default,  N: 미표시)-->
            <input type="hidden" name="Cryptyn" v-model="form.cryptyn" > <!-- 암호화 사용여부 (Y: 암호화 사용, N: 암호화 미사용)-->
            <input type="hidden" name="Cryptstring" v-model="form.cryptstring" > <!-- 암호화 사용 시 암호화된 스트링-->
            <input type="hidden" name="Tradeid" v-model="form.tid" > <!-- 스마트로 채번 tid-->
            <!-- <div class="form-group">
              <div class="col-lg-10 col-lg-offset-2">
                <button type="button" class="btn btn-primary" @click="getAuthentication">인증진행하기</button>
                <button type="button" class="btn btn-primary" @click="doPay">승인</button>
              </div>
            </div>-->
        </form>
        <div class="frame-div" style="display:none" id="frame_div">
          <iframe src="" name="MCASH_FRAME" id="MCASH_FRAME" style="border:0; width:100%; height:610px;" scrolling="yes" align="center"/>
        </div>
        <form class="form-horizontal" name="rsltForm" id="rsltForm">
          <input type="hidden" id ="tid" name="tid" value="" v-model="rsform.tid">
          <input type="hidden" id ="commId" name="commId" value="" v-model="rsform.commId"> <!-- 이통사코드 -->
          <input type="hidden" id ="otp" name="otp" value="" v-model="rsform.otp"> <!-- 인증번호 -->
          <input type="hidden" id ="mobileId" name="mobileId" value="" v-model="rsform.mobileId"> <!-- 승인번호 (거래인증 Key) -->
          <input type="hidden" id ="phoneId" name="phoneId" value="" v-model="rsform.phoneId"> <!-- 결제요청 휴대폰 번호 -->
          <input type="hidden" id ="goodsCl" name="goodsCl" value="" v-model="rsform.goodsCl"> <!-- 상품구분 -->
          <input type="hidden" id ="hashKey" name="hashKey" value="" v-model="rsform.hashKey"> <!-- HashKey -->
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
  name: "McashAuth",
  data() {
    return {
      sticky: false,
      activeIndex: 8, // GNB 활성화
      form: {
        deviceType: "",
        mid: "",
        mbrNo: "",
        cashGb: "",
        mcSvcid: "",
        prdtprice: "",
        payMode: "",
        returnUrl: "",
        prdtnm: "",
        siteurl: "",
        logoYn: "",
        callType: "",
        mcAuthpay: "",
        mcAutopay: "",
        mcPartpay: "",
        mcNo: "",
        mcFixno: "",
        mcDefaultcommid: "",
        mcFixcommid: "",
        payeremail: "",
        userid: "",
        item: "",
        prdtcd: "",
        mcCpcode: "",
        notiemail: "",
        notiurl: "",
        closeurl: "",
        failurl: "",
        mastr: "",
        sellernm: "",
        sellertel: "",
        iframeName: "",
        infoareaYn: "",
        footerYn: "",
        height: "",
        prdtHidden: "",
        emailHidden: "",
        contractHidden: "",
        cryptyn: "",
        cryptstring: "",
        tid: "",
        buyerName: ""
      },
      rsform: {
        commId: "",
        otp: "000000",
        mobileId: "",
        phoneId: "",
        goodsCl: "1",
        tid: "",
        hashKey: "",
      }
    };
  },
  mixins: [
    CommAuthOd
  ],
  created() {
    // orderSheet페이지에서 전송된 데이터를 세팅한다.
    this.form.deviceType = this.orderSheetForm.deviceType;
    this.form.prdtprice = this.orderSheetForm.goods_price;
    this.form.prdtnm = this.orderSheetForm.goods_name;
    this.form.buyerName = this.orderSheetForm.buyer_name;
    this.form.mcNo = this.orderSheetForm.buyer_tel;
    this.form.payeremail = this.orderSheetForm.email;
    this.form.mbrNo = this.orderSheetForm.memNo;
    this.form.callType = 'I';
    this.form.notiemail = this.orderSheetForm.email;
    this.form.goodsCnt = this.orderSheetForm.goods_cnt;
  },
  watch: {
  },
  mounted: async function() {
    const that = this;
    window.callbackFnc = function(hashKey) {
      ApiUtils
        .post('/fo/pa/mcashAuthCallback', {hashKey: hashKey})
        .then(res => {
          if (that.form.deviceType === 'MO') {
              document.getElementById('frame_div').style.display = 'none';
          }
          console.log("res.data : ", res.data);
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data.resultMsg);
            alert(OrderMsg.emptyAuth);
            return;
          }
          that.rsform = res.data;
          that.rsform.otp = "000000";
          that.rsform.goodsCl = "1";
          that.rsform.hashKey = hashKey;
          that.rsformCallback(res.data.resultCode);
        }
      );
    };
    this.callMcashScript();
    this.getAuthentication();
  },
  methods: {
    popupAction() { // 닫기
      this.$emit('popupAction', 'payMcashFlag');
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
      // console.log("MCash this.rsform : ", this.rsform);
      this.$emit('orderPaymentCallBack', 'payMcashFlag', isFail, this.rsform);
    },
    async getAuthentication() {
      const formData = this.form;
      if ( StringUtils.isEmpty(this.form.prdtprice) ) {
        alert(OrderMsg.editProPrice);
        return;
      }
      if ( StringUtils.isEmpty(this.form.buyerName) ) {
        alert(OrderMsg.editCustNm);
        return;
      }
      if ( StringUtils.isEmpty(this.form.mcNo) ) {
        alert(OrderMsg.editCustTel);
        return;
      }
      /* if ( StringUtils.isEmpty(this.form.payeremail) ) {
        alert("결제자 이메일을 입력해주세요.");
        return;
      } */
      const data = {
        cmmMbrNo: this.form.mbrNo,
        payCompany: 'SMARTRO',
        authType: 'CELLPHONE',
      };
      const that = this;
      await ApiUtils.post("/fo/pa/mcashInitAuthByLogin" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data).then(function(res) {
        // console.log(res);
        if (res.data === null || res.data.resultCode !== '0000') {
          that.$gsdialog.alert(OrderMsg.emptyAuth);
          return;
        }
        that.form = res.data;
        that.form.deviceType = formData.deviceType;
        that.form.prdtprice = formData.prdtprice;
        that.form.payeremail = formData.payeremail;
        that.form.buyerName = formData.buyerName;
        that.form.prdtnm = formData.prdtnm;
        that.form.mcNo = formData.mcNo;
        that.form.mbrNo = formData.memNo;
        that.form.returnUrl = res.data.returnUrl+".hashKey_"+res.data.hashKey;
        that.form.failurl = res.data.failurl+".hashKey_"+res.data.hashKey;
        console.log("that.form : ", that.form);
      });
      const mcashPayment = window.MCASH_PAYMENT;
      mcashPayment(document.getElementById('mcashForm'));
      if (that.form.deviceType === 'MO') {
        document.getElementById('frame_div').style.display = 'block';
        const windowWidth = $(window).width();
        const windowHeight = $(window).height() - 57; // 상단 tab제거
        console.log(windowHeight);
        $('#MCASH_FRAME').css({
          'width': windowWidth,
          'height': windowHeight
        });
      }
    },
  }
};
</script>
