import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalHead } from '../ModalHead';

const mandatoryProps = {
  title: 'title text',
};

describe('rendering', () => {
  it.each([
    [
      {},
      (rootElement) => {
        expect(within(rootElement).getByRole('heading')).toHaveTextContent('title text');
      },
    ],
    [
      {
        id: 'id',
        onClose: () => {},
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByRole('heading')).toHaveAttribute('id', 'id__title');
        expect(within(rootElement).getByRole('button')).toHaveAttribute('id', 'id__closeButton');
      },
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

describe('functionality', () => {
  it('call onClose()', () => {
    const spy = sinon.spy();
    render((
      <ModalHead
        {...mandatoryProps}
        onClose={spy}
      >
        Modal content
      </ModalHead>
    ));

    userEvent.click(screen.getByRole('button'));
    expect(spy.calledOnce).toEqual(true);
  });

  it('does not call onClose() when button is disaabled', () => {
    const spy = sinon.spy();
    render((
      <ModalHead
        {...mandatoryProps}
        closeButtonDisabled
        onClose={spy}
      >
        Modal content
      </ModalHead>
    ));

    userEvent.click(screen.getByRole('button'));
    expect(spy.called).toEqual(false);
  });
});
