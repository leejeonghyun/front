<template>
  <div class="wrap wrap-wine25">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="와인25" :tabbar="false" /><!-- 9월 수정 : 헤더 유형 변경 -->
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <figure class="wrap-wine-main-banner">
        <p class="hidden">
          강남구, 서초구, 송파구 운영중
          WINE 25 오전 11시까지 주문하고 오후 6시부터 찾아가는 와인 25 파격할인을 만나보세요
          상품 1. 화이트데이 기념 파격 프로포즈 와인 55% 텔모 앤 루스 리제르바 42,000원에서 55% 할인 19,000원
          상품 2. 자연을 생각한 내추럴 와인 호주 최고 와인메이커 피터 프레이즈 역작 양가라 PF 쉬라즈 120,000원에서 48% 할인 63,000원
          상품 3. 3월, 이 달의 PICK 한정수량 생산, 프랑스 오크통 24개월 숙성 마셋 그란 셀렉시옹 30,000원에서 37% 할인 19,000원
          절차 원하는 와인을 예약하세요 수령할 GS25를 선택하세요 입고 문자를 보내드려요 점포에서 결제해주세요
          안내사항
          일요일 또는 공휴일 예약 건은 당일 수령이 불가합니다.
          현장 결제 시 GS&POINT 적립 가능합니다.
          와인 당일배송 예약은 서울 일부 점포 (강남구, 서초구, 송파구 GS25)에 한해 시범 운영 됩니다.
          추후 서비스 지역 확대 예정입니다.
        </p>
        <img src="@/wine25/assets/images/_temp/banner_main.jpg" alt="">
      </figure>
      <div class="wrap-wine-list-top wrap-wine25-section">
        <h2 class="h-title">
          <strong>상품을 선택해 주세요.</strong>
        <button class="wine btn btn-border">예약내역</button>
        </h2>
        <!-- <p class="wrap-inp-chk">
          <span class="inp-chk-wine">
            <input type="checkbox" name="" id="chkListAll" value="">
            <label for="chkListAll">전체선택</label>
          </span>
          <span>
            총<strong>25</strong>개
          </span>
        </p> -->
      </div>
      <div class="wrap-wine-list">
        <ul class="tab-list" ref="tabList">
          <li>
            <button id="tabWineList" aria-controls="tab-contents1" :class="{active: this.tab.tabWineList}" @click="tabAction('tabWineList')">와인</button>
          </li>
          <li>
            <button id="tabLiqueur" aria-controls="tab-contents2" :class="{active: this.tab.tabLiqueur}" @click="tabAction('tabLiqueur')">기타주류</button>
          </li>
        </ul>
        <div class="tab-content wrap-wine25-section" ref="tabContents" tabIndex="0">
          <div id="tab-contents1" class="tab-contents" aria-labelledby="tabWineList" v-if="tab.tabWineList">
            <!-- inpId 값은 input id 값 중복 방지를 위해 임의 삽입한 데이터 -->
            <!-- 8월수정 START : 팝업 활성화를 위한 이벤트 연결 -->
            <WineProduct v-for="n in 10" :key="n" :inpId="n" @popupEvent="popupAction" />
            <!-- 8월수정 END : 팝업 활성화를 위한 이벤트 연결 -->
          </div>
          <div id="tab-contents2" class="tab-contents" aria-labelledby="tabLiqueur" v-if="tab.tabLiqueur">
            <!-- inpId 값은 input id 값 중복 방지를 위해 임의 삽입한 데이터 -->
            <!-- 8월수정 START : 팝업 활성화를 위한 이벤트 연결 -->
            <WineProduct v-for="n in 10" :key="n+'_2'" :inpId="n+'_2'" @popupEvent="popupAction" />
            <!-- 8월수정 END : 팝업 활성화를 위한 이벤트 연결 -->
          </div>
        </div>
        <div class="area-btn wrap-wine25-section"><button type="button" class="strong">예약하기</button></div>
      </div>
      <div class="wrap-wine-bottom-btn">
        <button class="btn btn-bg white" aria-haspopup="dialog" @click="popupAction('popupWineInfo')">안내</button>
        <button class="btn btn-bg wine">바로예약</button>
      </div>
    </main>
    <transition name="popupWineInfo"
    v-on:enter="popupWineInfoEnter"
    v-on:after-enter="popupWineInfoAfterEnter"
    v-on:leave="popupWineInfoLeave">
      <PopupWineInfo v-if="popup.popupWineInfo" @popupEvent="popupAction"/>
    </transition>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
    <!-- 8월수정 START : 팝업 추가 -->
    <PopupWineDefault v-if="popup.popupWineDefault" @popupEvent="popupAction" /> <!-- 와인 풀팝업 기본 -->
    <!-- 8월수정 END : 팝업 추가 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer';
import WineProduct from '@/wine25/components/WineProduct'; // 와인 상품
import PopupWineInfo from '@/wine25/views/wine-reservation002'; // 와인 예약 안내 팝업
// 8월수정 START : 팝업 추가
import PopupWineDefault from '@/wine25/views/wine-popup'; // 와인 풀팝업 기본
// 8월수정 END : 팝업 추가
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
export default {
  name: "WineList",
  mixins: [],
  metaInfo: {
    title: 'GS 프레시몰',
    titleTemplate: '예약상품리스트 < 와인25 < %s'
  },
  components: {
    SubDefaultHeader,
    WineProduct,
    // 8월수정 START : 팝업 추가
    PopupWineDefault, // 와인 풀팝업 기본
    // 8월수정 END : 팝업 추가
    PopupWineInfo,
    Footer
  },
  data() {
    return {
      popup: { // 팝업
        open: false, // 팝업 활성화 여부
        popupWineDefault: false, // 와인 풀팝업 기본
        popupWineInfo: false, // 와인 예약 안내
      },
      tab: {
        tabWineList: true,
        tabLiqueur: false,
      }
    };
  },
  methods: {
    // 팝업
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupWineInfoEnter(el) {
      el.style.opacity = '0';
      el.style.bottom = '-100%';
    },
    popupWineInfoAfterEnter(el) {
      el.style.opacity = '1';
      el.style.bottom = '0';
    },
    popupWineInfoLeave(el) {
      el.style.opacity = '0';
      el.style.bottom = '-100%';
    },
     // tab
    tabAction(type) {
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      // this.$refs.tabContents.focus(); // 9월 수정 삭제
    },
  },
  mounted() {
  },
  /* 9월 수정 START : 팝업 딤드 시 락 조건 변경 */
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
    };
  },
  destroyed() {
    clearAllBodyScrollLocks(this);
  },
  /* 9월 수정 END : 팝업 딤드 시 락 조건 변경 */
};
</script>
