<!--
Design: views/cu/SC-FO-CU-GF-MS-018
Pg id:
Uri: /cu/login
-->
<template>
  <div class="wrap-login login-main" v-bind:class="[siteClass]">

  </div>
</template>
<script>
/* START : 실사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ApiUtils from '@/common/ApiUtils';
import PopupDormantAccount from '@/views/cu/loginmgnt/PopupDormantAccount.vue'; // 휴면해제 팝업
import PopupAgreement from '@/views/cu/loginmgnt/PopupAgreement.vue'; // 필수약관 팝업
import JwtUtils from '@/common/JwtUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import CuUtils from '@/common/cu/CuUtils';
import Tracker from '@/common/Tracker';
import SiteUtils from '@/common/SiteUtils';
import ConsoleUtils from '@/common/ConsoleUtils';

export default {
  name: 'Login',
  data() {
    return {
      siteClass: '',
    };
  },
  mounted() {
    const vm = this;
    vm.siteClass = CookieUtils.getSiteClass();
    window.addEventListener( 'message', (e) => {
        if (e.data.callValue == 'parent') {
          JwtUtils.saveRefreshToken(e.data.rtkn);
          JwtUtils.saveIdToken(e.data.itkn);
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
