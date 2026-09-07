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
import { Button } from '../../Button';

// Types for story component will be improved when we have full TypeScript support
type ModalFooterForTestProps = HtmlHTMLAttributes<HTMLDivElement>;

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
