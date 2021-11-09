<template>
  <section class="figure" :class="[{active: tutorialActive}, siteClass]">
    <h2 class="hidden">통합 UI 튜토리얼</h2>
    <P class="hidden">우측 하단 원형 도형을 좌우 스와이핑하면 몰별, 브랜드별 화면으로 이동합니다.</P>
    <div class="wrap-arrow left">
      <span class="arrow step01"></span>
      <span class="arrow step02"></span>
      <span class="arrow step03" ref="tutorialFigure"></span>
    </div>
    <div class="wrap-arrow right">
      <span class="arrow step01"></span>
      <span class="arrow step02"></span>
      <span class="arrow step03"></span>
    </div>
  </section>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "GSfreshIntergratedTutorials",
  props: ['tutorialActive'],
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    tutorialAction() {
      this.$emit('tutorialEvent', false);
    },
  },
  mounted() {
    const $this = this;
    const figure = $this.$refs.tutorialFigure;
    figure.addEventListener('animationend', () => {
      this.tutorialAction();
    });
  },
};
</script>

<style>

</style>
