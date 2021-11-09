<template>
    <!-- START : 앱개선 팝업 -->
    <div id="PopupAppImprove" class="wrap-layer review-event description-layer" role="dialog" aria-labelledby="PopupAppImprove" aria-modal="true" :class="{active : this.modalActive.PopupAppImprove}">
      <div class="layer-bg" @click="popupClose"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>개선이 필요해요</h3>
          </div>
          <div class="layer-content">
            <div class="message">
              고객님의 소중한 의견 부탁드립니다.<br>
              상품, 이벤트, 앱 사용 등에 대한 다양한 의견을 주시면<br>
              추첨을 통해 혜택을 드립니다!
              <div class="wrap-textarea">
                <textarea title="개선내용 입력" id="taAppImprove" placeholder="내용을 입력해주세요." @keyup="checkTextAreaLength"></textarea>
                <span class="text-cnt">
                  <span class="hidden">입력한텍스트수</span><span  id="taAppImproveSize" class="cnt">0</span><span class="length">/<span class="hidden">입력최대텍스트수</span>500</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-alert-bottom">
          <button class="btn-confirm" @click="popupAction">개선 의견 등록 하기</button>
        </div>
        <button class="btn-layer-close" @click="popupClose" @keydown.9="tabFocusRemove('popupClose')" aria-label="포커스 아웃 시 팝업 닫기">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 앱개선 팝업 [25] 앱리뷰   DEPBOSFR-7343 -->
    <!-- END : 7658 [25] 앱리뷰 PR   DEPBOSFR-7658 변경 -->
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "PopupAppImprove",
  data() {
    return {
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.checkAppImproveMsg = this.$parent.checkAppImproveActiveMsg();
      this.checkAppImproveMsg = '';
      if (this.checkAppImproveMsg != null && this.checkAppImproveMsg != '') {
        this.$parent.popup.PopupAppImprove = false;
        this.$gsdialog.alert(this.checkAppImproveMsg);
      } else {
        this.saveAppImprove();
      }
    },
    saveAppImprove() {
      this.taAppImprove = document.getElementById('taAppImprove').value;
      if (this.taAppImprove == null || this.taAppImprove == '') {
        this.$gsdialog.alert('개선 의견을 입력해주세요.');
        return;
      }
      if (this.taAppImprove.trim().length < 10) {
        this.$gsdialog.alert('개선내용은 10자 이상만 가능합니다.');
        return;
      }
      if (this.taAppImprove.trim().length > 500) {
        this.$gsdialog.alert('개선내용은 500자 이하만 가능합니다.');
        this.taAppImprove = this.taAppImprove.trim();
        this.taAppImprove = this.taAppImprove.substring(0, 500);
        document.getElementById('taAppImprove').value = this.taAppImprove.trim();
        document.getElementById('taAppImproveSize').innerText = this.taAppImprove.trim().length;
        return;
      }

      this.submitAppImprove();
    },
    async submitAppImprove() {
      const iEventEntryInput = {
        bditmCnts: this.taAppImprove.trim()
      };
      // const response = ApiUtils.post('/fo/ev/eventmgnt/event-entry/' + this.$parent.ordInfo.appCommentEventId, iEventEntryInput);
      // await ApiUtils.post('/fo/ev/eventmgnt/event-entry/2012000012', iEventEntryInput)
      await ApiUtils.post('/fo/ev/eventmgnt/event-entry/' + this.$parent.ordInfo.appCommentEventId, iEventEntryInput)
      .then(res => {
        if (res.data && res.data.success) {
          if (res.data.data[0].errorMsg == null || res.data.data[0].errorMsg == '') {
            this.$gsdialog.alert('소중한 의견 감사합니다');
            this.$parent.popup.PopupAppImprove = false;
          } else {
            this.$gsdialog.alert(res.data.data[0].errorMsg);
          }
        } else {
          if (res.data.data.errorMsg) {
            this.$gsdialog.alert(res.data.data.errorMsg);
          }
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    },
    popupClose() {
      this.modalActiveEvent('PopupAppImprove');
    },
    checkTextAreaLength($event) {
      this.taAppImprove = document.getElementById('taAppImprove').value;
      if (this.taAppImprove.trim().length > 500) {
        this.$gsdialog.alert('개선내용은 500자 이하만 가능합니다.');
        this.taAppImprove = this.taAppImprove.trim();
        this.taAppImprove = this.taAppImprove.substring(0, 500);
        document.getElementById('taAppImprove').value = this.taAppImprove.trim();
      }
      document.getElementById('taAppImproveSize').innerText = this.taAppImprove.trim().length;
    }
  },
  mounted() {
    this.modalActiveEvent('PopupAppImprove');
  },
};
</script>
