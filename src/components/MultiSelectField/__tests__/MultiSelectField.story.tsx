import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { HTMLAttributes } from 'react';
import { TranslationsProvider } from '../../../providers/translations';
import { FormLayoutContext } from '../../FormLayout';
import { MultiSelectField } from '..';

type MultiSelectFieldValue = (string | number)[];
type MultiSelectFieldForTestProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  // eslint-disable-next-line react/require-default-props
  initialValue?: MultiSelectFieldValue;
  // eslint-disable-next-line react/require-default-props
  onChange?: (value: MultiSelectFieldValue) => void;
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
  onChange,
  ...props
}: MultiSelectFieldForTestProps) => {
  const [value, setValue] = useState<MultiSelectFieldValue>(initialValue ?? ['value1']);

  return (
    <MultiSelectField
      label={defaultLabel}
      options={defaultOptions}
      {...props}
      onChange={(newValue: MultiSelectFieldValue) => {
        onChange?.(newValue);
        setValue(newValue);
      }}
      value={value}
    />
  );
};

export const MultiSelectFieldForRefTest = ({
  testRefAttrName,
  testRefAttrValue,
  ...props
}: MultiSelectFieldForRefTestProps) => {
  const ref = useRef<HTMLDivElement>(undefined);
  const [value, setValue] = useState<MultiSelectFieldValue>(['value1']);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <MultiSelectField
      label={defaultLabel}
      options={defaultOptions}
      {...props}
      onChange={(newValue: MultiSelectFieldValue) => setValue(newValue)}
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
