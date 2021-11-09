<template>
  <!-- START : 할인 정보 레이어 -->
  <div id="popupSales" class="wrap-layer description-layer discount-layer" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupSales}">
    <div class="layer-bg" @click="popupAction"></div>
    <div v-if="Object.keys(dcInfo).length > 0" class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3>할인내역</h3>
        </div>
        <div class="layer-content">
          <!-- ########## [S]GS Fresh ########## -->
          <ul v-if="params.cmmSteId == '1'" class="discount-price-list">
            <li>
              판매가 <span class="price"><strong>{{dcInfo.bfrSellAmt | toCurrency}}</strong>원</span>
              <!-- ### 패키지 상품 ### -->
              <ul v-if="dcInfo.itemCompoCd == '02'">
                <li v-if="dcInfo.itemDcrt > 0">행사할인({{dcInfo.itemDcrt}}%) <span class="price"><strong>-{{dcInfo.bfrSellAmt - dcInfo.sellAmt | toCurrency}}</strong>원</span></li>
              </ul>
              <!-- ### 일반상품, 선택형상품 ###-->
              <ul v-if="dcInfo.itemCompoCd != '02'">
                <li v-if="dcInfo.applDcPromDcrt > 0">행사할인({{dcInfo.applDcPromDcrt}}%) <span class="price"><strong>-{{dcInfo.applDcPromAmt | toCurrency}}</strong>원</span></li>
                <li v-if="dcInfo.applCpPromDcrt > 0">
                  <template v-if="dcInfo.cpnDcTypeCd !== 'R'">
                    쿠폰할인({{dcInfo.applCpPromDcrt}}%) <span class="price"><strong>-{{dcInfo.applCpPromAmt | toCurrency}}</strong>원</span>
                  </template>
                  <template v-if="dcInfo.cpnDcTypeCd === 'R'">
                    쿠폰할인({{dcInfo.cpnBeneApplVal}}%) <span class="price"><strong>-{{dcInfo.applCpPromAmt | toCurrency}}</strong>원</span>
                  </template>
                </li>
              </ul>
            </li>
            <li class="total">즉시할인가 <span class="price"><strong>{{dcInfo.sellAmt >= dcInfo.dcAmt ? dcInfo.dcAmt : dcInfo.sellAmt | toCurrency}}</strong>원</span></li>
          </ul>
          <!-- ########## [E]GS Fresh ########## -->
          <!-- ########## [S]달리살다 ########## -->
          <ul v-else-if="params.cmmSteId == '2'" class="discount-price-list">
            <li>
              비회원가<span class="price"><strong>{{dcInfo.normSprc | toCurrency}}</strong>원</span>
              <!-- ### 패키지 상품 ### -->
              <ul v-if="dcInfo.itemCompoCd == '02'">
                <li v-if="dcInfo.itemDcrt > 0">행사할인({{dcInfo.itemDcrt}}%) <span class="price"><strong>-{{dcInfo.normSprc - dcInfo.sellAmt | toCurrency}}</strong>원</span></li>
              </ul>
              <!-- ### 일반상품, 선택형상품 ###-->
              <ul v-if="dcInfo.itemCompoCd != '02'">
                <li v-if="dcInfo.mbsDcrt > 0">달리드림({{dcInfo.mbsDcrt}}%) <span class="price"><strong>-{{dcInfo.normSprc - dcInfo.mbsAmt| toCurrency}}</strong>원</span></li>
                <li v-if="dcInfo.mbsPrcDcrt > 0">
                  <template v-if="dcInfo.prcDcTypeCd === '01'">
                    행사할인({{dcInfo.prcBeneApplVal}}%) <span class="price"><strong>-{{dcInfo.mbsApplDcPromAmt | toCurrency}}</strong>원</span>
                  </template>
                  <template v-else>
                    행사할인({{dcInfo.mbsPrcDcrt}}%) <span class="price"><strong>-{{dcInfo.mbsApplDcPromAmt | toCurrency}}</strong>원</span>
                  </template>
                </li>
                <li v-if="dcInfo.mbsCpDcrt > 0">
                  <template v-if="dcInfo.cpnDcTypeCd !== 'R'">
                    쿠폰할인({{dcInfo.mbsCpDcrt}}%) <span class="price"><strong>-{{dcInfo.mbsApplCpPromAmt | toCurrency}}</strong>원</span>
                  </template>
                  <template v-if="dcInfo.cpnDcTypeCd === 'R'">
                    쿠폰할인({{dcInfo.cpnBeneApplVal}}%) <span class="price"><strong>-{{dcInfo.mbsApplCpPromAmt | toCurrency}}</strong>원</span>
                  </template>
                </li>
              </ul>
            </li>
            <li v-if="dcInfo.itemCompoCd == '02'" class="total">달리드림 최적가<span class="price"><strong>{{dcInfo.sellAmt | toCurrency}}</strong>원</span></li>
            <li v-if="dcInfo.itemCompoCd != '02'" class="total">달리드림 최적가<span class="price"><strong>{{dcInfo.mbsDcAmt | toCurrency}}</strong>원</span></li>
          </ul>
          <!-- ########## [E]달리살다 ########## -->
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction">
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 할인 정보 레이어 -->
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
export default {
  props: {
    dcSateInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  name: "PopupDiscountInfo",
  data() {
    return {
      dcInfo: {},
      params: {
        itemId: this.dcSateInfo.itemId, // 상품ID
        storId: this.dcSateInfo.storId, // 매장ID
        supplFirmCd: this.dcSateInfo.supplFirmCd, // 공급업체코드
        mallId: this.dcSateInfo.mallId, // 몰ID
        ssevntId: this.dcSateInfo.ssevntId, // 기획전ID
        ssevntTimes: this.dcSateInfo.ssevntTimes, // 기획전회차
        cmmSteId: this.dcSateInfo.cmmSteId || '1' // 커머스사이트ID(GS Fresh : 1, 달리살다 : 2)
      }
    };
  },
  mixins: [LayerPopupMixin],
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    }
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupSales');
      this.modalActiveEvent('popupSales');
    },
    // 상품 할인정보 조회
    getDiscountInfo: async function() {
      try {
        const result = await ApiUtils.get('/fo/md/iteminfomgnt/popup-discount-info', this.params);
        if (result.data.data != null) {
          this.dcInfo = result.data.data;
        }
      } catch (e) {
        console.error("상품 할인정보 조회[getDiscountInfo]", e);
      }
    },
  },
  created: async function() {
    this.getDiscountInfo();
  },
  mounted: async function() {
    this.modalActiveEvent('popupSales');
  }
};
</script>
