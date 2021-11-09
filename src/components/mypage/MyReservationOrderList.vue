<template>
  <!-- START : list -->
  <li>
    <dl>
      <dt>
        <p class="tit">[말랭이여사] 가지말랭이</p>
      </dt>
      <dd class="thumb">
        <a href="#">
          <figure>
            <img src="@/assets/images/_temp/_img_gift03.jpg" alt="[말랭이여사] 가지말랭이">
          </figure>
        </a>
      </dd>
      <dd class="option">
        <p class="option-info">11/30(토)도착예정</p>
        <p class="option-info">옵션 : 선택한 옵션명 노출</p>
      </dd>
      <dd class="count">
        <p class="option-info">주문 수량 : 1개 <em class="point" v-if="!returnState">반품 1개</em></p>
      </dd>
      <dd class="shop">달리살다</dd>
      <dd class="list-price" aria-label="정상가격" v-if="!normalPrice">
        <del>7,560</del>원
      </dd>
      <dd class="sale-price" aria-label="판매가격">
        <span class="number-sale-price">12,680</span>
        <span class="unit-won">원</span>
      </dd>
    </dl>
    <!-- START : 심플리쿡 옵션 있을 경우 -->
    <div class="simplycook-option">
      <dl>
        <dt>
          <p class="tit">당면 사리</p>
        </dt>
        <dd class="option-number txt">주문 수량: 1개</dd>
        <dd class="sale-price">
          <span class="number-sale-price" aria-label="판매가격">500</span>
          <span class="unit-won">원</span>
        </dd>
      </dl>
      <dl>
        <dt>
          <p class="tit">시금치수제비</p>
        </dt>
        <dd class="option-number txt">주문 수량: 1개</dd>
        <dd class="sale-price">
          <span class="number-sale-price" aria-label="판매가격">1,000</span>
          <span class="unit-won">원</span>
        </dd>
      </dl>
    </div>
    <!-- END : 심플리쿡 옵션 있을 경우 -->
  </li>
  <!-- END : list -->
</template>

<script>
export default {
  name: "MyOrderNoCheckboxList",
  data() {
    return {
    };
  },
  props: ['returnState', 'normalPrice'],
  mixins: [],
  components: {
  },
  methods: {
  },
  mounted() {
  },
};
</script>
