<!--
Design: views\ss\SC-FO-SS-GF-MS-874.vue
Pg Id: TODO
Uri: /cs/claimmgnt/payment_complete
-->

<template>
  <div class="wrap" v-bind:class="[siteClass]"><!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="결제" :prevType="false" />
    <!-- END : 헤더 -->
    <!-- START : 본문 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="add-payment">
        <div class="payment-complete">
          정상 접수되었습니다.
        </div>
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area">
          <!-- a href="#" type="button" class="btn-lg btn-bg lightgreen" @  click="goHome()">쇼핑하러 가기</a -->
          <gs-link :to="goHome()" class="btn-lg btn-bg lightgreen">쇼핑하러 가기</gs-link>
        </div>
        <!-- START : 하단 버튼 -->
      </div>
    </main>
    <!-- END : 본문 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import SiteUtils from '@/common/SiteUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PaymentCompelete",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '결제 완료 < 마이페이지 < %s'
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    SubDefaultHeader,
  },
  methods: {
    goHome() {
      if (Number(CookieUtils.getMallId()) == 1) { // gsfresh
        if (CookieUtils.getMdaType() == '01') { // PC
          return SiteUtils.freshmo('');
        } else {
          return SiteUtils.freshpc('');
        }
      } else if (Number(CookieUtils.getMallId()) == 11) { // dalisalda
        if (CookieUtils.getMdaType() == '02') { // Mobile
          return SiteUtils.dalimo('');
        }
      }
      return SiteUtils.to(CookieUtils.getMallId(), '');
    },
  },
  mounted() {

  }
};
</script>
