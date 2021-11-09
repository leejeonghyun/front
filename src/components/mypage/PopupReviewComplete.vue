<template>

  <div id="PopupReviewComplete" class="wrap-layer alert-layer popup-responsive active" role="dialog" aria-modal="true">
    <div class="layer-bg"></div>
    <div class="alert-layer-inner">
      <div class="inner-box">
        <div class="layer-content">
          <div class="smart-attach-comf">
            <strong>상품평이 등록되었습니다.</strong>
            <p>작성한 상품평은 마이페이지에서 확인 가능합니다.</p>
          </div>
        </div>
      </div>
      <div class="btn-alert-bottom">
        <button class="btn-confirm" @click="popupAction">보러가기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupReviewComplete",
  data() {
    return {
    };
  },
  // props: ['popup'],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'PopupReviewComplete');
    },
  },
  mounted() {
  },
  updated() {
  }
};
</script>
