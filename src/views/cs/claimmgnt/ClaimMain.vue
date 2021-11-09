<template>
  <div class="wrap-customerservice type-new" v-bind:class="[siteClass]">
    <!-- START : Header -->
    <SubDefaultHeader headerText="고객센터" :chatbot="true" :flowroute="siteClass" />
    <!-- END : Header -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="customerservice-wrap">
        <!-- START : 상담톡 -->
        <section class="section-area">
          <button class="counselingtalk" @click="getZendeskUserInfo()">
            <strong>
              고객센터 연결하기
              <span>(상담시간 9시~18시)</span>
            </strong>
          </button>
        </section>
        <!-- END : 상담톡 -->
        <!-- START : 자주 묻는 질문 -->
        <section class="section-area">
          <h2>자주 묻는 질문</h2>
          <!-- START : search -->
          <div class="wrap-search">
            <label for="inpSearch" class="hidden">궁금한 사항을 물어보세요.</label>
            <input
              type="text"
              class="inp-search"
              placeholder="궁금한 사항을 물어보세요"
              v-model="searchCondition"
              value
              @keydown.enter="searchConditionFaq()"
            />
            <!-- 4월 수정 마침표 제거 -->
            <button
              class="btn-reset"
              aria-label="검색어 초기화"
              v-if="reset"
              @click="resetsearchCondition()"
            >
              <span class="hidden">검색어 초기화</span>
            </button>
            <button
              class="btn-searchbar-search"
              aria-label="검색"
              v-if="search"
              @click="searchConditionFaq()"
            >
              <span class="hidden">검색</span>
            </button>
          </div>
          <!-- END : search -->
          <ul class="list-link tab">
            <!-- SC-FO-CS-GF-MS-004 페이지와 형태는 동일 하나 해당 페이지는 링크 이동, SC-FO-CS-GF-MS-004 페이지는 탭 형태 이기에 마크업이 다릅니다. -->
            <!-- 수정 START : 2020.02.11 이미지 삭제 -->
            <li v-for="item in tabList" :key="item.commCd">
              <gs-link :to="activeTabInfo(item.commCd)" class="link-cs ico">{{ item.commCdNm }}</gs-link>
            </li>
            <!-- 수정 END : 2020.02.11 이미지 삭제 -->
          </ul>
        </section>
        <!-- END : 자주 묻는 질문 -->
        <!-- START : 1:1 문의하기 -->
        <section class="section-area question">
          <h2>1:1 문의하기</h2>
          <gs-link to="/cs/mbrinqr/mbr_inqr_list" class="link-more" title="나의 문의내역 보기 이동">나의 문의내역 보기</gs-link>
          <div class="wrap-btn">
            <button
              type="button"
              class="btn-lg btn-border lightgreen icon-write"
              @click="regInqr()"
            >
              <span>작성하기</span>
            </button>
          </div>
          <!-- 수정 START : 2020.02.25 서비스 바로가기 마크업 위치 변경 -->
          <ul class="list-link-service">
            <!-- 수정 : 2020.02.11 클래스 변경 list-link-service -->
            <li>
              <gs-link
                to="/cs/claimmgnt/claim_statement_list"
                class="link-cs"
                title="취소/교환/반품 바로가기"
              >취소/교환/반품</gs-link>
            </li>
            <li>
              <gs-link to="/cs/orddeliv/ord_deliv_list" class="link-cs" title="주문/배송조회 바로가기">주문/배송조회</gs-link>
            </li>
            <li>
              <gs-link to="/cs/mbrinqr/notice" class="link-cs" title="공지사항 바로가기">공지사항</gs-link>
            </li>
          </ul>
          <!-- 수정 END : 2020.02.25 서비스 바로가기 마크업 위치 변경 -->
        </section>
        <!-- END : 1:1 문의하기 -->
        <!-- START : 고객센터 안내 -->
        <section class="section-area service-v2">
          <!-- 수정 START : 2020.02.25 고객센터 안내 마크업 위치 변경 및 수정 -->
          <!-- START : 정보 추가 시 반복되는 영역 -->
          <div class="servicecenter">
            <p class="call">
              <a href="tel:16612562" class="link-tel" title="마켓포 고객센터 번호">
                <span>1661-2562</span>
              </a>
            </p>
            <p class="info">
              <strong>Market For 통합 고객센터</strong>
              <span>(평일, 주말 9:00~18:00 명절당일 휴무)</span>
            </p>
          </div>
          <!-- END : 정보 추가 시 반복되는 영역 -->
          <!-- START : 정보 추가 시 반복되는 영역 -->
          <!--
          <div class="servicecenter" v-if="helpCenter != null">
            <p class="call">
              <a :href="'tel:' + helpCenter.telNo" class="link-tel" title="점포배송 상품문의 지점 번호"><span>{{ helpCenter.telNo }}</span></a>
            </p>
            <p class="info">
              <strong>Market For 통합 고객센터</strong>
              <span>(평일, 주말 9:00~18:00 명절당일 휴무) </span>
            </p>
          </div>
          -->
          <!-- END : 정보 추가 시 반복되는 영역 -->
        </section>
        <!-- 수정 END : 2020.02.25 고객센터 안내 마크업 위치 변경 및 수정 -->
        <!-- END : 고객센터 안내 -->
      </div>
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <Loading v-if="loading" />
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import Config from '@/common/Config';
import postscribe from 'postscribe';
import axios from 'axios';
import JwtUtils from '@/common/JwtUtils';

