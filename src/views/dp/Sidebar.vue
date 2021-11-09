<template>
  <transition
    name="sidebar"
    v-on:beforeEnter="sidebarBeforeEnter"
    v-on:enter="sidebarEnter"
    v-on:after-enter="sidebarAfterEnter"
    v-on:leave="sidebarLeave"
  >
    <aside
      class="wrap-sidebar"
      :class="{active: sidebarActive}"
      v-if="sidebarActive"
      ref="sidebar"
      tabindex="0"
    >
      <!-- <aside class="wrap-sidebar active" ref="sidebar"> -->
      <div class="wrapper scroll-area">
        <SidebarLoginInfo />
        <section class="wrap-menu-category">
          <h2 class="hidden">전체메뉴</h2>
          <!-- START : 탭 컨텐츠 -->
          <div v-show="this.tab.btnCategory">
            <!-- 탭이 없는 경우 -->
            <!-- <div id="btnCategory-contents" aria-labelledby="btnCategory" v-show="this.tab.btnCategory"> 탭이 있는 경우 -->
            <h3 class="hidden">카테고리</h3>
            <ul class="wrap-depth02" ref="depth01">
              <li
                :class="['menu-'+index,{open: menu[index]}]"
                v-for="(list, index) in $store.state.dp.menuDspCtgList"
                v-bind:key="list.index"
              >
                <img :src="list.menuOffPathNm" :alt="list.imgAltTextCnts" v-if="!menu[index]" />
                <img :src="list.menuOnPathNm" :alt="list.imgAltTextCnts" v-if="menu[index]" />
                <button @click="depthClickAction(list.dspCtgId)">{{ list.dspCtgNm.substring(0,10) }}</button>
                <div class="wrap-list-depth" v-if="menu[index]">
                  <!-- <a href="#" class="btn-depth01">{{ list.dspCtgNm }} 전체보기</a> -->
                  <gs-link
                    v-if="true"
                    :to="{ path: '/product', query: { dspCtgId: list.dspCtgId }}"
                    @click.native="callCategoryView(list.dspCtgNm)"
                  >
                    <span>{{ list.dspCtgNm.substring(0,10) }} 전체보기</span>
                  </gs-link>
                  <SidebarSsevnt :dspCtgId="list.dspCtgId" />
                  <ul class="wrap-depth03">
                    <li v-for="item in menuLowDspCtgList" v-bind:key="item.index">
                      <gs-link
                        v-if="true"
                        :to="{ path: '/product', query: { dspCtgId: item.dspCtgId}}"
                        @click.native="callCategoryView(list.dspCtgNm)"
                      >
                        <span>{{ item.dspCtgNm.substring(0,11) }}</span>
                      </gs-link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <!-- START : 브랜드 전용관 -->
        <SidebarBrandView v-if="cmmSteId !== '3'"/>
        <!-- END : 브랜드 전용관 -->
        <!-- START : 진행중인 이벤트 -->
        <SidebarEventView v-if="cmmSteId === '3'"/>
        <!-- END : 진행중인 이벤트 -->
        <!-- START : MARKET FOR -->
        <SidebarMarketForView />
        <!-- END : MARKET FOR -->
        <button
          class="btn-close"
          @click="sidebarCloseAction"
          @focusout="sidebarCloseAction"
          aria-label="포커스 아웃 시 카테고리메뉴 닫기"
        ></button>
      </div>
      <div class="dim" @click="sidebarCloseAction"></div>
    </aside>
  </transition>
</template>

