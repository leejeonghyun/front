<!--
Design: views/ev/SC-FO-EV-GF-MS-034.vue
Pg id: PG-FO-EV-O004 (이벤트목록(/ev/event_list) 통해서 접근 가능, 이벤트ID 필수)
Uri: /ev/event/:eventId
-->
<template>
  <div>
    <section class="wrap-btn-type">
      <button type="button" class="btn type4" aria-haspopup="dialog" @click="onEntry()">응모하기</button>
    </section>
    <table class="evEntry">
      <thead>
      <tr>
        <td>응모번호</td>
        <td>등수</td>
        <td>경품명</td>
        <td>-</td>
        <td>-</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in testWinList" :key="`condPr`+item.eventEntrySeqno">
        <template v-if="item.entryWinList && item.entryWinList.length > 0">
          <td>{{item.eventEntrySeqno}}</td>
          <td>{{getGvwyInfo(item.entryWinList[0].gvwySeqno).eventGvwyRnk}} 등</td>
          <td>{{getGvwyInfo(item.entryWinList[0].gvwySeqno).commCdNm}}</td>
          <td>{{getGvwyInfo(item.entryWinList[0].gvwySeqno).gvwyApplVal}}</td>
        <td>-</td>
        </template>
        <template v-else>
          <td>{{item.eventEntrySeqno}}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </template>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
