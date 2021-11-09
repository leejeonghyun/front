<!--ordId,totAmt 받아서 모든처리 함
ordId 주문에 필요한정보 조회를 위하여 필요함
totAmt 경우 상위 componant에서 할인,포인트,배송정책으로 인하여 변경가능함
-->
<template>
  <section :class="{'section-area' : payBtnNone === false && payBtnPass === false}">
    <!-- <main> -->
    <!-- css 깨짐 증상으로 인한 main 주석 처리 2020.11.25-->
      <!-- START : 간편, 일반결제 -->
      <MfPaymentNormal ref="payNormal"
      :dlvDelivYn="dlvDelivYn"
      :ordId="ordId"
      :totAmt="Number(totAmt)"
      :payCallType="payCallType"
      :deviceType="deviceType"
      :gsNPoint="Number(gsNPoint)"
      :productNm="productNm"
      :crcoEvntInfo="crcoEvntInfo"
      @popupAction="popupAction"
      @paymentNormalCCardEvent="paymentNormalCCardEvent"
      @paymentNormalEvent="paymentNormalEvent"
      @paymentNormalMonthlyEvent="paymentNormalMonthlyEvent"
      @CashReceiptIssueEvent="CashReceiptIssueEvent"
      @paymentPGComPanyEvent="paymentPGComPanyEvent"
      @payTypeChg="payTypeChg"
      @setCrcoChargDcInfo="setCrcoChargDcInfo"
      @setCardDisEvent="setCardDisEvent"/>
      <!-- END : 간편, 일반결제 -->
      <!-- START : 결제 CARD - ISP -->
      <OrderPaymentCardISP :orderSheetForm="orderSheetForm" @orderPaymentCallBack="orderPaymentCallBack" v-if="this.payCardIspFlag" />
      <OrderPaymentCardISPKB @popupAction="popupAction" @orderPaymentCallBack="orderPaymentCallBack" :orderSheetForm="orderSheetForm" v-if="this.popup.payCardIspKBFlag" /> <!-- 국민카드 팝업 -->
      <!-- END : 결제 CARD - ISP -->
      <!-- START : 결제 CARD - XMPI -->
      <OrderPaymentCardXMPI @popupAction="popupAction" @orderPaymentCallBack="orderPaymentCallBack" :orderSheetForm="orderSheetForm" v-if="this.popup.payCardXmpiFlag" />
      <!-- END : 결제 CARD - XMPI -->
      <!-- START : 결제 CARD - SMPI -->
      <OrderPaymentCardSMPI @popupAction="popupAction" @orderPaymentCallBack="orderPaymentCallBack" :orderSheetForm="orderSheetForm" v-if="this.popup.payCardSmpiFlag" />
      <!-- END : 결제 CARD - SMPI -->
      <!-- START : 결제 CARD - KMPI -->
      <OrderPaymentCardKMPI @popupAction="popupAction" @orderPaymentCallBack="orderPaymentCallBack" :orderSheetForm="orderSheetForm" v-if="this.popup.payCardKmpiFlag" />
      <!-- END : 결제 CARD - KMPI -->
      <!-- START : 결제 계좌이체 -->
      <OrderPaymentAccount @popupAction="popupAction" @orderPaymentCallBack="orderPaymentCallBack" :orderSheetForm="orderSheetForm" v-if="this.popup.payAccountFlag" />
      <!-- END : 결제 계좌이체 -->
      <!-- START : 휴대폰 소액결제 -->
      <OrderPaymentMcash @popupAction="popupAction" @orderPaymentCallBack="orderPaymentCallBack" :orderSheetForm="orderSheetForm" v-if="this.popup.payMcashFlag" />
      <!-- END : 휴대폰 소액결제 -->
      <!-- START : 결제 모바일팝 -->
      <OrderPaymentMobilePop @popupAction="popupAction" @orderPaymentCallBack="orderPaymentCallBack" :orderSheetForm="orderSheetForm" v-if="this.popup.payMobilePopFlag" />
      <!-- START : 결제 모바일팝 -->
      <!-- START : 결제 통합간편결제 (카카오페이, 페이코) -->
      <OrderPaymentEasyTotalPay @popupAction="popupAction" @orderPaymentCallBack="orderPaymentCallBack" :orderSheetForm="orderSheetForm" v-if="this.popup.payEasyTotalPayFlag" />
      <!-- END : 결제 통합간편결제 (카카오페이, 페이코) -->
      <!-- START : 결제 통합간편결제 (네이버 function 동적로딩시 네이버sdk에러로 정적으로 변경 20200717 유현석) -->
      <OrderPaymentEasyNaverPay ref="orderPaymentEasyNaverPay" @popupAction="popupAction" @orderPaymentCallBack="orderPaymentCallBack" :orderSheetForm="orderSheetForm"/>
      <!-- END : 결제 통합간편결제 (네이버) -->
      <!-- START : 사은품 -->
      <FreeGift ref="freeGift" :crcoInfoInfo="crcoInfoInfo" :ordsItemList="ordsItemList" :payType="payType"
                :totAmt="totAmt" @defaultFreeGift="defaultFreeGift" @setFreeGift="setFreeGift"
                v-if="ordsItemList !== null && (productNm === undefined || productNm === null)"/>
      <!-- END : 사은품 -->
      <!-- START : 개인정보 제공 동의 -->
      <!-- 추가결제의 경우 사용안함 by 윤창웅C(20.07.09) -->
      <OrderAgreement @popupAction="popupAction" v-if="cmmSiteClass !== 'marketfor' && ordsItemList !== null && payBtnNone == false" :productItems="productItems" :strInfo="strInfo" :tab="tab" @orderAgreeChk="orderAgreeChk"/>
      <MfOrderAgreement @popupAction="popupAction" v-if="cmmSiteClass === 'marketfor' && ordsItemList !== null && payBtnNone == false" @orderAgreeChk="orderAgreeChk"/>
      <MfPopupRule @popupEvent="popupAction" v-if="this.popup.popupRule" :productItems="productItems"/> <!-- 팝업 - 이용약관 -->
      <PopupPersonalAgreeDetail @popupAction="popupAction" :ordsItemList="ordsItemList" v-if="this.popup.popupPersonalAgreeDetail && payBtnNone == false" /> <!-- 팝업 - 개인정보 수집 동의 -->
      <PopupAgreeDetail @popupAction="popupAction" :ordsItemList="ordsItemList" v-if="this.popup.popupAgreeDetail && payBtnNone == false" /> <!-- 팝업 - 개인정보 제3자 제공동의 -->
      <!-- END : 개인정보 제공 동의 -->
      <div class="bottom-btn-area mt0" v-if="payBtnNone == false && payBtnPass == false" @click="orderPaymentProc()">
        <button type="button" class="btn-lg btn-bg lightgreen" @click="resetPayStatus(true)"><span>{{toComma(totAmt)}}원 결제하기</span></button> <!-- 20200401 수정 -->
      </div>
      <div class="bottom-btn-area mt0" v-if="payBtnNone == false && payBtnPass == true" @click="orderPaymentProc()">
        <button type="button" class="btn-lg btn-bg lightgreen" @click="resetPayStatus(true)"><span>{{toComma(totAmt)}}원 결제하기</span></button> <!-- 20200401 수정 -->
      </div>
      <!-- 추가결제 사용버튼 by 퍼블 -->
      <div class="bottom-btn-area mt0" v-if="payBtnNone && productNm === '추가결제_URL'" @click="orderPaymentProc()">
        <button type="button" class="btn-lg btn-bg lightgreen" @click="resetPayStatus(true)"><span>결제하기</span></button>
      </div>
    <!-- </main> -->
  </section>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import MfPaymentNormal from '@/components/order/MfPaymentNormal'; // 간편, 일반결제
