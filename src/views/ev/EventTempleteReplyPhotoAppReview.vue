<!--
views/ev/SC-FO-EV-GF-MS-015.vue
-->
<!-- 12.댓글이벤트(포토) [25] 앱리뷰   DEPBOSFR-7343 -->
<!-- 7658 [25] 앱리뷰 PR   DEPBOSFR-7658 변경 -->
<!-- 7658 [25] 앱리뷰 PR   DEPBOSFR-7658 변경 -->
<template>
  <section class="event-cont event-sns">
    <div class="wrap-event-sns">
      <div class="wrap-reply">
        <label for="iBditmCnts"><h2 class="title">앱리뷰 등록하신 화면을 캡쳐해서 등록해주세요.<br>
이미지는 1개만 등록 가능합니다.
</h2></label>
        <div class="hidden area-textarea">
          <textarea id="iBditmCnts" placeholder="내용을 입력해주세요." aria-label="내용 입력" v-model="evtBditm.bditmCnts" ref="iBditmCnts" @keyup="iTextCounting()" @mouseenter="isLogin()" valus="앱리뷰이미지등록"></textarea>
          <span class="text-cnt"><span class="cnt">{{textCount}}</span><span class="length">/500</span></span>
        </div>
        <div class="wrap-photo">
          <swiper :options="swiperOptionScrollX" class="wrap-list-photo">
            <swiper-slide>
              <input type="file" id="uploadPhoto" class="hidden btn-add" ref="fileInput" @change="onFileUpload()" hidden accept="image/*"/>
              <button type="button" id="chk" class="hidden btn-add" @click="loginChk"/>
              <label for="chk">
                <span class="count" aria-label="이미지 등록개수">{{imageList.length}}</span>/
                <span class="total" aria-label="이미지 최대등록개수">{{maxImgCnt}}</span>
              </label>
            </swiper-slide>
            <swiper-slide v-for="(item, index) in imageList" :key="item.bditmCtnsSeqno">
              <div class="thumb">
                <figure>
                  <img :src="item.attFileUrl" alt="고객등록이미지" />
                </figure>
                <button type="button" class="btn-delete" aria-label="이미지첨부삭제" @click="onFileDelete(index)"></button>
              </div>
            </swiper-slide>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
          </swiper>
        </div>
        <p class="list-dot">이미지는 최대 5MB이내 jpg, jpeg, png 형식의 파일 1개 이미지만 첨부하실 수 있습니다.</p>
        <button type="button" class="btn-submit" @click="addMessage">등록하기</button>
      </div>
    </div>
    <PopupPhotoReview @popupEvent="popupAction" v-if="popup.popupPhotoReview" :imageList="popupImgList"/>
  </section>
