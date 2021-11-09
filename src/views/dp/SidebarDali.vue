<template>
  <div
    tabindex="0"
    class="wrap-full-popup total-menu"
    role="dialog"
    aria-modal="true"
    :class="{active : sidebarActive}"
    v-if="sidebarActive"
    ref="sidebar"
  >
    <div class="full-popup-body scroll-area">
      <div class="wrap-user">
        <!-- START : 로그인 상태 -->
        <!-- 4월수정 START : 회원상태별 노출 정보, 회원등급 표기 변경
          1. 로그인 O, 배송지 등록 x
          2. 로그인 O, 배송지 등록 O, 배송지 안내
          3. 비로그인 (로그인 X)
        -->
        <!-- 1. 로그인 O, 배송지 등록 x -->
        <div class="inner" v-if="this.$store.state.dp.isLogin">
          <!-- 수정 : 2020.03.25 v-if코드 추가 -->
          <dl class="wrap-user-info">
            <dt class="hidden">회원등급</dt>
            <dd
              class="user-grade"
              :class="getUserGrade"
              :aria-label="this.$store.state.dp.custGrdNm"
            ></dd>
            <!-- 4월수정 : 회원등급 표기 변경, 등급별 아이콘 클래스 vvip : vvip, vip : vip, Family : fam, Welcom : wel -->
            <dt class="hidden">고객명</dt>
            <dd class="user-name">{{this.$store.state.dp.korName}}</dd>
            <dt class="hidden">배송지명</dt>
            <dd class="user-address">
              <a
                href="javascript:void(0)"
                title="배송지 등록 페이지로 이동"
                class="address"
                @click="getDelivery"
                v-if="$store.state.dp.dlvpInqInputDto == null"
              >배송지 등록</a>
              <button
                v-else
                type="button"
                aria-haspopup="dialog"
                title="배송지 목록 팝업 활성화"
                class="address"
                @click="goDeliverySelect"
              >{{this.$store.state.dp.dlvpInqInputDto.dlvpNm}}</button>
            </dd>
          </dl>
          <p class="delivery-desc" v-if="this.$store.state.dp.sidebarDeliveTimeInfo.toDayStr && this.$store.state.dp.bool_DeliveInfo">
            지금 주문하면
            <strong class="time" aria-live="assertive" aria-atomic="true">
              <a
              href="javascript:void(0)"
              class="time"
              @click="goDeliveryTime">
                {{this.$store.state.dp.sidebarDeliveTimeInfo.toDayStr}}
                {{this.$store.state.dp.sidebarDeliveTimeInfo.deliveTime}}
                도착
              </a>
            </strong>
          </p>
          <p class="delivery-desc" v-else>
            <a
            href="javascript:void(0)"
            class="btn-delivery-time"
            @click="goDeliveryTime">
              배송시간 보기
            </a>
          </p>
        </div>
        <!-- 3. 비로그인 (로그인 X) -->
        <a
          href="javascript:void(0)"
          @click="toLogin"
          class="guide-login"
          title="로그인 페이지로 이동"
          v-else
        >
          <em>로그인</em> 해 주세요
        </a>
        <!-- 4월수정 : 마침표 제거 -->
        <!-- 수정 : 2020.03.25 v-if코드 추가 -->
        <!-- 4월수정 END : 회원상태별 노출 정보, 회원등급 표기 변경 -->
        <!-- START : 앱에서만 노출-마이페이지 에서는 예외 -->
        <gs-link to="/ss/setting" class="router-link-active btn-setting app-only" aria-label="앱설정"></gs-link>
        <!-- END : 앱에서만 노출 -->
        <!-- START : 로그인 상태 -->
        <ul class="wrap-user-btn" v-if="this.$store.state.dp.isLogin">
          <li>
            <a href="javascript:void(0)" @click="toMypage" title="마이페이지로이동">MY</a>
          </li>
          <li>
            <a href="javascript:void(0);" @click="toCoupon" title="쿠폰내역페이지이동">
              쿠폰
              <span class="icon num">{{this.$store.state.dp.couponCount}}</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);" @click="toOrder" title="주문배송페이지이동">
              주문배송
              <span class="icon num">{{$store.state.dp.orderQty}}</span>
            </a>
          </li>
        </ul>
        <!-- END : 로그인 상태 -->
      </div>
      <!-- START : 배너 영역 -->
      <SidebarDaliBannerView />
      <!-- END : 배너 영역 -->
      <!-- START : 탭 형 -->
      <ul class="wrap-menu-btn">
        <li>
          <button
            type="button"
            id="btnCategory"
            class="active"
            aria-controls="btnCategory-contents"
            @click="tabAction('btnCategory','depth01')"
          >
            <em>카테고리</em>
          </button>
        </li>
        <li>
          <button
            type="button"
            id="btnCertificationCpnt"
            aria-controls="btnCertificationCpnt-contents"
            @click="tabAction('btnCertificationCpnt','depth01')"
          >
            <em>인증&middot;성분</em>
          </button>
        </li>
        <li>
          <button
            type="button"
            id="btnBrandList"
            aria-controls="btnBrandList-contents"
            @click="tabAction('btnBrandList','depth01')"
          >
            <em>브랜드</em>
          </button>
        </li>
      </ul>
      <!-- END : 탭 형 -->
      <section class="wrap-menu-category dali-menu">
        <h2 class="hidden">전체메뉴</h2>
        <!-- START : 탭컨텐츠 -->
        <!-- START : 카테고리 -->
        <div id="btnCategory-contents" aria-labelledby="btnCategory" v-if="this.tab.btnCategory">
          <h3 class="hidden">카테고리</h3>
          <!-- 4월 수정 START : 카테고리영역 전체적으로 수정 -->
          <ul class="wrap-depth01 wrap-accordion" data-group="accordionGroup01">
            <li
              :class="classObject(value.dspCtgId)"
              v-for="(value, index) in $store.state.dp.daliMainMenuList"
              :key="index"
            >
              <button
                :id="'accordionBtn'+index"
                class="btn-accordion"
                aria-expanded="true"
                :aria-controls="'accordionContent'+index"
                @click="accordionEvent()"
              >
                <em>{{value.dspCtgNm}}</em>
              </button>
              <div
                :id="'accordionContent'+index"
                class="wrap-dali-depth02-brand accordion-content"
                :aria-labelledby="'accordionBtn'+index"
              >
                <ul class="wrap-depth02" ref="depth02">
                  <li>
                    <img src="@/assets/images/icon/ico_menu_total.png" alt />
                    <gs-link :to="{path: '/dp/product', query: {dspCtgId: value.dspCtgId}}">
                      <span>전체보기</span>
                    </gs-link>
                  </li>
                  <li
                    :class="['menu-'+item.dspCtgId,{open: menu[item.dspCtgId]}]"
                    v-for="item in value.rlowDspCtgListInq"
                    :key="item.dspCtgId"
                  >
                    <img :src="item.bnrImgPathNm" alt />
                    <button @click="depthClickAction(item.dspCtgId)">{{item.dspCtgNm}}</button>
                    <div class="wrap-list-depth">
                      <ul class="wrap-depth03">
                        <li class="total">
                          <gs-link
                            v-if="true"
                            :to="{path: '/dp/product', query: {dspCtgId: item.dspCtgId}}"
                          >
                            <span>전체보기</span>
                          </gs-link>
                        </li>
                        <li v-for="list in $store.state.dp.lowDepthMenuList" :key="list.dspCtgId">
                          <gs-link
                            v-if="true"
                            :to="{path: '/dp/product', query: {dspCtgId: list.dspCtgId}}"
                          >
                            <span>{{list.dspCtgNm}}</span>
                          </gs-link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <div
                    class="wrap-category-banner"
                    v-for="(info, j) in value.rdspMenuConrCntInfo"
                    :key="j"
                  >
                    <a href="javascript:void(0);">
                      <figure>
                        <img :src="info.ctnsPathNm" :alt="info.imgAltTextCnts" />
                        <!-- {{info.ctnsPathNm}} -->
                      </figure>
                    </a>
                  </div>
                </ul>
              </div>
            </li>
          </ul>
          <!-- 4월 수정 END : 카테고리영역 전체적으로 수정 -->
        </div>
        <!-- END : 카테고리 -->
        <!-- START : 인증성분 -->
        <div
          id="btnCertificationCpnt-contents"
          aria-labelledby="btnCertificationCpnt"
          v-if="this.tab.btnCertificationCpnt"
        >
          <h3 class="hidden">인증성분</h3>
          <!-- START : 선택 된 필터 값 (값이 없을 때는 전체 hidden) -->
          <div class="filter-selected" v-show="true">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(filterItems, index) in filterData" :key="index">
                {{filterItems}}
                <button @click="delFilterItem(index)" :value="filterItems">
                  <span class="hidden">필터 삭제</span>
                </button>
              </swiper-slide>
            </swiper>
          </div>
          <!-- END : 선택 된 필터 값 (값이 없을 때는 전체 hidden) -->
          <!-- START : 2020.03.05 성분 아이콘 이미지 전체적으로 변경 -->
          <ul class="wrap-depth01" data-group="accordionGroup02">
            <li
              class="menu-ingredient open"
              v-for="(value, index) in $store.state.dp.itemAttrInfo"
              :key="index"
            >
              <button
                :id="'accordionBtn'+index"
                class="btn-accordion"
                aria-expanded="true"
                :aria-controls="'accordionContent'+index"
                @click="accordionEvent()"
              >
                <em>{{value.itemAttrNm}}</em>
              </button>
              <ul
                class="ingredient-list accordion-content"
                :id="'accordionContent'+index"
                :aria-labelledby="'accordionBtn'+index"
              >
                <li v-for="(item) in value.rmdItemAttrItmInq" :key="item.itemAttrItmId">
                  <div class="ingredient-chk">
                    <span class="area-chk">
                      <figure>
                        <img :src="item.itemAttrItmImgPathNm" :alt="item.itemAttrItmNm" />
                      </figure>
                      <input
                        type="checkbox"
                        :name="'ingredient_'+item.itemAttrItmNm"
                        :id="'ingredient_'+item.itemAttrItmNm"
                        :value="item.itemAttrItmNm"
                        v-model="filterData"
                        @input="updateSelected"
                      />
                    </span>
                    <label for="ingredient01">{{item.itemAttrItmNm}}</label>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <!-- END : 2020.03.05 성분 아이콘 이미지 전체적으로 변경 -->
          <button class="btn-reflection" @click="searchitemAttr">적용</button>
        </div>
        <!-- END : 인증성분 -->
        <!-- START : 브랜드 -->
        <div id="btnBrandList-contents" aria-labelledby="btnBrandList" v-if="this.tab.btnBrandList">
          <h3 class="hidden">브랜드</h3>
          <!-- START : 브랜드 my it,가나다순 탭버튼 -->
          <!-- 4월 수정 START : 탭 추가 / ID값 / aria controls / 텍스트 수정-->
          <ul class="wrap-brand-btn">
            <li>
              <button
                type="button"
                aria-label="my it 버튼"
                id="btnMyIt"
                class="active"
                aria-controls="btnMyIt-contents"
                @click="tabAction('btnMyIt','depth02')"
              >My it</button>
            </li>
            <li>
              <button
                type="button"
                aria-label="국내배송 버튼"
                id="btnGaNaDa"
                aria-controls="btnGaNaDa-contents"
                @click="tabAction('btnGaNaDa','depth02')"
              >국내배송</button>
            </li>
            <li>
              <button
                type="button"
                aria-label="해외직구 버튼"
                id="btnABC"
                aria-controls="btnABC-contents"
                @click="tabAction('btnABC','depth02')"
              >해외직구</button>
            </li>
          </ul>
          <!-- 4월 수정 END :  탭 추가 / ID값 / aria controls / 텍스트 수정 -->
          <!-- END : 브랜드 my it,가나다순 탭버튼 -->
          <!-- START : 브랜드 탭컨텐츠 -->
          <div ref="tabContents02">
            <div id="btnMyIt-contents" aria-labelledby="btnMyIt" v-if="this.innerTab.btnMyIt">
              <!-- !! 로그인 전 케이스 -->
              <NoList :ListType="'my-brand'" v-if="!this.$store.state.dp.isLogin">
                <p slot="txt-giftnolist">
                  로그인을 하시면
                  <br />찜한 브랜드를 보실 수 있습니다
                </p>
              </NoList>
              <!-- !! 로그인 후 케이스 -->
              <NoList
                :ListType="'my-brand'"
                v-else-if="this.$store.state.dp.isLogin && !(myItList.length>0)"
              >
                <p slot="txt-giftnolist">
                  <i class="ico-like">
                    <span class="hidden">찜하기</span>
                  </i>를 클릭 하여
                  <br />나만의 즐겨찾기 브랜드를 완성해 보세요
                </p>
              </NoList>
              <!-- 6월 추가 END : 리스트 없음 추가 -->
              <div
                class="wrap-my-brand"
                v-else-if="this.$store.state.dp.isLogin && (myItList.length>0)"
              >
                <ul class="my-brand" v-if="myItList">
                  <li v-for="(item, index) in myItList" :key="index">
                    <figure>
                      <gs-link :to="{ path: '/dp/brand/' + item.dspCtgId }">
                        <img
                          :src="getImg(item.bnrImgPathNm)"
                          :alt="item.brandNm+' 로고'"
                        />
                      </gs-link>
                    </figure>
                    <em class="brand-name" v-if="item.dspCtgNm != null">{{ item.dspCtgNm }}</em>
                    <em class="brand-name" v-else>{{ item.brandNm }}</em>
                    <!-- 임시 추후 dspCtgNm으로 변경 -->
                    <button
                      class="btn-it active"
                      aria-pressed="true"
                      @click="myItAction(item.brandId)"
                    >
                      <span class="hidden">찜하기</span>
                    </button>
                  </li>
                </ul>
                <!-- 4월 수정 START : 더보기 버튼 추가 -->
                <div class="btn-more-detail-view" :class="{open : viewMore}" v-if="myItMore">
                  <button aria-label="브랜드 더보기 버튼" class="btn-border" @click="chkViewMore(viewMore)">
                    <span aria-live="assertive" aria-atomic="true">{{viewMore ? '닫기': '더보기'}}</span>
                  </button>
                </div>
                <!-- 4월 수정 END : 더보기 버튼 추가 -->
              </div>
              <!-- START : Base Brand -->
              <SideBaseBrandView @clickTab="tabAction" @getMyItList="getMyItList" @refBrand="refBrand" />
              <!-- END : Base Brand -->
            </div>
            <div id="btnGaNaDa-contents" aria-labelledby="btnGaNaDa" v-if="this.innerTab.btnGaNaDa">
              <!-- START : 브랜드 가다나 순 -->
              <SideBarBrandGaNaDa @getMyItList="getMyItList" />
              <!-- END :브랜드 가다나 순 -->
            </div>
            <!-- 4월 수정 START : 해외직구 탭 추가 -->
            <div id="btnABC-contents" aria-labelledby="btnABC" v-if="this.innerTab.btnABC">
              <!-- START : 브랜드 ABC -->
              <SideBarBrandABC />
              <!-- END :브랜드 ABC -->
            </div>
            <!-- 4월 수정 END : 해외직구 탭 추가 -->
          </div>
          <!-- END : 브랜드 탭컨텐츠 -->
        </div>
        <!-- END : 브랜드 -->
        <!-- END : 탭컨텐츠 -->
      </section>
      <!-- START : 테마관 -->
      <SidebarDaliOtherBannerView />
      <!-- END : 테마관 -->
      <button
        class="btn-close"
        @click="sidebarCloseAction"
        @keydown.9="tabFocusRemove('sidebarCloseAction')"
        aria-label="포커스 아웃 시 팝업 닫기"
      >
        <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
    <!-- START : layer POPUP -->
    <transition name="toastPopup"
      v-on:after-enter="toastPopupAfterEnter"
      v-on:leave="toastPopupEnterLeave"
    >
      <PopupToast :ToastMessage="toastMessage" @popupEvent="popupAction" v-if="popup.popupToastAlarm" :popupToast="popup.popupToastAlarm" popupToastType="popupToastAlarm" />
    </transition>
    <!-- START : layer POPUP -->
  </div>
