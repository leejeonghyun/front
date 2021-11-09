<!--
components/order/DiscountInfoMF
-->
<template>
  <section class="mypage block">
    <div class="total-payment order-payment mt0">
      <div class="sub-title border">
        <h3><span class="bg-line-brush">할인정보</span></h3>
      </div>
      <div class="sale_info__box">
        <ul v-if="crmNoticeTextFlag" class="payment-notice">
          <li>
            <span class="price red" v-for="crmNoticeInfo in payNoticeList" v-bind:key="crmNoticeInfo.notiSeqno" v-html="crmNoticeInfo.notiCnts"></span>
          </li>
        </ul>
        <dl class="discount-list">
          <dt>
            <h4>배송비/장바구니 쿠폰 (<strong class="point">{{getHoldCpnCount() | currency}}</strong>)</h4>
          </dt>
          <dd v-if="getHoldCpnCount() === 0">
            <span class="point coupon">사용할 수 있는 쿠폰이 없습니다.</span>
          </dd>
          <dd v-else>
            <div class="discount-point">
              <span class="txt-use">
                <input type="text" :value="(discountInfo.dlfeeCpnDcAmt + discountInfo.bsktCpnDcAmt) | currency" class="inp-txt" :readonly="true">
                <span class="txt-p">원</span>
              </span>
              <button type="button" class="btn-use" aria-label="배송비/장바구니 쿠폰 팝업 활성화" aria-haspopup="dialog" @click="popupCouponActive">사용</button>
            </div>
          </dd>
        </dl>
        <h4>포인트 사용</h4>
        <dl class="discount-list">
          <dt v-if="mbrGrd">
            GS&amp;POINT ( <span class="point">{{discountInfo.gsNPointRestPt | currency}}P</span> )
          </dt>
          <dt  v-else>
            GS&amp;POINT
            <button type="button" class="btn icon-question" aria-label="통합회원 가입안내 팝업 활성화" aria-haspopup="dialog" @click="popupSignUpInfo('gsnpnt')">
              <span class="hidden">통합회원 가입안내 팝업</span>
            </button>
          </dt>
          <dd>
            <div class="discount-point" v-if="mbrGrd">
              <span class="txt-use">
                <input type="text" id="gsNPointDcAmtView" name="gsNPointDcAmtView" class="inp-txt" :value="discountInfo.gsNPointDcAmt | currency" :disabled="crmNoticeTextFlag" @focus="focusEdit('gsNPointDcAmt')" v-show="!discountInfo.gsNPointEdit" title="GS&amp;POINT 사용할 포인트">
                <input type="number" id="gsNPointDcAmt" name="gsNPointDcAmt" class="inp-txt" min="0" :disabled="crmNoticeTextFlag" v-model.number="discountInfo.gsNPointDcAmt" @keyup="keyupCheckGsNPoint" @blur="blurEdit('gsNPointDcAmt')" v-show="discountInfo.gsNPointEdit" title="GS&amp;POINT 사용할 포인트">
                <span class="txt-p">P</span>
              </span>
              <button type="button" class="btn-use" @click="!crmNoticeTextFlag ? gsNPntUseAll() : 'javascript:;'" v-if="isEmpty(discountInfo.gsNPointDcAmt) || discountInfo.gsNPointDcAmt === 0">전액사용</button>
              <button type="button" class="btn-use" @click="!crmNoticeTextFlag ? cnclGsNPoint() : 'javascript:;'" v-else >취소</button>
            </div>
            <div class="discount-point" v-else>
              <button type="button" class="btn-use join" aria-label="통합회원 가입안내 팝업 활성화" aria-haspopup="dialog" @click="goAssociate('gsnpnt')">통합회원 가입</button>
            </div>
          </dd>
        </dl>
        <dl class="discount-list">
          <dt v-if="mbrGrd">
            THE POP 리워즈 ( <span class="point">{{discountInfo.restReward | currency}}점</span> )
          </dt>
          <dt v-else>
            THE POP 리워즈
            <button type="button" class="btn icon-question" aria-label="통합회원 가입안내 팝업 활성화" aria-haspopup="dialog" @click="popupSignUpInfo('poprwds')">
              <span class="hidden">통합회원 가입안내 팝업</span>
            </button>
          </dt>
          <dd>
            <div class="discount-point" v-if="mbrGrd">
              <span class="txt-use">
                <input type="text" id="popRwdDcAmtView" name="popRwdDcAmtView" class="inp-txt" :value="discountInfo.popRwdDcAmt | currency" :disabled="crmNoticeTextFlag" @focus="focusEdit('popRwdDcAmt')" v-show="!discountInfo.popRwdEdit" title="THE POP 리워즈 사용할 포인트">
                <input type="number" id="popRwdDcAmt" name="popRwdDcAmt" class="inp-txt" min="0" :disabled="crmNoticeTextFlag" v-model.number="discountInfo.popRwdDcAmt" @keyup="keyupCheckThePopRewards" @blur="blurEdit('popRwdDcAmt')" v-show="discountInfo.popRwdEdit" title="THE POP 리워즈 사용할 포인트">
                <span class="txt-p">점</span>
              </span>
              <button type="button" class="btn-use" @click="!crmNoticeTextFlag ? popRwdsUseAll() : 'javascript:;'" v-if="isEmpty(discountInfo.popRwdDcAmt) || discountInfo.popRwdDcAmt === 0">전액사용</button>
              <button type="button" class="btn-use" @click="!crmNoticeTextFlag ? cnclThePopRewards() : 'javascript:;'" v-else >취소</button>
            </div>
            <div class="discount-point" v-else>
              <button type="button" class="btn-use join" aria-label="통합회원 가입안내 팝업 활성화" aria-haspopup="dialog" @click="goAssociate('poprwds')">통합회원 가입</button>
            </div>
          </dd>
        </dl>
        <dl class="discount-list" v-if="usePntDisCountYn">
          <dt>
            통신사 할인 ( KT / LG U+ )
            <button type="button" class="btn-infomation" aria-label="통신사 할인 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupTelecom()" />
          </dt>
          <dd>
            <div class="discount-point">
              <span class="txt-use">
                <input type="text" :value="resPntForm.discountAmt | currency" class="inp-txt" title="통신사 할인액" :readonly="true">
                <span class="txt-p">원</span>
              </span>
              <button type="button" class="btn-use" aria-label="통신사할인 팝업 활성화" aria-haspopup="dialog" @click="popupTelecomInput()" v-if="this.resPntForm.discountAmt === 0">사용</button>
              <button type="button" class="btn-use" aria-label="통신사할인 팝업 활성화" aria-haspopup="dialog" @click="cnclTelcoDc()" v-else>취소</button>
            </div>
          </dd>
        </dl>
        <dl class="discount-list">
          <dt>카드 즉시 할인</dt>
          <dd v-if="!isEmpty(discountInfo.totCardDcAmt) && discountInfo.totCardDcAmt > 0">-{{discountInfo.totCardDcAmt | currency}}원</dd>
          <dd v-else>0원</dd>
        </dl>
        <p class="wrap-select w100 credit-card">
          <button type="button" class="btn-arrow" aria-label="신용카드 팝업 활성화" aria-haspopup="dialog" @click="popupCardList" v-if="!!cardDiscountProm">
            <span class="icon-card" v-if="cardDiscountProm.crcoCd != '99'">
              <img v-bind:src="getImgNm(cardDiscountProm.cardCode)" alt="카드사 로고"/>
            </span>
            {{cardDiscountProm.tdrMeansCd === '02' ? cardDiscountProm.cardNm : cardDiscountProm.tdrMeansNm }}
          </button>
          <button type="button" class="btn-arrow" aria-label="신용카드 팝업 활성화" aria-haspopup="dialog" @click="popupCardList" v-else>
            카드를 선택해 주세요.
          </button>
        </p>
      </div>
    </div>
    <!-- 팝업 - 배송비, 장바구니 쿠폰 -->
    <MfPopupDeliveryCoupon v-if="usePosbBsktCpnList !== null && this.popup.popupDeliveryCoupon"
      :usePosbBsktCpnList="usePosbBsktCpnList"
      :discountInfo="discountInfo"
      :totDlfeeAmt="totDlfeeAmt"
      @popupEvent="popupAction"
      @bsktCpnChangeEvent="bsktCpnChangeEvent"
    />
    <MfPopupTelecom :reqPntForm="reqPntForm" :lgUsePntInfo="lgUsePntInfo" :ktUsePntInfo="ktUsePntInfo" @popupEvent="popupAction" v-if="this.popup.popupTelecom" />
    <MfPopupTelecomInput v-if="this.popup.popupTelecomInput"
      :discountInfo="discountInfo"
      :lgUsePntInfo="lgUsePntInfo"
      :ktUsePntInfo="ktUsePntInfo"
      :reqPntForm="reqPntForm"
      @selectMobileType="selectMobileType"
      @setResPntFormTelcoInfo="setResPntFormTelcoInfo"
      @popupEvent="popupTelecomInputActive"
      @popupToastMessage="popupToastMessage"
      @showLoading="showLoading"
    />
    <MfPopupCardOption v-if="this.popup.popupCardOption"
      :rtnCardDiscountProm="cardDiscountProm"
      :payInfo="payInfo"
      :ordId="ordsInfo.ordId"
      :ordsItemInfoList="ordsItemInfoList"
      :discountInfo="discountInfo"
      @popupEvent="popupAction"
      @setCardDisEvent="setCardDisEvent"
    />
  </section>
