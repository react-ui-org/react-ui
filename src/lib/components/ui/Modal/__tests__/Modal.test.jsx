import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../Modal';

const mandatoryProps = {
  children: <div>content text</div>,
  title: 'title text',
  translations: { close: 'Close' },
};

describe('rendering', () => {
  it('renders with "portalId" props', () => {
    document.body.innerHTML = '<div id="portal-id" />';
    render((
      <Modal
        {...mandatoryProps}
        id="id"
        portalId="portal-id"
      >
        content
      </Modal>
    ));

    expect(screen.getByTestId('portal-id').firstChild).toHaveAttribute('id', 'id');
    document.body.innerHTML = '';
  });

  it.each([
    // `actions` not tested - the current implementation is likely to be replaced
    // `autoFocus` not tested - implementation does not match docs and the current implementation will be replaced
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      {
        closeHandler: () => {},
        id: 'id',
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByTestId('id__content'));
        expect(within(rootElement).getAllByRole('button')[0]).toHaveAttribute('id', 'id__closeModalHeaderButton');
        expect(within(rootElement).getAllByRole('button')[1]).toHaveAttribute('id', 'id__closeModalFooterButton');
      },
    ],
    [
      { position: 'top' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootPositionTop'),
    ],
    [
      { position: 'center' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootPositionCenter'),
    ],
    // `scrollView` not tested - the API is being discussed
    [
      { size: 'small' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootSizeSmall'),
    ],
    [
      { size: 'medium' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootSizeMedium'),
    ],
    [
      { size: 'large' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootSizeLarge'),
    ],
    [
      { size: 'fullscreen' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootSizeFullscreen'),
    ],
    [
      { size: 'auto' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootSizeAuto'),
    ],
    [
      { title: 'other title text' },
      (rootElement) => expect(within(rootElement).getByText('other title text')),
    ],
    [
      {
        closeHandler: () => {},
        translations: { close: 'Zavřít' },
      },
      (rootElement) => expect(within(rootElement).getByTitle('Zavřít')),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Modal
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it.each([
    () => userEvent.click(screen.getByText('Close')),
    () => userEvent.keyboard('{esc}'),
    () => userEvent.click(screen.getByTestId('id')),
  ])('call closeHandler() (%#)', (action) => {
    const spy = sinon.spy();
    render((
      <Modal
        {...mandatoryProps}
        closeHandler={spy}
        id="id"
      >
        Modal content
      </Modal>
    ));

    action();
    expect(spy.calledOnce).toEqual(true);
  });

  it.each([
    () => userEvent.click(screen.getByText('submit')),
    () => userEvent.keyboard('{enter}'),
  ])('call submit action (%#)', (action) => {
    const spy = sinon.spy();
    render((
      <Modal
        {...mandatoryProps}
        actions={[
          {
            clickHandler: spy,
            label: 'submit',
            type: 'submit',
          },
          {
            clickHandler: spy,
            label: 'action',
            type: 'button',
          },
        ]}
      >
        content
      </Modal>
    ));

    action();
    expect(spy.calledOnce).toEqual(true);
  });

  it.each([
    () => userEvent.click(screen.getByText('submit')),
    () => userEvent.keyboard('{enter}'),
  ])('do not call submit action when button is disabled (%#)', (action) => {
    const spy = sinon.spy();
    render((
      <Modal
        {...mandatoryProps}
        actions={[
          {
            clickHandler: spy,
            disabled: true,
            label: 'submit',
            type: 'submit',
          },
        ]}
      >
        content
      </Modal>
    ));

    action();
    expect(spy.called).toEqual(false);
  });
});
