<template>
  <div>
    <transition name="zoomIn" appear >
      <div v-if="show" ref="container" class="dg-container">
        <div class="dg-content-cont dg-content-cont--floating popup-app-push-agree">
          <div class="dg-main-content">

            <div class="dg-content">
              <h1>
                알림 전용 혜택<br />
                놓치지 마세요!
              </h1>
              <div class="popup-content">
                <img src="@/assets/images/img/popup_apppush.gif" />
              </div>
            </div>

            <div class="button-wrap">
              <button :class="['dg-btn', 'dg-btn--right', 'btn-apppush-confirm']" @click.prevent="fnPushAgree('Y')">
                <span class="dg-btn-content">알림받기</span>
              </button>
              <button ref="lb" class="dg-btn dg-btn--left btn-apppush-cancel" @click.prevent="fnPushAgree('N')">나중에 받기</button>
              <div class="dg-clear"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="dg-backdrop"></div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
export default {
  name: "PopupAppPushAgree",
  data: function() {
    return {
      checkedNames: false,
      cmmMbrNo: '',
      year: DateUtils.getToday().substr(0, 4),
      month: DateUtils.getToday().substr(5, 2),
      day: DateUtils.getToday().substr(8, 2),
      show: true,
      loading: false
    };
  },
  mixins: [LayerPopupMixin],
  methods: {
    async fnPushAgree(agrmAgrYn) {
      try {
        CookieUtils.deleteCookie('MbrJoinTodayYn');
        CookieUtils.deleteCookie('PushAgreeOpenYn');
        this.close();
        const CmmSteAgrmAgrInputDto = {
            cmmSteAgrmCd: CookieUtils.getCmmSteId() === '1'? 'F0' : 'D0',
            agrmAgrYn: agrmAgrYn,
        };
        let agrmAgrYnString = '동의';
        if (agrmAgrYn == 'N') {
          agrmAgrYnString = '거부';
        }
        const response = await ApiUtils.post('/fo/cu/mbrmgnt/commerce-site-agreement-assent', CmmSteAgrmAgrInputDto);
        if (response.data.success === true) {
          await this.$gsdialog.alert('{' + this.year + '년 ' + this.month + '월 ' + this.day + '일' + '} \n ' + '광고성/혜택 정보(Push)알림' + agrmAgrYnString + '가 정상 처리되었습니다.');
        } else {
          console.log('알림을 설정 할 수 없습니다.');
        }
      } catch (e) {
        console.log(e);
      }
    },
    close() {
      this.$emit('popupEvent', 'pushAgreeOpenYn');
    },
  },
  async mounted() {
  },
};
</script>

<style scoped>
</style>
