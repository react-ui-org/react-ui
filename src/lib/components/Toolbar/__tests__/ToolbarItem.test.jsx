import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { childrenEmptyPropTest } from '../../../../../tests/propTests/childrenEmptyPropTest';
import { ToolbarItem } from '../ToolbarItem';

const defaultProps = {
  children: 'content',
};

describe('rendering', () => {
  it.each([
    ...childrenEmptyPropTest,
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      {
        children: <div>content text</div>,
        flexible: true,
      },
      (rootElement) => expect(rootElement).toHaveClass('isItemFlexible'),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ToolbarItem
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
