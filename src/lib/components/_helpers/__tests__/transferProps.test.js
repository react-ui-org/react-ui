import { transferProps } from '../transferProps';

describe('transferProps', () => {
  it('returns all props when always blacklisted props are not present', () => {
    const props = {
      propA: 'value',
      propB: 'value',
      propC: 'value',
    };
    const expectedProps = { ...props };

    expect(transferProps(props)).toEqual(expectedProps);
  });

  it('returns filtered props using always blacklisted props', () => {
    const props = {
      children: 'value',
      className: 'value',
      forwardedRef: 'value',
      staticContext: 'value',
    };
    const expectedProps = {};

    expect(transferProps(props)).toEqual(expectedProps);
  });
});
