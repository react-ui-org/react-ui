import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { alignPropTest } from '../../../../tests/jest/propTests/alignPropTest';
import { childrenEmptyPropTest } from '../../../../tests/jest/propTests/childrenEmptyPropTest';
import { densePropTest } from '../../../../tests/jest/propTests/densePropTest';
import { noWrapPropTest } from '../../../../tests/jest/propTests/noWrapPropTest';
import { justifyPropTest } from '../../../../tests/jest/propTests/justifyPropTest';
import { Toolbar } from '../Toolbar';

const defaultProps = {
  children: <div>other content text</div>,
};

describe('rendering', () => {
  it.each([
    ...alignPropTest('Toolbar'),
    ...childrenEmptyPropTest,
    [
      { children: <div>other content text</div> },
      (rootElement) => expect(within(rootElement).getByText('other content text')),
    ],
    ...densePropTest('Toolbar'),
    ...justifyPropTest('Toolbar'),
    ...noWrapPropTest('Toolbar'),
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
