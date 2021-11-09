<template>
  <div class="list-content">
    <ul class="cart-product-list selected-list">
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
            <p class="option-info">옵션 : 중과 + 소과 혼합</p>
          </dd>
          <dd class="count">
            <p class="option-info">수량 : 1개</p>
          </dd>
          <dd class="shop">달리살다</dd>
          <dd class="sale-price" aria-label="판매가격">
            <span class="number-sale-price">12,680</span>
            <span class="unit-won">원</span>
          </dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>
            <p class="tit">제주 하우스 귤 2.5KG</p>
          </dt>
          <dd class="thumb">
            <a href="#">
              <figure>
                <img src="@/assets/images/_temp/_img_gift04.jpg" alt="제주 하우스 귤 2.5KG">
              </figure>
            </a>
          </dd>
          <dd class="option">
            <p class="option-info">옵션 : 중과 + 소과 혼합</p>
          </dd>
          <dd class="count">
            <p class="option-info">수량 : 1개</p>
          </dd>
          <dd class="shop">GS fresh</dd>
          <dd class="sale-price" aria-label="판매가격">
            <span class="number-sale-price">12,680</span>
            <span class="unit-won">원</span>
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "GiftProductList02",
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    // chage value
    decreaseCount(event) {
      const $target = event.currentTarget;
      if ( $target.nextSibling.value > 0 ) {
        $target.nextSibling.value --;
      }
    },
    increaseCount(event) {
      const $target = event.currentTarget;
      if ( $target.previousSibling.value < 999 ) {
        $target.previousSibling.value ++;
      }
    },
  },
  mounted() {
  },
};
</script>
