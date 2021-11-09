<!--
Design: views/cs/SC-FO-CS-GF-PS-006
Pg id: PG-FO-SS-I004
Uri: /cs/mbrinqr/notice
-->
<template>
  <div class="wrap-customerservice type-new" v-bind:class="[siteClass]">
    <!-- START : Header -->
    <SubDefaultHeader headerText="공지사항" :chatbot="true" :flowroute="siteClass" :headertype="3" />
    <!-- END : Header -->
    <main id="main" tabindex="0">
      <div ref="tabContents">
        <div class="notice-wrap">
          <!--[S]몰 선택 영역[TB_DP_MALL]-->
          <div class="inner top-select">
            <div class="wrap-select lg">
              <select class="w-small" title="공지선택" @change="mallChange($event)">
                <option v-for="item in naviTabList" v-bind:key="item.mallId" v-bind:value="item.mallId">{{ item.mallNm }}</option>
              </select>
            </div>
          </div>
          <!--[E]몰 선택 영역[TB_DP_MALL]-->
          <!-- [S]리스트 영역 -->
          <div id="tab-search-contents1" aria-labelledby="tab-search1">
            <ul class="list-accordion" data-group="noticeGroup">
              <!--======================================================================-->
              <!-- [S]리스트 -->
              <!--======================================================================-->
              <li :class="{ open: notice['notice' + inx] }" v-for="(noticeDtl, inx) in noticeList" :key="noticeDtl.notiSeqno">
                <a href="javascript:;" role="button" :id="'notice-' + inx" class="btn-accordion" :aria-controls="'noticeContent-' + inx" aria-expanded="false" title="공지사항 아코디언 탭" @click="accordionGroupEvent02('noticeGroup');updateInqCnt(noticeDtl.notiSeqno);">
                  <!-- 'N'아이콘 사용시 new 클래스 추가 -->
                  <!-- 고정 공지 일 경우 fix 클래스 추가 -->
                  <p :class="isNewNotice(noticeDtl.annceListExpsrYn, noticeDtl.newYn)">
                    <span class="title" v-html="noticeDtl.notiTitle"></span>
                    <i class="ico-new">N</i>
                  </p>
                  <span class="date">{{ noticeDtl.listExpsrBeginDttm }}</span>
                </a>
                <div :id="'noticeContent-' + inx" class="cont-accordion" :aria-labelledby="'notice-' + inx" v-if="accodionActive[`noticeContent-${inx}`]" v-html="noticeDtl.notiCnts"></div>
              </li>
              <!--======================================================================-->
              <!--[E]리스트-->
              <!--======================================================================-->
            </ul>
            <!--[S]더보기 영역 -->
            <div class="btn-more-detail-view" v-if="viewMoreBtn">
              <button class="btn-border" aria-label="상품 상세페이지" @click="moreNotice()">
                <span>더보기</span>
              </button>
            </div>
            <div class="btn-more-detail-view" v-else></div>
            <!--[E]더보기 영역 -->
            <!--
            <NoList v-if="noticeList==null" NoListText="등록된 공지사항이 없습니다" :ListType="'searchList'"></NoList>
            -->
            <div class="wrap-nolist searchList" v-if="noticeList==null">
              <div><p>등록된 공지사항이 없습니다</p></div>
            </div>
          </div>
          <!-- [S]리스트 영역 -->
        </div>
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
import ApiUtils from '@/common/ApiUtils';
import AccordionMixin from '@/mixins/AccordionMixin'; // 추가 : 2020.02.10 mixins 추가
import CookieUtils from '@/common/CookieUtils';
// import NoList from '@/components/common/NoList'; // 검색결과없음
import Loading from '@/components/common/Loading';

