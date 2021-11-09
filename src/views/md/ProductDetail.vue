<!--
Design: views/md/SC-FO-MD-GF-MS-010
Pg id: PG-FO-MD-O001
Uri:/product_detail
-->
<template>
  <div class="wrap-sub-detail" v-bind:class="[siteClass]"><!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우,  클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <link rel="stylesheet" href="/sys/css/product_mobile.css">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="" :tabbar="false"/>
    <!-- END : 헤더 -->
    <!-- START : 본문 -->
    <main id="main" tabindex="0">

      <!-- START : 상품상세 정보 슬라이드 이미지 -->
      <div class="product-top-visual" ref="productVisual">
        <div class="swiper-button-prev" aria-label="이전슬라이드" slot="button-prev" ref="subDetailSwiperPrev" role="button"></div>
        <div class="swiper-button-next" aria-label="다음슬라이드" slot="button-next" ref="subDetailSwiperNext" role="button"></div>
        <swiper :options="swiperOption" ref="subDetailSwiper">
          <swiper-slide v-for="(imgs, index) in itemInfo.itemImg" :key="index">
            <button class="btn-img" aria-label="이미지 확대 팝업 열기" aria-haspopup="dialog" @click="popupAction('popupImage')">
              <img :src="getImg(imgUrl+imgs.itemCtnsFileNm)" v-on:load="setImage" v-bind:alt="itemInfo.item.itemNm + ' 상품 사진 ' + (index+1)" v-bind:data-zoom-img-src="imgs.itemCtnsFileUrl" v-bind:data-zoom-img-idx="index+1" id="itemImage">
            </button>
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination" slot="pagination" ref="subDetailSwiperPagination"></div>
      </div>
      <!-- END : 공통 상품상세 정보 슬라이드 이미지 -->

      <!-- START : GS fresh + 달리살다 상품상세 정보 상단 -->
      <div class="product-top-info item reserve">
        <div class="wrap-delivery-tag">
          <!-- START : 배송 관련 태그 있을 경우 추가 -->
          <span class="delivery-info" aria-label="배송방법" v-if="itemInfo.item.delivMetho !== null">{{itemInfo.item.delivMetho}}</span>
          <!-- END : 배송 관련 태그 있을 경우 추가 -->
          <p class="delivery-desc" v-if="itemInfo.item.resvItemYn === 'Y'">{{itemInfo.item.itemStkotInstBeginD}} 부터 순차배송</p>
        </div>
        <!-- START : GS fresh 상품명,상품가격 노출 -->
        <div class="wrap-info">
          <dl class="info">
            <dt>
              <p class="title-desc" v-if="itemInfo.item.itemPrStnCnts !== null">{{itemInfo.item.itemPrStnCnts}}</p>
              <strong class="title" aria-label="상품명">
                <em>{{itemInfo.item.itemNm}}</em>
              </strong>
            </dt>
            <!-- START : 할인할 경우 추가 -->
            <dd class="discount" v-bind:aria-label="itemInfo.item.beneApplModeNm" v-if="itemInfo.item.dblePrcIndYn === 'Y'">
              <strong class="num">{{itemInfo.item.itemDcrt}}</strong>%
            </dd>
            <dd class="list-price" aria-label="할인 적용 전 가격" v-if="itemInfo.item.dblePrcIndYn === 'Y'">
              <del class="price">{{itemInfo.item.bfrSellAmt | toCurrency}}</del>원 {{fromOptionPriceDisp}}
            </dd>
            <!-- END : 할인할 경우 추가 -->
            <dd class="sale-price" aria-label="할인 적용 후 가격">
              <strong class="price">{{itemInfo.item.sellAmt | toCurrency}}</strong>원 {{fromOptionPriceDisp}}
              <button class="btn icon-question" aria-haspopup="dialog" @click="popupAction('popupSales')">
                <span class="hidden">할인가 내역 상세보기</span>
              </button>
            </dd>
            <dd class="product-desc" v-if="itemInfo.item.itemPrcUnitCd != null">
              {{itemInfo.item.itemPrcUnitQty}}{{itemInfo.item.itemPrcUnitNm}}당 {{itemInfo.item.itemUnitPrc | toCurrency}}원 {{fromOptionPriceDisp}}
            </dd>
          </dl>
          <button class="btn icon btn-sns" aria-haspopup="dialog" @click="popupAction('popupShare')">
            <span class="hidden">sns 공유하기</span>
          </button>
        </div>
        <!-- END : GS fresh 상품명,상품가격 노출 -->
        <!-- START : 상품 관련 태그 있을 경우 추가 -->
        <span class="wrap-product-tag">
          <!-- <span class="ico-benefit plus" aria-label="혜택">1+1</span> -->
          <!-- <span class="ico-benefit new" aria-label="새로운상품">new</span> -->
          <!--
          <span class="ico-tag" aria-label="혜택">무료배송</span>
          <span class="ico-tag" aria-label="혜택">1인N개한정</span>
          <span class="ico-tag" aria-label="혜택">카드할인</span>
          <span class="ico-tag" aria-label="혜택">더블쿠폰</span>
          <span class="ico-tag" aria-label="혜택">다다익선</span>
          <span class="ico-tag" aria-label="혜택">사은품증정</span>
          <span class="ico-tag" aria-label="혜택">포인트증정</span>
          <span class="ico-tag" aria-label="혜택">통신사할인</span>
          -->
          <span class="ico-tag" aria-label="혜택" v-if="itemInfo.item.freeDelivYn === 'Y'">무료배송</span>
          <span class="ico-tag" aria-label="혜택" v-if="itemInfo.item.nplusYn === 'Y'">1인N개한정</span>
          <span class="ico-tag" aria-label="혜택" v-if="itemInfo.item.cardDcYn === 'Y'">카드할인</span>
          <span class="ico-tag" aria-label="혜택" v-if="itemInfo.item.dbleCpn === 'Y'">더블쿠폰</span>
          <span class="ico-tag" aria-label="혜택" v-if="itemInfo.item.cmplYn === 'Y'">다다익선</span>
          <span class="ico-tag" aria-label="혜택" v-if="itemInfo.item.frgfYn === 'Y'">사은품증정</span>
          <span class="ico-tag" aria-label="혜택" v-if="itemInfo.item.comcoYn === 'Y'">통신사할인</span>
        </span>
        <!-- END : 상품 관련 태그 있을 경우 추가 -->

        <!-- START : 결제부가정보 영역 -->
        <div class="sub-info" aria-label="결제부가정보">
          <ul>
            <li v-if="promCouponInfo !== null && promCouponInfo.repDcAmt !== '0'">
              <div class="price-benefit-header toggle">
                <span>추가 혜택가</span>
                <span><strong class="price">{{promCouponInfo.repDcAmt | toCurrency}}</strong>원~</span>
              </div>
              <div id="benefit-contents" class="price-benefit-contents toggle" aria-labelledby="benefit-header" :hidden="!toggle.BenefitAddition">
                <ul class="wrap-list-coupon">
                  <li v-for="prom in promCouponInfo.itemApplCpnListInqRsltDto" :key="prom.id">
                    <a href="#" class="btn-coupon-benefit" title="쿠폰 다운받기">
                      <div class="wrap-coupon type-summary">
                        <div class="top-info">
                          <p class="title">{{prom.promNm}}</p>
                        </div>
                        <div class="price">
                          {{prom.cpnDcAmts | toCurrency}}<span class="unit">원</span>
                        </div>
                        <div class="desc">
                          <p>{{prom.evntApplStandAmt | toCurrency}}원 이상 구매 시</p>
                          <p>최대 {{prom.maxDcAmt | toCurrency}}원 할인</p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li v-if="promCardInfo != null && promCardInfo.repDcAmt !== '0'">
              <div class="price-benefit-header toggle">
                <span class="pay-type">카드할인({{promCardInfo.cardCompNm}})</span>
                <span><strong class="price">{{promCardInfo.repDcAmt | toCurrency}}</strong>원~</span>
                <button class="toggle" id="benefit-header1" :class="{active: this.toggle.BenefitCard}" aria-controls="benefit-contents1" :aria-expanded="toggle.BenefitCard" @click="activeToggle('BenefitCard')">
                  <span class="hidden">카드할인 자세히 보기</span>
                </button>
              </div>
              <div id="benefit-contents1" class="price-benefit-contents toggle" aria-labelledby="benefit-header1" :hidden="!toggle.BenefitCard">
                <dl v-if="promCardInfo.itemCardPromListInqRsltDto != null && promCardInfo.itemCardPromListInqRsltDto.length > 0">
                  <dt>카드 할인</dt>
                  <dd v-for="(prom, index) in promCardInfo.itemCardPromListInqRsltDto" :key="index">
                    <p><strong class="price">{{prom.cardDcAmt | toCurrency}}</strong>원</p>
                    <p>{{prom.evntTdrMeansApplNm}}카드 결제 시  {{prom.dcApplVal}}{{prom.dcTypeNm}} 할인 / 최대 {{prom.maxDcAmt | number2Kor('HALF')}}원</p>
                  </dd>
                </dl>
                <dl v-if="promCardInfo.itemCardChargPromListInqRsltDto != null && promCardInfo.itemCardChargPromListInqRsltDto.length > 0">
                  <dt>카드 청구 할인</dt>
                  <dd v-for="(prom, index) in promCardInfo.itemCardChargPromListInqRsltDto" :key="index">
                    <p><strong class="price">{{prom.cardDcAmt | toCurrency}}</strong>원</p>
                    <p>{{prom.evntTdrMeansApplNm}} {{prom.evntApplStandAmt | number2Kor('HALF')}}원 이상 결제 시 {{prom.dcApplVal}}{{prom.dcTypeNm}} 할인 / 최대 {{prom.maxDcAmt | number2Kor('HALF')}}원</p>
                  </dd>
                </dl>
              </div>
            </li>
            <li v-if="promComcoInfo.length > 0">
              <div class="price-benefit-header toggle">
                <span class="pay-type">통신사 최대 할인</span>
                <button class="toggle" id="benefit-header2" :class="{active: this.toggle.BenefitCarrier}" aria-controls="benefit-contents2" :aria-expanded="toggle.BenefitCarrier" @click="activeToggle('BenefitCarrier')">
                  <span class="hidden" role="heading">통신사 최대 할인 자세히 보기</span>
                </button>
              </div>
              <div id="benefit-contents2" class="price-benefit-contents toggle" aria-labelledby="benefit-header2" :hidden="!toggle.BenefitCarrier">
                <dl v-for="prom in promComcoInfo" :key="prom.id">
                  <dt>{{prom.promDtlTypeNm}}</dt>
                  <dd>
                    <p>{{prom.evntApplStandAmt | number2Kor('HALF')}}원 이상 결제 시, {{prom.comcoDcAmt | number2Kor('HALF')}}{{prom.dcTypeNm}} 할인 ({{prom.dcApplDurUnitNm}} {{prom.dcPosbNum}}회)</p>
                  </dd>
                </dl>
              </div>
            </li>
            <li v-if="foiInfo != undefined">
              <div class="price-benefit-header toggle" v-if="foiInfo.dspCnts != undefined">
                <span class="pay-type">무이자 할부 안내</span>
                <button class="toggle" id="benefit-header3" :class="{active: this.toggle.BenefitInterestFree}" aria-controls="benefit-contents3" :aria-expanded="toggle.BenefitInterestFree" @click="activeToggle('BenefitInterestFree')">
                  <span class="hidden">무이자 할부 안내 자세히 보기</span>
                </button>
              </div>
              <div id="benefit-contents3" class="price-benefit-contents toggle" :hidden="!toggle.BenefitInterestFree" v-if="foiInfo.dspCnts != undefined">
                <p class="info">· 무이자 할부는 결제 금액 기준으로 적용됩니다.</p>
                <div v-html="foiInfo.dspCnts"/>
                <!--<dl>
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
                </dl>-->
              </div>
            </li>
          </ul>
        </div>
        <!-- END : 결제부가정보 영역 -->
      </div>
      <!-- END : GS fresh + 달리살다 상품상세 정보 상단 -->

      <!-- START : GS fresh 상품 연관 행사 연결 배너 영역 -->
      <ProductDetailViewBanner :eventBanner="eventBanner" @setImageEvent="setImage" :bigSaleInfo="bigSaleInfo" v-if="bigSaleInfo !== null"/>
      <!-- <ProductDetailViewBanner :eventBanner="eventBanner" @setImageEvent="setImage" /> --> <!-- 만료 시간 없을 경우 -->
      <!-- END : GS fresh 상품 연관 행사 연결 배너 영역 -->

      <!-- START : 공통 상품상세 탭 영역 -->
      <div class="detail-view-tab" :class="{fixed: tabFixed}">
        <ul ref="tabList" class="tablist">
          <li :class="{active: tab.tabDetailInfo}">
            <a href="javascript:;" id="tabDetailInfo" aria-controls="tabDetailInfo-contents" @click="tabAction('tabDetailInfo')" role="button">
              상세정보
            </a>
          </li>
          <li :class="{active: tab.tabReview}">
            <a href="javascript:;" id="tabReview" aria-controls="tabReview-contents" @click="tabAction('tabReview')" role="button">
              상품평<span>({{itemInfo.item.itmcCnt}})</span>
            </a>
          </li>
          <li :class="{active: tab.tabQna}">
            <a href="javascript:;" id="tabQna" aria-controls="tabQna-contents" @click="tabAction('tabQna')" role="button">
              상품Q&#38;A<span>({{itemInfo.item.inqrCnt}})</span>
            </a>
          </li>
          <li :class="{active: tab.tabReturn}">
            <a href="javascript:;" id="tabReturn" aria-controls="tabReturn-contents" @click="tabAction('tabReturn')" role="button">
              구매정보
            </a>
          </li>
        </ul>
        <!-- END : 상품상세 메뉴 영역 -->
      </div>
      <!-- END : 공통 상품상세 탭 영역 -->

      <div class="wrap-tab-content" ref="tabContents" :class="{fixed: tabFixed}">
        <!-- START : GS fresh + 달리살다 상세정보 탭 -->
        <div id="tabDetailInfo-contents" class="tabcontents" tabindex="0" aria-labelledby="tabDetailInfo" v-if="this.tab.tabDetailInfo">
          <h3 class="hidden">상세정보</h3>
          <!-- 4월수정 START : 텍스트 추가
          <p class="popup-guide-desc">상품 이미지를 확대해서 볼 수 있습니다</p>
           4월수정 END : 텍스트 추가 -->
           <br/>
          <!-- [S]업체 공지 -->
          <div class="wrap-guide-notice" v-for="(noti, index) in itemInfo.mdNoti" :key="index">
            <strong class="title" v-html="noti.notiTitle"></strong>
            <p class="desc" v-html="noti.notiCnts"></p>
          </div>
          <!-- [E]업체 공지-->
          <!-- [S]MD 알림장 -->
          <div class="notice-md" v-if="itemInfo.item.mdNoti !== null">
            <strong>MD 알림장</strong>
            <p v-html="itemInfo.item.mdNoti"></p>
          </div>
          <!-- [S]MD 알림장 -->

          <!-- START : 상품속성 -->
          <div class="icon-property" v-if="itemInfo.attrInfo !== null">
            <ul>
              <li v-for="(data, index) in itemInfo.attrInfo" :key="index">
                <img :src="data.itemAttrItmImgUrl" :alt="data.itemAttrItmNm" v-if="index < 4"/>
                <span v-if="index < 4">{{data.itemAttrItmNm}}</span>
              </li>
            </ul>
          </div>
          <!-- END : 상품속성 -->

          <!-- START : 관리자 등록 상품 상세 정보 -->
          <div class="detail-view info" :class="{'more-contents': viewMore.productDetail}" ref="productDetail" v-if="optionalItemView == false">
            <!-- START : 상품상세 이미지 대체텍스트 -->
            <div v-html="itemInfo.item.itemDtlDesc"></div>
            <!-- END : 상품상세 이미지 대체텍스트 -->
            <div class="btn-more-detail-view" :class="{open : viewMore.productDetail}">
              <button class="btn-border" aria-label="상품 상세페이지" @click="moreAction('productDetail')">
                <span aria-live="assertive" aria-atomic="true">{{viewMore.productDetail ? '상품설명 접기': '더보기'}}</span>
              </button>
              <!-- 4월수정 START : 상품오류신고 케이스 추가 -->
              <div class="wrap-error-report" hidden>
                상품정보 및 이미지에 문제가 있나요?<button class="btn">상품오류신고</button>
              </div>
              <!-- 4월수정 END : 상품오류신고 케이스 추가 -->
            </div>
          </div>
          <!-- END : 관리자 등록 상품 상세 정보 -->

          <!-- START : 공통 묶음/패키지 상품 -->
          <ul class="wrap-product-list package-list" ref="productList" v-if="optionalItemView == true">
            <ProductListPackage @selPkgItem="selPkgItemAction" @popupDetail="popupDetailAction" @popupEvent="popupAction" v-for="(itemValue, index) in pitemList" :key="index" :itemValue="itemValue" :routeParams="routeParams" :idx="index"/>
          </ul>
          <!-- END : 공통 묶음/패키지 상품 -->

        </div>
        <!-- END :  GS fresh + 달리살다 상세정보 탭 -->

        <!-- START : 상품평 탭 -->
        <div id="tabReview-contents" class="tabcontents" tabindex="0" aria-labelledby="tabReview" v-if="this.tab.tabReview">
          <h3 class="hidden">상품평</h3>
          <ProductReview @popupEvent="popupAction" @photoSet="photoSetAction" :itmcPr="itmcParam"/>
          <!-- <div class="btn-more-detail-view">
            <button class="btn-border" aria-label="상품평더보기">
              <span aria-live="assertive" aria-atomic="true">더보기</span>
            </button>
          </div> -->
        </div>
        <!-- END : 상품평 탭 -->
        <!-- START : 상품Q&A 탭 -->
        <div id="tabQna-contents" class="tabcontents" tabindex="0" aria-labelledby="tabQna" v-if="this.tab.tabQna">
          <h3 class="hidden">상품Q&#38;A</h3>
          <ProductDetailViewQnA @inqrTotCntInc="inqrTotCntIncAction" :moreDetail="viewMore.qnaDetail" ref="qnaDetail" :qnaPr="qnaParam"/>
        </div>
        <!-- END : 상품Q&A 탭 -->

        <!-- START : GS fresh 구매정보 탭 -->
        <div id="tabReturn-contents" class="tabcontents" tabindex="0" aria-labelledby="tabReturn" v-if="this.tab.tabReturn">
          <!-- START : 달리살다 구매정보 안내 -->
          <div class="detail-info-view">
            <h3 class="hidden">구매정보 안내</h3>
            <!-- [S]상품기본정보 -->
            <div class="detail-view required">
              <button id="required-info01" class="detail-view-toggle-heading" :class="{active: this.toggle.productInfo01}" aria-controls="required-info-contents01" :aria-expanded="toggle.productInfo01" @click="activeToggle('productInfo01')">
                <span role="heading" aria-level="4">상품기본정보</span>
              </button>
              <div id="required-info-contents01" class="detail-view-toggle-contents" aria-labelledby="required-info01" :hidden="!toggle.productInfo01">
                <dl>
                  <dt>상품코드</dt>
                  <dd>{{itemInfo.item.itemId}}</dd>
                </dl>
                <dl>
                  <dt v-if="itemInfo.item.itemSpecCnts !== null">규격</dt>
                  <dd>{{itemInfo.item.itemSpecCnts}}</dd>
                </dl>
                <dl v-if="itemInfo.item.itemUnitPrc > 0 && itemInfo.item.itemPrcUnitQty > 0">
                  <dt>단위당 판매가</dt>
                  <dd>{{itemInfo.item.itemUnitPrc | toCurrency}}원/({{itemInfo.item.itemPrcUnitQty}}{{itemInfo.item.itemPrcUnitNm}}당)</dd>
                </dl>
                <dl>
                  <dt v-if="itemInfo.item.cnorNm !== null">원산지</dt>
                  <dd>{{itemInfo.item.cnorNm}}</dd>
                </dl>
                <dl>
                  <dt>재고수량</dt>
                  <dd v-if="itemInfo.item.resvItemYn == 'N'">{{itemInfo.item.sellPosbQty | toCurrency}}</dd>
                  <dd v-if="itemInfo.item.resvItemYn == 'Y'">{{itemInfo.item.itemResvSellPosbQty | toCurrency}}</dd>
                </dl>
                <dl v-if="itemInfo.item.dlfeeAmt > 0">
                  <dt>배송비</dt>
                  <dd>{{itemInfo.item.dlfeeAmt | toCurrency}}원 ({{itemInfo.item.freeDelivStandAmt | toCurrency}}원 이상 구매시 무료)<br/>단, 쇼핑대행료 기준은 배송지역에 따라 상이함</dd>
                </dl>
              </div>
            </div>
            <!-- [E]상품기본정보 -->
            <!-- [S]상품정보제공고시 -->
            <div class="detail-view required">
              <button id="required-info02" class="detail-view-toggle-heading" :class="{active: this.toggle.productInfo02}" aria-controls="required-info-contents02" :aria-expanded="toggle.productInfo02" @click="activeToggle('productInfo02')">
                <span role="heading" aria-level="4">상품정보제공고시</span>
              </button>
              <div id="required-info-contents02" class="detail-view-toggle-contents" aria-labelledby="required-info02" :hidden="!toggle.productInfo02">
                <dl v-for="(data, index) in itemInfo.ntfcAtcInfo" :key="index">
                  <dt>{{data.expsrInfoNtfcItmNm}}</dt>
                  <dd>{{data.itemInfoNtfcItmCnts}}</dd>
                </dl>
              </div>
            </div>
            <!-- [E]상품정보제공고시 -->
            <!-- [S]반품/교환 정보 -->
            <div class="detail-view">
              <button id="required-info03" class="detail-view-toggle-heading" :class="{active: this.toggle.productInfo03}" aria-controls="required-info-contents03" :aria-expanded="toggle.productInfo03" @click="activeToggle('productInfo03')">
                <span role="heading" aria-level="4">반품/교환 정보</span>
              </button>
              <div id="required-info-contents03" class="detail-view-toggle-contents" aria-labelledby="required-info03" :hidden="!toggle.productInfo03">
                <div class="return-product-info" v-html="itemInfo.item.rtnRefndDesc"></div>
              </div>
            </div>
            <!-- [E]반품/교환 정보 -->
          </div>
          <!-- END : GS fresh 구매정보 안내 -->
        </div>
        <!-- END : GS fresh 구매정보 탭 -->
      </div>
      <!-- START : 달리살다 배너영역
      <div class="product-banner05">
        <a href="#">
          <figure>
            <img src="@/assets/images/_temp/_banner_ad_product.jpg" alt="11월은 특별해요. 1+1특가사고 11%적립까지!">
          </figure>
        </a>
      </div>
       END : 달리살다 배너영역 -->
      <!-- START : 추천상품 -->
      <section class="detail-view recommend" v-if="rcItemList.length > 0">
        <h4>추천상품</h4>
        <ProductSlideImage1101 :itemList="rcItemList" :slideMargin="20" :moreNone="false"  @popupEvent="popupAction" @goCart="goCart" />
      </section>
      <!-- END : 추천상품 -->
      <!-- START : 관련기획전 -->
      <section class="detail-view event" v-if="ssevntList.length > 0">
        <h4>관련 기획전</h4>
        <ul class="planshop-list">
          <li v-for="(ssevnt, index) in ssevntList" :key="index">
            <button @click="linkSsevntAction(ssevnt)">{{ssevnt.ssevntNm}}</button>
          </li>
        </ul>
      </section>
      <!-- END : 관련기획전 -->
      <!-- 수정 END : 2020.03.10 컨텐츠 위치 변경 -->
    </main>
    <!-- START : 하단 고정 버튼 (퀵메뉴) 수정 : 2020.03.04 마크업 위치 변경 및 닫기 버튼 포커스 아웃 시 팝업 닫기 추가 -->
    <PopupOptionArea v-bind:dispType="'MD'" :cookieParams="cookieParams" ref="optionArea" />
    <!--<div class="btn-fixed active">
      <PopupOptionDefault @popupEvent="popupAction" v-if="this.popup.optionDefault" v-bind:itemData="itemInfo.item" v-bind:itemSelectData="itemSelectedList" v-on:itemSelectedList="setItemSelectedData" v-on:addItemSelectedList="setAddItemSelectedData"/>
      <div class="wrap-btn" v-if="itemInfo.item.ofsYn === 'Y'">
        <button class="btn-lg btn-bg lightgreen" aria-label="입고알림 팝업 활성화" aria-haspopup="dialog" v-on:click="getRstkinInfmRqt">입고알림</button>
      </div>
      <div class="wrap-btn" v-if="itemInfo.item.ofsYn === 'N'">
        !--  @click="popupOpenGift" --
        <button class="btn-gift lightgray" aria-label="선물하기 / 조르기 팝업 활성화" aria-haspopup="dialog" v-if="isLogin"><span class="hidden">선물하기 / 조르기</span></button>
        <button class="btn-lg btn-bg darkgray" aria-haspopup="dialog" @click="setOrder('C')">장바구니</button>
        <button class="btn-lg btn-bg lightgreen" aria-haspopup="dialog" @click="setOrder('S')">바로구매</button>
      </div>
      <div class="wrap-btn-option-popup" :class="{open: this.popup.optionDefault}"  v-if="this.popup.optionDefault && itemInfo.item.ofsYn === 'N'">
        <button class="btn btn-option-popup" @click="popupAction('optionDefault')" @keydown.9="tabFocusRemove('optionDefault')" aria-label="포커스 아웃 시 팝업 닫기">
          <span class="hidden">옵션팝업닫기</span>
        </button>
      </div>
    </div>-->

    <!-- END : 하단 고정 버튼 (퀵메뉴) 수정 : 2020.03.04 마크업 위치 변경 및 닫기 버튼 포커스 아웃 시 팝업 닫기 추가 -->
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->

    <!-- START : 팝업 -->
    <PopupReviewRegister @popupEvent="popupAction" v-if="popup.popupReviewWrite"/> <!-- 상품평 작성 팝업 -->
    <PopupShareInfo @popupEvent="popupAction" v-if="popup.popupShare" :itemInfo="itemInfo"/><!-- 공유하기 팝업 -->
    <PopupProductDetail @popupDetail="popupDetailAction" @popupEvent="popupAction" v-if="popup.popupDetail" :pitemDtl="pitemDtl" :pitemList="pitemList"/><!-- 상품 상세보기 팝업 -->
    <PopupDiscountInfo @popupEvent="popupAction" v-if="popup.popupSales" v-bind:dcSateInfo="itemInfo.dcSateInfo"/><!-- 할인 내역 팝업 -->
    <!--<PopupOptionInfo @popupEvent="popupAction" v-if="popup.popupOption" /> 장바구니 옵션 팝업 -->-->
    <!--<PopupQnAWrite @popupEvent="popupAction" v-if="popup.popupQnA" /> 상품 Q&A 작성 팝업 -->
    <PopupQnaItemSelect @popupEvent="popupAction" :popup="popup" /><!-- 상품 Q&A 상품선택 팝업 -->
    <PopupImageZoom @popupEvent="popupAction" v-if="popup.popupImage" v-bind:itemImage="itemInfo.zoomItemImage" /><!-- 이미지 확대 팝업 -->
    <PopupCertificationComponent @popupEvent="popupAction" v-if="popup.popupCertification" hasButton="true" :certData="certInfo" /><!--인증성분 팝업-->
    <PopupRstkinInfm v-if="this.popup.rstkinInfm" @popupEvent="popupAction" v-on:rstkinInfmRqt="setRstkinInfmRqt"/> <!-- 입고알림(RstkinInfm) -->
    <!-- 4월수정 START : 팝업 추가 -->
    <PopupPhotoReview @popupEvent="popupAction" :photoList="reviewPhotoList" :photoKey="reviewPhotoKey" v-if="popup.popupPhotoReview"/> <!-- 상품평 이미지 상세보기 팝업 -->
    <!-- 4월수정 END : 팝업 추가 -->
    <PopupOptionArea v-bind:dispType="'DP'" :cookieParams="cookieParams" ref="optionAreaDp" />
    <!-- END : 팝업 -->

  </div>
