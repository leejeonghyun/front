<template>
  <div>
    <h1>{{ count }}</h1>
    <br />
    <p>{{ text }}</p>
    <button @click="count --" class="count-down">카운트 감소</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 3,
      text: '변경 전입니다.',
    };
  },
  watch: {
    count: function(newVal, oldVal) {
      this.text = oldVal + '에서 ' + newVal + '로 변경되었습니다.';
    },
  },
};
</script>

<style scoped>
.count-down {
  border: 1px solid #999;
}
</style>
