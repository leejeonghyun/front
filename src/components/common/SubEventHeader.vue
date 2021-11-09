<template>
  <header>
    <div class="wrap-headerbar event">
      <button class="btn-prev" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^뒤로가기">
        <span class="hidden">뒤로가기</span>
      </button>
      <button class="btn-home" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^홈">
        <span class="hidden">GS 프레시몰 홈 바로가기</span>
      </button>
      <h1 class="header-title">{{ headerText }}</h1>
      <gs-link to="/search" class="btn-search" aria-label="검색화면이동" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^검색"></gs-link>
      <button class="btn-trendy" aria-label="트렌드팝업활성화" aria-haspopup="dialog" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^트렌드팝업" @click="popupAction('modalTrendy')"></button>
      <gs-link to="/cart" class="btn-cart" aria-label="장바구니화면이동" data-sc-action="link.click" data-dimension-name="link.header" data-dimension-value="header^장바구니">
        <span class="num"><span class="hidden">장바구니개수</span>99+</span>
      </gs-link>
    </div>
    <!-- START : 팝업 -->
    <PopupTrendy @popupEvent="popupAction" :slideMargin="22" :slideShow="4.5" v-if="popup.modalTrendy" />
    <!-- END : 팝업 -->
  </header>
</template>
<script>
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import PopupTrendy from '@/components/common/PopupTrendy'; // 팝업 - 트렌트
export default {
  name: "SubDefaultHeader",
  mixins: [LayPopupMixin],
  props: ['headerText'],
  components: {
    PopupTrendy
  },
  data() {
    return {
      popup: {
        modalTrendy: false
      }
    };
  },
  methods: {
    searchOpenAction() {
      this.$emit('searchbarEvent');
    },
    popupAction(type) {
      this.popup[type] = !this.popup[type];
    }
  }
};
</script>
