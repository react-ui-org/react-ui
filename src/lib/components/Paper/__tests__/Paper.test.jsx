import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { idPropTest } from '../../../../../tests/propTests/idPropTest';
import { raisedPropTest } from '../../../../../tests/propTests/raisedPropTest';
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
    ...idPropTest,
    [
      { muted: true },
      (rootElement) => expect(rootElement).toHaveClass('rootMuted'),
    ],
    [
      { muted: false },
      (rootElement) => expect(rootElement).not.toHaveClass('rootMuted'),
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
