<template>
  <div>
    <!-- market block -->
    <div class="list_content__block myorder">
      <div class="title_flex__area mallinfo">
        <div class="mall_title">
          <span class="inp-chk">
            <input
              type="checkbox"
              :name="'chkList'+this.ordRtnProductList.mallId"
              :id="'chkList'+this.ordRtnProductList.mallId"
              v-model="allSelected"
              @change="setChkAll"
            />
            <label :for="'chkList'+this.ordRtnProductList.mallId">
              <img
                :src="getMallLogo(this.ordRtnProductList.mallId)"
                :alt="this.ordRtnProductList.mallname"
                class="mall_image"
              />
              <strong v-show="earlydelivery">[ 새벽배송 ]</strong>
            </label>
          </span>
        </div>
      </div>
      <div class="mall_alim__txt" v-if="this.ordRtnProductList.mfCustInforMsgCnts">
        <p>{{this.ordRtnProductList.mfCustInforMsgCnts}}</p>
      </div>

      <ul class="cart-product-list">
        <li v-for="(ordList, index) in this.ordRtnProductList.mfOrdDtlList" :key="index">
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
                    <img
                      :src="getImg(ordList.itemImg)"
                      :alt="ordList.itemNm"
                      @click="goGoods(ordList)"
                    />
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
                  <p class="option-cnt" v-show="ordList.ordQty > 0">수량: {{ ordList.ordQty }}개</p>
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
                  v-model="ordList.rtnQty"
                  value="1"
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
                v-if="(ordList.itemDcSprc + ordList.skuAddAmt) * ordList.rtnQty != (ordList.itemSprc + ordList.skuAddAmt) * ordList.rtnQty"
              >
                <del>{{ (ordList.itemSprc + ordList.skuAddAmt) * ordList.rtnQty | currency }}</del>원
              </dd>
              <dd class="sale-price" aria-label="판매가격">
                <span
                  class="number-sale-price"
                >{{ (ordList.itemDcSprc + ordList.skuAddAmt) * ordList.rtnQty | currency }}</span>
                <span class="unit-won">원</span>
              </dd>
            </dl>
            <MfReturnSelectUI
              :ckIdx="ordList.mallId+'_'+index"
              :itemInfo="ordList"
              :roletext="roletext"
              :ordClaimInfo="returnOrdClaimSpCd()"
              @getCheckedItemInfo="getCheckedItemInfo"
              @reasonOrdItemUpdate="reasonOrdItemUpdate"
            />
            <!-- :ordDtlYn="ordDtlYn" -->
          </div>
        </li>
      </ul>
    </div>
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
  name: 'MfOrderReturnDetail',
  props: {
    ordRtnInfo: Object,
    ordClaimSpCd: String,
  },
  data() {
    return {
      roletext: '반품',
      ordRtnProductList: [],
      commCdList: [],
      items: [],
      allSelected: false,
      orderItemReasonInfo: {},
      earlydelivery: false, // 새벽배송 여부
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
      this.ordRtnProductList.mfOrdDtlList.map(ordDtlValue => {
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
      ordClaimInfo.exchangeStockYn = false;
      ordClaimInfo.returnSelectUI = true;
      ordClaimInfo.selectDisabled = false;
      ordClaimInfo.attFileYn = true;
      // 동일사유 적용 코드
      ordClaimInfo.reasonYn =
        this.ordRtnProductList.mfOrdDtlList.length > 1 ? true : false;
      return ordClaimInfo;
    },
    setChk(ordItem) {
      this.$set(ordItem, 'chkYn', !ordItem.chkYn);
      // 선택 되지 않는 경우 초기화 처리
      if (!ordItem.chkYn) {
        if ('N' == ordItem.supplFirmPatlCnclPosbYn) {
          this.ordRtnProductList.mfOrdDtlList.map(ordDtlValue => {
            if (ordItem.supplFirmCd == ordDtlValue.supplFirmCd) {
              // ordDtlValue.chkYn = ordItem.chkYn;
              this.$set(ordDtlValue, 'chkYn', ordItem.chkYn);
              // this.$set(ordDtlValue, 'rtnQty', ordItem.ordQty);
              this.$set(ordDtlValue, 'selectOtherRefCd', null);
              this.$set(ordDtlValue, 'ordClaimResnCd', '');
              this.$set(ordDtlValue, 'ordClaimReqCnts', null);
            }
          });
          this.allSelected = false;
          this.orderItemReasonInfo = {}; // 초기화
        } else {
          this.$set(ordItem, 'rtnQty', ordItem.ordQty);
          this.$set(ordItem, 'selectOtherRefCd', null);
          this.$set(ordItem, 'ordClaimResnCd', '');
          this.$set(ordItem, 'ordClaimReqCnts', null);
          this.$set(ordItem, 'reasonOrdItem', false);
          this.allSelected = false;
          this.orderItemReasonInfo = {}; // 초기화
        }
      } else {
        if ('N' == ordItem.supplFirmPatlCnclPosbYn) {
          this.ordRtnProductList.mfOrdDtlList.map(ordDtlValue => {
            if (ordItem.supplFirmCd == ordDtlValue.supplFirmCd) {
              ordDtlValue.chkYn = ordItem.chkYn;
            }
          });
          this.allSelected = true;
        } else {
          // 전부 체크 되면 전체선택 true 처리 s------------
          const mfOrdDtlSize = this.ordRtnProductList.mfOrdDtlList.length;
          let chkYnCnt = 0;
          this.ordRtnProductList.mfOrdDtlList.map(ordDtlValue => {
            if (ordDtlValue.chkYn) {
              chkYnCnt++;
            }
          });
          if (mfOrdDtlSize == chkYnCnt) {
            this.allSelected = true;
          }
          // 동일사유 적용하기.
          if (Object.keys(this.orderItemReasonInfo).length > 0) {
            const reasonInfo = this.orderItemReasonInfo;
            this.$set(ordItem, 'selectOtherRefCd', reasonInfo.selectOtherRefCd);
            this.$set(ordItem, 'reasonOrdItem', reasonInfo.reasonOrdItem);
            this.$set(ordItem, 'ordClaimResnCd', reasonInfo.ordClaimResnCd);
          }
        }
      }
      this.getCheckedItemInfo();
    },
    async setChkAll() {
      this.ordRtnProductList.mfOrdDtlList.map(ordDtlValue => {
        if (this.allSelected) {
          this.$set(ordDtlValue, 'chkYn', true);
        } else {
          this.$set(ordDtlValue, 'chkYn', false);
          this.$set(ordDtlValue, 'rtnQty', ordDtlValue.ordQty);
          this.$set(ordDtlValue, 'selectOtherRefCd', null);
          this.$set(ordDtlValue, 'ordClaimResnCd', '');
          this.$set(ordDtlValue, 'ordClaimReqCnts', null);
        }
      });
      this.getCheckedItemInfo();
    },
    getMallLogo(mallId) {
      if (mallId != undefined || mallId != null) {
        return require('@/assets/images/mall_logo/' + mallId + '.png');
      }
    },
    // 주문취소 환불정보 조회
    getCheckedItemInfo() {
      this.$emit('refndEvent');
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    popupAction(type) {
      this.$emit('popupEvent', type);
    },
    popupDiscountActive() {
      this.$emit('popupEvent', 'popupDiscountInfo');
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
        StringUtils.isEmpty(this.ordRtnProductList.mfOrdDtlList[index].rtnQty)
      ) {
        this.$gsdialog.alert('수량을 입력 해주세요.');
        this.ordRtnProductList.mfOrdDtlList[
          index
        ].rtnQty = this.ordRtnProductList.mfOrdDtlList[index].ordQty;
        return;
      }
      if (
        this.ordRtnProductList.mfOrdDtlList[index].rtnQty >
        this.ordRtnProductList.mfOrdDtlList[index].ordQty
      ) {
        this.ordRtnProductList.mfOrdDtlList[
          index
        ].rtnQty = this.ordRtnProductList.mfOrdDtlList[index].ordQty;
        this.$gsdialog.alert('수량은 주문 수량 이하로 입력 가능합니다.');
        return;
      }
      if (this.ordRtnProductList.mfOrdDtlList[index].rtnQty <= 0) {
        this.ordRtnProductList.mfOrdDtlList[
          index
        ].rtnQty = this.ordRtnProductList.mfOrdDtlList[index].ordQty;
        return;
      }
      this.getCheckedItemInfo();
    },
    decreaseCount(index) {
      const claimQty = event.currentTarget;
      if (this.ordRtnProductList.mfOrdDtlList[index].rtnQty > 1) {
        this.ordRtnProductList.mfOrdDtlList[index].rtnQty =
          Number(this.ordRtnProductList.mfOrdDtlList[index].rtnQty) - 1;
      }
      this.getCheckedItemInfo();
    },
    increaseCount(index) {
      const claimQty = event.currentTarget;
      if (
        this.ordRtnProductList.mfOrdDtlList[index].rtnQty <
        this.ordRtnProductList.mfOrdDtlList[index].ordQty
      ) {
        this.ordRtnProductList.mfOrdDtlList[index].rtnQty =
          Number(this.ordRtnProductList.mfOrdDtlList[index].rtnQty) + 1;
      }
      this.getCheckedItemInfo();
    },
    async init() {
      this.ordRtnProductList = this.$props.ordRtnInfo;
      if (this.ordRtnProductList) {
        // 선택한 값
        const defaultChk = this.$route.params.ordDtlSeqno;
        // 상세값 몰 정보
        const ordMallId = this.ordRtnProductList.mfOrdDtlList.find(
          x => x.ordDtlSeqno == defaultChk
        );
        this.ordRtnProductList.mfOrdDtlList.map(ordDtlValue => {
          // 선택한 몰이랑 같은 경우..
          if (ordMallId && ordMallId.mallId == ordDtlValue.mallId) {
            // 부분취소가능 여부
            if (ordDtlValue.supplFirmPatlCnclPosbYn == 'N') {
              this.$set(ordDtlValue, 'chkYn', true);
              this.allSelected = true;
            } else {
              // 선택한 값
              if (defaultChk == ordDtlValue.ordDtlSeqno) {
                this.$set(ordDtlValue, 'chkYn', true);
                this.allSelected =
                  this.ordRtnProductList.mfOrdDtlList.length > 1 ? false : true;
              }
            }
          } else {
            this.$set(ordDtlValue, 'chkYn', false);
          }
          // 새벽배송
          if (ordDtlValue.delivTypeCd == '04') {
            this.earlydelivery = true;
          }
          // 주문수량 -> 반품수량값 set
          this.$set(ordDtlValue, 'rtnQty', ordDtlValue.ordQty);
          this.$set(ordDtlValue, 'reasonOrdItem', false);
        });
      }
      // 공통코드 조회
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
  updated() {},
};
</script>
