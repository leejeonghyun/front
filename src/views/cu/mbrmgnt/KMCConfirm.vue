<template>
  <div class="wrap-signup"></div>
</template>
<script>
import CookieUtils from '@/common/CookieUtils';
import StringUtils from '@/common/StringUtils';
import CuUtils from '@/common/cu/CuUtils';
import SiteUtils from '@/common/SiteUtils';

export default {
  name: 'App',
  data() {
    return {
      form: {
        rec: '',
        cert: '',
      },
      siteClass: '',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '회원가입 < 회원가입 < %s',
  },
  methods: {},
  created() {
    const UserAgent = window.navigator.userAgent;
    const vm = this;
    vm.form.rec = vm.$route.query.rec_cert;
    vm.form.cert = vm.$route.query.certNum;
    const creDvcId = localStorage.getItem("deviceId");
    // 모바일 접근 체크 //
    // 모바일일 경우 (변동사항 있을경우 추가 필요)
    if (StringUtils.isEmpty(creDvcId)) {
      if (
          UserAgent.match(
            /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
          ) != null ||
          UserAgent.match(/LG|SAMSUNG|Samsung/) != null
        ) {
          localStorage.setItem('strRecCert', vm.form.rec);
          localStorage.setItem('strCertNum', vm.form.cert);
        }
    }
  },
  destroyed() {},
  mounted: function () {
    const UserAgent = window.navigator.userAgent;
    const reUrl = localStorage.getItem('reUrl');
    const dvcId = localStorage.getItem("deviceId");

    // 모바일 접근 체크 //
    // 모바일일 경우 (변동사항 있을경우 추가 필요)
    if (!StringUtils.isEmpty(dvcId)) {
      opener.getSelfCertification(this.form.rec, this.form.cert, function() {
        window.close();
      });
    } else {
      if (
        UserAgent.match(
          /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
        ) != null ||
        UserAgent.match(/LG|SAMSUNG|Samsung/) != null
      ) {
        location.href = reUrl;
      } else {
        opener.getSelfCertification(this.form.rec, this.form.cert, function() {
          window.close();
        });
      }
    }
  },
};
</script>
