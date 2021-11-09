<!--
views/od/SC-FO-OD-GS-MS-007
-->
<template>
  <div class="wrap-border" v-bind:class="[siteClass]" v-if="itemList.length > 0">
    <section class="cart-benefit-slide firstBenefit">
      <div id="headerAlertMsg" :class="{ hide: !msgHide }">
        <span>상품을 추가로 담으면 첫구매딜 상품과 함께 구매가 가능해요! (단, 업체택배/사전예약 상품 제외)</span>
      </div>
      <h2 class="benefit-title">
        <p>
          첫구매 혜택! 베스트상품 100원부터
          <button
            @click="popupFirstEvent"
            aria-haspopup="dialog"
            aria-label="첫구매 혜택 안내 팝업활성화"
            class="btn-infomation"
            type="button"
          >
            <span class="hidden">첫구매 혜택 안내</span>
          </button>
          <span class="txt">행사상품 중 1개를 선택하세요.</span>
        </p>
        <PopupFirstInfo @popupEvent="popupAction" v-if="this.popup.popupFirstInfo" />
      </h2>
      <div class="benefit-slide" v-if="firstBuyPres != null">
        <PopupCartBenefitAlert @popupEvent="popupAction" v-if="this.popup.popupCartBenefitAlert" />
        <swiper :options="swiperBenefitProduct">
          <swiper-slide :key="each.itemId" v-for="each in itemList">
            <CartFirstProduct
              :selected="selectedItemCheck(each)"
              :value="each"
              @click="cartFirstProductClickAction(each)"
            />
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
import PopupFirstInfo from '@/views/od/PopupFirstInfo';
import NumberUtils from '@/common/NumberUtils';
import ImgUtils from '@/common/ImgUtils';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import CartFirstProduct from './CartFirstProduct';

