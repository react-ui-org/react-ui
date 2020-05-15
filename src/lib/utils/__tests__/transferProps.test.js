import transferProps from '../transferProps';

describe('transferProps', () => {
  it('returns all props when blacklisted props are not present', () => {
    const props = {
      propA: 'value',
      propB: 'value',
      propC: 'value',
    };
    const blacklistedProps = null;
    const expectedProps = { ...props };

    expect(transferProps(props, blacklistedProps)).toEqual(expectedProps);
  });

  it('returns filtered props when blacklisted props are present', () => {
    const props = {
      propA: 'value',
      propB: 'value',
      propC: 'value',
    };
    const blacklistedProps = ['propA', 'propC'];
    const expectedProps = { propB: 'value' };

    expect(transferProps(props, blacklistedProps)).toEqual(expectedProps);
  });

  it('returns filtered props using always blacklisted props', () => {
    const props = {
      children: 'value',
      className: 'value',
      forwardedRef: 'value',
    };
    const blacklistedProps = null;
    const expectedProps = {};

    expect(transferProps(props, blacklistedProps)).toEqual(expectedProps);
  });
});
