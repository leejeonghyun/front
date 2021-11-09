<template>
  <section class="section-area" v-show="todayCnt > 0 || parcelCnt > 0 || dawnCnt > 0 || mallCnt > 0" id="freeGift_divZone">
    <div v-if="todayCnt > 0">
      <div class="sub-title border mb0">
        <h2>사은품 선택({{todayCnt}})</h2>
      </div>
      <div v-for="(gift, index) in todayGiftList" v-bind:key="index" class="sub-inner-box free-gift">
        <template v-if="chkPresPrvdTypeCnt(gift, 'today') > 0">
          <p class="tit">선택{{index + 1}}. {{gift.promNm}} 택 {{chkPresPrvdTypeCnt(gift, 'today')}}</p>
          <template>
            <ul class="free-gift-list" v-for="(promBeneZone, jndex) in gift.promBeneZoneList" v-bind:key="jndex">
              <template v-if="findPromBeneZone(promBeneZone, 'today', gift.mallList)">
                <li v-for="(promPresFrgf, kndex) in promBeneZone.promPresFrgfList" v-bind:key="kndex">
                  <span class="inp-chk bg">
                    <input @click="chkGift(gift,gift.promApplSbjItemList,promPresFrgf,index,jndex,kndex,$event,chkPresPrvdTypeCnt(gift, 'today'), 'today')" type="checkbox" :name="`${'today_giftChk' + index + jndex}`" :id="`${'today_gift'+ index + '-' + jndex + '-' + kndex}`">
                    <label :for="`${'today_gift' + index + '-' + jndex + '-' + kndex}`">{{chkGiftNm(promPresFrgf)}}</label>
                  </span>
                </li>
              </template>
            </ul>
          </template>
        </template>
      </div>
    </div>
    <div v-if="parcelCnt > 0">
      <div class="sub-title border mb0">
        <h2>사은품 선택({{parcelCnt}})</h2>
      </div>
      <div v-for="(gift, index) in parcelGiftList" v-bind:key="index" class="sub-inner-box free-gift">
        <template v-if="chkPresPrvdTypeCnt(gift, 'parcel') > 0">
          <p class="tit">선택{{index + 1}}. {{gift.promNm}} 택 {{chkPresPrvdTypeCnt(gift, 'parcel')}}</p>
          <template>
            <ul class="free-gift-list" v-for="(promBeneZone, jndex) in gift.promBeneZoneList" v-bind:key="jndex">
              <template v-if="findPromBeneZone(promBeneZone, 'parcel', gift.mallList)">
                <li v-for="(promPresFrgf, kndex) in promBeneZone.promPresFrgfList" v-bind:key="kndex">
                  <span class="inp-chk bg">
                    <input @click="chkGift(gift,gift.promApplSbjItemList,promPresFrgf,index,jndex,kndex,$event,chkPresPrvdTypeCnt(gift, 'parcel'), 'parcel')" type="checkbox" :name="`${'parcel_giftChk' + index + jndex}`" :id="`${'parcel_gift'+ index + '-' + jndex + '-' + kndex}`">
                    <label :for="`${'parcel_gift' + index + '-' + jndex + '-' + kndex}`">{{chkGiftNm(promPresFrgf)}}</label>
                  </span>
                </li>
              </template>
            </ul>
          </template>
        </template>
      </div>
    </div>
    <div v-if="dawnCnt > 0">
      <div class="sub-title border mb0">
        <h2>사은품 선택({{dawnCnt}})</h2>
      </div>
      <div v-for="(gift, index) in dawnGiftList" v-bind:key="index" class="sub-inner-box free-gift">
        <template v-if="chkPresPrvdTypeCnt(gift, 'dawn') > 0">
          <p class="tit">선택{{index + 1}}. {{gift.promNm}} 택 {{chkPresPrvdTypeCnt(gift, 'dawn')}}</p>
          <template>
            <ul class="free-gift-list" v-for="(promBeneZone, jndex) in gift.promBeneZoneList" v-bind:key="jndex">
              <template v-if="findPromBeneZone(promBeneZone, 'dawn', gift.mallList)">
                <li v-for="(promPresFrgf, kndex) in promBeneZone.promPresFrgfList" v-bind:key="kndex">
                  <span class="inp-chk bg">
                    <input @click="chkGift(gift,gift.promApplSbjItemList,promPresFrgf,index,jndex,kndex,$event,chkPresPrvdTypeCnt(gift, 'dawn'), 'dawn')" type="checkbox" :name="`${'dawn_giftChk' + index + jndex}`" :id="`${'dawn_gift'+ index + '-' + jndex + '-' + kndex}`">
                    <label :for="`${'dawn_gift' + index + '-' + jndex + '-' + kndex}`">{{chkGiftNm(promPresFrgf)}}</label>
                  </span>
                </li>
              </template>
            </ul>
          </template>
        </template>
      </div>
    </div>
    <div v-if="mallCnt > 0">
      <div class="sub-title border mb0">
        <h2>사은품 선택({{mallCnt}})</h2>
      </div>
      <div v-for="(gift, index) in mallGiftList" v-bind:key="index" class="sub-inner-box free-gift">
        <template v-if="chkPresPrvdTypeCnt(gift, 'mall') > 0">
          <p class="tit">선택{{index + 1}}. {{gift.promNm}} 택 {{chkPresPrvdTypeCnt(gift, 'mall')}}</p>
          <template>
            <ul class="free-gift-list" v-for="(promBeneZone, jndex) in gift.promBeneZoneList" v-bind:key="jndex">
              <template v-if="findPromBeneZone(promBeneZone, 'mall', gift.mallList)">
                <li v-for="(promPresFrgf, kndex) in promBeneZone.promPresFrgfList" v-bind:key="kndex">
                  <span class="inp-chk bg">
                    <input @click="chkGift(gift, gift.promApplSbjItemList,promPresFrgf,index,jndex,kndex,$event,chkPresPrvdTypeCnt(gift, 'mall'), 'mall')" type="checkbox" :name="`${'mall_giftChk' + index + jndex}`" :id="`${'mall_gift'+ index + '-' + jndex + '-' + kndex}`">
                    <label :for="`${'mall_gift' + index + '-' + jndex + '-' + kndex}`">{{chkGiftNm(promPresFrgf)}}</label>
                  </span>
                </li>
              </template>
            </ul>
          </template>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import OrderMsg from '@/components/order/OrderMsg';

