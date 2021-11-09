'use strict';

import Vue from 'vue';
import DialogComponent from './components/dialog.vue';
import { TYPES, DEFAULT_OPTIONS } from './js/utilities/constants';


const Plugin = function (globalOptions) {
  this.globalOptions = globalOptions || {};
  this.mount();
};

Plugin.prototype.mount = function () {
  this.Dialog = (() => {
    const AppConstructor = Vue.extend(DialogComponent);
    const node = document.createElement("div");
    document.querySelector('body').appendChild(node);

    return (new AppConstructor()).$mount(node);
  })();
};

const skin = function () {
  const selector = '#app > div[class~=dalisalda], #app > div[class~=daybreak], #app > div[class~=marketfor]';
  const divWrap = document.querySelector(selector);
  let store = 'gsfresh';
  if (divWrap) {
    const classList = divWrap.classList;
    classList.forEach(function (item) {
      if (item === 'daybreak') {
        store = item;
      } else if (item === 'dalisalda') {
        store = item;
      } else if (item === 'marketfor') {
        store = item;
      }
    });
  }
  return 'dg-footer ' + store;
};

const gsOtherSkin = function () {
  const selector = '#app > div[class~=dalisalda], #app > div[class~=daybreak], #app > div[class~=marketfor]';
  const divWrap = document.querySelector(selector);
  let store = 'gsfresh';
  if (divWrap) {
    const classList = divWrap.classList;
    classList.forEach(function (item) {
      if (item === 'daybreak') {
        store = item;
      } else if (item === 'dalisalda') {
        store = item;
      } else if (item === 'marketfor') {
        store = 'gsfresh';
      }
    });
  }
  return 'dg-footer ' + store;
};

const marketForSkin = function () {
  return 'dg-footer marketfor';
};

Plugin.prototype.alert = function (message = 'Are you sure?', localOptions = {}) {
  return new Promise((resolve, reject) => {
    const id = 'alert.' + Date.now();
    const cssToneUseClass = this.globalOptions.cssToneUseClass || 'gsfresh'; // 최초 GS Fresh Class 세팅

    localOptions.id = id;
    localOptions.type = TYPES.ALERT;
    localOptions.message = message;
    localOptions.promiseResolver = resolve;
    localOptions.promiseRejecter = reject;
    // 메세지창의 CSS TONE를 사용자가 지정해서 사용한다. (필요시 Skin함수 추가해서 사용)
    if (!!this.globalOptions.cssToneUseYn) {
      if (cssToneUseClass === 'marketfor') {
        localOptions.skin = marketForSkin;
      } else {
        localOptions.skin = gsOtherSkin;
      }
    } else {
      localOptions.skin = skin;
    }
    this.Dialog.commit(Object.assign(DEFAULT_OPTIONS, this.globalOptions, localOptions));
  });
};

Plugin.prototype.confirm = function (message = 'Are you sure?', localOptions = {}) {
  return new Promise((resolve, reject) => {
    const id = 'confirm.' + Date.now();
    const cssToneUseClass = this.globalOptions.cssToneUseClass || 'gsfresh'; // 최초 GS Fresh Class 세팅

    localOptions.id = id;
    localOptions.type = TYPES.CONFIRM;
    localOptions.message = message;
    localOptions.promiseResolver = resolve;
    localOptions.promiseRejecter = reject;
    // 메세지창의 CSS TONE를 사용자가 지정해서 사용한다. (필요시 Skin함수 추가해서 사용)
    if (!!this.globalOptions.cssToneUseYn) {
      if (cssToneUseClass === 'marketfor') {
        localOptions.skin = marketForSkin;
      } else {
        localOptions.skin = gsOtherSkin;
      }
    } else {
      localOptions.skin = skin;
    }
    DEFAULT_OPTIONS.okText = localOptions.okText;
    DEFAULT_OPTIONS.cancelText = localOptions.cancelText;
    this.Dialog.commit(Object.assign(DEFAULT_OPTIONS, this.globalOptions, localOptions));
  });
};

// 메세지(alert/confirm) 창 Sikn을 Market For Skin로 지정한다.
Plugin.prototype.setMfSkin = function () {
  this.globalOptions = { cssToneUseYn: true, cssToneUseClass: 'marketfor' };
};

// 메세지(alert/confirm) 창 Sikn을 기타(GS Fresh/Dalisalda/새벽배송 등) Skin로 지정한다.
Plugin.prototype.setOtherSkin = function () {
  this.globalOptions = { cssToneUseYn: true, cssToneUseClass: 'other' };
};

// 메세지(alert/confirm) 창 Sikn을 Default Skin로 지정한다.
Plugin.prototype.setDefaultSkin = function () {
  this.globalOptions = {};
};

Plugin.install = function (Vue, options) {
  Vue.dialog = new Plugin();

  Object.defineProperties(Vue.prototype, {
    $gsdialog: {
      get() {
        return Vue.dialog;
      }
    }
  });
};

export default Plugin;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin);
}

/* BASIC USAGE *
vm.$gsdialog.confirm('Please confirm to continue')
  .then(function () {
    console.log('Clicked on proceed')
  })
  .catch(function () {
    console.log('Clicked on cancel')
  })
*/

/* AJAX LOADER *
vm.$gsdialog.confirm("If you delete this record, it'll be gone forever.", {
    loader: true // default: false - when set to true, the proceed button shows a loader when clicked.
          // And a dialog object will be passed to the then() callback
})
  .then((dialog) => {
    // Triggered when proceed button is clicked

    // dialog.loading(false) // stops the proceed button's loader
    // dialog.loading(true) // starts the proceed button's loader again
    // dialog.close() // stops the loader and close the dialog

    // do some stuff like ajax request.
    setTimeout(() => {
      console.log('Delete action completed ')
      dialog.close()
    }, 2500)

  })
    .catch(() => {
        // Triggered when cancel button is clicked

        console.log('Delete aborted')
    })
*/
