<!-- START : 스와이프 배너 -->
<template>
  <section class="event-swiper-banner">
    <div v-show="isShow && swiperInfo.length > 0">
      <div class="swiper-button-prev" aria-label="이전슬라이드" slot="button-prev" ref="eventSwiperPrev" role="button"></div>
      <div class="swiper-button-next" aria-label="다음슬라이드" slot="button-next" ref="eventSwiperNext" role="button"></div>
      <swiper :options="swiperOption" ref="eventSwiper" v-show="isShow && swiperInfo">
        <swiperSlide v-for="(item, index) in swiperInfo" :key="`swiper`+index">
          <gs-link :to="item.imgLinkUrl"><img :src="item.ctnsPathNm" :alt="item.ctnsDesc" :title="item.ctnsDesc" /></gs-link>
        </swiperSlide>
      </swiper>
      <div class="swiper-pagination" slot="pagination" ref="eventSwiperPagination"></div>
    </div>
  </section>
</template>
<!-- END : 스와이프 배너 -->

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import SlideControlMixin from '@/mixins/SlideControlMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'EventComnSwiper',
  mixins: [SlideControlMixin],
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    eventInfo: Object,
    isShow: Boolean,
  },
  data() {
    return {
      swiperOption: {}, // 스와이프 옵션
    };
  },
  async created() {
  },
  methods: {
  },
  computed: {
    swiperInfo() {
      if (this.eventInfo && this.eventInfo.eventCtnsList) {
        return this.eventInfo.eventCtnsList.filter(info => {
          return info.eventCtnsDtlTypeCd == "0000" && (info.dspScrSpCd == "00" || info.dspScrSpCd == "02") && info.eventCtnsTypeCd == "05";
        });
      }
      return null;
    },
  },
  async mounted() {
    this.slideNextPrevButton('eventSwiper', true);
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
