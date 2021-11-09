<!--
Design: views/cs/SC-FO-CS-GF-MS-004
Pg id: PG-FO-SS-I005
Uri: /cs/mbrinqr/faq
-->
<template>
  <div class="wrap-customerservice type-new" v-bind:class="[siteClass]">
    <!-- START : Header -->
    <SubDefaultHeader headerText="고객센터" :chatbot="true" :flowroute="siteClass" :headertype="3" />
    <!-- END : Header -->
    <main id="main" tabindex="0">
      <div class="faq-wrap">
        <!-- START : 자주 묻는 질문(검색 영역) -->
        <section class="section-area">
          <h2>자주 묻는 질문</h2>
          <!-- START : search -->
          <div class="wrap-search">
            <label for="inp-search" class="hidden">궁금한 사항을 물어보세요.</label>
            <input type="text" class="inp-search" placeholder="궁금한 사항을 물어보세요." v-model="searchCondition" value="" @keydown.enter="searchConditionFaq()"/>
            <button class="btn-reset" aria-label="검색어 초기화" v-show="searchCondition" @click="resetsearchCondition()">
              <span class="hidden">검색어 초기화</span>
            </button>
            <button class="btn-searchbar-search" aria-label="검색" @click="searchConditionFaq()">
              <span class="hidden">검색</span>
            </button>
          </div>
          <!-- END : search -->
          <!-- START : 공지유형코드[ANNCE_TYPE_CD][SS0045]tab -->
          <ul class="list-link tab">
            <li v-for="item in tabList" v-bind:key="item.commCd">
              <button type="button" :id="'tab' + item.commCd" :aria-controls="'tab' + item.commCd + '-contents'" @click="tabAction('tab' + item.commCd)" class="link-cs ico" :name="item.commCdNm">
                {{ item.commCdNm }}
              </button>
            </li>
          </ul>
          <!-- END : 공지유형코드[ANNCE_TYPE_CD][SS0045]tab -->
        </section>
        <!-- END : 자주 묻는 질문(검색 영역) -->

        <!-- [S] FAQ 키워드 검색 결과 영역 -->
        <section class="section-area type-a">
          <div class="customer-tab" ref="tabContents">
            <h2>{{ this.tabTitle }}</h2>
            <!-- [S]Tab Area -->
            <div class="tab-list type-a">
              <ul class="tablist">
                <li v-for="(item, index) in rsCategoryTab" :key="index">
                  <button v-on:click="setFaqRstTab(item.commCd)" v-bind:class="{active:rsCategoryTabIndex === item.commCd}" aria-controls="tab-written">
                    <strong>{{ item.commCdNm }}</strong>
                  </button>
                </li>
              </ul>
            </div>
            <!-- [E]Tab Area -->
            <!-- [S] 검색 결과 없음 -->
            <div class="sh-no-date" v-if="tabContentOn == false">
              <NoList v-bind:ListType="'chatbot'" NoListText="문의하신 검색 결과가 없습니다">
                <button @click="getZendeskUserInfo()" slot="nolist-button" class="counselingtalk link">
                  <strong class="ico talk">고객센터 연결하기</strong>
                </button>
                <button @click="goPage('inquiry')" slot="nolist-button" class="counselingtalk link">
                  <strong class="ico write">1:1 문의하러 가기</strong>
                </button>
              </NoList>
            </div>
            <!-- [E] 검색 결과 없음 -->
            <!-- [S] 검색 결과 -->
            <div class="tabcontents">
              <AccordionList v-bind:paramGroupId="this.groupId" v-bind:paramList="this.faqList" v-bind:paramSearchCondition="this.searchCondition" v-bind:paramSearchYn="this.searchYn" ref="faqAccordion" />
            </div>
            <!-- [E] 검색 결과 -->
          </div>
          <!-- [S] 더보기 -->
          <div class="btn-more-detail-view" v-if="viewMoreBtn">
            <button class="btn-border" aria-label="상품 상세페이지" @click="moreFaq()">
              <span>더보기</span>
            </button>
          </div>
          <!-- [E] 더보기 -->
        </section>
        <!-- [S] FAQ 키워드 검색 결과 영역 -->
      </div>
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <Loading v-show="loading" />
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer';
import AccordionList from '@/components/customerservice/AccordionList02'; // 실 사용 컴포넌트
import ApiUtils from '@/common/ApiUtils';
import NoList from '@/components/common/NoList'; // 검색결과없음
import CookieUtils from '@/common/CookieUtils';
import Config from '@/common/Config';
import postscribe from 'postscribe';
import axios from 'axios';
import JwtUtils from '@/common/JwtUtils';
import Loading from '@/components/common/Loading';

