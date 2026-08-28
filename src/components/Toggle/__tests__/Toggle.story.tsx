import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  FormLayout,
  FormLayoutContext,
} from '../../FormLayout';
import { Toggle } from '..';
import type { ToggleProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type ToggleForTestProps = StoryProps<ToggleProps, 'label'>;
type ToggleForRefTestProps = ToggleForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type ToggleForFormLayoutTestsProps = ToggleForTestProps & {
  layout: 'vertical' | 'horizontal'
};

const defaultLabel = 'test-label';

export const ToggleForTest = ({
  label = defaultLabel,
  ...props
} : ToggleForTestProps) => (
  <Toggle
    label={label}
    {...props}
  />
);

export const ToggleForRefTest = ({
  label = defaultLabel,
  testRefAttrName,
  testRefAttrValue,
  ...props
} : ToggleForRefTestProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <Toggle
      label={label}
      {...props}
      ref={ref}
    />
  );
};

export const ToggleForFormLayoutLabelWidthTests = () => (
  <FormLayout fieldLayout="horizontal" labelWidth="100px">
    <Toggle label={defaultLabel} />
    <Toggle label="another-test-label" />
  </FormLayout>
);

export const ToggleForFormLayoutTests = ({
  label = defaultLabel,
  layout,
  ...props
}: ToggleForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <Toggle
        label={label}
        {...props}
      />
      <Toggle
        label="another-test-label"
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};
