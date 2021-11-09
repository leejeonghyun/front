<template>
  <!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 팝업을 호출하는 페이지 안 최상위 요소에 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
  <transition name="searchbar"
    v-on:beforeEnter="searchBeforeEnter"
    v-on:enter="searchbarEnter"
    v-on:after-enter="searchbarAfterEnter"
    v-on:leave="searchbarLeave">
    <div id="popupSearch" v-if="searchbarActive" class="wrap-search-layer" role="dialog" aria-modal="true" :class="{active : searchbarActive}" tabindex="0">
      <div class="layer-bg" @click="searchbarCloseAction"></div>
      <h2 class="hidden">검색어 입력 팝업</h2>
      <div class="inner-search-layer">
        <div class="wrap-searchbar">
          <button class="btn-searchbar-prev">
            <span class="hidden">뒤로가기</span>
          </button>
          <div class="wrap-input search">
            <label for="search-input" class="hidden">검색어 입력</label>
            <input id="search-input" type="text" placeholder="1+1 뼈로가는칼슘치즈 4,850원">
            <button class="btn-reset">
              <span class="hidden">검색어 초기화</span>
            </button>
          </div>
          <button class="btn-searchbar-search">
            <span class="hidden">검색</span>
          </button>
        </div>
        <div class="search-content">
          <div class="wrap-recommend-search">
            <h3 class="hidden">추천 검색어</h3>
            <swiper :options="swiperOptionScrollX">
              <swiper-slide>
                <button>우유</button>
              </swiper-slide>
              <swiper-slide>
                <button>두부</button>
              </swiper-slide>
              <swiper-slide>
                <button>유기농계란</button>
              </swiper-slide>
              <swiper-slide>
                <button>감바스알아히요</button>
              </swiper-slide>
              <swiper-slide>
                <button>간편식</button>
              </swiper-slide>
              <swiper-slide>
                <button>그녀의빵공장</button>
              </swiper-slide>
            </swiper>
          </div>
          <div class="wrap-search-slide">
            <!-- 4월수정 START : 슬라이드 수정 - options 값, pagination 변경-->
            <swiper :options="swiperOption" ref="swiperSearch">
              <swiper-slide>
                <h4>최근 검색어</h4>
                <!-- START : 최근 검색어 자동 저장 OFF -->
                <!-- <div class="inner-search-slide scroll-area">
                  <div class="auto-save-off">
                    <strong>최근 검색어 자동 저장 기능이 꺼져 있습니다.</strong>
                    <p>
                      '자동저장 켜기'를 하면<br/>검색한 이력을 확인하여, 편하게 검색 하실 수 있습니다.
                    </p>
                  </div>
                </div> -->
                <!-- END : 최근 검색어 자동 저장 OFF -->
                <!-- START : 최근 검색 내역 없을 때 / 4월 수정 : 마침표 삭제 -->
                <!-- <div class="inner-search-slide scroll-area">
                  <NoList NoListText="최근 검색 내역이 없습니다" :ListType="'search-history'" />
                </div> -->
                <!-- END : 최근 검색 내역 없을 때 -->
                <!-- START : 최근 검색어 -->
                <div class="inner-search-slide scroll-area">
                  <ul>
                    <li>
                      <span>버섯</span>
                      <button class="btn-icon-del"><span class="hidden">삭제</span></button>
                    </li>
                    <li>
                      <span>감바스알아히요</span>
                      <button class="btn-icon-del"><span class="hidden">삭제</span></button>
                    </li>
                    <li>
                      <span>유기농사과</span>
                      <button class="btn-icon-del"><span class="hidden">삭제</span></button>
                    </li>
                    <li>
                      <span>풀무원 흑당달콤카스테라</span>
                      <button class="btn-icon-del"><span class="hidden">삭제</span></button>
                    </li>
                    <li>
                      <span>사과</span>
                      <button class="btn-icon-del"><span class="hidden">삭제</span></button>
                    </li>
                    <li>
                      <span>무방부제</span>
                      <button class="btn-icon-del"><span class="hidden">삭제</span></button>
                    </li>
                    <li>
                      <span>마늘</span>
                      <button class="btn-icon-del"><span class="hidden">삭제</span></button>
                    </li>
                    <li>
                      <span>삼계탕</span>
                      <button class="btn-icon-del"><span class="hidden">삭제</span></button>
                    </li>
                    <li>
                      <span>사탕</span>
                      <button class="btn-icon-del"><span class="hidden">삭제</span></button>
                    </li>
                    <li>
                      <span>요거트</span>
                      <button class="btn-icon-del"><span class="hidden">삭제</span></button>
                    </li>
                  </ul>
                </div>
                <!-- END : 최근 검색어 -->
                <!-- START : 최근 검색어 on/off 버튼 (최근 검색 내역이 없을때는 hidden) -->
                <div class="inner-search-btn-wrap">
                  <p class="wrap-toggle-button">
                    <input type="checkbox" id="toggle-button" checked>
                    <label class="input-toggle" for="toggle-button" aria-label="최근 검색어">자동저장</label>
                  </p>
                  <p>
                    <button>전체 삭제</button>
                  </p>
                </div>
                <!-- START : 최근 검색어 on/off 버튼 (최근 검색 내역이 없을때는 hidden) -->
              </swiper-slide>
              <!-- 수정 START : 2020.03.11 최근본상품, 인기검색어 순서 변경 -->
              <swiper-slide>
                <h4>인기 검색어</h4>
                <div class="wrap-search-tab">
                  <div class="search-tab">
                    <button id="search-tab-gsfresh" aria-controls="search-tabContent-gsfresh" :class="{active : this.tabSearch.gsfresh}" @click="tabActionSearch('gsfresh')" aria-label="탭 활성화">
                      GS 프레시몰
                    </button>
                    <button id="search-tab-dalisalda" aria-controls="search-tabContent-dalisalda" :class="{active : this.tabSearch.dalisalda}" @click="tabActionSearch('dalisalda')" aria-label="탭 활성화">
                      달리살다
                    </button>
                    <button id="search-tab-daybreak" aria-controls="search-tabContent-daybreak" :class="{active : this.tabSearch.daybreak}" @click="tabActionSearch('daybreak')" aria-label="탭 활성화">
                      새벽배송
                    </button>
                    <button id="search-tab-simplycook" aria-controls="search-tabContent-simplycook" :class="{active : this.tabSearch.simplycook}" @click="tabActionSearch('simplycook')" aria-label="탭 활성화">
                      심플리쿡
                    </button>
                  </div>
                  <div class="search-tab-contents scroll-area" ref="tabSearchContents">
                    <div class="tab-contents" id="search-tabContent-gsfresh" aria-labelledby="search-tab-gsfresh" v-if="this.tabSearch.gsfresh">
                      <h5 class="hidden">GS 프레시몰</h5>
                      <ul>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">1</span>
                            <span aria-label="인기 검색어">1974 우유</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">2</span>
                            <span aria-label="인기 검색어">계란 30</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">3</span>
                            <span aria-label="인기 검색어">인기과자</span>
                            <span aria-label="인기 검색어 상승률" class="no-change">
                              <span class="hidden">변화없음</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">4</span>
                            <span aria-label="인기 검색어">CJ두부</span>
                            <span aria-label="인기 검색어 상승률" class="down">
                              <span class="hidden">하락</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">5</span>
                            <span aria-label="인기 검색어">라면5입</span>
                            <span aria-label="인기 검색어 상승률" class="down">
                              <span class="hidden">하락</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">6</span>
                            <span aria-label="인기 검색어">고래사어묵</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">7</span>
                            <span aria-label="인기 검색어">체다치즈</span>
                            <span aria-label="인기 검색어 상승률" class="no-change">
                              <span class="hidden">변화없음</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">8</span>
                            <span aria-label="인기 검색어">삼다수</span>
                            <span aria-label="인기 검색어 상승률" class="new">
                              <span>NEW</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">9</span>
                            <span aria-label="인기 검색어">쌀10KG</span>
                            <span aria-label="인기 검색어 상승률" class="down">
                              <span class="hidden">하락</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">10</span>
                            <span aria-label="인기 검색어">김장김치 10KG</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                      </ul>
                      <span class="search-date">2019.10.10 15:00 기준</span>
                      <div class="wrap-tag">
                        <strong class="title">인기 태그</strong>
                        <button class="btn-hash-tag">우유</button>
                        <button class="btn-hash-tag">고래사어묵</button>
                        <button class="btn-hash-tag">과자</button>
                        <button class="btn-hash-tag">두부</button>
                        <button class="btn-hash-tag">라면</button>
                        <button class="btn-hash-tag">쌀</button>
                        <button class="btn-hash-tag">감자</button>
                      </div>
                    </div>
                    <div class="tab-contents" id="search-tabContent-dalisalda" aria-labelledby="search-tab-dalisalda" v-if="this.tabSearch.dalisalda">
                      <h5 class="hidden">달리살다</h5>
                      <ul>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">1</span>
                            <span aria-label="인기 검색어">삼다수</span>
                            <span aria-label="인기 검색어 상승률" class="new">
                              <span>NEW</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">2</span>
                            <span aria-label="인기 검색어">쌀10KG</span>
                            <span aria-label="인기 검색어 상승률" class="down">
                              <span class="hidden">하락</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">3</span>
                            <span aria-label="인기 검색어">김장김치 10KG</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">4</span>
                            <span aria-label="인기 검색어">1974 우유</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">5</span>
                            <span aria-label="인기 검색어">계란 30</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">6</span>
                            <span aria-label="인기 검색어">인기과자</span>
                            <span aria-label="인기 검색어 상승률" class="no-change">
                              <span class="hidden">변화없음</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">7</span>
                            <span aria-label="인기 검색어">CJ두부</span>
                            <span aria-label="인기 검색어 상승률" class="down">
                              <span class="hidden">하락</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">8</span>
                            <span aria-label="인기 검색어">라면5입</span>
                            <span aria-label="인기 검색어 상승률" class="down">
                              <span class="hidden">하락</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">9</span>
                            <span aria-label="인기 검색어">고래사어묵</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">10</span>
                            <span aria-label="인기 검색어">체다치즈</span>
                            <span aria-label="인기 검색어 상승률" class="no-change">
                              <span class="hidden">변화없음</span>
                            </span>
                          </button>
                        </li>
                      </ul>
                      <span class="search-date">2019.10.10 15:00 기준</span>
                      <div class="wrap-tag">
                        <strong class="title">인기 태그</strong>
                        <button class="btn-hash-tag">우유</button>
                        <button class="btn-hash-tag">고래사어묵</button>
                        <button class="btn-hash-tag">과자</button>
                        <button class="btn-hash-tag">두부</button>
                        <button class="btn-hash-tag">라면</button>
                        <button class="btn-hash-tag">쌀</button>
                        <button class="btn-hash-tag">감자</button>
                      </div>
                    </div>
                    <div class="tab-contents" id="search-tabContent-daybreak" aria-labelledby="search-tab-daybreak" v-if="this.tabSearch.daybreak">
                      <h5 class="hidden">새벽배송</h5>
                      <ul>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">1</span>
                            <span aria-label="인기 검색어">모짜렐라 치즈</span>
                            <span aria-label="인기 검색어 상승률" class="new">
                              <span>NEW</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">2</span>
                            <span aria-label="인기 검색어">쌀10KG</span>
                            <span aria-label="인기 검색어 상승률" class="down">
                              <span class="hidden">하락</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">3</span>
                            <span aria-label="인기 검색어">김장김치 10KG</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">4</span>
                            <span aria-label="인기 검색어">1974 우유</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">5</span>
                            <span aria-label="인기 검색어">계란 30</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">6</span>
                            <span aria-label="인기 검색어">인기과자</span>
                            <span aria-label="인기 검색어 상승률" class="no-change">
                              <span class="hidden">변화없음</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">7</span>
                            <span aria-label="인기 검색어">CJ두부</span>
                            <span aria-label="인기 검색어 상승률" class="down">
                              <span class="hidden">하락</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">8</span>
                            <span aria-label="인기 검색어">라면5입</span>
                            <span aria-label="인기 검색어 상승률" class="down">
                              <span class="hidden">하락</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">9</span>
                            <span aria-label="인기 검색어">고래사어묵</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">10</span>
                            <span aria-label="인기 검색어">체다치즈</span>
                            <span aria-label="인기 검색어 상승률" class="no-change">
                              <span class="hidden">변화없음</span>
                            </span>
                          </button>
                        </li>
                      </ul>
                      <span class="search-date">2019.10.10 15:00 기준</span>
                      <div class="wrap-tag">
                        <strong class="title">인기 태그</strong>
                        <button class="btn-hash-tag">우유</button>
                        <button class="btn-hash-tag">고래사어묵</button>
                        <button class="btn-hash-tag">과자</button>
                        <button class="btn-hash-tag">두부</button>
                        <button class="btn-hash-tag">라면</button>
                        <button class="btn-hash-tag">쌀</button>
                        <button class="btn-hash-tag">감자</button>
                      </div>
                    </div>
                    <div class="tab-contents" id="search-tabContent-simplycook" aria-labelledby="search-tab-simplycook" v-if="this.tabSearch.simplycook">
                      <h5 class="hidden">심플리쿡</h5>
                      <ul>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">1</span>
                            <span aria-label="인기 검색어">CJ두부</span>
                            <span aria-label="인기 검색어 상승률" class="down">
                              <span class="hidden">하락</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">2</span>
                            <span aria-label="인기 검색어">라면5입</span>
                            <span aria-label="인기 검색어 상승률" class="down">
                              <span class="hidden">하락</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">3</span>
                            <span aria-label="인기 검색어">고래사어묵</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">4</span>
                            <span aria-label="인기 검색어">체다치즈체다치즈체다치즈체다치즈체다치즈체다치즈</span>
                            <span aria-label="인기 검색어 상승률" class="no-change">
                              <span class="hidden">변화없음</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">5</span>
                            <span aria-label="인기 검색어">1974 우유</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">6</span>
                            <span aria-label="인기 검색어">계란 30</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">7</span>
                            <span aria-label="인기 검색어">인기과자</span>
                            <span aria-label="인기 검색어 상승률" class="no-change">
                              <span class="hidden">변화없음</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">8</span>
                            <span aria-label="인기 검색어">삼다수</span>
                            <span aria-label="인기 검색어 상승률" class="new">
                              <span>NEW</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">9</span>
                            <span aria-label="인기 검색어">쌀10KG</span>
                            <span aria-label="인기 검색어 상승률" class="down">
                              <span class="hidden">하락</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <span aria-label="인기 검색어 순위">10</span>
                            <span aria-label="인기 검색어">김장김치 10KG</span>
                            <span aria-label="인기 검색어 상승률" class="up">
                              <span class="hidden">상승</span>
                            </span>
                          </button>
                        </li>
                      </ul>
                      <span class="search-date">2019.10.10 15:00 기준</span>
                      <div class="wrap-tag">
                        <strong class="title">인기 태그</strong>
                        <button class="btn-hash-tag">우유</button>
                        <button class="btn-hash-tag">고래사어묵</button>
                        <button class="btn-hash-tag">과자</button>
                        <button class="btn-hash-tag">두부</button>
                        <button class="btn-hash-tag">라면</button>
                        <button class="btn-hash-tag">쌀</button>
                        <button class="btn-hash-tag">감자</button>
                      </div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <!-- START : 최근 본 상품 또는 신상품 상품 -->
                <h4>최근 본 상품</h4>
                <div class="inner-search-slide scroll-area">
                  <ProductListSimple />
                  <ProductListSimple :daliProduct="true" />
                  <ProductListSimple :dayBreakProduct="true" />
                  <ProductListSimple />
                  <ProductListSimple />
                  <ProductListSimple />
                  <ProductListSimple />
                </div>
                <button class="btn-text-more arrow">전체보기</button>
                <!-- END : 최근 본 상품 또는 신상품 상품 -->
              </swiper-slide>
              <!-- 수정 END : 2020.03.11 최근본상품, 인기검색어 순서 변경 -->
            </swiper>
            <div class="swiper-pagination" slot="pagination" ref="swiperSearchPagination"></div>
            <!-- 4월수정 END : 슬라이드 수정 -->
          </div>
        </div>
        <button class="btn-close-search-layer" aria-label="포커스 아웃 시 팝업 닫기"  @click="searchbarCloseAction" @keydown.9="tabFocusRemove('searchbarCloseAction')">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
