<template>
  <div class="wrap-recommend-search">
    <h3 class="hidden">추천 검색어</h3>
    <swiper :options="swiperOptionScrollX">
      <swiper-slide v-for="(item, index) in $store.state.search.recommendSearchList" :key="index">
        <button data-sc-action="search.onsite" data-dimension-name="search.recom" :data-dimension-value="item.ctnsTitle">
          <gs-link :to="item.linkUrl" :target="getTarget(item.scrConTypeCd)">{{item.ctnsTitle}}</gs-link>
        </button>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  components: {
    swiper,
    swiperSlide,
  },
  name: 'RecommendSearch',
  data() {
    return {
      swiperOptionScrollX: {
        slidesPerView: 'auto',
        freeMode: true,
        observer: true,
        observeParents: true,
      }
    };
  },
  mounted() {
    // 추천검색어 조회
    // this.$store.commit('getRecentAutoSave');
  },
  methods: {
    getTarget(scrConTypeCd) {
      const conTypeCd = scrConTypeCd;
      if (conTypeCd == '01') {
        return '_blank';
      } else if (conTypeCd == '02') {
        return '_parent';
      } else if (conTypeCd == '03') {
        return '_self';
      } else if (conTypeCd == '04') {
        return '_top';
      }
    },
  },
};
</script>

