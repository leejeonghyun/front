<template>
  <div class="wrap-mypage bottom-sticky public_domain" :class="siteClass">
    <!-- 유입위치 클래스 추가 -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="배송정보 수정" :tabbar="false" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0">
      <section class="wrap-breakdown">
        <div class="wrap-heading hidden">
          <h3>주문정보</h3>
        </div>
        <dl class="detail-breakdown order-top">
          <dt>주문 번호</dt>
          <dd>{{this.mfOMfOrdDlvpInfo.ordId}}</dd>
          <dt>주문 일자</dt>
          <dd>{{this.mfOMfOrdDlvpInfo.ordDttm}}</dd>
        </dl>
      </section>
      <section class="mypage block">
        <div class="total-payment order-payment">
          <div class="sub-title border">
            <h3>
              <span class="bg-line-brush">배송 정보</span>
            </h3>
          </div>
        </div>

        <div class="delivery-management modify">
          <div class="title_box__flex">
            <h4>배송지 목록</h4>
            <a
              href="javascript:void(0);"
              class="btn-border address"
              @click="popupDeliveryListActive()"
            >
              <span>배송지 변경</span>
            </a>
          </div>
          <div class="delivery-list">
            <ul class="addr-list">
              <li>
                <p class="inp-radio small">
                  <span class="name">
                    <strong>{{this.mfOMfOrdDlvpInfo.adrsNm}}</strong>
                    [{{this.mfOMfOrdDlvpInfo.dlvpNm}}]
                  </span>
                </p>
                <div class="addr-txt">
                  <span class="code">{{this.mfOMfOrdDlvpInfo.adrsZipcd}}</span>
                  {{this.mfOMfOrdDlvpInfo.adrsBaseAddr}} {{this.mfOMfOrdDlvpInfo.adrsDtlAddr}}
                  <span
                    class="cell-num"
                  >{{this.mfOMfOrdDlvpInfo.adrsTelNo | phoneFomatter }}</span>
                  <!-- <div class="bottom-area" v-if="this.mfOMfOrdDlvpInfo.adrsTelRlfNo">
                    <span class="inp-chk small">
                      <input type="checkbox" name id="chkList000" value checked="checked" />
                      <label for="chkList000">안심번호 신청</label>
                    </span>
                  </div>-->
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="delivery-management modify">
          <div class="title_box__flex">
            <h4>상품 수령 위치</h4>
          </div>
          <ul class="radio_list">
            <li v-for="list in commGrpCdOd0033List" :key="list.commCd">
              <p class="inp-radio small">
                <input
                  type="radio"
                  name="radio"
                  :id="'r'+list.commCd"
                  :value="list.commCd"
                  v-model="radioSelected"
                  @change="checkDlvpReqForm(list)"
                />
                <label :for="'r'+list.commCd">{{list.commCdNm}}</label>
              </p>
            </li>
            <li v-if="radioSelected == '99'">
              <div class="input_direct">
                <div class="inner-textarea">
                  <textarea
                    id="itemDlvrMethoDtlCnts"
                    name="itemDlvrMethoDtlCnts"
                    maxlength="100"
                    cols=""
                    rows=""
                    v-model="itemDlvrMethoDtlCnts"
                    placeholder="100자이내로 작성해주세요"
                    title="상품 수령 위치 입력"
                    @drop="eventPasteDtlCnts()"
                    @paste="eventPasteDtlCnts()"
                    @mouseup="keydownDtlCnts()"
                    @keyup="keydownDtlCnts()"
                    @blur="checkDlvpReqFormChk()"
                  ></textarea>
                  <div class="txt-byte">
                    <span class="hidden">현재 작성한 글자 수</span>
                    <em id>{{etcTxtLen}}</em>
                    <span>/</span>
                    <span class="hidden">최대 작성 글자 수</span>
                    <span>100</span>
                  </div>
                </div>
                <ul class="list-info">
                  <li>출입이 불가능할 경우 반송될 수 있으니 반드시 상품 수령 위치를 확인해 주십시오.</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="delivery-management modify"
          v-if="radioSelected == '01' || radioSelected == '02'"
        >
          <div class="title_box__flex">
            <h4>공동현관 출입방법</h4>
          </div>
          <ul class="radio_list">
            <li v-for="list in commGrpCdOd0034List" :key="list.commCd">
              <p class="inp-radio small">
                <input
                  type="radio"
                  :id="'flex'+list.commCd"
                  :value="list.commCd"
                  v-model="flexSelectd"
                />
                <label :for="'flex'+list.commCd">{{list.commCdNm}}</label>
              </p>
              <div class="input_direct" v-if="list.commCd == 1 && flexSelectd == 1">
                <input
                  type="text"
                  class="inp-txt"
                  placeholder="예) #1234 호출버튼"
                  v-model="itemDlvrMethoDtlCnts"
                />
              </div>
            </li>
          </ul>
        </div>
        <div class="bottom-fixed-btn-area wrap-btn">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="dlvpInfoChg">
            <span>배송지정보 변경</span>
          </button>
        </div>
        <!-- END : 하단 버튼 -->
      </section>
    </main>
    <!-- 4월수정 START : 푸터 추가 -->
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
    <!-- 팝업 - 배송지 목록 -->
    <PopupDeliveryList
      @popupEvent="popupAction"
      :ordDelivInfo="this.mfOMfOrdDlvpInfo"
      :marketfor="this.marketfor"
      @chgDelivDlvp="chgDelivDlvp"
      v-if="this.popup.popupDeliveryList"
    />
    <!-- 4월수정 END : 푸터 추가 -->
    <Loading v-show="loading" />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import PopupDeliveryList from '@/views/cs/orddeliv/PopupDlvpList'; // 팝업 - 배송지 목록
