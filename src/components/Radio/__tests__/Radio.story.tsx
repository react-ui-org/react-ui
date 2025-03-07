import React, { useMemo } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Radio } from '..';
import { FormLayoutContext } from '../../FormLayout';

// Types for story component will be improved when we have full TypeScript support
type RadioForTestProps = InputHTMLAttributes<HTMLInputElement>;
export type RadioForFormLayoutTestsProps = RadioForTestProps & {
  layout: 'vertical' | 'horizontal'
};

const defaultLabel = 'test-group-label';
const defaultOptions = [
  {
    disabled: false,
    key: 'key1',
    label: 'label1',
    value: 'value1',
  },
  {
    disabled: false,
    key: 'key2',
    label: 'label2',
    value: 'value2',
  },
];

export const RadioForTest = ({
  ...props
}: RadioForTestProps) => (
  <Radio
    label={defaultLabel}
    onChange={() => {}}
    options={defaultOptions}
    value={defaultOptions[0].value}
    {...props}
  />
);

export const RadioForFormLayoutTests = ({
  layout,
  ...props
} : RadioForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <Radio
        label={defaultLabel}
        options={defaultOptions}
        {...props}
      />
      <Radio
        label="another-test-label"
        options={defaultOptions}
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};
