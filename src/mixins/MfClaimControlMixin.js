/* Mf 클레임 목록 공통 data, Method mixin */
import ApiUtils from '@/common/ApiUtils';
import ItemTemplete from '@/common/ItemTemplete';
import SiteUtils from '@/common/SiteUtils';

export default {
    data() {
        return {
            ORD_DELIVE_LIST_PATH: '/cs/orddeliv/ord_deliv_list',
            CLAIM_STATEMENT_LIST_PATH: '/cs/claimmgnt/claim_statement_list',
            mbrDelivParamInfo: {},
        };
    },
    methods: {
        // 취소신청 철회
        async cnclRqtWtdw(data, type) {
            const confirmFlag = await this.$gsdialog.confirm(
                '취소 신청 철회를 하시겠습니까?',
                { html: true }
            );
            if (confirmFlag) {
                const params = {
                    ordId: (type == 'ORD') ? data.claimOrdId : data.ordId,
                    ordDtlSeqno: (type == 'ORD') ? data.claimOrdDtlSeqno : data.ordDtlSeqno,
                };
                await ApiUtils.put('/fo/cs/mf/order-cancellation-withdrawal', {
                    ...params,
                }).then(res => {
                    if (res.data.success == true) {
                        this.$gsdialog.alert('취소신청 철회가 되었습니다.').then(() => {
                            // location.href = (this.$route.path.includes('ord_deliv_list')) ? this.ORD_DELIVE_LIST_PATH : this.CLAIM_STATEMENT_LIST_PATH;
                            location.href = (type == 'ORD') ? this.ORD_DELIVE_LIST_PATH : this.CLAIM_STATEMENT_LIST_PATH;
                        });
                        return;
                    } else {
                        this.$gsdialog.alert(res.data.statusMessage);
                        return;
                    }
                });
            }
        },
        // 반품신청 철회
        async rtnRqtWtdw(data, type) {
            const confirmFlag = await this.$gsdialog.confirm(
                '반품신청을 취소하시겠습니까?<br/>‘확인’을 선택하시면 반품 신청이 취소됩니다.',
                { html: true }
            );
            if (confirmFlag) {
                const params = {
                    ordId: (type == 'ORD') ? data.claimOrdId : data.ordId,
                    ordDtlSeqno: (type == 'ORD') ? data.claimOrdDtlSeqno : data.ordDtlSeqno,
                };
                await ApiUtils.put('/fo/cs/mf/return-withdrawal', {
                    ...params,
                }).then(res => {
                    if (res.data.success == true) {
                        this.$gsdialog.alert('반품신청이 취소되었습니다.').then(() => {
                            // location.href = (this.$route.path.includes('ord_deliv_list')) ? this.ORD_DELIVE_LIST_PATH : this.CLAIM_STATEMENT_LIST_PATH;
                            location.href = (type == 'ORD') ? this.ORD_DELIVE_LIST_PATH : this.CLAIM_STATEMENT_LIST_PATH;
                        });
                        return;
                    } else {
                        if (res.data.statusCode == '3200') {
                            this.$gsdialog.alert(res.data.statusMessage).then(() => {
                                this.$router.go();
                            });
                            return;
                        } else {
                            this.$gsdialog.alert(res.data.statusMessage);
                            return;
                        }
                    }
                });
            }
        },
        // 교환신청 철회
        async exchRqtWtdw(data, type) {
            const confirmFlag = await this.$gsdialog.confirm(
                '교환신청을 취소하시겠습니까?<br/>‘확인’을 선택하시면 교환 신청이 취소됩니다.',
                { html: true }
            );
            if (confirmFlag) {
                const params = {
                    ordId: (type == 'ORD') ? data.claimOrdId : data.ordId,
                    ordDtlSeqno: (type == 'ORD') ? data.claimOrdDtlSeqno : data.ordDtlSeqno,
                };
                await ApiUtils.put('/fo/cs/mf/exchange-withdrawal', {
                    ...params
                }).then(res => {
                    if (res.data.success == true) {
                        this.$gsdialog.alert('교환신청이 취소되었습니다.').then(() => {
                            // location.href = (this.$route.path.includes('ord_deliv_list')) ? this.ORD_DELIVE_LIST_PATH : this.CLAIM_STATEMENT_LIST_PATH;
                            location.href = (type == 'ORD') ? this.ORD_DELIVE_LIST_PATH : this.CLAIM_STATEMENT_LIST_PATH;
                        });
                        return;
                    } else {
                        if (res.data.statusCode == '4003') {
                            this.$gsdialog.alert(res.data.statusMessage).then(() => {
                                this.$router.go();
                            });
                            return;
                        } else {
                            this.$gsdialog.alert(res.data.statusMessage);
                            return;
                        }
                    }
                }).catch(err => {
                    console.error(err);
                });
            }
        },
        // 주문배송조회
        async popupTrackingActive(paramDelivRow, type) {
            /* dlvOrdId, dlvOrdDtlSeqno
                        반품, 교환신청 - 주문건에 배송조회
                        회수지시중 - 회수건에 대한 배송조회
                        회수지시중이고, 배송중 - 배송건에 대한 배송조회
            */
            const params = {
                ordId: (type == 'ORD') ? paramDelivRow.ordId : paramDelivRow.dlvOrdId,
                ordDtlSeqno: (type == 'ORD') ? paramDelivRow.ordDtlSeqno : paramDelivRow.dlvOrdDtlSeqno,
            };
            await ApiUtils.get('/fo/cs/mf/order-invoice-trace', {
                ...params,
            }).then(res => {
                if (res.data === null || res.data.data === null) {
                    this.$gsdialog.alert("해당상품은 판매자 직접 배송상품으로 배송조회가 불가합니다.<br>문의사항은 0000-0000으로 연락주시면 도와드리겠습니다.", { html: true });
                    return;
                }

                const data = res.data.data;
                if (data) {
                    if (data.dlvcoCd === null || data.dlvInvNo === null) {
                        this.$gsdialog.alert("해당상품은 판매자 직접 배송상품으로 배송조회가 불가합니다.<br>문의사항은 0000-0000으로 연락주시면 도와드리겠습니다.", { html: true });
                        return;
                    }
                }
                this.mbrDelivParamInfo = res.data.data;
                this.popupAction('popupTrackingShipping');
            });
        },
        // 몰 로고 이미지
        getMallLogo(mallId) {
            if (mallId != undefined || mallId != null) {
                return require('@/assets/images/mall_logo/' + mallId + '.png');
            }
        },
        // 주문 상품 이미지
        getImg(imgUrl) {
            return ItemTemplete.img(imgUrl);
        },
        goGoods(val) {
            location.href = SiteUtils.marketformo(ItemTemplete.itemDetail(val));
        },
        goUrl(url) {
            if (url == '1' || url == '20') {
                location.href = SiteUtils.freshmo('');
            } else if (url == '11') {
                location.href = SiteUtils.dalimo('');
            } else if (url == '301') {
                location.href = SiteUtils.marketformo('/gsshop');
            } else {
                location.href = SiteUtils.marketformo('/mall_main?mallId=' + url);
            }
        },
    },
};
