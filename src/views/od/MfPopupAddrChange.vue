<!--
views/od/SC-FO-OD-MF-MP-008
-->
<template>
  <!-- START : 배송지 변경 안내 동일권역 레이어 -->
  <div id="popupAddrChange" class="wrap-layer description-layer addr-change-layer" role="dialog" aria-labelledby="popupAddrChange" aria-modal="true" :class="{active : this.modalActive.popupAddrChange}">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3><span>주소지 변경을 선택해주세요.</span></h3>
        </div>
        <div class="layer-content">
          <ul class="select-list">
            <li>
              <span class="inp-radio small">
                <input type="radio" name="baseDlvpYn" id="baseDlvpYn1" v-model="baseDlvpYn" :value="'Y'">
                <label for="baseDlvpYn1">변경 주소지를 기본배송지로 설정하기</label>
              </span>
            </li>
            <li>
              <span class="inp-radio small">
                <input type="radio" name="baseDlvpYn" id="baseDlvpYn2" v-model="baseDlvpYn" :value="'N'">
                <label for="baseDlvpYn2">이번에만 주소지 변경하기</label>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-alert-bottom">
        <button class="btn-cancel" @click="popupAction">취소</button>
        <button class="btn-confirm" @click="changeMbrDlvp">확인</button>
      </div>
    </div>
  </div>
  <!-- END : 배송지 변경 안내 동일권역 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "MfPopupAddrChange",
  props: {
    mbrDlvp: Object,
    mbrDlvpTemp: Object
  },
  data() {
    return {
      baseDlvpYn: 'Y', // 기본배송지여부
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupAddrChange');
      this.modalActiveEvent('popupAddrChange');
    },
    changeMbrDlvp() {
      this.$emit('changeMbrDlvp', this.baseDlvpYn);
      this.popupAction();
      this.$emit('popupEvent', 'popupAddrList');
    }
  },
  mounted() {
    this.modalActiveEvent('popupAddrChange');
  }
};
</script>
