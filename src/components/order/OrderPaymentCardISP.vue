<template>
    <div id="payCardIspFlag">
      <div>
        <!-- START : 본문 -->
        <div class="full-popup-body scroll-area">
        <form id="ispForm" name="ispForm" @submit.prevent class="form-horizontal" method="post">
          <!-- smartro or kcp -->
          <input type="hidden" id="payCompany" name="payCompany" v-model="form.payCompany" /> <!-- smartro or kcp -->
          <input type="hidden" id="deviceType" name="deviceType" v-model="form.deviceType" /> <!-- PC or Mob -->
          <input type="hidden" id="card_code" name="card_code" v-model="form.cardCode" /> <!-- 카드종류 -->
          <input type="hidden" id="mid" name="mid" v-model="form.mid" /> <!-- 결제사 MID(스마트로/kcp) -->
          <input type="hidden" id="buyer_name" name="buyer_name" v-model="form.buyer_name" /> <!-- 구매자(buyer_name) -->
          <input type="hidden" id="buyer_tel" name="buyer_tel" v-model="form.buyer_tel" /> <!-- 구매자연락처(buyer_tel) -->
          <input type="hidden" id="memNo" name="memNo" v-model="form.memNo" /> <!-- 고객번호(mem_no) -->
          <input type="hidden" id="KVP_GOODNAME" name="KVP_GOODNAME" v-model="form.KVP_GOODNAME" /> <!-- 상품명(KVP_GOODNAME) -->
          <input type="hidden" id="goods_cnt" name="goods_cnt" v-model="form.goods_cnt" /> <!-- 상품수량(goods_cnt) -->
          <input type="hidden" id="KVP_PRICE" name="KVP_PRICE" v-model="form.KVP_PRICE" /> <!-- 가격(KVP_PRICE) -->
          <input type="hidden" id="taxableAmt" name="taxableAmt" v-model="form.taxableAmt"> <!-- 과세대상금액(taxableAmt) -->
          <input type="hidden" id="tax" name="tax" v-model="form.tax"> <!-- 부가세(tax) -->
          <input type="hidden" id="taxFreeAmt" name="taxFreeAmt" v-model="form.taxfreeAmt"> <!-- 면세대상금액(taxFreeAmt) -->
          <input type="hidden" id="KVP_CARDCOMPANY" name="KVP_CARDCOMPANY" v-model="form.KVP_CARDCOMPANY" /> <!-- 카드코드(KVP_CARDCOMPANY) -->
          <input type="hidden" id="KVP_CURRENCY" name="KVP_CURRENCY" v-model="form.KVP_CURRENCY" /> <!-- 지불 화폐 단위 /한화 - WON, 미화 - USD(KVP_CURRENCY) -->
          <input type="hidden" id="VP_BC_ISSUERCODE" name="VP_BC_ISSUERCODE" v-model="form.VP_BC_ISSUERCODE" /> <!-- BC 발행사 코드(VP_BC_ISSUERCODE) -->
          <input type="hidden" id="KVP_QUOTA_INF" name="KVP_QUOTA_INF" v-model="form.KVP_QUOTA_INF" /> <!-- KVP_QUOTA_INF(일반할부개월수 정보) -->
          <input type="hidden" id="KVP_NOINT_INF" name="KVP_NOINT_INF" v-model="form.KVP_NOINT_INF" /> <!-- KVP_NOINT_INF(무이자 할부 정보) -->
          <input type="hidden" id="KVP_NOINT_FLAG" name="KVP_NOINT_FLAG" v-model="form.KVP_NOINT_FLAG" /> <!-- KVP_NOINT_FLAG(무이자 or 공백 세팅) -->
          <input type="hidden" id="KVP_FIXPAYFLAG" name="KVP_FIXPAYFLAG" v-model="form.KVP_FIXPAYFLAG" /> <!-- 복합결제 유무(KVP_FIXPAYFLAG) -->
          <input type="hidden" id="KVP_MERCHANT_KB" name="KVP_MERCHANT_KB" v-model="form.KVP_MERCHANT_KB" /> <!-- 국민카드 포인트 가맹점(KVP_MERCHANT_KB) -->
          <input type="hidden" id="KVP_KB_SAVEPOINTREE" name="KVP_KB_SAVEPOINTREE" v-model="form.KVP_KB_SAVEPOINTREE" /> <!-- 국민카드 세이브 포인트(KVP_KB_SAVEPOINTREE) -->
          <input type="hidden" id="VP_BC_SAVEPOINT" name="VP_BC_SAVEPOINT" v-model="form.VP_BC_SAVEPOINT" /> <!-- 비씨카드 세이브 포인트(VP_BC_SAVEPOINT) -->
          <input type="hidden" id="KVP_PGID" name="KVP_PGID" v-model="form.KVP_PGID" /> <!-- pgid -->
          <input type="hidden" id="KVP_IMGURL" name="KVP_IMGURL" v-model="form.KVP_IMGURL" /> <!-- KVP_IMGURL -->
          <input type="hidden" id="KVP_NOINT" name="KVP_NOINT" v-model="form.KVP_NOINT" /> <!-- KVP_NOINT -->
          <input type="hidden" id="KVP_QUOTA" name="KVP_QUOTA" v-model="form.KVP_QUOTA" /> <!-- KVP_QUOTA -->
          <input type="hidden" id="KVP_CONAME" name="KVP_CONAME" v-model="form.KVP_CONAME" /> <!-- KVP_CONAME -->
          <input type="hidden" id="KVP_CARDCODE" name="KVP_CARDCODE" v-model="form.KVP_CARDCODE" /> <!-- KVP_CARDCODE -->
          <input type="hidden" id="KVP_SESSIONKEY" name="KVP_SESSIONKEY" v-model="form.KVP_SESSIONKEY" /> <!-- KVP_SESSIONKEY -->
          <input type="hidden" id="KVP_ENCDATA" name="KVP_ENCDATA" v-model="form.KVP_ENCDATA" /> <!-- KVP_ENCDATA -->
          <input type="hidden" id="VP_CANCEL_CODE" name="VP_CANCEL_CODE" v-model="form.VP_CANCEL_CODE" /> <!-- VP_CANCEL_CODE -->
          <input type="hidden" id="INIpluginData" name="INIpluginData" v-model="form.INIpluginData" /> <!-- 'INIpluginData'는 플러그인에서 데이타를 받기 위한 필드 -->
          <input type="hidden" id="hashKey" name="hashKey" v-model="form.hashKey" /> <!-- hashKey -->
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
import StringUtils from '@/common/StringUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
export default {
  props: {
    orderSheetForm: Object,
  },
  name: "payCardIspFlag",
  data() {
    return {
      form: {
        payCompany: "",
        deviceType: "",
        cardCode: "",
        mid: "",
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
        VP_CANCEL_CODE: "",
        INIpluginData: "",
        hashKey: "",
        buyer_name: "",
        buyer_tel: "",
        memNo: "",
        goods_cnt: "",
        authType: "ISP",
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
    };
  },
  mixins: [
    CommAuthOd
  ],
  created() {
    // orderSheet페이지에서 전송된 데이터를 세팅한다.
    this.form.payCompany = this.orderSheetForm.payCompanyCd;
    this.form.deviceType = this.orderSheetForm.deviceType;
    this.form.buyer_name = this.orderSheetForm.buyer_name;
    this.form.buyer_tel = this.orderSheetForm.buyer_tel;
    this.form.memNo = this.orderSheetForm.memNo;
    this.form.KVP_GOODNAME = this.orderSheetForm.goods_name;
    this.form.goods_cnt = this.orderSheetForm.goods_cnt;
    this.form.KVP_PRICE = this.orderSheetForm.goods_price;
    this.form.KVP_QUOTA_INF = this.orderSheetForm.quota_inf;
    // this.form.KVP_NOINT_INF = this.orderSheetForm.noint_inf;
    this.form.cardCode = this.orderSheetForm.cardCode;
    this.form.aff_name = this.orderSheetForm.aff_name;
    this.form.orderNo = this.orderSheetForm.orderNo;
    this.form.taxfreeAmt = this.orderSheetForm.totalTaxfreeAmt;
    this.form.tax = this.orderSheetForm.totalVatAmt;
    this.form.taxableAmt = this.orderSheetForm.totalTaxableAmt;
    // console.log("this.form. : ", this.form);
    // console.log("this.kform. : ", this.kform);
  },
  mounted: async function() {
    this.init();
    const that = this;
    window.authFinish = function(isFail) {
      console.log(isFail);
      if (isFail === false) {
        that.$emit('orderPaymentCallBack', '', isFail, that.form);
      }
    };
  },
  methods: {
    popupAction() { // 닫기
      this.$emit('popupAction', 'payCardIspFlag');
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
      // console.log(deviceType);
      // console.log(cardCode);

      this.callIspActiveX();
      if ( StringUtils.isEmpty(ispForm.buyer_name.value) ) {
        alert(OrderMsg.editCustNm);
        return;
      }
      if ( StringUtils.isEmpty(ispForm.buyer_tel.value) ) {
        alert(OrderMsg.editCustTel);
        return;
      }
      if ( StringUtils.isEmpty(ispForm.memNo.value) ) {
        alert(OrderMsg.editCustNum);
        return;
      }
      if ( StringUtils.isEmpty(ispForm.goods_cnt.value) ) {
        alert(OrderMsg.editProQty);
        return;
      }
      if ( StringUtils.isEmpty(formData.KVP_PRICE) ) {
        alert(OrderMsg.editProPrice);
        return;
      }
      const data = {
        authType: formData.authType,
        cardCode: cardCode,
        cmmMbrNo: formData.memNo,
      };
      const that = this;
      await ApiUtils.post('/fo/pa/cardInitAuthByLogin' + ((formData.deviceType === "PC") ? "Pc" : "Mob"), data).then(function(res) {
        if (res.data.resultCode !== '0000') {
          alert(OrderMsg.emptyAuth);
          return;
        }
        // console.log(res.data);
        that.form.mid = res.data.mid;
        that.form.cardCode = cardCode;
        that.form.KVP_PGID = res.data.mid;
        that.form.KVP_CURRENCY = res.data.currency;
        // that.form.KVP_GOODNAME = res.data.goodName;
        that.form.KVP_CARDCOMPANY = res.data.cardCd;
        that.form.hashKey = res.data.hashKey;
        // that.form.payCompany = res.data.payCompany;
        that.form.VP_BC_ISSUERCODE = "";
        // 우리
        if (cardCode === "20") {
          that.form.VP_BC_ISSUERCODE = "WR";
        // 우체국
        } else if (cardCode === "71") {
          that.form.VP_BC_ISSUERCODE = "PT";
        }
        if (that.form.KVP_QUOTA_INF != "") {
          if (that.form.KVP_QUOTA_INF.length > 1 && that.form.KVP_QUOTA_INF.substr(0, 1) == "0") {
            that.form.KVP_QUOTA_INF = that.form.KVP_QUOTA_INF.substr(1, 1);
          } else if (that.form.KVP_QUOTA_INF.length === 1 && that.form.KVP_QUOTA_INF !== "0") {
            that.form.KVP_QUOTA_INF = that.form.KVP_QUOTA_INF;
          } else if (that.form.KVP_QUOTA_INF.length === 2 && that.form.KVP_QUOTA_INF.substr(0, 1) !== "0") {
            that.form.KVP_QUOTA_INF = that.form.KVP_QUOTA_INF;
          } else {
            that.form.KVP_QUOTA_INF = "0";
          }
        } else {
          that.form.KVP_QUOTA_INF = "0";
        }
        // if (res.data.payCompany === "09") {
        //  that.form.mid = "AO03V";
        // }
      });
      that.form.KVP_NOINT_INF = "";
      if (this.getRepresentative(cardCode) === '0100' && this.orderSheetForm.noint_yn == 'Y') {
        if (that.form.KVP_NOINT_INF != "") { // as-is setKvpNointInf(무이자할부 함수에서 setting)
          that.form.KVP_NOINT_INF = this.getRepresentative(cardCode)+"-"+that.form.KVP_QUOTA_INF;
        }
      }
      this.getAuthentication();
    },
    // 무이자 카드정보
    getRepresentative(crcoCd) {
      let result = "00";
      switch (crcoCd) {
        case "41": // BC카드
          result = "0100";
          break;
        case "04": // 국민카드
          result = "0204";
          break;
        case "05": // 외환카드
          result = "4599300000000000";
          break;
        case "43": // 삼성카드
          result = "51";
          break;
        case "21": // 신한카드
          result = "81";
          break;
        case "45": // 현대카드
          result = "61";
          break;
        case "44": // 롯데카드
          result = "4670080000000000";
          break;
        case "53": // 씨티카드
          result = "4539340000000007";
          break;
        case "11": // NH카드
          result = "91";
          break;
        case "25": // 하나카드
          result = "4570473000000007";
          break;
        case "34":// 광주은행카드
          result = "1500";
          break;
        case "37":// 전북은행카드
          result = "1600";
          break;
        case "20":// 우리은행카드
          result = "0700";
          break;
        case "07":// 수협은행카드
          result = "1800";
          break;
        case "35":// 제주은행카드
          result = "0100";
          break;
        case "71":// 제주은행카드
          result = "0100";
          break;
        default:
          result = "00";
          break;
      }
      if (result == "00") {
        alert(OrderMsg.editCardCom);
      } else if (result == "99") {
        alert(OrderMsg.errorCardInfo);
      }
      return result;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
