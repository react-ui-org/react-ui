import React from 'react';
import { act } from 'react-dom/test-utils';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../..';
import { Modal } from '../Modal';
import { ModalBody } from '../ModalBody';
import { ModalCloseButton } from '../ModalCloseButton';
import { ModalContent } from '../ModalContent';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';

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

    expect(screen.getByTestId('portal-id').firstChild).toHaveAttribute('id', 'id');
    document.body.innerHTML = '';
  });

  it.each([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { position: 'top' },
      (rootElement) => expect(rootElement).toHaveClass('isRootPositionTop'),
    ],
    [
      { size: 'small' },
      (rootElement) => expect(rootElement).toHaveClass('isRootSizeSmall'),
    ],
    [
      { size: 'medium' },
      (rootElement) => expect(rootElement).toHaveClass('isRootSizeMedium'),
    ],
    [
      { size: 'large' },
      (rootElement) => expect(rootElement).toHaveClass('isRootSizeLarge'),
    ],
    [
      { size: 'fullscreen' },
      (rootElement) => expect(rootElement).toHaveClass('isRootSizeFullscreen'),
    ],
    [
      { size: 'auto' },
      (rootElement) => expect(rootElement).toHaveClass('isRootSizeAuto'),
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
  it('call close modal using `closeButtonRef` (%#)', async () => {
    const spy = jest.fn();
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

    await userEvent.keyboard('{Escape}');
    expect(spy).toHaveBeenCalled();
  });

  it('do not call close modal using `closeButtonRef` when button is disabled (%#)', async () => {
    const spy = jest.fn();
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

    await userEvent.keyboard('{Escape}');
    expect(spy).not.toHaveBeenCalled();
  });

  it('call close modal using `closeButtonRef` and `ModalCloseButton` (%#)', async () => {
    const spy = jest.fn();
    const ref = React.createRef();
    render((
      <Modal
        closeButtonRef={ref}
        id="id"
      >
        <ModalHeader>
          <ModalCloseButton
            onClick={spy}
            ref={ref}
          />
        </ModalHeader>
      </Modal>
    ));

    await userEvent.keyboard('{Escape}');
    expect(spy).toHaveBeenCalled();
  });

  it('do not call close modal using `closeButtonRef` and `ModalCloseButton` when button is disabled (%#)', async () => {
    const spy = jest.fn();
    const ref = React.createRef();
    render((
      <Modal
        closeButtonRef={ref}
        id="id"
      >
        <ModalHeader>
          <ModalCloseButton
            disabled
            onClick={spy}
            ref={ref}
          />
        </ModalHeader>
      </Modal>
    ));

    await userEvent.keyboard('{Escape}');
    expect(spy).not.toHaveBeenCalled();
  });

  it('call primary action using `primaryButtonRef`', async () => {
    const spy = jest.fn();
    const ref = React.createRef();
    render((
      <Modal
        id="id"
        primaryButtonRef={ref}
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

    await userEvent.keyboard('{Enter}');
    await expect(spy).toHaveBeenCalled();
  });

  it('do not call primary action using `primaryButtonRef when button is disabled', async () => {
    const spy = jest.fn();
    const ref = React.createRef();
    render((
      <Modal
        id="id"
        primaryButtonRef={ref}
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

    await userEvent.keyboard('{enter}');
    expect(spy).not.toHaveBeenCalled();
  });

  const assertFocus = (element, shouldHaveFocus) => (
    shouldHaveFocus ? expect(element).toHaveFocus() : expect(element).not.toHaveFocus()
  );

  it.each([
    [
      <input />,
      (rootElement) => {
        const el = within(rootElement).getByRole('textbox');
        assertFocus(el, true);
      },
    ],
    [
      <textarea />,
      (rootElement) => {
        const el = within(rootElement).getByRole('textbox');
        assertFocus(el, true);
      },
    ],
    [
      (
        <select>
          <option>Option</option>
        </select>
      ),
      (rootElement) => {
        const el = within(rootElement).getByRole('combobox');
        assertFocus(el, true);
      },
    ],
    [
      (
        <>
          <input disabled id="first" />
          <input id="second" />
        </>
      ),
      (rootElement) => {
        const el = within(rootElement).getByTestId('second');
        assertFocus(el, true);
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

    const el = within(container.firstChild).getByRole('button');
    assertFocus(el, true);
  });

  it('autofocuses other focusable element if no input or primary button is present', () => {
    const ref = React.createRef();
    const { container } = render((
      <Modal closeButtonRef={ref}>
        <ModalBody>
          <a href="/" id="link">Link</a>
        </ModalBody>
        <ModalFooter>
          <Button
            label="button"
            ref={ref}
          />
        </ModalFooter>
      </Modal>
    ));

    const el = within(container.firstChild).getByRole('link');
    assertFocus(el, true);
  });

  it('focuses Modal itself if non focusable elements found', () => {
    const { container } = render((
      <>
        <Button id="button" label="button" />
        <Modal id="modal" />
      </>
    ));

    const el = within(container).getByTestId('modal');
    assertFocus(el, true);
  });

  it('focuses Modal itself if autoFocus is disabled', () => {
    const ref = React.createRef();

    const { container } = render((
      <Modal
        autoFocus={false}
        id="modal"
        primaryButtonRef={ref}
      >
        <ModalBody>
          <ModalContent>
            <input id="first" />
          </ModalContent>
        </ModalBody>
        <ModalFooter>
          <Button
            label="button"
            ref={ref}
          />
        </ModalFooter>
      </Modal>
    ));

    const el = within(container).getByTestId('modal');
    assertFocus(el, true);
  });

  it('prevents body from scrolling by default', () => {
    render((
      <Modal />
    ));

    expect(document.body).toHaveStyle('overflow: hidden');
  });

  it('does not prevent body from scrolling if disabled', () => {
    render((
      <Modal preventScrollUnderneath="off" />
    ));

    expect(document.body).not.toHaveStyle('overflow: hidden');
  });

  it('prevents scroll using custom function', async () => {
    const TestWrapper = () => {
      const [isModalOpened, setIsModalOpened] = React.useState(false);

      const customScrollPrevention = {
        reset: () => {
          document.getElementById('layout').style.overflow = 'auto';
        },
        start: () => {
          document.getElementById('layout').style.overflow = 'hidden';
        },
      };

      return (
        <div
          id="layout"
          style={{
            overflow: 'auto',
          }}
        >
          <Button id="button" label="button" onClick={() => setIsModalOpened(!isModalOpened)} />
          { isModalOpened && <Modal preventScrollUnderneath={customScrollPrevention} /> }
        </div>
      );
    };

    const { container } = render((
      <TestWrapper />
    ));

    const button = within(container).getByTestId('button');

    await act(async () => {
      await button.click();
    });
    expect(within(container).getByTestId('layout')).toHaveStyle('overflow: hidden');

    await act(async () => {
      await button.click();
    });
    expect(within(container).getByTestId('layout')).toHaveStyle('overflow: auto');
  });
});
