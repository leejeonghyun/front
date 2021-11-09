<template>
  <ul class="cart-product-list selected-list">
    <li v-for="(itemDtl, inx) in ordMstItemList" :key="inx">
      <dl>
        <dt>
          <span class="inp-chk">
            <!-- 첫구매/맛보기/사은품은 체크박스가 비활성화한다. -->
            <input type="checkbox" name="chkList" :id="'chkList'+inx" :disabled="itemDtl.pkgYn == 'Y' || itemDtl.firPurchItemYn == 'Y' || itemDtl.presFrgfYn == 'Y' || itemDtl.sampItemYn == 'Y'" v-model="itemDtl.chkFlag" :value="itemDtl.ordItemSeqno" @click="changeAmount(inx)" @change="getChkItemFlag(inx)">
            <label :for="'chkList'+inx">{{itemDtl.itemNm}}</label>
          </span>
        </dt>
        <dd class="thumb">
          <a href="#">
            <figure>
              <span aria-label="혜택" class="ico-benefit" v-if="itemDtl.nplsoneYn == 'Y'">{{itemDtl.nplsoneVal+'+1'}}</span>
              <img :src="show(itemDtl.itemImg)" :alt="itemDtl.itemNm" @error="replaceByDefault" v-if="isNotEmpty(itemDtl.itemImg)"/>
              <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="itemDtl.itemNm" v-else />
            </figure>
          </a>
        </dd>
        <dd class="option">
          <p class="point" v-if="itemDtl.firPurchItemYn == 'Y'">첫 구매 혜택</p>
          <p class="point" v-else-if="itemDtl.sampItemYn == 'Y'">맛보기 사은품</p>
          <p class="point" v-else-if="itemDtl.presFrgfYn == 'Y'">금액대별 사은품</p>
          <p class="option-info" v-else-if="isNotEmpty(itemDtl.skuNm) && itemDtl.itemId != itemDtl.skuId">옵션 : {{itemDtl.skuNm}}</p>
        </dd>
        <dd class="shop">{{itemDtl.cmmSteNm}}</dd>
        <dd class="count" v-if="!itemDtl.chkFlag || itemDtl.firPurchItemYn == 'Y' || itemDtl.presFrgfYn == 'Y' || itemDtl.sampItemYn == 'Y'">
          <p class="option-info">수량: {{itemDtl.ordQty}}개</p>
        </dd>
        <!-- 사은품은 수량선택박스가 비노출된다. -->
        <dd class="count option-number" v-if="itemDtl.chkFlag && itemDtl.firPurchItemYn != 'Y' && itemDtl.presFrgfYn != 'Y' && itemDtl.sampItemYn != 'Y'">
          <button type="button" class="btn-minus" @click="decreaseCount(inx)"><span class="hidden">선택수량 빼기</span></button>
          <input type="number" name="claimQty" :id="'claimQty'+inx" v-model="itemDtl.claimQty" value="1" class="txt-number" title="선택 수량" @change="checkMaxClaimItemQty(inx)">
          <button type="button" class="btn-plus" @click="increaseCount(inx)"><span class="hidden">선택수량 더하기</span></button>
        </dd>
        <!-- 패키지상품(상위)/첫구매/맛보기/사은품은 금액정보가 비노출된다. -->
        <dd class="list-price" aria-label="정상가격" v-if="itemDtl.pkgYn != 'Y' && itemDtl.presFrgfYn != 'Y' && isNotEmpty(itemDtl.itemSprc) && Number(itemDtl.itemSprc) > 0 && itemDtl.itemSprc != itemDtl.itemDcSprc">
          <del v-if="!itemDtl.chkFlag">{{toComma(Number(itemDtl.itemSprc) * Number(itemDtl.ordQty))}}</del>
          <del v-if="itemDtl.chkFlag">{{toComma((Number(itemDtl.itemSprc) * Number(itemDtl.claimQty)))}}</del>
          원
        </dd>
        <dd class="sale-price" aria-label="판매가격" v-if="itemDtl.pkgYn != 'Y' && itemDtl.presFrgfYn != 'Y' && isNotEmpty(itemDtl.itemDcSprc) && Number(itemDtl.itemDcSprc) > 0">
          <span class="number-sale-price" v-if="!itemDtl.chkFlag">{{toComma(Number(itemDtl.itemDcSprc) * Number(itemDtl.ordQty))}}</span>
          <span class="number-sale-price" v-if="itemDtl.chkFlag">{{toComma((Number(itemDtl.itemDcSprc) * Number(itemDtl.claimQty)))}}</span>
          <span class="unit-won">원</span>
        </dd>
      </dl>
      <!-- 패키지상품(상위)/첫구매/맛보기/사은품은 사유를 작성하지 않음. -->
      <div class="wrap-select-box" v-if="itemDtl.pkgYn != 'Y' && itemDtl.firPurchItemYn != 'Y' && itemDtl.presFrgfYn != 'Y' && itemDtl.sampItemYn != 'Y'">
        <p class="txt-info">
          <span class="wrap-select w100">
            <select :id="'selOrdClaimResn_'+itemDtl.itemId" title="반품 사유를 선택" :disabled="!itemDtl.chkFlag" v-model="itemDtl.ordClaimResnCd" @change="setOrdClaimResn(itemDtl)">
              <option value="" disabled selected>반품 사유를 선택해 주세요.</option>
              <option v-for="(resnDtl, resnInx) in ordClaimResnList" :key="resnInx" :value="resnDtl.commCd">{{resnDtl.commCdNm}}</option>
            </select>
          </span>
        </p>
        <!-- START : 고객 단순 변심 -->
        <div class="wrap-return-reason" v-if="chkClaimResn(itemDtl.ordClaimResnCd) === '1'">
          <p class="point">구매자가 반품 배송비를 부담해야 합니다.</p>
          <span class="inp-chk small">
            <input type="checkbox" name="eqResnAppl" :id="'eqResnAppl'+inx" v-model="eqResnApplObj.eqResnApplYn" @click="setEqResnApplInfo(itemDtl.ordClaimResnCd)" >
            <label :for="'eqResnAppl'+inx">동일사유 적용하기</label>
          </span>
        </div>
        <!-- END : 고객 단순 변심 -->
        <!-- START : 판매자 귀책사유 -->
        <div class="wrap-return-reason" v-if="chkClaimResn(itemDtl.ordClaimResnCd) === '2'">
          <p class="point">판매자가 반품 배송비를 부담합니다.</p>
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
      </div>
      <MyReturnListSub v-if="filterSubItemList(itemDtl).length > 0"
        :eqResnApplObj="eqResnApplObj"
        :ordInfoRslt="ordInfoRslt"
        :ordMstItem="itemDtl"
        :ordSubItemList="filterSubItemList(itemDtl)"
        :ordClaimResnList="ordClaimResnList"
        :chkDelivTypeId="chkDelivTypeId"
        @eqResnApplEvent="setEqResnApplInfo"
        @claimResnEvent="setOrdClaimResn"
        @refndEvent="getCheckedItemInfo"/>
    </li>
  </ul>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import MyReturnListSub from '@/components/mypage/MyReturnListSub'; // 개발용 실사용 컴포넌트 - 하위 상품 목록
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import ImgUtils from '@/common/ImgUtils';
export default {
  name: "MyReturnList",
  data() {
    return {
      placeholder: '반품 사유를 자세히 적어주세요.\n직접적인 사유와 이미지를 첨부해주시면 교환 절차를 빠르게 진행할 수 있습니다.',
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
    MyReturnListSub,
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
      if (itemDtl.presFrgfYn != 'Y' && itemDtl.pkgYn != 'Y' && itemDtl.itemExchRtnPosbYn == 'N') {
        // 사은품이 아니고 상품교환반품가능여부가 'N' 이면 선택 불가능
        this.$gsdialog.alert("반품 신청 대상 상품이 아닙니다.", {html: true});
        rtnFlag = true;
      }
      return rtnFlag;
    },
    changeAmount(inx) {
      // 선택 불가 상품인지 체크
      if (this.validateChkItem(this.ordMstItemList[inx])) {
        document.getElementById("chkList"+inx).checked = !document.getElementById("chkList"+inx).checked;
        return;
      }
      this.ordMstItemList[inx].chkFlag = !this.ordMstItemList[inx].chkFlag;
      this.ordMstItemList[inx].claimQty = this.ordMstItemList[inx].ordQty;
      this.ordMstItemList[inx].ordClaimResnCd = '';
      this.ordMstItemList[inx].attFileId = '';
      this.ordMstItemList[inx].imageList = [];
      // 하위 구성 상품 존제 시 체크 여부 처리
      const subItemList = this.filterSubItemList(this.ordMstItemList[inx]);
      for (let subIdx = 0; subIdx < subItemList.length; subIdx++) {
        // 증정사은품이 포함된 상품이 존재하면 메세지창 노출
        if (subItemList[subIdx].presFrgfYn == 'Y' && !this.ordMstItemList[inx].chkFlag) {
          subItemList[subIdx].chkFlag = this.ordMstItemList[inx].chkFlag;
        }
      }
      if (this.eqResnApplObj.eqResnApplYn) {
        this.setEqResnApplInfo(this.eqResnApplObj.eqResnApplCd);
      }
      // 주문교환 추가배송비 조회
      if (!event.target.checked) {
        this.getCheckedItemInfo();
      }
    },
    // chage value
    decreaseCount(inx) {
      const claimQty = event.currentTarget;
      if ( this.ordMstItemList[inx].claimQty > 1 ) {
        this.ordMstItemList[inx].claimQty -= 1;
        // 주문교환 추가배송비 조회
        this.getCheckedItemInfo();
        const subItemList = this.filterSubItemList(this.ordMstItemList[inx]);
        for (let itemInx = 0; itemInx < subItemList.length; itemInx++) {
          if (subItemList[itemInx].presFrgfYn == 'Y') {
            subItemList[itemInx].claimQty = 0;
            subItemList[itemInx].chkFlag = false;
          }
        }
      }
    },
    increaseCount(inx) {
      if (this.ordMstItemList[inx].claimQty < Number(this.ordMstItemList[inx].ordQty)) {
        this.ordMstItemList[inx].claimQty += 1;
        // 주문교환 추가배송비 조회
        this.getCheckedItemInfo();
        const subItemList = this.filterSubItemList(this.ordMstItemList[inx]);
        for (let itemInx = 0; itemInx < subItemList.length; itemInx++) {
          if (subItemList[itemInx].presFrgfYn == 'Y') {
            subItemList[itemInx].claimQty = 0;
            subItemList[itemInx].chkFlag = false;
          }
        }
      }
    },
    checkMaxClaimItemQty(inx) { // 최대클레임상품갯수 체크
      if (this.ordMstItemList[inx].claimQty > Number(this.ordMstItemList[inx].ordQty)) {
        this.ordMstItemList[inx].claimQty = this.ordMstItemList[inx].ordQty;
        this.$gsdialog.alert("수량은 주문 수량 이하로 입력 가능합니다.");
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
          }
        }
      }
      if (event.target.name == 'eqResnAppl') {
        // 주문교환 추가배송비 조회
        this.getCheckedItemInfo();
      }
    },
    setOrdClaimResn(itemDtl) { // 교환사유 변경 시 동일사유적용 여부 체크 후 처리 함수
      if (this.eqResnApplObj.eqResnApplYn) {
        this.setEqResnApplInfo(itemDtl.ordClaimResnCd);
      }
      // 주문교환 추가배송비 조회
      this.getCheckedItemInfo();
    },
    getCheckedItemInfo() {
      this.$emit('refndEvent');
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
  },
  mounted() {},
};
</script>
