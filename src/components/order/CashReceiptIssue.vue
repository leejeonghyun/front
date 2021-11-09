<!--
components/order/PaymentNormal.vue
-->
<template>
  <!-- START : 현금영수증 -->
  <div class="bill-wrap">
    <div class="tit-bill">
      현금영수증 발급신청
      <!-- <button type="button" class="btn-circle" @click="toggleShow" title="발급" :class="{active : this.showBill === 'show'}"><span class="hidden">현금영수증 발급 신청 보기</span></button> -->
      <div class="wrap-checkbox-text">
        <span class="wrap-checkbox" :class="{active:showBill}">
          <input type="checkbox" id="receiptReceive" v-model="showBill" checked name="cash-receipt" @click="toggleShow"/>
          <label for="receiptReceive">
            <span class="hidden">현금영수증</span>발급
          </label>
        </span>
      </div>
    </div>
    <div class="content-bill" v-if="showBill">
      <p class="check-area">
        <span class="inp-radio small w125" v-for="cashRcpctTypeInfo in cashRcpctTypeList" v-bind:key="cashRcpctTypeInfo.commCd">
          <input type="radio" name="cashRecptIssuTypeCd" v-bind:id="'personal'+cashRcpctTypeInfo.commCd" v-bind:value="cashRcpctTypeInfo.commCd" v-model="cashRecptIssuTypeCd" @click="selectBillType" @change="cashReceiptIssueEvent">
          <label v-bind:for="'personal'+cashRcpctTypeInfo.commCd">{{cashRcpctTypeInfo.commCdNm}}</label>
        </span>
      </p>
      <!-- START : 개인소득공제용  -->
      <p class="insert-tel" v-if="defaultBillType === '1'">
        <span class="wrap-select">
          <select id="telCoNo1" name="telCoNo1" class="w-small" title="휴대폰 번호 앞자리" v-model="telCoNo1" @change="cashReceiptIssueEvent">
            <option value="">선택</option>
            <option v-for="telCoNoInfo in telCoNoList" v-bind:key="telCoNoInfo.commCd" v-bind:value="telCoNoInfo.commCd">{{telCoNoInfo.commCdNm}}</option>
          </select>
        </span>
        <input type="number" maxlength="8" @input="maxLengthCheck" name="telCoNo2" id="telCoNo2" class="inp-txt" v-model="telCoNo2" @blur="cashReceiptIssueEvent" value="" placeholder="‘ - ’ 없이 숫자만 입력" title="휴대폰 번호 뒷자리">
      </p>
      <!-- END : 개인소득공제용  -->
      <!-- START : 사업자 지출증빙용  -->
      <p class="insert-tel" v-if="defaultBillType === '2'">
        <span class="wrap-select"><label for="businessNumber">사업자등록번호</label></span>
        <input type="number" maxlength="10" @input="maxLengthCheck" name="businessNumber" id="businessNumber" v-model="businessNumber" @blur="cashReceiptIssueEvent" class="inp-txt" value="" placeholder="‘ - ’ 없이 숫자만 입력">
      </p>
      <!-- END : 사업자 지출증빙용  -->
      <p class="inp-chk small">
        <input type="checkbox" name="" id="agreeBill" value="" :checked="recptChk" @change="setcashRcpctInfo($event)" >
        <label for="agreeBill">현금영수증 발급정보저장</label>
      </p>
      <ul class="txt-info-list">
        <li class="ico-alert2">개인소득공제용으로 신청하실경우에는 국세청으로 자동 전송됩니다.</li>
        <li class="ico-alert2">사업자 지출증빙용으로 신청하시면 세금계산서로 활용이 가능합니다.</li>
      </ul>
    </div>
  </div>
  <!-- END : 현금영수증 -->
