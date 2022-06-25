import React from 'react';
import {
  render, within,
} from '@testing-library/react';
import { ModalContent } from '../ModalContent';

const mandatoryProps = {
  children: <div>content text</div>,
};

describe('rendering', () => {
  it.each([
    [
      {
        children: (
          <>
            <div>content text 1</div>
            <div>content text 2</div>
          </>
        ),
      },
      (rootElement) => {
        expect(within(rootElement).getByText('content text 1'));
        expect(within(rootElement).getByText('content text 2'));
      },
    ],
    [
      {
        id: 'id',
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
      },
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ModalContent
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
