<template>
  <div :class="'option-list include-img '+getClassItemType(itemDtl)">
    <div class="wrap-opt" v-for="(addItem, addItemInx) in addItemRsltList" :key="'ADD_'+addItemInx">
      <p class="txt-return" v-if="claimSpCd == 'RETURN' && addItem.retMethoCd == '2'">회수<br/>불필요</p>
      <figure>
        <span aria-label="혜택" class="ico-benefit gift" v-if="addItem.presFrgfYn == 'Y'">증정</span>
        <img :src="show(addItem.itemImg)" :alt="addItem.itemNm" @error="replaceByDefault" v-if="isNotEmpty(addItem.itemImg)"/>
        <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="addItem.itemNm" v-else />
      </figure>
      <dl>
        <dt>
          <p class="tit"><label :for="'chkAddItem_'+addItem.itemId+'_'+addItemInx">{{addItem.itemNm}}</label></p>
        </dt>
        <dd class="option-number txt" v-if="addItem.pkgYn == 'Y' && addItem.itemId != addItem.skuId">옵션 : {{addItem.skuNm}}</dd>
        <dd class="option-number txt" v-if="addItem.pkgYn != 'Y'">수량 {{toComma(addItem.claimQty)}}</dd>
        <dd class="list-price" aria-label="정상가격" v-if="claimSpCd !== 'EXCHANGE' && addItem.pkgYn != 'Y' && addItem.presFrgfYn != 'Y' && isNotEmpty(addItem.itemSprc) && Number(addItem.itemSprc) > 0 && addItem.itemSprc != addItem.itemDcSprc">
          <del>{{toComma(Number(addItem.itemSprc) * Number(addItem.claimQty))}}</del>원
        </dd>
        <dd class="sale-price" aria-label="판매가격" v-if="claimSpCd !== 'EXCHANGE' && addItem.pkgYn != 'Y' && isNotEmpty(addItem.itemDcSprc) && Number(addItem.itemDcSprc) > 0">
          <span class="number-sale-price">{{toComma(Number(addItem.itemDcSprc) * Number(addItem.claimQty))}}</span>
          <span class="unit-won">원</span>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import ImgUtils from '@/common/ImgUtils';
export default {
  name: "OrderCancelItemListItem",
  data() {
    return {
    };
  },
  props: {
    addItemRsltList: Array,
    itemDtl: Object,
    claimSpCd: String
  },
  mixins: [],
  components: {
  },
  methods: {
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    show(uri) {
      return ImgUtils.path(uri);
    },
    replaceByDefault(e) {
      e.target.src = imgProductNothumb;
    },
    getClassItemType(itemDtl) {
      let strClass = "";
      if (itemDtl.presFrgfYn === 'Y') {
        strClass += "gift";
      } else if (itemDtl.pkgYn === 'Y') {
        strClass += "package";
      } else {
        strClass += "simply";
      }
      // 회수불필요 Class 적용
      if (this.claimSpCd == 'RETURN' && itemDtl.retMethoCd == '2') {
        strClass += " disabled";
      }
      return strClass;
    },
  },
  mounted() {},
};
</script>
