import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { ModalFooter } from '../ModalFooter';

const mandatoryProps = {
  children: <div>content text</div>,
};

describe('rendering', () => {
  it.each([
    [
      {
        children: [
          <div>content text 1</div>,
          <div>content text 2</div>,
        ],
      },
      (rootElement) => {
        const items = rootElement.getElementsByClassName('item');
        expect(items).toHaveLength(2);
        expect(within(items[0]).getByText('content text 1'));
        expect(within(items[1]).getByText('content text 2'));
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
    [
      { justify: 'start' },
      (rootElement) => expect(rootElement.firstChild).toHaveClass('isJustifiedToStart'),
    ],
    [
      { justify: 'center' },
      (rootElement) => expect(rootElement.firstChild).toHaveClass('isJustifiedToCenter'),
    ],
    [
      { justify: 'end' },
      (rootElement) => expect(rootElement.firstChild).toHaveClass('isJustifiedToEnd'),
    ],
    [
      { justify: 'space-between' },
      (rootElement) => expect(rootElement.firstChild).toHaveClass('isJustifiedToSpaceBetween'),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ModalFooter
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
