<template>
  <div>
    <!-- market block -->
    <div class="list_content__block myorder">
      <div class="title_flex__area mallinfo">
        <div class="mall_title">
          <span class="inp-chk">
            <input
              type="checkbox"
              :name="'chkList'+ this.orderExchItemInfo.mallId"
              :id="'chkList'+ this.orderExchItemInfo.mallId"
              v-model="allSelected"
              @change="setChkAll"
            />
            <label :for="'chkList'+ this.orderExchItemInfo.mallId">
              <img
                :src="getMallLogo(this.orderExchItemInfo.mallId)"
                :alt="this.orderExchItemInfo.mallname"
                class="mall_image"
              />
              <strong v-show="earlydelivery">[ 새벽배송 ]</strong>
            </label>
          </span>
        </div>
      </div>
    </div>
    <div class="mall_alim__txt" v-if="this.orderExchItemInfo.mfCustInforMsgCnts">
      <p>{{this.orderExchItemInfo.mfCustInforMsgCnts}}</p>
    </div>
    <ul class="cart-product-list">
      <li v-for="(ordList, index) in this.ordExchProductList.mfOrdDtlList" :key="index">
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
                    :disabled="ordList.stkQty < 1"
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
                <!-- 재고가 없을시 품절 문구 표시 추가-->
                <p v-if="ordList.stkQty == 0">품절</p>
                <p class="option-cnt" v-if="ordList.ordQty > 0">수량: {{ ordList.ordQty }}개</p>
              </div>
              <div class="point status">{{getCommonCd(ordList.mfOrdStatCd)}}</div>
            </dd>
            <!-- 2021.03.23 수량취소 불가 이여서 주석처리 함-->
            <!-- 주문 수량 선택 관련 UI 변경
            <dd class="option-number" v-if="ordList.chkYn">
              <button type="button" class="btn-minus" @click="decreaseCount(index)">
                <span class="hidden">선택수량 빼기</span>
              </button>
              <input
                type="number"
                name="claimQty"
                :id="'claimQty'+index"
                v-model="ordList.exchQty"
                value="1"
                max="999"
                class="txt-number"
                title="선택 수량"
                @change="checkMaxClaimItemQty(index)"
              />
              <button type="button" class="btn-plus" @click="increaseCount(index)">
                <span class="hidden">선택수량 더하기</span>
              </button>
            </dd>
            -->
            <!-- 교환신청은 판매가격 미노출 처리 -->
            <!--   <dd
              class="list-price"
              aria-label="정상가격"
              v-if="(ordList.itemDcSprc + ordList.skuAddAmt) * ordList.exchQty != (ordList.itemSprc + ordList.skuAddAmt) * ordList.exchQty"
            >
              <del>{{ (ordList.itemSprc + ordList.skuAddAmt) * ordList.exchQty | currency }}</del>원
            </dd>
            <dd class="sale-price" aria-label="판매가격">
              <span
                class="number-sale-price"
              >{{ (ordList.itemDcSprc + ordList.skuAddAmt) * ordList.exchQty | currency }}</span>
              <span class="unit-won">원</span>
            </dd>-->
          </dl>
          <MfReturnSelectUI
            :ckIdx="ordList.mallId+'_'+index"
            :itemInfo="ordList"
            :roletext="roletext"
            :ordClaimInfo="returnOrdClaimSpCd()"
            @getCheckedItemInfo="getCheckedItemInfo"
            @reasonOrdItemUpdate="reasonOrdItemUpdate"
          />
        </div>
      </li>
    </ul>
    <!-- // market block -->
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
import SiteUtils from '@/common/SiteUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import MfReturnSelectUI from '@/views/cs/claimmgnt/MfReturnSelectUI';

