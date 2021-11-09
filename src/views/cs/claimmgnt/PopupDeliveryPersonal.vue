<!--
Design: views/cs/claimmgnt/SC-FO-SS-GF-MP-861
Pg id: PG-FO-CS-O014
Uri: /cs/claimmgnt/popup_delivery_personal
-->
<template>
  <!-- START : 고객부담금액 -->
  <div id="popupDeliveryPersonal" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupDeliveryPersonal" aria-modal="true" :class="[{active : this.modalActive.popupDeliveryPersonal}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3>고객부담금액</h3>
        </div>
        <div class="layer-content">
          <p class="mb10">취소/반품/교환으로 인해 최종 결제금액이 무료배송 기준에 충족되지 못하면 배송비가 추가로 부과됩니다. (할인 적용 후 최종 결제금액 기준)</p>
          <p class="mb10"><strong class="point">취소/반품/교환</strong> 사유에 따라 반품배송비가 부과될 수 있습니다.</p>
          <div class="delivery-return-info center">
            <table class="delivery-time-table mb10" v-if="ordDlfeePolcList != null && ordDlfeePolcList.length > 0">
              <caption class="hidden">고객부담금액</caption>
              <colgroup>
                <col style="width: 27.5%" />
                <col />
                <col style="width: 27.5%" v-if="claimSp != 'CANCEL'"/>
              </colgroup>
              <thead>
                <tr>
                <th scope="col">구분</th>
                <th scope="col">기본 배송비</th>
                <th scope="col" v-if="claimSp != 'CANCEL'">{{getMessage()}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(dlfeePolc, inx) in ordDlfeePolcList" :key="'DLFEE_POLC_'+inx">
                  <th scope="row">{{dlfeePolc.delivTypeNm}}</th>
                  <td>{{toComma(dlfeePolc.freeDelivStandAmt)}} 미만 {{toComma(dlfeePolc.dlfeeAmt)}}원</td>
                  <td v-if="claimSp != 'CANCEL'"><span class="point">{{getDlfeeAmt(dlfeePolc)}}원</span></td>
                </tr>
              </tbody>
            </table>
            <ul class="list-dot">
              <li>
                <em>예약배송</em> : 배송유형별 배송비 정책 상이
              </li>
              <li>
                <em>택배배송</em> : 업체별 배송비 정책 상이
              </li>
              <li>
                <em>해외배송</em> : 업체별 배송비 정책 상이
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기">
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 고객부담금액 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupDeliveryPersonal",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  props: {
    ordDlfeePolcList: Array,
    claimSp: String,
  },
  methods: {
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    popupAction() {
      this.$emit('popupEvent', 'popupDeliveryPersonal');
      this.modalActiveEvent('popupDeliveryPersonal');
    },
    getMessage() {
      if (this.claimSp == 'CANCEL') {
        return '';
      } else if (this.claimSp == 'RETURN') {
        return '반품 배송비';
      } else if (this.claimSp == 'EXCHANGE') {
        return '교환 배송비';
      }
    },
    getDlfeeAmt(dlfeePolc) {
      if (this.claimSp == 'CANCEL') {
        return '';
      } else if (this.claimSp == 'RETURN') {
        return this.toComma(dlfeePolc.rtnDlfeeAmt);
      } else if (this.claimSp == 'EXCHANGE') {
        return this.toComma(dlfeePolc.exchDlfeeAmt);
      }
    },
  },
  mounted() {
    this.modalActiveEvent('popupDeliveryPersonal');
  }
};
</script>
