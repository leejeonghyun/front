import ImgUtils from '@/common/ImgUtils';
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import SiteUtils from '@/common/SiteUtils';
import CookieUtils from './CookieUtils';

// const IMG_SIZE_REPLACE = '{SIZE}';
// const IMG_SIZE = '300';

const ItemTemplete = {
    img: function (imgUrl, imgSize) {
        const IMG_SIZE_REPLACE = '{SIZE}';
        let IMG_SIZE = '300';
        if (typeof (imgSize) != 'undefined') {
            IMG_SIZE = imgSize;
        }
        let itemImgPath = '';
        if (!StringUtils.isEmpty(imgUrl)) {
            itemImgPath = ImgUtils.path(imgUrl.replace(IMG_SIZE_REPLACE, IMG_SIZE));
        } else {
            itemImgPath = require('@/assets/images/img/img_product_nothumb.jpg');
        }
        return itemImgPath;
    },
    itemDetail: function (itemValue, searchYn) {
        if (itemValue.sellAgeRestrCd == '19') { // 19세 => 로그인으로 이동 or 로그인 시 인증페이지 이동 필요
            // 비로그인 시
            // const ageLimitUrl = SiteUtils.commo('/cu/my_page');
            // 로그인 하였고 성인인증 안한 경우 등 협의 되지않아 구현 x

            // 경로이동
            // location.href = ageLimitUrl;
        };
        // 00 전체이용가 상품
        let url =
            '/md/product_detail?itemId=' + itemValue.itemId +
            '&storId=' + itemValue.storId +
            '&supplFirmCd=' + itemValue.supplFirmCd;
        if (itemValue.ssevntId && itemValue.ssevntTimes) {
            const ssevntQuery = '&ssevntId=' + itemValue.ssevntId + '&ssevntTimes=' + itemValue.ssevntTimes;
            url = url + ssevntQuery;
        }
        if (itemValue.mallId) {
            const mallId = '&mallId=' + itemValue.mallId;
            url = url + mallId;
        }
        if (searchYn) { // 2020.09.16 검색에서 넘기는 경우 gsfresh,새벽배송 구분하기위해서 추가
            url = url + '&searchYn=Y';
        }
        return url;
    },
    getMall(itemValue) {
        const mallId = CookieUtils.getCookie('MALL_ID');
        let mall = mallId === '11' ? 'ds' : 'fr';
        //  진입몰이 gsfresh일때 달리살다상품인경우 -> 달리살다로
        if (mallId === '1' && itemValue.mallId === '11') {
            mall = 'ds';
        }
        // 진입몰이 달리살다일때 달리살다상품이 아닌경우 -> gsfresh로
        if (mallId === '11' && itemValue.mallId !== mallId) {
            mall = 'fr';
        }
        return mall;
    },
    getDcRate: function (bfrSellAmt, sellAmt) {
        const dcAmt = bfrSellAmt - sellAmt;
        let dcRate = Math.floor((dcAmt / bfrSellAmt) * 100);
        if (dcRate > 99) {
            dcRate = 99;
        }
        return dcRate;
    },
    getUnitPrc(sellAmt, unitQty, unitVol) {
        return Math.round(sellAmt * unitQty / unitVol);
    },
    getDay(itemStkotInstBeginDt) {
        let theDate = ''; // 년-월-일
        let beginDt = ''; // 월/일(요일)
        const year = itemStkotInstBeginDt.substr(0, 4);
        const month = itemStkotInstBeginDt.substr(4, 2);
        const day = itemStkotInstBeginDt.substr(6, 2);
        theDate = theDate.concat(year, '-', month, '-', day);
        // 요일
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[new Date(theDate).getDay()];
        beginDt = beginDt.concat(month, '/', day, '(', dayOfWeek, ') ');
        return beginDt;
    },
    async getAlikeList(itemValue) {
        const params = {
            itemId: itemValue.itemId,
            ssevntId: itemValue.ssevntId,
            ssevntTimes: itemValue.ssevntTimes,
            mallId: itemValue.mallId,
            storId: itemValue.storId,
            supplFirmCd: itemValue.supplFirmCd,
            dspCtgId: itemValue.itemRepDspCtgId,
            sellAmt: itemValue.sellAmt,
        };
        const rep = await ApiUtils.get('/fo/md/iteminfomgnt/alike-item-list', params);
        return rep.data.success ? rep.data.data : [];
    },
    async promoListAction(type, params) {
        let apiUrl = "";
        if (type === 'coupon') apiUrl = "/fo/md/itemaddinfomgnt/item-apply-coupon-list";
        if (type === 'card') apiUrl = "/fo/md/itemaddinfomgnt/item-card-promotion-list";
        if (type === 'comco') apiUrl = "/fo/md/itemaddinfomgnt/item-comco-promotion-list";
        // 프로모션목록
        try {
            const result = await ApiUtils.get(
                apiUrl,
                params
            );
            const respPromList = result.data;
            const promList = respPromList.data;
            return promList;
            // return respPromList.success ? promList : [];
        } catch (e) {
            console.error("오류가 발생했습니다[promoListAction]", e);
        }
    },
    getDali: function(normSprc, mbsDcAmt) {
        const dcAmt = normSprc - mbsDcAmt;
        let dcRate = Math.floor((dcAmt / normSprc) * 100);
        if (dcRate > 99) {
            dcRate = 99;
        }
        return dcRate;
    },
};
export default ItemTemplete;
