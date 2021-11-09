<template>
  <!-- @상품목록 이미지 일반형5 -->
  <div class="product image product-05">
    <div class="item reserve"><!-- 예약배송일 경우 reserve 클래스 추가 -->
      <!-- START : 3. 썸네일 -->
      <div class="item-thumbnail">
        <a :href="fnSite(relatedItem.itemId)" class="item-link">
          <!-- : 품절 상품 시 -->
          <div class="sold-out" v-if="relatedItem.ofsYn == 'Y' || relatedItem.sellPosbQty == 0">
            <strong>품절</strong>
          </div>
          <figure class="identify">
            <!-- 달리살다용 이미지 예시 -->
            <template v-if="daliProduct">
              <img src="@/assets/images/_temp/_img_dali_product_detail01.jpg" alt="유기농 노르 스키르 라즈베리/로즈워터" />
            </template>
            <template v-else>
              <img :src="getImg(relatedItem.itemImg)" :alt="relatedItem.itemNm" v-if="relatedItem.sellAgeRestrCd !='19' &&  relatedItem.itemImg != null && relatedItem.itemImg != ''"/>
            <!-- : 썸네일 없을 경우 -->
            <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="relatedItem.itemNm" v-else-if="relatedItem.sellAgeRestrCd !='19' && relatedItem.itemImg === null || relatedItem.itemImg === ''" />
            <!-- : 성인본인인증이 필요한 경우 -->
            <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" :alt="relatedItem.itemNm" v-else-if="relatedItem.sellAgeRestrCd ==='19'" />
            </template>
          </figure>
        </a>
        <!-- START : 2. 뱃지 -->
        <ul class="wrap-product-benefit" title="혜택">
          <li v-if="relatedItem.nplusYn == 'Y'" class="ico-benefit plus">1+1</li>
          <li v-if="relatedItem.newItemYn == 'Y'" class="ico-benefit new">new</li>
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
                <span v-if="relatedItem.ssevntClasfCd == '02'" class="delivery-info">위대한 빅세일</span>
                <span v-if="relatedItem.ssevntClasfCd == '03'" class="delivery-info">위대한 택배</span>
              </span>
            </template>
            <!-- END : 6. 유형 -->
            <!-- START 8. 상품명 두 줄 -->
            <a :href="fnSite(relatedItem.itemId)" class="title-link">
              <strong class="title">
                <span class="hidden">상품명</span>
                <em>{{relatedItem.dspItemNm}}</em>
              </strong>
            </a>
            <!-- END 8. 상품명 -->
          </dt>
          <!-- START : 9. 가격정보 (GS fresh) -->
          <dd class="discount" v-if="relatedItem.bfrSellAmt!=relatedItem.sellAmt">
            <span class="hidden">할인율</span>
            <strong class="num">{{getDcRate(relatedItem.bfrSellAmt,relatedItem.sellAmt)}}</strong>%
          </dd>
          <dd class="list-price" v-if="relatedItem.bfrSellAmt > 0 && (relatedItem.dblePrcIndYn='Y') && (relatedItem.bfrSellAmt!=relatedItem.sellAmt)"><!-- : 할인가 일 경우만 노출 -->
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
          <!-- END : 9. 가격정보 (GS fresh) -->
        </dl>
        <!-- START : 10. 장바구니 담기 -->
        <button
          v-if="relatedItem.ofsYn == 'N' || relatedItem.sellPosbQty > 0"
          class="btn icon btn-cart"
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
import ItemTemplete from '@/common/ItemTemplete';
import SiteUtils from '@/common/SiteUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'ProductImage05',
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
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    fnSite(val) {
      const param = 'itemId='+val+'&storId='+CookieUtils.getCookie("STOR_ID")+'&supplFirmCd='+CookieUtils.getCookie("SUPPL_FIRM_CD");
      const url = "/product_detail?"+ param;
      return SiteUtils.freshmo(url);
    },
    getDcRate(bfrSellAmt, sellAmt) {
      return ItemTemplete.getDcRate(bfrSellAmt, sellAmt);
    },
  },
  mounted() {
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
