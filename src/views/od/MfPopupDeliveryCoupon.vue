<!--
views/pa/SC-FO-PA-MF-MP-008
-->
<template>
  <div id="popupDeliveryCoupon" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupDeliveryCoupon}">
    <div class="header-popup">
      <strong>배송비/장바구니 쿠폰</strong>
    </div>
    <div class="full-popup-body scroll-area has-fixed-bottom">
      <div class="full-popup-inner">
        <section class="dash-area">
            <div class="sub-title">
              <h3>배송비 쿠폰 (<strong class="point">{{getDlfeeCpnCnt()}}</strong>)</h3>
            </div>
            <dl class="coupon-list-option" v-for="(ordsDlfee, idx) in (!!mfOrdsDlfeeCpnTypeGrpInfoList ? mfOrdsDlfeeCpnTypeGrpInfoList : [])" :key="`ORDS_DLFEE_${idx}`">
              <dt>
                <span class="coupon_goods point" v-if="ordsDlfee.bsktItemDlfeeCnt <= 0">{{ordsDlfee.itemNm}}</span>
                <span class="coupon_goods point" v-else>{{ordsDlfee.itemNm}} 외 <strong>{{ordsDlfee.bsktItemDlfeeCnt}}</strong>개</span>
                <span class="price">{{getDlfeeCpnApplAmt(ordsDlfee) | currency}}원</span>
              </dt>
              <dd v-if="(ordsDlfee.ordsDlfeeCpnInfoList ? ordsDlfee.ordsDlfeeCpnInfoList : []).length > 0">
                <MfSelecCustomUI :refSelectUIId="`dlfeeCpn${idx}`" :selectCustomUI="selectCustomUI" :cpnInfoList="ordsDlfee.ordsDlfeeCpnInfoList" :selectCpnInfo="getDlfeeCpnApplInfo(ordsDlfee)" @changeEvent="changeSelectAction" />
              </dd>
              <dd v-else>
                <p class="no-list">사용할 수 있는 쿠폰이 없습니다.</p>
              </dd>
            </dl>
            <dl class="coupon-list-option" v-if="(!!mfOrdsDlfeeCpnTypeGrpInfoList ? mfOrdsDlfeeCpnTypeGrpInfoList : []).length === 0">
              <dt></dt>
              <dd><p class="no-list">사용할 수 있는 쿠폰이 없습니다.</p></dd>
            </dl>
        </section>
        <section class="dash-area">
            <div class="sub-title flex">
              <h3>장바구니 쿠폰 (<strong class="point">{{(!!usePosbBsktCpnList.mfOrdsBsktCpnInfoList ? usePosbBsktCpnList.mfOrdsBsktCpnInfoList : []).length}}</strong>)</h3>
              <span class="price">{{applBsktCpnInfo.dcAmt || 0 | currency}}원</span>
            </div>
            <dl class="coupon-list-option">
              <dd v-if="(!!mfOrdsBsktCpnInfoList ? mfOrdsBsktCpnInfoList : []).length > 0">
                <MfSelecCustomUI :refSelectUIId="`bsktCpn`" :selectCustomUI="selectCustomUI" :cpnInfoList="mfOrdsBsktCpnInfoList" :selectCpnInfo="applBsktCpnInfo" @changeEvent="changeSelectAction" />
              </dd>
              <dd v-else>
                <p class="no-list">사용할 수 있는 쿠폰이 없습니다.</p>
              </dd>
            </dl>
        </section>
        <div class="popup-btns-fixed-bottom">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="processOrdsBsktCpnAppl()"><span>선택 적용</span></button>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" >
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import MfSelecCustomUI from '@/components/common/MfSelecCustomUI'; // 셀렉트 레이어
import OrderMsg from '@/components/order/MfOrderMsg'; // 주문 메세지항목

