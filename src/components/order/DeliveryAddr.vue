<template>
  <!-- START : 배송지 -->
  <div class="section-area pd-top">
    <div class="sub-inner-box">
      <div class="receive-delivery-info">
        <div class="my-address">
          <p>{{mbrDelivInfoAddr.adrsNm}} [{{mbrDelivInfoAddr.dlvpNm}}]</p>
          <button type="button" class="btn-border btn-change-address" aria-label="배송지 목록 팝업 활성화" aria-haspopup="dialog" @click="popupAction">변경</button>
          <p><span class="code">[{{mbrDelivInfoAddr.zipcd}}]</span> {{mbrDelivInfoAddr.stnmAddr}}</p>
          <p>{{telNoPrt}}</p>
        </div>
        <p class="select-safe2">
          <span class="inp-chk small">
            <input type="checkbox" name="" id="safe-number" value="">
            <label for="safe-number">안심번호 신청</label>
          </span>
        </p>
      </div>
    </div>
  </div>
  <!-- END : 배송지 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  props: {
    mbrDelivInfoAddr: Object,
  },
  name: "DeliveryAddr",
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction(type) { // 팝업 활성/비활성
      this.$emit('popupEvent', 'popupDeliveryList', this.mbrDelivInfoAddr);
    },
  },
  destroyed() {
  },
  mounted() {
  },
  computed: {
    telNoPrt: function() {
      if (this.mbrDelivInfoAddr.moblTelNo01 != undefined && this.mbrDelivInfoAddr.moblTelNo != undefined) {
        return this.mbrDelivInfoAddr.moblTelNo01 + " - " + (this.mbrDelivInfoAddr.moblTelNo).substring(0, 4) + " - " + (this.mbrDelivInfoAddr.moblTelNo).substring(4);
      } else {
        return '';
      }
    }
  },
  updated() {
    console.log("this.mbrDelivInfoAddr DelivAddr : ", this.mbrDelivInfoAddr);
  }
};
</script>
