import React, {
  useEffect,
  useRef,
} from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Button } from '..';

// Types for story component will be improved when we have full TypeScript support
type ButtonForTestProps = ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonForRefTestProps = ButtonForTestProps & {
  testRefAttrName: string;
  testRefAttrValue: string;
};

export const ButtonForTest = ({
  ...props
} : ButtonForTestProps) => (
  <Button
    label="Button"
    {...props}
  />
);

export const ButtonForRefTest = ({
  testRefAttrName,
  testRefAttrValue,
  ...props
} : ButtonForRefTestProps) => {
  const ref = useRef<HTMLButtonElement>(undefined);

  useEffect(() => {
    ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
  }, [testRefAttrName, testRefAttrValue]);

  return (
    <Button
      {...props}
      label="Button"
      ref={ref}
    />
  );
};
