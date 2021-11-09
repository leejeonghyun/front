<template>
  <div class="wrap-error program" v-bind:class="[siteClass]">
    <!-- 4월 수정 START : 텍스트 변경 -->
    <h1>
      잠시 후 다시 시도해 주세요<br/>
      처리 중 오류가 발생했어요
    </h1>
    <!-- 4월 수정 END : 텍스트 변경 -->
    <!-- 4월 수정 START : 삭제 -->
    <!-- <div class="error-txt">
      사이트 이용에 불편을 드려<br/>
      대단히 죄송합니다.
    </div> -->
    <!-- 4월 수정 END : 삭제 -->
    <div class="error-btn">
      <button class="btn btn-md btn-border">다시 시도하기</button><!-- 4월 수정 : 텍스트 변경, class 변경 -->
    </div>
  </div>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "ErrorProgram",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '프로그램 내부 오류 < %s',
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
