<!--
Design: views/ss/SC-FO-SS-GF-MP-704.vue
Pg id:
Uri:
-->
<template>
  <!-- START : 할인 정보 레이어 -->
  <div id="popupPhotoReview" class="wrap-full-popup popu" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupPhotoReview}, siteClass]">
    <div class="header-popup">
      <strong>이미지 모아보기</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="popup-slide">
          <div class="product-top-visual">
            <button class="swiper-button-prev" aria-label="이전슬라이드"></button>
            <button class="swiper-button-next" aria-label="다음슬라이드"></button>
           <!-- <div class="swiper-pagination number" aria-live="assertive" aria-atomic="true"></div> -->
            <swiper :options="swiperOption" ref="subDetailSwiper">
              <swiper-slide
                      v-for="image in imageList.itmcDtlInqRsltDto"
                      v-bind:key="image.itmcCtnsSeqno"
                      v-bind:image="image">
                <span class="item">
                <img :src="image.itmcCtnsPathNm" alt="고객등록이미지" />
                </span>
                <article class="best-unit-area review pop">
                  <section class="unit">
                    <div class="review-unit">
                      <div class="profile-content">
                        <p class="id-text">
                          {{imageList.webId | anonymous}}
                        </p>
                        <p class="score-label">
                          <span  :aria-label="'구매자 상품평 5점 만점 중 '+ imageList.itmcScor +'점.'" :style="'width:' + (imageList.itmcScor*20) + '%;'" class="star-gauge"></span>
                        </p>
                      </div>
                      <p class="review-text">{{imageList.itmcCnts}}</p>
                    </div>
                  </section>
                </article>
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
  props: ['imageList', 'imgIdx'],
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        autoHeight: true,
        initialSlide: Number(this.imgIdx),
        pagination: {
          type: 'fraction',
          el: '.product-top-visual .swiper-pagination'
        },
        on: {
          init: 6
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
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
    anonymous(value) {
      if (value != null) {
        const valLen = value.length;
        // const newValue = value.substring(0, valLen-2).concat('**');
        const newValue = value.substring(0, 4).concat('******');
        return newValue;
      } else {
        return '******';
      }
    },
  },
  mounted() {
     console.log(" =111== " +JSON.stringify(this.imageList));
    this.modalActiveEvent('popupPhotoReview');
  }
};
</script>
