<!--
views/od/SC-FO-PA-GS-MP-006
-->
<template>
  <div id="popupPickupShop" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupPickupShop}, siteClass]">
  <!--  <div id="popupPickupShop" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupPickupShop}"> -->
    <div v-if="defaultFlag">
      <div class="header-popup">
        <strong>GS THE FRESH 픽업 매장</strong>
      </div>
      <div class="full-popup-body">
        <div class="inner-full-popup">
          <!-- START : 검색영역 -->
          <div class="pickup-search">
            <span class="txt-use">
              <input type="text" v-model="keyword" id="keyword" name="keyword" value="" class="inp-txt" placeholder="장소명, 지번, 도로명으로 검색" title="픽업 매장 검색어" @keyup.enter="searchStor()"/>
              <button class="btn-reset" aria-label="검색어 초기화" v-if="this.keyword" @click="clearKeyWord"><span class="hidden">검색어 초기화</span></button>
              <button type="button" class="btn-search" @click="searchStor()"><span class="hidden">검색</span></button>
            </span>
          </div>
          <!-- END : 검색영역 -->
          <div class="delivery-map" id="delivMap"></div>
          <!-- START : 하단 고정 버튼 (퀵메뉴) -->
          <div class="btn-fixed pickup-pop" :class="{open : this.showMore}">
            <div class="pickup-wrap">
              <!-- START : 추천 매장 -->
              <div class="rec-store-wrap" id="delivStrInfo" v-for="delivStrInfo in delivStrList" v-bind:key="delivStrInfo.pkuppId" :value="delivStrInfo.pkuppId" @click="selectedStore">
                <dl class="pickup-store">
                  <dt>추천 매장</dt>
                  <dd>기본주소 : {{delivStrInfo.pkuppStnmAddr}} {{delivStrInfo.pkuppStnmDtlAddr}}</dd>
                </dl>
                <div class="pickup-store-info">
                  <div class="store-info">
                    <p class="store-name">{{delivStrInfo.pkuppNm}}</p>
                    <p class="store-addr"><span class="code">[{{delivStrInfo.pkuppZipcd}}]</span> {{delivStrInfo.pkuppStnmAddr}} {{delivStrInfo.pkuppStnmDtlAddr}}</p>
                    <p><span class="ico-tel"><a v-bind:href="'tel:' + delivStrInfo.pkuppTelNo" title="전화걸기">{{delivStrInfo.pkuppTelNo}}</a></span></p>
                    <button type="button" class="btn-border btn-change-address" v-bind:title="delivStrInfo.pkuppNm" @click="strInfoChoiceEvent(delivStrInfo)">선택</button>
                  </div>
                </div>
              </div>
              <!-- END : 추천 매장 -->
              <!-- START : 가까운 매장 -->
              <div class="near-store-wrap">
                <dl class="pickup-store">
                  <dt>픽업 가능 매장</dt>
                  <dd class="ico-alert2" @click="gpsIpSearch">현재 위치에서 가까운 매장을 확인해보세요</dd>
                </dl>
                <ul class="pickup-store-list scroll-area">
                  <li class="pickup-store-info" id="strInfo" v-for="strInfo in strList" v-bind:key="strInfo.pkuppId" :value="strInfo.pkuppId" @click="selectedStore">
                    <div class="store-info">
                      <p class="store-name">{{strInfo.pkuppNm}} <span class="strore-distance">{{strInfo.distance}} M</span></p>
                      <p class="store-addr"><span class="code">[{{strInfo.pkuppZipcd}}]</span> {{strInfo.pkuppStnmAddr}} {{strInfo.pkuppStnmDtlAddr}}</p>
                      <p><span class="ico-tel"><a v-bind:href="'tel:' + strInfo.pkuppTelNo" title="전화걸기">{{strInfo.pkuppTelNo}}</a></span></p>
                      <button type="button" class="btn-border btn-change-address" @click="strInfoChoiceEvent(strInfo)">선택</button>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- END : 가까운 매장 -->
            </div>
            <div class="wrap-btn-option-popup" :class="{open : this.showMore}">
              <button class="btn btn-option-popup" @click="popupShowMore">
                <span class="hidden">픽업 매장 더보기</span>
              </button>
            </div>
          </div>
          <!-- END : 하단 고정 버튼 (퀵메뉴) -->
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction">
        <span class="hidden">닫기</span>
      </button>
    </div>
    <div v-if="srchRstlFlag">
      <div class="header-popup">
        <strong>GS THE FRESH 픽업 매장</strong>
      </div>
      <div class="full-popup-body">
        <div class="inner-full-popup">
          <!-- START : 검색 -->
          <div class="pickup-search">
            <span class="txt-use">
              <input type="text" v-model="keyword" id="resultKeyword" name="keyword" value="" class="inp-txt" placeholder="장소명, 지번, 도로명으로 검색" title="픽업 매장 검색어" @keyup.enter="searchStor()">
              <button class="btn-reset" aria-label="검색어 초기화" v-if="this.keyword" @click="clearKeyWord"><span class="hidden">검색어 초기화</span></button>
              <button type="button" class="btn-search" @click="searchStor()"><span class="hidden">검색</span></button>
            </span>
          </div>
          <!-- END : 검색 -->
          <div class="delivery-map" id="srchDelivMap"></div>
          <!-- START : 하단 고정 버튼 (퀵메뉴) -->
          <div class="btn-fixed pickup-pop" :class="{open : this.showMore}">
            <div class="pickup-wrap">
              <!-- START : 검색 -->
              <dl class="pickup-store search">
                <dt>검색결과</dt>
                <dd><button type="button" class="btn-rec-shop" @click="toggleStorPage()">추천매장보기</button></dd>
              </dl>
              <div class="near-store-wrap">
                <div class="near-store-wrap" v-show="delivStrSrchList.length == 0">
                  <div class="no-data">
                    <p class="no-data-txt">검색결과가 없습니다.</p>
                    <p>##센터에서 배송되는 권역과 동일 하지 않은 경우<br> 리스트가 노출되지 않습니다.</p>
                  </div>
                  <!-- START : 추천 매장 -->
                  <!--
                  <div class="rec-store-wrap" v-for="delivStrInfo in delivStrList" v-bind:key="delivStrInfo.pkuppZipcd" >
                    <dl class="pickup-store">
                      <dt>추천 매장</dt>
                      <dd>기본주소 : 서울시 강남구 강남대로54 해송빌딩4층</dd>
                    </dl>
                    <div class="pickup-store-info">
                      <div class="store-info">
                        <p class="store-name">{{delivStrInfo.pkuppNm}}</p>
                        <p class="store-addr">{{delivStrInfo.pkuppStnmAddr}} {{delivStrInfo.pkuppStnmDtlAddr}}</p>
                        <p><span class="ico-tel"><a v-bind:href="delivStrInfo.pkuppTelNo" title="전화걸기">{{delivStrInfo.pkuppTelNo}}</a></span></p>
                        <button type="button" class="btn-border btn-change-address" v-bind:title="delivStrInfo.pkuppNm" @click="strInfoChoiceEvent(delivStrInfo)">선택</button>
                      </div>
                    </div>
                  </div>
                  -->
                  <!-- END : 추천 매장 -->
                  <dl class="pickup-store">
                    <dt>픽업 가능 매장</dt>
                    <dd class="ico-alert2" @click="gpsIpSearch">현재 위치에서 가까운 매장을 확인해보세요</dd>
                  </dl>
                  <ul class="pickup-store-list scroll-area">
                    <li class="pickup-store-info" id="strInfoSrch" v-for="strInfo in strList" v-bind:key="strInfo.pkuppId" :value="strInfo.pkuppId" @click="selectedStore">
                      <div class="store-info">
                        <p class="store-name">{{strInfo.pkuppNm}} <span class="strore-distance">{{strInfo.distance}} M</span></p>
                        <p class="store-addr"><span class="code">[{{strInfo.pkuppZipcd}}]</span> {{strInfo.pkuppStnmAddr}} {{strInfo.pkuppStnmDtlAddr}}</p>
                        <p><span class="ico-tel"><a v-bind:href="'tel:' + strInfo.pkuppTelNo" title="전화걸기">{{strInfo.pkuppTelNo}}</a></span></p>
                        <button type="button" class="btn-border btn-change-address" @click="strInfoChoiceEvent(strInfo)">선택</button>
                      </div>
                    </li>
                  </ul>
                </div>
                <ul class="pickup-store-list scroll-area" v-show="delivStrSrchList.length > 0">
                  <li class="pickup-store-info" id="delivStrSrchInfo" v-for="delivStrSrchInfo in delivStrSrchList" v-bind:key="delivStrSrchInfo.pkuppId" :value="delivStrSrchInfo.pkuppId" @click="selectedStore">
                    <div class="store-info">
                      <p class="store-name">{{delivStrSrchInfo.pkuppNm}}<span class="strore-distance">{{delivStrSrchInfo.distance}} M</span></p>
                      <p class="store-addr"><span class="code">[{{delivStrSrchInfo.pkuppZipcd}}]</span> {{delivStrSrchInfo.pkuppStnmAddr}} {{delivStrSrchInfo.pkuppStnmDtlAddr}}</p>
                      <p><span class="ico-tel"><a v-bind:tel="'tel:' + delivStrSrchInfo.pkuppTelNo" title="전화걸기">{{delivStrSrchInfo.pkuppTelNo}}</a></span></p>
                      <button type="button" class="btn-border btn-change-address" title="GS THE FRESH  강남한티점" @click="strInfoChoiceEvent(delivStrSrchInfo)">선택</button>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- END : 검색 -->
            </div>
            <div class="wrap-btn-option-popup" :class="{open : this.showMore}">
              <button class="btn btn-option-popup" @click="popupShowMore">
                <span class="hidden">픽업 매장 더보기</span>
              </button>
            </div>
          </div>
          <!-- END : 하단 고정 버튼 (퀵메뉴) -->
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction">
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
</template>


