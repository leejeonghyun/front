<!--
views/od/SC-FO-PA-GS-MP-009
-->
<template>
  <div id="popupDeliveryCoupon" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupDeliveryCoupon}, siteClass]">
    <div class="header-popup">
      <strong>배송비/장바구니 쿠폰</strong>
    </div>
    <div class="full-popup-body scroll-area has-fixed-bottom">
      <div class="inner-full-popup">
        <section class="section-area coupon-list">
          <!-- START : 배송비 쿠폰 -->
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>배송비 쿠폰</h2>
            </div>
            <div v-if="cpnExist">
              <div v-for="item in this.itemInfoList" :key="item.ordsDelivSeqno">
                <dl class="coupon-list-option">
                  <dt>{{item.delivSupplGrpNm}} 배송비</dt>
                  <dd>
                    <span class="ordered-items" v-if="item.ordsItemInfoList">
                      <template  v-if="item.ordsItemInfoList.length === 1">
                        <strong class="items">{{item.ordsItemInfoList[0].itemNm}}</strong>
                      </template>
                      <template v-else>
                        <strong class="items">{{item.ordsItemInfoList[0].itemNm}}</strong><span class="length">외 {{item.ordsItemInfoList.length - 1}}개</span>
                      </template>
                      <strong class="items" v-if="item.delivDlfee > 0"><em class="price">{{item.delivDlfee}} 원</em></strong>
                    </span>
                    <SelecCustomUI v-if="item.dlfeeCnpInfo" :type="item.ordsDelivSeqno" :selectData="item.dlfeeCnpInfo.ordsDlfeeCpnInfoList" :selectedIdx="item.dlfeeCnpInfo.selectedDlfeeIdx" @changeEvent="changeSelectAction" />
                  </dd>
                  <!-- <dt style="margin-top:20px;"><span class="dot">·</span> {{item.delivSupplGrpNm}} 배송비</dt>
                  <p class="ordered-items" v-if="item.ordsItemInfoList">
                    <span class="items" v-if="item.ordsItemInfoList.length === 1">{{item.ordsItemInfoList[0].itemNm}}</span>
                    <span class="items" v-else>{{item.ordsItemInfoList[0].itemNm}} 외 {{item.ordsItemInfoList.length - 1}} 개</span>
                    <span class="price" v-if="item.delivDlfee > 0">{{item.delivDlfee}} 원</span>
                  </p>
                  <span class="wrap-select w100">
                    <select v-if="item.dlfeeCnpInfo" title="배송쿠폰선택" :id="item.ordsDelivSeqno" v-model="item.dlfeeCnpInfo.selectedDlfeeIdx" @change="changeCpn($event)">
                      <option v-for="(cpn, idx) in (item.dlfeeCnpInfo.ordsDlfeeCpnInfoList ? item.dlfeeCnpInfo.ordsDlfeeCpnInfoList : [])" :key="idx" :value="idx">
                        {{cpn.cpnNm}} {{format(cpn.cpnValidDurBeginDttm, 'MM.DD')}}~{{format(cpn.cpnValidDurEndDttm, 'MM.DD HH:mm')}}</option>
                      <option value="999">적용 안함</option>
                    </select>
                    <select id="" title="배송쿠폰선택" v-else>
                      <option value="999">적용 안함</option>
                    </select>
                  </span> -->
                </dl>
              </div>
            </div>
            <!-- START : 쿠폰 없을 경우 -->
            <p class="no-list" v-if="!cpnExist">사용할 수 있는 쿠폰이 없습니다.</p>
            <!-- END : 쿠폰 없을 경우 -->
          </div>
          <!-- END : 배송비 쿠폰 -->
        </section>
        <section class="section-area coupon-list">
          <!-- START : 장바구니 쿠폰 -->
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>장바구니 쿠폰</h2>
            </div>
            <dl class="coupon-list-option" v-if="(ordsBsktCpnInfoList ? ordsBsktCpnInfoList : []).length > 0">
              <dt class="hidden">장바구니 쿠폰</dt>
              <dd>
                <SelecCustomUI :type="'cart'" :selectData="ordsBsktCpnInfoList" :selectedIdx="selectedBsktIdx" @changeEvent="changeSelectAction" />
              </dd>
              <!-- <span class="wrap-select w100">
                <select id="" title="장바구니쿠폰선택" v-model="selectedBsktIdx">
                  <option v-for="(cpn, idx) in (ordsBsktCpnInfoList ? ordsBsktCpnInfoList : [])" :key="idx" :value="idx">
                    {{cpn.cpnNm}} {{format(cpn.cpnValidDurBeginDttm, 'MM.DD')}}~{{format(cpn.cpnValidDurEndDttm, 'MM.DD HH:mm')}}</option>
                  <option value="999">적용 안함</option>
                </select>
              </span> -->
            </dl>
            <!-- START : 쿠폰 없을 경우 -->
            <p class="no-list" v-else>사용할 수 있는 쿠폰이 없습니다.</p>
            <!-- END : 쿠폰 없을 경우 -->
          </div>
          <!-- END : 장바구니 쿠폰 -->
        </section>
        <!-- START : 하단 버튼 -->
        <div class="popup-btns-fixed-bottom">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="bsktCpnAppl()">선택 적용</button>
        </div>
        <!-- END : 하단 버튼 -->
        <PopupDelvCartCpnChange @popupEvent="popupAction" :bOptDlfeeCpnList="bOptDlfeeCpnList" :popName="popName" @cpnSelectCancle="cpnSelectCancle" @procChangeCpn="procChangeCpn" v-if="this.popup.popupDelvCartCpnChange"></PopupDelvCartCpnChange>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import PopupDelvCartCpnChange from '@/components/order/PopupDelvCartCpnChange';
