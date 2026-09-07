import React, {
  useEffect,
  useRef,
} from 'react';
import type { HtmlHTMLAttributes } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '..';

// Types for story component will be improved when we have full TypeScript support
type ModalCloseButtonForTestProps = HtmlHTMLAttributes<HTMLButtonElement>;
type ModalCloseButtonForRefTestProps = ModalCloseButtonForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export const ModalCloseButtonForTest = ({
  ...props
}: ModalCloseButtonForTestProps) => (
  <div
    style={{
      height: '100vh',
      padding: '20px',
    }}
  >
    <Modal>
      <ModalHeader>
        <ModalCloseButton {...props} />
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

export const ModalCloseButtonForRefTest = ({
  testRefAttrName,
  testRefAttrValue,
  ...props
} : ModalCloseButtonForRefTestProps) => {
  const ref = useRef<HTMLButtonElement>(undefined);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <div
      style={{
        height: '100vh',
        padding: '20px',
      }}
    >
      <Modal>
        <ModalHeader>
          <ModalCloseButton
            {...props}
            ref={ref}
          />
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
};
