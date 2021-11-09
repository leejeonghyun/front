<template>
  <!-- @상품목록 리스트 패키지형 -->
  <div class="product list product-package">
    <div class="item" :class="{'reserve' : isResvItem(itemValue.resvItemYn)}">
      <!-- 예약배송일 경우 reserve 클래스 추가 -->
      <!-- START : 3. 썸네일 -->
      <div class="item-thumbnail">
        <a href="javascript:void(0);" class="item-link" @click="goGoods(itemValue)">
          <!-- : 품절 상품 시 -->
          <div class="sold-out" v-if="itemValue.ofsYn == 'Y' || itemValue.sellPosbQty == 0">
            <strong>품절</strong>
          </div>
          <figure class="identify">
            <!-- : 연령제한 상품 시 -->
            <img
              v-if="itemValue.sellAgeRestrCd == '19' && this.$store.getters.getAdultCheck == false"
              src="@/assets/images/img/img_product_identification.jpg"
              title="성인인증필요"
              :alt="itemValue.itemNm"
            />
            <img v-else :src="getImg(itemValue.itemCtnsFileNm)" :alt="itemValue.itemNm" />
          </figure>
        </a>
      </div>
      <!-- END : 3. 썸네일 -->
      <div class="wrap-info">
        <span class="list-num">상품{{idx+1 | toSizeNum(2)}}</span>
        <!-- 21. 상품순서 // 묶은상품일 경우 노출 SC-FO-MD-GF-MS-012 -->
        <dl class="info" title="상품정보">
          <dt>
            <a href="javascript:void(0);" class="title-link">
              <!-- START : 7. MD소구문구(GS fresh), 브랜드명(달리살다) -->
              <p class="title-desc">
                <span class="brand" v-if="daliProduct">{{itemValue.brandNm}}</span>
                <span class="md" v-else>{{itemValue.itemPrStnCnts}}</span>
              </p>
              <!-- END : 7. MD소구문구(GS fresh), 브랜드명(달리살다) -->
              <!-- START 8. 상품명 한 줄-->
              <strong class="title" @click="goGoods(itemValue)">
                <span class="hidden">상품명</span>
                <em>{{itemValue.itemNm}}</em>
              </strong>
              <!-- END 8. 상품명 -->
            </a>
          </dt>
          <!-- START : 9. 가격정보 (달리살다) -->
          <template v-if="daliProduct">
            <dd class="dali-list-price">
              <span class="hidden">달리살다 멤버쉽 적용 전 가격</span>
              <span class="price">비회원</span>
              {{itemValue.sellAmt | toCurrency }}원
            </dd>
            <dd class="dali-price">
              <span class="hidden">달리살다 멤버쉽 적용 후 가격</span>
              <span class="ico-badge">달리드림</span>
              <strong
                class="price"
              >{{(itemValue.mbsDcAmt > 0)? itemValue.mbsDcAmt : itemValue.sellAmt | toCurrency }}</strong>원
            </dd>
          </template>
          <!-- END : 9. 가격정보 (달리살다) -->
          <!-- START : 9. 가격정보 (GS fresh) -->
          <template v-else>
            <dd class="discount" v-if="getDcRate(itemValue.normSprc,itemValue.sellAmt)>4">
              <!-- : 할인가 일 경우만 노출 -->
              <span class="hidden">할인율</span>
              <strong class="num">{{ getDcRate(itemValue.normSprc,itemValue.sellAmt) }}</strong>%
            </dd>
            <dd class="wrap-price">
              <span class="selling-price" v-if="itemValue.sellAmt > 0">
                <span class="hidden">할인 적용 후 가격</span>
                <strong class="price">{{itemValue.sellAmt | toCurrency}}</strong>원
              </span>
              <span
                class="list-price"
                v-if="itemValue.normSprc > 0 && (itemValue.normSprc-itemValue.sellAmt > 0)"
              >
                <!-- : 할인가 일 경우만 노출 -->
                <span class="hidden">할인 적용 전 가격</span>
                <del class="price">{{itemValue.normSprc | toCurrency}}</del>원
              </span>
            </dd>
            <dd
              class="product-desc"
              v-if="unitOn"
            >({{itemValue.itemPrcUnitQty}}{{itemValue.itemPrcUnitCd}}당 {{ getUnitPrc(itemValue.sellAmt, itemValue.itemPrcUnitQty, itemValue.itemPrcUnitVol) | toCurrency }}원)</dd>
          </template>
          <!-- END : 9. 가격정보 (GS fresh) -->
        </dl>
        <!-- ***** : 묶은상품일 경우 노출 SC-FO-MD-GF-MS-012 -->
        <div class="wrap-btn">
          <!-- START : 13. 상세보기 -->
          <div class="inner">
            <button
              class="btn-border"
              aria-haspopup="dialog"
              aria-label="상세보기 팝업활성화"
              @click="popupDetailAction(idx+1)"
            >상세보기</button>
          </div>
          <!-- END : 13. 상세보기 -->
          <!-- START : 14. 상품선택 -->
          <div class="inner">
            <button
              class="btn-bg lightgreen"
              aria-haspopup="dialog"
              aria-label="상품선택 팝업활성화"
              @click="popupOptionAction(itemValue)"
            >상품선택</button>
          </div>
          <!-- END : 14. 상품선택 -->
        </div>
        <!-- // ***** : 묶은상품일 경우 노출 SC-FO-MD-GF-MS-012 -->
      </div>
    </div>
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
import { EventBus } from '../../views/md/ProductDetail';
export default {
  name: 'ProductListPackage',
  components: {},
  props: {
    itemValue: Object,
    daliProduct: {
      // 달리살다 상품 체크
      type: Boolean,
      default: false, // 기본은 GS fresh 상품
    },
    idx: {
      type: Number,
    },
    plist: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      unitOn: true,
    };
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
    toSizeNum(value, size) {
      let retValue = '';
      const valStr = value.toString;
      console.log('value :: ' + value + ' : ' + size);
      console.log('value.length :: ' + valStr.length);
      for (let i = 0; i < size - valStr.length; i++) {
        retValue = '0' + retValue;
      }
      retValue = retValue + value;
      return retValue;
    },
    json: function(entry) {
      return JSON.stringify(entry);
    },
  },
  methods: {
    getDcRate(normSprc, sellAmt) {
      return ItemTemplete.getDcRate(normSprc, sellAmt);
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    goGoods(itemValue) {
      this.$router.push({ path: ItemTemplete.itemDetail(itemValue) });
    },
    popupDetailAction(rSeq) {
      // 묶음 상품 상세 팝업 활성화
      this.$emit('popupDetail', this.$props.itemValue, rSeq);
      this.$emit('popupEvent', 'popupDetail');
    },
    popupOptionAction(pitem) {
      // 바로구매 옵션 팝업 기본
      this.$emit('selPkgItem', pitem);

      // EventBus.$emit('ordItemInfo', this.ordItemInfo);
      // EventBus.setOrderAction('C');
    },
    getUnitPrc(sellAmt, unitQty, unitVol) {
      if (!(sellAmt > 0) || !(unitQty > 0) || !(unitVol > 0)) {
        this.unitOn = false;
        return null;
      } else {
        return ItemTemplete.getUnitPrc(sellAmt, unitQty, unitVol);
      }
    },
    isResvItem(value) {
      return value == 'Y' ? true : false;
    },
  },
  computed: {
    amtCalcPct: function() {
      const sellAmt = this.$props.itemValue.sellAmt;
      const bfrSellAmt = this.$props.itemValue.bfrSellAmt;
      return Math.round((sellAmt / bfrSellAmt) * 100);
    },
  },
  mounted() {},
};
</script>
