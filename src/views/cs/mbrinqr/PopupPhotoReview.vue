<!--
Design: views/ss/SC-FO-SS-GF-MP-704.vue
Pg id:
Uri:
-->
<template>
  <!-- START : 할인 정보 레이어 -->
  <div id="popupPhotoReview" class="wrap-full-popup popu" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupPhotoReview}, siteClass]">
    <div class="header-popup">
      <strong>이미지 상세보기</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="popup-slide">
          <div class="product-top-visual">
            <button class="swiper-button-prev" aria-label="이전슬라이드"></button>
            <button class="swiper-button-next" aria-label="다음슬라이드"></button>
            <div class="swiper-pagination number" aria-live="assertive" aria-atomic="true"></div>
            <swiper :options="swiperOption" ref="subDetailSwiper">
              <swiper-slide v-for="(img, inx) in imageList" :key="inx">
                 <img :src="img.filePathNm" alt="img.saveFileNm" />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
  <!-- END : 할인 정보 레이어 -->
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupPhotoReview",
  components: {
    swiper,
    swiperSlide
  },
  props: {
    imageList: {
      type: Array,
    },
    imgInx: {
      type: Number,
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        autoHeight: true,
        initialSlide: this.imgInx,
        pagination: {
          type: 'fraction',
          el: '.product-top-visual .swiper-pagination'
        },
        navigation: {
          nextEl: '.product-top-visual .swiper-button-next',
          prevEl: '.product-top-visual .swiper-button-prev'
        },
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupPhotoReview');
      this.modalActiveEvent('popupPhotoReview');
    },
  },
  mounted() {
    // console.log('imageList', this.imageList);
    // console.log('this.imgInx', this.imgInx);
    // console.log(" =111== " +JSON.stringify(this.imageList));
    this.modalActiveEvent('popupPhotoReview');
  }
};
</script>
