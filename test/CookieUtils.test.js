import CookieUtils from '../src/common/CookieUtils';
import Config from '../src/common/Config';

test('CookieUtils getDomain', () => {
  expect(CookieUtils.getDomain('fr')).toBe(Config.server.GSFRESH_MO);
});
