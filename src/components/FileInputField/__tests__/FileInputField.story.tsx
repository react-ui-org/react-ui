import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { HTMLAttributes } from 'react';
import { FileInputField } from '..';
import { FormLayoutContext } from '../../FormLayout';

// Types for story component will be improved when we have full TypeScript support
type FileInputFieldForTestProps = HTMLAttributes<HTMLDivElement>;
type FileInputFieldForRefTestProps = FileInputFieldForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type FileInputFieldForFormLayoutTestsProps = FileInputFieldForTestProps & {
  layout: 'vertical' | 'horizontal'
};

const InputWrapper = ({
  children,
  ...props
}: FileInputFieldForTestProps) => {
  const style = Object.keys(props).includes('fullWidth')
    ? { padding: '10px' }
    : {
      padding: '10px',
      width: 'fit-content',
    };

  return (
    <div style={style}>
      {children}
    </div>
  );
};

export const FileInputFieldForTest = ({
  ...props
}: FileInputFieldForTestProps) => (
  <InputWrapper {...props}>
    <FileInputField
      id="testId"
      label="Attachment"
      onFilesChanged={() => {}}
      {...props}
    />
  </InputWrapper>
);

export const FileInputFieldWithResetButtonForTest = ({
  ...props
}: FileInputFieldForTestProps) => {
  const ref = useRef<{ resetState:() => void }>(undefined);

  return (
    <>
      <FileInputField
        id="testId"
        label="Attachment"
        onFilesChanged={() => {}}
        {...props}
        ref={ref}
      />
      <button
        onClick={() => {
          if (!ref.current) {
            return;
          }
          ref.current.resetState();
        }}
        type="button"
      >
        Reset
      </button>
    </>
  );
};

export const FileInputFieldForRefTest = ({
  testRefAttrName,
  testRefAttrValue,
  ...props
}: FileInputFieldForRefTestProps) => {
  const ref = useRef<HTMLDivElement>(undefined);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <FileInputField
      {...props}
      id="testId"
      label="Attachment"
      onFilesChanged={() => {}}
      ref={ref}
    />
  );
};

export const FileInputFieldForFormLayoutTests = ({
  layout,
  ...props
}: FileInputFieldForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <InputWrapper {...props}>
        <FileInputField
          id="testId"
          label="FirstLabel"
          onFilesChanged={() => {}}
          {...props}
        />
        <FileInputField
          id="anotherTestId"
          label="SecondLabel"
          onFilesChanged={() => {}}
          {...props}
        />
      </InputWrapper>
    </FormLayoutContext.Provider>
  );
};
