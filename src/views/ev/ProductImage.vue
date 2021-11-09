<template>
  <!-- @상품목록 이미지 일반형5 -->
  <div class="product image product-05" v-bind:class="[siteClass]">
    <div class="item" :class="{'reserve' : isResvItem(relatedItem.resvItemYn)}">
      <!-- 예약배송일 경우 reserve 클래스 추가 -->
      <!-- START : 3. 썸네일 -->
      <div class="item-thumbnail">
        <a href="javascript://" @click="fnSite(relatedItem.itemId, relatedItem.mallId, relatedItem.delivTypeCd, relatedItem.storId, relatedItem.supplFirmCd)" class="item-link">
          <!-- : 품절 상품 시 -->
          <div class="sold-out" v-if="relatedItem.ofsYn == 'Y' || relatedItem.sellPosbQty == 0">
            <strong>품절</strong>
          </div>
          <figure class="identify">
            <template>
              <!-- : 연령제한 상품 시 -->
              <img
                v-if="relatedItem.sellAgeRestrCd == '19' && this.$store.getters.getAdultCheck == false"
                src="@/assets/images/img/img_product_identification.jpg"
                title="성인인증필요"
                :alt="relatedItem.dspItemNm"
              />
              <img v-else :src="getImg(relatedItem.itemImg)" :alt="relatedItem.itemNm"/>
            </template>
          </figure>
        </a>
        <!-- START : 2. 뱃지 -->
        <ul class="wrap-product-benefit" title="혜택">
          <!-- : 달리살다 케이스 -->
          <template v-if="siteClass == 'dalisalda'">
            <li
              class="ico-benefit discount"
              v-if="getDcRate(relatedItem.sellAmt, relatedItem.mbsDcAmt) > 4"
            >
              달리드림
              <span class="impt">{{ getDcRate(relatedItem.sellAmt, relatedItem.mbsDcAmt) }}%</span>
            </li>
            <li v-if="relatedItem.newItemYn == 'Y'" class="ico-benefit dali-new">new</li>
            <li
              v-if="relatedItem.nplusYn !== 0 && itemValue.nplusYn > 0"
              class="ico-benefit double"
            >{{relatedItem.nplusYn}}+1</li>
          </template>
          <template v-else>
            <li v-if="relatedItem.nplusYn !== 0 && relatedItem.nplusYn > 0" class="ico-benefit plus">{{relatedItem.nplusYn}}+1</li>
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
            <template v-if="$store.state.dp.daybreak">
              <span class="wrap-delivery-tag">
                <span
                  v-if="itemValue.delivTypeCd == '02' && !(itemValue.ssevntClasfCd == '02')"
                  class="delivery-info"
                >전국택배</span>
                <span
                  v-if="itemValue.delivTypeCd == '03' && !(itemValue.ssevntClasfCd == '02')"
                  class="delivery-info"
                >업체택배</span>
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
                <span v-if="itemValue.resvItemYn == 'Y'" class="delivery-info">예약배송</span>
                <span
                  v-if="itemValue.resvItemYn == 'Y'"
                  class="delivery-desc"
                >{{getDay(itemValue.itemStkotInstBeginDt)}} 부터 순차배송</span>
                <span
                  class="delivery-desc daybreak"
                  v-if="this.$store.state.dp.dayBreakStr != '' && itemValue.delivTypeCd == '01' && itemValue.resvItemYn == 'N'"
                >{{this.$store.state.dp.dayBreakStr}}</span>
              </span>
            </template>
            <template v-else>
              <span class="wrap-delivery-tag">
                <span v-if="relatedItem.delivTypeCd == '02' && !(relatedItem.ssevntClasfCd == '02')" class="delivery-info">전국택배</span>
                <span v-if="relatedItem.delivTypeCd == '03' && !(relatedItem.ssevntClasfCd == '02')" class="delivery-info">업체택배</span>
                <span v-if="relatedItem.resvItemYn == 'Y'" class="delivery-info">예약배송</span>
                <span v-if="relatedItem.resvItemYn == 'Y'" class="delivery-desc">{{getDay(relatedItem.itemStkotInstBeginDt)}} 부터 순차배송</span>
                <span
                  v-if="relatedItem.abrdDrctPurchItemYn == 'Y'"
                  class="delivery-info overseas"
                >해외배송</span>
                <span v-if="(relatedItem.delivTypeCd == '01' || relatedItem.delivTypeCd == '02') && relatedItem.ssevntClasfCd == '02'" class="delivery-info">위대한 빅세일</span>
                <span v-if="relatedItem.delivTypeCd == '03' && relatedItem.delivTypeCd == '02'" class="delivery-info">위대한 택배</span>
              </span>
            </template>
            <!-- END : 6. 유형 -->
            <!-- START 8. 상품명 두 줄 -->
            <a href="javascript://" @click="fnSite(relatedItem.itemId, relatedItem.mallId, relatedItem.delivTypeCd, relatedItem.storId, relatedItem.supplFirmCd)" class="title-link">
              <strong class="title">
                <span class="hidden">상품명</span>
                <em>{{relatedItem.dspItemNm}}</em>
              </strong>
            </a>
            <!-- END 8. 상품명 -->
          </dt>
          <!-- START : 9. 가격정보 (달리살다) -->
          <template v-if="siteClass == 'dalisalda'">
            <dd class="dali-list-price">
              <span class="hidden">달리살다 멤버쉽 적용 전 가격</span>
              <span class="price">비회원</span>
              {{relatedItem.normSprc | toCurrency}}원
            </dd>
            <dd class="dali-price" v-if="relatedItem.mbsDcAmt > 0">
              <span class="hidden">달리살다 멤버쉽 적용 후 가격</span>
              <span class="ico-badge">달리드림</span>
              <strong
                class="price"
              >{{ (relatedItem.normSprc > relatedItem.mbsDcAmt) ? relatedItem.mbsDcAmt : relatedItem.normSprc | toCurrency }}</strong>원
              <button
                class="btn icon-question"
                aria-haspopup="dialog"
                v-if="relatedItem.normSprc > relatedItem.mbsDcAmt"
                @click="popupSalesActive"
              >
                <span class="hidden">할인가 내역 상세보기</span>
              </button>
            </dd>
          </template>
          <!-- END : 9. 가격정보 (달리살다) -->
          <!-- START : 9. 가격정보 (GS fresh) -->
          <template v-else>
            <dd class="discount" v-if="getDcRate(relatedItem.normSprc,relatedItem.sellAmt) > 4">
              <!-- : 할인가 일 경우만 노출 -->
              <span class="hidden">할인율</span>
              <strong class="num">{{ getDcRate(relatedItem.normSprc,relatedItem.sellAmt) }}</strong>%
            </dd>
            <dd
              class="list-price"
              v-if="relatedItem.normSprc > 0 && (relatedItem.normSprc-relatedItem.sellAmt > 0)"
            >
              <!-- : 할인가 일 경우만 노출 -->
              <span class="hidden">할인 적용 전 가격</span>
              <del class="price">{{relatedItem.normSprc | toCurrency}}</del>원
            </dd>
            <dd class="selling-price" v-if="relatedItem.sellAmt > 0">
              <span class="hidden">할인 적용 후 가격</span>
              <strong class="price">{{relatedItem.sellAmt | toCurrency}}</strong>원
              <button
                class="btn icon-question"
                aria-haspopup="dialog"
                @click="popupSalesActive"
                v-if="(relatedItem.normSprc-relatedItem.sellAmt > 0)"
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
          v-if="relatedItem.ofsYn == 'N'"
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
    <ul class="wrap-product-tag dali" title="가치속성태그" v-if="siteClass == 'dalisalda' && relatedItem.itemAttrs != null">
      <li class="ico-tag" v-for="(item, index) in attrList" :key="index">
        <a href="javascript:void(0);">{{ item }}</a>
      </li>
    </ul>
    <!-- END : 16. 혜택 (달리살다) -->
    <!-- START : 16. 혜택 (GS fresh) -->
    <ul class="wrap-product-tag" title="혜택" v-else>
      <li v-if="relatedItem.freeDelivYn == 'Y'" class="ico-tag">무료배송</li>
      <li
        v-if="relatedItem.itemPurchMaxRestrQty > 0"
        class="ico-tag"
      >1인{{(relatedItem.itemPurchMaxRestrQty > 0)? relatedItem.itemPurchMaxRestrQty : 'N'}}개한정</li>
      <li v-if="relatedItem.cardDcYn == 'Y'" class="ico-tag">카드할인</li>
      <li v-if="relatedItem.dbleCpnYn == 'Y'" class="ico-tag">더블쿠폰</li>
      <li v-if="relatedItem.cmplYn == 'Y'" class="ico-tag">다다익선</li>
      <li v-if="relatedItem.frgfYn == 'Y'" class="ico-tag">사은품증정</li>
      <li v-if="relatedItem.pntPresYn == 'Y'" class="ico-tag">포인트증정</li>
      <li v-if="relatedItem.comcoYn == 'Y'" class="ico-tag">통신사할인</li>
    </ul>
    <!-- END : 16. 혜택 (GS fresh)  -->
    <!-- START : 17. 해외직구 (달리살다) -->
    <span class="txt-delivery-free" v-if="siteClass == 'dalisalda' && relatedItem.abrdDrctPurchItemYn=='Y'">
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
  name: 'ProductImage',
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
    relatedItem: Object,
    itemMall: String
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      attrList: [],
    };
  },
  methods: {
    getDali(normSprc, mbsDcAmt) {
      return ItemTemplete.getDali(normSprc, mbsDcAmt);
    },
    getDay(itemStkotInstBeginDt) {
      return ItemTemplete.getDay(itemStkotInstBeginDt);
    },
    isResvItem(value) {
      return value == 'Y' ? true : false;
    },
    popupSalesActive() { // 할인 내역 팝업 활성화
      this.$emit('goDcInfo', this.$props.relatedItem);
    },
    popupOptionAction() { // 10. 장바구니 담기 옵션 팝업 기본
      // this.$emit('popupEvent', 'popupOption');
      this.$emit('goCart', this.$props.relatedItem);
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    fnSite(val, mallId, delCd, storId, supplFirmCd) {
      const cmmSteId = CookieUtils.getCmmSteId();
      if (cmmSteId == '3') {// [202017P] Market For 커머스사이트Id 분기처리
        const param = 'itemId='+val+'&mallId='+mallId;
        const url = "/md/product_detail?"+ param;
        location.href = SiteUtils.to(this.$props.itemMall, url);
      } else {
        // [202017P] 업체택배인 경우 분기처리
        if (delCd == "03") {
          console.log("업체택배");
          const param = 'itemId='+val;
          const url = "/md/product_detail?"+ param + '&storId=' + storId + '&supplFirmCd=' + supplFirmCd + '&mallId=' + mallId;
          location.href = SiteUtils.to(this.$props.itemMall, url);
        } else {
          const param = 'itemId='+val;
          const url = "/md/product_detail?"+ param;
          location.href = SiteUtils.to(this.$props.itemMall, url);
        }
      }
    },
    getDcRate(bfrSellAmt, sellAmt) {
      return ItemTemplete.getDcRate(bfrSellAmt, sellAmt);
    },
    getAttrList(itemAttrs) {
      this.attrList = itemAttrs.split(',');
    },
  },
  mounted() {
    if (this.relatedItem.itemAttrs != null) {
      this.getAttrList(this.relatedItem.itemAttrs);
    }
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