import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
export default {
  name: "PopupDeliveryCoupon",
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '배송비/장바구니 쿠폰 < %s'
  },
  props: {
    usePosbBsktCpnList: Object,
    discountInfo: Object,
    totDlfeeAmt: Number,
  },
  components: {
    MfSelecCustomUI,
  },
  filters: {
    currency: function(val) {
      return NumberUtils.toComma(val);
    },
  },
  data() {
    return {
      mfOrdsBsktCpnInfoList: [], // 사용 가능한 장바구니 쿠폰 목록 정보
      mfOrdsDlfeeCpnTypeGrpInfoList: [], // 사용 가능한 배송비 쿠폰 목록 정보
      applDlfeeCpnInfoList: [], // 적용 중인 배송비 쿠폰 목록 정보
      applBsktCpnInfo: {}, // 적용 중인 장바구니 쿠폰 정보
      selectCustomUI: {}, // MfSelecCustomUI Components 관리를 위한 변수
    };
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupDeliveryCoupon');
      this.modalActiveEvent('popupDeliveryCoupon');
    },
    async changeSelectAction(refId, cpnInfo) { // 옵션 정렬 변경
      // 적용 장바구니 쿠폰 변경 선택 시 호출
      if (refId === 'bsktCpn') {
        this.applBsktCpnInfo = !!cpnInfo ? cpnInfo : {};
      } else {
        // 1. 다른 배송비 상품에 적용된 쿠폰인지 체크
        let applCpnIdx = -1;
        const applCpn = this.applDlfeeCpnInfoList.find((dlfeeCpn, dlfeeIdx) => {
          if (dlfeeCpn.promId === cpnInfo.promId && dlfeeCpn.cpnIsseSeqno === cpnInfo.cpnIsseSeqno) {
            applCpnIdx = dlfeeIdx;
            return dlfeeCpn;
          }
        });
        if (!!applCpn && cpnInfo.val != '999') {
          const ordsDlfee = this.mfOrdsDlfeeCpnTypeGrpInfoList.find(dlfeeInfo => dlfeeInfo.ordsDelivSeqno === applCpn.ordsDelivSeqno && dlfeeInfo.ordsItemSeqno === applCpn.ordsItemSeqno);
          const ordsItem = ordsDlfee.itemNm + (ordsDlfee.bsktItemDlfeeCnt <= 0 ? '' : ordsDlfee.itemNm + '외 ' + ordsDlfee.bsktItemDlfeeCnt + '개');
          const confirmMsg = `해당 쿠폰은 다른 상품에 이미 적용중입니다. 이 상품에 적용하시겠습니까?</br></br>[기존 적용 상품]</br>${ordsItem}</br>${NumberUtils.toComma(applCpn.dcAmt)}원`;
          const confirmYn = await this.$gsdialog.confirm(confirmMsg, { html: true });
          // 2. 이미 적용된 쿠폰이면 Confirm 확인 후 취소 선택 시 중단.
          if (!confirmYn) return;
        }

        // 3. 진행 선택 시 다른 배송비 상품에 기적용 쿠폰 삭제 처리
        if (applCpnIdx >= 0 && cpnInfo.val != '999') {
          this.applDlfeeCpnInfoList.splice(applCpnIdx, 1);
        }

        // 4. 배송비 상품에 기적용 중인 쿠폰은 삭제 처리
        if ((!!this.applDlfeeCpnInfoList ? this.applDlfeeCpnInfoList : []).length > 0) {
          for (let applIdx = this.applDlfeeCpnInfoList.length - 1; applIdx >= 0; applIdx--) {
            if (this.applDlfeeCpnInfoList[applIdx].ordsDelivSeqno === cpnInfo.ordsDelivSeqno && this.applDlfeeCpnInfoList[applIdx].ordsItemSeqno === cpnInfo.ordsItemSeqno) {
              this.applDlfeeCpnInfoList.splice(applIdx, 1);
            }
          }
        }
        // 5. 진행 선택 시 다른 배송비 상품에 기적용 쿠폰 삭제 및 등록 처리
        this.applDlfeeCpnInfoList.push(cpnInfo);
      }
    },
    // 상품 배송비 쿠폰 보유 수량을 리턴하는 함수
    getDlfeeCpnCnt() {
      let cpnCnt = 0;
      if (!!this.usePosbBsktCpnList.mfOrdsDlfeeCpnTypeGrpInfoList) {
        this.usePosbBsktCpnList.mfOrdsDlfeeCpnTypeGrpInfoList.forEach(dlfeeInfo => cpnCnt += dlfeeInfo.ordsDlfeeCpnInfoList.length);
      }
      return cpnCnt;
    },
    getDlfeeCpnApplInfo(ordsDlfee) {
      // 선택 적용중인 쿠폰목록 정보 Set
      if ((!!this.applDlfeeCpnInfoList ? this.applDlfeeCpnInfoList : []).length > 0) { // 선택 적용중인 쿠폰이 존재하면.
        return this.applDlfeeCpnInfoList.find(cpnInfo => cpnInfo.ordsDelivSeqno === ordsDlfee.ordsDelivSeqno && cpnInfo.ordsItemSeqno === ordsDlfee.ordsItemSeqno);
      }
      return null;
    },
    // 적용 중인 배송비 쿠폰의 적용금액을 구하는 함수
    getDlfeeCpnApplAmt(ordsDlfee) {
      const cpnInfo = this.getDlfeeCpnApplInfo(ordsDlfee);
      return !!cpnInfo ? cpnInfo.dcAmt : 0;
    },
    // 변경된 쿠폰정보를 적용처리하는 함수
    async processOrdsBsktCpnAppl() {
      const iOrdsBsktCpnApplProc = [];
      // 적용된 배송비 쿠폰 정보 Set
      if (!!this.applDlfeeCpnInfoList) {
        this.applDlfeeCpnInfoList.forEach(applCpn => {
          iOrdsBsktCpnApplProc.push({
            ordId: this.usePosbBsktCpnList.ordId,
            ordsDelivSeqno: applCpn.ordsDelivSeqno,
            ordsItemSeqno: applCpn.ordsItemSeqno,
            selectedDlfeeIdx: applCpn.val,
            ordsOptDlfeeCpnInfo: applCpn,
          });
        });
      }
      // 적용된 장바구니 쿠폰 정보 Set
      iOrdsBsktCpnApplProc.push({
        ordId: this.usePosbBsktCpnList.ordId,
        ordsDelivSeqno: 0,
        ordsItemSeqno: 0,
        selectedBsktIdx: this.applBsktCpnInfo.val,
        ordsBsktCpnInfo: this.applBsktCpnInfo,
        promId: this.applBsktCpnInfo.promId,
        cpnIsseSeqno: this.applBsktCpnInfo.cpnIsseSeqno,
      });

      // 장바구니 할인 쿠폰 적용 가능 여부 체크 ( * 배송비 할인 쿠폰은 이미 조회 할 당시 체크 후 사용가능 쿠폰 목록을 조회 하기 때문에 체크하지 않음.)
      const bsktDcAmtSum = this.applBsktCpnInfo.dcAmt || 0;
      const applBsktAmt = this.discountInfo.bsktCpnDcAmt;
      const curTotAmt = this.discountInfo.curTotAmt;
      // ((총결제금액 - 총배송비금액) + ((적용장바구니할인금액 - 장바구니할인금액합))) < 0
      if (((curTotAmt - this.totDlfeeAmt) + (applBsktAmt - bsktDcAmtSum)) < 0) {
        this.$gsdialog.alert(OrderMsg.bsktCpnPayMore);
        return;
      }

      // 배송비/장바구니쿠폰 적용
      if (iOrdsBsktCpnApplProc.length > 0) {
        const response = await ApiUtils.put('/fo/od/mf/ordsmgnt/basket-coupon', iOrdsBsktCpnApplProc);
      }
      this.$emit('bsktCpnChangeEvent');
      this.$emit('popupEvent', 'popupDeliveryCoupon');
    },
    // 적용 중인 쿠폰 정보 초기화 처리 함수
    initApplCpnInfo() {
      // 사용가능 쿠폰 정보 Set
      this.mfOrdsBsktCpnInfoList = JSON.parse(JSON.stringify(this.usePosbBsktCpnList.mfOrdsBsktCpnInfoList));
      this.mfOrdsDlfeeCpnTypeGrpInfoList = JSON.parse(JSON.stringify(this.usePosbBsktCpnList.mfOrdsDlfeeCpnTypeGrpInfoList));

      // 적용 중인 배송비 쿠폰 목록을 재배포 및 초기화
      this.mfOrdsDlfeeCpnTypeGrpInfoList.forEach((dlfeeInfo, dlfeeIdx) => {
        // 적용 중인 배송비쿠폰 정보 검색 및 DeepCopy
        let applCpn = this.usePosbBsktCpnList.mfOrdsOptDlfeeCpnInfoList.find((cpnInfo, cpnIdx) => {
          if (cpnInfo.ordsDelivSeqno === dlfeeInfo.ordsDelivSeqno && cpnInfo.ordsItemSeqno === dlfeeInfo.ordsItemSeqno) {
            cpnInfo.val = cpnIdx;
            return cpnInfo;
          }
        });
        if (!applCpn) {
          // 적용 중인 배송비쿠폰이 존재하지 않으면 배송비 부과 상품에 사용 가능한 쿠폰(할인금액이 가장 큰)을 적용한다.
          dlfeeInfo.ordsDlfeeCpnInfoList.every((cpnInfo, cpnIdx) => {
            // 다른 배송비 부과 상품에 적용 중인 쿠폰이 존재 하지 않으면 해당 쿠폰을 applDlfeeCpnInfoList에 등록.
            if (!this.applDlfeeCpnInfoList.find((applCpn, applCpnIdx) => applCpn.promId === cpnInfo.promId && applCpn.cpnIsseSeqno === cpnInfo.cpnIsseSeqno)) {
              cpnInfo.val = cpnIdx;
              applCpn = cpnInfo;
              return false;
            } else {
              return true;
            }
          });
        }
        if (!!applCpn) {
          // 검색된 쿠폰 정보를 applDlfeeCpnInfoList에 재배포 등록처리.
          this.applDlfeeCpnInfoList.push(JSON.parse(JSON.stringify(applCpn)));
          applCpn = null;
        }
        // 적용쿠폰이 존재 하면 등록처리
      });

      // 적용 중인 장바구니 쿠폰 정보를 재배포 및 초기화
      let applBsktCpn = this.mfOrdsBsktCpnInfoList.find((cpnInfo, cpnIdx) => {
        if (cpnInfo.promId === this.usePosbBsktCpnList.bsktCpnPromId && cpnInfo.cpnIsseSeqno === this.usePosbBsktCpnList.bsktCpnIsseSeqno) {
          cpnInfo.val = cpnIdx;
          return cpnInfo;
        }
      });
      if (!applBsktCpn) {
        this.mfOrdsBsktCpnInfoList.every((cpnInfo, cpnIdx) => {
          // 다른 배송비 부과 상품에 적용 중인 쿠폰이 존재 하지 않으면 해당 쿠폰을 applBsktCpnInfo에 등록.
          if (!this.applBsktCpnInfo || !(this.applBsktCpnInfo.promId === cpnInfo.promId && this.applBsktCpnInfo.cpnIsseSeqno === cpnInfo.cpnIsseSeqno)) {
            cpnInfo.val = cpnIdx;
            applBsktCpn = cpnInfo;
            return false;
          }
        });
      }
      this.applBsktCpnInfo = !!applBsktCpn ? JSON.parse(JSON.stringify(applBsktCpn)) : {};
    }
  },
  mounted() {
    this.modalActiveEvent('popupDeliveryCoupon');
    // 적용 중인 쿠폰 정보 초기화 처리 함수
    this.initApplCpnInfo();
  }
};
</script>
