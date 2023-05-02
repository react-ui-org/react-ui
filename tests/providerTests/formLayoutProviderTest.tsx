import { render } from '@testing-library/react';
import React from 'react';
import { FormLayoutContext } from '../../src/lib/components/FormLayout';

export const formLayoutProviderTest = (Component: React.ReactElement<unknown>) => {
  it.each([
    [
      { layout: 'vertical' },
      (rootElement: HTMLElement) => {
        expect(rootElement).toHaveClass('isRootInFormLayout');
        expect(rootElement).toHaveClass('isRootLayoutVertical');
      },
    ],
    [
      { layout: 'horizontal' },
      (rootElement: HTMLElement) => {
        expect(rootElement).toHaveClass('isRootInFormLayout');
        expect(rootElement).toHaveClass('isRootLayoutHorizontal');
      },
    ],
  ])('renders with FormLayout props: "%s"', (testedProps, assert) => {
    const dom = render((
      <FormLayoutContext.Provider
        value={{ ...testedProps as unknown as { layout?: Layout } }}
      >
        {Component}
      </FormLayoutContext.Provider>
    ));

    assert(dom.container.firstChild as HTMLElement);
  });

  it('renders without FormLayout', () => {
    const dom = render((
      Component
    ));

    expect(dom.container.firstChild).not.toHaveClass('isRootInFormLayout');
  });
};
