<template>
  <div>
    <h3>Cookie Set</h3>
    <button @click="getBtn">Make GET Cookie</button><br>
    <button @click="postBtn">Make POST Cookie</button><br>
    <button @click="putBtn">Make PUT Cookie</button><br>
    <button @click="delBtn">Make DELETE Cookie</button><hr>
    <button @click="preflightBtn">Make preflight Cookie</button><br>
    <h4>List</h4>
    <ul id="list"></ul>
    <hr>
    <ul>
      <li>
        <gs-link to="/sample/snippets/cookie_set_test">cookie set</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/cookie_get_test">cookie get</gs-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';

export default {
  methods: {
    async getBtn() {
      const response = await ApiUtils.get('/fo/cu/example/ajax/server');
      const el = document.getElementById('list');
      const item = response.data.cookie;
      el.innerHTML += `<li>${item}</li>`;
    },
    async postBtn() {
      const response = await ApiUtils.post('/fo/cu/example/ajax/server');
      const el = document.getElementById('list');
      const item = response.data.cookie;
      el.innerHTML += `<li>${item}</li>`;
    },
    async putBtn() {
      const response = await ApiUtils.put('/fo/cu/example/ajax/server');
      const el = document.getElementById('list');
      const item = response.data.cookie;
      el.innerHTML += `<li>${item}</li>`;
    },
    async delBtn() {
      const response = await ApiUtils.delete('/fo/cu/example/ajax/server');
      const el = document.getElementById('list');
      const item = response.data.cookie;
      el.innerHTML += `<li>${item}</li>`;
    },
    async preflightBtn() {
      const response = await ApiUtils.get('/fo/cu/example/ajax/server');
      const el = document.getElementById('list');
      const item = response.data.cookie;
      el.innerHTML += `<li>${item}</li>`;
    },
    async setCookie2() {
      const data = {
        userId: 'test1234',
        userPwd: encodeURI('aabbccdd77'),
      };
      const response = await ApiUtils.post(
        '/fo/cu/loginmgnt/web-id-login',
        data,
        { 'Content-Type': 'application/json' }
      );
      const el = document.getElementById('list');
      const item = response.data.cookie;
      el.innerHTML += `<li>${item}</li>`;
    },
  },
};
</script>

<style scoped>
button {
  border: 1px solid #8bd;
}
</style>
