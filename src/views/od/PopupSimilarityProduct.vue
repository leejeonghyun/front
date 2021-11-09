<!--
views/od/SC-FO-OD-GS-MP-010
-->
<template>
    <!-- START : 유사상품 레이어 -->
    <div id="popupSimilarityProduct" class="wrap-layer similarity-list-layer" role="dialog" aria-labelledby="popupSimilarityProduct" aria-modal="true" :class="[{active : this.modalActive.popupSimilarityProduct}, siteClass]">
      <div class="layer-bg" @click="popupClose"></div>
      <div class="layer-bottom-fixed">
        <div class="title"><h3>유사상품</h3></div>
        <div class="layer-content">
          <div class="scroll-area">
            <ul class="similarity-list">
              <li v-for="list in similarityProductList" :key="list.index">
                <a href="javascript://">
                  <figure><img :src="getItemImg(list.itemImg)" alt=""></figure>
                  <dl>
                    <dt><span aria-label="상품명">{{list.itemNm}}</span></dt>
                    <dd aria-label="정상가격" class="list-price"><del class="price">{{comma(list.normSprc)}}</del>원 </dd>
                    <dd aria-label="판매가격" class="sale-price"><strong class="price">{{comma(list.sellAmt)}}</strong>원 </dd>
                  </dl>
                </a>
                <button class="btn icon btn-cart" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog" @click="popupCartEvent(list)"><span class="hidden">장바구니 담기</span></button>
              </li>
            </ul>
          </div>
        </div>
        <PopupAlertSimilarity @popupEvent="popupAction" @popupReturn="popupReturn" v-if="popup.popupAlertSimilarity" :selectItem="selectItem"/>
        <button class="btn-layer-close" @click="popupClose">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 유사상품 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import PopupAlertSimilarity from '@/views/od/PopupAlertSimilarity';
import ImgUtils from '@/common/ImgUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "popupSimilarityProduct",
  props: {
    similarityProductList: Array,
    mallId: String
  },
  data() {
    return {
      popup: {
        open: false,
        popupAlertSimilarity: false,
      },
      selectItem: Number,
      item: {},
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
    PopupAlertSimilarity,
  },
  methods: {
    popupClose() {
      this.$emit('popupEvent', 'popupSimilarityProduct');
      this.modalActiveEvent('popupSimilarityProduct');
    },
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupCartEvent(item) {
      this.item = item;
      this.selectItem = item.itemId;
      this.popupAction('popupAlertSimilarity');
    },
    popupReturn(data, stat) {
      const bsktPutDtoList = [];
      const bsktPutDto = {};
      bsktPutDto.itemGrpSeqno = 1;
      bsktPutDto.itemCompoCd = '01';
      bsktPutDto.bsktTypeCd = '1';
      bsktPutDto.dspCtgId = '';
      bsktPutDto.itemId = this.item.itemId;
      bsktPutDto.itemNm = this.item.itemNm;
      bsktPutDto.skuId = this.item.skuId;
      bsktPutDto.grpItemId = '';
      bsktPutDto.bsktQty = 1;
      bsktPutDto.ssevntId = '';
      bsktPutDto.delivDt = '';
      bsktPutDto.itemCd = '';
      bsktPutDto.mallId = this.mallId;
      bsktPutDtoList.push(bsktPutDto);
      this.$emit('similarityResult', bsktPutDtoList, stat);
      this.$emit('popupEvent', 'popupSimilarityProduct');
      this.modalActiveEvent('popupSimilarityProduct');
    },
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
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
  },
  mounted() {
    this.modalActiveEvent('popupSimilarityProduct');
  },
};
</script>
