<template>
  <!-- START : list -->
  <li>
    <dl>
      <dt>
        <p class="tit">
          <span class="inp-chk">
            <input type="checkbox" name="" id="chkList01_01" value="" checked="checked">
            <label for="chkList01_01">일리윤 히알루론 모이스춰 수분크림</label>
          </span>
        </p>
      </dt>
      <dd class="thumb">
        <a href="#">
          <figure>
            <img src="@/assets/images/_temp/_img_gift03.jpg" alt="[말랭이여사] 가지말랭이">
          </figure>
        </a>
      </dd>
      <dd class="option">
        <p class="option-info">옵션 : 중과 + 소과 혼합</p>
      </dd>
      <dd class="count">
        <p class="option-info">주문 수량 : 1개 <em class="point" v-if="!returnState">반품 1개</em></p>
        <!-- <p class="option-info">수량 : 1개 <em class="cancel" v-if="!returnState">취소 1개</em></p> -->
      </dd>
      <dd class="shop">달리살다</dd>
      <dd class="list-price" aria-label="정상가격">
        <del>7,560</del>원
      </dd>
      <dd class="sale-price" aria-label="판매가격">
        <span class="number-sale-price">12,680</span>
        <span class="unit-won">원</span>
      </dd>
    </dl>
    <p class="free-gift-cont">증정 사은품 : 휴대용 위생장갑 5입</p>
  </li>
  <!-- END : list -->
</template>

<script>
export default {
  name: "MyOrderNoSimplyCook",
  data() {
    return {
    };
  },
  props: ['returnState'],
  mixins: [],
  components: {
  },
  methods: {
  },
  mounted() {
  },
};
</script>
