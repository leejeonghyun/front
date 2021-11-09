<!--
views/ss/SC-FO-SS-GF-MS-707
-->
<template>
  <!-- 4월수정 START : UI 및 디자인 변경 이슈로 인한 마크업 추가 및 위치 변동 -->
  <div class="wrap-mypage review" v-bind:class="[siteClass]">
    <!-- START : Header -->
    <SubDefaultHeader headerText="상품평" />
    <!-- END : Header -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <!-- START : 2020.02.20 태그 변경-
      <a hrer="#" class="wrap-review-guide">
        <img
          src="@/assets/images/_temp/_img_banner_review02.jpg"
          alt="상품평 작성하고 GS THE POP 리워즈 받으세요!"
        />
      </a>-->
    <span class="wrap-review-guide" v-for="(bnr, index) in bnrList" :key="index">
      <img :src="bnr.ctnsPathNm" :alt="bnr.ctnsTitle" @click="goLink(bnr.linkUrl)"/>
    </span>

    <!--
      END : 2020.02.20 태그 변경 -->
      <!-- START : 상품목록 탭 -->
      <nav>
        <div class="wrap-searchresult tab-default">
          <ul class="scroll-area-x">
            <li>
              <button
                type="button"
                id="tab-all"
                aria-controls="tab-all-contents"
                @click="tabAction('all')"
                :class="{ active: this.naviTab.all }"
              >
                <strong>전체</strong>
              </button>
            </li>
            <li>
              <button
                type="button"
                id="tab-gsfresh"
                aria-controls="tab-gsfresh-contents"
                @click="tabAction('gsfresh')"
                :class="{ active: this.naviTab.gsfresh }"
              >
                <strong>GS 프레시몰</strong>
              </button>
            </li>
            <li>
              <button
                type="button"
                id="tab-dalisalda"
                aria-controls="tab-dalisalda-contents"
                @click="tabAction('dalisalda')"
                :class="{ active: this.naviTab.dalisalda }"
              >
                <strong>달리살다</strong>
              </button>
            </li>
            <!--
            <li>
              <button type="button" id="tab-daybreak" aria-controls="tab-daybreak-contents" @click="tabAction('daybreak')" :class="{active : this.naviTab.daybreak}">
                <strong>새벽배송</strong>
              </button>
            </li>
            -->
            <li>
              <button
                type="button"
                id="tab-simplycook"
                aria-controls="tab-simplycook-contents"
                @click="tabAction('simplycook')"
                :class="{ active: this.naviTab.simplycook }"
              >
                <strong>심플리쿡</strong>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <!-- END : 상품목록 탭 -->
      <!-- START : 상품평작성 콘텐츠 -->
      <div class="wrap-tab-content" ref="tabContents">
        <!-- START : 상품평 작성 여부 탭 -->
        <div class="wrap-tab-review">
          <ul class="tab-review">
            <li>
              <button
                id="tab-unwritten01"
                aria-controls="tab-unwritten01"
                @click="tabActionReview('unwritten')"
                :class="{ active: this.reviewTab.unwritten }"
              >
                <strong>미등록 상품평</strong>
              </button>
            </li>
            <li>
              <button
                id="tab-written01"
                aria-controls="tab-written01"
                @click="tabActionReview('written')"
                :class="{ active: this.reviewTab.written }"
              >
                <strong>작성한 상품평</strong>
              </button>
            </li>
          </ul>
          <!--
          <div class="sorting">
            <select
              name=""
              id="sortBy"
              class="selectbox-sorting"
              @change="changeSort()"
            >
              <option value="NEW">최신순</option>
              <option value="OLD">오래된순</option>
            </select>
          </div>
          -->
        </div>
        <!-- END : 상품평 작성 여부 탭 -->
        <!-- START : 작성한 상품평 리스트에는 기간 조회 버튼 추가 -->
        <div class="period-details" v-if="this.reviewTab.written">
          <fieldset>
            <legend>작성한 상품평 기간조회</legend>
            <div class="term">
              <button
                type="button"
                v-for="(month, index) in months"
                :key="month"
                class="btn-border"
                :class="{ showing: active == index }"
                @click="activeMonth(index)"
                aria-live="assertive"
                aria-atomic="true"
              >
                {{ month }}
              </button>
            </div>
            <div class="term-calendar">
              <button
                class="btn-calendar"
                aria-haspopup="dialog"
                title="조회기간 시작날짜 선택 팝업활성화"
                @click="calendarOpen('start')"
              >
                <span aria-label="조회기간 시작날짜">{{
                  this.period.start.date
                }}</span>
              </button>
              <code class="ico-period">~</code>
              <button
                class="btn-calendar"
                aria-haspopup="dialog"
                title="조회기간 끝나는 날짜 선택 팝업활성화"
                @click="calendarOpen('end')"
              >
                <span aria-label="조회기간 끝나는 날짜">{{
                  this.period.end.date
                }}</span>
              </button>
            </div>
            <button class="btn-md btn-bg darkgray" @click="search()">
              조회
            </button>
          </fieldset>
        </div>
        <!-- END : 작성한 상품평 리스트에는 기간 조회 버튼 추가 -->
        <!-- START : 전체 all 상품평 콘텐츠 -->
        <div
          id="tab-all-contents"
          class="tabcontents"
          aria-labelledby="tab-all"
        >
          <div
            id="tab-written01"
            class="tabcontents"
            aria-labelledby="tab-written01"
            v-if="this.reviewTab.written"
          >
            <div class="wrap-review" v-if="reviewWriteLists.length > 0">
              <!-- START : 상품평 목록 -->
              <section class="detail-view review">
                <h3 class="hidden">상품평 목록</h3>
                <ul
                  class="wrap-list-review"
                  ref="reviewList"
                  v-for="reviewWriteList in reviewWriteLists"
                  v-bind:key="reviewWriteList.rowSeq"
                  v-bind:reviewWriteList="reviewWriteList"
                >
                  <!-- START : 별점 + 상품만족도 + 텍스트 + 포토상품평 + MD talk 있을 경우 -->
                  <li
                    class="photo mdtalk"
                    :class="{ open: reviewWriteList.itmcOpen }"
                  >
                    <!-- MD talk 있을 경우, "mdtalk" 클래스 추가 / 포토상품평 있을 경우, "photo" 클래스 추가 -->
                    <div class="review-inner">
                      <figure>
                        <a
                          href="javascript:void(0);"
                          @click="goGoods(reviewWriteList)"
                        >
                       <img :src="getImg(reviewWriteList.itemCtnsFileNm)"
                          :alt="reviewWriteList.itemNm"
                        />
                        </a>
                      </figure>
                      <div class="area-text">
                        <p class="brand">{{ reviewWriteList.mallNm }}</p>
                        <p class="date-write">
                          <span>작성일 :</span>
                          <span> {{ reviewWriteList.wrtDt }}</span>
                        </p>
                        <p class="name-product">
                          {{ reviewWriteList.itemNm }}
                          <!--[초록팜] 달콤한 단감 5kg 특과 / 18-20개 (개당250g이상)444 -->
                        </p>
                        <p class="option">
                          <span>{{reviewWriteList.skuNm}}</span>
                        </p>
                        <div class="star">
                          <p class="wrap-star">
                            <span
                              class="star-score"
                              :style="{
                                width:
                                  (reviewWriteList.itmcScor * 100) / 5 + '%',
                              }"
                            ></span>
                          </p>
                          <strong
                            class="review-tag"
                            aria-label="상품평 별점 5점 중"
                            >{{ reviewWriteList.itmcScor }}</strong
                          >
                          <!-- 상품평 작성 시, 추천 했을 경우 아래 태그 추가 -->
                          <span
                            class="review-recommend-tag"
                            v-if="reviewWriteList.itmcRcmdCnt > 0"
                          >
                            추천해요</span
                          >
                        </div>
                      </div>
                      <!-- START : 리뷰 더보기 -->
                      <div class="wrap-review-more">
                        <!-- START : 상품 상품만족도 있을 경우 -->
                        <dl class="wrap-category-review"  v-if="reviewWriteList.itmcScorListInqRsltDto.length > 0">
                          <li
                            v-for="itmcScorList in reviewWriteList.itmcScorListInqRsltDto"
                            v-bind:key="itmcScorList.expsrSeq"
                            v-bind:itmcScorList="itmcScorList"
                          >
                            <dt>{{ itmcScorList.itmcStandCdNm }}</dt>
                            <dd>{{ itmcScorList.itmcScorNm }}</dd>
                          </li>
                        </dl>
                        <!-- END : 상품 상품만족도 있을 경우 -->
                        <!-- START : 이미지 슬라이드 있을 경우 -->
                        <div class="wrap-photoreview-slide" v-if="reviewWriteList.itmcDtlInqRsltDto !=null && reviewWriteList.itmcDtlInqRsltDto.length > 0">
                          <ul
                            class="wrap-view-image" :class="{ active: reviewWriteList.itmcOpen }" >
                            <li
                              v-for="itmcDtl in reviewWriteList.itmcDtlInqRsltDto"
                              v-bind:key="itmcDtl.itmcCtnsSeqno"
                              v-bind:itmcDtl="itmcDtl"
                            >
                              <button
                                aria-haspopup="dialog"
                                aria-label="이미지 상세보기 버튼"
                                @click="
                                  popupActionImg(
                                    'popupPhotoReview',
                                    reviewWriteList.itmcDtlInqRsltDto
                                  )
                                "
                              >
                                <img
                                  :src="getImg(itmcDtl.itmcCtnsPathNm)"
                                  alt="고객등록이미지"
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <!-- END : 이미지 슬라이드 있을 경우 -->
                        <!-- START : 텍스트 상품평 있을 경우 -->
                        <div class="wrap-text" v-if="true">
                          <p class="text">
                            <!--배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시
                            배송도 너무 빠르고 딱 먹고싶을때 먹었네요 ㅋ정말 껍질만 살짝 벗기면 부드러운 연시 -->
                            {{reviewWriteList.itmcCnts}}
                          </p>
                          <!-- START : MD talk 있을 경우 -->
                          <div
                            class="wrap-md-talk"
                            v-if="
                              reviewWriteList.itmcComtListInqRsltDto.length > 0
                            "
                          >
                            <span class="ic-tag"><strong>MD</strong>Talk</span>
                            <div class="reply" v-if="reviewWriteList.itmcOpen">
                              <p
                                class="reply-info"
                                v-for="itmcComtList in reviewWriteList.itmcComtListInqRsltDto"
                                v-bind:key="itmcComtList.expsrSeq"
                                v-bind:itmcComtList="itmcComtList"
                              >
                                <span aria-label="작성자">관리자</span> /
                                <span aria-label="작성날짜">
                                  {{ itmcComtList.fstRegDt }}</span
                                >
                              </p>
                              <p
                                class="text"
                                v-for="itmcComtList in reviewWriteList.itmcComtListInqRsltDto"
                                v-bind:key="itmcComtList.expsrSeq"
                                v-bind:itmcComtList="itmcComtList"
                              >
                                {{ itmcComtList.itmcComtCnts }}
                              </p>
                            </div>
                          </div>
                          <!-- END : MD talk 있을 경우 -->
                          <!-- START : 상품평까지 있을 경우 추가 -->
                          <div class="wrap-detail-btn"
                          v-if="fn(reviewWriteList.itmcCnts, reviewWriteList.itmcDtlInqRsltDto)"
                          > <!--v-if="reviewWriteList.itmcCnts !=''"-->
                            <button
                              class="btn-detail-more"
                              :class="{ active: reviewWriteList.itmcOpen }"
                              aria-label="상품평상세내용"
                              aria-live="polite"
                              aria-atomic="true"
                              @click="reviewViewAction(reviewWriteList.rowSeq)"
                            >
                              {{
                                reviewWriteList.itmcOpen ? '접기' : '자세히보기'
                              }}
                            </button>
                          </div>
                          <!-- END : 상품평까지 있을 경우 추가 -->
                        </div>
                        <!-- END : 텍스트 상품평 있을 경우 -->
                      </div>
                    </div>
                    <!-- END : 리뷰 더보기 -->
                    <div class="review-footer">
                      <div class="left">
                        <p class="like-desc">
                          <strong class="num">{{
                            reviewWriteList.itmcRcmdTot
                          }}</strong
                          >명에게 도움됐어요
                        </p>
                      </div>
                      <div class="right">
                        <button
                          class="btn-delete"
                          aria-label="상품평 삭제"
                          @click="
                            delReview(
                              reviewWriteList.itemId,
                              reviewWriteList.itmcSeqno
                            )
                          "
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </li>
                  <!-- END : 별점 + 상품만족도 + 텍스트 + 포토상품평 + MD talk 있을 경우 -->
                </ul>
              <!--   <div id="panel">loading:11 {{ loading }}</div> -->
              </section>
              <div class="right">
                <button
                  class="btn-write"
                  aria-label="상품평 작성 팝업 활성화"
                  aria-haspopup="dialog"
                  @click="
                    popupActionDtl('popupReviewWrite', reviewWriteList)
                  "
                >
                <!--  <span>작성하기</span> -->
                </button>
              </div>
              <!-- END : 상품평 목록 -->
            </div>
            <div class="wrap-review" v-if="reviewWriteLists.length == 0">
              <!-- START : 상품평 목록 -->
              <section class="detail-view review">
                <!-- START : 작성한 상품평이 없을 경우 -->
                <NoList
                  :ListType="'reviewList'"
                  SearchText=""
                  NoListText="작성 가능한 상품평이 없습니다."
                />
                <!-- END : 작성한 상품평이 없을 경우-->
              </section>
            </div>
          </div>
          <div
            id="tab-unwritten01"
            class="tabcontents"
            aria-labelledby="tab-unwritten01"
            v-if="this.reviewTab.unwritten"
          >
            <!-- 미등록 START -->
            <div class="wrap-review" v-if="reviewUnWriteLists.length > 0">
              <!-- START : 상품평 목록 -->
              <section class="detail-view review">
                <h3 class="hidden">gsfresh 상품평 목록</h3>
                <ul
                  class="wrap-list-review"
                  ref="reviewList"
                  v-for="reviewUnWriteList in reviewUnWriteLists"
                  v-bind:key="reviewUnWriteList.rowSeq"
                  v-bind:reviewUnWriteList="reviewUnWriteList"
                >
                  <li>
                    <div class="review-inner">
                      <figure>
                        <a
                          href="javascript:void(0);"
                          @click="goGoods(reviewUnWriteList)"
                        >
                        <img
                          :src="getImg(reviewUnWriteList.itemCtnsFileNm)"
                          :alt="reviewUnWriteList.itemNm"
                        />
                        </a>
                      </figure>
                      <div class="area-text">
                        <p class="brand top">{{ reviewUnWriteList.mallNm }}</p>
                        <p class="name-product">
                          {{ reviewUnWriteList.itemNm }}
                          <!-- [초록팜] 달콤한 단감 5kg 특과 / 18-20개 (개당250g이상) -->
                        </p>
                        <p class="option">
                          <span
                            >{{ reviewUnWriteList.skuNm}}<!-- 옵션명 노출 --></span
                          >
                        </p>
                      </div>
                    </div>
                    <div class="review-footer">
                      <div class="left">
                        <p class="date-delivery" v-if="!getEmpty(reviewUnWriteList.delivFinDttm)">
                          <span>배송완료일 :</span>
                          <span>{{ reviewUnWriteList.delivFinDttm }}</span>
                        </p>
                      </div>
                      <div class="right">
                        <button
                          class="btn-write"
                          aria-label="상품평 작성 팝업 활성화"
                          aria-haspopup="dialog"
                          @click="
                            popupActionDtl(
                              'popupReviewWrite',
                              reviewUnWriteList
                            )
                          "
                        >
                          <span>작성하기</span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
            <!--    <div id="panel">loading:22 {{ loading }}</div> -->
              </section>
              <!-- END : 상품평 목록 -->
            </div>
            <!-- 미등록 END -->
            <div class="wrap-review">
              <!-- START : 상품평 목록 -->
              <section
                class="detail-view review"
                v-if="reviewUnWriteLists.length == 0"
              >
                <!-- START : 작성한 상품평이 없을 경우 -->
                <NoList
                  :ListType="'reviewList'"
                  SearchText=""
                  NoListText="작성 가능한 상품평이 없습니다."
                />
                <!-- END : 작성한 상품평이 없을 경우-->
              </section>
            </div>
          </div>
        </div>
        <!-- END : 전체 상품평 콘텐츠 -->
        <!-- START : gsfresh 상품평 콘텐츠 -->

        <!-- END : gsfresh 상품평 콘텐츠 -->
      </div>
      <!-- END : 상품평작성 콘텐츠 -->
      <Loading v-show="loading > 0" />
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <PopupReviewRegister
      :ordId="ordId"
      :itemId="itemId"
      @popupEvent="popupAction"
      v-if="popup.popupReviewWrite"
    />
    <!-- 팝업 - 상품평 작성 팝업 -->
    <PopupPhotoReview
      :imageList="itmcDtlInqRslt"
      @popupEvent="popupAction"
      v-if="popup.popupPhotoReview"
    />
    <!-- 팝업 - 상품평 이미지 상세보기 -->
    <PopupPeriodCalendar
      :type="period.selected.type"
      :initDate="period.selected.changingDate"
      @calendarChange="calendarChange"
      @popupEvent="popupAction"
      v-if="popup.popupPeriodCalendar"
    />
    <!-- 팝업 - 기간조회 -->
  </div>
  <!-- 4월수정 END : UI 및 디자인 변경 이슈로 인한 마크업 추가 및 위치 변동 -->
