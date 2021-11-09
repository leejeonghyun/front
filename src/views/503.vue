<template>
  <div class="wrap-error network" v-bind:class="[siteClass]">
    <!-- 4월 수정 START : 텍스트 변경 -->
    <h1>네트워크 연결이 원활하지 않아요</h1>
    <div class="error-txt">
      인터넷 연결을 확인해 주세요
    </div>
    <!-- 4월 수정 END : 텍스트 변경 -->
    <div class="error-btn">
      <button class="btn btn-md btn-border">다시 시도하기</button><!-- 4월 수정 : 텍스트 변경, class 변경 -->
    </div>
  </div>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "ErrorNetwork",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '네트워크 오류 < %s',
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
