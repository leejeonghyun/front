<template>
  <div v-if="giftOrdItemList != null">
    <section v-for="(giftOrdDelivGrpInfo, idx) in giftOrdItemList ? giftOrdItemList.giftOrdDelivGrpInfoList ? giftOrdItemList.giftOrdDelivGrpInfoList : [] : []" :key="idx" class="section-area">
      <h3 class="sub-title2 no-bg border">{{giftOrdDelivGrpInfo.delivGrpNm}}({{giftOrdDelivGrpInfo.totalItemCnt}})</h3>
      <div v-for="(giftOrdDelivSupplGrpInfo) in giftOrdDelivGrpInfo ? giftOrdDelivGrpInfo.giftOrdDelivSupplGrpInfoList ? giftOrdDelivGrpInfo.giftOrdDelivSupplGrpInfoList : [] : []" :key="giftOrdDelivSupplGrpInfo.ordDelivId">
        <ul class="order-product-list">
          <li v-for="(giftOrdItemInfo) in giftOrdDelivSupplGrpInfo ? giftOrdDelivSupplGrpInfo.giftOrdItemInfoList ? giftOrdDelivSupplGrpInfo.giftOrdItemInfoList : [] : []" :key="giftOrdItemInfo.ordItemSeqno">
            <dl>
              <dt>{{giftOrdItemInfo.itemNm}}</dt>
              <dd class="thumb">
                <figure>
                  <img :src="getItemImg(giftOrdItemInfo.itemImg)" :alt="giftOrdItemInfo.itemNm" @error="replaceByDefault" v-if="isNotEmpty(giftOrdItemInfo.itemImg)"/>
                  <!-- 썸네일 없을 경우 -->
                  <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="giftOrdItemInfo.itemNm" v-else />
                </figure>
              </dd>
              <dd class="shop" v-if="isNotEmpty(giftOrdItemInfo.storGrpNm)">{{giftOrdItemInfo.storGrpNm}}</dd>
              <dd class="option" v-if="isNotEmpty(giftOrdItemInfo.skuNm)"><p class="option-info">옵션 : {{giftOrdItemInfo.skuNm}}</p></dd>
              <dd class="count"><p class="option-info">수량 : {{comma(giftOrdItemInfo.ordQty)}}개</p></dd>
            </dl>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import ImgUtils from '@/common/ImgUtils';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: "OrderSheetProductList",
  props: {
    giftOrdItemList: Object,
  },
  data() {
    return {
      isActiveTitle: 'product',
      drawOrdsItemSeqnoList: [],
    };
  },
  mixins: [LayerPopupMixin, AccordionMixin],
  components: {
  },
  methods: {
    titActive(el) {
      this.isActiveTab = el;
    },
    popupAction(type) { // 팝업 활성/비활성
      this.$emit('popupEvent', 'popupAddrList');
    },
    replaceByDefault(e) {
      e.target.src = imgProductNothumb;
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    getItemImg(url) {
      let path = '';
      try {
        url = url.replace("{SIZE}", 300); // 임시로 사이즈 변경함
        path = ImgUtils.path(url);
      } catch (e) {
        alert(e);
        path = '@/assets/images/img/img_product_nothumb.jpg';
      }
      return path;
    },
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
