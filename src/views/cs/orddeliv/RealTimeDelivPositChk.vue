<!--
Design: \views\ss\SC-FO-SS-GF-MP-853.vue
Pg id:PG-FO-CS-O003
#Uri: /cs/orddeliv/real_time_deliv_posit_chk
-->
<!--
마이페이지  주문배송조회  주문배송목록 SC-FO-SS-GF-MP-853  PG-FO-CS-O003 RealTimeDelivPositChk 실시간 배송위치확인(연결완료) <-----OrdDelivList.OrderShippingState

◆ ◆ 기획서내용
      ■ 실시간 배송위치추적하기 기능 추가 (당일배송 차량 추적, 택배는 송장 추적 가능)
        ■ ■ 당일배송 차량 추적 방법은??
        ■ ■ 택배는 송장 추적 가능 방법은?? 굿스플로우?
        ■ ■ 그럼 화면이 다른가?
        ■ ■ 이 데이터수집은 주문배송쪽에 존재하는가?

      ■ 선택 시, 실시간 위치추적 팝업 노출  센터배송만 노출 가능.(점포는 미노출 )

      ■ 배송중일 경우 : 실시간 배송위치추적 아이콘 노출(선택 시 팝업 노출)

      ■ 배송완료인  경우 : 배송만족도 평가 아이콘 노출. 평가 참여 시 버튼 사라짐)

      ■ 당일, 택배(전국)......

      ■ 기획서에는 주문번호/배송점포/도착예정시간/지도 마다 구분선 있으나 퍼블에는 없음

      ■ 실시간 베송위치 조회는 당일/새벽 배송인 경우에만 노출됨. <---전국택배는???
      ■ 배송중에만 노출

      ■ 픽업에서 실시간배송위치추적이랑 배송만족도 조사 할것인지 여부 확인 필요

      ■ 실시간 배송 위치 버튼은 센터만 노출 점포몰은 노출 없음(노출불가)

      ■ 대상주문중에 퀵서비스는 해당없나?

-->
<template>
  <!-- : 실사용 소스 -->
  <div
    id="popupRealTime"
    class="wrap-full-popup"
    role="dialog"
    aria-modal="true"
    :class="[{ active: this.modalActive.popupRealTime }, siteClass]"
  >
    <div class="header-popup">
      <strong>실시간 배송 위치</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="wrap-real-time">
          <div class="title">
            <h3 class="hidden">실시간 배송 위치</h3>
            <!--
            <button value="aa" @click="getDelivPosit">[TMS API 호출]</button
            >&nbsp; <button value="aa" @click="goPosit(1)">[차량]</button>&nbsp;
            <button value="aa" @click="goPosit(2)">[집]</button>&nbsp;
            <button value="aa" @click="autoMapLevel">[전체]</button>&nbsp;
            -->
          </div>
          <!-- START : 배송지 리스트 -->
          <div class="real-time-location">
            <div class="order-number">
              <span>주문번호</span>
              {{ this.ordInfo.ordId }}
            </div>
            <dl>
              <dt>배송점포</dt>
              <dd>{{ this.ordInfo.siteNm }}</dd>
              <dt>도착예정시간</dt>
              <dd>{{ this.ordInfo.dvdescDelivDt }} {{ this.ordInfo.dvdescDelivBeginTm }}~{{ this.ordInfo.dvdescDelivEndTm }}</dd>
            </dl>
            <div class="wrap-map-delivery">
              <KakaoMap
                :appKey="appKey"
                :center.sync="center"
                :level.sync="level"
                :mapTypeId="mapTypeId"
                :libraries="libraries"
                :draggable="draggableYn"
                :scrollwheel="scrollwheelYn"
                :getDelivPosit="getDelivPosit"
                @load="mapOnLoad"
                style="width:100%;height:100%;"
                :bus="bus"
              />
            </div>
          </div>
          <!-- END : 배송지 리스트 -->
        </div>
      </div>
    </div>
    <button
      class="btn-layer-close"
      @click="popupAction"
      @keydown.9="tabFocusRemove('popupAction')"
      aria-label="포커스 아웃 시 팝업 닫기"
    >
      <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>
