<template>
  <section class="section-area accordion-wrap">
    <!-- STRAT : 간편 결제
    <div class="sub-title tit-accordion">
      <h2>
        <button type="button" id="paymentSimpleAccordion" class="tit" aria-controls="paymentSimpleAccordionContent" aria-expanded="true" @click="accordionEvent">
          간편 결제
        </button>
      </h2>
    </div>
    <div id="paymentSimpleAccordionContent" class="accordion-content payment-simple" aria-labelledby="paymentSimpleAccordion">
      START : 신규카드 등록
      <div class="card-registration-slide">
        <div class="card-info">
          <button type="button" class="btn-reg">신용/체크 카드를 등록하시면<br> 원클릭 결제가 가능합니다.</button>
        </div>
      </div>
      END : 신규카드 등록
      START : 등록된 카드 있을 경우
      <ul class="txt-info-list">
        <li class="ico-alert2">5만원 이상 결제 시 5% 청구할인(~11.30까지) <span class="color-gray">최대1만원</span></li>
        <li class="ico-alert2">BC카드 6개월 무이자 할부 신청이 가능합니다.</li>
      </ul>
      <div class="card-registration-slide">
        <swiper :options="swiperRegCard">
          <swiper-slide>
            <div class="card-info">
              <dl class="card-detail">
                <dt><span class="icon-card"><img src="@/assets/images/icon/icon_card_logo1.png" alt="카드사 로고"></span> BC카드</dt>
                <dd class="card-number">9200 25** **** **22<br>우리 블루다이아몬드 카드</dd>
                <dd class="select-month">
                  <span class="wrap-select w100">
                    <button type="button" class="btn-arrow" aria-label="카드결제 할부선택 팝업 활성화" aria-haspopup="dialog" @click="popupCardMonthlyActive" disabled>일시불</button>
                  </span>
                </dd>
              </dl>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="card-info">
              <dl class="card-detail">
                <dt><span class="icon-card"><img src="@/assets/images/icon/icon_card_logo3.png" alt="카드사 로고"></span> 신한카드</dt>
                <dd class="card-number">9200 25** **** **22<br>우리 블루다이아몬드 카드</dd>
                <dd class="select-month">
                  <span class="wrap-select w100">
                    <button type="button" class="btn-arrow" aria-label="카드결제 할부선택 팝업 활성화" aria-haspopup="dialog" @click="popupCardMonthlyActive">일시불</button>
                  </span>
                </dd>
              </dl>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      END : 등록된 카드 있을 경우
      <p class="btn-add-card">
        <button type="button" class="btn-border btn-small">카드추가</button>
        <button type="button" class="btn-border btn-small">설정</button>
      </p>
    </div>
    END : 간편 결제 -->
    <!-- STRAT : 일반 결제 -->
    <div class="sub-title tit-accordion">
      <h2>
        <button type="button" id="paymentNormalAccordion" class="tit" aria-controls="paymentNormalAccordionContent" aria-expanded="true" @click="accordionEvent">
          일반 결제
        </button>
      </h2>
    </div>
    <div id="paymentNormalAccordionContent" class="accordion-content" aria-labelledby="paymentNormalAccordion">
      <div class="sub-inner-box">
        <!-- START : 결제방법 -->
        <div>
          <ul class="payment-list">
            <!-- <li v-for="(tdrMeansInfo, idx) in tdrMeansList" v-bind:key="tdrMeansInfo.trdMeansCd" v-bind:class="{active : idx == '1'}">
              <button type="button" v-bind:id="'tab'+idx" class="btn-border" aria-controls="tab-contents1" @click="listTabActive(idx);">{{tdrMeansInfo.tdrMeansNm}}</button>
            </li>
            <li class="active"><button type="button" id="tab1" class="btn-border" aria-controls="tab-contents1" @click="listTabActive(0)">신용카드</button></li>
            <li><button type="button" id="tab2" class="btn-border" aria-controls="tab-contents2" @click="listTabActive(1)">페이코</button></li>
            <li><button type="button" id="tab3" class="btn-border" aria-controls="tab-contents3" @click="listTabActive(2)">계좌이체</button></li>
            <li><button type="button" id="tab4" class="btn-border" aria-controls="tab-contents4" @click="listTabActive(3)">모바일팝(선불)</button></li>
            <li><button type="button" id="tab5" class="btn-border" aria-controls="tab-contents5" @click="listTabActive(4)">네이버 페이</button></li>
            <li><button type="button" id="tab6" class="btn-border" aria-controls="tab-contents6" @click="listTabActive(5)">카카오페이</button></li>
            <li><button type="button" id="tab7" class="btn-border" aria-controls="tab-contents7" @click="listTabActive(6)">휴대폰 소액결제</button></li> -->
          </ul>
        </div>
        <!-- END : 결제방법 -->
        <div ref="tabContents" tabindex="0">
          <!-- START : 신용카드 -->
          <div id="tab-contents1" class="tabcontents credit-card" aria-labelledby="tab1" v-if="isListTab === 0">
            <p class="wrap-select w100">
              <button type="button" class="btn-arrow" aria-label="신용카드 팝업 활성화" aria-haspopup="dialog" @click="popupCardList">
                <span v-if="cardFlag">카드를 선택해 주세요.</span>
                <span v-else>
                  <span class="icon-card" ><img v-bind:src="getImgNm(crcoInfoInfo.cardBuyCoCd)" v-bind:alt="crcoInfoInfo.pytcCardNm"></span>{{crcoInfoInfo.pytcCardNm}}
                </span>
              </button>
            </p>
            <p class="wrap-select w100" v-if="monthlyFlag">
              <button type="button" class="btn-arrow disabled" disabled>일시불</button> <!-- 비활성화일 경우 -->
            </p>
            <p class="wrap-select w100" v-else>
               <button type="button" class="btn-arrow" aria-label="카드결제 할부선택 팝업 활성화" aria-haspopup="dialog" @click="popupCardMonthlyActive">{{monthlyText}}</button>
            </p>
             <!-- 5% 청구할인 데이터 확인 필요 -->
            <!-- <ul class="txt-info-list color-bk mt0">
              <li class="ico-alert2">{{crcoNm}}카드 {{toComma(evntApplStandAmt)}}원 이상 결제 시 {{crcoChargDcrt}}% 청구할인(~{{toFormat(crcoChargDcEndDt, 'MM.DD')}}까지) <span class="color-gray">최대{{toComma(crcoChargDcPosbAmt)}}원</span></li>
              <li class="ico-alert2" v-if="noIntTextFlag">{{noInterestCardDetailInfo.pytcCardCode}} {{(noInterestCardDetailInfo.installment).replace(/:/gi, ",")}}개월 무이자 할부 신청이 가능합니다.</li>
            </ul> -->
            <p class="btn-monthly-info">
              무이자할부안내 <button type="button" class="btn icon-question" aria-label="무이자할부안내 팝업 활성화" aria-haspopup="dialog" @click="popupInterestFreeActive"><span
             class="hidden">무이자할부안내</span></button>
            </p>
          </div>
          <PopupCardList @popupEvent="popupAction" v-if="this.popup.popupCardList" :crcoChargDcInfoList="crcoChargDcInfoList" :crcoInfoInfo="crcoInfoInfo" @choiceCardInfoEvent="choiceCardInfoEvent" /> <!--  팝업 - 카드 선택 -->
          <PopupCardMonthly @popupEvent="popupAction" v-if="this.popup.popupCardMonthly" :noInterestCardDetailInfo="noInterestCardDetailInfo" :month="monthly" @choiceCardMonthlyEvent="choiceCardMonthlyEvent" /> <!-- 팝업 - 카드결제 할부 선택 -->
          <PopupInterestFree @popupEvent="popupAction" :noInterestCardDetailInfoList="noInterestCardDetailInfoList" v-if="this.popup.popupInterestFree" /> <!-- 팝업 - 무이자 할부 안내 -->
          <!-- END : 신용카드 -->
          <!-- START : 페이코 -->
          <div id="tab-contents2" class="tabcontents payco" aria-labelledby="tab2" v-if="isListTab === 2">
            <ul class="txt-info-list">
              <li class="ico-alert2">PAYCO는 온/오프라인 쇼핑은 물론 송금, 멤버십 적립까지 가능한 통합 서비스입니다. </li>
              <li class="ico-alert2">휴대폰과 카드명의자가 동일해야 하며 결제 금액 제한은 없습니다. </li>
              <li class="ico-alert2">지원 카드 : 국내 모든 신용/체크카드</li>
              <li class="ico-alert2">무이자 할부 혜택은 PAYCO기준으로 적용됩니다.</li>
              <li class="ico-alert2">팝할인, 카드할인 적용이 제한됩니다. </li>
              <li class="ico-alert2">PAYCO 고객센터 1544-6891</li>
            </ul>
          </div>
          <!-- END : 페이코 -->
          <!-- START : 계좌이체 -->
          <div id="tab-contents3" class="tabcontents account" aria-labelledby="tab3" v-if="isListTab === 1">
            <ul class="txt-info-list mt0 mb0">
              <li class="ico-alert2">실시간계좌이체 안내 <button type="button" aria-label="실시간 계좌이체 안내 팝업 활성화" aria-haspopup="dialog" class="btn icon-question" @click="popupAccountActive"><span class="hidden">할인 안내</span></button></li>
              <li class="ico-alert2">실시간 계좌이체로 결제 시 신한 은행의 채무 지급 서비스를 이용하실 수 있습니다. </li>
            </ul>
            <p class="text-right"><a href="https://www.gsisuper.com/jsp/common/Pop_ShinhanService.html" target="_blank" class="btn-arrow-right" title="새 창 열림">서비스가입확인</a></p>
            <!-- START : 현금영수증 -->
            <CashReceiptIssue v-if="this.AccountCashReceiptIssue" @CashReceiptIssueEvent="CashReceiptIssueEvent" /> <!-- 현금영수증발급 안내 -->
            <!-- END : 현금영수증 -->
          </div>
          <PopupAccountTransfer @popupEvent="popupAction" v-if="this.popup.popupAccountTransfer" /> <!-- 팝업 - 계좌이체 안내 -->
          <!-- END : 계좌이체 -->
          <!-- START : 모바일팝 -->
          <div id="tab-contents4" class="tabcontents" aria-labelledby="tab4" v-if="isListTab === 6">
            <ul class="txt-info-list mt0 mb0">
              <li class="ico-alert2">모바일팝 결제 안내 <button type="button" aria-label="모바일팝 안내 팝업 활성화" aria-haspopup="dialog" class="btn icon-question" @click="popupMobilePopActive"><span class="hidden">모바일팝 안내</span></button></li>
              <li class="ico-alert2">모바일팝 온라인 결제는 ‘모바일팝’ 앱설치 후 이용 가능합니다.</li>
              <li class="ico-alert2">잔액이 부족한 경우 모바일 팝에서 잔액 충전 후 이용하세요.<br>(충전 문의 : 1588-5245)</li>
            </ul>
            <!-- START : 현금영수증 -->
            <CashReceiptIssue v-if="this.MoblPopCashReceiptIssue" @CashReceiptIssueEvent="CashReceiptIssueEvent" /> <!-- 현금영수증발급 안내 -->
            <!-- END : 현금영수증 -->
          </div>
          <PopupMobilePop @popupEvent="popupAction" v-if="this.popup.popupMobilePop" /> <!-- 팝업 - 모바일팝 안내 -->
          <!-- END : 모바일팝 -->
          <!-- START : 네이버 페이 -->
          <div id="tab-contents5" class="tabcontents" aria-labelledby="tab5" v-if="isListTab === 4">
            <ul class="txt-info-list mt0">
              <li class="ico-alert2">주문 변경 시 카드사 혜택 및 할부 적용여부는 해당 카드사 정책에 따라 변경될 수 있습니다. </li>
              <li class="ico-alert2">네이버 페이는 네이버 id로 별도 앱 설치 없이 신용카드 또는 은행계좌 정보를 등록하여 네이버 페이 비밀번호로 결제할 수 있는 간편 결제 서비스입니다. </li>
              <li class="ico-alert2">네이버 페이 카드 결제는 네이버페이에서 제공하는 카드사 별 무이자, 청구할인 혜택을 받을 수 있습니다.</li>
              <li class="ico-alert2">팝카드, 카드할인, 사용이 제한됩니다.</li>
            </ul>
          </div>
          <!-- END : 네이버 페이 -->
          <!-- START : 카카오페이 -->
          <div id="tab-contents6" class="tabcontents" aria-labelledby="tab6" v-if="isListTab === 3">
            <ul class="txt-info-list mt0">
              <li class="ico-alert2">지원 카드 : 국내 모든 신용/체크카드 </li>
              <li class="ico-alert2">무이자 할부 혜택은 Kakao Pay 기준으로 적용됩니다.</li>
              <li class="ico-alert2">팝할인, 카드할인,상품권 사용이 제한됩니다.</li>
            </ul>
          </div>
          <!-- END : 카카오페이 -->
          <!-- START : 휴대폰 소액결제 -->
          <div id="tab-contents7" class="tabcontents" aria-labelledby="tab7" v-if="isListTab === 5">
            <ul class="txt-info-list mt0">
              <li class="ico-alert2">휴대폰 소액결제 안내 <button type="button" aria-label="휴대폰 소액결제 안내 팝업 활성화" aria-haspopup="dialog" class="btn icon-question" @click="popupMicroPopActive"><span class="hidden">휴대폰 소액결제 안내</span></button></li>
            </ul>
          </div>
          <PopupMicropayments @popupEvent="popupAction" v-if="this.popup.popupMicropayments" /> <!-- 팝업 - 소액결제 안내 -->
          <!-- END : 휴대폰 소액결제 -->
          <p class="agree-save">
            <span class="inp-chk small">
              <input type="checkbox" name="" id="agreeSave" value="">
              <label for="agreeSave">선택한 결제수단 저장</label>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- END : 일반 결제 -->
  </section>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
