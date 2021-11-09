<template>
  <div class="wrap-sub-detail" v-bind:class="[siteClass]">
    <!-- START : 상품상세 Header -->
    <SubDefaultHeader headerText="" />
    <!-- END : 상품상세 Header -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <!-- START : 상품상세 정보 슬라이드 이미지 -->
      <div class="product-top-visual" ref="productVisual">
        <button class="swiper-button-prev" aria-label="이전슬라이드"></button>
        <button class="swiper-button-next" aria-label="다음슬라이드"></button>
         <swiper :options="swiperOption" ref="subDetailSwiper">
           <swiper-slide v-for="(imgs,index) in itemImgInfo" :key="imgs.id">
             <button class="btn-img" aria-label="이미지 확대 팝업 열기" aria-haspopup="dialog" @click="popupAction('popupImage')">
               <img @load="setImage" v-bind:src="imgs.itemCtnsFileNm" :alt="itemInfo.itemNm+' 상품 사진'+(index+1)">
            </button>
           </swiper-slide>
           <!--<swiper-slide>
             <button class="btn-img" aria-label="이미지 확대 팝업 열기" aria-haspopup="dialog" @click="popupAction('popupImage')">
               <img src="@/assets/images/_temp/_img_product12_01.jpg" @load="setImage" alt="CJ 햄스빌 베이컨 320G*2봉 CJ 햄스빌 베이컨 320G*2봉CJ 햄스빌 베이컨 320G*2봉 상품 사진1">
             </button>
           </swiper-slide>
           <swiper-slide>
             <button class="btn-img" aria-label="이미지 확대 팝업 열기" aria-haspopup="dialog" @click="popupAction('popupImage')">
              <img src="@/assets/images/_temp/_img_product02_03.jpg" @load="setImage" alt="CJ 햄스빌 베이컨 320G*2봉 CJ 햄스빌 베이컨 320G*2봉CJ 햄스빌 베이컨 320G*2봉 상품 사진2">
             </button>
           </swiper-slide>
           <swiper-slide>
             <button class="btn-img" aria-label="이미지 확대 팝업 열기" aria-haspopup="dialog" @click="popupAction('popupImage')">
              <img src="@/assets/images/_temp/_img_product12_01.jpg" @load="setImage" alt="CJ 햄스빌 베이컨 320G*2봉 CJ 햄스빌 베이컨 320G*2봉CJ 햄스빌 베이컨 320G*2봉 상품 사진3">
             </button>
           </swiper-slide>-->
         </swiper>
         <div class="swiper-pagination" slot="pagination"></div>
      </div>
      <!-- END : 상품상세 정보 슬라이드 이미지 -->
      <!-- START : 상품상세 정보 상단 -->
      <div class="product-top-info item reserve">
        <div class="wrap-delivery-tag">
          <!-- START : 배송 관련 태그 있을 경우 추가 -->
          <!-- <span class="delivery-info" aria-label="배송방법">전국택배</span> -->
          <!-- <span class="delivery-info" aria-label="배송방법">업체택배</span> -->
          <span class="delivery-info" aria-label="배송방법">예약배송</span>
          <!-- END : 배송 관련 태그 있을 경우 추가 -->
          <p class="delivery-desc">11/18(월) 부터 순차배송</p>
        </div>
        <div class="wrap-info">
          <dl class="info">
            <dt>
              <p class="title-desc">더 건강하고 맛있는</p>
              <strong class="title" aria-label="상품명">
                <em>{{itemInfo.itemNm}} , {{itemInfo.itemModelNm}}
                  <!--CJ 햄스빌 베이컨 320G*2봉 CJ 햄스빌 베이컨 320G*2봉CJ 햄스빌 베이컨 320G*2봉-->
                </em>
              </strong>
            </dt>
            <!-- START : 할인할 경우 추가 -->
            <dd class="discount" aria-label="할인율">
              <strong class="num">{{itemSalePct}}</strong>%
            </dd>
            <dd class="list-price" aria-label="할인 적용 전 가격">
              <del class="price">{{itemPriceInfo.normSprc | toCurrency}}</del>원
            </dd>
            <!-- END : 할인할 경우 추가 -->
            <dd class="sale-price" aria-label="할인 적용 후 가격">
              <strong class="price">{{itemPriceInfo.sellAmt | toCurrency}}</strong>원
              <button class="btn icon-question" aria-haspopup="dialog" @click="popupAction('popupSales')">
                <span class="hidden">할인가 내역 상세보기</span>
              </button>
            </dd>
            <dd class="product-desc">
               {{itemPriceInfo.itemPrcUnitQty}}{{itemPriceInfo.itemPrcUnitCd}}당 {{itemUnitPrc | toCurrency}}원
            </dd>
          </dl>
          <button class="btn icon btn-sns" aria-haspopup="dialog" @click="popupAction('popupShare')">
            <span class="hidden">sns 공유하기</span>
          </button>
          <!-- START : 품절일 때 활성화 -->
          <!-- <button class="btn icon btn-alarm">
            입고알림
          </button> -->
          <!-- END : 품절일 때 활성화 -->
        </div>
        <!-- START : 상품 관련 태그 있을 경우 추가 -->
        <span class="wrap-product-tag">
          <!-- <span class="ico-benefit plus" aria-label="혜택">1+1</span> -->
          <!-- <span class="ico-benefit new" aria-label="새로운상품">new</span> -->
          <span class="ico-tag" aria-label="혜택" v-for="tags in itemTagInfo" :key="tags.id">{{tags}}</span>
          <!--<span class="ico-tag" aria-label="혜택">무료배송</span>
          <span class="ico-tag" aria-label="혜택">1인N개한정</span>
          <span class="ico-tag" aria-label="혜택">카드할인</span>
          <span class="ico-tag" aria-label="혜택">더블쿠폰</span>
          <span class="ico-tag" aria-label="혜택">다다익선</span>
          <span class="ico-tag" aria-label="혜택">사은품증정</span>
          <span class="ico-tag" aria-label="혜택">포인트증정</span>
          <span class="ico-tag" aria-label="혜택">통신사할인</span>-->
        </span>
        <!-- END : 상품 관련 태그 있을 경우 추가 -->
        <!-- START : 결제부가정보 영역 -->
        <div class="sub-info" aria-label="결제부가정보">
          <ul>
            <li>
              <div class="price-benefit-header toggle">
                <span>추가 혜택가</span>
                <span><strong class="price">4,200</strong>원~</span>
                <button class="toggle" id="benefit-header" :class="{active: this.toggle.BenefitAddition}" aria-controls="benefit-contents" :aria-expanded="toggle.BenefitAddition" @click="activeToggle('BenefitAddition')">
                  <span class="hidden">추가 혜택 자세히 보기</span>
                </button>
              </div>
              <div id="benefit-contents" class="price-benefit-contents toggle" aria-labelledby="benefit-header" :hidden="!toggle.BenefitAddition">
                <ul class="wrap-list-coupon">
                  <li>
                    <a href="#" class="btn-coupon-benefit" title="쿠폰 다운받기">
                      <div class="wrap-coupon type-summary">
                        <div class="top-info">
                          <p class="title">GSfresh 신한카드 전용</p>
                        </div>
                        <div class="price">
                          5,000<span class="unit">원</span>
                        </div>
                        <div class="desc">
                          <p>20,000원 이상 구매 시</p>
                          <p>최대 2,000원 할인</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="btn-coupon-benefit" title="쿠폰 다운받기">
                      <div class="wrap-coupon type-summary">
                        <div class="top-info">
                          <p class="title">GSfresh 신한카드 전용</p>
                        </div>
                        <div class="price">
                          5,000<span class="unit">원</span>
                        </div>
                        <div class="desc">
                          <p>20,000원 이상 구매 시</p>
                          <p>최대 2,000원 할인</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="btn-coupon-benefit" title="쿠폰 다운받기">
                      <div class="wrap-coupon type-summary">
                        <div class="top-info">
                          <p class="title">GSfresh 신한카드 전용GSfresh 신한카드 전용GSfresh 신한카드 전용GSfresh 신한카드 전용GSfresh 신한카드 전용GSfresh 신한카드 전용GSfresh 신한카드 전용GSfresh 신한카드 전용GSfresh 신한카드 전용</p>
                        </div>
                        <div class="price">
                          5,000<span class="unit">원</span>
                        </div>
                        <div class="desc">
                          <p>20,000원 이상 구매 시</p>
                          <p>최대 2,000원 할인</p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div class="price-benefit-header toggle">
                <span class="pay-type">카드할인(팝/국민/신한/BC)</span>
                <span><strong class="price">4,200</strong>원~</span>
                <button class="toggle" id="benefit-header1" :class="{active: this.toggle.BenefitCard}" aria-controls="benefit-contents1" :aria-expanded="toggle.BenefitCard" @click="activeToggle('BenefitCard')">
                  <span class="hidden">카드할인 자세히 보기</span>
                </button>
              </div>
              <div id="benefit-contents1" class="price-benefit-contents toggle" aria-labelledby="benefit-header1" :hidden="!toggle.BenefitCard">
                <dl>
                  <dt>카드 할인</dt>
                  <dd>
                    <p><strong class="price">4,200</strong>원</p>
                    <p>비씨카드 결제 시  10% 할인 / 최대 5만원</p>
                  </dd>
                </dl>
                <dl>
                  <dt>카드 청구 할인</dt>
                  <dd>
                    <p><strong class="price">4,200</strong>원</p>
                    <p>팝카드,비씨,삼성,NH 7만원 이상 결제 시 10% 할인 / 최대 2만원</p>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="price-benefit-header toggle">
                <span class="pay-type">통신사 최대 할인</span>
                <!-- 수정 START : 2020.02.07 해당 내용 삭제 -->
                <!-- <span><strong class="price">4,200</strong>원~</span> -->
                <!-- 수정 END : 2020.02.07 해당 내용 삭제 -->
                <button class="toggle" id="benefit-header2" :class="{active: this.toggle.BenefitCarrier}" aria-controls="benefit-contents2" :aria-expanded="toggle.BenefitCarrier" @click="activeToggle('BenefitCarrier')">
                  <span class="hidden" role="heading">통신사 최대 할인 자세히 보기</span>
                </button>
              </div>
              <div id="benefit-contents2" class="price-benefit-contents toggle" aria-labelledby="benefit-header2" :hidden="!toggle.BenefitCarrier">
                <dl>
                  <dt>KT</dt>
                  <dd>
                    <p>5만원 이상 결제 시, 3천원 할인 (월 1회)</p>
                  </dd>
                </dl>
                <dl>
                  <dt>LG U+</dt>
                  <dd>
                    <p>5만원 이상 결제 시, 3천원 할인 (월 1회)</p>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="price-benefit-header toggle">
                <span class="pay-type">무이자 할부 안내</span>
                <button class="toggle" id="benefit-header3" :class="{active: this.toggle.BenefitInterestFree}" aria-controls="benefit-contents3" :aria-expanded="toggle.BenefitInterestFree" @click="activeToggle('BenefitInterestFree')">
                  <span class="hidden">무이자 할부 안내 자세히 보기</span>
                </button>
              </div>
              <div id="benefit-contents3" class="price-benefit-contents toggle" :hidden="!toggle.BenefitInterestFree">
                <p class="info">· 무이자 할부는 결제 금액 기준으로 적용됩니다.</p>
                <dl>
                  <dt>신한카드</dt>
                  <dd>
                    <p><em>5만원↑, 2~6개월</em></p>
                    <ul>
                      <li>- 19.11.30까지</li>
                      <li>- 신한BC/법인카드 제외</li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>하나카드</dt>
                  <dd>
                    <p><em>5만원↑, 2~6개월</em></p>
                    <ul>
                      <li>- 19.11.30까지</li>
                      <li>- 신한BC/법인카드 제외</li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>
        <!-- END : 결제부가정보 영역 -->
      </div>
      <!-- END : 상품상세 정보 상단 -->
      <!-- START : 배너영역 영역 -->
      <ProductDetailViewBanner :eventBanner="eventBanner" :expire="expire" @setImageEvent="setImage" />
      <!-- <ProductDetailViewBanner :eventBanner="eventBanner" @setImageEvent="setImage" /> --> <!-- 만료 시간 없을 경우 -->
      <!-- END : 배너영역 영역 -->
      <div class="detail-view-tab" :class="{fixed: tabFixed}">
        <!-- START : 상품상세 탭 영역 -->
        <ul ref="tabList" class="tablist">
          <li :class="{active: tab.tabDetailInfo}">
            <a href="javascript:;" id="tabDetailInfo" aria-controls="tabDetailInfo-contents" @click="tabAction('tabDetailInfo')" role="button">
              상세정보
            </a>
          </li>
          <li :class="{active: tab.tabReview}">
            <a href="javascript:;" id="tabReview" aria-controls="tabReview-contents" @click="tabAction('tabReview')" role="button">
              상품평<span>(53)</span>
            </a>
          </li>
          <li :class="{active: tab.tabQna}">
            <a href="javascript:;" id="tabQna" aria-controls="tabQna-contents" @click="tabAction('tabQna')" role="button">
              상품Q&#38;A<span>(17)</span>
            </a>
          </li>
          <li :class="{active: tab.tabReturn}">
            <a href="javascript:;" id="tabReturn" aria-controls="tabReturn-contents" @click="tabAction('tabReturn')" role="button">
              반품/교환
            </a>
          </li>
        </ul>
        <!-- END : 상품상세 메뉴 영역 -->
      </div>
      <div class="wrap-tab-content" ref="tabContents" :class="{fixed: tabFixed}">
        <!-- START : 상세정보 탭 -->
        <div id="tabDetailInfo-contents" class="tabcontents" tabindex="0" aria-labelledby="tabDetailInfo" v-if="this.tab.tabDetailInfo">
          <h3 class="hidden">상세정보</h3>
          <div class="notice-md">
            <strong>MD 알림장</strong>
            <p>
              오늘은 어떤 과일이 저렴할까요?<br/>
              GS 프레시몰 으뜸 신선 과일로 겨울 감기 철통방어 해보세요!
            </p>
          </div>
          <div class="icon-property">
            <ul>
              <li>
                <img src="@/assets/images/_temp/_ico_property_zero.png" alt="제로칼로리 아이콘" />
                <span>제로칼로리</span>
              </li>
              <li>
                <img src="@/assets/images/_temp/_ico_property_fresh.png" alt="신선도 아이콘" />
                <span>신선도</span>
              </li>
              <li>
                <img src="@/assets/images/_temp/_ico_property_lowsalt.png" alt="저염 아이콘" />
                <span>저염</span>
              </li>
              <li>
                <img src="@/assets/images/_temp/_ico_property_organic.png" alt="유기농 아이콘" />
                <span>유기농</span>
              </li>
            </ul>
          </div>
          <!-- START : 관리자 등록 상품 상세 정보 -->
          <div class="detail-view info" :class="{'more-contents': viewMore.productDetail}" ref="productDetail">
            <!-- START : 상품상세 이미지 대체텍스트 -->
            <div class="hidden">
              <p>초록팜 제품 '자연의 정성을 가득 담아 당신께 드립니다.' 믿을 수 있는 초록팜의 정성을 가득 담았습니다. 자연을 가득 담아 고객님들 식탁으로 전해드립니다. 좋은 먹거리를 합리적인 가격에 드립니다.</p>
              <p>초록팜 제품 '자연의 정성을 가득 담아 당신께 드립니다.' 믿을 수 있는 초록팜의 정성을 가득 담았습니다. 자연을 가득 담아 고객님들 식탁으로 전해드립니다. 좋은 먹거리를 합리적인 가격에 드립니다.</p>
            </div>
            <!-- END : 상품상세 이미지 대체텍스트 -->
            <span v-html="itemDtlInfo.itemDtlDescCnts"></span>
            <!--<img src="@/assets/images/_temp/_img_product_detail_01.jpg" alt="">
            <img src="@/assets/images/_temp/_img_product_detail_01.jpg" alt="">-->
            <div class="btn-more-detail-view" :class="{open : viewMore.productDetail}">
              <button class="btn-border" aria-label="상품 상세페이지" @click="moreAction('productDetail')">
                <span aria-live="assertive" aria-atomic="true">{{viewMore.productDetail ? '닫기': '더보기'}}</span>
              </button>
            </div>
          </div>
          <!-- END : 관리자 등록 상품 상세 정보 -->
          <!-- START : 관리자 등록 상품 필수 정보 -->
          <ProductDetailViewRequired />
          <!-- END : 관리자 등록 상품 필수 정보 -->
          <!-- START : 추천상품 -->
          <section class="detail-view recommend">
            <h4>추천상품</h4>
            <ProductSlideSimple />
          </section>
          <!-- END : 추천상품 -->
          <!-- START : 관련기획전 -->
          <section class="detail-view event">
            <h4>관련 기획전</h4>
            <ul class="planshop-list">
              <li>
                <button>건강을 지키는 과일청 모음전</button>
              </li>
              <li>
                <button>대한민국 제철상품이 여기에 다 모였다!</button>
              </li>
            </ul>
          </section>
          <!-- END : 관련기획전 -->
        </div>
        <!-- END : 상세정보 탭 -->
        <!-- START : 상품평 탭 -->
        <div id="tabReview-contents" class="tabcontents" tabindex="0" aria-labelledby="tabReview" v-if="this.tab.tabReview">
          <h3 class="hidden">상품평</h3>
          <ProductReview @popupEvent="popupAction" :itmcPr="itmcParam"/>
        </div>
        <!-- END : 상품평 탭 -->
        <!-- START : 상품Q&A 탭 -->
        <div id="tabQna-contents" class="tabcontents" tabindex="0" aria-labelledby="tabQna" v-if="this.tab.tabQna">
          <h3 class="hidden">상품Q&#38;A</h3>
          <div class="detail-qna-view">
            <div class="qna-top">
              <button class="btn-border" aria-label="팝업활성화" aria-haspopup="dialog" @click="popupAction('popupQnA')">
                <span>상품 Q&#38;A 등록</span>
              </button>
            </div>
            <div class="qna-contens">
              <div class="qna-filter">
                <span class="inp-chk">
                  <input type="checkbox" name="eventList" id="eventList01" value="">
                  <label for="eventList01">비밀글 제외</label>
                </span>
                <span class="inp-chk">
                  <input type="checkbox" name="eventList" id="eventList01" value="">
                  <label for="eventList01">내 Q&#38;A</label>
                </span>
                <span class="wrap-select-category">
                  <label for="selectQnA" class="hidden">문의유형선택하기</label>
                  <select id="selectQnA">
                    <option>문의유형</option>
                  </select>
                </span>
              </div>
              <div class="qna-list">
                <!-- : 상품 Q&A 목록 없을 때-->
                <NoList NoListText="작성된 상품 Q&A가 없습니다." :ListType="'qnaList'" />
                <ProductDetailViewQnA01 :moreDetail="viewMore.qnaDetail" ref="qnaDetail" />
              </div>
            </div>
          </div>
        </div>
        <!-- END : 상품Q&A 탭 -->
        <!-- START : 반품/교환 탭 -->
        <div id="tabReturn-contents" class="tabcontents" tabindex="0" aria-labelledby="tabReturn" v-if="this.tab.tabReturn">
          <div class="detail-exchange-view">
            <h3 class="title">반품/교환 안내</h3>
            <dl>
              <dt>교환 및 반품이 가능한 경우</dt>
              <dd>
                제품을 수령한 날로부터 7일 이내에 접수 가능
              </dd>
              <dd>
                만약 상품 자체에 근본적인 하자로 인한 반품이거나 상품 및 용역이 표시, 광고와 다르게 이행된 경우, 이를 발견한 날로부터 30일, 혹은 공급받은 날로부터 3개월 이내 반품, 교환 가능
              </dd>
              <dt>교환 및 반품이 불가능한 경우</dt>
              <dd>
                고객님의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우(단 상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외)
              </dd>
              <dd>
                포장을 개봉하였거나 포장이 훼손되어 상품 가치가 현저히 상실된 경우
              </dd>
              <dd>
                고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우
              </dd>
              <dd>
                복제가 가능한 상품 등의 포장을 훼손한 경우
              </dd>
              <dt>교환/반품 시 유의사항</dt>
              <dd>
                단순 변심에 의한 반품 택배비(왕복)는 고객님이 부담하셔야 하며 반품 접수 없이 임의로 반송하거나 우편으로 보낼 경우 상품 확인이 어려워 환불이 불가능할 수 있으니 유의하시기 바랍니다.
              </dd>
              <dd>
                교환/반품/환불 정보는 ‘마이페이지’ 메뉴에서 확인하실 수 있습니다.
              </dd>
              <dt>예약상품 유의사항</dt>
              <dd>
                예약상품은 신제품으로 주문 수량만큼 물량확보가 되므로 주문취소가 불가합니다. (단, 주문취소 가능시점까지 변경 및 취소가능)
              </dd>
              <dd>
                고객변심으로 교환, 반품은 불가합니다.
              </dd>
            </dl>
          </div>
        </div>
        <!-- END : 반품/교환 탭 -->
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
    <!-- START : 하단 고정 버튼 (퀵메뉴) -->
    <div class="btn-fixed active">
      <PopupOptionDefault @popupEvent="popupAction" v-if="this.popup.optionDefault" /><!-- SC-FO-MD-GF-MP-012 장바구니 담기 옵션 팝업 -->
      <div class="wrap-btn">
        <!--  @click="popupOpenGift" -->
        <button class="btn-gift lightgray" aria-label="선물하기 / 조르기 팝업 활성화" aria-haspopup="dialog"><span class="hidden">선물하기 / 조르기</span></button>
        <button class="btn-lg btn-bg darkgray" aria-haspopup="dialog" @click="popupAction('optionDefault')">장바구니</button>
        <button class="btn-lg btn-bg lightgreen" aria-haspopup="dialog" @click="popupAction('optionDefault')">바로구매</button>
      </div>
      <div class="wrap-btn-option-popup" :class="{open: this.popup.optionDefault}"  v-if="this.popup.optionDefault">
        <button class="btn btn-option-popup" @click="popupAction('optionDefault')">
          <span class="hidden">옵션팝업닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 하단 고정 버튼 (퀵메뉴) -->
    <!-- START : 팝업 -->
    <PopupReviewRegister @popupEvent="popupAction" v-if="popup.popupReviewWrite"/> <!-- 상품평 작성 팝업 -->
    <PopupShareInfo @popupEvent="popupAction" v-if="popup.popupShare"/><!-- 공유하기 팝업 -->
    <PopupDiscountInfo @popupEvent="popupAction" v-if="popup.popupSales" /><!-- 할인 내역 팝업 -->
    <PopupOptionInfo @popupEvent="popupAction" v-if="popup.popupOption" /><!-- 장바구니 옵션 팝업 -->
    <PopupQnAWrite @popupEvent="popupAction" v-if="popup.popupQnA" /><!-- 상품 Q&A 작성 팝업 -->
    <PopupQnaItemSelect @popupEvent="popupAction" :popup="popup" /><!-- 상품 Q&A 상품선택 팝업 -->
    <PopupImageZoom @popupEvent="popupAction" v-if="popup.popupImage" /><!-- 이미지 확대 팝업 -->
    <!-- END : 팝업 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer';
