<!--
views/od/SC-FO-OD-GS-MS-015
-->
<template>
  <div class="wrap-cart" v-bind:class="[siteClass]">
    <SubDefaultHeader headerText="선물해주세요~!" prevType="true" />
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="gift-wrap">
        <!-- START : 선물 메시지 -->
        <section class="section-area">
          <div class="sub-title">
            <h2>홍길동님의 메시지</h2>
          </div>
          <GiftMessageCard />
        </section>
        <!-- END : 선물 메시지 -->
        <div class="section-area border">
          <p class="txt-time-desc"><strong>2019.11.20(수) 17:00까지</strong> 선물해 주지 않으면 주문이 자동취소처리 됩니다.</p>
        </div>
        <!-- START : 상품정보 -->
        <section class="section-area">
          <div class="sub-title">
            <h2>상품정보(4)</h2>
          </div>
          <h3 class="sub-title2">예약배송(2)</h3>
          <GiftProductList02 @popupEvent="popupAction" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <h3 class="sub-title2">당일배송(2)</h3>
          <GiftProductList02 @popupEvent="popupAction" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <!--  START : 실사용 제품목록 -->
          <!-- <div class="list-content">
            <ul class="cart-product-list">
              <CartProductList @popupEvent="popupAction" /> // 실사용 컴포넌트 : 제품목록 (장바구니 공통)
            </ul>
          </div> -->
          <!--  END : 실사용 제품목록 -->
          <h3 class="sub-title2">새벽배송(2)</h3>
          <GiftProductList02 @popupEvent="popupAction" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <h3 class="sub-title2">택배배송(2)</h3>
          <GiftProductList02 @popupEvent="popupAction" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
        </section>
        <!-- END : 상품정보 -->
        <!-- START : 상품가격 -->
        <section class="section-area">
          <GiftTotalPrice02 @popupEvent="popupAction" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <!-- <CartTotalPrice /> // 실사용 컴포넌트 -->
          <PopupDeliveryPrice @popupEvent="popupAction" v-if="this.popup.popupDeliveryPrice" /> <!-- 팝업 - 배송비 안내 -->
        </section>
        <!-- END : 상품가격 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area bg">
          <p class="ico-alert2">상기 금액은 주문 결제 단계에서 장바구니 쿠폰, 카드할인 등 할인 수단 적용 시 결제 금액이 달라질 수 있습니다.</p>
          <button type="button" class="btn-lg btn-bg lightgreen"><span>선물하기</span></button>
        </div>
        <!-- END :하단 버튼 -->
      </div>
    </main>
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import GiftMessageCard from '@/components/cart/GiftMessageCard'; // 메시지
// import CartProductList from '@/components/cart/CartProductList'; // 제품 목록
// import CartTotalPrice from '@/components/cart/CartTotalPrice'; // 총 가격
import PopupDeliveryPrice from '@/views/od/PopupDeliveryPrice'; // 팝업 - 배송비 안내
/* END : 실 사용 컴포넌트 */
/* START : 기획&디자인확인용 */
import GiftProductList02 from '@/components/_temp/GiftProductList02';
import GiftTotalPrice02 from '@/components/_temp/GiftTotalPrice02';
/* END : 기획&디자인확인용 */
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import AccordionMixin from '@/mixins/AccordionMixin';
import Tracker from '@/common/Tracker';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "GiftRequest2",
  data() {
    return {
      popup: { // 팝업
        open: false,
        popupDeliveryPrice: false,
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물해주세요~! < %s',
    meta: [
      {
        property: 'aa:page',
        content: '선물해주세요~!',
      },
    ],
  },
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
    SubDefaultHeader, // 헤더
    GiftMessageCard, // 메시지 카드
    PopupDeliveryPrice, // 배송비 안내
    // CartProductList, // 제품 리스트
    // CartTotalPrice, // 총 가격
    GiftProductList02, // 기획&디자인 확인용
    GiftTotalPrice02, // 기획&디자인 확인용
  },
  methods: {
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
  },
  mounted() {

  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++ ) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
};
</script>
<style lang="scss">
</style>
