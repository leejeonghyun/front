<template>
  <div id="optionResvDefault" :class="[{'wrap-option-popup': dispType === 'MD', 'wrap-full-popup': dispType !== 'MD'}, siteClass]" role="dialog" aria-modal="true">
    <div class="header-popup" v-if="dispType === 'DP'">
      <strong>옵션 선택</strong>
    </div>
    <div :class="{'option-popup-body': dispType === 'MD', 'full-popup-body scroll-area': dispType !== 'MD'}">
      <div :class="{'inner-full-popup': dispType !== 'MD'}">
        <div class="item-title">
          <strong>{{itemData.itemNm}}</strong>
        </div>
        <div class="option-content">
          <ol class="option-toggle">
            <li>
              <button class="btn-toggle-step" @click="toggleStepActive('step1')" :class="{active : this.toggleStep.step1}">
                <span class="txt-step">STEP 1.</span>
                <span v-if="!this.selectDate">도착 예정일을 선택</span>
                <span v-if="this.selectDate">{{selectDate}} {{selectDay}}</span>
              </button>
              <div class="option-toggle-content" v-if="this.toggleStep.step1">
                <!-- [S] Calendar Component -->
                <Calendar :initDate="selectDate" :initDay="selectDay" :resvInfo="resvInfo" @changeDeliveryEvent="changeDeliveryAction" @setDeliveryDate="setDeliveryDate" />
                <!-- [E] Calendar Component -->
                <p class="info">도착예정일 3일전 배송시간 선택 안내 문자가 발송됩니다.</p>
              </div>
            </li>
            <li>
              <button class="btn-toggle-step" @click="toggleStepActive('step2')" :class="{active : this.toggleStep.step2}" v-if="isOptionList">
                <span class="txt-step">STEP 2.</span>
                <span>옵션 선택</span>
              </button>
              <div class="option-toggle-content" v-if="this.toggleStep.step2">
                <!-- ### [S]option depth 1 ### -->
                <button class="btn-select" @click="toggleOptionList(0)" v-if="isOptionList">
                  <span id="ITEM_DEPTH_1">상품 선택</span>
                </button>
                <OptionViewList v-bind:itemSelected="itemSelected" v-bind:listData="optionList" v-bind:opv="{depth: '1', type: ''}" v-on:selectedItem="selectedItem" v-if="optionList.length > 0 && selectedOptionActive == 0" />
                <!-- ### [E]option depth 1 ### -->

                <!-- ### [S]option depth 2 ### -->
                <button class="btn-select" @click="toggleOptionList(1)" v-if="skuList !== null && skuList.length > 0">
                  <span id="ITEM_DEPTH_2">옵션 선택</span>
                </button>
                <OptionViewList v-bind:listData="skuList" v-bind:opv="{depth: '2', type: ''}" v-on:selectedItem="selectedItem" v-if="skuList !== null && skuList.length > 0 && selectedOptionActive == 1" />
                <!-- ### [E]option depth 2 ### -->

                <!-- ### [S]추가구성 상품 ### -->
                <button class="btn-select" @click="toggleOptionList(2)" v-if="addCompoList !== null && addCompoList.length > 0">
                  <span id="ADD_ITEM">추가구상품</span>
                </button>
                <OptionViewList v-bind:listData="addCompoList" v-bind:opv="{depth: '', type: 'add'}" v-on:selectedItem="selectedItem" v-if="addCompoList.length > 0 && selectedOptionActive == 2" />
                <!-- ### [E]추가구성 상품 ### -->
              </div>
            </li>
          </ol>
          <!-- [S]옵션에서 선택한 리스트 -->
          <itemSelectedList v-bind:itemSelectedList="itemSelectedListLocal" v-bind:spv="{type: ''}" v-bind:isOptionList="isOptionList" @deleteItem="deleteItem" @decreaseCount="decreaseCount" @increaseCount="increaseCount" @inputQty="inputQty"/>
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
    </div>
    <button v-if="dispType !== 'MD'" class="btn-layer-close"  @click="popupAction('optionResvDefault')" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>

