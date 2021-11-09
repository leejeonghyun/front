<template>
  <div class="wine-product">
    <figure>
      <img src="@/wine25/assets/images/_temp/b_2800100020773.png" alt="캔달잭슨 카베르네 소비뇽" />
    </figure>
    <dl class="reserved-item">
      <dt class="name" title="와인 명">캔달잭슨 카베르네 소비뇽</dt>
      <dd class="desc">
        <em class="type" title="와인 종류">스파클링</em>
        <span title="와인 원산지">프랑스</span>
        <span title="와인 품종">카베르네소비뇽</span>
      </dd>
      <dd class="length">1병</dd>
      <dd class="price"><em>19,800</em>원</dd>
      <dd class="item-bottom-btn">
        <div class="option-number">
          <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
          <input type="number" name="" value="1" class="txt-number" title="선택 수량">
          <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
        </div>
        <button class="direct-reserve">변경</button>
      </dd>
    </dl>
    <button type="button" class="btn-delete">
      <span class="hidden">이 상품 삭제</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'WineProductReserved',
  methods: {
    // change value
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
    }
  }
};
</script>