import SelecCustomUI from '@/components/common/SelecCustomUI'; // 셀렉트 레이어
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupDeliveryCoupon",
  props: {
    usePosbBsktCpnList: Object,
    ordsItemList: Object,
    defaultFreeGiftList: Array,
    totAmt: Number,
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '배송비/장바구니 쿠폰 < %s'
  },
  data() {
    return {
      popup: {
        popupDelvCartCpnChange: false,
        open: false,
      },
      ordsDlfeeCpnTypeGrpInfoList: [], // 주문서배송비쿠폰유형그룹정보목록
      itemInfoList: [], // 상품목록
      ordsBsktCpnInfoList: [], // 주문서장바구니쿠폰목록
      bOptDlfeeCpnList: {}, // 이전선택한배송비쿠폰목록(배송비쿠폰은 실시간 변경에 대한 이벤트로 이전 상태로 돌리는 )
      selectedBsktIdx: 0, // 선택한장바구니쿠폰
      bSelectedDlfeeIdx: 0,
      curSelectedDlfeeIdx: 0,
      cpnExist: false, // 쿠폰존재여부
      popName: '', // 팝업구분
      iOrdsBsktCpnApplProc: [], // 변경된 쿠폰
      freeGiftChange: false, // 사은품혜택변경여부
      curOrdsDelivSeqno: 0,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
    PopupDelvCartCpnChange,
    SelecCustomUI,
  },
  computed: {
  },
  watch: {
  },
  methods: {
    changeSelectAction(type, val) { // 옵션 정렬 변경
      console.log('changeSelectAction type', type);
      console.log('changeSelectAction val', val);
      if (type == 'cart') {
        this.selectedBsktIdx = val;
      } else {
        for (let i=0; i < this.itemInfoList.length; i++) {
          const e = this.itemInfoList[i];
          if (e.ordsDelivSeqno == type) {
            e.dlfeeCnpInfo.selectedDlfeeIdx = val;
            this.changeCpn(type, val);
            break;
          }
        }
      }
      // this.select[type] = Object.assign({}, this.select[type], {open: false, selected: selectedData});
    },
    // 팝업 활성/비활성
    popupAction(type, name) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
      this.popName = name;
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupDeliveryCoupon');
      this.$emit('bsktCpnChangeEvent');
      // this.modalActiveEvent('popupDeliveryCoupon');
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    format(date, dateFormat) {
      return DateUtils.format(date, dateFormat);
    },
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    changeCpn(id, value) {
      console.log('changeCpn id', id);
      console.log('changeCpn value', value);

      // 배송비쿠폰 중복체크
      // 1) 현재 select에서 선택된 쿠폰과 중복여부 체크
      /* const target = e.target;
      const selectedDlfeeIdx = Number(target.value);
      const ordsDelivSeqno = target.id; */
      const selectedDlfeeIdx = Number(value);
      const ordsDelivSeqno = id;
      let currentPromId = '';
      let currentCpnIsseSeqno = '';
      const dlfeeCpnInfo = this.itemInfoList.find(item=>item.ordsDelivSeqno == ordsDelivSeqno).dlfeeCnpInfo;
      if (dlfeeCpnInfo) {
        if (dlfeeCpnInfo.ordsDlfeeCpnInfoList[selectedDlfeeIdx]) {
          currentPromId = dlfeeCpnInfo.ordsDlfeeCpnInfoList[selectedDlfeeIdx].promId ? dlfeeCpnInfo.ordsDlfeeCpnInfoList[selectedDlfeeIdx].promId : '';
          currentCpnIsseSeqno = dlfeeCpnInfo.ordsDlfeeCpnInfoList[selectedDlfeeIdx].cpnIsseSeqno ? dlfeeCpnInfo.ordsDlfeeCpnInfoList[selectedDlfeeIdx].cpnIsseSeqno : '';
          dlfeeCpnInfo.selectedDlfeeIdx = selectedDlfeeIdx;
          this.curOrdsDelivSeqno = ordsDelivSeqno;
        }
      }
      if (this.isNotEmpty(currentPromId) && this.isNotEmpty(currentCpnIsseSeqno)) {
        for (let i = 0; i < this.itemInfoList.length; i++) {
          if (this.itemInfoList[i].ordsDelivSeqno != ordsDelivSeqno) {
            if (this.itemInfoList[i].dlfeeCnpInfo) {
              if (this.itemInfoList[i].dlfeeCnpInfo.selectedDlfeeIdx != 999) {
                if (currentPromId == this.itemInfoList[i].dlfeeCnpInfo.ordsDlfeeCpnInfoList[this.itemInfoList[i].dlfeeCnpInfo.selectedDlfeeIdx].promId
                  && currentCpnIsseSeqno == this.itemInfoList[i].dlfeeCnpInfo.ordsDlfeeCpnInfoList[this.itemInfoList[i].dlfeeCnpInfo.selectedDlfeeIdx].cpnIsseSeqno) {
                    this.itemInfoList[i].dlfeeCnpInfo.selectedDlfeeIdx = 999; // 적용안함
                    const el = document.querySelector("select[id='"+this.itemInfoList[i].ordsDelivSeqno+"']"); // 바인드 작동 안해서 elment 강제 set
                    el.options.selectedIndex = el.options.length - 1;
                }
              }
            }
          }
        }
        // 2) 기 선택된 쿠폰들과 중복여부 체크
        if (this.ordsItemList.ordsDelivGrpInfoList) {
          const ordsDelivGrpInfoList = this.ordsItemList.ordsDelivGrpInfoList;
          if (ordsDelivGrpInfoList) {
            for (let i = 0; i < ordsDelivGrpInfoList.length; i++) {
              const ordsDelivSupplGrpInfoList = ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList;
              if (ordsDelivSupplGrpInfoList) {
                for (let j = 0; j < ordsDelivSupplGrpInfoList.length; j++) {
                  if (this.isNotEmpty(ordsDelivSupplGrpInfoList[j].dlfeeCpnPromId) && ordsDelivSupplGrpInfoList[j].ordsDelivSeqno != ordsDelivSeqno) {
                    if (currentPromId === ordsDelivSupplGrpInfoList[j].dlfeeCpnPromId && currentCpnIsseSeqno === ordsDelivSupplGrpInfoList[j].dlfeeCpnIsseSeqno) {
                        this.bOptDlfeeCpnList = ordsDelivSupplGrpInfoList[j];
                        this.popupAction('popupDelvCartCpnChange', 'duplCpn');
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    bsktCpnApplChk() {
      if (this.selectedBsktIdx === 999) {
        this.$emit('setOrdPolSeq', []);
      } else if (this.ordsBsktCpnInfoList[this.selectedBsktIdx]) {
        this.$emit('setOrdPolSeq', this.ordsBsktCpnInfoList[this.selectedBsktIdx].ordPolcSeq.length === 0 ? [] : this.ordsBsktCpnInfoList[this.selectedBsktIdx].ordPolcSeq.split(','));
      }
    },
    bsktCpnAppl() {
      this.iOrdsBsktCpnApplProc = [];
      if (this.itemInfoList) {
        for (let i = 0; i < this.itemInfoList.length; i++) {
          if (this.itemInfoList[i].dlfeeCnpInfo) {
            const selectedDlfeeIdx = this.itemInfoList[i].dlfeeCnpInfo.selectedDlfeeIdx;
            const cnpInfoList = this.itemInfoList[i].dlfeeCnpInfo.ordsDlfeeCpnInfoList[selectedDlfeeIdx];
            const ordsDelivSeqno = this.itemInfoList[i].dlfeeCnpInfo.ordsDelivSeqno;
            this.iOrdsBsktCpnApplProc.push({
              ordId: this.itemInfoList[i].ordId?this.itemInfoList[i].ordId:'',
              ordsDelivSeqno: ordsDelivSeqno?ordsDelivSeqno:'',
              selectedDlfeeIdx: selectedDlfeeIdx,
              ordsOptDlfeeCpnInfo: cnpInfoList,
            });
          }
        }
      }
      const ordsBsktCpnInfoListElement = this.ordsBsktCpnInfoList[this.selectedBsktIdx];
      if (this.ordsBsktCpnInfoList) {
        const ordsBsktCpnApplSbjsList = ordsBsktCpnInfoListElement ? ordsBsktCpnInfoListElement.ordsBsktCpnApplSbjsList : '';
        this.iOrdsBsktCpnApplProc.push({
          ordId: this.ordsItemList.ordId,
          ordsDelivSeqno: ordsBsktCpnApplSbjsList.length > 0 ? ordsBsktCpnApplSbjsList[0].ordsDelivSeqno : 0,
          ordsItemSeqno: ordsBsktCpnApplSbjsList.length > 0 ? ordsBsktCpnApplSbjsList[0].ordsItemSeqno : 0,
          selectedBsktIdx: this.selectedBsktIdx,
          ordsBsktCpnInfo: ordsBsktCpnInfoListElement,
          promId: ordsBsktCpnInfoListElement && ordsBsktCpnInfoListElement.promId || null,
          cpnIsseSeqno: ordsBsktCpnInfoListElement && ordsBsktCpnInfoListElement.cpnIsseSeqno || null,
        });
      }
      // 장바구니쿠폰 적용 후 사은품혜택 변경될 경우
      if (this.defaultFreeGiftList != null) {
        for (let i = 0; i < this.defaultFreeGiftList.length; i++) {
          if (this.defaultFreeGiftList[i] != null) {
            for (let j = 0; j < this.defaultFreeGiftList[i].length; j++) {
              if (this.defaultFreeGiftList[i][j].promBeneZoneList != null) {
                if (this.defaultFreeGiftList[i][j].presPrvdOptPosbQty > 0 || this.defaultFreeGiftList[i][j].presPrvdTypeCd === '01') { // 전체지급시 1개로
                  if (this.defaultFreeGiftList[i][j].promBeneZoneList != null) {
                    for (let k = 0; k < this.defaultFreeGiftList[i][j].promBeneZoneList.length; k++) {
                      const promBeneZone = this.defaultFreeGiftList[i][j].promBeneZoneList[k];
                      if (promBeneZone.beneApplRangeCd === '02') {
                        if (this.totAmt >= Number(promBeneZone.beneZoneBeginVal) && (this.totAmt <= Number(promBeneZone.beneZoneEndVal) || Number(promBeneZone.beneZoneEndVal) === 0)) {
                          let totAmt = this.totAmt;
                          totAmt -= ordsBsktCpnInfoListElement ? ordsBsktCpnInfoListElement.dcAmt : 0;
                          if (!(totAmt >= Number(promBeneZone.beneZoneBeginVal) && (totAmt <= Number(promBeneZone.beneZoneEndVal) || Number(promBeneZone.beneZoneEndVal) === 0))) {
                            this.freeGiftChange = true;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (this.freeGiftChange) {
        this.popupAction('popupDelvCartCpnChange', 'freeGift');
      } else {
        this.processOrdsBsktCpnAppl();
      }
    },
    async processOrdsBsktCpnAppl() {
      // 장바구니쿠폰 배송차수정책 적용
      this.bsktCpnApplChk();
      // 배송비/장바구니쿠폰 적용
      if (this.iOrdsBsktCpnApplProc.length > 0) {
        const response = await ApiUtils.put('/fo/od/ordsmgnt/basket-coupon', this.iOrdsBsktCpnApplProc);
        console.log(response);
      }
      this.$emit('bsktCpnChangeEvent');
      this.$emit('popupEvent', 'popupDeliveryCoupon');
    },
    cpnSelectCancle(ordsDelivSeqno) {
      this.itemInfoList.find(item=>item.ordsDelivSeqno == this.curOrdsDelivSeqno).dlfeeCnpInfo.selectedDlfeeIdx = 999;
      this.itemInfoList.find(item=>item.ordsDelivSeqno == ordsDelivSeqno).dlfeeCnpInfo.selectedDlfeeIdx = this.bSelectedDlfeeIdx;
    },
    procChangeCpn() {
      this.processOrdsBsktCpnAppl(this.iOrdsBsktCpnApplProc);
    },
  },
  mounted() {
    let ordsDelivGrpInfoList = [];
    if (this.ordsItemList) {
      ordsDelivGrpInfoList = this.ordsItemList.ordsDelivGrpInfoList;
    }
    // 배송유형별 배송쿠폰을 담을 객체(itemInfoList) 생성
    if (ordsDelivGrpInfoList) {
      for (let i = 0; i < ordsDelivGrpInfoList.length; i++) {
        const ordsDelivSupplGrpInfoList = ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList;
        if (ordsDelivSupplGrpInfoList) {
          for (let j = 0; j < ordsDelivSupplGrpInfoList.length; j++) {
            this.itemInfoList.push(ordsDelivSupplGrpInfoList[j]);
          }
        }
      }
    }
    // itemInfoList 객체에 배송유형별 배송쿠폰 set
    if (this.isNotEmpty(this.usePosbBsktCpnList.ordId)) {
      this.ordsDlfeeCpnTypeGrpInfoList = this.usePosbBsktCpnList.ordsDlfeeCpnTypeGrpInfoList;
      if (this.ordsDlfeeCpnTypeGrpInfoList) {
        for (let i = 0; i < this.ordsDlfeeCpnTypeGrpInfoList.length; i++) {
          for (let j = 0; j < this.itemInfoList.length; j++) {
            if (this.itemInfoList[j].ordsDelivSeqno == this.ordsDlfeeCpnTypeGrpInfoList[i].ordsDelivSeqno) {
              this.cpnExist = true;
              this.itemInfoList[j].dlfeeCnpInfo = this.ordsDlfeeCpnTypeGrpInfoList[i];
              this.itemInfoList[j].dlfeeCnpInfo.selectedDlfeeIdx = 999;
            }
          }
        }
      }
      // 배송유형별 배송쿠폰의 최대할인가 set
      for (let i = 0; i < this.itemInfoList.length; i++) {
        let ordsDelivSeqno = '';
        if (this.itemInfoList[i].dlfeeCnpInfo) {
          for (let j = 0; j < this.itemInfoList[i].dlfeeCnpInfo.ordsDlfeeCpnInfoList.length; j++) {
            let comp = false;
            // 기 선택된 쿠폰 존재 시 set
            if (this.isNotEmpty(this.itemInfoList[i].dlfeeCpnPromId)) {
              this.itemInfoList[i].dlfeeCnpInfo.selectedDlfeeIdx = this.itemInfoList[i].dlfeeCnpInfo.ordsDlfeeCpnInfoList.findIndex(cpn=>cpn.promId === this.itemInfoList[i].dlfeeCpnPromId && cpn.cpnIsseSeqno === this.itemInfoList[i].dlfeeCpnIsseSeqno);
              this.bSelectedDlfeeIdx = this.itemInfoList[i].dlfeeCnpInfo.selectedDlfeeIdx;
              break;
            } else {
              ordsDelivSeqno = this.itemInfoList[i].dlfeeCnpInfo.ordsDelivSeqno;
              const dcAmt = this.itemInfoList[i].dlfeeCnpInfo.ordsDlfeeCpnInfoList[j].dcAmt;
              let compDcAmt = 0;
              if (this.itemInfoList[i].dlfeeCnpInfo.selectedDlfeeIdx != 999) {
                compDcAmt = this.itemInfoList[i].dlfeeCnpInfo.ordsDlfeeCpnInfoList[this.itemInfoList[i].dlfeeCnpInfo.selectedDlfeeIdx].dcAmt;
              }
              const currentPromId = this.itemInfoList[i].dlfeeCnpInfo.ordsDlfeeCpnInfoList[j].promId;
              const currentCpnIsseSeqno = this.itemInfoList[i].dlfeeCnpInfo.ordsDlfeeCpnInfoList[j].cpnIsseSeqno;
              if (dcAmt > 0 && dcAmt > compDcAmt) {
                // 기 선택된 쿠폰들과 중복여부 체크
                if (ordsDelivGrpInfoList) {
                  for (let k = 0; k < ordsDelivGrpInfoList.length; k++) {
                    const ordsDelivSupplGrpInfoList = ordsDelivGrpInfoList[k].ordsDelivSupplGrpInfoList;
                    if (ordsDelivSupplGrpInfoList) {
                      for (let l = 0; l < ordsDelivSupplGrpInfoList.length; l++) {
                        if (ordsDelivSupplGrpInfoList[l].ordsDelivSeqno != this.itemInfoList[i].ordsDelivSeqno) {
                          if (ordsDelivSupplGrpInfoList[l].selectedDlfeeIdx != 999) {
                            if (currentPromId === ordsDelivSupplGrpInfoList[l].dlfeeCpnPromId && currentCpnIsseSeqno === ordsDelivSupplGrpInfoList[l].dlfeeCpnIsseSeqno) {
                              comp = true;
                            }
                          }
                        }
                      }
                    }
                  }
                }
                // 현재 선택된 쿠폰들과 중복여부 체크
                for (let k = 0; k < this.itemInfoList.length; k++) {
                  if (this.itemInfoList[k].dlfeeCnpInfo && this.itemInfoList[k].dlfeeCnpInfo.selectedDlfeeIdx != 999) {
                    if (ordsDelivSeqno != this.itemInfoList[k].dlfeeCnpInfo.ordsDelivSeqno) {
                      if (currentPromId === this.itemInfoList[k].dlfeeCnpInfo.ordsDlfeeCpnInfoList[this.itemInfoList[k].dlfeeCnpInfo.selectedDlfeeIdx].promId
                        && currentCpnIsseSeqno === this.itemInfoList[k].dlfeeCnpInfo.ordsDlfeeCpnInfoList[this.itemInfoList[k].dlfeeCnpInfo.selectedDlfeeIdx].cpnIsseSeqno) {
                          comp = true;
                      }
                    }
                  }
                }
              }
            }
            if (!comp) {
              this.itemInfoList[i].dlfeeCnpInfo.selectedDlfeeIdx = j;
              this.bSelectedDlfeeIdx = this.itemInfoList[i].dlfeeCnpInfo.selectedDlfeeIdx;
              break;
            }
          }
        }
      }
      this.ordsBsktCpnInfoList = this.usePosbBsktCpnList.ordsBsktCpnInfoList;
      /* // TEST DATA
      this.ordsBsktCpnInfoList = [];
      this.ordsBsktCpnInfoList.push({dcAmt: 10000, cpnNm: '만원', cpnValidDurBeginDttm: '2020.10.01', cpnValidDurEndDttm: '2020.10.02'});
      this.ordsBsktCpnInfoList.push({dcAmt: 20000, cpnNm: '2만원', cpnValidDurBeginDttm: '2020.10.02', cpnValidDurEndDttm: '2020.10.06'});
      this.ordsBsktCpnInfoList.push({dcAmt: 30000, cpnNm: '3만원', cpnValidDurBeginDttm: '2020.10.03', cpnValidDurEndDttm: '2020.10.07'});
      this.ordsBsktCpnInfoList.push({dcAmt: 40000, cpnNm: '4만원', cpnValidDurBeginDttm: '2020.10.04', cpnValidDurEndDttm: '2020.10.08'});
      this.ordsBsktCpnInfoList.push({dcAmt: 50000, cpnNm: '5만원', cpnValidDurBeginDttm: '2020.10.05', cpnValidDurEndDttm: '2020.10.09'}); */

      // 장바구니쿠폰 최대할인가 set
      if (this.ordsBsktCpnInfoList) {
        for (let i = 0; i < this.ordsBsktCpnInfoList.length; i++) {
          this.ordsBsktCpnInfoList[i].val = i;
          if (this.ordsBsktCpnInfoList[i].dcAmt > 0 && this.ordsBsktCpnInfoList[i].dcAmt > this.ordsBsktCpnInfoList[this.selectedBsktIdx].dcAmt) {
            this.selectedBsktIdx = i;
          }
        }
        // 기 선택된 쿠폰 존재 시 set
        if (ordsDelivGrpInfoList) {
          for (let i = 0; i < ordsDelivGrpInfoList.length; i++) {
            if (ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList) {
              for (let j = 0; j < ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList.length; j ++) {
                if (ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList[j].ordsItemInfoList) {
                  for (let k = 0; k < ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList[j].ordsItemInfoList.length; k++) {
                    if (this.isNotEmpty(ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k].bsktCpnPromId)) {
                      this.selectedBsktIdx = this.ordsBsktCpnInfoList.findIndex(cpn=>cpn.promId === ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k].bsktCpnPromId);
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        this.selectedBsktIdx = 999;
      }
    }
    // this.modalActiveEvent('popupDeliveryCoupon');
  }
};
</script>
