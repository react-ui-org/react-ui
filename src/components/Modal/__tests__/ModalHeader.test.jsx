import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { ModalHeader } from '../ModalHeader.tsx';
import { justifyPropTest } from '../../../../tests/jest/propTests/justifyPropTest';

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
    ...justifyPropTest('Root'),
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
