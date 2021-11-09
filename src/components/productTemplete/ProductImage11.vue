<template>
  <!-- @상품목록 이미지 일반형11 -->
  <div class="product image product-11">
    <div class="item">
      <!-- START : 3. 썸네일 -->
      <div class="item-thumbnail">
        <a href="#" class="item-link" @click="goGoods(itemValue)">
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
              :alt="itemValue.dspItemNm"
            />
            <img v-else v-lazy="getImg(itemValue.itemImg)" :alt="itemValue.dspItemNm" />
          </figure>
        </a>
        <!-- START : 2. 뱃지 -->
        <ul class="wrap-product-benefit" title="혜택">
          <!-- : 달리살다 케이스 -->
          <template v-if="daliProduct">
            <li
              class="ico-benefit discount"
              v-if="((itemValue.itemPrcTypeCd =='02') || (itemValue.cpnPromId != null)) && getDali(itemValue.normSprc, itemValue.mbsDcAmt) > 4"
            >
              달리드림
              <span class="impt">{{ getDali(itemValue.normSprc, itemValue.mbsDcAmt) }}%</span>
            </li>
            <li v-if="itemValue.newItemYn == 'Y'" class="ico-benefit dali-new">new</li>
            <li
              v-if="itemValue.nplusYn !== 0 && itemValue.nplusYn > 0"
              class="ico-benefit double"
            >{{itemValue.nplusYn}}+1</li>
          </template>
          <template v-else>
            <li
              v-if="itemValue.nplusYn !== 0 && itemValue.nplusYn > 0"
              class="ico-benefit plus"
            >{{itemValue.nplusYn}}+1</li>
            <li v-if="itemValue.newItemYn == 'Y'" class="ico-benefit new">new</li>
          </template>
        </ul>
        <!-- END : 2. 뱃지 -->
      </div>
      <!-- END : 3. 썸네일 -->
      <div class="wrap-info">
        <dl class="info" title="상품정보">
          <dt>
            <!-- START : 6. 유형 -->
            <span class="wrap-delivery-tag" v-if="$store.state.dp.daybreak">
              <span
                class="delivery-desc daybreak"
                v-if="this.$store.state.dp.dayBreakStr != '' && itemValue.delivTypeCd == '01'"
              >{{this.$store.state.dp.dayBreakStr}}</span>
            </span>
            <!-- END : 6. 유형 -->
            <!-- START 8. 상품명 한 줄 -->
            <a href="#" class="title-link" @click="goGoods(itemValue)">
              <strong class="title">
                <span class="hidden">상품명</span>
                <em>{{itemValue.dspItemNm}}</em>
              </strong>
            </a>
            <!-- END 8. 상품명 -->
          </dt>
          <!-- START : 9. 가격정보 (달리살다) -->
          <template v-if="daliProduct">
            <dd class="dali-list-price">
              <span class="hidden">달리살다 멤버쉽 적용 전 가격</span>
              <span class="price">비회원</span>
              {{itemValue.normSprc | toCurrency }}원
            </dd>
            <dd class="dali-price" v-if="itemValue.mbsDcAmt > 0">
              <span class="hidden">달리살다 멤버쉽 적용 후 가격</span>
              <span class="ico-badge">달리드림</span>
              <strong
                class="price"
              >{{(parseInt(itemValue.normSprc) > parseInt(itemValue.mbsDcAmt))? itemValue.mbsDcAmt : itemValue.normSprc | toCurrency }}</strong>원
            </dd>
          </template>
          <!-- END : 9. 가격정보 (달리살다) -->
          <!-- START : 9. 가격정보 (GS fresh) -->
          <template v-else>
            <dd class="discount" v-if="getDcRate(itemValue.normSprc,itemValue.sellAmt) > 4">
              <!-- : 할인가 일 경우만 노출 -->
              <span class="hidden">할인율</span>
              <strong class="num">{{ getDcRate(itemValue.normSprc,itemValue.sellAmt) }}</strong>%
            </dd>
            <dd class="selling-price" v-if="itemValue.sellAmt > 0">
              <span class="hidden">할인 적용 후 가격</span>
              <strong class="price">{{itemValue.sellAmt | toCurrency}}</strong>원
            </dd>
          </template>
          <!-- END : 9. 가격정보 (GS fresh) -->
        </dl>
        <!-- START : 10. 장바구니 담기 -->
        <button
          class="btn icon btn-cart"
          v-if="itemValue.ofsYn == 'N' && itemValue.sellPosbQty && itemValue.sellPosbQty > 0"
          aria-haspopup="dialog"
          @click="popupOptionAction"
        >
          <span class="hidden">장바구니 담기</span>
        </button>
        <button
          class="btn icon btn-alarm"
          v-if="itemValue.ofsYn == 'Y'  || itemValue.sellPosbQty == 0"
          @click="popupOptionAction"
        >
          <!-- 품절일 경우 -->
          입고알림
        </button>
        <!-- END : 10. 장바구니 담기 -->
      </div>
    </div>
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';

export default {
  name: 'ProductImage11',
  components: {},
  props: {
    itemValue: Object,
    daliProduct: {
      // 달리살다 상품 체크
      type: Boolean,
      default: false, // 기본은 GS fresh 상품
    },
  },
  data() {
    return {};
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
  methods: {
    getDali(normSprc, mbsDcAmt) {
      return ItemTemplete.getDali(normSprc, mbsDcAmt);
    },
    getDcRate(normSprc, sellAmt) {
      return ItemTemplete.getDcRate(normSprc, sellAmt);
    },
    goGoods(itemValue) {
      this.$router.push({ path: ItemTemplete.itemDetail(itemValue) });
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    popupSalesActive() {
      // 할인 내역 팝업 활성화
      this.$emit('popupEvent', 'popupSales');
    },
    popupOptionAction() {
      // 10. 장바구니 담기 옵션 팝업 기본
      // this.$emit('popupEvent', 'popupOption');
      this.$emit('goCart', this.$props.itemValue);
    },
  },
  mounted() {},
};
</script>