export default {
  name: 'Notice',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '공지사항 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '공지사항',
      },
    ],
  },
  mixins: [AccordionMixin], // 추가 : 2020.02.10 mixins 추가
  components: {
    SubDefaultHeader,
    Footer,
    // NoList,
    Loading
  },
  created: function() {
  },
  data() {
    return {
      naviTabList: [],
      notice: null, // 공지사항 아코디언 목록 활성화
      selectedMallId: 'all', // 몰ID(전체, GS fresh, 달리살다, 새벽배송, 심플리쿡)
      annceSbjSpCd: '2', // 구분 1 PC , 2 MOBILE
      noticeList: null,
      offset: 0,
      limit: 10,
      viewMoreBtn: false,
      siteClass: '',
      loading: false
    };
  },
  methods: {
    back: function() {
      history.back();
    },
    mallChange(e) {
      console.log("MALL ID : ", e.target.value);
      this.$refs.tabContents.focus();
      this.offset = 0;
      this.limit = 10;
      this.selectedMallId = e.target.value;
      this.viewMoreBtn = false;
      this.noticeList = null;
      this.retrievelistNotice(e.target.value);
    },
    // 공지사항 정보 조회
    updateInqCnt(pNotiSeqno) {
      ApiUtils.get('/fo/od/TbSsNotiMst/notice-inqcnt-proc', {notiSeqno: pNotiSeqno});
    },
    // 공지사항 정보 조회
    retrievelistNotice(type) {
      this.loading = true;
      const params = {
        annceSbjSpCd: this.annceSbjSpCd,
        mallId: type,
        offset: this.offset,
        limit: this.limit,
      };
      ApiUtils.get('/fo/od/TbSsNotiMst/notice-list', params).then(res => {
        const noticeObj = {};
        const dataList = res.data.data;

        if (res.data === null || dataList.tbSsNotiMstRsltDtoList.length === 0) {
          // this.noticeList = null;
          this.viewMoreBtn = false;
          return;
        }

        if (dataList.tbSsNotiMstRsltDtoList.length == 10) {
          this.viewMoreBtn = true;
        } else {
          this.viewMoreBtn = false;
        }
        if (this.noticeList == null) {
          this.noticeList = dataList.tbSsNotiMstRsltDtoList;
        } else {
          for (let i = 0; i < dataList.tbSsNotiMstRsltDtoList.length; i++) {
            this.noticeList.push(dataList.tbSsNotiMstRsltDtoList[i]);
          }
          if (this.noticeList.length == dataList.totalCnt) {
            this.viewMoreBtn = false;
          }
        }

        for (let i = 0; i < this.noticeList.length; i++) {
          noticeObj['notice' + i] = false;
        }
        this.notice = noticeObj;
        this.loading = false;
      }).then(res => {
        this.loading = false;
      });
    },
    isNewNotice(isNotice, isNew) {
      if (isNotice == 'Y' && isNew == 'Y') {
        return 'wrap-title fix new';
      } else if (isNotice == 'Y' && isNew == 'N') {
        return 'wrap-title fix';
      } else if (isNotice == 'N' && isNew == 'Y') {
        return 'wrap-title new';
      } else {
        return 'wrap-title';
      }
    },
    moreNotice() {
      this.offset = this.offset + 10;
      this.retrievelistNotice(this.selectedMallId);
    },
  },
  mounted() {
    const vm = this;
    vm.siteClass = CookieUtils.getSiteClass();
    ApiUtils.get('/fo/ev/common/mall-list').then(result => {
      this.naviTabListTemp = result.data.data;
      vm.naviTabList = [];
      const item = {};
      item.mallId = 'all';
      item.mallNm = '전체';
      this.naviTabListTemp.forEach(function(data, idx) {
        if (data.mallId !== '300') {
          vm.naviTabList.push(data);
        }
      });
      vm.naviTabList.unshift(item);
    }).then(() => {
      this.retrievelistNotice(this.selectedMallId);
    }).then(() => {
      // 6월 수정 : 아코디언 액션 그룹핑 수정
      this.accordionInit('noticeGroup');
    });
  },
};
</script>
