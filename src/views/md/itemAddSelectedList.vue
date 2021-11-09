<template>
    <ul>
      <li v-for="(item, index) in itemSelectedList" :key="index">
        <!-- [S]추가구성 상품 -->
        <ul :class="item != null ? 'selected-option-list' : 'addition-option-list'" v-if="item != null">
          <li v-for="(addItem, i) in item.addCompo" :key="i">
            <dl>
              <dt aria-label="추가로 선택한 옵션">
                <p class="tit">
                  {{addItem.itemNm}}
                </p>
              </dt>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount(addItem, 'add')">
                  <span class="hidden">선택수량 빼기</span>
                </button>
                <input type="number" class="txt-number" title="선택 수량" @blur="inputQty(addItem, 'add')" v-bind:value="addItem.totQty" @keyup="maxLength" maxlength="3"/>
                <button type="button" class="btn-plus" @click="increaseCount(addItem, 'add')">
                  <span class="hidden">선택수량 더하기</span>
                </button>
              </dd>
              <dd class="list-price" aria-label="정상가격" v-if="addItem.dblePrcIndYn === 'Y'">
                <del>{{addItem.bfrSellAmt | toCurrency}}</del>원
              </dd>
              <dd class="sale-price" aria-label="판매가격">
                <span class="number-sale-price">
                  <strong>{{addItem.totAmt >= addItem.totDcAmt ? addItem.totDcAmt : addItem.totAmt | toCurrency }}</strong>원
                </span>
              </dd>
              <button type="button" class="btn-del" @click="deleteItem(addItem, 'add')"><span class="hidden">삭제</span></button>
            </dl>
          </li>
        </ul>
      </li>
    </ul>
</template>
<script>
export default {
  name: 'itemAddSelectedList',
  props: {
    itemSelectedList: {
      type: Array[Object],
      default: () => ({}),
    },
    isOptionList: {
      type: Boolean,
      default: false,
    },
    spv: Object,
    itemCompoCd: String
  },
  methods: {
    // 선택된 옵션 삭제
    deleteItem(obj, type) {
      this.$emit("deleteItem", obj, type);
    },
    // 수량 Minus
    decreaseCount(obj, type) {
      this.$emit("decreaseCount", obj, type);
    },
    // 수량 Plus
    increaseCount(obj, type) {
      this.$emit("increaseCount", obj, type);
    },
    // 직접입력 금액계산
    inputQty(obj, type) {
      this.$emit("inputQty", obj, type);
    },
    maxLength() {
      const value = event.target.value;
      const maxlength = event.target.maxLength;
      if (String(value).length > maxlength) {
        event.target.value = value.slice(0, maxlength);
      }
    }
  },

  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    }
  }
};
</script>
