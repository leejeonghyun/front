<!--
components/order/PopupSignUpInfo
-->
<template>
  <!-- START : 통합회원 가입안내-->
  <div id="popupSignUpInfo" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupSignUpInfo" aria-modal="true" :class="{active : this.modalActive.popupSignUpInfo}">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3>통합회원 가입안내</h3>
        </div>
        <div class="layer-content">
          <p class="mb10">회원님은 통합회원이 아닙니다.</p>
          <p class="mb10">{{compGbn}} 적립 및 등급 쿠폰 혜택을 위해서는 통합회원 가입이 필요해요:)</p>
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 통합회원 가입안내 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "PopupSignUpInfo",
  props: {
    gbn: String,
  },
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupSignUpInfo');
      this.modalActiveEvent('popupSignUpInfo');
    },
  },
  mounted() {
    this.modalActiveEvent('popupSignUpInfo');
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
