import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { List } from '../List';
import { ListItem } from '../ListItem';

const defaultProps = {
  children: <ListItem>content</ListItem>,
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
    [
      { children: <ListItem>content text</ListItem> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { children: null },
      (rootElement) => expect(rootElement).toBeNull(),
    ],
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
