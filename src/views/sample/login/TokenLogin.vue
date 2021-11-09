<template>
  <div class="wrap" v-bind:class="[siteClass]">
    <h1>토큰 로그인.</h1>
    <form id="loginForm" @submit.prevent="onSubmit">
      <input name="userId" v-model="userId" required />
      <br />
      <input name="jobPosition" v-model="jobPosition" required />
      <br />
      <button id="btn-login">login</button>
      <span class="inp-chk">
        <input id="auto-check" type="checkbox" v-model="autoLogin" />
        <label for="auto-check">자동 로그인</label>
      </span>
      <br />
      <button id="btn-signup" @click="signup">signup</button>
    </form>
    <div id="result">{{ result }}</div>
    <div>{{ getStatus() }}</div>
    <div>
      <gs-link to="/sample/token/my_page" v-if="this.status">My Page</gs-link>
    </div>
  </div>
</template>
<script>
import TokenLogin from '@/common/sample/login/TokenLogin';
import LoginUtils from '@/common/LoginUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      userId: 'hanakim1',
      jobPosition: 'AA',
      result: '',
      status: false,
      idToken: '',
      refreshToken: '',
      autoLogin: false,
    };
  },
  methods: {
    onSubmit: TokenLogin.doLogin,
    signup: TokenLogin.goSignup,
    getStatus() {
      this.status = LoginUtils.isLogin();
      return this.status ? '로그인상태' : '비로그인상태';
    },
  },
};
</script>
<style scoped>
.wrap {
  padding: 10px;
}

input,
#btn-login {
  border: 1px solid #999;
}
#btn-login {
  margin: 2px 8px 0 0;
  padding: 0 2px;
}
</style>