</template>

<script>
import SidebarDaliBannerView from '@/views/dp/SidebarDaliBannerView';
import SidebarDaliOtherBannerView from '@/views/dp/SidebarDaliOtherBannerView';
import SideBaseBrandView from '@/views/dp/SideBaseBrandView';
import SideBarBrandGaNaDa from '@/views/dp/SideBarBrandGaNaDa';
import SideBarBrandABC from '@/views/dp/SideBarBrandABC';
import AccordionMixin from '@/mixins/AccordionMixin';
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import NoList from '@/components/common/NoList';
import SiteUtils from '@/common/SiteUtils';
import ApiUtils from '@/common/ApiUtils';
import PopupToast from '@/components/common/PopupToast';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import ItemTemplete from '@/common/ItemTemplete';
import DateUtils from '@/common/DateUtils';

export default {
  name: 'TotalCategoryMenu',
  mixins: [AccordionMixin, LayPopupMixin],
  /* 수정 START : 2020.03.25 props 추가 */
  props: ['isLogin', 'sidebarActive'],
  /* 수정 END : 2020.03.25 props 추가 */
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '전체메뉴 < %s',
  },
  components: {
    SidebarDaliBannerView,
    SidebarDaliOtherBannerView,
    SideBaseBrandView,
    SideBarBrandGaNaDa,
    SideBarBrandABC,
    swiper,
    swiperSlide,
    PopupToast,
    NoList,
  },
  data() {
    return {
      toastMessage: this.$store.state.dp.loginText,
      brandIdProp: '',
      viewMore: false,
      sidebarInit: false, // 카테고리 메뉴 열린 상태
      menu: {}, // 1depth 카테고리
      tab: {
        btnCategory: true,
        btnCertificationCpnt: false,
        btnBrandList: false,
      },
      innerTab: {
        btnMyIt: true,
        btnGaNaDa: false,
      },
      swiperOption: {
        slidesPerView: 'auto',
        freeMode: true,
      },
      filterData: [],
      selectedData: [], // 선택한 이름, 인덱스
      filterNum: 0,
      overTen: false,
      myItList: [], // 찜한 브랜드 목록
      myItListAll: [], // 찜한 브랜드 목록
      myItMore: null, // true false 값으로 더보기 on off
      popup: {
        popupToastAlarm: false,
      },
      cookie: {}, // 쿠키값
      brandSearch: '',
      isapp: CookieUtils.getMdaType() == '04' ? true : false,
      cmmSteId: CookieUtils.getCmmSteId(),
    };
  },
  computed: {
    getUserGrade() {
      const custGrdCd = this.$store.state.dp.custGrdCd;
      let strCustGrd = '';
      switch (custGrdCd) {
        case '01':
          strCustGrd = 'vvip';
          break;
        case '02':
          strCustGrd = 'vip';
          break;
        case '03':
          strCustGrd = 'fam';
          break;
        case '04':
          strCustGrd = 'wel';
          break;
        default:
          strCustGrd = 'wel';
          break;
      }
      return strCustGrd;
    },
  },
  async created() {
    // 쿠키셋
    const $this = this;
    await LoginUtils.nonLoginPromise().then(function(response) {
      $this.cookie = $this.getCookieMap();
    });
    try {
      /* dispatch setTimeout 작업해야됨. */
      await this.$store.dispatch('getDisplayMenuCategoryInfo', '');
      this.$store.dispatch('getItemAttrInfo', '');
      // 로그인 했을 때
      if (this.$store.state.dp.isLogin) {
        const cmmMbrNo = await ApiUtils.get('/dp/ds/dspctgmgnt/get-cmm-mbr-no');
        this.$store.dispatch('getMemberInfo', '');
        this.$store.dispatch('getCouponInfo', '');
        // 주문배송갯수 카운트
        this.$store.dispatch('getDeliveryCount', '');
        this.$store.dispatch('getDeliveryplace', '');
        // myIt 가져오기
        const param = { cmmMbrNo: cmmMbrNo.data };
        this.getMyItList(param);
      }
      const odBsktUuid = CookieUtils.getOdBsktUuid();
      const bparams = {
        odBsktUuid: odBsktUuid,
      };
      this.$store.dispatch('getBsktQtyInfo', bparams);
      this.getDeliveTimeInfo();
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  async mounted() {
    console.log('로그인한 회원번호 : ', this.$store.state.dp.cmmMbrNo);
    await LoginUtils.nonLoginPromise().then(function(response) {
      console.log('해외직구 매장 ID storId', CookieUtils.getCookie('STOR_ID'));
      console.log(
        '공급업체코드 supplFirmCd',
        CookieUtils.getCookie('SUPPL_FIRM_CD')
      );
      console.log('접속몰 mallId', CookieUtils.getCookie('MALL_ID'));
      console.log(
        '사이트접속매체유형코드 steConnMdaTypeCd',
        CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD')
      );
    });
  },
  methods: {
    toastPopupAfterEnter(el) {
      el.style.opacity = 1;
    },
    toastPopupEnterLeave(el) {
      el.style.opacity = 0;
    },
    chkMyIt(delYn) {
      if (this.$store.state.dp.isLogin) {
        if (delYn == 'N') {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    searchitemAttr() {
      const data = this.filterData;
      if (data.length === 0) {
        this.$gsdialog.alert('선택된 검색 조건이 없습니다.');
        return;
      }
      const gubun = '|';
      let searchList = '';
      data.map((value, index) => {
        searchList += (index > 0 ? gubun : '') + value;
      });

      const param = {
        keyword: searchList,
        mall: 'dalisalda',
        t: Date.now(),
      };
      this.$router
        .push({ name: 'SearchResult', query: param })
        .catch(err => {});
    },
    chkViewMore(viewMore) {
      this.viewMore = !this.viewMore;
      if (this.viewMore) {
        // 더보기
        this.myItList = this.myItListAll;
      } else {
        this.myItList = this.myItListAll.slice(0, 6);
      }
    },
    refBrand(delYn) {
      console.log('fromBest');
      // 브랜드상세 수정
      this.$emit('refBrand', delYn);
    },
    async getMyItList(param) {
      try {
        if (this.viewMore) {
          // true인 경우 초기화
          this.viewMore = false;
        }
        console.log('찜리스트 갱신');
        console.log(param);
        const respon = await ApiUtils.get(
          '/fo/md/itemaddinfomgnt/gnbBrand-list-favorite',
          param
        );
        const myItLen = respon.data.data.length;
        if (myItLen > 6) {
          this.myItMore = true;
        } else {
          this.myItMore = false;
        }
        this.myItListAll = respon.data.data;
        this.myItList = this.myItListAll.slice(0, 6);
        console.log(this.myItList);
        console.log('this.myItList');
      } catch (e) {
        console.log(e);
      }
    },
    getCookieMap() {
      const custGrdCdYn = CookieUtils.getCookie('CUST_GRD_CD') != '';
      return {
        storId: CookieUtils.getCookie('STOR_ID'),
        supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
        mallId: CookieUtils.getCookie('MALL_ID'),
        dspScrSpCd: '02',
        mdaType: CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD'),
        custGrdCd: CookieUtils.getCookie('CUST_GRD_CD'),
        chanlId: CookieUtils.getCookie('CHANL_ID'),
        mbrTypeCd: CookieUtils.getCookie('MBR_TYPE_CD'),
      };
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    resetBtn() {
      this.$refs.textId.value = '';
    },
    delFilterItem(index) {
      const $btnIt = event.target;
      // 인증성분 필터에서 x버튼 누를시 체크해제
      this.filterData.splice(index, 1);
      this.filterNum--;
    },
    updateSelected(evt) {
      const elm = evt.target || evt.srcElement;
      if (elm.checked === false) {
        this.filterNum--;
        const idx = this.filterData.indexOf(elm.value);
        if (idx > -1) {
          this.filterData.splice(idx, 1);
        }
      } else if (elm.checked === true) {
        if (this.filterNum >= 10) {
          // 10개 이상이면 선택불가
          elm.checked = false;
          this.$gsdialog.alert('최대 10개까지 선택 가능합니다.');
        } else {
          this.filterNum++;
          this.filterData.push(elm.value);
        }
      }
    },
    classObject(val) {
      let classObj = '';
      if (val == this.$store.state.dp.categoryInfo.daliDspCtgId1) {
        classObj = 'menu-eat';
      } else if (val == this.$store.state.dp.categoryInfo.daliDspCtgId2) {
        classObj = 'menu-skin';
      } else if (val == this.$store.state.dp.categoryInfo.daliDspCtgId3) {
        classObj = 'menu-care';
      } else if (val == this.$store.state.dp.categoryInfo.daliDspCtgId4) {
        classObj = 'menu-use';
      } else if (val == this.$store.state.dp.categoryInfo.daliDspCtgId5) {
        classObj = 'menu-overseas';
      }
      return classObj + ' open';
    },
    popupAction(type) {
      if (this.modalActive.popupTotalMenu) {
        this.$emit('popupEvent', 'popupTotalMenu');
        this.modalActiveEvent('popupTotalMenu');
      } else {
        // 팝업 활성/비활성
        this.popup[`${type}`] = !this.popup[`${type}`];
        this.popup.open = !this.popup.open;
      }
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
    depthClickAction(value) {
      // 카테고리 메뉴 활성 상태 변경
      const $li = event.target.parentNode;
      const selectedClass = $li.classList[0].split('-')[1];
      if (!this.menu[selectedClass]) {
        this.menuReset();
      }
      this.$set(this.menu, selectedClass, !this.menu[selectedClass]);
      this.sidebarInit = true;
      // 3depth Data
      this.getData(value);
    },
    async getData(dspCtgId) {
      try {
        this.$store.dispatch('getLowDisplayCategoryInfo', dspCtgId);
      } catch (e) {
        this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
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
      this.tabAction('btnCategory', 'depth01');
    },
    async myItAction(brandId) {
      // 찜하기 버튼 클릭시 실행
      if (this.$store.state.dp.isLogin) {
        // 로그인시 myIt 가능
        const param = {
          brandId: brandId,
          userId: this.$store.state.dp.userId,
          cmmMbrNo: this.$store.state.dp.cmmMbrNo,
        };
        console.log(this.$store.state.dp.cmmMbrNo);
        const $btnIt = event.target;
        const activeClass = 'active';
        if ($btnIt.classList.contains(activeClass)) {
          // 찜삭제
          console.log(brandId, '찜삭제');
          $btnIt.classList.remove(activeClass);
          $btnIt.setAttribute('aria-pressed', 'false');
          const response = await ApiUtils.put('/fo/md/itemaddinfomgnt/gnbBrand-favorite-update', param);
          console.log(response);
          if (response.data > 0) {
            this.toastMessage = this.$store.state.dp.offText; // 찜해제 메세지
            this.popup.popupToastAlarm = true;
            // 베스트 브랜드 수정
            const idx = this.$store.state.dp.baseBrandList.findIndex(
              i => i.brandId == brandId
            );
            if (!(idx<0)) {
              this.$store.state.dp.baseBrandList[idx].delYn = 'Y';
            }
            // 국내배송 수정
            const idx2 = this.$store.state.dp.ganadaBrandList.findIndex(
              i => i.brandId == brandId
            );
            if (!(idx2<0)) {
              this.$store.state.dp.ganadaBrandList[idx].delYn = 'Y';
            }
            // gnb 브랜드 수정
            const idx3 = this.$store.state.dp.brandList.findIndex(
              i => i.brandId == brandId
            );
            if (!(idx3<0)) {
              this.$store.state.dp.brandList[idx3].delYn = 'Y';
            }
            // 브랜드상세 수정
            this.$emit('refBrand', 'Y');
            const $this = this;
            // 성공시 sidebar의 myItList를 새로 그린다
            $this.getMyItList(param).then(() => {
              // 버튼 위치 클래스 다시 active로 변경
              $btnIt.classList.add(activeClass);
              $btnIt.setAttribute('aria-pressed', 'true');
            });
          }
        } else {
          console.log('[gnbBrand-favorite-update] 실패');
        }
      } else {
        console.log('비로그인 찜');
        // 비로그인시 myIt 불가
        this.toastMessage = this.$store.state.dp.loginText; // 찜해제 메세지
        this.popup.popupToastAlarm = true;
      }
    },
    sidebarCloseAction() {
      this.menuReset();
      if (this.sidebarActive) {
        this.$emit('sidebarEvent');
      }
    },
    addressListAction() {
      // 4월수정 : 팝업 - 배송지목록 추가
      this.$emit('deliveryListEvent');
    },
    toLogin() {
      // 로그인 페이지 이동
      const returnUrl = encodeURIComponent(location.href);
      const loginUrl = SiteUtils.commo('/cu/login?returnUrl=' + returnUrl);
      location.href = loginUrl;
    },
    toMypage() {
      // 마이페이지 이동
      const myPageUrl = SiteUtils.commo('/cu/my_page');
      location.href = myPageUrl;
    },
    toCoupon() {
      const myCoupon = SiteUtils.commo('/ev/coupon_list');
      location.href = myCoupon;
    },
    toOrder() {
      const bsktUrl = SiteUtils.commo(
        '/cs/orddeliv/ord_deliv_list?selectDelivStatCd='
      );
      location.href = bsktUrl;
    },
    getDelivery() {
      const loginUrl = SiteUtils.commo('/cu/delivery_place_add');
      location.href = loginUrl;
    },
    goDeliverySelect() {
      const loginUrl = SiteUtils.commo('/cu/delivery_place_list');
      location.href = loginUrl;
    },
    goDeliveryTime() {
      let loginUrl;
      if ( this.cmmSteId === '1' ) {
        loginUrl = SiteUtils.freshmo('/md/delivery_time');
      } else if ( this.cmmSteId === '2' ) {
        loginUrl = SiteUtils.dalimo('/md/delivery_time');
      } else {
        loginUrl = SiteUtils.marketformo('/md/delivery_time');
      }
      location.href = loginUrl;
    },
    async getDeliveTimeInfo() {
      const deliveParam = {
        delivTypeCd: this.$store.state.dp.daybreak ? '04' : '01',
        supplFirmCd: this.$store.state.dp.daybreak
          ? this.$store.state.dp.dayBreakInfo.supplFirmCd_dayBreak
          : CookieUtils.getCookie('SUPPL_FIRM_CD'),
      };
      const response = await ApiUtils.post(
        '/fo/od/deliv-info/now-order-deliv-time',
        deliveParam
      );
      if (response.data.success === true) {
        const deliveTime = response.data.data;
        const date = new Date();
        const toDay = DateUtils.format(date, 'YYYY-MM-DD');
        const delivDt = DateUtils.format(deliveTime.delivDt, 'YYYY-MM-DD');

        const toDayArray = toDay.split('-');
        const delivDtArray = delivDt.split('-');

        const toDayDate = new Date(
          toDayArray[0],
          Number(toDayArray[1]) - 1,
          toDayArray[2]
        );
        const delivDtDate = new Date(
          delivDtArray[0],
          Number(delivDtArray[1]) - 1,
          delivDtArray[2]
        );
        const getTime = '';
        const intTime = '';
        const strTime = intTime < 12 ? '오전 ' : '오후 ';
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[new Date(delivDt).getDay()];
        const betweenDt =
          (delivDtDate.getTime() - toDayDate.getTime()) / 1000 / 60 / 60 / 24;
        let toDayStr = '';
        switch (betweenDt) {
          case 0:
            if (intTime != '') {
              toDayStr = '오늘 ' + strTime;
            } else {
              toDayStr = '오늘 ';
            }
            break;
          case 1:
            if (intTime != '') {
              toDayStr = '내일 ' + strTime;
            } else {
              toDayStr = '내일 ';
            }
            break;
          default:
            toDayStr =
              delivDtArray[1] + '/' + delivDtArray[2] + '(' + dayOfWeek + ')';
            break;
        }
        this.toDayStr = toDayStr;
        this.deliveTime =
          this.getConversion(deliveTime.delivBeginTm) +
          ' ~ ' +
          this.getConversion(deliveTime.delivEndTm);
        this.dataInfo = this.toDayStr + this.deliveTime + '도착';
        this.$store.state.dp.sidebarDeliveTimeInfo.toDayStr = this.toDayStr;
        this.$store.state.dp.sidebarDeliveTimeInfo.deliveTime = this.deliveTime;
      }
    },
    getConversion(time) {
      let rStrTime = '';
      if (time != null && time.length == 4) {
        const rTime = time;
        rStrTime = rTime.substring(0, 2) + ':' + rTime.substring(2, 4);
      }
      return rStrTime;
    },
  },
  updated() {
    if (this.sidebarActive && !this.sidebarInit) {
      if (Object.keys(this.menu).length <= 0) {
        // this.menuInit();
      }
      this.$refs.sidebar.focus();
    }
  },
};
</script>

<style scoped>
.full-popup-body {
  -webkit-overflow-scrolling: auto;
}
</style>
