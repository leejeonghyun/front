<template>
  <div id="optionDefault" :class="{'wrap-option-popup': dispType === 'MD', 'wrap-full-popup': dispType !== 'MD', 'active': dispType === 'SS'|| dispType === 'DP'}" role="dialog" aria-modal="true">
    <div class="header-popup" v-if="dispType !== 'MD'">
      <strong>옵션 선택</strong>
    </div>
    <div :class="{'option-popup-body': dispType === 'MD', 'full-popup-body scroll-area': dispType !== 'MD'}">
      <div :class="{'inner-full-popup': dispType !== 'MD'}">

        <div class="option-content">
          <div class="selected-option-title">
            <strong aria-label="상품명">
              <span v-if="itemData.resvItemYn == 'Y' && itemData.resvKind == '02'">
                [{{resvInfo.itemStkotInstBeginD}} 배송 주문예약상품]
              </span>
              {{itemData.dspItemNm}}
            </strong>
          </div>
            <!-- ### [S]mulit option ### -->
          <span class="selected-option--block" v-for="(optnInfo, index) in optionDtlList" :key="index">
            <button class="btn-select" @click="toggleOptionList(index + 3)" :disabled="(index + 3) > mCnt">
              <span :id="'ITEM_OPTION_'+index">{{optnInfo.itemOptnNm}} - 옵션</span>
            </button>
            <OptionMultiViewList v-bind:listData="optnInfo.multiOptinList" v-bind:idx="index" v-on:selectedOption="selectedOption" v-if="optionList.length > 0 && selectedOptionActive == (index + 3) && optionDtlList.length !== (index+1)"/>
            <OptionViewList v-bind:itemSelected="itemSelected" v-bind:listData="optionListFilter()" v-bind:opv="{depth: '1', type: ''}" v-on:selectedItem="selectedItem" v-if="optionDtlList.length == (index + 1)" :style="selectedOptionActive == (optionDtlList.length + 2)?'':'display:none;'" />
         </span>
            <!-- ### [S]option depth 1 ### -->
          <div class="selected-option--block">
          <button class="btn-select" @click="toggleOptionList(0)" v-if="isOptionList" id="itemDetpth1" :style="'display:' + visibility + ';'">
            <span id="ITEM_DEPTH_1">상품 선택</span>
          </button>
          <OptionViewList v-bind:itemSelected="itemSelected" v-bind:listData="optionListFilter()" v-bind:opv="{depth: '1', type: ''}" v-on:selectedItem="selectedItem" v-if="optionList.length > 0 && selectedOptionActive == 0" />
          </div>
          <!-- ### [E]option depth 1 ### -->

          <!-- ### [S]option depth 2 ### -->
           <div class="selected-option--block">
          <button class="btn-select" @click="toggleOptionList(1)" v-if="skuList !== null && skuList.length > 0">
            <span id="ITEM_DEPTH_2">옵션 선택</span>
          </button>
          <OptionViewList v-bind:listData="skuList" v-bind:opv="{depth: '2', type: ''}" v-on:selectedItem="selectedItem" v-if="skuList !== null && skuList.length > 0 && selectedOptionActive == 1" />
          <!-- ### [E]option depth 2 ### -->
          </div>
          <div class="option-add-list">
            <strong class="hidden">옵션에서 선택한 리스트</strong>
            <!-- [S]옵션에서 선택한 리스트 -->
            <itemSelectedList v-bind:itemSelectedList="itemSelectedListLocal" v-bind:spv="{type: ''}" v-bind:isOptionList="isOptionList" @deleteItem="deleteItem" @decreaseCount="decreaseCount" @increaseCount="increaseCount" @inputQty="inputQty"/>
            <!-- [E]옵션에서 선택한 리스트 -->
            <!-- ### [S]추가구성 상품 ### -->
            <div class="selected-option--block">
            <button class="btn-select" @click="toggleOptionList(2)" v-if="addCompoList !== null && addCompoList.length > 0">
              <span id="ADD_ITEM">추가구성품</span>
            </button>
            <OptionViewList v-bind:listData="addCompoList" v-bind:opv="{depth: '', type: 'add'}" v-on:selectedItem="selectedItem" v-if="itemSelectedListLocal != null && itemSelectedListLocal[0] != null && selectedOptionActive == 2" />
            </div>
            <!-- ### [E]추가구성 상품 ### -->
            <!-- [S]추가구성품에서 선택한 리스트 -->
            <itemAddSelectedList v-if="itemSelectedListLocal != null && itemSelectedListLocal[0] != null && itemSelectedListLocal[0].addCompo != null && itemSelectedListLocal[0].addCompo[0] != null" v-bind:itemSelectedList="itemSelectedListLocal" v-bind:spv="{type: ''}" v-bind:isOptionList="isOptionList" @deleteItem="deleteItem" @decreaseCount="decreaseCount" @increaseCount="increaseCount" @inputQty="inputQty"/>
            <!-- [E]옵션에서 선택한 리스트 -->
          </div>
        </div>
        <div class="option-footer">
          <!-- [S] 총합계 DIV -->
          <div class="option-total-price">
            <span class="total-title" aria-label="옵션가를 포함한"><strong>총 상품금액</strong></span>
            <span class="total-price"><strong>{{totalAmount >= totalDcAmount ? totalDcAmount : totalAmount | toCurrency}}</strong>원</span>
          </div>
          <!-- [E] 총합계 DIV -->

          <!-- [S]프로모션 -->
          <PromotionView v-bind:promInfo="promInfo" v-if="promInfo.itemProm !== null || promInfo.fitmPromItem !== null" v-on:selectedItem="selectedItem" v-bind:opv="{depth: '', type: 'prom'}"/>
          <!-- [E]프로모션 -->

          <!-- [S] 장바구니, 바로구매 -->
          <div v-if="dispType !== 'MD'" class="option-footer-btn">
            <button class="btn-bg darkgray btn-md" @click="setOrder('C')">장바구니</button>
            <button class="btn-bg lightgreen btn-md" @click="setOrder('S')">바로구매</button>
          </div>
          <!-- [E] 장바구니, 바로구매 -->
        </div>
      </div>
    </div>
    <button v-if="dispType !== 'MD'" class="btn-layer-close"  @click="popupAction('optionDefault')" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>

