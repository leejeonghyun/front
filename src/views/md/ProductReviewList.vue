<template>
<li :class="{photo:itmc.itmcRepFileNm !== null, mdtalk:itmc.itmcComtListInqRsltDto !== null, open: itmc.itmcOpen}"> <!-- MD talk 있을 경우, "mdtalk" 클래스 추가 / 포토상품평 있을 경우, "photo" 클래스 추가 -->
  <div class="review-inner">
    <div class="">
      <span class="wrap-star">
        <span class="star-score" :style="{width: itmc.itmcScor*20+'%'}"></span>
      </span>
      <strong class="review-tag">{{itmc.itmcScor}}</strong>
    </div>
    <div class="user-info">
      <p>
        <span class="name" aria-label="작성자">{{itmc.wrtrNm}}</span>
        <span aria-label="작성일자">{{itmc.wrtDt}}</span>
      </p>
      <p>
        <span>{{itmc.itmOptnValNm}}</span>
      </p>
    </div>
    <dl class="wrap-category-review">
      <span v-for="dtlEvl in itmc.itmcScorListInqRsltDto" :key="dtlEvl.id">
      <dt>{{dtlEvl.itmcStandCdNm}}</dt>
      <dd>{{dtlEvl.itmcScorNm}}</dd>
      </span>
    </dl>
    <figure v-if="!itmc.itmcOpen && itmc.itmcRepFileNm !== null">
      <img v-bind:src="itmc.itmcRepFileNm" alt="고객등록이미지">
    </figure>
    <PhotoReviewSlide v-if="itmc.itmcOpen && itmc.itmcRepFileNm !== null" :itmc="itmc" :key="itmc.rowSeq"/>
    <div class="wrap-text">
      <span v-if="itmc.itmcCnts !== null && itmc.itmcCnts !==''">
      <p class="text">
        {{itmc.itmcCnts}}
      </p>
      <!-- START : 상품평까지 있을 경우 추가 -->
      <div class="wrap-detail-btn">
        <button class="btn-detail-more" :class="{'active' : this.itmc.itmcOpen}"  aria-label="상품평상세내용" aria-live="polite" aria-atomic="true" @click="reviewToggle(itmc.rowSeq)">
          {{itmc.itmcOpen ? '접기' : '자세히보기'}}
        </button>
      </div>
      </span>
      <!-- END : 상품평까지 있을 경우 추가 -->
      <div class="wrap-md-talk" v-for="itmcReply in itmc.itmcComtListInqRsltDto" :key="itmcReply.id">
        <span class="ic-tag">MD Talk</span>
        <div class="reply" v-if="itmc.itmcOpen">
          <p class="reply-info">
            <span aria-label="작성자">{{itmcReply.cmmMbrNo}}</span> /
            <span aria-label="작성날짜"> {{itmcReply.fstRegDt}}</span>
          </p>
          <p class="text" v-html="itmcReply.itmcComtCnts"></p>
        </div>
      </div>
    </div>
  </div>
  <div class="review-recommend">
    이 리뷰가 도움이 되었나요?
    <button class="btn-like" :class="{active:itmc.itmcRcmdMyCnt !== '0'}" aria-label="리뷰추천" @click="reviewLikeAction">{{itmcRcmdTot}}</button>
  </div>
</li>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import PhotoReviewSlide from '@/components/product/PhotoReviewSlide';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    itmc: {
      type: Object,
      default: () => ({}),
    },
  },
   components: {
    PhotoReviewSlide
  },
  data() {
    return {
    itmcRcmdTot: '0',
    itmcRcmdClick: 'N',
    };
  },
  watch: {
    itmcRcmdTot: function(newVal, oldVal) {
      this.text = oldVal + '에서 ' + newVal + '로 변경되었습니다.';
    },
  },
  updated: async function() {
    console.log("updated do");
    const vm = this;
    setTimeout(fn, 300);
    // eslint-disable-next-line require-jsdoc
    async function fn() {
      console.log("updated reviewList start : "+vm.$props.itmc.itmcRcmdTot);
      if (vm.itmcRcmdClick === "N") {
        vm.itmcRcmdTot = vm.$props.itmc.itmcRcmdTot;
      }
    }
  },
  mounted: async function() {
    console.log("mounted do");
    const vm = this;
    setTimeout(fn, 300);
    // eslint-disable-next-line require-jsdoc
    async function fn() {
      console.log("updated reviewList start : "+vm.$props.itmc.itmcRcmdTot);
      vm.itmcRcmdTot = vm.$props.itmc.itmcRcmdTot;
    }
  },
  computed: {
    numberWithCommas: function() {
      const x = this.$props.product.sellingDiscountPrice;
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getBrandImage: function() {
      return "/images/sample/cart/gsfresh.png";
    }
  },
  methods: {
    popupAction(key) {
      this.$emit('popupEvent', 'popupReviewWrite');
    },
    reviewLikeAction: async function() { // 리뷰 도움 버튼
      const $target = event.target;
      const activeClass = $target.classList.contains('active');
      let delYn = "N";
      if (activeClass) {
        $target.classList.remove('active');
        this.itmcRcmdTot--;
        delYn = "Y";
      } else {
        $target.classList.add('active');
        this.itmcRcmdTot++;
        delYn = "N";
      }
      this.itmcRcmdClick = "Y";

      const params = {
        itemId: this.$props.itmc.itemId,
        itmcSeqno: this.$props.itmc.itmcSeqno,
        cmmMbrNo: '770626',
        delYn: delYn,
        fstRegUserId: 'nhs2019',
      };

      // 상품평목록
      const vm = this;
        try {
          const response = await ApiUtils.post(
            '/fo/md/itmcmgnt/item-comment-recommendation', params
          );
           console.log("response.data :: "+response.data.success);
          // if (response.data.success === true) {
          //   this.$gsdialog.alert('추천되었습니다.');
          // }
        } catch (e) {
          vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
            console.log(e);
          });
        }
    },
    reviewDetailAction() { // 상품만족도 상세 내용 활성화
      this.reviewAverage = !this.reviewAverage;
    },
    reviewToggle(el) { // 상품평 리스트 활성화
      this.$emit('reviewOpen', el);
    }
  },
};
</script>
