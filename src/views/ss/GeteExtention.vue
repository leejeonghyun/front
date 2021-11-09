<template>
    <div>
        <!-- 별도 페이지 없음.-->
    </div>
</template>

<script>
import Config from '@/common/Config.js';
import ContextUtils from "@/common/ContextUtils";

export default {
    name: "GeteExtention",
    created() {
        console.log("GeteExtention.created");
    },
    mounted() {
        console.log("GeteExtention.mounted");
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
            if (ContextUtils.getAgent() == "android") {
                query.appDwAUrl = "market://details?id=com.gsretail.android.smapp";
            } else if (ContextUtils.getAgent() == "ios") {
                query.appDwIUrl = "https://apps.apple.com/kr/app/id813494275";
            } else {
                query = null;
            }

            if ( !query || !query.targetRedirectUrl ) {
              alert("요청 정보에 필수값이 없습니다.");
            } else {
              // bridgeUrl 존재 시 bridgeUrl(전시)로 이동
              if (query.bridgeUrl) {
                const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');
                location.href = Config.app.gsfresh.redirectUrl.dp + "?" + queryString;
              } else {
                this.$router.push({path: query.targetRedirectUrl, query: query});
              }
            }
        }
    }
};
</script>

<style scoped>

</style>
