<!--
Design: views\ss\SC-FO-SS-GF-MS-703.vue, views\ss\SC-FO-SS-GF-MS-704.vue
Pg id: PG-FO-SS-I008
Uri: /cu/my_page_notice
-->
<template>
  <div class="wrap-login" v-bind:class="[siteClass]">
    <!-- START : Header -->
    <Header4 headerText="알림함" />
    <!-- END : Header -->
    <nav>
      <!-- START : 탭 리스트 -->
      <div class="wrap-searchresult tab-default">
        <ul class="scroll-area-x">
          <li v-for="(ste, idx) in steList" :key="idx">
            <button :id="`tab-` + ste.cmmSteId" :aria-controls="'tab-contents-' + ste.cmmSteId" @click="tabAction(ste.cmmSteId)" :class="isActiveTab(ste.cmmSteId)">
                <strong role="heading" aria-level="2">{{ ste.cmmSteNm }}</strong>
            </button>
          </li>
        </ul>
      </div>
      <!-- END : 탭 리스트 -->
    </nav>
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div ref="tabContents" class="wrap-mypage-notice" tabindex="0">
        <!-- START : 탭 콘텐츠 -->
        <div class="tab-content">
          <div id="tab-contents-all" aria-labelledby="tab-all">
            <h2 class="hidden">전체</h2>
            <ul class="inner-tablist flex-type">
              <li :class="isActiveInnerTab('shopping')">
                <button role="heading" aria-level="3" id="innertab-shopping" class="btn-border" aria-controls="innertab-contents-shopping" @click="innerTabAction('shopping')">쇼핑 알림</button>
              </li>
              <li :class="isActiveInnerTab('warehousing')">
                <button role="heading" aria-level="3" id="innertab-warehousing" class="btn-border" aria-controls="innertab-contents-warehousing" @click="innerTabAction('warehousing')">입고 알림</button>
              </li>
            </ul>
            <!-- 1. 알림 목록 -->
            <div class="wrap-inner-tab-contents" ref="innerTabContents" tabindex="0">
              <div id="innertab-contents-shopping" class="inner-tab-contents" aria-labelledby="innertab-shopping" v-if="this.innertab.shopping">
                <div class="wrap-title">
                  <h3>나의 쇼핑 알림</h3>
                  <button v-if="isNative" class="btn-setting" @click="goPage('setting')"><span class="hidden">환경설정 바로가기</span></button>
                </div>
                <div class="mypage-notice-list">
                  <!-- START : 알림리스트 없을 때 -->
                  <NoList v-if="this.listCount == 0" NoListText="최근 받은 알림 내용이 없습니다." :ListType="'mypage-notice'" />
                  <!-- END : 알림리스트 없을 때 -->
                  <!-- START : 알림리스트 있을 때 -->
                  <dl v-for="(item, index) in dataInfmList" v-bind="item" :key="index">
                    <dt> {{index}} </dt>
                    <!-- 새로운 알림 class on -->
                    <dd v-for="(itemData, jndex) in item" v-bind="itemData" :key="jndex"  :class="isNewNotice(itemData.readYn)" >
                      <figure>
                        <img :src="getImg(itemData.thumbNailUrl)" alt="" @click="goPage(itemData.pushConUrl)">
                      </figure>
                      <div class="notice-list-info" @click="goPage(itemData.pushConUrl)">
                        <strong>{{ itemData.cmmSteNm }} {{ itemData.pushMsgSeqno }} </strong>
                        <p>{{ itemData.pushTitle }}<br/>{{ itemData.pushSmmrCnts }}</p>
                        <span>{{ itemData.hhmi }}</span>
                      </div>
                    </dd>
                  </dl>
                  <!-- END : 알림리스트 있을 때 -->
                </div>
                <p v-if="this.listCount  > 0" class="notice-info-txt">수신일로부터 1개월이 지난 알림은 삭제됩니다.</p>
              </div>
              <!-- 2. 재입고알림 목록 -->
              <div id="innertab-contents-warehousing" class="inner-tab-contents" aria-labelledby="innertab-warehousing" v-if="this.innertab.warehousing">
                <div class="wrap-title">
                  <h3>나의 입고 알림</h3>
                  <button v-if="isNative" class="btn-setting" @click="goPage('setting')"><span class="hidden">환경설정 바로가기</span></button>
                </div>
                <div class="mypage-notice-list">
                  <!-- START : 알림리스트 없을 때 -->
                  <NoList v-if="Object.keys(dataRstkinInfmList).length == 0" NoListText="최근 받은 알림 내용이 없습니다." :ListType="'mypage-notice'" />
                  <!-- END : 알림리스트 없을 때 -->
                  <!-- START : 알림리스트 있을 때 -->
                  <dl v-for="(item, index) in dataRstkinInfmList" v-bind="item" :key="index" >
                    <dt> {{index}} </dt>
                    <!-- 새로운 알림 class on -->
                    <dd v-for="(itemData, jndex) in item" v-bind="itemData" :key="jndex"  :class="isNewIpgo(itemData.rstkinStatCd)"> <!-- 입고완료 녹색-->
                      <figure>
                        <img :src="getImg(itemData.itemImg)" alt="" @click="goPageProduct(itemData)">
                      </figure>
                      <div class="notice-list-info" @click="goPageProduct(itemData)">
                        <strong>{{ itemData.cmmSteNm }}</strong>
                        <p>{{ itemData.dspItemNm }}</p>
                        <span>{{ itemData.message }}</span>
                      </div>
                      <!-- 공지유형 : 입고알림 입고예정(01)만 취소버튼 활성화-->
                      <button v-if="itemData.rstkinStatCd == '01'" @click="cancelNotice(itemData.itemId, itemData.storId, itemData.supplFirmCd, itemData.rstkinInfmReqSeqno)"
                              class="btn-border btn-notice-cancel">알림취소</button>
                    </dd>
                  </dl>
                  <!-- END : 알림리스트 있을 때 -->
                </div>
                <ul v-if="this.listCount  > 0" class="notice-info-txt list">
                  <li>입고 알림은 신청일로부터 7일 이내 재입고 될 경우 알림이 발송됩니다.</li>
                  <li>최근 30일 간 입고 알림 신청한 상품 내역이며, 30일이 지나면 내역은 자동으로 삭제됩니다.</li>
                  <li>입고 시점에 따라 할인율, 가격 정보 등이 변경될 수 있으며 구매 시점에 따라 품절이 발생할 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- END : 탭 콘텐츠 -->
      </div>
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <div>
      <Loading v-show="loading" />
    </div>
  </div>
