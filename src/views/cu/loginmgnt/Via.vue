<!--
Design: views/cu/SC-FO-CU-GF-MS-018
Pg id:
Uri: /cu/login
-->
<template>
    <div></div>
</template>
<script>

export default {
  name: 'Via',
  metaInfo: {
    title: '로그인',
    titleTemplate: '로그인 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '로그인',
      },
    ],
  },
  components: {
  },
  data() {
    return {
    };
  },
  mounted() {
      const to = this.$route.query.to || '';
      location.href = to;
  },
};
</script>
<style lang="scss">
</style>
