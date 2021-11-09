<!--
views/od/SC-FO-OD-GS-MP-021
-->
<template>
    <!-- START : 우수고객 안내 레이어 -->
    <div id="popupBenefit" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupBenefit" aria-modal="true" :class="[{active : this.modalActive.popupBenefit}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>맛보기 혜택 안내</h3>
          </div>
          <div class="layer-content">
            <div class="list-dot">
              <p>맛보기 혜택 상품은 우수고객만을 대상으로 장바구니에 깜짝 노출되는 상품입니다.</p>
              <p>지속적인 혜택을 받으시려면, <strong class="point">상품평을 꼭 작성해주세요.</strong></p>
              <p>고객님께 PUSH로 상품평 작성 알림을 보내드립니다.</p>
              <p>7일 이내 상품평을 작성해주시지 않으면, 향 후 이벤트 대상에서 제외 될 수 있습니다.</p>
            </div>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 우수고객 안내 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupBenefitInfo",
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
      this.$emit('popupEvent', 'popupBenefit');
      this.modalActiveEvent('popupBenefit');
    },
  },
  mounted() {
    this.modalActiveEvent('popupBenefit');
  }
};
</script>
