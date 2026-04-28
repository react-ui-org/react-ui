import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { FormLayoutContext } from '../../FormLayout';
import { TextArea } from '..';

// Types for story component will be improved when we have full TypeScript support
type TextAreaForTestProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
type TextAreaForRefTestProps = TextAreaForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type TextAreaForFormLayoutTestsProps = TextAreaForTestProps & {
  layout: 'vertical' | 'horizontal'
};

const defaultLabel = 'test-label';

export const TextAreaForTest = ({
  ...props
} : TextAreaForTestProps) => (
  <TextArea
    label={defaultLabel}
    {...props}
  />
);

export const TextAreaForRefTest = ({
  testRefAttrName,
  testRefAttrValue,
  ...props
} : TextAreaForRefTestProps) => {
  const ref = useRef<HTMLTextAreaElement>(undefined);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <TextArea
      label={defaultLabel}
      {...props}
      ref={ref}
    />
  );
};

export const TextAreaForFormLayoutTests = ({
  layout,
  ...props
}: TextAreaForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <TextArea
        label={defaultLabel}
        {...props}
      />
      <TextArea
        label="another-test-label"
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};