</template>

<script>
/* 4월수정 START : 페이지 추가 및 컴포넌트 삭제 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer';
import AccordionMixin from '@/mixins/AccordionMixin';
import NoList from '@/components/common/NoList';
import PopupReviewRegister from '@/views/cu/mypgmgnt/ReviewRegister'; // 팝업 - 상품평 작성
// import PopupPhotoReview from '@/views/ss/SC-FO-SS-GF-MP-704'; // 팝업 - 상품평 이미지 상세보기
import PopupPhotoReview from '@/views/ss/PopupPhotoReview'; // 팝업 - 상품평 이미지 상세보기
// import PopupPeriodCalendar from '@/views/ss/SC-FO-SS-GF-MP-871'; // 팝업 - 기간조회
import PopupPeriodCalendar from '@/views/ss/PopupPeriodCalendar'; // 팝업 - 기간조회
import DateUtils from '@/common/DateUtils';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
/* 4월수정 END : 페이지 추가 및 컴포넌트 삭제  */
import ApiUtils from '@/common/ApiUtils';
import Loading from '@/components/common/Loading';
import CookieUtils from '@/common/CookieUtils';
import StringUtils from '@/common/StringUtils';
import ImgUtils from "@/common/ImgUtils";
import ItemTemplete from "@/common/ItemTemplete";
import SiteUtils from '@/common/SiteUtils';
export default {
  name: 'MyPageReviewList',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '상품평 < 나의활동 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '상품평',
      },
    ],
  },
  mixins: [AccordionMixin],
  components: {
    SubDefaultHeader,
    Footer,
    NoList,
    PopupReviewRegister,
    PopupPhotoReview,
    PopupPeriodCalendar,
    Loading,
  },
  props: ['imageCd'],
  data() {
    return {
      /* 4월수정 START : 데이터 추가 및 활성화 변경 */
      popup: {
        // 팝업
        open: false,
        popupReviewWrite: false, // 팝업 - 상품평작성 팝업
        popupPhotoReview: false, // 팝업 - 상품평 이미지 상세보기
        popupPeriodCalendar: false, // 팝업 - 기간조회
      },
      naviTab: {
        all: true,
        gsfresh: false,
        dalisalda: false,
        daybreak: false,
        simplycook: false,
      },
      reviewTab: {
        written: false,
        unwritten: true,
      },
      reviewAverage: false, // 상품만족도 활성화
      review: {
        // 상품평 목록 활성화
        review01: false,
        review02: false,
        review03: false,
        review04: false,
        review05: false,
        review06: false,
      },
      months: ['1개월', '3개월', '6개월'],
      selectedMonths: '1개월', // default = 15일
      period: {
        selected: {
          type: 'start',
          changingDate: {},
        },
        start: {
          date: DateUtils.format(
            DateUtils.add(DateUtils.getToday(), -1, 'month'),
            'YYYY-MM-DD',
            'dd'
          ),
          day: DateUtils.format(
            DateUtils.add(DateUtils.getToday(), -1, 'month'),
            'YYYY-MM-DD',
            'dd'
          ),
        },
        end: {
          date: DateUtils.format(DateUtils.getToday(), 'YYYY-MM-DD'),
          day: DateUtils.format(DateUtils.getToday(), 'dd'),
        },
      },
      active: 0,
      /* 4월수정 END : 데이터 추가 및 활성화 변경 */
      reviewWriteLists: [],
      reviewUnWriteLists: [],
      tabDiv: 'all',
      korName: '',
      userId: '',
      itmcDtlInqRslt: [],
      ordId: '',
      itemId: '',
      // 더보기
      moreData: true,
      loading: 0,
      count: 0,
      pageNo: 1,
      pageSize: 10,
      pageSizeGap: 0,
      totCount: 0,
      PAGE_SIZE: 10,
      bnrList: {},
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
      itmcBnrAction: function() {
            const vm = this;
            try {
              const bnrParams = {
                dspConrId: process.env.VUE_APP_CONR_PROD_ITMC,
                dspScrSpCd: '02', // 전시화면구분코드(01:PC, 02:모바일), // 쿠키에서 모바일과 PC구분을 잘 못하는 경우가 있어 강제로 세팅하여 사용
                storId: CookieUtils.getCookie('STOR_ID'),
                supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
                mallId: CookieUtils.getCookie('MALL_ID'),
                custGrdCd: CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD'),
              };
              this.loading++;
              ApiUtils.get('/dp/fr/displaymgnt/display-comm-banner-info', {...vm.$props.cookieParams, ...bnrParams}).then(res => {
                const respBnrInfo = res.data.data;
                if (respBnrInfo.rdspCommConrInfo != null) {
                  vm.bnrList = respBnrInfo.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0].rdspCommConrCntInfo;
                }
              }).finally(() => {
                this.loading--;
              });
            } catch (e) {
              vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
                console.log(e);
              });
            }
      },
   // popupAction(type, ordCd) {
      popupAction(type) {
      // 팝업 활성/비활성
      const $this = this;
      const options = [
        'optionDateFixed ',
        'optionDefault',
        'optionSelectOption',
      ];
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
      options.some(function(option) {
        if (type === option) {
          $this.popup.open = false;
        }
      });
        this.pageSize = this.PAGE_SIZE;
        this.getNotWrite(0, this.pageSize);
    },
      popupActionDtl(type, obj) {
      // 팝업 활성/비활성
      this.ordId = obj.ordId;
      this.itemId = obj.itemId;
      const $this = this;
      const options = [
        'optionDateFixed ',
        'optionDefault',
        'optionSelectOption',
      ];
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
      options.some(function(option) {
        if (type === option) {
          $this.popup.open = false;
        }
      });
    },
    popupActionImg(type, obj) {
      // 팝업 활성/비활성
      this.itmcDtlInqRslt = obj;
      // console.log(" === " +JSON.stringify(this.itmcDtlInqRslt));
      //  alert(type);
      const $this = this;
      const options = [
        'optionDateFixed ',
        'optionDefault',
        'optionSelectOption',
      ];
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
      options.some(function(option) {
        if (type === option) {
          $this.popup.open = false;
        }
      });
    },
    // 상품목록 탭
    tabAction(type) {
      this.tabDiv = type;
      for (let i = 0; i < Object.keys(this.naviTab).length; i++) {
        this.naviTab[Object.keys(this.naviTab)[i]] = false;
      }
      this.naviTab[type] = true;
      this.$refs.tabContents.focus();
      //      alert(" tabAction : " + type);
      if (this.reviewTab.written) {
        this.tabActionReview('written');
      } else if (this.reviewTab.unwritten) {
        this.tabActionReview('unwritten');
      }
    },
    // 상품평 작성 여부 탭
    tabActionReview(type) {
      // alert(" tabActionReview : " + type);
      for (let i = 0; i < Object.keys(this.reviewTab).length; i++) {
        this.reviewTab[Object.keys(this.reviewTab)[i]] = false;
      }
      this.reviewTabActive = [type];
      this.reviewTab[type] = true;
      this.pageNo = 1;
      this.pageSize = this.PAGE_SIZE;
      this.moreData = true;
      if (type == 'written') {
        this.getWrite(0, this.pageSize);
      } else {
        this.getNotWrite(0, this.pageSize);
      }
    },
    //  상품평 작성 여부 탭 기획/디자인 검수용
    tabActionReview02(type) {
      for (let i = 0; i < Object.keys(this.reviewTab02).length; i++) {
        this.reviewTab02[Object.keys(this.reviewTab02)[i]] = false;
      }
      this.reviewTabActive02 = [type];
      this.reviewTab02[type] = true;
    },
    goGoods(itemValue) {
       let url =
            '/md/product_detail?itemId=' + itemValue.itemId +
            '&storId=' + CookieUtils.getCookie('STOR_ID') + // itemValue.storId +
            '&supplFirmCd=' + CookieUtils.getCookie('SUPPL_FIRM_CD');
        if (itemValue.mallId) {
            const mallId = '&mallId=' + itemValue.mallId;
            url = url + mallId;
        }
        SiteUtils.go(location.host, url);
      // 통합검색 고려 수정
     // console.log(JSON.stringify(itemValue));
     // SiteUtils.go(location.host, ItemTemplete.itemDetail(itemValue), itemValue.mallId);
      // this.$router.push({ path: ItemTemplete.itemDetail(itemValue) });
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
    getEmpty(dt) {
      return StringUtils.isEmpty(dt);
    },
    reviewLikeAction() {
      // 리뷰 도움 버튼
      const $target = event.target;
      const activeClass = $target.classList.contains('active');
      if (activeClass) {
        $target.classList.remove('active');
      } else {
        $target.classList.add('active');
      }
    },
    reviewDetailAction() {
      // 상품만족도 상세 내용 활성화
      this.reviewAverage = !this.reviewAverage;
    },
    reviewViewAction(el) {
      // 상품평 목록 활성화
      // this.review[el] = !this.review[el];
      this.reviewWriteLists[el].itmcOpen = !this.reviewWriteLists[el].itmcOpen;
    },
    /* 4월수정 START : 이벤트 추가 */
    activeMonth(idx) {
      // 기간 조회 버튼 활성화 변경
      this.selectedMonths = this.months[idx];
      this.period.end.date = DateUtils.getToday();
      if (this.selectedMonths == '15일') {
        this.period.start.date = DateUtils.add(
          this.period.end.date,
          -15,
          'day'
        );
      } else if (this.selectedMonths == '1개월') {
        this.period.start.date = DateUtils.add(
          this.period.end.date,
          -1,
          'month'
        );
      } else if (this.selectedMonths == '3개월') {
        this.period.start.date = DateUtils.add(
          this.period.end.date,
          -3,
          'month'
        );
      } else if (this.selectedMonths == '6개월') {
        this.period.start.date = DateUtils.add(
          this.period.end.date,
          -6,
          'month'
        );
      }
      if (this.active !== idx) {
        this.active = idx;
      }
    },
    calendarChange(type, newDate) {
      // 달력 팝업으로 변경된 날짜 저장
      this.period[type].date = newDate.date;
    },
    calendarOpen(type) {
      // 달력 팝업 활성화 type: 'start' / 'end'
      this.period.selected.type = type;
      this.period.selected.changingDate = this.period[type];
      this.popupAction('popupPeriodCalendar');
    },
    /* 4월수정 END : 이벤트 추가 */
    delReview: async function(itemId, itmcSeqno) {
     // if (confirm("작성하신 상품평을 삭제하시겠습니까?")) {
        const confirmFlag = await this.$gsdialog.confirm("작성하신 상품평을 삭제하시겠습니까?", {html: true});
      if (confirmFlag) {
        const ItmcModInputDto = {
          delYn: 'Y',
          itemId: itemId,
          itmcSeqno: itmcSeqno,
          lastModUserId: this.userId,
        };
        // console.log(JSON.stringify(ItmcModInputDto));
        const resultList = await ApiUtils.put(
          '/fo/md/itmcmgnt/item-comment',
          ItmcModInputDto
        );
        this.pageSize = this.PAGE_SIZE;
       if (resultList.data.success) {
          this.$gsdialog.alert('삭제가 완료되었습니다.');
        if (this.reviewTab['written']) {
          this.getWrite(0, this.pageSize);
        } else {
          this.getNotWrite(0, this.pageSize);
        }
       }
      }
    },
    search() {
      if (this.reviewTab['written']) {
        if (DateUtils.format(this.period.start.date, 'YYYYMMDD') > DateUtils.format(this.period.end.date, 'YYYYMMDD')) {
          this.$gsdialog.alert("시작날짜가 종료날짜보다 뒤입니다.<br>날짜를 다시 설정해주세요", {html: true});
          return;
        }
        this.getWrite(0, this.pageSize);
      } else {
        this.getNotWrite(0, this.pageSize);
      }
    },
  goLink(link) {
    this.$router.push(link);
  },
    getNotWrite: function(pgNo, pgSize) {
      /*
      const ItmcListInqInputDto = {
        sort: document.getElementById('sortBy').value,
        offset: pgNo,
        limit: pgSize,
        mallId:
          this.tabDiv == 'gsfresh'
            ? '1'
            : this.tabDiv == 'dalisalda'
            ? '11'
            : this.tabDiv == 'simplycook'
            ? '20'
            : '',
      };
      */
      const ItmcListInqInputDto = {
            type: "2",
            itemId: "",
            photoItmcOnly: "N",
            dtlImgYn: "Y",
          // srchStDt: '20190101', // TODO
          // srchEdDt: '20200618', // TODO
            sort: 'NEW', // document.getElementById('sortBy').value,
            offset: pgNo,
            limit: pgSize,
            mallId:
              this.tabDiv == 'gsfresh'
                ? '1'
                : this.tabDiv == 'dalisalda'
                ? '11'
                : this.tabDiv == 'simplycook'
                ? '20'
                : '',
      };
      this.loading++;
      ApiUtils.get('/fo/cu/mypgmgnt/write-previous-commentaboutproduct-list', ItmcListInqInputDto).then(res => {
        if (res.data.success) {
          this.reviewUnWriteLists = res.data.data.wrtPreItmcListInqRsltDto;
          this.totCount = res.data.data.totalCnt;
        } else {
          this.totCount = 0;
        }
      }).finally(() => {
        this.loading--;
      });
    },
    getWrite: function(pgNo, pgSize) {
      const ItmcListInqInputDto = {
        type: '2',
        itemId: '',
        photoItmcOnly: 'N',
        dtlImgYn: 'Y',
        srchStDt: DateUtils.format(this.period.start.date, 'YYYYMMDD'),
        srchEdDt: DateUtils.format(this.period.end.date, 'YYYYMMDD'),
        sort: 'NEW', // document.getElementById('sortBy').value,
        offset: pgNo,
        limit: pgSize,
        mallId:
          this.tabDiv == 'gsfresh'
            ? '1'
            : this.tabDiv == 'dalisalda'
            ? '11'
            : this.tabDiv == 'simplycook'
            ? '20'
            : '',
        // mallId: null
      };

      this.loading++;
      ApiUtils.get('/fo/md/itmcmgnt/item-comment-count', ItmcListInqInputDto).then(res => {
        const respItmcCnt = res.data;
        this.totCount = respItmcCnt.data.itmcCnt;
        console.log(JSON.stringify(ItmcListInqInputDto));
      }).finally(() => {
        this.loading--;
      });

      this.loading++;
      // const resultList = await ApiUtils.get('/fo/md/itmcmgnt/item-comment-list', ItmcListInqInputDto); // 공통코드정보
      ApiUtils.get('/fo/md/itmcmgnt/item-comment-list', ItmcListInqInputDto).then(res => {
        console.log('====시작==1==');
        console.log(JSON.stringify(res.data.data));
        if (res.data.success) {
          this.reviewWriteLists = res.data.data;
          //    console.log(JSON.stringify(resultList.data.data));
          // for (let i = 0; i < this.reviewWriteLists.length; i++) {
          //    this.reviewWriteLists[i].num = i;
          // }
          // console.log(' reviewWriteLists ' + JSON.stringify(this.reviewWriteLists) );
        } else {
          console.log(res.data.statusMessage);
        }
        console.log('====끝====');
      }).finally(() => {
        this.loading--;
      });
    },
    getMbrInfo: function() {
      try {
        this.loading++;
        ApiUtils.get('/fo/cu/mbrmgnt/member-information', null).then(res => {
          this.korName = res.data.data.custNm;
          this.userId = res.data.data.webId;
        }).finally(() => {
          this.loading--;
        }); // 회원정보 가져오기
      } catch (e) {
        console.log(e);
      }
    },
    changeSort: function() {
      this.pageSize = this.PAGE_SIZE;
      if (this.reviewTab['written']) {
        this.getWrite(0, this.pageSize);
      } else {
        this.getNotWrite(0, this.pageSize);
      }
    },
    handleScroll: function() {
      const el = document.querySelector('body');
      const y = window.scrollY + window.innerHeight;
      const height = el.offsetHeight;
      const ratio = Math.floor((y / height) * 100);
      if (
        this.pageSize !=
        this.totCount + (this.PAGE_SIZE - (this.totCount % this.PAGE_SIZE))
      ) {
        if (ratio > 80 && this.moreData && this.loading <= 0) {
          this.loadMore();
        }
      }
      /* else {
        if (this.reviewTab['written']) {
          this.getWrite(0, this.PAGE_SIZE);
        } else {
          this.getNotWrite(0, this.PAGE_SIZE);
        }
      }
    */
    },
    loadMore: function() {
      if (
        this.pageSize !=
        this.totCount + (this.PAGE_SIZE - (this.totCount % this.PAGE_SIZE))
      ) {
        // console.log(" totCount " + this.totCount );
        this.pageNo = this.pageNo + 1;
        this.pageSize = this.pageNo * this.PAGE_SIZE;
        // this.getGsPointList(DateUtils.format(DateUtils.add(DateUtils.getToday(), this.gsPointDate, this.gsBetweenDiv), 'YYYYMMDD'), 1, this.pageSize);
        if (this.reviewTab['written']) {
          console.log(" this.reviewWriteLists.length " + this.reviewWriteLists.length );
         // if (this.reviewWriteLists.length == this.limit ) {
          this.getWrite(0, this.pageSize);
         // }
        } else {
          this.getNotWrite(0, this.pageSize);
        }
      } else {
        this.moreData = false;
        return;
      }
    },
    isAlphabet(ch) {
      const numUnicode = ch.charCodeAt(0);// number of the decimal Unicode
      if ( 65 <= numUnicode && numUnicode <= 90 ) return false;// 대문자
    // if ( 97 <= numUnicode && numUnicode <= 122 ) return true;// 소문자
    if (numUnicode == 102 ||
        numUnicode == 105 ||
        numUnicode == 106 ||
        numUnicode == 108 ||
        numUnicode == 114 ||
        numUnicode == 116) { // l j r t
      return true;
      }
       return false;
    },
    isKorean(ch) {
      const numUnicode = ch.charCodeAt(0);
      if ( 44032 <= numUnicode && numUnicode <= 55203 ) return true;
      return false;
    },
    isNumber(ch) {
      const numUnicode = ch.charCodeAt(0);
      if ( 48 <= numUnicode && numUnicode <= 57 ) return true;
      return false;
    },
  fn: function(strCnt, objImg) {
        const vm = this;
        const str = strCnt;
        if (str != null) {
          const winSize = window.innerWidth;
           let maxLen = 100; // 101.9;
          if (winSize != 411) {
              maxLen = (winSize * 100) / 411;
          }
         console.log("maxLen :: "+maxLen);
         if (objImg != null && objImg.length > 0) {
           maxLen = (winSize * 84) / 411;
         }
           console.log("---maxLen :: "+maxLen);
          console.log("getCntsSubstr str :: "+str);
          let strWeight = 0;
          for (let i = 0; i < str.length; i++) {
            if (vm.isAlphabet( str.charAt(i) )) {
               strWeight = strWeight - 0.7;
            } else if (vm.isKorean( str.charAt(i) )) {
              // korean += str.charAt(i);
              strWeight = strWeight + 0.6;
            } else if (vm.isNumber( str.charAt(i) )) {
              // number += str.charAt(i);
            } else {
              // special += str.charAt(i);
            }
          }
          // maxLen = maxLen - strWeight;
          const maxLimit = str.length + strWeight;
          console.log("getCntsSubstr :: strWeight : "+strWeight+" : str.length : "+str.length);
          if (maxLimit > maxLen) {
            console.log("getCntsSubstr showmore is true :: "+maxLimit+" : "+maxLen);
            // vm.showMore = true;
            return true;
          }
        }
        return false;
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    //  this.handleScroll();
    console.log("  ============ getWidth  ==" + window.innerWidth);
   this.getNotWrite(0, this.PAGE_SIZE);
    this.getMbrInfo();
    this.itmcBnrAction();
    window.addEventListener('scroll', this.handleScroll);
  },
  /* 4월수정 START : 이벤트 추가 */
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.popupTotalMenu) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
  /* 4월수정 END : 이벤트 추가 */
};
</script>
