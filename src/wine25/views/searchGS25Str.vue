<template>
  <div id="popupSearchWineStore" class="wrap-full-popup popup-full-wine25 wrap-wine25" role="dialog" aria-modal="true" :class="{'h100': 'h100' ? !this.tab.storeName : ''}">
    <div class="header-popup">
      <strong>수령점포 찾기</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <!-- START 수령점포 검색 -->
        <div class="wrap-map-nav">
          <div class="wrap-store-search-method">
            <ul ref="guList">
              <li class="list">
                <button id="tabStoreAddress" aria-controls="tab-contents1" :class="{active: this.tab.storeAddress}" @click="tabAction('storeAddress')">주소로 찾기</button>
              </li>
              <li class="list">
                <button id="tabStoreName" aria-controls="tab-contents2" :class="{active: this.tab.storeName}" @click="tabAction('storeName')">점포명찾기</button>
              </li>
            </ul>
            <div class="tab-content" ref="tabContents" tabIndex="0">
              <div id="tab-contents1" class="tab-contents" aria-labelledby="tabStoreAddress" v-show="this.tab.storeAddress">
                <ul class="wrap-select-address">
                    <li>
                      <button type="button" title="구 선택" class="btn-select-value" aria-haspopoup="dialog" :id="select.gu.selected"
                      :value="select.gu.selectedNm" @click="openSelectList('gu')">
                        <span>{{select.gu.selectedNm}}</span>
                      </button>
                      <div class="wrap-modal-select" role="dialog" aria-modal="true" v-if="select.gu.open" @click="openSelectList('gu')">
                        <ul class="list-address">
                          <li v-for="item in guList" v-bind:key="item.commCd">
                            <button type="button"
                            :id="item.commCd"
                            :value="item.commCdNm"
                             :class="{active :selectedComboGu(item.commCdNm)}" @click="changeSelectListGu('gu')">{{ item.commCdNm }}</button>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <button type="button" title="동 선택" class="btn-select-value" aria-haspopoup="dialog"
                      :id="select.dong.selected"
                      :value="select.dong.selectedNm" @click="openSelectList('dong')">
                        <span>{{select.dong.selectedNm}}</span>
                      </button>
                      <div class="wrap-modal-select" role="dialog" aria-modal="true" v-if="select.dong.open" @click="openSelectList('dong')">
                        <ul class="list-address type-scroll">
                          <li v-for="item in dongList" v-bind:key="item.twnCd">
                            <button type="button" :id="item.twnCd"
                            :value="item.twnNm"
                            :class="{active :selectedComboDong(item.twnCd)}"
                             @click="changeSelectListDong('dong')">{{item.twnNm}}</button>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
              </div>
              <div id="tab-contents2" class="tab-contents" aria-labelledby="tabStoreName" v-show="this.tab.storeName">
                <div class="wrap-search-name">
                  <input type="text" v-model="searchCondition" title="점포명 앞에 GS25를 제외하고 입력" placeholder="GS25 점포명을 입력하세요" />
                  <button type="button"  @click="searchConditionStr()"><span class="hidden">검색</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END 수령점포 검색 -->
        <!-- START 검색결과 -->
        <div class="wrap-store-search-result">
          <!-- START 주소로 찾기 -->
          <div class="wrap-store-spot">
            <div class="area-map">나와라 지도!!!!!!
              <!-- START 지도 API 영역 -->
<KakaoMap
    :appKey="appKey"
    :center.sync="center"
    :level.sync="level"
    :mapTypeId="mapTypeId"
    :libraries="libraries"
    @load="onLoad"
    style="width:100%;height:100%;"
/>
              <!-- END 지도 API 영역 -->
            </div>
              <!--
            <img src="@/wine25/assets/images/icon/icon_map_marker.png" style="position: absolute; top: 239px; left: 60%; width: 17px;height: 23px;">
            <div class="area-tip" style="position: absolute; top: 22%; left:22%;">
              <strong class="hidden">지도에서 선택한 점포</strong>
              <div class="tit">
                <span title="점포명">GS25논현파라곤점</span>
                <button type="button" class="btn-closed">
                  <span class="hidden">닫기</span>
                </button>
              </div>
              <div class="body">
                <p class="ly-desc">
                  <strong class="store-address" title="주소">서울시 강남구 역삼동 658</strong>
                  <em class="store-number" title="전화번호">02-1234-5678</em>
                </p>
              </div>
            </div>-->
          </div>
          <!-- END 주소로 찾기 -->
          <!-- START 점포명 찾기 -->
          <div class="area-store-list" v-if="this.tab.storeName">
            <!-- 점포명 찾기 - default -->
            <!-- <p class="area-store-inform">
              점포명 앞에 GS25를 제외하고<br />입력해주세요
            </p> -->
            <!-- 점포명 찾기 - 검색결과가 없을 경우 -->
            <!-- <p class="area-store-inform">
              <strong>검색된 GS25 점포가 없습니다.</strong>
              24시간 미운영등의 사유로 일부 점포는<br />와인 예약 서비스가 불가할 수 있습니다.
            </p> -->
            <!-- 점포명 찾기 - 검색결과가 있을 경우 -->
            <div class="store-list">
              <strong class="hidden">검색된 점포 목록</strong>
              <ul>
                <li v-for="item in strList" v-bind:key="item.cvsSiteCd">
                  <div class="list">
                    <div class="ly-inner">
                      <div class="content infrom">
                        <strong class="tit">{{item.cvsSiteNm}}</strong>
                        <address>{{item.cvsSiteAddr}}</address>
                      </div>
                      <div class="content location">
                        <button type="button" aria-haspopup="dialog" @click="popupinnerAction">지도보기</button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- END 점포명 찾기 -->
        </div>
        <!-- END 검색결과 -->
      </div>
    </div>
    <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
    <PopupWineStoreLocation v-if="popup.popupWineStoreLocation" @popupEvent="popupinnerAction" />
  </div>
