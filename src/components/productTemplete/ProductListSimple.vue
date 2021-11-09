<template>
  <!-- @상품목록 리스트 요약형 -->
  <div class="product list product-simple">
    <div class="item">
      <!-- START : 3. 썸네일 -->
      <div class="item-thumbnail">
        <a href="javascript:void(0);" class="item-link" @click="goGoods(itemValue)"
          data-sc-action="prod.click" data-dimension-name="prod.searchRecentArea" :data-dimension-value="itemValue.itemId"
        >
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
              :alt="itemValue.dspItemNm?itemValue.dspItemNm:itemValue.itemNm"
            />
            <img v-else :src="getImg(itemValue.itemImg)" :alt="itemValue.dspItemNm?itemValue.dspItemNm:itemValue.itemNm" />
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
            <!-- 5월 수정 정책변경 : 추가 -> 달리드림 문구 수정 -->
            <li v-if="itemValue.newItemYn == 'Y'" class="ico-benefit dali-new">new</li>
            <li
              v-if="(itemValue.nplusYn !== 0 && itemValue.nplusYn > 0) || (itemValue.nplusVal !== 0 && itemValue.nplusVal > 0)"
              class="ico-benefit double"
            >{{itemValue.nplusYn==="Y"?itemValue.nplusVal:itemValue.nplusYn}}+1</li>
          </template>
          <template v-else>
            <li
              v-if="(itemValue.nplusYn !== 0 && itemValue.nplusYn > 0) || (itemValue.nplusVal !== 0 && itemValue.nplusVal > 0)"
              class="ico-benefit plus"
            >{{itemValue.nplusYn==="Y"?itemValue.nplusVal:itemValue.nplusYn}}+1</li>
            <li v-if="itemValue.newItemYn == 'Y'" class="ico-benefit new">new</li>
          </template>
        </ul>
        <!-- END : 2. 뱃지 -->
      </div>
      <!-- END : 3. 썸네일 -->
      <div class="wrap-info">
        <dl class="info">
          <dt>
            <!-- START : 6. 유형 -->
            <!-- 새벽배송만 노출 -->
            <template v-if="daybreak">
              <span class="wrap-delivery-tag">
                <span class="delivery-desc daybreak">{{$store.getters.getdaybreakDelivTime}}</span>
              </span>
            </template>
            <!-- END : 6. 유형 -->
            <!-- START 8. 상품명 두 줄 -->
            <a href="javascript:void(0);" class="title-link" @click="goGoods(itemValue)"
              data-sc-action="prod.click" data-dimension-name="prod.searchRecentArea" :data-dimension-value="itemValue.itemId"
            >
              <strong class="title">
                <span class="hidden">상품명</span>
                <em>{{itemValue.dspItemNm?itemValue.dspItemNm:itemValue.itemNm}}</em>
              </strong>
            </a>
            <!-- END 8. 상품명 두 줄 -->
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
            <dd class="discount" v-if="getDcRate(itemValue.normSprc,itemValue.sellAmt)>4">
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
      </div>
    </div>
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: 'ProductListSimple',
  props: {
    itemValue: Object,
    daliProduct: {
      // 달리살다 상품 체크
      type: Boolean,
      default: false, // 기본은 GS fresh 상품
    },
    daybreak: {
      // 새벽배송 상품 체크
      type: Boolean,
      default: false, // 기본은 GS fresh 상품
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    getDali(normSprc, mbsDcAmt) {
      return ItemTemplete.getDali(normSprc, mbsDcAmt);
    },
    goGoods(itemValue) {
      // 통합검색 고려 수정
      SiteUtils.go(location.host, ItemTemplete.itemDetail(itemValue, true), ItemTemplete.getMall(itemValue));
      // this.$router.push({ path: ItemTemplete.itemDetail(itemValue) });
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    getDcRate(normSprc, sellAmt) {
      return ItemTemplete.getDcRate(normSprc, sellAmt);
    },
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
};
</script>
