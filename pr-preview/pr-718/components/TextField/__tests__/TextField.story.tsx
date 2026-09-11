import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { FormLayout } from '../../FormLayout';
import { FormLayoutContext } from '../../FormLayout/FormLayoutContext';
import { FormLayoutCustomFieldContext } from '../../FormLayout/FormLayoutCustomFieldContext';
import { TextField } from '..';
import type { TextFieldProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type TextFieldForTestProps = StoryProps<TextFieldProps, 'label'>;
type TextFieldForRefTestProps = TextFieldForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type TextFieldForFormLayoutTestsProps = TextFieldForTestProps & {
  layout: 'vertical' | 'horizontal'
};

const defaultLabel = 'test-label';

export const TextFieldForTest = ({
  label = defaultLabel,
  ...props
} : TextFieldForTestProps) => (
  <TextField
    label={label}
    {...props}
  />
);

export const TextFieldForRefTest = ({
  label = defaultLabel,
  testRefAttrName,
  testRefAttrValue,
  ...props
} : TextFieldForRefTestProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <TextField
      label={label}
      {...props}
      ref={ref}
    />
  );
};

export const TextFieldForFormLayoutLabelWidthTests = () => (
  <FormLayout fieldLayout="horizontal" labelWidth="100px">
    <TextField label={defaultLabel} />
    <TextField label="another-test-label" />
  </FormLayout>
);

export const TextFieldForFormLayoutTests = ({
  label = defaultLabel,
  layout,
  ...props
}: TextFieldForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <TextField
        label={label}
        {...props}
      />
      <TextField
        label="another-test-label"
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};

export const TextFieldForFormLayoutCustomFieldTests = ({
  label = defaultLabel,
  ...props
}: TextFieldForTestProps) => (
  <FormLayoutCustomFieldContext.Provider value>
    <TextField
      label={label}
      {...props}
    />
  </FormLayoutCustomFieldContext.Provider>
);
