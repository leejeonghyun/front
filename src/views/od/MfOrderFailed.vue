<!--
Design: views/pa/SC-FO-PA-MF-MS-003
Pg id:
Uri:
-->
<template>
  <div class="wrap public_domain marketfor">
    <MainHeader ref="header" :headertype="3" :searchView="false" :cartView="false" :historyView="false" headerTitle="주문실패" />
    <main id="main" tabindex="0">
      <div class="gift-receive-complete">
        <section class="msg-complete order-complete failed">
          <h2 class="msg-complete-txt">주문이 실패하였습니다.<br>다시 주문을 진행하여 주십시오.</h2>
          <p class="msg-txt-info" v-html="getErrorMassage()"></p>
          <p class="msg-txt-info" v-if="false">결제가 정상적으로 완료되지 않았습니다.</p>
        </section>
        <div class="bottom-btn-area">
          <button type="button" class="btn-md btn-bg lightgreen full" @click="goShop()">쇼핑하러 가기</button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import MainHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import OrderMsg from '@/components/order/MfOrderMsg'; // 주문 메세지항목
import SiteUtils from '@/common/SiteUtils';
export default {
  name: "OrderFailed",
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '결제 실패 < 주문결제 < %s'
  },
  props: {
    errorCode: String,
    errorMsg: String,
  },
  data() {
    return {
    };
  },
  components: {
    MainHeader,
    Footer,
  },
  methods: {
    // 메인 홈 이동 함수
    goShop() {
      // Food >> New In 화면으로 이동
      location.href = SiteUtils.marketformo('/');
    },
    getErrorMassage() {
      // TO-DO : 고객노출 알림메시지 정의 및 코드화 필요
      // 9904 : 통신사할인 기간만료
      // 9907 : 카드즉시할인 기간만료
      // 9912 : 프로모션할인 기간만료
      // 9913 : 상품 재고수량 부족
      // 9922 : GSSHOP 재고 체크 API 에러
      // 9923 : GS SHOP 상품 재고수량 부족
      // 9924 : 더반찬 새벽배송 희망배송일 마감 에러
      // 9925 : 더반찬 일반배송 희망배송일 마감 에러
      // 9926 : 더반찬 API 호출 에러
      // 9928 : 사용된 쿠폰 에러
      // 9952 : 결제하신 결제수단은 팝제휴가 아닙니다.
      if (this.errorCode === '9904') {
        return OrderMsg.payFailDisTelco;
      } else if (this.errorCode === '9907') {
        return OrderMsg.payFailDisCard;
      } else if (this.errorCode === '9912') {
        return OrderMsg.payFailDisProm;
      } else if (this.errorCode === '9928') {
        return OrderMsg.payFailDisCpn;
      } else if (this.errorCode === '9913') {
        if (this.errorMsg !== null && this.errorMsg !== '') {
          return this.errorMsg.split("||").join("<br>") + "<br>" + OrderMsg.payFailStk;
        } else {
          return OrderMsg.payFailStk;
        }
      } else if (this.errorCode === '9922') {
        return OrderMsg.ordFailGsShopApi;
      } else if (this.errorCode === '9923') {
        if (this.errorMsg !== null && this.errorMsg !== '') {
          return this.errorMsg.split("||").join("<br>") + "<br>" + OrderMsg.payFailGsShopStk;
        } else {
          return OrderMsg.payFailGsShopStk;
        }
      } else if (this.errorCode === '9924') {
        return OrderMsg.ordFailDawnHopeDeliv;
      } else if (this.errorCode === '9925') {
        return OrderMsg.ordFailHopeDeliv;
      } else if (this.errorCode === '9926') {
        return OrderMsg.ordFailThebanchanApi;
      } else if (this.errorCode === '9952') {
        return OrderMsg.popDcChk;
      } else if (this.errorCode === '9940' || this.errorCode === '9942' || this.errorCode === '9945' || this.errorCode === '9948') {
        if (this.errorCode === '9942' || this.errorCode === '9945' || this.errorCode === '9948') {
          return OrderMsg.payFail;
        } else {
          if (this.errorMsg !== null && this.errorMsg !== '') {
            return OrderMsg.payDtlFail + this.errorMsg;
          } else {
            return OrderMsg.payFail;
          }
        }
      } else {
        return OrderMsg.ordFail;
      }
    }
  },
  mounted() { }
};
</script>
