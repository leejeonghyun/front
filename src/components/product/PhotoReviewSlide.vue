<template>
  <div class="product-top-visual">
    <button class="swiper-button-prev" aria-label="이전슬라이드"></button>
    <button class="swiper-button-next" aria-label="다음슬라이드"></button>
    <div class="swiper-pagination number">
      <span class="current" aria-live="assertive" aria-atomic="true">{{activeIndex}}</span>/
      <span class="total">{{totalIndex}}</span>
    </div>
    <swiper :options="swiperOption" ref="subDetailSwiper">
      <swiper-slide v-for="imgs in itmcImgList" :key="imgs.index" >
       <img v-bind:src="imgs.itmcCtnsFileNm" alt="고객등록이미지">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: "PhotoReviewSlide",
  props: {
    itmc: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    const $this = this;
     return {
      totalIndex: 0,
      activeIndex: 0,
      swiperOption: {
        slidesPerView: 1,
        autoHeight: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          init() {
            $this.activeIndex = this.activeIndex + 1;
            $this.totalIndex = this.slides.length;
          },
          slideChange() {
            $this.activeIndex = this.activeIndex + 1;
          }
        }
      },
      itmcImgList: [],
    };
  },
  mounted: async function() {
    const vm = this;
    setTimeout(fn, 100);
    // eslint-disable-next-line require-jsdoc
    async function fn() {
      console.log("photoReviewSlide :: itmc.itemId ::: "+vm.$props.itmc.itemId);
      const params = {
        itemId: vm.$props.itmc.itemId,
        itmcSeqno: vm.$props.itmc.itmcSeqno
      };

      // 상품평목록
      try {
        const result = await ApiUtils.get(
          '/fo/md/itmcmgnt/item-comment-detail',
          params
        );
        const respItmcImgList = result.data;
        const itmcImgList = respItmcImgList["data"];
        vm.itmcImgList = itmcImgList;
        vm.totalIndex = itmcImgList.length;
        // this.$gsdialog.alert(JSON.stringify(result.data));
      } catch (e) {
        vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
    }
  }
};
</script>

<style>

</style>