import Loading from '@/components/common/Loading';
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: 'ChangeDeliveryInfo',
  data() {
    return {
      etcTxtLen: 0,
      loading: false,
      commGrpCdOd0033List: null,
      commGrpCdOd0034List: null,
      radioSelected: null,
      flexSelectd: null,
      itemDlvrMethoDtlCnts: null,
      mbrDelivParamInfo: {},
      mfOMfOrdDlvpInfo: {},
      // 팝업
      popup: {
        open: false,
        popupDeliveryList: false, // 팝업 - 배송지 목록
      },
      marketfor: 'Y',
    };
  },
  metaInfo: {
    title: 'GS fresh',
    titleTemplate: '배송지관리 < 마이페이지 < %s',
  },
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader,
    Footer,
    Loading,
    PopupDeliveryList,
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    phoneFomatter: function(telNo) {
      let formatNum = '';
      if (telNo) {
        if (telNo.length == 11) {
          formatNum = telNo.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        } else if (telNo.length == 8) {
          formatNum = telNo.replace(/(\d{4})(\d{4})/, '$1-$2');
        } else {
          if (telNo.indexOf('02') == 0) {
            formatNum = telNo.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
          } else {
            formatNum = telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
          }
        }
      }
      return formatNum;
    },
  },
  methods: {
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false);
    },
    popupDeliveryListActive() {
      this.popupAction('popupDeliveryList');
    },
    eventPasteDtlCnts() {
      setTimeout(() => this.itemDlvrMethoDtlCntsChk(), 100);
    },
    keydownDtlCnts() {
      const strDtl = document.getElementById('itemDlvrMethoDtlCnts').value;
      if (strDtl.length > 100 && event.keyCode != 8) {
        this.itemDlvrMethoDtlCnts = strDtl.substring(0, 100);
        event.target.value = strDtl.substring(0, 100);
        this.etcTxtLen = strDtl.substring(0, 100).length;
      } else {
        this.etcTxtLen = strDtl.length;
      }
    },
    checkDlvpReqForm(info) {
      if (info.commCd == '01' || info.commCd == '02') {
        this.flexSelectd = '1';
        this.itemDlvrMethoDtlCnts = null;
      } else {
        this.itemDlvrMethoDtlCnts = null;
        this.flexSelectd = info.otherRefCd;
      }
    },
    checkDlvpReqFormChk() {
      if (this.itemDlvrMethoDtlCnts) {
        const len = this.itemDlvrMethoDtlCnts.length;
        if (len > 100) {
          const strTitle = this.itemDlvrMethoDtlCnts.substring(0, 100);
          this.itemDlvrMethoDtlCnts = strTitle;
          return;
        }
      }
    },
    alertMessage() {
      this.$gsdialog.alert('최대 100글자 까지 가능합니다.').then(dialog => {});
    },
    isValidation() {
      let success = true;
      if (this.radioSelected == '01' || this.radioSelected == '02') {
        if (this.flexSelectd == 1) {
          if (StringUtils.isEmpty(this.itemDlvrMethoDtlCnts)) {
            this.$gsdialog.alert('공동현관출입번호를 입력해주세요.', {
              html: true,
            });
            success = false;
            return success;
          }
        }
      } else if (
        this.radioSelected == '99' &&
        StringUtils.isEmpty(StringUtils.trim(this.itemDlvrMethoDtlCnts))
      ) {
        this.$gsdialog.alert('상품 수령 위치를 입력해 주세요.', {
          html: true,
        });
        success = false;
        return success;
      }
      return success;
    },
    chgDelivDlvp(paramObj) {
      // 통합커머스 배송지 정보 -> 마켓포 배송지 정보 매핑 Set
      this.mfOMfOrdDlvpInfo.adrsBaseAddr = paramObj.lotnoBaseAddr;
      this.mfOMfOrdDlvpInfo.adrsDtlAddr = paramObj.lotnoDtlAddr;
      this.mfOMfOrdDlvpInfo.adrsNm = paramObj.adrsNm;
      this.mfOMfOrdDlvpInfo.adrsStnmBaseAddr = paramObj.stnmBaseAddr;
      this.mfOMfOrdDlvpInfo.adrsStnmDtlAddr = paramObj.stnmDtlAddr;
      this.mfOMfOrdDlvpInfo.adrsTelNo = paramObj.moblTelNo;
      this.mfOMfOrdDlvpInfo.adrsTelRlfNo = null; // 안심번호는 없음
      this.mfOMfOrdDlvpInfo.adrsZipcd = paramObj.zipcd;
      this.mfOMfOrdDlvpInfo.delivTypeCd = '03';
      this.mfOMfOrdDlvpInfo.dlvpNm = paramObj.dlvpNm;
      this.mfOMfOrdDlvpInfo.encAdrsBaseAddr = paramObj.encLotnoBaseAddr;
      this.mfOMfOrdDlvpInfo.encAdrsDtlAddr = paramObj.encLotnoDtlAddr;
      this.mfOMfOrdDlvpInfo.encAdrsNm = paramObj.encAdrsNm;
      this.mfOMfOrdDlvpInfo.encAdrsStnmBaseAddr = paramObj.encStnmBaseAddr;
      this.mfOMfOrdDlvpInfo.encAdrsStnmDtlAddr = paramObj.encStnmDtlAddr;
      this.mfOMfOrdDlvpInfo.encAdrsTelNo = paramObj.encMoblTelNo;
    },
    async retrievelistDeliveryInfoList() {
      this.loading = true;
      const params = {
        ordId: this.$route.params.id,
      };
      await ApiUtils.get('/fo/cs/mf/order-dlvp', {
        ...params,
      })
        .then(res => {
          this.loading = false;
          if (res.data === null || !res.data.success) {
            return;
          }
          this.mfOMfOrdDlvpInfo = res.data.data;
          if (this.mfOMfOrdDlvpInfo) {
            this.mfOMfOrdDlvpInfo.delivTypeCd = '03';
            // 상품 수령 위치
            this.radioSelected = this.mfOMfOrdDlvpInfo.mfItemDlvrMethoCd;
            if (this.radioSelected == 99) {
              this.itemDlvrMethoDtlCnts = this.mfOMfOrdDlvpInfo.itemDlvrMethoDtlCnts;
            }
            this.flexSelectd = this.mfOMfOrdDlvpInfo.mfItemDlvrMethoAddCd;
            if (this.flexSelectd == 1 || this.flexSelectd == 2) {
              this.itemDlvrMethoDtlCnts = this.mfOMfOrdDlvpInfo.itemDlvrMethoDtlCnts;
            }
          } else {
            this.$gsdialog.alert('잘못된 배송지 정보 입니다.').then(() => {
              location.href = '/cs/orddeliv/ord_deliv_list';
            });
            return;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    // 배송지 변경
    async dlvpInfoChg() {
      const success = this.isValidation();
      if (success) {
        const mfOrdDlvpInfoInputDto = {
          ordId: this.mfOMfOrdDlvpInfo.ordId,
          mfItemDlvrMethoCd: this.radioSelected,
          mfItemDlvrMethoAddCd: this.flexSelectd,
          itemDlvrMethoDtlCnts: this.itemDlvrMethoDtlCnts,
          dlvpSeqno: this.mfOMfOrdDlvpInfo.dlvpSeqno,
          custReqSeqno: this.mfOMfOrdDlvpInfo.custReqSeqno,
          dlvpNm: this.mfOMfOrdDlvpInfo.dlvpNm,
          encAdrsNm: this.mfOMfOrdDlvpInfo.encAdrsNm,
          adrsZipcd: this.mfOMfOrdDlvpInfo.adrsZipcd,
          encAdrsBaseAddr: this.mfOMfOrdDlvpInfo.encAdrsBaseAddr,
          encAdrsDtlAddr: this.mfOMfOrdDlvpInfo.encAdrsDtlAddr,
          encAdrsStnmBaseAddr: this.mfOMfOrdDlvpInfo.encAdrsStnmBaseAddr,
          encAdrsStnmDtlAddr: this.mfOMfOrdDlvpInfo.encAdrsStnmDtlAddr,
          encAdrsTelNo: this.mfOMfOrdDlvpInfo.encAdrsTelNo,
          adrsTelRlfNo: this.mfOMfOrdDlvpInfo.adrsTelRlfNo,
        };
        const result = await ApiUtils.put(
          '/fo/cs/mf/order-dlvp-modification',
          mfOrdDlvpInfoInputDto
        );
        if (result.data.success) {
          await this.$gsdialog.alert('배송지가 변경되었습니다.', {
            header: '',
          });
          // 이전페이지
          this.$router.push('/cs/orddeliv/ord_deliv_list');
        } else {
          this.$gsdialog.alert('오류가 발생했습니다.', { header: '' });
        }
      }
    },
    // 공통코드 조회
    async commCdSearch(commGrpCd) {
      const params = {
        commGrpCd: commGrpCd,
      };
      const result = await ApiUtils.get(
        '/fo/cm/commcdmgnt/common-codes',
        params
      );
      return result.data.data;
    },
    async init() {
      this.commGrpCdOd0033List = await this.commCdSearch('OD0101');
      this.commGrpCdOd0034List = await this.commCdSearch('OD0102');
    },
  },
  created() {
    this.siteClass = CookieUtils.getSiteClass();
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.retrievelistDeliveryInfoList();
    });
  },
};
</script>
<style lang="scss">
</style>
