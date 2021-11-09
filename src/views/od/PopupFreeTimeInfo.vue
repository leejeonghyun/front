<!--
views/od/SC-FO-PA-GS-MP-020
-->
<template>
    <!-- START : Free 타임 배송 레이어 -->
    <div id="popupFreeTime" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupFreeTime" aria-modal="true" :class="[{active : this.modalActive.popupFreeTime}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>Free 타임 배송</h3>
          </div>
          <div class="layer-content">
            <p>Free타임 배송은 원하는 날짜만 선택하면 시간은 자유롭게 배송되는 서비스로 최종 배송완료 건당 3일 내 500포인트가 지급됩니다.</p>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : Free 타임 배송 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupFreeTime",
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
      this.$emit('popupEvent', 'popupFreeTime');
      this.modalActiveEvent('popupFreeTime');
    },
  },
  mounted() {
    this.modalActiveEvent('popupFreeTime');
  }
};
</script>
