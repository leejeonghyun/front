<template>
  <div>
    <h3>Sign Up</h3>
    <form id="loginForm" @submit.prevent="onSubmit(userId)">
      <input name="userId" v-model="userId" required />
      <br />
      <input name="jobPosition" v-model="jobPosition" required />
      <br />
      <input type="email" name="email" v-model="email" required />
      <br />
      <input name="userName" v-model="userName" required />
      <br />
      <button id="btn-login">Sign Up</button>
    </form>
    <div id="result">{{ result }}</div>
    <div>
      <gs-link to="/sample/token/my_page" v-show="this.status">My Page</gs-link>
    </div>
  </div>
</template>

<script>
import TokenLogin from '@/common/sample/login/TokenLogin';

export default {
  data() {
    return {
      userId: 'hanakim1',
      jobPosition: 'AA',
      userName: '김하나1',
      email: 'hnkim1@gsretail.com',
      result: '',
      status: false,
      idToken: '',
      refreshToken: '',
    };
  },
  methods: {
    onSubmit: TokenLogin.doSignup
  },
};
</script>
<style scoped>
input,
#btn-login {
  border: 1px solid #999;
}
</style>

