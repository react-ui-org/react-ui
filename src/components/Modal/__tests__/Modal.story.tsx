import React, { useRef } from 'react';
import type { HtmlHTMLAttributes } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '..';

// Types for story component will be improved when we have full TypeScript support
type ModalForTestProps = HtmlHTMLAttributes<HTMLDialogElement>;
type ModalForCallbackTestProps = ModalForTestProps & {
  closeButtonOnClick: () => void | undefined
  primaryButtonOnClick: () => void | undefined
};

export const ModalForTest = ({
  children,
  ...props
}: ModalForTestProps) => (
  <div
    style={{
      height: '100vh',
      padding: '20px',
    }}
  >
    <Modal {...props}>
      <ModalHeader>
        <ModalTitle>Modal title</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <ModalContent>
          {children ?? 'Modal content.'}
        </ModalContent>
      </ModalBody>
      <ModalFooter>
        Modal footer.
      </ModalFooter>
    </Modal>
  </div>
);

export const ModalForCallbackTest = ({
  closeButtonOnClick,
  primaryButtonOnClick,
  ...props
}: ModalForCallbackTestProps) => {
  const closeRef = useRef(null);
  const primaryRef = useRef(null);

  return (
    <div
      style={{
        height: '100vh',
        padding: '20px',
      }}
    >
      <Modal
        closeButtonRef={closeRef}
        primaryButtonRef={primaryRef}
        {...props}
      >
        <ModalHeader>
          <ModalTitle>Modal title</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <ModalContent>
            <input
              name="input1"
              type="text"
            />
            <input
              name="input2"
              type="text"
            />
          </ModalContent>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={closeButtonOnClick}
            ref={closeRef}
            type="button"
          >
            Close button
          </button>
          <button
            onClick={primaryButtonOnClick}
            ref={primaryRef}
            type="button"
          >
            Primary button
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
