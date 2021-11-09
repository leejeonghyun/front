<template>
  <div id="popupStarScorSel" class="wrap-full-popup popup-review-small" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupStarScorSel}">
    <div class="header-popup">
      <strong>상품평 작성하기</strong>
    </div>
    <div class="full-popup-body scroll-area goods_review_step01"> <!-- 20201116 progress 추가 -->
      <div class="popup-review wrap-mypage">
        <!-- START : 상품 -->
        <div class="product-item">
          <figure>
            <img  :src="getImg(itemInfo.itemCtnsFileNm)" :alt="itemInfo.itemNm" />
          </figure>
          <div class="inner">
            <p class="brand">{{globalConstant.getMallNm(itemInfo.mallId)}}</p><!--<img :src="requireF(itemInfo.mallId)" :alt="itemInfo.mallNm" class="mall_image">-->
            <p class="product-title">
              {{ itemInfo.itemNm }}
            </p>
          </div>
        </div>
        <!-- END : 상품 -->
        <!-- START : 별점 평가 -->
        <div class="wrap-star-rate">
          <p class="rate-text">별점을 선택해 주세요</p>
          <div class="wrap-star">
            <button class="star" :class="{active: starScore >= 1}" @click="starRatingAction(1)" aria-label="1점"></button>
            <button class="star" :class="{active: starScore >= 2}" @click="starRatingAction(2)" aria-label="2점"></button>
            <button class="star" :class="{active: starScore >= 3}" @click="starRatingAction(3)" aria-label="3점"></button>
            <button class="star" :class="{active: starScore >= 4}" @click="starRatingAction(4)" aria-label="4점"></button>
            <button class="star" :class="{active: starScore >= 5}" @click="starRatingAction(5)" aria-label="5점"></button>
          </div>
        </div>
        <!-- END : 별점 평가 -->
      </div>
    </div>
      <!-- START 신규 - 팝업 뒤로가기 버튼 -->
      <button class="btn-layer-prev" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"><!-- 07.27 기준 팝업으로 정의. 달라질 경우 aria-label 텍스트 변경 필요 -->
        <span class="hidden">뒤로가기</span>
      </button>
      <!-- END 신규 - 팝업 뒤로가기 버튼 -->
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin'; // 팝업
import ImgUtils from "@/common/ImgUtils";
export default {
  name: "popupStarScorSel",
  mixins: [LayerPopupMixin],
  props: ['itemInfo'],
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '상품평작성 < 상품평 < %s'
  },
  data() {
    return {
      starScore: 0,
    };
  },
  components: {
  },
  methods: {
      requireF(path) {
      try {
        return require('@/assets/images/mall_logo/'+path+'.png');
      } catch (e) {
        return '';
      }
    },
    getImg(val) {
      let imgNm = '';
      let path = '';
      if (val != null && val != '') {
        imgNm = val.replace('{SIZE}', 300);
        path = ImgUtils.path(imgNm);
      } else {
        imgNm = "@/assets/images/img/img_product_nothumb.jpg";
        path = ImgUtils.path(imgNm);
      }
      return path;
    },
    starRatingAction(score) {
      this.starScore = score;
      const vm = this;
      setTimeout(function() {
        vm.$emit('popupComplete', vm.itemInfo, vm.starScore);
      }, 700);
    },
    popupCloseAction() {// closed
      this.$emit('popupEvent', 'popupStarScorSel');
     // this.modalActiveEvent('popupStarScorSel');
    }
  },
  beforeDestroy() {
    document.body.style.removeProperty("overflow-y");
  },
  mounted() {
    console.log("---score-- " + JSON.stringify(this.itemInfo));
    if (this.itemInfo.itmcScor != '' && this.itemInfo.itmcScor > 0) {
        this.starScore = this.itemInfo.itmcScor;
    } else {
      this.starScore = 0;
    }
    // alert(this.starScore + ":::" + this.itemInfo.itmcScor);
   // this.modalActiveEvent('popupStarScorSel');
    document.body.style["overflow-y"] = "hidden";
  }
};
</script>
