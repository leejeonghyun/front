<template>
  <div :id="`${slotId != null ? 'popupTimeSelect_' + slotId : 'popupTimeSelect'}`">
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
          <!--{{dlvDelivTypeGrpInfo.delivPolcId}}-->
          <tbody>
            <tr v-for="(delivDtTmInfo, seqIdx) in delivDtTmList" v-bind:key="seqIdx" v-show="rowFlag(seqIdx)">
              <th scope="row">
                <span v-if="checkRows(seqIdx, delivDtTmInfo.delivSeqs) == true">
                  <span v-if="strInfoMap.itemRcptTypeCd==='T'">
                    {{toTimeFormat(delivDtTmInfo.delivEndTm)}} 이후
                  </span>
                  <span v-else>
                    {{toTimeFormat(delivDtTmInfo.delivBeginTm)}}~{{toTimeFormat(delivDtTmInfo.delivEndTm)}}
                  </span>
                </span>
                  <span v-else-if="checkRows(seqIdx, delivDtTmInfo.delivSeqs) == false">
                  free 타임
                  <span class="red">500P</span>
                  <button type="button" class="btn-infomation small" aria-label="free 타임 안내 팝업 활성화" aria-haspopup="dialog" @click="popupInnerAction('popupFreeTime')"><span class="hidden">안내</span></button>
                </span>
              </th>
              <td :class="delivDtInfo.delivDt == todayDt ? 'today' : ''" v-for="(delivDtInfo, dtIdx) in delivDtList" v-bind:key="delivDtInfo.delivDt">
                <span v-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '04'">휴무일</span>
                <span v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '02'">마감</span>
                <span v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '05'">준비중</span>
                <span v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '06'" class="inp-radio mid"><input type="radio" :disabled="true"></span>
                <span v-else-if="checkVisible(seqIdx, dtIdx, delivDtList.length) == '01'" class="inp-radio mid">
                    <input type="radio" v-bind:name="'delivSeqsSeqno_'+delivPolcId+'_'+slotIdx" v-bind:id="'delivSeqsSeqno_'+seqIdx+'_'+dtIdx" v-bind:value="checkVal(seqIdx, dtIdx, delivDtList.length)" v-on:click="setDelivSeqs(delivDtInfo.delivDt, seqIdx, dtIdx, delivDtList.length)" :disabled="disableInput(delivDtInfo.delivDt)" v-bind:checked="checkSelSeqs(delivDtInfo.delivDt, delivDtTmInfo.delivSeqs, seqIdx, dtIdx, delivDtList.length)">
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
import StringUtils from '@/common/StringUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목

