<!--
views/ss/SC-FO-SS-GF-MS-800
-->
<template>
  <div class="wrap-mypage">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="배송지관리" prevType="true" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="delivery-management">
        <!-- <p class="box-notice">
          <strong>홍길동님의 배송지 목록입니다.(최대20개까지 등록가능)</strong>
          자주 이용하시는 배송지를 등록하시면 매장변경이 쉬워집니다.
        </p> -->
        <div class="title">
          <h3 class="hidden">배송지 목록</h3><a href="#" class="btn-border btn-small right" @click="dlvpAdd();">배송지 추가</a>
        </div>
        <!-- START : 배송지 리스트 -->
        <div class="delivery-list">
          <ul class="addr-list"
            v-for="delivery in deliverys"
            v-bind:key="delivery.mbrDlvpSeqno"
            v-bind:delivery="delivery">
            <li>
              <p class="inp-radio small" v-if="delivery.baseDlvpYn == 'Y'">
                <input type="radio" name="addrList" v-bind:id="'addr'+delivery.mbrDlvpSeqno"  v-bind:value="delivery.mbrDlvpSeqno" checked="checked" @click="dlvDftChk('addr'+delivery.mbrDlvpSeqno);">
                <label v-bind:for="'addr'+delivery.mbrDlvpSeqno">
                  <span class="name">
                    <strong>{{ delivery.adrsNm }}</strong>[{{ delivery.dlvpNm }}]
                    <span class="default" v-if="delivery.baseDlvpYn == 'Y'">기본배송지</span>
                  </span>
                </label>
              </p>
               <p class="inp-radio small" v-else>
                <input type="radio" name="addrList" v-bind:id="'addr'+delivery.mbrDlvpSeqno"  v-bind:value="delivery.mbrDlvpSeqno"  @click="dlvDftChk('addr'+delivery.mbrDlvpSeqno);"/>
                <label v-bind:for="'addr'+delivery.mbrDlvpSeqno">
                  <span class="name">
                    <strong>{{ delivery.adrsNm }}</strong>[{{ delivery.dlvpNm }}]
                  </span>
                </label>
              </p>
              <p class="addr-txt">
                <span class="code">{{ delivery.zipcd }}</span> {{ delivery.stnmAddr }}
                <span class="lot-number">지번 : {{ delivery.lotnoAddr}}</span>
                <span class="cell-num">{{ delivery.moblTelNo01}}-{{ delivery.moblTelNo}}</span>
              </p>
              <div class="bottom-area">
                <button class="btn-border btn-tiny" @click="dlvpUpdata('addr'+delivery.mbrDlvpSeqno);">수정</button>
                <button class="btn-border btn-tiny delete" v-if="delivery.baseDlvpYn == 'N'" @click="dlvpDel('addr'+delivery.mbrDlvpSeqno);">삭제삭제</button>
              </div>
              <span class="branch">fresh1호 센터</span>
            </li>
          </ul>
        </div>
        <div class="btn-area">
          <button type="button" class="btn-lg btn-bg darkgray" @click="dlvDefault();">기본 배송지 변경</button>
        </div>
        <!-- START : 배송지 리스트 -->
        <div class="bottom-notice">
          <ul>
            <li>상품명 가격은 점포마다 다를 수 있습니다.</li>
            <li>배송지 변경 시 선택된 매장으로 접속됩니다.</li>
            <li>배송 매장 별로 장바구니가 구분되어 있어 배송지 변경 시 장바구니의 상품목록이 변경됩니다.</li>
          </ul>
        </div>
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>
<script>
  import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
  import Footer from '@/components/common/Footer'; // 푸터
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import AccordionMixin from '@/mixins/AccordionMixin';
  import ApiUtils from '@/common/ApiUtils';
  import CookieUtils from '@/common/CookieUtils';

  export default {
    name: "DeliveryManagement",
    data() {
      return {
        deliverys: [],
        mbrDlvpSeqno: ''
      };
    },
    metaInfo: {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '배송지관리 < 마이페이지 < %s'
    },
    mixins: [AccordionMixin, LayerPopupMixin],
    components: {
      SubDefaultHeader,
      Footer,
    },
    methods: {
      dlvpAdd: function() {
        if (this.deliverys.length < 20) {
          this.$router.push('/cu/delivery_place_add');
        } else {
          this.$gsdialog.alert("배송지는 20개를 초과하여 등록할 수 없습니다.");
        }
      },
      dlvDefault: async function() {
        if (this.mbrDlvpSeqno != "") {
          const DlvpModInputDto = {
                    mbrDlvpSeqno: this.mbrDlvpSeqno
              };
            const resultDetail = await ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace', DlvpModInputDto);
            const DlvpInqInputDto = {
              mbrDlvpSeqno: this.mbrDlvpSeqno,
              baseDlvpYn: "Y",
              dlvpNm: resultDetail.data.data[0].dlvpNm,
              zipcd: resultDetail.data.data[0].zipcd,
              lotnoAddr: resultDetail.data.data[0].lotnoAddr,
              stnmAddr: resultDetail.data.data[0].stnmAddr,
              adrsNm: resultDetail.data.data[0].adrsNm,
              moblTelNo: resultDetail.data.data[0].moblTelNo,
              telNo: resultDetail.data.data[0].telNo,
              useYn: "Y"
            };
            const result = await ApiUtils.put('/fo/cu/mypgmgnt/deliveryplace', DlvpInqInputDto);
            if (result.data.success) {
            this.$gsdialog.alert("기본배송지를 변경하였습니다.");
            const resultList = await ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace', null);
            this.deliverys = resultList.data.data;
            } else {
              this.$gsdialog.alert("오류가 발생했습니다.");
            }
          } else {
            this.$gsdialog.alert("기본배송지입니다");
          }
      },
      dlvDftChk: function(rdId) {
        if (document.getElementById(rdId).checked) {
        this.mbrDlvpSeqno = document.getElementById(rdId).value;
        }
      },
      dlvpDel: async function(rdId) {
       const confirmed = confirm(' 삭제하시겠습니까?');
          if (confirmed) {
              this.mbrDlvpSeqno = document.getElementById(rdId).value;
             const DlvpModInputDto = {
                    mbrDlvpSeqno: this.mbrDlvpSeqno
              };
            const resultDetail = await ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace', DlvpModInputDto);
            const DlvpDelInputDto = {
              mbrDlvpSeqno: resultDetail.data.data[0].mbrDlvpSeqno,
              baseDlvpYn: "N",
              useYn: "N"
            };
              const result = await ApiUtils.put('/fo/cu/mypgmgnt/deliveryplace', DlvpDelInputDto);
             const DlvpInqInputDto = {
              mbrDlvpSeqno: result.data.mbrDlvpSeqno
            };
              const resultDlv = await ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace/', DlvpInqInputDto);
              this.deliverys = resultDlv.data.data;
          }
      },
       dlvpUpdata: function(rdId) {
          this.mbrDlvpSeqno = document.getElementById(rdId).value;
          this.$router.push('/cu/delivery_place_update/' + this.mbrDlvpSeqno);
      }
    },
  mounted: async function() {
   const result = await ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace', null);
   this.deliverys = result.data.data;
  },
  };
</script>
<style lang="scss">
</style>
