import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { childrenEmptyPropTest } from '../../../../tests/propTests/childrenEmptyPropTest';
import { CardFooter } from './CardFooter';

const defaultProps = {
  children: 'content',
};

describe('rendering', () => {
  it.each<TestingProps>([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    ...(childrenEmptyPropTest as unknown as TestingProps[]),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <CardFooter
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild as HTMLElement);
  });
});
