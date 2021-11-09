<template>
  <div>
    <div class="list_content__block myorder">
      <ul class="cart-product-list">
        <li v-for="(ordList, index) in this.itemList.mfClaimDtlList" :key="index">
          <div class="inner">
            <dl>
              <dt>
                <p class="tit tit-link">
                  <span class="inp-chk">
                    <input
                      type="checkbox"
                      :name="'chkList'+ordList.mallId+'_'+index"
                      :id="'chkList'+ordList.mallId+'_'+index"
                      :value="ordList.ordDtlSeqno"
                      :checked="ordList.chkYn"
                      @click="setChk(ordList)"
                    />
                    <label :for="'chkList'+ordList.mallId+'_'+index">{{ ordList.itemNm }}</label>
                  </span>
                  <a
                    href="javascript:void(0);"
                    class="tit-product"
                    @click="goGoods(ordList)"
                  >{{ ordList.itemNm }}</a>
                </p>
              </dt>
              <dd class="thumb">
                <a href="javascript:void(0);" @click="goGoods(ordList)">
                  <figure>
                    <img :src="getImg(ordList.itemImg)" :alt="ordList.itemNm" />
                  </figure>
                </a>
              </dd>
              <dd class="option flex">
                <div>
                  <p
                    class="option-txt"
                    v-if="ordList.skuNm && ordList.skuMgntYn != 'N'"
                    @click="goGoods(ordList)"
                  >
                    옵션: {{ ordList.skuNm }}
                    <span
                      v-if="ordList.skuAddAmt > 0"
                    >(+{{ordList.skuAddAmt | currency}}원)</span>
                  </p>
                  <p
                    class="option-cnt"
                    v-if="ordList.claimQty > 0"
                  >{{getOrdClaimSpCd()}}수량: {{ ordList.claimQty }}개</p>
                </div>
                <div class="point status">{{getCommonCd(ordList.mfOrdStatCd)}}</div>
              </dd>
              <dd
                class="list-price"
                aria-label="정상가격"
                v-if="(ordList.itemDcSprc + ordList.skuAddAmt) * ordList.claimQty != (ordList.itemSprc + ordList.skuAddAmt) * ordList.claimQty"
              >
                <del>{{(ordList.itemSprc + ordList.skuAddAmt) * ordList.claimQty | currency }}</del>원
              </dd>
              <dd class="sale-price" aria-label="판매가격">
                <span
                  class="number-sale-price"
                >{{(ordList.itemDcSprc + ordList.skuAddAmt) * ordList.claimQty | currency }}</span>
                <span class="unit-won">원</span>
              </dd>
            </dl>
            <MfReturnSelectUI
              :ckIdx="ordList.mallId+'_'+index"
              :itemInfo="ordList"
              :roletext="roletext"
              :ordClaimInfo="returnOrdClaimSpCd()"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
import SiteUtils from '@/common/SiteUtils';

import MfReturnSelectUI from '@/views/cs/claimmgnt/MfReturnSelectUI';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: 'MfOrderChangeView',
  props: {
    ordInfo: Object,
    ordClaimSpCd: String,
  },
  data() {
    return {
      roletext: '반품',
      itemList: [],
      commCdList: [],
    };
  },
  components: {
    MfReturnSelectUI,
  },
  mixins: [LayerPopupMixin],
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  methods: {
    goGoods(val) {
      location.href = SiteUtils.marketformo(ItemTemplete.itemDetail(val));
    },
    getOrdClaimSpCd() {
      let ordClaimSpCdText = '';
      if (this.$props.ordClaimSpCd) {
        switch (this.$props.ordClaimSpCd) {
          case 'C':
            ordClaimSpCdText = '취소';
            break;
          case 'R':
            ordClaimSpCdText = '반품';
            break;
          case 'E':
            ordClaimSpCdText = '교환';
            break;
        }
      }
      return ordClaimSpCdText;
    },
    returnOrdClaimSpCd() {
      if (this.$props.ordClaimSpCd) {
        const ordClaimInfo = {};
        const data = this.$props.ordClaimSpCd;
        switch (data) {
          case 'C':
            // 재고 셀렉트 노출 여부
            ordClaimInfo.exchangeStockYn = false;
            // 반품 사유 셀렉트
            ordClaimInfo.returnSelectUI = false;
            break;
          case 'R':
            ordClaimInfo.exchangeStockYn = false;
            ordClaimInfo.selectDisabled = true;
            ordClaimInfo.returnSelectUI = true;
            ordClaimInfo.reasonYn = false;
            break;
          case 'E':
            ordClaimInfo.exchangeStockYn = true;
            ordClaimInfo.selectDisabled = true;
            ordClaimInfo.returnSelectUI = true;
            ordClaimInfo.attFileYn = false;
            ordClaimInfo.reasonYn = false;
            break;
        }
        return ordClaimInfo;
      }
    },
    setChk(ordItem) {
      this.$set(ordItem, 'chkYn', !ordItem.chkYn);
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    getCommonCd(mfOrdStatCd) {
      let data = '';
      this.commCdList
        .filter(x => x.commCd == mfOrdStatCd)
        .map(value => {
          data = value.commCdDesc;
        });
      return data;
    },
    async init() {
      this.itemList = this.$props.ordInfo;
      if (this.itemList) {
        this.itemList.mfClaimDtlList.map(item => {
          // 디폴트 checked
          this.$set(item, 'chkYn', false);
        });
      }
      this.commCdList = await this.$store.dispatch('commCdSearch', 'OD0100');
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>
