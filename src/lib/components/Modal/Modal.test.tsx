import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../..';
import { Modal } from '../Modal';
import { ModalBody } from '../ModalBody';
// eslint-disable-next-line import/no-named-default
import { default as ModalCloseButton } from '../ModalCloseButton';
import { ModalHeader } from '../ModalHeader';
import { ModalFooter } from '../ModalFooter';

describe('rendering', () => {
  it('renders with "portalId" props', () => {
    document.body.innerHTML = '<div id="portal-id" />';
    render((
      <Modal
        id="id"
        portalId="portal-id"
      >
        content
      </Modal>
    ));

    expect(screen.getByTestId('portal-id').firstChild.firstChild).toHaveAttribute('id', 'id');
    document.body.innerHTML = '';
  });

  it.each([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { position: 'top' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootPositionTop'),
    ],
    [
      { position: 'center' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootPositionCenter'),
    ],
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
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Modal
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it.each([
    () => userEvent.keyboard('{esc}'),
    () => userEvent.click(screen.getByTestId('id').parentNode),
  ])('call close modal using `closeButtonRef` (%#)', (action) => {
    const spy = sinon.spy();
    const ref = React.createRef();
    render((
      <Modal
        closeButtonRef={ref}
        id="id"
      >
        <ModalFooter>
          <Button
            label="Close"
            onClick={spy}
            ref={ref}
            type="button"
          />
        </ModalFooter>
      </Modal>
    ));

    action();
    expect(spy.calledOnce).toEqual(true);
  });

  it.each([
    () => userEvent.keyboard('{esc}'),
    () => userEvent.click(screen.getByTestId('id').parentNode),
  ])('do not call close modal using `closeButtonRef` when button is disabled (%#)', (action) => {
    const spy = sinon.spy();
    const ref = React.createRef();
    render((
      <Modal
        closeButtonRef={ref}
        id="id"
      >
        <ModalFooter>
          <Button
            disabled
            label="Close"
            onClick={spy}
            ref={ref}
            type="button"
          />
        </ModalFooter>
      </Modal>
    ));

    action();
    expect(spy.called).toEqual(false);
  });

  it.each([
    () => userEvent.keyboard('{esc}'),
    () => userEvent.click(screen.getByTestId('id').parentNode),
  ])('call close modal using `closeButtonRef` and `ModalCloseButton` (%#)', (action) => {
    const spy = sinon.spy();
    const ref = React.createRef();
    render((
      <Modal
        closeButtonRef={ref}
        id="id"
      >
        <ModalHeader>
          <ModalCloseButton
            ref={ref}
            onClick={spy}
          />
        </ModalHeader>
      </Modal>
    ));

    action();
    expect(spy.calledOnce).toEqual(true);
  });

  it.each([
    () => userEvent.keyboard('{esc}'),
    () => userEvent.click(screen.getByTestId('id').parentNode),
  ])('do not call close modal using `closeButtonRef` and `ModalCloseButton` when button is disabled (%#)', (action) => {
    const spy = sinon.spy();
    const ref = React.createRef();
    render((
      <Modal
        closeButtonRef={ref}
        id="id"
      >
        <ModalHeader>
          <ModalCloseButton
            disabled
            ref={ref}
            onClick={spy}
          />
        </ModalHeader>
      </Modal>
    ));

    action();
    expect(spy.called).toEqual(false);
  });

  it('call primary action using `primaryButtonRef`', () => {
    const spy = sinon.spy();
    const ref = React.createRef();
    render((
      <Modal
        primaryButtonRef={ref}
        id="id"
      >
        <ModalFooter>
          <Button
            label="Submit"
            onClick={spy}
            ref={ref}
            type="button"
          />
        </ModalFooter>
      </Modal>
    ));

    userEvent.keyboard('{enter}');
    expect(spy.calledOnce).toEqual(true);
  });

  it('do not call primary action using `primaryButtonRef when button is disabled', () => {
    const spy = sinon.spy();
    const ref = React.createRef();
    render((
      <Modal
        primaryButtonRef={ref}
        id="id"
      >
        <ModalFooter>
          <Button
            disabled
            label="Submit"
            onClick={spy}
            ref={ref}
            type="button"
          />
        </ModalFooter>
      </Modal>
    ));

    userEvent.keyboard('{enter}');
    expect(spy.called).toEqual(false);
  });

  it.each([
    [
      <input />,
      (rootElement) => {
        expect(document.activeElement).toEqual(within(rootElement).getByRole('textbox'));
      },
    ],
    [
      <textarea />,
      (rootElement) => {
        expect(document.activeElement).toEqual(within(rootElement).getByRole('textbox'));
      },
    ],
    [
      (
        <select>
          <option>Option</option>
        </select>
      ),
      (rootElement) => {
        expect(document.activeElement).toEqual(within(rootElement).getByRole('combobox'));
      },
    ],
  ])('autofocuses form field element (%#)', (child, assert) => {
    const ref = React.createRef();
    const dom = render((
      <Modal primaryButtonRef={ref}>
        <ModalBody>
          {child}
        </ModalBody>
        <ModalFooter>
          <Button
            disabled
            label="Submit"
            onClick={() => {}}
            ref={ref}
            type="button"
          />
        </ModalFooter>
      </Modal>
    ));

    assert(dom.container.firstChild);
  });

  it('autofocuses primary button if no form field is present', () => {
    const ref = React.createRef();
    const { container } = render((
      <Modal primaryButtonRef={ref}>
        <ModalFooter>
          <Button
            label="Submit"
            onClick={() => {}}
            ref={ref}
          />
        </ModalFooter>
      </Modal>
    ));

    expect(document.activeElement).toEqual(within(container.firstChild).getByRole('button'));
  });
});
