<!--
views/od/SC-FO-OD-GS-MP-016
-->
<template>
  <!-- START : 쿠폰변경 레이어 -->
  <div id="popupOrderCouponList" class="wrap-layer coupon-list-layer" role="dialog" aria-labelledby="popupOrderCouponList" aria-modal="true" :class="[{active : this.modalActive.popupOrderCouponList}, siteClass]">
    <div class="layer-bg" @click="popupCloseAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title"><h3>{{ordsItemInfo.itemNm}}</h3></div>
      <div class="layer-content">
        <h4 class="coupon-title" v-if="(usePosbItemCpnList ? usePosbItemCpnList.ordsItemCpnInfoList ? usePosbItemCpnList.ordsItemCpnInfoList :[] : []).length > 0">
          <span class="inp-chk small">
            <input type="checkbox" name="maxBeneYn" id="max-bene-yn" value="Y" v-model="ordsItemInfo.maxBeneYn" @change="maxBeneCpn">
            <label for="max-bene-yn">맞춤 혜택가</label>
          </span>
          <button type="button" aria-label="맞춤 혜택가 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupDiscountActive">
            <span class="hidden">맞춤 혜택가</span>
          </button>
        </h4>
        <h4 class="coupon-title" v-else>
          <span>사용할 수 있는 쿠폰이 없습니다.</span>
        </h4>
        <div class="scroll-area">
          <div class="inner-box">
            <ul class="coupon-option-list">
              <li v-if="(usePosbItemCpnList ? usePosbItemCpnList.ordsItemCpnInfoList ? usePosbItemCpnList.ordsItemCpnInfoList :[] : []).length > 0">
                <dl class="coupon-type">
                  <dt>할인쿠폰</dt>
                  <dd v-for="(cpn, idx) in usePosbItemCpnList ? usePosbItemCpnList.ordsItemCpnInfoList ? usePosbItemCpnList.ordsItemCpnInfoList :[] : []" :key="idx">
                    <p class="inp-radio small">
                      <input type="radio" name="optItemCpn" :id="`${'opt-item-cpn' + idx}`" :value="`${cpn.promId + ':' + cpn.cpnIsseSeqno}`" v-model="optItemCpn" @change="changeCpn">
                      <label :for="`${'opt-item-cpn' + idx}`">
                        <span class="name">{{cpn.cpnNm}} <span class="" v-if="'R' === cpn.dcTypeCd && cpn.maxDcAmt > 0 && cpn.maxDcAmt < 99999999">최대 {{comma(cpn.maxDcAmt)}}원</span></span>
                        <span class="date">{{format(cpn.cpnValidDurBeginDttm, 'YYYY.MM.DD')}}~{{format(cpn.cpnValidDurEndDttm, 'YYYY.MM.DD HH:mm')}}까지</span><!-- 수정 : 2020.02.17 날짜 표기 방식 변경 -->
                      </label>
                      <span class="price"><strong>{{comma(cpn.dcAmt)}}</strong>원</span>
                    </p>
                    <p class="current" v-if="'Y' === cpn.otherItemOptYn">다른 상품에 {{comma(cpn.otherItemDcAmt)}}원 쿠폰 적용 중</p>
                  </dd>
                  <dd>
                    <span class="inp-radio small">
                      <input type="radio" name="optItemCpn" id="opt-item-cpn" value=":" v-model="optItemCpn" @change="changeCpn">
                      <label for="opt-item-cpn">적용 안함</label>
                    </span>
                  </dd>
                </dl>
              </li>
              <li v-if="(usePosbItemCpnList ? usePosbItemCpnList.ordsDblDcCpnInfoList ? usePosbItemCpnList.ordsDblDcCpnInfoList :[] : []).length > 0">
                <dl class="coupon-type">
                  <dt>더블할인쿠폰</dt>
                  <dd v-for="(cpn, idx) in usePosbItemCpnList ? usePosbItemCpnList.ordsDblDcCpnInfoList ? usePosbItemCpnList.ordsDblDcCpnInfoList :[] : []" :key="idx">
                    <p class="inp-radio small">
                      <input type="radio" name="optDblDcCpn" :id="`${'opt-dbl-dc-cpn' + idx}`" :value="`${cpn.promId + ':' + cpn.cpnIsseSeqno}`" v-model="optDblDcCpn" @change="changeCpn">
                      <label :for="`${'opt-dbl-dc-cpn' + idx}`">
                        <span class="name">{{cpn.cpnNm}} <span class="" v-if="'R' === cpn.dcTypeCd && cpn.maxDcAmt > 0 && cpn.maxDcAmt < 99999999">최대 {{comma(cpn.maxDcAmt)}}원</span></span>
                        <span class="date">{{format(cpn.cpnValidDurBeginDttm, 'YYYY.MM.DD')}}~{{format(cpn.cpnValidDurEndDttm, 'YYYY.MM.DD HH:mm')}}까지</span><!-- 수정 : 2020.02.17 날짜 표기 방식 변경 -->
                      </label>
                      <span class="price"><strong>{{comma(cpn.dcAmt)}}</strong>원</span>
                    </p>
                    <p class="current" v-if="'Y' === cpn.otherItemOptYn">다른 상품에 {{comma(cpn.otherItemDcAmt)}}원 쿠폰 적용 중</p>
                  </dd>
                  <dd>
                    <span class="inp-radio small">
                      <input type="radio" name="optDblDcCpn" id="opt-dbl-dc-cpn" value=":" v-model="optDblDcCpn" @change="changeCpn">
                      <label for="opt-dbl-dc-cpn">적용 안함</label>
                    </span>
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg lightgreen" aria-haspopup="dialog" :disabled="isSendForm" @click="itemCpnAppl">총 {{comma(usePosbItemCpnList.totDcAmt)}}원 할인 받기</button>
        <PopupOrderCouponSchedAmt @popupEvent="popupAction" @processOrdsItemCpnAppl="processOrdsItemCpnAppl" v-if="this.popup.popupOrderCouponSchedAmt" /> <!-- 팝업 - 주문예정금액 변동안내 -->
      </div>
      <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
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
        <button class="btn-layer-close" @click="popupCloseAction2" @keydown.9="tabFocusRemove('popupCloseAction2')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
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
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import PopupOrderCouponSchedAmt from '@/views/od/PopupOrderCouponSchedAmt'; // 팝업 - 주문예정 금액
import CookieUtils from '@/common/CookieUtils';
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
        popupOrderCouponSchedAmt: false,
      },
      usePosbItemCpnList: {},
      optItemCpn: ':',
      optDblDcCpn: ':',
      totDcAmt: 0,
      maxBeneCpnYn: false,
      maxBeneDblCpnYn: false,
      siteClass: CookieUtils.getSiteClass(),
      isSendForm: false,
    };
  },
  mixins: [LayerPopupMixin],
  components: {
    PopupOrderCouponSchedAmt
  },
  computed: {
    isMaxBeneCpn: {
      get: function() {
        return 'Y' === this.ordsItemInfo.maxBeneYn;
      },
      set: function(newVal) {
        this.ordsItemInfo.maxBeneYn = newVal ? 'Y' : 'N';
      }
    }
  },
  methods: {
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupOrderCouponList');
      this.modalActiveEvent('popupOrderCouponList');
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
    // 주문서사용가능상품쿠폰목록조회
    async retrievelistOrdsUsePosbItemCpn() {
      const iOrdsUsePosbItemCpnListInq = {
        ordId: this.ordsItemInfo.ordId,
        ordsItemSeqno: this.ordsItemInfo.ordsItemSeqno,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/product-coupon-list', iOrdsUsePosbItemCpnListInq);
      console.log(response);
      this.usePosbItemCpnList = response.data.data;
      // 기 선택된 쿠폰이 존재할 경우 해당 쿠폰으로 자동선택
      if (this.usePosbItemCpnList != null) {
        if (!StringUtils.isEmpty(this.usePosbItemCpnList.itemCpnPromId)) {
          this.optItemCpn = (this.usePosbItemCpnList.itemCpnPromId ? this.usePosbItemCpnList.itemCpnPromId : '') + ':' + (this.usePosbItemCpnList.itemCpnIsseSeqno ? this.usePosbItemCpnList.itemCpnIsseSeqno : '');
          if (this.usePosbItemCpnList.ordsItemCpnInfoList != null) {
            if (this.usePosbItemCpnList.ordsItemCpnInfoList[0].promId === this.usePosbItemCpnList.itemCpnPromId
              && this.usePosbItemCpnList.ordsItemCpnInfoList[0].cpnIsseSeqno === this.usePosbItemCpnList.itemCpnIsseSeqno) {
                this.maxBeneCpnYn = true;
            }
          }
        } else {
          this.maxBeneItemCpn();
        }
        if (!StringUtils.isEmpty(this.usePosbItemCpnList.dblDcCpnPromId)) {
          this.optDblDcCpn = (this.usePosbItemCpnList.dblDcCpnPromId ? this.usePosbItemCpnList.dblDcCpnPromId : '') + ':' + (this.usePosbItemCpnList.dblDcCpnIsseSeqno ? this.usePosbItemCpnList.dblDcCpnIsseSeqno : '');
          if (this.usePosbItemCpnList.ordsDblDcCpnInfoList != null) {
            if (this.usePosbItemCpnList.ordsDblDcCpnInfoList[0].promId === this.usePosbItemCpnList.dblDcCpnPromId
              && this.usePosbItemCpnList.ordsDblDcCpnInfoList[0].cpnIsseSeqno === this.usePosbItemCpnList.dblDcCpnIsseSeqno) {
                this.maxBeneDblCpnYn = true;
            }
          }
        } else {
          this.maxBeneDblCpn();
        }
        // 기 선택된 쿠폰이 모두 없거나 기 선택된 쿠폰이 최대할인일 경우 '맞춤 혜택가'로 체크
        if (StringUtils.isEmpty(this.usePosbItemCpnList.itemCpnPromId) && StringUtils.isEmpty(this.usePosbItemCpnList.dblDcCpnPromId)) {
          this.ordsItemInfo.maxBeneYn = true;
        } else if (this.maxBeneCpnYn && this.maxBeneDblCpnYn) {
          this.ordsItemInfo.maxBeneYn = true;
        } else {
          this.ordsItemInfo.maxBeneYn = false;
        }
      }
      this.retrievelistOrdsUsePosbItemCpnCalc();
    },
    // 주문서사용가능상품쿠폰목록조회
    async retrievelistOrdsMaxBeneItemCpn() {
      const iOrdsMaxBeneItemCpnListInq = {
        ordId: this.ordsItemInfo.ordId,
        ordsItemSeqno: this.ordsItemInfo.ordsItemSeqno,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/max-benefit-product-coupon', iOrdsMaxBeneItemCpnListInq);
      console.log(response);
      this.usePosbItemCpnList = response.data.data;
      this.optItemCpn = (this.usePosbItemCpnList.itemCpnPromId ? this.usePosbItemCpnList.itemCpnPromId : '') + ':' + (this.usePosbItemCpnList.itemCpnIsseSeqno ? this.usePosbItemCpnList.itemCpnIsseSeqno : '');
      this.optDblDcCpn = (this.usePosbItemCpnList.dblDcCpnPromId ? this.usePosbItemCpnList.dblDcCpnPromId : '') + ':' + (this.usePosbItemCpnList.dblDcCpnIsseSeqno ? this.usePosbItemCpnList.dblDcCpnIsseSeqno : '');
    },
    // 주문서사용가능상품쿠폰계산목록조회
    async retrievelistOrdsUsePosbItemCpnCalc() {
      const iOrdsUsePosbItemCpnCalListInq = {
        ordId: this.ordsItemInfo.ordId,
        ordsItemSeqno: this.ordsItemInfo.ordsItemSeqno,
        itemCpnPromId: (this.optItemCpn.split(':')[0]),
        itemCpnIsseSeqno: (this.optItemCpn.split(':').length > 1 ? this.optItemCpn.split(':')[1] : 0),
        dblDcCpnPromId: (this.optDblDcCpn.split(':')[0]),
        dblDcCpnIsseSeqno: (this.optDblDcCpn.split(':').length > 1 ? this.optDblDcCpn.split(':')[1] : 0),
      };
      const response = await ApiUtils.post('/fo/od/ordsmgnt/product-coupon-list', iOrdsUsePosbItemCpnCalListInq);
      console.log(response);
      this.usePosbItemCpnList = response.data.data;
      // this.optItemCpn = (this.usePosbItemCpnList.itemCpnPromId ? this.usePosbItemCpnList.itemCpnPromId : '') + ':' + (this.usePosbItemCpnList.itemCpnIsseSeqno ? this.usePosbItemCpnList.itemCpnIsseSeqno : '');
      // this.optDblDcCpn = (this.usePosbItemCpnList.dblDcCpnPromId ? this.usePosbItemCpnList.dblDcCpnPromId : '') + ':' + (this.usePosbItemCpnList.dblDcCpnIsseSeqno ? this.usePosbItemCpnList.dblDcCpnIsseSeqno : '');
      this.totDcAmt = this.usePosbItemCpnList.totDcAmt;
    },
    // 주문서상품쿠폰적용처리
    async processOrdsItemCpnAppl() {
      const iOrdsItemCpnApplProc = {
        ordId: this.ordsItemInfo.ordId,
        ordsItemSeqno: this.ordsItemInfo.ordsItemSeqno,
        itemCpnPromId: (this.optItemCpn.split(':')[0]),
        itemCpnIsseSeqno: (this.optItemCpn.split(':').length > 1 ? this.optItemCpn.split(':')[1] : 0),
        dblDcCpnPromId: (this.optDblDcCpn.split(':')[0]),
        dblDcCpnIsseSeqno: (this.optDblDcCpn.split(':').length > 1 ? this.optDblDcCpn.split(':')[1] : 0),
      };
      const response = await ApiUtils.put('/fo/od/ordsmgnt/product-coupon', iOrdsItemCpnApplProc);
      console.log(response);
      this.$emit('productCouponChangeEvent');
      this.$emit('popupEvent', 'popupOrderCouponList');
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    format(date, dateFormat) {
      return DateUtils.format(date, dateFormat);
    },
    changeCpn() {
      this.ordsItemInfo.maxBeneYn = false;
      this.retrievelistOrdsUsePosbItemCpnCalc();
    },
    maxBeneCpn() {
      // 맞춤 혜택가는 다른 상품에 적용되지 않은 쿠폰을 대상으로 가장 할인금액이 높은 쿠폰을 자동선택
      if (this.ordsItemInfo.maxBeneYn) {
        this.maxBeneItemCpn();
        this.maxBeneDblCpn();
        // this.retrievelistOrdsMaxBeneItemCpn();
      } else {
        this.optItemCpn = ':';
        this.optDblDcCpn = ':';
      }
    },
    maxBeneItemCpn() {
      if (this.usePosbItemCpnList.ordsItemCpnInfoList != null) {
        const ordsItemCpnInfoList = this.usePosbItemCpnList.ordsItemCpnInfoList;
        let maxIdx = -1;
        for (let i = 0; i < ordsItemCpnInfoList.length; i++) {
          if (ordsItemCpnInfoList[i].otherItemOptYn === 'N') {
            maxIdx = i;
            break;
          }
        }
        if (maxIdx >= 0) {
          this.optItemCpn = (ordsItemCpnInfoList[maxIdx].promId ? ordsItemCpnInfoList[maxIdx].promId : '') + ':' + (ordsItemCpnInfoList[maxIdx].cpnIsseSeqno ? ordsItemCpnInfoList[maxIdx].cpnIsseSeqno : '');
        }
      }
    },
    maxBeneDblCpn() {
      if (this.usePosbItemCpnList.ordsDblDcCpnInfoList != null) {
        const ordsDblDcCpnInfoList = this.usePosbItemCpnList.ordsDblDcCpnInfoList;
        let maxIdx = -1;
        for (let i = 0; i < ordsDblDcCpnInfoList.length; i++) {
          if (ordsDblDcCpnInfoList[i].otherItemOptYn === 'N') {
            maxIdx = i;
            break;
          }
        }
        if (maxIdx >= 0) {
          this.optDblDcCpn = (ordsDblDcCpnInfoList[maxIdx].promId ? ordsDblDcCpnInfoList[maxIdx].promId : '') + ':' + (ordsDblDcCpnInfoList[maxIdx].cpnIsseSeqno ? ordsDblDcCpnInfoList[maxIdx].cpnIsseSeqno : '');
        }
      }
    },
    itemCpnAppl() {
      this.isSendForm = true;
      this.processOrdsItemCpnAppl();
    },
  },
  created() {
  },
  mounted() {
    this.retrievelistOrdsUsePosbItemCpn();
    // this.optItemCpn = (this.ordsItemInfo.itemCpnPromId ? this.ordsItemInfo.itemCpnPromId : '') + ':' + (this.ordsItemInfo.itemCpnIsseSeqno ? this.ordsItemInfo.itemCpnIsseSeqno : '');
    // this.optDblDcCpn = (this.ordsItemInfo.dblDcCpnPromId ? this.ordsItemInfo.dblDcCpnPromId : '') + ':' + (this.ordsItemInfo.dblDcCpnIsseSeqno ? this.ordsItemInfo.dblDcCpnIsseSeqno : '');
    this.modalActiveEvent('popupOrderCouponList');
  },
};
</script>
