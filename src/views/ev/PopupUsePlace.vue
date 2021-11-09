<!--
views/ss/SC-FO-SS-GF-MP-703.vue
-->
<template>
    <!-- START : alert 레이어 -->
    <div id="popupUsePlace" class="wrap-layer alert-layer plus-alert-layer active" role="dialog" aria-labelledby="popupUsePlace" aria-modal="true" :class="[{active : this.modalActive.popupUsePlace}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="alert-layer-inner coupon">
        <div class="inner-box">
          <div class="title">
            <h3>사용처</h3>
          </div>
          <div class="layer-content scroll-area">
            <ul class="list-info">
              <li v-for="market in useMarketList" :key="market.storId">{{market.storeNm}}</li>
            </ul>
          </div>
        </div>
        <!-- START : 2020.02.05 수정 -->
        <div class="btn-alert-bottom">
          <button class="btn-confirm" @click="popupAction">확인</button>
        </div>
        <button class="btn-layer-close" @click="popupAction"><span class="hidden">닫기</span></button>
        <!-- END : 2020.02.05 수정 -->
      </div>
    </div>
    <!-- END : alert 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupUsePlace",
  props: ['popup'],
  data() {
    return {
      useMarketList: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupUsePlace');
      this.modalActiveEvent('popupUsePlace');
    },
  },
  async mounted() {
    this.modalActiveEvent('popupUsePlace');
    await ApiUtils.get('/fo/ev/cpnprommgnt/usecompany-list', this.popup)
    .then(res => {
      if (res.data && res.data.success && res.data.data) {
        this.useMarketList = res.data.data;
      }
    })
    .catch(e => {
      // this.$gsdialog.alert(e.response.data.statusMessage);
    });
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
