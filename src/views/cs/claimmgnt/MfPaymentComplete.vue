<template>
  <div class="wrap">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="추가결제" />
    <!-- END : 헤더 -->
    <!-- START : 본문 -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="add-payment">
        <div class="payment-complete">정상 접수되었습니다.</div>
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area">
          <a
            href="javascript:void(0);"
            type="button"
            class="btn-lg btn-bg lightgreen"
            @click="goHome"
          >쇼핑하러 가기</a>
        </div>
        <!-- START : 하단 버튼 -->
      </div>
    </main>
    <!-- END : 본문 -->
  </div>
</template>

<script>
import SiteUtils from '@/common/SiteUtils';
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
export default {
  name: 'PaymentCompelete',
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '결제 완료 < 마이페이지 < %s',
  },
  data() {
    return {};
  },
  components: {
    SubDefaultHeader,
  },
  methods: {
    goHome() {
      location.href = SiteUtils.marketformo('/');
    },
  },
  mounted() {},
};
</script>
