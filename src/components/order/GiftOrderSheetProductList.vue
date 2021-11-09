<template>
  <div>
    <section v-for="(ordsDelivGrpInfo, idx) in ordsItemList ? ordsItemList.ordsDelivGrpInfoList ? ordsItemList.ordsDelivGrpInfoList : [] : []" :key="idx" class="section-area border">
      <h3 class="sub-title2 no-bg border">{{ordsDelivGrpInfo.delivGrpNm}}({{ordsDelivGrpInfo.itemCnt}})</h3>
      <div v-for="(ordsDelivSupplGrpInfo) in ordsDelivGrpInfo ? ordsDelivGrpInfo.ordsDelivSupplGrpInfoList ? ordsDelivGrpInfo.ordsDelivSupplGrpInfoList : [] : []" :key="ordsDelivSupplGrpInfo.ordsDelivSeqno">
        <ul class="order-product-list">
          <li v-for="(ordsItemInfo) in ordsDelivSupplGrpInfo ? ordsDelivSupplGrpInfo.ordsItemInfoList ? ordsDelivSupplGrpInfo.ordsItemInfoList : [] : []" :key="ordsItemInfo.ordsItemSeqno">
            <ul v-if="isNotEmpty(ordsItemInfo.cmplPromId) && showOrdsCpmlList(ordsDelivSupplGrpInfo, ordsItemInfo)">
              <li v-for="(ordsCmplItemInfo) in ordsCmplPromList(ordsDelivSupplGrpInfo, ordsItemInfo)" :key="ordsCmplItemInfo.ordsItemSeqno">
                <dl>
                  <dt><span v-if="isNotEmpty(ordsCmplItemInfo.cmplPromSmmr)" aria-label="혜택" class="ico-benefit plus">{{ordsCmplItemInfo.cmplPromSmmr}}</span> {{ordsCmplItemInfo.itemNm}}</dt>
                  <dd class="thumb">
                    <a href="#">
                      <figure>
                        <img src="@/assets/images/_temp/_img_cart01_01.jpg" :alt="ordsCmplItemInfo.itemNm">
                      </figure>
                    </a>
                  </dd>
                  <dd class="shop" v-if="isNotEmpty(ordsCmplItemInfo.storGrpNm)">{{ordsCmplItemInfo.storGrpNm}}</dd>
                  <dd class="option" v-if="isNotEmpty(ordsCmplItemInfo.delivDt)"><p class="option-info">{{ordsCmplItemInfo.delivDt}}({{ordsCmplItemInfo.delivDow}})도착예정</p></dd>
                  <dd class="option" v-if="isNotEmpty(ordsCmplItemInfo.skuNm)"><p class="option-info">옵션 : {{ordsCmplItemInfo.skuNm}}</p></dd>
                  <dd class="count"><p class="option-info">수량 : {{comma(ordsCmplItemInfo.itemOrdQty)}}개</p></dd>
                  <dd class="list-price" aria-label="정상가격" v-if="ordsCmplItemInfo.sellAmt !== ordsCmplItemInfo.lastBeneSellAmt">
                    <del>{{comma(ordsCmplItemInfo.sellAmt)}}</del>원
                  </dd>
                  <dd class="sale-price" aria-label="판매가격">
                    <span class="number-sale-price">{{comma(ordsCmplItemInfo.lastBeneSellAmt)}}</span>
                    <span class="unit-won">원</span>
                    <button type="button" class="btn-infomation" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog" @click="popupDiscountActive(ordsCmplItemInfo ? ordsCmplItemInfo.ordsItemDcSate ? ordsCmplItemInfo.ordsItemDcSate : {} : {})"><span class="hidden">할인 안내</span></button>
                  </dd>
                </dl>
                <div class="btn-bottom">
                  <p class="btn-area">
                    <button type="button" class="btn-border btn-coupon" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog" @click="popupCouponActive(ordsCmplItemInfo)">쿠폰변경</button>
                  </p>
                </div>
                <div class="simplycook-option" v-if="(ordsCmplItemInfo ? ordsCmplItemInfo.ordsItemCompoInfoList ? ordsCmplItemInfo.ordsItemCompoInfoList: [] : []).length > 0">
                  <dl v-for="(ordsItemCompoInfo) in ordsCmplItemInfo ? ordsCmplItemInfo.ordsItemCompoInfoList ? ordsCmplItemInfo.ordsItemCompoInfoList: [] : []" :key="ordsItemCompoInfo.ordsItemSeqno">
                    <dt>{{ordsItemCompoInfo.itemNm}} {{ordsItemCompoInfo.itemOrdQty}}개</dt>
                    <dd class="sale-price" aria-label="판매가격">
                      <span class="number-sale-price">{{comma(ordsItemCompoInfo.dcSellAmt)}}</span>
                      <span class="unit-won">원</span>
                    </dd>
                  </dl>
                </div>
                <div class="go-shopping txt" v-if="isNotEmpty(ordsCmplItemInfo.itemPresFrgfCnts)"><p>증정 사은품 : {{ordsCmplItemInfo.itemPresFrgfCnts}}</p></div>
              </li>
            </ul>
            <dl v-if="isEmpty(ordsItemInfo.cmplPromId)">
              <dt><span v-if="isNotEmpty(ordsItemInfo.cmplPromSmmr)" aria-label="혜택" class="ico-benefit plus">{{ordsItemInfo.cmplPromSmmr}}</span> {{ordsItemInfo.itemNm}}</dt>
              <dd class="thumb">
                <a href="#">
                  <figure>
                    <img src="@/assets/images/_temp/_img_cart01_01.jpg" :alt="ordsItemInfo.itemNm">
                  </figure>
                </a>
              </dd>
              <dd class="shop" v-if="isNotEmpty(ordsItemInfo.storGrpNm)">{{ordsItemInfo.storGrpNm}}</dd>
              <dd class="option" v-if="isNotEmpty(ordsItemInfo.delivDt)"><p class="option-info">{{ordsItemInfo.delivDt}}({{ordsItemInfo.delivDow}})도착예정</p></dd>
              <dd class="option" v-if="isNotEmpty(ordsItemInfo.skuNm)"><p class="option-info">옵션 : {{ordsItemInfo.skuNm}}</p></dd>
              <dd class="count"><p class="option-info">수량 : {{comma(ordsItemInfo.itemOrdQty)}}개</p></dd>
              <dd class="list-price" aria-label="정상가격" v-if="ordsItemInfo.sellAmt !== ordsItemInfo.lastBeneSellAmt">
                <del>{{comma(ordsItemInfo.sellAmt)}}</del>원
              </dd>
              <dd class="sale-price" aria-label="판매가격">
                <span class="number-sale-price">{{comma(ordsItemInfo.lastBeneSellAmt)}}</span>
                <span class="unit-won">원</span>
                <button type="button" class="btn-infomation" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog" @click="popupDiscountActive(ordsItemInfo ? ordsItemInfo.ordsItemDcSate ? ordsItemInfo.ordsItemDcSate : {} : {})"><span class="hidden">할인 안내</span></button>
              </dd>
            </dl>
            <div v-if="isEmpty(ordsItemInfo.cmplPromId)" class="btn-bottom">
              <p class="btn-area">
                <button type="button" class="btn-border btn-coupon" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog" @click="popupCouponActive(ordsItemInfo)">쿠폰변경</button>
              </p>
            </div>
            <div class="simplycook-option" v-if="isEmpty(ordsItemInfo.cmplPromId) && (ordsItemInfo ? ordsItemInfo.ordsItemCompoInfoList ? ordsItemInfo.ordsItemCompoInfoList: [] : []).length > 0">
              <dl v-for="(ordsItemCompoInfo) in ordsItemInfo ? ordsItemInfo.ordsItemCompoInfoList ? ordsItemInfo.ordsItemCompoInfoList: [] : []" :key="ordsItemCompoInfo.ordsItemSeqno">
                <dt>{{ordsItemCompoInfo.itemNm}} {{ordsItemCompoInfo.itemOrdQty}}개</dt>
                <dd class="sale-price" aria-label="판매가격">
                  <span class="number-sale-price">{{comma(ordsItemCompoInfo.dcSellAmt)}}</span>
                  <span class="unit-won">원</span>
                </dd>
              </dl>
            </div>
            <div class="go-shopping txt" v-if="isEmpty(ordsItemInfo.cmplPromId) && isNotEmpty(ordsItemInfo.itemPresFrgfCnts)"><p>증정 사은품 : {{ordsItemInfo.itemPresFrgfCnts}}</p></div>
          </li>
        </ul>
        <div class="total-price-info">
          <p class="price-info">총 상품금액  {{comma(ordsDelivSupplGrpInfo.delivOrdSchedAmt)}}원 + 배송비 {{comma(ordsDelivSupplGrpInfo.delivDlfee)}}원 = {{comma(ordsDelivSupplGrpInfo.delivOrdSchedAmt + ordsDelivSupplGrpInfo.delivDlfee)}}원</p>
        </div>
      </div>
    </section>
    <div class="total-price-wrap">
      <p class="price-info"><strong>총 주문예정금액 {{comma(ordsItemList.totOrdSchedAmt + ordsItemList.totDlfee)}}원</strong> (배송비{{comma(ordsItemList.totDlfee)}}원 포함)</p>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';

