<template>

  <div id="PopupReviewNotWord" class="wrap-layer alert-layer popup-responsive active" role="dialog" aria-modal="true">
    <div class="layer-bg"></div>
    <div class="alert-layer-inner">
      <div class="inner-box">
        <div class="layer-content">
          <div class="smart-attach-comf forbidden">
            <strong>금칙어가 사용되었습니다.</strong>
            <p><span>‘{{word}}’</span> 문구를 수정 후<br> 상품평 작성을 완료해주세요.</p>
          </div>
        </div>
      </div>
      <div class="btn-alert-bottom">
        <button class="btn-confirm" @click="popupAction">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupReviewNotWord",
  data() {
    return {
    };
  },
   props: ['word'],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'PopupReviewNotWord');
    },
  },
  mounted() {
  },
  updated() {
  }
};
</script>
