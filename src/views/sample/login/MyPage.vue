<template>
  <div v-bind:class="[siteClass]">
    <h2>My page</h2>
    <header>{{ name }}</header>
    <button @click="showInfo">show info</button>
    <div>{{ info }}</div>
    <br />
    <gs-link to="/sample/token/logout">로그아웃</gs-link>
    <br />
    <button @click="resign">회원탈퇴</button>
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import TokenLogin from '@/common/sample/login/TokenLogin';
import CookieUtils from '@/common/CookieUtils';

export default {
  data() {
    return {
      name,
      info: '',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log('myto:', to);
    console.log('myfrom:', from);
    next();
  },
  created: TokenLogin.checkToken,
  mounted: function() {
    const payload = TokenLogin.getPayload(this);
    console.log(payload);
  },
  methods: {
    resign: TokenLogin.resign,
    showInfo: async function() {
      const user = await TokenLogin.getUser();
      this.info = JSON.stringify(user);
    },
  },
};
</script>
