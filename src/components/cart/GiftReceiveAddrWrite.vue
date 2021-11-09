<template>
  <!-- START : 배송지 -->
  <section class="section-area">
    <div id="giftDeliv" class="sub-title">
      <h2>배송지</h2>
    </div>
    <div class="sub-inner-box">
      <div class="receive-delivery-info">
        <div class="delivery-info">
          <div class="input-box">
            <input type="text" class="inp-txt w100" v-model="addressInfo.adrsNm" title="받는분 이름" placeholder="받는 분의 이름을 입력 해주세요."/>
          </div>
          <p class="insert-tel">
            <span class="wrap-select">
              <select v-model="addressInfo.adrsTelCoNo" class="w-small" title="휴대폰 번호 앞자리">
                <option v-for="telCoNoInfo in telCoNoList" v-bind:key="telCoNoInfo.commCd" v-bind:value="telCoNoInfo.commCd">{{telCoNoInfo.commCdNm}}</option>
              </select>
            </span>
            <input type="number" min="00000000" max="99999999" v-model="addressInfo.adrsTelNo" class="inp-txt" value="" @keyup="checkNumberLength(addressInfo.adrsTelNo)" placeholder="‘ - ’ 없이 숫자만 입력" title="휴대폰 번호 뒷자리">
            <span>※ 주문 시 자동으로 안심번호처리가 됩니다.</span>
          </p>
        </div>
      </div>
      <h3 class="sub-title3">주소 <span class="required" aria-label="필수 항목">*</span></h3>
      <div class="code-area">
        <p class="address-code">
          <input type="number" class="inp-txt" v-model="addressInfo.zipCode" title="우편번호" readonly="readonly">
          <button type="button" id="searchAddr" class="btn-border btn-bg" @click="popupAction('popupFindAddress', 'A')">주소검색</button>
        </p>
        <input class="inp-txt w100" type="text" v-model="addressInfo.road" title="주소 입력1" readonly="readonly">
        <input class="inp-txt w100" type="text" title="주소 입력2" v-model="addressInfo.detail" readonly="readonly" placeholder="상세 주소를 직접 입력해주세요.">
        <input type="hidden" title="주소 입력2" v-model="addressInfo.jibun" readonly="readonly">
      </div>
    </div>
    <PopupFindAddress v-if="popup.popupFindAddress" :paramFindType="findType" :paramQueryString="queryString" @popupEvent="popupAction" @callbackAddress="callbackAddress" />
  </section>
  <!-- END : 배송지 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import PopupFindAddress from '@/components/order/PopupFindAddress.vue';
import ApiUtils from "@/common/ApiUtils";

export default {
  props: {
    giftMsgInfo: Object,
  },
  name: "GiftReceiveAddrWrite",
  data() {
    return {
      popup: {
        popupFindAddress: false,
      },
      addressInfo: {
        adrsNm: '',
        adrsTelCoNo: "010",
        adrsTelNo: '',
        telNo: '',
        jibun: "",
        road: "",
        zipCode: "",
        detail: "",
      },
      address: {},
      queryString: '', /* 기본 주소값 검색 시 props 전달 하세요. <PopupFindAddress :paramQueryString="queryString" */
      findType: "A",
      telCoNoList: [],
    };
  },
  mixins: [LayerPopupMixin],
  components: {
    PopupFindAddress
  },
  watch: {
    giftMsgInfo() {
      this.addressInfo.adrsNm = this.giftMsgInfo.giftRcptCmmMbrNm; // 수취인명
      if (this.giftMsgInfo.giftTrpsTelNo !== '' && this.giftMsgInfo.giftTrpsTelNo !== undefined) {
        this.addressInfo.adrsTelCoNo = (this.giftMsgInfo.giftTrpsTelNo).substring(0, 3);
        this.addressInfo.adrsTelNo = (this.giftMsgInfo.giftTrpsTelNo).substring(3);
      }
    }
  },
  methods: {
    chkSafeNumber(event) {
      this.$emit('chkSafeNumber', event);
    },
    popupAction(type, findType) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      if (findType) {
        this.findType = findType;
      }
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false;
    },
    callbackAddress(rtn) {
      // 모달 숨김
      this.popup['popupFindAddress'] = false;
      this.addressInfo.zipCode = rtn['zonecode'];
      this.addressInfo.detail = rtn['detailAddress'];
      this.addressInfo.jibun = rtn['jibunAddress'];
      this.addressInfo.road = rtn['roadAddress'];
    },
    // 자리수체크
    checkNumberLength(str) {
      if (str.length > 8) {
        this.addressInfo.adrsTelNo = str.substring(0, 8);
      }
    },
    // 수취자정보 이벤트
    getAddress() {
      this.addressInfo.telNo = this.addressInfo.adrsTelCoNo + this.addressInfo.adrsTelNo;
      return this.addressInfo;
    },
  },
  destroyed() {
  },
  async mounted() {
    // 휴대전화번호 공통코드 조회
    const params = {
      commGrpCd: 'CU0005',
    };
    const result = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params);
    this.telCoNoList = result.data.data;
  },
  computed: {
    jibunInfo() {
      let info = "";
      if (this.addressInfo.zipCode) {
        info += '(' + this.addressInfo.zipCode + ')';
      }
      if (this.addressInfo.jibun) {
        info += " " + this.addressInfo.jibun + " " + this.addressInfo.detail;
      }
      return info;
    },
    roadInfo() {
      let info = "";
      if (this.addressInfo && this.addressInfo.zipCode) {
        info += '(' + this.addressInfo.zipCode + ')';
      }
      if (this.addressInfo && this.addressInfo.road) {
        info += " " + this.addressInfo.road + " " + this.addressInfo.detail;
      }
      return info;
    },
    centerInfo() {
      return this.addressInfo.centerName;
    }
  },
};
</script>