import ProductDetailViewBanner from '@/components/product/ProductDetailViewBanner'; // 이벤트 배너
import ProductDetailViewRequired from '@/components/product/ProductDetailViewRequired'; // 상품 필수 정보
import ProductSlideSimple from '@/components/_temp/ProductSlideSimply01'; // 추천 상품
import PopupShareInfo from '@/views/md/SC-FO-MD-GF-MP-011'; // 팝업 - 공유하기
import PopupDiscountInfo from '@/components/product/PopupDiscountInfo'; // 팝업 - 할인내역
import PopupOptionInfo from '@/views/md/SC-FO-MD-GF-MP-001'; // 팝업 - 장바구니 옵션
import PopupQnAWrite from '@/views/md/SC-FO-MD-GF-MS-021'; // 팝업 - 상품 Q&A 작성
import PopupQnaItemSelect from '@/views/md/SC-FO-MD-GF-MP-022'; // 팝업 - 상품 Q&A 작성 상품선택
import PopupOptionDefault from '@/views/md/SC-FO-MD-GF-MP-012'; // 팝업 - SC-FO-MD-GF-MP-012 장바구니 담기 옵션 팝업
import PopupImageZoom from '@/components/common/PopupImageZoom'; // 팝업 - 이미지 확대
import PopupReviewRegister from '@/views/md/SC-FO-MD-GF-MS-015'; // 팝업 - 상품평 작성
import ProductReview from '@/views/md/ProductReview'; // 상품평 목록
import ProductDetailViewQnA01 from '@/components/_temp/ProductDetailViewQnA01';
import NoList from '@/components/common/NoList';
// import ProductDetailViewQnA from '@/components/product/ProductDetailViewQnA'; 실 사용 컴포넌트
// import ProductSlideSimple from '@/components/product/ProductSlideSimple'; // 실 사용 컴포넌트 추천 상품
// import PopupOptionDefault from '@/views/md/SC-FO-MD-GF-MP-013'; // 팝업 - SC-FO-MD-GF-MP-013 장바구니 담기 옵션 팝업
// import PopupOptionDefault from '@/views/md/SC-FO-MD-GF-MP-014'; // 팝업 - SC-FO-MD-GF-MP-014 장바구니 담기 옵션 팝업
// import PopupOptionDefault from '@/views/md/SC-FO-MD-GF-MP-015'; // 팝업 - SC-FO-MD-GF-MP-015 장바구니 담기 옵션 팝업
// import PopupOptionDefault from '@/views/md/SC-FO-MD-GF-MP-016'; // 팝업 - SC-FO-MD-GF-MP-016 장바구니 담기 옵션 팝업
// import PopupOptionDefault from '@/views/md/SC-FO-MD-GF-MP-017'; // 팝업 - SC-FO-MD-GF-MP-017 장바구니 담기 옵션 팝업
// import PopupOptionDefault from '@/views/md/SC-FO-MD-GF-MP-018'; // 팝업 - SC-FO-MD-GF-MP-018 장바구니 담기 옵션 팝업
// import PopupOptionDefault from '@/views/md/SC-FO-MD-GF-MP-019'; // 팝업 - SC-FO-MD-GF-MP-019 장바구니 담기 옵션 팝업
// import PopupOptionDefault from '@/views/md/SC-FO-MD-GF-MP-020'; // 팝업 - SC-FO-MD-GF-MP-020 장바구니 담기 옵션 팝업
import AccordionMixin from '@/mixins/AccordionMixin';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import axios from "axios";
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "SubViewDefault",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '상품 기본 정보 < 상품상세 < %s'
  },
  mixins: [AccordionMixin],
  components: {
    swiper,
    swiperSlide,
    SubDefaultHeader,
    Footer,
    PopupShareInfo,
    PopupDiscountInfo,
    PopupOptionInfo,
    PopupQnAWrite,
    PopupQnaItemSelect,
    ProductReview,
    PopupReviewRegister,
    ProductSlideSimple,
    ProductDetailViewRequired,
    ProductDetailViewBanner,
    NoList,
    // ProductDetailViewQnA, // 실 사용 컴포넌트
    ProductDetailViewQnA01, // 기획&디자인확인용
    PopupOptionDefault,
    PopupImageZoom
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      isActiveTab: 0,
      swiperOption: {
        slidesPerView: 1,
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
      },
      expire: '2020012023000000', // 만료시간(임시)
      popup: { // 팝업
        open: false,
        optionDefault: false, // 바로구매 옵션 팝업 기본
        optionDateFixed: false, // 바로구매 옵션 팝업 배송날짜 지정
        optionSelectOption: false, // 바로구매 옵션 팝업 선택형 옵션
        popupShare: false, // 공유하기 팝업
        popupSales: false, // 할인 내역 팝업
        popupOption: false, // 장바구니 옵션 팝업
        popupQnA: false, // 상품QnA 작성 팝업
        popupQnaItemSelect: false, // 상품QnA 상품선택 팝업
        popupImage: false, // 이미지 확대 팝업
        popupReviewWrite: false // 상품평작성 팝업
      },
      toggle: {
        BenefitAddition: false,
        BenefitCard: false,
        BenefitCarrier: false,
        BenefitInterestFree: false,
      },
      eventBanner: {
        bigSale: true, // 빅세일 배너
        hotDeal: false // 핫딜 배너
      },
      viewMore: {
        productDetail: false, // 상품 상세보기
        qnaDetail: false, // qna 더보기
      },
      tab: {
       tabDetailInfo: false,
       tabReview: true,
       tabQna: false,
       tabReturn: false
      },
      tabFixed: false, // 탭 fixed 상태
      tabOffsetTop: 0, // 탭 위치값

      itemInfo: [],
      itemImgInfo: [],
      itemTagInfo: [],
      itemPriceInfo: [],
      itemSalePct: [],
      itemDtlInfo: [],
      itemUnitPrc: [],
      itemIdGlobal: "",
      itmcParam: {
        itemId: "",
        cmmSteId: "",
        itemClasfCtgId: ""
      }
    };
  },
  methods: {
    // toggle
    activeToggle(el) {
      this.accordionEvent();
      this.toggle[el] = !(this.toggle[el] != false);
      this.tabInitTop();
    },
    // 상세보기 더보기
     moreAction(element) {
      this.viewMore[element] = !this.viewMore[element];
    },
    popupAction(type) { // 팝업 활성/비활성
      const $this = this;
      const options = ['optionDateFixed ', 'optionDefault', 'optionSelectOption'];
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
      options.some(function(option) {
        if (type === option) {
          $this.popup.open = false;
        }
      });
      if (type === 'popupQnaItemSelect') {
        this.popup.open = true;
      }
    },
    tabAction(type) {
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.$refs.tabContents.focus();
    },
    setImage() { // 상품 슬라이드 이미지 로딩 시 탭 위치 계산
      this.tabInitTop();
    },
    tabInitTop() { // 탭 초기 위치값 저장
      const tab = this.$refs.tabList;
      this.tabOffsetTop = tab.offsetTop;
    },
    tabScrollAction(currentScroll) { // 탭 스크롤 액션
      if (currentScroll >= this.tabOffsetTop) {
        this.tabFixed = true;
      } else {
        this.tabFixed = false;
      }
    },
    increment: function(chk, prc) {
      const chkObj = document.getElementById('chk'+chk).checked;
      if (chkObj === true) {
        this.itemUnitPrc = this.itemUnitPrc+prc;
      } else {
        this.itemUnitPrc = this.itemUnitPrc-prc;
      }
    }
  },
  filters: {
    toCurrency(value) {
      // if(typeof value !== "number") {
      //   return value;
      // }
      return new Intl.NumberFormat().format(value);
    },
    json: function(entry) {
      return JSON.stringify(entry);
    }
  },
  beforeCreate() {
  },
  mounted: async function() {
    const $this = this;
    $this.tabInitTop();
    window.addEventListener('scroll', function(e) {
      const scrollPosition = window.pageYOffset;
      $this.tabScrollAction(scrollPosition);
    });
    // let name = "itemId";
    // console.log("location :: "+location.search);
    // name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    // const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    // const results = regex.exec(location);
    // console.log("results :: "+results);
    // const rsltItemId = (results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")));
    // console.log("rsltItemId :: "+rsltItemId);
    // this.itemIdGlobal = rsltItemId;

    const paramItemId = this.$route.query.itemId;
    const paramCmmSteId = this.$route.query.cmmSteId;

    this.itmcParam.itemId = paramItemId;
    this.itmcParam.cmmSteId = paramCmmSteId;

    console.log("params :: "+this.itmcParam.itemId+" : "+this.itmcParam.cmmSteId);

    // 상품기본정보
    const itemParam = {itemId: paramItemId};
    console.log("itemParam :: "+itemParam);
    // const itemParamJson = JSON.stringify(itemParam);
    // const response = await axios.get("http://localhost:8060/fo/md/iteminfomgnt/normal-item-info", itemParamJson);

    await axios({
        method: 'post',
        url: 'http://localhost:8060/fo/md/iteminfomgnt/normal-item-info',
        headers: {
            'Content-Type': 'application/json'
        },
        data: itemParam
    }).then((res) => {
        // handle success
        const respItem = res.data;
        console.log("success item-info:: "+respItem["success"]);

        const itemInfoVal = respItem["data"];
        this.itemInfo = itemInfoVal;

        // 상품태그
        const itemTagInfoVal = itemInfoVal.itemSrchTagVal.split(',');
        this.itemTagInfo = itemTagInfoVal;

        console.log("itemInfoVal.itemClasfCtgId :: "+itemInfoVal.itemClasfCtgId);
        this.itmcParam.itemClasfCtgId = itemInfoVal.itemClasfCtgId;
    }).catch((err) => {
        // handle error
        console.log("err :: "+err);
    }).then(() => {
        // always
    });

    // const response = await axios.get("http://localhost:7000/prod_test.json");
    // const respItem= response.data;
    // const itemInfoVal = respItem["data"];
    // this.itemInfo = itemInfoVal;
    // // 상품태그
    // const itemTagInfoVal = itemInfoVal.itemSrchTagVal.split(',');
    // this.itemTagInfo = itemTagInfoVal;

    // 상품이미지
    const responseImg = await axios.get("http://localhost:7000/prod_test_image.json");
    const respImg = responseImg.data;
    console.log("success2 :: "+respImg["success"]);
    this.itemImgInfo = respImg["data"];

  // 상품가격.
  await axios({
        method: 'post',
        url: 'http://localhost:8060/fo/md/iteminfomgnt/normal-item-price',
        headers: {
            'Content-Type': 'application/json'
        },
        data: itemParam
    }).then((res) => {
        // handle success
        const respPrice = res.data;
        console.log("success item-price:: "+respPrice["success"]);

        const itemPriceVal = respPrice["data"];
        this.itemPriceInfo = itemPriceVal;

        const salePct = 100 - (Math.floor(itemPriceVal.sellAmt / itemPriceVal.normSprc * 100));
        console.log("salePct :: "+salePct);
        this.itemSalePct = salePct;

        const unitPrc = Math.floor((itemPriceVal.itemPrcUnitQty / itemPriceVal.itemPrcUnitVol) * itemPriceVal.sellAmt);
        console.log("unitPrc :: "+unitPrc);
        this.itemUnitPrc = unitPrc;
    }).catch((err) => {
        // handle error
        console.log("err :: "+err);
    }).then(() => {
        // always
    });

    // const responsePrice = await axios.get("http://localhost:7000/prod_test_price.json");
    // const respPrice = responsePrice.data;
    // console.log("success :: "+respPrice["success"]);

    // const itemPriceVal = respPrice["data"].itemPriceInfo;
    // this.itemPriceInfo = itemPriceVal;

    // const salePct = 100 - (Math.floor(itemPriceVal.sellAmt / itemPriceVal.normSprc * 100));
    // console.log("salePct :: "+salePct);
    // this.itemSalePct = salePct;

    // const unitPrc = Math.floor((itemPriceVal.itemPrcUnitQty / itemPriceVal.itemPrcUnitVol) * itemPriceVal.sellAmt);
    // console.log("unitPrc :: "+unitPrc);
    // this.itemUnitPrc = unitPrc;


    // 상품상세
    // await axios({
    //     method: 'post',
    //     url: 'http://localhost:8060/fo/md/iteminfomgnt/item-detail-info',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: itemParam
    // }).then((res) => {
    //     // handle success
    //     const respItem = res.data;
    //     console.log("success item-info:: "+respItem["success"]);

    //      this.itemDtlInfo = respDtl["data"];
    // }).catch((err) => {
    //     // handle error
    //     console.log("err :: "+err);
    // }).then(() => {
    //     // always
    // });

    const responseDtl = await axios.get("http://localhost:7000/prod_test_dtl.json");
    const respDtl = responseDtl.data;
    console.log("respDtl success :: "+respDtl["success"]);
    this.itemDtlInfo = respDtl["data"];


    // 폼전송
    // const params = new FormData();
    // params.append('param1', '첫번째파라미터');
    // const responsePost = await axios.post("http://localhost:8080/prod_test_post.json", params);
    // const respPost = responsePost.data;
    // console.log("respPost success :: "+respPost["success"]);
    // console.log("respPost msg :: "+respPost["data"].resultInfo.resultMsg);
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++ ) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
};
</script>
