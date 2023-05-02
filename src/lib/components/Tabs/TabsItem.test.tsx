import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { labelPropTest } from '../../../../tests/propTests/labelPropTest';
import { TabsItem } from './TabsItem';

const mandatoryProps = {
  href: 'href',
  label: 'label',
};

describe('rendering', () => {
  it.each<TestingProps>([
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
    ...(labelPropTest as unknown as TestingProps[]),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <TabsItem
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild as HTMLElement);
  });
});

describe('functionality', () => {
  it('calls onClick() on navigating', () => {
    const spy = sinon.spy();
    render((
      <TabsItem
        {...mandatoryProps}
        onClick={spy}
      />
    ));

    userEvent.click(screen.getByText('label'));
    expect(spy.calledOnce).toEqual(true);
  });
});
