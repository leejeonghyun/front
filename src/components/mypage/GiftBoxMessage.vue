<template>
  <div class="write-gift-msg">
    <!-- <div class="section-area"> -->
      <div class="sub-inner-box insert-msg" :style='{ backgroundImage: "url()"}'>
        <div class="msg-cont">
          <div class="msg-txt">
            <!-- <div class="textarea">선물한 사람이 보낼때 작성한 메시지 노출</div> -->
            <div class="textarea">{{ giftMessage }}</div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "GiftBoxMessage",
  data() {
    return {
    };
  },
  props: ['giftMessage'],
  mixins: [],
  components: {
  },
  methods: {
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
