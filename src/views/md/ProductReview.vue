<!--
views/md/SC-FO-MD-GF-MS-014
-->
<template>
  <div class="wrap-review" v-bind:class="[siteClass]">
    <span class="wrap-review-guide">
      <img src="@/assets/images/_temp/_img_banner_review02.jpg" alt="상품평 작성하고 500원 받고, 프리미엄 상품평에도 도전해주세요~!" />
    </span>
    <!-- START : 상품만족도 -->
    <section class="detail-view">
      <h3 class="hidden">상품평 통계</h3>
      <button v-on:click="check">check</button>
      <dl class="wrap-average-star">
        <dt>평균 별점</dt>
        <dd>
          <span class="wrap-star">
            <span class="star-score" :style="{width: itmcAvg.evlAvgScor*20+'%'}"></span>
          </span>
          <strong class="average" aria-label="평균점수">{{itmcAvg.evlAvgScor}}</strong><span class="total" aria-label="추천지수">({{itmcAvg.itmcRcmdSum}})</span>
        </dd>
      </dl>
      <p class="desc">구매자들 중 <strong class="percent">{{itmcAvg.itmcRcmdPct}}%</strong>가 이 상품을 추천합니다.</p>
      <div class="wrap-average-review">
        <ul class="wrap-category-review">
          <li v-for="stot in satisTotList" :key="stot.itmcStandCd" >
            <p class="label">{{stot.itmcStandCdNm}}</p>
            <p class="opinion">{{stot.itmcStandDtlNm}}</p>
            <p class="percent">
              <strong>{{stot.sharePct}}</strong>%
              <span class="total" aria-label="추천지수">({{stot.itmcStandDtlCnt}})</span>
            </p>
          </li>
        </ul>
        <div class="btn-area">
          <button class="btn-detail-more" :class="{'active' : this.reviewAverage}" aria-label="상품평상세내용" aria-live="polite" aria-atomic="true" @click="reviewDetailAction">
            {{reviewAverage ? '접기' : '자세히보기'}}
          </button>
        </div>
      </div>
      <div class="wrap-average-detail" v-if="reviewAverage">
        <dl class="wrap-graph">
          <span v-for="sdet in satisDetList" :key="sdet.index" >
          <dt class="title">{{sdet.itmcStandCdNm}}</dt>
          <dd class="content">
            <dl class="wrap-item-graph">
              <span v-for="ssub in sdet.itmcStlvDtlSubInqRsltDto" :key="ssub.index" >
              <dt>{{ssub.itmcStandDtlNm}}</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" :style="{width: ssub.sharePct+'%'}"></div>
                </div>
                <span class="num"><strong>{{ssub.sharePct}}</strong>%</span>
              </dd>
              </span>
            </dl>
            <p/>
          </dd>
          </span>
        </dl>
      </div>
      <!-- END : 상품평 통계 -->
    </section>
    <!-- END : 상품만족도 -->
    <!-- START : 상품평 리스트 -->
    <section class="detail-view review">
      <h3 class="hidden">상품평 리스트</h3>
      <div class="review-filter">
        <span class="inp-chk">
          <input type="checkbox" name="chkPhoto" id="chkPhoto" value="" @click="itmcListAction">
          <label for="chkPhoto">포토상품평</label>
        </span>
        <span class="wrap-select-category">
          <label for="select" class="hidden">정렬유형선택하기</label>
          <select id="sort" name="sort" @change="itmcListAction">
            <option value="NEW">최신순</option>
            <option value="SCOR">평점순</option>
            <option value="RCMD">추천순</option>
          </select>
        </span>
      </div>
      <!-- START : 상품평 없을 경우 -->
      <NoList v-if="itmcList.length === 0" NoListText="등록된 상품평이 없습니다." :ListType="'review'" />
      <!-- END : 상품평 없을 경우 -->
      <ul class="wrap-list-review" ref="reviewList">
        <!-- START : MD talk -->
        <li class="box-md-talk" :class="{open: review.review01}">
          <div class="review-inner">
            <div class="wrap-tag">
              <span class="ic-tag">MD<br/>Talk</span>
            </div>
            <div class="wrap-view">
              <figure v-if="!review.review01">
                <img src="@/assets/images/_temp/_img_product12_01.jpg" alt="고객등록이미지" />
              </figure>
              <PhotoReviewSlide v-if="review.review01" />
              <div class="wrap-tag">
                <span class="ic-tag">MD<br/>Talk</span>
              </div>
              <div class="wrap-text">
                <p class="text">
                  배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
                  배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
                </p>
                <!-- START : 상품평까지 있을 경우 추가 -->
                <div class="wrap-detail-btn">
                  <button class="btn-detail-more" :class="{'active' : this.review.review01}" aria-label="상품평상세내용" aria-live="polite" aria-atomic="true" @click="reviewViewAction('review01')">
                    {{review.review01 ? '접기' : '자세히보기'}}
                  </button>
                </div>
                <!-- END : 상품평까지 있을 경우 추가 -->
              </div>
            </div>
          </div>
        </li>
        <!-- END : MD talk -->
        <li :class="{open: review.review02}">
          <div class="review-inner">
            <div class="">
              <span class="wrap-star">
                <span class="star-score" style="width: 90%;"></span>
              </span>
              <strong class="review-tag">4</strong>
            </div>
            <div class="user-info">
              <p>
                <span class="name" aria-label="작성자">이*름</span>
                <span aria-label="작성일자">2019.11.29</span>
              </p>
              <p>
                <span>옵션상품명이 노출됩니다.</span>
              </p>
            </div>
          </div>
          <!-- START : 상품평까지 있을 경우 추가 -->
          <!-- <div class="wrap-detail-btn">
            <button class="btn-detail-more" :class="{'active' : this.review.review02}" aria-label="상품평상세내용" aria-live="polite" aria-atomic="true" @click="reviewViewAction('review02')">
              {{review.review02 ? '접기' : '자세히보기'}}
            </button>
          </div> -->
          <!-- END : 상품평까지 있을 경우 추가 -->
          <div class="review-recommend">
            이 리뷰가 도움이 되었나요?
            <button class="btn-like" aria-label="리뷰추천" @click="reviewLikeAction">10</button>
          </div>
        </li>
        <li :class="{open: review.review03}">
          <div class="review-inner">
            <div class="">
              <span class="wrap-star">
                <span class="star-score" style="width: 90%;"></span>
              </span>
              <strong class="review-tag">4</strong>
            </div>
            <div class="user-info">
              <p>
                <span class="name" aria-label="작성자">이*름</span>
                <span aria-label="작성일자">2019.11.29</span>
              </p>
              <p>
                <span>옵션상품명이 노출됩니다.</span>
              </p>
            </div>
            <dl class="wrap-category-review">
              <dt>신선도</dt>
              <dd>신선해요</dd>
              <dt>맛</dt>
              <dd>맛있어요</dd>
              <dt>배송</dt>
              <dd>최고에요</dd>
              <dt>유통기한</dt>
              <dd>넉넉해요</dd>
            </dl>
            <!-- <div class="wrap-text">
              <p class="text">
                배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
                배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
              </p>
            </div> -->
          </div>
          <!-- START : 상품평까지 있을 경우 추가 -->
          <!-- <div class="wrap-detail-btn">
            <button class="btn-detail-more" :class="{'active' : this.review.review03}" aria-label="상품평상세내용" aria-live="polite" aria-atomic="true" @click="reviewViewAction('review03')">
              {{review.review03 ? '접기' : '자세히보기'}}
            </button>
          </!-->
          <!-- END : 상품평까지 있을 경우 추가 -->
          <div class="review-recommend">
            이 리뷰가 도움이 되었나요?
            <button class="btn-like active" aria-label="리뷰추천" @click="reviewLikeAction">10</button>
          </div>
        </li>
        <!-- START : 텍스트만 있을 경우 -->
        <li :class="{open: review.review04}"> <!-- MD talk 있을 경우, "mdtalk" 클래스 추가 / 포토상품평 있을 경우, "photo" 클래스 추가 -->
          <div class="review-inner">
            <div class="">
              <span class="wrap-star">
                <span class="star-score" style="width: 90%;"></span>
              </span>
              <strong class="review-tag">4</strong>
            </div>
            <div class="user-info">
              <p>
                <span class="name" aria-label="작성자">이*름</span>
                <span aria-label="작성일자">2019.11.29</span>
              </p>
              <p>
                <span>옵션상품명이 노출됩니다.</span>
              </p>
            </div>
            <dl class="wrap-category-review">
              <dt>신선도</dt>
              <dd>신선해요</dd>
              <dt>맛</dt>
              <dd>맛있어요</dd>
              <dt>배송</dt>
              <dd>최고에요</dd>
              <dt>유통기한</dt>
              <dd>넉넉해요</dd>
            </dl>
            <!-- <figure v-if="!review.review04">
              <img src="@/assets/images/_temp/_img_product12_01.jpg" alt="고객등록이미지" />
            </figure>
            <PhotoReviewSlide v-if="review.review04"/> -->
            <div class="wrap-text">
              <p class="text">
                배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
                배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
              </p>
              <!-- START : 상품평까지 있을 경우 추가 -->
              <div class="wrap-detail-btn">
                <button class="btn-detail-more" :class="{'active' : this.review.review04}" aria-label="상품평상세내용" aria-live="polite" aria-atomic="true" @click="reviewViewAction('review04')">
                  {{review.review04 ? '접기' : '자세히보기'}}
                </button>
              </div>
              <!-- END : 상품평까지 있을 경우 추가 -->
              <!-- <div class="wrap-md-talk">
                <span class="ic-tag">MD Talk</span>
                <div class="reply" v-if="review.review04">
                  <p class="reply-info">
                    <span aria-label="작성자">관리자</span> /
                    <span aria-label="작성날짜"> 2019.12.02</span>
                  </p>
                  <p class="text">
                    안녕하세요.<br/>
                    신선함의 시작, GS fresh 상품 담당자입니다.<br/><br/>
                    고객님께서 만족하시고 맛있게 드셨다니 다행입니다.<br/><br/>
                    더 나은 쇼핑을 위해 노력하는 GS fresh가 되겠습니다.<br/>
                    감사합니다.
                  </p>
                </div>
              </div> -->
            </div>
          </div>
          <div class="review-recommend">
            이 리뷰가 도움이 되었나요?
            <button class="btn-like" aria-label="리뷰추천" @click="reviewLikeAction">10</button>
          </div>
        </li>
        <!-- END : 텍스트만 있을 경우 -->
        <!-- START : 포토 상품평 있을 경우 -->
        <li class="photo" :class="{open: review.review05}"> <!-- MD talk 있을 경우, "mdtalk" 클래스 추가 / 포토상품평 있을 경우, "photo" 클래스 추가 -->
          <div class="review-inner">
            <div class="">
              <span class="wrap-star">
                <span class="star-score" style="width: 90%;"></span>
              </span>
              <strong class="review-tag">4</strong>
            </div>
            <div class="user-info">
              <p>
                <span class="name" aria-label="작성자">이*름</span>
                <span aria-label="작성일자">2019.11.29</span>
              </p>
              <p>
                <span>옵션상품명이 노출됩니다.</span>
              </p>
            </div>
            <dl class="wrap-category-review">
              <dt>신선도</dt>
              <dd>신선해요</dd>
              <dt>맛</dt>
              <dd>맛있어요</dd>
              <dt>배송</dt>
              <dd>최고에요</dd>
              <dt>유통기한</dt>
              <dd>넉넉해요</dd>
            </dl>
            <figure v-if="!review.review05">
              <img src="@/assets/images/_temp/_img_product12_01.jpg" alt="고객등록이미지" />
            </figure>
            <PhotoReviewSlide v-if="review.review05"/>
            <div class="wrap-text">
              <p class="text">
                배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
                배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
              </p>
              <!-- START : 상품평까지 있을 경우 추가 -->
              <div class="wrap-detail-btn">
                <button class="btn-detail-more" :class="{'active' : this.review.review05}" aria-label="상품평상세내용" aria-live="polite" aria-atomic="true" @click="reviewViewAction('review05')">
                  {{review.review05 ? '접기' : '자세히보기'}}
                </button>
              </div>
              <!-- END : 상품평까지 있을 경우 추가 -->
              <!-- <div class="wrap-md-talk">
                <span class="ic-tag">MD Talk</span>
                <div class="reply" v-if="review.review05">
                  <p class="reply-info">
                    <span aria-label="작성자">관리자</span> /
                    <span aria-label="작성날짜"> 2019.12.02</span>
                  </p>
                  <p class="text">
                    안녕하세요.<br/>
                    신선함의 시작, GS fresh 상품 담당자입니다.<br/><br/>
                    고객님께서 만족하시고 맛있게 드셨다니 다행입니다.<br/><br/>
                    더 나은 쇼핑을 위해 노력하는 GS fresh가 되겠습니다.<br/>
                    감사합니다.
                  </p>
                </div>
              </div> -->
            </div>
          </div>
          <div class="review-recommend">
            이 리뷰가 도움이 되었나요?
            <button class="btn-like" aria-label="리뷰추천" @click="reviewLikeAction">10</button>
          </div>
        </li>
        <!-- END : 포토 상품평 있을 경우 -->
        <!-- START : MD talk 있을 경우 -->
        <li class="mdtalk" :class="{open: review.review06}"> <!-- MD talk 있을 경우, "mdtalk" 클래스 추가 / 포토상품평 있을 경우, "photo" 클래스 추가 -->
          <div class="review-inner">
            <div class="">
              <span class="wrap-star">
                <span class="star-score" style="width: 90%;"></span>
              </span>
              <strong class="review-tag">4</strong>
            </div>
            <div class="user-info">
              <p>
                <span class="name" aria-label="작성자">이*름</span>
                <span aria-label="작성일자">2019.11.29</span>
              </p>
              <p>
                <span>옵션상품명이 노출됩니다.</span>
              </p>
            </div>
            <dl class="wrap-category-review">
              <dt>신선도</dt>
              <dd>신선해요</dd>
              <dt>맛</dt>
              <dd>맛있어요</dd>
              <dt>배송</dt>
              <dd>최고에요</dd>
              <dt>유통기한</dt>
              <dd>넉넉해요</dd>
            </dl>
            <!-- <figure v-if="!review.review06">
              <img src="@/assets/images/_temp/_img_product12_01.jpg" alt="고객등록이미지" />
            </figure>
            <PhotoReviewSlide v-if="review.review06"/> -->
            <div class="wrap-text">
              <p class="text">
                배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
                배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
              </p>
              <!-- START : 상품평까지 있을 경우 추가 -->
              <div class="wrap-detail-btn">
                <button class="btn-detail-more" :class="{'active' : this.review.review06}" aria-label="상품평상세내용" aria-live="polite" aria-atomic="true" @click="reviewViewAction('review06')">
                  {{review.review06 ? '접기' : '자세히보기'}}
                </button>
              </div>
              <!-- END : 상품평까지 있을 경우 추가 -->
              <div class="wrap-md-talk">
                <span class="ic-tag">MD Talk</span>
                <div class="reply" v-if="review.review06">
                  <p class="reply-info">
                    <span aria-label="작성자">관리자</span> /
                    <span aria-label="작성날짜"> 2019.12.02</span>
                  </p>
                  <p class="text">
                    안녕하세요.<br/>
                    신선함의 시작, GS 프레시몰 상품 담당자입니다.<br/><br/>
                    고객님께서 만족하시고 맛있게 드셨다니 다행입니다.<br/><br/>
                    더 나은 쇼핑을 위해 노력하는 GS 프레시몰가 되겠습니다.<br/>
                    감사합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="review-recommend">
            이 리뷰가 도움이 되었나요?
            <button class="btn-like" aria-label="리뷰추천" @click="reviewLikeAction">10</button>
          </div>
        </li>
        <!-- END : MD talk 있을 경우 -->
        <!-- START : 포토 상품평 + MD talk 있을 경우 -->
        <li class="photo mdtalk" :class="{open: review.review07}"> <!-- MD talk 있을 경우, "mdtalk" 클래스 추가 / 포토상품평 있을 경우, "photo" 클래스 추가 -->
          <div class="review-inner">
            <div class="">
              <span class="wrap-star">
                <span class="star-score" style="width: 90%;"></span>
              </span>
              <strong class="review-tag">4</strong>
            </div>
            <div class="user-info">
              <p>
                <span class="name" aria-label="작성자">이*름</span>
                <span aria-label="작성일자">2019.11.29</span>
              </p>
              <p>
                <span>옵션상품명이 노출됩니다.</span>
              </p>
            </div>
            <dl class="wrap-category-review">
              <dt>신선도</dt>
              <dd>신선해요</dd>
              <dt>맛</dt>
              <dd>맛있어요</dd>
              <dt>배송</dt>
              <dd>최고에요</dd>
              <dt>유통기한</dt>
              <dd>넉넉해요</dd>
            </dl>
            <figure v-if="!review.review07">
              <img src="@/assets/images/_temp/_img_product12_01.jpg" alt="고객등록이미지" />
            </figure>
            <PhotoReviewSlide v-if="review.review07"/>
            <div class="wrap-text">
              <p class="text">
                배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
                배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
              </p>
              <!-- START : 상품평까지 있을 경우 추가 -->
              <div class="wrap-detail-btn">
                <button class="btn-detail-more" :class="{'active' : this.review.review07}" aria-label="상품평상세내용" aria-live="polite" aria-atomic="true" @click="reviewViewAction('review07')">
                  {{review.review07 ? '접기' : '자세히보기'}}
                </button>
              </div>
              <!-- END : 상품평까지 있을 경우 추가 -->
              <div class="wrap-md-talk">
                <span class="ic-tag">MD Talk</span>
                <div class="reply" v-if="review.review07">
                  <p class="reply-info">
                    <span aria-label="작성자">관리자</span> /
                    <span aria-label="작성날짜"> 2019.12.02</span>
                  </p>
                  <p class="text">
                    안녕하세요.<br/>
                    신선함의 시작, GS 프레시몰 상품 담당자입니다.<br/><br/>
                    고객님께서 만족하시고 맛있게 드셨다니 다행입니다.<br/><br/>
                    더 나은 쇼핑을 위해 노력하는 GS 프레시몰가 되겠습니다.<br/>
                    감사합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="review-recommend">
            이 리뷰가 도움이 되었나요?..{{searchParam.itemId}}
            <button class="btn-like" aria-label="리뷰추천" @click="reviewLikeAction">10</button>
          </div>
        </li>
        <!-- END : 포토 상품평 + MD talk 있을 경우 -->

        <!-- 실제개발작업용 -->
        <ItmcList  v-on:reviewOpen="reviewOpenAction" v-for="itmc in itmcList" :key="itmc.itmcSeqNo" :itmc="itmc" />

      </ul>
    </section>
    <!-- END : 상품평 리스트 -->
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import NoList from '@/components/common/NoList';
import AccordionMixin from '@/mixins/AccordionMixin';
import ItmcList from "./ProductReviewList";
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    itmcPr: {
      type: Object,
      default: () => ({}),
    },
  },
  name: "ProductReview",
  mixins: [AccordionMixin],
  components: {
    NoList,
    ItmcList
  },
  data() {
    return {
      reviewAverage: false, // 상품만족도 활성화
      review: { // 상품평 리스트 활성화
        review01: false,
        review02: false,
        review03: false,
        review04: false,
        review05: false,
        review06: false,
        review07: false,
        review08: false
      },
      rev: {},
      // itmcList: {}
      searchParam: {
        itemId: this.itmcPr.itemId,
        itemClasfCtgId: this.itmcPr.itemClasfCtgId,
        cmmSteId: ''
      },
      itmcAvg: {},
      itmcList: [
        {
          itmcOpen: false,
          itmcSeqNo: 1,
          rowSeq: 1,
          cmmMbrNm: '홍길동',
          mdWriteYn: 'Y',
          itmcAvgScor: '',
          itmcCnts: '',
          fstRegDttm: '2020-01-23',
          itmcCntsFileNm: '',
          itmOptnNm: '색상',
          itmOptnValNm: '노랑',
          imgItmcYn: 'Y',
          itmcDtlEvlList: [],
        },
      ],
      satisTotList: [],
      satisDetList: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    check() {
      console.log(this.$props.itmcPr);
    },
    popupAction(key) {
      this.$emit('popupEvent', 'popupReviewWrite');
    },
    reviewLikeAction() { // 리뷰 도움 버튼
      const $target = event.target;
      const activeClass = $target.classList.contains('active');
      if (activeClass) {
        $target.classList.remove('active');
      } else {
        $target.classList.add('active');
      }
    },
    reviewDetailAction() { // 상품만족도 상세 내용 활성화
      this.reviewAverage = !this.reviewAverage;
    },
    reviewViewAction(el) { // 상품평 리스트 활성화
      this.review[el] = !this.review[el];
    },
    reviewOpenAction(el) { // 상품평 리스트 활성화
      this.itmcList[el].itmcOpen = !this.itmcList[el].itmcOpen;
    },
    itmcListAction: async function() {
      const chkPhotoVal = document.getElementById('chkPhoto').checked;
      let photoItmcOnlyVal = "N";
      if (chkPhotoVal) {
        photoItmcOnlyVal = "Y";
      }

      const sortVal = document.getElementById("sort").options;
      const sortSel = sortVal[sortVal.selectedIndex].value;

      const params = {
        itemId: this.$props.itmcPr.itemId,
        cmmSteId: this.$props.itmcPr.cmmSteId,
        itemClasfCtgId: this.$props.itmcPr.itemClasfCtgId,
        photoItmcOnly: photoItmcOnlyVal,
        sort: sortSel,
        cmmMbrNo: '770626'
      };

      // 상품평목록
      const vm = this;
        try {
          const result = await ApiUtils.get(
            '/fo/md/itmcmgnt/item-comment-list',
            params
          );
          const respItmcList = result.data;
          const itmcList = respItmcList.data;
          this.itmcList = itmcList;
          // vm.$gsdialog.alert(JSON.stringify(result2));
        } catch (e) {
          vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
            console.log(e);
          });
        }

      console.log("photoOnlyAction : "+chkPhotoVal);
    },
  },
  computed: function() {
  },
  mounted: async function() {
    // let name = "itemId";
    // console.log("location2222 :: "+location.search);
    // name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    // const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    // const results = regex.exec(location);
    // // console.log("results2222 :: "+results);
    // const rsltItemId = (results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")));
    // console.log("rsltItemId2222 :: "+rsltItemId);


    // 상품평리스트
    // const responseItmcList = await axios.get("http://localhost:7000/prod_test_itmc_list.json");
    // const respItmcList = responseItmcList.data;
    // // console.log("success respItmcList ::: "+respItmcList["success"]);
    // const itmcList = respItmcList["data"];
    // this.itmcList = itmcList;

    // this.searchParam.itemId = this.itmcParam.itemId;
    const vm = this;
    setTimeout(fn, 300);

    // eslint-disable-next-line require-jsdoc
    async function fn() {
      console.log("itmcParam.itemId ::: "+vm.$props.itmcPr.itemId);
      const params = {
        itemId: vm.$props.itmcPr.itemId,
        cmmSteId: vm.$props.itmcPr.cmmSteId,
        itemClasfCtgId: vm.$props.itmcPr.itemClasfCtgId,
        cmmMbrNo: '770626'
      };

      // 상품평 평점정보조회
      try {
        const result = await ApiUtils.get(
          '/fo/md/itmcmgnt/item-basis-comment-evl-score',
          params
        );
        const respItmcAvg = result.data;
        const itmcAvg = respItmcAvg["data"];
        vm.itmcAvg = itmcAvg;
        // vm.$gsdialog.alert(JSON.stringify(result));
      } catch (e) {
        vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }

      // 상품평목록
      // try {
      //   const result = await ApiUtils.get(
      //     '/fo/md/itmcmgnt/item-comment-list',
      //     params
      //   );
      //   const respItmcList = result.data;
      //   const itmcList = respItmcList["data"];
      //   vm.itmcList = itmcList;
      //   // vm.$gsdialog.alert(JSON.stringify(result));
      // } catch (e) {
      //   vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
      //     console.log(e);
      //   });
      // }
      vm.itmcListAction();

      // 상품만족도Best
      try {
        const result = await ApiUtils.get(
          '/fo/md/itmcmgnt/item-basis-satisfaction-tot-score',
          params
        );
        const respSatisTotList = result.data;
        const satisTotList = respSatisTotList["data"];
        vm.satisTotList = satisTotList;
        // vm.$gsdialog.alert(JSON.stringify(result.data));
      } catch (e) {
        vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }

      // 상품만족도상세
      try {
        const result = await ApiUtils.get(
          '/fo/md/itmcmgnt/item-comment-satisfaction-detail-info',
          params
        );
        const respSatisDetList = result.data;
        const satisDetList = respSatisDetList["data"];
        vm.satisDetList = satisDetList;
        // vm.$gsdialog.alert(JSON.stringify(result.data));
      } catch (e) {
        vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
    }

    // console.log("itmcList.length: "+itmcList.length);

    // const revs = [];
    // itmcList.forEach(element => {
    //   console.log("itmcList.cmmMbrNm: "+element.cmmMbrNm);
    //    revs.push("review"+element.itmcSeqNo, false);
    //   this.review = revs;
    // });
  },
  computed: {
      reviewCd: function (itmcSeq) {
          const rvCd = "review"+itmcSeq;
          return rvCd;
      }
  }
};
</script>

<style>

</style>
