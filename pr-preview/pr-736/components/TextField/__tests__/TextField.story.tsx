import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { InputHTMLAttributes } from 'react';
import {
  FormLayout,
  FormLayoutContext,
  FormLayoutCustomFieldContext,
} from '../../FormLayout';
import { TextField } from '..';

// Types for story component will be improved when we have full TypeScript support
type TextFieldForTestProps = InputHTMLAttributes<HTMLInputElement>;
type TextFieldForRefTestProps = TextFieldForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type TextFieldForFormLayoutTestsProps = TextFieldForTestProps & {
  layout: 'vertical' | 'horizontal'
};

const defaultLabel = 'test-label';

export const TextFieldForTest = ({
  ...props
} : TextFieldForTestProps) => (
  <TextField
    label={defaultLabel}
    {...props}
  />
);

export const TextFieldForRefTest = ({
  testRefAttrName,
  testRefAttrValue,
  ...props
} : TextFieldForRefTestProps) => {
  const ref = useRef<HTMLInputElement>(undefined);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <TextField
      label={defaultLabel}
      {...props}
      ref={ref}
    />
  );
};

export const TextFieldForFormLayoutLabelWidthTests = () => (
  <FormLayout fieldLayout="horizontal" labelWidth="100px">
    <TextField label={defaultLabel} />
    <TextField label="another-test-label" />
  </FormLayout>
);

export const TextFieldForFormLayoutTests = ({
  layout,
  ...props
}: TextFieldForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <TextField
        label={defaultLabel}
        {...props}
      />
      <TextField
        label="another-test-label"
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};

export const TextFieldForFormLayoutCustomFieldTests = ({
  ...props
}: TextFieldForTestProps) => (
  <FormLayoutCustomFieldContext.Provider value>
    <TextField
      label={defaultLabel}
      {...props}
    />
  </FormLayoutCustomFieldContext.Provider>
);
