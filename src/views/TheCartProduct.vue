<template>
  <li class="cart-product">
    <div class="product-head">
      <div class="product-head-name">
        <input
          type="checkbox"
          v-bind:name="product.cartSeq"
          :id="product.cartSeq"
          :value="product.cartSeq"
          checked
        />
        <label v-bind:for="product.cartSeq">{{ product.productName }}</label>
      </div>
      <button class="delete-button">X</button>
    </div>
    <div class="product-body">
      <div>
        <img
          v-bind:src="product.thumbnailImage"
          v-bind:alt="product.productName"
          class="cart-product-img"
        />
      </div>
      <div class="product-option">
        <div class="product-option-top">
          <div>옵션: 01) 선택한 옵션 명 노출 ▼</div>
          <img v-bind:src="getBrandImage" class="brand" :alt="product.brand" />
        </div>
        <div class="product-option-bottom">
          <div class="product-count">
            <button>⊖</button>
            <span>{{ product.quantity }}</span>
            <button>⊕</button>
          </div>
          <div>{{ numberWithCommas }}원</div>
        </div>
      </div>
    </div>
    <div class="product-foot">
      <button>쿠폰적용</button>
    </div>
  </li>
</template>

<script>
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    numberWithCommas: function() {
      const x = this.$props.product.sellingDiscountPrice;
      return NumberUtils.toComma(x);
    },
    getBrandImage: function() {
      return '/images/sample/cart/gsfresh.png';
    },
  },
  mounted() {

  }
};
</script>


<style>
.cart-product {
  display: flex;
  flex-direction: column;
  border: 1px solid #222;
  margin: 1px;
}
.cart-product-img {
  width: 80px;
  height: 80px;
  border: 1px solid #333;
  margin: 1px;
}
.product-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #333;
  margin: 1px;
}
.product-body {
  display: flex;
  flex-direction: row;
  border: 1px solid #333;
  margin: 1px;
}
.product-option {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #555;
  margin: 1px;
}
.product-option-top,
.product-option-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.brand {
  width: 50px;
  height: 16px;
}
.product-foot {
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid #333;
  margin: 1px;
}
</style>
