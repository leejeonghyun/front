<template>
  <header class="wrap-main-header" :class="{active : popup.modalTrendy, [type]: this.type}">
    <nav>
      <h1>
        <gs-link to="/" class="logo">
          <span class="hidden">GS 프레시몰</span>
        </gs-link>
      </h1>
      <span class="wrap-header-link">
        <gs-link to="/search" class="btn-search" aria-label="검색화면이동"></gs-link>
        <button class="btn-trendy" aria-label="트렌드팝업활성화" aria-haspopup="dialog" @click="popupAction('modalTrendy')"></button>
        <gs-link to="/cart" class="btn-cart" aria-label="장바구니화면이동">
          <span class="num"><span class="hidden">장바구니개수</span>99+</span>
        </gs-link>
      </span>
    </nav>
    <!-- START : 팝업 -->
    <PopupTrendy @popupEvent="popupAction" :slideMargin="22" :slideShow="4.5" v-if="popup.modalTrendy" />
    <!-- END : 팝업 -->
  </header>
</template>
<script>
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import PopupTrendy from '@/components/common/PopupTrendy'; // 팝업 - 트렌트
export default {
  name: 'MainHeader',
  mixins: [LayPopupMixin],
  props: ['type'],
  data() {
    return {
      popup: {
        modalTrendy: false
      }
    };
  },
  components: {
    PopupTrendy
  },
  methods: {
    popupAction(type) {
      this.popup[type] = !this.popup[type];
    }
  }
};
</script>
<style>
</style>
