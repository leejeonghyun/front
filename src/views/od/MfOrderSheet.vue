<!--
views/pa/SC-FO-PA-MF-MS-001
-->
<template>
  <div class="wrap-order public_domain bottom-sticky marketfor">
    <SubDefaultHeader ref="header" headerText="주문결제" :headertype="3" :tabbar="false" :cartView="true" :searchView="true" />
    <main id="main" tabindex="0">
      <div class="order-wrap wrapper tabcont_marketfor">
        <!-- START : 상품 리스트 -->
        <div class="accordion-order-top">
          <div class="tit-accordion">
            <button type="button" id="orderTopAccordion" class="tit" aria-controls="orderAccordionContent" aria-expanded="false" @click="accordionEvent">
              <div class="tit-type1">
                <span class="img-thumb">
                  <figure>
                    <img :src="getItemImg(ordsItemList.repItemImg)" :alt="ordsItemList.repItemNm" @error="replaceByDefault" v-if="isNotEmpty(ordsItemList.repItemImg)"/>
                    <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="ordsItemList.repItemNm" v-else />
                  </figure>
                </span>
                <!-- 2021.03.08 상품명 긴 경우 '외 n개' 수정 -->
                <span class="product-name" v-if="isNotEmpty(ordsItemList.repItemNm)">
                  {{ordsItemList.repItemNm}}
                </span>
                <strong class="point" v-if="isNotEmpty(ordsItemList.repItemNm) && ordsItemList.otherItemCnt > 0">외 {{ordsItemList.otherItemCnt}}건</strong>
                <!-- // 2021.03.08 상품명 긴 경우 '외 n개' 수정 -->
              </div>
              <div class="tit-type2">
                <h2><span class="bg-line-brush">상품정보</span></h2>
              </div>
            </button>
          </div>
          <MfOrderProducts @popupOrderCouponChange="popupOrderCouponChange" :ordsItemList="ordsItemList" :dawnDeliYn="dawnDeliYn"/>
        </div>

        <!-- START : 배송지정보 -->
        <MfDeliveryInfo ref="mfDeliveryInfo"
          @popupDlvp="popupDlvp"
          @popupDlvpChange="popupDlvpChange"
          @chkSafeNumber="chkSafeNumber"
          @delivReqEvent="delivReqEvent"
          :ordsDelivGrpInfo="ordsDelivGrpInfo"
          :ordsDlvpInfo="ordsDlvpInfo"
          :rlfNoRqtYn="rlfNoRqtYn"
          :ordsItemList="ordsItemList"
          :ordsInfo="ordsInfo"
        />
        <!-- END : 배송지정보 -->

        <!-- START : 더반찬 -->
        <MfDelivThebanchan ref="mfDelivThebanchan" :ordId="ordId" :ordsItemList="ordsItemList" :ordsDlvpInfo="ordsDlvpInfo" @setHopeDeliv="setHopeDeliv"/>
        <!-- END : 더반찬 -->

        <!-- START : 할인정보 -->
        <MfDiscountInfo ref="discount" v-if="ordsInfo !== null"
          @popupEvent="popupAction"
          @orderSheetDcAmtEvent="orderSheetDcAmtEvent"
          @bsktCpnChangeEvent="bsktCpnChangeEvent"
          @popupToastMessage="popupToastMessage"
          @showLoading="showLoading"
          @popupSignUpInfo="popupSignUpInfo"
          :ordsInfo="ordsInfo"
          :totAmt="totPayAmt"
          :totDlfeeAmt="totDelivFee"
          :mbrGrd="mbrGrd"
          :ordsItemList="ordsItemList"
          :payInfo="payInfo"
          :ordsItemTaxList="ordsItemTaxList"
        />
        <!-- END : 할인정보 -->

        <div class="discount-total gray_guide__box in mt0">
          <p class="price-info">
            <strong class="total">총 -<em>{{ totalDcAmt + totPrdDcAmt | currency }}</em>원</strong>
            <span class="total-info-txt">(행사할인 -{{totalDcAmt + totPrdDcAmt - (gsNPointDcAmt + popRwdDcAmt) | currency }}원+리워즈/포인트-{{gsNPointDcAmt + popRwdDcAmt | currency }}원 )</span>
          </p>
        </div>

        <!-- START : 합계금액정보 -->
        <MfOrderTotalPrice ref="totPrice" v-if="ordsItemList !== null"
          :totalDcAmt="totalDcAmt"
          :gsNPointDcAmt="gsNPointDcAmt"
          :popRwdDcAmt="popRwdDcAmt"
          :mbrGrd="mbrGrd"
          :ordsItemList="ordsItemList"
          :crcoChargDcInfoList="crcoChargDcInfoList"
          @totPayAmtEvent="totPayAmtEvent"
        />
        <!-- END : 합계금액정보 -->

        <!-- START : 결재통합 -->
        <PaySheet ref="paySheet"
          :ordId="ordId"
          :totAmt="totPayAmt"
          :payCallType="payCallType"
          :crcoEvntInfo="crcoEvntInfo"
          :tab="{delivery: true, pickup: false}"
          @__validation="__validation"
          @orderProcess="orderProcess"
          @CashReceiptIssueEvent="CashReceiptIssueEvent"
          @setPayInfo="setPayInfo"
          @setCrcoChargDcInfo="setCrcoChargDcInfo"
          @setCrcoInfoInfo="setCrcoInfoInfo"
          @procOrderAgree="procOrderAgree"
          @setCardDisEvent="setCardDisEvent"
          @setOrdsItemTaxList="setOrdsItemTaxList"
          @showLoading="showLoading"
          @amtChg="amtChg"
        />
        <!-- END : 결재통합 -->

        <!-- START : 주문결제버튼영역 -->
        <section class="mypage block" v-show="orderbtnFixed">
          <div class="order_agree_btnbox">
            <div class="btn_total__price" ref="orderBtn" :class="{fixed : orderbtnFixed}">
              <button class="btn-order" @click="orderPaymentProc()">최종 결제금액 <span class="price"><strong>{{ totPayAmt | currency }}</strong>원</span></button>
            </div>
          </div>
        </section>
        <!-- END : 주문결제버튼영역 -->
      </div>
    </main>
    <MfFooter /><!-- 5월 수정 : 푸터 추가 -->
    <Loading v-show="loading > 0" />
    <MfPopupDeliveryList @popupEvent="popupAction" v-if="this.popup.popupDeliveryList" :ordsDlvpInfo="ordsDlvpInfo" :ordsItemList="ordsItemList" @checkMbrDlvpInfo="checkMbrDlvpInfo" /> <!-- 팝업 - 배송지 목록 -->
    <MfPopupSignUpInfo :gbn="popupSignGbn" @popupEvent="popupSignUpInfo" v-if="this.popup.popupSignUpInfo" /> <!-- 팝업 - 통합회원 가입안내 팝업 -->
    <MfPopupOrderCouponChange @popupEvent="popupAction" @productCouponChangeEvent="productCouponChangeEvent" v-if="this.popup.popupOrderCouponList" :ordsItemInfo="ordsItemInfo" :ordsItemList="ordsItemList"/> <!-- 팝업 - 쿠폰변경 -->
    <transition name="toastPopup" v-on:after-enter="toastPopupAfterEnter" v-on:leave="toastPopupEnterLeave">
      <PopupToast :ToastMessage="toastMessage" @popupEvent="popupAction" v-if="popup.popupToastAlarm" :popupToast="popup.popupToastAlarm" popupToastType="popupToastAlarm" />
    </transition>
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 통합 헤더
import MfFooter from '@/components/common/Footer'; // 푸터
import MfOrderProducts from '@/components/order/MfOrderProducts'; // 상품리스트
import MfDeliveryInfo from '@/views/od/MfDeliveryInfo'; // 배송지 정보 영역
import MfDelivThebanchan from '@/components/order/MfDelivThebanchan'; // 배송일정 선택 정보 (더반찬)
import MfDiscountInfo from '@/components/order/MfDiscountInfo'; // 할인정보
import MfPopupSignUpInfo from '@/views/od/MfPopupSignUpInfo'; // 팝업 - 통합회원 가입안내
import MfPopupOrderCouponChange from '@/views/od/MfPopupOrderCouponChange'; // 팝업 - 쿠폰변경
import MfPopupDeliveryList from '@/views/od/MfPopupDlvpList'; // 팝업 - 배송지 목록
import MfOrderTotalPrice from '@/views/od/MfOrderTotalPrice'; // 합계금액정보

