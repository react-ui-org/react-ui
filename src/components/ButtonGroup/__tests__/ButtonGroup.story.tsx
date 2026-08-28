import React from 'react';
import { ButtonGroup } from '..';
import type { ButtonGroupProps } from '..';
import { Button } from '../../Button';

type ButtonGroupForTestProps = ButtonGroupProps;

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
