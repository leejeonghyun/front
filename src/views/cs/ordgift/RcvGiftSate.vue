<!--
마이페이지  선물내역  받은선물    SC-FO-SS-GF-MS-814  PG-FO-CS-O027 RcvGiftSate   받은선물 내역
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]"><!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="선물/조르기" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="gift-bowing-wrap">
        <div class="wrap-tab">
          <!-- START : 선물/조르기 탭 영역 -->
          <ul ref="tabList" class="tablist type02">
            <li>
              <button type="button" id="tabGift01" aria-controls="tabGift01-contents" @click="tabAction('tabGift01')" :class="{active: this.tab.tabGift01}">
                받은 선물
              </button>
            </li>
            <li>
              <button type="button" id="tabGift02" aria-controls="tabGift02-contents" @click="tabAction('tabGift02')" :class="{active: this.tab.tabGift02}">
                보낸 선물
              </button>
            </li>
            <li>
              <button type="button" id="tabGift03" aria-controls="tabGift03-contents" @click="tabAction('tabGift03')" :class="{active: this.tab.tabGift03}">
                조르기
              </button>
            </li>
          </ul>
          <!-- END : 선물/조르기 탭 영역 -->
          <!-- START : 탭 콘텐츠 영역 -->
          <div ref="tabContents" tabindex="0">
            <!-- START : 받은 선물 탭 -->
            <div id="tabGift01-contents" class="tabcontents" aria-labelledby="tabGift01-contents" v-if="this.tab.tabGift01">
              <!-- START : 받은 선물 리스트 -->
              <div class="wrap-received-gift">
                <strong class="received-date">2020.01.22(수)</strong>
                <span class="bowing-gift" v-if="this.bowingGift">조르기 선물</span>
                <ReceivedSentGift />
                <ReceivedSentGift />
                <ReceivedSentGift />
              </div>
              <!-- END : 받은 선물 리스트 -->
              <!-- START : 받은 선물 리스트 -->
              <div class="wrap-received-gift">
                <strong class="received-date">2020.01.20(월)</strong>
                <span class="bowing-gift" v-if="!this.bowingGift">조르기 선물</span>
                <ReceivedSentGift :accept="!standBy" />
                <ReceivedSentGift />
              </div>
              <!-- END : 받은 선물 리스트 -->
              <div class="btn-area">
                <button type="button" class="btn-more-list">더보기</button>
              </div>
            </div>
            <!-- END : 받은 선물 탭 -->
            <!-- START : 보낸 선물 탭 -->
            <div id="tabGift02-contents" class="tabcontents" aria-labelledby="tabGift02-contents" v-if="this.tab.tabGift02">
              <!-- START : 보낸 선물 리스트 -->
              <div class="wrap-received-gift">
                <strong class="received-date">2020.01.22(수)</strong>
                <span class="bowing-gift" v-if="this.bowingGift">조르기 선물</span>
                <ReceivedSentGift :accept="standBy" />
                <ReceivedSentGift :accept="!standBy" />
              </div>
              <!-- END : 보낸 선물 리스트 -->
              <!-- START : 보낸 선물 리스트 -->
              <div class="wrap-received-gift">
                <strong class="received-date">2020.01.20(월)</strong>
                <span class="bowing-gift" v-if="!this.bowingGift">조르기 선물</span>
                <ReceivedSentGift :accept="!standBy" />
                <ReceivedSentGift :accept="standBy" />
              </div>
              <!-- END : 보낸 선물 리스트 -->
              <div class="btn-area">
                <button type="button" class="btn-more-list">더보기</button>
              </div>
            </div>
            <!-- END : 보낸 선물 탭 -->
            <!-- START : 조르기 탭 -->
            <div id="tabGift03-contents" class="tabcontents" aria-labelledby="tabGift03-contents" v-if="this.tab.tabGift03">
              <!-- START : 조르기 리스트 -->
              <div class="wrap-bowing-gift">
                <BowingGift />
                <BowingGift />
                <BowingGift />
                <BowingGift />
              </div>
              <!-- END : 조르기 리스트 -->
              <div class="btn-area">
                <button type="button" class="btn-more-list">더보기</button>
              </div>
            </div>
            <!-- END : 조르기 탭 -->
          </div>
        </div>
        <!-- START : 탭 콘텐츠 영역 -->
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
import ReceivedSentGift from '@/views/cs/ordgift/ReceivedSentGift'; // 받은 선물 리스트(보낸선물)
import BowingGift from '@/views/cs/ordgift/BowingGift'; // 조르기 리스트
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "GiftBowing",
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    ReceivedSentGift, // 받은 선물, 보낸 선물 리스트
    BowingGift, // 조르기 리스트
  },
  data() {
    return {
      tab: {
       tabGift01: true, // 받은 선물
       tabGift02: false, // 보낸 선물
       tabGift03: false, // 조르기
      },
      popup: { // 팝업
        open: false,
      },
      bowingGift: false, // 조르기 선물
      standBy: false, // 수락대기 일 경우 하단 버튼 노출
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물/조르기 < 마이페이지 <%s'
  },
  mixins: [],
  methods: {
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`]; // popup
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false; // view - body
    },
    tabAction(type) { // tab
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.$refs.tabContents.focus();
    },
  },
  updated() {},
  mounted() {

  },
};
</script>
<style lang="scss">
</style>
