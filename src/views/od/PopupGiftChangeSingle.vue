<!--
views/od/SC-FO-OD-GS-MP-017
-->
<template>
    <!-- START : 사은품 레이어 -->
    <div id="popupGiftSingle" class="wrap-layer gift-option-layer" role="dialog" aria-labelledby="popupGiftSingle" aria-modal="true" :class="[{active : this.modalActive.popupGiftSingle}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-bottom-fixed">
        <div class="wrap-layer-content">
          <div class="title"><h3>{{pres.promNm}}</h3></div>
           <p class="txt-gift-option-desc">
            <span class="txt">사은품 1개를 선택해주세요.</span><br>선착순으로 지급되며, 재고 소진시 랜덤 발송됩니다.
           </p>
          <div class="scroll-area">
            <!-- 단일일 경우 -->
            <ul class="option-list inner-box">
              <li v-for="(frgf, index) in promBeneZoneListTemp.promPresFrgfList" v-bind:key="index">
                <span class="inp-radio small">
                  <input type="radio" name="option" :id="`${'eventList' + index}`" :value="frgf.promPresFrgfSeqno" v-model="selectedFrgfSeqNo">
                  <label :for="`${'eventList' + index}`">{{getFrgfText(frgf)}}</label>
                </span>
              </li>
            </ul>
            <!-- //단일 -->
          </div>
          <div class="wrap-btn">
            <button type="button" class="btn-lg btn-bg lightgreen"  @click="changeFrgf">변경</button>
          </div>
          <button class="btn-layer-close" @click="popupAction">
            <span class="hidden">닫기</span>
          </button>
        </div>
      </div>
    </div>
    <!-- END : 사은품 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupGiftChangeSingle",
  props: {
    bsktId: String,
    pres: Object,
    promBeneZoneList: Object,
  },
  data() {
    return {
      promBeneZoneListTemp: {},
      selectedFrgfSeqNo: null,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupGiftSingle');
      this.modalActiveEvent('popupGiftSingle');
    },
    getFrgfText(frgf) {
      let text = '';

      if (frgf.presFrgfTypeCd === '4') {
        text += 'GS&POINT ' + frgf.presFrgfApplVal + 'p';
      } else if (frgf.presFrgfTypeCd === '5') {
        text += 'GS&리워즈 ' + frgf.presFrgfApplVal + 'p';
      } else {
        text += frgf.presFrgfApplValNm;
      }

      return text;
    },
    changeFrgf() {
      let totalSelQty = 0;
      for (let idx=0; idx<this.promBeneZoneListTemp.promPresFrgfList.length; idx++) {
        if (this.promBeneZoneListTemp.promPresFrgfList[idx].promPresFrgfSeqno === this.selectedFrgfSeqNo) {
          this.promBeneZoneListTemp.promPresFrgfList[idx].selQty = 1;
          this.promBeneZoneListTemp.promPresFrgfList[idx].selYn = 'Y';
          totalSelQty += this.promBeneZoneListTemp.promPresFrgfList[idx].selQty;
        } else {
          this.promBeneZoneListTemp.promPresFrgfList[idx].selQty = 0;
          this.promBeneZoneListTemp.promPresFrgfList[idx].selYn = 'N';
        }
      }

      if (this.pres.presPrvdOptPosbQty !== totalSelQty) {
        alert('사은품은 ' + this.pres.presPrvdOptPosbQty + '개만 선택 가능합니다.');
        return;
      }

      this.$emit('changeFrgf', this.promBeneZoneListTemp);
      this.popupAction();
    }
  },
  destroyed() {
  },
  mounted() {
    this.promBeneZoneListTemp = JSON.parse(JSON.stringify(this.promBeneZoneList));
    const selectedFrgf = this.promBeneZoneListTemp.promPresFrgfList.find(frgf => frgf.selYn === 'Y');
    if (selectedFrgf) {
      this.selectedFrgfSeqNo = selectedFrgf.promPresFrgfSeqno;
    }
    this.modalActiveEvent('popupGiftSingle');
  },
};
</script>
