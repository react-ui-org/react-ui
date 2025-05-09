import React from 'react';
import type { ButtonGroupContextType } from './ButtonGroupContext.types';

export const defaultValues: ButtonGroupContextType = {
  block: false,
  disabled: false,
  priority: 'filled',
  size: 'medium',
};

export const ButtonGroupContext = React.createContext <ButtonGroupContextType>(defaultValues);
