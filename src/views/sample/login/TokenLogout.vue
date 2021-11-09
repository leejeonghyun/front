<template>
  <div>
    <h2>로그아웃 되었습니다.</h2>
    <div>
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
