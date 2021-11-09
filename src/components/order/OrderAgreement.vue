<template>
  <section class="section-area accordion-wrap agree-info-wrap">
    <!-- START : 픽업 동의 -->
    <div class="sub-title tit-accordion" v-show="strInfo != null && tab.pickup === true && (strInfo.pkuppTypeCd === '1' || strInfo.pkuppTypeCd === '2' || strInfo.pkuppTypeCd === '3')">
      <span class="inp-chk small">
        <input type="checkbox" name="" id="agree-info5" value="" :check="pkupChk" @click="chkPkupAgreeInfo">
        <label for="agree-info5">픽업 서비스 동의 <span class="required" aria-label="필수 항목">*</span></label>
      </span>
      <h2>
        <button type="button" id="agreeInfoAccordion01" class="tit" aria-controls="agree-accordion-content01" aria-expanded="false" @click="accordionEvent">
          <span class="hidden">픽업 서비스 동의 <span class="required" aria-label="필수 항목">*</span></span>
        </button>
      </h2>
    </div>
    <div id="agree-accordion-content01" class="sub-inner-box accordion-content pickup-agree-cont" aria-labelledby="agreeInfoAccordion01" hidden="hidden">
      <ol class="txt-info-list number-list">
        <li><span class="number">1)</span> 주문하신 상품은 적온이 유지된 상태로 픽업지로 배송됩니다. </li>
        <li><span class="number">2)</span> GS THE FRESH 와 GS25 는 픽업 서비스 상품에 대해 보관을 대행합니다. </li>
        <li><span class="number">3)</span> 상품 불량으로 인한 취소/환불 요청은 고객센터 접수를 통해서만 가능하며, 지정된 일자에 상품 미수령시 보관상의 사유로 취소되거나 환불이 불가할 수 있습니다. (GS THE FRESH(GS 수퍼마켓) : 1661-2562 / BOX25(GS25) : 1544-4101 ) </li>
        <li><span class="number">4)</span> 배송비는 주문하는 매장 배송 정책과 동일기준으로 적용됩니다. </li>
      </ol>
    </div>
    <!-- END : 픽업 동의 -->
    <!-- START : 주류 구매에 따른 개인정보 제공 동의 -->
    <div v-show="liqItemYn == 'Y'" class="sub-title tit-accordion">
      <span class="inp-chk bg">
        <input type="checkbox" name="" id="agree-info1" value="" :check="liqItemChk" @click="chkLiqAgreeInfo">
        <label for="agree-info1">주류 구매에 따른 개인정보 제공 동의 <span class="required" aria-label="필수 항목">*</span></label>
      </span>
      <h2>
        <button type="button" id="agreeInfoAccordion02" class="tit" aria-controls="agree-accordion-content02" aria-expanded="false" @click="accordionEvent">
          <span class="hidden">주류 구매에 따른 개인정보 제공 동의 <span class="required" aria-label="필수 항목">*</span></span>
        </button>
      </h2>
    </div>
    <div id="agree-accordion-content02" class="sub-inner-box accordion-content liquor-agree-cont" aria-labelledby="agreeInfoAccordion02" hidden="hidden">
      <p>회사는 주류 구매와 관련하여 아래와 같이 개인정보를 제공할 수 있습니다.</p>
      <dl class="info-detail">
        <dt>제공 목적</dt>
        <dd>국세청 고시에 따른 주류 통신판매 주문에 대한 분기별 명세 세무서 제공</dd>
        <dt>제공 정보</dt>
        <dd>주문자 인적사항(주소, 성명, 생년월일), 주문일자, 상품명, 수량, 주문금액 등</dd>
        <dt>보유 및 이용기간</dt>
        <dd>최대 4개월</dd>
        <dt>제공받는 자</dt>
        <dd>관할 세무서</dd>
        <dt>※ 동의 거부권 등에 대한 고지</dt>
        <dd>고객님께서는 정보제공에 동의하지 않으실 수 있으며, 동의하지 않으실 경우 일부 구매가 제한 될 수 있습니다.<br>
        동의하지 않으실 경우, 일부 구매가 제한 될 수 있습니다.</dd>
      </dl>
    </div>
    <!-- END : 주류 구매에 따른 개인정보 제공 동의 -->
    <!-- START : 주문상품 및 결제대행 이용약관 동의 -->
    <div class="sub-title tit-accordion">
      <span class="inp-chk bg">
        <input type="checkbox" name="" id="agree-info2" value="" :checked="allChecked" @click="chkAgreeInfoAll()">
        <label for="agree-info2">주문상품 및 결제대행 이용약관에 모두 동의합니다 <span class="required" aria-label="필수 항목">*</span></label>
      </span>
      <h2>
        <button type="button" id="agreeInfoAccordion03" class="tit" aria-controls="agree-accordion-content03" aria-expanded="false" @click="accordionEvent">
          <span class="hidden">주류 구매에 따른 개인정보 제공 동의 <span class="required" aria-label="필수 항목">*</span></span>
        </button>
      </h2>
    </div>
    <div id="agree-accordion-content03" class="sub-inner-box accordion-content safe-agree-cont" aria-labelledby="agreeInfoAccordion03" hidden="hidden">
      <p>
        <span class="inp-chk bg">
          <input type="checkbox" name="" id="agree-info3" value="agree-info3" v-model="agreeInfo" @change="chkAgreeInfo()">
          <label for="agree-info3">주문할 상품의 상품명, 상품가격, 배송정보를 확인하였으며,구매에 동의하시겠습니까?(전자상거래법 제8조 제2항)</label>
        </span>
      </p>
      <p>
        <span class="inp-chk bg">
          <input type="checkbox" name="" id="agree-info6" value="agree-info6" v-model="agreeInfo" @change="chkAgreeInfo()">
          <label for="agree-info6">개인정보 수집 및 이용 동의</label>
        </span>
        <button id="popupPersonalAgreeDetail" type="button" class="btn-arr" aria-label="개인정보 수집 및 이용 동의 팝업 활성화" aria-haspopup="dialog" @click="popupEventActive($event)">약관보기</button>
      </p>
      <p>
        <span class="inp-chk bg">
          <input type="checkbox" name="" id="agree-info4" value="agree-info4" v-model="agreeInfo" @change="chkAgreeInfo()">
          <label for="agree-info4">개인정보 제3자 제공동의</label>
        </span>
        <button id="popupAgreeDetail" type="button" class="btn-arr" aria-label="개인정보 제3자 제공동의 팝업 활성화" aria-haspopup="dialog" @click="popupEventActive($event)">약관보기</button>
      </p>
    </div>
    <!-- END : 주문상품 및 결제대행 이용약관 -->
  </section>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "OrderAgreement",
  props: {
    productItems: Array,
    strInfo: Object,
    tab: Object,
  },
  data() {
    return {
      liqItemYn: 'N',
      allChecked: false,
      agreeInfos: ['agree-info3', 'agree-info4', 'agree-info6'],
      agreeInfo: [],
      liqItemChk: false,
      pkupChk: false,
    };
  },
  watch: {
    productItems: function() {
      this.agreementDo();
    },
  },
  mixins: [AccordionMixin],
  components: {
  },
  methods: {
    popupEventActive(e) {
      const target = e.target;
      this.$emit('popupAction', target.id);
    },
    agreementDo() {
      for (let i=0; i < this.productItems.length; i++) {
        if (this.productItems[i].liqItemYn == 'Y') {
          this.liqItemYn = 'Y';
          break;
        }
      }
    },
    chkAgreeInfoAll() {
      this.allChecked = !this.allChecked;
      this.agreeInfo = [];
      if (this.allChecked) {
        this.agreeInfos.forEach(element => {
          this.agreeInfo.push(element);
        });
      }
      this.orderAgreeChk();
    },
    chkLiqAgreeInfo() {
      this.liqItemChk = !this.liqItemChk;
      this.orderAgreeChk();
    },
    chkAgreeInfo() {
      if (this.agreeInfos.length == this.agreeInfo.length) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
      this.orderAgreeChk();
    },
    chkPkupAgreeInfo() {
      this.pkupChk = !this.pkupChk;
      this.orderAgreeChk();
    },
    orderAgreeChk() {
      this.$emit('orderAgreeChk', this.allChecked, this.liqItemYn==='Y'?this.liqItemChk:true, (this.tab !== undefined && this.tab !== null && this.tab.pickup)?this.pkupChk:true);
    },
  },
  destroyed() {
  },
  mounted() {
    this.orderAgreeChk();
  },
};
</script>
