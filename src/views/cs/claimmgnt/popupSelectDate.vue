<!--
Design: views/ss/SC-FO-SS-GF-MP-864.vue
Pg id:
Uri:
-->
<template>
  <div id="popupSelectDate" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupSelectDate}, siteClass]">
    <div class="header-popup">
      <strong>방문날짜선택</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section v-if="!(ordDlvpRslt.delivTypeCd == '03')" class="wrap-breakdown return-notice">
          <p class="title">회수 날짜 및 추가정보를 선택하세요</p>
          <p>
            선택하신 날짜에 상품을 수거 할 예정입니다.
            <br />회수 주소는 변경할 수 없습니다.
          </p>
        </section>
        <section class="section wrap-breakdown">
          <!-- START : 상품 회수지 정보 -->
          <h3>상품 회수지</h3>
          <div class="receive-delivery-info">
            <div class="my-address">
              <p>
                <span class="name">{{ordDlvpRslt.adrsNm}}</span>{{toPhoneFormat(ordDlvpRslt.adrsTelNo)}}
              </p>
              <p>
                <span class="code">{{ordDlvpRslt.adrsZipcd}}</span>{{ordDlvpRslt.adrsAddr}}
              </p>
            </div>
          </div>
          <!-- END : 상품 회수지 정보 -->
          <!-- START : 방문 시간 선택 -->
          <section class="border">
            <h3 class="tit-mypage-sub border">방문 시간 선택</h3>
            <div class="inner">
              <table class="delivery-time-table" summary="배송 날짜 및 배송 시간을 지정하는 표" v-if="ordDlvpRslt.delivTypeCd != '03'">
                <caption>배송 날짜 및 배송 시간 지정</caption>
                <colgroup>
                  <col style="width: 47px;" />
                  <col v-for="delivDt in delivDtList" v-bind:key="delivDt.delivDt" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">
                      배송<br />시간
                    </th>
                    <th scope="col" v-for="delivDt in delivDtList" v-bind:key="delivDt.delivDt">{{toFormat(delivDt.delivDt, 'MM/DD')}} ({{delivDt.dow}})</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(delivDtTmInfo, seqIdx) in delivDtTmList" v-bind:key="delivDtTmInfo.delivBeginTm" v-show="rowFlag(seqIdx)">
                    <th scope="row">
                      {{getFormatTime(delivDtTmInfo.delivBeginTm)}}<span class="br">~</span>{{getFormatTime(delivDtTmInfo.delivEndTm)}}
                    </th>
                    <td v-for="(delivDtInfo, dtIdx) in delivDtList" v-bind:key="delivDtInfo.delivDt" :class="delivDtInfo.delivDt == toDay() ? 'today' : ''">
                      <span v-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '04'">휴무일</span>
                      <span v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '02'">마감</span>
                      <span v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '05'">준비중</span>
                      <span v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '06'" class="inp-radio small">
                        <input type="radio" :disabled="true" />
                      </span>
                      <span v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '01'" class="inp-radio small">
                        <input type="radio" name="delivSeqsSeqno" v-bind:id="'delivSeqsSeqno_'+seqIdx+'_'+dtIdx" v-bind:value="checkVal(seqIdx, dtIdx, delivDtList.length)" :title="toFormat(delivDtInfo.delivDt, 'MM/DD')+'('+delivDtInfo.dow+') '+delivDtTmInfo.delivBeginTm+'~'+delivDtTmInfo.delivEndTm" @click="updateDelivSeqsInfo(seqIdx, dtIdx, delivDtList.length)"/>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="delivery-time-table" summary="배송 날짜 및 배송 시간을 지정하는 표" v-else>
                <caption>배송 날짜 및 배송 시간 지정</caption>
                <colgroup>
                  <col style="width: 47px;" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">배송 시간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1~3일 내로 고객님께 직접 방문합니다.</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <!-- END : 방문 시간 선택 -->
          <!-- START : 상품 회수 위치 -->
          <div class="inner">
            <h3 class="tit-mypage-sub border">상품 회수 위치</h3>
            <div class="select-location">
              <p>
                <span class="wrap-select w100">
                  <select id title="상품 수령 위치 선택" v-model="dlvpInfoRslt.dlvrMethoCd" @change="initDlvpInfo(dlvpInfoRslt.dlvrMethoCd)">
                    <option v-for="(dlvrMetho, inx) in dlvrMethoList" :key="inx" :value="dlvrMetho.commCd" >{{dlvrMetho.commCdNm}}</option>
                  </select>
                </span>
              </p>
              <!-- START : 문 앞 -->
              <div class="location-content" id="option1" v-if="dlvpInfoRslt.dlvrMethoCd === '01' || dlvpInfoRslt.dlvrMethoCd === '02'">
                <div class="check-area type01">
                  <span v-for="(dlvrMethoAdd, inx) in dlvrMethoAddList" :key="inx">
                    <div class="entrance-num" v-if="inx === 0">
                      <span class="inp-radio small">
                        <input type="radio" name="rdoDlvrMethoAdd" :id="'rdoDlvrMethoAdd'+inx" :value="dlvrMethoAdd.commCd" v-model="dlvpInfoRslt.dlvrMethoAddCd" @change="initDlvpInfo(dlvpInfoRslt.dlvrMethoCd, dlvpInfoRslt.dlvrMethoAddCd)"/>
                        <label :for="'rdoDlvrMethoAdd'+inx">{{dlvrMethoAdd.commCdNm}}</label>
                      </span>
                      <button type="button" class="btn icon-question" aria-label="공동현관출입번호안내 팝업 활성화" aria-haspopup="dialog" @click="PopupEntranceNumber">
                        <span class="hidden">공동현관출입번호안내</span>
                      </button>
                    </div>
                    <span v-else :class="'inp-radio small' + (inx == 1 ? ' w125' : '')">
                      <input type="radio" name="rdoDlvrMethoAdd" :id="'rdoDlvrMethoAdd'+inx" :value="dlvrMethoAdd.commCd" v-model="dlvpInfoRslt.dlvrMethoAddCd" @change="initDlvpInfo(dlvpInfoRslt.dlvrMethoCd, dlvpInfoRslt.dlvrMethoAddCd)"/>
                      <label :for="'rdoDlvrMethoAdd'+inx">{{dlvrMethoAdd.commCdNm}}</label>
                    </span>
                  </span>
                </div>
                <div v-if="dlvpInfoRslt.dlvrMethoAddCd === '1'">
                  <p>
                    <input class="inp-txt w100" type="text" id="txtDtlCnts" v-model="dlvpInfoRslt.dlvrMethoDtlCnts" placeholder="자세히 입력해주세요 예) #1234 호출버튼" title="공동현관출입번호 입력"/>
                  </p>
                  <p class="check-area">
                    <span class="inp-chk small">
                      <input type="checkbox" name="dlvrMethoYn" id="dlvrMethoYn" v-model="dlvpInfoRslt.dlvrMethoYn"/>
                      <label for="dlvrMethoYn">다음 주문에도 사용 동의</label>
                    </span>
                  </p>
                </div>
              </div>
              <!-- END : 문 앞 -->
              <!-- START : 기타 -->
              <div class="location-content" id="option1" v-if="dlvpInfoRslt.dlvrMethoCd === '99'">
                <div class="write-wrap">
                  <textarea id="txtDtlCnts" v-model="dlvpInfoRslt.dlvrMethoDtlCnts" title="배송 요청사항 메시지 입력" placeholder="내용을 입력해 주세요."></textarea>
                  <span class="txt-byte">
                    <span class="hidden">현재 작성한 글자 수</span>
                    <em id>{{keydownDtlCnts(dlvpInfoRslt.dlvrMethoDtlCnts)}}</em>
                    <span>/</span>
                    <span class="hidden">최대 작성 글자 수</span>
                    <span>100</span>
                  </span>
                </div>
              </div>
              <!-- START : 문 앞 -->
              <div class="location-content" id="option1" v-if="dlvpInfoRslt.dlvrMethoAddCd !== '1'">
                <div>
                  <div class="txt-info-list">
                    <p class="ico-alert2">출입이 불가할 경우 회수가 불가능하여 자동으로 반품 신청이 취소 처리 될 수 있습니다.</p>
                  </div>
                </div>
              </div>
              <!-- END : 기타 -->
            </div>
          </div>
          <!-- END : 상품 회수 위치 -->
        </section>
        <div class="bottom-btn-area mt0">
          <button type="button" class="btn-lg btn-bg darkgray" @click="saveDlvpInfo">
            <span>저장</span>
          </button>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction(false)" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기">
      <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
    <!--  START : 팝업 -->
    <PopupEntranceNumber @popupEvent="popupAction" v-if="this.popup.popupEntranceNumber" /> <!-- 팝업 - 공동현관출입번호 -->
    <!--  END : 팝업 -->
  </div>
