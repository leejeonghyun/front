<template>
  <button v-on:click="giveAdvice">Click me for advice</button>
</template>

<script>
export default {
  data: function() {
    return {
      possibleAdvice: ['Yes', 'No', 'Maybe'],
    };
  },
  methods: {
    giveAdvice: function() {
      const randomAdviceIndex = Math.floor(
        Math.random() * this.possibleAdvice.length
      );
      this.$emit('give-advice', this.possibleAdvice[randomAdviceIndex]);
    },
  },
  created() {
    console.log('EmitTestChild');
  },
  mounted() {
    console.log('mounted child');
  },
};
</script>
