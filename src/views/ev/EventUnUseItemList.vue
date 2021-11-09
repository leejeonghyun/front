<template>
    <!-- START : alert 레이어 -->
    <div id="popupUnapplicableCoupon" class="wrap-layer alert-layer active" role="dialog" aria-labelledby="popupUnapplicableCoupon" aria-modal="true" :class="[{active : this.modalActive.popupUnapplicableCoupon}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="alert-layer-inner coupon">
        <div class="inner-box">
          <div class="title">
            <h3>쿠폰 적용 불가 상품</h3>
          </div>
          <div class="layer-content scroll-area">
            <ul class="list-info nomargin">
              <li v-for="(itemList,i) in lists" v-bind="itemList" v-bind:key="itemList.itemId+i">
                {{itemList.itemNm}}
              </li>
            </ul>
          </div>
        </div>
        <div class="btn-alert-bottom">
          <button class="btn-confirm" @click="popupAction">확인</button>
        </div>
        <button class="btn-layer-close" @click="popupAction" aria-label="포커스 아웃 시 팝업 닫기">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : alert 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupUnapplicableCoupon",
  props: ['popup'],
  data() {
    return {
      lists: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupUnapplicableCoupon');
    },
    async unUseItem() {
      await ApiUtils.get('/fo/ev/cpnprommgnt/use-exclude-item-list', this.popup)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          this.lists = res.data.data;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    }
  },
  mounted() {
    this.unUseItem();
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