</template>
<script>
import ApiUtils from '@/common/ApiUtils';
import AccordionMixin from '@/mixins/AccordionMixin';
import SlideControlMixin from '@/mixins/SlideControlMixin';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import NoList from '@/components/common/NoList'; // 등록한 상품평이 없을 때
// import EventPhotoReviewSlide from './EventPhotoReviewSlide'; // 포토 이미지 등록 슬라이드
import PopupPhotoReview from '@/views/ev/PopupPhotoReview'; // 팝업 - 상품평 이미지 상세보기
import JwtUtils from '@/common/JwtUtils';
import DateUtils from '@/common/DateUtils';
import UseNotWords from '@/common/cu/UseNotWords';
import CookieUtils from '@/common/CookieUtils';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'; // 9월 추가
export default {
  name: 'EventTempleteReplyPhotoAppReview',
  mixins: [AccordionMixin, SlideControlMixin],
  components: {
    // EventPhotoReviewSlide,
    PopupPhotoReview,
    // NoList,
    swiper,
    swiperSlide
  },
  props: {
    fnRedirect: Function,
    fnEntry: Function,
    setDesabledEntry: Function,
    eventDtlTypeCd: String,
  },
  data() {
    return {
      swiperOptionScrollX: { // 포토
        slidesPerView: 'auto',
        freeMode: true,
        containerModifierClass: 'wrap-list-photo',
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
        },
      },
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      evtBditmList: [],
      evtBditm: {
        eventId: '',
        bditmId: '',
        bditmCnts: '',
        dspYn: '',
        offset: 0,
        limit: 5,
        imageList: [], // EvtBditmCtns
        updateImageList: [], // FileSaveDto
      },
      updateEvtBditm: {
        eventId: '',
        bditmId: '',
        bditmCnts: '',
        dspYn: '',
        offset: 0,
        limit: 5,
        imageList: [],
        loginCheckYn: '',
      },
      imageList: [],
      popupImgList: [],
      textCount: 0,
      eventInfo: {},
      totCount: 0,
      nowCount: 5,
      addCount: 10,
      nowDataList: [],
      dataFull: false,
      imgCnt: 0, // 이미지 수
      maxImgCnt: 1, // 총 이미지 수
      // END : 스타일
      popup: { // 팝업
        open: false,
        popupPhotoReview: false // 이미지 상세보기 팝업
      },
      fileTokenId: '',
      btnChk: [],
    };
  },
  methods: {
    loginChk() {
      if (this.isLogin()) {
        const param = {
          bditmCnts: this.evtBditm.bditmCnts,
          imageList: this.imageList,
        };
        document.getElementById('uploadPhoto').click();
      } else {
        this.$gsdialog.alert('로그인이 필요합니다.')
        .then(e => {
          this.$emit('fnRedirect', "login");
        });
      }
    },
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    // START : 응모 성공 (필수)
    async fnEntrySuccess(res) {
      if (res.data && res.data.success && res.data.data && res.data.data.length > 0 && !res.data.data[0].errorCode) {
        this.$gsdialog.alert("이벤트에 정상적으로 응모되었습니다.");
        this.evtBditm.bditmCnts = '';
        this.textCount = 0;
        this.imageList = [];
        this.dataFull = false;
        this.commentList('add');
      }
      this.$emit('setDesabledEntry', false);
    },
    // END : 응모 성공 (필수)
    editerAcition(el) { // 수정 영역 활성화
      this.editer[el] = !this.editer[el];
    },
    iTextCounting: function(e) {
      this.textCount = this.evtBditm.bditmCnts.length;
      if (this.textCount > 500) {
        this.evtBditm.bditmCnts = this.evtBditm.bditmCnts.substring(0, 500);
        this.textCount = this.evtBditm.bditmCnts.length;
        this.$gsdialog.alert('글자수는 500자 이내로 제한됩니다.');
      }
    },
    uTextCounting: function(e) {
      this.nowDataList[e].textCount = this.nowDataList[e].bditmCnts.length;
      if (this.nowDataList[e].textCount > 500) {
        this.nowDataList[e].bditmCnts = this.nowDataList[e].bditmCnts.substring(0, 500);
        this.nowDataList[e].textCount = this.nowDataList[e].bditmCnts.length;
        this.$gsdialog.alert('글자수는 500자 이내로 제한됩니다.');
      }
    },
    fileReset(index) { // 파일 초기화, 삭제 후 동일한 파일명으로 올릴 경우 onchange 이벤트 발생 안하는 현상을 방지하기 위함
      const input = this.$refs["fileInput"];
      input.value = '';
    },
    fileUpdateReset(index) { // 파일 초기화, 삭제 후 동일한 파일명으로 올릴 경우 onchange 이벤트 발생 안하는 현상을 방지하기 위함
      const input = this.$refs[`fileInput`+index];
      input.value = '';
    },
    onFileUpload: async function(el) {
      if (this.imageList.length == 0) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('fileTokenId', this.fileTokenId);
        await ApiUtils.post('/fo/cm/filemgnt/file', formData).then((res) => {
          if (res.data === null) {
            this.$gsdialog.alert('이미지 업로드에 실패하였습니다.');
            return;
          } else {
            const returnData = res.data.data;
            if (!res.data.success) {
              if (returnData.resultCode == '2') {
                // this.$gsdialog.alert('파일 사이즈를 확인해 주세요.');
                this.$gsdialog.alert('사진  파일 크기가 5M를 초과 하였습니다.');
              } else if (returnData.resultCode == '3') {
                this.$gsdialog.alert('파일 확장자를 확인해 주세요.');
              } else if (returnData.resultCode == '4') {
                this.$gsdialog.alert('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
              }
              return;
            }
            if (this.fileTokenId === '') {
              this.fileTokenId = returnData.fileTokenId;
            }
            if (el != null) {
              this.nowDataList[el].updateImageList.push(returnData);
              this.nowDataList[el].imageList.push({bditmImgPathNm: returnData.attFileUrl,
                                                    bditmImgFileNm: returnData.attFileNm,
                                                    useYn: 'Y'});
            } else {
              this.imageList.push(returnData);
            }
          }
        });
      } else {
        alert("이미지 등록은 1장까지 가능합니다.");
        return;
      }
    },
    onFileDelete: function(index) {
      this.imageList.splice(index, 1);
      this.fileReset(index);
    },
    onFileUpdateDelete: function(index, idx) {
      if (idx != null) {
        this.nowDataList[index].imageList.splice(idx, 1);
      } else {
        this.imageList.splice(index, 1);
      }
      this.fileUpdateReset(index);
    },
    commentList: async function(val) {
      if (val === null || val === '' || val === 'add' || val === 'del') {
        this.nowDataList = [];
        this.evtBditm.offset = 0;
        this.evtBditm.limit = 5;
        this.nowCount = 5;
      }
      this.evtBditm.loginCheckYn = this.$attrs.imgDiv;
      await ApiUtils.get('/fo/ev/bbseventmgnt/bbs-event/' + this.$route.params.eventId, this.evtBditm)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          this.evtBditmList = res.data.data.rBbsEventInq;
          this.totCount = res.data.data.totalRowCnt;
          if (this.totCount <= this.nowCount) {
            this.nowCount = this.totCount;
            this.dataFull = true;
          }
          for (let i=0; i<this.evtBditmList.length; i++) {
            this.nowDataList.push(this.evtBditmList[i]);
          }
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    },
    async editerAction(el) { // 수정 영역 활성화
      if (this.isLogin()) {
        this.nowDataList[el].textCount = this.nowDataList[el].bditmCnts.length;
        if (this.nowDataList[el].updateShowFlag) {
          await ApiUtils.put('/fo/ev/bbseventmgnt/comment/' + this.$route.params.eventId, this.nowDataList[el])
          .then(res => {
            if (res.data && res.data.success) {
              if (this.totCount <= this.nowCount) {
                this.dataFull = true;
              }
              this.textCount = 0;
              this.$gsdialog.alert("리뷰가 정상적으로 수정되었습니다.");
            }
          })
          .catch(e => {
            // this.$gsdialog.alert(e.response.data.statusMessage);
          });
        }
        this.nowDataList[el].updateShowFlag = !this.nowDataList[el].updateShowFlag;
      }
    },
    deleteAction(el) {
      if (this.isLogin()) {
        this.nowDataList[el].dspYn = 'N';
        this.$gsdialog.confirm("삭제하시겠습니까?", { cancelText: '취소' }).then(async dialog => {
          await ApiUtils.put('/fo/ev/bbseventmgnt/comment/' + this.$route.params.eventId, this.nowDataList[el])
          .then(res => {
            if (res.data && res.data.success) {
              this.dataFull = false;
              this.$gsdialog.alert("삭제되었습니다.");
              this.commentList('del');
              this.nowDataList[el].bditmCnts = '';
              this.textCount = 0;
            }
          })
          .catch(e => {
            // this.$gsdialog.alert(e.response.data.statusMessage);
          });
        }).catch(function() {});
      }
    },
    addMessage: function() {
      if (this.isLogin()) {
        const param = {
          // bditmCnts: this.evtBditm.bditmCnts,
          bditmCnts: "앱리뷰 사진등록 이벤트",
          imageList: this.imageList,
          eventDtlTypeCd: this.eventDtlTypeCd,
        };
        if (this.imageList.length == 1) {
          this.$emit('fnEntry', param);
        } else {
          alert("이미지를 등록해주세요.");
          return;
        }
      } else {
        this.$gsdialog.alert('로그인이 필요합니다.')
        .then(e => {
          this.$emit('fnRedirect', "login");
        });
      }
    },
    appendData: function() {
      if (this.nowCount < this.totCount) {
        this.evtBditm.offset = this.nowCount;
        this.nowCount += this.addCount;
        if (this.totCount <= this.nowCount) {
            this.addCount = this.totCount - (this.nowCount - this.addCount);
            this.nowCount = this.totCount;
            this.dataFull = true;
        }
        this.evtBditm.limit = this.addCount;
        this.commentList('append');
      } else {
        this.dataFull = true;
      }
    },
    reviewChange: function(idx) {
      this.nowDataList[idx].reviewFlag = !this.nowDataList[idx].reviewFlag;
    },
    popupAction(type, obj) { // 팝업 활성/비활성
      this.popupImgList = obj;
      this.popup.open = !this.popup.open;
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    getDate (date, format) {
        return DateUtils.format(date, format);
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  async mounted() {
    const eventId = this.$route.params.eventId;
    this.evtBditm.eventId = eventId;
    this.commentList();
  },
  // 9월 추가
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++ ) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
  watch: {
    nowDataList: function () {
      for (let i=0; i<this.nowDataList.length; i++) {
        if (this.nowDataList[i].imageList.length < 1 && this.nowDataList[i].bditmCnts.length <= 120) {
          this.nowDataList[i].reviewFlag=true;
          this.btnChk[i]=false;
        } else if (this.nowDataList[i].imageList.length == 1 && this.nowDataList[i].bditmCnts.length <= 85) {
          this.nowDataList[i].reviewFlag=false;
          this.btnChk[i]=false;
        } else {
          this.btnChk[i]=true;
        }
      }
    }
  }
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
