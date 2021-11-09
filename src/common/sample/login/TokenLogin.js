import ApiUtils from '@/common/ApiUtils';
import JwtUtils from '@/common/JwtUtils';
import StringUtils from '@/common/StringUtils';

const TokenLogin = {
  defaultHeader: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  doSignup: async function () {
    const params = {
      userId: this.userId,
      jobPosition: this.jobPosition,
      userName: this.userName,
      email: this.email,
    };
    const headers = TokenLogin.defaultHeader;
    const response = await ApiUtils.post(
      '/fo/cu/loginmgnt/user-info',
      params,
      headers
    );
    if (response.data.success === true) {
      const data = response.data.data;
      if (data.refreshToken) {
        JwtUtils.saveRefreshToken(data.refreshToken);
      }
      if (data.idToken) {
        JwtUtils.saveIdToken(data.idToken);
        JwtUtils.saveEncVal(response.data.data.ENC_VAL);
      }
      this.result = '회원가입 성공입니다.';
      this.status = true;
    } else {
      this.$gsdialog.alert('회원가입 실패입니다.');
    }
  },
  doLogin: async function () {
    const params = {
      userId: this.userId,
      jobPosition: this.jobPosition,
    };

    try {
      const headers = TokenLogin.defaultHeader;
      const response = await ApiUtils.post(
        '/fo/cu/loginmgnt/login',
        params,
        headers
      );
      if (response.data.success === true) {
        const data = response.data.data;
        JwtUtils.setAutoLogin(this.autoLogin);
        JwtUtils.saveRefreshToken(data.jwtRslt.refreshToken);
        JwtUtils.saveIdToken(data.jwtRslt.idToken);
        JwtUtils.saveEncVal(response.data.data.ENC_VAL);

        this.result = '로그인 성공입니다.';
        this.status = true;
      } else {
        this.$gsdialog.alert('로그인 실패입니다.');
      }
    } catch (e) {
      console.log(e);
      this.$gsdialog.alert('로그인 실패입니다.');
    }
  },
  doLogout: function () {
    this.$store.state.mbr.user = null;
    JwtUtils.destroyRefreshToken();
    JwtUtils.destroyIdToken();
  },
  checkToken: async function () {
    // 토큰 확인
    const idToken = JwtUtils.getIdToken();
    const payload = JwtUtils.decode(idToken);
    const expDate = payload && payload.exp * 1000;
    const isValid = expDate > Date.now();
    console.log(new Date(expDate));
    const vm = this;
    if (!isValid || StringUtils.isEmpty(idToken)) {
      this.$gsdialog.alert('로그인이 필요합니다.').then(() => {
        vm.$router.push('/sample/token/login');
      });
    }
  },
  resign: function () {
    const vm = this;
    this.$gsdialog.confirm('탈퇴하시겠습니까?').then(async function () {
      const idToken = JwtUtils.getIdToken();
      const payload = JwtUtils.decode(idToken);
      const userId = payload['cognito:username'];
      const params = {
        userId: userId,
      };
      const response = await ApiUtils.delete('/fo/cu/loginmgnt/user-info', params);
      if (response.data.success === true) {
        vm.$router.push('/sample/token/resign');
      }
    });
  },
  getPayload: function () {
    const idToken = JwtUtils.getIdToken();
    const payload = JwtUtils.decode(idToken);
    return payload;
  },
  goSignup: function () {
    this.$router.push('/sample/token/signup');
  },
  getUser: async function () {
    const responseUser = await ApiUtils.post('/fo/cu/loginmgnt/token-check', {});
    if (responseUser.data.success === true) {
      return responseUser.data.data;
    }
    return {};
  },
};

export default TokenLogin;
