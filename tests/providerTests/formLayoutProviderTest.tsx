import { render } from '@testing-library/react';
import React from 'react';
import { FormLayoutContext } from '../../src/lib/components/FormLayout';

export const formLayoutProviderTest = (Component) => {
  it.each([
    [
      { layout: 'vertical' },
      (rootElement) => {
        expect(rootElement).toHaveClass('isRootInFormLayout');
        expect(rootElement).toHaveClass('isRootLayoutVertical');
      },
    ],
    [
      { layout: 'horizontal' },
      (rootElement) => {
        expect(rootElement).toHaveClass('isRootInFormLayout');
        expect(rootElement).toHaveClass('isRootLayoutHorizontal');
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
