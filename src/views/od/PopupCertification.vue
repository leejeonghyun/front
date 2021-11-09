<!--
views/od/SC-FO-OD-GS-MP-039
-->
<template>
    <!-- START : 준회원 휴대폰 인증 레이어 -->
    <div id="popupCertification" class="wrap-layer certification-layer" role="dialog" aria-labelledby="popupCertification" aria-modal="true" :class="[{active : this.modalActive.popupCertification}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-bottom-fixed">
        <div class="title"><h3>휴대전화 인증</h3></div>
        <div class="layer-content">
          <div class="inner-box">
            <p class="mobile-txt">주문하시려면 휴대전화 인증이 필요합니다.</p>
            <p class="insert-mobile">
              <input type="number" ref="mobileNumber" id="" class="inp-txt w100" value="01012345678" title="휴대폰 번호 입력" placeholder="‘ - ’ 없이 숫자만 입력">
              <button type="button" class="btn-inp-del" @click="clearNumber" :class="{active : showDelBtn}"><span class="hidden">휴대폰 번호 삭제</span></button>
            </p>
            <p class="certification-code">
              <span class="insert-code">
                <input type="number" class="inp-txt" id="" title="인증번호 입력" value="" placeholder="인증번호 입력">
                <span class="timer">02:59</span>
              </span>
              <button type="button" id="" class="btn-send">재전송</button>
            </p>
          </div>
        </div>
        <div class="wrap-btn">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="popupAction">인증번호 요청</button>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 준회원 휴대폰 인증 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PoupSelectAddress",
  data() {
    return {
      showDelBtn: true, // 삭제버튼
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupCertification');
      this.modalActiveEvent('popupCertification');
    },
    clearNumber(el) {
      const input = this.$refs.mobileNumber;
      input.value = '';
      input.focus();
      this.showDelBtn = !this.showDelBtn;
    }
  },
  mounted() {
    this.modalActiveEvent('popupCertification');
  }
};
</script>
