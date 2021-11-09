<!-- 헤더 1 : 타이틀 -->
<!-- <Header headerText="타이틀" /> -->
<template>
  <!-- header, Tabbar, Sidebar components -->
  <div class="section-header">
    <!-- Header 정보 -->
    <header class="subheader" :class="{'header-none-fixed' : headerText.length === 0}">
      <div class="wrap-headerbar">
        <h1 class="header-title">{{ headerText }}</h1>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "Header1",
  props: {
    headerText: { // 페이지 타이틀
      type: String,
      default: '',
    },
    isLogin: Boolean, // 로그인여부 (달리살다 퍼블용)
  },
  methods: {
    searchOpenAction() {
      this.$emit('searchbarEvent');
    },
     goHome() {
      console.log('goHome');
      this.$router.push(
        { path: '/' },
      );
    },
    goBack() {
      console.log('go back');
      history.back();
    },
  }
};
</script>
