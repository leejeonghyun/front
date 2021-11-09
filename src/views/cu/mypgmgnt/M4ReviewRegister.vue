<template>
  <div id="PopupReviewModifyNew3" class="wrap-full-popup popup-review-small" role="dialog" aria-modal="true" :class="{active : this.modalActive.PopupReviewModifyNew3}">
    <div class="header-popup">
      <strong>상품평 작성하기</strong>
    </div>
    <div class="full-popup-body scroll-area goods_review_step02"><!-- 20201116 progress 추가 -->
      <div class="pop-review__block">
        <div class="product-item__star">
          <figure class="img-box">
              <img
                :src="getImg(reviewUnWriteList.itemCtnsFileNm)"
                :alt="reviewUnWriteList.itemNm"
              />
          </figure>
          <div>
              <p>{{ reviewUnWriteList.itemNm }}</p>
          <!--
              <div class="starbox">
                <span class="star"><em :style="'width:' + scoreStar*20 + '%'"></em></span>
                <span class="star_txt">{{getBestTxt(scoreStar)}}</span>
              </div>
          -->
               <div class="wrap-star-rate">
                <div class="wrap-star">
                  <button class="star" :class="{active: starScore >= 1}" @click="starRatingAction(1)" aria-label="1점"></button>
                  <button class="star" :class="{active: starScore >= 2}" @click="starRatingAction(2)" aria-label="2점"></button>
                  <button class="star" :class="{active: starScore >= 3}" @click="starRatingAction(3)" aria-label="3점"></button>
                  <button class="star" :class="{active: starScore >= 4}" @click="starRatingAction(4)" aria-label="4점"></button>
                  <button class="star" :class="{active: starScore >= 5}" @click="starRatingAction(5)" aria-label="5점"></button>
                </div>
                <span class="star_txt">{{getBestTxt(starScore)}}</span>
              </div>
          </div>
        </div>
      </div>

      <div class="pop-review__block" v-if="ctgValueList.length > 0">
        <dl class="product-item__radio"
                v-for="(ctgValue, index) in ctgValueList"
                v-bind:key="index"
                v-bind:ctgValue="ctgValue">
        <!--  <span v-for="(ctgValue, index) in ctgValueList"
                v-bind:key="index"
                v-bind:ctgValue="ctgValue"
            >
        -->
            <dt>{{ctgValue.itmcStandCdNm}}</dt>
            <dd>
              <ul class="radio_round__list">
                <li>
                  <input type="radio" :id="'radioVal' + ctgValue.itmcStandCd + '0'" class="radio_round" :name="'radioVal' + ctgValue.itmcStandCd" @click="getDiv(ctgValue.itmcStandCd, ctgValue.seq, 1)"/>
                  <label :for="'radioVal' + ctgValue.itmcStandCd + '0'">{{getArraySplit(ctgValue.itmcScorNm, 0)}}</label>
                </li>
                <li>
                  <input type="radio" :id="'radioVal' + ctgValue.itmcStandCd + '1'" class="radio_round" :name="'radioVal' + ctgValue.itmcStandCd" @click="getDiv(ctgValue.itmcStandCd, ctgValue.seq, 2)"/>
                  <label :for="'radioVal' + ctgValue.itmcStandCd + '1'">{{getArraySplit(ctgValue.itmcScorNm, 1)}}</label>
                </li>
                <li>
                  <input type="radio" :id="'radioVal' + ctgValue.itmcStandCd + '2'" class="radio_round" :name="'radioVal' + ctgValue.itmcStandCd" @click="getDiv(ctgValue.itmcStandCd, ctgValue.seq, 3)"/>
                  <label :for="'radioVal' + ctgValue.itmcStandCd + '2'">{{getArraySplit(ctgValue.itmcScorNm, 2)}}</label>
                </li>
              </ul>
            </dd>
        <!--  </span> -->
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
                       @blur="txtFocusOut"></textarea>
              <div class="placeholder" v-html="placeholderTxt"></div>
              <div class="align-right">
                <span class="input-text-num">
                  <span aria-label="입력한텍스트수">{{toCommaCvert(itmcCntsLen)}}</span>
                  <span aria-label="입력최대텍스트수">{{toCommaCvert(limitedTxt)}}</span>
                </span>
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
                  multiple
                  >
                </label>
                 <span class="count" aria-label="이미지 등록개수">{{imageList.length}}</span>/<span class="total" aria-label="이미지 최대등록개수">10</span>
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
                  v-bind:itmcDtl="itmcDtl"
            >-->
           <swiper :options="swiperOptionScrollX">
            <swiper-slide
                  v-for="(itmcDtl, index) in imageReverse(imageList)"
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
                        @click="onFileDelete((imageList.length-1) - index)"
                ></button>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </div>
      </div>

      <!-- START : 하단 버튼 -->
      <section class="full-btns__box">
        <button type="button" class="btn-lg btn-bg black" aria-haspopup="dialog" @click="regReview">완료하기</button>
      </section>
      <!-- START : 하단 버튼 -->
    </div>
      <!-- START 신규 - 팝업 뒤로가기 버튼 -->
       <button class="btn-layer-prev" @click="popupBackCloseAction" @keydown.9="tabFocusRemove('popupBackCloseAction')"> <!--  aria-label="포커스 아웃 시 팝업 닫기">07.27 기준 팝업으로 정의. 달라질 경우 aria-label 텍스트 변경 필요 -->
        <span class="hidden">뒤로가기</span>
      </button>
      <!-- END 신규 - 팝업 뒤로가기 버튼 -->
    <!--<PopupReviewSmartUpload v-if="this.popup.popupReviewSmartUpload" @popupEvent="popupAction"/>-->
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
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
import ImgUtils from "@/common/ImgUtils";
import UseNotWords from '@/common/cu/UseNotWords';
import StringUtils from '@/common/StringUtils';
export default {
  name: "ReviewRegister",
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '상품평 < 마이페이지 < %s'
  },
   props: ['ordId', 'itemId', 'scoreStar'],
  data() {
    return {
      /* 4월수정 START : 데이터 변경 */
      placeholder: '상품 품질 및 만족도를 적어주세요.<br>최대 1,500자까지 입력이 가능합니다.<br>배송/교환/환불 문의는 고객센터로 접수해주세요.<br>상품과 관련 없는 내용은 비공개 처리될 수 있습니다.',
      /* 4월수정 END : 데이터 변경 */
      placeholderTxt: '',
      starScore: 0,
      swiperOptionScrollX: {
        slidesPerView: 'auto',
        freeMode: true,
        containerModifierClass: 'wrap-list-photo ',
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
        },
      },
      reviewUnWriteList: {
        itemId: '', // 상품ID
        itemNm: '',
        itemCtnsFileNm: '',
        itmcCnts: '', //  상품평내용
        fstItmcYn: '', //  상품평최초등록여부
        ordId: '', //  주문ID
        ordDtlSeqno: '', //  주문상세일련번호
        ordItemSeqno: '', //  주문상품일련번호
        skuId: '', //  단품ID
        wrtrNm: '', //  작성자명
        itmcWrtrEmailAddr: '', //  상품평작성자이메일주소
        itmcWrtrPsw: '', // 상품평작성자비밀번호
        itmcWrtrPurchYn: '', // 상품평작성자구매여부
        itmcWrtrPurchDt: '', //  상품평작성자구매일자
        itmcRcmdCnt: '', //  상품평추천
        itmcScor: '', //  상품평점수
        imgItmcYn: '', //  이미지상품평여부
        imgExpsrYn: '', //  이미지노출여부
        imgExpsrFbidResnCd: '', //  이미지노출금지사유코드
        itmcUserTagCnts: '', // 상품평사용자태그내용
        itmcWrtrTypeCd: '', // 상품평작성자유형코드
        fstRegUserId: '', //  최초작성자ID
        lastModUserId: '', //  최종수정자ID
      },
      itmcCnts: '',
      fresh: '',
      tasty: '',
      delivery: '',
      expire: '',
      korName: '',
      userId: '',
      scorRegInputDto: [],
      ctnsRegInputDto: [],
      ctgValueList: [],
      imageList: [],
      fileTokenId: '',
      limitedTxt: 1500,
      curretTxt: 0,
      ctgValueTrueFalse: true,
      sympleCook: true,
      siteClass: CookieUtils.getSiteClass(),
      popup: {
        // 팝업
        open: false,
       // popupReviewSmartUpload: false,
        PopupReviewNotWord: false,
        PopupReviewComplete: false,
      },
      word: '',
      itmcCntsLen: 0
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
    /* 4월수정 : nextStepAction, starRatingAction 삭제 */
    nextStepAction() {
      this.step01 = true;
    },
    /* 4월수정 : updated 삭제 */
    starRatingAction(score) {
      this.starScore = score;
     // this.scoreStar = score;
    },
    popupBackCloseAction() {
      const $this = this;
      this.$gsdialog.confirm("상품평 등록을 취소하시겠습니까?<br>작성 중인 내용은 저장되지 않습니다.", {html: true}).then(function () {
        $this.$emit('popupEvent', 'popupM4ReviewWrite');
       // $this.modalActiveEvent('popupM4ReviewWrite');
      });
    },
    popupCloseAction(strDiv) {
      const $this = this;
        $this.$emit('popupEvent', strDiv); // 'popupM4ReviewWrite');
        $this.modalActiveEvent('popupM4ReviewWrite');
    },
    toCommaCvert(val) {
      return NumberUtils.toComma(val);
    },
    getArraySplit(val, idx) {
       const txt = val.split(',');
     return txt[idx];
    },
    cancelReview() {
    const vm = this;
     vm.$gsdialog.confirm("상품평 등록을 취소하시겠습니까?").then(function () {
          vm.$gsdialog.alert('상품평 등록이 취소되었습니다.').then(dialog => {
             vm.popupCloseAction('popupM4ReviewWrite');
          });
      });
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
       // console.log(" this.curretTxt " + this.curretTxt);
      }
    },
    regReview: async function() {
      if (this.itmcCnts.length > 0) {
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
     // this.scorRegInputDto[0].itmcStandCd = 1; // 신선도
     // this.scorRegInputDto[1].itmcStandCd = 2; // 맛
     // this.scorRegInputDto[2].itmcStandCd = 3; // 배송
     // this.scorRegInputDto[3].itmcStandCd = 4; // 유통기한

     // this.scorRegInputDto[0].itmcScor = this.fresh; // 신선도
     // this.scorRegInputDto[1].itmcScor = this.tasty; // 맛
     // this.scorRegInputDto[2].itmcScor = this.delivery; // 배송
     // this.scorRegInputDto[3].itmcScor = this.expire; // 유통기한
      // console.log('=1=' + this.ctnsRegInputDto.length);
      console.log(JSON.stringify(this.ctnsRegInputDto));
      // this.ctnsRegInputDto.length = this.imageList.length;
      console.log('=22' + this.ctnsRegInputDto.length);
      if (this.imageList.length > 0) {
        for (let i = 0; i < this.imageList.length; i++) {
        //  console.log('=1122' + this.ctnsRegInputDto.length);
          this.imageList[i].itmcCtnsTypeCd = '01';
          this.imageList[i].itmcCtnsPathNm = this.imageList[i].attFileUrl;
          this.imageList[i].itmcCtnsFileNm = this.imageList[i].attFileNm;
        }
      }
      // console.log(JSON.stringify(this.imageList));
      // alert(this.reviewUnWriteList.itemId);
      const InputDto = {
        itemId: this.reviewUnWriteList.itemId, // 상품ID
        itmcCnts: this.itmcCnts, // 상품평내용
        fstItmcYn: '', // 상품평최초등록여부
        ordId: this.reviewUnWriteList.ordId, // 주문ID 추천
        ordDtlSeqno: this.reviewUnWriteList.ordDtlSeqno, // 주문상세일련번호
        ordItemSeqno: this.reviewUnWriteList.ordItemSeqno, // 주문상품일련번호
        skuId: this.reviewUnWriteList.skuId, // 단품ID
        wrtrNm: this.korName, // 작성자명
        itmcWrtrEmailAddr: '', // 상품평작성자이메일주소
        itmcWrtrPsw: '', // 상품평작성자비밀번호
        itmcWrtrPurchYn: 'Y', // 상품평작성자구매여부
        itmcWrtrPurchDt: DateUtils.format(
          this.reviewUnWriteList.ordDttm.substring(0, 10),
          'YYYYMMDD'
        ), // 상품평작성자구매일자
       // itmcRcmdCnt: document.getElementById('radioRcommendUp').checked ? 1 : 0, // 상품평추천
        itmcScor: this.starScore, // 상품평점수
        imgItmcYn: this.imageList.length > 0 ? 'Y' : 'N', // 이미지상품평여부
        imgExpsrYn: this.imageList.length > 0 ? 'Y' : 'N', // 이미지노출여부
        imgExpsrFbidResnCd: '', // 이미지노출금지사유코드
        itmcUserTagCnts: '', // 상품평사용자태그내용
        itmcWrtrTypeCd: '01', // 상품평작성자유형코드
        fstRegUserId: this.userId, // 최초작성자ID
        lastModUserId: this.userId, // 최종수정자ID
        itmcScorRegInputDto: this.scorRegInputDto,
        itmcCtnsRegInputDto: this.imageList,
        mallId: this.reviewUnWriteList.mallId,
      };
      console.log(this.reviewUnWriteList.ordDttm.substring(0, 10) + "InputDto " + JSON.stringify(InputDto));
      console.log("reviewUnWriteList " + JSON.stringify(this.reviewUnWriteList));
     // const confirmed = confirm('상품평을 등록 하시겠습니까?');
     const vm = this;
      vm.$gsdialog.confirm("상품평을 등록하시겠습니까?").then(async function () {
        console.log("=1=="+JSON.stringify(InputDto));
        const result = await ApiUtils.post('/fo/md/mf/itmcmgnt/item-comment', InputDto);
        console.log("=2=="+JSON.stringify(result.data));
        if (result.data.success) {
        console.log(" 등록완료 ");
        console.log(JSON.stringify(result.data));
        // const InputEvtDto = {
        //  itemId: result.data.data.itemId, // 상품ID
        //  itmcSeqno: result.data.data.itmcSeqno, // 상품평내용
        //  procDttm: result.data.data.fstRegDttm,
        // };
        // console.log(JSON.stringify(InputEvtDto));
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
    getDiv(type, seq, val) { //
    // console.log(type + "::::::" + val);
    //  this.scorRegInputDto[seq].itmcStandCd = type; // val + 1;
      this.scorRegInputDto[seq-1].itmcScor = val;
      console.log(JSON.stringify(this.scorRegInputDto));
     // eval("this."+type+" = '" + val + "'");
    },
    getMbrInfo: async function() {
      try {
        const resultMemInfo = await ApiUtils.get(
          '/fo/cu/mbrmgnt/member-information',
          null
        ); // 회원정보 가져오기
        this.korName = resultMemInfo.data.data.custNm;
        this.userId = resultMemInfo.data.data.webId;
      } catch (e) {
        console.log(e);
      }
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
            console.log(" returnData : " + JSON.stringify(returnData));
          //  this.imageList.push(returnData);
            if (this.imageList == null) {
               this.imageList = [];
               this.imageList[0] = returnData;
            } else {
                this.imageList.push(returnData);
            }
            console.log(" this.imageList--- " +JSON.stringify(this.imageList));
            const idx = this.imageList.length - 1;
            this.imageList[idx].itmcCtnsPathNm = returnData.attFileUrl;
            this.imageList[idx].itmcCtnsFileNm = returnData.attFileNm;
          }
        }
      );
    },
    imgCntChk() {
      if (this.imageList != null && this.imageList.length > 9 ) {
         this.$gsdialog.alert("사진등록은 10장까지 가능합니다");
      }
    },
    onFileUpload: async function(el) {
      if (this.imageList.length < 10 ) {
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
    popupAction(type) {
      this.popup[type] = !this.popup[type];
      if (type == "PopupReviewComplete") {
        this.popupCloseAction('PopupReviewComplete');
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
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  watch: {
    'itmcCnts': function(hook) {
     // console.log("mbrInqrCnts.length :: "+this.itmcCnts.length);
      this.itmcCntsLen = this.itmcCnts.length;
    }
  },
  mounted: async function() {
   // this.modalActiveEvent('popupReviewWrite');
  //  this.accordionInit('accordion');
    this.starScore = this.scoreStar;
    this.placeholderTxt = this.placeholder;
    this.getMbrInfo();
    const InputDto = {
      ordId: this.ordId,
      itemId: this.itemId,
      sort: 'NEW',
      offset: 0,
      limit: 10000,
      mallId: null,
      cmmSteId: CookieUtils.getCmmSteId()
    };
    // alert(this.ordId);
    const resultList = await ApiUtils.get(
      '/fo/cu/mypgmgnt/write-previous-commentaboutproduct-list',
      InputDto
    );
    console.log("++++++++++++"+JSON.stringify(resultList.data));
    if (resultList.data.success) {
     //  console.log("+++++11111111+++++++"+JSON.stringify(resultList.data.data.wrtPreItmcListInqRsltDto));
      this.reviewUnWriteList = resultList.data.data.wrtPreItmcListInqRsltDto[0];
      console.log("+++++11111111+++++++"+JSON.stringify( this.reviewUnWriteList));
      if (this.reviewUnWriteList.spckItemYn =='N') {
      //  this.accodionActive.accordionContent03 = true;
          this.sympleCook = true;
      } else {
      //   this.accodionActive.accordionContent03 = false;
          this.sympleCook = false;
      }
    } else {
      console.log(resultList.data.statusMessage);
    }

    const ItemClasfStandItmcItmInqInputDto = {
      itemClasfCtgId: this.reviewUnWriteList.itemClasfCtgId,
    };
   console.log(JSON.stringify(ItemClasfStandItmcItmInqInputDto));
    const resultCtgList = await ApiUtils.get('/fo/cu/mypgmgnt/category-value-list', ItemClasfStandItmcItmInqInputDto);
    if (resultCtgList.data.success) {
      this.ctgValueList = resultCtgList.data.data;
      console.log(JSON.stringify(this.ctgValueList));
     // this.scorRegInputDto = [this.ctgValueList.length];
     for (let i=0; i < this.ctgValueList.length; i++) {
       const tempColumnObj = { itmcStandCd: "", itmcScor: "" };
           tempColumnObj.itmcStandCd = this.ctgValueList[i].itmcStandCd;
           tempColumnObj.itmcScor = '';
           this.scorRegInputDto.push(tempColumnObj);
     }
     if (this.ctgValueList.length > 0) {
       this.ctgValueTrueFalse = true;
     } else {
       this.ctgValueTrueFalse = false;
     }
      console.log(JSON.stringify(this.scorRegInputDto));
     // this.reviewUnWriteList = resultList.data.data.wrtPreItmcListInqRsltDto[0];
     // console.log(JSON.stringify(resultList));
    } else {
      console.log(resultCtgList.data.statusMessage);
    }
  },
  /* 4월수정 : updated 삭제 */
};
</script>

<style></style>