</template>
<script>
import Header4 from '@/components/common/header/Header4';
import NoList from '@/components/common/NoList';
import Footer from '@/components/common/Footer';
import ImgUtils from '@/common/ImgUtils';
import ApiUtils from "@/common/ApiUtils";
import ContextUtils from "@/common/ContextUtils";
import Loading from '@/components/common/Loading';
import CookieUtils from '@/common/CookieUtils';
import _ from 'lodash';

export default {
  name: "MyPageNotice",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '알림함 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '알림함',
      },
    ],
  },
  components: {
    Header4,
    NoList,
    Footer,
    Loading
  },
  data() {
    return {
      searchCondition: {
        cmmSteId: undefined,
        pushAnnceTypeCd: undefined,
        offset: 0,
        limit: 10,
        OrderBy: undefined
      },
      dataInfmList: {},
      dataRstkinInfmList: {},
      activeTab: 'all',
      steList: [],
      naviTabList: [],
      naviTab: {},
      innertab: {
          shopping: true,
          warehousing: false
      },
      isNative: false,
      // 더보기
      moreData: true,
      loading: false,
      currentOffset: 0,
      listCount: 0,
      pageLimit: 10,
      siteClass: ''
    };
  },
  methods: {
    init() {
      this.isNative = ContextUtils.isNative();
      this.searchCondition = {
        cmmSteId: undefined, pushAnnceTypeCd: undefined,
        offset: this.currentOffset, limit: this.pageLimit, OrderBy: undefined
      };
      this.getSteList();
    },
    async getList() {
      let url = "";
      const self = this;

      if (self.innertab.shopping) {
        url = "/fo/cu/infmmgnt/notifications"; // 쇼핑알림
      } else {
        url = "/fo/cu/infmmgnt/rstkinNotifications"; // 재입고알림
      }
      const params = {
        cmmSteId: self.searchCondition.cmmSteId,
        pushAnnceTypeCd: self.pushAnnceTypeCd,
        dvcId: localStorage.getItem('deviceId'),
        offset: this.currentOffset,
        limit: this.pageLimit,
        OrderBy: ''
      };
      const result = await ApiUtils.get(url, params);
      let list = null;
      if (result['data']['success']) {
        if (self.innertab.shopping) {
          list = result['data']['data']['infmList'];
          const bindData = self.dataInfmList;
          const resData = list;
          const mergeData = _.merge(bindData, resData);
          self.dataInfmList = mergeData;
          self.listCount = result['data']['data']['listCnt'];
        } else {
          list = result['data']['data']['rstkinInfmList'];
          const bindData = self.dataRstkinInfmList;
          const resData = list;
          const mergeData = _.merge(bindData, resData);
          self.dataRstkinInfmList = mergeData;
          self.listCount = result['data']['data']['listCnt'];
        }
        this.currentOffset = Number(this.currentOffset) + Number(this.pageLimit);
        this.loading = false;
        self.$forceUpdate();
      }
    },
    isNewNotice(isRead) {
      if (isRead == 'N') return "on";
      else return "off";
    },
    isNewIpgo(ipgoCd) {
      if (ipgoCd == '03') return "on";
      else return "off";
    },
    async cancelNotice(itemId, storId, supplFirmCd, rstkinInfmReqSeqno) {
        const self = this;
        this.$gsdialog.confirm('입고 알림을 취소하시겠습니까?').then(async function () {
          // 알림취소 API
          const params = {
            itemId: itemId,
            storId: storId,
            supplFirmCd: supplFirmCd,
            rstkinInfmReqSeqno: rstkinInfmReqSeqno,
            cnclYn: 'Y'
          };
          const result = await ApiUtils.put('/fo/md/iteminfomgnt/restock-inform-upd', params);
          if (result['data']['success'] == true) {
            self.$gsdialog.alert("입고알림이 취소되었습니다.");
            self.innerTabAction("warehousing");
          } else {
            self.$gsdialog.alert("입고알림이 취소 신청중 오류가 발생하였습니다.");
            console.error(result['data']['success']);
          }
        });
    },
    goPage(item) {
        if (!item ) {
            return;
        }
        if (item == 'setting') {
            this.$router.push('/ss/setting');
        } else {
            location.href = item;
        }
    },
    goPageProduct(item) {
      const url = '/md/product_detail?itemId=' + item.itemId + '&storId=' + item.storId + '&supplFirmCd=' + item.supplFirmCd;
      if (item.mallId === '11') {
        location.href = SiteUtils.dalimo(url);
      } else {
        location.href = SiteUtils.freshmo(url);
      }
    },
    tabAction(type) {
      for (let i = 0; i < Object.keys(this.naviTab).length; i++) {
        this.naviTab[Object.keys(this.naviTab)[i]] = false;
      }
      this.naviTab[type] = true;
      // 조회조건:몰ID - 전체
      this.searchCondition.cmmSteId = type == 'all' ? '' : type;

      this.onClickTab();
    },
    innerTabAction(innerType) {
      for (let i = 0; i < Object.keys(this.innertab).length; i++) {
        this.innertab[Object.keys(this.innertab)[i]] = false;
      }
      this.innertab[innerType] = true;
      this.$refs.innerTabContents.focus();

      this.searchCondition.pushAnnceTypeCd = innerType == "shopping" ? "" : "3";

      this.onClickTab();
    },
    onClickTab() {
      this.currentOffset = 0;
      this.dataInfmList = {};
      this.dataRstkinInfmList = {};
      this.getList();
    },
    getSteList() {
      const self = this;
      ApiUtils.get('/fo/od/TbSsNotiMst/ste-list')
        .then(result => {
          self.steList = result.data.data;
          for (let i=0; i < self.steList.length; i++) {
              if ( i == 0 ) {
                  self.naviTab[self.steList[i]['cmmSteId']] = true;
                  continue;
              }
              self.naviTab[self.steList[i]['cmmSteId']] = false;
          }
          self.getList();
      });
    },
    isActiveTab(cmmSteId) {
      return this.naviTab[cmmSteId]? "active" : "";
    },
    isActiveInnerTab(type) {
      return this.innertab[type] ? "active" : "";
    },
    handleScroll: function() {
      const el = document.querySelector('body');
      const y = window.scrollY + window.innerHeight;
      const height = el.offsetHeight;
      const ratio = Math.floor((y / height) * 100);
      if ( this.listCount > this.currentOffset ) {
        if (ratio > 60 && this.moreData && !this.loading) {
          this.loadMore();
        }
      }
    },
    loadMore() {
      this.loading = true;
      if ( this.listCount > this.currentOffset) {
        this.getList();
      } else {
        this.loading = false;
      }
    },
    getImg(val) {
      let imgNm = '';
      let path = '';
      if (val != null && val != '') {
        imgNm = val.replace('{SIZE}', 300);
        path = ImgUtils.path(imgNm);
      } else {
        imgNm = "/assets/images/img/img_product_nothumb.jpg";
        path = ImgUtils.path(imgNm);
      }
      return path;
    },
  },
  created() {
    // console.log("window.navigator.userAgent -> ", window.navigator.userAgent);
    this.init();
  },
  mounted() {
    this.siteClass = CookieUtils.getSiteClass();
    // 스크롤
    this.handleScroll();
    // 조회
    const stock = this.$route.params.stock; // 재입고 알림함 바로가기 여부
    if (stock) {
      this.innerTabAction('warehousing');
    } else {
      this.getList();
    }
    window.addEventListener('scroll', this.handleScroll);
  },
};
</script>
