import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { refPropTest } from '../../../../tests/propTests/refPropTest';
import { ModalCloseButton } from './ModalCloseButton';

describe('rendering', () => {
  it.each<TestingProps>([
    [
      { disabled: true },
      (rootElement) => expect(rootElement).toBeDisabled(),
    ],
    ...(refPropTest(React.createRef()) as unknown as TestingProps[]),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ModalCloseButton
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild as HTMLElement);
  });
});

describe('functionality', () => {
  it('calls synthetic event onClick()', () => {
    const spy = sinon.spy();
    render((
      <ModalCloseButton
        onClick={spy}
      />
    ));

    userEvent.click(screen.getByRole('button'));
    expect(spy.calledOnce).toEqual(true);
  });
});

