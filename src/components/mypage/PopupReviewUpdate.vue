<template>
  <div id="popupReviewUpdate" class="wrap-full-popup popup-review-small" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupReviewUpdate}">
    <div class="header-popup">
      <strong>상품평 수정하기</strong>
    </div>
    <div class="full-popup-body scroll-area goods_review_step02"><!-- 20201116 progress 추가 -->
      <div class="pop-review__block">
        <div class="product-item__star">
          <figure class="img-box">
              <img
                :src="getImg(itmcInfo.itemCtnsFileNm)"
                :alt="itmcInfo.itemNm"
              />
          </figure>
          <div>
              <p>{{ itmcInfo.itemNm }}</p>
        <!--
              <div class="starbox">
                <span class="star" @click="starRatingAction(itmcInfo.itmcScor)"><em :style="'width:' + itmcInfo.itmcScor * 20 + '%'"></em></span>
                <span class="star_txt">{{getBestTxt(itmcInfo.itmcScor)}}</span>
              </div>
         -->
              <div class="wrap-star-rate">
                <div class="wrap-star">
                  <button class="star" :class="{active: itmcInfo.itmcScor >= 1}" @click="starRatingAction(1)" aria-label="1점"></button>
                  <button class="star" :class="{active: itmcInfo.itmcScor >= 2}" @click="starRatingAction(2)" aria-label="2점"></button>
                  <button class="star" :class="{active: itmcInfo.itmcScor >= 3}" @click="starRatingAction(3)" aria-label="3점"></button>
                  <button class="star" :class="{active: itmcInfo.itmcScor >= 4}" @click="starRatingAction(4)" aria-label="4점"></button>
                  <button class="star" :class="{active: itmcInfo.itmcScor >= 5}" @click="starRatingAction(5)" aria-label="5점"></button>
                </div>
                <span class="star_txt">{{getBestTxt(itmcInfo.itmcScor)}}</span>
              </div>
          </div>
        </div>
      </div>

      <div class="pop-review__block" v-if="itmcInfo.itmcScorListInqRsltDto.length > 0">
        <dl class="product-item__radio"
        v-for="(ctgValue, index) in ctgValueList"
                v-bind:key="index"
                v-bind:ctgValue="ctgValue">
        <!--  <span v-for="(ctgValue, index) in ctgValueList"
                v-bind:key="index"
                v-bind:ctgValue="ctgValue"
            >
        -->
            <dt>{{ctgValue.itmcStandCdNm}}<!---{{itmcInfo.itmcScorListInqRsltDto[index].itmcScor}}--></dt>
            <dd>
              <ul class="radio_round__list">
                <li><input type="radio" :id="'radioVal' + ctgValue.itmcStandCd + '0'" :name="'radioVal' + ctgValue.itmcStandCd" class="radio_round" @click="getDiv(ctgValue.itmcStandCd, index, 1)" :checked="itmcInfo.itmcScorListInqRsltDto[index].itmcScor == 1 ? 'true' : ''">
                <label :for="'radioVal' + ctgValue.itmcStandCd + '0'">{{getArraySplit(ctgValue.itmcScorNm, 0)}}</label></li>
                <li><input type="radio" :id="'radioVal' + ctgValue.itmcStandCd + '1'" :name="'radioVal' + ctgValue.itmcStandCd" class="radio_round" @click="getDiv(ctgValue.itmcStandCd, index, 2)" :checked="itmcInfo.itmcScorListInqRsltDto[index].itmcScor == 2 ? 'true' : ''">
                <label :for="'radioVal' + ctgValue.itmcStandCd + '1'">{{getArraySplit(ctgValue.itmcScorNm, 1)}}</label></li>
                <li><input type="radio" :id="'radioVal' + ctgValue.itmcStandCd + '2'" :name="'radioVal' + ctgValue.itmcStandCd" class="radio_round" @click="getDiv(ctgValue.itmcStandCd, index, 3)" :checked="itmcInfo.itmcScorListInqRsltDto[index].itmcScor == 3 ? 'true' : ''">
                <label :for="'radioVal' + ctgValue.itmcStandCd + '2'">{{getArraySplit(ctgValue.itmcScorNm, 2)}}</label></li>
              </ul>
            </dd>
         <!-- </span> -->
        </dl>
      </div>

      <div class="pop-review__block">
        <dl class="product-item__radio">
          <dt>구매후기를 알려주세요.</dt>
          <dd class="wrap-review-write">
            <div class="wrap-textarea placeholder-multiline">
              <textarea id = "txtCnt"
                      v-model="itmcCnts"
                      @keyup="iTextCounting()"
                      @focus="txtFocusIn"
                      @blur="txtFocusOut"
                      ></textarea>
              <div class="placeholder" v-html="placeholderTxt"></div>
              <div class="align-right">
                <span class="input-text-num"><span aria-label="입력한텍스트수">{{toCommaCvert(itmcCntsLen)}}</span>
                <span aria-label="입력최대텍스트수">{{toCommaCvert(limitedTxt)}}</span></span>
              </div>
            </div>
          </dd>
        </dl>
      </div>

      <div class="pop-review__block">
        <dl class="product-item__radio">
          <dt>상품 사진을 첨부해 보세요</dt>
          <dd class="text">
              <p>직접 찍은 사진을 올려주세요. 최대 10장까지 첨부 가능합니다.</p>
          </dd>
        </dl>
        <div class="wrap-photo">
          <button class="imgupload-btn" @click="imgCntChk">
                <label for="uploadPhoto">
                  <input type="file" :disabled="imageList != null && imageList.length > 9"
                  id="uploadPhoto"
                  :class="imageList != null && imageList.length > 9 ? '' : 'imgupload-btn'"
                  ref="fileInput"
                  accept="image/*"
                  @change="onFileUpload"
                  multiple>
                </label>
                 <span class="count" aria-label="이미지 등록개수">{{imageList == null ? 0 : imageList.length}}</span>/<span class="total" aria-label="이미지 최대등록개수">10</span>
          </button>
              <!-- app 경우
              <button class="imgupload-btn" aria-haspopup="dialog" @click="popupAction('PopupReviewSmartUpload')">
                <span class="hidden">저장된 사진 보기</span>
                <span class="count" aria-label="이미지 등록개수">1</span>/<span class="total" aria-label="이미지 최대등록개수">10</span>
              </button>
              // app 경우 -->
            <!--<swiper-slide
                  v-for="itmcDtl in itmcInfo.itmcDtlInqRsltDto"
                  v-bind:key="itmcDtl.itmcCtnsSeqno"
                  v-bind:itmcDtl="itmcDtl"imageReverse
            >-->
          <swiper :options="swiperOptionScrollX">
            <swiper-slide
                  v-for="(itmcDtl, index) in imageList"
                  v-bind:key="index"
                  v-bind:itmcDtl="itmcDtl"
            >
              <div class="thumb">
                <figure>
                  <img :src="getImg(itmcDtl.itmcCtnsPathNm)" alt="고객등록 사진" />
                </figure>
                <button type="button"
                        class="btn-delete"
                        aria-label="이미지첨부삭제"
                        @click="onFileDelete(index)"
                ></button>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </div>
      </div>

      <!-- START : 하단 버튼 -->
      <section class="full-btns__box">
        <button type="button" class="btn-lg btn-bg black" aria-haspopup="dialog" @click="updateReview">완료하기</button>
      </section>
      <!-- START : 하단 버튼 -->
    </div>
      <!-- START 신규 - 팝업 뒤로가기 버튼 -->
       <button class="btn-layer-prev" @click="popupBackCloseAction" @keydown.9="tabFocusRemove('popupBackCloseAction')"> <!--aria-label="포커스 아웃 시 팝업 닫기"> 07.27 기준 팝업으로 정의. 달라질 경우 aria-label 텍스트 변경 필요 -->
        <span class="hidden">뒤로가기</span>
      </button>
      <!-- END 신규 - 팝업 뒤로가기 버튼 -->
   <!--  <PopupReviewSmartUpload v-if="this.popup.PopupReviewSmartUpload" @popupEvent="popupAction"/> -->
    <PopupReviewNotWord v-if="this.popup.PopupReviewNotWord" @popupEvent="popupAction" :word="word"/>
    <PopupReviewComplete v-if="this.popup.PopupReviewComplete" @popupEvent="popupAction"/>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
