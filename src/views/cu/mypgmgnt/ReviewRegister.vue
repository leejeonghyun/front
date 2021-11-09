<template>
  <div
    id="popupReviewWrite"
    class="wrap-full-popup"
    role="dialog"
    aria-modal="true"
    v-bind:class="[siteClass]"
  >
    <div class="header-popup">
      <strong>상품평 작성</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <!-- 4월수정 START : 디자인 변경으로 인한 마크업 변경 -->
        <div class="popup-review">
          <!-- START : 상품 -->
          <div class="product-item">
            <figure>
              <img
                :src="getImg(reviewUnWriteList.itemCtnsFileNm)"
                :alt="reviewUnWriteList.itemNm"
              />
            </figure>
            <div class="inner">
              <p class="product-title">
                {{ reviewUnWriteList.itemNm }}
                <!--[초록팜] 달콤한 단감 5kg 특과 / 18-20개 (개당250g이상) -->
              </p>
            </div>
          </div>
          <!-- END : 상품 -->
          <!-- START : 상품평 작성 -->
          <div class="wrap-review-write">
            <!-- START : 별점 평가 -->
            <div class="wrap-star-rate">
              <p class="rate-text">이 상품 어떠셨나요?</p>
              <div class="wrap-star">
                <button
                  class="star"
                  :class="{ active: starScore >= 1 }"
                  @click="starRatingAction(1)"
                  aria-label="1점"
                ></button>
                <button
                  class="star"
                  :class="{ active: starScore >= 2 }"
                  @click="starRatingAction(2)"
                  aria-label="2점"
                ></button>
                <button
                  class="star"
                  :class="{ active: starScore >= 3 }"
                  @click="starRatingAction(3)"
                  aria-label="3점"
                ></button>
                <button
                  class="star"
                  :class="{ active: starScore >= 4 }"
                  @click="starRatingAction(4)"
                  aria-label="4점"
                ></button>
                <button
                  class="star"
                  :class="{ active: starScore >= 5 }"
                  @click="starRatingAction(5)"
                  aria-label="5점"
                ></button>
              </div>
            </div>
            <!-- END : 별점 평가 -->
            <ul class="wrap-list-write" data-group="accordion">
              <li>
                <!-- //필수요소 "require" 클래스 추가 -->
                <button
                  id="accordionBtn01"
                  class="btn-accordion require"
                  aria-expanded="true"
                  aria-controls="accordionContent01"
                  @click="accordionEvent02"
                >
                  <span class="text">이 상품을 추천하시겠습니까?</span>
                </button>
                <div
                  id="accordionContent01"
                  class="accordion-content"
                  aria-labelledby="accordionBtn01"
                  v-if="accodionActive.accordionContent01"
                >
                  <div class="wrap-review-recommend">
                    <span class="wrap-radio">
                      <input
                        type="radio"
                        id="radioRcommendUp"
                        class="inp-recommend up"
                        name="productRecommend"
                        require
                      />
                      <label for="radioRcommendUp">추천해요</label>
                    </span>
                    <span class="wrap-radio">
                      <input
                        type="radio"
                        id="radioRcommendDown"
                        class="inp-recommend down"
                        name="productRecommend"
                      />
                      <label for="radioRcommendDown">아쉬워요</label>
                    </span>
                  </div>
                </div>
              </li>
              <li data-group="accordion" v-if="ctgValueTrueFalse">
                <button
                  id="accordionBtn02"
                  class="btn-accordion"
                  aria-expanded="true"
                  aria-controls="accordionContent02"
                  @click="accordionEvent02"
                >
                  <span class="text">이 상품을 상세히 평가해주세요.</span>
                </button>
                <div
                  id="accordionContent02"
                  class="accordion-content"
                  aria-labelledby="accordionBtn02"
                  v-if="accodionActive.accordionContent02"
                >
                  <ul class="wrap-detail-rate">
                    <li v-for="ctgValue in ctgValueList"
                            v-bind:key="ctgValue.seq"
                            v-bind:ctgValue="ctgValue">
                      <strong>{{ctgValue.itmcStandCdNm}}</strong>
                      <div class="wrap-inner">
                        <span class="wrap-radio">
                              <input type="radio" :id="'radioVal' + ctgValue.itmcStandCd + '0'" class="inp-rate" :name="'radioVal' + ctgValue.itmcStandCd" @click="getDiv(ctgValue.itmcStandCd, ctgValue.seq, 1)"/>
                              <label :for="'radioVal' + ctgValue.itmcStandCd + '0'">{{getArraySplit(ctgValue.itmcScorNm, 0)}}</label>
                        </span>
                        <span class="wrap-radio">
                              <input type="radio" :id="'radioVal' + ctgValue.itmcStandCd + '1'" class="inp-rate" :name="'radioVal' + ctgValue.itmcStandCd" @click="getDiv(ctgValue.itmcStandCd, ctgValue.seq, 2)"/>
                              <label :for="'radioVal' + ctgValue.itmcStandCd + '1'">{{getArraySplit(ctgValue.itmcScorNm, 1)}}</label>
                        </span>
                        <span class="wrap-radio">
                              <input type="radio" :id="'radioVal' + ctgValue.itmcStandCd + '2'" class="inp-rate" :name="'radioVal' + ctgValue.itmcStandCd" @click="getDiv(ctgValue.itmcStandCd, ctgValue.seq, 3)"/>
                              <label :for="'radioVal' + ctgValue.itmcStandCd + '2'">{{getArraySplit(ctgValue.itmcScorNm, 2)}}</label>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <button
                  id="accordionBtn03"
                  class="btn-accordion"
                  aria-expanded="true"
                  aria-controls="accordionContent03"
                  @click="accordionEvent02"
                >
                  <span class="text">상품평을 입력해주세요.</span>
                </button>
                <div
                  id="accordionContent03"
                  class="accordion-content"
                  aria-labelledby="accordionBtn03"
                  v-if="accodionActive.accordionContent03"
                >
                  <!-- 4월수정 START : 디자인 변경 -->
                  <div class="wrap-textarea">
                    <textarea id = "txtCnt"
                      :placeholder="placeholder"
                      v-model="itmcCnts"
                      @keyup="iTextCounting()"
                    ></textarea>
                    <div class="align-right">
                      <span class="input-text-num">
                        <span aria-label="입력한텍스트수">{{
                          toCommaCvert(curretTxt)
                        }}</span>
                        <span aria-label="입력최대텍스트수">{{
                          toCommaCvert(limitedTxt)
                        }}</span>
                      </span>
                    </div>
                  </div>
                  <div class="btn-add">
                    <input
                      type="file"
                      id="uploadPhoto"
                      class="hidden btn-add"
                      ref="fileInput"
                      accept="image/*"
                      @change="onFileUpload"
                    />
                    <label for="uploadPhoto">
                      <span class="btn-name">
                        사진첨부
                      </span>
                      <span class="add-list-num">
                        (<span aria-label="이미지등록개수">{{
                          imageList.length
                        }}</span>
                        <span aria-label="이미지최대등록개수">10</span>)
                      </span>
                    </label>
                  </div>
                  <!-- 4월수정 END : 디자인 변경 -->
                  <div class="wrap-photo">
                    <swiper :options="swiperOptionScrollX">
                      <!-- 4월수정 START : 삭제 -->
                      <!-- <swiper-slide>
                        <input type="file" id="uploadPhoto" class="hidden btn-add" />
                        <label for="uploadPhoto">
                          <span class="count" aria-label="이미지 등록개수">1</span>/
                          <span class="total" aria-label="이미지 최대등록개수">10</span>
                        </label>
                      </swiper-slide> -->
                      <!-- 4월수정 START : 삭제 -->
                      <swiper-slide
                        v-for="(item, index) in imageList"
                        :key="index"
                      >
                        <div class="thumb">
                          <figure>
                            <img :src="item.attFileUrl" alt="고객등록이미지" />
                          </figure>
                          <button
                            type="button"
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
              </li>
            </ul>
            <div class="list-info">
              <ul>
                <!-- 4월수정 START : 텍스트 수정 -->
                <li>
                  이미지는 5MB이내 최대 10장 첨부 가능합니다.
                </li>
                <li>
                  배송완료 상품에 한해 한 상품 당 1회만 작성 가능합니다.
                </li>
                <li>
                  비속어 및 인격 비하 등 미풍양속을 해치는 내용의 경우 통보없이
                  삭제될 수 있습니다.
                </li>
                <li>
                  작성 내용은 마이페이지 > 나의활동 > 상품평에서도 확인하실 수
                  있습니다.
                </li>
                <!-- 4월수정 END : 텍스트 수정 -->
              </ul>
            </div>
            <div class="wrap-footer-btn">
              <button class="btn-bg darkgray" @click="cancelReview">
                취소
              </button>
              <button class="btn-bg lightgreen" @click="regReview">등록</button>
            </div>
          </div>
          <!-- END : 상품평 작성 -->
        </div>
        <!-- 4월수정 END : 디자인 변경으로 인한 마크업 변경 -->
      </div>
    </div>
    <button
      class="btn-layer-close"
      @click="popupCloseAction"
      @keydown.9="tabFocusRemove('popupCloseAction')"
      aria-label="포커스 아웃 시 팝업 닫기"
    >
      <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
