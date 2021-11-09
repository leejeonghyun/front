<template>
  <div class="wrap-mypage wrap-cart public_domain" :class="siteClass">
    <!-- 유입위치 클래스 추가 -->
    <SubDefaultHeader headerText="취소신청" />
    <main id="main" tabindex="0">
      <section class="mypage">
        <!-- START : 신청 목록 -->
        <div class="wrapper tabcont_marketfor cancel">
          <section class="cart-category-product">
            <MfOrderCancelDetail
              v-for="ordCnclList in this.ordCnclAceptList.mfOrdMallList"
              :key="ordCnclList.mallId"
              :ordCnclInfo="ordCnclList"
              @refndEvent="retrieveOrdClaimAmtCalc"
            />
          </section>
        </div>
        <!-- END : 신청 목록 -->
        <!-- START : 최종 결제금액 -->
        <section class="mypage block">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">결제정보</span>
              </h3>
            </div>
            <ul class="accordion-payment">
              <li>
                <div class="tit-accordion">
                  취소 상품 금액
                  <span class="price">
                    <strong>{{this.addTdrInfo.ordCnclAmt | currency}}</strong>원
                  </span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  쿠폰/할인 혜택
                  <span class="price red" v-if="this.addTdrInfo.claimPromAmt > 0">
                    <strong>- {{this.addTdrInfo.claimPromAmt | currency}}</strong>원
                  </span>
                  <span class="price red" v-else>
                    <strong>{{this.addTdrInfo.claimPromAmt | currency}}</strong>원
                  </span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  배송비
                  <button
                    type="button"
                    class="btn-infomation"
                    aria-label="배송비 안내 팝업 활성화"
                    aria-haspopup="dialog"
                    @click="popupAction('popupDeliveryPersonal')"
                  />
                  <span class="price">
                    <strong>{{this.addTdrInfo.claimDlfeeSprc | currency}}원</strong>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="sub-title send-total-price">
            <p class="txt-price">
              환불예정금액
              <span class="price">
                <strong>{{this.addTdrInfo.refndReqAmt | currency}}</strong>원
              </span>
            </p>
          </div>
          <div
            class="gray_guide__box"
            v-if="this.mfRefndTrdMeansInfoList && this.mfRefndTrdMeansInfoList.length > 0"
          >
            <h5>
              환불수단
              <button
                type="button"
                class="btn-infomation"
                aria-label="환불수단 안내 팝업 활성화"
                aria-haspopup="dialog"
                @click="popupAction('popupReturnInfo')"
              />
            </h5>
            <dl v-for="(list, index) in this.mfRefndTrdMeansInfoList" :key="index">
              <dt>{{list.tdrMeansNm}}</dt>
              <dd>{{list.refndReqAmt | currency}}{{list.amtSpNm}}</dd>
            </dl>
          </div>
        </section>
        <!-- END : 최종 결제금액 -->
        <!-- START : 하단 버튼 -->
        <section class="section btns">
          <div class="cart-all">
            <button
              type="button"
              class="btn-lg btn-bg lightgreen"
              @click="processFrontOrdCnclAcept"
            >취소 신청</button>
          </div>
        </section>
        <!-- START : 하단 버튼 -->
        <!-- 팝업 - 배송비 안내 -->
        <MfPopupDeliveryPersonal @popupEvent="popupAction" v-if="this.popup.popupDeliveryPersonal" />
        <!-- 팝업 - 환불수단 안내 -->
        <MfPopupReturnInfo @popupEvent="popupAction" v-if="this.popup.popupReturnInfo" />
        <Loading v-show="loading" />
      </section>
      <!-- START : 푸터 -->
      <Footer />
    </main>
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 헤더
import MfOrderCancelDetail from '@/views/cs/claimmgnt/MfOrderCancelDetail';
import MfPopupDeliveryPersonal from '@/views/cs/claimmgnt/MfPopupDeliveryPersonal'; // 팝업 - 배송비 안내
import MfPopupReturnInfo from '@/views/cs/claimmgnt/MfPopupReturnInfo'; // 팝업 - 배송비 안내