import PopupFreeTime from '@/views/od/PopupFreeTimeInfo'; // 팝업 - 프리타임 안내
export default {
  props: {
    strInfoMap: Object,
    slotId: String,
    slotIdx: String,
    dlvDelivTypeGrpInfo: Object,
    giftYn: String,
    bundlDelivOrdId: String,
    spckIncldYn: String,
    apchIncldYn: String,
  },
  name: "DeliverySlotTime",
  data() {
    return {
      delivPolcId: null,
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
      ordPolcSeqList: null,
      todayDt: DateUtils.format(DateUtils.getToday(), 'YYYYMMDD'),
    };
  },
  components: {
    PopupFreeTime
  },
  mixins: [LayerPopupMixin],
  methods: {
    // 팝업
    popupInnerAction(type) { // 팝업 활성 / 비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    checkVal(rowidx, colIdx, cnt) { // 라디오버튼 value 값 지정
      return this.delivSeqsList[rowidx * cnt + colIdx].delivSeqsSeqno;
    },
    checkVisible(rowidx, colIdx, cnt) { // 마감, 휴무일, 라디오버튼 체크
      try {
        if ( this.delivSeqsList[rowidx * cnt + colIdx].selSeqsYn === 'Y' ) {
          return '01';
        } else {
          return this.delivSeqsList[rowidx * cnt + colIdx].seqsStatCd;
        }
      } catch (e) {
        return '00';
      }
      /*
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
      */
    },
    checkSelSeqs(delivDt, delivSeqno, rowidx, colIdx, cnt) {
      if ( this.delivSeqsList[rowidx * cnt + colIdx].selSeqsYn === 'Y' ) {
        this.updateDelivSeqno(delivDt, delivSeqno, '');
        return true;
      } else {
        return false;
      }
    },
    updateSelSeqs() {
      this.delivSeqsSerh(this.strInfoMap);
      const table = document.querySelector('.delivery-time-table');
      const el = table.querySelectorAll('input');
      if (el) {
        for (let i = 0; i < el.length; i++) {
          if (el[i].disabled == true && el[i].checked == true) {
            el[i].checked = false;
            el[0].checked = true;
            break;
          }
        }
      }
    },
    checkRows(rowIdx, delivSeqs) { // 배송시간에 대한 일반시간 노출과 프리타임 노출 체크
      if (!this.freeTimeFlag) {
        if ( delivSeqs == '99' ) {
          return true;
        } else {
          return true;
        }
      } else {
        if ( delivSeqs == '99') {
          return false;
        } else {
          return true;
        }
      }
    },
    rowFlag(rowIdx) { // 프리타임 시간을 노출 안할 때 빈 tr 안보이게 처리
      const delivSeqs = this.delivDtTmList[rowIdx].delivSeqs;
      if ( !this.freeTimeFlag) {
        if ( delivSeqs == '99') {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
      return true;
    },
    async delivSeqsSerh(strInfo) {
      if (!this.strInfoMap || !this.strInfoMap.ordId) {
        return;
      }
      const params = {};
      params.delivPolcId = this.dlvDelivTypeGrpInfo.delivPolcId; // 배송정책ID
      params.diffDays = this.dlvDelivTypeGrpInfo.seqsExpsrDys; // 차수노출일수
      params.ordId = this.strInfoMap.ordId;
      params.bundlDelivOrdId = this.bundlDelivOrdId;
      // params.apchIncldYn = this.apchIncldYn;
      const response = await ApiUtils.post("/fo/od/ordsmgnt/gs-delivSeq-list", JSON.stringify(params));
      this.delivSeqsList = response.data.data.odDelivSeqsList;
      this.delivDtList = response.data.data.odDelivDtList;
      this.delivDtTmList = response.data.data.odDelivDtTmList;
      // console.log("this.delivSeqsList:", this.delivSeqsList);
      this.delivPolcId = params.delivPolcId;
      if (strInfo.frtmUseYn === 'Y') {
        this.freeTimeFlag = true;
        // 마지막 차수만 남은 경우 freetime 미노출 수정
        // let cnt = 0;
        // if (this.delivSeqsList) {
        //  for (let i = 0; i < this.delivSeqsList.length; i++) {
        //    if (this.delivSeqsList[i].delivDt == this.todayDt) {
        //      if ((this.delivSeqsList[i].selSeqYn === 'Y' || this.delivSeqsList[i].seqsStatCd === '01') && this.delivSeqsList[i].delivSeqs != '99') {
        //        cnt++;
        //      }
        //    }
        //  }
        //  if (cnt === 1) {
        //    this.freeTimeFlag = false;
        //  }
        // }
      }
      // 임박/하루판매/도시락 상품 포함일 경우
      /*
      if (this.apchIncldYn && this.apchIncldYn === 'Y') {
        let chk = 0;
        if (this.delivSeqsList) {
          for (let i = 0; i < this.delivSeqsList.length; i++) {
            if (this.delivSeqsList[i].delivDt == this.todayDt && this.delivSeqsList[i].clsYn != null && this.delivSeqsList[i].clsYn === 'N') {
              chk++;
              break;
            }
          }
        }
        if (chk === 0) {
          this.$gsdialog.alert(OrderMsg.deliveryTodayapchChk, {html: true});
          this.$router.push({name: 'theBasket'});
        }
      }
      */

      // 선택가능한 배송슬롯 유무 체크
      let chk = 0;
      if (this.delivSeqsList && this.delivSeqsList.length > 0) {
        for (let i = 0; i < this.delivSeqsList.length; i++) {
          if (this.delivSeqsList[i].seqsStatCd != null && this.delivSeqsList[i].seqsStatCd === '01') {
            chk++;
            break;
          }
        }
        if (chk === 0) {
          await this.$gsdialog.alert(OrderMsg.deliveryTodayapchChk, {html: true});
          await this.$router.push({name: 'theBasket'});
        }
      }

      // 심플리쿡 상품 포함일 경우
      if (this.delivSeqsList && this.spckIncldYn === 'Y') {
        let selSeqsExist = false;
        for (let i = 0; i < this.delivSeqsList.length; i++) {
          if (this.delivSeqsList[i].selSeqsYn === 'Y' && this.delivSeqsList[i].seqsStatCd != null && this.delivSeqsList[i].seqsStatCd != '01') {
            this.delivSeqsList[i].selSeqsYn = 'N';
            selSeqsExist = true;
          }
        }
        if (selSeqsExist) {
          // this.delivSeqsList.find(item=>item.seqsStatCd === '01').selSeqsYn = 'Y';
          this.updateDelivSeqno('', 0, 'init');
          const table = document.querySelector('.delivery-time-table');
          const el = table.querySelectorAll('input');
          if (el) {
            for (let j = 0; j < el.length; j++) {
              if (el[j].checked) {
                el[j].checked = false;
                break;
              }
            }
          }
        }
        if (this.delivSeqsList[0].delivDt != this.todayDt || (this.bundlDelivOrdId != null && this.bundlDelivOrdId != '')) { // 합배송일때 조건 추가
          this.$emit('clsTodaySlot');
        }
        // this.spckDisable(true);
      }
    },
    async updateDelivSeqno(delivDt, delivSeqno, flag) {
      const ordsDelivSeqsInfo = {};
      ordsDelivSeqsInfo.delivPolcId = this.dlvDelivTypeGrpInfo.delivPolcId;
      ordsDelivSeqsInfo.delivDt = delivDt;
      ordsDelivSeqsInfo.delivSeqs = delivSeqno;
      const params = {};
      params.ordId = this.strInfoMap.ordId;
      params.ordsDelivSeqno = this.dlvDelivTypeGrpInfo.ordsDelivSeqno;
      params.ordsDlvpSeqno = this.dlvDelivTypeGrpInfo.ordsDlvpSeqno;
      params.ordsDelivSeqsInfo = ordsDelivSeqsInfo;
      let url = '';
      // 선물받기 공통으로 사용
      if (this.giftYn !== undefined && this.giftYn != null && this.giftYn === 'Y') {
        params.delivId = this.dlvDelivTypeGrpInfo.delivId;
        params.delivReqDt = delivDt;
        params.delivSeqs = delivSeqno;
        for (let i=0; i < this.delivSeqsList.length; i++) {
          if (delivDt === this.delivSeqsList[i].delivDt && delivSeqno === this.delivSeqsList[i].delivSeqs) {
            params.delivSeqsSeqno = this.delivSeqsList[i].delivSeqsSeqno;
          }
        }
        url = '/fo/od/ordsmgnt/gift-delivery-sequence';
      } else {
        // params.adrsZipcd = this.strInfoMap.adrsZipcd;
        // params.adrsBaseAddr = this.strInfoMap.adrsBaseAddr;
        // params.adrsDtlAddr = this.strInfoMap.adrsDtlAddr;
        // params.adrsStnmBaseAddr = this.strInfoMap.adrsStnmBaseAddr;
        // params.adrsStnmDtlAddr = this.strInfoMap.adrsStnmDtlAddr;
        params.pkuppId = this.strInfoMap.pkuppId;

        url = '/fo/od/ordsmgnt/delivery-sequence';
      }
      const response = await ApiUtils.put(url, JSON.stringify(params));
      // 화면체크 위하여 상위funcrtion call
      // this.$emit('chkDelivSeqNo', delivDt + '-' + delivSeqno);
      // this.$emit('chkDelivSeqNo', delivSeqno);
      this.$emit('chkDelivSeqNo', flag === 'init' ? '' : this.slotIdx);
      this.$emit('chkTodayDelivSeqNo', delivSeqno);
    },
    toFormat(dt, type) {
      return DateUtils.format(dt, type);
    },
    toTimeFormat(time) {
      if (!StringUtils.isEmpty(time)) {
        time = time.substring(0, 2) + ':' + time.substring(2, 4);
      }
      return time;
    },
    disableInput(delivDt) {
      if ( this.bundlDelivOrdId == null || this.bundlDelivOrdId == '') {
        return false;
      } else {
        return true;
      }
    },
    spckDisable(isChecked) {
      const table = document.querySelector('.delivery-time-table');
      const todayTd = table.querySelectorAll('.today');
      if (!isChecked) {
        for (let i = 0; i < todayTd.length; i++) {
          const input = todayTd[i].querySelectorAll("input");
          for (let j = 0; j < input.length; j++) {
            input[j].disabled = false;
          }
          // todayTd[i].classList.remove("disabled");
        }
        this.disabled = false;
      } else {
        for (let i = 0; i < todayTd.length; i++) {
          const input = todayTd[i].querySelectorAll("input");
          for (let j = 0; j < input.length; j++) {
            input[j].disabled = true;
          }
          // todayTd[i].classList.add("disabled");
        }
        this.disabled = true;
      }
    },
    chkOrdPolcSeq(ordPolcSeqList) { // 배송차수 존재하는 장바구니쿠폰 적용
      this.ordPolcSeqList = ordPolcSeqList;
      if (this.delivSeqsList && this.delivSeqsList.length > 0) {
        const table = document.querySelector('.delivery-time-table');
        const el = table.querySelectorAll('input');
        let delivSeqsSeqno = '';
        if (el) {
          for (let j = 0; j < el.length; j++) {
            if (el[j].checked) {
              delivSeqsSeqno = el[j].value;
              break;
            }
          }
        }
        for (let i = 0; i < this.delivSeqsList.length; i++) {
          if (this.ordPolcSeqList && this.ordPolcSeqList.length > 0) {
            if (this.ordPolcSeqList.indexOf(this.delivSeqsList[i].delivSeqs) === -1) {
              if (this.delivSeqsList[i].delivSeqsSeqno == delivSeqsSeqno) { // 기존에 선택된 배송차수 존재하면 초기
                this.$gsdialog.alert(OrderMsg.promOrdPolcSeqInit);
                this.$emit('moveSlot');
                this.delivSeqsList[i].selSeqsYn = 'N';
                this.updateDelivSeqno('', 0, 'init');
                if (el) {
                  for (let j = 0; j < el.length; j++) {
                    if (el[j].value == this.delivSeqsList[i].delivSeqsSeqno) {
                      el[j].checked = false;
                      break;
                    }
                  }
                }
              }
              if (this.delivSeqsList[i].clsYn != 'Y') { // 장바구니쿠폰의 배송차수 제외하고 비활성화
                if (el) {
                  for (let j = 0; j < el.length; j++) {
                    if (el[j].value == this.delivSeqsList[i].delivSeqsSeqno) {
                      el[j].disabled = true;
                      break;
                    }
                  }
                }
              }
            }
          } else {
            if (this.delivSeqsList[i].clsYn != 'Y') { // 장바구니쿠폰으로 비활성화한 배송차수 초기화
              if (el) {
                for (let j = 0; j < el.length; j++) {
                  if (el[j].value == this.delivSeqsList[i].delivSeqsSeqno) {
                    if ((this.spckIncldYn === 'Y' && this.delivSeqsList[i].delivDt == this.todayDt) || (this.apchIncldYn === 'Y' && this.delivSeqsList[i].delivDt != this.todayDt)) {
                      el[j].disabled = true;
                    } else {
                      el[j].disabled = false;
                    }
                    break;
                  }
                }
              }
            }
          }
        }
      }
    },
    setDelivSeqs(delivDt, rowidx, colIdx, cnt) {
      this.updateDelivSeqno(delivDt, this.delivSeqsList[rowidx * cnt + colIdx].delivSeqs, '');
    },
  },
  destroyed() {
    if (this.bundlDelivOrdId !== null) {
      return true;
    } else {
      return false;
    }
  },
  watch: {
    strInfoMap: function() {
      this.delivSeqsSerh(this.strInfoMap);
    }
  },
  mounted() {
    this.delivSeqsSerh(this.strInfoMap);
  },
};
</script>
