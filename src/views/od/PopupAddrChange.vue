<!--
views/od/SC-FO-OD-GS-MP-036
-->
<template>
    <!-- START : 배송지 변경 안내 동일권역 레이어 -->
    <div id="popupAddrChange" class="wrap-layer description-layer addr-change-layer" role="dialog" aria-labelledby="popupAddrChange" aria-modal="true" :class="[{active : this.modalActive.popupAddrChange}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <h3 class="hidden">배송지 변경 안내</h3>
          <div class="layer-content">
            <!--
            <ol class="addr-info">
              <li aria-label="변경 전 주소">[{{mbrDlvp.dlvpNm}}]<br>{{mbrDlvp.siteNm}}<br>{{mbrDlvp.storNm}}</li>
              <li aria-label="변경 후 주소">[{{mbrDlvpTemp.dlvpNm}}]<br>{{mbrDlvpTemp.siteNm}}<br>{{mbrDlvpTemp.storNm}}</li>
            </ol>
            -->
            <div class="txt-caution1" v-if="mbrDlvp.supplFirmCd !== mbrDlvpTemp.supplFirmCd && mbrDlvpTemp.dawnSupplFirmCd !== ''">
              <p>선택하신 배송지는 다른 권역에서 배송됩니다.</p>
            </div>
            <div class="txt-caution1" v-if="mbrDlvp.supplFirmCd !== mbrDlvpTemp.supplFirmCd && mbrDlvpTemp.dawnSupplFirmCd === ''">
              <p class="color-gray">선택하신 배송지는 다른 권역에서 배송됩니다.</p>
              <p class="point">새벽 배송이 불가한 지역입니다.</p>
            </div>
            <div class="txt-caution2" v-if="mbrDlvp.supplFirmCd !== mbrDlvpTemp.supplFirmCd">
              <p class="ico-alert2">배송지 변경 시 배송 매장이 변경되어 구매 가능한 상품이 달라질 수 있습니다.</p>
            </div>
            <ul class="select-list">
              <li>
                <span class="inp-radio small">
                  <input type="radio" name="addr" id="addr-item1" value="true" v-model="baseDlvpYn">
                  <label for="addr-item1">변경 주소지를 기본배송지로 설정하기</label>
                </span>
              </li>
              <li>
                <span class="inp-radio small">
                  <input type="radio" name="addr" id="addr-item2" value="false" v-model="baseDlvpYn">
                  <label for="addr-item2">이번에만 주소지 변경하기</label>
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
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupAddrChange",
  props: {
    mbrDlvp: Object,
    mbrDlvpTemp: Object
  },
  data() {
    return {
      baseDlvpYn: true,
      siteClass: CookieUtils.getSiteClass(),
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
      this.$emit('popupEvent', 'popupAddrChange');
      this.modalActiveEvent('popupAddrChange');
      this.$emit('popupEvent', 'popupAddrList');
    }
  },
  mounted() {
    this.modalActiveEvent('popupAddrChange');
  }
};
</script>
