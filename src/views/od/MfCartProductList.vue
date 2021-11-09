<!--
components/_temp/CartProductListMF
-->
<template>
<div>
  <!-- market block -->
  <div class="list_content__block" v-for="(supplInfo, idx) in bsktInqRsltDto.supplFirmDtoList" :key="'SUPPL_FIRM_INFO_'+idx">
    <div class="title_flex__area mallinfo">
      <div class="mall_title">
        <img :src="require('@/assets/images/mall_logo/'+supplInfo.mallId+'.png')" :alt="supplInfo.mallNm" class="mall_image">
        <strong v-if="supplInfo.mallId === '302' && !!bsktInqRsltDto.dawndeliYn">[ 새벽배송 ]</strong>
      </div>
      <div class="small_sum">
        <strong>{{(supplInfo.itemSprc + supplInfo.dlfee) - supplInfo.itemCpnDcAmt | currency }}</strong>원
      </div>
    </div>
    <div v-for="(dlfeeInfo, dlfeeIdx) in supplInfo.bsktInqByDlfeeIdDtoList" :key="'DLFEE_INFO_'+dlfeeIdx">
      <ul class="cart-product-list" v-if="!isListEmpty(dlfeeInfo.bsktInqRsltDtoList)">
        <li v-for="(bsktItem, bsktItemIdx) in dlfeeInfo.bsktInqRsltDtoList" :key="'BSK_ITEM_INFO_'+bsktItemIdx">
          <div class="inner">
            <dl>
              <dt>
                <p class="tit tit-link">
                  <span class="inp-chk bg">
                    <input type="checkbox" name="chkBsktList" :id="`chkList_${bsktItem.bsktId}`" :value="bsktItem.bsktId" :checked="bsktItem.chk" @click="setChk(bsktItem)">
                    <label :for="`chkList_ItemTilte_${bsktItem.bsktId}`">{{ bsktItem.itemNm }}</label>
                  </span>
                  <a href="javascript:;" class="tit-product" @click="goItemDetailAction(bsktItem)">{{ bsktItem.itemNm }}</a>
                </p>
              </dt>
              <dd class="thumb">
                <a href="javascript:;" @click="goItemDetailAction(bsktItem)">
                  <figure>
                    <img :src="getItemImg(bsktItem.itemImg)" @error="replaceByDefault" :alt="bsktItem.itemNm" v-if="bsktItem.itemImg !== ''">
                    <img src="@/assets/images/img/img_product_nothumb.jpg" v-if="bsktItem.itemImg === ''">
                  </figure>
                </a>
              </dd>
              <dd class="option" v-if="bsktItem.optnItemYn === 'Y'">
                <p class="option-info">
                  <button type="button" aria-label="옵션 팝업활성화" aria-haspopup="dialog" @click="popupOptionActive(bsktItem)">
                    옵션 : {{bsktItem.skuNm}} {{ bsktItem.skuAddAmt > 0 ? `(${toComma(bsktItem.skuAddAmt)}원)` : '' }}
                  </button>
                </p>
              </dd>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount(bsktItem)"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="inpBsktQty" v-model="bsktItem.bsktQty" class="txt-number" title="선택 수량" min="1" max="999" @blur="updateBskt(bsktItem)" @focus="setkstQtyTemp(bsktItem.bsktQty);">
                <button type="button" class="btn-plus" @click="increaseCount(bsktItem)"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="list-price" aria-label="정상가격" v-if="calcNormSprc(bsktItem) > calcItemSprc(bsktItem)">
                <del>{{ calcNormSprc(bsktItem) | currency }}</del>원
              </dd>
              <dd class="sale-price" aria-label="판매가격">
                <span class="number-sale-price">{{ calcItemSprc(bsktItem) | currency }}</span>
                <span class="unit-won">원</span>
                <button type="button" class="btn-infomation small" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupDiscountActive(bsktItem)">
                  <span class="hidden">할인 안내</span>
                </button>
              </dd>
            </dl>
            <div class="btn-bottom">
              <ul class="product-info">
                <li v-if="dlfeeInfo.dlfeeAddStandQty > 0">{{dlfeeInfo.dlfeeAddStandQty}}개 묶음당 배송비추가</li>
                <li v-if="calcFreeDlfeeAmt(dlfeeInfo, bsktItem) === 0">무료배송</li>
                <li v-if="bsktItem.cardDcYn === 'Y'">카드할인</li>
              </ul>
              <p class="btn-area">
                <button type="button" class="btn-border btn-coupon" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog" @click="popupCouponActive(bsktItem)"
                  v-if="!isListEmpty(bsktItem.ordsItemCpnPromExpnsInqRsltList)">쿠폰변경
                </button>
                <button type="button" :class="['btn-border', 'btn-keep', {'active' : bsktItem.bsktKeepYn == 'Y'}]" @click="updateBsktKeepYn(bsktItem)">
                  {{bsktItem.bsktKeepYn == 'N' ? '계속보관' : '보관해제'}}
                </button>
              </p>
            </div>
            <p><button type="button" class="btn-del" @click="deleteBsktAction('B', idx, dlfeeIdx, bsktItemIdx)"><span class="hidden">삭제</span></button></p>
          </div>
        </li>
      </ul>
      <div class="total-price-info" v-if="!isListEmpty(dlfeeInfo.bsktInqRsltDtoList)">
        <p class="price-info">
          <span class="total-info-txt">
            상품금액 {{dlfeeInfo.totItemSprc - dlfeeInfo.totItemCpnDcAmt | currency }}원
            + 배송비 {{dlfeeInfo.totDlfee | currency}}원
            = {{(dlfeeInfo.totItemSprc + dlfeeInfo.totDlfee) - dlfeeInfo.totItemCpnDcAmt | currency }}원
          </span>
        </p>
        <!--
          배송비적용유형코드가 배송처조건부무료('CD') 인 경우 만 무료배송 추천상품팝업을 노출한다.
          * FR:무료 (Free)
          * CD:배송처조건부무료 ( Conditional Distributor Free )
          * CI:상품조건부무료 ( Conditional Items Free )
          * PA:유료 ( Pay )
          * PQ:수량별 부과( Pay per quantity )
         -->
        <button type="button" class="btn-go-today" aria-label="추천상품 팝업 활성화" aria-haspopup="dialog" @click="popupRecommendActive(supplInfo, dlfeeInfo)" v-if="dlfeeInfo.dlfeeApplTypeCd === 'CD'">
          <span v-if="(dlfeeInfo.freeDelivStandAmt - (dlfeeInfo.totItemSprc - dlfeeInfo.totItemCpnDcAmt)) > 0">
            {{supplInfo.mallNm}} <strong>{{dlfeeInfo.freeDelivStandAmt - (dlfeeInfo.totItemSprc - dlfeeInfo.totItemCpnDcAmt) | currency}}원 더 담고</strong> 무료배송 받기
          </span>
          <span v-else>
            {{supplInfo.mallNm}} 상품 더보기
          </span>
        </button>
      </div>
    </div>
    <!-- soldout market block -->
    <div class="list_content__block soldout" v-if="!isListEmpty(supplInfo.soldoutBsktInqRsltDtoList)">
      <ul class="cart-product-list">
        <li v-for="(soldInfo, soldIdx) in supplInfo.soldoutBsktInqRsltDtoList" :key="'SOLD_ITEM_INFO_'+soldIdx" class="soldout">
          <div class="inner">
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="soldChkList" :id="`soldChkList${soldIdx}`" disabled="disabled">
                    <label :for="`soldChkList${soldIdx}`">{{ soldInfo.itemNm }}</label>
                  </span>
                  <a href="javascript:;" class="tit-product" @click="goItemDetailAction(soldInfo)">{{ soldInfo.itemNm }}</a>
                </p>
              </dt>
              <dd class="thumb">
                <a href="javascript:;" @click="goItemDetailAction(soldInfo)">
                  <figure>
                    <img :src="getItemImg(soldInfo.itemImg)" @error="replaceByDefault" :alt="soldInfo.itemNm" v-if="soldInfo.itemImg !== ''">
                    <img src="@/assets/images/img/img_product_nothumb.jpg" v-if="soldInfo.itemImg === ''">
                  </figure>
                </a>
              </dd>
              <dd class="option" v-if="soldInfo.optnItemYn === 'Y'">
                <p class="option-info"><button type="button" aria-label="옵션 팝업활성화" aria-haspopup="dialog" @click="popupOptionActive(soldInfo)">옵션 : {{soldInfo.skuNm}}</button></p>
              </dd>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" :value="soldInfo.bsktQty" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="list-price" aria-label="정상가격" v-if="calcNormSprc(soldInfo) > calcItemSprc(soldInfo)">
                <del>{{ calcNormSprc(soldInfo) | currency }}</del>원
              </dd>
              <dd class="sale-price" aria-label="판매가격">
                <span class="number-sale-price">{{ calcItemSprc(soldInfo) | currency }}</span>
                <span class="unit-won">원</span>
              </dd>
            </dl>
            <div class="btn-bottom">
              <ul class="product-info"></ul>
              <p class="btn-area">
                <button type="button" class="btn-border btn-coupon" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog" @click="popupCouponActive(soldInfo)"
                  v-if="!isListEmpty(soldInfo.ordsItemCpnPromExpnsInqRsltList)">쿠폰변경
                </button>
                <button type="button" :class="['btn-border', 'btn-keep', {'active' : soldInfo.bsktKeepYn == 'Y'}]" @click="updateBsktKeepYn(soldInfo)">
                  {{soldInfo.bsktKeepYn == 'N' ? '계속보관' : '보관해제'}}
                </button>
              </p>
            </div>
            <p><button type="button" class="btn-del" @click="deleteBsktAction('S', idx, null, soldIdx)"><span class="hidden">삭제</span></button></p>
          </div>
        </li>
      </ul>
    </div>
    <!-- // soldout market block -->
  </div>
  <!-- // market block -->
