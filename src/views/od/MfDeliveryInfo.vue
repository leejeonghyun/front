<template>
  <section class="mypage block">
    <div class="total-payment order-payment mt0">
      <div class="sub-title with-description border">
        <h3 class="inline"><span class="bg-line-brush">배송지 정보</span></h3>
        <!-- 삭제 요청으로 인한 삭제처리 (20210203 서동우실장요청) -->
        <!-- p class="delivery-txt">도서산간 등 일부 지역은 주문이 취소될 수 있습니다.</p -->
      </div>
      <div class="delivery-management modify">
        <div class="title_box__flex">
          <h4>배송지</h4>
          <a href="javascript:;" id='popupDlvpChangeBtn' class="btn-border address" aria-haspopup="dialog" @click="popupDlvpChangeAction"><span>배송지 변경</span></a>
        </div>
        <div class="delivery-list">
          <ul class="addr-list">
            <li>
              <div class="addr-txt">
                <span class="name"><strong>{{ordsDlvpInfo.adrsNm}}</strong> [{{ordsDlvpInfo.dlvpNm}}]</span>
                <span class="code">{{ordsDlvpInfo.adrsZipcd}}</span> {{ordsDlvpInfo.adrsStnmBaseAddr}} {{ordsDlvpInfo.adrsStnmDtlAddr}}
                <span class="cell-num">{{telNoPrt}}</span>
                <div class="bottom-area" v-if="showSafeNumber()">
                  <span class="inp-chk small">
                    <input type="checkbox" name="safe-number" id="safe-number" @click="chkSafeNumberAction(rlfNoRqtYn === 'Y' ? 'N' : 'Y')" :checked="rlfNoRqtYn === 'Y'">
                    <label for="safe-number">안심번호 신청</label>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="delivery-management modify">
        <div class="title_box__flex">
          <h4>상품 수령 위치</h4>
        </div>
        <ul class="radio_list">
          <li v-for="(itemRcptPositInfo, idx) in commGrpCdOd0101List" :key="`ITEM_RCPT_POSIT_INFO_${idx}`">
            <p class="inp-radio small">
              <input type="radio" name="itemRcptPosit" :id="`itemRcptPosit${idx}`" v-model="delivRequest.selectedLocation" :value="itemRcptPositInfo.commCd" @change="changeItemRcptPosit('1')">
              <label :for="`itemRcptPosit${idx}`">{{itemRcptPositInfo.commCdNm}}</label>
            </p>
            <div class="input_direct" v-if="showItemRcptPosit(itemRcptPositInfo)">
              <div class="inner-textarea">
                <textarea id="itemRcptPositDirect"
                  cols=""
                  rows=""
                  :maxlength="maxTextLength"
                  placeholder="100자이내로 작성해주세요"
                  title="상품 수령 위치 입력"
                  v-model="delivRequest.itemDlvrMethoDtlCnts"
                  @drop="eventPasteDtlCnts()"
                  @paste="eventPasteDtlCnts()"
                  @mouseup="keydownDtlCnts()"
                  @keyup="keydownDtlCnts()"
                  @change="changeItemRcptPosit('99')">
                </textarea>
                <div class="txt-byte">
                  <span class="hidden">현재 작성한 글자 수</span>
                  <em>{{curTextLength}}</em>
                  <span>/</span>
                  <span class="hidden">최대 작성 글자 수</span><span>{{maxTextLength}}</span>
                </div>
              </div>
            </div>
          </li>
          <li v-show="delivRequest.selectedLocation === '03' || delivRequest.selectedLocation === '99'">
            <div class="input_direct">
              <div class="inner-textarea" v-show="false"></div>
              <ul class="list-info">
                <li>출입이 불가능할 경우 반송될 수 있으니 반드시 상품 수령 위치를 확인해 주십시오.</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="delivery-management modify" v-if="showIoptMetho()">
        <div class="tit-accordion in">
          <button type="button" id="acc_bt" class="tit" aria-controls="acc_cont" aria-expanded="false" @click="accordionEvent">
            <div class="title_box__flex">
              <h4>공동현관 출입방법</h4>
            </div>
          </button>
        </div>
        <ul class="list-info inner" id="acc_cont" aria-labelledby="acc_bt" hidden="hidden">
          <li>공동현관 출입번호는 원활한 배송을 위해 계속 사용하도록 안전하게 저장/관리합니다.</li>
        </ul>
        <ul class="radio_list">
          <li v-for="(ioptMethoInfo, idx) in commGrpCdOd0102List" :key="`IOPT_METHO_INFO${idx}`" v-show="ioptMethoInfo.commCd === '1' || ioptMethoInfo.commCd === '2'">
            <p class="inp-radio small">
              <input type="radio" name="ioptMetho" :id="`ioptMetho${idx}`" :value="ioptMethoInfo.commCd" v-model="delivRequest.selectedOptionValue" @change="changeItemRcptPosit('2')">
              <label :for="`ioptMetho${idx}`">{{ioptMethoInfo.commCdNm}}</label>
            </p>
            <div class="input_direct" v-if="ioptMethoInfo.commCd === '1' && delivRequest.selectedOptionValue === '1'">
              <input type="text" class="inp-txt" name="itemDlvrMethoDtlCnts" id="itemDlvrMethoDtlCnts" maxlength="30" v-model="delivRequest.itemDlvrMethoDtlCnts" @change="changeItemRcptPosit('99')" placeholder="예) #1234 호출버튼">
            </div>
          </li>
        </ul>
      </div>
      <!-- Makert For 용 배송요청사항 정보 처리 관련 API 추가 개발건으로 인해 임시 주석 처리 -->
      <div class="delivery-management modify" v-if='false'>
        <ul class="radio_list">
          <li>&nbsp;</li>
          <li>
            <span class="inp-chk small">
              <input type="checkbox" name="agreeDeliveryType" id="agreeDeliveryType" v-model="delivRequest.agreeDeliveryType">
              <label for="agreeDeliveryType">다음 주문에도 사용</label>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import LoginUtils from '@/common/LoginUtils';
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "MfDeliveryInfo",
  props: {
    ordsItemList: Object,
    ordsDelivGrpInfo: Object,
    ordsDlvpInfo: Object,
    ordsInfo: Object,
    rlfNoRqtYn: String,
  },
  data() {
    return {
      commGrpCdOd0101List: [], // 상품수령위치
      commGrpCdOd0102List: [], // 상품전달방법추가코드
      bDelivRequest: {},
      delivRequest: { // 배송요청사항 DVLP
        ordId: this.ordsDelivGrpInfo.ordId,
        ordsDlvpSeqno: this.ordsDelivGrpInfo.ordsDlvpSeqno,
        selectedLocation: '01', // 상품 수령 위치 옵션
        selectedOptionValue: '1', // 상품 수령 위치 - 공동현관 선택
        itemDlvrMethoDtlCnts: '', // 배송 요청사항 메시지
        // agreeDeliveryType: true, // 배송요청사항저장여부
        agreeDeliveryType: false, // 배송요청사항저장여부 // Makert For 용 배송요청사항 정보 처리 관련 API 추가 개발건으로 인해 임시 false 처리
      },
      loginYn: LoginUtils.isLogin(),
      maxTextLength: 100,
      curTextLength: 0,
    };
  },
  watch: {
    ordsDlvpInfo: function() {
      // 저장된 배송요청 사항 정보 조회
      this.retrieveAgreeDelivery();
    },
  },
  computed: {
    telNoPrt: function() {
      if (this.ordsDlvpInfo.adrsMoblTelNo != '' && this.ordsDlvpInfo.adrsMoblTelNo != undefined) {
        return (this.ordsDlvpInfo.adrsMoblTelNo).substring(0, 3) + '-' + (this.ordsDlvpInfo.adrsMoblTelNo).substring(3, 7) + '-' + (this.ordsDlvpInfo.adrsMoblTelNo).substring(7);
      } else {
        return '';
      }
    },
  },
  components: {
  },
  mixins: [AccordionMixin],
  methods: {
    // 배송지 안내 팝업 호출 함수
    popupDlvpAction() {
      this.$emit('popupDlvp');
    },
    // 배송지 변경 팝업 호출 함수
    popupDlvpChangeAction() {
      this.$emit('popupDlvpChange');
    },
    // 안심번호 체크 처리 함수 호출
    chkSafeNumberAction(safeFlag) {
      this.$emit('chkSafeNumber', safeFlag);
    },
    // 안심번호 체크 UI 노출 처리 함수
    showSafeNumber() {
      if (!!this.ordsItemList
          && !!this.ordsItemList.ordsDelivSupplGrpInfoList
          && !!this.ordsItemList.ordsDelivSupplGrpInfoList.find(supplInfo => supplInfo.mallId === '301')) {
        return false;
      }
      return true;
    },
    // 상품수령방법 변경 시 화면 UI 노출 방법 처리 함수
    showItemRcptPosit(itemRcptPositInfo) {
      if (itemRcptPositInfo.commCd === '99' && this.delivRequest.selectedLocation === '99') {
        return true;
      }
      return false;
    },
    // 상품수령방법 상세 옵션 UI 노출 방법 처리 함수
    showIoptMetho() {
      if (this.delivRequest.selectedLocation === '01' || this.delivRequest.selectedLocation === '02') {
        return true;
      }
      return false;
    },
    eventPasteDtlCnts() {
      setTimeout(() => this.keydownDtlCnts(), 100);
    },
    keydownDtlCnts() {
      const strDtl = document.getElementById('itemRcptPositDirect').value;
      if (strDtl.length > this.maxTextLength && event.keyCode != 8) {
        this.delivRequest.itemDlvrMethoDtlCnts = strDtl.substring(0, this.maxTextLength);
        event.target.value = strDtl.substring(0, this.maxTextLength);
        this.curTextLength = strDtl.substring(0, this.maxTextLength).length;
      } else {
        this.curTextLength = strDtl.length;
      }
    },
    // 상품수령방법 변경 시 데이터 처리 함수.
    changeItemRcptPosit(chgType) {
      if (chgType === '1') {
        if (this.delivRequest.selectedLocation === '01' || this.delivRequest.selectedLocation === '02') { // 01 : 문앞(벨을 눌러주세요), 02 : 문앞(벨을 누르지 말아주세요)
          this.delivRequest.selectedOptionValue = '1';
          this.delivRequest.itemDlvrMethoDtlCnts = '';
        } else if (this.delivRequest.selectedLocation === '03') { // 03 : 경비실/경비실호출
          this.delivRequest.selectedOptionValue = '3';
          this.delivRequest.itemDlvrMethoDtlCnts = '';
        } else if (this.delivRequest.selectedLocation === '99') { // 99 : 직접 입력
          this.delivRequest.selectedOptionValue = '4';
          this.delivRequest.itemDlvrMethoDtlCnts = '';
        }
      } else if (chgType === '2') {
        this.delivRequest.itemDlvrMethoDtlCnts = '';
      }
      // 변경된 배송요청 정보 저장 처리
      this.deliveryRequestProc();
    },
    // 배송요청 정보 저장 처리 함수
    async deliveryRequestProc() {
      // 디폴트로 정의된 배송요청사항 DB 업데이트
      const iOrdsDelivDlvpInq = {
        cmmMbrNo: this.ordsDlvpInfo.cmmMbrNo,
        mbrDlvpSeqno: this.ordsDlvpInfo.mbrDlvpSeqno,
        ordId: this.ordsDelivGrpInfo.ordId,
        ordsDlvpSeqno: this.ordsDelivGrpInfo.ordsDlvpSeqno,
        itemDlvrMethoCd: this.delivRequest.selectedLocation,
        itemDlvrMethoAddCd: this.delivRequest.selectedOptionValue,
        itemDlvrMethoDtlCnts: this.delivRequest.itemDlvrMethoDtlCnts,
      };
      const result = await ApiUtils.put('/fo/od/mf/ordsmgnt/delivery-request-proc', iOrdsDelivDlvpInq);

      this.$emit('delivReqEvent', this.delivRequest);
    },
    // 저장된 배송요청 사항 정보 조회
    async retrieveAgreeDelivery() {
      const iMbrDlvpInfoInq = {
        mbrDlvpSeqno: this.ordsDlvpInfo.mbrDlvpSeqno,
        ordId: this.ordsDlvpInfo.ordId
      };
      const response = await ApiUtils.post('/fo/od/mf/ordsmgnt/cust-request-info', iMbrDlvpInfoInq);
      this.bDelivRequest = response.data.data;
      if (this.bDelivRequest != null) {
        this.delivRequest.selectedLocation = this.bDelivRequest.itemDlvrMethoCd ? this.bDelivRequest.itemDlvrMethoCd : '01';
        this.delivRequest.selectedOptionValue = this.bDelivRequest.itemDlvrMethoAddCd ? this.bDelivRequest.itemDlvrMethoAddCd : '1';
        this.delivRequest.itemDlvrMethoDtlCnts = this.bDelivRequest.itemDlvrMethoDtlCnts ? this.bDelivRequest.itemDlvrMethoDtlCnts : '';
        this.curTextLength = this.delivRequest.itemDlvrMethoDtlCnts.length;
        this.$emit('delivReqEvent', this.delivRequest);
      }
    },
    // 공통코드 조회
    async commCdSearch(commGrpCd) {
      const params = {
        commGrpCd: commGrpCd,
      };
      const result = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params);
      return result.data.data;
    },
  },
  async mounted() {
    // 공통코드 조회
    this.commGrpCdOd0101List = await this.commCdSearch('OD0101'); // 상품수령위치
    this.commGrpCdOd0102List = await this.commCdSearch('OD0102'); // 상품전달방법추가코드
  },
};
</script>
