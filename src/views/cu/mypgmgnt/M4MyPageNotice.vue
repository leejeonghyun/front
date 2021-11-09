<!--
Design: views\ss\SC-FO-SS-GF-MS-703.vue, views\ss\SC-FO-SS-GF-MS-704.vue
Pg id: PG-FO-SS-I008
Uri: /cu/m4_my_page_notice
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]">
    <!-- START : Header -->
    <SubDefaultHeader ref="header" headerText="알림함" />
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="wrap-mypage-notice">
        <ul class="inner-tablist flex-type">
        <li :class="isActiveInnerTab('marketing')">
            <button role="heading" aria-level="3" id="innertab-marketing" class="btn-border" aria-controls="innertab-contents-marketing" @click="innerTabAction('marketing')">마케팅 알림</button>
          </li>
          <li :class="isActiveInnerTab('shopping')">
            <button role="heading" aria-level="3" id="innertab-shopping" class="btn-border" aria-controls="innertab-contents-shopping" @click="innerTabAction('shopping')">쇼핑 알림</button>
          </li>
        </ul>
        <!-- 1. 알림 목록 -->
        <div class="wrap-inner-tab-contents" ref="innerTabContents" tabindex="0">
        <div class="wrap-title" v-if="isApp">
              <h3>나의 <span v-text="(this.innertab.marketing) ? '마케팅' : '쇼핑'" /> 알림</h3>
              <button class="btn-setting" @click="goPage('setting')"><span>알림설정</span></button>
            </div>
          <!-- 1. 마케팅알림 목록 -->
          <div id="innertab-contents-marketing" class="inner-tab-contents" aria-labelledby="innertab-marketing" v-if="this.innertab.marketing">
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
            <p class="notice-info-txt">수신일로부터 1개월이 지난 알림은 삭제됩니다.</p>
          </div>
          <!-- 2. 쇼핑알림 목록 -->
          <div id="innertab-contents-shopping" class="inner-tab-contents" aria-labelledby="innertab-shopping" v-if="this.innertab.shopping">
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
            <ul class="notice-info-txt list">
              <li>수신일로부터 1개월이 지난 알림은 삭제됩니다.</li>
              <li>[입고 알림]은 신청일로부터 7일 이내 재입고 될 경우 알림이 발송됩니다.</li>
              <li>[입고 알림]의 경우 알림 신청 당시와 할인율, 가격 정보 등이 변경될 수 있으며 구매 시점에 따라 품절이 발생할 수 있습니다.</li>
            </ul>
          </div>
        </div>
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
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 통합 헤더
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
    SubDefaultHeader,
    NoList,
    Footer,
    Loading
  },
  data() {
    return {
      searchCondition: {
        pushAnnceTypeCd: 1,
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
          marketing: true,
          shopping: false
      },
      isApp: ContextUtils.isNative(),
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
        pushAnnceTypeCd: 1,
        offset: this.currentOffset, limit: this.pageLimit, OrderBy: undefined
      };
      console.log('searchCondition', this.searchCondition);
    },
    async getList() {
      let url = "";
      const self = this;
      url = "/fo/cu/infmmgnt/notifications";
      console.log('self.searchCondition.pushAnnceTypeCd', self.searchCondition.pushAnnceTypeCd);
      const params = {
        pushAnnceTypeCd: self.searchCondition.pushAnnceTypeCd,
        dvcId: localStorage.getItem('deviceId'),
        offset: this.currentOffset,
        limit: this.pageLimit,
        OrderBy: ''
      };
      const result = await ApiUtils.get(url, params);
      let list = null;
      if (result['data']['success']) {
        list = result['data']['data']['infmList'];
        const bindData = self.dataInfmList;
        const resData = list;
        const mergeData = _.merge(bindData, resData);
        self.dataInfmList = mergeData;
        self.listCount = result['data']['data']['listCnt'];
      }
      this.currentOffset = Number(this.currentOffset) + Number(this.pageLimit);
      this.loading = false;
      self.$forceUpdate();
    },
    isNewNotice(isRead) {
      if (isRead == 'N') return "on";
      else return "off";
    },
    isNewIpgo(ipgoCd) {
      if (ipgoCd == '03') return "on";
      else return "off";
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
      if (item.mallId == '11') {
        url = SiteUtils.dalimo(url);
      } else if (itemValue.mallId == '1' || itemValue.mallId == '20') {
        url = SiteUtils.freshmo(url);
      } else {
        url = SiteUtils.marketformo(url);
      }
    },
    innerTabAction(innerType) {
      for (let i = 0; i < Object.keys(this.innertab).length; i++) {
        this.innertab[Object.keys(this.innertab)[i]] = false;
      }
      this.innertab[innerType] = true;
      this.$refs.innerTabContents.focus();

      this.searchCondition.pushAnnceTypeCd = innerType == "marketing" ? "1" : "";
      console.log('this.searchCondition.pushAnnceTypeCd', this.searchCondition.pushAnnceTypeCd);

      this.onClickTab();
    },
    onClickTab() {
      this.currentOffset = 0;
      this.dataInfmList = {};
      this.dataRstkinInfmList = {};
      this.getList();
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
    this.getList();
    window.addEventListener('scroll', this.handleScroll);
  },
};
</script>
