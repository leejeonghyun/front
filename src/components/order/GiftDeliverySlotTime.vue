<template>
  <div id="popupTimeSelect">
        <table class="delivery-time-table" summary="배송 날짜 및 배송 시간을 지정하는 표">
          <caption>배송 날짜 및 배송 시간 지정</caption>
          <colgroup>
            <col style="width: 24%;" >
            <col v-for="delivDt in delivDtList" v-bind:key="delivDt.delivDt" >
          </colgroup>
          <thead>
            <tr>
              <th scope="col">배송시간</th>
              <th scope="col" v-for="delivDt in delivDtList" v-bind:key="delivDt.delivDt">{{toFormat(delivDt.delivDt, 'MM/DD')}} ({{delivDt.dow}})</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(delivDtTmInfo, seqIdx) in delivDtTmList" v-bind:key="delivDtTmInfo.delivBeginTm" v-show="rowFlag(seqIdx)">
              <th scope="row">
                <span v-if="checkRows(seqIdx, delivDtTmInfo.delivSeqs) == true">{{delivDtTmInfo.delivBeginTm}}~{{delivDtTmInfo.delivEndTm}}</span>
                <span v-else-if="checkRows(seqIdx, delivDtTmInfo.delivSeqs) == false">
                  free 타임
                  <span class="red">500P</span>
                  <button type="button" class="btn-infomation small" aria-label="free 타임 안내 팝업 활성화" aria-haspopup="dialog" @click="popupInnerAction('popupFreeTime')"><span class="hidden">안내</span></button>
                </span>
              </th>
              <td v-for="(delivDtInfo, dtIdx) in delivDtList" v-bind:key="delivDtInfo.delivDt">
                <span v-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == 'H'">휴무일</span>
                <span v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == 'C'">마감</span>
                <span v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == 'P'" class="inp-radio small">
                    <input type="radio" name="delivSeqsSeqno" v-bind:id="'delivSeqsSeqno_'+seqIdx+'_'+dtIdx" v-bind:value="checkVal(seqIdx, dtIdx, delivDtList.length)" title="11/29(토) 14:30 이후" v-on:click="updateDelivSeqno(delivDtInfo.delivDt, delivDtTmInfo.delivSeqs, checkVal(seqIdx, dtIdx, delivDtList.length))">
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <PopupFreeTime @popupEvent="popupInnerAction" v-if="this.popup.popupFreeTime" /> <!-- 팝업 - 프리타임 안내 -->
  </div>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';

import PopupFreeTime from '@/views/od/PopupFreeTimeInfo'; // 팝업 - 프리타임 안내
export default {
  props: {
    strInfoMap: Object,
  },
  name: "DeliverySlotTime",
  data() {
    return {
      delivSeqsList: null,
      delivDtList: null,
      delivDtTmList: null,
      delivSeqFlag: true,
      delivSeqEndFlag: false,
      delivSeqHolidayFlag: false,
      freeTimeFlag: false,
      rowTimeFlag: true,
      rowFreeTimeFlag: false,
      popup: { // 팝업
        popupFreeTime: false,
      },
    };
  },
  components: {
    PopupFreeTime
  },
  mixins: [LayerPopupMixin],
  methods: {
    // 팝업
    popupInnerAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    checkVal(rowidx, colIdx, cnt) { // 라디오버튼 value 값 지정
      return this.delivSeqsList[rowidx * cnt + colIdx].delivSeqsSeqno;
    },
    checkVisible(rowidx, colIdx, cnt) { // 마감, 휴무일, 라디오버튼 체크
      const holidayYn = this.delivSeqsList[rowidx * cnt + colIdx].holidayYn;
      const clsYn = this.delivSeqsList[rowidx * cnt + colIdx].clsYn;
      const delivSeqs = this.delivSeqsList[rowidx * cnt + colIdx].delivSeqs;
      if (holidayYn === 'Y') {
          return 'H';
      } else if (clsYn == 'Y') {
        return 'C';
      } else {
          return 'P';
      }
    },
    checkRows(rowIdx, delivSeqs) { // 배송시간에 대한 일반시간 노출과 프리타임 노출 체크
      if (!this.freeTimeFlag) {
        if ( delivSeqs == '999' ) {
          return true;
        } else {
          return true;
        }
      } else {
        if ( delivSeqs == '999') {
          return false;
        } else {
          return true;
        }
      }
    },
    rowFlag(rowIdx) { // 프리타임 시간을 노출 안할 때 빈 tr 안보이게 처리
      const delivSeqs = this.delivDtTmList[rowIdx].delivSeqs;
      if ( !this.freeTimeFlag) {
        if ( delivSeqs == '999') {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    async delivSeqsSerh(strInfo) {
      const params = {};
      params.delivPolcId = strInfo.delivPolcId; // 배송정책ID
      params.diffDays = strInfo.seqsExpsrDys; // 차수노출일수
      const response = await ApiUtils.post("/fo/od/ordsmgnt/gs-delivSeq-list", JSON.stringify(params));
      this.delivSeqsList = response.data.data.odDelivSeqsList;
      this.delivDtList = response.data.data.odDelivDtList;
      this.delivDtTmList = response.data.data.odDelivDtTmList;
      if (strInfo.frtmUseYn === 'Y') {
          this.freeTimeFlag = true;
      }
    },
    async updateDelivSeqno(delivDt, delivSeqno, delivSeqsSeqno) {
      const ordsDelivSeqsInfo = {};
      ordsDelivSeqsInfo.delivDt = delivDt;
      ordsDelivSeqsInfo.delivSeqs = delivSeqno;
      const params = {};
      params.ordId = this.strInfoMap.ordId;
      params.delivDt = delivDt;
      params.delivSeqno = delivSeqno;
      params.delivSeqsSeqno = delivSeqsSeqno;
      params.delivId = this.strInfoMap.delivId;
      const response = await ApiUtils.put("/fo/od/ordsmgnt/gift-delivery-sequence", JSON.stringify(params));
    },
    toFormat(dt, type) {
      return DateUtils.format(dt, type);
    }
  },
  destroyed() {
  },
  mounted() {
    this.delivSeqsSerh(this.strInfoMap);
  },
};
</script>
