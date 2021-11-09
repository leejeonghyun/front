<!--
views/od/SC-FO-OD-GS-MP-004
-->
<template>
    <!-- START : 행사상품 레이어 -->
    <div id="popupEventProduct" class="wrap-layer event-list-layer" role="dialog" aria-labelledby="popupEventProduct" aria-modal="true" :class="[{active : this.modalActive.popupEventProduct}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-bottom-fixed">
        <div class="title"><h3>행사상품</h3></div>
        <p class="txt-event-desc">{{cmpl.promNm}}</p>
        <div class="scroll-area">
          <ul class="cart-product-list layer-list">
            <li v-for="(item, index) in itemList" v-bind:key="index">
              <dl>
                <dt>
                  <p class="tit">
                    <span class="inp-chk bg">
                      <input type="checkbox" name="eventList" :id="`${'eventList' + index}`" v-model="item.applYn" true-value="Y" false-value="N">
                      <label :for="`${'eventList' + index}`">{{item.itemNm}}</label>
                    </span>
                  </p>
                </dt>
                <dd class="thumb">
                  <span aria-label="혜택" class="ico-benefit" :class="{'plus' : orgMallId !== '11', 'double' : orgMallId === '11'}">{{cmpl.promDtlTypeCd === '201' ? (cmpl.beneApplVal + '+1') : '다다익선'}}</span>
                  <figure>
                    <a href="javascript://">
                      <img :src="getItemImg(item.itemImgUrl)" :alt="item.itemNm" v-if="item.itemImgUrl !== ''">
                      <img src="@/assets/images/img/img_product_nothumb.jpg" v-if="item.itemImgUrl === ''">
                    </a>
                  </figure>
                </dd>
                <!-- 4월수정 START : 옵션 추가 -->
                <dd class="option-text" v-if="item.optnItemYn === 'Y'">
                  <p class="point">{{item.skuNm}}</p>
                </dd>
                <!-- 4월수정 END : 옵션 추가 -->
                <dd class="option-number">
                  <button type="button" class="btn-minus" title="추가" @click="decreaseCount(item)"><span class="hidden">선택수량 빼기</span></button>
                  <input type="number" name="" class="txt-number" v-model="item.itemBsktPutQty">
                  <button type="button" class="btn-plus" @click="increaseCount(item)"><span class="hidden">선택수량 더하기</span></button>
                </dd>
                <dd class="sale-price" aria-label="정상가격">
                  <span class="number-sale-price">{{comma(item.dcAmt, item.mbsDcAmt)}}</span>
                  <span class="unit-won">원</span>
                </dd>
              </dl>
            </li>
          </ul>
        </div>
        <div class="wrap-btn">
          <button type="button" class="btn-lg btn-bg lightgreen"  @click="putCmplItem">담기</button>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 행사상품 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
import ImgUtils from '@/common/ImgUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupEventProduct",
  props: {
    cmpl: Object,
    pmbsJoinPrcnCd: String,
    mallId: String
  },
  data() {
    return {
      itemList: {},
      orgMallId: CookieUtils.getMallId(),
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupEventProduct');
      this.modalActiveEvent('popupEventProduct');
    },
    comma(price1, price2) {
      let price = price1;
      if (this.pmbsJoinPrcnCd === '0001' && price2 !== 0) {
        price = price2;
      }
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    // change value
    decreaseCount(item) {
      if ( item.itemBsktPutQty > 1 ) {
        item.itemBsktPutQty--;
      }
    },
    increaseCount(item) {
      if ( item.itemBsktPutQty < 999 ) {
        item.itemBsktPutQty++;
      }
    },
    putCmplItem() {
      const bsktPutDtoList = [];
      let bsktPutDto = {};
      for (let idx=0; idx<this.itemList.length; idx++) {
        if (this.itemList[idx].applYn === 'Y') {
          bsktPutDto = {};
          bsktPutDto.itemGrpSeqno = (idx + 1);
          bsktPutDto.itemCompoCd = '01';
          bsktPutDto.bsktTypeCd = '1';
          bsktPutDto.dspCtgId = '';
          bsktPutDto.itemId = this.itemList[idx].itemId;
          bsktPutDto.itemNm = this.itemList[idx].itemNm;
          bsktPutDto.skuId = this.itemList[idx].skuId;
          bsktPutDto.grpItemId = '';
          bsktPutDto.bsktQty = this.itemList[idx].itemBsktPutQty;
          bsktPutDto.ssevntId = '';
          bsktPutDto.delivDt = '';
          bsktPutDto.itemCd = '';
          bsktPutDto.mallId = this.mallId;
          bsktPutDtoList.push(bsktPutDto);
        }
      }

      if (bsktPutDtoList.length === 0) {
        this.$gsdialog.alert('추가하실 상품을 선택하세요.');
        return;
      }

      this.$emit('putCmplItem', bsktPutDtoList);
      // this.popupAction();
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
    }
  },
  mounted() {
    console.log(this.itemList);
    // this.itemList = this.cmpl.itemList.filter(item => item.applYn === 'N');
    this.itemList = this.cmpl.itemList;
    this.itemList&&this.itemList.forEach(item => item.itemBsktPutQty = 1);
    console.log(this.itemList);
    this.modalActiveEvent('popupEventProduct');
  },
  destroyed() {
    this.itemList.forEach(item => item.applYn = 'N');
  }
};
</script>
