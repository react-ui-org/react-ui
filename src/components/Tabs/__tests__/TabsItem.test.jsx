import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { labelPropTest } from '../../../../tests/jest/propTests/labelPropTest';
import { TabsItem } from '../TabsItem.tsx';

const mandatoryProps = {
  href: 'href',
  label: 'label',
};

describe('rendering', () => {
  it.each([
    [
      { afterLabel: <div>after label</div> },
      (rootElement) => expect(within(rootElement).getByText('after label')),
    ],
    [
      { beforeLabel: <div>before label</div> },
      (rootElement) => expect(within(rootElement).getByText('before label')),
    ],
    [
      { href: 'href' },
      (rootElement) => expect(rootElement).toContainHTML('href="href"'),
    ],
    [
      { id: 'id' },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__label');
        expect(within(rootElement).getByTestId('id__link')).toHaveAttribute('href', 'href');
      },
    ],
    [
      { isActive: true },
      (rootElement) => expect(rootElement).toHaveClass('isRootActive'),
    ],
    [
      { isActive: false },
      (rootElement) => expect(rootElement).not.toHaveClass('isRootActive'),
    ],
    ...labelPropTest(),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <TabsItem
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls onClick() on navigating', async () => {
    const spy = jest.fn();
    render((
      <TabsItem
        {...mandatoryProps}
        onClick={(e) => {
          e.preventDefault(); // Prevent the default navigation behavior
          spy();
        }}
      />
    ));

    await userEvent.click(screen.getByText('label'));
    expect(spy).toHaveBeenCalled();
  });
});
