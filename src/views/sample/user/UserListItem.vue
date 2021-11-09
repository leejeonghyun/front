<template>
  <div>
    <li class="user-item" @click="onClicked">
      <div class="cell">{{ user.userId }}</div>
      <div class="cell">{{ user.userName }}</div>
      <div class="cell">{{ user.email }}</div>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    onClicked: function() {
      this.$router.push('/sample/user/' + this.user.userId);
    },
  }
};
</script>

<style scoped>
.user-item {
  border: 1px solid #999;
}

.cell {
  cursor: pointer;
  margin: 4px;
  display: inline-block;
  width: 150px;
}
</style>