import ApiUtils from '@/common/ApiUtils';
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import itemSelectedList from '@/views/md/itemSelectedList';
import OptionViewList from '@/views/md/OptionViewList';
import Calendar from '@/components/common/Calendar';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "OptionResvDefault",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
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
      totalAmount: 0,
      totalMbsDcAmount: 0,
      itemSelectedListLocal: this.$store.state.md.itemSelectedList,
      itemSelected: this.$store.state.md.itemSelected,
      // addItemSelectedList: [],
      optionTemp: {},
      optionList: [],
      skuList: [],
      skuTemp: {},
      addCompoList: [],
      addCompoTemp: [],
      resvInfo: [],
      selectedOptionActive: -1,
      selectDate: '',
      selectDay: '',
      toggleStep: {
        step1: false,
        step2: false,
        step3: false,
      },
      isOptionList: false,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    itemSelectedList,
    OptionViewList,
    Calendar
  },
  created: async function() {
    try {
      // console.log("itemTestVal :: "+this.$store.state.md.itemTestVal);
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  mounted: async function() {
    this.getOptItemList();
    // this.getItemResvInfo();
    this.resvInfo = this.$props.itemData.resvInfo;

    if (this.itemSelected != null && this.itemSelected.length > 0) {
      this.toggleOptionList(0);
    }

    // this.modalActiveEvent('optionResvDefault');
    if (this.$props.dispType == 'MD') {
      this.modalActiveEvent('optionResvDefault');
    }
  },
  methods: {
    /* #################### Data Access #################### */
    /* ### [S]옵션정보 조회 ### */
    getOptItemList: async function() {
      // 01:일반상품, 02:패키지, 03:선택형, 04:대용량정육
      let url = "/fo/md/iteminfomgnt/normal-item-list";
      if (this.$props.itemData.itemCompoCd == "01") {
        url = "/fo/md/iteminfomgnt/normal-item-list";
      } else if (this.$props.itemData.itemCompoCd == "03") {
        url = "/fo/md/iteminfomgnt/optional-item-list";
      }
      try {
        const result = await ApiUtils.get(url, this.$props.params);
        if (result.data.data != null) {
          if (result.data.data.length == 1) {
            const obj = result.data.data[0];

            obj.itemNm = this.$props.itemData.itemNm;
            obj.dispItemNm = obj.itemNm;

            if (this.itemSelectedListLocal.length == 0) {
              this.itemSelectedListLocal.push(obj);
            }

            this.getAddCompoItemList(); // 추가구성 상품 조회
            this.isOptionList = false;
          } else {
            this.optionList = result.data.data;
            this.isOptionList = true;
          }
          this.setTotAmtCalc();
        }
      } catch (e) {
        this.$gsdialog.alert('상품정보 조회시 오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
    },
    /* ### [S]추가구성 상품 조회 ### */
    getAddCompoItemList: async function() {
      try {
        const result = await ApiUtils.get('/fo/md/iteminfomgnt/add-component-item-list', this.$props.params);
        if (result.data.data != null) {
          this.addCompoList = result.data.data;
        }
      } catch (e) {
        this.$gsdialog.alert('추가구성상품 조회시 오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
    },
    /* ### [S]예약 상품 정보 조회 ### */
    // getItemResvInfo: async function() {
    //   try {
    //     const result = await ApiUtils.get('/fo/md/iteminfomgnt/item-resv-info', this.$props.params);
    //     if (result.data.data != null) {
    //       this.resvInfo = result.data.data;
    //     }
    //   } catch (e) {
    //     this.$gsdialog.alert('예약상품정보 조회시 오류가 발생했습니다.').then(dialog => {
    //       console.log(e);
    //     });
    //   }
    // },
    /* #################### Event #################### */
    changeDeliveryAction(date, day) {
      this.selectDate = date;
      this.selectDay = day;
    },
    toggleStepActive(el) {
      this.toggleStep[el] = !(this.toggleStep[el] != false);
    },
    toggleOptionList(id) {
      this.selectedOptionActive == id ? this.selectedOptionActive = -1 : this.selectedOptionActive = id;
    },
    popupAction(p) {
      this.$emit('popupAction', p);
    },
    setOrder(p) {
      this.$emit('setOrder', p);
    },
    setDeliveryDate(p) {
      this.$emit('setDeliveryDate', p);
    },
    // 옵션 선택
    selectedItem(obj, depth, type) {
      let optionTitle = "";
      if (type == 'sel') {
        optionTitle = obj.itemNm;
      } else {
        optionTitle = event.currentTarget.querySelector('.option-title').textContent;
      }
      let currentObject;
      if (obj != null) {
        currentObject = {
            "idxKey": obj.idxKey,
            "skuId": obj.skuId,
            "dispItemNm": obj.dispItemNm,
            "itemNm": obj.itemNm,
            "itemId": obj.itemId,
            "itemCd": obj.itemCd,
            "bfrSellAmt": obj.bfrSellAmt,
            "mbsDcAmt": obj.mbsDcAmt,
            "sellAmt": obj.sellAmt,
            "itemSellUnitQty": obj.itemSellUnitQty,
            "itemPurchMinRestrQty": obj.itemPurchMinRestrQty,
            "itemPurchMaxRestrQty": obj.itemPurchMaxRestrQty,
            "sellPosbQty": obj.sellPosbQty,
            "dblePrcIndYn": obj.dblePrcIndYn,
            "totQty": obj.totQty,
            "totAmt": obj.totAmt,
            "totMbsDcAmt": obj.totMbsDcAmt,
            "delivTypeCd": obj.delivTypeCd,
        };
      }
      // 옵션 선택
      if (depth == '1') {
        this.skuList = [];
        this.addCompoList = [];
        this.skuTemp = {};
        this.addCompoTemp = {};
        document.querySelector('#ITEM_DEPTH_1').textContent = optionTitle;
        obj.selectKey = obj.idxKey;
        this.optionTemp = obj;
        this.addCompoTemp = obj.addCompoItemList;
        this.skuList = obj.itemSkuInfoList;
        if (obj.itemSkuInfoList == null || obj.itemSkuInfoList.length <= 0) {
          document.querySelector('#ITEM_DEPTH_1').textContent = "상품 선택";
          currentObject.selectKey = obj.idxKey;
          currentObject.dispItemNm = obj.itemNm;
          this.addItem(this.itemSelectedListLocal, currentObject); // object 저장
          this.optionTemp = [];
          this.addCompoTemp = [];
          this.skuList = [];
        }
      }

      // 단품 선택
      if (depth == '2') {
        document.querySelector('#ITEM_DEPTH_2').textContent = optionTitle;
        currentObject.selectKey = this.optionTemp.idxKey + '_' + obj.idxKey;
        currentObject.dispItemNm = document.querySelector('#ITEM_DEPTH_1').textContent + "/" + optionTitle;
        if (this.addCompoTemp == null || this.addCompoTemp.length <= 0) {
          document.querySelector('#ITEM_DEPTH_1').textContent = "상품 선택";
          this.addItem(this.itemSelectedListLocal, currentObject);
          this.skuList = [];
          this.optionTemp = [];
        } else {
          this.skuTemp = currentObject;
          this.addCompoList = this.addCompoTemp;
        }
      }

      // 추가구성 상품 선택
      if (type == 'add') {
        if (this.isOptionList == false) {
          if (obj != null) {
            currentObject.selectKey = obj.idxKey;
            this.addItem(this.itemSelectedListLocal, null, currentObject);
          }
        } else {
          if (obj != null) {
            currentObject.selectKey = this.optionTemp.idxKey + '_' + this.skuTemp.idxKey + '_' + obj.idxKey;
          }
          document.querySelector('#ITEM_DEPTH_1').textContent = "상품 선택";
          this.addItem(this.itemSelectedListLocal, this.skuTemp, currentObject);
          this.optionTemp = [];
          this.skuTemp = [];
          this.skuList = [];
          this.addCompoList = [];
          this.addCompoTemp = [];
        }
      }
      this.selectedOptionActive = -1;
      if (type == 'sel') {
        this.$store.commit('delItemSelected');
        // this.$emit("delItemSelected");
      }
    },
    // 수량 Minus
    decreaseCount(obj, type) {
      let valueQty = parseInt(event.currentTarget.nextSibling.value);
      const minQty = parseInt(obj.itemPurchMinRestrQty); // 상품구매 최소 제한수량
      const unitQty = isNaN(obj.itemSellUnitQty) ? 1 : parseInt(obj.itemSellUnitQty); // 상품판매 단위 수량
      if (valueQty > minQty) {
        event.currentTarget.nextSibling.value = valueQty - unitQty;
        valueQty = parseInt(event.currentTarget.nextSibling.value);
        if (type == "add") {
          if (this.isOptionList == false) {
            const index = this.inArrayObject(this.itemSelectedListLocal[0].addCompo, obj.selectKey);
            const currentData = this.itemSelectedListLocal[0].addCompo[index];
            currentData.totQty = valueQty;
            currentData.totAmt = obj.sellAmt * valueQty;
          } else {
            const selectKey = obj.selectKey.split("_");
            const parentIndex = this.inArrayObject(this.itemSelectedListLocal, selectKey.length == 3 ? selectKey[0] + '_' + selectKey[1] : selectKey[0]);
            const childIndex = this.inArrayObject(this.itemSelectedListLocal[parentIndex].addCompo, obj.selectKey);
            const currentData = this.itemSelectedListLocal[parentIndex].addCompo[childIndex];
            currentData.totQty = valueQty;
            currentData.totAmt = obj.sellAmt * valueQty;
          }
        } else {
          const index = this.inArrayObject(this.itemSelectedListLocal, obj.selectKey);
          const currentData = this.itemSelectedListLocal[index];
          currentData.totQty = valueQty;
          currentData.totAmt = obj.sellAmt * valueQty;
          currentData.totMbsDcAmt = obj.mbsDcAmt * valueQty;
        }
        this.updateItem();
      }
    },

    // 수량 Plus
    increaseCount(obj, type) {
      let valueQty = parseInt(event.currentTarget.previousSibling.value);
      let maxQty = parseInt(obj.itemPurchMaxRestrQty); // 상품구매 최대 제한 수량
      const unitQty = isNaN(obj.itemSellUnitQty) ? 1 : parseInt(obj.itemSellUnitQty); // 상품판매 단위 수량
      const sellPosbQty = obj.sellPosbQty; // 판매가능 수량

      /* [S]예약상품 정보 */
      const resvPosbQtyMgntYn = this.resvInfo.itemResvPosbQtyMgntYn; // 예약가능 수량 관리 여부
      const resvSellPosbQty = parseInt(this.resvInfo.itemResvSellPosbQty); // 예약판매 가능 수량
      const resvPurchMaxRestrQty = parseInt(this.resvInfo.itemPurchMaxRestrQty); // 예약구매 최대 제한 수량
      /* [E]예약상품 정보 */

      if (resvPosbQtyMgntYn == 'Y') {
        if (resvPurchMaxRestrQty < resvSellPosbQty) {
          maxQty = resvSellPosbQty;
        }
      } else {
        if (maxQty > sellPosbQty) {
          maxQty = sellPosbQty;
        }
      }

      if (valueQty < maxQty ) {
        event.currentTarget.previousSibling.value = valueQty + unitQty;
        valueQty = parseInt(event.currentTarget.previousSibling.value);
        if (type == "add") {
          if (this.isOptionList == false) {
            const index = this.inArrayObject(this.itemSelectedListLocal[0].addCompo, obj.selectKey);
            const currentData = this.itemSelectedListLocal[0].addCompo[index];
            currentData.totQty = valueQty;
            currentData.totAmt = obj.sellAmt * valueQty;
          } else {
            const selectKey = obj.selectKey.split("_");
            const parentIndex = this.inArrayObject(this.itemSelectedListLocal, selectKey.length == 3 ? selectKey[0] + '_' + selectKey[1] : selectKey[0]);
            const childIndex = this.inArrayObject(this.itemSelectedListLocal[parentIndex].addCompo, obj.selectKey);
            const currentData = this.itemSelectedListLocal[parentIndex].addCompo[childIndex];
            currentData.totQty = valueQty;
            currentData.totAmt = obj.sellAmt * valueQty;
          }
        } else {
          const index = this.inArrayObject(this.itemSelectedListLocal, obj.selectKey);
          const currentData = this.itemSelectedListLocal[index];
          currentData.totQty = valueQty;
          currentData.totAmt = obj.sellAmt * valueQty;
          currentData.totMbsDcAmt = obj.mbsDcAmt * valueQty;
        }
        this.updateItem();
      }
    },
    // 직접입력 금액계산
    inputQty(obj, type) {
      let inQty = isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value);
      const minQty = parseInt(obj.itemPurchMinRestrQty); // 상품구매 최소 제한수량
      let maxQty = parseInt(obj.itemPurchMaxRestrQty); // 상품구매 최대 제한 수량
      const unitQty = isNaN(obj.itemSellUnitQty) ? 1 : parseInt(obj.itemSellUnitQty); // 상품판매 단위 수량
      const sellPosbQty = parseInt(obj.sellPosbQty); // 판매가능 수량

      if (inQty == 0 || inQty < minQty) {
        event.target.value = minQty;
         inQty = minQty;
        this.$gsdialog.alert('최소 구매수량은 ' + minQty + '개 입니다');
      }

      /* [S]예약상품 정보 */
      const resvPosbQtyMgntYn = this.resvInfo.itemResvPosbQtyMgntYn; // 예약가능 수량 관리 여부
      const resvSellPosbQty = this.resvInfo.itemResvSellPosbQty; // 예약판매 가능 수량
      const resvPurchMaxRestrQty = this.resvInfo.itemPurchMaxRestrQty; // 예약구매 최대 제한 수량
      /* [E]예약상품 정보 */

      if (resvPosbQtyMgntYn == 'Y') {
        if (resvPurchMaxRestrQty < resvSellPosbQty) {
          maxQty = resvSellPosbQty;
        }
      } else {
        if (maxQty > sellPosbQty) {
          maxQty = sellPosbQty;
        }
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

      if (type == "add") {
        if (this.isOptionList == false) {
          const index = this.inArrayObject(this.itemSelectedListLocal[0].addCompo, obj.selectKey);
          const currentData = this.itemSelectedListLocal[0].addCompo[index];
          currentData.totQty = inQty;
          currentData.totAmt = obj.sellAmt * inQty;
        } else {
          const selectKey = obj.selectKey.split("_");
          const parentIndex = this.inArrayObject(this.itemSelectedListLocal, selectKey.length == 3 ? selectKey[0] + '_' + selectKey[1] : selectKey[0]);
          const childIndex = this.inArrayObject(this.itemSelectedListLocal[parentIndex].addCompo, obj.selectKey);
          const currentData = this.itemSelectedListLocal[parentIndex].addCompo[childIndex];
          currentData.totQty = inQty;
          currentData.totAmt = obj.sellAmt * inQty;
        }
      } else {
        const index = this.inArrayObject(this.itemSelectedListLocal, obj.selectKey);
        const currentData = this.itemSelectedListLocal[index];
        currentData.totQty = inQty;
        currentData.totAmt = obj.sellAmt * inQty;
        currentData.totMbsDcAmt = obj.mbsDcAmt * inQty;
      }
      this.updateItem();
    },
    // 선택된 옵션 삭제
    deleteItem(obj, type) {
      const vm = this;
      if (type == 'add') {
        console.log("deleteItem this.isOptionList : "+this.isOptionList);
        if (this.isOptionList == false) {
          const addCompoData = this.itemSelectedListLocal[0].addCompo;
          const index = this.inArrayObject(addCompoData, obj.selectKey);
          addCompoData.splice(index, 1);
        } else {
          const selectKey = obj.selectKey.split("_");
          const parentIndex = vm.inArrayObject(vm.$store.state.md.itemSelectedList, selectKey.length == 3 ? selectKey[0] + '_' + selectKey[1] : selectKey[0]);
          const addCompoData = vm.$store.state.md.itemSelectedList[parentIndex].addCompo;
          const childIndex = vm.inArrayObject(addCompoData, obj.selectKey);
          // console.log("deleteItem addCompoData :: "+addCompoData.length);
          // console.log("deleteItem parentIndex :: "+parentIndex+" : "+childIndex);
          addCompoData.splice(childIndex, 1);
          const params = {
            parentIndex: parentIndex,
            addCompoData: addCompoData,
          };
          this.$store.commit('delAddCompo', params);
          // vm.$store.state.md.itemSelectedList[parentIndex].addCompo = addCompoData;
          // this.itemSelectedList[parentIndex].addCompo = addCompoData;
        }
      } else {
        const index = this.inArrayObject(this.itemSelectedListLocal, obj.selectKey);
        this.itemSelectedListLocal.splice(index, 1);
      }
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
        if (data.addCompo != null && data.addCompo.length > 0) {
          data.addCompo.forEach(function(data2, idx) {
            vm.totalAmount += data2.totAmt;
          });
        }
      });
      if (this.itemSelectedListLocal.length > 0) {
        // 상위 컴포넌트 method 호출
        const params = {
          itemData: vm.itemSelectedListLocal
        };
        vm.$store.commit('setItemSelectedList', params);
        // this.$emit("itemSelectedList", this.itemSelectedListLocal);
      }
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
      console.log("OptionDetail updateItem !!");
      const vm = this;
      const itemList = this.itemSelectedListLocal;
      this.itemSelectedListLocal = [];
      itemList.forEach(function(data, idx) {
        // vm.itemSelectedList.push(data);
        vm.itemSelectedListLocal.push(data);
      });
      this.setTotAmtCalc();
      // this.$emit("itemSelectedClear");
      this.$store.commit('delItemSelected');
    },
    // 선택된 상품 추가
    addItem(arrayList, obj, obj2) {
      const itemList = this.itemSelectedListLocal;
      if (itemList.length == 0) {
          itemList.push(obj);
          itemList[0].addCompo = [];
          if (obj2 != null) {
            itemList[0].addCompo[0] = obj2;
          }
      } else {
        if (this.isOptionList == false) {
          if (typeof(itemList[0].addCompo) === 'undefined' || typeof(itemList[0].addCompo) === null) {
            itemList[0].addCompo = [];
          }
          const index = this.inArrayObject(itemList[0].addCompo, obj2.selectKey);
          if (index == -1) {
            itemList[0].addCompo.push(obj2);
          } else if (index > -1) {
            const addCompoObject = itemList[0].addCompo[index];
            addCompoObject.totQty += addCompoObject.itemSellUnitQty;
            addCompoObject.totAmt = addCompoObject.sellAmt * addCompoObject.totQty;
            itemList[0].addCompo[index] = addCompoObject;
          }
        } else {
          const parentIndex = this.inArrayObject(itemList, obj.selectKey);
          if (parentIndex == -1) {
            const itemSize = itemList.length;
            itemList.push(obj);
            itemList[itemSize].addCompo = [];
            if (obj2 != null) {
              itemList[itemSize].addCompo[0] = obj2;
            }
          } else if (parentIndex > -1) {
            const currentObject = itemList[parentIndex];
            currentObject.totQty += currentObject.itemSellUnitQty;
            currentObject.totAmt = currentObject.sellAmt * currentObject.totQty;
            currentObject.totMbsDcAmt = currentObject.mbsDcAmt * currentObject.totQty;
            if (obj2 != null) {
              const childIndex = this.inArrayObject(itemList[parentIndex].addCompo, obj2.selectKey);
              if (childIndex == -1) {
                itemList[parentIndex].addCompo[0] = obj2;
              } else if (childIndex > -1) {
                const addCompoObject = itemList[parentIndex].addCompo[childIndex];
                addCompoObject.totQty += addCompoObject.itemSellUnitQty;
                addCompoObject.totAmt = addCompoObject.sellAmt * addCompoObject.totQty;
                currentObject.addCompo[childIndex] = addCompoObject;
              }
            }
          }
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