<script>
/* import ProductBannerSlide from '@/components/product/ProductBannerSlide'; //테마관 슬라이드 컴포넌트 */
/* import { swiper, swiperSlide } from 'vue-awesome-swiper'; */
import SidebarLoginInfo from '@/views/dp/SidebarLoginInfo';
import SidebarBrandView from '@/views/dp/SidebarBrandView';
import SidebarEventView from '@/views/dp/SidebarEventView';
import SidebarMarketForView from '@/views/dp/SidebarMarketForView';
import SidebarSsevnt from '@/views/dp/SidebarSsevnt';
import AccordionMixin from '@/mixins/AccordionMixin';
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'MenuCategory',
  props: ['sidebarActive'],
  mixins: [AccordionMixin, LayPopupMixin],
  data() {
    return {
      sidebarInit: false, // 카테고리 메뉴 열린 상태
      menu: {}, // 1depth 카테고리
      ctgList: [],
      lowList: {},
      brandList: {},
      menuLowDspCtgList: [],
      tab: {
        btnCategory: true,
        btnBrand: false,
        btnCertificationCpnt: false,
      },
      swiperOption: {
        slidesPerView: 'auto',
        freeMode: true,
      },
      innerTab: {
        btnMyIt: true,
        btnGaNaDa: false,
        btnABC: false, // 4월 추가 : 탭추가
      },
      cmmSteId: CookieUtils.getCmmSteId(),
    };
  },
  components: {
    /* ProductBannerSlide, //테마관 슬라이드 컴포넌트 */
    /* swiper,
    swiperSlide, */
    SidebarBrandView,
    SidebarEventView,
    SidebarLoginInfo,
    SidebarMarketForView,
    SidebarSsevnt,
  },
  async created() {
    try {
      this.$store.dispatch('getMenuDspCategroyInfo', '');
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  activated() {
    window.popStateDetected = false;
    window.addEventListener('popstate', () => {
      window.popStateDetected = true;
    });
  },
  deactivated() {
    window.removeEventListener('popstate', () => {
      window.popStateDetected = true;
    });
  },
  methods: {
    callCategoryView(dspCtgNm) {
      const param = {
        category: dspCtgNm,
        storId: CookieUtils.getCookie('STOR_ID'),
      };
      // appCallCategoryView(param);
    },
    tabAction(type, tabDepth) {
      // tab
      const btnTab = document.querySelector('#' + type);
      if (tabDepth === 'depth01') {
        const $thisBtnTab = document.querySelectorAll(
          '.wrap-menu-btn>li>button'
        );
        for (let i = 0; i < Object.keys(this.tab).length; i++) {
          this.tab[Object.keys(this.tab)[i]] = false;
          $thisBtnTab[i].classList.remove('active');
        }
        this.tab[type] = true;
        btnTab.classList.add('active');
      } else if (tabDepth === 'depth02') {
        const $thisBtnTab = document.querySelectorAll(
          '.wrap-brand-btn>li>button'
        );
        for (let i = 0; i < Object.keys(this.innerTab).length; i++) {
          this.innerTab[Object.keys(this.innerTab)[i]] = false;
          $thisBtnTab[i].classList.remove('active');
        }
        this.innerTab[type] = true;
        btnTab.classList.add('active');
      }
    },
    menuInit() {
      // 초기 카테고리 메뉴
      const $elements = this.$refs.depth01.children;
      for (let i = 0; i < $elements.length; i++) {
        const $class = $elements[i].classList[0].split('-')[1];
        this.$set(this.menu, [`${$class}`], false);
      }
    },
    menuReset() {
      // 카테고리 메뉴 비활성 초기화
      const $elements = Object.keys(this.menu);
      for (let i = 0; i < $elements.length; i++) {
        if (this.menu[$elements[i]]) {
          this.menu[$elements[i]] = false;
        }
      }
    },
    depthClickAction(dspCtgId) {
      // 카테고리 메뉴 활성 상태 변경
      const $li = event.target.parentNode;
      const selectedClass = $li.classList[0].split('-')[1];
      if (!this.menu[selectedClass]) {
        this.menuReset();
      }
      this.$set(this.menu, selectedClass, !this.menu[selectedClass]);
      this.sidebarInit = true;

      this.getMenuLowCtgData(dspCtgId);
    },
    async getMenuLowCtgData(dspCtgId) {
      // GS 하위 카테고리 정보 조회(햄버거메뉴)
      try {
        const siteId = CookieUtils.getCmmSteId();
        if (siteId === '3') {
          const params = {
            dspCtgId: dspCtgId,
            dspScrSpCd: '02',
            storId: CookieUtils.getCookie('STOR_ID'),
            mallId: CookieUtils.getCookie('MARKETFOR_MALL_ID'),
          };
          const response = await ApiUtils.get(
            '/dp/mf/dspctgmgnt/m4-low-dsp-category-list',
            params
          );
          this.menuLowDspCtgList = response.data.data;
        } else {
          const params = {
            dspCtgId: dspCtgId,
            dspScrSpCd: '02',
            storId: CookieUtils.getCookie('STOR_ID'),
          };
          const response = await ApiUtils.get(
            '/dp/fr/dspctgmgnt/low-dsp-category-list',
            params
          );
          this.menuLowDspCtgList = response.data.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    sidebarBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.left = '-100%';
    },
    sidebarEnter(el) {
      el.style.opacity = 1;
    },
    sidebarAfterEnter(el) {
      el.style.opacity = 1;
      el.style.left = 0;
    },
    sidebarLeave(el) {
      el.style.left = '-100%';
    },
    sidebarCloseAction() {
      this.menuReset();
      if (this.sidebarActive) {
        this.$emit('sidebarEvent');
      }
    },
    myItAction() {
      // 찜하기 버튼 클릭시 실행
      const $btnIt = event.target;
      const activeClass = 'active';
      if ($btnIt.classList.contains(activeClass)) {
        $btnIt.classList.remove(activeClass);
        $btnIt.setAttribute('aria-pressed', 'false');
      } else {
        $btnIt.classList.add(activeClass);
        $btnIt.setAttribute('aria-pressed', 'true');
      }
    },
    tabFocusRemove(popupClose) {
      // 팝업 닫기 버튼 탭 이동 시 팝업 닫기
      if (!event.shiftKey) {
        // shift + tab 시 동작 안하기
        event.preventDefault();
        this[popupClose](); // 팝업 닫기 함수 호출
      }
    },
    addressListAction() {
      // 4월수정 : 팝업 - 배송지목록 추가
      this.$emit('deliveryListEvent');
    },
  },
  mounted() {

  },
  updated() {
    if (this.sidebarActive && !this.sidebarInit) {
      if (Object.keys(this.menu).length <= 0) {
        this.menuInit();
      }
      this.$refs.sidebar.focus();
    }
  },
};
</script>

<style>
</style>
