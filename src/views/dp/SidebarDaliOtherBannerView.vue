<template>
  <section class="wrap-other-banner">
    <!--SidebarOtherBanner /-->
    <SidebarNormalBanner />
  </section>
</template>
<script>
import SidebarNormalBanner from '@/views/dp/SidebarNormalBanner';
import SidebarOtherBanner from '@/views/dp/SidebarOtherBanner';
export default {
  name: 'SidebarDaliOtherBannerView',
  data() {
    return {};
  },
  components: {
    SidebarNormalBanner,
    // 테마관 - 현업에서 삭제예정이라 전달받음
    // SidebarOtherBanner,
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped>
</style>
