<template>
  <div class="wrap-option-list" v-bind:class="[siteClass]">
    <ul class="option-add">
      <li v-if="opv.type ==='add'">
        <a href="javascript:void(0);" role="button" @click="selectedItem(null, opv.depth, opv.type)">
          <span class="option-title">선택안함</span>
        </a>
      </li>
      <li v-for="(item, index) in listData" :key="index">
        <a href="javascript:void(0);" role="button" @click="selectedItem(item, opv.depth, opv.type)">
          <figure v-if="item.itemCtnsFileNm != null">
            <img v-bind:src="getImg(item.itemCtnsFileNm)">
          </figure>
          <span class="option-title">{{item.itemNm}}</span>
          <span class="option-price" v-if="(opv.depth === '1' && item.itemSkuInfoList === null) || opv.depth === '2' || opv.type === 'add'">
            <strong>{{item.sellAmt | toCurrency}}</strong>원
          </span>
          <!--
          <span class="option-price" v-if="opv.depth === '1' && d.itemSkuInfoList === null">
            <strong>{{d.sellAmt | toCurrency}}</strong>원
          </span>
          <span class="option-price" v-if="opv.depth === '2'">
            <strong>{{d.sellAmt | toCurrency}}</strong>원
          </span>
          <span class="option-price" v-if="opv.type === 'add'">
            <strong>{{d.sellAmt | toCurrency}}</strong>원
          </span>
          -->
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'OptionViewList',
  props: {
    listData: {
      type: Array[Object],
      default: () => ({}),
    },
    opv: Object,
    // itemSelected: {
    //   type: Object,
    //   default: () => ({}),
    // },
  },
  data() {
    return {
      itemSelected: this.$store.state.md.itemSelected,
      imgUrl: 'https://imagedev.gsecretail.com',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    selectedItem(obj, depth, type) {
      this.$emit("selectedItem", obj, depth, type);
    },
    getImg(val) {
      let imgPath = '';
      if (val != null && val != '') {
        imgPath = val.replace('{SIZE}', '300');
      }
      return this.imgUrl + imgPath;
    }
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    }
  },
  mounted: async function() {
    console.log("optionViewewList mounted !!");
    const vm = this;
    setTimeout(fn, 5);
    // eslint-disable-next-line require-jsdoc
    async function fn() {
      if (vm.itemSelected != null && vm.itemSelected.itemId != undefined && vm.$props.opv.depth == 1) {
        console.log("this.itemSelected !!");
        vm.selectedItem(vm.itemSelected, 1, 'sel');
      }
    }
  }
};
</script>
