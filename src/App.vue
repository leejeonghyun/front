<template>
  <div id="app" :class="{'marketFor': cmmSiteClass()}">
    <!-- START : 본문바로가기-->
    <div class="skip-nav">
      <a href="#main" @click="actSkipNav" role="button">본문 바로 가기</a>
      <a href="#footer" role="button">푸터 바로 가기</a>
    </div>

    <!-- END : 본문바로가기 -->
    <transition name="pageView" v-on:enter="pageViewEnter" v-on:after-enter="pageViewAfterEnter">
      <!-- <keep-alive :include="cachedViews()"> -->
      <router-view :key="this.$route.fullPath" />
      <!-- </keep-alive> -->
    </transition>
    <!-- START : APP Interface 항목 common.app.js 에서 호출 후 callback에서 value set -->
    <div>
      <input type="hidden" id="deviceId" name="deviceId" />
      <input type="hidden" id="appNowpage" name="appNowpage" />
      <input type="hidden" id="androidVersion" name="androidVersion" />
      <input type="hidden" id="appVersion" name="appVersion" />
      <input type="hidden" id="appBundleid" name="appBundleid" />
      <input type="hidden" id="telecomNm" name="telecomNm" />
      <input type="hidden" id="debug" name="debug" />
    </div>
    <!-- END : APP Interface 항목. -->
  </div>
</template>

<script>
import AppBase from '@/common/ss/AppBase';
import GnbSwiperMixin from '@/mixins/GnbSwiperMixin';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: 'app',
  mixins: [GnbSwiperMixin],
  async created() {
    await CookieUtils.setDaybreakCookie();
    // await LoginUtils.mallChange();
    // this.$store.dispatch('getMainConrInfo', '');
  },
  mounted() {
    AppBase.init(this.$store);
    console.log(this.$router);
  },
  updated() {
    localStorage.setItem('skinToneFlag', this.getSkinToneFlag());
    this.$nextTick(() => {
      AppBase.initStat();
      this.cmmSiteClass();
    });
  },
  methods: {
    actSkipNav() {
      document.querySelector('main').focus();
    },
    cachedViews() {
      // regexp
      return /Main|pageName/;
    },
    cmmSiteClass() {
      localStorage.setItem('skinToneFlag', this.getSkinToneFlag());
      // Maker For Skin 적용
      if (this.getSkinToneFlag() === 'MF') {
        // Market For의 URL('/pa/comm_auth_kmotion_frame') 인 경우 Class 에 'marketfor'를 추가하지 않는다.
        return location.href.indexOf('/pa/comm_auth_kmotion_frame') < 0 ? true : false;
      } else if (this.getSkinToneFlag() === 'TTL') {
        if (CookieUtils.getCmmSteId() === '3') {
          // Market For의 URL('/pa/comm_auth_kmotion_frame') 인 경우 Class 에 'marketfor'를 추가하지 않는다.
          return location.href.indexOf('/pa/comm_auth_kmotion_frame') < 0 ? true : false;
        } else {
          return false;
        }
      } else {
        // Maker For Skin 미적용
        return false;
      }
    },
    getSkinToneFlag() {
      let skinToneFlag = 'GSF';
      if (!StringUtils.isEmpty(this.$route.meta) && !StringUtils.isEmpty(this.$route.meta.skinToneFlag)) {
        skinToneFlag = this.$route.meta.skinToneFlag || 'GSF';
      }
      return skinToneFlag;
    }
  },
};
</script>
