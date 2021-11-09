<!--
@view/ss/SC-FO-SS-GF-MP-701
-->
<template>
    <!-- START : alert 레이어 -->
    <div id="popupUnapplicableCoupon" class="wrap-layer alert-layer plus-alert-layer active" role="dialog" aria-labelledby="popupUnapplicableCoupon" aria-modal="true" :class="[{active : this.modalActive.popupUnapplicableCoupon}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="alert-layer-inner coupon">
        <div class="inner-box">
          <div class="title">
            <h3>쿠폰 적용 불가 상품</h3>
          </div>
          <div class="layer-content">
            <ul class="list-info">
              <li>전통주</li>
              <li>쓰레기 종량제 봉투</li>
            </ul>
          </div>
        </div>
        <!-- 수정 START : 2020.02.06 마크업 변경(버튼위치 수정 및 클래스명 삭제) -->
        <div class="btn-alert-bottom">
          <button class="btn-confirm" @click="popupAction">확인</button>
        </div>
        <button class="btn-layer-close" @click="popupAction"><span class="hidden">닫기</span></button>
        <!-- 수정 END : 2020.02.06 마크업 변경(버튼위치 수정 및 클래스명 삭제) -->
      </div>
    </div>
    <!-- END : alert 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupUnapplicableCoupon",
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
      this.$emit('popupEvent', 'popupUnapplicableCoupon');
      this.modalActiveEvent('popupUnapplicableCoupon');
    },
  },
  mounted() {
    this.modalActiveEvent('popupUnapplicableCoupon');
  },
};
</script>
