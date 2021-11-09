<template>
  <!-- : 실사용 소스 -->
  <div
    id="popupDaliSelectClose"
    class="wrap-full-popup"
    role="dialog"
    aria-modal="true"
    :class="[{active : this.modalActive.popupDaliSelectClose}, siteClass]"
  >
    <div class="header-popup">
      <strong>달리드림 해지</strong>
    </div>
    <div class="full-popup-body scroll-area bg-gray">
      <div class="inner-full-popup">
        <div class="select-close-reason">
          <div class="title-area">
            <!-- 4월수정 START : 문구 삭제 -->
            <!-- 4월수정 END : 문구 삭제 -->
            <p>
              <strong class="emp">그동안 달리드림 멤버십을 이용해주셔서 감사합니다.</strong>
              고객님의 소중한 의견을 남겨주시면
              <br />더 나은 서비스로 개선하도록 노력하겠습니다.
            </p>
          </div>
          <div class="select-area">
            <span class="wrap-select">
              <label for="selectReason" class="hidden">해지사유 선택</label>
              <select id="selectReason" v-model="resnCd" v-if="this.rcvCommCd.length != 0">
                <option
                  v-for="rcvCcd in rcvCommCd"
                  v-bind:key="rcvCcd.commCd"
                  v-bind:rcvCcd="rcvCcd"
                  v-bind:value="rcvCcd.commCd"
                >{{rcvCcd.commCdNm}}</option>
              </select>
            </span>
            <textarea
              name="resn"
              id="resn"
              v-model="resnCnts"
              cols="30"
              rows="10"
              placeholder="달리드림에 바라는 점 (30자 이내, 선택입력)"
            >
              <!-- 달리드림 멤버십에 바라는 점 (30자 이내, 선택입력) -->
            </textarea>
          </div>
        </div>
        <div class="btn-area horizon">
          <button type="button" class="btn-dali daligray" @click="popupCloseAction">취소</button>
          <button type="button" class="btn-dali daligreen" @click="leaveReg">확인</button>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'PopupDaliSelectClose',
  mixins: [LayerPopupMixin],
  props: ['popup'],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '멤버십 해지 < 달리살다 멤버십 < 마이페이지 < %s',
  },
  data() {
    return {
      bgGray: true,
      resnCd: '01',
      resnCnts: '',
      rcvCommCd: [],
      myMsg: '',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {},
  methods: {
    popupCloseAction() {
      // closed
      this.$emit('popupEvent', 'popupDaliSelectClose');
      this.modalActiveEvent('popupDaliSelectClose');
    },
    async retrieveCommCd(commCd, arr) {
      const inputDto = { commGrpCd: commCd };
      const retrieveCommCdData = await ApiUtils.get(
        '/fo/cm/commcdmgnt/common-codes',
        inputDto
      );
      // this.rcvJoinInfo = receiveJoinData.data.data;
      this.rcvCommCd = retrieveCommCdData.data.data;
    },
    async leaveReg() {
      const inputDto = {
        pmbsTermResnCd: this.resnCd,
        pmbsTermResnCnts: this.resnCnts,
        maxDate: this.popup.infoArr.maxDate,
        emailAddr1: this.popup.infoArr.emailAddr1,
        emailAddr2: this.popup.infoArr.emailAddr2,
        custNm: this.popup.infoArr.custNm,
        emailYn: 'Y',
        byeType: this.popup.infoArr.byeType,
      };
      const result = await ApiUtils.post(
        '/fo/cu/pmbsmgnt/paidmembership-terminate',
        inputDto
      ).then((res) => {
        if (res.data.success === true) {
          if (this.popup.infoArr.byeType === '1') {
            this.myMsg =
              '해지되었습니다. <br/>' +
              this.popup.infoArr.maxDate +
              ' 혜택이 유지됩니다.';
          } else {
            this.myMsg =
              '해지되었습니다. 환불금액은 3,900원입니다.<br/>결제 수단에 따라 최대 1~5일(영업일기준) 내에 환불됩니다.';
          }
          this.$gsdialog.alert(this.myMsg, {html: true}).then(() => {
            this.$router.push('/cu/my_page');
          });
        } else {
          this.$gsdialog.alert('오류가 발생했습니다.').then(() => {
            this.$router.push('/cu/my_page');
          });
        }
      });
    },
  },
  mounted() {
    this.modalActiveEvent('popupDaliSelectClose');
    this.retrieveCommCd('CU0007', this.rcvCommCd);
  },
  watch: {
    resnCnts(newVal) {
      if (newVal.length > 30) {
        this.resnCnts = newVal.substr(0, 30);
      }
    },
  },
};
</script>
