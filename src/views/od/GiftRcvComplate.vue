<!--
views/od/SC-FO-OD-GS-MP-028
-->
<template>
  <div id="popupGiftReceiveCompelete" class="wrap-full-popup h100 active" role="dialog" aria-modal="true">
    <!-- : 실사용 소스 -->
    <!-- <div id="popupGiftReceiveCompelete" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupGiftReceiveCompelete}"> -->
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section class="gift-receive-complete">
          <h1 class="hidden">선물하기 완료</h1>
          <div class="msg-complete">
            <h2 class="msg-complete-txt">선물 받기 완료!</h2>
            <p class="msg-txt-info">김영희님, 조금만 기다려 주세요.<br> 홍길동님의 선물을 곧 보내드릴게요!</p>
          </div>
          <div class="bottom-btn-area">
            <button type="button" class="btn-md btn-bg darkgray" @click="popupCloseAction">선물내역확인</button>
            <button type="button" class="btn-md btn-bg lightgreen" @click="popupCloseAction">쇼핑하러 가기</button>
          </div>
          <div class="info-area">
            <p class="ico-alert2">마이 페이지 > 선물/조르기 내역에서 배송조회가 가능합니다.</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  props: {
    ordId: String,
  },
  name: "PopupGiftReceiveCompelete",
  metaInfo: {
    title: 'GS fresh',
    titleTemplate: '선물 받기 완료 < 선물하기 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '선물받기완료',
      },
    ],    
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
    };
  },
  components: {
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupGiftReceiveCompelete');
      this.modalActiveEvent('popupGiftReceiveCompelete');
    },
    // 주문선물 조회(수취자정보, 결제자정보, 선물메세지)
    async giftOrderInfo() {
      const params = {
        ordId: this.ordId,
      };
      const resultGiftInfo = await ApiUtils.get('/fo/od/giftMgnt/gift_order_ps_info', params);
      this.giftMsgInfo = resultGiftInfo.data.data;
      console.log("this.giftMsgInfo", this.giftMsgInfo);
    },
  },
  mounted() {
    this.giftOrderInfo();
    this.modalActiveEvent('popupGiftReceiveCompelete');
  }
};
</script>
