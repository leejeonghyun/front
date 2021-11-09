<template>
  <transition name="popupQnaItem"
    v-on:beforeEnter="popupQnaItemEnter"
    v-on:enter="popupQnaItemEnter"
    v-on:after-enter="popupQnaItemAfterEnter"
    v-on:leave="popupQnaItemLeave">
    <div id="popupQnaItemSelect" v-if="this.popup.popupQnaItemSelect" class="wrap-search-layer selectproduct selectItem" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupQnaItemSelect}">
      <div class="layer-bg" @click="popupAction"></div>
      <h2 class="hidden">나의 주문 선택 팝업</h2>
      <div class="inner-search-layer">
        <div class="popup-header">
          <h3>나의 주문 선택</h3>
        </div>
        <div class="popup-body">
          <div class="wrap-tab">
            <!-- START : tab -->
            <ul class="tablist type02">
              <li>
                <button type="button" id="tab01" aria-controls="tab01-contents" @click="tabAction('tab01')" :class="{active : this.tab.tab01}">
                  <strong>15일</strong>
                </button>
              </li>
              <li>
                <button type="button" id="tab02" aria-controls="tab02-contents" @click="tabAction('tab02')" :class="{active : this.tab.tab02}">
                  <strong>1개월</strong>
                </button>
              </li>
              <li>
                <button type="button" id="tab03" aria-controls="tab03-contents" @click="tabAction('tab03')" :class="{active : this.tab.tab03}">
                  <strong>3개월</strong>
                </button>
              </li>
            </ul>
            <!-- END : tab -->
            <!-- START : tab contents -->
            <div ref="tabContents" class="scroll-area">
              <div class="tab-content">
                <div id="tab01-contents" aria-labelledby="tab01" v-if="this.tab.tab01">
                  <div class="tab-inner">
                    <!-- START : 주문상품  -->
                    <div class="wrap-selectproduct">
                      <!-- START : 주문상품 정보 -->
                      <div class="info-product item-select-list">
                        <ul class="list-product">
                          <li>
                            <div class="item-select">
                              <div class="inp-radio small">
                                <input type="radio" name="radioSelect" id="chkList01_01" value="" checked="checked">
                                <label for="chkList01_01"><strong>2019.12.10</strong> 주문번호 : 20527888</label>
                              </div>
                              <div class="thumb">
                                <figure>
                                  <img src="@/assets/images/_temp/img_product_thumb_01.jpg" alt="CJ 더 건강한 그릴 비엔나 기획 200G*2개">
                                </figure>
                              </div>
                              <div class="text">
                                <strong aria-label="상품명">CJ 더 건강한 그릴 비엔나 기획 200G*2개CJ 더 건강한 그릴 비엔나 기획 200G*2개</strong>
                                <p class="option">옵션2 : 소고기버섯전골 / 2개</p>
                                <span>수량 : 2개</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="item-select">
                              <div class="inp-radio small">
                                <input type="radio" name="radioSelect" id="chkList01_02" value="" checked="checked">
                                <label for="chkList01_02"><strong>2019.12.10</strong> 주문번호 : 20527888</label>
                              </div>
                              <div class="thumb">
                                <figure>
                                  <img src="@/assets/images/_temp/img_product_thumb_01.jpg" alt="CJ 더 건강한 그릴 비엔나 기획 200G*2개">
                                </figure>
                              </div>
                              <div class="text">
                                <strong aria-label="상품명">CJ 더 건강한 그릴 비엔나 기획 200G*2개CJ 더 건강한 그릴 비엔나 기획 200G*2개</strong>
                                <p class="option">옵션2 : 소고기버섯전골 / 2개</p>
                                <span>수량 : 2개</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="item-select">
                              <div class="inp-radio small">
                                <input type="radio" name="radioSelect" id="chkList01_03" value="" checked="checked">
                                <label for="chkList01_03"><strong>2019.12.10</strong> 주문번호 : 20527888</label>
                              </div>
                              <div class="thumb">
                                <figure>
                                  <img src="@/assets/images/_temp/img_product_thumb_01.jpg" alt="CJ 더 건강한 그릴 비엔나 기획 200G*2개">
                                </figure>
                              </div>
                              <div class="text">
                                <strong aria-label="상품명">CJ 더 건강한 그릴 비엔나 기획 200G*2개</strong>
                                <p class="option">옵션2 : 소고기버섯전골 / 2개</p>
                                <span>수량 : 2개</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <!-- END : 주문상품 정보 -->
                    </div>
                    <!-- END : 주문상품 -->
                  </div>
                </div>
                <div id="tab02-contents" aria-labelledby="tab02" v-if="this.tab.tab02">
                  <div class="tab-inner">
                    <!-- START : 주문상품 -->
                    <div class="wrap-selectproduct">
                      <!-- START : 주문상품 정보 -->
                      <div class="info-product item-select-list">
                        <ul class="list-product">
                          <li>
                            <div class="item-select">
                              <div class="inp-radio small">
                                <input type="radio" name="radioSelect" id="chkList02_01" value="" checked="checked">
                                <label for="chkList02_01"><strong>2019.12.10</strong> 주문번호 : 20527888</label>
                              </div>
                              <div class="thumb">
                                <figure>
                                  <img src="@/assets/images/_temp/img_product_thumb_01.jpg" alt="CJ 더 건강한 그릴 비엔나 기획 200G*2개">
                                </figure>
                              </div>
                              <div class="text">
                                <strong aria-label="상품명">CJ 더 건강한 그릴 비엔나 기획 200G*2개CJ 더 건강한 그릴 비엔나 기획 200G*2개</strong>
                                <p class="option">옵션2 : 소고기버섯전골 / 2개</p>
                                <span>수량 : 2개</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="item-select">
                              <div class="inp-radio small">
                                <input type="radio" name="radioSelect" id="chkList02_02" value="" checked="checked">
                                <label for="chkList02_02"><strong>2019.12.10</strong> 주문번호 : 20527888</label>
                              </div>
                              <div class="thumb">
                                <figure>
                                  <img src="@/assets/images/_temp/img_product_thumb_01.jpg" alt="CJ 더 건강한 그릴 비엔나 기획 200G*2개">
                                </figure>
                              </div>
                              <div class="text">
                                <strong aria-label="상품명">CJ 더 건강한 그릴 비엔나 기획 200G*2개</strong>
                                <p class="option">옵션2 : 소고기버섯전골 / 2개</p>
                                <span>수량 : 2개</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <!-- END : 주문상품 정보 -->
                    </div>
                    <!-- END : 주문상품 -->
                  </div>
                </div>
                <div id="tab03-contents" aria-labelledby="tab03" v-if="this.tab.tab03">
                  <div class="tab-inner">
                    <!-- START : 주문상품 -->
                    <div class="wrap-selectproduct">
                      <!-- START : 주문상품 정보 -->
                      <div class="info-product item-select-list">
                        <ul class="list-product">
                          <li>
                            <div class="item-select">
                              <div class="inp-radio small">
                                <input type="radio" name="radioSelect" id="chkList03_01" value="" checked="checked">
                                <label for="chkList03_01"><strong>2019.12.10</strong> 주문번호 : 20527888</label>
                              </div>
                              <div class="thumb">
                                <figure>
                                  <img src="@/assets/images/_temp/img_product_thumb_01.jpg" alt="CJ 더 건강한 그릴 비엔나 기획 200G*2개">
                                </figure>
                              </div>
                              <div class="text">
                                <strong aria-label="상품명">CJ 더 건강한 그릴 비엔나 기획 200G*2개CJ 더 건강한 그릴 비엔나 기획 200G*2개</strong>
                                <p class="option">옵션2 : 소고기버섯전골 / 2개</p>
                                <span>수량 : 2개</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="item-select">
                              <div class="inp-radio small">
                                <input type="radio" name="radioSelect" id="chkList03_02" value="" checked="checked">
                                <label for="chkList01_02"><strong>2019.12.10</strong> 주문번호 : 20527888</label>
                              </div>
                              <div class="thumb">
                                <figure>
                                  <img src="@/assets/images/_temp/img_product_thumb_01.jpg" alt="CJ 더 건강한 그릴 비엔나 기획 200G*2개">
                                </figure>
                              </div>
                              <div class="text">
                                <strong aria-label="상품명">CJ 더 건강한 그릴 비엔나 기획 200G*2개</strong>
                                <p class="option">옵션2 : 소고기버섯전골 / 2개</p>
                                <span>수량 : 2개</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <!-- END : 주문상품 정보 -->
                    </div>
                    <!-- END : 주문상품 -->
                    </div>
                </div>
              </div>
            </div>
            <!-- END : tab contents -->
          </div>
          <!-- START : 하단버튼 -->
          <button class="btn-lg btn-bg lightgreen">선택완료</button>
          <!-- END : 하단버튼 -->
          <button class="btn-del" @click="popupAction"><span class="hidden">닫기</span></button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
export default {
  name: "PopupQnaItemSelect",
  mixins: [LayerPopupMixin],
  props: ['popup'],
  data() {
    return {
      tab: {
       tab01: true,
       tab02: false,
       tab03: false,
      },
    };
  },
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupQnaItemSelect');
    },
    tabAction(type) { // tab
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.$refs.tabContents.focus();
    },
    popupQnaItemBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    popupQnaItemEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    popupQnaItemAfterEnter(el) {
      el.style.opacity = 1;
      el.style.bottom = 0;
      el.focus();
    },
    popupQnaItemLeave(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
  },
  mounted() {
    // this.modalActiveEvent('popupQnaItemSelect');
  },
  updated() {
    // // 팝업 딤드 시 스크롤 막기
    // if (this.popup.popupInquiry) {
    //   disableBodyScroll(document.querySelector('.scroll-area'));
    // } else {
    //   enableBodyScroll(document.querySelector('.scroll-area'));
    // }
  }
};
</script>
