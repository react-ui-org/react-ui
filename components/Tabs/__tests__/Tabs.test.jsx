import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { Tabs } from '../Tabs';
import { TabsItem } from '../TabsItem';

const tab = (
  <TabsItem
    href="href"
    label="label"
  />
);

const defaultProps = {
  children: 'sample text',
};

describe('rendering', () => {
  it.each([
    [
      { children: tab },
      (rootElement) => expect(within(rootElement).getByText('label')),
    ],
    [
      { children: [tab] },
      (rootElement) => expect(within(rootElement).getByText('label')),
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
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
