<!--
1:1문의 등 록
Design: \src\views\cs\SC-FO-CS-GF-MS-002.vue
Pg id: PG-FO-CS-O034
Uri: /cs/mbrinqr/mbr_inqr_reg
-->
<template>
  <!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
  <div :class="[{'wrap-customerservice': true}, siteClass]">
    <!-- START : Header -->
    <SubDefaultHeader headerText="1:1문의" />
    <!-- END : Header -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="inquiry-wrap">
        <div class="inner">
          <p class="txt-desc">이용 중 불편하신 사항이나 문의하실 내용을 알려주세요.</p>
          <div class="area-select">
            <div class="wrap-select">
              <select
                id="mbrInqrType"
                ref="selMbrInqrTypeCd"
                class="w-small"
                title="문의유형선택"
                v-model="inqrInfo.mbrInqrTypeCd"
                @change="mbrInqrTypeCdChange()"
              >
                <option value selected>문의유형선택</option>
                <option
                  v-for="inqrType in inqrTypeList"
                  :key="inqrType.commCd"
                  :value="inqrType.commCd"
                >{{inqrType.commCdNm}}</option>
              </select>
            </div>
            <button
              class="btn-orderproduct"
              ref="btnOrderproduct"
              aria-haspopup="dialog"
              aria-label="바로가기"
              @click="popupAction('popupInquiry')"
              v-show="mbrInqrTypeShow()"
            >주문 상품 선택</button>
          </div>
          <div class="box-selectproduct" v-if="selectproduct">
            <p class="data" v-if="prdNmYn">{{prdNm}}</p>
            <p class="data" v-else>{{inqrInfo.ordNoDateConts}}</p>
            <p class="productname">
              <span>{{ inqrInfo.ordItemNmConts }}</span>
              {{ inqrInfo.ordItemCntConts }}
            </p>
            <button type="button" class="btn-del" @click="clearSelOrdItemInfo()">
              <span class="hidden">삭제</span>
            </button>
          </div>
          <!-- START : textarea -->
          <div class="wrap-textarea">
            <div class="inner-textarea">
              <textarea
                id="txtCnt"
                ref="txtMbrInqrCnts"
                placeholder="최소 10자 이상 ~ 최대 2,000자 이내로 작성해주세요"
                title="문의글 입력"
                v-model="inqrInfo.mbrInqrCnts"
                @keyup="mbrInqrCntsCharCount()"
              ></textarea>
              <div class="wrap-imageupload">
                <!-- 수정 2020.03.06 첨부된 이미지 없으면 해당 영역 hidden -->
                <div class="file-image" v-for="(item, index) in imageList" :key="index">
                  <img :src="item.attFileUrl" alt="고객등록이미지" />
                  <button
                    type="button"
                    class="reset"
                    aria-label="이미지첨부삭제"
                    @click="onFileDelete(index)"
                  ></button>
                </div>
              </div>
              <div class="txt-byte">
                <span class="hidden">현재 작성한 글자 수</span>
                <em id>{{this.inqrInfo.mbrInqrCntsLength}}</em>
                <span>/</span>
                <span class="hidden">최대 작성 글자 수</span>
                <span>2000</span>
              </div>
            </div>
            <div class="wrap-btn-imageupload">
              <input
                type="file"
                id="imgupload"
                class="hidden btn-add"
                ref="fileInput"
                accept="image/*"
                @change="onFileUpload"
              />
              <label class="btn-imageupload" for="imgupload">
                <span class="btn-name">사진첨부</span>
              </label>
              <span class="desc">이미지 5MB이내 / 최대 3장 첨부 가능</span>
            </div>
          </div>
          <!-- END : textarea -->
          <!-- START : 답변 알림요청 -->
          <div class="wrap-answerrequest">
            <div class="inner-answerrequest">
              <div class="inp-chk small">
                <input type="checkbox" name id="chkList01_02" v-model="inqrInfo.smsRcvYnChk" />
                <label for="chkList01_02">답변 알림요청</label>
              </div>
              <p class="txt-number">{{toPhoneFormat(inqrInfo.moblTelNo)}}</p>
              <button class="link-more" title="정보수정으로 이동" @click="changeInfo()">정보수정</button>
            </div>
          </div>
          <!-- END : 답변 알림요청 -->
          <!-- START : button -->
          <div class="wrap-btn">
            <button type="button" class="btn-lg btn-bg darkgray" @click="cancelMbrInqr()">
              <span>취소</span>
            </button>
            <button type="button" class="btn-lg btn-bg lightgreen" @click="saveMbrInqr()">
              <span>등록</span>
            </button>
          </div>
          <!-- END : button -->
        </div>
      </div>
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <!-- START : popup -->
    <MbrInqrOdrItemList
      @popupEvent="popupAction"
      v-if="this.popup.popupInquiry"
      :parentOrdItemList="selectOrdItemList"
      @selectOrdItemsCallbackFun="selectOrdItemsCallback"
    />
    <!-- END : popup -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import MbrInqrOdrItemList from '@/views/cs/mbrinqr/MbrInqrOdrItemList'; // 팝업 - 주문상품선택
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import UseNotWords from '@/common/cu/UseNotWords';
export default {
  name: 'Inquiry',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '1:1문의 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '1:1문의^1:1문의 작성',
      },
    ],
  },
  components: {
    SubDefaultHeader,
    Footer,
    MbrInqrOdrItemList,
  },
  data() {
    return {
      popup: {
        // 팝업
        open: false,
        popupInquiry: false, // 팝업
      },
      inqrInfo: {
        cmmMbrNo: '', // 고객번호
        custNm: '',
        mallId: '',
        mbrInqrNo: '' /* 회원문의번호 */,
        ordId: '' /* 주문ID */,
        storId: '' /* 매장ID */,
        mbrInqrSpCd: '01' /* 회원문의구분코드(01:일대일, 02:Q&A) */,
        mbrInqrTypeCd: '' /* 회원문의유형코드 */,
        mbrInqrTypeNm: '' /* 회원문의유형명 */,
        mbrInqrCnts: '' /* 회원문의내용 */,
        attFileId: '' /* 첨부파일ID */,
        smsRcvYn: '' /* SMS수신여부 */,
        moblTelNo: '' /* 답변알람요청전화번호*/,
        pblYn: 'Y' /* 공개여부 */,
        mbrInqrCntsLength: 0 /* 문의내용입력수 */,
        smsRcvYnChk: false /* 답변알람요청여부 */,
        ordNoDateConts: '' /* 선택주문번호, 주문일자 */,
        ordItemNmConts: '' /* 선택주문대표상품명 */,
        ordItemCntConts: '' /* 선택주문상품수 */,
        brandNm: '' /* 브랜드명 */,
        cmmSiteId: '',
      },
      siteClass: CookieUtils.getSiteClass(),
      selectproduct: false, // 주문 상품 선택 flag
      selectOrdItemList: [], // 선택된 주문 상품
      fileTokenId: '', // 파일저장ID
      imageList: [], // 첨부파일 이미지 list
      inqrTypeList: [], // 문의유형
      isBtnOrdSelect: false, // 주문 상품 선택 활성화여부
      prdNmYn: false,
    };
  },
  methods: {
    mbrInqrTypeShow() {
      return !(
        this.inqrInfo.mbrInqrTypeCd == '' ||
        this.inqrInfo.mbrInqrTypeCd == '04' ||
        this.inqrInfo.mbrInqrTypeCd == '05' ||
        this.inqrInfo.mbrInqrTypeCd == '06'
      );
    },
    // 문의유형 공통코드 조회
    async commCdSearch(commGrpCd) {
      const params = {
        commGrpCd: commGrpCd,
      };
      await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params).then(res => {
        this.inqrTypeList = res.data.data;
      });
    },
    // 주문상품선택 팝업 callback
    selectOrdItemsCallback(selectOrdItemList, type) {
      this.selectOrdItemList = selectOrdItemList;
      let ordNoDateConts = '';
      let ordItemNmConts = '';
      let ordItemCntConts = '';
      const vSelectItemCnt = this.selectOrdItemList.length;
      if (type == 'Mf') {
        this.prdNmYn = false;
        if (vSelectItemCnt > 0) {
          ordNoDateConts =
            this.selectOrdItemList[0].ordDttm +
            ' [ 주문번호 : ' +
            this.selectOrdItemList[0].ordId +
            ' ]';

          ordItemNmConts = this.selectOrdItemList[0].itemNm;
          if (vSelectItemCnt > 1) {
            ordItemCntConts += ' 외 ' + (vSelectItemCnt - 1);
          }
        }
        this.inqrInfo.ordId = this.selectOrdItemList[0].ordId;
        this.inqrInfo.storId = this.selectOrdItemList[0].storId;
        this.inqrInfo.ordNoDateConts = ordNoDateConts;
        this.inqrInfo.ordItemNmConts = ordItemNmConts;
        this.inqrInfo.ordItemCntConts = ordItemCntConts;
        this.setOrdItemSelectZoneEnable();
      } else {
        this.prdNmYn = true;
        if (vSelectItemCnt > 0) {
          ordNoDateConts =
            this.selectOrdItemList[0].ordDt +
            ' [' +
            this.selectOrdItemList[0].ordId +
            ']';
          ordItemNmConts = this.selectOrdItemList[0].itemNm;
          if (vSelectItemCnt > 1) {
            ordItemCntConts += ' 외 ' + (vSelectItemCnt - 1);
          }
        }
        this.inqrInfo.ordId = this.selectOrdItemList[0].ordId;
        this.inqrInfo.storId = this.selectOrdItemList[0].storId;
        this.inqrInfo.brandNm = this.selectOrdItemList[0].brandNm;
        this.inqrInfo.ordNoDateConts = ordNoDateConts;
        this.inqrInfo.ordItemNmConts = ordItemNmConts;
        this.inqrInfo.ordItemCntConts = ordItemCntConts;
        this.setOrdItemSelectZoneEnable();
      }
    },
    back: function() {
      this.$router.push('/cs/mbrinqr/mbr_inqr_list');
    },
    // 문의내용 문자길이 계산
    mbrInqrCntsCharCount() {
      const txt = document.getElementById('txtCnt').value;
      if (txt.length > 2000) {
        this.$gsdialog.alert('문의내용은 2000자 이내로 제한됩니다.');
        this.inqrInfo.mbrInqrCnts = this.inqrInfo.mbrInqrCnts.substring(
          0,
          2000
        );
        // 내용초기화
        document.getElementById('txtCnt').value = this.inqrInfo.mbrInqrCnts;
        // 길이초기화
        this.inqrInfo.mbrInqrCntsLength = this.inqrInfo.mbrInqrCnts.length;
        // 포커싱
        this.$refs.txtMbrInqrCnts.focus();
      } else {
        this.inqrInfo.mbrInqrCntsLength = txt.length;
      }
    },
    // 주문상품선택 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false);
    },
    // 선택한 주문상품 초기화
    clearSelOrdItemInfo() {
      this.selectOrdItemList = [];
      this.inqrInfo.ordNoDateConts = '';
      this.inqrInfo.ordItemNmConts = '';
      this.inqrInfo.ordItemCntConts = '';
      this.setOrdItemSelectZoneEnable();
    },
    // 정보수정 => 비밀번호 체크
    async changeInfo() {
      if (this.inqrInfo.mbrInqrCnts.length > 0) {
        const confirmFlag = await this.$gsdialog.confirm(
          '입력하신 내용이 사라집니다.계속 하시겠습니까?'
        );
        if (confirmFlag) {
          this.$router.push('/cu/password_re_check');
        }
      } else {
        this.$router.push('/cu/password_re_check');
      }
    },
    // 취소버튼
    async cancelMbrInqr() {
      const confirmFlag = await this.$gsdialog.confirm(
        '1:1문의접수가 완료 되지 않았습니다.<br>문의를 중단하시겠습니까?',
        { html: true }
      );
      if (confirmFlag) {
        this.back();
      }
    },
    // 등록버튼
    async saveMbrInqr() {
      // 문의유형 선택 여부 체크
      if (StringUtils.isEmpty(this.inqrInfo.mbrInqrTypeCd) == true) {
        this.$gsdialog.alert('문의유형을 선택하세요.').then(dialog => {
          this.$refs.selMbrInqrTypeCd.focus();
        });
        return false;
      }
      // 주문상품 선택 여부 체크
      if (this.isBtnOrdSelect) {
        if (!this.selectproduct) {
          this.$gsdialog
            .alert('문의하실 주문 상품을 선택해주세요')
            .then(dialog => {
              if (
                this.inqrInfo.mbrInqrTypeCd == '01' ||
                this.inqrInfo.mbrInqrTypeCd == '02' ||
                this.inqrInfo.mbrInqrTypeCd == '03'
              ) {
                this.$refs.btnOrderproduct.click();
              }
            });
          return false;
        }
      }
      // 문의내용입력 여부 체크
      if (
        StringUtils.isEmpty(StringUtils.trim(this.inqrInfo.mbrInqrCnts)) == true
      ) {
        this.$gsdialog.alert('문의내용을 입력하세요.').then(dialog => {
          this.$refs.txtMbrInqrCnts.focus();
        });
        return false;
      }
      // 문의내용 최소 10자
      if (StringUtils.trim(this.inqrInfo.mbrInqrCnts).length < 10) {
        this.$gsdialog
          .alert('문의내용은 10자 이상만 가능합니다.')
          .then(dialog => {
            this.$refs.txtMbrInqrCnts.focus();
          });
        return false;
      }
      // 문의내용 최대 2000자
      this.mbrInqrCntsCharCount();

      // const words = UseNotWords.getWords();
      // for (let n = 0; n < words.length; n++) {
      //   if (this.inqrInfo.mbrInqrCnts.indexOf(words[n]) != -1) {
      //       this.$gsdialog.alert("작성하신 글에 금칙어가 포함되어 있습니다.");
      //       return;
      //   }
      // }
      // SMS수신여부
      this.inqrInfo.smsRcvYn = this.inqrInfo.smsRcvYnChk ? 'Y' : 'N';

      // MallNm셋팅
      this.inqrInfo.mallId = CookieUtils.getMallId();

      // cmmSiteId 세팅
      this.inqrInfo.cmmSiteId = CookieUtils.getCmmSteId();

      // storId셋팅 - 선택된 주문없으면 CookieUtils에서 STOR_ID가져온다.
      this.inqrInfo.storId = StringUtils.isEmpty(this.inqrInfo.storId)
        ? CookieUtils.getCookie('STOR_ID')
        : this.inqrInfo.storId;

      const params = {
        inqrInfo: this.inqrInfo, // 기본 문의 정보
        mbrInqrOrdItemList: this.selectOrdItemList, // 주문 상품
        fileSaveDtoList: this.imageList, // 첨부파일
      };

      console.log('등록 값 :::', params);

      const $vm = this;
      await this.$gsdialog
        .confirm('1:1 문의를 등록하시겠습니까?')
        .then(async function() {
          await ApiUtils.post(
            '/fo/cs/mbrinqrmgnt/member-inquire-save',
            params
          ).then(res => {
            if (res.data.success === true) {
              $vm.$gsdialog
                .alert('문의하신 내용이 등록되었습니다.')
                .then(() => {
                  $vm.back();
                })
                .catch(e => {
                  $vm.fileTokenId = ''; // 파일아이디 초기화
                  $vm.imageList = []; // 첨부파일 초기화
                  $vm.inqrInfo.mbrInqrCnts = ''; // 내용초기화
                  $vm.inqrInfo.mbrInqrTypeCd = ''; // 문의유형초기화
                  $vm.inqrInfo.ordItemNmConts = '';
                  $vm.inqrInfo.ordItemCntConts = '';
                  $vm.inqrInfo.ordNoDateConts = '';
                  $vm.selectproduct = false;
                });
              /* $vm.$gsdialog
                .confirm(
                  '문의하신 내용이 등록되었습니다.<br>이후 답변 확인은 마이페이지 > 1:1 문의내역에서<br> 확인 가능합니다.<br>등록하신 내역을 확인하시겠습니까?',
                  { html: true }
                )
                .then(() => {
                  $vm.back();
                })
                .catch(e => {
                  $vm.fileTokenId = ''; // 파일아이디 초기화
                  $vm.imageList = []; // 첨부파일 초기화
                  $vm.inqrInfo.mbrInqrCnts = ''; // 내용초기화
                  $vm.inqrInfo.mbrInqrTypeCd = ''; // 문의유형초기화
                  $vm.inqrInfo.ordItemNmConts = '';
                  $vm.inqrInfo.ordItemCntConts = '';
                  $vm.inqrInfo.ordNoDateConts = '';
                  $vm.selectproduct = false;
                }); */
            } else {
              $vm.$gsdialog.alert(res.data.statusMessage);
            }
          });
        })
        .catch(e => {
          // console.log("저장안함");
        });
    },
    // 문의유형 선택 시 화면처리 문의유형 01 ~ 03만 주문상품을 선택가능)
    mbrInqrTypeCdChange: function() {
      // 문의유형NM넣기.
      if (!StringUtils.isEmpty(this.inqrInfo.mbrInqrTypeCd)) {
        this.inqrInfo.mbrInqrTypeNm = this.inqrTypeList[
          Number(this.inqrInfo.mbrInqrTypeCd - 1)
        ].commCdNm;
      }
      if (
        this.inqrInfo.mbrInqrTypeCd == '01' ||
        this.inqrInfo.mbrInqrTypeCd == '02' ||
        this.inqrInfo.mbrInqrTypeCd == '03'
      ) {
        // 01배송,02상품,03교환/반품/취소
        this.isBtnOrdSelect = true;
      } else {
        this.isBtnOrdSelect = false;
        this.clearSelOrdItemInfo(); // 주문정보 초기화
      }
      this.$refs.btnOrderproduct.disabled = !this.isBtnOrdSelect;
    },
    // 선택된 상품정보 노출 여부처리
    setOrdItemSelectZoneEnable: function() {
      if (this.selectOrdItemList.length > 0) {
        this.selectproduct = true;
      } else {
        this.selectproduct = false;
      }
    },
    // 파일업로드
    onFileUpload: async function(el) {
      if (this.imageList.length < 3) {
        if (!this.isValidFile(el)) return;

        const formData = new FormData();
        formData.append('file', el.target.files[0]);
        formData.append('fileTokenId', this.fileTokenId);
        await ApiUtils.post('/fo/cm/filemgnt/file', formData).then(res => {
          if (res.data.success === false) {
            if (res.data.statusCode == 'bo.info.ss.199') {
              this.$gsdialog.alert('사진은 5MB 까지만 첨부 가능합니다.');
            } else if (res.data.statusCode == 'bo.info.ss.198') {
              this.$gsdialog.alert('파일 확장자 오류입니다.');
            } else {
              this.$gsdialog.alert('파일업로드에 실패하였습니다.');
            }
            return;
          } else {
            const returnData = res.data.data;
            if (this.fileTokenId === '') {
              this.fileTokenId = returnData.fileTokenId;
            }
            this.inqrInfo.attFileId = this.fileTokenId;
            this.imageList.push(returnData);
          }
          el.target.value = null;
        });
      } else {
        this.$gsdialog.alert('사진은 3장까지 첨부 가능합니다');
      }
    },
    // 파일 삭제
    onFileDelete: function(index) {
      this.imageList.splice(index, 1);
    },
    // 회원정보 가져오기
    async getMbrInfo() {
      await ApiUtils.get('/fo/cu/mbrmgnt/member-information', null).then(
        res => {
          const userInfo = res.data.data;
          const moblTelNo1 = userInfo.moblTelNo1;
          const moblTelNo2 =
            userInfo.moblTelNo2.length > 7
              ? userInfo.moblTelNo2.substr(0, 4)
              : userInfo.moblTelNo2.substr(0, 3);
          const moblTelNo3 =
            userInfo.moblTelNo2.length > 7
              ? userInfo.moblTelNo2.substr(4, 4)
              : userInfo.moblTelNo2.substr(3, 4);
          this.inqrInfo.moblTelNo = moblTelNo1 + moblTelNo2 + moblTelNo3;
          this.inqrInfo.custNm = userInfo.custNm;
        }
      );
    },
    // 핸드폰 번호 파싱
    toPhoneFormat(num) {
      if (StringUtils.isEmpty(num)) return '';
      let formatNum = '';
      if (num.length == 11) {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      } else if (num.length == 8) {
        formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
      } else if (num.length == 10) {
        if (num.indexOf('02') == 0) {
          formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        } else {
          formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
      } else {
        formatNum = num;
      }
      return formatNum;
    },
    isValidFile(file) {
      const maxSize = 5242880;
      if (file.target.files[0].size > maxSize) {
        this.$gsdialog.alert('이미지 첨부는 5MB 까지만 가능합니다.');
        return false;
      }
      return true;
    },
  }, // methods END
  computed: {
    prdNm: function() {
      const prdNm =
        this.inqrInfo.ordNoDateConts + ' [' + this.inqrInfo.brandNm + '] ';
      return prdNm;
    },
    // cntsLength: function() {
    //   return this.inqrInfo.mbrInqrCnts.length;
    // }
  },
  created() {
    this.commCdSearch('CS0002'); // 문의유형조회
    this.getMbrInfo(); // 회원정보 가져오기(핸드폰)
  },
  mounted() {
    this.mbrInqrTypeCdChange(); // 문의유형선택 시 발생하는 이벤트
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
};
</script>

<style>
</style>
