<template>
  <div id="authKmotionPop" v-bind:class="[siteClass]">
    <iframe name='kbframe' id='kbframe' src='' width='459px' height='456px' frameBorder='0'></iframe>
    <form id="form_accpreq" method="post">
      <input type="hidden" id="pgID" name="pgID" v-model="rform.pgId"/>
      <input type="hidden" id="key" name="key" v-model="rform.key"/>
      <input type="hidden" id="data" name="data" v-model="rform.encData"/>
      <!--<input type="hidden" id="xid" name="xid" v-model="rform.xid"/>-->
      <input type="hidden" id="isOnlyAppcard" name="isOnlyAppcard" v-model="rform.isOnlyAppcard"/>
      <input type="hidden" id="successURL" name="successURL" v-model="rform.accpresURL"/>
      <input type="hidden" id="failureURL" name="failureURL" v-model="rform.resultURL"/>
      <input type="hidden" id="issueCode" name="issueCode" v-model="rform.issueCode"/>
    </form>
    <form id="resultForm" method="post" action="">
      <input type="hidden" id="haskKey" name="haskKey"/>
    </form>
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "AuthKmotionPop",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      rform: {
        key: "",
        encData: "",
        xid: "", // 인증 후 정보 비교를 위함.
        pgId: "",
        resultCode: "",
        isOnlyAppcard: "",
        accpresURL: "",
        resultURL: "",
        issueCode: ""
      }
    };
  },
  mounted: async function() {
    const hashKey = encodeURIComponent(this.$route.query.hashKey);
    console.log(hashKey);
    window.callbackFnc = function(hashKey) {
      resultForm.action = ApiUtils.getUrl("/html/fo/pa/kmotionAuthResCallbackPc?hashKey="+hashKey);
      resultForm.submit();
    };
    callbackFnc(hashKey);
  }
};
</script>
