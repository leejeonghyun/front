import StringUtils from '@/common/StringUtils';
import IspAuth from '@/views/pa/common/IspAuth';
import ApiUtils from '@/common/ApiUtils';

export default {
  data() {
    return {
      cardCodeList: [
        { code: '41', name: 'BC카드', typeCd: 'ISP' },
        { code: '04', name: '국민카드', typeCd: 'ISP' },
        { code: '20', name: '우리카드', typeCd: 'ISP' },
        { code: '07', name: '수협카드', typeCd: 'ISP' },
        { code: '37', name: '전북은행카드', typeCd: 'ISP' },
        { code: '34', name: '광주은행카드', typeCd: 'ISP' },
        { code: '21', name: '신한카드', typeCd: 'XMPI' },
        { code: '45', name: '현대카드', typeCd: 'XMPI' },
        { code: '43', name: '삼성카드', typeCd: 'XMPI' },
        { code: '11', name: 'NH카드', typeCd: 'XMPI' },
        { code: '25', name: '하나카드(구. 하나SK)', typeCd: 'KMPI' },
        { code: '05', name: '하나카드(구. 외환)', typeCd: 'KMPI' },
        { code: '53', name: '씨티카드', typeCd: 'KMPI' },
        { code: '44', name: '롯데카드', typeCd: 'SMPI' },
        { code: '35', name: '제주은행카드', typeCd: 'XMPI' },
        { code: '35', name: '제주은행카드', typeCd: 'ISP' }
      ],
      deviceType: [
        { code: 'PC', name: 'PC' },
        { code: 'MOB', name: 'Mobile' }
      ],
      telcoType: [
        { code: 'KT', name: 'KT' },
        { code: 'LGU', name: 'LGU+' }
      ],
      easyPayType: [
        { code: 'NAVERPAY', name: '네이버페이' },
        { code: 'KAKAOPAY', name: '카카오페이' },
        { code: 'PAYCO', name: '페이코' }
      ],
      cancelType: [
        { code: 'ALL', name: '전체취소' },
        { code: 'PART', name: '부분취소' }
      ],
      giftCardType: [
        { code: 'HMGIFT', name: '해피머니' },
        { code: 'BNLGIFT', name: '북앤라이프' }
      ],
      payCompany: [

        { code: 'SMARTRO', name: '스마트로' },
        { code: 'KCP', name: 'KCP' }
      ],
      payCorp: [
        { code: 'SMARTROPG', name: '스마트로' },
        { code: 'PAYNOW', name: 'LGU+ Paynow' }
      ]
    };
  },
  created() {
    ApiUtils.loadScript('https://code.jquery.com/jquery-3.4.1.min.js');
    ApiUtils.loadScript('/js/legacy/common.app.js');
    setTimeout(() => {
      // console.log($('form'));
    }, 300);
  },
  mounted() {
    // this.callIspActiveX();
  },
  mixins: [
    IspAuth
  ],
  methods: {
    callIspActiveX() {
      /* -------------------------------------------------------------------------------------
        ISP ActiveX 인증모듈 (Virtual Payment)
      -------------------------------------------------------------------------------------- */
      const ispActiveX = document.createElement('script');
      ispActiveX.setAttribute('id', 'ispActiveX');
      ispActiveX.setAttribute('type', 'text/javascript');
      ispActiveX.setAttribute('charset', 'utf-8');
      ispActiveX.setAttribute('src', 'https://www.vpay.co.kr/eISP/Wallet_mix_layer_VP.js');
      document.getElementById(this.$el.id).appendChild(ispActiveX);
    },
    callMcashScript() {
      /* -------------------------------------------------------------------------------------
        휴대폰 소액결제 인증모듈
      -------------------------------------------------------------------------------------- */
      const mcashScript = document.createElement('script');
      mcashScript.setAttribute('id', 'mcashScript');
      mcashScript.setAttribute('type', 'text/javascript');
      mcashScript.setAttribute('charset', 'euc-kr');
      mcashScript.setAttribute('src', 'https://mcash.mobilians.co.kr/js/ext/ext_inc_comm.js');
      document.getElementById(this.$el.id).appendChild(mcashScript);
    },
    doIncludeNaverpaySDK() {
      /* -------------------------------------------------------------------------------------
        네이버페이 인증 SDK
      -------------------------------------------------------------------------------------- */
      const naverpaySdk = document.createElement('script');
      naverpaySdk.setAttribute('id', 'naverpaySdk');
      naverpaySdk.setAttribute('type', 'text/javascript');
      naverpaySdk.setAttribute('charset', 'utf-8');
      naverpaySdk.setAttribute('src', 'https://nsp.pay.naver.com/sdk/js/naverpay.min.js');
      document.getElementById(this.$el.id).appendChild(naverpaySdk);
    },
    callKmotionScript() {
      /* -------------------------------------------------------------------------------------
        kmotion결제 인증모듈
      -------------------------------------------------------------------------------------- */
      const kmotionScript = document.createElement('script');
      kmotionScript.setAttribute('id', 'kmotionScript');
      kmotionScript.setAttribute('type', 'text/javascript');
      kmotionScript.setAttribute('charset', 'utf-8');
      kmotionScript.setAttribute('src', 'https://customer.kbcard.com/cxo/js/acpay.js');
      document.getElementById(this.$el.id).appendChild(kmotionScript);
    },
    callKmotionPcScript() {
      /* -------------------------------------------------------------------------------------
        kmotion결제 인증모듈
      -------------------------------------------------------------------------------------- */
      const kmotionPcScript = document.createElement('script');
      kmotionPcScript.setAttribute('id', 'kmotionPcScript');
      kmotionPcScript.setAttribute('type', 'text/javascript');
      kmotionPcScript.setAttribute('charset', 'utf-8');
      kmotionPcScript.setAttribute('src', 'https://customer.kbcard.com/cxo/js/acpay2.js');
      document.getElementById(this.$el.id).appendChild(kmotionPcScript);
    },
    async getAuthentication() {
      const formData = this.form;
      const cardCode = formData.cardCode;
      /**
       *카드사가 선택되지 않았을 경우.
       */
      if ( StringUtils.isEmpty(cardCode) ) {
        alert("결제하실 카드를 선택하여 주세요.");
        return;
      }
      /*
       * ISP 인증 (BC, 우리, 수협, 전북은행, 광주은행, 우체국)
       */
      if (cardCode == '41' || cardCode == '20' || cardCode == '71' ||
          cardCode == '07' || cardCode == '37' || cardCode == '34' ||
          (formData.deviceType !== 'PC' && cardCode == '35') ||
          (formData.authType == "ISP" && cardCode == '04')) {
        alert("ISP Call.."+ cardCode);
        // 우리
        if (cardCode === "20") {
          this.form.VP_BC_ISSUERCODE = "WR";
        // 우체국
        } else if (cardCode === "71") {
          this.form.VP_BC_ISSUERCODE = "PT";
        } else {
          this.form.VP_BC_ISSUERCODE = "";
        }
        const ispForm = document.getElementById('ispForm');
        if (formData.deviceType === "PC") {
          const beforePost = BeforePost;
          beforePost(ispForm);
        } else {
          const data = {
            mallUserID: ispForm.memNo.value,
            totalPayAmt: this.form.KVP_PRICE,
            cardCode: this.form.KVP_CARDCOMPANY,
            issuerCode: this.form.VP_BC_ISSUERCODE,
            hashKey: this.form.hashKey,
            cardInterest: "0", // 할부선택 0: 유이자    1: 무이자
            cardQuota: ((this.form.KVP_QUOTA_INF.length === 1 && this.form.KVP_QUOTA_INF === "0") ? "0" + this.form.KVP_QUOTA_INF : this.form.KVP_QUOTA_INF) // 할부개월수
          };
          const that = this;
          let isFail = false;
          await ApiUtils
            .post('/fo/pa/mobileIspReqAuthTradeKey', data)
            .then(function(res) {
              console.log(res.data);
              if (res.data === null || res.data.resultCode !== '0000') {
                isFail = true;
                if (res.data !== null &&
                    res.data.resultCode !== null &&
                    res.data.resultCode !== '' &&
                    res.data.resultMsg !== null &&
                    res.data.resultMsg !== '') {
                  console.error(res.data.resultMsg);
                  alert(res.data.resultMsg);
                } else {
                  alert('인증 중 에러가 발생했습니다.');
                }
                return false;
              } else {
                if (res.data.appYn === "Y") {
                  if (res.data.appDeviceType === "IOS") {
                    // document.location.href = "gssmapp://ispmobile?ispmobile://TID=" + res.data.authTradeKey;
                    // document.location.href = "ispmobile://TID=" + res.data.authTradeKey;
                    document.location.href = "ispmobile://TID=" + res.data.authTradeKey;
                  } else {
                    document.location.href = "intent://TID=" + res.data.authTradeKey + "#Intent;scheme=ispmobile;package=kvp.jjy.MispAndroid320;end;";
                  }
                } else {
                  const urlScheme = "ispmobile://TID=" + res.data.authTradeKey;
                  const isp = {
                    aStoreUrl: "http://mobile.vpay.co.kr/jsp/MISP/andown.jsp",
                    iStoreUrl: "http://itunes.apple.com/kr/app/id369125087?mt=8",
                    aItentUrl: urlScheme,
                    iItentUrl: urlScheme,
                    aScheme: urlScheme,
                    iScheme: urlScheme
                  };
                  callApp($('#ISP_FRAME'), isp); // common.app.js 필요
                }
              }
          });
          if (!isFail) {
            setTimeout(()=> { // 3초 후 부터 callback 확인
              let count = 0;
              const timer = setInterval(() => {
                console.log(count);
                ApiUtils
                  .post('/fo/pa/retrieveMobileIspAuthState', data)
                  .then(res => {
                    if (res.data === null || (res.data.resultCode !== '0000' && res.data.resultCode !== '7896' && res.data.resultCode !== '9999')) {
                      if (count >= 30) {
                        clearInterval(timer);
                        alert("결제를 진행하기 위한 인증 유효시간이 만료되었습니다. 다시 시도해주세요.");
                      }
                      count++;
                    } else {
                      clearInterval(timer);
                      console.log(res.data);
                      if (res.data !== null) {
                        if (res.data.resultCode === '0000') {
                          this.form.KVP_CARDCODE = res.data.kvpCardCode;
                          this.form.KVP_SESSIONKEY = res.data.kvpSessionKey;
                          this.form.KVP_ENCDATA = res.data.kvpEncData;
                        } else {
                          alert(res.data.resultMsg);
                        }
                      }
                    }
                  }
                );
              }, 3000 );
            }, 3000);
          }
        }
      } else if ((formData.authType == "KMOTION" && cardCode == '04')) {
        alert("KMOTION Call.."+ cardCode);
        const kmotionForm = document.getElementById('kmotionForm');
        if ( StringUtils.isEmpty(kmotionForm.amount.value)) {
          alert("가격을 입력해주세요.");
          return;
        }
        console.log(this.form);
        const data = {
          authType: "KMOTION",
          cardCode: this.form.cardCode,
          goodName: this.form.goodName,
          amount: this.form.amount,
          deviceType: this.form.deviceType,
          cmmMbrNo: kmotionForm.memNo.value,
          payCompany: this.form.payCompany,
          savePayOption: this.form.savePayOption,
          easyPayOption: this.form.easyPayOption,
          nointInf: this.form.nointInf,
          quotaInf: this.form.quotaInf,
          nointFlag1: this.form.nointFlag1,
          nointFlag2: this.form.nointFlag2,
          kbSavepointree: this.form.kbSavepointree,
          isLiquidity: this.form.isLiquidity,
          fixpayFlag: this.form.fixpayFlag,
          serverMode: this.form.serverMode,
          accpReqURL: this.form.accpreqUrl,
          isOnlyAppcard: this.form.isOnlyAppcard,
          isLiquidity: this.form.isLiquidity,
          productName: this.form.goodName,
          issueCode: this.form.issueCode,
          hashKey: this.form.hashKey,
        };
        const that = this;
        if (formData.deviceType !== 'PC') {
          const mpiFrame = document.getElementById("MPI_FRAME").contentWindow;
          mpiFrame.getAuthentication(data, that);
        } else {
          await ApiUtils
            .post('/fo/pa/kmotionInitAuth', data)
            .then(function(res) {
              let isFail = false;
              console.log(res.data);
              if (res.data === null || res.data.resultCode !== '0000') {
                isFail = true;
              }

              if (res.data !== null) {
                console.log(res.data.encDataSeed);
                data.accpReqURL = that.form.accpreqUrl;
                that.rform = res.data;
                that.rform.encData = res.data.encDataSeed;
                // that.form.cardCode = cardCode;
                console.log(data);
                let jdata = JSON.stringify(data);
                jdata = encodeURIComponent(jdata);
                if ( StringUtils.isEmpty(that.rform.encData)) {
                  alert("카드인증시 오류가 발생하였습니다(KB card). 동일현상이 반복되면 \nGS 프레시몰 고객센터(1661-2562)에 문의하시기 바랍니다.");
                  return;
                } else {
                  window.doACPAY6(that.rform.encData, jdata);
                }
              }
              if (isFail) {
                console.error(res.data.resultMsg);
                alert('인증 중 에러가 발생했습니다.');
              }
          });
        }
      } else
      /*
       * XMPI(X-Ansim)
       * 삼성카드, 현대카드, 신한카드, NH은행,
       * 제주은행
       */
      if (cardCode == '43' || cardCode == '45' ||
          cardCode == '21' || (formData.deviceType == 'PC' && cardCode == '35') || cardCode == '11' ) {
        alert("XMPIForm Call..");
        const xmpiForm = document.getElementById('xmpiForm');
        if (formData.deviceType !== 'PC' && cardCode === "35") {
          alert('모바일 환경에서 제주은행카드는 isp 결제로 진행되어야 합니다.');
          return;
        }
        if ( StringUtils.isEmpty(formData.orderAmount) ) {
          alert("가격을 입력해주세요.");
          return;
        }

        if ( StringUtils.isEmpty(formData.orderGoods) ) {
          alert("상품명을 입력해주세요.");
          return;
        }

        if ( StringUtils.isEmpty(xmpiForm.memNo.value) ) {
          alert("고객번호를 입력해주세요.");
          return;
        }
        const data = {
          authType: "XMPI",
          cardCode: formData.mpiCardCode,
          goodName: formData.orderGoods,
          amount: formData.orderAmount,
          deviceType: formData.deviceType,
          cmmMbrNo: xmpiForm.memNo.value,
          payCompany: formData.payCompany,
          returnUrl: formData.returnUrl,
          actionUrl: formData.actionUrl,
          spChainCode: formData.spChainCode,
          cardName: formData.orderCardname
        };
        const that = this;
        await ApiUtils
          .post('/fo/pa/xmpiInitAuth', data)
          .then(function(res) {
            let isFail = false;
            console.log(res.data);
            if (res.data === null || res.data.resultCode !== '0000') {
              isFail = true;
            }

            if (res.data !== null) {
              that.form.returnUrl = that.form.returnUrl;
              console.log(res.data.pareq1);
              that.rform = res.data;
              that.form.cardCode = cardCode;
            }
            if (isFail) {
              console.error(res.data.resultMsg);
              alert('인증 중 에러가 발생했습니다.');
            }
        });
        hidform.action = formData.actionUrl;
        if (this.form.deviceType === "PC") {
          hidform.method = "post";
          window.open("", "popup", "width=405,height=410,resizable=no,scrollbars=no,status=no");
          hidform.target = "popup";
          // hidform.acceptCharset = 'euc-kr';
          // if (document.all) {
          //   document.charset = 'euc-kr';
          // }
        } else {
          document.getElementById('frame_div').style.display = 'block';
          hidform.target = "MPI_FRAME";
        }
        hidform.submit();
        /* doXansim( document.XMPIForm, cardCode); */
      } else if (cardCode == '25' || cardCode == '05' ||
          cardCode =='53') {
        alert("KMPI Call");
        kmpiForm.amount.value = this.form.amount+ " " + kmpiForm.pay_ansim_price.value;
        kmpiForm.purchase_amount.value = kmpiForm.pay_ansim_price.value;
        kmpiForm.action = this.form.actionUrl;
        kmpiForm.method = "post";

        // window.open("", "popup", "width=300, height=300, menubar=no, status=no, toolbar=no");
        // kmpiForm.target = "pop";
        if (this.form.deviceType === "PC") {
          document.getElementById('MPI_FRAME').style.height = "0px";
          document.getElementById('MPI_FRAME').style.width = "0px";
        }
        document.getElementById('frame_div').style.display = 'block';
        kmpiForm.target = "MPI_FRAME";
        kmpiForm.submit();
        /* OnPayButtonClick(document.KMPIForm, cardCode); */
      } else if (cardCode == "44") {
        alert("SMPI Call");
        if ( StringUtils.isEmpty(smpiForm.order_amount.value) ) {
          alert("가격을 입력해주세요.");
          return;
        }
        if (this.form.deviceType === "PC") {
          smpiForm.action = this.form.actionUrl;
          smpiForm.method = "post";
          window.open("", "popup", "width=405,height=410,resizable=no,scrollbars=no,status=no");
          smpiForm.target = "popup";
          smpiForm.submit();
        } else {
          const data = {
            authType: "SMPI",
            cardCode: formData.mpiCardCode,
            goodName: formData.orderGoods,
            amount: formData.orderAmount,
            deviceType: formData.deviceType,
            cmmMbrNo: smpiForm.memNo.value,
            payCompany: formData.payCompany,
            returnUrl: formData.returnUrl,
            actionUrl: formData.actionUrl,
            cardName: formData.orderCardname,
            mobile: formData.mobile
          };
          const that = this;
          await ApiUtils
            .post('/fo/pa/smpiInitAuth', data)
            .then(function(res) {
              let isFail = false;
              console.log(res.data);
              if (res.data === null || res.data.resultCode !== '0000') {
                isFail = true;
              }
              if (res.data !== null) {
                that.form.returnUrl = that.form.returnUrl;
                console.log(res.data.xid);
                that.rform = res.data;
                that.form.cardCode = cardCode;
              }
              if (isFail) {
                console.error(res.data.resultMsg);
                alert('인증 중 에러가 발생했습니다.');
              }
          });
          hidform.action = formData.actionUrl;
          // hidform.method = "post";
          // window.open("", "popup", "width=405,height=410,resizable=no,scrollbars=no,status=no");
          document.getElementById('frame_div').style.display = 'block';
          hidform.target = "MPI_FRAME";
          hidform.submit();
        /* doSMPICall(document.SMPIForm, cardCode); */
        }
      } else {
        alert("Card Code(" + cardCode + ") : 예외사항 발생~!");
      }
    }
  }
};
