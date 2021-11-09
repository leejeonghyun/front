<template>
  <!-- TODO: 최상위 wrap-wine25 class 누락 수정 -->
  <div id="popupSearchWineStore" class="wrap-full-popup popup-full-wine25 wrap-wine25" role="dialog" aria-modal="true" :class="{'h100': 'h100' ? !this.tab.storeName : ''}">
    <div class="header-popup">
      <strong>수령점포 찾기</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <!-- START 수령점포 검색 -->
        <div class="wrap-map-nav">
          <div class="wrap-store-search-method">
            <ul ref="tabList">
              <li class="list">
                <button id="tabStoreAddress" :class="{active: this.tab.storeAddress}" aria-controls="tab-contents1" @click="tabAction('storeAddress')">주소로 찾기</button>
              </li>
              <li class="list">
                <button id="tabStoreName" :class="{active: this.tab.storeName}" aria-controls="tab-contents2" @click="tabAction('storeName')">점포명찾기</button>
              </li>
            </ul>
            <div class="tab-contents" ref="tabContents" tabIndex="0">
              <div id="tab-contents1" class="tabcontents" aria-labelledby="tabStoreAddress" v-show="this.tab.storeAddress">
                <ul class="wrap-select-address">
                    <li>
                      <button type="button" title="구 선택" class="btn-select-value" aria-haspopoup="dialog" :value="select.gu.selected" @click="openSelectList('gu')">
                        <span>{{select.gu.selected}}</span>
                      </button>
                      <div class="wrap-modal-select" role="dialog" aria-modal="true" v-if="select.gu.open" @click="openSelectList('gu')">
                        <ul class="list-address">
                          <li>
                            <button type="button" value="서울시 강남구" :class="{active : this.select.gu.selected === '서울시 강남구'}" @click="changeSelectList('gu')">서울시 강남구</button>
                          </li>
                          <li>
                            <button type="button" value="서울시 서초구" :class="{active : this.select.gu.selected === '서울시 서초구'}"  @click="changeSelectList('gu')">서울시 서초구</button>
                          </li>
                          <li>
                            <button type="button" value="서울시 송파구" :class="{active : this.select.gu.selected === '서울시 송파구'}"  @click="changeSelectList('gu')">서울시 송파구</button>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <button type="button" title="동 선택" class="btn-select-value" aria-haspopoup="dialog" :value="select.dong.selected" @click="openSelectList('dong')">
                        <span>{{select.dong.selected}}</span>
                      </button>
                      <div class="wrap-modal-select" role="dialog" aria-modal="true" v-if="select.dong.open" @click="openSelectList('dong')">
                        <ul class="list-address type-scroll">
                          <li>
                            <button type="button" value="개포동" :class="{active : this.select.dong.selected === '개포동'}" @click="changeSelectList('dong')">개포동</button>
                          </li>
                          <li>
                            <button type="button" value="논현동" :class="{active : this.select.dong.selected === '논현동'}" @click="changeSelectList('dong')">논현동</button>
                          </li>
                          <li>
                            <button type="button" value="도곡동" :class="{active : this.select.dong.selected === '도곡동'}" @click="changeSelectList('dong')">도곡동</button>
                          </li>
                          <li>
                            <button type="button" value="삼성동" :class="{active : this.select.dong.selected === '삼성동'}" @click="changeSelectList('dong')">삼성동</button>
                          </li>
                          <li>
                            <button type="button" value="세곡동" :class="{active : this.select.dong.selected === '세곡동'}" @click="changeSelectList('dong')">세곡동</button>
                          </li>
                          <li>
                            <button type="button" value="수서동" :class="{active : this.select.dong.selected === '수서동'}" @click="changeSelectList('dong')">수서동</button>
                          </li>
                          <li>
                            <button type="button" value="신사동" :class="{active : this.select.dong.selected === '신사동'}" @click="changeSelectList('dong')">신사동</button>
                          </li>
                          <li>
                            <button type="button" value="압구정동" :class="{active : this.select.dong.selected === '압구정동'}" @click="changeSelectList('dong')">압구정동</button>
                          </li>
                          <li>
                            <button type="button" value="역삼동" :class="{active : this.select.dong.selected === '역삼동'}" @click="changeSelectList('dong')">역삼동</button>
                          </li>
                          <li>
                            <button type="button" value="율현동" :class="{active : this.select.dong.selected === '율현동'}" @click="changeSelectList('dong')">율현동</button>
                          </li>
                          <li>
                            <button type="button" value="일원동" :class="{active : this.select.dong.selected === '일원동'}" @click="changeSelectList('dong')">일원동</button>
                          </li>
                          <li>
                            <button type="button" value="자곡동" :class="{active : this.select.dong.selected === '자곡동'}" @click="changeSelectList('dong')">자곡동</button>
                          </li>
                          <li>
                            <button type="button" value="청담동" :class="{active : this.select.dong.selected === '서울시 송파구'}" @click="changeSelectList('dong')">청담동</button>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
              </div>
              <div id="tab-contents2" class="tabcontents" aria-labelledby="tabStoreName" v-show="this.tab.storeName">
                <div class="wrap-search-name">
                  <input type="text" title="점포명 앞에 GS25를 제외하고 입력" placeholder="GS25 점포명을 입력하세요" />
                  <button type="button"><span class="hidden">검색</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END 수령점포 검색 -->
        <!-- START 검색결과 -->
        <div class="wrap-store-search-result">
          <!-- START 주소로 찾기 -->
          <div class="wrap-store-spot" v-if="!this.tab.storeName">
            <div class="area-map">
              <!-- START 지도 API 영역 -->
              <img src="@/wine25/assets/images/_temp/img_map.jpg">
              <!-- END 지도 API 영역 -->
            </div>
            <img src="@/wine25/assets/images/icon/icon_map_marker.png" style="position: absolute; top: 239px; left: 60%; width: 17px;height: 23px;"><!-- 마크 아이콘 - 지도 커스텀시 이 마크 아이콘을 사용할 경우 이미지 경로, width, height 값 참고 -->
            <div class="area-tip" style="position: absolute; top: 22%; left:22%;"><!-- 툴 팁 레이아웃 - 지도 커스텀시 이 툴 팁을 사용할 경우 클래스 명 적용 -->
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
            </div>
          </div>
          <!-- END 주소로 찾기 -->
          <!-- START 점포명 찾기 -->
          <div class="area-store-list" v-if="this.tab.storeName">
            <!-- 점포명 찾기 - default -->
            <p class="area-store-inform">
              점포명 앞에 GS25를 제외하고<br />입력해주세요
            </p>
            <!-- 점포명 찾기 - 검색결과가 없을 경우 -->
            <p class="area-store-inform">
              <strong>검색된 GS25 점포가 없습니다.</strong>
              24시간 미운영등의 사유로 일부 점포는<br />와인 예약 서비스가 불가할 수 있습니다.
            </p>
            <!-- 점포명 찾기 - 검색결과가 있을 경우 -->
            <!-- <div class="store-list">
              <strong class="hidden">검색된 점포 목록</strong>
              <ul>
                <li>
                  <div class="list">
                    <div class="ly-inner">
                      <div class="content infrom">
                        <strong class="tit">GS25강남역삼점</strong>
                        <address>서울 강남구 역삼동 690-29번지 상가동 지하1층 2호</address>
                      </div>
                      <div class="content location">
                        <button type="button" aria-haspopup="dialog" @click="popupinnerAction">지도보기</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="list">
                    <div class="ly-inner">
                      <div class="content infrom">
                        <strong class="tit">GS25강남역삼점</strong>
                        <address>서울 강남구 역삼동 690-29번지 상가동 지하1층 2호</address>
                      </div>
                      <div class="content location">
                        <button type="button" aria-haspopup="dialog" @click="popupinnerAction">지도보기</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="list">
                    <div class="ly-inner">
                      <div class="content infrom">
                        <strong class="tit">GS25강남역삼점</strong>
                        <address>서울 강남구 역삼동 690-29번지 상가동 지하1층 2호</address>
                      </div>
                      <div class="content location">
                        <button type="button" aria-haspopup="dialog" @click="popupinnerAction">지도보기</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="list">
                    <div class="ly-inner">
                      <div class="content infrom">
                        <strong class="tit">GS25강남역삼점</strong>
                        <address>서울 강남구 역삼동 690-29번지 상가동 지하1층 2호</address>
                      </div>
                      <div class="content location">
                        <button type="button" aria-haspopup="dialog" @click="popupinnerAction">지도보기</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="list">
                    <div class="ly-inner">
                      <div class="content infrom">
                        <strong class="tit">GS25강남역삼점</strong>
                        <address>서울 강남구 역삼동 690-29번지 상가동 지하1층 2호</address>
                      </div>
                      <div class="content location">
                        <button type="button" aria-haspopup="dialog" @click="popupinnerAction">지도보기</button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div> -->
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
export default {
  name: "PopupSearchWineStoreResult",
  mixins: [LayerPopupMixin],
  components: {
    PopupWineStoreLocation,
  },
  data() {
    return {
      tab: {
        storeAddress: false,
        storeName: true,
      },
      select: {
        gu: {
          open: false,
          selected: '서울시 강남구',
        },
        dong: {
          open: false,
          selected: '지역을 선택해 주세요',
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
      // this.$refs.tabContents.focus(); // 9월 수정 삭제
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
    changeSelectList(type) {
      event.stopPropagation();
      const changed = event.currentTarget.getAttribute('value');
      this.select[type].selected = changed;
      this.select[type] = Object.assign({}, this.select[type], {open: false, selected: this.select[type].selected});
    }
  },
  mounted() {
    this.modalActiveEvent('popupSearchWineStore');
  }
};
</script>

<style>

</style>
