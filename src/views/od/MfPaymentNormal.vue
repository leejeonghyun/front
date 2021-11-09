<!--
components/order/PaymentNormalMF
-->
<template>
  <section class="section-area accordion-wrap">
    <!-- 수정 : 2020.02.10 마크업 삭제 (간편 결제 전체 삭제 / 하단 스크립트 부분도 삭제됨) -->
    <!-- STRAT : 일반 결제 -->
    <!-- STRAT : 기획 검수용 (달리드림패스 회원권 선물함 - 개발 화면 현행화를 위해 추가) -->
    <div class="sub-title sub-title border" v-if="dalidreampass">
      <h2>결제수단</h2>
    </div>
    <!-- END : 기획 검수용 (달리드림패스 회원권 선물함 - 개발 화면 현행화를 위해 추가) -->
    <div class="sub-title tit-accordion" v-else>
      <h2>
        <button type="button" id="paymentNormalAccordion" class="tit" aria-controls="paymentNormalAccordionContent" aria-expanded="true" @click="accordionEvent">
          <!-- 8월 수정 START : 디자인 디벨롭 수정 사항 -->
          <strong class="bg-line-brush">
            결제수단 <span class="required" aria-label="필수 항목">*</span><!-- 4월 수정 : 필수항목추가 --> <!-- 수정 : 2020.02.13 텍스트 변경 -->
          </strong>
          <!-- 8월 수정 END : 디자인 디벨롭 수정 사항 -->
        </button>
      </h2>
    </div>
    <div id="paymentNormalAccordionContent" class="accordion-content" aria-labelledby="paymentNormalAccordion">
      <div class="sub-inner-box">
        <!-- START : 결제방법 -->
        <div>
          <!-- 수정 START : 2020.02.10 마크업 변경 (버튼 순서 및 마크업 변경) -->
          <ul class="payment-list">
            <!-- 8월 수정 START : 디자인 디벨롭 수정 사항 -->
            <li :class="{active : this.tab.card}"><button type="button" id="tab1" class="btn-border btn-card" aria-controls="tab-contents1" @click="listTabActive('card')">신용카드</button></li>
            <li :class="{active : this.tab.account}"><button type="button" id="tab2" class="btn-border btn-account" aria-controls="tab-contents3" @click="listTabActive('account')">계좌이체</button></li>
            <li :class="{active : this.tab.mobilePop}"><button type="button" id="tab3" class="btn-border btn-mobilepop" aria-controls="tab-contents4" @click="listTabActive('mobilePop')"><span class="hidden">모바일팝(선불)</span></button></li>
            <li :class="{active : this.tab.payco}"><button type="button" id="tab4" class="btn-border btn-payco" aria-controls="tab-contents2" @click="listTabActive('payco')"><span class="hidden">페이코</span></button></li>
            <li :class="{active : this.tab.kakaopay}"><button type="button" id="tab5" class="btn-border btn-kakaopay" aria-controls="tab-contents6" @click="listTabActive('kakaopay')"><span class="hidden">카카오페이</span></button></li>
            <li :class="{active : this.tab.naverpay}"><button type="button" id="tab6" class="btn-border btn-naverpay" aria-controls="tab-contents5" @click="listTabActive('naverpay')"><span class="hidden">네이버 페이</span></button></li>
            <li :class="{active : this.tab.mobile}"><button type="button" id="tab7" class="btn-border btn-mobile" aria-controls="tab-contents7" @click="listTabActive('mobile')">휴대폰 소액결제</button></li>
            <!-- 8월 수정 END : 디자인 디벨롭 수정 사항 -->
          </ul>
          <!-- 수정 END : 2020.02.10 마크업 순서 변경 (버튼 순서 변경) -->
        </div>
        <!-- END : 결제방법 -->
        <div ref="tabContents" tabindex="0">
          <!-- 수정 START : 2020.02.10 마크업 변경 (버튼 순서 및 마크업 변경) -->
          <!-- START : 신용카드 -->
          <div id="tab-contents1" class="tabcontents credit-card" aria-labelledby="tab1" v-if="this.tab.card">
            <!-- 4월 추가 START : 카드사 공지 -->
            <ul class="payment-notice" v-if="!dalidreampass">
              <li>신한/BC/우리카드 5만원 이상 결제 시 5% 청구할인(~11.30까지) 최대1만원</li>
              <li class="point">KB국민카드 카드사 시스템 점검으로 다른 결제수단을 이용하시기 바랍니다. (09/15 18:20~09/16 01:50)</li>
            </ul>
            <!-- 4월 추가 END : 카드사 공지 -->
            <p class="wrap-select w100">
              <button type="button" class="btn-arrow" aria-label="신용카드 팝업 활성화" aria-haspopup="dialog" @click="popupCardList">
                <span class="icon-card"><img src="@/assets/images/icon/icon_card_logo1.png" alt="카드사 로고"></span>BC 카드
              </button>
            </p>
            <p class="wrap-select w100">
              <!-- 비활성화일 경우
              <button type="button" class="btn-arrow disabled" disabled>일시불</button>
               -->
              <button type="button" class="btn-arrow" aria-label="카드결제 할부선택 팝업 활성화" aria-haspopup="dialog" @click="popupCardMonthlyActive">일시불</button>
            </p>
            <ul class="txt-info-list color-bk mt0" v-if="!dalidreampass">
              <li class="ico-alert2">5만원 이상 결제 시 5% 청구할인(~11.30까지) <span class="color-gray">최대1만원</span></li>
              <li class="ico-alert2">BC카드 6개월 무이자 할부 신청이 가능합니다.</li>
            </ul>
            <p class="btn-monthly-info" v-if="!dalidreampass">
              무이자할부안내 <button type="button" class="btn icon-question" aria-label="무이자할부안내 팝업 활성화" aria-haspopup="dialog" @click="popupInterestFreeActive"><span
             class="hidden">무이자할부안내</span></button>
            </p>
          </div>
          <!-- END : 신용카드 -->
          <!-- START : 계좌이체 -->
          <div id="tab-contents3" class="tabcontents account" aria-labelledby="tab2" v-if="this.tab.account">
            <ul class="txt-info-list mt0 mb0">
              <li class="ico-alert2">실시간계좌이체 안내 <button type="button" aria-label="실시간 계좌이체 안내 팝업 활성화" aria-haspopup="dialog" class="btn icon-question" @click="popupAccountActive"><span class="hidden">할인 안내</span></button></li>
              <li class="ico-alert2">실시간 계좌이체로 결제 시 신한 은행의 채무 지급 서비스를 이용하실 수 있습니다. </li>
            </ul>
            <!-- 20201207 링크경로 팝업으로 변경 -->
            <p class="text-right"><a href="#" class="btn-arrow-right"  aria-label="서비스가입확인 팝업 활성화" aria-haspopup="dialog" @click="popupServiceActive">서비스가입확인</a></p>
            <!-- START : 현금영수증 -->
            <div class="bill-wrap">
              <div class="tit-bill">
                현금영수증 발급신청
                <!-- 4월수정 START : 디자인 변경으로 마크업 변경 -->
                <div class="wrap-checkbox-text">
                  <span class="wrap-checkbox" :class="{active:showBill}">
                    <input type="checkbox" id="receiptReceive" v-model="showBill" checked name="cash-receipt" />
                    <label for="receiptReceive">
                      <span class="hidden">현금영수증</span>발급
                    </label>
                  </span>
                </div>
                <!-- <button type="button" class="btn-circle" @click="toggleShow" title="발급" :class="{active : this.showBill === 'show'}"><span class="hidden">현금영수증 발급 신청 보기</span></button> -->
                <!-- 4월수정 END : 디자인 변경으로 마크업 변경 -->
              </div>
              <!-- 4월수정 START : v-if 조건 변경 -->
              <div class="content-bill" v-if="showBill">
              <!-- 4월수정 END : v-if 조건 변경 -->
                <p class="check-area">
                  <span class="inp-radio small w125">
                    <input type="radio" name="billType" id="personal" value="personal" checked @click="selectBillType">
                    <label for="personal">개인소득공제용</label>
                  </span>
                  <span class="inp-radio small">
                    <input type="radio" name="billType" id="business" value="business" @click="selectBillType">
                    <label for="business">사업자 지출증빙용</label>
                  </span>
                </p>
                <!-- START : 개인소득공제용  -->
                <p class="insert-tel" v-if="defaultBillType === 'personal'">
                  <span class="wrap-select">
                    <select id="mobile" class="w-small" title="휴대폰 번호 앞자리">
                      <option value="">010</option>
                    </select>
                  </span>
                  <input type="tel" id="" class="inp-txt" value="" placeholder="‘ - ’ 없이 숫자만 입력" title="휴대폰 번호 뒷자리">
                </p>
                <!-- END : 개인소득공제용  -->
                <!-- START : 사업자 지출증빙용  -->
                <p class="insert-tel" v-if="defaultBillType === 'business'">
                  <span class="wrap-select"><label for="businessNumber">사업자등록번호</label></span>
                  <input type="number" id="businessNumber" class="inp-txt" value="" placeholder="‘ - ’ 없이 숫자만 입력">
                </p>
                <!-- END : 사업자 지출증빙용  -->
                <p class="inp-chk small">
                  <input type="checkbox" name="" id="agreeBill" value="" checked>
                  <label for="agreeBill">현금영수증 발급정보저장</label>
                </p>
                <ul class="txt-info-list">
                  <li class="ico-alert2">개인소득공제용으로 신청하실경우에는 국세청으로 자동 전송됩니다.</li>
                  <li class="ico-alert2">사업자 지출증빙용으로 신청하시면 세금계산서로 활용이 가능합니다.</li>
                </ul>
              </div>
            </div>
            <!-- END : 현금영수증 -->
          </div>
          <!-- END : 계좌이체 -->
          <!-- START : 모바일팝 -->
          <div id="tab-contents4" class="tabcontents" aria-labelledby="tab3" v-if="this.tab.mobilePop">
            <ul class="txt-info-list mt0 mb0">
              <li class="ico-alert2">모바일팝 결제 안내 <button type="button" aria-label="모바일팝 안내 팝업 활성화" aria-haspopup="dialog" class="btn icon-question" @click="popupMobilePopActive"><span class="hidden">모바일팝 안내</span></button></li>
              <li class="ico-alert2">모바일팝 온라인 결제는 ‘모바일팝’ 앱설치 후 이용 가능합니다.</li>
              <li class="ico-alert2">잔액이 부족한 경우 모바일 팝에서 잔액 충전 후 이용하세요.<br>(충전 문의 : 1588-5245)</li>
            </ul>
            <!-- 5월 수정 START : 현금영수증 -->
            <div class="bill-wrap">
              <div class="tit-bill">
                현금영수증 발급신청
                <!-- 4월수정 START : 디자인 변경으로 마크업 변경 -->
                <div class="wrap-checkbox-text">
                  <span class="wrap-checkbox" :class="{active:showBill}">
                    <input type="checkbox" id="receiptReceive" v-model="showBill" checked name="cash-receipt" />
                    <label for="receiptReceive">
                      <span class="hidden">현금영수증</span>발급
                    </label>
                  </span>
                </div>
                <!-- <button type="button" class="btn-circle" @click="toggleShow" title="발급" :class="{active : this.showBill === 'show'}"><span class="hidden">현금영수증 발급 신청 보기</span></button> -->
                <!-- 4월수정 END : 디자인 변경으로 마크업 변경 -->
              </div>
              <!-- 4월수정 START : v-if 조건 변경 -->
              <div class="content-bill" v-if="showBill">
              <!-- 4월수정 END : v-if 조건 변경 -->
                <p class="check-area">
                  <span class="inp-radio small w125">
                    <input type="radio" name="billType" id="personal" value="personal" checked @click="selectBillType">
                    <label for="personal">개인소득공제용</label>
                  </span>
                  <span class="inp-radio small">
                    <input type="radio" name="billType" id="business" value="business" @click="selectBillType">
                    <label for="business">사업자 지출증빙용</label>
                  </span>
                </p>
                <!-- START : 개인소득공제용  -->
                <p class="insert-tel" v-if="defaultBillType === 'personal'">
                  <span class="wrap-select">
                    <select id="mobile" class="w-small" title="휴대폰 번호 앞자리">
                      <option value="">010</option>
                    </select>
                  </span>
                  <input type="tel" id="" class="inp-txt" value="" placeholder="‘ - ’ 없이 숫자만 입력" title="휴대폰 번호 뒷자리">
                </p>
                <!-- END : 개인소득공제용  -->
                <!-- START : 사업자 지출증빙용  -->
                <p class="insert-tel" v-if="defaultBillType === 'business'">
                  <span class="wrap-select"><label for="businessNumber">사업자등록번호</label></span>
                  <input type="number" id="businessNumber" class="inp-txt" value="" placeholder="‘ - ’ 없이 숫자만 입력">
                </p>
                <!-- END : 사업자 지출증빙용  -->
                <p class="inp-chk small">
                  <input type="checkbox" name="" id="agreeBill" value="" checked>
                  <label for="agreeBill">현금영수증 발급정보저장</label>
                </p>
                <ul class="txt-info-list">
                  <li class="ico-alert2">개인소득공제용으로 신청하실경우에는 국세청으로 자동 전송됩니다.</li>
                  <li class="ico-alert2">사업자 지출증빙용으로 신청하시면 세금계산서로 활용이 가능합니다.</li>
                </ul>
              </div>
            </div>
            <!-- 5월 수정 END : 현금영수증 -->
          </div>
          <!-- END : 모바일팝 -->
          <!-- START : 페이코 -->
          <!-- 8월 수정 START : 페이코 신용카드/간편계좌 선택 변경 -->
          <div id="tab-contents2" class="tabcontents payco" aria-labelledby="tab4" v-if="this.tab.payco" key="payco">
            <p class="check-area">
              <span class="inp-radio small w125">
                <input type="radio" name="paycopaycoType" id="paycocredit" value="credit" checked @click="selectPayType">
                <label for="paycocredit">신용카드</label>
              </span>
              <span class="inp-radio small">
                <input type="radio" name="paycopaycoType" id="paycoaccount" value="account" @click="selectPayType">
                <label for="paycoaccount">간편계좌</label>
              </span>
            </p>
            <div class="credit-card" v-if="defaultPayType === 'credit'">
              <p class="wrap-select w100">
                <button type="button" class="btn-arrow" aria-label="신용카드 팝업 활성화" aria-haspopup="dialog" @click="popupCardList">
                  <span class="icon-card"><img src="@/assets/images/icon/icon_card_logo1.png" alt="카드사 로고"></span>BC 카드
                </button>
              </p>
              <ul class="payment-notice">
                <li>신한/BC/우리카드 5만원 이상 결제 시 5% 청구할인(~11.30까지) 최대1만원</li>
                <li class="point">KB국민카드 카드사 시스템 점검으로 다른 결제수단을 이용하시기 바랍니다. (09/15 18:20~09/16 01:50)</li>
              </ul>
              <ul class="txt-info-list">
                <li class="ico-alert2">휴대폰과 카드명의자가 동일해야 하며 결제 금액 제한은 없습니다. </li>
                <li class="ico-alert2">무이자 할부 혜택은 PAYCO기준으로 적용됩니다.</li>
                <li class="ico-alert2">팝할인, 카드할인 적용이 제한됩니다.</li>
                <li class="ico-alert2">PAYCO 고객센터 1544-6891</li>
              </ul>
            </div>
            <div v-if="defaultPayType === 'account'">
              <ul class="txt-info-list">
                <li class="ico-alert2">계좌이체는 본인 명의 계좌만 이용 가능합니다.</li>
                <li class="ico-alert2">현금영수증 정보는 PAYCO에서 등록 가능합니다.</li>
                <li class="ico-alert2">PAYCO 고객센터 1544-6891</li>
              </ul>
            </div>
          </div>
          <!-- 8월 수정 END : 페이코 신용카드/간편계좌 선택 변경 -->
          <!-- END : 페이코 -->
          <!-- START : 카카오페이 -->
          <div id="tab-contents6" class="tabcontents" aria-labelledby="tab5" v-if="this.tab.kakaopay" key="kakaopay">
            <!-- 8월 수정 START : 카카오페이 신용카드/카카오머니 선택 변경 -->
            <p class="check-area">
              <span class="inp-radio small w125">
                <input type="radio" name="kakaopayType" id="kakaocredit" value="credit" checked @click="selectPayType">
                <label for="kakaocredit">신용카드</label>
              </span>
              <span class="inp-radio small">
                <input type="radio" name="kakaopayType" id="kakaoMoney" value="account" @click="selectPayType">
                <label for="kakaoMoney">카카오머니</label>
              </span>
            </p>
            <div class="credit-card" v-if="defaultPayType === 'credit'">
              <p class="wrap-select w100">
                <button type="button" class="btn-arrow" aria-label="신용카드 팝업 활성화" aria-haspopup="dialog" @click="popupCardList">
                  <span class="icon-card"><img src="@/assets/images/icon/icon_card_logo1.png" alt="카드사 로고"></span>BC 카드
                </button>
              </p>
              <ul class="payment-notice">
                <li>신한/BC/우리카드 5만원 이상 결제 시 5% 청구할인(~11.30까지) 최대1만원</li>
                <li class="point">KB국민카드 카드사 시스템 점검으로 다른 결제수단을 이용하시기 바랍니다. (09/15 18:20~09/16 01:50)</li>
              </ul>
              <ul class="txt-info-list">
              <li class="ico-alert2">지원 카드 : 국내 모든 신용/체크카드 </li>
              <li class="ico-alert2">무이자 할부 혜택은 Kakao Pay 기준으로 적용됩니다.</li>
              <li class="ico-alert2">팝할인, 카드할인이 제한됩니다.</li>
              </ul>
            </div>
            <div v-if="defaultPayType === 'account'">
              <ul class="txt-info-list">
                <li class="ico-alert2">계좌이체는 본인 명의 계좌만 이용 가능합니다.</li>
                <li class="ico-alert2">현금영수증 정보는 Kakao Pay에서 등록 가능합니다.</li>
              </ul>
            </div>
            <!-- 8월 수정 END : 카카오페이 신용카드/카카오머니 선택 변경 -->
          </div>
          <!-- END : 카카오페이 -->
          <!-- START : 네이버 페이 -->
          <div id="tab-contents5" class="tabcontents" aria-labelledby="tab6" v-if="this.tab.naverpay">
            <!-- 4월 추가 START : 카드사 공지 -->
            <ul class="payment-notice">
              <li>신한/BC/우리카드 5만원 이상 결제 시 5% 청구할인(~11.30까지) 최대1만원</li>
              <li class="point">KB국민카드 카드사 시스템 점검으로 다른 결제수단을 이용하시기 바랍니다. (09/15 18:20~09/16 01:50)</li>
            </ul>
            <!-- 4월 추가 END : 카드사 공지 -->
            <ul class="txt-info-list mt0">
              <li class="ico-alert2">주문 변경 시 카드사 혜택 및 할부 적용여부는 해당 카드사 정책에 따라 변경될 수 있습니다. </li>
              <!-- 4월 수정 : 문구 삭제 <li class="ico-alert2">네이버 페이는 네이버 id로 별도 앱 설치 없이 신용카드 또는 은행계좌 정보를 등록하여 네이버 페이 비밀번호로 결제할 수 있는 간편 결제 서비스입니다. </li> -->
              <li class="ico-alert2">네이버 페이 카드 결제는 네이버페이에서 제공하는 카드사 별 무이자, 청구할인 혜택을 받을 수 있습니다.</li>
              <li class="ico-alert2">팝카드할인, 카드할인이 제한됩니다.</li><!-- 7월 수정 : 문구 수정 -->
            </ul>
          </div>
          <!-- END : 네이버 페이 -->
          <!-- START : 휴대폰 소액결제 -->
          <div id="tab-contents7" class="tabcontents" aria-labelledby="tab7" v-if="this.tab.mobile">
            <ul class="txt-info-list mt0">
              <li class="ico-alert2">휴대폰 소액결제 안내 <button type="button" aria-label="휴대폰 소액결제 안내 팝업 활성화" aria-haspopup="dialog" class="btn icon-question" @click="popupMicroPopActive"><span class="hidden">휴대폰 소액결제 안내</span></button></li>
            </ul>
          </div>
          <!-- END : 휴대폰 소액결제 -->
          <!-- 수정 END : 2020.02.10 마크업 순서 변경 (버튼 순서 변경) -->
          <p class="agree-save" v-if="!dalidreampass">
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
export default {
  name: "PaymentNormal",
  data() {
    return {
      // 결제수단 신용카드 선택 <!-- 수정 END : 2020.02.10 스크립트 수정 -->
      tab: {
       card: true,
       account: false,
       mobilePop: false,
       payco: false,
       kakaopay: false,
       naverpay: false,
       mobile: false,
      },
      /* 4월수정 START : 데이터 변경 */
      showBill: true, // 현금영수증 발급
      /* 4월수정 END : 데이터 변경 */
      defaultBillType: 'personal', // 현금영수증 타입 션택
      defaultPayType: 'credit', // 8월 수정 : 페이코, 카카오페이 신용카드/간편계좌 선택 변경
    };
  },
  props: {
    dalidreampass: { // 기획 확인용 달리드림패스 props 값
      type: Boolean,
      default: false,
    }
  },
  mixins: [AccordionMixin],
  components: {
  },
  methods: {
    // 팝업
    popupCardList() {
      this.$emit('popupEvent', 'popupCardList');
    },
    popupCardMonthlyActive() {
      this.$emit('popupEvent', 'popupCardMonthly');
    },
    popupInterestFreeActive() {
      this.$emit('popupEvent', 'popupInterestFree');
    },
    popupAccountActive() {
      this.$emit('popupEvent', 'popupAccountTransfer');
    },
    popupMobilePopActive() {
      this.$emit('popupEvent', 'popupMobilePop');
    },
    popupMicroPopActive() {
      this.$emit('popupEvent', 'popupMicropayments');
    },
    popupServiceActive() {
      this.$emit('popupEvent', 'popupServiceCheck');
    },
    // 결제방법 선택 <!-- 수정 END : 2020.02.10 스크립트 수정 -->
    listTabActive(type) {
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      // this.$refs.tabContents.focus();
      this.defaultPayType = 'credit'; // 8월 수정 START : 페이코, 카카오페이 신용카드/간편계좌 선택 변경
    },
    /* 4월수정 START : 디자인 변경으로 이벤트 삭제 */
    // 현금영수증 더보기
    // toggleShow(event) {
    //   const target = event.target;
    //   if (this.showBill === 'hide') {
    //     this.showBill = 'show';
    //     target.setAttribute('title', '발급');
    //   } else {
    //     this.showBill = 'hide';
    //     target.setAttribute('title', '미발급');
    //   }
    // },
    /* 4월수정 END : 디자인 변경으로 이벤트 삭제 */
    // 현금영수증 타입 변경
    selectBillType(event) {
      const $this = event.target;
      this.defaultBillType = $this.value;
    },
    // 8월 수정 START : 페이코, 카카오페이 신용카드/간편계좌 선택 변경
    selectPayType(event) {
      const $this = event.target;
      this.defaultPayType = $this.value;
    },
    // 8월 수정 END : 페이코, 카카오페이 신용카드/간편계좌 선택 변경
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
