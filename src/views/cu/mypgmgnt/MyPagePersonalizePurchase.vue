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
        <!-- 8월 수정 START : 개발요청 -->
        <div class="wrap-personalize-filter">
          <div class="flex-type wrap-btn" aria-label="자주 구매한 상품 조회 기간 선택">
             <button type="button" :id="'between'+index" v-for="(month, index) in months" :key="month" class="btn-border"  @click="activeMonth(index)" aria-live="assertive" aria-atomic="true">{{month}}</button>
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
              <button class="btn-md btn-bg darkgray" @click="search()">조회</button>
            </fieldset>
          </div>
          <!-- 4월 수정 END : 기간조회 추가 -->
          <div class="personalize-filter-check">
            <div class="filter-input-check">
              <span class="inp-chk small">
                <input type="checkbox" name="" id="all-check" value=""  @click="getAll()">
                <label for="all-check">전체</label>
              </span>
              <span class="inp-chk small">
                <input type="checkbox" name="" id="soldout-check" value="" @click="getOfsExcld()">
                <label for="soldout-check">품절상품제외</label>
              </span>
              <button class="btn-border btn-xs position-right" aria-label="선택 한 자주 구매 상품" @click="inBasket">담기</button>
            </div>
          </div>
        </div>
        <!-- 8월 수정 END : 개발요청 -->
        <div class="tab-content">
          <div id="tab-contents-all" aria-labelledby="tab-all" v-if="purchaseItemLists.length > 0">
            <h2 class="hidden">전체</h2>
            <div class="wrap-personalize-list"
               v-for="(purchaseItemList, index) in purchaseItemLists"
              v-bind:key="index"
              v-bind:purchaseItemList="purchaseItemList"
            >
              <div class="wrap-personalize-item-option">
                <div class="item-option-top">
                  <p class="wrap-chk">
                    <span class="inp-chk">
                      <input type="checkbox" name="" aria-label="자주 구매 상품 선택" :id="'item-check' + index" value="">
                      <label v-bind:for="'item-check' + index" class="hidden">서울 목장의 신선함이 살아있는 저지방 우유 1L</label>
                      <!-- !! label 값 아래 자주 구매 상품명이 들어가야 함 -->
                    </span>
                    <span aria-label="몰 이름">GS 프레시몰</span>
                  </p>
                  <p>
                    <span aria-label="상품 구매 횟수">{{purchaseItemList.psnAnalCnt}}번 구매</span>
                    <span>최종구매일 : {{purchaseItemList.analDt}}</span>
                  </p>
                </div>
              </div>
              <div class="wrap-product-image">
                <div class="product-item image">
                  <span class="wrap-product-personal-tag">
                    <span class="product-personal-tag">자주구매</span>
                  </span>
                  <ProductImage05 @popupEvent="popupAction"
                                   :itemValue="purchaseItemList"
                                      @goCart="goCart"
                                    @goDcInfo="goDcInfo"
                                     :daliProduct="purchaseItemList.mallId == '11' ? true : false"
                    />
                  <dl class="product-item-option">
                    <!--
                    <dt>옵션 :</dt>
                    <dd>옵션상품명이 노출됩니다.</dd>
                    <dt>수량 :</dt>
                    <dd>3개</dd>
                    -->
                  </dl>
                </div>
                <div class="product-item image">
                  <span class="wrap-product-personal-tag">
                    <span class="product-personal-tag">추천상품</span>
                  </span>
                  <NoList NoListText="추천 상품이 없습니다." :ListType="'mypage-itemlist'" v-if="recommentItemLists[index].rcmYn == 'N'"/>
                 <ProductImage05 @popupEvent="popupAction"
                                   :itemValue="recommentItemLists[index]"
                                      @goCart="goCart"
                                    @goDcInfo="goDcInfo"
                                    v-else
                    />
                    <!--:daliProduct="recommentItemLists[purchaseItemList.rowSeq].mallId == '11' ? true : false"-->
                   <!--
                  <dl class="product-item-option" v-if="false">
                    <dt>옵션 :</dt>
                    <dd>옵션상품명이 노출됩니다.</dd>
                    <dt>수량 :</dt>
                    <dd>3개</dd>
                  </dl>
                  -->
                </div>
              </div>
            </div>
 <!--           <div class="wrap-banner">
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
-->
          </div>
           <NoList NoListText="자주 구매한 상품이 없습니다." :ListType="'mypage-itemlist'" v-if="purchaseItemLists.length == 0"/>
          <div class="wrap-mypage-item-list" v-if="purchaseItemLists.length == 0">
              <h3>추천상품</h3>
              <div class="" v-if="bigSaleList.length > 1">
                <h4>위대한 빅세일</h4>
                <div class="wrap-product-list">
                  <ProductList02 @popupEvent="popupAction"
                                v-for="bigSale in bigSaleList"
                                v-bind:key="bigSale.itmcSeqno"
                                v-bind:bigSale="bigSale"
                                :itemValue="bigSale"
                                @goCart="goCart"
                                @goDcInfo="goDcInfo"
                                 :daliProduct="bigSale.mallId == '11' ? true : false"
                                /> <!-- 2개 -->
                </div>
              </div>
              <div class="" v-if="newItemViewList.length > 1">
                <h4>신상품</h4>
                <div class="wrap-product-list">
                    <ProductList02 @popupEvent="popupAction"
                                    v-for="newItemView in newItemViewList"
                                    v-bind:key="newItemView.itmcSeqno"
                                    v-bind:newItemView="newItemView"
                                    :itemValue="newItemView"
                                    @goCart="goCart"
                                    @goDcInfo="goDcInfo"
                                    :daliProduct="newItemView.mallId === '11' ? true : false"
                                    />
                </div>
              </div>
              <div class="" v-if="oneMoreItemList.length > 1">
                <h4>1+1</h4>
                <div class="wrap-product-list">
                  <ProductList02 @popupEvent="popupAction"
                              v-for="oneMoreItem in oneMoreItemList"
                              v-bind:key="oneMoreItem.itmcSeqno"
                              v-bind:oneMoreItem="oneMoreItem"
                              :itemValue="oneMoreItem"
                              @goCart="goCart"
                              @goDcInfo="goDcInfo"
                              :daliProduct="oneMoreItem.mallId === '11' ? true : false"
                              />
                </div>
              </div>
            </div>
          <!-- END : 심플리쿡 -->
        </div>
        <!-- END : 탭 콘텐츠 -->
      </div>
       <Loading v-show="loading" />
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <!-- START : 팝업 -->
    <!--
    <popupOption @popupEvent="popupAction" v-if="this.popup.popupOption" />
    <PopupDiscountInfo @popupEvent="popupAction" v-if="this.popup.popupSales" />
    -->
    <PopupOptionArea v-bind:dispType="'DP'" ref="optionArea"/>
     <PopupDiscountInfo
      @popupEvent="popupAction"
      v-if="popup.popupSales"
      v-bind:dcSateInfo="dcSateInfo"
    />
    <!-- END : 팝업 -->
    <!-- 4월 수정 START : 팝업 추가 -->
    <PopupPeriodCalendar :type="period.selected.type" :initDate="period.selected.changingDate" @calendarChange="calendarChange" @popupEvent="popupAction" v-if="popup.popupPeriodCalendar"/> <!-- 팝업 - 기간조회 -->
    <!-- 4월 수정 END : 팝업 추가 -->
    <Loading v-show="loading > 0" />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/header/Header5'; // from '@/components/common/SubDefaultHeader';
