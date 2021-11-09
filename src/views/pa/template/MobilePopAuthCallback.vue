<template>
  <div></div>
</template>
<script>
export default {
  name: 'MobilePopCallback',
  data() {
    return {
      form: {
        hashKey: ''
      },
    };
  },
  metaInfo: {
    title: '이커머스 인증/결제 Template',
    titleTemplate: '모바일팝 인증완료',
  },
  mounted: async function() {
    if (opener !== null && opener.callbackFnc !== null) {
      opener.callbackFnc(encodeURIComponent(this.$route.query.hashKey));
    } else if (callbackFnc !== null && parent.callbackFnc !== null) {
      parent.callbackFnc(encodeURIComponent(this.$route.query.hashKey));
    }
    window.close();
  }
};
</script>
