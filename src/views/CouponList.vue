<!--
views/ss/SC-FO-SS-GF-MS-701.vue
-->
<template>
  <div class="wrap-mypage coupon">
    <!-- START : Header -->
    <SubDefaultHeader headerText="쿠폰" />
    <!-- END : Header -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="wrap-input">
        <fieldset class="warp-input-txt">
          <legend>쿠폰등록</legend>
          <div class="inp-box">
            <input type="text" v-model="couponNum" class="inp-txt w100" value="" title="쿠폰등록" placeholder="쿠폰 일련번호를 입력해주세요.">
          </div>
        </fieldset>
        <button class="btn-Register" @click="regist()">등록</button>
      </div>
      <!-- START : tab -->
      <div class="wrap-searchresult tab-default">
        <ul class="scroll-area-x">
          <li>
            <button id="tab-all" aria-controls="tab-contents-all" @click="tabAction('all')" :class="{active : activeTab}">
              <strong role="heading" aria-level="2">전체</strong>
            </button>
          </li>
          <li v-for="item in this.mallData" :key="item.mallId">
            <button :id="`tab-`+item.mallId" aria-controls="tab-contents-gsfresh" @click="tabAction(item.mallId)" :class="{active : item.isActive}">
              <strong role="heading" aria-level="2">{{item.mallNm}}</strong>
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
              7일 이내 소멸 예정인 쿠폰이 <span class="point">{{couponCount.exntSchedCpnCnt}}</span>장 있습니다.
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
                <section class="section-area" v-if="useSpcPosbCpnList.length > 0">
                  <h4 class="inner-title">홍길동님 만을 위한 특별한 쿠폰</h4>
                  <div class="wrap-slide">
                    <div class="product-top-visual" ref="productVisual">
                      <button class="swiper-button-prev" aria-label="이전슬라이드"></button>
                      <button class="swiper-button-next" aria-label="다음슬라이드"></button>
                      <swiper :options="swiperOption" ref="subDetailSwiper">
                        <swiper-slide v-for="spcCpn in useSpcPosbCpnList" v-bind="spcCpn" v-bind:key="spcCpn.promId+spcCpn.promApplSeqno">
                          <!-- START : gsfresh 쿠폰 -->
                          <div class="wrap-coupon type-detail gsfresh"> <!-- gsfresh class 추가 -->
                            <div class="top-info">
                              <p class="type">{{spcCpn.promDtlTypeCdNm}}</p>
                              <p class="usedtype">{{spcCpn.promMediaNm}}</p>
                            </div>
                            <p class="title">{{spcCpn.promNm}}</p>
                            <div class="wrap-price">
                              <div class="price">{{spcCpn.cpnAmt}}<span class="unit">{{spcCpn.dcTypeCd == 'R' ? '%' : '원'}}</span></div>
                              <div class="desc">
                                <p>{{spcCpn.evntApplStandAmt}}원 이상 구매 시</p>
                                <p>최대 {{spcCpn.maxDcAmt}} {{spcCpn.dcTypeCd == 'R' ? '%' : '원'}} 할인</p>
                              </div>
                            </div>
                            <div class="date">{{spcCpn.cpnValidDurEndDt}}</div>
                            <div class="btn-area-coupon">
                              <button class="btn-coupon" aria-label="환불 처리안내 팝업 활성화" aria-haspopup="dialog" @click="popupAction('popupUsePlace', spcCpn.promId)">사용처</button>
                              <button class="btn-coupon" aria-haspopup="dialog" @click="popupAction('popupApplicableCoupon')">적용 가능 상품</button>
                              <button class="btn-coupon" v-if="false" aria-haspopup="dialog" @click="popupAction('popupUnapplicableCoupon')">적용 불가 상품</button>
                            </div>
                          </div>
                          <!-- END : gsfresh 쿠폰 -->
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
                    <NoList NoListText="사용 가능한 쿠폰이 없습니다." :ListType="'mypage-notice'" v-if="usePosbCpnList.length <= 0 "/>
                    <!-- END : 사용 가능한 쿠폰이 없을 경우 -->
                    <ul class="list-coupon" v-else>
                      <li v-for="usePosbCpn in usePosbCpnList" v-bind:key="usePosbCpn.promId+usePosbCpn.promApplSeqno">
                        <!-- START : gsfresh 쿠폰 -->
                        <div class="wrap-coupon type-list gsfresh"> <!-- gsfresh class 추가 -->
                          <div class="top-info">
                            <p class="type">{{usePosbCpn.promDtlTypeCdNm}}</p>
                          </div>
                          <div class="price">
                            {{usePosbCpn.cpnAmt}}<span class="unit">{{usePosbCpn.dcTypeCd == 'R' ? '%' : '원'}}</span>
                          </div>
                          <div class="desc">
                            <p>{{usePosbCpn.evntApplStandAmt}}원 이상 구매 시</p>
                            <p>최대 {{usePosbCpn.maxDcAmt}} {{usePosbCpn.dcTypeCd == 'R' ? '%' : '원'}} 할인</p>
                          </div>
                        </div>
                        <!-- END : gsfresh 쿠폰 -->
                        <!-- START : 쿠폰 상세 설명 -->
                        <div class="wrap-coupon-info">
                          <div class="top-info">
                            <p class="usedtype">{{usePosbCpn.promMediaNm}}</p>
                            <p class="imminent" v-if="usePosbCpn.cpnValidDiffDt <= 7">{{usePosbCpn.cpnValidDiffDt}}일 남음</p>
                          </div>
                          <p class="name">{{usePosbCpn.promNm}}</p>
                          <p class="date">{{usePosbCpn.cpnValidDurEndDt}}</p>
                          <div class="btn-area-coupon">
                            <button class="btn-coupon"  aria-label="사용처" aria-haspopup="dialog" @click="popupAction('popupUsePlace', usePosbCpn.promId)">사용처</button>
                            <button class="btn-coupon" v-if="usePosbCpn.promItemApplSpCd == '01'" aria-label="적용 가능 상품" aria-haspopup="dialog"  @click="popupAction('popupApplicableCoupon')">적용 가능 상품</button>
                            <button class="btn-coupon" v-else>적용 불가 상품</button>
                          </div>
                        </div>
                        <!-- END : 쿠폰 상세 설명 -->
                      </li>
                     </ul>
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
                    <NoList NoListText="사용한 쿠폰이 없습니다." :ListType="'mypage-notice'" v-if="usedCpnList.length <= 0"/>
                    <!-- END : 사용 가능한 쿠폰이 없을 경우 -->
                    <ul class="list-coupon" v-else>
                      <li v-for="usedCpn in usedCpnList" v-bind="usedCpn" v-bind:key="usedCpn.promId+usedCpn.promApplSeqno">
                        <!-- START : gsfresh 쿠폰 -->
                        <div class="wrap-coupon type-list gsfresh"> <!-- gsfresh class 추가 -->
                          <p class="type">{{usedCpn.promDtlTypeCdNm}}</p>
                          <div class="price">
                            {{usedCpn.cpnAmt}}<span class="unit">{{usedCpn.dcTypeCd == 'R' ? '%' : '원'}}</span>
                          </div>
                          <div class="desc">
                            <p>{{usedCpn.evntApplStandAmt}}원 이상 구매 시</p>
                            <p>최대 {{usedCpn.maxDcAmt}} {{usedCpn.dcTypeCd == 'R' ? '%' : '원'}} 할인</p>
                          </div>
                        </div>
                        <!-- END : gsfresh 쿠폰 -->
                        <!-- START : 쿠폰 상세 설명 -->
                        <div class="wrap-coupon-info">
                          <div class="top-info">
                            <p class="usedtype">{{usedCpn.promMediaNm}}</p>
                          </div>
                          <p class="name">{{usedCpn.promNm}}</p>
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
                    <!-- START : 만료된 쿠폰이 없을 경우 -->
                    <NoList NoListText="만료된 쿠폰이 없습니다." :ListType="'mypage-notice'" v-if="exprCpnList.length <= 0"/>
                    <!-- END : 만료된 쿠폰이 없을 경우 -->
                    <ul class="list-coupon" v-else>
                      <li v-for="exprCpn in exprCpnList" v-bind="exprCpn" v-bind:key="exprCpn.promId+exprCpn.promApplSeqno">
                        <!-- START : gsfresh 쿠폰 -->
                        <div class="wrap-coupon type-list gsfresh"> <!-- gsfresh class 추가 -->
                          <p class="type">{{exprCpn.promDtlTypeCdNm}}</p>
                          <div class="price">
                            {{exprCpn.cpnAmt}}<span class="unit">{{exprCpn.dcTypeCd == 'R' ? '%' : '원'}}</span>
                          </div>
                          <div class="desc">
                            <p>{{exprCpn.evntApplStandAmt}}원 이상 구매 시</p>
                            <p>최대 {{exprCpn.maxDcAmt}} {{exprCpn.dcTypeCd == 'R' ? '%' : '원'}} 할인</p>
                          </div>
                        </div>
                        <!-- END : gsfresh 쿠폰 -->
                        <!-- START : 쿠폰 상세 설명 -->
                        <div class="wrap-coupon-info">
                          <div class="top-info">
                            <p class="usedtype">{{exprCpn.promMediaNm}}</p>
                            <p class="imminent">만료</p>
                          </div>
                          <p class="name">{{exprCpn.promNm}}</p>
                          <p class="date">{{exprCpn.cpnValidDurBeginDt}} ~ {{exprCpn.cpnValidDurEndDt}}</p>
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
         </div>
        <!-- END : tab contents -->
      </div>
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <!-- START : 팝업 -->
    <popupUnapplicableCoupon @popupEvent="popupAction" v-if="this.popup.popupUnapplicableCoupon" /> <!-- 팝업 - 적용 불가 -->
    <popupApplicableCoupon @popupEvent="popupAction" v-if="this.popup.popupApplicableCoupon" :popup="popup" />
    <popupOption @popupEvent="popupAction" v-if="this.popup.popupOption" />
    <PopupUsePlace @popupEvent="popupAction" v-if="this.popup.popupUsePlace" :popup="popup"  /> <!-- 팝업 - 사용처 -->
    <!-- END : 팝업 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import NoList from '@/components/common/NoList';