</template>

<script>
import PopupEntranceNumber from '@/views/cs/claimmgnt/PopupEntranceNumber'; // 팝업 - 공동현관출입번호
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'PopupSelectDate',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '방문날짜선택 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '방문날짜 선택',
      },
    ],
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
      popup: {
        open: false,
        popupEntranceNumber: false,
      },
      frontDoorValue: 0, // 공동 현관 선택
      custCentTel: null,
      delivSeqsList: [],
      delivDtList: [],
      delivDtTmList: [],
      dlvpInfoRslt: {
        delivReqDt: null,
        delivBeginTm: null,
        delivEndTm: null,
        delivSlotNm: null,
        delivSeqs: null,
        delivSeqsSeqno: null,
        dlvrMethoYn: false, // 전달방법여부
        beforeDlvrMethoYn: false,
        dlvrMethoCd: '01',
        dlvrMethoAddCd: '1',
        dlvrMethoDtlCnts: '',
        beforeDlvrMethoDtlCnts: '',
      },
      dlvrMethoList: [],
      dlvrMethoAddList: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  props: {
    ordDlvpRslt: Object,
  },
  components: {
    PopupEntranceNumber,
  },
  methods: {
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    PopupEntranceNumber() {
      this.popupAction('popupEntranceNumber');
    },
    popupCloseAction(flag) {
      if (flag) {
        this.$emit('popupEvent', this.dlvpInfoRslt);
      } else {
        this.$emit('popupEvent', Object.assign({}, this.dlvpInfoRslt, {
          delivReqDt: this.ordDlvpRslt.retSchedDt,
          delivBeginTm: this.ordDlvpRslt.retSchedBeginTm,
          delivEndTm: this.ordDlvpRslt.retSchedEndTm,
          delivSeqs: this.ordDlvpRslt.delivSeqs,
          delivSeqsSeqno: this.ordDlvpRslt.delivSeqsSeqno,
          dlvrMethoCd: this.ordDlvpRslt.dlvrMethoCd,
          dlvrMethoAddCd: this.ordDlvpRslt.dlvrMethoAddCd,
          dlvrMethoDtlCnts: this.ordDlvpRslt.dlvrMethoDtlCnts,
          delivSlotNm: this.ordDlvpRslt.delivSlotNm,
        }));
      }
      this.modalActiveEvent('popupSelectDate');
    },
    toDay() {
      return DateUtils.format(DateUtils.getToday(), 'YYYYMMDD');
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    toFormat(x, y) {
      return DateUtils.format(x, y);
    },
    toPhoneFormat(num) {
      if (this.isEmpty(num)) return '';
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
    getByteLength(s) {
      return StringUtils.getByteLength(s);
    },
    checkVal(rowidx, colIdx, cnt) {
      // 라디오버튼 value 값 지정
      return this.delivSeqsList[rowidx * cnt + colIdx].delivSeqsSeqno;
    },
    checkVisible(rowidx, colIdx, cnt) {
      // 마감, 휴무일, 라디오버튼 체크
      return this.delivSeqsList[rowidx * cnt + colIdx].seqsStatCd;
    },
    rowFlag(rowIdx) {
      let viewFlag = true;
      // 프리타임 시간을 노출 안할 때 빈 tr 안보이게 처리
      const delivSeqs = this.delivDtTmList[rowIdx].delivSeqs;
      if (delivSeqs == '99') {
        viewFlag = false;
      }
      // 차수마감일시가 10시 보다 이전인 경우 방문시간을 비노출한다.
      this.delivSeqsList.filter(dtlInfo => {
        if (dtlInfo.delivSeqs == this.delivDtTmList[rowIdx].delivSeqs && this.toFormat(dtlInfo.seqsClsDttm, 'HHmm') < '1000') {
          viewFlag = false;
        }
      });
      return viewFlag;
    },
    initDlvpInfo(dlvrMethoCd, dlvrMethoAddCd) {
      if (dlvrMethoCd == '01' || dlvrMethoCd == '02') {
        if (this.isEmpty(dlvrMethoAddCd)) {
          this.dlvpInfoRslt.dlvrMethoAddCd = '1';
          this.dlvpInfoRslt.dlvrMethoDtlCnts = '';
          this.dlvpInfoRslt.beforeDlvrMethoDtlCnts = '';
        } else {
          this.dlvpInfoRslt.dlvrMethoDtlCnts = '';
          this.dlvpInfoRslt.beforeDlvrMethoDtlCnts = '';
        }
      } else if (dlvrMethoCd == '99') {
        this.dlvpInfoRslt.dlvrMethoAddCd = '';
        this.dlvpInfoRslt.dlvrMethoDtlCnts = '';
        this.dlvpInfoRslt.beforeDlvrMethoDtlCnts = '';
      } else {
        this.dlvpInfoRslt.dlvrMethoAddCd = '';
        this.dlvpInfoRslt.dlvrMethoDtlCnts = '';
        this.dlvpInfoRslt.beforeDlvrMethoDtlCnts = '';
      }
    },
    async delivSeqsSerh() {
      if (this.isEmpty(this.ordDlvpRslt.delivPolcId)) {
        // 임시로직 ( 정상 데이터는 배송정책ID 정보가 없을 수 없음.)
        this.$gsdialog.alert("배송슬롯 정보를 조회 할 수 없습니다.<br/>고객센터("+this.custCentTel.commCdNm+")로 접수해 주시기 바랍니다.", { html: true });
        this.popupCloseAction();
        return;
      }
      if (this.ordDlvpRslt.delivTypeCd == '03') {
        // 업체택배 배송의 경우 시간을 선택하지 않음.
        this.dlvpInfoRslt.delivSlotNm = '1~3일 내로 고객님께 직접 방문합니다.';
        this.dlvpInfoRslt.delivSeqs = 0;
        this.dlvpInfoRslt.delivSeqsSeqno = 0;
        return;
      }
      const params = {};
      params.delivPolcId = this.ordDlvpRslt.delivPolcId; // 배송정책ID
      params.bundlDelivOrdId = this.ordDlvpRslt.bundlDelivOrdId; // 묶음배송주문ID
      const response = await ApiUtils.post('/fo/od/ordsmgnt/gs-delivSeq-list', JSON.stringify(params));
      this.delivSeqsList = response.data.data.odDelivSeqsList;
      this.delivDtList = response.data.data.odDelivDtList;
      this.delivDtTmList = response.data.data.odDelivDtTmList;
      // delivSeqs: '99' freeTime Data 삭제
      for (let idx = 0; idx < this.delivDtTmList.length; idx++) {
        if (this.delivDtTmList[idx].delivSeqs == '99') {
          this.delivDtTmList.splice(idx, 1);
        }
      }
    },
    updateDelivSeqsInfo(rowidx, colIdx, cnt) {
      this.dlvpInfoRslt.delivReqDt = this.delivSeqsList[rowidx * cnt + colIdx].delivDt;
      this.dlvpInfoRslt.delivBeginTm = this.delivSeqsList[rowidx * cnt + colIdx].delivBeginTm;
      this.dlvpInfoRslt.delivEndTm = this.delivSeqsList[rowidx * cnt + colIdx].delivEndTm;
      this.dlvpInfoRslt.delivSeqs = this.delivSeqsList[rowidx * cnt + colIdx].delivSeqs;
      this.dlvpInfoRslt.delivSeqsSeqno = this.delivSeqsList[rowidx * cnt + colIdx].delivSeqsSeqno;
    },
    keydownDtlCnts(strDtl) {
      if (this.getByteLength(strDtl) > 100) {
        this.dlvpInfoRslt.dlvrMethoDtlCnts = this.dlvpInfoRslt.beforeDlvrMethoDtlCnts;
      } else {
        this.dlvpInfoRslt.beforeDlvrMethoDtlCnts = strDtl;
      }
      return this.getByteLength(strDtl);
    },
    validatDlvpInfo() {
      if (this.ordDlvpRslt.delivTypeCd != '03' && this.isEmpty(this.dlvpInfoRslt.delivSeqsSeqno)) {
        this.$gsdialog.alert("방문 시간을 선택 해주세요.", {html: true});
        return false;
      }
      if (this.dlvpInfoRslt.dlvrMethoAddCd == '1' && this.isEmpty(this.dlvpInfoRslt.dlvrMethoDtlCnts)) {
        this.$gsdialog.alert("공통현관출입번호를 입력해주세요.", {html: true});
        return false;
      }
      return true;
    },
    saveDlvpInfo() {
      if (!this.validatDlvpInfo()) {
        return;
      }
      let params = {
        mbrDlvpSeqno: this.ordDlvpRslt.mbrDlvpSeqno,
        itemDlvrMethoCd: null,
        itemDlvrMethoAddCd: null,
        itemDlvrMethoDtlCnts: null,
      };
      if (this.dlvpInfoRslt.dlvrMethoYn && this.dlvpInfoRslt.dlvrMethoCd == '01' && this.dlvpInfoRslt.dlvrMethoAddCd == '1') {
        params = {
          mbrDlvpSeqno: this.ordDlvpRslt.mbrDlvpSeqno,
          itemDlvrMethoCd: this.dlvpInfoRslt.dlvrMethoCd,
          itemDlvrMethoAddCd: this.dlvpInfoRslt.dlvrMethoAddCd,
          itemDlvrMethoDtlCnts: this.dlvpInfoRslt.dlvrMethoDtlCnts,
        };
      }
      // CU_회원배송지 : 상품전달방법 정보 UPDATE (회원배송지일련번호가 존재하고 전달방법저장여부가 변경되었을때 저장한다.)
      if (this.isNotEmpty(this.ordDlvpRslt.mbrDlvpSeqno) && this.dlvpInfoRslt.dlvrMethoYn != this.dlvpInfoRslt.beforeDlvrMethoYn) {
        ApiUtils.post('/fo/cs/claimmgnt/mbr-dlvp-info-update', JSON.stringify(params));
        this.ordDlvpRslt.itemDlvrMethoCd = params.itemDlvrMethoCd;
        this.ordDlvpRslt.itemDlvrMethoAddCd = params.itemDlvrMethoAddCd;
        this.ordDlvpRslt.itemDlvrMethoDtlCnts = params.itemDlvrMethoDtlCnts;
      }

      this.popupCloseAction(true);
    },
     // 공통코드 조회
    searchCommCd(commGrpCd) {
      const params = {
        commGrpCd: commGrpCd,
      };
      ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params)
      .then(res => {
        // 상품전달방법코드 공통코드
        if (commGrpCd == 'OD0050') {
          this.dlvrMethoList = res.data.data;
        // 상품전달방법추가코드 공통코드
        } else if (commGrpCd == 'OD0034') {
          this.dlvrMethoAddList = res.data.data;
        } else if (commGrpCd == 'CS0027') {
          this.custCentTel = res.data.data.filter(cdDtl => {
            return cdDtl.commCd == '04';
          })[0];
        }
      });
    },
    getFormatTime(sTime) {
      return this.toFormat(this.delivDtList[0].delivDt+sTime, 'HH:mm');
    },
    initData() {
      // 상품전달방법코드 공통코드 조회
      this.searchCommCd("OD0050");
      // 상품전달방법추가코드 공통코드 조회
      this.searchCommCd("OD0034");
      // 가맹점(GS 리테일) 속성 공통코드 조회
      this.searchCommCd("CS0027");

      // 데이터 초기화
      // 저장된 전달방법 정보가 존재 시 화면에 노출
      if (this.isNotEmpty(this.ordDlvpRslt.itemDlvrMethoAddCd)) {
        this.dlvpInfoRslt.dlvrMethoYn = true;
        this.dlvpInfoRslt.beforeDlvrMethoYn = true;
        this.dlvpInfoRslt.dlvrMethoCd = this.ordDlvpRslt.itemDlvrMethoCd;
        this.dlvpInfoRslt.dlvrMethoAddCd = this.ordDlvpRslt.itemDlvrMethoAddCd;
        this.dlvpInfoRslt.dlvrMethoDtlCnts = this.ordDlvpRslt.itemDlvrMethoDtlCnts;
      }
      if (this.ordDlvpRslt.dlvrMethoCd) {
        this.dlvpInfoRslt.dlvrMethoCd = this.ordDlvpRslt.dlvrMethoCd;
      }
      if (this.ordDlvpRslt.dlvrMethoDtlCnts) {
        this.dlvpInfoRslt.dlvrMethoDtlCnts = this.ordDlvpRslt.dlvrMethoDtlCnts;
      }
      if (this.ordDlvpRslt.dlvrMethoDtlCnts) {
        this.dlvpInfoRslt.dlvrMethoDtlCnts = this.ordDlvpRslt.dlvrMethoDtlCnts;
      }
      if (this.ordDlvpRslt.dlvrMethoAddCd) {
        this.dlvpInfoRslt.dlvrMethoAddCd = this.ordDlvpRslt.dlvrMethoAddCd;
      }
    },
  },
  mounted() {
    this.initData(); // 데이터 초기화
    this.modalActiveEvent('popupSelectDate');
    this.delivSeqsSerh();
  },
};
</script>
