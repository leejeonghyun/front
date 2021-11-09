<!--
Design: views/ss/SC-FO-SS-GF-MS-814
Pg id:
Uri: /cu/gift_bowing/
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]">
    <!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <!-- START : 헤더 -->
    <SubDefaultHeader
      headerText="선물하기"
    />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="gift-bowing-wrap">
        <div class="wrap-tab">
          <!-- START :  탭 영역 -->
          <ul ref="tabList" class="tablist type02">
            <li>
              <button
                type="button"
                id="tabGift01"
                aria-controls="tabGift01-contents"
                @click="tabAction('tabGift01','1')"
                :class="{active: this.tab.tabGift01}"
              >
                <span class="text">
                  받은 선물
                  <!-- 신규 선물 있는 경우 아래 태그 추가 -->
                  <span class="ic-new" aria-label="신규선물" v-if="ordGiftNewCnt.newRcptCnt > 0"></span>
                  <!-- 신규 선물 있는 경우 아래 태그 추가 -->
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                id="tabGift02"
                aria-controls="tabGift02-contents"
                @click="tabAction('tabGift02','2')"
                :class="{active: this.tab.tabGift02}"
              >
                <span class="text">보낸 선물</span>
              </button>
            </li>
            <!-- 4월수정 : 조르기 영역 삭제 -->
          </ul>
          <!-- END :  탭 영역 -->
          <!-- START : 탭 콘텐츠 영역 -->
          <div ref="tabContents" tabindex="0">
            <!-- START : 받은 선물 탭 -->
            <div
              id="tabGift01-contents"
              class="tabcontents"
              aria-labelledby="tabGift01-contents"
              v-if="this.tab.tabGift01"
            >
              <NoList
                :ListType="'giftnolist'"
                v-if="loadedCount == 0"
              >
                <p slot="txt-giftnolist">받은 선물 내역이 없습니다<br>친구의 연락처만 알아도 선물할 수 있어요<br>친구에게 먼저 선물해보세요</p>
                <button
                  slot="nolist-button"
                  aria-haspopup="dialog"
                  class="btn-gift-info"
                  @click="popupAction('popupGiftInfo')"
                >선물하기 이용안내</button>
              </NoList>
              <div class="received-gift-info" v-if="loadedCount > 0">
                <p>
                  <span>{{loadedCount}}</span>개의 받은 선물이 있습니다
                </p>
                <button class="btn-close" title="닫기 버튼">
                  <span class="hidden">닫기</span>
                </button>
              </div>
              <!-- START : 받은 선물 리스트 -->
              <div class="wrap-received-gift" v-if="loadedCount > 0">
                <ReceivedSentGift
                  :info="ordGift"
                  :mode="1"
                  v-for="ordGift in ordGiftList"
                  v-bind:key="ordGift.ordId + '_' + ordGift.seq"
                  v-bind:ordGift="ordGift"
                  v-on:search="catchEvent"
                />
              </div>
              <!-- END : 받은 선물 리스트 -->
            </div>
            <!-- END : 받은 선물 탭 -->
            <!-- START : 보낸 선물 탭 -->
            <div
              id="tabGift02-contents"
              class="tabcontents"
              aria-labelledby="tabGift02-contents"
              v-if="this.tab.tabGift02"
            >
              <NoList
                :ListType="'giftnolist'"
                v-if="loadedCount == 0"
              >
                <p slot="txt-giftnolist">보낸 선물 내역이 없습니다<br>친구의 연락처만 알아도 선물할 수 있어요<br>장바구니에서 선물하기를 이용해보세요</p>
                <button
                  slot="nolist-button"
                  aria-haspopup="dialog"
                  class="btn-gift-info"
                  @click="popupAction('popupGiftInfo')"
                >선물하기 이용안내</button>
              </NoList>
              <!-- START : 보낸 선물 리스트 -->
              <div class="wrap-received-gift" v-if="loadedCount > 0">
                <ReceivedSentGift
                  :info="ordGift"
                  :mode="2"
                  v-for="ordGift in ordGiftList"
                  v-bind:key="ordGift.ordId + '_' + ordGift.seq"
                  v-bind:ordGift="ordGift"
                  v-on:search="catchEvent"
                  v-on:sendMessage="sendMessage"
                />
              </div>
              <!-- END : 보낸 선물 리스트 -->
            </div>
            <!-- END : 보낸 선물 탭 -->
          </div>
        </div>
        <!-- START : 탭 콘텐츠 영역 -->
      </div>
      <Loading v-show="loading" />
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->

    <!-- 팝업 - 선물하기 이용안내 -->
    <PopupGiftInfo @popupEvent="popupAction" v-if="this.popup.popupGiftInfo" />

    <!-- 팝업 - 배송조회 -->
    <PopupTrackingShipping
      @popupEvent="popupAction"
      :mbrDelivParamInfo="mbrDelivParamInfo"
      v-if="this.popup.popupTrackingShipping"
    />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import ReceivedSentGift from '@/components/mypage/ReceivedSentGift'; // 받은 선물 리스트
