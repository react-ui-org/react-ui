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
type ModalContentForTestProps = HtmlHTMLAttributes<HTMLDivElement>;

export const ModalContentForTest = ({
  children,
  ...props
}: ModalContentForTestProps) => (
  <div
    style={{
      height: '100vh',
      padding: '20px',
    }}
  >
    <Modal>
      <ModalHeader>
        <ModalTitle>Modal title</ModalTitle>
      </ModalHeader>
      <ModalBody id="modalBodyId">
        <ModalContent {...props}>
          {children ?? 'Modal content.'}
        </ModalContent>
      </ModalBody>
      <ModalFooter>
        Modal footer.
      </ModalFooter>
    </Modal>
  </div>
);

export const ModalContentWithoutChildrenForTest = ({
  ...props
}: ModalContentForTestProps) => (
  <div
    style={{
      height: '100vh',
      padding: '20px',
    }}
  >
    <Modal>
      <ModalHeader>
        <ModalTitle>Modal title</ModalTitle>
      </ModalHeader>
      <ModalBody id="modalBodyId">
        <ModalContent {...props} />
      </ModalBody>
      <ModalFooter>
        Modal footer.
      </ModalFooter>
    </Modal>
  </div>
);
