<template>
  <!-- START : 부분팝업 타이틀형 -->
  <div id="popupWineStoreLocation" class="wrap-layer popup-wine25" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupWineStoreLocation}">
  <!-- <div id="popupWineStoreLocation" class="active wrap-layer popup-wine25" role="dialog" aria-modal="true"> -->
    <div class="layer-bg" @click="popupinnerAction"></div>
    <div class="layer-inner">
      <div class="layer-content">
        <div class="inner-box">
          <div class="title">
            <h3>지도보기</h3>
          </div>
          <div class="area-spot">
            <div class="area-map">
              <!-- START 지도 API 영역 -->
              <img src="@/wine25/assets/images/_temp/img_map.jpg">
              <!-- END 지도 API 영역 -->
            </div>
            <img src="@/wine25/assets/images/icon/icon_map_marker_deep.png" style="position: absolute; top: 239px; left: 60%; width: 28px;height: 38px;"><!-- 마크 아이콘 - 지도 커스텀시 이 마크 아이콘을 사용할 경우 이미지 경로, width, height 값 참고 -->
          </div>
          <button class="btn-popup-close" @click="popupinnerAction" @keydown.9="tabFocusRemove('popupinnerAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
            <span class="hidden">닫기</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- END : 부분팝업 타이틀형 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "PopupWineStoreLocation",
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupinnerAction() {
      this.$emit('popupEvent', 'popupWineStoreLocation');
      this.modalActiveEvent('popupWineStoreLocation');
    },
  },
  mounted() {
    this.modalActiveEvent('popupWineStoreLocation');
  }
};
</script>
