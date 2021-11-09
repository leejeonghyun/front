<!--
views/ss/SC-FO-SS-GF-MS-101.vue
-->
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
              <li class="menu-0" :class="{open: menu[0]}">
                <img src="@/assets/images/icon/ico_menu_fruit.png" alt="" v-if="!menu.fruit">
                <img src="@/assets/images/icon/ico_menu_fruit_on.png" alt="" v-if="menu.fruit">
                <button @click="depthClickAction">과일/견과</button>
                <div class="wrap-list-depth" v-if="menu[0]">
                  <a href="#" class="btn-depth01">과일/견과 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">과일 1</a></li>
                    <li><a href="#">과일 2</a></li>
                    <li><a href="#">과일 3</a></li>
                    <li><a href="#">과일 4</a></li>
                    <li><a href="#">과일 5</a></li>
                    <li><a href="#">과일 1</a></li>
                    <li><a href="#">과일 2</a></li>
                    <li><a href="#">과일 3</a></li>
                    <li><a href="#">과일 4</a></li>
                    <li><a href="#">과일 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-1" :class="{open: menu[1]}">
                <img src="@/assets/images/icon/ico_menu_meat.png" alt="" v-if="!menu.meat">
                <img src="@/assets/images/icon/ico_menu_meat_on.png" alt="" v-if="menu.meat">
                <button @click="depthClickAction">정육/계란</button>
                <div class="wrap-list-depth" v-if="menu[1]">
                  <a href="#" class="btn-depth01">정육/계란 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">정육 1</a></li>
                    <li><a href="#">정육 2</a></li>
                    <li><a href="#">정육 3</a></li>
                    <li><a href="#">정육 4</a></li>
                    <li><a href="#">정육 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-2" :class="{open: menu[2]}">
                <img src="@/assets/images/icon/ico_menu_greens.png" alt="" v-if="!menu.greens">
                <img src="@/assets/images/icon/ico_menu_greens_on.png" alt="" v-if="menu.greens">
                <button @click="depthClickAction">채소/두부/콩나물</button>
                <div class="wrap-list-depth" v-if="menu[2]">
                  <a href="#" class="btn-depth01">채소/두부/콩나물 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">채소 1</a></li>
                    <li><a href="#">채소 2</a></li>
                    <li><a href="#">채소 3</a></li>
                    <li><a href="#">채소 4</a></li>
                    <li><a href="#">채소 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-3" :class="{open: menu[3]}">
                <img src="@/assets/images/icon/ico_menu_grain.png" alt="" v-if="!menu.grain">
                <img src="@/assets/images/icon/ico_menu_grain_on.png" alt="" v-if="menu.grain">
                <button @click="depthClickAction">쌀/잡곡</button>
                <div class="wrap-list-depth" v-if="menu[3]">
                  <a href="#" class="btn-depth01">쌀/잡곡 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">쌀 1</a></li>
                    <li><a href="#">쌀 2</a></li>
                    <li><a href="#">쌀 3</a></li>
                    <li><a href="#">쌀 4</a></li>
                    <li><a href="#">쌀 5</a></li>
                    <li><a href="#">쌀 1</a></li>
                    <li><a href="#">쌀 2</a></li>
                    <li><a href="#">쌀 3</a></li>
                    <li><a href="#">쌀 4</a></li>
                    <li><a href="#">쌀 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-4" :class="{open: menu[4]}">
                <img src="@/assets/images/icon/ico_menu_fish.png" alt="" v-if="!menu.fish">
                <img src="@/assets/images/icon/ico_menu_fish_on.png" alt="" v-if="menu.fish">
                <button @click="depthClickAction">수산/건어</button>
                <div class="wrap-list-depth" v-if="menu[4]">
                  <a href="#" class="btn-depth01">수산/건어 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">수산 1</a></li>
                    <li><a href="#">수산 2</a></li>
                    <li><a href="#">수산 3</a></li>
                    <li><a href="#">수산 4</a></li>
                    <li><a href="#">수산 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-5" :class="{open: menu[5]}">
                <img src="@/assets/images/icon/ico_menu_HMR.png" alt="" v-if="!menu.HMR">
                <img src="@/assets/images/icon/ico_menu_HMR_on.png" alt="" v-if="menu.HMR">
                <button @click="depthClickAction">냉장/냉동/간편식</button>
                <div class="wrap-list-depth" v-if="menu[5]">
                  <a href="#" class="btn-depth01">냉장/냉동/간편식 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">냉장 1</a></li>
                    <li><a href="#">냉장 2</a></li>
                    <li><a href="#">냉장 3</a></li>
                    <li><a href="#">냉장 4</a></li>
                    <li><a href="#">냉장 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-6" :class="{open: menu[6]}">
                <img src="@/assets/images/icon/ico_menu_meal.png" alt="" v-if="!menu.meal">
                <img src="@/assets/images/icon/ico_menu_meal_on.png" alt="" v-if="menu.meal">
                <button @click="depthClickAction">도시락/반찬/밀키트</button>
                <div class="wrap-list-depth" v-if="menu[6]">
                  <a href="#" class="btn-depth01">도시락/반찬/밀키트 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">도시락 1</a></li>
                    <li><a href="#">도시락 2</a></li>
                    <li><a href="#">도시락 3</a></li>
                    <li><a href="#">도시락 4</a></li>
                    <li><a href="#">도시락 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-7" :class="{open: menu[7]}">
                <img src="@/assets/images/icon/ico_menu_milk.png" alt="" v-if="!menu.milk">
                <img src="@/assets/images/icon/ico_menu_milk_on.png" alt="" v-if="menu.milk">
                <button @click="depthClickAction">우유/유제품</button>
                <div class="wrap-list-depth" v-if="menu[7]">
                  <a href="#" class="btn-depth01">우유/유제품 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">우유 1</a></li>
                    <li><a href="#">우유 2</a></li>
                    <li><a href="#">우유 3</a></li>
                    <li><a href="#">우유 4</a></li>
                    <li><a href="#">우유 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-8" :class="{open: menu[8]}">
                <img src="@/assets/images/icon/ico_menu_bakery.png" alt="" v-if="!menu.bakery">
                <img src="@/assets/images/icon/ico_menu_bakery_on.png" alt="" v-if="menu.bakery">
                <button @click="depthClickAction">베이커리/디저트</button>
                <div class="wrap-list-depth" v-if="menu[8]">
                  <a href="#" class="btn-depth01">베이커리/디저트 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">베이커리 1</a></li>
                    <li><a href="#">베이커리 2</a></li>
                    <li><a href="#">베이커리 3</a></li>
                    <li><a href="#">베이커리 4</a></li>
                    <li><a href="#">베이커리 5</a></li>
                    <li><a href="#">베이커리 1</a></li>
                    <li><a href="#">베이커리 2</a></li>
                    <li><a href="#">베이커리 3</a></li>
                    <li><a href="#">베이커리 4</a></li>
                    <li><a href="#">베이커리 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-9" :class="{open: menu[9]}">
                <img src="@/assets/images/icon/ico_menu_icecream.png" alt="" v-if="!menu.icecream">
                <img src="@/assets/images/icon/ico_menu_icecream_on.png" alt="" v-if="menu.icecream">
                <button @click="depthClickAction">아이스크림</button>
                <div class="wrap-list-depth" v-if="menu[9]">
                  <a href="#" class="btn-depth01">아이스크림 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">아이스크림 1</a></li>
                    <li><a href="#">아이스크림 2</a></li>
                    <li><a href="#">아이스크림 3</a></li>
                    <li><a href="#">아이스크림 4</a></li>
                    <li><a href="#">아이스크림 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-10" :class="{open: menu[10]}">
                <img src="@/assets/images/icon/ico_menu_noodle.png" alt="" v-if="!menu.noodle">
                <img src="@/assets/images/icon/ico_menu_noodle_on.png" alt="" v-if="menu.noodle">
                <button @click="depthClickAction">양념소스/면류/통조림</button>
                <div class="wrap-list-depth" v-if="menu[10]">
                  <a href="#" class="btn-depth01">양념소스/면류/통조림 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">양념소스 1</a></li>
                    <li><a href="#">양념소스 2</a></li>
                    <li><a href="#">양념소스 3</a></li>
                    <li><a href="#">양념소스 4</a></li>
                    <li><a href="#">양념소스 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-11" :class="{open: menu[11]}">
                <img src="@/assets/images/icon/ico_menu_drinks.png" alt="" v-if="!menu.drinks">
                <img src="@/assets/images/icon/ico_menu_drinks_on.png" alt="" v-if="menu.drinks">
                <button @click="depthClickAction">생수/음료/주류</button>
                <div class="wrap-list-depth" v-if="menu[11]">
                  <a href="#" class="btn-depth01">생수/음료/주류 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">생수 1</a></li>
                    <li><a href="#">생수 2</a></li>
                    <li><a href="#">생수 3</a></li>
                    <li><a href="#">생수 4</a></li>
                    <li><a href="#">생수 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-12" :class="{open: menu[12]}">
                <img src="@/assets/images/icon/ico_menu_coffee.png" alt="" v-if="!menu.coffee">
                <img src="@/assets/images/icon/ico_menu_coffee_on.png" alt="" v-if="menu.coffee">
                <button @click="depthClickAction">커피/차류</button>
                <div class="wrap-list-depth" v-if="menu[12]">
                  <a href="#" class="btn-depth01">커피/차류 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">커피 1</a></li>
                    <li><a href="#">커피 2</a></li>
                    <li><a href="#">커피 3</a></li>
                    <li><a href="#">커피 4</a></li>
                    <li><a href="#">커피 5</a></li>
                    <li><a href="#">커피 1</a></li>
                    <li><a href="#">커피 2</a></li>
                    <li><a href="#">커피 3</a></li>
                    <li><a href="#">커피 4</a></li>
                    <li><a href="#">커피 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-13" :class="{open: menu[13]}">
                <img src="@/assets/images/icon/ico_menu_snack.png" alt="" v-if="!menu.snack">
                <img src="@/assets/images/icon/ico_menu_snack_on.png" alt="" v-if="menu.snack">
                <button @click="depthClickAction">과자/시리얼</button>
                <div class="wrap-list-depth" v-if="menu[13]">
                  <a href="#" class="btn-depth01">과자/시리얼 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">과자 1</a></li>
                    <li><a href="#">과자 2</a></li>
                    <li><a href="#">과자 3</a></li>
                    <li><a href="#">과자 4</a></li>
                    <li><a href="#">과자 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-14" :class="{open: menu[14]}">
                <img src="@/assets/images/icon/ico_menu_eco.png" alt="" v-if="!menu.eco">
                <img src="@/assets/images/icon/ico_menu_eco_on.png" alt="" v-if="menu.eco">
                <button @click="depthClickAction">친환경/유기농/건강식품</button>
                <div class="wrap-list-depth" v-if="menu.eco">
                  <a href="#" class="btn-depth01">친환경/유기농/건강식품 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">친환경 1</a></li>
                    <li><a href="#">친환경 2</a></li>
                    <li><a href="#">친환경 3</a></li>
                    <li><a href="#">친환경 4</a></li>
                    <li><a href="#">친환경 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-15" :class="{open: menu[15]}">
                <img src="@/assets/images/icon/ico_menu_tissue.png" alt="" v-if="!menu.tissue">
                <img src="@/assets/images/icon/ico_menu_tissue_on.png" alt="" v-if="menu.tissue">
                <button @click="depthClickAction">화장지/생리대</button>
                <div class="wrap-list-depth" v-if="menu[15]">
                  <a href="#" class="btn-depth01">화장지/생리대 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">화장지 1</a></li>
                    <li><a href="#">화장지 2</a></li>
                    <li><a href="#">화장지 3</a></li>
                    <li><a href="#">화장지 4</a></li>
                    <li><a href="#">화장지 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-16" :class="{open: menu[16]}">
                <img src="@/assets/images/icon/ico_menu_laundry.png" alt="" v-if="!menu.laundry">
                <img src="@/assets/images/icon/ico_menu_laundry_on.png" alt="" v-if="menu.laundry">
                <button @click="depthClickAction">세제/세탁/청소/욕실용품</button>
                <div class="wrap-list-depth" v-if="menu[16]">
                  <a href="#" class="btn-depth01">세제/세탁/청소/욕실용품 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">세제 1</a></li>
                    <li><a href="#">세제 2</a></li>
                    <li><a href="#">세제 3</a></li>
                    <li><a href="#">세제 4</a></li>
                    <li><a href="#">세제 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-17" :class="{open: menu[17]}">
                <img src="@/assets/images/icon/ico_menu_disposable.png" alt="" v-if="!menu.disposable">
                <img src="@/assets/images/icon/ico_menu_disposable_on.png" alt="" v-if="menu.disposable">
                <button @click="depthClickAction">일회용품/주방용품</button>
                <div class="wrap-list-depth" v-if="menu[17]">
                  <a href="#" class="btn-depth01">일회용품/주방용품 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">일회용품 1</a></li>
                    <li><a href="#">일회용품 2</a></li>
                    <li><a href="#">일회용품 3</a></li>
                    <li><a href="#">일회용품 4</a></li>
                    <li><a href="#">일회용품 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-18" :class="{open: menu[18]}">
                <img src="@/assets/images/icon/ico_menu_beauty.png" alt="" v-if="!menu.beauty">
                <img src="@/assets/images/icon/ico_menu_beauty_on.png" alt="" v-if="menu.beauty">
                <button @click="depthClickAction">헤어/바디/뷰티</button>
                <div class="wrap-list-depth" v-if="menu[18]">
                  <a href="#" class="btn-depth01">헤어/바디/뷰티 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">헤어 1</a></li>
                    <li><a href="#">헤어 2</a></li>
                    <li><a href="#">헤어 3</a></li>
                    <li><a href="#">헤어 4</a></li>
                    <li><a href="#">헤어 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-19" :class="{open: menu[19]}">
                <img src="@/assets/images/icon/ico_menu_baby.png" alt="" v-if="!menu.baby">
                <img src="@/assets/images/icon/ico_menu_baby_on.png" alt="" v-if="menu.baby">
                <button @click="depthClickAction">유아동품/문구/완구</button>
                <div class="wrap-list-depth" v-if="menu[19]">
                  <a href="#" class="btn-depth01">유아동품/문구/완구 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">유아동품 1</a></li>
                    <li><a href="#">유아동품 2</a></li>
                    <li><a href="#">유아동품 3</a></li>
                    <li><a href="#">유아동품 4</a></li>
                    <li><a href="#">유아동품 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-20" :class="{open: menu[20]}">
                <img src="@/assets/images/icon/ico_menu_animals.png" alt="" v-if="!menu.animals">
                <img src="@/assets/images/icon/ico_menu_animals_on.png" alt="" v-if="menu.animals">
                <button @click="depthClickAction">반려용품</button>
                <div class="wrap-list-depth" v-if="menu[20]">
                  <a href="#" class="btn-depth01">반려용품 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">반려용품 1</a></li>
                    <li><a href="#">반려용품 2</a></li>
                    <li><a href="#">반려용품 3</a></li>
                    <li><a href="#">반려용품 4</a></li>
                    <li><a href="#">반려용품 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-21" :class="{open: menu[21]}">
                <img src="@/assets/images/icon/ico_menu_sports.png" alt="" v-if="!menu.sports">
                <img src="@/assets/images/icon/ico_menu_sports_on.png" alt="" v-if="menu.sports">
                <button @click="depthClickAction">스포츠용품/패션/잡화</button>
                <div class="wrap-list-depth" v-if="menu[21]">
                  <a href="#" class="btn-depth01">스포츠용품/패션/잡화 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">스포츠용품 1</a></li>
                    <li><a href="#">스포츠용품 2</a></li>
                    <li><a href="#">스포츠용품 3</a></li>
                    <li><a href="#">스포츠용품 4</a></li>
                    <li><a href="#">스포츠용품 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-22" :class="{open: menu[22]}">
                <img src="@/assets/images/icon/ico_menu_tool.png" alt="" v-if="!menu.tool">
                <img src="@/assets/images/icon/ico_menu_tool_on.png" alt="" v-if="menu.tool">
                <button @click="depthClickAction">홈데코/공구</button>
                <div class="wrap-list-depth" v-if="menu[22]">
                  <a href="#" class="btn-depth01">홈데코/공구 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">홈데코 1</a></li>
                    <li><a href="#">홈데코 2</a></li>
                    <li><a href="#">홈데코 3</a></li>
                    <li><a href="#">홈데코 4</a></li>
                    <li><a href="#">홈데코 5</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-23" :class="{open: menu[23]}">
                <img src="@/assets/images/icon/ico_menu_electronics.png" alt="" v-if="!menu.electronics">
                <img src="@/assets/images/icon/ico_menu_electronics_on.png" alt="" v-if="menu.electronics">
                <button @click="depthClickAction">가전/자동차용품</button>
                <div class="wrap-list-depth" v-if="menu[23]">
                  <a href="#" class="btn-depth01">가전/자동차용품 전체보기</a>
                  <a href="#" class="btn-special">[2019연말기획전] 비타민 가득! 과일 대축제</a>
                  <ul class="wrap-depth03">
                    <li><a href="#">가전 1</a></li>
                    <li><a href="#">가전 2</a></li>
                    <li><a href="#">가전 3</a></li>
                    <li><a href="#">가전 4</a></li>
                    <li><a href="#">가전 5</a></li>
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
                        <img src="@/assets/images/img/img_dali_brand_default_.png" alt="브랜드 로고 기본 디폴트 이미지">
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
                        <img src="@/assets/images/img/img_dali_brand_default_.png" alt="브랜드 로고 기본 디폴트 이미지">
                      </figure>
                      <em class="brand-name">Argital</em>
                      <button class="btn-it" aria-pressed="false" @click="myItAction()"><span class="hidden">찜하기</span></button>
                    </li>
                    <li>
                      <figure>
                        <img src="@/assets/images/img/img_dali_brand_default_.png" alt="브랜드 로고 기본 디폴트 이미지">
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
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_pulmuone.png" alt="풀무원 로고" />
                </figure>
                풀무원
                <!-- 신규입점브랜드인 경우, 아래 태그 추가 -->
                <strong class="ico-new" aria-label="신규입점브랜드"></strong>
              </a>
            </li>
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_cj.png" alt="CJ제일제당 로고" />
                </figure>
                CJ제일제당
              </a>
            </li>
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_ottogi.png" alt="오뚜기 로고" />
                </figure>
                오뚜기
              </a>
            </li>
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_seoulmilk.png" alt="서울우유 로고" />
                </figure>
                서울우유
              </a>
            </li>
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_nivea.png" alt="니베아 로고" />
                </figure>
                니베아
              </a>
            </li>
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_glasslock.png" alt="글라스락 로고" />
                </figure>
                글라스락
              </a>
            </li>
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_ckd.png" alt="종근당건강 로고" />
                </figure>
                종근당건강
              </a>
            </li>
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_cenovis.png" alt="세노비스 로고" />
                </figure>
                세노비스
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
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "MenuCategory",
  props: ['sidebarActive'],
  data() {
    return {
      sidebarInit: false, // 카테고리 메뉴 열린 상태
      menu: {}, // 1depth 카테고리
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
  mounted() {

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
    depthClickAction() { // 카테고리 메뉴 활성 상태 변경
      const $li = event.target.parentNode;
      const selectedClass = $li.classList[0].split('-')[1];
      console.log(selectedClass);
      if (!this.menu[selectedClass]) {
        this.menuReset();
      }
      this.$set(this.menu, selectedClass, !this.menu[selectedClass]);
      this.sidebarInit = true;
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
