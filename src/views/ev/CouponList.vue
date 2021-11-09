<!--
Design: views/ss/SC-FO-SS-GF-MS-701.vue
Pg id: PG-FO-PR-I007 (로그인 필수)
Uri: /ev/coupon_list
-->
<template>
  <div class="wrap-mypage coupon" :class="siteClass">
    <!-- START : Header -->
    <SubDefaultHeader headerText="쿠폰" :tabbar="true"/>
    <!-- END : Header -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="wrap-input">
        <fieldset class="warp-input-txt">
          <legend>쿠폰등록</legend>
          <div class="inp-box">
            <input type="text" v-model.trim="couponNum" class="inp-txt w100" title="쿠폰등록" placeholder="쿠폰 일련번호를 입력해주세요.">
          </div>
        </fieldset>
        <button class="btn-Register" @click="regist()">등록</button>
      </div>
      <div ref="tabContents" class="wrap-mypage" tabindex="0">
        <!-- START : innerTab -->
        <div class="wrap-tab">
          <div class="inner">
            <ul class="inner-tablist flex-type">
              <li :class="{active : this.innertab.tab1}">
                <button role="heading" aria-level="3" id="innertab-tab1" class="btn-border" aria-controls="innertab-contents-tab1" @click="innerTabAction('tab1')">
                  <span class="title">사용 가능한 쿠폰</span>
                  <span class="num">{{couponCount.usePosbCpnCnt}}</span>
                </button>
              </li>
              <li :class="{active : this.innertab.tab2}">
                <button role="heading" aria-level="3" id="innertab-tab2" class="btn-border" aria-controls="innertab-contents-tab2" @click="innerTabAction('tab2')">
                  <span class="title">사용/만료 쿠폰</span>
                  <span class="num">{{couponCount.dwldPosbCpnCnt}}</span>
                </button>
              </li>
            </ul>
            <p class="txt-notice" v-if="this.innertab.tab1">
              {{couponCount.exntSchedCpnDate}}일 이내 소멸 예정인 쿠폰이 <span class="point">{{couponCount.exntSchedCpnCnt}}</span>장 있습니다.
            </p>
          </div>
        </div>
        <!-- END : innerTab -->
        <!-- START : tab contents -->
        <div class="tab-content">
          <!-- START : 전체 -->
          <div id="tab-contents-all" aria-labelledby="tab-all">
            <div class="wrap-inner-tab-contents" ref="innerTabContents" tabindex="0">
              <div id="innertab-contents-tab1" class="inner-tab-contents" aria-labelledby="innertab-tab1" v-if="this.innertab.tab1">
                <!-- START : coupon slide -->
                <section class="section-area" v-show="specialCouponList.length > 0">
                  <h4 class="inner-title">{{custNm}}님 만을 위한 특별한 쿠폰</h4>
                  <div class="wrap-slide">
                    <div class="product-top-visual" ref="productVisual">
                      <div class="swiper-button-prev" aria-label="이전슬라이드" slot="button-prev" ref="subDetailSwiperPrev" role="button"></div>
                      <div class="swiper-button-next" aria-label="다음슬라이드" slot="button-next" ref="subDetailSwiperNext" role="button"></div>
                      <swiper :options="swiperOption" ref="subDetailSwiper">
                        <swiper-slide v-for="(specialCouponData,index) in specialCouponList" v-bind="specialCouponData" v-bind:key="specialCouponData.promId+specialCouponData.cpnIsseSeqno" v-show="index<10">
                          <!-- START : gsfresh 쿠폰 -->
                          <div class="slide-coupon" > <!-- gsfresh class 추가 -->
                            <div class="title">{{specialCouponData.promNm}}</div>
                            <div class="wrap-coupon type-detail">
                              <span class="badge day" v-if="specialCouponData.cpnValidDiffDt <= 7">D-{{specialCouponData.cpnValidDiffDt}}</span>
                              <div>
                              <p class="type" v-if="specialCouponData.promDtlTypeCd != '304'">{{specialCouponData.promDtlTypeCdNm}}</p>
                              <p class="type" v-else>배송비</p>
                              <div class="price" v-if="specialCouponData.dcTypeCd != 'Z' ">{{comma(specialCouponData.cpnAmt)}}<span class="unit">{{specialCouponData.dcTypeCd == 'R' ? '%' : '원'}}</span></div>
                              <div class="text" v-else>무료배송</div>
                              </div>
                            </div>
                            <div>
                              <p class="usedtype">
                                <span>{{replaceMallNm(specialCouponData.mallNm)}}</span>
                              </p>
                            </div>
                            <ul class="list-info" > <!-- [202017P] MarketFor 0원일 경우에 빈값으로 나오는 부분 수정 -->
                              <li class="list-bar color-gray"><template>{{comma(specialCouponData.evntApplStandAmt)}}원 이상 구매 시 </template><template  v-if="specialCouponData.maxDcAmt > 0">최대 {{comma(specialCouponData.maxDcAmt)}} 원 할인</template></li>
                              <li class="list-bar color-gray">{{getDate(specialCouponData.cpnValidDurEndDttm, 'YYYY.MM.DD HH:mm')}} 까지</li>
                            </ul>
                            <div class="btn-area-coupon" v-if="specialCouponData.promDtlTypeCd != '304'">
                              <button class="btn-coupon bg-line-brush gray" v-if="specialCouponData.promItemApplSpCd != '02' && specialCouponData.mallCnt != '0'" aria-haspopup="dialog" @click="popupAction('popupApplicableCoupon',specialCouponData.promId)"><strong>적용 가능 상품</strong></button>
                              <button class="btn-coupon bg-line-brush gray" v-if="specialCouponData.promItemApplSpCd == '02'" @click="popupAction2('popupUnapplicableCoupon',specialCouponData.promId ,specialCouponData.promDtlTypeCd)"><strong>적용 불가 상품</strong></button>
                            </div>
                          </div>
                          <!-- END : gsfresh 쿠폰 -->
                        </swiper-slide>
                      </swiper>
                      <div class="swiper-pagination" ref="subDetailSwiperPagination" slot="pagination" v-show="specialCouponList.length > 1"></div><!-- 4월 수정 START : 슬라이드 수정 -->
                    </div>
                  </div>
                </section>
                <!-- END : coupon slide -->
                <!-- START : 쿠폰 목록 -->
                <section class="section-area">
                  <div class="inner-coupon">
                    <!-- START : 사용 가능한 쿠폰이 없을 경우 -->
                    <NoList NoListText="사용 가능한 쿠폰이 없습니다." :ListType="'mypage-notice'" v-if="isLoaded.coupon && couponList.length <= 0 "/>
                    <!-- END : 사용 가능한 쿠폰이 없을 경우 -->
                    <ul class="list-coupon" v-else>
                      <li v-for="(couponData,index) in couponList" v-bind:key="couponData.promId+couponData.cpnIsseSeqno" v-show="pageCtn.listCnt > index">
                        <!-- START : gsfresh 쿠폰 -->
                        <div class="coupon-area">
                          <div class="wrap-coupon type-list"> <!-- gsfresh class 추가 -->
                          <div>
                            <p class="type" v-if="couponData.promDtlTypeCd != '304'">{{couponData.promDtlTypeCdNm}}</p>
                            <p class="type" v-else>배송비</p>
                            <p class="price" v-if="couponData.dcTypeCd != 'Z' ">
                              {{comma(couponData.cpnAmt)}}<span class="unit">{{couponData.dcTypeCd == 'R' ? '%' : '원'}}</span>
                            </p>
                            <p class="text" v-else>무료배송</p>
                          </div>
                          </div>
                          <!-- END : gsfresh 쿠폰 -->
                          <!-- START : 쿠폰 상세 설명 -->
                          <div class="wrap-coupon-info">
                            <div class="title">{{couponData.promNm}}</div>  <!-- [202017P] MarketFor 0원일 경우에 빈값으로 나오는 부분 수정 -->
                            <p class="desc"><template>{{comma(couponData.evntApplStandAmt)}}원 이상 구매 시 </template> <template v-if="couponData.maxDcAmt > 0">최대 {{comma(couponData.maxDcAmt)}} 원 할인</template></p>
                            <!-- <p class="desc" v-if="couponData.maxDcAmt > 0"></p> -->
                            <div class="day-info">
                              <span class="date">{{getDate(couponData.cpnValidDurEndDttm, 'YYYY.MM.DD HH:mm')}} 까지</span>
                              <span class="badge day" v-if="couponData.cpnValidDiffDt <= 7">D-{{couponData.cpnValidDiffDt}}</span>
                            </div>
                          </div>
                        </div>
                        <div class="btn-area-coupon">
                          <p class="usedtype">
                            <span>{{replaceMallNm(couponData.mallNm)}}</span>
                          </p>
                        </div>
                        <div v-if="couponData.promDtlTypeCd != '304'">
                        <button class="btn-coupon bg-line-brush gray" v-if="couponData.promItemApplSpCd != '02' && couponData.mallCnt != '0'" aria-label="적용 가능 상품" aria-haspopup="dialog"  @click="popupAction('popupApplicableCoupon',couponData.promId)"><strong>적용 가능 상품</strong></button>
                        <button class="btn-coupon bg-line-brush gray" v-if="couponData.promItemApplSpCd == '02'" @click="popupAction2('popupUnapplicableCoupon',couponData.promId, couponData.promDtlTypeCd)"><strong>적용 불가 상품</strong></button>
                        </div><!-- END : 쿠폰 상세 설명 -->
                      </li>
                     </ul>
                     <div class="btn-more-detail-view" v-if="couponList.length > pageChk('listCnt')"><!-- 4월 수정 : 더보기 버튼 추가 class명 변경 -->
                      <button class = "btn-border" aria-label="쿠폰더보기">
                        <span aria-live="assertive" aria-atomic="true" @click="pagePlus('listCnt')">더보기</span>
                      </button>
                    </div>
                  </div>
                </section>
                <!-- END : 쿠폰 목록 -->
              </div>
              <div id="innertab-contents-tab2" class="inner-tab-contents" aria-labelledby="innertab-tab2" v-if="this.innertab.tab2">
                <!-- START : 사용한 쿠폰 목록 -->
                <section class="section-area">
                  <h4 class="inner-title">사용한 쿠폰</h4>
                  <div class="inner-coupon">
                    <!-- START : 사용 가능한 쿠폰이 없을 경우 -->
                    <NoList NoListText="사용한 쿠폰이 없습니다." :ListType="'mypage-notice'" v-if="isLoaded.used && usedCouponList.totalCnt <= 0"/>
                    <!-- END : 사용 가능한 쿠폰이 없을 경우 -->
                    <ul class="list-coupon" v-else>
                      <li v-for="(usedCouponData,index) in usedCouponList.couponList" v-bind="usedCouponData" v-bind:key="index" v-show="pageCtn.usedCnt > index">
                        <!-- START : gsfresh 쿠폰 -->
                        <div class="coupon-area">
                          <div class="wrap-coupon type-list"> <!-- gsfresh class 추가 -->
                          <div>
                            <p class="type" v-if="usedCouponData.promDtlTypeCd != '304'">{{usedCouponData.promDtlTypeCdNm}}</p>
                            <p class="type" v-else>배송비</p>
                            <p class="price" v-if="usedCouponData.dcTypeCd != 'Z' ">
                              {{comma(usedCouponData.cpnAmt)}}<span class="unit">{{usedCouponData.dcTypeCd == 'R' ? '%' : '원'}}</span>
                            </p>
                            <p class="text" v-else>무료배송</p>
                          </div>
                          </div>
                          <!-- END : gsfresh 쿠폰 -->
                          <!-- START : 쿠폰 상세 설명 -->
                          <div class="wrap-coupon-info">
                            <div class="title">{{usedCouponData.promNm}}</div>  <!-- [202017P] MarketFor 0원일 경우에 빈값으로 나오는 부분 수정 -->
                            <p class="desc"><template>{{comma(usedCouponData.evntApplStandAmt)}}원 이상 구매 시 </template><template v-if="usedCouponData.maxDcAmt > 0">최대 {{comma(usedCouponData.maxDcAmt)}} 원 할인</template></p>
                            <!-- <p class="desc" v-if="usedCouponData.maxDcAmt > 0"></p> -->
                            <div class="day-info">
                              <span class="date"><span>사용일시 : {{getDate(usedCouponData.useDttm, 'YYYY.MM.DD HH:MM')}}</span></span>
                            </div>
                          </div>
                        </div>
                        <!-- END : 쿠폰 상세 설명 -->
                      </li>
                    </ul>
                    <div class="btn-more-detail-view" v-if="usedCouponList.couponList.length > pageChk('usedCnt')"><!-- 4월 수정 : 더보기 버튼 추가 class명 변경 -->
                      <button class = "btn-border" aria-label="쿠폰더보기">
                        <span aria-live="assertive" aria-atomic="true" @click="pagePlus('usedCnt')">더보기</span>
                      </button>
                    </div>
                  </div>
                </section>
                <!-- END : 사용한 쿠폰 목록 -->
                <!-- START : 만료된 쿠폰 목록 -->
                <section class="section-area">
                  <h4 class="inner-title">만료된 쿠폰</h4>
                  <div class="inner-coupon">
                    <!-- START : 만료된 쿠폰이 없을 경우 -->
                    <NoList NoListText="만료된 쿠폰이 없습니다." :ListType="'mypage-notice'" v-if="isLoaded.expire && expireCouponList.totalCnt <= 0"/>
                    <!-- END : 만료된 쿠폰이 없을 경우 -->
                    <ul class="list-coupon" v-else>
                      <li v-for="(expireCouponData,index) in expireCouponList.couponList" v-bind="expireCouponData" v-bind:key="index" v-show="pageCtn.expireCnt > index">
                        <!-- START : gsfresh 쿠폰 -->
                        <div class="coupon-area">
                          <div class="wrap-coupon type-list"> <!-- gsfresh class 추가 -->
                          <div>
                            <p class="type" v-if="expireCouponData.promDtlTypeCd != '304'">{{expireCouponData.promDtlTypeCdNm}}</p>
                            <p class="type" v-else>배송비</p>
                            <p class="price" v-if="expireCouponData.dcTypeCd != 'Z' ">
                              {{comma(expireCouponData.cpnAmt)}}<span class="unit">{{expireCouponData.dcTypeCd == 'R' ? '%' : '원'}}</span>
                            </p>
                            <p class="text" v-else>무료배송</p>
                          </div>
                          </div>
                          <!-- END : gsfresh 쿠폰 -->
                          <!-- START : 쿠폰 상세 설명 -->
                          <div class="wrap-coupon-info">
                            <div class="title">{{expireCouponData.promNm}}</div>  <!-- [202017P] MarketFor 0원일 경우에 빈값으로 나오는 부분 수정 -->
                            <p class="desc"><template>{{comma(expireCouponData.evntApplStandAmt)}}원 이상 구매 시 </template><template v-if="expireCouponData.maxDcAmt > 0">최대 {{comma(expireCouponData.maxDcAmt)}} 원 할인</template></p>
                            <!-- <p class="desc" v-if="expireCouponData.maxDcAmt > 0"></p> -->
                            <div class="day-info">
                              <span class="date"><span>~ {{getDate(expireCouponData.cpnValidDurEndDttm, 'YYYY.MM.DD HH:mm')}}</span> 만료</span>
                            </div>
                          </div>
                        </div>
                        <!-- END : 쿠폰 상세 설명 -->
                      </li>
                    </ul>
                    <div class="btn-more-detail-view" v-if="expireCouponList.couponList.length > pageChk('expireCnt')"><!-- 4월 수정 : 더보기 버튼 추가 class명 변경 -->
                      <button class = "btn-border" aria-label="쿠폰더보기">
                        <span aria-live="assertive" aria-atomic="true" @click="pagePlus('expireCnt')">더보기</span>
                      </button>
                    </div>
                  </div>
                </section>
                <!-- END : 만료된 쿠폰 목록 -->
              </div>
            </div>
          </div>
          <!-- END : 전체 -->
         </div>
        <!-- END : tab contents -->
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer/>
    <!-- END : 푸터 -->
    <!-- START : 팝업 -->
    <popupApplicableCoupon @popupEvent="popupAction" v-if="this.popup.popupApplicableCoupon" :popup="popup" />
    <PopupUnapplicableCoupon @popupEvent="popupAction2" v-if="this.popup.popupUnapplicableCoupon" :popup="popup" /> <!-- 팝업 - 적용 불가 -->
    <popupOption @popupEvent="popupAction" v-if="this.popup.popupOption" />
    <PopupUsePlace @popupEvent="popupAction" v-if="this.popup.popupUsePlace" :popup="popup" /> <!-- 팝업 - 사용처 -->
    <PopupAppPushAgree @popupEvent="popupAction" v-if="this.popup.pushAgreeOpenYn" /> <!-- 팝업 - APP PUSH 광고성동의 팝업 -->
    <!-- END : 팝업 -->
    <Loading v-show="loading > 0" />
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import NoList from '@/components/common/NoList';
import Footer from '@/components/common/Footer';
import popupApplicableCoupon from '@/views/ev/EventItemList';
import PopupUnapplicableCoupon from '@/views/ev/EventUnUseItemList';
import PopupUsePlace from '@/views/ev/PopupUsePlace';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
import SlideControlMixin from '@/mixins/SlideControlMixin'; // 4월 수정 : 슬라이드 수정
import Loading from '@/components/common/Loading';
import PopupAppPushAgree from '@/components/common/PopupAppPushAgree';

