<template>
  <section class="section-area accordion-wrap">
    <!-- STRAT : 일반 결제 -->
    <div class="sub-title tit-accordion" v-if="payCallType.length === 0">
      <h2>
        <button type="button" id="paymentNormalAccordion" class="tit" aria-controls="paymentNormalAccordionContent" aria-expanded="true" @click="accordionEvent">
          <strong class="bg-line-brush">결제수단 <span aria-label="필수 항목" class="required">*</span></strong>
        </button>
      </h2>
    </div>
    <div id="paymentNormalAccordionContent" class="accordion-content" aria-labelledby="paymentNormalAccordion">
      <div class="sub-inner-box">
        <!-- START : 결제방법 -->
        <div>
          <ul class="payment-list">
            <!-- tdrMeansList에 적립금(GS&POINT)를 수동 추가. '결제수단코드' 중 적립금의 코드값은 '06' 임-> 코드값 확인 필요. 그래서 임시로 '99'로 셋팅함 -->
            <li v-for="tdrMeansInfo in tdrMeansList" v-bind:key="tdrMeansInfo.tdrMeansCd" v-bind:id="'liTab'+tdrMeansInfo.tdrMeansCd" v-bind:class="{active : tdrMeansInfo.tdrMeansCd == '02'}">
              <button type="button" v-bind:id="'tab'+tdrMeansInfo.tdrMeansCd"
              :class="{'btn-border' : true,
              'btn-mobilepop' : tdrMeansInfo.tdrMeansCd === '03',
              'btn-payco' : tdrMeansInfo.tdrMeansCd === '04',
              'btn-kakaopay' : tdrMeansInfo.tdrMeansCd === '05',
              'btn-naverpay' : tdrMeansInfo.tdrMeansCd === '06'}"
              aria-controls="tab-contents1"
              data-sc-action="purchase.click"
              data-dimension-name="link.linkName"
              :data-dimension-value="tdrMeansInfo.tdrMeansNm"
              @click="listTabActive(tdrMeansInfo.tdrMeansCd);">
              <template v-if="tdrMeansInfo.tdrMeansCd !== '03'
              && tdrMeansInfo.tdrMeansCd !== '04'
              && tdrMeansInfo.tdrMeansCd !== '05'
              && tdrMeansInfo.tdrMeansCd !== '06'">{{tdrMeansInfo.tdrMeansNm}}</template>
              </button>
            </li>
          </ul>
        </div>
        <div v-if="payNoticeTextFlag && (isListTab === '02' || (isListTab === '04' && paycoType === 'CARD') || (isListTab === '05' && kakaoType === 'CARD') || isListTab === '06')">
          <ul class="txt-info-list color-bk mt0"> <!-- 5% 청구할인 데이터 확인 필요 -->
            <!--<li class="ico-alert2" v-if="saleTextFlag">{{crcoNm}}카드 {{toComma(evntApplStandAmt)}}원 이상 결제 시 {{crcoChargDcrt}}% 청구할인(~{{toFormat(crcoChargDcEndDt, 'MM.DD')}}까지) <span class="color-gray">최대{{toComma(crcoChargDcPosbAmt)}}원</span></li> -->
            <li class="ico-alert2">
              <!--<span v-for="payNoticeInfo in payNoticeList" v-bind:key="payNoticeInfo.notiSeqno">{{payNoticeInfo.notiCnts}}</span>-->
              <span v-for="payNoticeInfo in payNoticeList" v-bind:key="payNoticeInfo.notiSeqno" v-html="payNoticeInfo.notiCnts"></span>
            </li>
          </ul>
        </div>
        <!-- END : 결제방법 -->
        <div ref="tabContents" tabindex="0">
          <!-- START : 신용카드 -->
          <div id="tab-contents1" class="tabcontents credit-card" aria-labelledby="tab1" v-if="isListTab === '02'">
            <ul class="txt-info-list color-bk mt0"> <!-- 5% 청구할인 데이터 확인 필요 -->
              <li class="ico-alert2" v-for="(crcoChargDcInfo, idx) in crcoChargDcInfoList" v-bind:key="idx">
                <template v-if="crcoChargDcInfo.dcTypeCd === 'A'">
                  {{crcoChargDcInfo.crcoNm}} {{toComma(crcoChargDcInfo.evntApplStandAmt)}}원 이상 결제 시 {{toComma(Number(crcoChargDcInfo.crcoChargDcrt))}}원 청구할인(~{{toFormat(crcoChargDcInfo.crcoChargDcEndDt, 'MM.DD')}}까지)
                </template>
                <template v-else>
                  {{crcoChargDcInfo.crcoNm}} {{toComma(crcoChargDcInfo.evntApplStandAmt)}}원 이상 결제 시 {{crcoChargDcInfo.crcoChargDcrt}}% 청구할인(~{{toFormat(crcoChargDcInfo.crcoChargDcEndDt, 'MM.DD')}}까지)
                  <span class="color-gray">최대{{toComma(crcoChargDcInfo.crcoChargDcPosbAmt)}}원</span>
                </template>
              </li>
              <!--<li class="ico-alert2" v-if="saleTextFlag">{{crcoNm}}카드 {{toComma(evntApplStandAmt)}}원 이상 결제 시 {{crcoChargDcrt}}% 청구할인(~{{toFormat(crcoChargDcEndDt, 'MM.DD')}}까지) <span class="color-gray">최대{{toComma(crcoChargDcPosbAmt)}}원</span></li> -->
            </ul>
            <p class="wrap-select w100">
              <button type="button" class="btn-arrow" aria-label="신용카드 팝업 활성화" aria-haspopup="dialog" @click="popupCardList">
                <span v-if="cardFlag">카드를 선택해 주세요.</span>
                <span v-else-if="!cardFlag && crcoInfoInfo != null">
                  <span class="icon-card" ><img v-bind:src="getImgNm(crcoInfoInfo.cardCode)" v-bind:alt="crcoInfoInfo.pytcCardNm"></span>{{crcoInfoInfo.pytcCardNm}}
                </span>
              </button>
            </p>
            <p class="wrap-select w100" v-if="monthlyFlag">
              <button type="button" class="btn-arrow disabled" disabled>일시불</button> <!-- 비활성화일 경우 -->
            </p>
            <p class="wrap-select w100" v-else-if="!monthlyFlag">
               <button type="button" class="btn-arrow" aria-label="카드결제 할부선택 팝업 활성화" aria-haspopup="dialog" @click="popupCardMonthlyActive">{{monthlyText}}</button>
            </p>
            <ul class="txt-info-list color-bk mt0">
              <li class="ico-alert2" v-if="noIntTextFlag">{{noInterestCardDetailInfo.cardNm}} {{(noInterestCardDetailInfo.installment).replace(/:/gi, ", ")}}개월 무이자 할부 신청이 가능합니다.</li>
            </ul>
            <p class="btn-monthly-info" v-if="noIntTextFlag">
              무이자할부안내 <button type="button" class="btn icon-question" aria-label="무이자할부안내 팝업 활성화" aria-haspopup="dialog" @click="popupInterestFreeActive"><span
             class="hidden">무이자할부안내</span></button>
            </p>
          </div>
          <PopupCardList @popupEvent="popupAction" v-if="this.popup.popupCardList" :deviceType="deviceType" :pytcCd="pytcCd" :crcoChargDcInfoList="crcoChargDcInfoList" :crcoInfoInfo="crcoInfoInfo" @choiceCardInfoEvent="choiceCardInfoEvent" /> <!--  팝업 - 카드 선택 -->
          <PopupCardMonthly @popupEvent="popupAction" v-if="this.popup.popupCardMonthly" :noInterestCardDetailInfo="noInterestCardDetailInfo" :month="monthly" @choiceCardMonthlyEvent="choiceCardMonthlyEvent" /> <!-- 팝업 - 카드결제 할부 선택 -->
          <PopupInterestFree @popupEvent="popupAction" :noInterestCardDetailInfo="noInterestCardDetailInfo" v-if="(this.popup.popupInterestFree && noIntTextFlag)" /> <!-- 팝업 - 무이자 할부 안내 -->
          <!-- END : 신용카드 -->
          <!-- START : 페이코 -->
          <div id="tab-contents2" class="tabcontents payco credit-card" aria-labelledby="tab2" v-if="isListTab === '04'">
            <ul style="display:inline-block; overflow:hidden;">
                <li style="float:left; margin-right:10px;">
                  <span class="inp-radio mid">
                    <input name="payco-pay-type" class="pay-type" id="payco-pay-type-cash" type="radio" @click="payTypeChg('04', 'MONEY')"/>
                    <label for="payco-pay-type-cash">현금결제</label>
                  </span>
                </li>
                <li style="float:left;">
                  <span class="inp-radio mid">
                    <input name="payco-pay-type" class="pay-type" id="payco-pay-type-card" type="radio" @click="payTypeChg('04', 'CARD')" checked="true"/>
                    <label for="payco-pay-type-card">카드결제</label>
                  </span>
                </li>
            </ul>
            <p class="wrap-select w100" v-show="paycoFleg">
              <button type="button" class="btn-arrow" aria-label="신용카드 팝업 활성화" aria-haspopup="dialog" @click="popupCardList">
                <span v-if="cardFlag">카드를 선택해 주세요.</span>
                <span v-else-if="!cardFlag && crcoInfoInfo != null">
                  <span class="icon-card" ><img v-bind:src="getImgNm(crcoInfoInfo.cardCode)" v-bind:alt="crcoInfoInfo.pytcCardNm"></span>{{crcoInfoInfo.pytcCardNm}}
                </span>
              </button>
            </p>
            <ul class="txt-info-list" v-if="paycoType === 'CARD' || paycoType === ''">
              <!-- (20.12.04) 202017P 문구추가  -->
              <li class="ico-alert2">PAYCO 결제 안내 </li>
              <li class="ico-alert2">휴대폰과 카드명의자가 동일해야 하며 결제 금액 제한은 없습니다. </li>
              <li class="ico-alert2">무이자 할부 혜택은 PAYCO기준으로 적용됩니다.</li>
              <li class="ico-alert2">팝할인, 카드할인 적용이 제한됩니다.</li>
              <li class="ico-alert2">PAYCO 고객센터 1544-6891</li>
            </ul>
            <ul class="txt-info-list" v-if="paycoType === 'MONEY'">
              <!-- (20.12.04) 202017P 문구추가  -->
              <li class="ico-alert2">PAYCO 결제 안내 </li>
              <li class="ico-alert2">계좌이체는 본인 명의 계좌만 이용 가능합니다.</li>
              <!-- (20.11.11) 페이코에서 현금영수증 처리 안함으로 변경 -->
              <!-- <li class="ico-alert2">현금영수증 정보는 PAYCO에서 등록 가능합니다.</li> -->
              <li class="ico-alert2">PAYCO 고객센터 1544-6891</li>
            </ul>
          </div>
          <!-- END : 페이코 -->
          <!-- START : 카카오페이 -->
          <div id="tab-contents6" class="tabcontents credit-card" aria-labelledby="tab6" v-if="isListTab === '05'">
            <ul style="display:inline-block; overflow:hidden;">
                <li style="float:left; margin-right:10px;">
                  <span class="inp-radio mid">
                    <input name="kakao-pay-type" class="pay-type" id="kakao-pay-type-cash" type="radio" @click="payTypeChg('05', 'MONEY')"/>
                    <label for="kakao-pay-type-cash">카카오페이머니결제</label>
                  </span>
                </li>
                <li style="float:left;">
                  <span class="inp-radio mid">
                    <input name="kakao-pay-type" class="pay-type" id="kakao-pay-type-card" type="radio" @click="payTypeChg('05', 'CARD')" checked="true"/>
                    <label for="kakao-pay-type-card">카드결제</label>
                  </span>
                </li>
            </ul>
            <p class="wrap-select w100" v-show="kakaoFleg">
              <button type="button" class="btn-arrow" aria-label="신용카드 팝업 활성화" aria-haspopup="dialog" @click="popupCardList">
                <span v-if="cardFlag">카드를 선택해 주세요.</span>
                <span v-else-if="!cardFlag && crcoInfoInfo != null">
                  <span class="icon-card" ><img v-bind:src="getImgNm(crcoInfoInfo.cardCode)" v-bind:alt="crcoInfoInfo.pytcCardNm"></span>{{crcoInfoInfo.pytcCardNm}}
                </span>
              </button>
            </p>
            <ul class="txt-info-list" v-if="kakaoType === 'CARD' || kakaoType === ''">
              <!-- (20.12.04) 202017P 문구추가  -->
              <li class="ico-alert2">Kakao Pay 결제 안내 </li>
              <li class="ico-alert2">지원 카드 : 국내 모든 신용/체크카드 </li>
              <li class="ico-alert2">무이자 할부 혜택은 Kakao Pay 기준으로 적용됩니다.</li>
              <li class="ico-alert2">팝할인, 카드할인이 제한됩니다.</li>
            </ul>
            <ul class="txt-info-list" v-if="kakaoType === 'MONEY'">
              <!-- (20.12.04) 202017P 문구추가  -->
              <li class="ico-alert2">Kakao Pay 결제 안내 </li>
              <li class="ico-alert2">계좌이체는 본인 명의 계좌만 이용 가능합니다.</li>
              <!-- (20.11.11) 페이코에서 현금영수증 처리 안함으로 변경 -->
              <!-- <li class="ico-alert2">현금영수증 정보는 Kakao Pay에서 등록 가능합니다.</li> -->
            </ul>
          </div>
          <!-- END : 카카오페이 -->
          <!-- START : 계좌이체 -->
          <div id="tab-contents3" class="tabcontents account" aria-labelledby="tab3" v-if="isListTab === '01'">
            <ul class="txt-info-list mt0 mb0">
              <li class="ico-alert2">실시간계좌이체 안내 <button type="button" aria-label="실시간 계좌이체 안내 팝업 활성화" aria-haspopup="dialog" class="btn icon-question" @click="popupAccountActive"><span class="hidden">할인 안내</span></button></li>
              <li class="ico-alert2">실시간 계좌이체로 결제 시 신한 은행의 채무 지급 서비스를 이용하실 수 있습니다. </li>
            </ul>
            <p class="text-right"><a @click="popupShinhanServiceActive()" aria-label="서비스 가입확인 안내 팝업 활성화" aria-haspopup="dialog" class="btn-arrow-right" title="새 창 열림">서비스가입확인</a></p>
          </div>
          <PopupAccountTransfer @popupEvent="popupAction" v-if="this.popup.popupAccountTransfer" /> <!-- 팝업 - 계좌이체 안내 -->
          <MfPopupServiceCheck @popupEvent="popupAction" v-if="this.popup.popupServiceCheck" /> <!-- 팝업 - 서비스 가입확인 안내 -->
          <!-- END : 계좌이체 -->
          <!-- START : 모바일팝 -->
          <div id="tab-contents4" class="tabcontents" aria-labelledby="tab4" v-if="isListTab === '13'">
            <ul class="txt-info-list mt0 mb0">
              <li class="ico-alert2">모바일팝 결제 안내 <button type="button" aria-label="모바일팝 안내 팝업 활성화" aria-haspopup="dialog" class="btn icon-question" @click="popupMobilePopActive"><span class="hidden">모바일팝 안내</span></button></li>
              <li class="ico-alert2">모바일팝 온라인 결제는 ‘모바일팝’ 앱설치 후 이용 가능합니다.</li>
              <li class="ico-alert2">잔액이 부족한 경우 모바일 팝에서 잔액 충전 후 이용하세요.<br>(충전 문의 : 1588-5245)</li>
            </ul>
          </div>
          <PopupMobilePop @popupEvent="popupAction" v-if="this.popup.popupMobilePop" /> <!-- 팝업 - 모바일팝 안내 -->
          <!-- START : 현금영수증 -->
          <CashReceiptIssue ref="recpIssue" v-if="this.CashReceiptIssue" @CashReceiptIssueEvent="CashReceiptIssueEvent" /> <!-- 현금영수증발급 안내 -->
          <!-- END : 현금영수증 -->
          <!-- END : 모바일팝 -->
          <!-- START : 네이버 페이 -->
          <div id="tab-contents5" class="tabcontents" aria-labelledby="tab5" v-if="isListTab === '06'">
            <ul class="txt-info-list mt0">
              <!-- (20.12.04) 202017P 문구추가  -->
              <li class="ico-alert2">네이버페이 결제 안내 </li>
              <li class="ico-alert2">주문 변경 시 카드사 혜택 및 할부 적용여부는 해당 카드사 정책에 따라 변경될 수 있습니다. </li>
              <!--<li class="ico-alert2">네이버 페이는 네이버 id로 별도 앱 설치 없이 신용카드 또는 은행계좌 정보를 등록하여 네이버 페이 비밀번호로 결제할 수 있는 간편 결제 서비스입니다. </li>-->
              <li class="ico-alert2">네이버 페이 카드 결제는 네이버페이에서 제공하는 카드사 별 무이자, 청구할인 혜택을 받을 수 있습니다.</li>
              <li class="ico-alert2">팝카드할인, 카드할인이 제한됩니다.</li>
            </ul>
          </div>
          <!-- END : 네이버 페이 -->
          <!-- START : 휴대폰 소액결제 -->
          <div id="tab-contents7" class="tabcontents" aria-labelledby="tab7" v-if="isListTab === '10'">
            <ul class="txt-info-list mt0">
              <li class="ico-alert2">휴대폰 소액결제 안내 <button type="button" aria-label="휴대폰 소액결제 안내 팝업 활성화" aria-haspopup="dialog" class="btn icon-question" @click="popupMicroPopActive"><span class="hidden">휴대폰 소액결제 안내</span></button></li>
            </ul>
          </div>
          <PopupMicropayments @popupEvent="popupAction" v-if="this.popup.popupMicropayments" /> <!-- 팝업 - 소액결제 안내 -->
          <!-- END : 휴대폰 소액결제 -->
          <!-- START : GS&POINT -->
          <div id="tab-contents8" class="tabcontents" aria-labelledby="tab8" v-if="isListTab === '99'">
            <ul class="txt-info-list mt0  mb0">
              <li class="ico-alert2">
                <div class="gs-point-wrap gs-point">
                  <p class="point-area"><span class="point">보유포인트 {{this.toComma(viewGsNPoint)}}P</span>
                    <span class="inp-chk small"><input type="checkbox" name="useAllPntChkbox" id="useAllPntChkbox" :disabled="totAmt > gsNPoint" @change="usePointAll($event)"><label for="payAll">모두사용</label></span>
                  </p>
                  <p class="discount-point">
                    <span class="txt-use">
                      <input type="number" id="gsNPointBox" :disabled="totAmt > gsNPoint" v-model="gsNPointBox" title="GS&amp;POINT 사용할 포인트" class="inp-txt"><span class="txt-p">P</span>
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <!-- END : GS&POINT -->
          <p v-if="payCallType.length === 0" class="agree-save">
            <span class="inp-chk bg">
              <input type="checkbox" name="" id="agreeSave" value="" @change="setUserPayInfo($event, null)" :checked="(custReqTdrMeansCd != null && custReqTdrMeansCd !== '') ? true : false"/>
              <label for="agreeSave">선택한 결제수단 저장</label>
            </span>
          </p>
          <!-- 모바일 isp app download event -->
          <!--
          <div v-if="ispGbn">
            <button type="button" class="btn-border btn-bg" @click="downloadISP();">isp 앱다운로드</button>
          </div>
          -->
          <!-- END : 모바일 isp app download event -->
          <!-- URL 추가결제용 Description -->
          <div  v-if="productNm === '추가결제_URL'">
            <ul class="txt-info-list color-bk">
              <li class="ico-alert2">10분 안에 결제를 완료해야 정상 접수처리 됩니다.</li>
              <li class="ico-alert2">10분 초과 시, 해당 클레임을 자동으로 철회됩니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- END : 일반 결제 -->
  </section>
