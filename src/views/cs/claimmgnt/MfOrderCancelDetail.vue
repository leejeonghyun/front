<template>
  <div>
    <div class="list_content__block myorder">
      <div class="title_flex__area mallinfo">
        <div class="mall_title">
          <span class="inp-chk">
            <input
              type="checkbox"
              :name="'chkList'+this.ordCnclProductList.mallId"
              :id="'chkList'+this.ordCnclProductList.mallId"
              v-model="allSelected"
              @change="setChkAll"
            />
            <label :for="'chkList'+this.ordCnclProductList.mallId">
              <img
                :src="getMallLogo(this.ordCnclProductList.mallId)"
                :alt="this.ordCnclProductList.mallname"
                class="mall_image"
              />
              <strong v-show="earlydelivery">[ 새벽배송 ]</strong>
            </label>
          </span>
        </div>
      </div>
    </div>
    <div
      class="mall_alim__txt"
      v-if="this.ordCnclProductList.mallId == this.$store.state.cs.mallInfo.DP_MALL_302"
    >
      <p>더반찬의 경우 전체취소만 가능합니다.</p>
    </div>
    <ul class="cart-product-list">
      <li v-for="(ordList, index) in this.ordCnclProductList.mfOrdDtlList" :key="index">
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
                <p class="option-cnt" v-if="ordList.ordQty > 0">수량: {{ ordList.ordQty }}개</p>
              </div>
              <div class="point status">{{getCommonCd(ordList.mfOrdStatCd)}}</div>
            </dd>
            <!-- 2021.03.23 수량취소 불가 이여서 주석처리 함-->
            <!-- 주문 수량 선택 관련 UI 변경
            <dd class="option-number" v-if="ordList.chkYn">
              <button
                type="button"
                class="btn-minus"
                @click="decreaseCount(index)"
                :disabled="ordList.supplFirmPatlCnclPosbYn == 'N'"
              >
                <span class="hidden">선택수량 빼기</span>
              </button>
              <input
                type="number"
                name="claimQty"
                :id="'claimQty'+index"
                v-model="ordList.ordCnclQty"
                min="1"
                max="999"
                class="txt-number"
                title="선택 수량"
                @change="checkMaxClaimItemQty(index)"
                :disabled="ordList.supplFirmPatlCnclPosbYn == 'N'"
              />
              <button
                type="button"
                class="btn-plus"
                @click="increaseCount(index)"
                :disabled="ordList.supplFirmPatlCnclPosbYn == 'N'"
              >
                <span class="hidden">선택수량 더하기</span>
              </button>
            </dd>
            -->
            <dd
              class="list-price"
              aria-label="정상가격"
              v-if="(ordList.itemDcSprc + ordList.skuAddAmt) * ordList.ordCnclQty != (ordList.itemSprc + ordList.skuAddAmt) * ordList.ordCnclQty"
            >
              <del>{{ (ordList.itemSprc + ordList.skuAddAmt) * ordList.ordCnclQty | currency }}</del>원
            </dd>
            <dd class="sale-price" aria-label="판매가격">
              <span
                class="number-sale-price"
              >{{ (ordList.itemDcSprc+ordList.skuAddAmt) * ordList.ordCnclQty | currency }}</span>
              <span class="unit-won">원</span>
            </dd>
          </dl>
        </div>
        <br />
      </li>
    </ul>
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
import SiteUtils from '@/common/SiteUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import ClaimMsg from '@/components/mypage/cs/ClaimMsg';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: 'MfOrderCancelDetail',
  props: {
    ordCnclInfo: Object,
  },
  data() {
    return {
      ordCnclProductList: [],
      commCdList: [],
      allSelected: false,
      earlydelivery: false,
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
    setChk(ordItem) {
      // 소액결제 체크
      if (ordItem.tdrMeansCd == '10' || ordItem.tdrMeansCd == '13') {
        // this.$gsdialog.alert(ClaimMsg.mfMobileYn);
        const claimMsg =
          (ordItem.tdrMeansCd == '10' ? '[휴대폰 소액결제]' : '[모바일팝]으') +
          '로 구매하신 경우 모두 결제완료 상태일때 전체취소만 가능합니다.';
        this.$gsdialog.alert(claimMsg, { html: true });
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      this.$set(ordItem, 'chkYn', !ordItem.chkYn);
      if (!ordItem.chkYn) {
        if (ordItem.supplFirmPatlCnclPosbYn == 'N') {
          this.ordCnclProductList.mfOrdDtlList.map(ordDtlValue => {
            if (ordItem.supplFirmCd == ordDtlValue.supplFirmCd) {
              ordDtlValue.chkYn = ordItem.chkYn;
            }
          });
          this.allSelected = false;
        } else {
          this.$set(ordItem, 'ordCnclQty', ordItem.ordQty);
          this.allSelected = false;
        }
      } else {
        // 부분취소 불가능한 경우
        if ('N' == ordItem.supplFirmPatlCnclPosbYn) {
          this.ordCnclProductList.mfOrdDtlList.map(ordDtlValue => {
            if (ordItem.supplFirmCd == ordDtlValue.supplFirmCd) {
              ordDtlValue.chkYn = ordItem.chkYn;
            }
          });
          this.allSelected = true;
        } else {
          // 전부 체크 되면 전체선택 true 처리 s------------
          const mfOrdDtlSize = this.ordCnclProductList.mfOrdDtlList.length;
          let chkYnCnt = 0;
          this.ordCnclProductList.mfOrdDtlList.map(ordDtlValue => {
            if (ordDtlValue.chkYn) {
              chkYnCnt++;
            }
          });
          if (mfOrdDtlSize == chkYnCnt) {
            this.allSelected = true;
          }
        }
      }
      this.getCheckedItemInfo();
    },
    async setChkAll() {
      const data = this.ordCnclProductList.mfOrdDtlList.filter(
        x => x.tdrMeansCd == '10' || x.tdrMeansCd == '13'
      );
      if (data.length > 0) {
        // this.$gsdialog.alert(ClaimMsg.mfMobileYn);
        const claimMsg =
          (data[0].tdrMeansCd == '10' ? '[휴대폰 소액결제]' : '[모바일팝]으') +
          '로 구매하신 경우 모두 결제완료 상태일때 전체취소만 가능합니다.';
        this.$gsdialog.alert(claimMsg, { html: true });
        this.$nextTick(() => {
          this.allSelected = true;
        });
        return;
      }
      this.ordCnclProductList.mfOrdDtlList.map(ordDtlValue => {
        if (this.allSelected) {
          this.$set(ordDtlValue, 'chkYn', true);
        } else {
          this.$set(ordDtlValue, 'chkYn', false);
          this.$set(ordDtlValue, 'ordCnclQty', ordDtlValue.ordQty);
        }
      });
      this.getCheckedItemInfo();
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
    checkMaxClaimItemQty(index) {
      if (
        StringUtils.isEmpty(
          this.ordCnclProductList.mfOrdDtlList[index].ordCnclQty
        )
      ) {
        this.$gsdialog.alert('수량을 입력 해주세요.');
        this.ordCnclProductList.mfOrdDtlList[
          index
        ].ordCnclQty = this.ordCnclProductList.mfOrdDtlList[index].ordQty;
        return;
      }
      if (
        this.ordCnclProductList.mfOrdDtlList[index].ordCnclQty >
        this.ordCnclProductList.mfOrdDtlList[index].ordQty
      ) {
        this.ordCnclProductList.mfOrdDtlList[
          index
        ].ordCnclQty = this.ordCnclProductList.mfOrdDtlList[index].ordQty;
        this.$gsdialog.alert('수량은 주문 수량 이하로 입력 가능합니다.');
        return;
      }
      if (this.ordCnclProductList.mfOrdDtlList[index].ordCnclQty <= 0) {
        this.ordCnclProductList.mfOrdDtlList[
          index
        ].ordCnclQty = this.ordCnclProductList.mfOrdDtlList[index].ordQty;
        return;
      }
      this.getCheckedItemInfo();
    },
    decreaseCount(index) {
      const claimQty = event.currentTarget;
      if (this.ordCnclProductList.mfOrdDtlList[index].ordCnclQty > 1) {
        this.ordCnclProductList.mfOrdDtlList[index].ordCnclQty =
          Number(this.ordCnclProductList.mfOrdDtlList[index].ordCnclQty) - 1;
      }
      this.getCheckedItemInfo();
    },
    increaseCount(index) {
      const claimQty = event.currentTarget;
      if (
        this.ordCnclProductList.mfOrdDtlList[index].ordCnclQty <
        this.ordCnclProductList.mfOrdDtlList[index].ordQty
      ) {
        this.ordCnclProductList.mfOrdDtlList[index].ordCnclQty =
          Number(this.ordCnclProductList.mfOrdDtlList[index].ordCnclQty) + 1;
      }
      this.getCheckedItemInfo();
    },
    // 주문취소 환불정보 조회
    getCheckedItemInfo() {
      this.$emit('refndEvent');
    },
    async init() {
      this.ordCnclProductList = this.$props.ordCnclInfo;
      if (this.ordCnclProductList) {
        this.allSelected = true;
        this.ordCnclProductList.mfOrdDtlList.map(ordDtlValue => {
          if (ordDtlValue.delivTypeCd == '04') {
            this.earlydelivery = true;
          }
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
