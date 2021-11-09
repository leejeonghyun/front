<template>
  <div>
  <div class="list-content" v-for="(supplFirm, jndex) in delivType.supplFirmDtoList" v-bind:key="jndex">
    <div class="wrap-border" v-if="supplFirm.bsktInqRsltDtoList && supplFirm.bsktInqRsltDtoList.length > 0">
      <ul class="cart-product-list">
        <!-- START : GS fresh -->
        <li v-for="(bskt, index) in supplFirm.bsktInqRsltDtoList" v-bind:key="bskt.bsktId" :class="{'plus-product-list' : (bskt.promId !== null && bskt.promId !== ''), 'cart-promotion' : (bskt.promId !== null && bskt.promId !== '' && (index === 0 || bskt.promId !== delivType.supplFirmDtoList[jndex].bsktInqRsltDtoList[index-1].promId || bskt.itemPromGrpCd !== delivType.supplFirmDtoList[jndex].bsktInqRsltDtoList[index-1].itemPromGrpCd))}">
          <div class="wrap-alert" v-show="getAlertMsg(bskt) !== ''">
            <p>{{getAlertMsg(bskt)}}</p>
          </div>
          <!-- <p class="txt-expiration" v-if="bskt.delivTypeCd === '05' && pmbsJoinPrcnCd !== '0001'">달리드림 멤버십<br/>전용상품</p> -->
          <div class="inner">
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk bg">
                    <input type="checkbox" name="bsktId" :id="`${'chkList' + bskt.bsktId}`" :value="bskt.bsktId" :checked="bskt.chk" @click="setChk(jndex, index, bskt.chk, 'N')" ref="bsktId">
                    <label :for="`${'chkList' + bskt.bsktId}`">{{ bskt.itemNm }}</label>
                  </span>
                </p>
              </dt>
              <dd class="thumb">
                <span aria-label="혜택" class="ico-benefit plus" v-if="bskt.promId !== null && bskt.promId !== '' && getCmpl(bskt.promId, bskt.itemPromGrpCd) && getCmpl(bskt.promId, bskt.itemPromGrpCd).promDtlTypeCd === '201'">{{getCmpl(bskt.promId, bskt.itemPromGrpCd).beneApplVal}}+1</span>
                <a href="javascript://" @click="goItemDetail(bskt);">
                  <figure>
                    <img :src="getItemImg(bskt.itemImg)" :alt="bskt.itemNm" v-if="bskt.itemImg !== ''">
                    <img src="@/assets/images/img/img_product_nothumb.jpg" v-if="bskt.itemImg === ''">
                  </figure>
                </a>
              </dd>
              <dd class="option">
                <p class="option-info" v-show="bskt.ordTypeCd === '10' && bskt.delivTypeCd === '01' && bskt.spckItemYn === 'Y' && (bskt.delivDt === null || bskt.delivDt === '')">익일 도착예정</p> <!-- 당일배송이면서 심플리쿡 상품이면 -->
                <p class="option-info" v-show="bskt.ordTypeCd === '10' && bskt.delivTypeCd === '03' && (bskt.delivDt === null || bskt.delivDt === '')">영업일 기준 2~5일</p> <!-- 업체배송이면-->
                <p class="option-info" v-if="bskt.delivDt !== null && bskt.delivDt !== ''"><button type="button" aria-label="도착 예정일 선택 팝업 활성화" aria-haspopup="dialog" @click="popupDateActive(bskt)">{{ format(bskt.delivDt) }} 도착예정</button></p>
                <p class="option-info" v-if="bskt.optnItemYn === 'Y'"><button type="button" aria-label="옵션 팝업활성화" aria-haspopup="dialog" @click="openItemOptnPopup(bskt)">옵션 : {{ bskt.skuNm }}</button></p>
              </dd>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount($event, bskt)"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" v-model="bskt.bsktQty" class="txt-number" min="1" max="999" title="선택 수량" @blur="updateBskt(bskt, 'direct')" @focus="setkstQtyTemp(bskt.bsktQty);">
                <button type="button" class="btn-plus" @click="increaseCount($event, bskt)"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="shop">{{bskt.mallNm}}</dd>
              <dd class="list-price" aria-label="정상가격" v-if="bskt.itemSprc > bskt.itemDcSprc || (bskt.itemCpnDcAmt + bskt.dblDcCpnDcAmt) > 0">
                <del>{{comma(bskt.itemSprc * bskt.bsktQty)}}</del>원
              </dd>
              <dd class="sale-price" :class="{'dalisalda' : orgMallId === '11'}">
                <span class="ico-badge" v-if="bskt.pmbsDcAmt > 0">달리드림</span>
                <span class="number-sale-price" aria-label="판매가격">{{comma(bskt.itemDcSprc * bskt.bsktQty - bskt.cmplDcAmt - bskt.itemCpnDcAmt - bskt.dblDcCpnDcAmt)}}</span>
                <span class="unit-won">원</span>
                <button type="button" class="btn-infomation" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupDiscountActive(bskt)"><span class="hidden">할인 안내</span></button>
              </dd>
            </dl>
            <div class="btn-bottom">
              <ul class="product-info">
                <li v-if="bskt.dlfeeAddStandQty > 0">{{bskt.dlfeeAddStandQty}}개 묶음당 배송비추가</li>
                <li v-if="bskt.itemDlfeeAmt === 0 && bskt.dlfeeAmt === 0">무료배송</li>
                <li v-if="bskt.itemPurchMaxRestrQty < 100">1인 {{bskt.itemPurchMaxRestrQty}}개 한정</li>
                <li v-if="bskt.cardDcYn === 'Y'">카드할인</li>
                <li v-if="bskt.ordsDblDcCpnPromExpnsInqRsltDtoList !== null && bskt.ordsDblDcCpnPromExpnsInqRsltDtoList.length > 0">더블쿠폰</li>
              </ul>
              <p class="btn-area">
                <button type="button" class="btn-border btn-coupon" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog"
                  @click="popupCouponActive(bskt.ordsItemCpnPromExpnsInqRsltList, bskt.ordsDblDcCpnPromExpnsInqRsltDtoList, bskt.itemNm, bskt.bsktId, bskt.itemDcSprc, bskt.bsktQty, bskt.cmplDcAmt)"
                  v-if="(bskt.ordsItemCpnPromExpnsInqRsltList !== null && Object.entries(bskt.ordsItemCpnPromExpnsInqRsltList).length > 0) || (bskt.ordsDblDcCpnPromExpnsInqRsltDtoList !== null && Object.entries(bskt.ordsDblDcCpnPromExpnsInqRsltDtoList).length > 0)">쿠폰변경</button>
                <button type="button" class="btn-border btn-keep" :class="{active: bskt.bsktKeepYn == 'Y'}" @click="updateBsktKeepYn(bskt.bsktId, bskt.bsktKeepYn, index, jndex)" v-if="bskt.ordTypeCd !== '50' && bskt.cmmMbrNo !== 0">{{ bskt.bsktKeepYn === 'Y' ? '보관해제' : '계속보관하기' }}</button>
              </p>
            </div>
            <div class="package-option" v-if="bskt.pkgItemList">
              <!-- 4월 수정 START : 이미지 노출 UI 변경으로 인한 마크업 변경  -->
              <dl class="thumb-type" v-for="(pkgItem, kndex) in bskt.pkgItemList" v-bind:key="kndex">
                <dt>
                  <div class="tit">
                    <span class="inp-chk">
                      <!-- 4월수정 START : 상품 이미지 케이스 추가
                        1. 상품 이미지가 있을 경우
                        2. 상품 이미지가 없을 경우
                      -->
                      <!-- 1. 상품 이미지가 있을 경우 -->
                      <figure class="option-thumb">
                        <img :src="getItemImg(pkgItem.itemImg)" :alt="pkgItem.itemNm">
                      </figure>
                      <!-- 2. 상품 이미지가 없을 경우
                      <span class="option-thumb"></span>
                      -->
                      <!-- 4월수정 END : 상품 이미지 케이스 추가 -->
                      <label>{{pkgItem.itemNm}}</label>
                    </span>
                  </div>
                </dt>
                <dd class="option" v-if="pkgItem.optnItemYn === 'Y'">
                  <p class="option-info">옵션: {{pkgItem.skuNm}}</p>
                </dd>
              </dl>
              <!-- 4월 수정 END : 이미지 노출 UI 변경으로 인한 마크업 변경  -->
            </div>
            <div class="simplycook-option" v-if="bskt.addItemList">
              <!-- 4월 수정 START : 이미지 노출 UI 변경으로 인한 마크업 변경  -->
              <dl class="thumb-type" v-for="(addItem, kndex) in bskt.addItemList" v-bind:key="kndex">
                <dt>
                  <div class="tit">
                    <span class="inp-chk">
                      <input type="checkbox" name="" :id="`${'chkListX' + addItem.bsktId}`" :value="addItem.bsktId" :checked="addItem.chk" @click="setAddItemChk(jndex, index, kndex, addItem.chk, 'N')">
                      <!-- 4월수정 START : 상품 이미지 케이스 추가
                        1. 상품 이미지가 있을 경우
                        2. 상품 이미지가 없을 경우
                      -->
                      <!-- 1. 상품 이미지가 있을 경우 -->
                      <figure class="option-thumb">
                        <img :src="getItemImg(addItem.itemImg)" :alt="addItem.itemNm">
                      </figure>
                      <!-- 2. 상품 이미지가 없을 경우
                      <span class="option-thumb"></span>
                      -->
                      <!-- 4월수정 END : 상품 이미지 케이스 추가 -->
                      <label :for="`${'chkListX' + addItem.bsktId}`">{{addItem.itemNm}}</label>
                    </span>
                  </div>
                </dt>
                <dd class="option-number">
                  <button type="button" class="btn-minus" @click="decreaseCount($event, addItem)"><span class="hidden">선택수량 빼기</span></button>
                  <input type="number" name="" v-model="addItem.bsktQty" class="txt-number" title="선택 수량" @blur="updateBskt(addItem, 'direct')" @focus="setkstQtyTemp(addItem.bsktQty);">
                  <button type="button" class="btn-plus" @click="increaseCount($event, addItem)"><span class="hidden">선택수량 더하기</span></button>
                </dd>
                <dd class="sale-price">
                  <span class="number-sale-price" aria-label="판매가격">{{comma(addItem.itemDcSprc * addItem.bsktQty)}}</span>
                  <span class="unit-won">원</span>
                </dd>
                <dd><button type="button" class="btn-del" @click="deleteBskt(addItem)"><span class="hidden">옵션 삭제</span></button></dd>
              </dl>
              <!-- 4월 수정 END : 이미지 노출 UI 변경으로 인한 마크업 변경  -->
            </div>
            <div class="go-shopping type-event" v-if="bskt.lastCmplPromItemYn && getCmpl(bskt.promId, bskt.itemPromGrpCd)">
              <p>
                <span v-html="getCmplPromTxt(bskt.promId, bskt.itemPromGrpCd)"></span>
              </p>
              <button type="button" class="btn-go" aria-label="행사상품 담기 팝업 활성화" aria-haspopup="dialog"
                v-if="isCmplItemExist(bskt.promId, bskt.itemPromGrpCd)"
                @click="openCmplItemPopup(bskt)">상품담기</button>
            </div>
            <p class="reservation-count" v-if="bskt.ordTypeCd === '50' && bskt.resvItemYn === 'Y'">사전예약 <strong>D-{{bskt.dday === 0 ? 'day' : bskt.dday}}</strong> 현재 <strong>{{comma(bskt.ordCnt)}}명</strong> 예약 완료</p>
            <div v-if="bskt.presList">
              <div v-for="(pres, kndex) in bskt.presList" v-bind:key="kndex" :class="`${pres.presPrvdTypeCd === '03' ? 'go-shopping' : 'go-shopping txt'}`" >
                <p class="type-freebie">{{getFrgfText(bskt, pres)}}</p><button type="button" class="btn-go" aria-label="사은품 변경 팝업 활성화" aria-haspopup="dialog" @click="changeFrgf(bskt, pres)" v-if="pres.presPrvdTypeCd === '03'">변경</button>
              </div>
            </div>
            <p><button type="button" class="btn-del" @click="deleteBskt(bskt)"><span class="hidden">삭제</span></button></p>
          </div>
        </li>
        <!-- END : GS fresh -->
      </ul>
      <div class="total-price-info">
        <p class="price-info">총 상품금액 {{comma(supplFirm.itemDcSprc - supplFirm.cmplDcAmt - (supplFirm.itemCpnDcAmt + supplFirm.dblDcCpnDcAmt))}}원 + 배송비 {{comma(supplFirm.dlfee)}}원 = {{comma(supplFirm.dlfee - (supplFirm.itemCpnDcAmt + supplFirm.dblDcCpnDcAmt) + supplFirm.itemDcSprc - supplFirm.cmplDcAmt)}}원</p>
        <template v-if="recommendActivated(delivType, supplFirm)">
          <button @click="popupRecommendActive(delivType, supplFirm)" aria-haspopup="dialog" aria-label="추천상품 팝업 활성화" class="btn-go-today"
                  type="button">
            <span>{{getDelivTypeNm(delivType, supplFirm)}} <strong>{{amountForFreeDelivery(supplFirm) | comma}}원 더 담고</strong> 무료배송 받기</span>
          </button>
        </template>
        <template v-else-if="delivType.delivTypeCd === '02' || delivType.delivTypeCd === '03' || delivType.delivTypeCd === '05'">
          <button @click="popupRecommendActive(delivType, supplFirm)" aria-haspopup="dialog" aria-label="추천상품 팝업 활성화" class="btn-go-today"
                  type="button">
            <span>{{getDelivTypeNm(delivType, supplFirm)}} 택배 상품 더 보기</span>
          </button>
        </template>
      </div>
    </div>
    <!-- START : 품절일 경우 -->
    <div class="wrap-border" v-if="supplFirm.soldoutBsktInqRsltDtoList && supplFirm.soldoutBsktInqRsltDtoList.length > 0">
      <ul class="cart-product-list">
        <li class="disabled" v-for="(bskt, index) in supplFirm.soldoutBsktInqRsltDtoList" v-bind:key="bskt.bsktId">
          <div class="inner">
            <p class="txt-soldout">품절</p>
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk bg">
                    <input type="checkbox" name="bsktId" :id="`${'soldout' + bskt.bsktId}`" :value="bskt.bsktId" :checked="bskt.chk" @click="setChk(jndex, index, bskt.chk, 'S')" ref="bsktId">
                    <label :for="`${'soldout' + bskt.bsktId}`">{{ bskt.itemNm }}</label>
                  </span>
                </p>
              </dt>
              <dd class="thumb">
                <figure>
                  <img :src="getItemImg(bskt.itemImg)" :alt="bskt.itemNm">
                </figure>
              </dd>
              <dd class="shop">{{bskt.mallNm}}</dd>
              <dd class=txt-thanks v-if="bskt.existYn === 'N'">해당 매장에 판매하지 않는 상품입니다.</dd>
              <dd class=txt-thanks v-else-if="!(bskt.itemSellStatCd === 'A' || bskt.itemSellStatCd === 'C') || bskt.itemDispStatCd !== '01'">성원에 감사드립니다.</dd> <!-- 상품상태가활성화가아닐경우-->
              <dd class=txt-thanks v-else-if="bskt.delivImpsblDtYn === 'Y'">
                선택한 배송일이 마감되었습니다.
                <button type="button" aria-label="입고알림 팝업활성화" aria-haspopup="dialog" class="btn-border-small" v-if="bskt.ordTypeCd === '50' && bskt.ingSsevntTimes !== null" @click="rePut(bskt)">다시담기</button>
              </dd>
              <dd class=txt-thanks v-else-if="bskt.dday < 0">예약이 마감되었습니다.</dd>
              <dd class="btn-disabled-area" v-else-if="bskt.ofsYn === 'Y' || bskt.stkQty <= 0">
                <button type="button" class="btn-border-small" aria-label="입고알림 팝업활성화" aria-haspopup="dialog" @click="popupConfirmActive(bskt)" v-if="bskt.rstkinInfmReqYn === 'N'">입고 알림</button>
                <button type="button" class="btn-border-small active" @click="popupConfirmActive(bskt)" v-if="bskt.rstkinInfmReqYn === 'Y'">입고 해제</button>
                <button type="button" class="btn-border-small" aria-label="유사상품 팝업활성화" aria-haspopup="dialog" @click="popupSimilarityEvent(bskt)" v-if="bskt.ordTypeCd !== '50'">유사상품 보기</button>
              </dd>
            </dl>
            <p><button type="button" class="btn-del" @click="deleteBskt(bskt)"><span class="hidden">삭제</span></button></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
    <PopupTodayDelivery :delivType="popupRecommendParam.delivType"
                        @popupEvent="popupAction" :supplFirm="popupRecommendParam.supplFirm"
                        :needAmount="popupRecommendParam.needAmount" @submit="recommendSubmitAction"
                        @popupReturn="similarityResult" v-if="popup.popupTodayDelivery"
                        :todaySupplFirmCd="mbrDlvp.supplFirmCd"/>
    <PopupSimilarityProduct @popupEvent="popupAction" @similarityResult="similarityResult" v-if="popup.popupSimilarityProduct" :similarityProductList="this.similarityProductList" :mallId="soldoutBskt.mallId"/>
  </div>
