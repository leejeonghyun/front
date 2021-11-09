<!--
views/od/SC-FO-PA-GS-MS-012.
-->
<template>
  <div :class="[{'gift-wrap' : true}, siteClass]"><!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <SubDefaultHeader headerText="선물결제하기" :tabbar="false" />
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="order-wrap">
        <!-- START : 상품 리스트 -->
        <div class="accordion-order-top">
          <div class="tit-accordion">
            <button type="button" id="orderTopAccordion" class="tit" aria-controls="orderAccordionContent" aria-expanded="false" @click="accordionEvent">
              <div class="tit-type1">
                <span class="img-thumb">
                  <figure>
                      <img :src="getItemImg(ordsItemList.repItemImg)" :alt="ordsItemList.repItemNm" @error="replaceByDefault" v-if="isNotEmpty(ordsItemList.repItemImg)"/>
                      <!-- 썸네일 없을 경우 -->
                      <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="ordsItemList.repItemNm" v-else />
                    </figure>
                </span>
                <span class="product-name">{{ordsItemList.repItemNm}}<span v-if="ordsItemList.otherItemCnt > 0"> 외 <strong class="point">{{ordsItemList.otherItemCnt}}건</strong></span></span>
              </div>
              <div class="tit-type2">
                <h2>주문 상품 정보</h2>
              </div>
            </button>
          </div>
          <div id="orderAccordionContent" class="accordion-content" aria-labelledby="orderTopAccordion" hidden="hidden">
            <OrderSheetProductList @popupEvent="popupAction" :ordsItemList="ordsItemList" />
            <p class="btn-close-wrap"><button type="button" class="btn-list-close" aria-controls="orderAccordionContent" @click="accordionCloseEvent">접기</button></p>
          </div>
        </div>
        <!-- END : 상품 리스트 -->
        <div>
          <!-- START : 배송 -->
          <div id="tab-contents1" class="tabcontents" aria-labelledby="tab1" v-if="this.tab.delivery">
            <!-- 최종 결제금액 스티키 -->
            <div class="position-fixed-total-price" @click="orderPaymentProc">
               최종 결제금액 <span class="price"><strong>{{toComma(totPayAmt)}}</strong>원</span>
            </div>
            <!-- // 최종 결제금액 스티키 -->
            <!-- START : 주문자 -->
            <GiftSendInfo :mbrDlvp="mbrDlvp" :telCoNoList="telCoNoList" readType="N" :value="giftSendInfo" v-if="giftSendInfo"/>
            <!-- END : 주문자 -->
            <!-- START : 받는분 -->
            <GiftReceiveInfo :telCoNoList="telCoNoList" :giftMsgInfo="giftMsgInfo" readType="N"/>
            <!-- END : 받는분 -->
            <!-- START : 선물 메시지 -->
            <GiftMessageCard :giftMsgInfo="giftMsgInfo" />
            <!-- END : 선물 메시지 -->
            <!-- START : 할인정보 -->
            <DiscountInfo ref="discount" @popupEvent="popupAction" @orderSheetDcAmtEvent="orderSheetDcAmtEvent" @bsktCpnChangeEvent="bsktCpnChangeEvent" v-if="ordsInfo !== null" :ordsInfo="ordsInfo" :totAmt="totPrdAmt+totDelivFee" :mbrGrd="mbrGrd" :ordsItemList="ordsItemList" :payInfo="payInfo" /> <!-- 수정 START : 2020.02.10 버튼 텍스트 변경 --> <!-- 수정 : 2020.02.13 카드즉시할인 수정 -->
            <OrderTotalPrice ref="totPrice" :totalDcAmt="totalDcAmt" :mbrGrd="mbrGrd" @totPayAmtEvent="totPayAmtEvent" v-if="ordsItemList !== null" :ordsItemList="ordsItemList" :crcoChargDcInfoList="crcoChargDcInfoList"/>
            <!-- END : 할인정보 -->
            <!-- START : 결재통합 -->
            <PaySheet ref="paySheet" :ordId="ordId" :totAmt="totPayAmt" :payCallType="payCallType" :crcoEvntInfo="crcoEvntInfo" :tab="tab" @__validation="__validation" @orderProcess="orderProcess" @CashReceiptIssueEvent="CashReceiptIssueEvent" @setPayInfo="setPayInfo" @setCrcoChargDcInfo="setCrcoChargDcInfo" @setCrcoInfoInfo="setCrcoInfoInfo" @procOrderAgree="procOrderAgree"/>
            <!-- END : 결재통합 -->
          </div>
          <!-- END : 배송 -->
        </div>
        <PopupDeliveryList @popupEvent="popupAction" v-if="this.popup.popupDeliveryList" :ordsDlvpInfo="ordsDlvpInfo" :ordsItemList="ordsItemList" @checkMbrDlvpInfoEvent="checkMbrDlvpInfoEvent" /> <!-- 팝업 - 배송지 목록 -->
        <PopupOrderDiscountInfo @popupEvent="popupAction" v-if="this.popup.popupOrderDiscountInfo" :ordsItemDcSate="ordsItemDcSate" /> <!-- 팝업 - 할인 내역 -->
        <PopupOrderCouponChange @popupEvent="popupAction" @productCouponChangeEvent="productCouponChangeEvent" v-if="this.popup.popupOrderCouponList" :ordsItemInfo="ordsItemInfo" :ordsItemList="ordsItemList"/> <!-- 팝업 - 쿠폰변경 -->
      </div>
    </main>
    <Footer />
    <Loading v-show="loading"  />
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import OrderSheetProductList from '@/components/order/OrderSheetProductList'; // 상품리스트
import DiscountInfo from '@/components/order/DiscountInfo'; // 할인정보
import OrderTotalPrice from '@/components/order/OrderTotalPrice'; // 총금액
import PopupDeliveryList from '@/views/od/PopupDlvpList.vue'; // 팝업 - 배송지 목록
// import PopupDeliveryList from '@/views/od/PopupDlvpDiffAreaList.vue'; // 팝업 - 배송지변경 다른권역 안내
import PopupOrderCouponChange from '@/views/od/PopupOrderCouponChange'; // 팝업 - 쿠폰변경
import PopupOrderDiscountInfo from '@/views/od/PopupOrderDiscountInfo'; // 팝업 - 할인 내역(주문서용)
import PopupAgreeDetail from '@/views/od/PopupTdptOferAgrInfo'; // 팝업 - 개인정보 제3자 제공동의
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import PaySheet from '@/views/od/PaySheet.vue';
import ImgUtils from '@/common/ImgUtils';
import GiftSendInfo from '@/components/cart/GiftSendInfo'; // 주문자
import GiftReceiveInfo from '@/components/cart/GiftReceiveInfo'; // 받는분
import GiftMessageCard from '@/components/cart/GiftMessageCard'; // 메세지 보내기
import LoginUtils from '@/common/LoginUtils';
import CookieUtils from '@/common/CookieUtils';
import Loading from "@/components/common/Loading";
import CommonOrder from '@/common/od/CommonOrder'; // 주문공통
export default {
  props: {
    ordId: String,
  },
  name: "OrderDefault",
  data() {
    return {
      loading: false,
      tab: {
       delivery: true, // 배송
       pickup: false, // 픽업
      },
      popup: { // 팝업
        open: false,
        popupMenuShow: false, // 픽업 선택 버튼
        popupDeliveryList: false, // 배송지 목록
        popupOrderDiscountInfo: false, // 할인정보
        popupOrderCouponList: false, // 쿠폰변경
      },
      ordsInfo: {
        ordId: null, // 주문ID
        ordsStandDttm: null, // 주문서기준일시
        multDlvpYn: 'N', // 다중배송지여부
        ofsItemProcSpCd: 'D', // 결품처리구분코드
        ordRecptIssuYn: 'N', // 주문영수증발행여부
        upasVal: 'M', // 개인통관고유부호값
      }, // 주문서정보
      mbrDlvp: {}, // 주문자정보
      ordsDlvpInfo: {}, // 배송지정보
      ordsDlvpSeqno: 0, // 주문서배송지일련번호
      pickupFlag: true,
      rlfNoRqtYn: 'N', // 안심번호 신청여부
      defaultFreeGiftList: [], // 기본사은품 목록
      freeGift: [], // 사은품 목록
      pickupCenterFlag: false,
      strInfo: null, // 픽업매장정보
      ordsItemList: {}, // 주문서상품목록
      productItems: [], // 상품 아이템 목록
      ordsItemDcSate: {}, // 할인내역
      ordsItemInfo: {}, // 상품쿠폰대상상품
      resvDelivInfor: null, // 예약배송안내
      todayDelivInfor: null, // 당일배송안내
      todayDelivChk: {
        useYn: 'N', // 사용여부
        chkValue: '', // chk 값
      }, // 당일배송시간체크여부
      dawnDelivInfor: null, // 새벽배송안내
      dawnDelivChk: {
        useYn: 'N', // 사용여부
        chkValue: '', // chk 값
      }, // 새벽배송시간체크여부
      dlvDelivInfor: null, // 택배배송안내
      dlvDelivChk: {
        useYn: 'N', // 사용여부
        chkValue: '', // chk 값
      }, // 택배배송시간체크여부
      abrdDelivInfor: null, // 해외배송안내
      payNoticeList: [],
      delivRequest: null, // 배송요청사항(상품수령위치, 결품발생시처리방법,영수증수령방법)
      totalDcAmt: 0, // 총 할인금액
      crcoEvntInfo: null, // 선택된 카드할인정보
      resPntForm: null, // 선택된 통신사할인정보
      gsNPointDcAmt: 0, // 사용하는 gsNpoint 정보
      popRwdDcAmt: 0,
      totPrdAmt: 0, // 주문금액
      totDelivFee: 0,
      totPayAmt: 0, // 최종 결제금액
      pntUseAmt: 0, // 포인트사용가능상품금액
      paymentDate: null,
      orderSheetForm: null, // 결제정보 처리
      cashRcpctInfo: {
        cashRecptIssuYn: 'N', // 현금영수증발행여부
        cashRecptIssuTypeCd: '1', // 현금영수증발행유형코드 소득공제1/지출증빙2
        cashRecptInputNo: '', // 현금영수증입력번호
      }, // 현금영수증 발행여부
      mbrGrd: false, // 회원등급
      ordsDelivGrpInfo: null, // 배송지, 배송정보
      payCardIspKBFlag: false,
      validationChk: true, // 결재전 상위컴포넌트 validation값
      payCallType: [], // 결제방식 세팅시 필요 안넘기면 전체 나옴
      giftMsgInfo: null, // 선물메세지 정보
      telCoNoList: null, // 통신사공통코드 조회
      loginYn: LoginUtils.isLogin(),
      ordTypeCd: '20', // 일반10 선물하기20
      payInfo: null, // 결제정보
      crcoChargDcInfoList: null,
      siteClass: CookieUtils.getSiteClass(),
      orderAgreeInfo: {},
      trackItemList: [], // 트래커에 전달하기 위한 상품 정보
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물하기 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '선물하기/결제^선물하기/결제',
      },
    ],
  },
  mixins: [AccordionMixin, LayerPopupMixin, CommonOrder],
  components: {
    SubDefaultHeader,
    Footer,
    OrderSheetProductList, // 상품목록
    DiscountInfo, // 할인정보
    OrderTotalPrice, // 총금액
    PopupDeliveryList, // 팝업 - 배송지 목록
    PopupOrderCouponChange, // 팝업 - 쿠폰변경
    PopupOrderDiscountInfo, // 팝업 - 할인 내역
    PaySheet,
    GiftSendInfo,
    GiftReceiveInfo, // 받는분
    GiftMessageCard, // 메세지 보내기
    Loading, // loading
  },
  watch: {
  },
  methods: {
    async chkSafeNumber(event) {
      const chk = event.target.checked;
      if (chk) {
        this.rlfNoRqtYn = 'Y';
      } else {
        this.rlfNoRqtYn = 'N';
      }
      const rq = {
        ordId: this.ordId,
        rlfNoRqtYn: this.rlfNoRqtYn,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
      };
      const rs = await ApiUtils.post('/fo/od/ordsmgnt/safeNum-request-proc', rq);
      if (rs != null) {
        if (rs.data.success !== true) {
          event.target.checked = !chk;
          this.rlfNoRqtYn = chk == true ? 'N' : 'Y';
        }
      }
    },
    // 주문선물 조회(수취자정보, 결제자정보, 선물메세지)
    async giftOrderInfo() {
      const params = {
        ordId: this.ordId,
      };
      const resultGiftInfo = await ApiUtils.get('/fo/od/giftMgnt/gift_order_ps_info', params);
      this.giftMsgInfo = resultGiftInfo.data.data;

      // 휴대전화번호 공통코드 조회
      const param = {
        commGrpCd: 'CU0005',
      };
      const result = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', param);
      this.telCoNoList = result.data.data;
    },
    popupShowmenuAction() {
      this.popup.popupMenuShow = !this.popup.popupMenuShow;
    },
    focusOutAction() {
      this.popup.popupMenuShow = false;
    },
    // 상세목록 닫기버튼
    accordionCloseEvent() {
      const $target = event.currentTarget;
      const controls = $target.getAttribute('aria-controls');
      const $accButton = document.querySelector('#orderTopAccordion');
      document.getElementById(controls).setAttribute('hidden', true);
      $target.setAttribute('aria-expanded', false);
      $accButton.setAttribute('aria-expanded', false);
      $accButton.focus();
    },
    // 주문서상품목록조회
    async retrievelistOrdsItem() {
      this.trackItemList = [];
      const iOrdsItemListInq = {
        ordId: this.ordId,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/product-list', iOrdsItemListInq);
      this.ordsItemList = response.data.data;
      console.log("this.ordsItemList : ", this.ordsItemList);

      // 상품 리스트 가공 하위여러 컴포넌트에서 사용
      if (this.ordsItemList != null) {
        const productItems = [];
        const trackItem = [];
        const ordsDelivGrpInfoList = this.ordsItemList.ordsDelivGrpInfoList;
        for (let j = 0; j < ordsDelivGrpInfoList.length; j++) {
          const ordsDelivSupplGrpInfoList = ordsDelivGrpInfoList[j].ordsDelivSupplGrpInfoList;
          for (let k = 0; k < ordsDelivSupplGrpInfoList.length; k++) {
            const ordsItemInfoList = ordsDelivSupplGrpInfoList[k].ordsItemInfoList;
            trackItem.push(ordsItemInfoList);
            for (let l = 0; l < ordsItemInfoList.length; l++) {
              const productInfo = {};
              productInfo.categoryType = "";
              productInfo.categoryId = ordsItemInfoList[l].itemClasfCtgId;
              productInfo.uid = ordsItemInfoList[l].itemId;
              productInfo.name = ordsItemInfoList[l].itemNm;
              productInfo.count = ordsItemInfoList[l].itemOrdQty;
              productInfo.liqItemYn = ordsItemInfoList[l].liqItemYn;
              // console.log(ordsItemInfoList[l]);
              productItems.push(productInfo);
            }
          }
        }
        this.trackItemList = trackItem;
        this.productItems = productItems;
      }
    },
    // 주문서정보조회
    async retrieveOrdsInfo() {
      const iOrdsInfoInq = {
        ordId: this.ordId,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/ordersheet', iOrdsInfoInq);
      const ordsInfo = response.data.data;
      // console.log("ordsInfo : ", ordsInfo);
      if (ordsInfo !== null && ordsInfo.ordId !== null) {
        this.ordsInfo = ordsInfo;
        // 회원 주문유효성 체크 주문완료 체크
        if (this.ordsInfo.ordValidYn === false || this.ordsInfo.ordCompleteYn === 'Y') {
          this.$gsdialog.alert(OrderMsg.ordValidChk);
          this.$router.push({name: 'theBasket'});
        }
        this.retrievelistOrdsDlvp(); // 주문서배송지목록조회
      }
    },
    // 주문서배송지목록조회
    async retrievelistOrdsDlvp() {
      const iOrdsDlvpListInq = {
        ordId: this.ordId,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/delivery-place-list', iOrdsDlvpListInq);
      const ordsDlvpInfoList = response.data.data.ordsDlvpInfoList;
      if (ordsDlvpInfoList.length > 0) {
        this.ordsDlvpInfo = ordsDlvpInfoList[0];
      }
      this.ordsDlvpSeqno = this.ordsDlvpInfo.ordsDlvpSeqno;
      this.retrievelistOrdsItem(); // 주문상품 조회
      // 예약배송
      if ('Y' === this.ordsDlvpInfo.resvDelivYn) {
        this.resvDelivInfor = {
          ordId: this.ordId,
          ordsDlvpSeqno: this.ordsDlvpSeqno,
        };
      }
      // 당일배송
      if ('Y' === this.ordsDlvpInfo.todayDelivYn) {
        this.todayDelivInfor = {
          ordId: this.ordId,
          ordsDlvpSeqno: this.ordsDlvpSeqno,
        };
      }
      // 새벽배송
      if ('Y' === this.ordsDlvpInfo.dawnDelivYn) {
        this.dawnDelivInfor = {
          ordId: this.ordId,
          ordsDlvpSeqno: this.ordsDlvpSeqno,
        };
      }
      // 택배배송
      if ('Y' === this.ordsDlvpInfo.owncoDlvDelivYn || 'Y' === this.ordsDlvpInfo.firmDlvDelivYn) {
        this.dlvDelivInfor = {
          ordId: this.ordId,
          ordsDlvpSeqno: this.ordsDlvpSeqno,
          firmDlvDelivYn: this.ordsDlvpInfo.firmDlvDelivYn,
          owncoDlvDelivYn: this.ordsDlvpInfo.owncoDlvDelivYn,
        };
      }
      // 해외배송
      // if ('Y' === this.ordsDlvpInfo.abrdDelivYn) {
        this.abrdDelivInfor = {
          ordId: this.ordId,
          ordsDlvpSeqno: this.ordsDlvpSeqno,
          upasVal: this.ordsInfo.upasVal,
        };
      // }
      // 배송요청사항 처리용
      this.ordsDelivGrpInfo = {
        ordId: this.ordId,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
      };
    },
    // 상품쿠폰이 변경된경우
    productCouponChangeEvent: function() {
      this.retrievelistOrdsItem();
    },
    // 장바구니/배송비 쿠폰이 변경된 경우
    bsktCpnChangeEvent: function() {
      this.retrievelistOrdsItem();
    },
    // 배송요청사항 변경 이벤트
    delivReqEvent: function(delivRequest) {
      this.delivRequest = delivRequest;
    },
    async __validation() {
      // 현금영수증체크
      if (this.cashRcpctInfo != null && this.cashRcpctInfo.cashRecptIssuYn === 'Y') {
        const cashRecptInputNo = this.cashRcpctInfo.cashRecptInputNo;
        const cnt = this.cashRcpctInfo.cashRecptIssuTypeCd === '1' ? 11 : 10;
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
      // 사은품선택체크
      if (this.defaultFreeGiftList.length > 0) {
        let amt = 0;
        let mallAmt = 0;
        let todayAmt = 0;
        let parcelAmt = 0;
        let dawnAmt = 0;
        if (this.ordsItemList) {
          const ordsDelivGrpInfoList = this.ordsItemList.ordsDelivGrpInfoList;
          if (ordsDelivGrpInfoList && ordsDelivGrpInfoList.length > 0) {
            for (let i = 0; i < ordsDelivGrpInfoList.length; i++) {
              const ordsDelivSupplGrpInfoList = ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList;
              if (ordsDelivSupplGrpInfoList && ordsDelivSupplGrpInfoList.length > 0) {
                for (let j = 0; j < ordsDelivSupplGrpInfoList.length; j++) {
                  if (ordsDelivSupplGrpInfoList[j].delivTypeCd === '01') {
                    todayAmt += ordsDelivSupplGrpInfoList[j].delivOrdSchedAmt;
                  } else if (ordsDelivSupplGrpInfoList[j].delivTypeCd === '02' || ordsDelivSupplGrpInfoList[j].delivTypeCd === '03') {
                    parcelAmt += ordsDelivSupplGrpInfoList[j].delivOrdSchedAmt;
                  } else if (ordsDelivSupplGrpInfoList[j].delivTypeCd === '04') {
                    dawnAmt += ordsDelivSupplGrpInfoList[j].delivOrdSchedAmt;
                  }
                }
              }
            }
          }
        }
        mallAmt = this.totPayAmt;
        let chkCnt = 0;
        for (let idx=0; idx<this.defaultFreeGiftList.length; idx++) {
          const freeGiftList = this.defaultFreeGiftList[idx];
          if (freeGiftList.type === 'today') {
            amt = todayAmt;
          } else if (freeGiftList.type === 'parcel') {
            amt = parcelAmt;
          } else if (freeGiftList.type === 'dawn') {
            amt = dawnAmt;
          } else if (freeGiftList.type === 'mall') {
            amt = mallAmt;
          }
          if (freeGiftList.length > 0) {
            for (let jdx = 0; jdx < freeGiftList.length; jdx++) {
              const gift = freeGiftList[jdx];
              if (gift.presPrvdTypeCd === '01') { // 전체지급 시
                if (gift.promBeneZoneList) {
                  for (let i = 0; i < gift.promBeneZoneList.length; i++) {
                    if (gift.promBeneZoneList[i].beneApplRangeCd === '01') {
                      chkCnt += Number(gift.promBeneZoneList[i].promPresFrgfList.length);
                    } else if (gift.promBeneZoneList[i].beneApplRangeCd === '02') {
                      if (amt >= Number(gift.promBeneZoneList[i].beneZoneBeginVal) && (amt <= Number(gift.promBeneZoneList[i].beneZoneEndVal) || Number(gift.promBeneZoneList[i].beneZoneEndVal) === 0)) {
                        chkCnt += Number(gift.promBeneZoneList[i].promPresFrgfList.length);
                      }
                    }
                  }
                }
              } else if (gift.presPrvdTypeCd === '02') { // 선착순
                if (gift.promBeneZoneList) {
                  for (let i = 0; i < gift.promBeneZoneList.length; i++) {
                    if (gift.promBeneZoneList[i].promPresFrgfList) {
                      for (let j = 0; j < gift.promBeneZoneList[i].promPresFrgfList.length; j++) {
                        if (gift.promBeneZoneList[i].promPresFrgfList[j]) {
                          if (gift.promBeneZoneList[i].promPresFrgfList[j].applYn === 'Y') {
                              chkCnt += 1;
                              break;
                          }
                        }
                      }
                    }
                  }
                }
              } else if (gift.presPrvdTypeCd === '03' && gift.presPrvdOptPosbQty > 0) { // 선택형
                let tmpCnt = 0;
                let cnt = Number(gift.presPrvdOptPosbQty);
                if (gift.promBeneZoneList) {
                  for (let i = 0; i < gift.promBeneZoneList.length; i++) {
                    if (gift.promBeneZoneList[i].beneApplRangeCd === '01') {
                      tmpCnt = Number(gift.promBeneZoneList[i].promPresFrgfList.length);
                    } else if (gift.promBeneZoneList[i].beneApplRangeCd === '02') {
                      if (amt >= Number(gift.promBeneZoneList[i].beneZoneBeginVal) && (amt <= Number(gift.promBeneZoneList[i].beneZoneEndVal) || Number(gift.promBeneZoneList[i].beneZoneEndVal) === 0)) {
                        tmpCnt = Number(gift.promBeneZoneList[i].promPresFrgfList.length);
                      }
                    }
                  }
                }
                if (cnt > tmpCnt) {
                  cnt = tmpCnt;
                }
                chkCnt += cnt;
              }
            }
          }
        }
        if (chkCnt <= this.freeGift.length) {
          this.validationChk = false;
          this.moveElement('freeGift_divZone');
          return this.$gsdialog.alert(OrderMsg.freeGiftCnt);
        } else if (this.defaultFreeGiftList.length > this.freeGift.length) {
          this.validationChk = false;
          this.moveElement('freeGift_divZone');
          return this.$gsdialog.alert(OrderMsg.freeGiftChk);
        } else {
          this.validationChk = true;
        }
      }
    },
    setCrcoChargDcInfo(crcoChargDcInfoList) {
      this.crcoChargDcInfoList = crcoChargDcInfoList;
    },
    setCrcoInfoInfo(crcoInfoInfo) {
      this.$refs.totPrice.crcoChargDc(crcoInfoInfo);
    },
    procOrderAgree() {
      this.orderAgreeInfo = {};
      const cmmSteAgrmCdList = [];
      cmmSteAgrmCdList.push('OP'); // 주문상품 및 결제대행 이용약관 동의
      cmmSteAgrmCdList.push('TP'); // 개인정보 제3자 제공동의
      cmmSteAgrmCdList.push('PP'); // 개인정보 수집 및 이용 동의
      for (let i=0; i < this.productItems.length; i++) {
        if (this.productItems[i].liqItemYn == 'Y') {
          // params.liqItemYn = 'Y';
          cmmSteAgrmCdList.push('AB'); // 주류 구매에 따른 개인정보 제공 동의
          break;
        }
      }
      this.orderAgreeInfo.ordId = this.ordId;
      this.orderAgreeInfo.cmmSteAgrmCdList = cmmSteAgrmCdList;
      this.orderAgreeInfo.agrmAgrYn = 'Y';
    },
  },
  created() {
  },
  async mounted() {
    if (this.loginYn === true) {
      this.getMemInfo(); // 회원등급조회
      this.retrieveOrdsInfo(); // 주문서정보조회
      const result2 = await ApiUtils.get('/fo/od/bsktmgnt/base-delivery-area');
      this.mbrDlvp = result2.data.data;
      const $this = this;
      window.addEventListener('scroll', this.stickyPrice); // function call 방식 변경 유현석 20200529
      // this.popupPaymentNoticeAction(); // 결제공지사항 팝업 오픈
      this.giftOrderInfo();
    } else {
      this.$gsdialog.alert(OrderMsg.loginFail);
      this.$router.push({name: 'theBasket'});
    }
  },
  computed: {
      giftSendInfo() {
          return {
              name: this.giftMsgInfo && this.giftMsgInfo.giftTdrCmmMbrNm,
              mobileNo: this.giftMsgInfo && this.giftMsgInfo.giftTdrMbrTelNo || '',
          };
      },
      telNoPrt: function() {
      if (this.ordsDlvpInfo.adrsMoblTelNo != '' && this.ordsDlvpInfo.adrsMoblTelNo != undefined) {
        return (this.ordsDlvpInfo.adrsMoblTelNo).substring(0, 3) + ' - ' + (this.ordsDlvpInfo.adrsMoblTelNo).substring(3, 7) + ' - ' + (this.ordsDlvpInfo.adrsMoblTelNo).substring(7);
      } else {
        return '';
      }
    },
  },
};
</script>
<style lang="scss">
</style>
