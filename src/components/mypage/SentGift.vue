<template>
  <div class="wrap-received-gift">
    <strong class="received-days">2020.01.22(수)</strong>
    <span class="bowing-gift" v-if="this.bowingGift">조르기 선물</span>
    <!-- START : 리스트 아이템 -->
    <div class="gift-item-details">
      <strong class="product-name">일리윤 수분 모이스춰 스킨 200ml + 로션 200ml 기획 세트 </strong>
      <dl class="person">
        <dt>받는 사람</dt>
        <dd>조보아</dd>
        <dt>보낸 사람</dt>
        <dd>홍진영</dd>
      </dl>
      <span class="state accept">수락 대기</span>
      <!-- 취소일 경우 -->
      <!-- <span class="state cancel">자동취소</span> -->
      <div class="btn-area-resend">
          <button type="type" class="btn-resend">카카오톡 재전송</button>
          <button type="type" class="btn-resend">문자(SMS) 재전송</button>
      </div>
      <button type="button" class="btn-close-item"><span class="hidden">닫기</span></button>
    </div>
    <!-- END : 리스트 아이템 -->
    <!-- START : 리스트 아이템 -->
    <div class="gift-item-details">
      <strong class="product-name">CJ고메) 티라미스 케이크 외 3건 </strong>
      <dl class="person">
        <dt>받는 사람</dt>
        <dd>조보아</dd>
        <dt>보낸 사람</dt>
        <dd>홍진영</dd>
      </dl>
      <span class="state accept">수락 완료</span>
      <button type="button" class="btn-close-item"><span class="hidden">닫기</span></button>
    </div>
    <!-- END : 리스트 아이템 -->
    <!-- START : 리스트 아이템 -->
    <div class="gift-item-details">
      <strong class="product-name">CJ고메) 티라미스 케이크 외 3건 </strong>
      <dl class="person">
        <dt>받는 사람</dt>
        <dd>조보아</dd>
        <dt>보낸 사람</dt>
        <dd>홍진영</dd>
      </dl>
      <!-- <span class="state accept">선물수락</span> -->
      <!-- 취소일 경우 -->
      <span class="state cancel">자동취소</span>
      <button type="button" class="btn-close-item"><span class="hidden">닫기</span></button>
    </div>
    <!-- END : 리스트 아이템 -->
  </div>
</template>

<script>
export default {
  name: "SentGift",
  data() {
    return {
      bowingGift: false,
    };
  },
};
</script>
