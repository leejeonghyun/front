<template>
       <!-- START : 다중 선택 경고 팝업 -->
    <div id="popupCartBenefitAlert" class="wrap-layer description-layer discount-layer active" role="dialog" aria-labelledby="popupCartBenefitAlert" aria-modal="true" v-bind:class="[siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="layer-content">
            <p>최대 N개만 선택 가능합니다.</p>
            <p>기존에 선택한 상품을 다시 눌러 체크 해제 하신 후</p>
            <p>다른 상품을 선택해 주세요.</p>
          </div>
        </div>
        <div class="wrap-btn">
          <button type="button" class="btn-lg btn-bg lightgreen" aria-haspopup="dialog" @click="popupAction">확인</button>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupCartBenefitAlert",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {},
  methods: {
    popupAction(type) { // 팝업
      this.$emit('popupEvent', 'popupCartBenefitAlert');
    },
  },
  mounted() {

  },
};
</script>
