import React from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '..';
import type { ModalContentProps } from '..';

type ModalContentForTestProps = ModalContentProps;

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
