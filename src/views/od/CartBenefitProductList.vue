<!--
views/od/SC-FO-OD-GS-MS-006
-->
<template>
  <div class="wrap-border" v-bind:class="[siteClass]" v-if="itemList.length > 0">
    <section class="cart-benefit-slide vipBenefit">
      <h2 class="benefit-title">
         <PopupBenefitInfo @popupEvent="popupAction" v-if="this.popup.popupBenefitInfo"/>
        <p>
          우수 고객님께 드리는 맛보기 상품
          <button type="button" class="btn-infomation" aria-label="맛보기 상품 혜택 안내 팝업활성화" aria-haspopup="dialog" @click="popupCartBenefitEvent"><span class="hidden">맛보기 상품 안내</span></button>
        </p>
      </h2>
      <div class="benefit-slide" v-if="samplePres != null">
        <PopupCartBenefitAlert @popupEvent="popupAction" v-if="this.popup.popupCartBenefitAlert" />
        <swiper :options="swiperBenefitProduct">
          <swiper-slide v-for="each in itemList" v-bind:key="each.item_id">
            <CartBenefitProduct :value="each"  :selected="each === selected"
                                @click="cartBenefitProductClickAction(each)"/>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import PopupCartBenefitAlert from '@/views/od/PopupCartBenefitAlert';
