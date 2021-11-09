<template>
  <ul class="cart-product-list selected-list">
    <li v-for="(itemDtl, inx) in ordMstItemList" :key="inx">
      <dl>
        <dt>
          <span class="inp-chk">
            <!-- 첫구매/맛보기/사은품은 체크박스가 비활성화한다. -->
            <input type="checkbox" name="chkList" :id="'chkList'+inx" :disabled="itemDtl.firPurchItemYn == 'Y' || itemDtl.presFrgfYn == 'Y' || itemDtl.sampItemYn == 'Y'" v-model="itemDtl.chkFlag" :value="itemDtl.ordItemSeqno" @click="changeAmount(inx)" @change="getChkItemFlag(inx)">
            <label :for="'chkList'+inx">{{itemDtl.itemNm}}</label>
          </span>
        </dt>
        <dd class="thumb">
          <a href="#">
            <figure>
              <span aria-label="혜택" class="ico-benefit plus" v-if="itemDtl.nplsoneYn == 'Y'">{{itemDtl.nplsoneVal+'+1'}}</span>
              <img :src="show(itemDtl.itemImg)" :alt="itemDtl.itemNm" @error="replaceByDefault" v-if="isNotEmpty(itemDtl.itemImg)"/>
              <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="itemDtl.itemNm" v-else />
            </figure>
          </a>
        </dd>
        <dd class="shop">{{itemDtl.cmmSteNm}}</dd>
        <dd class="count" v-if="!itemDtl.chkFlag || itemDtl.firPurchItemYn == 'Y' || itemDtl.presFrgfYn == 'Y' || itemDtl.sampItemYn == 'Y'">
          <p class="point" v-if="itemDtl.firPurchItemYn == 'Y'">첫 구매 혜택</p>
          <p class="point" v-else-if="itemDtl.sampItemYn == 'Y'">맛보기 사은품</p>
          <p class="point" v-else-if="itemDtl.presFrgfYn == 'Y'">금액대별 사은품</p>
          <p class="option-info" v-else-if="isNotEmpty(itemDtl.skuNm) && itemDtl.itemId != itemDtl.skuId">옵션 : {{itemDtl.skuNm}}</p>
          <p class="option-info">수량 {{itemDtl.ordQty}}</p>
        </dd>
        <!-- 첫구매/맛보기/사은품은 수량선택박스가 비노출된다. -->
        <dd class="count option-number" v-if="itemDtl.chkFlag && itemDtl.firPurchItemYn != 'Y' && itemDtl.presFrgfYn != 'Y' && itemDtl.sampItemYn != 'Y'">
          <button type="button" class="btn-minus" @click="decreaseCount(inx)"><span class="hidden">선택수량 빼기</span></button>
          <input type="number" name="claimQty" :id="'claimQty'+inx" v-model="itemDtl.claimQty" value="1" class="txt-number" title="선택 수량" @change="checkMaxClaimItemQty(inx)">
          <button type="button" class="btn-plus" @click="increaseCount(inx)"><span class="hidden">선택수량 더하기</span></button>
        </dd>
        <!-- 사은품은 금액정보가 비노출된다. -->
        <dd class="list-price" aria-label="정상가격" v-if="itemDtl.presFrgfYn != 'Y' && isNotEmpty(itemDtl.itemSprc) && Number(itemDtl.itemSprc) > 0 && itemDtl.itemSprc != itemDtl.itemDcSprc">
          <del v-if="!itemDtl.chkFlag">{{toComma(Number(itemDtl.itemSprc) * Number(itemDtl.ordQty))}}</del>
          <del v-if="itemDtl.chkFlag">{{toComma((Number(itemDtl.itemSprc) * Number(itemDtl.claimQty)))}}</del>
          원
        </dd>
        <dd class="sale-price" aria-label="판매가격" v-if="itemDtl.presFrgfYn != 'Y' && isNotEmpty(itemDtl.itemDcSprc) && Number(itemDtl.itemDcSprc) > 0">
          <span class="number-sale-price" v-if="!itemDtl.chkFlag">{{toComma(Number(itemDtl.itemDcSprc) * Number(itemDtl.ordQty))}}</span>
          <span class="number-sale-price" v-if="itemDtl.chkFlag">{{toComma((Number(itemDtl.itemDcSprc) * Number(itemDtl.claimQty)))}}</span>
          <span class="unit-won">원</span>
        </dd>
      </dl>
      <MyChangeAmountListSub v-if="filterSubItemList(itemDtl).length > 0"
        :ordInfoRslt="ordInfoRslt"
        :ordMstItem="itemDtl"
        :ordSubItemList="filterSubItemList(itemDtl)"
        :chkDelivTypeId="chkDelivTypeId"
        @refndEvent="getCheckedItemInfo"/>
    </li>
  </ul>