import PopupCardList from '@/views/od/PopupCCardList'; // 팝업 - 신용카드 선택
import PopupCardMonthly from '@/views/od/PopupCardTdrInstlList'; // 팝업 - 카드결제 할부 선택
import PopupInterestFree from '@/views/od/PopupFoiInstlInfo'; // 팝업 - 무이자 할부 안내
import PopupAccountTransfer from '@/views/od/PopupAcntTrsfInfo'; // 팝업 - 계좌이체 안내
import PopupMobilePop from '@/views/od/PopupMobilPopInfo'; // 팝업 - 모바일 팝 안내
import PopupMicropayments from '@/views/od/PopupMobilSamtTdrInfo'; // 팝업 - 소액결제 안내
import CashReceiptIssue from '@/components/order/CashReceiptIssue'; // 현금영수증발급안내
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    totAmt: Number,
    ordId: String,
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
      },
      isListTab: 0, // 결제수단 신용카드 선택
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
      cardBuyCoCd: '',
      monthlyFlag: false,
      monthlyText: '일시불',
      crcoInfoInfo: null,
      monthly: '01',
      crcoNm: '', // 카드명
      crcoChargDcPosbAmt: '', // 최대할인금액
      crcoChargDcEndDt: '', // 프로모션 종료일
      evntApplStandAmt: '', // 프로모션 적용 기준금액
      crcoChargDcrt: '', // 할인적용률
      noIntTextFlag: false, // 카드무이자정보플래그
      AccountCashReceiptIssue: false, //
      MoblPopCashReceiptIssue: false, //
      cashRcpctInfo: null, // 현금영수증발행여부
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
  },
  watch: {
    crcoInfoInfo: function() {
      this.cardFlag = false;
    },
    monthly: function() {
      if (this.monthly === '01') {
        this.monthlyText = "일시불";
      } else {
        this.monthlyText = parseInt(this.monthly) + "개월";
      }
    }
  },
  methods: {
    // 팝업
    popupAction(type) { // 팝업 활성/비활성
      this.popup[type] = !this.popup[type];
      this.popup.open = !this.popup.open;
    },
    popupCardList() {
      this.popupAction('popupCardList');
    },
    popupCardMonthlyActive() {
      if (this.crcoInfoInfo != null) {
        this.popupAction('popupCardMonthly');
      } else {
        alert("카드를 선택하여 주십시오"); // TO-DO 레이어팝업으로???
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
    // 결제방법 선택
    listTabActive(el) {
      const list = document.querySelectorAll('.payment-list li');
      this.isListTab = el;
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('active');
      }
      list[this.isListTab].classList.add('active');
      this.$refs.tabContents.focus();
      this.checkCashRecptIsse(el);
      this.$emit('paymentNormalEvent', el);
    },
    // PG사, 결제수단목록, 카드사행사목록, 무이자목록 조회
    async retrievelistTrdMeans() {
      const responsePgInfo = await ApiUtils.get('/fo/od/ordsmgnt/pay-mean-pgcompany', '');
      this.pytcCd = responsePgInfo.data.data.pytcCd; // PG사 코드
      this.pytcNm = responsePgInfo.data.data.pytcNm; // PG사 명

      const params = {};
      const response = await ApiUtils.get('/fo/od/ordsmgnt/pay-mean-list', params);
      // this.tdrMeansList = response.data.data.tdrMeansInfoList; // 결제수단목록
      this.tdrMeansList = response.data.data.tdrMeansInfoList.filter(item => item.tdrMeansCd.includes("02"));

      const iCrcoEvntListInq = {
        pytcCd: this.pytcCd,
        ordId: this.ordId,
      };
      const responseCadEvnt = await ApiUtils.get('/fo/od/ordsmgnt/card-company-charg-dc-event-list', iCrcoEvntListInq);
      if (responseCadEvnt.data.data.crcoInstlInfoList != null) {
        this.crcoInstlInfoList = responseCadEvnt.data.data.crcoInstlInfoList; // 카드사할인정보목록
      }
      if (responseCadEvnt.data.data.crcoChargDcInfoList != null) {
        this.crcoChargDcInfoList = responseCadEvnt.data.data.crcoChargDcInfoList; // 카드사청구할인정보목록 TO-DO 쿼리 하드코딩 삭제
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
      }
      const noInterestCardInfoReq = {
        mid: 'gsstore01m',
        payAmt: this.totAmt,
        noInterestType: 'M',
      };
      const responseNoIntCardEvnt = await ApiUtils.post('/fo/pa/requestNoInterestInfo', JSON.stringify(noInterestCardInfoReq)); // 카드무이자할부정보 목록조회
      this.noInterestCardDetailInfoList = responseNoIntCardEvnt.data.noInterestCardDetailInfoList;
      console.log("noInterestCardDetailInfoList " + responseNoIntCardEvnt.data.noInterestCardDetailInfoList);
      this.$emit('paymentPGComPanyEvent', this.pytcCd, this.pytcNm);
    },
    // 선택된 카드정보
    choiceCardInfoEvent(cardInfo) {
      this.noInterestCardDetailInfo = null;
      this.crcoInfoInfo = cardInfo;
      for (let i = 0; i < this.noInterestCardDetailInfoList.length; i++) {
        if (this.crcoInfoInfo.cardBuyCoCd == this.noInterestCardDetailInfoList[i].crcoCd) {
          this.noInterestCardDetailInfo = this.noInterestCardDetailInfoList[i];
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
    choiceCardMonthlyEvent(monthlyInfo) {
      this.monthly = monthlyInfo.monthly;
      this.$emit('paymentNormalMonthlyEvent', monthlyInfo);
    },
    checkCashRecptIsse(el) {
      if (el === 0 ) {
        this.AccountCashReceiptIssue = true;
        this.MoblPopCashReceiptIssue = false;
      } else if ( el === 6) {
        this.AccountCashReceiptIssue = false;
        this.MoblPopCashReceiptIssue = true;
      } else {
        this.AccountCashReceiptIssue = false;
        this.MoblPopCashReceiptIssue = false;
      }
    },
    // 현금영수증발급신청 이벤트
    CashReceiptIssueEvent(cashRcpctInfo) {
      this.cashRcpctInfo = cashRcpctInfo;
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
  },
  destroyed() {
  },
  mounted() {
    this.retrievelistTrdMeans();
    if (this.totAmt < 50000) {
      this.monthlyFlag = true;
    } else {
      this.monthlyFlag = false;
    }
  },
};
</script>
