<!--
components/productTemplete/ProductImageCartMF
-->
<template>
  <NoList NoListText="상품 준비 중입니다." :ListType="'product'" v-if="rcmmdProdList == null || rcmmdProdList.length == 0" />
  <ul class="similarity-list" v-else>
    <li v-for="(rcmmdProd, idx) in rcmmdProdList" :key="`RCMMD_PROD_${idx}`">
      <div>
        <a href="javascript:;" @click="goItemDetailAction(rcmmdProd)">
          <figure>
            <img :src="getItemImg(rcmmdProd.itemImg)" @error="replaceByDefault" :alt="rcmmdProd.itemNm" v-if="rcmmdProd.itemImg !== ''">
            <img src="@/assets/images/img/img_product_nothumb.jpg" v-if="rcmmdProd.itemImg === ''">
          </figure>
          <dl>
            <dt><span aria-label="상품명">{{rcmmdProd.itemNm}}</span></dt>
            <dd aria-label="정상가격" class="list-price" v-if="Number(rcmmdProd.normSprc) > Number(rcmmdProd.sellAmt)">
              <del class="price">{{rcmmdProd.normSprc | currency}}</del>원
            </dd>
            <dd aria-label="판매가격" class="sale-price">
              <strong class="price">{{rcmmdProd.sellAmt | currency}}</strong>원
            </dd>
          </dl>
        </a>
        <button class="btn icon btn-cart" @click="popupOptionAction(rcmmdProd)"><span class="hidden">장바구니 담기</span></button>
      </div>
    </li>
  </ul>
</template>

<script>
import NoList from "@/components/common/NoList";
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import ImgUtils from '@/common/ImgUtils';
import NumberUtils from '@/common/NumberUtils';
export default {
  name: 'ProductList01',
  props: {
    rcmmdProdList: Array
  },
  data() {
    return { };
  },
  components: {
    NoList,
  },
  filters: {
    currency: function(val) {
      return NumberUtils.toComma(val);
    },
  },
  methods: {
    popupOptionAction(item) { // 10. 장바구니 담기 옵션 팝업 기본
      // 선택 상품을 장바구니에 담기
      this.$emit('recommendSubmitAction', item);

      // 추천상품 레이어 팝업 Close
      this.$emit('popupEvent');
    },
    // 상품 이미지 경로 보정처리 함수
    getItemImg(url) {
      let path = '';
      try {
        url = url.replace("{SIZE}", 300); // 임시로 사이즈 변경함
        path = ImgUtils.path(url);
      } catch (e) {
        path = '@/assets/images/img/img_product_nothumb.jpg';
      }
      return path;
    },
    // 상품 이미지가 오류인 경우 아래 경로로 대체
    replaceByDefault(e) {
      e.target.src = imgProductNothumb;
    },
    // 상품상세 화면 이동 처리 함수
    goItemDetailAction(bsktItem) {
      this.$emit('goItemDetail', bsktItem);
    },
  },
  mounted() { }
};
</script>