</template>

<script>
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import AccordionMixin from '@/mixins/AccordionMixin';
import PopupCardList from '@/views/od/MfPopupCCardList'; // 팝업 - 신용카드 선택
import PopupCardMonthly from '@/views/od/PopupCardTdrInstlList'; // 팝업 - 카드결제 할부 선택
import PopupInterestFree from '@/views/od/PopupFoiInstlInfo'; // 팝업 - 무이자 할부 안내
import PopupAccountTransfer from '@/views/od/PopupAcntTrsfInfo'; // 팝업 - 계좌이체 안내
import PopupMobilePop from '@/views/od/MfPopupMobilPopInfo'; // 팝업 - 모바일 팝 안내
import PopupMicropayments from '@/views/od/PopupMobilSamtTdrInfo'; // 팝업 - 소액결제 안내
import MfPopupServiceCheck from '@/views/od/MfPopupServiceCheck'; // 팝업 - 서비스가입확인 안내
import CashReceiptIssue from '@/components/order/MfCashReceiptIssue'; // 현금영수증발급안내
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import MfOrderMsg from '@/components/order/MfOrderMsg'; // 주문 메세지항목
export default {
  props: {
    totAmt: Number,
    deviceType: String,
    ordId: String,
    dlvDelivYn: String,
    payCallType: Array,
    gsNPoint: Number,
    productNm: String,
    crcoEvntInfo: Object, // 카드모바일팝선할인시 주문고유기능
  },
  name: "PaymentNormal",
  data() {
    return {
      popup: { // 팝업
        open: false,
        popupCardList: false, // 신용카드 선택
        popupCardMonthly: false, // 카드결제 할부선택
        popupInterestFree: false, // 무이자 할부 안내
        popupAccountTransfer: false, // 계좌이체 안내
        popupMobilePop: false, // 모바일팝 안내
        popupMicropayments: false, // 소액결제 안내
        popupServiceCheck: false, // 서비스가입확인 안내
      },
      isListTab: '02', // 결제수단 신용카드 선택
      custReqTdrMeansCd: '', // 고객결제수단
      custCrcoCd: '', // 고객결제수단 카드일경우
      swiperRegCard: {
        slidesPerView: 1.4,
        // spaceBetween: 10,
        centeredSlides: true,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      tdrMeansList: null, // 결제수단목록
      crcoInstlInfoList: null, // 카드사할부정보목록
      crcoChargDcInfoList: null, // 카드사청구할인정보목록
      noInterestCardDetailInfoList: null, // 카드사무이자할부정보목록
      noInterestCardDetailInfo: null, // 카드사무이자할부정보
      cardFlag: true,
      crcoCd: '',
      monthlyFlag: true,
      monthlyText: '일시불',
      crcoInfoInfo: null,
      monthly: '02',
      noIntYn: false, // 무이자 여부
      noIntTextFlag: false, // 카드무이자정보플래그
      payNoticeTextFlag: false, // 결제공지사항플래그
      AccountCashReceiptIssue: false, //
      MoblPopCashReceiptIssue: false, //
      CashReceiptIssue: false, //
      cashRcpctInfo: {}, // 현금영수증발행여부
      kakaoFleg: false,
      kakaoType: '',
      paycoFleg: false,
      paycoType: '',
      mstPytcCd: '', // 마스터 결재사
      gsNPointBox: '', // 추가결제 - GS&Point textbox
      viewGsNPoint: this.gsNPoint, // 추가결제 - GS&Point 화면노출용
      tempGsNPoint: 0, // 추가결제 - GS&Point 임시저장용
      lockPay: false,
      ispGbn: false,
    };
  },
  mixins: [AccordionMixin],
  components: {
    // swiper,
    // swiperSlide,
    PopupCardList, // 팝업 - 신용카드 선택
    PopupCardMonthly, // 팝업 - 카드결제 할부 선택
    PopupInterestFree, // 팝업 - 무이자 할부 안내
    PopupAccountTransfer, // 팝업 - 계좌이체 안내
    PopupMobilePop, // 팝업 - 모바일팝 안내
    PopupMicropayments, // 팝업 - 소액결제 안내
    CashReceiptIssue, // 현금영수증발급안내
    MfPopupServiceCheck, // 팝업 - 서비스가입확인 안내
  },
  watch: {
    async crcoEvntInfo() {
      this.lockPay = false;
      if (this.crcoEvntInfo != null) {
        if (this.crcoEvntInfo != undefined && this.crcoEvntInfo != null) {
          this.listTabActive(this.crcoEvntInfo.tdrMeansCd);
          // 카드일경우 default
          if (this.crcoEvntInfo.tdrMeansCd === '02') {
            const response = await ApiUtils.get('/fo/pa/retrievePytcRepCard' + ((this.deviceType === "PC") ? "Pc" : "Mob") +'/'+this.crcoEvntInfo.pytcCd);
            const crcoInfoList = response.data.pytcRepCardList;
            for (let i=0; i < crcoInfoList.length; i++) {
              if (!!crcoInfoList[i] && !!this.crcoEvntInfo
                && crcoInfoList[i].pytcCd == this.crcoEvntInfo.pytcCd
                && crcoInfoList[i].crcoCd == this.crcoEvntInfo.cardBuyCoCd) {
                this.choiceCardInfoEvent(crcoInfoList[i]);
              }
            }
          }
        }
      }
      if (this.crcoEvntInfo != null) {
        this.lockPay = this.crcoEvntInfo.lockPay;
      }
    },
    crcoInfoInfo: function() {
      if (this.crcoInfoInfo != null) {
        this.cardFlag = false;
        const agreeSave = document.querySelectorAll('#agreeSave');
        if (agreeSave !== undefined && agreeSave !== null && agreeSave.length > 0) { // 카드변경시 결제수단저장
          if (agreeSave[0].checked === false) {
            this.setUserPayInfo(null, null);
          } else {
            this.setUserPayInfo(null, 'TAB');
          }
        }
      } else {
        this.cardFlag = true;
      }
    },
    monthly: function() {
      if (this.monthly === '01') {
        this.monthlyText = "일시불";
      } else {
        this.monthlyText = `${parseInt(this.monthly)}개월${this.noIntYn === 'Y' ? ' (무이자)' : ''}`;
      }
    },
    totAmt: function() {
      this.cardInterestInfo();
      if (this.totAmt < 50000) {
        this.monthlyFlag = true;
        // 선택된 할부개월수 초기화
        const monthlyInfo = {
          monthly: '01',
          noIntYn: 'N',
        };
        this.$emit('paymentNormalMonthlyEvent', monthlyInfo, this.noInterestCardDetailInfo);
      } else {
        this.monthlyFlag = false;
      };
    },
    gsNPoint: function() {
      this.viewGsNPoint = this.gsNPoint;
    },
    custReqTdrMeansCd: function() { // 타업무 겹치는 문제 해당 결제 수단이 있는지 확인후 focus
      if (this.custReqTdrMeansCd !== null && this.custReqTdrMeansCd !== '') {
        for (let i=0; i < this.tdrMeansList.length; i++) {
          if (this.tdrMeansList[i].tdrMeansCd === this.custReqTdrMeansCd) {
            this.listTabActive(this.custReqTdrMeansCd);
            this.setUserPayInfo(null, 'TAB'); // 최초진입시 렌더차이
          }
        }
      }
    },
    async custCrcoCd() {
      if (this.custReqTdrMeansCd !== null && this.custReqTdrMeansCd === '02') {
        const response = await ApiUtils.get('/fo/pa/retrievePytcRepCard' + ((this.deviceType === "PC") ? "Pc" : "Mob") +'/'+this.pytcCd);
        const crcoInfoList = response.data.pytcRepCardList;
        for (let i=0; i < crcoInfoList.length; i++) {
          if (crcoInfoList[i].pytcCd == this.pytcCd
          && crcoInfoList[i].crcoCd == this.custCrcoCd) {
            this.choiceCardInfoEvent(crcoInfoList[i]);
          }
        }
        this.setUserPayInfo(null, 'TAB'); // 최초진입시 렌더차이
      }
    },
  },
  methods: {
    // 팝업
    popupAction(type) { // 팝업 활성/비활성
      this.popup[type] = !this.popup[type];
      this.popup.open = !this.popup.open;
    },
    async popupCardList() {
      if (this.lockPay === true) { // 카드할인 선택한 후에는 결제수단변경 안됨
        const confirmYn = await this.$gsdialog.confirm(MfOrderMsg.cardDisValidPayType, {html: true});
        if (!confirmYn) return;
        // Confirm 여부가 true인 경우 카드할인 정보를 취소 시킨다.
        this.$emit('setCardDisEvent', null);
      }
      this.popupAction('popupCardList');
    },
    popupCardMonthlyActive() {
      if (this.crcoInfoInfo != null) {
        this.popupAction('popupCardMonthly');
      } else {
        this.$gsdialog.alert(OrderMsg.selectCard);
      }
    },
    popupInterestFreeActive() {
      this.popupAction('popupInterestFree');
    },
    popupAccountActive() {
      this.popupAction('popupAccountTransfer');
    },
    popupMobilePopActive() {
      this.popupAction('popupMobilePop');
    },
    popupMicroPopActive() {
      this.popupAction('popupMicropayments');
    },
    popupShinhanServiceActive() {
      this.popupAction('popupServiceCheck');
    },
    downloadISP() { // isp 버튼 이벤트
      const userAgent = navigator.userAgent.toLocaleLowerCase();
      const isChrome = (userAgent.search("crios/") > -1);
      const isApp = (userAgent.search("gssmapp") > -1 || userAgent.search("dalisalda") > -1);
      const isAndroid = (userAgent.search("android") > -1);
      const isiOS = (userAgent.search("iphone") > -1 || userAgent.search("ipod") > -1 || userAgent.search("ipad") > -1);
      if (isApp) {
        // 앱 접속 유저, webview controller의 override로 재정의된 window.open 함수 이용
        if (isiOS) {
          window.open("http://itunes.apple.com/kr/app/id369125087?mt=8", "appStore", "");
        } else if (isAndroid) {
          window.open("http://mobile.vpay.co.kr/jsp/MISP/andown.jsp", "googleStore", "");
        } else {
          this.$gsdialog.alert("해당 기기는 모바일 ISP 결제를 지원하지 않습니다.");
        }
      } else {
        // 브라우저 접속 유저
        if (isiOS) {
          if (chrome) {
            // iOS Chrome
            window.open("http://itunes.apple.com/kr/app/id369125087?mt=8", "appStore", "");
          } else {
            // iOS Safari
            window.location.href = 'http://itunes.apple.com/kr/app/id369125087?mt=8';
          }
        } else if (isAndroid) {
          window.open("http://mobile.vpay.co.kr/jsp/MISP/andown.jsp", "googleStore", "");
        } else {
          this.$gsdialog.alert("해당 브라우저는 모바일 ISP 결제를 지원하지 않습니다.");
        }
      }
    },
    async getUserPayInfo() {
      const result = await ApiUtils.get('/fo/cu/mbrmgnt/member-information', null);
      if (result.data.success && result.data.data.custReqTdrMeansCd !== null && result.data.data.custReqTdrMeansCd != '') {
        this.custReqTdrMeansCd = result.data.data.custReqTdrMeansCd;
      } else {
        // [선택한 결제수단 저장] 체크박스는 최초 결제화면 진입 시 default로 선택 되어야 한다. (기본 선택 결제 수단 : 신용카드[02])
        this.custReqTdrMeansCd = '02';
      }
      if (result.data.success && result.data.data.crcoCd !== null && result.data.data.crcoCd != '') {
        this.custCrcoCd = result.data.data.crcoCd;
      }
    },
    async setUserPayInfo(e, type) {
      const param = {};
      if (this.isListTab === '02' && this.crcoInfoInfo !== null) {
        param.crcoCd = this.crcoInfoInfo.crcoCd;
      } else {
        param.crcoCd = '';
      }

      if (e !== null && e.target.checked == true) {
        param.custReqTdrMeansCd = this.isListTab;
      } else if (type != null && type === 'TAB') {
        param.custReqTdrMeansCd = this.isListTab;
      } else {
        param.crcoCd = '';
        param.custReqTdrMeansCd = '';
      }
      const result = await ApiUtils.put('/fo/cu/mbrmgnt/member-order-information', param);
    },
    payTypeChg(gbn, type) {
      if (gbn === null) {
        this.kakaoFleg = false;
        this.kakaoType = '';
        this.paycoFleg = false;
        this.paycoType = '';
        this.pytcCd = this.mstPytcCd;
        const radio = document.querySelectorAll('.pay-type');
        for (let i=0; i < radio.length; i++) {
          radio[i].checked = false;
        }
      } else {
        if ((gbn === '04' || gbn === '05') && type === 'CARD') {
          if (gbn === '04') {
            const radio = document.querySelectorAll('.pay-type');
            if (radio !== undefined && radio.length > 0) {
              radio[1].checked = true;
            }
            this.paycoFleg = true;
            this.paycoType = type;
            this.pytcCd = '04';
          } else {
            const radio = document.querySelectorAll('.pay-type');
            if (radio !== undefined && radio.length > 0) {
              radio[1].checked = true;
            }
            this.kakaoFleg = true;
            this.kakaoType = type;
            this.pytcCd = '05';
          }
        } else {
          this.pytcCd = this.mstPytcCd;
          this.kakaoFleg = false;
          this.paycoFleg = false;
          if (gbn === '05') {
            this.kakaoType = type;
          } else if (gbn === '04') {
            this.paycoType = type;
          }
        }
        // 페이코-계좌이체, 카카오페이-현금결제면 현금영수증 노출
        this.checkCashRecptIsse(gbn, type);
      }
      this.$emit('payTypeChg', gbn, type);
    },
    // 결제방법 선택
    listTabActive(el) {
      // if (el === '01') {
      //   this.$gsdialog.alert('계좌이체 서비스는 준비중입니다.');
      //   return;
      // }
      this.ispGbn = false;
      if (this.lockPay === true) { // 카드할인 선택한 후에는 결제수단변경 안됨
        this.$gsdialog.alert(OrderMsg.cardDisValidPayType);
        return false;
      }
      // 카드정보 초기화
      this.crcoInfoInfo = null;
      this.$emit('paymentNormalCCardEvent', this.crcoInfoInfo);
      // 신카 할부정보
      if (el == '02') {
        this.cardInterestInfo();
      }
      const list = document.querySelectorAll('.payment-list li');
      this.isListTab = el;
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('active');
      }
      document.getElementById('liTab' + this.isListTab).classList.add('active');
      // this.$refs.tabContents.focus();
      this.checkCashRecptIsse(el);
      this.$emit('paymentNormalEvent', el);
      const agreeSave = document.querySelectorAll('#agreeSave');
      if (agreeSave !== undefined && agreeSave !== null && agreeSave.length > 0) { // 탭변경시 결제수단저장
        if (agreeSave[0].checked === false) {
          this.setUserPayInfo(null, null);
        } else {
          this.setUserPayInfo(null, 'TAB');
        }
      }
      if (el === '04') {
        this.payTypeChg('04', 'CARD');
      } else if (el === '05') {
        this.payTypeChg('05', 'CARD');
      } else {
        // easyPayType 초기화
        this.payTypeChg(null, null);
      }
    },
    // PG사, 결제수단목록, 카드사행사목록
    async retrievelistTrdMeans() {
      const responsePgInfo = await ApiUtils.get('/fo/od/ordsmgnt/pay-mean-pgcompany', '');
      this.mstPytcCd = responsePgInfo.data.data.pytcCd; // PG사 코드 카카오 페이코 카드목록이 생겨서 추가됨
      this.pytcCd = responsePgInfo.data.data.pytcCd; // PG사 코드
      this.pytcNm = responsePgInfo.data.data.pytcNm; // PG사 명
      // this.pytcNm = "스마트로"; // 09 : KCP, 02:스마트로
      // this.pytcCd = "02"; // 09 : KCP, 02:스마트로
      // 결제수단 필요목록만 가져오게 변경
      const tdrMeansInfoList = [];
      if (this.payCallType !== "undefined" && this.payCallType.length > 0) {
        for (let i=0; i < this.payCallType.length; i++) {
          const tdrMeansInfoDto = {};
          tdrMeansInfoDto.tdrMeansCd = this.payCallType[i];
          tdrMeansInfoList.push(tdrMeansInfoDto);
        }
      }
      const params = {
        tdrMeansInfoList: tdrMeansInfoList
      };
      // 결제수단목록
      const response = await ApiUtils.post('/fo/od/ordsmgnt/pay-mean-list', params);
      this.tdrMeansList = response.data.data.tdrMeansInfoList;
      if (this.payCallType.length === 3) { // [추가결제 - GS&Point 추가]
        const pointTdrMeans = {
          tdrMeansCd: '99',
          tdrMeansDtlCd: '06',
          tdrMeansNm: 'GS&POINT',
          optYn: null
        };
        this.tdrMeansList.push(pointTdrMeans);
      }
      const iCrcoEvntListInq = {
        pytcCd: this.pytcCd,
      };
      // 카드사할인정보목록
      const responseCadEvnt = await ApiUtils.get('/fo/od/ordsmgnt/card-company-charg-dc-event-list', iCrcoEvntListInq);
      // console.log('responseCadEvnt', responseCadEvnt);
      if (responseCadEvnt.data.data.crcoInstlInfoList != null) {
        this.crcoInstlInfoList = responseCadEvnt.data.data.crcoInstlInfoList;
      }
      // 카드사청구할인정보목록
      if (responseCadEvnt.data.data.crcoChargDcInfoList != null && responseCadEvnt.data.data.crcoChargDcInfoList.length != 0) {
        this.crcoChargDcInfoList = responseCadEvnt.data.data.crcoChargDcInfoList;
        for (let i = 0; i < this.crcoChargDcInfoList.length; i++) {
          if (i == 0) {
            this.crcoNm = this.crcoChargDcInfoList[i].crcoNm;
          } else {
            this.crcoNm = this.crcoNm+"/"+this.crcoChargDcInfoList[i].crcoNm;
          }
          if (i == 0) {
            this.crcoChargDcPosbAmt = this.crcoChargDcInfoList[i].crcoChargDcPosbAmt;
            this.crcoChargDcEndDt = this.crcoChargDcInfoList[i].crcoChargDcEndDt;
            this.evntApplStandAmt = this.crcoChargDcInfoList[i].evntApplStandAmt;
            this.crcoChargDcrt = this.crcoChargDcInfoList[i].crcoChargDcrt;
          }
        }
        if (this.crcoNm != '') {
          this.saleTextFlag = true;
        }
        this.$emit('setCrcoChargDcInfo', this.crcoChargDcInfoList);
      }
      // 유저결제수단정보
      this.getUserPayInfo();
      this.$emit('paymentPGComPanyEvent', this.pytcCd, this.pytcNm);
    },
    // 무이자목록 조회
    async cardInterestInfo() {
      const noInterestCardInfoReq = {
        mid: null,
        payAmt: this.totAmt,
      };
      // console.log("noInterestCardInfoReq : ", noInterestCardInfoReq);
      // 카드무이자할부정보 목록조회
      const responseNoIntCardEvnt = await ApiUtils.post('/fo/pa/requestNoInterestInfo', JSON.stringify(noInterestCardInfoReq));
      this.noInterestCardDetailInfoList = responseNoIntCardEvnt.data.noInterestCardDetailInfoList;
      // console.log("paymentNormal this.noInterestCardDetailInfoList", this.noInterestCardDetailInfoList);
    },
    // 선택된 카드정보
    choiceCardInfoEvent(cardInfo) {
      this.noInterestCardDetailInfo = null;
      this.crcoInfoInfo = cardInfo;
      this.ispGbn = (this.crcoInfoInfo.mobilCertReqTypeCd !== undefined &&
      this.crcoInfoInfo.mobilCertReqTypeCd !== null &&
      this.crcoInfoInfo.mobilCertReqTypeCd == 'ISP') ? true : false;
      // console.log(this.crcoInfoInfo.mobilCertReqTypeCd);
      if (this.noInterestCardDetailInfoList != null) {
        for (let i = 0; i < this.noInterestCardDetailInfoList.length; i++) {
          if (this.crcoInfoInfo.crcoCd === this.noInterestCardDetailInfoList[i].crcoCd) {
            this.noInterestCardDetailInfo = this.noInterestCardDetailInfoList[i];
            this.noInterestCardDetailInfoList[i].cardNm = this.crcoInfoInfo.pytcCardNm;
            this.noInterestCardDetailInfo.cardNm = this.crcoInfoInfo.pytcCardNm;
          }
        }
      }
      this.$emit('paymentNormalCCardEvent', this.crcoInfoInfo);
      // 무이자할부정보가 있으면 선택된 카드의 무이자할부정보를 보여준다.
      if (this.noInterestCardDetailInfo != null) {
        this.noIntTextFlag = true;
      } else {
        this.noIntTextFlag = false;
      }
      this.monthly = "01";
    },
    // 선택된 할부개월수
    choiceCardMonthlyEvent(monthlyInfo, noInterestCardDetailInfo) {
      this.monthly = monthlyInfo.monthly;
      this.noIntYn = monthlyInfo.noIntYn;
      this.$emit('paymentNormalMonthlyEvent', monthlyInfo, noInterestCardDetailInfo);
    },
    checkCashRecptIsse(el, type) {
      if (el === '01' || el === '13') { // 계좌이체면 현금영수증 영역 노출
        this.CashReceiptIssue = true;
      } else if (el === '04' || el === '05') { // 페이코-계좌이체, 카카오페이-현금결제면 현금영수증 영역 노출
        if (type === 'MONEY') {
          this.CashReceiptIssue = true;
        } else {
          this.CashReceiptIssue = false;
        }
      } else {
        this.CashReceiptIssue = false;
      }
    },
    // 현금영수증발급신청 이벤트
    async CashReceiptIssueEvent(cashRcpctInfo) {
      this.cashRcpctInfo = cashRcpctInfo;
      // 현금영수증 정보를 저장한다.
      const param = {
        ordId: this.ordId,
        cashRecptIssuTypeCd: this.cashRcpctInfo.cashRecptIssuTypeCd,
        cashRecptInputNo: this.cashRcpctInfo.encCashRecptInputNo,
        cashRecptIssuYn: this.cashRcpctInfo.cashRecptIssuYn,
      };
      // 현금영수증 이벤트 처리
      this.$emit('CashReceiptIssueEvent', this.cashRcpctInfo);
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    toFormat(dt, type) {
      return DateUtils.format(dt, type);
    },
    getImgNm: function (cd) {
      // 이미지가 바로 로딩이 안되기 때문에 require를 사용하여 이미지를 랜더링하여야 함.
      return require('@/assets/images/icon/icon_card_logo'+cd+'.png');
    },
    // 결제공지사항 조회
    async retrievelistPayNotice() {
      const payNoticeInq = {
        moblTp: '2', // 모바일만 조회
        annceType: '01', // 결제 공지사항
      };
      // console.log("payNoticeInq : ", payNoticeInq);
      const response = await ApiUtils.get('/fo/od/ordsmgnt/pay-notice', payNoticeInq);
      this.payNoticeList = response.data.data.payNoticeInfoList;
      if (this.payNoticeList !== null && this.payNoticeList.length > 0) {
        this.payNoticeTextFlag = true;
      }
    },
    usePointAll(e) {
      if (e.target.checked == true) {
        // console.log("잔여포인트: "+ this.gsNPoint +", 결제 금액:"+ this.totAmt);
        if ( this.totAmt <= this.gsNPoint) {
          this.gsNPointBox = this.totAmt;
          this.tempGsNPoint = this.viewGsNPoint;
          this.viewGsNPoint = this.tempGsNPoint - this.totAmt;
        }
      } else {
        this.gsNPointBox = '';
        this.viewGsNPoint = this.tempGsNPoint;
      }
    },
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
  },
  mounted() {
    // 결제수단 조회
    this.retrievelistTrdMeans();
    // 결제공지사항 조회
    this.retrievelistPayNotice();
    // 결제무이자정보
    this.cardInterestInfo();
    if (this.totAmt < 50000) {
      this.monthlyFlag = true;
    } else {
      this.monthlyFlag = false;
    };
  },
};
</script>
