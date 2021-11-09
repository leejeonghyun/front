<!--
components/order/DiscountInfoMF
-->
<template>
  <section class="mypage block" v-if="isThebanchan()">
    <div class="total-payment order-payment mt0">
      <div class="sub-title border">
        <h3 class="inline"><span class="bg-line-brush">더반찬<em class="point red">*</em></span></h3>
        <span class="red">희망배송일 선택</span>
      </div>
      <div class="blue_order__goods">
        <p>{{getTheBanchanItemNm()}}</p>
      </div>
      <div class="delivery-management modify">
        <div class="title_box__flex">
          <h4>배송방법</h4>
        </div>
        <ul class="radio-boxtype">
          <li>
            <input type="radio" id="deliverybox01" @click="changeDelivType('04')" :disabled="!dawnDelivYn">
            <label for="deliverybox01" :class="{active : selDelivTypeCd === '04'}">새벽배송</label>
          </li>
          <li>
            <input type="radio" id="deliverybox02" @click="changeDelivType('03')">
            <label for="deliverybox02" :class="{active : selDelivTypeCd === '03'}">택배배송</label>
          </li>
        </ul>
        <div class="radio-boxguide" v-if="selDelivTypeCd === '04'">
          <ul class="list-info">
            <li>배송지에 따라 밤 10시~희망배송 당일 새벽 7시 사이에 도착합니다.</li>
          </ul>
        </div>
        <div class="title_box__flex">
          <h4>희망배송일</h4>
        </div>
        <table class="delivery-time-table">
          <caption>희망배송일 지정</caption>
          <colgroup>
            <col v-for="(selDlv, colIdx) in selectDlvList" :key="`COL_${colIdx}`">
          </colgroup>
          <thead>
            <tr>
              <th scope="col" v-for="(selDlv, thIdx) in selectDlvList" :key="`TH_${thIdx}`" :class="{today: isToday(), disabled: selDlv.delivYn == 'N'}">
                {{ format(selDlv.delivDt, 'MM/DD (dd)') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="(selDlv, tdIdx) in selectDlvList" :key="`TD_${tdIdx}`" :class="{disabled: selDlv.delivYn == 'N'}">
                <span v-if="selDlv.delivYn == 'N'">
                  마감
                </span>
                <span class="inp-radio small" v-else>
                  <input type="radio" name="delivDt" :id="`delivDt${tdIdx}`" v-model="selDelivDt" :value="selDlv.delivDt" @change="changeDelivDt()" :title="format(selDlv.delivDt, 'MM/DD (dd)')">
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <ul class="list-info nomargin">
          <li v-if="!dawnDelivYn">현재 배송지에는 새벽배송 서비스를 제공하지 않습니다.</li>
          <li>배송은 희망배송일 도착을 원칙으로 하나 주문폭주, 천재지변, 택배사의 사정 등으로 인한 경우 배송이 지연될 수 있습니다.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import OrderMsg from '@/components/order/MfOrderMsg'; // 주문 메세지항목
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: "MfDelivThebanchan",
  props: {
    ordId: String,
    ordsItemList: Object,
    ordsDlvpInfo: Object,
  },
  data() {
    return {
      dawnDelivYn: true, // 새벽배송가능여부
      directDlvList: [], // 새벽배송 가능일자 목록
      normalDlvList: [], // 일반배송 가능일자 목록
      selectDlvList: [], // 선택된 배송 가능일자 목록
      selDelivDt: null,
      selDelivTypeCd: '04', // 배송유형코드 ( 03:업체배송, 04:새벽배송 ) default(새벽배송)
    };
  },
  mixins: [],
  components: {
  },
  methods: {
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    isToday(selDate) {
      return DateUtils.getToday() == DateUtils.format(selDate);
    },
    format(x, y) {
      return DateUtils.format(x, y);
    },
    // 몰(더반찬) 상품 존재 여부 체크
    isThebanchan() {
      return !!this.ordsItemList &&
        !!this.ordsItemList.ordsDelivSupplGrpInfoList &&
        !!this.ordsItemList.ordsDelivSupplGrpInfoList.find(supplInfo => supplInfo.mallId === '302');
    },
    // 더반참 상품명 조회
    getTheBanchanItemNm() {
      let itemNm = '';
      let itemCnt = 0;
      this.ordsItemList.ordsDelivSupplGrpInfoList.find(supplInfo => supplInfo.mallId === '302').ordsDlfeeGrpInfoList.forEach(dlfeeInfo => {
        dlfeeInfo.ordsItemInfoList.forEach((itemInfo) => {
          if (itemCnt++ === 0) itemNm = itemInfo.itemNm;
        });
      });
      return itemCnt > 1 ? `${itemNm}외 ${itemCnt - 1}개` : itemNm;
    },
    // 배송방법(새벽/택배) 변경 시 이벤트 처리 함수
    changeDelivType(delivTypeCd) {
      if (this.selDelivTypeCd === delivTypeCd) return;
      if (delivTypeCd === '03') { // 택배배송
        this.selectDlvList = this.normalDlvList;
      } else if (delivTypeCd === '04') { // 새벽배송
        this.selectDlvList = this.directDlvList;
      }
      this.selDelivDt = null;
      this.selDelivTypeCd = delivTypeCd;
      this.changeDelivDt();
    },
    // 희망배송일자 변경 시 이벤트 처리 함수
    changeDelivDt() {
      this.$emit('setHopeDeliv', this.selDelivTypeCd, this.selDelivDt);
    },
    // 더반참의 새벽배송/일반배송 희망일자 정보 조회 함수
    async retrievelistHopeDelivDate() {
      // 희망배송일자 정보 초기화
      this.selDelivTypeCd = '04';
      this.selDelivDt = null;

      const iHopeDelivInq = {
        ordId: this.ordId,
        postNo: this.ordsDlvpInfo.adrsZipcd,
      };
      const response = await ApiUtils.post('/fo/od/mf/bsktmgnt/getHopeDelivDateList', iHopeDelivInq);
      if (response.data.success !== true) {
        // 더반찬 희망배송일 조회 실패 시 장바구니로 이동
        this.$gsdialog.alert(OrderMsg.hopeDelivDateFail, {html: true}).then(dialog => this.$router.go(-1));
        return;
      }
      const strDirectDlv = response.data.data.directDlvList; // 새벽배송 희망일 정보
      const strNormalDlv = response.data.data.normalDlvList; // 일반배송 희망일 정보
      // 새벽배송 희망일 정보 Set
      let dlvInfo = null;
      if (this.isNotEmpty(strDirectDlv)) {
        this.directDlvList = [];
        strDirectDlv.split('|').forEach(directDlv => {
          dlvInfo = directDlv.split(':');
          this.directDlvList.push({
            delivDt: dlvInfo[0],
            delivYn: dlvInfo[1],
          });
        });
        this.dawnDelivYn = true;
      } else {
        this.directDlvList = null;
        this.dawnDelivYn = false;
        this.selDelivTypeCd = '03'; // 새벽배송 불가 시 택배배송코드 Set
      }
      // 일반배송 희망일 정보 Set
      dlvInfo = null;
      if (this.isNotEmpty(strNormalDlv)) {
        this.normalDlvList = [];
        strNormalDlv.split('|').forEach(normalDlv => {
          dlvInfo = normalDlv.split(':');
          this.normalDlvList.push({
            delivDt: dlvInfo[0],
            delivYn: dlvInfo[1],
          });
        });
      } else {
        this.normalDlvList = null;
      }
      // 선택된 희망일자 목록 Set
      if (this.dawnDelivYn) {
        this.selectDlvList = this.directDlvList;
      } else {
        this.selectDlvList = this.normalDlvList;
      }
      // 희망배송일 선택 정보 초기화
      this.changeDelivDt();
    },
  },
  mounted() {},
};
</script>
