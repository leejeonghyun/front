import ApiUtils from "@/common/ApiUtils";

/**
 * 선물하기 서비스
 *
 */
const GiftService = {
    GIFT_ZIPCD: '07718',
    // 선물하기 장바구니 조회
    async getGiftBasketItemInfo(param) {
        console.log('GiftService.getGiftBasketItemInfo', param);
        try {
            const response = await ApiUtils.post('/fo/od/giftMgnt/gift-basket-item-list', param);
            return response && response.data && response.data.data || {};
        } catch (e) {
            console.log(e.message);
            return {};
        }
    },
    // 선물하기 주문서 생성
    async createGiftOrderSheet(param) {
        console.log('GiftService.createGiftOrderSheet', param);
        try {
            const response = await ApiUtils.post('/fo/od/giftMgnt/gift_order_sheet', param);
            return response && response.data && response.data.data || null;
        } catch (e) {
            console.log(e.message);
            return {};
        }
    },
};

export default GiftService;