export default {
  name: "FreeGift",
  props: {
    ordsItemList: Object,
    totAmt: Number,
    crcoInfoInfo: Object,
    payType: String,
  },
  data() {
    return {
      ordId: '',
      memInfo: {},
      giftList: [],
      todayGiftList: [],
      todayCnt: 0,
      todayAmt: 0,
        todayAmtMap: {
            '1': 0,
            '11': 0,
            '20': 0,
            'ALL': 0,
        },
      todayOrder: {
        mallId: '',
        supplFirmCd: '',
        storId: '',
        delivTypeCd: '',
      },
      parcelGiftList: [],
      parcelCnt: 0,
      parcelAmt: 0,
        parcelAmtMap: {
            '1': 0,
            '11': 0,
            '20': 0,
            'ALL': 0,
        },
      parcelOrder: {
        mallId: '',
        supplFirmCd: '',
        storId: '',
        delivTypeCd: '',
      },
      dawnGiftList: [],
      dawnCnt: 0,
      dawnAmt: 0,
        dawnAmtMap: {
            '1': 0,
            '11': 0,
            '20': 0,
            'ALL': 0,
        },
      dawnOrder: {
        mallId: '',
        supplFirmCd: '',
        storId: '',
        delivTypeCd: '',
      },
      mallGiftList: [],
      mallCnt: 0,
      gsNPointDcAmt: 0,
      popRwdDcAmt: 0,
      resPntForm: null,
      crcoEvntInfo: null,
      totalDcAmt: 0,
    };
  },
  mixins: [],
  components: {
  },
  watch: {
    totAmt: function() {
      // console.log('totAmt : ' + this.totAmt);
      // this.totAmt = 1000; // 임의 변경시 화면 동적으로 변경되는지
      this.giftDo();
      this.$emit('setFreeGift', null, 'D'); // 금액변경시 하단 사은품 정보 변경됨으로 reset
    },
    ordsItemList: function() {
      this.getAmt();
      this.giftDo();
    },
    crcoInfoInfo: function() {
      this.todayCnt = 0;
      this.parcelCnt = 0;
      this.dawnCnt = 0;
      this.mallCnt = 0;
      this.giftDo();
      if (this.giftCnt(this.mallGiftList, 'mall') > 0) {
        let cnt = 0;
        if (this.giftList && this.giftList.length > 0) {
          for (let i = 0; i < this.giftList.length; i++) {
            if (this.giftList[i]) {
              for (let j = 0; j < this.giftList[i].length; j++) {
                if (this.mallGiftList && this.mallGiftList.length > 0) {
                  for (let k = 0; k < this.mallGiftList.length; k++) {
                    if (this.mallGiftList[k]) {
                      if (this.giftList[i][j].promId == this.mallGiftList[k].promId && this.giftList[i][j].promDtlTypeCd === this.mallGiftList[k].promDtlTypeCd) {
                        cnt++;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (cnt === 0) {
          this.giftList.push(this.mallGiftList);
        }
      } else {
        if (this.giftList && this.giftList.length > 0) {
          for (let i = 0; i < this.giftList.length; i++) {
            if (this.giftList[i]) {
              for (let j = 0; j < this.giftList[i].length; j++) {
                if (this.mallGiftList && this.mallGiftList.length > 0) {
                  for (let k = 0; k < this.mallGiftList.length; k++) {
                    if (this.mallGiftList[k]) {
                      if (this.giftList[i][j].promId == this.mallGiftList[k].promId && this.giftList[i][j].promDtlTypeCd === this.mallGiftList[k].promDtlTypeCd) {
                        this.$emit('setFreeGift', this.mallGiftList[k], 'D');
                        this.giftList.splice(i, i);
                        i = i - 1;
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    giftList: function() {
      this.$emit('defaultFreeGift', this.giftList);
    },
    payType: function() {
      this.giftDo();
    },
  },
  methods: {
    giftDo() {
      this.getUserInfo();

      this.$emit('setFreeGift', null, 'D'); // 금액변경시 하단 사은품 정보 변경됨으로 reset
    },
    async retreiveMallFreeGift(ordsItemInfoList) {
      const params = this.makeParam('602', ordsItemInfoList);
      let giftList = await this.getGiftList(params);
      const that = this;
      giftList.forEach(function(each) {
        each.presList = that.filterWithTdrMeans(each.presList);
        each.presList.forEach(function(each) {
          each.mallId = params.mallId;
          each.storId = params.storId;
          each.supplFirmCd = params.supplFirmCd;
          each.delivTypeCd = params.storTypeCd;
        });
      });
      giftList = giftList.filter(each => each.presList.length > 0);
      const cardInfo = this.crcoInfoInfo;
      if (giftList !== null && giftList.length > 0) {
        giftList[0].presList.type = 'mall';
        this.mallGiftList = giftList[0].presList;
        if (this.giftCnt(this.mallGiftList, 'mall') > 0) {
          this.giftList.push(giftList[0].presList);
          // this.$emit('defaultFreeGift', this.giftList);
        }
      }
    },
    filterWithTdrMeans(presList) {
      const cardInfo = this.crcoInfoInfo;
      const payType = this.payType;
      return presList.filter(each => {
        if (each.promApplTdrMeansList == null || each.promApplTdrMeansList.length === 0) {
          return true;
        }

        console.log('each.promApplTdrMeansList', each.promApplTdrMeansList);

        return each.promApplTdrMeansList.filter(function(each) {
            console.log('each.evntTdrMeansCd', each.evntTdrMeansCd);
            console.log('payType', payType);
          return each.evntTdrMeansCd === payType;
        }).filter(function(each) {
          if (each.evntTdrMeansCd !== '02') {
            return true;
          }

          if (!cardInfo) {
            return false;
          }

          return each.crcoCd === cardInfo.crcoCd;
        }).length > 0;
      });
    },
    async retreiveDelivFreeGift(ordsDelivSupplGrpInfo, type) {
      const params = this.makeParam('603', ordsDelivSupplGrpInfo.ordsItemInfoList);
      let giftList = await this.getGiftList(params);
      const that = this;
      giftList.forEach(function(each) {
        each.presList = that.filterWithTdrMeans(each.presList);
        each.presList.forEach(function(each) {
          each.mallId = params.mallId;
          each.storId = params.storId;
          each.supplFirmCd = params.supplFirmCd;
          each.delivTypeCd = params.storTypeCd;
        });
      });
      giftList = giftList.filter(each => each.presList.length > 0);
      const cardInfo = this.crcoInfoInfo;
      if (giftList !== null && giftList.length > 0) {
        if (type === '01' && this.todayGiftList.length === 0) {
          giftList[0].presList.type = 'today';
          this.todayGiftList = giftList[0].presList;

          if (this.giftCnt(this.todayGiftList, 'today') > 0) {
            this.giftList.push(giftList[0].presList);
          }
        } else if (type === '02' && this.parcelGiftList.length === 0) {
          giftList[0].presList.type = 'parcel';
          this.parcelGiftList = giftList[0].presList;

          if (this.giftCnt(this.parcelGiftList, 'parcel') > 0) {
            this.giftList.push(giftList[0].presList);
          }
        } else if (type === '04' && this.dawnGiftList.length === 0) {
          giftList[0].presList.type = 'dawn';
          this.dawnGiftList = giftList[0].presList;

          if (this.giftCnt(this.dawnGiftList, 'dawn') > 0) {
            this.giftList.push(giftList[0].presList);
          }
        }
      }
      console.log("---> giftList", giftList);
    },
    async getUserInfo() {
      const response = await ApiUtils.get('/fo/cu/mbrmgnt/member-information', null); // 회원정보가져오기
      if (response === null) {
        return;
      }

      this.memInfo = response.data.data;
      this.giftList = [];
      this.todayGiftList = [];
      this.parcelGiftList = [];
      this.dawnGiftList = [];
      this.mallGiftList = [];
      const mallItemList = [];
      const daliItemList = [];
      if (this.ordsItemList.ordsDelivGrpInfoList) {
        const ordsDelivGrpInfoList = this.ordsItemList.ordsDelivGrpInfoList;
        for (let i = 0; i < ordsDelivGrpInfoList.length; i++) {
          if (ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList) {
            const ordsDelivSupplGrpInfoList = ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList;
            for (let j = 0; j < ordsDelivSupplGrpInfoList.length; j++) {
              if (ordsDelivSupplGrpInfoList[j].ordTypeCd != '50') {
                if (ordsDelivSupplGrpInfoList[j].ordsItemInfoList) {
                  await this.retreiveDelivFreeGift(ordsDelivSupplGrpInfoList[j], ordsDelivSupplGrpInfoList[j].delivTypeCd); // 배송유형별 사은품 조회
                  for (let k = 0; k < ordsDelivSupplGrpInfoList[j].ordsItemInfoList.length; k++) {
                    if (ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k].mallId === '1') { // GSFRESH 사은품 조회
                      mallItemList.push(ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k]);
                    } else if (ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k].mallId === '11') { // 달리살다 사은품 조회
                      daliItemList.push(ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k]);
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (mallItemList.length > 0) {
        this.retreiveMallFreeGift(mallItemList); // 몰별 사은품 조회
      }
      if (daliItemList.length > 0) {
        this.retreiveMallFreeGift(daliItemList); // 몰별 사은품 조회
      }
      // this.$emit('defaultFreeGift', this.giftList);
    },
    giftCnt(giftList, type) {
      let cnt = 0;
      // let crcoCdPromChk = false;
      if (giftList != null && giftList.length > 0) {
        for (let i = 0; i < giftList.length; i++) {
          let result = false;
          if (giftList[i].presPrvdTypeCd === '01') { // 전체지급 시
            result = true;
          } else if (giftList[i].presPrvdTypeCd === '02') { // 선착순
            let tmpCnt = 0;
            if (giftList[i].promBeneZoneList) {
              for (let j = 0; j < giftList[i].promBeneZoneList.length; j++) {
                if (giftList[i].promBeneZoneList[j].promPresFrgfList && giftList[i].promBeneZoneList[j].promPresFrgfList.length > 0) {
                  for (let k = 0; k < giftList[i].promBeneZoneList[j].promPresFrgfList.length; k++) {
                    if (giftList[i].promBeneZoneList[j].promPresFrgfList[k]) {
                      if (tmpCnt === 0 && giftList[i].promBeneZoneList[j].promPresFrgfList[k].applYn === 'Y') {
                        tmpCnt++;
                      } else {
                        giftList[i].promBeneZoneList[j].promPresFrgfList.splice(k, 1);
                        k = k - 1;
                      }
                    }
                  }
                }
              }
            }
            if (tmpCnt > 0) {
              result = true;
            }
          } else if (giftList[i].presPrvdTypeCd === '03' && giftList[i].presPrvdOptPosbQty > 0) { // 선택형
            result = true;
          }
          if (result) {
            if (this.chkPromBeneZone(giftList[i], type)) {
              cnt++;
            } else {
              giftList.splice(i, 1);
              i = i - 1;
            }
          }
        }
        // 프로모션에 지정된 카드 선택시에만 사은품 노출
        /*
        for (let i=0; i < giftList.length; i++) {
          if (giftList[i].promApplTdrMeansList != null && giftList[i].promApplTdrMeansList.length > 0) {
            for (let j = 0; j < giftList[i].promApplTdrMeansList.length; j++) {
              if (this.crcoInfoInfo) {
                if (giftList[i].promApplTdrMeansList[j]) {
                  if (this.crcoInfoInfo.crcoCd === giftList[i].promApplTdrMeansList[j].crcoCd) {
                    crcoCdPromChk = true;
                  }
                }
              }
            }
          } else {
            crcoCdPromChk = true;
          }
        }
        if (!crcoCdPromChk) {
          cnt = 0;
        }
        */
        if (type === 'today') {
          this.todayCnt = cnt;
        } else if (type === 'parcel') {
          this.parcelCnt = cnt;
        } else if (type === 'dawn') {
          this.dawnCnt = cnt;
        } else if (type === 'mall') {
          this.mallCnt = cnt;
        }
      }
      return cnt;
    },
    chkGift(gift, promApplSbjItemList, promPresFrgf, index, jndex, kndex, el, presPrvdOptPosbQty, type) {
      let orderInfo = null;
      if (type === 'today') {
        orderInfo = this.todayOrder;
      } else if (type === 'parcel') {
        orderInfo = this.parcelOrder;
      } else if (type === 'dawn') {
        orderInfo = this.dawnOrder;
      }
      if (gift.promDtlTypeCd === '603') {
        // promPresFrgf.itemId = promApplSbjItemList[0].itemId;
        promPresFrgf.mallId = orderInfo.mallId;
        promPresFrgf.supplFirmCd = orderInfo.supplFirmCd;
        promPresFrgf.storId = orderInfo.storId;
        promPresFrgf.delivTypeCd = orderInfo.delivTypeCd;
      }
      promPresFrgf.promDtlTypeCd = gift.promDtlTypeCd;

      let chkInput = null;
      chkInput = document.getElementsByName(type + '_giftChk' + index + jndex);
      let chkCount = 0;
      for (let i=0; i < chkInput.length; i++) {
        if (chkInput[i].checked) {
          chkCount++;
        }
      }
      if (presPrvdOptPosbQty < chkCount) {
        document.getElementById(type + '_gift'+ index + '-' + jndex + '-' + kndex).checked = false;
        this.$gsdialog.alert(OrderMsg.posbQty(presPrvdOptPosbQty));
        return;
      }

      if (el.target.checked) {
        this.$emit('setFreeGift', promPresFrgf, 'I');
      } else {
        this.$emit('setFreeGift', promPresFrgf, 'D');
      }
    },
    chkGiftNm(promPresFrgf) {
      let text = '';

      if (promPresFrgf.presFrgfTypeCd === '4') {
        text += 'GS&POINT ' + Number(promPresFrgf.presFrgfApplVal).toString() + 'P';
      } else if (promPresFrgf.presFrgfTypeCd === '5') {
        text += 'GS&리워즈 ' + Number(promPresFrgf.presFrgfApplVal).toString() + 'P';
      } else {
        text += promPresFrgf.presFrgfApplValNm !== null ? promPresFrgf.presFrgfApplValNm : '명칭없음';
      }

      return text;
    },
    findPromBeneZone(promBeneZone, type, mallList) {
        mallList = mallList || ['1', '11', '20'];
        console.log('mallList', mallList);
      let succ = false;
      let amt = 0;
      if (type === 'today') {
          console.log('validated on server');
          // if (mallList.length !== 3) {
          //     amt = mallList.map(each => this.todayAmtMap[each]).reduce((p, c) => p + c, 0);
          // } else {
          //     amt = this.totAmt;
          // }
          return true;
      } else if (type === 'parcel') {
          console.log('validated on server');
          // amt = mallList.map(each => this.parcelAmtMap[each]).reduce((p, c) => p + c, 0);
          // if (mallList.length !== 3) {
          // } else {
          //     amt = this.totAmt;
          // }
          return true;
      } else if (type === 'dawn') {
          console.log('validated on server');
          // if (mallList.length !== 3) {
          //     amt = mallList.map(each => this.dawnAmtMap[each]).reduce((p, c) => p + c, 0);
          // } else {
          //     amt = this.totAmt;
          // }
          return true;
      } else if (type === 'mall') {
          amt = this.totAmt;
      }
      if (promBeneZone.promPresFrgfList && promBeneZone.promPresFrgfList.length > 0) {
        // 구간적용일시만
        if (promBeneZone.beneApplRangeCd === '02') {
            console.log('amt', amt);
            console.log('promBeneZone.beneZoneBeginVal', promBeneZone.beneZoneBeginVal);
            console.log('promBeneZone.beneZoneEndVal', promBeneZone.beneZoneEndVal);
            console.log('succ', amt >= Number(promBeneZone.beneZoneBeginVal) && (amt <= Number(promBeneZone.beneZoneEndVal) || Number(promBeneZone.beneZoneEndVal) === 0));
          if (amt >= Number(promBeneZone.beneZoneBeginVal) && (amt <= Number(promBeneZone.beneZoneEndVal) || Number(promBeneZone.beneZoneEndVal) === 0)) {
            succ = true;
          }
        } else if (promBeneZone.beneApplRangeCd === '01') {
          succ = true;
        }
      }
      return succ;
    },
    async getGiftList(params) {
      const response = await ApiUtils.post('/fo/od/ordsmgnt/giftInfo', params); // 사은품정보 가져오기
      // console.log("getGiftList : ", response.data.data);
      return response.data.data;
    },
    chkPromBeneZone(gift, type) {
      let exist = false;
      if (gift.promBeneZoneList != null) {
        for (let i = 0; i < gift.promBeneZoneList.length; i++) {
          const promBeneZone = gift.promBeneZoneList[i];
          if (promBeneZone != null) {
            exist = this.findPromBeneZone(promBeneZone, type, gift.mallList);
            if (exist) {
              break;
            }
          }
        }
      }
      return exist;
    },
    makeParam(promTypeCd, ordsItemInfoList) {
      // 사은품 조회
      const params = {};
      const itemList = [];
      let item = {};
      if (ordsItemInfoList != null) {
        for (let i = 0; i < ordsItemInfoList.length; i++) {
          item = {};
          item.itemId = ordsItemInfoList[i].itemId;
          item.itemNm = ordsItemInfoList[i].itemNm;
          item.storTypeCd = ordsItemInfoList[i].delivTypeCd;
          item.supplFirmCd = ordsItemInfoList[i].supplFirmCd;
          item.storId = ordsItemInfoList[i].storId;
          itemList.push(item);
        }
      }
      // params.mallId = CookieUtils.getMallId();
      // params.mallId = ordsItemInfoList[0].mallId;
      // console.log("ordsItemInfoList[0]", ordsItemInfoList[0]);
      params.cmmMbrNo = this.memInfo.cmmMbrNo;
      params.mbrTypeCd = this.memInfo.mbrTypeCd;
      // params.mbrGrdCd = '01';
      params.mbsYn = CookieUtils.getCookie('PMBS_JOIN_PRCN_CD')==='0001'?'Y':'N';
      params.chanlId = CookieUtils.getChanlId();
      params.mediaCd = CookieUtils.getMdaType();
      // params.storId = ordsItemInfoList[0].storId;
      // params.supplFirmCd = supplFirmCd;
      // params.storTypeCd = delivTypeCd;
      params.webId = this.memInfo.webId;
      params.promDtlTypeCd = promTypeCd;
      params.ordAmt = this.totAmt;
      params.ordId = this.ordsItemList.ordId;
      params.itemList = itemList;
      params.totalPntDcAmt = this.gsNPointDcAmt + this.popRwdDcAmt;
      params.mobilePntDcAmt = this.resPntForm && this.resPntForm.discountAmt || 0;
      return params;
    },
    chkPresPrvdTypeCnt(gift, type) {
        let amt = 0;
        if (type === 'today' || type === 'parcel' || type === 'dawn') {
            amt = gift.promApplSbjItemList.map(each => each.sellAmt).reduce((p, c) => p + c, 0);
        } else if (type === 'mall') {
            amt = this.totAmt;
        }
      let cnt = 0;
      if (gift.presPrvdTypeCd === '01') { // 전체지급 시
        if (gift.promBeneZoneList) {
          for (let i = 0; i < gift.promBeneZoneList.length; i++) {
            if (gift.promBeneZoneList[i].beneApplRangeCd === '01') {
              cnt = Number(gift.promBeneZoneList[i].promPresFrgfList.length);
            } else if (gift.promBeneZoneList[i].beneApplRangeCd === '02') {
                if (type === 'today' || type === 'parcel' || type === 'dawn') {
                    cnt = Number(gift.promBeneZoneList[i].promPresFrgfList.length);
                } else if (amt >= Number(gift.promBeneZoneList[i].beneZoneBeginVal) && (amt <= Number(gift.promBeneZoneList[i].beneZoneEndVal) || Number(gift.promBeneZoneList[i].beneZoneEndVal) === 0)) {
                cnt = Number(gift.promBeneZoneList[i].promPresFrgfList.length);
              }
            }
          }
        }
      } else if (gift.presPrvdTypeCd === '02') { // 선착순
        if (gift.promBeneZoneList) {
          for (let i = 0; i < gift.promBeneZoneList.length; i++) {
            let tmpCnt = 0;
            if (gift.promBeneZoneList[i].promPresFrgfList) {
              for (let j = 0; j < gift.promBeneZoneList[i].promPresFrgfList.length; j++) {
                if (gift.promBeneZoneList[i].promPresFrgfList[j]) {
                  if (gift.promBeneZoneList[i].promPresFrgfList[j].applYn === 'Y') {
                      tmpCnt++;
                      cnt = tmpCnt;
                      break;
                  }
                }
              }
            }
          }
        }
      } else if (gift.presPrvdTypeCd === '03' && gift.presPrvdOptPosbQty > 0) { // 선택형
        let tmpCnt = 0;
        cnt = Number(gift.presPrvdOptPosbQty);
        if (gift.promBeneZoneList) {
          for (let i = 0; i < gift.promBeneZoneList.length; i++) {
            if (gift.promBeneZoneList[i].beneApplRangeCd === '01') {
              tmpCnt = Number(gift.promBeneZoneList[i].promPresFrgfList.length);
            } else if (gift.promBeneZoneList[i].beneApplRangeCd === '02') {
                if (type === 'today' || type === 'parcel' || type === 'dawn') {
                    tmpCnt = Number(gift.promBeneZoneList[i].promPresFrgfList.length);
                } else if (amt >= Number(gift.promBeneZoneList[i].beneZoneBeginVal) && (amt <= Number(gift.promBeneZoneList[i].beneZoneEndVal) || Number(gift.promBeneZoneList[i].beneZoneEndVal) === 0)) {
                tmpCnt = Number(gift.promBeneZoneList[i].promPresFrgfList.length);
              }
            }
          }
        }
        if (cnt > tmpCnt) {
          cnt = tmpCnt;
        }
      }
      return cnt;
    },
    getAmt() {
      this.todayAmt = 0;
      this.parcelAmt = 0;
      this.dawnAmt = 0;
      this.todayAmtMap = {'1': 0, '11': 0, '20': 0, 'ALL': 0};
      this.parcelAmtMap = {'1': 0, '11': 0, '20': 0, 'ALL': 0};
      this.dawnAmtMap = {'1': 0, '11': 0, '20': 0, 'ALL': 0};
      if (this.ordsItemList) {
        const ordsDelivGrpInfoList = this.ordsItemList.ordsDelivGrpInfoList;
        if (ordsDelivGrpInfoList && ordsDelivGrpInfoList.length > 0) {
          for (let i = 0; i < ordsDelivGrpInfoList.length; i++) {
            const ordsDelivSupplGrpInfoList = ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList;
            if (ordsDelivSupplGrpInfoList && ordsDelivSupplGrpInfoList.length > 0) {
              for (let j = 0; j < ordsDelivSupplGrpInfoList.length; j++) {
                const ordsItemInfoList = ordsDelivSupplGrpInfoList[j].ordsItemInfoList;
                const groupItem = this.groupBy(ordsItemInfoList, ['mallId', 'supplFirmCd', 'storId', 'delivTypeCd'], 'lastBeneSellAmt');
                groupItem.sort((a, b)=>b.lastBeneSellAmt - a.lastBeneSellAmt);
                if (ordsDelivSupplGrpInfoList[j].delivTypeCd === '01') {
                  this.todayAmt += ordsDelivSupplGrpInfoList[j].delivOrdSchedAmt;
                  this.todayAmtMap['1'] += ordsDelivSupplGrpInfoList[j].freshmallDelivAmt;
                  this.todayAmtMap['11'] += ordsDelivSupplGrpInfoList[j].dalisaldaDelivAmt;
                  this.todayAmtMap['20'] += ordsDelivSupplGrpInfoList[j].simplycookDelivAmt;
                  if (groupItem) {
                    this.todayOrder.mallId = groupItem[0].mallId;
                    this.todayOrder.supplFirmCd = groupItem[0].supplFirmCd;
                    this.todayOrder.storId = groupItem[0].storId;
                    this.todayOrder.delivTypeCd = groupItem[0].delivTypeCd;
                  }
                } else if (ordsDelivSupplGrpInfoList[j].delivTypeCd === '02') {
                  this.parcelAmt += ordsDelivSupplGrpInfoList[j].delivOrdSchedAmt;
                    this.parcelAmtMap['1'] += ordsDelivSupplGrpInfoList[j].freshmallDelivAmt;
                    this.parcelAmtMap['11'] += ordsDelivSupplGrpInfoList[j].dalisaldaDelivAmt;
                    this.parcelAmtMap['20'] += ordsDelivSupplGrpInfoList[j].simplycookDelivAmt;
                  if (groupItem) {
                    this.parcelOrder.mallId = groupItem[0].mallId;
                    this.parcelOrder.supplFirmCd = groupItem[0].supplFirmCd;
                    this.parcelOrder.storId = groupItem[0].storId;
                    this.parcelOrder.delivTypeCd = groupItem[0].delivTypeCd;
                  }
                } else if (ordsDelivSupplGrpInfoList[j].delivTypeCd === '04') {
                  this.dawnAmt += ordsDelivSupplGrpInfoList[j].delivOrdSchedAmt;
                    this.dawnAmtMap['1'] += ordsDelivSupplGrpInfoList[j].freshmallDelivAmt;
                    this.dawnAmtMap['11'] += ordsDelivSupplGrpInfoList[j].dalisaldaDelivAmt;
                    this.dawnAmtMap['20'] += ordsDelivSupplGrpInfoList[j].simplycookDelivAmt;
                  if (groupItem) {
                    this.dawnOrder.mallId = groupItem[0].mallId;
                    this.dawnOrder.supplFirmCd = groupItem[0].supplFirmCd;
                    this.dawnOrder.storId = groupItem[0].storId;
                    this.dawnOrder.delivTypeCd = groupItem[0].delivTypeCd;
                  }
                }
              }
            }
          }
          this.todayAmt = Math.max(this.todayAmt - this.totalDcAmt, 0);
          if (this.todayAmt === 0) {
            this.dawnAmt = Math.max(this.dawnAmt - this.totalDcAmt, 0);
          }
        }
      }
    },
    setDisAmt (gsNPointDcAmt, popRwdDcAmt, resPntForm, crcoEvntInfo, totalDcAmt) {
      this.gsNPointDcAmt = gsNPointDcAmt;
      this.popRwdDcAmt = popRwdDcAmt;
      this.resPntForm = resPntForm;
      this.crcoEvntInfo = crcoEvntInfo;
      this.totalDcAmt = totalDcAmt;
      this.getAmt();
    },
    groupBy (array, groups, valueKey) {
      const map = new Map;
      groups = [].concat(groups);
      return array.reduce((r, o) => {
          groups.reduce((m, k, i, { length }) => {
              let child;
              if (m.has(o[k])) return m.get(o[k]);
              if (i + 1 === length) {
                  child = Object
                      .assign(...groups.map(k => ({ [k]: o[k] })), { [valueKey]: 0 });
                  r.push(child);
              } else {
                  child = new Map;
              }
              m.set(o[k], child);
              return child;
          }, map)[valueKey] += +o[valueKey];
          return r;
      }, []);
    },
  },
  destroyed() {
  },
  mounted: function() {
    // if (this.ordsItemList != 0) {
      // this.giftDo();
    // }
  },
};
</script>
