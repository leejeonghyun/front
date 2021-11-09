<template>
  <section class="section-area">
    <div class="sub-title border">
      <h2><strong class="bg-line-brush">당일배송 <span class="required" aria-label="필수 항목">*</span></strong></h2>
    </div>
    <div class="sub-inner-box">
      <ul class="delivery-product">
        <li>
          <span class="product-name"><span class="name">{{todayDelivInfoList.repItemNm}}</span><span v-if="todayDelivInfoList.otherItemCnt > 0"> 외 <span class="point">{{todayDelivInfoList.otherItemCnt}}</span>개</span></span>
        </li>
      </ul>
      <div class="delivery-simplycook" v-if="isNotEmpty(todayDelivInfoList.spckRepItemNm) && todayDelivInfoList.otherItemCnt !== todayDelivInfoList.spckOtherItemCnt && clsTodaySlotTime === false">
        <span class="inp-chk bg">
          <input type="checkbox" name="simplycook" id="simplycook" value="Y" @change="selectOption" v-model="ordsSpckItemIncld" checked aria-label="주문예정금액 변동 안내 활성화" aria-haspopup="dialog">
          <label for="simplycook">심플리쿡) {{todayDelivInfoList.spckRepItemNm}}<span v-if="todayDelivInfoList.spckOtherItemCnt > 0"> 외 <span class="point">{{todayDelivInfoList.spckOtherItemCnt}}</span>종</span></label>
        </span>
        <p class="more-info">체크해제 시 심플리쿡 상품을 제외하고, 당일배송 받으실 수 있습니다.</p>
      </div>
      <div class="delivery-simplycook" v-if="apchIncldYn === 'Y'">
        <p class="more-info">임박 / 하루판매 / 배송제한 카테고리 상품이 포함되어 당일슬롯만 선택가능합니다.</p>
      </div>
      <DeliverySlotTime ref="slot" v-if="delivSlotPolc !== null" @moveSlot="moveSlot" :strInfoMap="delivSlotPolc" :slotId="slotId" :dlvDelivTypeGrpInfo="todayDelivInfoList" :bundlDelivOrdId="bundlDelivOrdId" :slotIdx="String(1)" :spckIncldYn="todayDelivInfor.spckItemIncldYn" :apchIncldYn="apchIncldYn" @chkDelivSeqNo="chkDelivSeqNo" @clsTodaySlot="clsTodaySlot" @chkTodayDelivSeqNo="chkTodayDelivSeqNo" />
    </div>
  </section>
</template>

<script>
import DeliverySlotTime from '@/components/order/DeliverySlotTime'; // 배송차수 선택
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목

