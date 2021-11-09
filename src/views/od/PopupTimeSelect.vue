<template>
  <!-- 팝업이 붙는 페이지 최상단에 몰 구분 class 가 있어야 함 -->
  <div id="popupTimeSelect" class="wrap-full-popup h100 active" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupTimeSelect}" v-if="resvOrdInfo">
    <!--  <div id="popupTimeSelect" class="wrap-full-popup h100" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupTimeSelect}"> // 풀팝업일 경우 -->
    <div class="header-popup">
      <strong>예약 배송 시간 선택</strong>
    </div>
    <div class="full-popup-body scroll-area has-fixed-bottom">
      <div class="inner-full-popup">
        <div class="select-reserve-time">
          <!-- START : 주문상품정보 -->
          <section class="section-area">
            <div class="sub-title">
              <h2>주문상품정보(<em v-bind:text="resvItemCnt"></em>)</h2>
            </div>
            <div class="sub-inner-box">
              <dl class="detail-list">
                <dt>주문번호</dt>
                <dd>{{resvOrdInfo.ordId}}</dd>
                <dt>주문일자</dt>
                <dd>{{resvOrdInfo.ordDt}}</dd>
                <dt>도착예정일</dt>
                <dd>{{resvOrdInfo.delivDt}}</dd>
                <dt>주문상품</dt>
                <dd>
                  <p class="list-dot" v-for="resvItem in resvItemList" v-bind:key="resvItem.ordItemSeqno">{{resvItem.itemNm}} </p>
                </dd>
              </dl>
            </div>
          </section>
          <!-- END : 주문상품정보 -->
          <!-- START : 시간선택 -->
          <section class="section-area">
            <div class="sub-title">
              <h2>시간 선택</h2>
            </div>
            <div class="sub-inner-box">
              <p class="time-notice">예약 상품을 배송 받을 시간을 선택해 주세요.</p>
              <table class="delivery-time-table" summary="배송 날짜 및 배송 시간을 지정하는 표">
                <caption>배송 날짜 및 배송 시간 지정</caption>
                <colgroup>
                  <col style="width: 28%;">
                  <col style="width: auto">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">배송시간</th>
                    <th scope="col">{{resvOrdInfo.delivDt}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="resvDelivSeqs in resvDelivSeqsList" v-bind:key="resvDelivSeqs.delivSeqsSeqno" >
                    <th scope="row" v-if="resvDelivSeqs.delivSeqs!='99'">{{resvDelivSeqs.delivBeginTime}}~{{resvDelivSeqs.delivEndTime}}</th>
                    <th scope="row" v-else >
                      free 타임
                      <span class="red">500P</span>
                      <button type="button" class="btn-infomation small" aria-label="free 타임 안내 팝업 활성화" aria-haspopup="dialog" @click="popupInnerAction('popupFreeTime')"><span class="hidden">안내</span></button>
                    </th>
                    <td v-if="resvOrdInfo.delivSeqsSeqno!=null">
                      <span v-if="resvOrdInfo.delivSeqsSeqno==resvDelivSeqs.delivSeqsSeqno" class="inp-radio small">
                      배송예정입니다.
                      </span>
                      <span v-else></span>
                    </td>
                    <td v-else>
                      <span v-if="resvDelivSeqs.seqsStatCd == '04'">휴무일</span>
                      <span v-else-if="resvDelivSeqs.seqsStatCd == '02'">마감</span>
                      <span v-else-if="resvDelivSeqs.seqsStatCd == '05'">준비중</span>
                      <span v-else-if="resvDelivSeqs.seqsStatCd == '06'" class="inp-radio small"><input type="radio" :disabled="true"></span>
                      <span v-else-if="resvDelivSeqs.seqsStatCd == '01'" class="inp-radio small">
                        <input type="radio" name="time" id="delivery-time1" value="resvDelivSeqs.delivSeqsSeqno" v-on:click="updateDelivSeqno(resvDelivSeqs.delivSeqs, resvDelivSeqs.delivSeqsSeqno)" >
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <PopupFreeTime @popupEvent="popupInnerAction" v-if="this.popup.popupFreeTime" /> <!-- 팝업 - 프리타임 안내 -->
          <!-- END : 시간선택 -->
          <!-- START : 배송지 정보 -->
          <section class="section-area">
            <div class="sub-title">
              <h2>배송지 정보</h2>
            </div>
            <div class="sub-inner-box">
              <dl class="detail-list">
                <dt>받는분</dt>
                <dd>{{resvOrdInfo.adrsNm}}</dd>
                <dt>주소</dt>
                <dd>{{resvOrdInfo.adrsAddr}}</dd>
                <dt>연락처</dt>
                <dd>{{resvOrdInfo.adrsTelNo}}</dd>
                <dt></dt>
                <dd></dd>
                <dt></dt>
                <dd></dd>
              </dl>
            </div>
          </section>
          <!-- END : 배송지 정보 -->
        </div>
      </div>
      <div class="popup-btns-fixed-bottom">
        <button class="btn-lg btn-bg lightgreen" @click="saveDelivSlot()" :disabled="disableInput()" >저장</button>
      </div>
    </div>
    <button class="btn-layer-close"  onclick="window.close();" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden" >닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import PopupFreeTime from '@/views/od/PopupFreeTimeInfo'; // 팝업 - 프리타임 안내
import ApiUtils from '@/common/ApiUtils';
import SiteUtils from '@/common/SiteUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
export default {
  props: {
    ordId: String,
    delivId: String,
  },
  name: "PopupTimeSelect",
  metaInfo: {
    title: 'GS 프레시몰',
    titleTemplate: '예약 배송 시간 선택 < 주문결제 < %s'
  },
  data() {
    return {
      popup: { // 팝업
        popupFreeTime: false,
      },
      resvOrdInfo: null,
      resvItemList: null,
      resvDelivSeqsList: null,
      selSelivSeqs: null,
      selSelivSeqsSeqno: null,
      resvItemCnt: 0,
      resvSlotYn: false,
    };
  },
  components: {
    PopupFreeTime, // 팝업 - 프리타임 안내
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupInnerAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    popupAction() {
      this.$emit('popupEvent', 'popupTimeSelect');
      this.modalActiveEvent('popupTimeSelect');
    },
    async init() {
        const params = {};
        params.ordId = this.ordId;
        params.delivId = this.delivId;
        const response = await ApiUtils.post("/fo/od/resv_ord/resv_ord_info", JSON.stringify(params));
        if ( response.data.data == null ) {
          return this.$gsdialog.alert(OrderMsg.ordValidChk);
        }

        if ( response.data.success != true ) {
          return this.$gsdialog.alert(response.data.statusMessage);
        }

        this.resvOrdInfo = {
            ordId: response.data.data.ordId,
            ordDt: response.data.data.ordDt,
            delivDt: response.data.data.delivDt,
            adrsNm: response.data.data.adrsNm,
            adrsAddr: response.data.data.adrsAddr,
            adrsTelNo: response.data.data.adrsTelNo,
            delivSeqsSeqno: response.data.data.delivSeqsSeqno,
        };

        console.log("====>", this.resvOrdInfo);

        this.resvItemList = response.data.data.resvOrdItemInfo;
        this.resvDelivSeqsList = response.data.data.resvOrdDelivSeqsInfo;
        this.resvItemCnt = this.resvItemList.length;

        this.resvSlotYn = this.resvOrdInfo.delivSeqsSeqno!=null;
    },
    updateDelivSeqno(delivSeqs, delivSeqsSeqno) {
      this.selSelivSeqs = delivSeqs;
      this.selSelivSeqsSeqno = delivSeqsSeqno;
    },
    async saveDelivSlot() {
      if (this.selSelivSeqs == null || this.selSelivSeqsSeqno == null ) {
        return this.$gsdialog.alert(OrderMsg.delivSeqChk);
      }

      const params = {
        delivId: this.delivId,
        delivSeqs: this.selSelivSeqs,
        delivSeqsSeqno: this.selSelivSeqsSeqno,
      };

      const response = await ApiUtils.put("/fo/od/resv_ord/resv_ord_info", JSON.stringify(params));

      if ( response.data.success == false ) {
        return this.$gsdialog.alert("예약배송시간 배정에 실패하였습니다. 관리자에게 문의하세요.");
      }

      this.$gsdialog.alert("예약배송시간 설정이 완료되었습니다.");
      SiteUtils.go(location.host, '/');
    },
    disableInput() {
      return this.resvSlotYn;
    }
  },
  mounted() {
    // this.modalActiveEvent('popupTimeSelect');
    this.init();
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.popupFreeTime) {
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
};
</script>
