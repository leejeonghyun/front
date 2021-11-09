<!--
Design: views\ss\SC-FO-SS-GF-MS-803.vue
Pg id: PG-FO-CS-O001
Uri: /cs/orddeliv/ord_deliv_list
-->
<template>
  <div class="wrap-mypage wrap-cart public_domain" v-bind:class="[siteClass]">
    <SubDefaultHeader headerText="주문/배송조회" :chatbot="false" :tabbar="true" />
    <main id="main" tabindex="0">
      <!-- M4 추가 ========================================= -->
      <section class="shop_scroll__area" :class="{'floating-tab' : [siteClass] != 'marketfor'}">
        <div class="tab-menu tab-list" ref="topTabMenu">
          <ul ref="tabList" class="tab-content-cart tablist">
            <li>
              <button
                type="button"
                id="tab1"
                @click="changeTab('1')"
                class="tabgsf"
                :class="{active : currentTab === 0}"
              >
                <strong>장보기</strong>
              </button>
            </li>
            <li>
              <button
                type="button"
                id="tab2"
                @click="changeTab('3')"
                class="tabmf"
                :class="{active : currentTab === 1}"
              >
                <strong>Partners</strong>
              </button>
            </li>
          </ul>
        </div>
      </section>
      <GsOrderProductList v-if="currentTab == 0" :currentTab="currentTab" />
      <MfOrderProductList v-if="currentTab == 1" :currentTab="currentTab" />
    </main>
    <Footer />
  </div>
</template>
<script>
import Vue from 'vue';
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import MfOrderProductList from '@/views/cs/orddeliv/MfOrderProductList';
import GsOrderProductList from '@/views/cs/orddeliv/GsOrderProductList';
import CookieUtils from '@/common/CookieUtils';
import DateUtils from '@/common/DateUtils';
export default {
  name: 'OrderShippingCondition',
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      currentTab: 1,
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '주문/배송현황 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '주문배송현황',
      },
    ],
  },
  components: {
    SubDefaultHeader, // 헤더
    Footer,
    MfOrderProductList,
    GsOrderProductList,
  },
  watch: {
    currentTab: function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  methods: {
    changeTab(cmmSiteId) {
      if (cmmSiteId == '1') {
        // Market For 활성화
        this.currentTab = 0;
        this.$gsdialog.setOtherSkin();
      } else if (cmmSiteId == '3') {
        // Market For Plus 활성화
        this.currentTab = 1;
        this.$gsdialog.setMfSkin();
      }
    },
    init() {
      // Tab 선택 초기화
      if (CookieUtils.getCmmSteId() == '3') {
        this.currentTab = 1;
        this.$gsdialog.setMfSkin(); // alert / confirm 창에 대한 Market For Skin 세팅.
      } else {
        this.currentTab = 0;
        this.$gsdialog.setOtherSkin(); // alert / confirm 창에 대한 기타(GS Fresh/Dalisalda/새벽배송 등) Skin 세팅.
      }
    },
    stickyTab(scroll) {
      const $stickytab = document.querySelector('.shop_scroll__area');
      if (!$stickytab) return;
      if (scroll >= 60) {
        $stickytab.classList.add('fixed');
      } else {
        $stickytab.classList.remove('fixed');
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      // 2021.03.30 스크롤 시 class fixed 추가
      const $this = this;
      const $stickytab = document.querySelector('.shop_scroll__area');
      if ($stickytab) {
        window.addEventListener('scroll', function() {
          $this.stickyTab(window.pageYOffset);
        });
      }
    });
  },
  destroyed() {
    this.$gsdialog.setDefaultSkin();
  },
};
</script>

<style lang="scss">
</style>
