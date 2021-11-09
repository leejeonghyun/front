/* eslint camelcase: 0 */
import sha256 from 'sha256';
import ApiUtils from '@/common/ApiUtils';
import Config from '@/common/Config';
import CookieUtils from '@/common/CookieUtils';
import loadScriptOnce from 'load-script-once';

const _dl = {
  page: {
    pageName: '',
  },
};
const trackId = {};
const Tracker = {
  store: {},
  init: function (store) {
    this.store = store;
    this.loadAdvertisingScript();

    // 구글 태그매니저
    window.wcs_add = {};
    window._nasa = {};

    // 어도비 메타 태그 시작
    try {
      this.loadNaverAds();
      this.initFacebookFixel();
      this.loadBeusable();
    } catch (e) {
      throw e;
    }
  },
  updatePage: function () {
    const metaTags = document.getElementsByTagName('meta');
    for (let i = 0; i < metaTags.length; i++) {
      switch (metaTags[i].getAttribute('property')) {
        case 'aa:page':
          const page = {
            pageName: metaTags[i].getAttribute('content'),
          };
          _dl['page'] = page;
          break;
        case 'aa:product':
          const productList = [];
          const arrProductList = metaTags[i]
            .getAttribute('content')
            .split(';');
          for (let j = 0; j < arrProductList.length; j++) {
            const arrProduct = arrProductList[j].split('^');
            const product = {
              productCategory1: arrProduct[0],
              productCategory2: arrProduct[1],
              productCategory3: arrProduct[2],
              productName: arrProduct[3],
            };
            productList.push(product);
          }
          _dl['products'] = productList;
          break;
        case 'aa:event':
          const arrEvent = metaTags[i].getAttribute('content').split('^');
          const event = {
            eventCategory: arrEvent[0],
            eventName: arrEvent[1],
          };
          _dl['event'] = event;
          break;
        case 'aa:checkout':
          const arrCheckout = metaTags[i]
            .getAttribute('content')
            .split('^');
          const checkout = {
            paymentMethod: arrCheckout[0],
            totalAmount: arrCheckout[1],
            usePoint: arrCheckout[2] == '' ? 'N' : 'Y',
            useVoucher: arrCheckout[3] == '' ? 'N' : 'Y',
            useCoupon: arrCheckout[4] == '' ? 'N' : 'Y',
            purchaseID: arrCheckout[5],
          };
          _dl['checkout'] = checkout;
          break;
        case 'aa:pageInfo':
          const pageInfo = {
            pageType: 'errorPage',
            errorType: metaTags[i].getAttribute('content'),
          };
          _dl['pageInfo'] = pageInfo;
          break;
      }
      // 어도비 메타 태그 종료
    }
    this.trackingAdobe();
  },
  loadAdvertisingScript: function () {
    // gsfresh, 달리살다 분기
    if (CookieUtils.getCmmSteId() == '1') {
      this.trackId = Config.tracking.gsfreshTrackId;
      loadScriptOnce(Config.tracking.url.adobeFresh)
      .then(() => {
        this.updatePage();
      });
    } else if (CookieUtils.getCmmSteId() == '2') {
      this.trackId = Config.tracking.dalisaldaTrackId;
      // adobe 대시보드에서 도메인으로 구분하여 데이터를 수집하기 때문에 달리살다도 fresh 코드 적용됨
      loadScriptOnce(Config.tracking.url.adobeFresh)
      .then(() => {
        this.updatePage();
      });
    } else {
      this.trackId = Config.tracking.marketforTrackId;
      // adobe 대시보드에서 marketfor 코드 적용됨
      loadScriptOnce(Config.tracking.url.adobeMarketfor)
      .then(() => {
        this.updatePage();
      });
    }
    ApiUtils.loadScript(Config.tracking.url.googleTagmanager);
    ApiUtils.loadScript(Config.tracking.url.kakao);
  },
  initFacebookFixel: function () {
    // fbq('init', this.trackId.facebookPixel); index.html에서 호출됨
    // fbq('set', 'mobileBridge', '234508130416308', '1933958633553886'); // 하이브리드 앱 이벤트 처리(SDK, Pixel 중복 처리 방지)
    fbq('track', 'PageView');
  },
  loadNaverAds: function () {
    loadScriptOnce(Config.tracking.url.naverPremiumLog)
      .then(() => {
        if (!wcs_add) {
          const wcs_add = {};
        }
        wcs_add["wa"] = this.trackId.naver;
        if (!_nasa) {
          const _nasa = {};
        }
        wcs.inflow();
        wcs_do(_nasa);
      });
  },
  loadBeusable: function () { // beusable 트래킹 코드
    (function (w, d, a) {
      w.__beusablerumclient__ = {
        load: function (src) {
          const b = d.createElement('script');
          b.src = src; b.async=true; b.type = 'text/javascript';
          d.getElementsByTagName('head')[0].appendChild(b);
        }
      };
      w.__beusablerumclient__.load(a);
    })(window, document, CookieUtils.getCmmSteId() == '1' ? Config.tracking.url.beusableFresh : Config.tracking.url.beusableDalisalda);
  },
  gtagBasket: function(obj) {
    console.log(obj);
  },
  gtag: function (...args) {
    dataLayer.push(args);
  },
  trackingAdobe: function () {
    try {
      _satellite.track("pageView");
    } catch (e) {
    }
  },
  loginSuccess(custNo) {
    this.callADLog("LOGIN", custNo);
  },
  loginoutSuccess() {
    this.callADLog("LOGOUT");
  },
  mainView: function () { // 메인
    this.callADLog("VIEW_HOME", "");
  },
  searchKeyword: function(item, ...args) {
    // 통합검색
    this.callADLog('SEARCH', item, ...args);
  },
  pageView: function (paramObj) {
    _satellite.track("pageViewWithParam", paramObj); // 현재 화면의 GNB 영역 명을 명시
  },
  prodAddToCart(item, ...args) {/* 장바구니 START */
    this.callADLog("ADD_CART", item, ...args);
  }, /* 장바구니 END */
  prodRemoveFromCart(item) {/* 장바구니 삭제 START */
    // 장바구니 삭제 완료
    const items = [];
    items.push(item);
    this.callADLog("DEL_CART", items);
  }, /* 장바구니 삭제 END */
  orderCompleteBefore(item, ...args) {/* 주문완료 호출 직전 */
    const items = [];
    for (let i = 0; i < item.length; i++) {
      const temp = item[i];
      for (let i = 0; i < temp.length; i++) {
        items.push(temp[i]);
      }
    }
    this.callADLog("ORDER_COMPLETE_BEFORE", items, ...args);
  },
  orderComplete(item, ...args) {/* 주문완료 START */
    const items = [];
    for (let i = 0; i < item.length; i++) {
      const temp = item[i];
      for (let i = 0; i < temp.length; i++) {
        items.push(temp[i]);
      }
    }
    this.callADLog("ORDER_COMPLETE", items, ...args);
    const gtagItem = [];
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
      totalPrice += items[i]['itemDcSprc'] * items[i]['itemOrdQty'] - items[i]['cmplDcAmt'] - items[i]['itemCpnDcAmt'] - items[i]['dblDcCpnDcAmt'];
      gtagItem.push({ id: items[i]['itemId'], name: items[i]['itemNm'], price: String(items[i]['itemDcSprc']), quantity: String(items[i]['itemOrdQty']), category: items[i]['itemClasfCtgNm'], list_name: 'Order List'});
    }
    args[2].event('purchase', { 'transaction_id': args[1],
      'transaction_id': 'GSfresh',
      'value': totalPrice,
      'currency': 'KRW',
      'shipping': args[0].totDelivFee,
      'items': gtagItem
    });
  }, /* 주문완료 END */
  orderSheet(item, ...args) {/* 주문서 START */
    const items = [];
    for (let i = 0; i < item.length; i++) {
      const temp = item[i];
      for (let i = 0; i < temp.length; i++) {
        items.push(temp[i]);
      }
    }
    this.callADLog("ORDER_SHEET", items, ...args);
  }, /* 주문서 END */
  viewBasket: function (paramObj, gtag) {
    try {
      const gsfItems = (paramObj.delivTypeDtoList || [])
                      .map(each => each.supplFirmDtoList || [])
                      .reduce((p, c) => p.concat(c), [])
                      .map(each => each.bsktInqRsltDtoList || [])
                      .reduce((p, c) => p.concat(c), []);
      const mfItem = (paramObj.supplFirmDtoList || [])
                      .map(each => each.bsktInqByDlfeeIdDtoList || [])
                      .reduce((p, c) => p.concat(c), [])
                      .map(each => each.bsktInqRsltDtoList || [])
                      .reduce((p, c) => p.concat(c), []);
      const items = gsfItems.concat(mfItem);
      this.callADLog("VIEW_CART", items, paramObj['totDlfee'], paramObj['totItemDcSprc']);
      const gtagItem = [];
      for (let i = 0; i < items.length; i++) {
        const gItem = {
          'id': items[i].itemId,
          'name': items[i].itemNm,
          'price': items[i].itemSprc,
          'quantity': items[i].bsktQty,
          'category': items[i].dspCtgNm,
          'list_name': 'Basket List',
        };
        gtagItem.push(gItem);
      }
      gtag.event('add_to_cart', { 'items': gtagItem });
    } catch (e) {
    }
  }, /* 장바구니 인입 */
  viewProduct: async function(item) {/* 상품상세조회 START */
    item.totQty = 1; // 상세 조회 수량 1 설정
    try {
      const param = {
        itemId: item.itemId,
        mallId: CookieUtils.getCookie('MALL_ID'),
        storId: item.storId,
        supplFirmCd: item.supplFirmCd
      };
      const result = await ApiUtils.get('/fo/md/iteminfomgnt/item-info', param);
      if (result.data.data != null) {
        item.dspCtgId = result.data.data.dspCtgId;
        item.dspCtgNm = result.data.data.dspCtgNm;
      }
    } catch (e) {
    }
    const items = [];
    items.push(item);
    this.callADLog("VIEW_ITEM", items);
  }, /* 상품상세조회 END */
  viewSpecialEvent(item) {/* 기획전 START */
    // 상품목록조회와 동일
    this.callADLog("VIEW_SPECIAL_EVENT", item);
  }, /* 기획전 END */
  viewCategory(item, ...args) {/* 카테고리 START */
    this.callADLog("VIEW_CATEGORY", item, ...args);
  }, /* 카테고리 END */
  signupComplete(item, ...args) {
    this.callADLog("REG_USER", item);
  }, /* 회원가입 완료 */
  termsAgree() {
    // 약관동의확인 완료
    // Adobe
    _satellite.track('terms.agree');
  },
  userActive() {
    // 휴면해제 완료
    // Adobe
    _satellite.track('user.active');
  },
  signupMessage(msgFlag) {
    // 본인인증 알럿출력
    // Adobe
    _satellite.track('signup.message', { msgFlag: msgFlag });
  },
  joinMemberShip(items) {
    // 유료멤버십
    this.callADLog("JOIN_MEMBERSHIP", items);
  },
  gnbSlide(msgFlag) {
    // Adobe
    _satellite.track('pageView', { 'pageName': msgFlag });
    // 이융성 S 주석 요청
    // _satellite.track('gnb.slide', { gnbName: msgFlag });
  },
  async canceledOrder(ordId, refundItems) {
    // 취소완료
    try {
      const params = {
        ordId: ordId,
      };
      const res = await ApiUtils.get('/fo/cs/orddelivdtl/order-detail-base-info', params);
      if (res.data === null || res.data.data === null) {
        return;
      }
      const items = res.data.data.itemList;
      let itemList = [];
      // 부분 취소일 경우
      if (refundItems) {
        for (let i = 0; i < refundItems.length; i++) {
          const idx = items.findIndex(function(el) {
            return el.itemId === refundItems[i].itemId;
          });
          itemList.push(items[idx]);
        }
      } else {
        itemList = items;
      }
      const otherRes = await ApiUtils.get('/fo/cs/orddelivdtl/order-detail-other-info', params);
      const dlfeeList = otherRes.data.data.dlfeeList;
      this.callADLog("CANCELED_ORDER", itemList, ordId, dlfeeList);
    } catch (e) {
    }
  },
  callADLog(action, item, ...args) {
    try {
      switch (action) {
        case "LOGIN":
          this.setFacebook(action, item, ...args);
          this.setAdobe(action, item, ...args);
          this.setAdbrix(action, item, ...args);
          break;
        case "LOGOUT":
          this.setAdobe(action, item, ...args);
        case "VIEW_HOME":
          this.setAdobe(action, item, ...args);
          this.setFacebook(action, item, ...args);
          this.setKakao(action, item, ...args);
          this.setAdbrix(action, item, ...args);
          break;
        case "REG_USER": // 가입완료
          this.setFacebook(action, item, ...args);
          this.setKakao(action, item, ...args);
          this.setAdbrix(action, item, ...args);
          this.setAdobe(action, item, ...args);
          this.setNaver(action, item, ...args);
          break;
        case "SEARCH": // 검색
          this.setFacebook(action, item, ...args);
          this.setAdbrix(action, item, ...args);
          this.setKakao(action, item, ...args);
          break;
        case "VIEW_ITEM":
          this.setFacebook(action, item, ...args);
          this.setAdbrix(action, item, ...args);
          this.setKakao(action, item, ...args);
          this.setAdobe(action, item, ...args);
          break;
        case "ADD_CART":
          this.setFacebook(action, item, ...args);
          this.setAdbrix(action, item, ...args);
          this.setKakao(action, item, ...args);
          this.setAdobe(action, item, ...args);
          this.setNaver(action, item, ...args);
          break;
        case "VIEW_CART":
          this.setAdbrix(action, item, ...args);
          break;
        case "DEL_CART":
          this.setAdobe(action, item, ...args);
          break;
        case "FIRST_ORDER":
          break;
        case "ORDER_SHEET":
          this.setAdobe(action, item, ...args);
          break;
        case "ORDER_COMPLETE_BEFORE":
          this.setAdobe(action, item, ...args);
          break;
        case "ORDER_COMPLETE":
          this.setFacebook(action, item, ...args);
          this.setAdbrix(action, item, ...args);
          this.setKakao(action, item, ...args);
          this.setAdobe(action, item, ...args);
          this.setNaver(action, item, ...args);
          break;
        case "VIEW_SPECIAL_EVENT":
          break;
        case "VIEW_CATEGORY":
          this.setAdobe(action, args[0], ...args);
          this.setAdbrix(action, item, ...args);
          this.setKakao('VIEW_ITEM_LIST', item, ...args); // 카카오픽셀의 경우 category 진입시 처리
          break;
        case "JOIN_MEMBERSHIP":
          this.setAdbrix(action, item, ...args);
          this.setAdobe(action, item, ...args);
          this.setFacebook(action, item, ...args);
          this.setKakao(action, item, ...args);
          break;
        case "CANCELED_ORDER":
          this.setAdbrix(action, item, ...args);
        default:
          break;
      }
    } catch (e) {
    }
  },
  setAdbrix(action, item, ...args) { // 애드브릭스
    try {
      switch (action) {
        case "VIEW_HOME":
          appCallTrackingViewHome();
          break;
        case "VIEW_CART":
          const basketList = [];
          let totalPrice = 0;
          for (let i = 0; i < item.length; i++) {
            totalPrice += (item[i]['itemDcSprc'] * item[i]['bsktQty'] - item[i]['cmplDcAmt'] - item[i]['itemCpnDcAmt'] - item[i]['dblDcCpnDcAmt']) || 0;
            basketList.push({
              prodId: item[i]['itemId'],
              prodName: item[i]['itemNm'],
              prodPrice: String(item[i]['itemDcSprc'] ? item[i]['itemDcSprc'] : (item[i]['itemSprc'] * item[i]['bsktQty']) || 0),
              prodQuantity: String(item[i]['bsktQty']),
              prodDiscount: String(item[i]['prcDcAmt'] ? item[i]['prcDcAmt'] : Math.abs(((item[i]['itemSprc'] * item[i]['bsktQty']) - ((item[i]['normSprc'] + item[i]['skuAddAmt']) * item[i]['bsktQty'])) || 0) ),
              storId: item[i]['storId'],
              category: item[i]['dspCtgNm']
            });
          }
          if (args[0]) {
            totalPrice += args[0];
          }
          if (args[1]) {
            totalPrice += args[1];
          }
          const basket = {
            totalPrice: String(totalPrice),
            basketList: basketList,
          };
          appCallTrackingBasket(basket);
          break;
        case "VIEW_ITEM":
          const jsonObject = {
            storId: item[0]['storId'],
            prodId: item[0]['itemId'],
            prodName: item[0]['itemNm'],
            prodPrice: String(item[0]['sellAmt']),
            category: item[0]['dspCtgNm'],
            prodDiscount: String(item[0]['applDcPromAmt']),
          };
          appCallTrackingViewProduct(jsonObject);
          break;
        case "VIEW_ITEM_LIST":
          appCallTrackingViewCategory(item[0]);
          break;
        case "ORDER_COMPLETE":
          const payType = args[0]['payType'];
          let paymentMethod = '';
          if (payType == "02") { // 신용카드
            paymentMethod = 'C';
          } else if (payType == "01") { // 계좌이체
            paymentMethod = 'T';
          } else if (payType == "04" || payType == "05" || payType == "06" || payType == "10" || payType == "13") { // 페이코 카카오페이 네이버페이 휴대폰소액결제 모바일팝
            paymentMethod = 'M';
          } else {
            paymentMethod = 'E';
          }
          const itemList = [];
          let totalDiscount = 0;
          totalPrice = 0;
          for (let i = 0; i < item.length; i++) {
            totalDiscount += (item[i]['itemSprc'] * item[i]['itemOrdQty']) - (item[i]['itemDcSprc'] * item[i]['itemOrdQty']) - item[i]['cmplDcAmt'] - item[i]['itemCpnDcAmt'] - item[i]['dblDcCpnDcAmt'];
            totalPrice += item[i]['itemDcSprc'] * item[i]['itemOrdQty'] - item[i]['cmplDcAmt'] - item[i]['itemCpnDcAmt'] - item[i]['dblDcCpnDcAmt'];
            itemList.push({ prodId: item[i]['itemId'], prodName: item[i]['itemNm'], prodPrice: String(item[i]['itemDcSprc']), prodQuantity: String(item[i]['itemOrdQty']), prodDiscount: String(item[i]['itemSprc']-item[i]['itemDcSprc']), storId: item[i]['storId'], category: item[i]['itemClasfCtgNm']});
          }
          const orderComplete = {
            totalPrice: String(totalPrice+args[0].totDelivFee),
            firstOrder: args[0].fstOrdYn=='Y'?'true':'false',
            orderNo: args[1],
            storId: CookieUtils.getCookie('STOR_ID'),
            cmmSteId: CookieUtils.getCmmSteId()
          };
          const order = {
            totalDiscount: String(totalDiscount),
            deliveryCharge: String(args[0].totDelivFee),
            totalPrice: String(totalPrice+args[0].totDelivFee),
            orderNo: args[1],
            firstOrder: args[0].fstOrdYn=='Y'?'true':'false',
            paymentMethod: paymentMethod,
            storId: CookieUtils.getCookie('STOR_ID'),
            cmmSteId: CookieUtils.getCmmSteId(),
            orderList: itemList
          };
          appCallTrackingOrderList(order);
          appCallTrackingOrderComplete(orderComplete);
          break;
        case 'SEARCH':
          const arrProd = [];
          for (let i = 0; i < item.length; i++) {
            arrProd.push({ prodId: item[i]['itemId'], prodName: item[i]['itemNm'], prodPrice: String(item[i]['sellAmt']), category: item[i]['mclsDspCtgNm'], storId: item[i]['storId']});
          };
          const searchResult = {
            keyword: args[0],
            searchCnt: args[1],
            searchProdList: arrProd
          };
          appCallTrackingSearchResult(searchResult);
          break;
        case 'REG_USER':
          const storInfo = {
            storId: CookieUtils.getCookie('STOR_ID'),
            mbrJoinMethod: item
          };
          appCallTrackingJoinComplete(storInfo);
          break;
        case 'LOGIN':
          const userInfo = {
            userID: item,
            storId: CookieUtils.getCookie('STOR_ID')
          };
          appCallTrackingLogin(userInfo);
          break;
        case 'VIEW_CATEGORY':
          const categoryList = [];
          if (args[0]) {
            const maxCount = args[0].length > 10 ? 10 : args[0].length;
            for (let i = 0; i < maxCount; i++) {
              categoryList.push({ prodId: args[0][i]['itemId'], prodName: args[0][i]['itemNm'], storId: args[0][i]['storId'], prodPrice: String(args[0][i]['sellAmt']), category: item.dspCtgNm });
            };
          }
          const category = {
            category: item.dspCtgNm,
            storId: CookieUtils.getCookie('STOR_ID'),
            categoryList: categoryList
          };
          appCallTrackingViewCategory(category);
          break;
        case 'JOIN_MEMBERSHIP':
          appCallTrackingDalipassComplete(item);
          break;
        case 'CANCELED_ORDER':
          const canceledProdList = [];
          totalPrice = 0;
          let deliveryCharge = 0;
          for (let i = 0; i < item.length; i++) {
            canceledProdList.push({ prodId: item[i]['itemId'], prodName: item[i]['itemNm'], prodQuantity: String(item[i]['ordQty']), prodDiscount: String(0), prodPrice: String(item[i]['ordAmt']), category: item[i]['dspCtgNm'], storId: item[i]['storId']});
            totalPrice += Number(item[i]['ordAmt']);
          };
          for (let i = 0; i < args[1].length; i++) {
            deliveryCharge += Number(args[1][i]['bsktDlfee']);
          }
          const refundInfo = {
            orderNo: args[0],
            deliveryCharge: String(deliveryCharge),
            totalPrice: String(totalPrice),
            canceledProdList: canceledProdList,
          };
          appCallTrackingRefundProdList(refundInfo);
          break;
        default:
          break;
      }
    } catch (e) {
    }
  },
  setAdobe(action, item, ...args) { // 어도비
    try {
      const arrAdobeItem = []; // 어도비 아이템
      const simpleStorId = ['3006', '3007', '3014', '3015', '3018'];
      let simpleIndex = '';
      if ( item.length > 0 && item.length == 1 ) {
        simpleIndex = simpleStorId.findIndex(function(el) {
          return el === item[0]['storId'];
        });
        arrAdobeItem.push({
            "PROD_ID": item[0]['itemId'],
            "PROD_NM": item[0]['itemNm'],
            "PROD_CAT": item[0]['dspCtgNm'],
            "PROD_QTY": action === 'ORDER_COMPLETE' ? item[0]['itemOrdQty'] : args[0] === 'ORDER_DELIV' ? item[0]['ordQty'] : item[0]['totQty'], // 각 페이지 마다 수량 항목이 다름
            "PROD_PRICE_SELL_AMT": item[0]['sellAmt'],
            "PROD_PRICE_DC_SELL_AMT": item[0]['dcSellAmt'],
            "PROD_PRICE_ORD_AMT": item[0]['ordAmt'], // ORDER_DELIV by 주문배송상세 > 선택상품장바구니담기
            "PROD_PRICE_DRCT_DC_SELL_AMT": item[0]['drctDcSellAmt'],
            "PROD_OPT": "",
            "ITEM_CD": item[0]['itemCd'], // 상품코드
            "MALL_ID": simpleIndex == -1 ? CookieUtils.getCookie('MALL_ID') : '20', // 몰ID
            "STORE_ID": item[0]['storId'], // 매장ID
            "SUPPL_FIRM_CD": item[0]['supplFirmCd'], // CookieUtils.getCookie('SUPPL_FIRM_CD'), //  공급업체코드
            "DSP_CTG_ID": item[0]['dspCtgId'], // 전시카테고리ID
          });
      } else if ( item.length > 1 ) {
        for (let i = 0; i < item.length; i++) {
          simpleIndex = simpleStorId.findIndex(function(el) {
            return el === item[i]['storId'];
          });
          // 어도비
          arrAdobeItem.push({
            "PROD_ID": item[i]['itemId'],
            "PROD_NM": item[i]['itemNm'],
            "PROD_CAT": item[i]['dspCtgNm'],
            "PROD_QTY": action === 'ORDER_COMPLETE' ? item[i]['itemOrdQty'] : args[0] === 'ORDER_DELIV' ? item[i]['ordQty'] : item[i]['totQty'], // 각 페이지 마다 수량 항목이 다름
            "PROD_PRICE_SELL_AMT": item[i]['sellAmt'],
            "PROD_PRICE_DC_SELL_AMT": item[i]['dcSellAmt'],
            "PROD_PRICE_ORD_AMT": item[i]['ordAmt'], // ORDER_DELIV by 주문배송상세 > 선택상품장바구니담기
            "PROD_PRICE_DRCT_DC_SELL_AMT": item[i]['drctDcSellAmt'],
            "PROD_OPT": "",
            "ITEM_CD": item[i]['itemCd'], // 상품코드
            "MALL_ID": simpleIndex == -1 ? CookieUtils.getCookie('MALL_ID') : '20', // 몰ID
            "STORE_ID": item[i]['storId'], // 매장ID
            "SUPPL_FIRM_CD": item[i]['supplFirmCd'], // CookieUtils.getCookie('SUPPL_FIRM_CD'), //  공급업체코드
            "DSP_CTG_ID": item[i]['dspCtgId'], // 전시카테고리ID
          });
        }
      }
      switch (action) {
        case "LOGIN":
          _satellite.track('login.success', { custNo: sha256(item), storId: CookieUtils.getCookie('STOR_ID'), supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD') });
          break;
        case "LOGOUT":
          _satellite.track('logout.success');
          break;
        case "REG_USER":
          _satellite.track('signup.complete');
          break;
        case "VIEW_PAGE":
          _satellite.track("pageView", { prodData: arrAdobeItem });
          break;
        case "DEL_CART":
          _satellite.track('prod.removeFromCart', { prodData: arrAdobeItem });
          break;
        case "VIEW_ITEM":
          _satellite.track('prodData', { prodData: arrAdobeItem });
          break;
        case "VIEW_CATEGORY":
          _satellite.track('viewCategory', { prodData: arrAdobeItem });
          break;
        case "ADD_CART":
          _satellite.track("prod.addToCart", { prodData: arrAdobeItem });
          break;
        case "ORDER_COMPLETE_BEFORE":
          _satellite.track("checkoutApiCall");
          break;
        case "ORDER_COMPLETE":
          _satellite.track("Purchase", { prodData: arrAdobeItem, purchaseId: args[1], payAmt: args[0]['amt']});
          break;
        case "ORDER_SHEET":
          _satellite.track("orderSheet", { prodData: arrAdobeItem});
          break;
        case "VIEW_HOME":
          _satellite.track("pageView", { pageName: '메인'});
          break;
        case "JOIN_MEMBERSHIP":
          _satellite.track("card.register", { cardNm: item['cardIssuerName']});
          if (item['mbsType']) {
            _satellite.track("membership.purchase", { mbsName: '유료멤버십', mbsType: '유료'});
          } else {
            _satellite.track("membership.purchase", { mbsName: '유료멤버십', mbsType: '체험'});
          }
          break;
        default:
          break;
      }
    } catch (e) {
    }
  },
  setFacebook(action, item, ...args) { // 어도비
    try {
      const arrFbProdId = []; // 상품 ID
      const arrFbProdNm = []; // 상품명
      const arrFbCatNm = []; //  카테고리명
      let totSumAmt = 0; // 상품금액
      let mallNm = '';
      const paramObj = {};
      paramObj.content_ids = null; // 그룹ID
      paramObj.content_name = null; // 페이지/제품의 이름
      paramObj.content_category = null; // 페이지/제품의 카테고리
      paramObj.value = null; // 이 이벤트를 실행한 사용자의 가치
      paramObj.currency = 'KRW'; // value에 지정된 통화
      paramObj.content_type = 'product'; // Facebook이 특정 제품 ID 또는 같은 제품의 다른 에디션을 위한 제품 그룹 ID를 수신

      if ( item.length > 1 ) {
        for (let i = 0; i < item.length; i++) {
          arrFbProdId.push(item[i]['itemId']);
          arrFbProdNm.push(item[i]['itemNm']);
          arrFbCatNm.push(item[i]['dspCtgId']);
          totSumAmt += item[i]['sellAmt'];
        }
      }
      if (CookieUtils.getCookie('MALL_ID') === '1') {
          mallNm = 'GSfresh';
      } else if (CookieUtils.getCookie('MALL_ID') === '11') {
        mallNm = '달리살다';
      } else if (CookieUtils.getCookie('MALL_ID') === '20') {
        mallNm = '심플리쿡';
      }
      switch (action) {
        case "SEARCH":
          fbq('track', 'Search', { search_string: args[0] });
          break;
        case "VIEW_HOME":
          const homeName = CookieUtils.getCookie('MALL_ID')=='11'?'ViewHome_dalisalda':'ViewHome';
          // 2020-10-16 sgchoi ViewHome 은 사용자정의 이벤트로 처리
          fbq('trackCustom', homeName);
          break;
        case "VIEW_PAGE":
          fbq('track', 'PageView');
          break;
        case "LOGIN":
          fbq('track', 'Login');
          break;
        case "REG_USER":
          fbq('track', 'CompleteRegistration');
          break;
        case "VIEW_ITEM":
          // 상품페이지 조회
          paramObj.content_ids = item[0]['itemId'];
          paramObj.content_name = item[0]['itemNm'];
          paramObj.content_category = item[0]['dspCtgNm'];
          paramObj.value = item[0]['sellAmt'];
          paramObj.content_group = mallNm;
          fbq('track', 'ViewContent', paramObj);
          break;
        case "ADD_CART":
        case "ORDER_COMPLETE":
          // 장바구니 / 구매완료
          const evtId = action == "ADD_CART" ? 'AddToCart':'Purchase';
          paramObj.content_ids = arrFbProdId;
          paramObj.content_name = arrFbProdNm;
          paramObj.content_category = arrFbCatNm;
          paramObj.value = action == "ADD_CART" ? totSumAmt:args[0]['amt'];
          paramObj.content_group = mallNm;
          fbq('track', evtId, paramObj);
          break;
        case "JOIN_MEMBERSHIP":
          fbq('track', 'dalisalda_Membership');
          break;
        default:
          break;
      }
    } catch (e) {
    }
  },
  setKakao(action, item, ...args) { // 카카오
    try {
      let evtId = "VIEW_ITEM" == action ? "DetailPage" : "CategoryView";
      switch (action) {
        case "LOGIN":
        case "VIEW_HOME":
          evtId = "LOGIN" == action ? "Login" : "ViewHome";
          kakaoPixel(this.trackId.kakaoPixel).pageView(evtId);
          break;
        case "REG_USER": // 가입완료
          kakaoPixel(this.trackId.kakaoPixel).pageView();
          kakaoPixel(this.trackId.kakaoPixel).completeRegistration();
          break;
        case "SEARCH": // 검색
          kakaoPixel(this.trackId.kakaoPixel).pageView();
          if (item) {
            kakaoPixel(this.trackId.kakaoPixel).search({keyword: args[0]});
          } else { // 검색 정보 없는 경우
            kakaoPixel(this.trackId.kakaoPixel).search();
          }
          break;
        case "VIEW_ITEM":
        case "VIEW_ITEM_LIST":
          evtId = "VIEW_ITEM" == action ? "DetailPage" : "CategoryView";
          kakaoPixel(this.trackId.kakaoPixel).viewContent({tag: evtId});
          break;
        case "ADD_CART":
          kakaoPixel(this.trackId.kakaoPixel).viewCart('AddToCart');
          break;
        case "FIRST_ORDER": // 첫주문 여부 파라미터로 판단하기로 함
        case "ORDER_COMPLETE":
          evtId = "Y" == args[0].fstOrdYn ? "FirstOrder" : "OrderComplete";
          const arrProd = [];
          for (let i = 0; i < item.length; i++) {
            arrProd.push({ name: item[i]['itemNm'], quantity: item[i]['totQty'], price: item[i]['sellAmt'] });
          }
          kakaoPixel(this.trackId.kakaoPixel).purchase({
              total_quantity: arrProd.length, // 주문 내 상품 개수(optional)
              total_price: args[0]['amt'], // 주문 총 가격(optional)
              currency: "KRW", // 주문 가격의 화폐 단위(optional, 기본 값은 KRW)
              products: [arrProd], // 주문 내 상품 정보(optional)
              tag: evtId
          });
          break;
        case "JOIN_MEMBERSHIP":
          kakaoPixel(this.trackId.kakaoPixel).pageView();
          kakaoPixel(this.trackId.kakaoPixel).signUp('SignUp');
          break;
        default:
          kakaoPixel(this.trackId.kakaoPixel).pageView();
          break;
      }
    } catch (e) {
    }
  },
  setNaver(action, item, ...args) {
    const _nasa = {};
    try {
      switch (action) {
        case "REG_USER":
          _nasa["cnv"] = wcs.cnv("2", "1");
          break;
        case "ADD_CART":
          _nasa["cnv"] = wcs.cnv("3", item[0]['sellAmt']);
          break;
        case "ORDER_COMPLETE":
          _nasa["cnv"] = wcs.cnv("1", args[0].amt);
          break;
        default:
          break;
      }
    } catch (e) {
    }
  },
};

export default Tracker;
