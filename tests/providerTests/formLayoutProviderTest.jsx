import { render } from '@testing-library/react';
import React from 'react';
import { FormLayoutContext } from '../../src/lib/components/layout/FormLayout'

export const formLayoutProviderTest = (Component) => {
  it.each([
    [
      { layout: 'vertical' },
      (rootElement) => {
        expect(rootElement).toHaveClass('isRootInFormLayout');
        expect(rootElement).toHaveClass('rootLayoutVertical');
      },
    ],
    [
      { layout: 'horizontal' },
      (rootElement) => {
        expect(rootElement).toHaveClass('isRootInFormLayout');
        expect(rootElement).toHaveClass('rootLayoutHorizontal');
      },
    ],
  ])('renders with FormLayout props: "%s"', (testedProps, assert) => {
    const dom = render((
      <FormLayoutContext.Provider
        value={{ ...testedProps }}
      >
        {Component}
      </FormLayoutContext.Provider>
    ));

    assert(dom.container.firstChild);
  });

  it('renders without FormLayout', () => {
    const dom = render((
      Component
    ));

    expect(dom.container.firstChild).not.toHaveClass('isRootInFormLayout');
  });
};
