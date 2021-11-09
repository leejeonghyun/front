<!--
views/ss/SC-FO-SS-GF-MS-706
-->
<template>
  <div class="wrap">
    <!-- START : Header -->
    <SubDefaultHeader headerText="이런 상품 찾아다녔죠?" />
    <!-- END : Header -->
    <nav>
      <!-- START : 탭 리스트 -->
      <div class="wrap-searchresult tab-default">
        <ul class="scroll-area-x">
          <li>
            <button id="tab-all" aria-controls="tab-contents-all" @click="getTabAction('all')" :class="{active : this.naviTab.all}">
              <strong role="heading" aria-level="2">전체</strong>
            </button>
          </li>
          <li>
            <button id="tab-gsfresh" aria-controls="tab-contents-gsfresh" @click="getTabAction('gsfresh')" :class="{active : this.naviTab.gsfresh}" >
              <strong role="heading" aria-level="2">GS fresh</strong>
            </button>
          </li>
          <li>
            <button id="tab-dalisalda" aria-controls="tab-contents-dalisalda" @click="getTabAction('dalisalda')" :class="{active : this.naviTab.dalisalda}" >
              <strong role="heading" aria-level="2">달리살다</strong>
            </button>
          </li>
          <li>
            <button id="tab-daybreak" aria-controls="tab-contents-daybreak" @click="getTabAction('daybreak')" :class="{active : this.naviTab.daybreak}" >
              <strong role="heading" aria-level="2">새벽배송</strong>
            </button>
          </li>
          <li>
            <button id="tab-simplycook" aria-controls="tab-contents-simplycook" @click="getTabAction('simplycook')" :class="{active : this.naviTab.simplycook}" >
              <strong role="heading" aria-level="2">심플리쿡</strong>
            </button>
          </li>
        </ul>
      </div>
      <!-- END : 탭 리스트 -->
    </nav>
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div ref="tabContents" class="wrap-mypage-personalize" tabindex="0">
        <!-- START : 탭 콘텐츠 -->
        <div class="tab-content">
          <div id="tab-contents-all" aria-labelledby="tab-all" v-if="this.naviTab.all">
            <h2 class="hidden">전체</h2>
            <div class="wrap-personalize-filter">
              <div class="personalize-filter-check">
                <div class="filter-input-check">
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="all-check1" value=""  checked="checked">
                    <label for="all-check">전체</label>
                  </span>
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="soldout-check1" value="">
                    <label for="soldout-check">품절상품제외</label>
                  </span>
                  <button class="btn-border btn-xs position-right" aria-label="선택 한 자주 구매 상품">담기</button>
                </div>
              </div>
            </div>
            <!-- START : 상품 리스트 -->
            <div class="recent-item-list">
              <p class="wrap-chk">
                <span class="inp-chk">
                  <input type="checkbox" name="" aria-label="자주 구매 상품 선택" id="item1-check" value=""  checked="checked">
                  <label for="item1-check" class="hidden">서울 목장의 신선함이 살아있는 저지방 우유 1L 서울 목장의 신선함이 살아있는 신선함이 살아있는</label>
                  <!-- !! label 값 아래 자주 구매 상품명이 들어가야 함 -->
                </span>
                <span aria-label="몰 이름">GS Fresh</span>
              </p>
              <!-- START : 실 사용 컴포넌트 -->
              <div class="wrap-product-list">
                <MypageProductItem @popupEvent="popupAction"/>
              </div>
              <!-- END : 실 사용 컴포넌트 -->
            </div>
            <div class="recent-item-list">
              <p class="wrap-chk">
                <span class="inp-chk">
                  <input type="checkbox" name="" aria-label="자주 구매 상품 선택" id="item2-check" value=""  checked="checked">
                  <label for="item2-check" class="hidden">서울 목장의 신선함이 살아있는 저지방 우유 1L 서울 목장의 신선함이 살아있는 신선함이 살아있는L</label>
                  <!-- !! label 값 아래 자주 구매 상품명이 들어가야 함 -->
                </span>
                <span aria-label="몰 이름">GS Fresh</span>
              </p>
              <!-- START : 기획&디자인 검수용 컴포넌트 -->
              <div class="wrap-product-list">
                <MypageProductItem01 @popupEvent="popupAction"/>
              </div>
              <!-- END : 기획&디자인 검수용 컴포넌트 -->
            </div>
            <div class="recent-item-list">
              <p class="wrap-chk">
                <span class="inp-chk">
                  <input type="checkbox" name="" aria-label="자주 구매 상품 선택" id="item3-check" value=""  checked="checked">
                  <label for="item3-check" class="hidden">서울 목장의 신선함이 살아있는 저지방 우유 1L 서울 목장의 신선함이 살아있는 신선함이 살아있는</label>
                  <!-- !! label 값 아래 자주 구매 상품명이 들어가야 함 -->
                </span>
                <span aria-label="몰 이름">GS Fresh</span>
              </p>
              <!-- START : 기획&디자인 검수용 컴포넌트 -->
              <div class="wrap-product-list">
                <MypageProductItem02 @popupEvent="popupAction"/>
              </div>
              <!-- END : 기획&디자인 검수용 컴포넌트 -->
            </div>
            <div class="recent-item-list">
              <p class="wrap-chk">
                <span class="inp-chk">
                  <input type="checkbox" name="" aria-label="자주 구매 상품 선택" id="item4-check" value=""  checked="checked">
                  <label for="item4-check" class="hidden">서울 목장의 신선함이 살아있는 저지방 우유 1L 서울 목장의 신선함이 살아있는 신선함이 살아있는</label>
                  <!-- !! label 값 아래 자주 구매 상품명이 들어가야 함 -->
                </span>
                <span aria-label="몰 이름">달리살다</span>
              </p>
              <!-- START : 기획&디자인 검수용 컴포넌트 -->
              <div class="wrap-product-list">
                <MypageProductItem03 @popupEvent="popupAction"/>
              </div>
              <!-- END : 기획&디자인 검수용 컴포넌트 -->
            </div>
            <!-- END : 상품 리스트 -->
          </div>
          <!-- START : GS Fresh -->
          <div id="tab-contents-gsfresh" aria-labelledby="tab-gsfresh" v-if="this.naviTab.gsfresh">
            <h2 class="hidden">GS fresh</h2>
            <div class="wrap-personalize-filter">
              <div class="personalize-filter-check">
                <div class="filter-input-check">
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="all-check2" value=""  checked="checked">
                    <label for="all-check">전체</label>
                  </span>
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="soldout-check2" value="">
                    <label for="soldout-check">품절상품제외</label>
                  </span>
                  <button class="btn-border btn-xs position-right" aria-label="선택 한 자주 구매 상품">담기</button>
                </div>
              </div>
            </div>
            <!-- START : 상품 리스트 없음 케이스 -->
            <div class="recent-item-list">
              <NoList NoListText="최근 본 상품이 없습니다." :ListType="'mypage-itemlist recent'" />
            </div>
            <!-- END : 상품 리스트 없음 케이스 -->
          </div>
          <!-- END : GS Fresh -->
          <!-- START : 달리살다 -->
          <div id="tab-contents-dalisalda" aria-labelledby="tab-dalisalda" v-if="this.naviTab.dalisalda">
            <!--  -->
          </div>
          <!-- END : 달리살다 -->
          <!-- START : 새벽배송 -->
          <div id="tab-contents-daybreak" aria-labelledby="tab-daybreak" v-if="this.naviTab.daybreak">
            <!--  -->
          </div>
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
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import NoList from '@/components/common/NoList';
import MypageProductItem from '@/components/mypage/MypageProductItem'; // 실 사용 컴포넌트
import MypageProductItem01 from '@/components/_temp/MypageProductItem01'; // 기획, 디자인 확인용
import MypageProductItem02 from '@/components/_temp/MypageProductItem02'; // 기획, 디자인 확인용
import MypageProductItem03 from '@/components/_temp/MypageProductItem03'; // 기획, 디자인 확인용
import PopupDiscountInfo from '@/components/product/PopupDiscountInfo'; // 팝업 - 할인내역
import popupOption from '@/views/md/SC-FO-MD-GF-MP-001'; // 팝업 - 장바구니 옵션
import Footer from '@/components/common/Footer';
import ApiUtils from '@/common/ApiUtils';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "MyPageRecentItem",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '최근 본 상품 상품 < 마이페이지 < %s'
  },
  components: {
    SubDefaultHeader,
    PopupDiscountInfo,
    popupOption,
    NoList,
    MypageProductItem, // 실 사용 컴포넌트
    MypageProductItem01, // 기획, 디자인 확인용
    MypageProductItem02, // 기획, 디자인 확인용
    MypageProductItem03, // 기획, 디자인 확인용
    Footer,
  },
  data() {
    return {
      naviTab: {
       all: true,
       gsfresh: false,
       dalisalda: false,
       daybreak: false,
       simplycook: false
      },
      popup: { // 팝업
        open: false,
        popupSales: false, // 할인 내역 팝업
        popupOption: false, // 장바구니 옵션 팝업
      },
      recentItemList: [],
    };
  },
  methods: {
    tabAction(type) {
      for (let i = 0; i < Object.keys(this.naviTab).length; i++) {
        this.naviTab[Object.keys(this.naviTab)[i]] = false;
      }
      this.naviTab[type] = true;
      this.$refs.tabContents.focus();
    },
   getTabAction(type) {
      this.getRecentItemtList(type);
      this.tabAction(type);
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
    getRecentItemtList: async function() {
     const GsPntInqInputDto = {
    };
    const result= await ApiUtils.get('/fo/cu/mypgmgnt/recent-inquiry-item', null);
    this.recentItemList = result.data.data; // 최근본상품 가져오기
   // this.$gsdialog.alert(JSON.stringify(this.recentItemList));
    },
  },
  mounted() {
   this.getRecentItemtList('all');
   this.getTabAction('all');
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
