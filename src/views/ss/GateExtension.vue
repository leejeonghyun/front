<template>
    <div>
        <!-- 별도 페이지 없음.-->
    </div>
</template>

<script>
import Tracker from '@/common/Tracker';

export default {
  name: "GateExtension",
  created() {
      console.log("GateExtension.created");
  },
  mounted() {
      console.log("GateExtension.mounted");
      this.init();
  },
  methods: {
    init() {
        const query = {
            cid: this.$route.query.cid,
            igaw_eng: this.$route.query.igaw_eng,
            sn: this.$route.query.sn,
            ck: this.$route.query.ck,
            abx_tid: this.$route.query.abx_tid,
            appMarketYn: this.$route.query.appMarketYn,
            dawnOnYnByWeb: this.$route.query.dawnOnYnByWeb,
            gateExtension: 1,
            targetRedirectUrl: encodeURIComponent(this.$route.query.targetRedirectUrl),
        };
        const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');

        // 접속 기기 별 분기
        const userAgent = window.navigator.userAgent.toLowerCase();
        const targetRedirectUrl = this.$route.query.targetRedirectUrl;
        console.log("AGENT -> " + userAgent);
        console.log("targetRedirectUrl -> " + this.$route.query.targetRedirectUrl);
        console.log("##queryString -> " + queryString);

        const page = {
                pageName: "App GateEx Init"
            };

        try {
            Tracker.pageView(page);
        } catch {
        }

        setTimeout(function () {
            if ( !query || !query.targetRedirectUrl ) {
            alert("요청 정보에 필수값이 없습니다.");
            } else {
                const targetRedirectUrlHref = targetRedirectUrl;
                if ( targetRedirectUrlHref.indexOf("?") == -1 ) {
                    location.href = targetRedirectUrl + "?" + queryString;
                } else {
                    location.href = targetRedirectUrl + "&" + queryString;
                }
            }
        }, 1000);
    }
  }
};
</script>

<style scoped>

</style>
