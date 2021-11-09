<template>
  <div>
    <h2>회원탈퇴 되었습니다.</h2>
    <div>
      <gs-link to="/sample/token/signup">To Sign Up</gs-link>
      <br />
      <gs-link to="/sample/token/login">To Login</gs-link>
    </div>
  </div>
</template>

<script>
import TokenLogin from '@/common/sample/login/TokenLogin';

export default {
  created: TokenLogin.doLogout,
};
</script>
