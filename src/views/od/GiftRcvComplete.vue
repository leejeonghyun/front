<template>
  <div :class="[{'wrap' : true}, siteClass]"><!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="inner-full-popup">
          <div class="gift-receive-complete">
          <h1 class="hidden">선물 받기 완료</h1>
          <div class="msg-complete">
            <h2 class="msg-complete-txt">선물 받기 완료!</h2>
            <p class="msg-txt-info">{{giftMsgInfo !== null ? giftMsgInfo.giftRcptCmmMbrNm : ''}}님, 조금만 기다려 주세요.<br> {{giftMsgInfo !== null ? giftMsgInfo.giftTdrCmmMbrNm : ''}}님의 선물을 곧 보내드릴게요!</p>
          </div>
          <div class="bottom-btn-area">
            <button type="button" class="btn-md btn-bg darkgray" @click="popupCloseAction">선물내역확인</button>
            <button type="button" class="btn-md btn-bg lightgreen" @click="goShop">쇼핑하러 가기</button>
          </div>
          <div class="info-area">
            <p class="ico-alert2">마이 페이지 > 선물/조르기 내역에서 배송조회가 가능합니다.</p>
          </div>
          <div class="recommend-sign-up">
            <template v-if="!loginYn">
              <strong>아직 GSFresh 회원이 아니세요?</strong>
              <p>회원가입하시고 <span class="point">베스트 상품 첫 구매 100원</span>에 구입하세요</p>
              <a @click="joinMember" title="회원가입 페이지로 이동" class="btn btn-text btn-arrow">회원가입하기</a>
            </template>
          </div>
        </div>
      </div>
    </main>
    <Footer /><!-- 5월 수정 : 푸터 추가 -->
  </div>
</template>

<script>
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
export default {
  props: {
    ordId: String,
  },
  name: "PopupGiftReceiveCompelete",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물 받기 완료 < 선물하기 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '선물받기완료',
      },
    ],
  },
  data() {
    return {
      giftMsgInfo: null,
      loginYn: LoginUtils.isLogin(),
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    // SubDefaultHeader,
    Footer
  },
  methods: {
    popupCloseAction() {
      // this.$emit('popupEvent', 'popupOrderCompelete');
      if (this.loginYn) {
        this.$router.push('/cs/orddeliv/ord_deliv_dtl/' + this.ordId); // 주문 상세 화면으로 이동
      } else {
        this.$gsdialog.alert(OrderMsg.noMemGift);
      }
    },
    // 주문선물 조회(수취자정보, 결제자정보, 선물메세지)
    async giftOrderInfo() {
      const params = {
        ordId: this.ordId,
      };
      const resultGiftInfo = await ApiUtils.get('/fo/od/giftMgnt/gift_order_ps_info', params);
      this.giftMsgInfo = resultGiftInfo.data.data;
      // console.log("this.giftMsgInfo", this.giftMsgInfo);
    },
    goShop() {
      // location.href = SiteUtils.to(CookieUtils.getMallId(), '/');
      const homeCode = 'fr_' + CookieUtils.getMallId() + '_' + CookieUtils.getMdaType();
      location.href = CookieUtils.getDomain(homeCode);
    },
    joinMember() {
      this.$router.push('/cu/join_member'); // 회원가입화면으로 이동
    },
  },
  mounted() {
    this.giftOrderInfo();
  }
};
</script>
