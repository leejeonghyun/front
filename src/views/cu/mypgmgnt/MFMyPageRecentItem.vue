<!--
SC-FO-SS-GF-MS-706
-->
<template>
  <div class="public_domain wrap-mypage" :class="siteClass">
    <!-- START : Header -->
    <MainHeader ref="header" :headertype="3" :headerhide="false" headerText="최근 본 상품" v-if="cmmSteId === '3'"/>
    <SubDefaultHeader headerText="최근 본 상품" v-else />
    <!-- END : Header -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div ref="tabContents" class="wrap-mypage-personalize" tabindex="0">
        <!-- START : 탭 콘텐츠 -->
        <div id="tab-contents-all" aria-labelledby="tab-all">
          <h2 class="hidden">전체</h2>
          <div class="personalize-filter-check">
            <div class="filter-input-check">
              <div>
              <span class="inp-chk small">
                <input
                  type="checkbox"
                  name=""
                  id="all-check"
                  value=""
                  @click="getAll()"
                />
                <label for="all-check">전체</label>
              </span>
              <span class="inp-chk small">
                <input
                  type="checkbox"
                  name=""
                  id="soldout-check"
                  value=""
                  @click="getOfsExcld()"
                />
                <label for="soldout-check">품절상품제외</label>
              </span>
              </div>
              <div>
                <!-- <button
                  class="btn-border btn-xs"
                  aria-label="선택 한 최근 본 상품"
                  @click="inBasket"
                >
                  장바구니 담기
                </button> -->
                <button class="btn-border btn-xs"
                  aria-label="선택 한 최근 본 상품"
                  @click="delRecent"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
          <!-- START : 상품 리스트 -->
          <div
            class="recent-item-list"
            v-for="recentItemList in recentItemLists"
            v-bind:key="recentItemList.rowSeq"
            v-bind:recentItemList="recentItemList"
          >
            <div class="wrap-personalize-item-option">
              <div class="item-option-top">
                <span class="inp-chk">
                  <input
                    type="checkbox"
                    name="item-check"
                    aria-label="자주 구매 상품 선택"
                    :id="'item-check' + recentItemList.rowSeq"
                    value=""
                  />
                  <label
                    v-bind:for="'item-check' + recentItemList.rowSeq"
                    ></label
                  >
                  <!-- !! label 값 아래 자주 구매 상품명이 들어가야 함 -->
                  <label for="item1-check"><img :src="requireF(recentItemList.mallId)" :alt="recentItemList.mallNm" class="mall_image" @click="goUrl(recentItemList.mallId)"></label>
                <!-- require('@/assets/images/mall_logo/'+recentItemList.mallId+'.png') -->
                <!-- <span aria-label="몰 이름">{{ recentItemList.mallNm }}</span> -->
                </span>
              </div>
            </div>
            <!-- START : 기획&디자인 검수용 컴포넌트 -->
            <div class="wrap-product-list">
              <MypageProductItem
                @popupEvent="popupAction"
                :retrieveDawnDeliYn="retrieveDawnDeliYn"
                :itemValue="recentItemList"
                @goCart="goCart"
                @goDcInfo="goDcInfo"
                :daliProduct="recentItemList.mallId == '11' ? true : false"
              />
            </div>
            <!-- END : 기획&디자인 검수용 컴포넌트 -->
          </div>
          <!-- END : 상품 리스트 -->
          <!-- START : 상품 리스트 없음 케이스 -->
          <div class="recent-item-list" v-if="recentItemLists.length == 0">
            <NoList
              NoListText="최근 본 상품이 없습니다."
              :ListType="'mypage-itemlist recent'"
            />
          </div>
          <!-- END : 상품 리스트 없음 케이스 -->
        </div>
        <!-- END : 달리살다 -->
        <!-- START : 새벽배송
        <div id="tab-contents-daybreak" aria-labelledby="tab-daybreak" v-if="this.naviTab.daybreak">
        </div> -->
        <!-- END : 심플리쿡 -->
      </div>
        <!-- END : 탭 콘텐츠 -->
      <Loading v-show="loading" />
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <!-- START : 팝업 -->
    <!--<popupOption @popupEvent="popupAction" v-if="this.popup.popupOption" />-->
     <PopupOptionArea v-bind:dispType="'DP'" ref="optionArea"/>
     <M4PopupOptionArea v-bind:dispType="'DP'" ref="MFOptionArea"/>
     <PopupDiscountInfo
      @popupEvent="popupAction"
      v-if="popup.popupSales"
      v-bind:dcSateInfo="dcSateInfo"
    />
    <!-- END : 팝업 -->
    <transition name="toastPopup" v-on:after-enter="toastPopupAfterEnter" v-on:leave="toastPopupEnterLeave">
      <PopupToast :ToastMessage="toastMessage" @popupEvent="popupAction" v-if="popup.popupToastCart" :popupToast="popup.popupToastCart"  popupToastType="popupToastCart" />
    </transition>
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/header/Header5';// '@/components/common/SubDefaultHeader';
import PopupToast from '@/components/common/PopupToast';
import MainHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import NoList from '@/components/common/NoList';
// import MypageProductItem from '@/components/mypage/MypageProductItem'; // 실 사용 컴포넌트
import MypageProductItem from '@/components/productTemplete/MFProductList02'; // 실 사용 컴포넌트
import PopupDiscountInfo from '@/components/product/M4PopupDiscountInfo'; // 팝업 - 할인내역
import PopupOptionArea from '@/views/md/OptionArea';
import M4PopupOptionArea from '@/views/md/MFOptionArea';
// import Footer from '@/components/common/Footer';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import LoginUtils from '@/common/LoginUtils';
import SiteUtils from '@/common/SiteUtils';
import Loading from '@/components/common/Loading';
import CookieUtils from '@/common/CookieUtils';
import Tracker from '@/common/Tracker'; // 앱트래커
import ItemTemplete from '@/common/ItemTemplete';
export default {
  name: 'MyPageRecentItem',
  metaInfo: {
    title: '최근본상품',
    titleTemplate: '',
    meta: [
      // SEO setting
      { name: 'description', content: '쉽고 빠르게 쇼핑하기', vmid: 'description' },
      // SNS 용
      {
        property: 'og:title',
        content: '최근본상품',
        template: chunk => `${chunk}`,
        vmid: 'og:title'
      },
    ],
  },
  components: {
    SubDefaultHeader,
    MainHeader,
    PopupDiscountInfo,
   // popupOption,
    PopupOptionArea,
    M4PopupOptionArea,
    NoList,
    MypageProductItem, // 실 사용 컴포넌트
    //   MypageProductItem01, // 기획, 디자인 확인용
    //   MypageProductItem02, // 기획, 디자인 확인용
    //   MypageProductItem03, // 기획, 디자인 확인용
    Footer,
    Loading,
    PopupToast,
  },
  data() {
    return {
    cartParams: {
            itemId: this.$route.query.itemId,
            mallId: this.$route.query.mallId,
            storId: this.$route.query.storId,
            supplFirmCd: this.$route.query.supplFirmCd,
      },
      naviTab: {
        all: true,
        gsfresh: false,
        dalisalda: false,
        daybreak: false,
        simplycook: false,
      },
      popup: {
        // 팝업
        open: false,
        popupSales: false, // 할인 내역 팝업
        popupOption: false, // 장바구니 옵션 팝업
        popupToastCart: false,
      },
      tabDiv: 'all',
      recentItemLists: [],
      ofsExcld: 'N',
      realBasketCnt: 0,
      // 더보기
      moreData: true,
      loading: false,
      count: 0,
      pageNo: 1,
      pageSize: 10,
      pageSizeGap: 0,
      totCount: 0,
      PAGE_SIZE: 10,
      ccnt: 0,
      dcSateInfo: {}, // 할인정보
      siteClass: CookieUtils.getSiteClass(),
      cmmSteId: CookieUtils.getCmmSteId(),
      toastMessage: '',
      retrieveDawnDeliYn: false,
    };
  },
  methods: {
    toastPopupAfterEnter(el) {
      el.style.opacity = 1;
    },
    toastPopupEnterLeave(el) {
      el.style.opacity = 0;
    },
    goUrl(url) {
      if (url == '1' || url == '20') {
        location.href = SiteUtils.freshmo('');
      } else if (url == '11') {
        location.href = SiteUtils.dalimo('');
      } else if (url == '301') {
        location.href = SiteUtils.marketformo('/gsshop');
      } else {
        location.href = SiteUtils.marketformo('/mall_main?mallId='+ url);
      }
    },
    requireF(path) {
      try {
        return require('@/assets/images/mall_logo/'+path+'.png');
      } catch (e) {
        return '';
      }
    },
  //   offSale(ofsYn, sellPosbQty, rowSeq) { // 장바구니 외부호출 샘플
  // //  alert(ofsYn +"::::" + sellPosbQty +"::::"+rowSeq);
  //     if (ofsYn =="Y" || sellPosbQty == 0) {
  //       this.$gsdialog.alert("품절된 상품으로 장바구니에 담을 수 없습니다.");
  //       document.getElementById('item-check' + rowSeq).checked = false;
  //     //  return;
  //     }
  //   },
    goCart(itemValue) {
      const vm = this;
      if (itemValue.sellAgeRestrCd == '19') { // 해당 상품이 19금 상품인 경우
        const returnUrl = encodeURIComponent(location.href+"&refLogin=Y");
        if (!LoginUtils.isLogin()) { // 비로그인시 로그인으로 이동
          vm.$gsdialog.confirm('성인인증이 필요한 상품입니다. 로그인 페이지로 이동하시겠습니까?').then(async function () {
            console.log("confirm yes :: "+returnUrl);
            const loginUrl = SiteUtils.commo('/cu/login?returnUrl=' + returnUrl);
            location.href = loginUrl;
          }).catch(function() {
            // 액션없음
          });
          return;
        } else { // 로그인 시
          const nowYmd = DateUtils.getToday();
          const nowYmdInt = nowYmd.replace(/-/gi, '');
          const lastYmdInt = nowYmdInt - 10000;

          console.log("lastYmdInt :: ", lastYmdInt);
          const aad = CookieUtils.getCookie('ADULT_AUTH_DATE').substr(0, 8);
          console.log("aad :: |"+aad+"|");
          if (aad == undefined || aad == null || aad == '' || aad < lastYmdInt) { // 성인인증을 한적이 없거나 인증한지 1년 초과시 성인인증페이지로 이동
            console.log("in aad nullcase:: |"+aad+"|");
            vm.$gsdialog.confirm('성인인증이 필요한 상품입니다.인증 페이지로 이동하시겠습니까?').then(async function () {
              const adultCertUrl = SiteUtils.commo('/cu/product_adult_certify?returnUrl=' + returnUrl);
              location.href = adultCertUrl;
            }).catch(function() { // 컨펌창에서 '아니오' 선택시
              // 액션없음
            });
            return;
          }
        }
      }
      // 장바구니 외부호출 샘플
      this.cartParams.itemId = itemValue.itemId;
      this.cartParams.storId = itemValue.storId;
      this.cartParams.supplFirmCd = itemValue.supplFirmCd;
      this.cartParams.mallId = itemValue.mallId;
      if (itemValue.mallId === '1' || itemValue.mallId === '11' || itemValue.mallId === '20') {
        this.$refs.optionArea.getOrder(this.cartParams);
      } else {
        this.$refs.MFOptionArea.getOrder(this.cartParams);
      }
    },
    goDcInfo(itemValue) {
      // 할인내역팝업 외부호출 샘플
      this.dcSateInfo = itemValue;
      itemValue.itemDcrt = this.getDcRate(itemValue.bfrSellAmt, itemValue.sellAmt);
      itemValue.dcAmt = itemValue.sellAmt;
      this.popupAction('popupSales');
    },
    getDcRate(bfrSellAmt, sellAmt) {
      return ItemTemplete.getDcRate(bfrSellAmt, sellAmt);
    },
    tabAction(type) {
      this.tabDiv = type;
      for (let i = 0; i < Object.keys(this.naviTab).length; i++) {
        this.naviTab[Object.keys(this.naviTab)[i]] = false;
      }
      this.naviTab[type] = true;
      // this.$refs.tabContents.focus();
      // this.getRecentItem();
      this.pageNo = 1;
      this.pageSize = this.PAGE_SIZE;
      this.moreData = true;
      this.loading = false;
      this.getRecentItem(0, this.pageSize);
    },
    selectAction(type) {
      // 리스트, 배송타입 레이어 활성화
      if (!this.select[type].open) {
        Object.keys(this.select).map(select => {
          this.select[select].open = false;
        });
      }
      this.select[type] = Object.assign({}, this.select[type], {
        open: !this.select[type].open,
      });
    },
    changeSelectAction(type, selectedData) {
      // 리스트, 배송타입 정렬 변경
      this.select[type] = Object.assign({}, this.select[type], {
        open: false,
        selected: selectedData,
      });
    },
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false);
    },
    getRecentItem: async function(pgNo, pgSize) {
      // 최근본상품 조회
      console.log("  getRecentItem  pgNo " + pgNo);
      console.log("  getRecentItem  pgSize " + pgSize);
      const MbrInqItemListInqInputDto = {
        // cmmMbrNo: 7706266, // TODO
        offset: pgNo,
        limit: pgSize,
        mallId: '',
        // mallId: CookieUtils.getCookie('MALL_ID'),
        ofsExcld: this.ofsExcld,
        //  mallId: "1"
      };
     console.log("+++"+JSON.stringify(MbrInqItemListInqInputDto));
      // console.log(JSON.stringify(MbrInqItemListInqInputDto ));
      const resultList = await ApiUtils.get(
        '/fo/md/mf/itemaddinfomgnt/mbr-inquire-item-list',
        MbrInqItemListInqInputDto
      ); // 공통코드정보
      // console.log("====시작==1==");
       console.log(JSON.stringify(resultList.data.data));
      if (resultList.data.success) {
        this.recentItemLists = resultList.data.data;
        const resultCnt = await ApiUtils.get(
          '/fo/md/mf/itemaddinfomgnt/mbr-inquire-item-count',
          MbrInqItemListInqInputDto
        );
         // console.log("+resultCnt+"+JSON.stringify(resultCnt.data.data));
        this.totCount = resultCnt.data.data.inqrCnt >= 50 ? 50 : resultCnt.data.data.inqrCnt;
       //   alert(this.totCount);
        // for (let i = 0; i < this.recentItemLists.length; i++) {
        //  document.getElementById('item-check' + this.recentItemLists[i].rowSeq).checked = false;
        // }
        if (document.getElementById('all-check').checked) {
          this.getAll();
        }
      } else {
        console.log("오류");
      }
    },
    getOfsExcld: function() {
      if (document.getElementById('soldout-check').checked) {
        this.ofsExcld = 'Y';
      } else {
        this.ofsExcld = 'N';
      }
      this.getRecentItem(0, 0);
    },
    getExcept: function() {
       for (let i = 0; i < this.recentItemLists.length; i++) {
          document.getElementById('item-check' + this.recentItemLists[i].rowSeq).checked = false;
      }
    },
    getAll: function() {
      // if (document.getElementById('all-check').checked) {
      //   document.getElementById('soldout-check').checked = false;
      //   this.ofsExcld = 'N';
      // }
      for (let i = 0; i < this.recentItemLists.length; i++) {
        if (document.getElementById('all-check').checked) {
          document.getElementById('item-check' + this.recentItemLists[i].rowSeq).checked = true;
          // if (this.recentItemLists[i].ofsYn =="Y" || this.recentItemLists[i].sellPosbQty == 0) {
          // this.$gsdialog.alert("품절된 상품이 있어 장바구니에 담을 수 없습니다.").then(dialog => {
          //   this.$gsdialog.confirm('품절된 상품을 제외하고 선택하시겠습니까?').then(dialog => {
          //     document.getElementById('item-check' + this.recentItemLists[i].rowSeq).checked = false;
          //   }).catch(e => {
          //     this.getExcept();
          //    });
          //   });
          // } else {
          // document.getElementById('item-check' + this.recentItemLists[i].rowSeq).checked = true;
          // }
        } else {
          document.getElementById('item-check' + this.recentItemLists[i].rowSeq).checked = false;
        }
      }
    },
    handleScroll: function() {
      const el = document.querySelector('body');
      const y = window.scrollY + window.innerHeight;
      const height = el.offsetHeight;
      let ratio = 0; // Math.floor((y / height) * 100);
 // console.log(this.ccnt + " =======111========= ");
      if ( this.ccnt > -1 && this.ccnt < 20) {
          ratio = 90;
          this.ccnt = this.ccnt + 1;
         // console.log(" =======111========= ");
      } else {
          ratio = Math.floor((y / height) * 100);
          // console.log(" =======222========= ");
          this.ccnt = this.ccnt + 1;
      }
      // console.log(" handleScroll " + this.pageSize + "::::" + this.totCount + " :::::" + this.PAGE_SIZE + "::::"+ this.pageNo);
      // console.log(this.totCount + (this.PAGE_SIZE - (this.totCount % this.PAGE_SIZE)) );
      if (this.pageSize != this.totCount + (this.PAGE_SIZE - (this.totCount % this.PAGE_SIZE))) {
        console.log(this.ccnt + "::" + ratio + "----" + this.moreData + "----" + !this.loading);
      // setTimeout(() => {
       if (ratio > 90 && this.moreData && !this.loading) {
           // console.log("--loadMore--back" + ratio +"::::");
           //  console.log("--loadMore--after");
             this.loadMore();
             this.ccnt = 0;
        }
      // }, 3000);
      }
    },
    loadMore: function() {
      console.log('loadMore');
      this.loading = true;
      if (
        this.pageSize !=
        this.totCount + (this.PAGE_SIZE - (this.totCount % this.PAGE_SIZE))
      ) {
        // console.log(" totCount " + this.totCount );
        this.pageNo = this.pageNo + 1;
        this.pageSize = this.pageNo * this.PAGE_SIZE;
        if (this.pageSize < 60) {
        // this.getGsPointList(DateUtils.format(DateUtils.add(DateUtils.getToday(), this.gsPointDate, this.gsBetweenDiv), 'YYYYMMDD'), 1, this.pageSize);
        this.getRecentItem(0, this.pageSize);
        }
        this.loading = false;
      } else {
        this.loading = false;
        this.moreData = false;
        return;
      }
    },
    inBasketSave: async function() {
      let exCnt = 0;
      const bsktPutDtoList = [];
      for (let i = 0; i < this.recentItemLists.length; i++) {
        if (document.getElementById('item-check' + this.recentItemLists[i].rowSeq).checked) {
          if (this.recentItemLists[i].ofsYn == 'Y' || this.recentItemLists[i].sellPosbQty == 0) {
            document.getElementById('item-check' + this.recentItemLists[i].rowSeq).checked = false;
            this.toastMessage = '[일시 품절 상품이 존재합니다.]';
            this.popup.popupToastCart = true;
            return;
          }
          if (this.recentItemLists[i].optUseYn != 'Y') {
              bsktPutDtoList[this.realBasketCnt] = this.recentItemLists[i];
              bsktPutDtoList[this.realBasketCnt].bsktQty = '1';
              this.realBasketCnt = this.realBasketCnt + 1;
              document.getElementById('item-check' + this.recentItemLists[i].rowSeq).checked = false;
          } else {
            exCnt = exCnt + 1;
            document.getElementById(
              'item-check' + this.recentItemLists[i].rowSeq
            ).checked = false;
          }
        }
      }
      if (bsktPutDtoList.length == 0) {
        // this.$gsdialog.alert(
        //       '상세옵션 선택이 필요한 상품' + exCnt + '개 제외 후 장바구니에 담겼습니다.'
        //     );
        this.toastMessage = '상세옵션 선택이 필요한 상품 입니다.';
        this.popup.popupToastCart = true;
      } else {
        const iBsktPut = {
          ordTypeCd: bsktPutDtoList[0].ordTypeCd,
          delivTypeCd: bsktPutDtoList[0].delivTypeCd,
          bsktPutDtoList: bsktPutDtoList,
          mallId: bsktPutDtoList[0].mallId,
          zipcd: '',
          bsktTypeCd: '1',
          sessnId: CookieUtils.getOdBsktUuid(),
        };
        console.log("+iBsktPut+"+JSON.stringify(iBsktPut));
        let resultBasket;
        if (iBsktPut.mallId == '1' || iBsktPut.mallId == '11' || iBsktPut.mallId == '20') {
          resultBasket = await ApiUtils.post('/fo/od/bsktmgnt/basket-item', iBsktPut);
        } else {
          resultBasket = await ApiUtils.post('/fo/od/mf/bsktmgnt/basket-item', iBsktPut);
        }
          console.log("+result+"+JSON.stringify(resultBasket.data));
        if (resultBasket.data.success) {
          // 앱트래커관련
          Tracker.prodAddToCart(this.recentItemLists); // 장바구니 상품담기 완료시 실행

          if (exCnt > 0) {
            // this.$gsdialog.alert(
            //   '상세옵션 선택이 필요한 상품 ' +
            //     exCnt +
            //     '개 제외 후 장바구니에 담겼습니다.'
            // );
            this.toastMessage = '상세옵션 선택이 필요한 상품 ' + exCnt + '개 제외 후 장바구니에 담겼습니다.';
            this.popup.popupToastCart = true;
          } else {
            this.toastMessage = '선택한 ' + this.realBasketCnt + '개 상품이 장바구니에 담겼습니다.';
            this.popup.popupToastCart = true;
          }
        } else {
          this.toastMessage = resultBasket.data.statusMessage;
          this.popup.popupToastCart = true;
          // this.$gsdialog.alert(resultBasket.data.statusMessage);
        }
      }
      exCnt = 0;
      this.realBasketCnt = 0;
    },
    inBasketSaveTemp: async function() {
      let exCnt = 0;

      for (let i = 0; i < this.recentItemLists.length; i++) {
        if (
          document.getElementById('item-check' + this.recentItemLists[i].rowSeq).checked
        ) {
          if (this.recentItemLists[i].optUseYn != 'Y') {
            const iBsktPut = {
              itemID: this.recentItemLists[i].itemID,
              skuId: this.recentItemLists[i].skuId,
              itemCD: this.recentItemLists[i].itemCD,
              grpItemID: this.recentItemLists[i].grpItemID,
              bsktQty: '1',
              dspCtgId: this.recentItemLists[i].dspCtgId,
              promId: this.recentItemLists[i].promId,
              ordTypeCd: this.recentItemLists[i].ordTypeCd,
              delivtypeCd: this.recentItemLists[i].delivtypeCd,
              delivDt: this.recentItemLists[i].delivDt,
              mallId: this.recentItemLists[i].mallId,
            };
            const result = await ApiUtils.post(
              '/fo/od/bsktmgnt/basket-item',
              iBsktPut
            );
            console.log(JSON.stringify(result.data.success));
            if (result.data.success) {
              this.realBasketCnt = this.realBasketCnt + 1;
              // console.log( this.realBasketCnt + ":realC111111nt:");
            }
          } else {
            exCnt = exCnt + 1;
            document.getElementById(
              'item-check' + this.recentItemLists[i].rowSeq
            ).checked = false;
          }
        }
      }
      // 앱트래커관련
      Tracker.prodAddToCart(this.recentItemLists); // 장바구니 상품담기 완료시 실행

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
      exCnt = 0;
      this.realBasketCnt = 0;
    },
    inBasket: function() {
      if (this.recentItemLists.length > 0) {
        let cnt = 0;
        for (let i = 0; i < this.recentItemLists.length; i++) {
          if (
            document.getElementById(
              'item-check' + this.recentItemLists[i].rowSeq
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
    delRecent: function() {
      if (this.recentItemLists.length > 0) {
        let cnt = 0;
        for (let i = 0; i < this.recentItemLists.length; i++) {
          if (
            document.getElementById(
              'item-check' + this.recentItemLists[i].rowSeq
            ).checked
          ) {
            cnt = cnt + 1;
          }
        }
        if (cnt > 0) {
          this.$gsdialog
            .confirm('선택한 ' + cnt + '개 상품을 삭제하시겠습니까?')
            .then(dialog => {
              this.delRecentItems();
            });
        } else {
          this.$gsdialog.alert('선택한 상품이 없습니다.');
        }
      } else {
        this.$gsdialog.alert('선택한 상품이 없습니다.');
      }
    },
    delRecentItems: async function() {
      let exCnt = 0;
      const bsktPutDtoList = [];
      for (let i = 0; i < this.recentItemLists.length; i++) {
        if (document.getElementById('item-check' + this.recentItemLists[i].rowSeq).checked) {
          if (this.recentItemLists[i].itemId == null) {
            continue;
          } else {
            // if (this.recentItemLists[i].optUseYn != 'Y') {
              const params = {
                itemId: this.recentItemLists[i].itemId,
                mallId: this.recentItemLists[i].mallId,
              };
              try {
                const response = await ApiUtils.delete(
                  '/fo/md/mf/itemaddinfomgnt/mbr-inquire-item',
                  params
                );
                console.log(
                  'mbr-inquire-item response.data :: ' + response.data.success
                );
                document.getElementById('item-check' + this.recentItemLists[i].rowSeq).checked = false;
              } catch (e) {
                console.log(e);
              }
            // }
          }
        }
      }
      this.getRecentItem(0, 0); // 최근본상품
      // const storeItems = JSON.parse(localStorage.getItem('mbrInqItemList'));

      // if (!StringUtils.isEmpty(storeItems)) {
      //   vm.storeItemsData = storeItems;
      //   for (let i = 0; i < storeItemsData.length; i++) {
      //     const params = {
      //       itemId: vm.storeItemsData[i].itemId,
      //       mallId: CookieUtils.getMallId(),
      //     };
      //     try {
      //       const response = await ApiUtils.delete(
      //         '/fo/md/itemaddinfomgnt/mbr-inquire-item',
      //         params
      //       );
      //       console.log(
      //         'mbr-inquire-item response.data :: ' + response.data.success
      //       );
      //       storeItems.splice(rowSeq, i + 1);
      //       localStorage.setItem(
      //         'mbrInqItemList',
      //         JSON.stringify(storeItems)
      //       );
      //     } catch (e) {
      //       console.log(e);
      //     }
      //   }
      // }
      // const iBsktPut = {
      //   ordTypeCd: bsktPutDtoList[0].ordTypeCd,
      //   delivTypeCd: bsktPutDtoList[0].delivTypeCd,
      //   bsktPutDtoList: bsktPutDtoList,
      //   mallId: CookieUtils.getMallId(),
      //   zipcd: '',
      //   bsktTypeCd: '1',
      //   sessnId: CookieUtils.getOdBsktUuid(),
      // };
      // console.log("+iBsktPut+"+JSON.stringify(iBsktPut));
      // const resultBasket = await ApiUtils.post('/fo/od/bsktmgnt/basket-item', iBsktPut);
      //   console.log("+result+"+JSON.stringify(resultBasket.data));
      // if (resultBasket.data.success) {
      //   // 앱트래커관련
      //   Tracker.prodAddToCart(this.recentItemLists); // 장바구니 상품담기 완료시 실행

      //   if (exCnt > 0) {
      //     this.$gsdialog.alert(
      //       '상세옵션 선택이 필요한 상품 ' +
      //         exCnt +
      //         '개 제외 후 장바구니에 담겼습니다.'
      //     );
      //   } else {
      //     this.$gsdialog.alert(
      //       '선택한 ' + this.realBasketCnt + '개 상품이 장바구니에 담겼습니다.'
      //     );
      //   }
      // } else {
      //           this.$gsdialog.alert(resultBasket.data.statusMessage);
      // }
      exCnt = 0;
      this.realBasketCnt = 0;
    },
    getDaliProduct: function() {
      const mallId = CookieUtils.getCookie('MALL_ID');

      if (mallId == '11') {
        return true;
      } else {
        return false;
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
   async created() {
    try {
      if (LoginUtils.isLogin()) {
        await this.$store.dispatch('getBaseDeliv', '');
        const zipcd = this.$store.state.dp.zipcd;
        await this.$store.dispatch('retrieveDawnDeliYn', zipcd);
        this.retrieveDawnDeliYn = this.$store.state.dp.retrieveDawnDeliYn;
      }
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  mounted() {
     if (!LoginUtils.isLogin()) {
      let returnUrl = location.href;
      returnUrl = encodeURIComponent(returnUrl);
      console.log('returnUrl,'+returnUrl);
      this.$router.push({ path: '/cu/login?returnUrl='+returnUrl });
      return;
    }
    this.getRecentItem(0, this.PAGE_SIZE); // 최근본상품
    window.addEventListener('scroll', this.handleScroll);
  },
  /* 4월수정 START : 이벤트 추가 */
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.popupTotalMenu) {
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
  /* 4월수정 END : 이벤트 추가 */
};
</script>
