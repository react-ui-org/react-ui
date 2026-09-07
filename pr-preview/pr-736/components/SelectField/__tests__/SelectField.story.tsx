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
import { SelectField } from '..';

type SelectFieldForTestProps = InputHTMLAttributes<HTMLSelectElement>;
type SelectFieldForRefTestProps = SelectFieldForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type SelectFieldForFormLayoutTestsProps = SelectFieldForTestProps & {
  layout: 'vertical' | 'horizontal'
};

const defaultLabel = 'test-label';
const defaultOptions = [
  {
    disabled: false,
    key: 'key1',
    label: 'option1',
    value: 'value1',
  },
  {
    disabled: false,
    key: 'key2',
    label: 'option2',
    value: 'value2',
  },
];

export const SelectFieldForTest = ({
  ...props
}: SelectFieldForTestProps) => (
  <SelectField
    label={defaultLabel}
    options={defaultOptions}
    {...props}
  />
);

export const SelectFieldForRefTest = ({
  testRefAttrName,
  testRefAttrValue,
  ...props
}: SelectFieldForRefTestProps) => {
  const ref = useRef<HTMLSelectElement>(undefined);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <SelectField
      label={defaultLabel}
      options={defaultOptions}
      {...props}
      ref={ref}
    />
  );
};

export const SelectFieldForFormLayoutLabelWidthTests = () => (
  <FormLayout fieldLayout="horizontal" labelWidth="100px">
    <SelectField label={defaultLabel} options={defaultOptions} />
    <SelectField label="another-test-label" options={defaultOptions} />
  </FormLayout>
);

export const SelectFieldForFormLayoutTests = ({
  layout,
  ...props
} : SelectFieldForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <SelectField
        label={defaultLabel}
        options={defaultOptions}
        {...props}
      />
      <SelectField
        label="another-test-label"
        options={defaultOptions}
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};

export const SelectFieldForFormLayoutCustomFieldTests = ({
  ...props
}: SelectFieldForTestProps) => (
  <FormLayoutCustomFieldContext.Provider value>
    <SelectField
      label={defaultLabel}
      options={defaultOptions}
      {...props}
    />
  </FormLayoutCustomFieldContext.Provider>
);
