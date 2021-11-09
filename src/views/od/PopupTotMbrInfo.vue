<!--
views/od/SC-FO-PA-GS-MP-016
-->
<template>
    <!-- START : 통합회원가입 안내 레이어 -->
    <div id="popupTotMbrInfo" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupTotMbrInfo" aria-modal="true" :class="[{active : this.modalActive.popupTotMbrInfo}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>통합회원가입 안내</h3>
          </div>
          <div class="layer-content">
            <ul class="interest-free-list">
              <li>홍길동 님은 통합회원이 아닙니다.</li>
              <li>{{compGbn}} 적립 및 등급 쿠폰 혜택을 위해서는 통합회원 가입이 필요합니다.</li>
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 통합회원가입 안내 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    gbn: String,
  },
  name: "PopupTotMbrInfo",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupTotMbrInfo');
      this.modalActiveEvent('popupTotMbrInfo');
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
  },
  mounted() {
    this.modalActiveEvent('popupTotMbrInfo');
  },
  computed: {
    compGbn: function() {
      if (this.gbn === 'gsnpnt') {
        return "GS&POINT";
      } else {
        return "The POP 리워즈";
      }
    }
  },
};
</script>
