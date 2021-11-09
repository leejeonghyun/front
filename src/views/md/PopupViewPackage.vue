<!--
Design: views/md/SC-FO-MD-GF-MP-021
Pg id:
Uri:
-->
<template>
  <div id="popupDetail" class="wrap-full-popup" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
    <div class="header-popup">
      <button class="btn-popup-list" :class="{active: this.selectList}" @click="openListActive">
        <strong>상품{{pitemDtl.rSeq | toSizeNum(2)}}</strong>
      </button>
      <!-- START : 묶음 상품 리스트 -->
      <!-- 수정 START : 2020.03.03 inner-full-popup 안에 있던 .wrap-layer.wrap-package 위치 변경 / scroll-area 클래스 추가 -->
      <div class="wrap-layer wrap-package scroll-area" v-show="this.selectList" aria-live="assertive" aria-atomic="true" :class="{active: this.selectList}">
        <p id="packageList" class="hidden">묶음상품리스트</p>
        <ul class="wrap-list-package">
          <li class="list" v-for="(pitem, index) in pitemList" :key="index">
            <a href="#" @click="popupDetailAction(pitem, index+1)">
              <figure>
                <img :src="getImg(pitem.itemCtnsFileNm)" :alt="pitem.itemNm" />
                <!-- 썸네일 없을 경우 -->
                <!-- <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" alt="백설 소갈비 양념 500g" /> -->
                <!-- 성인본인인증이 필요한 경우 -->
                <!-- <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" alt="백설 소갈비 양념 500g" /> -->
              </figure>
              <dl class="info">
                <dt>
                  <strong class="list-num">상품{{index+1 | toSizeNum(2)}}</strong>
                  <strong class="item-name">{{pitem.itemNm}}</strong>
                </dt>
                <dd>
                  <span class="wrap-price"><strong class="price">{{pitem.sellAmt | toCurrency}}</strong>원</span>
                </dd>
              </dl>
            </a>
          </li>
        </ul>
      </div>
      <!-- 수정 END : 2020.03.03 inner-full-popup 안에 있던 .wrap-layer.wrap-package 위치 변경 / scroll-area 클래스 추가 -->
      <!-- END : 묶음 상품 리스트 -->
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="product-top-visual">
          <div class="detail-view">
            <dl class="product-info">
              <dt>
                <p class="title-desc">{{pitemDtl.itemPrStnCnts}}</p>
                <strong class="title" aria-label="상품명">
                  <em>{{pitemDtl.itemNm}}</em>
                </strong>
              </dt>
              <dd class="discount" aria-label="할인율">
                <strong class="num">{{amtCalcPct}}</strong>%
              </dd>
              <dd class="sale-price" aria-label="할인 적용 후 가격">
                <strong class="price">{{pitemDtl.sellAmt | toCurrency}}</strong>원
              </dd>
              <dd class="list-price" aria-label="할인 적용 전 가격">
                <del class="price">{{pitemDtl.bfrSellAmt | toCurrency}}</del>원
              </dd>
            </dl>
          </div>
          <div class="detail-view">
            <figure>
              <span v-html="pitemDtl.itemDtlDesc"></span>
              <!--<img src="@/assets/images/_temp/_img_product_detail02.jpg" alt="" />-->
            </figure>
            <div class="hidden"> <!-- 이미지 대체 텍스트 -->
              <h2>
                백설 소갈비 양념Beef rib saurce
              </h2>
              <p>최상의 고기 이기에 어떤 부위를 어떻게 요리해도 맛있습니다.</p>
              <p>가장 기본적인 좋은 소금과 좋은 고기에 어울리는 양념을 더해 준다면, 더울 혼상적인 맛을 즐길 수 있을 거에요.</p>
              <h3>HANSTEAK`S saurce 특별한 '소갈비 양념'</h3>
              <p>1953년부터 쌓아온 백설만의 노하우가 입혀진 고기 맛의 황금비율 백설 소갈비 양념</p>
            </div>
          </div>
          <!-- START : 관리자 등록 상품 필수 정보 -->
          <ProductDetailViewRequired :itemRqdInfo="pitemDtl.itemNtfcAtcInfoInqList"/>
          <!-- END : 관리자 등록 상품 필수 정보 -->
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
import ProductDetailViewRequired from '@/components/product/ProductDetailViewRequired'; // 상품 필수 정보
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupViewPackage",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '묶음상품상세보기 < 상품목록 < %s'
  },
  props: {
    pitemDtl: {
      type: Object,
      default: () => ({}),
    },
    pitemList: {
      type: Array[Object],
      default: () => ({}),
    }
  },
  components: {
    ProductDetailViewRequired // 상품 필수 정보
  },
  data() {
    return {
      selectList: false, // 묶음 상품 리스트 레이어
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  methods: {
    openListActive() { // 묶음 상품 리스트 활성화
      this.selectList = !this.selectList;
    },
    popupCloseAction() { // 해당 팝업 비활성화
      this.$emit('popupEvent', 'popupDetail');
      this.modalActiveEvent('popupDetail');
    },
    popupDetailAction(pitem, rSeq) { // 묶음 상품 상세 팝업 활성화
    console.log("021-popupDetailAction ::: "+rSeq);
      this.$emit('popupDetail', pitem, rSeq);
      this.selectList = false;
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
    toSizeNum(value, size) {
      let retValue = "";
      const valStr = value.toString;
      console.log("value :: "+value+" : "+size);
      console.log("value.length :: "+valStr.length);
      for (let i=0; i < size - valStr.length; i++) {
        retValue = "0"+retValue;
      }
      retValue = retValue+value;
      return retValue;
    },
    json: function(entry) {
      return JSON.stringify(entry);
    }
  },
  computed: {
    amtCalcPct: function() {
      console.log("sellAmt :: "+this.$props.pitemDtl.sellAmt+" : "+this.$props.pitemDtl.bfrSellAmt);
      const sellAmt = this.$props.pitemDtl.sellAmt;
      const bfrSellAmt = this.$props.pitemDtl.bfrSellAmt;
      return Math.round((sellAmt/bfrSellAmt) * 100);
    }
  },
  mounted() {
    this.modalActiveEvent('popupDetail');
  }
};
</script>
