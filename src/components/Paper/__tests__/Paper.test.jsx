import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { raisedPropTest } from '../../../../tests/jest/propTests/raisedPropTest';
import { Paper } from '../Paper';

const defaultProps = {
  children: 'sample text',
};

describe('rendering', () => {
  it.each([
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
    ...raisedPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Paper
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
