<template>
  <div class="floating-btn-area">
    <a @click="goBack" href="#" class="btn-bottom-prev"><span class="hidden">뒤로가기</span></a>
    <a href="javascript://" class="btn-bottom-top" @click="gotoTop"><span class="hidden">TOP</span></a>
  </div>
</template>

<script>
export default {
  name: "CartFloatingBtn",
  data() {
    return {
    };
  },
  directives: {},
  mixins: [],
  components: {
  },
  methods: {
    bottomFixedBtnAction() {
      const scroll = window.pageYOffset;
      const $floatingMenu = document.querySelector('.floating-btn-area');
      if ($floatingMenu != null) {
        if (scroll > 0) {
          $floatingMenu.classList.add('show');
        } else {
          $floatingMenu.classList.remove('show');
        }
      }
    },
    gotoTop(scroll) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    goBack() {
      history.back();
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.bottomFixedBtnAction()); // 이벤트 방식 변경 유현석 20200529
  },
  mounted() {
    const $this = this;
    // 하단 버튼
    // const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    // if (ios) {
      window.addEventListener('scroll', $this.bottomFixedBtnAction());
    // }
  },
};
</script>
