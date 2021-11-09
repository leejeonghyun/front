<template>
  <div class="wrap-select w100">
    <span v-if="disabledInfo">
      <select
        :id="'exchStockSelect_'+ckIdx"
        :disabled="disabledInfo"
        v-model="ordItemInfo.exchOrdSkuNm"
        v-if="ordItemInfo.exchOrdSkuNm != null"
      >
        <option disabled selected>{{ordItemInfo.exchOrdSkuNm}}</option>
      </select>
    </span>
    <span v-else>
      <select
        :id="'exchStockSelect_'+ckIdx"
        v-model="ordItemInfo.skuId"
        @change="selectStockAction"
      >
        <option value>상품을 선택해 주세요.</option>
        <option
          v-for="(exchStockList, index) in this.exchStockList"
          :key="index"
          :value="exchStockList.skuId"
          :disabled="exchStockList.ofs"
        >{{exchStockList.skuNm}}{{exchStockList.ofs ? '(품절)':''}}</option>
      </select>
    </span>
  </div>
</template>
<script>
import ApiUtils from '@/common/ApiUtils';
export default {
  name: 'MfExchStockList',
  props: {
    ordInfo: Object,
    ckIdx: String,
    disabledInfo: Boolean,
  },
  data() {
    return {
      ordItemInfo: {},
      exchStockList: [],
    };
  },
  methods: {
    selectStockAction(event) {
      this.$set(this.ordItemInfo, 'skuId', event.target.value);
      // this.$emit('getExchStockInfo');
    },
    async init() {
      this.ordItemInfo = this.$props.ordInfo;
      if (this.ordItemInfo && this.$props.disabledInfo == false) {
        const params = {
          ordId: this.ordItemInfo.ordId,
          ordDtlSeqno: this.ordItemInfo.ordDtlSeqno,
        };
        await ApiUtils.get('/fo/cs/mf/exchange-sku-list', {
          ...params,
        })
          .then(res => {
            if (res.data === null || !res.data.success) {
              return;
            }
            this.exchStockList = res.data.data;
            this.exchStockList.forEach(i => {
              i.ofs = i.sellPosbQty < 1;
            });
            const skuObj = this.exchStockList.find(
              i => this.ordItemInfo.skuId == i.skuId
            );
            if (skuObj == undefined || skuObj == null) {
              this.ordItemInfo.skuId = '';
            } else {
              if (skuObj.ofs) {
                this.ordItemInfo.skuId = '';
                this.$gsdialog.alert(
                  '[' +
                    this.ordItemInfo.itemNm +
                    ' ' +
                    (this.ordItemInfo.skuMgntYn == 'Y' ? skuObj.skuNm : '') +
                    '] 상품의 재고가 부족하여 교환을 신청할 수 없습니다.'
                );
              }
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>
