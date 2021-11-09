<!--
views/od/SC-FO-PA-GS-MS-003
-->
<template>
  <div :class="[{'wrap-order' : true}, siteClass]">
    <SubDefaultHeader headerText="주문결제" prevType="true" />
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="order-wrap">
        <!-- START : 상품 리스트 -->
        <div class="accordion-order-top">
          <div class="tit-accordion">
            <button type="button" id="orderTopAccordion" class="tit" aria-controls="orderAccordionContent" aria-expanded="false" @click="accordionEvent">
              <div class="tit-type1">
                <span class="img-thumb">
                  <figure><img src="@/assets/images/_temp/_img_cart01_01.jpg" alt="상품목록 대표 사진"></figure>
                </span>
                <span class="product-name">빙그레 따옴 사과주스 50ml 외 <strong class="point">14건</strong></span>
              </div>
              <div class="tit-type2">
                <h2>주문 상품 정보</h2>
              </div>
            </button>
          </div>
          <div id="orderAccordionContent" class="accordion-content" aria-labelledby="orderTopAccordion" hidden="hidden">
            <section class="section-area border">
              <h3 class="sub-title2 no-bg border">당일배송(5)</h3>
              <MyProductList1 @popupEvent="popupAction" />
            </section>
            <section class="section-area border border">
              <h3 class="sub-title2 no-bg">택배배송(2)</h3>
              <MyProductList2 @popupEvent="popupAction" />
            </section>
            <div class="section-area">
              <div class="total-price-benefit">
                <dl>
                  <dt>맛보기 상품금액</dt>
                  <dd class="sale-price" aria-label="판매가격">
                    <span class="number-sale-price">1,000</span>
                    <span class="unit-won">원</span>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="total-price-wrap">
              <p class="price-info">총 상품금액  19,800원 + 배송비 3,000원 = 22,800원</p>
            </div>
            <p class="btn-close-wrap"><button type="button" class="btn-list-close" aria-controls="orderAccordionContent" @click="accordionCloseEvent">접기</button></p>
          </div>
        </div>
        <PopupDiscountInfo @popupEvent="popupAction" v-if="this.popup.popupDiscountInfo" /> <!-- 팝업 - 할인 내역 -->
        <PopupCouponChange @popupEvent="popupAction" v-if="this.popup.popupCouponList" /> <!-- 팝업 - 쿠폰변경 -->
        <!-- END : 상품 리스트 -->
        <div class="tab-menu tab-list">
          <ul ref="tabList" class="tablist">
            <li>
              <button type="button" id="tab1" aria-controls="tab-contents1" @click="tabAction('delivery')" :class="{active : tab.delivery}">배송</button>
            </li>
            <li>
              <button type="button" id="tab2" aria-controls="tab-contents2" @click="tabAction('pickup')" :class="{active : tab.pickup}">픽업</button>
            </li>
          </ul>
        </div>
        <div ref="tabContents" tabindex="0">
          <!-- START : 배송 -->
          <div id="tab-contents1" class="tabcontents" aria-labelledby="tab1" v-if="this.tab.delivery">
            <!-- 최종 결제금액 스티키 -->
            <div class="position-fixed-total-price">
              최종 결제금액 <span class="price"><strong>56,540</strong>원</span>
            </div>
            <!-- // 최종 결제금액 스티키 -->
            <!-- START : 배송지 -->
            <DeliveryAddr @popupEvent="popupAction" />
            <PopupDeliveryList @popupEvent="popupAction" v-if="this.popup.popupDeliveryList" /> <!-- 팝업 - 배송지 목록 -->
            <!-- END : 배송지 -->
            <!-- START : 예약배송 -->
            <DeliveryReserve />
            <!-- END : 예약배송 -->
            <!-- START : 당일배송 -->
            <DeliveryToday @popupEvent="popupAction" />
            <PopupSimplycook @popupEvent="popupAction" v-if="this.popup.popupSimplycook" /> <!-- 팝업 - 주문예정금액 변동안내 -->
            <PopupFreeTime @popupEvent="popupAction" v-if="this.popup.popupFreeTime" /> <!-- 팝업 - 프리타임 안내 -->
            <!-- END : 당일배송 -->
            <!-- START : 새벽배송 -->
            <DeliveryDawn />
            <!-- END : 새벽배송 -->
            <!-- START : 택배배송 -->
            <DeliveryParcel />
            <!-- END : 택배배송 -->
            <!-- START : 배송 요청사항 -->
            <DeliveryRequest />
            <!-- END : 배송 요청사항 -->
            <!-- START : 해외배송 -->
            <DeliveryOverseas />
            <!-- END : 해외배송 -->
            <!-- START : 할인정보 -->
            <DiscountInfo @popupEvent="popupAction" />
            <PopupDeliveryCoupon @popupEvent="popupAction" v-if="this.popup.popupDeliveryCoupon" /> <!-- 팝업 - 배송지, 장바구니 쿠폰 -->
            <PopupCardOption @popupEvent="popupAction" v-if="this.popup.popupCardOption" /> <!-- 팝업 - 프리타임 안내 -->
            <OrderTotalPrice />
            <!-- END : 할인정보 -->
            <!-- START : 간편, 일반결제 -->
            <PaymentNormal @popupEvent="popupAction" />
            <PopupCardList @popupEvent="popupAction" v-if="this.popup.popupCardList" /> <!-- 팝업 - 카드 선택 -->
            <PopupCardMonthly @popupEvent="popupAction" v-if="this.popup.popupCardMonthly" /> <!-- 팝업 - 카드결제 할부 선택 -->
            <PopupInterestFree @popupEvent="popupAction" v-if="this.popup.popupInterestFree" /> <!-- 팝업 - 무이자 할부 안내 -->
            <PopupAccountTransfer @popupEvent="popupAction" v-if="this.popup.popupAccountTransfer" /> <!-- 팝업 - 계좌이체 안내 -->
            <PopupMobilePop @popupEvent="popupAction" v-if="this.popup.popupMobilePop" /> <!-- 팝업 - 모바일팝 안내 -->
            <PopupMicropayments @popupEvent="popupAction" v-if="this.popup.popupMicropayments" /> <!-- 팝업 - 소액결제 안내 -->
            <!-- END : 간편, 일반결제 -->
            <!-- START : 사은품 -->
            <FreeGift />
            <!-- END : 사은품 -->
            <!-- START : 3자 제공 동의 -->
            <OrderAgreement @popupEvent="popupAction" />
            <PopupAgreeDetail @popupEvent="popupAction" v-if="this.popup.popupAgreeDetail" /> <!-- 팝업 - 개인정보 제3자 제공동의 -->
            <!-- END : 3자 제공 동의 -->
            <!-- START : 하단 버튼 -->
            <div class="bottom-btn-area mt0">
              <button type="button" class="btn-lg btn-bg lightgreen"><span>56,540원 결제하기</span></button>
            </div>
            <!-- END :하단 버튼 -->
          </div>
          <!-- END : 배송 -->
          <!-- START : 픽업 -->
          <div id="tab-contents2" class="tabcontents" aria-labelledby="tab2" v-if="this.tab.pickup">
            <!-- START : 처음인 경우 -->
            <!-- START : 픽업센터 -->
            <div class="section-area">
              <div class="sub-inner-box pickup-select">
                <p class="txt">직접 수령할 장소를 선택해주세요.</p>
                <button type="button" class="btn-md btn-bg lightgreen">GS THE FRESH</button>
                <button type="button" class="btn-md btn-bg lightgreen">GS25 / GS파크24</button>
              </div>
            </div>
            <!-- END : 픽업센터 -->
            <div class="section-area">
              <div class="sub-inner-box pickup-first-info">
                <h2>내가 원하는 시간, 장소에서<br>편하게 찾아가세요!</h2>
                <ol class="txt-info-list number-list">
                  <li><span class="number">①</span> 원하시는 픽업 매장 유형을 선택해 주세요.</li>
                  <li><span class="number">②</span> 주문/결제 완료 후, 주문한 상품이 도착하면 고객님의 휴대전화로 알림 문자가 발송됩니다.<br>
                  <span class="color-gray">(예정된 시간까지 문자가 오지 않으면 방문 전 수령지점으로 확인 연락 해주세요.)</span></li>
                  <li><span class="number">③</span> 지정 시간대에 방문해서 본인 확인용 문자 메시지를 점원에게 보여주고 수령하세요.</li>
                </ol>
                <ul class="txt-info-list color-gray">
                  <li class="ico-alert2">선택한 시간에 GS 프레시몰 차량으로 안전하게 배송해드립니다.</li>
                  <li class="ico-alert2">상품의 신선함을 위해 포장은 포장 박스로 제공해드립니다.</li>
                  <li class="ico-alert2">당일배송의 경우 픽업 시에도 무료배송기준 금액을 충족하지 못한 경우 배송비(쇼핑대행료)가 별도로 부과됩니다.</li>
                </ul>
              </div>
            </div>
            <!-- END : 처음인 경우 -->
          </div>
          <!-- END : 픽업 -->
        </div>
      </div>
    </main>
    <Footer /><!-- 8월 수정 : 디자인 디벨롭 수정 사항 (푸터 누락건 추가) -->
  </div>
