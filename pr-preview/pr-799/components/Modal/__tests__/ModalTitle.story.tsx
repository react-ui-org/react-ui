import React from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '..';
import type { ModalTitleProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type ModalTitleForTestProps = StoryProps<ModalTitleProps, 'children'>;

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
