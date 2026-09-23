import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TranslationsProvider } from '../../../providers/translations';
import { FormLayoutContext } from '../../FormLayout/FormLayoutContext';
import { MultiSelectField } from '..';
import type { MultiSelectFieldProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type MultiSelectFieldForTestProps = Omit<StoryProps<MultiSelectFieldProps, 'label' | 'onChange' | 'options'>, 'value'> & {
  initialValue?: MultiSelectFieldProps['value'];
};
type MultiSelectFieldForRefTestProps = MultiSelectFieldForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type MultiSelectFieldForFormLayoutTestsProps = MultiSelectFieldForTestProps & {
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

export const MultiSelectFieldForTest = ({
  initialValue,
  label = defaultLabel,
  onChange,
  options = defaultOptions,
  ...props
}: MultiSelectFieldForTestProps) => {
  const [value, setValue] = useState<MultiSelectFieldProps['value']>(initialValue ?? ['value1']);

  return (
    <MultiSelectField
      label={label}
      options={options}
      {...props}
      onChange={(newValue) => {
        onChange?.(newValue);
        setValue(newValue);
      }}
      value={value}
    />
  );
};

export const MultiSelectFieldForRefTest = ({
  label = defaultLabel,
  options = defaultOptions,
  testRefAttrName,
  testRefAttrValue,
  ...props
}: MultiSelectFieldForRefTestProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<MultiSelectFieldProps['value']>(['value1']);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <MultiSelectField
      label={label}
      options={options}
      {...props}
      onChange={(newValue) => setValue(newValue)}
      ref={ref}
      value={value}
    />
  );
};

export const MultiSelectFieldForFocusTests = ({
  ...props
}: MultiSelectFieldForTestProps) => (
  <>
    <MultiSelectFieldForTest
      {...props}
    />
    <MultiSelectFieldForTest
      label="another-test-label"
    />
  </>
);

export const MultiSelectFieldForTranslationsTest = ({
  ...props
}: MultiSelectFieldForTestProps) => (
  <TranslationsProvider
    translations={{
      MultiSelectField: {
        noOptions: 'Nothing found',
        removeTag: 'Remove this tag',
        search: 'Search options',
      },
    }}
  >
    <MultiSelectFieldForTest
      {...props}
    />
  </TranslationsProvider>
);

export const MultiSelectFieldForFormLayoutTests = ({
  layout,
  ...props
} : MultiSelectFieldForFormLayoutTestsProps) => {
  const values = useMemo(() => ({ layout }), [layout]);

  return (
    <FormLayoutContext.Provider
      value={values}
    >
      <MultiSelectFieldForTest
        {...props}
      />
      <MultiSelectFieldForTest
        label="another-test-label"
        {...props}
      />
    </FormLayoutContext.Provider>
  );
};
