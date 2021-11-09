<!--
views/od/SC-FO-OD-GS-MP-001
-->
<template>
  <!-- START : 배송지 목록 레이어 -->
  <div id="popupAddrList" class="wrap-layer addr-layer" role="dialog" aria-labelledby="popupAddrList" aria-modal="true" :class="[{active : this.modalActive.popupAddrList}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title">
        <h3 class="left">배송지 목록</h3>
          <p class="btn-right"><a href="javascript://" class="btn-border btn-small" @click="goMbrDlvpAdd">새 배송지 추가</a></p><!-- 수정 : START 2020.02.17 레이블 변경 -->
      </div>
      <p class="box-alert">배송지변경에 따라 행사 및 상품 재고가 변경될 수 있습니다.</p>
      <div class="scroll-area">
        <ul class="addr-list inner-box">
          <li v-for="(mbrDlvp, index) in mbrDlvpList" v-bind:key="mbrDlvp.mbrDlvpSeqno">
            <p class="inp-radio">
              <input type="radio" name="addrList" :id="`${'addr' + mbrDlvp.mbrDlvpSeqno}`" :value="index" v-model="checkedIdx">
              <label :for="`${'addr' + mbrDlvp.mbrDlvpSeqno}`">
                <span class="name wb-a">
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
        <button type="button" class="btn-lg btn-bg lightgreen" aria-haspopup="dialog" @click="popupConfirmAction">선택</button> <!-- 수정 : 2020.03.05 팝업 포커스 오류로 aria-haspopup="dialog" 추가 -->
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
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PoupSelectAddress",
  props: {
    mbrDlvpSeqno: Number
  },
  data() {
    return {
      mbrDlvpList: {},
      checkedIdx: 0,
      siteClass: CookieUtils.getSiteClass(),
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
      // this.popupAction(); <!-- 삭제 : 2020.03.05 기존팝업 닫히기 않고 새팝업 뜨도록 삭제 -->
      if (this.mbrDlvpList[this.checkedIdx].mbrDlvpSeqno !== this.mbrDlvpSeqno) {
        this.$emit('selectMbrDlvp', this.mbrDlvpList[this.checkedIdx]);
        this.$emit('popupEvent', 'popupAddrChange');
      } else {
        this.popupAction();
      }
      // this.modalActiveEvent('popupAddrChange'); // <!-- 삭제 : 2020.03.05 기존팝업 닫히기 않고 새팝업 뜨도록 삭제 -->
    },
    goMbrDlvpAdd() {
      localStorage.setItem('returnUrl', '/od/bskt');
      this.$router.push('/cu/delivery_place_add');
    },
    checkDlvp(mbrDlvp, nMbrDlvp) {
      if (mbrDlvp===nMbrDlvp) {
        return true;
      } else {
        return false;
      }
    },
  },
  async mounted() {
    this.modalActiveEvent('popupAddrList');
    const result2 = await ApiUtils.get('/fo/od/bsktmgnt/delivery-area');
    this.mbrDlvpList = result2.data.data;
    if (this.mbrDlvpList) {
      for (let idx=0; idx<this.mbrDlvpList.length; idx++) {
        if (this.mbrDlvpList[idx].mbrDlvpSeqno === this.mbrDlvpSeqno) {
          this.checkedIdx = idx;
          break;
        }
      }
    }
  }
};
</script>
