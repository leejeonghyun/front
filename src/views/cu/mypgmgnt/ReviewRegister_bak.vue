<!--
@view/md/SC-FO-MD-GF-MS-015
-->
<template>
  <div id="popupReviewWrite" class="wrap-full-popup" role="dialog" aria-modal="true">
    <div class="header-popup">
      <strong>상품평 작성</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div :class="`popup-review ${step01 ? 'step02' : 'step01'}`">
          <!-- START : 상품  -->
          <div class="product-item">
            <figure>
              <img src="@/assets/images/_temp/_img_product12_01.jpg" alt="달콤한단감 5kg 특과" />
            </figure>
            <div class="inner">
              <p class="product-title">
                [초록팜] 달콤한 단감 5kg 특과 / 18-20개 (개당250g이상)
              </p>
              <div class="wrap-star" v-if="step01">
                <span class="star-score" :style="{width:starScore * 20 +'%'}"></span>
              </div>
            </div>
          </div>
          <!-- END : 상품 -->
          <!-- START : 상품평 작성 -->
          <div class="wrap-review-write" v-if="step01">
            <ul class="wrap-list-write" data-group="accordion">
              <li>
                <!-- //필수요소 "require" 클래스 추가 -->
                <button id="accordionBtn01" class="btn-accordion require" aria-expanded="true" aria-controls="accordionContent01" @click="accordionEvent02">
                  <span class="text">이 상품을 추천하시겠습니까?</span>
                </button>
                <div id="accordionContent01" class="accordion-content" aria-labelledby="accordionBtn01" v-if="accodionActive.accordionContent01">
                  <div class="wrap-review-recommend">
                    <span class="wrap-radio">
                      <input type="radio" id="radioRcommendUp" class="inp-recommend up" name="productRecommend" require/>
                      <label for="radioRcommendUp">추천해요</label>
                    </span>
                    <span class="wrap-radio">
                      <input type="radio" id="radioRcommendDown" class="inp-recommend down" name="productRecommend" />
                      <label for="radioRcommendDown">아쉬워요</label>
                    </span>
                  </div>
                </div>
              </li>
              <li data-group="accordion">
                <button id="accordionBtn02" class="btn-accordion" aria-expanded="true" aria-controls="accordionContent02" @click="accordionEvent02">
                  <span class="text">이 상품을 상세히 평가해주세요.</span>
                </button>
                <div id="accordionContent02" class="accordion-content" aria-labelledby="accordionBtn02" v-if="accodionActive.accordionContent02">
                  <ul class="wrap-detail-rate">
                    <li>
                      <strong>신선도</strong>
                      <div class="wrap-inner">
                        <span class="wrap-radio">
                          <input type="radio" id="radioFresh01" class="inp-rate" name="radioFresh" />
                          <label for="radioFresh01">신선해요</label>
                        </span>
                        <span class="wrap-radio">
                          <input type="radio" id="radioFresh02" class="inp-rate" name="radioFresh" />
                          <label for="radioFresh02">보통이에요</label>
                        </span>
                        <span class="wrap-radio">
                          <input type="radio" id="radioFresh03" class="inp-rate" name="radioFresh" />
                          <label for="radioFresh03">신선하지 않아요</label>
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>맛</strong>
                      <div class="wrap-inner">
                        <span class="wrap-radio">
                          <input type="radio" id="radioTasty01" class="inp-rate" name="radioTasty" />
                          <label for="radioTasty01">맛있어요</label>
                        </span>
                        <span class="wrap-radio">
                          <input type="radio" id="radioTasty02" class="inp-rate" name="radioTasty" />
                          <label for="radioTasty02">보통이에요</label>
                        </span>
                        <span class="wrap-radio">
                          <input type="radio" id="radioTasty03" class="inp-rate" name="radioTasty" />
                          <label for="radioTasty03">맛 없어요</label>
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>배송</strong>
                      <div class="wrap-inner">
                        <span class="wrap-radio">
                          <input type="radio" id="radioDelivery01" class="inp-rate" name="radioDelivery" />
                          <label for="radioDelivery01">만족해요</label>
                        </span>
                        <span class="wrap-radio">
                          <input type="radio" id="radioDelivery02" class="inp-rate" name="radioDelivery" />
                          <label for="radioDelivery02">보통이에요</label>
                        </span>
                        <span class="wrap-radio">
                          <input type="radio" id="radioDelivery03" class="inp-rate" name="radioDelivery" />
                          <label for="radioDelivery03">불만족해요</label>
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>유통기한</strong>
                      <div class="wrap-inner">
                        <span class="wrap-radio">
                          <input type="radio" id="radioExpire01" class="inp-rate" name="radioExpire" />
                          <label for="radioExpire01">넉넉해요</label>
                        </span>
                        <span class="wrap-radio">
                          <input type="radio" id="radioExpire02" class="inp-rate" name="radioExpire" />
                          <label for="radioExpire02">보통이에요</label>
                        </span>
                        <span class="wrap-radio">
                          <input type="radio" id="radioExpire03" class="inp-rate" name="radioExpire" />
                          <label for="radioExpire03">짧아요</label>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <button id="accordionBtn03" class="btn-accordion" aria-expanded="true" aria-controls="accordionContent03" @click="accordionEvent02">
                  <span class="text">상품평을 입력해주세요.</span>
                </button>
                <div id="accordionContent03" class="accordion-content" aria-labelledby="accordionBtn03" v-if="accodionActive.accordionContent03">
                  <div class="wrap-textarea">
                    <textarea :placeholder="placeholder"></textarea>
                    <p class="list-dot">
                      이미지는 최대 5MB이내  jpg, png, gif 형식의 파일 10개 이미지만 첨부하실 수 있습니다.
                    </p>
                  </div>
                  <div class="wrap-photo">
                    <swiper :options="swiperOptionScrollX">
                      <swiper-slide>
                        <input type="file" id="uploadPhoto" class="hidden btn-add" />
                        <label for="uploadPhoto">
                          <span class="count" aria-label="이미지 등록개수">1</span>/
                          <span class="total" aria-label="이미지 최대등록개수">10</span>
                        </label>
                      </swiper-slide>
                      <!-- <swiper-slide>
                        <div class="thumb">
                          <figure>
                            <img src="@/assets/images/_temp/_img_product12_01.jpg" alt="고객등록이미지" />
                          </figure>
                          <button class="btn-delete" aria-label="이미지첨부삭제"></button>
                        </div>
                      </swiper-slide>
                      <swiper-slide>
                        <div class="thumb">
                          <figure>
                            <img src="@/assets/images/_temp/_img_product12_01.jpg" alt="고객등록이미지" />
                          </figure>
                          <button class="btn-delete" aria-label="이미지첨부삭제"></button>
                        </div>
                      </swiper-slide>
                      <swiper-slide>
                        <div class="thumb">
                          <figure>
                            <img src="@/assets/images/_temp/_img_product12_01.jpg" alt="고객등록이미지" />
                          </figure>
                          <button class="btn-delete" aria-label="이미지첨부삭제"></button>
                        </div>
                      </swiper-slide>
                      <swiper-slide>
                        <div class="thumb">
                          <figure>
                            <img src="@/assets/images/_temp/_img_product12_01.jpg" alt="고객등록이미지" />
                          </figure>
                          <button class="btn-delete" aria-label="이미지첨부삭제"></button>
                        </div>
                      </swiper-slide>
                      <swiper-slide>
                        <div class="thumb">
                          <figure>
                            <img src="@/assets/images/_temp/_img_product12_01.jpg" alt="고객등록이미지" />
                          </figure>
                          <button class="btn-delete" aria-label="이미지첨부삭제"></button>
                        </div>
                      </swiper-slide> -->
                    </swiper>
                    <div class="swiper-scrollbar" slot="scrollbar"></div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="list-info">
              <ul>
                <li>
                  일반 상품평 작성 시 10원, 포토 상품평 작성 시 20원의 GS THE POP 리워즈를 지급해드립니다.
                </li>
                <li>
                  상품과 무관하거나 스팸, 음란, 비속어 내용의 상품평은 통보 없이 삭제 및 적립 혜택이 회수될 수 있습니다.
                </li>
              </ul>
            </div>
            <div class="wrap-footer-btn">
              <button class="btn-bg darkgray" @click="popupCloseAction">취소</button>
              <button class="btn-bg lightgreen" @click="regReview">등록</button>
            </div>
          </div>
          <!-- END : 상품평 작성 -->
          <!-- START : 별점 평가 -->
          <div class="wrap-star-rate" v-else>
            <p class="rate-text">이 상품 어떠셨나요?</p>
            <div class="wrap-star">
              <button class="star" :class="{active: starScore >= 1}" @click="starRatingAction(1)" aria-label="1점"></button>
              <button class="star" :class="{active: starScore >= 2}" @click="starRatingAction(2)" aria-label="2점"></button>
              <button class="star" :class="{active: starScore >= 3}" @click="starRatingAction(3)" aria-label="3점"></button>
              <button class="star" :class="{active: starScore >= 4}" @click="starRatingAction(4)" aria-label="4점"></button>
              <button class="star" :class="{active: starScore >= 5}" @click="starRatingAction(5)" aria-label="5점"></button>
            </div>
             <button class="btn-next btn-bg darkgray" @click="nextStepAction">
                <span>다음</span>
              </button>
          </div>
          <!-- END : 별점 평가 -->
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ApiUtils from '@/common/ApiUtils';
export default {
  name: "ReviewRegister",
  mixins: [LayerPopupMixin, AccordionMixin],
  props: ['ordId'],
  data() {
    return {
      placeholder: '- 최소 10자 이상 작성해주세요.',
      step01: false,
      starScore: 0,
      swiperOptionScrollX: {
        slidesPerView: 'auto',
        freeMode: true,
        containerModifierClass: 'wrap-list-photo ',
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
        },
      },
      reviewUnWriteLists: [],
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  methods: {
    nextStepAction() {
      this.step01 = true;
    },
    starRatingAction(score) {
      this.starScore = score;
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupReviewWrite');
      this.modalActiveEvent('popupReviewWrite');
    },
    regReview() {
    }
  },
  mounted: async function() {
        const InputDto = {
            ordId: this.ordId
        };
         console.log(JSON.stringify(this.reviewUnWriteLists));
       const resultList = await ApiUtils.get('/fo/cu/mypgmgnt/write-previous-commentaboutproduct-list', InputDto);
        console.log(JSON.stringify(resultList.data));
        if (resultList.data.success) {
              this.reviewUnWriteLists = resultList.data.data;
              console.log(JSON.stringify(this.reviewUnWriteLists));
        } else {
              console.log(resultList.data.statusMessage);
        }
    this.modalActiveEvent('popupReviewWrite');
  },
  updated() {
    if (this.step01 && !this.accordionViewInit) {
      this.accordionInit('accordion');
    }
  }
};
</script>

<style>

</style>
