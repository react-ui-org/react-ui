import React, { useMemo } from 'react';
import { Radio } from '..';
import type { RadioProps } from '..';
import { FormLayout } from '../../FormLayout';
import { FormLayoutContext } from '../../FormLayout/FormLayoutContext';
import type { StoryProps } from '../../../../tests/playwright';

type RadioForTestProps = StoryProps<RadioProps, 'label' | 'options'>;
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
  label = defaultLabel,
  options = defaultOptions,
  ...props
}: RadioForTestProps) => (
  <Radio
    label={label}
    onChange={() => {}}
    options={options}
    value={defaultOptions[0].value}
    {...props}
  />
);

export const RadioForFormLayoutLabelWidthTests = () => (
  <FormLayout fieldLayout="horizontal" labelWidth="100px">
    <Radio label={defaultLabel} options={defaultOptions} />
    <Radio label="another-test-label" options={defaultOptions} />
  </FormLayout>
);

export const RadioForFormLayoutTests = ({
  label = defaultLabel,
  layout,
  options = defaultOptions,
  ...props
} : RadioForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <Radio
        label={label}
        options={options}
        {...props}
      />
      <Radio
        label="another-test-label"
        options={options}
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};
