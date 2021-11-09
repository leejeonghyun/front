<!--
Design: views/ev/SC-FO-EV-GF-MS-034.vue
Pg id: PG-FO-EV-O004 (이벤트목록(/ev/event_list) 통해서 접근 가능, 이벤트ID 필수)
Uri: /ev/event/:eventId
-->
<template>
  <div class="wrap templete-event" :class="siteClass">
    <!-- START : Header -->
    <SubDefaultHeader headerText="이벤트 상세" />
    <main class="contents" tabindex="0">
      <div class="wrap-notice" :class="isShow.dim ? `dim` : ``" id="event-period">
        <div class="notice-top">
          <div class="wrap-title">
            <div class="period" aria-label="이벤트 행사기간" v-if="eventInfo.eventBeginDttm">
              {{getDate (eventInfo.eventBeginDttm, 'YYYY.MM.DD HH:mm')}} ~ {{getDate (eventInfo.eventEndDttm, 'MM.DD HH:mm')}}
            </div>
          </div>
          <button class="btn icon btn-sns" aria-haspopup="dialog" @click="fnEventShare(`event`)">
            <span class="hidden">sns 공유하기</span>
          </button>
        </div>
        <div id="mainBody">
          <section class="event-cont event-intro" id="event-intro">
            <h2 v-if="introInfo" class="hidden">{{introInfo.ctnsDesc}}</h2>
            <img v-if="introInfo" :src="introInfo.ctnsPathNm" :alt="introInfo.ctnsDesc" :title="introInfo.ctnsDesc" />
            <!-- 기한 - 날짜 + 정보형 -->
            <div class="area-term type-split" style="background-color:#01235a;" v-if="eventInfo.winInforDttm && !isShow.replyPhotoAppReview">
              <div class="term">
                <span class="tit">행사기간</span>
                <span class="desc">{{getDate (eventInfo.eventBeginDttm, 'YYYY.MM.DD')}} - {{getDate (eventInfo.eventEndDttm, 'MM.DD')}}</span>
              </div>
              <div class="inform">
                <span class="tit">당첨자 발표일</span>
                <span class="desc">{{getDate (eventInfo.winInforDttm, 'YYYY.MM.DD')}}</span>
              </div>
            </div>
            <section v-if="contentsInfo && contentsInfo.ctnsDtlCnts" :style="{backgroundColor:(contentsInfo ? contentsInfo.bgColorVal : '')}" class="wrap-btn-type" v-html="contentsInfo.ctnsDtlCnts"></section>
          </section>
          <section id="event-body" :style="{backgroundColor:(contentsInfo ? contentsInfo.bgColorVal : '')}">
            <section :style="{backgroundImage: (contentsInfo ? 'url(' + contentsInfo.ctnsPathNm + ')' : ''), backgroundRepeat: 'no-repeat'}">
              <section class="event-cont event-invite"></section>
              <EventTempleteAttendance ref="Attendance" v-if="eventInfo.eventTypeCd == '04'"
                :eventInfo="eventInfo"
                :winGvwyCnt="winGvwyCnt" @setWinGvwyCnt="setWinGvwyCnt"
                :eventWinGvwyList="eventWinGvwyList" @setEventWinGvwyList="setEventWinGvwyList"
                @setWinGvwyAdrsSeqnoList="setWinGvwyAdrsSeqnoList"
                @popupEvent="popupAction"
                @fnEntry="fnEntry" @setDesabledEntry="setDesabledEntry"
                @fnRedirect="fnRedirect" />
              <EventTempleteStamp ref="Stamp" v-if="eventInfo.eventTypeCd == '02' || eventInfo.eventTypeCd == '03'"
                :eventInfo="eventInfo"
                :eventWinGvwyList="eventWinGvwyList" @setEventWinGvwyList="setEventWinGvwyList"
                @popupEvent="popupAction" @setPopupCongInfo="setPopupCongInfo"
                @setWinGvwyAdrsSeqnoList="setWinGvwyAdrsSeqnoList"
                @fnRedirect="fnRedirect" />
              <EventTempleteRoulette ref="Roulette" v-if="eventInfo.eventTypeCd == '01'"
                :eventInfo="eventInfo"
                @fnWinPopOpen="fnWinPopOpen"
                @popupEvent="popupAction"
                @fnEntry="fnEntry" @setDesabledEntry="setDesabledEntry"
                @fnRedirect="fnRedirect" />
              <EventTempleteAdAgree ref="EventComnAd" v-if="eventInfo.eventTypeCd == '05'"
                :eventInfo="eventInfo"
                @fnEntry="fnEntry" @setDesabledEntry="setDesabledEntry"
                @fnRedirect="fnRedirect" />
              <EventTempleteReply ref="Reply" v-if="isShow.reply"
                :eventInfo="eventInfo"
                @fnEntry="fnEntry" @setDesabledEntry="setDesabledEntry"
                @fnRedirect="fnRedirect" />
              <EventTempleteAppPush ref="AppPush" v-if="isShow.appPush"
                :eventInfo="eventInfo"
                @fnEntry="fnEntry" @setDesabledEntry="setDesabledEntry"
                @fnRedirect="fnRedirect" />
              <EventTempleteReplyPhotoAppReview ref="ReplyPhotoAppReview" v-if="isShow.replyPhotoAppReview"
                :eventDtlTypeCd="eventDtlTypeCd"
                @fnEntry="fnEntry" @setDesabledEntry="setDesabledEntry"
                @fnRedirect="fnRedirect"
                :imgDiv="imgDiv" />
              <EventTempleteReplyPhoto ref="ReplyPhoto" v-if="isShow.replyPhoto"
                @fnEntry="fnEntry" @setDesabledEntry="setDesabledEntry"
                @fnRedirect="fnRedirect"
                :imgDiv="imgDiv" />
              <EventTempleteQuiz ref="Quiz" v-if="eventInfo.eventTypeCd == '11'"
                :eventInfo="eventInfo"
                @fnWinPopOpen="fnWinPopOpen"
                @fnEntry="fnEntry" @setDesabledEntry="setDesabledEntry"
                @fnRedirect="fnRedirect" />
              <EventTempleteRank ref="Rank" v-if="eventInfo.eventTypeCd == '13'"
                :eventInfo="eventInfo" />
              <EventTempleteVote ref="Vote" v-if="eventInfo.eventTypeCd == '12'"
                :eventInfo="eventInfo"
                @fnEntry="fnEntry" @setDesabledEntry="setDesabledEntry"
                @fnRedirect="fnRedirect" />
              <section class="wrap-btn-type" v-if="eventInfo.eventTypeCd == '06'">
                <button type="button" class="btn type4" :class="eventInfo.btnRound" aria-haspopup="dialog" @click="onEntry()">응모하기</button>
              </section>
              <section class="wrap-btn-type" v-if="eventInfo.eventTypeCd == '10'">
                <button type="button" class="btn type4" :class="eventInfo.btnRound" aria-haspopup="dialog" @click="fnEventShare(`friend`)">추천하기</button>
              </section>
            </section>
          </section>
          <!-- 스와이프 배너 -->
          <EventComnSwiper id="event-swiper"
            :eventInfo="eventInfo"
            :isShow="isShow.swiper" />
          <!-- 개인정보동의 -->
          <EventComnPrivacy id="event-privacy" ref="Privacy"
            :eventInfo="eventInfo"
            :privacyInfo="privacyInfo"
            @setPrivacy="setPrivacy"
            :isShow="isShow.privacy" />
          <!-- 안내, 공지사항 -->
          <EventComnNotice id="event-notice"
            :eventInfo="eventInfo"
            :isShow="isShow.notice" />
          <!-- 혜택 -->
          <EventComnBene id="event-bene" ref="Bene"
            :eventInfo="eventInfo"
            :isShow="isShow.bene" />
          <!-- 배너 -->
          <EventComnBanner id="event-banner"
            :eventInfo="eventInfo"
            :isShow="isShow.banner" />
          <!-- 연관 상품 -->
          <EventComnRelatedItem id="event-item"
            :eventInfo="eventInfo" />
          <PopupEventGvwyAddr v-if="popup.popupEventGvwyAddr"
            @popupEvent="popupAction"
            @fnPopupEventGvwyAddr="fnPopupEventGvwyAddr" />
        </div>
      </div>
    </main>
    <Footer/>
    <PopupShareEvent v-if="popup.popupShareEvent"
      :shareInfo="shareInfo"
      @popupEvent="popupAction" />
    <PopupCongratulation v-if="popup.popupCongratulation"
      :popupCongInfo="popupCongInfo"
      @popupEvent="popupAction" />
    <PopupAlert v-if="popup.popupAlert"
      :popupAlertInfo="popupAlertInfo" />

    <div id="scriptArea"></div>
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer';
import EventComnSwiper from './EventComnSwiper';
import EventComnPrivacy from './EventComnPrivacy';
import EventComnNotice from './EventComnNotice';
import EventComnBene from './EventComnBene';
import EventComnBanner from './EventComnBanner';
import EventComnRelatedItem from './EventComnRelatedItem'; // bos 에서 설정되는 연관상품
import EventTempleteAdAgree from './EventTempleteAdAgree';
import EventTempleteAttendance from './EventTempleteAttendance';
import EventTempleteRoulette from './EventTempleteRoulette';
import EventTempleteAppPush from './EventTempleteAppPush';
import EventTempleteReply from './EventTempleteReply';
import EventTempleteReplyPhotoAppReview from './EventTempleteReplyPhotoAppReview'; // [25] 앱리뷰   DEPBOSFR-7343
import EventTempleteReplyPhoto from './EventTempleteReplyPhoto';
import EventTempleteQuiz from './EventTempleteQuiz';
import EventTempleteStamp from './EventTempleteStamp'; // 연관상품
import EventTempleteRank from './EventTempleteRank';
import EventTempleteVote from './EventTempleteVote';
import PopupEventGvwyAddr from './PopupEventGvwyAddr';
import PopupShareEvent from './PopupShareEvent'; // 팝업  공유하기
import PopupCongratulation from './PopupCongratulation';
import PopupAlert from './PopupAlert';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import DateUtils from '@/common/DateUtils';
import JwtUtils from '@/common/JwtUtils';
import LoginUtils from '@/common/LoginUtils';
import NumberUtils from '@/common/NumberUtils';
import Tracker from '@/common/Tracker';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ContextUtils from '@/common/ContextUtils';

