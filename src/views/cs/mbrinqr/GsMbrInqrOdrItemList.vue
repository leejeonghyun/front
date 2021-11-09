<template>
  <div class="wrap-tab">
    <!-- START : tab -->
    <ul class="tablist type-a">
      <li>
        <button
          type="button"
          id="tab01"
          aria-controls="tab01-contents"
          @click="tabAction('tab01')"
          :class="{active : this.tab.tab01}"
        >
          <strong>15일</strong>
        </button>
      </li>
      <li>
        <button
          type="button"
          id="tab02"
          aria-controls="tab02-contents"
          @click="tabAction('tab02')"
          :class="{active : this.tab.tab02}"
        >
          <strong>1개월</strong>
        </button>
      </li>
      <li>
        <button
          type="button"
          id="tab03"
          aria-controls="tab03-contents"
          @click="tabAction('tab03')"
          :class="{active : this.tab.tab03}"
        >
          <strong>3개월</strong>
        </button>
      </li>
    </ul>
    <!-- END : tab -->
    <!-- START : tab contents -->
    <div ref="tabContents" class="scroll-area">
      <div class="tab-content">
        <div id="tab01-contents" aria-labelledby="tab01">
          <NoList
            v-if="dtList === null || dtList.length === 0"
            NoListText="해당 기간 동안 주문 내역이 없습니다"
            :ListType="'no-List'"
          />
          <div v-if="dtList !== null && dtList.length !== 0" class="tab-inner">
            <MbrInqrOrdItemListRow v-for="(dt, index) in dtList" :key="index" :dt="dt"></MbrInqrOrdItemListRow>
          </div>
        </div>
      </div>
    </div>
    <!-- END : tab contents -->
    <!-- START : 하단버튼 -->
    <button
      class="btn-lg btn-bg lightgreen"
      @click="selectOrdItems()"
      :disabled="dtList.length == 0"
    >선택완료</button>
    <!-- END : 하단버튼 -->
    <button
      class="btn-del"
      @click="popupAction"
      @keydown.9="tabFocusRemove('popupAction')"
      aria-label="포커스 아웃 시 팝업 닫기"
    >
      <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import NoList from '@/components/common/NoList'; // 4월 수정 : 결과없음 케이스 추가
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import DateUtils from '@/common/DateUtils';
import store from '@/store/index';
import MbrInqrOrdItemListRow from './MbrInqrOrdItemListRow';
import Loading from '@/components/common/Loading';
import _ from 'lodash';

export default {
  name: 'PopupInquiry',
  mixins: [LayerPopupMixin],
  data() {
    return {
      tab: {
        tab01: true,
        tab02: false,
        tab03: false,
        selTabIdx: '',
      },
      ordItemList: null,
      selectOrdItemList: [],
      today: DateUtils.format(DateUtils.getToday(), 'YYYYMMDD'),
      startDate: DateUtils.format(
        DateUtils.subtract(this.today, 15, 'day'),
        'YYYYMMDD'
      ),
      endDate: DateUtils.format(this.today, 'YYYYMMDD'),
      dtList: [],
      loading: true,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    NoList, // 4월 수정 : 결과없음 케이스 추가
    MbrInqrOrdItemListRow,
    Loading,
  },
  methods: {
    // 주문상품조회
    retrieveOrdItems() {
      this.loading = true;
      const params = {
        startDate: this.startDate,
        endDate: this.endDate,
      };
      ApiUtils.post('/fo/cs/mbrinqrmgnt/order-item-list', params)
        .then(res => {
          const reviewObj = {};
          const replyRegObj = {};
          if (res.data === null || res.data.data.ordItemList.length === 0) {
            this.ordItemList = null;
            return;
          }
          this.ordItemList = res.data.data.ordItemList;

          const temp = [];
          this.ordItemList.forEach(e => {
            temp.push({ ordDt: e.ordDt, ordId: e.ordId });
          });

          this.dtList = Array.from(new Set(temp.map(JSON.stringify))).map(
            JSON.parse
          );
          this.dtList.forEach(e => {
            e.delivList = this.filterDelivType(e);
            e.delivList.forEach(x => {
              x.itemList = this.filterItem(x);
            });
          });
        })
        .finally(() => (this.loading = false));
    },
    filterDelivType(e) {
      const temp = this.ordItemList.filter(
        x => x.ordDt === e.ordDt && x.ordId === e.ordId
      );
      const temp2 = [];
      temp.forEach(e => {
        temp2.push({
          ordDt: e.ordDt,
          ordId: e.ordId,
          delivTypeCd: e.viewDelivTypeCd,
          delivTypeNm: e.viewDelivTypeNm,
        });
      });
      return Array.from(new Set(temp2.map(JSON.stringify))).map(JSON.parse);
    },
    filterItem(e) {
      const temp = this.ordItemList.filter(
        x =>
          x.ordDt === e.ordDt &&
          x.ordId === e.ordId &&
          x.viewDelivTypeCd === e.delivTypeCd
      );
      return temp;
    },
    // 선택된 주문상품 넘기기
    selectOrdItems() {
      const selectItemArr = [];
      for (const dt of this.dtList) {
        for (const deliv of dt.delivList) {
          for (const item of deliv.itemList) {
            if (item.chk) {
              selectItemArr.push(item);
            }
          }
        }
      }
      if (selectItemArr.length == 0) {
        this.$gsdialog.alert('문의하실 주문을 선택해주세요.');
        return false;
      }
      // 문의상품 등록전 여러 OrdId들어가는 현상 방지
      const ordIdList = [];
      let ordId = null;
      selectItemArr.forEach(element => {
        if (ordId != element.ordId) {
          ordIdList.push(element.ordId);
          ordId = element.ordId;
        }
      });
      console.log('ordIdList.length' + ordIdList.length);
      // console.log(ordCnt);
      if (ordIdList.length > 1) {
        this.$gsdialog.alert('하나의 주문만 선택해주세요.');
        return false;
      }
      this.selectOrdItemList = selectItemArr;
      // alert("총 " + selectItemArr.length + "개의 주문상품을 내려보냅니다.\n" + ordNoDateConts + "\n" + ordItemNmConts + "\n" + ordItemCntConts);
      // console.log("내려감==============================================");
      // console.log("내려감============================================== : " + this.selectOrdItemList.length);
      this.$emit('selectOrdItemsCallbackFun', this.selectOrdItemList, 'GS');
      this.popupAction();
    },
    // 창 열고닫는토글함수호출
    popupAction() {
      this.$emit('popupEvent', 'popupInquiry');
      this.modalActiveEvent('popupInquiry');
    },
    // 탭선택 이벤트
    tabAction(type) {
      // tab
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab.selTabIdx = type;
      this.tab[type] = true;
      this.$refs.tabContents.focus();
      if (type === 'tab01') {
        this.startDate = DateUtils.format(
          DateUtils.subtract(this.today, 15, 'day'),
          'YYYYMMDD'
        );
      } else if (type === 'tab02') {
        this.startDate = DateUtils.format(
          DateUtils.subtract(this.today, 1, 'month'),
          'YYYYMMDD'
        );
      } else if (type === 'tab03') {
        this.startDate = DateUtils.format(
          DateUtils.subtract(this.today, 5, 'month'),
          'YYYYMMDD'
        );
      }
      this.retrieveOrdItems();
    },
    init() {
      this.tab.selTabIdx = 'tab01'; // 기본 선택 탭 셋팅
      this.retrieveOrdItems();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
};
</script>

<style>
</style>
