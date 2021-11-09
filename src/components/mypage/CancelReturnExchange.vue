<template>
  <div class="order-item">
    <!-- START : 주문취소 -->
    <div class="shipping-step">
      <div class="box-details">
        <p class="tit-order"><span class="badge">당일</span>빙그레 따옴 사과주스 730ML 외 4개</p>
        <div class="schedule">
          <span :class="[type]">12.04(수)19:00~22:00 상품수거예정</span>
        </div>
        <div class="payment">
          <span>결제금액 : <em class="num-price">50,000</em>원</span>
          <button type="button" class="btn-border btn-tiny">주문내역삭제</button>
        </div>
      </div>
    </div>
    <!-- END : 주문취소 -->
    <!-- START : 부분취소 -->
    <div class="shipping-step">
      <div class="box-details">
        <div class="wrap-tit-order">
          <p class="tit-order"><span class="badge">당일</span>빙그레 따옴 사과주스 730ML 외 4개</p>
        </div>
        <div class="schedule">
          <span :class="[type]">부분취소</span>
        </div>
        <div class="payment">
          <span>결제금액 : <em class="num-price">50,000</em>원</span>
          <button type="button" class="btn-border btn-tiny">주문내역삭제</button>
        </div>
      </div>
    </div>
    <!-- END : 부분취소 -->
    <!-- START : 교환 -->
    <div class="shipping-step">
      <div class="box-details">
        <p class="tit-order"><span class="badge">당일</span>빙그레 따옴 사과주스 730ML 외 4개</p>
        <div class="schedule">
          <span :class="[type]">교환</span>
        </div>
        <div class="payment">
          <span>결제금액 : <em class="num-price">50,000</em>원</span>
        </div>
      </div>
      <div class="btns-step">
        <button type="button">교환신청취소</button>
        <!-- 교환 완료시 -->
        <!-- <button type="button">1:1 문의하기</button> -->
      </div>
    </div>
    <!-- END : 교환 -->
    <!-- START : 반품 -->
    <div class="shipping-step">
      <div class="box-details">
        <p class="tit-order"><span class="badge">당일</span>빙그레 따옴 사과주스 730ML 외 4개</p>
        <div class="schedule">
          <span :class="[type]">상품 확인 중(환불 대기)</span>
        </div>
        <div class="payment">
          <span>환불예정금액 : <em class="num-price">50,000</em>원</span>
        </div>
      </div>
      <div class="btns-step">
        <!-- <button type="button">반품신청취소</button> -->
        <!-- 반품 완료시 -->
        <button type="button">1:1 문의하기</button>
      </div>
    </div>
    <!-- END : 반품 -->
  </div>
</template>
<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  export default {
    name: "CancelReturnExchange",
    data() {
      return {
        popup: { // 팝업
          open: false,
          popupMenuShow: false, // 픽업 선택 버튼
          popupPickupShop: false, // 픽업매장
        },
        isShipping: false, // 배송중
      };
    },
    props: ['type'],
    mixins: [LayerPopupMixin],
    components: {},
    methods: {
      popupRealTimeActive() {
        this.$emit('popupEvent', 'popupRealTime');
      },
      popupSatisfactionActive() {
        this.$emit('popupEvent', 'popupSatisfaction');
      },
      popupTrackingActive() {
        this.$emit('popupEvent', 'popupTrackingShipping');
      },
      popupDeliveryListActive() {
        this.$emit('popupEvent', 'popupDeliveryList');
      },
      popupShowmenuAction() {
        this.popup.popupMenuShow = !this.popup.popupMenuShow;
      },
      popupShopAction() {
        this.$emit('popupEvent', 'popupRecallShop');
        this.popup.popupMenuShow = false;
      },
    },
    mounted() {
    },
  };
</script>
