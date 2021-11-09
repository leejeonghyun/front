<!--
views/od/SC-FO-OD-GS-MP-018
-->
<template>
    <!-- START : 사은품 레이어 -->
    <div id="popupGiftDouble" class="wrap-layer gift-option-layer" role="dialog" aria-labelledby="popupGiftDouble" aria-modal="true" :class="[{active : this.modalActive.popupGiftDouble}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-bottom-fixed">
        <div class="wrap-layer-content">
          <div class="title"><h3>{{pres.promNm}}</h3></div>
          <p class="txt-gift-option-desc">
            <span class="txt">사은품 {{pres.presPrvdOptPosbQty}}개를 선택해주세요.</span><br>선착순으로 지급되며, 재고 소진시 랜덤 발송됩니다.
          </p>
          <div class="scroll-area">
            <!-- 다중일 경우 -->
            <ul class="cart-product-list layer-list">
              <li v-for="(frgf, index) in promBeneZoneListTemp.promPresFrgfList" v-bind:key="index">
                <dl>
                  <dt>
                    <p class="tit">
                      <span class="inp-chk bg">
                        <input type="checkbox" name="" :id="`${'eventList' + index}`" value="" v-model="frgf.selYn" true-value="Y" false-value="N">
                        <label :for="`${'eventList' + index}`">{{getFrgfText(frgf)}}</label>
                      </span>
                    </p>
                  </dt>
                  <dd class="thumb">
                    <figure>
                      <a href="javascript://"><img src="@/assets/images/_temp/_img_cart01_01.jpg" alt="getFrgfText(frgf)"></a>
                    </figure>
                  </dd>
                  <dd class="option-number">
                    <button type="button" class="btn-minus" @click="decreaseCount(frgf)"><span class="hidden">선택수량 빼기</span></button>
                    <input type="number" name="" v-model="frgf.selQty" class="txt-number" title="선택 수량">
                    <button type="button" class="btn-plus" @click="increaseCount(frgf)"><span class="hidden">선택수량 더하기</span></button>
                  </dd>
                </dl>
              </li>
            </ul>
            <!-- 다중 -->
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
  name: "PopupGiftChangeDouble",
  props: {
    bsktId: String,
    pres: Object,
    promBeneZoneList: Object,
  },
  data() {
    return {
      promBeneZoneListTemp: {},
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    // chage value
    decreaseCount(frgf) {
      if ( frgf.selQty > 0) {
        frgf.selQty--;
      }
    },
    increaseCount(frgf) {
      if ( frgf.selQty < this.pres.presPrvdOptPosbQty) {
        frgf.selQty++;
      }
    },
    popupAction() {
      this.$emit('popupEvent', 'popupGiftDouble');
      this.modalActiveEvent('popupGiftDouble');
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
      let stkOverMsg = '';
      let minStkQty = 0;

      for (let idx=0; idx<this.promBeneZoneListTemp.promPresFrgfList.length; idx++) {
        if (this.promBeneZoneListTemp.promPresFrgfList[idx].selYn === 'Y') {
          if (this.promBeneZoneListTemp.promPresFrgfList.presFrgfTypeCd === '1' || this.promBeneZoneListTemp.promPresFrgfList.presFrgfTypeCd === '2') {
            minStkQty = Math.min(this.promBeneZoneListTemp.promPresFrgfList[idx].itemStkQty, this.promBeneZoneListTemp.promPresFrgfList[idx].presFrgfStkQty);
          } else {
            minStkQty = this.promBeneZoneListTemp.promPresFrgfList[idx].presFrgfStkQty;
          }
          if (this.promBeneZoneListTemp.promPresFrgfList[idx].selQty > minStkQty) {
            stkOverMsg = this.getFrgfText(this.promBeneZoneListTemp.promPresFrgfList[idx]) + '의 재고수량 ' + minStkQty + '개를 초과하였습니다.';
            break;
          }

          totalSelQty += this.promBeneZoneListTemp.promPresFrgfList[idx].selQty;
        }
      }

      if (stkOverMsg !== '') {
        alert(stkOverMsg);
        return;
      }

      if (this.pres.presPrvdOptPosbQty !== totalSelQty) {
        alert('사은품은 ' + this.pres.presPrvdOptPosbQty + '개만 선택 가능합니다.');
        return;
      }

      for (let idx=0; idx<this.promBeneZoneListTemp.promPresFrgfList.length; idx++) {
        if (this.promBeneZoneListTemp.promPresFrgfList[idx].selQty <= 0) {
          this.promBeneZoneListTemp.promPresFrgfList[idx].selYn = 'N';
        }
      }

      this.$emit('changeFrgf', this.promBeneZoneListTemp);
      this.popupAction();
    }
  },
  mounted() {
    this.promBeneZoneListTemp = JSON.parse(JSON.stringify(this.promBeneZoneList));
    this.modalActiveEvent('popupGiftDouble');
  }
};
</script>
