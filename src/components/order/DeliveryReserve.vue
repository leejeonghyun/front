<template>
  <section class="section-area" v-if="resvDelivInfoList !== null && resvDelivInfoList.ordId !== null">
    <div class="sub-title border" v-if="isTitle !='hide'"> <!-- 수정 START : 2020.02.27 아코디언 타이틀 노출여부 'hide'일 경우 숨김(다중배송에서 숨김) -->
      <h2><strong class="bg-line-brush">예약배송 <span class="required" aria-label="필수 항목">*</span></strong></h2>
    </div>
    <div class="sub-inner-box" v-for="(resvDelivTypeGrpInfo, idx) in resvDelivInfoList ? resvDelivInfoList.resvDelivTypeGrpInfoList ? resvDelivInfoList.resvDelivTypeGrpInfoList : [] : []" :key="idx">
      <div class="wrap-branch-title">
        <h2><strong class="branch">{{resvDelivTypeGrpInfo.resvDelivGrpNm}}</strong></h2>
      </div>
      <ul class="delivery-product" v-if="'Y' == resvDelivTypeGrpInfo.spckItemYn">
        <li v-for="(resvDelivItemSmmrInfo, idx1) in resvDelivTypeGrpInfo ? resvDelivTypeGrpInfo.resvDelivItemSmmrInfoList ? resvDelivTypeGrpInfo.resvDelivItemSmmrInfoList : [] : []" :key="idx1">
          <span class="product-name"><span class="name">심플리쿡) {{resvDelivItemSmmrInfo.repItemNm}}</span><span v-if="resvDelivItemSmmrInfo.otherItemCnt > 0"> 외 <span class="point">{{resvDelivItemSmmrInfo.otherItemCnt}}</span>개</span></span>
          <span class="date">{{resvDelivItemSmmrInfo.delivDt}}({{resvDelivItemSmmrInfo.delivDow}})도착예정</span>
        </li>
      </ul>
      <ul class="delivery-product" v-else>
        <li v-for="(resvDelivItemSmmrInfo, idx1) in resvDelivTypeGrpInfo ? resvDelivTypeGrpInfo.resvDelivItemSmmrInfoList ? resvDelivTypeGrpInfo.resvDelivItemSmmrInfoList : [] : []" :key="idx1">
          <span class="product-name"><span class="name">{{resvDelivItemSmmrInfo.repItemNm}}</span><span v-if="resvDelivItemSmmrInfo.otherItemCnt > 0"> 외 <span class="point">{{resvDelivItemSmmrInfo.otherItemCnt}}</span>개</span></span>
          <span class="date">{{resvDelivItemSmmrInfo.delivDt}}({{resvDelivItemSmmrInfo.delivDow}})도착예정</span>
        </li>
      </ul>
      <!-- 수정 : 2020.02.10 마크업 삭제 (셀렉트 삭제) -->
    </div>
  </section>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';

export default {
  name: "DeliveryReserve",
  props: {
    resvDelivInfor: Object,
    isTitle: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      resvDelivInfoList: null
    };
  },
  mixins: [],
  components: {
  },
  methods: {
    // 주문서예약배송안내조회
    async retrieveResvDelivInfor() {
      const iResvDelivInforInq = {
        ordId: this.resvDelivInfor.ordId,
        ordsDlvpSeqno: this.resvDelivInfor.ordsDlvpSeqno,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/reserv-delivery-info', iResvDelivInforInq);
      // console.log(response);
      this.resvDelivInfoList = response.data.data;
    }
  },
  destroyed() {
  },
  mounted() {
    // console.log(this.resvDelivInfor);
    this.retrieveResvDelivInfor();
  },
};
</script>
