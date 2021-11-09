<template>
  <div class="wrap-add-payment">
    <SubDefaultHeader headerText="추가결제" />
    <main id="main" tabindex="0">
      <div class="add-payment">
        <div class="add-payment-timeout">
          결제 가능한 시간이 초과되었습니다
          <p class="servicecenter">
            관련 문의사항은 고객센터로 연락 주시기 바랍니다
            <br />
            <a href="tel:1661-2562" class="link-tel" title="GS 프레시몰 통합 고객센터 번호">
              <span>1661-2562</span>
            </a>
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
export default {
  name: 'PaymentTimeout',
  data() {
    return {};
  },
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '추가결제수단 시간초과< %s',
  },
  components: {
    SubDefaultHeader,
  },
  methods: {},
  mounted() {},
  destroyed() {},
  updated() {},
};
</script>
<style lang="scss">
</style>
