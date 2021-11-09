<!--
Design: views/cu/SC-FO-CU-GF-MS-018
Pg id:
Uri: /cu/multiLogin
-->
<template>
  <div class="wrap-login login-main">
  </div>
</template>
<script>
/* START : 실사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import JwtUtils from '@/common/JwtUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';

export default {
  name: 'Login',
  data() {
    return {
      siteClass: '',
    };
  },
  mounted() {
    const vm = this;
    window.addEventListener( 'message', (e) => {
      if (e.data.callValue == 'parent') {
        JwtUtils.saveRefreshToken(e.data.rtkn);
      }
      if (e.data.callValue == 'logout') {
        LoginUtils.logout();
      }
    });
  },
  methods: {
  },
  updated() {
  },
  created() {
  },
};
</script>
