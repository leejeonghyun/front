<!--
마이페이지  선물내역  받은선물    SC-FO-SS-GF-MS-817  PG-FO-CS-O028 RcvGiftDtl    받은선물 상세
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]"><!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <SubDefaultHeader headerText="받은선물상세" prevType="true" />
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="received-gift-wrap">
        <!-- START : 배송지 입력기한 -->
        <section class="wrap-breakdown">
          <div class="due-date">
            <h3 class="name"><em>홍진영</em>님의 선물</h3>
            <span class="state">선물수락</span>
            <dl class="detail-breakdown right">
              <dt>배송지 입력기한</dt>
              <dd>2019-12-19 17:00</dd>
              <dt>선물 받은 날짜</dt>
              <dd>2019-12-19 17:00</dd>
              <!-- <dt>주문취소</dt>
              <dd>2019-12-19 17:00</dd> -->
            </dl>
          </div>
        </section>
        <!-- END : 배송지 입력기한 -->
        <!-- START : 선물 메시지 -->
        <section class="section">
          <div class="sub-title">
            <h2 class="">선물 메시지</h2>
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
          <h3 class="sub-title2">당일배송(2)</h3>
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
          </div>
        </section>
        <!-- END : 상품정보 -->
        <!-- START : 배송지 정보 -->
        <section class="section wrap-breakdown">
          <h3>배송지 정보</h3>
          <dl class="detail-breakdown">
            <dt>받는 분</dt>
            <dd>홍길동</dd>
            <dt>주소</dt>
            <dd>서울시 강남구 강남대로 154길 해송빌딩 4층</dd>
            <dt>연락처</dt>
            <dd>010-1234-5678</dd>
          </dl>
        </section>
        <!-- END : 배송지 정보 -->
        <!-- START : 예약배송 -->
        <section class="section reservation-delivery">
          <div class="sub-title border">
            <h2>예약배송</h2>
          </div>
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>GS 프레시몰</h2>
            </div>
            <ul class="delivery-product">
              <li>
                <span class="date">11/30(토)도착예정</span>
                <span class="product-name">하기스 매직팬티 남아 기저귀 외N개</span>
              </li>
            </ul>
            <dl class="comment">
              <dt>배송기사 <br>요청메시지</dt>
              <dd>없음</dd>
            </dl>
          </div>
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>달리살다</h2>
            </div>
            <ul class="delivery-product">
              <li>
                <span class="date">11/30(토)도착예정</span>
                <span class="product-name">오가닉 유기농 식빵   외 N개</span>
              </li>
              <li>
                <span class="date">11/30(토)도착예정</span>
                <span class="product-name">알러지케어 일리윤 유기농 …외 N개</span>
              </li>
            </ul>
            <dl class="comment">
              <dt>배송기사 <br>요청메시지</dt>
              <dd>문 앞에 놓아주세요</dd>
            </dl>
          </div>
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>심플리쿡</h2>
            </div>
            <ul class="delivery-product">
              <li>
                <span class="date">11/30(토)도착예정</span>
                <span class="product-name">심플리쿡) 사천식 돼지고기 숙주 볶음</span>
              </li>
              <li>
                <span class="date">11/30(토)도착예정</span>
                <span class="product-name">심플리쿡) 스트립로인스테이크 스트립로인스테이크</span>
              </li>
            </ul>
            <dl class="comment">
              <dt>배송기사 <br>요청메시지</dt>
              <dd>문 앞에 놓아주세요</dd>
            </dl>
          </div>
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>농협해남법인</h2>
            </div>
            <ul class="delivery-product">
              <li>
                <span class="date">11/30(토)도착예정</span>
                <span class="product-name">해남 절임배추20Kg</span>
              </li>
            </ul>
            <dl class="comment">
              <dt>배송기사 <br>요청메시지</dt>
              <dd>11/30(토)도착예정</dd>
            </dl>
          </div>
        </section>
        <!-- END : 예약배송 -->
        <!-- START : 당일배송 -->
        <section class="section wrap-breakdown">
          <h3>당일배송</h3>
          <dl class="detail-breakdown">
            <dt>배송시간</dt>
            <dd>1/30(토) 10:00~14:00</dd>
            <dt>배송기사 <br>요청메시지</dt>
            <dd>11/30(토)도착예정</dd>
          </dl>
        </section>
        <!-- END : 당일배송 -->
        <!-- START : 새벽배송 -->
        <section class="section wrap-breakdown">
          <h3>새벽배송</h3>
          <dl class="detail-breakdown">
            <dt>배송시간</dt>
            <dd>1/30(토) 10:00~14:00</dd>
            <dt>배송기사 <br>요청메시지</dt>
            <dd>11/30(토)도착예정</dd>
            <dt>새벽배송 <br>완료알림</dt>
            <dd>오전 7시 이후</dd>
          </dl>
        </section>
        <!-- END : 새벽배송 -->
        <!-- START : 택배배송 -->
        <section class="section wrap-breakdown">
          <h3>택배배송</h3>
          <strong class="branch">GS 프레시몰 전국택배</strong>
          <dl class="detail-breakdown">
            <dt>배송시간</dt>
            <dd>1/30(토) 10:00~14:00</dd>
            <dt>배송기사 <br>요청메시지</dt>
            <dd>11/30(토)도착예정</dd>
          </dl>
          <strong class="branch">알레르망</strong>
          <ul class="delivery-product">
            <li>상품명 노출 외 <strong class="point">N</strong>개</li>
          </ul>
          <dl class="detail-breakdown">
            <dt>배송기사 <br>요청메시지</dt>
            <dd>11/30(토)도착예정</dd>
          </dl>
        </section>
        <!-- END : 택배배송 -->
        <!-- START : 배송요청사항 -->
        <section class="section wrap-breakdown">
          <h3>배송요청사항</h3>
          <dl class="detail-breakdown">
            <dt>수령위치</dt>
            <dd>문 앞  |  공동현관번호 : *1234*</dd>
            <dt>결품 발생시<br>처리방법</dt>
            <dd>포인트로 환불</dd>
            <dt>영수증<br>수령방법</dt>
            <dd>모바일 영수증</dd>
          </dl>
        </section>
        <!-- END : 배송요청사항 -->
        <!-- START : 하단 버튼 -->
        <section class="section">
          <div class="bottom-btn-area">
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
  import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
  import Footer from '@/components/common/Footer'; // 푸터
  import GiftBoxMessage from '@/components/mypage/GiftBoxMessage'; // 선물 메세지
  import MyProductList from '@/components/mypage/MyProductList'; //  개발용 실사용 컴포넌트 - 상품 목록
  import CookieUtils from '@/common/CookieUtils';

  export default {
    name: "ReceivedGiftDetail",
    data() {
      return {
        giftMessage: '선물한 사람이 보낼때 작성한 메시지 노출',
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
      MyProductList, // 개발용 실사용 컴포넌트 - 상품 목록
    },
  };
</script>
<style lang="scss">
</style>
