<!--
views/ss/SC-FO-SS-GF-MS-802
-->
<template>
  <div class="wrap-mypage bottom-sticky" v-bind:class="[siteClass]">
    <!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="배송지 수정" :tabbar="false" />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="change-address-wrap">
        <div class="tbl-area sub-inner-box">
          <div class="tbl-top">
            <span class="inp-chk small">
              <input type="checkbox" name id="member-default" value @click="getMbrInfo();" />
              <label for="member-default">회원정보와 동일</label>
            </span>
          </div>
          <!-- 수정 START : 2020.02.17 설계, 디자인 변경으로 인한 전체 마크업 변경 -->
          <h2 class="hidden">배송지 추가 입력 폼</h2>
          <dl class="form-layout-address">
            <dt class="hidden">
              <label for="name">받는분</label>
            </dt>
            <dd class="inp-box error">
              <input
                type="text"
                id="name"
                class="inp-txt h40 w100"
                placeholder="받는분"
                value
                v-model="form.adrsNm"
                maxlength="10"
              />
              <span class="txt-error">{{form.adrsNm != '' ? '' : '받는 분 이름을 입력해 주세요.'}}</span>
            </dd>
            <dt class="hidden">
              <label for="nick">주소별칭</label>
            </dt>
            <dd class="inp-box error">
              <input
                type="text"
                id="nick"
                class="inp-txt h40 w100"
                placeholder="주소별칭(10자 이내)"
                value
                v-model="form.dlvpNm"
                maxlength="10"
              />
              <span class="txt-error">{{form.dlvpNm != '' ? '' : '주소별칭을 입력해주세요.'}}</span>
            </dd>
            <dt class="hidden">
              <label for="mobile">휴대전화</label>
            </dt>
            <dd class="tel inp-box error">
              <span class="wrap-select">
                <select
                  id="mobile01"
                  class="w-small h40"
                  title="휴대폰 번호 앞자리"
                  v-model="form.moblTelNo01"
                  @click="chgNumMob"
                >
                  <option
                    v-for="CU0005 in CU0005S"
                    v-bind:key="CU0005.commCd"
                    v-bind:CU0005="CU0005"
                    v-bind:value="CU0005.commCd"
                  >{{CU0005.commCd}}</option>
                </select>
              </span>
              <input
                type="tel"
                id="mobile02"
                class="inp-txt h40"
                value
                maxlength="8"
                placeholder="휴대전화"
                title="휴대폰 번호 뒷자리"
                v-model="form.moblTelNo"
                @keydown="mobileNumChkDownMobl"
                @keyup="mobileNumChkUpMobl"
              />
              <span class="txt-error">{{ mobileMsg }}</span>
            </dd>
            <dt class="hidden">
              <label for="tel">전화번호</label>
            </dt>
            <dd class="tel">
              <span class="wrap-select">
                <select
                  id="tel01"
                  class="w-small h40"
                  title="전화번호 앞자리"
                  v-model="form.telNo01"
                  @click="chgNumTel"
                >
                  <option value disabled>선택</option>
                  <option
                    v-for="CU0006 in CU0006S"
                    v-bind:key="CU0006.commCd"
                    v-bind:CU0006="CU0006"
                    v-bind:value="CU0006.commCd"
                  >{{CU0006.commCd}}</option>
                </select>
              </span>
              <input
                type="tel"
                id="tel02"
                class="inp-txt h40"
                value="2224567"
                maxlength="8"
                placeholder="전화번호"
                title="전화번호 뒷자리"
                v-model="form.telNo"
                @keydown="mobileNumChkDownTel"
                @keyup="mobileNumChkUpTel"
              />
            </dd>
            <dt class="hidden">
              <label for="address">배송지</label>
            </dt>
            <dd class="address-code">
              <input
                type="number"
                class="inp-txt h40"
                id="address"
                title="우편번호"
                readonly="readonly"
              />
              <button
                type="button"
                id="searchAddr"
                class="btn-border btn-bg"
                @click="popupAction('popupFindAddress', 'A')"
              >주소검색</button>
            </dd>
            <dd>
              <button
                type="button"
                id="searchAddr"
                class="btn-border btn-bg ico-addr"
                @click="popupAction('popupFindAddress', 'G')"
              >
                <span>현 위치로 주소 검색</span>
              </button>
            </dd>
            <dt class="none-hidden">도로명</dt>
            <dd>{{ roadInfo }}</dd>
            <dt class="none-hidden">지번</dt>
            <dd>{{ jibunInfo }}</dd>
            <dt class="none-hidden">주문매장</dt>
            <!-- 새벽배송 START : 2020.03.20 주문매장 분기 -->
            <!-- <dd>
              주소 입력 시 설정됩니다.
            </dd>-->
            <!-- 5월 수정 START : 배송유형 삭제/ 배송지점 3건까지 노출 -->
            <dd v-if="stores.length > 0">
              <span
                v-for="store in stores"
                v-bind:key="store.commCode"
                v-bind:store="store"
              >{{store.commNm}}({{store.storeNm}})</span>
            </dd>
            <dd v-else>
              배송가능한 매장이 존재하지 않습니다.
              <br />배송가능한 주소로 검색해 주세요.
            </dd>
            <!-- 5월 수정 END : 배송유형 삭제/ 배송지점 3건까지 노출 -->
            <!-- 새벽배송 END : 2020.03.20 주문매장 분기 -->
          </dl>
          <!-- 수정 END : 2020.02.17 설계, 디자인 변경으로 인한 전체 마크업 변경 -->
          <div class="agreement-area">
            <span class="inp-chk small">
              <input
                type="checkbox"
                name
                id="agree-default"
                :disabled="(this.form.baseDlvpYn == 'Y')? true : false"
              />
              <label for="agree-default">기본 배송지로 설정하기</label>
            </span>
          </div>
        </div>
        <PopupFindAddress
          v-if="popup.popupFindAddress"
          :slideMargin="22"
          :slideShow="4.5"
          :paramFindType="findType"
          :paramQueryString="queryString"
          :paramX="gps.x"
          :paramY="gps.y"
          @popupEvent="popupAction"
          @callbackAddress="callbackAddress"
        />
        <!-- START : 하단 버튼 -->
        <div class="bottom-fixed-btn-area wrap-btn">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="dlvpUpdate">
            <span>등록</span>
          </button>
        </div>
        <!-- END : 하단 버튼 -->
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import JwtUtils from '@/common/JwtUtils';
import CookieUtils from '@/common/CookieUtils';
// 지도
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import PopupFindAddress from '@/views/ss/address/PopupFindAddress.vue';
import Config from '@/common/Config.js';

