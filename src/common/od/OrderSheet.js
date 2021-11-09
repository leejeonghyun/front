import ApiUtils from '@/common/ApiUtils';

const OrderSheet = {
  async processOrdsReg() {
    const iOrdsRegProc = {
      bsktOptDlvpInfo: {
        mbrDlvpSeqno: 0,
        bsktOptDelivTypeGrpInfoList: [
          {
            ordTypeCd: '', // #주문유형코드
            delivTypeCd: '', // #배송유형코드
            bsktOptItemInfoList: [
              {
                bsktId: '', // #장바구니ID
                relatBsktId: '', // 연관장바구니ID
                bsktOptItemCpnInfoList: [
                  {
                    promId: '',
                    cpnIsseSeqno: 0,
                  }
                ],
                bsktOptDblDcCpnInfoList: [
                  {
                    promId: '',
                    cpnIsseSeqno: 0, //
                  }
                ],
              }
            ],
          }
        ],
      }
    };
    await ApiUtils.post('/fo/od/ordsmgnt/ordersheet', iOrdsRegProc);
  },
  /**
    * 입력박스 입력시 숫자만 입력하게 하는 함수
    * @param {string} str
    * @return {string} 문자를 제외한 숫자만 반환
    */
  numberOnly: function(str) {
    str = str.replace(/[^0-9]/g, '');
    return str;
  },
  /**
  * 입력박스 입력시 숫자와 .만 입력하게 하는 함수
  * @param {string} str
  * @return {string} 문자를 제외한 숫자만 반환
  */
  numberPointOnly: function(str) {
    str = str.replace(/[^0-9\.]/g, "");
    return str;
  },
};

export default OrderSheet;
