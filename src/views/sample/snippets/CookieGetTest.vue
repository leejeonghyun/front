<template>
  <div>
    <h3>Cookie Get</h3>
    <button @click="getCookie">Get Cookie</button>
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
    async getCookie() {
      const response = await ApiUtils.get('/fo/cu/example/ajax/get');
      if (!response.data) {
        return;
      }
      const el = document.getElementById('list');
      const keys = Object.keys(response.data.cookies).sort();
      keys.forEach(item => {
        el.innerHTML += `<li>${item}</li>`;
      });
    },
  },
};
</script>

<style scoped>
button {
  border: 1px solid #8bd;
}
</style>
