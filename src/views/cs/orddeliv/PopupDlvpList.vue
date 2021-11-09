<!--
views/od/SC-FO-PA-GS-MP-001
-->
<template>
  <!-- : 실사용 소스 -->
  <div
    id="popupDeliveryList"
    class="wrap-full-popup"
    role="dialog"
    aria-modal="true"
    :class="[{active : this.modalActive.popupDeliveryList}, siteClass]"
  >
    <div class="header-popup">
      <strong>배송지 목록</strong>
    </div>
    <div class="full-popup-body scroll-area has-fixed-bottom">
      <div class="inner-full-popup">
        <div class="delivery-management">
          <div class="title">
            <h3 class="hidden">배송지 목록</h3>
            <button
              type="button"
              aria-label="배송지 추가 팝업 활성화"
              aria-haspopup="dialog"
              @click="addAddress()"
              class="btn-border btn-small right"
            >배송지 추가</button>
          </div>
          <!-- START : 배송지 리스트 -->
          <div class="delivery-list">
            <ul class="addr-list">
              <template v-for="(mbrDeliv, idx) in mbrDelivList">
                <li
                  :class="{disabled : mbrDeliv.eqAreaYn == 'N' && ordDelivInfo.delivTypeCd != '03'}"
                  :key="'delivList_' + mbrDeliv.mbrDlvpSeqno"
                >
                  <p class="inp-radio small">
                    <input
                      type="radio"
                      name="mbrDlvpSeqno"
                      :id="'mbrDlvpSeqno_'+idx"
                      :value="mbrDeliv.mbrDlvpSeqno"
                      v-model="newMbrDlvpSeqno"
                      @click="chgMbrDeliv(mbrDeliv)"
                      :disabled="mbrDeliv.eqAreaYn == 'N' && ordDelivInfo.delivTypeCd != '03'"
                    />
                    <label :for="'mbrDlvpSeqno_'+idx">
                      <span class="name">
                        <strong>{{mbrDeliv.adrsNm}}</strong>
                        [{{mbrDeliv.dlvpNm}}]
                        <span
                          class="default"
                          v-show="checkBaseDlvpYn(mbrDeliv.baseDlvpYn)"
                        >기본배송지</span>
                      </span>
                    </label>
                  </p>
                  <p class="addr-txt">
                    <span class="code">{{ mbrDeliv.zipcd }}</span>
                    {{ mbrDeliv.stnmBaseAddr }} {{ mbrDeliv.stnmDtlAddr }}
                    <span
                      class="lot-number"
                    >지번 : {{ mbrDeliv.lotnoBaseAddr }} {{ mbrDeliv.lotnoDtlAddr }}</span>
                    <span class="cell-num">{{ getTelNo(mbrDeliv.moblTelNo) }}</span>
                  </p>
                  <span class="branch">{{mbrDeliv.areaStorNm}}</span>
                </li>
              </template>
            </ul>
          </div>
          <!-- END : 배송지 리스트 -->
        </div>
        <div class="popup-btns-fixed-bottom">
          <button class="btn-lg btn-bg lightgreen" @click="mbrDlvpAddrChoiceEvent()">변경</button>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupDelivAction">
      <span class="hidden">닫기</span>
    </button>

    <PopupDelivPlaceAdd
      @popupEvent="popupAction"
      isPopup="true"
      v-if="this.popup.popupDelivPlaceAdd"
    />
  </div>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import ObjectUtils from '@/common/ObjectUtils';
import CookieUtils from '@/common/CookieUtils';
import PopupDelivPlaceAdd from './PopupDelivPlaceAdd';

