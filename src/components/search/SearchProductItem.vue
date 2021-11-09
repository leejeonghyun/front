<template>
  <!-- @상품목록 리스트 일반형2 -->
  <div class="product list product-02">
    <div class="item reserve"><!-- 예약배송일 경우 reserve 클래스 추가 -->
      <!-- START : 3. 썸네일 -->
      <div class="item-thumbnail">
        <a :href="fnSite(relatedItem.itemId)" class="item-link">
          <!-- : 품절 상품 시 -->
          <div class="sold-out" v-if="relatedItem.ofsYn == 'Y' || relatedItem.sellPosbQty == 0">
            <strong>품절</strong>
          </div>
          <figure class="identify">
            <img :src="getImg(relatedItem.itemImg)" :title="relatedItem.itemNm" v-if="relatedItem.sellAgeRestrCd !='19' &&  relatedItem.itemImg != null && relatedItem.itemImg != ''"/>
            <!-- : 썸네일 없을 경우 -->
            <img src="@/assets/images/img/img_product_nothumb.jpg" :title="relatedItem.itemNm" :altt="relatedItem.itemNm" v-else-if="relatedItem.sellAgeRestrCd !='19' && relatedItem.itemImg === null || relatedItem.itemImg === ''" />
            <!-- : 성인본인인증이 필요한 경우 -->
            <img src="@/assets/images/img/img_product_identification.jpg" :title="relatedItem.itemNm" :alt="relatedItem.itemNm" v-else-if="relatedItem.sellAgeRestrCd ==='19'" />
          </figure>
        </a>
        <!-- START : 2. 뱃지 -->
        <ul class="wrap-product-benefit" title="혜택">
          <!-- : 달리살다 케이스 -->
          <template v-if="daliProduct">
            <li class="ico-benefit discount">추가<span class="impt">30%</span></li>
            <li class="ico-benefit dali-new">new</li>
            <!-- <li class="ico-benefit double">1+1</li> -->
          </template>
          <template v-else>
            <li v-if="relatedItem.nplusYn == 'Y'" class="ico-benefit plus">1+1</li>
            <li v-if="relatedItem.newItemYn == 'Y'" class="ico-benefit new">new</li>
          </template>
        </ul>
        <!-- END : 2. 뱃지 -->
      </div>
      <!-- END : 3. 썸네일 -->
      <div class="wrap-info">
        <dl class="info" title="상품정보">
          <dt>
            <!-- START : 6. 유형 -->
            <template v-if="dayBreakProduct">
              <span class="wrap-delivery-tag">
                <span class="delivery-desc daybreak">2/24(월) 오전 7시 이전 도착</span>
              </span>
            </template>
            <template v-else>
              <span class="wrap-delivery-tag">
                <span v-if="relatedItem.delivTypeCd == '02'" class="delivery-info">전국택배</span>
                <span v-if="relatedItem.delivTypeCd == '03'" class="delivery-info">업체택배</span>
                <span v-if="relatedItem.resvItemYn == 'Y'" class="delivery-info">예약배송</span>
                <span v-if="relatedItem.resvItemYn == 'Y'" class="delivery-desc">{{getDay(relatedItem.itemStkotInstBeginDt)}} 부터 순차배송</span>
                <span
                  v-if="relatedItem.abrdDrctPurchItemYn == 'Y'"
                  class="delivery-info overseas"
                >해외배송</span>
              </span>
            </template>
            <!-- END : 6. 유형 -->
            <a href="#" class="title-link">
              <!-- START : 7. MD소구문구(GS fresh), 브랜드명(달리살다) -->
              <p class="title-desc">
                <span class="brand" v-if="daliProduct">{{ itemValue.itemPrStnCnts }}</span>
                <span class="md" v-else>{{relatedItem.itemPrStnCnts}}</span>
              </p>
              <!-- END : 7. MD소구문구(GS fresh), 브랜드명(달리살다) -->
              <!-- START 8. 상품명 한 줄 -->
              <strong class="title">
                <span class="hidden">상품명</span>
                <em>{{relatedItem.itemNm}}</em>
              </strong>
              <!-- END 8. 상품명 -->
            </a>
          </dt>
          <!-- START : 9. 가격정보 (달리살다) -->
          <template v-if="daliProduct">
            <dd class="dali-list-price">
              <span class="hidden">달리살다 멤버쉽 적용 전 가격</span>
              <span class="price">일반</span>22,720원
            </dd>
            <dd class="dali-price">
              <span class="hidden">달리살다 멤버쉽 적용 후 가격</span>
              <span class="ico-badge">달리드림</span>
              <strong class="price">50,000</strong>원
              <button class="btn icon-question" aria-haspopup="dialog" @click="popupSalesActive">
                <span class="hidden">할인가 내역 상세보기</span>
              </button>
            </dd>
          </template>
          <!-- END : 9. 가격정보 (달리살다) -->
          <!-- START : 9. 가격정보 (GS fresh) -->
          <template v-else>
            <dd class="discount" v-if="relatedItem.bfrSellAmt!=relatedItem.sellAmt">
              <!-- : 할인가 일 경우만 노출 -->
              <span class="hidden">할인율</span>
              <strong class="num">{{ getDcRate(relatedItem.bfrSellAmt,relatedItem.sellAmt) }}</strong>%
            </dd>
            <dd
              class="list-price"
              v-if="relatedItem.bfrSellAmt > 0 && (relatedItem.dblePrcIndYn='Y') && (relatedItem.bfrSellAmt!=relatedItem.sellAmt)"
            >
              <!-- : 할인가 일 경우만 노출 -->
              <span class="hidden">할인 적용 전 가격</span>
              <del class="price">{{relatedItem.bfrSellAmt | toCurrency}}</del>원
            </dd>
            <dd class="selling-price" v-if="relatedItem.bfrSellAmt > 0">
              <span class="hidden">할인 적용 후 가격</span>
              <strong class="price">{{relatedItem.sellAmt | toCurrency}}</strong>원
              <!-- : 할인가 일 경우만 노출 -->
              <!-- <button class="btn icon-question" aria-haspopup="dialog" @click="popupSalesActive">
                <span class="hidden">할인가 내역 상세보기</span>
              </button> -->
            </dd>
            <dd
              class="product-desc"
              v-if="unitOn"
            >({{relatedItem.itemPrcUnitQty}}{{relatedItem.itemPrcUnitCd}}당 {{ getUnitPrc(relatedItem.sellAmt, relatedItem.itemPrcUnitQty, relatedItem.itemPrcUnitVol) | toCurrency }}원)</dd>
          </template>
          <!-- END : 9. 가격정보 (GS fresh) -->
        </dl>
        <!-- START : 10. 장바구니 담기 -->
        <button
          class="btn icon btn-cart"
          v-if="relatedItem.ofsYn == 'N' || relatedItem.sellPosbQty > 0"
          aria-haspopup="dialog"
          @click="popupOptionAction"
        >
          <span class="hidden">장바구니 담기</span>
        </button>
        <button
          v-if="relatedItem.ofsYn == 'Y' || relatedItem.sellPosbQty == 0"
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
    <ul class="wrap-product-tag dali" title="가치속성태그" v-if="daliProduct">
      <li class="ico-tag">
        <a href="#">프리미엄</a>
      </li>
      <li class="ico-tag">
        <a href="#">무방부제</a>
      </li>
      <li class="ico-tag">
        <a href="#">저자극</a>
      </li>
      <li class="ico-tag">
        <a href="#">무방부제</a>
      </li>
    </ul>
    <!-- END : 16. 혜택 (달리살다) -->
    <!-- START : 16. 혜택 (GS fresh) -->
    <ul class="wrap-product-tag" title="혜택" v-else>
      <li v-if="relatedItem.freeDelivYn == 'Y'" class="ico-tag">무료배송</li>
      <li v-if="relatedItem.itemPurchMaxRestrQty>0" class="ico-tag">1인N개한정</li>
      <li v-if="relatedItem.cardDcPosbYn == 'Y'" class="ico-tag">카드할인</li>
      <li v-if="relatedItem.dbleCpnYn == 'Y'" class="ico-tag">더블쿠폰</li>
      <li v-if="relatedItem.cmplYn == 'Y'" class="ico-tag">다다익선</li>
      <li v-if="relatedItem.frgfYn == 'Y'" class="ico-tag">사은품증정</li>
      <li v-if="relatedItem.pntPresYn == 'Y'" class="ico-tag">포인트증정</li>
      <li v-if="relatedItem.comcoYn == 'Y'" class="ico-tag">통신사할인</li>
    </ul>
    <!-- END : 16. 혜택 (GS fresh)  -->
    <!-- START : 17. 해외직구 (달리살다) -->
    <span class="txt-delivery-free" v-if="daliProduct">
      <span class="hidden">해외직구</span>
      달리드림 회원 무료배송
    </span>
    <!-- END : 17. 해외직구 (달리살다) -->
  </div>