import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import Loading from '@/components/common/Loading';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import ItemTemplete from '@/common/ItemTemplete';
export default {
  name: 'MfOrdCnclAcept',
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      loading: false,
      ordId: this.$route.params.ordId, // 주문ID
      ordCnclAceptList: {},
      popup: {
        // 팝업
        open: false,
        popupDeliveryPersonal: false,
        popupReturnInfo: false,
      },
      addTdrInfo: {
        ordCnclAmt: 0, // 취소상품할인매가
        claimDlfeeSprc: 0, // 배송비
        refndReqAmt: 0, // 환불예정금액
        claimPromAmt: 0, // 쿠폰/할인혜택
      },
      claimPntGs: 0,
      claimPntThe: 0,
      mfRefndTrdMeansInfoList: [],
      mfClaimPntInfoList: [],
    };
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '취소신청 < %s',
  },
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader,
    MfOrderCancelDetail,
    Footer,
    MfPopupDeliveryPersonal,
    MfPopupReturnInfo,
    Loading,
  },
  methods: {
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    getCheckedItemInfo() {
      // 선택된 취소상품 정보 set
      const mfOrdClaimDtlDtoList = [];
      let cnclItem = {}; // 취소상품정보 */
      this.ordCnclAceptList.mfOrdMallList.map(ordDtlValue => {
        ordDtlValue.mfOrdDtlList.map(ordValue => {
          if (ordValue.chkYn) {
            cnclItem = {};
            cnclItem.ordDtlSeqno = ordValue.ordDtlSeqno;
            cnclItem.ordCnclQty = ordValue.ordCnclQty;
            cnclItem.ordClaimResnCd = '01';
            mfOrdClaimDtlDtoList.push(cnclItem);
          }
        });
      });
      const params = {
        ordId: this.ordId,
        mfOrdClaimDtlDtoList: mfOrdClaimDtlDtoList,
      };
      return params;
    },
    async retrieveOrdClaimAmtCalc() {
      const params = await this.getCheckedItemInfo(); // 선택된 취소상품 정보 set
      this.addTdrInfo = {
        ordCnclAmt: 0,
        claimDlfeeSprc: 0,
        refndReqAmt: 0,
        claimPromAmt: 0,
      };
      if (params.mfOrdClaimDtlDtoList.length > 0) {
        this.loading = true;
        // 주문 취소금액 계산 조회 api
        ApiUtils.post('/fo/cs/mf/order-cancellation-amount', params)
          .then(res => {
            if (res.data === null || !res.data.success) {
              this.$gsdialog.alert(res.data.statusMessage);
              return;
            }
            const resData = res.data.data;
            if (resData) {
              // 취소상품 할인매가
              if (resData.mfClaimDtlInfoList.length > 0) {
                const claimDtlInfo = resData.mfClaimDtlInfoList;
                let ordCnclAmt = 0;
                let ordCnclItemSprcAmt = 0;
                claimDtlInfo.map(value => {
                  ordCnclAmt += value.ordCnclItemSprc;
                  ordCnclItemSprcAmt +=
                    value.ordCnclItemSprc - value.ordCnclAmt;
                });
                this.addTdrInfo.ordCnclAmt = ordCnclAmt;
                this.addTdrInfo.claimPromAmt = ordCnclItemSprcAmt;
              }
              // 배송비
              // 2021.02.26 배송비 정리 (백엔드에서 계산해서 처리하기로 함)
              this.addTdrInfo.claimDlfeeSprc = resData.addDlfee;
              // 환불결제수단정보
              // 2021.03.04 환불결제수단정보 수정
              this.addTdrInfo.refndReqAmt = resData.refndSchedAmt;
              if (resData.mfRefndTdrMeansInfoList.length > 0) {
                this.mfRefndTrdMeansInfoList = resData.mfRefndTdrMeansInfoList;
                // 환불결제수단정보 정렬 추가
                const sortingField = 'indSeq';
                this.mfRefndTrdMeansInfoList.sort(function(a, b) {
                  return a[sortingField] - b[sortingField];
                });
              } else {
                this.mfRefndTrdMeansInfoList = [];
              }
              // 프로모션정보
              this.addTdrInfo.claimPromAmt =
                this.addTdrInfo.claimPromAmt + resData.beneGapAmt;
              // 포인트정보
              if (resData.mfClaimPntInfoList.length > 0) {
                const counts = resData.mfClaimPntInfoList.reduce(
                  (prev, curr) => {
                    const count = prev.get(curr.ordExpnsTypeDtlCd) || 0;
                    // 2021.02.22 포인트 회수 정보 GS point 적립 회수 경우 조건 추가
                    if (curr.ordExpnsTypeDtlCd == 31) {
                      prev.set(
                        curr.ordExpnsTypeDtlCd,
                        curr.orgPntAmt - curr.pntAmt + count
                      );
                    }
                    return prev;
                  },
                  new Map()
                );
                const reducedObjArr = [...counts].map(
                  ([ordExpnsTypeDtlCd, claimPntAmt]) => {
                    return { ordExpnsTypeDtlCd, claimPntAmt };
                  }
                );
                this.mfClaimPntInfoList = reducedObjArr;
              }
              // 포인트 회수 환불수단 push
              const tempObjData = {};
              tempObjData.tdrMeansNm = 'GS&POINT 적립 회수';
              tempObjData.amtSpNm = 'P';
              if (this.mfClaimPntInfoList.length > 0) {
                this.mfClaimPntInfoList.map(value => {
                  tempObjData.refndReqAmt = value.claimPntAmt;
                });
                this.mfRefndTrdMeansInfoList.push(tempObjData);
              }
            }
          })
          .finally(() => (this.loading = false));
      } else {
        // 초기화
        this.mfRefndTrdMeansInfoList = null;
        this.loading = false;
      }
    },
    validatOrdCnclAcept() {
      let chkCnt = 0;
      let returnValue = true;
      this.ordCnclAceptList.mfOrdMallList.map(ordDtlValue => {
        ordDtlValue.mfOrdDtlList.map(ordValue => {
          if (ordValue.chkYn) {
            chkCnt++;
          }
        });
      });
      if (chkCnt == 0) {
        this.$gsdialog.alert('취소하실 상품을 선택해주세요.', { html: true });
        return (returnValue = false);
      }
      return returnValue;
    },
    // 취소신청 접수
    async processFrontOrdCnclAcept() {
      if (!this.validatOrdCnclAcept()) {
        return;
      }
      const confirmFlag = await this.$gsdialog.confirm(
        '취소 신청 하시겠습니까?'
      );
      if (confirmFlag) {
        this.saveOrdClaimAcept();
      }
    },
    async saveOrdClaimAcept() {
      this.loading = true;
      const params = this.getCheckedItemInfo();
      ApiUtils.post('/fo/cs/mf/order-cancellation-accept', params)
        .then(res => {
          if (res.data === null || !res.data.success) {
            if (res.data.statusCode == '2000') {
              this.$gsdialog.alert(res.data.statusMessage).then(() => {
                this.$router.go();
                return;
              });
            } else {
              this.$gsdialog.alert(res.data.statusMessage);
              return;
            }
            return;
          }
          const ordId = res.data.data.ordId;
          this.$router.push(
            '/cs/mf/claimmgnt/ord_cncl_proc_sate_info/' + ordId
          );
        })
        .finally(() => (this.loading = false));
    },
    async retrieveOrdItemInfo() {
      const params = {
        ordId: this.ordId,
      };
      ApiUtils.get('/fo/cs/mf/order-cancellation-list', {
        ...params,
      })
        .then(res => {
          if (res.data.data === null || !res.data.success) {
            this.$gsdialog
              .alert(
                '해당 주문에 취소 신청할 수 있는 상품이 존재하지 않습니다.'
              )
              .then(() => {
                location.href = '/cs/orddeliv/ord_deliv_list';
              });
            return;
          }
          this.ordCnclAceptList = res.data.data;
          this.ordCnclAceptList.mfOrdMallList.map(ordDtlValue => {
            ordDtlValue.mfOrdDtlList.map(ordValue => {
              this.$set(ordValue, 'chkYn', true);
              // 주문수량 -> 취소수량
              this.$set(ordValue, 'ordCnclQty', ordValue.ordQty);
            });
          });
          this.retrieveOrdClaimAmtCalc();
        })
        .catch(err => {
          console.error(err);
        });
      // 취소신청 금액 api 호출
      /* setTimeout(() => {
        this.retrieveOrdClaimAmtCalc();
      }, 1800); */
    },
    async init() {
      await this.retrieveOrdItemInfo();
    },
  },
  created() {
    this.init();
  },
  mounted() {
    // this.init();
  },
};
</script>

<style>
</style>