export default {
  props: {
    ordDelivInfo: Object,
    marketfor: String,
  },
  name: 'PopupDeliveryList',
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '배송지 목록 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '배송지 목록',
      },
    ],
  },
  data() {
    return {
      popup: {
        open: false,
        popupDelivPlaceAdd: false,
      },
      mbrDelivList: null,
      newMbrDlvpSeqno: null,
      newMbrDlvpInfo: {},
      searchParam: {
        cmmMbrNo: null,
        delivId: null,
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    PopupDelivPlaceAdd,
  },
  methods: {
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false);

      if (type == 'popupDelivPlaceAdd') {
        this.retrievelistMbrDlvp();
      }
    },
    addAddress() {
      // 2021.02.17 배송지 목록 개수 제한 추가
      if (this.mbrDelivList.length < 20) {
        this.popupAction('popupDelivPlaceAdd');
      } else {
        this.$gsdialog.alert('배송지는 20개까지 등록 가능합니다.');
      }
    },
    // 회원 배송지 목록 조회
    async retrievelistMbrDlvp() {
      const paramObj = {
        ...ObjectUtils.pick(this.ordDelivInfo, ['orgDelivId']),
      };
      const response = await ApiUtils.get(
        '/fo/cs/orddelivmgnt/cust-delivery-place-info',
        paramObj
      );
      this.mbrDelivList = response.data.data;
      if (this.$props.marketfor == 'Y') {
        this.newMbrDlvpSeqno = this.mbrDelivList.find(
          i => i.baseDlvpYn == 'Y'
        ).mbrDlvpSeqno;
      } else {
        this.newMbrDlvpSeqno = this.ordDelivInfo.dlvpSeqno; // 이미 선택한 배송지 checked 처리
      }
    },
    // 기본배송지여부 체크
    checkBaseDlvpYn(baseDlvpYn) {
      if (baseDlvpYn === 'Y') {
        return true;
      } else {
        return false;
      }
    },
    // 변경버튼 클릭 이벤트
    mbrDlvpAddrChoiceEvent() {
      if (this.$props.marketfor == 'Y') {
        // 마켓포 인경우 아래 프로세스 사용안함. (신규 페이지에서 변경 처리 함)
        let params = {};
        this.mbrDelivList
          .filter(x => x.mbrDlvpSeqno == this.newMbrDlvpSeqno)
          .map(value => {
            params = value;
          });
        if (Object.keys(params).length == 0) {
          this.$gsdialog.alert('선택된 배송지가 없습니다.');
          return;
        }
        this.$emit('popupEvent', 'popupDeliveryList');
        this.$emit('chgDelivDlvp', params);
        return;
      }
      if (
        this.newMbrDlvpInfo == null ||
        StringUtils.isEmpty(this.newMbrDlvpInfo.mbrDlvpSeqno)
      ) {
        this.$gsdialog.alert('변경된 정보가 없습니다.').then(dialog => {});
        return false;
      }
      if (this.newMbrDlvpInfo.mbrDlvpSeqno == this.ordDelivInfo.mbrDlvpSeqno) {
        this.$gsdialog.alert('변경된 정보가 없습니다.').then(dialog => {});
        return false;
      }
      if (
        this.newMbrDlvpInfo.eqAreaYn != 'Y' &&
        this.ordDelivInfo.delivTypeCd != '03'
      ) {
        this.$gsdialog
          .alert('동일 권역의 배송지만 선택하실 수 있습니다.')
          .then(dialog => {});
        return false;
      }
      this.$gsdialog.confirm('배송지를 변경하시겠습니까?').then(dialog => {
        this.processOrdsDlvpChg();
      });
      return;
    },
    // 배송지 변경 처리
    async processOrdsDlvpChg() {
      const paramObj = { ...this.newMbrDlvpInfo };
      paramObj.ordId = this.ordDelivInfo.ordId;
      paramObj.orgDelivId = this.ordDelivInfo.orgDelivId;
      paramObj.mallId = CookieUtils.getMallId();
      const response = await ApiUtils.put(
        '/fo/cs/orddelivmgnt/delivery-place-change',
        JSON.stringify(paramObj)
      );
      if (response.data.success) {
        this.$gsdialog.alert('배송지가 변경되었습니다.').then(dialog => {
          this.$emit('popupEvent', 'popupDeliveryList');
          this.$emit('chgDelivDlvp', this.selInfo);
        });
      } else {
        this.$gsdialog
          .alert('시스템 오류가 발생했습니다.<br/>관리자에게 문의하세요', {
            html: true,
          })
          .then(dialog => {});
      }
    },
    // 배송지 선택 이벤트
    chgMbrDeliv(selDelivRow) {
      this.newMbrDlvpInfo = selDelivRow;
    },
    // 닫기버튼
    popupDelivAction() {
      this.$emit('popupEvent', 'popupDeliveryList');
    },
    getTelNo(paramTelNo) {
      if (StringUtils.isEmpty(paramTelNo)) {
        return '';
      }
      return (
        paramTelNo.substring(0, 3) +
        ' - ' +
        paramTelNo.substring(3, 7) +
        ' - ' +
        paramTelNo.substring(7)
      );
    },
  },
  mounted() {
    this.searchParam.delivId = this.ordDelivInfo.ordId;
    this.retrievelistMbrDlvp();
    // this.modalActiveEvent('popupDeliveryList');
  },
};
</script>