// import PopupGiftInfo from '@/views/ss/SC-FO-SS-GF-MP-873'; 선물하기 이용안내 팝업
import PopupGiftInfo from '@/views/cu/mypgmgnt/PopupGiftInfo'; // 선물하기 이용안내 팝업
// 4월수정 : 받은 선물 & 보낸 선물 없음 영역 추가 / 조르기 영역 삭제
import NoList from '@/components/common/NoList'; // 선물없음
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import Loading from '@/components/common/Loading';
import CookieUtils from '@/common/CookieUtils';
import PopupTrackingShipping from '@/views/cs/orddeliv/DelivDlvInq'; // 팝업 - 배송조회 @/views/ss/SC-FO-SS-GF-MP-855
import ShareUtils from '@/common/ShareUtils';

export default {
  name: 'GiftBowing',
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    ReceivedSentGift, // 받은 선물, 보낸 선물 리스트
    NoList,
    PopupGiftInfo,
    Loading,
    PopupTrackingShipping,
  },
  data() {
    return {
      tab: {
        tabGift01: true, // 받은 선물
        tabGift02: false, // 보낸 선물
      },
      popup: {
        // 팝업
        open: false,
        popupGiftInfo: false,
        popupTrackingShipping: false, // 팝업 - 배송조회
      },
      ordGiftInqType: '1',
      ordGiftNewCnt: {
        newRcptCnt: 0,
        newTdrCnt: 0,
      },
      ordGiftList: [],
      loading: false,
      loadedCount: 0, // 조회된 총 개수
      pageNo: 1, // 현재 페이지 번호
      totalCount: 0, // 게시물 총 개수
      PAGE_SIZE: 10, // 페이지당 게시물 개수
      mbrDelivParamInfo: {},
      siteClass: '',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물하기 < 마이페이지 <%s',
    meta: [
      {
        property: 'aa:page',
        content: '선물하기',
      },
    ],
  },
  mixins: [],
  methods: {
    popupAction(type, paramDelivRow) {
      this.mbrDelivParamInfo = paramDelivRow;
      // 팝업 활성/비활성
      this.popup.open = !this.popup.open;
      this.popup[`${type}`] = !this.popup[`${type}`]; // popup
    },
    tabAction(type, ordGiftInqType) {
      // tab
      this.ordGiftInqType = ordGiftInqType;
      this.ordGiftNewCnt.newRcptCnt = 0;
      this.ordGiftNewCnt.newTdrCnt = 0;
      this.ordGiftList = [];
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.$refs.tabContents.focus();
      this.giftBowing(1);
    },
    giftBowing: async function(pageNo) {
      this.loading = true;
      this.pageNo = pageNo;

      if (pageNo == 1) {
        this.ordGiftList = [];
        this.ordGiftNewCnt = 0;
        this.loadedCount = 0;
        this.totalCount = 0;
      }
      const OrdGiftInqInputDto = {
        ordGiftInqType: this.ordGiftInqType /* 1 : 받은선물 , 2: 보낸선물 */,
        limit: this.PAGE_SIZE,
        offset: (pageNo - 1) * this.PAGE_SIZE,
      };
      const resultDetail = await ApiUtils.get(
        '/fo/cu/mypgmgnt/order-gift',
        OrdGiftInqInputDto
      );
      const d = resultDetail.data;
      if (d.success) {
        this.ordGiftNewCnt = d.data.ordGiftNewCntInqRsltDto;

        d.data.ordGiftListInqRsltDto.forEach(e => {
          this.totalCount = e.totalCount;

          /* DELIV_STAT_CD , -- 01 : 주문중, 02 : 주문완료, 03 : 상품준비중,
              04 : 배송중, 05:배송완료, 06: 배송미완료, 07: 배송취소,
              08: 클레임 접수, 09: 회수중, 10: 회수완료, 11: 외수미완료, 12 : 회수취소 */
          if (this.ordGiftInqType == '1') {
            // 받은 선물
            if (e.allCancelYn == 'Y') {
              e.stat_process = 6; // 전체취소
            } else if (
              e.giftAcptYn == 'Y' &&
              (e.delivStatCd == '04' || e.delivStatCd == '06')
            ) {
              e.stat_process = 4; // 배송중
            } else if (e.giftAcptYn == 'Y' && e.delivStatCd == '05') {
              e.stat_process = 5; // 배송완료
            }
          }

          if (this.ordGiftInqType == '2') {
            // 보낸 선물
            if (e.allCancelYn == 'Y') {
              e.stat_process = 6; // 전체취소
            } else if (e.giftAcptYn != 'Y') {
              e.stat_process = 1; // 배송정보미입력
            } else if (
              e.giftAcptYn == 'Y' &&
              (e.delivStatCd == '01' ||
                e.delivStatCd == '02' ||
                e.delivStatCd == '03')
            ) {
              e.stat_process = 2; // 선물수락
            } else if (e.giftAcptYn != 'Y' && e.giftValid == 'N') {
              e.stat_process = 7; // 자동취소
            } else if (
              e.giftAcptYn == 'Y' &&
              (e.delivStatCd == '04' || e.delivStatCd == '06')
            ) {
              e.stat_process = 4; // 배송중
            } else if (e.giftAcptYn == 'Y' && e.delivStatCd == '05') {
              e.stat_process = 5; // 배송완료
            }
          }
          this.ordGiftList.push(e);
          this.loadedCount = this.ordGiftList.length;
        });
      } else {
        console.log('오류' + resultDetail.data.statusMessage);
      }

      this.loading = false;
    },
    catchEvent(pageNo) {
      this.pageNo = '1';
      this.giftBowing(this.pageNo);
    },
    handleScroll: function() {
      const el = document.querySelector('body');
      const y = window.scrollY + window.innerHeight;
      const height = el.offsetHeight;
      const ratio = Math.floor((y / height) * 100);
      if (ratio > 60 && !this.loading) {
        this.loadMore();
      }
    },
    loadMore: async function() {
      if (this.loadedCount < this.totalCount) {
        this.giftBowing(++this.pageNo);
      }
    },
    sendMessage(ord) {
      if (ord.giftTrpsTelNo && ord.giftTrpsTelNo.length > 0) {
        this.sendSMS(ord);
      } else {
        this.sendKakao(ord);
      }
    },
    async sendSMS(ord) {
      if (ord.smsDsptNum >= ord.smsDsptPosbNum) {
        this.$gsdialog
          .alert(
            `선물 메시지는 ${ord.smsDsptPosbNum}회까지<br/>재전송 가능합니다.`,
            { html: true }
          )
          .then(dialog => {});

        return;
      }
      const OrdGiftInqInputDto = {
        ordGiftInqType: 2 /* 1 : 받은선물 , 2: 보낸선물 */,
        limit: 1,
        offset: 0,
        ordId: ord.ordId,
        mallId: CookieUtils.getMallId(),
      };
      const result = await ApiUtils.get(
        '/fo/cu/mypgmgnt/order-gift-resend-sms',
        OrdGiftInqInputDto
      );
      if (result.data.success) {
        ord.smsDsptNum++;
        this.$gsdialog
          .alert(
            `선물메시지를 재전송하였습니다<br/>남은 횟수: ${ord.smsDsptPosbNum -
              ord.smsDsptNum}회`,
            { html: true }
          )
          .then(dialog => {});
      } else {
        this.$gsdialog
          .alert(
            '메시지를 전송중 오류가 발생했습니다.<br/>잠시후에 다시 시도하여 주십시오.',
            { html: true }
          )
          .then(dialog => {});
      }
    },
    sendKakao(ord) {
      const snsUrl = process.env.VUE_APP_COMMON_FR_MO + '/od/gift_rcv_dlv/' + ord.ordId;
      const shareText = ord.giftTdrCmmMbrNm + '님이 보내신 선물이 도착했어요';
      const prodImg = '';
      const title = 'GSFresh';
      const text2 = '';
      ShareUtils.shareKakaoTalk(snsUrl, shareText, prodImg, title, text2);
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  updated() {},
  mounted: function() {
    this.siteClass = CookieUtils.getSiteClass();
    window.addEventListener('scroll', this.handleScroll);

    ShareUtils.init();

    this.ordGiftInqType = '1';
    this.giftBowing(1); // 화면면로딩시
  },
};
</script>
<style lang="scss">
</style>
