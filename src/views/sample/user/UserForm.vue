<template>
  <div>
    <form @submit="onSubmit">
      <input v-model="form.userId" name="userId" required placeholder="unique userId" />
      <input v-model="form.userName" name="userName" required placeholder="user name" />
      <input
        v-model="form.password"
        name="password"
        required
        type="password"
        placeholder="password"
      />
      <div class="button">
        <button type="submit">추가</button>
      </div>
    </form>
  </div>
</template>
<script>
import ApiUtils from '@/common/ApiUtils';

export default {
  data() {
    return {
      form: {
        userId: '',
        userName: '',
        password: '',
      },
    };
  },
  methods: {
    async onSubmit(evt) {
      const $vm = this;
      evt.preventDefault();
      const params = JSON.stringify(this.form);
      try {
        const response = await ApiUtils.post('/fo/cuexample/users', params);
        if (response.data.success === true) {
          this.$gsdialog.alert('등록되었습니다.').then(goNext);
        }
      } catch (e) {
        this.$gsdialog.alert('오류가 발생했습니다.\n' + e);
      }
      /**
       * 다음 페이지
       */
      function goNext() {
        $vm.$router.push('/sample/user_list');
      }
    },
  },
};
</script>
<style scoped>
.button {
  text-align: center;
}
</style>
