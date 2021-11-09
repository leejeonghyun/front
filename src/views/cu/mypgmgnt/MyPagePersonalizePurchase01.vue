<!--
SC-FO-SS-GF-MS-705
-->
<template>
  <div class="wrap" v-bind:class="[siteClass]"><!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <!-- START : Header -->
    <!--  4월 수정 START : 텍스트 수정  -->
    <SubDefaultHeader headerText="자주 구매한 상품" />
    <!--  4월 수정 END : 텍스트 수정 -->
    <!-- END : Header -->
    <nav>
      <!-- START : 탭 리스트 -->
      <div class="wrap-searchresult tab-default">
        <ul class="scroll-area-x">
          <li>
            <button id="tab-all" aria-controls="tab-contents-all" @click="tabAction('all')" :class="{active : this.naviTab.all}">
              <strong role="heading" aria-level="2">전체</strong>
            </button>
          </li>
          <li>
            <button id="tab-gsfresh" aria-controls="tab-contents-gsfresh" @click="tabAction('gsfresh')" :class="{active : this.naviTab.gsfresh}" >
              <strong role="heading" aria-level="2">GS 프레시몰</strong>
            </button>
          </li>
          <li>
            <button id="tab-dalisalda" aria-controls="tab-contents-dalisalda" @click="tabAction('dalisalda')" :class="{active : this.naviTab.dalisalda}" >
              <strong role="heading" aria-level="2">달리살다</strong>
            </button>
          </li>
          <!-- <li>
            <button id="tab-daybreak" aria-controls="tab-contents-daybreak" @click="tabAction('daybreak')" :class="{active : this.naviTab.daybreak}" >
              <strong role="heading" aria-level="2">새벽배송</strong>
            </button>
          </li> -->
          <li>
            <button id="tab-simplycook" aria-controls="tab-contents-simplycook" @click="tabAction('simplycook')" :class="{active : this.naviTab.simplycook}" >
              <strong role="heading" aria-level="2">심플리쿡</strong>
            </button>
          </li>
        </ul>
      </div>
      <!-- END : 탭 리스트 -->
    </nav>
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div ref="tabContents" class="wrap-mypage wrap-mypage-personalize" tabindex="0">
        <!-- START : 탭 콘텐츠 -->
        <div class="tab-content">
          <div id="tab-contents-all" aria-labelledby="tab-all" v-if="this.naviTab.all">
            <h2 class="hidden">전체</h2>
            <div class="wrap-personalize-filter">
              <div class="flex-type wrap-btn" aria-label="자주 구매한 상품 조회 기간 선택">
                <button class="btn-border active">15일</button>
                <button class="btn-border">1개월</button>
                <button class="btn-border">3개월</button>
                <button class="btn-border">6개월</button>
              </div>
              <!-- 4월 수정 START : 기간조회 추가 -->
              <div class="period-details">
                <fieldset>
                  <legend>자주 구매한 상품 기간조회</legend>
                  <div class="term-calendar">
                    <button class="btn-calendar" aria-haspopup="dialog" title="조회기간 시작날짜 선택 팝업활성화" @click="calendarOpen('start')">
                      <span aria-label="조회기간 시작날짜">{{this.period.start.date}}</span>
                    </button>
                    <code class="ico-period">~</code>
                    <button class="btn-calendar" aria-haspopup="dialog" title="조회기간 끝나는 날짜 선택 팝업활성화" @click="calendarOpen('end')">
                      <span aria-label="조회기간 끝나는 날짜">{{this.period.end.date}}</span>
                    </button>
                  </div>
                  <button class="btn-md btn-bg darkgray">조회</button>
                </fieldset>
              </div>
              <!-- 4월 수정 END : 기간조회 추가 -->
              <div class="personalize-filter-check">
                <div class="filter-input-check">
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="all-check1" value=""  checked="checked">
                    <label for="all-check1">전체</label>
                  </span>
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="soldout-check1" value="">
                    <label for="soldout-check1">품절상품제외</label>
                  </span>
                  <button class="btn-border btn-xs position-right" aria-label="선택 한 자주 구매 상품">담기</button>
                </div>
              </div>
            </div>
            <div class="wrap-personalize-list">
              <div class="wrap-personalize-item-option">
                <div class="item-option-top">
                  <p class="wrap-chk">
                    <span class="inp-chk">
                      <input type="checkbox" name="" aria-label="자주 구매 상품 선택" id="item1-check" value=""  checked="checked">
                      <label for="item1-check" class="hidden">서울 목장의 신선함이 살아있는 저지방 우유 1L</label>
                      <!-- !! label 값 아래 자주 구매 상품명이 들어가야 함 -->
                    </span>
                    <span aria-label="몰 이름">GS 프레시몰</span>
                  </p>
                  <p>
                    <span aria-label="상품 구매 횟수">1번 구매</span>
                    <span>최종구매일 : 2020.0.16</span>
                  </p>
                </div>
              </div>
              <div class="wrap-product-image">
                <div class="product-item image">
                  <span class="wrap-product-personal-tag">
                    <span class="product-personal-tag">자주구매</span>
                  </span>
                  <ProductImage05 @popupEvent="popupAction" />
                  <dl class="product-item-option">
                    <dt>옵션 :</dt>
                    <dd>옵션상품명이 노출됩니다.</dd>
                    <dt>수량 :</dt>
                    <dd>3개</dd>
                  </dl>
                </div>
                <div class="product-item image">
                  <span class="wrap-product-personal-tag">
                    <span class="product-personal-tag">추천상품</span>
                  </span>
                  <ProductImage05 @popupEvent="popupAction" />
                  <dl class="product-item-option">
                    <dt>옵션 :</dt>
                    <dd>옵션상품명이 노출됩니다.</dd>
                    <dt>수량 :</dt>
                    <dd>3개</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="wrap-personalize-list">
              <div class="wrap-personalize-item-option">
                <div class="item-option-top">
                  <p class="wrap-chk">
                    <span class="inp-chk">
                      <input type="checkbox" name="" aria-label="자주 구매 상품 선택" id="item1-check" value=""  checked="checked">
                      <label for="item1-check" class="hidden">서울 목장의 신선함이 살아있는 저지방 우유 1L</label>
                      <!-- !! label 값 아래 자주 구매 상품명이 들어가야 함 -->
                    </span>
                    <span aria-label="몰 이름">달리살다</span>
                  </p>
                  <p>
                    <span aria-label="상품 구매 횟수">1번 구매</span>
                    <span>최종구매일 : 2020.0.16</span>
                  </p>
                </div>
              </div>
              <div class="wrap-product-image">
                <div class="product-item image">
                  <span class="wrap-product-personal-tag">
                    <span class="product-personal-tag">자주구매</span>
                  </span>
                  <ProductImage05 :daliProduct="true" @popupEvent="popupAction" />
                  <dl class="product-item-option">
                    <dt>옵션 :</dt>
                    <dd>옵션상품명이 노출됩니다.</dd>
                    <dt>수량 :</dt>
                    <dd>3개</dd>
                  </dl>
                </div>
                <div class="product-item image">
                  <span class="wrap-product-personal-tag">
                    <span class="product-personal-tag">추천상품</span>
                  </span>
                  <ProductImage05 :daliProduct="true" @popupEvent="popupAction" />
                  <dl class="product-item-option">
                    <dt>옵션 :</dt>
                    <dd>옵션상품명이 노출됩니다.</dd>
                    <dt>수량 :</dt>
                    <dd>3개</dd>
                  </dl>
                </div>
              </div>
            </div>
            <!-- 5월 수정 삭제 <div class="wrap-personalize-list">
              <div class="wrap-personalize-item-option">
                <div class="item-option-top">
                  <p class="wrap-chk">
                    <span class="inp-chk">
                      <input type="checkbox" name="" aria-label="자주 구매 상품 선택" id="item1-check" value=""  checked="checked">
                      <label for="item1-check" class="hidden">서울 목장의 신선함이 살아있는 저지방 우유 1L</label>
                    </span>
                    <span aria-label="몰 이름">새벽배송</span>
                  </p>
                  <p>
                    <span aria-label="상품 구매 횟수">1번 구매</span>
                    <span>최종구매일 : 2020.0.16</span>
                  </p>
                </div>
              </div>
              <div class="wrap-product-image">
                <div class="product-item image">
                  <span class="wrap-product-personal-tag">
                    <span class="product-personal-tag">자주구매</span>
                  </span>
                  <ProductImage05 :dayBreakProduct="true" @popupEvent="popupAction" />
                  <dl class="product-item-option">
                    <dt>옵션 :</dt>
                    <dd>옵션상품명이 노출됩니다.</dd>
                    <dt>수량 :</dt>
                    <dd>3개</dd>
                  </dl>
                </div>
                <div class="product-item image">
                  <span class="wrap-product-personal-tag">
                    <span class="product-personal-tag">추천상품</span>
                  </span>
                  <ProductImage05 :dayBreakProduct="true" @popupEvent="popupAction" />
                  <dl class="product-item-option">
                    <dt>옵션 :</dt>
                    <dd>옵션상품명이 노출됩니다.</dd>
                    <dt>수량 :</dt>
                    <dd>3개</dd>
                  </dl>
                </div>
              </div>
            </div> -->
            <div class="wrap-banner">
              <div class="wrap-ticker personalize" v-if="isTyping" :class="{typing: isTyping}">
                <div class="model" aria-label="GSfresh모델"></div>
                <div class="wrap-speech">
                  <div class="speech-bubble">
                    <vue-typed-js :strings="['유기농 상품 쿠폰 있는데 그냥 가실 거예요?']" :typeSpeed="30" :startDelay="1000" :showCursor="false" v-if="isTyping">
                      <span class="typing"></span>
                    </vue-typed-js>
                  </div>
                  <button class="btn-close" aria-label="말풍선닫기" @click="typingDestroyAction"></button>
                </div>
              </div>
            </div>
          </div>
          <!-- START : GS Fresh -->
          <div id="tab-contents-gsfresh" aria-labelledby="tab-gsfresh" v-if="this.naviTab.gsfresh">
            <h2 class="hidden">GS 프레시몰</h2>
            <div class="wrap-personalize-filter">
              <div class="flex-type wrap-btn" aria-label="자주 구매한 상품 조회 기간 선택">
                <button class="btn-border active">15일</button>
                <button class="btn-border">1개월</button>
                <button class="btn-border">3개월</button>
                <button class="btn-border">6개월</button>
              </div>
              <!-- 4월 수정 START : 기간조회 추가 -->
              <div class="period-details">
                <fieldset>
                  <legend>자주 구매한 상품 기간조회</legend>
                  <div class="term-calendar">
                    <button class="btn-calendar" aria-haspopup="dialog" title="조회기간 시작날짜 선택 팝업활성화" @click="calendarOpen('start')">
                      <span aria-label="조회기간 시작날짜">{{this.period.start.date}}</span>
                    </button>
                    <code class="ico-period">~</code>
                    <button class="btn-calendar" aria-haspopup="dialog" title="조회기간 끝나는 날짜 선택 팝업활성화" @click="calendarOpen('end')">
                      <span aria-label="조회기간 끝나는 날짜">{{this.period.end.date}}</span>
                    </button>
                  </div>
                  <button class="btn-md btn-bg darkgray">조회</button>
                </fieldset>
              </div>
              <!-- 4월 수정 END : 기간조회 추가 -->
              <div class="personalize-filter-check">
                <div class="filter-input-check">
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="all-check2" value=""  checked="checked">
                    <label for="all-check2">전체</label>
                  </span>
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="soldout-check2" value="">
                    <label for="soldout-check2">품절상품제외</label>
                  </span>
                  <button class="btn-border btn-xs position-right" aria-label="선택 한 자주 구매 상품">담기</button>
                </div>
              </div>
            </div>
            <!-- START : 알림리스트 없을 때 -->
            <NoList NoListText="자주 구매한 상품이 없습니다." :ListType="'mypage-itemlist'" />
            <div class="wrap-mypage-item-list">
              <h3>추천상품</h3>
              <div class="">
                <h4>위대한 빅세일</h4>
                <div class="wrap-product-list">
                  <ProductList02 @popupEvent="popupAction" />
                  <ProductList02 @popupEvent="popupAction" />
                </div>
              </div>
              <div class="">
                <h4>신상품</h4>
                <div class="wrap-product-list">
                  <ProductList02 :daliProduct="true" @popupEvent="popupAction" />
                </div>
              </div>
              <div class="">
                <h4>1+1</h4>
                <div class="wrap-product-list">
                  <ProductList02 :dayBreakProduct="true" @popupEvent="popupAction" />
                </div>
              </div>
            </div>
            <!-- END : 알림리스트 없을 때 -->
          </div>
          <!-- END : GS Fresh -->
          <!-- START : 달리살다 -->
          <div id="tab-contents-dalisalda" aria-labelledby="tab-dalisalda" v-if="this.naviTab.dalisalda">
            <h2 class="hidden">달리살다</h2>
            <div class="wrap-personalize-filter">
              <div class="flex-type wrap-btn" aria-label="자주 구매한 상품 조회 기간 선택">
                <button class="btn-border active">15일</button>
                <button class="btn-border">1개월</button>
                <button class="btn-border">3개월</button>
                <button class="btn-border">6개월</button>
              </div>
              <!-- 4월 수정 START : 기간조회 추가 -->
              <div class="period-details">
                <fieldset>
                  <legend>자주 구매한 상품 기간조회</legend>
                  <div class="term-calendar">
                    <button class="btn-calendar" aria-haspopup="dialog" title="조회기간 시작날짜 선택 팝업활성화" @click="calendarOpen('start')">
                      <span aria-label="조회기간 시작날짜">{{this.period.start.date}}</span>
                    </button>
                    <code class="ico-period">~</code>
                    <button class="btn-calendar" aria-haspopup="dialog" title="조회기간 끝나는 날짜 선택 팝업활성화" @click="calendarOpen('end')">
                      <span aria-label="조회기간 끝나는 날짜">{{this.period.end.date}}</span>
                    </button>
                  </div>
                  <button class="btn-md btn-bg darkgray">조회</button>
                </fieldset>
              </div>
              <!-- 4월 수정 END : 기간조회 추가 -->
              <div class="personalize-filter-check">
                <div class="filter-input-check">
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="all-check3" value=""  checked="checked">
                    <label for="all-check3">전체</label>
                  </span>
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="soldout-check3" value="">
                    <label for="soldout-check3">품절상품제외</label>
                  </span>
                  <button class="btn-border btn-xs position-right" aria-label="선택 한 자주 구매 상품">담기</button>
                </div>
              </div>
            </div>
            <div class="wrap-banner">
              <div class="wrap-ticker personalize" v-if="isTyping" :class="{typing: isTyping}">
                <div class="model" aria-label="GSfresh모델"></div>
                <div class="wrap-speech">
                  <div class="speech-bubble">
                    <vue-typed-js :strings="['유기농 상품 쿠폰 있는데 그냥 가실 거예요?']" :typeSpeed="150" :startDelay="500" :showCursor="false" v-if="isTyping">
                      <span class="typing"></span>
                    </vue-typed-js>
                  </div>
                  <button class="btn-close" aria-label="말풍선닫기" @click="typingDestroyAction"></button>
                </div>
              </div>
            </div>
          </div>
          <!-- END : 달리살다 -->
          <!-- START : 새벽배송 -->
          <!-- 5월 수정 삭제 <div id="tab-contents-daybreak" aria-labelledby="tab-daybreak" v-if="this.naviTab.daybreak">
            <h2 class="hidden">새벽배송</h2>
            <div class="wrap-personalize-filter">
              <div class="flex-type wrap-btn" aria-label="자주 구매한 상품 조회 기간 선택">
                <button class="btn-border active">15일</button>
                <button class="btn-border">1개월</button>
                <button class="btn-border">3개월</button>
                <button class="btn-border">6개월</button>
              </div>
              <div class="period-details">
                <fieldset>
                  <legend>자주 구매한 상품 기간조회</legend>
                  <div class="term-calendar">
                    <button class="btn-calendar" aria-haspopup="dialog" title="조회기간 시작날짜 선택 팝업활성화" @click="calendarOpen('start')">
                      <span aria-label="조회기간 시작날짜">{{this.period.start.date}}</span>
                    </button>
                    <code class="ico-period">~</code>
                    <button class="btn-calendar" aria-haspopup="dialog" title="조회기간 끝나는 날짜 선택 팝업활성화" @click="calendarOpen('end')">
                      <span aria-label="조회기간 끝나는 날짜">{{this.period.end.date}}</span>
                    </button>
                  </div>
                  <button class="btn-md btn-bg darkgray">조회</button>
                </fieldset>
              </div>
              <div class="personalize-filter-check">
                <div class="filter-input-check">
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="all-check4" value=""  checked="checked">
                    <label for="all-check">전체</label>
                  </span>
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="soldout-check4" value="">
                    <label for="soldout-check">품절상품제외</label>
                  </span>
                  <button class="btn-border btn-xs position-right" aria-label="선택 한 자주 구매 상품">담기</button>
                </div>
              </div>
            </div>
            <div class="wrap-banner">
              <div class="wrap-ticker personalize" v-if="isTyping" :class="{typing: isTyping}">
                <div class="model" aria-label="GSfresh모델"></div>
                <div class="wrap-speech">
                  <div class="speech-bubble">
                    <vue-typed-js :strings="['유기농 상품 쿠폰 있는데 그냥 가실 거예요?']" :typeSpeed="150" :startDelay="500" :showCursor="false" v-if="isTyping">
                      <span class="typing"></span>
                    </vue-typed-js>
                  </div>
                  <button class="btn-close" aria-label="말풍선닫기" @click="typingDestroyAction"></button>
                </div>
              </div>
            </div>
          </div> -->
          <!-- END : 새벽배송 -->
          <!-- START : 심플리쿡 -->
          <div id="tab-contents-simplycook" aria-labelledby="tab-simplycook" v-if="this.naviTab.simplycook">
          </div>
          <!-- END : 심플리쿡 -->
        </div>
        <!-- END : 탭 콘텐츠 -->
      </div>
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <!-- START : 팝업 -->
    <popupOption @popupEvent="popupAction" v-if="this.popup.popupOption" />
    <PopupDiscountInfo @popupEvent="popupAction" v-if="this.popup.popupSales" />
    <!-- END : 팝업 -->
    <!-- 4월 수정 START : 팝업 추가 -->
    <PopupPeriodCalendar :type="period.selected.type" :initDate="period.selected.changingDate" @calendarChange="calendarChange" @popupEvent="popupAction" v-if="popup.popupPeriodCalendar"/> <!-- 팝업 - 기간조회 -->
    <!-- 4월 수정 END : 팝업 추가 -->
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import NoList from '@/components/common/NoList';
import ProductImage05 from '@/components/mypage/ProductImage05'; // 이미지 일반형5
import ProductList02 from '@/components/mypage/ProductList02'; // 리스트 일반형2
import PopupDiscountInfo from '@/components/product/PopupDiscountInfo'; // 팝업 - 할인내역
// import popupOption from '@/views/md/SC-FO-MD-GF-MP-001'; // 팝업 - 장바구니 옵션
import popupOption from '@/views/md/OptionArea';
import { VueTypedJs } from 'vue-typed-js';
import Footer from '@/components/common/Footer';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
// 4월 수정 START : 팝업 - 기간조회 추가
import PopupPeriodCalendar from '@/views/ss/PopupPeriodCalendar'; // from '@/views/ss/SC-FO-SS-GF-MP-871';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
// 4월 수정 END : 팝업 - 기간조회 추가
export default {
  name: "MyPagePersonalizePurchase",
  metaInfo: {
    title: 'GS 프레시몰',
    titleTemplate: '자주 구매한 상품 < 마이페이지 < %s'
  },
  components: {
    SubDefaultHeader,
    PopupDiscountInfo,
    popupOption,
    NoList,
    VueTypedJs,
    ProductImage05,
    ProductList02,
    Footer,
    // 4월 수정 START : 팝업 - 기간조회 추가
    PopupPeriodCalendar,
    // 4월 수정 END : 팝업 - 기간조회 추가
  },
  data() {
    return {
      isTyping: false, // 하단 티커 활성화
      naviTab: {
       all: true,
       gsfresh: false,
       dalisalda: false,
      //  daybreak: false,
       simplycook: false
      },
      popup: { // 팝업
        open: false,
        popupSales: false, // 할인 내역 팝업
        popupOption: false, // 장바구니 옵션 팝업
        popupPeriodCalendar: false // 4월 수정 : 팝업 - 기간조회 추가
      },
      purchaseItemLists: [],
      // 4월 수정 START : 기간조회 데이터 추가
      period: {
        selected: {
          type: 'start',
          changingDate: {}
        },
        start: {
          date: '2020-03-01',
          day: DateUtils.format('2020-03-01', 'dd')
        },
        end: {
          date: DateUtils.format('2020-03-31', 'YYYY-MM-DD'),
          day: DateUtils.format('2020-03-31', 'dd')
        },
      },
      // 4월 수정 END : 기간조회 데이터 추가
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    typingDestroyAction(e) { // 하단 배너 비활성화 함수
      this.isTyping = null;
    },
    bannerAction(scroll, bannerTop) {
      const winHeight = window.innerHeight;
      if (this.isTyping === false) {
        if (scroll + winHeight > bannerTop) {
          this.isTyping = true;
        };
      };
    },
    bannerinit() {
      const $this = this;
      const banner = document.querySelectorAll('.wrap-banner');
      if (banner.length) {
        const bannerTop = banner[0].offsetTop;
        window.addEventListener('scroll', function() {
          $this.bannerAction(window.pageYOffset, bannerTop);
        });
      };
    },
    tabAction(type) {
      for (let i = 0; i < Object.keys(this.naviTab).length; i++) {
        this.naviTab[Object.keys(this.naviTab)[i]] = false;
      }
      this.naviTab[type] = true;
      // this.$refs.tabContents.focus(); 5월 수정 삭제
    },
    selectAction(type) { // 리스트, 배송타입 레이어 활성화
      if (!this.select[type].open) {
        Object.keys(this.select).map( (select) => {
          this.select[select].open = false;
        });
      }
      this.select[type] = Object.assign({}, this.select[type], {open: !this.select[type].open});
    },
    changeSelectAction(type, selectedData) { // 리스트, 배송타입 정렬 변경
      this.select[type] = Object.assign({}, this.select[type], {open: false, selected: selectedData});
    },
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false;
    },
    // 4월 수정 START : 달력 팝업 활성화 관련 이벤트 추가
    calendarChange(type, newDate) { // 달력 팝업으로 변경된 날짜 저장
      this.period[type].date = newDate.date;
    },
    calendarOpen(type) { // 달력 팝업 활성화 type: 'start' / 'end'
      this.period.selected.type = type;
      this.period.selected.changingDate = this.period[type];
      this.popupAction('popupPeriodCalendar');
    },
    // 4월 수정 END : 달력 팝업 활성화 이벤트 추가
    getPurchaseItem: async function() {
      // 최근본상품 조회
      console.log("  getPurchaseItem  pgSize " );
     /* const PsnRcmdInputDto = {
        cmmMbrNo: 7706266, // TODO
        custNo: pgNo
      };
      */
      // console.log("+++"+JSON.stringify(MbrInqItemListInqInputDto));
      // console.log(JSON.stringify(MbrInqItemListInqInputDto ));
      const resultList = await ApiUtils.post('/fo/od/rcmd/purchase-frequency-items', null); // 공통코드정보
      // console.log("====시작==1==");
        console.log(JSON.stringify(resultList.data.data));
      if (resultList.data.success) {
        this.purchaseItemLists = resultList.data.data;
        console.log(JSON.stringify(this.purchaseItemLists)); // this.recentItemLists = resultList.data.data;
      } else {
        console.log("오류");
      }
    },
  },
  mounted() {
    const $this = this;
    window.addEventListener('scroll', function() {
      $this.bannerinit();
    });
    this.getPurchaseItem();
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++ ) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    };
  },
  /* 4월 수정 START : 이벤트 리스너 제거 */
  destroyed() {
    window.removeEventListener('scroll', this);
  },
  /* 4월 수정 END : 이벤트 리스너 제거 */
};
</script>