import PopupBenefitInfo from '@/views/od/PopupBenefitInfo';
import ImgUtils from '@/common/ImgUtils';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import CartBenefitProduct from "./CartBenefitProduct";
export default {
  name: "CartBenefitProductList",
  props: {
    value: Object,
    samplePres: Array,
    bsktInqRsltDto: Object,
  },
  data() {
    return {
      itemList: [],
      selected: null,
      swiperBenefitProduct: {
        slidesPerView: 3.5,
        mousewheel: true,
      },
      popup: {
        open: false,
        popupCartBenefitAlert: false,
        popupBenefitInfo: false,
      },
      check: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
    CartBenefitProduct,
    swiper,
    swiperSlide,
    PopupCartBenefitAlert,
    PopupBenefitInfo,
  },
  methods: {
    cartBenefitProductClickAction(item) {
      if (this.selected === item) {
        this.selected = null;
      } else {
        this.selected = item;
      }
      this.emitChange();
    },
    emitChange() {
      this.$emit('input', this.selected);
      this.$emit('change', this.selected, this.value);
    },
    popupAction(type) { // 팝업 활성/비활성
      this.popup[type] = !this.popup[type];
      this.popup.open = !this.popup.open;
    },
    popupCartBenefitEvent(type) {
      this.popupAction('popupBenefitInfo');
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
    goItemDetail(itemId, storId, supplFirmCd) {
      if (CookieUtils.getMallId() === '1') {
        location.href = SiteUtils.freshmo('/product_detail?itemId=' + itemId + '&storId=' + storId + '&supplFirmCd=' + supplFirmCd);
      } else {
        location.href = SiteUtils.dalimo('/product_detail?itemId=' + itemId + '&storId=' + storId + '&supplFirmCd=' + supplFirmCd);
      }
    },
    computeSupplFirmScore(supplFirm) {
      let score = 0;

      if (supplFirm.chk === true) {
        score++;
        score *= 10;
      }

      score += 10 - (supplFirm.delivTypeCd || 0) *1;

      return -score;
    },
    comparator(scorer) {
      return function(l, r) {
        const leftScore = scorer(l);
        const rightScore = scorer(r);
        return leftScore - rightScore;
      };
    },
    orderScorer(supplOrderMap) {
      return function(item) {
        return supplOrderMap[item.supplFirmCd + '_' + item.storId];
      };
    },
    makeOrderMapBySupplFirmAndStor() {
      return this.bsktInqRsltDto.delivTypeDtoList
          .map(each => {
            return each.supplFirmDtoList.map(eachSupplFirm => {
              return {
                chk: each.chk,
                delivTypeCd: each.delivTypeCd,
                supplFirmCd: eachSupplFirm.supplFirmCd,
                storId: eachSupplFirm.storId,
              };
            });
          })
          .reduce((p, c) => p.concat(c), [])
          .sort(this.comparator(this.computeSupplFirmScore))
          .reduce((p, c, i) => {
            const key = c.supplFirmCd + '_' + c.storId;
            const value = i;
            p[key] = value;
            p[c.supplFirmCd] = p[c.supplFirmCd] || value;
            return p;
          }, {});
    },
    makeCheckedMapBySupplFirmAndStor() {
      return this.bsktInqRsltDto.delivTypeDtoList
          .map(each => {
            return each.supplFirmDtoList.map(eachSupplFirm => {
              return {
                chk: each.chk,
                delivTypeCd: each.delivTypeCd,
                supplFirmCd: eachSupplFirm.supplFirmCd,
                storId: eachSupplFirm.storId,
              };
            });
          })
          .reduce((p, c) => p.concat(c), [])
          .reduce((p, c, i) => {
            const key = c.supplFirmCd + '_' + c.storId;
            const value = c.chk;
            p[key] = value;
            p[c.supplFirmCd] = p[c.supplFirmCd] || value;
            return p;
          }, {});
    },
    makeDelivTypeMapBySupplFirmAndStor() {
      return this.bsktInqRsltDto.delivTypeDtoList
          .map(each => {
            return each.supplFirmDtoList.map(eachSupplFirm => {
              return {
                chk: each.chk,
                delivTypeCd: each.delivTypeCd,
                supplFirmCd: eachSupplFirm.supplFirmCd,
                storId: eachSupplFirm.storId,
                ordTypeCd: each.ordTypeCd,
                delivPolcId: each.delivPolcId,
              };
            });
          })
          .reduce((p, c) => p.concat(c), [])
          .reduce((p, c, i) => {
            const key = c.supplFirmCd + '_' + c.storId;
            const value = c;
            p[key] = value;
            p[c.supplFirmCd] = p[c.supplFirmCd] || value;
            return p;
          }, {});
    },
    initItemList() {
      const orderMap = this.makeOrderMapBySupplFirmAndStor();
      const checkedMap = this.makeCheckedMapBySupplFirmAndStor();
      const delivTypeMap = this.makeDelivTypeMapBySupplFirmAndStor();
      console.log('delivTypeMap', delivTypeMap);
      const itemList = this.samplePres
          .map(each => {
            return each.promApplItemList.map(eachItem => {
              const delivType = delivTypeMap[eachItem.supplFirmCd + '_' + eachItem.storId] || delivTypeMap[eachItem.supplFirmCd];
              return {
                chk: checkedMap[eachItem.supplFirmCd + '_' + eachItem.storId] || checkedMap[eachItem.supplFirmCd],
                ...delivType,
                ...eachItem,
              };
            });
          })
          .reduce((p, c) => p.concat(c), [])
          .sort(this.comparator(this.orderScorer(orderMap)))
      ;
      const distinctItemList = itemList
          .map(each => each.itemId)
          .map((v, i, a) => a.indexOf(v))
          .filter((v, i, a) => a.indexOf(v) === i)
          .map(each => itemList[each])
          .sort((l, r) => l.itemId - r.itemId);
      this.itemList = distinctItemList;
      distinctItemList.forEach(each => {
        console.log(each.supplFirmCd + '_' + each.storId, each.itemId, each.itemNm);
      });
    },
    normalizeSamplePres() {
      this.samplePres.forEach(each => {
        const itemCount = each.promApplItemList.length;
        for (let i=0; i<itemCount; i++) {
          const promApplItem = each.promApplItemList[i];
          const promPresFrgf = each.promBeneZoneList[0].promPresFrgfList[i];
          // promApplItem.itemCpnPromId = promPresFrgf.presFrgfApplVal;
        }
      });
    },
  },
  watch: {
    bsktInqRsltDto: {
      // deep: true,
      handler: function() {
        console.log('bsktInqRsltDto is modified');
        this.normalizeSamplePres();
        this.initItemList();
      },
    },
  },
  created() {
    console.log('this.samplePres', this.samplePres);
    console.log('this.bsktInqRsltDto', this.bsktInqRsltDto);
    this.normalizeSamplePres();
    this.initItemList();
  },
  mounted() {

  },
};
</script>
