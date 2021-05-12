import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { Tabs } from '../Tabs';

describe('rendering', () => {
  it.each([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { children: null },
      (rootElement) => expect(rootElement).toBeInTheDocument(),
    ],
    [
      { id: 'id' },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByTestId('id__list'));
      },
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Tabs
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
