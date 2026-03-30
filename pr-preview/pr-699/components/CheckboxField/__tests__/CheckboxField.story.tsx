import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { LabelHTMLAttributes } from 'react';
import { FormLayoutContext } from '../../FormLayout';
import { CheckboxField } from '..';

// Types for story component will be improved when we have full TypeScript support
type CheckboxFieldForTestProps = LabelHTMLAttributes<HTMLLabelElement>;
type CheckboxFieldForRefTestProps = CheckboxFieldForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type CheckboxForFormLayoutTestsProps = CheckboxFieldForTestProps & {
  layout: 'vertical' | 'horizontal'
};

const defaultLabel = 'test-label';

export const CheckboxFieldForTest = ({
  ...props
} : CheckboxFieldForTestProps) => (
  <CheckboxField
    label={defaultLabel}
    {...props}
  />
);

export const CheckboxFieldForRefTest = ({
  testRefAttrName,
  testRefAttrValue,
  ...props
} : CheckboxFieldForRefTestProps) => {
  const ref = useRef<HTMLLabelElement>(undefined);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <CheckboxField
      label={defaultLabel}
      {...props}
      ref={ref}
    />
  );
};

export const CheckboxForFormLayoutTests = ({
  layout,
  ...props
} : CheckboxForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <CheckboxField
        label={defaultLabel}
        {...props}
      />
      <CheckboxField
        label="another-test-label"
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};
