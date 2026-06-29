import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { ButtonHTMLAttributes } from 'react';
import {
  FormLayout,
  FormLayoutContext,
} from '../../FormLayout';
import { Button } from '..';
import { TextField } from '../../TextField';

// Types for story component will be improved when we have full TypeScript support
type ButtonForTestProps = ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonForRefTestProps = ButtonForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type ButtonForFormLayoutTestsProps = ButtonForTestProps & {
  layout: 'vertical' | 'horizontal'
};

export const ButtonForTest = ({
  ...props
} : ButtonForTestProps) => (
  <Button
    label="Button"
    {...props}
  />
);

export const ButtonForRefTest = ({
  testRefAttrName,
  testRefAttrValue,
  ...props
} : ButtonForRefTestProps) => {
  const ref = useRef<HTMLButtonElement>(undefined);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <Button
      {...props}
      label="Button"
      ref={ref}
    />
  );
};

export const ButtonForFormLayoutTests = ({
  layout,
  ...props
}: ButtonForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <Button
        label="Button"
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};

export const ButtonInVerticalFormLayoutForTest = ({
  ...props
}: ButtonForTestProps) => (
  <FormLayout fieldLayout="vertical">
    <TextField label="Text field" />
    <Button
      label="Button"
      {...props}
    />
  </FormLayout>
);

export const ButtonInHorizontalFormLayoutForTest = ({
  ...props
}: ButtonForTestProps) => (
  <FormLayout fieldLayout="horizontal">
    <TextField label="Text field" />
    <Button
      label="Button"
      {...props}
    />
  </FormLayout>
);
