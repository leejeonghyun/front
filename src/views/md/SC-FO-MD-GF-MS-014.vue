<template>
  <div class="wrap-review" v-bind:class="[siteClass]">
    <span class="wrap-review-guide">
      <img src="@/assets/images/_temp/_img_banner_review02.jpg" alt="상품평 작성하고 500원 받고, 프리미엄 상품평에도 도전해주세요~!" />
    </span>
    <!-- START : 상품만족도 -->
    <section class="detail-view">
      <h3 class="hidden">상품평 통계</h3>
      <dl class="wrap-average-star">
        <dt>평균 별점</dt>
        <dd>
          <span class="wrap-star">
            <span class="star-score" style="width: 90%;"></span>
          </span>
          <strong class="average" aria-label="평균점수">4.5</strong><span class="total" aria-label="추천지수">(342)</span>
        </dd>
      </dl>
      <p class="desc">구매자들 중 <strong class="percent">80%</strong>가 이 상품을 추천합니다.</p>
      <div class="wrap-average-review">
        <ul class="wrap-category-review">
          <li>
            <p class="label">신선도</p>
            <p class="opinion">신선해요</p>
            <p class="percent">
              <strong>100</strong>%
              <span class="total" aria-label="추천지수">(342)</span>
            </p>
          </li>
          <li>
            <p class="label">포장상태</p>
            <p class="opinion">좋아요</p>
            <p class="percent">
              <strong>80</strong>%
              <span class="total" aria-label="추천지수">(314)</span>
            </p>
          </li>
          <li>
            <p class="label">배송</p>
            <p class="opinion">보통이에요</p>
            <p class="percent">
              <strong>55</strong>%
              <span class="total" aria-label="추천지수">(168)</span>
            </p>
          </li>
          <li>
            <p class="label">유통기한</p>
            <p class="opinion">넉넉해요</p>
            <p class="percent">
              <strong>90</strong>%
              <span class="total" aria-label="추천지수">(296)</span>
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
          <dt class="title">신선도</dt>
          <dd class="content">
            <dl class="wrap-item-graph">
              <dt>신선해요</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" style="width: 80%"></div>
                </div>
                <span class="num"><strong>80</strong>%</span>
              </dd>
              <dt>보통이에요</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" style="width: 15%"></div>
                </div>
                <span class="num"><strong>15</strong>%</span>
              </dd>
              <dt>신성하지 않아요</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" style="width: 5%"></div>
                </div>
                <span class="num"><strong>5</strong>%</span>
              </dd>
            </dl>
          </dd>
          <dt class="title">포장상태</dt>
          <dd class="content">
            <dl class="wrap-item-graph">
              <dt>좋아요</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" style="width: 80%"></div>
                </div>
                <span class="num"><strong>80</strong>%</span>
              </dd>
              <dt>보통이에요</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" style="width: 15%"></div>
                </div>
                <span class="num"><strong>15</strong>%</span>
              </dd>
              <dt>안 좋아요</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" style="width: 5%"></div>
                </div>
                <span class="num"><strong>5</strong>%</span>
              </dd>
            </dl>
          </dd>
          <dt class="title">배송</dt>
          <dd class="content">
            <dl class="wrap-item-graph">
              <dt>만족해요</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" style="width: 80%"></div>
                </div>
                <span class="num"><strong>80</strong>%</span>
              </dd>
              <dt>보통이에요</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" style="width: 15%"></div>
                </div>
                <span class="num"><strong>15</strong>%</span>
              </dd>
              <dt>불만족해요</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" style="width: 5%"></div>
                </div>
                <span class="num"><strong>5</strong>%</span>
              </dd>
            </dl>
          </dd>
          <dt class="title">유통기한</dt>
          <dd class="content">
            <dl class="wrap-item-graph">
              <dt>넉넉해요</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" style="width: 80%"></div>
                </div>
                <span class="num"><strong>80</strong>%</span>
              </dd>
              <dt>보통이에요</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" style="width: 15%"></div>
                </div>
                <span class="num"><strong>15</strong>%</span>
              </dd>
              <dt>짧아요</dt>
              <dd>
                <div class="wrap-percent">
                  <div class="percent" style="width: 5%"></div>
                </div>
                <span class="num"><strong>5</strong>%</span>
              </dd>
            </dl>
          </dd>
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
          <input type="checkbox" name="chkPhoto" id="chkPhoto" value="">
          <label for="chkPhoto">포토상품평</label>
        </span>
        <span class="wrap-select-category">
          <label for="select" class="hidden">정렬유형선택하기</label>
          <select id="select">
            <option>최신순</option>
          </select>
        </span>
      </div>
      <!-- START : 상품평 없을 경우 -->
      <NoList NoListText="등록된 상품평이 없습니다." :ListType="'review'" />
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
            <button class="btn-like" aria-label="리뷰추천" @click="reviewLikeAction">10</button>
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
            이 리뷰가 도움이 되었나요?
            <button class="btn-like" aria-label="리뷰추천" @click="reviewLikeAction">10</button>
          </div>
        </li>
        <!-- END : 포토 상품평 + MD talk 있을 경우 -->

        <!-- 실제개발작업용 -->
        <li class="photo mdtalk" :class="{open: review.review08}" v-for="itmc in itmcList" :key="itmc.id"> <!-- MD talk 있을 경우, "mdtalk" 클래스 추가 / 포토상품평 있을 경우, "photo" 클래스 추가 -->
          <div class="review-inner">
            <div class="">
              <span class="wrap-star">
                <span class="star-score" style="width: 90%;"></span>
              </span>
              <strong class="review-tag">4</strong>
            </div>
            <div class="user-info">
              <p>
                <span class="name" aria-label="작성자">{{itmc.cmmMbrNm}}</span>
                <span aria-label="작성일자">{{itmc.fstRegDttm}}</span>
              </p>
              <p>
                <span>{{itmc.itmOptnValNm}}</span>
              </p>
            </div>
            <dl class="wrap-category-review" v-if="itmc.itmcDtlEvlList !== ''">
              <span v-for="dtlEvl in itmc.itmcDtlEvlList" :key="dtlEvl.id">
              <dt>{{dtlEvl.itmcStandCdNm}}</dt>
              <dd>{{dtlEvl.itmcStandDtlCnts}}</dd>
              </span>
            </dl>
            <figure v-if="itmc.itmcCntsFileNm !== '' && !review.review07">
              <img v-bind:src="itmc.itmcCntsFileNm" alt="고객등록이미지">
            </figure>
            <PhotoReviewSlide  v-if="review.review08"/>
            <div class="wrap-text">
              <p class="text" v-if="itmc.itmcCnts !== ''">
                {{itmc.itmcCnts}}
              </p>
              <!-- START : 상품평까지 있을 경우 추가 -->
              <div class="wrap-detail-btn">
                <button class="btn-detail-more"  aria-label="상품평상세내용" aria-live="polite" aria-atomic="true" @click="reviewViewAction('review08')">
                  {{review.review08 ? '접기' : '자세히보기'}}
                </button>
              </div>
              <!-- END : 상품평까지 있을 경우 추가 -->
              <div class="wrap-md-talk" v-for="itmcReply in itmc.itmcReplyList" :key="itmcReply.id">
                <span class="ic-tag" v-if="itmcReply.mdReplyYn === 'Y'">MD Talk</span>
                <div class="reply" v-if="review.review08">
                  <p class="reply-info">
                    <span aria-label="작성자">{{itmcReply.replyMbrNm}}</span> /
                    <span aria-label="작성날짜"> {{itmcReply.replyRegDttm}}</span>
                  </p>
                  <p class="text" v-html="itmcReply.itmcReplyCnts"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="review-recommend">
            이 리뷰가 도움이 되었나요?
            <button class="btn-like" aria-label="리뷰추천" @click="reviewLikeAction">10</button>
          </div>
        </li>

      </ul>
    </section>
    <!-- END : 상품평 리스트 -->
  </div>
</template>

<script>
import NoList from '@/components/common/NoList';
import PhotoReviewSlide from '@/components/product/PhotoReviewSlide';
import AccordionMixin from '@/mixins/AccordionMixin';
import axios from "axios";
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "ProductReview",
  mixins: [AccordionMixin],
  components: {
    NoList,
    PhotoReviewSlide
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
      itmcList: {},
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
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
    }
  },

  mounted: async function() {
    let name = "itemId";
    console.log("location2222 :: "+location.search);
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location);
    console.log("results2222 :: "+results);
    const rsltItemId = (results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")));
    console.log("rsltItemId2222 :: "+rsltItemId);


    // 상품평리스트
    const responseItmcList = await axios.get("http://localhost:7000/prod_test_itmc_list.json");
    const respItmcList = responseItmcList.data;
    console.log("success respItmcList ::: "+respItmcList["success"]);
    const itmcList = respItmcList["data"];
    console.log("pre itmcList######......");
    this.itmcList = itmcList;
    console.log("pre itmcList.length......");
    console.log("itmcList.length: "+itmcList.length);
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
