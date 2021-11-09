import ApiUtils from '../src/common/ApiUtils';

test('ApiUtils', () => {
  expect(ApiUtils.getUrl('/fo/cm')).toBe('http://localhost:8040/fo/cm');
  expect(ApiUtils.getUrl('/fo/cu')).toBe('http://localhost:8050/fo/cu');
  expect(ApiUtils.getUrl('/fo/md')).toBe('http://localhost:8060/fo/md');
  expect(ApiUtils.getUrl('/fo/od')).toBe('http://localhost:8070/fo/od');
  expect(ApiUtils.getUrl('/fo/pa')).toBe('http://localhost:8070/fo/pa');
  expect(ApiUtils.getUrl('/pa')).toBe('http://localhost:8070/pa'); // for temp
  expect(ApiUtils.getUrl('/fo/ev')).toBe('http://localhost:8080/fo/ev'); // private
  expect(ApiUtils.getUrl('/ev')).toBe('http://localhost:8090/ev'); // public
  expect(ApiUtils.getUrl('/dp/fr')).toBe('http://localhost:8100/dp/fr');
  expect(ApiUtils.getUrl('/dp/ds')).toBe('http://localhost:8110/dp/ds');
});

test('ApiUtils Exception', () => {
  expect(ApiUtils.getUrl('/')).toBe('http://localhost:8050/');
});
