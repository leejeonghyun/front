<template>
  <div>
    <p>received: {{ message }}</p>
  </div>
</template>

<script>
import EventBus from './EventBus';

export default {
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    const vm = this;
    EventBus.$on('trigger', function(payload) {
      vm.message = payload.message;
      EventBus.$off('trigger');
    });
  }
};
</script>
