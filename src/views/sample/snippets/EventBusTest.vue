<template>
<div>
  <input v-model="count" />
  <button @click="handleGlobalClick">Global Event Button</button>
  <hr>
  <EventBusUse></EventBusUse>
</div>
</template>

<script>
import EventBus from './EventBus';
import EventBusUse from './EventBusUse';

export default {
  components: {
    EventBusUse
  },
  data() {
    return {
      count: 1
    };
  },
  methods: {
    handleGlobalClick: function () {
      this.count *= 2;
      EventBus.$emit('trigger', { message: this.count});
    }
  }
};
</script>
