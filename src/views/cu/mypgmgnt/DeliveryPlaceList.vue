<!--
  @view/ss/SC-FO-SS-GF-MS-800
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]">
    <!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="배송지관리" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="delivery-management">
        <!-- <p class="box-notice">
          <strong>홍길동님의 배송지 목록입니다.(최대20개까지 등록가능)</strong>
          자주 이용하시는 배송지를 등록하시면 매장변경이 쉬워집니다.
        </p>-->
        <!-- 수정 START : 2020.02.17 설계, 디자인 변경으로 인한 전체 마크업 변경 -->
        <div class="title">
          <h3 class="hidden">배송지 목록</h3>
          <a class="btn-border btn-small right" @click="dlvpAdd();">새 배송지 추가</a>
        </div>
        <!-- START : 배송지 리스트 -->
        <div class="delivery-list">
          <NoList
            NoListText="등록된 배송지가 없습니다."
            :ListType="'deliveryList'"
            v-if="deliverys.length == 0"
          />
          <ul class="addr-list">
            <li
              v-for="delivery in deliverys"
              v-bind:key="delivery.mbrDlvpSeqno"
              v-bind:delivery="delivery"
            >
              <p class="inp-radio small">
                <span class="name wb-a">
                  <strong>{{ delivery.adrsNm }}</strong>
                  [{{ delivery.dlvpNm }}]
                  <!--  <span class="branch">fresh1호 센터</span> -->
                  <span class="default" v-if="delivery.baseDlvpYn == 'Y'">기본배송지</span>
                </span>
              </p>
              <div class="addr-txt">
                <span class="code">{{ delivery.zipcd }}</span>
                {{ delivery.stnmAddr }}
                <span
                  class="lot-number"
                >지번 : {{ delivery.lotnoAddr}}</span>
                <span
                  class="cell-num"
                >{{ delivery.moblTelNo01}}-{{ delivery.moblTelNo != null ? convertMobileNo(delivery.moblTelNo) : delivery.moblTelNo}}</span>
                <div class="bottom-area">
                  <button
                    class="btn-border btn-tiny"
                    v-if="delivery.baseDlvpYn != 'Y'"
                    @click="dlvDefaultChg('addr'+delivery.mbrDlvpSeqno);"
                  >기본배송지로 설정</button>
                  <button
                    class="btn-border btn-tiny"
                    @click="dlvpUpdata('addr'+delivery.mbrDlvpSeqno);"
                  >수정</button>
                </div>
              </div>
              <button
                class="btn-del btn-tiny delete"
                @click="dlvpDel('addr'+delivery.mbrDlvpSeqno);"
                v-if="delivery.baseDlvpYn != 'Y'"
              >
                <span class="hidden">삭제</span>
              </button>
              <input
                type="hidden"
                v-bind:id="'addr'+delivery.mbrDlvpSeqno"
                v-bind:value="delivery.mbrDlvpSeqno"
              />
            </li>
          </ul>
        </div>
        <!-- END : 배송지 리스트 -->
        <!-- 수정 END : 2020.02.17 설계, 디자인 변경으로 인한 전체 마크업 변경 -->
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import ApiUtils from '@/common/ApiUtils';
import JwtUtils from '@/common/JwtUtils';
import CookieUtils from '@/common/CookieUtils';
import NoList from '@/components/common/NoList';
export default {
  name: 'DeliveryManagement',
  data() {
    return {
      deliverys: [],
      mbrDlvpSeqno: '',
      siteClass: '',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '배송지관리 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '배송지관리',
      },
    ],
  },
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
    SubDefaultHeader,
    Footer,
    NoList,
  },
  methods: {
    convertMobileNo: function(mobile) {
      let mobileStr = '';
      if (mobile.length > 7) {
        mobileStr = mobile.substr(0, 4) + '-' + mobile.substr(4, 4);
      } else {
        mobileStr = mobile.substr(0, 3) + '-' + mobile.substr(3, 4);
      }
      return mobileStr;
    },
    dlvpAdd: function() {
      // 새배송지 추가
      if (this.deliverys.length < 20) {
        //  const txt = encodeURI('-');
        this.$router.push('/cu/delivery_place_add');
      } else {
        this.$gsdialog.alert('배송지는 20개까지 등록 가능합니다.');
      }
    },
    dlvDefaultChg: async function(rdId) {
      // 기본배송지로 설정
      this.mbrDlvpSeqno = document.getElementById(rdId).value;
      if (this.mbrDlvpSeqno != '') {
        const DlvpInqInputDto = {
          mbrDlvpSeqno: this.mbrDlvpSeqno,
          baseDlvpYn: 'Y',
        };
        const result = await ApiUtils.put(
          '/fo/cu/mypgmgnt/deliveryplacebase',
          DlvpInqInputDto
        );
        // console.log('+++++' + JSON.stringify(result.data));
        if (result.data.success) {
          this.$gsdialog.alert('기본배송지를 변경하였습니다.');

          if (CookieUtils.isDaybreak()) {
            const dayBreakStorId =
              result.data.data.daybreakStorId == ''
                ? '2287'
                : result.data.data.daybreakStorId;
            const dayBreakSf =
              result.data.data.daybreakSupplFirmCd == ''
                ? '31005'
                : result.data.data.daybreakSupplFirmCd;

            CookieUtils.setCookie('ORG_STOR_ID', result.data.data.storId);
            CookieUtils.setCookie(
              'ORG_SUPPL_FIRM_CD',
              result.data.data.supplFirmCd
            );

            CookieUtils.setCookie('STOR_ID', dayBreakStorId);
            CookieUtils.setCookie('SUPPL_FIRM_CD', dayBreakSf);
          } else {
            CookieUtils.setCookie('STOR_ID', result.data.data.storId);
            CookieUtils.setCookie(
              'SUPPL_FIRM_CD',
              result.data.data.supplFirmCd
            );
            CookieUtils.setCookie(
              'DAYBREAK_STOR_ID',
              result.data.data.daybreakStorId
            );
            CookieUtils.setCookie(
              'DAYBREAK_SUPPL_FIRM_CD',
              result.data.data.daybreakSupplFirmCd
            );
            CookieUtils.setCookie(
              'SIMPLE_STOR_ID',
              result.data.data.simpleStorId
            );
            CookieUtils.setCookie(
              'SIMPLE_SUPPL_FIRM_CD',
              result.data.data.simpleSupplFirmCd
            );
          }
          JwtUtils.saveEncVal(result.data.data.encVal);
          console.log(result.data.data);

          const resultList = await ApiUtils.get(
            '/fo/cu/mypgmgnt/deliveryplace',
            null
          );
          this.deliverys = resultList.data.data;
        } else {
          this.$gsdialog.alert('오류가 발생했습니다.');
        }
      } else {
        this.$gsdialog.alert('기본배송지입니다');
      }
    },
    dlvDefault: async function(rdId) {
      // 기본배송지로 설정
      this.mbrDlvpSeqno = document.getElementById(rdId).value;
      if (this.mbrDlvpSeqno != '') {
        const DlvpModInputDto = {
          mbrDlvpSeqno: this.mbrDlvpSeqno,
        };
        const resultDetail = await ApiUtils.get(
          '/fo/cu/mypgmgnt/deliveryplace',
          DlvpModInputDto
        );
        const DlvpInqInputDto = {
          mbrDlvpSeqno: this.mbrDlvpSeqno,
          baseDlvpYn: 'Y',
          dlvpNm: resultDetail.data.data[0].dlvpNm,
          zipcd: resultDetail.data.data[0].zipcd,
          lotnoAddr: resultDetail.data.data[0].lotnoAddr,
          stnmAddr: resultDetail.data.data[0].stnmAddr,
          adrsNm: resultDetail.data.data[0].adrsNm,
          moblTelNo:
            resultDetail.data.data[0].moblTelNo01 +
            resultDetail.data.data[0].moblTelNo,
          telNo:
            resultDetail.data.data[0].telNo01 + resultDetail.data.data[0].telNo,
          useYn: 'Y',
        };
        // alert(JwtUtils.getEncVal()+"++++++111+++++");
        const result = await ApiUtils.put(
          '/fo/cu/mypgmgnt/deliveryplace',
          DlvpInqInputDto
        );
        if (result.data.success) {
          this.$gsdialog.alert('기본배송지를 변경하였습니다.');
          console.log('+++++' + JSON.stringify(result.data.data));
          JwtUtils.saveEncVal(result.data.data.encVal);
          CookieUtils.setCookie('STOR_ID', result.data.data.storId);
          CookieUtils.setCookie('SUPPL_FIRM_CD', result.data.data.supplFirmCd);
          console.log(
            ' result.data.data.supplFirmCd 20 result.data.data.storId 2267  result.data.data.supplFirmCd ' +
              result.data.data.supplFirmCd +
              ' result.data.data.storId ' +
              result.data.data.storId
          );

          const resultList = await ApiUtils.get(
            '/fo/cu/mypgmgnt/deliveryplace',
            null
          );
          this.deliverys = resultList.data.data;
        } else {
          this.$gsdialog.alert('오류가 발생했습니다.');
        }
      } else {
        this.$gsdialog.alert('기본배송지입니다');
      }
    },
    dlvpDel: async function(rdId) {
      // 배송지 삭제하기
      // const confirmed = confirm(' 삭제하시겠습니까?');
      const confirmed = await this.$gsdialog.confirm(' 삭제하시겠습니까?');
      if (confirmed) {
        this.mbrDlvpSeqno = document.getElementById(rdId).value;
        const DlvpModInputDto = {
          mbrDlvpSeqno: this.mbrDlvpSeqno,
        };
        const resultDetail = await ApiUtils.get(
          '/fo/cu/mypgmgnt/deliveryplace',
          DlvpModInputDto
        );
        const DlvpDelInputDto = {
          mbrDlvpSeqno: resultDetail.data.data[0].mbrDlvpSeqno,
          baseDlvpYn: 'N',
          useYn: 'N',
        };
        const result = await ApiUtils.put(
          '/fo/cu/mypgmgnt/deliveryplace-del',
          DlvpDelInputDto
        );
        const DlvpInqInputDto = {
          mbrDlvpSeqno: result.data.mbrDlvpSeqno,
        };
        const resultDlv = await ApiUtils.get(
          '/fo/cu/mypgmgnt/deliveryplace/',
          DlvpInqInputDto
        );
        this.deliverys = resultDlv.data.data;
      }
    },
    dlvpUpdata: function(rdId) {
      // 수정화면으로 이동
      this.mbrDlvpSeqno = document.getElementById(rdId).value;
      this.$router.push('/cu/delivery_place_update/' + this.mbrDlvpSeqno);
    },
  },
  mounted: async function() {
    this.siteClass = CookieUtils.getSiteClass();
    const result = await ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace', null);
    this.deliverys = result.data.data;
    // console.log("++this.deliverys+++"+JSON.stringify(this.deliverys));
  },
};
</script>
<style lang="scss">
</style>
