import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { alignPropTest } from '../../../../../tests/propTests/alignPropTest';
import { childrenEmptyPropTest } from '../../../../../tests/propTests/childrenEmptyPropTest';
import { densePropTest } from '../../../../../tests/propTests/densePropTest';
import { noWrapPropTest } from '../../../../../tests/propTests/noWrapPropTest';
import { ToolbarGroup } from '../ToolbarGroup';

const defaultProps = {
  children: <div>other content text</div>,
};

describe('rendering', () => {
  it.each([
    ...alignPropTest('Group'),
    ...childrenEmptyPropTest,
    [
      { children: <div>other content text</div> },
      (rootElement) => expect(within(rootElement).getByText('other content text')),
    ],
    ...densePropTest('Group'),
    ...noWrapPropTest('Group'),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ToolbarGroup
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
