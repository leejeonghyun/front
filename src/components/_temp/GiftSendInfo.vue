<template>
  <!-- START : 주문자 -->
  <section class="section-area gift-send-info">
    <div class="sub-title">
      <h2>주문자</h2>
    </div>
    <div class="sub-inner-box origin-info" v-if="isVisible === 0">
      <p class="info"><span class="name">홍길동</span>010 - 1234 - 5678</p>
      <!-- <button type="button" class="btn-change-address" @click="toggleLayer(1)">변경</button> -->
    </div>
    <!-- <div class="sub-inner-box change-info2" v-if="isVisible === 1">
      <input type="text" id="nick" class="inp-txt w100" value="홍길동" title="주문자 이름">
      <p class="insert-tel">
        <span class="wrap-select">
          <select id="mobile" class="w-small" title="휴대폰 번호 앞자리">
            <option value="">010</option>
          </select>
        </span>
        <input type="tel" id="mobile02" class="inp-txt" value="" placeholder="‘ - ’ 없이 숫자만 입력" title="휴대폰 번호 뒷자리">
      </p>
      <button type="button" class="btn-change-address" @click="toggleLayer(0)">취소</button>
    </div> -->
  </section>
  <!-- END : 주문자 -->
</template>

<script>
export default {
  name: "GiftSendInfo01",
  data() {
    return {
      isVisible: 0,
    };
  },
  mixins: [],
  components: {
  },
  methods: {
    toggleLayer(el) {
      this.isVisible = el;
    },
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
