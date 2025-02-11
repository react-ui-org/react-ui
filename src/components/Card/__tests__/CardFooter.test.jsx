import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { childrenEmptyPropTest } from '../../../../tests/jest/propTests/childrenEmptyPropTest';
import { CardFooter } from '../CardFooter';

const defaultProps = {
  children: 'content',
};

describe('rendering', () => {
  it.each([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    ...childrenEmptyPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <CardFooter
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
