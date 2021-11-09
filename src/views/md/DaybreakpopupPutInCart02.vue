<template>
    <!-- START : 새벽배송 장바구니 담김 팝업 -->
    <div id="defAddrReg" class="wrap-layer alert-layer active" role="dialog" aria-labelledby="defAddrReg" aria-modal="true" :class="[{active : this.modalActive.defAddrReg}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="alert-layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>장바구니에 담겼습니다</h3>
          </div>
          <div class="layer-content">
            <div class="message">
              배송지를 등록하시면 정확한 배송시간을<br />확인할 수 있습니다.<br />배송지를 등록하시겠습니까?
            </div>
          </div>
        </div>
        <div class="btn-alert-bottom">
          <button class="btn-cancel" @click="tabFocusRemove('popupAction')">취소</button>
          <button class="btn-confirm" @click="goDelivPlaceAdd">확인</button>
        </div>
      </div>
    </div>
    <!-- END : 업데이트 알림 팝업 -->
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import LoginUtils from '@/common/LoginUtils';
import SiteUtils from '@/common/SiteUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "DefAddrReg",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'defAddrReg');
    },
    goDelivPlaceAdd() {
      let goUrl = "/cu/delivery_place_add";
      if (!LoginUtils.isLogin()) {
        const returnUrl = encodeURIComponent(goUrl);
        goUrl = SiteUtils.commo('/cu/login?returnUrl=' + returnUrl);
      } else {
        goUrl = SiteUtils.commo(goUrl);
      }
      location.href = goUrl;
    }
  },
  mounted() {
  },
};
</script>
