<!--
views/od/SC-FO-OD-MF-MS-001
-->
<template>
  <div class="wrap-cart cart-main public_domain" :class="cmmSiteClass"> <!-- 유입위치 클래스 추가 -->
    <SubDefaultHeader headerText="장바구니" :tabbar="false" :headertype="3" :cartView="true" :searchView="true" />
    <main id="main" tabindex="0">
      <section class="shop_scroll__area" :class="{marketfor : currentTab===1}">
        <div class="tab-menu tab-list" ref="topTabMenu">
          <ul ref="tabList" class="tab-content-cart tablist">
            <!-- 2020.03.09 탭명 텍스트로 변경 -->
            <li>
              <button type="button" id="tab1" @click="changeTab('1')" class="tabgsf" :class="{active : currentTab===0}">
                <strong>장보기</strong>
              </button>
            </li>
            <li>
              <button type="button" id="tab2" @click="changeTab('3')" class="tabmf" :class="{active : currentTab===1}">
                <strong>Partners</strong>
              </button>
            </li>
            <!-- // 2020.03.09 탭명 텍스트로 변경 -->
          </ul>
        </div>
      </section>

      <!-- tab contents 1 -->
      <MfTheBasketGsf ref="gsfBaskt" v-show="currentTab == 0"
        @showLoading="showLoading"
        :cmmSiteClass="'gsfresh'"
        :loading="loading"
      />
      <!-- // tab contents 1 -->

      <!-- tab contents 2 -->
      <MfTheBasketMf ref="mfBaskt" v-show="currentTab == 1"
        @showLoading="showLoading"
        :cmmSiteClass="'marketfor'"
        :loading="loading"
      />
      <!-- // tab contents 2 -->
    </main>

    <Footer/>
    <Loading v-show="loading > 0" />
  </div>
</template>
<script>

import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 통합 헤더
import Footer from '@/components/common/Footer'; // 푸터
import MfTheBasketMf from '@/views/od/MfTheBasketMf'; // 본문내용(MarketFor)
import MfTheBasketGsf from '@/views/od/MfTheBasketGsf'; // 본문내용(MarketFor)

import Loading from '@/components/common/Loading';

import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import JwtUtils from '@/common/JwtUtils';
import SiteUtils from '@/common/SiteUtils';

