<!--
Design: views\ss\SC-FO-SS-GF-MS-820.vue
Pg Id: TODO.
Uri: /cs/claimmgnt/add_payment/:ordId/:claimSeqno
-->
<template>
  <div class="wrap-add-payment order-wrap" :class="siteClass">
    <SubDefaultHeader headerText="추가결제" />
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="add-payment">
        <div class="add-payment-top">
          <p>
            결제를 완료하면,
            <br />취소/반품/교환 신청이 접수됩니다.
          </p>
          <dl>
            <dt>결제금액</dt>
            <dd>
              <span>{{this.addTdrInfo.addTdrTotAmt | currency}}</span>원
            </dd>
          </dl>
        </div>
      </div>
      <!-- START : 결제수단 -->
      <MfClaimAddPayment
        ref="mdClaimAddTdr"
        :ordId="this.ordId"
        :addTdrInfo="addTdrInfo"
        :addPaymentYn="false"
        @saveOrdClaimAcept="saveOrdClaimAcept"
        v-if="this.ordId != null"
      />
      <!-- END : 결제수단 -->
      <!-- START : 하단 버튼 -->
      <!--       <div class="bottom-btn-area mt0">
        <button type="button" class="btn-lg btn-bg lightgreen" @click="processAddPayment">
          <span>결제하기</span>
        </button>
      </div>-->
      <!-- END :하단 버튼 -->
    </main>
    <!--  START : 팝업 -->
    <Footer />
    <!-- 6월 수정 : 푸터 추가 -->
    <!-- 4월수정 START : 팝업 모션 추가 -->
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 헤더
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import ApiUtils from '@/common/ApiUtils';
import ClaimMsg from '@/components/mypage/cs/ClaimMsg';
import MfClaimAddPayment from '@/views/cs/claimmgnt/MfClaimAddPayment'; // 클레임 추가 결제 모듈
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';

import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
export default {
  name: 'AdditionalPayment',
  data() {
    return {
      cliamOrdId: this.$route.params.ordId, // 주문ID
      ordId: null,
      siteClass: CookieUtils.getSiteClass(),
      addTdrInfo: {
        addTdrTotAmt: 0, // 추가결제금액
      },
    };
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '추가결제수단 < %s',
  },
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
    SubDefaultHeader,
    Footer,
    MfClaimAddPayment,
  },
  methods: {
    processAddPayment() {
      this.$refs.mdClaimAddTdr.sendPayAuth(); // 추가결제 인증 함수 호출
    },
    async saveOrdClaimAcept(iOrderRequest, cashRcpctInfo) {
      const params = {
        ordId: this.cliamOrdId,
      };
      params.payAuthInfo = iOrderRequest;
      await ApiUtils.post('/fo/cs/mf/addtion-tender-information-addtion', {
        ...params,
      })
        .then(res => {
          if (res.data === null || !res.data.success) {
            location.href = '/cs/mf/claimmgnt/payment_timeout';
            return;
          }
          location.href = '/cs/mf/claimmgnt/payment_complete';
          return;
        })
        .catch(err => {
          console.error(err);
        });
    },
    async retrieveAddPaymentAmt() {
      const params = {
        ordId: this.cliamOrdId,
      };
      await ApiUtils.get('/fo/cs/mf/addtion-tender-information', { ...params })
        .then(res => {
          if (res.data.data === null) {
            // this.$gsdialog.alert(ClaimMsg.invalidAddPayment);
            location.href = '/cs/mf/claimmgnt/payment_timeout';
            return;
          }
          const resData = res.data.data.list;
          this.ordId = res.data.data.orgOrdId;
          if (resData) {
            let addPayAmt = 0;
            resData.map(value => {
              if (value.dlfeeFreeYn == 'N') {
                addPayAmt += value.exchDlfeeAmt;
              }
            });
            this.addTdrInfo.addTdrTotAmt = addPayAmt;
          }
        })
        .catch(err => {
          console.error('Error retrieveAddPaymentAmt method.');
          this.$gsdialog.alert(ClaimMsg.invalidAddPayment);
        });
    },
  },
  async created() {
    await this.retrieveAddPaymentAmt(); // 추가결제 금액 조회
  },
  mounted() {},
  /* 4월수정 START : 이벤트 리스너 제거 */
  destroyed() {
    // window.removeEventListener('scroll', this);
  },
  /* 4월수정 END : 이벤트 리스너 제거 */
  updated() {},
};
</script>
<style lang="scss">
</style>
