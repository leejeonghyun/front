<!--
Design: views\ss\SC-FO-SS-GF-MS-805.vue
Pg id: PG-FO-CS-O007
Uri: /cs/orddeliv/ord_deliv_dtl
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]">
    <SubDefaultHeader headerText="주문상세" :prevType="true" :tabbar="false" />
    <main id="main" tabindex="0">
      <section class="mypage">
        <!--========================================================================
        주문기본정보
        ========================================================================-->
        <section class="wrap-breakdown">
          <dl class="detail-breakdown order-top">
            <dt>주문 번호</dt>
            <dd>{{ ordInfo.ordId }}</dd>
            <dt>주문 일자</dt>
            <dd>{{ ordInfo.ordDt }}({{ ordInfo.ordDay }}) {{ ordInfo.ordTm }}</dd>
          </dl>
        </section>
        <!--========================================================================
        배송유형목록
        ========================================================================-->
        <section class="cart-category-product" v-for="(delivTypeRow, delivTypeRowIndex) in delivTypeList" :key="delivTypeRow.orgDelivId+'_'+delivTypeRowIndex">
          <div class="wrap-category-content">
            <h3 class="title-cate">
              <span class="inp-chk bg">
                <input type="checkbox"
                  :name="'delvItem_chk_' + delivTypeRow.orgDelivTypeCd"
                    :id="'delvItem_chk_' + delivTypeRow.orgDelivTypeCd"
                  v-model="delivTypeRow.orgDelivTypeChk"
                  @change="delivCheck(delivTypeRow)"/>
                <label :for="'delvItem_chk_' + delivTypeRow.orgDelivTypeCd">
                  {{ delivTypeRow.delivTypeNm }}({{ delivTypeRow.itemCnt }})
                </label>
              </span>
            </h3>
            <!--
            상품유형, 프로모션 등 정의가 되면 유형별로 분류
            import MyOrderDetails from '@/components/mypage/MyOrderDetails'; //  개발용 실사용 컴포넌트 - 상품 목록
            import MyOrderNoSimplyCook from '@/components/mypage/MyOrderNoSimplyCook'; // 개발용 실사용 컴포넌트 - 상품 목록 심플리쿡 없는 경우
            import MyfirstBenefit from '@/components/mypage/MyfirstBenefit'; //  개발용 실사용 컴포넌트 - 맛보기 or 첫구매
            -->
            <div class="list-content">
              <ul class="cart-product-list">
                <!--====================================
                메인상품목록
                ====================================-->
                <template v-for="itemRow in delivTypeRow.ordItemList">
                  <!-- <template v-for="itemRow in delivTypeRow.itemList"> -->
                  <li :key="itemRow.ordId + '_' + itemRow.ordDtlSeqno + '_' + itemRow.ordItemSeqno" :class="{ plus: isNotEmpty(itemRow.nplusOneVal) }">
                    <dl>
                      <!--====================================
                      체크박스, 상품명, 합배송여부
                      ====================================-->
                      <dt>
                        <span class="inp-chk">
                          <input type="checkbox"
                            :name="'delvItem_chk_' + delivTypeRow.orgDelivTypeCd + '_' + itemRow.itemKey"
                              :id="'delvItem_chk_' + delivTypeRow.orgDelivTypeCd + '_' + itemRow.itemKey"
                            v-model="itemRow.orgItemChk" @change="itemCheck(delivTypeRow, itemRow)" :disabled="itemRow.sampleItemYn === 'Y'"/>
                          <label :for="'delvItem_chk_' + delivTypeRow.orgDelivTypeCd + '_' + itemRow.itemKey">{{ itemRow.itemNm }}</label>
                          <!-- <i class="plus-badge" v-if="itemRow.uniDelivOrdYn == 'Y'">합배송</i> 합배송딱지 -->
                          <span class="delivery-name" v-if="delivTypeRow.orgDelivTypeCd == 'AA' && isReserveMultiDeliv">{{itemRow.dlvpNm}}</span><!--예약인 경우 다중배송시배송지-->
                        </span>
                      </dt>
                      <!--====================================
                      상품이미지 표시
                      ====================================-->
                      <dd class="thumb">
                        <template v-if="itemRow.fpurchItemYn !== 'Y' && itemRow.sampleItemYn !== 'Y' && itemRow.presItemYn !== 'Y'">
                          <a href="javascript:void(0);" @click="goItemDetail(itemRow.itemId, itemRow.storId, itemRow.supplFirmCd, itemRow.ctgMallId);">
                          <figure>
                            <!-- <span v-if="itemRow.presItemYn == 'Y'" aria-label="혜택" class="ico-benefit gift">증정</span> 상품단위증정프로모션여부 -->
                            <span v-if="isNotEmpty(itemRow.nplusOneVal)" aria-label="혜택" class="ico-benefit">{{ itemRow.nplusOneVal }}+1</span> <!-- N+1딱지 -->
                            <img :src="getItemImg(itemRow.itemImg)" :alt="itemRow.itemNm" @error="replaceByDefault" v-if="isNotEmpty(itemRow.itemImg)"/>
                            <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="itemRow.itemNm" v-else/>
                          </figure>
                          </a>
                        </template>
                        <template v-else>
                          <!-- 사은품 상세페이지 없음 -->
                          <figure>
                            <!-- <span v-if="itemRow.presItemYn == 'Y'" aria-label="혜택" class="ico-benefit gift">증정</span> 상품단위증정프로모션여부 -->
                            <span v-if="isNotEmpty(itemRow.nplusOneVal)" aria-label="혜택" class="ico-benefit">{{ itemRow.nplusOneVal }}+1</span> <!-- N+1딱지 -->
                            <img :src="getItemImg(itemRow.itemImg)" :alt="itemRow.itemNm" @error="replaceByDefault" v-if="isNotEmpty(itemRow.itemImg)"/>
                            <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="itemRow.itemNm" v-else/>
                          </figure>
                        </template>
                      </dd>
                      <!--====================================
                      증정, 프로모션 표시(첫구매, 맛보기)
                      ====================================-->
                      <dd class="gift" v-if="itemRow.fpurchItemYn === 'Y' || itemRow.sampleItemYn === 'Y' || itemRow.presItemYn == 'Y'"><!--첫구매(O), 맛보기(O)-->
                        <p class="point" v-if="itemRow.fpurchItemYn === 'Y'">첫 구매 혜택 사은품</p>
                        <p class="point" v-else-if="itemRow.presItemYn === 'Y'">구매 금액대별 사은품</p>
                        <p class="point" v-else>맛보기 사은품</p>
                      </dd>
                      <!--====================================
                      배송, 옵션 표시
                      ====================================-->
                      <dd class="option" v-if="delivTypeRow.spckItemIncldYn != 'Y' && itemRow.fpurchItemYn != 'Y' && itemRow.sampleItemYn != 'Y' && itemRow.presItemYn != 'Y'"><!--심플리국(X), 첫구매(X), 맛보기(X)-->
                        <p class="option-info" v-if="delivTypeRow.orgDelivTypeCd == 'AA'">{{ itemRow.delivStatDesc }}</p><!--예약배송(O) 표시-->
                        <p class="option-info">{{ itemRow.optVal }}</p>
                      </dd>
                      <!--====================================
                      클레임 건수 표시
                      ====================================-->
                      <dd class="return" v-if="itemRow.fpurchItemYn != 'Y' && itemRow.sampleItemYn != 'Y' && itemRow.presItemYn != 'Y'"><!--첫구매(X), 맛보기(X)-->
                        <span class="point" v-html="replaceClaimCntNm(itemRow.claimCntNm)"></span>
                      </dd>
                      <!--====================================
                      수량 표시
                      ====================================-->
                      <dd class="count">
                        <p class="option-info">수량 {{ comma(itemRow.ordQty) }}</p>
                      </dd>
                      <!--====================================
                      몰 표시
                      ====================================-->
                      <dd class="shop">{{ itemRow.mallNm }}</dd>
                      <!--====================================
                      정상가격 표시
                      ====================================-->
                      <dd class="list-price" aria-label="정상가격" v-if="(itemRow.itemDcYn == 'Y' || itemRow.dcYn == 'Y') && (itemRow.fpurchItemYn != 'Y' && itemRow.sampleItemYn != 'Y' && itemRow.presItemYn != 'Y')"><!--할인되었거나 (첫구매도 아니고 맛보기도 아닌경우)-->
                        <del>{{ comma(itemRow.bfrSalesAmt) }}</del>원
                      </dd>
                      <!--====================================
                      판매가격 표시
                      ====================================-->
                      <dd class="sale-price" aria-label="판매가격" v-if="itemRow.sampleItemYn != 'Y' && itemRow.presItemYn != 'Y'">
                        <span class="number-sale-price">{{ comma(itemRow.salesAmt) }}</span>
                        <span class="unit-won">원</span>
                      </dd>
                    </dl>
                    <!--====================================
                    하위상품목록
                    ====================================-->
                    <template v-if="itemRow.subItemList != null && itemRow.subItemList.length > 0">
                      <div v-for="(subItemRow, index) in itemRow.subItemList" :key="'simplyDiv_' + delivTypeRow.orgDelivTypeCd + '_' + itemRow.itemKey + '_' + index" class="option-list include-img simply">
                        <div class="wrap-opt">
                          <a href="javascript:void(0);" @click="goItemDetail(subItemRow.itemId, subItemRow.storId, subItemRow.supplFirmCd, subItemRow.ctgMallId);">
                              <figure>
                                <span v-if="subItemRow.presItemYn == 'Y'" aria-label="혜택" class="ico-benefit gift">증정</span>
                                <img :src="getItemImg(subItemRow.itemImg)" :alt="subItemRow.itemNm" @error="replaceByDefault" v-if="isNotEmpty(subItemRow.itemImg)"/>
                                <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="subItemRow.itemNm" v-else/>
                            </figure>
                          </a>
                          <dl>
                            <dt>
                              <p class="tit">{{ subItemRow.itemNm }}</p>
                            </dt>
                            <dd class="option-number txt">수량 {{ comma(subItemRow.ordQty) }}</dd>
                            <dd v-if="subItemRow.presItemYn != 'Y' && isEmpty(subItemRow.grpItemId)" class="sale-price">
                              <span class="number-sale-price" aria-label="판매가격">{{ comma(subItemRow.ordAmt) }}</span>
                              <span class="unit-won">원</span>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </template>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </section>
        <!--========================================================================
        선택담기
        ========================================================================-->
        <div class="cart-all">
          <button type="button" class="btn-lg btn-bg darkgray" @click="setOrdItemOptPut">
            <span>선택 상품 담기</span>
          </button>
        </div>
        <!--========================================================================
        결제정보
        ========================================================================-->
        <section class="mypage">
          <div class="total-payment order-payment">
            <div class="sub-title">
              <h3>결제정보</h3>
            </div>
            <ul class="accordion-payment">
              <li>
                <div class="tit-accordion">
                  총 상품금액
                  <span class="price"><strong>{{ comma(tdrInfo.totItemSellAmt) }}</strong>원</span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  총 할인금액
                  <span class="price red"><strong>-{{ comma(tdrInfo.totDcAmt) }}</strong>원</span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  총 배송비
                  <span class="price"><strong>{{ comma(tdrInfo.totDelivAmt) }}</strong>원</span>
                </div>
                <ul class="shipping-content">
                  <template v-for="(dlfeeRow, dlfeeIndex) in dlfeeList" >
                  <li :key="dlfeeRow.delivTypeNm + '_' + dlfeeIndex" v-if="parseInt(dlfeeRow.bsktDlfee) > 0 || parseInt(dlfeeRow.itemDlfee) > 0">
                    {{ dlfeeRow.delivTypeNm }} <span class="price"><strong>{{ comma(dlfeeRow.bsktDlfee) }}</strong>원</span>
                    <ul class="shipping-inner-list">
                      <li>
                        상품배송비<span class="price"><strong>{{ comma(dlfeeRow.itemDlfee) }}</strong>원</span>
                      </li>
                    </ul>
                  </li>
                  </template>
                </ul>
              </li>
              <li v-if="isNotEmpty(tdrInfo.totAddDelivAmt) && parseInt(tdrInfo.totAddDelivAmt) > 0">
                <div class="tit-accordion">
                  추가 배송비
                  <span class="price"><strong>{{ comma(tdrInfo.totAddDelivAmt) }}</strong>원</span>
                </div>
                <ul class="shipping-content">
                  <template v-for="(dlfeeRow, dlfeeIndex) in dlfeeList" >
                  <li :key="dlfeeRow.delivTypeNm + '_' + dlfeeIndex">
                    {{ dlfeeRow.delivTypeNm }} <span class="price"><strong>{{ comma(dlfeeRow.addDlfee) }}</strong>원</span>
                  </li>
                  </template>
                </ul>
              </li>
            </ul>
          </div>
          <div class="sub-title send-total-price line-b">
            <h2>
              최종결제금액
              <span class="price"><strong>{{ comma(tdrInfo.totLastTdrAmt) }}</strong>원</span>
            </h2>
            <!--========================================================================
            결제수단
            ========================================================================-->
            <section class="box-payment-type">
              <div class="wrap-heading">
                <h3>결제수단</h3>
              </div>
              <ul class="method-list">
                <template v-for="(tdrMeansRow, tdrMeansRowIndex) in tdrMeansList">
                  <li :key="tdrMeansRowIndex" :class="{ 'credit-card': tdrMeansRow.tdrMeansCd !== '06' && tdrMeansRow.tdrMeansCd !== '18' }">
                    {{ tdrMeansRow.grpNm }}<!--<i class="plus-badge" v-if="tdrMeansRow.uniDelivOrdYn == 'Y'">합배송</i>-->
                    <span class="sum">{{ comma(tdrMeansRow.tdrAmt) }}{{ tdrMeansRow.grpUnitNm }}</span>
                    <button v-if="tdrMeansList.tdrAmt > 0" type="button" class="btn-border btn-small bill" aria-label="전자영수증 팝업활성화" aria-haspopup="dialog" @click="popupAction('popupMobileBill')">전자영수증</button>
                  </li>
                </template>
              </ul>
              <PopupMobileBill @popupEvent="popupAction" v-if="this.popup.popupMobileBill" /> <!-- 팝업 - 전자 영수증 -->
            </section>
            <p class="txt-point">
              배송 완료 후, GS&amp;POINT적립
              <span class="point">{{ comma(tdrInfo.pntSavgSchedAmt) }}P</span>
            </p>
            <p class="txt-point">
              쿠폰 지급
              <span class="point">({{ comma(tdrInfo.prvdCpn) }})</span>
            </p>
            <!-- [8/13 정남훈]   정호균k 문의 결과 매장별 이벤트인  스탬프 표기로   고객 응대가 증가할 수 있어, 해당 영역 HIDE 하기로 함.  -->
            <!-- <p class="txt-point" v-if="tdrInfo.prvdStmp > 0">
              배송 완료 후, 스탬프 지급
              <span class="point">{{ comma(tdrInfo.prvdStmp) }}개</span>
            </p> -->
          </div>
        </section>
        <!--========================================================================
        결제변경이력
        ========================================================================-->
        <template v-if="ordTdrSateList != null && ordTdrSateList.length > 1">
        <section class="section wrap-breakdown">
          <div class="wrap-heading">
            <h3>결제변경이력</h3>
          </div>
          <div class="change-list" v-for="(tdrGrpRow, tdrGrpIdx) in ordTdrSateList" :key="'tdrGrpRow' + '_' + tdrGrpIdx">
            <div class="date-line">
              <strong class="date">{{ tdrGrpRow.procDtNm }}</strong>
            </div>
            <div class="amount-line" v-for="(tdrTypeRow, tdrTypeIdx) in tdrGrpRow.typeList" :key="'tdrTypeRow' + '_' + tdrGrpIdx + '_' + tdrTypeIdx">
              <p class="amount-section">
                <span class="state">{{ tdrTypeRow.tdrTypeNm }}</span>
                <a href="javascript:void(0);" class="link-details" @click="goClaimDetail(tdrTypeRow);"
                  v-if="tdrTypeRow.ordClaimSpCd == 'C' || tdrTypeRow.ordClaimSpCd == 'R'">상세내역</a>
              </p>
              <template v-for="(tdrRow, tdrIdx) in tdrTypeRow.tdrList">
                <span class="card" :key="'tdrRow' + '_' + tdrGrpIdx + '_' + tdrTypeIdx + '_' + tdrIdx">
                  {{ tdrRow.tdrMeansDtlNm }} <strong>{{ tdrRow.dealAmtNm }}</strong>
                </span>
                </template>
            </div>
          </div>
        </section>
        </template>
        <!--========================================================================
        배송지 정보
        ========================================================================-->
        <section v-if="ordInfo.giftOrd == 'N' || (ordInfo.giftOrd == 'Y' && ordInfo.giftAcptYn == 'Y')" class="section wrap-breakdown">
          <h3>배송지 정보</h3>
          <ul class="wrap-info-list">
            <template v-for="delivPositRow in delivPositInfoList">
            <li :key="delivPositRow.mbrDlvpSeqno">
              <p class="list-title wb-a">배송지 <template v-if="delivPositRow.dlvpNm">({{ delivPositRow.dlvpNm }})</template></p>
                <dl class="detail-breakdown">
                  <dt>받는 분</dt>
                  <dd>{{ delivPositRow.adrsNm }}</dd>
                  <dt>주소</dt>
                  <dd>{{ delivPositRow.adrsBaseAddr }} {{ delivPositRow.adrsDtlAddr }}</dd>
                  <dt>연락처</dt>
                  <dd>{{ delivPositRow.adrsTelNo }}</dd>
                </dl>
            </li>
            </template>
          </ul>
        </section>
        <!--========================================================================
        배송유형별 배송상태정보
        ========================================================================-->
        <template v-if="ordInfo.giftOrd == 'N' || (ordInfo.giftOrd == 'Y' && ordInfo.giftAcptYn == 'Y')">
          <template v-for="(devTypeRow, devTypeIdex) in devTypeItemList">
              <!--===================================
              예약
              ====================================-->
              <section class="section wrap-breakdown" :key="devTypeRow.orgDelivTypeCd+'_'+devTypeIdex" v-if="devTypeRow.orgDelivTypeCd == 'RESV'">
                  <h3>{{ devTypeRow.orgDelivTypeNm }}</h3>
                  <template v-for="(mallRow, mallIdx) in devTypeRow.devTypeMallList">
                    <div class="wrap-branch-title" :key="'devMall_' + devTypeIdex + '_' + mallIdx">
                      <strong class="branch">{{ mallRow.mallNm }}</strong>
                    </div>
                    <ul class="delivery-product" :key="'devMallPro_' + devTypeIdex + '_' + mallIdx">
                      <li v-for="(itemRow, itemIdx) in mallRow.devTypeMallItemList" :key="'devMallItem_' + devTypeIdex + '_' + mallIdx + '_' + itemIdx">
                        <span class="product-name">
                          <span class="name">{{ itemRow.itemNm }}</span>
                          <template v-if="itemRow.itemCnt > 0">
                            외 <span class="point">{{ itemRow.itemCnt }}</span>개
                          </template>
                        </span>
                        <span class="delivery-info">
                          <span class="delivery-date">{{ itemRow.delivStatDesc }}</span>
                          <span class="delivery-destination">{{ itemRow.dlvpNm }}</span>
                        </span>
                      </li>
                    </ul>
                  </template>
              </section>
              <!--===================================
              당일
              ====================================-->
              <section class="section wrap-breakdown" :key="devTypeRow.orgDelivTypeCd+'_'+devTypeIdex" v-if="devTypeRow.orgDelivTypeCd == '01'">
                <h3>{{ devTypeRow.orgDelivTypeNm }}</h3>
                <template v-for="(mallRow, mallIdx) in devTypeRow.devTypeMallList">
                  <template v-for="(itemRow, itemIdx) in mallRow.devTypeMallItemList">
                    <div class="wrap-delivery-product" :key="'devMallItem_' + devTypeIdex + '_' + mallIdx + '_' + itemIdx">
                        <div class="delivery-product">
                          <p class="inner">
                            <span class="product-name">
                              <span class="name">{{ itemRow.itemNm }}</span>
                              <template v-if="itemRow.itemCnt > 0">
                                외 <span class="point">{{ itemRow.itemCnt }}</span>개
                              </template>
                            </span>
                          </p>
                        </div>
                        <dl class="detail-breakdown">
                          <dt>배송시간</dt>
                          <dd>{{ itemRow.delivStatDesc }}</dd>
                          <!-- <dt>배송기사 <br>요청메시지</dt>
                          <dd>경비실에 맡겨주세요.</dd> -->
                        </dl>
                      </div>
                  </template>
                </template>
              </section>
              <!--===================================
              새벽
              ====================================-->
              <section class="section wrap-breakdown" :key="devTypeRow.orgDelivTypeCd+'_'+devTypeIdex" v-if="devTypeRow.orgDelivTypeCd == '04'">
                <h3>{{ devTypeRow.orgDelivTypeNm }}</h3>
                <template v-for="(mallRow, mallIdx) in devTypeRow.devTypeMallList">
                  <template v-for="(itemRow, itemIdx) in mallRow.devTypeMallItemList">
                    <div class="wrap-delivery-product" :key="'devMallItem_' + devTypeIdex + '_' + mallIdx + '_' + itemIdx">
                      <div class="delivery-product">
                        <p class="inner">
                          <span class="product-name">
                            <span class="name">{{ itemRow.itemNm }}</span>
                            <template v-if="itemRow.itemCnt > 0">
                              외 <span class="point">{{ itemRow.itemCnt }}</span>개
                            </template>
                          </span>
                        </p>
                      </div>
                      <dl class="detail-breakdown">
                        <dt>배송시간</dt>
                        <dd>{{ itemRow.delivStatDesc }}</dd>
                        <!-- <dt>배송기사 <br>요청메시지</dt>
                        <dd>없음</dd> -->
                        <dt>새벽배송 <br>완료알림</dt>
                        <dd>{{ itemRow.delivInfmTmznNm }}</dd>
                      </dl>
                    </div>
                  </template>
                </template>
              </section>
              <!--===================================
              택배
              ====================================-->
              <section class="section wrap-breakdown" :key="devTypeRow.orgDelivTypeCd+'_'+devTypeIdex" v-if="devTypeRow.orgDelivTypeCd == 'DLV'">
                <h3>{{ devTypeRow.orgDelivTypeNm }}</h3>
                <template v-for="(mallRow, mallIdx) in devTypeRow.devTypeMallList">
                  <div class="wrap-branch-title" :key="'devMallItem_' + devTypeIdex + '_' + mallIdx">
                    <strong class="branch" :key="'devMall_' + devTypeIdex + '_' + mallIdx">{{ mallRow.mallNm }}</strong>
                  </div>
                  <!-- 6월수정 START : 마크업 변경 및 도착예정일 삭제 -->
                  <div class="wrap-delivery-product" v-for="(itemRow, itemIdx) in mallRow.devTypeMallItemList" :key="'devMallItem_' + devTypeIdex + '_' + mallIdx + '_' + itemIdx">
                    <div class="delivery-product">
                      <p class="inner">
                        <span class="product-name">
                          <span class="name">{{ itemRow.itemNm }}</span>
                          <template v-if="itemRow.itemCnt > 0">
                            외 <span class="point">{{ itemRow.itemCnt }}</span>개
                          </template>
                        </span>
                      </p>
                    </div>
                    <!--전국택배(자사택배)인 경우에만-->
                    <template v-if="itemRow.delivTypeCd == '02'">
                    <dl class="detail-breakdown">
                      <dt>배송시간</dt>
                      <dd>{{ itemRow.delivStatDesc }}</dd>
                    </dl>
                    </template>
                  </div>
                </template>
              </section>
              <!--===================================
              해외
              ====================================-->
              <section class="section wrap-breakdown" :key="devTypeRow.orgDelivTypeCd+'_'+devTypeIdex" v-if="devTypeRow.orgDelivTypeCd == '05'">
                <h3>{{ devTypeRow.orgDelivTypeNm }}</h3>
                <template v-for="(mallRow, mallIdx) in devTypeRow.devTypeMallList">
                  <div class="wrap-branch-title" :key="'devMallItem_' + devTypeIdex + '_' + mallIdx">
                    <strong class="branch" :key="'devMall_' + devTypeIdex + '_' + mallIdx">{{ mallRow.mallNm }}</strong>
                  </div>
                  <div class="wrap-delivery-product" v-for="(itemRow, itemIdx) in mallRow.devTypeMallItemList" :key="'devMallItem_' + devTypeIdex + '_' + mallIdx + '_' + itemIdx">
                    <div class="delivery-product">
                      <p class="inner">
                        <span class="product-name no-date">
                          <span class="name">{{ itemRow.itemNm }}</span>
                          <template v-if="itemRow.itemCnt > 0">
                            외 <span class="point">{{ itemRow.itemCnt }}</span>개
                          </template>
                        </span>
                      </p>
                    </div>
                  </div>
                </template>
              </section>
          </template>
        </template>
        <!--========================================================================
        배송요청사항
        ========================================================================-->
        <section v-if="ordInfo.giftOrd == 'N' || (ordInfo.giftOrd == 'Y' && ordInfo.giftAcptYn == 'Y')" class="section wrap-breakdown">
          <h3>배송요청사항</h3>
          <ul class="wrap-info-list">
            <template v-for="(row, delivPositReqPontListIndex) in delivPositReqPontList">
            <li :key="delivPositReqPontListIndex">
              <p class="list-title wb-a">배송지 <template v-if="row.dlvpNm">({{ row.dlvpNm }})</template></p>
              <dl class="detail-breakdown">
                <dt>수령위치</dt>
                <dd>
                  <template v-if="isNotEmpty(row) && isNotEmpty(row.devMsg01)">{{ row.devMsg01 }}</template>
                  <template v-if="isNotEmpty(row) && isNotEmpty(row.devMsg02)"><br/>{{ row.devMsg02 }}</template>
                </dd>
                <template v-if="row.delivTypeCd == '02' || row.delivTypeCd == '03'">
                  <dt>택배배송 <br> 요청사항</dt>
                  <dd>
                    <template v-if="isNotEmpty(row) && isNotEmpty(row.devMsg03)">{{ row.devMsg03 }}</template>
                    <template v-else>없음</template>
                  </dd>
                </template>
              </dl>
            </li>
            </template>
          </ul>
        </section>
        <!--========================================================================
        추가선택사항
        ========================================================================-->
        <section v-if="ordInfo.giftOrd == 'N' || (ordInfo.giftOrd == 'Y' && ordInfo.giftAcptYn == 'Y')" class="section wrap-breakdown">
          <h3>추가선택사항</h3>
          <dl class="detail-breakdown">
            <dt>결품 처리</dt>
            <dd>{{ ordAddOptPont.ofsItemProcSpNm }}</dd>
            <dt>영수증</dt>
            <dd>{{ ordAddOptPont.recptIssuSpNm }}</dd>
            <dt v-if="isNotEmpty(ordAddOptPont.amtStandFrgfNm)">금액대별 사은품</dt>
            <dd v-if="isNotEmpty(ordAddOptPont.amtStandFrgfNm)">{{ ordAddOptPont.amtStandFrgfNm }}</dd>
            <dt v-if="isNotEmpty(ordAddOptPont.mallStandFrgfNm)">몰별 사은품</dt>
            <dd v-if="isNotEmpty(ordAddOptPont.mallStandFrgfNm)">{{ ordAddOptPont.mallStandFrgfNm }}</dd>
          </dl>
        </section>
        <!--========================================================================
        하위버튼영역
        ========================================================================-->
        <section class="section btns">
          <div class="bottom-btn-area">
            <button type="button" class="btn-md btn-bg darkgray" @click="toList">
              주문/배송 목록
            </button>
            <button type="button" class="btn-md btn-bg lightgreen" @click="goHome">
              쇼핑하러가기
            </button>
          </div>
        </section>
        <Footer />
      </section>
    </main>
    <Loading v-show="loading > 0" />
  </div>
