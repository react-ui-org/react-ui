import React from 'react';
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
type ModalTitleForTestProps = HtmlHTMLAttributes<HTMLDialogElement>;

export const ModalTitleForTest = ({
  children,
  ...props
}: ModalTitleForTestProps) => (
  <div
    style={{
      height: '100vh',
      padding: '20px',
    }}
  >
    <Modal>
      <ModalHeader>
        <ModalTitle {...props}>{children ?? 'Modal title'}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <ModalContent>
          Modal content.
        </ModalContent>
      </ModalBody>
      <ModalFooter>
        Modal footer.
      </ModalFooter>
    </Modal>
  </div>
);
