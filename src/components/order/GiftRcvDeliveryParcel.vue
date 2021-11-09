<template>
  <section class="section-area" v-if="dlvDelivInfoList !== null && dlvDelivInfoList.ordId !== null">
    <div class="sub-title border">
      <h2>택배배송 <span class="required" aria-label="필수 항목">*</span></h2>
    </div>
    <div class="sub-inner-box" v-for="(dlvDelivTypeGrpInfo, idx) in dlvDelivInfoList ? dlvDelivInfoList.giftDelivTypeGrpInfoList ? dlvDelivInfoList.giftDelivTypeGrpInfoList : [] : []" :key="idx">
      <div class="sub-title">
        <h2>{{dlvDelivTypeGrpInfo.dlvDelivGrpNm}} <span class="required" aria-label="필수 항목" v-if="'01' === dlvDelivTypeGrpInfo.itemSelrTypeCd">*</span></h2>
      </div>
      <ul class="delivery-product" v-if="'Y' !== dlvDelivTypeGrpInfo.spckItemYn">
        <li v-for="(dlvDelivItemSmmrInfo, idx1) in dlvDelivTypeGrpInfo ? dlvDelivTypeGrpInfo.dlvDelivItemSmmrInfoList ? dlvDelivTypeGrpInfo.dlvDelivItemSmmrInfoList : [] : []" :key="idx1">
          <span class="product-name"><span class="name">{{dlvDelivItemSmmrInfo.repItemNm}}</span><span v-if="dlvDelivItemSmmrInfo.otherItemCnt > 0"> 외 <span class="point">{{dlvDelivItemSmmrInfo.otherItemCnt}}</span>개</span></span>
        </li>
      </ul>
      <!-- START : 심플리쿡 -->
      <ul class="delivery-product" v-if="'Y' == dlvDelivTypeGrpInfo.spckItemYn">
        <li v-for="(dlvDelivItemSmmrInfo, idx1) in dlvDelivTypeGrpInfo ? dlvDelivTypeGrpInfo.dlvDelivItemSmmrInfoList ? dlvDelivTypeGrpInfo.dlvDelivItemSmmrInfoList : [] : []" :key="idx1">
            <span class="product-name"><span class="name">심플리쿡) {{dlvDelivItemSmmrInfo.repItemNm}}</span><span v-if="dlvDelivItemSmmrInfo.otherItemCnt > 0"> 외 <span class="point">{{dlvDelivItemSmmrInfo.otherItemCnt}}</span>개</span></span>
            <span class="date" v-if="isNotEmpty(dlvDelivItemSmmrInfo.delivDt)">{{dlvDelivItemSmmrInfo.delivDt}}({{dlvDelivItemSmmrInfo.delivDow}})도착예정</span>
        </li>
      </ul>
      <!-- END : 심플리쿡 -->
      <!-- START : GS fresh 택배 -->
      <DeliverySlotTime v-if="delivSlotPolc !== null && dlvDelivTypeGrpInfo.delivTypeCd !== '03'" :dlvDelivTypeGrpInfo="dlvDelivTypeGrpInfo" :giftYn="giftYn" :strInfoMap="delivSlotPolc" :slotIdx="String(idx)" :slotId="slotId" @chkDelivSeqNo="chkDelivSeqNo"/>
      <!-- END : GS fresh 택배 -->
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
      giftYn: 'Y',
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
        delivId: this.dlvDelivInfor.delivId,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/gift-delivery-info', iDlvDelivInforInq);
      this.dlvDelivInfoList = response.data.data;
      // console.log("this.dlvDelivInfoList : ", this.dlvDelivInfoList);
      for (let i=0; i < this.dlvDelivInfoList.giftDelivTypeGrpInfoList.length; i++) {
        const dg = this.dlvDelivInfoList.giftDelivTypeGrpInfoList[i];
        console.log(dg);
        if ('Y' !== dg.spckItemYn) {
          this.delivSlotPolc = {
            delivPolcId: dg.delivPolcId,
            seqsExpsrDys: dg.seqsExpsrDys,
            delivId: dg.delivId,
            ordId: this.dlvDelivInfoList.ordId,
          };
          break;
        }
      }
    },
    chkDelivSeqNo(seqNo) {
      const count = this.dlvDelivInfoList.giftDelivTypeGrpInfoList.length;
      this.$emit('chkDelivSeqNo', 'dlvDelivChk', seqNo, count);
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