// import NoList from '@/components/common/NoList'; // 최근검색어 없음
import SlideControlMixin from '@/mixins/SlideControlMixin';
import ProductListSimple from '@/components/productTemplete/ProductListSimple'; // 리스트 요약형
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupSearch",
  props: ['searchbarActive', 'dayBreakProduct'],
  mixins: [SlideControlMixin],
  data() {
    return {
      // 4월수정 : 슬라이드 수정
      swiperOptionScrollX: {
        slidesPerView: 'auto',
        freeMode: true,
      },
      swiperOption: {
        slidesPerView: 1.15,
      },
      tabSearchActive: '',
      tabSearch: {
        gsfresh: true,
        dalisalda: false,
        daybreak: false,
        simplycook: false,
      }
    };
  },
  components: {
    swiper,
    swiperSlide,
    // NoList, // 최근검색어 없음,
    ProductListSimple,
  },
  methods: {
    // 인기검색어 tab
    tabActionSearch(type) {
      for (let i = 0; i < Object.keys(this.tabSearch).length; i++) {
        this.tabSearch[Object.keys(this.tabSearch)[i]] = false;
      }
      this.tabSearchActive = [type];
      this.tabSearch[type] = true;
    },
    searchbarCloseAction() {
      if (this.searchbarActive) {
        this.$emit('searchbarEvent');
      }
    },
    searchBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    searchbarEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    searchbarAfterEnter(el) {
      el.style.opacity = 1;
      el.style.bottom = 0;
      el.focus();
      this.slideNextPrevButton('swiperSearch', true);
    },
    searchbarLeave(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    tabFocusRemove(popupClose) {
      if (!event.shiftKey) {
        event.preventDefault();
        this[popupClose]();
      }
    }
  },
  mounted() {

  },
  updated() {
    // 포커스 (접근성)
    // 4월수정 : 슬라이스 수정
    if (this.searchbarActive && this.tabSearchActive) { // 실 개발 코드
      this.$refs.tabSearchContents.setAttribute('tabindex', 0);
      this.$refs.tabSearchContents.focus();
    }
  }
};
</script>
