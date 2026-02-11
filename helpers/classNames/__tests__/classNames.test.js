import { classNames } from '../classNames';

describe('classNames', () => {
  it('returns filtered class names', () => {
    const result = classNames(
      'class-1',
      'class-2 class-3',
      ' ',
      ' ', // non=-breakable space
      '	', // eslint-disable-line no-tabs
      '',
      0,
      1,
      null,
      undefined,
      true,
      false,
    );

    expect(result).toEqual('class-1 class-2 class-3');
  });

  it('returns `undefined` if called with no params', () => {
    const result = classNames();

    expect(result).toEqual(undefined);
  });

  it('returns `undefined` if called with params that get all filtered out', () => {
    const result = classNames(false);

    expect(result).toEqual(undefined);
  });
});
