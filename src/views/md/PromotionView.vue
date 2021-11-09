<template>
  <div v-bind:class="[siteClass]">
    <div v-for="(item, index) in promInfo.fitmPromItem" :key="index" class="option-footer-info-txt">
      <p>
        증정사은품 : {{item.itemNm}}
      </p>
    </div>
    <div v-if="promInfo.fitmPromItemList != null && promInfo.fitmPromItemList.length > 0" class="option-footer-info-txt btntype">
      <p>증정 사은품을 선택해 주세요</p>
    </div>
    <div v-for="(data, dataIndex) in promInfo.fitmPromItemList" :key="dataIndex" class="option-footer-gift">
      <button class="btn-select" @click="toggleOptionList(dataIndex)">
        <span :id="'PROM_' + dataIndex">사은품선택</span>
      </button>
      <div class="wrap-option-list" v-if="selectedOptionActive === dataIndex">
        <ul class="option-add">
          <li>
            <a href="javascript:void(0);" role="button" @click="selectedItem(null, opv.depth, opv.type, dataIndex)">
              <span class="option-title">선택안함</span>
            </a>
          </li>
          <li v-for="(item, itemIndex) in data" :key="itemIndex">
            <a href="javascript:void(0);" role="button" @click="selectedItem(item, opv.depth, opv.type, dataIndex)">
              <span class="option-title">{{item.itemNm}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-for="(item, index) in promInfo.itemProm" :key="index" class="option-footer-info-txt">
      <p v-if="item.promDtlTypeCd == '201'">
        [{{item.beneApplVal}}+1 행사] {{item.beneApplVal}}+1개 담으면 {{item.beneApplVal}}개가격으로 구매가능<br/>행사가격은 장바구니에서 확인 가능합니다.
      </p>
      <p v-if="item.promDtlTypeCd == '202'">
        <template v-if="item.beneZoneBeginVal > 0">
           [다다익선] {{item.beneZoneBeginVal}}개 담으면
        </template>
        <template v-else-if="item.beneZoneEndVal > 0">
           [다다익선] {{item.beneZoneEndVal}}개 담으면
        </template>
        <template v-else>
           [다다익선] {{item.beneZoneBeginVal}}개 담으면
        </template>
        <span v-if="item.dcTypeCd == 'R'">
            {{item.beneApplVal}}%
        </span>
        <span v-else-if="item.dcTypeCd == 'A'">
          {{item.beneApplVal}}원
        </span>
        추가 할인가격으로 구매가능<br/>행사가격은 장바구니에서 확인 가능합니다.
      </p>
    </div>
  </div>
</template>
<script>
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'PromotionView',
  props: {
    promInfo: {
      type: Object,
      default: () => ({}),
    },
    opv: Object
  },
  data() {
    return {
      selectedOptionActive: -1,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
  },
  created: async function() {
  },
  mounted: async function() {
  },
  methods: {
    toggleOptionList(id) {
      this.selectedOptionActive === id ? this.selectedOptionActive = -1 : this.selectedOptionActive = id;
    },
    selectedItem(obj, depth, type, idx) {
      if (obj != null) {
        this.$emit("selectedItem", obj, depth, type);
      }
      const optionTitle = event.currentTarget.querySelector('.option-title').textContent;
      document.querySelector('#PROM_' + idx).textContent = optionTitle;
      this.selectedOptionActive = -1;
    },
  }
};
</script>