export default {
  props: {
    todayDelivInfor: Object,
    bundlDelivOrdId: String,
    strInfoMap: Object,
  },
  name: "DeliveryToday",
  data() {
    return {
      disabled: true,
      todayDelivInfoList: {},
      delivSlotPolc: null,
      slotId: 'todayDelivChk',
      apchIncldYn: "N",
      clsTodaySlotTime: false,
    };
  },
  mixins: [LayerPopupMixin],
  components: {
    DeliverySlotTime, // 배송차수 선택
  },
  computed: {
    ordsSpckItemIncld: {
      get: function() {
        // console.log('==>' + this.todayDelivInfor.spckItemIncldYn);
        return 'Y' === this.todayDelivInfor.spckItemIncldYn;
      },
      set: function(ordsSpckItemIncld) {
        // console.log('<==' + ordsSpckItemIncld);
        this.todayDelivInfor.spckItemIncldYn = (ordsSpckItemIncld === true ? 'Y' : 'N');
      },
    }
  },
  methods: {
    // 팝업
    popupFreeTimeActive() {
      this.$emit('popupEvent', 'popupFreeTime');
    },
    popupSimplycookActive() {
      this.$emit('popupEvent', 'popupSimplycook', this.todayDelivInfoList);
    },
    // 심플리쿡 체크 선택, 해제
    selectOption (event) {
      const isChecked = event.target.checked;
      this.spckDisable(isChecked);
      if (!isChecked) {
        // 배송비가 발생할 경우에만 팝업호출
        const addAmt = this.todayDelivInfoList.addAmt;
        const itemAddAmt = this.todayDelivInfoList.itemAddAmt;
        const spckAddAmt = this.isNotEmpty(this.todayDelivInfoList.spckExcldAddAmt) ? this.todayDelivInfoList.spckExcldAddAmt : 0;
        const spckItemAddAmt = this.isNotEmpty(this.todayDelivInfoList.spckExcldItemAddAmt) ? this.todayDelivInfoList.spckExcldItemAddAmt : 0;
        // if ((addAmt === 0 && spckAddAmt > 0) || (itemAddAmt === 0 && spckItemAddAmt > 0)) {
        if (spckAddAmt > 0 || spckItemAddAmt > 0) {
            this.popupSimplycookActive();
        } else {
          this.processTodayDelivSpckExcld(isChecked);
        }
      } else {
        this.processTodayDelivSpckExcld(isChecked);
      }
    },
    spckDisable(isChecked) {
      this.$refs.slot.spckDisable(isChecked);
    },
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    // 주문서당일배송안내조회 배송정책 추가
    async retrieveTodayDelivInfor() {
      const iTodayDelivInforInq = {
        ordId: this.todayDelivInfor.ordId,
        ordsDlvpSeqno: this.todayDelivInfor.ordsDlvpSeqno,
        itemRcptTypeCd: 'D',
        delivPolcId: this.todayDelivInfor.delivPolcId,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/today-delivery-info', iTodayDelivInforInq);
      // console.log(response);
      this.todayDelivInfoList = response.data.data;
      this.delivSlotPolc = {
        delivPolcId: this.todayDelivInfoList.delivPolcId,
        seqsExpsrDys: this.todayDelivInfoList.seqsExpsrDys,
        ordId: this.todayDelivInfor.ordId,
        ordsDelivSeqno: this.todayDelivInfoList.ordsDelivSeqno,
        ordsDlvpSeqno: this.todayDelivInfoList.ordsDlvpSeqno,
        frtmUseYn: this.todayDelivInfoList.frtmDelivPosbYn,
        adrsZipcd: this.strInfoMap.adrsZipcd,
        adrsBaseAddr: this.strInfoMap.adrsBaseAddr,
        adrsDtlAddr: this.strInfoMap.adrsDtlAddr,
        adrsStnmBaseAddr: this.strInfoMap.adrsStnmBaseAddr,
        adrsStnmDtlAddr: this.strInfoMap.adrsStnmDtlAddr,
        pkuppId: '',
        itemRcptTypeCd: this.strInfoMap.itemRcptTypeCd,
      };
      if (this.todayDelivInfoList) {
        // 심플리쿡, 임박/하루판매/당일배송 카테고리 상품 동시 존재여부 체크
        if (this.todayDelivInfoList.spckItemIncldYn === "Y" && (this.todayDelivInfoList.apchItemIncldYn === "Y" || this.todayDelivInfoList.todayItemIncldYn === "Y" || this.todayDelivInfoList.ctgItemIncldYn === "Y")) {
          await this.$gsdialog.alert(OrderMsg.deliveryTodayItemChk, {html: true});
          await this.$router.push({name: 'theBasket'});
        }
        if (this.isNotEmpty(this.todayDelivInfoList.apchRepItemNm) || this.isNotEmpty(this.todayDelivInfoList.todayRepItemNm) || this.isNotEmpty(this.todayDelivInfoList.ctgRepItemNm)) {
          this.apchIncldYn = "Y";
        }
        if (this.isNotEmpty(this.todayDelivInfoList.spckRepItemNm)) {
          this.todayDelivInfor.spckItemIncldYn = "Y";
          this.ordsSpckItemIncld = true;
          // this.spckDisable(this.ordsSpckItemIncld);
        }
      }
    },
    async retrievelistCommonCodes(commGrpCd) {
      const iCommonCodesInq = {
        commGrpCd: commGrpCd,
      };
      const response = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', iCommonCodesInq);
    },
    processTodayDelivSpckExcld(isChecked) {
      const iTodayDelivSpckExcldProc = {
        ordId: this.todayDelivInfor.ordId,
        ordsDelivSeqno: this.todayDelivInfoList.ordsDelivSeqno,
        spckItemIncldYn: isChecked ? 'Y' : 'N',
        pmbsJoinPrcnCd: CookieUtils.getCookie('pmbsJoinPrcnCd'),
      };
      this.$emit('processTodayDelivSpckExcld', iTodayDelivSpckExcldProc);
    },
    delivSeqsSerh() {
      this.$refs.slot.updateSelSeqs();
    },
    chkDelivSeqNo(seqNo) {
      this.$emit('chkDelivSeqNo', 'todayDelivChk', seqNo, 0);
    },
    chkTodayDelivSeqNo(delivSeqno) {
      this.$emit('chkTodayDelivSeqNo', delivSeqno);
    },
    orderExcldSpck() {
      this.processTodayDelivSpckExcld(false);
    },
    cnclExcldSpck() {
      const el = document.querySelectorAll("#simplycook");
      if (el != null && el.length > 0) {
        el[0].checked = true;
      }
      this.ordsSpckItemIncld = true;
      this.spckDisable(true);
      // this.processTodayDelivSpckExcld(true);
    },
    clsTodaySlot() {
      this.clsTodaySlotTime = true;
    },
    chkOrdPolcSeq(ordPolcSeqList) {
      this.$refs.slot.chkOrdPolcSeq(ordPolcSeqList);
    },
    moveSlot() {
      this.$emit('moveSlot');
    },
  },
  mounted() {
    this.retrieveTodayDelivInfor();
    this.retrievelistCommonCodes('OD0031');
  },
};
</script>
