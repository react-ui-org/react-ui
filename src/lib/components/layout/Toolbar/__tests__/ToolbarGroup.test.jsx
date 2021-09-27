import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { alignPropTest } from '../../../../../../tests/propTests/alignPropTest';
import { densePropTest } from '../../../../../../tests/propTests/densePropTest';
import { noWrapPropTest } from '../../../../../../tests/propTests/noWrapPropTest';
import { ToolbarGroup } from '../ToolbarGroup';
import { ToolbarItem } from '../ToolbarItem';

const mandatoryProps = {
  children: <ToolbarItem>other content text</ToolbarItem>,
};

describe('rendering', () => {
  it.each([
    ...alignPropTest,
    [
      { children: <ToolbarItem>other content text</ToolbarItem> },
      (rootElement) => expect(within(rootElement).getByText('other content text')),
    ],
    ...densePropTest,
    ...noWrapPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ToolbarGroup
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
