<!--
Design: views\cs\SC-FO-CS-GF-MP-001.vue
Pg id:
#Uri: /cs/mbr_inqr_list
-->
<template>
  <transition
    name="popupSelectProduct"
    v-on:beforeEnter="popupSelectProductBeforeEnter"
    v-on:enter="popupSelectProductEnter"
    v-on:after-enter="popupSelectProductAfterEnter"
    v-on:leave="popupSelectProductLeave"
  >
    <!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <div
      id="popupInquiry"
      class="wrap-search-layer selectproduct marketfor"
      :class="{active : this.modalActive.popupInquiry, tabcont_gsfresh : !currentTab, tabcont_marketfor : currentTab}"
      role="dialog"
      aria-modal="true"
    >
      <div class="layer-bg" @click="popupAction"></div>
      <h2 class="hidden">주문 상품 선택 팝업</h2>
      <div class="inner-search-layer">
        <div class="popup-header noborder">
          <h3>주문 상품 선택</h3>
        </div>
        <div class="popup-body">
          <!-- 20201110 Tab추가 -->
          <div class="tab-list type-a nomargin">
            <ul class="tablist">
              <li>
                <button
                  id="tab-written"
                  class="tabgsf"
                  aria-controls="tab-written"
                  @click="changeTab('1')"
                  :class="{active : !currentTab}"
                >
                  <strong>장보기</strong>
                </button>
              </li>
              <li>
                <button
                  id="tab-written01"
                  class="tabmf"
                  aria-controls="tab-written01"
                  @click="changeTab('3')"
                  :class="{active : currentTab}"
                >
                  <strong>Partners</strong>
                </button>
              </li>
            </ul>
          </div>
          <GsMbrInqrOdrItemList
            v-if="!currentTab"
            :currentTab="currentTab"
            @selectOrdItemsCallbackFun="selectOrdItemsCallback"
            @popupEvent="popupAction"
          />
          <MfMbrInqrOdrItemList
            v-if="currentTab"
            :currentTab="currentTab"
            @selectOrdItemsCallbackFun="selectOrdItemsCallback"
            @popupEvent="popupAction"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import MfMbrInqrOdrItemList from '@/views/cs/mbrinqr/MfMbrInqrOdrItemList'; // 팝업 - 주문상품선택
import GsMbrInqrOdrItemList from '@/views/cs/mbrinqr/GsMbrInqrOdrItemList'; // 팝업 - 주문상품선택
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export default {
  name: 'PopupInquiry',
  mixins: [LayerPopupMixin],
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      currentTab: true,
      itemList: [],
    };
  },
  components: {
    MfMbrInqrOdrItemList,
    GsMbrInqrOdrItemList,
  },
  methods: {
    changeTab(cmmSiteId) {
      if (cmmSiteId == '1') {
        // Market For 활성화
        this.currentTab = false;
        this.$gsdialog.setOtherSkin();
      } else if (cmmSiteId == '3') {
        // Market For Plus 활성화
        this.currentTab = true;
        this.$gsdialog.setMfSkin(); // alert / confirm 창에 대한 Market For Skin 세팅.
      }
    },
    selectOrdItemsCallback(itemList, type) {
      this.itemList = itemList;
      this.$emit('selectOrdItemsCallbackFun', this.itemList, type);
      this.popupAction();
    },
    // 창 열고닫는토글함수호출
    popupAction() {
      this.$emit('popupEvent', 'popupInquiry');
      this.modalActiveEvent('popupInquiry');
    },
    popupSelectProductBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    popupSelectProductEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    popupSelectProductAfterEnter(el) {
      el.style.opacity = 1;
      el.style.bottom = 0;
      el.focus();
    },
    popupSelectProductLeave(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    init() {
      // Tab 선택 초기화
      if (CookieUtils.getCmmSteId() == '3') {
        this.currentTab = true;
        this.$gsdialog.setMfSkin(); // alert / confirm 창에 대한 Market For Skin 세팅.
      } else {
        this.currentTab = false;
        this.$gsdialog.setOtherSkin(); // alert / confirm 창에 대한 기타(GS Fresh/Dalisalda/새벽배송 등) Skin 세팅.
      }
      this.modalActiveEvent('popupInquiry');
    },
  },
  mounted() {
    this.init();
  },
  updated() {
    if (this.currentTab || !this.currentTab) {
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
  destroyed() {
    this.$gsdialog.setDefaultSkin();
  },
};
</script>
