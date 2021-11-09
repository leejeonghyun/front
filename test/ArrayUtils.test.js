import ArrayUtils from '../src/common/ArrayUtils';

test('ArrayUtils min', () => {
  expect(ArrayUtils.min([1, 2, 3, 4])).toBe(1);
});
test('ArrayUtils max', () => {
  expect(ArrayUtils.max([1, 2, 3, 4])).toBe(4);
});
test('includes', () => {
  expect(ArrayUtils.includes([1, 2, 3, 4, 5], 3)).toBe(true);
  expect(ArrayUtils.includes([1, 2, 3, 4, 5], 6)).toBe(false);
  expect(ArrayUtils.includes(['a', 'b', 'c'], 'b')).toBe(true);
});
test('uniq', () => {
  var elements = [1, 2, 3, 1, 2, 4, 2, 3, 5, 3];
  expect(ArrayUtils.uniq(elements)).toStrictEqual([1, 2, 3, 4, 5]);
});
test('compact', () => {
  var array = [undefined, 'cat', false, 434, '', 32.0, 0, 1];
  expect(ArrayUtils.compact(array)).toStrictEqual(['cat', 434, 32.0, 1]);
});
test('shuffle', () => {
  var array = [1, 2, 3, 4];
  var shuffled = ArrayUtils.shuffle(array);
  expect(shuffled).not.toStrictEqual(array);
});
