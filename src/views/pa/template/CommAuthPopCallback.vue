<template>
  <div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // alert("응답코드를 부모창으로 전달합니다."+encodeURIComponent(this.$route.query.hashKey));
    if (opener !== null && opener.callbackFnc !== null) {
      opener.callbackFnc(encodeURIComponent(this.$route.query.hashKey));
    } else if (parent !== null && parent.callbackFnc !== null) {
      parent.callbackFnc(encodeURIComponent(this.$route.query.hashKey));
    }
    window.close();
  }
};
</script>
