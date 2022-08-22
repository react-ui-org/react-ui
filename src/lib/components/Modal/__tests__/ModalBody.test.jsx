import React from 'react';
import {
  render, within,
} from '@testing-library/react';
import { ModalBody } from '../index';

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
        scrolling: 'auto',
      },
      (rootElement) => {
        expect(rootElement).toHaveClass('isRootScrollingAuto');
      },
    ],
    [
      {
        scrolling: 'custom',
      },
      (rootElement) => {
        expect(rootElement).toHaveClass('isRootScrollingCustom');
      },
    ],
    [
      {
        scrolling: 'none',
      },
      (rootElement) => {
        expect(rootElement).not.toHaveClass('isRootScrollingAuto');
        expect(rootElement).not.toHaveClass('isRootScrollingCustom');
      },
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ModalBody
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
