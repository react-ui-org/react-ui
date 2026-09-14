import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { FormLayout } from '../../FormLayout';
import { FormLayoutContext } from '../../FormLayout/FormLayoutContext';
import { FormLayoutCustomFieldContext } from '../../FormLayout/FormLayoutCustomFieldContext';
import { SelectField } from '..';
import type { SelectFieldProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type SelectFieldForTestProps = StoryProps<SelectFieldProps, 'label' | 'options'>;
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
  label = defaultLabel,
  options = defaultOptions,
  ...props
}: SelectFieldForTestProps) => (
  <SelectField
    label={label}
    options={options}
    {...props}
  />
);

export const SelectFieldForRefTest = ({
  label = defaultLabel,
  options = defaultOptions,
  testRefAttrName,
  testRefAttrValue,
  ...props
}: SelectFieldForRefTestProps) => {
  const ref = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <SelectField
      label={label}
      options={options}
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
  label = defaultLabel,
  layout,
  options = defaultOptions,
  ...props
} : SelectFieldForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <SelectField
        label={label}
        options={options}
        {...props}
      />
      <SelectField
        label="another-test-label"
        options={options}
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};

export const SelectFieldForFormLayoutCustomFieldTests = ({
  label = defaultLabel,
  options = defaultOptions,
  ...props
}: SelectFieldForTestProps) => (
  <FormLayoutCustomFieldContext.Provider value>
    <SelectField
      label={label}
      options={options}
      {...props}
    />
  </FormLayoutCustomFieldContext.Provider>
);
