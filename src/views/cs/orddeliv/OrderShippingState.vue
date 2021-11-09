<template>
  <!-- 4월 수정 -->
  <div class="order-item">
    <!-- 전체 케이스 -->
    <div v-if="allCancel === false" :class="{allCancle: allCancel === true}" class="shipping-step">
      <div class="box-details">
        <!--
          START: 상품명 및 브랜치 명
         -->
        <!-- 일반 케이스 -->
        <p class="tit-order"><span class="badge">당일</span>빙그레 따옴 사과주스 730ML 외 4개</p>
        <div>
          <span class="branch">GS fresh전국택배</span>
          <span class="destination">홈</span>
        </div>
        <!-- 해외직구 일때 class overseas 추가 -->
        <p class="tit-order"><span class="badge">해외직구</span>빙그레 따옴 사과주스 730ML 외 4개</p>
        <div>
          <span class="branch overseas">GS fresh전국택배</span>
          <span class="destination">홈</span>
        </div>
        <!--
          END: 상품명 및 브랜치 명
         -->
        <!--
          START: 배송 스텝
         -->
        <!-- 일반케이스 -->
        <ul class="step-state">
          <li><span class="icon_payment_complete current">결제완료</span></li>
          <li><span class="icon_ready">상품준비중</span></li>
          <li>
            <span class="icon_shipping current">배송중</span>
            <a href="#" class="real-time" aria-label="실시간 배송 위치 팝업 활성화" aria-haspopup="dialog" @click="popupRealTimeActive">실시간 배송 위치</a>
          </li>
          <li>
            <span class="icon_shipping_complete current">배송완료</span>
            <a href="#" class="real-time" aria-label="배송만족도조사 팝업 활성화" aria-haspopup="dialog" @click="popupSatisfactionActive">배송만족도조사</a>
          </li>
        </ul>
        <!-- // 일반케이스 -->
        <!-- 픽업 점포 -->
        <ul class="step-state">
          <li><span class="icon_payment_complete current">결제완료</span></li>
          <li><span class="icon_ready">상품준비중</span></li>
          <li><span class="icon_shipping">배송중</span></li>
          <li><span class="icon_shipping_complete">배송완료</span></li>
        </ul>
        <ul class="step-state">
          <li><span class="icon_payment_complete current">결제완료</span></li>
          <li><span class="icon_ready">상품준비중</span></li>
          <li><span class="icon_product_confirm">상품보관중</span></li>
          <li><span class="icon_shipping_complete">수령완료</span></li>
        </ul>
        <!-- //픽업 점포 -->
        <!-- 해외배송 -->
        <ul class="step-state">
          <li><span class="icon_payment_complete">결제<br>완료</span></li>
          <li><span class="icon_ready">상품<br>준비중</span></li>
          <li><span class="icon_delivery">항공<br>운송</span></li>
          <li><span class="icon_entry_complete">통관<br>완료</span></li>
          <li><span class="icon_shipping">국내<br>배송중</span></li>
          <li><span class="icon_shipping_complete current">배송<br>완료</span></li>
        </ul>
        <!-- // 해외배송 -->
        <!--
          END: 배송 스텝
         -->
        <!--
          START: 배송 상태 확인 및 운송장 확인 영역
         -->
        <!-- 일반 텍스트 케이스 -->
        <div class="schedule">
          <span>12/05(목) 도착예정</span>
        </div>
        <!-- // 일반 텍스트 케이스 -->
        <!-- 운송장 확인 케이스 -->
        <div class="schedule">
          <!-- 배송중, 배송 완료 일 경우만 노출 -->
          <a href="#" aria-label="배송조회 팝업 활성화" aria-haspopup="dialog" @click="popupTrackingActive">CJ대한통운 2016523695</a>
        </div>
        <!-- // 운송장 확인 케이스 -->
        <!--
          END: 배송 상태 확인 및 운송장 확인 영역
         -->
        <div class="payment">
          <!-- 4월 수정 : 삭제 -->
          <!-- <span>결제금액 : <em class="num-price">50,000</em>원</span>
          <button type="button" class="btn-border btn-tiny">전체취소</button> -->
          <button type="button" class="btn-border btn-tiny">부분취소</button>
        </div>
      </div>
      <!-- 4월 수정 : 삭제 -->
      <!-- 픽업 센터/점포 추가 : 점포일때 픽업지점변경 비노출 -->
      <!-- <div class="btns-step">
        <button type="button">픽업시간변경</button>
        <button type="button" class="btn-pickup" aria-label="픽업 매장 팝업 활성화" aria-haspopup="dialog" @click="popupShowmenuAction">픽업지점변경</button>
        <ul class="btn-select-pickup" v-show="this.popup.popupMenuShow">
          <li><button type="button" class="btn-border btn" aria-label="픽업 매장 팝업 활성화" aria-haspopup="dialog" @click="popupShopAction">GS THE FRESH</button></li>
          <li><button type="button" class="btn-border btn" @blur="focusOutAction">GS25/GS파크24</button></li>
        </ul>
      </div> -->
      <!-- //픽업 센터 추가 -->
      <!--
        START: 하단 버튼 영역
      -->
      <!-- 결제완료시 노출 -->
      <div class="btns-step">
        <button type="button">배송시간 변경</button>
        <button type="button" aria-label="배송지 변경 팝업 활성화" aria-haspopup="dialog" @click="popupDeliveryListActive">배송지변경</button>
        <!-- 배송완료 7일 후 단독 노출 -->
        <button type="button">상품평작성</button>
      </div>
      <!-- 배송완료시 노출 -->
      <div class="btns-step">
        <button type="button">반품신청</button>
        <button type="button">교환신청</button>
        <!-- 배송완료 7일 후 노출 -->
        <button type="button">상품평작성</button>
      </div>
      <!--
        END: 하단 버튼 영역
      -->
      <!--
        START: 부분 반품, 교환, 취소 영역
      -->
      <!-- 부분 반품 -->
      <div class="partical-cancellation">
        <p class="breakdown">
          11.22 부분 반품
          <em class="em-txt">환불완료</em>
          <span class="minus">- 13,600원</span>
        </p>
        <p><a href="#" >산지직송 충주 레드향 15kg(5~8입/박스) 외 1건</a></p>
      </div>
      <!-- // 부분 반품 -->
      <!-- 부분 교환 -->
      <div class="partical-cancellation">
        <p class="breakdown">
          11.22 부분 교환
          <em class="em-txt">교환신청</em>
        </p>
        <p><a href="#" >산지직송 충주 레드향 15kg(5~8입/박스) 외 1건</a></p>
      </div>
      <!-- // 부분 교환 -->
      <!-- 부분취소 -->
      <div class="partical-cancellation">
        <p class="breakdown">
          11.22 부분 취소
          <span class="minus">- 13,600원</span>
        </p>
        <p><a href="#" >산지직송 충주 레드향 15kg(5~8입/박스) 외 1건</a></p>
      </div>
      <!-- //부분취소 -->
      <!--
        END: 부분 반품, 교환, 취소 영역
      -->
      <!-- 4월 수정 : 삭제 -->
      <!-- 합배송 : 결제완료 -->
      <!-- <div class="all-together">
        <div class="order-shipping-item">
          <a href="#" class="order-number">
            <strong class="shipping-code">주문번호 : 214052812AKA</strong>
          </a>
        </div>
        <div class="all-breakdown">
          <div class="amount">
            <p class="breakdown"><span class="badge">합배송</span>산지직송 충주 레드향 15kg(5~8입/박스) 외 1건</p>
            <div class="payment">
              <span>결제금액 : <em class="num-price">50,000</em>원</span> -->
              <!-- 1. 결제완료 일 경우 노출 -->
              <!-- <button type="button" class="btn-border btn-tiny">전체취소</button>
              <button type="button" class="btn-border btn-tiny">부분취소</button> -->
              <!-- 4. 배송완료 일 경우 노출 -->
              <!-- <button class="btn-border btn-cancel">주문내역삭제</button> -->
            <!-- </div>
          </div>
        </div> -->
        <!-- 3. 배송중 일 경우 노출 -->
        <!-- <div class="btns-step">
          <button type="button">반품신청</button>
          <button type="button">교환신청</button> -->
          <!-- 4. 배송완료 일 경우 노출 -->
          <!-- <button type="button">상품평작성</button> -->
        <!-- </div>
      </div> -->
      <!-- //합배송 -->
    </div>
    <!-- 전체취소 -->
    <div v-else :class="{allCancle: allCancel === true}" class="shipping-step">
      <div class="box-details">
        <p class="tit-order"><span class="badge">당일</span>빙그레 따옴 사과주스 730ML 외 4개</p>
      </div>
      <div class="all-cancel">
        <a href="#"><span>01.05 전체취소</span></a>
      </div>
    </div>
    <!-- // 4월 수정 -->
  </div>
</template>
<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  export default {
    name: "OrderShippingState",
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
    props: ['allCancel'],
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
        // this.popup.popupMenuShow = false;
      },
      focusOutAction() {
        this.popup.popupMenuShow = false;
      },
    },
    mounted() {
    },
  };
</script>
