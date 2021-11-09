<template>
  <!-- START : 공동현관출입번호-->
  <div id="popupEntranceNumber" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupEntranceNumber" aria-modal="true" :class="[{active : this.modalActive.popupEntranceNumber}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3>공동현관출입번호</h3>
        </div>
        <div class="layer-content">
          <p class="mb10">입력된 공동현관출입번호는 원활한 배송을 위해 계속 사용하도록 안전하게 저장/관리합니다.</p>
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 공동현관출입번호 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupEntranceNumber",
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
      this.$emit('popupEvent', 'popupEntranceNumber');
      this.modalActiveEvent('popupEntranceNumber');
    },
  },
  mounted() {
    this.modalActiveEvent('popupEntranceNumber');
  }
};
</script>
