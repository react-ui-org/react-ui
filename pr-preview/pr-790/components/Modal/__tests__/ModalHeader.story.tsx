import React from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '..';
import type { ModalHeaderProps } from '..';
import { Button } from '../../Button';

type ModalHeaderForTestProps = Omit<ModalHeaderProps, 'children'>;

export const ModalHeaderForTest = ({
  ...props
}: ModalHeaderForTestProps) => (
  <div
    style={{
      height: '100vh',
      padding: '20px',
    }}
  >
    <Modal>
      <ModalHeader {...props}>
        <Button label="Header button 1" />
        <Button label="Header button 2" />
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