export default {
  name: 'Faq',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '고객센터 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '자주묻는질문',
      },
    ],
  },
  back: function() {
    history.back();
  },
  created: function() {
  },
  components: {
    SubDefaultHeader,
    NoList, // 검색결과없음
    Footer,
    AccordionList, // 실 사용 컴포넌트
    Loading,
  },
  data() {
    return {
      tabContentOn: true,
      tabTitle: '',
      tabId: this.$route.params.tabId ? this.$route.params.tabId : null,
      tabList: [],
      tab: {},
      faq: null, // 공지사항 아코디언 목록 활성화
      annceSbjSpCd: '2', // 구분 1 PC , 2 MOBILE
      searchCondition: this.$route.params.searchCondition ? this.$route.params.searchCondition : null,
      searchYn: false,
      faqList: null,
      offset: 0,
      limit: 10,
      viewMoreBtn: false,
      groupId: 'faqGroup',
      siteClass: '',
      // categoryTabIndex: '',
      rsCategoryTab: [],
      rsCategoryTabIndex: '1',
      zCmmMbrNO: '',
      zEmail: '',
      zUser: false,
      loading: false
    };
  },
  methods: {
    resetsearchCondition() {
      this.searchCondition = null;
      this.faqList = null;
      this.searchYn = false;
    },
    searchConditionFaq() {
      this.faqList = null;
      this.tabId = '';
      this.tabTitle = '자주 묻는 질문 검색결과';
      this.limit = null;
      this.searchYn = true;
      const $thisBtnTab = document.querySelectorAll('.list-link.tab>li>button');
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
        $thisBtnTab[i].classList.remove('active');
      }
      this.retrievelistFaq(this.tabId);
    },
    tabAction(type) {
      this.searchCondition = null;
      this.searchYn = false;
      const btnTab = document.querySelector('#' + type);
      const $thisBtnTab = document.querySelectorAll('.list-link.tab>li>button');

      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
        $thisBtnTab[i].classList.remove('active');
      }
      console.log('==this.tabId==' + this.tabId);
      this.tabTitle = btnTab.name;
      this.tabId = btnTab.id;
      this.tab[type] = true;
      btnTab.classList.add('active');
      this.$refs.tabContents.focus();
      this.offset = 0;
      this.limit = 10;
      this.viewMoreBtn = false;
      this.faqList = null;
      // this.categoryTabIndex = type.replace('tab', '');
      this.retrievelistFaq(type);
    },
    // FAQ 정보 조회
    retrievelistFaq(type) {
      this.loading = true;
      const params = {
        searchCondition: this.searchCondition,
        annceSbjSpCd: this.annceSbjSpCd,
        annceTypeCd: type.replace('tab', ''),
        offset: this.offset,
        limit: this.limit,
        cmmSteId: this.rsCategoryTabIndex
      };

      ApiUtils.get('/fo/od/TbSsNotiMst/faq-list', params).then(res => {
        const faqObj = {};
        const dataList = res.data.data;
        if (res.data === null || dataList.tbSsNotiMstRsltDtoList.length === 0) {
          // this.faqList = null;
          this.tabContentOn = false;
          return;
        } else {
          this.tabContentOn = true;
        }

        if (dataList.tbSsNotiMstRsltDtoList.length == 10) {
          this.viewMoreBtn = true;
        } else {
          this.viewMoreBtn = false;
        }
        if (this.faqList == null) {
          this.faqList = dataList.tbSsNotiMstRsltDtoList;
        } else {
          for (let i = 0; i < dataList.tbSsNotiMstRsltDtoList.length; i++) {
            this.faqList.push(dataList.tbSsNotiMstRsltDtoList[i]);
          }
          if (this.faqList.length == dataList.totalCnt) {
            this.viewMoreBtn = false;
          }
        }
        for (let i = 0; i < this.faqList.length; i++) {
          faqObj['faq' + i] = false;
        }
        this.faq = faqObj;
        this.loading = false;
      }).then(res => {
        this.loading = false;
      });
      if (this.tabContentOn) {
        this.$refs.faqAccordion.initAccordion(this.groupId);
      }
    },
    setClass() {
      if (this.searchYn) {
        return 'customer-search';
      } else {
        return 'tabcontents';
      }
    },
    moreFaq() {
      this.offset = this.offset + 10;
      // this.limit = this.limit + 10;
      this.retrievelistFaq(this.tabId);
    },
    goPage(item) {
      if (!item) {
        return;
      }
      if (item == 'inquiry') {
        this.$router.push('/cs/mbrinqr/mbr_inqr_reg'); // 1:1문의
        return;
      }
    },
    /* FAQ 키워드 검색 결과 Tab */
    getFaqRstData: async function(idx) {
      // const cmmSteId = CookieUtils.getCmmSteId(); // 커머스사이트ID
      // console.log(">>>>>>>>>> cmmSteId : ", cmmSteId);
      // [S]공통코드 조회
      const params = {
        commGrpCd: 'SS0080'
      };
      ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params).then(res => {
        if (Object.keys(res.data.data).length > 0) {
          this.rsCategoryTab = res.data.data;
          this.rsCategoryTabIndex = idx;
        }
      });
      // [E]공통코드 조회
    },
    setFaqRstTab(idx) {
      this.faqList = [];
      this.viewMoreBtn = false;
      this.offset = 0;
      this.limit = 10;
      this.rsCategoryTabIndex = idx;
      // this.retrievelistFaq(this.categoryTabIndex);
      this.retrievelistFaq(this.tabId);
    },
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    fnRedirect(pageId) {
      if (pageId == "login") {
        const returnUrl = encodeURIComponent(location.href);
        console.log('returnUrl,'+returnUrl);
        this.$router.push({ path: '/cu/login?returnUrl='+returnUrl });
      }
    },
    connectZendesk () {
      const head = document.getElementsByTagName('head')[0];
      // 외부 스크립트 로드
      postscribe(
        head,
        `<script type=text/javascript src=https://cdn.jsdelivr.net/jquery/latest/jquery.min.js><\/script>`
      );
      postscribe(
        head,
        `<script id=ze-snippet src=//static.zdassets.com/ekr/snippet.js?key=`+Config.server.ZENDESK_KEY+`><\/script>`,
        this.startWebWidget
      );
    },
    connectChat() {
      this.loading = false;
      const zLoginName = this.zEmail ? this.zCmmMbrNO + ',' + this.zPhone + ',' + this.zName + ',' + this.zLocation + ',' + this.zEmail : this.zCmmMbrNO + ',' + this.zPhone + ',' + this.zName + ',' + this.zLocation;
      const zLoginMail = this.zEmail && this.zUser ? this.zEmail : '';
      const style = `/* hides header button, footer menu button */
                            div#Embed button[aria-label="Menu"], div#Embed footer button[aria-label="파일 첨부"] {
                              display: none;
                          }`;
      // appends the css in the web widget
      $('iframe#webWidget').contents().find('style:last').append(style);
        // Zendesk의 최종 사용자를 식별합니다.
        zE('webWidget'
          , 'identify'
          // zLocation
          , { name: zLoginName,
              email: zLoginMail
        });
        // 방문자가 메시지를 보내도록합니다. 채팅 진행 중이 아닌 경우 채팅 세션을 시작합니다.
        zE('webWidget', 'chat:send', "상담톡을 연결합니다.");
    },
    showWebWidget() {
      zE('webWidget', 'open');
      // 호스트 페이지에 위젯을 숨겨지기 전의 상태로 표시합니다.
      zE('webWidget', 'show');
    },
    getZendeskUserInfo: async function() {
      const vm = this;
      if (this.isLogin()) {
        if ( typeof window.zESettings == 'undefined' || window.zESettings == undefined || window.zESettings == null) {
          const params = {
            cmmMbrNo: this.zCmmMbrNO,
            emailAddr: this.zEmail
          };
          const headers = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          try {
            vm.loading = true;
            const res = await axios.post(Config.server.ZENDESK_API+'/api/v1/users/search', params, headers);
            if (res.data.count > 0) {
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
    startWebWidget() {
      window.zESettings = {
          webWidget: {
              launcher: {
                  chatLabel: { '*': 'Chat now'},
                  mobile: {labelVisible: true }
              },
              // 웹 위젯 헤더 부분 화살표 버튼의 비활성화 처리
              navigation: {
                  popoutButton: {enabled: false}
              },
              chat: {
                  suppress: false,
                  notifications: {
                      mobile: {disable: true}
                  }
              }
          }
      };
      /*
      // Zendesk의 최종 사용자를 식별합니다.
      zE(
          'webWidget'
        , 'identify'
        , { name: this.zEmail ? this.zCmmMbrNO + ',' + this.zPhone + ',' + this.zName + ',' + this.zLocation + ',' + this.zEmail : this.zCmmMbrNO + ',' + this.zPhone + ',' + this.zName + ',' + this.zLocation, email: this.zEmail && this.zUser ? this.zEmail : ''}
      );
      */
      // 젠데스크 웹위젯이 로드되자마자 페이지에서 숨깁니다.
      zE('webWidget', 'hide');
      zE('webWidget:on', 'open', );

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
    }
  },
  updated() {
  },
  mounted: async function() {
    this.siteClass = CookieUtils.getSiteClass();
    ApiUtils.get('/fo/cm/commcdmgnt/common-codes', {commGrpCd: 'SS0045'}).then(res => {
        if (Object.keys(res.data.data).length > 0) {
          this.tabList = res.data.data;
          for (let i = 0; i < this.tabList.length; i++) {
            if (i == 0) {
              this.tab['tab' + this.tabList[i]['commCd']] = true;
            } else {
              this.tab['tab' + this.tabList[i]['commCd']] = false;
            }
          }
        }
    }).then(res => {
      if (this.tabId != null) {
        this.tabAction('tab' + this.tabId);
      } else if (this.searchCondition != null) {
        this.searchConditionFaq();
      } else {
        this.tabAction('tab01');
      }
    });
    this.getFaqRstData('1');
  }
};
</script>
<style></style>
