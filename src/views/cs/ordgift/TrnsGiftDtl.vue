<!--
마이페이지  선물내역  보낸선물    SC-FO-SS-GF-MS-818  PG-FO-CS-O030 TrnsGiftDtl   보낸선물 상세
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]"><!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <SubDefaultHeader headerText="보낸선물상세" prevType="true" />
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="received-gift-wrap">
        <!-- START : 배송지 입력기한 -->
        <section class="wrap-breakdown">
          <div class="due-date">
            <h3 class="name"><em>홍진영</em>님께 보낸 선물</h3>
            <span class="state">수락대기</span>
            <dl class="detail-breakdown right">
              <dt>선물 보낸 날짜</dt>
              <dd>2019-12-19 17:00</dd>
              <dt>선물 받은 날짜</dt>
              <dd>2019-12-19 17:00</dd>
              <!-- <dt>주문취소</dt>
              <dd>2019-12-19 17:00</dd> -->
              <dt>보낸사람(주문자)</dt>
              <dd>조보아 010-1234-5678</dd>
              <dt>받는사람</dt>
              <dd>조보아 010-1234-5678</dd>
            </dl>
            <div class="btns-resend">
              <button type="type" class="btn-resend">카카오톡 재전송</button>
              <button type="type" class="btn-resend">문자(SMS) 재전송</button>
            </div>
          </div>
        </section>
        <!-- END : 배송지 입력기한 -->
        <!-- START : 선물 메시지 -->
        <section class="section">
          <div class="sub-title">
            <h2>선물 메시지</h2>
          </div>
          <GiftBoxMessage :giftMessage="giftMessage" />
        </section>
        <!-- END : 선물 메시지 -->
        <!-- START : 상품정보 -->
        <section class="section">
          <div class="sub-title">
            <h2>상품정보(2)</h2>
          </div>
          <h3 class="sub-title2">예약배송(2)</h3>
          <div class="list-content">
            <ul class="cart-product-list selected-list">
              <!-- START : 기획, 디자인 검수용 -->
              <li>
                <dl>
                  <dt>
                    <p class="tit">엔네이처 빅그릴비엔나 260G+260G기획 </p>
                  </dt>
                  <dd class="thumb">
                    <a href="#">
                      <figure>
                        <img src="@/assets/images/_temp/_img_cart01_01.jpg" alt="믿고 먹는 샤인  머스켓 귀족 포도 ">
                      </figure>
                    </a>
                  </dd>
                  <dd class="option">
                    <p class="option-info">옵션: 선택한 옵션명 노출</p>
                  </dd>
                  <dd class="count">
                    <p class="option-info">수량: 1개</p>
                  </dd>
                  <dd class="shop">GS 프레시몰</dd>
                  <dd class="list-price" aria-label="정상가격">
                    <del>7,560</del>원
                  </dd>
                  <dd class="sale-price" aria-label="판매가격">
                    <span class="number-sale-price">12,680</span>
                    <span class="unit-won">원</span>
                  </dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>
                    <p class="tit">믿고 먹는 샤인  머스켓 귀족 포도 </p>
                  </dt>
                  <dd class="thumb">
                    <a href="#">
                      <figure>
                        <img src="@/assets/images/_temp/_img_product02_03.jpg" alt="믿고 먹는 샤인  머스켓 귀족 포도 ">
                      </figure>
                    </a>
                  </dd>
                  <dd class="option">
                    <p class="option-info">옵션 : 중과 + 소과 혼합</p>
                  </dd>
                  <dd class="count">
                    <p class="option-info">수량 : 1개</p>
                  </dd>
                  <dd class="shop">달리살다</dd>
                  <dd class="list-price" aria-label="정상가격">
                    <del>7,560</del>원
                  </dd>
                  <dd class="sale-price" aria-label="판매가격">
                    <span class="number-sale-price">12,680</span>
                    <span class="unit-won">원</span>
                  </dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>
                    <p class="tit">심플리쿡) 백순대 볶음(2~3인분)</p>
                  </dt>
                  <dd class="thumb">
                    <a href="#">
                      <figure>
                        <img src="@/assets/images/_temp/_img_cart01_03.jpg" alt="심플리쿡) 백순대 볶음(2~3인분)">
                      </figure>
                    </a>
                  </dd>
                  <dd class="count">
                    <p class="option-info">수량: 1개</p>
                  </dd>
                  <dd class="shop">심플리쿡</dd>
                  <dd class="list-price" aria-label="정상가격">
                    <del>7,560</del>원
                  </dd>
                  <dd class="sale-price" aria-label="판매가격">
                    <span class="number-sale-price">12,680</span>
                    <span class="unit-won">원</span>
                  </dd>
                </dl>
                <div class="simplycook-option">
                  <dl>
                    <dt>
                      <p class="tit">당면 사리</p>
                    </dt>
                    <dd class="option-number txt">수량: 1개</dd>
                    <dd class="sale-price">
                      <span class="number-sale-price" aria-label="판매가격">500</span>
                      <span class="unit-won">원</span>
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <p class="tit">시금치수제비</p>
                    </dt>
                    <dd class="option-number txt">수량: 1개</dd>
                    <dd class="sale-price">
                      <span class="number-sale-price" aria-label="판매가격">1,000</span>
                      <span class="unit-won">원</span>
                    </dd>
                    <dd><button type="button" class="btn-del"><span class="hidden">옵션 삭제</span></button></dd>
                  </dl>
                </div>
              </li>
              <!-- END : 기획, 디자인 검수용 -->
              <!-- <MyProductList /> // 개발용 실사용 컴포넌트 - 상품 목록 -->
            </ul>
          </div>
          <!-- <h3 class="sub-title2">당일배송(2)</h3>
          <div class="list-content">
            <ul class="cart-product-list selected-list">
              <MyProductList />
            </ul>
          </div>
          <h3 class="sub-title2">새벽배송(2)</h3>
          <div class="list-content">
            <ul class="cart-product-list selected-list">
              <MyProductList />
            </ul>
          </div>
          <h3 class="sub-title2">택배배송(2)</h3>
          <div class="list-content">
            <ul class="cart-product-list selected-list">
              <MyProductList />
            </ul>
          </div> -->
        </section>
        <!-- END : 상품정보 -->
        <!-- START : 최종 결제금액 -->
        <section class="section-area mypage">
          <div class="total-payment order-payment">
            <div class="sub-title">
              <h3>결제정보</h3>
            </div>
            <ul class="accordion-payment">
              <li>
                <div class="tit-accordion">
                  총 상품금액 <span class="price"><strong>277,180</strong>원</span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  총 할인금액 <span class="price red"><strong>-75,220</strong>원</span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  총 배송비 <span class="price"><strong>2,500</strong>원</span>
                </div>
                <ul class="accordion-content">
                  <li>택배배송 <span class="price"><strong>0</strong>원</span></li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="sub-title send-total-price">
            <h2>최종결제금액 <span class="price"><strong>28,000</strong>원</span></h2>
            <p class="txt-point">배송 완료 후, GS&amp;POINT적립 <span class="point">28P</span></p>
          </div>
        </section>
        <!-- END : 최종 결제금액 -->
        <!-- START : 하단 버튼 -->
        <section class="section">
          <div class="bottom-btn-area">
            <button type="button" class="btn-border btn-view-details">주문상세보기</button>
            <button type="button" class="btn-md btn-bg darkgray">선물/조르기 목록</button>
            <button type="button" class="btn-md btn-bg lightgreen">쇼핑하러 가기</button>
          </div>
        </section>
        <!-- START : 하단 버튼 -->
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>
<script>
  /* START : 실 사용 컴포넌트 */
  import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
  import Footer from '@/components/common/Footer'; // 푸터
  import GiftBoxMessage from '@/components/mypage/GiftBoxMessage'; // 선물 메세지
  // import MyProductList from '@/components/mypage/MyProductList'; //  개발용 실사용 컴포넌트 - 상품 목록
  import CookieUtils from '@/common/CookieUtils';

  export default {
    name: "SentGiftDetail",
    data() {
      return {
        giftMessage: '작성한 선물 메시지 내용 노출',
        siteClass: CookieUtils.getSiteClass(),
      };
    },
    mounted() {

    },
    metaInfo: {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '선물/조르기 상세 < 마이페이지 <%s'
    },
    mixins: [],
    components: {
      SubDefaultHeader, // 헤더
      Footer, // 푸터
      GiftBoxMessage, // 선물 메시지
      // MyProductList, // 개발용 실사용 컴포넌트 - 상품 목록
    },
  };
</script>
<style lang="scss">
</style>
