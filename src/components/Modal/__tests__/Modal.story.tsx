import React, { useRef } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '..';
import type { ModalProps } from '..';

type ModalForTestProps = ModalProps;
type ModalWithInputsAndCallbackForTestProps = ModalForTestProps & {
  closeButtonOnClick?: () => void;
  primaryButtonOnClick?: () => void;
};

const customModalTitle = (
  <ModalHeader>
    <ModalTitle>Modal title</ModalTitle>
  </ModalHeader>
);

const inputContent = (
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
);

const partiallyDisabledInputContent = (
  <ModalContent>
    <input
      disabled
      name="input1"
      type="text"
    />
    <input
      name="input2"
      type="text"
    />
  </ModalContent>
);

const wrapperStyle = {
  height: '100vh',
  padding: '20px',
};

export const ModalForTest = ({
  children,
  ...props
}: ModalForTestProps) => (
  <div style={wrapperStyle}>
    <Modal {...props}>
      {customModalTitle}
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

export const ModalWithInputsForTest = ({
  closeButtonOnClick,
  primaryButtonOnClick,
  ...props
}: ModalWithInputsAndCallbackForTestProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);

  return (
    <div style={wrapperStyle}>
      <Modal
        closeButtonRef={closeRef}
        primaryButtonRef={primaryRef}
        {...props}
      >
        {customModalTitle}
        <ModalBody>
          {inputContent}
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

export const ModalWithPartiallyDisabledInputsForTest = ({
  closeButtonOnClick,
  primaryButtonOnClick,
  ...props
}: ModalWithInputsAndCallbackForTestProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);

  return (
    <div style={wrapperStyle}>
      <Modal
        closeButtonRef={closeRef}
        primaryButtonRef={primaryRef}
        {...props}
      >
        {customModalTitle}
        <ModalBody>
          {partiallyDisabledInputContent}
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

export const ModalWithButtonsAndWithoutInputsForTest = ({
  closeButtonOnClick,
  primaryButtonOnClick,
  ...props
}: ModalWithInputsAndCallbackForTestProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);

  return (
    <div style={wrapperStyle}>
      <Modal
        closeButtonRef={closeRef}
        primaryButtonRef={primaryRef}
        {...props}
      >
        {customModalTitle}
        <ModalBody>
          Some content
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
