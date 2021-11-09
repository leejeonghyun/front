<template>
  <div :class="[{'wrap-order' : true}, siteClass]"><!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <SubDefaultHeader headerText="주문결제" :tabbar="false" />
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="order-wrap">
        <!-- START : 배송지 -->
        <div class="accordion-multi" v-for="(ordsDlvpInfo, index) in ordsDlvpInfos" v-bind:key="index">
            <div class="tit-accordion">
              <button type="button" :id="`${'deliveryAccordion'+ index}`" class="tit" :aria-controls="`${'deliveryAccordionContent' + index}`" aria-expanded="false" @click="accordionEvent">
                <span class="point">배송지{{index + 1}}. </span>{{ordsDlvpInfo.adrsNm}} [{{ordsDlvpInfo.dlvpNm}}]
              </button>
            </div>
            <div :id="`${'deliveryAccordionContent'+ index}`" class="accordion-content" :aria-labelledby="`${'deliveryAccordion'+ index}`" hidden="hidden">
              <!-- START : 배송지 -->
              <div class="section-area pd-top">
                <div class="sub-inner-box">
                  <div class="receive-delivery-info">
                    <div class="my-address">
                      <p>{{ordsDlvpInfo.adrsNm}} [{{ordsDlvpInfo.dlvpNm}}]</p>
                      <p><span class="code">{{ordsDlvpInfo.adrsZipcd}}</span> {{ordsDlvpInfo.adrsStnmBaseAddr}} {{ordsDlvpInfo.adrsStnmDtlAddr}}</p>
                      <p>{{telNoPrt(ordsDlvpInfo.adrsMoblTelNo)}}</p>
                    </div>
                    <p class="select-safe2">
                      <!--
                      <span class="inp-chk small">
                        <input type="checkbox" name="" :id="`${'safe-number'+ ordsDlvpInfo.ordsDlvpSeqno}`" value="" v-on:click="chkSafeNumber($event, ordsDlvpInfo.ordsDlvpSeqno)" :checked="ordsDlvpInfo.rlfNoRqtYn === 'Y'">
                        <label :for="`${'safe-number'+ ordsDlvpInfo.ordsDlvpSeqno}`">안심번호 신청</label>
                      </span>
                      -->
                      <span v-if="ordsDlvpInfo.abrdDelivYn != 'Y'">※ 주문 시 자동으로 안심번호처리가 됩니다.</span>
                    </p>
                  </div>
                </div>
              </div>
              <!-- END : 배송지 -->
              <div class="accordion-order-top" v-if="ordsItemList[index] !== undefined">
                <div class="tit-accordion">
                  <button type="button" :id="`${'orderTopAccordion'+ index}`" class="tit" :aria-controls="`${'orderAccordionContent'+ index}`" aria-expanded="false" @click="accordionEvent">
                    <div class="tit-type1">
                      <span class="img-thumb">
                        <figure>
                            <img :src="getItemImg(ordsItemList[index].repItemImg)" :alt="ordsItemList[index].repItemNm" @error="replaceByDefault" v-if="isNotEmpty(ordsItemList[index].repItemImg)"/>
                            <!-- 썸네일 없을 경우 -->
                            <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="ordsItemList[index].repItemNm" v-else />
                          </figure>
                      </span>
                      <span class="product-name">{{ordsItemList[index].repItemNm}}<span v-if="ordsItemList[index].otherItemCnt > 0"> 외 <strong class="point">{{ordsItemList[index].otherItemCnt}}건</strong></span></span>
                    </div>
                    <div class="tit-type2">
                      <h2>주문 상품 정보</h2>
                    </div>
                  </button>
                </div>
              </div>
              <!-- START : 상품 리스트 -->
              <div :id="`${'orderAccordionContent'+ index}`" class="accordion-content" :aria-labelledby="`${'orderTopAccordion'+ index}`" hidden="hidden">
                <OrderSheetProductList v-if="ordsItemList.length > 0" @popupEvent="popupAction" :ordsItemList="ordsItemList[index]" />
                <p class="btn-close-wrap"><button type="button" class="btn-list-close" :aria-controls="`${'orderAccordionContent'+ index}`" @click="accordionCloseEvent(index)">접기</button></p>
              </div>
              <!-- END : 상품 리스트 -->
              <!-- START : 예약배송 -->
              <DeliveryReserve v-if="resvDelivInfors[index] !== undefined" :resvDelivInfor="resvDelivInfors[index]" isTitle="hide"/>
              <!-- END : 예약배송 -->
              <!-- START : 배송 요청사항 -->
              <DeliveryRequest ref='deliveryRequest' v-if="ordsDelivGrpInfos.length > 0 && delivRequests.length > 0" :ordsDelivGrpInfo="ordsDelivGrpInfos[index]" :ordsDlvpInfo="ordsDlvpInfos[index]" :bundlDelivOrdId="''" :ordsItemList="ordsItemList[index]" multiYn="Y" @delivReqEvent="delivReqEvent" />
              <button type="button" class="btn-border btn-select-all" @click="setAllDelivertInfo(index)">예약배송요청사항 모두 동일적용하기</button>
              <!-- END : 배송 요청사항 -->
            </div>
        </div>
        <div>
          <!-- START : 배송 -->
          <div id="tab-contents1" class="tabcontents" aria-labelledby="tab1" v-if="this.tab.delivery">
            <!-- 최종 결제금액 스티키 -->
            <div class="position-fixed-total-price">
               최종 결제금액 <span class="price"><strong>{{toComma(totPayAmt)}}</strong>원</span>
            </div>
            <!-- // 최종 결제금액 스티키 -->
            <!-- START : 할인정보 -->
            <DiscountInfo ref="discount" @popupEvent="popupAction" @orderSheetDcAmtEvent="orderSheetDcAmtEvent" v-if="ordsItemList.length > 0" :ordsInfo="ordsInfo" :totAmt="totPrdAmt" :mbrGrd="mbrGrd" :ordsItemListMulti="ordsItemList" :payInfo="payInfo"/> <!-- 수정 START : 2020.02.10 버튼 텍스트 변경 --> <!-- 수정 : 2020.02.13 카드즉시할인 수정 -->
            <MultiOrderTotalPrice ref="totPrice" v-if="ordsItemList.length > 0" :totalDcAmt="totalDcAmt" :gsNPointDcAmt="gsNPointDcAmt" :popRwdDcAmt="popRwdDcAmt" :mbrGrd="mbrGrd" @totPayAmtEvent="totPayAmtEvent" :ordsItemList="ordsItemList" :crcoChargDcInfoList="crcoChargDcInfoList" />
            <!-- END : 할인정보 -->
            <!-- START : 결재통합 -->
            <PaySheet ref="paySheet" :ordId="ordId" :totAmt="totPayAmt" :payCallType="payCallType" :strInfo="strInfo" :crcoEvntInfo="crcoEvntInfo" :tab="tab" @__validation="__validation" @orderProcess="orderProcess" @CashReceiptIssueEvent="CashReceiptIssueEvent" @defaultFreeGift="defaultFreeGift" @setFreeGift="setFreeGift" @setPayInfo="setPayInfo" @setCrcoChargDcInfo="setCrcoChargDcInfo" @setCrcoInfoInfo="setCrcoInfoInfo" @procOrderAgree="procOrderAgree"/>
            <!-- END : 결재통합 -->
          </div>
          <!-- END : 배송 -->
        </div>
        <PopupDeliveryList @popupEvent="popupAction" v-if="this.popup.popupDeliveryList" :ordsDlvpInfo="null" @checkMbrDlvpInfoEvent="checkMbrDlvpInfoEvent" /> <!-- 팝업 - 배송지 목록 -->
        <PopupOrderDiscountInfo @popupEvent="popupAction" v-if="this.popup.popupOrderDiscountInfo" :ordsItemDcSate="ordsItemDcSate" /> <!-- 팝업 - 할인 내역 -->
        <PopupOrderCouponChange @popupEvent="popupAction" @productCouponChangeEvent="productCouponChangeEvent" v-if="this.popup.popupOrderCouponList" :ordsItemInfo="ordsItemInfo" /> <!-- 팝업 - 쿠폰변경 -->
      </div>
    </main>
    <Footer />
    <Loading v-show="loading" />
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import OrderSheetProductList from '@/components/order/OrderSheetProductList'; // 상품리스트
// import DeliveryTime from '@/components/order/DeliveryTime'; // 배송예약 시간
import DeliveryReserve from '@/components/order/DeliveryReserve'; // 예약배송
// import DeliveryToday from '@/components/order/DeliveryToday'; // 당일배송(확인필요)
// import DeliveryDawn from '@/components/order/DeliveryDawn'; // 새벽배송(확인필요)
// import DeliveryParcel from '@/components/order/DeliveryParcel'; // 택배배송(확인필요)
// import DeliveryOverseas from '@/components/order/DeliveryOverseas'; // 해외배송
import DeliveryRequest from '@/components/order/DeliveryRequest'; // 배송 요청사항
import DiscountInfo from '@/components/order/DiscountInfo'; // 할인정보
import MultiOrderTotalPrice from '@/components/order/MultiOrderTotalPrice'; // 총금액
import PopupDeliveryList from '@/views/od/PopupDlvpList.vue'; // 팝업 - 배송지 목록
import PopupOrderCouponChange from '@/views/od/PopupOrderCouponChange'; // 팝업 - 쿠폰변경
import PopupOrderDiscountInfo from '@/views/od/PopupOrderDiscountInfo'; // 팝업 - 할인 내역(주문서용)
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import CookieUtils from '@/common/CookieUtils';
import PaySheet from '@/views/od/PaySheet.vue';
import ImgUtils from '@/common/ImgUtils';
import LoginUtils from '@/common/LoginUtils';
import CommonOrder from '@/common/od/CommonOrder'; // 주문공통
import Loading from "@/components/common/Loading";
export default {
  props: {
    ordId: String,
  },
  name: "multDelivOrderSheet",
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
        popupSimplycook: false, // 심플리쿡 주문예정 금액
        // popupFreeTime: false, // 프리타임 안내
        popupPickupShop: false, // 픽업 매장
        popupPickupMap: false, // 픽업매장 위치보기
        popupOrderDiscountInfo: false, // 할인정보
        popupOrderCouponList: false, // 쿠폰변경
        payCardKmpiFlag: false,
        payCardXmpiFlag: false,
        payCardSmpiFlag: false,
        payCardIspFlag: false,
        payMcashFlag: false,
        payAccountFlag: false,
        payEasyTotalPayFlag: false,
        payMobilePopFlag: false,
      },
      ordsInfo: {
        ordId: null, // 주문ID
        ordsStandDttm: null, // 주문서기준일시
        multDlvpYn: 'Y', // 다중배송지여부
        ofsItemProcSpCd: 'D', // 결품처리구분코드
        ordRecptIssuYn: 'N', // 주문영수증발행여부
        recptIssuSpCd: 'M', // 영수증발행구분코드
        cashRecptIssuYn: 'N', // 현금영수증발행여부
        cashRecptIssuTypeCd: 'A', // 현금영수증발행유형코드
        cashRecptInputNo: 'C', // 현금영수증입력번호
        upasVal: 'M', // 개인통관고유부호값
      }, // 주문서정보
      ordsDlvpInfos: [], // 배송지정보
      ordsDlvpSeqnos: [], // 주문서배송지일련번호
      pickupFlag: true,
      freeGift: [], // 사은품 목록
      pickupCenterFlag: false,
      strInfo: null, // 픽업매장정보
      ordsItemList: [], // 주문서상품목록
      productItems: [], // 상품 아이템 목록
      ordsItemDcSate: {}, // 할인내역
      ordsItemInfo: {}, // 상품쿠폰대상상품
      resvDelivInfors: [], // 예약배송안내
      todayDelivInfor: null, // 당일배송안내
      dawnDelivInfor: null, // 새벽배송안내
      dlvDelivInfor: null, // 택배배송안내
      abrdDelivInfor: null, // 해외배송안내
      payNoticeList: [],
      delivRequests: [], // 배송요청사항(상품수령위치, 결품발생시처리방법,영수증수령방법)
      crcoInfoInfo: null, // 선택된 신용카드 정보
      monthly: '01',
      totalDcAmt: 0, // 총 할인금액
      payType: '0', // 결제수단(default : 0(신용카드))
      crcoEvntInfo: null, // 선택된 카드할인정보
      resPntForm: null, // 선택된 통신사할인정보
      gsNPointDcAmt: 0, // 사용하는 gsNpoint 정보
      popRwdDcAmt: 0,
      totPrdAmt: 0, // 주문금액
      totDelivFee: 0,
      totPayAmt: 0, // 최종 결제금액
      pntUseAmt: 0, // 포인트사용가능상품금액
      paymentDate: null,
      payCardIspFlag: false,
      payEasyTotalPayNaverFlag: false,
      orderSheetForm: null, // 결제정보 처리
      pytcCd: '', // PG사코드
      pytcNm: '', // PG사명
      monthlyInfo: {
        monthly: '01',
        noIntYn: 'N',
      }, // 선택된 할부개월수정보
      cashRcpctInfo: null, // 현금영수증 발행여부
      mbrGrd: true, // 회원등급
      ordsDelivGrpInfos: [], // 배송지, 배송정보
      payCallType: [], // 결제방식 세팅시 필요 안넘기면 전체 나옴
      loginYn: LoginUtils.isLogin(),
      ordTypeCd: '50', // 일반10 선물하기20 다중예약배송50
      noInterestCardDetailInfo: null, // 선택된 무이자 할부 카드정보
      payInfo: null, // 결제정보
      crcoChargDcInfoList: null,
      siteClass: CookieUtils.getSiteClass(),
      orderAgreeInfo: {},
      trackItemList: [], // 트래커에 전달하기 위한 상품 정보
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '주문결제 < %s'
  },
  mixins: [AccordionMixin, LayerPopupMixin, CommonOrder],
  components: {
    SubDefaultHeader,
    Footer,
    OrderSheetProductList, // 상품목록
    // DeliveryTime, // 배송예정 시간
    DeliveryReserve, // 예약배송
    // DeliveryToday, // 당일배송
    // DeliveryDawn, // 새벽배송
    // DeliveryParcel, // 택배배송
    DeliveryRequest, // 배송 요청사항
    // DeliveryOverseas, // 해외배송
    DiscountInfo, // 할인정보
    MultiOrderTotalPrice, // 총금액
    PaySheet, // 결제통합
    PopupDeliveryList, // 팝업 - 배송지 목록
    // PopupSimplycook, // 팝업 - 심플리쿡 주문예정금액
    // PopupFreeTime, // 팝업 - 프리타임 안내
    // PopupPickupShop, // 팝업 - 픽업매장
    PopupOrderCouponChange, // 팝업 - 쿠폰변경
    PopupOrderDiscountInfo, // 팝업 - 할인 내역
    Loading, // loading
  },
  methods: {
    telNoPrt(telNo) {
      if (telNo != undefined && telNo != '') {
        return telNo.substring(0, 3) + ' - ' + telNo.substring(3, 7) + ' - ' + telNo.substring(7);
      } else {
        return '';
      }
    },
    async chkSafeNumber() {
      const rlfNoRqtYn = 'Y';
      if (this.ordsDlvpInfos && this.ordsDlvpInfos.length > 0) {
        for (let i = 0; i < this.ordsDlvpInfos.length; i++) {
          if (this.ordsDlvpInfos[i].abrdDelivYn === 'Y') {
            return;
          }
          const rq = {
            ordId: this.ordId,
            rlfNoRqtYn: rlfNoRqtYn,
            ordsDlvpSeqno: this.ordsDlvpInfos[i].ordsDlvpSeqno,
          };
          const rs = await ApiUtils.post('/fo/od/ordsmgnt/safeNum-request-proc', rq);
        }
      }
    },
    setAllDelivertInfo(index) {
      if (this.delivRequests.length > 0
      && this.delivRequests[index] != undefined) {
        if (this.delivRequests[index] != null && this.delivRequests[index].selectedOptionValue == '1' && this.delivRequests[index].delivMsgCnts == '') { // 공동현관비밀번호체크
          return this.$gsdialog.alert(OrderMsg.recptGetMethoP);
        }
        if (this.delivRequests[index] != null && this.delivRequests[index].selectedSoldoutValue == '') { // 결품발생 시 처리 방법체크
          return this.$gsdialog.alert(OrderMsg.agreeSoldoutChk);
        }
        for (let i=0; i < this.delivRequests.length; i++) {
          this.delivRequests[i] = this.delivRequests[index];
          this.$refs.deliveryRequest[i].delivRequestSort(this.delivRequests[index]);
        }
      } else {
        this.$gsdialog.alert(OrderMsg.delivertInfoChk);
      }
      console.log(this.delivRequests);
    },
    popupShowmenuAction() {
      this.popup.popupMenuShow = !this.popup.popupMenuShow;
    },
    popupLocationAction() {
      this.popupAction('popupPickupMap');
    },
    popupShopAction() {
      this.popupAction('popupPickupShop');
    },
    focusOutAction() {
      this.popup.popupMenuShow = false;
    },
    // 상세목록 닫기버튼
    accordionCloseEvent(index) {
      const $target = event.currentTarget;
      const controls = $target.getAttribute('aria-controls');
      const $accButton = document.querySelector('#orderTopAccordion' + index);
      document.getElementById(controls).setAttribute('hidden', true);
      $target.setAttribute('aria-expanded', false);
      $accButton.setAttribute('aria-expanded', false);
      $accButton.focus();
    },
    // 주문서상품목록조회
    async retrievelistOrdsItem() {
      this.trackItemList = [];
      this.ordsItemList = [];
      this.productItems = [];
      for (let i=0; i < this.ordsDlvpInfos.length; i++) {
        const ordsItemList = [];
        const iOrdsItemListInq = {
          ordId: this.ordId,
          ordsDlvpSeqno: this.ordsDlvpInfos[i].ordsDlvpSeqno,
        };
        const response = await ApiUtils.get('/fo/od/ordsmgnt/product-list', iOrdsItemListInq);
        ordsItemList = response.data.data;
        this.ordsItemList.push(ordsItemList);
      }

      // 상품 리스트 가공 하위여러 컴포넌트에서 사용
      if (this.ordsItemList.length > 0) {
        const productItems = [];
        const trackItem = [];
        for (let i = 0; i < this.ordsItemList.length; i++) {
          const ordsDelivGrpInfoList = this.ordsItemList[i].ordsDelivGrpInfoList;
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
        }
        this.trackItemList = trackItem;
        this.productItems.push(productItems);
      }
      // console.log(this.ordsItemList);
      // console.log(this.productItems);
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
      const response = await ApiUtils.get('/fo/od/ordsmgnt/delivery-place-multi-list', iOrdsDlvpListInq);
      const ordsDlvpInfoList = response.data.data.ordsDlvpInfoList;
      console.log('ordsDlvpInfoList', ordsDlvpInfoList);
      if (ordsDlvpInfoList.length > 0) {
        this.ordsDlvpInfos = ordsDlvpInfoList;
      }
      this.retrievelistOrdsItem(); // 주문상품 조회
      // 예약배송
      for (let i=0; i < this.ordsDlvpInfos.length; i++) {
        const resvDelivInfor = {
          ordId: this.ordId,
          ordsDlvpSeqno: this.ordsDlvpInfos[i].ordsDlvpSeqno,
        };
        this.delivRequests.push(resvDelivInfor);
        this.resvDelivInfors.push(resvDelivInfor);
        this.ordsDelivGrpInfos.push(resvDelivInfor);
        this.ordsDlvpSeqnos.push(this.ordsDlvpInfos[i].ordsDlvpSeqno);
      }
      this.chkSafeNumber();
    },
    // 상품쿠폰이 변경된경우
    productCouponChangeEvent: function() {
      this.retrievelistOrdsItem();
    },
    // 배송요청사항 변경 이벤트
    delivReqEvent: function(delivRequest) {
      if (this.delivRequests.length > 0) {
        for (let i=0; i < this.delivRequests.length; i++) {
          if (this.delivRequests[i].ordId === delivRequest.ordId && this.delivRequests[i].ordsDlvpSeqno === delivRequest.ordsDlvpSeqno) {
            this.delivRequests[i] = delivRequest;
          }
        }
      } else {
        this.delivRequests.push(delivRequest);
      }
      // console.log(this.delivRequests);
    },
    async __validation() {
      // 배송요청사항체크
      if (this.delivRequest != null && this.delivRequest.selectedOptionValue == '1' && this.delivRequest.delivMsgCnts == '') { // 공동현관비밀번호체크
        this.validationChk = false;
        this.moveElement('agreeDeliveryType');
        // document.getElementById("agreeDeliveryType").focus();
        return this.$gsdialog.alert(OrderMsg.recptGetMethoP);
      } else {
        this.validationChk = true;
      }
      if (this.delivRequest != null && this.delivRequest.selectedSoldoutValue == '') { // 결품발생 시 처리 방법체크
        this.validationChk = false;
        this.moveElement('soldoutTypeR');
        return this.$gsdialog.alert(OrderMsg.agreeSoldoutChk);
      } else {
        this.validationChk = true;
      }
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
        if (this.ordsItemList && this.ordsItemList.length > 0) {
          for (let k = 0; k < this.ordsItemList.length; k++) {
            const ordsDelivGrpInfoList = this.ordsItemList[k].ordsDelivGrpInfoList;
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
        if (chkCnt < this.freeGift.length) {
          this.validationChk = false;
          const $el = document.querySelector('#freeGift_divZone');
          if ($el != null) {
            $el.scrollIntoView(true);
            window.scrollBy(0, 0); // 상단 탭까지 이동
          }
          return this.$gsdialog.alert(OrderMsg.freeGiftCnt);
        } else if (this.defaultFreeGiftList.length > this.freeGift.length) {
          this.validationChk = false;
          const $el = document.querySelector('#freeGift_divZone');
          if ($el != null) {
            $el.scrollIntoView(true);
            window.scrollBy(0, 0); // 상단 탭까지 이동
          }
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
  mounted() {
    if (this.loginYn === true) {
      this.getMemInfo(); // 회원등급조회
      this.retrieveOrdsInfo(); // 주문서정보조회
      const $this = this;
      window.addEventListener('scroll', this.stickyPrice); // function call 방식 변경 유현석 20200529
      // this.popupPaymentNoticeAction(); // 결제공지사항 팝업 오픈
    } else {
      this.$gsdialog.alert(OrderMsg.loginFail);
      this.$router.push({name: 'theBasket'});
    }
  },
  computed: {
  },
};
</script>
<style lang="scss">
</style>
