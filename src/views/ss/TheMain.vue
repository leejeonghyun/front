<!--//
views/ss/SC-FO-SS-GF-MM-001.vue
-->
<template>
  <div class="wrap main" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <MainHeader />
    <!-- END : 헤더 -->
    <!-- START : 하단탭바 -->
    <Tabbar :showTabbar="showTabbar" @categoryEvent="sidebarAction" />
    <!-- END : 하단탭바 -->
    <!-- START : 카테고리 사이드바 -->
    <Sidebar :sidebarActive="sidebar.active" @sidebarEvent="sidebarAction" />
    <!-- END : 카테고리 사이드바 -->
    <!-- START : 메인슬라이드 -->
    <MainSlide @gnbInitEvent="gnbInit" />
    <!-- END : 메인슬라이드 -->
    <!-- START : GNB -->
    <MenuSlide :gnbOffsetTop="gnbOffsetTop" :activeIndex="activeIndex" />
    <!-- END : GNB -->
    <!-- START : 퀵메뉴 -->
    <MenuQuick />
    <!-- END : 퀵메뉴 -->
    <!-- START : 본문 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <!-- START : 로그인 시 배송가능시간 안내 노출 -->
      <button class="wrap-delivery-info">
        <span class="wrap-delivery-list">
          <span class="guide-text">지금 주문시 <strong>가장 빠른 배송시간</strong></span>
          <span class="time">내일 10:00</span> <!-- 오늘 내일 -->
          <!-- <p class="time">02.01(월) 10:00</p> --> <!-- 날짜형 -->
        </span>
      </button>
      <!-- END : 로그인 시 배송가능시간 안내 노출 -->
      <!-- START : 이벤트배너 -->
      <BannerSlide />
      <!-- END : 이벤트배너 -->
      <!-- START : 개인화 영역 -->
      <!-- <MainSectionUser /> -->
      <!-- END : 개인화 영역 -->
      <!-- START : 타임 세일 -->
      <section class="main-item time-sale">
        <h2 class="main-item-title">5시까지만 할인해요</h2>
        <MainSectionTime :expire="expire" />
        <!-- <ProductSlide :slideMargin="5" /> --> <!-- 실 사용 컴포넌트 -->
        <ProductList02 :slideMargin="5" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
      </section>
      <!-- END : 타임 세일 -->
      <!-- START : 새로운 상품 -->
      <section class="main-item today-new">
        <h2 class="main-item-title">새로 나왔어요</h2>
        <!-- <MainSectionCategory /> --> <!-- 실 사용 컴포넌트 -->
        <MainSectionCategory01 /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
        <!-- <ProductSlide :slideMargin="5" /> --> <!-- 실 사용 컴포넌트 -->
        <ProductList03 :slideMargin="5" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
      </section>
      <!-- END : 새로운 상품 -->
      <!-- START : 하나 더 증정 -->
      <section class="main-item">
        <h2 class="main-item-title">하나 더 드려요</h2>
        <!-- <ProductSlide :slideMargin="5" /> --> <!-- 실 사용 컴포넌트 -->
        <ProductList04 :slideMargin="5" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
      </section>
      <!-- END : 하나 더 증정 -->
      <!-- START : 심플리쿡 -->
      <section class="main-item simply-cook">
        <h2 class="main-item-title">
          <span class="logo">
            <img src="@/assets/images/logo_simple_cook.png" alt="심플리쿡로고" />
          </span>
          간편하고 맛있게 요리해요
        </h2>
        <!-- <ProductSlide :slideShow="1.2" :slideMargin="5" /> --> <!-- 실 사용 컴포넌트 -->
        <ProductList05 :slideShow="1.2" :slideMargin="5" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
      </section>
      <!-- END : 심플리쿡 -->
      <!-- START : 오!핫딜 상품 -->
      <section class="main-item">
        <h2 class="main-item-title">오! 핫딜 상품만 모았어요</h2>
        <MainHotDeal />
      </section>
      <!-- START : 오!핫딜 상품 -->
      <!-- END : 검색어순위 -->
      <section class="main-item">
        <h2 class="main-item-title">지금 뜨고 있어요</h2>
        <MainRankAccordion />
      </section>
      <!-- END : 검색어순위 -->
      <!-- START : 카테고리 추천 -->
      <section class="main-item">
        <article>
          <h2 class="main-item-title">육즙가득 우월한우</h2>
          <MainSectionCategory />
          <!-- <ProductSlide :slideMargin="5" /> --> <!-- 실 사용 컴포넌트 -->
          <ProductList07 :slideMargin="5" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
        </article>
        <article>
          <h2 class="main-item-title">달콤한 가을 과일</h2>
          <!-- <MainSectionCategory /> --> <!-- 실 사용 컴포넌트 -->
          <MainSectionCategory02 /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <!-- <ProductSlide :slideMargin="5" /> --> <!-- 실 사용 컴포넌트 -->
          <ProductList08 :slideMargin="5" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
        </article>
        <article>
          <h2 class="main-item-title">신선한 제철채소</h2>
          <!-- <MainSectionCategory /> --> <!-- 실 사용 컴포넌트 -->
          <MainSectionCategory03 /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <!-- <ProductSlide :slideMargin="5" /> --> <!-- 실 사용 컴포넌트 -->
          <ProductList09 :slideMargin="5" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
        </article>
        <article>
          <h2 class="main-item-title">싱싱한 산지직송 수산</h2>
          <!-- <MainSectionCategory /> --> <!-- 실 사용 컴포넌트 -->
          <MainSectionCategory04 /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <!-- <ProductSlide :slideMargin="5" /> --> <!-- 실 사용 컴포넌트 -->
          <ProductList10 :slideMargin="5" /> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
        </article>
      </section>
      <!-- END : 카테고리 추천 -->
    </main>
    <!-- END : 본문 -->
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
    <!-- START : 하단 티커 -->
    <AlarmTicker :typingStatus="isTyping" :showTabbar="showTabbar" @typingDestroyEvent="typingDestroyAction" />
    <!-- END : 하단 티커 -->
  </div>
