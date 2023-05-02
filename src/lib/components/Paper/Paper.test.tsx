import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { raisedPropTest } from '../../../../tests/propTests/raisedPropTest';
import { Paper } from './Paper';

const defaultProps = {
  children: 'sample text',
};

describe('rendering', () => {
  it.each<TestingProps>([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { muted: true },
      (rootElement) => expect(rootElement).toHaveClass('isRootMuted'),
    ],
    [
      { muted: false },
      (rootElement) => expect(rootElement).not.toHaveClass('isRootMuted'),
    ],
    ...(raisedPropTest as unknown as TestingProps[]),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Paper
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild as HTMLElement);
  });
});
