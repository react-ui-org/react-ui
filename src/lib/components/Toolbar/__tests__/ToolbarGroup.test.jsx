import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { alignPropTest } from '../../../../../tests/propTests/alignPropTest';
import { childrenEmptyPropTest } from '../../../../../tests/propTests/childrenEmptyPropTest';
import { densePropTest } from '../../../../../tests/propTests/densePropTest';
import { idPropTest } from '../../../../../tests/propTests/idPropTest';
import { noWrapPropTest } from '../../../../../tests/propTests/noWrapPropTest';
import { ToolbarGroup } from '../ToolbarGroup';

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
    ...idPropTest,
    ...noWrapPropTest,
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
