<!--
views/ss/SC-FO-SS-GF-MS-802
-->
<template>
 <form >
  <div class="wrap-mypage">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="배송지 수정" prevType="true" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="change-address-wrap">
        <div class="tbl-area sub-inner-box">
          <div class="tbl-top">
            <span class="inp-chk small">
              <input type="checkbox" name="" id="member-default" value="" @click="mbrInfo">
              <label for="member-default">회원정보와 동일</label>
            </span>
          </div>
          <table class="tbl-inner">
            <caption>배송지 수정</caption>
            <colgroup>
              <col style="width:70px">
              <col style="width:auto">
            </colgroup>
            <tbody>
            <tr>
              <th scope="row">
                <label for="name">받는분 <span class="required" aria-label="필수 항목">*</span></label>
              </th>
              <td>
                <input type="text" id="name" class="inp-txt w100" value="" placeholder="" v-model="form.adrsNm">
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label for="nick">주소별칭 <span class="required">*</span></label>
              </th>
              <td>
                <input type="text" id="nick" class="inp-txt w100" value="전남 시호네" placeholder="" v-model="form.dlvpNm">
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label for="mobile">휴대전화 <span class="required" aria-label="필수 항목">*</span></label>
              </th>
              <td>
                <p class="tel">
                  <span class="wrap-select">
                    <select id="mobile01" class="w-small" title="휴대폰 번호 앞자리"  v-model="form.moblTelNo01">
                      <option
                      v-for="CU0005 in CU0005S"
                      v-bind:key="CU0005.commCd"
                      v-bind:CU0005="CU0005"
                      v-bind:value="CU0005.commCd">{{CU0005.commCd}}</option>
                    </select>
                  </span>
                  <input type="tel" id="mobile02" class="inp-txt" value="" title="휴대폰 번호 뒷자리" v-model="form.moblTelNo">
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label for="tel">전화번호</label>
              </th>
              <td>
                <p class="tel">
                  <span class="wrap-select">
                  <select id="tel01" class="w-small" title="전화번호 앞자리"  v-model="form.telNo01" >
                    <option value="" disabled>선택</option>
                    <option
                      v-for="CU0006 in CU0006S"
                      v-bind:key="CU0006.commCd"
                      v-bind:CU0006="CU0006"
                      v-bind:value="CU0006.commCd">{{CU0006.commCd}}</option>
                  </select>
                </span>
                <input type="tel" id="tel02" class="inp-txt" v-model="form.telNo" value="" placeholder="‘ - ’ 없이 숫자만 입력" title="전화번호 뒷자리">
                </p>
              </td>
            </tr>
            <tr class="code-area">
              <th scope="row" class="top">
                <label for="address">배송주소 <span class="required" aria-label="필수 항목">*</span><br><span class="small">(도로명주소)</span></label>
              </th>
              <td>
                <p class="address-code">
                  <input type="number" class="inp-txt " id="address" title="우편번호" value="135-062" readonly="readonly" v-model="form.zipcd" >
                  <button type="button" id="searchAddr" class="btn-border btn-bg">주소찾기</button>
                </p>
                <input class="inp-txt w100" id="addr01" type="text" value="전남 목표시 고하대로 10," title="주소 입력1" v-model="form.stnmAddr">
                <input class="inp-txt w100" id="addr02" type="text" value="3층" title="주소 입력2" placeholder="상세 주소를 직접 입력해주세요." v-model="form.addrDtl">
              </td>
            </tr>
            <tr>
              <th scope="row">주문매장</th>
              <td>GS fresh 전국택배</td>
            </tr>
            </tbody>
          </table>
          <p class="agreement-area">
            <span class="inp-chk small">
              <input type="checkbox" name="" id="agree-default" value=""  v-if="form.baseDlvpYn == 'Y'" checked="checked">
              <input type="checkbox" name="" id="agree-default" value=""  v-else>
              <label for="agree-default">기본 배송지로 설정하기</label>
            </span>
          </p>
        </div>
        <!-- START : 하단 버튼 -->
        <div class="bottom-fixed-btn-area wrap-btn">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="dlvpUpdate"><span>등록</span></button>
        </div>
        <!-- END : 하단 버튼 -->
      </div>
    </main>
  </div>
  </form>