</div>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';

import OrderMsg from '@/components/order/MfOrderMsg';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import LoginUtils from '@/common/LoginUtils';
import ApiUtils from '@/common/ApiUtils';
import ImgUtils from '@/common/ImgUtils';
import SiteUtils from '@/common/SiteUtils';

export default {
  name: "MfCartProductList",
  props: {
    cmmSiteClass: String,
    bsktInqRsltDto: Object,
    mbrDlvp: Object,
  },
  data() {
    return {
      bsktQtyTemp: 0, // 장바구니상품 수량(임시)
      bsktMinQty: 1, // 장바구니상품최소구매수량
      bsktMaxQty: 999, // 장바구니상품최대구매수량
    };
  },
  mixins: [LayerPopupMixin],
  components: {},
  filters: {
    currency: function(val) {
      return NumberUtils.toComma(val);
    },
  },
  methods: {
    toComma(val) {
      return NumberUtils.toComma(val);
    },
    setChk(bsktItem) {
      bsktItem.chk = !bsktItem.chk;
      this.$emit('setChk');
    },
    isListEmpty: function (x) {
      return (x != null && Object.entries(x).length > 0) ? false : true;
    },
    showLoading(flag) {
      this.$emit('showLoading', flag);
    },
    popupAction(type) {
      this.$emit('popupEvent', type);
    },
    popupRecommendActive(supplFirmInfo, dlfeeInfo) {
      this.$emit('openTodayDeliveryPopup', supplFirmInfo, dlfeeInfo);
    },
    popupCouponActive(bsktItem) {
      this.$emit('openCouponPopup', bsktItem);
    },
    // 옵션선택 팝업 레이어 호출 함수
    popupOptionActive(bsktItem) {
      this.$emit('openOptionPopup', bsktItem);
    },
    // 할인상세 팝업 레이어 호출 함수
    popupDiscountActive(bsktItem) {
      this.$emit('openDiscountPopup', bsktItem);
    },
    // 상품 이미지 경로 보정처리 함수
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
    // 상품 이미지가 오류인 경우 아래 경로로 대체
    replaceByDefault(e) {
      e.target.src = imgProductNothumb;
    },
    // 로그인 화면으로 이동 함수
    goLogin() {
      const returnUrl = location.href;
      const urlList = [];
      urlList[urlList.length] = "/cu/find_id_password";
      const urlCnt = urlList.filter(excptUrl => {
        return returnUrl.indexOf(excptUrl) > -1;
      }).length;
      if (urlCnt > 0) {
        SiteUtils.go(location.host, '/cu/login?returnUrl=' + encodeURIComponent(location.host));
      } else {
        SiteUtils.go(location.host, '/cu/login?returnUrl=' + encodeURIComponent(returnUrl));
      }
    },
    // 상품에 대한 정상가 정보 계산 함수
    calcNormSprc(bsktItem) {
      return (bsktItem.normSprc + bsktItem.skuAddAmt) * bsktItem.bsktQty;
    },
    // 상품에 대한 판매가 정보 계산 함수
    calcItemSprc(bsktItem) {
      // 적용쿠폰에 대한 할인금액 Set
      let itemCpnDcAmt = 0;
      if (!this.isListEmpty(bsktItem.ordsItemCpnPromExpnsInqRsltList)) {
        itemCpnDcAmt = this.$parent.calcItemCoupon(bsktItem.ordsItemCpnPromExpnsInqRsltList.find(cpnInfo => cpnInfo.applYn === true), bsktItem.sellAmt, bsktItem.bsktQty);
      }
      return ((bsktItem.sellAmt + bsktItem.skuAddAmt) * bsktItem.bsktQty ) - itemCpnDcAmt;
    },
    // 배송비가 무료인지 여부 체크
    calcFreeDlfeeAmt(dlfeeInfo, itemInfo) {
      return this.$parent.calcDlfeeAmt(dlfeeInfo, itemInfo);
    },
    // 상품에 대한 보관 여부를 처리하는 함수 (계속보관/보관해제 기능 처리)
    async updateBsktKeepYn(bsktItem) {
      if (!LoginUtils.isLogin()) {
        this.$gsdialog.alert(OrderMsg.noLogin).then(dialog => {
          this.goLogin();
        });
        return;
      } else {
        bsktItem.bsktKeepYn = bsktItem.bsktKeepYn == 'Y' ? 'N' : 'Y';
        const iBsktPut = {
          bsktId: bsktItem.bsktId,
          bsktKeepYn: bsktItem.bsktKeepYn,
        };
        this.showLoading(true);
        const result = await ApiUtils.put('/fo/od/mf/bsktmgnt/basket-item-keep', iBsktPut);
        this.showLoading(false);
      }
    },
    // 장바구나 수량 감소 처리 함수
    decreaseCount(bsktItem) {
      const itemSellUnitQty = !!bsktItem.itemSellUnitQty && bsktItem.itemSellUnitQty > 0 ? bsktItem.itemSellUnitQty : 1;
      if (bsktItem.bsktQty >= (this.bsktMinQty - itemSellUnitQty)) {
        this.bsktQtyTemp = bsktItem.bsktQty;
        bsktItem.bsktQty = Number(bsktItem.bsktQty) - itemSellUnitQty;
        this.updateBskt(bsktItem);
      }
    },
    // 장바구나 수량 증가 처리 함수
    increaseCount(bsktItem) {
      const itemSellUnitQty = !!bsktItem.itemSellUnitQty && bsktItem.itemSellUnitQty > 0 ? bsktItem.itemSellUnitQty : 1;
      if (bsktItem.bsktQty <= (this.bsktMaxQty - itemSellUnitQty)) {
        this.bsktQtyTemp = bsktItem.bsktQty;
        bsktItem.bsktQty = Number(bsktItem.bsktQty) + itemSellUnitQty;
        this.updateBskt(bsktItem);
      }
    },
    // 장바구니수량 Update 처리 함수
    updateBskt(bsktItem) {
      // 상품 최소/최대 수량 체크
      if (bsktItem.bsktQty < this.bsktMinQty) {
        this.$gsdialog.alert(OrderMsg.posbBsktQty('최소', this.bsktMinQty));
        bsktItem.bsktQty = this.bsktQtyTemp;
        this.$emit('actionEventCntl', '2'); // 상품수량 KeyIn Focus Out 이벤트의 경우 처리 함수 호출
        return;
      } else if (bsktItem.bsktQty > this.bsktMaxQty) {
        this.$gsdialog.alert(OrderMsg.posbBsktQty('최대', this.bsktMaxQty));
        bsktItem.bsktQty = this.bsktQtyTemp;
        this.$emit('actionEventCntl', '2'); // 상품수량 KeyIn Focus Out 이벤트의 경우 처리 함수 호출
        return;
      }
      // 상품 수량이 변경 전/후가 다르면 Update 처리
      if (this.bsktQtyTemp !== bsktItem.bsktQty) {
        this.$emit('updateBskt', bsktItem);
      } else {
        // 상품수량이 변경이 없을 경우 결제버튼 클릭으로 발생한 이벤트의 경우 처리 함수 호출
        this.$emit('actionEventCntl', '3');
      }
    },
    setkstQtyTemp(bsktQty) {
      this.bsktQtyTemp = bsktQty;
      this.$emit('actionEventCntl', '1'); // 상품수량 KeyIn Focus 진입 시 이벤트 함수 호출
    },
    // 장바구니 상품 삭제 처리
    async deleteBsktAction(type, supplIdx, dlfeeIdx, bsktItemIdx) {
      let itemInfo = null;
      let confirmYn = false;
      if (type === 'B') { // 장바구니상품(품절아님)
        confirmYn = await this.$gsdialog.confirm("선택한 상품을 삭제하시겠습니까?");
        if (!confirmYn) return;
        itemInfo = this.bsktInqRsltDto.supplFirmDtoList[supplIdx].bsktInqByDlfeeIdDtoList[dlfeeIdx].bsktInqRsltDtoList.splice(bsktItemIdx, 1);
        // 삭제 대상 상품이 소속된 배송비ID 목록의 상품 갯수가 0이면 배송비ID 정보 삭제
        if (this.isListEmpty(this.bsktInqRsltDto.supplFirmDtoList[supplIdx].bsktInqByDlfeeIdDtoList[dlfeeIdx].bsktInqRsltDtoList)) {
          this.bsktInqRsltDto.supplFirmDtoList[supplIdx].bsktInqByDlfeeIdDtoList.splice(dlfeeIdx, 1);
        }
        // 삭제 대상 상품이 소속된 공급업체 목록의 상품 갯수가 0이고 품절상품이 0이면 배송비ID 정보 삭제
        if (this.isListEmpty(this.bsktInqRsltDto.supplFirmDtoList[supplIdx].bsktInqByDlfeeIdDtoList) &&
            this.isListEmpty(this.bsktInqRsltDto.supplFirmDtoList[supplIdx].soldoutBsktInqRsltDtoList)) {
          this.bsktInqRsltDto.supplFirmDtoList.splice(supplIdx, 1);
        }
      } else if (type === 'S') { // 장바구니상품(품절)
        confirmYn = await this.$gsdialog.confirm("선택한 품절상품을 삭제하시겠습니까?");
        if (!confirmYn) return;
        itemInfo = this.bsktInqRsltDto.supplFirmDtoList[supplIdx].soldoutBsktInqRsltDtoList.splice(bsktItemIdx, 1);
        // 삭제 대상 상품이 소속된 공급업체 목록의 상품 갯수가 0이고 품절상품이 0이면 배송비ID 정보 삭제
        if (this.isListEmpty(this.bsktInqRsltDto.supplFirmDtoList[supplIdx].bsktInqByDlfeeIdDtoList) &&
            this.isListEmpty(this.bsktInqRsltDto.supplFirmDtoList[supplIdx].soldoutBsktInqRsltDtoList)) {
          this.bsktInqRsltDto.supplFirmDtoList.splice(supplIdx, 1);
        }
      }
      if (!!itemInfo) {
        this.$emit('deleteBskt', itemInfo);
      }
    },
    // 상품상세 화면 이동 처리 함수
    goItemDetailAction(bsktItem) {
      this.$emit('goItemDetail', bsktItem);
    },
  },
  mounted() {},
};
</script>