<script>
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import postscribe from 'postscribe';
import kakaoMap from '@/common/od/kakaoMap';
import CookieUtils from '@/common/CookieUtils';

export default {
  props: {
    ordId: String,
    ordsDlvpSeqno: Number,
    ordsDlvpInfo: Object,
    ordsItemList: Object,
    strInfo: Object,
  },
  name: "PopupPickupShop",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: 'GS THE FRESH 픽업 매장 < %s'
  },
  data() {
    return {
      showMore: false,
      strList: [],
      delivStrList: [],
      delivStrSrchList: [],
      keyword: '',
      defaultFlag: true,
      srchRstlFlag: false,
      mapList: [],
      mallIdList: [],
      curPosition: {
        posit: {},
        errMsg: '',
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupShowMore() { // 더보기
      if (this.showMore === false) {
        this.showMore = true;
      } else {
        this.showMore = false;
      }
    },
    popupAction() { // 닫기
      this.$emit('popupEvent', 'popupPickupShop');
    },
    async init() {
      const params = {
        ordId: this.ordId,
        keyword: '', // 인접점포 조회위한 파라메터
        zipCd: this.ordsDlvpInfo.adrsZipcd,
        mallIdList: this.mallIdList,
      };
      const response = await ApiUtils.post('/fo/od/ordsmgnt/gs-supermarket-pickup-list', JSON.stringify(params));
      this.strList = response.data.data.ordsPkupSvcInfoList; // 픽업가능매장
      console.log("strList ==>>", this.strList);
      if (this.strList != null && this.strList.length > 0) {
        this.getDistance('str', this.strList); // 수퍼리스트 좌표로 변환하여 거리 set
      } else {
        kakaoMap.drawMapMulti(this.mapList, "delivMap");
      }
    },
    async searchStor() { // 검색
      const params = {
        ordId: this.ordId,
        keyword: this.keyword,
        zipCd: this.ordsDlvpInfo.adrsZipcd,
        mallIdList: this.mallIdList,
      };
      const response = await ApiUtils.post('/fo/od/ordsmgnt/gs-supermarket-pickup-list', JSON.stringify(params));
      this.strList = response.data.data.ordsPkupSvcInfoList; // 픽업가능매장
      this.getDistance('str', this.strList); // 수퍼리스트 좌표로 변환하여 거리 set
      this.delivStrSrchList = response.data.data.ordsPkupSrchComSvcInfoList; // 검색
      this.getDistance('srchStr', this.delivStrSrchList); // 수퍼리스트 좌표로 변환하여 거리 set
      this.defaultFlag=false;
      this.srchRstlFlag=true;
    },
    strInfoChoiceEvent: function(pkupStrInfo) {
      event.stopPropagation();
      this.updateOrdsPkupDlvp(pkupStrInfo); // 배송지 정보 업데이트
    },
    async updateOrdsPkupDlvp(pkupStrInfo) {
      // 픽업정보 주문서배송지 테이블에 업데이트
      pkupStrInfo.ordId = this.ordId;
      pkupStrInfo.ordsDlvpSeqno = this.ordsDlvpSeqno;
      pkupStrInfo.pkuppTypeCd = '2'; // 1:점포, 2:수퍼
      pkupStrInfo.itemRcptTypeCd = 'S';
      // pkupStrInfo.delivPolcId = this.ordsDlvpInfo.delivPolcId;

      const response = await ApiUtils.put('/fo/od/ordsmgnt/gs-supermarket-pickup-service', pkupStrInfo);
      this.$emit('strInfoChoiceEvent', pkupStrInfo);
      this.popupAction();
    },
    toggleStorPage() {
      this.defaultFlag=true;
      this.srchRstlFlag=false;
      this.init();
    },
    selectedStore() {
      this.mapList = [];
      const target = event.currentTarget;
      if (target.id === "delivStrSrchInfo") {
        this.mapList.push(this.delivStrSrchList.find(item=>item.pkuppId == target.value));
        kakaoMap.drawMapMulti(this.mapList, 'srchDelivMap');
      } else if (target.id === "delivStrInfo") {
        const delivStrInfo = document.querySelector('#delivStrInfo');
        this.mapList.push(this.delivStrList.find(item=>item.pkuppId == delivStrInfo.getAttribute('value')));
        kakaoMap.drawMapMulti(this.mapList, "delivMap");
      } else if (target.id === "strInfo") {
        this.mapList.push(this.strList.find(item=>item.pkuppId == target.value));
        kakaoMap.drawMapMulti(this.mapList, 'delivMap');
      } else if (target.id === "strInfoSrch") {
        this.mapList.push(this.strList.find(item=>item.pkuppId == target.value));
        kakaoMap.drawMapMulti(this.mapList, 'srchDelivMap');
      }
      if (this.showMore === true) {
        this.popupShowMore();
      }
    },
    clearKeyWord() {
      this.keyword = '';
    },
    getDistance(type, strList) {
      const that = this;
      // const adrsInfo = this.ordsDlvpInfo.adrsStnmBaseAddr + ' ' + this.ordsDlvpInfo.adrsStnmDtlAddr; // 배송지 주소
      const adrsInfo = this.ordsDlvpInfo.adrsStnmBaseAddr; // 배송지 주소
      if (adrsInfo == null) {
        console.log("배송지정보가 존재하지 않습니다.");
        this.popupAction();
        return;
      }
      kakaoMap.getDistance(adrsInfo, strList, this.curPosition, function() {
        if (type === 'str') {
          that.delivStrList = [];
          if (that.strInfo) { // 선택된 매장이 존재하면 추천 매장에 출력
            that.delivStrList = [];
            that.delivStrList.push(that.strInfo);
          } else {
            that.delivStrList.push(that.strList[0]);
            // that.delivStrList.push(that.findMinStr(that.strList));
          }
        }
        that.mapList = [];
        if (that.defaultFlag) {
          if (that.delivStrList.length > 0) {
            that.mapList.push(that.delivStrList[0]);
          } else if (that.strList.length > 0) {
            that.mapList.push(that.strList[0]);
          }
          kakaoMap.drawMapMulti(that.mapList, "delivMap");
        } else if (that.srchRstlFlag) {
          if (that.delivStrSrchList.length === 0) {
            that.mapList.push(that.strList[0]);
          } else {
            that.mapList.push(that.delivStrSrchList[0]);
          }
          kakaoMap.drawMapMulti(that.mapList, 'srchDelivMap');
        }
      });
    },
    gpsIpSearch() {
      // TO-DO : 앱에서 접근 시 앱의 GPS 기능으로 분기
      kakaoMap.gpsIpSearch(this.curPosition);
      if (this.defaultFlag) {
        this.init();
      }
      if (this.srchRstlFlag) {
        this.searchStor();
      }
    },
    findMinStr(strList) {
      let tmpIdx = 0;
      if (strList.length > 0) {
        let min = strList[0].distance?strList[0].distance:0;
        for (let i = 0; i < strList.length; i++) {
          if (Number(min) > Number(strList[i].distance)) {
            min = strList[i].distance;
            tmpIdx = i;
          }
        }
      }
      return strList[tmpIdx];
    },
  },
  mounted() {
    this.mallIdList = [];
    if (this.ordsItemList.ordsDelivGrpInfoList) {
      for (let i = 0; i < this.ordsItemList.ordsDelivGrpInfoList.length; i++) {
        if (this.ordsItemList.ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList) {
          for (let j = 0; j < this.ordsItemList.ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList.length; j++) {
            if (this.ordsItemList.ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList[j].ordsItemInfoList) {
              for (let k = 0; k < this.ordsItemList.ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList[j].ordsItemInfoList.length; k++) {
                this.mallIdList.push(this.ordsItemList.ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k].mallId);
              }
            }
          }
        }
      }
    }
    postscribe('#delivMap', '<script src="//dapi.kakao.com/v2/maps/sdk.js?autoload=true&appkey=eba6b90fece7e24e6b01d50c1dc3cd82&libraries=services"><\/script>');
    this.init();
  }
};
</script>
