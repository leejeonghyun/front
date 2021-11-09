<template>
  <section class="wrap-main-quick">
    <h2 class="hidden">퀵 메뉴</h2>
    <div class="wrap-quick-menu">
      <div class="wrap-list-quick">
        <span v-for="items in menuQuick" :key="items.dspSetId">
          <a href="#">
            <figure>
              <img
                src="@/assets/images/_temp/_ico_quick_purchase.png"
                :alt="items.rmnTplConrCompoSbjInq[1].rmnConrCntInfoInq[0].ctnsTitle"
              />
            </figure>
            {{items.rmnTplConrCompoSbjInq[1].rmnConrCntInfoInq[0].ctnsTitle}}
          </a>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MenuQuick',
  props: {
    menuQuick: Array,
  },
  data() {
    return {};
  },
  mounted: async function() {},
};
</script>

<style>
</style>
