<!--
Design: views/cu/SC-FO-CU-GF-MP-013
Pg id:
Uri: /cu/pop_gsfres_webterms
-->
<template>
  <div id="popupGSfreshWebTerms" class="wrap-full-popup" role="dialog" aria-modal="true">
  <!-- <div id="popupGSfreshWebTerms" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupGSfreshWebTerms}"> -->
    <div class="header-popup">
      <h5><strong>GS fresh 웹약관</strong></h5>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="wrap-terms-type">
          <section class="terms-section">
            <h6>제1조(목적)</h6>
            <p>이 약관은 ㈜ GS리테일(이하 "GS리테일"이라 합니다)이 운영하는 인터넷 웹사이트(아래 명시된 사이트, 이하 "사이트"라 한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어 GS리테일과 이용자의 권리, 의무 및 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.<br/>- www.gsfresh.com</p>
          </section>
          <section class="terms-section">
            <h6>제 2조 (정의)</h6>
            <ul class="terms-list depth1">
              <li>
                ① "사이트"란 GS리테일이 컴퓨터 등 정보통신설비와 정보통신망을 이용하여 정보 및 서비스를 이용자에게 제공하고 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말합니다.
              </li>
              <li>
                ② "이용자"란 GS리테일에 접속하여 이 약관에 따라 GS리테일이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
              </li>
              <li>
                ③ "회원"이라 함은 GS리테일에 회원등록을 한 자로, GS리테일이 "사이트"를 통하여 지속적으로 제공하는 정보 및 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
              </li>
              <li>
                ④ "비회원"이라 함은 회원으로 가입하지 않고 GS리테일이 제공하는 정보 및 서비스를 이용하는 자를 말합니다.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "PopupGSfreshWebTerms",
  data() {
    return {
    };
  },
  components: {
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupGSfreshWebTerms');
      this.modalActiveEvent('popupGSfreshWebTerms');
    },
  },
  mounted() {
    this.modalActiveEvent('popupGSfreshWebTerms');
  },
  updated() {
  }
};
</script>
