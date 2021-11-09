<template>
  <section class="section-area accordion-wrap">
    <div class="sub-title tit-accordion">
      <h2>
        <button type="button" id="paymentSimpleAccordion" class="tit" aria-controls="paymentSimpleAccordionContent" aria-expanded="true" @click="accordionEvent">
          간편 결제
        </button>
      </h2>
    </div>
    <div id="paymentSimpleAccordionContent" class="accordion-content payment-simple" aria-labelledby="paymentSimpleAccordion">
      <!-- START : 신규카드 등록 -->
      <div class="card-registration-slide">
        <div class="card-info">
          <button type="button" class="btn-reg">신용/체크 카드를 등록하시면<br> 원클릭 결제가 가능합니다.</button>
        </div>
      </div>
      <!-- END : 신규카드 등록 -->
      <!-- START : 등록된 카드 있을 경우 -->
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
                    <select id="" required title="카드 할부기간 선택" disabled>
                      <option value="">일시불</option>
                      <option value="">2개월</option>
                      <option value="">3개월</option>
                      <option value="">4개월</option>
                      <option value="">5개월</option>
                      <option value="">6개월</option>
                      <option value="">7개월</option>
                      <option value="">8개월</option>
                      <option value="">9개월</option>
                      <option value="">10개월</option>
                      <option value="">11개월</option>
                      <option value="">12개월</option>
                    </select>
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
                    <select id="" required title="카드 할부기간 선택" disabled>
                      <option value="">일시불</option>
                      <option value="">2개월</option>
                      <option value="">3개월</option>
                      <option value="">4개월</option>
                      <option value="">5개월</option>
                      <option value="">6개월</option>
                      <option value="">7개월</option>
                      <option value="">8개월</option>
                      <option value="">9개월</option>
                      <option value="">10개월</option>
                      <option value="">11개월</option>
                      <option value="">12개월</option>
                    </select>
                  </span>
                </dd>
              </dl>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- END : 등록된 카드 있을 경우 -->
      <p class="btn-add-card">
        <button type="button" class="btn-border btn-small">카드추가</button>
        <button type="button" class="btn-border btn-small">설정</button>
      </p>
    </div>
  </section>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: "PaymentSimple",
  data() {
    return {
      isListTab: 0, // 결제수단 신용카드 선택
      showBill: 'show', // 현금영수증 발급
      defaultBillType: 'personal', // 현금영수증 타입 션택
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
    };
  },
  mixins: [AccordionMixin],
  components: {
    swiper,
    swiperSlide,
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
    // 결제방법 선택
    listTabActive(el) {
      const list = document.querySelectorAll('.payment-list li');
      this.isListTab = el;
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('active');
      }
      list[this.isListTab].classList.add('active');
      this.$refs.tabContents.focus();
    },
    // 현금영수증 더보기
    toggleShow(event) {
      const target = event.target;
      if (this.showBill === 'hide') {
        this.showBill = 'show';
        target.setAttribute('title', '발급');
      } else {
        this.showBill = 'hide';
        target.setAttribute('title', '미발급');
      }
      console.log(this.showBill);
    },
    // 현금영수증 타입 변경
    selectBillType(event) {
      const $this = event.target;
      this.defaultBillType = $this.value;
    },
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
