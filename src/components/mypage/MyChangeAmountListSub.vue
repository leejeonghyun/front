<template>
  <div class="option-list-box">
    <div :class="'option-list include-img '+getClassItemType(ordMstItem)">
      <div class="option-list-inner" v-for="(subItem, inx) in ordSubItemList" :key="inx">
        <div class="wrap-opt">
          <span class="inp-chk">
            <input type="checkbox" name="chkSubItem" :id="'chkSubItem'+inx" v-if="subItem.pkgYn != 'Y'" :disabled="subItem.presFrgfYn == 'Y'" v-model="subItem.chkFlag" :value="subItem.ordItemSeqno" @click="changeAmount(inx)" @change="getChkItemFlag(inx)">
          </span>
          <figure>
            <span aria-label="혜택" class="ico-benefit gift" v-if="subItem.presFrgfYn == 'Y'">증정</span>
            <img :src="show(subItem.itemImg)" :alt="subItem.itemNm" @error="replaceByDefault" v-if="isNotEmpty(subItem.itemImg)"/>
            <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="subItem.itemNm" v-else />
          </figure>
          <dl>
            <dt>
              <p class="tit"><label :for="'chkSubItem'+inx">{{subItem.itemNm}}</label></p>
            </dt>
            <dd class="option-number count" v-if="subItem.chkFlag && subItem.presFrgfYn != 'Y' && subItem.pkgYn != 'Y'">
              <button type="button" class="btn-minus" @click="decreaseCount(inx)"><span class="hidden">선택수량 빼기</span></button>
              <input type="number" name="claimQty" :id="'claimQty'+inx" v-model="subItem.claimQty" value="1" class="txt-number" title="선택 수량" @change="checkMaxClaimItemQty(inx)">
              <button type="button" class="btn-plus" @click="increaseCount(inx)"><span class="hidden">선택수량 더하기</span></button>
            </dd>
            <dd class="option-number txt" v-else-if="subItem.chkFlag && subItem.presFrgfYn != 'Y' && subItem.pkgYn == 'Y'">수량: {{subItem.claimQty}}개</dd>
            <dd class="option-number txt" v-else>수량: {{subItem.ordQty}}개</dd>
            <dd class="option-number txt" v-if="(subItem.itemId != subItem.skuId) && subItem.presFrgfYn != 'Y'">옵션 : {{subItem.skuNm}}</dd>
            <!-- START : 금액정보 -->
            <dd class="list-price" aria-label="정상가격" v-if="subItem.presFrgfYn != 'Y' && subItem.pkgYn != 'Y' && isNotEmpty(subItem.itemSprc) && Number(subItem.itemSprc) > 0 && subItem.itemSprc != subItem.itemDcSprc">
              <del v-if="!subItem.chkFlag">{{toComma(Number(subItem.itemSprc) * Number(subItem.ordQty))}}</del>
              <del v-if="subItem.chkFlag">{{toComma((Number(subItem.itemSprc) * Number(subItem.claimQty)))}}</del>
              원
            </dd>
            <dd class="sale-price" aria-label="판매가격" v-if="subItem.presFrgfYn != 'Y' && subItem.pkgYn != 'Y' && isNotEmpty(subItem.itemDcSprc) && Number(subItem.itemDcSprc) > 0">
              <span class="number-sale-price" v-if="!subItem.chkFlag">{{toComma(Number(subItem.itemDcSprc) * Number(subItem.ordQty))}}</span>
              <span class="number-sale-price" v-if="subItem.chkFlag">{{toComma((Number(subItem.itemDcSprc) * Number(subItem.claimQty)))}}</span>
              <span class="unit-won">원</span>
            </dd>
            <!-- END : 금액정보 -->
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import ImgUtils from '@/common/ImgUtils';
export default {
  name: "MyChangeAmountListSub",
  data() {
    return {};
  },
  props: {
    ordInfoRslt: Object,
    ordMstItem: Object,
    ordSubItemList: Array,
    chkDelivTypeId: String,
  },
  mixins: [],
  components: {},
  methods: {
    getChkItemFlag(itemInx) {
      const addItemCnt = this.ordSubItemList.filter(itemDtl => {
        return itemDtl.chkFlag != true;
      }).length;
      if (this.ordMstItem.chkFlag != true || addItemCnt > 0) {
        document.getElementById(this.chkDelivTypeId).checked = false;
      } else {
        document.getElementById(this.chkDelivTypeId).checked = true;
      }
    },
    // 체크박스 선택
    changeAmount(inx) {
      this.ordSubItemList[inx].chkFlag = !this.ordSubItemList[inx].chkFlag;
      this.ordSubItemList[inx].claimQty = this.ordSubItemList[inx].ordQty;
      this.ordSubItemList[inx].ordClaimResnCd = '';
      // 주문교환 추가배송비 조회
      this.getCheckedItemInfo();
    },
    // chage value
    decreaseCount(inx) {
      const claimQty = event.currentTarget;
      if ( this.ordSubItemList[inx].claimQty > 1 ) {
        this.ordSubItemList[inx].claimQty -= 1;
        // 주문교환 추가배송비 조회
        this.getCheckedItemInfo();
      }
    },
    increaseCount(inx) {
      if (this.ordSubItemList[inx].claimQty < Number(this.ordSubItemList[inx].ordQty)) {
        this.ordSubItemList[inx].claimQty += 1;
        // 주문교환 추가배송비 조회
        this.getCheckedItemInfo();
      }
    },
    checkMaxClaimItemQty(inx) { // 최대클레임상품갯수 체크
      if (this.ordSubItemList[inx].claimQty > Number(this.ordSubItemList[inx].ordQty)) {
        this.ordSubItemList[inx].claimQty = this.ordSubItemList[inx].ordQty;
        this.$gsdialog.alert("수량은 주문 수량 이하로 입력 가능합니다.");
      }
      // 주문교환 추가배송비 조회
      this.getCheckedItemInfo();
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    show(uri) {
      if (this.isEmpty(uri)) {
        return;
      }
      return ImgUtils.path(uri);
    },
    replaceByDefault(e) {
      e.target.src = imgProductNothumb;
    },
    getClassItemType(itemDtl) {
      let strClass = "";
      if (itemDtl.presFrgfYn === 'Y') {
        strClass += "gift";
      } else if (itemDtl.pkgYn === 'Y') {
        strClass += "package";
      } else {
        strClass += "simply";
      }
      return strClass;
    },
    getCheckedItemInfo() {
      this.$emit('refndEvent');
    },
  },
  mounted() {},
};
</script>
