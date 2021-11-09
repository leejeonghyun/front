<template>
  <div class="change-address-wrap">
    <div class="tbl-area sub-inner-box">
      <div class="tbl-top">
        <span class="inp-chk small">
          <input type="checkbox" name id="member-default" value @click="getMbrInfo();" />
          <label for="member-default">회원정보와 동일</label>
        </span>
      </div>
      <!-- 수정 START: 2020.02.17 설계, 디자인 변경으로 인한 전체 마크업 변경 -->
      <h2 class="hidden">배송지 추가 입력 폼</h2>
      <dl class="form-layout-address">
        <dt class="hidden">
          <label for="name">받는분</label>
        </dt>
        <dd>
          <input
            type="text"
            id="name"
            class="inp-txt h40 w100"
            placeholder="받는분"
            v-model="adrsNm"
            value
            maxlength="10"
          />
        </dd>
        <dt class="hidden">
          <label for="nick">주소별칭</label>
        </dt>
        <dd>
          <input
            type="text"
            id="nick"
            class="inp-txt h40 w100"
            placeholder="주소별칭(10자 이내)"
            v-model="dlvpNm"
            value
            maxlength="10"
          />
        </dd>
        <dt class="hidden">
          <label for="mobile">휴대전화</label>
        </dt>
        <dd class="tel">
          <span class="wrap-select">
            <select
              id="mobile01"
              class="w-small h40"
              title="휴대폰 번호 앞자리"
              v-model="moblTelNo01"
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
            name="mobile02"
            class="inp-txt h40"
            v-model="moblTelNo"
            maxlength="8"
            value
            placeholder="휴대전화"
            title="휴대폰 번호 뒷자리"
            @keydown="mobileNumChkDownMobl"
            @keyup="mobileNumChkUpMobl"
          />
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
              v-model="telNo01"
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
            v-model="telNo"
            maxlength="8"
            value
            placeholder="전화번호"
            title="전화번호 뒷자리"
            @keydown="mobileNumChkDownTel"
            @keyup="mobileNumChkUpTel"
          />
        </dd>
        <dt class="hidden">
          <label for="address">배송지</label>
        </dt>
        <dd class="address-code">
          <input
            type="text"
            class="inp-txt h40"
            id="address"
            v-model="queryString"
            placeholder="주소를 입력해주세요. ex)판교역로 235"
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
        <dt class="none-hidden" v-if="notice == true">도로명</dt>
        <dd>{{ roadInfo }}</dd>
        <dt class="none-hidden" v-if="notice == true">지번</dt>
        <dd>{{ jibunInfo }}</dd>
        <dt class="none-hidden" v-if="notice == true">
          <!-- v-if="notice == true"> -->
          주문매장
        </dt>
        <dd v-if="stores.length > 0 && notice == true">
          <span
            v-for="store in stores"
            v-bind:key="store.commCode"
            v-bind:store="store"
          >{{store.commNm}}({{store.storeNm}})</span>
        </dd>
        <dd v-if="stores.length == 0 && notice == true">
          배송가능한 매장이 존재하지 않습니다.
          <br />배송가능한 주소로 검색해 주세요.
        </dd>
      </dl>
      <!-- 수정 END : 2020.02.17 설계, 디자인 변경으로 인한 전체 마크업 변경 -->
      <!-- 새벽배송 START : 2020.03.20 새벽배송 가능 지역 안내 추가
      <dl class="area-delivery-inform"   v-if="notice == false">
        <dt>새벽 배송 가능지역 안내</dt>
        <dd>서울 전지역</dd>
        <dd><em>경기 : </em><span>부천시, 광명시, 시흥시(은행/대야/신천), 분당구,<br />위례지구(위례신도시), 고양시{{deliveryAreaInfo}}</span></dd>
      </dl>
      -->
      <dl class="area-delivery-inform" v-if="notice == false">
        <dt>새벽 배송 가능지역 안내</dt>
        <span v-html="deliveryAreaInfo"></span>
      </dl>
      <dl class="area-delivery-inform" v-if="mfDeliveryInfo">
        <dt>더반찬 새벽 배송 가능지역 안내</dt>
        <dd>서울, 경기, 인천(계양구, 부평구, 남동구, 연수구, 남구, 중구, 동구, 서구)</dd>
      </dl>
      <!-- 새벽배송 END : 2020.03.20 새벽배송 가능 지역 안내 추가 -->
      <div class="agreement-area">
        <span class="inp-chk small">
          <!-- 4월수정 START : 체크박스 속성값 추가(chcked) -->
          <input type="checkbox" name="agree-default" id="agree-default" checked @click="baseYn();" />
          <!-- 4월수정 END : 체크박스 속성값 추가(chcked) -->
          <label for="agree-default">기본 배송지로 설정하기</label>
        </span>
      </div>
    </div>
    <!-- START : 하단 버튼 -->
    <div class="bottom-fixed-btn-area wrap-btn">
      <button type="button" class="btn-lg btn-bg lightgreen" @click="dlvpReg">
        <span>등록</span>
      </button>
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
    <!-- END : 하단 버튼 -->
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import Config from '@/common/Config.js';
import JwtUtils from '@/common/JwtUtils';
import CookieUtils from '@/common/CookieUtils';
// 지도
import PopupFindAddress from '@/views/ss/address/PopupFindAddress.vue';
export default {
  name: 'ChangeNewAddress',
  data() {
    return {
      popup: {
        open: false,
        popupFindAddress: false,
      },
      popupAddrChange: false,
      mbrDlvpSeqno: '',
      baseDlvpYn: true,
      dlvpNm: '',
      zipcd: '',
      stnmAddr: '',
      addrDtl: '',
      lotnoAddr: '',
      adrsNm: '',
      moblTelNo: '',
      telNo: '',
      moblTelNo01: '',
      telNo01: '',
      CU0005S: [],
      CU0006S: [],
      stores: [],
      notice: false,
      deliveryAreaInfo: '',
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
      deliverResultYn: false,
      mfDeliveryInfo: CookieUtils.getCmmSteId() === '3' ? true : false, // 마켓포 더반차 안내 문구 여부
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '배송지 추가 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '새 배송지 추가',
      },
    ],
  },
  props: ['type', 'isPopup', 'paramAddr'],
  mixins: [LayerPopupMixin],
  components: {
    PopupFindAddress,
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
      //  this.addressInfo.centerCode = rtn['center']['code'];
      //  this.addressInfo.centerName = rtn['center']['name'];
      //  console.log(JSON.stringify(rtn));

      const StoreListInputDto = {
        /* mallId: CookieUtils.getCookie('MALL_ID'), */
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
      // console.log(JSON.stringify(result.data.data));
      this.stores = result.data.data;
      if (this.stores.length > 0) {
        this.notice = true;
      } else {
        this.notice = false;
      }
    },
    baseYn: function() {
      if (this.deliverResultYn) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      this.baseDlvpYn = document.getElementById('agree-default').checked;
    },
    dlvpReg: async function() {
      const success = this.isValidation();
      if (success) {
        const DlvpRegInputDto = {
          baseDlvpYn: this.baseDlvpYn,
          dlvpNm: this.dlvpNm,
          zipcd: this.addressInfo.zonecode,
          lotnoAddr: this.addressInfo.jibun,
          stnmAddr: this.addressInfo.road,
          dtlAddr: this.addressInfo.detail,
          adrsNm: this.adrsNm,
          moblTelNo: this.moblTelNo01 + this.moblTelNo,
          telNo:
            (StringUtils.isEmpty(this.telNo01) ? '' : this.telNo01) +
            (StringUtils.isEmpty(this.telNo) ? '' : this.telNo),
          useYn: 'Y',
        };
        console.log(JSON.stringify(DlvpRegInputDto));
        const result = await ApiUtils.post(
          '/fo/cu/mypgmgnt/deliveryplace',
          DlvpRegInputDto
        );
        console.log(JSON.stringify(result));
        if (result.data.success) {
          if (this.baseDlvpYn) {
            await this.$gsdialog.alert(
              '등록하신 주소가 기본배송지로 설정되었습니다.',
              { header: '' }
            );

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
            }
            JwtUtils.saveEncVal(result.data.data.encVal);
            console.log(JSON.stringify(result.data.data));
          } else {
            await this.$gsdialog.alert('주소가 등록되었습니다.', {
              header: '',
            });
          }

          this.$emit('endEvent', result.data.data.mbrDlvpSeqno);
        } else {
          await this.$gsdialog.alert('오류가 발생했습니다.', { header: '' });
        }
      }
    },
    isValidation: function() {
      let success = true;
      const reg = /^\d{0,9}$/; // /\bp\d{12}\b/i;
      if (StringUtils.isEmpty(StringUtils.trim(this.adrsNm))) {
        this.$gsdialog.alert('받는 분 이름을 입력해 주세요.', { header: '' });
        success = false;
        return success;
      } else if (StringUtils.isEmpty(StringUtils.trim(this.dlvpNm))) {
        this.$gsdialog.alert('주소별칭을 입력해주세요.', { header: '' });
        success = false;
        return success;
      } else if (StringUtils.trim(this.dlvpNm).length > 10) {
        this.$gsdialog.alert('주소별칭의 글자수가 10자를 초과하였습니다.', {
          header: '',
        });
        success = false;
        return success;
      } else if (StringUtils.isEmpty(StringUtils.trim(this.moblTelNo))) {
        this.$gsdialog.alert('휴대폰번호를 확인해 주세요.', { header: '' });
        success = false;
        return success;
      } else if (StringUtils.trim(this.moblTelNo).length < 7) {
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
      } else if (!reg.test(StringUtils.trim(this.moblTelNo))) {
        document.getElementById('mobile02').focus();
        this.$gsdialog.alert('휴대폰번호는 숫자만 입력 가능합니다.', {
          header: '',
        });
        success = false;
        return success;
      } else if (!StringUtils.isEmpty(StringUtils.trim(this.telNo))) {
        if (!reg.test(StringUtils.trim(this.telNo))) {
          this.$gsdialog.alert('전화번호는 숫자만 입력 가능합니다.', {
            header: '',
          });
          success = false;
          return success;
        } else if (StringUtils.isEmpty(this.telNo01)) {
          this.$gsdialog.alert('앞자리 전화번호를 선택해 주세요.', {
            header: '',
          });
          success = false;
          return success;
        } else if (!StringUtils.isEmpty(this.telNo01)) {
          if (
            this.telNo01 == '010' ||
            this.telNo01 == '011' ||
            this.telNo01 == '016' ||
            this.telNo01 == '018' ||
            this.telNo01 == '019'
          ) {
            if (StringUtils.trim(this.telNo).length < 7) {
              this.$gsdialog.alert(
                '전화번호는 7자 이상 8자 이하로 입력해주세요.'
              );
              success = false;
              return success;
            }
          }
        }
      } else if (
        StringUtils.isEmpty(StringUtils.trim(this.addressInfo.detailAddress))
      ) {
        // this.$gsdialog.alert("상세 주소를 입력해 주세요.");
        // success = false;
      }
      if (this.stores.length == 0) {
        this.$gsdialog.alert(
          '배송가능한 매장이 존재하지 않습니다.<br>배송가능한 주소로 다시 검색해 주세요.',
          { html: true }
        );
        success = false;
        return success;
      }
      return success;
    },
    getMbrInfo: async function() {
      if (document.getElementById('member-default').checked) {
        const resultMemInfo = await ApiUtils.get(
          '/fo/cu/mbrmgnt/member-information',
          null
        );
        console.log(resultMemInfo.data.data);
        this.adrsNm = resultMemInfo.data.data.custNm;
        this.moblTelNo01 = resultMemInfo.data.data.moblTelNo1;
        this.moblTelNo = resultMemInfo.data.data.moblTelNo2;
        this.telNo01 = StringUtils.isEmpty(resultMemInfo.data.data.homeTelNo1)
          ? ''
          : resultMemInfo.data.data.homeTelNo1;
        this.telNo = StringUtils.isEmpty(resultMemInfo.data.data.homeTelNo2)
          ? ''
          : resultMemInfo.data.data.homeTelNo2;
        // this.telNo01 = resultMemInfo.data.data.homeTelNo1;
        // this.telNo = resultMemInfo.data.data.homeTelNo2;
        this.addressInfo.zonecode = ''; // resultMemInfo.data.data.homeZipcd;
        this.addressInfo.jibun = ''; // resultMemInfo.data.data.homeLotnoAddr;
        this.addressInfo.road = ''; // resultMemInfo.data.data.homeStnmAddr;
        this.addressInfo.detail = ''; // StringUtils.isEmpty(resultMemInfo.data.data.homeLotAddr2) ? resultMemInfo.data.data.homeRoadAddr1 : resultMemInfo.data.data.homeLotAddr2;
      } else {
        this.adrsNm = '';
        this.moblTelNo1 = '';
        this.moblTelNo = '';
        this.telNo1 = '';
        this.telNo = '';
        this.addressInfo.zonecode = '';
        this.addressInfo.jibun = '';
        this.addressInfo.road = '';
        this.addressInfo.detail = '';
      }
    },
    getCookieMap() {
      const custGrdCdYn = CookieUtils.getCookie('CUST_GRD_CD') != '';
      return {
        storId: CookieUtils.getCookie('STOR_ID'),
        supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
        mallId: CookieUtils.getCookie('MALL_ID'),
        dspScrSpCd: CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD'),
        custGrdCd: CookieUtils.getCookie('CUST_GRD_CD'),
      };
    },
    // 새벽배송 가능 지역 조회(코너)
    getDeliveryAreaInfo: async function() {
      const cookie = this.getCookieMap();
      const params = {
        dspConrId: this.$store.state.dp.conrBreakDelivery,
        cmmSteId: '1',
        mallId: '1',
        dspScrSpCd: '02',
        storId: cookie.storId,
      };
      try {
        const result = await ApiUtils.get(
          '/dp/fr/displaymgnt/display-comm-banner-info',
          params
        );
        if (
          result.data.data != null &&
          result.data.data.rdspCommConrInfo != null &&
          result.data.data.rdspCommConrInfo[0] != null &&
          result.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0]
            .rdspCommConrSbjInfo[0].rdspCommConrCntInfo[0] != null
        ) {
          this.deliveryAreaInfo =
            result.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0].rdspCommConrCntInfo[0].dspCnts;
          console.log('  this.deliveryAreaInfo  ' + this.deliveryAreaInfo);
        }
      } catch (e) {
        console.error('새벽배송 가능 지역 조회(코너)[getDeliveryAreaInfo]', e);
      }
    },
    chgNumTel(e) {
      this.telNo = document.getElementById('tel02').value;
    },
    chgNumMob(e) {
      this.moblTelNo = document.getElementById('mobile02').value;
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
        this.telNo = e.target.value;
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
        this.moblTelNo = e.target.value;
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
          this.moblTelNo = e.target.value;
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
          this.telNo = e.target.value;
        }
      }
    },
  },
  destroyed() {},
  mounted: async function() {
    this.queryString = this.paramAddr;
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
    this.moblTelNo01 = '010';

    this.getDeliveryAreaInfo();

    // 배송지 목록 리스트
    const deliverResult = await ApiUtils.get(
      '/fo/cu/mypgmgnt/deliveryplace',
      null
    );
    this.deliverResultYn = deliverResult.data.data.length == 0 ? true : false;
    // const CorerInput = {
    //        dspConrId: '123', // TODO 변경
    //        cmmSteId: '1', // TODO 변경
    //        mallId: '1', // TODO 변경
    //        dspCtgId: 'N1003004' // TODO 변경
    //  };
    // const cornerTxt = await ApiUtils.get('/dp/fr/displaymgnt/display-comm-banner-info', CorerInput);
    // this.CU0006S = CU0006.data.data;
    // console.log(JSON.stringify(cornerTxt));
    // https://apidev.gsecretail.com/dp/fr/displaymgnt/display-comm-banner-info?dspConrId=123&cmmSteId=1&mallId=1&dspCtgId=N1003004
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
