<template>
    <!-- START : 조르기 방법 -->
    <section class="section-area">
      <div class="sub-title">
        <h2>조르기 방법</h2>
      </div>
      <div class="sub-inner-box">
        <p class="select-sns-type">
          <span class="inp-radio small">
            <input type="radio" name="selectType" id="selectType1" value="kakaotalk" checked @click="changeSnsType">
            <label for="selectType1"><span class="ico-sns icon-kakaotalk"></span>카카오톡</label>
          </span>
          <span class="inp-radio small">
            <input type="radio" name="selectType" id="selectType2" value="sms" @click="changeSnsType">
            <label for="selectType2"><span class="ico-sns icon-sms"></span>문자 SMS</label>
          </span>
        </p>
      </div>
      <!-- <GiftMessageWrite @changeSnsTypeEvent="changeSnsType" messageTitle="조르기 메시지" messagePlaceholder="메시지 전달을 원할 경우 100자 이내로 입력해 주세요." /> -->
    </section>
</template>

<script>
// import GiftMessageWrite from '@/components/cart/GiftMessageWrite';
export default {
  name: "GiftRequestWrite",
  data() {
    return {
      isVisible: 'kakaotalk',
    };
  },
  directives: {},
  mixins: [],
  components: {
    // GiftMessageWrite,
  },
  methods: {
    // changeSnsType(event) { // 조르기 타입 변경
    //   const $this = event.target;
    //   this.isVisible = $this.value;
    //   console.log(this.isVisible);
    // },
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
