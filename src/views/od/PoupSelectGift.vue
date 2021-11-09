<!--
views/od/SC-FO-OD-GS-MP-023
-->
<template>
  <!-- START : 선물하기 레이어 -->
  <div id="popupSelectGift" class="wrap-layer gift-select-layer" role="dialog" aria-labelledby="popupgGiftBtn" aria-modal="true" :class="[{active : this.modalActive.popupSelectGift}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <h3 class="hidden">선물하기 / 조르기</h3>
      <div class="box-area">
        <ul class="select-gift">
          <li class="btn-gift-send">
            <a href="#">
              <span class="wrap-txt">
                <strong>선물하기</strong>
                <span class="txt-desc">감동의 깜짝 선물~! <br>가족이나 친구에게  깜짝 선물해보세요.</span>
              </span>
            </a>
          </li>
          <li class="btn-gift-recieve">
            <a href="#">
              <span class="wrap-txt">
                <strong>조르기</strong>
                <span class="txt-desc">사주세요~! <br> 내가 받고 싶은 상품 선택해서 친구한테<br> 조르기해보세요.</span>
              </span>
            </a>
          </li>
        </ul>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
  </div>
  <!-- END : 선물하기 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupSelectGift",
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
      this.$emit('popupEvent', 'popupSelectGift');
      this.modalActiveEvent('popupSelectGift');
    },
  },
  mounted() {
    this.modalActiveEvent('popupSelectGift');
  }
};
</script>
