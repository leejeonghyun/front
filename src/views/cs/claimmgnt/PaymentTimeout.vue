<!--
Design: views\ss\SC-FO-SS-GF-MS-821.vue
Pg Id: TODO
Uri: n/a
-->
<template>
  <div class="wrap-add-payment" v-bind:class="[siteClass]"><!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <SubDefaultHeader headerText="결제" />
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="add-payment">
        <div class="add-payment-timeout">
          결제 가능한 시간이 초과되었습니다
          <p class="servicecenter">
              관련 문의사항은 고객센터로 연락 주시기 바랍니다<br/>
              <a href="tel:1661-2562" class="link-tel" title="GS 프레시몰 통합 고객센터 번호"><span>1661-2562</span></a>
              (AM 07:00 ~ PM 11:00)
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PaymentTimeout",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '추가결제수단 시간초과< %s'
  },
  components: {
    SubDefaultHeader,
  },
  methods: {
  },
  mounted() {

  },
  destroyed() {
  },
  updated() {
  },
};
</script>
<style lang="scss">
</style>
