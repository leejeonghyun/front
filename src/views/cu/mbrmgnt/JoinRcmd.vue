<!--
Design: views/cu/SC-FO-CU-GF-MS-014
Pg id:
Uri: /cu/join_rcmd
-->
<template>
  <!-- <div id="popupInviteFriends" class="wrap-full-popup active" role="dialog" aria-modal="true"> -->
  <!-- : 실사용 소스 -->
  <div
    id="popupInviteFriends"
    class="wrap-full-popup"
    role="dialog"
    aria-modal="true"
    :class="[{ active: this.modalActive.popupInviteFriends }, siteClass]"
  >
    <div class="header-popup">
      <h5>
        <strong>회원가입</strong>
      </h5>
    </div>
    <div class="full-popup-body signup signup-main">
      <div class="inner-full-popup friend">
        <div class="inner">
          <div class="area-text">
            <h6 class="title">
              <span class="name">{{ form.joinRcmdName }}</span>님이 초대하셨습니다
            </h6>
            <!-- 수정 START : 2020.02.20 텍스트 수정 -->
            <p class="desc">
              회원가입 후 첫 주문시 모두에게 쿠폰이 지급됩니다
              <span class="notice">(신규가입에 한함)</span>
            </p>
            <!-- 수정 END : 2020.02.20 텍스트 수정 -->
          </div>
          <!-- 전시코너 -->
          <div v-html="form.dspCnts"></div>
          <!-- START : 하단 버튼 -->
          <div class="btn-area">
            <a
              href="javascript:;"
              class="btn-signup btn-bg lightgreen"
              @click="getJoinMbr()"
            >회원가입 후 첫 주문하기</a>
          </div>
          <!-- START : 하단 버튼 -->
        </div>
      </div>
    </div>
    <button
      class="btn-layer-close"
      @click="popupCloseAction"
      @keydown.9="tabFocusRemove('popupCloseAction')"
      aria-label="포커스 아웃 시 팝업 닫기"
    >
      <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'PopupInviteFriends',
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '회원가입 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '친구초대',
      },
    ],
  },
  data() {
    return {
      form: {
        joinRcmdName: '',
        joinRcmdCmmMbrNo: '',
        joinRcmdEventId: '',
        dspCnts: '',
        joinRcmd: '',
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {},
  methods: {
    popupCloseAction() {
      // closed
      this.$emit('popupEvent', 'popupInviteFriends');
      this.modalActiveEvent('popupInviteFriends');
    },
    getJoinMbr() {
      this.$store.state.cu.joinRcmdName = this.form.joinRcmdName;
      this.$store.state.cu.joinRcmdCmmMbrNo = this.form.joinRcmdCmmMbrNo;
      this.$store.state.cu.joinRcmdEventId = this.form.joinRcmdEventId;
      this.$store.state.cu.joinRcmd = this.form.joinRcmd;
      this.$router.push('/cu/join_member');
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    if (!StringUtils.isEmpty(id)) {
      const data = {
        id: id,
      };
      const result = await ApiUtils.get('/fo/cu/mbrmgnt/join_rcmd', data, {
        'Content-Type': 'application/json',
      });
      if (result.data === null) {
        console.error(result.data.msg);
        this.$gsdialog.alert('실패', { html: true });
        return;
      } else {
        if (result.data.data.resultCode === '00000') {
          this.form.joinRcmd = id;
          this.form.joinRcmdName = result.data.data.joinRcmdName;
          this.form.joinRcmdCmmMbrNo = result.data.data.joinRcmdCmmMbrNo;
          this.form.joinRcmdEventId = result.data.data.joinRcmdEventId;
          // gsfresh '1', 달리살다 '11'
          let dspConrId = '';
          if (CookieUtils.getMallId() === '11') {
            dspConrId = '1124';
          } else {
            dspConrId = '123';
          }
          const dspData = {
            dspConrId: dspConrId,
            dspCtgId: 'N1003004',
            dspScrSpCd: CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD'),
            mallId: CookieUtils.getMallId(),
            storId: CookieUtils.getCookie('STOR_ID'),
            supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
          };
          const dspCntsRst = await ApiUtils.get(
            '/dp/fr/displaymgnt/display-comm-banner-info',
            dspData,
            {
              'Content-Type': 'application/json',
            }
          );
          if (dspCntsRst.data.success === true) {
            this.form.dspCnts =
              dspCntsRst.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0].rdspCommConrCntInfo[0].dspCnts;
          } else {
            this.$gsdialog.alert('친구초대가 실패했습니다.', { html: true });
          }
        } else {
          this.$gsdialog.alert('친구초대가 실패했습니다.', { html: true });
        }
      }
      this.modalActiveEvent('popupInviteFriends');
    }
  },
};
</script>
