<template>
  <div>
    <form @submit="onSubmit">
      <input v-model="form.userId" name="userId" readonly required placeholder="unique userId" />
      <input v-model="form.userName" name="userName" required placeholder="user name" />
      <div class="button">
        <button type="submit">수정</button>
        <button @click="back">취소</button>
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
        userId: 'a',
        userName: 'b',
      },
    };
  },
  mounted: async function() {
    try {
      const userId = this.$route.params.id;
      const response = await ApiUtils.get('/fo/cuexample/users/' + userId);
      this.form = response.data.data;
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  methods: {
    async onSubmit(evt) {
      try {
        evt.preventDefault();
        const params = JSON.stringify(this.form);
        const response = await ApiUtils.put('/fo/cuexample/users', params);
        if (response.data.success === true) {
          this.$gsdialog.alert('수정되었습니다.').then(dialog =>{
            this.$router.push('/sample/user_list');
          });
        }
      } catch (e) {
        this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
    },
    back() {
      history.back();
    },
  },
};
</script>

<style scoped>
.button {
  text-align: center;
}
</style>