import ImgUtils from "@/common/ImgUtils";
import UseNotWords from '@/common/cu/UseNotWords';
import StringUtils from '@/common/StringUtils';

export default {
  name: 'ReviewRegister',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '상품평 < 나의활동 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '상품평^상품평 작성',
      },
    ],
  },
  mixins: [LayerPopupMixin, AccordionMixin],
  props: ['ordId', 'itemId'],
  data() {
    return {
      /* 4월수정 START : 데이터 변경 */
      placeholder: '최소 10자 이상~ 최대 2,000자이내로 작성해주세요',
      /* 4월수정 END : 데이터 변경 */
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
      limitedTxt: 2000,
      curretTxt: 0,
      ctgValueTrueFalse: true,
      sympleCook: true,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  methods: {
    /* 4월수정 : nextStepAction, starRatingAction 삭제 */
    nextStepAction() {
      this.step01 = true;
    },
    /* 4월수정 : updated 삭제 */
    starRatingAction(score) {
      this.starScore = score;
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupReviewWrite');
      this.modalActiveEvent('popupReviewWrite');
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
     vm.$gsdialog.confirm("상품평  등록을 취소 하시겠습니까?").then(function () {
          vm.$gsdialog.alert('상품평 등록이 취소되었습니다.').then(dialog => {
             vm.popupCloseAction();
          });
      });
    },
    iTextCounting() {
      const txt = document.getElementById("txtCnt").value;
      if (txt.length > 2000) {
        this.$gsdialog.alert('글자수는 2,000자 미만으로 입력하셔야 성품평 등록이 가능합니다.');
      //  alert(this.getCntsRealLen(this.itmcCnts));
        this.itmcCnts = this.itmcCnts.substring(0, 2000);
        const txtCnts = this.itmcCnts;
        document.getElementById("txtCnt").value = txtCnts; // this.getCntsSubstr(this.itmcCnts, 2000);
        this.curretTxt = txtCnts.length;
      } else {
        this.curretTxt = txt.length;
      }
    },
    regReview: async function() {
      // 등록
      /*  console.log("==별정==" + this.starScore);
        console.log(document.getElementById("radioRcommendUp").checked);
        console.log(document.getElementById("radioRcommendDown").checked);
        console.log("==상품평==" + this.itmcCnts );
        console.log("==신선도==" + this.fresh );
        console.log("==맛==" + this.tasty );
        console.log("==배송==" + this.delivery );
        console.log("==유통기한==" + this.expire );
      */
     if (
        StringUtils.isEmpty(this.starScore) || this.starScore == 0
      ) {
        this.$gsdialog.alert('별점을 선택해주세요.');
        return;
      }
      if (
        !document.getElementById('radioRcommendUp').checked &&
        !document.getElementById('radioRcommendDown').checked
      ) {
        this.$gsdialog.alert('상품 추천 여부를 선택해주세요.');
        return;
      }
    let cntScor = 0;
    for (let o = 0; o < this.scorRegInputDto.length; o++) {
        console.log(JSON.stringify(this.scorRegInputDto[o]));
        if (!StringUtils.isEmpty(this.scorRegInputDto[o].itmcScor) ) {
            cntScor = cntScor + 1;
        }
    }
    // alert(cntScor + "::" + this.scorRegInputDto.length);
    if (cntScor != 0 && cntScor != this.scorRegInputDto.length ) {
      this.$gsdialog.alert("상품의 상세평가를 완성해주세요.");
      return;
    }
      if (this.itmcCnts.length > 0) {
        if (this.itmcCnts.length < 10) {
          // this.evtBditm.bditmCnts = this.itmcCnts.substring(0, 500);
          this.$gsdialog.alert(
            '내용은 10자이상 입력하셔야 상품평 등록이 가능합니다.'
          );
          return;
        }
        if (this.itmcCnts.length > 2000) {
          this.$gsdialog.alert(
            '글자수는 2,000자 미만으로 입력하셔야 성품평 등록이 가능합니다.'
          );
          return;
        }
      }

      const words = UseNotWords.getWords();// ["미친", "붕산", "견자"]; // TODO
    //  for (let n = 0; n < words.length; n++) {
    //      if (this.itmcCnts.indexOf(words[n]) != -1) {
    //          this.$gsdialog.alert("작성하신 글에 금칙어가 포함되어 있습니다.");
    //          return;
    //      }
    //  }
      if (!StringUtils.isEmpty(UseNotWords.getProhibitWords(this.itmcCnts))) {
         this.$gsdialog.alert("내용 항목에 등록 불가인 단어(" + UseNotWords.getProhibitWords(this.itmcCnts) + ")가 포함되어 있습니다.", { html: true });
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
        itmcRcmdCnt: document.getElementById('radioRcommendUp').checked ? 1 : 0, // 상품평추천
        itmcScor: this.starScore, // 상품평점수
        imgItmcYn: this.imageList.length > 0 ? 'Y' : 'N', // 이미지상품평여부
        imgExpsrYn: this.imageList.length > 0 ? 'Y' : 'N', // 이미지노출여부
        imgExpsrFbidResnCd: '', // 이미지노출금지사유코드
        itmcUserTagCnts: '', // 상품평사용자태그내용
        itmcWrtrTypeCd: '01', // 상품평작성자유형코드
        fstRegUserId: this.userId, // 최초작성자ID
        lastModUserId: this.userId, // 최종수정자ID
        itmcScorRegInputDto: cntScor == 0 ? null : this.scorRegInputDto, // : this.scorRegInputDto,
        itmcCtnsRegInputDto: this.imageList,
        mallId: this.reviewUnWriteList.mallId,
      };
      console.log(this.reviewUnWriteList.ordDttm.substring(0, 10) + "InputDto " + JSON.stringify(InputDto));
      console.log("reviewUnWriteList " + JSON.stringify(this.reviewUnWriteList));
     // const confirmed = confirm('상품평을 등록 하시겠습니까?');
     const vm = this;
      vm.$gsdialog.confirm("상품평을 등록 하시겠습니까?").then(async function () {
          try {
        // console.log("=1=="+JSON.stringify(InputDto));
          const result = await ApiUtils.post('/fo/md/itmcmgnt/item-comment', InputDto);
        // console.log("=2=="+JSON.stringify(result.data));
          if (result.data.success) {
            console.log(" 등록완료 ");
            console.log(JSON.stringify(result.data));
            const InputEvtDto = {
              itemId: result.data.data.itemId, // 상품ID
              itmcSeqno: result.data.data.itmcSeqno, // 상품평내용
              procDttm: result.data.data.fstRegDttm,
            };
            console.log(JSON.stringify(InputEvtDto));
            const resultEvt = await ApiUtils.post('/fo/ev/eventmgnt/item-comment-event-entry', InputEvtDto);
            console.log(JSON.stringify(resultEvt));
            vm.$gsdialog.alert('상품평이 등록되었습니다.').then(dialog => {
            vm.popupCloseAction();
            });
          } else {
            vm.$gsdialog.alert(result.data.statusMessage);
          }
        } catch (e) {
          console.error('에러', e);
          vm.popupCloseAction();
        }
       }); // }
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
    onFileUpload: async function(el) {
      if (this.imageList.length < 10 ) {
      const formData = new FormData();
      formData.append('file', el.target.files[0]);
      formData.append('fileTokenId', this.fileTokenId);

      // await ApiUtils.post('/fo/cm/filemgnt/file', formData, headers).then( res => {
      await ApiUtils.post('/fo/cm/filemgnt/file', formData).then((res) => {
          if (res.data === null) {
            this.$gsdialog.alert('파일업로드에 실패하였습니다.');
            return;
          } else {
            const returnData = res.data.data;
            if (returnData.resultCode == 2) {
              alert('이미지 파일 크기가 5M를 초과 하였습니다.');
              return;
            } else if (returnData.resultCode == 3) {
              alert('업로드가 불가능한 이미지 파일입니다.');
              return;
            } else if (returnData.resultCode == 4) {
              alert('파일업로드에 실패하였습니다.');
              return;
            }
            if (this.fileTokenId === '') {
              this.fileTokenId = returnData.fileTokenId;
            }
            this.imageList.push(returnData);
          }
          el.target.value = null;
        }
      );
      } else {
        alert("사진등록은 10장까지 가능합니다");
      }
    },
    onFileDelete: function(index) {
      this.imageList.splice(index, 1);
      this.fileReset();
    },
    getImg(val) {
      let imgNm = '';
      let path = '';
      if (val != null && val != '') {
        imgNm = val.replace('{SIZE}', 300);
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
  mounted: async function() {
    this.modalActiveEvent('popupReviewWrite');
    this.accordionInit('accordion');
    this.getMbrInfo();
    const InputDto = {
      ordId: this.ordId,
      itemId: this.itemId,
      sort: 'NEW',
      offset: 0,
      limit: 10000,
      mallId: null,
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

<style>
</style>