</template>

<script>
import Vue from 'vue';
// export const EventBus = new Vue();
export const EventBus = new Vue({
  methods: {
    setOrderAction(obj) {
      this.$emit('setOrderAction', obj);
    }
  }
});
// import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 통합 헤더
import Footer from '@/components/common/Footer';
import ProductDetailViewBanner from '@/components/product/ProductDetailViewBanner'; // 이벤트 배너
// import ProductSlideSimple from '@/components/_temp/ProductSlideSimply01'; // 추천 상품
import ProductSlideImage1101 from '@/components/productTemplete/ProductSlideImage11-01'; // 이미지 일반형11 type2 슬라이드 사용 예시
import PopupShareInfo from '@/views/md/PopupShareInfo'; // 팝업 - 공유하기
import PopupProductDetail from '@/views/md/PopupViewPackage'; // 팝업 - 상품 상세보기
import PopupDiscountInfo from '@/components/product/PopupDiscountInfo'; // 팝업 - 할인내역
// import PopupOptionInfo from '@/views/md/SC-FO-MD-GF-MP-001'; // 팝업 - 장바구니 옵션
// import PopupQnAWrite from '@/views/md/SC-FO-MD-GF-MS-021'; // 팝업 - 상품 Q&A 작성
import PopupQnaItemSelect from '@/views/md/SC-FO-MD-GF-MP-022'; // 팝업 - 상품 Q&A 작성 상품선택
import PopupImageZoom from '@/components/common/PopupImageZoom'; // 팝업 - 이미지 확대
import PopupReviewRegister from '@/views/md/SC-FO-MD-GF-MS-015'; // 팝업 - 상품평 작성
import PopupCertificationComponent from '@/components/product/PopupCertificationComponent'; // 팝업 - 달리살다 인증성분
import ProductReview from '@/views/md/ProductReview'; // 상품평 목록
// import ProductDetailViewQnA01 from '@/components/_temp/ProductDetailViewQnA01';
import ProductDetailViewQnA from '@/components/product/ProductDetailViewQnA'; // 실 사용 컴포넌트
import NoList from '@/components/common/NoList';
// import ProductPackageItem from '@/components/product/ProductPackageItem'; // 묶음 상품 리스트
import ProductListPackage from '@/components/productTemplete/ProductListPackage'; // 묶음 상품 리스트
// import ProductDetailViewQnA from '@/components/product/ProductDetailViewQnA'; 실 사용 컴포넌트
// import ProductSlideSimple from '@/components/product/ProductSlideSimple'; // 실 사용 컴포넌트 추천 상품
// import PopupOptionDefault from '@/views/md/OptionDetail';
import PopupOptionArea from '@/views/md/OptionArea';
import PopupRstkinInfm from '@/views/md/RstkinInfm'; // 팝업 - 재입고 알림
import PopupPhotoReview from '@/views/ss/PopupPhotoReview'; // 팝업 - 상품평 이미지 상세보기

