<template>
  <div class="wrap-tab">
    <ul class="tablist type-a">
      <!-- 20201110 small class 추가 -->
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
    <!-- START : tab contents -->
    <div ref="tabContents" class="scroll-area">
      <div class="tab-content">
        <div id="tab01-contents" aria-labelledby="tab01">
          <NoList
            v-if="ordItemList === null || ordItemList.length === 0"
            NoListText="해당 기간 동안 주문 내역이 없습니다"
            :ListType="'no-List'"
          />
          <div class="tab-inner" v-else>
            <MfMbrInqrOrdItemListRow
              v-for="(list, index) in ordItemList"
              :key="index"
              :ordItemData="list"
              :ordItemCheck="ordItemCheck"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      class="btn-lg btn-bg black"
      @click="selectMfOrdItems"
      :disabled="ordItemList.length == 0"
    >선택완료</button>
    <button
      class="btn-del"
      @click="popupAction"
      @keydown.9="tabFocusRemove('popupAction')"
      aria-label="포커스 아웃 시 팝업 닫기"
    >
      <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
    <!-- END : tab contents -->
    <Loading v-show="loading" />
  </div>
</template>

<script>
import MfMbrInqrOrdItemListRow from './MfMbrInqrOrdItemListRow';
import NoList from '@/components/common/NoList'; // 4월 수정 : 결과없음 케이스 추가
import Loading from '@/components/common/Loading';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';

export default {
  name: 'MfMbrInqrOdrItemList',
  mixins: [LayerPopupMixin],
  data() {
    return {
      tab: {
        tab01: true,
        tab02: false,
        tab03: false,
        selTabIdx: '',
      },
      ordItemList: [],
      loading: false,
      today: DateUtils.format(DateUtils.getToday(), 'YYYYMMDD'),
      startDate: DateUtils.format(
        DateUtils.subtract(this.today, 15, 'day'),
        'YYYYMMDD'
      ),
      endDate: DateUtils.format(this.today, 'YYYYMMDD'),
      ordItemCheck: {
        ordId: null,
        mallId: null,
        arrItemNm: [],
      },
    };
  },
  components: {
    NoList, // 4월 수정 : 결과없음 케이스 추가
    Loading,
    MfMbrInqrOrdItemListRow,
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupInquiry');
      this.modalActiveEvent('popupInquiry');
    },
    selectMfOrdItems() {
      if (
        this.ordItemCheck.arrItemNm &&
        this.ordItemCheck.arrItemNm.length == 0
      ) {
        this.$gsdialog.alert('문의하실 주문을 선택해주세요.').then(dialog => {
          console.log(dialog);
        });
        return;
      }
      this.$emit(
        'selectOrdItemsCallbackFun',
        this.ordItemCheck.arrItemNm,
        'Mf'
      );
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
          DateUtils.subtract(this.today, 3, 'month'),
          'YYYYMMDD'
        );
      }
      this.retrieveMfOrdItems();
    },
    async retrieveMfOrdItems() {
      console.log('값 retrieveMfOrdItems ::', this.ordItemList);
      this.loading = true;
      const params = {
        beginDtInq: this.startDate,
        endDtInq: this.endDate,
      };
      await ApiUtils.post('/fo/cs/mf/member-Inquire-order-item', { ...params })
        .then(res => {
          if (res.data === null || !res.data.success) {
            return;
          }
          const resData = res.data.data;
          if (resData) {
            this.ordItemList = resData;
            console.log('값 :', this.ordItemList);
          }
        })
        .finally(() => (this.loading = false));
    },
    init() {
      this.tab.selTabIdx = 'tab01'; // 기본 선택 탭 셋팅
      this.retrieveMfOrdItems();
    },
  },
  mounted() {
    console.log('값 mounted ::', this.ordItemList);
    this.$nextTick(() => {
      this.init();
    });
  },
};
</script>

<style>
</style>
