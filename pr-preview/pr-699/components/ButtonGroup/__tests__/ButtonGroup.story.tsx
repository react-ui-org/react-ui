import React from 'react';
import type { HTMLAttributes } from 'react';
import { ButtonGroup } from '..';
import { Button } from '../../Button';

// Types for story component will be improved when we have full TypeScript support
type ButtonGroupForTestProps = HTMLAttributes<HTMLFieldSetElement>;

export const ButtonGroupForTest = ({
  ...props
}: ButtonGroupForTestProps) => (
  <ButtonGroup {...props}>
    <Button label="Button1" />
    <Button label="Button2" />
    <Button label="Button3" />
  </ButtonGroup>
);

export const SelectedButtonGroupForTest = ({
  ...props
}: ButtonGroupForTestProps) => (
  <ButtonGroup {...props}>
    <Button color="selected" label="Button1" />
    <Button label="Button2" />
    <Button label="Button3" />
  </ButtonGroup>
);