</template>
<script>
/* START : 기획&디자인확인용 */
import MyProductList1 from '@/components/_temp/MyProductList1'; // 상품리스트
import MyProductList2 from '@/components/_temp/MyProductList2'; // 상품리스트
/* END : 기획&디자인확인용 */
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
// import MyProductList from '@/components/order/MyProductList'; // 상품리스트
import DeliveryReserve from '@/components/order/DeliveryReserve'; // 예약배송
import DeliveryToday from '@/components/order/DeliveryToday'; // 당일배송
import DeliveryDawn from '@/components/order/DeliveryDawn'; // 새벽배송
import DeliveryParcel from '@/components/order/DeliveryParcel'; // 택배배송
import DeliveryOverseas from '@/components/order/DeliveryOverseas'; // 해외배송
import DeliveryRequest from '@/components/order/DeliveryRequest'; // 배송 요청사항
import DiscountInfo from '@/components/order/DiscountInfo'; // 할인정보
import OrderTotalPrice from '@/components/order/OrderTotalPrice'; // 총금액
import PaymentNormal from '@/components/order/PaymentNormal'; // 간편, 일반결제
import DeliveryAddr from '@/components/order/DeliveryAddr'; // 배송지
import FreeGift from '@/components/order/FreeGift'; // 사은품
import OrderAgreement from '@/components/order/OrderAgreement'; // 주문 정보 확인 동의
import PopupDeliveryList from '@/views/od/PopupDlvpList.vue'; // 팝업 - 배송지 목록
import PopupCouponChange from '@/views/od/PopupCouponChange'; // 팝업 - 쿠폰변경
import PopupDiscountInfo from '@/views/od/PopupDiscountInfo'; // 팝업 - 할인 내역
import PopupSimplycook from '@/views/od/PopupSimpleCookOrdSchedAmt'; // 팝업 - 심플리쿡 주문예정 금액
import PopupFreeTime from '@/views/od/PopupFreeTimeInfo'; // 팝업 - 프리타임 안내
import PopupDeliveryCoupon from '@/views/od/PopupDelvCartCpnList'; // 팝업 - 배송지 쿠폰
import PopupCardOption from '@/views/od/PopupCardDcList'; // 팝업 - 카드즉시할인
import PopupCardList from '@/views/od/PopupCCardList'; // 팝업 - 신용카드 선택
import PopupCardMonthly from '@/views/od/PopupCardTdrInstlList'; // 팝업 - 카드결제 할부 선택
import PopupInterestFree from '@/views/od/PopupFoiInstlInfo'; // 팝업 - 무이자 할부 안내
import PopupAccountTransfer from '@/views/od/PopupAcntTrsfInfo'; // 팝업 - 계좌이체 안내
import PopupMobilePop from '@/views/od/PopupMobilPopInfo'; // 팝업 - 모바일 팝 안내
import PopupMicropayments from '@/views/od/PopupMobilSamtTdrInfo'; // 팝업 - 소액결제 안내
import PopupAgreeDetail from '@/views/od/PopupTdptOferAgrInfo'; // 팝업 - 개인정보 제3자 제공동의
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "OrderPickupDefault",
  data() {
    return {
      tab: {
       delivery: true, // 배송
       pickup: false, // 픽업
      },
      popup: { // 팝업
        open: false,
        popupDeliveryList: false, // 배송지 목록
        popupSimplycook: false, // 심플리쿡 주문예정 금액
        popupFreeTime: false, // 프리타임 안내
        popupDeliveryCoupon: false, // 장바구니 배송비 쿠폰
        popupCardOption: false, // 카드 즉시할인
        popupCardList: false, // 신용카드 선택
        popupCardMonthly: false, // 카드결제 할부선택
        popupInterestFree: false, // 무이자 할부 안내
        popupAccountTransfer: false, // 계좌이체 안내
        popupMobilePop: false, // 모바일팝 안내
        popupMicropayments: false, // 소액결제 안내
        popupDiscountInfo: false,
        popupCouponList: false,
        popupAgreeDetail: false, // 개인정보 제3자 제공동의
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '주문결제 < %s'
  },
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
    SubDefaultHeader,
    Footer,
    // MyProductList, // 상품목록
    DeliveryAddr, // 배송지
    DeliveryReserve, // 예약배송
    DeliveryToday, // 당일배송
    DeliveryDawn, // 새벽배송
    DeliveryParcel, // 택배배송
    DeliveryRequest, // 배송 요청사항
    DeliveryOverseas, // 해외배송
    DiscountInfo, // 할인정보
    OrderTotalPrice, // 총금액
    PaymentNormal, // 간편, 일반결제
    FreeGift, // 사은품
    OrderAgreement, // 동의
    PopupDeliveryList, // 팝업 - 배송지 목록
    PopupSimplycook, // 팝업 - 심플리쿡 주문예정금액
    PopupFreeTime, // 팝업 - 프리타임 안내
    PopupDeliveryCoupon, // 팝업 - 배송비 장바구니 쿠폰
    PopupCardOption, // 팝업 - 카드즉시할인
    PopupCardList, // 팝업 - 신용카드 선택
    PopupCardMonthly, // 팝업 - 카드결제 할부 선택
    PopupInterestFree, // 팝업 - 무이자 할부 안내
    PopupAccountTransfer, // 팝업 - 계좌이체 안내
    PopupMobilePop, // 팝업 - 모바일팝 안내
    PopupMicropayments, // 팝업 - 소액결제 안내
    PopupCouponChange, // 팝업 - 쿠폰변경
    PopupDiscountInfo, // 팝업 - 할인 내역
    PopupAgreeDetail, // 개인정보 제3자 제공동의
    MyProductList1, // 기획&디자인확인용
    MyProductList2, // 기획&디자인확인용
  },
  methods: {
    tabAction(type) { // tab
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.$refs.tabContents.focus();
    },
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    // 상세목록 닫기버튼
    accordionCloseEvent() {
      const $target = event.currentTarget;
      const controls = $target.getAttribute('aria-controls');
      const $accButton = document.querySelector('#orderTopAccordion');
      document.getElementById(controls).setAttribute('hidden', true);
      $target.setAttribute('aria-expanded', false);
      $accButton.setAttribute('aria-expanded', false);
      $accButton.focus();
    },
    // 총합계 스티키
    stickyPrice(scroll) {
      const $stickyPrice = document.querySelector('.position-fixed-total-price');
      if ( !!$stickyPrice ) {
        const btnBottomPos = document.querySelector(".bottom-btn-area").offsetTop;
        if ( scroll + window.innerHeight >= btnBottomPos ) {
          $stickyPrice.classList.add('hide');
        } else {
          $stickyPrice.classList.remove('hide');
        }
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll');
  },
  mounted() {
    const $this = this;
    window.addEventListener('scroll', function() {
      $this.stickyPrice(window.pageYOffset);
    });
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
