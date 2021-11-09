<template>
    <div></div>
</template>
<script>
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import ConsoleUtils from '@/common/ConsoleUtils';
import JwtUtils from '@/common/JwtUtils';

export default {
    methods: {
        storeCookie(token) {
            // localhost가 아닐 경우, 로그 아웃 처리
            if (CookieUtils.getFirstDomain() !== 'localhost') {
                JwtUtils.destroyRefreshToken();
                JwtUtils.destroyIdToken();
            }
            CookieUtils.setCookie('accounts_refresh_token', token, 1);
            ConsoleUtils.log('token stored...');
        }
    },
    created() {
        const token = this.$route.query.token;

        if (token) {
            this.storeCookie(token);
        }
    },
    mounted() {
        const vm = this;
        window.addEventListener('message', function(event) {
            if (event.data && event.data.refresh_token) {
                vm.storeCookie(event.data.refresh_token);
                event.source.postMessage('YLOGIN', event.origin);
            }
        }, false);

        // for testing
        window.storeCookie = this.storeCookie;
    }
};
</script>
