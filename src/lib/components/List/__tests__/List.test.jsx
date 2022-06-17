import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { childrenEmptyPropTest } from '../../../../../tests/propTests/childrenEmptyPropTest';
import { idPropTest } from '../../../../../tests/propTests/idPropTest';
import { List } from '../List';

const defaultProps = {
  children: <div>content</div>,
};

describe('rendering', () => {
  it.each([
    [
      { align: 'start' },
      (rootElement) => expect(within(rootElement).getByRole('list')).toHaveClass('alignStart'),
    ],
    [
      { align: 'end' },
      (rootElement) => expect(within(rootElement).getByRole('list')).toHaveClass('alignEnd'),
    ],
    [
      { autoWidth: true },
      (rootElement) => expect(rootElement).toHaveClass('isAutoWidth'),
    ],
    [
      { autoWidth: false },
      (rootElement) => expect(rootElement).not.toHaveClass('isAutoWidth'),
    ],
    ...childrenEmptyPropTest,
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    ...idPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <List
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
