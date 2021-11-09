<template>
  <div>
    <div class="list-content" v-for="(supplFirm, jndex) in delivType.supplFirmDtoList" v-bind:key="jndex">
      <div class="wrap-border">
        <ul class="cart-product-list">
          <!-- START : GS fresh -->
          <li v-for="(bskt, index) in supplFirm.bsktInqRsltDtoList" v-bind:key="bskt.bsktId">
            <div class="inner">
              <dl>
                <dt>
                  <p class="tit">
                    <span class="inp-chk bg">
                      <input type="checkbox" name="bsktId" :id="`${'chkList' + bskt.bsktId}`" :value="bskt.bsktId" :checked="bskt.chk" @click="setChk(jndex, index, bskt.bsktId)" ref="bsktId">
                      <label :for="`${'chkList' + bskt.bsktId}`">{{ bskt.itemNm }}</label>
                    </span>
                  </p>
                </dt>
                <dd class="thumb">
                  <a href="javascript://" @click="goItemDetail(bskt.itemId, bskt.storId, bskt.supplFirmCd, bskt.mallId);">
                    <figure>
                      <img :src="getItemImg(bskt.itemImg)" :alt="bskt.itemNm" v-if="bskt.itemImg !== ''">
                      <img src="@/assets/images/img/img_product_nothumb.jpg" v-if="bskt.itemImg === ''">
                    </figure>
                  </a>
                </dd>
                <dd class="option">
                <p class="option-info" v-show="bskt.delivTypeCd === '01' && bskt.spckItemYn === 'Y'">익일 도착예정</p> <!-- 당일배송이면서 심플리쿡 상품이면 -->
                <p class="option-info" v-show="bskt.delivTypeCd === '03'">영업일 기준 2~5일</p> <!-- 업체배송이면-->
                <p class="option-info" v-if="bskt.delivDt !== null && bskt.delivDt !== ''"><button type="button" aria-label="도착 예정일 선택 팝업 활성화" aria-haspopup="dialog" @click="popupDateActive(bskt)">{{ format(bskt.delivDt) }} 도착예정</button></p>
                <p class="option-info" v-if="bskt.optnItemYn === 'Y'"><button type="button" aria-label="옵션 팝업활성화" aria-haspopup="dialog" @click="openItemOptnPopup(bskt)">옵션 : {{ bskt.skuNm }}</button></p>
              </dd>
                <dd class="option-number">
                  <button type="button" class="btn-minus" @click="decreaseCount($event, bskt)"><span class="hidden">선택수량 빼기</span></button>
                  <input type="number" name="" v-model="bskt.bsktQty" class="txt-number" title="선택 수량" @blur="updateBskt(bskt, 'direct')" @focus="setkstQtyTemp(bskt.bsktQty);">
                  <button type="button" class="btn-plus" @click="increaseCount($event, bskt)"><span class="hidden">선택수량 더하기</span></button>
                </dd>
                <dd class="shop" v-if="bskt.spckItemYn === 'Y'">심플리쿡</dd>
                <dd class="shop" v-else-if="bskt.delivTypeCd === '01'">{{bskt.mallNm}}</dd>
                <dd class="shop" v-else-if="bskt.delivTypeCd === '02'">{{bskt.mallNm}}</dd>
                <dd class="shop" v-else-if="bskt.delivTypeCd === '04'">{{bskt.mallNm}}</dd>
                <dd class="shop" v-else-if="bskt.delivTypeCd === '03'">{{bskt.brandNm}}</dd>
                <dd class="list-price" aria-label="정상가격" v-if="bskt.itemSprc > bskt.itemDcSprc || (bskt.itemCpnDcAmt + bskt.dblDcCpnDcAmt) > 0">
                  <del>{{comma(bskt.itemSprc * bskt.bsktQty)}}</del>원
                </dd>
                <dd class="sale-price" aria-label="판매가격" v-if="pmbsJoinPrcnCd === '0000'">
                  <span class="number-sale-price">{{comma(bskt.itemDcSprc * bskt.bsktQty - bskt.cmplDcAmt - bskt.itemCpnDcAmt - bskt.dblDcCpnDcAmt)}}</span>
                  <span class="unit-won">원</span>
                  <button type="button" class="btn-infomation" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupDiscountActive(bskt)"><span class="hidden">할인 안내</span></button>
                </dd>
                <dd class="sale-price" v-if="pmbsJoinPrcnCd === '0001'">
                  <span class="ico-badge" v-if="bskt.pmbsDcAmt > 0">달리드림</span>
                  <span class="number-sale-price" aria-label="판매가격">{{comma(bskt.itemDcSprc * bskt.bsktQty - bskt.cmplDcAmt - bskt.itemCpnDcAmt - bskt.dblDcCpnDcAmt)}}</span>
                  <span class="unit-won">원</span>
                  <button type="button" class="btn-infomation" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupDiscountActive(bskt)"><span class="hidden">할인 안내</span></button>
                </dd>
              </dl>
              <div class="btn-bottom">
                <ul class="product-info">
                  <li v-if="bskt.dlfeeAddStandQty > 0">{{bskt.dlfeeAddStandQty}}개 묶음당 배송비추가</li>
                  <li v-if="bskt.freeDelivYn === 'Y'">무료배송</li>
                  <li v-if="bskt.itemPurchMaxRestrQty < 100">1인 {{bskt.itemPurchMaxRestrQty}}개 한정</li>
                  <li v-if="bskt.cardDcYn === 'Y'">카드할인</li>
                  <!--<li v-if="bskt.ordsDblDcCpnPromExpnsInqRsltDtoList">더블쿠폰</li>-->
                  <li v-if="bskt.dbleCpnYn === 'Y'">더블쿠폰</li>
                </ul>
                <p class="btn-area">
                  <button type="button" class="btn-border btn-coupon" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog"
                    @click="popupCouponActive(bskt.ordsItemCpnPromExpnsInqRsltList, bskt.ordsDblDcCpnPromExpnsInqRsltDtoList, bskt.itemNm, bskt.bsktId, bskt.itemDcSprc, bskt.bsktQty, bskt.cmplDcAmt)"
                    v-if="(bskt.ordsItemCpnPromExpnsInqRsltList !== null && Object.entries(bskt.ordsItemCpnPromExpnsInqRsltList).length > 0) || (bskt.ordsDblDcCpnPromExpnsInqRsltDtoList !== null && Object.entries(bskt.ordsDblDcCpnPromExpnsInqRsltDtoList).length > 0)">쿠폰변경</button>
                  <!--  <button type="button" class="btn-border btn-keep" :class="{active: bskt.bsktKeepYn == 'Y'}" @click="updateBsktKeepYn(bskt.bsktId, bskt.bsktKeepYn, index, jndex)" v-if="bskt.delivTypeCd !== '06'">{{ bskt.bsktKeepYn === 'Y' ? '보관해제' : '계속보관하기' }}</button> -->
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
                        <input type="checkbox" name="" :id="`${'chkListX' + addItem.bsktId}`" :value="addItem.bsktId" :checked="addItem.chk">
                        <!-- 4월수정 START : 상품 이미지 케이스 추가
                          1. 상품 이미지가 있을 경우
                          2. 상품 이미지가 없을 경우
                        -->
                        <!-- 1. 상품 이미지가 있을 경우
                        <figure class="option-thumb">
                          <img src="@/assets/images/_temp/_img_gift03.jpg" alt="당면 사리">
                        </figure>
                        -->
                        <!-- 2. 상품 이미지가 없을 경우 -->
                        <span class="option-thumb"></span>
                        <!-- 4월수정 END : 상품 이미지 케이스 추가 -->
                        <label :for="`${'chkListX' + bskt.bsktId}`">{{addItem.itemNm}}</label>
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
                  <dd><button type="button" class="btn-del" @click="deleteBskt(addItem.bsktId)"><span class="hidden">옵션 삭제</span></button></dd>
                </dl>
                <!-- 4월 수정 END : 이미지 노출 UI 변경으로 인한 마크업 변경  -->
              </div>
              <div class="go-shopping" v-if="bskt.lastCmplPromItemYn && getCmpl(bskt.promId, bskt.itemPromGrpCd)">
                <p><span v-html="getCmplPromTxt(bskt.promId, bskt.itemPromGrpCd)"></span><button type="button" class="btn-go" aria-label="행사상품 담기 팝업 활성화" aria-haspopup="dialog" @click="openCmplItemPopup(bskt.promId, bskt.itemPromGrpCd, bskt.ordTypeCd, bskt.delivTypeCd)">상품담기</button></p>
              </div>
              <p class="reservation-count" v-if="bskt.ordTypeCd === '50'">사전예약 <strong>D-3</strong> 현재 <strong>321명</strong> 예약 완료</p>
              <div v-if="bskt.presList">
                <div v-for="(pres, kndex) in bskt.presList" v-bind:key="kndex" :class="`${pres.presPrvdTypeCd === '03' ? 'go-shopping' : 'go-shopping txt'}`" >
                  <p>{{getFrgfText(bskt, pres)}}</p><button type="button" class="btn-go" aria-label="사은품 변경 팝업 활성화" aria-haspopup="dialog" @click="changeFrgf(bskt, pres)" v-if="pres.presPrvdTypeCd === '03'">변경</button>
                </div>
              </div>
            </div>
          </li>
          <li class="disabled" v-for="bskt in supplFirm.soldoutBsktInqRsltDtoList" v-bind:key="bskt.bsktId">
            <p class="txt-soldout">품절</p>
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk bg">
                    <input type="checkbox" name="bsktId" :id="`${'soldout' + bskt.bsktId}`" :value="bskt.bsktId" :checked="bskt.chk" disabled="disabled">
                    <label :for="`${'soldout' + bskt.bsktId}`">{{ bskt.itemNm }}</label>
                  </span>
                </p>
              </dt>
              <dd class="thumb">
                <figure>
                  <img :src="getItemImg(bskt.itemImg)" :alt="bskt.itemNm">
                </figure>
              </dd>
              <dd class="shop" v-if="bskt.spckItemYn === 'Y'">심플리쿡</dd>
              <dd class="shop" v-else-if="bskt.delivTypeCd === '01'">{{bskt.mallNm}}</dd>
              <dd class="shop" v-else-if="bskt.delivTypeCd === '02'">{{bskt.mallNm}}</dd>
              <dd class="shop" v-else-if="bskt.delivTypeCd === '03'">{{bskt.brandNm}}</dd>
              <dd class="shop" v-else-if="bskt.delivTypeCd === '04'">{{bskt.mallNm}}</dd>
              <dd class=txt-thanks v-if="bskt.existYn === 'N'">선물하기 가능한 재고가 없습니다.</dd>
              <dd class=txt-thanks v-else-if="bskt.itemSellStatCd !== 'A'">선물하기 가능한 재고가 없습니다.</dd>
              <dd class=txt-thanks v-else-if="bskt.delivImpsblDtYn === 'Y'">선물하기 가능한 재고가 없습니다.</dd>
              <dd class="btn-disabled-area" v-else-if="bskt.ofsYn === 'Y' || bskt.stkQty <= 0">선물하기 가능한 재고가 없습니다.</dd>
            </dl>
            <p><button type="button" class="btn-del" @click="deleteBskt(bskt.bsktId)"><span class="hidden">삭제</span></button></p>
          </li>
          <!-- END : GS fresh -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
