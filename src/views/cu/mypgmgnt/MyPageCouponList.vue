<!--
view/ss/SC-FO-SS-GF-MS-701
-->
<template>
  <div class="wrap-mypage coupon" v-bind:class="[siteClass]">
    <!-- START : Header -->
    <SubDefaultHeader headerText="쿠폰" />
    <!-- END : Header -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="wrap-input">
        <fieldset class="warp-input-txt">
          <legend>쿠폰등록</legend>
          <div class="inp-box">
            <input type="text" id="text" class="inp-txt w100" value="" title="쿠폰등록" placeholder="쿠폰 일련번호를 입력해주세요.">
          </div>
        </fieldset>
        <button class="btn-Register">등록</button>
      </div>
      <!-- START : tab -->
      <div class="wrap-searchresult tab-default">
        <ul class="scroll-area-x">
          <li>
            <button id="tab-all" aria-controls="tab-contents-all" @click="tabAction('all')" :class="{active : this.tab.all}">
              <strong role="heading" aria-level="2">전체</strong>
            </button>
          </li>
          <li>
            <button id="tab-gsfresh" aria-controls="tab-contents-gsfresh" @click="tabAction('gsfresh')" :class="{active : this.tab.gsfresh}" >
              <strong role="heading" aria-level="2">GS 프레시몰</strong>
            </button>
          </li>
          <li>
            <button id="tab-dalisalda" aria-controls="tab-contents-dalisalda" @click="tabAction('dalisalda')" :class="{active : this.tab.dalisalda}" >
              <strong role="heading" aria-level="2">달리살다</strong>
            </button>
          </li>
          <li>
            <button id="tab-daybreak" aria-controls="tab-contents-daybreak" @click="tabAction('daybreak')" :class="{active : this.tab.daybreak}" >
              <strong role="heading" aria-level="2">새벽배송</strong>
            </button>
          </li>
          <li>
            <button id="tab-simplycook" aria-controls="tab-contents-simplycook" @click="tabAction('simplycook')" :class="{active : this.tab.simplycook}" >
              <strong role="heading" aria-level="2">심플리쿡</strong>
            </button>
          </li>
        </ul>
      </div>
      <!-- END : tab -->
      <div ref="tabContents" class="wrap-mypage" tabindex="0">
        <!-- START : innerTab -->
        <div class="wrap-tab">
          <div class="inner">
            <ul class="inner-tablist flex-type">
              <li :class="{active : this.innertab.all.tab1}">
                <button role="heading" aria-level="3" id="innertab-tab1" class="btn-border" aria-controls="innertab-contents-tab1" @click="innerTabAction('tab1')">
                  <span class="title">사용 가능한 쿠폰</span>
                  <span class="num">16</span>
                </button>
              </li>
              <li :class="{active : this.innertab.all.tab2}">
                <button role="heading" aria-level="3" id="innertab-tab2" class="btn-border" aria-controls="innertab-contents-tab2" @click="innerTabAction('tab2')">
                  <span class="title">사용/만료 쿠폰</span>
                  <span class="num">32</span>
                </button>
              </li>
            </ul>
            <p class="txt-notice" v-if="this.innertab.all.tab1">
              7일 이내 소멸 예정인 쿠폰이 <span class="point">4</span>장 있습니다.
            </p>
          </div>
        </div>
        <!-- END : innerTab -->
        <!-- START : tab contents -->
        <div class="tab-content">
          <!-- START : 전체 -->
          <div id="tab-contents-all" aria-labelledby="tab-all" v-if="this.tab.all">
            <div class="wrap-inner-tab-contents" ref="innerTabContents" tabindex="0">
              <div id="innertab-contents-tab1" class="inner-tab-contents" aria-labelledby="innertab-tab1" v-if="this.innertab.all.tab1">
                <!-- START : coupon slide -->
                <section class="section-area">
                  <h4 class="inner-title">홍길동님 만을 위한 특별한 쿠폰</h4>
                  <div class="wrap-slide">
                    <div class="product-top-visual" ref="productVisual">
                      <button class="swiper-button-prev" aria-label="이전슬라이드"></button>
                      <button class="swiper-button-next" aria-label="다음슬라이드"></button>
                      <swiper :options="swiperOption" ref="subDetailSwiper">
                        <swiper-slide>
                          <div class="wrap-coupon type-detail">
                            <div class="top-info">
                              <p class="type">장바구니</p>
                              <p class="usedtype">모바일웹/APP</p>
                            </div>
                            <p class="title">GSfresh 신한카드 전용</p>
                            <div class="wrap-price">
                              <div class="price">5,000<span class="unit">원</span></div>
                              <div class="desc">
                                <p>20,000원 이상 구매 시</p>
                                <p>최대 2,000원 할인</p>
                              </div>
                            </div>
                            <div class="date">~ 2020.11.30 15:00</div>
                            <div class="btn-area-coupon">
                              <button class="btn-coupon" aria-label="환불 처리안내 팝업 활성화" aria-haspopup="dialog" @click="popupAction('popupUsePlace')">사용처</button>
                              <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupApplicableCoupon')">적용 가능 상품</button>
                              <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupUnapplicableCoupon')" v-if="false">적용 불가 상품</button>
                            </div>
                          </div>
                        </swiper-slide>
                        <swiper-slide>
                          <div class="wrap-coupon type-detail">
                            <div class="top-info">
                              <p class="type">상품</p>
                              <p class="usedtype">PC</p>
                            </div>
                            <p class="title"> GSfresh 신한카드 전용</p>
                            <div class="wrap-price">
                              <div class="price">20<span class="unit">%</span></div>
                              <div class="desc">
                                <p>20,000원 이상 구매 시</p>
                                <p>최대 2,000원 할인</p>
                              </div>
                            </div>
                            <div class="date">~ 2020.11.30 15:00</div>
                            <div class="btn-area-coupon">
                              <button class="btn-coupon" aria-label="환불 처리안내 팝업 활성화" aria-haspopup="dialog" @click="popupAction('popupUsePlace')">사용처</button>
                              <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupApplicableCoupon')" v-if="false">적용 가능 상품</button>
                              <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupUnapplicableCoupon')">적용 불가 상품</button>
                            </div>
                          </div>
                        </swiper-slide>
                        <swiper-slide>
                          <div class="wrap-coupon type-detail">
                            <div class="top-info">
                              <p class="type">배송비</p>
                              <p class="usedtype">모바일웹/APP</p>
                            </div>
                            <p class="title">[e-첫구매영수증] 배송비 무료 쿠폰</p>
                            <div class="wrap-price">
                              <div class="price">무료배송<span class="unit"></span></div>
                              <div class="desc">
                                <p>20,000원 이상 구매 시</p>
                                <p>최대 2,000원 할인</p>
                              </div>
                            </div>
                            <div class="date">~ 2020.11.30 15:00</div>
                            <div class="btn-area-coupon">
                              <button class="btn-coupon" aria-label="환불 처리안내 팝업 활성화" aria-haspopup="dialog" @click="popupAction('popupUsePlace')">사용처</button>
                              <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupApplicableCoupon')">적용 가능 상품</button>
                              <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupUnapplicableCoupon')" v-if="false">적용 불가 상품</button>
                            </div>
                          </div>
                          <!-- END : simplycook 쿠폰 -->
                        </swiper-slide>
                      </swiper>
                      <div class="swiper-pagination" slot="pagination"></div>
                    </div>
                  </div>
                </section>
                <!-- END : coupon slide -->
                <!-- START : 쿠폰 목록 -->
                <section class="section-area">
                  <div class="inner-coupon">
                    <!-- START : 사용 가능한 쿠폰이 없을 경우 -->
                    <NoList NoListText="사용 가능한 쿠폰이 없습니다." :ListType="'mypage-notice'" v-if="false"/>
                    <!-- END : 사용 가능한 쿠폰이 없을 경우 -->
                    <ul class="list-coupon">
                      <li>
                        <div class="wrap-coupon type-list">
                          <div class="top-info">
                            <p class="type">상품</p>
                          </div>
                          <div class="price">
                            5,000<span class="unit">원</span>
                          </div>
                          <div class="desc">
                            <p>20,000원 이상 구매 시</p>
                            <p>최대 2,000원 할인</p>
                          </div>
                        </div>
                        <!-- START : 쿠폰 상세 설명 -->
                        <div class="wrap-coupon-info">
                          <div class="top-info">
                            <p class="usedtype">모바일웹/APP</p>
                            <p class="imminent">1일 남음</p>
                          </div>
                          <p class="name">등급쿠폰 5,000원(일부상품 제외)</p>
                          <p class="date">~ 2019.12.10 22:00</p>
                          <div class="btn-area-coupon">
                            <button class="btn-coupon" aria-label="환불 처리안내 팝업 활성화" aria-haspopup="dialog" @click="popupAction('popupUsePlace')">사용처</button>
                            <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupApplicableCoupon')">적용 가능 상품</button>
                            <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupUnapplicableCoupon')" v-if="false">적용 불가 상품</button>
                          </div>
                        </div>
                        <!-- END : 쿠폰 상세 설명 -->
                      </li>
                      <li>
                        <div class="wrap-coupon type-list">
                          <div class="top-info">
                            <p class="type">장바구니</p>
                          </div>
                          <div class="price">
                            20<span class="unit">%</span>
                          </div>
                          <div class="desc">
                            <p>20,000원 이상 구매 시</p>
                            <p>최대 2,000원 할인</p>
                          </div>
                        </div>
                        <!-- START : 쿠폰 상세 설명 -->
                        <div class="wrap-coupon-info">
                          <div class="top-info">
                            <p class="usedtype">PC</p>
                            <p class="imminent">1일 남음</p>
                          </div>
                          <p class="name">[e-큰장날] 광복절 10% 장바구니 쿠폰 (양곡, 업체택배 등 제외)</p>
                          <p class="date">~ 2019.12.10 22:00</p>
                          <div class="btn-area-coupon">
                            <button class="btn-coupon" aria-label="환불 처리안내 팝업 활성화" aria-haspopup="dialog" @click="popupAction('popupUsePlace')">사용처</button>
                            <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupApplicableCoupon')">적용 가능 상품</button>
                            <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupUnapplicableCoupon')" v-if="false">적용 불가 상품</button>
                          </div>
                        </div>
                        <!-- END : 쿠폰 상세 설명 -->
                      </li>
                      <li>
                        <div class="wrap-coupon type-list">
                          <div class="top-info">
                            <p class="type">배송비</p>
                          </div>
                          <div class="price">
                            무료배송<span class="unit"></span>
                          </div>
                          <div class="desc">
                            <p>20,000원 이상 구매 시</p>
                            <p>최대 2,000원 할인</p>
                          </div>
                        </div>
                        <!-- START : 쿠폰 상세 설명 -->
                        <div class="wrap-coupon-info">
                          <div class="top-info">
                            <p class="usedtype">PC</p>
                            <p class="imminent" v-if="false">1일 남음</p>
                          </div>
                          <p class="name">[e-큰장날] 광복절 10% 장바구니 쿠폰 (양곡, 업체택배 등 제외)</p>
                          <p class="date">~ 2019.12.10 22:00</p>
                          <div class="btn-area-coupon">
                            <button class="btn-coupon" aria-label="환불 처리안내 팝업 활성화" aria-haspopup="dialog" @click="popupAction('popupUsePlace')">사용처</button>
                            <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupApplicableCoupon')" v-if="false">적용 가능 상품</button>
                            <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupUnapplicableCoupon')">적용 불가 상품</button>
                          </div>
                        </div>
                        <!-- END : 쿠폰 상세 설명 -->
                      </li>
                    </ul>
                  </div>
                </section>
                <!-- END : 쿠폰 목록 -->
              </div>
              <div id="innertab-contents-tab2" class="inner-tab-contents" aria-labelledby="innertab-tab2" v-if="this.innertab.all.tab2">
                <!-- START : 사용한 쿠폰 목록 -->
                <section class="section-area">
                  <h4 class="inner-title">사용한 쿠폰</h4>
                  <div class="inner-coupon">
                    <!-- START : 사용 가능한 쿠폰이 없을 경우 -->
                    <NoList NoListText="사용 가능한 쿠폰이 없습니다." :ListType="'mypage-notice'" v-if="false"/>
                    <!-- END : 사용 가능한 쿠폰이 없을 경우 -->
                    <ul class="list-coupon">
                      <li>
                        <div class="wrap-coupon type-list gsfresh">
                          <p class="type">상품</p>
                          <div class="price">
                            5,000<span class="unit">원</span>
                          </div>
                          <div class="desc">
                            <p>20,000원 이상 구매 시</p>
                            <p>최대 2,000원 할인</p>
                          </div>
                        </div>
                        <!-- START : 쿠폰 상세 설명 -->
                        <div class="wrap-coupon-info">
                          <div class="top-info">
                            <p class="usedtype">모바일웹/APP</p>
                          </div>
                          <p class="name">등급쿠폰 5,000원(일부상품 제외)</p>
                          <p class="date">사용일시 : 2019.12.09  00:00</p>
                        </div>
                        <!-- END : 쿠폰 상세 설명 -->
                      </li>
                      <li>
                        <div class="wrap-coupon type-list">
                          <p class="type">장바구니</p>
                          <div class="price">
                            20<span class="unit">%</span>
                          </div>
                          <div class="desc">
                            <p>20,000원 이상 구매 시</p>
                            <p>최대 2,000원 할인</p>
                          </div>
                        </div>
                        <!-- START : 쿠폰 상세 설명 -->
                        <div class="wrap-coupon-info">
                          <div class="top-info">
                            <p class="usedtype">PC</p>
                          </div>
                          <p class="name">[e-큰장날] 광복절 10% 장바구니 쿠폰 (양곡, 업체택배 등 제외)</p>
                          <p class="date">사용일시 : 2019.12.09  00:00</p>
                        </div>
                        <!-- END : 쿠폰 상세 설명 -->
                      </li>
                      <li>
                        <div class="wrap-coupon type-list">
                          <p class="type">배송비</p>
                          <div class="price">
                            무료배송<span class="unit"></span>
                          </div>
                          <div class="desc">
                            <p>20,000원 이상 구매 시</p>
                            <p>최대 2,000원 할인</p>
                          </div>
                        </div>
                        <!-- START : 쿠폰 상세 설명 -->
                        <div class="wrap-coupon-info">
                          <div class="top-info">
                            <p class="usedtype">PC</p>
                          </div>
                          <p class="name">[e-큰장날] 광복절 10% 장바구니 쿠폰 (양곡, 업체택배 등 제외)</p>
                          <p class="date">사용일시 : 2019.12.09  00:00</p>
                        </div>
                        <!-- END : 쿠폰 상세 설명 -->
                      </li>
                    </ul>
                  </div>
                </section>
                <!-- END : 사용한 쿠폰 목록 -->
                <!-- START : 만료된 쿠폰 목록 -->
                <section class="section-area">
                  <h4 class="inner-title">만료된 쿠폰</h4>
                  <div class="inner-coupon">
                    <!-- START : 사용 가능한 쿠폰이 없을 경우 -->
                    <NoList NoListText="사용 가능한 쿠폰이 없습니다." :ListType="'mypage-notice'" v-if="false"/>
                    <!-- END : 사용 가능한 쿠폰이 없을 경우 -->
                    <ul class="list-coupon">
                      <li>
                        <div class="wrap-coupon type-list">
                          <p class="type">상품</p>
                          <div class="price">
                            5,000<span class="unit">원</span>
                          </div>
                          <div class="desc">
                            <p>20,000원 이상 구매 시</p>
                            <p>최대 2,000원 할인</p>
                          </div>
                        </div>
                        <!-- START : 쿠폰 상세 설명 -->
                        <div class="wrap-coupon-info">
                          <div class="top-info">
                            <p class="usedtype">모바일웹/APP</p>
                            <p class="imminent">만료</p>
                          </div>
                          <p class="name">등급쿠폰 5,000원(일부상품 제외)</p>
                          <p class="date">2019.12.09  00:00 ~ 2019.12.10 00:00</p>
                        </div>
                        <!-- END : 쿠폰 상세 설명 -->
                      </li>
                      <li>
                        <div class="wrap-coupon type-list">
                          <p class="type">장바구니</p>
                          <div class="price">
                            20<span class="unit">%</span>
                          </div>
                          <div class="desc">
                            <p>20,000원 이상 구매 시</p>
                            <p>최대 2,000원 할인</p>
                          </div>
                        </div>
                        <!-- START : 쿠폰 상세 설명 -->
                        <div class="wrap-coupon-info">
                          <div class="top-info">
                            <p class="usedtype">PC</p>
                            <p class="imminent">만료</p>
                          </div>
                          <p class="name">[e-큰장날] 광복절 10% 장바구니 쿠폰 (양곡, 업체택배 등 제외)</p>
                          <p class="date">2019.12.09  00:00 ~ 2019.12.10 00:00</p>
                        </div>
                        <!-- END : 쿠폰 상세 설명 -->
                      </li>
                      <li>
                        <div class="wrap-coupon type-list">
                          <p class="type">배송비</p>
                          <div class="price">
                            무료배송<span class="unit"></span>
                          </div>
                          <div class="desc">
                            <p>20,000원 이상 구매 시</p>
                            <p>최대 2,000원 할인</p>
                          </div>
                        </div>
                        <!-- START : 쿠폰 상세 설명 -->
                        <div class="wrap-coupon-info">
                          <div class="top-info">
                            <p class="usedtype">PC</p>
                            <p class="imminent">만료</p>
                          </div>
                          <p class="name">[e-큰장날] 광복절 10% 장바구니 쿠폰 (양곡, 업체택배 등 제외)</p>
                          <p class="date">2019.12.09  00:00 ~ 2019.12.10 00:00</p>
                        </div>
                        <!-- END : 쿠폰 상세 설명 -->
                      </li>
                    </ul>
                  </div>
                </section>
                <!-- END : 만료된 쿠폰 목록 -->
              </div>
            </div>
          </div>
          <!-- END : 전체 -->
          <!-- START : GS Fresh -->
          <div id="tab-contents-gsfresh" aria-labelledby="tab-gsfresh" v-if="this.tab.gsfresh">
          </div>
          <!-- END : GS Fresh -->
          <!-- START : 달리살다 -->
          <div id="tab-contents-dalisalda" aria-labelledby="tab-dalisalda" v-if="this.tab.dalisalda">
          </div>
          <!-- END : 달리살다 -->
          <!-- START : 새벽배송 -->
          <div id="tab-contents-daybreak" aria-labelledby="tab-daybreak" v-if="this.tab.daybreak">
          </div>
          <!-- END : 새벽배송 -->
          <!-- START : 심플리쿡 -->
          <div id="tab-contents-simplycook" aria-labelledby="tab-simplycook" v-if="this.tab.simplycook">
          </div>
          <!-- END : 심플리쿡 -->
        </div>
        <!-- END : tab contents -->
      </div>
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <!-- START : 팝업 -->
    <PopupUnapplicableCoupon @popupEvent="popupAction" v-if="this.popup.popupUnapplicableCoupon" /> <!-- 팝업 - 적용 불가 -->
    <PopupApplicableCoupon @popupEvent="popupAction" v-if="this.popup.popupApplicableCoupon" :popup="popup" /> <!-- 팝업 - 적용 가능 -->
    <popupOption @popupEvent="popupAction" v-if="this.popup.popupOption" /><!-- 팝업 - 장바구니 옵션 -->
    <PopupUsePlace @popupEvent="popupAction" v-if="this.popup.popupUsePlace" /> <!-- 팝업 - 사용처 -->
    <!-- END : 팝업 -->
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import NoList from '@/components/common/NoList';
import Footer from '@/components/common/Footer';
import PopupUnapplicableCoupon from '@/views/cu/mypgmgnt/PopupUnapplicableCoupon'; // 팝업 - 쿠폰 적용 불가 상품
import PopupApplicableCoupon from '@/views/cu/mypgmgnt/PopupApplicableCoupon'; // 팝업 - 쿠폰 적용 가능 상품
import popupOption from '@/views/cu/mypgmgnt/PopupItemListDefault'; // 팝업 - 장바구니 옵션
import PopupUsePlace from '@/views/cu/mypgmgnt/PopupUsePlace'; // 팝업 - 사용처
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "MyPageCouponList",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '쿠폰 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '쿠폰',
      },
    ],
  },
  components: {
    SubDefaultHeader,
    NoList,
    Footer,
    swiper,
    swiperSlide,
    PopupUnapplicableCoupon,
    PopupApplicableCoupon,
    popupOption,
    PopupUsePlace,
  },
  data() {
    return {
      totalIndex: 0,
      activeIndex: 0,
      swiperOption: {
        slidesPerView: 1.3,
        spaceBetween: 20,
        autoHeight: true,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
      },
      activeTab: 'all',
      tab: {
       all: true,
       gsfresh: false,
       dalisalda: false,
       daybreak: false,
       simplycook: false
      },
      innertab: {
        all: {
          tab1: true,
          tab2: false
        },
        // gsfresh: {
        //   tab1: true,
        //   tab2: false
        // },
        // dalisalda: {
        //   tab1: true,
        //   tab2: false
        // },
      },
      popup: { // 팝업
        open: false,
        popupUnapplicableCoupon: false, // 쿠폰 적용 불가 상품 팝업
        popupApplicableCoupon: false, // 쿠폰 적용 가능 상품 팝업
        popupOption: false, // 장바구니 옵션 팝업
        popupUsePlace: false, // 사용처 팝업
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    tabAction(type) {
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.activeTab = type;
      this.$refs.tabContents.focus();
      /* 현재 개발에 적용 된 소스 */
      // for (let i = 0; i < this.mallData.length; i++) {
      //   if (type === this.mallData[i].mallId) {
      //     this.mallData[i].isActive = true;
      //   } else {
      //     this.mallData[i].isActive = false;
      //   }
      // }
      // if (type === 'all') {
      //   this.activeTab = true;
      //   this.mbrdto.promApplVal = '';
      // } else {
      //   this.activeTab = false;
      //   this.mbrdto.promApplVal = type;
      // };
      // this.$refs.tabContents.focus();
      // this.test();
    },
    innerTabAction(innerType) {
      for (let i = 0; i < Object.keys(this.innertab[this.activeTab]).length; i++) {
        this.innertab[this.activeTab][Object.keys(this.innertab[this.activeTab])[i]] = false;
      }
      this.innertab[this.activeTab][innerType] = true;
      // this.$refs.innerTabContents.focus();
    },
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false;
    },
  },
  mounted() {

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
  }
};
</script>
