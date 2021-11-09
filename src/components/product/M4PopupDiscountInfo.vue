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
          <!-- ########## [S]GS Fresh : 1 / M4 : 3 ########## -->
          <ul class="discount-price-list">
            <li v-if="dcInfo.normSprc != dcInfo.sellAmt">
              정상가 <span class="price"><strong>{{dcInfo.normSprc | toCurrency}}</strong>원</span>
            </li>
            <li>
              판매가 <span class="price"><strong>{{dcInfo.sellAmt | toCurrency}}</strong>원</span>
              <!-- ### 패키지 상품 ### -->
              <ul v-if="dcInfo.itemCompoCd == '02'">
                <li v-if="dcInfo.itemDcrt > 0">행사할인({{dcInfo.itemDcrt}}%) <span class="price"><strong>-{{dcInfo.bfrSellAmt - dcInfo.sellAmt | toCurrency}}</strong>원</span></li>
              </ul>
              <!-- ### 일반상품, 선택형상품 ###-->
              <ul v-if="dcInfo.itemCompoCd != '02'">
                <li v-if="dcInfo.applDcPromDcrt > 0">행사할인({{dcInfo.applDcPromDcrt}}%) <span class="price"><strong>-{{dcInfo.applDcPromAmt | toCurrency}}</strong>원</span></li>
                <li v-if="dcInfo.applCpPromAmt > 0">
                  <template v-if="dcInfo.cpnDcTypeCd !== 'R'">
                    쿠폰할인{{dcInfo.applCpPromDcrt}} <span class="price"><strong>-{{dcInfo.applCpPromAmt | toCurrency}}</strong>원</span>
                  </template>
                  <template v-if="dcInfo.cpnDcTypeCd === 'R'">
                    쿠폰할인{{getDiscountRate(dcInfo.sellAmt, dcInfo.applCpPromAmt)}}<!--{{dcInfo.cpnBeneApplVal}}--> <span class="price"><strong>-{{dcInfo.applCpPromAmt | toCurrency}}</strong>원</span>
                  </template>
                </li>
              </ul>
            </li>
            <li class="total">즉시할인가 <span class="price"><strong>{{dcInfo.sellAmt >= dcInfo.dcAmt ? dcInfo.dcAmt : dcInfo.sellAmt | toCurrency}}</strong>원</span></li>
          </ul>
          <!-- ########## [E]GS Fresh ########## -->
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
    getDiscountRate(sellAmt, discountAmt) {
      const amt = (discountAmt / sellAmt) * 100;
    // console.log("-0-00--0-00-0-0-0" + Math.floor(amt));
      if (Math.floor(amt) > 0) {
        return '('+Math.floor(amt)+'%)';
      } else {
        return '';
      }
    },
    popupAction() {
      this.$emit('popupEvent', 'popupSales');
      this.modalActiveEvent('popupSales');
    },
    // 상품 할인정보 조회
    getDiscountInfo: async function() {
      try {
      let url = '/fo/md/mf/iteminfomgnt/popup-discount-info';
      let cmmSteId = '3';
      if (this.dcSateInfo.mallId === '1' || this.dcSateInfo.mallId === '11' || this.dcSateInfo.mallId === '20') {
        url = '/fo/md/iteminfomgnt/popup-discount-info';
        cmmSteId = this.dcSateInfo.mallId === '1' ? '1' : '2';
      }
        console.log(url + JSON.stringify(this.params));
        const result = await ApiUtils.get(url, this.params);
        if (result.data.data != null) {
          this.dcInfo = result.data.data;
            console.log("  this.dcInfo  " + JSON.stringify(this.dcInfo));
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