import Vue from 'vue';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import KakaoMap from '@/views/cs/orddeliv/RealTimeDelivPositChkMap';
import Config from '@/common/Config.js';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'PopupRealTime',
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '실시간 배송 위치 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '실시간 배송 위치',
      },
    ],
  },
  props: {
    mbrDelivParamInfo: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      bus: new Vue(),
      appKey: Config.address.kakao.appKey,
      center: {},
      level: 7,
      mapTypeId: KakaoMap.MapTypeId.NORMAL,
      draggableYn: true,
      scrollwheelYn: true,
      libraries: [],
      mapObject: null,
      paramInfo: {
        ordId: null,
      },
      ordInfo: {},
      paramPosit: [],
      encParam: this.$route.params.encParam,
      isPopup: true,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    KakaoMap,
  },
  methods: {
    // ■ 기능함수 : 두 좌표가 모두 지도에 표시되도록 조절
    autoMapLevel() {
      this.bus.$emit('autoMapLevel', this.paramPosit);
    },
    // ■ 집, 배송차량 위치로 지도 이동
    goPosit(paramMode) {
      this.bus.$emit('setMapLevel', 7);
      if (paramMode == '1') {
        this.bus.$emit('goPosit', this.paramPosit[0]);
      } else {
        this.bus.$emit('goPosit', this.paramPosit[1]);
      }
    },
    // 지도 로드 콜백
    async mapOnLoad(map, address) {
      /* if (StringUtils.isEmpty(address.zonecode)) {
        return;
      } */
      if (this.encParam) {
        this.isPopup = false;

        const r = await ApiUtils.get(
          '/fo/cs/orddelivmgnt/order-delivery-list-by-deliv-id',
          { encParam: this.encParam }
        );
        console.log('r', r);
        if (r.data.data && r.data.data.length > 0) {
          this.ordInfo = r.data.data[0];
        } else {
          /* this.$gsdialog
            .alert('배송정보를 찾을 수 없습니다.')
            .then(dialog => {}); */
        }
      } else {
        this.ordInfo = Object.assign(this.ordInfo, this.mbrDelivParamInfo);
      }
      this.getDelivPosit();
    },
    // TMS 연결하여 배송차량 위치 조회 및 지도 마킹처리
    getDelivPosit() {
      let baseDomain = '/fo/od/proxy?url=' + Config.server.TMS_SERVER;
      baseDomain = baseDomain + '/rest/cgr/VhclLocation.json';
      baseDomain =
        baseDomain +
        '?deliNo=' +
        this.ordInfo.supplFirmCd +
        '-' +
        this.ordInfo.orgDelivId;
      ApiUtils.get(baseDomain, null)
        .then(res => {
          if (res.data == null) {
            // alert("조회불가능합니다.(res.data == null)");
            this.setPosit();
            return;
          }
          if (
            res.data.dataMapList == null ||
            res.data.dataMapList.length == 0
          ) {
            // alert("조회불가능합니다.(res.data.dataMapList == null)");
            this.setPosit();
            return;
          }
          const mapInfo = res.data.dataMapList[0];
          if (StringUtils.isEmpty(mapInfo.VHCL_LONT)) {
            // alert("조회불가능합니다.(mapInfo.VHCL_LONT == null)");
            this.setPosit();
            return;
          }
          this.setPosit(mapInfo);
        })
        .catch(error => {
          this.$gsdialog.alert(error).then(dialog => {});
          console.log(error);
        });
    },
    setPosit(paramPositIfno) {
      if (paramPositIfno == null) {
        this.$gsdialog.alert('배송 시작 전 입니다.').then(dialog => {});
        paramPositIfno = {};
      } else {
        this.paramPosit.push({
          positGb: '1',
          positNm: '',
          latt: paramPositIfno.VHCL_LATT /* 위도(X) */,
          lont: paramPositIfno.VHCL_LONT /* 경도(Y) */,
        });
        this.bus.$emit('setDelivPosit', this.paramPosit);
        // this.autoMapLevel();
      }
    },
    popupAction() {
      if (this.isPopup) {
        this.$emit('popupEvent', 'popupRealTime');
        this.modalActiveEvent('popupRealTime');
      } else {
        this.$router.replace('/');
      }
    },
  },
  created() {
    this.center.lat = Config.address.home.gps.x;
    this.center.lng = Config.address.home.gps.y;
  },
  mounted() {
    if (this.isPopup) {
      this.modalActiveEvent('popupRealTime');
    }
  },
};
</script>
