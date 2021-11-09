<template>
  <div class="wrap-error code" v-bind:class="[siteClass]">
    <h1>화면을 찾을 수가 없어요</h1><!-- 4월 수정 : 텍스트 변경 -->
    <!-- 4월 수정 START : 삭제 -->
    <!-- <div class="error-txt">
      페이지 주소를 다시 확인해 주십시오.<br/>
      서비스 이용에 불편을 드려 죄송합니다.
    </div> -->
    <!-- 4월 수정 END : 삭제 -->
    <div class="error-btn">
      <button class="btn btn-md btn-border" @click="goHome">홈으로 이동</button><!-- 4월 수정 : 텍스트 변경, class 변경 -->
    </div>
  </div>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';

export default {
  name: "ErrorCode",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '오류 페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: 'Error Page',
      },
    ],
  },
  methods: {
    goHome() {
      const siteId = CookieUtils.getCmmSteId();
      if (siteId == '2') {
        location.href = SiteUtils.dalimo("/");
      } else {
        location.href = SiteUtils.freshmo("/");
      }
    }
  },
  mounted() {

  }
};
</script>
