<template>
  <!-- START : 축 당첨! -->
  <div id="popupCongratulation" class="wrap-layer alert-layer wrap-event-templete active" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
    <div class="layer-bg"></div>
    <div class="alert-layer-inner">
      <div class="inner-box">
        <div class="title" v-if="popupCongInfo.title"><h3>{{popupCongInfo.title}}</h3></div>
        <div class="layer-content scroll-area" v-if="isSuccess">
          <div class="event-complete-info" v-if="popupCongInfo.eventWinGvwyList1.length > 0">
            <p class="text" v-for="(gvwy, key) in popupCongInfo.eventWinGvwyList1" :key="`winGvwy1`+key"><span>{{gvwy.promNm}}</span> 당첨되셨습니다</p>
            <p class="info">쿠폰은 MY페이지> 내쿠폰함에서 확인 가능하십니다.</p>
          </div>
          <div class="event-complete-info" v-if="popupCongInfo.eventWinGvwyList2.length > 0">
            <p class="text" v-for="(gvwy, key) in popupCongInfo.eventWinGvwyList2" :key="`winGvwy2`+key"><span>{{gvwy.commCdNm}} {{toComma(gvwy.gvwyApplVal)}}P</span> 당첨되셨습니다</p>
          </div>
          <div class="event-complete-info" v-if="popupCongInfo.eventWinGvwyList3.length > 0">
            <p class="text" v-for="(gvwy, key) in popupCongInfo.eventWinGvwyList3" :key="`winGvwy3`+key"><span>{{gvwy.commCdNm}} {{toComma(gvwy.gvwyApplVal)}}원</span> 당첨되셨습니다</p>
          </div>
          <div class="event-complete-info" v-if="popupCongInfo.eventWinGvwyList4.length > 0">
            <p class="text" v-for="(gvwy, key) in popupCongInfo.eventWinGvwyList4" :key="`winGvwy4`+key"><span>{{gvwy.gvwyApplVal}}</span> 당첨되셨습니다</p>
            <p class="info" v-if="popupCongInfo.winAdrsYn=='N'">배송지를 입력해 주셔야 발송이 가능합니다.</p>
            <div class="link-go"><gs-link :to="`/`" @click="onWinGvwyAddr" v-if="popupCongInfo.winAdrsYn=='N'">배송지 입력하러 가기</gs-link></div>
          </div>
          <div class="event-complete-info" v-if="popupCongInfo.eventWinGvwyList5.length > 0">
            <p class="text" v-for="(gvwy, key) in popupCongInfo.eventWinGvwyList5" :key="`winGvwy5`+key"><span>{{gvwy.gvwyApplVal}}</span> 당첨되셨습니다</p>
            <p class="info">해당 상품은 카카오 알림톡으로 교환권이 발송됩니다.<br />개인정보에 있는 연락처를 확인해주세요.</p>
          </div>
          <div class="event-complete-info" v-if="popupCongInfo.eventWinGvwyErrMsg">
            <p class="info">{{popupCongInfo.eventWinGvwyErrMsg}}</p>
          </div>
        </div>
        <div class="layer-content scroll-area" v-if="popupCongInfo.msg">
          <p class="text" v-html="popupCongInfo.msg"></p>
          <div class="link-go"><gs-link :to="`/`" @click="onWinGvwyAddr" v-if="popupCongInfo.winAdrsYn=='N'">배송지 입력하러 가기</gs-link></div>
        </div>
      </div>
      <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기">
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 축 당첨 -->
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
import NumberUtils from '@/common/NumberUtils';

export default {
  name: 'popupCongratulation',
  mixins: [LayerPopupMixin],
  props: {
    popupCongInfo: Object,
    popupEvent: Function,
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupCongratulation');
    },
    onWinGvwyAddr(event) {
      event.preventDefault();
      this.$emit('popupEvent', 'popupCongratulation');
      this.$emit('popupEvent', 'popupEventGvwyAddr');
    }
  },
  created() {
  },
  watch: {
  },
  computed: {
    isSuccess() {
      return this.popupCongInfo.eventWinGvwyList1.length > 0 || this.popupCongInfo.eventWinGvwyList2.length > 0
      || this.popupCongInfo.eventWinGvwyList3.length > 0 || this.popupCongInfo.eventWinGvwyList4.length > 0
      || this.popupCongInfo.eventWinGvwyList5.length > 0 || this.popupCongInfo.eventWinGvwyErrMsg;
    },
  },
  async mounted() {

  }
};
</script>

<style></style>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
