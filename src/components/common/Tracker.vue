<template>
  <div>
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import Config from '@/common/Config';
export default {
  name: 'Tracker',
  props: {},
  data() {
    return {
      activeIndex: 0
    };
  },
  created() {
    console.log("Tracker.created");
    ApiUtils.loadScript(Config.tracking.url.adobe); // 어도비
  }
};
</script>

