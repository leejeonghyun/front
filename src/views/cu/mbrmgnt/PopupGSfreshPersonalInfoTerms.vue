<!--
Design: views/cu/SC-FO-CU-GF-MP-016
Pg id:
Uri: /cu/pop_gsfres_personalinfoterms
-->
<template>
  <div id="popupGSfreshPersonalInfoTerms" class="wrap-full-popup" role="dialog" aria-modal="true">
  <!-- <div id="popupGSfreshPersonalInfoTerms" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupGSfreshPersonalInfoTerms}"> -->
    <div class="header-popup">
      <h5><strong>개인정보를 위한 이용약관</strong></h5>
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
  name: "PopupGSfreshPersonalInfoTerms",
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
      this.$emit('popupEvent', 'popupGSfreshPersonalInfoTerms');
      this.modalActiveEvent('popupGSfreshPersonalInfoTerms');
    },
  },
  mounted() {
      const data = {code: "R021"};
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
