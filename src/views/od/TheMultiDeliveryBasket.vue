<!--
views/od/SC-FO-OD-GS-MS-017
-->
<template>
  <div :class="[{'wrap-cart' : true}, siteClass]"><!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <SubDefaultHeader headerText="여러 곳으로 보내기" :tabbar="false" />
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="addrlist-slide">
        <!-- START : pagination -->
        <ul class="slide-pagination" aria-live="assertive" aria-atomic="true">
          <li class="disable">
            <button type="button" class="btn-paging" @click="toSlide(0)"><span class="txt">배송지</span>1</button>
            <button type="button" class="btn-add" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupAddrActive"><span class="hidden">배송지 목록</span></button>
          </li>
          <li class="disable">
            <button type="button" class="btn-paging" @click="toSlide(1)"><span class="txt">배송지</span>2</button>
            <button type="button" class="btn-add" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupAddrActive"><span class="hidden">배송지 목록</span></button>
          </li>
           <li class="disable">
            <button type="button" class="btn-paging" @click="toSlide(2)"><span class="txt">배송지</span>3</button>
            <button type="button" class="btn-add" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupAddrActive"><span class="hidden">배송지 목록</span></button>
          </li>
           <li class="disable">
            <button type="button" class="btn-paging" @click="toSlide(3)"><span class="txt">배송지</span>4</button>
            <button type="button" class="btn-add" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupAddrActive"><span class="hidden">배송지 목록</span></button>
          </li>
           <li class="disable">
            <button type="button" class="btn-paging" @click="toSlide(4)"><span class="txt">배송지</span>5</button>
            <button type="button" class="btn-add" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupAddrActive"><span class="hidden">배송지 목록</span></button>
          </li>
           <li class="disable">
            <button type="button" class="btn-paging" @click="toSlide(5)"><span class="txt">배송지</span>6</button>
            <button type="button" class="btn-add" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupAddrActive"><span class="hidden">배송지 목록</span></button>
          </li>
           <li class="disable">
            <button type="button" class="btn-paging" @click="toSlide(6)"><span class="txt">배송지</span>7</button>
            <button type="button" class="btn-add" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupAddrActive"><span class="hidden">배송지 목록</span></button>
          </li>
           <li class="disable">
            <button type="button" class="btn-paging" @click="toSlide(7)"><span class="txt">배송지</span>8</button>
            <button type="button" class="btn-add" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupAddrActive"><span class="hidden">배송지 목록</span></button>
          </li>
           <li class="disable">
            <button type="button" class="btn-paging" @click="toSlide(8)"><span class="txt">배송지</span>9</button>
            <button type="button" class="btn-add" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupAddrActive"><span class="hidden">배송지 목록</span></button>
          </li>
           <li class="disable">
            <button type="button" class="btn-paging" @click="toSlide(9)"><span class="txt">배송지</span>10</button>
            <button type="button" class="btn-add" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupAddrActive"><span class="hidden">배송지 목록</span></button>
          </li>
        </ul>
        <!-- END : pagination -->
        <!-- START : slide -->
        <swiper :options="swiperAddrOption" ref="myAddrSwiper">
          <!-- START : 배송지 1 -->
          <swiper-slide v-for="(mbrDlvp, index) in multiDelivBskt.mbrDlvpList" v-bind:key="mbrDlvp.mbrDlvpSeqno">
            <section class="addrlist-inner" v-if="bsktInqRsltDtoList !== null && Object.entries(bsktInqRsltDtoList).length > 0">
              <h2 class="hidden">배송지 1</h2>
              <div class="shadow">
                <!-- START : 배송지 정보 -->
                <div class="receive-delivery-info">
                  <div class="my-address">
                    <p><strong>{{mbrDlvp.encAdrsNm}}</strong> [{{mbrDlvp.dlvpNm}}]</p>
                    <p><span class="code">{{mbrDlvp.zipcd}}</span> {{mbrDlvp.encStnmBaseAddr}} {{mbrDlvp.encStnmDtlAddr}}</p>
                  </div>
                  <button type="button" class="btn-del" @click="deleteSlide(index)"><span class="hidden">배송지 및 상품정보 삭제</span></button>
                </div>
                <!-- END : 배송지 정보 -->
                <h3 class="title">
                  <span class="inp-chk bg">
                    <input type="checkbox" name="" :id="`${'selectAll' + index}`" value="" v-model="bsktInqRsltDtoList[index].delivTypeDtoList[0].chk" @click="setDelivTypeChk(index)">
                    <label :for="`${'selectAll' + index}`">전체</label>
                  </span>
                  <span class="price-info">
                    {{mbrDlvp.selBsktIds.length}}개 <span class="price"><strong>{{comma(bsktInqRsltDtoList[index].totItemDcSprc + bsktInqRsltDtoList[index].totDlfee - (bsktInqRsltDtoList[index].totItemCpnDcAmt + bsktInqRsltDtoList[index].totDblDcCpnDcAmt) - bsktInqRsltDtoList[index].totCmplDcAmt)}}</strong>원</span>
                  </span>
                </h3>
              </div>
              <!-- START : 제품목록 -->
              <div class="cart-category-product">
                <div class="list-content scroll-area">
                  <CartMultiProductList @popupEvent="popupAction" :delivTypeDtoList="bsktInqRsltDtoList[index].delivTypeDtoList" @updateBskt="updateBskt"  @setChk="setChk" @openCouponPopup="openCouponPopup" :index="index" :pmbsJoinPrcnCd="bsktInqRsltDtoList[0].pmbsJoinPrcnCd" @popupDateActive="popupDateActive"/>
                  <p class="check-option-area shadow" v-if="index === 0">
                    <!-- 수정 START : 2020.02.17 마크업 변경 -->
                    <button class="btn btn-border" @click="copyQtyAndOptn">
                      옵션/수량 모두 동일하게 적용하기
                    </button>
                    <!-- 수정 END : 2020.02.17 마크업 변경 -->
                  </p>
                </div>
              </div>
              <!-- END : 제품목록 -->
            </section>
          </swiper-slide>
          <!-- END : 배송지 1 -->
        </swiper>
        <!-- END : slide -->
        <!-- START : 하단 고정 버튼 (퀵메뉴) -->
        <MultiTotalPrice v-if="bsktInqRsltDtoList !== null && Object.entries(bsktInqRsltDtoList).length > 0" @popupEvent="popupAction" :multiDelivBskt="multiDelivBskt" :bsktInqRsltDtoList="bsktInqRsltDtoList" @goOrder="goOrder"/>
        <PopupDeliveryPrice @popupEvent="popupAction" v-if="bsktInqRsltDtoList !== null && Object.entries(bsktInqRsltDtoList).length > 0 && this.popup.popupDeliveryPrice" :bsktInqRsltDtoList="bsktInqRsltDtoList"/> <!-- 팝업 - 배송비 안내 -->
        <!-- END : 하단 고정 버튼 (퀵메뉴) -->
      </div>
      <!-- START : layer POPUP -->
      <popupMutiAddrList @popupEvent="popupAction" v-if="this.popup.popupMutiAddrList" :bsktIds="multiDelivBskt.baseBsktIds" type="multiBskt" @refreshBskt="refreshBskt"/> <!-- 팝업 - 다중배송지 -->
      <PopupAlert2plus1 @popupEvent="popupAction" v-if="this.popup.popupAlert2plus1" /> <!-- 팝업 - 2+1 행사수량 확인 -->
      <PopupSpecialGift @popupEvent="popupAction" v-if="this.popup.popupSpecialGift" /> <!-- 팝업 - 금액별 사은품 팝업 -->
      <PopupOptionList @popupEvent="popupAction" v-if="this.popup.popupOptionList" /> <!-- 팝업 - 단일옵션 -->
      <PopupOptionDate @popupEvent="popupAction" v-if="this.popup.popupOptionDate" /> <!-- 팝업 - 단일, 날짜 옵션 -->
      <PopupDateSelect @popupEvent="popupAction" v-if="this.popup.popupDateSelect" :delivDt="delivDt" @selectDelivDt="selectDelivDt" :bskt="bskt"/> <!-- 팝업 - 날짜변경 -->
      <PopupAlert @popupEvent="popupAction" v-if="this.popup.popupAlert" /> <!-- 팝업 - 입고알림 -->
      <PopupDiscountInfo @popupEvent="popupAction" v-if="this.popup.popupDiscountInfo" :bsktDiscountInfo="bsktDiscountInfo" :pmbsJoinPrcnCd="bsktInqRsltDtoList[0].pmbsJoinPrcnCd"/> <!-- 팝업 - 할인 내역 -->
      <PopupCouponChange @popupEvent="popupAction" v-if="this.popup.popupCouponList" :itemCpnList="itemCpnList" :dblDcCpnList="dblDcCpnList" :itemNm="itemNm" :bsktId="bsktId" @useCpn="useCpn" :applItemCpnList="applItemCpnList" :applDblDcCpnList="applDblDcCpnList" :itemDcSprc="itemDcSprc" :bsktQty="bsktQty" :cmplDcAmt="cmplDcAmt"/> <!-- 팝업 - 쿠폰변경 -->
      <!-- END : layer POPUP -->
    </main>
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import MultiTotalPrice from '@/views/od/MultiTotalPrice'; // 최종금액
import CartMultiProductList from '@/components/_temp/CartMultiProductList'; // 상품 리스트
/* END : 실 사용 컴포넌트 */
/* START : 레이어 팝업 */
import PopupMutiAddrList from '@/views/od/PopupMutiAddrList'; // 팝업 - 다중 배송지
import PopupSpecialGift from '@/views/od/PopupSpecialGift'; // 팝업 - 금액대별 사은품
import PopupOptionList from '@/views/od/PopupOptionList'; // 팝업 - 단일옵션
import PopupOptionDate from '@/views/od/PopupOptionDate'; // 팝업 - 단일옵션
import PopupDateSelect from '@/views/od/PopupDateSelect'; // 팝업 - 날짜변경
import PopupAlert from '@/views/od/PopupAlert'; // 팝업 - 입고알림
import PopupCouponChange from '@/views/od/PopupCouponChange'; // 팝업 - 쿠폰변경
import PopupDiscountInfo from '@/views/od/PopupDiscountInfo'; // 팝업 - 할인 내역
import PopupAlert2plus1 from '@/views/od/PopupAlert2plus1'; // 2+1 행사수량 확인 조르기 팝업
import PopupDeliveryPrice from '@/views/od/PopupDeliveryPrice'; // 팝업 - 배송비 안내
/* END : 레이어 팝업 */
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "CartMultiDelivery",
  data() {
    const $this = this;
    return {
      bskt: {},
      delivDt: '',
      multiDelivBskt: {},
      bsktInqRsltDto: {},
      bsktInqRsltDtoList: [],
      bsktDiscountInfo: {},
      itemCpnList: [],
      dblDcCpnList: [],
      itemNm: '',
      bsktId: '',
      itemDcSprc: 0,
      bsktQty: 0,
      cmplDcAmt: 0,
      applItemCpnList: [],
      applDblDcCpnList: [],
      popup: { // 팝업
        open: false,
        popupMutiAddrList: false,
        popupSpecialGift: false,
        popupEventProduct: false,
        popupOptionList: false,
        popupOptionDate: false,
        popupDateSelect: false,
        popupAlert: false,
        popupSimilarity: false,
        popupAlertSimilarity: false,
        popupTodayDelivery: false,
        popupDawnDelivery: false,
        popupParcelDelivery: false,
        popupOverseasDelivery: false,
        popupGiftSingle: false,
        popupGiftDouble: false,
        popupDiscountInfo: false,
        popupCouponList: false,
        popupDeliveryPrice: false,
        popupAlert2plus1: false,
        popupCertification: false,
      },
      showMore: false, // 하단 최종금액 버튼
      swiperAddrOption: {
        slidesPerView: 1.2,
        spaceBetween: 9,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        on: {
          init() {
            const totalSlide = this.slides.length;
            $this.initAddBtn(totalSlide);
            $this.activeCurrentMenu(0);
          },
          slideChange() {
            const currentIndex = this.activeIndex;
            $this.activeCurrentMenu(currentIndex);
          },
          transitionEnd() {
            const totalSlide = this.slides.length;
            const currentIndex = this.activeIndex;
            if (totalSlide > 0) {
              this.slides[currentIndex].setAttribute('tabindex', 0);
              this.slides[currentIndex].focus();
            }
          }
        },
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '여러 곳으로 보내기 < 장바구니 < %s'
  },
  mixins: [LayerPopupMixin],
  components: {
    MultiTotalPrice, // 하단 최종금액
    swiper,
    swiperSlide,
    SubDefaultHeader,
    PopupMutiAddrList,
    CartMultiProductList,
    PopupSpecialGift,
    PopupCouponChange,
    PopupOptionList,
    PopupOptionDate,
    PopupDateSelect,
    PopupAlert,
    PopupDiscountInfo,
    PopupAlert2plus1,
    PopupDeliveryPrice, // 배송비 안내
  },
  computed: {
    swiper() {
      return this.$refs.myAddrSwiper.swiper;
    }
  },
  methods: {
    // 팝업 활성/비활성
    popupAction(type, bskt) {
      if (type === "popupDiscountInfo") {
        this.bsktDiscountInfo = bskt;
      }
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    // 다중배송지 팝업
    popupAddrActive() {
      this.popupAction('popupMutiAddrList');
    },
    // 슬라이드 이동
    toSlide(i) {
      this.swiper.slideTo(i, 500);
      this.activeCurrentMenu(i);
    },
    // 현재 슬라이드 번호 활성화
    activeCurrentMenu(i) {
      const $menuList = document.querySelector('.slide-pagination');
      const $menu = $menuList.querySelectorAll('li');
      for ( let i = 0; i < ($menu.length); i++ ) {
        $menu[i].querySelector('button').classList.remove('active');
      }
      $menu[i].querySelector('button').classList.add('active');
    },
    // 상단 + 버튼 초기화
    initAddBtn(totalSlide) {
      const $menuList = document.querySelector('.slide-pagination');
      const $menu = $menuList.querySelectorAll('li');
      for ( let i = 0; i < 10; i++ ) {
        $menu[i].classList.add('disable');
      }
      if (totalSlide < 10) {
        for ( let i = 0; i < totalSlide; i++ ) {
          $menu[i].classList.remove('disable');
        }
      } else if (totalSlide === 10) {
        for ( let i = 0; i < 10; i++ ) {
          $menu[i].classList.remove('disable');
        }
      }
    },
    // 슬라이드 삭제
    deleteSlide(idx) {
      this.$gsdialog.confirm("배송지" + (idx + 1) + "[" + this.multiDelivBskt.mbrDlvpList[idx].dlvpNm + "] 을(를) 삭제하시겠습니까?").then(async dialog => {
        this.swiper.removeSlide(idx);
        this.swiper.update();
        this.bsktInqRsltDtoList.splice(idx, 1);
        this.multiDelivBskt.mbrDlvpList.splice(idx, 1);
        localStorage.removeItem('multiDelivBskt');
        localStorage.setItem('multiDelivBskt', JSON.stringify(this.multiDelivBskt));
        this.initAddBtn(this.swiper.slides.length);

        this.$gsdialog.alert("배송지" + (idx + 1) + "이(가) 삭제 되었습니다.");
      });
    },
    setFocus() {
      const currentIndex = this.activeIndex;
      this.slides[currentIndex].setAttribute('tabindex', 0);
      this.slides[currentIndex].focus();
    },
    // 하단 버튼 총금액 보기
    popupShowMore() {
      this.showMore = !this.showMore;
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    setDelivTypeChk(idx) {
      let chkYn = true;
      if (this.bsktInqRsltDtoList[idx].delivTypeDtoList[0].chk) {
        chkYn = false;
      }

      for (let jdx=0; jdx<this.bsktInqRsltDtoList[idx].delivTypeDtoList[0].supplFirmDtoList.length; jdx++) {
        for (let kdx=0; kdx<this.bsktInqRsltDtoList[idx].delivTypeDtoList[0].supplFirmDtoList[jdx].bsktInqRsltDtoList.length; kdx++) {
          this.bsktInqRsltDtoList[idx].delivTypeDtoList[0].supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].chk = chkYn;
        }
      }

      this.getBskt("U");
    },
    async getBskt(inqType) {
      let selBsktIds = [];

      if (Object.entries(this.bsktInqRsltDtoList).length !== 0) {
        for (let idx=0; idx<this.bsktInqRsltDtoList.length; idx++) {
          selBsktIds = [];
          for (let jdx=0; jdx<this.bsktInqRsltDtoList[idx].delivTypeDtoList.length; jdx++) {
            for (let kdx=0; kdx<this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
              for (let ldx=0; ldx<this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                if (this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                  selBsktIds.push(this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId);
                }
              }
            }
          }

          this.multiDelivBskt.mbrDlvpList[idx].selBsktIds = selBsktIds;
        }
      }
      this.multiDelivBskt.inqType = inqType;
      this.multiDelivBskt.applItemCpnList = this.applItemCpnList;
      this.multiDelivBskt.applDblDcCpnList = this.applDblDcCpnList;

      if (this.multiDelivBskt) {
        const result = await ApiUtils.post('/fo/od/bsktmgnt/multi-deliv-basket-item-list', this.multiDelivBskt);

        if (result.data.success) {
          this.bsktInqRsltDtoList = result.data.data;
          this.applItemCpnList = [];
          this.applDblDcCpnList = [];
          const $this = this;
          if (Object.entries($this.bsktInqRsltDtoList).length !== 0) {
            for (let idx=0; idx<$this.bsktInqRsltDtoList.length; idx++) {
              if ((idx + 1) === $this.bsktInqRsltDtoList.length) {
                $this.applItemCpnList = $this.bsktInqRsltDtoList[idx].applItemCpnList;
                $this.applDblDcCpnList = $this.bsktInqRsltDtoList[idx].applDblDcCpnList;
              }
            }
          }
        }
      } else {
        this.$gsdialog.alert('오류가 발생했습니다.');
      }
    },
    setChk(chkYn, idx) {
      this.bsktInqRsltDtoList[idx].delivTypeDtoList[0].chk = chkYn;

      this.getBskt("U");
    },
    async updateBskt(bskt) {
      const iBsktPut = {
        bsktId: bskt.bsktId,
        bsktQty: bskt.bsktQty,
        storId: bskt.storId,
        supplFirmCd: bskt.supplFirmCd,
      };
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      const $this = this;
      this.timer = setTimeout(async () => {
        const result = await ApiUtils.put('/fo/od/bsktmgnt/basket-item-quantity', iBsktPut);
        console.log(result);
        if (!result.data.success) {
          this.$gsdialog.alert(result.data.statusMessage);
        } else {
          $this.getBskt("U");
        }
      }, 500);
    },
    openCouponPopup(itemCpnList, dblDcCpnList, itemNm, bsktId, itemDcSprc, bsktQty, cmplDcAmt) {
      this.itemCpnList = itemCpnList;
      this.dblDcCpnList = dblDcCpnList;
      this.itemNm = itemNm;
      this.bsktId = bsktId;
      this.itemDcSprc = itemDcSprc;
      this.bsktQty = bsktQty;
      this.cmplDcAmt = cmplDcAmt;
      this.popup['popupCouponList'] = !this.popup['popupCouponList'];
      this.popup.open = !this.popup.open;
    },
    useCpn(itemCpnInfo, dblDcCpnInfo, bsktId, rcmdCpnApplYn) {
      cpnUseLoop:
      for (let odx=0; odx<this.bsktInqRsltDtoList.length; odx++) {
        this.bsktInqRsltDto = this.bsktInqRsltDtoList[odx];
        for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
          for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
            for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId === bsktId) {
                let cpnDcAmt = 0;
                const bskt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx];
                let prevCpnDcAmt = bskt.itemCpnDcAmt;
                for (let mdx=0; mdx<this.applItemCpnList.length; mdx++) {
                  if (this.applItemCpnList[mdx].bsktId === bsktId) { // 상품에 쓰여진 쿠폰이 있으면 해제
                    this.applItemCpnList.splice(mdx, 1);
                  }
                }

                const $this = this;
                if (itemCpnInfo !== '') {
                  const cpnInfo = itemCpnInfo.split(":");
                  if (bskt.ordsItemCpnPromExpnsInqRsltList !== null) {
                    const applItemCpnList = this.applItemCpnList;
                    bskt.ordsItemCpnPromExpnsInqRsltList.forEach(function (cpn, idx) {
                      cpn.applYn = false;
                      if (cpn.cmmMbrNo == cpnInfo[0] && cpn.promId == cpnInfo[1] && cpn.cpnIsseSeqno == cpnInfo[2]) {
                        for (let mdx=0; mdx<applItemCpnList.length; mdx++) {
                          if (cpn.cmmMbrNo === applItemCpnList[mdx].cmmMbrNo &&
                            cpn.promId === applItemCpnList[mdx].promId &&
                            cpn.cpnIsseSeqno === applItemCpnList[mdx].cpnIsseSeqno) {// 쿠폰이 쓰여진 다른 상품이 있으면 해제
                              $this.useCnclCpn('item', applItemCpnList[mdx].bsktId); // 실제 적용 쿠폰 삭제 및 금액 변경
                              $this.bsktInqRsltDto = $this.bsktInqRsltDtoList[odx];
                              break;
                          }
                        }

                        cpn.applYn = true;
                        cpnDcAmt = cpn.dcAmt;
                        const applItemCpn = {};
                        applItemCpn.bsktId = cpn.bsktId;
                        applItemCpn.promId = cpn.promId;
                        applItemCpn.cmmMbrNo = cpn.cmmMbrNo;
                        applItemCpn.cpnIsseSeqno = cpn.cpnIsseSeqno;
                        applItemCpn.dcAmt = cpn.dcAmt;
                        applItemCpn.itemNm = bskt.itemNm;
                        applItemCpn.maxBeneYn = rcmdCpnApplYn;
                        console.log(applItemCpn);
                        applItemCpnList.push(applItemCpn);
                        console.log(applItemCpnList);
                      }
                    });
                  }
                } else {
                  if (bskt.ordsItemCpnPromExpnsInqRsltList !== null) {
                    bskt.ordsItemCpnPromExpnsInqRsltList.forEach(function (cpn, idx) {
                        cpn.applYn = false;
                    });
                  }
                }

                this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemCpnDcAmt = cpnDcAmt;
                if (bskt.chk) {
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].itemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  this.bsktInqRsltDto.totItemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].itemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                }

                cpnDcAmt = 0;
                prevCpnDcAmt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dblDcCpnDcAmt;
                for (let mdx=0; mdx<this.applDblDcCpnList.length; mdx++) {
                  if (this.applDblDcCpnList[mdx].bsktId === bsktId) { // 상품에 쓰여진 쿠폰이 있으면 해제
                    this.applDblDcCpnList.splice(mdx, 1);
                  }
                }

                if (dblDcCpnInfo !== '') {
                  const cpnInfo = dblDcCpnInfo.split(":");
                  if (bskt.ordsDblDcCpnPromExpnsInqRsltDtoList !== null) {
                    const applDblDcCpnList = this.applDblDcCpnList;
                    bskt.ordsDblDcCpnPromExpnsInqRsltDtoList.forEach(function (cpn, idx) {
                      cpn.applYn = false;
                      if (cpn.cmmMbrNo == cpnInfo[0] && cpn.promId == cpnInfo[1] && cpn.cpnIsseSeqno == cpnInfo[2]) { // 더블할인 쿠폰의 경우, 상품쿠폰 적용에 따라서 적용금액이 달라질 수 있기때문에 정률일 경우 재계산한다.
                        for (let mdx=0; mdx<applDblDcCpnList.length; mdx++) {
                          if (cpn.cmmMbrNo === applDblDcCpnList[mdx].cmmMbrNo &&
                            cpn.promId === applDblDcCpnList[mdx].promId &&
                            cpn.cpnIsseSeqno === applDblDcCpnList[mdx].cpnIsseSeqno) {// 쿠폰이 쓰여진 다른 상품이 있으면 해제
                              $this.useCnclCpn('dbl', applDblDcCpnList[mdx].bsktId); // 실제 적용 쿠폰 삭제 및 금액 변경
                              $this.bsktInqRsltDto = $this.bsktInqRsltDtoList[odx];
                              break;
                          }
                        }
                        cpn.applYn = true;
                        if (cpn.dcTypeCd === 'R') {
                          const itemDcSprc = (bskt.itemDcSprc * bskt.bsktQty) - bskt.cmplDcAmt - bskt.itemCpnDcAmt;
                          const itemDcAmt = Math.floor(itemDcSprc / bskt.bsktQty / 10) * 10;
                          cpnDcAmt = Math.ceil(itemDcAmt * cpn.beneApplVal / 1000) * 10 * bskt.bsktQty;
                          if (cpn.maxDcAmt < cpnDcAmt) {
                            cpnDcAmt = cpn.maxDcAmt;
                          }
                        } else {
                          cpnDcAmt = cpn.dcAmt;
                        }
                        const applDblDcCpn = {};
                        applDblDcCpn.bsktId = cpn.bsktId;
                        applDblDcCpn.promId = cpn.promId;
                        applDblDcCpn.cmmMbrNo = cpn.cmmMbrNo;
                        applDblDcCpn.cpnIsseSeqno = cpn.cpnIsseSeqno;
                        applDblDcCpn.dcAmt = cpnDcAmt;
                        applDblDcCpn.itemNm = bskt.itemNm;
                        applDblDcCpn.maxBeneYn = rcmdCpnApplYn;
                        applDblDcCpnList.push(applDblDcCpn);
                      }
                    });
                  }
                } else {
                  if (bskt.ordsDblDcCpnPromExpnsInqRsltDtoList !== null) {
                    bskt.ordsDblDcCpnPromExpnsInqRsltDtoList.forEach(function (cpn, idx) {
                      cpn.applYn = false;
                    });
                  }
                }

                this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dblDcCpnDcAmt = cpnDcAmt;
                if (bskt.chk) {
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].dblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  this.bsktInqRsltDto.totDblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].dblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                }

                break cpnUseLoop;
              }
            }
          }
        }
      }
    },
    useCnclCpn(type, bsktId) {
      cpnUseLoop:
      for (let odx=0; odx<this.bsktInqRsltDtoList.length; odx++) {
        this.bsktInqRsltDto = this.bsktInqRsltDtoList[odx];
        for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
          for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
            for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId === bsktId) {
                if (type === 'item') {
                  const cpnDcAmt = 0;
                  const prevCpnDcAmt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemCpnDcAmt;
                  for (let mdx=0; mdx<this.applItemCpnList.length; mdx++) {
                    if (this.applItemCpnList[mdx].bsktId === bsktId) { // 상품에 쓰여진 쿠폰이 있으면 해제
                      this.applItemCpnList.splice(mdx, 1);
                    }
                  }
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList !== null) {
                    this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList.forEach(function (cpn, idx) {
                      cpn.applYn = false;
                    });
                  }

                  this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemCpnDcAmt = cpnDcAmt;
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                    this.bsktInqRsltDto.delivTypeDtoList[jdx].itemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                    this.bsktInqRsltDto.totItemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                    this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].itemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  }
                }

                if (type === 'dbl') {
                  const cpnDcAmt = 0;
                  const prevCpnDcAmt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dblDcCpnDcAmt;
                  for (let mdx=0; mdx<this.applDblDcCpnList.length; mdx++) {
                    if (this.applDblDcCpnList[mdx].bsktId === bsktId) { // 상품에 쓰여진 쿠폰이 있으면 해제
                      this.applDblDcCpnList.splice(mdx, 1);
                    }
                  }

                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList !== null) {
                    const applDblDcCpnList = this.applDblDcCpnList;
                    this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList.forEach(function (cpn, idx) {
                      cpn.applYn = false;
                    });
                  }

                  this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dblDcCpnDcAmt = cpnDcAmt;
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                    this.bsktInqRsltDto.delivTypeDtoList[jdx].dblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                    this.bsktInqRsltDto.totDblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                    this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].dblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  }
                }

                break cpnUseLoop;
              }
            }
          }
        }
      }
    },
    async goOrder() {
      const goOrderPut = {};
      const bsktOptDlvpInfoList = [];
      let bsktOptDlvpInfo = {};
      let bsktOptDelivTypeGrpInfoList = [];
      let bsktOptDelivTypeGrpInfo = {};
      let bsktOptItemInfoList = [];
      let bsktOptItemInfo = {};
      let bsktOptItemCpnInfoList = [];
      let bsktOptDblDcCpnInfoList = [];
      let bsktOptItemCpnInfo = {};
      let bsktOptDblDcCpnInfo = {};
      let delivTypeCd = '';
      let selCnt = 0;
      let selTotCnt = 0;

      for (let idx=0; idx<this.bsktInqRsltDtoList.length; idx++) {
        bsktOptDlvpInfo = {};
        bsktOptDelivTypeGrpInfoList = [];
        bsktOptDelivTypeGrpInfo = {};
        bsktOptDlvpInfo.mbrDlvpSeqno = this.multiDelivBskt.mbrDlvpList[idx].mbrDlvpSeqno;
        selCnt = 0;
        for (let jdx=0; jdx<this.bsktInqRsltDtoList[idx].delivTypeDtoList.length; jdx++) {
          bsktOptDelivTypeGrpInfo.ordTypeCd = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].ordTypeCd;
          bsktOptDelivTypeGrpInfo.delivTypeCd = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].delivTypeCd;
          for (let kdx=0; kdx<this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
            for (let ldx=0; ldx<this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
              if (this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                selCnt++;
                selTotCnt++;
                if (delivTypeCd != ''
                  && delivTypeCd != this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].delivTypeCd) {
                  bsktOptDelivTypeGrpInfo.bsktOptItemInfoList = bsktOptItemInfoList;

                  if (bsktOptItemInfoList && bsktOptItemInfoList.length > 0) {
                    bsktOptDelivTypeGrpInfoList.push(bsktOptDelivTypeGrpInfo);
                  }

                  bsktOptItemInfoList = [];
                  bsktOptDelivTypeGrpInfo = {};

                  bsktOptDelivTypeGrpInfo.ordTypeCd = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].ordTypeCd;
                  bsktOptDelivTypeGrpInfo.delivTypeCd = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].delivTypeCd;
                }
                bsktOptItemInfo.bsktId = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId;
                bsktOptItemInfo.relatBsktId = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].relatBsktId;
                bsktOptItemInfo.storId = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].storId;
                bsktOptItemInfo.supplFirmCd = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].supplFirmCd;
                bsktOptItemInfo.delivPolcId = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].delivPolcId;

                if (this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList) {
                  for (let mdx=0; mdx<this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList.length; mdx++) {
                    if (this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList[mdx].applYn) {
                      bsktOptItemCpnInfo.promId = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList[mdx].promId;
                      bsktOptItemCpnInfo.cpnIsseSeqno = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList[mdx].cpnIsseSeqno;
                    }
                    bsktOptItemCpnInfoList.push(bsktOptItemCpnInfo);
                    bsktOptItemCpnInfo = {};
                  }
                }

                if (this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList) {
                  for (let mdx=0; mdx<this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList.length; mdx++) {
                    if (this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList[mdx].applYn) {
                      bsktOptDblDcCpnInfo.promId = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList[mdx].promId;
                      bsktOptDblDcCpnInfo.cpnIsseSeqno = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList[mdx].cpnIsseSeqno;
                    }
                    bsktOptDblDcCpnInfoList.push(bsktOptDblDcCpnInfo);
                    bsktOptDblDcCpnInfo = {};
                  }
                }
                bsktOptItemInfo.bsktOptItemCpnInfoList = bsktOptItemCpnInfoList;
                bsktOptItemInfo.bsktOptDblDcCpnInfoList = bsktOptDblDcCpnInfoList;
                bsktOptItemInfoList.push(bsktOptItemInfo);

                for (let ndx=0; ndx<this.bsktInqRsltDtoList[idx].frgfInfoList.length; ndx++) {
                  if (this.bsktInqRsltDtoList[idx].frgfInfoList[ndx].relatBsktId === this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId) {
                    bsktOptItemInfo = {};
                    bsktOptItemInfo.bsktId = this.bsktInqRsltDtoList[idx].frgfInfoList[ndx].bsktId;
                    bsktOptItemInfo.relatBsktId = this.bsktInqRsltDtoList[idx].frgfInfoList[ndx].relatBsktId;
                    bsktOptItemInfoList.push(bsktOptItemInfo);
                  }
                }
                bsktOptItemInfo = {};
                bsktOptItemCpnInfoList = [];
                bsktOptDblDcCpnInfoList = [];
                delivTypeCd = this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].delivTypeCd;
              }
            }
          }

          bsktOptDelivTypeGrpInfo.bsktOptItemInfoList = bsktOptItemInfoList;

          if (bsktOptItemInfoList && bsktOptItemInfoList.length > 0) {
            bsktOptDelivTypeGrpInfoList.push(bsktOptDelivTypeGrpInfo);
          }

          bsktOptItemInfoList = [];
          bsktOptDelivTypeGrpInfo = {};
        }

        if (selCnt > 0) {
          bsktOptDlvpInfo.bsktOptDelivTypeGrpInfoList = bsktOptDelivTypeGrpInfoList;
          bsktOptDlvpInfoList.push(bsktOptDlvpInfo);
        }
      }
      goOrderPut.bsktOptDlvpInfoList = bsktOptDlvpInfoList;

      console.log(goOrderPut);
      if (selTotCnt <= 0) {
        this.$gsdialog.alert('상품을 하나 이상 선택해주세요.');
        return;
      } else {
        const result = await ApiUtils.post('/fo/od/ordsmgnt/ordersheet', goOrderPut);
        const data = result.data.data;

        if (result.data.success) {
          this.$store.state.ordId = data.ordId;
          this.$router.push({name: 'multDelivOrderSheet', params: {ordId: data.ordId}});
        }
      }
    },
    async refreshBskt() {
      this.multiDelivBskt = JSON.parse(localStorage.getItem('multiDelivBskt'));
      console.log(this.multiDelivBskt);

      if (this.multiDelivBskt) {
        this.multiDelivBskt.inqType = "S";
        const result = await ApiUtils.post('/fo/od/bsktmgnt/multi-deliv-basket-item-list', this.multiDelivBskt);

        if (result.data.success) {
          this.bsktInqRsltDtoList = result.data.data;
          this.applItemCpnList = [];
          this.applDblDcCpnList = [];
          const $this = this;
          let selBsktIds = [];
          if (Object.entries($this.bsktInqRsltDtoList).length !== 0) {
            for (let idx=0; idx<$this.bsktInqRsltDtoList.length; idx++) {
              if ((idx + 1) === $this.bsktInqRsltDtoList.length) {
                $this.applItemCpnList = $this.bsktInqRsltDtoList[idx].applItemCpnList;
                $this.applDblDcCpnList = $this.bsktInqRsltDtoList[idx].applDblDcCpnList;
              }
              selBsktIds = [];
              for (let jdx=0; jdx<$this.bsktInqRsltDtoList[idx].delivTypeDtoList.length; jdx++) {
                for (let kdx=0; kdx<$this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
                  for (let ldx=0; ldx<$this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                    if ($this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                      selBsktIds.push($this.bsktInqRsltDtoList[idx].delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId);
                    }
                  }
                }
              }

              $this.multiDelivBskt.mbrDlvpList[idx].selBsktIds = selBsktIds;
            }
          }
        }
        this.initAddBtn(this.bsktInqRsltDtoList.length);
        /*
        const $this = this;
        this.$nextTick(function () {
          $this.initAddBtn($this.swiper.slides.length);
          $this.toSlide($this.swiper.slides.length);
        });
        */
      } else {
        this.$gsdialog.alert('담긴 상품이 없습니다. 장바구니에서 다시 담아주세요.').then(dialog => {
          this.$router.push('/od/bskt');
        });
      }
    },
    async copyQtyAndOptn() {
      this.$gsdialog.confirm("현재 선택된 상품과 수량을 모든 배송지에 동일하게 적용하시겠습니까?<br/>배송지별 상품 판매가 가능한 경우에 적용됩니다.", {html: true}).then(async dialog => {
        const result = await ApiUtils.post('/fo/od/bsktmgnt/qty-optn-copy', this.multiDelivBskt);

        if (result.data.success) {
          this.$gsdialog.alert("상품과 수량이 배송지1과 모두 동일하게 적용되었습니다.");
          this.getBskt('U');
        } else {
          this.$gsdialog.alert(result.data.statusMessage);
        }
      });
    },
    popupDateActive(bskt) {
      this.bskt = bskt;
      this.delivDt = bskt.delivDt;
      this.popupAction('popupDateSelect');
    },
    async selectDelivDt(selectDate) {
      const iBsktPut = {
        bsktId: this.bskt.bsktId,
        delivDt: selectDate,
        sessnId: CookieUtils.getOdBsktUuid(),
      };
      console.log(iBsktPut);
      const result = await ApiUtils.put('/fo/od/bsktmgnt/delivery-date', iBsktPut);

      if (result.data.success) {
        this.$gsdialog.alert('변경되었습니다.');
        this.bskt.delivDt = selectDate;
        this.popupAction('popupDateSelect');
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
  },
  destroyed() {
  },
  async created() {
    this.refreshBskt();
  },
  mounted() {

  },
  updated() {
    // 팝업 딤드 스크롤
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
};
</script>
<style lang="scss">
</style>
