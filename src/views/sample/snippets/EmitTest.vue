<template>
  <div id="emit-example-argument">
    <EmitTestChild v-on:give-advice="showAdvice"></EmitTestChild>
  </div>
</template>

<script>
import EmitTestChild from './EmitTestChild';

export default {
  components: {
    EmitTestChild,
  },
  metaInfo: {
    title: 'Hello',
  },
  methods: {
    showAdvice: function(advice) {
      alert(advice);
    },
  },
  created() {
    console.log("EmitTest");
  },
  mounted() {
    console.log("mounted");
  },
};
</script>