export default {
  name: "MfTheBasketMain",
  data() {
    return {
      loading: 0,
      cmmSiteClass: CookieUtils.getSiteClass(),
      currentTab: 1,
      ordsMbrDlvpSeqno: 0,
    };
  },
  metaInfo: {
    title: 'Market For',
    titleTemplate: '장바구니 < %s'
  },
  mixins: [],
  components: {
    // CartProductList, // 실 사용 컴포넌트
    // CartItemPrice, // 실 사용 컴포넌트
    SubDefaultHeader, // 통합 헤더
    MfTheBasketMf,
    MfTheBasketGsf,
    Footer,
    Loading,
  },
  methods: {
    // Tab 변경 처리 함수
    changeTab(cmmSiteId) {
      if (cmmSiteId == '1') { // Market For 장바구니 활성화
        this.currentTab = 0;
        // alert / confirm 창에 대한 기타(GS Fresh/Dalisalda/새벽배송 등) Skin 세팅.
        this.$gsdialog.setOtherSkin();
      } else if (cmmSiteId == '3') { // Market For Plus 장바구니 활성화
        this.currentTab = 1;
        // alert / confirm 창에 대한 Market For Skin 세팅.
        this.$gsdialog.setMfSkin();
      }
      // 장바구니 조회
      this.getBasket();
    },
    // 로딩바 노출 여부 처리 함수
    showLoading(loadFlag) {
      if (!!loadFlag) this.loading++; else this.loading--;
    },
    // 사이트 접속 경로에 따라 장바구니 정보를 조회한다.
    async getBasket() {
      // GSF 장바구니 첫구매/맛보기 행사 여부 초기화
      this.$refs.gsfBaskt.cartFirstProduct = false;
      this.$refs.gsfBaskt.cartBenefitProduct= false;
      // 장바구니 상품 목록 초기화
      this.$refs.gsfBaskt.bsktInqRsltDto = {};
      this.$refs.mfBaskt.bsktInqRsltDto = {};
      if (this.currentTab === 1) { // Market For Plus로 접속한 경우 장바구니 목록 조회
        // 배송지 정보 유지를 위한 처리
        this.$refs.mfBaskt.mbrDlvp = this.$refs.gsfBaskt.mbrDlvp;
        this.$refs.mfBaskt.mbrDlvpTemp = this.$refs.gsfBaskt.mbrDlvpTemp;
        await this.$refs.mfBaskt.getBskt('S');
      } else if (this.currentTab === 0) { // Market For로 접속한 경우 장바구니 목록 조회
        // 배송지 정보 유지를 위한 처리
        this.$refs.gsfBaskt.mbrDlvp = this.$refs.mfBaskt.mbrDlvp;
        this.$refs.gsfBaskt.mbrDlvpTemp = this.$refs.mfBaskt.mbrDlvpTemp;
        await this.$refs.gsfBaskt.getBskt('S');
      }
    },
    async getOrdsMbrDlvp() {
      this.showLoading(true);
      const result2 = await ApiUtils.get('/fo/od/bsktmgnt/delivery-area');
      this.showLoading(false);
      const ordsMbrDlvpList = result2.data.data;
      this.setMbrDlvp(ordsMbrDlvpList.find(item=>item.mbrDlvpSeqno == this.ordsMbrDlvpSeqno));
    },
    setMbrDlvp(mbrDlvp) {
      // Gsf 배송지 정보 Set
      this.$refs.gsfBaskt.mbrDlvp = mbrDlvp;
      this.$refs.gsfBaskt.mbrDlvpTemp = mbrDlvp;
      // Mf 배송지 정보 Set
      this.$refs.mfBaskt.mbrDlvp = mbrDlvp;
      this.$refs.mfBaskt.mbrDlvpTemp = mbrDlvp;
    },
    async initBaseDeliveryArea() {
      this.$store.state.ordId = '';
      localStorage.removeItem('multiDelivBskt');
      // 주문서에서 권역이 변경되는 배송지를 선택할 경우
      if (localStorage.getItem("ordsMbrDlvpSeqno")) {
        this.ordsMbrDlvpSeqno = localStorage.getItem("ordsMbrDlvpSeqno");
        localStorage.removeItem("ordsMbrDlvpSeqno");
        await this.getOrdsMbrDlvp();
      } else {
        this.showLoading(true);
        const result2 = await ApiUtils.get('/fo/od/bsktmgnt/base-delivery-area');
        this.showLoading(false);
        if (result2.data.success) {
          this.setMbrDlvp(result2.data.data);
        } else {
          if (result2.data.statusCode=="dev.warn.com.notlogin") { // 로그인 에러 발생시
            // 강제 로그아웃처리 함수(쿠키정보를 삭제한다.)
            JwtUtils.destroyIdToken();
            this.$refs.mfBaskt.loginYn = false;
            this.$refs.gsfBaskt.loginYn = false;
          } else {
            this.$gsdialog.alert('오류가 발생하였습니다');
          }
        }
      }
    }
  },
  async mounted() {
    // Tab 선택 초기화
    if (CookieUtils.getCmmSteId() == '3') { // Market For Plus 장바구니 활성화
      this.currentTab = 1;
      // alert / confirm 창에 대한 Market For Skin 세팅.
      this.$gsdialog.setMfSkin();
    } else {
      this.currentTab = 0;
      // alert / confirm 창에 대한 기타(GS Fresh/Dalisalda/새벽배송 등) Skin 세팅.
      this.$gsdialog.setOtherSkin();
    }
    await this.$refs.mfBaskt.initMounted();
    await this.initBaseDeliveryArea();
    this.getBasket();
  },
  watch: {
    currentTab: function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  updated() {},
  destroyed() {
    this.$gsdialog.setDefaultSkin();
  },
};
</script>
<style lang="scss">
</style>
