<template>
  <div class="wrap-banner-text">
    <figure>
      <img src="@/assets/images/_temp/_img_promotion_banner_center.jpg" alt="우측 연어 이미지, 연어의 모든것. 지금은 홍연어가 대세" />
    </figure>
    <div class="wrap-text" :class="[type]">
      <div class="inner">
        <div class="banner-desc">
          연어의 모든것
        </div>
        <div class="banner-title">
          지금은 홍연어가 대세
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type']
};
</script>

<style>

</style>
