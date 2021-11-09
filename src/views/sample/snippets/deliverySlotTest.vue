<template>
  <DeliverySlotTime v-if="delivSlotPolc !== null" :strInfoMap="delivSlotPolc" :slotId="slotId"/>
</template>
<script>
  import ApiUtils from '@/common/ApiUtils';
  import DeliverySlotTime from '@/components/order/DeliverySlotTime'; // 배송차수 선택
  import CookieUtils from '@/common/CookieUtils';
  export default {
    name: "DeliveryTimeBeforeLogin",
    metaInfo: {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '배송시간 < %s'
    },
    data() {
      return {
        delivSlotPolc: {
          frtmUseYn: 'Y',
          delivPolcId: '0700110101', // 배송정책ID
          seqsExpsrDys: '7', // 차수노출일수
        },
        delivPolcId: '0700110101',
        slotId: 'chk',
      };
    },
    components: {
      DeliverySlotTime
    },
    methods: {},
    mounted() {
    },
    updated() {
    },
  };
</script>