</template>

<script>
import SiteUtils from '@/common/SiteUtils';
import CookieUtils from '@/common/CookieUtils';
import ItemTemplete from '@/common/ItemTemplete';
export default {
  name: 'ProductList02',
  components: {
  },
  props: {
    daliProduct: { // 달리살다 상품 체크
      type: Boolean,
      default: false, // 기본은 GS fresh 상품
    },
    dayBreakProduct: { // 새벽배송만 나오는 항목 체크
      type: Boolean,
      default: false, // 기본은 hidden 상태
    },
    relatedItem: Object
  },
  data() {
    return {
      unitOn: true,
    };
  },
  methods: {
    popupSalesActive() { // 할인 내역 팝업 활성화
      this.$emit('popupEvent', 'popupSales');
    },
    popupOptionAction() { // 10. 장바구니 담기 옵션 팝업 기본
      // this.$emit('popupEvent', 'popupOption');
      this.$emit('goCart', this.$props.relatedItem);
    },
    fnSite(val) {
      const param = 'itemId='+val;
      const url = "/md/product_detail?"+ param;
      return SiteUtils.freshmo(url);
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    getDcRate(bfrSellAmt, sellAmt) {
      return ItemTemplete.getDcRate(bfrSellAmt, sellAmt);
    },
    getUnitPrc(sellAmt, unitQty, unitVol) {
      if (!(sellAmt > 0) || !(unitQty > 0) || !(unitVol > 0)) {
        this.unitOn = false;
        return null;
      } else {
        return ItemTemplete.getUnitPrc(sellAmt, unitQty, unitVol);
      }
    },
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
