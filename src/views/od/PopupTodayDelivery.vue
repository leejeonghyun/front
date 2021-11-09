<!--
views/od/SC-FO-OD-GS-MP-012
-->
<template>
    <!-- START : 추천상품 레이어 -->
    <div id="popupTodayDelivery" class="wrap-layer similarity-list-layer" role="dialog" aria-labelledby="popupTodayDelivery" aria-modal="true" :class="[{active : this.modalActive.popupTodayDelivery}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-bottom-fixed">
        <div class="title"><h3>{{delivTypeName}}</h3></div>
        <div class="layer-content">
          <div class="scroll-area">
            <template v-if="itemList === null">
              <Loading style="position: absolute;" />
            </template>
            <template v-else-if="itemList.length === 0">
              <NoList NoListText="상품 준비 중입니다." :ListType="'product'" />
            </template>
            <ul class="similarity-list" v-else>
              <li v-for="(each, index) in itemList" :key="'recommend_' + index">
                <a href="#" data-sc-action="prod.click" data-dimension-name="prod.recomFreeDeliv" :data-dimension-value="each.itemId">
                  <figure><img :src="each.itemImg | resize | imageUrl" alt=""></figure>
                  <dl>
                    <dt><span aria-label="상품명">{{each.itemNm}}</span></dt>
                    <dd aria-label="정상가격" class="list-price" v-if="isDiscounted(each)"><del class="price">{{each.normSprc | comma}}</del>원 </dd>
                    <dd aria-label="판매가격" class="sale-price"><strong class="price">{{each.dcAmt | comma}}</strong>원 </dd>
                  </dl>
                </a>
                <button @click="popupCartEvent(each)" class="btn icon btn-cart" data-sc-action="prod.getAtcData" data-dimension-name="prod.recomFreeDeliv" :data-dimension-value="each.itemId"><span class="hidden">장바구니 담기</span></button>
              </li>
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 추천상품 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
import NumberUtils from "../../common/NumberUtils";
import ImgUtils from "../../common/ImgUtils";
import ApiUtils from "../../common/ApiUtils";
import Loading from "../../components/common/Loading";
import NoList from "../../components/common/NoList";
export default {
  name: "PopupRecommendLayer1",
  props: {
    delivType: Object,
    supplFirm: Object,
    needAmount: Number,
    todaySupplFirmCd: String,
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      itemList: null,
      loading: true,
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
    Loading,
    NoList,
  },
  filters: {
    resize(value) {
      if (!value) {
        return '';
      }

      try {
        return value.split('{SIZE}').join('300');
      } catch (e) {
        console.log(e.message);
        return '';
      }
    },
    imageUrl(value) {
      if (!value) {
        return '@/assets/images/img/img_product_nothumb.jpg';
      } else if (value.startsWith('@')) {
        return value;
      }

      try {
        return ImgUtils.path(value);
      } catch (e) {
        console.log(e.message);
        return '@/assets/images/img/img_product_nothumb.jpg';
      }
    },
    comma: NumberUtils.toComma
  },
  computed: {
    delivTypeName() {
      if (this.delivType.delivTypeCd === '02' || this.delivType.delivTypeCd === '03' || this.delivType.delivTypeCd === '05') {
        return this.supplFirm.siteNm;
      } else {
        return this.delivType.delivTypeNm + '배송';
      }
    },
  },
  methods: {
    isDiscounted(item) {
      return item.normSprc !== item.dcAmt;
    },
    popupAction() {
      this.$emit('popupEvent', 'popupTodayDelivery');
      this.modalActiveEvent('popupTodayDelivery');
    },
    popupCartEvent(item) {
      this.$emit('submit', {
        ...item,
        ordTypeCd: '10',
        bsktQty: 1,
      });
      this.$emit('popupEvent', 'popupTodayDelivery');
      this.modalActiveEvent('popupTodayDelivery');
    },
    async getRecommendItemList({storId, supplFirmCd, delivTypeCd, todaySupplFirmCd}) {
      try {
        const response = await ApiUtils.get('/fo/od/bsktmgnt/recommend-product-list', {
          storId: storId,
          supplFirmCd: supplFirmCd,
          delivTypeCd: delivTypeCd,
          todaySupplFirmCd: todaySupplFirmCd,
        });

        return response.data.data;
      } catch (e) {
        console.log(e.message);
        return [];
      }
    },
  },
  async created() {
    this.itemList = await this.getRecommendItemList({
      delivTypeCd: this.delivType.delivTypeCd,
      storId: this.supplFirm.storId,
      supplFirmCd: this.supplFirm.supplFirmCd,
      todaySupplFirmCd: this.todaySupplFirmCd,
    });
  },
  mounted() {
    this.modalActiveEvent('popupTodayDelivery');
  },
  destroyed() {
  },
};
</script>
