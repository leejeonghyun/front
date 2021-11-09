<template>
  <ul class="cart-product-list">
    <!-- // 개발용 실사용 컴포넌트  -->
    <!-- 4월 추가 : input 추가 -->
    <!-- START : list -->
    <li v-for="(evntItem, inx) in evntItemRsltList" :key="inx">
      <dl>
        <dt>
          <!-- 4월 수정 START : checkbox 추가 -->
          <span class="inp-chk">
            <input type="checkbox" name="chkEvnt" :id="'chkEvnt'+inx" v-model="evntItem.chkFlag">
            <label :for="'chkEvnt'+inx">{{evntItem.itemNm}}</label>
          </span>
          <!-- 4월 수정 END : checkbox 추가 -->
        </dt>
        <dd class="thumb">
          <a href="#">
            <figure>
              <img src="@/assets/images/_temp/_img_gift03.jpg" :alt="evntItem.itemNm">
            </figure>
          </a>
        </dd>
        <!-- 4월 수정 START : 옵션 삭제, 사은품 내용 추가, 반품/취소 삭제 -->
        <!-- <dd class="option">
          <p class="option-info">옵션 : 선택한 옵션명 노출</p>
        </dd> -->
        <dd class="gift">
          <p class="point">{{evntItem.promDtlTypeNm}} 혜택 사은품</p>
          <!-- <p class="point">맛보기 사은품</p> -->
        </dd>
        <dd class="count">
          <p class="option-info">수량 {{toComma(evntItem.itemOrdQty)}}</p>
        </dd>
        <!-- 4월 수정 END : 옵션 삭제, 사은품 내용 추가, 반품/취소 삭제 -->
        <dd class="shop">{{evntItem.cmmSteNm}}</dd>
        <!-- 4월 수정 : 삭제 -->
        <!-- <dd class="list-price" aria-label="정상가격">
          <del>7,560</del>원
        </dd> -->
        <dd class="sale-price" aria-label="판매가격">
          <span class="number-sale-price">{{toComma(evntItem.itemOrdAmt)}}</span>
          <span class="unit-won">원</span>
        </dd>
      </dl>
    </li>
    <!-- END : list -->
  </ul>
</template>

<script>
import NumberUtils from '@/common/NumberUtils';
export default {
  name: "OrderCancelEventItemList",
  data() {
    return {
    };
  },
  props: {
    evntItemRsltList: Array,
  },
  mixins: [],
  components: {},
  methods: {
    toComma(x) {
      return NumberUtils.toComma(x);
    },
  },
  mounted() {},
};
</script>
