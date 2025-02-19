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

  it('returns empty string if called with no params', () => {
    const result = classNames();

    expect(result).toEqual('');
  });

  it('returns empty string if all params are removed', () => {
    const result = classNames(false);

    expect(result).toEqual('');
  });
});