</template>
<script>
import AccordionMixin from '@/mixins/AccordionMixin';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ApiUtils from '@/common/ApiUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
export default {
  name: "CashReceiptIssue",
  data() {
    return {
      showBill: false, // 현금영수증 발급
      defaultBillType: '1', // 현금영수증 타입 션택
      cashRecptIssuTypeCd: '1',
      telCoNoList: null,
      cashRcpctTypeList: null,
      telCoNo1: '',
      telCoNo2: '',
      businessNumber: '',
      cashRcpctInfo: {
        cashRecptIssuTypeCd: '',
        cashRecptInputNo: '',
        cashRecptIssuYn: '',
      },
      recptChk: false,
    };
  },
  mixins: [AccordionMixin],
  watch: {
  },
  components: {
  },
  methods: {
    // 현금영수증 더보기
    toggleShow(event) {
      const target = event.target;
      if (!this.showBill) {
        this.showBill = true;
        target.setAttribute('title', '발급');
      } else {
        this.showBill = false;
        target.setAttribute('title', '미발급');
        this.cashRcpctInfo.cashRecptIssuTypeCd = '';
        this.cashRcpctInfo.cashRecptInputNo = '';
      }
      this.cashReceiptIssueEvent();
    },
    maxLengthCheck(obj) {
      if (obj.target.value.length > obj.target.maxLength) {
        if (this.defaultBillType == '1') {
          this.telCoNo2 = obj.target.value.slice(0, obj.target.maxLength);
        } else {
          this.businessNumber = obj.target.value.slice(0, obj.target.maxLength);
        }
      }
    },
    // 현금영수증 타입 변경
    selectBillType(...event) {
      if (event[0] !== null) {
        const $this = event[0].target;
        this.defaultBillType = $this.value;
        this.cashRecptIssuTypeCd = $this.value;
        this.telCoNo2 = '';
        this.businessNumber = '';
        const agreeBill = document.querySelectorAll('#agreeBill');
        if (agreeBill !== undefined && agreeBill != null) { // 탭변경시 결제수단저장 풀어줘야함
          this.setcashRcpctInfo(null);
          agreeBill[0].checked = false;
        }
      } else {
        this.defaultBillType = event[1];
        this.cashRecptIssuTypeCd = event[1];
        this.telCoNo2 = '';
        this.businessNumber = '';
      }
    },
    async retrievelistCommCd() {
      // 휴대전화번호 공통코드 조회
      const params = {
        commGrpCd: 'CU0005',
      };
      const result = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params);
      this.telCoNoList = result.data.data;
      // 현금영수증발행용도구분 공통코드 조회
      const param = {
        commGrpCd: 'OD0032',
      };
      const resultOD0032 = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', param);
      this.cashRcpctTypeList = resultOD0032.data.data;
    },
    cashReceiptIssueEvent() {
      if (this.showBill) {
        this.cashRcpctInfo.cashRecptIssuYn = 'Y';
        this.cashRcpctInfo.cashRecptIssuTypeCd = this.cashRecptIssuTypeCd;
        if (this.cashRecptIssuTypeCd === '1') {
          this.cashRcpctInfo.cashRecptInputNo = this.telCoNo1 + "" + this.telCoNo2;
        } else {
          this.cashRcpctInfo.cashRecptInputNo = this.businessNumber;
        }
      } else {
        this.cashRcpctInfo.cashRecptIssuYn = 'N';
      }
      this.$emit('CashReceiptIssueEvent', this.cashRcpctInfo);
    },
    async setcashRcpctInfo(e) {
      const param = {};
      if (e !== null && e.target.checked == true) {
        if (this.cashRecptIssuTypeCd == '1') {
          param.cashRecptInputNo = this.telCoNo1 + this.telCoNo2;
        } else {
          param.cashRecptInputNo = this.businessNumber;
        }
        param.cashRecptIssuTypeCd = this.cashRecptIssuTypeCd;

        const hpLength = this.telCoNo1 == '010' ? 11 : 10;
        if (this.cashRecptIssuTypeCd == '1' && param.cashRecptInputNo.length < hpLength) {
          e.target.checked = false;
          this.$gsdialog.alert(OrderMsg.recptTelChk);
          return false;
        }
        if (this.cashRecptIssuTypeCd == '2' && param.cashRecptInputNo.length < 10) {
          e.target.checked = false;
          this.$gsdialog.alert(OrderMsg.recptBusiChk);
          return false;
        }
      } else {
        param.cashRecptInputNo = '';
        param.cashRecptIssuTypeCd = '';
      }
      const result = await ApiUtils.put('/fo/cu/mbrmgnt/member-order-information', param);
    },
    setUserCashRcpctInfo() { // 회원 현금영수증정보 set
      if (this.cashRcpctInfo !== undefined && this.cashRcpctInfo !== null) {
        if (this.cashRcpctInfo.cashRecptIssuTypeCd !== undefined && this.cashRcpctInfo.cashRecptIssuTypeCd !== null && this.cashRcpctInfo.cashRecptIssuTypeCd !== '') {
          this.selectBillType(null, this.cashRcpctInfo.cashRecptIssuTypeCd);
        } else {
          this.cashRecptIssuTypeCd = '1';
        }
        if (this.cashRcpctInfo.cashRecptInputNo !== undefined && this.cashRcpctInfo.cashRecptInputNo !== null) {
          const cashRecptInputNo = this.cashRcpctInfo.cashRecptInputNo;
          if (this.cashRcpctInfo.cashRecptIssuTypeCd === '1') { // 개인
            this.telCoNo1 = cashRecptInputNo.substring(0, 3);
            this.telCoNo2 = cashRecptInputNo.substring(3);
          } else if (this.cashRcpctInfo.cashRecptIssuTypeCd === '2') { // 법인
            this.businessNumber = cashRecptInputNo;
          }
          this.recptChk = true;
        }
      }
    },
    async getUserRcpInfo() {
      const result = await ApiUtils.get('/fo/cu/mbrmgnt/member-information', null);
      if (result.data.success) {
        this.cashRcpctInfo.cashRecptIssuTypeCd = result.data.data.cashRecptIssuTypeCd;
        this.cashRcpctInfo.cashRecptInputNo = result.data.data.cashRecptInputNo;
        this.setUserCashRcpctInfo();
      }
    },
  },
  destroyed() {
  },
  mounted() {
    this.retrievelistCommCd();
    this.getUserRcpInfo();
  },
};
</script>
