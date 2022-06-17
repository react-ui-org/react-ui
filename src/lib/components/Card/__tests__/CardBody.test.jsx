import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { idPropTest } from '../../../../../tests/propTests/idPropTest';
import { CardBody } from '../CardBody';

const defaultProps = {
  children: 'content',
};

describe('rendering', () => {
  it.each([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    ...idPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <CardBody
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
