<template>
  <div>
    <h2>Users</h2>
    <input v-model="searchTerm" placeholder="userId 검색" />
    <ul>
      <user-item
        v-for="user in filteredUsers"
        v-bind:key="user.userId"
        v-bind:user="user"
      >{{ user.userName }}</user-item>
    </ul>
    <div class="button">
      <button v-on:click="add">add</button>
    </div>
    <div>
      <input id="user-id" placeholder="user id" v-model="searchUser.userId" />
      <br />
      <input id="email" placeholder="email" v-model="searchUser.email" />
      <br />
      <button @click="search">search</button>
    </div>
  </div>
</template>
<script>
import UserListItem from './UserListItem';

import ApiUtils from '@/common/ApiUtils';

export default {
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { custom: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  components: { 'user-item': UserListItem },
  data() {
    return {
      searchTerm: 'a',
      searchUser: {
        userId: 'hanakim',
        email: 'test@test.com',
      },
      users: [],
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((e) => {
        if (e.userId.includes(this.searchTerm)) {
          return e;
        }
      });
    }
  },
  mounted: async function() {
    try {
      const response = await ApiUtils.get('/fo/cuexample/users', null);
      this.users = response.data.data;
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  methods: {
    add: function() {
      this.$router.push('/sample/user_form');
    },
    search: async function() {
      const params = {
        userId: this.searchUser.userId,
        email: this.searchUser.email,
      };
      try {
        const result = await ApiUtils.get(
          '/fo/cuexample/users-search',
          params
        );
        this.$gsdialog.alert(JSON.stringify(result.data));
      } catch (e) {
        this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
    },
  },
};
</script>
<style scoped>
.button {
  text-align: center;
}
input,
button {
  border: 1px solid #ccc;
}
button {
  padding: 2px 8px;
}
</style>
