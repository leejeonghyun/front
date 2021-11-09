import JwtUtils from '../src/common/JwtUtils';

const encoded = 'eyJraWQiOiJ4YUZSVE5KWEYyNEN1cHZSOFpcL0x2WGJOVjVva3A2VFNpcnZj' +
  'ZGtKT2FuST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiMzZmNWVmOC05MjI1LTQxYWEtOWVhZ' +
  'S1mNmQ5NmI5MTljM2IiLCJjb2duaXRvOmdyb3VwcyI6WyJjdXN0b21lciJdLCJldmVudF9pZCI' +
  '6IjE5NjY0YjZhLWE3MjItNDU3ZS04Yzc1LTlkYWZkZDEzOWY5NSIsInRva2VuX3VzZSI6ImFjY' +
  '2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWU' +
  'iOjE1ODIxMDU4MjYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1ub3J0aGVhc3QtM' +
  'i5hbWF6b25hd3MuY29tXC9hcC1ub3J0aGVhc3QtMl9ldzhNZ1NZRloiLCJleHAiOjE1ODIxMDk' +
  '0MjYsImlhdCI6MTU4MjEwNTgyNiwianRpIjoiYmU4MTM0NGItMTUxYS00OWQ0LThiZTUtZGU2Z' +
  'DBkOGQ0ZTVlIiwiY2xpZW50X2lkIjoiN2o1Z3U5NXV1cmExcW1qY2Uxb2E2MzBoOXIiLCJ1c2V' +
  'ybmFtZSI6ImhhbmFraW0yIn0.Yx7Qjgpt24jyIlTB_XlmBKUuhZmRAD9Ls6IjmKjI_1qxgCn9Y' +
  'BgS_EN5K8SX-oln0q2_jd2GABmOWLkdMtAH3fYIVtFAEISvuyU02HzGeI6HShe7T3nkXRnXPPn' +
  'DuIJc-ZshwEZPWf9I4ncdK6J2Vw9kpdqs7N9OBOIRt8egHQgT7e-dLURiMbuFfnrDzhVJWg_-L' +
  'zN8OSOifAQgnianblfCGtvyCW9Rcg75NoS1dqkxkxf-lIjNPtZx2AS6Z9JZq4S2j0PEzVo7GhZ' +
  'bfNtax0qS-LeExMPfmpD_9gZFegrge0TXM32KeoBIh3ik4nXrR_aljZioKVBWXUEs1AZIwQ';

test('Date format', () => {
  const payload = JwtUtils.decode(encoded);
  expect(payload.username).toBe('hanakim2');
});

test('Expire test', () => {
  expect(JwtUtils.isExpired(encoded)).toBe(true);
  expect(JwtUtils.isExpired('dummy')).toBe(true);
  expect(JwtUtils.isExpired('')).toBe(true);
});
