<!--
views/od/SC-FO-OD-GS-MS-012
-->
<template>
  <div class="wrap-cart" v-bind:class="[siteClass]">
    <SubDefaultHeader headerText="선물받기" />
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="gift-wrap">
        <!-- START : 선물 메시지 -->
        <section class="section-area">
          <h2 class="hidden">선물 메시지</h2>
          <GiftMessageCard />
        </section>
        <!-- END : 선물 메시지 -->
        <!-- START : 상품정보 -->
        <section class="section-area">
          <div class="sub-title">
            <h2>상품정보(4)</h2>
          </div>
          <h3 class="sub-title2">예약배송(2)</h3>
          <GiftProductList02 /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <!--  START : 실사용 제품목록 -->
          <!-- <div class="list-content">
            <ul class="cart-product-list selected-list">
              <GiftProductList />
            </ul>
          </div> -->
          <!--  END : 실사용 제품목록 -->
          <h3 class="sub-title2">당일배송(2)</h3>
          <GiftProductList02 /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <h3 class="sub-title2">새벽배송(2)</h3>
          <GiftProductList02 /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <h3 class="sub-title2">택배배송(2)</h3>
          <GiftProductList02 /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
        </section>
        <!-- END : 상품정보 -->
        <div class="section-area border">
          <p class="txt-time-desc"><strong class="point">2019.11.20(수) 17:00까지</strong> 배송정보를 입력하지 않으면 주문이 자동취소되어 선물을 받을 수 없습니다.</p>
        </div>
        <!-- START : 배송지 -->
        <GiftReceiveAddr01 /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
        <!-- <GiftReceiveAddr /> // 실사용 컴포넌트 -->
        <!-- END : 배송지 -->
        <!-- START : 당일배송 -->
        <DeliveryToday @popupEvent="popupAction" />
        <PopupSimplycook @popupEvent="popupAction" v-if="this.popup.popupSimplycook" /> <!-- 팝업 - 주문예정금액 변동안내 -->
        <PopupFreeTime @popupEvent="popupAction" v-if="this.popup.popupFreeTime" /> <!-- 팝업 - 프리타임 안내 -->
        <!-- END : 당일배송 -->
        <!-- START : 새벽배송 -->
        <DeliveryDawn />
        <!-- END : 새벽배송 -->
        <!-- START : 배송 요청사항 -->
        <DeliveryRequest />
        <!-- END : 배송 요청사항 -->
        <!-- START : 택배 배송 -->
        <DeliveryParcel />
        <!-- END : 택배 배송 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area mt0">
          <button type="button" class="btn-lg btn-bg lightgreen"><span>선물받기</span></button>
        </div>
        <!-- END :하단 버튼 -->
      </div>
    </main>
  </div>
</template>
<script>
/* START : 기획&디자인확인용 */
import GiftProductList02 from '@/components/_temp/GiftProductList02';
// import DeliveryParcel from '@/components/_temp/DeliveryParcel';
import GiftReceiveAddr01 from '@/components/_temp/GiftReceiveAddr01';
/* END : 기획&디자인확인용 */
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import GiftMessageCard from '@/components/cart/GiftMessageCard'; // 선물 메세지
import DeliveryToday from '@/components/order/DeliveryToday'; // 당일배송
import DeliveryDawn from '@/components/order/DeliveryDawn'; // 새벽배송
import DeliveryParcel from '@/components/order/DeliveryParcel'; // 택배배송
import DeliveryRequest from '@/components/order/DeliveryRequest'; // 배송 요청사항
// import GiftReceiveAddr from '@/components/cart/GiftReceiveAddr'; // 배송지
// import GiftDeliveryTime from '@/components/cart/GiftDeliveryTime'; // 배송시간
// import GiftProductList from '@/components/cart/GiftProductList'; // 상품 목록
import PopupSimplycook from '@/views/od/PopupSimpleCookOrdSchedAmt'; // 팝업 - 심플리쿡 주문예정 금액
import PopupFreeTime from '@/views/od/PopupFreeTimeInfo'; // 팝업 - 프리타임 안내
/* END : 실 사용 컴포넌트 */
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "GiftReceive2",
  data() {
    return {
      popup: { // 팝업
        open: false,
        popupSimplycook: false, // 심플리쿡 주문예정 금액
        popupFreeTime: false, // 프리타임 안내
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물 받기 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '선물받기',
      },
    ],
  },
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
    SubDefaultHeader,
    GiftMessageCard,
    DeliveryToday,
    DeliveryDawn,
    DeliveryRequest,
    DeliveryParcel,
    PopupSimplycook, // 팝업 - 심플리쿡 주문예정금액
    PopupFreeTime, // 팝업 - 프리타임 안내
    // GiftProductList, // 실사용 컴포넌트
    // GiftReceiveAddr, // 실사용 컴포넌트
    // GiftDeliveryTime, // 실사용 컴포넌트
    GiftProductList02, // 기획&디자인 확인용
    GiftReceiveAddr01, // 기획&디자인 확인용
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
