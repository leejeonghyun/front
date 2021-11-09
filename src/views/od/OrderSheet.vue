<!--
views/od/SC-FO-PA-GS-MS-001
@author wisehouse@gsretail.com
-->
<template>
  <div :class="[{'wrap-order' : true}, siteClass]">
    <SubDefaultHeader headerText="주문결제" :tabbar="false" />
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
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
        <div class="tab-menu tab-list">
          <ul ref="tabList" class="tablist">
            <li>
              <button type="button" id="tab1" aria-controls="tab-contents1" @click="tabAction('delivery')" :class="{active : this.tab.delivery}" :disabled="disableInput()">배송</button>
            </li>
            <li>
              <button type="button" id="tab2" aria-controls="tab-contents2" @click="tabAction('pickup')" :class="{active : this.tab.pickup}" :disabled="disableInput()">픽업</button>
            </li>
          </ul>
        </div>
        <div ref="tabContents" tabindex="0">
          <!-- START : 배송 -->
          <div id="tab-contents1" class="tabcontents" aria-labelledby="tab1" v-if="this.tab.delivery">
            <!-- 최종 결제금액 스티키 -->
            <div class="position-fixed-total-price" @click="orderPaymentProc">
               최종 결제금액 <span class="price"><strong>{{toComma(totPayAmt)}}</strong>원</span>
            </div>
            <!-- // 최종 결제금액 스티키 -->
            <!-- START : 배송지 -->
            <div class="section-area pd-top">
              <div class="sub-inner-box">
                <div class="receive-delivery-info">
                  <div class="my-address">
                    <p class="wb-a">{{ordsDlvpInfo.adrsNm}} [{{ordsDlvpInfo.dlvpNm}}]</p>
                    <button v-if="bundlDelivOrdId == null || bundlDelivOrdId == ''" type="button" class="btn-border btn-change-address" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupDlvpAction">변경</button>
                    <p><span class="code">{{ordsDlvpInfo.adrsZipcd}}</span> {{ordsDlvpInfo.adrsStnmBaseAddr}} {{ordsDlvpInfo.adrsStnmDtlAddr}}</p>
                    <p>{{telNoPrt}}</p>
                  </div>
                  <p class="select-safe2">
                    <!--
                    <span class="inp-chk small">
                      <input type="checkbox" name="" id="safe-number" value="" v-on:click="chkSafeNumber($event)" :checked="rlfNoRqtYn === 'Y'" :disabled="disableInput()">
                      <label for="safe-number">안심번호 신청</label>
                    </span>
                    -->
                    <span v-if="'Y' != this.ordsDlvpInfo.abrdDelivYn">※ 주문 시 자동으로 안심번호처리가 됩니다.</span>
                  </p>
                </div>
              </div>
            </div>
            <!-- END : 배송지 -->
            <!-- START : 예약배송 -->
            <DeliveryReserve v-if="resvDelivInfor !== null" :resvDelivInfor="resvDelivInfor" /> <!-- 수정 : 2020.02.10 셀렉트 삭제 -->
            <!-- END : 예약배송 -->
            <!-- START : 당일배송 -->
            <DeliveryToday ref="deliveryToday" v-if="todayDelivInfor !== null" @moveSlot="moveSlot" :todayDelivInfor="todayDelivInfor" :strInfoMap="ordsDlvpInfo" @popupEvent="popupAction" @chkDelivSeqNo="chkDelivSeqNo" @processTodayDelivSpckExcld="processTodayDelivSpckExcld" @chkTodayDelivSeqNo="chkTodayDelivSeqNo" :bundlDelivOrdId="bundlDelivOrdId" /> <!-- 수정 : 2020.02.10 셀렉트 삭제 -->
            <PopupSimplycook @popupEvent="popupAction" v-if="this.popup.popupSimplycook" :ordsItemList="ordsItemList" :todayDelivInfoList="todayDelivInfoList" @orderExcldSpck="orderExcldSpck" @cnclExcldSpck="cnclExcldSpck"/> <!-- 팝업 - 주문예정금액 변동안내 -->
            <PopupFreeTime @popupEvent="popupAction" v-if="this.popup.popupFreeTime" /> <!-- 팝업 - 프리타임 안내 -->
            <!-- END : 당일배송 -->
            <!-- START : 새벽배송 -->
            <DeliveryDawn v-if="dawnDelivInfor !== null" :dawnDelivInfor="dawnDelivInfor" @chkDelivSeqNo="chkDelivSeqNo"/> <!-- 수정 : 2020.02.10 셀렉트 삭제 -->
            <!-- END : 새벽배송 -->
            <!-- START : 택배배송 -->
            <DeliveryParcel v-if="dlvDelivInfor !== null" :dlvDelivInfor="dlvDelivInfor" @chkDelivSeqNo="chkDelivSeqNo"/> <!-- 수정 : 2020.02.10 셀렉트 삭제 -->
            <!-- END : 택배배송 -->
            <!-- 수정 START : 2020.02.10 마크업 위치 변경 (해외직구배송, 배송요청사항 위치 변경) -->
            <!-- START : 해외배송 -->
            <DeliveryOverseas v-if="abrdDelivInfor !== null" :abrdDelivInfor="abrdDelivInfor" :ordsDlvpInfo="ordsDlvpInfo" @chkTCnt="chkTCnt" /> <!-- 수정 : 2020.02.10 셀렉트 삭제 -->
            <!-- END : 해외배송 -->
            <!-- START : 배송 요청사항 -->
            <DeliveryRequest v-if="ordsDelivGrpInfo !== null" :ordsDelivGrpInfo="ordsDelivGrpInfo" :ordsDlvpInfo="ordsDlvpInfo" @delivReqEvent="delivReqEvent" :bundlDelivOrdId="bundlDelivOrdId" :ordsItemList="ordsItemList" :pickupCenterFlag="pickupCenterFlag" :ordsInfo="ordsInfo" /> <!-- 수정 : 2020.02.12 상품수령 위치 옵션 변경 -->
            <!-- END : 배송 요청사항 -->
            <!-- 수정 END : 2020.02.10 마크업 위치 변경 (해외직구배송, 배송요청사항 위치 변경) -->
            <!-- START : 할인정보 -->
            <DiscountInfo ref="discount" @popupEvent="popupAction" @orderSheetDcAmtEvent="orderSheetDcAmtEvent" @bsktCpnChangeEvent="bsktCpnChangeEvent" @setOrdPolSeq="setOrdPolSeq" v-if="ordsInfo !== null" :ordsInfo="ordsInfo" :totAmt="totPayAmt" :mbrGrd="mbrGrd" :ordsItemList="ordsItemList" :defaultFreeGiftList="defaultFreeGiftList" :payInfo="payInfo" /> <!-- 수정 START : 2020.02.10 버튼 텍스트 변경 --> <!-- 수정 : 2020.02.13 카드즉시할인 수정 -->
            <OrderTotalPrice ref="totPrice" :totalDcAmt="totalDcAmt" :gsNPointDcAmt="gsNPointDcAmt" :popRwdDcAmt="popRwdDcAmt" :mbrGrd="mbrGrd" @totPayAmtEvent="totPayAmtEvent" v-if="ordsItemList !== null" :ordsItemList="ordsItemList" :crcoChargDcInfoList="crcoChargDcInfoList"/>
            <!-- END : 할인정보 -->
            <!-- START : 결재통합 -->
            <PaySheet ref="paySheet" :ordId="ordId" :totAmt="totPayAmt" :payCallType="payCallType" :strInfo="strInfo" :crcoEvntInfo="crcoEvntInfo" :tab="tab" @__validation="__validation" @orderProcess="orderProcess" @CashReceiptIssueEvent="CashReceiptIssueEvent" @defaultFreeGift="defaultFreeGift" @setFreeGift="setFreeGift" @setPayInfo="setPayInfo" @setCrcoChargDcInfo="setCrcoChargDcInfo" @setCrcoInfoInfo="setCrcoInfoInfo" @procOrderAgree="procOrderAgree"/>
            <!-- END : 결재통합 -->
          </div>
          <!-- END : 배송 -->
          <!-- START : 픽업 -->
          <div id="tab-contents2" class="tabcontents" aria-labelledby="tab2" v-if="this.tab.pickup">
            <!-- 최종 결제금액 스티키 -->
            <div class="position-fixed-total-price" v-if="pickupCenterFlag" @click="orderPaymentProc">
              최종 결제금액 <span class="price"><strong>{{toComma(totPayAmt)}}</strong>원</span>
            </div>
            <!-- // 최종 결제금액 스티키 -->
            <div v-if="pickupFlag">
              <!-- START : 처음인 경우 -->
              <!-- START : 픽업센터 -->
              <div class="section-area">
                <div class="sub-inner-box pickup-select">
                  <p class="txt">직접 수령할 장소를 선택해주세요.</p>
                  <button type="button" class="btn-md btn-bg lightgreen" @click="popupShopAction" :disabled="chkPkupPosb()">GS THE FRESH</button>
                  <button type="button" class="btn-md btn-bg lightgreen" aria-label="BOX25 팝업 활성화" aria-haspopup="dialog" @click="popupBoxShopAction" :disabled="chkBoxPosb()">BOX25</button>
                </div>
              </div>
              <!-- END : 픽업센터 -->
              <div class="section-area">
                <div class="sub-inner-box pickup-first-info">
                  <h2>내가 원하는 시간, 장소에서<br>편하게 찾아가세요!</h2>
                  <ol class="txt-info-list number-list">
                    <li><span class="number">①</span> 받으시고자 하는 픽업 매장을 선택해 주세요.</li>
                    <li><span class="number">②</span> 고객님께서 선택한 일자와 시간에 적온이 유지된 상태로 배송됩니다.<br>
                    <li><span class="number">③</span> 배송이 완료되면, 픽업 매장 방문 후 QR코드 또는 수신된 주문번호로 상품을 수령해 주세요!</li>
                      <li v-if="ordsDlvpInfo.supplFirmCd === '31008' || ordsDlvpInfo.supplFirmCd === '70011'">
                          <span class="number">④</span>fresh 8호센터 배송권역 중에 박스 25가 설치된 편의점에서 픽업 서비스가 가능합니다.<br />
                          (해당 권역 설명은 고객센터 Q&A에서 “배송”에서 확인 가능합니다)
                      </li>
                      <li v-if="ordsDlvpInfo.supplFirmCd === '31007' || ordsDlvpInfo.supplFirmCd === '70021'">
                          <span class="number">④</span>fresh 7호센터 배송권역 중에 박스 25가 설치된 편의점에서 픽업 서비스가 가능합니다.<br />
                          (해당 권역 설명은 고객센터 Q&A에서 “배송”에서 확인 가능합니다)
                      </li>
                  </ol>
                  <ul class="txt-info-list color-gray">
                    <li class="ico-alert2">GS THE FRESH (GS수퍼마켓) 픽업 관련 문의 : 1661-2562</li>
                    <li class="ico-alert2">BOX25 (GS25 편의점) 픽업 관련 문의 : 1544-4101</li>
                  </ul>
                </div>
              </div>
              <PopupPickupShop @popupEvent="popupAction" :ordId="ordId" :ordsDlvpSeqno="ordsDlvpSeqno" :ordsDlvpInfo="ordsDlvpInfo" :ordsItemList="ordsItemList" :strInfo="strInfo" v-if="this.popup.popupPickupShop" @strInfoChoiceEvent="strInfoChoiceEvent" /> <!-- TO-DO 팝업 - 픽업 매장 -->
              <PopupBoxShop @popupEvent="popupAction" :ordId="ordId" :ordsDlvpSeqno="ordsDlvpSeqno" :ordsDlvpInfo="ordsDlvpInfo" :productItems="productItems" :totAmt="totPayAmt" v-if="this.popup.popupBoxShop" @strInfoChoiceEvent="strInfoChoiceEvent" @boxPkupBooking="boxPkupBooking"/> <!-- TO-DO 팝업 - 픽업 매장 -->
              <!-- END : 처음인 경우 -->
            </div>
            <!-- START : 픽업센터 -->
            <div class="section-area" v-if="pickupCenterFlag">
              <div class="sub-inner-box">
                <div class="receive-delivery-info">
                  <div class="my-address">
                    <p class="store-name">{{strInfo.pkuppNm}}</p>
                    <div class="btn-wrap">
                      <button v-if="ordsDlvpInfo.strPkupPosbYn !== 'Y'" type="button" class="btn-border btn-change-address" aria-label="픽업 매장 변경 팝업 활성화" aria-haspopup="dialog" @click="popupShowmenuAction">변경</button>
                      <ul class="btn-select-pickup" v-show="this.popup.popupMenuShow">
                        <li><button type="button" class="btn-border btn" aria-label="픽업 매장 팝업 활성화" aria-haspopup="dialog" @click="popupShopAction" :disabled="chkPkupPosb()">GS THE FRESH</button></li>
                        <li><button type="button" class="btn-border btn" aria-label="BOX25 팝업 활성화" aria-haspopup="dialog" @click="popupBoxShopAction" :disabled="chkBoxPosb()">BOX25</button></li>
                      </ul>
                    </div>
                    <p class="store-addr">[{{strInfo.pkuppZipcd}}] {{strInfo.pkuppStnmAddr}} {{strInfo.pkuppStnmDtlAddr}}</p>
                    <p>
                      <span class="ico-tel"><a v-bind:href="'tel:' + strInfo.pkuppTelNo" title="전화걸기">{{strInfo.pkuppTelNo}}</a></span>
                      <span class="ico-location"><button type="button" aria-label="픽업 매장 위치보기 팝업 활성화" aria-haspopup="dialog" @click="popupLocationAction">위치 보기</button></span>
                    </p>
                  </div>
                </div>
              </div>
              <PopupPickupMap @popupEvent="popupAction" :ordId="ordId" :ordsDlvpSeqno="ordsDlvpSeqno" v-if="this.popup.popupPickupMap" :strInfoMap="strInfo" /> <!-- TO-DO 팝업 - 픽업매장 위치 -->
              <PopupPickupShop @popupEvent="popupAction" :ordId="ordId" :ordsDlvpSeqno="ordsDlvpSeqno" :ordsDlvpInfo="ordsDlvpInfo" :ordsItemList="ordsItemList" :strInfo="strInfo" v-if="this.popup.popupPickupShop" @strInfoChoiceEvent="strInfoChoiceEvent" /> <!-- TO-DO 팝업 - 픽업 매장 -->
              <PopupBoxShop @popupEvent="popupAction" :ordId="ordId" :ordsDlvpSeqno="ordsDlvpSeqno" :ordsDlvpInfo="ordsDlvpInfo" :productItems="productItems" :totAmt="totPayAmt" v-if="this.popup.popupBoxShop" @strInfoChoiceEvent="strInfoChoiceEvent" @boxPkupBooking="boxPkupBooking"/> <!-- TO-DO 팝업 - 픽업 매장 -->
              <!-- END : 픽업센터 -->
              <!-- START : 방문 예정 시간 -->
              <DeliveryTime :strInfoMap="strInfo" v-if="pickUpInfor !== null" :pickUpInfor="pickUpInfor" @chkDelivSeqNo="chkDelivSeqNo"/>
              <!-- END : 방문 예정 시간 -->
              <!-- START : 배송 요청사항 -->
              <DeliveryRequest v-if="ordsDelivGrpInfo !== null" :ordsDelivGrpInfo="ordsDelivGrpInfo" :ordsDlvpInfo="ordsDlvpInfo" @delivReqEvent="delivReqEvent" :bundlDelivOrdId="bundlDelivOrdId" :ordsItemList="ordsItemList" :pickupCenterFlag="pickupCenterFlag" /> <!-- 수정 : 2020.02.12 상품수령 위치 옵션 변경 -->
              <!-- END : 배송 요청사항 -->
              <!-- START : 할인정보 -->
              <DiscountInfo ref="discount" @popupEvent="popupAction" @orderSheetDcAmtEvent="orderSheetDcAmtEvent" @bsktCpnChangeEvent="bsktCpnChangeEvent" @setOrdPolSeq="setOrdPolSeq" v-if="ordsInfo !== null" :ordsInfo="ordsInfo" :totAmt="totPayAmt" :mbrGrd="mbrGrd" :ordsItemList="ordsItemList" :defaultFreeGiftList="defaultFreeGiftList" :payInfo="payInfo"/> <!-- 수정 START : 2020.02.10 버튼 텍스트 변경 --> <!-- 수정 : 2020.02.13 카드즉시할인 수정 -->
              <OrderTotalPrice ref="totPrice" :totalDcAmt="totalDcAmt" :gsNPointDcAmt="gsNPointDcAmt" :popRwdDcAmt="popRwdDcAmt" :mbrGrd="mbrGrd" @totPayAmtEvent="totPayAmtEvent" v-if="ordsItemList !== null" :ordsItemList="ordsItemList" :crcoChargDcInfoList="crcoChargDcInfoList"/>
              <!-- END : 할인정보 -->
              <PaySheet ref="paySheet" :ordId="ordId" :totAmt="totPayAmt" :payCallType="payCallType" :strInfo="strInfo" :tab="tab" @__validation="__validation" @orderProcess="orderProcess" @CashReceiptIssueEvent="CashReceiptIssueEvent" @defaultFreeGift="defaultFreeGift" @setFreeGift="setFreeGift" @setPayInfo="setPayInfo" @setCrcoChargDcInfo="setCrcoChargDcInfo" @setCrcoInfoInfo="setCrcoInfoInfo" @procOrderAgree="procOrderAgree"/>
            </div>
            <!-- END : 픽업센터 -->
          </div>
          <!-- END : 픽업 -->
        </div>
        <PopupDeliveryList @popupEvent="popupAction" v-if="this.popup.popupDeliveryList" :ordsDlvpInfo="ordsDlvpInfo" :ordsItemList="ordsItemList" @checkMbrDlvpInfoEvent="checkMbrDlvpInfoEvent" /> <!-- 팝업 - 배송지 목록 -->
        <PopupOrderDiscountInfo @popupEvent="popupAction" v-if="this.popup.popupOrderDiscountInfo" :ordsItemDcSate="ordsItemDcSate" /> <!-- 팝업 - 할인 내역 -->
        <PopupOrderCouponChange @popupEvent="popupAction" @productCouponChangeEvent="productCouponChangeEvent" v-if="this.popup.popupOrderCouponList" :ordsItemInfo="ordsItemInfo" :ordsItemList="ordsItemList"/> <!-- 팝업 - 쿠폰변경 -->
        <PopupNonPkupItem ref="pkupItem" @popupEvent="popupAction" @processPkupItemExcld="processPkupItemExcld" @tabAction="tabAction" v-if="this.popup.popupNonPkupItem" :pkupInvalidProduct="pkupInvalidProduct" :productItems="productItems" />
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
import DeliveryTime from '@/components/order/DeliveryTime'; // 배송예약 시간
import DeliveryReserve from '@/components/order/DeliveryReserve'; // 예약배송
import DeliveryToday from '@/components/order/DeliveryToday'; // 당일배송(확인필요)
import DeliveryDawn from '@/components/order/DeliveryDawn'; // 새벽배송(확인필요)
import DeliveryParcel from '@/components/order/DeliveryParcel'; // 택배배송(확인필요)
import DeliveryOverseas from '@/components/order/DeliveryOverseas'; // 해외배송
import DeliveryRequest from '@/components/order/DeliveryRequest'; // 배송 요청사항
import DiscountInfo from '@/components/order/DiscountInfo'; // 할인정보
import OrderTotalPrice from '@/components/order/OrderTotalPrice'; // 총금액
// import OrderAgreementPickup from '@/components/order/OrderAgreementPickup'; // 픽업 동의
import PopupDeliveryList from '@/views/od/PopupDlvpList.vue'; // 팝업 - 배송지 목록
// import PopupDeliveryList from '@/views/od/PopupDlvpDiffAreaList.vue'; // 팝업 - 배송지변경 다른권역 안내
import PopupOrderCouponChange from '@/views/od/PopupOrderCouponChange'; // 팝업 - 쿠폰변경
import PopupOrderDiscountInfo from '@/views/od/PopupOrderDiscountInfo'; // 팝업 - 할인 내역(주문서용)
import PopupSimplycook from '@/views/od/PopupSimpleCookOrdSchedAmt'; // 팝업 - 심플리쿡 주문예정 금액
import PopupFreeTime from '@/views/od/PopupFreeTimeInfo'; // 팝업 - 프리타임 안내
import PopupPickupMap from '@/views/od/PopupPkupStrPositInfo'; // 팝업 - 픽업매장 위치보기
import PopupPickupShop from '@/views/od/PopupPkupStrSrch'; // 팝업 - 픽업 매장 검색
import PopupBoxShop from '@/views/od/PopupBoxStrSrch'; // 팝업 - 픽업 매장 검색
import PopupAgreeDetail from '@/views/od/PopupTdptOferAgrInfo'; // 팝업 - 개인정보 제3자 제공동의
import PopupNonPkupItem from '@/views/od/PopupNonPkupItem'; // 팝업 - 픽업주문불가상품
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
import LoginUtils from '@/common/LoginUtils';
import CookieUtils from '@/common/CookieUtils';
import Loading from "@/components/common/Loading";
import CommonOrder from '@/common/od/CommonOrder'; // 주문공통
import Tracker from '@/common/Tracker'; // 트래커
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
        popupSimplycook: false, // 심플리쿡 주문예정 금액
        popupFreeTime: false, // 프리타임 안내
        popupPickupShop: false, // 픽업 매장
        popupBoxShop: false, // BOX25 매장
        popupPickupMap: false, // 픽업매장 위치보기
        popupOrderDiscountInfo: false, // 할인정보
        popupOrderCouponList: false, // 쿠폰변경
        popupNonPkupItem: false, // 픽업주문불가상품
      },
      ordsInfo: {
        ordId: null, // 주문ID
        ordsStandDttm: null, // 주문서기준일시
        multDlvpYn: 'N', // 다중배송지여부
        ofsItemProcSpCd: 'D', // 결품처리구분코드
        ordRecptIssuYn: 'N', // 주문영수증발행여부
        upasVal: 'M', // 개인통관고유부호값
      }, // 주문서정보
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
      dawnDelivInfor: null, // 새벽배송안내
      dlvDelivInfor: null, // 택배배송안내
      pickUpInfor: null, // 픽업안내
      todayDelivChk: {
        useYn: 'N', // 사용여부
        chkValue: '', // chk 값
      }, // 당일배송시간체크여부
      dawnDelivChk: {
        useYn: 'N', // 사용여부
        chkValue: '', // chk 값
      }, // 새벽배송시간체크여부
      dlvDelivChk: {
        useYn: 'N', // 사용여부
        chkValue: '', // chk 값
        chkValueSize: 1,
      }, // 택배배송시간체크여부
      pickupDelivChk: {
        useYn: 'N',
        chkValue: '',
      },
      abrdDelivInfor: null, // 해외배송안내
      checkUpasVal: null, // 개인통관고유번호
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
      loginYn: LoginUtils.isLogin(),
      ordTypeCd: '10', // 일반10 선물하기20
      iBOX25PkupSvcReqProc: {},
      bundlDelivOrdId: null,
      todayDelivInfoList: Object,
      payInfo: null, // 결제정보
      crcoChargDcInfoList: null,
      trackItemList: [], // 트래커에 전달하기 위한 상품 정보
      pkupInvalidProduct: [], // BOX25픽업불가상품
      orderAgreeInfo: {},
      strPkupPosbYn: 'N',
      pkupItemExcldYn: false,
      siteClass: CookieUtils.getSiteClass(),
      ordPolcSeqList: [],
      selectedDelivSeqno: '0',
      prevRoute: {},
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
  mixins: [AccordionMixin, LayerPopupMixin, CommonOrder],
  components: {
    SubDefaultHeader,
    Footer,
    OrderSheetProductList, // 상품목록
    DeliveryTime, // 배송예정 시간
    DeliveryReserve, // 예약배송
    DeliveryToday, // 당일배송
    DeliveryDawn, // 새벽배송
    DeliveryParcel, // 택배배송
    DeliveryRequest, // 배송 요청사항
    DeliveryOverseas, // 해외배송
    DiscountInfo, // 할인정보
    OrderTotalPrice, // 총금액
    // OrderAgreementPickup, // 픽업 동의
    PopupDeliveryList, // 팝업 - 배송지 목록
    PopupSimplycook, // 팝업 - 심플리쿡 주문예정금액
    PopupFreeTime, // 팝업 - 프리타임 안내
    PopupPickupShop, // 팝업 - 픽업매장
    PopupBoxShop, // 팝업 - 픽업매장
    PopupOrderCouponChange, // 팝업 - 쿠폰변경
    PopupOrderDiscountInfo, // 팝업 - 할인 내역
    PopupPickupMap, // 팝업 - 픽업매장 위치
    PaySheet,
    PopupNonPkupItem, // 팝업 - 픽업주문불가상품
    Loading, // loading
  },
  watch: {
    iBOX25PkupSvcReqProc: function() {
      // 3분마다 박스booking 상태 갱신
      setTimeout(fn, 150000);
      const that = this;
      /**
       * @return {void}
       */
      async function fn() {
        if (that.iBOX25PkupSvcReqProc != null) {
          const response = await ApiUtils.post('/fo/od/ordsmgnt/box25-pickup-service', that.iBOX25PkupSvcReqProc);
          const boxPkupRes = response.data.data;
          if (boxPkupRes.statusProc === 'SUCCESS') {
            const tBOX25PkupSvcReqProc = that.iBOX25PkupSvcReqProc;
            that.iBOX25PkupSvcReqProc = null;
            that.iBOX25PkupSvcReqProc = tBOX25PkupSvcReqProc;
          }
        }
      }
    },
    pickupCenterFlag: function() {
      if (this.pickupCenterFlag) {
        this.retrievelistOrdsItem();
      }
    },
    ordsItemList: function() {
      if (this.loading) {
        if (!this.pkupItemExcldYn) {
          this.loading = !this.loading;
        }
      }
    },
  },
  methods: {
    async tabAction(type) { // tab
      if (this.tab[type]) {
        return false;
      }
      if (type == 'delivery') {
        this.processPkupItemExcld(type);
        // box 수취인타입 초기화
        if (this.strInfo && this.strInfo.pkuppTypeCd === '3') {
          this.processInitBox();
        }
        await ApiUtils.post('/fo/od/ordsmgnt/delivery-place-init-base', {ordId: this.ordId});
      } else if ( type == 'pickup') {
        try {
          if (this.dawnDelivInfor != null) return false;
          if (this.dlvDelivInfor != null) return false;
          if ('Y' === this.ordsDlvpInfo.abrdDelivYn) return false;
        } finally {
          if (this.dawnDelivInfor != null || this.dlvDelivInfor != null || 'Y' === this.ordsDlvpInfo.abrdDelivYn) {
            this.$gsdialog.alert(OrderMsg.pickupDeliveryToday);
          }
        }
        // if (this.popup.popupSimplycook == true) return false;
        this.pickupFlag = false;
      }
      this.pickupCenterFlag = false;

      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      // 초기화
      this.resvDelivInfor = null; // 예약배송안내
      this.todayDelivInfor = null; // 당일배송안내
      this.dawnDelivInfor = null; // 새벽배송안내
      this.dlvDelivInfor = null; // 택배배송안내
      this.pickUpInfor = null; // 픽업안내
      this.tab[type] = true;
      // this.retrievelistOrdsItem();
      this.retrievelistOrdsDlvp();
      // this.$refs.tabContents.focus();
      if (this.$refs.tabContents != null) {
        this.$refs.tabContents.scrollIntoView(true);
        window.scrollBy(0, -100); // 상단 탭까지 이동
      }
    },
    async chkSafeNumber() {
      if ('Y' === this.ordsDlvpInfo.abrdDelivYn) {
        return;
      }
      this.rlfNoRqtYn = 'Y';
      const rq = {
        ordId: this.ordId,
        rlfNoRqtYn: this.rlfNoRqtYn,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
      };
      const rs = await ApiUtils.post('/fo/od/ordsmgnt/safeNum-request-proc', rq);
    },
    popupShowmenuAction() {
      this.popup.popupMenuShow = !this.popup.popupMenuShow;
    },
    popupLocationAction() {
      this.popupAction('popupPickupMap');
    },
    popupShopAction() {
      this.popupAction('popupPickupShop');
      this.popup.popupMenuShow = !this.popup.popupMenuShow;
    },
    chkPkupPosb() {
      if (this.ordsDlvpInfo) {
        if (this.ordsDlvpInfo.smPkupPosbYn === 'Y') {
          return false;
        } else {
          return true;
        }
      }
    },
    async popupBoxShopAction() {
      if (this.pkupInvalidProduct && this.pkupInvalidProduct.length > 0) {
        this.popupAction('popupNonPkupItem');
      } else {
          await this.$gsdialog.alert('너비410*깊이410*높이336mm를 초과하는 상품은 픽업 서비스가 어려운 점 양해 부탁드립니다.(ex_냉동상품군, 쌀, 생수 등)');
        this.popupAction('popupBoxShop');
      }
      this.popup.popupMenuShow = !this.popup.popupMenuShow;
    },
    chkBoxPosb() {
      if (this.ordsDlvpInfo) {
        if (this.ordsDlvpInfo.box25PkupPosbYn === 'Y') {
          return false;
        } else {
          return true;
        }
      }
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
      if (this.todayDelivInfor) {
        this.$refs.deliveryToday.chkOrdPolcSeq(this.ordPolcSeqList);
      }

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
        const pkupInvalidItems = [];
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
              if (ordsItemInfoList[l].spckItemYn === 'Y' || ordsItemInfoList[l].excldCtgItemYn === 'Y'
                || (ordsItemInfoList[l].ssevntClasfCd === '05' || ordsItemInfoList[l].ssevntClasfCd === '07')
                || ordsItemInfoList[l].boxInvalidItemYn === 'Y') { // 심플리쿡상품, 기획전(05:임박, 07:하루판매), 당일배송 제외 카테고리 상품, BOX25제외상품
                pkupInvalidItems.push(ordsItemInfoList[l]);
              }
            }
          }
        }
        this.trackItemList = trackItem;
        this.productItems = productItems;
        this.pkupInvalidProduct = pkupInvalidItems;
        Tracker.orderSheet(this.trackItemList);
      }
    },
    // 주문서정보조회
    async retrieveOrdsInfo() {
      const iOrdsInfoInq = {
        ordId: this.ordId,
      };
      this.loading++;
      const response = await ApiUtils.get('/fo/od/ordsmgnt/ordersheet', iOrdsInfoInq);
      this.loading--;
      const ordsInfo = response.data.data;
      if (ordsInfo == null || ordsInfo.ordId == null || !ordsInfo.ordValidYn) {
        this.$gsdialog.alert(OrderMsg.ordValidChk).then(() => {
          this.$router.go(-1);
        });
        return;
      }

      this.ordsInfo = ordsInfo;
      // 회원 주문유효성 체크 주문완료 체크
      if (this.ordsInfo.ordCompleteYn === 'Y') {
        this.$gsdialog.alert(OrderMsg.ordValidChk).then(() => {
          this.$router.push({name: 'theBasket'});
        });
        return;
      }
      // 묶음배송(합배송) 여부
      if ( ordsInfo.bundlDelivOrdId !== null ) {
        this.bundlDelivOrdId = ordsInfo.bundlDelivOrdId;
      }

      this.retrievelistOrdsDlvp(); // 주문서배송지목록조회
      this.getMemInfo(); // 회원등급조회
      this.initListOrdsDlvp();
      const $this = this;
      window.addEventListener('scroll', this.stickyPrice); // function call 방식 변경 유현석 20200529
      // this.popupPaymentNoticeAction(); // 결제공지사항 팝업 오픈
    },
    async initListOrdsDlvp() {
      const iOrdsDlvpListInq = {
        ordId: this.ordId,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/delivery-place-init', iOrdsDlvpListInq);
    },
    // 주문서배송지목록조회
    async retrievelistOrdsDlvp() {
      const iOrdsDlvpListInq = {
        ordId: this.ordId,
      };
      // 주무문서배송지 인터페이스 조회
      const response = await ApiUtils.get('/fo/od/ordsmgnt/delivery-place-list', iOrdsDlvpListInq);
      const ordsDlvpInfoList = response.data.data.ordsDlvpInfoList;
      if (ordsDlvpInfoList.length > 0) {
        this.ordsDlvpInfo = ordsDlvpInfoList[0];
        this.strPkupPosbYn = this.ordsDlvpInfo.strPkupPosbYn;
      }
      if (!this.ordsDlvpInfo.adrsNm || StringUtils.isEmpty(this.ordsDlvpInfo.adrsNm)) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('수취인 정보'));
        history.back();
        return;
      } else if (!this.ordsDlvpInfo.adrsZipcd || StringUtils.isEmpty(this.ordsDlvpInfo.adrsZipcd)) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('우편번호'));
        history.back();
        return;
      } else if ((!this.ordsDlvpInfo.adrsBaseAddr || StringUtils.isEmpty(this.ordsDlvpInfo.adrsBaseAddr))
        && (!this.ordsDlvpInfo.adrsStnmBaseAddr || StringUtils.isEmpty(this.ordsDlvpInfo.adrsStnmBaseAddr))) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('주소지 정보'));
        history.back();
        return;
      } else if ((!this.ordsDlvpInfo.adrsTelNo || StringUtils.isEmpty(this.ordsDlvpInfo.adrsTelNo))
        && (!this.ordsDlvpInfo.adrsMoblTelNo || StringUtils.isEmpty(this.ordsDlvpInfo.adrsMoblTelNo))) {
        this.$gsdialog.alert(OrderMsg.valueEmpty('연락처'));
        history.back();
        return;
      }

      this.ordsDlvpSeqno = this.ordsDlvpInfo.ordsDlvpSeqno;
      this.rlfNoRqtYn = this.ordsDlvpInfo.rlfNoRqtYn;
      this.retrievelistOrdsItem(); // 주문상품 조회
      if ( this.tab['delivery'] ) {
        // 예약배송
        if ('Y' === this.ordsDlvpInfo.resvDelivYn) {
          this.resvDelivInfor = {
            ordId: this.ordId,
            ordsDlvpSeqno: this.ordsDlvpSeqno,
            delivPolcId: this.ordsDlvpInfo.delivPolcId,
          };
        }
        // 당일배송
        if ('Y' === this.ordsDlvpInfo.todayDelivYn) {
          this.todayDelivInfor = {
            ordId: this.ordId,
            ordsDlvpSeqno: this.ordsDlvpSeqno,
            delivPolcId: this.ordsDlvpInfo.delivPolcId,
          };
        }
        // 새벽배송
        if ('Y' === this.ordsDlvpInfo.dawnDelivYn) {
          this.dawnDelivInfor = {
            ordId: this.ordId,
            ordsDlvpSeqno: this.ordsDlvpSeqno,
            delivPolcId: this.ordsDlvpInfo.delivPolcId,
          };
        }
        // 택배배송
        if ('Y' === this.ordsDlvpInfo.owncoDlvDelivYn || 'Y' === this.ordsDlvpInfo.firmDlvDelivYn) {
          this.dlvDelivInfor = {
            ordId: this.ordId,
            ordsDlvpSeqno: this.ordsDlvpSeqno,
            firmDlvDelivYn: this.ordsDlvpInfo.firmDlvDelivYn,
            owncoDlvDelivYn: this.ordsDlvpInfo.owncoDlvDelivYn,
            delivPolcId: this.ordsDlvpInfo.delivPolcId,
          };
        }
        // 해외배송
        // if ('Y' === this.ordsDlvpInfo.abrdDelivYn) {
          this.abrdDelivInfor = {
            ordId: this.ordId,
            ordsDlvpSeqno: this.ordsDlvpSeqno,
            upasVal: this.ordsInfo.upasVal,
            agreeUpas: false,
            delivPolcId: this.ordsDlvpInfo.delivPolcId,
          };
        // }
      } else {
        if (this.ordsDlvpInfo.strPkupPosbYn === 'Y') {
          this.setPkuppInfo();
        } else {
          // 픽업 초기화
          this.strInfo = null;
          this.pickupFlag = true;
          this.pickupCenterFlag = false;
          this.popup.popupMenuShow = true;
        }
      }

      // 배송요청사항 처리용
      this.ordsDelivGrpInfo = {
        ordId: this.ordId,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
      };

      this.chkSafeNumber(); // 안심번호 default

      // 배송지 추가에서 돌아오면 배송지 선택 팝업 열기
      if (this.prevRoute.path == '/cu/delivery_place_add') {
        this.popupDlvpAction();
      }
    },
    // 상품쿠폰이 변경된경우
    productCouponChangeEvent: function() {
      this.retrievelistOrdsItem();
    },
    // 장바구니/배송비 쿠폰이 변경된 경우
    bsktCpnChangeEvent: function() {
      this.retrievelistOrdsItem();
    },
    // 심플리쿡상품 제외한 경우
    spckExcldChangeEvent: function() {
      this.$refs.deliveryToday.delivSeqsSerh();
      this.retrievelistOrdsItem();
      this.$refs.discount.setDisCount();

      this.loading = false;
    },
    // 배송요청사항 변경 이벤트
    delivReqEvent: function(delivRequest) {
      this.delivRequest = delivRequest;
    },
    // 통관고유부호 유효성 검증
    chkTCnt: function(chkTCnt) {
      console.log('chkTCnt', chkTCnt);
      this.checkUpasVal = chkTCnt;
    },
    async __validation(payType) {
      // if (this.tab.pickup && this.strInfo != null) {
        // if (this.strInfo.pkuppTypeCd === '1' || this.strInfo.pkuppTypeCd === '2' || this.strInfo.pkuppTypeCd === '3') {
          // if (this.pickupDelivChk.chkValue == '') {
            // this.validationChk = false;
            // this.moveElement('popupTimeSelect_pickupDelivChk');
            // return this.$gsdialog.alert(OrderMsg.pickupDelivChk);
          // } else {
            // this.validationChk = true;
          // }
        // }
      // } else {
        if (this.todayDelivChk.useYn == 'Y') { // 당일배송시간체크여부
          if (this.todayDelivChk.chkValue == '') {
            this.validationChk = false;
            this.moveElement('popupTimeSelect_todayDelivChk');
            return this.$gsdialog.alert(OrderMsg.todayDelivChk);
          } else {
            if (this.ordPolcSeqList && this.ordPolcSeqList.length > 0) {
              if (this.ordPolcSeqList.indexOf(this.selectedDelivSeqno) === -1) {
                this.moveElement('popupTimeSelect_todayDelivChk');
                return this.$gsdialog.alert(OrderMsg.promOrdPolcSeqChk);
              }
            }
            this.validationChk = true;
          }
        }
        if (this.dawnDelivChk.useYn == 'Y') { // 새벽배송시간체크여부
          if (this.dawnDelivChk.chkValue == '') {
            this.validationChk = false;
            this.moveElement('popupTimeSelect_dawnDelivChk');
            return this.$gsdialog.alert(OrderMsg.dawnDelivChk);
          } else {
            this.validationChk = true;
          }
        }
        if (this.dlvDelivChk.useYn == 'Y') { // 택배배송시간체크여부
          if (this.dlvDelivChk.chkValue !== this.dlvDelivChk.chkValueSize) {
            this.validationChk = false;
            this.moveElement('popupTimeSelect_dlvDelivChk');
            return this.$gsdialog.alert(OrderMsg.dlvDelivChk);
          } else {
            this.validationChk = true;
          }
        }
        if (this.pickupDelivChk.useYn == 'Y') { // 픽업시간체크여부
          if (this.pickupDelivChk.chkValue == '') {
            this.validationChk = false;
            this.moveElement('popupTimeSelect_pickupDelivChk');
            return this.$gsdialog.alert(OrderMsg.pickupDelivChk);
          } else {
            this.validationChk = true;
          }
        }

      // }
      // 배송요청사항체크
      if (!this.tab['pickup'] && this.delivRequest != null && (this.todayDelivChk.useYn === 'Y' || this.dawnDelivChk.useYn === 'Y') && this.delivRequest.selectedOptionValue === '1' && !this.delivRequest.itemDlvrMethoDtlCnts) { // 공동현관비밀번호체크
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
        if (this.delivRequest.selectedSoldoutValue === 'C' && (payType === '06' || payType === '10' || payType === '13')) {
          // 네이버페이 휴대폰소액결제 모바일팝 은 부분취소 불가
          this.validationChk = false;
          this.moveElement('soldoutTypeR');
          return this.$gsdialog.alert(OrderMsg.unavailableSoldoutChk, { html: true });
        }
        if (this.delivRequest.selectedSoldoutValue === 'P' && !this.mbrGrd) {
          // 네이버페이 휴대폰소액결제 모바일팝 은 부분취소 불가
          this.validationChk = false;
          this.moveElement('soldoutTypeR');
          return this.$gsdialog.alert(OrderMsg.memberSoldoutChk, { html: true });
        }
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
                      if (freeGiftList.type === 'mall' && amt >= Number(gift.promBeneZoneList[i].beneZoneBeginVal) && (amt <= Number(gift.promBeneZoneList[i].beneZoneEndVal) || Number(gift.promBeneZoneList[i].beneZoneEndVal) === 0)) {
                        chkCnt += Number(gift.promBeneZoneList[i].promPresFrgfList.length);
                      } else {
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
                      if (freeGiftList.type === 'mall' && amt >= Number(gift.promBeneZoneList[i].beneZoneBeginVal) && (amt <= Number(gift.promBeneZoneList[i].beneZoneEndVal) || Number(gift.promBeneZoneList[i].beneZoneEndVal) === 0)) {
                        tmpCnt = Number(gift.promBeneZoneList[i].promPresFrgfList.length);
                      } else {
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
      // 개인통관고유번호 체크
      if ('Y' === this.ordsDlvpInfo.abrdDelivYn) {
        if (!this.abrdDelivInfor.agreeUpas) {
          this.validationChk = false;
          this.moveElement('agree-upas');
          return this.$gsdialog.alert(OrderMsg.abrdAgreeChk); // 개인통관고유부호 수집에 동의해주세요.
        } else {
          const upasVal = this.abrdDelivInfor.upasVal;
          if (upasVal && upasVal.length > 0) {
            const reg = /^(P)[0-9]{12}/;
            if (!reg.test(upasVal)) {
              this.validationChk = false;
              this.moveElement('upasVal');
              this.$gsdialog.alert(OrderMsg.abrdDelivInforChk); // 입력하신 개인통관고유부호를 다시 확인해주세요.
            } else if (this.checkUpasVal === '0') {
              this.validationChk = false;
              this.moveElement('upasVal');
              this.$gsdialog.alert(OrderMsg.abrdDelivInforFail); // 개인통관고유부호가 유효하지 않습니다.
            } else {
            this.validationChk = true;
            }
          } else {
            this.validationChk = false;
            this.moveElement('upasVal');
            this.$gsdialog.alert(OrderMsg.abrdDelivInforEmpty); // 개인통관고유부호를 입력해주세요.
          }
        }
      }
    },
    boxPkupBooking(iBOX25PkupSvcReqProc) {
      this.iBOX25PkupSvcReqProc = iBOX25PkupSvcReqProc;
    },
    disableInput() {
      if (this.bundlDelivOrdId == null || this.bundlDelivOrdId == '') {
        return false;
      } else {
        return true;
      }
    },
    orderExcldSpck() {
      this.$refs.deliveryToday.orderExcldSpck();
    },
    cnclExcldSpck() {
      this.$refs.deliveryToday.cnclExcldSpck();
    },
    setCrcoChargDcInfo(crcoChargDcInfoList) {
      this.crcoChargDcInfoList = crcoChargDcInfoList;
    },
    setCrcoInfoInfo(crcoInfoInfo) {
      this.$refs.totPrice.crcoChargDc(crcoInfoInfo);
    },
    async processTodayDelivSpckExcld(iTodayDelivSpckExcldProc) {
      this.loading = true;

      const response = await ApiUtils.put('/fo/od/ordsmgnt/today-delivery-simplycook-excluded', iTodayDelivSpckExcldProc);
      this.spckExcldChangeEvent();
    },
    async processPkupItemExcld(type) {
      this.pkupItemExcldYn = true;
      this.loading = true;

      const ordsItemSeqnoList = [];
      if (this.pkupInvalidProduct && this.pkupInvalidProduct.length > 0) {
        for (let i = 0; i < this.pkupInvalidProduct.length; i++) {
          const ordsItemSeqno = this.pkupInvalidProduct[i].ordsItemSeqno;
          ordsItemSeqnoList.push(ordsItemSeqno);
        }
      }
      const iTodayDelivSpckExcldProc = {
        ordId: this.ordId,
        ordsItemSeqnoList: ordsItemSeqnoList,
        spckItemIncldYn: type==='delivery'?'Y':'N',
        pmbsJoinPrcnCd: CookieUtils.getCookie('pmbsJoinPrcnCd'),
      };
      const response = await ApiUtils.put('/fo/od/ordsmgnt/pkup-item-excluded', iTodayDelivSpckExcldProc);
      this.setPkuppInfo();
    },
    async setPkuppInfo() {
      if (this.tab['pickup'] && this.ordsDlvpInfo.strPkupPosbYn === 'Y') {
        // 픽업정보 주문서배송지 테이블에 업데이트
        this.strInfo = {
          delivPolcId: this.ordsDlvpInfo.pkuppDelivPolcId,
          delivTypeCd: this.ordsDlvpInfo.delivTypeCd,
          // itemRcptTypeCd: this.ordsDlvpInfo.itemRcptTypeCd,
          itemRcptTypeCd: 'T',
          ordId: this.ordsDlvpInfo.ordId,
          ordsDlvpSeqno: this.ordsDlvpInfo.ordsDlvpSeqno,
          pkuppAddr: this.ordsDlvpInfo.pkuppAddr,
          pkuppDtlAddr: this.ordsDlvpInfo.pkuppDtlAddr,
          pkuppId: this.ordsDlvpInfo.pkuppId,
          pkuppNm: this.ordsDlvpInfo.pkuppNm,
          pkuppStnmAddr: this.ordsDlvpInfo.pkuppStnmAddr,
          pkuppStnmDtlAddr: this.ordsDlvpInfo.pkuppStnmDtlAddr,
          pkuppTelNo: this.ordsDlvpInfo.pkuppTelNo,
          pkuppTypeCd: "1",
          pkuppZipcd: this.ordsDlvpInfo.pkuppZipcd,
          strCd: this.ordsDlvpInfo.strCd,
        };
        if (this.strInfo.pkuppId != null) {
          const response = await ApiUtils.put('/fo/od/ordsmgnt/gs-supermarket-pickup-service', this.strInfo);
        }
        this.pickupFlag = false;
        this.pickupCenterFlag = true;
        this.popup.popupMenuShow = false;
        this.pickUpInfor = {
          ordId: this.ordsDlvpInfo.ordId,
          ordsDlvpSeqno: this.ordsDlvpInfo.ordsDlvpSeqno,
        };
      }
      this.pkupItemExcldYn = false;
      this.retrievelistOrdsItem();
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
      if (this.tab['pickup']) {
        // params.pickupYn = 'Y';
        cmmSteAgrmCdList.push('PS'); // 픽업 서비스 동의
      }
      if ('Y' === this.ordsDlvpInfo.abrdDelivYn) {
        // params.agreeUpasYn = 'Y';
        cmmSteAgrmCdList.push('PC'); // 개인통관고유부호 수집에 동의
      }
      this.orderAgreeInfo.ordId = this.ordId;
      this.orderAgreeInfo.cmmSteAgrmCdList = cmmSteAgrmCdList;
      this.orderAgreeInfo.agrmAgrYn = 'Y';
    },
    setOrdPolSeq(ordPolcSeqList) {
      this.ordPolcSeqList = ordPolcSeqList;
      if (this.todayDelivChk.useYn == 'Y') { // 당일배송시간체크여부
        this.$refs.deliveryToday.chkOrdPolcSeq(this.ordPolcSeqList);
      }
    },
    chkTodayDelivSeqNo(delivSeqno) {
      this.selectedDelivSeqno = delivSeqno;
    },
    async processInitBox() {
      const param = {
          ordId: this.ordsDlvpInfo.ordId,
          ordsDlvpSeqno: this.ordsDlvpInfo.ordsDlvpSeqno,
          pkuppTypeCd: '0',
        };
        const response = await ApiUtils.put('/fo/od/ordsmgnt/gs-supermarket-pickup-service', param);
    },
    moveSlot() {
      this.moveElement('popupTimeSelect_todayDelivChk');
    },
  },
  created() {
  },
  mounted() {
    const devYn = true;
    if (this.loginYn === true) {
      this.retrieveOrdsInfo(); // 주문서정보조회
    } else {
      this.$gsdialog.alert(OrderMsg.loginFail);
      this.$router.push({name: 'theBasket'});
    }
  },
  computed: {
    telNoPrt: function() {
      if (this.ordsDlvpInfo.adrsMoblTelNo != '' && this.ordsDlvpInfo.adrsMoblTelNo != undefined) {
        return (this.ordsDlvpInfo.adrsMoblTelNo).substring(0, 3) + ' - ' + (this.ordsDlvpInfo.adrsMoblTelNo).substring(3, 7) + ' - ' + (this.ordsDlvpInfo.adrsMoblTelNo).substring(7);
      } else {
        return '';
      }
    },
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
