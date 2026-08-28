import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { FormLayout } from '../../FormLayout';
import { FormLayoutContext } from '../../FormLayout/FormLayoutContext';
import { CheckboxField } from '..';
import type { CheckboxFieldProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type CheckboxFieldForTestProps = StoryProps<CheckboxFieldProps, 'label'>;
type CheckboxFieldForRefTestProps = CheckboxFieldForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type CheckboxForFormLayoutTestsProps = CheckboxFieldForTestProps & {
  layout: 'vertical' | 'horizontal'
};

const defaultLabel = 'test-label';

export const CheckboxFieldForTest = ({
  label = defaultLabel,
  ...props
} : CheckboxFieldForTestProps) => (
  <CheckboxField
    label={label}
    {...props}
  />
);

export const CheckboxFieldForRefTest = ({
  label = defaultLabel,
  testRefAttrName,
  testRefAttrValue,
  ...props
} : CheckboxFieldForRefTestProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <CheckboxField
      label={label}
      {...props}
      ref={ref}
    />
  );
};

export const CheckboxForFormLayoutLabelWidthTests = () => (
  <FormLayout fieldLayout="horizontal" labelWidth="100px">
    <CheckboxField label={defaultLabel} />
    <CheckboxField label="another-test-label" />
  </FormLayout>
);

export const CheckboxForFormLayoutTests = ({
  label = defaultLabel,
  layout,
  ...props
} : CheckboxForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <CheckboxField
        label={label}
        {...props}
      />
      <CheckboxField
        label="another-test-label"
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};
