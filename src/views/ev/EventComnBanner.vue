<!-- START : 배너 -->
<template>
  <section>
    <section class="event-cont event-banner" v-if="isShow && bannerInfo && bannerInfo.length > 0">
      <!-- 이미지 -->
      <div class="banner" v-for="(item, index) in bannerInfo" :key="`banner`+index">
        <div class="hidden">{{item.ctnsDesc}}</div>
        <gs-link :to="item.imgLinkUrl"><img :src="item.ctnsPathNm" :alt="item.ctnsDesc" :title="item.ctnsDesc"/></gs-link>
      </div>
    </section>
  </section>
</template>
<!-- END : 배너 -->

<script>
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'EventComnBanner',
  components: {
  },
  props: {
    eventInfo: Object,
    isShow: Boolean,
  },
  data() {
    return {
    };
  },
  async created() {
  },
  methods: {
  },
  computed: {
    bannerInfo() {
      if (this.eventInfo && this.eventInfo.eventCtnsList && this.eventInfo.eventCtnsList.length > 0) {
        return this.eventInfo.eventCtnsList.filter(info => {
          return info.eventCtnsDtlTypeCd == "0000" && (info.dspScrSpCd == "00" || info.dspScrSpCd == "02") && info.eventCtnsTypeCd == "06";
        });
      }
      return null;
    }
  },
  mounted() {

  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
