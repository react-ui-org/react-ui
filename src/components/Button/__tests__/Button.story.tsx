import React, {
  useEffect,
  useRef,
} from 'react';
import { FormLayout } from '../../FormLayout';
import { TextField } from '../../TextField';
import { Button } from '..';
import type { ButtonProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type ButtonForTestProps = StoryProps<ButtonProps, 'label'>;
type ButtonForRefTestProps = ButtonForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};

export const ButtonForTest = ({
  label = 'Button',
  ...props
} : ButtonForTestProps) => (
  <Button
    label={label}
    {...props}
  />
);

export const ButtonForRefTest = ({
  label = 'Button',
  testRefAttrName,
  testRefAttrValue,
  ...props
} : ButtonForRefTestProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <Button
      {...props}
      label={label}
      ref={ref}
    />
  );
};

export const ButtonInVerticalFormLayoutForTest = ({
  label = 'Button',
  ...props
}: ButtonForTestProps) => (
  <FormLayout fieldLayout="vertical">
    <TextField label="Text field" />
    <Button
      label={label}
      {...props}
    />
  </FormLayout>
);

export const ButtonInHorizontalFormLayoutForTest = ({
  label = 'Button',
  ...props
}: ButtonForTestProps) => (
  <FormLayout fieldLayout="horizontal">
    <TextField label="Text field" />
    <Button
      label={label}
      {...props}
    />
  </FormLayout>
);
