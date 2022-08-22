import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { ModalHeader } from '../ModalHeader';
import { justifyPropTest } from '../../../../../tests/propTests/justifyPropTest';

const mandatoryProps = {
  children: <div>content text</div>,
};

describe('rendering', () => {
  it.each([
    [
      {},
      (rootElement) => {
        expect(within(rootElement).getByText('content text'));
      },
    ],
    ...justifyPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ModalHeader
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
