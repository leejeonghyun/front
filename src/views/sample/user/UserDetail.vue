<template>
  <div>
    <div>
      <p>{{ user.userId }}</p>
    </div>
    <div>
      <p>{{ user.userName }}</p>
    </div>
    <div class="button">
      <button @click="updateUser">수정</button>
      <button @click="deleteUser">삭제</button>
      <button @click="back">뒤로</button>
    </div>
  </div>
</template>
<script>
import ApiUtils from '@/common/ApiUtils';

export default {
  data() {
    return {
      user: {},
    };
  },
  mounted: async function() {
    try {
      const userId = this.$route.params.id;
      const response = await ApiUtils.get('/fo/cuexample/users/' + userId);
      this.user = response.data.data;
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  methods: {
    updateUser: function() {
      this.$router.push('/sample/user_update/' + this.user.userId);
    },
    deleteUser: async function() {
      const $vm = this;
      $vm.$dialog
        .confirm($vm.user.userId + ' 삭제하시겠습니까?', {
          cancelText: '취소'
        })
        .then(async function(dialog) {
          console.log('Clicked on proceed');
          try {
            const params = { userId: $vm.user.userId };
            const response = await ApiUtils.delete(
              '/fo/cuexample/users',
              params
            );
            if (response.data.success === true) {
              $vm.$gsdialog.alert('삭제되었습니다.').then(dialog => {
                $vm.$router.push('/sample/user_list');
              });
            }
          } catch (e) {
            $vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
              console.log(e);
            });
          }
        })
        .catch(function() {
          console.log('Clicked on cancel');
        });
    },
    back: function() {
      history.back();
    },
  },
};
</script>
<style scoped>
.button {
  text-align: center;
}
</style>
