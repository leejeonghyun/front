<!--
Design: views/cu/SC-FO-CU-GF-MP-017
Pg id:
Uri: /cu/pop_gsfres_thirdpartyterms
-->
<template>
  <div id="popupGSfreshThirdPartyTerms" class="wrap-full-popup" role="dialog" aria-modal="true">
  <!-- <div id="popupGSfreshThirdPartyTerms" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupGSfreshThirdPartyTerms}"> -->
    <div class="header-popup">
      <h5><strong>개인정보 제3자 제공동의</strong></h5>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="wrap-terms-type" v-html="cntrCt">
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
export default {
  name: "PopupGSfreshThirdPartyTerms",
  data() {
    return {
      cntrCt: "",
      resultCode: "",
      resultMessage: ""
    };
  },
  components: {
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupGSfreshThirdPartyTerms');
      this.modalActiveEvent('popupGSfreshThirdPartyTerms');
    },
  },
  mounted() {
      const data = {code: "R041"};
      ApiUtils.get('/fo/cu/mbrmgnt/member-join-agreement', data)
      .then((res) => {
        if (res.data.data.resultCode != "00000") {
            console.error(res.data.data.resultMessage);
            this.$dialog.alert(res.data.data.resultMessage);
            return;
        } else {
          this.cntrCt = res.data.data.cntrCt;
        }
      });
  },
  updated() {
  }
};
</script>
