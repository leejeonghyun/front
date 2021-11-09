<!--
views/od/
-->
<template>
  <div :class="[{'wrap-order' : true}, siteClass]">
    <!--  <div id="popupTimeSelect" class="wrap-full-popup h100" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupTimeSelect}"> // 풀팝업일 경우 -->
    <div class="header-popup">
      <strong>예약 배송 시간 선택</strong>
    </div>
    <div class="full-popup-body scroll-area has-fixed-bottom">
      <div class="inner-full-popup">
        <div class="select-reserve-time">
          <!-- START : 주문상품정보 -->
          <section class="section-area">
            <div class="sub-title">
              <h2>주문상품정보(<em v-bind:text="ordItemList.length"></em>)</h2>
            </div>
            <div class="sub-inner-box">
              <dl class="detail-list">
                <dt>주문번호</dt>
                <dd>{{ordDelivInfo.ordId}}</dd>
                <dt>주문일자</dt>
                <dd>{{ordDelivInfo.ordDtlDttm}}</dd>
                <!-- <dd>01/07(화)</dd> -->
                <dt>도착예정일</dt>
                <dd>{{toFormat(ordDelivInfo.delivReqDt, 'MM/DD')}}</dd>
                <!-- <dd>01/07(화) </dd> -->
                <dt>주문상품</dt>
                <dd>
                  <p class="list-dot" v-for="ordItemInfo in ordItemList" v-bind:key="ordItemInfo.ordItemSeqno">{{ordItemInfo.itemNm}} </p>
                </dd>
              </dl>
            </div>
          </section>
          <!-- END : 주문상품정보 -->
          <!-- START : 시간선택 -->
          <section class="section-area">
            <div class="sub-title">
              <h2>시간 선택</h2>
            </div>
            <div class="sub-inner-box">
              <p class="time-notice">예약 상품을 배송 받을 시간을 선택해 주세요.</p>
              <!-- START : 배송차수선택 -->
              <DeliverySlotTime :strInfoMap="ordDelivInfo"/>
              <!-- END : 배송차수선택 -->
            </div>
          </section>
          <!-- END : 시간선택 -->
          <!-- START : 배송지 정보 -->
          <section class="section-area">
            <div class="sub-title">
              <h2>배송지 정보</h2>
            </div>
            <div class="sub-inner-box">
              <dl class="detail-list">
                <dt>받는분</dt>
                <dd>{{ordDelivInfo.adrsNm}}</dd>
                <dt>주소</dt>
                <dd>{{ordDelivInfo.adrsStnmAddr}} {{ordDelivInfo.adrsstnmDtlAddr}}</dd>
                <dt>연락처</dt>
                <dd>{{ordDelivInfo.adrsTelNo}}</dd>
              </dl>
            </div>
          </section>
          <!-- END : 배송지 정보 -->
        </div>
      </div>
      <div class="popup-btns-fixed-bottom">
        <button class="btn-lg btn-bg lightgreen">저장</button>
      </div>
    </div>
    <button class="btn-layer-close"> <!-- // <button class="btn-layer-close" @click="popupAction"> // 풀팝업일 경우 -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import DeliverySlotTime from '@/components/order/DeliverySlotTime'; // 배송차수 선택
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  props: {
    strInfoMap: Object,
    ordId: String,
  },
  name: "PopupTimeSelect",
  data() {
    return {
      ordDelivInfo: null,
      ordItemList: null,
      delivSeqsList: null,
      delivDtList: null,
      delivDtTmList: null,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    DeliverySlotTime, // 배송차수선택
  },
  mixins: [LayerPopupMixin],
  methods: {
    // 풀팝업일 경우
    // popupAction() {
    //   this.$emit('popupEvent', 'popupTimeSelect');
    //   this.modalActiveEvent('popupTimeSelect');
    // },
    init() {
      const params = {};
      params.ordId = this.ordId; // TO-TO 수정
      const response = await ApiUtils.post("/fo/od/orddelivDlvdg/orddelivDigdgInfo", JSON.stringify(params));
      console.log(response.data.data);
      this.ordDelivInfo = response.data.data.rDelivSlotOrdInfo; // 예약주문정보, 예약주문배송지정보
      this.ordItemList = response.data.data.rOrdItemInqList; // 예약주문 상품정보
    },
    toFormat(dt, type) {
      return DateUtils.format(dt, type);
    }
  },
  mounted() {
    this.init();
  },
  updated() {
  }
};
</script>