export default {
  name: "OrderSheetProductList",
  props: {
    ordsItemList: Object,
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
    popupDiscountActive(ordsItemDcSate) {
      this.$emit('popupEvent', 'popupOrderDiscountInfo', ordsItemDcSate);
    },
    popupCouponActive(ordsItemInfo) {
      this.$emit('popupEvent', 'popupOrderCouponList', ordsItemInfo);
    },
    popupAction(type) { // 팝업 활성/비활성
      this.$emit('popupEvent', 'popupAddrList');
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
    showOrdsCpmlList(ordsDelivSupplGrpInfo, ordsItemInfo) {
      let ordsItemInfoList = [];
      if (ordsItemInfo.cmplPromId) {
        ordsItemInfoList = ordsDelivSupplGrpInfo.ordsItemInfoList.filter(oi => cmplPromId === oi.cmplPromId);
        if (ordsItemInfoList[0].ordsItemSeqno === ordsItemInfo.ordsItemSeqno) {
          return true;
        }
      }
      return false;
    },
    ordsCmplPromList(ordsDelivSupplGrpInfo, ordsItemInfo) {
      let ordsItemInfoList = [];
      if (ordsItemInfo.cmplPromId) {
        ordsItemInfoList = ordsDelivSupplGrpInfo.ordsItemInfoList.filter(oi => cmplPromId === oi.cmplPromId);
        if (ordsItemInfoList[0].ordsItemSeqno === ordsItemInfo.ordsItemSeqno) {
          return ordsItemInfoList;
        }
      }
      return [];
    },
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
