import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { alignPropTest } from '../../../../../tests/propTests/alignPropTest';
import { childrenEmptyPropTest } from '../../../../../tests/propTests/childrenEmptyPropTest';
import { densePropTest } from '../../../../../tests/propTests/densePropTest';
import { noWrapPropTest } from '../../../../../tests/propTests/noWrapPropTest';
import { Toolbar } from '../Toolbar';

const defaultProps = {
  children: <div>other content text</div>,
};

describe('rendering', () => {
  it.each([
    ...alignPropTest,
    ...childrenEmptyPropTest,
    [
      { children: <div>other content text</div> },
      (rootElement) => expect(within(rootElement).getByText('other content text')),
    ],
    ...densePropTest,
    [
      { justify: 'start' },
      (rootElement) => expect(rootElement).toHaveClass('isJustifiedToStart'),
    ],
    [
      { justify: 'center' },
      (rootElement) => expect(rootElement).toHaveClass('isJustifiedToCenter'),
    ],
    [
      { justify: 'end' },
      (rootElement) => expect(rootElement).toHaveClass('isJustifiedToEnd'),
    ],
    [
      { justify: 'space-between' },
      (rootElement) => expect(rootElement).toHaveClass('isJustifiedToSpaceBetween'),
    ],
    ...noWrapPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Toolbar
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
