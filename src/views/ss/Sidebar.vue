<template>
  <transition name="sidebar"
              v-on:beforeEnter="sidebarBeforeEnter"
              v-on:enter="sidebarEnter"
              v-on:after-enter="sidebarAfterEnter"
              v-on:leave="sidebarLeave">
    <aside class="wrap-sidebar" :class="{active: sidebarActive}" v-if="sidebarActive" ref="sidebar" tabindex="0">
    <!-- <aside class="wrap-sidebar active" ref="sidebar"> -->
      <div class="wrapper scroll-area">
        <div class="wrap-user">
          <!-- START : 로그인 상태 -->
          <!-- <div class="inner">
            <dl class="wrap-user-info">
              <dt class="hidden">회원등급</dt>
              <dd class="user-grade">VIP</dd>
              <dt class="hidden">고객명</dt>
              <dd class="user-name">홍길동</dd>
              <dt class="hidden">배송지명</dt>
              <dd class="user-address">자택</dd>
            </dl> -->
            <!-- <p class="delivery-desc"> -->
              <!-- 배송 안내 문구 : 새벽배송 가능한 케이스만 노출 -->
              <!-- 지금 주문 시 가장 빠른 배송 시간<strong class="time" aria-live="assertive" aria-atomic="true">16:00~20:30</strong> -->
              <!-- 지금 주문 시 가장 빠른 배송 시간<strong class="time" aria-live="assertive" aria-atomic="true">내일 16:00~20:30</strong> -->
              <!-- 지금 주문 시 가장 빠른 배송 시간<strong class="time" aria-live="assertive" aria-atomic="true">1월 2일 16:00~20:30</strong> -->
            <!-- </p> -->
          <!-- </div> -->
          <!-- END : 로그인 상태 -->
          <!-- START : 비로그인 상태 -->
          <a href="#" class="guide-login"><em>로그인</em> 해 주세요.</a>
          <!-- END : 비로그인 상태 -->
          <!-- START : 앱에서만 노출 -->
          <button class="btn-setting app-only" aria-label="앱설정"></button>
          <!-- END : 앱에서만 노출 -->
          <!-- START : 로그인 상태 -->
          <ul class="wrap-user-btn">
            <li>
              <a href="#" title="마이페이지로이동">MY</a>
            </li>
            <li>
              <a href="#" title="쿠폰내역페이지이동">쿠폰<span class="icon num">3</span></a>
            </li>
            <li>
              <a href="#" title="주문배송페이지이동">주문배송<span class="icon num">99+</span></a>
            </li>
          </ul>
          <!-- END : 로그인 상태 -->
        </div>
        <!-- START : 배너 영역 -->
        <!-- <div class="wrap-gnb-banner">
          <a href="#">
            <figure>
              <img src="@/assets/images/img/bg_banner_mambership.jpg" alt="달리살다의 특별한 멤버십 혜택">
            </figure>
          </a>
        </div> -->
        <!-- END : 배너 영역 -->
        <!-- START : 탭 형 -->
        <!-- <ul class="wrap-menu-btn">
          <li>
            <button type="button" id="btnCategory" class="active" aria-controls="btnCategory-contents" @click="tabAction('btnCategory','depth01')">
              <em>카테고리</em>
            </button>
          </li>
          <li>
            <button type="button" id="btnCertificationCpnt" aria-controls="btnCertificationCpnt-contents" @click="tabAction('btnCertificationCpnt','depth01')">
              <em>인증&middot;성분</em>
            </button>
          </li>
          <li>
            <button type="button" id="btnBrand" aria-controls="btnBrand-contents" @click="tabAction('btnBrand','depth01')">
              <em>브랜드</em>
            </button>
          </li>
        </ul> -->
        <!-- END : 탭 형 -->
        <section class="wrap-menu-category">
          <h2 class="hidden">전체메뉴</h2>
          <!-- START : 탭 컨텐츠 -->
          <div v-show="this.tab.btnCategory"><!-- 탭이 없는 경우 -->
          <!-- <div id="btnCategory-contents" aria-labelledby="btnCategory" v-show="this.tab.btnCategory"> 탭이 있는 경우 -->
            <h3 class="hidden">카테고리</h3>
            <ul class="wrap-depth02" ref="depth01">
              <li :class="['menu-'+index,{open: menu[index]}]" v-for="(clist, index) of ctgList.data" v-bind:key="clist.index">
                <img src="@/assets/images/icon/ico_menu_fruit.png" alt="" v-if="!menu.fruit">
                <img src="@/assets/images/icon/ico_menu_fruit_on.png" alt="" v-if="menu.fruit">
                <button @click="depthClickAction(clist.dspCtgId)">{{ clist.dspCtgNm }}</button>
                <div class="wrap-list-depth" v-if="menu[index]">
                  <a href="#" class="btn-depth01">{{ clist.dspCtgNm }} 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li v-for="llist of lowList.data" v-bind:key="llist.index">
                      <a href="#">{{ llist.dspCtgNm }}</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <!-- START : 배너가 있는 경우 -->
            <!-- <div class="wrap-category-banner">
              <a href="#">
                <figure>
                  <img src="@/assets/images/img/img_banner_menu03.jpg" alt="내면의 기초체력까지 생각한 웰니스케어 달리;챙기다">
                </figure>
              </a>
            </div> -->
            <!-- END : 배너가 있는 경우 -->
          </div>
          <!-- END : 탭 컨텐츠 -->
          <!-- START : 인증성분 -->
          <div id="btnCertificationCpnt-contents" aria-labelledby="btnCertificationCpnt" v-show="this.tab.btnCertificationCpnt">
            <h3 class="hidden">인증성분</h3>
            <!-- START : 선택 된 필터 값 (값이 없을 때는 전체 hidden) -->
            <div class="filter-selected" :hidden="false">
              <swiper :options="swiperOption">
                <swiper-slide>
                  과즙주스
                  <button><span class="hidden">필터 삭제</span></button>
                </swiper-slide>
                <swiper-slide>
                  과즙주스
                  <button><span class="hidden">필터 삭제</span></button>
                </swiper-slide>
                <swiper-slide>
                  과즙주스
                  <button><span class="hidden">필터 삭제</span></button>
                </swiper-slide>
                <swiper-slide>
                  과즙주스
                  <button><span class="hidden">필터 삭제</span></button>
                </swiper-slide>
                <swiper-slide>
                  과즙주스
                  <button><span class="hidden">필터 삭제</span></button>
                </swiper-slide>
              </swiper>
            </div>
            <!-- END : 선택 된 필터 값 (값이 없을 때는 전체 hidden) -->
            <ul class="wrap-depth01"  data-group="accordionGroup02">
              <li class="menu-ingredient open">
                <button id="accordionBtn06"  class="btn-accordion" aria-expanded="true" aria-controls="accordionContent06" @click="accordionEvent()"><em>식생활</em></button>
                <ul class="ingredient-list accordion-content"  id="accordionContent06" aria-labelledby="accordionBtn06">
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list01.png" alt="">
                        </figure>
                        <input type="checkbox" name="ingredient01" id="ingredient01" value="">
                      </span>
                      <label for="ingredient01">글루텐프리</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list02.png" alt="비건 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02" id="ingredient02" value="">
                      </span>
                      <label for="ingredient02">비건</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list03.png" alt="베지테리언 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03" id="ingredient03" value="">
                      </span>
                      <label for="ingredient03">베지테리언</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list04.png" alt="키토제닉 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04" id="ingredient04" value="">
                      </span>
                      <label for="ingredient04">키토제닉</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list05.png" alt="팔레오 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient05" id="ingredient05" value="">
                      </span>
                      <label for="ingredient04">팔레오</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list06.png" alt="마이크로비오틱 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient06" id="ingredient06" value="">
                      </span>
                      <label for="ingredient06">마이크로비오틱</label>
                    </div>
                  </li>
                </ul>
              </li>
              <li class="menu-ingredient open">
                <button id="accordionBtn07"  class="btn-accordion" aria-expanded="true" aria-controls="accordionContent07"  @click="accordionEvent()"><em>건강원료</em></button>
                <ul class="ingredient-list accordion-content"  id="accordionContent07" aria-labelledby="accordionBtn07">
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list07.png" alt="무알콜 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient07" id="ingredient07" value="">
                      </span>
                      <label for="ingredient07">무알콜</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list08.png" alt="무카페인 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient08" id="ingredient08" value="">
                      </span>
                      <label for="ingredient08">무카페인</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list09.png" alt="무유제품 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient09" id="ingredient09" value="">
                      </span>
                      <label for="ingredient09">무유제품</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list10.png" alt="무향 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient10" id="ingredient10" value="">
                      </span>
                      <label for="ingredient10">무향</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list11.png" alt="프로바이오틱 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient11" id="ingredient11" value="">
                      </span>
                      <label for="ingredient11">프로바이오틱<br/>함유</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list12.png" alt="고단백질 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient12" id="ingredient12" value="">
                      </span>
                      <label for="ingredient12">고단백질</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list13.png" alt="저지방 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient13" id="ingredient13" value="">
                      </span>
                      <label for="ingredient13">저지방</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list14.png" alt="저염 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient14" id="ingredient14" value="">
                      </span>
                      <label for="ingredient14">저염</label>
                    </div>
                  </li>
                </ul>
              </li>
              <li class="menu-ingredient open">
                <button id="accordionBtn08"  class="btn-accordion" aria-expanded="true" aria-controls="accordionContent08"  @click="accordionEvent()"><em>국가인증</em></button>
                <ul class="ingredient-list accordion-content"  id="accordionContent08" aria-labelledby="accordionBtn08">
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list15.png" alt="유기농인증 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient15" id="ingredient15" value="">
                      </span>
                      <label for="ingredient15">유기농인증</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list16.png" alt="BDIH인증 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient16" id="ingredient16" value="">
                      </span>
                      <label for="ingredient16">BDIH인증</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list17.png" alt="USDA인증 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient17" id="ingredient17" value="">
                      </span>
                      <label for="ingredient17">USDA인증</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list18.png" alt="ICEA인증 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient18" id="ingredient18" value="">
                      </span>
                      <label for="ingredient18">ICEA인증</label>
                    </div>
                  </li>
                </ul>
              </li>
              <li class="menu-ingredient open">
                <button id="accordionBtn09"  class="btn-accordion" aria-expanded="true" aria-controls="accordionContent09"  @click="accordionEvent()"><em>환경사회</em></button>
                <ul class="ingredient-list accordion-content"  id="accordionContent09" aria-labelledby="accordionBtn09">
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list19.png" alt="환경보호 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient19" id="ingredient19" value="">
                      </span>
                      <label for="ingredient19">환경보호</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list20.png" alt="동물실험을 하지않는 이미지 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient20" id="ingredient20" value="">
                      </span>
                      <label for="ingredient20">동물실험을<br/>하지 않는</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list21.png" alt="동물복지 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient21" id="ingredient21" value="">
                      </span>
                      <label for="ingredient21">동물복지</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list22.png" alt="공정무역 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient22" id="ingredient22" value="">
                      </span>
                      <label for="ingredient22">공정무역</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list23.png" alt="지역특산품 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient23" id="ingredient23" value="">
                      </span>
                      <label for="ingredient23">지역특산품</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list24.png" alt="산지직송 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient24" id="ingredient24" value="">
                      </span>
                      <label for="ingredient24">산지직송</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list25.png" alt="제로웨이스트 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient25" id="ingredient25" value="">
                      </span>
                      <label for="ingredient25">제로웨이스트</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient_list26.png" alt="생분해성 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient26" id="ingredient26" value="">
                      </span>
                      <label for="ingredient26">생분해성</label>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <button class="btn-reflection">적용</button>
          </div>
          <!-- START : 브랜드 -->
          <div id="btnBrand-contents" aria-labelledby="btnBrand" v-show="this.tab.btnBrand">
            <h3 class="hidden">브랜드</h3>
            <!-- START : 브랜드 my it,가나다순 탭버튼 -->
            <ul class="wrap-brand-btn">
              <li>
                <button type="button" aria-label="my it 버튼" id="btnMyIt" class="active" aria-controls="btnMyIt-contents" @click="tabAction('btnMyIt','depth02')">My it</button>
              </li>
              <li>
                <button type="button" aria-label="가나다순 버튼" id="btnGaNaDa" aria-controls="btnGaNaDa-contents" @click="tabAction('btnGaNaDa','depth02')">가나다순</button>
              </li>
            </ul>
            <!-- END : 브랜드 my it,가나다순 탭버튼 -->
            <!-- START : 브랜드 탭컨텐츠 -->
            <div ref="tabContents02" tabindex="0">
              <div id="btnMyIt-contents" aria-labelledby="btnMyIt" v-show="this.innerTab.btnMyIt">
                <div class="wrap-my-brand">
                  <ul class="my-brand">
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_myit_brand01.png" alt="스라이브마켓 로고">
                      </figure>
                      <em class="brand-name">스라이브마켓</em>
                      <button class="btn-it active" aria-pressed="true" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_myit_brand02.png" alt="홀랜드앤바렛 로고">
                      </figure>
                      <em class="brand-name">홀랜드앤바렛</em>
                      <button class="btn-it" aria-pressed="false" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_myit_brand03.png" alt="알티야오가닉스 로고">
                      </figure>
                      <em class="brand-name">알티야오가닉스</em>
                      <button class="btn-it" aria-pressed="false" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_myit_brand01.png" alt="그녀의 빵공장 로고">
                      </figure>
                      <em class="brand-name">그녀의 빵공장</em>
                      <button class="btn-it active" aria-pressed="true" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_myit_brand04.png" alt="더피커 로고">
                      </figure>
                      <em class="brand-name">더피커</em>
                      <button class="btn-it active" aria-pressed="true" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_myit_brand01.png" alt="말랭이여사 로고">
                      </figure>
                      <em class="brand-name">말랭이여사</em>
                      <button class="btn-it active" aria-pressed="true" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                  </ul>
                </div>
                <div class="dali-section-area">
                  <h2>Best Brand</h2>
                  <ul class="best-brand">
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand01.png" alt="알티야 오가닉스 로고">
                      </figure>
                      <em class="brand-name">알티야 오가닉스</em>
                      <button class="btn-it active" aria-pressed="true" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand02.png" alt="그린블리스 로고">
                      </figure>
                      <em class="brand-name">그린블리스</em>
                      <button class="btn-it" aria-pressed="false" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand03.png" alt="더피커 로고">
                      </figure>
                      <em class="brand-name">더피커</em>
                      <button class="btn-it active" aria-pressed="true" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand04.png" alt="모건푸드 로고">
                      </figure>
                      <em class="brand-name">모건푸드</em>
                      <button class="btn-it" aria-pressed="false" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand05.png" alt="웨이트로즈 로고">
                      </figure>
                      <em class="brand-name">웨이트로즈</em>
                      <button class="btn-it" aria-pressed="false" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="btnGaNaDa-contents" aria-labelledby="btnGaNaDa" v-show="this.innerTab.btnGaNaDa">
                <div class="wrap-brand-search">
                  <div class="wrap-searchbar-dali">
                    <div class="wrap-input search">
                      <label for="search-input-brand-tap" class="hidden">검색어 입력</label>
                      <input id="search-input-brand-tap" type="text" value="" placeholder="브랜드를 찾아보세요." />
                      <button class="btn-reset" aria-label="검색어 초기화"></button>
                    </div>
                    <button class="btn-searchbar-search-dali" aria-label="검색">
                      <span class="hidden">검색</span>
                    </button>
                  </div>
                </div>
                <div class="dali-section-area type02">
                  <ul class="search-brand-list">
                    <li>
                      <span class="sorting-text">A-Z</span>
                      <figure>
                        <img src="@/assets/images/img/img_dali_brand_default.png" alt="브랜드 로고 기본 디폴트 이미지">
                      </figure>
                      <em class="brand-name">Argital</em>
                      <button class="btn-it active" aria-pressed="true" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand04.png" alt="웨이트로즈 로고">
                      </figure>
                      <em class="brand-name">Argital</em>
                      <button class="btn-it" aria-pressed="false" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/img/img_dali_brand_default.png" alt="브랜드 로고 기본 디폴트 이미지">
                      </figure>
                      <em class="brand-name">Argital</em>
                      <button class="btn-it" aria-pressed="false" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/img/img_dali_brand_default.png" alt="브랜드 로고 기본 디폴트 이미지">
                      </figure>
                      <em class="brand-name">Argital</em>
                      <button class="btn-it" aria-pressed="false" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand03.png" alt="웨이트로즈 로고">
                      </figure>
                      <em class="brand-name">Argital</em>
                      <button class="btn-it active" aria-pressed="true" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                  </ul>
                  <ul class="search-brand-list">
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand04.png" alt="웨이트로즈 로고">
                      </figure>
                      <span class="sorting-text">가</span>
                      <em class="brand-name">강산농원</em>
                      <button class="btn-it active" aria-pressed="true" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand05.png" alt="웨이트로즈 로고">
                      </figure>
                      <em class="brand-name">거창한 국수</em>
                      <button class="btn-it" aria-pressed="false" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                  </ul>
                  <ul class="search-brand-list">
                    <li>
                      <span class="sorting-text">나</span>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand01.png" alt="웨이트로즈 로고">
                      </figure>
                      <em class="brand-name">네니아</em>
                      <button class="btn-it" aria-pressed="false" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                  </ul>
                  <ul class="search-brand-list">
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand02.png" alt="웨이트로즈 로고">
                      </figure>
                      <span class="sorting-text">다</span>
                      <em class="brand-name">대자연</em>
                      <button class="btn-it" aria-pressed="false" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand03.png" alt="웨이트로즈 로고">
                      </figure>
                      <em class="brand-name">더피커</em>
                      <button class="btn-it active" aria-pressed="true" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/_temp/_logo_best_brand04.png" alt="웨이트로즈 로고">
                      </figure>
                      <em class="brand-name">떡집소년</em>
                      <button class="btn-it active" aria-pressed="true" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- END : 브랜드 탭컨텐츠 -->
          </div>
          <!-- END : 브랜드 -->
        </section>
        <!-- START : 테마관 -->
        <!-- <section class="wrap-other-banner">
          <div class="dali-section-area">
            <h2>테마관 <a href="#">전체보기</a></h2>
            <ProductBannerSlide/>
          </div>
          <div class="product-banner-normal">
            <a href="#" class="dali-item-link">
              <figure>
                <img src="@/assets/images/img/bg_banner_total_menu01.jpg" class="bg-image" alt="Why 달리살다 How, 어떻게 다를까요 What, 무엇이 다를까요 Who, 누가 선택할까요">
              </figure>
            </a>
          </div>
          <div class="product-banner-normal">
            <a href="#" class="dali-item-link">
              <figure>
                <img src="@/assets/images/img/bg_banner_total_menu02.jpg" class="bg-image" alt="달리's Tip 달리살다의 Back stage 훔쳐보기">
              </figure>
            </a>
          </div>
        </section> -->
        <!-- END : 테마관 -->
        <!-- START : 브랜드 전용관 -->
        <section class="wrap-brand">
          <h2>브랜드 전용관</h2>
          <div class="wrap-searchbar">
            <div class="wrap-input search">
              <label for="search-input" class="hidden">검색어 입력</label>
              <input id="search-input" type="text" value="" placeholder="브랜드를 찾아보세요." />
              <button class="btn-reset" aria-label="검색어 초기화"></button>
            </div>
            <button class="btn-searchbar-search" aria-label="검색">
              <span class="hidden">검색</span>
            </button>
          </div>
          <ul class="wrap-list-brand">
            <li v-for="blist in brandList" v-bind:key="blist.index">
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_pulmuone.png" alt="풀무원 로고" />
                </figure>
                {{blist.brandNm}}
                <!-- 신규입점브랜드인 경우, 아래 태그 추가 -->
                <strong class="ico-new" aria-label="신규입점브랜드"></strong>
              </a>
            </li>
          </ul>
        </section>
        <!-- END : 브랜드 전용관 -->
        <!-- START : MARKET FOR -->
        <section class="wrap-marcket">
          <h2>MARKET FOR:</h2>
          <ul class="wrap-list-marcket">
            <li>
              <a href="#" target="_blank" title="앱스토어로이동">
                <figure>
                  <img src="@/assets/images/img/img_logo_dawn.png" alt="새벽배송 앱로고" />
                </figure>
                새벽배송
              </a>
            </li>
            <li>
              <a href="#" target="_blank" title="앱스토어로이동">
                <figure>
                  <img src="@/assets/images/img/img_logo_dalisalda.png" alt="달리살다 앱로고" />
                </figure>
                달리살다
              </a>
            </li>
            <li>
              <a href="#" target="_blank" title="앱스토어로이동">
                <figure>
                  <img src="@/assets/images/img/img_logo_petsbe.png" alt="펫츠비 앱로고" />
                </figure>
                펫츠비
              </a>
            </li>
            <li>
              <a href="#" target="_blank" title="앱스토어로이동">
                <figure>
                  <img src="@/assets/images/img/img_logo_haru.png" alt="하루 앱로고" />
                </figure>
                하루
              </a>
            </li>
          </ul>
        </section>
        <!-- END : MARKET FOR -->
        <button class="btn-close" @click="sidebarCloseAction" @focusout="sidebarCloseAction" aria-label="포커스 아웃 시 카테고리메뉴 닫기"></button>
      </div>
      <div class="dim" @click="sidebarCloseAction"></div>
    </aside>
  </transition>
