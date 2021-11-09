<!--
views/pa/SC-FO-PA-GS-MP-035
-->
<template>
    <!-- START : 앱리뷰 이벤트 팝업 -->
    <div id="popupAppReview" class="wrap-layer description-layer review-event" role="dialog" aria-labelledby="popupAppReview" aria-modal="true" :class="{active : this.modalActive.popupAppReview}">
      <div class="layer-bg" @click="popupClose"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>GS Fresh Mall 리뷰 이벤트</h3>
          </div>
          <div class="layer-content">
            <div class="message">
              쇼핑은 즐거우셨나요?<br>
              고객님의 소중한 의견을 기다리고 있습니다.<br>
              GS Fresh Mall을 칭찬하는 앱 리뷰 혹은<br>
              개선 의견을 남겨주시면 추첨을 통해 혜택을 드립니다.
            </div>
          </div>
        </div>
        <div class="btn-alert-bottom">
          <button class="btn-cancel" aria-label="앱개선 작성 팝업활성화" aria-haspopup="dialog" @click="popupAppImproveActive">개선해주세요</button>
          <button class="btn-confirm" @click="popupAction">칭찬하고 싶어요</button>
        </div>
        <button class="btn-layer-close" @click="popupClose" @keydown.9="tabFocusRemove('popupClose')" aria-label="포커스 아웃 시 팝업 닫기">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 앱리뷰 이벤트 팝업 [25] 앱리뷰   DEPBOSFR-7343 -->
    <!-- 7658 [25] 앱리뷰 PR   DEPBOSFR-7658 변경 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import OrderComplete from '@/views/od/OrderComplete'; // 팝업 - 앱개선 작성

export default {
  name: "popupAppReview",
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      if (this.$parent.ordInfo.appReviewEventId == null ||
          this.$parent.ordInfo.appReviewEventId == '') {
          this.$gsdialog.alert('현재 진행 중인 이벤트가 없습니다.');
          this.$parent.popup.popupAppReviewEvent = false;
      } else if (this.$parent.ordInfo.appReviewEventId !== null) {
        location.href = '/ev/event/' + this.$parent.ordInfo.appReviewEventId;
      }
    },
    popupClose() {
      this.modalActiveEvent('popupAppReview');
    },
    popupAppImproveActive() {
      this.checkAppImproveMsg = this.$parent.checkAppImproveActiveMsg();
      if (this.checkAppImproveMsg != null && this.checkAppImproveMsg != '') {
        this.$parent.popup.popupAppReviewEvent = false;
        this.$gsdialog.alert(this.checkAppImproveMsg);
      } else {
        this.$parent.popupAppImproveActive();
      }
    },
  },
  mounted() {
    this.modalActiveEvent('popupAppReview');
  },
};
</script>
