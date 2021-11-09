<template>
  <div class="wrap-signup" v-bind:class="[siteClass, {'integrate-member__wrap' : siteClass == 'marketfor'}]"></div>
</template>
<script>
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: 'App',
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '로그인 < %s',
  },
  methods: {},
  destroyed() {},
  mounted() {
    const vm = this;
    const code = this.$route.query.code;
    const state = this.$route.query.state;
    const snsReUrl = localStorage.getItem('snsReUrl');
    const creDvcId = localStorage.getItem("deviceId");
    const mobType = 'MOB';
    localStorage.removeItem('mobType');
    const data = {
      code: code,
      state: state,
      mobType: mobType,
      mallId: CookieUtils.getMallId(),
    };
    ApiUtils.get('/fo/cu/loginmgnt/sns-login-payco-response', data, {
      'Content-Type': 'application/json',
    }).then(res => {
      if (res.data === null) {
        console.error(res.data.msg);
        this.$gsdialog.alert('SNS로그인을 불러올수 없습니다.', { html: true });
        return;
      } else {
        if (StringUtils.isEmpty(creDvcId)) {
          if (mobType === 'MOB') {
            const snsDate = {
              resultCode: res.data.data.resultCode,
              resultMessage: res.data.data.resultMessage,
              snsId: res.data.data.snsId,
              snsType: res.data.data.snsType,
              snsName: res.data.data.snsName,
              snsEmail: res.data.data.snsEmail,
              snsAccessToken: res.data.data.snsAccessToken,
            };
            vm.$store.state.cu.snsId = res.data.data.snsId;
            vm.$store.state.cu.snsType = res.data.data.snsType;
            vm.$store.state.cu.snsName = res.data.data.snsName;
            vm.$store.state.cu.snsEmail = res.data.data.snsEmail;
            localStorage.setItem('snsDate', JSON.stringify(snsDate));
            localStorage.setItem('snsTypeCod', res.data.data.snsType);
            localStorage.setItem('snsId', res.data.data.snsId);

            console.log('res.data.data', res.data.data);
            location.href = snsReUrl;
          } else {
            opener.getSnsPaycoCallback(
              res.data.data.resultCode,
              res.data.data.resultMessage,
              res.data.data.snsId,
              res.data.data.snsType,
              res.data.data.snsName,
              res.data.data.snsEmail,
              res.data.data.snsAccessToken,
              function() {
                window.close();
              }
            );
          }
        } else {
          const snsDate = {
            resultCode: res.data.data.resultCode,
            resultMessage: res.data.data.resultMessage,
            snsId: res.data.data.snsId,
            snsType: res.data.data.snsType,
            snsName: res.data.data.snsName,
            snsEmail: res.data.data.snsEmail,
            snsAccessToken: res.data.data.snsAccessToken,
          };
          vm.$store.state.cu.snsId = res.data.data.snsId;
          vm.$store.state.cu.snsType = res.data.data.snsType;
          vm.$store.state.cu.snsName = res.data.data.snsName;
          vm.$store.state.cu.snsEmail = res.data.data.snsEmail;
          localStorage.setItem('snsDate', JSON.stringify(snsDate));
          localStorage.setItem('snsTypeCod', res.data.data.snsType);
          localStorage.setItem('snsId', res.data.data.snsId);
          opener.getSnsPaycoCallback(
            res.data.data.resultCode,
            res.data.data.resultMessage,
            res.data.data.snsId,
            res.data.data.snsType,
            res.data.data.snsName,
            res.data.data.snsEmail,
            res.data.data.snsAccessToken,
            function() {
              window.close();
            }
          );
        }
      }
    });
  },
};
</script>
