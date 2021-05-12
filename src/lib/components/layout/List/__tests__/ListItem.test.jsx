import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { ListItem } from '../ListItem';

describe('rendering', () => {
  it.each([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { children: null },
      (rootElement) => expect(rootElement).toBeNull(),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ListItem
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
