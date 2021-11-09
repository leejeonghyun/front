<template>
  <div>
    <header>
      <h1 id="title">장바구니</h1>
      <section id="tab-menu">
        <menu>일반(16)</menu>
        <menu>예약(3)</menu>
      </section>
      <address>홍길동(우리집) 서울시 강남구 강남대로 154</address>
    </header>
    <section>
      <header id="header-oneday-delivery">
        <input type="checkbox" name="oneday-delivery" id="oneday-delivery" value="true" checked />
        <label for="oneday-delivery">당일배송(9)</label>
        <ul>
          <li></li>
        </ul>
        <CartProduct
          v-for="product in products"
          v-bind:key="product.cartSeq"
          v-bind:product="product"
        />
      </header>
    </section>
    <footer id="footer">
      <button>주문하기</button>
    </footer>
  </div>
</template>

<script>
import CartProduct from './TheCartProduct';
import ApiUtils from '@/common/ApiUtils';

export default {
  name: 'TheCart',
  components: { CartProduct },
  data() {
    return {
      products: [
        {
          cartSeq: 1,
          relatedCartSeq: 0,
          mallId: 'GSB2C',
          productNo: '8809006091713',
          thumbnailImage: '/images/sample/tm/8809006091713_tm.jpg',
          productName: 'CJ 더 건강한 비엔나 기획200G*2봉',
          optionFlag: 'Y',
          optionNo: ['01'],
          optionName: ['선택한 옵션 명 노출'],
          singleProductNo: '8809006091713S001',
          singleProductName: 'CJ 더 건강한 그릴 비엔나 기획200G*2봉',
          brand: 'GSTHEFRESH',
          quantity: 1,
          unitPrice: 6480,
          unitDiscountPrice: 6480,
          sellingPrice: 6480,
          sellingDiscountPrice: 6480,
          menuAddFlag: 'N',
          soldOutFlag: 'N',
          deliveryTypeCode: '01',
          deliveryTypeName: '당일배송',
        },
      ],
    };
  },
  mounted: async function() {
    const result = await ApiUtils.get('/fo/odexample/cart/list', null);
    this.products = result.data.data.productList;
  },
};
</script>

<style scoped>
#title {
  margin: auto;
  text-align: center;
  font-size: 1.5em;
}
#tab-menu {
  width: 100%;
  border: 1px solid #000;
}
#tab-menu menu {
  display: inline-block;
  width: 50%;
  text-align: center;
}
#footer {
  width: 100%;
  border: 1px solid #111;
  text-align: center;
}
</style>
