
<!--
views/od/SC-FO-OD-GS-MS-001
-->
<template>
  <div class="wrapper tabcont_gsfresh" id="tab-contents2" tabindex="0" aria-labelledby="tab2">
    <div class="wrapper" v-if="isBaskItem()"><!-- 4월 수정: 하단 스티키 배너 활성화 시 하단 여백 확보 -->
      <!-- 4월 수정 START : 추가 - 선물하기 이용안내 -->
      <div class="wrap-speech-gift" v-if="false">
        <div class="speech-bubble">
            <button aria-haspopup="dialog" title="선물하기 이용안내 팝업 활성화" @click="popupAction('popupGiftInfo')">GS 프레시몰에서 마음을 전해보세요!</button>
        </div>
        <button class="btn-close" aria-label="말풍선닫기" @click="speechGiftInfo = false"></button>
      </div>
      <!-- 4월 수정 END : 추가 - 선물하기 이용안내 -->
      <!-- START : 주소 -->
      <CartAddress @popupEvent="popupAction" :mbrDlvp="mbrDlvp" v-if="loginYn"/>
      <PoupSelectAddress @selectMbrDlvp="selectMbrDlvp" @popupEvent="popupAction" v-if="this.popup.popupAddrList && loginYn" :mbrDlvpSeqno="mbrDlvp.mbrDlvpSeqno"/> <!-- 팝업 - 배송지 목록 팝업 -->
      <PopupAddrChange @popupEvent="popupAction" v-if="this.popup.popupAddrChange && loginYn" :mbrDlvp="mbrDlvp" :mbrDlvpTemp="mbrDlvpTemp" @changeMbrDlvp="changeMbrDlvp"/> <!-- 팝업 - 권역 변경 팝업 -->
      <!-- END : 주소 -->
      <div class="cart-my-address" v-if="!loginYn"> <!-- Object.keys(bsktInqRsltDto).length -->
        <p class="btn-login">
          <a href="javascript://" @click="goLogin">로그인해주세요.</a> <!-- 수정 START : 2020.02.21 마크업 변경 (로그인 이동 텍스트 버튼으로 변경) -->
        </p>
      </div>
      <!-- START : 상품목록 -->
      <section>
        <h2 class="hidden">장바구니 상품 목록</h2>
        <!-- START : 카테고리 스티키 -->
        <CartCategoryMenu :bsktInqRsltDto="bsktInqRsltDto"/>
        <!-- END : 카테고리 스티키 -->
        <div class="cart-category-product" id="cart-category-product">
          <!-- START : 첫구매 혜택  -->
          <CartFirstProductList @popupEvent="popupAction" v-if="cartFirstProduct"
                                :firstBuyPres="bsktInqRsltDto.firstBuyPresList" v-model="firstBuyPresInfo"
                                :bsktInqRsltDto="bsktInqRsltDto"
                                :mbrDlvp="mbrDlvp"/>
          <!-- END : 첫구매 혜택  -->
          <!-- START : 예약 배송 -->
          <!-- START : 선택제품 없을 경우
          <div id="reservationDelivery" class="wrap-category-content">
          </div>
          END : 선택제품 없을 경우 -->
          <div v-for="(delivType, index) in bsktInqRsltDto.delivTypeDtoList" v-bind:key="index" class="wrap-category-content" :id="delivTypeId(delivType.ordTypeCd, delivType.delivTypeCd)">
            <h3 class="title-cate">
              <span class="inp-chk bg">
                <input type="checkbox" name="" :id="`${'category' + delivType.ordTypeCd + delivType.delivTypeCd}`" value="" v-model="delivType.chk" @click="setDelivTypeChk(index)">
                <label :for="`${'category' + delivType.ordTypeCd + delivType.delivTypeCd}`">{{delivType.delivTypeNm}}배송 <span class="txt-count">{{getItemCnt(delivType.supplFirmDtoList)}}</span></label>
              </span>
              <p class="multi-area">
                <button type="button" class="btn-multi-delivery" aria-label="배송지 목록 팝업활성화" aria-haspopup="dialog" @click="popupMultiAddrActive" v-if="delivType.ordTypeCd === '50' ">여러곳으로 보내기</button>
                <button type="button" aria-haspopup="dialog" class="btn-change" v-else-if="delivType.delivTypeCd === '01'" @click="changeDelivType(index, '04')">새벽배송으로 옮기기</button>
                <button type="button" class="btn-change" v-else-if="delivType.delivTypeCd === '04'" @click="changeDelivType(index, '01')">당일배송으로 옮기기</button>
                <a href="javascript://" class="dali-membership-renewal" title="달리드림 멤버십 연장하러 가기 링크" v-else-if="delivType.delivTypeCd === '05' && bsktInqRsltDto.pmbsJoinPrcnCd !== '0001' && loginYn" @click="goDaliDream"><span>달리드림 멤버십 연장하기</span></a>
              </p>
            </h3>
            <PopupMutiAddrList @popupEvent="popupAction" v-if="popup.popupMutiAddrList" :bsktIds="bsktIds" type="bskt"/> <!-- 팝업 - 다중배송지 목록 팝업 -->
            <!-- START : 사은품 배너 -->
            <CartGiftBanner @popupEvent="popupAction" v-if="delivType.ordTypeCd === '10' && (delivType.delivTypeCd === '01' || delivType.delivTypeCd === '04' || delivType.delivTypeCd === '02' || delivType.delivTypeCd === '03') && delivType.presList.length > 0" :delivType="delivType" :pmbsJoinPrcnCd="bsktInqRsltDto.pmbsJoinPrcnCd" @openSpecialGift="openSpecialGift"/>
            <!-- END : 사은품 배너 -->
            <CartProductList @popupEvent="popupAction" :bsktInqRsltDto="bsktInqRsltDto" :delivType="delivType"
                              :todayDelivYn="todayDelivYn" :apchItemDelivYn="apchItemDelivYn" :nextDayDelivYn="nextDayDelivYn" :index="index" @updateBskt="updateBskt"
                              @deleteBskt="deleteBskt" @updateBsktKeepYn="updateBsktKeepYn" @setChk="setChk"
                              @openCouponPopup="openCouponPopup" @openFreeGiftPopup="openFreeGiftPopup"
                              :pmbsJoinPrcnCd="bsktInqRsltDto.pmbsJoinPrcnCd" @addSimilarity="putBskt"
                              @delSimilarity="deleteBskt" :itemCmplRsltDtoList="delivType.itemCmplRsltDtoList"
                              @openCmplItemPopup="openCmplItemPopupNew" @openItemOptnPopup="openItemOptnPopup"
                              :mbrDlvp="mbrDlvp"
                              @openRstkinInfmReq="openRstkinInfmReq" @popupDateActive="popupDateActive"/> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          </div>
          <!-- END : 예약 배송 -->
          <div class="wrap-category-content" id="overseasDelivery" v-if="!checkExistsDelivType('05')">
          </div>
          <!-- START : 맛보기 상품 -->
          <CartBenefitProductList @popupEvent="popupAction" v-if="cartBenefitProduct"
                              :samplePres="bsktInqRsltDto.samplePresList" v-model="samplePresInfo"
                              :bsktInqRsltDto="bsktInqRsltDto"/>
          <!-- END : 맛보기 상품 -->
          <!-- START : 달리살다 배너 -->
          <CartDalisaldaBanner />
          <!-- END : 달리살다 배너 -->
        </div>
      </section>
      <!-- END : 상품목록 -->
      <!-- START : 총 상품금액 -->
      <CartTotalPrice @popupEvent="popupAction" :bsktInqRsltDto="bsktInqRsltDto" :firstBuy="firstBuyPresInfo" :pmbsJoinPrcnCd="bsktInqRsltDto.pmbsJoinPrcnCd" :sampleInfo="samplePresInfo"/>
      <PopupDeliveryPrice @popupEvent="popupAction" v-if="this.popup.popupDeliveryPrice" /> <!-- 팝업 - 배송비 안내 -->
      <!-- END : 총 상품금액 -->
      <!-- START : 삭제 버튼 영역 -->
      <CartFooterBtn @setAllChk="setAllChk" @selectedDeleteBskt="selectedDeleteBskt" @deleteSoldoutBskt="deleteSoldoutBskt"/>
      <!-- END : 삭제 버튼 영역 -->
      <!-- START : 하단 버튼 -->
      <!-- <CartFloatingBtn :class="{'bannerOn' : floatingBanner}" /> --> <!-- 4월 수정 : 하단 플로팅 배너 추가로 인한 위치값 제어 클래스 추가 -->
      <!-- END : 하단 버튼 -->
      <CartFloatingBanner @floatingClose="floatingClose" @popupEvent="popupAction" v-if="floatingBanner" :cartFloatingBannerText="cartFloatingBannerText"/><!-- 4월 수정 : 하단 플로팅 배너 추가 -->
      <!-- END : 하단 버튼 -->
      <!-- START : 총합계 -->
      <CartFooterOrder @goOrder="goOrder" @goGift="goGift" :showFooter="this.popup.popupSelectGift" :bsktInqRsltDto="bsktInqRsltDto" :maxBnftYn="maxBnftYn" :firstBuy="firstBuyPresInfo" :sample="samplePresInfo" @setMaxBnft="setMaxBnft"/>
      <!-- <PoupSelectGift @popupEvent="popupAction" v-if="this.popup.popupSelectGift" /> 팝업 - 선물하기 조르기 4월 수정 : 팝업 삭제-->
      <PopupAlert2plus1 @popupEvent="popupAction" v-if="this.popup.popupAlert2plus1" :nplusOneNoStsfMsg="nplusOneNoStsfMsg" :nplusOneNoStsfTitle="nplusOneNoStsfTitle"/> <!-- 팝업 - 2+1 행사수량 확인 -->
      <PopupCertification @popupEvent="popupAction" v-if="this.popup.popupCertification" /> <!-- 팝업 - 휴대전화 인증 -->
      <!-- END : 총합계 -->
      <!-- START : layer POPUP -->
      <PopupSpecialGift @popupEvent="popupAction" v-if="this.popup.popupSpecialGift" :delivType="delivType"/> <!-- 팝업 - 금액별 사은품 팝업 -->
      <PopupEventProduct @popupEvent="popupAction" v-if="this.popup.popupEventProduct" :mallId="mallId" :cmpl="cmpl" :pmbsJoinPrcnCd="bsktInqRsltDto.pmbsJoinPrcnCd" @putCmplItem="putCmplItem"/> <!-- 팝업 - 행사상품 담기 -->
      <PopupOptionList @popupEvent="popupAction" v-if="this.popup.popupOptionList" :itemOptnList="itemOptnList" :itemNm="itemNm" :skuId="skuId" @changeItemOptn="changeItemOptn"/> <!-- 팝업 - 단일옵션 -->
      <PopupOptionDate @popupEvent="popupAction" v-if="this.popup.popupOptionDate" /> <!-- 팝업 - 단일, 날짜 옵션 -->
      <PopupDateSelect @popupEvent="popupAction" v-if="this.popup.popupDateSelect" :delivDt="delivDt" @selectDelivDt="selectDelivDt" :bskt="bskt"/> <!-- 팝업 - 날짜변경 -->
      <PopupAlert @popupEvent="popupAction" v-if="this.popup.popupAlert" @reqRstkinInfm="reqRstkinInfm"/> <!-- 팝업 - 입고알림 -->
      <transition name="toastPopup"
        v-on:after-enter="toastPopupAfterEnter"
        v-on:leave="toastPopupEnterLeave"
      >
        <PopupToast :ToastMessage="toastMessage" @popupEvent="popupAction" v-if="this.popup.popupToast" /> <!-- 팝업 - toast -->
      </transition>
      <!-- <PopupSimilarityProduct @popupEvent="popupAction" v-if="this.popup.popupSimilarity" /> 팝업 - 유사상품 -->
      <!-- <PopupAlertSimilarity @popupEvent="popupAction" v-if="this.popup.popupAlertSimilarity" /> 팝업 - 유사상품 장바구니 담기 -->
      <!-- <PopupTodayDelivery @popupEvent="popupAction" v-if="this.popup.popupTodayDelivery" /> 팝업 - 당일배송 추천상품 -->
      <PopupDawnDelivery @popupEvent="popupAction" v-if="this.popup.popupDawnDelivery" />  <!-- 팝업 - 새벽배송 추천상품 -->
      <PopupParcelDelivery @popupEvent="popupAction" v-if="this.popup.popupParcelDelivery" /> <!-- 팝업 - 택배배송 추천상품 -->
      <PopupOverseasDelivery @popupEvent="popupAction" v-if="this.popup.popupOverseasDelivery" /> <!-- 팝업 - 해외배송 추천상품 -->
      <PopupGiftChangeSingle @popupEvent="popupAction" v-if="this.popup.popupGiftSingle" :bsktId="bsktId" :pres="pres" :promBeneZoneList="promBeneZoneList" @changeFrgf="changeFrgf"/> <!-- 팝업 - 사은품 단일선택 -->
      <PopupGiftChangeDouble @popupEvent="popupAction" v-if="this.popup.popupGiftDouble" :bsktId="bsktId" :pres="pres" :promBeneZoneList="promBeneZoneList" @changeFrgf="changeFrgf"/> <!-- 팝업 - 사은품 복수선택 -->
      <PopupDiscountInfo @popupEvent="popupAction" v-if="this.popup.popupDiscountInfo" :bsktDiscountInfo="bsktDiscountInfo" :pmbsJoinPrcnCd="bsktInqRsltDto.pmbsJoinPrcnCd"/> <!-- 팝업 - 할인 내역 -->
      <PopupCouponChange @popupEvent="popupAction" v-if="this.popup.popupCouponList" :itemCpnList="itemCpnList" :dblDcCpnList="dblDcCpnList" :itemNm="itemNm" :bsktId="bsktId" @useCpn="useCpn" :applItemCpnList="bsktInqRsltDto.applItemCpnList" :applDblDcCpnList="bsktInqRsltDto.applDblDcCpnList" :itemDcSprc="itemDcSprc" :bsktQty="bsktQty" :cmplDcAmt="cmplDcAmt"/> <!-- 팝업 - 쿠폰변경 -->
      <!-- END : layer POPUP -->
      <PopupParcelDelivery2 @popupEvent="popupAction" v-if="this.popup.popupParcelDelivery2" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
      <!-- 4월수정 START : 팝업 추가 -->
      <PopupGiftInfo @popupEvent="popupAction" v-if="this.popup.popupGiftInfo" /> <!-- 팝업 - 선물하기 이용안내 팝업 -->
      <PopupSpecialGiftMall @popupEvent="popupAction" v-if="this.popup.popupSpecialGiftMall" :bsktInqRsltDto="bsktInqRsltDto"/> <!-- 팝업 - 몰 금액별 사은품 팝업 -->
      <PopupshippingFeeInfo @popupEvent="popupAction" v-if="this.popup.popupshippingFeeInfo" /> <!-- 팝업 - 상품배송비팝업 -->
      <PopupSumDeliv @popupEvent="popupAction" v-if="this.popup.popupSumDeliv" @order="order" :sumDelivList="sumDelivList"/> <!-- 팝업 - 합배송 -->
      <PopupDaybreakpopupCart @popupEvent="popupAction" v-if="this.popup.popupDaybreakpopupCart"/> <!-- 팝업 - 새벽배송 불가 -->
      <!-- 4월수정 END : 팝업 추가 -->
    </div>
    <div class="cart-before-login" v-else>
      <!-- START : 주소 -->
      <CartAddress @popupEvent="popupAction" :mbrDlvp="mbrDlvp" v-if="loginYn"/>
      <PoupSelectAddress @selectMbrDlvp="selectMbrDlvp" @popupEvent="popupAction" v-if="this.popup.popupAddrList && loginYn" :mbrDlvpSeqno="mbrDlvp.mbrDlvpSeqno"/> <!-- 팝업 - 배송지 목록 팝업 -->
      <PopupAddrChange @popupEvent="popupAction" v-if="this.popup.popupAddrChange && loginYn" :mbrDlvp="mbrDlvp" :mbrDlvpTemp="mbrDlvpTemp" @changeMbrDlvp="changeMbrDlvp"/> <!-- 팝업 - 권역 변경 팝업 -->
      <!-- END : 주소 -->
      <!-- START : 첫구매 혜택  -->
      <CartFirstProductList @popupEvent="popupAction" v-if="cartFirstProduct"
                            :firstBuyPres="bsktInqRsltDto.firstBuyPresList" v-model="firstBuyPresInfo"
                            :bsktInqRsltDto="bsktInqRsltDto"
                            :mbrDlvp="mbrDlvp"/>
      <!-- END : 첫구매 혜택  -->
      <div class="cart-my-address" v-if="!loginYn">
        <p class="btn-login">
          <a href="javascript:" @click="goLogin">로그인해주세요.</a> <!-- 수정 START : 2020.02.21 마크업 변경 (로그인 이동 텍스트 버튼으로 변경) -->
        </p>
      </div>
      <div class="inner">
        <p v-if="loading == 0">장바구니에 담긴 상품이 없습니다.</p>
        <p v-else>장바구니 조회 중입니다.</p>
        <a href="javascript:" class="btn-go-shopping" @click="goShop">쇼핑하러 가기</a>
      </div>
      <!--
      <div class="banner-time-sale">
        <strong>美친 수요일 전상품10%</strong><br>(화요일 17시부터 수요일 17시까지)
      </div>
      -->
    </div>
  </div>
