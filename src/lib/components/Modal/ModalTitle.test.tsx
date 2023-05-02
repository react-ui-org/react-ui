import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { ModalTitle } from './ModalTitle';

const mandatoryProps = {
  children: <div>content text</div>,
};

describe('rendering', () => {
  it.each<TestingProps>([
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
        level: 1,
      },
      (rootElement) => {
        expect(rootElement).toContainHTML('<h1');
      },
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ModalTitle
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild as HTMLElement);
  });
});
