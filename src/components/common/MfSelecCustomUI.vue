<!--
components/common/SelecCustomUI
-->
<template>
  <div class="wrap-select-popup">
    <button class="btn-select" aria-haspopup="dialog" @click="openSelectList" :class="{ 'active' : isOpen }">
      <span aria-label="배송비/ 장바구니 쿠폰 정렬" v-if="isNotEmpty(selectCpnInfo)">
        <span>{{selectCpnInfo.cpnNm}}</span>
        <span class="term" v-if="isNotEmpty(selectCpnInfo.promId)">
          {{format(selectCpnInfo.cpnValidDurBeginDttm, 'MM.DD') + '~' + format(selectCpnInfo.cpnValidDurEndDttm, 'MM.DD HH:mm')}}
        </span>
      </span>
      <span aria-label="배송비/ 장바구니 쿠폰 정렬" v-else>
        <span>{{noSelect.cpnNm}}</span>
        <span class="term" v-if="isNotEmpty(noSelect.promId)">
          {{format(noSelect.cpnValidDurBeginDttm, 'MM.DD') + '~' + format(noSelect.cpnValidDurEndDttm, 'MM.DD HH:mm')}}
        </span>
      </span>
    </button>
    <div id="modalList" class="wrap-modal-select" role="dialog" aria-modal="true" @click="openSelectList" v-if="selectCustomUI[refSelectUIId]">
      <ul class="wrap-list-select">
        <li v-for="(cpnInfo, idx) in cpnInfoList" :key="`CPN_INFO_${idx}`">
          <button @click="changeSelectList(cpnInfo)">
            <span>{{cpnInfo.cpnNm}}</span>
            <span class="term" v-if="isNotEmpty(cpnInfo.promId)">
              (사용기간: {{format(cpnInfo.cpnValidDurBeginDttm, 'MM.DD') + '~' + format(cpnInfo.cpnValidDurEndDttm, 'MM.DD HH:mm')}}까지 사용 가능)
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DateUtils from '@/common/DateUtils';
import StringUtils from '@/common/StringUtils';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
export default {
  name: 'SelectDeliveryUI',
  props: {
    cpnInfoList: Array,
    selectCpnInfo: {
      type: Object,
      default: () => {
        return {
          promId: null,
          cpnIsseSeqno: 0,
          ordsDelivSeqno: null,
          ordsItemSeqno: null,
          cpnNm: '적용안함',
          dcAmt: 0,
          cpnValidDurBeginDttm: '',
          cpnValidDurEndDttm: '',
          val: 999,
        };
      },
    },
    selectCustomUI: Object,
    refSelectUIId: String
  },
  data() {
    return {
      noSelect: {
        promId: null,
        cpnIsseSeqno: 0,
        ordsDelivSeqno: null,
        ordsItemSeqno: null,
        cpnNm: '적용안함',
        dcAmt: 0,
        cpnValidDurBeginDttm: '',
        cpnValidDurEndDttm: '',
        val: 999,
      },
      isOpen: false,
    };
  },
  methods: {
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    format(date, dateFormat) {
      return this.isNotEmpty(date) ? DateUtils.format(date, dateFormat) : '';
    },
    openSelectList() {
      if (!this.selectCustomUI[this.refSelectUIId]) {
        Object.keys(this.selectCustomUI).map( (select) => {
          this.selectCustomUI[select] = false;
        });
      }
      this.selectCustomUI[this.refSelectUIId] = !this.selectCustomUI[this.refSelectUIId];
      this.isOpen = !this.isOpen;
    },
    changeSelectList(cpnInfo) {
      // 기존 선택된 쿠폰과 다르면 변경처리
      if (!this.selectCpnInfo || !(this.selectCpnInfo.promId === cpnInfo.promId && this.selectCpnInfo.cpnIsseSeqno === cpnInfo.cpnIsseSeqno)) {
        this.$emit('changeEvent', this.refSelectUIId, cpnInfo);
      }
    }
  },
  created() {
    // 각 쿠폰정보에 Index 항목 및 값 추가 Set
    this.cpnInfoList.forEach((e, i) => this.$set(e, 'val', i));
    this.noSelect = Object.assign({}, this.noSelect, {ordsDelivSeqno: this.selectCpnInfo.ordsDelivSeqno, ordsItemSeqno: this.selectCpnInfo.ordsItemSeqno});
  },
  mounted() {
    // 적용안함 항목 추가
    this.cpnInfoList.unshift(this.noSelect);
    // SelectDeliveryUI의 REF_ID 값 Set
    this.$set(this.selectCustomUI, this.refSelectUIId, false);
  },
  updated() {
    if (this.isOpen) {
      const scrollYContents = document.querySelectorAll('.wrap-modal-select');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++ ) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    };
  },
};
</script>
<style>
</style>
