<template>
    <MfFooter v-if="cmmSteId === '3'" />
    <Footer v-else />
</template>
<script>
import MfFooter from '@/components/common/M4Footer';
import Footer from '@/components/common/FooterGSF'; // 푸터
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'MainSubFooter',
  data() {
    return {
      cmmSteId: CookieUtils.getCmmSteId()
    };
  },
  methods: {},
  mounted() {},
  components: {
    Footer,
    MfFooter
  },
};
</script>
