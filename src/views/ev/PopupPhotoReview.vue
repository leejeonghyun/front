<!--
Design: views/ss/SC-FO-SS-GF-MP-704.vue
Pg id:
Uri:
-->
<template>
  <div id="popupPhotoReview" class="wrap-full-popup popu" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupPhotoReview}, siteClass]">
    <div class="header-popup">
      <strong>이미지 상세보기</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="popup-slide">
          <div class="product-top-visual">
            <button class="swiper-button-prev" aria-label="이전슬라이드" ref="subDetailSwiperPrev"></button>
            <button class="swiper-button-next" aria-label="다음슬라이드" ref="subDetailSwiperNext"></button>
            <swiper :options="swiperOption" ref="subDetailSwiper">
              <swiper-slide
                      v-for="imgs in imageList"
                      :key="imgs.bditmCtnsSeqno"
                      v-bind:imgs="imgs">
                 <img :src="imgs.bditmImgPathNm" alt="고객등록이미지" />
              </swiper-slide>
            </swiper>
            <div class="swiper-pagination number" ref="subDetailSwiperPagination" aria-live="assertive" aria-atomic="true"></div>
          </div>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import SlideControlMixin from '@/mixins/SlideControlMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupPhotoReview",
  components: {
    swiper,
    swiperSlide
  },
  mixins: [LayerPopupMixin, SlideControlMixin],
  props: ['imageList'],
  data() {
    return {
      swiperOption: {
        autoHeight: true,
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupPhotoReview');
      this.modalActiveEvent('popupPhotoReview');
    },
  },
  mounted() {
    this.modalActiveEvent('popupPhotoReview');
    this.slideNextPrevButton('subDetailSwiper', true, 'fraction');
  }
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
