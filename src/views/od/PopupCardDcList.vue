<!--
views/od/SC-FO-PA-GS-MP-010
-->
<template>
  <!-- START : 카드즉시할인 레이어 -->
  <div id="popupCardDcList" class="wrap-layer option-list-layer" role="dialog" aria-labelledby="popupCardDcList" aria-modal="true" :class="[{active : this.modalActive.popupCardDcList}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title"><h3>카드즉시할인</h3></div>
      <div class="layer-content">
        <div class="inner-box scroll-area">
          <ul class="option-list">
            <li>
              <span class="inp-radio small">
                <input type="radio" name="crcoCd" id="option-card" value="" @click="setCardDisCount(null)">
                <label for="option-card">카드선택 없음 </label>
              </span>
            </li>
            <li v-for="(cardDiscountProm, idx) in cardDiscountPromList" v-bind:key="cardDiscountProm.pytcCrcoCd + cardDiscountProm.cardBuyCoCd + cardDiscountProm.popYn">
              <span class="inp-radio small">
                <input type="radio" name="crcoCd" :checked="choiceDcCardFlag === true ? setChkCardDis(cardDiscountProm, idx) : false" v-bind:id="'option-card_'+idx" v-bind:value="cardDiscountProm.cardBuyCoCd" @click="setCardDisCount(idx)">
                <label v-if="cardDiscountProm.tdrMeansCd === '02' && cardDiscountProm.crcoCd !== '99'" v-bind:for="'option-card_'+idx">
                  <dl>
                    <dt>{{cardDiscountProm.popYn !== null && cardDiscountProm.popYn === 'Y' ? '[팝제휴] ' : ''}}{{cardDiscountProm.cardNm}} 결제시</dt>
                    <dd v-for="(cardDiscountPromItem, jdx) in cardDiscountProm.ordsPromItemList" v-bind:key="jdx">
                      {{getCardDisItem(cardDiscountPromItem)}}
                    </dd>
                  </dl>
                </label>
                <label v-else v-bind:for="'option-card_'+idx">
                  <dl>
                    <dt>{{cardDiscountProm.popYn !== null && cardDiscountProm.popYn === 'Y' ? '[팝제휴] ' : ''}}{{cardDiscountProm.tdrMeansNm}} 결제시</dt>
                    <dd v-for="(cardDiscountPromItem, jdx) in cardDiscountProm.ordsPromItemList" v-bind:key="jdx">
                      {{getCardDisItem(cardDiscountPromItem)}}
                    </dd>
                  </dl>
                </label>
              </span>
              <!--<span class="txt-point">-{{toComma(cardDiscountProm.evetDcAmt)}}원</span>-->
            </li>
            <!--<li>
              <span class="inp-radio small">
                <input type="radio" name="option" id="option-card3" value="" checked>
                <label for="option-card3">국민카드</label>
              </span>
              <span class="txt-point">-1,000원</span>
            </li>
            <li>
              <span class="inp-radio small">
                <input type="radio" name="option" id="option-card4" value="">
                <label for="option-card4">하나팝카드</label>
              </span>
              <span class="txt-point">-5,000원</span>
            </li>-->
          </ul>
        </div>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg lightgreen"  @click="popupCardDcAction">선택</button>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 카드즉시할인 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
