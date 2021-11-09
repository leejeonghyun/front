import ApiUtils from '@/common/ApiUtils';
import ContextUtils from '@/common/ContextUtils';

const windowSet =
  'scrollbars=yes,toolbar=yes,resizable=yes,width=500,height=600,left=0,top=0';

const ShareUtils = {
  init() {
    try {
      // const apiKey = (/dalisalda/i.test(location.host))
      //   ? 'dec606782dfb49dd1af0a179fd49b65b' // 달리살다
      //   : '1e1d8b10efe594430f19d7b696d6baed'; // GS 프레시몰
      let apiKey = "";
      if (/gsfresh/i.test(location.host)) {
        apiKey = '1e1d8b10efe594430f19d7b696d6baed'; // GS Fresh
      } else if (/dalisalda/i.test(location.host)) {
        apiKey = 'dec606782dfb49dd1af0a179fd49b65b'; // 달리살다
      } else if (/marketfor/i.test(location.host)) {
        apiKey = '240cef6ffdfe187e0fe818eed37c7281'; // 마켓포
      }
      ApiUtils.loadScript('/js/vendor/kakao-1.38.0.js', () => {
        Kakao.init(apiKey);
      });
    } catch (err) {
      console.log('Kakao init error : ' + err);
    }
    console.log("ContextUtils.isNative()", ContextUtils.isNative());
    const isNative = ContextUtils.isNative();
    if (isNative == true) {
      console.log("앱");
    } else {
      console.log("웹");
    }
  },
  async shorten(url) {
    const params = {
      originUrl: url
    };
    let shortLink = url;
    const response = await ApiUtils.get('/fo/cm/commonmgnt/naver-short-url', params);
    if (response.data.success) {
      shortLink = response.data.data;
    }
    return shortLink;
  },
  async shareTwitter(url, text) {
    const shortLink = await this.shorten(url);
    const link = `http://twitter.com/share?url=${shortLink}&text=${encodeURI(text)}`;
    window.open(link, 'gssmapp', windowSet);
  },
  shareFacebook(url, text, image) {
    let uri = '';
    uri += '/fo/cm/facebook/og';
    uri += '?url=' + encodeURIComponent(url);
    uri += '&title=' + encodeURIComponent(document.querySelector('title').text);
    uri += '&description=' + encodeURIComponent(text);
    uri += '&image=' + encodeURIComponent(image);
    const url2 = ApiUtils.getUrl(uri);

    let link = '';
    link += 'https://www.facebook.com/dialog/feed';
    link += '?app_id=1933958633553886';
    link += '&redirect_uri=' + encodeURIComponent('https://www.facebook.com');
    link += '&display=popup';
    link += '&link=' + encodeURIComponent(url2);
    window.open(link, 'gssmapp', windowSet);
  },
  shareKakaoTalk(url, msg, prodImg, title, text2) {
    if (text2) {
      msg = title + '\n\n' + msg + '\n\n' + text2 + '\n';
    } else if (title) {
      msg = title + '\n\n' + msg + '\n';
    } else {
      msg = msg + '\n';
    }
    if (!prodImg) {
      prodImg = '';
    }

    let moUrl = '';
    // [202017P]2021.03.05 최미옥 카카오톡 친구추천 URL 수정
    if (/marketfor/i.test(location.host)) {
      moUrl = process.env.VUE_APP_MARKETFOR_MO; // 마켓포
    } else {
      moUrl = process.env.VUE_APP_GSFRESH_MO;
    }

    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: msg,
        imageUrl: prodImg,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [{
        title: '웹으로 보기',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      {
        title: '앱으로 보기',
        link: {
          mobileWebUrl: moUrl + '/share.html?url=' + url,
          webUrl: moUrl + '/share.html?url=' + url,
        },
      },
      ],
    });
  },
  shareKakaoStory(url, msg) {
    Kakao.Story.open({
      url: url,
      text: msg,
      urlInfo: {
        title: '신선함의 시작,GS 프레시몰',
        desc: 'm.gsfresh.com',
        name: 'GS 프레시몰',
      },
    });
  },
  shareUrl(id) {
    const el = document.getElementById(id);
    el.style.display = '';

    const copyText = el.value;

    const tmpTextarea = document.createElement('input');
    tmpTextarea.value = copyText;
    document.body.appendChild(tmpTextarea);

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      const oldContentEditable = tmpTextarea.contentEditable;
      const oldReadOnly = tmpTextarea.readOnly;
      const range = document.createRange();

      tmpTextarea.contentEditable = true;
      tmpTextarea.readOnly = false;
      range.selectNodeContents(tmpTextarea);

      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(range);

      // A big number, to cover anything that could be inside the element.
      tmpTextarea.setSelectionRange(0, 999999);

      tmpTextarea.contentEditable = oldContentEditable;
      tmpTextarea.readOnly = oldReadOnly;
    } else {
      tmpTextarea.select();
    }

    document.execCommand('copy');
    document.body.removeChild(tmpTextarea);
    el.style.display = 'none';

    alert('URL이 복사되었습니다');
  }

};

export default ShareUtils;
