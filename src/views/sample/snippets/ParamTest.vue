<template>
  <div>
    <form>
      <button v-on:click.prevent="submit">Send Data</button>
    </form>
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';

export default {
  data() {
    return {};
  },
  methods: {
    submit: async function() {
      const params = {
        applItemCpnList: [
          { bsktId: '20200311000000000001', prodId: '1000338' },
          { bsktId: '20200311000000000002' },
        ],
      };
      const response = await ApiUtils.post(
        '/fo/od/example/bsktmgnt/basket-item-list?',
        params
      );
      console.log(response);
    },
  },
};
</script>
