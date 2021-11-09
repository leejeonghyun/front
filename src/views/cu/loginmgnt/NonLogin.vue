<!--
Design: views/cu/SC-FO-CU-GF-PS-010
Pg id:
Uri: /cu/non_login
-->
<template>
  <Loading />
</template>
<script>
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import JwtUtils from '@/common/JwtUtils';
import Loading from '@/components/common/Loading.vue';

export default {
  name: "NonLogin",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
  },
  data() {
    return {};
  },
  components: {
    Loading,
  },
  mounted() {
    this.nonLogin();
  },
  methods: {
    async nonLogin() {
      // console.log('nonLogin');
      // console.log('this.$route.query.returnUrlNonLogin', this.$route.query.returnUrlNonLogin);

      const inflowChannel = this.$route.query.inflowChannel;
      const data = {
        mallId: CookieUtils.getMallId(),
        cmmSteId: CookieUtils.getCmmSteId(),
        mdaType: CookieUtils.getMdaType(),
        chanlId: CookieUtils.getChanlId(inflowChannel)
      };

      console.log('data', data.chanlId);
      const response = await ApiUtils.post('/fo/cu/loginmgnt/non-login', data, {
        'Content-Type': 'application/json',
      });

      console.log('response', response);

      if (response.data.success === true) {
        const data = response.data.data;
        JwtUtils.saveEncVal(data.ENC_VAL);

        const user = data.userRslt;
        CookieUtils.setCookie('STOR_ID', user.storId);
        CookieUtils.setCookie('SUPPL_FIRM_CD', user.supplFirmCd);
        CookieUtils.setCookie('MALL_ID', user.mallId);
        CookieUtils.setCookie('STE_CONN_MDA_TYPE_CD', user.mdaType);
        if (CookieUtils.getCmmSteId() == '3') {
          CookieUtils.setCookie('CHANL_ID', CookieUtils.getChanlId());
        } else {
          CookieUtils.setCookie('CHANL_ID', user.chanlId);
        }

        // console.log('매장 ID storId', CookieUtils.getCookie('STOR_ID'));
        // console.log('공급업체코드 supplFirmCd', CookieUtils.getCookie('SUPPL_FIRM_CD'));
        // console.log('접속몰 mallId', CookieUtils.getCookie('MALL_ID'));
        // console.log('사이트접속매체유형코드 steConnMdaTypeCd', CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD'));
        // console.log('채널ID CHANL_ID', CookieUtils.getCookie('CHANL_ID'));
        console.log(
          "CookieUtils.getCookie('non_login_count')",
          CookieUtils.getCookie('non_login_count')
        );
        let nonLoginCount = Number(CookieUtils.getCookie('non_login_count'));
        nonLoginCount = nonLoginCount + 1;
        CookieUtils.setCookie('non_login_count', nonLoginCount);

        // location.href = this.$route.query.returnUrlNonLogin;
      }
    },
    getMain() {
      const string = CuUtils.getLink();
      location.href = string;
    },
    getLogin() {
      location.href = this.$route.query.returnUrlNonLogin;
    },
  },
};
</script>