</template>
<script>
  /* START : 실 사용 컴포넌트 */
  // import CartProductList from '@/components/cart/CartProductList';
  // import CartItemPrice from '@/components/cart/CartItemPrice';
  // import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 장바구니 헤더
  import CartAddress from '@/components/cart/CartAddress'; // 주소
  import CartGiftBanner from '@/views/od/CartGiftBanner'; // 사은품 배너
  import CartCategoryMenu from '@/components/cart/CartCategoryMenu'; // 카테고리 sticky
  import CartBenefitProductList from '@/views/od/CartBenefitProductList'; // 우수고객 맛보기 상품
  import CartFirstProductList from '@/views/od/CartFirstProductList'; // 첫구매 혜택
  import CartDalisaldaBanner from '@/components/cart/CartDalisaldaBanner'; // 달리살다 배너
  import CartTotalPrice from '@/components/cart/CartTotalPrice'; // 총합계
  import CartFooterBtn from '@/components/cart/CartFooterBtn'; // 하단 버튼 및 결제 안내
  // import CartFloatingBtn from '@/components/cart/CartFloatingBtn'; // top 버튼
  import CartFloatingBanner from '@/components/cart/CartFloatingBanner'; // 하단 주문하기 버튼 // 4월 추가
  import CartFooterOrder from '@/components/cart/CartFooterOrder'; // 하단 주문하기 버튼
  /* END : 실 사용 컴포넌트 */
  /* START : 레이어 팝업 */
  import PopupSpecialGift from '@/views/od/PopupSpecialGift'; // 팝업 - 금액대별 사은품
  import PoupSelectAddress from '@/views/od/PoupSelectAddress'; //  팝업 - 배송지 변경
  import PopupMutiAddrList from '@/views/od/PopupMutiAddrList'; //  팝업 - 배송지 변경
  import PopupEventProduct from '@/views/od/PopupEventProduct'; // 팝업 - 행사상품
  import PopupOptionList from '@/views/od/PopupOptionList'; // 팝업 - 단일옵션
  import PopupOptionDate from '@/views/od/PopupOptionDate'; // 팝업 - 단일옵션
  import PopupDateSelect from '@/views/od/PopupDateSelect'; // 팝업 - 날짜변경
  import PopupAlert from '@/views/od/PopupAlert'; // 팝업 - 입고알림
  import PopupToast from '@/views/od/PopupToast'; // 팝업 - toast
  // import PopupSimilarityProduct from '@/views/od/PopupSimilarityProduct'; // 팝업 - 유사상품
  // import PopupAlertSimilarity from '@/views/od/PopupAlertSimilarity'; // 팝업 - 유사상품 장바구니 넣기
  // import PopupTodayDelivery from '@/views/od/PopupTodayDelivery'; // 팝업 - 추천상품 (당일)
  import PopupDawnDelivery from '@/views/od/PopupDawnDelivery'; // 팝업 - 추천상품 (새벽)
  import PopupParcelDelivery from '@/views/od/PopupParcelDelivery'; // 팝업 - 추천상품 (택배)
  import PopupOverseasDelivery from '@/views/od/PopupOverseasDelivery'; // 팝업 - 추천상품 (해외)
  import PopupCouponChange from '@/views/od/PopupCouponChange'; // 팝업 - 쿠폰변경
  import PopupGiftChangeSingle from '@/views/od/PopupGiftChangeSingle'; // 팝업 - 사은품 단일선택
  import PopupGiftChangeDouble from '@/views/od/PopupGiftChangeDouble'; // 팝업 - 사은품 복수선택
  import PopupDiscountInfo from '@/views/od/PopupDiscountInfo'; // 팝업 - 할인 내역
  import PopupDeliveryPrice from '@/views/od/PopupDeliveryPrice'; // 팝업 - 배송비 안내
  import PopupAddrChange from '@/views/od/PopupAddrChange'; // 팝업 - 권역 변경
  // import PoupSelectGift from '@/views/od/PoupSelectGift'; // 선물하기 조르기 팝업
  import PopupAlert2plus1 from '@/views/od/PopupAlert2plus1'; // 2+1 행사수량 확인 조르기 팝업
  import PopupCertification from '@/views/od/PopupCertification'; // 휴대전화 인증 팝업
  import PopupSumDeliv from '@/views/od/PopupSumDeliv'; // 합배송안내
  /* END : 레이어 팝업 */
  /* START : 기획&디자인확인용 */
  import CartProductList from '@/components/_temp/CartProductList';
  import PopupParcelDelivery2 from '@/components/_temp/PopupParcelDelivery'; // 팝업 - 추천상품 (택배)
  /* END : 기획&디자인확인용 */
  import PopupGiftInfo from '@/views/od/PopupGiftInfo'; // 팝업 - 선물하기 이용안내
  import PopupshippingFeeInfo from '@/views/od/PopupshippingFeeInfo'; // 팝업 - 상품배송비안내
  import PopupSpecialGiftMall from '@/views/od/PopupSpecialGiftMall'; // 팝업 - 몰 금액별 사은품
  // import Footer from '@/components/common/Footer'; // 푸터
  import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
  import PopupDaybreakpopupCart from '@/views/od/PopupDaybreakpopupCart'; // 합배송안내
  import {clearAllBodyScrollLocks, disableBodyScroll} from 'body-scroll-lock';
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';

  import ApiUtils from '@/common/ApiUtils';
  import CookieUtils from '@/common/CookieUtils';
  import Tracker from '@/common/Tracker';
  import LoginUtils from '@/common/LoginUtils';
  import JwtUtils from '@/common/JwtUtils';
  import SiteUtils from '@/common/SiteUtils';
  import StringUtils from '@/common/StringUtils';
  import Basket from '@/common/od/Basket';

  export default {
  name: "CartList",
  props: {
    cmmSiteClass: String,
    loading: Number,
  },
  data() {
    return {
      floatingBanner: false, // 4월 추가 하단 플로팅 배너
      speechGiftInfo: true, // 4월 추가 : 장바구니 진입시 뜨는 선물하기 이용안내 말풍선
      showPopupBg: true,
      popup: { // 팝업
        open: false,
        popupAddrList: false,
        popupMutiAddrList: false,
        popupAddrChange: false,
        popupSpecialGift: false,
        popupEventProduct: false,
        popupOptionList: false,
        popupOptionDate: false,
        popupDateSelect: false,
        popupAlert: false,
        popupToast: false,
        popupSimilarity: false,
        popupAlertSimilarity: false,
        popupTodayDelivery: false,
        popupDawnDelivery: false,
        popupParcelDelivery: false,
        popupOverseasDelivery: false,
        popupGiftSingle: false,
        popupGiftDouble: false,
        popupDiscountInfo: false,
        popupCouponList: false,
        popupDeliveryPrice: false,
        popupSelectGift: false,
        popupAlert2plus1: false,
        popupCertification: false,
        popupParcelDelivery2: false, // 기획&디자인확인용
        // 4월수정 START : 팝업 추가
        popupGiftInfo: false, // 팝업 - 선물하기 이용안내
        popupshippingFeeInfo: false, // 팝업 - 상품배송비안내
        // 4월수정 END : 팝업 추가
        popupSpecialGiftMall: false, // 팝업 - 몰 금액별 사은품
        popupSumDeliv: false,
        popupDaybreakpopupCart: false,
      },
      bsktInqRsltDto: {},
      totItemCnt: 0,
      bsktDiscountInfo: {},
      mbrDlvp: {},
      mbrDlvpTemp: {},
      loginYn: LoginUtils.isLogin(),
      itemCpnList: {},
      dblDcCpnList: {},
      firstBuyInfo: 0,
      firstBuyPresInfo: null,
      samplePresInfo: null,
      itemNm: '',
      bsktId: '',
      delivDt: '',
      itemDcSprc: 0,
      bsktQty: 0,
      cmplDcAmt: 0,
      timer: null,
      pres: {},
      promBeneZoneList: [],
      cmpl: {},
      ordTypeCd: '',
      delivTypeCd: '',
      itemOptnList: [],
      skuId: '',
      bsktIds: {},
      todayDelivYn: 'Y',
      nextDayDelivYn: 'Y',
      apchItemDelivYn: 'Y',
      delivType: {},
      cartFloatingBannerText: '',
      cartFirstProduct: false,
      cartBenefitProduct: false,
      bskt: {},
      maxBnftYn: 'Y',
      goOrderPut: {},
      sumDelivList: [],
      mallId: '',
      siteClass: CookieUtils.getSiteClass(),
      focusBsktId: '',
      nplusOneNoStsfMsg: '',
      nplusOneNoStsfTitle: '',
      toastMessage: '',
      showDaybreak: CookieUtils.isDaybreak() ? 'Y' : 'N',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '장바구니 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '장바구니',
      },
    ],
  },
  mixins: [LayerPopupMixin],
  components: {
    // CartProductList, // 실 사용 컴포넌트
    // CartItemPrice, // 실 사용 컴포넌트
    // SubDefaultHeader,
    CartAddress,
    CartCategoryMenu,
    CartGiftBanner,
    PopupSpecialGift,
    CartBenefitProductList,
    CartFirstProductList,
    CartDalisaldaBanner,
    CartTotalPrice,
    CartFooterBtn,
    // CartFloatingBtn,
    CartFloatingBanner, // 4월 추가
    CartFooterOrder,
    PoupSelectAddress,
    PopupAddrChange,
    PopupEventProduct,
    PopupCouponChange,
    PopupOptionList,
    PopupOptionDate,
    PopupDateSelect,
    PopupAlert,
    PopupToast,
    // PopupSimilarityProduct,
    // PopupAlertSimilarity,
    // PopupTodayDelivery,
    PopupGiftChangeSingle,
    PopupGiftChangeDouble,
    PopupDiscountInfo,
    PopupDawnDelivery,
    PopupParcelDelivery,
    PopupOverseasDelivery,
    PopupDeliveryPrice,
    // PoupSelectGift,
    PopupAlert2plus1,
    PopupCertification,
    CartProductList, // 기획&디자인 확인용
    PopupParcelDelivery2, // 기획&디자인 확인용
    PopupMutiAddrList,
    // 4월수정 START : 팝업 추가
    PopupGiftInfo,
    PopupshippingFeeInfo,
    // 4월수정 END : 팝업 추가
    PopupSpecialGiftMall,
    // Footer,
    PopupSumDeliv,
    // Loading,
    PopupDaybreakpopupCart
  },
  methods: {
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    isBaskItem() {
      const isFlag = Object.entries(this.bsktInqRsltDto).length > 0 && this.isNotEmpty(this.bsktInqRsltDto.delivTypeDtoList) && this.bsktInqRsltDto.delivTypeDtoList.length > 0;
      return isFlag;
    },
    showLoading(flag) {
      this.$emit('showLoading', flag);
    },
    getDelivHtml(id) {
      const divElement = document.createElement("div");
      divElement.setAttribute('id', id);
      divElement.className = 'wrap-category-content';
      return divElement;
    },
    samplePres(samplePresInfo) {
      this.samplePresInfo = samplePresInfo;
    },
    // 팝업 활성/비활성
    popupAction(type, bskt) {
      if (type === "popupDiscountInfo") {
        this.bsktDiscountInfo = bskt;
      }
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    // 다중배송지 팝업
    popupMultiAddrActive() {
      const bsktIds = [];

      if (this.bsktInqRsltDto !== null && Object.entries(this.bsktInqRsltDto).length !== 0) {
        for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
          if (this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd === '50') {
            for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
              for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                  bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId);
                }
              }
            }
          }
        }
      }

      if (bsktIds.length === 0) {
        if (this.bsktInqRsltDto !== null && Object.entries(this.bsktInqRsltDto).length !== 0) {
          for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
            if (this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd === '50') {
              for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
                for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                  bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId);
                }
              }
            }
          }
        }

        if (bsktIds.length === 0) {
          this.$gsdialog.alert("여러곳으로 보내기 가능한 상품이 없습니다.");
          return;
        }
        this.$gsdialog.confirm(bsktIds.length + "건의 상품을\n여러곳으로 보내시겠습니까?").then(dialog => {
          this.bsktIds = bsktIds;
          this.popupAction('popupMutiAddrList');
        });
      } else {
        // 주석 처리
        if (bsktIds.length === 0) {
          this.$gsdialog.alert("여러곳으로 보내기 가능한 상품이 없습니다.");
          return;
        }
        this.$gsdialog.confirm("선택한 " + bsktIds.length + "건의 상품을\n여러곳으로 보내시겠습니까?").then(dialog => {
          this.bsktIds = bsktIds;
          this.popupAction('popupMutiAddrList');
        });
      }
    },
    delivTypeId(ordTypeCd, delivTypeCd) {
      let delivTypeId = "";

      if (ordTypeCd === "10") {
        if ("01"=== delivTypeCd) {
          delivTypeId = "todayDelivery";
        } else if ("02"=== delivTypeCd) {
          delivTypeId = "parcelDelivery";
        } else if ("03"=== delivTypeCd) {
          delivTypeId = "parcelDelivery";
        } else if ("04"=== delivTypeCd) {
          delivTypeId = "dawnDelivery";
        } else if ("05"=== delivTypeCd) {
          delivTypeId = "overseasDelivery";
        }
      } else if (ordTypeCd === "50") {
        delivTypeId = "reservationDelivery";
      }
      return delivTypeId;
    },
    async updateBskt(bskt) {
      const iBsktPut = {
        bsktId: bskt.bsktId,
        bsktQty: bskt.bsktQty,
        zipcd: this.mbrDlvp.zipcd,
        storId: bskt.storId,
        supplFirmCd: bskt.supplFirmCd,
        sessnId: CookieUtils.getOdBsktUuid(),
      };
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      const $this = this;
      this.timer = setTimeout(async () => {
        this.showLoading(true);
        const result = await ApiUtils.put('/fo/od/bsktmgnt/basket-item-quantity', iBsktPut);
        this.showLoading(false);
        console.log(result);
        if (!result.data.success) {
          this.$gsdialog.alert(result.data.statusMessage);
        }
        $this.getBskt("U");
      }, 500);
    },
    async deleteBskt(bskt) {
      const bsktIds = [];
      const prodData = [];

      bsktIds.push(bskt.bsktId);
      const iBsktPut = {
        bsktIds: bsktIds,
        sessnId: CookieUtils.getOdBsktUuid(),
      };

      this.showLoading(true);
      const result = await ApiUtils.delete('/fo/od/bsktmgnt/basket-item', iBsktPut);
      this.showLoading(false);
      if (result.data.success) {
        prodData.push({"PROD_ID": bskt.itemId,
                      "PROD_NM": bskt.itemNm,
                      "PROD_CAT": bskt.dspCtgId});// 앱트래커 관련
        Tracker.prodRemoveFromCart(prodData);// 앱트래커 장바구니 삭제완료시
        this.getBskt("U");
        const odBsktUuid = CookieUtils.getOdBsktUuid();
        const params = {
          odBsktUuid: odBsktUuid,
        };
        this.$store.dispatch('getBsktQtyInfo', params);
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    async putBskt(data, ordTypeCd, delivTypeCd, stat, bskt) {
      const result = await Basket.putMultiBskt(data, ordTypeCd, delivTypeCd, this.mbrDlvp.zipcd);
      console.log(result);
      if (result.data.success) {
        this.$gsdialog.alert('상품이 장바구니에 담겼습니다.').then(dialog => {
          if (stat === 'D') {
            this.deleteBskt(bskt);
          }
          this.getBskt("S");
        });
        /*
        this.toastMessage = '상품이 장바구니에 담겼습니다';
        this.popupAction('popupToast');
        if (stat === 'D') {
            this.deleteBskt(bskt);
          }
        location.reload();
        */
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    async selectedDeleteBskt() {
      const bsktIds = [];
      const prodData = [];

      if (Object.entries(this.bsktInqRsltDto).length !== 0) {
        for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
          for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
            for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId);
                // 장바구나 아이템 삭제시
                // 상품코드, 상품명, 상품카테고리 입력부탁드립니다.
                prodData.push({"PROD_ID": this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemId,
                               "PROD_NM": this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemNm,
                               "PROD_CAT": this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dspCtgId});// 앱트래커 관련
              }
            }
            for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList.length; ldx++) {
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].chk) {
                bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].bsktId);
                // 장바구나 아이템 삭제시
                // 상품코드, 상품명, 상품카테고리 입력부탁드립니다.
                prodData.push({"PROD_ID": this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].itemId,
                                "PROD_NM": this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].itemNm,
                                "PROD_CAT": this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].dspCtgId});// 앱트래커 관련
              }
            }
          }
        }
      }

      if (bsktIds.length === 0) {
        this.$gsdialog.alert(OrderMsg.productDelCntChk);
        return;
      }

      this.$gsdialog.confirm(OrderMsg.productDelConfirm).then(async dialog => {
        const iBsktPut = {
          bsktIds: bsktIds,
          sessnId: CookieUtils.getOdBsktUuid(),
        };

        this.showLoading(true);
        const result = await ApiUtils.delete('/fo/od/bsktmgnt/basket-item', iBsktPut);
        this.showLoading(false);
        console.log(result);
        if (result.data.success) {
          Tracker.prodRemoveFromCart(prodData);// 앱트래커 장바구니 삭제완료시
          this.getBskt("U");
          const odBsktUuid = CookieUtils.getOdBsktUuid();
          const params = {
            odBsktUuid: odBsktUuid,
          };
          this.$store.dispatch('getBsktQtyInfo', params);
        } else {
          this.$gsdialog.alert(result.data.statusMessage);
        }
      });
    },
    async deleteSoldoutBskt() {
      const bsktIds = [];
      const prodData = [];

      if (Object.entries(this.bsktInqRsltDto).length !== 0) {
        for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
          for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
            for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList.length; ldx++) {
              bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].bsktId);
              // 장바구나 아이템 삭제시
              // 상품코드, 상품명, 상품카테고리 입력부탁드립니다.
              prodData.push({"PROD_ID": this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].itemId,
                              "PROD_NM": this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].itemNm,
                              "PROD_CAT": this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].dspCtgId});// 앱트래커 관련
            }
          }
        }
      }

      if (bsktIds.length === 0) {
        this.$gsdialog.alert("품절 상품이 없습니다.");
        return;
      }

      const iBsktPut = {
        bsktIds: bsktIds,
        sessnId: CookieUtils.getOdBsktUuid(),
      };

      this.showLoading(true);
      const result = await ApiUtils.delete('/fo/od/bsktmgnt/basket-item', iBsktPut);
      this.showLoading(false);
      console.log(result);
      if (result.data.success) {
        Tracker.prodRemoveFromCart(prodData);// 앱트래커 장바구니 삭제완료시
        this.getBskt("U");
        const odBsktUuid = CookieUtils.getOdBsktUuid();
        const params = {
          odBsktUuid: odBsktUuid,
        };
        this.$store.dispatch('getBsktQtyInfo', params);
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    async getBskt(inqType) {
      this.showLoading(true);

      const bsktIds = [];
      let totItemCnt = 0;

      if (this.bsktInqRsltDto !== null && Object.entries(this.bsktInqRsltDto).length !== 0) {
        for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
          for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
            for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList) {
                for (let ndx=0; ndx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList.length; ndx++) {
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList[ndx].chk) {
                    this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk = true;
                    bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList[ndx].bsktId);
                  }
                }
              }
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId);
                totItemCnt++;
              }
            }
            for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList.length; ldx++) {
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].chk) {
                bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].bsktId);
              }
            }
          }
        }
      }

      if (inqType === 'S') {
        this.maxBnftYn = 'Y';
      }
      const iBsktPut = {
        bsktIds: bsktIds,
        inqType: inqType,
        zipcd: this.mbrDlvp.zipcd,
        todaySupplFirmCd: this.mbrDlvp.supplFirmCd,
        dawnSupplFirmCd: this.mbrDlvp.dawnSupplFirmCd,
        applItemCpnList: this.bsktInqRsltDto.applItemCpnList,
        applDblDcCpnList: this.bsktInqRsltDto.applDblDcCpnList,
        maxBnftYn: this.maxBnftYn,
        showDaybreak: this.showDaybreak,
        mallId: CookieUtils.getMallId(),
        sessnId: CookieUtils.getOdBsktUuid(),
      };

      this.showLoading(true);
      const bsktListResult = await ApiUtils.post('/fo/od/bsktmgnt/basket-item-list', iBsktPut);
      this.showLoading(false);
      if (!bsktListResult.data.success) {
        if (bsktListResult.data.statusCode=="dev.warn.com.notlogin") { // 로그인 에러 발생시
          this.bsktLogOut();
        } else {
          this.$gsdialog.alert('오류가 발생하였습니다');
        }
      } else {
        this.bsktInqRsltDto = bsktListResult.data.data;
        console.log(this.bsktInqRsltDto);

        if (inqType === "S") {
          if (this.bsktInqRsltDto !== null && Object.entries(this.bsktInqRsltDto).length !== 0) {
            // totItemCnt = this.bsktInqRsltDto.resvDelivCnt + this.bsktInqRsltDto.todayDelivCnt + this.bsktInqRsltDto.dawnDelivCnt + this.bsktInqRsltDto.dlvDelivCnt + this.bsktInqRsltDto.abrdDelivCnt;
            let delivPolcId = '';
            for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd === '01') {
                delivPolcId = this.bsktInqRsltDto.delivTypeDtoList[jdx].delivPolcId;
                break;
              }
            }

            if (delivPolcId != null && delivPolcId !== '') {
              this.showLoading(true);
              const result3 = await ApiUtils.get('/fo/od/bsktmgnt/check-deliv-today', {delivPolcId: delivPolcId});
              this.showLoading(false);
              this.todayDelivYn = result3.data.data.todayDelivYn;
              this.nextDayDelivYn = result3.data.data.nextDayDelivYn;
              this.apchItemDelivYn = result3.data.data.apchItemDelivYn;
            }

            if ((this.bsktInqRsltDto.freshPresList !== null && this.bsktInqRsltDto.freshPresList.length > 0)) {
              this.cartFloatingBannerText = 'GS 프레시몰';
              this.floatingBanner = true;
            }

            if ((this.bsktInqRsltDto.daliPresList !== null && this.bsktInqRsltDto.daliPresList.length > 0)) {
              if (this.cartFloatingBannerText !== '') {
                this.cartFloatingBannerText += ' / ';
              }
              this.cartFloatingBannerText += '달리살다';
              this.floatingBanner = true;
            }

            if ((this.bsktInqRsltDto.spckPresList !== null && this.bsktInqRsltDto.spckPresList.length > 0)) {
              if (this.cartFloatingBannerText !== '') {
                this.cartFloatingBannerText += ' / ';
              }
              this.cartFloatingBannerText += '심플리쿡';
              this.floatingBanner = true;
            }
            Tracker.viewBasket(this.bsktInqRsltDto, this.$gtag);
          }

          const $this = this;
          this.$nextTick(function() {
            const cartDiv = document.getElementById('cart-category-product');
            if (cartDiv) {
              /*
              if (!$this.checkExistsDelivType('05')) {
                cartDiv.appendChild($this.getDelivHtml('overseasDelivery'));
              }
              */
              if (!$this.checkExistsDelivType('02') && !$this.checkExistsDelivType('03')) {
                cartDiv.insertBefore($this.getDelivHtml('parcelDelivery'), document.getElementById('overseasDelivery'));
              }
              if (!$this.checkExistsDelivType('04')) {
                cartDiv.insertBefore($this.getDelivHtml('dawnDelivery'), document.getElementById('parcelDelivery'));
              }
              if (!$this.checkExistsDelivType('01')) {
                cartDiv.insertBefore($this.getDelivHtml('todayDelivery'), document.getElementById('dawnDelivery'));
              }
            }
          });
        }

        if ((this.bsktInqRsltDto !== null && this.bsktInqRsltDto.firstBuyPresList !== null && this.bsktInqRsltDto.firstBuyPresList.length > 0)) {
          this.cartFirstProduct = true;
        } else {
          this.cartFirstProduct = false;
        }

        if ((this.bsktInqRsltDto !== null && this.bsktInqRsltDto.samplePresList !== null && this.bsktInqRsltDto.samplePresList.length > 0)) {
          this.cartBenefitProduct = true;
        } else {
          this.cartBenefitProduct = false;
        }
      }

      this.showLoading(false);
    },
    async updateBsktKeepYn(bsktId, bsktKeepYn) {
      if (!this.loginYn) {
        this.$gsdialog.alert('로그인해주세요.');
        return;
      } else {
        const iBsktPut = {
          bsktId: bsktId,
          bsktKeepYn: bsktKeepYn,
        };
        this.showLoading(true);
        const result = await ApiUtils.put('/fo/od/bsktmgnt/basket-item-keep', iBsktPut);
        this.showLoading(false);
        console.log(result);
      }
    },
    setDelivTypeChk(idx) {
      let chkYn = true;
      if (this.bsktInqRsltDto.delivTypeDtoList[idx].chk) {
        chkYn = false;
      }

      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList.length; jdx++) {
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList.length; kdx++) {
          this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].chk = chkYn;
          if (this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].addItemList) {
            for (let ndx=0; ndx<this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].addItemList.length; ndx++) {
              this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].addItemList[ndx].chk = chkYn;
            }
          }
        }
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].soldoutBsktInqRsltDtoList.length; kdx++) {
          this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].soldoutBsktInqRsltDtoList[kdx].chk = chkYn;
        }
      }

      /*
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      const $this = this;
      this.timer = setTimeout(() => {
        $this.getBskt("U");
      }, 300);
      */
      this.maxBnftYn = 'X';
      this.getBskt("U");
    },
    setChk(chkYn, idx) {
      this.bsktInqRsltDto.delivTypeDtoList[idx].chk = chkYn;

      /*
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      const $this = this;
      this.timer = setTimeout(() => {
        $this.getBskt("U");
      }, 300);
      */
      this.maxBnftYn = 'X';
      this.getBskt("U");
    },
    setAllChk(chkYn) {
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        this.bsktInqRsltDto.delivTypeDtoList[jdx].chk = !chkYn;
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
          for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
            this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk = !chkYn;
            if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList) {
              for (let ndx=0; ndx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList.length; ndx++) {
                this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList[ndx].chk = !chkYn;
              }
            }
          }
          for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList.length; ldx++) {
            this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].chk = !chkYn;
          }
        }
      }
      this.maxBnftYn = 'X';
      this.getBskt("U");
    },
    async changeDelivType(idx, delivTypeCd) {
      if (delivTypeCd === '04') {
        if (!this.mbrDlvp.dawnSupplFirmCd) {
          this.popupAction('popupDaybreakpopupCart');
          return;
        }
      }
      const bsktIds = [];
      let noChkYn = true;
      let msg = '';
      let cnt = 0;
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList.length; jdx++) {
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList.length; kdx++) {
          if (this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].chk) {
            noChkYn = false;
            if (delivTypeCd === '04') {
              if (this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].supplFirmCd04) {
                bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].bsktId);
              } else {
                if (msg !== '') {
                  msg += '<br/>';
                }
                msg += this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].itemNm;
                cnt++;
              }
            } else {
              bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].bsktId);
            }
          }
        }
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].soldoutBsktInqRsltDtoList.length; kdx++) {
          if (this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].soldoutBsktInqRsltDtoList[kdx].chk) {
            noChkYn = false;
            if (delivTypeCd === '04') {
              if (this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].soldoutBsktInqRsltDtoList[kdx].supplFirmCd04) {
                bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].soldoutBsktInqRsltDtoList[kdx].bsktId);
              } else {
                if (msg !== '') {
                  msg += '<br/>';
                }
                msg += this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].soldoutBsktInqRsltDtoList[kdx].itemNm;
                cnt++;
              }
            } else {
              bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].soldoutBsktInqRsltDtoList[kdx].bsktId);
            }
          }
        }
      }

      if (noChkYn) {
        this.$gsdialog.alert("옮길 상품을 선택해 주세요.");
        return;
      }

      if (bsktIds.length === 0) {
        this.$gsdialog.alert("옮길 수 있는 상품이 없습니다.");
        return;
      }

      if (msg !== '') {
        this.$gsdialog.confirm(cnt + '개의 상품이 이동 불가합니다.<br/>(* 새벽배송은 GS 프레시몰에 한해서만 가능합니다)<br/><br/>해당상품을 제외하고 옮기시겠습니까?<br/><br/>' + msg, {html: true}).then(async dialog => {
          const iBsktPut = {
            bsktIds: bsktIds,
            delivTypeCd: delivTypeCd,
            sessnId: CookieUtils.getOdBsktUuid(),
          };
          this.showLoading(true);
          const result = await ApiUtils.put('/fo/od/bsktmgnt/delivery-type', iBsktPut);
          this.showLoading(false);
          console.log(result);
          if (result.data.success) {
            this.$gsdialog.alert("선택한 " + bsktIds.length + "개의 상품이 " + (delivTypeCd === "01" ? "당일" : "새벽") + "배송으로 옮겨갔습니다.").then(dialog => {
              this.getBskt("S");
            });
          }
        });
      } else {
        const iBsktPut = {
          bsktIds: bsktIds,
          delivTypeCd: delivTypeCd,
          sessnId: CookieUtils.getOdBsktUuid(),
        };
        this.showLoading(true);
        const result = await ApiUtils.put('/fo/od/bsktmgnt/delivery-type', iBsktPut);
        this.showLoading(false);
        console.log(result);
        if (result.data.success) {
          this.$gsdialog.alert("선택한 " + bsktIds.length + "개의 상품이 " + (delivTypeCd === "01" ? "당일" : "새벽") + "배송으로 옮겨갔습니다.").then(dialog => {
            this.getBskt("S");
          });
        }
      }
    },
    getItemCnt(supplFirmDtoList) {
      let cnt = 0;
      for (let idx=0; idx<supplFirmDtoList.length; idx++) {
        for (let jdx=0; jdx<supplFirmDtoList[idx].bsktInqRsltDtoList.length; jdx++) {
          cnt++;
        }
        for (let jdx=0; jdx<supplFirmDtoList[idx].soldoutBsktInqRsltDtoList.length; jdx++) {
          cnt++;
        }
      }
      return cnt;
    },
    selectMbrDlvp(mbrDlvp) {
      this.mbrDlvpTemp = mbrDlvp;
    },
    async changeMbrDlvp(baseDlvpYn) {
      if (baseDlvpYn === true) {
        const iput = {
          cmmMbrNo: this.mbrDlvpTemp.cmmMbrNo,
          mbrDlvpSeqno: this.mbrDlvpTemp.mbrDlvpSeqno,
          baseDlvpYn: 'Y',
          dlvpNm: this.mbrDlvpTemp.dlvpNm,
          zipcd: this.mbrDlvpTemp.zipcd,
          lotnoAddr: this.mbrDlvpTemp.encLotnoBaseAddr,
          stnmAddr: this.mbrDlvpTemp.encStnmBaseAddr,
          dtlAddr: this.mbrDlvpTemp.encLotnoDtlAddr,
          adrsNm: this.mbrDlvpTemp.encAdrsNm,
          moblTelNo: this.mbrDlvpTemp.encMoblTelNo,
          telNo: this.mbrDlvpTemp.encTelNo,
          useYn: this.mbrDlvpTemp.useYn,
          itemDlvrMethoCd: this.mbrDlvpTemp.itemDlvrMethoCd,
          itemDlvrMethoAddCd: this.mbrDlvpTemp.itemDlvrMethoAddCd,
          itemDlvrMethoDtlCnts: this.mbrDlvpTemp.itemDlvrMethoDtlCnts,
          delivInfmTmznCd: this.mbrDlvpTemp.delivInfmTmznCd,
          delivMsgCnts: this.mbrDlvpTemp.delivMsgCnts,
        };
        this.showLoading(true);
        const result = await ApiUtils.put('/fo/cu/mypgmgnt/deliveryplace', iput);
        this.showLoading(false);

        if (result.data.success) {
          this.mbrDlvp = this.mbrDlvpTemp;
          JwtUtils.saveEncVal(result.data.data.encVal);
          /* 새벽배송 요청으로 수정
          CookieUtils.setCookie('STOR_ID', result.data.data.storId);
          CookieUtils.setCookie('SUPPL_FIRM_CD', result.data.data.supplFirmCd);
          CookieUtils.setCookie('SIMPLE_STOR_ID', result.data.data.simpleStorId);
          CookieUtils.setCookie('SIMPLE_SUPPL_FIRM_CD', result.data.data.simpleSupplFirmCd);
          CookieUtils.setCookie('SIMPLE_MALL_ID', result.data.data.simpleMallId);
          */
          if (CookieUtils.isDaybreak()) {
            const dayBreakStorId = result.data.data.daybreakStorId == '' ? '2287' : result.data.data.daybreakStorId;
            const dayBreakSf = result.data.data.daybreakSupplFirmCd == '' ? '31005' : result.data.data.daybreakSupplFirmCd;
            CookieUtils.setCookie('ORG_STOR_ID', result.data.data.storId);
            CookieUtils.setCookie('ORG_SUPPL_FIRM_CD', result.data.data.supplFirmCd);
            CookieUtils.setCookie('STOR_ID', dayBreakStorId);
            CookieUtils.setCookie('SUPPL_FIRM_CD', dayBreakSf);
          } else {
            CookieUtils.setCookie('STOR_ID', result.data.data.storId);
            CookieUtils.setCookie('SUPPL_FIRM_CD', result.data.data.supplFirmCd);
          }
          CookieUtils.setCookie('SIMPLE_STOR_ID', result.data.data.simpleStorId);
          CookieUtils.setCookie('SIMPLE_SUPPL_FIRM_CD', result.data.data.simpleSupplFirmCd);
          CookieUtils.setCookie('SIMPLE_MALL_ID', result.data.data.simpleMallId);
          this.getBskt("U");
        } else {
          this.$gsdialog.alert(result.data.statusMessage);
        }
      } else {
        this.mbrDlvp = this.mbrDlvpTemp;
        this.getBskt("U");
      }
    },
    openCouponPopup(itemCpnList, dblDcCpnList, itemNm, bsktId, itemDcSprc, bsktQty, cmplDcAmt) {
      this.itemCpnList = itemCpnList;
      this.dblDcCpnList = dblDcCpnList;
      this.itemNm = itemNm;
      this.bsktId = bsktId;
      this.itemDcSprc = itemDcSprc;
      this.bsktQty = bsktQty;
      this.cmplDcAmt = cmplDcAmt;
      this.popup['popupCouponList'] = !this.popup['popupCouponList'];
      this.popup.open = !this.popup.open;
    },
    useCpn(itemCpnInfo, dblDcCpnInfo, bsktId, rcmdCpnApplYn) {
      cpnUseLoop:
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
          for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
            if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId === bsktId) {
              let cpnDcAmt = 0;
              const bskt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx];
              let prevCpnDcAmt = bskt.itemCpnDcAmt;
              for (let mdx=0; mdx<this.bsktInqRsltDto.applItemCpnList.length; mdx++) {
                if (this.bsktInqRsltDto.applItemCpnList[mdx].bsktId === bsktId) { // 상품에 쓰여진 쿠폰이 있으면 해제
                  this.bsktInqRsltDto.applItemCpnList.splice(mdx, 1);
                }
              }

              const $this = this;
              if (itemCpnInfo !== '') {
                const cpnInfo = itemCpnInfo.split(":");
                if (bskt.ordsItemCpnPromExpnsInqRsltList !== null) {
                  const applItemCpnList = this.bsktInqRsltDto.applItemCpnList;
                  bskt.ordsItemCpnPromExpnsInqRsltList.forEach(function (cpn, idx) {
                    cpn.applYn = false;
                    if (cpn.cmmMbrNo == cpnInfo[0] && cpn.promId == cpnInfo[1] && cpn.cpnIsseSeqno == cpnInfo[2]) {
                      for (let mdx=0; mdx<applItemCpnList.length; mdx++) {
                        if (cpn.cmmMbrNo === applItemCpnList[mdx].cmmMbrNo &&
                          cpn.promId === applItemCpnList[mdx].promId &&
                          cpn.cpnIsseSeqno === applItemCpnList[mdx].cpnIsseSeqno) {// 쿠폰이 쓰여진 다른 상품이 있으면 해제
                            $this.useCnclCpn('item', applItemCpnList[mdx].bsktId); // 실제 적용 쿠폰 삭제 및 금액 변경
                            break;
                        }
                      }

                      cpn.applYn = true;
                      cpnDcAmt = cpn.dcAmt;
                      const applItemCpn = {};
                      applItemCpn.bsktId = cpn.bsktId;
                      applItemCpn.promId = cpn.promId;
                      applItemCpn.cmmMbrNo = cpn.cmmMbrNo;
                      applItemCpn.cpnIsseSeqno = cpn.cpnIsseSeqno;
                      applItemCpn.dcAmt = cpn.dcAmt;
                      applItemCpn.itemNm = bskt.itemNm;
                      applItemCpn.maxBeneYn = rcmdCpnApplYn;
                      applItemCpnList.push(applItemCpn);
                    }
                  });
                }
              } else {
                if (bskt.ordsItemCpnPromExpnsInqRsltList !== null) {
                  bskt.ordsItemCpnPromExpnsInqRsltList.forEach(function (cpn, idx) {
                      cpn.applYn = false;
                  });
                }
              }

              this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemCpnDcAmt = cpnDcAmt;
              if (bskt.chk) {
                this.bsktInqRsltDto.delivTypeDtoList[jdx].itemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                this.bsktInqRsltDto.totItemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].itemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].presList) {
                  for (let ndx=0; ndx<this.bsktInqRsltDto.delivTypeDtoList[jdx].presList.length; ndx++) {
                    for (let odx=0; odx<this.bsktInqRsltDto.delivTypeDtoList[jdx].presList[ndx].promApplSbjItemList.length; odx++) {
                      if (this.bsktInqRsltDto.delivTypeDtoList[jdx].presList[ndx].promApplSbjItemList[odx].itemId === bskt.itemId) {
                        this.bsktInqRsltDto.delivTypeDtoList[jdx].presList[ndx].ordAmt -= (cpnDcAmt - prevCpnDcAmt);
                      }
                    }
                  }
                }
              }

              cpnDcAmt = 0;
              prevCpnDcAmt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dblDcCpnDcAmt;
              for (let mdx=0; mdx<this.bsktInqRsltDto.applDblDcCpnList.length; mdx++) {
                if (this.bsktInqRsltDto.applDblDcCpnList[mdx].bsktId === bsktId) { // 상품에 쓰여진 쿠폰이 있으면 해제
                  this.bsktInqRsltDto.applDblDcCpnList.splice(mdx, 1);
                }
              }

              if (dblDcCpnInfo !== '') {
                const cpnInfo = dblDcCpnInfo.split(":");
                if (bskt.ordsDblDcCpnPromExpnsInqRsltDtoList !== null) {
                  const applDblDcCpnList = this.bsktInqRsltDto.applDblDcCpnList;
                  bskt.ordsDblDcCpnPromExpnsInqRsltDtoList.forEach(function (cpn, idx) {
                    cpn.applYn = false;
                    if (cpn.cmmMbrNo == cpnInfo[0] && cpn.promId == cpnInfo[1] && cpn.cpnIsseSeqno == cpnInfo[2]) { // 더블할인 쿠폰의 경우, 상품쿠폰 적용에 따라서 적용금액이 달라질 수 있기때문에 정률일 경우 재계산한다.
                      for (let mdx=0; mdx<applDblDcCpnList.length; mdx++) {
                        if (cpn.cmmMbrNo === applDblDcCpnList[mdx].cmmMbrNo &&
                          cpn.promId === applDblDcCpnList[mdx].promId &&
                          cpn.cpnIsseSeqno === applDblDcCpnList[mdx].cpnIsseSeqno) {// 쿠폰이 쓰여진 다른 상품이 있으면 해제
                            $this.useCnclCpn('dbl', applDblDcCpnList[mdx].bsktId); // 실제 적용 쿠폰 삭제 및 금액 변경
                            break;
                        }
                      }
                      cpn.applYn = true;
                      if (cpn.dcTypeCd === 'R') {
                        const itemDcSprc = (bskt.itemDcSprc * bskt.bsktQty) - bskt.cmplDcAmt - bskt.itemCpnDcAmt;
                        const itemDcAmt = Math.floor(itemDcSprc / bskt.bsktQty / 10) * 10;
                        cpnDcAmt = Math.ceil(itemDcAmt * cpn.beneApplVal / 1000) * 10 * bskt.bsktQty;
                        if (cpn.maxDcAmt < cpnDcAmt) {
                          cpnDcAmt = cpn.maxDcAmt;
                        }
                      } else {
                        cpnDcAmt = cpn.dcAmt;
                      }
                      const applDblDcCpn = {};
                      applDblDcCpn.bsktId = cpn.bsktId;
                      applDblDcCpn.promId = cpn.promId;
                      applDblDcCpn.cmmMbrNo = cpn.cmmMbrNo;
                      applDblDcCpn.cpnIsseSeqno = cpn.cpnIsseSeqno;
                      applDblDcCpn.dcAmt = cpnDcAmt;
                      applDblDcCpn.itemNm = bskt.itemNm;
                      applDblDcCpn.maxBeneYn = rcmdCpnApplYn;
                      applDblDcCpnList.push(applDblDcCpn);
                    }
                  });
                }
              } else {
                if (bskt.ordsDblDcCpnPromExpnsInqRsltDtoList !== null) {
                  bskt.ordsDblDcCpnPromExpnsInqRsltDtoList.forEach(function (cpn, idx) {
                    cpn.applYn = false;
                  });
                }
              }

              this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dblDcCpnDcAmt = cpnDcAmt;
              if (bskt.chk) {
                this.bsktInqRsltDto.delivTypeDtoList[jdx].dblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                this.bsktInqRsltDto.totDblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].dblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].presList) {
                  for (let ndx=0; ndx<this.bsktInqRsltDto.delivTypeDtoList[jdx].presList.length; ndx++) {
                    for (let odx=0; odx<this.bsktInqRsltDto.delivTypeDtoList[jdx].presList[ndx].promApplSbjItemList.length; odx++) {
                      if (this.bsktInqRsltDto.delivTypeDtoList[jdx].presList[ndx].promApplSbjItemList[odx].itemId === bskt.itemId) {
                        this.bsktInqRsltDto.delivTypeDtoList[jdx].presList[ndx].ordAmt -= (cpnDcAmt - prevCpnDcAmt);
                      }
                    }
                  }
                }
              }

              break cpnUseLoop;
            }
          }
        }
      }
      this.maxBnftYn = 'X';
      this.calcDlfee();
    },
    useCnclCpn(type, bsktId) {
      cpnUseLoop:
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
          for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
            if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId === bsktId) {
              if (type === 'item') {
                const cpnDcAmt = 0;
                const prevCpnDcAmt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemCpnDcAmt;
                for (let mdx=0; mdx<this.bsktInqRsltDto.applItemCpnList.length; mdx++) {
                  if (this.bsktInqRsltDto.applItemCpnList[mdx].bsktId === bsktId) { // 상품에 쓰여진 쿠폰이 있으면 해제
                    this.bsktInqRsltDto.applItemCpnList.splice(mdx, 1);
                  }
                }
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList !== null) {
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList.forEach(function (cpn, idx) {
                    cpn.applYn = false;
                  });
                }

                this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemCpnDcAmt = cpnDcAmt;
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].itemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  this.bsktInqRsltDto.totItemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].itemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].presList) {
                    for (let ndx=0; ndx<this.bsktInqRsltDto.delivTypeDtoList[jdx].presList.length; ndx++) {
                      for (let odx=0; odx<this.bsktInqRsltDto.delivTypeDtoList[jdx].presList[ndx].promApplSbjItemList.length; odx++) {
                        if (this.bsktInqRsltDto.delivTypeDtoList[jdx].presList[ndx].promApplSbjItemList[odx].itemId === this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemId) {
                          this.bsktInqRsltDto.delivTypeDtoList[jdx].presList[ndx].ordAmt -= (cpnDcAmt - prevCpnDcAmt);
                        }
                      }
                    }
                  }
                }
              }

              if (type === 'dbl') {
                const cpnDcAmt = 0;
                const prevCpnDcAmt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dblDcCpnDcAmt;
                for (let mdx=0; mdx<this.bsktInqRsltDto.applDblDcCpnList.length; mdx++) {
                  if (this.bsktInqRsltDto.applDblDcCpnList[mdx].bsktId === bsktId) { // 상품에 쓰여진 쿠폰이 있으면 해제
                    this.bsktInqRsltDto.applDblDcCpnList.splice(mdx, 1);
                  }
                }

                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList !== null) {
                  const applDblDcCpnList = this.bsktInqRsltDto.applDblDcCpnList;
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList.forEach(function (cpn, idx) {
                    cpn.applYn = false;
                  });
                }

                this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dblDcCpnDcAmt = cpnDcAmt;
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].dblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  this.bsktInqRsltDto.totDblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].dblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].presList) {
                    for (let ndx=0; ndx<this.bsktInqRsltDto.delivTypeDtoList[jdx].presList.length; ndx++) {
                      for (let odx=0; odx<this.bsktInqRsltDto.delivTypeDtoList[jdx].presList[ndx].promApplSbjItemList.length; odx++) {
                        if (this.bsktInqRsltDto.delivTypeDtoList[jdx].presList[ndx].promApplSbjItemList[odx].itemId === this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemId) {
                          this.bsktInqRsltDto.delivTypeDtoList[jdx].presList[ndx].ordAmt -= (cpnDcAmt - prevCpnDcAmt);
                        }
                      }
                    }
                  }
                }
              }

              break cpnUseLoop;
            }
          }
        }
      }
    },
    async goOrder() {
      if (!this.loginYn) {
        this.$gsdialog.alert('로그인해주세요.').then(dialog => {
          this.goLogin();
        });
        return;
      }
      if (!this.mbrDlvp.cmmMbrNo || this.mbrDlvp.cmmMbrNo === 0) {
        this.$gsdialog.alert('배송지를 선택해주세요.');
        return;
      } else if (!this.mbrDlvp.encMoblTelNo || isNaN(this.mbrDlvp.encMoblTelNo)) {
        this.$gsdialog.alert('배송지 연락처가 올바르지 않습니다.<br/>마이페이지 > 배송지관리 에서 연락처를 수정해주시기 바랍니다.', {html: true});
        return;
      } else if (!this.mbrDlvp.encAdrsNm || StringUtils.isEmpty(this.mbrDlvp.encAdrsNm)) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('수취인 정보'));
        return;
      } else if (!this.mbrDlvp.zipcd || StringUtils.isEmpty(this.mbrDlvp.zipcd)) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('우편번호'));
        return;
      } else if ((!this.mbrDlvp.encLotnoBaseAddr || StringUtils.isEmpty(this.mbrDlvp.encLotnoBaseAddr))
        && (!this.mbrDlvp.encStnmBaseAddr || StringUtils.isEmpty(this.mbrDlvp.encStnmBaseAddr))) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('주소지 정보'));
        return;
      } else if ((!this.mbrDlvp.encTelNo || StringUtils.isEmpty(this.mbrDlvp.encTelNo))
        && (!this.mbrDlvp.encMoblTelNo || StringUtils.isEmpty(this.mbrDlvp.encMoblTelNo))) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('연락처'));
        return;
      }

      if (this.bsktInqRsltDto.firstBuyPresList.map(each => each.promApplItemList.length).reduce((p, c) => p + c, 0) > 0
      && !this.firstBuyPresInfo) {
        try {
          const confirmed = await this.$gsdialog.confirm('장바구니에 첫구매딜 상품을 담지 않으셨어요.<br/>GS fresh mall 인기상품을 초특가로<br/>구매할 수 있는 첫구매딜 기회를 놓치지 마세요!', {html: true});
          if (confirmed) {
            return;
          }
        } catch (error) {
        }
      }

      /*
        if (this.samplePresInfo && this.samplePresInfo.chk !== true) {
          if (!confirm('맛보기 상품에 배송비가 발생됩니다. 주문하시겠습니까?')) {
            return;
          }
        }

        if (this.firstBuyPresInfo && this.firstBuyPresInfo.chk !== true) {
          if (!confirm('첫 구매 상품에 배송비가 발생됩니다. 주문하시겠습니까?')) {
            return;
          }
        }
      */

      const cartFirstItemId = CookieUtils.getCookie('cartFirstItemId'); // 선택한 첫구매 상품 아이디

      let firstBuyPresInfoSupplFirmCd = null; // 선택한 첫구매 상품 공급사업장 코드
      if (cartFirstItemId && this.firstBuyPresInfo) {
        firstBuyPresInfoSupplFirmCd = this.firstBuyPresInfo.supplFirmCd;
      } else {
        CookieUtils.deleteCookie('cartFirstItemId');
      }

      let itemNms = "";
      let totItemCnt = 0;
      let dailyItemCnt = 0;
      let reservationItemCnt = 0;

        // 당일 배송 상품이 품절로 전국 택배로 바뀔 경우 알림
        const moveItemList = [];
        for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
          const eachDelivType = this.bsktInqRsltDto.delivTypeDtoList[jdx];
          if (eachDelivType.delivTypeCd !== '02') {
              continue;
          }

          console.log('eachDelivType', eachDelivType);
          for (let kdx = 0; kdx < eachDelivType.supplFirmDtoList.length; kdx++) {
            const eachSupplFirmDto = eachDelivType.supplFirmDtoList[kdx];
            console.log('eachDelivType.supplFirmDtoList.bsktInqRsltDtoList', eachSupplFirmDto.bsktInqRsltDtoList);
            eachSupplFirmDto.bsktInqRsltDtoList
                .filter(each => each.orgDelivTypeCd === '01')
                .filter(each => each.chk)
                .forEach(each => {
                moveItemList.push(each);
            });
          }
        }
        console.log('moveItemList', moveItemList);
        if (moveItemList.length > 0) {
          let moveItemConfirm;
          await this.$gsdialog.confirm(OrderMsg.delivTypeChangeItemExists, {html: true})
              .then(() => moveItemConfirm = true)
              .catch(() => moveItemConfirm = false);
          console.log('moveItemConfirm', moveItemConfirm);
          if (!moveItemConfirm) {
              return;
          }
        }

      const storIdSet = new Set();
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        const e = this.bsktInqRsltDto.delivTypeDtoList[jdx];

        for (let kdx=0; kdx<e.supplFirmDtoList.length; kdx++) {
          for (let ldx=0; ldx<e.supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
            const item = e.supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx];
            if (item.chk) {
              totItemCnt++;

              if ((item.delivTypeCd == '01' || item.delivTypeCd == '02' || item.delivTypeCd == '04') && item.ordTypeCd != '50') {
                dailyItemCnt++;
                storIdSet.add(item.storId);
              }

              if (item.ordTypeCd == '50' ) {
                reservationItemCnt++;
              }
            }
          }
          for (let ldx=0; ldx<e.supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList.length; ldx++) {
            if (e.supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].chk) {
              if (itemNms !== '') {
                itemNms += '<br/>';
              }
              itemNms += e.supplFirmDtoList[kdx].soldoutBsktInqRsltDtoList[ldx].itemNm;
            }
          }
        }
      }

      if (cartFirstItemId != '' && this.firstBuyPresInfo) {
        if (!storIdSet.has(this.firstBuyPresInfo.storId)) {
          this.$gsdialog.alert('상품을 추가로 담으면 첫구매딜 상품과 함께 구매가 가능해요 ! (단, 업체택배/사전예약 상품 제외)');
          return;
        }

        if (dailyItemCnt == 0 && reservationItemCnt > 0) {
          this.$gsdialog.alert('첫구매딜 상품은 사전예약과 함께 주문 불가합니다.');
          return;
        }
      }

      /* if (firstBuyPresInfoSupplFirmCd && !itemSupplFirmCdList.includes(firstBuyPresInfoSupplFirmCd)) {
        // 첫구매 상품과 주문 상품의 공급사업장 코드가 다르면 주문 불가
        this.$gsdialog.alert('상품을 추가로 담으면 첫구매딜 상품과 함께 구매가 가능해요 ! (단, 업체택배/사전예약 상품 제외)');
        return;
      }

      if (this.firstBuyPresInfo) {
        const reservationMsg = '첫구매딜 상품은 사전예약과 함께 주문 불가합니다.';
        if (cartFirstItemId != '') {
          if (dailyItemCnt == 0 && reservationItemCnt > 0) {
            this.$gsdialog.alert(reservationMsg);
            return;
          }
        }

        const msg = '상품을 추가로 담으면 첫구매딜 상품과 함께 구매가 가능해요 ! (단, 업체택배/사전예약 상품 제외)';
        if (cartFirstItemId == '') {
          if (firstBuyGiftCnt <= 0) {
            this.$gsdialog.alert(msg);
            return;
          }
        }

        if (cartFirstItemId != '' && dailyItemCnt == 0) {
          this.$gsdialog.alert(msg);
          return;
        }
      } */

      if (totItemCnt <= 0) {
        this.$gsdialog.alert('상품을 하나 이상 선택해주세요.');
        return;
      }
      if (itemNms !== '') {
        this.$gsdialog.confirm("품절 상품을 제외하고 주문하시겠습니까?<br/>" + itemNms, {html: true}).then(async dialog => {
          this.order2();
        });
      } else {
        this.order2();
      }
    },
    async order2() {
      const bsktOptDlvpInfoList = [];
      const bsktOptDlvpInfo = {};
      const bsktOptDelivTypeGrpInfoList = [];
      const bsktOptFpurchItemInfoList = [];
      const bsktOptTasteItemInfoList = [];
      let bsktOptDelivTypeGrpInfo = {};
      let bsktOptItemInfoList = [];
      let bsktOptItemInfo = {};
      let bsktOptItemCpnInfoList = [];
      let bsktOptDblDcCpnInfoList = [];
      let bsktOptItemCpnInfo = {};
      let bsktOptDblDcCpnInfo = {};
      bsktOptDlvpInfo.mbrDlvpSeqno = this.mbrDlvp.mbrDlvpSeqno;
      let delivTypeCd = '';
      let msg = '';
      let sumDelivChkYn = null;
      let sumDawnDelivChkYn = null;
      let apchItemYn = 'N';
      let spckItemYn = 'N';
      let clsItemYn = 'N';
      let lunchPackedItemYn = 'N';
      const map = new Map();

      let delivPolcId = '';
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        if (this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd === '01') {
          delivPolcId = this.bsktInqRsltDto.delivTypeDtoList[jdx].delivPolcId;
          break;
        }
      }

      if (delivPolcId != null && delivPolcId !== '') {
        this.showLoading(true);
        const result3 = await ApiUtils.get('/fo/od/bsktmgnt/check-deliv-today', {delivPolcId: delivPolcId});
        this.showLoading(false);
        this.todayDelivYn = result3.data.data.todayDelivYn;
        this.nextDayDelivYn = result3.data.data.nextDayDelivYn;
        this.apchItemDelivYn = result3.data.data.apchItemDelivYn;
      }

      loop:
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        bsktOptDelivTypeGrpInfo.ordTypeCd = this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd;
        bsktOptDelivTypeGrpInfo.delivTypeCd = this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd;
        delivTypeCd = bsktOptDelivTypeGrpInfo.delivTypeCd;
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
          for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
            if (delivTypeCd != ''
              && delivTypeCd != this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].delivTypeCd) {
              bsktOptDelivTypeGrpInfo.bsktOptItemInfoList = bsktOptItemInfoList;

              if (bsktOptItemInfoList && bsktOptItemInfoList.length > 0) {
                bsktOptDelivTypeGrpInfoList.push(bsktOptDelivTypeGrpInfo);
              }

              bsktOptItemInfoList = [];
              bsktOptDelivTypeGrpInfo = {};

              bsktOptDelivTypeGrpInfo.ordTypeCd = this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd;
              bsktOptDelivTypeGrpInfo.delivTypeCd = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].delivTypeCd;
            }
            if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].delivTypeCd === '01'
                && this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordTypeCd === '10') {
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].apchItemYn === 'Y') {
                  apchItemYn = 'Y';
                }
                /*
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].onedaySaleItemYn === 'Y') {
                  clsItemYn = 'Y';
                }
                */
                if (!StringUtils.isEmpty(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].todaySaleCtgNm)) {
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dspCtgId === 'G1008001') {
                    lunchPackedItemYn = 'Y';
                  } else {
                    clsItemYn = 'Y';
                  }
                }
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].spckItemYn === 'Y') {
                  spckItemYn = 'Y';
                }
                msg = this.getAlertMsg(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx]);
                if (msg !== '') {
                  this.focusBsktId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId;
                  break loop;
                }
              }
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordTypeCd === '50'
                && this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].resvItemYn === 'N') {
                // this.setResvSpckItemMap(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx], map);
              }
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].nplusOneNoStsfYn2) {
                msg = '행사수량에 맞게 상품 수량을 수정해 주세요.';
                this.nplusOneNoStsfMsg = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].nplusOneNoStsfMsg;
                this.nplusOneNoStsfTitle = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].nplusOneNoStsfTitle;
                document.getElementById("chkList" + this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId).focus();
                this.popupAction('popupAlert2plus1');
                return;
              }
              msg = this.chkBsktQty(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx]);
              if (msg !== '') {
                this.focusBsktId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId;
                break loop;
              }
              /* if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].delivTypeCd === '05' && this.bsktInqRsltDto.pmbsJoinPrcnCd !== '0001') {
                msg = '해외직구 상품은 달리드림 회원만 구매 가능합니다.';
                this.focusBsktId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId;
                break loop;
              } */
              bsktOptItemInfo.bsktId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId;
              bsktOptItemInfo.relatBsktId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].relatBsktId;
              bsktOptItemInfo.storId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].storId;
              bsktOptItemInfo.supplFirmCd = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].supplFirmCd;
              bsktOptItemInfo.delivPolcId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].delivPolcId;
              bsktOptItemInfo.ssevntId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ssevntId;

              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList) {
                for (let mdx=0; mdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList.length; mdx++) {
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList[mdx].applYn) {
                    bsktOptItemCpnInfo.promId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList[mdx].promId;
                    bsktOptItemCpnInfo.cpnIsseSeqno = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList[mdx].cpnIsseSeqno;
                    bsktOptItemCpnInfoList.push(bsktOptItemCpnInfo);
                    bsktOptItemCpnInfo = {};
                  }
                }
              }

              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList) {
                for (let mdx=0; mdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList.length; mdx++) {
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList[mdx].applYn) {
                    bsktOptDblDcCpnInfo.promId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList[mdx].promId;
                    bsktOptDblDcCpnInfo.cpnIsseSeqno = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList[mdx].cpnIsseSeqno;
                    bsktOptDblDcCpnInfoList.push(bsktOptDblDcCpnInfo);
                    bsktOptDblDcCpnInfo = {};
                  }
                }
              }
              if (bsktOptItemCpnInfoList.length > 0) {
                bsktOptItemInfo.bsktOptItemCpnInfoList = bsktOptItemCpnInfoList;
              }
              if (bsktOptDblDcCpnInfoList.length > 0) {
                bsktOptItemInfo.bsktOptDblDcCpnInfoList = bsktOptDblDcCpnInfoList;
              }
              bsktOptItemInfoList.push(bsktOptItemInfo);

              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList) {
                for (let ndx=0; ndx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList.length; ndx++) {
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList[ndx].chk) {
                    bsktOptItemInfo = {};
                    bsktOptItemInfo.bsktId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList[ndx].bsktId;
                    bsktOptItemInfo.relatBsktId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList[ndx].relatBsktId;
                    bsktOptItemInfo.storId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList[ndx].storId;
                    bsktOptItemInfo.supplFirmCd = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList[ndx].supplFirmCd;
                    bsktOptItemInfo.delivPolcId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList[ndx].delivPolcId;
                    bsktOptItemInfo.ssevntId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].addItemList[ndx].ssevntId;
                    bsktOptItemInfoList.push(bsktOptItemInfo);
                  }
                }
              }

              for (let ndx=0; ndx<this.bsktInqRsltDto.frgfInfoList.length; ndx++) {
                if (this.bsktInqRsltDto.frgfInfoList[ndx].relatBsktId === this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId) {
                  bsktOptItemInfo = {};
                  bsktOptItemInfo.bsktId = this.bsktInqRsltDto.frgfInfoList[ndx].bsktId;
                  bsktOptItemInfo.relatBsktId = this.bsktInqRsltDto.frgfInfoList[ndx].relatBsktId;
                  bsktOptItemInfo.storId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].storId;
                  bsktOptItemInfo.supplFirmCd = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].supplFirmCd;
                  bsktOptItemInfo.delivPolcId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].delivPolcId;
                  bsktOptItemInfoList.push(bsktOptItemInfo);
                }
              }
              bsktOptItemInfo = {};
              bsktOptItemCpnInfoList = [];
              bsktOptDblDcCpnInfoList = [];
            }
            delivTypeCd = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].delivTypeCd;
          }
        }

        bsktOptDelivTypeGrpInfo.bsktOptItemInfoList = bsktOptItemInfoList;

        if (bsktOptItemInfoList && bsktOptItemInfoList.length > 0) {
          bsktOptDelivTypeGrpInfoList.push(bsktOptDelivTypeGrpInfo);
          sumDelivChkYn = bsktOptDelivTypeGrpInfo.delivTypeCd === '01' && bsktOptDelivTypeGrpInfo.ordTypeCd === '10' && (sumDelivChkYn === null || sumDelivChkYn === true);
          sumDawnDelivChkYn = bsktOptDelivTypeGrpInfo.delivTypeCd === '04' && bsktOptDelivTypeGrpInfo.ordTypeCd === '10' && (sumDawnDelivChkYn === null || sumDawnDelivChkYn === true);
        }

        bsktOptItemInfoList = [];
        bsktOptDelivTypeGrpInfo = {};
      }

      // 카테고리 상품 구매제한수량 체크
      const chkBsktIdList = [];
      const bsktCtgPurchRestrInput = {};
      for ( let i = 0; i < bsktOptDelivTypeGrpInfoList.length; i++ ) {
        for ( let j = 0; j < bsktOptDelivTypeGrpInfoList[i].bsktOptItemInfoList.length; j++ ) {
          chkBsktIdList.push( bsktOptDelivTypeGrpInfoList[i].bsktOptItemInfoList[j].bsktId );
        }
      }
      bsktCtgPurchRestrInput.bsktIds = chkBsktIdList;
      const bsktCtgPurchRestrResult = await ApiUtils.post( '/fo/od/bsktmgnt/ctg-purch-restr', bsktCtgPurchRestrInput );
      if ( !bsktCtgPurchRestrResult.data.success ) {
        this.$gsdialog.alert( bsktCtgPurchRestrResult.data.statusMessage );
        return;
      }

      // 첫구매 상품 존재 시 push
      if (this.firstBuyPresInfo != null && !StringUtils.isEmpty(this.firstBuyPresInfo.promId)) {
        const promApplSbjItemList = this.bsktInqRsltDto.firstBuyPresList[0].promApplSbjItemList;
        if (promApplSbjItemList != null) {
          for (let i = 0; i < promApplSbjItemList.length; i++) {
            if (promApplSbjItemList[i].promId === this.firstBuyPresInfo.promId) {
              this.firstBuyPresInfo.orgItemId = promApplSbjItemList[i].itemId;
              break;
            }
          }
        }
        bsktOptFpurchItemInfoList.push(this.firstBuyPresInfo);
        bsktOptDlvpInfo.bsktOptFpurchItemInfoList = bsktOptFpurchItemInfoList;
      }

      // 맛보기 상품 존재 시 push
      if (this.samplePresInfo != null && !StringUtils.isEmpty(this.samplePresInfo.promId)) {
        const promApplSbjItemList = this.bsktInqRsltDto.samplePresList[0].promApplSbjItemList;
        if (promApplSbjItemList != null) {
          for (let i = 0; i < promApplSbjItemList.length; i++) {
            if (promApplSbjItemList[i].promId === this.samplePresInfo.promId) {
              this.samplePresInfo.orgItemId = promApplSbjItemList[i].itemId;
              break;
            }
          }
        }
        bsktOptTasteItemInfoList.push(this.samplePresInfo);
        bsktOptDlvpInfo.bsktOptTasteItemInfoList = bsktOptTasteItemInfoList;
      }

      if (map) {
        if (map.size !== 0 && map.size < 3) {
          msg = '심플리쿡 식단예약 상품은 3개 이상 구매 가능합니다';
          loop5:
          for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
            if (this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd === '50') {
              for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
                for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].resvItemYn === 'N') {
                    this.focusBsktId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId;
                  }
                }
              }
            }
          }
        }
      }
      if (msg !== '') {
        this.$gsdialog.alert(msg, {html: true});
        document.getElementById("chkList" + this.focusBsktId).focus();
        return;
      }
      if (bsktOptDelivTypeGrpInfoList.length !== 1) {
        sumDelivChkYn = false;
        sumDawnDelivChkYn = false;
      }
      bsktOptDlvpInfo.bsktOptDelivTypeGrpInfoList = bsktOptDelivTypeGrpInfoList;
      bsktOptDlvpInfoList.push(bsktOptDlvpInfo);
      this.goOrderPut.bsktOptDlvpInfoList = bsktOptDlvpInfoList;

      if (sumDelivChkYn) {
          const iPut = {
              storId: this.mbrDlvp.storId,
              supplFirmCd: this.mbrDlvp.supplFirmCd,
              apchItemYn: apchItemYn,
              spckItemYn: spckItemYn,
              lunchPackedItemYn: lunchPackedItemYn,
              clsItemYn: clsItemYn,
              todayDelivYn: this.todayDelivYn,
              mbrDlvpSeqno: this.mbrDlvp.mbrDlvpSeqno,
          };

        this.showLoading(true);
        const result2 = await ApiUtils.get('/fo/od/bsktmgnt/sum-delivery-possible-order', iPut);
        this.showLoading(false);
        // 합배송 가능 주문 조회
        this.sumDelivList = result2.data.data;
        console.log(this.sumDelivList);
        if (this.sumDelivList && this.sumDelivList.length > 0) {
          this.popupAction('popupSumDeliv');
          return;
        }
      }

      /*
      // 20200929 김준오 - DEPBOSFR-5603 새벽배송 합배송 처리 : 주문서 - 주문완료까지 제대로 처리되는지 테스트가 필요합니다.
      if (sumDawnDelivChkYn) {
        const iPut = {
          storId: this.mbrDlvp.dawnStorId,
          supplFirmCd: this.mbrDlvp.dawnSupplFirmCd
        };

        const result2 = await ApiUtils.get('/fo/od/bsktmgnt/sum-dawn-delivery-possible-order', iPut);
        // 합배송 가능 주문 조회
        this.sumDelivList = result2.data.data;
        console.log(this.sumDelivList);
        if (this.sumDelivList && this.sumDelivList.length > 0) {
          this.popupAction('popupSumDeliv');
          return;
        }
      }
      */

      console.log(this.goOrderPut);
      this.order('', '');
      // bsktOptDlvpInfoList
      // this.$emit('popupEvent', 'popupCertification'); // 정유인증 팝업 활성화
    },
    async order(ordId, delivId) { // 합배송으로 인한 수정
      if (!LoginUtils.isLogin()) {
        this.$gsdialog.alert("로그인해주세요.").then(dialog => {
          this.getBskt("S");
        });
      } else {
        this.goOrderPut.bsktOptDlvpInfoList[0].bundlDelivOrdId = ordId;
        this.goOrderPut.bsktOptDlvpInfoList[0].bundlDelivId = delivId;
        this.firstBuyPresInfo && (this.goOrderPut.bsktOptDlvpInfoList[0].bsktOptFpurchItemInfoList = [this.firstBuyPresInfo]);
        this.samplePresInfo && (this.goOrderPut.bsktOptDlvpInfoList[0].bsktOptTasteItemInfoList = [this.samplePresInfo]);
        this.showLoading(true);
        const result = await ApiUtils.post('/fo/od/ordsmgnt/ordersheet', this.goOrderPut);
        this.showLoading(false);
        const data = result.data.data;

        if (result.data.success) {
          this.$store.state.ordId = data.ordId;
          this.$router.push({name: 'ordersheet', params: {ordId: data.ordId}});
        } else {
          this.$gsdialog.alert(result.data.statusMessage);
        }
      }
    },
    async goGift() {
      if (!this.loginYn) {
        this.$gsdialog.alert('로그인해주세요.').then(dialog => {
          this.goLogin();
        });
        return;
      }
      const bsktIds = [];
      let msg = '';
      if (this.bsktInqRsltDto !== null && Object.entries(this.bsktInqRsltDto).length !== 0) {
        for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
          if (this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd === '10' && (this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd === '01' || this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd === '02' || this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd === '03') ) {
            for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
              for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                const bskt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx];
                if (bskt.chk) {
                  if ((bskt.delivTypeCd === '01' || bskt.delivTypeCd === '02') && bskt.spckItemYn === 'Y') {
                    msg = '심플리쿡 상품은 택배배송 상품만<br/>선물하기가 가능합니다.<br/>선물할 상품을 다시 확인해 주세요.';
                  } else {
                    bsktIds.push(bskt.bsktId);
                  }
                }
              }
            }
          } else {
            for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
              for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                const bskt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx];
                if (bskt.chk) {
                  msg = '예약, 새벽, 해외직구 상품은 선물이 불가합니다.<br/>선물할 상품을 다시 확인해 주세요.';
                }
              }
            }
          }
        }
      }

      if (msg !== '') {
        this.$gsdialog.alert(msg, {html: true});
        return;
      }

      if (bsktIds.length === 0) {
        this.$gsdialog.alert('상품을 하나 이상 선택해주세요.');
        return;
      } else {
        const cartFirstItemId = CookieUtils.getCookie('cartFirstItemId'); // 첫구매 상품 선택 아이템 아이디
        if (cartFirstItemId != '') {
          this.$gsdialog.alert('첫구매 상품은 선물하기가 가능하지 않습니다.<br/>다음번에 다른 상품으로 선물하기를 이용하여 주세요.', {html: true});
          return;
        }

        this.$gsdialog.confirm("선택한 " + bsktIds.length + "건의 상품을 선물하시겠습니까?").then(async dialog => {
          this.bsktIds = bsktIds;
          const iBsktPut = {};
          const mbrDlvpList = [];
          iBsktPut.bsktIds = this.bsktIds;
          mbrDlvpList.push(this.mbrDlvp);
          iBsktPut.mbrDlvpList = mbrDlvpList;
          iBsktPut.mallId = CookieUtils.getMallId();
          // 장바구니 복사
          this.showLoading(true);
          const result = await ApiUtils.post('/fo/od/giftMgnt/gift-basket-item-proc', iBsktPut);
          this.showLoading(false);
          if (result.data.success) {
            console.log(result.data.data);
            localStorage.removeItem('GiftGiveCart');
            localStorage.setItem('GiftGiveCart', JSON.stringify(result.data.data));
            this.$router.push({name: 'GiftGiveCart'});
          }
        });
      }
    },
    checkExistsDelivType(delivTypeCd) {
      let isExists = false;
      if (this.bsktInqRsltDto) {
        for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
          if (this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd === '10' && this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd === delivTypeCd) {
            isExists = true;
            break;
          }
        }
      }

      return isExists;
    },
    openFreeGiftPopup(bsktId, pres, promBeneZoneList) {
      this.bsktId = bsktId;
      this.pres = pres;
      this.promBeneZoneList = promBeneZoneList;
      /*
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
          for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
            if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId === bsktId) {
              for (let mdx=0; mdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList.length; mdx++) {
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList[mdx].promId === promBeneZoneList.promId) {
                  for (let ndx=0; ndx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList[mdx].promBeneZoneList.length; ndx++) {
                    if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList[mdx].promBeneZoneList[ndx].promBeneSeqno === promBeneZoneList.promBeneSeqno) {

                    }
                  }
                }
              }
            }
          }
        }
      }
      */
      let type = 'popupGiftSingle';
      if (pres.presPrvdOptPosbQty > 1) {
        type = 'popupGiftDouble';
      }

      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    async changeFrgf(promBeneZoneList) {
      const frgfInfoList = [];
      console.log(promBeneZoneList);
      for (let idx=0; idx<promBeneZoneList.promPresFrgfList.length; idx++) {
        if (promBeneZoneList.promPresFrgfList[idx].selYn === 'Y') {
          const frgfInfo = {};
          frgfInfo.bsktQty = promBeneZoneList.promPresFrgfList[idx].selQty;
          frgfInfo.promId = promBeneZoneList.promPresFrgfList[idx].promId;
          frgfInfo.promBeneSeqno = promBeneZoneList.promPresFrgfList[idx].promBeneSeqno;
          frgfInfo.promPresFrgfSeqno = promBeneZoneList.promPresFrgfList[idx].promPresFrgfSeqno;

          frgfInfoList.push(frgfInfo);
        }
      }
      const result = await Basket.putFrgf(this.bsktId, frgfInfoList);
      const frgfInfoListTemp = [];
      for (let idx=0; idx<this.bsktInqRsltDto.frgfInfoList.length; idx++) {
        const frgfInfo = this.bsktInqRsltDto.frgfInfoList[idx];
        if (this.bsktId === frgfInfo.relatBsktId && promBeneZoneList.promId === frgfInfo.promId && promBeneZoneList.promBeneSeqno === frgfInfo.promBeneSeqno) {
        } else {
          frgfInfoListTemp.push(frgfInfo);
        }
      }

      this.bsktInqRsltDto.frgfInfoList = frgfInfoListTemp;

      for (let idx=0; idx<result.data.data.frgfInfoList.length; idx++) {
        this.bsktInqRsltDto.frgfInfoList.push(result.data.data.frgfInfoList[idx]);
      }
      const bsktInqRsltDto = JSON.parse(JSON.stringify(this.bsktInqRsltDto));
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
          for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
            if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId === this.bsktId) {
              for (let mdx=0; mdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList.length; mdx++) {
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList[mdx].promId === promBeneZoneList.promId) {
                  for (let ndx=0; ndx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList[mdx].promBeneZoneList.length; ndx++) {
                    if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList[mdx].promBeneZoneList[ndx].promBeneSeqno === promBeneZoneList.promBeneSeqno) {
                      bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList[mdx].promBeneZoneList[ndx] = promBeneZoneList;
                    }
                  }
                }
              }
            }
          }
        }
      }

      this.bsktInqRsltDto = bsktInqRsltDto;
    },
    async getCmplItemList(cmplInfo) {
      try {
        const params = {
          promId: cmplInfo.cmpl.promId,
          itemGrpVal: cmplInfo.cmpl.itemGrpVal,
          storId: cmplInfo.storId,
          supplFirmCd: cmplInfo.supplFirmCd,
          mallId: cmplInfo.mallId,
        };
        // this.showLoading(true);
        const res = await ApiUtils.get('/fo/od/bsktmgnt/cmpl-product-list', params);
        // this.showLoading(false);
        if (res.data && res.data.success) {
          cmplInfo.cmpl.itemList = res.data.data;
        } else {
          console.error('fail to getCmplItemList');
          cmplInfo.cmpl.itemList = [];
        }
      } catch (e) {
        console.log(e);
      }
    },
    async openCmplItemPopupNew(cmplInfo) {
      if (cmplInfo.cmpl.itemList == null) {
        const res = await this.getCmplItemList(cmplInfo);
      }
      this.popup['popupEventProduct'] = !this.popup['popupEventProduct'];
      this.popup.open = !this.popup.open;
      this.cmpl = cmplInfo.cmpl;
      this.ordTypeCd = cmplInfo.ordTypeCd;
      this.delivTypeCd = cmplInfo.delivTypeCd;
      this.mallId = cmplInfo.mallId;
    },
    openCmplItemPopup(cmpl, ordTypeCd, delivTypeCd, mallId) {
      this.popup['popupEventProduct'] = !this.popup['popupEventProduct'];
      this.popup.open = !this.popup.open;
      this.cmpl = cmpl;
      this.ordTypeCd = ordTypeCd;
      this.delivTypeCd = delivTypeCd;
      this.mallId = mallId;
    },
    async putCmplItem(bsktPutDtoList) {
      const result = await Basket.putMultiBskt(bsktPutDtoList, this.ordTypeCd, this.delivTypeCd, this.mbrDlvp.zipcd);
      console.log(result);
      // this.getBskt('S');
      if (result.data.success) {
        this.$gsdialog.alert('상품이 장바구니에 담겼습니다.').then(dialog => {
          this.getBskt("S");
        });
        /*
        this.popupAction('popupEventProduct');
        this.toastMessage = '상품이 장바구니에 담겼습니다';
        this.popupAction('popupToast');
        location.reload();
        */
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    calcDlfee() {
      let supplDlfee = 0;
      let delivDlfee = 0;
      let delivItemDlfee = 0;
      let totDlfee = 0;
      let itemDcSprc = 0;
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
          const suppl = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx];
          for (let ldx=0; ldx<suppl.bsktInqRsltDtoList.length; ldx++) {
            const bskt = suppl.bsktInqRsltDtoList[ldx];
            if (bskt.chk) {
              itemDcSprc += ((bskt.itemDcSprc * bskt.bsktQty) - bskt.cmplDcAmt - bskt.itemCpnDcAmt - bskt.dblDcCpnDcAmt);
              supplDlfee += bskt.itemDlfeeAmt;
              delivItemDlfee += bskt.itemDlfeeAmt;
            }
          }
          if (itemDcSprc < suppl.freeDelivStandAmt) {
            supplDlfee += suppl.standDlfee;
          }
          delivDlfee += supplDlfee;
          totDlfee += supplDlfee;
          suppl.dlfee = supplDlfee;
          supplDlfee = 0;
          itemDcSprc = 0;
        }
        this.bsktInqRsltDto.delivTypeDtoList[jdx].dlfee = delivDlfee;
        this.bsktInqRsltDto.delivTypeDtoList[jdx].dlItemfee = delivItemDlfee;
        delivDlfee = 0;
        delivItemDlfee = 0;
      }
      this.bsktInqRsltDto.totDlfee = totDlfee;
    },
    async openItemOptnPopup(bskt) {
      console.log(bskt);
      this.bsktId = bskt.bsktId;
      this.itemNm = bskt.itemNm;
      this.skuId = bskt.skuId;
      this.popup['popupOptionList'] = !this.popup['popupOptionList'];
      this.popup.open = !this.popup.open;
      this.showLoading(true);
      const result = await ApiUtils.get('/fo/od/bsktmgnt/item-option', {itemId: bskt.itemId});
      this.showLoading(false);
      this.itemOptnList = result.data.data;
    },
    async changeItemOptn(iPutItemOptn) {
      iPutItemOptn.bsktId = this.bsktId;
      iPutItemOptn.bsktTypeCd = "1";
      iPutItemOptn.sessnId = CookieUtils.getOdBsktUuid();
      console.log(iPutItemOptn);
      this.showLoading(true);
      const result = await ApiUtils.put('/fo/od/item-option', iPutItemOptn);
      this.showLoading(false);
      if (result.data.success) {
        this.popup['popupOptionList'] = !this.popup['popupOptionList'];
        this.popup.open = !this.popup.open;
        this.getBskt("U");
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    openSpecialGift(delivType) {
      console.log(delivType);
      this.popup['popupSpecialGift'] = !this.popup['popupSpecialGift'];
      this.popup.open = !this.popup.open;
      this.delivType = delivType;
    },
    floatingClose() {
      this.floatingBanner = false;
    },
    goLogin() {
      const oneToOneUrl = SiteUtils.commo('/od/bskt');
      SiteUtils.go(location.host, '/cu/login?returnUrl=' + oneToOneUrl);
    },
    bsktLogOut() {
      JwtUtils.destroyIdToken();
      this.loginYn = false;
    },
    getAlertMsg(bskt) {
      let msg = '';
      if (bskt.spckItemYn === 'Y') {
        let alertMsg = '';
        loop1:
        for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
          if (this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd === '10' && this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd === '01') {
            for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
              for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].apchItemYn === 'Y') {
                    alertMsg = '마감세일';
                    break loop1;
                  } else if (!StringUtils.isEmpty(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].todaySaleCtgNm)) {
                    alertMsg = '당일판매';
                    break loop1;
                  }/* else if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].onedaySaleItemYn === 'Y') {
                    alertMsg = '하루판매';
                    break loop1;
                  }*/
                }
              }
            }
          }
        }
        if (alertMsg !== '') {
          msg = '심플리쿡 상품과 당일판매 상품은 동시에 주문할 수 없습니다.';
        }
      } else if (bskt.apchItemYn === 'Y' || !StringUtils.isEmpty(bskt.todaySaleCtgNm)/* || bskt.onedaySaleItemYn === 'Y' */) {
        if (bskt.apchItemYn === 'Y') {
          if (this.nextDayDelivYn === 'N') {
            msg = '당일판매 상품의 배송 가능한 시간이 없습니다.<br/>당일판매 상품을 제외후 주문해주세요';
          }
        } else if (bskt.dspCtgId === 'G1008001') {
          if (this.todayDelivYn === 'N') {
            if (this.nextDayDelivYn === 'N') {
              msg = '당일판매 상품의 배송 가능한 시간이 없습니다.<br/>당일판매 상품을 제외후 주문해주세요';
            } else {
              loop3:
              for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd === '10' && this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd === '01') {
                  for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
                    for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                      if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                        if (/* this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].onedaySaleItemYn === 'Y'
                          || */(!StringUtils.isEmpty(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].todaySaleCtgNm)
                            && this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dspCtgId !== 'G1008001')) {
                          msg = '당일판매 상품의 배송 가능한 시간이 없습니다.<br/>당일판매 상품을 제외후 주문해주세요';
                          break loop3;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else if ((/* bskt.onedaySaleItemYn === 'Y' || */(!StringUtils.isEmpty(bskt.todaySaleCtgNm) && bskt.dspCtgId !== 'G1008001'))) {
          if (this.todayDelivYn === 'N') {
            msg = '당일판매 상품의 배송 가능한 시간이 없습니다.<br/>당일판매 상품을 제외후 주문해주세요';
          }
        }
        if (msg !== '') {
          return msg;
        }
        let spckItemYn = false;
        loop2:
        for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
          if (this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd === '10' && this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd === '01') {
            for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
              for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].spckItemYn === 'Y') {
                    spckItemYn = true;
                    break loop2;
                  }
                }
              }
            }
          }
        }

        const cartFirstItemId = CookieUtils.getCookie('cartFirstItemId'); // 선택한 첫구매 상품 아이디
        if (cartFirstItemId != '' && this.firstBuyPresInfo) {
          if (this.firstBuyPresInfo.spckItemYn == 'Y' && this.firstBuyPresInfo.itemDelivFormCd == '03') {
            spckItemYn = true;
          }
        }

        if (spckItemYn) {
          msg = '당일판매 상품과 심플리쿡 상품은 동시에 주문할 수 없습니다.';
        }
      }
      return msg;
    },
    async openRstkinInfmReq(bskt) {
      this.bskt = bskt;
      if (this.bskt.rstkinInfmReqYn === 'N') {
        this.popupAction('popupAlert');
      } else {
        if (!this.bskt.rstkinInfmReqSeqno || this.bskt.rstkinInfmReqSeqno === null) {
          this.$gsdialog.alert('입고 해제할 수 없습니다.');
          return;
        }

        const iPut = {
          itemId: this.bskt.itemId,
          cmmMbrNo: this.bskt.cmmMbrNo,
          storId: this.bskt.storId,
          supplFirmCd: this.bskt.supplFirmCd,
          rstkinInfmReqSeqno: this.bskt.rstkinInfmReqSeqno,
          cnclYn: 'Y',
        };

        this.showLoading(true);
        const result = await ApiUtils.put('/fo/md/iteminfomgnt/restock-inform-upd', iPut);
        this.showLoading(false);

        if (result.data.success) {
          this.bskt.rstkinInfmReqYn = 'N';
          this.bskt.rstkinInfmReqSeqno = null;
        } else {
          this.$gsdialog.alert(result.data.statusMessage);
        }
      }
    },
    async reqRstkinInfm() {
      const iPut = {
        itemId: this.bskt.itemId,
        cmmMbrNo: this.bskt.cmmMbrNo,
        storId: this.bskt.storId,
        supplFirmCd: this.bskt.supplFirmCd,
        skuId: this.bskt.skuId,
        rstkinInfmModeCd: '02',
        fstRegUserId: this.bskt.cmmMbrNo,

      };
      // 회원 모바일번호 조회
      try {
        const result = await ApiUtils.get(
          '/fo/cu/mbrmgnt/member-information'
        );
        const respCuInfo = result.data;
        const cuInfo = respCuInfo["data"];
        if (!cuInfo.moblTelNo) {
          this.toastMessage = "마이페이지에서 휴대폰 번호를 등록해 주시기 바랍니다.";
          this.popup.popupToastAlarm = true;
          return;
        }
        iPut.telNo = cuInfo.moblTelNo;
      } catch (e) {
        console.error("회원모바일번호조회에러 : "+e);
      }
      this.showLoading(true);
      const result = await ApiUtils.post('/fo/md/iteminfomgnt/restock-inform', iPut);
      this.showLoading(false);

      if (result.data.success) {
        this.toastMessage = '입고 알림이 신청 되었습니다.';
        this.popupAction('popupToast');
        this.bskt.rstkinInfmReqYn = 'Y';
        this.bskt.rstkinInfmReqSeqno = result.data.data.rstkinInfmReqSeqno;
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    chkBsktQty(bskt) {
      if (bskt.bsktQty <= 0) {
        return '최소 1개 이상 입력해주세요.';
      }

      if (bskt.itemPurchMinRestrQty !== 0) {
        if (bskt.itemPurchMinRestrQty > bskt.bsktQty) {
          // return '최소 구매 수량은 ' + bskt.itemPurchMinRestrQty + '개 입니다.';
          return '최소 구매 수량 미만 상품이 존재합니다.<br />' + bskt.itemNm + ' 수량을 변경해주세요.';
        }
      }
      if (bskt.itemPurchMaxRestrQty !== 0) {
        if (bskt.itemPurchMaxRestrQty < bskt.bsktQty) {
          // return '최대 구매 수량은 ' + bskt.itemPurchMaxRestrQty + '개 입니다.';
          return '최대 구매 수량을 초과하는 상품이 존재합니다.<br />' + bskt.itemNm + ' 수량을 변경해주세요.';
        }
      }

      if (bskt.stkQty < bskt.bsktQty) {
        // return '재고 수량은 ' + bskt.stkQty + '개 입니다.';
        return '재고 수량을 초과하는 상품이 존재합니다.<br />' + bskt.itemNm + ' 수량을 변경해주세요.';
      }

      if (bskt.bsktQty % bskt.itemSellUnitQty !== 0) {
        return '구매수량의 배수설정이 잘못된 상품이 존재합니다.<br />' + bskt.itemNm + ' 수량을 변경해주세요.';
      }

      return '';
    },
    goShop() {
      location.href = SiteUtils.to(CookieUtils.getMallId(), '/');
    },
    popupDateActive(bskt) {
      this.bskt = bskt;
      this.delivDt = bskt.delivDt;
      this.popupAction('popupDateSelect');
    },
    async selectDelivDt(selectDate) {
      const iBsktPut = {
        bsktId: this.bskt.bsktId,
        delivDt: selectDate,
        sessnId: CookieUtils.getOdBsktUuid(),
      };
      // console.log(iBsktPut);
      this.showLoading(true);
      const result = await ApiUtils.put('/fo/od/bsktmgnt/delivery-date', iBsktPut);
      this.showLoading(false);

      if (result.data.success) {
        this.$gsdialog.alert('변경되었습니다.');
        this.bskt.delivDt = selectDate;
        this.popupAction('popupDateSelect');
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    setMaxBnft(maxBnftYn) {
      this.maxBnftYn = maxBnftYn;
      this.getBskt('U');
    },
    goDaliDream() {
      location.href = SiteUtils.dalimo('/cp/gnb_dream_pass_benefit');
    },
    toastPopupAfterEnter(el) {
      el.style.opacity = 1;
    },
    toastPopupEnterLeave(el) {
      el.style.opacity = 0;
    },
    setResvSpckItemMap(bskt, map) {
      const cnt = map.get(bskt.delivDt);
      if (cnt) {
        map.set(bskt.delivDt, cnt + 1);
      } else {
        map.set(bskt.delivDt, 1);
      }
    },
  },
  destroyed() {
  },
  mounted() {},
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
