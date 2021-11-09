<template>
  <div>
    <button @click="send">send</button>
    <hr />
    <button @click="sendOuter">sendOuter</button>
    <hr />
    <div>{{ output }}</div>
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';

export default {
  data() {
    return {
      output: ''
    };
  },
  methods: {
    send: function() {
      const vm = this;
      ApiUtils.get(
        '/fo/cs/delivstlvmgnt/delivery-satisfaction-level-survey-list?cmmMbrNo=&cmmSteId=&delivTypeCd='
      )
        .then(function(response) {
          vm.output = JSON.stringify(response.data);
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    sendOuter: function() {
      const vm = this;
      ApiUtils.get(
        '/fo/od/proxy?url=http://itms.gsretail.com/rest/cgr/VhclLocation.json?deliNo=111111-222222222'
      )
        .then(function(response) {
          vm.output = JSON.stringify(response.data.dataMapList);
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>
