<template>
  <div>
    <h1>Cross Domain Login Test</h1>
    <ul>
      <li>Status: {{ status }}</li>
      <li>
        <a :href="toLogin" target="_blank">/cu/login</a>
      </li>
      <li>
        <a :href="toFresh" target="_blank">GS Fresh</a>
      </li>
      <li>
        <a :href="toDali" target="_blank">Dalisalda</a>
      </li>
    </ul>
  </div>
</template>

<script>
import SiteUtils from '@/common/SiteUtils';

export default {
  data() {
    return {
      status: 'Logged out'
    };
  },
  computed: {
    toLogin() {
      return SiteUtils.commo('/cu/login') + '?returnUrl=' + location.href;
    },
    toFresh() {
      return SiteUtils.freshmo('/sample/snippets/cross_login_test');
    },
    toDali() {
      return SiteUtils.dalimo('/sample/snippets/cross_login_test');
    }
  }
};
</script>

<style scoped>
ul {
  margin: 20px;
}
</style>
