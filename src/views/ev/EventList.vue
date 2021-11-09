<!--
Design: views/ev/SC-FO-EV-GF-MS-027.vue
Pg id: PG-FO-EV-O001
Uri: /ev/event_list
-->
<template>
  <div class="wrap main" v-bind:class="[siteClass]">
    <!-- START : Header -->
    <SubDefaultHeader headerText="이벤트"/>
      <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
        <!-- START : 배너 -->
        <div class="wrap-event-banner banner-promotion" ref="banner">
          <div class="wrap-swiper">
            <div class="swiper-button-prev" aria-label="이전슬라이드" slot="button-prev" ref="bannerSwiperPrev" role="button" @click="slideStopAction"  @focusin="slideStopAction"></div>
            <swiper :options="swiperOption" ref="bannerSwiper">
              <swiperSlide v-for="(eventBannerList,index) in eventBanner" v-bind="eventBannerList" v-bind:key="index">
                <gs-link :to="eventBannerList.linkUrl" class="banner" data-sc-action="banner.click" data-dimension-name="banner.main" :data-dimension-value="eventBannerList.imgAltTextCnts">
                  <figure><img :src="eventBannerList.ctnsPathNm" :alt="eventBannerList.imgAltTextCnts" /></figure>
                </gs-link>
              </swiperSlide>
            </swiper>
            <div class="swiper-pagination swiper-number-pagination" ref="bannerSwiperPagination" slot="pagination" aria-live="assertive" aria-atomic="true"></div>
            <div class="swiper-button-next" aria-label="다음슬라이드" slot="button-next" ref="bannerSwiperNext" role="button" @click="slideStopAction"  @focusin="slideStopAction"></div>
          </div>
          <div class="wrap-controls">
            <button class="btn-slide-controls" :class="{stop : slideStop}" @click="slidePlayAction">
              <span class="hidden" aria-live="assertive" aria-atomic="true">{{slideStop ? "자동슬라이드멈추기" : "자동슬라이드시작"}}</span>
            </button>
          </div>
        </div>
        <!-- END : 배너 -->
        <div class="wrap-event-tab">
          <div class="tab-menu tab-list">
            <ul ref="tabList" class="tablist">
              <li><button id="tabEvent" :class="{active: this.tab.tabEvent}" aria-controls="tab-contents1" @click="tabAction('tabEvent')">이벤트</button></li>
              <li><button id="tabWinner" :class="{active: this.tab.tabWinner}" aria-controls="tab-contents2" @click="tabAction('tabWinner')">당첨자발표</button></li>
            </ul>
          </div>
          <div class="tab-contents" ref="tabContents" tabIndex="0">
            <div id="tab-contents1" class="tabcontents" aria-labelledby="tabEvent" v-show="this.tab.tabEvent">
              <!-- START : 이벤트 목록 -->
              <ul class="wrap-event-list">
                <li class="list" v-for="(eventList,i) in eventData" v-bind="eventList" v-bind:key="i" v-show="pageCtn.eventCnt > i">
                  <gs-link :to="'/ev/event/'+eventList.eventId" class="link">
                    <figure :alt="eventList.eventNm" :title="eventList.eventNm">
                      <img v-bind:src="eventList.ctnsPathNm" v-if="eventList.ctnsPathNm" />
                    </figure>
                    <dl class="event-info">
                      <dt class="hidden">{{eventList.eventNm}}</dt>
                      <dd class="title">{{eventList.eventNm}}</dd>
                      <dd class="period">{{getDate(eventList.eventBeginDttm,'YYYY.MM.DD')}} ~ {{getDate(eventList.eventEndDttm,'YYYY.MM.DD')}}</dd>
                    </dl>
                  </gs-link>
                </li>
                <NoList NoListText="진행중인 이벤트가 없습니다." :ListType="'mypage-notice'" v-if="isLoaded.event && eventData.length <= 0 "/>
              </ul>
              <div class="btn-more-detail-view" v-if="eventData.length > pageChk('eventCnt')"><!-- 4월 수정 : 더보기 버튼 추가 class명 변경 -->
                <button class="btn-border" aria-label="쿠폰더보기"><span aria-live="assertive" aria-atomic="true" @click="pagePlus('eventCnt')">더보기</span></button>
              </div>
              <!-- END : 이벤트 목록 -->
            </div>
            <div id="tab-contents2" class="tabcontents" aria-labelledby="tabWinner" v-show="this.tab.tabWinner">
              <!-- START : 당첨자 목록 -->
              <ul class="wrap-notice-list">
                <li class="list" v-for="(winnerData,i) in winnerNowList" v-bind="winnerData" :key="winnerData.eventId" v-show="pageCtn.winCnt > i">
                  <gs-link :to="`/ev/event_winner/`+ winnerData.eventId" class="link">
                    <div class="notice-title"><strong>[{{winnerData.eventNm}}]</strong> 당첨자발표</div>
                    <span class="notice-date">{{getDate(winnerData.winInforDttm, 'YYYY.MM.DD HH:mm')}}</span>
                  </gs-link>
                </li>
                <NoList NoListText="당첨자발표내역이 없습니다." :ListType="'mypage-notice'" v-if="isLoaded.winner && winnerNowList.length <= 0 "/>
              </ul>
              <div class="btn-more-detail-view" v-if="winnerNowList.length > pageChk('winCnt')"><!-- 4월 수정 : 더보기 버튼 추가 class명 변경 -->
                <button class="btn-border" aria-label="쿠폰더보기"><span aria-live="assertive" aria-atomic="true" @click="pagePlus('winCnt')">더보기</span></button>
              </div>
              <!-- END : 이벤트 목록 -->
             </div>
          </div>
        </div>
      </main>
      <PopupAppPushAgree @popupEvent="popupAction" v-if="this.popup.pushAgreeOpenYn" /> <!-- 팝업 - APP PUSH 광고성동의 팝업 -->
      <!-- START : 푸터 -->
      <Footer/>
      <!-- END : 푸터 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer';
