<template>
  <div class="wrap-option-list">
    <ul class="option-add">
      <li>
      <!--  <a href="javascript:void(0);" role="button" @click="selectedOption(null)">
          <span class="option-title">선택안함</span>
        </a> -->
      </li>
      <li v-for="(item, index) in listData" :key="index">
        <a href="javascript:void(0);" role="button" @click="selectedOption(item)">
          <figure v-if="item.itemCtnsFileNm != null">
            <img v-bind:src="getImg(item.itemCtnsFileNm)">
          </figure>
          <span class="option-title">{{item.itemOptnValNm}}</span>
          <span class="option-price">
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
export default {
  name: 'OptionMultiViewList',
  props: ['listData', 'idx'],
  data() {
    return {
        itemSelected: this.$store.state.md.itemSelected,
    };
  },
  methods: {
    selectedOption(obj) {
    this.$emit("selectedOption", obj, this.idx);
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl, '300');
    }
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    }
  },
  mounted: async function() {
    console.log("optionViewewList mounted !!");
  }
};
</script>