export default {
  name: "MyPageCoupon",
  metaInfo() {
    return {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '쿠폰 목록 < 나의 혜택 < 마이페이지 < %s',
      meta: [
        {
          property: 'aa:page',
          content: '쿠폰',
        },
      ],
    };
  },
  mixins: [SlideControlMixin],
  components: {
    SubDefaultHeader,
    NoList,
    Footer,
    swiper,
    swiperSlide,
    popupApplicableCoupon,
    PopupUnapplicableCoupon,
    PopupUsePlace,
    Loading,
    PopupAppPushAgree,
  },
  data() {
    return {
      isLoaded: {
        coupon: false,
        used: false,
        expire: false,
      },
      desabledRegist: true,
      totalIndex: 0,
      activeIndex: 0,
      swiperOption: {
        slidesPerView: 1.5,
        spaceBetween: 20,
        autoHeight: true,
        centeredSlides: true,
      },
      activeTab: true,
      tab: {
       all: true,
       gsfresh: false,
       dalisalda: false,
       daybreak: false,
       simplycook: false
      },
      innertab: {
        tab1: true,
        tab2: false,
      },
      popup: { // 팝업
        promId: '',
        promDtlTypeCd: '',
        open: false,
        popupOption: false, // 장바구니 옵션 팝업
        popupApplicableCoupon: false, // 쿠폰 적용 가능 상품 팝업
        popupUnapplicableCoupon: false, // 쿠폰 적용 가능 상품 팝업
        popupUsePlace: false,
        pushAgreeOpenYn: false, // APP PUSH 광고성동의 팝업
      },
      couponCount: {
        usePosbCpnCnt: 0,
        dwldPosbCpnCnt: 0,
        exntSchedCpnCnt: 0
      },
      couponList: [],
      usedCouponList: [],
      expireCouponList: [],
      specialCouponList: [],
      useMarketList: [],
      mbrdto: {
        promApplVal: '',
        // [202017P] 2020.11.27 사용가능쿠폰목록조회 Market For 커머스사이트Id 추가-시작
        cmmSteId: CookieUtils.getCmmSteId()
        // [202017P] 2020.11.27 사용가능쿠폰목록조회 Market For 커머스사이트Id 추가-종료
      },
      couponCountData: [],
      usePosbCpnData: [],
      useSpcPosbCpnData: [],
      usedCpnData: [],
      exprCpnData: [],
      mallData: [],
      couponNum: "",
      pageCtn: {
        listCnt: 6,
        usedCnt: 6,
        expireCnt: 6
      },
      custNm: CookieUtils.getCookie("CUST_NM"),
      info: '',
      siteClass: '',
      params: {
        itemList: [
          { itemId: "1400000061643", storId: "1043", supplFirmCd: "31004" },
          { itemId: "1500000207669", storId: "1043", supplFirmCd: "31004" },
          { itemId: "2700038823319", storId: "422", supplFirmCd: "12038" }
        ]
      },
      loading: 0,
    };
  },
  methods: {
    comma: function(val) {
      return NumberUtils.toComma(val);
    },
    getDate (date, format) {
      return DateUtils.format(date, format);
    },
    tabAction(type) {
      if (type === 'all') {
        this.activeTab = true;
        this.mbrdto.promApplVal = '';
      } else {
        this.activeTab = false;
        this.mbrdto.promApplVal = type;
      }
      this.retrievelist();
    },
    innerTabAction(innerType) {
      for (let i = 0; i < Object.keys(this.innertab).length; i++) {
        this.innertab[Object.keys(this.innertab)[i]] = false;
      }
      this.innertab[innerType] = true;
      if (this.innertab.tab1) {
        this.$nextTick(() => {
          if (this.$refs.subDetailSwiper) {
            this.slideNextPrevButton('subDetailSwiper', true);
          }
        });
      }
    },
    popupAction(type, promId) { // 팝업 활성/비활성
      this.popup.promId = promId;
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false;
      // [202017P] 2020.11.27 Market For 커머스사이트Id 추가-시작
      this.popup.cmmSteId = CookieUtils.getCmmSteId();
      // [202017P] 2020.11.27 Market For 커머스사이트Id 추가-종료
    },
    popupAction2(type, promId, promDtlTypeCd) { // 팝업 활성/비활성
      this.popup.promId = promId;
      this.popup.promDtlTypeCd = promDtlTypeCd;
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false;
      // [202017P] 2020.11.27 Market For 커머스사이트Id 추가-시작
      this.popup.cmmSteId = CookieUtils.getCmmSteId();
      // [202017P] 2020.11.27 Market For 커머스사이트Id 추가-종료
    },
    retrievelist() {
      // 몰 데이터 가져올것 !!!!
      this.loading++;
      ApiUtils.get('/fo/ev/common/mall-list')
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          this.mallData = res.data.data;
          for (let i = 0; i < this.mallData.length; i++) {
            if (this.mbrdto.promApplVal === this.mallData[i].mallId) {
              this.mallData[i].isActive = true;
            } else {
              this.mallData[i].isActive = false;
            }
          }
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      }).finally(() => {
        this.loading--;
      });
      this.loading++;
      ApiUtils.get('/fo/ev/cpnprominq/coupon-count', this.mbrdto)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          this.couponCount = res.data.data;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      }).finally(() => {
        this.loading--;
      });
      this.loading++;
      ApiUtils.get('/fo/ev/cpnprommgnt/use-possible-coupon-list', this.mbrdto)
      .then(res => {
        this.isLoaded.coupon = true;
        if (res.data && res.data.success && res.data.data) {
          this.couponList = res.data.data;
          // this.pageCtn.listCnt = this.couponList.length;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      }).finally(() => {
        this.loading--;
      });
      this.loading++;
      ApiUtils.get('/fo/ev/cpnprommgnt/special-coupon-list', this.mbrdto)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          this.specialCouponList = res.data.data;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      }).finally(() => {
        this.loading--;
      });
      this.loading++;
      ApiUtils.get('/fo/ev/cpnprommgnt/used-coupon-list', this.mbrdto)
      .then(res => {
        this.isLoaded.used = true;
        if (res.data && res.data.success && res.data.data) {
          this.usedCouponList = res.data.data;
          // this.pageCtn.usedCnt = this.usedCouponList.totalCnt;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      }).finally(() => {
        this.loading--;
      });
      this.loading++;
      ApiUtils.get('/fo/ev/cpnprommgnt/expire-coupon-list', this.mbrdto)
      .then(res => {
        this.isLoaded.expire = true;
        if (res.data && res.data.success && res.data.data) {
          this.expireCouponList = res.data.data;
          // this.pageCtn.expireCnt = this.expireCouponList.totalCnt;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      }).finally(() => {
        this.loading--;
      });
    },
    async regist() {
      if (!this.desabledRegist) {
        return;
      }
      this.desabledRegist = false;
      const param = {
        rndnoNo: this.couponNum
      };
      if (param.rndnoNo == null || param.rndnoNo=="") {
        this.$gsdialog.alert("쿠폰 일련번호를 입력해주세요.");
        this.desabledRegist = true;
        return;
      }
      this.loading++;
      await ApiUtils.post('/fo/ev/cpnprommgnt/coupon', param)
      .then(res => {
        if (res.data && res.data.success) {
          this.$gsdialog.alert(res.data.statusMessage).then(dialog => {
          this.desabledRegist = true;
          location.reload(); // [202017P] 2021.02.19 Market For 쿠폰 등록-> 확인 버튼 클릭 시 reload 되도록 수정.
         });
          // location.reload();
        } else {
          this.$gsdialog.alert(res.data.data.errorMsg);
          this.desabledRegist = true;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      }).finally(() => {
        this.loading--;
      });
    },
    pagePlus(page) {
      this.pageCtn[`${page}`] = this.pageCtn[`${page}`] + 6;
    },
    pageChk(page) {
      console.log(page+"=>"+this.pageCtn[`${page}`]);
      return this.pageCtn[`${page}`];
    },
    replaceMallNm(data) {
      return data.replace(/,/gi, ' · ');
    }
  },
  computed: {
    // 4월수정 : 슬라이드 수정
    swiper() {
      return this.$refs.subDetailSwiper.swiper;
    }
  },
  mounted() {
    this.siteClass = CookieUtils.getSiteClass();
    this.retrievelist();
    this.slideNextPrevButton('subDetailSwiper', true);
    if ( CookieUtils.getCookie('MbrJoinTodayYn') == 'N' && CookieUtils.getCookie('PushAgreeOpenYn') == 'Y' && CookieUtils.getCmmSteId() == '1') {
      this.popup.pushAgreeOpenYn = true;
    }
    // const itemList = [
    //       { itemId: "1400000061643", storId: "1043", supplFirmCd: "31004" },
    //       { itemId: "1500000207669", storId: "1043", supplFirmCd: "31004" },
    //       { itemId: "2700038823319", storId: "422", supplFirmCd: "12038" },
    //       { itemId: "1500000213960", storId: "461", supplFirmCd: "12054" },
    //       { itemId: "1400000061870", storId: "418", supplFirmCd: "12036" },
    //     ];

    // await ApiUtils.put('/fo/ev/cpnprommgnt/coupon-apply-possible-often-purchase-item-information-new', itemList)
      this.loading++;
    ApiUtils.get('/fo/ev/cpnprommgnt/coupon-apply-possible-often-purchase-item-information')
    .then(res => {
      if (res.data && res.data.success && res.data.data) {
        const data = res.data.data;
        console.log("상품쿠폰{}", data);
        if (data.item_id != null && data.item_id != "") {
          this.$store.commit('setCouponInfo', res.data.data);
        } else {
          this.$store.dispatch('getCardApplCpnInfo');
        }
      }
    })
    .catch(e => {
      // this.$gsdialog.alert(e.response.data.statusMessage);
    }).finally(() => {
      this.loading--;
    });
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
    }
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
