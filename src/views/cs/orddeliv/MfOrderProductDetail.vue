<template>
  <div>
    <!-- market block -->
    <div class="list_content__block myorder">
      <div class="title_flex__area mallinfo">
        <div class="mall_title">
          <span class="inp-chk">
            <input
              type="checkbox"
              :id="'chkList'+this.ordProductList.mallId"
              :name="'chkList'+this.ordProductList.mallId"
              v-model="allSelected"
              @click="selectAll"
            />
            <label :for="'chkList'+this.ordProductList.mallId">
              <img
                :src="getMallLogo(this.ordProductList.mallId)"
                :alt="this.ordProductList.mallname"
                class="mall_image"
              />
              <strong v-show="this.ordProductList.delivType">[ 새벽배송 ]</strong>
            </label>
          </span>
        </div>
        <div class="small_sum">
          <strong>{{ this.ordProductList.totalAmout | currency }}</strong>원
        </div>
      </div>
      <section v-for="(dlfList, dlfindex) in this.ordProductList.mfDlfeeList" :key="dlfindex">
        <ul class="cart-product-list">
          <li v-for="ordList in dlfList.mfOrdDtlList" :key="ordList.ordDtlSeqno">
            <div class="inner">
              <dl>
                <dt>
                  <p class="tit tit-link">
                    <span class="inp-chk">
                      <input
                        type="checkbox"
                        name="chkProduct"
                        :id="'chkList'+ordList.mallId+'_'+ordList.ordDtlSeqno"
                        :value="ordList.ordDtlSeqno"
                        v-model="ordList.orgDelivTypeChk"
                        @click="setSelect(ordList)"
                      />
                      <label
                        :for="'chkList'+ordList.mallId+'_'+ordList.ordDtlSeqno"
                      >{{ ordList.itemNm }}</label>
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
                    <p class="option-txt" v-if="ordList.skuNm && ordList.skuMgntYn != 'N'">
                      옵션: {{ ordList.skuNm }}
                      <span
                        v-if="ordList.skuAddAmt > 0"
                      >(+{{ordList.skuAddAmt | currency}}원)</span>
                    </p>
                    <p class="option-cnt" v-if="ordList.ordQty > 0">수량: {{ ordList.ordQty }}개</p>
                    <p
                      class="option-cnt"
                      v-if="ordList.ordCnclQty > 0 || ordList.rtnQty > 0 || ordList.exchOrdQty > 0"
                    >
                      <span
                        class="redcnt"
                        v-if="ordList.ordCnclQty > 0"
                      >취소: {{ ordList.ordCnclQty }}개</span>
                      <span class="redcnt" v-if="ordList.rtnQty > 0">반품: {{ ordList.rtnQty }}개</span>
                      <span
                        class="redcnt"
                        v-if="ordList.exchOrdQty > 0"
                      >교환: {{ ordList.exchOrdQty }}개</span>
                    </p>
                  </div>
                  <div
                    class="point status"
                  >{{getCommonCd(ordList.mfClaimStatCd != null ? ordList.mfClaimStatCd : ordList.mfOrdStatCd)}}</div>
                </dd>
                <dd
                  class="list-price"
                  aria-label="정상가격"
                  v-if="(ordList.itemSprc + ordList.skuAddAmt) * ordList.ordQty != ordList.salesAmt"
                >
                  <del>{{ (ordList.itemSprc + ordList.skuAddAmt) * ordList.ordQty | currency }}</del>원
                </dd>
                <dd class="sale-price" aria-label="판매가격">
                  <span class="number-sale-price">{{ ordList.salesAmt | currency }}</span>
                  <span class="unit-won">원</span>
                </dd>
              </dl>
            </div>
          </li>
        </ul>
        <div class="total-price-info">
          <p class="price-info">
            <strong class="total">
              합계 금액
              <em>{{ (dlfList.totalDtlAmt + dlfList.dlfeeAmt) | currency }}</em>원
            </strong>
            <span class="total-info-txt">
              상품금액 {{dlfList.totalDtlAmt | currency }}원 + 배송비 {{dlfList.dlfeeAmt | currency
              }}원
            </span>
          </p>
        </div>
      </section>
    </div>
    <!-- // market block -->
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
import SiteUtils from '@/common/SiteUtils';
import ApiUtils from '@/common/ApiUtils';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: 'OrderProductDetailMf',
  props: ['ordInfo'],
  data() {
    return {
      ordProductList: {},
      commCdList: [],
      allSelected: false,
    };
  },
  mixins: [LayerPopupMixin],
  components: {},
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  methods: {
    goGoods(val) {
      location.href = SiteUtils.marketformo(ItemTemplete.itemDetail(val));
    },
    setSelect(ordItem) {
      // 전부 체크 되면 전체선택 true 처리 ---
      this.$set(ordItem, 'orgDelivTypeChk', !ordItem.orgDelivTypeChk);
      const mfOrdDtlList = this.ordProductList.mfOrdDtlList.length;
      let chkYnCnt = 0;
      this.ordProductList.mfOrdDtlList.map(ordDtlValue => {
        if (ordDtlValue.orgDelivTypeChk) {
          chkYnCnt++;
        }
      });
      if (mfOrdDtlList == chkYnCnt) {
        this.allSelected = true;
      } else {
        this.allSelected = false;
      }
    },
    selectAll() {
      this.ordProductList.mfOrdDtlList.map(value => {
        if (!this.allSelected) {
          this.$set(value, 'orgDelivTypeChk', true);
        } else {
          this.$set(value, 'orgDelivTypeChk', false);
        }
      });
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    getMallLogo(mallId) {
      if (mallId != undefined || mallId != null) {
        return require('@/assets/images/mall_logo/' + mallId + '.png');
      }
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
    init() {
      this.ordProductList = this.$props.ordInfo;
      if (this.ordProductList) {
        const mfDlfeeList = this.ordProductList.mfDlfeeList;
        const mfOrdDtlList = this.ordProductList.mfOrdDtlList;
        let totalAmout = 0;
        let delivType = false;
        mfDlfeeList.map(dlfValue => {
          const list = [];
          totalAmout += dlfValue.dlfeeAmt;
          let totalDtlAmt = 0;
          mfOrdDtlList.map((ordDtValue, index) => {
            this.$set(ordDtValue, 'orgDelivTypeChk', false);
            if (dlfValue.dlfeeId == ordDtValue.dlfeeId) {
              totalDtlAmt += ordDtValue.salesAmt;
              list.push(ordDtValue);
            }
            // 새벽배송 여부 추가
            if (ordDtValue.delivTypeCd == '04') {
              delivType = true;
            }
            dlfValue.mfOrdDtlList = list;
            dlfValue.totalDtlAmt = totalDtlAmt;
          });
          totalAmout += totalDtlAmt;
        });
        this.ordProductList.totalAmout = totalAmout;
        this.ordProductList.delivType = delivType;
      }
      this.searchCommCd('OD0100');
    },
    async searchCommCd(commGrpCd) {
      const params = {
        commGrpCd: commGrpCd,
      };
      await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params).then(res => {
        if (res.data.success) {
          this.commCdList = res.data.data;
        }
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
