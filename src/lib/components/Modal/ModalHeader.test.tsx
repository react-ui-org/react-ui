import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { justifyPropTest } from '../../../../tests/propTests/justifyPropTest';
import { ModalHeader } from './ModalHeader';

const mandatoryProps = {
  children: <div>content text</div>,
};

describe('rendering', () => {
  it.each<TestingProps>([
    [
      {},
      (rootElement) => {
        expect(within(rootElement).getByText('content text'));
      },
    ],
    ...(justifyPropTest('Root') as unknown as TestingProps[]),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ModalHeader
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild as HTMLElement);
  });
});
