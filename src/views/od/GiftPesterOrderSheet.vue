<!--
views/od/SC-FO-OD-GS-MS-016
-->
<template>
  <div class="wrap-cart" v-bind:class="[siteClass]">
    <SubDefaultHeader headerText="(조르기)선물하기" />
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="gift-wrap">
        <!-- START : 주문자 -->
        <GiftSendInfo01 /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
        <!-- <GiftSendInfo /> // 실사용 컴포넌트 -->
        <!-- END : 주문자 -->
        <!-- START : 배송지 -->
        <GiftReceiveAddr03 /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
        <!-- <GiftReceiveAddr /> // 실사용 컴포넌트 -->
        <!-- END : 배송지 -->
        <!-- START : 선물 메시지 -->
        <GiftMessageWrite :selectType="selectType" messageTitle="선물 메시지" />
        <div class="send-caution sub-inner-box">
          <p class="ico-alert2">카카오톡 메시지로 기본 전달됩니다.<br>카카오톡 메시지 전달이 안되는 경우, 문자(SMS)로 전송됩니다.</p>
          <p class="ico-alert2">문자(SMS)는 카드 이미지가 포함되지 않습니다.</p>
        </div>
        <!-- END : 선물 메시지 -->
        <!-- START : 상품정보 -->
        <section class="section-area">
          <div class="sub-title">
            <h2>상품정보(4)</h2>
          </div>
          <h3 class="sub-title2">
            <span class="inp-chk bg">
              <input type="checkbox" name="" id="category01" value=""  checked="checked">
              <label for="category01">예약배송(2)</label>
            </span>
          </h3>
          <GiftProductList05 @popupEvent="popupAction" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <h3 class="sub-title2">
            <span class="inp-chk bg">
              <input type="checkbox" name="" id="category02" value=""  checked="checked">
              <label for="category02">당일배송(2)</label>
            </span>
          </h3>
          <GiftProductList01 @popupEvent="popupAction" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <!--  START : 실사용 제품목록 -->
          <!-- <div class="list-content">
            <div class="wrap-border">
              <ul class="cart-product-list">
                <CartProductList @popupEvent="popupAction" /> // 실사용 컴포넌트 : 제품목록
              </ul>
            </div>
          </div> -->
          <!--  END : 실사용 제품목록 -->
          <h3 class="sub-title2">
            <span class="inp-chk bg">
              <input type="checkbox" name="" id="category03" value=""  checked="checked">
              <label for="category03">새벽배송(2)</label>
            </span>
          </h3>
          <GiftProductList03 @popupEvent="popupAction" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <h3 class="sub-title2">
            <span class="inp-chk bg">
              <input type="checkbox" name="" id="category04" value=""  checked="checked">
              <label for="category04">택배배송(2)</label>
            </span>
          </h3>
          <GiftProductList03 @popupEvent="popupAction" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
        </section>
        <!-- END : 상품정보 -->
        <!-- START : 상품가격 -->
        <section class="section-area">
          <GiftTotalPrice02 @popupEvent="popupAction" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <!-- <CartTotalPrice @popupEvent="popupAction" /> // 실사용 컴포넌트 -->
          <PopupDeliveryPrice @popupEvent="popupAction" v-if="this.popup.popupDeliveryPrice" /> <!-- 팝업 - 배송비 안내 -->
        </section>
        <!-- END : 상품가격 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area bg">
          <p class="ico-alert2">상기 금액은 주문 결제 단계에서 장바구니 쿠폰, 카드할인 등 할인 수단 적용 시 결제 금액이 달라질 수 있습니다.</p>
          <button type="button" class="btn-lg btn-bg lightgreen"><span>결제하기</span></button>
        </div>
        <!-- END :하단 버튼 -->
        <PopupDiscountInfo @popupEvent="popupAction" v-if="this.popup.popupDiscountInfo" /> <!-- 팝업 - 할인 내역 -->
        <PopupCouponChange @popupEvent="popupAction" v-if="this.popup.popupCouponList" /> <!-- 팝업 - 쿠폰변경 -->
        <PopupOptionList @popupEvent="popupAction" v-if="this.popup.popupOptionList" /> <!-- 팝업 - 단일옵션 -->
        <PopupDateSelect @popupEvent="popupAction" v-if="this.popup.popupDateSelect" /> <!-- 팝업 - 날짜변경 -->
      </div>
    </main>
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import GiftMessageWrite from '@/components/cart/GiftMessageWrite'; // 메세지 보내기
import PopupOptionList from '@/views/od/PopupOptionList'; // 팝업 - 단일옵션
import PopupDiscountInfo from '@/views/od/PopupDiscountInfo'; // 팝업 - 할인 내역
import PopupCouponChange from '@/views/od/PopupCouponChange'; // 팝업 - 쿠폰변경
import PopupDeliveryPrice from '@/views/od/PopupDeliveryPrice'; // 팝업 - 배송비 안내
import PopupDateSelect from '@/views/od/PopupDateSelect'; // 팝업 - 날짜변경
// import GiftReceiveAddr from '@/components/cart/GiftReceiveAddr'; // 배송지
// import GiftSendInfo from '@/components/cart/GiftSendInfo'; // 주문자
// import CartProductList from '@/components/cart/CartProductList'; // 제품 목록
// import CartTotalPrice from '@/components/cart/CartTotalPrice'; // 총 가격
/* END : 실 사용 컴포넌트 */
/* START : 기획&디자인확인용 */
import GiftProductList01 from '@/components/_temp/GiftProductList01';
import GiftProductList03 from '@/components/_temp/GiftProductList03';
import GiftProductList05 from '@/components/_temp/GiftProductList05';
import GiftTotalPrice02 from '@/components/_temp/GiftTotalPrice02';
import GiftSendInfo01 from '@/components/_temp/GiftSendInfo';
import GiftReceiveAddr03 from '@/components/_temp/GiftReceiveAddr03';
/* END : 기획&디자인확인용 */
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "GiftRequest3",
  data() {
    return {
      selectType: 'kakaotalk', // 메시지 보내기 타입
      popup: { // 팝업
        open: false,
        popupDiscountInfo: false,
        popupCouponList: false,
        popupOptionList: false,
        popupDateSelect: false,
        popupDeliveryPrice: false,
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '(조르기)선물하기 < %s'
  },
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
    SubDefaultHeader, // 헤더
    GiftMessageWrite, // 메세지 보내기
    // GiftReceiveAddr, // 배송지
    // GiftSendInfo, // 주문자
    // CartProductList, // 제품 리스트
    // CartTotalPrice, // 총 가격
    PopupDiscountInfo, // 팝업 - 할인 내역
    PopupCouponChange, // 팝업 - 쿠폰변경
    PopupOptionList, // 팝업 - 옵션 선택
    PopupDeliveryPrice, // 팝업 - 배송비 안내
    PopupDateSelect, // 팝업 - 날짜선택
    GiftProductList01, // 기획&디자인 확인용
    GiftProductList03, // 기획&디자인 확인용
    GiftProductList05, // 기획&디자인 확인용
    GiftTotalPrice02, // 기획&디자인 확인용
    GiftSendInfo01, // 기획&디자인 확인용
    GiftReceiveAddr03, // 기획&디자인 확인용
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
