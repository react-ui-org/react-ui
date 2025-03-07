import React from 'react';
import type { InputHTMLAttributes } from 'react';
import { Radio } from '..';

// Types for story component will be improved when we have full TypeScript support
type RadioForTestProps = InputHTMLAttributes<HTMLInputElement>;

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