import ImgUtils from '@/common/ImgUtils';
import OrderMsg from '@/components/order/OrderMsg';
import DateUtils from '@/common/DateUtils';
import SiteUtils from '@/common/SiteUtils';

export default {
  props: {
    delivType: Object,
    index: Number,
    pmbsJoinPrcnCd: String,
    itemCmplRsltDtoList: Array,
  },
  name: "GiftProductList",
  data() {
    return {
      bsktQtyTemp: 0
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    // change value
    decreaseCount(event, bskt) {
      const $target = event.currentTarget;
      if ( $target.nextSibling.value > 1 ) {
        this.bsktQtyTemp = $target.nextSibling.value;
        $target.nextSibling.value --;
        bskt.bsktQty = $target.nextSibling.value;
        this.updateBskt(bskt, 'down');
      }
    },
    increaseCount(event, bskt) {
      const $target = event.currentTarget;
      if ( $target.previousSibling.value < 999 ) {
        this.bsktQtyTemp = $target.previousSibling.value;
        $target.previousSibling.value ++;
        bskt.bsktQty = $target.previousSibling.value;
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

      if (this.bsktQtyTemp !== bskt.bsktQty) {
        this.$emit('updateBskt', bskt);
      }
    },
    deleteBskt(bsktId) {
      if (!confirm("선택한 상품을 삭제하시겠습니까?")) {
        return;
      }
      this.$emit('deleteBskt', bsktId);
    },
    popupDiscountActive(bskt) {
      this.$emit('popupEvent', 'popupDiscountInfo', bskt);
    },
    popupCouponActive(itemCpnList, dblDcCpnList, itemNm, bsktId, itemDcSprc, bsktQty) {
      this.$emit('openCouponPopup', itemCpnList, dblDcCpnList, itemNm, bsktId, itemDcSprc, bsktQty);
    },
    popupDateActive() {
      this.$emit('popupEvent', 'popupDateSelect');
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
    setChk(jndex, index, bsktId) {
      const chk = document.getElementById('chkList' + bsktId);
      const chkVal = chk.checked;
      this.delivType.supplFirmDtoList[jndex].bsktInqRsltDtoList[index].chk = chkVal;
      // console.log(this.delivType.supplFirmDtoList[jndex]);
      this.$emit('setItemChk', chkVal, this.index, bsktId);
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
    goItemDetail(itemId, storId, supplFirmCd, mallId) {
      if (mallId === '1') {
        location.href = SiteUtils.freshmo('/product_detail?itemId=' + itemId + '&storId=' + storId + '&supplFirmCd=' + supplFirmCd);
      } else {
        location.href = SiteUtils.dalimo('/product_detail?itemId=' + itemId + '&storId=' + storId + '&supplFirmCd=' + supplFirmCd);
      }
    },
    openItemOptnPopup(bskt) {
      this.$emit('openItemOptnPopup', bskt);
    },
    getCmplPromTxt(promId, itemPromGrpCd) {
      const cmpl = this.getCmpl(promId, itemPromGrpCd);
      return cmpl.promInfoTxt;
    },
    getCmpl(promId, itemPromGrpCd) {
      return this.itemCmplRsltDtoList.find(cmpl => cmpl.promId === promId && cmpl.itemGrpVal === itemPromGrpCd);
    },
    openCmplItemPopup(promId, itemPromGrpCd, ordTypeCd, delivTypeCd) {
      const cmpl = this.getCmpl(promId, itemPromGrpCd);
      this.$emit('openCmplItemPopup', cmpl, ordTypeCd, delivTypeCd);
    },
  },
  mounted() {
  },
  watch: {
    delivType: {
      handler() {
        // console.log("1111");
      }
    }
  }
};
</script>
