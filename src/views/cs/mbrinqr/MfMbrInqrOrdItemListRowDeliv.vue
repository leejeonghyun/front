<template>
  <div class="list_content__block myorder">
    <div class="title_flex__area">
      <div class="mall_title">
        <span class="inp-chk">
          <input
            type="checkbox"
            :name="'chkList'+this.ordProductList.mallId"
            :id="'chkList'+this.ordProductList.mallId"
            v-model="allSelected"
            @click="selectAll"
          />
          <label :for="'chkList_'+this.$props.ordId">
            <img
              :src="getMallLogo(this.ordProductList.mallId)"
              :alt="this.ordProductList.mallname"
              class="mall_image"
            />
          </label>
        </span>
      </div>
    </div>
    <ul class="cart-product-list">
      <li v-for="ordList in this.ordProductList.mfOrdDtlList" :key="ordList.ordDtlSeqno">
        <div class="inner">
          <dl>
            <dt>
              <p class="tit tit-link">
                <span class="inp-chk border">
                  <input
                    type="checkbox"
                    :name="'chkList'+ordList.mallId"
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
              <figure>
                <figure>
                  <img :src="getImg(ordList.itemImg)" :alt="ordList.itemNm" />
                </figure>
              </figure>
            </dd>
            <dd class="option flex">
              <div>
                <p class="option-txt" v-if="ordList.skuNm">옵션: {{ ordList.skuNm }}</p>
                <p class="option-cnt" v-if="ordList.ordQty > 0">수량: {{ ordList.ordQty }}개</p>
              </div>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
import SiteUtils from '@/common/SiteUtils';
export default {
  props: {
    ordItemDtl: Object,
    ordItemCheck: Object,
    ordItemData: Object,
    ordId: String,
  },
  data() {
    return {
      ordProductList: {},
      allSelected: false,
      product: {
        mallid: 'logo_lalavla_mf',
        mallname: '랄라블라',
        list: [
          {
            name: '55%할인 하기스 매직팬티 8팩 기획전',
            imagePath: '_img_cart01_08.jpg',
            option: '다크네이비/SM',
            cnt: 2,
          },
          {
            name: '55%할인 하기스 매직팬티 10팩 기획전',
            imagePath: '_img_cart01_07.jpg',
            option: '다크네이비/SM',
            cnt: 1,
          },
          {
            name: '55%할인 하기스 매직팬티 10팩 기획전',
            imagePath: '_img_cart01_07.jpg',
            option: '다크네이비/SM',
            cnt: 1,
          },
        ],
      },
    };
  },
  methods: {
    goGoods(val) {
      location.href = SiteUtils.marketformo(ItemTemplete.itemDetail(val));
    },
    getMallLogo(mallId) {
      if (mallId != undefined || mallId != null) {
        return require('@/assets/images/mall_logo/' + mallId + '.png');
      }
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    pushProdNm() {
      const checkList = this.ordProductList.mfOrdDtlList.filter(
        i => i.orgDelivTypeChk
      );

      if (checkList.length > 0) {
        // this.ordItemCheck.ordDttm = this.$props.ordItemData.ordDttm;
        this.ordItemCheck.ordId = this.ordProductList.mfOrdDtlList[0].ordId;
        this.ordItemCheck.mallId = this.ordProductList.mfOrdDtlList[0].mallId;

        this.ordItemCheck.arrItemNm = [];
        this.ordProductList.mfOrdDtlList.forEach(i => {
          if (i.orgDelivTypeChk) {
            i.ordDttm = this.$props.ordItemData.ordDttm;
            this.ordItemCheck.arrItemNm.push(i);
          }
        });
        if (this.ordProductList.mfOrdDtlList.length == checkList.length) {
          this.allSelected = 1;
        } else {
          this.allSelected = 0;
        }
      } else {
        this.allSelected = 0;
        this.ordItemCheck.ordId = null;
        this.ordItemCheck.mallId = null;
        this.ordItemCheck.arrItemNm = [];
      }
    },
    setSelect(ordItem) {
      if (!ordItem.orgDelivTypeChk) {
        if (this.ordItemCheck.ordId != null) {
          if (
            this.ordItemCheck.ordId != ordItem.ordId ||
            this.ordItemCheck.mallId != ordItem.mallId
          ) {
            console.log(this.ordItemCheck.ordId != ordItem.ordId);
            ordItem.orgDelivTypeChk = 0;
            this.$gsdialog.alert(
              this.ordItemCheck.ordId != ordItem.ordId
                ? '선택하신 상품은 주문이 달라서 1:1문의를 같이 접수할 수 없습니다.'
                : '선택하신 상품은 배송방법이  달라서 1:1문의를 같이 접수할 수 없습니다.',
              { html: true }
            );
            return;
          }
        }

        ordItem.orgDelivTypeChk = 1;
      } else {
        ordItem.orgDelivTypeChk = 0;
      }

      this.pushProdNm();
    },
    selectAll() {
      if (!this.allSelected) {
        if (this.ordItemCheck.ordId != null) {
          if (
            this.ordItemCheck.ordId !=
              this.ordProductList.mfOrdDtlList[0].ordId ||
            this.ordItemCheck.mallId !=
              this.ordProductList.mfOrdDtlList[0].mallId
          ) {
            this.$gsdialog.alert(
              this.ordItemCheck.ordId !=
                this.ordProductList.mfOrdDtlList[0].ordId
                ? '선택하신 상품은 주문이 달라서 1:1문의를 같이 접수할 수 없습니다.'
                : '선택하신 상품은 배송방법이  달라서 1:1문의를 같이 접수할 수 없습니다.',
              { html: true }
            );

            this.allSelected = 0;
            return;
          }
        }

        this.ordProductList.mfOrdDtlList.forEach(i => {
          i.orgDelivTypeChk = 1;
        });
      } else {
        this.ordProductList.mfOrdDtlList.forEach(i => {
          i.orgDelivTypeChk = 0;
        });
      }
      this.pushProdNm();
    },
    init() {
      this.ordProductList = this.$props.ordItemDtl;
      if (this.ordProductList) {
        this.ordProductList.mfOrdDtlList.map(ordDtValue => {
          this.$set(ordDtValue, 'orgDelivTypeChk', false);
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
