import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { alignPropTest } from '../../../../tests/propTests/alignPropTest';
import { childrenEmptyPropTest } from '../../../../tests/propTests/childrenEmptyPropTest';
import { densePropTest } from '../../../../tests/propTests/densePropTest';
import { noWrapPropTest } from '../../../../tests/propTests/noWrapPropTest';
import { ToolbarGroup } from './ToolbarGroup';

const defaultProps = {
  children: <div>other content text</div>,
};

describe('rendering', () => {
  it.each<TestingProps>([
    ...(alignPropTest('Group') as unknown as TestingProps[]),
    ...(childrenEmptyPropTest as unknown as TestingProps[]),
    [
      { children: <div>other content text</div> },
      (rootElement) => expect(within(rootElement).getByText('other content text')),
    ],
    ...(densePropTest('Group') as unknown as TestingProps[]),
    ...(noWrapPropTest('Group') as unknown as TestingProps[]),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ToolbarGroup
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild as HTMLElement);
  });
});
