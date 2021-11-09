<template>
  <ul class="cart-product-list selected-list">
    <li :class="claimSpCd == 'RETURN' && itemDtl.retMethoCd == '2' ? 'plus' : ''" v-for="(itemDtl, itemInx) in ordItemRsltList" :key="'ITEM'+itemInx">
      <dl :class="claimSpCd == 'RETURN' && itemDtl.retMethoCd == '2' ? 'disabled' : ''">
        <dt>
          <span class="inp-chk">
            <input type="checkbox" name="chkCnclItem" :id="'chkCnclItem'+itemDtl.totDelivTypeCd+'_'+itemInx" v-if="checkbox" :disabled="itemDtl.presFrgfYn == 'Y' || itemDtl.sampItemYn == 'Y'" v-model="itemDtl.chkFlag" @change="getChkItemFlag(itemInx)">
            <label :for="'chkCnclItem'+itemDtl.totDelivTypeCd+'_'+itemInx">{{itemDtl.itemNm}}</label>
          </span>
        </dt>
        <dd class="thumb">
          <a href="#" @click="goItemDetail(itemDtl)">
            <p class="txt-return" v-if="claimSpCd == 'RETURN' && itemDtl.retMethoCd == '2'">회수<br/>불필요</p>
            <figure>
              <span aria-label="혜택" class="ico-benefit plus" v-if="itemDtl.nplsoneYn == 'Y'">{{itemDtl.nplsoneVal+'+1'}}</span>
              <img :src="show(itemDtl.itemImg)" :alt="itemDtl.itemNm" @error="replaceByDefault" v-if="isNotEmpty(itemDtl.itemImg)"/>
              <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="itemDtl.itemNm" v-else />
            </figure>
          </a>
        </dd>
        <dd class="option">
          <p class="point" v-if="itemDtl.firPurchItemYn == 'Y'">첫 구매 혜택</p>
          <p class="point" v-else-if="itemDtl.sampItemYn == 'Y'">맛보기 사은품</p>
          <p class="point" v-else-if="itemDtl.presFrgfYn == 'Y'">금액대별 사은품</p>
          <p class="option-info" v-else-if="itemDtl.itemId != itemDtl.skuId">옵션 : {{itemDtl.skuNm}}</p>
        </dd>
        <dd class="shop">{{itemDtl.cmmSteNm}}</dd>
        <dd class="count">
          <p class="option-info">수량 : {{toComma(itemDtl.claimQty)}}개</p>
        </dd>
        <dd class="list-price" aria-label="정상가격" v-if="claimSpCd !== 'EXCHANGE' && itemDtl.sampItemYn != 'Y' && itemDtl.presFrgfYn != 'Y' && isNotEmpty(itemDtl.itemSprc) && Number(itemDtl.itemSprc) > 0 && itemDtl.itemSprc != itemDtl.itemDcSprc">
          <del>{{toComma(Number(itemDtl.itemSprc) * Number(itemDtl.claimQty))}}</del>원
        </dd>
        <dd class="sale-price" aria-label="판매가격" v-if="claimSpCd !== 'EXCHANGE' && itemDtl.sampItemYn != 'Y' && itemDtl.presFrgfYn != 'Y' && isNotEmpty(itemDtl.itemDcSprc) && Number(itemDtl.itemDcSprc) > 0">
          <span class="number-sale-price">{{toComma(Number(itemDtl.itemDcSprc) * Number(itemDtl.claimQty))}}</span>
          <span class="unit-won">원</span>
        </dd>
      </dl>
      <OrderCancelItemListItem :addItemRsltList="filterAddItemList(itemDtl)" :itemDtl="itemDtl" :claimSpCd="claimSpCd" v-if="addItemRsltList != null && addItemRsltList.length > 0"/>
    </li>
    <!-- END : list -->
  </ul>
</template>
<script>
import OrderCancelItemListItem from '@/components/mypage/cs/OrderCancelItemListItem'; //  주문취소 상품 목록 컴포넌트
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import ImgUtils from '@/common/ImgUtils';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: "OrderCancelItemList",
  data() {
    return {
    };
  },
  props: {
    checkbox: null,
    ordItemRsltList: Array,
    addItemRsltList: Array,
    claimSpCd: String,
    chkDelivTypeId: String,
  },
  mixins: [],
  components: {
    OrderCancelItemListItem
  },
  methods: {
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
    getChkItemFlag(itemInx) {
      const mstItemCnt = this.ordItemRsltList.filter(itemDtl => {
        return itemDtl.chkFlag != true && itemDtl.presFrgfYn != 'Y' && itemDtl.sampItemYn != 'Y';
      }).length;
      const addItemCnt = this.addItemRsltList.filter(itemDtl => {
        return itemDtl.chkFlag != true && itemDtl.presFrgfYn != 'Y' && itemDtl.sampItemYn != 'Y';
      }).length;
      if (mstItemCnt > 0 || addItemCnt > 0) {
        document.getElementById(this.chkDelivTypeId).checked = false;
      } else {
        document.getElementById(this.chkDelivTypeId).checked = true;
      }
    },
    filterAddItemList(selItemDtl) {
      return this.addItemRsltList.filter(itemDtl => {
        if (this.isNotEmpty(selItemDtl.grpItemId)) {
          return itemDtl.grgItemId == selItemDtl.grgItemId;
        } else {
          // 상위 상품의 원주문상세일련번호/원주문상품일련번호 == 하위 상품의 원주문일련번호/연관주문일련번호가 같은 상품을 노출
          return itemDtl.orgOrdDtlSeqno == selItemDtl.orgOrdDtlSeqno && itemDtl.orgRelatOrdSeqno == selItemDtl.orgOrdItemSeqno;
        }
      });
    },
    goItemDetail(itemDtl) {
      if (itemDtl.mallId === '1') {
        location.href = SiteUtils.freshmo('/product_detail?itemId=' + itemDtl.itemId + '&storId=' + itemDtl.storId + '&supplFirmCd=' + itemDtl.supplFirmCd);
      } else {
        location.href = SiteUtils.dalimo('/product_detail?itemId=' + itemDtl.itemId + '&storId=' + itemDtl.storId + '&supplFirmCd=' + itemDtl.supplFirmCd);
      }
    },
  },
  mounted() {
  },
};
</script>
