<template>
    <div>
        <!-- 별도 페이지 없음.-->
    </div>
</template>

<script>
import Config from '@/common/Config.js';

export default {
    name: "GateExtention",
    created() {
        console.log("GateExtention.created");
    },
    mounted() {
        console.log("GateExtention.mounted");
        this.init();
    },
    methods: {
        init() {
            let query = {
                cid: this.$route.query.cid,
                igaw_eng: this.$route.query.igaw_eng,
                sn: this.$route.query.sn,
                ck: this.$route.query.ck,
                abx_tid: this.$route.query.abx_tid,
                appMarketYn: this.$route.query.appMarketYn,
                targetRedirectUrl: this.$route.query.targetRedirectUrl,
                bridgeUrl: this.$route.query.bridgeUrl,
                dawnOnYnByWeb: this.$route.query.dawnOnYnByWeb,
            };
            // 접속 기기 별 분기
            const userAgent = window.navigator.userAgent.toLowerCase();
            console.log("AGENT -> " + userAgent);
            if (userAgent.search("android") > -1) {
                query.appDwAUrl = "market://details?id=com.gsretail.android.smapp";
            } else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1 || (userAgent.search("ipad") > -1))) {
                query.appDwIUrl = "https://apps.apple.com/kr/app/id813494275";
            } else {
                query = null;
            }

            if ( !query || !query.targetRedirectUrl ) {
              alert("요청 정보에 필수값이 없습니다.");
            } else {
              // const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');
              console.log("query -> " + JSON.stringify(query));
              this.$router.push({path: query.targetRedirectUrl, query: query});
            }
        }
    }
};
</script>

<style scoped>

</style>