import NoList from '@/components/common/NoList';
import ProductImage05 from '@/components/productTemplete/ProductImage05'; // 이미지 일반형5
import ProductList02 from '@/components/productTemplete/ProductList02'; // 리스트 일반형2
import PopupDiscountInfo from '@/components/product/PopupDiscountInfo'; // 팝업 - 할인내역
// import popupOption from '@/views/md/SC-FO-MD-GF-MP-001'; // 팝업 - 장바구니 옵션
import PopupOptionArea from '@/views/md/OptionArea';
// import { VueTypedJs } from 'vue-typed-js';
import Footer from '@/components/common/Footer';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
// 4월 수정 START : 팝업 - 기간조회 추가
import PopupPeriodCalendar from '@/views/ss/PopupPeriodCalendar'; // from '@/views/ss/SC-FO-SS-GF-MP-871';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import Loading from '@/components/common/Loading';
import ItemTemplete from '@/common/ItemTemplete';
// 4월 수정 END : 팝업 - 기간조회 추가

export default {
  name: "MyPagePersonalizePurchase",
  metaInfo: {
    title: 'GS 프레시몰',
    titleTemplate: '자주 구매한 상품 < 마이페이지 < %s',
    meta: [ // 앱 트래커 메타정보 // 입고알림트캐러, 개발 진행 후 작업필요
      {
        property: 'aa:page',
        content: '자주 구매한 상품'
      }
    ],
  },
  components: {
    SubDefaultHeader,
    PopupDiscountInfo,
    PopupOptionArea,
    NoList,
   // VueTypedJs,
    ProductImage05,
    ProductList02,
    Footer,
    // 4월 수정 START : 팝업 - 기간조회 추가
    PopupPeriodCalendar,
    // 4월 수정 END : 팝업 - 기간조회 추가
    Loading,
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
      purchaseItemFresh: [],
      purchaseItemDali: [],
      purchaseItemSymple: [],
      recommentItemLists: [],
      realBasketCnt: 0,
      active: 0,
      months: ['15일', '1개월', '3개월', '6개월'],
      selectedMonths: '15일', // default = 15일
      tabDiv: 'all',
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
      moreData: true,
      loading: false,
      count: 0,
      pageNo: 0,
      pageSize: 10,
      pageSizeGap: 0,
      totCount: 0,
      PAGE_SIZE: 10,
      cartParams: {
        itemId: this.$route.query.itemId,
        mallId: this.$route.query.mallId,
        storId: this.$route.query.storId,
        supplFirmCd: this.$route.query.supplFirmCd,
      },
      dcSateInfo: {}, // 할인정보
      ccnt: 0,
      cookieInfo: {},
      oneMoreItemList: [],
      newItemViewList: [],
      bigSaleList: [],
      siteClass: '',
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
      this.tabDiv = type;
      this.pageNo = 0;
      this.pageSize = this.PAGE_SIZE;
      this.moreData = true;
      this.loading = false;
      // this.$refs.tabContents.focus(); 5월 수정 삭제
      this.getPurchaseItem(DateUtils.format(this.period.start.date, 'YYYYMMDD'),
                            DateUtils.format(this.period.end.date, 'YYYYMMDD'),
                            0,
                            this.pageSize
                            );
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
    goCart(itemValue) { // 장바구니 외부호출 샘플
      this.cartParams.itemId = itemValue.itemId;
      this.cartParams.storId = itemValue.storId;
      this.cartParams.supplFirmCd = itemValue.supplFirmCd;
      this.$refs.optionArea.getOrder(this.cartParams);
    },
    goDcInfo(itemValue) {
      // 할인내역팝업 외부호출 샘플
    //  this.dcSateInfo = itemValue;
    //  itemValue.itemDcrt = this.getDcRate(itemValue.bfrSellAmt, itemValue.sellAmt);
    //  itemValue.dcAmt = itemValue.sellAmt;
      this.dcSateInfo.itemId = itemValue.itemId;
      this.dcSateInfo.storId = itemValue.storId;
      this.dcSateInfo.supplFirmCd = itemValue.supplFirmCd;
      this.dcSateInfo.mallId = itemValue.mallId;
      if (itemValue.ssevntId ) {
        this.dcSateInfo.ssevntId = itemValue.ssevntId;
        this.dcSateInfo.ssevntTimes = itemValue.ssevntTimes;
      } else {
        this.dcSateInfo.ssevntId = itemValue.ssevntId;
        this.dcSateInfo.ssevntTimes = itemValue.ssevntTimes;
      }
      // 달리살다인경우 cmmSteId = '2'
      this.dcSateInfo.cmmSteId = itemValue.mallId === '11'?'2':'1';
      this.popupAction('popupSales');
    },
    getDcRate(bfrSellAmt, sellAmt) {
      return ItemTemplete.getDcRate(bfrSellAmt, sellAmt);
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
    getPurchaseItem: async function(startDt, endDt, pgNo, pgSize) {
      const PsnRcmdInputDto = {
        startDt: DateUtils.format(startDt, 'YYYYMMDD'), // "20200101",
        endDt: DateUtils.format(endDt, 'YYYYMMDD'), // "20200810",
        mallId: this.tabDiv === 'gsfresh' ? '1' : this.tabDiv === 'dalisalda' ? '11' : this.tabDiv === 'simplycook' ? '20' : '',
        soldOutExcludeYn: this.ofsExcld,
        offset: pgNo,
        limit: pgSize, // pgSize,
      };
      console.log("+PsnRcmdInputDto+"+JSON.stringify(PsnRcmdInputDto));
      // console.log(JSON.stringify(MbrInqItemListInqInputDto ));
      const resultList = await ApiUtils.post('/fo/od/rcmd/purchase-frequency-items', PsnRcmdInputDto); // 공통코드정보
      // console.log("====시작==1==");
      //  console.log("====itemList=======" + JSON.stringify(resultList.data.data.itemList));
      // console.log("=====resultList.data.data======" + JSON.stringify(resultList.data.data));
      if (resultList.data.success) {
        this.purchaseItemLists = resultList.data.data.itemList;
        this.recommentItemLists = resultList.data.data.itemRcmdList;
        console.log(" recommentItemLists " + JSON.stringify(this.recommentItemLists)); // this.recentItemLists = resultList.data.data;
        this.totCount = resultList.data.data.itemCnt;
        //   console.log("====this.totCount=======" + this.totCount);
        if ( this.totCount == 0) {
          // this.recommentItemList = resultList.data.data.itemRcmdList;
          this.getBigSaleItemInfo(); // 위대한 세일
          this.getMainNewItemInfo(); // 새로운 상품
          this.getMainOneMoreItemInfo(); // 1 + 1 상품
        }
        // console.log(this.recommentItemList.length + "===========" + this.purchaseItemLists.length);
      } else {
        console.log("오류");
      }
    },
    activeMonth(idx) { // 기간 조회 버튼 활성화 변경
      this.selectedMonths = this.months[idx];
     // this.selectedMonths = this.months[idx];
      if (this.active !== idx) {
        this.active = idx;
      }
      if (idx == 0) {
        this.period.start.date = DateUtils.format(DateUtils.add(DateUtils.getToday(), -15, 'day'), 'YYYY-MM-DD');
        this.period.end.date = DateUtils.format(DateUtils.getToday(), 'YYYY-MM-DD');
      } else if (idx == 1) {
        this.period.start.date = DateUtils.format(DateUtils.add(DateUtils.getToday(), -1, 'month'), 'YYYY-MM-DD');
        this.period.end.date = DateUtils.format(DateUtils.getToday(), 'YYYY-MM-DD');
      } else if (idx == 2) {
        this.period.start.date = DateUtils.format(DateUtils.add(DateUtils.getToday(), -3, 'month'), 'YYYY-MM-DD');
        this.period.end.date = DateUtils.format(DateUtils.getToday(), 'YYYY-MM-DD');
      } else if (idx == 3) {
        this.period.start.date = DateUtils.format(DateUtils.add(DateUtils.getToday(), -6, 'month'), 'YYYY-MM-DD');
        this.period.end.date = DateUtils.format(DateUtils.getToday(), 'YYYY-MM-DD');
      }
      for (let i=0; i < 4; i++) {
        // alert(i +" - "+ document.getElementById('between'+i).className );
        if (i == idx) {
            document.getElementById('between'+i).className = 'btn-border active';
         //  alert(document.getElementById('between'+i).className);
        } else {
           document.getElementById('between'+i).className = 'btn-border';
          // alert('between'+i +"::2:" + document.getElementById('between'+i).className);
        }
      }
    },
    getOfsExcld: function() {
      if (document.getElementById('soldout-check').checked) {
        this.ofsExcld = 'Y';
      } else {
        this.ofsExcld = 'N';
      }
     // this.getRecentItem(0, this.PAGE_SIZE);
      this.getPurchaseItem(DateUtils.format(this.period.start.date, 'YYYYMMDD'),
                            DateUtils.format(this.period.end.date, 'YYYYMMDD'),
                            0,
                            this.PAGE_SIZE
                            );
    },
    getExcept: function() {
       for (let i = 0; i < this.purchaseItemLists.length; i++) {
          document.getElementById('item-check' + this.purchaseItemLists[i].pageSeq).checked = false;
      }
    },
    getAll: function() {
      if (document.getElementById('all-check').checked) {
        document.getElementById('soldout-check').checked = false;
        this.ofsExcld = 'N';
      }
      for (let i = 0; i < this.purchaseItemLists.length; i++) {
        if (document.getElementById('all-check').checked) {
          if (this.purchaseItemLists[i].ofsYn =="Y" || this.purchaseItemLists[i].sellPosbQty == 0) {
          this.$gsdialog.alert("품절된 상품이 있어 장바구니에 담을 수 없습니다.").then(dialog => {
            this.$gsdialog.confirm('품절된 상품을 제외하고 선택하시겠습니까?').then(dialog => {
              document.getElementById('item-check' + this.purchaseItemLists[i].pageSeq).checked = false;
            }).catch(e => {
              this.getExcept();
             });
            });
          } else {
          document.getElementById('item-check' + this.purchaseItemLists[i].pageSeq).checked = true;
          }
        } else {
          document.getElementById('item-check' + this.purchaseItemLists[i].pageSeq).checked = false;
        }
      }
    },
inBasketSave: async function() {
      let exCnt = 0;
      const bsktPutDtoList = [];
      for (let i = 0; i < this.purchaseItemLists.length; i++) {
        if (
          document.getElementById('item-check' + this.purchaseItemLists[i].pageSeq).checked
        ) {
          if (this.purchaseItemLists[i].optUseYn != 'Y') {
              bsktPutDtoList[this.realBasketCnt] = this.purchaseItemLists[i];
              bsktPutDtoList[this.realBasketCnt].bsktQty = '1';
              this.realBasketCnt = this.realBasketCnt + 1;
          } else {
            exCnt = exCnt + 1;
            document.getElementById(
              'item-check' + this.purchaseItemLists[i].pageSeq
            ).checked = false;
          }
        }
      }
    const iBsktPut = {
      ordTypeCd: bsktPutDtoList[0].ordTypeCd,
      delivTypeCd: bsktPutDtoList[0].delivTypeCd,
      bsktPutDtoList: bsktPutDtoList,
      mallId: CookieUtils.getMallId(),
      zipcd: '',
      bsktTypeCd: '1',
      sessnId: CookieUtils.getOdBsktUuid(),
    };
    console.log("+iBsktPut+"+JSON.stringify(iBsktPut));
    const resultBasket = await ApiUtils.post('/fo/od/bsktmgnt/basket-item', iBsktPut);
      console.log("+result+"+JSON.stringify(resultBasket.data));
     if (resultBasket.data.success) {
      // 앱트래커관련
      Tracker.prodAddToCart(this.purchaseItemLists); // 장바구니 상품담기 완료시 실행

      if (exCnt > 0) {
        this.$gsdialog.alert(
          '상세옵션 선택이 필요한 상품 ' +
            exCnt +
            '개 제외 후 장바구니에 담겼습니다.'
        );
      } else {
        this.$gsdialog.alert(
          '선택한 ' + this.realBasketCnt + '개 상품이 장바구니에 담겼습니다.'
        );
      }
    } else {
              this.$gsdialog.alert(resultBasket.data.statusMessage);
    }
      exCnt = 0;
      this.realBasketCnt = 0;
    },
    inBasket: function() {
      if (this.purchaseItemLists.length > 0) {
        let cnt = 0;
        for (let i = 0; i < this.purchaseItemLists.length; i++) {
          if (
            document.getElementById(
              'item-check' + this.purchaseItemLists[i].pageSeq
            ).checked
          ) {
            cnt = cnt + 1;
          }
        }
        if (cnt > 0) {
          this.$gsdialog
            .confirm('선택한 ' + cnt + '개 상품을 장바구니에 담으시겠습니까?')
            .then(dialog => {
              this.inBasketSave();
            });
        } else {
          this.$gsdialog.alert('선택한 상품이 없습니다.');
        }
      } else {
        this.$gsdialog.alert('선택한 상품이 없습니다.');
      }
    },
search() {
      //  alert(this.period.end.date +"::::"+this.period.start.date);
      if (DateUtils.format(this.period.start.date, 'YYYYMMDD') > DateUtils.format(this.period.end.date, 'YYYYMMDD')) {
        this.$gsdialog.alert("시작날짜가 종료날짜보다 뒤입니다.<br>날짜를 다시 설정해주세요", {html: true});
        return;
      }
      if (DateUtils.format(this.period.start.date, 'YYYYMMDD') < DateUtils.format(DateUtils.add(this.period.end.date, -6, 'month'), 'YYYYMMDD')) {
        this.$gsdialog.alert("6개월 단위로 조회 가능합니다.");
        return;
      }
     // this.tabAction('all');
      this.pageNo = 0;
      this.pageSize = this.PAGE_SIZE;
    //  this.getPurchaseItem();
      this.getPurchaseItem(DateUtils.format(this.period.start.date, 'YYYYMMDD'),
                            DateUtils.format(this.period.end.date, 'YYYYMMDD'),
                            0,
                            this.pageSize
                            );
    },
    handleScroll: function() {
      const el = document.querySelector('body');
      const y = window.scrollY + window.innerHeight;
      const height = el.offsetHeight;
      const ratio = Math.floor((y / height) * 100);
      // console.log(ratio +"::" + this.moreData +"::" +this.loading);
        if (ratio > 89 && this.moreData && !this.loading) {
          if (this.totCount > 0) {
          this.loadMore();
        }
      }
    },
    loadMore: async function() {
      this.loading = true;
    //  if (this.pageSize !== this.PAGE_SIZE && Number(this.totCount) <= this.pageSize) {
    //    this.moreData = false;
    //    return;
    //  }
      this.pageNo = this.pageNo + 1;
      this.pageSize = this.pageNo * this.PAGE_SIZE;
      console.log("this.pageSiz::" + this.pageSize);
      await this.getPurchaseItem(DateUtils.format(this.period.start.date, 'YYYYMMDD'),
                                DateUtils.format(this.period.end.date, 'YYYYMMDD'),
                                0,
                                this.pageSize);
      this.loading = false;
    },
    // 위대한 세일 코너 정보 조회
    getBigSaleItemInfo() {
        try {
           // await dispatch('getCookiCheck');
            const params = {
                  mallId: CookieUtils.getCookie('MALL_ID'), // '1',
                  dspScrSpCd: '02',
                  dspConrId: '5', // 6 (새로나왔어요) / 5 (위대한빅세일)
                  dspCtgId: 'N1001001',
                  storId: CookieUtils.getCookie('STOR_ID'),
                  supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
            };
            console.log("++ params ++"+JSON.stringify(params));
            ApiUtils.get('/dp/fr/displaymgnt/display-comm-banner-info', params).thien(response => {
              if (response.data.success === true) {
                if (response.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrCntInfo != null) {
                  // console.log("++ 위대한빅세일response+1111"+JSON.stringify(response.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0]));
                  this.bigSaleList = response.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[1].rdspCommConrCntInfo;
                }
                console.log("++ 위대한빅세일response+1111"+JSON.stringify(this.bigSaleList));
              }
            });
        } catch (e) {
            console.log(e);
        }
    },
    // 새로 나왔어요 코너 정보 조회
    getMainNewItemInfo() {
        try {
           // await dispatch('getCookiCheck');
            const params = {
                  mallId: CookieUtils.getCookie('MALL_ID'), // '1',
                  dspScrSpCd: '02',
                  dspConrId: '6', // 6 (새로나왔어요) / 5 (위대한빅세일)
                  dspCtgId: 'N1001001',
                  storId: CookieUtils.getCookie('STOR_ID'),
                  supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
            };
            ApiUtils.get('/dp/fr/displaymgnt/display-comm-banner-info', params).thien(response => {
              // console.log("++ 새로 나왔어요response+"+JSON.stringify(response));
              if (response.data.success === true) {
                if (response.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo !=null
                  && response.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo.length > 0
                  && response.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[1].rdspCommConrCntInfo != null) {
                    this.newItemViewList = response.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[1].rdspCommConrCntInfo;
                }
                console.log("++ 새로 나왔어요response+22222111122"+JSON.stringify(this.newItemViewList));
              }
            });
        } catch (e) {
            console.log(e);
        }
    },
    // 하나 더 드려요 정보 조회
    getMainOneMoreItemInfo() {
        try {
          //  await dispatch('getCookiCheck');
          ApiUtils.get('/dp/fr/displaymgnt/main-onemore-item-info', { ...this.cookieInfo }).thien(response => {
            console.log("++ 하나 더response+"+JSON.stringify(response));
            if (response.data.success === true) {
                this.oneMoreItemList = response.data.data;
            }
          });
        } catch (e) {
          console.log(e);
        }
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.siteClass = CookieUtils.getSiteClass();
    const $this = this;
    $this.period.start.date = DateUtils.format(DateUtils.add(DateUtils.getToday(), -15, 'day'), 'YYYY-MM-DD');
    $this.period.end.date = DateUtils.format(DateUtils.getToday(), 'YYYY-MM-DD');
    window.addEventListener('scroll', function() {
      $this.bannerinit();
    });
   // this.handleScroll();
    $this.getPurchaseItem($this.period.start.date, $this.period.end.date, 0, this.PAGE_SIZE);
    window.addEventListener('scroll', this.handleScroll);

    $this.cookieInfo.storId = CookieUtils.getCookie('STOR_ID');
    $this.cookieInfo.supplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');
    $this.cookieInfo.mallId = CookieUtils.getCookie('MALL_ID');
    $this.cookieInfo.dspScrSpCd = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');
    $this.cookieInfo.chanlId = CookieUtils.getCookie('CHANL_ID');
    $this.cookieInfo.custGrdCd = CookieUtils.getCookie('CUST_GRD_CD');
    $this.cookieInfo.mbrTypeCd = CookieUtils.getCookie('MBR_TYPE_CD');
    // 심플리쿡 쿠키 정보
    $this.cookieInfo.simpleMallId = CookieUtils.getCookie('SIMPLE_MALL_ID');
    $this.cookieInfo.simpleStorId = CookieUtils.getCookie('SIMPLE_STOR_ID');
    $this.cookieInfo.simpleSupplFirmCd = CookieUtils.getCookie('SIMPLE_SUPPL_FIRM_CD');
    //  $this.getBigSaleItemInfo(); // 위대한 세일
    //  $this.getMainNewItemInfo(); // 새로운 상품
    // $this.getMainOneMoreItemInfo(); // 1 + 1 상품
    document.getElementById('between0').className = 'btn-border active';
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
