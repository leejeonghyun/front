<template>
    <div>
        <!-- 별도 페이지 없음.-->
    </div>
</template>

<script>
import Config from '@/common/Config.js';
import SiteUtils from '@/common/SiteUtils.js';
import ContextUtils from "@/common/ContextUtils";

export default {
    name: "Gete",
    created() {
        console.log("Gete.created");
    },
    mounted() {
        console.log("Gete.mounted");
        const encodeType = this.$route.query.encodeType;
        const Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
        const target = this.$route.query.target;
        let url = this.$route.query.url;
        const abxTid = this.$route.query.abx_tid;
        const storeType = this.$route.query.storeType;

        if (encodeType == "base64") {
            url = Base64.decode(url);
            if (url.indexOf("?") > -1) {
                url += "&abx_tid=" + abxTid;
            } else {
                url += "?abx_tid=" + abxTid;
            }
        }

        const schemeUrl = Config.app.gsfresh.scheme + "?movemenu="+target+"&moveurl="+encodeURIComponent(url);
        const intentUrl = "intent://default?movemenu="+target+"&moveurl="+encodeURIComponent(url)+"#Intent;scheme=gssmapp;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.gsretail.android.smapp;end";
        const tstoreUrl = Config.app.gsfresh.tstore;

        if (ContextUtils.getAgent() == "ios") {
            console.log("schemeUrl > " + schemeUrl);
            location.href = schemeUrl;
        } else if (ContextUtils.getAgent() == "android") {
            if (storeType == "T") {
                console.log("tstoreUrl > " + tstoreUrl);
                location.href = tstoreUrl;
            } else {
                console.log("intentUrl > " + intentUrl);
                location.href = intentUrl;
            }
        } else {
            // Not mobile
            alert("PC환경에서 접속하셨습니다. GS 프레시 페이지로 이동합니다.");
            location.href = SiteUtils.freshpc();
        }
    }
};
</script>

<style scoped>

</style>