import OrderPaymentCardISP from '@/components/order/OrderPaymentCardISP'; // 주문결제 - Card-ISP
import OrderPaymentCardISPKB from '@/components/order/OrderPaymentCardISPKB'; // 주문결제 - Card-ISP 국민카드 팝업
import OrderPaymentCardXMPI from '@/components/order/OrderPaymentCardXMPI'; // 주문결제 - Card-XMPI
import OrderPaymentCardSMPI from '@/components/order/OrderPaymentCardSMPI'; // 주문결제 - Card-SMPI
import OrderPaymentCardKMPI from '@/components/order/OrderPaymentCardKMPI'; // 주문결제 - Card-KMPI
import OrderPaymentAccount from '@/components/order/OrderPaymentAccount'; // 주문결제 - 계좌이체
import OrderPaymentMcash from '@/components/order/OrderPaymentMcash'; // 주문결제 - 휴대폰 소액결제
import OrderPaymentMobilePop from '@/components/order/OrderPaymentMobilePop'; // 주문결제 - 모바일팝
import OrderPaymentEasyTotalPay from '@/components/order/OrderPaymentEasyTotalPay'; // 주문결제 - 통합간편결제(카카오페이, 페이코)
import OrderPaymentEasyNaverPay from '@/components/order/OrderPaymentEasyNaverPay'; // 주문결제 - 통합간편결제(네이버페이)
import OrderAgreement from '@/components/order/OrderAgreement'; // 주문 정보 확인 동의
import MfOrderAgreement from '@/components/order/MfOrderAgreement'; // 주문 정보 확인 동의 - Market for 용
import PopupPersonalAgreeDetail from '@/views/od/PopupTdptCollectAgrInfo'; // 팝업 - 개인정보 수집 동의
import PopupAgreeDetail from '@/views/od/PopupTdptOferAgrInfo'; // 팝업 - 개인정보 제3자 제공동의
import MfPopupRule from '@/views/od/MfPopupRule'; // Market For 용 개인정보 수집 동의 상세 팝업 및 이용약관
import FreeGift from '@/components/order/FreeGift'; // 사은품
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import ApiUtils from '@/common/ApiUtils';
import JwtUtils from '@/common/JwtUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import CookieUtils from '@/common/CookieUtils';
import OdUtils from '@/common/od/OdUtils'; // 주문공통
export default {
  props: {
    ordId: String,
    totAmt: Number,
    payCallType: Array,
    productNm: String,
    productMbr: Object,
    gsNPoint: Number,
    strInfo: Object,
    payBtnNone: Boolean, // 클레임쪽 요청 default false
    payBtnPass: Boolean, // 달리살다프리미엄요청 default false
    crcoEvntInfo: Object, // 주문고유기능 카드할인 default결재수단
    tab: Object,
  },
  name: "PayDefault",
  data() {
    return {
      popup: { // 팝업
        open: false,
        payCardIspKBFlag: false,
        payCardKmpiFlag: false,
        payCardXmpiFlag: false,
        payCardSmpiFlag: false,
        payMcashFlag: false,
        payAccountFlag: false,
        payEasyTotalPayFlag: false,
        payMobilePopFlag: false,
        popupPersonalAgreeDetail: false, // 개인정보 수집 동의
        popupAgreeDetail: false, // 개인정보 제3자 제공동의
        popupRule: false, // Market For 용 개인정보 수집 동의 상세 팝업 및 이용약관
      },
      payCardIspKBFlag: false, // 레이어팝업 사용안함..
      payCardIspFlag: false, // 레이어팝업 사용안함..
      deviceType: '',
      ordsDlvpSeqno: 0, // 주문서배송지일련번호
      payNoticeList: [],
      dlvDelivYn: 'N',
      ordsDlvpInfo: {},
      delivRequest: null, // 배송요청사항(상품수령위치, 결품발생시처리방법,영수증수령방법)
      crcoInfoInfo: null, // 선택된 신용카드 정보
      monthly: '01',
      totalDcAmt: 0, // 총 할인금액
      payType: '02', // 결제수단(default : 02(신용카드))
      payGbn: '02', // 결제탭
      resPntForm: null, // 선택된 통신사할인정보
      gsNPointDcAmt: 0, // 사용하는 gsNpoint 정보
      popRwdDcAmt: 0,
      totPrdAmt: 0, // 주문금액
      totTaxfreeAmt: 0, // 면세금액
      totTaxableAmt: 0, // 과세금액
      totVatAmt: 0, // 부가세
      totTaxfreeRate: 0, // 면세율
      totTaxableRate: 0, // 과세율
      totItemTaxAmt: 0, // 총상품과세금액
      totItemFTaxAmt: 0, // 총상품비과세금액
      totItemVatAmt: 0, // 총상품부가세금액
      pntUseAmt: 50000, // 포인트사용가능상품금액 TO-DO 포인트사용가능금액 확인
      paymentDate: null,
      orderSheetForm: null, // 결제정보 처리
      ordsItemList: {}, // 주문서상품목록
      ordsItemTaxList: [], // 주문 상품 과면세 리스트
      productItems: [], // 상품 아이템 목록
      pytcCd: '', // PG사코드
      pytcNm: '', // PG사명
      monthlyInfo: {
        monthly: '01',
        noIntYn: 'N',
      }, // 선택된 할부개월수정보
      cashRcpctInfo: null, // 현금영수증 발행여부
      mbrGrd: true, // 회원등급
      ordsDelivGrpInfo: null, // 배송지, 배송정보
      noInterestCardDetailInfo: null, // 선택된 무이자 할부 카드정보
      easyPayInfoType: {
        gbn: null,
        type: null,
      },
      agreeChk: false,
      liqAgreeChk: false,
      pkupChk: false,
      taxPrdAmt: 0,
      ftaxPrdAmt: 0,
      totItemAmt: 0, // 상품총금액
      lockPay: false, // 결제고정여부 카드할인
      cmmSiteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '결제 < %s'
  },
  mixins: [AccordionMixin, LayerPopupMixin, OdUtils],
  components: {
    MfPaymentNormal, // 간편, 일반결제
    OrderPaymentCardISP, // 주문결제 - Card-ISP
    OrderPaymentCardISPKB, // 주문결제 - Card-ISP(국민카드)
    OrderPaymentCardXMPI, // 주문결제 - Card-XMPI
    OrderPaymentCardSMPI, // 주문결제 - Card-SMPI
    OrderPaymentCardKMPI, // 주문결제 - Card-KMPI
    OrderPaymentAccount, // 주문결제 - 계좌이체
    OrderPaymentMcash, // 주문결제 - 휴대폰 소액결제
    OrderPaymentMobilePop, // 주문결제 - 모바일팝
    OrderPaymentEasyTotalPay, // 주문결제 - 통합간편결제(카카오페이, 페이코)
    OrderPaymentEasyNaverPay, // 주문결제 - 통합간편결제(네이버페이)
    OrderAgreement, // 약관
    MfOrderAgreement, // 약관 - Market For 용
    PopupPersonalAgreeDetail, // 개인정보 수집 동의
    PopupAgreeDetail, // 개인정보 제3자 제공동의
    MfPopupRule, // Market For 용 개인정보 수집 동의 상세 팝업 및 이용약관
    FreeGift, // 사은품
  },
  watch: {
    // 총액 변경시 모듈 무조건 초기화
    totAmt: async function() {
      await this.resetPayStatus(true);
      if (this.totAmt > 0) {
        this.payType = await this.payGbn;
      }
      await this.retrievelistOrdsItem();
      await this.paymentPrdTaxCalc();
      await this.paymentNormalCCardEvent(this.crcoInfoInfo);
      await this.amtChg();
    },
    payType: function() {
      // 할인 관련 카드정보
      if (this.payBtnNone === false && this.payBtnPass === false) {
        this.setPayInfo();
      }
    },
    crcoInfoInfo: function() {
      // 할인 관련 카드정보
      if (this.payBtnNone === false && this.payBtnPass === false) {
        this.setPayInfo();
      }
    },
    pytcCd: function() {
      // 할인 관련 카드정보
      if (this.payBtnNone === false && this.payBtnPass === false) {
        this.setPayInfo();
      }
    },
    crcoEvntInfo: function() {
      if (this.crcoEvntInfo != null) {
        this.lockPay = true;
        this.crcoEvntInfo.lockPay = true;
      } else {
        this.lockPay = false;
      }
    }
  },
  methods: {
    amtChg() {
      this.$emit('amtChg');
    },
    popupAction(...args) { // 팝업 활성/비활성
      const typ = args[0];
      if (typ === 'payCardIspKBFlag') {
        this.payCardIspKBFlag = !this.payCardIspKBFlag;
      }
      if (typ === 'payCardIspFlag') {
        this.payCardIspFlag = !this.payCardIspFlag;
      }
      this.popup[`${typ}`] = !this.popup[`${typ}`];
      this.popup.open = !this.popup.open;
    },
    setPayInfo() {
      const payInfo = {};
      payInfo.crcoInfoInfo = this.crcoInfoInfo;
      payInfo.payType = this.payType;
      payInfo.pytcCd = this.pytcCd;
      payInfo.pytcNm = this.pytcNm;
      this.$emit('setPayInfo', payInfo);
    },
    // 주문서배송지목록조회 (*필수)
    async retrievelistOrdsDlvp() {
      const iOrdsDlvpListInq = {
        ordId: this.ordId,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/delivery-place-list', iOrdsDlvpListInq);
      const ordsDlvpInfoList = response.data.data.ordsDlvpInfoList;
      if (ordsDlvpInfoList.length > 0) {
        this.ordsDlvpInfo = ordsDlvpInfoList[0];
      } else {
        // cu결제추가
        if (this.productMbr !== undefined && this.productMbr !== null) {
          this.ordsDlvpInfo.adrsNm = this.productMbr.adrsNm; // 구매자명
          this.ordsDlvpInfo.adrsMoblTelNo = this.productMbr.adrsMoblTelNo; // 구매자연락처
          this.ordsDlvpInfo.cmmMbrNo = this.productMbr.cmmMbrNo; // 구매자회원번호
        }
      }
      this.ordsDlvpSeqno = this.ordsDlvpInfo.ordsDlvpSeqno;
      await this.retrievelistOrdsItem(); // 주문상품 조회
      // 업체택배배송여부 20200827 해외배송시에도 소액결제 불가 추가
      // if ('Y' === this.ordsDlvpInfo.owncoDlvDelivYn || 'Y' === this.ordsDlvpInfo.firmDlvDelivYn) {
      /* Market For는 업체택배인 경우 휴대폰소액결제도 허용한다.
      if ('Y' === this.ordsDlvpInfo.firmDlvDelivYn || 'Y' === this.ordsDlvpInfo.abrdDelivYn) {
        this.dlvDelivYn = 'Y';
      }
      */
      // 주문 상품 과면세 리스트 조회
      this.paymentPrdTaxCalc();
    },
    // 주문서상품목록조회 (*필수)
    async retrievelistOrdsItem() {
      const iOrdsItemListInq = {
        ordId: this.ordId,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
      };
      const response = await ApiUtils.get('/fo/od/mf/ordsmgnt/product-list', iOrdsItemListInq);
      this.ordsItemList = response.data.data;

      // 상품 리스트 가공 하위여러 컴포넌트에서 사용
      if (this.ordsItemList != null) {
        const productItems = [];
        const ordsDelivSupplGrpInfoList = this.ordsItemList.ordsDelivSupplGrpInfoList;
        if (ordsDelivSupplGrpInfoList !== undefined && ordsDelivSupplGrpInfoList !== null) {
          for (let j = 0; j < ordsDelivSupplGrpInfoList.length; j++) {
            const ordsDlfeeGrpInfoList = ordsDelivSupplGrpInfoList[j].ordsDlfeeGrpInfoList;
            for (let k = 0; k < ordsDlfeeGrpInfoList.length; k++) {
              const ordsItemInfoList = ordsDlfeeGrpInfoList[k].ordsItemInfoList;
              for (let l = 0; l < ordsItemInfoList.length; l++) {
                const productInfo = {};
                productInfo.categoryType = "PRODUCT"; // 네이버 DEFAULT값 변경금지
                productInfo.categoryId = "GENERAL"; // 네이버 DEFAULT값 변경금지
                productInfo.uid = ordsItemInfoList[l].itemId;
                productInfo.name = ordsItemInfoList[l].itemNm;
                productInfo.count = ordsItemInfoList[l].itemOrdQty;
                productInfo.liqItemYn = ordsItemInfoList[l].liqItemYn;
                productInfo.lastBeneSellAmt = ordsItemInfoList[l].lastBeneSellAmt; // 상품금액 갯수,할인 적용된 총액
                productInfo.itemTaxTypeCd = ordsItemInfoList[l].itemTaxTypeCd; // 과면세구분 0과세 1면세
                productInfo.supplFirmNm = ordsItemInfoList[l].supplFirmNm; // 몰명
                productItems.push(productInfo);
              }
            }
          }
          this.productItems = productItems;
        }
      }
    },
    // 상품과면세계산
    async paymentPrdTaxCalc() {
      const param = {
        ordId: this.ordId,
        tbType: 'ORDS', // ORDS OR ORD
          ordsPromCard: this.crcoEvntInfo, // 카드할인 선 반영 추가 20200812 유현석
      };

      const response = await ApiUtils.post('/fo/od/mf/ordsmgnt/ord-item-texFtex-rate', param);
      this.ordsItemTaxList = response.data.data;

      if (this.ordsItemTaxList.length > 0 && (this.productNm === undefined || this.productNm === null)) {
        this.totTaxfreeAmt = 0;
        this.totTaxableAmt = 0;
        this.totVatAmt = 0;
        this.totTaxfreeRate = 0;
        this.totTaxableRate = 0;
        this.totItemAmt = 0;
        this.totItemTaxAmt = 0;
        this.totItemFTaxAmt = 0;
        this.totItemVatAmt = 0;
        for (let i=0; i < this.ordsItemTaxList.length; i++) {
          const ordsItemTax = this.ordsItemTaxList[i];
          if (ordsItemTax.itemTexTypeCd == '1' || ordsItemTax.itemTexTypeCd == '2') { // 면세 OR 영세
            this.totTaxfreeRate += ordsItemTax.payRate;
            this.totItemFTaxAmt += ordsItemTax.ordAmt;
          } else {
            this.totItemTaxAmt += ordsItemTax.ordAmt; // 총상품과세매출액
          }
          this.totItemVatAmt += ordsItemTax.ordVatAmt; // 총상품부가세금액
          this.totItemAmt += ordsItemTax.ordAmt;
        }
        this.totTaxfreeAmt = Math.round((this.totTaxfreeRate / 100) * this.totAmt);
        this.totTaxableAmt = Math.round((this.totAmt - this.totTaxfreeAmt) / 1.1); // 공급금액
        this.totTaxableRate = 100 - this.totTaxfreeRate;
        this.totVatAmt = this.totAmt - this.totTaxfreeAmt - this.totTaxableAmt; // 부가세
      } else { // 정보 없을경우 전부 과세금액
        this.totTaxableRate = 100;
        this.totTaxableAmt = Math.round((this.totAmt - this.totTaxfreeAmt) / 1.1); // 공급금액
        this.totVatAmt = this.totAmt - this.totTaxfreeAmt - this.totTaxableAmt; // 부가세
      }
      // 주문 상품 과면세 리스트 정보가 갱신 되면 과면세 정보를 동기화 시키기 위한 처리 함수 호출
      this.$emit('setOrdsItemTaxList', this.ordsItemTaxList);
    },
    // 선택된 PG사 정보 이벤트 (*필수)
    paymentPGComPanyEvent: function(pytcCd, pytcNm) {
      this.pytcCd = pytcCd;
      this.pytcNm = pytcNm;
    },
    // 선택된 결제수단정보 이벤트 (*필수)
    paymentNormalEvent: function(gbn) {
      this.payType = gbn;
      this.payGbn = gbn;
      // 결제 Components false
      this.resetPayStatus(true);
    },
    // 선택된 카드정보 이벤트 (*필수)
    paymentNormalCCardEvent: function(crcoInfo) {
      this.crcoInfoInfo = crcoInfo;
      this.$emit('setCrcoInfoInfo', crcoInfo);
    },
    // 선택된 할부개월수 이벤트 (*필수)
    paymentNormalMonthlyEvent: function(monthlyInfo, noInterestCardDetailInfo) {
      this.monthly = monthlyInfo.monthly;
      this.monthlyInfo = monthlyInfo;
      this.noInterestCardDetailInfo = noInterestCardDetailInfo;
    },
    // 현금영수증발행 이벤트
    CashReceiptIssueEvent: function(cashRcpctInfo) {
      this.cashRcpctInfo = cashRcpctInfo;
      this.$emit('CashReceiptIssueEvent', cashRcpctInfo);
    },
    // 카카오 페이코 필수
    payTypeChg(gbn, type) {
      this.easyPayInfoType.gbn = gbn;
      this.easyPayInfoType.type = type;
    },
    // 3자리마다 ',' 처리
    toComma(num) {
      return NumberUtils.toComma(num);
    },
    // 결재모듈초기화
    resetPayStatus(gbn) {
      if (gbn) {
        this.orderSheetForm = {};
      }
      this.popup.open = false;
      this.payCardIspFlag = false;
      this.popup.payCardKmpiFlag = false;
      this.popup.payCardXmpiFlag = false;
      this.popup.payCardSmpiFlag = false;
      this.popup.payCardIspFlag = false;
      this.payCardIspKBFlag = false;
      this.popup.payMcashFlag = false;
      this.popup.payAccountFlag = false;
      this.popup.payEasyTotalPayFlag = false;
      this.popup.payMobilePopFlag = false;
      // this.paymentPrdTaxCalc(); // 과면세 상품 조회 시 동기화 처리 문제로 삭제함.
    },
    // PG결제프로세스 처리
    orderPaymentProc() {
      // 1. 결제 components 초기화
      // 2. 상위컴포넌트 validation call
      this.$emit('__validation', this.payType);
      const validationChk = this.$parent.validationChk !== undefined ? this.$parent.validationChk : true; // prop으로 가져올시 watch가 바인딩되는 속도보다 느림
      if (validationChk) {
        // 3. 결제수단 및 카드종류에 따라 해당 component ON 및 결제수단에 따른 파라메터 세팅
        this.orderSheetForm.agreeChk = this.agreeChk;
        this.orderSheetForm.liqAgreeChk = this.liqAgreeChk;
        this.orderSheetForm.deviceType = this.deviceType; // 디바이스
        this.orderSheetForm.payType = this.payType; // 결재수단
        this.orderSheetForm.buyer_name = this.ordsDlvpInfo.adrsNm; // 구매자명
        this.orderSheetForm.buyer_tel = this.ordsDlvpInfo.adrsMoblTelNo; // 구매자연락처
        this.orderSheetForm.memNo = this.ordsDlvpInfo.cmmMbrNo; // 구매자회원번호
        this.orderSheetForm.email = ''; // 구매자이메일 고객정보에 없음 TODO
        if (this.productNm !== undefined && this.productNm !== null) {
          this.orderSheetForm.goods_name = this.productNm;
          this.orderSheetForm.goods_cnt = 1;
        } else {
          if (this.ordsItemList.otherItemCnt > 0) {
            this.orderSheetForm.goods_name = this.ordsItemList.repItemNm+" 외 "+this.ordsItemList.otherItemCnt+"건"; // 구매상품명
          } else {
            this.orderSheetForm.goods_name = this.ordsItemList.repItemNm; // 구매상품명
          }
          this.orderSheetForm.goods_cnt = this.ordsItemList.otherItemCnt+1; // 구매상품수량
        }
        this.orderSheetForm.goods_price = this.totAmt; // 결제금액
        this.orderSheetForm.totalTaxfreeAmt = this.totTaxfreeAmt; // 면세대상금액
        this.orderSheetForm.totalTaxableAmt = this.totTaxableAmt; // 과세대상금액
        this.orderSheetForm.totalVatAmt = this.totVatAmt; // 부가세
        this.orderSheetForm.totTaxfreeRate = this.totTaxfreeRate; // 면세율
        this.orderSheetForm.totTaxableRate = this.totTaxableRate; // 과세율
        this.orderSheetForm.totItemAmt = this.totItemAmt; // 상품금액
        this.orderSheetForm.totItemTaxAmt = this.totItemTaxAmt; // 총상품과세금액
        this.orderSheetForm.totItemFTaxAmt = this.totItemFTaxAmt; // 총상품면세금액
        this.orderSheetForm.totItemVatAmt = this.totItemVatAmt; // 총상품부가세금액
        console.log('goods_price', this.orderSheetForm.goods_price);
        console.log('totalTaxfreeAmt', this.orderSheetForm.totalTaxfreeAmt);
        console.log('totalTaxableAmt', this.orderSheetForm.totalTaxableAmt);
        console.log('totalVatAmt', this.orderSheetForm.totalVatAmt);
        console.log('totTaxfreeRate', this.orderSheetForm.totTaxfreeRate);
        console.log('totTaxableRate', this.orderSheetForm.totTaxableRate);
        this.orderSheetForm.totalServiceAmt = 0; // 봉사료
        this.orderSheetForm.aff_name = "Market For"; // 가맹점명
        this.orderSheetForm.orderNo = this.ordId; // 주문번호
        // 결재모듈 결재방식
        if (this.totAmt < 1000) {
          this.orderSheetForm.payCompany = '스마트로'; // 09 : KCP, 02:스마트로
          this.orderSheetForm.payCompanyCd = '02'; // 09 : KCP, 02:스마트로
        } else {
          this.orderSheetForm.payCompany = this.pytcNm; // 09 : KCP, 02:스마트로
          this.orderSheetForm.payCompanyCd = this.pytcCd; // 09 : KCP, 02:스마트로
        }
      // 결재방식별 validation
      if (this.validationInfo()) {
        console.log(this.payType);
        if (this.payType === '99' && (this.totAmt === 0 || this.payBtnNone)) { // 추가결제의 GS&POINT일경우 결제금액을 0으로해서 상위로 넘긴다. 추가결제요청건 반영
          // 사용 할 GS&POINT Set
          if (this.payBtnNone) {
            this.orderSheetForm.useGsNPoint = document.getElementById("gsNPointBox").value;
          } else {
            this.orderSheetForm.useGsNPoint = document.getElementById("gsNPointDcAmt").value;
          }
          // 주문결제 CallBack 함수 호출
          this.orderPaymentCallBack(null, false, null);
        } else if (this.payType == "01") { // 계좌이체
          this.orderSheetForm.payCompany = '스마트로'; // 09 : KCP, 02:스마트로
          this.orderSheetForm.payCompanyCd = '02'; // 09 : KCP, 02:스마트로
          this.orderSheetForm.authType = 'BANK';
          this.orderSheetForm.goods_name = 'GS 프레시몰'; // 계좌이체시 상품명
          this.popupAction('payAccountFlag');
        } else if (this.payType == "02") { // 신용카드
          // 결제파라메터 세팅
          this.orderSheetForm.cardCode = this.crcoInfoInfo.cardCode; // 카드사코드
          this.orderSheetForm.mobilCertAllowCrcoCd = this.crcoInfoInfo.mobilCertAllowCrcoCd; // 인증카드사코드
          this.orderSheetForm.orderCardname = this.crcoInfoInfo.pytcCardNm; // 카드명
          this.orderSheetForm.mobilCertReqTypeCd = this.deviceTypeChk() === 'PC' ? this.crcoInfoInfo.pcCertReqTypeCd : this.crcoInfoInfo.mobilCertReqTypeCd; // 신용카드결제타입
          this.orderSheetForm.pytcApprCardCd = this.crcoInfoInfo.pytcApprCardCd; // 승인카드사코드
          if (this.monthlyInfo.monthly === '01') { // 일시불일경우 1로 전송되는 값을 카드결제처리시 오류때문에 0으로 변경
            this.orderSheetForm.quota_inf = '0'; // 할부개월수
          } else {
            // this.orderSheetForm.quota_inf = (this.monthlyInfo.monthly).substr(1, 1); // 할부개월수
            this.orderSheetForm.quota_inf = this.monthlyInfo.monthly; // 할부개월수
            if (this.orderSheetForm.quota_inf.substr(0, 1) == "0") {
              this.orderSheetForm.quota_inf = this.orderSheetForm.quota_inf.substr(1, 1);
            }
          }
          if (this.monthlyInfo.noIntYn === 'Y') {
            if (this.orderSheetForm.quota_inf === "0") {
              this.orderSheetForm.noint_inf = "0";
            } else {
              this.orderSheetForm.noint_inf = "2";
            }
          } else {
            this.orderSheetForm.noint_inf = "0";
          }
          this.orderSheetForm.noint_yn = this.monthlyInfo.noIntYn;
          if (this.orderSheetForm.mobilCertReqTypeCd == "ISP") { // ISP(PopupCCardList.vue 페이지 참조)
              this.payCardIspFlag = true;
            // console.log("this.orderSheetForm : ", this.orderSheetForm);
            // KVP_NOINT_INF : 무이자할부정보 설정
            // KVP_QUOTA_INF : 할부개월수
          } else if (this.orderSheetForm.mobilCertReqTypeCd == "KMOTION") {
            this.orderSheetForm.authType = 'KMOTION';
            this.orderSheetForm.payCompany = '스마트로'; // 09 : KCP, 02:스마트로
            this.orderSheetForm.payCompanyCd = '02'; // 09 : KCP, 02:스마트로
            this.orderSheetForm.cardCode = this.crcoInfoInfo.cardCode; // 카드사코드
            // this.payCardIspKBFlag=true;
            this.popupAction('payCardIspKBFlag'); // 팝업으로 대체
          } else if (this.orderSheetForm.mobilCertReqTypeCd == "XMPI") { // XMPI(PopupCCardList.vue 페이지 참조)
            // 결제팝업 오픈
            this.popupAction('payCardXmpiFlag');
          } else if (this.orderSheetForm.mobilCertReqTypeCd == "SMPI") { // SMPI(PopupCCardList.vue 페이지 참조)
            // 결제팝업 오픈
            this.popupAction('payCardSmpiFlag');
          } else if (this.orderSheetForm.mobilCertReqTypeCd == "KMPI") { // KMPI(PopupCCardList.vue 페이지 참조)
            // 결제팝업 오픈
            this.popupAction('payCardKmpiFlag');
          }
        } else if (this.payType == "04") { // 페이코
          this.orderSheetForm.authType = 'PAYCO';
          this.orderSheetForm.easyPayType = 'PAYCO';
          this.orderSheetForm.easyPayInfoType = this.easyPayInfoType.type; // 현금 카드 여부
          this.orderSheetForm.cardInfoCode = this.crcoInfoInfo !== null ? this.crcoInfoInfo.mobilCertAllowCrcoCd : null; // 카드시 카드유형
          this.orderSheetForm.productItems = this.productItems;
          this.orderSheetForm.payCompanyCd = "04";
          this.popupAction('payEasyTotalPayFlag');
        } else if (this.payType == "05") { // 카카오페이
          this.orderSheetForm.authType = 'KAKAOPAY';
          this.orderSheetForm.easyPayType = 'KAKAOPAY';
          this.orderSheetForm.easyPayInfoType = this.easyPayInfoType.type; // 현금 카드 여부
          this.orderSheetForm.cardInfoCode = this.crcoInfoInfo !== null ? this.crcoInfoInfo.mobilCertAllowCrcoCd : null; // 카드시 카드유형
          this.orderSheetForm.productItems = this.productItems;
          this.orderSheetForm.payCompanyCd = "05";
          this.popupAction('payEasyTotalPayFlag');
        } else if (this.payType == "06") { // 네이버페이
          this.orderSheetForm.authType = 'NAVERPAY';
          this.orderSheetForm.easyPayType = 'NAVERPAY';
          this.orderSheetForm.productItems = this.productItems;
          this.orderSheetForm.payCompanyCd = "06";
          this.$refs.orderPaymentEasyNaverPay.initPay(this.orderSheetForm); // 네이버페이 정적으로 script변경 유현석 20200717
        } else if (this.payType == "10") { // 휴대폰소액결제
          this.orderSheetForm.authType = 'CELLPHONE';
          this.orderSheetForm.payCompanyCd = "02";
          this.popupAction('payMcashFlag');
        } else if (this.payType == "13") { // 모바일팝
          this.orderSheetForm.authType = 'MOBPOP';
          this.orderSheetForm.payCompanyCd = "02";
          this.orderSheetForm.ordId = this.ordId; // 주문번호
          this.popupAction('payMobilePopFlag');
          }
        }
      }
    },
    validationInfo() {
      let succ = false;
      // 신용카드
      if (this.totAmt !== 0 && this.payType == '02') {
        if (this.crcoInfoInfo != null && this.crcoInfoInfo.cardCode != null) {
          succ = true;
        } else {
          this.$gsdialog.alert(OrderMsg.selectCard);
          succ = false;
        }
      // 카카오 페이코 결재방식 설정
      } else if (this.totAmt !== 0 && (this.payType == '04' || this.payType == '05')) {
        if (this.easyPayInfoType.gbn === null) {
          this.$gsdialog.alert(OrderMsg.payTypeChk);
          succ = false;
        } else if (this.easyPayInfoType.gbn !== null && this.easyPayInfoType.type === 'CARD') {
          if (this.crcoInfoInfo !== null) {
            succ = true;
          } else {
            this.$gsdialog.alert(OrderMsg.selectCard);
            succ = false;
          }
        } else {
          succ = true;
        }
      } else if (this.totAmt === 0 && this.lockPay) { // 카드할인 0원결제여부
        this.$gsdialog.alert(OrderMsg.cardDisValidZeroAmt);
        succ = false;
      } else if (this.totAmt === 0) {
        this.payType = "99";
        succ = true;
      } else {
        succ = true;
      }
      // 추가결제 GS&POINT 결제 방식 인 경우 Validate
      if (this.payType === '99' && this.payBtnNone) {
        const useGsPoint = document.getElementById("gsNPointBox").value; // 사용 할 GS&POINT
        const tdrAmt = this.orderSheetForm.goods_price; // 결제금액
        if (StringUtils.isEmpty(useGsPoint)) {
          this.$gsdialog.alert(OrderMsg.useGsPointEmpty);
          succ = false;
        } else if (tdrAmt > useGsPoint) {
          this.$gsdialog.alert(OrderMsg.useGsPointValid);
          succ = false;
        } else if (tdrAmt < useGsPoint) {
          this.$gsdialog.alert(OrderMsg.useGsPointMore);
          succ = false;
        } else {
          succ = true;
        }
      }
      if (succ && (!this.payBtnNone)) {
        if (!this.liqAgreeChk) { // 주류구매 동의체크
          // document.getElementById('agree-info1').focus;
          this.moveElement('agree-info1');
          this.$gsdialog.alert(OrderMsg.liqAgreeChk);
          succ = false;
        } else if (!this.pkupChk) { // 픽업 동의체크
          if (this.tab.pickup) {
            this.moveElement('agree-info5');
            this.$gsdialog.alert(OrderMsg.pkupChk);
            succ = false;
          }
        } else if (!this.agreeChk) { // 주문상품 및 결제대행 동의체크
          // document.getElementById('agree-info2').focus;
          this.moveElement('agree-info2');
          this.$gsdialog.alert(OrderMsg.agreeChk);
          succ = false;
        }
        if (succ) {
          this.$emit('procOrderAgree');
        }
      } else {
        this.moveElement('paymentNormalAccordionContent');
      }
      // 쿠폰 결제사여부 및 카드체크 20200805 유현석payInfo
      succ = this.chkCpnValid(succ);
      // console.log(succ);
      return succ;
    },
    chkCpnValid(succ) {
      // 해당로직 axios 동기화 어려워서 XMLHttpRequest 구현 유현석 20200805
      if (succ && this.payBtnNone === false && this.payBtnPass === false) {
        const that = this;
        const xhr = new XMLHttpRequest();
        const param = {
          ordId: this.ordId,
          tdrMeansCd: this.payType,
          crcoCd: (this.crcoInfoInfo != null) ? this.crcoInfoInfo.crcoCd : null,
        };
        const encVal = JwtUtils.getEncVal();
        // const idToken = await ApiUtils.getIdToken();
        let cpnSucc = false;
        xhr.onload = function() {
          if (xhr.status === 200 || xhr.status === 201) {
            const response = JSON.parse(xhr.responseText);
            // console.log(response);
            if (response.statusCode === '0000') {
              cpnSucc = true;
            } else {
              const ordsCpnPayValidDto = response.data;
              that.$gsdialog.alert(OrderMsg.cpnFail(ordsCpnPayValidDto), {html: true});
              cpnSucc = false;
            }
          } else {
            that.$gsdialog.alert(OrderMsg.allFail, {html: true});
            cpnSucc = false;
          }
        };
        xhr.open('POST', ApiUtils.getUrl('/fo/od/ordsmgnt/ords-cpn-pay-valid') + '?ENC_VAL=' + encVal, false);
        // xhr.setRequestHeader('Authorization', 'Bearer ' + idToken); async function에 선언시 팬딩으로 빠짐
        xhr.setRequestHeader('Content-Type', 'application/json'); // 컨텐츠타입을 json으로
        xhr.send(JSON.stringify(param)); // 데이터를 stringify해서 보냄
        return cpnSucc;
      } else {
        return succ;
      }
    },
    orderPaymentCallBack(type, isFail, rsForm) {
      if ( type != '' ) {
        this.popupAction(type);
      }
      console.log("rsForm orderSheet: ", rsForm);
      console.log("isFail orderSheet: ", isFail);

      try {
        if (isFail === true && type === 'payCardIspKBFlag' && rsForm.resultCode === '9997') {
          this.orderSheetForm.mobilCertReqTypeCd = 'ISP';
          this.payCardIspFlag = true;
          console.log('ISP 열어라');
          return;
        } else if (isFail === true) {
          if (rsForm.resultMsg !== null && rsForm.resultMsg !== '') {
            this.$gsdialog.alert(OrderMsg.authDtlFail + rsForm.resultMsg, {html: true});
          } else {
            this.$gsdialog.alert(OrderMsg.authFail, {html: true});
          }
          return;
        }

        this.$emit('orderProcess', this.orderSheetForm, rsForm);
        this.resetPayStatus(false);
      } finally {
      }
    },
    orderAgreeChk(agreeChk, liqAgreeChk, pkupChk) {
      this.agreeChk = agreeChk;
      this.liqAgreeChk = liqAgreeChk;
      this.pkupChk = pkupChk;
    },
    moveElement(el) {
      const $el = document.querySelector( '#' + el );
      if ($el != null) {
        $el.scrollIntoView(true);
        window.scrollBy(0, 0); // 상단 탭까지 이동
      }
    },
    defaultFreeGift(freeGift) {
      this.$emit('defaultFreeGift', freeGift);
    },
    setFreeGift(promPresFrgf, crud) {
      this.$emit('setFreeGift', promPresFrgf, crud);
    },
    deviceTypeChk() {
      let deviceType = 'PC';
      if (this.isMobile()) {
        deviceType = 'MO';
      } else {
        deviceType = 'PC';
      }
      this.deviceType = deviceType;
      return deviceType;
    },
    setCrcoChargDcInfo(crcoChargDcInfoList) {
      this.$emit('setCrcoChargDcInfo', crcoChargDcInfoList);
    },
    setDisAmt(gsNPointDcAmt, popRwdDcAmt, resPntForm, crcoEvntInfo, totalDcAmt) {
      this.$refs.freeGift.setDisAmt(gsNPointDcAmt, popRwdDcAmt, resPntForm, crcoEvntInfo, totalDcAmt);
    },
    // 카드 즉시 할인 정보를 변경 처리 함수
    setCardDisEvent(cardDiscountProm) {
      this.$emit('setCardDisEvent', cardDiscountProm);
    },
  },
  created() {
  },
  mounted() {
    this.deviceTypeChk();
    if (this.payCallType === undefined || this.payCallType === null) {
      this.payCallType = [];
      this.gsNPoint = 0;
    }
    this.retrievelistOrdsDlvp();
  },
  computed: {
  },
  destroyed() {
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
  }
};
</script>
<style lang="scss">
</style>
