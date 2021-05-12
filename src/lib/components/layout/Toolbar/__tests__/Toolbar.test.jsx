import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { alignPropTest } from '../../../../../../tests/propTests/alignPropTest';
import { densePropTest } from '../../../../../../tests/propTests/densePropTest';
import { Toolbar } from '../Toolbar';

const mandatoryProps = {
  children: <div>other content text</div>,
};

describe('rendering', () => {
  it.each([
    ...alignPropTest,
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
    [
      { nowrap: true },
      (rootElement) => expect(rootElement).toHaveClass('isNowrap'),
    ],
    [
      { nowrap: false },
      (rootElement) => expect(rootElement).not.toHaveClass('isNowrap'),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Toolbar
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
