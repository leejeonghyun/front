<template>
  <section class="section-area">
    <div class="sub-title border">
      <h2><strong class="bg-line-brush">새벽배송 <span class="required" aria-label="필수 항목">*</span></strong></h2>
    </div>
    <div class="sub-inner-box">
      <ul class="delivery-product">
        <li>
          <span class="product-name"><span class="name">{{dawnDelivInfoList.repItemNm}}</span><span v-if="dawnDelivInfoList.otherItemCnt > 0"> 외 <span class="point">{{dawnDelivInfoList.otherItemCnt}}</span>개</span></span>
        </li>
      </ul>
      <div class="inner">
        <DeliverySlotTime v-if="delivSlotPolc !== null" :strInfoMap="delivSlotPolc" :slotId="slotId" @chkDelivSeqNo="chkDelivSeqNo" :dlvDelivTypeGrpInfo="dawnDelivInfoList"/>
        <ul class="txt-info-list">
          <li class="ico-alert2">일요일은 배송이 불가합니다.</li>
          <li class="ico-alert2">병원/시장/학교 및 기숙사/관공서는 배송이 불가합니다.</li>
          <li class="ico-alert2">23시 이후 결제시 익일 새벽배송이 불가능하며, 익일 또는 영업 휴일 다음날 배송됩니다.</li>
        </ul>
      </div>
      <div class="inner" v-if="delivInfmTmznCdList.length > 0">
        <div class="sub-title">
          <h3>새벽배송 완료 알림 <span class="required" aria-label="필수 항목">*</span></h3>
        </div>
        <p class="check-area">
          <span v-for="(delivInfmTmznCd, fidx) in delivInfmTmznCdList" class="inp-radio mid" :key="fidx" :class="{w125 : fidx !== delivInfmTmznCdList.length - 1}">
            <input type="radio" name="delivInfmTmznCd" :id="`${'delivInfmTmznCd' + fidx}`" :value="delivInfmTmznCd.commCd" v-model="newDelivInfmTmznCd" v-on:change="dawnAlmComplete()">
            <label :for="`${'delivInfmTmznCd' + fidx}`">{{delivInfmTmznCd.commCdNm}}</label>
          </span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import DeliverySlotTime from '@/components/order/DeliverySlotTime'; // 배송차수 선택
import AccordionMixin from '@/mixins/AccordionMixin';
import ApiUtils from '@/common/ApiUtils';

export default {
  props: {
    dawnDelivInfor: Object,
  },
  name: "DeliveryDawn",
  data() {
    return {
      dawnDelivInfoList: {
        repItemNm: '',
        otherItemCnt: 0,
      },
      delivSlotPolc: {},
      delivInfmTmznCdList: [],
      newDelivInfmTmznCd: '1',
      ordId: '',
      ordsDelivSeqno: 0,
      ordsDlvpSeqno: 0,
      delivPolcId: '',
      seqsExpsrDys: '',
      slotId: 'dawnDelivChk',
    };
  },
  mixins: [AccordionMixin],
  components: {
    DeliverySlotTime, // 배송차수 선택
  },
  methods: {
    // 주문서새벽배송안내조회
    async retrieveDawnDelivInfor() {
      const iDawnDelivInforInq = {
        ordId: this.dawnDelivInfor.ordId,
        ordsDlvpSeqno: this.dawnDelivInfor.ordsDlvpSeqno,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/dawn-delivery-info', iDawnDelivInforInq);
      this.dawnDelivInfoList = response.data.data;
      this.ordId = this.dawnDelivInfoList.ordId;
      this.ordsDelivSeqno = this.dawnDelivInfoList.ordsDelivSeqno;
      this.ordsDlvpSeqno = this.dawnDelivInfoList.ordsDlvpSeqno;
      this.delivPolcId = this.dawnDelivInfoList.delivPolcId;
      this.seqsExpsrDys = this.dawnDelivInfoList.seqsExpsrDys;
      this.delivSlotPolc = {
        delivPolcId: this.delivPolcId,
        seqsExpsrDys: this.seqsExpsrDys,
        ordId: this.ordId,
        ordsDelivSeqno: this.ordsDelivSeqno,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
      };
      // 디폴트로 정의된 새벽배송 알림 DB 업데이트
      const iDawnDelivProcInqInput = {
        ordId: this.ordId,
        ordsDelivSeqno: this.ordsDelivSeqno,
        delivInfmTmznCd: this.newDelivInfmTmznCd,
      };
      // console.log("iDawnDelivProcInqInput : ", iDawnDelivProcInqInput);
      const responseUpdate = await ApiUtils.put('/fo/od/ordsmgnt/dawn-alarm-process', iDawnDelivProcInqInput);
    },
    // 새벽배송 알림 업데이트
    async dawnAlmComplete() {
      const iDawnDelivProcInqInput = {
        ordId: this.ordId,
        ordsDelivSeqno: this.ordsDelivSeqno,
        delivInfmTmznCd: this.newDelivInfmTmznCd,
      };
      const response = await ApiUtils.put('/fo/od/ordsmgnt/dawn-alarm-process', iDawnDelivProcInqInput);
    },
    // 새벽배송완료알림조회
    async retrievelistDelivInfmTmznCd() {
      const iCommonCodesInq = {
        commGrpCd: 'OD0031',
      };
      const response = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', iCommonCodesInq);
      this.delivInfmTmznCdList = response.data.data;
    },
    chkDelivSeqNo(seqNo) {
      this.$emit('chkDelivSeqNo', 'dawnDelivChk', seqNo, 0);
    },
  },
  destroyed() {
  },
  async mounted() {
    this.retrieveDawnDelivInfor();
    this.retrievelistDelivInfmTmznCd();
  },
};
</script>
