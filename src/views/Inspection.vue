<template>
  <div class="wrap-error system" v-bind:class="[siteClass]">
    <h1>지금은 시스템 점검중이에요</h1><!-- 4월 수정 : 텍스트 변경 -->
    <div class="error-txt">
      점검일시 : 2020.01.29 00:00~2020.01.31 00:00
    </div>
  </div>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "ErrorSystem",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '시스템 점검 < %s',
    meta: [
      {
        property: 'aa:page',
        content: 'Error Page',
      },
    ],
  },
  mounted() {

  }
};
</script>
