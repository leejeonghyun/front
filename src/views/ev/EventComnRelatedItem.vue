<!-- START : 연관 상품 -->
<template>
  <section>
    <section class="event-cont event-related-product" v-if="relatedItemList && relatedItemList.length > 0">
      <!-- 이미지(썸네일) 형 -->
      <div class="wrap-product-image" ref="productImage" v-if="this.eventInfo.eventRelatItemExpsrTypeCd=='01'">
        <!-- 상품목록 - 실 사용 데이터 -->
        <div class="product-item image" v-for="(item, i) in itemList" v-bind="item" :key="item.itemId">
          <ProductImage @popupEvent="popupAction" :relatedItem="item" :itemMall="itemMallList[i]" v-bind="item" @goCart="goCart" @goDcInfo="goDcInfo" />
        </div>
      </div>
      <!-- 리스트 형 -->
      <div class="wrap-product-list" ref="productList" v-if="this.eventInfo.eventRelatItemExpsrTypeCd=='02'">
        <ProductList @popupEvent="popupAction" v-for="(item, i) in itemList" v-bind="item" :key="item.itemId" :relatedItem="item" :itemMall="itemMallList[i]" @goCart="goCart" @goDcInfo="goDcInfo" />
      </div>
    </section>
    <PopupDiscountInfo @popupEvent="popupAction" v-if="popup.popupSales" v-bind:dcSateInfo="dcSateInfo"/>
    <PopupOptionInfo @popupEvent="popupAction" v-if="popup.popupOption" />
    <PopupOptionArea v-bind:dispType="'DP'" ref="optionArea"/>
  </section>
</template>
<!-- END : 연관 상품 -->

<script>
import ApiUtils from '@/common/ApiUtils';
import ProductList from './ProductList';
import ProductImage from './ProductImage'; // 이미지 일반형5
import PopupDiscountInfo from '@/components/product/PopupDiscountInfo'; // 팝업 - 할인내역
import PopupOptionInfo from './PopupItemListDefault'; // 팝업 - 장바구니 옵션
import PopupOptionArea from '@/views/md/OptionArea';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'EventComnRelatedItem',
  components: {
    ProductList,
    PopupDiscountInfo,
    PopupOptionInfo,
    ProductImage,
    PopupOptionArea,
  },
  props: {
    eventInfo: Object,
  },
  data() {
    return {
      // START : 연관 상품
      showList: [],
      // END : 연관 상품
      popup: { // 팝업
        popupSales: false, // 할인 내역 팝업
        popupOption: false // 장바구니 옵션 팝업
      },
      param: '',
      itemList: [],
      itemMallList: [],
      cartParams: {
        itemId: this.$route.query.itemId,
        mallId: this.$route.query.mallId,
        storId: this.$route.query.storId,
        supplFirmCd: this.$route.query.supplFirmCd,
      },
      dcSateInfo: {}, // 할인정보
    };
  },
  async created() {
  },
  methods: {
    // START : 연관 상품
    popupAction(type) { // 팝업 활성/비활성
        this.popup[`${type}`] = !this.popup[`${type}`];
    },
    slideActive(index, type) { // 상품 목록 중 한 상품의 유사상품 리스트만 활성화
      for (let i=0; i < this.showList.length; i++) {
        if (i === index) {
          this.showList.splice(i, 1, !this.showList[i]);
        } else {
          this.showList.splice(i, 1, false);
        }
      }
    },
    goCart(itemValue) { // 장바구니 외부호출 샘플
      console.log("====");
      console.log(itemValue);
      this.cartParams.itemId = itemValue.itemId;
      this.cartParams.storId = itemValue.storId;
      this.cartParams.supplFirmCd = itemValue.supplFirmCd;
      this.cartParams.ssevntId = itemValue.ssevntId;
      this.cartParams.ssevntTimes = itemValue.ssevntTimes;
      this.cartParams.mallId = itemValue.mallId;
      this.$refs.optionArea.getOrder(this.cartParams);
    },
    goDcInfo(itemValue) {
      this.dcSateInfo = itemValue;
      this.popupAction('popupSales');
    },
    // END  : 연관 상품
  },
  computed: {
    relatedItemList: function() {
      if (this.eventInfo && this.eventInfo.eventApplItemList && this.eventInfo.eventApplItemList.length > 0) {
        return this.eventInfo.eventApplItemList.filter(info => {
          return info.eventItemApplSpCd == "03";
        });
      }
      return null;
    },
  },
  async mounted() {

  },
  watch: {
    relatedItemList: function () {
      if (this.relatedItemList !=null && this.relatedItemList.length >0) {
        for (let i=0; i<this.relatedItemList.length; i++) {
          this.param += "&itemId="+this.relatedItemList[i].itemId;
          this.itemMallList[i] = this.relatedItemList[i].mallId;
        }
        if (this.param != '') {
          const pMallId = CookieUtils.getCookie('MALL_ID');
          const pStorId = CookieUtils.getCookie('STOR_ID');
          const pSupplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');
          const pCmmSteId = CookieUtils.getCmmSteId();
          ApiUtils.get('/fo/md/itemaddinfomgnt/multi-item-list?mallId='+pMallId + '&storId='+pStorId+'&supplFirmCd='+pSupplFirmCd +'&cmmSteId='+pCmmSteId + this.param)
          .then(res => {
            if (res.data && res.data.success && res.data.data) {
              this.itemList = res.data.data;
            }
          })
          .catch(e => {
            // this.$gsdialog.alert(e.response.data.statusMessage);
          });
        }
      }
    }
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
