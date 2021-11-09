<!--
Design: \views\ss\SC-FO-SS-GF-MP-853.vue
Pg id:PG-FO-CS-O003
#Uri: /cs/orddeliv/real_time_deliv_posit_chk
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
          </div>
          <div class="real-time-location">
            <div class="order-number">
              <span>주문번호</span>
              {{ ordInfo.ordId }}
            </div>
            <dl>
              <dt>배송점포</dt>
              <dd>{{ ordInfo.siteNm }}</dd>
              <dt>도착예정시간</dt>
              <dd>{{ ordInfo.dvdescDelivDt }} {{ ordInfo.dvdescDelivBeginTm }}~{{ ordInfo.dvdescDelivEndTm }}</dd>
            </dl>
            <div class="wrap-map-delivery">
              <div id="KakaoMap" style="width:100%;height:100%;" />
            </div>
          </div>
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
import Config from '@/common/Config.js';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import loadScriptOnce from 'load-script-once';
import SiteUtils from '@/common/SiteUtils';

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
      level: 5,
      mapTypeId: 1,
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
      map: null,
    };
  },
  components: {},
  methods: {
    async mapOnLoad() {
      if (this.encParam) {
        this.isPopup = false;
        // 암호화된 공급업체코드-배송지아이디로 주문정보 조회
        const r = await ApiUtils.get(
          '/fo/cs/orddelivmgnt/order-delivery-list-by-deliv-id',
          { encParam: this.encParam }
        );
        if (r.data.data && r.data.data.length > 0) {
          this.ordInfo = r.data.data[0];
        } else {
          this.$gsdialog
            .alert('배송정보를 찾을 수 없습니다.')
            .then(dialog => {});
        }
      }

      if (this.ordInfo.delivStatCd == '05') { // 배송완료인 경우 팝업 닫기
          this.$gsdialog
            .alert('배송이 완료되었습니다.')
            .then(dialog => {
              this.popupAction();
            });
        return;
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
        return;
      }

      this.paramPosit.push({
        positGb: '1',
        latt: paramPositIfno.VHCL_LATT /* 차량 위도(X) */,
        lont: paramPositIfno.VHCL_LONT /* 차량 경도(Y) */,
      });
      this.paramPosit.push({
        positGb: '2',
        latt: paramPositIfno.ORD_LATT /* 배송지 위도(X) */,
        lont: paramPositIfno.ORD_LONT /* 배송지 경도(Y) */,
      });
      this.setDelivPosit(this.paramPosit);
    },
    popupAction() {
      if (this.isPopup) {
        this.$emit('popupEvent', 'popupRealTime');
        this.modalActiveEvent('popupRealTime');
      } else {
        this.goHome();
      }
    },
    render() {
      const options = {
        center: new kakao.maps.LatLng(this.center.lat, this.center.lng),
        level: this.level,
        mapTypeId: this.mapTypeId,
        draggable: this.draggable,
        scrollwheel: this.scrollwheel,
      };
      this.map = new kakao.maps.Map(
        document.getElementById('KakaoMap'),
        options
      );
      this.mapOnLoad();
    },
    // 좌표정보를 이용하여 지도 위치 셋팅, 마커 셋팅 처리
    setDelivPosit(paramPositList) {
      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체
      const bounds = new kakao.maps.LatLngBounds();
      let cnt = 0;
      for (const row of paramPositList) {
        if (!row.latt || !row.lont) {
          continue;
        }
        const imageSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'; // 배송지 마커 이미지
        if (row.positGb == '1') {
          imageSrc = 'https://t1.daumcdn.net/mapjsapi/images/2x/marker.png'; // 차량 마커 이미지
        }

        // 마커 이미지의 이미지 크기 입니다
        const imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const markerPosition = new kakao.maps.LatLng(row.latt, row.lont); // 마커가 표시될 위치(latitude Number : 위도, longitude Number : 경도)

        // 마커를 생성
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(this.map);
        /* const content = row.positNm;
        // 커스텀 오버레이가 표시될 위치입니다
        const position = new kakao.maps.LatLng(row.latt, row.lont); // latitude Number : 위도, longitude Number : 경도
        // 커스텀 오버레이를 생성합니다
        const customOverlay = new kakao.maps.CustomOverlay({
          map: this.map,
          position: position,
          content: content,
          yAnchor: 1,
        }); */
        // LatLngBounds 객체에 좌표추가
        bounds.extend(markerPosition);
        this.map.setCenter(markerPosition);

        cnt++;
      }
      if (cnt > 1) {
        this.map.setBounds(bounds);
      }
    },
    goHome() {
      // gsfresh
      let mallActive = 2;
      if (CookieUtils.getMallId() === '11') {
        // 달리살다확인
        mallActive = 1;
      }
      if (SiteUtils.isCommonSite()) {
        if (mallActive === 1) {
          location.href = SiteUtils.dalimo('/');
        } else {
          location.href = SiteUtils.freshmo('/');
        }
      } else {
        this.$router.push({ path: '/' });
      }
    },
  },
  created() {
    this.ordInfo = Object.assign(this.ordInfo, this.mbrDelivParamInfo);
    this.center.lat = Config.address.home.gps.x;
    this.center.lng = Config.address.home.gps.y;
  },
  mounted() {
    if (this.isPopup) {
      this.modalActiveEvent('popupRealTime');
    }
    loadScriptOnce(
      Config.address.kakao.apiUrl +
        `?autoload=false&appkey=${this.appKey}&libraries=services`
    )
      .then(() => {
        kakao.maps.load(() => {
          this.render();
        });
      })
      .catch(err => {
        console.error(err);
      });
  },
};
</script>
