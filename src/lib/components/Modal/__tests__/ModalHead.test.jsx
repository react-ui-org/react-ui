import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { ModalHead } from '../ModalHead';
import { idPropTest } from '../../../../../tests/propTests/idPropTest';

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
    ...idPropTest,
    [
      { justify: 'center' },
      (rootElement) => expect(rootElement).toHaveClass('isJustifiedToCenter'),
    ],
    [
      { justify: 'space-between' },
      (rootElement) => expect(rootElement).toHaveClass('isJustifiedToSpaceBetween'),
    ],
    [
      { justify: 'stretch' },
      (rootElement) => expect(rootElement).toHaveClass('isJustifiedToStretch'),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ModalHead
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