import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import itemSelectedList from '@/views/md/itemSelectedList';
import itemAddSelectedList from '@/views/md/itemAddSelectedList';
import OptionViewList from '@/views/md/MFOptionViewList';
import OptionMultiViewList from '@/views/md/MFOptionMultiViewList';
import PromotionView from '@/views/md/PromotionView';
import StringUtils from '@/common/StringUtils';

export default {
  name: "OptionDefault",
  metaInfo: {
    title: 'GS fresh',
    // titleTemplate: '상품상세 < %s'
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
        totalDcAmount: 0,
        totalMbsDcAmount: 0,
        itemSelectedListLocal: this.$store.state.md.itemSelectedList,
        itemSelected: this.$store.state.md.itemSelected,
        optionTemp: {},
        optionList: [],
        skuList: [],
        skuTemp: {},
        addCompoList: [],
        addCompoTemp: [],
        resvInfo: [],
        promInfo: {},
        selectedOptionActive: -1,
        isOptionList: false,
        aaaa: "",
        bbbb: "",
        cccc: "",
        optionDtlList: [],
        optionArray: [],
        optionReArray: [],
        mCnt: 3,
        visibility: 'visible'
    };
  },
  components: {
    itemSelectedList,
    itemAddSelectedList,
    OptionViewList,
    PromotionView,
    OptionMultiViewList
  },
  created: async function() {
    try {
      const data = this.$props.itemData;
      if (Object.keys(data).length > 0) {
        this.$props.params.repItemId = this.$props.itemData.repItemId;
      }
       this.getOptItemList();
       this.getMultiOptionList();
    } catch (e) {
      // this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.error("OptionDefault Created error", e);
      // });
    }
  },
  mounted: async function() {
   // this.getOptItemList();

    /* [resvItemYn][Y:예약상품], [resvKind][01:날짜 지정형, 02:날짜 고정형] */
    if (this.$props.itemData.resvItemYn == 'Y' && this.$props.itemData.resvKind == '02') {
      this.resvInfo = this.$props.itemData.resvInfo;
    }

    if (this.itemSelected != null && this.itemSelected != undefined && this.itemSelected.itemId != undefined) {
      this.toggleOptionList(0);
    }

    /*
    if (this.$props.dispType == 'MD') {
      this.modalActiveEvent('optionDefault');
    }
    */
  },
  methods: {
    /* #################### Data Access #################### */
    /* ### [S]옵션정보 조회 ### */
    getOptItemList: async function() {
      // 01:일반상품, 02:패키지, 03:선택형, 04:대용량정육
      console.log(" this.$props.itemData.itemCompoCd " + this.$props.itemData.itemCompoCd);
      let url = "/fo/md/mf/iteminfomgnt/normal-item-list";
      if (this.$props.itemData.itemCompoCd == "01") {
        url = "/fo/md/mf/iteminfomgnt/normal-item-list";
      } else if (this.$props.itemData.itemCompoCd == "03") {
        url = "/fo/md/mf/iteminfomgnt/optional-item-list";
      }
      if (this.$props.itemData.mallId === '1' || this.$props.itemData.mallId === '11') {
        url = "/fo/md/iteminfomgnt/normal-item-list";
        if (this.$props.itemData.itemCompoCd == "03") {
          url = "/fo/md/iteminfomgnt/optional-item-list";
        }
      }
      try {
        console.log(url + JSON.stringify(this.$props.params));
        const result = await ApiUtils.get(url, this.$props.params);
        if (result.data.data != null) {
         // console.log(" result.data.data ", JSON.stringify(result.data.data));
          if (result.data.data.length == 1 && this.optionDtlList.length == 0) { // this.$props.itemData.itemCompoCd == '01') {
            const obj = result.data.data[0];
            // this.optionList = result.data.data;
            obj.itemNm = this.$props.itemData.itemNm;
            obj.dispItemNm = obj.itemNm;
            obj.delivTypeCd = CookieUtils.isDayBreak() ? '04' : obj.delivTypeCd;

            if (this.itemSelectedListLocal.length == 0) {
             this.itemSelectedListLocal.push(obj);
              this.itemSelectedListLocal[0].prom = [];
              console.log("itemSelectedListLocal", this.itemSelectedListLocal);
            }
            this.getAddCompoItemList(); // 추가구성 상품 조회
            this.getPromInfo(this.$props.params); // 프로모션 조회
            this.isOptionList = false;
          } else {
            this.optionList = result.data.data; // aaaa.filter(e => (e.optVal === 'MFEXOP0011/MFEXOP0023/MFEXOP0032/MFEXOP0042/MFEXOP0052')); // result.data.data; // .filter(e => (e.optVal === 'MFEXOP0011/MFEXOP0023/MFEXOP0032/MFEXOP0042/MFEXOP0052')); // result.data.data;
            this.isOptionList = true;
            this.addCompoList = result.data.data[0].addCompoItemList;
            console.log(" optionList ", JSON.stringify(this.optionList), this.isOptionList);
          }
          console.log(" this.addCompoList "+ this.addCompoList);
          this.setTotAmtCalc();
        }
      } catch (e) {
        // this.$gsdialog.alert('상품정보 조회시 오류가 발생했습니다.').then(dialog => {
          console.error("상품정보 조회시 오류가 발생했습니다[getOptItemList]", e);
        // });
      }
    },
    getMultiOptionList: async function() {
      try {
        const result = await ApiUtils.get("/fo/md/mf/iteminfomgnt/multi-option-list", this.$props.params);
        if (result.data.success) {
          this.optionDtlList = result.data.data;
         // this.optionArray = [this.optionDtlList.length];
        }
        if (this.optionDtlList.length > 0) {
          this.visibility = 'none';
        }
        console.log(" this.optionDtlList " + JSON.stringify(this.optionDtlList));
      } catch (e) {
        // this.$gsdialog.alert('상품정보 조회시 오류가 발생했습니다.').then(dialog => {
          console.error("상품정보 조회시 오류가 발생했습니다[getMultiOptionList]", e);
        // });
      }
    },
    optionListFilter: function() {
       // MFEXOP0011,MFEXOP0023,MFEXOP0032,MFEXOP0042,MFEXOP0052
      return this.optionList.filter((e)=>{
              const opLength = this.optionReArray.length;
              if (opLength == 1) {
                 return e.optVal.indexOf(this.optionReArray[0])!=-1; // e.optVal.indexOf(this.aaaa)!=-1;
              } else if (opLength == 2) {
                return e.optVal.indexOf(this.optionReArray[0])!=-1 && e.optVal.indexOf(this.optionReArray[1])!=-1;
              } else if (opLength == 3) {
                return e.optVal.indexOf(this.optionReArray[0])!=-1 && e.optVal.indexOf(this.optionReArray[1])!=-1 && e.optVal.indexOf(this.optionReArray[2])!=-1;
              } else if (opLength == 4) {
                return e.optVal.indexOf(this.optionReArray[0])!=-1 && e.optVal.indexOf(this.optionReArray[1])!=-1 && e.optVal.indexOf(this.optionReArray[2])!=-1 && e.optVal.indexOf(this.optionReArray[3])!=-1;
              } else if (opLength == 5) {
                return e.optVal.indexOf(this.optionReArray[0])!=-1 && e.optVal.indexOf(this.optionReArray[1])!=-1 && e.optVal.indexOf(this.optionReArray[2])!=-1 && e.optVal.indexOf(this.optionReArray[3])!=-1 && e.optVal.indexOf(this.optionReArray[4])!=-1;
              } else {
                console.log("  opLength  " + opLength);
                return this.optionList;
              }
             // return e.optVal.includes(this.optionArray); // e.optVal.indexOf(this.aaaa)!=-1;
              });
    },
    /* ### [S]추가구성 상품 조회 ### */
    getAddCompoItemList: async function() {
      try {
        console.log('/fo/md/mf/iteminfomgnt/add-component-item-list' + JSON.stringify(this.$props.params));
        const result = await ApiUtils.get('/fo/md/mf/iteminfomgnt/add-component-item-list', this.$props.params);
        if (result.data.data != null) {
          this.addCompoList = result.data.data;
        }
      } catch (e) {
        // this.$gsdialog.alert('추가구성상품 조회시 오류가 발생했습니다.').then(dialog => {
          console.error("추가구성상품 조회시 오류가 발생했습니다[getAddCompoItemList]", e);
        // });
      }
    },
    /* ### [S]프로모션 조회 ### */
    getPromInfo: async function(p) {
      try {
        const result = await ApiUtils.get('/fo/md/iteminfomgnt/prom-info', p);
        if (result.data.data != null) {
          this.promInfo = result.data.data;
        }
      } catch (e) {
        // this.$gsdialog.alert('프로모션 조회시 오류가 발생했습니다.').then(dialog => {
          console.error('프로모션 조회시 오류가 발생했습니다[getPromInfo]', e);
        // });
      }
    },
    /* #################### Event #################### */
    toggleOptionList(id) {
      this.selectedOptionActive == id ? this.selectedOptionActive = -1 : this.selectedOptionActive = id;
    },
    popupAction(p) {
      this.$emit('popupAction', p);
    },
    setOrder(p) {
      this.$emit('setOrder', p);
    },
    // 옵션 선택
    selectedItem(obj, depth, type) {
      console.log(JSON.stringify(obj)+"selectedItem ::::: "+depth+"type"+type);
      let optionTitle = "";
      if (type == 'sel') {
        optionTitle = obj.itemNm;
      } else {
        optionTitle = event.currentTarget.querySelector('.option-title').textContent;
      }
      let currentObject;
      if (obj != null) {
        console.log("111111111111111111111111");
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
            "dcAmt": obj.dcAmt,
            "itemSellUnitQty": obj.itemSellUnitQty,
            "itemPurchMinRestrQty": obj.itemPurchMinRestrQty,
            "itemPurchMaxRestrQty": obj.itemPurchMaxRestrQty,
            "sellPosbQty": obj.sellPosbQty,
            "dblePrcIndYn": obj.dblePrcIndYn,
            "totQty": obj.totQty,
            "totAmt": obj.totAmt,
            "totDcAmt": obj.totDcAmt,
            "totMbsDcAmt": obj.totMbsDcAmt,
            "delivTypeCd": CookieUtils.isDayBreak()?'04':obj.delivTypeCd,
            "skuAddAmt": obj.skuAddAmt,
            "ofsYn": obj.ofsYn,
            // "delivTypeCd": obj.delivTypeCd
        };
        console.log(obj.skuAmt + "2222222222222222" + JSON.stringify(currentObject));
      }
       console.log("333333   " + depth);
      // 옵션 선택
      if (depth == '1') {
        this.skuList = [];
       // this.addCompoList = []; 삭제
        this.skuTemp = {};
        this.addCompoTemp = {};
        document.querySelector('#ITEM_DEPTH_1').textContent = optionTitle;
        obj.selectKey = obj.idxKey;
        this.optionTemp = obj;
        this.addCompoTemp = obj.addCompoItemList;
        this.skuList = obj.itemSkuInfoList;
        // 옵션이 없을 경우
        if (obj.itemSkuInfoList == null || obj.itemSkuInfoList.length <= 0) {
          // 추가구성상품이 없을경우
         // if (this.addCompoTemp == null || this.addCompoTemp.length <= 0) { 삭제
            document.querySelector('#ITEM_DEPTH_1').textContent = "상품 선택";
            currentObject.selectKey = obj.idxKey;
            currentObject.dispItemNm = obj.itemNm;
            this.addItem(this.itemSelectedListLocal, currentObject); // object 저장
            this.optionTemp = [];
            this.skuList = [];
            this.addCompoTemp = [];
         // } else {   삭제
           // this.addCompoList = this.addCompoTemp;   삭제
         // }   삭제
        }
      }

      // 단품 선택
      if (depth == '2') {
        document.querySelector('#ITEM_DEPTH_2').textContent = optionTitle;
        currentObject.selectKey = this.optionTemp.idxKey + '_' + obj.idxKey;
        currentObject.dispItemNm = document.querySelector('#ITEM_DEPTH_1').textContent + "/" + optionTitle;
        // 추가 구성품이 없을경우
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
        // 옵션 선택이 없을 경우
        if (this.isOptionList == false) {
          if (obj != null) {
            currentObject.selectKey = obj.idxKey;
            this.addItem(this.itemSelectedListLocal, null, currentObject);
          }
        } else {
          // 옵션이 존재 할 경우
          if (this.skuTemp != null && this.skuTemp.length > 0) {
            if (obj != null) {
              currentObject.selectKey = this.optionTemp.idxKey + '_' + this.skuTemp.idxKey + '_' + obj.idxKey;
            }
            this.addItem(this.itemSelectedListLocal, this.skuTemp, currentObject);
          } else {
            if (obj != null) {
              currentObject.selectKey = this.optionTemp.idxKey + '_' + obj.idxKey;
            }
            this.optionTemp.dispItemNm = this.optionTemp.itemNm;
            this.addItem(this.itemSelectedListLocal, this.optionTemp, currentObject, type);
          }
          document.querySelector('#ITEM_DEPTH_1').textContent = "상품 선택";
          // this.addItem(this.itemSelectedListLocal, this.skuTemp, currentObject);
          this.optionTemp = [];
          this.skuTemp = [];
          this.skuList = [];
         // this.addCompoList = []; 삭제
          this.addCompoTemp = [];
        }
      }
      // 프로모션 선택
      if (type == 'prom') {
        this.itemSelectedListLocal[0].prom.push(obj);
      }
      this.selectedOptionActive = -1;
      if (type == 'sel') {
        this.$store.commit('delItemSelected');
      }
    },
    selectedItemTmp(obj, depth, type) {
      console.log(JSON.stringify(obj)+"selectedItem ::::: "+depth+"type"+type);
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
            "dcAmt": obj.dcAmt,
            "itemSellUnitQty": obj.itemSellUnitQty,
            "itemPurchMinRestrQty": obj.itemPurchMinRestrQty,
            "itemPurchMaxRestrQty": obj.itemPurchMaxRestrQty,
            "sellPosbQty": obj.sellPosbQty,
            "dblePrcIndYn": obj.dblePrcIndYn,
            "totQty": obj.totQty,
            "totAmt": obj.totAmt,
            "totDcAmt": obj.totDcAmt,
            "totMbsDcAmt": obj.totMbsDcAmt,
            "delivTypeCd": CookieUtils.isDayBreak()?'04':obj.delivTypeCd
            // "delivTypeCd": obj.delivTypeCd
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
        // 옵션이 없을 경우
        if (obj.itemSkuInfoList == null || obj.itemSkuInfoList.length <= 0) {
          // 추가구성상품이 없을경우
          if (this.addCompoTemp == null || this.addCompoTemp.length <= 0) {
            document.querySelector('#ITEM_DEPTH_1').textContent = "상품 선택";
            currentObject.selectKey = obj.idxKey;
            currentObject.dispItemNm = obj.itemNm;
            this.addItem(this.itemSelectedListLocal, currentObject); // object 저장
            this.optionTemp = [];
            this.skuList = [];
            this.addCompoTemp = [];
          } else {
            this.addCompoList = this.addCompoTemp;
          }
        }
      }

      // 단품 선택
      if (depth == '2') {
        document.querySelector('#ITEM_DEPTH_2').textContent = optionTitle;
        currentObject.selectKey = this.optionTemp.idxKey + '_' + obj.idxKey;
        currentObject.dispItemNm = document.querySelector('#ITEM_DEPTH_1').textContent + "/" + optionTitle;
        // 추가 구성품이 없을경우
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
        // 옵션 선택이 없을 경우
        if (this.isOptionList == false) {
          if (obj != null) {
            currentObject.selectKey = obj.idxKey;
            this.addItem(this.itemSelectedListLocal, null, currentObject);
          }
        } else {
          // 옵션이 존재 할 경우
          if (this.skuTemp != null && this.skuTemp.length > 0) {
            if (obj != null) {
              currentObject.selectKey = this.optionTemp.idxKey + '_' + this.skuTemp.idxKey + '_' + obj.idxKey;
            }
            this.addItem(this.itemSelectedListLocal, this.skuTemp, currentObject, type);
          } else {
            if (obj != null) {
              currentObject.selectKey = this.optionTemp.idxKey + '_' + obj.idxKey;
            }
            this.optionTemp.dispItemNm = this.optionTemp.itemNm;
            this.addItem(this.itemSelectedListLocal, this.optionTemp, currentObject);
          }
          document.querySelector('#ITEM_DEPTH_1').textContent = "상품 선택";
          // this.addItem(this.itemSelectedListLocal, this.skuTemp, currentObject);
          this.optionTemp = [];
          this.skuTemp = [];
          this.skuList = [];
          this.addCompoList = [];
          this.addCompoTemp = [];
        }
      }
      // 프로모션 선택
      if (type == 'prom') {
        this.itemSelectedListLocal[0].prom.push(obj);
      }
      this.selectedOptionActive = -1;
      if (type == 'sel') {
        this.$store.commit('delItemSelected');
      }
    },
    selectedOption(obj, idx) {
      if (obj != null) {
       console.log(idx + " selectedOption  " + JSON.stringify(obj));
       this.optionArray[idx] = obj.itemOptnValCd;
       document.querySelector('#ITEM_OPTION_' + idx).textContent = this.optionDtlList[idx].itemOptnNm + " - " + obj.itemOptnValNm;
       console.log(" optionArray  " + JSON.stringify(this.optionArray));
      // document.querySelector('#ITEM_OPTION_' + (idx + 1)).disabled = "disabled";
       } else {
        this.optionArray[idx] = "";
        console.log(" optionArray null " + JSON.stringify(this.optionArray));
        document.querySelector('#ITEM_OPTION_' + idx).textContent = this.optionDtlList[idx].itemOptnNm + " - " + "옵션";
       }
       let j=0;
       this.optionReArray = [];
       for (let i=0; i < this.optionArray.length; i++) {
         if (!StringUtils.isEmpty(this.optionArray[i])) {
           this.optionReArray[j] = this.optionArray[i];
           j = j + 1;
         }
       }
       this.mCnt = (idx + 4);
       console.log(this.optionDtlList.length + "  this.mCnt  " + this.mCnt);
      if (this.optionDtlList.length == (idx + 1)) {
      //  this.toggleOptionList(0);
        console.log(" this.optionList " + JSON.stringify(this.optionListFilter()[0]));
        if (this.optionListFilter().length == 1) {
          this.selectedItem(this.optionListFilter()[0], '1', ''); // {depth: '1', type: ''}
          for (let i=0; i < this.optionDtlList.length; i++) {
          document.querySelector('#ITEM_OPTION_' + i).textContent = this.optionDtlList[i].itemOptnNm + " - " + "옵션";
            // this.optionReArray[i] = "";
          }
          this.optionArray = [];
          this.optionReArray = [];
          console.log(this.optionListFilter().length);
        } else {
          this.visibility = 'visible';
           this.toggleOptionList(0);
        }
        this.mCnt = 3;
      } else {
        this.toggleOptionList(this.mCnt);
      }
       console.log(" optionReArray " + JSON.stringify(this.optionReArray));
    },
    // 수량 Minus
    decreaseCount(obj, type) {
      let valueQty = parseInt(event.currentTarget.nextSibling.value);
      const minQty = parseInt(obj.itemPurchMinRestrQty); // 상품구매 최소 제한수량
      const unitQty = isNaN(obj.itemSellUnitQty) ? 1 : parseInt(obj.itemSellUnitQty); // 상품판매 단위 수량

      if (valueQty <= minQty) {
        this.$gsdialog.alert('최소 구매수량은 ' + minQty + '개 입니다');
        return;
      }

      if (valueQty > minQty) {
        event.currentTarget.nextSibling.value = valueQty - unitQty;
        valueQty = parseInt(event.currentTarget.nextSibling.value);
        if (type == "add") {
          if (this.isOptionList == false) {
            const index = this.inArrayObject(this.itemSelectedListLocal[0].addCompo, obj.selectKey);
            const currentData = this.itemSelectedListLocal[0].addCompo[index];
            currentData.totQty = valueQty;
            currentData.totAmt = obj.sellAmt * valueQty;
            currentData.totDcAmt = obj.dcAmt * valueQty;
          } else {
            const selectKey = obj.selectKey.split("_");
            const parentIndex = 0; // 삭제 this.inArrayObject(this.itemSelectedListLocal, selectKey.length == 3 ? selectKey[0] + '_' + selectKey[1] : selectKey[0]);
           // const childIndex = this.inArrayObject(this.itemSelectedListLocal[parentIndex].addCompo, obj.selectKey);
            const childIndex = this.inArrayObject(this.itemSelectedListLocal[parentIndex].addCompo, obj.selectKey);
            const currentData = this.itemSelectedListLocal[parentIndex].addCompo[childIndex];
            currentData.totQty = valueQty;
            currentData.totAmt = obj.sellAmt * valueQty;
            currentData.totDcAmt = obj.dcAmt * valueQty;
          }
        } else {
          const index = this.inArrayObject(this.itemSelectedListLocal, obj.selectKey);
          const currentData = this.itemSelectedListLocal[index];
          currentData.totQty = valueQty;
          currentData.totAmt = (obj.sellAmt + (obj.skuAddAmt || 0)) * valueQty;
          currentData.totDcAmt = (obj.dcAmt + (obj.skuAddAmt || 0)) * valueQty;
          currentData.totMbsDcAmt = (obj.mbsDcAmt + (obj.skuAddAmt || 0)) * valueQty;
        }
        this.updateItem();
      }
    },

    // 수량 Plus
    increaseCount(obj, type) {
      console.log("=======obj=======" + JSON.stringify(obj));
      let valueQty = parseInt(event.currentTarget.previousSibling.value);
      let maxQty = parseInt(obj.itemPurchMaxRestrQty); // 상품구매 최대 제한 수량
      const unitQty = isNaN(obj.itemSellUnitQty) ? 1 : parseInt(obj.itemSellUnitQty); // 상품판매 단위 수량
      const sellPosbQty = parseInt(obj.sellPosbQty); // 판매가능 수량

      /* [S]예약상품 정보 */
      /* [resvItemYn][Y:예약상품], [resvKind][01:날짜 지정형, 02:날짜 고정형] */
      let resvPosbQtyMgntYn = null;
      let resvSellPosbQty = null;
      let resvPurchMaxRestrQty = null;
      if (this.$props.itemData.resvItemYn == 'Y' && this.$props.itemData.resvKind == '02') {
        resvPosbQtyMgntYn = this.resvInfo.itemResvPosbQtyMgntYn; // 예약가능 수량 관리 여부
        resvSellPosbQty = parseInt(this.resvInfo.itemResvSellPosbQty); // 예약판매 가능 수량
        resvPurchMaxRestrQty = parseInt(this.resvInfo.itemPurchMaxRestrQty); // 예약구매 최대 제한 수량
      }
      /* [E]예약상품 정보 */

      if (resvPosbQtyMgntYn == 'Y') {
        if (resvPurchMaxRestrQty < resvSellPosbQty) {
          maxQty = resvSellPosbQty;
        }
      } else {
        if (maxQty > sellPosbQty) {
        //  maxQty = sellPosbQty;
        }
      }

      if (valueQty >= maxQty) {
        this.$gsdialog.alert('최대 구매수량은 ' + maxQty + '개 입니다');
        return;
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
            currentData.totDcAmt = obj.dcAmt * valueQty;
          } else {
            const selectKey = obj.selectKey.split("_");
            const parentIndex = 0; // 삭제  this.inArrayObject(this.itemSelectedListLocal, selectKey.length == 3 ? selectKey[0] + '_' + selectKey[1] : selectKey[0]);
            const childIndex = this.inArrayObject(this.itemSelectedListLocal[parentIndex].addCompo, obj.selectKey);
            const currentData = this.itemSelectedListLocal[parentIndex].addCompo[childIndex];
            currentData.totQty = valueQty;
            currentData.totAmt = obj.sellAmt * valueQty;
            currentData.totDcAmt = obj.dcAmt * valueQty;
          }
        } else {
          const index = this.inArrayObject(this.itemSelectedListLocal, obj.selectKey);
          console.log(" obj " + JSON.stringify(obj));
          const currentData = this.itemSelectedListLocal[index];
          currentData.totQty = valueQty;
          currentData.totAmt = (obj.sellAmt + (obj.skuAddAmt || 0)) * valueQty;
          currentData.totDcAmt = (obj.dcAmt + (obj.skuAddAmt || 0)) * valueQty;
          currentData.totMbsDcAmt = (obj.mbsDcAmt + (obj.skuAddAmt || 0)) * valueQty;
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
      const sellPosbQty = obj.sellPosbQty; // 판매가능 수량

      if (inQty == 0 || inQty < minQty) {
        event.target.value = minQty;
        inQty = minQty;
        this.$gsdialog.alert('최소 구매수량은 ' + minQty + '개 입니다');
      }

      /* [S]예약상품 정보 */
      /* [resvItemYn][Y:예약상품], [resvKind][01:날짜 지정형, 02:날짜 고정형] */
      let resvPosbQtyMgntYn = null;
      let resvSellPosbQty = null;
      let resvPurchMaxRestrQty = null;
      if (this.$props.itemData.resvItemYn == 'Y' && this.$props.itemData.resvKind == '02') {
        resvPosbQtyMgntYn = this.resvInfo.itemResvPosbQtyMgntYn; // 예약가능 수량 관리 여부
        resvSellPosbQty = parseInt(this.resvInfo.itemResvSellPosbQty); // 예약판매 가능 수량
        resvPurchMaxRestrQty = parseInt(this.resvInfo.itemPurchMaxRestrQty); // 예약구매 최대 제한 수량
      }
      /* [E]예약상품 정보 */

      if (resvPosbQtyMgntYn == 'Y') {
        if (resvPurchMaxRestrQty < resvSellPosbQty) {
          maxQty = resvSellPosbQty;
        }
      } else {
        if (maxQty > sellPosbQty) {
         // maxQty = sellPosbQty;
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
          currentData.totDcAmt = obj.dcAmt * inQty;
        } else {
          const selectKey = obj.selectKey.split("_");
          const parentIndex = this.inArrayObject(this.itemSelectedListLocal, selectKey.length == 3 ? selectKey[0] + '_' + selectKey[1] : selectKey[0]);
          const childIndex = this.inArrayObject(this.itemSelectedListLocal[parentIndex].addCompo, obj.selectKey);
          const currentData = this.itemSelectedListLocal[parentIndex].addCompo[childIndex];
          currentData.totQty = inQty;
          currentData.totAmt = obj.sellAmt * inQty;
          currentData.totDcAmt = obj.dcAmt * inQty;
        }
      } else {
        const index = this.inArrayObject(this.itemSelectedListLocal, obj.selectKey);
        const currentData = this.itemSelectedListLocal[index];
        currentData.totQty = inQty;
        currentData.totAmt = obj.sellAmt * inQty;
        currentData.totDcAmt = obj.dcAmt * inQty;
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
          const parentIndex = 0; // vm.inArrayObject(vm.$store.state.md.itemSelectedList, selectKey.length == 3 ? selectKey[0] + '_' + selectKey[1] : selectKey[0]);
          const addCompoData = vm.$store.state.md.itemSelectedList[parentIndex].addCompo;
          const childIndex = vm.inArrayObject(addCompoData, obj.selectKey);
          console.log("deleteItem addCompoData :: "+addCompoData.length);
          console.log("deleteItem parentIndex :: "+parentIndex+" : "+childIndex);
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
        const selCnt = this.itemSelectedListLocal.length;
        if (index == 0 && selCnt == 1) {
          this.itemSelectedListLocal.splice(index, 1);
        } else {
          this.itemSelectedListLocal[1].addCompo = this.itemSelectedListLocal[0].addCompo;
          this.itemSelectedListLocal.splice(index, 1);
        }
      }
      this.updateItem();
    },
    /* #################### Function #################### */
    // 합계금액 계산
    setTotAmtCalc() {
      const vm = this;
      vm.totalBfrAmount = 0;
      vm.totalAmount = 0;
      vm.totalDcAmount = 0;
      vm.totalMbsDcAmount = 0;
      this.itemSelectedListLocal.forEach(function(data, idx) {
        vm.totalBfrAmount += data.totBfrAmt;
        vm.totalAmount += data.totAmt;
        vm.totalDcAmount += data.totDcAmt;
        vm.totalMbsDcAmount += data.totMbsDcAmt;
        if (data.addCompo != null && data.addCompo.length > 0) {
          data.addCompo.forEach(function(data2, idx) {
            vm.totalAmount += data2.totAmt;
            vm.totalDcAmount += data2.totDcAmt;
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
addItem(arrayList, obj, obj2, type) {
      const itemList = this.itemSelectedListLocal;
      if (itemList.length == 0) {
         console.log("  itemList.length  " + itemList.length);
          itemList.push(obj);
          itemList[0].addCompo = [];
          if (obj2 != null) {
            itemList[0].addCompo[0] = obj2;
          }
      } else {
        if (this.isOptionList == false) {
          console.log("  this.isOptionList  " + this.isOptionList);
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
            addCompoObject.totDcAmt = addCompoObject.dcAmt * addCompoObject.totQty;
            itemList[0].addCompo[index] = addCompoObject;
          }
        } else {
         // alert(type);
          if (type === 'add') {
            console.log("  this.isOptionList  " + this.isOptionList);
            if (typeof(itemList[0].addCompo) === 'undefined' || typeof(itemList[0].addCompo) === null) {
              console.log("  this.isOptionList  undefined" + this.isOptionList);
              itemList[0].addCompo = [];
            }
            const index = this.inArrayObject(itemList[0].addCompo, obj2.selectKey);
            if (index == -1) {
              itemList[0].addCompo.push(obj2);
            } else if (index > -1) {
              const addCompoObject = itemList[0].addCompo[index];
              addCompoObject.totQty += addCompoObject.itemSellUnitQty;
              addCompoObject.totAmt = addCompoObject.sellAmt * addCompoObject.totQty;
              addCompoObject.totDcAmt = addCompoObject.dcAmt * addCompoObject.totQty;
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
              currentObject.totDcAmt = currentObject.dcAmt * currentObject.totQty;
              currentObject.totMbsDcAmt = currentObject.mbsDcAmt * currentObject.totQty;
              if (obj2 != null) {
                const childIndex = this.inArrayObject(itemList[parentIndex].addCompo, obj2.selectKey);
                if (childIndex == -1) {
                  itemList[parentIndex].addCompo[0] = obj2;
                } else if (childIndex > -1) {
                  const addCompoObject = itemList[parentIndex].addCompo[childIndex];
                  addCompoObject.totQty += addCompoObject.itemSellUnitQty;
                  addCompoObject.totAmt = addCompoObject.sellAmt * addCompoObject.totQty;
                  addCompoObject.totDcAmt = addCompoObject.dcAmt * addCompoObject.totQty;
                  currentObject.addCompo[childIndex] = addCompoObject;
                }
              }
            }
          }
        }
      }
      this.updateItem();
    },
    addItemTmp(arrayList, obj, obj2) {
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
            addCompoObject.totDcAmt = addCompoObject.dcAmt * addCompoObject.totQty;
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
            currentObject.totDcAmt = currentObject.dcAmt * currentObject.totQty;
            currentObject.totMbsDcAmt = currentObject.mbsDcAmt * currentObject.totQty;
            if (obj2 != null) {
              const childIndex = this.inArrayObject(itemList[parentIndex].addCompo, obj2.selectKey);
              if (childIndex == -1) {
                itemList[parentIndex].addCompo[0] = obj2;
              } else if (childIndex > -1) {
                const addCompoObject = itemList[parentIndex].addCompo[childIndex];
                addCompoObject.totQty += addCompoObject.itemSellUnitQty;
                addCompoObject.totAmt = addCompoObject.sellAmt * addCompoObject.totQty;
                addCompoObject.totDcAmt = addCompoObject.dcAmt * addCompoObject.totQty;
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
