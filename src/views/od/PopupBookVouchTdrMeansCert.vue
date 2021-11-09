<!--
views/od/SC-FO-PA-GS-MP-022
-->
<template>
  <div id="popupBookLife" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupBookLife}, siteClass]">
    <div class="header-popup">
      <strong>결제수단 인증</strong>
    </div>
    <div class="full-popup-body has-fixed-bottom scroll-area">
      <div class="inner-full-popup">
        <!-- START : 조회 -->
        <div v-if="isVisible === 'input'">
          <section class="section-area happymoney">
            <div class="sub-inner-box">
              <div class="sub-title">
                <h2>북앤라이프 캐시(도서문화상품권)</h2>
              </div>
              <ul class="txt-info-list">
                <li class="ico-alert2">북앤라이프 캐시안전 잠금 서비스 이용 고객은 북앤라이프 홈페이지에서 캐시 잠금 해제 후 결제를 이용해 주세요.</li>
                <li class="ico-alert2">도서문화 상품권을 소지하신 고객분께서는 먼저 북앤라이프 홈페이지에서 북앤라이프 캐시를 충전하신 후 이용해 주세요.</li>
                <li class="ico-alert2">불법적인 경로로 접속하거나 타인의 아이디를 도용하여 접속하는 경우 법에 의해 처벌 받을 수 있습니다.</li>
                <li class="ico-alert2">GS 프레시몰 사용 시 북앤라이프 ID 기준 월간 100만원 한도로 적용됩니다.(2018.06.01)</li>
              </ul>
              <p class="text-right">
                <a href="http://www.booknlife.com" target="_blank" class="btn-arr gray" title="새 창 열림">북앤라이프 홈페이지 바로가기</a>
              </p>
            </div>
          </section>
          <!-- START : 정보 -->
          <section class="section-area happymoney">
            <div class="sub-inner-box">
              <div class="sub-title">
                <h2>북앤라이프 회원정보입력</h2>
              </div>
              <dl class="insert-info">
                <dt><label for="id">아이디</label></dt>
                <dd><input class="inp-txt" type="text" value="" id="id" placeholder=""></dd>
                <dt><label for="pwd">비밀번호</label></dt>
                <dd><input class="inp-txt" type="password" value="" id="pwd"></dd>
              </dl>
            </div>
          </section>
          <!-- END : 정보 -->
          <!-- START : 하단 버튼 -->
          <div class="popup-btns-fixed-bottom">
            <button type="button" class="btn-lg btn-bg lightgreen" @click="inquiryAction">조회</button>
          </div>
          <!-- END : 하단 버튼 -->
        </div>
        <!-- END : 조회 -->
        <!-- START : 정보 -->
        <div v-if="isVisible === 'info'">
          <section class="section-area happymoney">
            <div class="sub-inner-box">
              <div class="sub-title">
                <h2>북앤라이프 캐시(도서문화상품권)</h2>
              </div>
              <ul class="txt-info-list">
                <li class="ico-alert2">총 결제금액보다 캐시가 부족해도 나머지 금액은 다른 결제수단을 통해 결제하실 수 있습니다. </li>
              </ul>
              <p class="text-right">
                <a href="http://www.booknlife.com" target="_blank" class="btn-arr gray" title="새 창 열림">북앤라이프 홈페이지 바로가기</a>
              </p>
            </div>
          </section>
          <!-- START : 정보 -->
          <section class="section-area happymoney">
            <div class="sub-inner-box">
              <div class="sub-title">
                <h2>북앤라이프 회원정보</h2>
              </div>
              <dl class="insert-info txt-info">
                <dt>아이디</dt>
                <dd>hongkildong</dd>
                <dt>결제예상금액</dt>
                <dd>56,540원</dd>
                <dt>북앤라이프캐시 잔액</dt>
                <dd>
                  <span class="point cash-point">1,000원</span>
                  <span class="inp-chk small">
                    <input type="checkbox" name="" id="useAll" value="">
                    <label for="useAll">모두 사용</label>
                  </span>
                </dd>
                <dt><label for="usePoint">사용할 캐시 입력</label></dt>
                <dd><input class="inp-txt small" type="number" value="" id="usePoint"> 원</dd>
              </dl>
            </div>
          </section>
          <!-- END : 정보 -->
          <!-- START : 하단 버튼 -->
          <div class="popup-btns-fixed-bottom">
            <button type="button" class="btn-lg btn-bg lightgreen" @click="popupCloseAction">확인</button>
          </div>
          <!-- END : 하단 버튼 -->
        </div>
        <!-- END : 정보 -->
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupBookLife",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '결제수단 인증 < %s'
  },
  data() {
    return {
      isVisible: 'input',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    inquiryAction() {
      this.isVisible = 'info';
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupBookLife');
      this.modalActiveEvent('popupBookLife');
    },
  },
  mounted() {
    this.modalActiveEvent('popupBookLife');
  }
};
</script>
