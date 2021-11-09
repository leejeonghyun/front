<template>
  <div class="wrapper tabcont_marketfor" id="tab-contents1" tabindex="0" aria-labelledby="tab1">
    <!-- START : 주소 -->
    <div v-if="loginYn">
      <MfCartAddress @popupEvent="popupAction" :mbrDlvp="mbrDlvp" />
      <transition name="selectAddress" v-on:beforeEnter="slideupBeforeEnter" v-on:enter="slideupEnter" v-on:after-enter="slideupEnterAfterEnter" v-on:leave="slideupEnterLeave">
        <MfPoupSelectAddress @popupEvent="popupAction" @selectMbrDlvp="selectMbrDlvp" :mbrDlvpSeqno="mbrDlvp.mbrDlvpSeqno" v-if="this.popup.popupAddrList"/> <!-- 팝업 - 배송지 목록 팝업(MarketFor) -->
      </transition>
      <MfPopupAddrChange @popupEvent="popupAction" :mbrDlvp="mbrDlvp" :mbrDlvpTemp="mbrDlvpTemp" @changeMbrDlvp="changeMbrDlvp" v-if="this.popup.popupAddrChange"/> <!-- 팝업 - 권역 변경 팝업(MarketFor) -->
    </div>
    <div v-else>
      <div class="cart-my-address">
        <p class="btn-login">
          <a href="javascript:;" @click="goLogin">로그인해주세요.</a> <!-- 수정 START : 2020.02.21 마크업 변경 (로그인 이동 텍스트 버튼으로 변경) -->
        </p>
      </div>
    </div>
    <!-- END : 주소 -->
    <div  v-if="isBaskItem()">
      <div class="cart-category-product">
        <div class="title_flex__area">
          <h3 class="total_del">
            <span class="inp-chk small bg">
              <input type="checkbox" name="chkAllBskt" id="chkAllBskt" v-model="chkAllBsktYn" @change="setChkAllBsktItem">
              <label for="chkAllBskt">{{ !chkAllBsktYn ? '전체선택' : '선택해제' }}</label>
            </span>
          </h3>
          <button type="button" class="btn-border" @click="selectedDeleteBskt('B')">선택삭제</button>
        </div>
        <MfCartProductList
          @popupEvent="popupAction"
          @openOptionPopup="openOptionPopup"
          @openCouponPopup="openCouponPopup"
          @openDiscountPopup="openDiscountPopup"
          @openTodayDeliveryPopup="openTodayDeliveryPopup"
          @deleteBskt="deleteBskt"
          @goItemDetail="goItemDetail"
          @calcDlfeeAmt="calcDlfeeAmt"
          @updateBskt="updateBskt"
          @calcItemCoupon="calcItemCoupon"
          @setChk="setChk"
          @showLoading="showLoading"
          @actionEventCntl="actionEventCntl"
          :bsktInqRsltDto="bsktInqRsltDto"
          :mbrDlvp="mbrDlvp"
        />
        <MfCartTotalPrice @popupEvent="popupAction" :bsktInqRsltDto="bsktInqRsltDto" />
        <div class="full_btn__area" v-if="getSoldItemCnt() > 0">
          <button type="button" class="btn-border" @click="selectedDeleteBskt('S')"><span>품절 전체 삭제</span></button>
        </div>
        <div class="payment-caution">
          <h5>유의사항</h5>
          <div class="txt-info">
            <ul class="list-info">
              <li>도서산간 일부지역의 배송 서비스는 오픈 준비중입니다.</li> <!-- 1014 추가 -->
              <li>상기 금액은 주문 결제 단계에서 장바구니 쿠폰, 카드할인 등 할인 수단 적용 시 결제 금액이 달라질 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>
      <MfCartFooterOrder ref="footerOrder" @vaildBskt="vaildBskt" @setMaxBnft="setMaxBnft" @actionEventCntl="actionEventCntl" :maxBnftYn="maxBnftYn" :bsktInqRsltDto="bsktInqRsltDto" />
      <!-- 팝업 - 옵션선택 -->
      <transition name="optionList" v-on:beforeEnter="slideupBeforeEnter" v-on:enter="slideupEnter" v-on:after-enter="slideupEnterAfterEnter" v-on:leave="slideupEnterLeave">
        <MfPopupOptionList @changeItemOptn="changeItemOptn" @popupEvent="popupAction" @showLoading="showLoading" :bsktItemInfo="bsktItemInfo" v-if="this.popup.popupOptionList" />
      </transition>
      <!-- 팝업 - 쿠폰변경 -->
      <transition name="couponChange" v-on:beforeEnter="slideupBeforeEnter" v-on:enter="slideupEnter" v-on:after-enter="slideupEnterAfterEnter" v-on:leave="slideupEnterLeave">
        <MfPopupCouponChange @popupEvent="popupAction" @useCpn="useCpn" :maxBnftYn="maxBnftYn" :bsktItemInfo="bsktItemInfo" :applItemCpnList="bsktInqRsltDto.applItemCpnList" v-if="this.popup.popupCouponList"/>
      </transition>
      <!-- 팝업 - 상품더보기(추천상품) -->
      <transition name="todayDelivery" v-on:beforeEnter="slideupBeforeEnter" v-on:enter="slideupEnter" v-on:after-enter="slideupEnterAfterEnter" v-on:leave="slideupEnterLeave">
        <MfPopupTodayDelivery @popupEvent="popupAction" @addSimilarity="putBskt" @goItemDetail="goItemDetail" :supplFirmInfo="supplFirmInfo" :dlfeeInfo="dlfeeInfo" v-if="this.popup.popupTodayDelivery" />
      </transition>
      <!-- 팝업 - 배송비 안내 -->
      <MfPopupDeliveryPrice @popupEvent="popupAction" v-if="this.popup.popupDeliveryPrice" />
      <!-- 팝업 - 할인 내역 -->
      <MfPopupDiscountInfo @popupEvent="popupAction" :bsktItemInfo="bsktItemInfo" v-if="this.popup.popupDiscountInfo" />
    </div>
    <div class="cart-before-login" v-else>
      <div class="inner">
        <p v-if="loading == 0">장바구니에 담긴 상품이 없습니다.</p>
        <p v-else>장바구니 조회 중입니다.</p>
        <a href="javascript:" class="btn-go-shopping" @click="goShop">쇼핑하러 가기</a>
      </div>
    </div>
  </div>
</template>
<script>
import MfCartTotalPrice from '@/components/cart/MfCartTotalPrice'; // 총합계
import MfCartFooterOrder from '@/components/cart/MfCartFooterOrder'; // 하단 주문하기 버튼(MarketFor)
import OrderMsg from '@/components/order/MfOrderMsg';

import MfPopupOptionList from '@/views/od/MfPopupOptionList'; // 팝업 - 단일옵션
import MfPopupTodayDelivery from '@/views/od/MfPopupTodayDelivery'; // 팝업 - 상품더보기
import MfPopupCouponChange from '@/views/od/MfPopupCouponChange'; // 팝업 - 쿠폰변경
import MfPopupDiscountInfo from '@/views/od/MfPopupDiscountInfo'; // 팝업 - 할인 내역
import MfPopupDeliveryPrice from '@/views/od/MfPopupDeliveryPrice'; // 팝업 - 배송비 안내
import MfCartProductList from '@/views/od/MfCartProductList';
import MfCartAddress from '@/components/cart/MfCartAddress'; // 주소(MarketFor)
import MfPoupSelectAddress from '@/views/od/MfPoupSelectAddress'; //  팝업 - 배송지 변경(MarketFor)
import MfPopupAddrChange from '@/views/od/MfPopupAddrChange'; // 팝업 - 권역 변경(MarketFor)

import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';

