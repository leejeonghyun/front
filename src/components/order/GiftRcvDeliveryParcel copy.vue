<template>
  <section class="section-area" v-if="dlvDelivInfoList !== null && dlvDelivInfoList.ordId !== null">
    <!-- <div class="sub-title border">
      <h2>택배배송 <span class="required" aria-label="필수 항목">*</span></h2>
    </div> -->
    <div class="sub-inner-box" v-for="(dlvDelivTypeGrpInfo, idx) in dlvDelivInfoList ? dlvDelivInfoList.giftDelivTypeGrpInfoList ? dlvDelivInfoList.giftDelivTypeGrpInfoList : [] : []" :key="idx">
      <div class="sub-title">
        <h2>{{dlvDelivTypeGrpInfo.dlvDelivGrpNm}} <span class="required" aria-label="필수 항목" v-if="'01' === dlvDelivTypeGrpInfo.itemSelrTypeCd">*</span></h2>
      </div>
      <!-- START : 심플리쿡 -->
      <ul class="delivery-product" v-if="'Y' == dlvDelivTypeGrpInfo.spckItemYn">
        <li v-for="(dlvDelivItemSmmrInfo, idx1) in dlvDelivTypeGrpInfo ? dlvDelivTypeGrpInfo.dlvDelivItemSmmrInfoList ? dlvDelivTypeGrpInfo.dlvDelivItemSmmrInfoList : [] : []" :key="idx1">
            <span class="product-name"><span class="name">심플리쿡) {{dlvDelivItemSmmrInfo.repItemNm}}</span><span v-if="dlvDelivItemSmmrInfo.otherItemCnt > 0"> 외 <span class="point">{{dlvDelivItemSmmrInfo.otherItemCnt}}</span>개</span></span>
            <span class="date">{{dlvDelivItemSmmrInfo.delivDt}}({{dlvDelivItemSmmrInfo.delivDow}})도착예정</span>
        </li>
      </ul>
      <!-- END : 심플리쿡 -->
      <ul class="delivery-product" v-else>
        <li v-for="(dlvDelivItemSmmrInfo, idx1) in dlvDelivTypeGrpInfo ? dlvDelivTypeGrpInfo.dlvDelivItemSmmrInfoList ? dlvDelivTypeGrpInfo.dlvDelivItemSmmrInfoList : [] : []" :key="idx1">
          <span class="product-name"><span class="name">{{dlvDelivItemSmmrInfo.repItemNm}}</span><span v-if="dlvDelivItemSmmrInfo.otherItemCnt > 0"> 외 <span class="point">{{dlvDelivItemSmmrInfo.otherItemCnt}}</span>개</span></span>
        </li>
      </ul>
      <!-- START : GS fresh 택배 -->
      <GiftDeliverySlotTime v-if="delivSlotPolc !== null" :strInfoMap="delivSlotPolc" /> <!-- 배송차수 선택 개발시 아래 테이블 영역 삭제. v-if true로 변경 -->
      <!-- END : GS fresh 택배 -->
    </div>
  </section>
</template>

<script>
import GiftDeliverySlotTime from '@/components/order/GiftDeliverySlotTime'; // 배송차수 선택
import ApiUtils from '@/common/ApiUtils';

export default {
  props: {
    ordId: String,
    dlvDelivInfor: Object,
  },
  name: "DeliveryParcel",
  data() {
    return {
      dlvDelivInfoList: null,
      delivSlotPolc: null,
    };
  },
  mixins: [],
  components: {
    GiftDeliverySlotTime, // 배송차수 선택
  },
  methods: {
    // 주문택배배송안내조회
    async retrieveDlvDelivInfor() {
      const iDlvDelivInforInq = {
        ordId: this.dlvDelivInfor.ordId,
        delivId: this.dlvDelivInfor.delivId,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/gift-delivery-info', iDlvDelivInforInq);
      this.dlvDelivInfoList = response.data.data;
      // console.log("this.dlvDelivInfoList : ", this.dlvDelivInfoList);
      if (0 < this.dlvDelivInfoList.giftDelivTypeGrpInfoList.length) {
        const dg = this.dlvDelivInfoList.giftDelivTypeGrpInfoList[i];
        this.delivSlotPolc = {
          delivPolcId: dg.delivPolcId,
          seqsExpsrDys: dg.seqsExpsrDys,
          delivId: dg.delivId,
          ordId: this.dlvDelivInfoList.ordId,
        };
      }
    },
  },
  destroyed() {
  },
  mounted() {
    // console.log("dlvDelivInfor : ", this.dlvDelivInfor);
    this.retrieveDlvDelivInfor();
  },
};
</script>
