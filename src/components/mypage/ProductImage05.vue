<template>
  <!-- @상품목록 이미지 일반형5 -->
  <div class="product image product-05">
    <div class="item" :class="{'reserve' : isResvItem(itemValue.resvItemYn)}">
      <!-- 예약배송일 경우 reserve 클래스 추가 -->
      <!-- START : 3. 썸네일 -->
      <div class="item-thumbnail">
        <a href="javascript:void(0);" class="item-link" @click="goGoods(itemValue)">
          <!-- : 품절 상품 시 -->
          <div v-if="itemValue.ofsYn == 'Y' || itemValue.sellPosbQty == 0" class="sold-out">
            <strong>품절</strong>
          </div>
          <figure class="identify">
            <!-- 달리살다용 이미지 예시 -->
            <template v-if="daliProduct">
              <!-- : 연령제한 상품 시 -->
              <img
                v-if="itemValue.sellAgeRestrCd == '19' && this.$store.getters.getAdultCheck == false"
                src="@/assets/images/img/img_product_identification.jpg"
                title="성인인증필요"
                :alt="itemValue.dspItemNm"
              />
              <img v-else :src="getImg(itemValue.itemImg)" :alt="itemValue.dspItemNm" />
            </template>
            <template v-else>
              <!-- : 연령제한 상품 시 -->
              <img
                v-if="itemValue.sellAgeRestrCd == '19' && this.$store.getters.getAdultCheck == false"
                src="@/assets/images/img/img_product_identification.jpg"
                title="성인인증필요"
                :alt="itemValue.dspItemNm"
              />
              <img v-else :src="getImg(itemValue.itemImg)" :alt="itemValue.dspItemNm" />
            </template>
          </figure>
        </a>
        <!-- START : 2. 뱃지 -->
        <ul class="wrap-product-benefit" title="혜택">
          <!-- : 달리살다 케이스 -->
          <template v-if="daliProduct">
            <li
              class="ico-benefit discount"
              v-if="getDcRate(itemValue.sellAmt, itemValue.mbsDcAmt) > 4"
            >
              달리드림
              <span class="impt">{{ getDcRate(itemValue.sellAmt, itemValue.mbsDcAmt) }}%</span>
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
            <template v-if="$store.state.dp.daybreak">
              <span class="wrap-delivery-tag">
                <span
                  class="delivery-desc daybreak"
                  v-if="this.$store.state.dp.dayBreakStr != '' && itemValue.delivTypeCd == '01'"
                >{{this.$store.state.dp.dayBreakStr}}</span>
              </span>
            </template>
            <template v-else>
              <span class="wrap-delivery-tag">
                <span
                  v-if="itemValue.delivTypeCd == '02' && !(itemValue.ssevntClasfCd == '02')"
                  class="delivery-info"
                >전국택배</span>
                <span
                  v-if="itemValue.delivTypeCd == '03' && !(itemValue.ssevntClasfCd == '02')"
                  class="delivery-info"
                >업체택배</span>
                <span v-if="itemValue.resvItemYn == 'Y'" class="delivery-info">예약배송</span>
                <span
                  v-if="itemValue.resvItemYn == 'Y'"
                  class="delivery-desc"
                >{{getDay(itemValue.itemStkotInstBeginDt)}} 부터 순차배송</span>
                <span
                  v-if="itemValue.abrdDrctPurchItemYn == 'Y'"
                  class="delivery-info overseas"
                >해외배송</span>
                <span
                  v-if="(itemValue.delivTypeCd == '01' || itemValue.delivTypeCd == '02') && itemValue.ssevntClasfCd == '02'"
                  class="delivery-info"
                >위대한 빅세일</span>
                <span
                  v-if="itemValue.delivTypeCd == '03' && itemValue.ssevntClasfCd == '02'"
                  class="delivery-info"
                >위대한 택배</span>
              </span>
            </template>
            <!-- END : 6. 유형 -->
            <!-- START 8. 상품명 두 줄 -->
            <a href="javascript:void(0);" class="title-link" @click="goGoods(itemValue)">
              <strong class="title">
                <span class="hidden">상품명</span>
                <em>{{itemValue.dspItemNm}}</em>
              </strong>
            </a>
            <!-- END 8. 상품명 -->
          </dt>
          <!-- START : 9. 가격정보 (달리살다) -->
          <template v-if="daliProduct">
            <dd
              v-if="itemValue.mbsDcAmt > 0 && itemValue.mbsDcAmt != itemValue.bfrSellAmt"
              class="dali-list-price"
            >
              <span class="hidden">달리살다 멤버쉽 적용 전 가격</span>
              <span class="price">일반</span>
              {{itemValue.sellAmt | toCurrency}}원
            </dd>
            <dd class="dali-price">
              <span class="hidden">달리살다 멤버쉽 적용 후 가격</span>
              <span v-if="itemValue.mbsDcAmt > 0" class="ico-badge">달리드림</span>
              <strong
                class="price"
              >{{(itemValue.mbsDcAmt > 0)? itemValue.mbsDcAmt : itemValue.sellAmt | toCurrency }}</strong>원
              <button class="btn icon-question" aria-haspopup="dialog" @click="popupSalesActive">
                <span class="hidden">할인가 내역 상세보기</span>
              </button>
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
            <dd
              class="list-price"
              v-if="itemValue.normSprc > 0 && (itemValue.normSprc-itemValue.sellAmt > 0)"
            >
              <!-- : 할인가 일 경우만 노출 -->
              <span class="hidden">할인 적용 전 가격</span>
              <del class="price">{{itemValue.normSprc | toCurrency}}</del>원
            </dd>
            <dd class="selling-price" v-if="itemValue.sellAmt > 0">
              <span class="hidden">할인 적용 후 가격</span>
              <strong class="price">{{itemValue.sellAmt | toCurrency}}</strong>원
              <button
                class="btn icon-question"
                aria-haspopup="dialog"
                @click="popupSalesActive"
                v-if="(itemValue.normSprc-itemValue.sellAmt > 0)"
              >
                <!-- : 할인가 일 경우만 노출 -->
                <span class="hidden">할인가 내역 상세보기</span>
              </button>
            </dd>
          </template>
          <!-- END : 9. 가격정보 (GS fresh) -->
        </dl>
        <!-- START : 10. 장바구니 담기 -->
        <button
          v-if="itemValue.ofsYn == 'N'"
          class="btn icon btn-cart"
          aria-haspopup="dialog"
          @click="popupOptionAction"
        >
          <span class="hidden">장바구니 담기</span>
        </button>
        <button
          v-if="itemValue.ofsYn == 'Y' || itemValue.sellPosbQty == 0"
          class="btn icon btn-alarm"
          @click="popupOptionAction"
        >
          <!-- 품절일 경우 -->
          입고알림
        </button>
        <!-- END : 10. 장바구니 담기 -->
      </div>
    </div>
    <!-- START : 16. 가치속성 (달리살다) -->
    <ul
      class="wrap-product-tag dali"
      title="가치속성태그"
      v-if="daliProduct && itemValue.itemAttrs != null"
    >
      <li class="ico-tag" v-for="(item, index) in attrList" :key="index">
        <a href="javascript:void(0);">{{ item }}</a>
      </li>
    </ul>
    <!-- END : 16. 혜택 (달리살다) -->
    <!-- START : 16. 혜택 (GS fresh) -->
    <ul class="wrap-product-tag" title="혜택" v-else>
      <li v-if="itemValue.freeDelivYn == 'Y'" class="ico-tag">무료배송</li>
      <li
        v-if="itemValue.itemPurchMaxRestrQty > 0"
        class="ico-tag"
      >1인{{(itemValue.itemPurchMaxRestrQty > 0)? itemValue.itemPurchMaxRestrQty : 'N'}}개한정</li>
      <li v-if="itemValue.cardDcYn == 'Y'" class="ico-tag">카드할인</li>
      <li v-if="itemValue.dbleCpnYn == 'Y'" class="ico-tag">더블쿠폰</li>
      <li v-if="itemValue.cmplYn == 'Y'" class="ico-tag">다다익선</li>
      <li v-if="itemValue.frgfYn == 'Y'" class="ico-tag">사은품증정</li>
      <li v-if="itemValue.pntPresYn == 'Y'" class="ico-tag">포인트증정</li>
      <li v-if="itemValue.comcoYn == 'Y'" class="ico-tag">통신사할인</li>
    </ul>
    <!-- END : 16. 혜택 (GS fresh)  -->
    <!-- START : 17. 해외직구 (달리살다) -->
    <span class="txt-delivery-free" v-if="daliProduct && itemValue.abrdDrctPurchItemYn=='Y'">
      <span class="hidden">해외직구</span>
      달리드림 회원 무료배송
    </span>
    <!-- END : 17. 해외직구 (달리살다) -->
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
export default {
  name: 'ProductImage05',
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
    return {
      attrList: [],
    };
  },
  methods: {
    isResvItem(value) {
      return value == 'Y' ? true : false;
    },
    getDay(itemStkotInstBeginDt) {
      return ItemTemplete.getDay(itemStkotInstBeginDt);
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
      this.$emit('goCart', this.$props.itemValue);
    },
    getDcRate(normSprc, sellAmt) {
      return ItemTemplete.getDcRate(normSprc, sellAmt);
    },
    getAttrList(itemAttrs) {
      this.attrList = itemAttrs.split(',');
    },
  },
  mounted() {
    if (this.itemValue.itemAttrs != null) {
      this.getAttrList(this.itemValue.itemAttrs);
    }
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
};
</script>
