<template>
  <div v-bind:class="[siteClass]">
    <div class="wrap-selectproduct">
      <!-- ■ ■ 02. 주문 정보 시작=========================================================-->
      <div class="info-top">
        <span class="date">{{dt.ordDt}}</span>
        <span class="num-order">주문번호 : {{dt.ordId}}</span>
      </div>
      <!-- ■ ■ 02. 주문 정보 종료=========================================================-->
    </div>
    <MbrInqrOrdItemListRowDeliv
      v-for="delivRow in dt.delivList"
      :key="delivRow.delivTypeCd"
      :delivRow="delivRow"
    ></MbrInqrOrdItemListRowDeliv>
  </div>
</template>

<script>
import store from '@/store/index';
import MbrInqrOrdItemListRowDeliv from './MbrInqrOrdItemListRowDeliv';
import CookieUtils from '@/common/CookieUtils';
export default {
  components: {
    MbrInqrOrdItemListRowDeliv,
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {},
  props: {
    dt: {
      type: Object,
    },
  },
  mounted() {

  }
};
</script>
