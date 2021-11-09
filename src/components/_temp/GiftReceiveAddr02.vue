<template>
  <!-- START : 배송지 -->
  <section class="section-area">
    <div class="sub-title">
      <h2>배송지</h2>
      <div class="origin-info">
        <button type="button" class="btn-change-address" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupAction">변경</button>
      </div>
    </div>
    <div class="sub-inner-box">
      <div class="receive-delivery-info">
        <div class="my-address">
          <p>홍길동 [우리집]</p>
          <p><span class="code">05123</span> 서울시 강남대로 154 해송빌딩 4층 강남대로 154 해송빌딩 4층</p>
          <p>010 - 1234 - 5678</p>
        </div>
        <!-- <p class="select-safe2">
          <span class="inp-chk small">
            <input type="checkbox" name="" id="safe-number" value="">
            <label for="safe-number">안심번호 신청</label>
          </span>
        </p> -->
      </div>
    </div>
  </section>
  <!-- END : 배송지 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "GiftReceiveAddr",
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction(type) { // 팝업 활성/비활성
      this.$emit('popupEvent', 'popupAddrList');
    },
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
