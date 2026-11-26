import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { KeyboardEvent } from 'react';
import { TranslationsProvider } from '../../../providers/translations';
import { FormLayoutContext } from '../../FormLayout/FormLayoutContext';
import { InputGroupContext } from '../../InputGroup/InputGroupContext';
import { MultiSelectField } from '..';
import type { MultiSelectFieldProps } from '..';
import {
  useSpy,
  withSpy,
} from '../../../../tests/playwright/utils/spy';
import type { StoryProps } from '../../../../tests/playwright';

type MultiSelectFieldForTestProps = Omit<StoryProps<MultiSelectFieldProps, 'label' | 'onChange' | 'options'>, 'value'> & {
  initialValue?: MultiSelectFieldProps['value'];
};
type MultiSelectFieldForRefTestProps = MultiSelectFieldForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};
export type MultiSelectFieldForFormLayoutTestsProps = MultiSelectFieldForTestProps & {
  layout: 'vertical' | 'horizontal';
};

const selectCalled = () => true;
const selectKey = (event: KeyboardEvent<HTMLInputElement>) => event.key;

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
  const ref = useRef<HTMLInputElement | HTMLDivElement>(null);
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

export const MultiSelectFieldForShrinkingOptionsTest = ({
  label = defaultLabel,
  ...props
}: MultiSelectFieldForTestProps) => {
  const [value, setValue] = useState<MultiSelectFieldProps['value']>([]);
  // Selected options disappear from the options, so the click on an option removes it from the DOM
  const options = useMemo(
    () => defaultOptions.filter((option) => !value.includes(option.value)),
    [value],
  );

  return (
    <MultiSelectField
      label={label}
      {...props}
      onChange={(newValue) => setValue(newValue)}
      options={options}
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
        tagDescription: 'Delete removes this tag',
      },
    }}
  >
    <MultiSelectFieldForTest
      {...props}
    />
  </TranslationsProvider>
);

export const MultiSelectFieldSpyForTest = withSpy((props: MultiSelectFieldForTestProps) => {
  const onChange = useSpy('onChange');
  // The handlers passed by the consumer must be called, the events themselves are not serializable
  const onClick = useSpy('onClick', selectCalled);
  const onKeyDown = useSpy('onKeyDown', selectKey);

  return (
    <MultiSelectFieldForTest
      onChange={onChange}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...props}
    />
  );
});

export const MultiSelectFieldForFormTest = withSpy((props: MultiSelectFieldForTestProps) => {
  // The spy records the submission of the surrounding form, it must not happen on the keys handled by the field
  const onChange = useSpy('onChange');
  const onSubmit = useSpy('onSubmit', () => true);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <MultiSelectFieldForTest
        onChange={onChange}
        {...props}
      />
    </form>
  );
});

export const MultiSelectFieldForInputGroupTests = ({
  disabled = false,
  size = 'medium',
  ...props
}: MultiSelectFieldForTestProps) => {
  // The group passes its `disabled` and `size` down to the field through the context
  const values = useMemo(() => ({
    disabled,
    layout: 'vertical' as const,
    size,
  }), [disabled, size]);

  return (
    <InputGroupContext.Provider
      value={values}
    >
      <MultiSelectFieldForTest
        {...props}
      />
    </InputGroupContext.Provider>
  );
};

export const MultiSelectFieldForFormLayoutTests = ({
  layout,
  ...props
}: MultiSelectFieldForFormLayoutTestsProps) => {
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
