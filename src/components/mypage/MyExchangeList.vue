<template>
  <ul class="cart-product-list selected-list">
    <li v-for="(itemDtl, inx) in ordMstItemList" :key="inx">
      <dl>
        <dt>
          <span class="inp-chk">
            <input type="checkbox" name="chkList" :id="'chkList'+inx" :disabled="itemDtl.pkgYn == 'Y' || itemDtl.presFrgfYn == 'Y' || itemDtl.sampItemYn == 'Y'" v-model="itemDtl.chkFlag" :value="itemDtl.ordItemSeqno" @click="changeAmount(inx)" @change="getChkItemFlag(inx)">
            <label :for="'chkList'+inx">{{itemDtl.itemNm}}</label>
          </span>
        </dt>
        <dd class="thumb">
          <a href="#">
            <figure>
              <span v-if="itemDtl.nplsoneYn == 'Y'" aria-label="혜택" class="ico-benefit">{{itemDtl.nplsoneVal+'+1'}}</span>
              <img :src="show(itemDtl.itemImg)" :alt="itemDtl.itemNm" @error="replaceByDefault" v-if="isNotEmpty(itemDtl.itemImg)"/>
              <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="itemDtl.itemNm" v-else />
            </figure>
          </a>
        </dd>
        <dd class="option">
          <p class="point" v-if="itemDtl.firPurchItemYn == 'Y'">첫 구매 혜택</p>
          <p class="point" v-else-if="itemDtl.sampItemYn == 'Y'">맛보기 사은품</p>
          <p class="point" v-else-if="itemDtl.presFrgfYn == 'Y'">금액대별 사은품</p>
          <p class="option-info" v-else-if="itemDtl.itemId != itemDtl.skuId">옵션 : {{itemDtl.skuNm}}</p>
        </dd>
        <dd class="shop">{{itemDtl.cmmSteNm}}</dd>
        <dd class="count" v-if="!itemDtl.chkFlag">
          <p class="option-info">수량 {{itemDtl.ordQty}}</p>
        </dd>
        <dd class="count option-number" v-if="itemDtl.chkFlag">
          <button type="button" class="btn-minus" @click="decreaseCount(inx)"><span class="hidden">선택수량 빼기</span></button>
          <input type="number" name="claimQty" :id="'claimQty'+inx" v-model="itemDtl.claimQty" value="1" class="txt-number" title="선택 수량" @change="checkMaxClaimItemQty(inx)">
          <button type="button" class="btn-plus" @click="increaseCount(inx)"><span class="hidden">선택수량 더하기</span></button>
        </dd>
      </dl>
      <div class="wrap-select-box" v-if="itemDtl.pkgYn != 'Y' && itemDtl.sampItemYn != 'Y'">
        <p class="txt-info">
          <span class="wrap-select w100">
            <select :id="'selOrdClaimResn_'+itemDtl.itemId" title="교환 사유를 선택" :disabled="!itemDtl.chkFlag" v-model="itemDtl.ordClaimResnCd" @change="setOrdClaimResn(itemDtl)">
              <option value="" disabled selected>교환 사유를 선택해 주세요.</option>
              <option v-for="(resnDtl, resnInx) in ordClaimResnList" :key="resnInx" :value="resnDtl.commCd">{{resnDtl.commCdNm}}</option>
            </select>
          </span>
        </p>
        <!-- START : 고객 단순 변심 -->
        <div class="wrap-return-reason" v-if="chkClaimResn(itemDtl.ordClaimResnCd) === '1'">
          <p class="point">구매자가 교환 배송비를 부담해야 합니다.</p>
          <span class="inp-chk small">
            <input type="checkbox" name="eqResnAppl" :id="'eqResnAppl'+inx" v-model="eqResnApplObj.eqResnApplYn" @click="setEqResnApplInfo(itemDtl.ordClaimResnCd)" >
            <label :for="'eqResnAppl'+inx">동일사유 적용하기</label>
          </span>
          <span class="wrap-select w100">
            <select :id="'exchOrdSkuId'+inx" v-model="itemDtl.exchOrdSkuId" title="상품 옵션 변경">
              <option v-if="filterSkuList(itemDtl.itemId).length > 0" value="" selected disabled hidden>상품을 선택해주세요.</option>
              <option v-else value="" selected disabled hidden>교환 가능 상품이 없습니다.</option>
              <option v-for="(skuDtl, skuInx) in filterSkuList(itemDtl.itemId)" :key="skuInx" :value="skuDtl.skuId">{{skuDtl.skuNm}}</option>
            </select>
          </span>
        </div>
        <!-- END : 고객 단순 변심 -->
        <!-- START : 판매자 귀책사유 -->
        <div class="wrap-return-reason" v-if="chkClaimResn(itemDtl.ordClaimResnCd) === '2'">
          <p class="point">판매자가 교환 배송비를 부담합니다.</p>
          <span class="inp-chk small">
            <input type="checkbox" name="eqResnAppl" :id="'eqResnAppl'+inx" v-model="eqResnApplObj.eqResnApplYn" @click="setEqResnApplInfo(itemDtl.ordClaimResnCd)" >
            <label :for="'eqResnAppl'+inx">동일사유 적용하기</label>
          </span>
          <div class="wrap-textarea">
            <textarea name="ordClaimReqCnts" :id="'ordClaimReqCnts'+inx" v-model="itemDtl.ordClaimReqCnts" :placeholder="placeholder"></textarea>
          </div>
          <div class="wrap-photo">
            <swiper :options="swiperOptionScrollX" class="wrap-list-photo">
              <swiper-slide>
                <input type="file" :id="`uploadPhoto`+inx" class="hidden btn-add" :ref="`fileInput`+inx" @change="onFileUpload(inx)" accept="image/*"/>
                <label :for="`uploadPhoto`+inx">
                  <span class="count" aria-label="이미지 등록개수">{{isNotEmpty(itemDtl.imageList)?itemDtl.imageList.length:0}}</span>/
                  <span class="total" aria-label="이미지 최대등록개수">{{maxImgCnt}}</span>
                </label>
              </swiper-slide>
              <swiper-slide v-for="(image, imgIdx) in itemDtl.imageList" :key="imgIdx">
                <div class="thumb">
                  <figure>
                    <img :src="image.attFileUrl" alt="고객등록 사진" />
                  </figure>
                  <button type="button" class="btn-delete" aria-label="이미지첨부삭제" @click="onFileDelete(inx, imgIdx)"></button>
                </div>
              </swiper-slide>
              <div class="swiper-scrollbar" slot="scrollbar"></div>
            </swiper>
          </div>
          <p class="list-dot"> 이미지는 최대 5MB이내 / 최대 {{maxImgCnt}}장 첨부 가능</p>
        </div>
        <!-- END : 판매자 귀책사유 -->
      </div>
      <MyExchangeListSub v-if="filterSubItemList(itemDtl).length > 0"
        :eqResnApplObj="eqResnApplObj"
        :ordInfoRslt="ordInfoRslt"
        :ordMstItem="itemDtl"
        :ordSubItemList="filterSubItemList(itemDtl)"
        :skuList="skuList"
        :ordClaimResnList="ordClaimResnList"
        :chkDelivTypeId="chkDelivTypeId"
        @retrieveExchSkuInfo="retrieveExchSkuInfo"
        @eqResnApplEvent="setEqResnApplInfo"
        @claimResnEvent="setOrdClaimResn"
        @refndEvent="getCheckedItemInfo"/>
    </li>
  </ul>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import MyExchangeListSub from '@/components/mypage/MyExchangeListSub'; // 하위 상품 목록
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import ImgUtils from '@/common/ImgUtils';
export default {
  name: "MyExchangeList",
  data() {
    return {
      placeholder: '교환 사유를 자세히 적어주세요.\n직접적인 사유와 이미지를 첨부해주시면 교환 절차를 빠르게 진행할 수 있습니다.',
      eqResnApplObj: {
        eqResnApplYn: false, // 동일사유적용여부
        eqResnApplCd: null, // 동일사유적용Index
      },
      swiperOptionScrollX: {
        slidesPerView: 'auto',
        freeMode: true,
        containerModifierClass: 'wrap-list-photo ',
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
        },
      },
      skuList: [], // 단품목록
      custCentTel: {}, // 고객센터 전화번호 정보
      maxImgCnt: 5, // 총 이미지 수
    };
  },
  props: {
    ordInfoRslt: Object,
    ordMstItemList: Array,
    ordSubItemList: Array,
    ordClaimResnList: Array,
    chkDelivTypeId: String,
  },
  mixins: [],
  components: {
      swiper,
      swiperSlide,
      MyExchangeListSub,
  },
  methods: {
    getChkItemFlag(itemInx) {
      const mstItemCnt = this.ordMstItemList.filter(itemDtl => {
        return itemDtl.chkFlag != true;
      }).length;
      const addItemCnt = this.ordSubItemList.filter(itemDtl => {
        return itemDtl.chkFlag != true;
      }).length;
      if (mstItemCnt > 0 || addItemCnt > 0) {
        document.getElementById(this.chkDelivTypeId).checked = false;
      } else {
        document.getElementById(this.chkDelivTypeId).checked = true;
      }
    },
    // 체크박스 선택 시 유효성 체크
    validateChkItem(itemDtl) {
      let rtnFlag = false;
      if (itemDtl.apchItemYn == 'Y') {
        // 임박상품은 선택 불가능.
        this.$gsdialog.alert("임박상품은 교환 신청 대상 상품이 아닙니다.", {html: true});
        rtnFlag = true;
      } else if (itemDtl.presFrgfYn != 'Y' && itemDtl.itemExchRtnPosbYn == 'N') {
        // 사은품이 아니고 상품교환반품가능여부가 'N' 이면 선택 불가능
        this.$gsdialog.alert("교환 신청 대상 상품이 아닙니다.", {html: true});
        rtnFlag = true;
      } else if (itemDtl.delivTypeCd == '05') {
        // 해외직구배송이면 선택 불가능
        this.$gsdialog.alert("해외배송 상품은 교환 신청 대상이 아닙니다.", {html: true});
        rtnFlag = true;
      } else if (itemDtl.spckItemYn == 'Y') {
        // 심플리쿡상품이면 선택 불가능
        this.$gsdialog.alert("심플리쿡 상품은 교환 신청 대상이 아닙니다.", {html: true});
        rtnFlag = true;
      } else if (itemDtl.ordTypeCd == '50') {
        // 예약배송 상품이면 선택 불가능
        this.$gsdialog.alert("사전예약 상품은 교환 신청 대상이 아닙니다.", {html: true});
        rtnFlag = true;
      }
      return rtnFlag;
    },
    // 체크박스 선택
    changeAmount(inx) {
      // 선택 불가 상품인지 체크
      if (this.validateChkItem(this.ordMstItemList[inx])) {
        document.getElementById("chkList"+inx).checked = !document.getElementById("chkList"+inx).checked;
        return;
      }
      // 상품 재고가 없으면 선택 할 수 없음.
      if (this.ordMstItemList[inx].sellPosbQty == null || this.ordMstItemList[inx].sellPosbQty == 0) {
        this.$gsdialog.alert(this.ordMstItemList[inx].itemNm+"상품의 재고가 없습니다.<br/>교환신청을 원하시면 1:1문의 혹은 고객센터("+this.custCentTel.commCdNm+")로 문의 바랍니다.", {html: true});
        document.getElementById("chkList"+inx).checked = !document.getElementById("chkList"+inx).checked;
        return;
      }
      this.ordMstItemList[inx].chkFlag = !this.ordMstItemList[inx].chkFlag;
      this.ordMstItemList[inx].claimQty = this.ordMstItemList[inx].ordQty < this.ordMstItemList[inx].sellPosbQty ? this.ordMstItemList[inx].ordQty : this.ordMstItemList[inx].sellPosbQty;
      this.ordMstItemList[inx].ordClaimResnCd = '';
      this.ordMstItemList[inx].attFileId = '';
      this.ordMstItemList[inx].imageList = [];
      if (this.eqResnApplObj.eqResnApplYn) {
        this.setEqResnApplInfo(this.eqResnApplObj.eqResnApplCd);
      } else {
        // 교환 대상 단품 목록 정보 조회
        this.retrieveExchSkuInfo(this.ordMstItemList[inx]);
      }
      // 주문교환 추가배송비 조회
      this.getCheckedItemInfo();
    },
    // chage value
    decreaseCount(inx) {
      const claimQty = event.currentTarget;
      if (this.ordMstItemList[inx].claimQty > 1) {
        this.ordMstItemList[inx].claimQty -= 1;
        // 주문교환 추가배송비 조회
        this.getCheckedItemInfo();
      }
    },
    increaseCount(inx) {
      if (this.ordMstItemList[inx].claimQty >= this.ordMstItemList[inx].sellPosbQty) {
        this.$gsdialog.alert(this.ordMstItemList[inx].itemNm+"상품의 재고수량이 "+this.ordMstItemList[inx].sellPosbQty+"개입니다.<br/>그 이상의 교환신청은 1:1문의 혹은 고객센터("+this.custCentTel.commCdNm+")로 문의 바랍니다.", {html: true});
        return;
      }
      if (this.ordMstItemList[inx].claimQty < Number(this.ordMstItemList[inx].ordQty)) {
        this.ordMstItemList[inx].claimQty += 1;
        // 주문교환 추가배송비 조회
        this.getCheckedItemInfo();
      }
    },
    checkMaxClaimItemQty(inx) { // 최대클레임상품갯수 체크
      if (this.ordMstItemList[inx].claimQty >= this.ordMstItemList[inx].sellPosbQty) { // 최대클레임상품 갯수는 판매가능수량을 초과 할 수 없음.
        this.$gsdialog.alert(this.ordMstItemList[inx].itemNm+"상품의 재고수량이 "+this.ordMstItemList[inx].sellPosbQty+"개입니다.<br/>그 이상의 교환신청은 1:1문의 혹은 고객센터("+this.custCentTel.commCdNm+")로 문의 바랍니다.", {html: true});
        this.ordMstItemList[inx].claimQty = this.ordMstItemList[inx].sellPosbQty;
      }
      if (this.ordMstItemList[inx].claimQty > Number(this.ordMstItemList[inx].ordQty)) { // 최대클레임상품 갯수는 주문수량을 초과 할 수 없음.
        this.ordMstItemList[inx].claimQty = this.ordMstItemList[inx].ordQty;
      }
      // 주문교환 추가배송비 조회
      this.getCheckedItemInfo();
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    show(uri) {
      if (this.isEmpty(uri)) {
        return;
      }
      return ImgUtils.path(uri);
    },
    replaceByDefault(e) {
      e.target.src = imgProductNothumb;
    },
    setEqResnApplInfo(resnApplCd) {
      this.eqResnApplObj.eqResnApplYn = this.isNotEmpty(event.target.checked) ? event.target.checked : this.eqResnApplObj.eqResnApplYn;
      if (this.eqResnApplObj.eqResnApplYn) {
        this.eqResnApplObj.eqResnApplCd = resnApplCd;
      }
      for (let inx = 0; inx < this.ordMstItemList.length; inx++) {
        if (!this.ordMstItemList[inx].chkFlag) {
          continue;
        }
        if (this.ordMstItemList[inx].ordClaimResnCd != resnApplCd) {
          if (this.eqResnApplObj.eqResnApplYn) {
            this.ordMstItemList[inx].ordClaimResnCd = resnApplCd;
            if (this.ordMstItemList[inx].ordClaimResnCd != "01") {
              this.ordMstItemList[inx].exchOrdSkuId = this.ordMstItemList[inx].skuId;
            } else { // 단순변심 인 경우 교환 대상 단품 목록 정보 조회
              this.ordMstItemList[inx].exchOrdSkuId = "";
              // 교환 대상 단품 목록 정보 조회
              this.retrieveExchSkuInfo(this.ordMstItemList[inx]);
            }
          }
        }
      }
      for (let inx = 0; inx < this.ordSubItemList.length; inx++) {
        if (!this.ordSubItemList[inx].chkFlag) {
          continue;
        }
        if (this.ordSubItemList[inx].ordClaimResnCd != resnApplCd) {
          if (this.eqResnApplObj.eqResnApplYn) {
            this.ordSubItemList[inx].ordClaimResnCd = resnApplCd;
            if (this.ordSubItemList[inx].ordClaimResnCd != "01") {
              this.ordSubItemList[inx].exchOrdSkuId = this.ordSubItemList[inx].skuId;
            } else { // 단순변심 인 경우 교환 대상 단품 목록 정보 조회
              this.ordSubItemList[inx].exchOrdSkuId = "";
              // 교환 대상 단품 목록 정보 조회
              this.retrieveExchSkuInfo(this.ordSubItemList[inx]);
            }
          }
        }
      }
      if (event.target.name == 'eqResnAppl') {
        // 주문교환 추가배송비 조회
        this.getCheckedItemInfo();
      }
    },
    setOrdClaimResn(itemDtl) { // 교환사유 변경 시 동일사유적용 여부 체크 후 처리 함수
      // 주문했던 단품ID로 기본 선택
      itemDtl.exchOrdSkuId = itemDtl.skuId;
      if (this.eqResnApplObj.eqResnApplYn) {
        this.setEqResnApplInfo(itemDtl.ordClaimResnCd);
      } else {
        if (itemDtl.ordClaimResnCd == "01") { // 단순변심 인 경우 교환 대상 단품 목록 정보 조회
          // 교환 대상 단품 목록 정보 조회
          this.retrieveExchSkuInfo(itemDtl);
        }
      }
      // 주문교환 추가배송비 조회
      this.getCheckedItemInfo();
    },
    filterSubItemList(selItemDtl) {
      return this.ordSubItemList.filter(itemDtl => {
        if (this.isNotEmpty(selItemDtl.grpItemId)) {
          return itemDtl.grgItemId == selItemDtl.grgItemId;
        } else {
          return itemDtl.ordDtlSeqno == selItemDtl.ordDtlSeqno && itemDtl.relatOrdSeqno == selItemDtl.ordItemSeqno;
        }
      });
    },
    filterSkuList(selItemId) {
      return this.skuList.filter(itemDtl => {
        return itemDtl.itemId == selItemId;
      });
    },
    getCheckedItemInfo() {
      this.$emit('refndEvent');
    },
    retrieveExchSkuInfo(itemDtl) { // 교환신청 시 해당 상품의 단품목록 정보 조회
      if (this.filterSkuList(itemDtl.itemId).length > 0) {
        return;
      }
      const params = {
        ordId: itemDtl.ordId,
        itemId: itemDtl.itemId,
        skuAddAmt: itemDtl.skuAddAmt
      };
      ApiUtils.get('/fo/cs/claimmgnt/order-exch-sku-info', params)
        .then(res => {
          if (res.data === null || res.data.data.length === 0) {
            return;
          }
          const skuList = res.data.data;
          for (let skuInx = 0; skuInx < skuList.length; skuInx++) {
            this.skuList.push(skuList[skuInx]);
          }
        }
      );
    },
    async onFileUpload(itemInx) {
      // 업로드 파일 갯수 체크
      const imgList = this.ordMstItemList[itemInx].imageList;
      if (this.isNotEmpty(imgList) && imgList.length >= this.maxImgCnt) {
        this.$gsdialog.alert('이미지 파일은 최대 '+this.maxImgCnt+'개까지 업로드가 가능합니다.');
        return;
      }
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      formData.append('fileTokenId', this.isEmpty(this.ordMstItemList[itemInx].attFileId) ? '' : this.ordMstItemList[itemInx].attFileId);
      await ApiUtils.post('/fo/cm/filemgnt/file', formData).then((res) => {
        if (res.data === null || !res.data.success) {
          this.$gsdialog.alert('파일업로드에 실패하였습니다.');
          return;
        } else {
          const returnData = res.data.data;
          // 정상 등록 여부 체크 (resultCode : 1(정상), 2(파일사이즈초과), 3(파일확장자체크오류, 4(기타))
          if (returnData.resultCode == 2) {
            this.$gsdialog.alert('이미지 파일 크기가 5M를 초과 하였습니다.');
            return;
          } else if (returnData.resultCode == 3) {
            this.$gsdialog.alert('업로드가 불가능한 이미지 파일입니다.');
            return;
          } else if (returnData.resultCode == 4) {
            this.$gsdialog.alert('파일업로드에 실패하였습니다.');
            return;
          }
          // 첨부파일ID Set
          if (this.isEmpty(this.ordMstItemList[itemInx].attFileId)) {
            this.ordMstItemList[itemInx].attFileId = returnData.fileTokenId;
          }
          // 이미지 파일 Push
          if (this.isEmpty(this.ordMstItemList[itemInx].imageList)) {
            this.ordMstItemList[itemInx].imageList = [];
          }
          this.ordMstItemList[itemInx].imageList.push(returnData);
        }
      });
    },
    onFileDelete(itemInx, imgIdx) {
      this.ordMstItemList[itemInx].imageList.splice(imgIdx, 1);
    },
    chkClaimResn(claimResnCd) {
      const claimResnList = this.ordClaimResnList;
      for (let idx = 0; idx < claimResnList.length; idx++) {
        if (claimResnList[idx].commCd == claimResnCd) {
          return claimResnList[idx].otherRefCd;
        }
      }
      return null;
    },
    // 공통코드 조회
    searchCommCd(commGrpCd) {
      const params = {
        commGrpCd: commGrpCd,
      };
      ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params)
      .then(res => {
        if (commGrpCd == 'CS0027') {
          this.custCentTel = res.data.data.filter(cdDtl => {
            return cdDtl.commCd == '04';
          })[0];
        }
      });
    },
  },
  mounted() {
    // 가맹점(GS 리테일) 속성 공통코드 조회
    this.searchCommCd("CS0027");
  },
  updated() {
  }
};
</script>