</template>

<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import NumberUtils from '@/common/NumberUtils';
  import PopupSimilarityProduct from '@/views/od/PopupSimilarityProduct';
  import PopupTodayDelivery from '@/views/od/PopupTodayDelivery';
  import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
  import ImgUtils from '@/common/ImgUtils';
  import OrderMsg from '@/components/order/OrderMsg';
  import DateUtils from '@/common/DateUtils';
  import SiteUtils from '@/common/SiteUtils';
  import ApiUtils from '@/common/ApiUtils';
  import StringUtils from '@/common/StringUtils';
  import CookieUtils from '@/common/CookieUtils';
  import Tracker from '@/common/Tracker';

  export default {
  props: {
    delivType: Object,
    index: Number,
    pmbsJoinPrcnCd: String,
    itemCmplRsltDtoList: Array,
    bsktInqRsltDto: Object,
    todayDelivYn: String,
    nextDayDelivYn: String,
    apchItemDelivYn: String,
    mbrDlvp: Object,
  },
  name: "CartProductList",
  data() {
    return {
      popup: {
        open: false,
        popupSimilarityProduct: false,
        popupTodayDelivery: false,
      },
      bsktQtyTemp: 0,
      soldout: false,
      similarityProductList: [],
      recommendProductList: [],
      bsktId: "",
      orgMallId: CookieUtils.getMallId(),
      soldoutBskt: {},
      popupRecommendParam: {
        delivType: null,
        supplFirm: null,
        needAmount: 0,
      },
    };
  },
  mixins: [LayerPopupMixin],
  components: {
    PopupSimilarityProduct,
    PopupTodayDelivery,
  },
    filters: {
      comma: NumberUtils.toComma,
    },
  methods: {
    recommendActivated(delivType, supplFirm) {
      if (delivType.delivTypeCd === '50') {
        return false;
      }
      return this.amountForFreeDelivery(supplFirm) > 0;
      // return this.amountForFreeDelivery(supplFirm) <= 5000;
    },
    amountForFreeDelivery(supplFirm) {
      return supplFirm.freeDelivStandAmt - (supplFirm.itemDcSprc - supplFirm.cmplDcAmt - supplFirm.itemCpnDcAmt - supplFirm.dblDcCpnDcAmt);
    },
    // change value
    decreaseCount(event, bskt) {
      if (bskt.bsktQty > bskt.itemSellUnitQty) {
        this.bsktQtyTemp = bskt.bsktQty;
        bskt.bsktQty = Number(bskt.bsktQty) - bskt.itemSellUnitQty;
        this.updateBskt(bskt, 'down');
      }
    },
    increaseCount(event, bskt) {
      if (bskt.bsktQty <= (999 - bskt.itemSellUnitQty)) {
        this.bsktQtyTemp = bskt.bsktQty;
        bskt.bsktQty = Number(bskt.bsktQty) + bskt.itemSellUnitQty;
        this.updateBskt(bskt, 'up');
      }
    },
    updateBskt(bskt, type) {
      if (bskt.bsktQty <= 0) {
        this.$gsdialog.alert(OrderMsg.posbBsktQty('최소', 1));
        bskt.bsktQty = this.bsktQtyTemp;
        return;
      } else if (bskt.bsktQty > 999) {
        this.$gsdialog.alert(OrderMsg.posbBsktQty('최대', 999));
        bskt.bsktQty = this.bsktQtyTemp;
        return;
      }
      if (bskt.itemPurchMinRestrQty !== 0 && type !== 'up') {
        if (bskt.itemPurchMinRestrQty > bskt.bsktQty) {
          this.$gsdialog.alert(OrderMsg.posbBsktQty('최소', bskt.itemPurchMinRestrQty));
          bskt.bsktQty = this.bsktQtyTemp;
          return;
        }
      }
      if (bskt.itemPurchMaxRestrQty !== 0 && type !== 'down') {
        if (bskt.itemPurchMaxRestrQty < bskt.bsktQty) {
          this.$gsdialog.alert(OrderMsg.posbBsktQty('최대', bskt.itemPurchMaxRestrQty));
          bskt.bsktQty = this.bsktQtyTemp;
          return;
        }
      }

      if (bskt.stkQty < bskt.bsktQty) {
        this.$gsdialog.alert(OrderMsg.posbBsktStkQty(bskt.stkQty, bskt.itemNm), {html: true});
        bskt.bsktQty = this.bsktQtyTemp;
        return;
      }

      if (bskt.bsktQty % bskt.itemSellUnitQty !== 0) {
        this.$gsdialog.alert('구매수량은 ' + bskt.itemSellUnitQty + '의 배수로 입력하세요.');
        bskt.bsktQty = this.bsktQtyTemp;
        return;
      }

      if (this.bsktQtyTemp !== bskt.bsktQty) {
        this.$emit('updateBskt', bskt);
      }
    },
    deleteBskt(bskt) {
      const $this = this;
      this.$gsdialog.confirm("선택한 상품을 삭제하시겠습니까?").then(function () {
        $this.$emit('deleteBskt', bskt);
      });
    },
    popupDiscountActive(bskt) {
      this.$emit('popupEvent', 'popupDiscountInfo', bskt);
    },
    popupCouponActive(itemCpnList, dblDcCpnList, itemNm, bsktId, itemDcSprc, bsktQty, cmplDcAmt) {
      this.$emit('openCouponPopup', itemCpnList, dblDcCpnList, itemNm, bsktId, itemDcSprc, bsktQty, cmplDcAmt);
    },
    popupDateActive(bskt) {
      this.$emit('popupDateActive', bskt);
    },
    popupSimplycookOptionActive() {
      this.$emit('popupEvent', 'popupOptionDate');
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    setkstQtyTemp(bsktQty) {
      this.bsktQtyTemp = bsktQty;
    },
    updateBsktKeepYn(bsktId, keepYn, idx, jdx) {
      let bsktKeepYn = "Y";
      if (keepYn === "Y") {
        bsktKeepYn = "N";
      }
      this.delivType.supplFirmDtoList[jdx].bsktInqRsltDtoList[idx].bsktKeepYn = bsktKeepYn;
      this.$emit('updateBsktKeepYn', bsktId, bsktKeepYn);
    },
    setAddItemChk(jdx, kdx, ndx, chk, type) {
      if (type === 'N') {
        if (!chk) {
          this.delivType.supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].chk = !chk;
        }
        this.delivType.supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].addItemList[ndx].chk = !chk;
      }
      let chkYn = true;
      for (let idx=0; idx<this.$refs.bsktId.length; idx++) {
        if (!this.$refs.bsktId[idx].checked) {
          chkYn = false;
          break;
        }
      }
      this.$emit('setChk', chkYn, this.index);
    },
    setChk(jdx, kdx, chk, type) {
      if (type === 'N') {
        this.delivType.supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].chk = !chk;
        if (chk) {
          if (this.delivType.supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].addItemList) {
            for (let ndx=0; ndx<this.delivType.supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].addItemList.length; ndx++) {
              this.delivType.supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].addItemList[ndx].chk = !chk;
            }
          }
        }
      } else if (type === 'S') {
        this.delivType.supplFirmDtoList[jdx].soldoutBsktInqRsltDtoList[kdx].chk = !chk;
      }
      let chkYn = true;
      for (let idx=0; idx<this.$refs.bsktId.length; idx++) {
        if (!this.$refs.bsktId[idx].checked) {
          chkYn = false;
          break;
        }
      }
      this.$emit('setChk', chkYn, this.index);
    },
    changeFrgf(bskt, pres) {
      const itemDcSprc = bskt.itemDcSprc * bskt.bsktQty - bskt.itemCpnDcAmt - bskt.dblDcCpnDcAmt;

      let promBeneZoneList = [];
      for (let idx=0; idx<pres.promBeneZoneList.length; idx++) {
        if (pres.promBeneZoneList[idx].beneApplRangeCd === '02') {
          if (Number(pres.promBeneZoneList[idx].beneZoneBeginVal) <= itemDcSprc && (Number(pres.promBeneZoneList[idx].beneZoneEndVal) > itemDcSprc || Number(pres.promBeneZoneList[idx].beneZoneEndVal) === 0)) {
            promBeneZoneList = pres.promBeneZoneList[idx];
            break;
          }
        } else {
          promBeneZoneList = pres.promBeneZoneList[idx];
          break;
        }
      }

      this.$emit('openFreeGiftPopup', bskt.bsktId, pres, promBeneZoneList);
    },
    getFrgfText(bskt, pres) {
      const itemDcSprc = bskt.itemDcSprc * bskt.bsktQty - bskt.itemCpnDcAmt - bskt.dblDcCpnDcAmt;
      let promBeneZoneList = [];
      for (let idx=0; idx<pres.promBeneZoneList.length; idx++) {
        if (pres.promBeneZoneList[idx].beneApplRangeCd === '02') {
          if (Number(pres.promBeneZoneList[idx].beneZoneBeginVal) <= itemDcSprc && (Number(pres.promBeneZoneList[idx].beneZoneEndVal) > itemDcSprc || Number(pres.promBeneZoneList[idx].beneZoneEndVal) === 0)) {
            promBeneZoneList = pres.promBeneZoneList[idx];
            break;
          }
        } else {
          promBeneZoneList = pres.promBeneZoneList[idx];
          break;
        }
      }

      let text = '';
      for (let idx=0; idx<promBeneZoneList.promPresFrgfList.length; idx++) {
        if (promBeneZoneList.promPresFrgfList[idx].selYn === 'Y') {
          if (text !== '') {
            text += ', ';
          }
          if (promBeneZoneList.promPresFrgfList[idx].presFrgfTypeCd === '4') {
            text += 'GS&POINT ' + promBeneZoneList.promPresFrgfList[idx].presFrgfApplVal + 'p';
          } else if (promBeneZoneList.promPresFrgfList[idx].presFrgfTypeCd === '5') {
            text += 'GS&리워즈 ' + promBeneZoneList.promPresFrgfList[idx].presFrgfApplVal + 'p';
          } else {
            text += promBeneZoneList.promPresFrgfList[idx].presFrgfApplValNm;
          }

          if (promBeneZoneList.promPresFrgfList[idx].selQty > 1) {
            text += ' X ' + promBeneZoneList.promPresFrgfList[idx].selQty;
          }
        }
      }

      if (text !== '') {
        text = '증정사은품: ' + text;
      } else {
        text = '증정사은품을 선택해주세요.';
      }
      return text;
    },
    getCmplPromTxt(promId, itemPromGrpCd) {
      const cmpl = this.getCmpl(promId, itemPromGrpCd);
      return cmpl.promInfoTxt;
    },
    getCmpl(promId, itemPromGrpCd) {
      if (this.itemCmplRsltDtoList) {
        return this.itemCmplRsltDtoList.find(cmpl => cmpl.promId === promId && cmpl.itemGrpVal === itemPromGrpCd);
      }
    },
    isCmplItemExist(promId, itemPromGrpCd) {
      const cmpl = this.getCmpl(promId, itemPromGrpCd);
      // if (cmpl.itemList.filter(item => item.applYn === 'N').length > 0) {
      if (cmpl) {
        return true;
      } else {
        return false;
      }
    },
    openCmplItemPopup(bsktItem) {
      const cmpl = this.getCmpl(bsktItem.promId, bsktItem.itemPromGrpCd);
      const cmplInfo = {
        cmpl: this.getCmpl(bsktItem.promId, bsktItem.itemPromGrpCd),
        ordTypeCd: bsktItem.ordTypeCd,
        delivTypeCd: bsktItem.delivTypeCd,
        storId: bsktItem.storId,
        supplFirmCd: bsktItem.supplFirmCd,
        mallId: bsktItem.mallId
      };

      this.$emit('openCmplItemPopup', cmplInfo);
    },
    /*
    openCmplItemPopup(promId, itemPromGrpCd, ordTypeCd, delivTypeCd, mallId) {
      const cmpl = this.getCmpl(promId, itemPromGrpCd);
      this.$emit('openCmplItemPopup', cmpl, ordTypeCd, delivTypeCd, mallId);
    },
    */
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    async popupSimilarityEvent(soldoutBskt) {
      /* key: 조회 API param */
      const similarityProductInqDto = {
        mallId: soldoutBskt.mallId,
        itemId: soldoutBskt.itemId,
        storId: soldoutBskt.storId,
        supplFirmCd: soldoutBskt.supplFirmCd,
      };
      const result = await ApiUtils.get('/fo/od/bsktmgnt/similarity-product-list', similarityProductInqDto);
      this.similarityProductList = result.data.data;
      if (this.similarityProductList === null || this.similarityProductList.length === 0) {
        this.$gsdialog.alert('유사 상품이 없습니다.');
        return;
      }
      this.soldoutBskt = soldoutBskt;
      console.log(this.similarityProductList);
      // const resultData = [{ itemId: 1 }, { itemId: 2 }];
      // this.similarityProductList = resultData;
      // this.bsktId = key;
      // document.querySelector('body').style.overflowY = 'hidden';
      this.popupAction('popupSimilarityProduct');
    },
    addSimilarity(data) {
      this.$emit('addSimilarity', data, this.soldoutBskt.ordTypeCd, this.soldoutBskt.delivTypeCd, 'C');
    },
    delSimilarity(data) {
      this.$emit('addSimilarity', data, this.soldoutBskt.ordTypeCd, this.soldoutBskt.delivTypeCd, 'D', this.soldoutBskt);
    },
    recommendSubmitAction(item) {
      this.$emit('addSimilarity', [{...item, delivTypeCd: this.popupRecommendParam.delivType.delivTypeCd}], '10', item.delivTypeCd, 'C');
    },
    similarityResult(data, stat) {
      if (stat == 'C') {
        this.addSimilarity(data);
      } else if (stat == 'D') {
        this.delSimilarity(data);
      }
    },
    popupRecommendActive(delivType, supplFirm) {
      this.popupRecommendParam = {
        // 배송 유형
        delivType: delivType,
        // 배송 점포 (supplFirm, storId)
        supplFirm: supplFirm,
        // 필요 금액
        needAmount: this.amountForFreeDelivery(supplFirm),
      };

      this.popupAction('popupTodayDelivery');
    },
    getDelivTypeNm(delivType, supplFirm) {
      let delivTypeNm = delivType.delivTypeNm + '배송';
      if (delivType.delivTypeCd === '02' || delivType.delivTypeCd === '03' || delivType.delivTypeCd === '05') {
        delivTypeNm = supplFirm.siteNm;
      }
      return delivTypeNm;
    },
    openItemOptnPopup(bskt) {
      this.$emit('openItemOptnPopup', bskt);
    },
    replaceByDefault(e) {
      console.log("ddd");
      e.target.src = imgProductNothumb;
    },
    getAlertMsg(bskt) {
      let msg = '';
      if (bskt.chk) {
        if (bskt.nplusOneNoStsfYn) {
          msg = '행사수량에 맞게 상품 수량을 수정해 주세요.';
        } else if (bskt.ordTypeCd === '10' && bskt.delivTypeCd === '01' ) {
          if (bskt.spckItemYn === 'Y') {
            let alertMsg = '';
            loop1:
            for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd === '10' && this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd === '01') {
                for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
                  for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                    if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                      if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].apchItemYn === 'Y') {
                        alertMsg = '마감세일';
                        break loop1;
                      } else if (!StringUtils.isEmpty(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].todaySaleCtgNm)) {
                        alertMsg = '당일판매';
                        break loop1;
                      }/* else if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].onedaySaleItemYn === 'Y') {
                        alertMsg = '하루판매';
                        break loop1;
                      }*/
                    }
                  }
                }
              }
            }
            if (alertMsg !== '') {
              msg = '심플리쿡 상품과 당일판매 상품은 동시에 주문할 수 없습니다.';
            }
          } else if (bskt.apchItemYn === 'Y' || !StringUtils.isEmpty(bskt.todaySaleCtgNm)/* || bskt.onedaySaleItemYn === 'Y' */) {
            if (bskt.apchItemYn === 'Y') {
              if (this.nextDayDelivYn === 'N') {
                msg = '임박판매 상품의 배송 가능한 시간이 없습니다. 상품을 확인해주세요';
              }
            } else if (bskt.dspCtgId === 'G1008001') {
              if (this.todayDelivYn === 'N') {
                if (this.nextDayDelivYn === 'N') {
                  msg = '당일판매 상품의 배송 가능한 시간이 없습니다. 상품을 확인해주세요';
                } else {
                  loop3:
                  for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
                    if (this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd === '10' && this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd === '01') {
                      for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
                        for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                          if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                            if (/* this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].onedaySaleItemYn === 'Y'
                              || */(!StringUtils.isEmpty(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].todaySaleCtgNm)
                                && this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dspCtgId !== 'G1008001')) {
                              msg = '당일판매 상품의 배송 가능한 시간이 없습니다. 상품을 확인해주세요';
                              break loop3;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else if ((/* bskt.onedaySaleItemYn === 'Y' || */(!StringUtils.isEmpty(bskt.todaySaleCtgNm) && bskt.dspCtgId !== 'G1008001'))) {
              if (this.todayDelivYn === 'N') {
                msg = '당일판매 상품의 배송 가능한 시간이 없습니다. 상품을 확인해주세요';
              }
            }
            if (msg !== '') {
              return msg;
            }
            let spckItemYn = false;
            loop2:
            for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd === '10' && this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd === '01') {
                for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
                  for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
                    if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                      if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].spckItemYn === 'Y') {
                        spckItemYn = true;
                        break loop2;
                      }
                    }
                  }
                }
              }
            }
            if (spckItemYn) {
              msg = '당일판매 상품과 심플리쿡 상품은 동시에 주문할 수 없습니다.';
            }
          }
        }
      }
      return msg;
    },
    popupConfirmActive(bskt) {
      this.$emit('openRstkinInfmReq', bskt);
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
    format(date) {
      return this.selectDate = DateUtils.format(date, 'MM/DD(dd)');
    },
    async rePut(bskt) {
      this.$gsdialog.confirm("상품 상세페이지에서 배송일자를  다시 선택해주세요.").then(async dialog => {
        const bsktIds = [];
        const prodData = [];

        bsktIds.push(bskt.bsktId);
        const iBsktPut = {
          bsktIds: bsktIds,
          sessnId: CookieUtils.getOdBsktUuid(),
        };
        const result = await ApiUtils.delete('/fo/od/bsktmgnt/basket-item', iBsktPut);
        if (result.data.success) {
          prodData.push({"PROD_ID": bskt.itemId,
                        "PROD_NM": bskt.itemNm,
                        "PROD_CAT": bskt.dspCtgId});// 앱트래커 관련
          Tracker.prodRemoveFromCart(prodData);// 앱트래커 장바구니 삭제완료시
        }
        let url = '/md/product_detail?itemId=' + bskt.itemId + '&storId=' + bskt.storId + '&supplFirmCd=' + bskt.supplFirmCd;
        if (!StringUtils.isEmpty(bskt.ssevntId)) {
          url += '&ssevntId=' + bskt.ssevntId + '&ssevntTimes=' + bskt.ingSsevntTimes;
        }
        if (bskt.mallId === '11') {
          location.href = SiteUtils.dalimo(url);
        } else {
          location.href = SiteUtils.freshmo(url);
        }
      });
    },
    goItemDetail(bskt) {
      let url = '/md/product_detail?itemId=' + bskt.itemId + '&storId=' + bskt.storId + '&supplFirmCd=' + bskt.supplFirmCd + '&mallId=' + bskt.mallId;
      if (!StringUtils.isEmpty(bskt.ssevntId)) {
        url += '&ssevntId=' + bskt.ssevntId + '&ssevntTimes=' + bskt.ssevntTimes;
      }
      if (bskt.mallId === '11') {
        location.href = SiteUtils.dalimo(url);
      } else {
        location.href = SiteUtils.freshmo(url);
      }
    },
  },
  mounted() {
  }
};
</script>
