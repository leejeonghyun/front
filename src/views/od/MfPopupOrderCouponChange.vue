<!--
views/od/SC-FO-OD-MF-MP-004
-->
<template>
  <div>
    <!-- START : 쿠폰변경 레이어 -->
    <div id="popupOrderCouponList" class="wrap-layer coupon-list-layer" role="dialog" aria-labelledby="popupOrderCouponList" aria-modal="true" :class="{active : this.modalActive.popupOrderCouponList}">
      <div class="layer-bg" @click="popupCloseAction"></div>
      <div class="layer-bottom-fixed">
        <div class="title"><h3>{{ordsItemInfo.itemNm}}</h3></div>
        <div class="layer-content">
          <h4 class="coupon-title">
            <span class="inp-chk small">
              <input type="checkbox" name="coupon" id="coupon-item1" v-model="ordsItemInfo.maxBeneYn" @change="maxBeneCpn">
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
                    <dd v-for="(cpnInfo, cpnIdx) in usePosbItemCpnList.ordsItemCpnInfoList" :key="`CPN_INFO_${cpnIdx}`">
                      <p class="inp-radio small">
                        <input type="radio" name="rdoCoupon" :id="`rdoCoupon${cpnIdx}`" :value="cpnInfo" @change="changeCpn" v-model="selectCouponInfo">
                        <label :for="`rdoCoupon${cpnIdx}`">
                          <span class="name">{{cpnInfo.cpnNm}}</span>
                          <span class="date">
                            {{toFormat(cpnInfo.cpnValidDurBeginDttm, 'YYYY.MM.DD')}}~{{toFormat(cpnInfo.cpnValidDurEndDttm, 'YYYY.MM.DD HH:mm')}}까지
                            <span class="discount" v-if="cpnInfo.dcTypeCd === 'R'">{{cpnInfo.dcApplVal | currency}}%</span>
                            <span class="discount" v-if="cpnInfo.dcTypeCd === 'R'">최대 {{cpnInfo.maxDcAmt | currency}}원</span>
                          </span>
                        </label>
                        <span class="price"><strong>{{cpnInfo.dcAmt | currency}}</strong>원</span>
                      </p>
                      <p class="current" v-if="cpnInfo.otherItemOptYn === 'Y'">다른 상품에 {{cpnInfo.otherItemDcAmt | currency}}원 쿠폰 적용 중</p>
                    </dd>
                    <dd>
                      <span class="inp-radio small">
                        <input type="radio" name="rdoCoupon" id="rdoCouponEmpty" :value="null" v-model="selectCouponInfo" @change="changeCpn">
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
          <button type="button" class="btn-lg btn-bg lightgreen"  @click="useItemCpn">총 {{usePosbItemCpnList != null ? usePosbItemCpnList.totDcAmt : 0 | currency}}원 할인 받기</button>
        </div>
        <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기">
          <span class="hidden">닫기</span>
        </button>
      </div>
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
import AccordionMixin from '@/mixins/AccordionMixin';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: "PopupOrderCouponList",
  props: {
    ordsItemInfo: Object,
    ordsItemList: Object,
  },
  data() {
    return {
      popup: { // 팝업
        open: false,
        popupCouponBenefit: false,
      },
      rcmdCpnApplYn: false,
      selectCouponInfo: null,
      usePosbItemCpnList: {},
    };
  },
  mixins: [LayerPopupMixin, AccordionMixin],
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
      this.$emit('popupEvent', 'popupOrderCouponList');
      this.modalActiveEvent('popupOrderCouponList');
    },
    // 맞춤 혜택가 적용 시 처리 함수.
    maxBeneCpn() {
      // 맞춤 혜택가는 다른 상품에 적용되지 않은 쿠폰을 대상으로 가장 할인금액이 높은 쿠폰을 자동선택
      if (this.ordsItemInfo.maxBeneYn) {
        this.maxBeneItemCpn();
      } else {
        this.selectCouponInfo = null;
      }
      this.retrievelistOrdsUsePosbItemCpnCalc();
    },
    // 맞춤 혜택가 상품쿠폰 처리 함수
    maxBeneItemCpn() {
      if (this.usePosbItemCpnList.ordsItemCpnInfoList != null) {
        this.selectCouponInfo = this.usePosbItemCpnList.ordsItemCpnInfoList.find(cpnInfo => cpnInfo.otherItemOptYn === 'N');
      }
    },
    // 변경된 쿠폰 적용 시 처리 함수.
    async useItemCpn() {
      // 선택된 쿠폰이 다른상품에 사용 중인지 체크
      if (!!this.selectCouponInfo && this.selectCouponInfo.otherItemOptYn === "Y") {
        let applCpn = {};
        this.ordsItemList.ordsDelivSupplGrpInfoList.forEach(supplInfo => {
          supplInfo.ordsDlfeeGrpInfoList.forEach(dlfeeInfo => {
            dlfeeInfo.ordsItemInfoList.forEach(itemInfo => {
              if (itemInfo.itemCpnPromId === this.selectCouponInfo.promId && itemInfo.itemCpnIsseSeqno === this.selectCouponInfo.cpnIsseSeqno) {
                applCpn = itemInfo;
              }
            });
          });
        });
        const strMsg = `해당 쿠폰은 다른 상품에 이미 적용중입니다.<br/>
                      이 상품에 적용하시겠습니까?<br/><br/>
                      [기존 적용 상품]<br/>
                      ${applCpn.itemNm} ${NumberUtils.toComma(applCpn.itemCpnDcAmt)}원`;
        const confirmFlag = await this.$gsdialog.confirm(strMsg, {html: true});
        if (!confirmFlag) return;
      }
      const iOrdsItemCpnApplProc = {
        ordId: this.ordsItemInfo.ordId,
        ordsItemSeqno: this.ordsItemInfo.ordsItemSeqno,
        itemCpnPromId: !!this.selectCouponInfo ? this.selectCouponInfo.promId : null,
        itemCpnIsseSeqno: !!this.selectCouponInfo ? this.selectCouponInfo.cpnIsseSeqno : null
      };
      const response = await ApiUtils.put('/fo/od/mf/ordsmgnt/product-coupon', iOrdsItemCpnApplProc);
      this.$emit('productCouponChangeEvent');
      this.$emit('popupEvent', 'popupOrderCouponList');
    },
    // 상품쿠폰을 변경 및 선택 시 처리 함수
    changeCpn() {
      this.ordsItemInfo.maxBeneYn = false;
      this.retrievelistOrdsUsePosbItemCpnCalc();
    },
    // 상품쿠폰목록 조회
    async getItemCouponList() {
      const iOrdsUsePosbItemCpnListInq = {
        ordId: this.ordsItemInfo.ordId,
        ordsItemSeqno: this.ordsItemInfo.ordsItemSeqno,
      };
      const response = await ApiUtils.get('/fo/od/mf/ordsmgnt/product-coupon-list', iOrdsUsePosbItemCpnListInq);
      this.usePosbItemCpnList = response.data.data;
      // 기 선택된 쿠폰이 존재할 경우 해당 쿠폰으로 자동선택
      if (this.usePosbItemCpnList != null) {
        if (!StringUtils.isEmpty(this.usePosbItemCpnList.itemCpnPromId)) {
          this.selectCouponInfo = this.usePosbItemCpnList.ordsItemCpnInfoList.find(cpnInfo => cpnInfo.promId === this.usePosbItemCpnList.itemCpnPromId && cpnInfo.cpnIsseSeqno === this.usePosbItemCpnList.itemCpnIsseSeqno);
        } else {
          this.maxBeneItemCpn();
        }
        // 기 선택된 쿠폰이 모두 없거나 기 선택된 쿠폰이 최대할인일 경우 '맞춤 혜택가'로 체크
        if (StringUtils.isEmpty(this.usePosbItemCpnList.itemCpnPromId)) {
          this.ordsItemInfo.maxBeneYn = true;
        }
      }
      this.retrievelistOrdsUsePosbItemCpnCalc();
    },
    // 주문서사용가능상품쿠폰계산목록조회
    async retrievelistOrdsUsePosbItemCpnCalc() {
      const iOrdsUsePosbItemCpnCalListInq = {
        ordId: this.ordsItemInfo.ordId,
        ordsItemSeqno: this.ordsItemInfo.ordsItemSeqno,
        itemCpnPromId: !!this.selectCouponInfo ? this.selectCouponInfo.promId : null,
        itemCpnIsseSeqno: !!this.selectCouponInfo ? this.selectCouponInfo.cpnIsseSeqno : null
      };
      const response = await ApiUtils.post('/fo/od/mf/ordsmgnt/product-coupon-list', iOrdsUsePosbItemCpnCalListInq);
      this.usePosbItemCpnList = response.data.data;
      if (!!this.selectCouponInfo) {
        this.selectCouponInfo = this.usePosbItemCpnList.ordsItemCpnInfoList.find(cpnInfo => cpnInfo.promId === this.selectCouponInfo.promId && cpnInfo.cpnIsseSeqno === this.selectCouponInfo.cpnIsseSeqno);
      }
    },
  },
  mounted() {
    this.modalActiveEvent('popupOrderCouponList');
    // 상품쿠폰목록 조회
    this.getItemCouponList();
  },
};
</script>
