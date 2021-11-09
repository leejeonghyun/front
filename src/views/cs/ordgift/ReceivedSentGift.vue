<template>
  <!-- START : 리스트 아이템 -->
  <div class="gift-item-details" v-bind:class="[siteClass]">
    <gs-link to="/cs/rcvGiftDtl">받은선물상세</gs-link>
    <gs-link to="/cs/trnsGiftDtl">보낸선물상세</gs-link>
    <a href="#">
      <div class="details-cont">
        <strong class="product-name">일리윤 수분 모이스춰 스킨 200ml + 로션 200ml 기획 세트 </strong>
        <div class="person-state">
          <dl class="person">
            <dt>받는 사람</dt>
            <dd>조보아</dd>
            <dt>보낸 사람</dt>
            <dd>홍진영</dd>
          </dl>
          <!-- START : 받은 선물 -->
          <span class="state accept" v-if="!this.accept">선물수락</span>
          <!-- <span class="state accept" v-if="!this.accept">인증필요</span> -->
          <!-- <span class="state cancel v-if="!this.accept">주문취소</span> -->
          <!-- <span class="state cancel v-if="!this.accept">자동취소</span> -->
          <!-- END : 받은 선물 -->
          <!-- START : 보낸 선물 -->
          <span class="state accept" v-if="this.accept">수락대기</span>
          <!-- <span class="state accept v-if="!this.accept">수락완료</span> -->
          <!-- <span class="state cancel v-if="!this.accept">주문취소</span> -->
          <!-- <span class="state cancel v-if="!this.accept">자동취소</span> -->
          <!-- END : 보낸 선물 -->
        </div>
      </div>
      <!-- START : 수락 대기 일 경우 노출 -->
      <div class="btn-area-resend" v-if="this.accept">
        <button type="type" class="btn-resend">카카오톡 재전송</button>
        <button type="type" class="btn-resend">문자(SMS) 재전송</button>
      </div>
      <!-- END : 수락 대기 일 경우 노출 -->
      <button type="button" class="btn-close-item"><span class="hidden">닫기</span></button>
    </a>
  </div>
  <!-- END : 리스트 아이템 -->
</template>

<script>
// import PopupRcv from '@/views/cs/RcvGiftDtl'; // 팝업 - 받은선물 상세
// import PopupTrans from '@/views/cs/TrnsGiftDtl'; // 팝업 - 보낸선물 상세
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "ReceivedSentGift",
  props: ['accept'],
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    // PopupRcv,
    // PopupTrans,
  },
  methods: {

  },
  mounted() {

  }
};
</script>
