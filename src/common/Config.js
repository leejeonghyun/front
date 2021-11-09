// 환경변수.
const server = {
  API_SERVER: process.env.VUE_APP_API_SERVER || 'http://localhost',
  TL_SERVER: process.env.VUE_APP_TL_SERVER || 'http://localhost',
  GSFRESH_MO: process.env.VUE_APP_GSFRESH_MO || 'http://localhost:7000',
  GSFRESH_PC: process.env.VUE_APP_GSFRESH_PC || 'http://localhost:7100',
  DALISALDA_MO: process.env.VUE_APP_DALISALDA_MO || 'http://localhost:7200',
  MARKETFOR_MO: process.env.VUE_APP_MARKETFOR_MO || 'http://localhost:7000',
  COMMON_FR_MO: process.env.VUE_APP_COMMON_FR_MO || 'http://localhost:7300',
  COMMON_DS_MO: process.env.VUE_APP_COMMON_DS_MO || 'http://localhost:7300',
  COMMON_MF_MO: process.env.VUE_APP_COMMON_MF_MO || 'http://localhost:7300',
  COMMON_FR_PC: process.env.VUE_APP_COMMON_DS_MO || 'http://localhost:7400',
  TMS_SERVER: process.env.VUE_APP_TMS_SERVER || 'http://165.244.245.22:8080',
  ZENDESK_KEY: process.env.VUE_APP_ZENDESK_KEY || 'cef55a9a-ac72-4638-a7a9-75be72bca5bb',
  ZENDESK_API: process.env.VUE_APP_ZENDESK_API || 'https://chatbot-gsretail.gsnict.com',
  ...process.env
};

const address = {
    home: {
        road: "",
        jibun: "",
        gps: {
            x: 37.4935933, // 성보역삼빌딩
            y: 127.0326188
        }
    },
    kakao: {
        apiUrl: "//dapi.kakao.com/v2/maps/sdk.js",
        // appKey: "7660aa91b6223b0b987ea0fe8005ca2c" // 개인 앱키에 port:7300 추가
        appKey: "1e1d8b10efe594430f19d7b696d6baed" // AS-IS 운영키
    }
};

const tracking = {
    url: {
        adobeFresh: "//assets.adobedtm.com/f6212945cbf5/a66f566063b2/launch-2b0901ccef74.min.js",
        adobeDalisalda: "//assets.adobedtm.com/f6212945cbf5/a02d5a0c1c7c/launch-acf8cce0db4b.min.js",
        adobeMarketfor: "//assets.adobedtm.com/f6212945cbf5/ff14d41654c6/launch-3efc946f41fe.min.js",
        googleTagmanager: "//www.googletagmanager.com/gtag/js?id=AW-827320465",
        naverPremiumLog: "//wcs.naver.net/wcslog.js",
        kakao: '//t1.daumcdn.net/adfit/static/kp.js',
        beusableFresh: '//rum.beusable.net/script/b190321e200255u695/a91c99b31c',
        beusableDalisalda: '//rum.beusable.net/script/b190321e200255u695/766fe1f80d',
        beusableMarketfor: '',
    },
    gsfreshTrackId: {
        kakaoPixel: '5245790284242569263',
        facebookPixel: '234508130416308',
        naver: 's_2d9c8fc804cc',
        googleTagId: 'UA-57238353-1',
    },
    dalisaldaTrackId: {
        kakaoPixel: '4546492138245042830',
        facebookPixel: '314867593127394',
        naver: '',
        googleTagId: 'UA-152616444-1',
    },
    marketforTrackId: { // 마켓포 설정값 전달받아 세팅해야 함.
        kakaoPixel: '',
        mobon: '',
        widerplanet: '',
        criteo: '',
        facebookPixel: '',
        naver: '',
    },
};

const app = {
    gsfresh: {
        store: {
            ios: "https://itunes.apple.com/kr/app/id813494275", // GS 프레시
            android: "market://details?id=com.gsretail.android.smapp",
        },
        scheme: "gssmapp://default",
        tstore: "http://tsto.re/0000663610",
    },
    dalisalda: {
        store: {
            ios: "https://itunes.apple.com/kr/app/id1518974339", // 달리살다
            android: "market://details?id=com.gsretail.android.dalisalda",
        },
        scheme: "dalisalda://default",
        tstore: "http://tsto.re/0000663610",
    },
    marketfor: {
        store: {
            ios: "https://apps.apple.com/kr/app/id1546812398", // 마켓포
            android: 'https://play.google.com/store/apps/details?id=com.gsretail.android.marketfor',
        },
        scheme: "marketfor://default",
        tstore: "http://tsto.re/0000663610",
    },
};

export default {server, address, tracking, app};
// new..
