<!--
views/od/SC-FO-OD-MF-MP-001
-->
<template>
  <!-- START : 배송지 목록 레이어 -->
  <div id="popupAddrList" class="wrap-layer addr-layer" role="dialog" aria-labelledby="popupAddrList" aria-modal="true" :class="{active : this.modalActive.popupAddrList}">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title">
        <h3 class="left">배송지 목록</h3>
        <p class="btn-right"><a href="#" class="btn-border btn-small" @click="goMbrDlvpAdd">새 배송지 추가</a></p>
      </div>
      <div class="scroll-area">
        <ul class="addr-list inner-box">
          <li v-for="(mbrDlvp, idx) in mbrDlvpList" :key="`MBR_DLVP_${idx}`">
            <p class="inp-radio small">
              <input type="radio" name="addrList" :id="`mbrDlvp${idx}`" v-model="checkedIdx" :value="idx" :checked="mbrDlvp.mbrDlvpSeqno === mbrDlvpSeqno">
              <label :for="`mbrDlvp${idx}`">
                <span class="name">
                  <strong>{{mbrDlvp.encAdrsNm}}</strong>[{{mbrDlvp.dlvpNm}}]
                  <span class="default" v-if="mbrDlvp.baseDlvpYn === 'Y'">기본배송지</span>
                </span>
              </label>
            </p>
            <p class="addr-txt"><span class="code">{{mbrDlvp.zipcd}}</span> {{mbrDlvp.encStnmBaseAddr}} {{mbrDlvp.encStnmDtlAddr}}</p>
          </li>
        </ul>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg black" aria-haspopup="dialog" @click="popupConfirmAction">변경</button> <!-- 수정 : 2020.03.05 팝업 포커스 오류로 aria-haspopup="dialog" 추가 -->
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 배송지 목록 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import OrderMsg from '@/components/order/MfOrderMsg'; // 주문 메세지항목
import ApiUtils from '@/common/ApiUtils';
export default {
  name: "PoupSelectAddress",
  props: {
    mbrDlvpSeqno: Number
  },
  data() {
    return {
      mbrDlvpList: [], // 회원배송지목록
      checkedIdx: 0, // 선택된 회원배송지정보 Index
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupAddrList');
      this.modalActiveEvent('popupAddrList');
    },
    popupConfirmAction() {
      if (this.mbrDlvpList[this.checkedIdx].mbrDlvpSeqno !== this.mbrDlvpSeqno) {
        this.$emit('selectMbrDlvp', this.mbrDlvpList[this.checkedIdx]);
        this.$emit('popupEvent', 'popupAddrChange');
      } else {
        this.popupAction();
      }
    },
    goMbrDlvpAdd() {
      // 배송지 최대 추가 갯수 체크
      if (this.mbrDlvpList.length >= 20) {
        this.$gsdialog.alert(OrderMsg.dlvpMaxAddCnt);
        return;
      }
      localStorage.setItem('returnUrl', '/od/mf/bskt');
      this.$router.push('/cu/delivery_place_add');
    },
    async getDeliveryList() {
      this.modalActiveEvent('popupAddrList');
      const result = await ApiUtils.get('/fo/od/bsktmgnt/delivery-area');
      this.mbrDlvpList = result.data.data;
      if (this.mbrDlvpList) {
        for (let idx=0; idx<this.mbrDlvpList.length; idx++) {
          if (this.mbrDlvpList[idx].mbrDlvpSeqno === this.mbrDlvpSeqno) {
            this.checkedIdx = idx;
            break;
          }
        }
      }
    }
  },
  mounted() {
    this.modalActiveEvent('popupAddrList');
    // 회원배송지목록 조회
    this.getDeliveryList();
  }
};
</script>
