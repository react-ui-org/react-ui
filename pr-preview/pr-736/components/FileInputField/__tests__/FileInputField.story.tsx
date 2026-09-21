import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { ReactNode } from 'react';
import { FileInputField } from '..';
import type {
  FileInputFieldProps,
  FileInputFieldRef,
} from '..';
import { FormLayout } from '../../FormLayout';
import { FormLayoutContext } from '../../FormLayout/FormLayoutContext';
import { FormLayoutCustomFieldContext } from '../../FormLayout/FormLayoutCustomFieldContext';
import type { StoryProps } from '../../../../tests/playwright';

type FileInputFieldForTestProps = StoryProps<FileInputFieldProps, 'id' | 'label' | 'onFilesChanged'>;
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
}: FileInputFieldForTestProps & { children: ReactNode }) => {
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
  id = 'testId',
  label = 'Attachment',
  onFilesChanged = () => {},
  ...props
}: FileInputFieldForTestProps) => (
  <InputWrapper {...props}>
    <FileInputField
      id={id}
      label={label}
      onFilesChanged={onFilesChanged}
      {...props}
    />
  </InputWrapper>
);

export const FileInputFieldWithResetButtonForTest = ({
  id = 'testId',
  label = 'Attachment',
  onFilesChanged = () => {},
  ...props
}: FileInputFieldForTestProps) => {
  const ref = useRef<FileInputFieldRef>(null);

  return (
    <>
      <FileInputField
        id={id}
        label={label}
        onFilesChanged={onFilesChanged}
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
  id = 'testId',
  label = 'Attachment',
  onFilesChanged = () => {},
  testRefAttrName,
  testRefAttrValue,
  ...props
}: FileInputFieldForRefTestProps) => {
  const ref = useRef<FileInputFieldRef>(null);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <FileInputField
      {...props}
      id={id}
      label={label}
      onFilesChanged={onFilesChanged}
      ref={ref}
    />
  );
};

export const FileInputFieldForFormLayoutLabelWidthTests = () => (
  <FormLayout fieldLayout="horizontal" labelWidth="100px">
    <FileInputField id="testId" label="FirstLabel" onFilesChanged={() => {}} />
    <FileInputField id="anotherTestId" label="SecondLabel" onFilesChanged={() => {}} />
  </FormLayout>
);

export const FileInputFieldForFormLayoutTests = ({
  id = 'testId',
  label = 'FirstLabel',
  layout,
  onFilesChanged = () => {},
  ...props
}: FileInputFieldForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <InputWrapper {...props}>
        <FileInputField
          id={id}
          label={label}
          onFilesChanged={onFilesChanged}
          {...props}
        />
        <FileInputField
          id="anotherTestId"
          label="SecondLabel"
          onFilesChanged={onFilesChanged}
          {...props}
        />
      </InputWrapper>
    </FormLayoutContext.Provider>
  );
};

export const FileInputFieldForFormLayoutCustomFieldTests = ({
  id = 'testId',
  label = 'Attachment',
  onFilesChanged = () => {},
  ...props
}: FileInputFieldForTestProps) => (
  <InputWrapper {...props}>
    <FormLayoutCustomFieldContext.Provider value>
      <FileInputField
        id={id}
        label={label}
        onFilesChanged={onFilesChanged}
        {...props}
      />
    </FormLayoutCustomFieldContext.Provider>
  </InputWrapper>
);
