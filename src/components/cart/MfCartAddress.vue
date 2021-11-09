<template>
  <div class="cart-my-address">
    <p class="txt-addr" v-if="mbrDlvp.cmmMbrNo != 0">
      <strong>{{mbrDlvp.encAdrsNm}}</strong>
      [{{mbrDlvp.dlvpNm}}] {{mbrDlvp.encStnmBaseAddr}} {{mbrDlvp.encStnmDtlAddr}}
    </p>
    <p class="txt-addr" v-else>
      <strong>배송지를 등록해주세요</strong>
    </p>
    <p class="btn-addr-list">
      <button type="button" class="btn-border" aria-haspopup="dialog" @click="popupAction">
        <span v-if="mbrDlvp.cmmMbrNo != 0">배송지 변경</span>
        <span v-else>배송지 등록</span>
      </button>
    </p>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: 'CartAddress',
  props: {
    mbrDlvp: Object
  },
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {},
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupAddrList');
    },
  },
  mounted() {},
  computed: {
    getAddress: function() {
      return '[' + this.addressType + '] ' + this.address;
    },
  },
};
</script>
