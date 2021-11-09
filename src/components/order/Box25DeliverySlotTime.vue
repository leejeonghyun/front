<template>
  <div :id="`${slotId != null ? 'popupTimeSelect_' + slotId : 'popupTimeSelect'}`">
        <table class="delivery-time-table" summary="배송 날짜 및 배송 시간을 지정하는 표" style="width: 100%;">
          <caption>배송 날짜 및 배송 시간 지정</caption>
          <colgroup>
            <col v-for="delivDt in dateList" v-bind:key="delivDt.delivDt" >
          </colgroup>
          <thead>
            <tr>
              <th scope="col" v-for="delivDt in dateList" v-bind:key="delivDt.delivDt">{{toFormat(delivDt.delivDt, 'MM/DD')}} ({{delivDt.dow}})</th>
            </tr>
          </thead>
          <!--{{dlvDelivTypeGrpInfo.delivPolcId}}-->
          <tbody>
            <tr>
              <td v-for="eachSlot in slotList" :key="eachSlot.delivDt">
                <span v-if="eachSlot.seqsStatCd === '01'" class="inp-radio small">{{eachSlot.delivBeginTm | format('HH:mm')}} 이후 수령 가능</span>
                <span v-else>상품 준비 중</span>
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
  name: "Box25DeliverySlotTime",
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
      dateList: [],
      slotList: [],
    };
  },
  components: {
    PopupFreeTime
  },
  mixins: [LayerPopupMixin],
  computed: {
    // slotList() {
    //   console.log('this.delivDtTmList', this.delivDtTmList);
    //   return [];
    // },
  },
  filters: {
    format(value, formatString) {
      switch (formatString) {
        case 'HH:mm':
          return value.substring(0, 2) + ':' + value.substring(2);
        case 'MM/DD':
          return DateUtils.format(value, 'MM/DD');
        default:
          return value;
      }
    },
  },
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

      console.log('strInfo', strInfo);

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

      // 픽업 가능일
      const minDt = this.delivSeqsList
          .filter(each => each.seqsStatCd === '01')
          .map(each => each.delivDt)
          .reduce((p, c) => {
            if (!p) {
              return c;
            }

            if (p < c) {
              return p;
            } else {
              return c;
            }
          }, null);

      this.dateList = this.delivDtList.filter(each => !minDt || each.delivDt <= minDt);

      const summary = this.delivSeqsList
          .filter(each => !minDt || each.delivDt <= minDt)
          .reduce((p, c) => {
            const x = p[c.delivDt] || c;
            if (x.seqsStatCd !== '01' ^ c.seqsStatCd !== '01') {
              if (c.delivBeginTm < x.delivBeginTm) {
                p[c.delivDt] = c;
              } else {
                p[c.delivDt] = x;
              }
            } else {
              p[c.delivDt] = x.seqsStatCd === '01' ? x : c;
            }

            return p;
          }, {});

      this.slotList = Object.values(summary).sort((l, r) => {
        return l.delivDt < r.delivDt ? -1 : 1;
      });

      console.log('this.slotList', this.slotList);

      const firstActiveSlot = this.slotList
          .filter(each => each.seqsStatCd === '01')
          .reduce((p, c) => {
            if (p === null) {
              return c;
            }

            if (p.delivDt > c.delivDt) {
              return c;
            } else if (p.delivDt < c.delivDt) {
              return p;
            } else {
              return p.delivBeginTm < c.delivBeginTm ? p : c;
            }
          }, null);

      if (!firstActiveSlot) {
          return;
      }
      await this.updateDelivSeqno(firstActiveSlot.delivDt, firstActiveSlot.delivSeqs, '');
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
    console.log('this.strInfoMap', this.strInfoMap);
    this.delivSeqsSerh(this.strInfoMap);
  },
};
</script>
