import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { justifyPropTest } from '../../../../tests/propTests/justifyPropTest';
import { ModalFooter } from './ModalFooter';

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
    ...(justifyPropTest('Root') as unknown as TestingProps[]),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ModalFooter
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild as HTMLElement);
  });
});
