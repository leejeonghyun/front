<template>
  <div class="wrap-option-list">
    <ul class="option-add">
      <!--
      <li v-if="opv.type ==='add'">
        <a href="javascript:void(0);" role="button" @click="selectedItem(null, opv.depth, opv.type)">
          <span class="option-title">선택안함</span>
        </a>
      </li>
     -->
      <li v-for="(item, index) in listData" :key="index">
        <a href="javascript:void(0);" role="button" @click="selectedItem(item, opv.depth, opv.type)" :class="getOfs(item)">
          <figure v-if="item.itemCtnsFileNm != null">
            <img v-bind:src="getImg(item.itemCtnsFileNm)">
          </figure>
          <span class="option-title">{{item.itemNm}}</span>
          <span class="option-price" v-if="(opv.depth === '1' && item.itemSkuInfoList === null) || opv.depth === '2' || opv.type === 'add'">
            <!-- <strong>{{item.sellAmt | toCurrency}}</strong>원 -->
            <strong v-if="item.skuAddAmt != null && item.skuAddAmt != 0">{{item.skuAddAmt > 0 ? '+' : ''}}{{item.skuAddAmt | toCurrency}}</strong>
            <strong v-else>{{item.sellAmt >= item.dcAmt ? item.dcAmt : item.sellAmt | toCurrency}}</strong>원
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
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
    };
  },
  methods: {
    selectedItem(obj, depth, type) {
      if (obj.ofsYn != "Y" && obj.sellPosbQty > 0) {
      this.$emit("selectedItem", obj, depth, type);
      }
    },
    getOfs(obj) {
      let txt = "";
      if (obj.ofsYn != "Y" && obj.sellPosbQty > 0) {
        txt = "";
      } else {
        txt = "soldout";
      }
      return txt;
    },
    getImg(imgUrl) {
      // let imgPath = '';
      // if (val != null && val != '') {
      //  imgPath = val.replace('{SIZE}', '300');
      // }
      // return this.imgUrl + imgPath;
     // console.log("00000" + ItemTemplete.img(imgUrl, '300'));
      return ItemTemplete.img(imgUrl, '300');
    }
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    }
  },
  mounted: async function() {
    console.log("optionViewewList mounted !222!"+JSON.stringify(this.listData));
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
