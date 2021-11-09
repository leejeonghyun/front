<!--
views/od/SC-FO-OD-MF-MP-004
-->
<template>
  <!-- START : 쿠폰변경 레이어 -->
  <div id="popupCouponList" class="wrap-layer coupon-list-layer" role="dialog" aria-labelledby="popupCouponList" aria-modal="true" :class="{active : this.modalActive.popupCouponList}">
    <div class="layer-bg" @click="popupCloseAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title"><h3>{{bsktItemInfo.itemNm}}</h3></div>
      <div class="layer-content">
        <h4 class="coupon-title">
          <span class="inp-chk small">
            <input type="checkbox" name="coupon" id="coupon-item1" v-model="rcmdCpnApplYn" @change="setRcmdCpn">
            <label for="coupon-item1">맞춤 혜택가</label>
          </span>
          <button type="button" aria-label="맞춤 혜택가 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupDiscountActive">
            <span class="hidden">맞춤 혜택가</span>
          </button>
        </h4>
        <div class="scroll-area">
          <div class="inner-box">
            <ul class="coupon-option-list">
              <li>
                <dl class="coupon-type">
                  <dt>할인쿠폰</dt>
                  <dd v-for="(cpnInfo, cpnIdx) in bsktItemInfo.ordsItemCpnPromExpnsInqRsltList" :key="`CPN_INFO_${cpnIdx}`">
                    <p class="inp-radio small">
                      <input type="radio" name="rdoCoupon" :id="`rdoCoupon${cpnIdx}`" :value="cpnInfo" @change="rcmdCpnApplYn = false" v-model="selectCouponInfo">
                      <label :for="`rdoCoupon${cpnIdx}`">
                        <span class="name">{{cpnInfo.promNm}}</span>
                        <span class="date">
                          {{toFormat(cpnInfo.cpnValidDurBeginDttm, 'YYYY.MM.DD')}}~{{toFormat(cpnInfo.cpnValidDurEndDttm, 'YYYY.MM.DD HH:mm')}}까지
                          <span class="discount" v-if="cpnInfo.dcTypeCd === 'R'">{{cpnInfo.beneApplVal | currency}}%</span>
                          <span class="discount" v-if="cpnInfo.dcTypeCd === 'R'">최대 {{cpnInfo.maxDcAmt | currency}}원</span>
                        </span>
                      </label>
                      <span class="price"><strong>{{cpnInfo.dcAmt | currency}}</strong>원</span>
                    </p>
                    <p class="current" v-if="checkApplCpn(cpnInfo)">다른 상품에 {{checkApplCpn(cpnInfo).dcAmt | currency}}원 쿠폰 적용 중</p>
                  </dd>
                  <dd>
                    <span class="inp-radio small">
                      <input type="radio" name="rdoCoupon" id="rdoCouponEmpty" :value="undefined" v-model="selectCouponInfo" @change="rcmdCpnApplYn = false">
                      <label for="rdoCouponEmpty">적용 안함</label>
                    </span>
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg black"  @click="useCpn">총 {{selectCouponInfo != null ? selectCouponInfo.dcAmt : 0 | currency}}원 할인 받기</button>
      </div>
      <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기">
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
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
export default {
  name: "PopupCouponList",
  props: {
    bsktItemInfo: Object,
    applItemCpnList: Array,
    maxBnftYn: Boolean,
  },
  data() {
    return {
      popup: { // 팝업
        open: false,
        popupCouponBenefit: false,
      },
      rcmdCpnApplYn: false,
      selectCouponInfo: undefined,
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  filters: {
    currency: function(val) {
      return NumberUtils.toComma(val);
    },
  },
  methods: {
    toFormat(x, y) {
      return DateUtils.format(x, y);
    },
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
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
    popupCloseAction() {
      this.$emit('popupEvent', 'popupCouponList');
      this.modalActiveEvent('popupCouponList');
    },
    // 쿠폰이 다른 상품에 적용중인지 체크.
    checkApplCpn(cpnInfo) {
      return this.applItemCpnList.find(
        applCpn => cpnInfo &&
                    applCpn.bsktId !== this.bsktItemInfo.bsktId &&
                    applCpn.cmmMbrNo === cpnInfo.cmmMbrNo &&
                    applCpn.promId === cpnInfo.promId &&
                    applCpn.cpnIsseSeqno === cpnInfo.cpnIsseSeqno
      );
    },
    // 맞춤 혜택가 적용 시 처리 함수.
    setRcmdCpn() {
      if (this.rcmdCpnApplYn) {
        this.selectCouponInfo = this.bsktItemInfo.ordsItemCpnPromExpnsInqRsltList.find(cpnInfo => !this.checkApplCpn(cpnInfo));
      } else {
        this.selectCouponInfo = undefined;
      }
    },
    // 변경된 쿠폰 적용 시 처리 함수.
    async useCpn() {
      // 선택된 쿠폰이 다른상품에 사용 중인지 체크
      const applCpn = this.checkApplCpn(this.selectCouponInfo);
      if (applCpn) {
        const strMsg = `해당 쿠폰은 다른 상품에 이미 적용중입니다.<br/>
                      이 상품에 적용하시겠습니까?<br/><br/>
                      [기존 적용 상품]<br/>
                      ${applCpn.itemNm} ${NumberUtils.toComma(applCpn.dcAmt)}원`;
        const confirmFlag = await this.$gsdialog.confirm(strMsg, {html: true});
        if (!confirmFlag) return;
      }
      this.$emit('useCpn', this.selectCouponInfo, this.rcmdCpnApplYn);
      this.popupCloseAction();
    },
    // 상품쿠폰목록 조회
    getItemCouponList() {
      if (this.bsktItemInfo.ordsItemCpnPromExpnsInqRsltList !== null && Object.entries(this.bsktItemInfo.ordsItemCpnPromExpnsInqRsltList).length > 0) {
        // 이미 적용된 쿠폰정보를 검색
        this.selectCouponInfo = this.bsktItemInfo.ordsItemCpnPromExpnsInqRsltList.find(cpnInfo => cpnInfo.applYn);
        // 적용된 쿠폰이 맞춤 혜택가로 적용됐는지 여부 체크
        const applItemCpn = this.applItemCpnList.find(
          cpnInfo => cpnInfo.bsktId === this.bsktItemInfo.bsktId &&
                      cpnInfo.cmmMbrNo === this.selectCouponInfo.cmmMbrNo &&
                      cpnInfo.promId === this.selectCouponInfo.promId &&
                      cpnInfo.cpnIsseSeqno === this.selectCouponInfo.cpnIsseSeqno
        );
        if (applItemCpn) {
          this.rcmdCpnApplYn = applItemCpn.maxBeneYn;
        } else {
          this.rcmdCpnApplYn = this.maxBnftYn;
        }
      }
    }
  },
  mounted() {
    this.modalActiveEvent('popupCouponList');
    // 상품쿠폰목록 조회
    this.getItemCouponList();
  },
};
</script>