import PaySheet from '@/views/od/MfPaySheet.vue';

import Loading from "@/components/common/Loading";

import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import PopupToast from '@/components/common/PopupToast';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import ImgUtils from '@/common/ImgUtils';
import OrderMsg from '@/components/order/MfOrderMsg'; // 주문 메세지항목
import LoginUtils from '@/common/LoginUtils';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import Tracker from '@/common/Tracker'; // 트래커

export default {
  name: "OrderDefault",
  props: {
    ordId: String,
  },
  data() {
    return {
      toastMessage: this.$store.state.dp.loginText,
      loginYn: LoginUtils.isLogin(),
      loading: 0,
      ordsInfo: {
        ordId: this.ordId, // 주문ID
        ordsStandDttm: null, // 주문서기준일시
        multDlvpYn: 'N', // 다중배송지여부
        ofsItemProcSpCd: 'D', // 결품처리구분코드
        ordRecptIssuYn: 'N', // 주문영수증발행여부
        upasVal: 'M', // 개인통관고유부호값
      }, // 주문서정보
      ordsDlvpInfo: {}, // 배송지정보
      ordsDlvpSeqno: 0, // 주문서배송지일련번호
      rlfNoRqtYn: 'N', // 안심번호 신청여부
      ordsDelivGrpInfo: {}, // 배송지, 배송정보
      ordsItemList: {}, // 주문서상품목록
      productItems: [], // 상품 아이템 목록
      ordsItemInfo: {}, // 상품쿠폰대상상품
      delivRequest: { // 배송요청사항 DVLP
        ordId: null,
        ordsDlvpSeqno: null,
        selectedLocation: '01', // 상품 수령 위치 옵션
        selectedOptionValue: '1', // 상품 수령 위치 - 공동현관 선택
        itemDlvrMethoDtlCnts: '', // 배송 요청사항 메시지
        beforeItemDlvrMethoDtlCnts: '', // 배송 요청사항 메시지
        // agreeDeliveryType: true, // 배송요청사항저장여부
        agreeDeliveryType: false, // 배송요청사항저장여부 // Makert For 용 배송요청사항 정보 처리 관련 API 추가 개발건으로 인해 임시 false 처리
      }, // 배송요청사항(상품수령위치)
      mbrGrd: false, // 회원등급
      crcoChargDcInfoList: null,
      delivTypeCd: null, // 배송유형코드 (더반찬 희망배송유형)
      delivDt: null, // 배송일자 (더반찬 희망배송일자)
      dawnDeliYn: false, // 새벽배송가능여부

      // 주문결제 관련 정보 변수
      totalDcAmt: 0, // 총 할인금액
      totPrdDcAmt: 0, // 총 상품할인금액
      crcoEvntInfo: null, // 선택된 카드할인정보
      resPntForm: null, // 선택된 통신사할인정보
      gsNPointDcAmt: 0, // 사용하는 gsNpoint 정보
      popRwdDcAmt: 0,
      totPrdAmt: 0, // 주문금액
      totDelivFee: 0,
      totPayAmt: 0, // 최종 결제금액
      pntUseAmt: 0, // 포인트사용가능상품금액
      ordsItemTaxList: [], // 주문 상품 과면세 리스트 ( 결제 모듈에서 값이 변경되면 해당 변수에 Update 용도)

      cashRcpctInfo: {
        cashRecptIssuYn: 'N', // 현금영수증발행여부
        cashRecptIssuTypeCd: '1', // 현금영수증발행유형코드 소득공제1/지출증빙2
        cashRecptInputNo: '', // 현금영수증입력번호
      }, // 현금영수증 발행여부
      payInfo: null, // 결제정보
      payCallType: [], // 결제방식 세팅시 필요 안넘기면 전체 나옴
      revisionNo: 1,
      timestamp: new Date().getTime(),

      validationChk: true, // 결재전 상위컴포넌트 validation값
      trackItemList: [], // 트래커에 전달하기 위한 상품 정보

      orderAgreeInfo: {},
      orderbtnFixed: true,
      popup: { // 팝업
        open: false,
        popupSignUpInfo: false, // 4월 수정 : 통합회원 가입안내 팝업 추가
        popupOrderCouponList: false, // 쿠폰변경
        popupToastAlarm: false,
        popupDeliveryList: false, // 배송지 목록
      },
      prevRoute: {},
      popupSignGbn: 'gsnpnt',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '주문결제 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '주문/결제^주문/결제',
      },
    ],
  },
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
    SubDefaultHeader, // 통합 헤더
    MfFooter,
    MfOrderProducts,
    MfDeliveryInfo, // 배송지정보
    MfDelivThebanchan, // 배송일정 선택 정보
    MfDiscountInfo, // 할인정보
    MfOrderTotalPrice, // 합계금액정보
    PaySheet, // 결제관련 Componets
    MfPopupSignUpInfo, // 4월 추가 : 통합회원 가입안내 팝업 추가
    MfPopupOrderCouponChange, // 팝업 - 쿠폰변경
    MfPopupDeliveryList, // 팝업 - 배송지 목록
    PopupToast,
    Loading, // loading
  },
  filters: {
    currency: function(val) {
      return NumberUtils.toComma(val);
    },
  },
  methods: {
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    isTelNo(telNo) {
      const regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
      return regExp.test(telNo);
    },
    replaceByDefault(e) {
      e.target.src = imgProductNothumb;
    },
    getItemImg(url) {
      let path = '';
      try {
        url = url.replace("{SIZE}", 300); // 임시로 사이즈 변경함
        path = ImgUtils.path(url);
      } catch (e) {
        alert(e);
        path = '@/assets/images/img/img_product_nothumb.jpg';
      }
      return path;
    },
    toastPopupAfterEnter(el) {
      el.style.opacity = 1;
    },
    toastPopupEnterLeave(el) {
      el.style.opacity = 0;
    },
    moveElement(el) {
      const $el = document.querySelector( '#' + el );
      if ($el != null) {
        $el.scrollIntoView(true);
        window.scrollBy(0, -150); // 상단 탭까지 이동
      }
    },
    // 총합계 스티키
    stickyPrice() {
      const scrollbody = window.pageYOffset + window.innerHeight;
      const orderoffsetTop = document.querySelector(".bottom-btn-area").offsetTop;
      if (orderoffsetTop > scrollbody) {
        this.orderbtnFixed = true;
      } else {
        this.orderbtnFixed = false;
      }
    },
    // 로딩바 노출 여부 처리 함수
    showLoading(loadFlag) {
      if (!!loadFlag) this.loading++; else this.loading--;
    },
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupDlvpChange() {
      this.popupAction('popupDeliveryList');
    },
    popupSignUpInfo(gbn) {
      this.popupSignGbn = gbn;
      this.popupAction('popupSignUpInfo');
    },
    // 상품쿠폰 변경 팝업 호출 함수
    popupOrderCouponChange(ordsItemInfo) {
      this.ordsItemInfo = ordsItemInfo;
      this.popup[`popupOrderCouponList`] = !this.popup[`popupOrderCouponList`];
      this.popup.open = !this.popup.open;
    },
    // 상품쿠폰이 변경된경우 처리 함수
    productCouponChangeEvent: function() {
      this.retrievelistOrdsItem();
    },
    // 배송지 안내 팝업
    popupDlvp() {
      this.popupToastMessage("도서〮산간 일부지역의 배송서비스는 곧 오픈 예정입니다."); // 배송지 안내 메세지
    },
    // toastMessage 노출 함수 호출.
    popupToastMessage(toastMessage) {
      this.toastMessage = toastMessage;
      this.popupAction('popupToastAlarm');
    },
    async checkMbrDlvpInfo(mbrDelivInfo) { // 수취자배송지정보 체크
      this.ordsDlvpInfo = mbrDelivInfo;
      // 더반찬 상품이 존재 시 새벽배송여부 및 희망일자정보 조회
      if (!!this.ordsItemList.ordsDelivSupplGrpInfoList.find(supplInfo => supplInfo.mallId === '302')) {
        this.dawnDeliYn = await this.retrieveDawnDeliYn(this.ordsDlvpInfo.adrsZipcd);
        // 변경된 배송지가 더반찬 새벽배송 불가지역 && 더반찬 상품이 포함된 주문인 경우 Alert Message 노출
        if (!this.dawnDeliYn) {
          this.$gsdialog.alert(OrderMsg.noDawnDeliv, {html: true});
        }
        // 더반찬의 새벽배송/일반배송 희망일자 정보 조회
        this.$refs.mfDelivThebanchan.retrievelistHopeDelivDate();
      }
    },
    // 배송요청사항 변경 이벤트
    delivReqEvent(delivRequest) {
      this.delivRequest = delivRequest;
    },
    // 장바구니/배송비 쿠폰이 변경된 경우
    bsktCpnChangeEvent: function() {
      this.retrievelistOrdsItem();
    },
    // 안심번호 사용여부 체크
    chkSafeNumber(safeFlag) {
      const rq = { ordId: this.ordId, rlfNoRqtYn: this.rlfNoRqtYn = safeFlag, ordsDlvpSeqno: this.ordsDlvpSeqno };
      const rs = ApiUtils.post('/fo/od/mf/ordsmgnt/safeNum-request-proc', rq);
    },
    // 주문 상품 과면세 리스트 정보 Set
    setOrdsItemTaxList(nOrdsItemTaxList) {
      this.ordsItemTaxList = nOrdsItemTaxList;
    },
    // 카드사행사(카드사할인혜택) 이벤트
    setCardDisEvent(cardDiscountProm) {
      this.$refs.discount.setCardDisEvent(cardDiscountProm);
    },
    // 희망배송일자 및 유형 정보 Set
    setHopeDeliv(hopeDelivTypeCd, hopeDelivDt) {
      this.delivTypeCd = hopeDelivTypeCd;
      this.delivDt = hopeDelivDt;
    },
    // 더반찬 새벽배송 가능여부
    async retrieveDawnDeliYn(zipCd) {
      const iDawnDelivInq = { postNo: zipCd };
      const response = await ApiUtils.post('/fo/od/mf/bsktmgnt/getTheBanchanDawnDeliYn', iDawnDelivInq);
      const dawnDeliInfo = response.data.data;
      return !!dawnDeliInfo && dawnDeliInfo.dawndeliYn === 'Y';
    },
    // 주문서정보조회
    async retrieveOrdsInfo() {
      const iOrdsInfoInq = {
        ordId: this.ordId,
      };
      this.showLoading(true);
      const response = await ApiUtils.get('/fo/od/mf/ordsmgnt/ordersheet', iOrdsInfoInq);
      this.showLoading(false);
      const ordsInfo = response.data.data;
      if (ordsInfo !== null && ordsInfo.ordId !== null) {
        this.ordsInfo = ordsInfo;
        // 회원 주문유효성 체크 주문완료 체크
        if (this.ordsInfo.ordValidYn === false || this.ordsInfo.ordCompleteYn === 'Y') {
          this.$gsdialog.alert(OrderMsg.ordValidChk).then(dialog => {
            this.$router.replace({name: 'mfTheBasketMain'});
          });
        }
      }
    },
    // 주문서배송지목록조회
    async retrievelistOrdsDlvp() {
      const iOrdsDlvpListInq = {
        ordId: this.ordId,
      };
      // 주무문서배송지 인터페이스 조회
      this.showLoading(true);
      const response = await ApiUtils.get('/fo/od/ordsmgnt/delivery-place-list', iOrdsDlvpListInq);
      this.showLoading(false);
      const ordsDlvpInfoList = response.data.data.ordsDlvpInfoList;
      if (ordsDlvpInfoList.length > 0) {
        this.ordsDlvpInfo = ordsDlvpInfoList[0];
        // 더반찬 상품이 존재 시 새벽배송여부 및 희망일자정보 조회
        if (!!this.ordsItemList.ordsDelivSupplGrpInfoList.find(supplInfo => supplInfo.mallId === '302')) {
          this.dawnDeliYn = await this.retrieveDawnDeliYn(this.ordsDlvpInfo.adrsZipcd);
          // 더반찬의 새벽배송/일반배송 희망일자 정보 조회
          this.$refs.mfDelivThebanchan.retrievelistHopeDelivDate();
        }
      }
      if (!this.ordsDlvpInfo.adrsNm || StringUtils.isEmpty(this.ordsDlvpInfo.adrsNm)) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('수취인 정보')).then(() => {
          history.back();
        });
        return;
      } else if (!this.ordsDlvpInfo.adrsZipcd || StringUtils.isEmpty(this.ordsDlvpInfo.adrsZipcd)) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('우편번호')).then(() => {
          history.back();
        });
        return;
      } else if ((!this.ordsDlvpInfo.adrsBaseAddr || StringUtils.isEmpty(this.ordsDlvpInfo.adrsBaseAddr))
              && (!this.ordsDlvpInfo.adrsStnmBaseAddr || StringUtils.isEmpty(this.ordsDlvpInfo.adrsStnmBaseAddr))) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('주소지 정보')).then(() => {
          history.back();
        });
        return;
      } else if ((!this.ordsDlvpInfo.adrsTelNo || StringUtils.isEmpty(this.ordsDlvpInfo.adrsTelNo))
              && (!this.ordsDlvpInfo.adrsMoblTelNo || StringUtils.isEmpty(this.ordsDlvpInfo.adrsMoblTelNo))) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('연락처')).then(() => {
          history.back();
        });
        return;
      }

      this.ordsDlvpSeqno = this.ordsDlvpInfo.ordsDlvpSeqno;

      // 배송요청사항 처리용
      this.ordsDelivGrpInfo = { ordId: this.ordId, ordsDlvpSeqno: this.ordsDlvpSeqno };
      this.rlfNoRqtYn = this.ordsDlvpInfo.rlfNoRqtYn || 'N'; // 안심번호 default 'N'으로 Set
      this.chkSafeNumber(this.rlfNoRqtYn);

      if (this.loginYn) {
        // 회원 배송지 정보 조회
        this.retrieveCuMbrDlvp();
      }

      // 배송지 추가에서 돌아오면 배송지 선택 팝업 열기
      if (this.prevRoute.path == '/cu/delivery_place_add') {
        this.$nextTick(() => this.popupDlvpChange());
      }
    },
    // 회원 배송지 정보 조회
    async retrieveCuMbrDlvp() {
      const iMbrDlvpInfoInq = {
        cmmMbrNo: this.ordsDlvpInfo.cmmMbrNo,
        mbrDlvpSeqno: this.ordsDlvpInfo.mbrDlvpSeqno,
      };
      this.showLoading(true);
      const response = await ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace', iMbrDlvpInfoInq);
      this.showLoading(false);
      const cuMbrDlvp = response.data.data[0];
      if (cuMbrDlvp != null) {
        if (!StringUtils.isEmpty(cuMbrDlvp.itemDlvrMethoCd) || !StringUtils.isEmpty(cuMbrDlvp.itemDlvrMethoAddCd) || !StringUtils.isEmpty(cuMbrDlvp.itemDlvrMethoDtlCnts)) {
          // Makert For 용 배송요청사항 정보 처리 관련 API 추가 개발건으로 인해 임시 주석 처리
          // this.delivRequest.agreeDeliveryType = true;
        }
      }
    },
    // 주문서상품목록조회
    async retrievelistOrdsItem() {
      this.trackItemList = [];
      const iOrdsItemListInq = {
        ordId: this.ordId,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
      };
      this.showLoading(true);
      const response = await ApiUtils.get('/fo/od/mf/ordsmgnt/product-list', iOrdsItemListInq);
      this.showLoading(false);
      this.ordsItemList = response.data.data;

      // 상품 리스트 가공 하위여러 컴포넌트에서 사용
      if (this.ordsItemList != null) {
        const productItems = [];
        const trackItem = [];

        this.ordsItemList.ordsDelivSupplGrpInfoList.forEach(supplInfo => {
          supplInfo.ordsDlfeeGrpInfoList.forEach(dlfeeInfo => {
            trackItem.push(dlfeeInfo.ordsItemInfoList);
            dlfeeInfo.ordsItemInfoList.forEach(itemInfo => {
              productItems.push({
                categoryType: "",
                categoryId: itemInfo.itemClasfCtgId,
                uid: itemInfo.itemId,
                name: itemInfo.itemNm,
                count: itemInfo.itemOrdQty,
                liqItemYn: itemInfo.liqItemYn,
              });
            });
          });
        });
        this.trackItemList = trackItem;
        this.productItems = productItems;
        Tracker.orderSheet(this.trackItemList);
      }
    },
    // 주문서할인금액 관련 이벤트 처리 함수
    orderSheetDcAmtEvent: function(gsNPointDcAmt, popRwdDcAmt, resPntForm, crcoEvntInfo, totalDcAmt) { // 총 할인금액
      this.totalDcAmt = totalDcAmt;
      this.crcoEvntInfo = crcoEvntInfo;
      this.resPntForm = resPntForm;
      this.gsNPointDcAmt = gsNPointDcAmt;
      this.popRwdDcAmt = popRwdDcAmt;
      this.totPayAmt = this.totPrdAmt + this.totDelivFee - this.totalDcAmt; // 하위 사은품지급에서 최종금액을 watch  // 2021.01.21 과면세 상품 정보 조회 시 동기화 처리 문제로 삭제함.
      this.$refs.discount.setTotAmt(this.totPayAmt);
      this.$refs.paySheet.setDisAmt(gsNPointDcAmt, popRwdDcAmt, resPntForm, crcoEvntInfo, totalDcAmt);
    },
    // 회원등급 조회 함수
    async getMemInfo() {
      this.showLoading(true);
      const resultMemInfo = await ApiUtils.get('/fo/cu/mbrmgnt/member-information', null); // 회원정보 가져오기
      this.mbrGrd = resultMemInfo.data.data.mbrTypeCd === '01' ? true : false;
      this.showLoading(false);
    },
    // 카드사청구할인정보 처리 함수
    setCrcoChargDcInfo(crcoChargDcInfoList) {
      this.crcoChargDcInfoList = crcoChargDcInfoList;
    },
    setCrcoInfoInfo(crcoInfoInfo) {
      this.$refs.totPrice.crcoChargDc(crcoInfoInfo);
    },
    // 결제금액 이벤트 함수
    totPayAmtEvent(totPayAmt, totPrdAmt, totDelivFee, totPrdDcAmt) {
      this.totDelivFee = totDelivFee;
      this.totPrdAmt = totPrdAmt;
      this.totPayAmt = totPayAmt;
      this.totPrdDcAmt = totPrdDcAmt;
    },
    // 금액변경 시 처리 함수
    async amtChg() {
      const param = {};
      param.ordId = this.ordId;
      param.amt = this.totPayAmt;
      param.gsPntAmt = this.gsNPointDcAmt;
      param.rwdsAmt = this.popRwdDcAmt;
      param.pntAmt = this.resPntForm !== null ? this.resPntForm.discountAmt : 0;
      param.cardAmt = this.crcoEvntInfo && this.crcoEvntInfo.cardDcAmt || 0;
      param.cmmMbrNo = this.ordsInfo.cmmMbrNo; // 해당주문 유효성때문에 필수
      param.revisionNo = this.revisionNo++;
      param.timestamp = this.timestamp;
      const response = await ApiUtils.post('/fo/od/mf/ordsmgnt/ords-all-amt-chg', param).then(() => {
        // 적립포인트 정보 조회
        this.$refs.totPrice.retrievePntSavgRtInfo();
      });
    },
    // 현금영수증발행 이벤트
    CashReceiptIssueEvent: function(cashRcpctInfo) {
      this.cashRcpctInfo = cashRcpctInfo;
    },
    // 결제정보 처리 함수
    setPayInfo(payInfo) {
      this.payInfo = payInfo;
    },
    // 주문동의 처리 함수
    procOrderAgree() {
      this.orderAgreeInfo = {};
      const cmmSteAgrmCdList = [];
      cmmSteAgrmCdList.push('OP'); // 주문상품 및 결제대행 이용약관 동의
      cmmSteAgrmCdList.push('TP'); // 개인정보 제3자 제공동의
      cmmSteAgrmCdList.push('PP'); // 개인정보 수집 및 이용 동의
      if (!!this.productItems.find(itemInfo => itemInfo.liqItemYn === 'Y')) {
        cmmSteAgrmCdList.push('AB'); // 주류 구매에 따른 개인정보 제공 동의
      }
      if (this.ordsDlvpInfo.abrdDelivYn === 'Y') {
        cmmSteAgrmCdList.push('PC'); // 개인통관고유부호 수집에 동의
      }
      this.orderAgreeInfo.ordId = this.ordId;
      this.orderAgreeInfo.cmmSteAgrmCdList = cmmSteAgrmCdList;
      this.orderAgreeInfo.agrmAgrYn = 'Y';
    },
    // 주문 결제 시 Validation 체크 함수
    async __validation(payType) {
      // 배송요청사항체크
      if (!!this.delivRequest && this.delivRequest.selectedOptionValue === '1' && this.isEmpty(this.delivRequest.itemDlvrMethoDtlCnts)) { // 공동현관비밀번호체크
        this.validationChk = false;
        this.moveElement('itemDlvrMethoDtlCnts');
        return this.$gsdialog.alert(OrderMsg.recptGetMethoP);
      } else {
        this.validationChk = true;
      }
      // 희망배송일 체크
      if (!!this.ordsItemList.ordsDelivSupplGrpInfoList.find(supplInfo => supplInfo.mallId === '302') && (this.isEmpty(this.delivTypeCd) || this.isEmpty(this.delivDt))) {
        this.validationChk = false;
        this.moveElement('deliverybox01');
        return this.$gsdialog.alert(OrderMsg.hopeDelivDtEmpty);
      } else {
        this.validationChk = true;
      }
      // 현금영수증체크
      const paycoType = this.$refs.paySheet.$refs.payNormal.paycoType;
      const kakaoType = this.$refs.paySheet.$refs.payNormal.kakaoType;
      // 계좌이체(01)/모바일팝(13)/페이코(04)/카카오페이(05) && 현금영수증 == 'Y' 인 경우 체크 활성화
      if (((!!this.payInfo && this.payInfo.payType === '01') ||
           (!!this.payInfo && this.payInfo.payType === '13') ||
           (!!this.payInfo && this.payInfo.payType === '04' && paycoType === 'MONEY') ||
           (!!this.payInfo && this.payInfo.payType === '05' && kakaoType === 'MONEY') ) &&
          this.totPayAmt !== 0 &&
          !!this.cashRcpctInfo && this.cashRcpctInfo.cashRecptIssuYn === 'Y') {
        const cashRecptInputNo = this.cashRcpctInfo.cashRecptInputNo;
        let cnt = this.cashRcpctInfo.cashRecptIssuTypeCd === '1' ? 11 : 10;
        if (cnt == 11 && cashRecptInputNo.substring(0, 3) != '010') {
          cnt = 10;
        }
        if (cashRecptInputNo.length < cnt) {
          this.validationChk = false;
          this.moveElement('paymentNormalAccordionContent');
          return this.$gsdialog.alert(OrderMsg.cashRecptChk(this.cashRcpctInfo.cashRecptIssuTypeCd));
        } else {
          this.validationChk = true;
        }
      }
    },
    // 결제모듈의 결제처리 함수 호출
    orderPaymentProc() {
      this.$refs.paySheet.orderPaymentProc();
    },
    // 주문결제 처리 함수
    async orderProcess(rqForm, rsForm) {
      const payType = rqForm.payType;
      const iOrderRequestInputDto = {};
      // 할인정보
      if (this.gsNPointDcAmt > 0) { // GS&POINT
        iOrderRequestInputDto.orderDcGsPntDto = {
          gsNPointDcAmt: this.gsNPointDcAmt,
        };
      }
      if (this.popRwdDcAmt > 0) { // 리워즈팝
        iOrderRequestInputDto.orderDcRwdsDto = {
          popRwdDcAmt: this.popRwdDcAmt,
        };
      }
      if (this.resPntForm != null) { // 통신사 할인정보 LG&KT
        this.resPntForm.amt = this.totPrdAmt; // 할인전 주문총액
        iOrderRequestInputDto.orderDcPntDto = this.resPntForm;
      }
      if (this.crcoEvntInfo != null) { // 카드즉시할인
        iOrderRequestInputDto.ordsPromCardDto = this.crcoEvntInfo;
      }

      iOrderRequestInputDto.ordId = rqForm.orderNo; // 주문번호
      iOrderRequestInputDto.ordTypeCd = '10'; // Market For 주문유형코드는 '10'으로 고정
      iOrderRequestInputDto.ordDt = DateUtils.format(DateUtils.getToday(), 'YYYYMMDD'); // 주문일자
      iOrderRequestInputDto.goodsName = rqForm.goods_name; // 상품명
      iOrderRequestInputDto.goodsCnt = rqForm.goods_cnt; // 상품수
      iOrderRequestInputDto.amt = rqForm.goods_price; // 금액
      iOrderRequestInputDto.taxFreeAmt = rqForm.totalTaxfreeAmt; // 면세대상금액
      iOrderRequestInputDto.taxableAmt = rqForm.totalTaxableAmt; // 과세대상금액
      iOrderRequestInputDto.taxfreeRate = rqForm.totTaxfreeRate; // 면세율 0원결제시사용
      iOrderRequestInputDto.taxableRate = rqForm.totTaxableRate; // 과세율 0원결제시사용
      iOrderRequestInputDto.tax = rqForm.totalVatAmt; // 부가세
      iOrderRequestInputDto.totItemAmt = rqForm.totItemAmt; // 총상품금액
      iOrderRequestInputDto.totItemTaxAmt = rqForm.totItemTaxAmt; // 총상품과세금액
      iOrderRequestInputDto.totItemFTaxAmt = rqForm.totItemFTaxAmt; // 총상품면세금액
      iOrderRequestInputDto.totItemVatAmt = rqForm.totItemVatAmt; // 총상품부가세금액
      iOrderRequestInputDto.buyerName = rqForm.buyer_name; // 구매자명
      iOrderRequestInputDto.buyerTel = rqForm.buyer_tel; // 구매자연락처
      iOrderRequestInputDto.mallUserID = rqForm.memNo; // 구매자회원번호
      iOrderRequestInputDto.deviceType = rqForm.deviceType; // 디바이스
      iOrderRequestInputDto.fstOrdYn = this.ordsInfo.fstOrdYn; // 첫주문여부, 트래커용
      iOrderRequestInputDto.totalDcAmt = this.totalDcAmt; // 총할인금액, 트래커용
      iOrderRequestInputDto.totDelivFee = this.totDelivFee; // 총배송비, 트래커용
      iOrderRequestInputDto.ordAgree = (rqForm.agreeChk !== undefined && rqForm.agreeChk === true) ? 'Y' : 'N'; // 주문상품약관,결제개인정보동의
      iOrderRequestInputDto.ordLiqAgree = (rqForm.liqAgreeChk !== undefined && rqForm.liqAgreeChk === true) ? 'Y' : 'N'; // 주류구매약관
      // 더반찬 희망배송일 정보 Set
      iOrderRequestInputDto.delivTypeCd = this.delivTypeCd; // 희망배송유형코드
      iOrderRequestInputDto.delivDt = this.delivDt; // 희망배송일자

      if (this.totPayAmt > 0) {
        if (payType == "02") { // 신용카드
          iOrderRequestInputDto.mid = rsForm.mid; // mid
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.affName = rqForm.aff_name; // 상점명
          iOrderRequestInputDto.payCompany = rqForm.payCompanyCd; // 결제사코드
          iOrderRequestInputDto.payCompanyNm = rqForm.payCompany; // 결제사명
          iOrderRequestInputDto.authType = rqForm.mobilCertReqTypeCd; // 신용카드결제타입
          iOrderRequestInputDto.cardAuthType = rsForm.authType; // 카드인증유형코드
          iOrderRequestInputDto.formBankCd = rqForm.pytcApprCardCd; // 승인카드사코드
          iOrderRequestInputDto.cardCode = rqForm.cardCode;
          iOrderRequestInputDto.orderCardname = rqForm.orderCardname; // 카드사명
          iOrderRequestInputDto.cardInterest = rqForm.noint_inf; // 무이자할부정보
          iOrderRequestInputDto.cardQuota = rqForm.quota_inf; // 할부개월수
        } else if (payType == "01") { // 계좌이체
          iOrderRequestInputDto.mid = rsForm.mid; // mid
          iOrderRequestInputDto.tid = rsForm.userKey; // tid
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.authType = rqForm.authType; // 결제타입
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.affName = rqForm.aff_name; // 상점명
          iOrderRequestInputDto.payCompany = rqForm.payCompanyCd; // 결제사코드
          iOrderRequestInputDto.payCompanyNm = rqForm.payCompany; // 결제사명
          iOrderRequestInputDto.buyerEmail = rqForm.email; // 구매자이메일
          iOrderRequestInputDto.orderCashRcpctDto = this.cashRcpctInfo; // 현금영수증
          iOrderRequestInputDto.cachRcptSupplFirmCd = '9999'; // TODO 공급사업장코드
        } else if (payType == "10" ) { // 휴대폰소액결제
          iOrderRequestInputDto.mid = rsForm.mid; // mid
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.authType = rqForm.authType; // 결제타입
          iOrderRequestInputDto.mobileId = rsForm.mobileId;
          iOrderRequestInputDto.svcId = rsForm.svcId;
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.affName = rqForm.aff_name; // 상점명
          iOrderRequestInputDto.payCompany = rqForm.payCompanyCd; // 결제사코드
          iOrderRequestInputDto.payCompanyNm = rqForm.payCompany; // 결제사명
          iOrderRequestInputDto.buyerEmail = rqForm.email; // 구매자이메일
          iOrderRequestInputDto.buyerEmail = 'gsfreash@gsfreash.com'; // 구매자이메일
        } else if (payType == "13" ) { // 모바일팝
          iOrderRequestInputDto.payCompany = rqForm.payCompanyCd; // 결제사코드
          iOrderRequestInputDto.payCompanyNm = rqForm.payCompany; // 결제사명
          iOrderRequestInputDto.authType = rqForm.authType; // 결제타입
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.mid = rsForm.mid; // mid
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.buyerEmail = 'gsfreash@gsfreash.com'; // 구매자이메일
          iOrderRequestInputDto.orderCashRcpctDto = this.cashRcpctInfo; // 현금영수증
          iOrderRequestInputDto.cachRcptSupplFirmCd = '9999'; // TODO 공급사업장코드
        } else if (payType == "04" || payType == "05" || payType == "06") { // 페이코 카카오페이 네이버페이
          iOrderRequestInputDto.easyPayType = rqForm.easyPayInfoType; // 간편결제방식 간편결제 승인불가시 필요함
          iOrderRequestInputDto.payCompany = rqForm.payCompanyCd; // 결제사코드
          iOrderRequestInputDto.payCompanyNm = rqForm.payCompany; // 결제사명
          iOrderRequestInputDto.authType = rqForm.authType; // 결제타입
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.mid = rsForm.mid; // mid
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.buyerEmail = 'gsfreash@gsfreash.com'; // 구매자이메일
          if (this.cashRcpctInfo.cashRecptIssuYn === "Y") {
            iOrderRequestInputDto.orderCashRcpctDto = this.cashRcpctInfo; // 현금영수증
          }
        }
      }
      // 동의정보
      if (this.orderAgreeInfo !== undefined && this.orderAgreeInfo != null) {
        iOrderRequestInputDto.orderAgreeInfo = this.orderAgreeInfo;
      }
      // 주문 등록
      this.showLoading(true); // 로딩 on
      const response = await ApiUtils.put('/fo/od/mf/ordmgnt/order-pay-proc', iOrderRequestInputDto);
      if (response.data.statusCode === "0000") {
        Tracker.orderComplete(this.trackItemList, iOrderRequestInputDto, this.ordId, this.$gtag);
        // 배송요청사항 다은주문에도 사용 할 수 있도록 데이터 저장 처리 함수
        // Makert For 용 배송요청사항 정보 처리 관련 API 추가 개발건으로 인해 임시 주석 처리
        // await this.agreeDeliveryChange();
        this.showLoading(false); // 로딩 off
        this.$router.replace({name: 'mfOrderComplete', params: {ordId: this.ordId}});
      } else {
        this.showLoading(false); // 로딩 off
        // 주문이 실패한 경우 실패 페이지로 이동
        this.$router.replace({name: 'mfOrderFailed', params: {errorCode: response.data.statusCode, errorMsg: response.data.statusMessage}});
      }
    },
    // 다음주문에서 현배송요청 정보를 사용하도록 저장 처리 함수
    async agreeDeliveryChange() {
      // 배송요청사항 저장
      if (this.loginYn && !!this.delivRequest && this.delivRequest.agreeDeliveryType === true) {
        const iput = {
          cmmMbrNo: this.ordsDlvpInfo.cmmMbrNo,
          mbrDlvpSeqno: this.ordsDlvpInfo.mbrDlvpSeqno,
          itemDlvrMethoCd: this.delivRequest.selectedLocation ? this.delivRequest.selectedLocation : '',
          itemDlvrMethoAddCd: this.delivRequest.selectedOptionValue ? this.delivRequest.selectedOptionValue : '',
          itemDlvrMethoDtlCnts: this.delivRequest.itemDlvrMethoDtlCnts ? this.delivRequest.itemDlvrMethoDtlCnts : '',
        };
        const result = await ApiUtils.put('/fo/cu/mypgmgnt/deliveryplace-customer-request', iput);
      }
    },
  },
  async mounted() {
    if (this.loginYn === true) {
      this.showLoading(true);
      this.getMemInfo(); // 회원등급조회
      await this.retrieveOrdsInfo(); // 주문서정보조회
      await this.retrievelistOrdsItem(); // 주문상품 조회
      await this.retrievelistOrdsDlvp(); // 주문서배송지목록조회
      await this.amtChg(); // 금액변경 시 처리 함수 호출
      this.showLoading(false);
      window.addEventListener('scroll', this.stickyPrice);
    } else {
      this.$gsdialog.alert(OrderMsg.loginFail).then(dialog => this.$router.replace({name: 'mfTheBasketMain'}));
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.stickyPrice);
  },
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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
  },
};
</script>
<style lang="scss">
</style>
