<template>
  <div class="wrap-selectproduct">
    <div class="info-top">
      <span class="date">{{ordItemData.ordDttm}}</span>
      <span class="num-order">주문번호 : {{ordItemData.ordId}}</span>
    </div>
    <MfMbrInqrOrdItemListRowDeliv
      v-for="(list, index) in ordItemData.mfOrdMallList"
      :key="index"
      :ordItemDtl="list"
      :ordItemCheck="ordItemCheck"
      :ordItemData="ordItemData"
      :ordId="ordItemData.ordId"
    />
  </div>
</template>

<script>
import MfMbrInqrOrdItemListRowDeliv from './MfMbrInqrOrdItemListRowDeliv';
export default {
  components: {
    MfMbrInqrOrdItemListRowDeliv,
  },
  data() {
    return {};
  },
  props: {
    ordItemData: Object,
    ordItemCheck: Object,
  },
  methods: {},
  mounted() {},
};
</script>

<style>
</style>
