import Vue from 'vue';
import VueJWT from 'vuejs-jwt';
import CookieUtils from './CookieUtils';

Vue.use(VueJWT);

const REFRESH_TOKEN_KEY = 'rtkn';
const ID_TOKEN_KEY = 'itkn';
const ENC_VAL = 'ENC_VAL';

// Token 관리
const JwtUtils = {
  setAutoLogin: function (isAuto) {
    localStorage.setItem('remember', window.btoa(isAuto));
  },
  isAutoLogin: function () {
    return window.atob(localStorage.getItem('remember')) === 'true';
  },
  getItem: function (key) {
    return CookieUtils.getCookie(key, true);
  },
  setItem: function (key, value, exdays) {
    CookieUtils.setCookie(key, value, exdays, true);
  },
  removeItem: function (key) {
    CookieUtils.deleteCookie(key);
  },
  getRefreshToken: function () {
    return this.getItem(REFRESH_TOKEN_KEY);
  },
  saveRefreshToken: function (token) {
    if (token === 'undefined' || !token) {
      return;
    }
    const days = (this.isAutoLogin()) ? 30 : null;
    this.setItem(REFRESH_TOKEN_KEY, token, days);
    this.setItem(REFRESH_TOKEN_KEY + '_ts', Date.now(), days);
  },
  destroyRefreshToken: function () {
    this.removeItem(REFRESH_TOKEN_KEY);
    this.removeItem(REFRESH_TOKEN_KEY + '_ts');
  },
  getRefreshTokenTime: function () {
    return Number(this.getItem(REFRESH_TOKEN_KEY + '_ts')) || 0;
  },
  getIdToken: function () {
    return this.getItem(ID_TOKEN_KEY);
  },
  saveIdToken: function (token) {
    this.setItem(ID_TOKEN_KEY, token, 1);
  },
  destroyIdToken: function () {
    this.removeItem(ID_TOKEN_KEY);
  },
  getEncVal: function () {
    return this.getItem(ENC_VAL);
  },
  saveEncVal: function (token) {
    this.setItem(ENC_VAL, token, 1);
  },
  destroyEncVal: function () {
    this.removeItem(ENC_VAL);
  },
  decode: function (encoded) {
    return Vue.$jwt.decode(encoded);
  },
  isExpired: function (encoded) {
    try {
      const payload = this.decode(encoded);
      const expDate = payload && payload.exp * 1000;
      const isExpired = expDate < Date.now();
      return isExpired;
    } catch (e) {
      return true;
    }
  }
};

export default JwtUtils;
