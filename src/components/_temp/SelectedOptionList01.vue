<template>
  <ul class="selected-option-list">
    <li>
      <dl>
        <dt aria-label="추가로 선택한 옵션">
          <p class="tit">
            CJ 더건강한 그릴 비엔나 기획 200G*2봉
          </p>
        </dt>
        <dd class="option-number">
          <button type="button" class="btn-minus" @click="decreaseCount">
            <span class="hidden">선택수량 빼기</span>
            </button>
          <input type="number" value="1" class="txt-number" title="선택 수량">
          <button type="button" class="btn-plus" @click="increaseCount">
            <span class="hidden">선택수량 더하기</span>
          </button>
        </dd>
        <dd class="list-price" aria-label="정상가격"><!-- :할인가 없으면 전체 hidden -->
          <del>34,800</del>원
        </dd>
        <dd class="sale-price" aria-label="판매가격">
          <span class="number-sale-price">
            <strong>7,560</strong>원
          </span>
        </dd>
        <button type="button" class="btn-del"><span class="hidden">삭제</span></button>
      </dl>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'SelectedOptionList01',
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
};
</script>
