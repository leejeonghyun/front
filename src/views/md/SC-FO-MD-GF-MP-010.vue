<template>
  <div class="wrap-sub-detail" v-bind:class="[siteClass]">
    <!-- START : Header -->
    <SubDefaultHeader headerText="성인인증" />
    <!-- END : Header -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="adult-certify">
        <figure>
          <img src="@/assets/images/img/img_adult_certify.png" alt="19세 이하 금지 아이콘" />
        </figure>
        <p class="desc">연 1회 성인 인증을 하시면<br/>청소년 유해매체물에 접근하실 수 있습니다.</p>
        <ul class="wrap-btn">
          <li>
            <a href="#" class="btn-phone" target="_blank" title="새창">휴대폰 인증</a>
          </li>
          <li>
            <a href="#" class="btn-card" target="_blank" title="새창">신용/체크카드 인증</a>
          </li>
        </ul>
        <div class="wrap-info">
          <div class="list-info">
            <ul>
              <li>
                입력된 정보는 본인 확인을 위해 본인인증기관에 제공되며, 본인 확인 외에 사용되거나 저장되지 않습니다.
              </li>
              <li>
                본인 인증이 잘 되지 않을 경우, 본인인증기관 고객센터로 문의해 주시기 바랍니다.
              </li>
            </ul>
          </div>
          <strong>본인인증기관 고객센터<a href="tel:16612562" class="btn-tel">1661-2562</a></strong>
        </div>
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "ProductAdultCertify",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '성인인증 < 상품목록 < %s'
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    }
  },
  mounted() {

  },
  components: {
    SubDefaultHeader,
    Footer
  }
};
</script>

<style>

</style>
