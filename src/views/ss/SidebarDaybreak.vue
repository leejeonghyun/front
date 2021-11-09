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
          <!-- 4월수정 START : 회원상태별 노출 정보, 회원등급 표기 변경
            1. 로그인 O, 배송지 등록 x
            2. 로그인 O, 배송지 등록 O, 배송지 안내
            3. 비로그인 (로그인 X)
          -->
          <!-- 1. 로그인 O, 배송지 등록 x -->
          <div class="inner">
            <dl class="wrap-user-info">
              <dt class="hidden">회원등급</dt>
              <dd class="user-grade vip" aria-label="VIP"></dd> <!-- 4월수정 : 회원등급 표기 변경, 등급별 아이콘 클래스 vvip : vvip, vip : vip, Family : fam, Welcom : wel -->
              <dt class="hidden">고객명</dt>
              <dd class="user-name">홍길동</dd>
              <dt class="hidden">배송지명</dt>
              <dd class="user-address">
                <a href="#" title="배송지 등록 페이지로 이동" class="address">배송지 등록</a>
              </dd>
            </dl>
          </div>
          <!-- 2. 로그인 O, 배송지 등록 O, 새벽배송지 O -->
          <div class="inner">
            <dl class="wrap-user-info">
              <dt class="hidden">회원등급</dt>
              <dd class="user-grade vip" aria-label="VIP"></dd> <!-- 4월수정 : 회원등급 표기 변경, 등급별 아이콘 클래스 vvip : vvip, vip : vip, Family : fam, Welcom : wel -->
              <dt class="hidden">고객명</dt>
              <dd class="user-name">홍길동</dd>
              <dt class="hidden">배송지명</dt>
              <dd class="user-address">
                <button type="button" aria-haspopup="dialog" title="배송지 목록 팝업 활성화" class="address" @click="addressListAction">자택</button>
              </dd>
            </dl>
            <!-- START : 배송 안내 문구 -->
            <p class="delivery-desc">
              <!-- TODO : GS fresh & 달리살다일 경우 -->
              <!-- 지금 주문하면<strong class="time" aria-live="assertive" aria-atomic="true"><a href="#" title="배송시간 안내 페이지로 이동">오늘 10:00~14:30 도착</a></strong> -->
              <!-- 지금 주문하면<strong class="time" aria-live="assertive" aria-atomic="true"><a href="#" title="배송시간 안내 페이지로 이동">내일 10:00~14:30 도착</a></strong> -->
              <!-- 지금 주문하면<strong class="time" aria-live="assertive" aria-atomic="true"><a href="#" title="배송시간 안내 페이지로 이동">1/22(수) 10:00~14:30 도착</a></strong> -->
              <!-- TODO : 새벽배송일 경우 -->
              새벽배송 불가지역<strong class="time" aria-live="assertive" aria-atomic="true"><a href="#" title="배송지 추가 페이지로 이동" class="arrow">새벽배송 주소 추가</a></strong>
              <!-- 지금 주문하면<strong class="time" aria-live="assertive" aria-atomic="true"><a href="#" title="배송시간 안내 페이지로 이동">내일 오전 7:00 이전 도착</a></strong> -->
              <!-- 지금 주문하면<strong class="time" aria-live="assertive" aria-atomic="true"><a href="#" title="배송시간 안내 페이지로 이동">1/22(수) 오전 7:00 이전 도착</a></strong> -->
            </p>
            <!-- END : 배송 안내 문구 -->
          </div>
          <!-- 3. 비로그인 (로그인 X) -->
          <a href="#" class="guide-login" title="로그인 페이지로 이동"><em>로그인</em> 해 주세요</a> <!-- 4월수정 : 마침표 제거 -->
          <!-- 4월수정 END : 회원상태별 노출 정보, 회원등급 표기 변경 -->
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
          <div v-if="this.tab.btnCategory"><!-- 탭이 없는 경우 -->
          <!-- <div id="btnCategory-contents" aria-labelledby="btnCategory" v-if="this.tab.btnCategory"> 탭이 있는 경우 -->
            <h3 class="hidden">카테고리</h3>
            <ul class="wrap-depth02" ref="depth01">
              <li class="menu-0" :class="{open: menu[0]}">
                <img src="@/assets/images/icon/ico_menu_fruit_daybreak.png" alt="" v-if="!menu[0]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_fruit_daybreak_on.png" alt="" v-if="menu[0]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_meat_daybreak.png" alt="" v-if="!menu[1]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_meat_daybreak_on.png" alt="" v-if="menu[1]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_greens_daybreak.png" alt="" v-if="!menu[2]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_greens_daybreak_on.png" alt="" v-if="menu[2]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_grain_daybreak.png" alt="" v-if="!menu[3]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_grain_daybreak_on.png" alt="" v-if="menu[3]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_fish_daybreak.png" alt="" v-if="!menu[4]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_fish_daybreak_on.png" alt="" v-if="menu[4]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_HMR_daybreak.png" alt="" v-if="!menu[5]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_HMR_daybreak_on.png" alt="" v-if="menu[5]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_meal_daybreak.png" alt="" v-if="!menu[6]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_meal_daybreak_on.png" alt="" v-if="menu[6]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_milk_daybreak.png" alt="" v-if="!menu[7]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_milk_daybreak_on.png" alt="" v-if="menu[7]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_bakery_daybreak.png" alt="" v-if="!menu[8]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_bakery_daybreak_on.png" alt="" v-if="menu[8]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_icecream_daybreak.png" alt="" v-if="!menu[9]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_icecream_daybreak_on.png" alt="" v-if="menu[9]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_noodle_daybreak.png" alt="" v-if="!menu[10]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_noodle_daybreak_on.png" alt="" v-if="menu[10]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_drinks_daybreak.png" alt="" v-if="!menu[11]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_drinks_daybreak_on.png" alt="" v-if="menu[11]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_coffee_daybreak.png" alt="" v-if="!menu[12]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_coffee_daybreak_on.png" alt="" v-if="menu[12]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_snack_daybreak.png" alt="" v-if="!menu[13]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_snack_daybreak_on.png" alt="" v-if="menu[13]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_eco_daybreak.png" alt="" v-if="!menu[14]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_eco_daybreak_on.png" alt="" v-if="menu[14]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_tissue_daybreak.png" alt="" v-if="!menu[15]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_tissue_daybreak_on.png" alt="" v-if="menu[15]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_laundry_daybreak.png" alt="" v-if="!menu[16]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_laundry_daybreak_on.png" alt="" v-if="menu[16]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_disposable_daybreak.png" alt="" v-if="!menu[17]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_disposable_daybreak_on.png" alt="" v-if="menu[17]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_beauty_daybreak.png" alt="" v-if="!menu[18]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_beauty_daybreak_on.png" alt="" v-if="menu[18]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_baby_daybreak.png" alt="" v-if="!menu[19]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_baby_daybreak_on.png" alt="" v-if="menu[19]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_animals_daybreak.png" alt="" v-if="!menu[20]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_animals_daybreak_on.png" alt="" v-if="menu[20]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_sports_daybreak.png" alt="" v-if="!menu[21]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_sports_daybreak_on.png" alt="" v-if="menu[21]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_tool_daybreak.png" alt="" v-if="!menu[22]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_tool_daybreak_on.png" alt="" v-if="menu[22]"><!-- 4월수정 : 데이터변경 -->
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
                <img src="@/assets/images/icon/ico_menu_electronics_daybreak.png" alt="" v-if="!menu[23]"><!-- 4월수정 : 데이터변경 -->
                <img src="@/assets/images/icon/ico_menu_electronics_daybreak_on.png" alt="" v-if="menu[23]"><!-- 4월수정 : 데이터변경 -->
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
          <!-- START : 인증성분 -->
          <div id="btnCertificationCpnt-contents" aria-labelledby="btnCertificationCpnt" v-if="this.tab.btnCertificationCpnt">
            <h3 class="hidden">인증성분</h3>
            <!-- START : 선택 된 필터 값 (값이 없을 때는 전체 hidden) -->
            <div class="filter-selected" v-show="false">
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
            <!-- START : 2020.03.05 성분 아이콘 이미지 전체적으로 변경 -->
            <ul class="wrap-depth01"  data-group="accordionGroup02">
              <li class="menu-ingredient open">
                <button id="accordionBtn06"  class="btn-accordion" aria-expanded="true" aria-controls="accordionContent06" @click="accordionEvent()"><em>식생활</em></button>
                <ul class="ingredient-list accordion-content"  id="accordionContent06" aria-labelledby="accordionBtn06">
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient01_01.png" alt="글루텐프리 아이콘">
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
                          <img src="@/assets/images/icon/ico_ingredient01_02.png" alt="비건 아이콘">
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
                          <img src="@/assets/images/icon/ico_ingredient01_03.png" alt="베지테리언 아이콘">
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
                          <img src="@/assets/images/icon/ico_ingredient01_04.png" alt="키토제닉 아이콘">
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
                          <img src="@/assets/images/icon/ico_ingredient01_05.png" alt="마이크로비오틱 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient05" id="ingredient05" value="">
                      </span>
                      <label for="ingredient05">마이크로비오틱</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient01_06.png" alt="팔레오 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient06" id="ingredient06" value="">
                      </span>
                      <label for="ingredient06">팔레오</label>
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
                          <img src="@/assets/images/icon/ico_ingredient02_01.png" alt="무알콜 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_01" id="ingredient02_01" value="">
                      </span>
                      <label for="ingredient02_01">무알콜</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_02.png" alt="무카페인 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_02" id="ingredient02_02" value="">
                      </span>
                      <label for="ingredient02_02">무카페인</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_03.png" alt="무유제품 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_03" id="ingredient02_03" value="">
                      </span>
                      <label for="ingredient02_03">무유제품</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_04.png" alt="무화학첨가물 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_04" id="ingredient02_04" value="">
                      </span>
                      <label for="ingredient02_04">무화학첨가물</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_05.png" alt="무향료 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_05" id="ingredient02_05" value="">
                      </span>
                      <label for="ingredient02_05">무향료</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_06.png" alt="프로바이오틱 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_06" id="ingredient02_06" value="">
                      </span>
                      <label for="ingredient02_06">프로바이오틱<br/>함유</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_07.png" alt="고단백질 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_07" id="ingredient02_07" value="">
                      </span>
                      <label for="ingredient02_07">고단백질</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_08.png" alt="저지방 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_08" id="ingredient02_08" value="">
                      </span>
                      <label for="ingredient02_08">저지방</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_09.png" alt="저염 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_09" id="ingredient02_09" value="">
                      </span>
                      <label for="ingredient02_09">저염</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_10.png" alt="저칼로리 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_10" id="ingredient02_10" value="">
                      </span>
                      <label for="ingredient02_10">저칼로리</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_11.png" alt="무설탕 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_11" id="ingredient02_11" value="">
                      </span>
                      <label for="ingredient02_11">무설탕</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_12.png" alt="무염 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_12" id="ingredient02_12" value="">
                      </span>
                      <label for="ingredient02_12">무염</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_13.png" alt="무방부제 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_13" id="ingredient02_13" value="">
                      </span>
                      <label for="ingredient02_13">무방부제</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_14.png" alt="무파라벤 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_14" id="ingredient02_14" value="">
                      </span>
                      <label for="ingredient02_14">무파라벤</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_15.png" alt="NON_GMO 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_15" id="ingredient02_15" value="">
                      </span>
                      <label for="ingredient02_15">NON_GMO</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_16.png" alt="무독성 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_16" id="ingredient02_16" value="">
                      </span>
                      <label for="ingredient02_16">무독성</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_17.png" alt="저혈당지수(GI) 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_17" id="ingredient02_17" value="">
                      </span>
                      <label for="ingredient02_17">저혈당지수(GI)</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_18.png" alt="저자극 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_18" id="ingredient02_18" value="">
                      </span>
                      <label for="ingredient02_18">저자극</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_19.png" alt="EWG인증 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_19" id="ingredient02_19" value="">
                      </span>
                      <label for="ingredient02_19">EWG인증</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_20.png" alt="내추럴 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_20" id="ingredient02_20" value="">
                      </span>
                      <label for="ingredient02_20">내추럴</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_21.png" alt="동물유래성분배제 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_21" id="ingredient02_21" value="">
                      </span>
                      <label for="ingredient02_21">동물유래성분배제</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_22.png" alt="무버터 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_22" id="ingredient02_22" value="">
                      </span>
                      <label for="ingredient02_22">무버터</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient02_23.png" alt="오가닉 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient02_23" id="ingredient02_23" value="">
                      </span>
                      <label for="ingredient02_23">오가닉</label>
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
                          <img src="@/assets/images/icon/ico_ingredient03_01.png" alt="유기농산물 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_01" id="ingredient03_01" value="">
                      </span>
                      <label for="ingredient03_01">유기농산물</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_02.png" alt="유기수산물 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_02" id="ingredient03_02" value="">
                      </span>
                      <label for="ingredient03_02">유기수산물</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_03.png" alt="유기축산물 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_03" id="ingredient03_03" value="">
                      </span>
                      <label for="ingredient03_03">유기축산물</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_04.png" alt="무항생제축산물 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_04" id="ingredient03_04" value="">
                      </span>
                      <label for="ingredient03_04">무항생제축산물</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_20.png" alt="무농약농산물 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_20" id="ingredient03_20" value="">
                      </span>
                      <label for="ingredient03_20">무농약농산물</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_05.png" alt="저탄소 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_05" id="ingredient03_05" value="">
                      </span>
                      <label for="ingredient03_05">저탄소</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_06.png" alt="유기가공식품 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_06" id="ingredient03_06" value="">
                      </span>
                      <label for="ingredient03_06">유기가공식품</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_02.png" alt="비건인증 영국,우리나라 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_07" id="ingredient03_07" value="">
                      </span>
                      <label for="ingredient03_07">비건인증<br/>(영국/우리나라)</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_08.png" alt="USDA 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_08" id="ingredient03_08" value="">
                      </span>
                      <label for="ingredient03_08">USDA</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_09.png" alt="유럽연함 유기인증 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_09" id="ingredient03_09" value="">
                      </span>
                      <label for="ingredient03_09">유럽연함 유기인증</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_10.png" alt="유기농산물 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_10" id="ingredient03_10" value="">
                      </span>
                      <label for="ingredient03_10">유기농산물</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_11.png" alt="유기수산물 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_11" id="ingredient03_11" value="">
                      </span>
                      <label for="ingredient03_11">유기수산물</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_12.png" alt="유기가공식품 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_12" id="ingredient03_12" value="">
                      </span>
                      <label for="ingredient03_12">유기가공식품</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_13.png" alt="ECOCERT 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_13" id="ingredient03_13" value="">
                      </span>
                      <label for="ingredient03_13">ECOCERT</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_14.png" alt="BDIH 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_14" id="ingredient03_14" value="">
                      </span>
                      <label for="ingredient03_14">BDIH</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_15.png" alt="NATRUE 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_15" id="ingredient03_15" value="">
                      </span>
                      <label for="ingredient03_15">NATRUE</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_16.png" alt="DEMETER 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_16" id="ingredient03_16" value="">
                      </span>
                      <label for="ingredient03_16">DEMETER</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_17.png" alt="ICEA 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_17" id="ingredient03_17" value="">
                      </span>
                      <label for="ingredient03_17">ICEA</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_18.png" alt="COSMOS 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_18" id="ingredient03_18" value="">
                      </span>
                      <label for="ingredient03_18">COSMOS</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient03_19.png" alt="GAP 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient03_19" id="ingredient03_19" value="">
                      </span>
                      <label for="ingredient03_19">GAP</label>
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
                          <img src="@/assets/images/icon/ico_ingredient04_01.png" alt="환경보호 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_01" id="ingredient04_01" value="">
                      </span>
                      <label for="ingredient04_01">환경보호</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_02.png" alt="동물실험을 하지않는 이미지 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_02" id="ingredient04_02" value="">
                      </span>
                      <label for="ingredient04_02">동물실험을<br/>하지 않는</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_03.png" alt="동물복지 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_03" id="ingredient04_03" value="">
                      </span>
                      <label for="ingredient04_03">동물복지</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_04.png" alt="BPA프리 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_04" id="ingredient04_04" value="">
                      </span>
                      <label for="ingredient04_04">BPA프리</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_05.png" alt="공정무역 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_05" id="ingredient04_05" value="">
                      </span>
                      <label for="ingredient04_05">공정무역</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_06.png" alt="국내산 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_06" id="ingredient04_06" value="">
                      </span>
                      <label for="ingredient04_05">국내산</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_07.png" alt="지역특산품 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_07" id="ingredient04_07" value="">
                      </span>
                      <label for="ingredient04_07">지역특산품</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_08.png" alt="핸드메이드 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_08" id="ingredient04_08" value="">
                      </span>
                      <label for="ingredient04_08">핸드메이드</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_09.png" alt="재활용 가능 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_09" id="ingredient04_09" value="">
                      </span>
                      <label for="ingredient04_09">재활용 가능</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_10.png" alt="산지직송 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_10" id="ingredient04_10" value="">
                      </span>
                      <label for="ingredient04_10">산지직송</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_11.png" alt="목초사육 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_11" id="ingredient04_11" value="">
                      </span>
                      <label for="ingredient04_11">목초사육</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_12.png" alt="자연방목 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_12" id="ingredient04_12" value="">
                      </span>
                      <label for="ingredient04_12">자연방목</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_13.png" alt="제로웨이스트 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_13" id="ingredient04_13" value="">
                      </span>
                      <label for="ingredient04_13">제로웨이스트</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_14.png" alt="수익환원 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_14" id="ingredient04_14" value="">
                      </span>
                      <label for="ingredient04_14">수익환원</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_15.png" alt="장인이 만든 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_15" id="ingredient04_15" value="">
                      </span>
                      <label for="ingredient04_15">장인이 만든</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_16.png" alt="가족사업(농가) 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_16" id="ingredient04_16" value="">
                      </span>
                      <label for="ingredient04_16">가족사업(농가)</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_17.png" alt="생분해성 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_17" id="ingredient04_17" value="">
                      </span>
                      <label for="ingredient04_17">생분해성</label>
                    </div>
                  </li>
                  <li>
                    <div class="ingredient-chk">
                      <span class="area-chk">
                        <figure>
                          <img src="@/assets/images/icon/ico_ingredient04_18.png" alt="지리적표시제 아이콘">
                        </figure>
                        <input type="checkbox" name="ingredient04_18" id="ingredient04_18" value="">
                      </span>
                      <label for="ingredient04_18">지리적표시제</label>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <!-- END : 2020.03.05 성분 아이콘 이미지 전체적으로 변경 -->
            <button class="btn-reflection">적용</button>
          </div>
          <!-- START : 브랜드 -->
          <div id="btnBrand-contents" aria-labelledby="btnBrand" v-if="this.tab.btnBrand">
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
          <!-- END : 탭 컨텐츠 -->
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
          <!-- 수정 START : 2020.03.06 달리살다 브랜드와 스타일 통일 -->
          <ul class="my-brand">
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_pulmuone.png" alt="" />
                </figure>
                <em class="brand-name">
                  풀무원
                  <!-- 신규입점브랜드인 경우, 아래 태그 추가 -->
                  <strong class="ico-new" aria-label="신규입점브랜드"></strong>
                </em>
              </a>
            </li>
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_cj.png" alt="" />
                </figure>
                <em class="brand-name">CJ제일제당</em>
              </a>
            </li>
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_ottogi.png" alt="" />
                </figure>
                <em class="brand-name">오뚜기</em>
              </a>
            </li>
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_seoulmilk.png" alt="" />
                </figure>
                <em class="brand-name">서울우유</em>
              </a>
            </li>
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_nivea.png" alt="" />
                </figure>
                <em class="brand-name">니베아</em>
              </a>
            </li>
            <li>
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_brand_chungjungone.png" alt="" />
                </figure>
                <em class="brand-name">글라스락</em>
              </a>
            </li>
          </ul>
          <!-- 수정 END : 2020.03.06 달리살다 브랜드와 스타일 통일 -->
          <!-- 4월 수정 START : 더보기 버튼 추가 -->
          <div class="btn-more-detail-view" :class="{open : viewMore}">
            <button class="btn-border" aria-label="상품 상세페이지" @click="viewMore = !viewMore">
              <span aria-live="assertive" aria-atomic="true">{{viewMore ? '닫기': '더보기'}}</span>
            </button>
          </div>
          <!-- 4월 수정 END : 더보기 버튼 추가 -->
        </section>
        <!-- END : 브랜드 전용관 -->
        <!-- START : MARKET FOR -->
        <section class="wrap-marcket">
          <h2>MARKET FOR:</h2>
          <ul class="wrap-list-marcket">
            <li>
              <a href="#" target="_blank" title="앱스토어로이동">
                <figure>
                  <img src="@/assets/images/img/img_logo_gsfresh_circle.png" alt="새벽배송 앱로고" />
                </figure>
                GS 프레시몰
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
        <button class="btn-close" @click="sidebarCloseAction" @keydown.9="tabFocusRemove('sidebarCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
          <span class="hidden">닫기</span>
        </button>
      </div>
      <div class="dim" @click="sidebarCloseAction"></div>
    </aside>
  </transition>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
// import ProductBannerSlide from '@/components/product/ProductBannerSlide'; //테마관 슬라이드 컴포넌트
import AccordionMixin from "@/mixins/AccordionMixin";
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "SidebarDaybreak",
  props: ['sidebarActive'],
  // START : 2020.03.05 AccordionMixin 추가
  mixins: [AccordionMixin],
  // END : 2020.03.05 AccordionMixin 추가
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
      viewMore: false, // 4월 추가 : 더보기 버튼
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
    },
    tabFocusRemove(popupClose) { // 팝업 닫기 버튼 탭 이동 시 팝업 닫기
      if (!event.shiftKey) { // shift + tab 시 동작 안하기
        event.preventDefault();
        this[popupClose](); // 팝업 닫기 함수 호출
      }
    },
    addressListAction() { // 4월수정 : 팝업 - 배송지목록 추가
      this.$emit('deliveryListEvent');
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