.evEntry table {
  width:100%;
  border: 1px solid #333333 !important;
}
.evEntry td {
  text-align: center;
  padding: 10px !important;
  border: 1px solid #333333 !important;
}
.evEntry th {
  text-align: center;
  padding: 10px !important;
  border: 1px solid #333333 !important;
}
</style>
<script>
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import DateUtils from '@/common/DateUtils';
import JwtUtils from '@/common/JwtUtils';
import LoginUtils from '@/common/LoginUtils';
import NumberUtils from '@/common/NumberUtils';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export default {
  name: 'EventTemplete',
  metaInfo() {
    return {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '통합 < 이벤트 < %s',
      meta: [
        { property: 'og:url', content: this.eventInfo.eventUrl },
        { property: 'og:title', content: '제목: ' + this.eventInfo.eventNm },
        { property: 'og:description', content: '설명: ' + this.eventInfo.eventNm },
        { property: 'og:image', content: !this.shareImg||this.shareImg.ctnsPathNm },
      ],
    };
  },
  components: {
  },
  mixins: [],
  data() {
    return {
      testWinList: [],
      eventInfo: {},
      isShow: {
        appPush: false,
        reply: false,
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
      userEntryList: [],
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
      eventWinSeqno: 0, // 당첨 번호
      eventWinGvwy: {}, // 당첨 경품
      entryCondSeqno: null, // 응모 기준
      shareInfo: {},
      alertInfo: {},
      popupCongInfo: {
        title: null,
        msg1: null,
        msg2: null,
        linkNm: null,
        linkUrl: null,
        linkFn: null
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
      shareImg: '',
      desabledEntry: false,
      imgDiv: '',
    };
  },
  methods: {
    fnGvwyTypeNm(gvwyTypeCd) {
      if (gvwyTypeCd == "1") {
        return "쿠폰";
      } else if (gvwyTypeCd == "2") {
        return "GS 포인트";
      } else if (gvwyTypeCd == "3") {
        return "리워즈";
      } else if (gvwyTypeCd == "4") {
        return "경품";
      } else if (gvwyTypeCd == "5") {
        return "기프티콘";
      }
      return "";
    },
    getGvwyInfo(gvwySeqno) {
      return this.eventInfo.eventGvwyList.find(info => {
        return info.gvwySeqno == gvwySeqno;
      });
    },
    fnRedirect(pageId) {
      if (pageId == "login") {
        const returnUrl = encodeURIComponent(location.href);
        this.$router.push({ path: '/cu/login?returnUrl='+returnUrl });
      } else if (pageId == "eventList") {
        this.$router.push({ path: '/ev/event_list' });
      }
    },
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    getDate(date, format) {
      return DateUtils.format(new Date(date), format);
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
      if (res.data.data && res.data.data.length > 0) {
        if (res.data.data[0].errorCode) { // 실패한 경우
          this.$gsdialog.alert(res.data.data[0].errorMsg);
          return;
        } else {
          if (this.eventInfo.eventWinModeCd == "01") { // 즉시당첨
            this.fnWinPopOpen();
          } else {
            this.$gsdialog.alert("응모되셨습니다.");
          }
        }
      }
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
          this.desabledEntry = true;
          this.eventWinGvwy = {};
          await ApiUtils.post('/fo/ev/eventmgnt/test/entry/' + this.$route.params.eventId, Object.assign({}, this.privacyParams, params, {cmmSteId: CookieUtils.getCmmSteId()}))
          .then(res => {
            if (res.data && res.data.success && res.data.data) {
              this.testWinList = res.data.data;
              // // 응모 완료 하면 자식 컴포넌트의 function 을 호출
              // if (this.eventInfo.eventTypeCd == '06' || activeEvent) {
              //   if (this.eventInfo.eventWinModeCd == '01') { // 즉시당첨
              //     if (res.data.data && res.data.data.length > 0) {
              //       if (res.data.data[0].entryWinList && res.data.data[0].entryWinList.length > 0) {
              //         this.eventWinSeqno = res.data.data[0].entryWinList[0].eventWinSeqno;
              //         this.fnEventWinGvwy(res.data.data[0].entryWinList[0].gvwySeqno);
              //       }
              //     }
              //   }
              //   if (this.eventInfo.eventTypeCd == '06') {
              //     this.fnEntrySuccess(res);
              //     this.desabledEntry = false;
              //   } else {
              //     activeEvent.fnEntrySuccess(res);
              //     this.desabledEntry = false;
              //   }
              // }
            } else {
              this.$gsdialog.alert(res.data.statusMessage);
              this.desabledEntry = false;
            }
          })
          .catch(e => {
            console.log(e);
            this.$gsdialog.alert(e.response.data.statusMessage);
            this.desabledEntry = false;
          });
        }
      }
    },
    fnEventWinGvwy(gvwySeqno) {
      this.eventWinGvwy = this.eventInfo.eventGvwyList.find(info => {
        return info.gvwySeqno == gvwySeqno;
      });
    },
    fnWinPopOpen() {
      let gvwyYn = "N";
      if (this.eventWinGvwy) {
        this.popupCongInfo.title = "축 당첨!";
        if (this.eventWinGvwy.gvwyTypeCd == '1') {
          gvwyYn = "Y";
          this.popupCongInfo.msg1 = "<span>" + this.eventWinGvwy.promNm + "</span>에 당첨되셨습니다.";
          this.popupCongInfo.msg2 = "쿠폰은 MY페이지> 내쿠폰함에서 확인 가능하십니다.";
          this.popupCongInfo.linkNm = "내 쿠폰 확인하러 가기 >";
          this.popupCongInfo.linkUrl = "/ev/couponList";
          this.popupCongInfo.linkFn = null;
        } else if (this.eventWinGvwy.gvwyTypeCd == '2') {
          gvwyYn = "Y";
          this.popupCongInfo.msg1 = this.eventWinGvwy.commCdNm + " <span>" + this.toComma(this.eventWinGvwy.gvwyApplVal) + "</span>P 가 적립되셨습니다.";
          this.popupCongInfo.msg2 = null;
          this.popupCongInfo.linkNm = null;
          this.popupCongInfo.linkUrl = null;
          this.popupCongInfo.linkFn = null;
        } else if (this.eventWinGvwy.gvwyTypeCd == '3') {
          gvwyYn = "Y";
          this.popupCongInfo.msg1 = this.eventWinGvwy.commCdNm + " <span>" + this.toComma(this.eventWinGvwy.gvwyApplVal) + "</span>원이 적립되셨습니다.";
          this.popupCongInfo.msg2 = null;
          this.popupCongInfo.linkNm = null;
          this.popupCongInfo.linkUrl = null;
          this.popupCongInfo.linkFn = null;
        } else if (this.eventWinGvwy.gvwyTypeCd == '4') { // 경품
          gvwyYn = "Y";
          this.popupCongInfo.msg1 = "<span>" + this.eventWinGvwy.gvwyApplVal + "</span> 에 당첨되셨습니다.";
          this.popupCongInfo.msg2 = "배송지를 입력해 주셔야 발송이 가능합니다.";
          this.popupCongInfo.linkNm = "배송지 입력하러 가기 >";
          this.popupCongInfo.linkUrl = null;
          this.popupCongInfo.linkFn = "gvwyAddr";
        } else if (this.eventWinGvwy.gvwyTypeCd == '5') { // 기프티콘
          gvwyYn = "Y";
          this.popupCongInfo.msg1 = "<span>" + this.eventWinGvwy.gvwyApplVal + "</span> 에 당첨되셨습니다.";
          this.popupCongInfo.msg2 = "해당 상품은 카카오 알림톡으로  교환권이 발송됩니다. 개인정보에 있는 연락처를 확인해주세요.";
          this.popupCongInfo.linkNm = "개인정보 확인하러 가기 >";
          this.popupCongInfo.linkUrl = "/cu/password_re_check";
          this.popupCongInfo.linkFn = null;
        }
      }

      if (gvwyYn == "Y") {
        this.popupAction('popupCongratulation');
      } else {
        this.$gsdialog.alert("당첨된 경품이 없습니다.");
      }
    },
  },
  computed: {},
  async mounted() {
    CookieUtils.addClassAppDiv();
    const vm = this;
    await LoginUtils.nonLoginPromise().then(function (response) {
      // 이벤트 조회
      const params = {
        mode: vm.$route.query.mode,
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
          vm.shareImg= vm.eventInfo.eventCtnsList.find(info => {
            return (info.eventCtnsDtlTypeCd == '0000' && (info.dspScrSpCd == '00' || info.dspScrSpCd == '02') && info.eventCtnsTypeCd == '01');
          });
          if (vm.eventInfo.errorCode) {
            if (vm.eventInfo.errorCode == "LOGIN_REQUIRED") {
              vm.fnDim("로그인이 필요합니다.", "login");
            } else if (vm.eventInfo.errorCode == "MEMBERSHIP_ONLY") {
              vm.isShow.dim = true;
              vm.popupAlertInfo.title = null;
              vm.popupAlertInfo.msg = "해당 이벤트는 달리드림패스 회원만 참여 가능합니다.";
              vm.popupAlertInfo.linkNm = "통합회원 가입하러 가기 >";
              vm.popupAlertInfo.linkUrl = "/cu/join_member";
              vm.popupAlertInfo.cancelUrl = "/ev/event_list";
              vm.popupAction('popupAlert');
            } else {
              vm.fnDim(vm.eventInfo.errorMsg, "eventList");
            }
          }
        }
      })
      .catch(e => {
        vm.$gsdialog.alert(e.response.data.statusMessage).then(() => {
          if (e.response.data.statusCode == "404") {
            vm.fnRedirect("eventList");
          }
        });
      });
    });
  },
  updated() {
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
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
