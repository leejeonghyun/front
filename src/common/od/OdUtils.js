const OdUtils = {
  methods: {
    isMobile() {
      let deviceMode = false;
      if (navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)) {
        deviceMode = true;
      }
      return deviceMode;
    },
    isGsApp() {
      let deviceMode = false;
      if (this.isMobile()) {
        if (navigator.userAgent.match('gssmapp')) {
          deviceMode = true;
        }
      }
      return deviceMode;
    },
    isDaliApp() {
      let deviceMode = false;
      if (this.isMobile()) {
        if (navigator.userAgent.match('dalisalda')) {
          deviceMode = true;
        }
      }
      return deviceMode;
    },
  }
};

export default OdUtils;