export default {
  name: 'MfOrderExchDetail',
  props: {
    orderExchItemInfo: Object,
  },
  data() {
    return {
      roletext: '교환',
      ordExchProductList: [],
      allSelected: false,
      commCdList: [],
      orderItemReasonInfo: {},
      earlydelivery: false,
    };
  },
  mixins: [LayerPopupMixin],
  components: {
    MfReturnSelectUI,
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  methods: {
    goGoods(val) {
      location.href = SiteUtils.marketformo(ItemTemplete.itemDetail(val));
    },
    reasonOrdItemUpdate(data) {
      this.ordExchProductList.mfOrdDtlList.map(ordDtlValue => {
        if (ordDtlValue.chkYn) {
          this.$set(ordDtlValue, 'selectOtherRefCd', data.selectOtherRefCd);
          this.$set(ordDtlValue, 'reasonOrdItem', data.reasonOrdItem);
          this.$set(ordDtlValue, 'ordClaimResnCd', data.ordClaimResnCd);
        }
      });
      this.orderItemReasonInfo.selectOtherRefCd = data.selectOtherRefCd;
      this.orderItemReasonInfo.reasonOrdItem = data.reasonOrdItem;
      this.orderItemReasonInfo.ordClaimResnCd = data.ordClaimResnCd;
    },
    returnOrdClaimSpCd() {
      const ordClaimInfo = {};
      ordClaimInfo.exchangeStockYn = true;
      ordClaimInfo.returnSelectUI = true;
      ordClaimInfo.selectDisabled = false;
      ordClaimInfo.attFileYn = true;
      // 동일사유 코드 적용 구분
      ordClaimInfo.reasonYn =
        this.ordExchProductList.mfOrdDtlList.length > 1 ? true : false;
      return ordClaimInfo;
    },
    popupAction(type) {
      this.$emit('popupEvent', type);
    },
    popupDiscountActive() {
      this.$emit('popupEvent', 'popupDiscountInfo');
    },
    // mall 로그
    getMallLogo(mallId) {
      if (mallId != undefined || mallId != null) {
        return require('@/assets/images/mall_logo/' + mallId + '.png');
      }
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    setChk(ordItem) {
      this.$set(ordItem, 'chkYn', !ordItem.chkYn);
      // 선택 되지 않는 경우 초기화 처리
      if (!ordItem.chkYn) {
        this.$set(ordItem, 'exchQty', ordItem.ordQty);
        this.$set(ordItem, 'selectOtherRefCd', null);
        this.$set(ordItem, 'ordClaimResnCd', '');
        this.$set(ordItem, 'ordClaimReqCnts', null);
        this.allSelected = false;
        this.orderItemReasonInfo = {}; // 초기화
      } else {
        // 전부 체크 되면 전체선택 true 처리 s------------
        const mfOrdDtlSize = this.ordExchProductList.mfOrdDtlList.length;
        let chkYnCnt = 0;
        this.ordExchProductList.mfOrdDtlList.map(ordDtlValue => {
          if (ordDtlValue.chkYn) {
            chkYnCnt++;
          }
        });
        if (mfOrdDtlSize == chkYnCnt) {
          this.allSelected = true;
        }
        if (Object.keys(this.orderItemReasonInfo).length > 0) {
          const reasonInfo = this.orderItemReasonInfo;
          this.$set(ordItem, 'selectOtherRefCd', reasonInfo.selectOtherRefCd);
          this.$set(ordItem, 'reasonOrdItem', reasonInfo.reasonOrdItem);
          this.$set(ordItem, 'ordClaimResnCd', reasonInfo.ordClaimResnCd);
        }
      }
      this.getCheckedItemInfo();
    },
    async setChkAll() {
      this.ordExchProductList.mfOrdDtlList.map(ordDtlValue => {
        if (this.allSelected) {
          if (ordDtlValue.stkQty > 0) {
            this.$set(ordDtlValue, 'chkYn', true);
          } else {
            this.$set(ordDtlValue, 'chkYn', false);
          }
        } else {
          this.$set(ordDtlValue, 'chkYn', false);
          this.$set(ordDtlValue, 'exchQty', ordDtlValue.ordQty);
          this.$set(ordDtlValue, 'selectOtherRefCd', null);
          this.$set(ordDtlValue, 'ordClaimResnCd', '');
          this.$set(ordDtlValue, 'ordClaimReqCnts', null);
        }
      });
      this.getCheckedItemInfo();
    },
    getCheckedItemInfo() {
      this.$emit('refndEvent');
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
        StringUtils.isEmpty(this.ordExchProductList.mfOrdDtlList[index].exchQty)
      ) {
        this.$gsdialog.alert('수량을 입력 해주세요.');
        this.ordExchProductList.mfOrdDtlList[
          index
        ].exchQty = this.ordExchProductList.mfOrdDtlList[index].ordQty;
        return;
      }
      if (
        this.ordExchProductList.mfOrdDtlList[index].exchQty >
        this.ordExchProductList.mfOrdDtlList[index].ordQty
      ) {
        this.ordExchProductList.mfOrdDtlList[
          index
        ].exchQty = this.ordExchProductList.mfOrdDtlList[index].ordQty;
        this.$gsdialog.alert('수량은 주문 수량 이하로 입력 가능합니다.');
        return;
      }
      if (this.ordExchProductList.mfOrdDtlList[index].exchQty <= 0) {
        this.ordExchProductList.mfOrdDtlList[
          index
        ].exchQty = this.ordExchProductList.mfOrdDtlList[index].ordQty;
        return;
      }
      this.getCheckedItemInfo();
    },
    decreaseCount(index) {
      const claimQty = event.currentTarget;
      if (this.ordExchProductList.mfOrdDtlList[index].exchQty > 1) {
        this.ordExchProductList.mfOrdDtlList[index].exchQty =
          Number(this.ordExchProductList.mfOrdDtlList[index].exchQty) - 1;
      }
      this.getCheckedItemInfo();
    },
    increaseCount(index) {
      const claimQty = event.currentTarget;
      if (
        this.ordExchProductList.mfOrdDtlList[index].exchQty <
        this.ordExchProductList.mfOrdDtlList[index].ordQty
      ) {
        this.ordExchProductList.mfOrdDtlList[index].exchQty =
          Number(this.ordExchProductList.mfOrdDtlList[index].exchQty) + 1;
      }
      this.getCheckedItemInfo();
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
    async init() {
      this.ordExchProductList = this.$props.orderExchItemInfo;
      if (this.ordExchProductList) {
        const defaultChk = this.$route.params.ordDtlSeqno;
        this.ordExchProductList.mfOrdDtlList.map(ordDtlValue => {
          // 새벽배송
          if (ordDtlValue.delivTypeCd == '04') {
            this.earlydelivery = true;
          }
          if (defaultChk) {
            if (defaultChk == ordDtlValue.ordDtlSeqno) {
              // 재고 확인후 체크 처리 추가
              if (ordDtlValue.stkQty > 0) {
                this.$set(ordDtlValue, 'chkYn', true);
              } else {
                this.$set(ordDtlValue, 'chkYn', false);
              }
              this.allSelected =
                this.ordExchProductList.mfOrdDtlList.length > 1 ? false : true;
            } else {
              this.$set(ordDtlValue, 'chkYn', false);
            }
          } else {
            this.$set(ordDtlValue, 'chkYn', false);
          }
          // 주문수량 -> 교환수량값 set
          this.$set(ordDtlValue, 'exchQty', ordDtlValue.ordQty);
        });
      }
      this.searchCommCd('OD0100');
    },
  },
  mounted() {
    this.init();
  },
};
</script>
