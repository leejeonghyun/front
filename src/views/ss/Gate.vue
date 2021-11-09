<template>
    <div>
        <h1>Gate</h1>
        <!-- 별도 페이지 없음.-->
    </div>
</template>

<script>
import Config from '@/common/Config.js';
import SiteUtils from '@/common/SiteUtils.js';
import ContextUtils from "@/common/ContextUtils";
import CookieUtils from '@/common/CookieUtils';
import Tracker from '@/common/Tracker';

export default {
    name: "Gate",
    created() {
        console.log("Gate.created");
    },
    mounted() {
        console.log("Gate.mounted");
        const encodeType = this.$route.query.encodeType;
        let url = this.$route.query.url;
        const abxTid = this.$route.query.abx_tid;
        const storeType = this.$route.query.storeType;

        if (encodeType == "base64") {
            try {
                url = window.atob(url);
                if (url.indexOf("?") > -1) {
                    url += "&abx_tid=" + abxTid;
                } else {
                    url += "?abx_tid=" + abxTid;
                }
                url += "&cid=" + this.$route.query.cid;
            } catch (e) {
                this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
                    console.log(e);
                });
            }
        }
        let schemeUrl;
        let intentUrl;
        let tstoreUrl;
        let appDwIUrl;
        let appDwAUrl;

        if (CookieUtils.getCmmSteId() === '3') {
            // 마켓포
            schemeUrl = Config.app.marketfor.scheme + "?movemenu="+target+"&moveurl="+encodeURIComponent(url);
            intentUrl = "intent://default?movemenu="+target+"&moveurl="+encodeURIComponent(url)+"#Intent;scheme=marketfor;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.gsretail.android.marketfor;end";
            tstoreUrl = Config.app.marketfor.tstore;

            appDwIUrl = Config.app.marketfor.store.ios;
            appDwAUrl = Config.app.marketfor.store.android;
        } else if (CookieUtils.getMallId() === '11') {
            tstoreUrl = Config.app.dalisalda.tstore;
            appDwIUrl = Config.app.dalisalda.store.ios;
            appDwAUrl = Config.app.dalisalda.store.android;

            schemeUrl = Config.app.dalisalda.scheme + "?moveurl="+encodeURIComponent(url);
            intentUrl = appDwAUrl + "&url=" + encodeURIComponent(Config.app.dalisalda.scheme + "?moveurl="+encodeURIComponent(url));
        } else {
            tstoreUrl = Config.app.gsfresh.tstore;
            appDwIUrl = Config.app.gsfresh.store.ios;
            appDwAUrl = Config.app.gsfresh.store.android;

            schemeUrl = Config.app.gsfresh.scheme + "?moveurl="+encodeURIComponent(url);
            intentUrl = appDwAUrl + "&url=" + encodeURIComponent(Config.app.gsfresh.scheme + "?moveurl="+encodeURIComponent(url));
        }

        console.log("######schemeUrl > " + schemeUrl);
        console.log("######intentUrl > " + intentUrl);

        const page = {
                pageName: "App Gate Init"
            };

        try {
            Tracker.pageView(page);
        } catch {
        }

        setTimeout(function () {
            if (ContextUtils.getAgent() == "ios") {
                location.href = schemeUrl;

                setTimeout(function () {
                    location.replace(appDwIUrl);
                }, 5000);
            } else if (ContextUtils.getAgent() == "android") {
                if (storeType == "T") {
                    location.href = tstoreUrl;
                } else {
                    console.log("###intentUrl > " + intentUrl);
                    location.href = intentUrl;
                }
            } else {
                // Not mobile
                alert("모바일웹으로 이동합니다.");
                if (CookieUtils.getMallId() === '11') {
                    location.href = SiteUtils.dalisalda("");
                } else {
                    location.href = SiteUtils.freshmo("");
                }
            }
        }, 1000);
    }
};
</script>

<style scoped>

</style>