import ApiUtils from '@/common/ApiUtils';
import OdUtils from '@/common/od/OdUtils'; // 주문공통
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    payInfo: Object,
    ordsItemInfoList: Array,
    choiceDcCardFlag: Boolean,
    rtnCardDiscountProm: Object,
    gsNPointDcAmt: Number,
    popRwdDcAmt: Number,
    ordId: String,
  },
  name: "PopupOptionList",
  data() {
    return {
      cardDiscountPromList: null,
      cardDiscountProm: null,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin, OdUtils],
  components: {
  },
  watch: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupCardDcList');
      this.modalActiveEvent('popupCardDcList');
    },
    popupCardDcAction() {
      // console.log(this.payInfo);
      // console.log(this.cardDiscountProm);
      /* if (this.payInfo != null && (this.payInfo.payType == '13' || this.payInfo.crcoInfoInfo !== null)) { // 이미 결제카드를 선택한게 있을경우
        if (this.payInfo.payType == '13') { // 모바일팝 선 선택
          if (this.cardDiscountProm != null && this.cardDiscountProm.crcoCd !== '99') {
            this.$gsdialog.alert(OrderMsg.cardDisNotMatchPay);
            return false;
          }
        } else if (this.payInfo.payType == '02') { // 카드 선 선택
          if (this.cardDiscountProm != null && this.cardDiscountProm.crcoCd !== this.payInfo.crcoInfoInfo.crcoCd) {
            this.$gsdialog.alert(OrderMsg.cardDisNotMatchPay);
            return false;
          }
        } else if (this.payInfo.payType !== '13' || this.payInfo.payType !== '02') {
          this.$gsdialog.alert(OrderMsg.cardDisNotMatchType);
          return false;
        }
      } */
      this.$emit('setCardDisEvent', this.cardDiscountProm);
      this.$emit('popupEvent', 'popupCardDcList');
      this.modalActiveEvent('popupCardDcList');
    },
    setChkCardDis(cardDiscountProm, idx) {
      let result = false;
      if (this.rtnCardDiscountProm != null) {
        if (this.rtnCardDiscountProm.cardBuyCoCd === cardDiscountProm.cardBuyCoCd &&
        this.rtnCardDiscountProm.pytcCrcoCd == cardDiscountProm.pytcCrcoCd &&
        this.rtnCardDiscountProm.tdrMeansCd == cardDiscountProm.tdrMeansCd &&
        this.rtnCardDiscountProm.promId == cardDiscountProm.promId &&
        this.rtnCardDiscountProm.popYn == cardDiscountProm.popYn) {
          this.setCardDisCount(idx);
          result = true;
        } else {
          result = false;
        }
      } else {
        result = false;
      }
      return result;
    },
    getCardDisItem(cardDiscountPromItem) {
      let itemString = '';
      const item = cardDiscountPromItem;
      itemString += item.itemNm + ' ';
      if (item.dcTypeCd === 'R') { // 정률
        itemString += item.dcApplVal + '% 할인';
      } else { // 정액
        itemString += item.dcApplVal + '원 할인';
      }
      return itemString;
    },
    setCardDisCount(idx) {
      if (idx !== null) {
        this.cardDiscountProm = this.cardDiscountPromList[idx];
      } else {
        this.cardDiscountProm = null;
      }
    },
    // 카드사행사(카드사할인혜택)목록 조회 및 재선택
    async retrievelistTrdMeansDcCard() {
      let deviceType = '01';
      if (this.isMobile()) {
        deviceType = '02';
        if (this.isGsApp()) {
          deviceType = '03';
        } else if (this.isDaliApp()) {
          deviceType = '04';
        }
      } else {
        deviceType = '01';
      }
      // console.log(this.payInfo);
      const param = {
        deviceType: deviceType,
        ordsItemInfoList: this.ordsItemInfoList,
        pytcCd: this.payInfo.pytcCd, // 결제사코드
        pytcNm: this.payInfo.pytcNm, // 결제사명
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/prom-card-list', {
          ordId: this.ordId,
          pytcCd: this.payInfo.pytcCd,
      });
      // const response = await ApiUtils.post('/fo/od/ordsmgnt/card-company-event-list', param);
      if ((response.data.data && response.data.data.length || 0) > 0) {
        this.cardDiscountPromList = response.data.data; // 카드사할인혜택정보목록
        /*
        if (this.gsNPointDcAmt > 0 || this.popRwdDcAmt > 0) {
          for (let i=0; i < this.cardDiscountPromList.length; i++) {
            if ((this.cardDiscountPromList[i].crcoCd === this.cardDiscountPromList[i].cardBuyCoCd) || // 카드 와 매입사가 동일하면 포인트 사용 불가 <카드할인정책>
            (this.cardDiscountPromList[i].tdrMeansCd === '13' && this.cardDiscountPromList[i].crcoCd !== '99') || // 팝제휴 카드의경우 포인트 사용 불가 <카드할인정책>
            (this.cardDiscountPromList[i].cardBuyCoCd === '10' || this.cardDiscountPromList[i].cardBuyCoCd === '02') // 우리카드 국민카드의경우 포인트 사용 불가 <카드할인정책>
            ) {
              this.cardDiscountPromList.splice(i, 1);
              i--;
            }
          }
        }
        */
      }
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    }
  },
  mounted() {
    this.retrievelistTrdMeansDcCard();
    this.modalActiveEvent('popupCardDcList');
  },
};
</script>
