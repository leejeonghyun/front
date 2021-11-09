<template>
  <div class="wrap wrap-wine25 non-floating-btn">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="예약 내역" /><!-- 9월 수정 : 헤더 유형 변경 -->
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="wrap-reserve-link" :class="{line : borderTop}">
        <ul>
          <li class="reserve-ing">
            <button type="button" @click="reservedAction('ing')">예약중 <em class="length">2</em></button>
          </li>
          <li class="reserve-done">
            <button type="button" @click="reservedAction('done')">예약완료 <em class="length">0</em></button>
          </li>
        </ul>
      </div>
      <div class="wrap-reserve-panel wrap-wine25-section">
        <h2 class="h-title" :class="{ing : true}">
          <strong>예약중</strong>
          <button type="button" class="wine btn btn-border">예약취소</button>
        </h2>
        <div class="area-statement">
          <em class="heading">예약번호</em><strong>20190112584</strong>
          <em class="heading">전화번호</em><strong>2019.09.01</strong>
          <em class="heading">전화번호</em><strong>역삼 GS 타워점</strong>
        </div>
        <p class="area-desc"><em class="essential">일요일</em> 또는 <em class="essential">공휴일</em> 건은 당일 수령 불가</p>
        <p class="area-desc">와인당일배송 예약은 시범 운영기간 동안, <em class="essential">강남구, 서초구, 송파구 지역 GS25 한정</em>하여 운영합니다.</p>
        <p class="area-desc">오전 11시 이후 예약건은 다음날로 예약됩니다.</p>
        <h2 class="h-title">
          <strong>예약상품</strong>
          <em class="h-sub-title">총 <span class="essential">4</span>건 (<span class="essential">10</span>병)</em>
        </h2>
        <div class="wrap-wine-reserved-list" :class="`type-${type}`">
          <WineProductReserved />
          <WineProductReserved />
          <WineProductReserved />
          <WineProductReserved />
        </div>
        <p class="area-desc">수량 변경 후 &#91;변경&#93; 버튼을 눌러주세요</p>
        <div class="area-total-price">
          <strong class="title">최종 예약 금액</strong>
          <span class="price"><em>59,230,000</em>원</span>
        </div>
        <h2 class="h-title" :class="{done : true}"><strong>최근 예약완료 내역</strong></h2>
        <div class="area-statement">
          <em class="heading">예약번호</em><strong><button type="button" class="detail" aria-haspopup="dialog" @click="popupAction('popupWineReservehistory')">20190112584</button></strong>
          <em class="heading">전화번호</em><strong>2019.09.01</strong>
          <em class="heading">전화번호</em><strong>역삼 GS 타워점</strong>
        </div>
        <div class="area-statement">
          <em class="heading">예약번호</em><strong><button type="button" class="detail" aria-haspopup="dialog" @click="popupAction('popupWineReservehistory')">20190112584</button></strong>
          <em class="heading">전화번호</em><strong>2019.09.01</strong>
          <em class="heading">전화번호</em><strong>역삼 GS 타워점</strong>
        </div>
        <div class="area-btn">
          <button type="button" class="more"><em>더보기</em></button>
        </div>
        <p class="area-desc">
          오전 11시 이전 예약 시 당일 오후 6시부터 수령 가능합니다.<br />
          (오전 11시 이후 예약 건은 다음날 오후 6시부터 수령 가능)<br />
          <em class="essential">일요일</em> 또는 <em class="essential">공휴일</em> 건은 당일 수령 불가<br />
          수령은 입고 후 3일 내 가능하며, 기간 내 미수령 시 자동 취소
        </p>
        <p class="area-desc">와인당일배송 예약은 시범 운영기간 동안, <em class="essential">강남구, 서초구, 송파구 지역 GS25 한정</em>하여 운영합니다.</p>
        <div class="area-btn">
          <button type="button" class="strong">와인 예약 하러 가기</button>
        </div>
      </div>
    </main>
    <PopupWineReservationDoneList @popupEvent="popupAction" v-if="popup.popupWineReservehistory" />
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer';
import WineProductReserved from '@/wine25/components/WineProductReserved'; // 예약목록
import PopupWineReservationDoneList from '@/wine25/views/wine-reservation007_001'; // 팝업 - 예약완료 목룍
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
export default {
  name: "WineReservation",
  mixins: [],
  metaInfo: {
    title: 'GS 프레시몰',
    titleTemplate: '예약 내역 < 와인25 < %s'
  },
  components: {
    SubDefaultHeader,
    Footer,
    WineProductReserved,
    PopupWineReservationDoneList,
  },
  data() {
    return {
      borderTop: true, // Border 설정
      type: 'option', // 예약목록 타입 desc(상품설명), option(상품설명 + 수량 수정),
      popup: { // 팝업
        popupWineReservehistory: false,
      },
    };
  },
  methods: {
    // 팝업
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    reservedAction(target) {
      const el = document.querySelector(`.${target}`);
      const elOffseTop = el.getBoundingClientRect().top;
      const headetHeight = document.querySelector('header').offsetHeight;

      setTimeout(() => window.scrollTo(0, elOffseTop - headetHeight -15), 500);
    }
  },
  updated() {
    if (this.popup.open) {
      disableBodyScroll(this);
    } else {
      clearAllBodyScrollLocks(this);
    };
  },
};
</script>
