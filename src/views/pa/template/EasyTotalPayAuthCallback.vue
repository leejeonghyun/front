<template>
  <div></div>
</template>
<script>
export default {
  name: 'EasyTotalPayCallback',
  data() {
    return {
      form: {
        hashKey: ''
      },
    };
  },
  metaInfo: {
    title: '이커머스 인증/결제 Template',
    titleTemplate: '간편결제 인증완료',
  },
  mounted: async function() {
    opener.callbackFnc(this.$route.query.hashKey);
    window.close();
  }
};
</script>