export default {
  name: 'CustomerService',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '고객센터 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '고객센터',
      },
    ],
  },
  components: {
    SubDefaultHeader,
    Footer,
    Loading: () => import('@/components/common/Loading'),
  },
  data() {
    return {
      loading: false,
      search: true,
      reset: false,
      tabList: [],
      searchCondition: '',
      // helpCenter: [],
      siteClass: '',
      zCmmMbrNO: '',
      zPhone: '',
      zName: '',
      zEmail: '',
      zLocation: 'mo',
      zUser: false,
      mallName: CookieUtils.getMallId() == '11' ? '달리살다' : 'GS Fresh Mall',
    };
  },
  back: function() {
    history.back();
  },
  created: async function() {
    ApiUtils.get('/fo/cm/commcdmgnt/common-codes', {
      commGrpCd: 'SS0045',
    }).then(result => {
      this.tabList = result.data.data;
    });
    /*
    ApiUtils.get('/fo/cm/commonmgnt/help-center').then(result => {
      this.helpCenter = result.data.data;
    });
    */
    // 1:1 상담톡 연동을 위한 회원정보 호출.
    if (this.isLogin()) {
      this.getMbrInfo();
    }
  },
  methods: {
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    fnRedirect(pageId) {
      console.log('pageId,' + pageId);
      if (pageId == 'login') {
        const returnUrl = encodeURIComponent(location.href);
        console.log('returnUrl,' + returnUrl);
        this.$router.push({ path: '/cu/login?returnUrl=' + returnUrl });
      }
    },
    activeTabInfo(pTadId) {
      const tabId = pTadId;
      // this.$router.push('/cs/mbrinqr/faq/tabId/' + tabId);
      return '/cs/mbrinqr/faq/tabId/' + tabId;
    },
    resetsearchCondition() {
      this.searchCondition = null;
    },
    searchConditionFaq() {
      if (this.searchCondition === '') {
        this.$gsdialog.alert('검색어를 입력해 주세요.');
        return;
      }
      this.$router.push(
        '/cs/mbrinqr/faq/searchCondition/' + this.searchCondition
      );
    },
    // 회원정보 가져오기
    async getMbrInfo() {
      await ApiUtils.get('/fo/cu/mbrmgnt/member-information', null).then(
        res => {
          const userInfo = res.data.data;
          const moblTelNo1 = userInfo.moblTelNo1;
          const moblTelNo2 =
            userInfo.moblTelNo2.length > 7
              ? userInfo.moblTelNo2.substr(0, 4)
              : userInfo.moblTelNo2.substr(0, 3);
          const moblTelNo3 =
            userInfo.moblTelNo2.length > 7
              ? userInfo.moblTelNo2.substr(4, 4)
              : userInfo.moblTelNo2.substr(3, 4);
          const email = userInfo.emailAddr1;
          const emailSite = userInfo.emailAddr2;
          const custNm = userInfo.custNm;
          const cmmMbrNo = userInfo.cmmMbrNo;
          const phoneNumber = moblTelNo1 + moblTelNo2 + moblTelNo3;
          if (phoneNumber !== null) {
            this.zPhone = phoneNumber;
          } else {
            this.zPhone = '';
          }
          if (email !== null) {
            this.zEmail = email + '@' + emailSite;
          } else {
            this.zEmail = '';
          }
          if (custNm !== null) {
            this.zName = custNm;
          } else {
            this.zName = '';
          }
          if (cmmMbrNo != null) {
            this.zCmmMbrNO = cmmMbrNo;
          } else {
            this.zCmmMbrNO = '';
          }
        }
      );
    },
    regInqr() {
      this.$router.push('/cs/mbrinqr/mbr_inqr_reg');
    },
    startWebWidget() {
      window.zESettings = {
        webWidget: {
          launcher: {
            chatLabel: { '*': 'Chat now' },
            mobile: { labelVisible: true },
          },
          // 웹 위젯 헤더 부분 화살표 버튼의 비활성화 처리
          navigation: {
            popoutButton: { enabled: false },
          },
          chat: {
            suppress: false,
            notifications: {
              mobile: { disable: true },
            },
          },
        },
      };
      // Zendesk의 최종 사용자를 식별합니다.
      // zE('webWidget'
      //     , 'identify'
      //     , { name: this.zEmail ? this.zCmmMbrNO + ',' + this.zPhone + ',' + this.zName + ',' + this.zLocation + ',' + this.zEmail : this.zCmmMbrNO + ',' + this.zPhone + ',' + this.zName + ',' + this.zLocation,
      //         email: this.zEmail && this.zUser ? this.zEmail : ''
      // });
      // 젠데스크 웹위젯이 로드되자마자 페이지에서 숨깁니다.
      zE('webWidget', 'hide');
      zE('webWidget:on', 'open');

      // 위젯이 닫힐 때 콜백을 실행합니다.
      zE('webWidget:on', 'close', function() {
        // 최종 사용자의 세션을 지웁니다.
        zE('webWidget', 'logout');
        // 웹 위젯 버튼 숨기기
        zE('webWidget', 'hide');
      });
      // 위젯이 서버에 성공적으로 연결되면 시작될 콜백을 등록합니다.
      zE('webWidget:on', 'chat:connected', this.connectChat);
      // 채팅 종료 시 이벤트
      // 웹위젯을 숨기고, 웹위젯 세션을 끊어 화면을 클리어합니다.
      zE('webWidget:on', 'chat:end', function() {
        zE('webWidget', 'hide');
        zE('webWidget', 'logout');
      });
      this.showWebWidget();
    },
    connectChat() {
      this.loading = false;
      const zLoginName = this.zEmail
        ? this.zCmmMbrNO +
          ',' +
          this.zPhone +
          ',' +
          this.zName +
          ',' +
          this.zLocation +
          ',' +
          this.zEmail
        : this.zCmmMbrNO +
          ',' +
          this.zPhone +
          ',' +
          this.zName +
          ',' +
          this.zLocation;
      const zLoginMail = this.zEmail && this.zUser ? this.zEmail : '';
      const style = `/* hides header button, footer menu button */
                              div#Embed button[aria-label="Menu"], div#Embed footer button[aria-label="파일 첨부"] {
                                display: none;
                            }`;
      // appends the css in the web widget
      $('iframe#webWidget')
        .contents()
        .find('style:last')
        .append(style);
      // Zendesk의 최종 사용자를 식별합니다.
      zE(
        'webWidget',
        'identify',
        // zLocation
        { name: zLoginName, email: zLoginMail }
      );
      // 방문자가 메시지를 보내도록합니다. 채팅 진행 중이 아닌 경우 채팅 세션을 시작합니다.
      zE('webWidget', 'chat:send', '상담톡을 연결합니다.');
    },
    showWebWidget() {
      zE('webWidget', 'open');
      // 호스트 페이지에 위젯을 숨겨지기 전의 상태로 표시합니다.
      zE('webWidget', 'show');
    },
    async getZendeskUserInfo() {
      const vm = this;
      if (this.isLogin()) {
        if (
          typeof window.zESettings == 'undefined' ||
          window.zESettings == undefined ||
          window.zESettings == null
        ) {
          const params = {
            cmmMbrNo: this.zCmmMbrNO,
            emailAddr: this.zEmail,
          };
          const headers = {
            headers: {
              'Content-Type': 'application/json',
            },
          };

          try {
            vm.loading = true;
            const res = await axios.post(
              Config.server.ZENDESK_API + '/api/v1/users/search',
              params,
              headers
            );
            if (res.data.count > 0) {
              console.log('위챗 success');
              this.zUser = true;
              this.connectZendesk();
            } else {
              this.zUser = false;
              this.connectZendesk();
            }
          } catch {
            vm.loading = false;
          }
        } else {
          this.showWebWidget();
        }
      } else {
        this.$gsdialog.alert('로그인이 필요합니다.').then(e => {
          this.fnRedirect('login');
        });
      }
    },
    connectZendesk() {
      const head = document.getElementsByTagName('head')[0];
      // 외부 스크립트 로드
      postscribe(
        head,
        `<script type=text/javascript src=https://cdn.jsdelivr.net/jquery/latest/jquery.min.js><\/script>`
      );
      postscribe(
        head,
        `<script id=ze-snippet src=//static.zdassets.com/ekr/snippet.js?key=` +
          Config.server.ZENDESK_KEY +
          `><\/script>`,
        this.startWebWidget
      );
    },
  },
  updated() {},
  mounted() {
    // 색상분기 처리
    this.siteClass = CookieUtils.getSiteClass();
    if (this.$route.query.doZendesk == 'Y') {
      this.getZendeskUserInfo();
    }
  },
};
</script>

<style></style>
