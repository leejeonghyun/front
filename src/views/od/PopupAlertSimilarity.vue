<!--
views/od/SC-FO-OD-GS-MP-011
-->
<template>
    <!-- START : alert 레이어 -->
    <div id="popupAlertSimilarity" class="wrap-layer alert-layer active" role="dialog" aria-labelledby="popupAlertSimilarity" aria-modal="true" :class="[{active : this.modalActive.popupAlertSimilarity}, siteClass]">
      <!-- : 실사용 소스 <div id="popupAlertSimilarity" class="wrap-layer alert-layer" role="dialog" aria-labelledby="popupAlertSimilarity" aria-modal="true" :class="{active : this.modalActive.popupAlertSimilarity}">
      -->
      <div class="layer-bg" @click="popupClose"></div>
      <div class="alert-layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>유사상품 담기 안내</h3>
          </div>
          <div class="layer-content">
            <div class="message">선택하신 상품을 <br>장바구니에 담으시겠습니까?</div>
          </div>
        </div>
        <div class="btn-alert-bottom">
          <button class="btn-cancel" @click="add">추가로 담기</button>
          <button class="btn-confirm" @click="del">삭제하고 담기</button>
        </div>
      </div>
    </div>
    <!-- END : alert 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupAlertSimilarity",
  props: {
    selectItem: Number,
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupClose() {
      this.$emit('popupEvent', 'popupAlertSimilarity');
      this.modalActiveEvent('popupAlertSimilarity');
    },
    async add() {
      this.$emit('popupReturn', this.selectItem, 'C');
      this.$emit('popupEvent', 'popupAlertSimilarity');
      this.modalActiveEvent('popupAlertSimilarity');
    },
    async del() {
      this.$emit('popupReturn', this.selectItem, 'D');
      this.$emit('popupEvent', 'popupAlertSimilarity');
      this.modalActiveEvent('popupAlertSimilarity');
    },
  },
  mounted() {
    this.modalActiveEvent('popupAlertSimilarity');
  },
};
</script>
