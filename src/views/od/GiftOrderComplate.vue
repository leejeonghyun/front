<!--
views/od/SC-FO-PA-GS-MP-025
-->
<template>
  <div
    id="popupGiftSendCompelete"
    class="wrap-full-popup active h100"
    role="dialog"
    aria-modal="true"
  >
    <!-- : 실사용 소스 -->
    <!-- <div id="popupGiftSendCompelete" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupGiftSendCompelete}"> -->
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section class="gift-receive-complete">
          <h1 class="hidden">선물하기 완료</h1>
          <div class="msg-complete">
            <h2 class="msg-complete-txt">
              선물하기결제가<br />완료되었습니다.
            </h2>
          </div>
          <div class="section-area">
            <dl class="order-info">
              <dt>주문번호</dt>
              <dd>20868802</dd>
              <dt>선물 받는 분</dt>
              <dd><strong class="name">홍길동</strong>010 - 1234 - 5678</dd>
            </dl>
          </div>
          <!-- START : 최종 결제금액 -->
          <div class="section-area">
            <div class="sub-title send-total-price">
              <h2>
                최종결제금액
                <span class="price"><strong>28,000</strong>원</span>
              </h2>
            </div>
            <div class="sub-inner-box">
              <ul class="price-list">
                <li>총 상품금액 <span class="price">32,800원</span></li>
                <li>총 할인 금액 <span class="price red">-4,800원</span></li>
                <li>총 배송비 <span class="price">0원</span></li>
              </ul>
              <p class="txt-point">
                배송 완료 후, GS&amp;POINT적립 <span class="point">28P</span>
              </p>
            </div>
          </div>
          <!-- END : 최종 결제금액 -->
          <!-- START : 결제 수단 -->
          <div class="section-area">
            <div class="sub-title">
              <h2>결제수단</h2>
            </div>
            <dl class="sub-inner-box payment-info">
              <dt>2019.11.22</dt>
              <dd>GS&amp;POINT 1,000P</dd>
              <dd>+ THE POP리워즈 500점</dd>
              <dd>+ 해피머니상품권 10,000원</dd>
              <dd>+ 신용카드(BC카드/일시불) 16,500원</dd>
            </dl>
          </div>
          <!-- END : 결제 수단 -->
          <!-- START : 유의사항 -->
          <section class="section-area">
            <div class="sub-inner-box">
              <dl class="order-caution">
                <dt class="ico-alert">선물하기 유의사항</dt>
                <dd class="ico-alert2">
                  선물 받는 사람이 배송정보를 입력하면 상품 준비 및 배송이
                  시작됩니다.
                </dd>
                <dd class="ico-alert2">
                  받는 분이 주문일로부터
                  <strong class="point">3일 이내</strong>에 배송정보를 입력하지
                  않을 경우, 주문이 자동 취소됩니다.
                </dd>
              </dl>
            </div>
          </section>
          <!-- END : 유의사항 -->
          <!-- START : 하단 버튼 -->
          <div class="bottom-btn-area">
            <button
              type="button"
              class="btn-md btn-bg darkgray"
              @click="popupCloseAction"
            >
              주문내역확인
            </button>
            <button
              type="button"
              class="btn-md btn-bg lightgreen"
              @click="popupCloseAction"
            >
              쇼핑하러 가기
            </button>
          </div>
          <!-- START : 하단 버튼 -->
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import Tracker from '@/common/Tracker';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'PopupGiftSendCompelete',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물하기 완료 < 선물하기 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '선물하기완료',
      },
    ],
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
      popup: {
        popupGiftSendCompelete: false,
      },
    };
  },
  components: {},
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupGiftSendCompelete');
      this.modalActiveEvent('popupGiftSendCompelete');
    },
  },
  mounted() {
    const prodData = [
      {
        PROD_ID: '상품코드',
        PROD_NM: '상품명',
        PROD_CAT: '상품카테고리',
        PROD_QTY: '상품수량',
        PROD_OPT: ['상품옵션'],
      },
    ];
    Tracker.pageView(prodData);
    this.modalActiveEvent('popupGiftSendCompelete');
  },
};
</script>
