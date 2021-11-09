<template>
  <p class="banner-promo">
    <a href="javascript://" @click="goDaliDream">
      <img src="@/assets/images/_temp/_img_cart_banner02.jpg" alt="월 3,900원 달리;드림 패스 가입하고, 프리미엄급 가격 혜택 받으세요!">
    </a>
  </p>
</template>

<script>
import SiteUtils from '@/common/SiteUtils';
export default {
  name: "CartDalisaldaBanner",
  data() {
    return {
    };
  },
  directives: {},
  mixins: [],
  components: {
  },
  methods: {
    goDaliDream() {
      location.href = SiteUtils.dalimo('/cp/gnb_dream_pass_benefit');
    }
  },
  mounted() {
  },
};
</script>