</template>

<script>
// import ProductBannerSlide from '@/components/product/ProductBannerSlide'; //테마관 슬라이드 컴포넌트
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "MenuCategory",
  props: ['sidebarActive'],
  data() {
    return {
      sidebarInit: false, // 카테고리 메뉴 열린 상태
      menu: {}, // 1depth 카테고리
      ctgList: [],
      lowList: {},
      brandList: {},
      tab: {
        btnCategory: true,
        btnBrand: false,
        btnCertificationCpnt: false,
      },
      swiperOption: {
        slidesPerView: 'auto',
        freeMode: true,
      },
      innerTab: {
        btnMyIt: true,
        btnGaNaDa: false
      },
    };
  },
  components: {
    // ProductBannerSlide, //테마관 슬라이드 컴포넌트
    swiper,
    swiperSlide
  },
  async mounted() {
    try {
      // 상위 카테고리를 받는다.
    const response = await ApiUtils.get(
      '/dp/fr/dspctgmgnt/dsp-category-list',
    );
      console.log(response.data);
      this.ctgList = response.data;

    // 브랜드 카테고리
    const respon = await ApiUtils.get(
      '/dp/fr/dspctgmgnt/brand-list',
    );
      const list= respon.data;
      this.brandList = list['data'];
      console.log(this.brandList);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    tabAction(type, tabDepth) { // tab
      const btnTab = document.querySelector('#' + type);
      if (tabDepth === 'depth01') {
        const $thisBtnTab = document.querySelectorAll('.wrap-menu-btn>li>button');
        for (let i = 0; i < Object.keys(this.tab).length; i++) {
          this.tab[Object.keys(this.tab)[i]] = false;
          $thisBtnTab[i].classList.remove('active');
        }
        this.tab[type] = true;
        btnTab.classList.add('active');
      } else if (tabDepth === 'depth02') {
        const $thisBtnTab = document.querySelectorAll('.wrap-brand-btn>li>button');
        for (let i = 0; i < Object.keys(this.innerTab).length; i++) {
          this.innerTab[Object.keys(this.innerTab)[i]] = false;
          $thisBtnTab[i].classList.remove('active');
        }
        this.innerTab[type] = true;
        btnTab.classList.add('active');
      }
    },
    menuInit() { // 초기 카테고리 메뉴
      const $elements = this.$refs.depth01.children;
      for (let i = 0; i< $elements.length; i++) {
        const $class = $elements[i].classList[0].split('-')[1];
        this.$set(this.menu, [`${$class}`], false);
      }
    },
    menuReset() { // 카테고리 메뉴 비활성 초기화
      const $elements = Object.keys(this.menu);
      for (let i = 0; i< $elements.length; i++) {
        if (this.menu[$elements[i]]) {
          this.menu[$elements[i]] = false;
        }
      }
    },
    async depthClickAction(dspCtgId) { // 카테고리 메뉴 활성 상태 변경
      const $li = event.target.parentNode;
      const selectedClass = $li.classList[0].split('-')[1];
      console.log(selectedClass);
      if (!this.menu[selectedClass]) {
        this.menuReset();
      }
      this.$set(this.menu, selectedClass, !this.menu[selectedClass]);
      this.sidebarInit = true;

       // 하위 카테고리
      const response = await ApiUtils.get(
        '/dp/fr/dspctgmgnt/low-dsp-category-list',
        {
            dspCtgId: dspCtgId,
            dspScrSpCd: "01"
        }
      );
      this.lowList = response.data;
      console.log(this.lowList);
    },
    sidebarBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.left = '-100%';
    },
    sidebarEnter(el) {
      el.style.opacity = 1;
    },
    sidebarAfterEnter(el) {
      el.style.opacity = 1;
      el.style.left = 0;
    },
    sidebarLeave(el) {
      el.style.left = '-100%';
    },
    sidebarCloseAction() {
      this.menuReset();
      if (this.sidebarActive) {
        this.$emit('sidebarEvent');
      }
    },
    myItAction() { // 찜하기 버튼 클릭시 실행
      const $btnIt = event.target;
      const activeClass = 'active';
      if ($btnIt.classList.contains(activeClass)) {
        $btnIt.classList.remove(activeClass);
        $btnIt.setAttribute('aria-pressed', 'false');
      } else {
        $btnIt.classList.add(activeClass);
        $btnIt.setAttribute('aria-pressed', 'true');
      }
    }
  },
  updated() {
    if (this.sidebarActive && !this.sidebarInit) {
      if (Object.keys(this.menu).length <= 0) {
        this.menuInit();
      }
      this.$refs.sidebar.focus();
    }
  },
};
</script>

<style>

</style>
