import React from 'react';
import type { HtmlHTMLAttributes } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '..';
import { Button } from '../../Button';

// Types for story component will be improved when we have full TypeScript support
type ModalHeaderForTestProps = HtmlHTMLAttributes<HTMLDivElement>;

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
