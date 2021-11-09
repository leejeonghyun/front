<template>
  <!-- START : 리스트 아이템 -->
  <a href="#">
    <div class="bowing-item-details">
        <div class="details-cont">
          <strong class="bowing-date">2020.01.22(수)</strong>
          <strong class="product-name">일리윤 수분 모이스춰 스킨 200ml + 로션 200ml 기획 세트 + 로션 200ml 기획 세트</strong>
          <dl class="person">
            <dt>받는 사람</dt>
            <dd>조보아</dd>
            <dt>보낸 사람</dt>
            <dd>홍진영</dd>
          </dl>
          <!-- START : 결제 여부 -->
          <span class="state accept">결제완료</span>
          <!-- <span class="state accept">자동취소</span>
          <span class="state accept">주문취소</span> -->
          <!-- END : 결제 여부 -->
        </div>
    </div>
  </a>
  <!-- END : 리스트 아이템 -->
</template>
<script>
  export default {
    name: "BowingGift",
    data() {
      return {};
    },
  };
</script>