</template>

<script>
import MfPopupDeliveryCoupon from '@/views/od/MfPopupDeliveryCoupon'; // 팝업 - 배송지 쿠폰
import MfPopupTelecom from '@/views/od/MfPopupTelecom'; // 팝업 - 통신사할인안내
import MfPopupTelecomInput from '@/views/od/MfPopupTelecomInput'; // 팝업 - 카드즉시할인
import MfPopupCardOption from '@/views/od/MfPopupCardOption'; // 팝업 - 카드즉시할인

import OdUtils from '@/common/od/OdUtils'; // 주문공통
import CommAuthOd from '@/views/pa/common/CommAuthOd';
import OrderMsg from '@/components/order/MfOrderMsg'; // 주문 메세지항목

import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: "MfDiscountInfo",
  props: {
    ordsInfo: Object,
    mbrGrd: Boolean,
    totAmt: Number,
    totDlfeeAmt: Number,
    payInfo: Object, // 결제정보
    ordsItemList: Object,
    ordsItemTaxList: Array, // 주문 상품 과면세 리스트
  },
  data() {
    return {
      popup: { // 팝업
        open: false,
        popupDeliveryCoupon: false, // 배송지 쿠폰
        popupTelecom: false,
        popupTelecomInput: false,
        popupCardOption: false, // 카드 즉시할인
      },
      crcoEvntInfo: null, // output 카드할인정보
      crmNoticeTextFlag: false, // CRM공지사항플래그
      payNoticeList: [],
      usePosbBsktCpnList: {}, // 사용가능한 쿠폰 및 적용 쿠폰 목록 정보
      cardDiscountProm: null, // 카드즉시할인정보
      ordsItemInfoList: [],
      discountInfo: {
        restReward: 0, // 사용가능한 The POP 리워즈
        popRwdDcAmt: 0, // POP 리워즈 할인
        popRwdEdit: false, // POP 리워즈 수정여부
        gsNPointRestPt: 0, // 사용가능한 GS&POINT(총잔여포인트)
        gsNPointDcAmt: 0, // GS&POINT 할인
        gsNPointEdit: false, // GS&POINT 수정여부
        curTotAmt: this.totAmt || 0,
        totalDcAmt: 0, // 총 할인금액
        totTaxfreeAmt: 0, // 총 면세금액
        totTaxableAmt: 0, // 총 과세금액
        totVatAmt: 0, // 총 부과세
        dlfeeCpnDcAmt: 0, // 배송비쿠폰할인금액
        bsktCpnDcAmt: 0, // 장바구니쿠폰할인금액
        totCardDcAmt: 0, // 카드할인금액
      },
      usePntDisCountYn: false, // 통신사할인 프로모션 여부
      usePntDisCountList: [], // 통신사할인 프로모션
      lgUsePntInfo: {
        promId: null, // 프로모션ID
        promTypeCd: null, // 프로모션유형코드
        promDtlTypeCd: null, // 프로모션상세유형코드
        standAmt: 0, // 기준금액
        pntDcAmt: 0, // 포인트 할인 금액
        pntUseAmt: 0, // 포인트 사용 누적 금액
        telcoCardNo: null,
        certNo: null,
      }, // LG 사용 가능한 통신사할인 정보
      ktUsePntInfo: {
        promId: null, // 프로모션ID
        promTypeCd: null, // 프로모션유형코드
        promDtlTypeCd: null, // 프로모션상세유형코드
        standAmt: 0, // 기준금액
        pntDcAmt: 0, // 포인트 할인 금액
        pntUseAmt: 0, // 포인트 사용 누적 금액
        telcoCardNo: null,
        certNo: null,
      }, // KT 사용 가능한 통신사할인 정보
      reqPntForm: {
        deviceType: "MOB",
        custNo: "",
        telcoType: "KT",
        gid: "",
        mid: "",
        ktGid: "",
        ktMid: "",
        goodsName: "",
        ktNormalDcCode: "",
        ktDoubleDcCode: "",
        lgupGid: "",
        lgupMid: "",
        birthDay: "",
        cardNo1: "",
        cardNo2: "",
        cardNo3: "",
        cardNo4: "",
        reqUrl: "",
        pcReqUrl: "",
        mobReqUrl: "",
        amt: 0,
        discountAmt: 0,
        payMethod: "TELMBRINFO",
        promId: "",
        promDtlTypeCd: "",
        standAmt: 0,
        pntDcAmt: 0,
        pntUseAmt: 0,
      },
      resPntForm: {
        deviceType: "MOB",
        telcoType: "KT",
        resultCode: "",
        resultMsg: "",
        ordId: "",
        tid: "",
        authDate: "",
        authCode: "",
        transMessageNo: "",
        messageCode: "",
        transDate: "",
        cardNo: "",
        discountAmt: 0,
        remainLimit: "",
        remainLimitOverflow: "",
        userGrade: "",
        remainCountOfDay: "",
        remainCountOfMonth: "",
        remainCountOfAnnual: "",
        remainCountVipOfDay: "",
        remainCountVipOfMonth: "",
        remainCountVipOfAnnual: "",
        payMethod: "TELMBRPAY",
        gid: "",
        mid: "",
        payCompanyCd: "",
        promId: "",
        promTypeCd: "",
        promDtlTypeCd: "",
      },
    };
  },
  mixins: [LayerPopupMixin, OdUtils, CommAuthOd],
  components: {
    MfPopupDeliveryCoupon,
    MfPopupTelecom,
    MfPopupTelecomInput,
    MfPopupCardOption, // 팝업 - 카드즉시할인
  },
  filters: {
    currency: function(val) {
      return NumberUtils.toComma(val);
    },
  },
  watch: {
    totAmt: function() {
      this.discountInfo.curTotAmt = this.totAmt || 0;
    },
    ordsItemList: function() {
      this.retrievelistUsePosbBsktCpn(); // 사용가능한 쿠폰목록 조회
      this.usePntDisCount();
      this.setCardDisEvent(this.cardDiscountProm); // 카드할인 있을시 재계산
    },
    ordsItemTaxList: function() {
      this.paymentPrdTaxCalc();
    },
    ordsInfo: function() {
      this.setDisCount();
    },
    mbrGrd: function() {
      this.setDisCount();
    },
  },
  methods: {
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    // 팝업
    popupCouponActive() {
      this.popupAction('popupDeliveryCoupon');
    },
    popupTelecom() {
      this.popupAction('popupTelecom');
    },
    popupTelecomInputActive() {
      this.popupAction('popupTelecomInput');
      this.showLoading(false);
    },
    showLoading(flag) {
      this.$emit('showLoading', flag);
    },
    popupTelecomInput() {
      // 통신사 카드할인 기본 파라메터 조회
      this.telcoDcInit();
      this.popupAction('popupTelecomInput');
    },
    popupCardList() {
      this.popupAction('popupCardOption');
    },
    // 통합회원 가입 안내 팝업
    popupSignUpInfo(gbn) {
      this.$emit('popupEvent', 'popupSignUpInfo', gbn);
    },
    // toastMessage 노출 함수 호출.
    popupToastMessage(strMsg) {
      this.$emit('popupToastMessage', strMsg);
    },
    // 통합회원 가입
    goAssociate(gbn) {
      if (gbn === 'gsnpnt') {
        this.$router.push('/cu/associate_member_point');
      } else {
        this.$router.push('/cu/associate_member_rewards');
      }
    },
    // Focus 처리 함수
    focusEdit(type) {
      if (type === 'gsNPointDcAmt') {
        this.discountInfo.gsNPointDcAmt = '';
        this.discountInfo.gsNPointEdit = true;
      } else if (type === 'popRwdDcAmt') {
        this.discountInfo.popRwdDcAmt = '';
        this.discountInfo.popRwdEdit = true;
      }
      this.$nextTick(() => {
        document.getElementById(type).focus();
      });
    },
    // blur 처리 함수
    blurEdit(type) {
      if (this.isEmpty(this.discountInfo[type])) {
        this.$set(this.discountInfo, type, 0);
        if (type === 'gsNPointDcAmt') {
          this.checkGsNPoint(0);
        } else if (type === 'popRwdDcAmt') {
          this.checkThePopRewards(0);
        }
      }
      if (type === 'gsNPointDcAmt') {
        this.discountInfo.gsNPointEdit = false;

        // GS&POINT는 10P 단위로 사용 가능
        let dcPoint = event.target.value;
        dcPoint = Math.floor(dcPoint/10) * 10;
        this.discountInfo.gsNPointDcAmt = dcPoint;
      } else if (type === 'popRwdDcAmt') {
        this.discountInfo.popRwdEdit = false;

        // POP Rewards는 10P 단위로 사용 가능
        let dcRewards = event.target.value;
        dcRewards = Math.floor(dcRewards/10) * 10;
        this.discountInfo.popRwdDcAmt = dcRewards;
      }
      this.computeDcSum();
    },
    // 상품과면세계산
    async paymentPrdTaxCalc() {
      const disTotAmt = this.discountInfo.curTotAmt;
      if (this.ordsItemTaxList.length > 0) {
        this.discountInfo.totTaxfreeAmt = 0;
        this.discountInfo.totTaxableAmt = 0;
        this.discountInfo.totVatAmt = 0;
        let totTaxfreeRate = 0;
        this.ordsItemTaxList.forEach(ordsItemTax => {
          if (ordsItemTax.itemTexTypeCd == '1' || ordsItemTax.itemTexTypeCd == '2') { // 면세 OR 영세
            totTaxfreeRate += ordsItemTax.payRate;
          }
        });
        this.discountInfo.totTaxfreeAmt = Math.round((totTaxfreeRate / 100) * disTotAmt);
        this.discountInfo.totTaxableAmt = Math.round((disTotAmt - this.discountInfo.totTaxfreeAmt) / 1.1); // 공급금액
        this.discountInfo.totVatAmt = disTotAmt - this.discountInfo.totTaxfreeAmt - this.discountInfo.totTaxableAmt; // 부가세
      } else { // 정보 없을경우 전부 과세금액
        this.discountInfo.totTaxableAmt = Math.round((disTotAmt - this.discountInfo.totTaxfreeAmt) / 1.1); // 공급금액
        this.discountInfo.totVatAmt = disTotAmt - this.discountInfo.totTaxfreeAmt - this.discountInfo.totTaxableAmt; // 부가세
      }
    },
    // CRM 공지사항 조회
    async retrievelistCrmNotice() {
      const crmNoticeInq = {
        moblTp: '2', // 모바일만 조회
        annceType: '02', // CRM 공지사항
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/pay-notice', crmNoticeInq);
      if (!response.data.success) return;
      this.payNoticeList = response.data.data.payNoticeInfoList;
      if (this.payNoticeList !== null && this.payNoticeList.length > 0) {
        this.crmNoticeTextFlag = true;
      }
    },
    // 정회원인 경우 GS&POINT와 THE POP 리워즈 정보를 조회 한다.
    setDisCount() {
      if (this.ordsInfo !== null && this.mbrGrd == true) { // 정회원일 경우 조회
        this.gsNPoint(); // GS&POINT 조회
        this.thePopRewards(); // THE POP 리워즈 조회
      }
    },
    // 쿠폰 할인 금액 계산 함수
    calcCpnDcAmt() {
      this.discountInfo.dlfeeCpnDcAmt = 0;
      this.discountInfo.bsktCpnDcAmt = 0;
      if (!!this.usePosbBsktCpnList) {
        // 적용 중인 장바구니 쿠폰 할인 금액 Set
        this.discountInfo.bsktCpnDcAmt = this.usePosbBsktCpnList.bsktCpnDcAmt;
        // 적용 중인 배송비 쿠폰 할인 금액 Set
        if (!!this.usePosbBsktCpnList.mfOrdsOptDlfeeCpnInfoList && this.usePosbBsktCpnList.mfOrdsOptDlfeeCpnInfoList.length > 0) {
          this.usePosbBsktCpnList.mfOrdsOptDlfeeCpnInfoList.forEach(cpnInfo => this.discountInfo.dlfeeCpnDcAmt += cpnInfo.dcAmt);
        }

        // 할인금액 정보 재계산 함수 호출
        this.computeDcSum();
      }
    },
    // 할인정보 통합 계산
    computeDcSum() {
      this.discountInfo.totalDcAmt = parseInt(this.discountInfo.dlfeeCpnDcAmt) + parseInt(this.discountInfo.bsktCpnDcAmt)
                                   + parseInt(this.discountInfo.gsNPointDcAmt) + parseInt(this.discountInfo.popRwdDcAmt)
                                   + parseInt(this.resPntForm.discountAmt) + parseInt(this.discountInfo.totCardDcAmt);
      this.$emit(
        'orderSheetDcAmtEvent'
        , this.discountInfo.gsNPointDcAmt
        , this.discountInfo.popRwdDcAmt
        , this.resPntForm.discountAmt === 0 ? null : this.resPntForm
        , this.discountInfo.totCardDcAmt === 0 ? null : this.crcoEvntInfo
        , this.discountInfo.totalDcAmt
      );
    },
    // 사용가능한장바구니쿠폰목록조회
    async retrievelistUsePosbBsktCpn() {
      const iUsePosbBsktCpnListInq = {
        ordId: this.ordsItemList.ordId,
      };
      const response = await ApiUtils.get('/fo/od/mf/ordsmgnt/basket-coupon-list', iUsePosbBsktCpnListInq);
      // 배송비쿠폰, 장바구니쿠폰
      this.usePosbBsktCpnList = response.data.data;
      // 적용 쿠폰 할인 금액 재 계산 함수 호출
      this.calcCpnDcAmt();
    },
    // 보유 쿠폰 수량을 리턴하는 함수
    getHoldCpnCount() {
      let cpnCnt = 0;
      if (!!this.usePosbBsktCpnList) {
        // 사용가능 장바구니 쿠폰 수량
        cpnCnt += !!this.usePosbBsktCpnList.mfOrdsBsktCpnInfoList ? this.usePosbBsktCpnList.mfOrdsBsktCpnInfoList.length : 0;
        // 사용가능 배송비 쿠폰 수량
        if (!!this.usePosbBsktCpnList.mfOrdsDlfeeCpnTypeGrpInfoList) {
          this.usePosbBsktCpnList.mfOrdsDlfeeCpnTypeGrpInfoList.forEach(dlfeeInfo => cpnCnt += dlfeeInfo.ordsDlfeeCpnInfoList.length);
        }
      }
      return cpnCnt;
    },
    // 카드사행사(카드사할인혜택) 이벤트
    setCardDisEvent: function(cardDiscountProm) {
      if (!!cardDiscountProm && (this.discountInfo.gsNPointDcAmt > 0 || this.discountInfo.popRwdDcAmt > 0)) {
        this.$gsdialog.alert(OrderMsg.cardCrcoBuyCrcoSame);
        this.discountInfo.gsNPointDcAmt = 0;
        this.discountInfo.popRwdDcAmt = 0;
      }
      this.$nextTick(() => {
        this.setCardDisEventMain(cardDiscountProm);
      });
    },
    // 카드사행사(카드사할인혜택) 이벤트 처리 함수
    setCardDisEventMain: function (cardDiscountProm) {
      // 반영전 할인금액
      try {
        const beForeTotCardDcAmt = this.discountInfo.totCardDcAmt;
        this.discountInfo.totCardDcAmt = 0;
        this.crcoEvntInfo = !!cardDiscountProm ? cardDiscountProm : null;
        this.cardDiscountProm = !!cardDiscountProm ? cardDiscountProm : null;
        this.discountInfo.totCardDcAmt = !!this.cardDiscountProm ? this.cardDiscountProm.cardDcAmt : 0;
        // 총결제금액보다 할인금액이 큰경우
        if ((this.totAmt + beForeTotCardDcAmt) < this.discountInfo.totCardDcAmt) {
          this.discountInfo.totCardDcAmt = 0;
          this.crcoEvntInfo = null;
          this.cardDiscountProm = null;
          this.$gsdialog.alert(OrderMsg.cardDisValidFullAmt);
          return;
        }
      } finally {
        this.computeDcSum();
      }
    },
    // 배송비/장바구니 쿠폰 적용이 변경 시 이벤트 처리 함수
    bsktCpnChangeEvent() {
      this.$emit('bsktCpnChangeEvent');
    },
    // THE POP리워즈 조회
    async thePopRewards() {
      const thePopRewardsResult = await ApiUtils.get('/fo/cu/mbrmgnt/rewards');
      this.discountInfo.restReward = thePopRewardsResult.data.data.restReward != null ? thePopRewardsResult.data.data.restReward : 0;
    },
    keyupCheckThePopRewards(event) {
      this.checkThePopRewards(event.target.value);
    },
    // 보유 POP 리워즈 체크
    checkThePopRewards(popRwdDcAmt) {
      if (popRwdDcAmt === '') {
        this.discountInfo.popRwdDcAmt = 0;
      }
      // 보유 POP 리워즈 보다 사용 POP 리워즈가 많으면 사용불가.
      if (Number(popRwdDcAmt) > Number(this.discountInfo.restReward)) {
        this.$gsdialog.alert(OrderMsg.popPointMore).then(() => {
          this.discountInfo.popRwdDcAmt = 0;
          this.computeDcSum();
        });
      }
      if (this.cardDiscountProm !== null && popRwdDcAmt > 0) {
        this.$gsdialog.alert(OrderMsg.cardCrcoBuyCrcoSame);
        this.discountInfo.popRwdDcAmt = 0;
      }
      if (popRwdDcAmt < 0) {
        this.discountInfo.popRwdDcAmt = 0;
      }
      // 결제금액보다 사용 POP 리워즈가 더 많으면 사용불가.
      const curDcAmt = parseInt(this.discountInfo.dlfeeCpnDcAmt) + parseInt(this.discountInfo.bsktCpnDcAmt)
                    + parseInt(this.discountInfo.gsNPointDcAmt) + parseInt(popRwdDcAmt)
                    + parseInt(this.resPntForm.discountAmt) + parseInt(this.discountInfo.totCardDcAmt);
      if (curDcAmt > this.discountInfo.curTotAmt + this.discountInfo.totalDcAmt) {
        this.$gsdialog.alert(OrderMsg.pointPayMore).then(() => {
          this.discountInfo.popRwdDcAmt = 0;
          this.computeDcSum();
        });
      }
      this.computeDcSum();
    },
    // POP 리워즈 모두사용
    popRwdsUseAll(event) {
      this.discountInfo.popRwdDcAmt = 0;
      this.computeDcSum();
      // POP 리워즈 사용불가 여부 체크
      if (this.discountInfo.curTotAmt < 0) {
        // 최종결제금액이 0보다 작은 경우 사용불가
        return;
      } else if (this.cardDiscountProm !== null) {
        // 카드즉시할인 적용 시 포인트/리워즈 사용불가
        this.$gsdialog.alert(OrderMsg.cardCrcoBuyCrcoSame);
        this.discountInfo.popRwdDcAmt = 0;
        return;
      } else if (this.discountInfo.restReward === 0) {
        // GS&Point가 0일경우
        this.$gsdialog.alert(OrderMsg.popPointEmpty);
        return false;
      }

      // POP 리워즈 사용 시 제어로직
      if (this.discountInfo.restReward < this.discountInfo.curTotAmt ) {
        // POP 리워즈가 총결제금액(결제금액 - 할인금액)보다 작을경우
        this.discountInfo.popRwdDcAmt = Math.floor(this.discountInfo.restReward/10) * 10;
      } else if (this.discountInfo.restReward > this.discountInfo.curTotAmt) {
        // POP 리워즈가 총결제금액(결제금액 - 할인금액)보다 클경우
        this.discountInfo.popRwdDcAmt = Math.floor(this.discountInfo.curTotAmt/10) * 10;
      }
      this.computeDcSum();
    },
    // THE POP 리워즈 사용취소
    cnclThePopRewards() {
      this.discountInfo.popRwdDcAmt = 0;
      this.computeDcSum();
    },
    // GS&POINT 조회
    async gsNPoint() {
      const gsNPointResult = await ApiUtils.get('/fo/cu/mbrmgnt/gs-point');
      this.discountInfo.gsNPointRestPt = gsNPointResult.data.data.totRestPt != null ? gsNPointResult.data.data.totRestPt : 0;
    },
    // GS&POINT 실시간 체크
    keyupCheckGsNPoint(event) {
      this.checkGsNPoint(event.target.value);
    },
    // 보유 GS&POINT 체크
    checkGsNPoint(gsNPointDcAmt) {
      if (gsNPointDcAmt === '') {
        this.discountInfo.gsNPointDcAmt = 0;
      }
      // 보유 Point 보다 사용 Point가 많으면 사용불가.
      if (Number(gsNPointDcAmt) > Number(this.discountInfo.gsNPointRestPt)) {
        this.$gsdialog.alert(OrderMsg.gsPointMore).then(() => {
          this.discountInfo.gsNPointDcAmt = 0;
          this.computeDcSum();
        });
      }
      if (this.cardDiscountProm !== null && gsNPointDcAmt > 0) {
        this.$gsdialog.alert(OrderMsg.cardCrcoBuyCrcoSame);
        this.discountInfo.gsNPointDcAmt = 0;
      }
      if (gsNPointDcAmt < 0) {
        this.discountInfo.gsNPointDcAmt = 0;
      }
      // 결제금액보다 사용 Point가 더 많으면 사용불가.
      const curDcAmt = parseInt(this.discountInfo.dlfeeCpnDcAmt) + parseInt(this.discountInfo.bsktCpnDcAmt)
                    + parseInt(gsNPointDcAmt) + parseInt(this.discountInfo.popRwdDcAmt)
                    + parseInt(this.resPntForm.discountAmt) + parseInt(this.discountInfo.totCardDcAmt);
      if (curDcAmt > this.discountInfo.curTotAmt + this.discountInfo.totalDcAmt) {
        this.$gsdialog.alert(OrderMsg.pointPayMore).then(() => {
          this.discountInfo.gsNPointDcAmt = 0;
          this.computeDcSum();
        });
      }
      this.computeDcSum();
    },
    // GS&POINT 모두사용
    gsNPntUseAll() {
      this.discountInfo.gsNPointDcAmt = 0;
      this.computeDcSum();
      // GS&POINT 사용불가 여부 체크
      if (this.discountInfo.curTotAmt < 0) {
        // 최종결제금액이 0보다 작은 경우 사용불가
        return;
      } else if (this.cardDiscountProm !== null) {
        // 카드즉시할인 적용 시 포인트/리워즈 사용불가
        this.discountInfo.gsNPointDcAmt = 0;
        this.$gsdialog.alert(OrderMsg.cardCrcoBuyCrcoSame);
        return;
      } else if (this.discountInfo.gsNPointRestPt === 0) {
        // GS&Point가 0일경우
        this.$gsdialog.alert(OrderMsg.gsPointEmpty);
        return;
      }

      // GS&Point 사용 시 제어로직
      if (this.discountInfo.gsNPointRestPt < this.discountInfo.curTotAmt ) {
        // GS&Point가 총결제금액(결제금액 - 할인금액)보다 작을경우
        this.discountInfo.gsNPointDcAmt = Math.floor(this.discountInfo.gsNPointRestPt/10) * 10;
      } else if (this.discountInfo.gsNPointRestPt > this.discountInfo.curTotAmt) {
        // GS&Point가 총결제금액(결제금액 - 할인금액)보다 클경우
        this.discountInfo.gsNPointDcAmt = Math.floor(this.discountInfo.curTotAmt/10) * 10;
      }
      this.computeDcSum();
    },
    // GS&POINT 사용취소
    cnclGsNPoint() {
      this.discountInfo.gsNPointDcAmt = 0;
      this.computeDcSum();
    },
    // 최종 결제금액 정보 Set
    setTotAmt(amt) {
      this.curTotAmt = amt || 0;
    },
    // 해당 주문서에 대한 통신사할인(KT/LGU+) 정보 조회
    async usePntDisCount() {
      // TO-DO :: 추후 사이트유입매체 코드 정의가 된 이후 로직 수정 되어야 함.
      let deviceType = '05'; // DEVICE_TYPE_CD (05 : Market For APP)
      if (this.isMobile()) { // DEVICE_TYPE_CD (02 : MOBILE)
        deviceType = '02';
      }
      // 주문 상품목록 정보 Set
      this.ordsItemInfoList = [];
      if (!!this.ordsItemList && !!this.ordsItemList.ordsDelivSupplGrpInfoList) {
        this.ordsItemList.ordsDelivSupplGrpInfoList.forEach(supplInfo =>
          supplInfo.ordsDlfeeGrpInfoList.forEach(dlfeeInfo =>
          dlfeeInfo.ordsItemInfoList.forEach(itemInfo => this.ordsItemInfoList.push(itemInfo)
        )));
      }
      const param = { ordId: this.ordsInfo.ordId, deviceType: deviceType };
      const response = await ApiUtils.post('/fo/od/mf/ordsmgnt/pnt-discount-info', param);
      this.usePntDisCountList = response.data.data.ordsItemCpnInfoList;
      if (this.usePntDisCountList.length > 0) {
        this.usePntDisCountYn = true;
      }

      // 통신사할인 정보가 없으면 RETURN
      if (!this.usePntDisCountList) return;

      // 통신사할인 정보 Set
      let itemSellInfo = 0; // 상품판매금액
      this.usePntDisCountList.forEach(usePntDisCntInfo => {
        if (usePntDisCntInfo.promDtlTypeCd === '501') {
          this.lgUsePntInfo.promId = usePntDisCntInfo.promId; // 프로모션ID
          this.lgUsePntInfo.promTypeCd = usePntDisCntInfo.promTypeCd; // 프로모션유형코드
          this.lgUsePntInfo.promDtlTypeCd = usePntDisCntInfo.promDtlTypeCd; // 프로모션상세유형코드
          this.lgUsePntInfo.standAmt = usePntDisCntInfo.evntApplStandAmt; // 기준금액
          this.lgUsePntInfo.pntDcAmt = usePntDisCntInfo.beneApplVal; // 포인트 할인 금액
          this.lgUsePntInfo.telcoCardNo = usePntDisCntInfo.telcoCardNo;
          this.lgUsePntInfo.certNo = usePntDisCntInfo.certNo;
          this.lgUsePntInfo.pntUseAmt = 0;
          usePntDisCntInfo.ordsItemSeqnoList.split(',').forEach(itemSeqno => {
            itemSellInfo = this.ordsItemInfoList.find(itemInfo => itemInfo.ordsItemSeqno == itemSeqno);
            this.lgUsePntInfo.pntUseAmt += parseInt(!!itemSellInfo ? itemSellInfo.lastBeneSellAmt : 0);
          });
          this.reqPntForm.telcoType = 'LGU';
        } else if (usePntDisCntInfo.promDtlTypeCd === '502') {
          this.ktUsePntInfo.promId = usePntDisCntInfo.promId; // 프로모션ID
          this.ktUsePntInfo.promTypeCd = usePntDisCntInfo.promTypeCd; // 프로모션유형코드
          this.ktUsePntInfo.promDtlTypeCd = usePntDisCntInfo.promDtlTypeCd; // 프로모션상세유형코드
          this.ktUsePntInfo.standAmt = usePntDisCntInfo.evntApplStandAmt; // 기준금액
          this.ktUsePntInfo.pntDcAmt = usePntDisCntInfo.beneApplVal; // 포인트 할인 금액
          this.ktUsePntInfo.telcoCardNo = usePntDisCntInfo.telcoCardNo;
          this.ktUsePntInfo.certNo = usePntDisCntInfo.certNo;
          this.ktUsePntInfo.pntUseAmt = 0;
          usePntDisCntInfo.ordsItemSeqnoList.split(',').forEach(itemSeqno => {
            itemSellInfo = this.ordsItemInfoList.find(itemInfo => itemInfo.ordsItemSeqno == itemSeqno);
            this.ktUsePntInfo.pntUseAmt += parseInt(!!itemSellInfo ? itemSellInfo.lastBeneSellAmt : 0);
          });
          this.reqPntForm.telcoType = 'KT';
        }
      });
      if (this.usePntDisCountList.length >= 2) {
        this.reqPntForm.telcoType = 'KT';
      }
      // 통신사 할인 타입 정보 초기화
      this.selectMobileType(this.reqPntForm.telcoType);
    },
    // 통신사 할인 타입 변경
    selectMobileType(value) {
      this.reqPntForm.telcoType = value;
      this.reqPntForm.birthDay = "";
      if (value == "KT") { // KT 통신사 변경시 카드번호 초기화
        this.reqPntForm.cardNo1 = "";
        this.reqPntForm.cardNo2 = "";
        this.reqPntForm.cardNo3 = "";
        this.reqPntForm.cardNo4 = "";
        if (this.ktUsePntInfo.telcoCardNo) {
          this.reqPntForm.cardNo1 = this.ktUsePntInfo.telcoCardNo.substring(0, 4);
          this.reqPntForm.cardNo2 = this.ktUsePntInfo.telcoCardNo.substring(4, 8);
          this.reqPntForm.cardNo3 = this.ktUsePntInfo.telcoCardNo.substring(8, 12);
          this.reqPntForm.cardNo4 = this.ktUsePntInfo.telcoCardNo.substring(12, 16);
        }
        if (this.ktUsePntInfo.certNo) {
          this.reqPntForm.birthDay = this.ktUsePntInfo.certNo;
        }
        this.reqPntForm.gid = this.reqPntForm.ktGid;
        this.reqPntForm.mid = this.reqPntForm.ktMid;
        this.reqPntForm.goodsName = this.reqPntForm.ktNormalDcCode; // KT 더블할인 프로모션은 계약기간 만료로 인해 일반할인으로 고정
        this.reqPntForm.promId = this.ktUsePntInfo.promId;
        this.reqPntForm.promTypeCd = this.ktUsePntInfo.promTypeCd;
        this.reqPntForm.promDtlTypeCd = this.ktUsePntInfo.promDtlTypeCd;
        this.reqPntForm.standAmt = this.ktUsePntInfo.standAmt;
        this.reqPntForm.pntDcAmt = this.ktUsePntInfo.pntDcAmt;
        this.reqPntForm.pntUseAmt = this.ktUsePntInfo.pntUseAmt;
      } else { // LG 통신사 변경시 카드번호 초기화
        this.reqPntForm.cardNo1 = "20";
        this.reqPntForm.cardNo2 = "";
        this.reqPntForm.cardNo3 = "";
        this.reqPntForm.cardNo4 = "";
        if (this.lgUsePntInfo.telcoCardNo) {
          this.reqPntForm.cardNo1 = this.lgUsePntInfo.telcoCardNo.substring(0, 4);
          this.reqPntForm.cardNo2 = this.lgUsePntInfo.telcoCardNo.substring(4, 8);
          this.reqPntForm.cardNo3 = this.lgUsePntInfo.telcoCardNo.substring(8, 12);
          this.reqPntForm.cardNo4 = this.lgUsePntInfo.telcoCardNo.substring(12, 16);
        }
        if (this.lgUsePntInfo.certNo) {
          this.reqPntForm.birthDay = this.lgUsePntInfo.certNo;
        }
        this.reqPntForm.gid = this.reqPntForm.lgupGid;
        this.reqPntForm.mid = this.reqPntForm.lgupMid;
        this.reqPntForm.goodsName = "";
        this.reqPntForm.promId = this.lgUsePntInfo.promId;
        this.reqPntForm.promTypeCd = this.lgUsePntInfo.promTypeCd;
        this.reqPntForm.promDtlTypeCd = this.lgUsePntInfo.promDtlTypeCd;
        this.reqPntForm.standAmt = this.lgUsePntInfo.standAmt;
        this.reqPntForm.pntDcAmt = this.lgUsePntInfo.pntDcAmt;
        this.reqPntForm.pntUseAmt = this.lgUsePntInfo.pntUseAmt;
      }
    },
    // 통신사 카드할인 기본 파라메터 조회
    async telcoDcInit() {
      const formData = this.reqPntForm;
      await ApiUtils.post('/fo/pa/telcoDcInitAuth', {}).then(res => {
        formData.ktGid = res.data.telcoDcKtGid;
        formData.ktMid = res.data.telcoDcKtMid;
        formData.ktNormalDcCode = res.data.telcoDcKtNormalDcCode;
        formData.ktDoubleDcCode = res.data.telcoDcKtDoubleDcCode;
        formData.lgupGid = res.data.telcoDcLgupGid;
        formData.lgupMid = res.data.telcoDcLgupMid;
        formData.pcReqUrl = res.data.telcoDcPcPayUrl;
        formData.mobReqUrl = res.data.telcoDcMobPayUrl;
        if (formData.deviceType === "PC") {
          formData.reqUrl = res.data.telcoDcPcPayUrl;
        } else {
          formData.reqUrl = res.data.telcoDcMobPayUrl;
        }

        if (formData.telcoType === "KT") {
          formData.gid = res.data.telcoDcKtGid;
          formData.mid = res.data.telcoDcKtMid;
          formData.goodsName = res.data.telcoDcKtNormalDcCode; // KT 더블할인 프로모션은 계약기간 만료로 인해 일반할인으로 고정
        } else {
          formData.gid = res.data.telcoDcLgupGid;
          formData.mid = res.data.telcoDcLgupMid;
          formData.goodsName = "";
        }
      });
    },
    // 설정/변경된 통신사 할인 정보 Set
    setResPntFormTelcoInfo(resPntForm) {
      this.resPntForm = resPntForm;
      this.computeDcSum();
    },
    // 통신사 할인 사용취소
    cnclTelcoDc() {
      this.resPntForm.discountAmt = 0;
      this.computeDcSum(); // 통신사할인 취소시 0원으로 다시 전송한다.
    },
    // 카드즉시할인의 카드 Image 정보 Get
    getImgNm: function (cd) {
      // 이미지가 바로 로딩이 안되기 때문 require를 사용하여 이미지를 랜더링하여야 함.
      if (cd !== null && cd !== '') {
        return require('@/assets/images/icon/icon_card_logo'+cd+'.png');
      } else {
        return require('@/assets/images/icon/icon_card_logo16.png'); // 임시
      }
    },
  },
  destroyed() {},
  mounted() {
    // CRM공지사항 조회
    this.retrievelistCrmNotice();
    // 정회원일 경우 조회
    if (this.ordsInfo != null && this.mbrGrd == true) {
      this.setDisCount();
    }
    // 해당 주문서에 대한 통신사할인(KT/LGU+) 정보 조회
    this.usePntDisCount();
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
};
</script>
