<!--
views/ss/SC-FO-SS-GF-MS-801
-->
<template>
  <div class="wrap-mypage">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="배송지 추가" prevType="true" />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="change-address-wrap">
        <div class="tbl-area sub-inner-box">
          <div class="tbl-top">
            <span class="inp-chk small">
              <input type="checkbox" name="" id="member-default" value="">
              <label for="member-default">회원정보와 동일</label>
            </span>
          </div>
          <table class="tbl-inner">
            <caption>배송지 추가란</caption>
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
                  <input type="text" id="name" class="inp-txt w100"  v-model="adrsNm"  value="" maxlength="10">
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label for="nick">주소별칭 <span class="required">*</span></label>
                </th>
                <td>
                  <input type="text" id="nick" class="inp-txt w100" v-model="dlvpNm"  value="" maxlength="10">
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label for="mobile">휴대전화 <span class="required" aria-label="필수 항목">*</span></label>
                </th>
                <td>
                  <p class="tel">
                    <span class="wrap-select">
                      <select id="mobile01" name="mobile01" class="w-small" title="휴대폰 번호 앞자리" v-model="moblTelNo01" >
                        <option value="010" selected="selected">010</option>
                        <option value="011" >011</option>
                        <option value="016" >016</option>
                        <option value="019" >019</option>
                      </select>
                    </span>
                    <input type="tel" id="mobile02" name="mobile02" class="inp-txt" v-model="moblTelNo" value="" placeholder="‘ - ’ 없이 숫자만 입력" title="휴대폰 번호 뒷자리">
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
                      <select id="tel01" class="w-small" title="전화번호 앞자리" v-model="telNo01" >
                        <option value="">선택</option>
                        <option value="02">02</option>
                      </select>
                    </span>
                    <input type="tel" id="tel02" class="inp-txt" v-model="telNo" value="" placeholder="‘ - ’ 없이 숫자만 입력" title="전화번호 뒷자리">
                  </p>
                </td>
              </tr>
              <tr class="code-area">
                <th scope="row" class="top">
                  <label for="address">배송지 <span class="required" aria-label="필수 항목">*</span><br><span class="small">(도로명주소)</span></label>
                </th>
                <td>
                  <p class="address-code">
                    <input type="number" class="inp-txt " id="zipcd" title="우편번호" v-model="zipcd" value="" readonly="readonly">
                    <button type="button" id="searchAddr" class="btn-border btn-bg">주소검색</button>
                  </p>
                  <input class="inp-txt w100" id="addr01" type="text" v-model="stnmAddr" value="" title="주소 입력1">
                  <input class="inp-txt w100" id="addr02" type="text" v-model="addrDtl" value="" title="주소 입력2" placeholder="">
                </td>
              </tr>
              <tr>
                <th scope="row">주문매장</th>
                <td>주소 입력 시 설정됩니다.</td>
              </tr>
            </tbody>
          </table>
          <p class="agreement-area">
            <span class="inp-chk small">
              <input type="checkbox" name="" id="agree-default" value="" v-model="baseDlvpYn">
              <label for="agree-default">기본 배송지로 설정하기</label>
            </span>
          </p>
        </div>
        <!-- START : 하단 버튼 -->
        <div class="bottom-fixed-btn-area wrap-btn">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="dlvpReg"><span>등록</span></button>
        </div>
        <!-- END : 하단 버튼 -->
      </div>
    </main>
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "ChangeNewAddress",
  data() {
    return {
      popupAddrChange: false,
      mbrDlvpSeqno: '',
      baseDlvpYn: '',
      dlvpNm: '',
      zipcd: '',
      stnmAddr: '',
      addrDtl: '',
      lotnoAddr: '',
      adrsNm: '',
      moblTelNo: '',
      telNo: '',
      moblTelNo01: '',
      telNo01: ''
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '배송지 추가 < 마이페이지 < %s'
  },
  mixins: [],
  components: {
    SubDefaultHeader,
  },
  methods: {
      dlvpReg: async function() {
            const success = this.isValidation();
            if (success) {
              const DlvpRegInputDto = {
                    baseDlvpYn: this.baseDlvpYn,
                    dlvpNm: this.dlvpNm,
                    zipcd: this.zipcd,
                    lotnoAddr: this.lotnoAddr,
                    stnmAddr: this.stnmAddr,
                    adrsNm: this.adrsNm,
                    moblTelNo: this.moblTelNo01 + this.moblTelNo,
                    telNo: this.telNo01 + this.telNo,
                    useYn: 'Y'
              };
              const result = await ApiUtils.post('/fo/cu/mypgmgnt/deliveryplace', DlvpRegInputDto);
              if (result.data.success) {
                if (this.baseDlvpYn) {
                  this.$gsdialog.alert("등록하신 주소가 기본배송지로 설정되었습니다.");
                } else {
                  this.$gsdialog.alert("주소가 등록되었습니다.");
                }
              this.$router.push('/cu/delivery_place_list');
              } else {
                this.$gsdialog.alert("오류가 발생했습니다.");
              }
            }
      },
        isValidation: function() {
        let success = true;
        if (StringUtils.isEmpty(StringUtils.trim(this.adrsNm))) {
          this.$gsdialog.alert("받는 분 이름을 입력해 주세요.");
          success = false;
        } else if (StringUtils.isEmpty(StringUtils.trim(this.dlvpNm))) {
          this.$gsdialog.alert("주소별칭을 입력해주세요.");
          success = false;
        } else if (StringUtils.trim(this.dlvpNm).length > 10) {
          this.$gsdialog.alert("주소별칭의 글자수가 10자를 초과하였습니다.");
          success = false;
        } else if (StringUtils.isEmpty(StringUtils.trim(this.moblTelNo))) {
          this.$gsdialog.alert("휴대폰번호를 확인해 주세요.");
          success = false;
        } else if (StringUtils.isEmpty(StringUtils.trim(this.stnmAddr))) {
          this.$gsdialog.alert("주소를 입력해 주세요.");
          success = false;
        }
        return success;
      },
  },
  destroyed() {},
  mounted() {
    this.moblTelNo01 = "010";
    this.telNo01 = "";
  },
};
</script>
