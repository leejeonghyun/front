<template>
  <div v-bind:class="[siteClass]">
    <header>
      <h1 id="title">장바구니</h1>
      상품ID : <input type="text" v-model="itemId"><br/>
      단품ID : <input type="text" v-model="skuId"><br/>
      수량 : <input type="number" v-model="qty"><br/>
      주문유형코드 : <input type="text" v-model="ordTypeCd"><br/>
      배송유형코드 : <input type="text" v-model="delivTypeCd"><br/>
      매장ID : <input type="text" v-model="storId"><br/>
      공급업체코드 : <input type="text" v-model="supplFirmCd"><br/>
      배송일자 : <input type="text" v-model="delivDt"><br/>
      기획전ID : <input type="text" v-model="ssevntId"><br/>
      주문유형은 일반으로 들어갑니다.<br/>
      <a href="javascript://" @click="createBskt();">등록</a>
      <a href="javascript://" @click="goBaro();">바로구매 테스트</a>
      <!--<a href="javascript://" @click="updateBskt();">수정</a>
      <a href="javascript://" @click="deleteBskt();">삭제</a>-->
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
        <cart-product v-for="product in products" v-bind:key="product.cartSeq" :product="product" />
      </header>
    </section>
    <iframe src="/sample/the-title"></iframe>
    <footer id="footer">
      <button>주문하기</button>
    </footer>
  </div>
</template>

<script>
import CartProduct from './TheCartProduct';
import ApiUtils from '@/common/ApiUtils';
import server from '@/common/Config';
import Basket from '@/common/od/Basket';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'TheCart',
  components: { 'cart-product': CartProduct },
  data() {
    return {
      itemId: '',
      skuId: '',
      qty: 1,
      delivTypeCd: '01',
      storId: '1002',
      supplFirmCd: '70011',
      ordTypeCd: '10',
      delivDt: '',
      ssevntId: '',
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
      bsktInqRsltDto: {},
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mounted: async function() {
    /*
    const result = await ApiUtils.get('/fo/odexample/cart/list', null);
    this.products = result.data.data.productList;
    console.log(server);
    */

    console.log("1111111111111111111111111");
    const result2 = await ApiUtils.get('/fo/od/bsktmgnt/lately-bskt-item');
    this.bsktInqRsltDto = result2.data.data;
    console.log(this.bsktInqRsltDto);
  },
  methods: {
    async createBskt() {
      const result = await Basket.putBskt(this.itemId, this.skuId, "", this.qty, "", this.ssevntId, "", this.ordTypeCd, this.delivTypeCd, this.delivDt, '06251', this.storId, this.supplFirmCd);
      console.log(result);
    },
    async updateBskt() {
      this.$store.state.counter++;
      console.log(this.$store.state.counter);
      const iBsktPut = {
        bsktId: "20200205000000000001",
        bsktQty: this.qty,
        mbrNo: "1234567890"
      };
      const result = await ApiUtils.put('/fo/od/bsktmgnt/basket-item-quantity', iBsktPut);
      console.log(result);
    },
    async deleteBskt() {
      const result = await ApiUtils.delete('/fo/od/bsktmgnt/basket-item?bsktId=20200205000000000001&mbrNo=1234567890');
      console.log(result);
      console.log(this.$store.state.counter);
    },
    sss() {
      alert("sss");
    },
    async goBaro() {
      const result = await Basket.goBaro(this.itemId, this.skuId, "", this.qty, "", this.ssevntId, "", this.ordTypeCd, this.delivTypeCd, this.delivDt, '06251', this.storId, this.supplFirmCd);
      console.log(result);
      const data = result.data.data;

      if (result.data.success) {
        this.$store.state.ordId = data.ordId;
        this.$router.push({name: 'ordersheet', params: {ordId: data.ordId}});
      }
    }
  }
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
