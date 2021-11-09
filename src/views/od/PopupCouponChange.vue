<!--
views/od/SC-FO-OD-GS-MP-016
-->
<template>
  <!-- START : 쿠폰변경 레이어 -->
  <div id="popupCouponList" class="wrap-layer coupon-list-layer" role="dialog" aria-labelledby="popupCouponList" aria-modal="true" :class="[{active : this.modalActive.popupCouponList}, siteClass]">
    <div class="layer-bg" @click="popupCloseAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title"><h3>{{itemNm}}</h3></div>
      <div class="layer-content">
        <h4 class="coupon-title">
          <span class="inp-chk small">
            <input type="checkbox" name="coupon" id="coupon-item1" value="" :checked="rcmdCpnApplYn ? 'checked' : ''" @click="setRcmdCpn">
            <label for="coupon-item1">맞춤 혜택가</label>
          </span>
          <button type="button" aria-label="맞춤 혜택가 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupDiscountActive">
            <span class="hidden">맞춤 혜택가</span>
          </button>
        </h4>
        <div class="scroll-area">
          <div class="inner-box">
            <ul class="coupon-option-list">
              <li v-if="(itemCpnList !== null && Object.entries(itemCpnList).length > 0)">
                <dl class="coupon-type">
                  <dt>할인쿠폰</dt>
                  <dd v-for="(cpn, index) in itemCpnList" v-bind:key="index">
                    <p class="inp-radio small">
                      <input type="radio" name="itemCpn" :id="`${'itemCpn-item' + index}`" :value="`${cpn.cmmMbrNo + ':' + cpn.promId + ':' + cpn.cpnIsseSeqno}`" @change="changeCpn('item')" v-model="selectItemCpn">
                      <label :for="`${'itemCpn-item' + index}`">
                        <span class="name">{{cpn.promNm}}</span>
                        <span class="date">{{format(cpn.cpnValidDurBeginDttm, 'MM.DD')}}~{{format(cpn.cpnValidDurEndDttm, 'MM.DD HH:mm')}}까지<span class="discount" v-if="cpn.dcTypeCd === 'R'">최대 {{comma(cpn.maxDcAmt)}}원</span></span>
                      </label>
                      <span class="price"><strong>{{comma(cpn.dcAmt)}}</strong>원</span>
                    </p>
                    <p class="current" v-if="checkApplCpn('item', cpn.cmmMbrNo, cpn.promId, cpn.cpnIsseSeqno)">다른 상품에 {{comma(checkApplCpn('item', cpn.cmmMbrNo, cpn.promId, cpn.cpnIsseSeqno).dcAmt)}}원 쿠폰 적용 중</p>
                  </dd>
                  <dd>
                    <span class="inp-radio small">
                      <input type="radio" name="itemCpn" id="itemCpn-item" value="" @change="changeCpn('item')" v-model="selectItemCpn">
                      <label for="itemCpn-item">적용 안함</label>
                    </span>
                  </dd>
                </dl>
              </li>
              <li v-if="(dblDcCpnListTemp !== null && Object.entries(dblDcCpnListTemp).length > 0)">
                <dl class="coupon-type">
                  <dt>더블할인쿠폰</dt>
                  <dd v-for="(cpn, index) in dblDcCpnListTemp" v-bind:key="index">
                    <p class="inp-radio small">
                      <input type="radio" name="dblDcCpn" :id="`${'dblDcCpn-item' + index}`" :value="`${cpn.cmmMbrNo + ':' + cpn.promId + ':' + cpn.cpnIsseSeqno}`" @change="changeCpn('dbl')" v-model="selectDblDcCpn">
                      <label :for="`${'dblDcCpn-item' + index}`">
                        <span class="name">{{cpn.promNm}}</span>
                        <span class="date">{{format(cpn.cpnValidDurBeginDttm, 'MM.DD')}}~{{format(cpn.cpnValidDurEndDttm, 'MM.DD HH:mm')}}까지<span class="discount" v-if="cpn.dcTypeCd === 'R'">최대 {{comma(cpn.maxDcAmt)}}원</span></span>
                      </label>
                      <span class="price"><strong>{{comma(cpn.dcAmt)}}</strong>원</span>
                    </p>
                    <p class="current" v-if="checkApplCpn('dbl', cpn.cmmMbrNo, cpn.promId, cpn.cpnIsseSeqno)">다른 상품에 {{comma(checkApplCpn('dbl', cpn.cmmMbrNo, cpn.promId, cpn.cpnIsseSeqno).dcAmt)}}원 쿠폰 적용 중</p>
                  </dd>
                  <dd>
                    <span class="inp-radio small">
                      <input type="radio" name="dblDcCpn" id="dblDcCpn-item" value="" @change="changeCpn('dbl')" v-model="selectDblDcCpn">
                      <label for="dblDcCpn-item">적용 안함</label>
                    </span>
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg lightgreen"  @click="useCpn">총 {{comma(dcAmt)}}원 할인 받기</button>
      </div>
      <button class="btn-layer-close" @click="popupCloseAction">
        <span class="hidden">닫기</span>
      </button>
    </div>
    <!-- START : 맞춤혜택가 레이어 SC-FO-OD-GS-MP-042 -->
    <div id="popupCouponBenefit" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupCouponBenefit" aria-modal="true" :class="{active : this.popup.popupCouponBenefit}">
      <div class="layer-bg" @click="popupCloseAction2"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>맞춤혜택가</h3>
          </div>
          <div class="layer-content">
            <ul class="list-dot">
              <li>할인율이 높은 쿠폰이 우선 적용됩니다. </li>
              <li>할인율이 동일한 경우, 쿠폰 유효기간 임박 순으로 적용됩니다.</li>
              <li>쿠폰 자동 적용은 고객님이 받을 수 있는 혜택을 맞춤혜택가로 추천해드리는 것이며, 맞춤 혜택가는 최대할인율로 적용되지 않을 수 있습니다.</li>
              <li>쿠폰이 여러 개인 경우, 직접 선택하여 쿠폰을 변경 할 수 있습니다.</li>
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupCloseAction2">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
  <!-- END : 맞춤혜택가 레이어 SC-FO-OD-GS-MP-042 -->
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupCouponList",
  props: {
    itemCpnList: Array,
    dblDcCpnList: Array,
    itemNm: String,
    bsktId: String,
    applItemCpnList: Array,
    applDblDcCpnList: Array,
    itemDcSprc: Number,
    bsktQty: Number,
    cmplDcAmt: Number
  },
  data() {
    return {
      popup: { // 팝업
        open: false,
        popupCouponBenefit: false,
      },
      dcAmt: 0,
      selectItemCpn: '',
      selectDblDcCpn: '',
      rcmdCpnApplYn: false,
      dblDcCpnListTemp: [],
      siteClass: CookieUtils.getSiteClass(),
      test: '<p class="current">다른 상품에 300원 쿠폰 적용 중</p>'
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupCouponList');
      this.modalActiveEvent('popupCouponList');
    },
    // 맞춤혜택가
    popupDiscountActive() {
      this.popupAction('popupCouponBenefit');
      this.modalActiveEvent('popupCouponBenefit');
    },
    popupCloseAction2() {
      this.popupAction('popupCouponBenefit');
      this.modalActiveEvent('popupCouponBenefit');
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    format(date, dateFormat) {
      return DateUtils.format(date, dateFormat);
    },
    changeCpn(type) {
      if (this.selectItemCpn === '') {
        this.dcAmt = 0;
      } else {
        const cpnInfo = this.selectItemCpn.split(":");
        const selctedItemCpn = this.itemCpnList.find(cpn => cpn.cmmMbrNo == cpnInfo[0] && cpn.promId == cpnInfo[1] && cpn.cpnIsseSeqno == cpnInfo[2]);
        this.dcAmt = selctedItemCpn.dcAmt;
      }

      this.rcmdCpnApplYn = false;

      // 상품쿠폰 사용 시 쿠폰을 사용하지 못하는 상황 or 더블할인 쿠폰 할인금액이 변동 될 수 있기 때문에 재계산한다.
      this.setDblDcCpnList();

      if (this.selectDblDcCpn !== '') {
        const cpnInfo = this.selectDblDcCpn.split(":");
        const selectedDblDcCpn = this.dblDcCpnListTemp.find(cpn => cpn.cmmMbrNo == cpnInfo[0] && cpn.promId == cpnInfo[1] && cpn.cpnIsseSeqno == cpnInfo[2]);
        if (selectedDblDcCpn) {
          this.dcAmt += selectedDblDcCpn.dcAmt;
        } else {
          this.selectDblDcCpn = '';
        }
      }
    },
    setRcmdCpn() {
      this.rcmdCpnApplYn = !this.rcmdCpnApplYn;
      console.log(this.rcmdCpnApplYn);
      console.log(this.itemCpnList);
      if (this.rcmdCpnApplYn) {
        let selctedItemCpn = null;
        let chkApplCpn = null;
        for (let idx=0; idx<this.itemCpnList.length; idx++) {
          chkApplCpn = this.checkApplCpn('item', Number(this.itemCpnList[idx].cmmMbrNo), this.itemCpnList[idx].promId, Number(this.itemCpnList[idx].cpnIsseSeqno));
          if (!chkApplCpn) {
            selctedItemCpn = this.itemCpnList[idx];
            break;
          }
        }

        if (selctedItemCpn) {
          this.dcAmt = selctedItemCpn.dcAmt;
          this.selectItemCpn = selctedItemCpn.cmmMbrNo + ':' + selctedItemCpn.promId + ':' + selctedItemCpn.cpnIsseSeqno;
        } else {
          this.dcAmt = 0;
          this.selectItemCpn = '';
        }

        this.setDblDcCpnList();
        let selectDblDcCpn = null;
        for (let idx=0; idx<this.dblDcCpnListTemp.length; idx++) {
          chkApplCpn = this.checkApplCpn('dbl', Number(this.dblDcCpnListTemp[idx].cmmMbrNo), this.dblDcCpnListTemp[idx].promId, Number(this.dblDcCpnListTemp[idx].cpnIsseSeqno));
          if (!chkApplCpn) {
            selectDblDcCpn = this.dblDcCpnListTemp[idx];
            break;
          }
        }

        if (selectDblDcCpn) {
          this.dcAmt += selectDblDcCpn.dcAmt;
          this.selectDblDcCpn = selectDblDcCpn.cmmMbrNo + ':' + selectDblDcCpn.promId + ':' + selectDblDcCpn.cpnIsseSeqno;
        } else {
          this.selectDblDcCpn = '';
        }
        /*
        if (this.selectDblDcCpn !== '') {
          const cpnInfo = this.selectDblDcCpn.split(":");
          const selectedDblDcCpn = this.dblDcCpnListTemp.find(cpn => cpn.cmmMbrNo == cpnInfo[0] && cpn.promId == cpnInfo[1] && cpn.cpnIsseSeqno == cpnInfo[2]);
          if (selectedDblDcCpn) {
            this.dcAmt += selectedDblDcCpn.dcAmt;
          } else {
            this.selectDblDcCpn = '';
          }
        }
        */
      } else {
        this.dcAmt = 0;
        this.selectItemCpn = '';
        this.setDblDcCpnList();
        this.selectDblDcCpn = '';
      }
    },
    useCpn() {
      if (this.selectItemCpn !== '') {
        const cpnInfo = this.selectItemCpn.split(":");

        const applCpn = this.checkApplCpn('item', Number(cpnInfo[0]), cpnInfo[1], Number(cpnInfo[2]));
        if (applCpn) {
          if (!confirm('해당 쿠폰은 다른 상품에 이미 적용 중입니다.\r\n해제 후 상품에 적용하시겠습니까?\r\n\r\n기존 적용 상품\r\n' + applCpn.itemNm)) {
            return;
          }
        }
      }

      if (this.selectDblDcCpn !== '') {
        const cpnInfo = this.selectDblDcCpn.split(":");

        const applCpn = this.checkApplCpn('dbl', Number(cpnInfo[0]), cpnInfo[1], Number(cpnInfo[2]));
        if (applCpn) {
          if (!confirm('해당 쿠폰은 다른 상품에 이미 적용 중입니다.\r\n해제 후 상품에 적용하시겠습니까?\r\n\r\n기존 적용 상품\r\n' + applCpn.itemNm)) {
            return;
          }
        }
      }

      this.$emit('useCpn', this.selectItemCpn, this.selectDblDcCpn, this.bsktId, this.rcmdCpnApplYn);
      this.$emit('popupEvent', 'popupCouponList');
      this.modalActiveEvent('popupCouponList');
    },
    checkApplCpn(type, cmmMbrNo, promId, cpnIsseSeqno) {
      const bsktId = this.bsktId;
      let applCpn = {};
      if (type === 'item') {
        if (this.applItemCpnList) {
          applCpn = this.applItemCpnList.find(applItemCpn => applItemCpn.bsktId !== bsktId && applItemCpn.cmmMbrNo === cmmMbrNo && applItemCpn.promId === promId && applItemCpn.cpnIsseSeqno === cpnIsseSeqno);
        } else {
          applCpn = null;
        }
      } else {
        if (this.applDblDcCpnList) {
          applCpn = this.applDblDcCpnList.find(applItemCpn => applItemCpn.bsktId !== bsktId && applItemCpn.cmmMbrNo === cmmMbrNo && applItemCpn.promId === promId && applItemCpn.cpnIsseSeqno === cpnIsseSeqno);
        } else {
          applCpn = null;
        }
      }

      return applCpn;
    },
    setDblDcCpnList() {
      this.dblDcCpnListTemp = JSON.parse(JSON.stringify(this.dblDcCpnList));
      const $this = this;
      if (this.dblDcCpnListTemp) {
        const itemDcSprc = (this.itemDcSprc * this.bsktQty) - this.cmplDcAmt - this.dcAmt;
        const itemDcAmt = Math.floor(itemDcSprc / 10) * 10;
        const dblDcCpnListTemp2 = [];
        this.dblDcCpnListTemp.forEach(function (cpn, idx) {
          let cpnDcAmt = 0;
          if (itemDcSprc >= cpn.evntApplStandAmt) {
            if (cpn.dcTypeCd === 'R') {
              cpnDcAmt = Math.ceil(itemDcAmt * cpn.beneApplVal / 1000) * 10;
              if (cpn.maxDcAmt < cpnDcAmt) {
                cpnDcAmt = cpn.maxDcAmt;
              }
            } else {
              cpnDcAmt = cpn.dcAmt;
            }

            cpn.dcAmt = cpnDcAmt;
            if (itemDcSprc >= cpn.dcAmt) {
              dblDcCpnListTemp2.push(cpn);
            }
          }
        });

        this.dblDcCpnListTemp = dblDcCpnListTemp2;
      }
    }
  },
  mounted() {
    this.modalActiveEvent('popupCouponList');

    if (this.itemCpnList !== null && Object.entries(this.itemCpnList).length > 0) {
      const selctedItemCpn = this.itemCpnList.find(itemCpn => itemCpn.applYn);

      if (selctedItemCpn) {
        this.dcAmt += selctedItemCpn.dcAmt;
        this.selectItemCpn = selctedItemCpn.cmmMbrNo + ':' + selctedItemCpn.promId + ':' + selctedItemCpn.cpnIsseSeqno;
        if (this.applItemCpnList) {
          const applCpn = this.applItemCpnList.find(applItemCpn => applItemCpn.bsktId === this.bsktId && applItemCpn.cmmMbrNo === selctedItemCpn.cmmMbrNo && applItemCpn.promId === selctedItemCpn.promId && applItemCpn.cpnIsseSeqno === selctedItemCpn.cpnIsseSeqno);
          if (applCpn) {
            this.rcmdCpnApplYn = applCpn.maxBeneYn;
          }
        }
      }
    }

    this.setDblDcCpnList();
    if (this.dblDcCpnListTemp) {
      const selectedDblDcCpn = this.dblDcCpnListTemp.find(dblDcCpn => dblDcCpn.applYn);

      if (selectedDblDcCpn) {
        this.dcAmt += selectedDblDcCpn.dcAmt;
        this.selectDblDcCpn = selectedDblDcCpn.cmmMbrNo + ':' + selectedDblDcCpn.promId + ':' + selectedDblDcCpn.cpnIsseSeqno;
        if (this.applDblDcCpnList) {
          const applCpn = this.applDblDcCpnList.find(applDblDcCpn => applDblDcCpn.bsktId === this.bsktId && applDblDcCpn.cmmMbrNo === selectedDblDcCpn.cmmMbrNo && applDblDcCpn.promId === selectedDblDcCpn.promId && applDblDcCpn.cpnIsseSeqno === selectedDblDcCpn.cpnIsseSeqno);
          if (applCpn) {
            this.rcmdCpnApplYn = applCpn.maxBeneYn;
          }
        }
      }
    }
  }
};
</script>
