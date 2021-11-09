<template>
  <section class="section-area">
    <div class="sub-title border">
      <h2>방문 예정 시간 <span class="required" aria-label="필수 항목">*</span></h2>
    </div>
    <div class="sub-inner-box">
      <div class="inner">
        <!-- START : 배송차수선택 -->
        <template v-if="strInfoMap.itemRcptTypeCd === 'S' || strInfoMap.itemRcptTypeCd === 'T'">
          <DeliverySlotTime v-if="delivSlotPolc !== null" :strInfoMap="delivSlotPolc" :slotId="slotId" :dlvDelivTypeGrpInfo="todayDelivInfoList" :slotIdx="String(1)" :spckIncldYn="spckItemIncldYn" :apchIncldYn="apchIncldYn" @chkDelivSeqNo="chkDelivSeqNo"/>
        </template>
        <template v-if="strInfoMap.itemRcptTypeCd === 'B'">
          <Box25DeliverySlotTime v-if="delivSlotPolc !== null" :strInfoMap="delivSlotPolc" :slotId="slotId" :dlvDelivTypeGrpInfo="todayDelivInfoList" :slotIdx="String(1)" :spckIncldYn="spckItemIncldYn" :apchIncldYn="apchIncldYn" @chkDelivSeqNo="chkDelivSeqNo"/>
        </template>
        <!-- END : 배송차수선택 -->
        <!--
        <ul class="txt-info-list">
          <li class="ico-alert2">GS THE FRESH 픽업이 가능한 시간은 22:00 입니다.</li>
          <li class="ico-alert2">당일 미수령시 보관상의 사유로 환불이 불가 하오니 선택하신 시간 이후 빠르게 수령해 주시기 바랍니다. </li>
          <li class="ico-alert2">단, 당일수령 불가시 해당 수퍼로 연락 주시기 바랍니다.</li>
          <li class="ico-alert2">주문완료 후 발송해 드리는 SMS 문자 확인 후 상품을 전달 드리니, 수령 전까지 SMS문자를 보관해 주시기 바랍니다.  </li>
          <li class="ico-alert2">GS THE FRESH는 의무 휴업 시 점포 픽업 서비스는 불가합니다.</li>
        </ul>
        -->
        <ul class="txt-info-list">
          <li class="ico-alert2">법정 공휴일(추석, 설날)의 경우 픽업 서비스 사용은 불가합니다.</li>
          <li class="ico-alert2">기타 문의사항은 1661-2562 통해 문의 바랍니다.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import DeliverySlotTime from '@/components/order/DeliverySlotTime'; // 배송차수 선택
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import Box25DeliverySlotTime from "./Box25DeliverySlotTime";
import OrderMsg from "./OrderMsg";
export default {
  props: {
    strInfoMap: Object,
    pickUpInfor: Object,
  },
  name: "DeliveryTime",
  data() {
    return {
      disabled: true,
      todayDelivInfoList: {},
      delivSlotPolc: null,
      slotId: 'pickupDelivChk',
      spckItemIncldYn: 'N',
      apchIncldYn: "N",
      clsTodaySlotTime: false,
      // todayDelivInfor: null,
    };
  },
  components: {
     DeliverySlotTime, // 배송차수 선택
     Box25DeliverySlotTime, // 배송차수 선택
  },
  methods: {
    async retrieveTodayDelivInfor() {
      const iTodayDelivInforInq = {
        ordId: this.pickUpInfor.ordId,
        ordsDlvpSeqno: this.pickUpInfor.ordsDlvpSeqno,
        delivPolcId: this.strInfoMap.delivPolcId
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/today-delivery-info', iTodayDelivInforInq);
      this.todayDelivInfoList = response.data.data;
      this.delivSlotPolc = {
        delivPolcId: this.strInfoMap.itemRcptTypeCd === 'S' ? this.todayDelivInfoList.delivPolcId : this.strInfoMap.delivPolcId,
        seqsExpsrDys: this.todayDelivInfoList.seqsExpsrDys,
        ordId: this.pickUpInfor.ordId,
        ordsDelivSeqno: this.todayDelivInfoList.ordsDelivSeqno,
        ordsDlvpSeqno: this.todayDelivInfoList.ordsDlvpSeqno,
        frtmUseYn: 'N',
        adrsZipcd: this.strInfoMap.pkuppZipcd,
        adrsBaseAddr: this.strInfoMap.pkuppAddr,
        adrsDtlAddr: this.strInfoMap.pkuppDtlAddr,
        adrsStnmBaseAddr: this.strInfoMap.pkuppStnmAddr,
        adrsStnmDtlAddr: this.strInfoMap.pkuppStnmDtlAddr,
        pkuppId: this.strInfoMap.pkuppId,
        itemRcptTypeCd: this.strInfoMap.itemRcptTypeCd,
      };
      console.log("[delivSlotPolc]->", this.delivSlotPolc);
      if (this.todayDelivInfoList) {
        // 심플리쿡, 임박/하루판매/당일배송 카테고리 상품 동시 존재여부 체크
        if (this.todayDelivInfoList.spckItemIncldYn === "Y" && (this.todayDelivInfoList.apchItemIncldYn === "Y" || this.todayDelivInfoList.todayItemIncldYn === "Y" || this.todayDelivInfoList.ctgItemIncldYn === "Y")) {
          await this.$gsdialog.alert(OrderMsg.deliveryTodayItemChk, {html: true});
          await this.$router.push({name: 'theBasket'});
        }
        if (this.isNotEmpty(this.todayDelivInfoList.apchRepItemNm) || this.isNotEmpty(this.todayDelivInfoList.todayRepItemNm) || this.isNotEmpty(this.todayDelivInfoList.ctgRepItemNm)) {
          this.apchIncldYn = "Y";
        }
        if (this.isNotEmpty(this.todayDelivInfoList.spckRepItemNm)) {
          this.spckItemIncldYn = "Y";
          this.ordsSpckItemIncld = true;
          // this.spckDisable(this.ordsSpckItemIncld);
        }
      }
    },
    chkDelivSeqNo(seqno) {
      this.$emit('chkDelivSeqNo', 'pickupDelivChk', seqno, 0);
    },
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
  },
  destroyed() {
  },
  watch: {
    strInfoMap: {
      handler() {
        this.retrieveTodayDelivInfor();
      },
    },
  },
  mounted() {
    this.retrieveTodayDelivInfor();
  },
  updated() {
  },
};
</script>
