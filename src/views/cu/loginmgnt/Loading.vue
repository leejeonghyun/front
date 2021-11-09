<template>
  <div class="wrap-loading" v-bind:class="[siteClass]">
    <div class="inner-loading">
      <div class="loading"></div>
      <div class="loading-spinner">
        <span class="hidden">로딩중입니다. 잠시 기다려주세요.</span>
        <div class="step01"></div>
        <div class="step02"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "Loading",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mounted() {

  }
};
</script>

<style>

</style>
