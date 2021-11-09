<template>
    <div></div>
</template>
<script>
import LoginUtils from '@/common/LoginUtils';
import ConsoleUtils from '@/common/ConsoleUtils';

export default {
    methods: {
        async logout() {
            await LoginUtils.logout();
            ConsoleUtils.log('logout completed...');
        }
    },
    mounted() {
        const vm = this;
        window.addEventListener('message', function(event) {
            if (event.data && event.data.logout && event.data.logout === 'common') {
                vm.logout().then(()=>{
                    event.source.postMessage('YLOGOUT', event.origin);
                    ConsoleUtils.log('sent logout result...');
                });
            }
        }, false);

        // for testing
        window.logout = this.logout;
    }
};
</script>