import AccordionMixin from '@/mixins/AccordionMixin';
import SlideControlMixin from '@/mixins/SlideControlMixin'; // 4월수정 : 슬라이드 수정
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
// import DaliProductSlide from '@/components/product/DaliProductSlide';
// import DaliProductSlide01 from '@/components/_temp/DaliProductSlide01';
// import ProductSlideImage18 from '@/components/productTemplete/ProductSlideImage18'; // 이미지 일반형18 슬라이드 사용 예시
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import ItemTemplete from '@/common/ItemTemplete';

export default {
  name: "ProductDetail",
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
    PopupProductDetail,
    PopupDiscountInfo,
    // PopupOptionInfo,
    // PopupQnAWrite,
    PopupQnaItemSelect,
    ProductReview,
    PopupReviewRegister,
    // ProductSlideSimple,
    ProductDetailViewBanner,
    // NoList,
    ProductDetailViewQnA, // 실 사용 컴포넌트
    // ProductDetailViewQnA01, // 기획&디자인확인용
    // PopupOptionDefault,
    // PopupOptionArea,
    PopupOptionArea: () => import('./OptionArea.vue'),
    PopupImageZoom,
    // DaliProductSlide, // 실 사용 컴포넌트
    // DaliProductSlide01, // 기획&디자인확인용
    PopupCertificationComponent,
    PopupRstkinInfm,
    // ProductPackageItem,
    ProductListPackage,
    PopupPhotoReview,
    // ProductSlideImage18,
    ProductSlideImage1101,
  },
  data() {
    return {
      // meta: [ // 앱 트래커 메타정보 // 입고알림트캐러, 개발 진행 후 작업필요
      //   {
      //     property: 'aa:page',
      //     content: '상품상세^'+this.itemInfo.item.itemNm,
      //   },
      //   {
      //     property: 'aa:product',
      //     content: '카테고리;상품코드;상품명'
      //   },
      // ],
      imgUrl: 'https://imagedev.gsecretail.com',
      imgSize: 300,
      isActiveTab: 0,
       swiperOption: {
        slidesPerView: 1,
        autoHeight: true,
        pagination: {
          el: '.product-top-visual .swiper-pagination'
        },
        navigation: {
          nextEl: '.product-top-visual .swiper-button-next',
          prevEl: '.product-top-visual .swiper-button-prev'
        },
      },
      swiperOption02: {
        slidesPerView: 'auto',
        freeMode: true
      },
      expire: '2020012023000000', // 만료시간(임시)
      popup: { // 팝업
        open: false,
        optionDefault: false, // 바로구매 옵션 팝업 기본
        optionDateFixed: false, // 바로구매 옵션 팝업 배송날짜 지정
        optionSelectOption: false, // 바로구매 옵션 팝업 선택형 옵션
        popupShare: false, // 공유하기 팝업
        popupDetail: false, // 상품 상세보기 팝업
        popupSales: false, // 할인 내역 팝업
        popupOption: false, // 장바구니 옵션 팝업
        popupQnA: false, // 상품QnA 작성 팝업
        popupQnaItemSelect: false, // 상품QnA 상품선택 팝업
        popupImage: false, // 이미지 확대 팝업
        popupReviewWrite: false, // 상품평작성 팝업
        popupCertification: false, // 달리살다 인증성분 팝업
        rstkinInfm: false, // 재입고알림 팝업
        popupPhotoReview: false // 이미지 상세보기 팝업
      },
      toggle: {
        BenefitCard: false,
        BenefitCarrier: false,
        BenefitInterestFree: false,
        productInfo01: true, // 수정 2020.03.05 값 변경 false -> true
        productInfo02: false,
        productInfo03: false,
        productInfo04: false,
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
       tabDetailInfo: true,
       tabReview: false,
       tabQna: false,
       tabReturn: false
      },
      tabFixed: false, // 탭 fixed 상태
      tabOffsetTop: 0, // 탭 위치값
      params: {
        itemId: this.$route.query.itemId, // 상품ID
        storId: this.$route.query.storId, // 매장ID
        supplFirmCd: this.$route.query.supplFirmCd, // 공급업체코드
        mallId: this.$route.query.mallId, // 몰ID
        ssevntId: this.$route.query.ssevntId, // 기획전ID
        ssevntTimes: this.$route.query.ssevntTimes, // 기획전회차
        chanlId: this.$route.query.chanlId
      },
      /* #### [S]상품정보 #### */
      itemInfo: {
        // params: {
        //   itemId: this.$route.query.itemId,
        //   mallId: this.$route.query.mallId,
        //   storId: this.$route.query.storId,
        //   supplFirmCd: this.$route.query.supplFirmCd
        // },
        item: [], // 상품정보
        itemImg: [], // 상품이미지 정보
        ntfcAtcInfo: [], // 상품고시품목정보
        dcSateInfo: { // 할인내역 정보
          sellAmt: 0,
          bfrSellAmt: 0,
          cpnAplAmt: 0,
          cpnDcrt: 0,
          itemDcrt: 0,
          mbsDcAmt: 0,
          mbsDcrt: 0
        },
        zoomItemImage: "", // 상품 줌 이미지
        attrInfo: [], // 상품 속성 정보
        mdNoti: [], // 업체[MD] 공지
      },
      certInfo: {},
      itemSelectedList: [],
      itemSelectedListLocal: this.$store.state.md.itemSelectedList,
      addItemSelectedList: [],
      /* #### [E]상품정보 #### */
      isLogin: false, // 로그인 여부
      pitemList: [],
      pitemDtl: {},
      promCouponInfo: [],
      promCardInfo: [],
      promComcoInfo: [],
      cookieMallId: CookieUtils.getMallId(),
      itmcParam: {
        itemId: this.$route.query.itemId,
        cmmSteId: "",
        itemClasfCtgId: ""
      },
      qnaParam: {
        itemId: this.$route.query.itemId,
        cmmSteId: "",
        storId: this.$route.query.storId,
        supplFirmCd: this.$route.query.supplFirmCd
      },
      optionalItemView: false,
      reviewPhotoList: [],
      reviewPhotoKey: 0,
      bitemList: [],
      ssevntList: [],
      rcItemList: [],
      bigSaleInfo: {},
      foiInfo: {},
      cartParams: {},
      isDebug: true,
      routeParams: {
        itemId: this.$route.query.itemId,
        mallId: this.$route.query.mallId,
        storId: this.$route.query.storId,
        supplFirmCd: this.$route.query.supplFirmCd
      },
      cookieParams: {
        storId: '',
        supplFirmCd: '',
        mallId: '',
        dspScrSpCd: '',
        custGrdCd: '',
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
    number2Kor(num, type, delimChar) {
      const baseNames = ["천", "백", "십", ""];
      const levelNames = ["", "만", "억", "조",
                        "경", "해", "자", "양",
                        "구", "간", "정", "재",
                        "극", "항하사", "아승기", "나유타",
                        "불가사의", "무량대수"];
      type = type || "HALF";
      delimChar = delimChar || "";
      const decimal = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
      let level = parseInt(num.length / baseNames.length);
      let start = 0;
      let end = num.length % baseNames.length; // 0, 1, 2, 3
      /* start validation */
      if ( num.length > 69 ) {
        console.log("too long number : " + num);
        return num;
      }
      if ( isNaN(num) ) {
        console.log("not a number form : " + num);
        return num;
      }
      if ( ! isFinite(num) ) {
        console.log("not finite : " + num);
        return num;
      }
      /* end validation */
      if ( end == 0) { // in case the length of num is => 0, 4, 8, 12, ...
        end = Math.min(num.length, baseNames.length);
        level --;
      } else {
        for ( let k = 0; k < baseNames.length-end; k++) {
          num = "0" + num;
        }
        end = baseNames.length;
      }
      let toKorString = "";
      while ( start < num.length ) {
        // console.log("start.end :: "+start+" : "+end);
        const partial = num.substring(start, end);
        // console.log("partial :: "+partial);
        const unitStr = "";
        // partial.each( fns[type] );
        let b = 0;
        for (let a = 0; a < partial.length; a++) {
          b = a + 1;
          const nv = partial.substring(a, b);
          if (type === "LOW") { // 단위만 붙임 (23003 => 2만 3003 )
            if ( nv !== "0") {
              unitStr += nv;
            } else if ( nv === "0" && unitStr.length > 0 ) {
              unitStr += nv;
            }
          }
          if (type === "HALF") { // 숫자만 한글로 변환 ( 23003 => 2만 3천 3)
            if ( nv !== "0") {
              unitStr += nv + baseNames[a];
            }
          }
          if (type === "HIGH") { // 숫자와 모든 단위를 전부 한글로 변환 ( 23003 => 이만 삼천 삼)
            if ( nv !== "0") {
              unitStr += decimal [parseInt(nv)] + baseNames[a];
            }
          }
        }
        if ( unitStr.length > 0 ) {
          toKorString += unitStr + levelNames[level] + delimChar;
        }
        level --;
        start = end;
        end += baseNames.length;
      }
      return toKorString;
    }
  },
  methods: {
    // toggle
    activeToggle(el) {
      this.accordionEvent();
      this.toggle[el] = !(this.toggle[el] != false);
      if (!event.currentTarget.classList.contains('detail-view-toggle-heading')) {
        this.tabInitTop();
      }
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
      if (type === 'popupCertification' && event.currentTarget.classList.contains('dali-item-link')) {
        const list = document.querySelector('.certification-component');
        const buttons = list.querySelectorAll('.dali-item-link');
        const eventTarget = event.currentTarget;
        const activeClass = 'active';
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove(activeClass);
          buttons[i].removeAttribute(activeClass);
        }
        eventTarget.classList.add(activeClass);
      }
      // 상품이미지
      if (type == "popupImage" && event.target.id == "itemImage") {
        this.itemInfo.zoomItemImage = event.target.dataset.zoomImgSrc;
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
    tabFocusRemove(popupName) { // 팝업 닫기 버튼 탭 이동 시 팝업 닫기
      if (!event.shiftKey) { // shift + tab 시 동작 안하기
        event.preventDefault();
        this.popupAction(popupName); // 팝업 닫기 함수 호출
      }
    },
    /* ### [S]상품정보 조회 ### */
    getItemInfo: async function() {
      try {
        const result = await ApiUtils.get(
          '/fo/md/iteminfomgnt/base-item-info', this.params
        );
        if (result.data.data != null) {
          this.itemInfo.item = result.data.data; // 상품 Data
          this.itemInfo.itemImg = result.data.data.itemImgInfoInqList; // 상품 이미지 Data
          this.itemInfo.ntfcAtcInfo = result.data.data.itemNtfcAtcInfoInqList; // 상품고시품목정보 Data
          this.itemInfo.attrInfo = result.data.data.itemAttrInfoInqList; // 상품속성 Data
          this.itemInfo.mdNoti = result.data.data.mdNotiInfoInqList; // 업체[MD] 공지

          /* 할인정보 */
          this.itemInfo.dcSateInfo.sellAmt = result.data.data.sellAmt;
          this.itemInfo.dcSateInfo.bfrSellAmt = result.data.data.bfrSellAmt;
          this.itemInfo.dcSateInfo.mbsDcAmt = result.data.data.mbsDcAmt;
          this.itemInfo.dcSateInfo.mbsDcrt = result.data.data.mbsDcrt;
          this.itemInfo.dcSateInfo.cpnAplAmt = result.data.data.cpnAplAmt;
          this.itemInfo.dcSateInfo.itemDcrt = result.data.data.itemDcrt;
          this.itemInfo.dcSateInfo.cpnAplAmt = result.data.data.cpnAplAmt;
          this.itemInfo.dcSateInfo.cpnDcrt = result.data.data.cpnDcrt;

          /* 기타 추가정보 세팅 */
          this.itmcParam.itemClasfCtgId = result.data.data.itemClasfCtgId;

          if (this.itemInfo.item.errMsg != '') {
            this.$gsdialog.alert(this.itemInfo.item.errMsg + "[getItemInfo]").then(dialog => {
              if (this.isDebug) {
                console.error("Data : ", this.itemInfo.item);
                console.error("Parameter : ", this.params);
              }
            });
          }
        } else {
          this.$gsdialog.alert('상품정보가 없습니다.').then(dialog => {
            if (this.isDebug) {
              console.error('상품정보가 없습니다.[getItemInfo]');
              console.error("Data : ", this.itemInfo.item);
              console.error("Parameter : ", this.params);
            }
          });
        }
      } catch (e) {
        this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.error(e);
        });
      }
    },
    /* ### [E]상품정보 조회 ### */
    popupDetailAction(pitem, rSeq) {
      console.log("pitem :: "+pitem.itemId);
      console.log("rSeq :: "+rSeq);
      this.pitemDtl = pitem;
      this.pitemDtl.rSeq = rSeq;
    },
    selPkgItemAction(pitem) {
      console.log("selPkgItemAction itemTestVal :: ", pitem);
      const params = {
        itemData: pitem
      };
      this.$store.commit('setItemSelected', params);
      this.$refs.optionArea.setOrder('C');
      // // this.itemSelected = pitem;
      // this.setOrder('C');
      console.log("selPkgItemAction pitem :: "+pitem.itemId);
    },
    promoListAction: async function(type) {
      console.log("promoListAction :: "+type);
      const params = {
        itemId: this.$route.query.itemId,
        mallId: this.cookieMallId,
        storId: this.$route.query.storId,
        supplFirmCd: this.$route.query.supplFirmCd,
        sellAmt: this.itemInfo.item.sellAmt
      };
      let apiUrl = "";
      if (type === 'coupon') apiUrl = "/fo/md/itemaddinfomgnt/item-apply-coupon-list";
      if (type === 'card') apiUrl = "/fo/md/itemaddinfomgnt/item-card-promotion-list";
      if (type === 'comco') apiUrl = "/fo/md/itemaddinfomgnt/item-comco-promotion-list";

      // 프로모션목록
      const vm = this;
        try {
          const result = await ApiUtils.get(
            apiUrl,
            params
          );
          const respPromList = result.data;
          const promList = respPromList.data;
          if (type === 'coupon') this.promCouponInfo = promList;
          if (type === 'card') this.promCardInfo = promList;
          if (type === 'comco') this.promComcoInfo = promList;
          // vm.$gsdialog.alert(JSON.stringify(result2));
        } catch (e) {
          vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
            console.log(e);
          });
        }
    },
    photoSetAction(ctns, key) {
      this.reviewPhotoList = ctns;
      this.reviewPhotoKey = key;
    },
    linkSsevntAction(ssevnt) {
      console.log("ssevnt.ssevntId :: "+ssevnt.ssevntId);
      // this.$router.push('/dp/ssevnt_link?ssevntId=' + ssevnt.ssevntId + '&ssevntTimes=' + ssevnt.ssevntTimes + '&ssevntClasfCd=' + ssevnt.ssevntClasfCd);
      this.$router.push('/dp/ssevnt_detail?ssevntId=' + ssevnt.ssevntId);
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    goCart(itemValue) { // 장바구니 외부호출 샘플
      console.log("goCart :: "+itemValue.itemId);
      this.cartParams.itemId = itemValue.itemId;
      this.cartParams.storId = itemValue.storId;
      this.cartParams.supplFirmCd = itemValue.supplFirmCd;
      this.popupAction('popupOption');
      this.$refs.optionAreaDp.getOrder(this.cartParams);
    },
    getCookieMap() {
        const custGrdCdYn = CookieUtils.getCookie('CUST_GRD_CD') != '';
        return {
            storId: CookieUtils.getCookie('STOR_ID'),
            supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
            mallId: CookieUtils.getCookie('MALL_ID'),
            dspScrSpCd: CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD'),
            custGrdCd: custGrdCdYn ? CookieUtils.getCookie('CUST_GRD_CD') : '04',
        };
    },
    inqrTotCntIncAction() {
      console.log("inqrTotCntIncAction :: ");
      this.itemInfo.item.inqrCnt++;
    },
  },
  // 4월 수정 : 슬라이드 수정
  computed: {
    swiper() {
      return this.$refs.subDetailSwiper.swiper;
    },
    fromOptionPriceDisp() {
      let fromOptionPriceDisp = '';
      if (this.optionalItemView) {
        fromOptionPriceDisp = '~';
      }
      return fromOptionPriceDisp;
    }
  },
  beforeCreate: function () {
    this.$options.components.PopupOptionArea = require('./OptionArea.vue').default;
  },
  created: async function() {
    const vm = this;

    const paramItemId = vm.$route.query.itemId;
    const paramMallId = vm.cookieMallId;
    const paramStorId = vm.$route.query.storId;
    const paramSupplFirmCd = vm.$route.query.supplFirmCd;

    vm.itmcParam.itemId = paramItemId;
    vm.qnaParam.itemId = paramItemId;

    vm.getItemInfo();

    vm.promoListAction('coupon'); // 추가혜택가(쿠폰)
    vm.promoListAction('card'); // 카드할인
    vm.promoListAction('comco'); // 통신사 최대할인
  },
  mounted: async function() {
    const $this = this;
    $this.tabInitTop();
    window.addEventListener('scroll', function(e) {
      const scrollPosition = window.pageYOffset;
      $this.tabScrollAction(scrollPosition);
    });
    // 4월 수정 : 슬라이드 수정
    // this.slideNextPrevButton('subDetailSwiper', true);
    console.log("mounted start :: ");
    const vm = this;

    await LoginUtils.nonLoginPromise().then(function (response) {
      const cookie = vm.getCookieMap();
      // alert(JSON.stringify(cookie));

      console.log('매장 ID storId', CookieUtils.getCookie('STOR_ID'));
      console.log('공급업체코드 supplFirmCd', CookieUtils.getCookie('SUPPL_FIRM_CD'));
      console.log('접속몰 mallId', CookieUtils.getCookie('MALL_ID'));
      console.log('사이트접속매체유형코드 steConnMdaTypeCd', CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD'));

      // storIdCookie = CookieUtils.getCookie('STOR_ID');
      // supplFirmCdCookie = CookieUtils.getCookie('SUPPL_FIRM_CD');
      // mallIdCookie = CookieUtils.getCookie('MALL_ID');
      // steConnMdaTypeCdCookie = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');
      // vm.cookieParams.storId = storIdCookie;
      // vm.cookieParams.supplFirmCd = supplFirmCdCookie;
      // vm.cookieParams.mallId = mallIdCookie;
      // vm.cookieParams.steConnMdaTypeCd = steConnMdaTypeCdCookie;

      vm.cookieParams.storId = cookie.storId;
      vm.cookieParams.supplFirmCd = cookie.supplFirmCd;
      vm.cookieParams.mallId = cookie.mallId;
      vm.cookieParams.dspScrSpCd = cookie.dspScrSpCd;
      vm.cookieParams.custGrdCd = cookie.custGrdCd;
    });

    setTimeout(fn, 1000);
    // eslint-disable-next-line require-jsdoc
    async function fn() {
      // let storIdCookie = "";
      // let supplFirmCdCookie = "";
      // let mallIdCookie = "";
      // let steConnMdaTypeCdCookie = "";

      // 에러 메시지가 없을 경우만 실행 한다.
      console.log("|"+vm.itemInfo.item.errMsg+"|");
      if (vm.itemInfo.item.errMsg == "") {
        vm.$refs.optionArea.getOrder(vm.params);
      }
      // 프로모션 조회
      // vm.promoListAction('coupon'); // 추가혜택가(쿠폰)
      // vm.promoListAction('card'); // 카드할인
      // vm.promoListAction('comco'); // 통신사 최대할인

      // 무이자할부정보 조회
      try {
        const foiParams = {
          dspConrId: '1007',
          cmmSteId: '1',
        };
        const result = await ApiUtils.get(
          '/dp/fr/displaymgnt/display-comm-banner-info',
          {...foiParams, ...vm.cookieParams}
        );
        const respFoiInfo = result.data.data;
        if (respFoiInfo.rdspCommConrInfo != null) {
          vm.foiInfo = respFoiInfo.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0].rdspCommConrCntInfo[0];
        }

        // vm.$gsdialog.alert(JSON.stringify(result));
      } catch (e) {
        vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }

      // 상품정보 조회
      const params = {
        itemId: vm.$route.query.itemId,
        storId: vm.$route.query.storId,
        supplFirmCd: vm.$route.query.supplFirmCd,
        mallId: vm.cookieParams.mallId,
      };
      // 선택형상품조회
      console.log("itemCompoCd :: "+vm.itemInfo.item.itemCompoCd);
      if (vm.itemInfo.item.itemCompoCd == '03') {
        try {
          const result = await ApiUtils.get(
            '/fo/md/iteminfomgnt/optional-item-list',
            params
            // {...params, ...vm.cookieParams}
          );
          const respPitemList = result.data;
          const pitemList = respPitemList["data"];
          vm.pitemList = pitemList;
          console.log("pitemList.length :: "+pitemList.length);
          if (pitemList.length > 0) {
            vm.optionalItemView = true;
          }
          // console.log("vm.pitemList :: "+vm.pitemList[0].itemId);
          // vm.$gsdialog.alert(JSON.stringify(result));
        } catch (e) {
          vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
            console.log(e);
          });
        }
      }
      // 관련기획전 조회
      try {
        const ssParams = {
          itemId: vm.$route.query.itemId,
          // storId: vm.$route.query.storId,
          // mallId: vm.cookieMallId,
          // ssevntClasfCd: '02',
          // fieldsYn: 'N',
          // limit: '2'
        };
        console.log("CookieUtils.getMallId() :: "+vm.cookieMallId);
        const result = await ApiUtils.get(
          // '/fo/md/itemaddinfomgnt/related-ssevnt-list',
          '/dp/fr/ssevntmgnt/related-ssevnt-list',
          {...ssParams, ...vm.cookieParams}
        );
        const respSsevntList = result.data;
        const ssevntList = respSsevntList["data"];
        vm.ssevntList = ssevntList;
        console.log("ssevntList.length :: "+ssevntList.length);
        // vm.$gsdialog.alert(JSON.stringify(result));
      } catch (e) {
        vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
      // 위대한 빅세일 조회
      try {
        const bSaleParams = {
          ssevntTypeCd: '01',
          ssevntClasfCd: '02',
          fieldsYn: 'N',
          itemLen: '5'
        };
        const result = await ApiUtils.get(
          '/dp/fr/ssevntmgnt/ssevent-detail',
          {...bSaleParams, ...vm.cookieParams}
        );
        const respBsaleInfo = result.data;
        const bsaleInfo = respBsaleInfo["data"];
        vm.bigSaleInfo = bsaleInfo;
        console.log("bigSaleInfo :: ", bsaleInfo);
        // vm.$gsdialog.alert(JSON.stringify(result));
      } catch (e) {
        vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
      // 추천상품 조회
      try {
        const rcParams = {
          itemId: vm.$route.query.itemId,
          storId: vm.$route.query.storId,
          supplFirmCd: vm.$route.query.supplFirmCd,
          mallId: vm.cookieMallId,
          limit: 15
        };
        const result = await ApiUtils.get(
          '/fo/md/iteminfomgnt/purch-rcmd-item-list',
          rcParams
        );
        const respRcItemList = result.data;
        const rcItemList = respRcItemList["data"];
        vm.rcItemList = rcItemList;
        console.log("rcItemList.length :: "+vm.rcItemList.length);
        // vm.$gsdialog.alert(JSON.stringify(result));
      } catch (e) {
        vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }

      try {
        // localStorage.clear();
        const showSize = 5; // 조회상품노출갯수
        if (!LoginUtils.isLogin()) {
          console.log("bef login : ");
          const localStorageNm = "mbrInqItemList";
          let dspCtgId = "";
          if (vm.$route.query.dspCtgId != undefined) {
            dspCtgId = vm.$route.query.dspCtgId;
          }
          let promId = "";
          if (vm.$route.query.promId != undefined) {
            promId = vm.$route.query.promId;
          }
          let itemCtnsFileNm = "";
          if (vm.itemInfo.itemImg != null) {
            if (vm.itemInfo.itemImg.length > 0) {
               itemCtnsFileNm = vm.itemInfo.itemImg[0].itemCtnsFileNm;
            }
          }
          const newItem = {
            rowSeq: 0,
            itemId: vm.$route.query.itemId,
            itemNm: vm.itemInfo.item.itemNm,
            itemCtnsFileNm: itemCtnsFileNm,
            itemImg: itemCtnsFileNm,
            newYn: 'N',
            bfrSellAmt: vm.itemInfo.item.bfrSellAmt,
            sellAmt: vm.itemInfo.item.sellAmt,
            mallId: vm.cookieMallId,
            storId: vm.$route.query.storId,
            supplFirmCd: vm.$route.query.supplFirmCd,
            itemCd: vm.itemInfo.item.itemCd,
            dspCtgId: dspCtgId,
            promId: promId,
            delivDt: vm.itemInfo.item.itemStkotInstBeginD
          };
          let storeItems = JSON.parse(localStorage.getItem(localStorageNm));
          console.log("storeItems is : "+storeItems);
          if (storeItems === null) {
            storeItems = [];
          } else {
            console.log("storeItems.length : "+storeItems.length);
            let j = 0;
            for (let i=0; i < storeItems.length; i++) {
              j++;
              console.log("for i : "+i);
              storeItems[i].rowSeq = j;
              if (storeItems[i].itemId === newItem.itemId) {
                console.log("duplicate itemId!! : "+newItem.itemId);
                storeItems.splice(i, 1);
              }
            }
            if (storeItems.length >= showSize) {
              storeItems.splice(showSize-1, 10);
            }
          }
          storeItems.unshift(newItem);

          localStorage.setItem(localStorageNm, JSON.stringify(storeItems));

          // 조회 테스트
          const storeNewItems = JSON.parse(localStorage.getItem(localStorageNm));
          vm.storeNewItems = storeNewItems;
          console.log("storeNewItems is : ", storeNewItems);
          console.log("storeNewItems.itemId is : "+storeNewItems[0].itemId);
        } else { // 로그인 후
          console.log("aft login : ");
          // 회원조회상품등록(최근본상품)
          const params = {
            itemId: vm.$route.query.itemId,
            mallId: vm.cookieMallId,
            fstRegUserId: 'nhs2019'
          };
          try {
            const response = await ApiUtils.post(
              '/fo/md/itemaddinfomgnt/mbr-inquire-item', params
            );
            console.log("mbr-inquire-item response.data :: "+response.data.success);
          } catch (e) {
              vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
              console.error(e);
            });
          }
        }
      } catch (e) {
        console.log(e);
          // vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          //   console.log(e);
          // });
      }
    }
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
  /* 4월수정 START : 이벤트 리스너 제거 */
  destroyed() {
    window.removeEventListener('scroll', this);
  },
  /* 4월수정 END : 이벤트 리스너 제거 */
};
</script>
