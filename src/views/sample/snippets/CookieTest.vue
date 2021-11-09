<template>
  <div>
    <ul>
      <li v-for="cookie in cookieList" v-bind:key="cookie">{{ cookie }}</li>
    </ul>
    <hr />
    <h1 v-if="ok">Yes</h1>
    <h1 v-else>No</h1>
    <button @click="ok = !ok">toggle</button>
    <hr />* v-for
    <ul>
      <li v-for="item in itemList" v-bind:key="item.key">{{ item.key }} : {{ item.value }}</li>
    </ul>
    <hr />
    <ul>
      <li
        v-for="(item, index) in itemList"
        :key="item.key"
      >{{ index }}. {{ item.key }} : {{ item.value }}</li>
    </ul>
    <hr />
    <button @click="getConnInfo">mall id &amp; media type</button>
    <div>mall id: {{ mallId }}</div>
    <div>media type: {{ mdaType }}</div>
    <hr />
    <input type="text" v-model="ckey" />
    <button @click="setCookie">set Cookie</button>
    <div>{{ ckey }}</div>
  </div>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';

export default {
  data() {
    return {
      cookieList: ['world'],
      ok: true,
      itemList: [
        { key: 'a', value: 1 },
        { key: 'b', value: 2 },
        { key: 'c', value: 3 },
        { key: 'd', value: 4 },
      ],
      mallId: '',
      mdaType: '',
      ckey: '',
    };
  },
  mounted() {
    console.log(document.cookie);
    this.cookieList.push(CookieUtils.getCookie('Hello2'));
    CookieUtils.setCookie('Hello2', Date.now(), 1);
    CookieUtils.deleteCookie('hello3');
    this.ckey = CookieUtils.getCookie('cv');
  },
  methods: {
    getConnInfo() {
      this.mallId = CookieUtils.getMallId();
      this.mdaType = CookieUtils.getMdaType();
    },
    setCookie() {
      CookieUtils.setCookie('cv', this.ckey);
    },
  },
  computed: {
    cookieValue() {
      const value = CookieUtils.getCookie('cv');
      return value;
    },
  },
};
</script>

<style scoped>
input,
button {
  border: 1px solid #8bd;
}
</style>
