const ImgUtils = {
  path: function (uri) {
    let url = uri;
    if (uri.indexOf('http') === -1) {
      const domain = process.env.VUE_APP_IMAGE_SERVER || 'https://imagedev.gsecretail.com';
      url = domain + uri;
    }
    return url;
  }
};

export default ImgUtils;