// import PopupReviewSmartUpload from '@/views/ss/SC-FO-SS-MF-MP-304';
import PopupReviewNotWord from '@/components/mypage/PopupReviewNotWord';
import PopupReviewComplete from '@/components/mypage/PopupReviewComplete';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import ImgUtils from "@/common/ImgUtils";
import DateUtils from '@/common/DateUtils';
import UseNotWords from '@/common/cu/UseNotWords';
import StringUtils from '@/common/StringUtils';
export default {
  name: "popupReviewUpdate",
  mixins: [LayerPopupMixin],
  props: ['itmcInfo'],
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '상품평 < 마이페이지 < %s'
  },
  data() {
    return {
      popup: { // 팝업
       // PopupReviewSmartUpload: false,
        PopupReviewNotWord: false,
        PopupReviewComplete: false,
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
      ctgValueList: [],
      imageList: [],
      ctgValueTrueFalse: true,
      scorRegInputDto: [],
      placeholder: '상품 품질 및 만족도를 적어주세요.<br>최대 1,500자까지 입력이 가능합니다.<br>배송/교환/환불 문의는 고객센터로 접수해주세요.<br>상품과 관련 없는 내용은 비공개 처리될 수 있습니다.',
      placeholderTxt: '',
      curretTxt: 0,
      limitedTxt: 1500,
      itmcCnts: '',
      itmcCntsLen: 0,
      word: '',
      starScore: 0
    };
  },
  components: {
    swiper,
    swiperSlide,
   // PopupReviewSmartUpload,
    PopupReviewNotWord,
    PopupReviewComplete
  },
  methods: {
    starRatingAction(score) {
      // this.starScore = score;
      this.itmcInfo.itmcScor = score;
    },
    imageReverse(imgList) {
        const imgListRev = [];// tttt.reverse();
        if (imgList != null) {
          for (let o = imgList.length - 1; o >= 0; o--) {
            imgList[o].idx = o;
            imgListRev.push(imgList[o]);
           // imgListRev[imgListRev.length].idx = idx;
           // idx = idx + 1;
            console.log(" imgListRev.idx " + JSON.stringify(imgList));
          }
        }
        return imgListRev;
    },
   fileReset() {
      // 파일 초기화, 삭제 후 동일한 파일명으로 올릴 경우 onchange 이벤트 발생 안하는 현상을 방지하기 위함
      const input = this.$refs.fileInput;
      input.value = '';
    },
    fileUpload: async function(fileIn) {
      const formData = new FormData();
      formData.append('file', fileIn);
      formData.append('fileTokenId', this.fileTokenId);
      console.log("  formData  " + JSON.stringify(formData));
      // await ApiUtils.post('/fo/cm/filemgnt/file', formData, headers).then( res => {
      await ApiUtils.post('/fo/cm/filemgnt/file', formData).then((res) => {
          if (res.data === null) {
            this.$gsdialog.alert('파일업로드에 실패하였습니다.');
            return;
          } else {
            const returnData = res.data.data;
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
            if (this.fileTokenId === '') {
              this.fileTokenId = returnData.fileTokenId;
            }
            console.log(" this.imageList-11-- ");
            if (this.imageList == null) {
              this.imageList = [];
               this.imageList[0] = returnData;
            } else {
                this.imageList.unshift(returnData);
            }
            console.log(" this.imageList--- " +JSON.stringify(this.imageList));
            const idx = this.imageList.length - 1;
            this.imageList[0].itmcCtnsPathNm = returnData.attFileUrl;
            this.imageList[0].itmcCtnsFileNm = returnData.attFileNm;
          }
         // el.target.value = null;
        }
      );
    },
    imgCntChk() {
      if (this.imageList != null && this.imageList.length > 9 ) {
         this.$gsdialog.alert("사진등록은 10장까지 가능합니다");
      }
    },
    onFileUpload: function(el) {
      if (this.imageList == null || this.imageList.length < 10 ) {
        this.files = el.target.files;
        let cnt = 0;
        const imgCnt = this.imageList == null ? 0 : this.imageList.length;
        for (const i of Object.keys(this.files)) {
          if ((imgCnt + cnt) < 10) {
          this.fileUpload(el.target.files[i]);// this.files[i];
          } else {
          this.$gsdialog.alert("사진등록은 10장까지 가능합니다");
          return;
          }
          cnt = cnt + 1;
        }
        el.target.value = null;
      } else {
        this.$gsdialog.alert("사진등록은 10장까지 가능합니다");
      }
    },
    onFileDelete: function(index) {
      this.imageList.splice(index, 1);
      this.fileReset();
    },
    popupBackCloseAction() {
      const $this = this;
      this.$gsdialog.confirm("상품평 등록을 취소하시겠습니까?<br>작성 중인 내용은 저장되지 않습니다.", {html: true}).then(function () {
        $this.$emit('popupEvent', 'popupReviewUpdate');
       // $this.modalActiveEvent('popupReviewUpdate');
      });
    },
    popupCloseAction() {
      const $this = this;
        $this.$emit('popupEvent', 'popupReviewUpdate');
        $this.modalActiveEvent('popupReviewUpdate');
    },
    popupAction(type) {
      this.popup[type] = !this.popup[type];
      if (type == "PopupReviewComplete") {
        this.popupCloseAction();
      }
    },
    getImg(val) {
      let imgNm = '';
      let path = '';
      if (val != null && val != '') {
        imgNm = val.replace('{SIZE}', 200); // 300 -> 200
        path = ImgUtils.path(imgNm);
      } else {
        imgNm = "@/assets/images/img/img_product_nothumb.jpg";
        path = ImgUtils.path(imgNm);
      }
      return path;
    },
    getClassCtg: async function() {
      const ItemClasfStandItmcItmInqInputDto = {
        itemClasfCtgId: this.itmcInfo.itemClasfCtgId // this.itmcInfo.itmcScorListInqRsltDto[0].itemClasfCtgId,
      };
      console.log(" ItemClasfStandItmcItmInqInputDto " + JSON.stringify(ItemClasfStandItmcItmInqInputDto));
      const resultCtgList = await ApiUtils.get('/fo/cu/mypgmgnt/category-value-list', ItemClasfStandItmcItmInqInputDto);
      console.log("  resultCtgList  " + JSON.stringify(resultCtgList));
      if (resultCtgList.data.success) {
        this.ctgValueList = resultCtgList.data.data;
        console.log(JSON.stringify(this.ctgValueList));
      // this.scorRegInputDto = [this.ctgValueList.length];
      for (let i=0; i < this.ctgValueList.length; i++) {
        const tempColumnObj = { itmcStandCd: "", itmcScor: "" };
            tempColumnObj.itmcStandCd = this.ctgValueList[i].itmcStandCd;
            tempColumnObj.itmcScor = '';
            this.scorRegInputDto.push(tempColumnObj);
            if (!StringUtils.isEmpty(this.itmcInfo.itmcScorListInqRsltDto[i])) {
            this.scorRegInputDto[i].itmcScor = this.itmcInfo.itmcScorListInqRsltDto[i].itmcScor;
            } else {
               this.itmcInfo.itmcScorListInqRsltDto.push({itmcScor: '0'});
            }
      }
      console.log("  this.ctgValueList  " + JSON.stringify(this.scorRegInputDto));
      if (this.ctgValueList.length > 0) {
        this.ctgValueTrueFalse = true;
      } else {
        this.ctgValueTrueFalse = false;
      }
      this.itmcCnts = this.itmcInfo.itmcCnts;
        console.log("  this.scorRegInputDto  " + JSON.stringify(this.scorRegInputDto));
      // this.reviewUnWriteList = resultList.data.data.wrtPreItmcListInqRsltDto[0];
      // console.log(JSON.stringify(resultList));
      } else {
        console.log(resultCtgList.data.statusMessage);
      }
    },
    getArraySplit(val, idx) {
       const txt = val.split(',');
     return txt[idx];
    },
    toCommaCvert(val) {
      return NumberUtils.toComma(val);
    },
    getDiv(type, seq, val) { //
    // console.log(type + "::::::" + val);
    //  this.scorRegInputDto[seq].itmcStandCd = type; // val + 1;
      this.scorRegInputDto[seq].itmcScor = val;
      console.log(JSON.stringify(this.scorRegInputDto));
     // eval("this."+type+" = '" + val + "'");
    },
    txtFocusOut() {
     if (this.itmcCnts.length > 0) {
        this.placeholderTxt = '';
      } else {
        this.placeholderTxt = this.placeholder;
      }
    },
    txtFocusIn() {
      this.placeholderTxt = '';
    },
    iTextCounting() {
      const txt = document.getElementById("txtCnt").value;
       if (txt.length > 1500) {
        this.$gsdialog.alert('최대 1,500자까지 작성이 가능합니다.');
      //  alert(this.getCntsRealLen(this.itmcCnts));
        this.itmcCnts = this.itmcCnts.substring(0, 1500);
        const txtCnts = this.itmcCnts;
        document.getElementById("txtCnt").value = txtCnts; // this.getCntsSubstr(this.itmcCnts, 2000);
        this.curretTxt = txtCnts.length;
        this.itmcCntsLen = txtCnts.length;
      } else {
        this.curretTxt = txt.length;
        this.itmcCntsLen = txt.length;
      }
    },
    getBestTxt(val) {
        // console.log("sdfsd" + val);
          let txt = '';
          if (val == 5) {
            txt = '최고';
          } else if (val == 4) {
            txt = '좋음';
          } else if (val == 3) {
            txt = '보통';
          } else if (val == 2) {
            txt = '별로';
          } else if (val == 1) {
            txt = '나쁨';
          } else {
            txt = '나쁨';
          }
          this.starScore = val;
          return txt;
    },
    updateReview: async function() {
      if (this.itmcCnts !=null && this.itmcCnts.length > 0) {
        this.placeholderTxt = '';
        if (this.itmcCnts.length < 10) {
          // this.evtBditm.bditmCnts = this.itmcCnts.substring(0, 500);
          this.$gsdialog.alert(
            '내용은 10자이상 입력하셔야 상품평 등록이 가능합니다.'
          );
          return;
        }
        if (this.itmcCnts.length > 1500) {
          this.$gsdialog.alert(
            '최대 1,500자까지 작성이 가능합니다.'
          );
          return;
        }
      }
      if (!StringUtils.isEmpty(UseNotWords.getProhibitWords(this.itmcCnts))) {
        this.popup.PopupReviewNotWord = true;
        this.word = UseNotWords.getProhibitWords(this.itmcCnts);
        // this.$gsdialog.alert("내용 항목에 등록 불가인 단어(" + UseNotWords.getProhibitWords(this.itmcCnts) + ")가 포함되어 있습니다.", { html: true });
         return;
      }
      if (this.imageList != null && this.imageList.length > 0) {
        for (let i = 0; i < this.imageList.length; i++) {
        //  console.log('=1122' + this.ctnsRegInputDto.length); //
          this.imageList[i].itmcCtnsTypeCd = '01';
        //  this.imageList[i].itmcCtnsPathNm = StringUtils.isEmpty(this.imageList[i].itmcCtnsPathNm) ? this.imageList[i].attFileUrl : this.imageList[i].itmcCtnsPathNm;
        //  this.imageList[i].itmcCtnsFileNm = StringUtils.isEmpty(this.imageList[i].itmcCtnsFileNm) ? this.imageList[i].attFileNm : this.imageList[i].itmcCtnsFileNm;
        }
      }
      console.log("  this.imageList  " + JSON.stringify(this.imageList));
      // console.log(JSON.stringify(this.imageList));
      // alert(this.reviewUnWriteList.itemId);
      const InputDto = {
        itemId: this.itmcInfo.itemId, // 상품ID
        itmcCnts: this.itmcCnts, // 상품평내용
        fstItmcYn: '', // 상품평최초등록여부
        ordId: this.itmcInfo.ordId, // 주문ID 추천
        ordDtlSeqno: this.itmcInfo.ordDtlSeqno, // 주문상세일련번호
        ordItemSeqno: !StringUtils.isEmpty(this.itmcInfo.ordItemSeqno) ? this.itmcInfo.ordItemSeqno : '', // 주문상품일련번호
        skuId: this.itmcInfo.skuId, // 단품ID
        wrtrNm: this.itmcInfo.wrtrNm, // 작성자명
        itmcWrtrEmailAddr: this.itmcInfo.itmcWrtrEmailAddr, // 상품평작성자이메일주소
        itmcWrtrPsw: '', // 상품평작성자비밀번호
        itmcWrtrPurchYn: 'Y', // 상품평작성자구매여부
        itmcSeqno: this.itmcInfo.itmcSeqno,
        delYn: 'N',
        expsrYn: 'Y',
        itmcTitle: this.itmcInfo.itmcTitle,
       // itmcWrtrPurchDt: DateUtils.format(
       //   this.itmcInfo.ordDttm.substring(0, 10),
       //   'YYYYMMDD'
       // ), // 상품평작성자구매일자
        itmcRcmdCnt: this.itmcInfo.itmcRcmdCnt, // 상품평추천
        itmcScor: this.starScore, // 상품평점수
        imgItmcYn: (this.imageList !=null && this.imageList.length > 0) ? 'Y' : 'N', // 이미지상품평여부
        imgExpsrYn: (this.imageList !=null && this.imageList.length > 0) ? 'Y' : 'N', // 이미지노출여부
        imgExpsrFbidResnCd: '', // 이미지노출금지사유코드
        itmcUserTagCnts: '', // 상품평사용자태그내용
        itmcWrtrTypeCd: '01', // 상품평작성자유형코드
        fstRegUserId: this.itmcInfo.webId, // 최초작성자ID
        lastModUserId: this.itmcInfo.webId, // 최종수정자ID
        itmcScorRegInputDto: this.scorRegInputDto,
        itmcCtnsRegInputDto: this.imageReverse(this.imageList),
        mallId: this.itmcInfo.mallId,
        itmcWrtrPurchDt: this.itmcInfo.itmcWrtrPurchDt
      };
      console.log(this.starScore + " InputDto " + JSON.stringify(InputDto));
      console.log(" itmcInfo " + JSON.stringify(this.itmcInfo));
     // const confirmed = confirm('상품평을 등록 하시겠습니까?');
     const vm = this;
      vm.$gsdialog.confirm("상품평을 수정하시겠습니까?").then(async function () {
        console.log("=1=="+JSON.stringify(InputDto));
        const result = await ApiUtils.put('/fo/md/mf/itmcmgnt/item-comment', InputDto);
        console.log("=2=="+JSON.stringify(result.data));
        if (result.data.success) {
        console.log(" 등록완료 ");
        console.log(JSON.stringify(result.data));
      //  const InputEvtDto = {
      //      itemId: result.data.data.itemId, // 상품ID
      //      itmcSeqno: result.data.data.itmcSeqno, // 상품평내용
      //      procDttm: result.data.data.fstRegDttm,
      //    };
      //    console.log(JSON.stringify(InputEvtDto));
         // const resultEvt = await ApiUtils.post('/fo/ev/eventmgnt/item-comment-event-entry', InputEvtDto);
         // console.log(JSON.stringify(resultEvt));
          vm.popup.PopupReviewComplete = true;
         // vm.$gsdialog.alert('상품평이 등록되었습니다.').then(dialog => {
         // vm.popupCloseAction();
         // });
        } else {
           vm.$gsdialog.alert(result.data.statusMessage);
        }
       }); // }
    },
  },
  watch: {
    'itmcCnts': function(hook) {
     // console.log("mbrInqrCnts.length :: "+this.itmcCnts.length);
      this.itmcCntsLen = this.itmcCnts.length;
    }
  },
  mounted() {
    console.log(" update === " + JSON.stringify(this.itmcInfo));
    this.curretTxt = this.itmcInfo.itmcCnts.length;
    if (this.curretTxt > 0) {
      this.placeholderTxt = '';
    } else {
      this.placeholderTxt = this.placeholder;
    }
    this.imageList = this.itmcInfo.itmcDtlInqRsltDto;
    this.getClassCtg();
  }
};
</script>
