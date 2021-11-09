<template>
    <div id="dayBrkDisable" class="wrap-layer alert-layer active" role="dialog" aria-labelledby="dayBrkDisable" aria-modal="true" :class="[{active : this.modalActive.dayBrkDisable}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="alert-layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>장바구니에 담겼습니다</h3>
          </div>
          <div class="layer-content">
            <div class="message">
              현재 배송지는 새벽 배송이  불가하니,<br />장바구니에서 배송지 주소를 확인 후<br />주문하세요.
            </div>
          </div>
        </div>
        <div class="btn-alert-bottom">
          <button class="btn-cancel" @click="setCookieClose">다시 보지 않기</button>
          <button class="btn-confirm" @click="tabFocusRemove('popupAction')">확인</button>
        </div>
      </div>
    </div>
    <!-- END : 업데이트 알림 팝업 -->
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "DayBrkDisable",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'dayBrkDisable');
    },
    setCookieClose() {
      CookieUtils.setCookie('BSKT_POPUP', 'daybrkno', 365);
      this.popupAction();
    },
  },
  mounted() {
  },
};
</script>