</template>

<script>
  import SubDefaultHeader from '@/components/common/SubDefaultHeader';
  import ApiUtils from '@/common/ApiUtils';
  import StringUtils from '@/common/StringUtils';
  import CookieUtils from '@/common/CookieUtils';

  export default {
  name: "ChangeAddress",
  data() {
    return {
       form: {
          baseDlvpYn: "",
          dlvpNm: "",
          zipcd: "",
          lotnoAddr: "",
          stnmAddr: "",
          adrsNm: "",
          moblTelNo: "",
          telNo: "",
          moblTelNo01: "",
          telNo01: ""
       },
      CU0005S: [],
      CU0006S: [],
      popupAddrChange: false,
      checkedYn: "N",
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '배송지 수정 < 마이페이지 < %s'
  },
  mixins: [],
  components: {
    SubDefaultHeader,
  },
  methods: {
         dlvpUpdate: async function() {
            const success = this.isValidation();
             if (success) {
                if (document.getElementById("agree-default").checked) {
                  this.form.baseDlvpYn = "Y";
                } else {
                  this.form.baseDlvpYn = "N";
                }
                const DlvpModInputDto = {
                      mbrDlvpSeqno: this.$route.params.id,
                      baseDlvpYn: this.form.baseDlvpYn,
                      dlvpNm: this.form.dlvpNm,
                      zipcd: this.form.zipcd,
                      lotnoAddr: this.form.lotnoAddr,
                      stnmAddr: this.form.stnmAddr,
                      adrsNm: this.form.adrsNm,
                      moblTelNo: this.form.moblTelNo01 + this.form.moblTelNo,
                      telNo: this.form.telNo01 + this.form.telNo,
                      useYn: 'Y'
                };
                const resultDlv = await ApiUtils.put('/fo/cu/mypgmgnt/deliveryplace/', DlvpModInputDto);
                if (resultDlv.data.success) {
                this.$router.push('/cu/delivery_place_list');
                } else {
                  this.$gsdialog.alert("오류가 발생했습니다.");
                }
             }
      },
      mbrInfo: async function() {
        if (document.getElementById('member-default').checked) {
        const resultDlv = await ApiUtils.get('/fo/cu/mbrmgnt/member-information', null);
        console.log(resultDlv.data.data);
        } else {
          console.log("체크해제하면 원상복구");
        }
      },
        isValidation: function() {
        let success = true;
        if (StringUtils.isEmpty(StringUtils.trim(this.form.adrsNm))) {
          this.$gsdialog.alert("받는 분 이름을 입력해 주세요.");
          success = false;
        } else if (StringUtils.isEmpty(StringUtils.trim(this.form.dlvpNm))) {
          this.$gsdialog.alert("주소별칭을 입력해주세요.");
          success = false;
        } else if (StringUtils.trim(this.form.dlvpNm).length > 10) {
          this.$gsdialog.alert("주소별칭의 글자수가 10자를 초과하였습니다.");
          success = false;
        } else if (StringUtils.isEmpty(StringUtils.trim(this.form.moblTelNo))) {
          this.$gsdialog.alert("휴대폰번호를 확인해 주세요.");
          success = false;
        } else if (StringUtils.isEmpty(StringUtils.trim(this.form.stnmAddr))) {
          this.$gsdialog.alert("주소를 입력해 주세요.");
          success = false;
        }
        return success;
      },
  },
  destroyed() {
  },
   mounted: async function() {
  // 공통코드
   const CU0005Input = {
          commGrpCd: 'CU0005'
    };
   const CU0005 = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', CU0005Input);
   this.CU0005S = CU0005.data.data;
   const CU0006Input = {
          commGrpCd: 'CU0006'
    };
   const CU0006 = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', CU0006Input);
   this.CU0006S = CU0006.data.data;
   const DlvpModInputDto = {
            mbrDlvpSeqno: this.$route.params.id
      };
    const result = await ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace', DlvpModInputDto);
    this.form = result.data.data[0];
    this.form.telNo01 = result.data.data[0].telNo01 == null ? '' : result.data.data[0].telNo01;
  },
};
</script>
