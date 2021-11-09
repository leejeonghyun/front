import ApiUtils from '@/common/ApiUtils';

const state = {
  name: '홍길동'
};

const actions = {
  getName: async function ({ commit }, params) {
    const response = await ApiUtils.get('/fo/cuexample/users/' + params.userId);
    state.name = response.data.data.userName;
  }
};

export default {
  state,
  actions
};
