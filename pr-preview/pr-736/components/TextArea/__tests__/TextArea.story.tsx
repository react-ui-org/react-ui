import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { FormLayout } from '../../FormLayout';
import { FormLayoutContext } from '../../FormLayout/FormLayoutContext';
import { FormLayoutCustomFieldContext } from '../../FormLayout/FormLayoutCustomFieldContext';
import { TextArea } from '..';
import type { TextAreaProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type TextAreaForTestProps = StoryProps<TextAreaProps, 'label'>;
type TextAreaForRefTestProps = TextAreaForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type TextAreaForFormLayoutTestsProps = TextAreaForTestProps & {
  layout: 'vertical' | 'horizontal'
};

const defaultLabel = 'test-label';

export const TextAreaForTest = ({
  label = defaultLabel,
  ...props
} : TextAreaForTestProps) => (
  <TextArea
    label={label}
    {...props}
  />
);

export const TextAreaForRefTest = ({
  label = defaultLabel,
  testRefAttrName,
  testRefAttrValue,
  ...props
} : TextAreaForRefTestProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <TextArea
      label={label}
      {...props}
      ref={ref}
    />
  );
};

export const TextAreaForFormLayoutLabelWidthTests = () => (
  <FormLayout fieldLayout="horizontal" labelWidth="100px">
    <TextArea label={defaultLabel} />
    <TextArea label="another-test-label" />
  </FormLayout>
);

export const TextAreaForFormLayoutTests = ({
  label = defaultLabel,
  layout,
  ...props
}: TextAreaForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <TextArea
        label={label}
        {...props}
      />
      <TextArea
        label="another-test-label"
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};

export const TextAreaForFormLayoutCustomFieldTests = ({
  label = defaultLabel,
  ...props
}: TextAreaForTestProps) => (
  <FormLayoutCustomFieldContext.Provider value>
    <TextArea
      label={label}
      {...props}
    />
  </FormLayoutCustomFieldContext.Provider>
);
