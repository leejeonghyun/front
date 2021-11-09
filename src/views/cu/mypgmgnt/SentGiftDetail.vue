<!--
SC-FO-SS-GF-MS-818
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]">
    <!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <!-- 4월수정 START : headerText 수정 -->
    <SubDefaultHeader :headerText="giftInfo.giftRcptCmmMbrNm + '님께 보낸 선물'" />
    <!-- 4월수정 END : headerText 수정 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="received-gift-wrap">
        <!-- START : 배송지 입력기한 -->
        <section class="wrap-breakdown">
          <div class="due-date">
            <!-- 4월수정 START : top-state-info 영역 추가 및 h3삭제-->
            <!-- 4월수정 START : 케이스 추가 -->
            <div class="top-state-info">
              <em class="state">{{giftInfo.stat_process_nm}}</em>
              <p>{{giftInfo.stat_process_dt}}</p>
            </div>

            <!-- 4월수정 END : top-state-info 영역 추가 h3삭제-->
            <!-- 4월수정 START : 내용 삭제 및 선물메시지 다시 보내기 버튼으로 수정-->
            <dl class="detail-breakdown right">
              <dt>선물 보낸 날짜</dt>
              <dd>{{ ordInfo.ordDt }}({{ ordInfo.ordDay }}) {{ ordInfo.ordTm }}</dd>
              <template v-if="giftInfo.stat_process > 1">
                <dt>배송정보 입력날자</dt>
                <dd>{{giftInfo.giftAcptDttm}}</dd>
              </template>
            </dl>
            <div v-if="giftInfo.stat_process === 1" class="btns-resend">
              <button type="type" class="btn-resend" @click="sendMessage">선물메시지 다시 보내기</button>
            </div>
            <!-- 4월수정 END : 내용 삭제 및 선물메시지 다시 보내기 버튼으로 수정-->
          </div>
        </section>
        <!-- END : 배송지 입력기한 -->
        <!-- START : 선물 메시지 -->
        <!-- 4월수정 START : write-gift-msg-mobile 클래스 추가-->
        <section class="section gift-message-card-mobile">
          <!-- 4월수정 END : write-gift-msg-mobile 클래스 추가-->
          <div class="sub-title">
            <h2 class>선물 메시지</h2>
          </div>
          <!-- 4월수정 START : write-gift-msg-mobile 영역 추가 및 GiftBoxMessage 삭제-->
          <div class="write-gift-msg-mobile">
            <div class="insert-msg">
              <img
                :src="require('@/assets/images/img/'+giftImgFilePathNm)"
                :alt="''"
                v-if="giftImgFilePathNm != '' && giftImgFilePathNm != null"
              />
              <img :src="require('@/assets/images/img/img_product_nothumb.jpg')" :alt="''" v-else />
              <!-- <img :src="giftMsgImglist[giftInfo.giftImgId - 1].giftImg" :alt="''" /> -->
            </div>
            <div class="msg-cont">
              <div class="msg-txt">
                <div class="wrap-textarea">
                  <textarea title="선물 메세지 입력" :value="giftMsgCnts" readonly></textarea>
                </div>
              </div>
            </div>
          </div>
          <!-- 4월수정 END : write-gift-msg-mobile 영역 추가 및 GiftBoxMessage 삭제-->
        </section>
        <!-- END : 선물 메시지 -->
        <!-- START : 상품정보 -->

        <div class="sub-title">
          <h2>상품정보</h2>
        </div>
        <section
          class="section"
          v-for="(delivTypeRow, delivTypeRowIndex) in delivTypeList"
          :key="delivTypeRow.orgDelivId+'_'+delivTypeRowIndex"
        >
          <!-- 4월 수정 START : 문구 수정 - 택배만 존재 -->
          <h3 class="sub-title2">{{ delivTypeRow.delivTypeNm }}({{ delivTypeRow.itemCnt }})</h3>
          <div class="list-content">
            <ul
              class="cart-product-list selected-list"
              v-for="itemRow in delivTypeRow.ordItemList"
              v-bind:key="itemRow.ordId + '_' + itemRow.ordDtlSeqno + '_' + itemRow.ordItemSeqno"
            >
              <li
                :key="itemRow.ordId + '_' + itemRow.ordDtlSeqno + '_' + itemRow.ordItemSeqno"
                :class="{ plus: isNotEmpty(itemRow.nplusOneVal) }"
              >
                <dl>
                  <!--====================================
                      체크박스, 상품명, 합배송여부
                  ====================================-->
                  <dt>
                    <span class="inp-chk">
                      <label
                        :for="'delvItem_chk_' + delivTypeRow.orgDelivTypeCd + '_' + itemRow.itemKey"
                      >{{ itemRow.itemNm }}</label>
                      <i class="plus-badge" v-if="itemRow.uniDelivOrdYn == 'Y'">합배송</i>
                      <!-- 합배송딱지 -->
                      <span
                        class="delivery-name"
                        v-if="delivTypeRow.orgDelivTypeCd == 'AA'"
                      >{{itemRow.dlvpNm}}</span>
                      <!--예약인 경우 다중배송시배송지-->
                    </span>
                  </dt>
                  <!--====================================
                      상품이미지 표시
                  ====================================-->
                  <dd class="thumb">
                    <a
                      href="javascript:void(0);"
                      @click="goItemDetail(itemRow.itemId, itemRow.storId, itemRow.supplFirmCd, itemRow.mallId);"
                    >
                      <figure>
                        <span
                          v-if="itemRow.presItemYn == 'Y'"
                          aria-label="혜택"
                          class="ico-benefit gift"
                        >증정</span>
                        <!-- 상품단위증정프로모션여부 -->
                        <span
                          v-if="isNotEmpty(itemRow.nplusOneVal)"
                          aria-label="혜택"
                          class="ico-benefit"
                        >{{ itemRow.nplusOneVal }}+1</span>
                        <!-- N+1딱지 -->
                        <img
                          :src="getItemImg(itemRow.itemImg)"
                          :alt="itemRow.itemNm"
                          @error="replaceByDefault"
                          v-if="isNotEmpty(itemRow.itemImg)"
                        />
                        <img
                          src="@/assets/images/img/img_product_nothumb.jpg"
                          title="GSFresh 로고"
                          :alt="itemRow.itemNm"
                          v-else
                        />
                      </figure>
                    </a>
                  </dd>
                  <!--====================================
                      증정, 프로모션 표시(첫구매, 맛보기)
                  ====================================-->
                  <dd
                    class="gift"
                    v-if="itemRow.fpurchItemYn === 'Y' || itemRow.sampleItemYn === 'Y' || itemRow.presItemYn == 'Y'"
                  >
                    <!--첫구매(O), 맛보기(O)-->
                    <p class="point" v-if="itemRow.fpurchItemYn === 'Y'">첫 구매 혜택 사은품</p>
                    <p class="point" v-else-if="itemRow.presItemYn === 'Y'">구매 금액대별 사은품</p>
                    <p class="point" v-else>맛보기 사은품</p>
                  </dd>
                  <!--====================================
                      배송, 옵션 표시
                  ====================================-->
                  <dd
                    class="option"
                    v-if="delivTypeRow.spckItemIncldYn != 'Y' && itemRow.fpurchItemYn != 'Y' && itemRow.sampleItemYn != 'Y' && itemRow.presItemYn != 'Y'"
                  >
                    <!--심플리국(X), 첫구매(X), 맛보기(X)-->
                    <p
                      class="option-info"
                      v-if="delivTypeRow.orgDelivTypeCd == 'AA'"
                    >{{ itemRow.delivStatDesc }}</p>
                    <!--예약배송(O) 표시-->
                    <p class="option-info">{{ itemRow.optVal }}</p>
                  </dd>
                  <!--====================================
                      클레임 건수 표시
                  ====================================-->
                  <dd
                    class="return"
                    v-if="itemRow.fpurchItemYn != 'Y' && itemRow.sampleItemYn != 'Y'"
                  >
                    <!--첫구매(X), 맛보기(X)-->
                    <span class="point">{{ itemRow.claimCntNm }}</span>
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
                  <dd
                    class="list-price"
                    aria-label="정상가격"
                    v-if="itemRow.bfrSalesAmt != itemRow.salesAmt && (itemRow.fpurchItemYn != 'Y' && itemRow.sampleItemYn != 'Y')"
                  >
                    <!--할인되었거나 (첫구매도 아니고 맛보기도 아닌경우)-->
                    <del>{{ comma(itemRow.bfrSalesAmt) }}</del>원
                  </dd>
                  <!--====================================
                      판매가격 표시
                  ====================================-->
                  <dd class="sale-price" aria-label="판매가격" v-if="itemRow.sampleItemYn != 'Y'">
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
                      <a href="javascript:void(0);" @click="goItemDetail(subItemRow.itemId, subItemRow.storId, subItemRow.supplFirmCd, subItemRow.mallId);">
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
            </ul>
          </div>
          <!-- 4월 수정 START : 택배배송 제외한 내용 삭제 -->
          <!-- <h3 class="sub-title2">당일배송(2)</h3>
          <div class="list-content">
            <ul class="cart-product-list selected-list">
              <MyProductList />
            </ul>
          </div>
          <h3 class="sub-title2">새벽배송(2)</h3>
          <div class="list-content">
            <ul class="cart-product-list selected-list">
              <MyProductList />
            </ul>
          </div>
          <h3 class="sub-title2">택배배송(2)</h3>
          <div class="list-content">
            <ul class="cart-product-list selected-list">
              <MyProductList />
            </ul>
          </div>-->
          <!-- 4월 수정 END : 택배배송 제외한 내용 삭제 -->
        </section>
        <!-- END : 상품정보 -->
        <!-- START : 최종 결제금액 -->
        <section class="section-area mypage">
          <div class="total-payment order-payment">
            <div class="sub-title">
              <h3>결제정보</h3>
            </div>
            <ul class="accordion-payment">
              <li>
                <div class="tit-accordion">
                  총 상품금액
                  <span class="price">
                    <strong>{{ comma(parseInt(tdrInfo.totItemSellAmt) + parseInt(tdrInfo.totDcAmt)) }}</strong>원
                  </span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  총 할인금액
                  <span class="price red">
                    <strong>-{{ comma(tdrInfo.totDcAmt) }}</strong>원
                  </span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  총 배송비
                  <span class="price">
                    <strong>{{ comma(tdrInfo.totDelivAmt) }}</strong>원
                  </span>
                </div>
                <ul class="shipping-content">
                  <template v-for="(dlfeeRow, dlfeeIndex) in dlfeeList">
                    <li
                      :key="dlfeeRow.delivTypeNm + '_' + dlfeeIndex"
                      v-if="parseInt(dlfeeRow.bsktDlfee) > 0 || parseInt(dlfeeRow.itemDlfee) > 0"
                    >
                      {{ dlfeeRow.delivTypeNm }}
                      <span class="price">
                        <strong>{{ comma(dlfeeRow.bsktDlfee) }}</strong>원
                      </span>
                      <ul class="shipping-inner-list">
                        <li>
                          상품배송비
                          <span class="price">
                            <strong>{{ comma(dlfeeRow.itemDlfee) }}</strong>원
                          </span>
                        </li>
                      </ul>
                    </li>
                  </template>
                </ul>
              </li>
              <li v-if="isNotEmpty(tdrInfo.totAddDelivAmt) && parseInt(tdrInfo.totAddDelivAmt) > 0">
                <div class="tit-accordion">
                  추가 배송비
                  <span class="price">
                    <strong>{{ comma(tdrInfo.totAddDelivAmt) }}</strong>원
                  </span>
                </div>
                <ul class="shipping-content">
                  <template v-for="(dlfeeRow, dlfeeIndex) in dlfeeList">
                    <li :key="dlfeeRow.delivTypeNm + '_' + dlfeeIndex">
                      {{ dlfeeRow.delivTypeNm }}
                      <span class="price">
                        <strong>{{ comma(dlfeeRow.addDlfee) }}</strong>원
                      </span>
                    </li>
                  </template>
                </ul>
              </li>
            </ul>
          </div>
          <div class="sub-title send-total-price">
            <h2>
              최종결제금액
              <span class="price">
                <strong>{{ comma(tdrInfo.totLastTdrAmt) }}</strong>원
              </span>
            </h2>
            <p class="txt-point">
              배송 완료 후, GS&amp;POINT적립
              <span class="point">{{ comma(tdrInfo.pntSavgSchedAmt) }}P</span>
            </p>
            <p class="txt-point">
              쿠폰 지급
              <span class="point">({{ comma(tdrInfo.prvdCpn) }})</span>
            </p>
            <p class="txt-point">
              배송 완료 후, 스탬프 지급
              <span class="point">{{ comma(tdrInfo.prvdStmp) }}개</span>
            </p>
          </div>
        </section>
        <!-- END : 최종 결제금액 -->
        <!-- START : 하단 버튼 -->
        <!-- 4월수정 START : class 수정-->
        <section class="section btns">
          <div class="bottom-btn-area">
            <button type="button" class="btn-border btn-view-details" @click="ordDetail">주문상세보기</button>
            <!-- 4월수정 START : 버튼 텍스트 수정-->
            <button type="button" class="btn-md btn-bg darkgray" @click="goList">선물하기 목록</button>
            <!-- 4월수정 ENd : 버튼 텍스트 수정-->
            <button type="button" class="btn-md btn-bg lightgreen" @click="goShopping">쇼핑하러 가기</button>
          </div>
        </section>
        <!-- START : 하단 버튼 -->
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import CuUtils from '@/common/cu/CuUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import ImgUtils from '@/common/ImgUtils';
import Config from '@/common/Config.js';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import ShareUtils from '@/common/ShareUtils';