export default {
  name: 'CartFirstProductList',
  props: {
    value: Object,
    firstBuyPres: Array,
    bsktInqRsltDto: Object,
    mbrDlvp: Object,
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
        popupFirstInfo: false,
      },
      totalPrice: [],
      check: [],
      firstBuy: 0,
      siteClass: CookieUtils.getSiteClass(),
      msgHide: true,
      storId: this.getStorId(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
    CartFirstProduct,
    swiper,
    swiperSlide,
    PopupCartBenefitAlert,
    PopupFirstInfo,
  },
  methods: {
    getStorId() {
      const storId = [];
      storId.push(CookieUtils.getCookie('STOR_ID'));
      if (CookieUtils.getCookie('SUPPL_FIRM_CD') == '31007') {
        storId.push('3014'); // 심플리쿡 매장
      } else if (CookieUtils.getCookie('SUPPL_FIRM_CD') == '31008') {
        storId.push('3015');
      }
      return storId;
    },
    selectedItemCheck(item) {
      if (!this.value) {
        return false;
      }
      return item.itemId === this.value.itemId;
    },
    cartFirstProductClickAction(item) {
      if (this.selected === item) {
        this.selected = null;
        CookieUtils.deleteCookie('cartFirstItemId');
      } else {
        this.selected = item;
        CookieUtils.setCookie(
          'cartFirstItemId',
          JSON.stringify({ itemId: item.itemId, itemNm: item.itemNm })
        );
      }
      this.emitChange();
    },
    emitChange() {
      this.$emit('input', this.selected);
      this.$emit('change', this.selected, this.value);
    },
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[type] = !this.popup[type];
      this.popup.open = !this.popup.open;
    },
    popupFirstEvent(type) {
      this.popupAction('popupFirstInfo');
    },
    computeSupplFirmScore(supplFirm) {
      let score = 0;

      if (supplFirm.chk === true) {
        score++;
        score *= 10;
      }

      score += 10 - (supplFirm.delivTypeCd || 0) * 1;

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
      if (!this.mbrDlvp) {
        return;
      }
      const orderMap = this.makeOrderMapBySupplFirmAndStor();
      const checkedMap = this.makeCheckedMapBySupplFirmAndStor();
      const delivTypeMap = this.makeDelivTypeMapBySupplFirmAndStor();
      console.log('delivTypeMap', delivTypeMap);

      let firstBuyPresList = this.firstBuyPres
        .map(each => {
          return each.promApplItemList.map(eachItem => {
            const delivType =
              delivTypeMap[eachItem.supplFirmCd + '_' + eachItem.storId] ||
              delivTypeMap[eachItem.supplFirmCd];
            return {
              chk:
                checkedMap[eachItem.supplFirmCd + '_' + eachItem.storId] ||
                checkedMap[eachItem.supplFirmCd],
              ...delivType,
              ...eachItem,
            };
          });
        })
        .reduce((p, c) => p.concat(c), [])
        .sort(this.comparator(this.orderScorer(orderMap)));

      firstBuyPresList = firstBuyPresList.filter(each => this.storId.includes(each.storId)); // 동일한 스토어 아이디로 필터링

      const distinctItemList = firstBuyPresList
        .map(each => each.itemId)
        .map((v, i, a) => a.indexOf(v))
        .filter((v, i, a) => a.indexOf(v) === i)
        .map(each => firstBuyPresList[each])
        .sort((l, r) => l.itemId - r.itemId);
      this.itemList = distinctItemList;

      const newValue = this.itemList
        .filter(each => this.selectedItemCheck(each))
        .reduce((p, c) => c, null);
      this.selected = newValue;

      let selectedIndexFirstBuy = null;
      let cartFirstItemIdDeleteChk = true;
      this.itemList.forEach((each, index) => {
        if (
          CookieUtils.getCookie('cartFirstItemId') != '' &&
          each.itemId ==
            JSON.parse(CookieUtils.getCookie('cartFirstItemId')).itemId
        ) {
          selectedIndexFirstBuy = index;
          this.selected = each;
          cartFirstItemIdDeleteChk = false;
        }
      });
      if (cartFirstItemIdDeleteChk) {
        CookieUtils.deleteCookie('cartFirstItemId');
      }
      if (selectedIndexFirstBuy != null) {
        const selectedIndexFirstBuyTemp = this.itemList[selectedIndexFirstBuy];
        this.itemList.splice(selectedIndexFirstBuy, 1);
        this.itemList.unshift(selectedIndexFirstBuyTemp);
      }

      this.emitChange();

      this.$nextTick(() => {
        this.headerAlertMsgHide();
      });
    },
    /* normalizeFirstBuyPres() {
            this.firstBuyPres.forEach(each => {
                const itemCount = each.promApplItemList.length;
                for (let i=0; i<itemCount; i++) {
                    const promApplItem = each.promApplItemList[i];
                    const promPresFrgf = each.promBeneZoneList[0].promPresFrgfList[i];
                    // promApplItem.itemCpnPromId = promPresFrgf.presFrgfApplVal;
                }
            });
        }, */
    headerAlertMsgHide() {
      this.msgHide = true;
      this.bsktInqRsltDto.delivTypeDtoList.forEach(e => {
        if (
          e.delivTypeCd === '01' ||
          e.delivTypeCd === '02' ||
          e.delivTypeCd === '04'
        ) {
          e.supplFirmDtoList.forEach(e => {
            e.bsktInqRsltDtoList.forEach(e => {
              if (e.chk) {
                this.msgHide = false;
              }
            });
          });
        }
      });
    },
  },
  computed: {},
  watch: {
    bsktInqRsltDto: {
      // deep: true,
      handler: function() {
        console.log('bsktInqRsltDto is modified');
        // this.normalizeFirstBuyPres(); 사용 하지 않음
        this.initItemList();
      },
    },
    mbrDlvp: {
      // deep: true,
      handler: function() {
        console.log('mbrDlvp is modified');
        // this.normalizeFirstBuyPres(); 사용 하지 않음
        this.initItemList();
      },
    },
  },
  created() {
    console.log('this.firstBuyPres', this.firstBuyPres);
    console.log('this.bsktInqRsltDto', this.bsktInqRsltDto);
    // this.normalizeFirstBuyPres(); 사용하지 않음
  },
  mounted() {
    this.initItemList();
  },
};
</script>

<style lang="scss">
</style>