</template>

<script>
import PopupWineStoreLocation from '@/wine25/components/PopupWineStoreLocation'; // 팝업 - 지도보기
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import Config from "@/common/Config.js";
import KakaoMap from "@/wine25/views/components/KakaoMap";
export default {
  name: "PopupSearchWineStore",
  mixins: [LayerPopupMixin],
  components: {
    PopupWineStoreLocation,
    KakaoMap,
  },
    props: {
      type: null,
      paramY: {type: Number, default: Config.address.home.gps.y, required: false},
      paramX: {type: Number, default: Config.address.home.gps.x, required: false}
    },
  data() {
    return {
      appKey: Config.address.kakao.appKey,
        center: {lat: 0, lng: 0},
        level: 3,
        mapTypeId: KakaoMap.MapTypeId.NORMAL,
        libraries: [],
        mapObject: null,
        address: {
          jibun: undefined,
          road: undefined,
          zonecode: undefined
        },
      guList: [],
      dongList: [],
      strList: [],
      searchCondition: '',
      searchYn: false,
      tab: {
        storeAddress: false,
        storeName: false,
      },
      select: {
        gu: {
          open: false,
          selected: '1168',
          selectedNm: '서울시 강남구',
        },
        dong: {
          open: false,
          selected: '',
          selectedNm: '지역을 선택해 주세요',
        }
      },
      popup: {
        popupWineStoreLocation: false
      }
    };
  },
  methods: {
     // 팝업 활성/비활성
    popupinnerAction() {
      this.popup.popupWineStoreLocation = !this.popup.popupWineStoreLocation;
    },
    popupAction() {
      this.$emit('popupEvent', 'popupSearchWineStore');
      this.modalActiveEvent('popupSearchWineStore');
    },
    // tab
    tabAction(type) {
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.$refs.tabContents.focus();
    },
    // select 여/ 닫음
    openSelectList(type) {
      if (!this.select[type].open) {
        Object.keys(this.select).map( (select) => {
          this.select[select].open = false;
        });
      }
      this.select[type] = Object.assign({}, this.select[type], {open: !this.select[type].open});
    },
    // select option 변경
    changeSelectListGu(type) {
      event.stopPropagation();
      const $target = event.currentTarget;
      const changed = $target.getAttribute('id');
      const changedNm = $target.getAttribute('value');
      this.select[type].selected = changed;
      this.select[type].selectedNm = changedNm;
      this.select[type] = Object.assign({}, this.select[type], {open: false, selected: this.select[type].selected, selectedNm: this.select[type].selectedNm, active: this.select[type].active});
      ApiUtils.post('/fo/cm/searchGs25/dong-search', {
            twnCd: changed,
          }).then(res => {
            console.log(res.data);
            if (res.data === null) {
            } else {
              this.dongList = res.data.data;
            }
          });
    },
    changeSelectListDong(type) {
      event.stopPropagation();
      const $target = event.currentTarget;
      const changed = $target.getAttribute('value');
      const changedNm = $target.getAttribute('value');
      this.select[type].selected = changed;
      this.select[type].selectedNm = changedNm;
      this.select[type] = Object.assign({}, this.select[type], {open: false, selected: this.select[type].selected, selectedNm: this.select[type].selectedNm, active: this.select[type].active});
      this.strList = null;
      this.searchYn = false;
      this.searchStr(changed);
    },
    selectedComboGu(comboValue) {
      if (this.select.gu.selected == comboValue) {
        return false;
      } else {
        return false;
      }
    },
    selectedComboDong(comboValue) {
      if (this.select.gu.selected == comboValue) {
        return false;
      } else {
        return false;
      }
    },
    searchConditionStr() {
      this.strList = null;
      this.searchYn = true;
      this.searchStr(null);
    },
    searchStr(twnCd) {
      ApiUtils.post('/fo/cm/searchGs25/str-search', {
            twnCd: twnCd,
            strNm: this.searchCondition,
          }).then(res => {
            console.log(res.data);
            if (res.data === null) {
            } else {
              this.strList = res.data.data;
            }
          });
    },
      onLoad (map, address) {
        this.mapObject = map;
        this.address = address;
      },
  },
    components: {KakaoMap},
    created() {
      this.center ={lat: this.paramY, lng: this.paramX};
    },
  mounted: async function() {
    // this.modalActiveEvent('popupSearchWineStore');
    ApiUtils.get('/fo/cm/commcdmgnt/common-codes', {
      commGrpCd: 'SS0075',
    })
      .then(res => {
          console.log(res.data);
        if (res.data === null) {
        } else {
          this.guList = res.data.data;
        }
      });
  }
};
</script>

<style>

</style>
