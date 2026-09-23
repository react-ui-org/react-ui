import React from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '..';
import type { ModalFooterProps } from '..';
import { Button } from '../../Button';

type ModalFooterForTestProps = Omit<ModalFooterProps, 'children'>;

export const ModalFooterForTest = ({
  ...props
}: ModalFooterForTestProps) => (
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
      <ModalBody>
        <ModalContent>
          Modal content.
        </ModalContent>
      </ModalBody>
      <ModalFooter {...props}>
        <Button label="Footer button 1" />
        <Button label="Footer button 2" />
      </ModalFooter>
    </Modal>
  </div>
);
