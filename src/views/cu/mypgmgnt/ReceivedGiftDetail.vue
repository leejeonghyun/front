<!--
view/ss/SC-FO-SS-GF-MS-817
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]">
    <!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <SubDefaultHeader :headerText="giftInfo.giftTdrCmmMbrNm + '의 선물'" />
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="received-gift-wrap">
        <!-- START : 배송지 입력기한 -->
        <section class="wrap-breakdown">
          <div class="due-date">
            <div class="top-state-info">
              <em class="state">{{giftInfo.stat_process_nm}}</em>
              <p v-if="giftInfo.stat_process != 4">{{giftInfo.stat_process_dt}}</p>
              <button
                title="배송중인 선물 조회하러가기 버튼"
                class="btn-delivery-info"
                v-if="giftInfo.stat_process == 4 && isNotEmpty(ordInfo.dvdescDlvcoCd)"
                @click="popupTrackingActive"
              >배송조회</button>
            </div>

            <dl class="detail-breakdown right">
              <template v-if="giftInfo.giftAcptDttm">
                <dt>배송정보 입력날자</dt>
                <dd>{{giftInfo.giftAcptDttm}}</dd>
              </template>
            </dl>
          </div>
        </section>
        <!-- END : 배송지 입력기한 -->
        <!-- START : 선물 메시지 -->
        <section class="section gift-message-card-mobile">
          <div class="sub-title">
            <h2 class>선물 메시지</h2>
          </div>
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
        </section>
        <!-- END : 택배배송 -->

        <!--========================================================================
        배송지 정보
        ========================================================================-->
        <section class="section wrap-breakdown">
          <h3>배송지 정보</h3>
          <ul class="wrap-info-list">
            <template v-for="delivPositRow in delivPositInfoList">
              <li :key="delivPositRow.mbrDlvpSeqno">
                <p class="list-title">배송지 ({{ delivPositRow.dlvpNm }})</p>
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
        <template v-for="(devTypeRow, devTypeIdex) in devTypeItemList">
          <!--===================================
            택배
          ====================================-->
          <section
            class="section wrap-breakdown"
            :key="devTypeRow.orgDelivTypeCd+'_'+devTypeIdex"
            v-if="devTypeRow.orgDelivTypeCd == 'DLV'"
          >
            <h3>{{ devTypeRow.orgDelivTypeNm }}</h3>
            <template v-for="(mallRow, mallIdx) in devTypeRow.devTypeMallList">
              <strong
                class="branch"
                :key="'devMall_' + devTypeIdex + '_' + mallIdx"
              >{{ mallRow.mallNm }}</strong>
              <!-- 6월수정 START : 마크업 변경 및 도착예정일 삭제 -->
              <div
                class="wrap-delivery-product"
                v-for="(itemRow, itemIdx) in mallRow.devTypeMallItemList"
                :key="'devMallItem_' + devTypeIdex + '_' + mallIdx + '_' + itemIdx"
              >
                <div class="delivery-product">
                  <p class="inner">
                    <span class="product-name">
                      <span class="name">{{ itemRow.itemNm }}</span>
                      <template v-if="itemRow.itemCnt > 0">
                        외
                        <span class="point">{{ itemRow.itemCnt }}</span>개
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
        </template>
        <!--========================================================================
        배송요청사항
        ========================================================================-->
        <section class="section wrap-breakdown">
          <h3>배송요청사항</h3>
          <ul class="wrap-info-list">
            <template v-for="(row, delivPositReqPontListIndex) in delivPositReqPontList">
              <li :key="delivPositReqPontListIndex">
                <p class="list-title">배송지 ({{row.dlvpNm}})</p>
                <dl class="detail-breakdown">
                  <dt>수령위치</dt>
                  <dd>
                    <template v-if="isNotEmpty(row) && isNotEmpty(row.devMsg01)">{{ row.devMsg01 }}</template>
                    <template v-if="isNotEmpty(row) && isNotEmpty(row.devMsg02)">
                      <br />
                      {{ row.devMsg02 }}
                    </template>
                  </dd>
                  <dt>
                    택배배송
                    <br />요청사항
                  </dt>
                  <dd>
                    <template v-if="isNotEmpty(row) && isNotEmpty(row.devMsg03)">{{ row.devMsg03 }}</template>
                    <template v-else>없음</template>
                  </dd>
                </dl>
              </li>
            </template>
          </ul>
        </section>
        <!--========================================================================
        추가선택사항
        ========================================================================-->
        <section class="section wrap-breakdown">
          <h3>추가선택사항</h3>
          <dl class="detail-breakdown">
            <!-- <dt>결품 처리</dt>
            <dd>{{ ordAddOptPont.ofsItemProcSpNm }}</dd>
            <dt>영수증</dt>
            <dd>{{ ordAddOptPont.recptIssuSpNm }}</dd>-->
            <dt>금액대별 사은품</dt>
            <dd>{{ ordAddOptPont.amtStandFrgfNm }}</dd>
            <!-- <dt>몰별 사은품</dt>
            <dd>{{ ordAddOptPont.mallStandFrgfNm }}</dd>-->
          </dl>
        </section>
        <!-- START : 하단 버튼 -->

        <section class="section btns">
          <div class="bottom-btn-area">
            <button type="button" class="btn-md btn-bg darkgray" @click="goList">선물하기 목록</button>
            <button type="button" class="btn-md btn-bg lightgreen" @click="goShopping">쇼핑하러 가기</button>
          </div>
        </section>
        <!-- START : 하단 버튼 -->
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->

    <!-- 팝업 - 배송조회 -->
    <PopupTrackingShipping
      @popupEvent="popupAction"
      :mbrDelivParamInfo="mbrDelivParamInfo"
      v-if="this.popup.popupTrackingShipping"
    />
  </div>
