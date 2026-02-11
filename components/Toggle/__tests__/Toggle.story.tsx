import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { InputHTMLAttributes } from 'react';
import { FormLayoutContext } from '../../FormLayout';
import { Toggle } from '..';

// Types for story component will be improved when we have full TypeScript support
type ToggleForTestProps = InputHTMLAttributes<HTMLInputElement>;
type ToggleForRefTestProps = ToggleForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type ToggleForFormLayoutTestsProps = ToggleForTestProps & {
  layout: 'vertical' | 'horizontal'
};

const defaultLabel = 'test-label';

export const ToggleForTest = ({
  ...props
} : ToggleForTestProps) => (
  <Toggle
    label={defaultLabel}
    {...props}
  />
);

export const ToggleForRefTest = ({
  testRefAttrName,
  testRefAttrValue,
  ...props
} : ToggleForRefTestProps) => {
  const ref = useRef<HTMLInputElement>(undefined);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <Toggle
      label={defaultLabel}
      {...props}
      ref={ref}
    />
  );
};

export const ToggleForFormLayoutTests = ({
  layout,
  ...props
}: ToggleForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <Toggle
        label={defaultLabel}
        {...props}
      />
      <Toggle
        label="another-test-label"
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};