</template>
<script>
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import ImgUtils from '@/common/ImgUtils';
import Config from '@/common/Config.js';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import LoginUtils from '@/common/LoginUtils';
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 헤더
import PopupMobileBill from '@/views/cs/recptmgnt/PopupMobileBill'; //  팝업 - 모바일 영수증 @/views/ss/SC-FO-SS-GF-MP-856
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import Basket from '@/common/od/Basket';
import Loading from "@/components/common/Loading";
import Tracker from '@/common/Tracker'; // 앱트래커

export default {
  name: 'OrderListDetail',
  data() {
    return {
      popup: {
        // 팝업
        open: false,
        popupDiscountInfo: false,
        popupMobileBill: false,
      },
      imgPath: Config.server.VUE_APP_IMAGE_SERVER,
      ordId: this.$route.params.ordId, // 주문ID
      plus: true,
      ordInfo: {
        ordId: '' /* 주문ID */,
        ordDt: '' /* 주문일자 */,
        ordDay: '' /* 주문요일 */,
        ordTm: '' /* 주문시분초 */,
        ordStatCd: '' /* 주문상태코드 */,
        ordRecptIssuYn: '' /* 주문영수증발행여부 */,
        cashRecptIssuYn: '' /* 현금영수증발행여부 */,
      },
      delivTypeList: [],
      tdrInfo: {},
      devTypeItemList: [],
      delivPositInfoList: [],
      delivPositReqPontList: [],
      ordAddOptPont: {
        ofsItemProcSpNm: '',
        recptIssuSpNm: '',
        amtStandFrgfNm: '',
        mallStandFrgfNm: '',
      },
      addOptFrgfList: [],
      tdrMeansList: [],
      dlfeeList: [],
      ordTdrSateList: [],
      loading: 0,
      siteClass: '',
      isReserveMultiDeliv: false,
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '주문상세 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '주문상세',
      },
    ],
  },
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    PopupMobileBill, // 팝업 - 모바일 영수증
    Loading,
  },
  methods: {
    // 선택담기
    async setOrdItemOptPut() {
      // 01. 체크된 상품 담기
      const optPutItem = [];
      // 배송유형목록
      this.delivTypeList.forEach(devRow => {
        // 주문상품목록
        devRow.ordItemList.forEach(itemRow => {
          if (itemRow.orgItemChk) {
            optPutItem.push(itemRow);
          }
        });
      });
      if (optPutItem.length == 0) {
        this.$gsdialog.alert("선택된 상품이 없습니다.").then(dialog => {});
        return false;
      }
      // 02. 전송파라미터 생성
      const bakItems = [];
      const trackerItemList = []; // 트래커용 상품 목록
      for (let inx = 0; inx < optPutItem.length; inx++) {
        const iBsktPut = {
          bsktTypeCd: '1', /* 장바구니유형코드 */
          mallId: optPutItem[inx].mallId, /* 몰ID */
        };
        // 메인상품담기
        const bsktPutDtoList = [];
        bsktPutDtoList.push(this.setOrdItemOptPutItemProperty(optPutItem[inx], "MAIN"));
        trackerItemList.push(optPutItem[inx]);
        // 연관상품담기
        optPutItem[inx].subItemList.forEach(itemRow => {
          // 그룹상품/패키지 제외
          if (optPutItem[inx].ordItemSeqno == itemRow.grpItemId && this.isNotEmpty(itemRow.grpItemId)) {
            return;
          }
          // 사은품 제외
          if (itemRow.fpurchItemYn == 'Y' || itemRow.sampleItemYn == 'Y' || itemRow.presItemYn == 'Y') {
            return;
          }
          bsktPutDtoList.push(this.setOrdItemOptPutItemProperty(itemRow, "SUB"));
        });

        // 사은품List담기 TODO BJW
        iBsktPut.bsktPutDtoList = bsktPutDtoList;
        bakItems.push(iBsktPut);
      }
      console.log('bakItems', bakItems);
      // 03. 전송처리
      try {
        this.loading++;
        ApiUtils.post('/fo/od/bsktmgnt/mall-basket-item', {bsktMultiPutDtoList: bakItems}).then(res => {
          this.loading--;
          if (res.data.success) {
            this.$gsdialog.alert("선택된 상품을 장바구니에 담았습니다.").then(dialog => {});
            Tracker.prodAddToCart(trackerItemList, 'ORDER_DELIV'); // 장바구니 상품담기 완료시 실행
          } else {
            this.$gsdialog.alert("장바구니 담기에 실패하였습니다.(" + res.data.statusCode + " : " + res.data.statusMessage + ")").then(dialog => {});
          }
        });
      } catch (error) {
        this.loading--;
        this.$gsdialog.alert("에러발생(" + error + ")").then(dialog => {});
      }
    },
    setOrdItemOptPutItemProperty(paramItemInfo, paramMode) {
      // TODO BJW 연관상품이 아닐수 있어..
      let vItemGrpSeqno = "";
      let vItemCompoCd = "01";
      if (paramMode == 'MAIN') {
        if (paramItemInfo.subItemList.length==0) {
          vItemGrpSeqno = paramItemInfo.relatOrdSeqno;
        } else {
          vItemGrpSeqno = paramItemInfo.subItemList[0].relatOrdSeqno;
          vItemCompoCd = "02";
        }
      } else {
        vItemGrpSeqno = paramItemInfo.relatOrdSeqno;
        vItemCompoCd = "02";
      }
      const returnObj = {
        itemGrpSeqno: vItemGrpSeqno, /* 상품그룹일련번호(같은 그룹상품 패키지, 추가구성상품 일 경우 같은 값으로 세팅) */
        ssevntId: paramItemInfo.ssevntId, /* 기획전 ID */
        dspCtgId: paramItemInfo.dspCtgId, /* 전시카테고리ID */
        itemId: paramItemInfo.itemId, /* 상품ID */
        skuId: paramItemInfo.skuId, /* 단품ID */
        grpItemId: paramItemInfo.grpItemId, /* 그룹상품ID */
        bsktQty: (paramItemInfo.ordQty == 0)?1:paramItemInfo.ordQty, /* 장바구니수량 */
        relatBsktId: null, /* 연관장바구니ID */
        delivDt: paramItemInfo.ordTypeCd == '50' ? paramItemInfo.delivReqDt : null, /* 예약배송의 배송일자 */
        storId: paramItemInfo.storId, /*  */
        supplFirmCd: paramItemInfo.supplFirmCd, /*  */
        zipcd: null, /* 우편번호 */
        ssevntTimes: paramItemInfo.ssevntTimes, /* 기획전회차 */
        itemCompoCd: vItemCompoCd, /* 01 : 패키지를 제외한 상품, 02 : 패키지 상품 (연관상품은 메인포함 모두 '02' 로 전송) */
        ordTypeCd: (paramItemInfo.ordTypeCd == '20')?'10':paramItemInfo.ordTypeCd, /* 주문유형코드 */
        delivTypeCd: paramItemInfo.delivTypeCd, /* 배송유형코드 */
        mallId: paramItemInfo.mallId, /* mallId */
      };
      return returnObj;
    },
    delivCheck(delivTypeRow) {
      delivTypeRow.ordItemList.forEach(itemRow => {
        // TODO BJW  하위상품목록도 추가 되어 한번 더 FOREACH 해야함
        itemRow.orgItemChk = delivTypeRow.orgDelivTypeChk;
      });
    },
    itemCheck(delivTypeRow, itemRow) {
      // TODO BJW 그룹상품 경우 처리할것들
      this.itemAllCheck(delivTypeRow, itemRow);
    },
    itemAllCheck(delivTypeRow, itemRow) {
      let allChkYn = true;
      delivTypeRow.ordItemList.forEach(itemRow => {
        // TODO BJW 선택대상이 아닌 상품(증정, 그룹등등)
        // TODO BJW  하위상품목록도 추가 되어 한번 더 FOREACH 해야함
        if (!itemRow.orgItemChk) allChkYn = false;
      });
      delivTypeRow.orgDelivTypeChk = allChkYn;
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    replaceByDefault(e) {
      e.target.src = imgProductNothumb;
    },
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    // 주문배송목록화면으로 이동
    toList() {
      this.$router.push('/cs/orddeliv/ord_deliv_list');
    },
    // 주문배송상세정보조회(기본)
    async retrieveInfoBase() {
      const params = {
        ordId: this.ordId,
      };
      this.loading++;
      ApiUtils.get('/fo/cs/orddelivdtl/order-detail-base-info', params).then(res => {
        this.loading--;
        if (res.data === null || res.data.data === null) {
          return;
        }
        const reserveMultiDelivList = new Set();
        this.ordInfo = res.data.data.ordInfo;
        this.delivTypeList = res.data.data.delivTypeList;
        const itemList = res.data.data.itemList;

        if (!this.ordInfo) { // 주문정보가 없으면 목록으로 이동
          this.$gsdialog.alert(CookieUtils.getCookie('CUST_NM') + " 고객님이 결제하신 주문이 아닙니다.").then(dialog => {
            this.toList();
          });
          return;
        }

        this.delivTypeList.forEach(row => {
          row.orgDelivTypeChk = false;
          row.ordItemList = itemList.filter(i => row.orgDelivTypeCd == i.orgDelivTypeCd && (this.isEmpty(i.relatOrdSeqno) || i.ordItemSeqno == i.relatOrdSeqno));

          row.ordItemList.forEach(item => {
            item.subItemList = itemList.filter(i => {
              if (item.orgDelivTypeCd == i.orgDelivTypeCd && this.isNotEmpty(i.relatOrdSeqno) && i.relatOrdSeqno != '0') {
                if (item.ordDtlSeqno == i.ordDtlSeqno && item.ordItemSeqno != i.ordItemSeqno && item.ordItemSeqno == i.relatOrdSeqno) {
                  return true;
                }
              }
            });
            if (row.orgDelivTypeCd == 'AA') {
              reserveMultiDelivList.add(item.dlvpNm);
            }
            // 패키지 상품 금액 계산 (선택형상품 제외)
            if (item.grpItemId && !item.grpItemId.startsWith('S')) {
              let salesAmt = 0;
              item.subItemList.forEach(s => {
                salesAmt += s.salesAmt - 0;
              });
              item.salesAmt = salesAmt;
            }
          });

          this.isReserveMultiDeliv = reserveMultiDelivList.length > 1 ? true : false;
          this.delivCheck(row);
        });
      }).catch(err => {
        this.loading--;
      });
    },
    // 주문배송상세정보조회(상품)
    async retrieveInfoItem() {
      const params = {
        ordId: this.ordId,
      };
      this.loading++;
      ApiUtils.get('/fo/cs/orddelivdtl/order-detail-item-info', params).then(res => {
        this.loading--;
        if (res.data === null || res.data.data === null) {
          return;
        }
        this.tdrInfo = res.data.data.tdrInfo;
        this.devTypeItemList = res.data.data.devTypeItemList;
      }).catch(err => {
        this.loading--;
      });
    },
    // 주문배송상세정보조회(기타)
    async retrieveInfoOther() {
      const params = {
        ordId: this.ordId,
      };
      this.loading++;
      ApiUtils.get('/fo/cs/orddelivdtl/order-detail-other-info', params).then(res => {
        this.loading--;
        if (res.data === null || res.data.data === null) {
          return;
        }
        this.delivPositInfoList = res.data.data.delivPositInfoList;
        this.delivPositReqPontList = res.data.data.delivPositReqPontList;
        this.addOptFrgfList = res.data.data.addOptFrgfList;
        this.tdrMeansList = res.data.data.tdrMeansList;
        this.dlfeeList = res.data.data.dlfeeList;
        this.ordTdrSateList = res.data.data.ordTdrSateList;
        if (this.delivPositReqPontList.length > 0) {
          this.ordAddOptPont.ofsItemProcSpNm = this.delivPositReqPontList[0].ofsItemProcSpNm;
          this.ordAddOptPont.recptIssuSpNm = this.delivPositReqPontList[0].recptIssuSpNm;
        }
        this.addOptFrgfList.forEach(frgfRow => {
          // 프로모션상세유형코드 602 : 주문서단위, 603 : 배송유형단위
          if (frgfRow.promDtlTypeCd == '603') {
            this.ordAddOptPont.amtStandFrgfNm = frgfRow.presFrgfApplValDesc;
          }
          if (frgfRow.promDtlTypeCd == '602') {
            this.ordAddOptPont.mallStandFrgfNm = frgfRow.presFrgfApplValDesc;
          }
        });
        // 결제금액 합계 계산, 결제금액이 0이면 전체취소, 전자영수증 버튼 안보임
        let tdrAmt = 0;
        this.tdrMeansList.forEach(e => {
          tdrAmt += e.tdrAmt;
        });
        this.tdrMeansList.tdrAmt = tdrAmt;
      }).catch(err => {
        this.loading--;
      });
    },
    getItemImg(url) {
      let path = '';
      try {
        url = url.replace("{SIZE}", 300); // 임시로 사이즈 변경함
        path = ImgUtils.path(url);
      } catch (e) {
        path = '@/assets/images/img/img_product_nothumb.jpg';
      }
      return path;
    },
    goClaimDetail(tdrTypeRow) {
      if (tdrTypeRow.ordClaimSpCd == 'C') {
        this.$router.push('/cs/claimmgnt/ord_cncl_dtl/' + tdrTypeRow.ordId + '/' + tdrTypeRow.claimSeqno);
      }
      if (tdrTypeRow.ordClaimSpCd == 'R') {
        this.$router.push('/cs/claimmgnt/ord_rtn_dtl/' + tdrTypeRow.ordId + '/' + tdrTypeRow.claimSeqno);
      }
    },
    goItemDetail(itemId, storId, supplFirmCd, mallId) {
      if (mallId === '1') {
        location.href = SiteUtils.freshmo('/product_detail?itemId=' + itemId + '&storId=' + storId + '&supplFirmCd=' + supplFirmCd);
      } else {
        location.href = SiteUtils.dalimo('/product_detail?itemId=' + itemId + '&storId=' + storId + '&supplFirmCd=' + supplFirmCd);
      }
    },
    goHome() {
      CookieUtils.deleteCookie('ordSearchOption');
      // 공통 화면이면 home으로 이동 시 location.href;
      if (SiteUtils.isCommonSite()) {
        if (CookieUtils.getMallId() === '11') {
          // 달리살다
          location.href = SiteUtils.dalimo('/');
        } else {
          // gsfresh
          location.href = SiteUtils.freshmo('/');
        }
      } else {
        this.$router.push(
          { path: '/' },
        );
      }
    },
    goShop() {
      // 공통 화면이면 home으로 이동 시 location.href;
      if (SiteUtils.isCommonSite()) {
        if (CookieUtils.getMallId() === '11') {
          // 달리살다
          location.href = SiteUtils.dalimo('/');
        } else {
          // gsfresh
          location.href = SiteUtils.freshmo('/');
        }
      } else {
        this.$router.push(
          { path: '/' },
        );
      }
    },
    replaceClaimCntNm(v) {
      return v.replace(/(취소 ([0-9]+))/, '<span class="red">$1</span>');
    }
  },
  async mounted() {
    this.siteClass = CookieUtils.getSiteClass();

    this.loading++;
    const res = await ApiUtils.get('/fo/cs/orddelivdtl/order-type-info', {ordId: this.ordId});
    this.loading--;
    if (res.data === null || res.data.data === null) {
      return;
    }
    const d = res.data.data.ordInfo;
    const ordTypeCd = d.ordTypeCd;
    const chanlNm = d.chanlNm;
    if (ordTypeCd == '40') { // 제휴주문
      await this.$gsdialog.alert('제휴사(' + chanlNm + ')에서 결제된 주문입니다.<br/>제휴사 마이페이지에서 확인하여 주세요.', {html: true, header: ''}).then(dialog => {});
      this.goHome();
      return;
    }

    if (!LoginUtils.isLogin()) {
      let returnUrl = location.href;
      returnUrl = encodeURIComponent(returnUrl);
      console.log('returnUrl,'+returnUrl);
      this.$router.push({ path: '/cu/login?returnUrl='+returnUrl });
      return;
    }

    // 주문배송상세정보조회(기본)
    this.retrieveInfoBase(); // /fo/cs/orddelivdtl/order-detail-base-info
    // 주문배송상세정보조회(상품)
    this.retrieveInfoItem(); // /fo/cs/orddelivdtl/order-detail-item-info
    // 주문배송상세정보조회(기타)
    this.retrieveInfoOther(); // /fo/cs/orddelivdtl/order-detail-other-info
  },
};
</script>
<style lang="scss"></style>
