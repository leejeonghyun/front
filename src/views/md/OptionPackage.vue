<template>
  <div id="optionPackage" :class="[{'wrap-option-popup': dispType === 'MD', 'wrap-full-popup': dispType !== 'MD'}, siteClass]" role="dialog" aria-modal="true">
    <div v-if="dispType !== 'MD'" class="header-popup">
      <strong>옵션 선택</strong>
    </div>
    <div :class="{'option-popup-body': dispType === 'MD', 'full-popup-body scroll-area': dispType !== 'MD'}">
      <div v-if="dispType === 'MD'" class="item-title">
        <strong>{{item.itemNm}}</strong>
      </div>

      <div class="option-content">
        <div v-for="(item, index) in optionList" :key="index">
          <div class="selected-option-title">
            <strong>{{item.itemNm}}</strong>
          </div>
          <button class="btn-select" @click="toggleOptionList(index)" :disabled="item.itemSkuInfoList == null">
            <span :id="'ITEM_DEPTH_'+index">{{item.itemSkuInfoList !== null ? '옵션 선택' : '옵션 없음'}}</span>
          </button>
          <!-- [S]옵션 리스트 -->
          <OptionViewList :listData="item.itemSkuInfoList" :opv="{depth: index, type: 'pkg'}" @selectedItem="selectedItem" v-if="selectedOptionActive === index" />
          <!-- [E]옵션 리스트 -->
        </div>
        <!-- [S]옵션에서 선택한 리스트 -->
        <itemSelectedList :itemSelectedList="itemSelectedListLocal" :spv="{type: 'pkg'}" v-bind:isOptionList="true" @deleteItem="deleteItem" @decreaseCount="decreaseCount" @increaseCount="increaseCount" @inputQty="inputQty"/>
        <!-- [E]옵션에서 선택한 리스트 -->
      </div>
      <div class="option-footer">
        <!-- [S] 총합계 DIV -->
        <div class="option-total-price">
          <span class="total-title" aria-label="옵션가를 포함한"><strong>총 상품금액</strong></span>
          <span class="total-price"><strong>{{totalAmount | toCurrency}}</strong>원</span>
        </div>
        <!-- [E] 총합계 DIV -->
        <!-- [S] 장바구니, 바로구매 -->
        <div v-if="dispType !== 'MD'" class="option-footer-btn">
          <button class="btn-bg darkgray btn-md" @click="setOrder('C')">장바구니</button>
          <button class="btn-bg lightgreen btn-md" @click="setOrder('S')">바로구매</button>
        </div>
        <!-- [E] 장바구니, 바로구매 -->
      </div>
    </div>
    <button v-if="dispType !== 'MD'" class="btn-layer-close" @click="popupAction('optionPackage')" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>

