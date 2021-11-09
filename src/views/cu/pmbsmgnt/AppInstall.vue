<template>
  <div>
    <!-- 별도 페이지 없음.-->
  </div>
</template>

<script>
import Config from '@/common/Config.js';
import SiteUtils from '@/common/SiteUtils.js';
import ContextUtils from '@/common/ContextUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'Gate',
  created() {},
  mounted() {
    const encodeType = this.$route.query.encodeType;
    const target = this.$route.query.target;
    let url = this.$route.query.url;
    const abxTid = this.$route.query.abx_tid;
    const storeType = this.$route.query.storeType;

    if (encodeType == 'base64') {
      try {
        url = window.atob(url);
        if (url.indexOf('?') > -1) {
          url += '&abx_tid=' + abxTid;
        } else {
          url += '?abx_tid=' + abxTid;
        }
      } catch (e) {
        this.$gsdialog.alert('오류가 발생했습니다.').then((dialog) => {});
      }
    }
    // 달리살다
    const schemeUrl =
      Config.app.dalisalda.scheme +
      '?movemenu=' +
      target +
      '&moveurl=' +
      encodeURIComponent(url);
    const intentUrl =
      'intent://default?movemenu=' +
      target +
      '&moveurl=' +
      encodeURIComponent(url) +
      '#Intent;scheme=dalisalda;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.gsretail.android.dalisalda;end';
    const tstoreUrl = Config.app.dalisalda.tstore;

    const appDwIUrl = Config.app.dalisalda.store.ios;
    const appDwAUrl = Config.app.dalisalda.store.android;

    if (ContextUtils.getAgent() == 'ios') {
      location.href = appDwIUrl;
    } else if (ContextUtils.getAgent() == 'android') {
      if (storeType == 'T') {
        location.href = tstoreUrl;
      } else {
        location.href = appDwAUrl;
      }
    } else {
      // Not mobile
      alert('PC환경에서 접속하셨습니다. GS 프레시 페이지로 이동합니다.');
      location.href = SiteUtils.freshpc();
    }
  },
};
</script>

<style scoped>
</style>
