<!--
components/_temp/OrderProductsMF
-->
<template>
  <div id="orderAccordionContent" class="accordion-content cart-category-product" aria-labelledby="orderTopAccordion" hidden="hidden">
    <!-- market block -->
    <div class="list_content__block" v-for="(supplInfo, supplIdx) in ordsItemList.ordsDelivSupplGrpInfoList" :key="`SUPPL_INFO_${supplIdx}`">
      <div class="title_flex__area mallinfo">
        <div class="mall_title">
          <img :src="require(`@/assets/images/mall_logo/${supplInfo.mallId}.png`)" :alt="supplInfo.mallNm" class="mall_image">
          <strong v-if="supplInfo.mallId === '302' && dawnDeliYn">[ 새벽배송 ]</strong>
        </div>
      </div>
      <div v-for="(dlfeeInfo, dlfeeIdx) in supplInfo.ordsDlfeeGrpInfoList" :key="`DLFEE_INFO_${dlfeeIdx}`">
        <ul class="cart-product-list">
          <li v-for="(itemInfo, itemIdx) in dlfeeInfo.ordsItemInfoList" :key="`ITEM_INFO_${itemIdx}`">
            <div class="inner">
              <dl>
                <dt>
                  <p class="tit tit-link">
                    <a href="javascript:;" class="tit-product" @click="goItemDetail(itemInfo)">{{ itemInfo.itemNm }}</a>
                  </p>
                </dt>
                <dd class="thumb">
                  <a href="javascript:;" @click="goItemDetail(itemInfo)">
                    <figure>
                      <img :src="getItemImg(itemInfo.itemImg)" @error="replaceByDefault" :alt="itemInfo.itemNm" v-if="itemInfo.itemImg !== ''">
                      <img src="@/assets/images/img/img_product_nothumb.jpg" v-if="itemInfo.itemImg === ''">
                    </figure>
                  </a>
                </dd>
                <dd class="option flex">
                  <div>
                    <p class="option-txt" v-if="itemInfo.optnItemYn === 'Y'">옵션: {{itemInfo.skuNm + (itemInfo.skuAddAmt > 0 ? '(+'+toComma(itemInfo.skuAddAmt)+'원)' : '')}}</p>
                    <p class="option-cnt">수량: {{ itemInfo.itemOrdQty }}개</p>
                  </div>
                </dd>
                <dd class="sale-price" aria-label="판매가격">
                  <span class="number-sale-price">{{toComma(itemInfo.lastBeneSellAmt)}}</span>
                  <span class="unit-won">원</span>
                </dd>
              </dl>
              <div class="btn-bottom">
                <p class="btn-area">
                  <button type="button" class="btn-border btn-coupon" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog" v-if="itemInfo.psblCpnYn === 'Y'" @click="popupCouponActive(itemInfo)" >
                    쿠폰변경
                  </button>
                </p>
              </div>
            </div>
          </li>
        </ul>
        <!-- 20201110  소계 추가 -->
        <div class="total-price-info">
          <p class="price-info">
            <span class="total-info-txt">
              총 상품금액 {{toComma(dlfeeInfo.dlfeeSumOrdAmt)}}원 + 배송비 {{toComma(dlfeeInfo.dlfeeSumAmt)}}원 =
              {{toComma(dlfeeInfo.dlfeeSumOrdAmt + dlfeeInfo.dlfeeSumAmt)}}원
            </span>
          </p>
        </div>
        <!-- // 20201110  소계 추가 -->
      </div>
    </div>
    <!-- // market block -->
    <!-- 20201110  합계 추가 -->
    <div class="total-price-info orderTotal">
      <p class="price-info">
        <strong class="total">총 주문예정금액 {{toComma(ordsItemList.totOrdSchedAmt + ordsItemList.totDlfee)}}원 (배송비 {{toComma(ordsItemList.totDlfee)}}원 포함) </strong>
      </p>
    </div>
    <!-- // 20201110  합계 추가 -->
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';

import ApiUtils from '@/common/ApiUtils';
import ImgUtils from '@/common/ImgUtils';
import NumberUtils from '@/common/NumberUtils';
import SiteUtils from '@/common/SiteUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: "MfOrderProducts",
  props: {
    ordsItemList: Object,
    dawnDeliYn: Boolean,
  },
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    toComma(val) {
      return NumberUtils.toComma(val);
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isListEmpty: function (x) {
      return (x != null && Object.entries(x).length > 0) ? false : true;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    // 상품 이미지 경로 보정처리 함수
    getItemImg(url) {
      let path = '';
      try {
        url = url.replace("{SIZE}", 300); // 임시로 사이즈 변경함
        path = ImgUtils.path(url);
      } catch (e) {
        path = '@/assets/images/img/img_product_nothumb.jpg';
      }
      return path;
    },
    // 상품 이미지가 오류인 경우 아래 경로로 대체
    replaceByDefault(e) {
      e.target.src = imgProductNothumb;
    },
    // 상품쿠폰 변경 팝업 호출 함수
    popupCouponActive(itemInfo) {
      this.$emit('popupOrderCouponChange', itemInfo);
    },
    // 상품상세 이동 처리 함수
    goItemDetail(itemInfo) {
      const url = '/md/product_detail?itemId=' + itemInfo.itemId + '&storId=' + itemInfo.storId + '&supplFirmCd=' + itemInfo.supplFirmCd + '&mallId=' + itemInfo.mallId;
      location.href = SiteUtils.marketformo(url);
    },
  },
  mounted() {
  },
};
</script>
