<template>
  <div class="section-area gift-message-card-mobile"><!-- 4월 수정 : section 수정 gift-msg-mobile 클래스 추가-->
    <div class="sub-title">
      <h2>선물 메시지</h2>
    </div>
    <div class="write-gift-msg-mobile">
      <div class="insert-msg">
        <img :src="backgroundUrl" alt="받으세요" />
      </div>
      <div class="msg-cont">
        <div class="msg-txt">
          <div class="wrap-textarea">
            <textarea title="선물 메세지 입력" :value="giftMsgCnts" readonly></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    giftMsgInfo: Object,
  },
  name: "GiftMessageCard",
  data() {
    return {
      backgroundUrl: '',
      giftMsgCnts: '',
    };
  },
  mixins: [],
  components: {
  },
  methods: {
  },
  watch: {
    giftMsgInfo() {
      if (this.giftMsgInfo.giftImg != '' && this.giftMsgInfo.giftImg != null) {
        this.backgroundUrl = require('@/assets/images/img/' + this.giftMsgInfo.giftImgFilePathNm);
      } else {
        this.backgroundUrl = require('@/assets/images/img/' + this.giftMsgInfo.giftImgFilePathNm);
      }
      this.giftMsgCnts = this.giftMsgInfo.giftMsgCnts;
    }
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