export default {
  name: 'ChangeAddress',
  data() {
    return {
      popup: {
        popupFindAddress: false,
      },
      form: {
        baseDlvpYn: '',
        dlvpNm: '',
        zipcd: '',
        lotnoAddr: '',
        stnmAddr: '',
        adrsNm: '',
        moblTelNo: '',
        telNo: '',
        moblTelNo01: '',
        telNo01: '',
        itemDlvrMethoCd: '',
        itemDlvrMethoAddCd: '',
        itemDlvrMethoDtlCnts: '',
        delivInfmTmznCd: '',
        delivMsgCnts: '',
      },
      CU0005S: [],
      CU0006S: [],
      stores: [],
      popupAddrChange: false,
      checkedYn: 'N',
      mobileMsg: '',
      // 주소검색
      addressInfo: {
        jibun: '',
        road: '',
        zonecode: '',
        detail: '',
        centerName: '',
        centerCode: '',
        detailAddress: '',
      },
      address: {},
      queryString:
        Config.address.home
          .road /* 기본 주소값 검색 시 props 전달 하세요. <PopupFindAddress :paramQueryString="queryString" */,
      gps: {
        x: Config.address.home.gps.x,
        y: Config.address.home.gps.y,
      },
      findType: 'A',
      siteClass: '',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '배송지 수정 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '배송지 수정',
      },
    ],
  },
  props: ['type'],
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader,
    PopupFindAddress,
    Footer,
  },
  methods: {
    popupAction(type, findType) {
      this.popup[`${type}`] = !this.popup[`${type}`];

      if (findType) {
        this.findType = findType;
      }
      if (`${type}` == 'popupFindAddress') {
        // this.popup['popupSearchAddressPost'] = !this.popup[`${type}`];
      } else if (`${type}` == 'popupFindAddress') {
        // this.popup['popupSearchAddressMap'] = !this.popup[`${type}`];
      }
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false);
    },
    callbackAddress: async function(rtn) {
      // 모달 숨김
      this.popup['popupFindAddress'] = false;
      this.addressInfo.zonecode = rtn['zonecode'];
      this.addressInfo.detail = rtn['detailAddress'];
      this.addressInfo.jibun = rtn['jibunAddress'];
      this.addressInfo.road = rtn['roadAddress'];
      this.addressInfo.detailAddress = rtn['detailAddress'];
      // this.addressInfo.centerCode = rtn['center']['code'];
      // this.addressInfo.centerName = rtn['center']['name'];
      const StoreListInputDto = {
        /* mallId: CookieUtils.getMallId(), */
        mallId:
          CookieUtils.getCmmSteId() === '3'
            ? ''
            : CookieUtils.getCookie('MALL_ID'),
        zipCode: this.addressInfo.zonecode,
      };
      const result = await ApiUtils.get(
        '/fo/cu/mypgmgnt/store-list',
        StoreListInputDto
      );
      console.log(JSON.stringify(result.data.data));
      this.stores = result.data.data;
      console.log(JSON.stringify(rtn));
    },
    dlvpUpdate: async function() {
      const success = this.isValidation();
      if (success) {
        if (document.getElementById('agree-default').checked) {
          this.form.baseDlvpYn = 'Y';
        } else {
          this.form.baseDlvpYn = 'N';
        }
        const DlvpModInputDto = {
          mbrDlvpSeqno: this.$route.params.id,
          baseDlvpYn: this.form.baseDlvpYn,
          dlvpNm: this.form.dlvpNm,
          zipcd: this.addressInfo.zonecode,
          lotnoAddr: this.addressInfo.jibun,
          stnmAddr: this.addressInfo.road,
          dtlAddr: this.addressInfo.detail,
          adrsNm: this.form.adrsNm,
          moblTelNo: this.form.moblTelNo01 + this.form.moblTelNo,
          telNo:
            (StringUtils.isEmpty(this.form.telNo01) ? '' : this.form.telNo01) +
            (StringUtils.isEmpty(this.form.telNo) ? '' : this.form.telNo),
          useYn: 'Y',
          itemDlvrMethoCd: this.form.itemDlvrMethoCd,
          itemDlvrMethoAddCd: this.form.itemDlvrMethoAddCd,
          itemDlvrMethoDtlCnts: this.form.itemDlvrMethoDtlCnts,
          delivInfmTmznCd: this.form.delivInfmTmznCd,
          delivMsgCnts: this.form.delivMsgCnts,
        };
        // console.log(JSON.stringify(DlvpModInputDto));

        const resultDlv = await ApiUtils.put(
          '/fo/cu/mypgmgnt/deliveryplace',
          DlvpModInputDto
        );

        if (resultDlv.data.success) {
          // 기본배송지로 변경되면 envVal set
          if (this.form.baseDlvpYn == 'Y') {
            // envVal set
            JwtUtils.saveEncVal(resultDlv.data.data.encVal);
            console.log(JSON.stringify(resultDlv.data.data));

            if (document.getElementById('agree-default').checked) {
              if (CookieUtils.isDaybreak()) {
                const dayBreakStorId =
                  resultDlv.data.data.daybreakStorId == ''
                    ? '2287'
                    : resultDlv.data.data.daybreakStorId;
                const dayBreakSf =
                  resultDlv.data.data.daybreakSupplFirmCd == ''
                    ? '31005'
                    : resultDlv.data.data.daybreakSupplFirmCd;
                CookieUtils.setCookie(
                  'ORG_STOR_ID',
                  resultDlv.data.data.storId
                );
                CookieUtils.setCookie(
                  'ORG_SUPPL_FIRM_CD',
                  resultDlv.data.data.supplFirmCd
                );
                CookieUtils.setCookie('STOR_ID', dayBreakStorId);
                CookieUtils.setCookie('SUPPL_FIRM_CD', dayBreakSf);
              } else {
                CookieUtils.setCookie('STOR_ID', resultDlv.data.data.storId);
                CookieUtils.setCookie(
                  'SUPPL_FIRM_CD',
                  resultDlv.data.data.supplFirmCd
                );
                CookieUtils.setCookie(
                  'DAYBREAK_STOR_ID',
                  resultDlv.data.data.daybreakStorId
                );
                CookieUtils.setCookie(
                  'DAYBREAK_SUPPL_FIRM_CD',
                  resultDlv.data.data.daybreakSupplFirmCd
                );
              }
            }
          }
          this.$router.push('/cu/delivery_place_list');
        } else {
          this.$gsdialog.alert('오류가 발생했습니다.', { header: '' });
        }
      }
    },
    mbrInfo: async function() {
      if (document.getElementById('member-default').checked) {
        const resultDlv = await ApiUtils.get(
          '/fo/cu/mbrmgnt/member-information',
          null
        );
        console.log(resultDlv.data.data);
      } else {
        console.log('체크해제하면 원상복구');
      }
    },
    isValidation: function() {
      let success = true;
      const reg = /^\d{0,9}$/; // /\bp\d{12}\b/i;
      if (StringUtils.isEmpty(StringUtils.trim(this.form.adrsNm))) {
        this.$gsdialog.alert('받는 분 이름을 입력해 주세요.', { header: '' });
        success = false;
        return success;
      } else if (StringUtils.isEmpty(StringUtils.trim(this.form.dlvpNm))) {
        this.$gsdialog.alert('주소별칭을 입력해주세요.', { header: '' });
        success = false;
        return success;
      } else if (StringUtils.trim(this.form.dlvpNm).length > 10) {
        this.$gsdialog.alert('주소별칭의 글자수가 10자를 초과하였습니다.', {
          header: '',
        });
        success = false;
        return success;
      } else if (StringUtils.isEmpty(StringUtils.trim(this.form.moblTelNo))) {
        this.$gsdialog.alert('휴대폰번호를 확인해 주세요.', { header: '' });
        success = false;
        return success;
      } else if (StringUtils.trim(this.form.moblTelNo).length < 7) {
        this.$gsdialog.alert(
          '휴대전화번호는 7자 이상 8자 이하로 입력해주세요.'
        );
        success = false;
        return success;
      } else if (
        StringUtils.isEmpty(StringUtils.trim(this.addressInfo.jibun)) ||
        StringUtils.isEmpty(StringUtils.trim(this.addressInfo.road))
      ) {
        this.$gsdialog.alert('주소를 입력해 주세요.', { header: '' });
        success = false;
        return success;
      } else if (!reg.test(StringUtils.trim(this.form.moblTelNo))) {
        document.getElementById('mobile02').focus();
        this.$gsdialog.alert('휴대폰번호는 숫자만 입력 가능합니다.', {
          header: '',
        });
        success = false;
        return success;
      } else if (!StringUtils.isEmpty(StringUtils.trim(this.form.telNo))) {
        if (!reg.test(StringUtils.trim(this.form.telNo))) {
          this.$gsdialog.alert('전화번호는 숫자만 입력 가능합니다.', {
            header: '',
          });
          success = false;
          return success;
        } else if (StringUtils.isEmpty(this.form.telNo01)) {
          this.$gsdialog.alert('앞자리 전화번호를 선택해 주세요.', {
            header: '',
          });
          success = false;
          return success;
        } else if (!StringUtils.isEmpty(this.form.telNo01)) {
          if (
            this.form.telNo01 == '010' ||
            this.form.telNo01 == '011' ||
            this.form.telNo01 == '016' ||
            this.form.telNo01 == '018' ||
            this.form.telNo01 == '019'
          ) {
            if (StringUtils.trim(this.form.telNo).length < 7) {
              this.$gsdialog.alert(
                '전화번호는 7자 이상 8자 이하로 입력해주세요.'
              );
              success = false;
              return success;
            }
          }
        }
      }
      if (this.stores.length == 0) {
        this.$gsdialog.alert(
          '배송가능한 매장이 존재하지 않습니다.<br>배송가능한 주소로 검색해 주세요.',
          { html: true }
        );
        success = false;
        return success;
      }
      return success;
    },
    mobileNumChkUpTel(e) {
      // let strVal = document.getElementById('tel02').value;
      const engExp = /[A-Za-z]/g;
      const koreanExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      const spcExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      const reg = /^\d{0,9}$/;
      if (!reg.test(e.key)) {
        e.target.value = e.target.value.replace(koreanExp, '');
        e.target.value = e.target.value.replace(engExp, '');
        e.target.value = e.target.value.replace(spcExp, '');
        this.form.telNo = e.target.value;
      }
    },
    mobileNumChkUpMobl(e) {
      const engExp = /[A-Za-z]/g;
      const koreanExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      const spcExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      const reg = /^\d{0,9}$/;
      if (!reg.test(e.key)) {
        e.target.value = e.target.value.replace(koreanExp, '');
        e.target.value = e.target.value.replace(engExp, '');
        e.target.value = e.target.value.replace(spcExp, '');
        this.form.moblTelNo = e.target.value;
      }
    },
    mobileNumChkDownMobl(e) {
      const whiteList = ['ArrowLeft', 'ArrowRight', 'Backspace'];
      // if (!whiteList.some(code => e.code === code)) return;
      if (e.code === 'Backspace') {
        // this.deleteSelectedSymbol();
        return;
      } else if (e.code === 'Tab') {
        const engExp = /[A-Za-z]/g;
        const koreanExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
        const spcExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        const reg = /^\d{0,9}$/;
        if (!reg.test(e.key)) {
          e.target.value = e.target.value.replace(koreanExp, '');
          e.target.value = e.target.value.replace(engExp, '');
          e.target.value = e.target.value.replace(spcExp, '');
          this.form.moblTelNo = e.target.value;
        }
      }
    },
    mobileNumChkDownTel(e) {
      const whiteList = ['ArrowLeft', 'ArrowRight', 'Backspace'];
      // if (!whiteList.some(code => e.code === code)) return;
      if (e.code === 'Backspace') {
        // this.deleteSelectedSymbol();
        return;
      } else if (e.code === 'Tab') {
        const engExp = /[A-Za-z]/g;
        const koreanExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
        const spcExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        const reg = /^\d{0,9}$/;
        if (!reg.test(e.key)) {
          e.target.value = e.target.value.replace(koreanExp, '');
          e.target.value = e.target.value.replace(engExp, '');
          e.target.value = e.target.value.replace(spcExp, '');
          this.form.telNo = e.target.value;
        }
      }
    },
    chgNumTel(e) {
      this.form.telNo = document.getElementById('tel02').value;
    },
    chgNumMob(e) {
      this.form.moblTelNo = document.getElementById('mobile02').value;
    },
    getMbrInfo: async function() {
      if (document.getElementById('member-default').checked) {
        const resultMemInfo = await ApiUtils.get(
          '/fo/cu/mbrmgnt/member-information',
          null
        );
        // console.log(JSON.stringify(resultMemInfo.data.data));
        this.form.adrsNm = resultMemInfo.data.data.custNm;
        this.form.moblTelNo01 = resultMemInfo.data.data.moblTelNo1;
        this.form.moblTelNo = resultMemInfo.data.data.moblTelNo2;
        this.form.telNo01 = StringUtils.isEmpty(
          resultMemInfo.data.data.homeTelNo1
        )
          ? ''
          : resultMemInfo.data.data.homeTelNo1;
        this.form.telNo = StringUtils.isEmpty(
          resultMemInfo.data.data.homeTelNo2
        )
          ? ''
          : resultMemInfo.data.data.homeTelNo2;
        // this.form.telNo01 = resultMemInfo.data.data.homeTelNo1;
        // this.form.telNo = resultMemInfo.data.data.homeTelNo2;
        this.addressInfo.zonecode = ''; // resultMemInfo.data.data.homeZipcd;
        this.addressInfo.jibun = ''; // resultMemInfo.data.data.homeLotnoAddr;
        this.addressInfo.road = ''; // resultMemInfo.data.data.homeStnmAddr ;
        this.addressInfo.detail = ''; // StringUtils.isEmpty(resultMemInfo.data.data.homeLotAddr2) ? resultMemInfo.data.data.homeRoadAddr1 : resultMemInfo.data.data.homeLotAddr2;
      } else {
        const DlvpModInputDto = {
          mbrDlvpSeqno: this.$route.params.id,
        };
        const result = await ApiUtils.get(
          '/fo/cu/mypgmgnt/deliveryplace',
          DlvpModInputDto
        );
        this.form = result.data.data[0];
        this.form.telNo01 =
          result.data.data[0].telNo01 == null
            ? ''
            : result.data.data[0].telNo01;
        this.addressInfo.zonecode = this.form.zipcd;
        this.addressInfo.jibun = this.form.lotnoAddr;
        this.addressInfo.road = this.form.stnmAddr;
        if (this.form.baseDlvpYn == 'Y') {
          document.getElementById('agree-default').checked = true;
        } else {
          document.getElementById('agree-default').checked = false;
        }
      }
    },
  },
  destroyed() {},
  mounted: async function() {
    this.siteClass = CookieUtils.getSiteClass();
    // 공통코드
    const CU0005Input = {
      commGrpCd: 'CU0005',
    };
    const CU0005 = await ApiUtils.get(
      '/fo/cm/commcdmgnt/common-codes',
      CU0005Input
    );
    this.CU0005S = CU0005.data.data;
    const CU0006Input = {
      commGrpCd: 'CU0006',
    };
    const CU0006 = await ApiUtils.get(
      '/fo/cm/commcdmgnt/common-codes',
      CU0006Input
    );
    this.CU0006S = CU0006.data.data;
    const DlvpModInputDto = {
      mbrDlvpSeqno: this.$route.params.id,
    };
    const result = await ApiUtils.get(
      '/fo/cu/mypgmgnt/deliveryplace',
      DlvpModInputDto
    );
    this.form = result.data.data[0];
    this.form.telNo01 =
      result.data.data[0].telNo01 == null ? '' : result.data.data[0].telNo01;
    this.form.telNo =
      this.form.telNo == null ? '' : this.form.telNo.replace(/[^(0-9)]/gi, '');
    this.addressInfo.zonecode = this.form.zipcd;
    this.addressInfo.jibun = this.form.lotnoAddr;
    this.addressInfo.road = this.form.stnmAddr;
    if (this.form.baseDlvpYn == 'Y') {
      document.getElementById('agree-default').checked = true;
    } else {
      document.getElementById('agree-default').checked = false;
    }
    const StoreListInputDto = {
      mallId: CookieUtils.getMallId(),
      zipCode: this.addressInfo.zonecode,
    };
    const resultCode = await ApiUtils.get(
      '/fo/cu/mypgmgnt/store-list',
      StoreListInputDto
    );
    console.log(JSON.stringify(resultCode.data.data));
    this.stores = resultCode.data.data;
    // this.addressInfo.detail = StringUtils.isEmpty(resultMemInfo.data.data.homeLotAddr2) ? resultMemInfo.data.data.homeRoadAddr1 : resultMemInfo.data.data.homeLotAddr2;,
  },
  computed: {
    jibunInfo() {
      let info = '';
      if (this.addressInfo.zonecode) {
        info += '(' + this.addressInfo.zonecode + ')';
      }
      if (this.addressInfo.jibun) {
        info += ' ' + this.addressInfo.jibun + ' ' + this.addressInfo.detail;
      }
      return info;
    },
    roadInfo() {
      let info = '';
      if (this.addressInfo && this.addressInfo.zonecode) {
        info += '(' + this.addressInfo.zonecode + ')';
      }
      if (this.addressInfo && this.addressInfo.road) {
        info += ' ' + this.addressInfo.road + ' ' + this.addressInfo.detail;
      }
      return info;
    },
    centerInfo() {
      return this.addressInfo.centerName;
    },
  },
};
</script>
