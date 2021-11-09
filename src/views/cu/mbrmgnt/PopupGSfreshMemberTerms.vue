<!--
Design: views/cu/SC-FO-CU-GF-MP-012
Pg id:
Uri: /cu/pop_gsfres_memberterms
-->
<template>
  <div
    id="popupGSfreshMemberTerms"
    class="wrap-full-popup"
    role="dialog"
    aria-modal="true"
    :class="[{active : this.modalActive.popupGSfreshMemberTerms}, siteClass]"
  >
    <div class="header-popup">
      <h5>
        <strong>{{title}}</strong>
      </h5>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="wrap-terms-type system" v-html="form.cntrCt"></div>
      </div>
    </div>
    <button
      class="btn-layer-close"
      @click="popupAction"
      @keydown.9="tabFocusRemove('popupAction')"
      aria-label="포커스 아웃 시 팝업 닫기"
    >
      <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'PopupGSfreshMemberTerms',
  props: {
    title: String,
    code: String,
  },
  data() {
    return {
      form: {
        tmpCode: '',
        cntrCt: '',
        resultCode: '',
        resultMessage: '',
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {},
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupGSfreshMemberTerms');
      this.modalActiveEvent('popupGSfreshMemberTerms');
    },
  },
  mounted: async function() {
    this.form.tmpCode = this.code;
    const data = { code: this.form.tmpCode };
    const res = await ApiUtils.get(
      '/fo/cu/mbrmgnt/member-join-agreement',
      data
    );
    if (res.data.data.resultCode != '00000') {
      console.error(res.data.data.resultMessage);
      this.$gsdialog.alert(res.data.data.resultMessage, { html: true });
      return;
    } else {
      this.form.cntrCt = res.data.data.cntrCt;
    }
  },
  updated() {},
};
</script>
