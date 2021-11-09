<template>
  <div class="wrap-error item" v-bind:class="[siteClass]">
    <!-- 4월 수정 START : 텍스트 변경 -->
    <h1>요청한 상품을 찾을 수 없어요</h1>
    <div class="error-txt">
      상품이 없거나 판매가 종료 되었어요
    </div>
    <!-- 4월 수정 END : 텍스트 변경 -->
    <div class="error-btn">
      <button class="btn btn-md btn-border" @click="goHome">홈으로 이동</button><!-- 4월 수정 : 텍스트 변경, class 변경 -->
    </div>
  </div>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';

export default {
  name: "ErrorItem",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '상품 오류 < %s',
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
