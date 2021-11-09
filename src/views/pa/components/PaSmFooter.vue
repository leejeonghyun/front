<template>
  <div class="row text-right" v-bind:class="[siteClass]">
      <hr/>
      <p>Cover templated by <a href="http://www.supremedev.com/">Ghost214</a>, by supremedev.</p>
  </div>
</template>
<script>
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PaSmFooter",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mounted() {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/pa/css/auth_payment.css" scoped></style>