</template>
<script>
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
import AccordionMixin from '@/mixins/AccordionMixin'; // 4월수정 : AccordionMixin 추가
import PopupTrackingShipping from '@/views/cs/orddeliv/DelivDlvInq'; // 팝업 - 배송조회 @/views/ss/SC-FO-SS-GF-MP-855
import ShareUtils from '@/common/ShareUtils';

export default {
  name: 'ReceivedGiftDetail',
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    PopupTrackingShipping,
  },
  data() {
    return {
      giftMessage: '선물한 사람이 보낼때 작성한 메시지 노출',
      toggle: {
        // 4월수정 : toggle 데이터 추가
        productInfo01: false,
      },
      // 팝업
      popup: {
        open: false,
        popupTrackingShipping: false, // 팝업 - 배송조회
      },
      ordId: this.$route.params.ordId, // 주문ID
      ordGiftList: [],
      giftTdrCmmMbrNm: '',
      giftTdrDelivStatNm: '',
      giftAcptDttm: '',
      giftImgFilePathNm: '',
      giftMsgCnts: '',
      totalCnt: 0,
      ordInfo: {
        ordId: '' /* 주문ID */,
        ordDt: '' /* 주문일자 */,
        ordDay: '' /* 주문요일 */,
        ordTm: '' /* 주문시분초 */,
        ordStatCd: '' /* 주문상태코드 */,
        ordRecptIssuYn: '' /* 주문영수증발행여부 */,
        cashRecptIssuYn: '' /* 현금영수증발행여부 */,
        dvdescDlvcoCd: '' /* 택배사 코드 */,
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
      giftInfo: {
        giftImgId: '',
        giftRcptDelivStatNm: '',
        giftAcptDttm: '',
        giftRcptCmmMbrNm: '',
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물하기 상세 < 마이페이지 <%s',
  },
  mixins: [AccordionMixin], // 4월수정 : AccordionMixin 추가
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
    // 4월수정 : activeToggle 추가
    activeToggle(el) {
      this.accordionEvent();
      this.toggle[el] = !(this.toggle[el] != false);
      if (
        !event.currentTarget.classList.contains('detail-view-toggle-heading')
      ) {
        this.tabInitTop();
      }
    },
    // 주문배송상세정보조회(기본)
    async retrieveInfoBase() {
      const params = {
        ordId: this.ordId,
      };
      const res = await ApiUtils.get('/fo/cs/orddelivdtl/gift-detail-base-info', params);
      if (res.data === null || res.data.data === null) {
        return;
      }

      this.ordInfo = res.data.data.ordInfo || {};
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
    giftBowing: async function() {
      const OrdGiftInqInputDto = {
        ordGiftInqType: 1 /* 1 : 받은선물 , 2: 보낸선물 */,
        limit: 1,
        offset: 0,
        ordId: this.ordId,
      };
      const resultDetail = await ApiUtils.get(
        '/fo/cu/mypgmgnt/order-gift',
        OrdGiftInqInputDto
      );
      const e = resultDetail.data.data.ordGiftListInqRsltDto[0];

      this.giftInfo.giftRcptDelivStatNm = e.giftRcptDelivStatNm;
      this.giftInfo.giftAcptDttm = this.getWeekdayFormat(e.giftAcptDttm);
      this.giftInfo.giftTdrCmmMbrNm = e.giftTdrCmmMbrNm;
      this.giftInfo.giftImgId = e.giftImgId;

      if (e.allCancelYn == 'Y') {
        this.giftInfo.stat_process = 6; // 전체취소
        this.giftInfo.stat_process_nm = '전체취소';
        this.giftInfo.stat_process_dt = this.getWeekdayFormat(e.claimOccrDttm);
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
      this.giftImgFilePathNm = res.data.data.giftImgFilePathNm; // GIFT_IMG_ID;
      this.giftMsgCnts = res.data.data.giftMsgCnts; // GIFT_MSG_CNTS;
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
          if (this.devTypeItemList.length > 0) {
            this.orderInfo.dvdescDlvcoCd = this.devTypeItemList[0].dvdescDlvcoCd;
          }
        }
      );
    },
    // 주문배송상세정보조회(기타)
    async retrieveInfoOther() {
      const params = {
        ordId: this.ordId,
      };
      ApiUtils.get('/fo/cs/orddelivdtl/gift-detail-other-info', params).then(
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
    // 배송조회(운송장조회) 팝업
    popupTrackingActive() {
      this.mbrDelivParamInfo = this.devTypeItemList[0];
      this.popupAction('popupTrackingShipping');
    },
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false);
    },
  },
  mounted() {
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