</template>
<script>
import MyChangeAmountListSub from '@/components/mypage/MyChangeAmountListSub'; // 하위 상품 목록
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import ImgUtils from '@/common/ImgUtils';
export default {
  name: "MyChangeAmountList",
  data() {
    return {
    };
  },
  props: {
    ordInfoRslt: Object,
    ordMstItemList: Array,
    ordSubItemList: Array,
    chkDelivTypeId: String,
  },
  mixins: [],
  components: {
      MyChangeAmountListSub,
  },
  methods: {
    getChkItemFlag(itemInx) {
      const mstItemCnt = this.ordMstItemList.filter(itemDtl => {
        return itemDtl.chkFlag != true;
      }).length;
      const addItemCnt = this.ordSubItemList.filter(itemDtl => {
        return itemDtl.chkFlag != true;
      }).length;
      if (mstItemCnt > 0 || addItemCnt > 0) {
        document.getElementById(this.chkDelivTypeId).checked = false;
      } else {
        document.getElementById(this.chkDelivTypeId).checked = true;
      }
    },
    // 체크박스 선택 시 유효성 체크
    validateChkItem(itemDtl) {
      let rtnFlag = false;
      if (itemDtl.spckItemYn == 'Y' && itemDtl.orderStatCd == 'Y') {
        // 심플리쿡 상품이고 발주상태코드가 발주('Y')이면 선택 불가능
        this.$gsdialog.alert("상품이 준비중으로 취소가 불가능합니다.", {html: true});
        rtnFlag = true;
      }
      return rtnFlag;
    },
    // 체크박스 선택
    changeAmount(inx) {
      // 선택 불가 상품인지 체크
      if (this.validateChkItem(this.ordMstItemList[inx])) {
        document.getElementById("chkList"+inx).checked = !document.getElementById("chkList"+inx).checked;
        return;
      }
      this.ordMstItemList[inx].chkFlag = !this.ordMstItemList[inx].chkFlag;
      this.ordMstItemList[inx].claimQty = this.ordMstItemList[inx].ordQty;
      this.ordMstItemList[inx].ordClaimResnCd = '';
      // 하위 구성 상품 존제 시 체크 여부 처리
      const subItemList = this.filterSubItemList(this.ordMstItemList[inx]);
      for (let subIdx = 0; subIdx < subItemList.length; subIdx++) {
        // 증정사은품이 포함된 상품이 존재하면 메세지창 노출
        if (subItemList[subIdx].presFrgfYn == 'Y' && !this.ordMstItemList[inx].chkFlag) {
          subItemList[subIdx].chkFlag = this.ordMstItemList[inx].chkFlag;
        }
        // 패키지 상품 또는 하위상품도 자동선택처리
        if (subItemList[subIdx].pkgYn == 'Y') {
          // 구성상품의 취소수량 = 패키지 구성상품 수량 * 패키지의 클레임수량
          subItemList[subIdx].claimQty = Number(this.isNotEmpty(subItemList[subIdx].grpItemCompoQty) ? subItemList[subIdx].grpItemCompoQty : 1) * Number(this.ordMstItemList[inx].claimQty);
          subItemList[subIdx].chkFlag = this.ordMstItemList[inx].chkFlag;
        }
      }
      // 주문취소 환불정보 조회
      this.getCheckedItemInfo();
    },
    decreaseCount(inx) {
      const claimQty = event.currentTarget;
      if ( this.ordMstItemList[inx].claimQty > 1 ) {
        this.ordMstItemList[inx].claimQty -= 1;
        const subItemList = this.filterSubItemList(this.ordMstItemList[inx]);
        for (let itemInx = 0; itemInx < subItemList.length; itemInx++) {
          if (subItemList[itemInx].presFrgfYn == 'Y') {
            subItemList[itemInx].claimQty = 0;
            subItemList[itemInx].chkFlag = false;
          }
          // 패키지 상품 또는 하위상품도 자동선택처리
          if (subItemList[itemInx].pkgYn == 'Y') {
            // 구성상품의 취소수량 = 패키지 구성상품 수량 * 패키지의 클레임수량
            subItemList[itemInx].claimQty = Number(this.isNotEmpty(subItemList[itemInx].grpItemCompoQty) ? subItemList[itemInx].grpItemCompoQty : 1) * Number(this.ordMstItemList[inx].claimQty);
            subItemList[itemInx].chkFlag = this.ordMstItemList[inx].chkFlag;
          }
        }
        // 주문취소 환불정보 조회
        this.getCheckedItemInfo();
      }
    },
    increaseCount(inx) {
      if (this.ordMstItemList[inx].claimQty < Number(this.ordMstItemList[inx].ordQty)) {
        this.ordMstItemList[inx].claimQty += 1;
        const subItemList = this.filterSubItemList(this.ordMstItemList[inx]);
        for (let itemInx = 0; itemInx < subItemList.length; itemInx++) {
          if (subItemList[itemInx].presFrgfYn == 'Y') {
            subItemList[itemInx].claimQty = 0;
            subItemList[itemInx].chkFlag = false;
          }
          // 패키지 상품 또는 하위상품도 자동선택처리
          if (subItemList[itemInx].pkgYn == 'Y') {
            // 구성상품의 취소수량 = 패키지 구성상품 수량 * 패키지의 클레임수량
            subItemList[itemInx].claimQty = Number(this.isNotEmpty(subItemList[itemInx].grpItemCompoQty) ? subItemList[itemInx].grpItemCompoQty : 1) * Number(this.ordMstItemList[inx].claimQty);
            subItemList[itemInx].chkFlag = this.ordMstItemList[inx].chkFlag;
          }
        }
        // 주문취소 환불정보 조회
        this.getCheckedItemInfo();
      }
    },
    checkMaxClaimItemQty(inx) { // 최대클레임상품갯수 체크
      if (this.ordMstItemList[inx].claimQty > Number(this.ordMstItemList[inx].ordQty)) {
        this.ordMstItemList[inx].claimQty = this.ordMstItemList[inx].ordQty;
        this.$gsdialog.alert("수량은 주문 수량 이하로 입력 가능합니다.");
      }
        // 주문취소 환불정보 조회
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
    filterSubItemList(selItemDtl) {
      return this.ordSubItemList.filter(itemDtl => {
        return itemDtl.ordDtlSeqno == selItemDtl.ordDtlSeqno && itemDtl.relatOrdSeqno == selItemDtl.ordItemSeqno;
      });
    },
    getCheckedItemInfo() {
      this.$emit('refndEvent');
    },
  },
  mounted() {},
};
</script>