export default {
  name: 'EventTemplete',
  metaInfo() {
    return {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '통합 < 이벤트 < %s',
      meta: [
        { property: 'aa:page', content: '이벤트^' + this.eventInfo.eventNm },
        { property: 'og:url', content: this.eventInfo.eventUrl },
        { property: 'og:title', content: '제목: ' + this.eventInfo.eventNm },
        { property: 'og:description', content: '설명: ' + this.eventInfo.eventNm },
        { property: 'og:image', content: !this.shareImg||this.shareImg.ctnsPathNm },
      ],
    };
  },
  components: {
    SubDefaultHeader,
    Footer,
    EventComnSwiper,
    EventComnPrivacy,
    EventComnNotice,
    EventComnBene,
    EventComnBanner,
    EventTempleteAdAgree,
    EventTempleteAttendance,
    EventTempleteRoulette,
    EventTempleteAppPush,
    EventTempleteReply,
    EventTempleteReplyPhotoAppReview,
    EventTempleteReplyPhoto,
    EventComnRelatedItem,
    EventTempleteQuiz,
    EventTempleteStamp,
    EventTempleteRank,
    EventTempleteVote,
    PopupEventGvwyAddr,
    PopupShareEvent,
    PopupCongratulation,
    PopupAlert,
  },
  mixins: [],
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      eventInfo: {},
      isShow: {
        appPush: false,
        reply: false,
        replyPhotoAppReview: false,
        replyPhoto: false,
        main: false,
        dim: false,
        swiper: false,
        privacy: false,
        notice: false,
        bene: false,
        banner: false,
      },
      introInfo: null,
      contentsInfo: null,
      privacyInfo: [],
      contentOrder: new Array(8),
      privacyParams: {
        useAssent: 'N',
        consignmentAssent: 'N',
      },
      popup: { // 팝업
        popupEventGvwyAddr: false, // 경품지 팝업
        popupShareEvent: false, // 공유하기
        popupCongratulation: false, // 응모당첨
        popupAlert: false, // 컨펌 메세지
        /* 4월수정 START : 컴포넌트 삭제 및 12. 댓글이벤트(포토) 팝업 추가 */
        open: false,
        popupSales: false, // 할인 내역 팝업
        popupOption: false, // 장바구니 옵션 팝업
        popupPhotoReview: false, // 댓글이벤트(포토) 팝업
        /* 4월수정 END : 컴포넌트 삭제 및 12. 댓글이벤트(포토) 팝업 추가 */
      },
      entryCondSeqno: null, // 응모 기준
      shareInfo: {},
      alertInfo: {},
      popupCongInfo: {
        title: null,
        msg: null,
        winAdrsYn: null,
        eventWinGvwyList1: [],
        eventWinGvwyList2: [],
        eventWinGvwyList3: [],
        eventWinGvwyList4: [],
        eventWinGvwyList5: [],
        eventWinGvwyErrMsg: null,
      },
      popupAlertInfo: {
        title: null,
        msg: null,
        linkNm: null,
        linkUrl: null,
        linkFn: null,
        cancelNm: null,
        cancelUrl: null,
        cancelFn: null
      },
      eventWinGvwyList: {
        eventWinGvwyList1: [],
        eventWinGvwyList2: [],
        eventWinGvwyList3: [],
        eventWinGvwyList4: [],
        eventWinGvwyList5: [],
      },
      shareImg: '',
      desabledEntry: false, // 응모 여러번 안되도록 막음
      imgDiv: '',
      winGvwyAdrsSeqnoList: [], // 배송지 입력할 경품 당첨 번호
      winGvwyCnt: 0, // 당첨된 경품 개수
      eventDtlTypeCd: '', // 0812 앱리뷰 이미지등록
    };
  },
  methods: {
    fnRedirect(pageId) {
      if (pageId == "login") {
        const returnUrl = encodeURIComponent(location.href);
        this.$router.push({ path: '/cu/login?returnUrl='+returnUrl });
      } else if (pageId == "eventList") {
        this.$router.push({ path: '/ev/event_list' });
      }
    },
    getDomain() {
      return location.origin;
      // return window.location.protocol + '//' + window.location.hostname;
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    getDate(date, format) {
      return DateUtils.format(date, format);
    },
    setWinGvwyCnt: function(value) {
      this.winGvwyCnt = value;
    },
    setWinGvwyAdrsSeqnoList: function(value) {
      this.winGvwyAdrsSeqnoList = value;
    },
    setEventWinGvwyList: function(value) {
      this.eventWinGvwyList = value;
    },
    setPopupCongInfo: function(value) {
      this.popupCongInfo = value;
    },
    setPrivacy: function(name, value) {
      this.privacyParams[name] = value;
    },
    popupAction(type) { // 팝업 활성/비활성
      this.popup.open = !this.popup.open;
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    async fnPopupEventGvwyAddr(addrParams) {
      const params = {
        winGvwyAdrsSeqnoList: this.winGvwyAdrsSeqnoList,
      };
      await ApiUtils.put('/fo/ev/eventmgnt/event-winner-addr/' + this.$route.params.eventId, Object.assign({}, params, addrParams))
      .then(res => {
        if (res.data && res.data.success) {
          this.winGvwyAdrsSeqnoList = [];
          this.$gsdialog.alert('경품지 주소가 저장되었습니다.');
        } else {
          if (res.data.data.errorMsg) {
            this.$gsdialog.alert(res.data.data.errorMsg);
          }
        }
        this.popupAction('popupEventGvwyAddr');
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    },
    async fnDisplay() {
      // set 헤더 info / 0000 = 공통, 00 = 전체, 01 = PC, 02 = 모바일, 02 = 이벤트 헤더
      if (this.eventInfo.eventCtnsList) {
        const introInfo = this.eventInfo.eventCtnsList.find(info => {
          return (
            info.eventCtnsDtlTypeCd == '0000' &&
            (info.dspScrSpCd == '00' || info.dspScrSpCd == '02') &&
            info.eventCtnsTypeCd == '02'
          );
        });
        if (introInfo) {
          this.introInfo = introInfo;
        }
      }
      // set 상세 info / 0000 = 공통, 00 = 전체, 01 = PC, 02 = 모바일, 03 = 이벤트 상세
      if (this.eventInfo.eventCtnsList) {
        const contentsInfo = this.eventInfo.eventCtnsList.find(info => {
          return (
            info.eventCtnsDtlTypeCd == '0000' &&
            (info.dspScrSpCd == '00' || info.dspScrSpCd == '02') &&
            info.eventCtnsTypeCd == '03'
          );
        });
        if (contentsInfo) {
          this.contentsInfo = contentsInfo;
          this.eventInfo['beneBgColor'] = contentsInfo.bgColorVal;
        }
      }
      // START : 레이아웃 순서
      this.contentOrder = new Array(8);
      this.contentOrder[0] = 'intro';
      this.contentOrder[1] = 'body';
      const themeInfo = [];
      if (this.eventInfo.eventDtlList) {
        for (let i = 0; i < this.eventInfo.eventDtlList.length; i++) {
          const eventDtl = this.eventInfo.eventDtlList[i];
          // 01 = 이벤트 테마 정보
          if (eventDtl.eventDtlSpCd == '01') {
            themeInfo.push(eventDtl);
          // 02 = 이벤트 영역 정보
          } else if (eventDtl.eventDtlSpCd == '02') {
            // 01 = 스와이프배너
            if (eventDtl.eventDtlTypeCd == '01') {
              if (eventDtl.eventDtlFrstRank != 0) {
                this.contentOrder[eventDtl.eventDtlFrstRank + 1] = 'swiper';
                this.isShow.swiper = true;
              }
            // 02 = 개인정보동의
            } else if (eventDtl.eventDtlTypeCd == '02') {
              if (eventDtl.eventDtlFrstRank != 0) {
                this.contentOrder[eventDtl.eventDtlFrstRank + 1] = 'privacy';
                // set 개인정보동의 info
                this.privacyInfo = eventDtl.eventDtlZoneList;
                this.isShow.privacy = true;
              }
            // 03 = 안내/공지사항
            } else if (eventDtl.eventDtlTypeCd == '03') {
              if (eventDtl.eventDtlFrstRank != 0) {
                this.contentOrder[eventDtl.eventDtlFrstRank + 1] = 'notice';
                this.isShow.notice = true;
              }
            // 04 = 이벤트 혜택
            } else if (eventDtl.eventDtlTypeCd == '04') {
              if (eventDtl.eventDtlFrstRank != 0) {
                this.contentOrder[eventDtl.eventDtlFrstRank + 1] = 'bene';
                this.isShow.bene = true;
              }
            // 05 = 일반배너
            } else if (eventDtl.eventDtlTypeCd == '05') {
              if (eventDtl.eventDtlFrstRank != 0) {
                this.contentOrder[eventDtl.eventDtlFrstRank + 1] = 'banner';
                this.isShow.banner = true;
              }
            }
          }
          // 이벤트 댓글 활성화
          if (eventDtl.eventDtlTypeCd == '0801') {
            if (eventDtl.eventDtlApplVal == 'N') {
              // 댓글 없는 게시판
              this.isShow.reply = true;
            } else if (eventDtl.eventDtlApplVal == 'Y') {
              // 댓글 목록 게시판
              this.isShow.appPush = true;
            }
          } else if (eventDtl.eventDtlTypeCd == '0802') {
            this.isShow.replyPhoto = true;
            this.imgDiv = eventDtl.eventDtlApplVal;
          } else if (eventDtl.eventDtlTypeCd == '0812') {
            // [25] 앱리뷰   DEPBOSFR-7343
            this.isShow.replyPhotoAppReview = true;
            this.imgDiv = eventDtl.eventDtlApplVal;
            this.eventDtlTypeCd = eventDtl.eventDtlTypeCd;
          }
        }
      }
      this.eventInfo['themeInfo'] = themeInfo;
      // 연관상품
      this.contentOrder[8] = 'item';

      const container = document.getElementById('mainBody');
      const order = [];
      for (let i = 0; i < this.contentOrder.length; i++) {
        if (this.contentOrder[i]) {
          if (document.getElementById('event-' + this.contentOrder[i])) {
            order.push(
              document.getElementById('event-' + this.contentOrder[i])
            );
          }
        }
      }
      order.forEach(e => {
        container.appendChild(e);
      });
      // END : 레이아웃 순서
      // START : 버튼 타입
      this.eventInfo['btnRound'] =
        this.eventInfo.eventTplTypeCd == '02' ? 'round ' : '';
      if ('1' == 1) {
        this.eventInfo['btnType'] = 'type1 '; // GS Fresh
      } else if ('' == 2) {
        this.eventInfo['btnType'] = 'type2 '; // 달리살다
      } else if ('' == 3) {
        this.eventInfo['btnType'] = 'type3 '; // 마켓포
      } else if ('' == 4) {
        this.eventInfo['btnType'] = 'type4 '; // 심플리쿡
      } else {
        this.eventInfo['btnType'] = '';
      }
      // END : 버튼 타입
    },
    async fnEventShare(type) {
      let evImg='';
      if (this.shareImg != null) {
        evImg = this.shareImg.ctnsPathNm;
      }
      this.shareInfo = {
        url: null,
        text1: this.eventInfo.eventNm,
        text2: null,
        title: this.eventInfo.eventNm,
        img: evImg,
        isShow: null,
      };
      if (type == 'friend') {
        if (this.isLogin()) {
          await ApiUtils.get('/fo/ev/eventmgnt/recommend-friend-url/' + this.$route.params.eventId)
          .then(res => {
            if (res.data && res.data.success && res.data.data) {
              this.shareInfo.url = this.getDomain('cm') + '/cu/join_rcmd/' + res.data.data.url;
              this.shareInfo.isShow = {
                twitter: false,
                facebook: false,
                kakao: true,
                kakaoStory: false,
              };
              this.popupAction('popupShareEvent');
            } else {
              this.$gsdialog.alert('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
            }
          })
          .catch(e => {
            // this.$gsdialog.alert(e.response.data.statusMessage);
          });
        } else {
          this.$gsdialog.alert('로그인이 필요합니다.')
          .then(e => {
            this.fnRedirect('login');
          });
        }
      } else {
        this.shareInfo.url = this.getDomain() + '/ev/event/' + this.$route.params.eventId;
        this.shareInfo.isShow = {
          twitter: false,
          facebook: true,
          kakao: true,
          kakaoStory: false,
        };
        this.popupAction('popupShareEvent');
      }
    },
    // START : 단순응모
    async onEntry(e) {
      if (this.isLogin()) {
        this.fnEntry();
      } else {
        this.$gsdialog.alert('로그인이 필요합니다.')
        .then(e => {
          this.fnRedirect("login");
        });
      }
    },
    // START : 응모 성공 (필수)
    async fnEntrySuccess(res) {
      if (res.data && res.data.success && res.data.data && res.data.data.length > 0 && !res.data.data[0].errorCode) {
        if (this.eventInfo.eventWinModeCd == "01" && this.winGvwyCnt > 0) {
          this.fnWinPopOpen();
        } else {
          this.$gsdialog.alert("응모되셨습니다.");
        }
      }
    },
    setDesabledEntry(desabledEntry) {
      this.desabledEntry = desabledEntry;
    },
    async fnEntry(params) {
      if (this.$route.query.mode == 'BOS') {
        this.$gsdialog.alert('미리보기 모드입니다.');
        return;
      } else {
        if (!this.desabledEntry) {
          if (!this.eventInfo.entryPeriod) {
            this.$gsdialog.alert('응모기간이 아닙니다.');
            return;
          }
          if (!this.$refs.Privacy.fnValidPrivacy()) {
            this.$gsdialog.alert('개인정보에 동의하지 않았습니다.');
            return;
          }

          let activeEvent = null;
          if (this.eventInfo.eventTypeCd == '04') {
            activeEvent = this.$refs.Attendance;
          } else if (this.eventInfo.eventTypeCd == '01') {
            activeEvent = this.$refs.Roulette;
          } else if (this.eventInfo.eventTypeCd == '05') {
            activeEvent = this.$refs.EventComnAd;
          } else if (this.isShow.reply) {
            activeEvent = this.$refs.Reply;
          } else if (this.isShow.appPush) {
            activeEvent = this.$refs.AppPush;
          } else if (this.isShow.replyPhotoAppReview) {
            activeEvent = this.$refs.ReplyPhotoAppReview;
          } else if (this.isShow.replyPhoto) {
            activeEvent = this.$refs.ReplyPhoto;
          } else if (this.eventInfo.eventTypeCd == '11') {
            activeEvent = this.$refs.Quiz;
          } else if (this.eventInfo.eventTypeCd == '12') {
            activeEvent = this.$refs.Vote;
          }

          // 룰렛 이벤트 - 룰렛 시작
          this.desabledEntry = true;
          if (this.eventInfo.eventTypeCd == '01') {
            activeEvent.rouletteStart();
          }
          this.winGvwyCnt = 0;
          await ApiUtils.post('/fo/ev/eventmgnt/event-entry/' + this.$route.params.eventId, Object.assign({}, this.privacyParams, params, {cmmSteId: CookieUtils.getCmmSteId()}))// [202017P] 2020.11.30 Market For 커머스사이트ID 추가
          .then(res => {
            // 당첨내역 및 배송지 입력 당첨번호 목록 셋팅
            if (res.data && res.data.success && res.data.data && res.data.data.length > 0) {
              if (this.eventInfo.eventWinModeCd == "01") { // 즉시당첨
                if (!res.data.data[0].errorMsg) {
                  if (res.data.data[0].entryWinList.length == 1
                    && res.data.data[0].entryWinList[0].gvwyTypeCd == "1"
                    && res.data.data[0].entryWinList[0].errorMsg
                    && res.data.data[0].entryWinList[0].errorCode == "USED_COUPON") {
                    this.winGvwyCnt++;
                    this.eventWinGvwyList.eventWinGvwyErrMsg = res.data.data[0].entryWinList[0].errorMsg;
                  } else {
                    this.title = "축 당첨!";
                    this.msg = null;
                    this.winAdrsYn = null;
                    this.eventWinGvwyList.eventWinGvwyList1 = [];
                    this.eventWinGvwyList.eventWinGvwyList2 = [];
                    this.eventWinGvwyList.eventWinGvwyList3 = [];
                    this.eventWinGvwyList.eventWinGvwyList4 = [];
                    this.eventWinGvwyList.eventWinGvwyList5 = [];
                    for (let i=0; i<res.data.data[0].entryWinList.length; i++) {
                      const eventWin = res.data.data[0].entryWinList[i];
                      if (eventWin.eventWinStatCd == '01') {
                        this.winGvwyCnt++;
                        if (eventWin.gvwyTypeCd == "1") {
                          this.eventWinGvwyList.eventWinGvwyList1.push(eventWin);
                        } else if (eventWin.gvwyTypeCd == "2") {
                          this.eventWinGvwyList.eventWinGvwyList2.push(eventWin);
                        } else if (eventWin.gvwyTypeCd == "3") {
                          this.eventWinGvwyList.eventWinGvwyList3.push(eventWin);
                        } else if (eventWin.gvwyTypeCd == "4") {
                          this.eventWinGvwyList.eventWinGvwyList4.push(eventWin);
                          this.winGvwyAdrsSeqnoList.push(eventWin.eventWinSeqno);
                        } else if (eventWin.gvwyTypeCd == "5") {
                          this.eventWinGvwyList.eventWinGvwyList5.push(eventWin);
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.eventInfo.eventTypeCd == '01') { // 룰렛
              activeEvent.fnEntrySuccess(res);
            } else {
              if (res.data && res.data.success) {
                if (res.data.data.length == 0) {
                  this.$gsdialog.alert('이벤트 응모에 실패했습니다.');
                } else {
                  if (res.data.data[0].errorMsg) {
                    this.$gsdialog.alert(res.data.data[0].errorMsg);
                  }
                  if (this.eventInfo.eventTypeCd == '06') {
                    this.fnEntrySuccess(res);
                  } else {
                    activeEvent.fnEntrySuccess(res);
                  }
                }
              } else {
                this.$gsdialog.alert(res.data.data.errorMsg);
              }
            }
            this.setDesabledEntry(false);
          })
          .catch(e => {
            if (this.eventInfo.eventTypeCd == '01') {
              activeEvent.rouletteError(e.response.data.statusMessage);
            } else {
              // this.$gsdialog.alert(e.response.data.statusMessage);
            }
            this.setDesabledEntry(false);
          });
        }
      }
    },
    fnWinPopOpen() {
      if (this.winGvwyCnt == 0) {
        this.$gsdialog.alert("당첨된 경품이 없습니다.");
      } else {
        this.popupCongInfo = {
          title: "축 당첨!",
          msg: null,
          winAdrsYn: "N",
          eventWinGvwyList1: this.eventWinGvwyList.eventWinGvwyList1,
          eventWinGvwyList2: this.eventWinGvwyList.eventWinGvwyList2,
          eventWinGvwyList3: this.eventWinGvwyList.eventWinGvwyList3,
          eventWinGvwyList4: this.eventWinGvwyList.eventWinGvwyList4,
          eventWinGvwyList5: this.eventWinGvwyList.eventWinGvwyList5,
          eventWinGvwyErrMsg: this.eventWinGvwyList.eventWinGvwyErrMsg,
        };
        this.popupAction('popupCongratulation');
      }
    },
    getAdobTagName() {
      let metaTagName = '';
      try {
        switch (this.eventInfo.eventTypeCd) {
          case "01":
            metaTagName = '이벤트^룰렛 이벤트';
            break;
          case "02":
            metaTagName = '이벤트^스탬프 이벤트';
            break;
          case "03":
            metaTagName = '이벤트^스탬프 이벤트';
            break;
          case "04":
            metaTagName = '이벤트^출석체크';
            break;
          case "05":
            metaTagName = '개인정보제공동의';
            break;
          case "06":
            metaTagName = '이벤트^단순응모형 이벤트';
            break;
          case "07":
            metaTagName = '이벤트^고지형 이벤트';
            break;
          case "08":
            metaTagName = '이벤트^댓글이벤트';
            break;
          case "09":
            metaTagName = '이벤트^상품평이벤트';
            break;
          case "10":
            metaTagName = '이벤트^친구추천이벤트';
            break;
          case "11":
            metaTagName = '이벤트^퀴즈이벤트';
            break;
          case "12":
            metaTagName = '이벤트^실시간 투표 이벤트';
            break;
          case "13":
            metaTagName = '이벤트^구매왕';
          default:
            break;
        }
        if (this.isShow.appPush) {
          metaTagName = '이벤트^앱푸시 이벤트';
        }
        if (this.isShow.reply) {
          metaTagName = '이벤트^댓글이벤트';
        }
        const page = {
          pageName: metaTagName
        };
        Tracker.pageView(page);
      } catch (e) {
        console.log("Tracker.callADLog error", e);
      }
      return metaTagName;
    },
    initStickyTop() { // sticky navigation 초기 위치값 저장
      const $this = this;
      const stickyNav = document.getElementById('evtStickyNav');
      if (stickyNav) {
        setTimeout(function() {
          $this.stickyNavOffsetTop = stickyNav.offsetTop + stickyNav.offsetHeight + 29;
        }, 500);
      }
    },
    stickyNavScrollAction(currentScroll) { // sticky 내비게이션 스크롤 액션
      const $this = this;
      const stickyNav = document.getElementById('evtStickyNav');
      const content01 = document.getElementById('link01');
      const content02 = document.getElementById('link02');
      const content03 = document.getElementById('link03');
      if (stickyNav) {
        if (currentScroll >= $this.stickyNavOffsetTop) {
          stickyNav.classList.add('fixed');
        } else {
          stickyNav.classList.remove('fixed');
        }
      }
      if (stickyNav && content01 && content02 && content03) {
        const stickyBtn = stickyNav.getElementsByTagName('li');
        const link01Top = content01.offsetTop + 29;
        const link02Top = content02.offsetTop + 29;
        const link03Top = content03.offsetTop + 29;
        if (currentScroll < link01Top) { // 콘텐츠 진입 전
          stickyBtn[0].classList.remove('active');
          stickyBtn[1].classList.remove('active');
          stickyBtn[2].classList.remove('active');
        } else if (link01Top <= currentScroll && link02Top > currentScroll) { // 콘텐츠 1 진입
          stickyBtn[0].classList.add('active');
          stickyBtn[1].classList.remove('active');
          stickyBtn[2].classList.remove('active');
        } else if (link02Top <= currentScroll && link03Top > currentScroll) { // 콘텐츠 2 진입
          stickyBtn[0].classList.remove('active');
          stickyBtn[1].classList.add('active');
          stickyBtn[2].classList.remove('active');
        } else if (link03Top <= currentScroll) { // 콘텐츠 3 진입
          stickyBtn[0].classList.remove('active');
          stickyBtn[1].classList.remove('active');
          stickyBtn[2].classList.add('active');
        } else {

        }
      }
    },
    initStickyBtn() { // 기획전 하단 플로팅 버튼 초기화
      const isLogin = LoginUtils.isLogin();
      const stickyBtn = document.getElementById('firstBuyStickyBtn');
      if (stickyBtn) {
        stickyBtn.classList.remove('hide');
        if ( isLogin ) {
          document.querySelector('#firstBuyStickyBtn .btn-customer').classList.add('hide');
        } else {
          document.querySelector('#firstBuyStickyBtn .btn-user').classList.add('hide');
        }
      }
    },
    stickyBtnAction() { // 기획전 하단 플로팅 버튼 인터렉션
      const stickyBtn = document.getElementById('firstBuyStickyBtn');
      const direction = document.querySelector('html').getAttribute('data-scrolldir');
      if (stickyBtn) {
        if (direction === 'up') stickyBtn.classList.add('up');
        else if (direction === 'down') {
          if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight + 68) stickyBtn.classList.add('up');
          else stickyBtn.classList.remove('up');
        }
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) stickyBtn.classList.add('up');
      }
    },
    chkAppGoAppStore2() {
      console.log("goApp start");
      if (ContextUtils.isNative) {
        if (ContextUtils.getAgent() == "ios") {
          const url = 'gssmapp://default?';
          setTimeout( function() {
            location.href='https://itunes.apple.com/kr/app/id813494275';
          }, 1500);
        } else if (ContextUtils.getAgent() == "android") {
            location.href='market://details?id=com.gsretail.android.smapp&url=gssmapp://default';
        }
    }
      // 앱설치등으로 이동한다면 아래부분 제거
      // this.$emit('popupEvent', 'popupAlertInstall');
      // this.$emit('chkDayBreakPopup');
  },
    chkAppGoAppStore() { // 앱 설치 확인 앱스토어 이동
      const userAgent = navigator.userAgent.toLocaleLowerCase();
      const isChrome = (userAgent.search("crios/") > -1);
      const isApp = (userAgent.search("gssmapp") > -1 || userAgent.search("dalisalda") > -1);
      const isAndroid = (userAgent.search("android") > -1);
      const isiOS = (userAgent.search("iphone") > -1 || userAgent.search("ipod") > -1 || userAgent.search("ipad") > -1);
      if (isApp) {
        // 앱 접속 유저, webview controller의 override로 재정의된 window.open 함수 이용
        if (isiOS) {
          window.open("https://itunes.apple.com/kr/app/gs-fresh-%EC%8B%AC%ED%94%8C%EB%A6%AC%EC%BF%A1/id813494275", "appStore", "");
        } else if (isAndroid) {
          // window.open("https://market.android.com/details?id=com.gsretail.android.smapp", "googleStore", "");
          window.open("https://play.google.com/store/apps/details?id=com.gsretail.android.smapp", "googleStore", "");
        } else {
          this.$gsdialog.alert("해당 기기는 지원하지 않습니다.");
        }
      } else {
        // 브라우저 접속 유저
        console.log("chkAppGoAppStore start");
        if (ContextUtils.isNative) {
          // console.log("chkAppGoAppStore isNative");
          if (ContextUtils.getAgent() == "ios") {
            // console.log("chkAppGoAppStore ios");
            const url = 'gssmapp://default?';
            setTimeout( function() {
              location.href='https://itunes.apple.com/kr/app/id813494275';
            }, 1500);
          } else if (ContextUtils.getAgent() == "android") {
              // console.log("chkAppGoAppStore android");
              window.open("https://play.google.com/store/apps/details?id=com.gsretail.android.smapp", "googleStore", "");
          }
        }
        console.log("chkAppGoAppStore end");
        // 앱설치등으로 이동한다면 아래부분 제거
        // this.$emit('popupEvent', 'popupAlertInstall');
        // this.$emit('chkDayBreakPopup');
      }
    },
    chkAppGoAppStore3() { // 앱 설치 확인 앱스토어 이동
      const userAgent = navigator.userAgent.toLocaleLowerCase();
      const isChrome = (userAgent.search("crios/") > -1);
      const isApp = (userAgent.search("gssmapp") > -1 || userAgent.search("dalisalda") > -1);
      const isAndroid = (userAgent.search("android") > -1);
      const isiOS = (userAgent.search("iphone") > -1 || userAgent.search("ipod") > -1 || userAgent.search("ipad") > -1);
      if (isApp) {
        // 앱 접속 유저, webview controller의 override로 재정의된 window.open 함수 이용
        if (isiOS) {
          window.open("https://itunes.apple.com/kr/app/gs-fresh-%EC%8B%AC%ED%94%8C%EB%A6%AC%EC%BF%A1/id813494275", "appStore", "");
        } else if (isAndroid) {
          window.open("https://market.android.com/details?id=com.gsretail.android.smapp", "googleStore", "");
        } else {
          this.$gsdialog.alert("해당 기기는 지원하지 않습니다.");
        }
      } else {
        // 브라우저 접속 유저
        if (isiOS) {
          if (chrome) {
            // iOS Chrome
            // window.open("https://itunes.apple.com/kr/app/gs-fresh-%EC%8B%AC%ED%94%8C%EB%A6%AC%EC%BF%A1/id813494275", "appStore", "");
            location.href='https://itunes.apple.com/kr/app/id813494275';
          } else {
            // iOS Safari
            // location.href = 'https://itunes.apple.com/kr/app/gs-fresh-%EC%8B%AC%ED%94%8C%EB%A6%AC%EC%BF%A1/id813494275';
            location.href='https://itunes.apple.com/kr/app/id813494275';
          }
        } else if (isAndroid) {
          window.open("https://market.android.com/details?id=com.gsretail.android.smapp", "googleStore", "");
        } else {
          this.$gsdialog.alert("해당 브라우저는 지원하지 않습니다.");
        }
      }
    },
  },
  computed: {},
  async mounted() {
    const vm = this;
    await LoginUtils.nonLoginPromise().then(function (response) {
      // 이벤트 조회
      const params = {
        mode: vm.$route.query.mode,
        cmmSteId: CookieUtils.getCmmSteId(), // [202017P] 2020.11.30 Market For 커머스사이트ID 추가
      };
      ApiUtils.get('/ev/eventmgnt/event-detail/' + vm.$route.params.eventId, params)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          vm.eventInfo = res.data.data;
          vm.isShow.main = true;
          if (vm.getDate(vm.eventInfo.entryBeginDttm, 'YYYYMMDDHHmmss') <= DateUtils.format(new Date(), 'YYYYMMDDHHmmss') &&
              vm.getDate(vm.eventInfo.entryEndDttm, 'YYYYMMDDHHmmss') > DateUtils.format(new Date(), 'YYYYMMDDHHmmss')) {
            vm.eventInfo.entryPeriod = true;
          } else {
            vm.eventInfo.entryPeriod = false;
          }
          vm.fnDisplay();
          if (vm.eventInfo.eventCtnsList) {
            vm.shareImg= vm.eventInfo.eventCtnsList.find(info => {
              return (info.eventCtnsDtlTypeCd == '0000' && (info.dspScrSpCd == '00' || info.dspScrSpCd == '02') && info.eventCtnsTypeCd == '01');
            });
          }
          vm.getAdobTagName();
          if (vm.eventInfo.errorCode) {
            if (vm.eventInfo.errorCode == "LOGIN_REQUIRED") {
              vm.isShow.dim = true;
              vm.$gsdialog.alert(vm.eventInfo.errorMsg)
              .then(e => {
                vm.fnRedirect("login");
              });
            } else if (vm.eventInfo.errorCode == "MEMBERSHIP_ONLY") {
              vm.isShow.dim = true;
              vm.popupAlertInfo.title = null;
              vm.popupAlertInfo.msg = "해당 이벤트는 달리드림 멤버십 회원만 참여 가능합니다.";
              vm.popupAlertInfo.linkNm = "통합회원 가입하러 가기";
              vm.popupAlertInfo.linkUrl = "/cu/join_member";
              vm.popupAlertInfo.cancelUrl = "/ev/event_list";
              vm.popupAction('popupAlert');
            } else if (vm.eventInfo.errorCode == "AFTER_EVENT_PERIOD" || vm.eventInfo.errorCode == "FINISH_EVENT") {
              // 구매왕, 투표는 종료후에도 내용을 봐야하므로 Dim 처리 하지 않는다.
              if (vm.eventInfo.eventTypeCd != '12' && vm.eventInfo.eventTypeCd != '13') {
                vm.isShow.dim = true;
              }
              vm.$gsdialog.alert(vm.eventInfo.errorMsg);
            } else {
              // 권한이 없는(?) 경우 이벤트 목록으로 돌아간다.
              vm.isShow.dim = true;
              vm.$gsdialog.alert(vm.eventInfo.errorMsg)
              .then(e => {
                // vm.fnRedirect("eventList");
                /* [202017P] 2021.02.15_Jira 수정 이벤트 참여현황에서 오류 -> 이벤트 참여현황 페이지로 , 이벤트 리스트에서 오류 -> 이벤트 리스트로  */
                history.back();
              });
            }
          }
          vm.eventInfo.eventCtnsList.forEach(e => {
            // 컨텐츠 스크립트 태그 적용
            const reg = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
            const match = reg.exec(e.ctnsDtlCnts);
            if (match) {
              const scriptBody = match[1];
              const scriptTag = document.createElement("script");
              scriptTag.innerHTML = scriptBody;
              document.getElementById('scriptArea').appendChild(scriptTag);
            }
          });
        }
      })
      .catch(e => {
        // vm.$gsdialog.alert(e.response.data.statusMessage).then(() => {
        //   if (e.response.data.statusCode == "404") {
        //     vm.fnRedirect("eventList");
        //   }
        // });
      });
    });
    window.couponFn = function(...a) {
      if (vm.isLogin()) {
        ApiUtils.post('/fo/ev/cpnprommgnt/coupon-download', a)
        .then(res => {
          if (res.data.success) {
            vm.$gsdialog.alert(res.data.statusMessage);
          } else {
            if (res.data.statusMessage) {
              vm.$gsdialog.alert(res.data.statusMessage);
            } else {
            vm.$gsdialog.alert("쿠폰발급에 실패했습니다.");
          }
          }
        })
        .catch(e => {
          // vm.$gsdialog.alert(e.response.data.statusMessage);
        });
      } else {
        vm.$gsdialog.alert('로그인이 필요합니다.')
        .then(e => {
          vm.fnRedirect('login');
        });
      }
    };
    window.toBrowser = function(url) {
      const isApp = (window.navigator.userAgent.search("gssmapp") > -1 || window.navigator.userAgent.search("dalisalda") > -1);
      if (isApp) {
        window.appCallOpenBrowser(url);
      } else {
        window.open(url);
      }
    };
  },
  updated() {
    const vmSec = this;
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
    window.slideToContent = function(targetId) { // 바로가기 앵커 이벤트 처 리
      let curTop = 0;
      let targetObj = document.getElementById(targetId);
      const stickyNav = document.getElementById('evtStickyNav');
      const stickyNavHeight = stickyNav ? stickyNav.offsetHeight : 0;
      if (targetObj.offsetParent) {
        do {
          curTop += targetObj.offsetTop;
        } while (targetObj = targetObj.offsetParent);
      }
      window.scrollTo({
        top: curTop - stickyNavHeight,
        behavior: 'smooth'
      });
    };
    /* 앱스토어 이동 */
    window.moveAppStoreReview001 = function() {
      if (confirm("앱스토어로 이동하시겠습니까")) {
        vmSec.chkAppGoAppStore();
      }
    };
    /* 사진등록 위치로 이동 */
    window.layerPopupAppReview001 = function() {
      // alert('사진등록레이어팝업');
      // $('html, body').animate({scrollTop: $("#appreviewEventCont").offset().top}, 400);
      slideToContent('event-body');
    };
    /* 엡리뷰 이벤트 [25] 앱리뷰   DEPBOSFR-7343 */
    /* 7658 [25] 앱리뷰 PR   DEPBOSFR-7658 변경 */

    this.$nextTick(() => {
      const $this = this;
      this.initStickyTop();
      setTimeout(function() {
          document.body.style.borderBottom = document.body.style.borderBottom === 'none' ? '1px solid white' : 'none';
      }, 0);
      this.initStickyBtn();
      window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        $this.stickyNavScrollAction(scrollPosition);
        $this.stickyBtnAction();
      });
    });
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
