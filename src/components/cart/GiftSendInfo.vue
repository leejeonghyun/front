<template>
  <!-- START : 주문자 -->
  <section class="section-area gift-send-info">
    <div class="sub-title">
      <h2>주문자</h2>
    </div>
    <div class="origin-info" v-if="isVisible === 0">
      <p class="info"><span class="name">{{name}}</span>{{mobileNo | mobileNo}}</p>
      <button v-if="readType === 'Y'" type="button" class="btn-change-address" @click="toggleLayer(1)">변경</button>
    </div>
    <div class="sub-inner-box change-info2" v-if="isVisible === 1">
      <input type="text" maxlength="20" id="ordAdrsNm" name="ordAdrsNm" class="inp-txt w100" v-model="name" title="주문자 이름">
      <p class="insert-tel">
        <span class="wrap-select">
          <select id="ordTelCoNo" name="ordTelCoNo" v-model="ordTelCoNo1" class="w-small" title="휴대폰 번호 앞자리">
            <option v-for="telCoNoInfo in telCoNoList" v-bind:key="telCoNoInfo.commCd" v-bind:value="telCoNoInfo.commCd" :selected="telCoNoInfo.commCdNm == ordTelCoNo1 ? true : false" >{{telCoNoInfo.commCdNm}}</option>
          </select>
        </span>
        <input type="number" min="00000000" max="99999999" id="ordTelCoNo2" name="ordTelCoNo2" v-model="ordTelCoNo2" class="inp-txt" value="" @keyup="checkNumberLength(ordTelCoNo2)" placeholder="‘ - ’ 없이 숫자만 입력" title="휴대폰 번호 뒷자리">
      </p>
      <button type="button" class="btn-change-address" @click="giftOrdPsInfoEvent()">저장</button>
    </div>
  </section>
  <!-- END : 주문자 -->
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
export default {
  props: {
    mbrDlvp: Object,
    telCoNoList: Array,
    readType: String,
      value: Object,
  },
  name: "GiftSendInfo",
  data() {
    return {
        name: '',
        isVisible: 0,
        ordTelCoNo1: '010',
        ordTelCoNo2: '',
    };
  },
  mixins: [],
  components: {
  },
    watch: {
      value: {
          deep: true,
          handler: function() {
              this.applyModel();
          },
      },
    },
    filters: {
        mobileNo(value) {
            if (!value) {
                return '';
            }
            if (value.length < 11) {
                return value.substring(0, 3) + ' - ' + value.substring(3, 6) + ' - ' + value.substring(6);
            } else {
                return value.substring(0, 3) + ' - ' + value.substring(3, 7) + ' - ' + value.substring(7);
            }
        },
    },
  methods: {
      applyModel() {
          this.name = this.value.name;
          this.ordTelCoNo1 = this.value.mobileNo.substring(0, 3);
          this.ordTelCoNo2 = this.value.mobileNo.substring(3);
      },
    async toggleLayer(el) {
      this.isVisible = el;
      if (el === 1) {
          return;
      }
      this.$emit('input', {
          name: this.name,
          mobileNo: this.mobileNo,
      });
    },
    // 자리수체크
    checkNumberLength(str) {
      if (str.length > 8) {
        const temp = str.substring(0, 8);
        this.ordTelCoNo2 = temp;
      }
    },
    // 주문자 정보 수정 및 주문자정보 이벤트
    async giftOrdPsInfoEvent() {
      // const encMoblTelNo = this.mbrDlvp.encMoblTelNo;
      // const encAdrsNm = this.mbrDlvp.encAdrsNm;
      // this.mbrDlvp.encMoblTelNo = this.ordTelCoNo + '' + this.ordTelCoNo2;
      // this.mbrDlvp.encAdrsNm = this.encAdrsNm;
      // // 주문자정보 업데이트
      // const result = await ApiUtils.post('/fo/od/giftMgnt/gift-ord-info-chg', this.mbrDlvp);
      //
      // if (result.data.success) {
      //   // 주문자정보 이벤트 전송
      //   this.$emit('giftOrdPsInfoEvent', this.mbrDlvp);
      // } else {
      //   this.mbrDlvp.encMoblTelNo = encMoblTelNo;
      //   this.mbrDlvp.encAdrsNm = encAdrsNm;
      //   this.$gsdialog.alert(OrderMsg.editGiftInfoFail);
      // }
      this.toggleLayer(0);
    },
  },
  destroyed() {
  },
  mounted() {
      this.applyModel();
  },
  computed: {
      mobileNo() {
          return this.ordTelCoNo1 + this.ordTelCoNo2;
      },
  },
};
</script>
