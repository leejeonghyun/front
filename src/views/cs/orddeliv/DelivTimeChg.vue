<template>
  <div class="wrap-full-popup" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
    <div class="header-popup">
      <strong>배송시간변경</strong>
    </div>
    <main id="main" tabindex="0">
      <div class="content-inner-wrap">
        <div class="delivery-box">
          <strong class="tit-sub-page">예약 시간</strong>
          <p>변경 전 : {{ bfrResvTime }}</p>
          <!-- 2019.11.28(목)13:30~18:30-->
          <p class="modify">변경 후 : {{ aftResvTime }}</p>
          <!--2019.11.28(목)13:30~18:30-->
        </div>
        <div class="delivery-box">
          <strong class="tit-sub-page">배송 시간</strong>
          <table class="delivery-time-table" summary="배송 날짜 및 배송 시간을 지정하는 표">
            <caption>배송 날짜 및 배송 시간 지정</caption>
            <colgroup>
              <col style="width: 47px;" />
              <col v-for="delivDt in delivDtList" v-bind:key="delivDt.delivDt" />col v-for="delivDt in delivDtList" v-bind:key="delivDt.delivDt" >
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  배송
                  <br />시간
                </th>
                <th
                  scope="col"
                  v-for="delivDt in delivDtList"
                  v-bind:key="delivDt.delivDt"
                >{{toFormat(delivDt.delivDt, 'MM/DD')}} ({{delivDt.dow}})</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(delivDtTmInfo, seqIdx) in delivDtTmList"
                v-bind:key="delivDtTmInfo.delivBeginTm"
                v-show="rowFlag(seqIdx)"
              >
                <th scope="row">
                  <span
                    v-if="checkRows(seqIdx, delivDtTmInfo.delivSeqs) == true"
                  >{{delivDtTmInfo.delivBeginTm}}</span>
                  <span v-if="checkRows(seqIdx, delivDtTmInfo.delivSeqs) == true" class="br">~</span>
                  <span
                    v-if="checkRows(seqIdx, delivDtTmInfo.delivSeqs) == true"
                  >{{delivDtTmInfo.delivEndTm}}</span>
                  <span v-else-if="checkRows(seqIdx, delivDtTmInfo.delivSeqs) == false">
                    free 타임
                    <span class="red">500P</span>
                    <button
                      type="button"
                      class="btn-infomation small"
                      aria-label="free 타임 안내 팝업 활성화"
                      aria-haspopup="dialog"
                      @click="popupInnerAction('popupFreeTime')"
                    >
                      <span class="hidden">안내</span>
                    </button>
                  </span>
                </th>
                <td v-for="(delivDtInfo, dtIdx) in delivDtList" v-bind:key="delivDtInfo.delivDt">
                  <span v-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '04'">휴무일</span>
                  <span v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '02'">마감</span>
                  <span v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '05'">준비중</span>
                  <span
                    v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '01'"
                    class="inp-radio small"
                  >
                    <input
                      type="radio"
                      name="delivSeqsSeqno"
                      v-bind:id="'delivSeqsSeqno_' + checkVal(seqIdx, dtIdx, delivDtList.length)"
                      v-bind:value="checkVal(seqIdx, dtIdx, delivDtList.length)"
                      title="11/29(토) 14:30 이후"
                      v-on:click="updateDelivSeqno(checkVal(seqIdx, dtIdx, delivDtList.length))"
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="txt-dot">배송 변경 신청이 완료된 이후에는 변경 취소가 불가능합니다.</p>
        </div>
        <div class="bottom-fixed-btn-area btns-several">
          <button type="button" class="btn-lg btn-bg darkgray" @click="popupAction">
            <span>취소</span>
          </button>
          <button type="button" class="btn-lg btn-bg lightgreen" @click="chgDelivItme">
            <span>변경</span>
          </button>
        </div>
      </div>
    </main>
    <button class="btn-layer-close" @click="popupAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    mbrDelivParamInfo: Object,
  },
  name: 'DelivTimeChg',
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '시간 변경 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '시간변경',
      },
    ],
  },
  data() {
    return {
      delivSeqsList: null,
      delivDtList: null,
      delivDtTmList: null,
      bfrResvTime: null,
      aftResvTime: null,
      selInfo: {
        delivDt: null,
        orgDelivId: null,
        delivSeqs: null,
        delivSeqsSeqno: null,
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  watch: {},
  components: {},
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupDelivTimeChg');
    },
    // 배송슬롯변경처리
    async chgDelivItme() {
      // TODO BJW 기선택정보가 NULL 이고 새로 선택한것도 NULL 인경우 어찌해야할지
      if (
        this.selInfo.delivSeqs == null ||
        this.selInfo.delivSeqsSeqno == null ||
        this.mbrDelivParamInfo.delivSeqs == this.selInfo.delivSeqs ||
        this.mbrDelivParamInfo.delivSeqsSeqno == this.selInfo.delivSeqsSeqno
      ) {
        const confirmFlag = await this.$gsdialog
          .confirm(
            "배송 변경 시간을 선택하지 않으셨습니다.<br/>기존 배송 예약 시간을 유지하시겠습니까?'",
            { html: true }
        );
        if (confirmFlag) {
          this.$emit('popupEvent', 'popupDelivTimeChg');
          this.$emit('chgDelivItme', null);
          return false;
        }
        return false;
      }
      if (StringUtils.isEmpty(this.selInfo.delivSeqsSeqno) == true) {
        this.$gsdialog.alert('배송차수를 선택하세요').then(dialog => {});
        return false;
      }
      this.saveDelivSeqs();
    },
    // 배송차수변경 처리
    async saveDelivSeqs() {
      const confirmFlag = await this.$gsdialog.confirm(
        '배송 변경 신청이 완료된 이후에는<br/>변경 취소가 불가능합니다.<br/>배송 시간을 변경하시겠습니까?(' +
          this.aftResvTime +
          ')',
        { html: true }
      );
      if (confirmFlag) {
        this.selInfo.orgDelivId = this.mbrDelivParamInfo.orgDelivId;
        const response = await ApiUtils.put(
          '/fo/cs/orddelivmgnt/delivery-time-change',
          JSON.stringify(this.selInfo)
        );
        if (response.data.success) {
          this.$gsdialog.alert('정상적으로 처리되었습니다.').then(dialog => {
            this.$emit('popupEvent', 'popupDelivTimeChg');
            this.$emit('chgDelivItme', this.selInfo);
          });
        } else {
          this.$gsdialog.alert('처리중 오류가 발생하였습니다.').then(dialog => {
            this.$emit('popupEvent', 'popupDelivTimeChg');
            this.$emit('chgDelivItme', this.selInfo);
          });
        }
      }
    },
    // 배송슬롯정보조회
    async delivSeqsSerh(strInfo) {
      strInfo.delivPolcId = this.mbrDelivParamInfo.delivPolcId;
      const params = {};
      params.delivPolcId = strInfo.delivPolcId; // 배송정책ID
      params.diffDays = strInfo.seqsExpsrDys; // 차수노출일수
      params.delivRegnId = strInfo.delivRegnId; // 배송지역ID
      params.delivTypeCd = strInfo.delivTypeCd; // 배송유형코드
      params.itemRcptTypeCd = strInfo.itemRcptTypeCd; // 상품수취유형코드
      params.supplFirmCd = strInfo.supplFirmCd; // 공급업체코드
      const response = await ApiUtils.post(
        '/fo/od/ordsmgnt/gs-delivSeq-list',
        JSON.stringify(params)
      );
      this.delivSeqsList = response.data.data.odDelivSeqsList;
      this.delivDtList = response.data.data.odDelivDtList;
      this.delivDtTmList = response.data.data.odDelivDtTmList;
      if (strInfo.frtmUseYn === 'Y') {
        this.freeTimeFlag = true;
      }
    },
    // 배송슬롯변경이벤트
    async updateDelivSeqno(paramDelivSeqsSeqno) {
      let seqObj = null;
      for (const tmRow of this.delivSeqsList) {
        // 선택한 경우
        if (
          paramDelivSeqsSeqno == tmRow.delivSeqsSeqno &&
          !StringUtils.isEmpty(paramDelivSeqsSeqno)
        ) {
          seqObj = tmRow;
          break;
        }
        // 주문 시 선택한 차수 셋팅
        if (
          this.mbrDelivParamInfo.delivSeqsSeqno == tmRow.delivSeqsSeqno &&
          StringUtils.isEmpty(paramDelivSeqsSeqno)
        ) {
          seqObj = tmRow;
          break;
        }
      }
      let timeMsg = '';
      if (!StringUtils.isEmpty(seqObj)) {
        timeMsg =
          DateUtils.format(seqObj.delivDt, 'YYYY.MM.DD') +
          '(' +
          DateUtils.format(seqObj.delivDt, 'ddd') +
          ') ' +
          DateUtils.format(
            seqObj.delivDt + ' ' + seqObj.delivBeginTm,
            'HH:mm'
          ) +
          ' ~ ' +
          DateUtils.format(seqObj.delivDt + ' ' + seqObj.delivEndTm, 'HH:mm');
      }
      if (StringUtils.isEmpty(paramDelivSeqsSeqno)) {
        // this.bfrResvTime = timeMsg;
      } else {
        this.aftResvTime = timeMsg;
        this.selInfo.delivDt = seqObj.delivDt;
        this.selInfo.delivSeqs = seqObj.delivSeqs;
        this.selInfo.delivSeqsSeqno = seqObj.delivSeqsSeqno;
      }
    },
    // 날짜포멧변경
    toFormat(dt, type) {
      return DateUtils.format(dt, type);
    },
    // 라디오버튼 value 값 지정
    checkVal(rowidx, colIdx, cnt) {
      return this.delivSeqsList[rowidx * cnt + colIdx].delivSeqsSeqno;
    },
    // 마감, 휴무일, 라디오버튼 체크
    checkVisible(rowidx, colIdx, cnt) {
      if (StringUtils.isEmpty(this.delivSeqsList[rowidx * cnt + colIdx])) {
        return null;
      }
      return this.delivSeqsList[rowidx * cnt + colIdx].seqsStatCd;
    },
    // 프리타임 시간을 노출 안할 때 빈 tr 안보이게 처리
    rowFlag(rowIdx) {
      const delivSeqs = this.delivDtTmList[rowIdx].delivSeqs;
      if (!this.freeTimeFlag) {
        if (delivSeqs == '99') {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
      return true;
    },
    // 배송시간에 대한 일반시간 노출과 프리타임 노출 체크
    checkRows(rowIdx, delivSeqs) {
      if (!this.freeTimeFlag) {
        if (delivSeqs == '99') {
          return true;
        } else {
          return true;
        }
      } else {
        if (delivSeqs == '99') {
          return false;
        } else {
          return true;
        }
      }
    },
  },
  mounted() {
    this.bfrResvTime =
      DateUtils.format(this.mbrDelivParamInfo.dvdescDelivFullDt, 'YYYY.MM.DD') +
      '(' +
      this.mbrDelivParamInfo.dvdescDelivDayNm +
      ')' +
      ' ' +
      this.mbrDelivParamInfo.dvdescDelivBeginTm +
      ' ~ ' +
      this.mbrDelivParamInfo.dvdescDelivEndTm;
    this.selInfo.delivSeqs = this.mbrDelivParamInfo.delivSeqs;
    this.selInfo.delivSeqsSeqno = this.mbrDelivParamInfo.delivSeqsSeqno;
    this.delivSeqsSerh(this.mbrDelivParamInfo).then(() => {
      for (const tmRow of this.delivSeqsList) {
        if (tmRow.delivSeqsSeqno == this.mbrDelivParamInfo.delivSeqsSeqno) {
          const rdoObj = document.getElementById(
            'delivSeqsSeqno_' + this.mbrDelivParamInfo.delivSeqsSeqno
          );
          if (!StringUtils.isEmpty(rdoObj)) {
            rdoObj.checked = true;
            this.updateDelivSeqno();
          }
        }
      }
    });
  },
};
</script>
