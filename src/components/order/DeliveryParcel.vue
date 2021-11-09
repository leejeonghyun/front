<template>
  <section class="section-area" v-if="dlvDelivInfoList !== null && dlvDelivInfoList.ordId !== null">
    <div class="sub-title border">
      <h2><strong class="bg-line-brush">택배배송 <span class="required" aria-label="필수 항목">*</span></strong></h2>
    </div>
    <div class="sub-inner-box">
      <div class="wrap-branch-title" v-for="(dlvDelivTypeGrpInfo, idx) in dlvDelivInfoList ? dlvDelivInfoList.dlvDelivTypeGrpInfoList ? dlvDelivInfoList.dlvDelivTypeGrpInfoList : [] : []" :key="idx">
        <div class="wrap-branch-title">
          <h2><strong class="branch">{{dlvDelivTypeGrpInfo.dlvDelivGrpNm}}</strong> <span class="required" aria-label="필수 항목" v-if="'01' === dlvDelivTypeGrpInfo.itemSelrTypeCd">*</span></h2>
        </div>
        <ul class="delivery-product" v-if="'Y' !== dlvDelivTypeGrpInfo.spckItemYn">
          <li v-for="(dlvDelivItemSmmrInfo, idx1) in dlvDelivTypeGrpInfo ? dlvDelivTypeGrpInfo.dlvDelivItemSmmrInfoList ? dlvDelivTypeGrpInfo.dlvDelivItemSmmrInfoList : [] : []" :key="idx1">
            <span class="product-name"><span class="name">{{dlvDelivItemSmmrInfo.repItemNm}}</span><span v-if="dlvDelivItemSmmrInfo.otherItemCnt > 0"> 외 <span class="point">{{dlvDelivItemSmmrInfo.otherItemCnt}}</span>개</span></span>
          </li>
        </ul>
        <!-- START : GS fresh 택배 -->
        <DeliverySlotTime v-if="delivSlotPolc !== null && dlvDelivTypeGrpInfo.delivTypeCd !== '03' && 'Y' !== dlvDelivTypeGrpInfo.spckItemYn" :dlvDelivTypeGrpInfo="dlvDelivTypeGrpInfo" :strInfoMap="delivSlotPolc" :slotIdx="String(idx)" :slotId="slotId" @chkDelivSeqNo="chkDelivSeqNo" />
        <!-- END : GS fresh 택배 -->
        <!-- START : 심플리쿡 -->
        <ul class="delivery-product" v-if="'Y' == dlvDelivTypeGrpInfo.spckItemYn">
          <li v-for="(dlvDelivItemSmmrInfo, idx1) in dlvDelivTypeGrpInfo ? dlvDelivTypeGrpInfo.dlvDelivItemSmmrInfoList ? dlvDelivTypeGrpInfo.dlvDelivItemSmmrInfoList : [] : []" :key="idx1">
              <span class="product-name"><span class="name">심플리쿡) {{dlvDelivItemSmmrInfo.repItemNm}}</span><span v-if="dlvDelivItemSmmrInfo.otherItemCnt > 0"> 외 <span class="point">{{dlvDelivItemSmmrInfo.otherItemCnt}}</span>개</span></span>
              <span class="date" v-if="isNotEmpty(dlvDelivItemSmmrInfo.delivDt)">{{dlvDelivItemSmmrInfo.delivDt}}({{dlvDelivItemSmmrInfo.delivDow}})도착예정</span>
          </li>
        </ul>
        <!-- END : 심플리쿡 -->
      </div>
    </div>
  </section>
</template>

<script>
import DeliverySlotTime from '@/components/order/DeliverySlotTime'; // 배송차수 선택
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';

export default {
  props: {
    dlvDelivInfor: Object,
  },
  name: "DeliveryParcel",
  data() {
    return {
      dlvDelivInfoList: null,
      delivSlotPolc: null,
      slotId: 'dlvDelivChk',
      slotSelectCnt: 0,
      selectedSlotIdx: [],
    };
  },
  mixins: [],
  components: {
    DeliverySlotTime, // 배송차수 선택
  },
  methods: {
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    // 주문서택배배송안내조회
    async retrieveDlvDelivInfor() {
      const iDlvDelivInforInq = {
        ordId: this.dlvDelivInfor.ordId,
        ordsDlvpSeqno: this.dlvDelivInfor.ordsDlvpSeqno,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/parcel-delivery-info', iDlvDelivInforInq);
      this.dlvDelivInfoList = response.data.data;
      // console.log("this.dlvDelivInfor : ", this.dlvDelivInfor);
      for (let i=0; i < this.dlvDelivInfoList.dlvDelivTypeGrpInfoList.length; i++) {
        const dg = this.dlvDelivInfoList.dlvDelivTypeGrpInfoList[i];
        if ('Y' !== dg.spckItemYn && '01' === dg.itemSelrTypeCd) {
          this.delivSlotPolc = {
            delivPolcId: dg.delivPolcId,
            seqsExpsrDys: dg.seqsExpsrDys,
            ordsDelivSeqno: dg.ordsDelivSeqno,
            ordId: this.dlvDelivInfoList.ordId,
            ordsDlvpSeqno: this.dlvDelivInfoList.ordsDlvpSeqno,
            delivTypeCd: this.dlvDelivInfoList.delivTypeCd,
          };
          break;
        }
      }
    },
    chkDelivSeqNo(slotIdx) {
      let slotCount = 0;
      let selectedSlot = false;
      for (let i=0; i < this.dlvDelivInfoList.dlvDelivTypeGrpInfoList.length; i++) { // 전택상품만 체크
        if (this.dlvDelivInfoList.dlvDelivTypeGrpInfoList[i].delivTypeCd === '02' && this.dlvDelivInfoList.dlvDelivTypeGrpInfoList[i].spckItemYn != 'Y') {
          slotCount++;
        }
      }

      for (let j=0; j < this.selectedSlotIdx.length; j++ ) {
        if ( this.selectedSlotIdx[j] == slotIdx ) {
          selectedSlot = true;
        }
      }

      if ( !selectedSlot ) {
        this.selectedSlotIdx[this.selectedSlotIdx.length] = slotIdx;
      }
      this.$emit('chkDelivSeqNo', 'dlvDelivChk', this.selectedSlotIdx.length, slotCount);
    },
  },
  destroyed() {
  },
  mounted() {
    // console.log(this.dlvDelivInfor);
    this.retrieveDlvDelivInfor();
  },
};
</script>