import Footer from '@/components/common/Footer';
import popupApplicableCoupon from '@/views/ev/EventItemList';
import popupUnapplicableCoupon from '@/views/ev/EventUnUseItemList'; // 팝업 - 쿠폰 적용 불가 상품
import PopupUsePlace from '@/views/ev/PopupUsePlace';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ApiUtils from '@/common/ApiUtils';

export default {
  name: "MyPageCoupon",
  metaInfo: {
    title: 'GS fresh',
    titleTemplate: '쿠폰 < 마이페이지 < %s'
  },
  components: {
    SubDefaultHeader,
    NoList,
    Footer,
    swiper,
    swiperSlide,
    popupApplicableCoupon,
    popupUnapplicableCoupon,
    PopupUsePlace,
    // popupOption,
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
        promId: '',
        open: false,
        popupOption: false, // 장바구니 옵션 팝업
        popupApplicableCoupon: false, // 쿠폰 적용 가능 상품 팝업
        popupUnapplicableCoupon: false, // 쿠폰 적용 가능 상품 팝업
        popupUsePlace: false,
      },
      couponCount: {
        usePosbCpnCnt: 0,
        dwldPosbCpnCnt: 0,
        exntSchedCpnCnt: 0
      },
      usePosbCpnList: [],
      usedCpnList: [],
      exprCpnList: [],
      useSpcPosbCpnList: [],
      useMarketList: [],
      mbrdto: {
        mbrNo: 1,
        promApplVal: ''
      },
      couponCountData: [],
      usePosbCpnData: [],
      useSpcPosbCpnData: [],
      usedCpnData: [],
      exprCpnData: [],
      mallData: [
        {mallId: '10', mallNm: 'test1', isActive: false},
        {mallId: '20', mallNm: 'test2', isActive: false},
        {mallId: '30', mallNm: 'test3', isActive: false},
      ],
      couponNum: "",
    };
  },
  methods: {
    tabAction(type) {
      for (let i = 0; i < this.mallData.length; i++) {
        if (type === this.mallData[i].mallId) {
          this.mallData[i].isActive = true;
        } else {
          this.mallData[i].isActive = false;
        }
      }
      if (type === 'all') {
        this.activeTab = true;
        this.mbrdto.promApplVal = '';
      } else {
        this.activeTab = false;
        this.mbrdto.promApplVal = type;
      }
      this.$refs.tabContents.focus();
      this.couponList();
    },
    innerTabAction(innerType) {
      for (let i = 0; i < Object.keys(this.innertab).length; i++) {
        this.innertab[Object.keys(this.innertab)[i]] = false;
      }
      this.innertab[innerType] = true;
      this.$refs.innerTabContents.focus();

      // for (let i = 0; i < Object.keys(this.innertab[this.activeTab]).length; i++) {
      //   this.innertab[this.activeTab][Object.keys(this.innertab[this.activeTab])[i]] = false;
      // }
      // this.innertab[this.activeTab][innerType] = true;
      // this.$refs.innerTabContents.focus();
    },
    popupAction(type, promId) { // 팝업 활성/비활성
      this.popup.promId = promId;
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false;
    },
    async couponList() {
    // 몰 데이터 가져올것 !!!!
    // const mallData = await ApiUtils.get('/fo/ev/cpnprominq/coupon-count', this.mbrdto);
    const couponCountData1 = await ApiUtils.get('/fo/ev/cpnprominq/coupon-count', this.mbrdto);
    const usePosbCpnData1 = await ApiUtils.get('/fo/ev/cpnprommgnt/use-possible-coupon-list', this.mbrdto);
    const useSpcPosbCpnData1 = await ApiUtils.get('/fo/ev/cpnprommgnt/special-coupon-list', this.mbrdto);
    const usedCpnData1 = await ApiUtils.get('/fo/ev/cpnprommgnt/used-coupon-list', this.mbrdto);
    const exprCpnData1 = await ApiUtils.get('/fo/ev/cpnprommgnt/expire-coupon-list', this.mbrdto);
    this.couponCount = couponCountData1.data.data;
    this.usePosbCpnList = usePosbCpnData1.data.data;
    this.usedCpnList = usedCpnData1.data.data;
    this.exprCpnList = exprCpnData1.data.data;
    this.useSpcPosbCpnList = useSpcPosbCpnData1.data.data;
    },
    async regist() {
      const param = {
        mallId: this.couponNum
      };
      alert(this.couponNum);
      const res = await ApiUtils.post('/fo/ev/cpnprommgnt/coupon', param);
      try {
        if (res.status == 200) {
          alert('등록되었습니다.');
        } else {
          alert('오류가 발생했습니다.\n' + res.data);
        }
      } catch (e) {
        alert();
      }
    },
  },
  async mounted() {
    // 몰 데이터 가져올것 !!!!
    // const mallData = await ApiUtils.get('/fo/ev/cpnprominq/coupon-count', this.mbrdto);
    const couponCountData = await ApiUtils.get('/fo/ev/cpnprominq/coupon-count', this.mbrdto);
    const usePosbCpnData = await ApiUtils.get('/fo/ev/cpnprommgnt/use-possible-coupon-list', this.mbrdto);
    const useSpcPosbCpnData = await ApiUtils.get('/fo/ev/cpnprommgnt/special-coupon-list', this.mbrdto);
    const usedCpnData = await ApiUtils.get('/fo/ev/cpnprommgnt/used-coupon-list', this.mbrdto);
    const exprCpnData = await ApiUtils.get('/fo/ev/cpnprommgnt/expire-coupon-list', this.mbrdto);
    this.couponCount = couponCountData.data.data;
    this.usePosbCpnList = usePosbCpnData.data.data;
    this.usedCpnList = usedCpnData.data.data;
    this.exprCpnList = exprCpnData.data.data;
    this.useSpcPosbCpnList = useSpcPosbCpnData.data.data;
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