import SlideControlMixin from '@/mixins/SlideControlMixin';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import TokenLogin from '@/common/sample/login/TokenLogin';
import DateUtils from '@/common/DateUtils';
import LoginUtils from '@/common/LoginUtils';
import NoList from '@/components/common/NoList';
import PopupAppPushAgree from '@/components/common/PopupAppPushAgree';

export default {
  name: "EventMain",
  metaInfo() {
    return {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '이벤트 < %s',
      meta: [
        {
          property: 'aa:page',
          content: '이벤트',
        },
      ],
    };
  },
  components: {
    SubDefaultHeader,
    Footer,
    swiper,
    swiperSlide,
    NoList,
    PopupAppPushAgree,
  },
  computed: {
    swiper() {
      return this.$refs.bannerSwiper.swiper;
    }
  },
  mixins: [SlideControlMixin],
  data() {
    const $this = this;
    return {
      gnbOffsetTop: 45,
      sticky: true, // GNB 상단 고정
      isLoaded: {
        event: false,
        winner: false,
      },
      slideActiveIndex: 0, // 7월 수정 : 슬라이드 무한루프로 요건 변경으로 인한 data 수정
      slideStop: false,
      tab: { // 카테고리 - 상품 분류
        tabEvent: true,
        tabWinner: false,
      },
      popup: { // 팝업
        promId: '',
        open: false,
        pushAgreeOpenYn: false, // APP PUSH 광고성동의 팝업
      },
      swiperOption: {
        autoplay: {
          delay: 3000
        },
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true, // 7월 수정 : 슬라이드 무한루프로 요건 변경으로 인한 data 수정
        spaceBetween: 10, // 7월 수정 : 슬라이드 무한루프로 요건 변경으로 인한 data 수정
        on: {
          // 7월 수정 START : 슬라이드 무한루프로 요건 변경으로 인한 script 수정
          init() {
            $this.slideActiveIndex = this.activeIndex;
          },
          slideChange() {
            $this.slideActiveIndex = this.activeIndex;
            $this.slideTabindex($this);
          },
          // 7월 수정 START : 슬라이드 무한루프로 요건 변경으로 인한 script 수정
          touchStart: function () { // 2020.03.09 추가
            $this.slideStop = true;
          },
        }
      },
      winnerList: [],
      eventData: [],
      eventBanner: [],
      winnerTotalCount: 0,
      winnerNowList: [],
      tabType: '',
      pageCtn: {
        eventCnt: 10,
        winCnt: 10
      },
      mallDiv: CookieUtils.getMallId(),
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    slidePlayAction() {
      this.slideStop = this.slidePlayEvent('bannerSwiper', this.slideStop);
    },
    slideStopAction() {
      this.slideStop = this.slidePlayEvent('bannerSwiper');
    },
    async tabAction(type) { // tab
      this.tabType = type;
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      if (!this.isLoaded.winner && type === 'tabWinner') {
        this.winnerNowList = [],
        this.winnerTotalCount = 0;
        await this.retrievelistWinnrPblsh();
      }
    },
    popupAction(type, promId) { // 팝업 활성/비활성
      this.popup.promId = promId;
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false;
    },
    async retrievelistWinnrPblsh() {
      await ApiUtils.get('/ev/eventinq/winner-publish-list', {cmmSteId: CookieUtils.getCmmSteId()}) // [202017P] 2020.12.01 당첨자발표목록 Market For 커머스사이트ID 추가
      .then(res => {
        this.isLoaded.winner = true;
        if (res.data && res.data.success && res.data.data) {
          this.winnerList = res.data.data.resultData;
          this.winnerTotalCount = res.data.data.totalCount;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });

      if (this.winnerList.length > 0) {
        for (let i = 0; i < this.winnerList.length; i++) {
          this.winnerNowList.push(this.winnerList[i]);
        }
      }
    },
    async eventList() {
      await ApiUtils.get('/ev/eventinq/progress-event-list', {cmmSteId: CookieUtils.getCmmSteId()})// [202017P] 2020.11.30 Market For 커머스사이트ID 추가
      .then(res => {
        this.isLoaded.event = true;
        if (res.data && res.data.success && res.data.data) {
          this.eventData = res.data.data.progEventList;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    },
    pagePlus(page) {
      this.pageCtn[`${page}`] = this.pageCtn[`${page}`] + 10;
    },
    pageChk(page) {
      return this.pageCtn[`${page}`];
    },
    getDomain(eventId) {
      const homeCode = 'cm';
      return CookieUtils.getDomain(homeCode)+'/ev/event/'+eventId;
    },
    getDate (date, format) {
        return DateUtils.format(date, format);
    },
    // 7월 수정 START : 슬라이드 무한루프로 요건 변경으로 인한 script 추가
    slideTabindex($this) {
      const slide = $this.$refs.bannerSwiper.swiper.slides;
      if (slide.length > 0) {
        for (let i = 0; i < slide.length; i++) {
          slide[i].setAttribute('tabindex', '-1');
          slide[i].children[0].setAttribute('tabindex', '-1');
        }
        slide[$this.slideActiveIndex].children[0].setAttribute('tabindex', '0');
      }
    }
    // 7월 수정 END : 슬라이드 무한루프로 요건 변경으로 인한 script 추가
  },
  async mounted() {
     if ( CookieUtils.getCookie('MbrJoinTodayYn') == 'N' && CookieUtils.getCookie('PushAgreeOpenYn') == 'Y' && CookieUtils.getCmmSteId() == '1') {
      this.popup.pushAgreeOpenYn = true;
    }
    const vm = this;
    await LoginUtils.nonLoginPromise().then(function (response) {
      vm.tabType = 'tabEvent';
      vm.eventList();
      ApiUtils.get('/ev/eventinq/event-list-banner-comn-cd', {cmmSteId: CookieUtils.getCmmSteId()})// [202017P] 2020.11.30 Market For 커머스사이트ID 추가
      .then(res => {
        if (res.data && res.data.success && res.data.data && res.data.data.length > 0) {
          let param = null;
          if (vm.mallDiv == '1' && res.data.data[0].cmmSteId != '3') {
           // console.log("malldiv 1 인경우");
            param = {
              mallId: res.data.data[0].mallId,
              dspConrId: res.data.data[0].dspConrId,
              cmmSteId: res.data.data[0].cmmSteId,
              dspCtgId: 'N1001002',
              dspScrSpCd: '02',
              storId: CookieUtils.getCookie('STOR_ID'),
              supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD')
            };
            ApiUtils.get('/dp/fr/displaymgnt/display-comm-banner-info', param)
            .then(res2 => {
              if (res2.data && res2.data.success && res2.data.data) {
                vm.eventBanner = res2.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0].rdspCommConrCntInfo;
                vm.slideNextPrevButton('bannerSwiper', true, 'fraction');
                // 7월 수정 START : 슬라이드 무한루프로 요건 변경으로 인한 script 추가
                vm.$nextTick(() => {
                  vm.slideTabindex(vm);
                });
                // 7월 수정 END : 슬라이드 무한루프로 요건 변경으로 인한 script 추가
              }
            })
            .catch(e => {
              console.log(e);
            });
          } else if (vm.mallDiv == '11') {
           // console.log("malldiv 11 인경우");
            param = {
              mallId: res.data.data[0].mallId,
              dspConrId: res.data.data[0].dspConrId,
              dspCtgId: 'N11001002',
              dspScrSpCd: '02',
              storId: CookieUtils.getCookie('STOR_ID'),
              supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
            };
            ApiUtils.get('/dp/ds/displaymgnt/display-comm-banner-info', param)
            .then(res2 => {
              if (res2.data && res2.data.success && res2.data.data) {
                vm.eventBanner = res2.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0].rdspCommConrCntInfo;
                vm.slideNextPrevButton('bannerSwiper', true, 'fraction');
                // 7월 수정 START : 슬라이드 무한루프로 요건 변경으로 인한 script 추가
                vm.$nextTick(() => {
                  vm.slideTabindex(vm);
                });
                // 7월 수정 END : 슬라이드 무한루프로 요건 변경으로 인한 script 추가
              }
            })
            .catch(e => {
              console.log(e);
            });
          } else if (res.data.data[0].cmmSteId == '3') { // 마켓포인 경우, malldiv 가 1이 아닐수도 있다
            console.log("marketfor1111");
            param = {
              mallId: res.data.data[0].mallId,
              dspConrId: res.data.data[0].dspConrId,
              dspCtgId: process.env.VUE_APP_M4_EVENT_DSP_CTG_ID, // [202017P]2021.02.23 최미옥  M4 전시공통배너정보 카테고리 ID
              dspScrSpCd: '02',
              storId: CookieUtils.getCookie('STOR_ID'),
              supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
            };
            ApiUtils.get('/dp/mf/displaymgnt/display-comm-banner-info', param)
            .then(res2 => {
              if (res2.data && res2.data.success && res2.data.data) {
                vm.eventBanner = res2.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0].rdspCommConrCntInfo;
                vm.slideNextPrevButton('bannerSwiper', true, 'fraction');
                // 7월 수정 START : 슬라이드 무한루프로 요건 변경으로 인한 script 추가
                vm.$nextTick(() => {
                  vm.slideTabindex(vm);
                });
                // 7월 수정 END : 슬라이드 무한루프로 요건 변경으로 인한 script 추가
              }
            })
            .catch(e => {
              console.log(e);
            });
          }
        }
      })
      .catch(e => {
        // vm.$gsdialog.alert(e.response.data.statusMessage);
      });
    });
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
