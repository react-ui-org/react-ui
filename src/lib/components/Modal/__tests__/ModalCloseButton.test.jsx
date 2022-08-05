import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalCloseButton } from '../ModalCloseButton';
import { idPropTest } from '../../../../../tests/propTests/idPropTest';
import { refPropTest } from '../../../../../tests/propTests/refPropTest';

describe('rendering', () => {
  it.each([
    [
      { disabled: true },
      (rootElement) => expect(rootElement).toBeDisabled(),
    ],
    ...refPropTest(React.createRef()),
    ...idPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ModalCloseButton
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
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