import Tracker from '@/common/Tracker';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import JwtUtils from '@/common/JwtUtils';
import SiteUtils from '@/common/SiteUtils';
import StringUtils from '@/common/StringUtils';
import DateUtils from '@/common/DateUtils';
import LoginUtils from '@/common/LoginUtils';
import Basket from '@/common/od/MfBasket';

export default {
  name: "MfTheBasketMf",
  props: {
    cmmSiteClass: String,
    loading: Number,
  },
  data() {
    return {
      popup: { // 팝업
        open: false, // 6월 수정 튜토리얼 추가 (팝업 화면 시작 시 오픈)
        popupOptionList: false, // 장바구니 옵션 팝업
        popupDiscountInfo: false, // 할인 상세 내역 팝업 (장바구니 상품)
        popupCouponList: false,
        popupDeliveryPrice: false,
        popupTodayDelivery: false,
        popupAddrList: false,
        popupAddrChange: false,
      },
      bsktInqRsltDto: {}, // 장바구니목록 정보
      supplFirmInfo: {}, // 추천상품 목록을 조회 하기 위한 공급업체 정보
      dlfeeInfo: {}, // 추천상품 목록을 조회 하기 위한 배송비별 정보
      bsktItemInfo: {}, // 상품옵션목록/쿠폰목록 등을 조회 하기 위한 대상 상품정보
      addBsktItemIds: null, // 추가 장바구니 상품 ID 정보
      maxBnftYn: true, // 맞춤혜택가 선택 여부
      timer: null, // 장바구니 상품의 수량 변경 시 타이머 체크ID 정보
      chkAllBsktYn: true, // 장바구니 상품 전체선택/해제 여부
      mbrDlvp: {}, // 회원배송지 정보
      mbrDlvpTemp: {}, // 변경될 임시 회원배송지정보
      loginYn: LoginUtils.isLogin(),
      // 상품 수량 직접입력 상태에서 주문결제버튼 클릭 행위 방지 로직을 위한 변수 Set
      bsktQtyFocusFlag: false, // 상품수량 직접입력 Box Focus 여부
      orderBtnClickFlag: false, // 주문결제버튼 클릭 여부
    };
  },
  mixins: [LayerPopupMixin],
  components: {
    MfCartTotalPrice,
    MfCartFooterOrder,
    MfPopupCouponChange,
    MfPopupOptionList,
    MfPopupTodayDelivery,
    MfPopupDiscountInfo,
    MfPopupDeliveryPrice,
    MfCartAddress,
    MfPoupSelectAddress,
    MfPopupAddrChange,
    MfCartProductList,
  },
  methods: {
    // 상품수량 KeyIn 중 결제버튼 클릭 이슈 발생으로 인한 제어 처리 함수
    actionEventCntl(key) {
      /* ******************** Key Code Info ****************************
       * '1' : 상품수량 KeyIn Focus In 시 처리.
       * '2' : 상품수량 KeyIn Focus Out 시 처리.
       * '3' : 상품수량 KeyIn 상태에서 수량변경이 없이 결제버튼 클릭으로 발생한 이벤트의 경우 처리.
       * '4' : 상품수량 KeyIn Focus 상태에서 주문결제 클릭 이벤트 발생 시 처리.
       * '5' : 상품수량을 KeyIn으로 변경 후 주문결제 클릭 이벤트 발생 시 상품재고수량 체크 후 주문결제 함수를 처리.
      **************************************************************** */
      switch (key) {
        case '1': // 상품수량 KeyIn Focus 진입 이벤트 발생 시 처리.
          this.bsktQtyFocusFlag = true;
          break;

        case '2': // 상품수량 KeyIn Focus Out 이벤트 발생 시 처리.
          this.bsktQtyFocusFlag = false; // 상품수량 KeyIn Focus Out
          if (this.orderBtnClickFlag) {
            this.orderBtnClickFlag = false; // 주문결제버튼 클릭 여부 초기화
          }
          break;

        case '3': // 상품수량 KeyIn 상태에서 수량변경이 없이 결제버튼 클릭으로 발생한 이벤트의 경우 처리.
          this.bsktQtyFocusFlag = false; // 상품수량 KeyIn Focus Out
          if (this.orderBtnClickFlag) {
            this.orderBtnClickFlag = false; // 주문결제버튼 클릭 여부 초기화
            this.vaildBskt(); // 장바구니 주문결제 처리 함수 호출.
          }
          break;

        case '4': // 상품수량 KeyIn Focus 상태에서 주문결제 클릭 이벤트 발생 시 처리.
          if (this.bsktQtyFocusFlag) {
            this.orderBtnClickFlag = true; // 주문결제버튼 클릭 여부 True
            return false; // 주문
          } else {
            return true;
          }
          break;

        case '5': // 상품수량을 KeyIn으로 변경 후 주문결제 클릭 이벤트 발생 시 상품재고수량 체크 후 주문결제 함수를 처리.
          this.bsktQtyFocusFlag = false; // 상품수량 KeyIn Focus Out
          if (this.orderBtnClickFlag) {
            this.orderBtnClickFlag = false; // 주문결제버튼 클릭 여부 True
            this.vaildBskt(); // 장바구니 주문결제 처리 함수 호출.
          }
          break;

        default:
          this.bsktQtyFocusFlag = false;
          this.orderBtnClickFlag = false;
          break;
      }
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isListEmpty: function (x) {
      return (x != null && Object.entries(x).length > 0) ? false : true;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    showLoading(flag) {
      this.$emit('showLoading', flag);
    },
    // 팝업 모션 추가
    slideupBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    slideupEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    slideupEnterAfterEnter(el) {
      el.style.opacity = 1;
      el.style.bottom = 0;
      el.focus();
    },
    slideupEnterLeave(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    stickyTab(scroll) {
      const $stickytab = document.querySelector('.shop_scroll__area');
      const $mainheader = document.querySelector('.section-header');

      if (!$stickytab) return;

      if (scroll >= 60) {
        $stickytab.classList.add('fixed');
        $mainheader.classList.add('alpha');
      } else {
        $stickytab.classList.remove('fixed');
        $mainheader.classList.remove('alpha');
      }
    },
    // 장바구니 상품 전체선택/해제 처리 함수
    setChkAllBsktItem() {
      this.bsktInqRsltDto.supplFirmDtoList.forEach(supplInfo =>
        supplInfo.bsktInqByDlfeeIdDtoList.forEach(dlfeeInfo =>
          dlfeeInfo.bsktInqRsltDtoList.forEach(bsktInfo => bsktInfo.chk = this.chkAllBsktYn)));
      this.$refs.footerOrder.changeMaxBnftYn(false);
      // 장바구니 합계 금액 및 총합계 금액 재계산 함수 호출
      this.calcBasketTotalAmt();
    },
    // 장바구니의 상품 선택 체크 시 처리 함수(장바구니 비용 등 계산 처리))
    setChk() {
      this.chkAllBsktYn = this.bsktInqRsltDto.supplFirmDtoList.every(supplInfo =>
                          supplInfo.bsktInqByDlfeeIdDtoList.every(dlfeeInfo =>
                          dlfeeInfo.bsktInqRsltDtoList.every(bsktInfo => bsktInfo.chk)));
      this.$refs.footerOrder.changeMaxBnftYn(false);
      // 장바구니 합계 금액 및 총합계 금액 재계산 함수 호출
      this.calcBasketTotalAmt();
    },
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false;
    },
    // 상품에 대한 할인상세내역 레이어 팝업 호출 함수
    openTodayDeliveryPopup(supplFirmInfo, dlfeeInfo) {
      this.supplFirmInfo = supplFirmInfo;
      this.dlfeeInfo = dlfeeInfo;
      this.popup[`popupTodayDelivery`] = !this.popup[`popupTodayDelivery`];
      this.popup.open = !this.popup.open;
    },
    // 상품에 대한 할인상세내역(장바구니상품) 레이어 팝업 호출 함수
    openDiscountPopup(bsktItem) {
      this.bsktItemInfo = bsktItem;
      this.popup[`popupDiscountInfo`] = !this.popup[`popupDiscountInfo`];
      this.popup.open = !this.popup.open;
    },
    // 옵션선택 팝업 레이어 호출 함수
    openOptionPopup(bsktItem) {
      this.bsktItemInfo = bsktItem;
      this.popup[`popupOptionList`] = !this.popup[`popupOptionList`];
      this.popup.open = !this.popup.open;
    },
    // 장바구니 상품에 대한 옵션 변경처리 함수
    async changeItemOptn(iPutItemOptn) {
      iPutItemOptn.bsktId = this.bsktItemInfo.bsktId;
      iPutItemOptn.bsktTypeCd = "1";
      iPutItemOptn.sessnId = CookieUtils.getOdBsktUuid();
      // 변경된 단품(옵션) 정보 Update 처리
      this.showLoading(true);
      const result = await ApiUtils.put('/fo/od/mf/item-option', iPutItemOptn);
      this.showLoading(false);
      if (result.data.success) {
        this.popup['popupOptionList'] = !this.popup['popupOptionList'];
        this.popup.open = !this.popup.open;
        this.bsktItemInfo.skuId = iPutItemOptn.skuId;
        this.bsktItemInfo.skuNm = iPutItemOptn.skuNm;
        this.bsktItemInfo.skuAddAmt = iPutItemOptn.skuAddAmt;
        this.bsktItemInfo.supplFirmItemId = iPutItemOptn.supplFirmItemId;
        // 변경된 옵션정보 Update
        this.bsktInqRsltDto.supplFirmDtoList.find(supplInfo => supplInfo.supplFirmCd === this.bsktItemInfo.supplFirmCd)
          .bsktInqByDlfeeIdDtoList.find(dlfeeInfo => dlfeeInfo.dlfeeId === this.bsktItemInfo.dlfeeId)
          .bsktInqRsltDtoList.every(itemInfo => {
            if (itemInfo.bsktId === this.bsktItemInfo.bsktId) {
              itemInfo = this.bsktItemInfo;
              return false;
            }
        });
        // 장바구니 합계 금액 및 총합계 금액 재계산 함수 호출
        this.calcBasketTotalAmt();
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    // 쿠폰선택 레이어 팝업 호출 함수
    openCouponPopup(bsktItem) {
      this.bsktItemInfo = bsktItem;
      this.popup[`popupCouponList`] = !this.popup[`popupCouponList`];
      this.popup.open = !this.popup.open;
    },
    // 쿠폰 변경 시 처리 함수
    useCpn(selCpnInfo, rcmdCpnApplYn) {
      // 변경된 쿠폰 정보를 처리하기 위한 변수 초기화
      const applItemCpnList = this.bsktInqRsltDto.applItemCpnList;
      const supplFirmList = this.bsktInqRsltDto.supplFirmDtoList;
      const tobeApplCpn = this.bsktItemInfo.ordsItemCpnPromExpnsInqRsltList.find(cpnInfo => cpnInfo.applYn === true);

      // 1. 선택된 쿠폰정보가 존재하는 경우
      if (!!selCpnInfo) {
        // 적용중인 기존쿠폰 정보
        const asisApplCpn = applItemCpnList.find(applCpn => selCpnInfo.promId === applCpn.promId && selCpnInfo.cpnIsseSeqno === applCpn.cpnIsseSeqno);
        // 1-1. 쿠폰이 적용된 기존BSKT_ID 와 신규BSKT_ID가 같은지 비교
        if (!!asisApplCpn && asisApplCpn.bsktId === selCpnInfo.bsktId) {
          // - 같으면 아무런 처리 없이 종료
          return;
        // 1-2. 쿠폰이 적용된 기존BSKT_ID 와 신규BSKT_ID가 다르면 처리
        } else {
          // - 기존상품쿠폰이 사용 되었으면 처리.
          if (asisApplCpn) {
            // - 적용된 쿠폰목록에서 기존상품쿠폰정보를 삭제처리
            supplFirmList.find(supplInfo => supplInfo.supplFirmCd === asisApplCpn.supplFirmCd)
              .bsktInqByDlfeeIdDtoList.find(dlfeeInfo => dlfeeInfo.dlfeeId === asisApplCpn.dlfeeId)
              .bsktInqRsltDtoList.find(bsktInfo => bsktInfo.bsktId === asisApplCpn.bsktId)
              .ordsItemCpnPromExpnsInqRsltList.find(cpnInfo => cpnInfo.promId === asisApplCpn.promId && cpnInfo.cpnIsseSeqno === asisApplCpn.cpnIsseSeqno).applYn = false;

            // - 쿠폰목록에서 기존BSKT_ID를 사용하고 있는 상품쿠폰정보를 삭제한다.
            applItemCpnList.splice(applItemCpnList.findIndex(applCpn => applCpn.bsktId === asisApplCpn.bsktId), 1);
          }

          // 신규상품이 이미 적용하고 있던 쿠폰정보가 존재하면
          if (tobeApplCpn) {
            // - 적용된 쿠폰목록에서 신규상품의 이미 적용되고 있던 쿠폰정보를 삭제처리
            applItemCpnList.splice(applItemCpnList.findIndex(applCpn => applCpn.bsktId === this.bsktItemInfo.bsktId), 1);
            // - 신규상품의 쿠폰목록에서 이미 적용되고 있던 쿠폰정보를 삭제처리
            tobeApplCpn.applYn = false;
          }

          // - 쿠폰목록에서 적용될 신규쿠폰정보를 추가한다.
          applItemCpnList.push({
            'bsktId': selCpnInfo.bsktId, // 장바구니ID
            'promId': selCpnInfo.promId, // 프로모션ID
            'cmmMbrNo': selCpnInfo.cmmMbrNo, // 커머스회원번호
            'cpnIsseSeqno': selCpnInfo.cpnIsseSeqno, // 쿠폰발급일련번호
            'dcAmt': selCpnInfo.dcAmt, // 할인금액
            'itemNm': this.bsktItemInfo.itemNm, // 상품명
            'supplFirmCd': this.bsktItemInfo.supplFirmCd, // 공급업체코드
            'dlfeeId': this.bsktItemInfo.dlfeeId, // 배송비ID
            'maxBeneYn': rcmdCpnApplYn, // 맞춤혜택가 적용 여부
          });

          // - 적용된 쿠폰목록에서 신규상품쿠폰정보를 적용처리
          supplFirmList.find(supplInfo => supplInfo.supplFirmCd === this.bsktItemInfo.supplFirmCd)
            .bsktInqByDlfeeIdDtoList.find(dlfeeInfo => dlfeeInfo.dlfeeId === this.bsktItemInfo.dlfeeId)
            .bsktInqRsltDtoList.find(bsktInfo => bsktInfo.bsktId === this.bsktItemInfo.bsktId)
            .ordsItemCpnPromExpnsInqRsltList.find(cpnInfo => cpnInfo.promId === selCpnInfo.promId && cpnInfo.cpnIsseSeqno === selCpnInfo.cpnIsseSeqno).applYn = true;
        }

      // 2. 선택된 쿠폰정보가 존재하지 않는 경우 (상품에 쿠폰적용 안함 선택 시)
      } else {
        // 2-1. 기존 상품에 적용된 상품쿠폰이 존재했는지 체크(적용쿠폰 없음)
        if (!tobeApplCpn) {
          // - 존재하지 않았다면 아무런 처리 없이 종료
          return;
        // 2-2. 기존 상품에 적용된 상품쿠폰이 존재했는지 체크(적용쿠폰 있음)
        } else {
          // - 적용된 쿠폰목록에서 기존상품쿠폰정보를 삭제처리
          applItemCpnList.splice(applItemCpnList.findIndex(applCpn => applCpn.bsktId === this.bsktItemInfo.bsktId), 1);
          // - 기존 상품의 쿠폰목록에서 적용된 쿠폰정보를 삭제처리
          tobeApplCpn.applYn = false;
        }
      }

      // 3. (1-1/2-1)의 경우가 아니라면 장바구니 금액 다시 계산 호출
      this.calcBasketTotalAmt();
      // 맞춤혜택가 취소
      this.$refs.footerOrder.changeMaxBnftYn(false);
    },
    // 상품상세 이동 처리 함수
    goItemDetail(bskt) {
      const url = '/md/product_detail?itemId=' + bskt.itemId + '&storId=' + bskt.storId + '&supplFirmCd=' + bskt.supplFirmCd + '&mallId=' + bskt.mallId;
      location.href = SiteUtils.marketformo(url);
    },
    // 메인 홈 이동 함수
    goShop() {
      location.href = SiteUtils.to(CookieUtils.getMallId(), '/');
    },
    // 강제 로그아웃처리 함수(쿠키정보를 삭제한다.)
    bsktLogOut() {
      JwtUtils.destroyIdToken();
      this.loginYn = false;
    },
    // 로그인 화면으로 이동 함수
    goLogin() {
      const oneToOneUrl = SiteUtils.commo('/od/mf/bskt');
      SiteUtils.go(location.host, '/cu/login?returnUrl=' + oneToOneUrl);
    },
    // 배송지 정보를 Data에 등록
    selectMbrDlvp(mbrDlvp) {
      this.mbrDlvpTemp = mbrDlvp;
    },
    // 기본배송지 정보를 변경 처리 함수
    async changeMbrDlvp(baseDlvpYn) {
      if (baseDlvpYn === 'Y') {
        const iput = {
          cmmMbrNo: this.mbrDlvpTemp.cmmMbrNo,
          mbrDlvpSeqno: this.mbrDlvpTemp.mbrDlvpSeqno,
          baseDlvpYn: 'Y',
          dlvpNm: this.mbrDlvpTemp.dlvpNm,
          zipcd: this.mbrDlvpTemp.zipcd,
          lotnoAddr: this.mbrDlvpTemp.encLotnoBaseAddr,
          stnmAddr: this.mbrDlvpTemp.encStnmBaseAddr,
          dtlAddr: this.mbrDlvpTemp.encLotnoDtlAddr,
          adrsNm: this.mbrDlvpTemp.encAdrsNm,
          moblTelNo: this.mbrDlvpTemp.encMoblTelNo,
          telNo: this.mbrDlvpTemp.encTelNo,
          useYn: this.mbrDlvpTemp.useYn,
          itemDlvrMethoCd: this.mbrDlvpTemp.itemDlvrMethoCd,
          itemDlvrMethoAddCd: this.mbrDlvpTemp.itemDlvrMethoAddCd,
          itemDlvrMethoDtlCnts: this.mbrDlvpTemp.itemDlvrMethoDtlCnts,
          delivInfmTmznCd: this.mbrDlvpTemp.delivInfmTmznCd,
          delivMsgCnts: this.mbrDlvpTemp.delivMsgCnts,
        };
        this.showLoading(true);
        const result = await ApiUtils.put('/fo/cu/mypgmgnt/deliveryplace', iput);
        this.showLoading(false);
        if (result.data.success) {
          this.mbrDlvp = this.mbrDlvpTemp;
          JwtUtils.saveEncVal(result.data.data.encVal);
          CookieUtils.setCookie('STOR_ID', result.data.data.storId);
          CookieUtils.setCookie('SUPPL_FIRM_CD', result.data.data.supplFirmCd);
          CookieUtils.setCookie('SIMPLE_STOR_ID', result.data.data.simpleStorId);
          CookieUtils.setCookie('SIMPLE_SUPPL_FIRM_CD', result.data.data.simpleSupplFirmCd);
          CookieUtils.setCookie('SIMPLE_MALL_ID', result.data.data.simpleMallId);
          this.getBskt('U');
        } else {
          this.$gsdialog.alert(result.data.statusMessage);
        }
      } else {
        this.mbrDlvp = this.mbrDlvpTemp;
        this.getBskt('U');
      }
    },
    // 장바구니 전체 재계산 함수
    calcBasketTotalAmt() {
      /* *************************************************************
        * 재계산 방식
          1. 적용된 쿠폰정보를 찾아서 상품에 적용한다.
          2. 각 상품별로 배송비유형에 맞게 배송비를 계산 후 적용한다.
          3. 배송비유형별 합계를 계산 후 적용한다.
          4. 공급업체별 합계를 계산 후 적용한다.
          5. 총 합계를 계산 후 적용한다.
      ************************************************************* */
      // 재계산 합계 변수 초기화
      this.bsktInqRsltDto.totDlfee = 0; // 총배송비
      this.bsktInqRsltDto.totItemCpnDcAmt = 0; // 총상품쿠폰할인금액
      this.bsktInqRsltDto.totItemDcSprc = 0; // 총상품할인매가
      this.bsktInqRsltDto.totItemSprc = 0; // 총상품매가
      this.bsktInqRsltDto.totNormItemSprc = 0; // 총상품정상가
      let totItemCnt = 0; // 총상품갯수
      let chkItemCnt = 0; // 선택상품갯수

      // 장바구니 상품이 없으면 재계산 합계 적용 후 중단.
      if (this.bsktInqRsltDto.supplFirmDtoList == null || this.bsktInqRsltDto.supplFirmDtoList.length == 0) {
        return;
      }

      this.bsktInqRsltDto.supplFirmDtoList.some(supplInfo => {
        // 공급업체별 재계산 합계 변수 초기화
        supplInfo.dlfee = 0; // 공급업체별배송비
        supplInfo.itemCpnDcAmt = 0; // 공급업체별상품쿠폰할인금액
        supplInfo.itemDcSprc = 0; // 공급업체별상품할인매가
        supplInfo.itemSprc = 0; // 공급업체별상품매가
        supplInfo.normItemSprc = 0; // 공급업체별상품정상가

        // 공급업체별 장바구니 상품이 없으면 재계산 합계 적용 후 다은으로 넘어간다.
        if (supplInfo.bsktInqByDlfeeIdDtoList == null || supplInfo.bsktInqByDlfeeIdDtoList.length == 0) {
          return false;
        }

        supplInfo.bsktInqByDlfeeIdDtoList.some(dlfeeInfo => {
          // 배송비유형별 재계산 합계 변수 초기화
          dlfeeInfo.totDlfee = 0; // 배송별 배송비
          dlfeeInfo.totItemCpnDcAmt = 0; // 배송별 상품쿠폰할인금액
          dlfeeInfo.totItemDcSprc = 0; // 배송별 상품할인매가
          dlfeeInfo.totItemSprc = 0; // 배송별 상품매가
          dlfeeInfo.totNormItemSprc = 0; // 배송별 상품정상가

          // 배송비유형별 장바구니 상품이 없으면 재계산 합계 적용 후 다음으로 넘어간다.
          if (dlfeeInfo.bsktInqRsltDtoList == null || dlfeeInfo.bsktInqRsltDtoList.length == 0) {
            return false;
          }

          // 배송비유형별 재계산 합계 변수 초기화
          const accuItemIds = []; // 누적상품ID Array
          const accuDlfeeId = []; // 누적배송비ID Array

          // 각 상품에 대한 쿠폰 정보 Update.
          dlfeeInfo.bsktInqRsltDtoList.some(itemInfo => {
            // 선택되지 않은 상품은 Skip
            if (!itemInfo.chk) return false;

            // 1. 적용된 쿠폰정보를 찾아서 상품에 적용한다.
            if (itemInfo.ordsItemCpnPromExpnsInqRsltList != null && itemInfo.ordsItemCpnPromExpnsInqRsltList.length > 0) {
              // 변경된 상품정보 기준으로 쿠폰할인금액을 다시 계산적용.
              itemInfo.ordsItemCpnPromExpnsInqRsltList.forEach(cpnInfo => cpnInfo.dcAmt = this.calcItemCoupon(cpnInfo, itemInfo.sellAmt, itemInfo.bsktQty));
              const applItemCpn = itemInfo.ordsItemCpnPromExpnsInqRsltList.find(cpnInfo => cpnInfo.applYn === true); // 적용상품쿠폰
              // 적용된 쿠폰이 있으면 아래 로직 수행
              if (!!applItemCpn) {
                // 적용된 상품쿠폰할인금액을 해당 상품할인금액에 적용처리
                itemInfo.itemCpnDcAmt = applItemCpn.dcAmt;
                // 이미적용된 쿠폰목록에서 해당쿠폰정보 Update
                this.bsktInqRsltDto.applItemCpnList.find(
                  applCpn => applCpn.bsktId === applItemCpn.bsktId &&
                              applCpn.cmmMbrNo === applItemCpn.cmmMbrNo &&
                              applCpn.promId === applItemCpn.promId &&
                              applCpn.cpnIsseSeqno === applItemCpn.cpnIsseSeqno
                ).dcAmt = applItemCpn.dcAmt;
              } else {
                itemInfo.itemCpnDcAmt = 0;
              }
              // 변경된 할인정보에 맞게 쿠폰목록을 다시 정렬한다.
              itemInfo.ordsItemCpnPromExpnsInqRsltList.sort((a, b) => {
                // 쿠폰목록 정렬 규칙 ( 1.할인금액(내림차순), 2.쿠폰사용종료기간(오름차순), 3.프로모션ID+쿠폰발급일련번호(오름차순) )
                return a.dcAmt > b.dcAmt ? -1 :
                       (a.dcAmt < b.dcAmt ? 1 :
                         (DateUtils.format(a.cpnValidDurEndDttm, 'YYYYMMDDHHmm') < DateUtils.format(a.cpnValidDurEndDttm, 'YYYYMMDDHHmm') ? -1 :
                         (DateUtils.format(a.cpnValidDurEndDttm, 'YYYYMMDDHHmm') > DateUtils.format(a.cpnValidDurEndDttm, 'YYYYMMDDHHmm') ? 1 :
                          (`${a.promId}${a.cpnIsseSeqno}` < `${b.promId}${b.cpnIsseSeqno}`) ? -1 :
                          (`${a.promId}${a.cpnIsseSeqno}` > `${b.promId}${b.cpnIsseSeqno}`) ? 1 : 0)));
              });
            }
          });

          dlfeeInfo.bsktInqRsltDtoList.some(itemInfo => {
            totItemCnt++;

            // 선택되지 않은 상품은 Skip
            if (!itemInfo.chk) return false;
            chkItemCnt++;

            // 상품매가 : (판매가 + 단품추가금액)
            itemInfo.itemSprc = itemInfo.sellAmt + itemInfo.skuAddAmt;

            // 상품ID 중복여부 체크
            if (!accuItemIds.includes(itemInfo.itemId) && !(accuDlfeeId.includes(dlfeeInfo.dlfeeId) && dlfeeInfo.dlfeeApplTypeCd == 'CD')) {
              // 상품ID가 중복되지 않으면 등록
              accuItemIds.push(itemInfo.itemId);
              // 배송비ID가 중복되지 않으면 등록
              accuDlfeeId.push(dlfeeInfo.dlfeeId);
              // 2. 각 상품별로 배송비유형에 맞게 배송비를 계산 후 적용한다.
              dlfeeInfo.totDlfee += this.calcDlfeeAmt(dlfeeInfo, itemInfo);
            }

            // 상품쿠폰할인금액 SUM
            dlfeeInfo.totItemCpnDcAmt += itemInfo.itemCpnDcAmt;
            // 상품할인매가 SUM
            dlfeeInfo.totItemDcSprc += (itemInfo.itemSprc * itemInfo.bsktQty) - itemInfo.itemCpnDcAmt;
            // 상품매가 SUM
            dlfeeInfo.totItemSprc += itemInfo.itemSprc * itemInfo.bsktQty;
            // 상품정상가 SUM
            if (!!dlfeeInfo.totNormItemSprc) {
              dlfeeInfo.totNormItemSprc += (itemInfo.normSprc * itemInfo.bsktQty) + (itemInfo.skuAddAmt * itemInfo.bsktQty);
            } else {
              dlfeeInfo.totNormItemSprc = (itemInfo.normSprc * itemInfo.bsktQty) + (itemInfo.skuAddAmt * itemInfo.bsktQty);
            }
          });
          supplInfo.dlfee += dlfeeInfo.totDlfee;
          supplInfo.itemCpnDcAmt += dlfeeInfo.totItemCpnDcAmt;
          supplInfo.itemDcSprc += dlfeeInfo.totItemDcSprc;
          supplInfo.itemSprc += dlfeeInfo.totItemSprc;
          if (!!supplInfo.normItemSprc) {
            supplInfo.normItemSprc += dlfeeInfo.totNormItemSprc || 0;
          } else {
            supplInfo.normItemSprc = dlfeeInfo.totNormItemSprc || 0;
          }
        });
        this.bsktInqRsltDto.totDlfee += supplInfo.dlfee;
        this.bsktInqRsltDto.totItemCpnDcAmt += supplInfo.itemCpnDcAmt;
        this.bsktInqRsltDto.totItemDcSprc += supplInfo.itemDcSprc;
        this.bsktInqRsltDto.totItemSprc += supplInfo.itemSprc;
        this.bsktInqRsltDto.totItemCnt = chkItemCnt;
        if (!!this.bsktInqRsltDto.totNormItemSprc) {
          this.bsktInqRsltDto.totNormItemSprc += supplInfo.normItemSprc || 0;
        } else {
          this.bsktInqRsltDto.totNormItemSprc = supplInfo.normItemSprc || 0;
        }
      });
    },
    // 배송비금액 계산 함수
    calcDlfeeAmt(dlfeeInfo, itemInfo) {
      /* *************************************************************
        * 배송비유형별 정의
          - FR:무료 : 상품에 상관없이 무조건 배송비 무료
          - PA:유료 : 상품(ITEM_ID 기준)별로 수량에 관계 없이 기준배송비를 부과한다.
          - CD:배송처조건부무료 : 일정 금액 이상 구입 시 배송처가 같은 상품에 한해 배송비 무료
          - CI:상품조건부무료 : 같은 상품(ITEM_ID 기준)을 일정 금액 이상 구입 시 상품에 대한 배송비가 무료
          - PQ:수량별 부과 : 상품(ITEM_ID 기준)별로 배송비추가기준수량(dlfeeAddStandQty)을 초과 할때마다 배송비가 추가로 부과된다.
      ************************************************************* */
      let sumSellAmt = 0;
      let sumSkuAddAmt = 0;
      let sumBsktQty = 0;
      let sumItemCpnDcAmt = 0;
      if (dlfeeInfo.dlfeeApplTypeCd === 'FR') { // 배송비유형 FR:무료
        return 0;
      } else if (dlfeeInfo.dlfeeApplTypeCd === 'PA') { // 배송비유형 PA:유료
        return dlfeeInfo.standDlfee;
      } else if (dlfeeInfo.dlfeeApplTypeCd === 'CD') { // 배송비유형 CD:배송처조건부무료
        dlfeeInfo.bsktInqRsltDtoList.forEach(item => {
          if (!item.chk) return false;
          sumSellAmt += item.sellAmt * item.bsktQty;
          sumSkuAddAmt += item.skuAddAmt * item.bsktQty;
          sumItemCpnDcAmt += item.itemCpnDcAmt;
        });
        return (sumSellAmt - sumItemCpnDcAmt) + (sumSkuAddAmt) < dlfeeInfo.freeDelivStandAmt ? dlfeeInfo.standDlfee : 0;
      } else if (dlfeeInfo.dlfeeApplTypeCd === 'CI') { // 배송비유형 CI:상품조건부무료
        dlfeeInfo.bsktInqRsltDtoList.filter(item => item.itemId === itemInfo.itemId).some(item => {
          if (!item.chk) return false;
          sumSellAmt += item.sellAmt * item.bsktQty;
          sumSkuAddAmt += item.skuAddAmt * item.bsktQty;
          sumItemCpnDcAmt += item.itemCpnDcAmt;
        });
        return (sumSellAmt - sumItemCpnDcAmt) + (sumSkuAddAmt) < dlfeeInfo.freeDelivStandAmt ? dlfeeInfo.standDlfee : 0;
      } else if (dlfeeInfo.dlfeeApplTypeCd === 'PQ') { // 배송비유형 PQ:수량별 부과
        dlfeeInfo.bsktInqRsltDtoList.filter(item => item.itemId === itemInfo.itemId).some(item => {
          if (!item.chk) return false;
          sumBsktQty += item.bsktQty;
        });
        return dlfeeInfo.standDlfee * Math.ceil(sumBsktQty/dlfeeInfo.dlfeeAddStandQty);
      }
    },
    // 상품 적용 금액 계산
    calcItemCoupon(applItemCpn, sellAmt, bsktQty) {
      let dcAmt = 0;
      if (!!applItemCpn) {
        if (applItemCpn.dcTypeCd === 'A') { // 정액쿠폰 할인유형
          // 상품쿠폰할인금액 : 할인금액
          dcAmt = applItemCpn.dcAmt;
        } else if (applItemCpn.dcTypeCd === 'R') { // 정율쿠폰 할인유형
          // 쿠폰 적용가 : (판매가(sellAmt) * 수량(bsktQty)) * (쿠폰할인율 / 100) ) : 소수점 이하 버림 이후 원단위 올림처리
          const maxDcAmt = StringUtils.isEmpty(applItemCpn.maxDcAmt) && applItemCpn.maxDcAmt < 0 ? 99999999 : applItemCpn.maxDcAmt;
          dcAmt = Math.min(Math.ceil(Math.floor((sellAmt * bsktQty) * (applItemCpn.beneApplVal / 100)) / 10) * 10, maxDcAmt);
        }
      }
      return dcAmt;
    },
    isBaskItem() {
      const isFlag = Object.entries(this.bsktInqRsltDto).length > 0 && this.isNotEmpty(this.bsktInqRsltDto.supplFirmDtoList) && this.bsktInqRsltDto.supplFirmDtoList.length > 0;
      return isFlag;
    },
    // 선택 상품 삭제 또는 품절상품 전체 삭제 처리 함수 (delType : 장바구니상품삭제:B, 품절상품삭제:S)
    async selectedDeleteBskt(delType) {
      let confMsg = "";
      if (delType === 'B') {
        let selBsktItemCnt = 0;
        this.bsktInqRsltDto.supplFirmDtoList.forEach(supplInfo =>
              supplInfo.bsktInqByDlfeeIdDtoList.forEach(dlfeeInfo =>
                dlfeeInfo.bsktInqRsltDtoList.forEach(bsktInfo => bsktInfo.chk ? selBsktItemCnt++ : false)));
        if (selBsktItemCnt <= 0) {
          this.$gsdialog.alert(OrderMsg.selectDelItem);
          return;
        }
        confMsg = `선택한 ${selBsktItemCnt}개의 상품을 삭제하시겠습니까?`;
      } else if (delType === 'S') {
        confMsg = `품절상품을 모두 삭제하시겠습니까?`;
      }
      const confirmYn = await this.$gsdialog.confirm(confMsg);
      if (!confirmYn) return;
      const chkBsktItems = [];
      const soldItems = [];
      let supplInfo = null;
      let dlfeeInfo = null;
      for (let supplIdx = this.bsktInqRsltDto.supplFirmDtoList.length - 1; supplIdx >= 0; supplIdx--) {
        supplInfo = this.bsktInqRsltDto.supplFirmDtoList[supplIdx];
        if (delType === 'B') {
          // 선택 된 장바구니 상품 Set
          if (!this.isListEmpty(supplInfo.bsktInqByDlfeeIdDtoList)) {
            for (let dlfeeIdx = supplInfo.bsktInqByDlfeeIdDtoList.length - 1; dlfeeIdx >= 0; dlfeeIdx--) {
              dlfeeInfo = supplInfo.bsktInqByDlfeeIdDtoList[dlfeeIdx];
              if (!this.isListEmpty(dlfeeInfo.bsktInqRsltDtoList)) {
                for (let itemIdx = dlfeeInfo.bsktInqRsltDtoList.length - 1; itemIdx >= 0; itemIdx--) {
                  if (dlfeeInfo.bsktInqRsltDtoList[itemIdx].chk) {
                    chkBsktItems.push(dlfeeInfo.bsktInqRsltDtoList.splice(itemIdx, 1)[0]);
                  }
                }
                // 삭제 대상 상품이 소속된 배송비ID 목록의 상품 갯수가 0이면 배송비ID 정보 삭제
                if (this.isListEmpty(dlfeeInfo.bsktInqRsltDtoList)) {
                  supplInfo.bsktInqByDlfeeIdDtoList.splice(dlfeeIdx, 1);
                }
                // 삭제 대상 상품이 소속된 공급업체 목록의 상품 갯수가 0이고 품절상품이 0이면 배송비ID 정보 삭제
                if (this.isListEmpty(supplInfo.bsktInqByDlfeeIdDtoList) && this.isListEmpty(supplInfo.soldoutBsktInqRsltDtoList)) {
                  this.bsktInqRsltDto.supplFirmDtoList.splice(supplIdx, 1);
                }
              }
            }
          }
        } else if (delType === 'S') {
          // 품절 상품 정보를 Set
          if (!this.isListEmpty(supplInfo.soldoutBsktInqRsltDtoList)) {
            for (let soldIdx = supplInfo.soldoutBsktInqRsltDtoList.length - 1; soldIdx >= 0; soldIdx--) {
              soldItems.push(supplInfo.soldoutBsktInqRsltDtoList.splice(soldIdx, 1)[0]);
            }
            // 삭제 대상 상품이 소속된 공급업체 목록의 상품 갯수가 0이고 품절상품이 0이면 배송비ID 정보 삭제
            if (this.isListEmpty(supplInfo.bsktInqByDlfeeIdDtoList) && this.isListEmpty(supplInfo.soldoutBsktInqRsltDtoList)) {
              this.bsktInqRsltDto.supplFirmDtoList.splice(supplIdx, 1);
            }
          }
        }
      }
      if (delType === 'B') {
        this.deleteBskt(chkBsktItems);
      } else if (delType === 'S') {
        this.deleteBskt(soldItems);
      }
    },
    // 장바구니 상품 목록에서 삭제 처리 함수
    async deleteBskt(bsktList) {
      const bsktIds = [];
      const prodData = [];
      if (!bsktList && bsktList.length > 0) {
        return;
      }
      bsktList.forEach(bskt => {
        // 삭제할 장바구니상품 ID
        bsktIds.push(bskt.bsktId);
        // 앱트래커 관련
        prodData.push({
          "PROD_ID": bskt.itemId,
          "PROD_NM": bskt.itemNm,
          "PROD_CAT": bskt.dspCtgId
        });
      });
      const iBsktPut = {
        bsktIds: bsktIds,
        sessnId: CookieUtils.getOdBsktUuid(),
      };
      this.showLoading(true);
      const result = await ApiUtils.delete('/fo/od/mf/bsktmgnt/basket-del', iBsktPut);
      this.showLoading(false);
      if (result.data.success) {
        Tracker.prodRemoveFromCart(prodData);// 앱트래커 장바구니 삭제완료시
        // 상품 삭제 처리 후 상품 목록 재조회 함수 호출
        this.getBskt('U');
        // Header 메뉴의 장바구니 수량을 갱신.
        this.$store.dispatch('getBsktQtyInfo', { odBsktUuid: CookieUtils.getOdBsktUuid() });
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    // 상품을 장바구니에 담기위한 함수
    async putBskt(data, ordTypeCd, delivTypeCd) {
      const result = await Basket.putMultiBskt(data, ordTypeCd, delivTypeCd, this.mbrDlvp.zipcd);
      if (result.data.success) {
        this.$gsdialog.alert(OrderMsg.putBsktItem).then(dialog => {
          this.addBsktItemIds = result.data.data.bsktIds[0];
          this.getBskt('U');
          // Header 메뉴의 장바구니 수량을 갱신.
          this.$store.dispatch('getBsktQtyInfo', { odBsktUuid: CookieUtils.getOdBsktUuid() });
        });
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    // 장바구니 상품 목록 정보 조회 함수
    async getBskt(inqType) {
      this.showLoading(true);
      // 최초 장바구니목록 조회 시 맞춤 혜택가 적용 여부 관련 초기값 Set
      if (inqType === 'S') {
        this.maxBnftYn = true;
        this.chkAllBsktYn = true;
      }
      // 장바구니목록 조회를 위한 테스트 파라밋터 세팅
      const bsktIds = [];
      // 추가 장바구니 상품이 존재하면 BsktId 추가
      if (this.isNotEmpty(this.addBsktItemIds)) {
        bsktIds.push(this.addBsktItemIds);
        this.addBsktItemIds = null;
      }
      if (this.bsktInqRsltDto !== null && Object.entries(this.bsktInqRsltDto).length !== 0) {
        // 선택된 장바구니ID를 bsktIds Array에 PUSH
        this.bsktInqRsltDto.supplFirmDtoList.forEach(supplInfo =>
          supplInfo.bsktInqByDlfeeIdDtoList.forEach(dlfeeInfo =>
            dlfeeInfo.bsktInqRsltDtoList.forEach(bsktInfo => bsktInfo.chk ? bsktIds.push(bsktInfo.bsktId) : false)));
      }
      const iBsktPut = {
        bsktIds: bsktIds, // 장바구니 목록에서 선택된 상품ID를 배열로 담는다.
        inqType: inqType,
        zipcd: this.mbrDlvp.zipcd,
        todaySupplFirmCd: this.mbrDlvp.supplFirmCd,
        dawnSupplFirmCd: this.mbrDlvp.dawnSupplFirmCd,
        applItemCpnList: this.bsktInqRsltDto.applItemCpnList,
        maxBnftYn: this.maxBnftYn ? 'Y' : 'N', // 맞춤 해택가 적용 여부
        mallId: CookieUtils.getMallId(),
        sessnId: CookieUtils.getOdBsktUuid(),
        bsktTypeCd: "1", // 장바구니유형코드
      };
      const bsktListResult = await ApiUtils.post('/fo/od/mf/bsktmgnt/basket-item-list', iBsktPut);
      if (!bsktListResult.data.success) {
        if (bsktListResult.data.statusCode=="dev.warn.com.notlogin") { // 로그인 에러 발생시
          this.bsktLogOut(); // 강제 로그아웃 처리(쿠키 정보 삭제)
        } else {
          this.$gsdialog.alert(OrderMsg.selectBsktListFail, {html: true});
        }
      } else {
        const totDlfee = this.bsktInqRsltDto.totDlfee || 0;
        const totItemCpnDcAmt = this.bsktInqRsltDto.totItemCpnDcAmt || 0;
        const totItemDcSprc = this.bsktInqRsltDto.totItemDcSprc || 0;
        const totItemSprc = this.bsktInqRsltDto.totItemSprc || 0;
        const totItemCnt = this.bsktInqRsltDto.totItemCnt || 0;
        const totNormItemSprc = this.bsktInqRsltDto.totNormItemSprc || 0;

        this.bsktInqRsltDto = bsktListResult.data.data;

        // 전 총합계금액 유지 및 초기화
        this.bsktInqRsltDto.totDlfee = totDlfee;
        this.bsktInqRsltDto.totItemCpnDcAmt = totItemCpnDcAmt;
        this.bsktInqRsltDto.totItemDcSprc = totItemDcSprc;
        this.bsktInqRsltDto.totItemSprc = totItemSprc;
        this.bsktInqRsltDto.totItemCnt = totItemCnt;
        this.bsktInqRsltDto.totNormItemSprc = totNormItemSprc;

        // 더반찬 새벽배송가능여부 조회
        if (!!this.bsktInqRsltDto && !!this.bsktInqRsltDto.supplFirmDtoList && this.bsktInqRsltDto.supplFirmDtoList.find(supplInfo => supplInfo.mallId === '302')) {
          const iDawnDelivInq = { postNo: this.mbrDlvp.zipcd };
          const response = await ApiUtils.post('/fo/od/mf/bsktmgnt/getTheBanchanDawnDeliYn', iDawnDelivInq);
          const DawnDeliInfo = response.data.data;
          this.$set(this.bsktInqRsltDto, 'dawndeliYn', (DawnDeliInfo !== null && DawnDeliInfo.dawndeliYn === 'Y') ? true : false);
        }
      }

      // 장바구니 금액 다시 계산 호출
      await this.calcBasketTotalAmt();

      // Tracker 호출
      if (bsktListResult.data.success && inqType === "S") {
        if (this.bsktInqRsltDto !== null && Object.entries(this.bsktInqRsltDto).length !== 0) {
          Tracker.viewBasket(this.bsktInqRsltDto, this.$gtag);
        }
      }

      this.showLoading(false);
    },
    // 맞춤혜택가여부 값을 제어하는 함수
    setMaxBnft(maxBnftYn) {
      this.maxBnftYn = maxBnftYn;
      if (this.maxBnftYn) this.getBskt('U');
    },
    // 장바구니 화면에서 주문결제 화면으로 이동 전 Validation
    async vaildBskt() {
      // 로그인여부 체크
      if (!LoginUtils.isLogin()) {
        this.$gsdialog.alert(OrderMsg.buyItemNoLogin).then(dialog => {
          this.goLogin();
        });
        return;
      }

      // 상품수량 KeyIn으로 수정 중 결제버튼 클릭 시 이벤트 제어 함수로 처리.
      if (!this.actionEventCntl('4')) return;

      const chkBsktItems = []; // 선택 된 장바구니 상품 목록
      const soldItems = []; // 품절상품 목록
      this.bsktInqRsltDto.supplFirmDtoList.forEach(supplInfo => {
        // 선택 된 장바구니 상품 Set
        if (supplInfo.bsktInqByDlfeeIdDtoList) {
          supplInfo.bsktInqByDlfeeIdDtoList.forEach(dlfeeInfo => {
            if (dlfeeInfo.bsktInqRsltDtoList) {
              dlfeeInfo.bsktInqRsltDtoList.forEach(itemInfo => (itemInfo.chk) ? chkBsktItems.push(itemInfo) : false);
            }
          });
        }
        // 품절 상품 정보를 Set
        if (supplInfo.soldoutBsktInqRsltDtoList) {
          supplInfo.soldoutBsktInqRsltDtoList.forEach(soldItem => soldItems.push(soldItem));
        }
      });

      // 배송지 관련 정보 유효성 체크
      if (!this.mbrDlvp.mbrDlvpSeqno || this.mbrDlvp.mbrDlvpSeqno === 0) {
        this.$gsdialog.alert(OrderMsg.selectMbrDlvp);
        return;
      } else if (!this.mbrDlvp.encMoblTelNo || isNaN(this.mbrDlvp.encMoblTelNo)) {
        this.$gsdialog.alert(OrderMsg.mbrDlvpFail, {html: true});
        return;
      } else if (!this.mbrDlvp.encAdrsNm || StringUtils.isEmpty(this.mbrDlvp.encAdrsNm)) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('수취인 정보'));
        return;
      } else if (!this.mbrDlvp.zipcd || StringUtils.isEmpty(this.mbrDlvp.zipcd)) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('우편번호'));
        return;
      } else if ((!this.mbrDlvp.encLotnoBaseAddr || StringUtils.isEmpty(this.mbrDlvp.encLotnoBaseAddr))
        && (!this.mbrDlvp.encStnmBaseAddr || StringUtils.isEmpty(this.mbrDlvp.encStnmBaseAddr))) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('주소지 정보'));
        return;
      } else if ((!this.mbrDlvp.encTelNo || StringUtils.isEmpty(this.mbrDlvp.encTelNo))
        && (!this.mbrDlvp.encMoblTelNo || StringUtils.isEmpty(this.mbrDlvp.encMoblTelNo))) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('연락처'));
        return;
      }
      // 선택 상품 존재 여부 체크
      if (!chkBsktItems || chkBsktItems.length <= 0) {
        this.$gsdialog.alert(OrderMsg.noOrderItem);
        return;
      }
      // 전체상품 주문 시 품절 상품 존재 시 메세지 알림
      if (this.chkAllBsktYn && !!soldItems && soldItems.length > 0) {
        let strMsg = `품절 상품을 제외하고 주문합니다.<br/><br/>`;
        soldItems.forEach(soldInfo => strMsg += ` - ${soldInfo.itemNm}<br/>`);
        await this.$gsdialog.alert(strMsg, {html: true});
      }

      // 장바구니 처리 함수 호출.
      this.procBskt(chkBsktItems);
    },
    // 주문결제 화면이동 처리 함수
    async procBskt(chkBsktItems) {
      // 주문서 등록 처리 변수 초기화
      const bsktOptDlvpInfoList = [];
      const bsktOptDelivTypeGrpInfoList = [];
      let bsktOptItemInfoList = [];
      let bsktOptItemCpnInfoList = [];

      // 배송유형코드 중복제거 Array
      const disttDelivType = chkBsktItems.reduce((items, currItem) => items.includes(currItem.delivTypeCd) ? items : [...items, currItem.delivTypeCd], []);
      disttDelivType.some(delivType => {
        bsktOptItemInfoList = []; // 장바구니옵션상품정보목록 초기화
        chkBsktItems.filter(item => delivType === item.delivTypeCd).some(item => {
          // 장바구니상품에 적용된 쿠폰정보 검색
          bsktOptItemCpnInfoList = []; // 적용상품쿠폰정보목록 초기화
          if (!this.isListEmpty(item.ordsItemCpnPromExpnsInqRsltList)) {
            item.ordsItemCpnPromExpnsInqRsltList.forEach(cpnInfo => {
              if (cpnInfo.applYn) {
                // 장바구니옵션상품쿠폰정보목록 Set
                bsktOptItemCpnInfoList.push({
                  promId: cpnInfo.promId,
                  cpnIsseSeqno: cpnInfo.cpnIsseSeqno
                });
              }
            });
          }

          // 장바구니옵션상품정보목록 Set
          bsktOptItemInfoList.push({
            bsktId: item.bsktId, // 장바구니ID
            storId: item.storId, // 매장ID
            supplFirmCd: item.supplFirmCd, // 공급업체코드
            delivPolcId: item.dlfeeId, // 배송비ID (배송정책ID에 Set)
            bsktOptItemCpnInfoList: bsktOptItemCpnInfoList // 적용상품쿠폰정보목록
          });
        });

        // 장바구니옵션배송유형그룹정보 Set
        if (this.isListEmpty(bsktOptItemInfoList)) return false;
        bsktOptDelivTypeGrpInfoList.push({
          ordTypeCd: bsktOptItemInfoList[0].ordTypeCd,
          delivTypeCd: bsktOptItemInfoList[0].delivTypeCd,
          bsktOptItemInfoList: bsktOptItemInfoList
        });
      });

      // 장바구니옵션배송지정보목록 Set
      bsktOptDlvpInfoList.push({
        mbrDlvpSeqno: this.mbrDlvp.mbrDlvpSeqno, // 회원배송지일련번호 Set
        bsktOptDelivTypeGrpInfoList: bsktOptDelivTypeGrpInfoList // 장바구니옵션배송유형그룹정보목록 Set
      });

      // 장바구니 정보를 주문서 정보로 등록 처리 API 호출
      this.showLoading(true);
      const result = await ApiUtils.post('/fo/od/mf/ordsmgnt/ordersheet', { bsktOptDlvpInfoList: bsktOptDlvpInfoList });
      const data = result.data.data;

      // 주문서 이동 관련 처리
      if (result.data.success) {
        this.$store.state.ordId = data.ordId;
        location.href = SiteUtils.commo('/od/mf/ordersheet/' + data.ordId);
      } else {
        // 1008 : CRM에서 사용자 연락처 없는 경우 에러 처리
        if (result.data.statusCode == '1008') {
          this.$gsdialog.alert(result.data.statusMessage, {html: true}).then(() => {
            location.href = SiteUtils.commo('/cu/my_page');
          });
        } else {
          this.$gsdialog.alert(result.data.statusMessage, {html: true});
        }
      }
      this.showLoading(false);
    },
    // 장바구니 상품의 수량 Update 처리 함수
    async updateBskt(bskt) {
      this.actionEventCntl('1'); // 상품수량 KeyIn Focus 진입 시 이벤트 함수 호출
      const iBsktPut = {
        bsktId: bskt.bsktId,
        bsktQty: bskt.bsktQty,
        sessnId: CookieUtils.getOdBsktUuid()
      };
      // 장바구니 상품 수량 변경 시 0.5초 안에 다시 변경 하면 해당 Update Api 호출을 취소한다.
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      const $this = this;
      this.timer = await setTimeout(async () => {
        const result = await ApiUtils.put('/fo/od/mf/bsktmgnt/basket-item-quantity', iBsktPut);
        if (!result.data.success) {
          bskt.bsktQty = result.data.data.preBsktQty;
          this.$gsdialog.alert(result.data.statusMessage, {html: true});
          this.actionEventCntl('2'); // 상품수량 KeyIn Focus Out 이벤트의 경우 처리 함수 호출
        }
        // 장바구니 상품 조회 ( 상품 수량 변경으로 인해 적용쿠폰이 갱신 되는 문제로 장바구니 상품을 다시 조회 함. )
        await this.getBskt('U');
        // 장바구니 합계 금액 및 총합계 금액 재계산 함수 호출
        await this.calcBasketTotalAmt();
        // 상품수량을 KeyIn으로 변경 후 주문결제 클릭 이벤트 발생 시 상품재고수량 체크 후 주문결제 함수를 호출.
        await this.actionEventCntl('5');
      }, 500);
    },
    // 품절 상품 수량 조회
    getSoldItemCnt() {
      let soldItemCnt = 0;
      this.bsktInqRsltDto.supplFirmDtoList.forEach(supplInfo => {
        if (supplInfo.soldoutBsktInqRsltDtoList) {
          supplInfo.soldoutBsktInqRsltDtoList.forEach(soldItem => soldItemCnt++);
        }
      });
      return soldItemCnt;
    },
    async initMounted() {
      this.$nextTick(()=>{
        const $this = this;
        const $stickytab = document.querySelector('.shop_scroll__area');
        if ( $stickytab ) {
          window.addEventListener('scroll', function() {
            $this.stickyTab(window.pageYOffset);
          });
        }
      });
    }
  },
  mounted() {},
  updated() {
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

