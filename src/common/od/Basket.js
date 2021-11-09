import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import Tracker from '@/common/Tracker';
import LoginUtils from '@/common/LoginUtils';
import JwtUtils from '@/common/JwtUtils';

const Basket = {
  async putBskt(itemId, skuId, grpItemId, bsktQty, dspCtgId, ssevntId, promId, ordTypeCd, delivTypeCd, delivDt, zipcd, storId, supplFirmCd) {
    const bsktPutDtoList = [];
    const iBsktPut = {
      bsktTypeCd: '1',
      dspCtgId: dspCtgId,
      itemId: itemId,
      skuId: skuId,
      grpItemId: grpItemId,
      bsktQty: bsktQty,
      ssevntId: ssevntId,
      promId: promId,
      relatBsktId: '',
      promBeneSeqno: '',
      promPresFrgfSeqno: '',
      delivTypeCd: delivTypeCd,
      delivDt: delivDt,
      ordTypeCd: ordTypeCd,
      mallId: CookieUtils.getMallId(),
      zipcd: zipcd,
      storId: storId,
      supplFirmCd: supplFirmCd
    };

    iBsktPut.itemGrpSeqno = 1;
    iBsktPut.itemCompoCd = '01';

    bsktPutDtoList.push(iBsktPut);
    const result = this.putMultiBskt(bsktPutDtoList, ordTypeCd, delivTypeCd, zipcd);

    return result;
  },
  async putFrgf(relatBsktId, frgfInfoList) {
    const iBsktPut = {
      bsktTypeCd: '1',
      relatBsktId: relatBsktId,
      frgfInfoList: frgfInfoList,
      sessnId: CookieUtils.getOdBsktUuid(),
    };
    const result = await ApiUtils.post('/fo/od/bsktmgnt/free-gift', iBsktPut);
    console.log(result.data.data);
    return result;
  },
  async putMultiBskt(bsktPutDtoList, ordTypeCd, delivTypeCd, zipcd) {
    // 앱트래커
    const prodData = [];
    for (let idx = 0; idx < bsktPutDtoList.length; idx++) {
      bsktPutDtoList[idx].ordTypeCd = ordTypeCd;
      bsktPutDtoList[idx].delivTypeCd = delivTypeCd;
      prodData.push({
        "itemId": bsktPutDtoList[idx].itemId, // 상품ID
        "itemNm": bsktPutDtoList[idx].itemNm, // 상품명
        "sellAmt": null, // 상품금액
        "dspCtgNm": null, // 전시카테고리명
        "totQty": null, // 상품수량
        "storId": null, // 매장ID
        "itemImg": null, // 상품이미지URL
        "totDcAmt": null, // 할인가격
        "ofsYn": null, // 품절여부
        "dspCtgId": null, // 카테고리ID
      });
    }
    const iBsktPut = {
      ordTypeCd: ordTypeCd,
      delivTypeCd: delivTypeCd,
      bsktPutDtoList: bsktPutDtoList,
      mallId: CookieUtils.getMallId(),
      zipcd: zipcd,
      bsktTypeCd: '1',
      sessnId: CookieUtils.getOdBsktUuid(),
    };
    const result = await ApiUtils.post('/fo/od/bsktmgnt/basket-item', iBsktPut);
    if (result.data.success) {
      Tracker.prodAddToCart(prodData); // 장바구니 상품담기 완료시 실행
      console.log(result.data.data);
    }
    return result;
  },
  async goBaro(
    itemId,
    skuId,
    grpItemId,
    bsktQty,
    dspCtgId,
    ssevntId,
    promId,
    ordTypeCd,
    delivTypeCd,
    delivDt,
    zipcd,
    storId,
    supplFirmCd
  ) {
    const isLogin = LoginUtils.isLogin(); // 로그인 여부 체크 필요
    const bsktPutDtoList = [];
    const bsktPutDto = {
      bsktTypeCd: '2',
      dspCtgId: dspCtgId,
      itemId: itemId,
      skuId: skuId,
      grpItemId: grpItemId,
      bsktQty: bsktQty,
      ssevntId: ssevntId,
      promId: promId,
      relatBsktId: '',
      promBeneSeqno: '',
      promPresFrgfSeqno: '',
      delivTypeCd: delivTypeCd,
      delivDt: delivDt,
      ordTypeCd: ordTypeCd,
      mallId: CookieUtils.getMallId(),
      zipcd: zipcd,
      storId: storId,
      supplFirmCd: supplFirmCd,
    };

    if (isLogin) {
      bsktPutDto.itemGrpSeqno = 1;
      bsktPutDto.itemCompoCd = '01';

      bsktPutDtoList.push(bsktPutDto);

      /*
      for (let idx=0; idx<bsktPutDtoList.length; idx++) {
        bsktPutDtoList[idx].ordTypeCd = ordTypeCd;
        bsktPutDtoList[idx].delivTypeCd = delivTypeCd;
      }
      */
      const iBsktPut = {
        ordTypeCd: ordTypeCd,
        delivTypeCd: delivTypeCd,
        bsktPutDtoList: bsktPutDtoList,
        mallId: CookieUtils.getMallId(),
        zipcd: zipcd,
      };
      const result = await ApiUtils.post(
        '/fo/od/bsktmgnt/ordersheet',
        iBsktPut
      );
      return result;
    } else {
      // 비로그인 시
      // 로컬스토리지에 iBsktPut 저장처리 필요
      alert('비회원은 주문할 수 없습니다.');
      return;
    }
  },
};

export default Basket;
