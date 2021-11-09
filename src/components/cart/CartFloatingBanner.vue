<template>
  <div class="floating-banner" title="플로팅 배너">
    <p>
      <button aria-haspopup="dialog" title="몰 금액대별 사은품 안내 팝업 활성화" @click="popupAction('popupSpecialGiftMall')">
        {{cartFloatingBannerText}} <strong>금액대별 사은행사 진행중</strong><!-- 4월 수정 : 심플리쿡 삭제 -->
      </button>
    </p>
    <button class="btn-floating-close" @click="floatingClose">
      <span class="hidden">플로팅 배너 닫기</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    cartFloatingBannerText: String,
  },
  name: "CartFloatingBanner",
  data() {
    return {
    };
  },
  directives: {},
  mixins: [],
  components: {
  },
  methods: {
    floatingClose() {
      this.$emit('floatingClose');
    },
    popupAction(type) {
      this.$emit('popupEvent', 'popupSpecialGiftMall');
    },
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