export default {
  name: 'SentGiftDetail',
  data() {
    return {
      giftMessage: '작성한 선물 메시지 내용 노출',
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
      ordItemList: [],
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
      ordGiftList: [],
      giftImgFilePathNm: '',
      giftMsgCnts: '',
      giftTrpsTelNo: '',
      giftInfo: {
        giftImgId: '',
        giftAcptDttm: '',
        giftRcptCmmMbrNm: '',
        giftTdrCmmMbrNm: '',
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물/조르기 상세 < 마이페이지 <%s',
  },
  mixins: [],
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    // 4월수정 : GiftBoxMessage 삭제
  },
  methods: {
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
    // 주문배송상세정보조회(기본)
    async retrieveInfoBase() {
      const params = {
        ordId: this.ordId,
      };
      const res = await ApiUtils.get('/fo/cs/orddelivdtl/order-detail-base-info', params);
      if (res.data === null || res.data.data === null) {
        return;
      }

      this.ordInfo = res.data.data.ordInfo;
      this.delivTypeList = res.data.data.delivTypeList;
      const itemList = res.data.data.itemList;

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
        });
      });
    },
    ordDetail: function() {
      this.$router.push('/cs/orddeliv/ord_deliv_dtl/' + this.ordId);
    },
    goList: function() {
      this.$router.push('/cu/gift_bowing');
    },
    goShopping: function() {
      if (SiteUtils.isCommonSite()) {
        if (CookieUtils.getMallId() === '11') {
          // 달리살다
          location.href = SiteUtils.dalimo('/');
        } else {
          // gsfresh
          location.href = SiteUtils.freshmo('/');
        }
      } else {
        this.$router.push({ path: '/' });
      }
    },
    // 주문배송상세정보조회(상품)
    async retrieveInfoItem() {
      const params = {
        ordId: this.ordId,
      };
      ApiUtils.get('/fo/cs/orddelivdtl/order-detail-item-info', params).then(
        res => {
          if (res.data === null || res.data.data === null) {
            return;
          }

          this.tdrInfo = res.data.data.tdrInfo;
          this.devTypeItemList = res.data.data.devTypeItemList;
        }
      );
    },
    // 주문배송상세정보조회(기타)
    async retrieveInfoOther() {
      const params = {
        ordId: this.ordId,
      };
      ApiUtils.get('/fo/cs/orddelivdtl/order-detail-other-info', params).then(
        res => {
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
        }
      );
    },
    giftBowing: async function() {
      const OrdGiftInqInputDto = {
        ordGiftInqType: 2 /* 1 : 받은선물 , 2: 보낸선물 */,
        limit: 1,
        offset: 0,
        ordId: this.ordId,
      };

      const resultDetail = await ApiUtils.get(
        '/fo/cu/mypgmgnt/order-gift',
        OrdGiftInqInputDto
      );
      const e = resultDetail.data.data.ordGiftListInqRsltDto[0];
      console.log(e);
      this.giftInfo.giftAcptDttm = this.getWeekdayFormat(e.giftAcptDttm);
      this.giftInfo.giftRcptCmmMbrNm = e.giftRcptCmmMbrNm;
      this.giftInfo.giftTdrCmmMbrNm = e.giftTdrCmmMbrNm;
      this.giftInfo.giftImgId = e.giftImgId;
      this.giftInfo.smsDsptPosbNum = e.smsDsptPosbNum || 0; // SMS발송가능횟수
      this.giftInfo.smsDsptNum = e.smsDsptNum || 0; // SMS발송횟수

      if (e.allCancelYn == 'Y') {
        this.giftInfo.stat_process = 6; // 전체취소
        this.giftInfo.stat_process_nm = '전체취소';
        this.giftInfo.stat_process_dt = this.getWeekdayFormat(e.claimOccrDttm);
      } else if (e.giftAcptYn != 'Y') {
        this.giftInfo.stat_process = 1; // 배송정보미입력
        this.giftInfo.stat_process_nm = '배송정보미입력';
      } else if (
        e.giftAcptYn == 'Y' &&
        (e.delivStatCd == '01' || e.delivStatCd == '02')
      ) {
        this.giftInfo.stat_process = 2; // 선물수락
        this.giftInfo.stat_process_nm = '선물수락';
        this.giftInfo.stat_process_dt = '';
      } else if (e.giftAcptYn == 'Y' && e.delivStatCd == '03') {
        this.giftInfo.stat_process = 3; // 배송준비중
        this.giftInfo.stat_process_nm = '배송준비중';
        this.giftInfo.stat_process_dt = '';
      } else if (
        e.giftAcptYn == 'Y' &&
        (e.delivStatCd == '04' || e.delivStatCd == '06')
      ) {
        this.giftInfo.stat_process = 4; // 배송중
        this.giftInfo.stat_process_nm = '배송중';
        this.giftInfo.stat_process_dt = ''; // e.delivReqDt;
      } else if (e.giftAcptYn == 'Y' && e.delivStatCd == '05') {
        this.giftInfo.stat_process = 5; // 배송완료
        this.giftInfo.stat_process_nm = '배송완료';
        this.giftInfo.stat_process_dt = this.getWeekdayFormat(e.delivFinDttm);
      } else if (e.giftAcptYn != 'Y' && e.giftValid == 'N') {
        this.giftInfo.stat_process = 7; // 자동취소
        this.giftInfo.stat_process_nm = '자동취소';
        this.giftInfo.stat_process_dt = this.getWeekdayFormat(e.giftValidDttm);
        this.giftInfo.giftAcptDttm = '미입력';
      }
    },
    // 메시지 정보
    async retrieveGiftOrdsPsInfo() {
      const params = {
        ordId: this.ordId,
      };
      const res = await ApiUtils.get('/fo/od/giftMgnt/gift_order_ps_info', params);
      if (res.data === null || res.data.data === null || !res.data.data.ordId) {
        await this.$gsdialog.alert('주문번호가 올바르지 않습니다.').then(dialog => {});
        this.goList();
        return;
      }
      const d = res.data.data;
      this.giftImgFilePathNm = d.giftImgFilePathNm;
      this.giftMsgCnts = d.giftMsgCnts;
      this.giftTrpsTelNo = d.giftTrpsTelNo;
    },
    getItemImg(url) {
      let path = '';
      try {
        url = url.replace('{SIZE}', 300); // 임시로 사이즈 변경함
        path = ImgUtils.path(url);
      } catch (e) {
        path = '@/assets/images/img/img_product_nothumb.jpg';
      }
      return path;
    },
    replaceByDefault(e) {
      e.target.src = imgProductNothumb;
    },
    getWeekdayFormat(d) {
      const week = ['일', '월', '화', '수', '목', '금', '토'];
      if (!d) {
        return '';
      }
      const dayOfWeek = week[new Date(d).getDay()];
      d =
        d.substring(0, 10).replace(/-/gi, '.') +
        '(' +
        dayOfWeek +
        ') ' +
        d.substring(11, 19);
      return d;
    },
    goItemDetail(itemId, storId, supplFirmCd, mallId) {
      if (mallId === '1') {
        location.href = SiteUtils.freshmo(
          '/product_detail?itemId=' +
            itemId +
            '&storId=' +
            storId +
            '&supplFirmCd=' +
            supplFirmCd
        );
      } else {
        location.href = SiteUtils.dalimo(
          '/product_detail?itemId=' +
            itemId +
            '&storId=' +
            storId +
            '&supplFirmCd=' +
            supplFirmCd
        );
      }
    },
    sendMessage() {
      if (this.giftTrpsTelNo && this.giftTrpsTelNo.length > 0) {
        this.sendSMS();
      } else {
        this.sendKakao();
      }
    },
    async sendSMS() {
      if (this.giftInfo.smsDsptNum >= this.giftInfo.smsDsptPosbNum) {
        this.$gsdialog
          .alert(
            `선물 메시지는 ${this.giftInfo.smsDsptPosbNum}회까지<br/>재전송 가능합니다.`,
            { html: true }
          )
          .then(dialog => {});

        return;
      }
      const OrdGiftInqInputDto = {
        ordGiftInqType: 2 /* 1 : 받은선물 , 2: 보낸선물 */,
        limit: 1,
        offset: 0,
        ordId: this.ordId,
        mallId: CookieUtils.getMallId(),
      };
      const result = await ApiUtils.get(
        '/fo/cu/mypgmgnt/order-gift-resend-sms',
        OrdGiftInqInputDto
      );
      if (result.data.success) {
        this.giftInfo.smsDsptNum++;

        this.$gsdialog
          .alert(
            `선물메시지를 재전송하였습니다<br/>남은 횟수: ${this.giftInfo
              .smsDsptPosbNum - this.giftInfo.smsDsptNum}회`,
            { html: true }
          )
          .then(dialog => {});
      } else {
        this.$gsdialog
          .alert(
            '메시지를 전송중 오류가 발생했습니다.<br/>잠시후에 다시 시도하여 주십시오.',
            { html: true }
          )
          .then(dialog => {});
      }
    },
    sendKakao() {
      const snsUrl = process.env.VUE_APP_COMMON_FR_MO + '/od/gift_rcv_dlv/' + this.ordId;
      const prodImg =
        'http://k.kakaocdn.net/dn/c4gG8s/btqDCbcEsU7/vDCTKRfId6jGFPoqy55QO1/kakaolink40_original.jpg'; // TODO
      const shareText = ord.giftTdrCmmMbrNm + '님이 보내신 선물이 도착했어요';
      const title = 'GSFresh';
      const text2 = '';
      ShareUtils.shareKakaoTalk(snsUrl, shareText, prodImg, title, text2);
    },
  },
  async mounted() {
    ShareUtils.init();

    // 메시지정보
    this.retrieveGiftOrdsPsInfo();

    // 주문배송상세정보조회(기본)
    this.giftBowing();

    // 주문배송상세정보조회(기본)
    this.retrieveInfoBase();
    // 주문배송상세정보조회(상품)
    this.retrieveInfoItem();
    // 주문배송상세정보조회(기타)
    this.retrieveInfoOther();
    // this.retrieveInfo();
  },
};
</script>
<style lang="scss">
</style>