</template>

<script>
import MainHeader from '@/components/common/MainHeader';
import Footer from '@/components/common/Footer';
import AlarmTicker from '@/components/common/AlarmTicker'; // 마켓팅 알림
import Tabbar from '@/components/common/Tabbar'; // 네비게이션 탭 바
import Sidebar from '@/views/ss/AllCategory'; // 전체 카테고리
import MainSlide from '@/components/main/MainSlide'; // 메인 비쥬얼
import MenuSlide from '@/components/common/MenuSlide'; // GNB
import BannerSlide from '@/components/main/BannerSlide'; // 이벤트 띠배너
import MenuQuick from '@/components/main/MenuQuick'; // 퀵메뉴
// import MainSectionUser from '@/components/main/MainSectionUser'; // 개인화 영역
import MainSectionTime from '@/components/main/MainSectionTime'; // 위대한 빅세일
import MainSectionCategory from '@/components/main/MainSectionCategory'; // 카테고리 추천 상품
import MainRankAccordion from '@/components/main/MainRankAccordion'; // 실시간 급상승
import MainHotDeal from '@/components/main/MainHotDeal'; // 오!핫딜 상품
// import ProductSlide from '@/components/product/ProductSlide'; // 실 사용 데이터
/* START : 기획&디자인확인용 */
import MainSectionCategory01 from '@/components/_temp/MainSectionCategory01';
import MainSectionCategory02 from '@/components/_temp/MainSectionCategory02';
import MainSectionCategory03 from '@/components/_temp/MainSectionCategory03';
import MainSectionCategory04 from '@/components/_temp/MainSectionCategory04';
import ProductList02 from '@/components/_temp/ProductList02';
import ProductList03 from '@/components/_temp/ProductList03';
import ProductList04 from '@/components/_temp/ProductList04';
import ProductList05 from '@/components/_temp/ProductList04';
import ProductList07 from '@/components/_temp/ProductList07';
import ProductList08 from '@/components/_temp/ProductList08';
import ProductList09 from '@/components/_temp/ProductList09';
import ProductList10 from '@/components/_temp/ProductList10';
/* END : 기획&디자인확인용 */
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import scrollDir from 'scrolldir';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "Main",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '%s'
  },
  components: {
    MainHeader,
    Footer,
    AlarmTicker,
    Tabbar,
    Sidebar,
    MainSlide,
    MenuSlide,
    BannerSlide,
    MenuQuick,
    // MainSectionUser,
    MainSectionTime,
    MainSectionCategory,
    MainRankAccordion,
    MainHotDeal,
    // ProductSlide,
    MainSectionCategory01,
    MainSectionCategory02,
    MainSectionCategory03,
    MainSectionCategory04,
    ProductList02,
    ProductList03,
    ProductList04,
    ProductList05,
    ProductList07,
    ProductList08,
    ProductList09,
    ProductList10,
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      activeIndex: 0,
      isTyping: true, // 하단 티커 활성화
      expire: '2019122723000000', // 만료시간(임시)
      showTabbar: true, // 네이게이션 활성화
      lastScroll: 0,
      gnbOffsetTop: 0,
      sidebar: {
        active: false, // 사이드바 활성화
        sidebarBtn: {} // 사이드바 포커스 이벤트
      },
      popup: {
        open: false,
      }
    };
  },
  methods: {
    typingDestroyAction(e) { // 하단 티커 비활성화 함수
      this.isTyping = null;
    },
    gnbInit() { // GNB offsetTop 구하는 함수
      this.gnbOffsetTop = document.querySelector('.wrap-main-slide').clientHeight - 45;
    },
    headerAction(scroll) { // GNB sticky 함수
      const gnb = document.querySelector('.wrap-gnb');
      const header = document.querySelector('.wrap-main-header');
      const h = header.clientHeight;
      if (scroll + h > this.gnbOffsetTop) {
        header.classList.add('sticky');
        gnb.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
        gnb.classList.remove('sticky');
      }
    },
    tabbarAction() { // 네이게이션 탭바 활성화 함수
      const direction = document.querySelector('html').getAttribute('data-scrolldir');
      if (direction === 'up') {
        this.showTabbar = true;
      } else if (direction === 'down') {
        this.showTabbar = false;
      }
      // 스크롤이 페이지 최하단시 탭바 메뉴 노출
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.showTabbar = true;
      }
    },
    sidebarAction () { // 전체 카테고리 활성화 함수
      this.sidebar.active = !this.sidebar.active;
      this.showTabbar = true;
      if (event.target.tagName === 'BUTTON') {
        this.sidebar.sidebarBtn = event.target;
      } else {
        this.sidebar.sidebarBtn.focus();
        window.scrollTop = this.lastScroll + 'px';
      }
    },
  },
  mounted() {
    const $this = this;
    window.addEventListener('scroll', function() {
      $this.headerAction(window.pageYOffset);
      $this.tabbarAction();
      $this.lastScroll = window.pageYOffset;
    });
    scrollDir();
    // 추가 : START 2020.02.17 gnb 위치값 resize 시 업데이트 추가
    window.addEventListener('resize', function() {
      $this.gnbInit();
    });
    // 추가 : END 2020.02.17 gnb 위치값 resize 시 업데이트 추가
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this);
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open || this.sidebar.active) {
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
  }
};
</script>

<style>
</style>