import ApiUtils from '@/common/ApiUtils';
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import itemSelectedList from '@/views/md/itemSelectedList';
import OptionViewList from '@/views/md/OptionViewList';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "OptionPackage",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '팝업 < 장바구니옵션 < %s'
  },
  mixins: [LayPopupMixin],
  props: {
    itemData: {
      type: Object,
      default: () => ({}),
    },
    dispType: {
      type: String,
      default: 'MD'
    },
    params: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      item: this.$props.itemData, // Parent 에서 넘겨받은 상품 Data
      totalAmount: 0, // 일반(판매금액) 총 합계 금액
      totalMbsDcAmount: 0, // Membership(달리드림) 총 합계 금액
      optionList: [], // 조회된 Data
      itemSelectedListLocal: this.$store.state.md.itemSelectedList, // 옵션에서 선택한 Data
      tempItemSelectList: [], // 선택한 상품 목록[임시저장]
      nonSkuIdx: [], // 단품이 없는 index
      selectedOptionActive: -1, // OptionList의 활성화 상태
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    itemSelectedList,
    OptionViewList,
  },
  created: async function() {
    // created
  },
  mounted: async function() {
    if (this.$props.dispType == 'MD') {
      this.modalActiveEvent('optionPackage');
    }
    this.getOptItemList();
  },
  methods: {
    /* #################### Data Access #################### */
    getOptItemList: async function() {
      try {
        const result = await ApiUtils.get('/fo/md/iteminfomgnt/package-item-list', this.$props.params);
        if (result.data.data != null) {
          this.optionList = result.data.data;

          // 배열 길이 설정
          this.tempItemSelectList.length = result.data.data.length;

          // 단품이 없는 index 저장
          const vm = this;
          this.optionList.forEach(function(data, idx) {
            if (data.itemSkuInfoList == null) {
              vm.nonSkuIdx.push(idx);
            }
          });
        }
      } catch (e) {
        this.$gsdialog.alert('상품정보 조회시 오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
    },
    /* #################### Event #################### */
    toggleOptionList(id) {
      this.selectedOptionActive === id ? this.selectedOptionActive = -1 : this.selectedOptionActive = id;
    },
    popupAction(p) {
      this.$emit('popupAction', p);
    },
    setOrder(p) {
      this.$emit('setOrder', p);
    },
    // 옵션선택
    selectedItem(obj, depth, type) {
      const optionTitle = event.currentTarget.querySelector('.option-title').textContent;
      document.querySelector('#ITEM_DEPTH_' + depth).textContent = optionTitle;

      // 해당 index에 obj 담기
      this.tempItemSelectList[depth] = obj;

      console.log(depth);

      // obj 담긴 건수
      let objCnt = 0;
      this.tempItemSelectList.forEach(function(data, idx) {
        if (data != null) {
          objCnt++;
        }
      });

      const setObj = {
        selectKey: '',
        dispItemNm: '',
        skuId: [],
        itemNm: [],
        itemId: [],
        bfrSellAmt: [],
        sellAmt: [],
        mbsDcAmt: [],
        sellPosbQty: [],
        itemSellUnitQty: 1,
        itemPurchMinRestrQty: 1,
        itemPurchMaxRestrQty: 999,
        grpItemCompoQty: [],
        totQty: 1,
        totAmt: 0,
        totMbsDcAmt: 0,
        delivTypeCd: '',
      };

      // 선택된 object
      if ((this.optionList.length - this.nonSkuIdx.length) == objCnt) {
        /* [S]단품이 없는 상품 재설정 */
        const vm = this;
        this.nonSkuIdx.forEach(function(data, idx) {
          const setObj = {
            skuId: 'NONSKU' + '-' + data,
            itemNm: '',
            itemId: vm.optionList[data].itemId,
            pitemNm: vm.optionList[data].itemNm,
            bfrSellAmt: vm.optionList[data].bfrSellAmt,
            sellAmt: vm.optionList[data].sellAmt,
            mbsDcAmt: vm.optionList[data].mbsDcAmt,
            sellPosbQty: vm.optionList[data].sellPosbQty,
            delivTypeCd: vm.optionList[data].delivTypeCd
          };
          vm.tempItemSelectList[data] = setObj;
        });
        /* [E]단품이 없는 상품 재설정 */

        let selectKey = "";
        let dispItemNm = "";
        this.tempItemSelectList.forEach(function(data, idx) {
          let itemNm = "";
          if (data.itemNm != "") {
            itemNm = "(" + data.itemNm + ")";
          }
          if (idx > 0) {
            selectKey = selectKey + "_" + data.skuId;
            dispItemNm = dispItemNm + "/" + data.pitemNm + itemNm;
          } else {
            selectKey = data.skuId;
            dispItemNm = data.pitemNm + itemNm;
          }
          setObj.selectKey = selectKey;
          setObj.dispItemNm = dispItemNm;
          setObj.totAmt = setObj.totAmt + data.sellAmt;
          setObj.totMbsDcAmt = setObj.totMbsDcAmt + data.mbsDcAmt;
          setObj.skuId.push(data.skuId);
          setObj.itemNm.push(data.itemNm);
          setObj.itemId.push(data.itemId);
          setObj.bfrSellAmt.push(data.bfrSellAmt);
          setObj.sellAmt.push(data.sellAmt);
          setObj.mbsDcAmt.push(data.mbsDcAmt);
          setObj.grpItemCompoQty.push(data.grpItemCompoQty);
          setObj.sellPosbQty.push(data.sellPosbQty);
          setObj.delivTypeCd = data.delivTypeCd;
        });
        this.addItem(setObj);

        /* [S]선택된 단품 초기화 */
        this.optionList.forEach(function(data, idx) {
          document.querySelector('#ITEM_DEPTH_' + idx).textContent = data.itemSkuInfoList !== null ? '옵션 선택' : '옵션 없음';
        });
        this.tempItemSelectList = [];
        this.tempItemSelectList.length = this.optionList.length;
        /* [E]선택된 단품 초기화 */
      }
      this.selectedOptionActive = -1;
    },
    // 수량 Minus
    decreaseCount(obj) {
      let valueQty = parseInt(event.currentTarget.nextSibling.value);
      const minQty = parseInt(obj.itemPurchMinRestrQty); // 상품구매 최소 제한수량
      const unitQty = isNaN(obj.itemSellUnitQty) ? 1 : parseInt(obj.itemSellUnitQty); // 상품판매 단위 수량
      if (valueQty > minQty) {
        event.currentTarget.nextSibling.value = valueQty - unitQty;
        valueQty = parseInt(event.currentTarget.nextSibling.value);
        const index = this.inArrayObject(this.itemSelectedListLocal, obj.selectKey);
        const currentData = this.itemSelectedListLocal[index];
        currentData.totQty = valueQty;

        /* [S]판매금액, 달리드림 금액 계산 */
        let sellAmt = 0;
        let mbsDcAmt = 0;
        obj.sellAmt.forEach(function(data, idx) {
          sellAmt += data;
        });
        obj.mbsDcAmt.forEach(function(data, idx) {
          mbsDcAmt += data;
        });
        /* [E]판매금액, 달리드림 금액 계산 */

        currentData.totAmt = sellAmt * valueQty;
        currentData.totMbsDcAmt = mbsDcAmt * valueQty;

        this.updateItem();
      }
    },
    // 수량 Plus
    increaseCount(obj) {
      let valueQty = parseInt(event.currentTarget.previousSibling.value);
      let maxQty = parseInt(obj.itemPurchMaxRestrQty); // 상품구매 최대 제한 수량
      const unitQty = isNaN(obj.itemSellUnitQty) ? 1 : parseInt(obj.itemSellUnitQty); // 상품판매 단위 수량

      /* [S]판매가능 수량에서 최소값 가져오기 */
      const sellPosbQtySort = obj.sellPosbQty.sort(function(a, b) {
        return a - b;
      });
      const sellPosbQty = sellPosbQtySort[0];
      /* [E]판매가능 수량에서 최소값 가져오기 */

      if (maxQty > sellPosbQty) {
        maxQty = sellPosbQty;
      }

      if (valueQty < maxQty ) {
        event.currentTarget.previousSibling.value = valueQty + unitQty;
        valueQty = parseInt(event.currentTarget.previousSibling.value);
        const index = this.inArrayObject(this.itemSelectedListLocal, obj.selectKey);
        const currentData = this.itemSelectedListLocal[index];
        currentData.totQty = valueQty;

        /* [S]판매금액, 달리드림 금액 계산 */
        let sellAmt = 0;
        let mbsDcAmt = 0;
        obj.sellAmt.forEach(function(data, idx) {
          sellAmt += data;
        });
        obj.mbsDcAmt.forEach(function(data, idx) {
          mbsDcAmt += data;
        });
        /* [E]판매금액, 달리드림 금액 계산 */

        currentData.totAmt = sellAmt * valueQty;
        currentData.totMbsDcAmt = mbsDcAmt * valueQty;

        this.updateItem();
      }
    },
    // 직접입력 금액계산
    inputQty(obj) {
      const inQty = isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value);
      const minQty = parseInt(obj.itemPurchMinRestrQty); // 상품구매 최소 제한수량
      let maxQty = parseInt(obj.itemPurchMaxRestrQty); // 상품구매 최대 제한 수량
      const unitQty = isNaN(obj.itemSellUnitQty) ? 1 : parseInt(obj.itemSellUnitQty); // 상품판매 단위 수량

      /* [S]판매가능 수량에서 최소값 가져오기 */
      const sellPosbQtySort = obj.sellPosbQty.sort(function(a, b) {
        return a - b;
      });
      const sellPosbQty = sellPosbQtySort[0];
      /* [E]판매가능 수량에서 최소값 가져오기 */

      if (inQty == 0 || inQty < minQty) {
        event.target.value = minQty;
        this.$gsdialog.alert('최소 구매수량은 ' + minQty + '개 입니다');
        return;
      }

      if (maxQty > sellPosbQty) {
        maxQty = sellPosbQty;
      }

      if (inQty % unitQty != 0) {
        this.$gsdialog.alert('구매수량은 ' + unitQty + '의 배수로 입력하세요.');
        event.target.value = minQty;
        return;
      }

      if (inQty > maxQty) {
        event.target.value = maxQty;
        this.$gsdialog.alert('최대 구매수량은 ' + maxQty + '개 입니다');
        return;
      }

      const index = this.inArrayObject(this.itemSelectedListLocal, obj.selectKey);
      const currentData = this.itemSelectedListLocal[index];
      currentData.totQty = inQty;

      /* [S]판매금액, 달리드림 금액 계산 */
      let sellAmt = 0;
      let mbsDcAmt = 0;
      obj.sellAmt.forEach(function(data, idx) {
        sellAmt += data;
      });
      obj.mbsDcAmt.forEach(function(data, idx) {
        mbsDcAmt += data;
      });
      /* [E]판매금액, 달리드림 금액 계산 */

      currentData.totAmt = sellAmt * inQty;
      currentData.totMbsDcAmt = mbsDcAmt * inQty;

      this.updateItem();
    },
    // 선택된 옵션 삭제
    deleteItem(obj) {
      const index = this.inArrayObject(this.itemSelectedListLocal, obj.selectKey);
      this.itemSelectedListLocal.splice(index, 1);
      this.updateItem();
    },
    /* #################### Function #################### */
    // 합계금액 계산
    setTotAmtCalc() {
      const vm = this;
      vm.totalAmount = 0;
      vm.totalMbsDcAmount = 0;
      this.itemSelectedListLocal.forEach(function(data, idx) {
        vm.totalAmount += data.totAmt;
        vm.totalMbsDcAmount += data.totMbsDcAmt;
      });
      vm.$store.commit('setItemSelectedList', {itemData: vm.itemSelectedListLocal});
    },
    // OBJ index 찾기
    inArrayObject(arrayObject, key) {
      let index = -1;
      if (arrayObject != null && arrayObject.length > 0) {
        arrayObject.forEach(function(data, idx) {
          if (data.selectKey == key) {
            index = idx;
          }
        });
      }
      return index;
    },
    // 옵션정보 update
    updateItem() {
      const vm = this;
      const itemList = this.itemSelectedListLocal;
      this.itemSelectedListLocal = [];
      itemList.forEach(function(data, idx) {
        vm.itemSelectedListLocal.push(data);
      });
      this.setTotAmtCalc();
      this.$store.commit('delItemSelected');
    },
    // 선택된 상품 추가
    addItem(obj) {
      const itemList = this.itemSelectedListLocal;
      if (itemList.length == 0) {
          itemList.push(obj);
      } else {
        // 같은 상품이 있는지 체크
        const index = this.inArrayObject(itemList, obj.selectKey);
        if (index == -1) {
          itemList.push(obj);
        } else {
          /* [S]판매금액, 달리드림 금액 계산 */
          let sellAmt = 0;
          let mbsDcAmt = 0;
          obj.sellAmt.forEach(function(data, idx) {
            sellAmt += data;
          });
          obj.mbsDcAmt.forEach(function(data, idx) {
            mbsDcAmt += data;
          });
          /* [E]판매금액, 달리드림 금액 계산 */

          obj.totQty += 1;
          obj.totAmt = sellAmt * obj.totQty;
          obj.totMbsDcAmt = mbsDcAmt * obj.totQty;

          itemList[index] = obj;
        }
      }
      this.updateItem();
    }
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    }
  }
};
</script>
