<!--
Design: views/cu/SC-FO-CU-GF-MS-018
Pg id:
Uri: /cu/login_accounts
-->
<template>
  <div class="wrap-login">
    <ol>
      <li>refresh_token: {{ refresh_token }}</li>
      <!-- <li>webId: {{ webId }}</li>
      <li>psw: {{ psw }}</li>-->
    </ol>
  </div>
</template>
<script>
/* START : 실사용 컴포넌트 */
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import ConsoleUtils from '@/common/ConsoleUtils';
export default {
  data() {
    return {
      refresh_token: '',
      webId: '',
      psw: '',
    };
  },
  mounted() {
    const vm = this;

    window.addEventListener(
      'message',
      function(event) {
        ConsoleUtils.log('child');
        // ConsoleUtils.log('event', event);
        // ConsoleUtils.log('data', event.data);
        ConsoleUtils.log('origin', event.origin);
        // ConsoleUtils.log('source', event.source);

        if (!event.data.refresh_token) {
          return;
        }

        ConsoleUtils.log('event.data.refresh_token', event.data.refresh_token);
        // ConsoleUtils.log('event.data.webId', event.data.webId);
        // ConsoleUtils.log('event.data.psw', event.data.psw);

        ConsoleUtils.log('cookie', document.cookie);

        document.cookie =
          'accounts_refresh_token=' +
          window.btoa(escape(event.data.refresh_token)) +
          '; domain=' +
          location.host.substring(location.host.indexOf('.') + 1) +
          '; path=/';

        ConsoleUtils.log('cookie', document.cookie);

        ConsoleUtils.log(
          'accounts_refresh_token',
          CookieUtils.getCookie('accounts_refresh_token')
        );

        vm.refresh_token = window.btoa(escape(event.data.refresh_token));
        // vm.webId = event.data.webId;
        // vm.psw = event.data.psw;

        event.source.postMessage('Y', event.origin);
      },
      false
    );
  },
};
</script>
<style lang="scss">
</style>
